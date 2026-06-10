<template>
  <div class="image-compressor">
    <ImageUploader
      :file-list="fileList"
      @after-read="handleAfterRead"
      @delete="handleDelete"
    />

    <ImageSettings
      v-model:quality="quality"
      v-model:max-width="maxWidth"
      v-model:format="format"
      v-model:keep-exif="keepExif"
      :format-options="formatOptions"
    />

    <ImageList
      :images="images"
      :format-size="formatSize"
      @compress-all="compressAll"
      @clear-all="clearAll"
      @download="downloadImage"
      @preview="previewImage"
      @compress="compressOne"
      @remove="removeImage"
    />

    <div v-if="hasCompressedImages" class="batch-download">
      <van-button type="primary" size="large"  @click="downloadAll">
        <van-icon name="down" />
        {{ t('tools.imageCompressor.downloadAll') }}
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Button as VanButton, Icon as VanIcon } from 'vant';
import ImageUploader from './components/ImageUploader.vue';
import ImageSettings from './components/ImageSettings.vue';
import ImageList from './components/ImageList.vue';
import { useImageCompressor } from './hooks/useImageCompressor';

const { t } = useI18n();

const {
  fileList,
  images,
  quality,
  maxWidth,
  format,
  keepExif,
  formatOptions,
  hasCompressedImages,
  handleAfterRead,
  handleDelete,
  removeImage,
  clearAll,
  compressOne,
  compressAll,
  downloadImage,
  previewImage,
  downloadAll,
  formatSize,
} = useImageCompressor();
</script>

<style lang="less" scoped>
.image-compressor {
  padding: var(--spacing-md);
}

.batch-download {
  margin-top: var(--spacing-xl);

  :deep(.van-button) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    height: 48px;
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    box-shadow: 0 4px 16px rgba(var(--color-primary-rgb), 0.3);

    .van-icon {
      font-size: 18px;
    }
  }
}
</style>
