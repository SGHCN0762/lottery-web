import { computed } from "vue";
import { getLunarDate } from "./useLunar";
import { Solar } from "lunar-javascript";

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

const lunarFestivals = [
  { lunarMonth: 1, lunarDay: 1, name: "春节", icon: "🧧" },
  { lunarMonth: 1, lunarDay: 15, name: "元宵节", icon: "🏮" },
  { lunarMonth: 5, lunarDay: 5, name: "端午节", icon: "🐲" },
  { lunarMonth: 7, lunarDay: 7, name: "七夕节", icon: "💕" },
  { lunarMonth: 8, lunarDay: 15, name: "中秋节", icon: "🥮" },
  { lunarMonth: 9, lunarDay: 9, name: "重阳节", icon: "👴" },
];

// 二十四节气映射表
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

export const useFestivals = () => {
  const getFestivalOnDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const fixedFestival = fixedFestivals.find((f) => f.month === month && f.day === day);
    if (fixedFestival) return fixedFestival.name;

    const lunar = getLunarDate(date);
    const lunarFestival = lunarFestivals.find(
      (f) => f.lunarMonth === lunar.month && f.lunarDay === lunar.day
    );
    if (lunarFestival) return lunarFestival.name;

    return null;
  };

  // 获取当天的节气名称
  const getSolarTermOnDate = (date) => {
    try {
      const solar = Solar.fromDate(date);
      const lunar = solar.getLunar();
      const jieQi = lunar.getJieQi();
      return jieQi || null;
    } catch (e) {
      return null;
    }
  };

  const getAllUpcomingFestivals = () => {
    const today = new Date();
    const festivals = [];

    // 处理阳历节日
    fixedFestivals.forEach((festival) => {
      const festivalDate = new Date(today.getFullYear(), festival.month - 1, festival.day);
      if (festivalDate < today) {
        festivalDate.setFullYear(today.getFullYear() + 1);
      }
      const days = Math.ceil((festivalDate - today) / (1000 * 60 * 60 * 24));
      festivals.push({
        name: festival.name,
        icon: festival.icon,
        date: `${festivalDate.getFullYear()}年${festival.month}月${festival.day}日`,
        days: days,
      });
    });

    // 处理农历节日
    lunarFestivals.forEach((festival) => {
      let festivalDate = null;
      
      // 查找今年和明年的对应农历日期
      for (let year = today.getFullYear(); year <= today.getFullYear() + 1; year++) {
        // 遍历可能的公历日期范围（农历月份对应的公历月份可能有偏差）
        for (let month = 1; month <= 12; month++) {
          const startDay = 1;
          const endDay = new Date(year, month, 0).getDate(); // 获取该月最后一天
          
          for (let day = startDay; day <= endDay; day++) {
            try {
              const date = new Date(year, month - 1, day);
              const lunar = getLunarDate(date);
              
              // 匹配农历月和日
              if (lunar.month === festival.lunarMonth && lunar.day === festival.lunarDay) {
                if (date >= today) {
                  festivalDate = date;
                  break;
                }
              }
            } catch (e) {
              continue;
            }
          }
          if (festivalDate) break;
        }
        if (festivalDate) break;
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

    // 处理二十四节气
    for (let year = today.getFullYear(); year <= today.getFullYear() + 1; year++) {
      for (let month = 1; month <= 12; month++) {
        const startDay = 1;
        const endDay = new Date(year, month, 0).getDate();
        
        for (let day = startDay; day <= endDay; day++) {
          try {
            const date = new Date(year, month - 1, day);
            
            // 跳过过去的日期
            if (date < today) continue;
            
            const solar = Solar.fromDate(date);
            const lunar = solar.getLunar();
            const jieQi = lunar.getJieQi(); // 获取节气
            
            if (jieQi && solarTermsMap[jieQi]) {
              const days = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
              festivals.push({
                name: jieQi,
                icon: solarTermsMap[jieQi],
                date: `${year}年${month}月${day}日`,
                days: days,
              });
            }
          } catch (e) {
            continue;
          }
        }
      }
    }

    festivals.sort((a, b) => a.days - b.days);
    return festivals;
  };

  const nextFestival = computed(() => {
    const festivals = getAllUpcomingFestivals();
    return festivals.length > 0 ? festivals[0] : { name: "暂无", days: 0 };
  });

  const upcomingFestivals = computed(() => {
    return getAllUpcomingFestivals().slice(0, 5);
  });

  const springFestivalCountdown = computed(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
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
              if (date >= today) {
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
