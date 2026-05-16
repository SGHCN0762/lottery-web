<template>
  <div class="blessings-section tech-section">
    <div class="section-header">
      <h2 class="section-title">{{ title }}</h2>
      <div class="tech-line"></div>
    </div>
    <div class="blessings-container">
      <div class="blessing-item tech-item" v-for="(blessing, index) in blessings" :key="index">
        <div class="tech-border"></div>
        <div class="tech-glow"></div>
        {{ blessing }}
      </div>
    </div>
    <button class="share-blessing tech-button" @click="$emit('share')">
      <span class="button-text">{{ shareText }}</span>
      <div class="tech-button-border"></div>
    </button>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  blessings: {
    type: Array,
    required: true
  },
  shareText: {
    type: String,
    required: true
  }
});

defineEmits(['share']);
</script>

<style lang="less" scoped>
.blessings-section {
  margin-bottom: var(--spacing-xl);
  position: relative;
  
  // 科技感标题部分
  .section-header {
    text-align: center;
    margin-bottom: var(--spacing-md);
    position: relative;
    
    .section-title {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      margin: 0 0 var(--spacing-sm) 0;
      color: #fff;
      text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
      position: relative;
      z-index: 2;
    }
    
    .tech-line {
      height: 1px;
      background: linear-gradient(90deg, rgba(0, 255, 255, 0), rgba(0, 255, 255, 0.8), rgba(0, 255, 255, 0));
      margin: 0 auto;
      width: 60%;
      position: relative;
      z-index: 1;
    }
  }

  .blessings-container {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
    justify-content: center;

    .blessing-item {
      background: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);
      border-radius: var(--radius-lg);
      padding: var(--spacing-sm) var(--spacing-md);
      font-size: var(--font-size-sm);
      transition: all 0.3s ease;
      border: 1px solid rgba(0, 255, 255, 0.2);
      cursor: pointer;
      color: rgba(0, 255, 255, 0.95);
      position: relative;
      overflow: hidden;
      
      // 科技感边框
      &.tech-item {
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
        
        .tech-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 80%;
          height: 80%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(0, 255, 255, 0.2) 0%, transparent 70%);
          z-index: 0;
          opacity: 0;
          transition: all 0.3s ease;
        }
        
        &:hover {
          background: rgba(0, 255, 255, 0.08);
          transform: translateY(-3px) scale(1.02);
          border-color: rgba(0, 255, 255, 0.4);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 255, 255, 0.3);
          
          .tech-border {
            opacity: 1;
            animation: tech-border-pulse 1.5s ease-in-out infinite;
          }
          
          .tech-glow {
            opacity: 1;
          }
        }
      }

      &:active {
        transform: translateY(-1px);
      }
    }
  }

  .share-blessing {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
    display: block;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(0, 255, 255, 0.3);
    color: white;
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-base);
    padding: var(--spacing-sm) var(--spacing-lg);
    border-radius: var(--radius-lg);
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    
    // 科技感按钮
    &.tech-button {
      .tech-button-border {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 1px solid rgba(0, 255, 255, 0.5);
        border-radius: var(--radius-lg);
        opacity: 0;
        z-index: 1;
        transition: all 0.3s ease;
      }
      
      .button-text {
        position: relative;
        z-index: 2;
      }
      
      &:hover {
        background: rgba(0, 255, 255, 0.1);
        border-color: rgba(0, 255, 255, 0.5);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 255, 255, 0.3);
        transform: translateY(-2px);
        
        .tech-button-border {
          opacity: 1;
          animation: tech-button-pulse 1.5s ease-in-out infinite;
        }
      }
    }

    &:active {
      transform: translateY(-1px);
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

@keyframes tech-button-pulse {
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
