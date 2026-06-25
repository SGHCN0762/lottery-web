<template>
  <div class="upload-section">
    <label class="upload-area">
      <input
        type="file"
        :multiple="multiple"
        :accept="accept"
        class="upload-input"
        @change="handleFileChange"
      />
      <div class="upload-icon">
        <img :src="actualIcon" alt="UPLOAD" />
      </div>
      <p class="upload-title">{{ uploadTip || t('tools.common.clickToUpload') }}</p>
      <p v-if="hint" class="upload-hint">{{ hint }}</p>
    </label>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import imageIcon from '@/views/Tools/assets/image.svg';
import pdfIcon from '@/views/Tools/assets/pdf.svg';
import fileIcon from '@/views/Tools/assets/file.svg';

const { t } = useI18n();

const ICON_MAP = {
  image: imageIcon,
  pdf: pdfIcon,
  file: fileIcon,
};

const props = defineProps({
  accept: {
    type: String,
    default: '*',
  },
  multiple: {
    type: Boolean,
    default: true,
  },
  iconType: {
    type: String,
    default: 'file',
    validator: (val) => ['image', 'pdf', 'file'].includes(val),
  },
  icon: {
    type: String,
    default: null,
  },
  uploadTip: {
    type: String,
    default: '',
  },
  hint: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['change']);

const actualIcon = computed(() => {
  if (props.icon) return props.icon;
  return ICON_MAP[props.iconType] || fileIcon;
});

const handleFileChange = (event) => {
  const files = Array.from(event.target.files || []);
  if (files.length > 0) {
    emit('change', files.map(file => ({ file })));
  }
  event.target.value = '';
};

import { computed } from 'vue';
</script>

<style lang="less" scoped>
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

    .upload-hint {
      font-size: var(--font-size-xs);
      color: var(--color-text-tertiary);
      margin: 0;
    }
  }
}
</style>