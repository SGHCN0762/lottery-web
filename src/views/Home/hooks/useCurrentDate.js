import { computed } from 'vue';
import { useLunar } from './useLunar';

export function useCurrentDate() {
  const { weekdayNames, getLunarDate } = useLunar();

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

  return {
    currentDate,
    lunarDate,
    daysToWeekend
  };
}