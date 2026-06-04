import { computed } from "vue";
import { getLunarDate } from "./useLunar";
import * as LunarModule from "lunar-javascript";
const { Solar } = LunarModule;

// ========================================
// 性能优化：节日数据缓存
// ========================================
const festivalCache = new Map();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24小时缓存

// ========================================
// 固定节日数据（阳历）
// ========================================
const fixedFestivals = [
  { month: 1, day: 1, name: "元旦", icon: "🎆" },
  { month: 2, day: 14, name: "情人节", icon: "💝" },
  { month: 3, day: 8, name: "妇女节", icon: "👩" },
  { month: 3, day: 12, name: "植树节", icon: "🌳" },
  { month: 4, day: 1, name: "愚人节", icon: "🃏" },
  { month: 5, day: 1, name: "劳动节", icon: "👷" },
  { month: 5, day: 4, name: "青年节", icon: "🎓" },
  { month: 6, day: 1, name: "儿童节", icon: "🎈" },
  { month: 7, day: 1, name: "建党节", icon: "🚩" },
  { month: 8, day: 1, name: "建军节", icon: "🎖️" },
  { month: 9, day: 10, name: "教师节", icon: "👨‍🏫" },
  { month: 10, day: 1, name: "国庆节", icon: "🇨🇳" },
  { month: 12, day: 25, name: "圣诞节", icon: "🎄" },
];

// ========================================
// 农历节日数据
// ========================================
const lunarFestivals = [
  { lunarMonth: 1, lunarDay: 1, name: "春节", icon: "🧧" },
  { lunarMonth: 1, lunarDay: 15, name: "元宵节", icon: "🏮" },
  { lunarMonth: 5, lunarDay: 5, name: "端午节", icon: "🐲" },
  { lunarMonth: 7, lunarDay: 7, name: "七夕节", icon: "💕" },
  { lunarMonth: 8, lunarDay: 15, name: "中秋节", icon: "🥮" },
  { lunarMonth: 9, lunarDay: 9, name: "重阳节", icon: "👴" },
];

// ========================================
// 二十四节气映射表
// ========================================
const solarTermsMap = {
  "立春": "🌱",
  "雨水": "🌧️",
  "惊蛰": "⚡",
  "春分": "🌸",
  "清明": "🌿",
  "谷雨": "🌾",
  "立夏": "☀️",
  "小满": "🌾",
  "芒种": "🌾",
  "夏至": "☀️",
  "小暑": "🔥",
  "大暑": "🔥",
  "立秋": "🍂",
  "处暑": "🍂",
  "白露": "💧",
  "秋分": "🍁",
  "寒露": "❄️",
  "霜降": "❄️",
  "立冬": "❄️",
  "小雪": "❄️",
  "大雪": "❄️",
  "冬至": "❄️",
  "小寒": "❄️",
  "大寒": "❄️",
};

// ========================================
// 预计算的节气日期（2024-2025年）
// 性能优化：避免运行时大量计算
// ========================================
const precomputedSolarTerms = {
  2024: {
    2: { 4: "立春", 19: "雨水" },
    3: { 6: "惊蛰", 20: "春分" },
    4: { 4: "清明", 20: "谷雨" },
    5: { 5: "立夏", 20: "小满" },
    6: { 5: "芒种", 21: "夏至" },
    7: { 7: "小暑", 23: "大暑" },
    8: { 8: "立秋", 23: "处暑" },
    9: { 7: "白露", 23: "秋分" },
    10: { 8: "寒露", 24: "霜降" },
    11: { 7: "立冬", 22: "小雪" },
    12: { 7: "大雪", 21: "冬至" },
  },
  2025: {
    1: { 5: "小寒", 20: "大寒" },
    2: { 3: "立春", 18: "雨水" },
    3: { 5: "惊蛰", 20: "春分" },
    4: { 4: "清明", 19: "谷雨" },
    5: { 5: "立夏", 20: "小满" },
    6: { 5: "芒种", 21: "夏至" },
    7: { 7: "小暑", 23: "大暑" },
    8: { 8: "立秋", 23: "处暑" },
    9: { 7: "白露", 23: "秋分" },
    10: { 8: "寒露", 23: "霜降" },
    11: { 7: "立冬", 22: "小雪" },
    12: { 7: "大雪", 21: "冬至" },
  },
};

// ========================================
// 辅助函数：获取缓存键
// ========================================
const getCacheKey = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

// ========================================
// 辅助函数：获取指定年份的下一个节日日期
// ========================================
const findLunarFestivalDate = (festival, year) => {
  const targetLunarMonth = festival.lunarMonth;
  const targetLunarDay = festival.lunarDay;
  
  // 农历正月初一对应的公历日期范围通常在1月21日到2月20日之间
  // 其他月份大致对应公历月份±1
  const startMonth = targetLunarMonth === 1 ? 1 : targetLunarMonth - 1;
  const endMonth = targetLunarMonth === 1 ? 2 : targetLunarMonth + 1;
  
  for (let month = startMonth; month <= endMonth; month++) {
    const daysInMonth = new Date(year, month, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      try {
        const date = new Date(year, month - 1, day);
        const lunar = getLunarDate(date);
        if (lunar.month === targetLunarMonth && lunar.day === targetLunarDay) {
          return date;
        }
      } catch (e) {
        continue;
      }
    }
  }
  return null;
};

export const useFestivals = () => {
  // ========================================
  // 获取指定日期的节日名称
  // ========================================
  const getFestivalOnDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // 先检查阳历节日
    const fixedFestival = fixedFestivals.find((f) => f.month === month && f.day === day);
    if (fixedFestival) return fixedFestival.name;

    // 再检查农历节日
    const lunar = getLunarDate(date);
    const lunarFestival = lunarFestivals.find(
      (f) => f.lunarMonth === lunar.month && f.lunarDay === lunar.day
    );
    if (lunarFestival) return lunarFestival.name;

    return null;
  };

  // ========================================
  // 获取当天的节气名称（使用预计算数据优化性能）
  // ========================================
  const getSolarTermOnDate = (date) => {
    try {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      
      // 先从预计算数据中查找
      if (precomputedSolarTerms[year] && precomputedSolarTerms[year][month]) {
        if (precomputedSolarTerms[year][month][day]) {
          return precomputedSolarTerms[year][month][day];
        }
      }
      
      // 回退到运行时计算
      const solar = Solar.fromDate(date);
      const lunar = solar.getLunar();
      const jieQi = lunar.getJieQi();
      return jieQi || null;
    } catch (e) {
      return null;
    }
  };

  // ========================================
  // 获取所有即将到来的节日（带缓存）
  // ========================================
  const getAllUpcomingFestivals = () => {
    const today = new Date();
    const todayKey = getCacheKey(today);
    const now = Date.now();
    
    // 检查缓存
    if (festivalCache.has(todayKey)) {
      const cached = festivalCache.get(todayKey);
      if (now - cached.timestamp < CACHE_TTL) {
        return cached.data;
      }
    }

    const festivals = [];
    const currentYear = today.getFullYear();

    // 优化：处理阳历节日（简单直接，无需计算农历）
    fixedFestivals.forEach((festival) => {
      const festivalDate = new Date(currentYear, festival.month - 1, festival.day);
      if (festivalDate < today) {
        festivalDate.setFullYear(currentYear + 1);
      }
      const days = Math.ceil((festivalDate - today) / (1000 * 60 * 60 * 24));
      festivals.push({
        name: festival.name,
        icon: festival.icon,
        date: `${festivalDate.getFullYear()}年${festival.month}月${festival.day}日`,
        days: days,
      });
    });

    // 优化：处理农历节日（限制搜索范围）
    lunarFestivals.forEach((festival) => {
      let festivalDate = null;
      
      // 只搜索今年和明年
      for (let year = currentYear; year <= currentYear + 1; year++) {
        festivalDate = findLunarFestivalDate(festival, year);
        if (festivalDate && festivalDate >= today) {
          break;
        }
      }
      
      if (festivalDate) {
        const days = Math.ceil((festivalDate - today) / (1000 * 60 * 60 * 24));
        festivals.push({
          name: festival.name,
          icon: festival.icon,
          date: `${festivalDate.getFullYear()}年${festivalDate.getMonth() + 1}月${festivalDate.getDate()}日`,
          days: days,
        });
      }
    });

    // 优化：处理节气（使用预计算数据）
    for (let year = currentYear; year <= currentYear + 1; year++) {
      const yearData = precomputedSolarTerms[year];
      if (!yearData) continue;
      
      for (const [month, daysData] of Object.entries(yearData)) {
        for (const [day, jieQi] of Object.entries(daysData)) {
          const date = new Date(year, parseInt(month) - 1, parseInt(day));
          if (date < today) continue;
          
          const days = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
          festivals.push({
            name: jieQi,
            icon: solarTermsMap[jieQi] || "🌑",
            date: `${year}年${month}月${day}日`,
            days: days,
          });
        }
      }
    }

    festivals.sort((a, b) => a.days - b.days);
    
    // 缓存结果
    festivalCache.set(todayKey, {
      timestamp: now,
      data: festivals,
    });
    
    return festivals;
  };

  // ========================================
  // 下一个节日（computed）
  // ========================================
  const nextFestival = computed(() => {
    const festivals = getAllUpcomingFestivals();
    return festivals.length > 0 ? festivals[0] : { name: "暂无", days: 0 };
  });

  // ========================================
  // 即将到来的节日列表（computed，只取前5个）
  // ========================================
  const upcomingFestivals = computed(() => {
    return getAllUpcomingFestivals().slice(0, 5);
  });

  // ========================================
  // 春节倒计时（优化版）
  // ========================================
  const springFestivalCountdown = computed(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    let springFestivalDate = null;

    // 春节（农历正月初一）通常在公历1月21日至2月20日之间
    for (let year = currentYear; year <= currentYear + 1; year++) {
      springFestivalDate = findLunarFestivalDate(
        { lunarMonth: 1, lunarDay: 1 },
        year
      );
      if (springFestivalDate && springFestivalDate >= today) {
        break;
      }
    }

    const days = Math.ceil((springFestivalDate - today) / (1000 * 60 * 60 * 24));
    return {
      days: days,
      date: `${springFestivalDate.getFullYear()}年${springFestivalDate.getMonth() + 1}月${springFestivalDate.getDate()}日`,
    };
  });

  return {
    getFestivalOnDate,
    getSolarTermOnDate,
    nextFestival,
    upcomingFestivals,
    springFestivalCountdown,
  };
};