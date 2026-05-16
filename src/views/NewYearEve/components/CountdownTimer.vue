<template>
  <div class="countdown-container">
    <div class="countdown-header">
      <div class="countdown-icon">🧧</div>
      <h2 class="countdown-title">{{ title }}</h2>
    </div>

    <!-- 科技感倒计时显示 -->
    <div class="countdown-display tech-display">
      <div class="countdown-item">
        <DigitalGrid :value="days" color="#00FFFF" :size="30" :gap="4" />
        <span class="countdown-label">{{ daysLabel }}</span>
      </div>
      <div class="countdown-separator">:</div>
      <div class="countdown-item">
        <DigitalGrid :value="hours" color="#00FFFF" :size="30" :gap="4" />
        <span class="countdown-label">{{ hoursLabel }}</span>
      </div>
      <div class="countdown-separator">:</div>
      <div class="countdown-item">
        <DigitalGrid :value="minutes" color="#00FFFF" :size="30" :gap="4" />
        <span class="countdown-label">{{ minutesLabel }}</span>
      </div>
      <div class="countdown-separator">:</div>
      <div class="countdown-item">
        <DigitalGrid :value="seconds" color="#00FFFF" :size="30" :gap="4" />
        <span class="countdown-label">{{ secondsLabel }}</span>
      </div>
    </div>

    <div class="countdown-date">{{ targetDate }}</div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import dayjs from 'dayjs';
  import DigitalGrid from '@/components/DigitalGrid/index.vue';

  const { t } = useI18n();

  const props = defineProps({
    days: {
      type: [String, Number],
      required: true,
    },
    hours: {
      type: [String, Number],
      required: true,
    },
    minutes: {
      type: [String, Number],
      required: true,
    },
    seconds: {
      type: [String, Number],
      required: true,
    },
    targetDate: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  });

  // 使用国际化文本,中文不需要区分单复数
  const daysLabel = computed(() => t('newYearEve.days'));
  const hoursLabel = computed(() => t('newYearEve.hours'));
  const minutesLabel = computed(() => t('newYearEve.minutes'));
  const secondsLabel = computed(() => t('newYearEve.seconds'));
</script>

<style lang="less" scoped>
  .countdown-container {
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(20px);
    border-radius: var(--radius-xl);
    padding: var(--spacing-lg) var(--spacing-md);
    text-align: center;
    border: 1px solid rgba(0, 255, 255, 0.3);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
    position: relative;
    overflow: hidden;

    // 科技感边框
    &::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(
        45deg,
        rgba(0, 255, 255, 0.5),
        rgba(255, 0, 255, 0.5),
        rgba(0, 255, 255, 0.5)
      );
      border-radius: var(--radius-xl);
      opacity: 0.7;
      z-index: -1;
      animation: border-glow 4s linear infinite;
    }

    .countdown-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: var(--spacing-md);

      .countdown-icon {
        font-size: 36px;
        margin-bottom: var(--spacing-sm);
        animation: bounce 2s ease-in-out infinite;
        filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.8));
      }
    }

    .countdown-title {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      margin: 0 0 var(--spacing-md) 0;
      color: rgba(255, 255, 255, 0.9);
    }

    .countdown-display {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
      margin-bottom: var(--spacing-md);
      flex-wrap: nowrap;

      .countdown-separator {
        font-size: 36px;
        font-weight: bold;
        color: rgba(0, 255, 255, 0.8);
        animation: pulse 1s ease-in-out infinite;
        flex-shrink: 0;
        margin: 0 5px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        line-height: 1;
        position: relative;
        top: -15px;
        padding-top: 5px;
      }

      @media (max-width: 480px) {
        gap: var(--spacing-xs);
        transform: scale(0.85);

        .countdown-separator {
          font-size: 28px;
        }
      }

      .countdown-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-xs);
        flex-shrink: 0;

        .countdown-label {
          font-size: 16px;
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: rgba(0, 255, 255, 0.9);
          font-weight: 600;
        }
      }
    }

    .countdown-date {
      font-size: 16px;
      opacity: 0.9;
      color: rgba(0, 255, 255, 0.9);
      text-transform: uppercase;
      letter-spacing: 1px;
      position: relative;
      font-weight: 600;
      margin-top: var(--spacing-md);

      &::before {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 50%;
        width: 50%;
        height: 1px;
        background: linear-gradient(
          90deg,
          rgba(0, 255, 255, 0) 0%,
          rgba(0, 255, 255, 0.8) 50%,
          rgba(0, 255, 255, 0) 100%
        );
        transform: translateX(-50%);
      }
    }
  }

  // 科技感动画
  @keyframes pulse {
    0% {
      opacity: 0.7;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.1);
    }
    100% {
      opacity: 0.7;
      transform: scale(1);
    }
  }

  // 动画
  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }
</style>
