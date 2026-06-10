<template>
  <div class="image-list">
    <div class="list-header">
      <span>{{ t('tools.imageCompressor.imageList') }} ({{ images.length }})</span>
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
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Button as VanButton } from 'vant';
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
  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);

    .header-actions {
      display: flex;
      gap: var(--spacing-sm);
    }
  }

  .image-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
}
</style>