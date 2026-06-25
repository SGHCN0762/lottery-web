<template>
  <div class="list-header">
    <div class="header-left">
      <van-icon :name="icon" class="header-icon" />
      <span class="header-title">{{ title }}</span>
      <span v-if="count !== undefined" class="header-count">{{ count }}</span>
    </div>
    <div v-if="$slots.actions" class="header-actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
import { Icon as VanIcon } from 'vant';

defineProps({
  icon: {
    type: String,
    default: 'photo-o',
  },
  title: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: undefined,
  },
});
</script>

<style lang="less" scoped>
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);

  .header-left {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);

    .header-icon {
      font-size: 18px;
      color: var(--color-primary);
    }

    .header-title {
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-primary);
    }

    .header-count {
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
      background: var(--color-bg-tertiary);
      padding: 2px 8px;
      border-radius: var(--radius-sm);
    }
  }

  .header-actions {
    display: flex;
    gap: var(--spacing-sm);

    :deep(.van-button) {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
}
</style>
