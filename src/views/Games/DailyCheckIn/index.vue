<template>
  <div class="daily-checkin-game">
    <!-- 游戏信息栏 -->
    <section class="game-info-bar">
      <div class="info-item">
        <span class="info-label">{{ t('dailyCheckIn.myPoints') }}</span>
        <span class="info-value">{{ userPoints }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">{{ t('dailyCheckIn.consecutiveDays') }}</span>
        <span class="info-value streak">{{ consecutiveDays }} {{ t('dailyCheckIn.days') }}</span>
      </div>
    </section>

    <!-- 游戏规则 -->
    <section class="game-rules">
      <h3 class="rules-title">📋 {{ t('dailyCheckIn.rules.title') }}</h3>
      <ul class="rules-list">
        <li>{{ t('dailyCheckIn.rules.rule1') }}</li>
        <li>{{ t('dailyCheckIn.rules.rule2') }}</li>
        <li>{{ t('dailyCheckIn.rules.rule3') }}</li>
        <li>{{ t('dailyCheckIn.rules.rule4') }}</li>
      </ul>
    </section>

    <!-- 签到日历 -->
    <section class="calendar-section">
      <h3 class="calendar-title">📅 {{ t('dailyCheckIn.calendar.title') }}</h3>
      <div class="calendar-grid">
        <div
          v-for="day in calendarDays"
          :key="day.date"
          class="calendar-day"
          :class="{
            'today': day.isToday,
            'checked-in': day.isCheckedIn,
            'future': day.isFuture
          }"
        >
          <span class="day-number">{{ day.day }}</span>
          <span v-if="day.isCheckedIn" class="check-mark">✓</span>
        </div>
      </div>
    </section>

    <!-- 签到奖励展示 -->
    <section class="rewards-section">
      <h3 class="rewards-title">🎁 {{ t('dailyCheckIn.rewards.title') }}</h3>
      <div class="rewards-grid">
        <div
          v-for="milestone in milestones"
          :key="milestone.days"
          class="milestone-card"
          :class="{
            'achieved': consecutiveDays >= milestone.days,
            'current': consecutiveDays === milestone.days - 1
          }"
        >
          <div class="milestone-days">{{ milestone.days }}{{ t('dailyCheckIn.days') }}</div>
          <div class="milestone-bonus">+{{ milestone.bonus }}{{ t('common.points') }}</div>
          <div class="milestone-status">
            {{ getMilestoneStatus(milestone) }}
          </div>
        </div>
      </div>
    </section>

    <!-- 签到按钮区域 -->
    <section class="action-section">
      <div v-if="canCheckIn" class="checkin-prompt">
        <div class="prompt-icon">✨</div>
        <p class="prompt-text">{{ t('dailyCheckIn.notCheckedIn') }}</p>
      </div>
      
      <van-button
        type="primary"
        size="large"
        block
        @click="handleCheckIn"
        :disabled="!canCheckIn || isCheckingIn"
        class="checkin-button"
      >
        {{ isCheckingIn ? t('dailyCheckIn.checkingIn') : canCheckIn ? t('dailyCheckIn.checkInNow') : t('dailyCheckIn.checkedInToday') }}
      </van-button>

      <div v-if="!canCheckIn && !hasCheckedInToday" class="next-checkin-hint">
        {{ t('dailyCheckIn.nextCheckInTime') }}：{{ nextCheckInTime }}
      </div>
    </section>

    <!-- 签到历史记录 -->
    <section v-if="checkInHistory.length > 0" class="history-section">
      <h3 class="history-title">📜 {{ t('dailyCheckIn.history.title') }}</h3>
      <div class="history-list">
        <div
          v-for="(record, index) in checkInHistory"
          :key="index"
          class="history-item"
        >
          <div class="history-date">{{ record.date }}</div>
          <div class="history-details">
            <span class="history-base">{{ t('dailyCheckIn.history.base') }} +10</span>
            <span v-if="record.bonus > 0" class="history-bonus">
              {{ t('dailyCheckIn.history.consecutive', { days: record.consecutiveDays }) }} +{{ record.bonus }}
            </span>
            <span class="history-total">{{ t('dailyCheckIn.history.total') }} +{{ record.totalPoints }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { showToast } from 'vant'

// ========================================
// i18n
// ========================================
const { t } = useI18n()

// ========================================
// 响应式数据定义
// ========================================

/** 用户当前积分 */
const userPoints = ref(0)

/** 连续签到天数 */
const consecutiveDays = ref(0)

/** 上次签到的日期 (YYYY-MM-DD格式) */
const lastCheckInDate = ref('')

/** 是否正在执行签到操作 */
const isCheckingIn = ref(false)

/** 今日是否已签到 */
const hasCheckedInToday = ref(false)

/** 签到历史记录数组 */
const checkInHistory = ref([])

/** 本月已签到的日期列表 */
const checkedInDates = ref([])

/**
 * 连续签到里程碑配置
 * 达到指定天数可获得额外奖励
 */
const milestones = ref([
  { days: 3, bonus: 5 },    // 连续3天额外+5分
  { days: 7, bonus: 15 },   // 连续7天额外+15分
  { days: 15, bonus: 30 },  // 连续15天额外+30分
  { days: 30, bonus: 60 }   // 连续30天额外+60分
])

// ========================================
// 计算属性
// ========================================

/**
 * 判断今日是否可以签到
 * @returns {boolean} 是否可签到
 */
const canCheckIn = computed(() => {
  return !hasCheckedInToday.value
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
    const isCheckedIn = checkedInDates.value.includes(dateStr)
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

// ========================================
// 生命周期钩子
// ========================================

/**
 * 组件挂载时加载用户数据并检查签到状态
 */
onMounted(() => {
  loadUserData()
  checkTodayStatus()
})

// ========================================
// 工具函数 - 日期处理
// ========================================

/**
 * 将Date对象格式化为 YYYY-MM-DD 字符串
 * 
 * @param {Date} date - 日期对象
 * @returns {string} 格式化后的日期字符串
 */
const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * 将日期字符串格式化为显示文本 (M月D日)
 * 
 * @param {string} dateStr - YYYY-MM-DD格式的日期字符串
 * @returns {string} 格式化后的显示文本
 */
const formatDisplayDate = (dateStr) => {
  const date = new Date(dateStr)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}月${day}日`
}

// ========================================
// 工具函数 - 数据持久化
// ========================================

/**
 * 从localStorage加载所有用户数据
 * 包括：积分、连续天数、签到历史等
 */
const loadUserData = () => {
  try {
    // 加载用户积分
    const savedPoints = localStorage.getItem('lottery_user_points')
    if (savedPoints) {
      userPoints.value = parseInt(savedPoints) || 0
    }
    
    // 加载连续签到天数
    const savedConsecutive = localStorage.getItem('lottery_consecutive_days')
    if (savedConsecutive) {
      consecutiveDays.value = parseInt(savedConsecutive) || 0
    }
    
    // 加载上次签到日期
    const savedLastDate = localStorage.getItem('lottery_last_checkin_date')
    if (savedLastDate) {
      lastCheckInDate.value = savedLastDate
    }
    
    // 加载签到历史记录
    const savedHistory = localStorage.getItem('lottery_checkin_history')
    if (savedHistory) {
      checkInHistory.value = JSON.parse(savedHistory)
    }
    
    // 加载本月签到日期列表
    const savedCheckedDates = localStorage.getItem('lottery_checked_dates')
    if (savedCheckedDates) {
      checkedInDates.value = JSON.parse(savedCheckedDates)
    }
  } catch (error) {
    console.error('加载用户数据失败:', error)
  }
}

/**
 * 保存所有用户数据到localStorage
 */
const saveUserData = () => {
  try {
    localStorage.setItem('lottery_user_points', userPoints.value.toString())
    localStorage.setItem('lottery_consecutive_days', consecutiveDays.value.toString())
    localStorage.setItem('lottery_last_checkin_date', lastCheckInDate.value)
    localStorage.setItem('lottery_checkin_history', JSON.stringify(checkInHistory.value))
    localStorage.setItem('lottery_checked_dates', JSON.stringify(checkedInDates.value))
  } catch (error) {
    console.error('保存用户数据失败:', error)
  }
}

/**
 * 检查今日签到状态
 * 自动检测是否中断连续签到
 */
const checkTodayStatus = () => {
  const today = formatDate(new Date())
  hasCheckedInToday.value = lastCheckInDate.value === today
  
  // 检查是否中断连续签到
  if (lastCheckInDate.value) {
    const lastDate = new Date(lastCheckInDate.value)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    yesterday.setHours(0, 0, 0, 0)
    
    // 如果上次签到早于昨天，说明中断了连续签到
    if (lastDate < yesterday) {
      consecutiveDays.value = 0
      saveUserData()
      console.log('[每日签到] 检测到签到中断，重置连续天数')
    }
  }
}

/**
 * 根据连续签到天数计算额外奖励积分
 * 
 * @param {number} days - 连续签到天数
 * @returns {number} 额外奖励积分
 */
const calculateConsecutiveBonus = (days) => {
  let bonus = 0
  
  // 遍历所有里程碑，找到最高可达成的奖励
  milestones.value.forEach(milestone => {
    if (days >= milestone.days) {
      bonus = milestone.bonus
    }
  })
  
  return bonus
}

/**
 * 获取里程碑的状态文本
 * 
 * @param {Object} milestone - 里程碑对象
 * @returns {string} 状态文本
 */
const getMilestoneStatus = (milestone) => {
  if (consecutiveDays.value >= milestone.days) {
    return t('dailyCheckIn.milestone.achieved')
  } else if (consecutiveDays.value === milestone.days - 1) {
    return t('dailyCheckIn.milestone.oneDayLeft')
  } else {
    return t('dailyCheckIn.milestone.daysLeft', { days: milestone.days - consecutiveDays.value })
  }
}

// ========================================
// 事件处理函数
// ========================================

/**
 * 执行签到操作
 * 更新连续天数、计算奖励、保存数据
 */
const handleCheckIn = async () => {
  // 验证签到条件
  if (!canCheckIn.value || isCheckingIn.value) return
  
  isCheckingIn.value = true
  
  const today = formatDate(new Date())
  
  // 判断是否连续签到
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = formatDate(yesterday)
  
  if (lastCheckInDate.value === yesterdayStr) {
    // 昨天也签到了，连续天数+1
    consecutiveDays.value++
  } else {
    // 中断后重新签到，从1开始
    consecutiveDays.value = 1
  }
  
  // 计算奖励积分
  const basePoints = 10  // 基础签到奖励
  const bonusPoints = calculateConsecutiveBonus(consecutiveDays.value)
  const totalPoints = basePoints + bonusPoints
  
  // 更新用户积分
  userPoints.value += totalPoints
  
  // 更新签到状态
  lastCheckInDate.value = today
  hasCheckedInToday.value = true
  
  // 创建签到记录
  const record = {
    date: today,
    displayDate: formatDisplayDate(today),
    consecutiveDays: consecutiveDays.value,
    basePoints,
    bonus: bonusPoints,
    totalPoints,
    timestamp: Date.now()
  }
  
  // 添加到历史记录开头
  checkInHistory.value.unshift(record)
  
  // 只保留最近30条记录
  if (checkInHistory.value.length > 30) {
    checkInHistory.value = checkInHistory.value.slice(0, 30)
  }
  
  // 添加到本月签到日期列表
  if (!checkedInDates.value.includes(today)) {
    checkedInDates.value.push(today)
  }
  
  // 保存所有数据
  saveUserData()
  
  // 延迟显示成功提示，提升用户体验
  setTimeout(() => {
    let message = t('dailyCheckIn.success.base', { points: basePoints })
    
    if (bonusPoints > 0) {
      message += t('dailyCheckIn.success.bonus', { days: consecutiveDays.value, points: bonusPoints })
    }
    
    showToast({
      message,
      type: 'success',
      duration: 2500
    })
    
    isCheckingIn.value = false
    
    console.log('[每日签到] 签到成功，连续天数:', consecutiveDays.value, '获得积分:', totalPoints)
  }, 500)
}
</script>

<style lang="less" scoped>
.daily-checkin-game {
  /* ========================================
     游戏信息栏
     ======================================== */
  .game-info-bar {
    display: flex;
    justify-content: space-around;
    background: var(--color-bg-secondary);
    padding: var(--spacing-md);
    border-radius: var(--radius-lg);
    margin-bottom: var(--spacing-lg);
    box-shadow: var(--shadow-sm);

    .info-item {
      text-align: center;

      .info-label {
        display: block;
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-xs);
      }

      .info-value {
        display: block;
        font-size: var(--font-size-xl);
        color: var(--color-primary);
        font-weight: var(--font-weight-bold);

        &.streak {
          color: var(--color-warning);
        }
      }
    }
  }

  /* ========================================
     游戏规则
     ======================================== */
  .game-rules {
    background: var(--color-bg-secondary);
    padding: var(--spacing-md);
    border-radius: var(--radius-lg);
    margin-bottom: var(--spacing-lg);
    border-left: 4px solid var(--color-primary);

    .rules-title {
      font-size: var(--font-size-base);
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-sm);
      font-weight: var(--font-weight-semibold);
    }

    .rules-list {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        line-height: var(--line-height-relaxed);
        padding-left: var(--spacing-md);
        position: relative;
        margin-bottom: var(--spacing-xs);

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--color-primary);
          font-weight: bold;
        }
      }
    }
  }

  /* ========================================
     签到日历
     ======================================== */
  .calendar-section {
    margin-bottom: var(--spacing-xl);

    .calendar-title {
      font-size: var(--font-size-base);
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-md);
      font-weight: var(--font-weight-semibold);
    }

    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: var(--spacing-xs);
      background: var(--color-bg-secondary);
      padding: var(--spacing-md);
      border-radius: var(--radius-lg);

      .calendar-day {
        aspect-ratio: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: var(--color-bg-tertiary);
        border-radius: var(--radius-sm);
        position: relative;
        transition: all var(--transition-fast);

        .day-number {
          font-size: var(--font-size-sm);
          color: var(--color-text-primary);
          font-weight: var(--font-weight-medium);
        }

        .check-mark {
          position: absolute;
          bottom: 2px;
          right: 2px;
          font-size: var(--font-size-xs);
          color: var(--color-success);
          font-weight: bold;
        }

        &.today {
          background: rgba(24, 144, 255, 0.1);
          border: 2px solid var(--color-primary);

          .day-number {
            color: var(--color-primary);
            font-weight: var(--font-weight-bold);
          }
        }

        &.checked-in {
          background: rgba(82, 196, 26, 0.1);

          .day-number {
            color: var(--color-success);
          }
        }

        &.future {
          opacity: 0.4;
        }
      }
    }
  }

  /* ========================================
     奖励展示
     ======================================== */
  .rewards-section {
    margin-bottom: var(--spacing-xl);

    .rewards-title {
      font-size: var(--font-size-base);
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-md);
      font-weight: var(--font-weight-semibold);
    }

    .rewards-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-md);

      .milestone-card {
        padding: var(--spacing-md);
        background: var(--color-bg-secondary);
        border-radius: var(--radius-md);
        text-align: center;
        border: 2px solid transparent;
        transition: all var(--transition-fast);

        &.achieved {
          background: linear-gradient(135deg, rgba(82, 196, 26, 0.1) 0%, rgba(82, 196, 26, 0.05) 100%);
          border-color: var(--color-success);

          .milestone-days {
            color: var(--color-success);
          }
        }

        &.current {
          background: linear-gradient(135deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 193, 7, 0.05) 100%);
          border-color: var(--color-warning);
          animation: pulse 2s ease-in-out infinite;
        }

        .milestone-days {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          color: var(--color-text-primary);
          margin-bottom: var(--spacing-xs);
        }

        .milestone-bonus {
          font-size: var(--font-size-sm);
          color: var(--color-success);
          font-weight: var(--font-weight-semibold);
          margin-bottom: var(--spacing-xs);
        }

        .milestone-status {
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
        }
      }
    }
  }

  /* ========================================
     操作区域
     ======================================== */
  .action-section {
    margin-bottom: var(--spacing-xl);

    .checkin-prompt {
      text-align: center;
      margin-bottom: var(--spacing-md);
      animation: fadeIn 0.5s ease-in;

      .prompt-icon {
        font-size: 2rem;
        margin-bottom: var(--spacing-xs);
      }

      .prompt-text {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
      }
    }

    .checkin-button {
      margin-bottom: var(--spacing-md);
    }

    .next-checkin-hint {
      text-align: center;
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
      padding: var(--spacing-sm);
      background: var(--color-bg-secondary);
      border-radius: var(--radius-md);
    }
  }

  /* ========================================
     历史记录
     ======================================== */
  .history-section {
    .history-title {
      font-size: var(--font-size-base);
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-md);
      font-weight: var(--font-weight-semibold);
    }

    .history-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);

      .history-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-md);
        background: var(--color-bg-secondary);
        border-radius: var(--radius-md);
        animation: slideIn 0.3s ease-out;

        .history-date {
          font-size: var(--font-size-sm);
          color: var(--color-text-primary);
          font-weight: var(--font-weight-medium);
        }

        .history-details {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;

          .history-base {
            font-size: var(--font-size-xs);
            color: var(--color-text-secondary);
          }

          .history-bonus {
            font-size: var(--font-size-xs);
            color: var(--color-warning);
            font-weight: var(--font-weight-medium);
          }

          .history-total {
            font-size: var(--font-size-sm);
            color: var(--color-success);
            font-weight: var(--font-weight-bold);
          }
        }
      }
    }
  }
}

/* ========================================
   动画定义
   ======================================== */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.9;
  }
}
</style>
