<template>
  <div class="page-layout">
    <slot></slot>
  </div>
</template>

<script setup>
defineOptions({ name: "PageLayout" });
</script>

<style lang="less" scoped>
  .page-layout {
    min-height: 100vh;
    padding-top: env(safe-area-inset-top, 0px);
    padding-bottom: calc(50px + env(safe-area-inset-bottom, 0px));
    background: var(--color-bg-primary);
    -webkit-overflow-scrolling: touch;
  }
</style>
