import { Solar } from "lunar-javascript";

/**
 * 获取农历日期
 * @param {Date} date - 阳历日期
 * @returns {Object} 农历信息对象
 */
export const getLunarDate = (date) => {
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
export const getLunarDay = (day) => {
  const nStr1 = ["日", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
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

export const useLunar = () => {
  const weekDays = ["日", "一", "二", "三", "四", "五", "六"];
  const weekdayNames = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

  return {
    weekDays,
    weekdayNames,
    getLunarDate,
    getLunarDay,
  };
};
