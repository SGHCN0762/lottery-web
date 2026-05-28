/**
 * 应用数据 Store
 * 
 * 功能：
 * - 用户积分管理
 * - 游戏记录管理
 * - 数据统计和徽章计算
 * 
 * 使用 Pinia + computed 的方式，避免使用 watch
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import { STORAGE_KEYS, RECORD_LIMITS, TIME_RANGES } from '@/constants'

export const useAppDataStore = defineStore('appData', () => {
  // ========================================
  // 状态定义
  // ========================================
  
  /** 用户积分 */
  const userPoints = ref(0)
  
  /** 游戏记录列表 */
  const records = ref([])
  
  /** 数据是否已加载 */
  const isLoaded = ref(false)

  // ========================================
  // 计算属性（派生状态）
  // ========================================

  /** 总游戏次数 */
  const totalGames = computed(() => records.value.length)

  /** 游戏类型数量 */
  const gameTypesCount = computed(() => new Set(records.value.map(r => r.gameType)).size)

  /** 签到天数 */
  const checkInDays = computed(() => {
    const checkInRecords = records.value.filter(r => r.gameType === 'dailyCheckIn')
    return new Set(checkInRecords.map(r => dayjs(r.timestamp).format('YYYY-MM-DD'))).size
  })

  /** 转盘次数 */
  const luckyWheelCount = computed(() => records.value.filter(r => r.gameType === 'luckyWheel').length)

  /** 答题胜利次数 */
  const quizWins = computed(() => records.value.filter(r => r.gameType === 'quizChallenge' && r.result === 'win').length)

  /** 猜数字胜利次数 */
  const numberGuessWins = computed(() => records.value.filter(r => r.gameType === 'numberGuess' && r.result === 'win').length)

  /** 总获得积分 */
  const totalPointsEarned = computed(() => records.value.reduce((sum, r) => sum + r.pointsChange, 0))

  /** 已解锁徽章数量 */
  const unlockedBadgeCount = computed(() => {
    let count = 0
    if (totalGames.value > 0) count++
    if (checkInDays.value >= 7) count++
    if (quizWins.value >= 10) count++
    if (luckyWheelCount.value >= 10) count++
    if (numberGuessWins.value >= 10) count++
    if (userPoints.value >= 500) count++
    if (gameTypesCount.value >= 4) count++
    return count
  })

  /** 游戏统计汇总 */
  const gameStats = computed(() => ({
    totalGames: totalGames.value,
    gameTypesCount: gameTypesCount.value,
    checkInDays: checkInDays.value,
    luckyWheelCount: luckyWheelCount.value,
    quizWins: quizWins.value,
    numberGuessWins: numberGuessWins.value,
    totalPoints: totalPointsEarned.value,
    unlockedBadges: unlockedBadgeCount.value,
  }))

  // ========================================
  // API 层（后续联调后端时修改这里）
  // ========================================

  const fetchPoints = async () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_POINTS)
      return saved ? parseInt(saved) : 0
    } catch (error) {
      console.error('获取积分失败:', error)
      return 0
    }
  }

  const persistPoints = async (points) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_POINTS, points.toString())
      return true
    } catch (error) {
      console.error('保存积分失败:', error)
      return false
    }
  }

  const fetchRecords = async () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GAME_RECORDS)
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('获取记录失败:', error)
      return []
    }
  }

  const persistRecords = async (recordList) => {
    try {
      localStorage.setItem(STORAGE_KEYS.GAME_RECORDS, JSON.stringify(recordList))
      return true
    } catch (error) {
      console.error('保存记录失败:', error)
      return false
    }
  }

  // ========================================
  // 数据操作方法
  // ========================================

  /**
   * 加载所有数据
   */
  const loadAllData = async () => {
    const [points, recordList] = await Promise.all([
      fetchPoints(),
      fetchRecords()
    ])
    
    userPoints.value = points
    records.value = recordList
    isLoaded.value = true
  }

  /**
   * 添加积分
   */
  const addPoints = (amount) => {
    userPoints.value += amount
    persistPoints(userPoints.value)
  }

  /**
   * 扣除积分
   */
  const deductPoints = async (amount) => {
    if (userPoints.value >= amount) {
      userPoints.value -= amount
      await persistPoints(userPoints.value)
      return true
    }
    return false
  }

  /**
   * 设置积分
   */
  const setPoints = (amount) => {
    userPoints.value = amount
    persistPoints(userPoints.value)
  }

  /**
   * 检查积分是否足够
   */
  const hasEnoughPoints = (amount) => userPoints.value >= amount

  /**
   * 添加游戏记录
   */
  const addRecord = async (record) => {
    const newRecord = {
      id: dayjs().valueOf(),
      ...record,
      timestamp: record.timestamp || dayjs().valueOf()
    }
    records.value.unshift(newRecord)

    if (records.value.length > RECORD_LIMITS.GAME_RECORDS) {
      records.value = records.value.slice(0, RECORD_LIMITS.GAME_RECORDS)
    }

    await persistRecords(records.value)
  }

  /**
   * 根据游戏类型筛选记录
   */
  const getRecordsByGameType = (gameType) => {
    if (gameType === 'all') return records.value
    return records.value.filter(r => r.gameType === gameType)
  }

  /**
   * 根据时间范围筛选记录
   */
  const getRecordsByTimeRange = (range) => {
    const now = dayjs().valueOf()
    const cutoff = now - (TIME_RANGES[range.toUpperCase()] || TIME_RANGES.WEEK)
    return records.value.filter(r => r.timestamp >= cutoff)
  }

  // ========================================
  // 导出 API
  // ========================================
  return {
    // 状态
    userPoints,
    records,
    isLoaded,

    // 计算属性
    totalGames,
    gameTypesCount,
    checkInDays,
    luckyWheelCount,
    quizWins,
    numberGuessWins,
    totalPointsEarned,
    unlockedBadgeCount,
    gameStats,

    // 方法
    loadAllData,
    addPoints,
    deductPoints,
    setPoints,
    hasEnoughPoints,
    addRecord,
    getRecordsByGameType,
    getRecordsByTimeRange,
  }
})