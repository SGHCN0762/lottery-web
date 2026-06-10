<template>
  <div class="upload-section">
    <van-uploader
      :model-value="fileList"
      multiple
      accept="image/*"
      :max-count="20"
      :after-read="handleAfterRead"
      @delete="handleDelete"
    >
      <template #default>
        <div class="upload-area">
          <van-icon name="photo-o" size="48" />
          <p>{{ t('tools.imageCompressor.uploadTip') }}</p>
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
};

const handleDelete = (file, detail) => {
  emit('delete', file, detail);
};
</script>

<style lang="less" scoped>
.upload-section {
  margin-bottom: var(--spacing-md);

  .upload-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-xl);
    background: var(--color-bg-secondary);
    border-radius: var(--radius-lg);
    border: 2px dashed var(--color-border);
    color: var(--color-text-secondary);
    transition: all var(--transition-base);

    &:hover {
      border-color: var(--color-primary);
      background: var(--color-bg-tertiary);
    }

    p {
      margin-top: var(--spacing-sm);
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
    }
  }
}
</style>