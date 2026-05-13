<template>
  <div class="game-end-screen">
    <div class="end-icon" :class="winStatus">
      {{ winStatus === 'win' ? '🎉' : '😢' }}
    </div>
    <h2 class="end-title">{{ winMessage }}</h2>
    <p v-if="winStatus === 'win'" class="end-reward">{{ t('numberGuess.reward', { points: rewardPoints }) }}</p>
    <p v-else class="end-answer">{{ t('numberGuess.correctAnswer', { number: targetNumber }) }}</p>
    <van-button type="primary" size="large" @click="resetGame" class="restart-btn">
      {{ t('numberGuess.playAgain') }}
    </van-button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  winStatus: {
    type: String,
    required: true
  },
  winMessage: {
    type: String,
    required: true
  },
  rewardPoints: {
    type: Number,
    required: true
  },
  targetNumber: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['reset-game'])

const resetGame = () => {
  emit('reset-game')
}
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

  .end-reward {
    font-size: var(--font-size-xl);
    color: var(--color-success);
    margin-bottom: var(--spacing-2xl);
    font-weight: var(--font-weight-bold);
  }

  .end-answer {
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-2xl);
  }

  .restart-btn {
    max-width: 200px;
    margin: 0 auto;
  }
}
</style>
