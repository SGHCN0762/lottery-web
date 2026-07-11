<template>
  <div class="textbook-page">
    <div class="page-content">
      <SubjectTabs v-model="activeCategory" />

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
        {{ t('tools.textbook.noFiles') }}
      </div>
    </div>

    <FilePreview
      v-model:visible="previewVisible"
      :file-name="previewFileName"
      :file-url="previewFileUrl"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import FileList from '../components/FileList.vue';
import FilePreview from '../components/FilePreview.vue';
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

const previewVisible = ref(false);
const previewFileName = ref('');
const previewFileUrl = ref('');

const handlePreview = (file) => {
  previewFileName.value = getFileName(file);
  previewFileUrl.value = getFileUrl(file);
  previewVisible.value = true;
};

const getActionItems = (file) => {
  return [
    { name: t('tools.textbook.preview'), key: 'preview' },
    { name: t('tools.textbook.download'), key: 'download' },
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
