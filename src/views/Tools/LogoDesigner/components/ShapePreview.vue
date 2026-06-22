<template>
  <div class="shape-preview">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
      <!-- 圆形 -->
      <circle v-if="type === 'circle'" :cx="size/2" :cy="size/2" :r="size/2 - 2" fill="#1989fa" />
      <!-- 方形 -->
      <rect v-else-if="type === 'square'" x="2" y="2" :width="size - 4" :height="size - 4" fill="#1989fa" />
      <!-- 三角形 -->
      <polygon v-else-if="type === 'triangle'" :points="`${size/2},2 2,${size-2} ${size-2},${size-2}`" fill="#1989fa" />
      <!-- 菱形 -->
      <polygon v-else-if="type === 'diamond'" :points="`${size/2},2 ${size-2},${size/2} ${size/2},${size-2} 2,${size/2}`" fill="#1989fa" />
      <!-- 六边形 -->
      <polygon v-else-if="type === 'hexagon'" :points="getHexagonPoints()" fill="#1989fa" />
      <!-- 星形 -->
      <polygon v-else-if="type === 'star'" :points="getStarPoints()" fill="#1989fa" />
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({
  type: { type: String, default: 'circle' },
});

const size = 40;

const getHexagonPoints = () => {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 2;
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  return points.join(' ');
};

const getStarPoints = () => {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 2;
  const innerR = outerR * 0.4;
  const points = [];
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  return points.join(' ');
};
</script>

<style lang="less" scoped>
.shape-preview {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
