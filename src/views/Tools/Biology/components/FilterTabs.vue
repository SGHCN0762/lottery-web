<template>
  <div class="filter-tabs">
    <div
      v-for="(stage, key) in stages"
      :key="key"
      class="tab"
      :class="{ active: activeStage === key }"
      @click="$emit('update:activeStage', key)"
    >
      <span class="tab-icon">{{ stage.icon }}</span>
      <span class="tab-text">{{ stageName(key) }}</span>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

defineProps({
  activeStage: {
    type: String,
    default: 'all'
  },
  stages: {
    type: Object,
    required: true
  }
});

defineEmits(['update:activeStage']);

const { t } = useI18n();

const stageName = (key) => {
  const names = {
    all: t('tools.biology.stages.all'),
    middle: t('tools.biology.stages.middle'),
    high: t('tools.biology.stages.high')
  };
  return names[key] || '';
};
</script>

<style lang="less" scoped>
.filter-tabs {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px var(--spacing-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  background: rgba(var(--color-primary-rgb), 0.05);
  border: 1px solid rgba(var(--color-primary-rgb), 0.1);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);

  &:hover {
    background: rgba(var(--color-primary-rgb), 0.1);
  }

  &.active {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: #ffffff;

    .tab-icon {
      filter: brightness(0) invert(1);
    }
  }
}

.tab-icon {
  font-size: var(--font-size-sm);
}

.tab-text {
  white-space: nowrap;
}
</style>