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
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

  .layer-btn {
    padding: 6px 12px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 12px;
    color: #333;
    transition: background-color 0.3s;

    &:not(:last-child) {
      border-right: 1px solid #e0e0e0;
    }

    &.active {
      background-color: #1890ff;
      color: #fff;
    }

    &:hover:not(.active) {
      background-color: #f5f5f5;
    }
  }
}
</style>
