<template>
  <section class="game-rules">
    <h3 class="rules-title">📋 {{ t('luckyWheel.rules.title') }}</h3>
    <ul class="rules-list">
      <li>{{ t('luckyWheel.rules.rule1') }}</li>
      <li>{{ t('luckyWheel.rules.rule2') }}</li>
      <li>{{ t('luckyWheel.rules.rule3') }}</li>
      <li>{{ t('luckyWheel.rules.rule4') }}</li>
    </ul>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style lang="less" scoped>
.game-rules {
  background: var(--color-bg-secondary);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-lg);
  border-left: 4px solid var(--color-primary);

  .rules-title {
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-sm);
    font-weight: var(--font-weight-semibold);
  }

  .rules-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      line-height: var(--line-height-relaxed);
      padding-left: var(--spacing-md);
      position: relative;
      margin-bottom: var(--spacing-xs);

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: var(--color-primary);
        font-weight: bold;
      }
    }
  }
}
</style>
