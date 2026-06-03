<template>
  <div class="map-card" :class="{ 'dark-mode': isDark }">
    <div class="map-container">
      <map-canvas />
    </div>
  </div>
</template>

<script setup>
  import MapCanvas from './components/MapCanvas.vue';

  const props = defineProps({
    isDark: {
      type: Boolean,
      default: false,
    },
  });
</script>

<style lang="less" scoped>
  .map-card {
    margin: var(--spacing-md);
    background: var(--color-bg-card);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-card);
    contain: layout style paint;

    .map-container {
      height: 280px;
      position: relative;
      background: var(--gradient-map);
      overflow: hidden;
      contain-intrinsic-size: 100% 280px;
    }

    &.dark-mode {
      background: var(--color-bg-card);
      box-shadow: var(--shadow-md);

      .map-nav {
        border-top-color: var(--color-border);
      }
    }
  }
</style>
