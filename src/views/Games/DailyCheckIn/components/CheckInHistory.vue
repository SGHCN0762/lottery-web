<template>
  <section class="history-section">
    <h3 class="history-title">📜 {{ t('dailyCheckIn.history.title') }}</h3>
    <div class="history-list">
      <div
        v-for="(record, index) in checkInHistory"
        :key="index"
        class="history-item"
      >
        <div class="history-date">{{ record.displayDate || record.date }}</div>
        <div class="history-details">
          <span class="history-base">{{ t('dailyCheckIn.history.base') }} +10</span>
          <span v-if="record.bonus > 0" class="history-bonus">
            {{ t('dailyCheckIn.history.consecutive', { days: record.consecutiveDays }) }} +{{ record.bonus }}
          </span>
          <span class="history-total">{{ t('dailyCheckIn.history.total') }} +{{ record.totalPoints }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  checkInHistory: {
    type: Array,
    required: true
  }
})
</script>

<style lang="less" scoped>
.history-section {
  .history-title {
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-md);
    font-weight: var(--font-weight-semibold);
  }

  .history-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);

    .history-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-md);
      background: var(--color-bg-secondary);
      border-radius: var(--radius-md);
      animation: slideIn 0.3s ease-out;

      .history-date {
        font-size: var(--font-size-sm);
        color: var(--color-text-primary);
        font-weight: var(--font-weight-medium);
      }

      .history-details {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 2px;

        .history-base {
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
        }

        .history-bonus {
          font-size: var(--font-size-xs);
          color: var(--color-warning);
          font-weight: var(--font-weight-medium);
        }

        .history-total {
          font-size: var(--font-size-sm);
          color: var(--color-success);
          font-weight: var(--font-weight-bold);
        }
      }
    }
  }
}
</style>
