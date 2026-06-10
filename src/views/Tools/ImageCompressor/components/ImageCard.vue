<template>
  <div class="image-card" :class="{ 'is-compressed': image.compressedUrl }">
    <div class="card-preview">
      <img :src="image.url" class="preview-img" />
      <div v-if="image.compressing" class="compressing-overlay">
        <van-loading type="spinner" color="#fff" size="32px" />
        <span>{{ t('tools.imageCompressor.compressing') }}</span>
      </div>
      <div class="remove-btn" @click="$emit('remove')">
        <van-icon name="cross" />
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
          <span :class="['ratio-badge', image.ratio > 0 ? 'success' : 'danger']"
            >{{ image.ratio }}%</span
          >
        </div>
      </div>

      <div class="card-actions">
        <template v-if="image.compressedUrl">
          <van-button size="small" type="primary" plain @click="$emit('download', image)">
            <van-icon name="down" />
            {{ t('tools.imageCompressor.download') }}
          </van-button>
          <van-button size="small" plain @click="$emit('preview', image)">
            <van-icon name="eye-o" />
            {{ t('tools.imageCompressor.preview') }}
          </van-button>
        </template>
        <van-button
          v-else
          size="small"
          type="primary"
          :loading="image.compressing"
          @click="$emit('compress')"
        >
          <van-icon name="compress" />
          {{ t('tools.imageCompressor.compress') }}
        </van-button>
      </div>
    </div>
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
    background: var(--color-bg-secondary);
    border-radius: var(--radius-xl);
    overflow: hidden;
    transition: all 0.3s ease;
    border: 1px solid var(--color-border);

    &:hover {
      border-color: var(--color-primary-light);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    &.is-compressed {
      border-color: var(--color-success-light);
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
        object-fit: contain;
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

      .remove-btn {
        position: absolute;
        top: var(--spacing-sm);
        right: var(--spacing-sm);
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        transition: all 0.2s ease;
        font-size: 12px;

        &:hover {
          background: var(--color-danger);
          transform: scale(1.1);
        }
      }

      &:hover .remove-btn {
        opacity: 1;
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

          .ratio-badge {
            margin-left: auto;
            padding: 2px 8px;
            color: white;
            border-radius: var(--radius-sm);
            font-size: var(--font-size-xs);
            font-weight: var(--font-weight-semibold);

            &.success {
              background: var(--color-success);
            }

            &.danger {
              background: var(--color-danger);
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
