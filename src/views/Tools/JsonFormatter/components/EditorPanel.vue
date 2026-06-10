<template>
  <div class="editor-panel">
    <div class="panel-header">
      <span>{{ title }}</span>
      <div class="panel-actions">
        <slot name="actions"></slot>
      </div>
    </div>
    <div class="editor-wrapper">
      <textarea
          :value="modelValue"
          :placeholder="placeholder"
          class="json-textarea"
          :class="{ 'has-error': hasError }"
          spellcheck="false"
          :readonly="readonly"
          @input="$emit('update:modelValue', $event.target.value)"
        ></textarea>
    </div>
    <div v-if="modelValue" class="panel-footer">
      <span>{{ t('tools.jsonFormatter.chars') }}: {{ modelValue.length }}</span>
      <span>{{ t('tools.jsonFormatter.lines') }}: {{ lineCount }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  hasError: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['update:modelValue']);

const lineCount = computed(() => {
  return props.modelValue ? props.modelValue.split('\n').length : 0;
});
</script>

<style lang="less" scoped>
.editor-panel {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md);
    background: var(--color-bg-tertiary);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);

    .panel-actions {
      display: flex;
      gap: var(--spacing-xs);
    }
  }

  .editor-wrapper {
    padding: var(--spacing-md);
  }

  .json-textarea {
    width: 100%;
    min-height: 200px;
    padding: var(--spacing-md);
    background: var(--color-bg-primary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
    font-size: var(--font-size-sm);
    line-height: 1.5;
    resize: vertical;
    color: var(--color-text-primary);
    transition: border-color var(--transition-fast);

    &::placeholder {
      color: var(--color-text-placeholder);
    }

    &:focus {
      outline: none;
      border-color: var(--color-primary);
    }

    &.has-error {
      border-color: var(--color-danger);
    }
  }

  .panel-footer {
    display: flex;
    gap: var(--spacing-md);
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    border-top: 1px solid var(--color-border);
  }
}
</style>