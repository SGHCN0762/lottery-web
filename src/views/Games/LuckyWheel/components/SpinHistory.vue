<template>
  <section v-if="history.length > 0" class="history-section">
    <h3 class="history-title">🎁 {{ t('luckyWheel.history') }}</h3>
    <div class="history-list">
      <div
        v-for="(record, index) in history"
        :key="index"
        class="history-item"
      >
        <span class="history-icon">{{ record.prize.icon }}</span>
        <span class="history-name">{{ record.prize.name }}</span>
        <span class="history-time">{{ record.time }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  history: {
    type: Array,
    required: true
  }
})
</script>

<style lang="less" scoped>
.history-section {
  .history-title {
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-md);
    font-weight: var(--font-weight-semibold);
  }

  .history-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);

    .history-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      padding: var(--spacing-md);
      background: var(--color-bg-secondary);
      border-radius: var(--radius-md);
      animation: slideIn 0.3s ease-out;

      .history-icon {
        font-size: 1.5rem;
      }

      .history-name {
        flex: 1;
        font-size: var(--font-size-sm);
        color: var(--color-text-primary);
        font-weight: var(--font-weight-medium);
      }

      .history-time {
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
      }
    }
  }
}
</style>
