/**
 * 每日签到功能 - 数据管理 Hook
 * 处理用户签到数据、积分、连续天数等状态管理
 */
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { showToast } from 'vant'

export function useCheckInData() {
  const { t } = useI18n()

  // 响应式数据
  const userPoints = ref(0)
  const consecutiveDays = ref(0)
  const lastCheckInDate = ref('')
  const hasCheckedInToday = ref(false)
  const checkInHistory = ref([])
  const checkedInDates = ref([])

  // 里程碑配置
  const milestones = ref([
    { days: 3, bonus: 5 },    // 连续3天额外+5分
    { days: 7, bonus: 15 },   // 连续7天额外+15分
    { days: 15, bonus: 30 },  // 连续15天额外+30分
    { days: 30, bonus: 60 }   // 连续30天额外+60分
  ])

  // 计算属性
  const canCheckIn = computed(() => {
    return !hasCheckedInToday.value
  })

  /**
   * 加载用户数据
   */
  const loadUserData = () => {
    try {
      // 加载用户积分
      const savedPoints = localStorage.getItem('lottery_user_points')
      if (savedPoints) {
        userPoints.value = parseInt(savedPoints) || 0
      }

      // 加载连续签到天数
      const savedConsecutive = localStorage.getItem('lottery_consecutive_days')
      if (savedConsecutive) {
        consecutiveDays.value = parseInt(savedConsecutive) || 0
      }

      // 加载上次签到日期
      const savedLastDate = localStorage.getItem('lottery_last_checkin_date')
      if (savedLastDate) {
        lastCheckInDate.value = savedLastDate
      }

      // 加载签到历史记录
      const savedHistory = localStorage.getItem('lottery_checkin_history')
      if (savedHistory) {
        checkInHistory.value = JSON.parse(savedHistory)
      }

      // 加载本月签到日期列表
      const savedCheckedDates = localStorage.getItem('lottery_checked_dates')
      if (savedCheckedDates) {
        checkedInDates.value = JSON.parse(savedCheckedDates)
      }
    } catch (error) {
      console.error('加载用户数据失败:', error)
    }
  }

  /**
   * 保存用户数据
   */
  const saveUserData = () => {
    try {
      localStorage.setItem('lottery_user_points', userPoints.value.toString())
      localStorage.setItem('lottery_consecutive_days', consecutiveDays.value.toString())
      localStorage.setItem('lottery_last_checkin_date', lastCheckInDate.value)
      localStorage.setItem('lottery_checkin_history', JSON.stringify(checkInHistory.value))
      localStorage.setItem('lottery_checked_dates', JSON.stringify(checkedInDates.value))
    } catch (error) {
      console.error('保存用户数据失败:', error)
    }
  }

  /**
   * 检查今日签到状态
   */
  const checkTodayStatus = () => {
    const today = formatDate(new Date())
    hasCheckedInToday.value = lastCheckInDate.value === today

    // 检查是否中断连续签到
    if (lastCheckInDate.value) {
      const lastDate = new Date(lastCheckInDate.value)
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      yesterday.setHours(0, 0, 0, 0)

      // 如果上次签到早于昨天，说明中断了连续签到
      if (lastDate < yesterday) {
        consecutiveDays.value = 0
        saveUserData()
        console.log('[每日签到] 检测到签到中断，重置连续天数')
      }
    }
  }

  /**
   * 计算连续签到奖励
   */
  const calculateConsecutiveBonus = (days) => {
    let bonus = 0

    // 遍历所有里程碑，找到最高可达成的奖励
    milestones.value.forEach(milestone => {
      if (days >= milestone.days) {
        bonus = milestone.bonus
      }
    })

    return bonus
  }

  /**
   * 获取里程碑状态文本
   */
  const getMilestoneStatus = (milestone) => {
    if (consecutiveDays.value >= milestone.days) {
      return t('dailyCheckIn.milestone.achieved')
    } else if (consecutiveDays.value === milestone.days - 1) {
      return t('dailyCheckIn.milestone.oneDayLeft')
    } else {
      return t('dailyCheckIn.milestone.daysLeft', { days: milestone.days - consecutiveDays.value })
    }
  }

  /**
   * 执行签到操作
   */
  const handleCheckIn = async () => {
    // 验证签到条件
    if (!canCheckIn.value) return

    const today = formatDate(new Date())

    // 判断是否连续签到
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = formatDate(yesterday)

    if (lastCheckInDate.value === yesterdayStr) {
      // 昨天也签到了，连续天数+1
      consecutiveDays.value++
    } else {
      // 中断后重新签到，从1开始
      consecutiveDays.value = 1
    }

    // 计算奖励积分
    const basePoints = 10  // 基础签到奖励
    const bonusPoints = calculateConsecutiveBonus(consecutiveDays.value)
    const totalPoints = basePoints + bonusPoints

    // 更新用户积分
    userPoints.value += totalPoints

    // 更新签到状态
    lastCheckInDate.value = today
    hasCheckedInToday.value = true

    // 创建签到记录
    const record = {
      date: today,
      displayDate: formatDisplayDate(today),
      consecutiveDays: consecutiveDays.value,
      basePoints,
      bonus: bonusPoints,
      totalPoints,
      timestamp: Date.now()
    }

    // 添加到历史记录开头
    checkInHistory.value.unshift(record)

    // 只保留最近30条记录
    if (checkInHistory.value.length > 30) {
      checkInHistory.value = checkInHistory.value.slice(0, 30)
    }

    // 添加到本月签到日期列表
    if (!checkedInDates.value.includes(today)) {
      checkedInDates.value.push(today)
    }

    // 保存所有数据
    saveUserData()

    // 显示成功提示
    let message = t('dailyCheckIn.success.base', { points: basePoints })

    if (bonusPoints > 0) {
      message += t('dailyCheckIn.success.bonus', { days: consecutiveDays.value, points: bonusPoints })
    }

    showToast({
      message,
      type: 'success',
      duration: 2500
    })

    console.log('[每日签到] 签到成功，连续天数:', consecutiveDays.value, '获得积分:', totalPoints)

    return {
      basePoints,
      bonusPoints,
      totalPoints,
      consecutiveDays: consecutiveDays.value
    }
  }

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
    handleCheckIn
  }
}

/**
 * 格式化日期为 YYYY-MM-DD
 */
function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * 格式化日期为显示文本 (M月D日)
 */
function formatDisplayDate(dateStr) {
  const date = new Date(dateStr)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}月${day}日`
}
