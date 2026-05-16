<template>
  <div class="custom-card tech-card">
    <div class="card-icon-container">
      <div class="card-icon">{{ icon }}</div>
      <div class="tech-glow"></div>
    </div>
    <div class="card-content">
      <h3>{{ title }}</h3>
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
  title: {
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
.custom-card {
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

  .card-icon-container {
    position: relative;
    flex-shrink: 0;
    
    .card-icon {
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
  }
  
  &:hover .card-icon-container .tech-glow {
    opacity: 1;
  }
  
  &:hover .card-icon {
    transform: scale(1.1);
    filter: drop-shadow(0 0 8px rgba(0, 255, 255, 0.8));
  }

  .card-content {
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
</style>
