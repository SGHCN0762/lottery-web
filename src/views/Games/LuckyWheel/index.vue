<template>
  <div class="lucky-wheel-game">
    <!-- 游戏信息栏 -->
    <GameInfoBar :userPoints="userPoints" />

    <!-- 游戏规则 -->
    <GameRules />

    <!-- 转盘区域 -->
    <LuckyWheel
      :prizes="prizes"
      :wheelRotation="wheelRotation"
      :isSpinning="isSpinning"
      :spinDuration="spinDuration"
      :userPoints="userPoints"
      @spin="startSpin"
    />

    <!-- 抽奖记录 -->
    <SpinHistory :history="spinHistory" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { showToast } from 'vant'
import GameInfoBar from './components/GameInfoBar.vue'
import GameRules from './components/GameRules.vue'
import LuckyWheel from './components/LuckyWheel.vue'
import SpinHistory from './components/SpinHistory.vue'
import { useUserPoints } from './hooks/useUserPoints'
import { useSpinHistory } from './hooks/useSpinHistory'
import { useWheelRotation } from './hooks/useWheelRotation'
import { useLottery } from './hooks/useLottery'

// ========================================
// i18n
// ========================================
const { t } = useI18n()

// ========================================
// 奖品配置列表
// 每个奖品包含：id、名称、图标、积分值、背景色
// ========================================
const prizes = ref([
  { id: 1, name: '5积分', icon: '🎁', points: 5, color: '#FF6B6B' },
  { id: 2, name: '10积分', icon: '🎀', points: 10, color: '#4ECDC4' },
  { id: 3, name: '20积分', icon: '🎊', points: 20, color: '#45B7D1' },
  { id: 4, name: '30积分', icon: '🎉', points: 30, color: '#FFA07A' },
  { id: 5, name: '50积分', icon: '💎', points: 50, color: '#98D8C8' },
  { id: 6, name: '100积分', icon: '👑', points: 100, color: '#F7DC6F' }
])

// ========================================
// 使用hooks管理用户积分
// ========================================
const { userPoints, loadUserPoints } = useUserPoints()

// ========================================
// 使用hooks管理抽奖历史
// ========================================
const { spinHistory, loadSpinHistory } = useSpinHistory()

// ========================================
// 使用hooks管理转盘旋转
// ========================================
const { wheelRotation, isSpinning, spinDuration } = useWheelRotation(prizes)

// ========================================
// 使用hooks管理抽奖核心逻辑
// ========================================
const { startSpin } = useLottery(
  { userPoints, updateUserPoints: (amount) => { userPoints.value += amount; } },
  { addSpinRecord: (prize) => {
      const record = {
        prize,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        timestamp: Date.now()
      }
      spinHistory.value.unshift(record)
      if (spinHistory.value.length > 10) {
        spinHistory.value = spinHistory.value.slice(0, 10)
      }
    }
  },
  { isSpinning, spinToPrize: (prizeIndex, prize) => {
      const segmentAngle = 360 / prizes.value.length
      const prizeCenterAngle = prizeIndex * segmentAngle + segmentAngle / 2
      const targetRotation = -prizeCenterAngle
      const currentFullRotations = Math.floor(wheelRotation.value / 360) * 360
      const extraRotations = 5 * 360
      const finalRotation = currentFullRotations + extraRotations + targetRotation

      wheelRotation.value = finalRotation
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(prize); // 确保返回奖品对象
        }, spinDuration.value * 1000);
      });
    }, resetWheel: () => { isSpinning.value = false; }
  },
  prizes.value,
  t
)

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
</script>

<style lang="less" scoped>
/* ========================================
   全局动画定义
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
