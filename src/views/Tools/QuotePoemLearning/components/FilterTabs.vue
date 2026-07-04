<template>
  <div class="filter-container">
    <div class="filter-section">
      <div class="filter-label">类型</div>
      <div class="filter-tabs">
        <div
          v-for="(category, key) in typeCategories"
          :key="key"
          class="filter-tab"
          :class="{ active: activeType === key }"
          @click="$emit('update:activeType', key)"
        >
          <span class="tab-icon" v-if="category.icon">{{ category.icon }}</span>
          <span class="tab-name">{{ category.name }}</span>
        </div>
      </div>
    </div>
    <div class="filter-section">
      <div class="filter-label">阶段</div>
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
  activeType: {
    type: String,
    default: 'all',
  },
  activeStage: {
    type: String,
    default: 'all',
  },
});

defineEmits(['update:activeType', 'update:activeStage']);

const typeCategories = {
  all: { name: '全部', icon: '📚' },
  quote: { name: '名言', icon: '💬' },
  poem: { name: '诗词', icon: '📜' },
  essay: { name: '文言', icon: '📖' },
};

const stageCategories = {
  all: { name: '全部阶段', icon: '🎯' },
  primary: { name: '小学', icon: '👶' },
  middle: { name: '初中', icon: '🧑' },
  high: { name: '高中', icon: '👨' },
  civil: { name: '公考', icon: '💼' },
};
</script>

<style lang="less" scoped>
.filter-container {
  background: var(--color-bg-secondary);
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
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
