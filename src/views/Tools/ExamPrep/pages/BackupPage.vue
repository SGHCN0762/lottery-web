<template>
  <div class="backup-page">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      :title="t('tools.examPrep.backup.title')"
      left-arrow
      fixed
      @click-left="handleBack"
    />

    <div class="backup-content">
      <!-- 数据概览 -->
      <ToolCard class="backup-card" :title="t('tools.examPrep.backup.dataOverview')" icon="chart">
        <div class="data-overview">
          <van-grid :column-num="3" :border="false">
            <van-grid-item>
              <div class="overview-item">
                <div class="overview-value">{{ dataSize.questions || 0 }}</div>
                <div class="overview-label">{{ t('tools.examPrep.backup.questions') }}</div>
              </div>
            </van-grid-item>
            <van-grid-item>
              <div class="overview-item">
                <div class="overview-value">{{ dataSize.records || 0 }}</div>
                <div class="overview-label">{{ t('tools.examPrep.backup.records') }}</div>
              </div>
            </van-grid-item>
            <van-grid-item>
              <div class="overview-item">
                <div class="overview-value">{{ dataSize.collections || 0 }}</div>
                <div class="overview-label">{{ t('tools.examPrep.backup.collections') }}</div>
              </div>
            </van-grid-item>
          </van-grid>

          <div class="data-size-info">
            <van-icon name="info" class="info-icon" />
            <span>{{ t('tools.examPrep.backup.totalSize', { size: formatDataSize(dataSize.total || 0) }) }}</span>
          </div>

          <div v-if="lastBackupTime" class="last-backup-info">
            <van-icon name="clock" class="info-icon" />
            <span>{{ t('tools.examPrep.backup.lastBackupTime', { time: formatDate(lastBackupTime) }) }}</span>
          </div>
        </div>
      </ToolCard>

      <!-- 备份操作 -->
      <ToolCard class="backup-card" :title="t('tools.examPrep.backup.operations')" icon="downland">
        <div class="backup-actions">
          <!-- 导出数据 -->
          <div class="backup-action-item">
            <van-button
              type="primary"
              size="large"
              block
              icon="download"
              :loading="exporting"
              @click="handleExportData"
            >
              {{ t('tools.examPrep.backup.exportData') }}
            </van-button>
            <p class="action-description">{{ t('tools.examPrep.backup.exportDescription') }}</p>
          </div>

          <!-- 导入数据 -->
          <div class="backup-action-item">
            <van-button
              type="success"
              size="large"
              block
              icon="upload"
              :loading="importing"
              @click="handleImportData"
            >
              {{ t('tools.examPrep.backup.importData') }}
            </van-button>
            <p class="action-description">{{ t('tools.examPrep.backup.importDescription') }}</p>
          </div>

          <!-- 文件上传 -->
          <input
            ref="fileInput"
            type="file"
            accept=".json"
            style="display: none"
            @change="handleFileChange"
          />
        </div>
      </ToolCard>

      <!-- 备份说明 -->
      <ToolCard class="backup-card" :title="t('tools.examPrep.backup.backupGuide')" icon="question">
        <div class="backup-guide">
          <div class="guide-section">
            <h4 class="guide-title">{{ t('tools.examPrep.backup.whyBackup') }}</h4>
            <p class="guide-content">{{ t('tools.examPrep.backup.whyBackupContent') }}</p>
          </div>

          <div class="guide-section">
            <h4 class="guide-title">{{ t('tools.examPrep.backup.howToBackup') }}</h4>
            <div class="guide-steps">
              <div class="guide-step">
                <van-icon name="passed" class="step-icon" />
                <span>{{ t('tools.examPrep.backup.backupStep1') }}</span>
              </div>
              <div class="guide-step">
                <van-icon name="passed" class="step-icon" />
                <span>{{ t('tools.examPrep.backup.backupStep2') }}</span>
              </div>
              <div class="guide-step">
                <van-icon name="passed" class="step-icon" />
                <span>{{ t('tools.examPrep.backup.backupStep3') }}</span>
              </div>
            </div>
          </div>

          <div class="guide-section">
            <h4 class="guide-title">{{ t('tools.examPrep.backup.howToRestore') }}</h4>
            <div class="guide-steps">
              <div class="guide-step">
                <van-icon name="passed" class="step-icon" />
                <span>{{ t('tools.examPrep.backup.restoreStep1') }}</span>
              </div>
              <div class="guide-step">
                <van-icon name="passed" class="step-icon" />
                <span>{{ t('tools.examPrep.backup.restoreStep2') }}</span>
              </div>
              <div class="guide-step">
                <van-icon name="passed" class="step-icon" />
                <span>{{ t('tools.examPrep.backup.restoreStep3') }}</span>
              </div>
            </div>
          </div>

          <div class="guide-section warning-section">
            <van-icon name="warning" class="warning-icon" />
            <p class="guide-warning">{{ t('tools.examPrep.backup.backupWarning') }}</p>
          </div>
        </div>
      </ToolCard>

      <!-- 定期备份提醒 -->
      <ToolCard class="backup-card highlight-card" :title="t('tools.examPrep.backup.backupReminder')" icon="bell">
        <div class="reminder-content">
          <div class="reminder-icon-wrapper">
            <van-icon name="star" class="reminder-icon" />
          </div>
          <p class="reminder-text">{{ t('tools.examPrep.backup.reminderText') }}</p>
          <div class="reminder-actions">
            <van-button type="primary" size="small" @click="handleSetReminder">
              {{ t('tools.examPrep.backup.setReminder') }}
            </van-button>
          </div>
        </div>
      </ToolCard>
    </div>

    <!-- 导入进度对话框 -->
    <van-dialog
      v-model:show="showImportDialog"
      :title="t('tools.examPrep.backup.importing')"
      :message="importMessage"
      :show-confirm-button="false"
    />

    <!-- 导入结果对话框 -->
    <van-dialog
      v-model:show="showImportResultDialog"
      :title="t('tools.examPrep.backup.importResult')"
      :message="importResultMessage"
      show-cancel-button
      :confirm-button-text="t('tools.examPrep.backup.viewDetails')"
      @confirm="handleViewImportDetails"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { showToast } from 'vant';
import {
  NavBar as VanNavBar,
  Button as VanButton,
  Grid as VanGrid,
  GridItem as VanGridItem,
  Icon as VanIcon,
  Dialog as VanDialog,
} from 'vant';
import ToolCard from '../../components/ToolCard.vue';
import { useDatabase } from '../hooks/useDatabase.js';
import { formatDate } from '../utils/helpers.js';

const { t } = useI18n();
const router = useRouter();
const database = useDatabase();

// 数据大小
const dataSize = ref({
  questions: 0,
  records: 0,
  collections: 0,
  notes: 0,
  examRecords: 0,
  total: 0,
});

// 最后备份时间
const lastBackupTime = ref(null);

// 加载状态
const exporting = ref(false);
const importing = ref(false);

// 文件输入引用
const fileInput = ref(null);

// 导入结果
const importResult = ref(null);
const showImportDialog = ref(false);
const showImportResultDialog = ref(false);
const importMessage = ref('');
const importResultMessage = ref('');

/**
 * 加载数据大小
 */
const loadDataSize = async () => {
  try {
    const size = await database.getDatabaseSize();
    dataSize.value = size;
  } catch (error) {
    console.error('加载数据大小失败:', error);
    showToast(t('tools.examPrep.backup.loadSizeFailed'));
  }
};

/**
 * 加载最后备份时间
 */
const loadLastBackupTime = async () => {
  try {
    const lastBackup = await database.getSetting('lastBackupTime', null);
    if (lastBackup) {
      lastBackupTime.value = new Date(lastBackup);
    }
  } catch (error) {
    console.error('加载最后备份时间失败:', error);
  }
};

/**
 * 格式化数据大小
 */
const formatDataSize = (count) => {
  if (count < 100) {
    return `${count} 条记录`;
  } else if (count < 1000) {
    return `${count} 条记录`;
  } else {
    return `${(count / 1000).toFixed(1)} 千条记录`;
  }
};

/**
 * 处理导出数据
 */
const handleExportData = async () => {
  exporting.value = true;

  try {
    await database.downloadBackup();

    // 记录备份时间
    const now = new Date();
    await database.saveSetting('lastBackupTime', now.toISOString());
    lastBackupTime.value = now;

    showToast(t('tools.examPrep.backup.exportSuccess'));
  } catch (error) {
    console.error('导出数据失败:', error);
    showToast(t('tools.examPrep.backup.exportFailed'));
  } finally {
    exporting.value = false;
  }
};

/**
 * 处理导入数据
 */
const handleImportData = () => {
  fileInput.value.click();
};

/**
 * 处理文件选择
 */
const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  // 清空文件输入，以便下次选择
  event.target.value = '';

  importing.value = true;
  showImportDialog.value = true;
  importMessage.value = t('tools.examPrep.backup.importingProgress');

  try {
    const result = await database.restoreFromFile(file);
    importResult.value = result;

    // 生成导入结果消息
    const details = [];
    if (result.questions) {
      details.push(`${t('tools.examPrep.backup.questionsImported')}: ${result.questions.added} ${t('tools.examPrep.backup.added')}, ${result.questions.skipped} ${t('tools.examPrep.backup.skipped')}`);
    }
    if (result.records) {
      details.push(`${t('tools.examPrep.backup.recordsImported')}: ${result.records.added} ${t('tools.examPrep.backup.added')}, ${result.records.skipped} ${t('tools.examPrep.backup.skipped')}`);
    }
    if (result.collections) {
      details.push(`${t('tools.examPrep.backup.collectionsImported')}: ${result.collections.added} ${t('tools.examPrep.backup.added')}, ${result.collections.skipped} ${t('tools.examPrep.backup.skipped')}`);
    }

    importResultMessage.value = details.join('\n');

    // 刷新数据大小
    await loadDataSize();

    showImportDialog.value = false;
    showImportResultDialog.value = true;
  } catch (error) {
    console.error('导入数据失败:', error);
    showImportDialog.value = false;
    showToast(t('tools.examPrep.backup.importFailed') + ': ' + error.message);
  } finally {
    importing.value = false;
  }
};

/**
 * 处理查看导入详情
 */
const handleViewImportDetails = () => {
  // 这里可以导航到详细的导入结果页面
  showImportResultDialog.value = false;
};

/**
 * 处理设置提醒
 */
const handleSetReminder = () => {
  showToast(t('tools.examPrep.backup.reminderSet'));
  // TODO: 实现定期备份提醒功能（可以使用浏览器的 Notification API 或 localStorage）
};

/**
 * 处理返回
 */
const handleBack = () => {
  router.back();
};

// 初始化
onMounted(() => {
  loadDataSize();
  loadLastBackupTime();
});
</script>

<style lang="less" scoped>
.backup-page {
  .backup-content {
    padding: var(--spacing-md);

    .backup-card {
      margin-bottom: var(--spacing-md);

      .data-overview {
        padding: var(--spacing-md);

        .overview-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-xs);

          .overview-value {
            font-size: 24px;
            font-weight: 600;
            color: var(--color-primary);
          }

          .overview-label {
            font-size: 12px;
            color: var(--color-text-secondary);
          }
        }

        .data-size-info,
        .last-backup-info {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-sm);
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-md);
          margin-top: var(--spacing-md);
          font-size: 14px;
          color: var(--color-text-secondary);

          .info-icon {
            font-size: 18px;
            color: var(--color-primary);
          }
        }

        :deep(.van-grid-item__content) {
          padding: var(--spacing-sm);
        }
      }

      .backup-actions {
        padding: var(--spacing-md);

        .backup-action-item {
          margin-bottom: var(--spacing-md);

          .action-description {
            font-size: 12px;
            color: var(--color-text-tertiary);
            margin-top: var(--spacing-sm);
            text-align: center;
          }
        }

        :deep(.van-button) {
          border-radius: var(--radius-lg);
        }
      }

      .backup-guide {
        padding: var(--spacing-md);

        .guide-section {
          margin-bottom: var(--spacing-lg);

          .guide-title {
            font-size: 16px;
            font-weight: 600;
            color: var(--color-text-primary);
            margin-bottom: var(--spacing-sm);
          }

          .guide-content {
            font-size: 14px;
            color: var(--color-text-secondary);
            line-height: 1.6;
          }

          .guide-steps {
            .guide-step {
              display: flex;
              align-items: center;
              gap: var(--spacing-sm);
              margin-bottom: var(--spacing-sm);
              font-size: 14px;
              color: var(--color-text-secondary);

              .step-icon {
                font-size: 20px;
                color: var(--color-primary);
              }
            }
          }
        }

        .warning-section {
          display: flex;
          align-items: flex-start;
          gap: var(--spacing-sm);
          padding: var(--spacing-md);
          background: rgba(244, 67, 54, 0.1);
          border-radius: var(--radius-md);

          .warning-icon {
            font-size: 24px;
            color: #F44336;
            flex-shrink: 0;
          }

          .guide-warning {
            font-size: 14px;
            color: #F44336;
            line-height: 1.6;
            margin: 0;
          }
        }
      }

      .reminder-content {
        padding: var(--spacing-lg);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-md);

        .reminder-icon-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;

          .reminder-icon {
            font-size: 40px;
            color: #fff;
          }
        }

        .reminder-text {
          font-size: 16px;
          color: var(--color-text-primary);
          text-align: center;
          line-height: 1.6;
          margin: 0;
        }

        .reminder-actions {
          :deep(.van-button) {
            border-radius: var(--radius-lg);
          }
        }
      }
    }

    .highlight-card {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      border: 2px solid #667eea;

      :deep(.tool-card-header) {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
    }
  }

  :deep(.van-dialog) {
    .van-dialog__message {
      white-space: pre-line;
    }
  }
}
</style>