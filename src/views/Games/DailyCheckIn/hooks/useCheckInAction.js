/**
 * 每日签到功能 - 签到操作状态 Hook
 * 处理签到操作的状态管理和执行逻辑
 */
import { ref } from 'vue'

export function useCheckInAction() {
  // 签到操作状态
  const isCheckingIn = ref(false)

  /**
   * 执行签到操作
   * @param {Function} checkInHandler - 实际执行签到的处理函数
   * @param {Function|Object} canCheckIn - 检查是否可以签到的函数或 computed 属性
   * @returns {Promise<Object>} 签到结果
   */
  const executeCheckIn = async (checkInHandler, canCheckIn) => {
    // 防止重复点击
    if (isCheckingIn.value) return
    
    // 检查是否可以签到
    if (canCheckIn) {
      // 如果是 computed 属性，使用其 value 属性
      const canCheckInValue = typeof canCheckIn.value !== "undefined" ? canCheckIn.value : canCheckIn()
      if (!canCheckInValue) {
        return
      }
    }

    isCheckingIn.value = true

    try {
      // 执行签到操作
      const result = await checkInHandler()
      return result
    } catch (error) {
      console.error('签到操作失败:', error)
      // 可以在这里添加错误提示逻辑
      throw error
    } finally {
      // 无论成功或失败，都重置状态
      isCheckingIn.value = false
    }
  }

  return {
    isCheckingIn,
    executeCheckIn
  }
}
