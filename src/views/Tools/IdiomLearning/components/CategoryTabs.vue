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
        <span class="tab-icon" v-if="category.icon">{{ category.icon }}</span>
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
  padding: var(--spacing-sm) var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.tabs-scroll {
  display: flex;
  overflow-x: auto;
  gap: var(--spacing-xs);
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-full);
  background: transparent;
  border: 1px solid transparent;
  white-space: nowrap;
  transition: all var(--transition-base);
  cursor: pointer;
  position: relative;

  &.active {
    background: var(--van-blue-1);
    border-color: var(--van-blue-2);

    .tab-name {
      color: var(--van-blue-6);
      font-weight: var(--font-weight-semibold);
    }

    .tab-icon {
      filter: none;
    }
  }

  &:hover:not(.active) {
    background: var(--color-bg-primary);

    .tab-name {
      color: var(--color-text-primary);
    }
  }

  .tab-icon {
    font-size: var(--font-size-sm);
    filter: grayscale(0.3);
    transition: filter var(--transition-base);
  }

  .tab-name {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    font-weight: var(--font-weight-medium);
    transition: color var(--transition-base);
  }
}
</style>
