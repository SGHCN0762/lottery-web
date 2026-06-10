<template>
  <div class="qr-preview-section">
    <div class="preview-card">
      <div v-if="qrUrl" class="qr-preview">
        <img :src="qrUrl" />
      </div>
      <div v-else class="preview-placeholder">
        <van-icon name="qr" size="64" color="var(--color-text-placeholder)" />
        <p>{{ t('tools.qrCode.generate.previewPlaceholder') }}</p>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div v-if="qrUrl" class="preview-actions">
      <van-button type="primary" size="small" icon="down" @click="handleDownload">
        {{ t('tools.qrCode.generate.download') }}
      </van-button>
      <van-button size="small" icon="link" @click="handleCopyLink">
        {{ t('tools.qrCode.generate.copyLink') }}
      </van-button>
      <van-button size="small" icon="photo-o" @click="handleCopyQrCode">
        {{ t('tools.qrCode.generate.copy') }}
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Button as VanButton, Icon as VanIcon } from 'vant';

const props = defineProps({
  qrUrl: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['download', 'copyLink', 'copyQrCode']);

const { t } = useI18n();

const handleDownload = () => {
  emit('download');
};

const handleCopyLink = () => {
  emit('copyLink');
};

const handleCopyQrCode = () => {
  emit('copyQrCode');
};
</script>

<style lang="less" scoped>
.qr-preview-section {
  margin-bottom: var(--spacing-lg);
}

.preview-card {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  padding: var(--spacing-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.qr-preview {
  img {
    display: block;
    max-width: 100%;
  }
}

.preview-placeholder {
  text-align: center;
  color: var(--color-text-placeholder);

  p {
    margin-top: var(--spacing-md);
    font-size: var(--font-size-sm);
  }
}

.preview-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}
</style>
