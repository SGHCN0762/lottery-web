<template>
  <div class="filter-container">
    <div class="filter-section">
      <div class="filter-tabs">
        <div
          v-for="(category, key) in stageCategories"
          :key="key"
          class="filter-tab"
          :class="{ active: activeStage === key }"
          @click="$emit('update:activeStage', key)"
        >
          <span class="tab-icon" v-if="category.icon">{{ category.icon }}</span>
          <span class="tab-name">{{ category.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  activeStage: {
    type: String,
    default: 'all',
  },
});

defineEmits(['update:activeStage']);

const stageCategories = {
  all: { name: '全部', icon: '🎯' },
  primary: { name: '小学', icon: '👶' },
  middle: { name: '初中', icon: '🧑' },
  high: { name: '高中', icon: '👨' },
  civil: { name: '公务员', icon: '💼' },
};
</script>

<style lang="less" scoped>
.filter-container {
  background: var(--color-bg-secondary);
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.filter-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.filter-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  font-weight: var(--font-weight-medium);
}

.filter-tabs {
  display: flex;
  gap: var(--spacing-xs);
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
  background: var(--color-bg-primary);
  border: 1px solid transparent;
  white-space: nowrap;
  transition: all var(--transition-base);
  cursor: pointer;
  font-size: var(--font-size-sm);

  &.active {
    background: var(--van-blue-1);
    border-color: var(--van-blue-2);

    .tab-name {
      color: var(--van-blue-6);
      font-weight: var(--font-weight-semibold);
    }
  }

  &:hover:not(.active) {
    background: var(--color-bg-tertiary);
  }
}

.tab-icon {
  font-size: var(--font-size-sm);
}

.tab-name {
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}
</style>