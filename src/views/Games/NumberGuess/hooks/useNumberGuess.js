/**
 * 数字猜猜猜游戏组合hook
 * 整合所有功能点，提供完整的游戏逻辑
 */
import { onMounted } from 'vue'
import { useGameState } from './useGameState'
import { useGameLogic } from './useGameLogic'
import { useUserPoints } from './useUserPoints'

export function useNumberGuess() {
  // 初始化各个功能点
  const gameState = useGameState()
  const gameLogic = useGameLogic(gameState)
  const { userPoints, loadUserPoints } = useUserPoints()

  // 生命周期钩子
  onMounted(() => {
    loadUserPoints()
  })

  return {
    // 用户积分（优先级最高，确保不会被覆盖）
    userPoints,
    
    // 游戏状态
    ...gameState,

    // 游戏逻辑方法
    ...gameLogic,

    // 用户积分方法
    loadUserPoints
  }
}
