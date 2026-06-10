<template>
  <div class="scanner-initial">
    <div class="icon-wrapper">
      <van-icon name="scan" size="72" />
    </div>
    <h3 class="title">{{ t('tools.qrCode.scan.placeholder') }}</h3>

    <div class="action-buttons">
      <van-button
        type="primary"
        size="large"
        icon="scan"
        @click="handleStartScan"
        :disabled="!cameraSupported"
      >
        {{ t('tools.qrCode.scan.start') }}
      </van-button>

      <van-button
        size="large"
        icon="photo-o"
        @click="handleUpload"
      >
        {{ t('tools.qrCode.scan.uploadTip') }}
      </van-button>
    </div>

    <div v-if="!cameraSupported" class="tip">
      <van-icon name="warning-o" color="var(--color-warning)" />
      <span>{{ t('tools.qrCode.scan.notSupported') }}</span>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Button as VanButton, Icon as VanIcon } from 'vant';

const props = defineProps({
  cameraSupported: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['startScan', 'upload']);

const { t } = useI18n();

const handleStartScan = () => {
  emit('startScan');
};

const handleUpload = () => {
  emit('upload');
};
</script>

<style lang="less" scoped>
.scanner-initial {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  min-height: 400px;

  .icon-wrapper {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacing-xl);
    color: white;
    box-shadow: 0 8px 24px rgba(var(--color-primary), 0.3);
  }

  .title {
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-xl);
    text-align: center;
  }

  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    width: 100%;
    max-width: 280px;
  }

  .tip {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    margin-top: var(--spacing-lg);
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
  }
}
</style>
