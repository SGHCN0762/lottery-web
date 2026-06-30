<template>
  <div class="civil-servant-exam-page">
    <div class="page-content">
      <CategoryTabs v-model="activeCategory" />

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
        {{ t('tools.civilServantExam.noFiles') }}
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import FileList from '../components/FileList.vue';
  import { useCivilServantExam } from './hooks/useCivilServantExam';
  import CategoryTabs from './components/CategoryTabs.vue';

  const { t } = useI18n();
  const router = useRouter();

  const { activeCategory, filteredFiles, getFileUrl, getFileName } = useCivilServantExam();

  const listConfig = {
    draggable: false,
    showActions: true,
    layout: 'list',
    showFileSize: false,
    fileNameWrap: true,
    showRemove: false,
  };

  const getActionItems = (file) => {
    const actions = [
      { name: t('tools.fileConverter.common.download'), key: 'download' },
    ];
    
    if (file.examJsonFile) {
      actions.push({ name: t('tools.civilServantExam.practice.title'), key: 'practice', color: '#1989fa' });
    }
    
    return actions;
  };

  const handleAction = ({ key, file }) => {
    if (key === 'practice' && file.examJsonFile) {
      router.push({ 
        name: 'CivilServantExamPractice',
        query: { 
          year: file.examJsonFile.year,
          fileName: encodeURIComponent(file.examJsonFile.name)
        }
      });
    }
  };
</script>

<style lang="less" scoped>
  .civil-servant-exam-page {
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