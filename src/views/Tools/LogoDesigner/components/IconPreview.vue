<template>
  <div class="icon-preview">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
      <!-- 勾选 -->
      <polyline v-if="type === 'check'" :points="`10,20 18,28 30,12`" fill="none" stroke="#1989fa" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      <!-- 叉号 -->
      <g v-else-if="type === 'cross'">
        <line x1="10" y1="10" x2="30" y2="30" stroke="#1989fa" stroke-width="3" stroke-linecap="round" />
        <line x1="30" y1="10" x2="10" y2="30" stroke="#1989fa" stroke-width="3" stroke-linecap="round" />
      </g>
      <!-- 加号 -->
      <g v-else-if="type === 'plus'">
        <line x1="20" y1="10" x2="20" y2="30" stroke="#1989fa" stroke-width="3" stroke-linecap="round" />
        <line x1="10" y1="20" x2="30" y2="20" stroke="#1989fa" stroke-width="3" stroke-linecap="round" />
      </g>
      <!-- 减号 -->
      <line v-else-if="type === 'minus'" x1="10" y1="20" x2="30" y2="20" stroke="#1989fa" stroke-width="3" stroke-linecap="round" />
      <!-- 圆圈 -->
      <circle v-else-if="type === 'circle'" cx="20" cy="20" r="10" fill="none" stroke="#1989fa" stroke-width="3" />
      <!-- 方框 -->
      <rect v-else-if="type === 'square'" x="10" y="10" width="20" height="20" fill="none" stroke="#1989fa" stroke-width="3" />
    </svg>
  </div>
</template>

<script setup>
defineProps({
  type: { type: String, default: 'check' },
});

const size = 40;
</script>

<style lang="less" scoped>
.icon-preview {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
