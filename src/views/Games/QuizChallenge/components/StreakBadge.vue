<template>
  <div class="streak-badge">
    🔥 {{ t('quizChallenge.streak', { count: streakCount }) }}
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  streakCount: {
    type: Number,
    required: true
  }
})
</script>

<style lang="less" scoped>
.streak-badge {
  text-align: center;
  padding: var(--spacing-md);
  background: linear-gradient(135deg, #ff6b6b 0%, #ffa502 100%);
  color: #fff;
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  animation: pulse 1s ease-in-out infinite;
}
</style>
