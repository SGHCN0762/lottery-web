/**
 * 用户积分管理hook
 * 处理积分的加载、保存和更新
 */
import { ref } from 'vue'

export function useUserPoints() {
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
   * @param {number} points - 要增加的积分
   */
  const updatePoints = (points) => {
    userPoints.value += points
    saveUserPoints()
  }

  return {
    userPoints,
    loadUserPoints,
    saveUserPoints,
    updatePoints
  }
}
