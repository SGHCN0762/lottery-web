<template>
  <section class="info-section">
    <div class="section-title">{{ t('about.health.title') }}</div>
    <van-cell-group inset class="highlight-group">
      <van-cell :title="t('about.health.timeManagement')" icon="clock-o">
        <template #label>
          <p class="cell-tip">{{ t('about.health.timeTip') }}</p>
        </template>
      </van-cell>
      <van-cell :title="t('about.health.minorProtection')" icon="shield-o">
        <template #label>
          <p class="cell-tip">{{ t('about.health.minorTip') }}</p>
        </template>
      </van-cell>
      <van-cell :title="t('about.health.virtualItems')" icon="info-o">
        <template #label>
          <p class="cell-tip">{{ t('about.health.virtualTip') }}</p>
        </template>
      </van-cell>
    </van-cell-group>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { CellGroup as VanCellGroup, Cell as VanCell } from 'vant'

const { t } = useI18n()
</script>

<style lang="less" scoped>
.section-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: var(--spacing-lg) var(--spacing-md) var(--spacing-md);
  font-weight: var(--font-weight-medium);
}

/* 信息区域 */
.info-section {
  margin: 0 var(--spacing-md);
  margin-bottom: var(--spacing-lg);

  /* 健康提示高亮样式 */
  .highlight-group {
    :deep(.van-cell) {
      background: linear-gradient(135deg, rgba(52, 199, 89, 0.08) 0%, rgba(52, 199, 89, 0.03) 100%);
      border-left: 3px solid var(--color-success);
    }

    .cell-tip {
      margin: var(--spacing-xs) 0 0 0;
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
      line-height: var(--line-height-base);
    }
  }
}
</style>
