<template>
  <div class="item-card" @click="$emit('click')">
    <div class="card-header">
      <span v-if="mastered" class="mastered-icon">✓</span>
    </div>
    <div class="card-title-row">
      <h3 class="card-title">{{ item.title }}</h3>
      <span class="stage-tag" :class="item.stage">
        {{ getStageLabel(item.stage) }}
      </span>
    </div>
    <p class="card-chapter">{{ item.chapter }}</p>
    <div v-if="item.tags && item.tags.length > 0" class="card-tags">
      <span v-for="tag in item.tags.slice(0, 3)" :key="tag" class="tag">{{ tag }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  },
  mastered: {
    type: Boolean,
    default: false
  }
});

defineEmits(['click']);

const getStageLabel = (stage) => {
  const stageLabels = {
    middle: '初中',
    high: '高中',
    junior: '基础篇',
    senior: '进阶篇',
    primary: '小学',
    civil: '公务员',
    revolution: '革命时期',
    construction: '建设时期',
    reform: '改革开放',
    new_era: '新时代'
  };
  return stageLabels[stage] || stage;
};
</script>

<style lang="less" scoped>
.item-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  cursor: pointer;
  transition: all var(--transition-base);

  &:hover {
    border-color: rgba(var(--color-primary-rgb), 0.3);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: var(--spacing-xs);
}

.stage-tag {
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  flex-shrink: 0;

  &.middle {
    background: rgba(var(--color-primary-rgb), 0.1);
    color: var(--color-primary);
  }

  &.high {
    background: rgba(var(--color-warning-rgb), 0.1);
    color: var(--color-warning);
  }
}

.mastered-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-success);
  color: #ffffff;
  border-radius: 50%;
  font-size: 12px;
}

.card-title-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.card-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-chapter {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  margin: 0 0 var(--spacing-sm);
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tag {
  padding: 2px 6px;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-sm);
  font-size: 10px;
  color: var(--color-text-secondary);
}
</style>