<template>
  <div class="image-list">
    <ListHeader
      v-if="images.length > 0"
      :title="t('tools.fileConverter.common.imageList')"
      :count="images.length"
    >
      <template #actions>
        <van-button size="small" type="primary" @click="$emit('convert-all')">
          {{ t('tools.fileConverter.imageFormat.convertAll') }}
        </van-button>
        <van-button size="small" type="danger" plain @click="$emit('clear-all')">
          {{ t('tools.fileConverter.common.clearAll') }}
        </van-button>
      </template>
    </ListHeader>

    <div class="list-content">
      <div v-if="images.length > 0" class="grid">
        <div v-for="(img, index) in images" :key="img.id" class="image-card">
          <div class="card-preview" @click="$emit('preview', img)">
            <img :src="img.convertedUrl || img.url" :alt="img.name" />

            <div v-if="img.converting" class="processing-overlay">
              <van-loading type="spinner" color="#fff" size="32px" />
              <span>{{ t('tools.fileConverter.common.processing') }}</span>
            </div>

            <div v-if="img.convertedUrl" class="status-badge converted">
              {{ t('tools.fileConverter.imageFormat.converted') }}
            </div>
            <div v-else-if="!img.converting" class="status-badge pending">
              {{ t('tools.fileConverter.imageFormat.pending') }}
            </div>
          </div>

          <div class="card-content">
            <div class="file-name">{{ truncateName(img.originalName || img.name) }}</div>
            <div class="format-badge">
              <span class="from-format">{{ getOriginalFormat(img.originalName || img.name) }}</span>
              <van-icon name="arrow" size="12" />
              <span class="to-format">{{ outputFormat.toUpperCase() }}</span>
            </div>
            <div class="card-actions">
              <van-button v-if="img.convertedUrl" size="small" type="primary" @click="$emit('download', img)">
                {{ t('tools.fileConverter.common.download') }}
              </van-button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <van-icon name="image-o" size="72" />
        <p>{{ t('tools.fileConverter.common.empty') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import {
  Button as VanButton,
  Loading as VanLoading,
} from 'vant';
import { truncateName, getOriginalFormat } from '../utils';
import ListHeader from './ListHeader.vue';

const { t } = useI18n();

defineProps({
  images: {
    type: Array,
    default: () => [],
  },
  outputFormat: {
    type: String,
    default: 'jpeg',
  },
});

defineEmits(['convert-all', 'clear-all', 'preview', 'download']);


</script>

<style lang="less" scoped>
.image-list {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);

  .list-content {
    max-height: 500px;
    overflow-y: auto;
    padding: var(--spacing-md);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
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

      .processing-overlay {
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

      .status-badge {
        position: absolute;
        top: var(--spacing-xs);
        right: var(--spacing-xs);
        padding: 2px 6px;
        font-size: var(--font-size-xs);
        border-radius: var(--radius-sm);

        &.converted {
          background: var(--color-success);
          color: white;
        }

        &.pending {
          background: var(--color-warning);
          color: white;
        }
      }
    }

    .card-content {
      padding: var(--spacing-md) var(--spacing-md) 0;

      .file-name {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-sm);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .format-badge {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 6px 12px;
        background: var(--color-bg-tertiary);
        border-radius: var(--radius-md);
        font-size: var(--font-size-xs);
        font-weight: var(--font-weight-medium);

        .from-format {
          color: var(--color-text-secondary);
        }

        .to-format {
          color: var(--color-primary);
          font-weight: var(--font-weight-semibold);
        }

        .van-icon {
          color: var(--color-text-tertiary);
        }
      }
      
      .card-actions {
        display: flex;
        gap: var(--spacing-xs);
        margin: var(--spacing-md) 0;

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