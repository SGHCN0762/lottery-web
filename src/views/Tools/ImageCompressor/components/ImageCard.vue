<template>
  <div class="image-card">
    <div class="card-preview" @click="$emit('preview', image)">
      <img :src="image.compressedUrl || image.url" class="preview-img" />
      <div v-if="image.compressing" class="compressing-overlay">
        <van-loading type="spinner" color="#fff" size="32px" />
        <span>{{ t('tools.imageCompressor.compressing') }}</span>
      </div>
      <div v-if="image.compressedUrl" class="compressed-badge">
        {{ t('tools.imageCompressor.compressed') }}
      </div>
    </div>

    <div class="card-content">
      <div class="size-info">
        <div class="info-row">
          <span class="label">{{ t('tools.imageCompressor.original') }}</span>
          <span class="value">{{ formatSize(image.originalSize) }}</span>
        </div>
        <div v-if="image.compressedSize" class="info-row compressed">
          <span class="label">{{ t('tools.imageCompressor.compressed') }}</span>
          <span :class="['value', image.ratio > 0 ? 'success' : 'danger']">
            {{ formatSize(image.compressedSize) }}
          </span>
        </div>
      </div>

      <div class="card-actions">
        <template v-if="image.compressedUrl">
          <van-button size="small" type="primary" @click="$emit('download', image)">
          {{ t('tools.imageCompressor.download') }}
        </van-button>
          <van-button size="small" type="danger" plain @click="$emit('remove')">
            {{ t('tools.imageCompressor.remove') }}
          </van-button>
        </template>
        <van-button
          v-else
          size="small"
          type="primary"
          :loading="image.compressing"
          @click="$emit('compress')"
        >
          {{ t('tools.imageCompressor.compress') }}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n';
  import { Button as VanButton, Loading as VanLoading } from 'vant';

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
    background: var(--color-bg-secondary);
    border-radius: var(--radius-xl);
    overflow: hidden;
    transition: all 0.3s ease;
    border: 1px solid var(--color-border);
    cursor: pointer;

    &:hover {
      border-color: var(--color-primary-light);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    .card-preview {
      position: relative;
      width: 100%;
      height: 160px;
      background: var(--color-bg-primary);
      overflow: hidden;

      .preview-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      &:hover .preview-img {
        transform: scale(1.05);
      }

      .compressing-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-sm);
        background: rgba(0, 0, 0, 0.6);
        color: white;
        font-size: var(--font-size-sm);
      }

      .compressed-badge {
        position: absolute;
        top: var(--spacing-xs);
        right: var(--spacing-xs);
        padding: 2px 6px;
        background: var(--color-success);
        color: white;
        font-size: var(--font-size-xs);
        border-radius: var(--radius-sm);
      }
    }

    .card-content {
      padding: var(--spacing-md);

      .size-info {
        margin-bottom: var(--spacing-md);

        .info-row {
          display: flex;
          align-items: center;
          font-size: var(--font-size-sm);
          margin-bottom: var(--spacing-xs);

          .label {
            color: var(--color-text-tertiary);
            margin-right: 8px;
          }

          .value {
            color: var(--color-text-primary);
            font-weight: var(--font-weight-medium);

            &.success {
              color: var(--color-success);
            }

            &.danger {
              color: var(--color-danger);
            }
          }

          &.compressed {
            margin-top: var(--spacing-xs);
            padding-top: var(--spacing-xs);
            border-top: 1px dashed var(--color-border);
          }
        }
      }

      .card-actions {
        display: flex;
        gap: var(--spacing-sm);

        :deep(.van-button) {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;

          .van-icon {
            font-size: 14px;
          }
        }
      }
    }
  }
</style>
