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

    <!-- 春节倒计时入口卡片 -->
    <SpringFestivalEntry 
      :days="springFestivalCountdown.days" 
      @click="goToSpringFestival"
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
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { Icon as VanIcon, Popup as VanPopup, showToast } from "vant";
import CustomCalendar from "@/components/CustomCalendar.vue";
import HeaderCard from "./components/HeaderCard.vue";
import SpringFestivalEntry from "./components/SpringFestivalEntry.vue";
import UpcomingFestivals from "./components/UpcomingFestivals.vue";
import DateDetailModal from "./components/DateDetailModal.vue";
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
</style>
