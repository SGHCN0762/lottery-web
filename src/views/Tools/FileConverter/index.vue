<template>
  <div class="file-converter">
    <van-tabs v-model:active="activeTab" class="converter-tabs">
      <van-tab :title="t('tools.fileConverter.tabs.imageFormat')" name="imageFormat">
        <div class="tab-content">
          <ImageUploader
            :file-list="imageFileList"
            :upload-tip="t('tools.common.clickToUpload')"
            @after-read="handleImageAfterRead"
            @delete="handleImageDelete"
          />

          <ImageFormatSettings
            v-model:format="imageOutputFormat"
            v-model:quality="imageQuality"
          />

          <ConvertImageList
            :images="imageConvertList"
            :output-format="imageOutputFormat"
            @convert-all="convertImageFormat"
            @clear-all="clearImageList"
            @preview="previewImage"
            @download="handleDownloadImage"
          />

          <div v-if="hasConvertedImages" class="batch-download">
            <van-button type="primary" size="large" @click="handleDownloadAllImages">
              {{ t('tools.fileConverter.common.downloadAll') }}
            </van-button>
          </div>
        </div>
      </van-tab>

      <van-tab :title="t('tools.fileConverter.tabs.imageToPdf')" name="imageToPdf">
        <div class="tab-content">
          <ImageUploader
            :file-list="pdfImageFileList"
            :upload-tip="t('tools.common.clickToUpload')"
            @after-read="handlePdfImageAfterRead"
            @delete="handlePdfImageDelete"
          />

          <ImageToPdfSettings
            v-model:page-size="pdfPageSize"
            v-model:orientation="pdfOrientation"
          />

          <PdfImageList
            :images="pdfImageList"
            @update:images="updatePdfImageList"
            @clear-all="clearPdfImageList"
          />

          <div v-if="pdfImageList.length > 0" class="batch-download">
            <van-button type="primary" size="large" :loading="convertingToPdf" @click="convertImagesToPdf">
              {{ t('tools.fileConverter.imageToPdf.convert') }}
            </van-button>
          </div>
        </div>
      </van-tab>

      <van-tab :title="t('tools.fileConverter.tabs.pdfToImage')" name="pdfToImage">
        <div class="tab-content">
          <div class="upload-section">
            <label class="upload-area">
              <input
                type="file"
                accept=".pdf,application/pdf"
                class="upload-input"
                @change="handlePdfFileChange"
              />
              <div class="upload-icon">
                <img :src="pdfIcon" alt="PDF" />
              </div>
              <p class="upload-title">{{ pdfFile.length > 0 ? t('tools.fileConverter.pdfToImage.reupload') : t('tools.fileConverter.pdfToImage.uploadTip') }}</p>
              <div v-if="pdfFile.length > 0" class="file-info">
                <div class="file-name">{{ pdfFile[0].name }}</div>
                <div class="file-meta">
                  <span>{{ formatFileSize(pdfFile[0].size) }}</span>
                  <span v-if="pdfTotalPages > 0">{{ t('tools.fileConverter.pdfToImage.pages') }}: {{ pdfTotalPages }}</span>
                </div>
              </div>
            </label>
          </div>

          <PdfToImageSettings
            v-model:format="pdfOutputFormat"
            v-model:resolution="pdfResolution"
          />

          <div v-if="pdfPages.length === 0" class="process-section">
            <van-button type="primary" size="large" block :loading="processingPdf" @click="processPdf">
              {{ t('tools.fileConverter.pdfToImage.process') }}
            </van-button>
          </div>

          <PdfPageList
            v-if="pdfPages.length > 0"
            :pages="pdfPages"
            :output-format="pdfOutputFormat"
            @clear-all="clearPdfPages"
            @preview="previewPage"
            @download="handleDownloadPage"
          />

          <div v-if="pdfPages.length > 0" class="batch-download">
            <van-button type="primary" size="large" @click="handleDownloadAllPdfPages">
              {{ t('tools.fileConverter.common.downloadAll') }}
            </van-button>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  Tabs as VanTabs,
  Tab as VanTab,
  Button as VanButton,
  showConfirmDialog,
  showImagePreview,
} from 'vant';
import ImageUploader from '../components/ImageUploader.vue';
import ImageFormatSettings from './components/ImageFormatSettings.vue';
import ImageToPdfSettings from './components/ImageToPdfSettings.vue';
import PdfToImageSettings from './components/PdfToImageSettings.vue';
import ConvertImageList from './components/ConvertImageList.vue';
import PdfImageList from './components/PdfImageList.vue';
import PdfPageList from './components/PdfPageList.vue';
import { useImageFormatConverter } from './hooks/useImageFormatConverter';
import { useImageToPdfConverter } from './hooks/useImageToPdfConverter';
import { usePdfToImageConverter } from './hooks/usePdfToImageConverter';
import { formatFileSize } from './utils';
import pdfIcon from './assets/pdf.svg';

const { t } = useI18n();

const activeTab = ref('imageFormat');

const {
  imageFileList,
  imageConvertList,
  imageOutputFormat,
  imageQuality,
  hasConvertedImages,
  handleImageAfterRead,
  handleImageDelete,
  convertImageFormat,
  clearImageList: doClearImageList,
  downloadConvertedImage,
  downloadAllImages,
} = useImageFormatConverter();

const {
  pdfImageFileList,
  pdfImageList,
  pdfPageSize,
  pdfOrientation,
  convertingToPdf,
  handlePdfImageAfterRead,
  handlePdfImageDelete,
  clearPdfImageList: doClearPdfImageList,
  updatePdfImageList,
  convertImagesToPdf,
} = useImageToPdfConverter();

const {
  pdfFile,
  pdfPages,
  pdfOutputFormat,
  pdfResolution,
  processingPdf,
  pdfTotalPages,
  handlePdfUpload,
  processPdf,
  downloadPdfPage,
  downloadAllPdfPages,
  clearPdfPages: doClearPdfPages,
} = usePdfToImageConverter();

const handlePdfFileChange = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    handlePdfUpload({ file });
    event.target.value = '';
  }
};

const previewImage = (img) => {
  const urls = [img.originalUrl || img.url, img.convertedUrl].filter(Boolean);
  showImagePreview({ images: urls, startPosition: urls.length - 1 });
};

const previewPage = (page) => {
  showImagePreview({ images: [page.url] });
};

const clearImageList = async () => {
  try {
    await showConfirmDialog({
      title: t('common.confirm'),
      message: t('tools.fileConverter.common.confirmClearAll'),
    });
    doClearImageList();
  } catch {
  }
};

const clearPdfImageList = async () => {
  try {
    await showConfirmDialog({
      title: t('common.confirm'),
      message: t('tools.fileConverter.common.confirmClearAll'),
    });
    doClearPdfImageList();
  } catch {
  }
};

const clearPdfPages = async () => {
  try {
    await showConfirmDialog({
      title: t('common.confirm'),
      message: t('tools.fileConverter.common.confirmClearAll'),
    });
    doClearPdfPages();
  } catch {
  }
};

const handleDownloadImage = (img) => {
  downloadConvertedImage(img);
};

const handleDownloadAllImages = () => {
  downloadAllImages();
};

const handleDownloadPage = (page, index) => {
  downloadPdfPage(page, index);
};

const handleDownloadAllPdfPages = () => {
  downloadAllPdfPages();
};
</script>

<style lang="less" scoped>
.file-converter {
  min-height: 100vh;
  background: var(--color-bg-primary);

  :deep(.van-tabs__wrap) {
    position: sticky;
    top: 0;
    z-index: 10;
    background: var(--color-bg-primary);
  }

  :deep(.van-tabs__nav) {
    background: var(--color-bg-secondary);
  }

  :deep(.van-tab) {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
  }

  :deep(.van-tab--active) {
    color: var(--color-primary);
    font-weight: var(--font-weight-semibold);
  }

  :deep(.van-tabs__line) {
    background: var(--color-primary);
  }
}

.tab-content {
  padding: var(--spacing-md);
}

.upload-section {
  margin-bottom: var(--spacing-lg);

  .upload-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: calc(100vw - 2 * var(--spacing-md));
    min-height: 160px;
    padding: var(--spacing-xl) var(--spacing-lg);
    background: linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-tertiary) 100%);
    border-radius: var(--radius-xl);
    border: 2px dashed var(--color-border);
    color: var(--color-text-secondary);
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    .upload-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
      z-index: 10;
    }

    .upload-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      margin-bottom: var(--spacing-md);
      transition: all 0.3s ease;

      img {
        width: 64px;
        height: 64px;
        object-fit: contain;
        transition: filter 0.3s ease;
      }
    }

    .upload-title {
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-primary);
      margin: 0 0 var(--spacing-xs) 0;
    }

    .file-info {
      margin-top: var(--spacing-sm);
      text-align: center;
      width: 100%;

      .file-name {
        font-size: var(--font-size-sm);
        color: var(--color-primary);
        font-weight: var(--font-weight-medium);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 240px;
        margin: 0 auto var(--spacing-xs);
      }

      .file-meta {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-md);
        font-size: var(--font-size-xs);
        color: var(--color-text-tertiary);
      }
    }
  }
}

.process-section {
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
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