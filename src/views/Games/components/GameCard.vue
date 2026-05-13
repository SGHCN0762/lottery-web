<template>
  <div 
    class="game-card"
    @click="$emit('select', gameType)"
    role="button"
    tabindex="0"
    :aria-label="`选择${gameType.name}`"
  >
    <div class="card-icon">{{ gameType.icon }}</div>
    <h3 class="card-title">{{ gameType.name }}</h3>
    <p class="card-description">{{ gameType.description }}</p>
    <div class="reward-info">{{ rewardLabel }}: {{ gameType.reward }}</div>
  </div>
</template>

<script setup>
defineProps({
  gameType: {
    type: Object,
    required: true
  },
  rewardLabel: {
    type: String,
    default: '奖励'
  }
})

defineEmits(['select'])
</script>

<style lang="less" scoped>
.game-card {
  background: var(--color-bg-secondary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  text-align: center;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary);
  }

  &:active {
    transform: translateY(0);
  }

  .card-icon {
    font-size: 2rem;
    margin-bottom: var(--spacing-sm);
  }

  .card-title {
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-xs);
    font-weight: var(--font-weight-semibold);
  }

  .card-description {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-sm);
    line-height: var(--line-height-base);
  }

  .reward-info {
    font-size: var(--font-size-sm);
    color: var(--color-success);
    font-weight: var(--font-weight-semibold);
  }
}
</style>
