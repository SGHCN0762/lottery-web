<template>
  <!-- 查看黄历按钮 -->
  <div class="almanac-card" @click="$emit('click')">
    <div class="almanac-icon">
      <van-icon name="calendar-o" size="24" color="var(--color-warning)" />
    </div>
    <div class="almanac-content">
      <h4>黄历宜忌</h4>
      <p>查看今日宜忌、冲煞、吉神方位等详细信息</p>
    </div>
    <div class="almanac-arrow">
      <van-icon name="arrow" size="16" />
    </div>
  </div>
</template>

<style lang="less" scoped>
  .almanac-card {
    display: flex;
    align-items: center;
    padding: var(--spacing-md);
    background: linear-gradient(135deg, rgba(255, 151, 106, 0.1) 0%, rgba(255, 151, 106, 0.05) 100%);
    border-radius: var(--radius-md);
    margin-top: var(--spacing-md);
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 151, 106, 0.2);

    &:active {
      transform: scale(0.98);
      background: linear-gradient(135deg, rgba(255, 151, 106, 0.15) 0%, rgba(255, 151, 106, 0.1) 100%);
    }

    .almanac-icon {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 151, 106, 0.1);
      border-radius: var(--radius-sm);
      margin-right: var(--spacing-md);
    }

    .almanac-content {
      flex-grow: 1;

      h4 {
        margin: 0 0 var(--spacing-xs) 0;
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-semibold);
        color: var(--color-text-primary);
      }

      p {
        margin: 0;
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        line-height: 1.4;
      }
    }

    .almanac-arrow {
      flex-shrink: 0;
      color: var(--color-text-tertiary);
    }
  }
</style>
