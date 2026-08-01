<template>
  <div class="laws-regulations-page">
    <div class="page-content">
      <LawTabs v-model="activeCategory" />

      <div v-if="filteredFiles.length > 0" class="file-list-container">
        <FileList
          :model-value="filteredFiles"
          :config="listConfig"
          :previewable="true"
          :get-download-url="getFileUrl"
          :get-download-file-name="getFileName"
          :action-items="getActionItems"
          @preview="handlePreview"
          @action="handleAction"
        />
      </div>

      <div v-else class="empty-tip">
        {{ t('tools.lawsRegulations.noFiles') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { showToast } from 'vant';
import FileList from '../components/FileList.vue';
import { useLawsRegulations } from './hooks/useLawsRegulations.js';
import LawTabs from './components/LawTabs.vue';

const router = useRouter();
const { t } = useI18n();

const { activeCategory, filteredFiles, getFileUrl, getFileName } = useLawsRegulations();

const listConfig = {
  draggable: false,
  showActions: true,
  layout: 'list',
  showFileSize: false,
  fileNameWrap: true,
  showRemove: false,
};

// 复用 PdfPreview 页面进行预览（与 Textbook/TuringBooks 一致）
const handlePreview = (file) => {
  const url = getFileUrl(file);
  const name = getFileName(file);
  router.push({
    name: 'PdfPreview',
    query: {
      url: encodeURIComponent(url),
      fileName: encodeURIComponent(name),
    },
  });
};

const getActionItems = (file) => {
  return [
    { name: t('tools.lawsRegulations.preview'), key: 'preview' },
    { name: t('tools.lawsRegulations.download'), key: 'download' },
    { name: t('tools.lawsRegulations.copyLink'), key: 'copyLink' },
  ];
};

const handleAction = ({ key, file }) => {
  if (key === 'preview') {
    handlePreview(file);
  } else if (key === 'download') {
    const url = getFileUrl(file);
    const name = getFileName(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else if (key === 'copyLink') {
    const url = getFileUrl(file);
    navigator.clipboard.writeText(url).then(() => {
      showToast({
        message: t('tools.lawsRegulations.linkCopied'),
        icon: 'success',
        duration: 2000,
      });
    }).catch(() => {
      showToast({
        message: t('tools.lawsRegulations.copyFailed'),
        icon: 'fail',
        duration: 2000,
      });
    });
  }
};
</script>

<style lang="less" scoped>
.laws-regulations-page {
  .page-content {
    .file-list-container {
      padding: 0 var(--spacing-md);
    }

    .empty-tip {
      text-align: center;
      color: var(--color-text-tertiary);
      font-size: var(--font-size-sm);
      padding: var(--spacing-xl) 0;
    }
  }
}
</style>
