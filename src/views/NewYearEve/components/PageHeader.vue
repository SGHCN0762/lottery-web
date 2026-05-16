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
  margin-bottom: var(--spacing-lg);
  position: relative;

  .page-title {
    font-size: clamp(28px, 6vw, 40px);
    font-weight: var(--font-weight-bold);
    margin: 0 0 var(--spacing-xs) 0;
    letter-spacing: 1px;
    line-height: 1.3;
    color: #fff;
  }

  .page-subtitle {
    font-size: clamp(13px, 2.5vw, 15px);
    opacity: 0.75;
    margin: 0 auto;
    max-width: 500px;
    line-height: 1.6;
    font-weight: var(--font-weight-regular);
    color: rgba(255, 255, 255, 0.85);
  }
}
</style>
