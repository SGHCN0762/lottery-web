<template>
  <section class="stats-card">
    <div class="stat-item">
      <div class="stat-value">{{ totalCount }}</div>
      <div class="stat-label">{{ t('badges.total') }}</div>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item">
      <div class="stat-value">{{ unlockedCount }}</div>
      <div class="stat-label">{{ t('badges.unlocked') }}</div>
    </div>
    <div class="stat-divider"></div>
    <div class="stat-item">
      <div class="stat-value">{{ completionRate }}%</div>
      <div class="stat-label">{{ t('badges.completionRate') }}</div>
    </div>
  </section>
</template>

<script setup>
  import { useI18n } from 'vue-i18n';

  // ========================================
  // i18n
  // ========================================
  const { t } = useI18n();

  // ========================================
  // Props
  // ========================================
  defineProps({
    unlockedCount: {
      type: Number,
      required: true,
      default: 0,
    },
    completionRate: {
      type: Number,
      required: true,
      default: 0,
    },
    totalCount: {
      type: Number,
      required: true,
      default: 0,
    },
  });
</script>

<style lang="less" scoped>
  .stats-card {
    margin: var(--spacing-sm);
    padding: var(--spacing-md);
    background: var(--gradient-primary);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: white;

    .stat-item {
      text-align: center;
      flex: 1;

      .stat-value {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        margin-bottom: 2px;
      }

      .stat-label {
        font-size: 11px;
        opacity: 0.85;
      }
    }

    .stat-divider {
      width: 1px;
      height: 28px;
      background: rgba(255, 255, 255, 0.2);
    }
  }
</style>
