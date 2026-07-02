<template>
  <div class="virtual-list-container" ref="containerRef" @scroll="handleScroll">
    <div class="virtual-list-placeholder" :style="{ height: totalHeight + 'px' }"></div>
    <div class="virtual-list-content" :style="{ transform: `translateY(${offsetY}px)` }">
      <IdiomCard
        v-for="idiom in visibleIdioms"
        :key="idiom.id"
        :idiom="idiom"
        :is-learned="isLearned(idiom.id)"
        :is-mastered="isMastered(idiom.id)"
        @click="handleClick"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import IdiomCard from './IdiomCard.vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  itemHeight: {
    type: Number,
    default: 110,
  },
  buffer: {
    type: Number,
    default: 20,
  },
});

const emit = defineEmits(['item-click']);

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

const visibleIdioms = computed(() => {
  return props.items.slice(startIndex.value, endIndex.value + 1);
});

const isLearned = (id) => {
  const learnedIds = JSON.parse(localStorage.getItem('idiom_learned_ids') || '[]');
  return learnedIds.includes(id);
};

const isMastered = (id) => {
  const masteredIds = JSON.parse(localStorage.getItem('idiom_mastered_ids') || '[]');
  return masteredIds.includes(id);
};

const handleScroll = () => {
  if (containerRef.value) {
    scrollTop.value = containerRef.value.scrollTop;
  }
};

const handleClick = (idiom) => {
  emit('item-click', idiom);
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
