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
        <div class="upload-area" :class="{ 'has-files': fileList.length > 0 }">
          <div class="upload-icon">
            <van-icon name="photo-o" size="72" />
          </div>
          <p class="upload-title">{{ t('tools.imageCompressor.uploadTip') }}</p>
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

defineProps({
  fileList: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:fileList', 'after-read', 'delete']);

const handleAfterRead = (file) => {
  emit('after-read', file);
  
  const files = Array.isArray(file) ? file : [file];
  const newFiles = files.map(f => ({
    name: f.file.name,
    url: URL.createObjectURL(f.file),
  }));
  
  emit('update:fileList', [...fileList, ...newFiles]);
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

    &:hover {
      border-color: var(--color-primary);
      background: linear-gradient(135deg, var(--color-bg-tertiary) 0%, var(--color-bg-secondary) 100%);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(var(--color-primary-rgb), 0.12);

      .upload-icon {
        background: var(--color-primary);
        color: white;
        transform: scale(1.1);
      }
    }

    &.has-files {
      min-height: 100px;
      padding: var(--spacing-lg);

      .upload-icon {
        width: 40px;
        height: 40px;
        font-size: 20px;
      }

      .upload-title {
        font-size: var(--font-size-sm);
      }
    }

    .upload-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-bg-primary);
      border-radius: 50%;
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
