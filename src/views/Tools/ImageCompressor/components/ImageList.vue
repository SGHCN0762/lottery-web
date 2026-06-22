<template>
  <div v-if="images.length > 0" class="image-list">
    <div class="list-header">
      <div class="header-left">
        <van-icon name="photo-o" class="header-icon" />
        <span class="header-title">{{ t('tools.imageCompressor.imageList') }}</span>
        <span class="header-count">{{ images.length }} {{ t('common.items') }}</span>
      </div>
      <div class="header-actions">
        <van-button size="small" type="primary" @click="$emit('compress-all')">
          {{ t('tools.imageCompressor.compressAll') }}
        </van-button>
        <van-button size="small" type="danger" plain @click="$emit('clear-all')">
          {{ t('tools.imageCompressor.clearAll') }}
        </van-button>
      </div>
    </div>

    <div class="image-grid">
      <ImageCard
        v-for="(img, index) in images"
        :key="img.id"
        :image="img"
        :format-size="formatSize"
        @download="$emit('download', $event)"
        @preview="$emit('preview', $event)"
        @compress="$emit('compress', index)"
        @remove="$emit('remove', index)"
      />
    </div>
  </div>
  <div v-else class="image-list"> 
    <div class="empty-state">
      <van-icon name="image-o" size="72" />
      <p>{{ t('tools.imageCompressor.empty') }}</p>
    </div>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n';
  import { Button as VanButton, Icon as VanIcon } from 'vant';
  import ImageCard from './ImageCard.vue';

  const { t } = useI18n();

  defineProps({
    images: {
      type: Array,
      default: () => [],
    },
    formatSize: {
      type: Function,
      required: true,
    },
  });

  defineEmits(['compress-all', 'clear-all', 'download', 'preview', 'compress', 'remove']);
</script>

<style lang="less" scoped>
  .image-list {
    padding: var(--spacing-md) var(--spacing-lg);
    background: var(--color-bg-secondary);
    border-radius: var(--radius-xl);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);

    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-lg);
      padding-bottom: var(--spacing-md);
      border-bottom: 1px solid var(--color-border);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);

      .header-left {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);

        .header-icon {
          font-size: 18px;
          color: var(--color-primary);
        }

        .header-title {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-primary);
        }

        .header-count {
          padding: 2px 8px;
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-sm);
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
        }
      }

      .header-actions {
        display: flex;
        gap: var(--spacing-sm);

        :deep(.van-button) {
          display: flex;
          align-items: center;
          gap: 4px;

          .van-icon {
            font-size: 14px;
          }
        }
      }
    }

    .image-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-md);
    }
    
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: calc(var(--spacing-xl) * 2);
      color: var(--color-text-tertiary);

      .van-icon {
        margin-bottom: var(--spacing-md);
      }

      p {
        margin: 0;
      }
    }
  }
</style>
