<template>
  <div class="food-card tech-card">
    <div class="food-image-container">
      <div class="food-image">{{ icon }}</div>
      <div class="tech-glow"></div>
      <div class="tech-corner"></div>
    </div>
    <div class="food-content">
      <h3>{{ name }}</h3>
      <p>{{ description }}</p>
    </div>
    <div class="tech-border"></div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});
</script>

<style lang="less" scoped>
.food-card {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 255, 255, 0.2);
  height: 100%;
  position: relative;
  overflow: hidden;
  
  // 科技感边框
  &.tech-card {
    .tech-border {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 1px solid rgba(0, 255, 255, 0.4);
      border-radius: var(--radius-lg);
      opacity: 0;
      z-index: 1;
      transition: all 0.3s ease;
    }
    
    &:hover {
      transform: translateY(-5px);
      background: rgba(0, 255, 255, 0.08);
      border-color: rgba(0, 255, 255, 0.4);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(0, 255, 255, 0.2);
      
      .tech-border {
        opacity: 1;
        animation: tech-border-pulse 1.5s ease-in-out infinite;
      }
    }
  }

  .food-image-container {
    position: relative;
    flex-shrink: 0;
    
    .food-image {
      font-size: 28px;
      background: rgba(0, 0, 0, 0.4);
      width: 48px;
      height: 48px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 2;
      transition: all 0.3s ease;
    }
    
    .tech-glow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: var(--radius-md);
      background: radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%);
      z-index: 1;
      opacity: 0;
      transition: all 0.3s ease;
    }
    
    .tech-corner {
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border: 1px solid rgba(0, 255, 255, 0.6);
      border-radius: calc(var(--radius-md) + 2px);
      opacity: 0;
      z-index: 0;
      transition: all 0.3s ease;
      background: linear-gradient(45deg, transparent 40%, rgba(0, 255, 255, 0.2) 50%, transparent 60%);
      background-size: 200% 200%;
    }
  }
  
  &:hover .food-image-container .tech-glow {
    opacity: 1;
  }
  
  &:hover .food-image-container .tech-corner {
    opacity: 1;
    animation: tech-corner-move 3s linear infinite;
  }
  
  &:hover .food-image {
    transform: scale(1.1);
    filter: drop-shadow(0 0 8px rgba(0, 255, 255, 0.8));
  }

  .food-content {
    flex: 1;
    min-width: 0;
    position: relative;
    z-index: 2;

    h3 {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      margin: 0 0 4px 0;
      line-height: 1.4;
      color: #fff;
      text-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
    }

    p {
      font-size: 12px;
      opacity: 0.8;
      margin: 0;
      line-height: 1.5;
      word-wrap: break-word;
      overflow-wrap: break-word;
      color: rgba(0, 255, 255, 0.9);
    }
  }
}

// 科技感动画
@keyframes tech-border-pulse {
  0% {
    box-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.8), inset 0 0 10px rgba(0, 255, 255, 0.3);
  }
  100% {
    box-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
  }
}

@keyframes tech-corner-move {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 200% 200%;
  }
}
</style>
