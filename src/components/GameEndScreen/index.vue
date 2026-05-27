<template>
  <div class="game-end-screen">
    <div class="end-icon" :class="statusClass">
      {{ statusIcon }}
    </div>
    <h2 class="end-title">{{ title }}</h2>
    <p v-if="subtitle" class="end-subtitle">{{ subtitle }}</p>
    <div v-if="$slots.default" class="end-content">
      <slot></slot>
    </div>
    <van-button type="primary" size="large" @click="$emit('restart')" class="restart-btn">
      {{ restartText }}
    </van-button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    default: 'win',
    validator: (v) => ['win', 'lose'].includes(v)
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  winIcon: {
    type: String,
    default: '🎉'
  },
  loseIcon: {
    type: String,
    default: '😢'
  },
  restartText: {
    type: String,
    default: '再来一次'
  }
})

defineEmits(['restart'])

const statusIcon = computed(() => {
  return props.status === 'win' ? props.winIcon : props.loseIcon
})

const statusClass = computed(() => {
  return props.status
})
</script>

<style lang="less" scoped>
.game-end-screen {
  text-align: center;
  padding: var(--spacing-3xl) var(--spacing-lg);
  animation: fadeIn 0.5s ease-in;

  .end-icon {
    font-size: 4rem;
    margin-bottom: var(--spacing-lg);
    animation: bounceIn 0.6s ease-out;

    &.win {
      animation: celebrate 0.8s ease-out;
    }
  }

  .end-title {
    font-size: var(--font-size-2xl);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-md);
    font-weight: var(--font-weight-bold);
  }

  .end-subtitle {
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xl);
  }

  .end-content {
    margin-bottom: var(--spacing-xl);
  }

  .restart-btn {
    max-width: 200px;
    margin: 0 auto;
  }
}
</style>
