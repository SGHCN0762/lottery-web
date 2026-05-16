<template>
  <div class="digital-grid-container" :style="containerStyle">
    <div 
      v-for="(digit, index) in digits" 
      :key="index" 
      class="digital-grid-wrapper"
    >
      <div class="digital-grid" :style="gridStyle">
        <!-- 七段数码管布局 -->
        <div class="segment segment-a" :class="{ active: getSegments(digit).a }" :style="segmentStyle"></div>
        <div class="segment segment-b" :class="{ active: getSegments(digit).b }" :style="segmentStyle"></div>
        <div class="segment segment-c" :class="{ active: getSegments(digit).c }" :style="segmentStyle"></div>
        <div class="segment segment-d" :class="{ active: getSegments(digit).d }" :style="segmentStyle"></div>
        <div class="segment segment-e" :class="{ active: getSegments(digit).e }" :style="segmentStyle"></div>
        <div class="segment segment-f" :class="{ active: getSegments(digit).f }" :style="segmentStyle"></div>
        <div class="segment segment-g" :class="{ active: getSegments(digit).g }" :style="segmentStyle"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  value: {
    type: [String, Number],
    required: true
  },
  // 颜色配置
  color: {
    type: String,
    default: '#00FFFF' // 默认青色
  },
  // 尺寸配置 (宽度)
  size: {
    type: Number,
    default: 60
  },
  // 数字间距
  gap: {
    type: Number,
    default: 8
  },
  // 发光强度 (0-1)
  glowIntensity: {
    type: Number,
    default: 0.8,
    validator: (value) => value >= 0 && value <= 1
  }
});

// 七段数码管的笔画映射 (a-g)
//   a
// f   b
//   g
// e   c
//   d
const numberSegments = {
  0: { a: true, b: true, c: true, d: true, e: true, f: true, g: false },
  1: { a: false, b: true, c: true, d: false, e: false, f: false, g: false },
  2: { a: true, b: true, c: false, d: true, e: true, f: false, g: true },
  3: { a: true, b: true, c: true, d: true, e: false, f: false, g: true },
  4: { a: false, b: true, c: true, d: false, e: false, f: true, g: true },
  5: { a: true, b: false, c: true, d: true, e: false, f: true, g: true },
  6: { a: true, b: false, c: true, d: true, e: true, f: true, g: true },
  7: { a: true, b: true, c: true, d: false, e: false, f: false, g: false },
  8: { a: true, b: true, c: true, d: true, e: true, f: true, g: true },
  9: { a: true, b: true, c: true, d: true, e: false, f: true, g: true }
};

// 将输入值转换为数字数组
const digits = computed(() => {
  const str = String(props.value);
  return str.split('').map(char => {
    const num = parseInt(char);
    return isNaN(num) ? 0 : num; // 非数字字符默认显示0
  });
});

// 获取指定数字的笔画状态
const getSegments = (digit) => {
  return numberSegments[digit] || numberSegments[0];
};

// 计算容器样式
const containerStyle = computed(() => ({
  gap: `${props.gap}px`
}));

// 计算网格样式 (基于size缩放)
const gridStyle = computed(() => {
  const scale = props.size / 60; // 基准尺寸为60px
  return {
    width: `${props.size}px`,
    height: `${80 * scale}px`
  };
});

// 计算笔画样式
const segmentStyle = computed(() => {
  const scale = props.size / 60;
  const baseColor = props.color;
  const glowOpacity = props.glowIntensity;
  
  // Helper to convert hex to rgb or handle transparency if needed, 
  // but here we assume hex input and append alpha for shadow colors
  
  // Simple helper to get R,G,B from hex #RRGGBB
  let r = 0, g = 0, b = 0;
  if (baseColor.startsWith('#')) {
    const hex = baseColor.slice(1);
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
  }
  
  const glowColor1 = `rgba(${r}, ${g}, ${b}, ${glowOpacity})`;
  const glowColor2 = `rgba(${r}, ${g}, ${b}, ${glowOpacity * 0.5})`;

  return {
    '--segment-active-bg': baseColor,
    '--segment-glow-1': glowColor1,
    '--segment-glow-2': glowColor2,
    '--scale-factor': scale
  };
});
</script>

<style lang="less" scoped>
.digital-grid-container {
  display: flex;
  align-items: center;
}

.digital-grid-wrapper {
  flex-shrink: 0;
}

.digital-grid {
  position: relative;
  margin-bottom: var(--spacing-xs);
  z-index: 2;
}

.segment {
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  opacity: 0.2;
  transition: all 0.3s ease;
}

.segment.active {
  opacity: 1;
  background: var(--segment-active-bg, #00FFFF);
  box-shadow: 
    0 0 8px var(--segment-glow-1, rgba(0, 255, 255, 0.8)),
    0 0 15px var(--segment-glow-2, rgba(0, 255, 255, 0.4));
}

/* 七段数码管位置 - 使用CSS变量实现响应式缩放 */
.segment-a { /* 顶部横 */
  top: calc(5px * var(--scale-factor, 1));
  left: calc(12px * var(--scale-factor, 1));
  right: calc(12px * var(--scale-factor, 1));
  height: calc(8px * var(--scale-factor, 1));
}

.segment-b { /* 右上竖 */
  top: calc(12px * var(--scale-factor, 1));
  right: calc(5px * var(--scale-factor, 1));
  width: calc(8px * var(--scale-factor, 1));
  height: calc(28px * var(--scale-factor, 1));
}

.segment-c { /* 右下竖 */
  bottom: calc(12px * var(--scale-factor, 1));
  right: calc(5px * var(--scale-factor, 1));
  width: calc(8px * var(--scale-factor, 1));
  height: calc(28px * var(--scale-factor, 1));
}

.segment-d { /* 底部横 */
  bottom: calc(5px * var(--scale-factor, 1));
  left: calc(12px * var(--scale-factor, 1));
  right: calc(12px * var(--scale-factor, 1));
  height: calc(8px * var(--scale-factor, 1));
}

.segment-e { /* 左下竖 */
  bottom: calc(12px * var(--scale-factor, 1));
  left: calc(5px * var(--scale-factor, 1));
  width: calc(8px * var(--scale-factor, 1));
  height: calc(28px * var(--scale-factor, 1));
}

.segment-f { /* 左上竖 */
  top: calc(12px * var(--scale-factor, 1));
  left: calc(5px * var(--scale-factor, 1));
  width: calc(8px * var(--scale-factor, 1));
  height: calc(28px * var(--scale-factor, 1));
}

.segment-g { /* 中间横 */
  top: calc(36px * var(--scale-factor, 1));
  left: calc(12px * var(--scale-factor, 1));
  right: calc(12px * var(--scale-factor, 1));
  height: calc(8px * var(--scale-factor, 1));
}
</style>