<template>
  <div class="path-query-section">
    <div class="section-title">{{ t('tools.jsonFormatter.pathQuery') }}</div>
    <van-field
        :model-value="modelValue"
        :placeholder="t('tools.jsonFormatter.pathPlaceholder')"
        class="path-input"
        @update:model-value="$emit('update:modelValue', $event)"
      >
      <template #button>
        <van-button size="small" type="primary" @click="$emit('query')">
          {{ t('tools.jsonFormatter.query') }}
        </van-button>
      </template>
    </van-field>
    <div v-if="queryResult" class="query-result">
      <pre>{{ queryResult }}</pre>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Field as VanField, Button as VanButton } from 'vant';

const { t } = useI18n();

defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  queryResult: {
    type: String,
    default: '',
  },
});

defineEmits(['update:modelValue', 'query']);
</script>

<style lang="less" scoped>
.path-query-section {
  margin-bottom: var(--spacing-lg);

  .section-title {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--spacing-sm);
    color: var(--color-text-secondary);
  }

  .path-input {
    background: var(--color-bg-secondary);
    border-radius: var(--radius-md);
  }

  .query-result {
    margin-top: var(--spacing-sm);
    padding: var(--spacing-md);
    background: var(--color-bg-secondary);
    border-radius: var(--radius-md);
    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
    font-size: var(--font-size-sm);
    overflow-x: auto;

    pre {
      margin: 0;
      white-space: pre-wrap;
      word-break: break-all;
    }
  }
}
</style>