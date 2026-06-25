<template>
  <div class="image-list">
    <ListHeader
      :title="t('tools.fileConverter.pdfToImage.pages')"
      :count="pages.length"
    >
      <template #actions>
        <van-button size="small" type="danger" plain @click="$emit('clear-all')">
          {{ t('tools.fileConverter.common.clearAll') }}
        </van-button>
      </template>
    </ListHeader>

    <div class="list-content">
      <div class="grid">
        <div v-for="(page, index) in pages" :key="index" class="image-card">
          <div class="card-preview" @click="$emit('preview', page)">
            <img :src="page.url" :alt="`${t('tools.fileConverter.pdfToImage.pagePrefix')} ${index + 1}`" />
            <div class="page-badge">{{ t('tools.fileConverter.pdfToImage.pagePrefix') }} {{ index + 1 }}{{ t('tools.fileConverter.pdfToImage.pageSuffix') }}</div>
          </div>

          <div class="card-content">
            <div class="page-info">
              <div class="info-row">
                <span class="info-label">{{ t('tools.fileConverter.pdfToImage.resolution') }}</span>
                <span class="info-value">{{ page.width }} × {{ page.height }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">{{ t('tools.fileConverter.pdfToImage.format') }}</span>
                <span class="info-value">{{ outputFormat.toUpperCase() }}</span>
              </div>
            </div>

            <div class="card-actions">
              <van-button size="small" type="primary" @click.stop="$emit('download', page, index)">
                {{ t('tools.fileConverter.common.download') }}
              </van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import {
  Button as VanButton,
} from 'vant';
import ListHeader from './ListHeader.vue';

const { t } = useI18n();

defineProps({
  pages: {
    type: Array,
    default: () => [],
  },
  outputFormat: {
    type: String,
    default: 'png',
  },
});

defineEmits(['clear-all', 'preview', 'download']);
</script>

<style lang="less" scoped>
.image-list {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);

  .list-content {
    padding: var(--spacing-md);
    max-height: 500px;
    overflow-y: auto;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: var(--color-bg-tertiary);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--color-border);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: var(--color-text-tertiary);
    }
  }

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
      height: 140px;
      background: var(--color-bg-primary);
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      &:hover img {
        transform: scale(1.05);
      }

      .page-badge {
        position: absolute;
        top: var(--spacing-xs);
        left: var(--spacing-xs);
        padding: 2px 8px;
        background: var(--color-primary);
        color: white;
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-semibold);
        border-radius: var(--radius-sm);
      }
    }

    .card-content {
      padding: var(--spacing-md);

      .page-info {
        margin-bottom: var(--spacing-md);

        .info-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: var(--font-size-xs);
          margin-bottom: var(--spacing-xs);

          &:last-child {
            margin-bottom: 0;
          }
        }

        .info-label {
          color: var(--color-text-tertiary);
        }

        .info-value {
          color: var(--color-text-secondary);
          font-weight: var(--font-weight-medium);
        }
      }

      .card-actions {
        display: flex;
        gap: var(--spacing-xs);

        :deep(.van-button) {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          font-size: var(--font-size-xs);
          height: 32px;
        }
      }
    }
  }
}
</style>