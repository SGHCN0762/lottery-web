<template>
  <header class="page-header">
    <h1 class="header-title">🎪 {{ title }}</h1>
    <p class="header-subtitle">{{ subtitle }}</p>
  </header>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  }
})
</script>

<style lang="less" scoped>
.page-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);

  .header-title {
    font-size: var(--font-size-xl);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-sm);
    font-weight: var(--font-weight-bold);
  }

  .header-subtitle {
    color: var(--color-text-secondary);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-normal);
  }
}
</style>
