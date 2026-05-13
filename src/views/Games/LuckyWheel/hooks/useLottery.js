import { showToast } from 'vant'
import { useI18n } from 'vue-i18n'

/**
 * 抽奖核心逻辑 Hook
 * @param {Object} userPointsHook - 用户积分Hook
 * @param {Object} spinHistoryHook - 抽奖历史Hook
 * @param {Object} wheelRotationHook - 转盘旋转Hook
 * @param {Array} prizes - 奖品列表
 * @param {Function} t - i18n翻译函数
 * @returns {Object} 包含抽奖核心逻辑的方法
 */
export function useLottery(userPointsHook, spinHistoryHook, wheelRotationHook, prizes, t) {
  // 从其他hooks中解构所需的方法和状态
  const { userPoints, updateUserPoints } = userPointsHook
  const { addSpinRecord } = spinHistoryHook
  const { isSpinning, spinToPrize, resetWheel } = wheelRotationHook

  /**
   * 开始抽奖
   * 检查积分、扣除费用、随机选择奖品并执行旋转
   */
  const startSpin = async () => {
    // 检查积分是否足够
    if (userPoints.value < 10) {
      showToast({
        message: t('luckyWheel.insufficientPoints'),
        type: 'fail',
        duration: 2000
      })
      return
    }

    // 防止重复点击
    if (isSpinning.value) return

    isSpinning.value = true

    // 扣除抽奖费用
    updateUserPoints(-10)

    // 随机选择奖品索引（0-5）
    const prizeIndex = Math.floor(Math.random() * prizes.length)
    const selectedPrize = prizes[prizeIndex]

    console.log('[幸运转盘] 选中奖品:', selectedPrize.name, '索引:', prizeIndex)

    // 执行旋转动画
    const wonPrize = await spinToPrize(prizeIndex, selectedPrize)

    // 旋转结束，发放奖励
    handleWin(wonPrize)

    resetWheel()
  }

  /**
   * 处理中奖逻辑
   * 添加积分、记录历史、显示提示
   *
   * @param {Object} prize - 中奖的奖品对象
   */
  const handleWin = (prize) => {
    // 检查奖品对象是否存在且包含points属性
    if (!prize || !prize.points) {
      console.error("奖品数据不完整:", prize);
      return;
    }
    
    // 添加奖品积分到用户总积分
    updateUserPoints(prize.points)

    // 添加到历史记录
    addSpinRecord(prize)

    // 显示中奖提示
    showToast({
      message: t('luckyWheel.won', { prize: prize.name || "未知奖品" }),
      type: 'success',
      duration: 2000
    })
  }

  return {
    startSpin
  }
}
