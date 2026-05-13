<template>
  <div class="guess-history">
    <h4 class="history-title">{{ t('numberGuess.history.title') }}</h4>
    <div class="history-list">
      <div
        v-for="(record, index) in history"
        :key="index"
        class="history-item"
        :class="record.status"
      >
        <span class="history-number">{{ record.guess }}</span>
        <span class="history-hint">{{ record.hint }}</span>
      </div>
    </div>
  </div>
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
.guess-history {
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
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-md);
      background: var(--color-bg-tertiary);
      border-radius: var(--radius-md);
      animation: slideIn 0.3s ease-out;

      .history-number {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        color: var(--color-text-primary);
      }

      .history-hint {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
      }

      &.correct {
        background: rgba(82, 196, 26, 0.1);
        border: 1px solid var(--color-success);

        .history-hint {
          color: var(--color-success);
        }
      }

      &.wrong {
        background: rgba(255, 77, 79, 0.1);
        border: 1px solid var(--color-danger);

        .history-hint {
          color: var(--color-danger);
        }
      }

      &.hint {
        background: rgba(24, 144, 255, 0.1);
        border: 1px solid var(--color-primary);

        .history-hint {
          color: var(--color-primary);
        }
      }
    }
  }
}
</style>
