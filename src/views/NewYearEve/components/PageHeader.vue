<template>
  <header class="page-header">
    <h1 class="page-title">{{ title }}</h1>
    <p class="page-subtitle">{{ subtitle }}</p>
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
});
</script>

<style lang="less" scoped>
.page-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);

  .page-title {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    margin: 0 0 var(--spacing-sm) 0;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    letter-spacing: 2px;
  }

  .page-subtitle {
    font-size: var(--font-size-base);
    opacity: 0.9;
    margin: 0;
    max-width: 600px;
    margin: 0 auto;
  }
}
</style>
