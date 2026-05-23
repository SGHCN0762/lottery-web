<template>
  <section class="stats-section">
    <div class="stats-container">
      <!-- 总数 -->
      <div class="stat-card tertiary">
        <div class="stat-content">
          <div class="stat-number">{{ totalCount }}</div>
          <div class="stat-text">{{ t('badges.total') }}</div>
        </div>
      </div>

      <!-- 已解锁 -->
      <div class="stat-card primary">
        <div class="stat-content">
          <div class="stat-number">{{ unlockedCount }}</div>
          <div class="stat-text">{{ t('badges.unlocked') }}</div>
        </div>
      </div>

      <!-- 完成率 -->
      <div class="stat-card secondary">
        <div class="stat-content">
          <div class="stat-number">{{ completionRate }}%</div>
          <div class="stat-text">{{ t('badges.completionRate') }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { Icon as VanIcon } from 'vant';
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
  .stats-section {
    .stats-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
    }

    .stat-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 14px 8px;
      border-radius: 12px;
      transition: all var(--transition-base);
      position: relative;
      overflow: hidden;
      text-align: center;

      .stat-content {
        .stat-number {
          font-size: 24px;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 4px;
          letter-spacing: -0.3px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .stat-text {
          font-size: 11px;
          opacity: 0.9;
          font-weight: 500;
        }
      }
    }
  }
</style>
