<template>
  <div class="resume-editor">
    <van-notice-bar mode="warning" left-icon="warning-o" :text="t('resume.messages.warning')" />

    <div class="editor-container">
      <div class="edit-section">
        <van-tabs v-model:active="activeTab" sticky :animated="false">
          <van-tab key="basic" :title="t('resume.tabs.basic')">
            <BasicInfo v-model="resumeData.basic" @update:model-value="saveResumeData" />
          </van-tab>
          <van-tab key="experience" :title="t('resume.tabs.experience')">
            <ExperienceList v-model="resumeData.experience" @update:model-value="saveResumeData" />
          </van-tab>
          <van-tab key="project" :title="t('resume.tabs.project')">
            <ProjectList v-model="resumeData.project" @update:model-value="saveResumeData" />
          </van-tab>
          <van-tab key="education" :title="t('resume.tabs.education')">
            <EducationList v-model="resumeData.education" @update:model-value="saveResumeData" />
          </van-tab>
          <van-tab key="skills" :title="t('resume.tabs.skills')">
            <SkillsEditor v-model="resumeData.skills" @update:model-value="saveResumeData" />
          </van-tab>
          <van-tab key="custom" :title="'自定义模块'">
            <CustomSectionsEditor v-model="resumeData.customSections" @update:model-value="saveResumeData" />
          </van-tab>
          <van-tab key="theme" :title="t('resume.tabs.theme')">
            <ThemeSettings v-model="themeSettingsRef" @update:model-value="onThemeSettingsChange" />
          </van-tab>
        </van-tabs>
      </div>

      <div class="action-bar">
        <van-button type="default" @click="handleImport">
          <van-icon name="upload" />{{ t('resume.actions.import') }}
        </van-button>
        <van-button type="default" @click="showPreview = true">
          <van-icon name="eye-o" />{{ t('resume.actions.preview') }}
        </van-button>
        <van-button type="primary" @click="showExportMenu = true">
          <van-icon name="down" />{{ t('resume.actions.export') }}
        </van-button>
      </div>

      <input ref="fileInputRef" type="file" accept=".json" class="file-input" @change="handleFileSelect" />
    </div>

    <van-popup v-model:show="showPreview" position="bottom" :style="{ height: '90%' }" round>
      <ResumePreview :themeSettings="resumeData.themeSettings" :resume="safeResumeData" @close="showPreview = false" />
    </van-popup>

    <van-action-sheet
      v-model:show="showExportMenu"
      :actions="exportActions"
      :cancel-text="t('resume.common.cancel')"
      @select="handleExportSelect"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { showSuccessToast, showFailToast } from 'vant';
import { Tabs as VanTabs, Tab as VanTab, Button as VanButton, Icon as VanIcon, Popup as VanPopup, NoticeBar as VanNoticeBar, ActionSheet as VanActionSheet } from 'vant';
import BasicInfo from './components/editor/BasicInfo.vue';
import ExperienceList from './components/editor/ExperienceList.vue';
import EducationList from './components/editor/EducationList.vue';
import ProjectList from './components/editor/ProjectList.vue';
import SkillsEditor from './components/editor/SkillsEditor.vue';
import ResumePreview from './components/perviewer/ResumePreview.vue';
import ThemeSettings from './components/editor/ThemeSettings.vue';
import CustomSectionsEditor from './components/editor/CustomSectionsEditor.vue';
import { useResumeData, createExportData } from './hooks/useResumeData';
import { useExport } from './hooks/useExport';

const { t } = useI18n();

const activeTab = ref(0);
const showPreview = ref(false);
const showExportMenu = ref(false);
const fileInputRef = ref(null);

const { resumeData, sanitizeResume, validateResumeData, updateThemeSettings, saveResumeData } = useResumeData();

// 创建一个 ref 用于 ThemeSettings 组件的 v-model
const themeSettingsRef = ref({ ...resumeData.value.themeSettings });

// 双向同步：resumeData 变化时更新 ref
watch(() => resumeData.value.themeSettings, (newSettings) => {
  themeSettingsRef.value = { ...newSettings };
}, { deep: true });

const safeResumeData = computed(() => sanitizeResume(resumeData.value));

const exportActions = computed(() => [
  { name: t('resume.exportFormats.json'), value: 'json', icon: 'file' },
  { name: t('resume.exportFormats.markdown'), value: 'markdown', icon: 'file' },
  { name: t('resume.exportFormats.image'), value: 'image', icon: 'image' },
  { name: t('resume.exportFormats.pdf'), value: 'pdf', icon: 'file' },
]);

// 修改导出函数，让 JSON 导出包含主题配置
const exportHooks = useExport(safeResumeData, t);
const { handleExport: originalHandleExport } = exportHooks;

const handleExport = (format, showPreviewRef, theme) => {
  if (format === 'json') {
    // JSON 导出包含主题配置
    try {
      const exportData = createExportData(resumeData.value);
      const dataStr = JSON.stringify(exportData, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `resume_${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
      showSuccessToast(t('resume.messages.exportSuccess'));
    } catch (error) {
      console.error('Export JSON error:', error);
      showFailToast(t('resume.messages.exportFailed'));
    }
  } else if (format === 'image') {
    exportHooks.exportToImage(showPreviewRef);
  } else if (format === 'pdf') {
    // PDF 导出使用 jsPDF
    exportHooks.exportToPDF(showPreviewRef);
  } else {
    // 其他格式使用原导出函数
    originalHandleExport(format, showPreviewRef, theme);
  }
};

const onThemeSettingsChange = (settings) => {
  updateThemeSettings(settings);
};

const handleImport = () => fileInputRef.value?.click();

const handleFileSelect = (event) => {
  const file = event.target?.files?.[0];
  if (!file) return;

  if (!file.name.toLowerCase().endsWith('.json')) {
    showFailToast(t('resume.messages.invalidFormat'));
    event.target.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target?.result);
      if (validateResumeData(data)) {
        resumeData.value = sanitizeResume(data);
        saveResumeData();
        showSuccessToast(t('resume.messages.importSuccess'));
      } else {
        showFailToast(t('resume.messages.invalidFormat'));
      }
    } catch {
      showFailToast(t('resume.messages.importFailed'));
    }
  };
  reader.onerror = () => showFailToast(t('resume.messages.importFailed'));
  reader.readAsText(file);
  event.target.value = '';
};

const handleExportSelect = (action) => {
  showExportMenu.value = false;
  handleExport(action.value, showPreview, resumeData.value.themeSettings.theme);
};
</script>

<style lang="less" scoped>
.resume-editor {
  min-height: 100%;
  background: var(--color-bg-primary);
}

.editor-container {
  padding-bottom: 80px;
}

.edit-section {
  :deep(.van-tabs__wrap) { background: var(--color-bg-secondary); }
  :deep(.van-tab) { font-size: var(--font-size-base); }
  :deep(.van-tabs__content) { padding: var(--spacing-md); }
}

.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  padding-bottom: calc(var(--spacing-md) + env(safe-area-inset-bottom, 0px));
  z-index: 100;
  .van-button { flex: 1; }
}

.file-input { display: none; }
</style>