/**
 * 数字猜猜猜游戏组合hook
 * 整合所有功能点，提供完整的游戏逻辑
 */
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGameState } from './useGameState'
import { useGameLogic } from './useGameLogic'
import { useAppData } from '@/hooks/useAppData'

export function useNumberGuess() {
  const { t } = useI18n()

  // 使用统一数据管理
  const appData = useAppData()
  const { userPoints, addPoints, addRecord } = appData

  // 初始化游戏状态
  const gameState = useGameState()

  // 初始化游戏逻辑（传入 addPoints）
  const gameLogic = useGameLogic(gameState, addPoints)

  // 添加游戏记录
  const addGameRecord = (winStatus, rewardPoints = 0) => {
    addRecord({
      gameType: 'numberGuess',
      gameName: t('lottery.numberGuess'),
      result: winStatus === 'win' ? 'win' : 'lose',
      pointsChange: winStatus === 'win' ? rewardPoints : 0
    })
  }

  // 生命周期钩子
  onMounted(() => {
    appData.loadAllData()
  })

  return {
    // 用户积分
    userPoints,

    // 游戏状态
    ...gameState,

    // 游戏逻辑方法
    ...gameLogic,

    // 添加积分方法（暴露给组件使用）
    addPoints,

    // 添加游戏记录
    addGameRecord,
  }
}
