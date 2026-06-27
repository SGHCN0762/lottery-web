<template>
  <div
    class="file-item"
    :class="{ 'is-draggable': config.draggable, 'is-grid': config.layout === 'grid' }"
    @click="$emit('click', file)"
  >
    <slot name="itemPrefix" :file="file" />

    <div class="file-preview" @click.stop="$emit('preview', file)">
      <img
        v-if="isImage(file) && file.url"
        :src="file.url"
        alt=""
      />
      <div v-else class="file-icon">
        <img :src="fileIconSrc" alt="" />
      </div>
    </div>

    <div class="file-info">
      <div class="file-name">{{ fileNameStr }}</div>
      <div class="file-meta">
        <span>{{ fileSizeStr }}</span>
        <slot name="itemMeta" :file="file" />
        <span v-if="file.convertedUrl" class="status-tag converted">
          {{ convertedText }}
        </span>
        <span v-else-if="file.converting" class="status-tag converting">
          {{ processingText }}
        </span>
        <span v-else-if="file.compressedUrl" class="status-tag converted">
          {{ compressedText }}
        </span>
        <span v-else-if="file.watermarkedUrl" class="status-tag converted">
          {{ completedText }}
        </span>
        <span v-else-if="file.watermarking || file.compressing" class="status-tag converting">
          {{ processingText }}
        </span>
      </div>
    </div>

    <div class="file-actions">
      <div
        v-if="config.draggable"
        class="drag-handle"
        @click.stop
      >
        <van-icon name="exchange" size="16" />
      </div>

      <van-icon
        v-if="config.showActions"
        name="ellipsis"
        class="more-btn"
        @click.stop="$emit('action', file)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Icon as VanIcon } from 'vant';
import { formatFileSize, getFileName } from '../utils';

import filePdfIcon from '../assets/file-pdf.svg';
import fileDocIcon from '../assets/file-doc.svg';
import filePptIcon from '../assets/file-ppt.svg';
import fileTxtIcon from '../assets/file-txt.svg';
import fileMp4Icon from '../assets/file-mp4.svg';
import fileMp3Icon from '../assets/file-mp3.svg';
import fileZipIcon from '../assets/file-zip.svg';
import fileOtherIcon from '../assets/file-other.svg';

const { t } = useI18n();

const convertedText = t('tools.fileConverter.imageFormat.converted');
const processingText = t('tools.fileConverter.common.processing');
const compressedText = t('tools.imageCompressor.compressed');
const completedText = t('tools.imageWatermark.completed');

const props = defineProps({
  file: {
    type: Object,
    required: true,
  },
  config: {
    type: Object,
    default: () => ({
      draggable: false,
      showActions: true,
      layout: 'list',
    }),
  },
});

defineEmits(['click', 'preview', 'action']);

const fileNameStr = computed(() => getFileName(props.file));
const fileSizeStr = computed(() => formatFileSize(props.file.size || props.file.file?.size));

const fileIconSrc = computed(() => {
  const name = props.file.name || '';
  const ext = name.split('.').pop()?.toLowerCase() || '';
  
  if (ext === 'pdf') return filePdfIcon;
  if (['doc', 'docx'].includes(ext)) return fileDocIcon;
  if (['ppt', 'pptx'].includes(ext)) return filePptIcon;
  if (['txt', 'json', 'xml', 'html', 'css', 'js', 'ts'].includes(ext)) return fileTxtIcon;
  if (['mp4', 'avi', 'mov', 'wmv'].includes(ext)) return fileMp4Icon;
  if (['mp3', 'wav', 'ogg'].includes(ext)) return fileMp3Icon;
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return fileZipIcon;
  if (['xls', 'xlsx'].includes(ext)) return fileDocIcon;
  return fileOtherIcon;
});

const isImage = (file) => {
  const type = file.type || '';
  const name = file.name || '';
  return type.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(name);
};
</script>

<style lang="less" scoped>
.file-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }
  
  &:active {
    background: var(--color-bg-tertiary);
  }

  &.is-draggable {
    cursor: pointer;
  }
}

.file-preview {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  overflow: hidden;
  flex-shrink: 0;
  background: var(--color-bg-primary);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .file-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 32px;
      height: 32px;
      object-fit: contain;
    }
  }
}

.file-info {
  flex: 1;
  margin-left: 12px;
  min-width: 0;
}

.file-name {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-meta {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-top: 2px;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex-wrap: wrap;

  .status-tag {
    padding: 1px 6px;
    border-radius: var(--radius-sm);
    font-size: 10px;

    &.converted {
      background: var(--color-success);
      color: white;
    }

    &.converting {
      background: var(--color-warning);
      color: white;
    }
  }
}

.file-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex-shrink: 0;

  .drag-handle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    color: var(--color-text-tertiary);
    cursor: grab;
    border-radius: var(--radius-md);

    &:active {
      cursor: grabbing;
    }
  }

  .more-btn{
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-secondary);
    cursor: pointer;
  }

  .more-btn:hover {
    color: var(--color-primary);
  }
}
</style>
