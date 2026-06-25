<template>
  <div v-if="files.length > 0" class="file-list">
    <ListHeader
      :title="title"
      :count="files.length"
      @clear-all="$emit('clear-all')"
    />
    <div class="list-items">
      <div v-for="(file, index) in files" :key="index" class="file-item">
        <div class="file-preview">
          <img v-if="isImage(file)" :src="file.url" alt="" />
          <div v-else class="file-icon">
            <van-icon v-if="isPdf(file)" name="description" />
            <van-icon v-else-if="isVideo(file)" name="video-o" />
            <van-icon v-else-if="isAudio(file)" name="music-o" />
            <van-icon v-else-if="isCompressed(file)" name="cluster-o" />
            <van-icon v-else-if="isText(file)" name="notes-o" />
            <van-icon v-else-if="isWord(file)" name="file-text-o" />
            <van-icon v-else-if="isExcel(file)" name="file-text-o" />
            <van-icon v-else-if="isPowerPoint(file)" name="file-text-o" />
            <van-icon v-else name="notes-o" />
          </div>
        </div>
        <div class="file-info">
          <div class="file-name">{{ truncateName(file.name) }}</div>
          <div class="file-meta">
            <span>{{ formatFileSize(file.size || file.file?.size) }}</span>
          </div>
        </div>
        <van-icon name="cross" class="delete-btn" @click="$emit('remove', index)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import ListHeader from './ListHeader.vue';
import { formatFileSize, truncateName } from '../utils';

defineProps({
  files: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['remove', 'clear-all']);

const { t } = useI18n();

const getFileType = (file) => {
  if (file.file) {
    return file.file.type;
  }
  if (file.type) {
    return file.type;
  }
  return '';
};

const getFileName = (file) => {
  return file.name || file.file?.name || '';
};

const isImage = (file) => {
  const type = getFileType(file);
  return type.startsWith('image/');
};

const isPdf = (file) => {
  const type = getFileType(file);
  if (type === 'application/pdf') return true;
  const name = getFileName(file);
  return name.toLowerCase().endsWith('.pdf');
};

const isVideo = (file) => {
  const type = getFileType(file);
  return type.startsWith('video/');
};

const isAudio = (file) => {
  const type = getFileType(file);
  return type.startsWith('audio/');
};

const isCompressed = (file) => {
  const type = getFileType(file);
  const compressedTypes = [
    'application/zip',
    'application/x-zip-compressed',
    'application/x-rar-compressed',
    'application/x-7z-compressed',
    'application/gzip',
    'application/x-tar',
  ];
  if (compressedTypes.includes(type)) return true;
  const name = getFileName(file);
  const compressedExts = ['.zip', '.rar', '.7z', '.gz', '.tar'];
  return compressedExts.some(ext => name.toLowerCase().endsWith(ext));
};

const isText = (file) => {
  const type = getFileType(file);
  if (type.startsWith('text/')) return true;
  const name = getFileName(file);
  const textExts = ['.txt', '.md', '.json', '.xml', '.html', '.css', '.js', '.ts'];
  return textExts.some(ext => name.toLowerCase().endsWith(ext));
};

const isWord = (file) => {
  const name = getFileName(file);
  const wordExts = ['.doc', '.docx'];
  return wordExts.some(ext => name.toLowerCase().endsWith(ext));
};

const isExcel = (file) => {
  const name = getFileName(file);
  const excelExts = ['.xls', '.xlsx', '.csv'];
  return excelExts.some(ext => name.toLowerCase().endsWith(ext));
};

const isPowerPoint = (file) => {
  const name = getFileName(file);
  const pptExts = ['.ppt', '.pptx'];
  return pptExts.some(ext => name.toLowerCase().endsWith(ext));
};
</script>

<style lang="less" scoped>
.file-list {
  margin-top: 16px;
}

.list-items {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
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
    color: var(--color-text-secondary);
    font-size: 24px;
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
}

.delete-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  cursor: pointer;
  flex-shrink: 0;
  transition: color 0.2s;

  &:hover {
    color: var(--color-danger);
  }
}
</style>
