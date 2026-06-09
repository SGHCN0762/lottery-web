<template>
  <div class="calendar-page">
    <div class="page-content">
      <!-- 性能优化：MapCard 懒加载 -->
      <MapCard v-if="MapCardLoaded" />

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

      <!-- 日期详情弹窗（异步加载） -->
      <DateDetailModal
        v-if="showDateDetail && DateDetailModal"
        v-model:show="showDateDetail"
        :date="selectedDate"
        @view-almanac="handleViewAlmanac"
      />

      <!-- 节日/节气详情弹窗（异步加载） -->
      <FestivalDetailModal
        v-if="showFestivalDetail && FestivalDetailModal"
        v-model:show="showFestivalDetail"
        :date="selectedDate"
        :name="selectedFestivalName"
        @view-almanac="handleViewAlmanac"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, shallowRef, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { showToast } from 'vant';
  import CustomCalendar from './components/CustomCalendar.vue';
  import HeaderCard from './components/HeaderCard.vue';
  import NewYearEveEntry from './components/NewYearEveEntry.vue';
  import UpcomingFestivals from './components/UpcomingFestivals.vue';
  import { useLunar } from './hooks/useLunar';
  import { useFestivals } from './hooks/useFestivals';
  import { useCalendar } from './hooks/useCalendar';
  import { useCurrentDate } from './hooks/useCurrentDate';
  import { useNewYearEve } from '../../hooks/useNewYearEve';
  import { getFestivalOrSolarTermInfo } from './data/festivalInfo';

  // ========================================
  // 性能优化：懒加载组件
  // ========================================
  const MapCard = shallowRef(null);
  const DateDetailModal = shallowRef(null);
  const FestivalDetailModal = shallowRef(null);
  const MapCardLoaded = ref(false);

  // 延迟加载 MapCard（非首屏关键组件）
  const loadMapCard = async () => {
    try {
      // 等待页面渲染完成后再加载地图组件
      await new Promise(resolve => setTimeout(resolve, 500));
      const module = await import('@/components/MapCard/index.vue');
      MapCard.value = module.default;
      MapCardLoaded.value = true;
    } catch (e) {
      console.error('Failed to load MapCard:', e);
    }
  };

  // 加载日期详情弹窗
  const loadDateDetailModal = () => {
    if (!DateDetailModal.value) {
      import('./components/DateDetailModal.vue').then(module => {
        DateDetailModal.value = module.default;
      });
    }
  };

  // 加载节日详情弹窗
  const loadFestivalDetailModal = () => {
    if (!FestivalDetailModal.value) {
      import('./components/FestivalDetailModal.vue').then(module => {
        FestivalDetailModal.value = module.default;
      });
    }
  };

  const router = useRouter();

  const goToNewYearEve = () => {
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
      showToast('暂无相关信息');
      return;
    }
    selectedDate.value = null;
    selectedFestivalName.value = festival.name;
    showFestivalDetail.value = true;
    loadFestivalDetailModal();
  };

  // 处理日期点击（来自日历）
  const handleDateClick = date => {
    selectedDate.value = date;
    if ((date.festival && getFestivalOrSolarTermInfo(date.festival)) || date.solarTerm) {
      selectedFestivalName.value = date.festival || date.solarTerm;
      showFestivalDetail.value = true;
      loadFestivalDetailModal();
    } else {
      showDateDetail.value = true;
      loadDateDetailModal();
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

  // 组件挂载后延迟加载非关键组件
  onMounted(() => {
    // 使用 requestIdleCallback 或 setTimeout 延迟加载 MapCard
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadMapCard, { timeout: 2000 });
    } else {
      setTimeout(loadMapCard, 500);
    }
  });
</script>

<style lang="less" scoped>
  .calendar-page {
    min-height: 100%;
    background: var(--color-bg-primary);
  }

  .page-content {
    padding-top: calc(var(--spacing-sm) + env(safe-area-inset-top, 0px));
    padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom, 0px));
    display: flow-root;
  }
</style>