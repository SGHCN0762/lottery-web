<template>
  <div class="image-card">
    <img :src="image.url" class="preview" />
    <div class="image-info">
      <div class="info-row">
        <span class="label">{{ t('tools.imageCompressor.original') }}:</span>
        <span class="value">{{ formatSize(image.originalSize) }}</span>
      </div>
      <div v-if="image.compressedSize" class="info-row compressed">
        <span class="label">{{ t('tools.imageCompressor.compressed') }}:</span>
        <span class="value">{{ formatSize(image.compressedSize) }}</span>
        <span class="ratio">-{{ image.ratio }}%</span>
      </div>
      <div v-if="image.compressedUrl" class="actions">
        <van-button size="mini" type="primary" @click="$emit('download', image)">
          {{ t('tools.imageCompressor.download') }}
        </van-button>
        <van-button size="mini" plain @click="$emit('preview', image)">
          {{ t('tools.imageCompressor.preview') }}
        </van-button>
      </div>
      <div v-else class="actions">
        <van-button
          size="mini"
          type="primary"
          :loading="image.compressing"
          @click="$emit('compress')"
        >
          {{ t('tools.imageCompressor.compress') }}
        </van-button>
      </div>
    </div>
    <van-icon name="cross" class="remove-btn" @click="$emit('remove')" />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Button as VanButton, Icon as VanIcon } from 'vant';

const { t } = useI18n();

defineProps({
  image: {
    type: Object,
    required: true,
  },
  formatSize: {
    type: Function,
    required: true,
  },
});

defineEmits(['download', 'preview', 'compress', 'remove']);
</script>

<style lang="less" scoped>
.image-card {
  position: relative;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  padding: var(--spacing-md);
  border: 1px solid var(--color-border);
  transition: all var(--transition-base);

  &:hover {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-card);
  }

  .preview {
    width: 100%;
    height: 150px;
    object-fit: contain;
    background: var(--color-bg-primary);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-sm);
  }

  .image-info {
    .info-row {
      display: flex;
      align-items: center;
      font-size: var(--font-size-sm);
      margin-bottom: var(--spacing-xs);

      .label {
        color: var(--color-text-secondary);
        margin-right: var(--spacing-xs);
      }

      .value {
        color: var(--color-text-primary);
      }

      &.compressed .value {
        color: var(--color-success);
      }

      .ratio {
        margin-left: var(--spacing-sm);
        color: var(--color-success);
        font-weight: var(--font-weight-semibold);
      }
    }

    .actions {
      display: flex;
      gap: var(--spacing-sm);
      margin-top: var(--spacing-sm);
    }
  }

  .remove-btn {
    position: absolute;
    top: var(--spacing-sm);
    right: var(--spacing-sm);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 50%;
    padding: var(--spacing-xs);
    cursor: pointer;
    transition: background var(--transition-fast);

    &:hover {
      background: var(--color-danger);
    }
  }
}
</style>