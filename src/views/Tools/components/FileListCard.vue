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

  <FilePreview
    v-model:visible="previewVisible"
    :file-name="previewFileName"
    :file-url="previewFileUrl"
  />
</template>

<script setup>
import { ref, computed as vueComputed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Button as VanButton } from 'vant';
import ToolCard from './ToolCard.vue';
import FileList from './FileList.vue';
import FilePreview from './FilePreview.vue';
import {
  getFileName,
  getFileUrl,
} from '../utils';

const { t } = useI18n();

const clearAllText = t('tools.fileConverter.common.clearAll');

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
  'action',
  'item-click',
]);

const listConfig = vueComputed(() => ({
  draggable: props.draggable,
  showActions: props.showActions,
  layout: props.layout,
}));

const previewVisible = ref(false);
const previewFileName = ref('');
const previewFileUrl = ref('');

const handlePreview = (file) => {
  if (!props.previewable) return;

  const url = getFileUrl(file);
  const name = getFileName(file);

  previewFileName.value = name;
  previewFileUrl.value = url;
  previewVisible.value = true;
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
</style>
