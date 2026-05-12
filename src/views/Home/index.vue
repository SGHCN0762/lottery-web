<template>
  <div class="calendar-page">
    <!-- 顶部信息卡片 -->
    <HeaderCard :current-date="currentDate" />

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

    <!-- 除夕倒计时入口卡片 -->
    <NewYearEveEntry
      :target-date="newYearEveDate"
      @click="goToNewYearEve"
    />

    <!-- 即将到来的节日列表 -->
    <UpcomingFestivals :festivals="upcomingFestivals" />

    <!-- 日期详情弹窗 -->
    <DateDetailModal
      v-model:show="showDateDetail"
      :date="showDateDetail ? selectedDate : {}"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import CustomCalendar from "./components/CustomCalendar.vue";
import HeaderCard from "./components/HeaderCard.vue";
import NewYearEveEntry from "./components/NewYearEveEntry.vue";
import UpcomingFestivals from "./components/UpcomingFestivals.vue";
import DateDetailModal from "./components/DateDetailModal.vue";
import { useLunar } from "@/hooks/useLunar";
import { useFestivals } from "@/hooks/useFestivals";
import { useCalendar } from "@/hooks/useCalendar";

const router = useRouter();

const goToNewYearEve = () => {
  router.push("/new-year-eve");
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

// 计算今年除夕日期（农历腊月三十）
const newYearEveDate = computed(() => {
  // 获取当前年份
  const currentYear = new Date().getFullYear();
  console.log('当前年份:', currentYear);

  // 使用与 springFestivalCountdown 相同的逻辑查找春节日期
  let springFestivalDate = null;

  for (let year = currentYear; year <= currentYear + 1; year++) {
    for (let month = 1; month <= 2; month++) {
      const startDay = month === 1 ? 21 : 1;
      const endDay = month === 1 ? 31 : 20;

      for (let day = startDay; day <= endDay; day++) {
        try {
          const date = new Date(year, month - 1, day);
          const lunar = getLunarDate(date);
          if (lunar.month === 1 && lunar.day === 1) {
            if (date >= new Date()) {
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

  console.log('春节日期:', springFestivalDate);

  if (!springFestivalDate) {
    console.error('无法计算春节日期，使用默认值');
    return new Date(currentYear + 1, 1, 10); // 默认值
  }

  // 除夕是春节的前一天
  const newYearEve = new Date(springFestivalDate);
  newYearEve.setDate(newYearEve.getDate() - 1);
  console.log('除夕日期:', newYearEve);

  // 确保返回的是有效的日期对象
  if (isNaN(newYearEve.getTime())) {
    console.error('计算出的除夕日期无效');
    return new Date(currentYear + 1, 1, 9); // 回退到默认值
  }

  // 返回一个新的 Date 对象，确保引用独立性
  return newYearEve;
});
</script>

<style lang="less" scoped>
.calendar-page {
  min-height: 100vh;
  background: var(--color-bg-primary);
  padding-bottom: calc(var(--spacing-xl) + env(safe-area-inset-bottom, 0px));
}
</style>
