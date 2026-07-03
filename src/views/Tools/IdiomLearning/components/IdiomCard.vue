<template>
  <div class="idiom-card" :class="idiom.difficulty" @click="$emit('click', idiom)">
    <div class="card-accent"></div>
    <div class="card-inner">
      <div class="card-header">
        <div class="word-group">
          <span class="idiom-word">{{ idiom.word }}</span>
          <span class="idiom-pinyin">{{ idiom.pinyin }}</span>
        </div>
        <div class="status-icons">
          <span v-if="isMastered" class="status-dot mastered" title="已掌握"></span>
          <span v-else-if="isLearned" class="status-dot learned" title="已学习"></span>
        </div>
      </div>
      <div class="card-body">
        <p class="idiom-meaning">{{ idiom.meaning }}</p>
      </div>
      <div class="card-footer">
        <div class="tags-wrapper">
          <span v-for="tag in displayTags" :key="tag.key" class="tag" :class="tag.key">
            {{ tag.name }}
          </span>
        </div>
        <span class="difficulty-badge" :class="idiom.difficulty">
          {{ difficultyText }}
        </span>
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
  position: relative;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    border-color: transparent;
  }

  &:active {
    transform: translateY(0);
  }
}

.card-accent {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;

  .idiom-card.easy & {
    background: var(--color-success);
  }
  .idiom-card.medium & {
    background: var(--color-warning);
  }
  .idiom-card.hard & {
    background: var(--color-danger);
  }
}

.card-inner {
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) calc(var(--spacing-md) + 4px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-sm);
}

.word-group {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.idiom-word {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  letter-spacing: 2px;
}

.idiom-pinyin {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  font-style: italic;
}

.card-body {
  margin-bottom: var(--spacing-sm);
}

.idiom-meaning {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
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
  gap: var(--spacing-sm);
}

.tags-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tag {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  font-weight: var(--font-weight-medium);
  line-height: 1.4;

  &.primary {
    background: var(--van-green-1);
    color: var(--van-green-7);
  }

  &.middle {
    background: var(--van-blue-1);
    color: var(--van-blue-6);
  }

  &.high {
    background: var(--van-orange-1);
    color: var(--van-orange-8);
  }

  &.civil {
    background: var(--van-red-1);
    color: var(--van-red-7);
  }
}

.difficulty-badge {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  font-weight: var(--font-weight-medium);
  line-height: 1.4;
  flex-shrink: 0;

  &.easy {
    background: var(--van-green-1);
    color: var(--van-green-7);
  }

  &.medium {
    background: var(--van-orange-1);
    color: var(--van-orange-8);
  }

  &.hard {
    background: var(--van-red-1);
    color: var(--van-red-7);
  }
}

.status-icons {
  display: flex;
  gap: var(--spacing-xs);
  flex-shrink: 0;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;

  &.mastered {
    background: var(--color-success);
    box-shadow: 0 0 0 3px rgba(7, 194, 144, 0.15);
  }

  &.learned {
    background: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(25, 137, 250, 0.15);
  }
}
</style>
