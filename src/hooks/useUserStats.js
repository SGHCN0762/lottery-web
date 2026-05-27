import { ref, computed } from 'vue'
import dayjs from 'dayjs'

/**
 * 用户成就 Hook
 * 基于游戏记录计算用户成就和统计
 */

// 模块级单例数据
const gamesPlayed = ref(0)
const badges = ref([])

/**
 * 更新游戏次数
 */
const incrementGamesPlayed = () => {
  gamesPlayed.value++
}

/**
 * 添加徽章
 */
const addBadge = (badge) => {
  if (!badges.value.find(b => b.id === badge.id)) {
    badges.value.push(badge)
  }
}

/**
 * 从游戏记录计算统计
 */
const calculateStats = (records) => {
  // 计算游戏次数
  gamesPlayed.value = records.length

  // 根据游戏记录生成徽章
  const earnedBadges = []

  // 1. 首次游戏徽章
  if (records.length > 0) {
    earnedBadges.push({
      id: 'first_game',
      name: '初出茅庐',
      icon: '🎮',
      description: '完成第一次游戏'
    })
  }

  // 2. 游戏达人徽章（玩过5种游戏）
  const gameTypes = new Set(records.map(r => r.gameType))
  if (gameTypes.size >= 2) {
    earnedBadges.push({
      id: 'game_explorer',
      name: '游戏探索者',
      icon: '🕹️',
      description: '体验过多种游戏'
    })
  }

  // 3. 签到达人徽章（签到3天以上）
  const checkInRecords = records.filter(r => r.gameType === 'dailyCheckIn')
  const uniqueCheckInDays = new Set(checkInRecords.map(r => {
    return dayjs(r.timestamp).format('YYYY-MM-DD')
  })).size
  if (uniqueCheckInDays >= 3) {
    earnedBadges.push({
      id: 'checkin_master',
      name: '签到达人',
      icon: '📅',
      description: '连续签到3天以上'
    })
  }

  // 4. 幸运玩家徽章（抽奖5次以上）
  const luckyWheelCount = records.filter(r => r.gameType === 'luckyWheel').length
  if (luckyWheelCount >= 5) {
    earnedBadges.push({
      id: 'lucky_player',
      name: '幸运玩家',
      icon: '🎰',
      description: '参与幸运转盘5次以上'
    })
  }

  // 5. 答题高手徽章（答对10题以上）
  const correctAnswers = records.filter(r => r.gameType === 'quizChallenge' && r.result === 'win').length
  if (correctAnswers >= 3) {
    earnedBadges.push({
      id: 'quiz_master',
      name: '答题高手',
      icon: '🧠',
      description: '答题挑战胜利3次以上'
    })
  }

  // 6. 积分富豪徽章（累计获得100积分以上）
  const totalPoints = records.reduce((sum, r) => sum + r.pointsChange, 0)
  if (totalPoints >= 100) {
    earnedBadges.push({
      id: 'point_rich',
      name: '积分富豪',
      icon: '💰',
      description: '累计获得100积分以上'
    })
  }

  // 7. 猜数字高手（猜中数字5次以上）
  const numberGuessWins = records.filter(r => r.gameType === 'numberGuess' && r.result === 'win').length
  if (numberGuessWins >= 5) {
    earnedBadges.push({
      id: 'number_master',
      name: '猜数字高手',
      icon: '🔢',
      description: '数字猜猜猜胜利5次以上'
    })
  }

  // 8. 常客徽章（游戏次数20次以上）
  if (records.length >= 20) {
    earnedBadges.push({
      id: 'regular_player',
      name: '游戏常客',
      icon: '⭐',
      description: '累计游戏20次以上'
    })
  }

  badges.value = earnedBadges
}

export function useUserStats() {
  return {
    gamesPlayed,
    badges,
    incrementGamesPlayed,
    addBadge,
    calculateStats
  }
}
