<template>
  <section class="custom-calendar">
    <div class="calendar-header">
      <button class="nav-btn" @click="$emit('prev')">
        <van-icon name="arrow-left" />
      </button>
      <h3 class="calendar-title">{{ displayYear }}年{{ displayMonth }}月</h3>
      <button class="nav-btn" @click="$emit('next')">
        <van-icon name="arrow" />
      </button>
    </div>

    <div class="weekdays-header">
      <div v-for="day in weekDays" :key="day" class="weekday-item">
        {{ day }}
      </div>
    </div>

    <div class="calendar-grid">
      <div
        v-for="(date, index) in calendarDates"
        :key="index"
        class="date-cell"
        :class="{
          'other-month': !date.isCurrentMonth,
          'is-today': date.isToday,
          'has-festival': date.isCurrentMonth && date.festival,
        }"
        @click="$emit('date-click', date)"
      >
        <div class="date-solar">{{ date.day }}</div>
        <!-- 优先显示节日，其次显示外部传入的lunar文本 -->
        <div class="date-lunar">
          {{ date.festival || date.lunar }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Icon as VanIcon } from "vant";

defineProps({
  weekDays: { type: Array, required: true },
  displayYear: { type: Number, required: true },
  displayMonth: { type: Number, required: true },
  calendarDates: { type: Array, required: true },
});

defineEmits(["prev", "next", "date-click"]);
</script>

<style lang="less" scoped>
/* 日历主体 */
.custom-calendar {
  margin: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  box-shadow: var(--shadow-card);

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);

    .nav-btn {
      width: 36px;
      height: 36px;
      border: none;
      background: var(--color-bg-primary);
      border-radius: var(--radius-full);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition-fast);
      flex-shrink: 0;
      
      &:active {
        transform: scale(0.95);
      }
    }

    .calendar-title {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      margin: 0;
      flex: 1;
      text-align: center;
    }
  }

  /* 星期标题 */
  .weekdays-header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: var(--spacing-xs);
    margin-bottom: var(--spacing-md);

    .weekday-item {
      text-align: center;
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      font-weight: var(--font-weight-medium);
    }
  }

  /* 日期网格 */
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: var(--spacing-xs);

    .date-cell {
      aspect-ratio: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all var(--transition-fast);
      position: relative;

      &:hover:not(.other-month) {
        background: var(--color-bg-primary);
      }

      &.other-month {
        opacity: 0.3;
        cursor: default;
      }

      &.is-today {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        animation: todayPulse 2s ease-in-out infinite;

        .date-solar,
        .date-lunar {
          color: white;
        }
      }

      &.has-festival {
        background: linear-gradient(
          135deg,
          rgba(255, 149, 0, 0.1) 0%,
          rgba(255, 149, 0, 0.05) 100%
        );
        border: 2px solid var(--color-warning);
      }

      .date-solar {
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-semibold);
        color: var(--color-text-primary);
        line-height: 1;
      }

      .date-lunar {
        font-size: 10px;
        color: var(--color-text-tertiary);
        margin-top: 2px;
        white-space: nowrap;
      }
    }
  }
}
</style>
