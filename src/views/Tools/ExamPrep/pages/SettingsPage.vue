<template>
  <div class="settings-page">
    <div class="settings-content">
      <!-- 答题设置 -->
      <ToolCard class="settings-card" :title="t('tools.examPrep.settings.answerSettings')">        
        <van-cell-group :border="false">
          <van-cell :title="t('tools.examPrep.settings.autoShowAnalysis')">
            <template #right-icon>
              <van-switch v-model="settings.autoShowAnalysis" @change="handleSettingChange('autoShowAnalysis')" />
            </template>
          </van-cell>

          <van-cell :title="t('tools.examPrep.settings.autoNextQuestion')">
            <template #right-icon>
              <van-switch v-model="settings.autoNextQuestion" @change="handleSettingChange('autoNextQuestion')" />
            </template>
          </van-cell>

          <van-cell :title="t('tools.examPrep.settings.soundEnabled')">
            <template #right-icon>
              <van-switch v-model="settings.soundEnabled" @change="handleSettingChange('soundEnabled')" />
            </template>
          </van-cell>

          <van-cell :title="t('tools.examPrep.settings.vibrationEnabled')">
            <template #right-icon>
              <van-switch v-model="settings.vibrationEnabled" @change="handleSettingChange('vibrationEnabled')" />
            </template>
          </van-cell>
        </van-cell-group>
      </ToolCard>
      
      <!-- 练习设置 -->
      <ToolCard class="settings-card" :title="t('tools.examPrep.settings.practiceSettings')">
        <van-cell-group :border="false">
          <van-cell :title="t('tools.examPrep.settings.questionCountPerPractice')">
            <template #value>
              <div class="question-count-control">
                <van-stepper
                  v-model="settings.questionCountPerPractice"
                  min="5"
                  max="50"
                  step="5"
                  @change="handleSettingChange('questionCountPerPractice')"
                />
              </div>
            </template>
          </van-cell>
        </van-cell-group>
      </ToolCard>

      <!-- 数据管理 -->
      <ToolCard class="settings-card" :title="t('tools.examPrep.settings.dataManagement')">
        <van-cell-group :border="false">
          <van-cell
            :title="t('tools.examPrep.settings.backupData')"
            :label="t('tools.examPrep.settings.backupHint')"
            is-link
            @click="handleBackupClick"
          />

          <van-cell
            :title="t('tools.examPrep.settings.clearAllData')"
            :label="t('tools.examPrep.settings.clearDataWarning')"
            is-link
            @click="handleClearDataClick"
          />
        </van-cell-group>
      </ToolCard>

      <!-- 题库管理 -->
      <ToolCard class="settings-card" :title="t('tools.examPrep.settings.questionBank')">
        <van-cell-group :border="false">
          <van-cell :title="t('tools.examPrep.settings.totalQuestions')" :value="questionStats.total" />
          <van-cell :title="t('tools.examPrep.settings.currentVersion')" :value="currentVersion || '-'" />
          <van-cell
            :title="t('tools.examPrep.settings.importQuestions')"
            :label="t('tools.examPrep.settings.importHint')"
            is-link
            :disabled="isImporting"
            @click="handleImportQuestions"
          />
          <van-cell
            :title="t('tools.examPrep.settings.clearQuestions')"
            :label="t('tools.examPrep.settings.clearQuestionsHint')"
            is-link
            :disabled="isImporting"
            @click="handleClearQuestionsClick"
          />
        </van-cell-group>

        <div v-if="isImporting" class="import-progress-section">
          <div class="progress-header">
            <span class="progress-text">{{ importStatusText }}</span>
            <span class="progress-percent">{{ importProgress }}%</span>
          </div>
          <van-progress :percentage="importProgress" :color="'#2196F3'" :stroke-width="8" />
        </div>

        <div v-if="questionStats.categories && Object.keys(questionStats.categories).length > 0" class="category-stats">
          <div class="category-stats-title">{{ t('tools.examPrep.settings.categoryStats') }}</div>
          <van-grid :column-num="3" :border="false">
            <van-grid-item v-for="(count, category) in questionStats.categories" :key="category">
              <div class="category-stat-item">
                <div class="category-stat-count">{{ count }}</div>
                <div class="category-stat-name">{{ getCategoryName(category) }}</div>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
      </ToolCard>

      <!-- 其他 -->
      <ToolCard class="settings-card" :title="t('tools.examPrep.settings.other')">
        <van-cell-group :border="false">
          <van-cell
            :title="t('tools.examPrep.settings.aboutSoftware')"
            is-link
            @click="handleAboutClick"
          />

          <van-cell
            :title="t('tools.examPrep.settings.resetSettings')"
            is-link
            @click="handleResetSettingsClick"
          />
        </van-cell-group>
      </ToolCard>
    </div>

    <!-- 主题选择弹出层 -->
    <van-popup v-model:show="showThemePicker" position="bottom" round>
      <van-picker
        :columns="themeOptions"
        :default-index="getThemeIndex(settings.theme)"
        @confirm="handleThemeConfirm"
        @cancel="showThemePicker = false"
      />
    </van-popup>

    <!-- 字体大小选择弹出层 -->
    <van-popup v-model:show="showFontSizePicker" position="bottom" round>
      <van-picker
        :columns="fontSizeOptions"
        :default-index="getFontSizeIndex(settings.fontSize)"
        @confirm="handleFontSizeConfirm"
        @cancel="showFontSizePicker = false"
      />
    </van-popup>

    <!-- 清空数据确认对话框 -->
    <van-dialog
      v-model:show="showClearDataDialog"
      :title="t('tools.examPrep.settings.clearDataTitle')"
      :message="t('tools.examPrep.settings.clearDataMessage')"
      show-cancel-button
      @confirm="handleClearDataConfirm"
    />

    <!-- 清空题库确认对话框 -->
    <van-dialog
      v-model:show="showClearQuestionsDialog"
      :title="t('tools.examPrep.settings.clearQuestionsTitle')"
      :message="t('tools.examPrep.settings.clearQuestionsMessage')"
      show-cancel-button
      @confirm="handleClearQuestionsConfirm"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { showToast, showConfirmDialog } from 'vant';
import {
  NavBar as VanNavBar,
  Cell as VanCell,
  CellGroup as VanCellGroup,
  Switch as VanSwitch,
  Stepper as VanStepper,
  Icon as VanIcon,
  Popup as VanPopup,
  Picker as VanPicker,
  Dialog as VanDialog,
  Progress as VanProgress,
  Grid as VanGrid,
  GridItem as VanGridItem,
} from 'vant';
import ToolCard from '../../components/ToolCard.vue';
import { useDatabase } from '../hooks/useDatabase.js';
import { DEFAULT_SETTINGS } from '../utils/constants.js';
import { loadAndImportQuestionBank, getCurrentQuestionBankVersion } from '../utils/questionImporter.js';

const { t } = useI18n();
const router = useRouter();
const database = useDatabase();

// 设置数据
const settings = ref({ ...DEFAULT_SETTINGS });

// 弹出层控制
const showThemePicker = ref(false);
const showFontSizePicker = ref(false);
const showClearDataDialog = ref(false);
const showClearQuestionsDialog = ref(false);

// 题库管理状态
const isImporting = ref(false);
const importProgress = ref(0);
const importStatusText = ref('');
const questionStats = ref({ total: 0, categories: {}, difficulties: {} });
const currentVersion = ref('');

// 主题选项
const themeOptions = [
  { text: t('tools.examPrep.settings.themeLight'), value: 'light' },
  { text: t('tools.examPrep.settings.themeDark'), value: 'dark' },
];

// 字体大小选项
const fontSizeOptions = [
  { text: t('tools.examPrep.settings.fontSizeSmall'), value: 'small' },
  { text: t('tools.examPrep.settings.fontSizeMedium'), value: 'medium' },
  { text: t('tools.examPrep.settings.fontSizeLarge'), value: 'large' },
];

/**
 * 加载设置
 */
const loadSettings = async () => {
  try {
    const allSettings = await database.getAllSettings();
    settings.value = { ...DEFAULT_SETTINGS, ...allSettings };
  } catch (error) {
    console.error('加载设置失败:', error);
    showToast(t('tools.examPrep.settings.loadFailed'));
  }
};

/**
 * 处理设置变更
 */
const handleSettingChange = async (key) => {
  try {
    await database.saveSetting(key, settings.value[key]);
    showToast(t('tools.examPrep.settings.saveSuccess'));
  } catch (error) {
    console.error('保存设置失败:', error);
    showToast(t('tools.examPrep.settings.saveFailed'));
  }
};

/**
 * 获取主题名称
 */
const getThemeName = (theme) => {
  const option = themeOptions.find(opt => opt.value === theme);
  return option ? option.text : theme;
};

/**
 * 获取主题索引
 */
const getThemeIndex = (theme) => {
  return themeOptions.findIndex(opt => opt.value === theme);
};

/**
 * 获取字体大小名称
 */
const getFontSizeName = (fontSize) => {
  const option = fontSizeOptions.find(opt => opt.value === fontSize);
  return option ? option.text : fontSize;
};

/**
 * 获取字体大小索引
 */
const getFontSizeIndex = (fontSize) => {
  return fontSizeOptions.findIndex(opt => opt.value === fontSize);
};

/**
 * 获取分类名称
 */
const getCategoryName = (categoryId) => {
  const categoryMap = {
    verbal: t('tools.examPrep.categories.verbal'),
    logic: t('tools.examPrep.categories.logic'),
    math: t('tools.examPrep.categories.math'),
    data: t('tools.examPrep.categories.data'),
    common: t('tools.examPrep.categories.common'),
  };
  return categoryMap[categoryId] || categoryId;
};

/**
 * 加载题库统计
 */
const loadQuestionStats = async () => {
  try {
    const stats = await database.getQuestionStats();
    questionStats.value = stats;
    const version = await getCurrentQuestionBankVersion();
    currentVersion.value = version || '';
  } catch (error) {
    console.error('加载题库统计失败:', error);
  }
};

/**
 * 处理导入题库
 */
const handleImportQuestions = async () => {
  if (isImporting.value) return;

  try {
    await showConfirmDialog({
      title: t('tools.examPrep.settings.importConfirmTitle'),
      message: t('tools.examPrep.settings.importConfirmMessage'),
    });

    isImporting.value = true;
    importProgress.value = 0;
    importStatusText.value = t('tools.examPrep.settings.loadingQuestionBank');

    const result = await loadAndImportQuestionBank({
      clearFirst: false,
      skipDuplicates: true,
      onLoadStart: () => {
        importStatusText.value = t('tools.examPrep.settings.loadingQuestionBank');
      },
      onLoadComplete: (count, version) => {
        importStatusText.value = t('tools.examPrep.settings.importingQuestions', { count });
      },
      onProgress: (progress, current, total) => {
        importProgress.value = progress;
        importStatusText.value = t('tools.examPrep.settings.importingProgress', { current, total });
      },
    });

    importStatusText.value = t('tools.examPrep.settings.importSuccess');
    showToast(t('tools.examPrep.settings.importSuccessMessage', { 
      added: result.addedCount, 
      skipped: result.skippedCount 
    }));

    await loadQuestionStats();
    await loadSettings();
  } catch (error) {
    if (error !== 'cancel') {
      console.error('导入题库失败:', error);
      showToast(t('tools.examPrep.settings.importFailed'));
    }
  } finally {
    setTimeout(() => {
      isImporting.value = false;
      importProgress.value = 0;
      importStatusText.value = '';
    }, 1000);
  }
};

/**
 * 处理清空题库点击
 */
const handleClearQuestionsClick = () => {
  showClearQuestionsDialog.value = true;
};

/**
 * 处理清空题库确认
 */
const handleClearQuestionsConfirm = async () => {
  try {
    await database.clearQuestions();
    showToast(t('tools.examPrep.settings.clearQuestionsSuccess'));
    await loadQuestionStats();
  } catch (error) {
    console.error('清空题库失败:', error);
    showToast(t('tools.examPrep.settings.clearQuestionsFailed'));
  }
};

/**
 * 处理主题选择确认
 */
const handleThemeConfirm = async ({ selectedOptions }) => {
  const selected = selectedOptions[0];
  settings.value.theme = selected.value;
  await handleSettingChange('theme');
  showThemePicker.value = false;
};

/**
 * 处理字体大小选择确认
 */
const handleFontSizeConfirm = async ({ selectedOptions }) => {
  const selected = selectedOptions[0];
  settings.value.fontSize = selected.value;
  await handleSettingChange('fontSize');
  showFontSizePicker.value = false;
};

/**
 * 处理备份点击
 */
const handleBackupClick = () => {
  router.push('/tools/exam-prep/backup');
};

/**
 * 处理清空数据点击
 */
const handleClearDataClick = () => {
  showClearDataDialog.value = true;
};

/**
 * 处理清空数据确认
 */
const handleClearDataConfirm = async () => {
  try {
    await database.clearAllData();
    showToast(t('tools.examPrep.settings.clearSuccess'));

    // 清空后重新初始化数据库
    await database.initializeDatabase();

    // 重新加载设置
    await loadSettings();
  } catch (error) {
    console.error('清空数据失败:', error);
    showToast(t('tools.examPrep.settings.clearFailed'));
  }
};

/**
 * 处理关于点击
 */
const handleAboutClick = () => {
  router.push('/tools/exam-prep/about');
};

/**
 * 处理重置设置点击
 */
const handleResetSettingsClick = async () => {
  try {
    await showConfirmDialog({
      title: t('tools.examPrep.settings.resetTitle'),
      message: t('tools.examPrep.settings.resetMessage'),
    });

    await database.resetSettings();
    settings.value = { ...DEFAULT_SETTINGS };
    showToast(t('tools.examPrep.settings.resetSuccess'));
  } catch (error) {
    // 用户取消或操作失败
    if (error !== 'cancel') {
      console.error('重置设置失败:', error);
      showToast(t('tools.examPrep.settings.resetFailed'));
    }
  }
};

// 初始化
onMounted(() => {
  loadSettings();
  loadQuestionStats();
});
</script>

<style lang="less" scoped>
.settings-page {
  .settings-content {
    padding: var(--spacing-md);

    .settings-card {
      margin-bottom: var(--spacing-md);

      :deep(.card-body) {
        padding: 0;
      }

      .cell-icon {
        font-size: 20px;
        margin-right: var(--spacing-sm);
      }

      .question-count-control {
        display: flex;
        align-items: center;
      }

      :deep(.van-cell) {
        padding: var(--spacing-md) var(--spacing-lg);
        background: var(--color-bg-secondary);
        margin: var(--spacing-xs) 0;
        border-radius: var(--radius-lg);

        &:hover {
          background: var(--color-bg-tertiary);
        }

        .van-cell__title {
          color: var(--color-text-primary);
          font-weight: 500;
        }

        .van-cell__value {
          color: var(--color-text-secondary);
        }

        .van-cell__label {
          color: var(--color-text-tertiary);
          font-size: 12px;
          margin-top: var(--spacing-xs);
        }
      }

      :deep(.van-switch) {
        font-size: 24px;
      }

      :deep(.van-stepper) {
        .van-stepper__input {
          background: var(--color-bg-primary);
          color: var(--color-text-primary);
        }
      }

      .import-progress-section {
        margin: var(--spacing-md) var(--spacing-lg);
        padding: var(--spacing-md);
        background: var(--color-bg-tertiary);
        border-radius: var(--radius-lg);

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-sm);

          .progress-text {
            font-size: 13px;
            color: var(--color-text-secondary);
          }

          .progress-percent {
            font-size: 13px;
            font-weight: 600;
            color: var(--color-primary);
          }
        }
      }

      .category-stats {
        margin: var(--spacing-md) var(--spacing-lg);

        .category-stats-title {
          font-weight: 500;
          font-size: 14px;
          color: var(--color-text-primary);
          margin-bottom: var(--spacing-sm);
        }

        .category-stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;

          .category-stat-count {
            font-size: 18px;
            font-weight: 600;
            color: var(--color-primary);
          }

          .category-stat-name {
            font-size: 11px;
            color: var(--color-text-tertiary);
          }
        }

        :deep(.van-grid-item__content) {
          padding: var(--spacing-xs) 0;
        }
      }
    }
  }

  :deep(.van-popup) {
    .van-picker {
      background: var(--color-bg-secondary);
    }
  }
}
</style>