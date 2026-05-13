<template>
  <div class="game-end-screen">
    <div class="end-icon">🏆</div>
    <h2 class="end-title">{{ t('quizChallenge.completed') }}</h2>

    <ResultStats
      :correct-count="correctCount"
      :total-questions="totalQuestions"
      :earned-points="earnedPoints"
      :max-streak="maxStreak"
    />

    <van-button type="primary" size="large" @click="$emit('reset')" class="restart-btn">
      {{ t('quizChallenge.tryAgain') }}
    </van-button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import ResultStats from './ResultStats.vue'

const { t } = useI18n()

defineProps({
  correctCount: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  earnedPoints: {
    type: Number,
    required: true
  },
  maxStreak: {
    type: Number,
    required: true
  }
})

defineEmits(['reset'])
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
  }

  .end-title {
    font-size: var(--font-size-2xl);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-2xl);
    font-weight: var(--font-weight-bold);
  }

  .restart-btn {
    max-width: 200px;
    margin: 0 auto;
  }
}
</style>
