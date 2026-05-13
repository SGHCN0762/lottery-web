<template>
  <div class="game-start-screen">
    <div class="start-icon">📝</div>
    <h2 class="start-title">{{ t('quizChallenge.title') }}</h2>
    <p class="start-desc">{{ t('quizChallenge.startDesc') }}</p>
    <van-button type="primary" size="large" @click="$emit('start')" class="start-btn">
      {{ t('quizChallenge.start') }}
    </van-button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineEmits(['start'])
</script>

<style lang="less" scoped>
.game-start-screen {
  text-align: center;
  padding: var(--spacing-3xl) var(--spacing-lg);
  animation: fadeIn 0.5s ease-in;

  .start-icon {
    font-size: 4rem;
    margin-bottom: var(--spacing-lg);
    animation: bounceIn 0.6s ease-out;
  }

  .start-title {
    font-size: var(--font-size-2xl);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-sm);
    font-weight: var(--font-weight-bold);
  }

  .start-desc {
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-2xl);
  }

  .start-btn {
    max-width: 200px;
    margin: 0 auto;
  }
}
</style>
