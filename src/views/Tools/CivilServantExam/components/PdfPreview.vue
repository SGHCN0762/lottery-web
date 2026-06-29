<template>
  <van-popup
    v-model:show="showPopup"
    position="bottom"
    round
    :style="{ height: '90%' }"
    class="pdf-preview-popup"
    @update:show="emit('update:visible', $event)"
  >
    <div class="preview-header">
      <span class="preview-title">{{ fileName }}</span>
      <van-icon name="cross" class="preview-close" @click="emit('update:visible', false)" />
    </div>
    <div class="preview-content">
      <component
        v-if="currentFile && OpenFileViewer"
        :is="OpenFileViewer"
        :file="currentFile"
        :file-name="fileName"
        :width="'100%'"
        :height="'100%'"
        :plugins="plugins"
        fit="contain"
        toolbar
      />
      <div v-else class="preview-loading">
        <van-loading type="spinner" size="32px" />
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { ref, watch } from 'vue';
import {
  Popup as VanPopup,
  Icon as VanIcon,
  Loading as VanLoading,
} from 'vant';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  file: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['update:visible']);

const fileName = ref('');
const currentFile = ref(null);
const showPopup = ref(props.visible);

watch(() => props.visible, (val) => {
  showPopup.value = val;
});

let OpenFileViewer = null;
let plugins = null;

const loadViewer = async () => {
  if (!OpenFileViewer) {
    const { OpenFileViewer: Viewer } = await import('@open-file-viewer/vue');
    const { imagePlugin, pdfPlugin, textPlugin, officePlugin } = await import('@open-file-viewer/core');
    await import('@open-file-viewer/core/style.css');
    const pdfWorkerSrc = await import('pdfjs-dist/build/pdf.worker.mjs?url');
    OpenFileViewer = Viewer;
    plugins = [
      imagePlugin(),
      textPlugin(),
      pdfPlugin({ workerSrc: pdfWorkerSrc.default }),
      officePlugin(),
    ];
  }
};

const loadFile = async (file) => {
  if (!file) return;
  
  fileName.value = file.name;
  currentFile.value = null;
  
  try {
    await loadViewer();
    const response = await fetch(file.url);
    const blob = await response.blob();
    currentFile.value = new File([blob], file.name, { type: blob.type });
  } catch (error) {
    console.error('Failed to load PDF:', error);
  }
};

watch(() => props.file, (newFile) => {
  if (newFile) {
    loadFile(newFile);
  }
});
</script>

<style lang="less" scoped>
.pdf-preview-popup {
  display: flex;
  flex-direction: column;

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md) var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;

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
  }
}
</style>