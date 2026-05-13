import { ref } from 'vue'

/**
 * 转盘旋转逻辑 Hook
 * @param {Array} prizes - 奖品列表
 * @returns {Object} 包含转盘旋转相关的方法和状态
 */
export function useWheelRotation(prizes) {
  // 转盘当前旋转角度（度）
  const wheelRotation = ref(0)
  // 是否正在旋转中
  const isSpinning = ref(false)
  // 旋转动画持续时间（秒）
  const spinDuration = ref(4)

  /**
   * 旋转转盘到指定奖品位置
   * 使用精准的角度计算确保奖品对准顶部指针
   *
   * @param {number} prizeIndex - 奖品索引
   * @param {Object} prize - 奖品对象
   * @returns {Promise} 旋转完成的Promise
   */
  const spinToPrize = async (prizeIndex, prize) => {
    const segmentAngle = 360 / prizes.length

    // 步骤1: 计算奖品的中心角度
    // 奖品索引从0开始，第i个奖品的范围是 [i*segmentAngle, (i+1)*segmentAngle]
    const prizeCenterAngle = prizeIndex * segmentAngle + segmentAngle / 2

    // 步骤2: 计算目标旋转角度
    // 要让奖品中心对准顶部指针（0度），需要逆时针旋转该角度（取负值）
    const targetRotation = -prizeCenterAngle

    // 步骤3: 基于当前角度的整圈数计算
    // 避免角度累积导致的数值溢出问题
    const currentFullRotations = Math.floor(wheelRotation.value / 360) * 360

    // 步骤4: 额外旋转5圈增加视觉效果
    const extraRotations = 5 * 360

    // 步骤5: 计算最终旋转角度
    // 最终角度 = 当前整圈数 + 额外圈数 + 目标角度
    const finalRotation = currentFullRotations + extraRotations + targetRotation

    // 执行旋转动画
    wheelRotation.value = finalRotation

    // 等待旋转完成（duration以秒为单位，需转换为毫秒）
    await new Promise(resolve => setTimeout(resolve, spinDuration.value * 1000))

    return prize
  }

  /**
   * 重置转盘状态
   */
  const resetWheel = () => {
    isSpinning.value = false
    wheelRotation.value = 0
  }

  return {
    wheelRotation,
    isSpinning,
    spinDuration,
    spinToPrize,
    resetWheel
  }
}
