<template>
  <section class="calendar-section">
    <h3 class="calendar-title">📅 {{ t('dailyCheckIn.calendar.title') }}</h3>
    <div class="calendar-grid">
      <div
        v-for="day in calendarDays"
        :key="day.date"
        class="calendar-day"
        :class="{
          'today': day.isToday,
          'checked-in': day.isCheckedIn,
          'future': day.isFuture
        }"
      >
        <span class="day-number">{{ day.day }}</span>
        <span v-if="day.isCheckedIn" class="check-mark">✓</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  calendarDays: {
    type: Array,
    required: true
  }
})
</script>

<style lang="less" scoped>
.calendar-section {
  margin-bottom: var(--spacing-xl);

  .calendar-title {
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-md);
    font-weight: var(--font-weight-semibold);
  }

  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: var(--spacing-xs);
    background: var(--color-bg-secondary);
    padding: var(--spacing-md);
    border-radius: var(--radius-lg);

    .calendar-day {
      aspect-ratio: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--color-bg-tertiary);
      border-radius: var(--radius-sm);
      position: relative;
      transition: all var(--transition-fast);

      .day-number {
        font-size: var(--font-size-sm);
        color: var(--color-text-primary);
        font-weight: var(--font-weight-medium);
      }

      .check-mark {
        position: absolute;
        bottom: 2px;
        right: 2px;
        font-size: var(--font-size-xs);
        color: var(--color-success);
        font-weight: bold;
      }

      &.today {
        background: rgba(24, 144, 255, 0.1);
        border: 2px solid var(--color-primary);

        .day-number {
          color: var(--color-primary);
          font-weight: var(--font-weight-bold);
        }
      }

      &.checked-in {
        background: rgba(82, 196, 26, 0.1);

        .day-number {
          color: var(--color-success);
        }
      }

      &.future {
        opacity: 0.4;
      }
    }
  }
}
</style>
