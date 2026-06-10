<template>
  <div class="settings-section">
    <van-cell-group inset>
      <van-cell :title="t('tools.imageCompressor.quality')">
        <van-slider :model-value="quality" :min="10" :max="100" :step="5" @update:model-value="updateQuality">
          <template #button>
            <div class="quality-badge">{{ quality }}%</div>
          </template>
        </van-slider>
      </van-cell>
      <van-cell :title="t('tools.imageCompressor.maxWidth')">
        <van-stepper :model-value="maxWidth" min="100" max="4000" step="100" @update:model-value="updateMaxWidth" />
      </van-cell>
      <van-cell :title="t('tools.imageCompressor.format')">
        <template #right-icon>
          <van-dropdown-menu>
            <van-dropdown-item :model-value="format" :options="formatOptions" @update:model-value="updateFormat" />
          </van-dropdown-menu>
        </template>
      </van-cell>
      <van-cell :title="t('tools.imageCompressor.keepExif')">
        <van-switch :model-value="keepExif" size="20" @update:model-value="updateKeepExif" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import {
  Cell as VanCell,
  CellGroup as VanCellGroup,
  Slider as VanSlider,
  Stepper as VanStepper,
  DropdownMenu as VanDropdownMenu,
  DropdownItem as VanDropdownItem,
  Switch as VanSwitch,
} from 'vant';

const { t } = useI18n();

const props = defineProps({
  quality: {
    type: Number,
    default: 80,
  },
  maxWidth: {
    type: Number,
    default: 1920,
  },
  format: {
    type: String,
    default: 'original',
  },
  keepExif: {
    type: Boolean,
    default: false,
  },
  formatOptions: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:quality', 'update:maxWidth', 'update:format', 'update:keepExif']);

const updateQuality = (val) => emit('update:quality', val);
const updateMaxWidth = (val) => emit('update:maxWidth', val);
const updateFormat = (val) => emit('update:format', val);
const updateKeepExif = (val) => emit('update:keepExif', val);
</script>

<style lang="less" scoped>
.settings-section {
  margin-bottom: var(--spacing-md);

  :deep(.van-cell) {
    background: var(--color-bg-secondary);
    padding: var(--spacing-md);
  }

  .quality-badge {
    background: var(--color-primary);
    color: white;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
  }
}
</style>