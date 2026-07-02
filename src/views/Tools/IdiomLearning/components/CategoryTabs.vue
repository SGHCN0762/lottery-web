<template>
  <div class="category-tabs">
    <div class="tabs-scroll">
      <div
        v-for="(category, key) in allCategories"
        :key="key"
        class="tab-item"
        :class="{ active: modelValue === key }"
        @click="$emit('update:modelValue', key)"
      >
        <span class="tab-icon">{{ category.icon }}</span>
        <span class="tab-name">{{ category.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: 'all',
  },
  categories: {
    type: Object,
    default: () => ({}),
  },
});

defineEmits(['update:modelValue']);

const allCategories = computed(() => ({
  all: { name: '全部', icon: '📚', description: '所有成语' },
  ...props.categories,
}));
</script>

<style lang="less" scoped>
.category-tabs {
  background: var(--color-bg-secondary);
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--color-border);
}

.tabs-scroll {
  display: flex;
  overflow-x: auto;
  padding: 0 var(--spacing-md);
  gap: var(--spacing-sm);
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.tab-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-bg-primary);
  border-radius: var(--radius-lg);
  border: 1px solid transparent;
  white-space: nowrap;
  transition: all var(--transition-base);
  cursor: pointer;

  &.active {
    background: var(--color-primary);
    border-color: var(--color-primary);

    .tab-name {
      color: #fff;
    }
  }

  &:hover {
    border-color: var(--color-primary);
  }

  .tab-icon {
    font-size: var(--font-size-lg);
  }

  .tab-name {
    font-size: var(--font-size-sm);
    color: var(--color-text-primary);
    font-weight: var(--font-weight-medium);
  }
}
</style>
