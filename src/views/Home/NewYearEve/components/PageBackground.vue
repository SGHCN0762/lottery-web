<template>
  <div class="page-background">
    <!-- 科技感背景层 -->
    <div class="background-layer">
      <div class="tech-grid"></div>
      <div class="tech-circuit"></div>
      <div class="tech-orbit"></div>
    </div>
    
    <!-- 浮动元素 -->
    <div class="floating-elements">
      <div
        class="floating-item"
        v-for="(item, index) in floatingItems"
        :key="index"
        :style="{ animationDelay: item.delay }"
      >
        {{ item.icon }}
      </div>
    </div>
    
    <!-- 科技粒子效果 -->
    <div class="tech-particles">
      <div class="particle" v-for="i in 30" :key="i" :style="{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${5 + Math.random() * 10}s`
      }"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  floatingItems: {
    type: Array,
    default: () => []
  }
});
</script>

<style lang="less" scoped>
.page-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0e27 0%, #1a237e 50%, #4a148c 100%);

  .background-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 30% 20%, rgba(66, 165, 245, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(156, 39, 176, 0.2) 0%, transparent 50%);
    opacity: 0.8;
  }

  // 科技网格背景
  .tech-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: grid-move 20s linear infinite;
  }
  
  // 科技电路效果
  .tech-circuit {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><path fill="none" stroke="rgba(0,255,255,0.2)" stroke-width="1" d="M0,50 L50,50 L50,0 M150,50 L200,50 L200,100 M100,100 L100,150 M50,150 L50,200 L100,200 M150,200 L200,200 M0,150 L50,150"/></svg>');
    opacity: 0.3;
    background-size: 300px 300px;
    animation: circuit-move 30s linear infinite;
  }
  
  // 科技轨道效果
  .tech-orbit {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    height: 80%;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(0, 255, 255, 0.2);
    border-radius: 50%;
    animation: orbit-rotate 60s linear infinite;
  }
  
  .tech-orbit::before {
    content: "";
    position: absolute;
    top: -5px;
    left: 50%;
    width: 10px;
    height: 10px;
    background: rgba(0, 255, 255, 0.8);
    border-radius: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
  }
  
  // 科技粒子效果
  .tech-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    
    .particle {
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(0, 255, 255, 0.8);
      border-radius: 50%;
      box-shadow: 0 0 6px rgba(0, 255, 255, 0.8);
      animation: particle-move linear infinite;
    }
  }
  
  .floating-elements {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    .floating-item {
      position: absolute;
      font-size: 24px;
      animation: float 8s ease-in-out infinite;
      opacity: 0.8;
      filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
      text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);

      &:nth-child(1) {
        top: 10%;
        left: 10%;
      }
      &:nth-child(2) {
        top: 20%;
        left: 80%;
        animation-duration: 10s;
      }
      &:nth-child(3) {
        top: 60%;
        left: 15%;
        animation-duration: 12s;
      }
      &:nth-child(4) {
        top: 80%;
        left: 70%;
        animation-duration: 9s;
      }
      &:nth-child(5) {
        top: 40%;
        left: 90%;
        animation-duration: 11s;
      }
      &:nth-child(6) {
        top: 70%;
        left: 30%;
        animation-duration: 7s;
      }
      &:nth-child(7) {
        top: 30%;
        left: 50%;
        animation-duration: 13s;
      }
      &:nth-child(8) {
        top: 90%;
        left: 50%;
        animation-duration: 8s;
      }
    }
  }
}

// 动画
@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
    opacity: 1;
  }
  100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.8;
  }
}

// 科技网格动画
@keyframes grid-move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100px 100px;
  }
}

// 科技电路动画
@keyframes circuit-move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 300px 300px;
  }
}

// 科技轨道动画
@keyframes orbit-rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

// 科技粒子动画
@keyframes particle-move {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh);
    opacity: 0;
  }
}
</style>
