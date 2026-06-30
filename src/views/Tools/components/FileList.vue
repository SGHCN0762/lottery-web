<template>
  <div
    class="file-list-scroll"
    :class="{ 'is-draggable': config.draggable, 'is-grid': config.layout === 'grid' }"
  >
    <VueDraggable
      v-if="config.draggable"
      v-model="localFiles"
      item-key="id"
      :animation="200"
      ghost-class="file-ghost"
      drag-class="file-drag"
      handle=".drag-handle"
      @end="onDragEnd"
    >
      <template #item="{ element }">
        <File
          :file="element"
          :config="config"
          @click="$emit('item-click', element)"
          @preview="$emit('preview', element)"
          @action="showActionSheet(element)"
        >
          <template #itemPrefix="{ file }">
            <slot name="itemPrefix" :file="file" />
          </template>
          <template #itemMeta="{ file }">
            <slot name="itemMeta" :file="file" />
          </template>
        </File>
      </template>
    </VueDraggable>

    <div v-else class="file-list-inner">
      <File
        v-for="file in modelValue"
        :key="file.id || file.name"
        :file="file"
        :config="config"
        @click="$emit('item-click', file)"
        @preview="$emit('preview', file)"
        @action="showActionSheet(file)"
      >
        <template #itemPrefix="{ file }">
          <slot name="itemPrefix" :file="file" />
        </template>
        <template #itemMeta="{ file }">
          <slot name="itemMeta" :file="file" />
        </template>
      </File>
    </div>
  </div>

  <van-action-sheet
    v-model:show="actionSheetVisible"
    :actions="computedActions"
    :cancel-text="cancelText"
    @select="handleActionSelect"
    close-on-click-modal
    close-on-click-action
  />
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ActionSheet as VanActionSheet } from 'vant';
import VueDraggable from 'vuedraggable';
import File from './File.vue';
import { getFileName, getFileUrl } from '../utils';

const { t } = useI18n();

const cancelText = t('common.cancel');
const downloadText = t('tools.fileConverter.common.download');
const previewBtnText = t('tools.fileConverter.common.preview');
const removeText = t('tools.fileConverter.common.remove');

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  config: {
    type: Object,
    default: () => ({
      draggable: false,
      showActions: true,
      layout: 'list',
      showFileSize: true,
      fileNameWrap: false,
      showRemove: true,
    }),
  },
  actionItems: {
    type: [Array, Function],
    default: () => [],
  },
  previewable: {
    type: Boolean,
    default: true,
  },
  getDownloadUrl: {
    type: Function,
    default: null,
  },
  getDownloadFileName: {
    type: Function,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue', 'sort', 'preview', 'action', 'item-click']);

const localFiles = ref([...props.modelValue]);
const actionSheetVisible = ref(false);
const currentFile = ref(null);

const defaultActions = computed(() => [
  { name: downloadText, key: 'download' },
  { name: previewBtnText, key: 'preview' },
  { name: removeText, key: 'remove', color: '#ee0a24' },
]);

const computedActions = computed(() => {
  if (typeof props.actionItems === 'function' && currentFile.value) {
    return props.actionItems(currentFile.value);
  }
  if (Array.isArray(props.actionItems) && props.actionItems.length > 0) {
    return props.actionItems;
  }
  let actions = [...defaultActions.value];
  if (!props.previewable) {
    actions = actions.filter(a => a.key !== 'preview');
  }
  if (!props.config.showRemove) {
    actions = actions.filter(a => a.key !== 'remove');
  }
  return actions;
});

watch(() => props.modelValue.length, (newLen) => {
  if (newLen !== localFiles.value.length) {
    localFiles.value = [...props.modelValue];
  }
});

const onDragEnd = () => {
  emit('update:modelValue', [...localFiles.value]);
  emit('sort', [...localFiles.value]);
};

const showActionSheet = (file) => {
  currentFile.value = file;
  actionSheetVisible.value = true;
};

const handleActionSelect = (action) => {
  if (!currentFile.value) return;

  const key = action.key || action.name;

  if (key === 'remove') {
    removeFile(currentFile.value);
  } else if (key === 'download' && props.actionItems.length === 0) {
    const url = props.getDownloadUrl
      ? props.getDownloadUrl(currentFile.value)
      : getFileUrl(currentFile.value);
    const name = props.getDownloadFileName
      ? props.getDownloadFileName(currentFile.value)
      : getFileName(currentFile.value);
    downloadFile(url, name);
  } else if (key === 'preview' && props.actionItems.length === 0) {
    emit('preview', currentFile.value);
  } else {
    emit('action', { key, file: currentFile.value });
  }
};

const removeFile = (file) => {
  const index = props.modelValue.findIndex(f => f.id === file.id || f.name === file.name);
  if (index > -1) {
    const newList = [...props.modelValue];
    newList.splice(index, 1);
    emit('update:modelValue', newList);
  }
};

const downloadFile = (url, filename) => {
  if (!url) return;
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'download';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

defineExpose({
  remove: removeFile,
  removeAt(index) {
    const newList = [...props.modelValue];
    newList.splice(index, 1);
    emit('update:modelValue', newList);
  },
  clear() {
    emit('update:modelValue', []);
  },
  add(file) {
    emit('update:modelValue', [...props.modelValue, file]);
  },
});
</script>

<style lang="less" scoped>
.file-list-scroll {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  :deep(.file-item) {
    &:last-child {
      border-bottom: none;
    }
  }
}

.file-ghost {
  opacity: 0.5;
  background: var(--color-primary-light);
}

.file-drag {
  transform: rotate(2deg);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
</style>
