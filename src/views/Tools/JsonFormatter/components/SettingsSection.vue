<template>
  <div class="settings-section">
    <van-cell-group inset>
      <van-cell :title="t('tools.jsonFormatter.indent')">
        <van-stepper :model-value="indent" min="1" max="8" @update:model-value="$emit('update:indent', $event)" />
      </van-cell>
      <van-cell :title="t('tools.jsonFormatter.sortKeys')">
        <van-switch :model-value="sortKeys" size="20" @update:model-value="$emit('update:sortKeys', $event)" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import {
  Cell as VanCell,
  CellGroup as VanCellGroup,
  Stepper as VanStepper,
  Switch as VanSwitch,
} from 'vant';

const { t } = useI18n();

defineProps({
  indent: {
    type: Number,
    default: 2,
  },
  sortKeys: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['update:indent', 'update:sortKeys']);
</script>

<style lang="less" scoped>
.settings-section {
  margin-bottom: var(--spacing-lg);

  :deep(.van-cell) {
    background: var(--color-bg-secondary);
  }
}
</style>