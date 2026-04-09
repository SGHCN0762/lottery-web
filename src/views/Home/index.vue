<template>
  <div class="home-page">
    <!-- 欢迎卡片 -->
    <section class="welcome-card">
      <div class="card-header">
        <div class="welcome-icon">🎯</div>
        
        <div class="welcome-info">
          <h2 class="welcome-title">幸运大转盘</h2>
          <p class="welcome-subtitle">转动转盘赢积分，每日签到领好礼！</p>
        </div>
      </div>

      <!-- 用户积分显示 -->
      <div class="points-display">
        <van-icon name="gold-coin-o" size="20" />
        <span>当前积分：{{ userPoints }}</span>
      </div>
    </section>

    <!-- 转盘区域 -->
    <section class="wheel-section">
      <div class="section-title">点击转盘抽奖（消耗10积分）</div>
      
      <div class="wheel-container">
        <!-- 转盘 -->
        <div 
          class="wheel" 
          :class="{ 'spinning': isSpinning }"
          :style="{ transform: `rotate(${wheelRotation}deg)` }"
        >
          <div 
            v-for="(prize, index) in prizes" 
            :key="index"
            class="wheel-segment"
            :style="getSegmentStyle(index)"
          >
            <div class="segment-content">
              <span class="segment-icon">{{ prize.icon }}</span>
              <span class="segment-text">{{ prize.name }}</span>
            </div>
          </div>
        </div>

        <!-- 指针 -->
        <div class="wheel-pointer">
          <van-icon name="arrow-up" size="32" color="#FF4444" />
        </div>

        <!-- 中心按钮 -->
        <button 
          class="spin-button" 
          @click="handleSpinWheel"
          :disabled="isSpinning || userPoints < 10"
        >
          {{ isSpinning ? '抽奖中...' : '开始' }}
        </button>
      </div>
      
      <!-- 结果显示 -->
      <p v-if="drawResult" class="result-message" :class="resultClass">
        {{ drawResult }}
      </p>
    </section>

    <!-- 奖品列表 -->
    <section class="prizes-section">
      <div class="section-title">奖品说明</div>
      <van-cell-group inset>
        <van-cell 
          v-for="prize in prizes" 
          :key="prize.id"
          :title="`${prize.icon} ${prize.name}`"
          :label="prize.description"
        >
          <template #default>
            <span class="prize-probability">{{ prize.probability }}</span>
          </template>
        </van-cell>
      </van-cell-group>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  CellGroup as VanCellGroup, 
  Cell as VanCell,
  Icon as VanIcon,
  showToast
} from 'vant'

// ========================================
// 响应式数据
// ========================================

/** 用户积分（虚拟积分，仅用于娱乐） */
const userPoints = ref(100)

/** 转盘旋转角度 */
const wheelRotation = ref(0)

/** 是否正在旋转 */
const isSpinning = ref(false)

/** 抽奖结果文本 */
const drawResult = ref('')

/** 奖品配置 */
const prizes = ref([
  { id: 1, name: '100积分', icon: '💎', description: '超级大奖', probability: '5%', points: 100 },
  { id: 2, name: '50积分', icon: '🎁', description: '丰厚奖励', probability: '10%', points: 50 },
  { id: 3, name: '30积分', icon: '🎊', description: '不错哦', probability: '15%', points: 30 },
  { id: 4, name: '20积分', icon: '🌟', description: '小惊喜', probability: '20%', points: 20 },
  { id: 5, name: '10积分', icon: '✨', description: '参与奖', probability: '25%', points: 10 },
  { id: 6, name: '5积分', icon: '💫', description: '鼓励奖', probability: '25%', points: 5 }
])

// ========================================
// 计算属性
// ========================================

/** 根据中奖积分确定结果样式类 */
const resultClass = computed(() => {
  if (!drawResult.value) return ''
  return drawResult.value.includes('恭喜') ? 'result-success' : 'result-info'
})

// ========================================
// 工具函数
// ========================================

/**
 * 计算每个扇形的样式
 * @param {number} index - 奖品索引
 * @returns {Object} CSS样式对象
 */
const getSegmentStyle = (index) => {
  const segmentAngle = 360 / prizes.value.length
  const rotate = index * segmentAngle
  
  return {
    transform: `rotate(${rotate}deg)`,
    background: index % 2 === 0 ? '#FF6B6B' : '#4FACFE'
  }
}

/**
 * 根据随机数确定中奖奖品
 * @returns {Object} 中奖奖品对象
 */
const determinePrize = () => {
  const random = Math.random() * 100
  let cumulative = 0
  
  for (const prize of prizes.value) {
    cumulative += parseFloat(prize.probability)
    if (random <= cumulative) {
      return prize
    }
  }
  
  return prizes.value[prizes.value.length - 1]
}

// ========================================
// 事件处理函数
// ========================================

/**
 * 转动转盘
 */
const handleSpinWheel = () => {
  // 检查积分是否足够
  const cost = 10
  if (userPoints.value < cost) {
    showToast({ 
      message: '积分不足，请明日签到后再来！', 
      icon: 'fail',
      duration: 2000
    })
    return
  }
  
  // 扣除积分
  userPoints.value -= cost
  
  // 设置旋转状态
  isSpinning.value = true
  drawResult.value = ''
  
  // 确定中奖奖品
  const wonPrize = determinePrize()
  
  // 计算目标角度（让指针指向中奖扇形）
  const segmentAngle = 360 / prizes.value.length
  const prizeIndex = prizes.value.findIndex(p => p.id === wonPrize.id)
  
  // 关键修复：基于当前角度的整圈数计算，确保精准定位
  // 计算当前已经转过的完整圈数
  const currentFullRotations = Math.floor(wheelRotation.value / 360) * 360
  
  // 奖品中心角度 = 索引 * 每段角度 + 半段角度
  const prizeCenterAngle = prizeIndex * segmentAngle + segmentAngle / 2
  
  // 要让奖品中心对准顶部指针（0度），需要旋转到该位置
  // 由于指针在顶部，我们需要让转盘旋转到让奖品到达顶部
  const targetAngle = 360 - prizeCenterAngle
  
  // 添加额外的旋转圈数（至少5圈）
  const extraRotations = 5 * 360
  
  // 最终旋转角度 = 当前整圈数 + 额外圈数 + 目标角度
  const finalRotation = currentFullRotations + extraRotations + targetAngle
  
  // 执行旋转动画
  wheelRotation.value = finalRotation
  
  // 旋转结束后显示结果
  setTimeout(() => {
    isSpinning.value = false
    
    // 发放奖励
    userPoints.value += wonPrize.points
    
    // 显示强提醒弹窗
    showPrizeModal(wonPrize)
    
    // 同时显示底部结果消息
    if (wonPrize.points >= 50) {
      drawResult.value = `🎉 恭喜！获得${wonPrize.name}！`
    } else if (wonPrize.points >= 20) {
      drawResult.value = `👍 不错！获得${wonPrize.name}！`
    } else {
      drawResult.value = `😊 获得${wonPrize.name}，继续加油！`
    }
  }, 3000) // 3秒后显示结果
}

/**
 * 显示奖品弹窗（强提醒）
 * @param {Object} prize - 中奖奖品对象
 */
const showPrizeModal = (prize) => {
  // 根据奖品价值显示不同的提示
  if (prize.points >= 50) {
    // 大奖：使用 Dialog 弹窗 + 震动效果
    showToast({
      message: `🎊 恭喜获得大奖！\n${prize.icon} ${prize.name}\n+${prize.points}积分`,
      icon: 'success',
      duration: 2500,
      className: 'prize-toast-large'
    })
    
    // 触发手机震动（如果支持）
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 200])
    }
  } else if (prize.points >= 20) {
    // 中等奖励
    showToast({
      message: `✨ 获得${prize.name}\n+${prize.points}积分`,
      icon: 'like-o',
      duration: 2000
    })
    
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100])
    }
  } else {
    // 小奖
    showToast({
      message: `${prize.icon} +${prize.points}积分`,
      icon: 'star-o',
      duration: 1500
    })
    
    if (navigator.vibrate) {
      navigator.vibrate(100)
    }
  }
}
</script>

<style lang="less" scoped>
.home-page {
  min-height: 100%;
  background: var(--color-bg-primary);
  padding-bottom: calc(var(--spacing-xl) + env(safe-area-inset-bottom, 0px));
}

/* ========================================
   欢迎卡片
   ======================================== */
.welcome-card {
  margin: var(--spacing-md);
  padding: var(--spacing-xl);
  background: var(--gradient-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  color: white;

  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-lg);

    .welcome-icon {
      font-size: 56px;
      margin-right: var(--spacing-md);
      filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
    }

    .welcome-info {
      flex: 1;

      .welcome-title {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-semibold);
        margin: 0 0 var(--spacing-xs) 0;
        letter-spacing: 0.5px;
      }

      .welcome-subtitle {
        font-size: var(--font-size-sm);
        opacity: 0.85;
        margin: 0;
      }
    }
  }

  /* 积分显示 */
  .points-display {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    padding-top: var(--spacing-md);
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
  }
}

/* ========================================
   区块标题
   ======================================== */
.section-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: var(--spacing-lg) var(--spacing-md) var(--spacing-md);
  font-weight: var(--font-weight-medium);
}

/* ========================================
   转盘区域
   ======================================== */
.wheel-section {
  margin: 0 var(--spacing-md);
  margin-bottom: var(--spacing-lg);

  .wheel-container {
    position: relative;
    width: 280px;
    height: 280px;
    margin: 0 auto var(--spacing-lg);

    /* 转盘主体 */
    .wheel {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      transition: transform 3s cubic-bezier(0.25, 0.1, 0.25, 1);
      border: 6px solid white;

      /* 旋转时的发光效果 */
      &.spinning {
        box-shadow: 0 0 30px rgba(255, 215, 0, 0.6),
                    0 0 60px rgba(255, 215, 0, 0.3);
        animation: wheelGlow 1s ease-in-out infinite;
      }

      .wheel-segment {
        position: absolute;
        width: 50%;
        height: 50%;
        top: 0;
        right: 0;
        transform-origin: 0% 100%;
        clip-path: polygon(0 0, 100% 0, 100% 100%);

        .segment-content {
          position: absolute;
          top: 20%;
          right: 15%;
          transform: rotate(45deg);
          text-align: center;
          color: white;

          .segment-icon {
            display: block;
            font-size: 24px;
            margin-bottom: 4px;
          }

          .segment-text {
            display: block;
            font-size: 12px;
            font-weight: var(--font-weight-semibold);
          }
        }
      }
    }

    /* 指针 */
    .wheel-pointer {
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    }

    /* 中心按钮 */
    .spin-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
      border: 4px solid white;
      color: white;
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-bold);
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transition: all var(--transition-fast);
      z-index: 5;

      &:hover:not(:disabled) {
        transform: translate(-50%, -50%) scale(1.1);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
      }

      &:active:not(:disabled) {
        transform: translate(-50%, -50%) scale(0.95);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }

  /* 结果消息 */
  .result-message {
    margin-top: var(--spacing-md);
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    text-align: center;
    animation: resultPopIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    box-shadow: var(--shadow-md);

    &.result-success {
      background: linear-gradient(135deg, rgba(52, 199, 89, 0.15) 0%, rgba(52, 199, 89, 0.05) 100%);
      border: 2px solid var(--color-success);
      color: var(--color-success);
      animation: resultPopIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), 
                 successPulse 2s ease-in-out infinite;
    }

    &.result-info {
      background: linear-gradient(135deg, rgba(255, 149, 0, 0.15) 0%, rgba(255, 149, 0, 0.05) 100%);
      border: 2px solid var(--color-warning);
      color: var(--color-warning);
      animation: resultPopIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
  }
}

/* ========================================
   动画定义
   ======================================== */

/** 结果弹出动画 */
@keyframes resultPopIn {
  0% {
    opacity: 0;
    transform: scale(0.5) translateY(20px);
  }
  50% {
    transform: scale(1.05) translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/** 成功状态脉冲动画 */
@keyframes successPulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(52, 199, 89, 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(52, 199, 89, 0);
  }
}

/** 转盘发光动画 */
@keyframes wheelGlow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.4),
                0 0 40px rgba(255, 215, 0, 0.2);
  }
  50% {
    box-shadow: 0 0 40px rgba(255, 215, 0, 0.8),
                0 0 80px rgba(255, 215, 0, 0.4);
  }
}

/* ========================================
   奖品弹窗自定义样式
   ======================================== */
:deep(.prize-toast-large) {
  .van-toast__text {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    line-height: 1.6;
    white-space: pre-line;
  }

  .van-icon {
    font-size: 48px;
    margin-bottom: var(--spacing-md);
  }
}
</style>
