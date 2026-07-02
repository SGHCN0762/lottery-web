<template>
  <div class="idiom-card" @click="$emit('click', idiom)">
    <div class="card-header">
      <span class="idiom-word">{{ idiom.word }}</span>
      <span class="idiom-pinyin">{{ idiom.pinyin }}</span>
    </div>
    <div class="card-body">
      <p class="idiom-meaning">{{ idiom.meaning }}</p>
    </div>
    <div class="card-footer">
      <div class="tags-wrapper">
        <span v-for="tag in displayTags" :key="tag.key" class="tag" :class="tag.key">
          {{ tag.name }}
        </span>
        <span class="difficulty-badge" :class="idiom.difficulty">
          {{ difficultyText }}
        </span>
      </div>
      <div class="status-icons">
        <span v-if="isMastered" class="status-icon mastered" title="已掌握">✓</span>
        <span v-else-if="isLearned" class="status-icon learned" title="已学习">○</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  idiom: {
    type: Object,
    required: true,
  },
  isLearned: {
    type: Boolean,
    default: false,
  },
  isMastered: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['click']);

const tagConfig = {
  primary: { name: '小学' },
  middle: { name: '初中' },
  high: { name: '高中' },
  civil: { name: '公考' }
};

const displayTags = computed(() => {
  const tags = props.idiom.tags || [];
  return tags.map(tag => ({
    key: tag,
    ...tagConfig[tag]
  })).filter(t => t.name);
});

const difficultyText = computed(() => {
  const map = {
    easy: '简单',
    medium: '中等',
    hard: '困难',
  };
  return map[props.idiom.difficulty] || '未知';
});
</script>

<style lang="less" scoped>
.idiom-card {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  border: 1px solid var(--color-border);
  transition: all var(--transition-base);
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary);
  }

  &:active {
    transform: translateY(0);
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-sm);
}

.idiom-word {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.idiom-pinyin {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-style: italic;
}

.card-body {
  margin-bottom: var(--spacing-sm);
}

.idiom-meaning {
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
  justify-content: space-between;
  align-items: center;
}

.tags-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tag {
  font-size: var(--font-size-xs);
  padding: 2px var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-weight: var(--font-weight-medium);

  &.primary {
    background: rgba(7, 194, 144, 0.1);
    color: var(--color-success);
  }

  &.middle {
    background: rgba(25, 137, 250, 0.1);
    color: var(--color-primary);
  }

  &.high {
    background: rgba(255, 167, 38, 0.1);
    color: var(--color-warning);
  }

  &.civil {
    background: rgba(255, 87, 87, 0.1);
    color: var(--color-danger);
  }
}

.difficulty-badge {
  font-size: var(--font-size-xs);
  padding: 2px var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-weight: var(--font-weight-medium);

  &.easy {
    background: rgba(7, 194, 144, 0.1);
    color: var(--color-success);
  }

  &.medium {
    background: rgba(255, 167, 38, 0.1);
    color: var(--color-warning);
  }

  &.hard {
    background: rgba(255, 87, 87, 0.1);
    color: var(--color-danger);
  }
}

.status-icons {
  display: flex;
  gap: var(--spacing-xs);
}

.status-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xs);
  font-weight: bold;

  &.mastered {
    background: var(--color-success);
    color: #fff;
  }

  &.learned {
    background: rgba(25, 137, 250, 0.1);
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
  }
}
</style>
