import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const almanacCache = new Map();
const CACHE_MAX_SIZE = 50;

export const useAlmanacDetail = () => {
  const route = useRoute();

  const almanac = ref(null);
  const lunarInfo = ref(null);

  const dateStr = computed(() => {
    const year = route.query.year;
    const month = route.query.month;
    const day = route.query.day;

    if (!year || !month || !day) return '';
    return `${year}年${month}月${day}日`;
  });

  const getDateFromQuery = () => {
    const year = parseInt(route.query.year);
    const month = parseInt(route.query.month) - 1;
    const day = parseInt(route.query.day);

    if (!year || isNaN(month) || !day) return null;
    return new Date(year, month, day);
  };

  const initAlmanacData = async () => {
    const date = getDateFromQuery();
    if (!date) {
      return;
    }

    const cacheKey = date.toISOString().split('T')[0];

    if (almanacCache.has(cacheKey)) {
      const cached = almanacCache.get(cacheKey);
      almanac.value = cached.almanac;
      lunarInfo.value = cached.lunarInfo;
      return;
    }

    try {
      const { getAlmanacInfo, getLunarDate } = await import('@/views/Home/hooks/useLunar');

      almanac.value = getAlmanacInfo(date);
      lunarInfo.value = getLunarDate(date);

      if (almanacCache.size >= CACHE_MAX_SIZE) {
        const firstKey = almanacCache.keys().next().value;
        almanacCache.delete(firstKey);
      }

      almanacCache.set(cacheKey, {
        almanac: almanac.value,
        lunarInfo: lunarInfo.value,
      });
    } catch (error) {
      console.error('获取黄历信息失败:', error);
      almanac.value = null;
      lunarInfo.value = null;
    }
  };

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
