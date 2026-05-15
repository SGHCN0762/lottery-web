<template>
  <div class="countdown-container">
    <div class="countdown-icon">🧧</div>
    <h2 class="countdown-title">{{ title }}</h2>
    <div class="countdown-display">
      <div class="countdown-item">
        <span class="countdown-value">{{ days }}</span>
        <span class="countdown-label">{{ daysLabel }}</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-value">{{ hours }}</span>
        <span class="countdown-label">{{ hoursLabel }}</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-value">{{ minutes }}</span>
        <span class="countdown-label">{{ minutesLabel }}</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-value">{{ seconds }}</span>
        <span class="countdown-label">{{ secondsLabel }}</span>
      </div>
    </div>
    <div class="countdown-date">{{ targetDate }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import dayjs from 'dayjs';

const props = defineProps({
  days: {
    type: [String, Number],
    required: true
  },
  hours: {
    type: [String, Number],
    required: true
  },
  minutes: {
    type: [String, Number],
    required: true
  },
  seconds: {
    type: [String, Number],
    required: true
  },
  targetDate: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

const daysLabel = computed(() => {
  return parseInt(props.days) === 1 ? 'day' : 'days';
});

const hoursLabel = computed(() => {
  return parseInt(props.hours) === 1 ? 'hour' : 'hours';
});

const minutesLabel = computed(() => {
  return parseInt(props.minutes) === 1 ? 'minute' : 'minutes';
});

const secondsLabel = computed(() => {
  return parseInt(props.seconds) === 1 ? 'second' : 'seconds';
});
</script>

<style lang="less" scoped>
.countdown-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);

  .countdown-icon {
    font-size: 48px;
    margin-bottom: var(--spacing-md);
    animation: bounce 2s ease-in-out infinite;
  }

  .countdown-title {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    margin: 0 0 var(--spacing-lg) 0;
  }

  .countdown-display {
    display: flex;
    justify-content: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);

    .countdown-item {
      background: rgba(255, 255, 255, 0.15);
      border-radius: var(--radius-md);
      padding: var(--spacing-md);
      min-width: 70px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

      .countdown-value {
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
        display: block;
        line-height: 1;
        margin-bottom: 4px;
      }

      .countdown-label {
        font-size: var(--font-size-xs);
        opacity: 0.8;
      }
    }
  }

  .countdown-date {
    font-size: var(--font-size-base);
    opacity: 0.9;
  }
}

// 动画
@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}
</style>
