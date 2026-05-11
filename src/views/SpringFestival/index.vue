<template>
  <div class="spring-festival-page">
    <!-- 烟花背景层 -->
    <div class="fireworks-container">
      <div 
        v-for="firework in fireworks" 
        :key="firework.id"
        class="firework"
        :style="{
          left: firework.x + '%',
          bottom: firework.y + '%',
          animationDelay: firework.delay + 's',
          animationDuration: firework.duration + 's'
        }"
      >
        <div 
        v-for="particle in firework.particles" 
        :key="particle.id"
        class="particle"
        :style="{
          '--color': particle.color,
          '--angle': particle.angle + 'deg',
          '--distance': particle.distance + 'px',
          '--size': particle.size + 'px',
          '--tx': Math.cos(particle.angle * Math.PI / 180) * particle.distance + 'px',
          '--ty': Math.sin(particle.angle * Math.PI / 180) * particle.distance + 'px'
        }"
      ></div>
      </div>
    </div>

    <!-- 鞭炮装饰 -->
    <div class="firecrackers-container">
      <div class="firecracker left">
        <div class="cracker-string"></div>
        <div class="cracker-body">
          <div v-for="i in 8" :key="i" class="cracker-segment"></div>
        </div>
        <div class="cracker-fuse"></div>
        <div class="spark"></div>
      </div>
      <div class="firecracker right">
        <div class="cracker-string"></div>
        <div class="cracker-body">
          <div v-for="i in 8" :key="i" class="cracker-segment"></div>
        </div>
        <div class="cracker-fuse"></div>
        <div class="spark"></div>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 春节标题 -->
      <div class="title-section">
        <h1 class="festival-title">
          <span class="title-icon">🧧</span>
          <span class="title-text">春节倒计时</span>
          <span class="title-icon">🧧</span>
        </h1>
        <p class="festival-subtitle">{{ nextSpringFestivalYear }}年 {{ zodiacYear }}年</p>
      </div>

      <!-- 倒计时数字 -->
      <div class="countdown-section">
        <div class="countdown-box">
          <div class="countdown-value">{{ countdown.days }}</div>
          <div class="countdown-label">天</div>
        </div>
        <div class="countdown-box">
          <div class="countdown-value">{{ countdown.hours }}</div>
          <div class="countdown-label">时</div>
        </div>
        <div class="countdown-box">
          <div class="countdown-value">{{ countdown.minutes }}</div>
          <div class="countdown-label">分</div>
        </div>
        <div class="countdown-box">
          <div class="countdown-value">{{ countdown.seconds }}</div>
          <div class="countdown-label">秒</div>
        </div>
      </div>

      <!-- 节日祝福语 -->
      <div class="greeting-section">
        <p class="greeting-text">🎉 祝您新春快乐，万事如意 🎉</p>
        <p class="greeting-subtext">阖家团圆 · 幸福安康 · 财源广进</p>
      </div>

      <!-- 装饰元素 -->
      <div class="decorations">
        <div class="lantern" v-for="i in 6" :key="i" :style="{ '--delay': i * 0.3 + 's' }"></div>
        <div class="red-packet" v-for="i in 4" :key="'packet-' + i" :style="{ '--delay': (i * 0.4 + 0.2) + 's' }"></div>
      </div>
    </div>

    <!-- 底部提示 -->
    <div class="footer-tip">
      <span>🏮 距离春节还有 {{ countdown.days }} 天 🏮</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 计算下一个春节的年份
const currentYear = new Date().getFullYear()
const nextSpringFestivalYear = computed(() => {
  const today = new Date()
  // 春节通常在1月或2月，这里简单判断
  if (today.getMonth() >= 1 && today.getDate() >= 10) {
    return currentYear + 1
  }
  return currentYear
})

// 生肖年份
const zodiacs = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
const zodiacYear = computed(() => {
  const year = nextSpringFestivalYear.value
  return zodiacs[(year - 4) % 12]
})

// 倒计时数据
const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

// 烟花数据
const fireworks = ref([])

// 计算春节日期（农历正月初一）
const getSpringFestivalDate = () => {
  // 2025年春节是1月29日
  // 实际项目中应该使用农历转换库
  const springFestivalDates = {
    2024: new Date(2024, 0, 10),  // 2024年春节
    2025: new Date(2025, 0, 29),  // 2025年春节
    2026: new Date(2026, 1, 17),  // 2026年春节
    2027: new Date(2027, 1, 6),   // 2027年春节
    2028: new Date(2028, 0, 26),  // 2028年春节
  }
  
  const year = nextSpringFestivalYear.value
  if (springFestivalDates[year]) {
    return springFestivalDates[year]
  }
  
  // 默认返回下一年2月10日作为春节
  return new Date(year, 1, 10)
}

// 更新倒计时
const updateCountdown = () => {
  const now = new Date()
  const springFestival = getSpringFestivalDate()
  const diff = springFestival - now
  
  if (diff <= 0) {
    countdown.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return
  }
  
  countdown.value = {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000)
  }
}

// 生成烟花
const generateFirework = () => {
  const id = Date.now() + Math.random()
  const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF9F43', '#A55EEA', '#FF6B9D', '#00D9FF']
  
  const particles = []
  const particleCount = Math.floor(Math.random() * 12) + 12
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: (360 / particleCount) * i + Math.random() * 10,
      distance: Math.random() * 120 + 80,
      size: Math.random() * 6 + 3
    })
  }
  
  fireworks.value.push({
    id,
    x: Math.random() * 80 + 10,
    y: Math.random() * 30 + 20,
    delay: 0,
    duration: Math.random() * 2 + 1.5,
    particles
  })
  
  // 3秒后移除烟花
  setTimeout(() => {
    fireworks.value = fireworks.value.filter(f => f.id !== id)
  }, 3000)
}

let countdownInterval = null
let fireworkInterval = null

onMounted(() => {
  updateCountdown()
  countdownInterval = setInterval(updateCountdown, 1000)
  
  // 随机生成烟花
  fireworkInterval = setInterval(() => {
    if (Math.random() > 0.5) {
      generateFirework()
    }
  }, 2000)
  
  // 初始烟花
  setTimeout(generateFirework, 500)
})

onUnmounted(() => {
  if (countdownInterval) clearInterval(countdownInterval)
  if (fireworkInterval) clearInterval(fireworkInterval)
})
</script>

<style lang="less" scoped>
.spring-festival-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a0a0a 0%, #2d1515 50%, #1a0a0a 100%);
  overflow: hidden;
  position: relative;
  padding: 20px;
}

/* 烟花容器 */
.fireworks-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.firework {
  position: absolute;
  width: 0;
  height: 0;
}

.particle {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background: var(--color);
  border-radius: 50%;
  animation: explode 1.5s ease-out forwards;
  transform-origin: center;
  box-shadow: 0 0 6px var(--color), 0 0 12px var(--color);
}

@keyframes explode {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(var(--tx), var(--ty)) scale(0);
    opacity: 0;
  }
}

/* 鞭炮容器 */
.firecrackers-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.firecracker {
  position: absolute;
  top: 0;
  
  &.left {
    left: 10px;
  }
  
  &.right {
    right: 10px;
  }
  
  .cracker-string {
    width: 4px;
    height: 60px;
    background: linear-gradient(to bottom, #8B4513, #A0522D);
    margin: 0 auto;
  }
  
  .cracker-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: swing 2s ease-in-out infinite;
    transform-origin: top center;
  }
  
  .cracker-segment {
    width: 24px;
    height: 16px;
    background: linear-gradient(135deg, #DC143C 0%, #8B0000 100%);
    border-radius: 4px;
    margin: 2px 0;
    box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3),
                inset 0 -2px 4px rgba(0, 0, 0, 0.3);
    border: 1px solid #FFD700;
  }
  
  .cracker-fuse {
    width: 3px;
    height: 15px;
    background: linear-gradient(to bottom, #8B4513, #654321);
    margin: 0 auto;
  }
  
  .spark {
    width: 6px;
    height: 6px;
    background: #FFD700;
    border-radius: 50%;
    margin: 4px auto;
    animation: sparkFlicker 0.3s ease-in-out infinite alternate;
    box-shadow: 0 0 8px #FFD700, 0 0 16px #FF6600;
  }
}

@keyframes swing {
  0%, 100% {
    transform: rotate(-8deg);
  }
  50% {
    transform: rotate(8deg);
  }
}

@keyframes sparkFlicker {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0.6;
    transform: scale(0.8);
  }
}

/* 主内容区 */
.main-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

.title-section {
  text-align: center;
  margin-bottom: 40px;
  
  .festival-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    font-size: 36px;
    font-weight: bold;
    color: #FFD700;
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.5),
                 0 0 40px rgba(255, 215, 0, 0.3);
    animation: titleGlow 2s ease-in-out infinite alternate;
  }
  
  .title-icon {
    font-size: 40px;
    animation: bounce 1s ease-in-out infinite alternate;
  }
  
  .festival-subtitle {
    font-size: 20px;
    color: #FFA500;
    margin-top: 12px;
    font-weight: 500;
  }
}

@keyframes titleGlow {
  0% {
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.5),
                 0 0 40px rgba(255, 215, 0, 0.3);
  }
  100% {
    text-shadow: 0 0 30px rgba(255, 215, 0, 0.8),
                 0 0 60px rgba(255, 215, 0, 0.5);
  }
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-8px);
  }
}

/* 倒计时区域 */
.countdown-section {
  display: flex;
  gap: 24px;
  margin-bottom: 40px;
}

.countdown-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, rgba(220, 20, 60, 0.8) 0%, rgba(139, 0, 0, 0.8) 100%);
  padding: 20px 28px;
  border-radius: 16px;
  border: 3px solid #FFD700;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3),
              inset 0 0 20px rgba(255, 255, 255, 0.1);
  min-width: 90px;
}

.countdown-value {
  font-size: 48px;
  font-weight: bold;
  color: #FFD700;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
  line-height: 1;
}

.countdown-label {
  font-size: 14px;
  color: #FFA500;
  margin-top: 8px;
  font-weight: 500;
}

/* 祝福语区域 */
.greeting-section {
  text-align: center;
  
  .greeting-text {
    font-size: 24px;
    color: #FFD700;
    margin-bottom: 12px;
    animation: textFloat 3s ease-in-out infinite;
  }
  
  .greeting-subtext {
    font-size: 16px;
    color: #FFA500;
    letter-spacing: 8px;
  }
}

@keyframes textFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* 装饰元素 */
.decorations {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}

.lantern {
  position: absolute;
  width: 40px;
  height: 50px;
  background: linear-gradient(135deg, #DC143C 0%, #8B0000 100%);
  border-radius: 50% 50% 30% 30%;
  animation: lanternSwing 3s ease-in-out infinite;
  animation-delay: var(--delay);
  
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 8px;
    background: #8B4513;
    border-radius: 4px;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 15px;
    background: #8B4513;
  }
  
  &:nth-child(1) { top: 15%; left: 15%; }
  &:nth-child(2) { top: 25%; left: 80%; }
  &:nth-child(3) { top: 40%; left: 5%; }
  &:nth-child(4) { top: 55%; left: 92%; }
  &:nth-child(5) { top: 70%; left: 20%; }
  &:nth-child(6) { top: 85%; left: 75%; }
}

@keyframes lanternSwing {
  0%, 100% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
}

.red-packet {
  position: absolute;
  width: 30px;
  height: 40px;
  background: linear-gradient(135deg, #DC143C 0%, #8B0000 100%);
  border-radius: 4px;
  animation: packetFloat 4s ease-in-out infinite;
  animation-delay: var(--delay);
  
  &::before {
    content: '福';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-15deg);
    font-size: 18px;
    color: #FFD700;
    font-weight: bold;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 6px;
    background: #FFD700;
    border-radius: 3px;
  }
  
  &:nth-child(7) { top: 20%; left: 70%; }
  &:nth-child(8) { top: 35%; left: 25%; }
  &:nth-child(9) { top: 60%; left: 85%; }
  &:nth-child(10) { top: 75%; left: 10%; }
}

@keyframes packetFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-10px) rotate(5deg);
  }
  50% {
    transform: translateY(0) rotate(0deg);
  }
  75% {
    transform: translateY(-5px) rotate(-5deg);
  }
}

/* 底部提示 */
.footer-tip {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 16px;
  color: #FFD700;
  z-index: 10;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: translateX(-50%) scale(1.05);
  }
}
</style>
