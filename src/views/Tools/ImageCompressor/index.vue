<template>
  <div class="image-compressor">
    <!-- 上传区域 -->
    <div class="upload-section">
      <van-uploader
        v-model="fileList"
        multiple
        accept="image/*"
        :max-count="20"
        :after-read="handleAfterRead"
        @delete="handleDelete"
      >
        <template #default>
          <div class="upload-area">
            <van-icon name="photo-o" size="48" />
            <p>{{ t('tools.imageCompressor.uploadTip') }}</p>
          </div>
        </template>
      </van-uploader>
    </div>

    <!-- 设置选项 -->
    <div v-if="images.length > 0" class="settings-section">
      <van-cell-group inset>
        <van-cell :title="t('tools.imageCompressor.quality')">
          <van-slider v-model="quality" :min="10" :max="100" :step="5">
            <template #button>
              <div class="quality-badge">{{ quality }}%</div>
            </template>
          </van-slider>
        </van-cell>
        <van-cell :title="t('tools.imageCompressor.maxWidth')">
          <van-stepper v-model="maxWidth" min="100" max="4000" step="100" />
        </van-cell>
        <van-cell :title="t('tools.imageCompressor.format')">
          <template #right-icon>
            <van-dropdown-menu>
              <van-dropdown-item v-model="format" :options="formatOptions" />
            </van-dropdown-menu>
          </template>
        </van-cell>
        <van-cell :title="t('tools.imageCompressor.keepExif')">
          <van-switch v-model="keepExif" size="20" />
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 图片列表 -->
    <div v-if="images.length > 0" class="image-list">
      <div class="list-header">
        <span>{{ t('tools.imageCompressor.imageList') }} ({{ images.length }})</span>
        <div class="header-actions">
          <van-button size="small" type="primary" @click="compressAll">
            {{ t('tools.imageCompressor.compressAll') }}
          </van-button>
          <van-button size="small" type="danger" plain @click="clearAll">
            {{ t('tools.imageCompressor.clearAll') }}
          </van-button>
        </div>
      </div>

      <div class="image-grid">
        <div
          v-for="(img, index) in images"
          :key="img.id"
          class="image-card"
        >
          <img :src="img.url" class="preview" />
          <div class="image-info">
            <div class="info-row">
              <span class="label">{{ t('tools.imageCompressor.original') }}:</span>
              <span class="value">{{ formatSize(img.originalSize) }}</span>
            </div>
            <div v-if="img.compressedSize" class="info-row compressed">
              <span class="label">{{ t('tools.imageCompressor.compressed') }}:</span>
              <span class="value">{{ formatSize(img.compressedSize) }}</span>
              <span class="ratio">-{{ img.ratio }}%</span>
            </div>
            <div v-if="img.compressedUrl" class="actions">
              <van-button size="mini" type="primary" @click="downloadImage(img)">
                {{ t('tools.imageCompressor.download') }}
              </van-button>
              <van-button size="mini" plain @click="previewImage(img)">
                {{ t('tools.imageCompressor.preview') }}
              </van-button>
            </div>
            <div v-if="!img.compressedUrl" class="actions">
              <van-button size="mini" type="primary" :loading="img.compressing" @click="compressOne(index)">
                {{ t('tools.imageCompressor.compress') }}
              </van-button>
            </div>
          </div>
          <van-icon name="cross" class="remove-btn" @click="removeImage(index)" />
        </div>
      </div>
    </div>

    <!-- 批量下载 -->
    <div v-if="hasCompressedImages" class="batch-download">
      <van-button type="primary" block @click="downloadAll">
        {{ t('tools.imageCompressor.downloadAll') }}
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { showImagePreview } from 'vant';
import {
  Uploader as VanUploader,
  Button as VanButton,
  Icon as VanIcon,
  Cell as VanCell,
  CellGroup as VanCellGroup,
  Slider as VanSlider,
  Stepper as VanStepper,
  DropdownMenu as VanDropdownMenu,
  DropdownItem as VanDropdownItem,
  Switch as VanSwitch,
  showSuccessToast,
  showFailToast,
  showLoadingToast,
} from 'vant';

const { t } = useI18n();

// 状态
const fileList = ref([]);
const images = ref([]);
const quality = ref(80);
const maxWidth = ref(1920);
const format = ref('original');
const keepExif = ref(false);

// 格式选项
const formatOptions = computed(() => [
  { text: t('tools.imageCompressor.originalFormat'), value: 'original' },
  { text: 'JPEG', value: 'jpeg' },
  { text: 'PNG', value: 'png' },
  { text: 'WebP', value: 'webp' },
]);

// 是否有压缩后的图片
const hasCompressedImages = computed(() => {
  return images.value.some(img => img.compressedUrl);
});

// 处理文件上传
const handleAfterRead = async (file) => {
  const files = Array.isArray(file) ? file : [file];

  for (const f of files) {
    if (f.file && f.file.type.startsWith('image/')) {
      const url = URL.createObjectURL(f.file);
      images.value.push({
        id: Date.now() + Math.random(),
        name: f.file.name,
        url,
        originalUrl: url,
        file: f.file,
        originalSize: f.file.size,
        compressedUrl: null,
        compressedSize: null,
        ratio: null,
        compressing: false,
      });
    }
  }
};

// 删除图片
const handleDelete = (file, detail) => {
  const index = detail.index;
  if (images.value[index]) {
    URL.revokeObjectURL(images.value[index].url);
    if (images.value[index].compressedUrl) {
      URL.revokeObjectURL(images.value[index].compressedUrl);
    }
    images.value.splice(index, 1);
  }
};

// 移除单张图片
const removeImage = (index) => {
  const img = images.value[index];
  URL.revokeObjectURL(img.url);
  if (img.compressedUrl) {
    URL.revokeObjectURL(img.compressedUrl);
  }
  images.value.splice(index, 1);
};

// 清空所有
const clearAll = () => {
  images.value.forEach(img => {
    URL.revokeObjectURL(img.url);
    if (img.compressedUrl) {
      URL.revokeObjectURL(img.compressedUrl);
    }
  });
  images.value = [];
  fileList.value = [];
};

// 压缩单张图片
const compressOne = async (index) => {
  const img = images.value[index];
  if (!img || img.compressing) return;

  img.compressing = true;

  try {
    const compressed = await compressImage(img.file);
    img.compressedUrl = compressed.url;
    img.compressedSize = compressed.size;
    img.ratio = Math.round((1 - compressed.size / img.originalSize) * 100);
  } catch (error) {
    console.error('Compress error:', error);
    showFailToast(t('tools.imageCompressor.compressFailed'));
  } finally {
    img.compressing = false;
  }
};

// 压缩所有图片
const compressAll = async () => {
  const loadingToast = showLoadingToast({
    message: t('tools.imageCompressor.compressing'),
    forbidClick: true,
    duration: 0,
  });

  for (let i = 0; i < images.value.length; i++) {
    const img = images.value[i];
    if (!img.compressedUrl && !img.compressing) {
      await compressOne(i);
    }
  }

  loadingToast.close();
  showSuccessToast(t('tools.imageCompressor.compressSuccess'));
};

// 压缩图片
const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.naturalWidth;
      let height = img.naturalHeight;

      // 按最大宽度缩放
      if (width > maxWidth.value) {
        height = (height * maxWidth.value) / width;
        width = maxWidth.value;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // 确定输出格式
      let mimeType;
      let outputFormat = format.value;

      if (outputFormat === 'original') {
        mimeType = file.type || 'image/jpeg';
        outputFormat = mimeType.split('/')[1];
      } else {
        mimeType = `image/${outputFormat}`;
      }

      // WebP格式质量需要特殊处理
      const outputQuality = outputFormat === 'webp' ? quality.value / 100 : quality.value / 100;

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            resolve({
              url,
              size: blob.size,
              blob,
            });
          } else {
            reject(new Error('Failed to compress image'));
          }
        },
        mimeType,
        outputQuality
      );
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

// 下载单张图片
const downloadImage = (img) => {
  if (!img.compressedUrl) return;

  const link = document.createElement('a');
  link.href = img.compressedUrl;
  const ext = format.value === 'original' ? img.name.split('.').pop() : format.value;
  link.download = `compressed_${img.name.replace(/\.[^.]+$/, '')}.${ext}`;
  link.click();
};

// 预览图片
const previewImage = (img) => {
  showImagePreview({
    images: [img.originalUrl, img.compressedUrl].filter(Boolean),
    startPosition: 1,
  });
};

// 下载所有压缩后的图片
const downloadAll = async () => {
  const compressedImages = images.value.filter(img => img.compressedUrl);

  for (let i = 0; i < compressedImages.length; i++) {
    downloadImage(compressedImages[i]);
    await new Promise(resolve => setTimeout(resolve, 300));
  }
};

// 格式化文件大小
const formatSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};
</script>

<style lang="less" scoped>
.image-compressor {
  padding: var(--spacing-md);
}

.upload-section {
  margin-bottom: var(--spacing-lg);

  .upload-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-xl);
    background: var(--color-bg-secondary);
    border-radius: var(--radius-lg);
    border: 2px dashed var(--color-border);
    color: var(--color-text-secondary);

    p {
      margin-top: var(--spacing-sm);
      font-size: var(--font-size-sm);
    }
  }
}

.settings-section {
  margin-bottom: var(--spacing-lg);

  :deep(.van-cell) {
    background: var(--color-bg-secondary);
  }

  .quality-badge {
    background: var(--color-primary);
    color: white;
    padding: 2px 8px;
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
  }
}

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

  .image-card {
    position: relative;
    background: var(--color-bg-secondary);
    border-radius: var(--radius-lg);
    overflow: hidden;
    padding: var(--spacing-md);

    .preview {
      width: 100%;
      height: 150px;
      object-fit: contain;
      background: var(--color-bg-primary);
      border-radius: var(--radius-md);
      margin-bottom: var(--spacing-sm);
    }

    .image-info {
      .info-row {
        display: flex;
        align-items: center;
        font-size: var(--font-size-sm);
        margin-bottom: var(--spacing-xs);

        .label {
          color: var(--color-text-secondary);
          margin-right: var(--spacing-xs);
        }

        .value {
          color: var(--color-text-primary);
        }

        &.compressed .value {
          color: var(--color-success);
        }

        .ratio {
          margin-left: var(--spacing-sm);
          color: var(--color-success);
          font-weight: var(--font-weight-semibold);
        }
      }

      .actions {
        display: flex;
        gap: var(--spacing-sm);
        margin-top: var(--spacing-sm);
      }
    }

    .remove-btn {
      position: absolute;
      top: var(--spacing-sm);
      right: var(--spacing-sm);
      background: rgba(0, 0, 0, 0.5);
      color: white;
      border-radius: 50%;
      padding: 4px;
      cursor: pointer;
    }
  }
}

.batch-download {
  margin-top: var(--spacing-lg);
}
</style>
