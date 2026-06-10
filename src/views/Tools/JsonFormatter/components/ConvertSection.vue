<template>
  <div class="convert-section">
    <div class="section-title">{{ t('tools.jsonFormatter.convertTools') }}</div>
    <div class="convert-buttons">
      <van-button size="small" plain @click="$emit('json-to-yaml')">
        JSON → YAML
      </van-button>
      <van-button size="small" plain @click="$emit('yaml-to-json')">
        YAML → JSON
      </van-button>
      <van-button size="small" plain @click="$emit('json-to-xml')">
        JSON → XML
      </van-button>
      <van-button size="small" plain @click="$emit('json-to-csv')">
        JSON → CSV
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Button as VanButton } from 'vant';

const { t } = useI18n();

defineEmits(['json-to-yaml', 'yaml-to-json', 'json-to-xml', 'json-to-csv']);
</script>

<style lang="less" scoped>
.convert-section {
  margin-bottom: var(--spacing-lg);

  .section-title {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--spacing-sm);
    color: var(--color-text-secondary);
  }

  .convert-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }
}
</style>