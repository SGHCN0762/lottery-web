<template>
  <section class="header-card">
    <div class="current-date-info">
      <div class="date-main">
        <span class="day-number">{{ currentDate.day }}</span>
        <div class="date-details">
          <span class="month-year">{{ currentDate.year }}年{{ currentDate.month }}月</span>
          <span class="weekday">{{ currentDate.weekday }}</span>
        </div>
      </div>
      <div class="lunar-info">
        <van-icon name="star-o" size="16" />
        <span>{{ lunarDate }}</span>
      </div>
    </div>

    <!-- 快速倒计时卡片 -->
    <div class="quick-countdowns">
      <div class="countdown-item weekend">
        <div class="countdown-icon">🎉</div>
        <div class="countdown-content">
          <span class="countdown-label">{{ t("home.distanceToWeekend") }}</span>
          <span class="countdown-value">{{ daysToWeekend }}{{ t("home.days") }}</span>
        </div>
      </div>
      <div class="countdown-item festival">
        <div class="countdown-icon">🎊</div>
        <div class="countdown-content">
          <span class="countdown-label">{{ t("home.distanceTo") }}{{ nextFestival.name }}</span>
          <span class="countdown-value">{{ nextFestival.days }}{{ t("home.days") }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { Icon as VanIcon } from "vant";
import { useFestivals } from "../hooks/useFestivals";

const { t } = useI18n();
const { nextFestival } = useFestivals();

const props = defineProps({
  currentDate: {
    type: Object,
    required: true
  }
});

const lunarDate = computed(() => {
  return props.currentDate.lunar;
});

const daysToWeekend = computed(() => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  if (dayOfWeek === 0) return 6;
  if (dayOfWeek === 6) return 1;
  return 6 - dayOfWeek;
});
</script>

<style lang="less" scoped>
.header-card {
  margin: var(--spacing-md);
  padding: var(--spacing-xl);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  color: white;

  .current-date-info {
    margin-bottom: var(--spacing-lg);

    .date-main {
      display: flex;
      align-items: center;
      margin-bottom: var(--spacing-md);

      .day-number {
        font-size: 64px;
        font-weight: var(--font-weight-bold);
        line-height: 1;
        margin-right: var(--spacing-md);
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      }

      .date-details {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xs);

        .month-year {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
        }

        .weekday {
          font-size: var(--font-size-base);
          opacity: 0.9;
        }
      }
    }

    .lunar-info {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      font-size: var(--font-size-sm);
      opacity: 0.95;
      padding-top: var(--spacing-sm);
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    }
  }

  /* 快速倒计时 */
  .quick-countdowns {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);

    .countdown-item {
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      border-radius: var(--radius-md);
      padding: var(--spacing-md);
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      transition: all var(--transition-base);

      &:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
      }

      .countdown-icon {
        font-size: 32px;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
      }

      .countdown-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;

        .countdown-label {
          font-size: var(--font-size-xs);
          opacity: 0.9;
        }

        .countdown-value {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
        }
      }
    }
  }
}
</style>
