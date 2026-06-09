<template>
  <div class="section">
    <div class="section-header">
      <van-icon :name="section.icon || 'file-o'" />
      <h2 class="section-title">{{ section.title }}</h2>
    </div>
    <div class="custom-items">
      <div v-for="item in section.items" :key="item._id" class="custom-item">
        <span class="item-label">{{ item.label }}：</span>
        <span class="item-value">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon as VanIcon } from 'vant';

const props = defineProps({
  section: { type: Object, required: true },
});
</script>

<style lang="less" scoped>
.section {
  border-radius: 12px;
  padding: var(--a4-margin-lg, 24px);
  margin-bottom: var(--a4-margin-lg, 24px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  border: 1px solid var(--theme-border, #f0f0f0);

  .section-header {
    display: flex;
    align-items: center;
    gap: var(--a4-margin-sm, 7px);
    margin-bottom: var(--a4-margin-md, 14px);
    padding-bottom: var(--a4-margin-sm, 7px);
    color: var(--theme-accent, #667eea);
    border-bottom: 1px dashed var(--theme-border, #e9ecef);
  }

  .section-title {
    font-size: var(--a4-section-size, 18px);
    font-weight: var(--font-weight-bold);
    color: var(--theme-text-primary, #2c3e50);
    margin: 0;
  }
}

.custom-items {
  padding-left: var(--a4-margin-md, 16px);
  background: var(--theme-card, #ffffff);
  border-left: 3px solid var(--theme-item-border, #667eea);
  border-radius: 10px;
  .custom-item {
    padding: var(--a4-margin-sm, 8px) 0;
    border-bottom: 1px dashed var(--theme-border, #e9ecef);
    
    &:last-child {
      border-bottom: none;
    }

    .item-label {
      font-weight: var(--font-weight-semibold);
      color: var(--theme-text-secondary, #495057);
      font-size: var(--a4-content-size, 14px);
    }

    .item-value {
      color: var(--theme-text-primary, #2c3e50);
      font-size: var(--a4-content-size, 14px);
      white-space: pre-wrap;
      word-break: break-word;
    }
  }
}
</style>
