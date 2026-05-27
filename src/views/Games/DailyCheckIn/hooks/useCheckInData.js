/**
 * 每日签到功能 - 数据管理 Hook
 * 处理用户签到数据、积分、连续天数等状态管理
 */
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { showToast } from 'vant'
import dayjs from 'dayjs'
import { useAppData } from '@/hooks/useAppData'
import { STORAGE_KEYS, RECORD_LIMITS, CHECKIN_CONFIG } from '@/constants'

export function useCheckInData() {
  const { t } = useI18n()

  // 使用统一的数据管理 hook
  const { userPoints, addPoints, addRecord, loadAllData } = useAppData()

  // 响应式数据
  const consecutiveDays = ref(0)
  const lastCheckInDate = ref('')
  const hasCheckedInToday = ref(false)
  const checkInHistory = ref([])
  const checkedInDates = ref([])

  // 里程碑配置
  const milestones = ref([...CHECKIN_CONFIG.MILESTONES]);

  // 计算属性
  const canCheckIn = computed(() => {
    return !hasCheckedInToday.value;
  });

  /**
   * 加载用户数据
   */
  const loadUserData = () => {
    try {
      // 加载用户积分（使用统一数据管理）
      loadAllData();

      // 加载连续签到天数
      const savedConsecutive = localStorage.getItem(STORAGE_KEYS.CONSECUTIVE_DAYS);
      if (savedConsecutive) {
        consecutiveDays.value = parseInt(savedConsecutive) || 0;
      }

      // 加载上次签到日期
      const savedLastDate = localStorage.getItem(STORAGE_KEYS.LAST_CHECKIN_DATE);
      if (savedLastDate) {
        lastCheckInDate.value = savedLastDate;
      }

      // 加载签到历史记录
      const savedHistory = localStorage.getItem(STORAGE_KEYS.CHECKIN_HISTORY);
      if (savedHistory) {
        checkInHistory.value = JSON.parse(savedHistory);
      }

      // 加载本月签到日期列表
      const savedCheckedDates = localStorage.getItem(STORAGE_KEYS.CHECKED_DATES);
      if (savedCheckedDates) {
        checkedInDates.value = JSON.parse(savedCheckedDates);
      }
    } catch (error) {
      console.error('加载用户数据失败:', error);
    }
  };

  /**
   * 保存用户数据
   */
  const saveUserData = () => {
    try {
      // 积分由 useUserPoints 自动保存
      localStorage.setItem(STORAGE_KEYS.CONSECUTIVE_DAYS, consecutiveDays.value.toString());
      localStorage.setItem(STORAGE_KEYS.LAST_CHECKIN_DATE, lastCheckInDate.value);
      localStorage.setItem(STORAGE_KEYS.CHECKIN_HISTORY, JSON.stringify(checkInHistory.value));
      localStorage.setItem(STORAGE_KEYS.CHECKED_DATES, JSON.stringify(checkedInDates.value));
    } catch (error) {
      console.error('保存用户数据失败:', error);
    }
  };

  /**
   * 检查今日签到状态
   */
  const checkTodayStatus = () => {
    const today = dayjs().format('YYYY-MM-DD');
    hasCheckedInToday.value = lastCheckInDate.value === today;

    // 检查是否中断连续签到
    if (lastCheckInDate.value) {
      const lastDate = dayjs(lastCheckInDate.value);
      const yesterday = dayjs().subtract(1, 'day').startOf('day');

      // 如果上次签到早于昨天，说明中断了连续签到
      if (lastDate.isBefore(yesterday)) {
        consecutiveDays.value = 0;
        saveUserData();
      }
    }
  };

  /**
   * 计算连续签到奖励
   */
  const calculateConsecutiveBonus = days => {
    let bonus = 0;

    // 遍历所有里程碑，找到最高可达成的奖励
    milestones.value.forEach(milestone => {
      if (days >= milestone.days) {
        bonus = milestone.bonus;
      }
    });

    return bonus;
  };

  /**
   * 获取里程碑状态文本
   */
  const getMilestoneStatus = milestone => {
    if (consecutiveDays.value >= milestone.days) {
      return t('dailyCheckIn.milestone.achieved');
    } else if (consecutiveDays.value === milestone.days - 1) {
      return t('dailyCheckIn.milestone.oneDayLeft');
    } else {
      return t('dailyCheckIn.milestone.daysLeft', { days: milestone.days - consecutiveDays.value });
    }
  };

  /**
   * 执行签到操作
   */
  const handleCheckIn = async () => {
    // 验证签到条件
    if (!canCheckIn.value) return;

    const today = dayjs().format('YYYY-MM-DD');

    // 判断是否连续签到
    const yesterdayStr = dayjs().subtract(1, 'day').format('YYYY-MM-DD');

    if (lastCheckInDate.value === yesterdayStr) {
      // 昨天也签到了，连续天数+1
      consecutiveDays.value++;
    } else {
      // 中断后重新签到，从1开始
      consecutiveDays.value = 1;
    }

    // 计算奖励积分
    const basePoints = CHECKIN_CONFIG.BASE_POINTS; // 基础签到奖励
    const bonusPoints = calculateConsecutiveBonus(consecutiveDays.value);
    const totalPoints = basePoints + bonusPoints;

    // 更新用户积分（使用共享 hook）
    addPoints(totalPoints);

    // 更新签到状态
    lastCheckInDate.value = today;
    hasCheckedInToday.value = true;

    // 创建签到记录
    const record = {
      date: today,
      displayDate: formatDisplayDate(today),
      consecutiveDays: consecutiveDays.value,
      basePoints,
      bonus: bonusPoints,
      totalPoints,
      timestamp: dayjs().valueOf(),
    };

    // 添加到历史记录开头
    checkInHistory.value.unshift(record);

    // 只保留最近30条记录
    if (checkInHistory.value.length > RECORD_LIMITS.CHECKIN_HISTORY) {
      checkInHistory.value = checkInHistory.value.slice(0, RECORD_LIMITS.CHECKIN_HISTORY);
    }

    // 添加到本月签到日期列表
    if (!checkedInDates.value.includes(today)) {
      checkedInDates.value.push(today);
    }

    // 保存所有数据
    saveUserData();

    // 添加到游戏记录
    addRecord({
      gameType: 'dailyCheckIn',
      gameName: t('lottery.dailyCheckIn'),
      result: '签到',
      pointsChange: totalPoints,
      timestamp: dayjs().valueOf()
    });

    // 显示成功提示
    let message = t('dailyCheckIn.success.base', { points: basePoints });

    if (bonusPoints > 0) {
      message += t('dailyCheckIn.success.bonus', {
        days: consecutiveDays.value,
        points: bonusPoints,
      });
    }

    showToast({
      message,
      type: 'success',
      duration: 2500,
    });

    return {
      basePoints,
      bonusPoints,
      totalPoints,
      consecutiveDays: consecutiveDays.value,
    };
  };

  // 返回状态和方法
  return {
    // 数据
    userPoints,
    consecutiveDays,
    hasCheckedInToday,
    checkInHistory,
    milestones,

    // 计算属性
    canCheckIn,

    // 方法
    loadUserData,
    saveUserData,
    checkTodayStatus,
    getMilestoneStatus,
    handleCheckIn,
  };
}

/**
 * 格式化日期为显示文本 (M月D日)
 */
function formatDisplayDate(dateStr) {
  return dayjs(dateStr).format('M月D日');
}
