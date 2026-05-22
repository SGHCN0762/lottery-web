<template>
  <div class="chong-sha-section">
    <div class="info-item">
      <span class="label">冲</span>
      <span class="value">{{ almanac?.chong || '无' }}</span>
    </div>
    <div class="info-item">
      <span class="label">煞</span>
      <span class="value">{{ almanac?.sha || '无' }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  almanac: {
    type: Object,
    default: null
  }
});
</script>

<style lang="less" scoped>
.chong-sha-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: rgba(0, 0, 0, 0.02);
  border-radius: 10px;

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 6px;

    .label {
      font-size: 13px;
      color: #b2b2b2;
    }

    .value {
      font-size: 15px;
      color: #333333;
      font-weight: 500;
    }
  }
}
</style>
