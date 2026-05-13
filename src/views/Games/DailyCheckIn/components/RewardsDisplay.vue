<template>
  <section class="rewards-section">
    <h3 class="rewards-title">🎁 {{ t('dailyCheckIn.rewards.title') }}</h3>
    <div class="rewards-grid">
      <div
        v-for="milestone in milestones"
        :key="milestone.days"
        class="milestone-card"
        :class="{
          'achieved': consecutiveDays >= milestone.days,
          'current': consecutiveDays === milestone.days - 1
        }"
      >
        <div class="milestone-days">{{ milestone.days }}{{ t('dailyCheckIn.days') }}</div>
        <div class="milestone-bonus">+{{ milestone.bonus }}{{ t('common.points') }}</div>
        <div class="milestone-status">
          {{ getMilestoneStatus(milestone) }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  milestones: {
    type: Array,
    required: true
  },
  consecutiveDays: {
    type: Number,
    required: true
  },
  getMilestoneStatus: {
    type: Function,
    required: true
  }
})
</script>

<style lang="less" scoped>
.rewards-section {
  margin-bottom: var(--spacing-xl);

  .rewards-title {
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-md);
    font-weight: var(--font-weight-semibold);
  }

  .rewards-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);

    .milestone-card {
      padding: var(--spacing-md);
      background: var(--color-bg-secondary);
      border-radius: var(--radius-md);
      text-align: center;
      border: 2px solid transparent;
      transition: all var(--transition-fast);

      &.achieved {
        background: linear-gradient(135deg, rgba(82, 196, 26, 0.1) 0%, rgba(82, 196, 26, 0.05) 100%);
        border-color: var(--color-success);

        .milestone-days {
          color: var(--color-success);
        }
      }

      &.current {
        background: linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 193, 7, 0.05) 100%);
        border-color: var(--color-warning);
        animation: pulse 2s ease-in-out infinite;
      }

      .milestone-days {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        color: var(--color-text-primary);
        margin-bottom: var(--spacing-xs);
      }

      .milestone-bonus {
        font-size: var(--font-size-sm);
        color: var(--color-success);
        font-weight: var(--font-weight-semibold);
        margin-bottom: var(--spacing-xs);
      }

      .milestone-status {
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
      }
    }
  }
}
</style>
