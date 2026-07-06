<template>
  <div class="file-converter">
    <van-tabs v-model:active="activeTab" class="converter-tabs">
      <!-- 图片格式转换 -->
      <van-tab :title="t('tools.fileConverter.tabs.imageFormat')" name="imageFormat">
        <div class="tab-content">
          <FileUploader
            accept="image/*"
            icon-type="image"
            :upload-tip="t('tools.common.clickToUpload')"
            :hint="t('tools.common.supportedFormats')"
            @change="handleImageAfterRead"
          />

          <ImageFormatSettings
            v-model:format="imageOutputFormat"
            v-model:quality="imageQuality"
          />

          <FileListCard
            v-model="imageConvertList"
            :title="t('tools.fileConverter.common.imageList')"
            icon="photo-o"
            :show-clear-all="true"
            :get-download-url="getImageDownloadUrl"
          >
            <template #headerRight>
              <van-button size="small" type="primary" @click="convertImageFormat">
                {{ t('tools.fileConverter.imageFormat.convertAll') }}
              </van-button>
            </template>
            <template #itemMeta="{ file }">
              <span v-if="file.originalName || file.name" class="format-badge">
                {{ getOriginalFormat(file.originalName || file.name) }} → {{ imageOutputFormat.toUpperCase() }}
              </span>
            </template>
            <template #itemSuffix="{ file }">
              <van-button
                v-if="file.convertedUrl"
                size="small"
                type="primary"
                @click.stop="handleDownloadImage(file)"
              >
                {{ t('tools.fileConverter.common.download') }}
              </van-button>
            </template>
          </FileListCard>

          <div v-if="hasConvertedImages" class="batch-download">
            <van-button type="primary" size="large" @click="handleDownloadAllImages">
              {{ t('tools.fileConverter.common.downloadAll') }}
            </van-button>
          </div>
        </div>
      </van-tab>

      <!-- 图片转PDF -->
      <van-tab :title="t('tools.fileConverter.tabs.imageToPdf')" name="imageToPdf">
        <div class="tab-content">
          <FileUploader
            accept="image/*"
            icon-type="image"
            :upload-tip="t('tools.common.clickToUpload')"
            :hint="t('tools.common.supportedFormats')"
            @change="handlePdfImageAfterRead"
          />

          <ImageToPdfSettings
            v-model:page-size="pdfPageSize"
            v-model:orientation="pdfOrientation"
          />

          <FileListCard
            v-model="pdfImageList"
            :title="t('tools.fileConverter.common.imageList')"
            icon="photo-o"
            :draggable="true"
            :show-actions="false"
          />

          <div v-if="pdfImageList.length > 0" class="batch-download">
            <van-button type="primary" size="large" :loading="convertingToPdf" @click="convertImagesToPdf">
              {{ t('tools.fileConverter.imageToPdf.convert') }}
            </van-button>
          </div>
        </div>
      </van-tab>

      <!-- PDF转图片 -->
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

          <FileListCard
            v-if="pdfPages.length > 0"
            v-model="pdfPages"
            :title="t('tools.fileConverter.pdfToImage.pages')"
            icon="photo-o"
            :show-clear-all="true"
            :get-download-url="getPageDownloadUrl"
          >
            <template #itemSuffix="{ file, index }">
              <van-button size="small" type="primary" @click.stop="handleDownloadPage(file, index)">
                {{ t('tools.fileConverter.common.download') }}
              </van-button>
            </template>
          </FileListCard>

          <div v-if="pdfPages.length > 0" class="batch-download">
            <van-button type="primary" size="large" @click="handleDownloadAllPdfPages">
              {{ t('tools.fileConverter.common.downloadAll') }}
            </van-button>
          </div>
        </div>
      </van-tab>

      <!-- PDF合并 -->
      <van-tab :title="t('tools.fileConverter.tabs.pdfMerge')" name="pdfMerge">
        <div class="tab-content">
          <FileUploader
            accept=".pdf,application/pdf"
            icon-type="pdf"
            :upload-tip="t('tools.fileConverter.pdfMerge.uploadTip')"
            @change="handleMergePdfFilesChange"
          />

          <FileListCard
            v-if="mergePdfFiles.length > 0"
            v-model="mergePdfFiles"
            :draggable="true"
            :title="t('tools.fileConverter.pdfMerge.fileList')"
          />

          <div v-if="mergePdfFiles.length > 0" class="batch-download">
            <van-button type="primary" size="large" :loading="merging" @click="handleMergePdfs">
              {{ t('tools.fileConverter.pdfMerge.merge') }}
            </van-button>
          </div>
        </div>
      </van-tab>

      <!-- 图片拼接 -->
      <van-tab :title="t('tools.fileConverter.tabs.imageStitch')" name="imageStitch">
        <div class="tab-content">
          <FileUploader
            accept="image/*"
            icon-type="image"
            :upload-tip="t('tools.common.clickToUpload')"
            :hint="t('tools.common.supportedFormats')"
            @change="handleStitchImagesChange"
          />

          <ImageStitchSettings
            v-model:direction="stitchDirection"
            v-model:spacing="stitchSpacing"
            v-model:background-color="stitchBgColor"
          />

          <FileListCard
            v-if="stitchImages.length > 0"
            v-model="stitchImages"
            :draggable="true"
            :title="t('tools.fileConverter.common.imageList')"
          />

          <div v-if="stitchImages.length >= 2" class="batch-download">
            <van-button type="primary" size="large" :loading="stitching" @click="handleStitchImages">
              {{ t('tools.fileConverter.imageStitch.stitch') }}
            </van-button>
          </div>
        </div>
      </van-tab>

      <!-- GIF生成 -->
      <van-tab :title="t('tools.fileConverter.tabs.gifMaker')" name="gifMaker">
        <div class="tab-content">
          <FileUploader
            accept="image/*"
            icon-type="image"
            :upload-tip="t('tools.common.clickToUpload')"
            :hint="t('tools.common.supportedFormats')"
            @change="handleGifImagesChange"
          />

          <GifMakerSettings
            v-model:frame-delay="gifFrameDelay"
            v-model:loop="gifLoop"
            v-model:gif-width="gifWidth"
          />

          <FileListCard
            v-if="gifImages.length > 0"
            v-model="gifImages"
            :title="t('tools.fileConverter.common.imageList')"
            icon="photo-o"
            :draggable="true"
            :show-actions="true"
          />

          <div v-if="gifImages.length >= 2" class="batch-download">
            <van-button type="primary" size="large" :loading="makingGif" @click="handleMakeGif">
              {{ t('tools.fileConverter.gifMaker.make') }}
            </van-button>
          </div>
        </div>
      </van-tab>

      <!-- PDF拆分 -->
      <van-tab :title="t('tools.fileConverter.tabs.pdfSplit')" name="pdfSplit">
        <div class="tab-content">
          <div class="upload-section">
            <label class="upload-area">
              <input
                type="file"
                accept=".pdf,application/pdf"
                class="upload-input"
                @change="handleSplitPdfChange"
              />
              <div class="upload-icon">
                <img :src="pdfIcon" alt="PDF" />
              </div>
              <p class="upload-title">{{ t('tools.fileConverter.pdfSplit.uploadTip') }}</p>
              <div v-if="splitPdfFile" class="file-info">
                <div class="file-name">{{ splitPdfFile.name }}</div>
                <div class="file-meta">
                  <span>{{ formatFileSize(splitPdfFile.size) }}</span>
                  <span v-if="splitTotalPages > 0">{{ t('tools.fileConverter.pdfSplit.totalPages') }}: {{ splitTotalPages }}</span>
                </div>
              </div>
            </label>
          </div>

          <ToolCard
            v-if="splitPdfFile"
            icon="description-o"
            :title="t('tools.fileConverter.pdfSplit.rangeInput')"
          >
            <div class="range-input-section">
              <van-field
                v-model="splitRanges"
                :placeholder="t('tools.fileConverter.pdfSplit.rangePlaceholder')"
                clearable
              />
              <p class="range-tip">{{ t('tools.fileConverter.pdfSplit.rangeTip') }}</p>
            </div>
          </ToolCard>

          <div v-if="splitPdfFile" class="batch-download">
            <van-button type="primary" size="large" :loading="splitting" @click="handleSplitPdf">
              {{ t('tools.fileConverter.pdfSplit.split') }}
            </van-button>
          </div>
        </div>
      </van-tab>

      <!-- PDF删除页面 -->
      <van-tab :title="t('tools.fileConverter.tabs.pdfDeletePages')" name="pdfDeletePages">
        <div class="tab-content">
          <div class="upload-section">
            <label class="upload-area">
              <input
                type="file"
                accept=".pdf,application/pdf"
                class="upload-input"
                @change="handleDeletePdfChange"
              />
              <div class="upload-icon">
                <img :src="pdfIcon" alt="PDF" />
              </div>
              <p class="upload-title">{{ t('tools.fileConverter.pdfDeletePages.uploadTip') }}</p>
              <div v-if="deletePdfFile" class="file-info">
                <div class="file-name">{{ deletePdfFile.name }}</div>
                <div class="file-meta">
                  <span>{{ formatFileSize(deletePdfFile.size) }}</span>
                  <span v-if="deleteTotalPages > 0">{{ t('tools.fileConverter.pdfDeletePages.totalPages') }}: {{ deleteTotalPages }}</span>
                </div>
              </div>
            </label>
          </div>

          <ToolCard
            v-if="deletePdfPages.length > 0"
            icon="delete-o"
            :title="t('tools.fileConverter.pdfDeletePages.selectDeletePages')"
            class="page-selector"
          >
            <template #headerRight>
              <span class="selected-count">
                {{ deleteDeletedPages.length }} / {{ deletePdfPages.length }}
              </span>
            </template>
            <div class="page-grid">
              <div
                v-for="(page, index) in deletePdfPages"
                :key="index"
                class="page-item"
                :class="{ deleted: page.deleted }"
                @click="handleDeleteTogglePage(index)"
              >
                <div class="page-number">{{ index + 1 }}</div>
              </div>
            </div>
          </ToolCard>

          <div v-if="deletePdfPages.length > 0" class="batch-download">
            <van-button type="danger" size="large" :loading="deleting" @click="handleDeletePagesAndExport">
              {{ t('tools.fileConverter.pdfDeletePages.export') }}
            </van-button>
          </div>
        </div>
      </van-tab>

      <!-- 文件压缩 -->
      <van-tab :title="t('tools.fileConverter.tabs.fileCompress')" name="fileCompress">
        <div class="tab-content">
          <FileUploader
            icon-type="file"
            :upload-tip="t('tools.fileConverter.fileCompress.uploadTip')"
            @change="handleCompressFilesChangeHook"
          />

          <FileListCard
            v-if="compressFiles.length > 0"
            v-model="compressFiles"
            :title="t('tools.fileConverter.fileCompress.fileList')"
          />

          <div v-if="compressFiles.length > 0" class="batch-download">
            <van-button type="primary" size="large" :loading="compressing" @click="handleCompressFiles">
              {{ t('tools.fileConverter.fileCompress.compress') }}
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
  Icon as VanIcon,
  showConfirmDialog,
  showImagePreview,
} from 'vant';
import FileUploader from '../components/FileUploader.vue';
import ImageFormatSettings from './components/ImageFormatSettings.vue';
import ImageToPdfSettings from './components/ImageToPdfSettings.vue';
import PdfToImageSettings from './components/PdfToImageSettings.vue';
import FileListCard from '../components/FileListCard.vue';
import ImageStitchSettings from './components/ImageStitchSettings.vue';
import GifMakerSettings from './components/GifMakerSettings.vue';
import PdfPageSelector from './components/PdfPageSelector.vue';
import ToolCard from '../components/ToolCard.vue';
import { useImageFormatConverter } from './hooks/useImageFormatConverter';
import { useImageToPdfConverter } from './hooks/useImageToPdfConverter';
import { usePdfToImageConverter } from './hooks/usePdfToImageConverter';
import { usePdfMerger } from './hooks/usePdfMerger';
import { useImageStitcher } from './hooks/useImageStitcher';
import { useGifMaker } from './hooks/useGifMaker';
import { usePdfSplitter } from './hooks/usePdfSplitter';
import { usePdfPageDeleter } from './hooks/usePdfPageDeleter';
import { useFileCompressor } from './hooks/useFileCompressor';
import { formatFileSize, getOriginalFormat } from './utils';
import pdfIcon from '@/views/Tools/assets/pdf.svg';
import fileIcon from '@/views/Tools/assets/file.svg';

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

// PDF合并
const {
  pdfFiles: mergePdfFiles,
  merging,
  handlePdfFilesChange: handleMergePdfFilesChange,
  removePdf: removeMergePdf,
  clearAll: clearMergePdfs,
  mergePdfs,
} = usePdfMerger();

// 图片拼接
const {
  imageFiles: stitchImages,
  direction: stitchDirection,
  spacing: stitchSpacing,
  backgroundColor: stitchBgColor,
  stitching,
  handleImagesChange: handleStitchImagesChange,
  removeImage: handleStitchImageRemove,
  clearAll: clearStitchImages,
  stitchImages: doStitchImages,
} = useImageStitcher();

// GIF生成
const {
  imageFiles: gifImages,
  frameDelay: gifFrameDelay,
  loop: gifLoop,
  gifWidth,
  making: makingGif,
  handleImagesChange: handleGifImagesChange,
  removeImage: handleGifImageRemove,
  clearAll: clearGifImages,
  reorderImages: handleGifReorder,
  makeGif,
} = useGifMaker();

// PDF拆分
const {
  pdfFile: splitPdfFile,
  splitRanges,
  splitting,
  totalPages: splitTotalPages,
  handlePdfChange: handleSplitPdfChangeHook,
  splitPdf,
} = usePdfSplitter();

const handleSplitPdfChange = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    handleSplitPdfChangeHook({ file });
  }
  event.target.value = '';
};

// PDF删除页面
const {
  pdfFile: deletePdfFile,
  pdfPages: deletePdfPages,
  deletedPages: deleteDeletedPages,
  deleting,
  totalPages: deleteTotalPages,
  handlePdfChange: handleDeletePdfChangeHook,
  togglePage: handleDeleteTogglePage,
  deletePagesAndExport,
} = usePdfPageDeleter();

const handleDeletePdfChange = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    handleDeletePdfChangeHook({ file });
  }
  event.target.value = '';
};

const handleDeletePagesAndExport = () => {
  deletePagesAndExport();
};

// 文件压缩
const {
  files: compressFiles,
  compressing,
  handleFilesChange: handleCompressFilesChangeHook,
  removeFile: handleCompressFileRemove,
  clearAll: clearCompressFiles,
  compressToZip,
} = useFileCompressor();

const handlePdfFileChange = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    handlePdfUpload({ file });
    event.target.value = '';
  }
};

const getImageDownloadUrl = (file) => file.convertedUrl || file.url || file.originalUrl;
const getPageDownloadUrl = (page) => page.url;

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

const handleMergePdfs = () => {
  mergePdfs();
};

// 图片拼接
const handleStitchImages = () => {
  doStitchImages();
};

// GIF生成
const handleMakeGif = () => {
  makeGif();
};

// PDF拆分
const handleSplitPdf = () => {
  splitPdf();
};

// 文件压缩
const handleCompressFiles = () => {
  compressToZip();
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

.page-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
}

.page-item {
  aspect-ratio: 1;
  background: var(--color-bg-primary);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;

  &:active {
    transform: scale(0.95);
  }

  &.deleted {
    border-color: var(--color-danger);
    background: rgba(var(--color-danger-rgb), 0.1);

    .page-number {
      color: var(--color-danger);
    }
  }
}

.range-input-section {
  .range-tip {
    font-size: var(--font-size-xs);
    color: var(--color-text-tertiary);
    margin-top: var(--spacing-sm);
    line-height: 1.5;
  }
}
</style>