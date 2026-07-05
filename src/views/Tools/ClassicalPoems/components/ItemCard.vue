<template>
  <div class="item-card" :class="{ mastered }" @click="$emit('click')">
    <div class="card-header">
      <span class="type-icon">📜</span>
      <div class="card-title-group">
        <h3 class="card-title">{{ item.title }}</h3>
        <p class="card-subtitle">
          <span class="dynasty">{{ item.dynasty }}</span>
          <span class="author">· {{ item.author }}</span>
        </p>
      </div>
      <span v-if="mastered" class="mastered-badge">✓</span>
    </div>
    <div class="card-preview">
      <p class="preview-text">{{ truncateContent(item.content, 50) }}</p>
    </div>
    <div class="card-footer">
      <div class="tags-row">
        <span 
          v-for="(tag, index) in displayTags" 
          :key="index"
          class="tag-chip"
        >
          {{ tag }}
        </span>
      </div>
      <span class="stage-label">{{ stageLabels[item.stage] }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

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

const displayTags = computed(() => {
  const tags = props.item.tags || [];
  return tags.slice(0, 3);
});

const truncateContent = (content, maxLength) => {
  if (!content) return '';
  const cleanContent = content.replace(/\n/g, '');
  if (cleanContent.length <= maxLength) return cleanContent;
  return cleanContent.slice(0, maxLength) + '...';
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

.card-title-group {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-subtitle {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

.dynasty {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
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

.card-preview {
  margin-bottom: var(--spacing-sm);
}

.preview-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-base);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.tag-chip {
  font-size: 10px;
  padding: 2px 6px;
  background: var(--van-blue-50);
  color: var(--van-blue-600);
  border-radius: var(--radius-sm);
  flex-shrink: 0;
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