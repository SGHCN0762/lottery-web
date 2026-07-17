<template>
  <van-popup
    :show="visible"
    @update:show="$emit('update:visible', $event)"
    position="bottom"
    :style="{ height: '100%' }"
    class="file-preview-popup"
  >
    <div class="preview-header">
      <span class="preview-title">{{ displayFileName }}</span>
      <van-icon name="cross" class="preview-close" @click="$emit('update:visible', false)" />
    </div>
    <div class="preview-content">
      <component
        v-if="previewFile && viewerComponent"
        :is="viewerComponent"
        :file="previewFile"
        :file-name="displayFileName"
        :width="'100%'"
        :height="'100%'"
        :plugins="previewPlugins"
        toolbar
      />
      <div v-else-if="!previewFile && viewerComponent" class="preview-loading">
        <van-loading type="spinner" size="32px" />
      </div>
      <div v-else class="preview-error">
        <van-icon name="warning-o" size="48" color="#999" />
        <p>{{ t('tools.fileConverter.common.previewFailed') }}</p>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { ref, shallowRef, computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { Icon as VanIcon, Popup as VanPopup, Loading as VanLoading, showToast } from 'vant';

const { t } = useI18n();

const viewerComponent = shallowRef(null);
const defaultPlugins = ref(null);
let viewerLoadingPromise = null;

const loadViewer = async () => {
  // 已加载完成直接返回
  if (viewerComponent.value) return;
  // 正在加载中，复用同一个 promise 避免并发重复加载
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
          console.warn(`[FilePreview] init plugin ${name} failed:`, err);
        }
      };
      safeInit('image', imagePlugin);
      safeInit('text', textPlugin);
      safeInit('pdf', () => pdfPlugin({ pdfjs, workerSrc: pdfWorkerSrc.default, useFetchData: true }));
      safeInit('office', officePlugin);

      defaultPlugins.value = plugins;
      viewerComponent.value = Viewer;
    } catch (err) {
      console.error('[FilePreview] loadViewer failed:', err);
      throw err;
    } finally {
      viewerLoadingPromise = null;
    }
  })();

  return viewerLoadingPromise;
};

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  fileName: {
    type: String,
    default: '',
  },
  fileUrl: {
    type: String,
    default: '',
  },
  file: {
    type: File,
    default: null,
  },
  plugins: {
    type: Array,
    default: null,
  },
});

defineEmits(['update:visible', 'preview-error']);

const previewPlugins = ref([]);
const previewFile = ref(null);
const loadingLock = ref(false);

const displayFileName = computed(() => {
  if (props.file) {
    return props.file.name || props.fileName || '未知文件';
  }
  return props.fileName || '未知文件';
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
  if (!props.visible) return;
  if (loadingLock.value) return;
  loadingLock.value = true;

  previewFile.value = null;

  try {
    await loadViewer();

    if (props.file) {
      previewFile.value = props.file;
    } else if (props.fileUrl) {
      const response = await fetch(props.fileUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const type = blob.type || inferFileType(displayFileName.value);
      previewFile.value = new File([blob], displayFileName.value, { type });
    }

    previewPlugins.value = props.plugins || defaultPlugins.value;
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

// 合并为单个 watcher：visible / file / fileUrl / fileName 同步批量变更时只触发一次回调，
// 避免 loadFile() 被重复调用导致多次 fetch 和 OpenFileViewer 重复渲染
watch(
  () => [props.visible, props.file, props.fileUrl, props.fileName],
  async ([newVisible]) => {
    if (newVisible) {
      await loadFile();
    } else {
      previewFile.value = null;
    }
  }
);

onMounted(() => {
  loadViewer().catch((err) => {
    console.error('[FilePreview] onMounted loadViewer failed:', err);
  });
});
</script>

<style lang="less" scoped>
.file-preview-popup {
  display: flex;
  flex-direction: column;

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md) var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);

    .preview-title {
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-primary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 80%;
    }

    .preview-close {
      font-size: 20px;
      color: var(--color-text-secondary);
      cursor: pointer;
    }
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
}
</style>