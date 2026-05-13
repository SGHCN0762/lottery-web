<template>
  <section class="game-info-bar">
    <div class="info-item">
      <span class="info-label">{{ t('luckyWheel.myPoints') }}</span>
      <span class="info-value">{{ userPoints }}</span>
    </div>
    <div class="info-item">
      <span class="info-label">{{ t('luckyWheel.cost') }}</span>
      <span class="info-value cost">10 {{ t('common.points') }}</span>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  userPoints: {
    type: Number,
    required: true
  }
})
</script>

<style lang="less" scoped>
.game-info-bar {
  display: flex;
  justify-content: space-around;
  background: var(--color-bg-secondary);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-lg);
  box-shadow: var(--shadow-sm);

  .info-item {
    text-align: center;

    .info-label {
      display: block;
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
      margin-bottom: var(--spacing-xs);
    }

    .info-value {
      display: block;
      font-size: var(--font-size-xl);
      color: var(--color-primary);
      font-weight: var(--font-weight-bold);

      &.cost {
        color: var(--color-warning);
      }
    }
  }
}
</style>
