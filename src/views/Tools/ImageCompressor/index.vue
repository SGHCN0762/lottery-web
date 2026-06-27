<template>
  <div class="image-compressor">
    <FileUploader
      accept="image/*"
      icon-type="image"
      :hint="t('tools.common.supportedFormats')"
      @change="handleAfterRead"
    />

    <ImageSettings
      v-model:quality="quality"
      v-model:max-width="maxWidth"
      v-model:format="format"
      v-model:keep-exif="keepExif"
      :format-options="formatOptions"
    />

    <FileListCard
      v-model="images"
      :title="t('tools.imageCompressor.imageList')"
      icon="photo-o"
      :show-clear-all="true"
      :get-download-url="getDownloadUrl"
    >
      <template #headerRight>
        <van-button size="small" type="primary" @click="compressAll">
          {{ t('tools.imageCompressor.compressAll') }}
        </van-button>
      </template>
      <template #itemMeta="{ file }">
        <span v-if="file.originalSize" class="size-info">
          {{ formatSize(file.originalSize) }}
          <template v-if="file.compressedSize">
            → <span :class="file.ratio > 0 ? 'success' : 'danger'">{{ formatSize(file.compressedSize) }}</span>
          </template>
        </span>
      </template>
      <template #itemSuffix="{ file, index }">
        <template v-if="file.compressedUrl">
          <van-button size="small" type="primary" @click.stop="downloadImage(file)">
            {{ t('tools.imageCompressor.download') }}
          </van-button>
          <van-button size="small" type="danger" plain @click.stop="removeImage(index)">
            {{ t('tools.imageCompressor.remove') }}
          </van-button>
        </template>
        <van-button
          v-else
          size="small"
          type="primary"
          :loading="file.compressing"
          @click.stop="compressOne(index)"
        >
          {{ t('tools.imageCompressor.compress') }}
        </van-button>
      </template>
    </FileListCard>

    <div v-if="hasCompressedImages" class="batch-download">
      <van-button type="primary" size="large" @click="downloadAll">
        {{ t('tools.imageCompressor.downloadAll') }}
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Button as VanButton } from 'vant';
import FileUploader from '../components/FileUploader.vue';
import FileListCard from '../components/FileListCard.vue';
import ImageSettings from './components/ImageSettings.vue';
import { useImageCompressor } from './hooks/useImageCompressor';

const { t } = useI18n();

const getDownloadUrl = (file) => file.compressedUrl || file.url || file.preview;

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

.size-info {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);

  .success {
    color: var(--color-success);
  }

  .danger {
    color: var(--color-danger);
  }
}
</style>
