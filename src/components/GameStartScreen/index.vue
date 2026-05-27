<template>
  <div class="game-start-screen">
    <div class="start-icon">{{ icon }}</div>
    <h2 class="start-title">{{ title }}</h2>
    <p class="start-desc">{{ description }}</p>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: '🎮'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
})
</script>

<style lang="less" scoped>
.game-start-screen {
  text-align: center;
  padding: var(--spacing-3xl) var(--spacing-lg);
  animation: fadeIn 0.5s ease-in;

  .start-icon {
    font-size: 4rem;
    margin-bottom: var(--spacing-lg);
    animation: bounceIn 0.6s ease-out;
  }

  .start-title {
    font-size: var(--font-size-2xl);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-sm);
    font-weight: var(--font-weight-bold);
  }

  .start-desc {
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-2xl);
  }
}
</style>
