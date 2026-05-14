<template>
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
          @click="$emit('spin')"
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
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  prizes: {
    type: Array,
    required: true
  },
  wheelRotation: {
    type: Number,
    required: true
  },
  isSpinning: {
    type: Boolean,
    required: true
  },
  spinDuration: {
    type: Number,
    required: true
  },
  userPoints: {
    type: Number,
    required: true
  }
})

defineEmits(['spin'])

/**
 * 生成转盘背景渐变
 * 使用conic-gradient精确绘制6个扇形，每个扇形60度
 * @returns {string} CSS conic-gradient字符串
 */
const wheelBackground = computed(() => {
  const segmentAngle = 360 / props.prizes.length
  let gradient = 'conic-gradient('

  props.prizes.forEach((prize, index) => {
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

/**
 * 计算奖品扇形的旋转样式
 * 将文字定位到每个扇形的中心位置
 * @param {number} index - 奖品索引
 * @returns {Object} CSS transform样式对象
 */
const getSegmentStyle = (index) => {
  const segmentAngle = 360 / props.prizes.length
  // 旋转到扇形中心：起始角度 + 半个扇形角度
  const rotate = index * segmentAngle + segmentAngle / 2

  return {
    transform: `rotate(${rotate}deg)`
  }
}
</script>

<style lang="less" scoped>
.wheel-section {
  margin-bottom: var(--spacing-xl);

  .wheel-container {
    position: relative;
    width: 300px;
    height: 300px;
    margin: 0 auto;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    contain: layout style paint;

    .wheel {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
      border: 8px solid #fff;
      will-change: transform;
      backface-visibility: hidden;
      transform-style: preserve-3d;
      -webkit-backface-visibility: hidden;
      -webkit-transform-style: preserve-3d;

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
</style>