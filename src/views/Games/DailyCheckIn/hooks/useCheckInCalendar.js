/**
 * 每日签到功能 - 日历管理 Hook
 * 处理签到日历的生成和展示逻辑
 */
import { computed, ref } from 'vue'

export function useCheckInCalendar(checkedInDates) {
  // 确保 checkedInDates 是一个 ref 对象
  const datesRef = typeof checkedInDates?.value !== 'undefined' ? checkedInDates : ref([])
  
  /**
   * 生成当月日历数据
   * 包含空白占位、日期数字、签到状态等信息
   *
   * @returns {Array} 日历天数数组
   */
  const calendarDays = computed(() => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()

    // 获取当月第一天是星期几 (0-6)
    const firstDay = new Date(year, month, 1)
    const firstDayOfWeek = firstDay.getDay()

    // 获取当月总天数
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const days = []

    // 添加上月的空白占位（使第一天对齐到正确的星期）
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({
        date: '',
        day: '',
        isToday: false,
        isCheckedIn: false,
        isFuture: false
      })
    }

    // 添加当月的所有日期
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(new Date(year, month, day))
      const isToday = day === now.getDate()
      const isCheckedIn = datesRef.value.includes(dateStr)
      const isFuture = day > now.getDate()

      days.push({
        date: dateStr,
        day: day.toString(),
        isToday,
        isCheckedIn,
        isFuture
      })
    }

    return days
  })

  /**
   * 计算距离下次签到的时间提示
   * @returns {string} 时间提示文本
   */
  const nextCheckInTime = computed(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)

    const now = new Date()
    const diff = tomorrow - now
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours}小时${minutes}分钟后`
  })

  return {
    calendarDays,
    nextCheckInTime
  }
}

/**
 * 将Date对象格式化为 YYYY-MM-DD 字符串
 *
 * @param {Date} date - 日期对象
 * @returns {string} 格式化后的日期字符串
 */
function formatDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
