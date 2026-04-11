<template>
  <div class="lucky-wheel-game">
    <!-- 游戏信息栏 -->
    <section class="game-info-bar">
      <div class="info-item">
        <span class="info-label">{{ t('luckyWheel.myPoints') }}</span>
        <span class="info-value">{{ userPoints }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">{{ t('luckyWheel.cost') }}</span>
        <span class="info-value cost">10 {{ t('common.points') }}</span>
      </div>
    </section>

    <!-- 游戏规则 -->
    <section class="game-rules">
      <h3 class="rules-title">📋 {{ t('luckyWheel.rules.title') }}</h3>
      <ul class="rules-list">
        <li>{{ t('luckyWheel.rules.rule1') }}</li>
        <li>{{ t('luckyWheel.rules.rule2') }}</li>
        <li>{{ t('luckyWheel.rules.rule3') }}</li>
        <li>{{ t('luckyWheel.rules.rule4') }}</li>
      </ul>
    </section>

    <!-- 转盘区域 -->
    <section class="wheel-section">
      <div class="wheel-container">
        <!-- 转盘主体 -->
        <div
          class="wheel"
          :style="{
            transform: `rotate(${wheelRotation}deg)`,
            transition: isSpinning ? `transform ${spinDuration}s cubic-bezier(0.23, 1, 0.32, 1)` : 'none'
          }"
        >
          <!-- 使用conic-gradient绘制精确扇形背景 -->
          <div class="wheel-background" :style="{ background: wheelBackground }"></div>

          <!-- 奖品文字层 -->
          <div
            v-for="(prize, index) in prizes"
            :key="index"
            class="wheel-segment"
            :style="getSegmentStyle(index)"
          >
            <div class="segment-content">
              <div class="segment-icon">{{ prize.icon }}</div>
              <div class="segment-text">{{ prize.name }}</div>
            </div>
          </div>
        </div>

        <!-- 中心按钮 -->
        <div class="wheel-center">
          <van-button
            type="primary"
            size="small"
            round
            @click="startSpin"
            :disabled="isSpinning || userPoints < 10"
            class="spin-button"
          >
            {{ isSpinning ? t('common.spinning') : t('luckyWheel.start') }}
          </van-button>
        </div>

        <!-- 指针 -->
        <div class="wheel-pointer"></div>
      </div>
    </section>

    <!-- 抽奖记录 -->
    <section v-if="spinHistory.length > 0" class="history-section">
      <h3 class="history-title">🎁 {{ t('luckyWheel.history') }}</h3>
      <div class="history-list">
        <div
          v-for="(record, index) in spinHistory"
          :key="index"
          class="history-item"
        >
          <span class="history-icon">{{ record.prize.icon }}</span>
          <span class="history-name">{{ record.prize.name }}</span>
          <span class="history-time">{{ record.time }}</span>
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

/** 转盘当前旋转角度（度） */
const wheelRotation = ref(0)

/** 是否正在旋转中 */
const isSpinning = ref(false)

/** 旋转动画持续时间（秒） */
const spinDuration = ref(4)

/**
 * 奖品配置列表
 * 每个奖品包含：id、名称、图标、积分值、背景色
 */
const prizes = ref([
  { id: 1, name: '5积分', icon: '🎁', points: 5, color: '#FF6B6B' },
  { id: 2, name: '10积分', icon: '🎀', points: 10, color: '#4ECDC4' },
  { id: 3, name: '20积分', icon: '🎊', points: 20, color: '#45B7D1' },
  { id: 4, name: '30积分', icon: '🎉', points: 30, color: '#FFA07A' },
  { id: 5, name: '50积分', icon: '💎', points: 50, color: '#98D8C8' },
  { id: 6, name: '100积分', icon: '👑', points: 100, color: '#F7DC6F' }
])

/** 抽奖历史记录数组 */
const spinHistory = ref([])

// ========================================
// 计算属性
// ========================================

/**
 * 生成转盘背景渐变
 * 使用conic-gradient精确绘制6个扇形，每个扇形60度
 * @returns {string} CSS conic-gradient字符串
 */
const wheelBackground = computed(() => {
  const segmentAngle = 360 / prizes.value.length
  let gradient = 'conic-gradient('
  
  prizes.value.forEach((prize, index) => {
    const startAngle = index * segmentAngle
    const endAngle = (index + 1) * segmentAngle
    
    if (index > 0) {
      gradient += ', '
    }
    gradient += `${prize.color} ${startAngle}deg ${endAngle}deg`
  })
  
  gradient += ')'
  return gradient
})

// ========================================
// 生命周期钩子
// ========================================

/**
 * 组件挂载时加载用户数据
 */
onMounted(() => {
  loadUserPoints()
  loadSpinHistory()
})

// ========================================
// 工具函数 - 数据持久化
// ========================================

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
 * 计算奖品扇形的旋转样式
 * 将文字定位到每个扇形的中心位置
 * @param {number} index - 奖品索引
 * @returns {Object} CSS transform样式对象
 */
const getSegmentStyle = (index) => {
  const segmentAngle = 360 / prizes.value.length
  // 旋转到扇形中心：起始角度 + 半个扇形角度
  const rotate = index * segmentAngle + segmentAngle / 2
  
  return {
    transform: `rotate(${rotate}deg)`
  }
}

/**
 * 格式化当前时间为 HH:MM 格式
 * @returns {string} 格式化后的时间字符串
 */
const formatTime = () => {
  const now = new Date()
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
}

// ========================================
// 游戏核心逻辑
// ========================================

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
  userPoints.value -= 10
  saveUserPoints()

  // 随机选择奖品索引（0-5）
  const prizeIndex = Math.floor(Math.random() * prizes.value.length)
  const selectedPrize = prizes.value[prizeIndex]

  console.log('[幸运转盘] 选中奖品:', selectedPrize.name, '索引:', prizeIndex)

  // 执行旋转动画
  await spinToPrize(prizeIndex, selectedPrize)
}

/**
 * 旋转转盘到指定奖品位置
 * 使用精准的角度计算确保奖品对准顶部指针
 * 
 * @param {number} prizeIndex - 奖品索引
 * @param {Object} prize - 奖品对象
 */
const spinToPrize = async (prizeIndex, prize) => {
  const segmentAngle = 360 / prizes.value.length
  
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

  // 旋转结束，发放奖励
  handleWin(prize)

  isSpinning.value = false
}

/**
 * 处理中奖逻辑
 * 添加积分、记录历史、显示提示
 * 
 * @param {Object} prize - 中奖的奖品对象
 */
const handleWin = (prize) => {
  // 添加奖品积分到用户总积分
  userPoints.value += prize.points
  saveUserPoints()

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

  // 显示中奖提示
  showToast({
    message: t('luckyWheel.won', { prize: prize.name }),
    type: 'success',
    duration: 2000
  })
}
</script>

<style lang="less" scoped>
.lucky-wheel-game {
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

        &.cost {
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
     转盘区域
     ======================================== */
  .wheel-section {
    margin-bottom: var(--spacing-xl);

    .wheel-container {
      position: relative;
      width: 300px;
      height: 300px;
      margin: 0 auto;

      .wheel {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        border: 8px solid #fff;

        .wheel-background {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }

        .wheel-segment {
          position: absolute;
          top: 0;
          left: 50%;
          width: 0;
          height: 50%;
          transform-origin: bottom center;
          z-index: 1;

          .segment-content {
            position: absolute;
            top: 18%;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            width: 80px;
            
            .segment-icon {
              font-size: 1.5rem;
              margin-bottom: 4px;
            }

            .segment-text {
              font-size: var(--font-size-xs);
              color: #fff;
              font-weight: var(--font-weight-bold);
              text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
              white-space: nowrap;
            }
          }
        }
      }

      .wheel-center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;

        .spin-button {
          min-width: 80px;
          height: 80px;
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-bold);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
      }

      .wheel-pointer {
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-top: 30px solid #FF4757;
        z-index: 20;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
      }
    }
  }

  /* ========================================
     抽奖记录
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
        align-items: center;
        gap: var(--spacing-md);
        padding: var(--spacing-md);
        background: var(--color-bg-secondary);
        border-radius: var(--radius-md);
        animation: slideIn 0.3s ease-out;

        .history-icon {
          font-size: 1.5rem;
        }

        .history-name {
          flex: 1;
          font-size: var(--font-size-sm);
          color: var(--color-text-primary);
          font-weight: var(--font-weight-medium);
        }

        .history-time {
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
        }
      }
    }
  }
}

/* ========================================
   动画定义
   ======================================== */
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
</style>
