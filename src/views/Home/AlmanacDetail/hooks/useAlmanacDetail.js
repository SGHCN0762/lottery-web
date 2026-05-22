import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getAlmanacInfo, getLunarDate } from '@/views/Home/hooks/useLunar';

export const useAlmanacDetail = () => {
  const route = useRoute();

  const almanac = ref(null);
  const lunarInfo = ref(null);

  // 日期字符串
  const dateStr = computed(() => {
    const year = route.query.year;
    const month = route.query.month;
    const day = route.query.day;

    if (!year || !month || !day) return '';
    return `${year}年${month}月${day}日`;
  });

  // 获取日期对象
  const getDateFromQuery = () => {
    const year = parseInt(route.query.year);
    const month = parseInt(route.query.month) - 1; // JavaScript月份从0开始
    const day = parseInt(route.query.day);

    if (!year || isNaN(month) || !day) return null;
    return new Date(year, month, day);
  };

  // 初始化数据
  const initAlmanacData = () => {
    const date = getDateFromQuery();
    if (date) {
      almanac.value = getAlmanacInfo(date);
      lunarInfo.value = getLunarDate(date);
    }
  };

  // 滚动到时辰吉凶部分
  const scrollToTimeLuck = () => {
    const timeLuckSection = document.querySelector('.time-luck-section');
    if (timeLuckSection) {
      timeLuckSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  onMounted(() => {
    initAlmanacData();
  });

  return {
    almanac,
    lunarInfo,
    dateStr,
    initAlmanacData,
    scrollToTimeLuck,
  };
};
