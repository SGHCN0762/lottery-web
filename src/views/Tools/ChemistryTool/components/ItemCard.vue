<template>
  <div class="item-card" :class="{ mastered: mastered }" @click="$emit('click')">
    <div class="card-header">
      <div class="title-row">
        <span class="item-title">{{ item.title }}</span>
        <van-icon v-if="mastered" name="check-circle" class="mastered-icon" />
      </div>
      <div class="stage-tag" :class="item.stage">
        <span class="stage-icon">{{ stageIcon }}</span>
        <span class="stage-text">{{ stageText }}</span>
      </div>
    </div>

    <p class="item-summary">{{ item.summary }}</p>

    <div class="card-footer">
      <div class="chapter-badge">
        <span class="chapter-icon">📚</span>
        <span class="chapter-name">{{ item.chapter }}</span>
      </div>
      <div class="tags-wrap">
        <span class="tag" v-for="tag in item.tags.slice(0, 2)" :key="tag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Icon as VanIcon } from 'vant';

const props = defineProps({
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

const { t } = useI18n();

const stageIcon = computed(() => {
  const icons = {
    middle: '🏫',
    high: '🎓'
  };
  return icons[props.item.stage] || '📚';
});

const stageText = computed(() => {
  const texts = {
    middle: t('tools.chemistryTool.stages.middle'),
    high: t('tools.chemistryTool.stages.high')
  };
  return texts[props.item.stage] || '';
});
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
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: rgba(var(--color-primary-rgb), 0.3);
  }

  &.mastered {
    border-color: rgba(var(--color-success-rgb), 0.3);
    background: rgba(var(--color-success-rgb), 0.03);
  }
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
}

.title-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex: 1;
}

.item-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.mastered-icon {
  color: var(--color-success);
  font-size: var(--font-size-base);
}

.stage-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);

  &.middle {
    background: rgba(var(--color-primary-rgb), 0.1);
    color: var(--color-primary);
    border: 1px solid rgba(var(--color-primary-rgb), 0.15);
  }

  &.high {
    background: rgba(var(--color-warning-rgb), 0.1);
    color: var(--color-warning);
    border: 1px solid rgba(var(--color-warning-rgb), 0.15);
  }
}

.stage-icon {
  font-size: var(--font-size-xs);
}

.stage-text {
  font-weight: var(--font-weight-medium);
}

.item-summary {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-sm);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chapter-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.chapter-icon {
  font-size: var(--font-size-xs);
}

.tags-wrap {
  display: flex;
  gap: 6px;
}

.tag {
  padding: 2px 8px;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}
</style>
