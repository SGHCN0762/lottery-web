import { Solar } from 'lunar-javascript';

/**
 * 获取农历日期
 * @param {Date} date - 阳历日期
 * @returns {Object} 农历信息对象
 */
export const getLunarDate = date => {
  const solar = Solar.fromDate(date);
  const lunar = solar.getLunar();

  return {
    year: lunar.getYear(),
    month: lunar.getMonth(),
    day: lunar.getDay(),
    isLeap: lunar.getMonth() < 0,
    lunarText: lunar.getMonthInChinese() + '月' + lunar.getDayInChinese(),
    gzYear: lunar.getYearInGanZhi(),
    animal: lunar.getYearShengXiao(),
  };
};

/**
 * 获取农历日的简称（用于日历网格显示）
 */
export const getLunarDay = day => {
  const nStr1 = ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  const nStr2 = ['初', '十', '廿', '卅'];

  if (day === 1) return '初一';
  if (day === 10) return '初十';
  if (day === 20) return '二十';
  if (day === 30) return '三十';
  if (day < 10) return '初' + nStr1[day - 1];
  if (day < 20) return '十' + nStr1[day - 10];
  if (day < 30) return '廿' + nStr1[day - 20];
  return '卅' + nStr1[day - 30];
};

/**
 * 获取黄历详细信息（道教文化）
 * @param {Date} date - 阳历日期
 * @returns {Object} 黄历信息对象
 */
export const getAlmanacInfo = date => {
  try {
    const solar = Solar.fromDate(date);
    const lunar = solar.getLunar();

    // 获取干支纪年、月、日、时
    const gzYear = lunar.getYearInGanZhi();
    const gzMonth = lunar.getMonthInGanZhi();
    const gzDay = lunar.getDayInGanZhi();

    // 获取宜忌
    const yi = lunar.getDayYi(); // 宜
    const ji = lunar.getDayJi(); // 忌

    // 过滤无效占位符
    const filterInvalidItems = items => {
      if (!items || !Array.isArray(items)) return [];
      const invalidKeywords = ['无', '诸事不宜', '不宜'];
      return items.filter(item => {
        const trimmed = item?.trim();
        return trimmed && !invalidKeywords.includes(trimmed);
      });
    };

    const filteredYi = filterInvalidItems(yi);
    const filteredJi = filterInvalidItems(ji);

    // 综合判断今日吉凶（基于过滤后的有效事项）
    const yiCount = filteredYi.length;
    const jiCount = filteredJi.length;
    const diff = yiCount - jiCount;

    // 四分类吉凶判断
    let luckLevel; // 'great', 'good', 'normal', 'bad'
    let luckText; // '大吉', '小吉', '平日', '凶日'

    if (diff >= 3) {
      luckLevel = 'great';
      luckText = '大吉';
    } else if (diff > 0) {
      luckLevel = 'good';
      luckText = '小吉';
    } else if (diff === 0) {
      luckLevel = 'normal';
      luckText = '平日';
    } else {
      luckLevel = 'bad';
      luckText = '凶日';
    }

    // 获取冲煞
    const chong = lunar.getDayChongDesc(); // 冲
    const sha = lunar.getDaySha(); // 煞

    // 获取彭祖百忌
    const pengZuGan = lunar.getPengZuGan();
    const pengZuZhi = lunar.getPengZuZhi();

    // 获取二十八星宿
    const xiu = lunar.getXiu();
    const xiuLuck = lunar.getXiuLuck();

    // 获取十二建除（使用正确的方法名）
    let jianChu = '';
    try {
      // 尝试不同的方法名
      if (typeof lunar.getZhiXing === 'function') {
        jianChu = lunar.getZhiXing();
      } else if (typeof lunar.getJianChu === 'function') {
        jianChu = lunar.getJianChu();
      }
    } catch (e) {
      console.warn('获取建除信息失败:', e);
    }

    // 获取胎神方位
    const taiShen = lunar.getDayPositionTai();

    // 获取吉神凶煞
    const jiShen = lunar.getDayJiShen();
    const xiongSha = lunar.getDayXiongSha();

    // 获取纳音（添加安全检查）
    let naYin = '';
    try {
      if (typeof lunar.getNaYin === 'function') {
        naYin = lunar.getNaYin();
      } else if (typeof lunar.getDayNaYin === 'function') {
        naYin = lunar.getDayNaYin();
      }
    } catch (e) {
      console.warn('获取纳音信息失败:', e);
    }

    return {
      // 基本信息
      gzYear,
      gzMonth,
      gzDay,
      naYin,

      // 宜忌（返回过滤后的数据）
      yi: filteredYi,
      ji: filteredJi,

      // 冲煞
      chong,
      sha,

      // 彭祖百忌
      pengZuGan,
      pengZuZhi,

      // 星宿
      xiu,
      xiuLuck,

      // 建除
      jianChu,

      // 胎神
      taiShen,

      // 吉凶神煞
      jiShen: jiShen || [],
      xiongSha: xiongSha || [],

      // 综合判断今日吉凶（四分类）
      isGoodDay: diff > 0, // 保持向后兼容：大吉和小吉都算吉日
      luckLevel, // 吉凶等级：'great', 'good', 'normal', 'bad'
      luckText, // 吉凶文本：'大吉', '小吉', '平日', '凶日'
      yiCount, // 宜事项数量
      jiCount, // 忌事项数量
    };
  } catch (e) {
    console.error('获取黄历信息失败:', e);
    return null;
  }
};

/**
 * 获取婚嫁吉日建议
 * @param {Date} startDate - 开始日期
 * @param {number} days - 搜索天数范围
 * @returns {Array} 适合婚嫁的日期列表
 */
export const getWeddingDays = (startDate = new Date(), days = 30) => {
  const weddingDays = [];

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const almanac = getAlmanacInfo(date);
    if (!almanac) continue;

    // 检查是否宜嫁娶
    if (almanac.yi.includes('嫁娶') || almanac.yi.includes('结婚')) {
      weddingDays.push({
        date: date,
        dateStr: `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`,
        weekDay: ['日', '一', '二', '三', '四', '五', '六'][date.getDay()],
        almanac,
      });
    }
  }

  return weddingDays;
};

/**
 * 获取搬家吉日建议
 * @param {Date} startDate - 开始日期
 * @param {number} days - 搜索天数范围
 * @returns {Array} 适合搬家的日期列表
 */
export const getMovingDays = (startDate = new Date(), days = 30) => {
  const movingDays = [];

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const almanac = getAlmanacInfo(date);
    if (!almanac) continue;

    // 检查是否宜入宅/移徙
    if (almanac.yi.includes('入宅') || almanac.yi.includes('移徙') || almanac.yi.includes('搬家')) {
      movingDays.push({
        date: date,
        dateStr: `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`,
        weekDay: ['日', '一', '二', '三', '四', '五', '六'][date.getDay()],
        almanac,
      });
    }
  }

  return movingDays;
};

/**
 * 获取开业吉日建议
 * @param {Date} startDate - 开始日期
 * @param {number} days - 搜索天数范围
 * @returns {Array} 适合开业的日期列表
 */
export const getOpeningDays = (startDate = new Date(), days = 30) => {
  const openingDays = [];

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const almanac = getAlmanacInfo(date);
    if (!almanac) continue;

    // 检查是否宜开市/开业
    if (almanac.yi.includes('开市') || almanac.yi.includes('开业') || almanac.yi.includes('开工')) {
      openingDays.push({
        date: date,
        dateStr: `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`,
        weekDay: ['日', '一', '二', '三', '四', '五', '六'][date.getDay()],
        almanac,
      });
    }
  }

  return openingDays;
};

export const useLunar = () => {
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const weekdayNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

  return {
    weekDays,
    weekdayNames,
    getLunarDate,
    getLunarDay,
    getAlmanacInfo,
    getWeddingDays,
    getMovingDays,
    getOpeningDays,
  };
};
