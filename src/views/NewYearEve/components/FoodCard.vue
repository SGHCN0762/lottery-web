<template>
  <div class="food-card">
    <div class="food-image">{{ icon }}</div>
    <div class="food-content">
      <h3>{{ name }}</h3>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});
</script>

<style lang="less" scoped>
.food-card {
  flex: 1 1 calc(50% - var(--spacing-md));
  min-width: 150px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }

  .food-image {
    font-size: 36px;
    margin-right: var(--spacing-md);
    background: rgba(255, 255, 255, 0.1);
    width: 64px;
    height: 64px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .food-content {
    flex: 1;

    h3 {
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-semibold);
      margin: 0 0 var(--spacing-xs) 0;
    }

    p {
      font-size: var(--font-size-sm);
      opacity: 0.9;
      margin: 0;
      line-height: var(--line-height-base);
    }
  }
}
</style>
