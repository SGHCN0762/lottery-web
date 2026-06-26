<template>
  <ToolCard
    v-if="modelValue.length > 0"
    :title="title"
    :count="showCount ? modelValue.length : undefined"
    :icon="icon"
    class="file-list-card"
  >
    <template #headerRight>
      <slot name="headerRight" />
      <van-button
        v-if="showClearAll"
        size="small"
        type="danger"
        plain
        @click="clearAll"
      >
        {{ clearAllText }}
      </van-button>
    </template>

    <div class="file-list-body" :style="{ maxHeight: contentMaxHeight + 'px' }">
      <FileList
        :model-value="modelValue"
        :config="listConfig"
        :action-items="actionItems"
        :previewable="previewable"
        :get-download-url="getDownloadUrl"
        :get-download-file-name="getDownloadFileName"
        @update:model-value="$emit('update:modelValue', $event)"
        @preview="handlePreview"
        @sort="handleSort"
        @action="$emit('action', $event)"
        @item-click="$emit('item-click', $event)"
      >
        <template #itemPrefix="{ file }">
          <slot name="itemPrefix" :file="file" />
        </template>
        <template #itemMeta="{ file }">
          <slot name="itemMeta" :file="file" />
        </template>
        <template #itemSuffix="{ file }">
          <slot name="itemSuffix" :file="file" />
        </template>
      </FileList>
    </div>
  </ToolCard>

  <div v-else-if="!hideEmpty" class="empty-state">
    <slot name="empty">
      <van-icon name="description-o" size="72" />
      <p>{{ emptyText || emptyDefaultText }}</p>
    </slot>
  </div>

  <van-popup
    v-model:show="previewVisible"
    position="bottom"
    round
    :style="{ height: '85%' }"
    class="file-preview-popup"
  >
    <div class="preview-header">
      <span class="preview-title">{{ previewFileName }}</span>
      <van-icon name="cross" class="preview-close" @click="previewVisible = false" />
    </div>
    <div class="preview-content">
      <OpenFileViewer
        v-if="previewFile"
        :file="previewFile"
        :file-name="previewFileName"
        :width="'100%'"
        :height="'100%'"
        :plugins="plugins"
        fit="contain"
        toolbar
      />
      <div v-else class="preview-loading">
        <van-loading type="spinner" size="32px" />
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { ref, computed as vueComputed } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  Button as VanButton,
  Icon as VanIcon,
  Popup as VanPopup,
  Loading as VanLoading,
} from 'vant';
import { OpenFileViewer } from '@open-file-viewer/vue';
import { imagePlugin, pdfPlugin, textPlugin, officePlugin } from '@open-file-viewer/core';
import '@open-file-viewer/core/style.css';
import pdfWorkerSrc from 'pdfjs-dist/build/pdf.worker.mjs?url';
import ToolCard from './ToolCard.vue';
import FileList from './FileList.vue';
import {
  getFileName,
  getFileUrl,
} from '../utils';

const { t } = useI18n();

const clearAllText = t('tools.fileConverter.common.clearAll');
const emptyDefaultText = t('tools.fileConverter.common.empty');

const plugins = [
  imagePlugin(),
  textPlugin(),
  pdfPlugin({ workerSrc: pdfWorkerSrc }),
  officePlugin(),
];

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: 'description-o',
  },
  showCount: {
    type: Boolean,
    default: true,
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  previewable: {
    type: Boolean,
    default: true,
  },
  showActions: {
    type: Boolean,
    default: true,
  },
  showClearAll: {
    type: Boolean,
    default: false,
  },
  hideEmpty: {
    type: Boolean,
    default: false,
  },
  emptyText: {
    type: String,
    default: '',
  },
  actionItems: {
    type: Array,
    default: () => [],
  },
  getDownloadUrl: {
    type: Function,
    default: null,
  },
  getDownloadFileName: {
    type: Function,
    default: null,
  },
  layout: {
    type: String,
    default: 'list',
    validator: (val) => ['list', 'grid'].includes(val),
  },
  contentMaxHeight: {
    type: Number,
    default: 500,
  },
});

const emit = defineEmits([
  'update:modelValue',
  'clear-all',
  'sort',
  'preview',
  'action',
  'item-click',
]);

const listConfig = vueComputed(() => ({
  draggable: props.draggable,
  showActions: props.showActions,
  layout: props.layout,
}));

const previewVisible = ref(false);
const previewFile = ref(null);
const previewFileName = ref('');

const handlePreview = async (file) => {
  if (!props.previewable) return;

  emit('preview', file);

  const url = getFileUrl(file);
  const name = getFileName(file);

  previewFile.value = null;
  previewFileName.value = name;
  previewVisible.value = true;

  try {
    const response = await fetch(url);
    const blob = await response.blob();
    previewFile.value = new File([blob], name, { type: blob.type });
  } catch (error) {
    console.error('Failed to fetch file for preview:', error);
    previewVisible.value = false;
  }
};

const clearAll = () => {
  emit('update:modelValue', []);
  emit('clear-all');
};

const handleSort = (files) => {
  emit('sort', files);
};
</script>

<style lang="less" scoped>
.file-list-card {
  :deep(.card-body){
    padding: 0;
  }
}

.file-list-body {
  max-height: 300px;
  overflow-y: auto;
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

.file-preview-popup {
  display: flex;
  flex-direction: column;

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md) var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);

    .preview-title {
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-primary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 80%;
    }

    .preview-close {
      font-size: 20px;
      color: var(--color-text-secondary);
      cursor: pointer;
    }
  }

  .preview-content {
    flex: 1;
    overflow: hidden;
    position: relative;

    .preview-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: var(--color-text-tertiary);
    }
  }
}
</style>
