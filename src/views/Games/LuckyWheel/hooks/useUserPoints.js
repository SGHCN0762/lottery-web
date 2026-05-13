import { ref } from 'vue'

/**
 * 用户积分管理 Hook
 * @returns {Object} 包含用户积分相关的方法和状态
 */
export function useUserPoints() {
  // 用户当前积分
  const userPoints = ref(0)

  /**
   * 从localStorage加载用户积分
   */
  const loadUserPoints = () => {
    try {
      const saved = localStorage.getItem('lottery_user_points')
      if (saved) {
        userPoints.value = parseInt(saved) || 0
      }
    } catch (error) {
      console.error('加载积分失败:', error)
      userPoints.value = 0
    }
  }

  /**
   * 保存用户积分到localStorage
   */
  const saveUserPoints = () => {
    try {
      localStorage.setItem('lottery_user_points', userPoints.value.toString())
    } catch (error) {
      console.error('保存积分失败:', error)
    }
  }

  /**
   * 更新用户积分
   * @param {number} amount - 积分变化量
   */
  const updateUserPoints = (amount) => {
    userPoints.value += amount
    saveUserPoints()
  }

  return {
    userPoints,
    loadUserPoints,
    saveUserPoints,
    updateUserPoints
  }
}
