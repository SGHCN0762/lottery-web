<template>
  <div class="pdf-preview-page">
    <div class="preview-content">
      <component
        v-if="previewFile && viewerComponent"
        :is="viewerComponent"
        :file="previewFile"
        :file-name="displayFileName"
        :width="'100%'"
        :height="'100%'"
        :plugins="previewPlugins"
      >
        <template #toolbar="ctx">
          <div class="custom-toolbar">
            <van-button
              icon="plus"
              :disabled="!ctx.canCommand('zoom-in')"
              @click="ctx.command('zoom-in')"
            />
            <van-button
              icon="minus"
              :disabled="!ctx.canCommand('zoom-out')"
              @click="ctx.command('zoom-out')"
            />
            <van-button
              icon="edit"
              @click="toggleDrawing"
            />
          </div>
        </template>
      </component>
      <div v-else-if="!previewFile && viewerComponent" class="preview-loading">
        <van-loading type="spinner" size="32px" />
      </div>
      <div v-else class="preview-error">
        <van-icon name="warning-o" size="48" color="#999" />
        <p>{{ t('tools.fileConverter.common.previewFailed') }}</p>
      </div>
    </div>

    <canvas
      v-if="isDrawing"
      ref="drawingCanvas"
      class="drawing-canvas"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
      @touchstart.prevent="handleTouchStart"
      @touchmove.prevent="handleTouchMove"
      @touchend.prevent="stopDrawing"
    />

    <div v-if="isDrawing" ref="drawingToolbar" class="drawing-toolbar">
      <div class="toolbar-row">
        <van-button
          :type="currentTool === 'pen' ? 'primary' : 'default'"
          size="small"
          @click="setTool('pen')"
          round
        >
          <div class="icon-pencil"></div>
        </van-button>
        <van-button
          :type="currentTool === 'eraser' ? 'primary' : 'default'"
          size="small"
          @click="setTool('eraser')"
          round
        >
          <div class="icon-eraser"></div>
        </van-button>
        <div class="color-btn" @click="showColorPicker = !showColorPicker">
          <div class="color-preview" :style="{ backgroundColor: currentColor }" />
        </div>
        <van-button
          type="default"
          size="small"
          @click="toggleDrawing"
          round
        >
          <div class="icon-exit"></div>
        </van-button>
        <van-button
          size="small"
          @click="showMoreMenu = !showMoreMenu"
          round
          :type="showMoreMenu ? 'primary' : 'default'"
        >
          <div class="icon-more"></div>
        </van-button>
      </div>
      <div v-if="showColorPicker" class="color-dropdown">
        <div
          v-for="color in colors"
          :key="color"
          class="color-item"
          :class="{ active: currentColor === color }"
          :style="{ backgroundColor: color }"
          @click="selectColor(color)"
        />
      </div>
      <div v-if="showMoreMenu" class="more-dropdown">
        <div class="more-btn" @click="cycleBrushSize">
          <van-icon name="circle" :size="brushSize" />
          <span>粗细</span>
        </div>
        <div class="more-btn" :class="{ disabled: undoStack.length === 0 }" @click="undo">
          <van-icon name="revoke" />
          <span>撤销</span>
        </div>
        <div class="more-btn" @click="clearCanvas">
          <van-icon name="delete-o" />
          <span>清空</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Button as VanButton, Icon as VanIcon, Loading as VanLoading, Slider as VanSlider, Divider as VanDivider, showToast } from 'vant';

const { t } = useI18n();
const route = useRoute();

const viewerComponent = shallowRef(null);
const defaultPlugins = ref(null);
let viewerLoadingPromise = null;

const loadViewer = async () => {
  if (viewerComponent.value) return;
  if (viewerLoadingPromise) return viewerLoadingPromise;

  viewerLoadingPromise = (async () => {
    try {
      const [{ OpenFileViewer: Viewer }, { imagePlugin, pdfPlugin, textPlugin, officePlugin }] = await Promise.all([
        import('@open-file-viewer/vue'),
        import('@open-file-viewer/core'),
      ]);
      await import('@open-file-viewer/core/style.css');
      const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
      const pdfWorkerSrc = await import('pdfjs-dist/legacy/build/pdf.worker.min.mjs?url');
      const jbig2WasmUrl = await import('pdfjs-dist/wasm/jbig2.wasm?url');
      const openjpegWasmUrl = await import('pdfjs-dist/wasm/openjpeg.wasm?url');
      const qcmsWasmUrl = await import('pdfjs-dist/wasm/qcms_bg.wasm?url');

      pdfjs.GlobalWorkerOptions.wasmUrl = {
        jbig2: jbig2WasmUrl.default,
        openjpeg: openjpegWasmUrl.default,
        qcms: qcmsWasmUrl.default,
      };

      const plugins = [];
      const safeInit = (name, fn) => {
        try {
          plugins.push(fn());
        } catch (err) {
          console.warn(`[PdfPreview] init plugin ${name} failed:`, err);
        }
      };
      safeInit('image', imagePlugin);
      safeInit('text', textPlugin);
      safeInit('pdf', () => pdfPlugin({ pdfjs, workerSrc: pdfWorkerSrc.default, useFetchData: true }));
      safeInit('office', officePlugin);

      defaultPlugins.value = plugins;
      viewerComponent.value = Viewer;
    } catch (err) {
      console.error('[PdfPreview] loadViewer failed:', err);
      throw err;
    } finally {
      viewerLoadingPromise = null;
    }
  })();

  return viewerLoadingPromise;
};

const previewPlugins = ref([]);
const previewFile = ref(null);
const loadingLock = ref(false);

const displayFileName = computed(() => {
  return route.query.fileName ? decodeURIComponent(route.query.fileName) : '未知文件';
});

const inferFileType = (name) => {
  const ext = name.toLowerCase().split('.').pop();
  const typeMap = {
    pdf: 'application/pdf',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    svg: 'image/svg+xml',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    txt: 'text/plain',
  };
  return typeMap[ext] || 'application/octet-stream';
};

const loadFile = async () => {
  if (loadingLock.value) return;
  loadingLock.value = true;

  previewFile.value = null;

  try {
    await loadViewer();

    const fileUrl = route.query.url;
    if (fileUrl) {
      const response = await fetch(decodeURIComponent(fileUrl));
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const type = blob.type || inferFileType(displayFileName.value);
      previewFile.value = new File([blob], displayFileName.value, { type });
    }

    previewPlugins.value = defaultPlugins.value;
  } catch (error) {
    console.error('Failed to fetch file for preview:', error);
    showToast({
      message: t('tools.fileConverter.common.previewFailed'),
      icon: 'fail',
      duration: 2000,
    });
  } finally {
    loadingLock.value = false;
  }
};

onMounted(() => {
  loadViewer().then(() => {
    loadFile();
  }).catch((err) => {
    console.error('[PdfPreview] onMounted loadViewer failed:', err);
  });
  window.addEventListener('resize', resizeCanvas);
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas);
});

const isDrawing = ref(false);
const currentTool = ref('pen');
const currentColor = ref('#ff0000');
const brushSize = ref(4);
const brushSizes = [2, 4, 8, 12, 16];
const colors = ['#ff0000', '#00ff00', '#0000ff', '#000000', '#ffff00', '#ff00ff', '#00ffff', '#888888'];
const showColorPicker = ref(false);
const showMoreMenu = ref(false);

const drawingCanvas = ref(null);
const drawingToolbar = ref(null);
let ctx = null;
let isPainting = false;
let lastX = 0;
let lastY = 0;
const undoStack = ref([]);

const initCanvas = () => {
  const canvas = drawingCanvas.value;
  if (!canvas) return;
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext('2d');
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  undoStack.value = [];
};

const resizeCanvas = () => {
  const canvas = drawingCanvas.value;
  if (!canvas || !ctx) return;
  
  const offscreenCanvas = document.createElement('canvas');
  offscreenCanvas.width = canvas.width;
  offscreenCanvas.height = canvas.height;
  const offscreenCtx = offscreenCanvas.getContext('2d');
  offscreenCtx.drawImage(canvas, 0, 0);
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.drawImage(offscreenCanvas, 0, 0);
};

const saveState = () => {
  if (!ctx || !drawingCanvas.value) return;
  const offscreenCanvas = document.createElement('canvas');
  offscreenCanvas.width = drawingCanvas.value.width;
  offscreenCanvas.height = drawingCanvas.value.height;
  const offscreenCtx = offscreenCanvas.getContext('2d');
  offscreenCtx.drawImage(drawingCanvas.value, 0, 0);
  undoStack.value.push(offscreenCanvas);
  if (undoStack.value.length > 20) {
    undoStack.value.shift();
  }
};

const undo = () => {
  if (undoStack.value.length === 0 || !ctx || !drawingCanvas.value) return;
  const prevCanvas = undoStack.value.pop();
  ctx.clearRect(0, 0, drawingCanvas.value.width, drawingCanvas.value.height);
  ctx.drawImage(prevCanvas, 0, 0);
};

watch(isDrawing, (val) => {
  if (val) {
    nextTick(() => {
      initCanvas();
    });
  }
});

const toggleDrawing = () => {
  isDrawing.value = !isDrawing.value;
  if (!isDrawing.value) {
    currentTool.value = 'pen';
    undoStack.value = [];
    showColorPicker.value = false;
    showMoreMenu.value = false;
  }
};

const cycleBrushSize = () => {
  const currentIndex = brushSizes.indexOf(brushSize.value);
  brushSize.value = brushSizes[(currentIndex + 1) % brushSizes.length];
};

const selectColor = (color) => {
  currentColor.value = color;
  showColorPicker.value = false;
};

const setTool = (tool) => {
  currentTool.value = tool;
};

const isPointInToolbar = (clientX, clientY) => {
  const toolbar = drawingToolbar.value;
  if (!toolbar) return false;
  const rect = toolbar.getBoundingClientRect();
  return clientX >= rect.left && clientX <= rect.right &&
         clientY >= rect.top && clientY <= rect.bottom;
};

const getCanvasCoordinates = (e) => {
  const canvas = drawingCanvas.value;
  const rect = canvas.getBoundingClientRect();
  let clientX, clientY;
  
  if (e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
    clientX,
    clientY
  };
};

const startDrawing = (e) => {
  const coords = getCanvasCoordinates(e);
  if (isPointInToolbar(coords.clientX, coords.clientY)) return;
  
  isPainting = true;
  saveState();
  lastX = coords.x;
  lastY = coords.y;
};

const draw = (e) => {
  if (!isPainting || !ctx) return;
  
  const coords = getCanvasCoordinates(e);
  
  if (currentTool.value === 'eraser') {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = brushSize.value * 2;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';
  } else {
    ctx.strokeStyle = currentColor.value;
    ctx.lineWidth = brushSize.value;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  }
  
  lastX = coords.x;
  lastY = coords.y;
};

const stopDrawing = () => {
  isPainting = false;
};

const handleTouchStart = (e) => {
  const coords = getCanvasCoordinates(e);
  if (!isPointInToolbar(coords.clientX, coords.clientY)) {
    startDrawing(e);
  }
};

const handleTouchMove = (e) => {
  draw(e);
};

const clearCanvas = () => {
  if (!ctx || !drawingCanvas.value) return;
  saveState();
  ctx.clearRect(0, 0, drawingCanvas.value.width, drawingCanvas.value.height);
};
</script>

<style lang="less" scoped>
.pdf-preview-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.preview-content {
  flex: 1;
  overflow: hidden;
  position: relative;

  .preview-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--color-text-tertiary);
  }

  .preview-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--color-text-tertiary);

    p {
      margin-top: 16px;
      font-size: var(--font-size-sm);
    }
  }
}

.custom-toolbar {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  position: fixed;
  z-index: 100;
  bottom: var(--spacing-md);
  right: var(--spacing-md);
}

.drawing-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  cursor: crosshair;
  touch-action: none;
  background-color: rgba(0, 0, 0, 0.3);
}

.drawing-toolbar {
  position: fixed;
  bottom: var(--spacing-md);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 10000;
  pointer-events: auto;

  .toolbar-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0;
  }

  .icon() {
    width: 20px;
    height: 20px;
    background-size: contain;
    bground-repeat: no-repeat;
    bground-position: center center;
  }

  .icon-pencil {
    .icon();
    background-image: url('@/assets/svgs/icon-pencil.svg');
  }

  .icon-eraser {
    .icon();
    background-image: url('@/assets/svgs/icon-eraser.svg');
  }

  .icon-exit {
    .icon();
    background-image: url('@/assets/svgs/icon-exit.svg');
  }

  .icon-more {
    .icon();
    background-image: url('@/assets/svgs/icon-more.svg');
  }

  .color-btn,
  .size-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: #f5f5f5;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;

    &:active {
      transform: scale(0.95);
    }
  }

  .color-btn {
    .color-preview {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid #ddd;
    }
  }

  .color-dropdown {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.98);
    border-radius: 16px;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
    margin-bottom: 8px;

    .color-item {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.2s;

      &.active {
        border-color: #1989fa;
        transform: scale(1.15);
      }

      &:active {
        transform: scale(0.9);
      }
    }
  }

  .more-dropdown {
    position: absolute;
    bottom: 100%;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px;
    background: rgba(255, 255, 255, 0.98);
    border-radius: 12px;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
    margin-bottom: 8px;
    min-width: 100px;

    .more-btn {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 8px;
      padding: 10px 12px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;

      :deep(.van-icon) {
        width: 20px;
        text-align: center;
      }

      &:active {
        background: #f5f5f5;
      }

      &.disabled {
        opacity: 0.4;
        pointer-events: none;
      }

      span {
        font-size: 14px;
        color: #333;
      }
    }
  }
}

:deep(.ofv-root) {
  .ofv-toolbar {
    height: 0 !important;
    min-height: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
  }
}
</style>