import { showToast } from 'vant'

/**
 * 积分计算和奖励逻辑 Hook
 * @param {Function} t - 国际化翻译函数
 * @returns {Object} 积分相关方法和数据
 */
export function useScoring(t) {
  /**
   * 根据连续答对次数计算额外奖励积分
   *
   * 奖励规则：
   * - 连续2题：+5分
   * - 连续3题：+10分
   * - 连续4题：+15分
   * - 连续5题：+25分
   *
   * @param {number} streak - 连续答对次数
   * @returns {number} 额外奖励积分
   */
  const calculateStreakBonus = (streak) => {
    if (streak === 2) return 5
    if (streak === 3) return 10
    if (streak === 4) return 15
    if (streak >= 5) return 25
    return 0
  }

  /**
   * 处理答对的情况
   * 更新计数、计算奖励、显示提示
   *
   * @param {Object} options - 配置选项
   * @param {Function} options.onCorrect - 答对回调
   * @param {Function} options.updateStreak - 更新连续答对次数的函数
   * @param {Function} options.updateMaxStreak - 更新最高连击记录的函数
   * @param {Function} options.updateCorrectCount - 更新答对计数的函数
   * @param {Function} options.updateEarnedPoints - 更新获得积分的函数
   */
  const handleCorrectAnswer = ({ 
    onCorrect, 
    updateStreak, 
    updateMaxStreak, 
    updateCorrectCount, 
    updateEarnedPoints 
  }) => {
    // 更新答对计数
    updateCorrectCount()

    // 更新连续答对次数
    const newStreak = updateStreak()

    // 更新最高连击记录
    updateMaxStreak(newStreak)

    // 计算本題得分
    let points = 5  // 基础分

    // 计算连续答对额外奖励
    const bonus = calculateStreakBonus(newStreak)
    if (bonus > 0) {
      points += bonus
      showToast({
        message: t('quizChallenge.bonus', { count: newStreak, bonus }),
        type: 'success',
        duration: 2000
      })
    }

    // 累加到总分
    updateEarnedPoints(points)
  }

  /**
   * 处理答错的情况
   * 重置连续计数、显示提示
   *
   * @param {Function} updateStreak - 更新连续答对次数的函数
   */
  const handleWrongAnswer = (updateStreak) => {
    // 中断连续答对
    updateStreak(0)

    showToast({
      message: t('quizChallenge.wrongAnswer'),
      type: 'fail',
      duration: 1500
    })
  }

  return {
    calculateStreakBonus,
    handleCorrectAnswer,
    handleWrongAnswer
  }
}
