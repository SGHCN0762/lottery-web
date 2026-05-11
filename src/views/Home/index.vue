<template>
  <div class="calendar-page">
    <!-- 顶部信息卡片 -->
    <section class="header-card">
      <div class="current-date-info">
        <div class="date-main">
          <span class="day-number">{{ currentDate.day }}</span>
          <div class="date-details">
            <span class="month-year"
              >{{ currentDate.year }}年{{ currentDate.month }}月</span
            >
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
            <span class="countdown-label">{{
              t("home.distanceToWeekend")
            }}</span>
            <span class="countdown-value"
              >{{ daysToWeekend }}{{ t("home.days") }}</span
            >
          </div>
        </div>
        <div class="countdown-item festival">
          <div class="countdown-icon">🎊</div>
          <div class="countdown-content">
            <span class="countdown-label"
              >{{ t("home.distanceTo") }}{{ nextFestival.name }}</span
            >
            <span class="countdown-value"
              >{{ nextFestival.days }}{{ t("home.days") }}</span
            >
          </div>
        </div>
      </div>
    </section>

    <!-- 日历主体 -->
    <custom-calendar
      :week-days="weekDays"
      :display-year="displayYear"
      :display-month="displayMonth"
      :calendar-dates="calendarDates"
      @prev="prevMonth"
      @next="nextMonth"
      @date-click="handleDateClick"
    />

    <!-- 春节倒计时入口卡片 -->
    <section class="spring-festival-entry" @click="goToSpringFestival">
      <div class="entry-content">
        <div class="entry-icon">🧧</div>
        <div class="entry-info">
          <span class="entry-title">{{
            t("home.springFestivalCountdown")
          }}</span>
          <span class="entry-subtitle"
            >{{ springFestivalCountdown.days }}{{ t("home.daysLater") }}</span
          >
        </div>
      </div>
      <van-icon name="arrow" class="entry-arrow" />
    </section>

    <!-- 即将到来的节日列表 -->
    <section class="upcoming-festivals">
      <div class="section-title">
        <van-icon name="gift-o" />
        <span>{{ t("home.upcomingFestivals") }}</span>
      </div>
      <div class="festival-list">
        <div
          v-for="festival in upcomingFestivals"
          :key="festival.name"
          class="festival-item"
        >
          <div class="festival-icon">{{ festival.icon }}</div>
          <div class="festival-info">
            <span class="festival-name">{{ festival.name }}</span>
            <span class="festival-date">{{ festival.date }}</span>
          </div>
          <div class="festival-countdown">
            <span class="days">{{ festival.days }}</span>
            <span class="unit">{{ t("home.daysLater") }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 日期详情弹窗 -->
    <van-popup v-model:show="showDateDetail" position="bottom" round>
      <div class="date-detail-modal">
        <div class="modal-header">
          <h3>
            {{ selectedDate?.year }}年{{ selectedDate?.month }}月{{
              selectedDate?.day
            }}日
          </h3>
          <p>{{ selectedDate?.lunarFull }}</p>
        </div>
        <div class="modal-content">
          <div v-if="selectedDate?.festival" class="detail-festival">
            <van-icon name="gift-o" size="24" color="#FF9500" />
            <span>{{ selectedDate.festival }}</span>
          </div>
          <div class="detail-weekday">
            <span
              >星期{{
                ["日", "一", "二", "三", "四", "五", "六"][
                  selectedDate?.weekdayIndex
                ]
              }}</span
            >
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { Icon as VanIcon, Popup as VanPopup, showToast } from "vant";
import CustomCalendar from "@/components/CustomCalendar.vue";
import { useLunar } from "@/hooks/useLunar";
import { useFestivals } from "@/hooks/useFestivals";
import { useCalendar } from "@/hooks/useCalendar";

const { t } = useI18n();
const router = useRouter();

const goToSpringFestival = () => {
  router.push("/spring-festival");
};

const { weekDays, weekdayNames, getLunarDate, getLunarDay } = useLunar();
const { nextFestival, upcomingFestivals, springFestivalCountdown } =
  useFestivals();
const {
  displayYear,
  displayMonth,
  selectedDate,
  showDateDetail,
  prevMonth,
  nextMonth,
  handleDateClick,
  calendarDates,
} = useCalendar();

const currentDate = computed(() => {
  const now = new Date();
  const lunar = getLunarDate(now);

  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    weekday: weekdayNames[now.getDay()],
    lunar: lunar.lunarText,
    lunarFull: `${lunar.gzYear}${lunar.animal}年 ${lunar.lunarText}`,
  };
});

const lunarDate = computed(() => {
  return currentDate.value.lunar;
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
.calendar-page {
  min-height: 100vh;
  background: var(--color-bg-primary);
  padding-bottom: calc(var(--spacing-xl) + env(safe-area-inset-bottom, 0px));
}

/* 顶部信息卡片 */
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

/* 春节倒计时入口卡片 */
.spring-festival-entry {
  margin: var(--spacing-md);
  background: linear-gradient(135deg, #dc143c 0%, #8b0000 100%);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 20px rgba(220, 20, 60, 0.4);
  cursor: pointer;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;

  &::before {
    content: "🧧";
    position: absolute;
    top: -20px;
    right: -20px;
    font-size: 80px;
    opacity: 0.2;
    transform: rotate(15deg);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(220, 20, 60, 0.6);
  }

  .entry-content {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    z-index: 1;
  }

  .entry-icon {
    font-size: 48px;
    animation: bounce 1s ease-in-out infinite alternate;
  }

  .entry-info {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .entry-title {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-bold);
      color: #ffd700;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .entry-subtitle {
      font-size: var(--font-size-sm);
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .entry-arrow {
    font-size: 24px;
    color: #ffd700;
    z-index: 1;
    transition: transform var(--transition-fast);
  }

  &:hover .entry-arrow {
    transform: translateX(4px);
  }
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-8px);
  }
}

/* 即将到来的节日 */
.upcoming-festivals {
  margin: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-card);

  .section-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-md);
  }

  .festival-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);

    .festival-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      padding: var(--spacing-md);
      background: var(--color-bg-primary);
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);

      &:hover {
        transform: translateX(4px);
        box-shadow: var(--shadow-sm);
      }

      .festival-icon {
        font-size: 32px;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
      }

      .festival-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;

        .festival-name {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-primary);
        }

        .festival-date {
          font-size: var(--font-size-xs);
          color: var(--color-text-tertiary);
        }
      }

      .festival-countdown {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 2px;

        .days {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-primary);
          line-height: 1;
        }

        .unit {
          font-size: var(--font-size-xs);
          color: var(--color-text-tertiary);
        }
      }
    }
  }
}

/* 日期详情弹窗 */
.date-detail-modal {
  padding: var(--spacing-xl);

  .modal-header {
    text-align: center;
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-md);
    border-bottom: 2px solid var(--color-bg-primary);

    h3 {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-text-primary);
      margin: 0 0 var(--spacing-xs) 0;
    }

    p {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      margin: 0;
    }
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);

    .detail-festival {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-md);
      background: linear-gradient(
        135deg,
        rgba(255, 149, 0, 0.1) 0%,
        rgba(255, 149, 0, 0.05) 100%
      );
      border-radius: var(--radius-md);
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      color: var(--color-warning);
    }

    .detail-weekday {
      text-align: center;
      font-size: var(--font-size-base);
      color: var(--color-text-secondary);
    }
  }
}

/* 今日脉冲动画 */
@keyframes todayPulse {
  0%,
  100% {
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
  50% {
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }
}
</style>
