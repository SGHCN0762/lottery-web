<template>
  <div class="qr-code-generator">
    <!-- 功能选项卡 -->
    <van-tabs v-model:active="activeTab" sticky>
      <van-tab :title="t('tools.qrCode.tabs.generate')">
        <QrGenerator @generated="handleGenerated" />
      </van-tab>
      <van-tab :title="t('tools.qrCode.tabs.scan')">
        <QrScanner />
      </van-tab>
    </van-tabs>

    <!-- 历史记录 -->
    <div v-if="history.length > 0" class="history-section">
      <div class="section-header">
        <span>{{ t('tools.qrCode.history') }}</span>
        <van-button size="small" type="danger" plain @click="clearHistory">
          {{ t('tools.qrCode.clearHistory') }}
        </van-button>
      </div>
      <div class="history-list">
        <div
          v-for="(item, index) in history"
          :key="index"
          class="history-item"
          @click="handleHistoryClick(item)"
        >
          <img :src="item.qrUrl" class="history-qr" />
          <div class="history-info">
            <span class="history-text">{{ item.text }}</span>
            <span class="history-time">{{ formatTime(item.time) }}</span>
          </div>
          <van-icon name="arrow" class="history-arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { Tab as VanTab, Tabs as VanTabs, Button as VanButton, Icon as VanIcon, showSuccessToast } from 'vant';
import QrGenerator from './components/QrGenerator.vue';
import QrScanner from './components/QrScanner.vue';

const { t } = useI18n();

// 状态
const activeTab = ref(0);
const history = ref([]);

// 从本地存储加载历史记录
onMounted(() => {
  const saved = localStorage.getItem('qr_history');
  if (saved) {
    try {
      history.value = JSON.parse(saved);
    } catch (e) {
      history.value = [];
    }
  }
});

// 处理生成事件
const handleGenerated = (data) => {
  // 添加到历史记录
  history.value.unshift({
    text: data.text,
    qrUrl: data.url,
    time: Date.now(),
  });

  // 最多保存20条
  if (history.value.length > 20) {
    history.value.pop();
  }

  // 保存到本地存储
  localStorage.setItem('qr_history', JSON.stringify(history.value));
};

// 点击历史记录
const handleHistoryClick = (item) => {
  // 复制内容
  navigator.clipboard.writeText(item.text).then(() => {
    showSuccessToast(t('tools.qrCode.copied'));
  });
};

// 清空历史记录
const clearHistory = () => {
  history.value = [];
  localStorage.removeItem('qr_history');
};

// 格式化时间
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;

  if (diff < 60000) return t('tools.qrCode.justNow');
  if (diff < 3600000) return Math.floor(diff / 60000) + t('tools.qrCode.minutesAgo');
  if (diff < 86400000) return Math.floor(diff / 3600000) + t('tools.qrCode.hoursAgo');

  return date.toLocaleDateString();
};
</script>

<style lang="less" scoped>
.qr-code-generator {
  min-height: 100%;
  background: var(--color-bg-primary);
}

:deep(.van-tabs__wrap) {
  background: var(--color-bg-secondary);
}

:deep(.van-tab) {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

:deep(.van-tab--active) {
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
}

:deep(.van-tabs__line) {
  background: var(--color-primary);
}

.history-section {
  padding: var(--spacing-md);
  margin-top: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-semibold);
  }

  .history-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .history-item {
    display: flex;
    align-items: center;
    padding: var(--spacing-sm);
    background: var(--color-bg-primary);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-base);

    &:hover {
      background: var(--color-bg-tertiary);
    }

    .history-qr {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-sm);
      margin-right: var(--spacing-sm);
    }

    .history-info {
      flex: 1;
      min-width: 0;

      .history-text {
        display: block;
        font-size: var(--font-size-sm);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .history-time {
        display: block;
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
        margin-top: 2px;
      }
    }

    .history-arrow {
      color: var(--color-text-secondary);
    }
  }
}
</style>
