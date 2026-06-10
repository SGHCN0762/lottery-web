<template>
  <div class="toolbar">
      <van-button size="small" plain @click="$emit('format')">
        {{ t('tools.jsonFormatter.format') }}
      </van-button>
      <van-button size="small" plain @click="$emit('compress')">
        {{ t('tools.jsonFormatter.compress') }}
      </van-button>
      <van-button type="danger" plain size="small" @click="$emit('clear')">
        {{ t('tools.jsonFormatter.clear') }}
      </van-button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Button as VanButton } from 'vant';

const { t } = useI18n();

defineEmits(['format', 'compress', 'clear']);
</script>

<style lang="less" scoped>
.toolbar {
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: center;

  :deep(.van-button) {
    margin-right: var(--spacing-xs);
  }
}
</style>