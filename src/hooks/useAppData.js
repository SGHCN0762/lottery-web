/**
 * 统一数据服务 Hook
 * 整合积分、游戏记录等数据的存储和读取
 * 
 * 统一入口设计：
 * - loadAllData() - 加载所有数据
 * - addPoints()/deductPoints() - 积分操作
 * - addRecord() - 添加记录
 * 
 * 后续联调后端时，只需修改此文件中的 API 调用方法
 */

import { ref } from 'vue'
import dayjs from 'dayjs'
import { STORAGE_KEYS, RECORD_LIMITS, TIME_RANGES } from '@/constants'

// 模块级单例数据
const userPoints = ref(0)
const records = ref([])

// ========================================
// API 层（后续联调后端时修改这里）
// ========================================

/**
 * 从后端/存储加载积分
 */
const fetchPoints = async () => {
  // TODO: 后续联调后端时替换为：
  // const response = await api.get('/user/points')
  // return response.data.points
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_POINTS)
    return saved ? parseInt(saved) : 0
  } catch (error) {
    console.error('获取积分失败:', error)
    return 0
  }
}

/**
 * 保存积分到后端/存储
 */
const persistPoints = async (points) => {
  // TODO: 后续联调后端时替换为：
  // await api.post('/user/points', { points })
  try {
    localStorage.setItem(STORAGE_KEYS.USER_POINTS, points.toString())
    return true
  } catch (error) {
    console.error('保存积分失败:', error)
    return false
  }
}

/**
 * 从后端/存储加载记录
 */
const fetchRecords = async () => {
  // TODO: 后续联调后端时替换为：
  // const response = await api.get('/user/records')
  // return response.data.records
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.GAME_RECORDS)
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('获取记录失败:', error)
    return []
  }
}

/**
 * 保存记录到后端/存储
 */
const persistRecords = async (recordList) => {
  // TODO: 后续联调后端时替换为：
  // await api.post('/user/records', { records: recordList })
  try {
    localStorage.setItem(STORAGE_KEYS.GAME_RECORDS, JSON.stringify(recordList))
    return true
  } catch (error) {
    console.error('保存记录失败:', error)
    return false
  }
}

// ========================================
// 数据操作层
// ========================================

/**
 * 加载所有数据
 */
const loadAllData = async () => {
  // 并行加载积分和记录
  const [points, recordList] = await Promise.all([
    fetchPoints(),
    fetchRecords()
  ])
  
  userPoints.value = points
  records.value = recordList
}

/**
 * 添加积分
 */
const addPoints = (amount) => {
  userPoints.value += amount
  // 自动保存
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
const hasEnoughPoints = (amount) => {
  return userPoints.value >= amount
}

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

  // 只保留最近100条记录
  if (records.value.length > RECORD_LIMITS.GAME_RECORDS) {
    records.value = records.value.slice(0, RECORD_LIMITS.GAME_RECORDS)
  }

  // 自动保存
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

/**
 * 计算游戏统计
 */
const calculateStats = () => {
  const totalGames = records.value.length
  const gameTypes = new Set(records.value.map(r => r.gameType))
  const checkInRecords = records.value.filter(r => r.gameType === 'dailyCheckIn')
  const uniqueCheckInDays = new Set(checkInRecords.map(r => {
    return dayjs(r.timestamp).format('YYYY-MM-DD')
  })).size
  const luckyWheelCount = records.value.filter(r => r.gameType === 'luckyWheel').length
  const quizWins = records.value.filter(r => r.gameType === 'quizChallenge' && r.result === 'win').length
  const numberGuessWins = records.value.filter(r => r.gameType === 'numberGuess' && r.result === 'win').length
  const totalPoints = records.value.reduce((sum, r) => sum + r.pointsChange, 0)

  return {
    totalGames,
    gameTypesCount: gameTypes.size,
    checkInDays: uniqueCheckInDays,
    luckyWheelCount,
    quizWins,
    numberGuessWins,
    totalPoints,
  }
}

/**
 * 计算已解锁的徽章数量
 */
const getUnlockedBadgeCount = () => {
  const stats = calculateStats()
  let count = 0

  if (stats.totalGames > 0) count++ // 首次游戏
  if (stats.checkInDays >= 7) count++ // 签到7天
  if (stats.quizWins >= 10) count++ // 答题高手
  if (stats.luckyWheelCount >= 10) count++ // 幸运玩家
  if (stats.numberGuessWins >= 10) count++ // 猜数字高手
  if (stats.totalPoints >= 500) count++ // 积分富豪
  if (stats.gameTypesCount >= 4) count++ // 游戏专家

  return count
}

// ========================================
// 对外导出
// ========================================
export function useAppData() {
  return {
    // 数据入口
    loadAllData,

    // 积分
    userPoints,
    addPoints,
    deductPoints,
    setPoints,
    hasEnoughPoints,

    // 游戏记录
    records,
    addRecord,
    getRecordsByGameType,
    getRecordsByTimeRange,

    // 统计
    calculateStats,
    getUnlockedBadgeCount,
  };
}
