<template>
  <div class="textbook-page">
    <div class="page-content">
      <SubjectTabs v-model="activeCategory" />

      <div v-if="filteredFiles.length > 0" class="file-list-container">
        <FileList
          :model-value="filteredFiles"
          :config="listConfig"
          :previewable="false"
          :get-download-url="getFileUrl"
          :get-download-file-name="getFileName"
          :action-items="getActionItems"
          @action="handleAction"
        />
      </div>

      <div v-else class="empty-tip">
        {{ t('tools.textbook.noFiles') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import FileList from '../components/FileList.vue';
import { useTextbook } from './hooks/useTextbook.js';
import SubjectTabs from './components/SubjectTabs.vue';

const { t } = useI18n();

const { activeCategory, filteredFiles, getFileUrl, getFileName } = useTextbook();

const listConfig = {
  draggable: false,
  showActions: true,
  layout: 'list',
  showFileSize: false,
  fileNameWrap: true,
  showRemove: false,
};

const getActionItems = (file) => {
  return [
    { name: t('tools.textbook.preview'), key: 'preview', color: '#1989fa' },
    { name: t('tools.textbook.download'), key: 'download' },
  ];
};

const handleAction = ({ key, file }) => {
  if (key === 'preview') {
    const url = getFileUrl(file);
    window.open(url, '_blank');
  } else if (key === 'download') {
    const url = getFileUrl(file);
    const name = getFileName(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};
</script>

<style lang="less" scoped>
.textbook-page {
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
