<template>
  <div class="scanner-result">
    <div class="result-icon">
      <van-icon name="checked" size="64" color="var(--color-success)" />
    </div>
    <h3 class="result-title">{{ t('tools.qrCode.scan.result') }}</h3>

    <div class="result-content">
      <p class="result-text">{{ result }}</p>
    </div>

    <div class="result-actions">
      <van-button
        type="primary"
        size="large"
        icon="copy"
        @click="handleCopy"
      >
        {{ t('tools.qrCode.scan.copy') }}
      </van-button>
      <van-button
        v-if="isUrl"
        type="success"
        size="large"
        icon="external-link"
        @click="handleOpenUrl"
      >
        {{ t('tools.qrCode.scan.open') }}
      </van-button>
      <van-button
        size="large"
        icon="refresh"
        @click="handleScanAgain"
      >
        {{ t('tools.qrCode.scan.again') }}
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Button as VanButton, Icon as VanIcon } from 'vant';

const props = defineProps({
  result: {
    type: String,
    default: '',
  },
  isUrl: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['copy', 'openUrl', 'scanAgain']);

const { t } = useI18n();

const handleCopy = () => {
  emit('copy');
};

const handleOpenUrl = () => {
  emit('openUrl');
};

const handleScanAgain = () => {
  emit('scanAgain');
};
</script>

<style lang="less" scoped>
.scanner-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-2xl);
  min-height: 400px;

  .result-icon {
    width: 100px;
    height: 100px;
    background: rgba(var(--color-success), 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .result-title {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-lg);
  }

  .result-content {
    width: 100%;
    background: var(--color-bg-primary);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
    border: 1px solid var(--color-border);

    .result-text {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-normal);
      color: var(--color-text-primary);
      word-break: break-all;
      margin: 0;
      line-height: 1.5;
      white-space: pre-wrap;
    }
  }

  .result-actions {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    width: 100%;
    max-width: 280px;
  }
}
</style>
