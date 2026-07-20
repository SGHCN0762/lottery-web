<template>
  <div class="virtual-list-container" ref="containerRef" @scroll="handleScroll">
    <div class="virtual-list-placeholder" :style="{ height: totalHeight + 'px' }"></div>
    <div class="virtual-list-content" :style="{ transform: `translateY(${offsetY}px)` }">
      <slot v-for="item in visibleItems" :key="item.id" :item="item"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  itemHeight: {
    type: Number,
    default: 80,
  },
  buffer: {
    type: Number,
    default: 10,
  },
});

const containerRef = ref(null);
const scrollTop = ref(0);

const containerHeight = computed(() => {
  return containerRef.value?.clientHeight || 600;
});

const totalHeight = computed(() => {
  return props.items.length * props.itemHeight;
});

const startIndex = computed(() => {
  return Math.max(0, Math.floor(scrollTop.value / props.itemHeight) - props.buffer);
});

const endIndex = computed(() => {
  const visibleCount = Math.ceil(containerHeight.value / props.itemHeight);
  return Math.min(props.items.length - 1, startIndex.value + visibleCount + props.buffer * 2);
});

const offsetY = computed(() => {
  return startIndex.value * props.itemHeight;
});

const visibleItems = computed(() => {
  return props.items.slice(startIndex.value, endIndex.value + 1);
});

const handleScroll = () => {
  if (containerRef.value) {
    scrollTop.value = containerRef.value.scrollTop;
  }
};

onMounted(() => {
  nextTick(() => {
    if (containerRef.value) {
      scrollTop.value = containerRef.value.scrollTop;
    }
  });
});

watch(() => props.items.length, () => {
  nextTick(() => {
    if (containerRef.value) {
      containerRef.value.scrollTop = 0;
      scrollTop.value = 0;
    }
  });
});

watch(() => props.items, () => {
  nextTick(() => {
    if (containerRef.value) {
      containerRef.value.scrollTop = 0;
      scrollTop.value = 0;
    }
  });
}, { deep: true });
</script>

<style lang="less" scoped>
.virtual-list-container {
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
}

.virtual-list-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
}

.virtual-list-content {
  position: relative;
  width: 100%;
  will-change: transform;
}
</style>
