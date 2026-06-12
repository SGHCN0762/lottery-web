<template>
  <div class="image-list">
    <div v-if="images.length > 0" class="list-header">
      <div class="header-left">
        <van-icon name="photo-o" class="header-icon" />
        <span class="header-title">{{ t('tools.imageWatermark.imageList') }}</span>
        <span class="header-count">{{ images.length }} {{ t('tools.imageWatermark.images') }}</span>
      </div>
      <div class="header-actions">
        <van-button size="small" type="primary" @click="$emit('watermark-all')">
          {{ t('tools.imageWatermark.watermarkAll') }}
        </van-button>
        <van-button size="small" type="danger" plain @click="confirmClearAll">
          {{ t('tools.imageWatermark.clearAll') }}
        </van-button>
      </div>
    </div>

    <div v-if="images.length > 0" class="grid">
      <div v-for="(img, index) in images" :key="img.id" class="image-card">
        <div class="card-preview" @click="handlePreview(img)">
          <img :src="img.watermarkedUrl || img.url" :alt="img.name" />

          <div v-if="img.watermarking" class="watermarking-overlay">
            <van-loading type="spinner" color="#fff" size="32px" />
            <span>{{ t('tools.imageWatermark.processing') }}</span>
          </div>
        </div>

        <div class="card-content" @click.stop="showActionSheet(img, index)">
          <span class="image-name">{{ truncateName(img.name) }}</span>
          <van-icon name="ellipsis" size="20" />
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <van-icon name="image-o" size="72" />
      <p>{{ t('tools.imageWatermark.empty') }}</p>
    </div>

    <van-action-sheet
      v-model:show="showSheet"
      :actions="actions"
      :cancel-text="t('common.cancel')"
      @select="handleAction"
    />
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import {
    Button as VanButton,
    Icon as VanIcon,
    Loading as VanLoading,
    ActionSheet as VanActionSheet,
    showConfirmDialog,
  } from 'vant';

  const { t } = useI18n();

  defineProps({
    images: {
      type: Array,
      default: () => [],
    },
  });

  const emit = defineEmits([
    'watermark-all',
    'clear-all',
    'watermark',
    'download',
    'preview',
    'remove',
  ]);

  const showSheet = ref(false);
  const currentImg = ref(null);
  const currentIndex = ref(-1);

  const actions = computed(() => {
    if (!currentImg.value) return [];

    const baseActions = [
      {
        name: t('tools.imageWatermark.remove'),
        color: '#ee0a24',
      },
    ];

    if (currentImg.value.watermarkedUrl) {
      return [
        {
          name: t('tools.imageWatermark.download'),
        },
        {
          name: t('tools.imageWatermark.redo'),
        },
        ...baseActions,
      ];
    }

    return [
      {
        name: t('tools.imageWatermark.watermark'),
      },
      ...baseActions,
    ];
  });

  const showActionSheet = (img, index) => {
    currentImg.value = img;
    currentIndex.value = index;
    showSheet.value = true;
  };

  const handlePreview = img => {
    emit('preview', img);
  };

  const handleAction = action => {
    if (!currentImg.value || currentIndex.value < 0) return;

    switch (action.name) {
      case t('tools.imageWatermark.watermark'):
        emit('watermark', currentIndex.value);
        break;
      case t('tools.imageWatermark.download'):
        emit('download', currentImg.value);
        break;
      case t('tools.imageWatermark.redo'):
        emit('watermark', currentIndex.value);
        break;
      case t('tools.imageWatermark.remove'):
        confirmRemove();
        return;
    }

    showSheet.value = false;
  };

  const confirmRemove = async () => {
    try {
      await showConfirmDialog({
        title: t('common.confirm'),
        message: t('tools.imageWatermark.confirmRemove'),
      });
      emit('remove', currentIndex.value);
      showSheet.value = false;
    } catch {
      // 用户取消
    }
  };

  const confirmClearAll = async () => {
    try {
      await showConfirmDialog({
        title: t('common.confirm'),
        message: t('tools.imageWatermark.confirmClearAll'),
      });
      emit('clear-all');
    } catch {
      // 用户取消
    }
  };

  const truncateName = name => {
    if (name.length > 18) {
      return name.slice(0, 18) + '...';
    }
    return name;
  };
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
    }

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
        font-weight: var(--font-weight-medium);
        color: var(--color-text-primary);
      }

      .header-count {
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
        background: var(--color-bg-tertiary);
        padding: 2px 8px;
        border-radius: var(--radius-sm);
      }
    }

    .header-actions {
      display: flex;
      gap: var(--spacing-sm);

      :deep(.van-button) {
        display: flex;
        align-items: center;
        gap: 4px;
      }
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
        aspect-ratio: 1;
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

        .watermarking-overlay {
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
      }

      .card-content {
        padding: var(--spacing-md);
        display: flex;
        justify-content: space-between;
        align-items: center;

        .image-name {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 65%;
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
