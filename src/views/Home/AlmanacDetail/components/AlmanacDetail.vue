<template>
  <div class="detail-section">
    <h4>详细信息</h4>
    <div class="detail-grid">
      <div class="detail-item">
        <span class="label">建除</span>
        <span class="value">{{ almanac?.jianChu || '-' }}</span>
      </div>
      <div class="detail-item">
        <span class="label">星宿</span>
        <span class="value">{{ almanac?.xiu || '-' }}({{ almanac?.xiuLuck || '-' }})</span>
      </div>
      <div class="detail-item">
        <span class="label">胎神</span>
        <span class="value">{{ almanac?.taiShen || '-' }}</span>
      </div>
      <div class="detail-item">
        <span class="label">纳音</span>
        <span class="value">{{ almanac?.naYin || '-' }}</span>
      </div>
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
.detail-section {
  h4 {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text-primary);
    margin: 0 0 var(--spacing-md) 0;
  }

  .detail-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);

    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: var(--spacing-md);
      background: var(--color-bg-tertiary);
      border-radius: 8px;

      .label {
        font-size: 13px;
        color: var(--color-text-tertiary);
      }

      .value {
        font-size: 14px;
        color: var(--color-text-primary);
      }
    }
  }
}
</style>
