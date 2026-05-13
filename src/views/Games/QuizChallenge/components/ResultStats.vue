<template>
  <div class="result-stats">
    <div class="stat-item">
      <span class="stat-label">{{ t('quizChallenge.correctCount') }}</span>
      <span class="stat-value">{{ correctCount }}/{{ totalQuestions }}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">{{ t('quizChallenge.earnedPoints') }}</span>
      <span class="stat-value reward">{{ earnedPoints }}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">{{ t('quizChallenge.maxStreak') }}</span>
      <span class="stat-value streak">{{ maxStreak }}</span>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

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
</script>

<style lang="less" scoped>
.result-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-2xl);

  .stat-item {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    padding: var(--spacing-md);
    background: var(--color-bg-secondary);
    border-radius: var(--radius-md);

    .stat-label {
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
    }

    .stat-value {
      font-size: var(--font-size-xl);
      color: var(--color-text-primary);
      font-weight: var(--font-weight-bold);

      &.reward {
        color: var(--color-success);
      }

      &.streak {
        color: var(--color-warning);
      }
    }
  }
}
</style>
