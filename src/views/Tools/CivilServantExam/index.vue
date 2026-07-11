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

      <FilterTabs v-model="activeCategory" :tabs="categoryTabs" class="tabs" />

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
        {{ t('tools.civilServantExam.noFiles') }}
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
  import { useRouter } from 'vue-router';
  import { Search as VanSearch } from 'vant';
  import FileList from '../components/FileList.vue';
  import FilePreview from '../components/FilePreview.vue';
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

  const previewVisible = ref(false);
  const previewFileName = ref('');
  const previewFileUrl = ref('');

  const handlePreview = async (file) => {
    const url = getFileUrl(file);
    const name = getFileName(file);

    previewFileName.value = name;
    previewFileUrl.value = url;
    previewVisible.value = true;
  };

  const getActionItems = (file) => {
    const actions = [
      { name: t('tools.fileConverter.common.download'), key: 'download' },
      { name: t('tools.fileConverter.common.preview'), key: 'preview' },
    ];
    
    if (file.examJsonFile) {
      actions.push({ name: t('tools.civilServantExam.practice.title'), key: 'practice', color: '#1989fa' });
    }
    
    if (activeCategory.value === 'shenlun' || activeCategory.value === 'province-shenlun') {
      actions.push({ name: t('tools.civilServantExam.shenlun.practiceTitle'), key: 'shenlun', color: '#07c160' });
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
    } else if (key === 'shenlun') {
      router.push({ 
        name: 'CivilServantExamShenlun',
        query: { 
          fileName: encodeURIComponent(file.name)
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
    } else if (key === 'preview') {
      handlePreview(file);
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
          
      .tabs {
        margin: 0 var(--spacing-md) var(--spacing-md);
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