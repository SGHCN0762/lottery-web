import { computed } from 'vue';
import { useLunar } from '../views/Home/hooks/useLunar';

export function useNewYearEve() {
  const { getLunarDate } = useLunar();

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

  return {
    newYearEveDate
  };
}