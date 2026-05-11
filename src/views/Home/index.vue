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
    <section class="calendar-section">
      <div class="calendar-header">
        <button class="nav-btn" @click="prevMonth">
          <van-icon name="arrow-left" />
        </button>
        <h3 class="calendar-title">{{ displayYear }}年{{ displayMonth }}月</h3>
        <button class="nav-btn" @click="nextMonth">
          <van-icon name="arrow" />
        </button>
      </div>

      <!-- 星期标题 -->
      <div class="weekdays-header">
        <div v-for="day in weekDays" :key="day" class="weekday-item">
          {{ day }}
        </div>
      </div>

      <!-- 日期网格 -->
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
          @click="handleDateClick(date)"
        >
          <div class="date-solar">{{ date.day }}</div>
          <div class="date-lunar">
            {{ date.festival || date.lunar || getLunarDay(date.day) }}
          </div>
        </div>
      </div>
    </section>

    <!-- 春节倒计时入口卡片 -->
    <section class="spring-festival-entry" @click="goToSpringFestival">
      <div class="entry-content">
        <div class="entry-icon">🧧</div>
        <div class="entry-info">
          <span class="entry-title">{{ t("home.springFestivalCountdown") }}</span>
          <span class="entry-subtitle">{{ springFestivalCountdown.days }}{{ t("home.daysLater") }}</span>
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
import { Solar } from "lunar-javascript";

// ========================================
// i18n & Router
// ========================================
const { t } = useI18n();
const router = useRouter();

/**
 * 跳转到春节倒计时页面
 */
const goToSpringFestival = () => {
  router.push("/spring-festival");
};

// ========================================
// 农历转换工具（使用 lunar-javascript）
// ========================================

/**
 * 获取农历日期
 * @param {Date} date - 阳历日期
 * @returns {Object} 农历信息对象
 */
const getLunarDate = (date) => {
  const solar = Solar.fromDate(date);
  const lunar = solar.getLunar();

  return {
    year: lunar.getYear(),
    month: lunar.getMonth(),
    day: lunar.getDay(),
    isLeap: lunar.getMonth() < 0,
    lunarText: lunar.getMonthInChinese() + "月" + lunar.getDayInChinese(),
    gzYear: lunar.getYearInGanZhi(),
    animal: lunar.getYearShengXiao(),
  };
};

/**
 * 获取农历日的简称（用于日历网格显示）
 */
const getLunarDay = (day) => {
  const nStr1 = [
    "日",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
  ];
  const nStr2 = ["初", "十", "廿", "卅"];

  if (day === 1) return "初一";
  if (day === 10) return "初十";
  if (day === 20) return "二十";
  if (day === 30) return "三十";
  if (day < 10) return "初" + nStr1[day - 1];
  if (day < 20) return "十" + nStr1[day - 10];
  if (day < 30) return "廿" + nStr1[day - 20];
  return "卅" + nStr1[day - 30];
};

// ========================================
// 节日配置
// ========================================

/**
 * 固定日期节日配置
 */
const fixedFestivals = [
  { month: 1, day: 1, name: "元旦", icon: "🎆" },
  { month: 2, day: 14, name: "情人节", icon: "💝" },
  { month: 3, day: 8, name: "妇女节", icon: "👩" },
  { month: 3, day: 12, name: "植树节", icon: "🌳" },
  { month: 4, day: 1, name: "愚人节", icon: "🃏" },
  { month: 5, day: 1, name: "劳动节", icon: "👷" },
  { month: 5, day: 4, name: "青年节", icon: "🎓" },
  { month: 6, day: 1, name: "儿童节", icon: "🎈" },
  { month: 7, day: 1, name: "建党节", icon: "🚩" },
  { month: 8, day: 1, name: "建军节", icon: "🎖️" },
  { month: 9, day: 10, name: "教师节", icon: "👨‍🏫" },
  { month: 10, day: 1, name: "国庆节", icon: "🇨🇳" },
  { month: 12, day: 25, name: "圣诞节", icon: "🎄" },
];

/**
 * 2025年农历节日（需要每年更新）
 */
const lunarFestivals2025 = [
  { lunarMonth: 1, lunarDay: 1, name: "春节", icon: "🧧", year: 2025 },
  { lunarMonth: 1, lunarDay: 15, name: "元宵节", icon: "🏮", year: 2025 },
  { lunarMonth: 5, lunarDay: 5, name: "端午节", icon: "🐲", year: 2025 },
  { lunarMonth: 7, lunarDay: 7, name: "七夕节", icon: "💕", year: 2025 },
  { lunarMonth: 8, lunarDay: 15, name: "中秋节", icon: "🥮", year: 2025 },
  { lunarMonth: 9, lunarDay: 9, name: "重阳节", icon: "👴", year: 2025 },
];

// ========================================
// 响应式数据
// ========================================

/** 当前显示的年月 */
const displayYear = ref(new Date().getFullYear());
const displayMonth = ref(new Date().getMonth() + 1);

/** 选中的日期 */
const selectedDate = ref(null);

/** 是否显示日期详情弹窗 */
const showDateDetail = ref(false);

/** 星期标题 */
const weekDays = ["日", "一", "二", "三", "四", "五", "六"];

// ========================================
// 计算属性
// ========================================

/** 当前日期信息 */
const currentDate = computed(() => {
  const now = new Date();
  const weekdays = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  const lunar = getLunarDate(now);

  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    weekday: weekdays[now.getDay()],
    lunar: lunar.lunarText,
    lunarFull: `${lunar.gzYear}${lunar.animal}年 ${lunar.lunarText}`,
  };
});

/** 农历日期文本 */
const lunarDate = computed(() => {
  return currentDate.value.lunar;
});

/** 距离周末的天数 */
const daysToWeekend = computed(() => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=周日, 1-6=周一到周六

  if (dayOfWeek === 0) return 6; // 今天是周日，距离下周日6天
  if (dayOfWeek === 6) return 1; // 今天是周六，距离明天周日1天
  return 6 - dayOfWeek; // 其他情况，距离本周日
});

/** 下一个节日信息 */
const nextFestival = computed(() => {
  const festivals = getAllUpcomingFestivals();
  return festivals.length > 0 ? festivals[0] : { name: "暂无", days: 0 };
});

/** 即将到来的节日列表 */
const upcomingFestivals = computed(() => {
  return getAllUpcomingFestivals().slice(0, 5);
});

/** 春节倒计时信息 */
const springFestivalCountdown = computed(() => {
  const today = new Date();
  const currentYear = today.getFullYear();
  
  // 使用 lunar-javascript 查找春节日期（农历正月初一）
  let springFestivalDate = null;
  
  // 遍历今年和明年的日期，找到最近的春节
  for (let year = currentYear; year <= currentYear + 1; year++) {
    // 春节通常在阳历1月21日至2月20日之间
    for (let month = 1; month <= 2; month++) {
      const startDay = month === 1 ? 21 : 1;
      const endDay = month === 1 ? 31 : 20;
      
      for (let day = startDay; day <= endDay; day++) {
        try {
          const date = new Date(year, month - 1, day);
          const lunar = getLunarDate(date);
          
          // 农历正月初一即为春节
          if (lunar.month === 1 && lunar.day === 1) {
            // 如果找到的春节在今天之后，就是我们要找的
            if (date >= today) {
              springFestivalDate = date;
              break;
            }
          }
        } catch (e) {
          continue;
        }
      }
      if (springFestivalDate) break;
    }
    if (springFestivalDate) break;
  }
  
  // 计算天数差
  const days = Math.ceil((springFestivalDate - today) / (1000 * 60 * 60 * 24));
  
  return {
    days: days,
    date: `${springFestivalDate.getFullYear()}年${springFestivalDate.getMonth() + 1}月${springFestivalDate.getDate()}日`
  };
});

/** 日历日期数组 */
const calendarDates = computed(() => {
  const dates = [];
  const firstDay = new Date(displayYear.value, displayMonth.value - 1, 1);
  const lastDay = new Date(displayYear.value, displayMonth.value, 0);

  const startDayOfWeek = firstDay.getDay(); // 当月第一天是星期几
  const daysInMonth = lastDay.getDate(); // 当月天数

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  // 上个月的日期
  const prevMonth = displayMonth.value === 1 ? 12 : displayMonth.value - 1;
  const prevMonthYear =
    displayMonth.value === 1 ? displayYear.value - 1 : displayYear.value;
  const prevMonthLastDay = new Date(prevMonthYear, prevMonth, 0).getDate();

  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i;
    const date = new Date(prevMonthYear, prevMonth - 1, day);
    const lunar = getLunarDate(date);
    const festival = getFestivalOnDate(date);

    dates.push({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: day,
      isCurrentMonth: false,
      isToday: false,
      lunar: lunar.lunarText.slice(-2), // 只显示日的部分
      lunarFull: lunar.lunarText,
      festival: null, // 非当月日期不显示节日
      weekdayIndex: date.getDay(),
    });
  }

  // 当月的日期
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(displayYear.value, displayMonth.value - 1, day);
    const lunar = getLunarDate(date);
    const festival = getFestivalOnDate(date);
    const isToday =
      displayYear.value === todayYear &&
      displayMonth.value === todayMonth &&
      day === todayDay;

    dates.push({
      year: displayYear.value,
      month: displayMonth.value,
      day: day,
      isCurrentMonth: true,
      isToday: isToday,
      lunar: lunar.lunarText.slice(-2),
      lunarFull: lunar.lunarText,
      festival: festival,
      weekdayIndex: date.getDay(),
    });
  }

  // 下个月的日期（补齐6行）
  const remainingCells = 42 - dates.length; // 6行 x 7列 = 42个格子
  const nextMonth = displayMonth.value === 12 ? 1 : displayMonth.value + 1;
  const nextMonthYear =
    displayMonth.value === 12 ? displayYear.value + 1 : displayYear.value;

  for (let day = 1; day <= remainingCells; day++) {
    const date = new Date(nextMonthYear, nextMonth - 1, day);
    const lunar = getLunarDate(date);

    dates.push({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: day,
      isCurrentMonth: false,
      isToday: false,
      lunar: lunar.lunarText.slice(-2),
      lunarFull: lunar.lunarText,
      festival: null, // 非当月日期不显示节日
      weekdayIndex: date.getDay(),
    });
  }

  return dates;
});

// ========================================
// 工具函数
// ========================================

/**
 * 获取指定日期的节日
 */
const getFestivalOnDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 检查固定节日
  const fixedFestival = fixedFestivals.find(
    (f) => f.month === month && f.day === day,
  );
  if (fixedFestival) return fixedFestival.name;

  // 检查农历节日
  const lunar = getLunarDate(date);
  const lunarFestival = lunarFestivals2025.find(
    (f) =>
      f.year === year &&
      f.lunarMonth === lunar.month &&
      f.lunarDay === lunar.day,
  );
  if (lunarFestival) return lunarFestival.name;

  return null;
};

/**
 * 获取所有即将到来的节日
 */
const getAllUpcomingFestivals = () => {
  const today = new Date();
  const festivals = [];

  // 添加固定节日
  fixedFestivals.forEach((festival) => {
    const festivalDate = new Date(
      today.getFullYear(),
      festival.month - 1,
      festival.day,
    );

    // 如果今年的节日已过，计算明年的
    if (festivalDate < today) {
      festivalDate.setFullYear(today.getFullYear() + 1);
    }

    const days = Math.ceil((festivalDate - today) / (1000 * 60 * 60 * 24));
    festivals.push({
      name: festival.name,
      icon: festival.icon,
      date: `${festivalDate.getFullYear()}年${festival.month}月${festival.day}日`,
      days: days,
    });
  });

  // 按天数排序
  festivals.sort((a, b) => a.days - b.days);

  return festivals;
};

// ========================================
// 事件处理函数
// ========================================

/**
 * 切换到上个月
 */
const prevMonth = () => {
  if (displayMonth.value === 1) {
    displayMonth.value = 12;
    displayYear.value--;
  } else {
    displayMonth.value--;
  }
};

/**
 * 切换到下个月
 */
const nextMonth = () => {
  if (displayMonth.value === 12) {
    displayMonth.value = 1;
    displayYear.value++;
  } else {
    displayMonth.value++;
  }
};

/**
 * 点击日期单元格
 */
const handleDateClick = (date) => {
  selectedDate.value = date;
  showDateDetail.value = true;
};
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

/* 日历主体 */
.calendar-section {
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
