<template>
  <div class="civil-servant-exam-page">
    <div class="page-content">
      <div class="search-section">
        <van-search
          v-model="searchKeyword"
          placeholder="搜索年份、省份、考试名称..."
          shape="round"
        />
      </div>

      <FilterTabs v-model="activeCategory" :tabs="categoryTabs" />

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
  import { Search as VanSearch } from 'vant';
  import FileList from '../components/FileList.vue';
  import { useCivilServantExam, categories } from './hooks/useCivilServantExam';
  import FilterTabs from '@/components/FilterTabs/index.vue';

  const { t } = useI18n();
  const router = useRouter();

  const { activeCategory, searchKeyword, filteredFiles, getFileUrl, getFileName } = useCivilServantExam();

  const categoryTabs = categories;

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
  .civil-servant-exam-page {
    .page-content {
      .search-section {
        padding: var(--spacing-md);
        flex-shrink: 0;
      }

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