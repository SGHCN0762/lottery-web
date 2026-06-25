<template>
  <div class="upload-section">
    <van-uploader
      :model-value="fileList"
      multiple
      accept="image/*"
      :max-count="20"
      :after-read="handleAfterRead"
      @delete="handleDelete"
      :preview-image="false"
    >
      <template #default>
        <div class="upload-area">
          <div class="upload-icon">
            <van-icon name="photo-o" size="72" />
          </div>
          <p class="upload-title">{{ uploadTip || t('tools.imageCompressor.uploadTip') }}</p>
          <p class="upload-hint">JPG, PNG, WebP, GIF, BMP</p>
        </div>
      </template>
    </van-uploader>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Uploader as VanUploader, Icon as VanIcon } from 'vant';

const { t } = useI18n();

const props = defineProps({
  fileList: {
    type: Array,
    default: () => [],
  },
  uploadTip: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['after-read', 'delete']);

const handleAfterRead = (file) => {
  emit('after-read', file);
};

const handleDelete = (file, detail) => {
  emit('delete', file, detail);
};
</script>

<style lang="less" scoped>
.upload-section {
  margin-bottom: var(--spacing-lg);

  :deep(.van-uploader) {
    width: 100%;
  }

  :deep(.van-uploader__wrapper) {
    width: 100%;
  }

  .upload-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: calc(100vw - 2 * var(--spacing-md));
    min-height: 160px;
    padding: var(--spacing-xl) var(--spacing-lg);
    background: linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-tertiary) 100%);
    border-radius: var(--radius-xl);
    border: 2px dashed var(--color-border);
    color: var(--color-text-secondary);
    transition: all 0.3s ease;
    cursor: pointer;

    .upload-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: var(--spacing-md);
      color: var(--color-primary);
      transition: all 0.3s ease;
    }

    .upload-title {
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-primary);
      margin: 0 0 var(--spacing-xs) 0;
    }

    .upload-hint {
      font-size: var(--font-size-xs);
      color: var(--color-text-tertiary);
      margin: 0;
    }
  }
}
</style>
