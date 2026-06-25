<template>
  <div class="settings-card">
    <ListHeader :title="t('tools.fileConverter.common.settings')" />
    <div class="settings-content">
      <div class="setting-item">
        <span class="setting-label">{{ t('tools.fileConverter.imageStitch.direction') }}</span>
        <van-radio-group v-model="directionModel" direction="horizontal">
          <van-radio name="horizontal">{{ t('tools.fileConverter.imageStitch.horizontal') }}</van-radio>
          <van-radio name="vertical">{{ t('tools.fileConverter.imageStitch.vertical') }}</van-radio>
        </van-radio-group>
      </div>
      <div class="setting-item">
        <span class="setting-label">{{ t('tools.fileConverter.imageStitch.spacing') }}</span>
        <van-slider
          v-model="spacingModel"
          :min="0"
          :max="50"
          :step="5"
          active-color="#1989fa"
        />
        <span class="slider-value">{{ spacingModel }}px</span>
      </div>
      <div class="setting-item">
        <span class="setting-label">{{ t('tools.fileConverter.imageStitch.bgColor') }}</span>
        <div class="color-picker">
          <input type="color" v-model="bgColorModel" />
          <span class="color-value">{{ bgColorModel }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { RadioGroup as VanRadioGroup, Radio as VanRadio, Slider as VanSlider } from 'vant';
import ListHeader from './ListHeader.vue';

const props = defineProps({
  direction: {
    type: String,
    default: 'horizontal',
  },
  spacing: {
    type: Number,
    default: 0,
  },
  backgroundColor: {
    type: String,
    default: '#ffffff',
  },
});

const emit = defineEmits(['update:direction', 'update:spacing', 'update:backgroundColor']);

const { t } = useI18n();

const directionModel = computed({
  get: () => props.direction,
  set: (val) => emit('update:direction', val),
});

const spacingModel = computed({
  get: () => props.spacing,
  set: (val) => emit('update:spacing', val),
});

const bgColorModel = computed({
  get: () => props.backgroundColor,
  set: (val) => emit('update:backgroundColor', val),
});

import { computed } from 'vue';
</script>

<style lang="less" scoped>
.settings-card {
  margin-top: 16px;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.settings-content {
  padding: 12px 16px 16px;
}

.setting-item {
  display: flex;
  align-items: center;
  padding: 8px 0;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-border);
  }
}

.setting-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  flex-shrink: 0;
  min-width: 80px;
}

:deep(.van-radio-group) {
  margin-left: auto;
}

:deep(.van-radio) {
  font-size: var(--font-size-sm);
}

:deep(.van-slider) {
  flex: 1;
  margin: 0 12px;
}

.slider-value {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  min-width: 40px;
  text-align: right;
}

.color-picker {
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 8px;

  input[type="color"] {
    width: 32px;
    height: 32px;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    padding: 0;
  }

  .color-value {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }
}
</style>
