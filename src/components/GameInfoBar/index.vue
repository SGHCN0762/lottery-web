<template>
  <section class="game-info-bar">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="info-item"
    >
      <span class="info-label">{{ item.label }}</span>
      <span class="info-value" :class="item.valueClass">{{ item.value }}</span>
    </div>
  </section>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>

<style lang="less" scoped>
.game-info-bar {
  display: flex;
  justify-content: space-around;
  background: var(--color-bg-secondary);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-lg);
  box-shadow: var(--shadow-sm);

  .info-item {
    text-align: center;

    .info-label {
      display: block;
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
      margin-bottom: var(--spacing-xs);
    }

    .info-value {
      display: block;
      font-size: var(--font-size-xl);
      color: var(--color-primary);
      font-weight: var(--font-weight-bold);

      &.cost {
        color: var(--color-warning);
      }

      &.streak {
        color: var(--color-warning);
      }
    }
  }
}
</style>
