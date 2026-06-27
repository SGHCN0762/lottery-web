<template>
  <div class="image-watermark">
    <FileUploader
      accept="image/*"
      icon-type="image"
      :hint="t('tools.common.supportedFormats')"
      @change="handleAfterRead"
    />

    <WatermarkSettings
      v-model:watermark-type="watermarkType"
      :watermark-type-options="watermarkTypeOptions"
      v-model:watermark-text="watermarkText"
      v-model:watermark-size="watermarkSize"
      v-model:watermark-angle="watermarkAngle"
      v-model:watermark-opacity="watermarkOpacity"
      v-model:watermark-color="watermarkColor"
      v-model:watermark-position="watermarkPosition"
      :position-options="positionOptions"
      v-model:watermark-margin="watermarkMargin"
      v-model:custom-position-x="customPositionX"
      v-model:custom-position-y="customPositionY"
      :logo-url="logoUrl"
      v-model:logo-width="logoWidth"
      v-model:logo-height="logoHeight"
      v-model:output-format="outputFormat"
      :format-options="formatOptions"
      @update:logo="handleLogoUpdate"
    />

    <FileListCard
      v-model="images"
      :title="t('tools.imageWatermark.imageList')"
      icon="photo-o"
      :show-clear-all="true"
      :get-download-url="getDownloadUrl"
    >
      <template #headerRight>
        <van-button size="small" type="primary" @click="addWatermarkAll">
          {{ t('tools.imageWatermark.watermarkAll') }}
        </van-button>
      </template>
      <template #itemSuffix="{ file, index }">
        <template v-if="file.watermarkedUrl">
          <van-button size="small" type="primary" @click.stop="downloadImage(file)">
            {{ t('tools.imageWatermark.download') }}
          </van-button>
          <van-button size="small" type="warning" plain @click.stop="addWatermarkOne(index)">
            {{ t('tools.imageWatermark.redo') }}
          </van-button>
        </template>
        <van-button
          v-else
          size="small"
          type="primary"
          :loading="file.watermarking"
          @click.stop="addWatermarkOne(index)"
        >
          {{ t('tools.imageWatermark.watermark') }}
        </van-button>
      </template>
    </FileListCard>

    <div v-if="hasWatermarkedImages" class="batch-download">
      <van-button type="primary" size="large" @click="downloadAll">
        {{ t('tools.imageWatermark.downloadAll') }}
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Button as VanButton } from 'vant';
import FileUploader from '../components/FileUploader.vue';
import FileListCard from '../components/FileListCard.vue';
import WatermarkSettings from './components/WatermarkSettings.vue';
import { useImageWatermark } from './hooks/useImageWatermark';

const { t } = useI18n();

const getDownloadUrl = (file) => file.watermarkedUrl || file.url || file.preview;

const {
  fileList,
  images,
  watermarkType,
  watermarkTypeOptions,
  watermarkText,
  watermarkColor,
  watermarkSize,
  watermarkAngle,
  watermarkOpacity,
  watermarkPosition,
  positionOptions,
  watermarkMargin,
  customPositionX,
  customPositionY,
  logoUrl,
  logoWidth,
  logoHeight,
  outputFormat,
  formatOptions,
  hasWatermarkedImages,
  handleAfterRead,
  handleLogoUpload,
  handleDelete,
  removeImage,
  clearAll,
  addWatermarkOne,
  addWatermarkAll,
  downloadImage,
  downloadAll,
} = useImageWatermark();

const handleLogoUpdate = (file) => {
  if (file) {
    handleLogoUpload(file);
  } else {
    URL.revokeObjectURL(logoUrl.value);
    logoUrl.value = null;
  }
};
</script>

<style lang="less" scoped>
.image-watermark {
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
