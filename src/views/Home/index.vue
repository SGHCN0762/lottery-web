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
    <NewYearEveEntry :target-date="newYearEveDate" @click="goToNewYearEve" />

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
import { useRouter } from "vue-router";
import CustomCalendar from "./components/CustomCalendar.vue";
import HeaderCard from "./components/HeaderCard.vue";
import NewYearEveEntry from "./components/NewYearEveEntry.vue";
import UpcomingFestivals from "./components/UpcomingFestivals.vue";
import DateDetailModal from "./components/DateDetailModal.vue";
import { useLunar } from "./hooks/useLunar";
import { useFestivals } from "./hooks/useFestivals";
import { useCalendar } from "./hooks/useCalendar";
import { useCurrentDate } from "./hooks/useCurrentDate";
import { useNewYearEve } from "../../hooks/useNewYearEve";

const router = useRouter();

const goToNewYearEve = () => {
  // 跳转到新年倒计时页面
  router.push('/new-year-eve');
};

const { weekDays } = useLunar();
const { upcomingFestivals } = useFestivals();
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

const { currentDate } = useCurrentDate();
const { newYearEveDate } = useNewYearEve();
</script>

<style lang="less" scoped>
.calendar-page {
  min-height: 100vh;
  background: var(--color-bg-primary);
  padding-bottom: calc(var(--spacing-xl) + env(safe-area-inset-bottom, 0px));
}
</style>
