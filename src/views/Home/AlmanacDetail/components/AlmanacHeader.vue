<template>
  <div class="page-header">
    <div class="date-info">
      <h2>{{ dateStr }}</h2>
      <p>{{ lunarInfo?.lunarText }} {{ almanac?.gzYear }}年</p>
    </div>
    <div class="bagua-badge" :class="almanac?.luckLevel || 'normal'" @click="scrollToTimeLuck">
      <div class="bagua-symbol">
        <!-- 八卦符号 -->
        <svg viewBox="0 0 100 100" class="bagua-svg">
          <!-- 外圆 -->
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" stroke-width="2" />
          <!-- S形分割线 -->
          <path
            d="M50 2 A48 48 0 0 1 50 98 A24 24 0 0 1 50 50 A24 24 0 0 0 50 2"
            fill="currentColor"
            opacity="0.3"
          />
          <!-- 阳鱼眼 -->
          <circle cx="50" cy="26" r="6" fill="currentColor" />
          <!-- 阴鱼眼 -->
          <circle cx="50" cy="74" r="6" fill="none" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>
      <div class="badge-text">
        {{ almanac?.luckText || '平日' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  dateStr: {
    type: String,
    default: ''
  },
  almanac: {
    type: Object,
    default: null
  },
  lunarInfo: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['scroll-to-time-luck']);

// 滚动到时辰吉凶部分
const scrollToTimeLuck = () => {
  emit('scroll-to-time-luck');
};
</script>

<style lang="less" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);

  .date-info {
    h2 {
      font-size: 22px;
      font-weight: 600;
      color: #000000;
      margin: 0 0 6px 0;
    }

    p {
      font-size: 15px;
      color: #7f7f7f;
      margin: 0;
    }
  }

  .bagua-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 12px 18px;
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    min-width: 70px;

    &:active {
      transform: scale(0.95);
    }

    // 大吉 - 金色渐变
    &.great {
      background: linear-gradient(
        135deg,
        rgba(255, 215, 0, 0.15) 0%,
        rgba(255, 165, 0, 0.08) 100%
      );
      border: 1.5px solid rgba(255, 215, 0, 0.5);

      .bagua-symbol {
        color: #d4a017;
      }

      .badge-text {
        color: #d4a017;
        font-weight: 700;
      }
    }

    // 小吉 - 绿色
    &.good {
      background: linear-gradient(
        135deg,
        rgba(76, 175, 80, 0.1) 0%,
        rgba(76, 175, 80, 0.05) 100%
      );
      border: 1.5px solid rgba(76, 175, 80, 0.4);

      .bagua-symbol {
        color: #4caf50;
      }

      .badge-text {
        color: #4caf50;
      }
    }

    // 平日 - 灰色
    &.normal {
      background: linear-gradient(
        135deg,
        rgba(158, 158, 158, 0.08) 0%,
        rgba(158, 158, 158, 0.04) 100%
      );
      border: 1.5px solid rgba(158, 158, 158, 0.3);

      .bagua-symbol {
        color: #9e9e9e;
      }

      .badge-text {
        color: #9e9e9e;
      }
    }

    // 凶日 - 红色
    &.bad {
      background: linear-gradient(
        135deg,
        rgba(244, 67, 54, 0.1) 0%,
        rgba(244, 67, 54, 0.05) 100%
      );
      border: 1.5px solid rgba(244, 67, 54, 0.4);

      .bagua-symbol {
        color: #f44336;
      }

      .badge-text {
        color: #f44336;
      }
    }

    .bagua-symbol {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;

      .bagua-svg {
        width: 100%;
        height: 100%;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
      }
    }

    .badge-text {
      font-size: 13px;
      font-weight: 600;
    }
  }
}
</style>
