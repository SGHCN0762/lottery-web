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
              :title="t('common.pdfPreview.zoomIn')"
            />
            <van-button
              icon="minus"
              :disabled="!ctx.canCommand('zoom-out')"
              @click="ctx.command('zoom-out')"
              :title="t('common.pdfPreview.zoomOut')"
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
  </div>
</template>

<script setup>
import { ref, shallowRef, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Button as VanButton, Icon as VanIcon, Loading as VanLoading, showToast } from 'vant';

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
});
</script>

<style lang="less" scoped>
.pdf-preview-page {
  display: flex;
  flex-direction: column;
  height: 100vh;

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

.custom-toolbar {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  position: fixed;
  z-index: var(--z-fixed);
  bottom: var(--spacing-md);
  right: var(--spacing-md);
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