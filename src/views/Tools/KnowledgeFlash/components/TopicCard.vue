<template>
  <div class="topic-card" @click="$emit('click', topic)">
    <div class="topic-header">
      <span class="topic-name">{{ topic.name }}</span>
      <van-icon name="arrow" class="arrow-icon" />
    </div>
    <p class="topic-desc">{{ topic.description }}</p>
    <div class="topic-tags">
      <span v-if="topic.keyPoints?.length" class="tag">{{ topic.keyPoints.length }}要点</span>
      <span v-if="topic.formulas?.length" class="tag">{{ topic.formulas.length }}公式</span>
      <span v-if="topic.examples?.length" class="tag">{{ topic.examples.length }}例题</span>
    </div>
  </div>
</template>

<script setup>
import { Icon as VanIcon } from 'vant';

defineProps({
  topic: {
    type: Object,
    required: true
  }
});

defineEmits(['click']);
</script>

<style lang="less" scoped>
.topic-card {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-md);
  border: 1px solid var(--color-border);

  .topic-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-xs);

    .topic-name {
      font-size: var(--font-size-md);
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .arrow-icon {
      color: var(--color-text-tertiary);
      font-size: 16px;
    }
  }

  .topic-desc {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin: 0 0 var(--spacing-sm);
    line-height: 1.5;
  }

  .topic-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);

    .tag {
      font-size: 11px;
      color: var(--color-primary);
      background: color-mix(in srgb, var(--color-primary) 10%, transparent);
      padding: 2px 8px;
      border-radius: 4px;
    }
  }
}
</style>
