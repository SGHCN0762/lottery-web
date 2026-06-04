<template>
  <div class="map-layer-switcher">
    <button
      v-for="layer in layers"
      :key="layer.type"
      :class="['layer-btn', { active: currentLayer === layer.type }]"
      @click="switchLayer(layer.type)"
    >
      {{ layer.label }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['change']);

const layers = [
  { type: 'satellite', label: '卫星' },
  { type: 'road', label: '路网' },
  { type: 'label', label: '标注' },
];

const currentLayer = ref('satellite');

const switchLayer = (type) => {
  if (currentLayer.value === type) return;
  currentLayer.value = type;
  emit('change', type);
};
</script>

<style lang="less" scoped>
.map-layer-switcher {
  display: flex;
  background-color: var(--color-bg-card);
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

  .layer-btn {
    padding: 6px 12px;
    border: none;
    background-color: var(--color-bg-secondary);
    cursor: pointer;
    font-size: 12px;
    color: var(--color-text-primary);
    transition: background-color 0.3s;

    &:not(:last-child) {
      border-right: 1px solid var(--color-border);
    }

    &.active {
      background-color: var(--color-primary);
      color: var(--color-text-primary);
    }

    &:hover:not(.active) {
      background-color: var(--color-bg-primary);
    }
  }
}
</style>
