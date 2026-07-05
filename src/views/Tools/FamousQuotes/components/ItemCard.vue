<template>
  <div class="item-card" :class="{ mastered }" @click="$emit('click')">
    <div class="card-header">
      <span class="type-icon">💬</span>
      <div class="card-content-group">
        <p class="content-text">{{ truncateContent(item.content, 40) }}</p>
      </div>
      <span v-if="mastered" class="mastered-badge">✓</span>
    </div>
    <div class="card-footer">
      <div class="author-info">
        <span class="author">{{ item.author }}</span>
        <span class="source">· {{ item.source }}</span>
      </div>
      <span class="stage-label">{{ stageLabels[item.stage] }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  mastered: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['click']);

const stageLabels = {
  primary: '小学',
  middle: '初中',
  high: '高中',
  civil: '公务员',
};

const truncateContent = (content, maxLength) => {
  if (!content) return '';
  if (content.length <= maxLength) return content;
  return content.slice(0, maxLength) + '...';
};
</script>

<style lang="less" scoped>
.item-card {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  cursor: pointer;
  transition: all var(--transition-base);
  border: 1px solid var(--color-border);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary);
  }

  &:active {
    transform: translateY(0);
  }

  &.mastered {
    border-color: var(--color-success);
    background: linear-gradient(135deg, var(--van-green-50), var(--van-emerald-50));
  }
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.type-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.card-content-group {
  flex: 1;
  min-width: 0;
}

.content-text {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin: 0;
  line-height: var(--line-height-base);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.mastered-badge {
  width: 20px;
  height: 20px;
  background: var(--color-success);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xs);
  font-weight: bold;
  flex-shrink: 0;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
}

.author-info {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.author {
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.source {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stage-label {
  font-size: 10px;
  padding: 2px 6px;
  background: var(--color-bg-tertiary);
  color: var(--color-text-tertiary);
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}
</style>