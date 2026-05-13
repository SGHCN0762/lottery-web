/**
 * 游戏核心逻辑处理hook
 * 处理猜测、胜负判断等核心游戏逻辑
 */
import { useUserPoints } from './useUserPoints'
import { showToast } from 'vant'
import { useI18n } from 'vue-i18n'

export function useGameLogic(gameState) {
  const { t } = useI18n()
  const { updatePoints } = useUserPoints()

  /**
   * 提交用户的猜测
   * 验证输入、比较结果、更新游戏状态
   */
  const submitGuess = async () => {
    // 验证输入和处理状态
    if (!gameState.isValidGuess.value || gameState.isProcessing.value) return

    gameState.isProcessing.value = true
    const guess = parseInt(gameState.currentGuess.value)

    let hint = ''
    let status = ''

    // 判断猜测结果
    if (guess === gameState.targetNumber.value) {
      // 猜对了
      hint = '🎉 正确！'
      status = 'correct'
      handleWin()
    } else if (gameState.remainingAttempts.value <= 1) {
      // 最后一次机会且猜错了
      hint = guess > gameState.targetNumber.value ? '❌ 太大了' : '❌ 太小了'
      status = 'wrong'
      handleLose()
    } else {
      // 还没猜对，但还有机会
      hint = guess > gameState.targetNumber.value ? '⬇️ 太大了' : '⬆️ 太小了'
      status = 'hint'
      gameState.remainingAttempts.value--
    }

    // 添加到历史记录（最新的在前面）
    gameState.guessHistory.value.unshift({
      guess,
      hint,
      status
    })

    // 清空输入框
    gameState.currentGuess.value = ''

    // 延迟重置处理状态，提供更好的用户体验
    setTimeout(() => {
      gameState.isProcessing.value = false
    }, 500)
  }

  /**
   * 处理胜利情况
   * 根据尝试次数计算奖励并发放积分
   */
  const handleWin = () => {
    gameState.gameEnded.value = true
    gameState.winStatus.value = 'win'

    // 计算已使用的尝试次数
    const attemptsUsed = 7 - gameState.remainingAttempts.value + 1

    // 根据尝试次数确定奖励
    if (attemptsUsed <= 2) {
      gameState.rewardPoints.value = 50  // 前2次猜中
    } else if (attemptsUsed <= 4) {
      gameState.rewardPoints.value = 30  // 第3-4次猜中
    } else {
      gameState.rewardPoints.value = 10  // 第5-7次猜中
    }

    // 更新用户总积分
    updatePoints(gameState.rewardPoints.value)

    // 显示成功提示
    showToast({
      message: t('numberGuess.successToast', { points: gameState.rewardPoints.value }),
      type: 'success',
      duration: 2000
    })
  }

  /**
   * 处理失败情况
   * 游戏结束，机会用完
   */
  const handleLose = () => {
    gameState.gameEnded.value = true
    gameState.winStatus.value = 'lose'
    gameState.remainingAttempts.value = 0

    showToast({
      message: t('numberGuess.failToast'),
      type: 'fail',
      duration: 2000
    })
  }

  return {
    submitGuess,
    handleWin,
    handleLose
  }
}
