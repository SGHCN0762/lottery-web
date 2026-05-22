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
    <UpcomingFestivals :festivals="upcomingFestivals" @festival-click="handleFestivalClick" />

    <!-- 日期详情弹窗 -->
    <DateDetailModal
      v-model:show="showDateDetail"
      :date="showDateDetail ? selectedDate : {}"
      @view-almanac="handleViewAlmanac"
    />

    <!-- 节日/节气详情弹窗 -->
    <FestivalDetailModal v-model:show="showFestivalDetail" :name="selectedFestivalName" />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { showToast } from 'vant';
  import CustomCalendar from './components/CustomCalendar.vue';
  import HeaderCard from './components/HeaderCard.vue';
  import NewYearEveEntry from './components/NewYearEveEntry.vue';
  import UpcomingFestivals from './components/UpcomingFestivals.vue';
  import DateDetailModal from './components/DateDetailModal.vue';
  import FestivalDetailModal from './components/FestivalDetailModal.vue';
  import { useLunar } from './hooks/useLunar';
  import { useFestivals } from './hooks/useFestivals';
  import { useCalendar } from './hooks/useCalendar';
  import { useCurrentDate } from './hooks/useCurrentDate';
  import { useNewYearEve } from '../../hooks/useNewYearEve';
  import { getFestivalOrSolarTermInfo } from './data/festivalInfo';

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
    calendarDates,
  } = useCalendar();

  const { currentDate } = useCurrentDate();
  const { newYearEveDate } = useNewYearEve();

  // 节日详情弹窗状态
  const showFestivalDetail = ref(false);
  const selectedFestivalName = ref('');

  // 处理节日点击（来自列表）
  const handleFestivalClick = festival => {
    if (!getFestivalOrSolarTermInfo(festival.name)) {
      // 如果没有找到详情，显示提示
      showToast('暂无相关信息');
      return;
    }
    selectedFestivalName.value = festival.name;
    showFestivalDetail.value = true;
  };

  // 处理日期点击（来自日历）
  const handleDateClick = date => {
    // 如果有节日或节气，显示详情弹窗
    if ((date.festival && getFestivalOrSolarTermInfo(date.festival)) || date.solarTerm) {
      selectedFestivalName.value = date.festival || date.solarTerm;
      showFestivalDetail.value = true;
    } else {
      // 否则显示日期详情弹窗
      selectedDate.value = date;
      showDateDetail.value = true;
    }
  };

  // 查看黄历 - 跳转到新页面
  const handleViewAlmanac = date => {
    router.push({
      path: '/home/almanac-detail',
      query: {
        year: date.year,
        month: date.month,
        day: date.day,
      },
    });
  };
</script>
