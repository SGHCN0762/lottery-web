import { ref } from 'vue'

/**
 * 抽奖历史记录管理 Hook
 * @returns {Object} 包含抽奖历史记录相关的方法和状态
 */
export function useSpinHistory() {
  // 抽奖历史记录数组
  const spinHistory = ref([])

  /**
   * 从localStorage加载抽奖历史记录
   */
  const loadSpinHistory = () => {
    try {
      const saved = localStorage.getItem('lottery_spin_history')
      if (saved) {
        spinHistory.value = JSON.parse(saved)
      }
    } catch (error) {
      console.error('加载历史失败:', error)
      spinHistory.value = []
    }
  }

  /**
   * 保存抽奖历史到localStorage
   */
  const saveSpinHistory = () => {
    try {
      localStorage.setItem('lottery_spin_history', JSON.stringify(spinHistory.value))
    } catch (error) {
      console.error('保存历史失败:', error)
    }
  }

  /**
   * 添加抽奖记录
   * @param {Object} prize - 中奖的奖品对象
   */
  const addSpinRecord = (prize) => {
    // 创建历史记录
    const record = {
      prize,
      time: formatTime(),
      timestamp: Date.now()
    }

    // 添加到历史记录开头
    spinHistory.value.unshift(record)

    // 只保留最近10条记录，避免数据过多
    if (spinHistory.value.length > 10) {
      spinHistory.value = spinHistory.value.slice(0, 10)
    }
    saveSpinHistory()
  }

  /**
   * 格式化当前时间为 HH:MM 格式
   * @returns {string} 格式化后的时间字符串
   */
  const formatTime = () => {
    const now = new Date()
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
  }

  return {
    spinHistory,
    loadSpinHistory,
    saveSpinHistory,
    addSpinRecord,
    formatTime
  }
}
