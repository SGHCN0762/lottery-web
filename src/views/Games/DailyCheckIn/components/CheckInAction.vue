<template>
  <section class="action-section">
    <div v-if="canCheckIn" class="checkin-prompt">
      <div class="prompt-icon">✨</div>
      <p class="prompt-text">{{ t('dailyCheckIn.notCheckedIn') }}</p>
    </div>

    <van-button
      type="primary"
      size="large"
      block
      @click="handleCheckIn"
      :disabled="!canCheckIn || isCheckingIn"
      class="checkin-button"
    >
      {{ isCheckingIn ? t('dailyCheckIn.checkingIn') : canCheckIn ? t('dailyCheckIn.checkInNow') : t('dailyCheckIn.checkedInToday') }}
    </van-button>

    <div v-if="!canCheckIn && !hasCheckedInToday" class="next-checkin-hint">
      {{ t('dailyCheckIn.nextCheckInTime') }}：{{ nextCheckInTime }}
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { showToast } from 'vant'

const { t } = useI18n()

defineProps({
  canCheckIn: {
    type: Boolean,
    required: true
  },
  isCheckingIn: {
    type: Boolean,
    required: true
  },
  hasCheckedInToday: {
    type: Boolean,
    required: true
  },
  nextCheckInTime: {
    type: String,
    required: true
  },
  handleCheckIn: {
    type: Function,
    required: true
  }
})
</script>

<style lang="less" scoped>
.action-section {
  margin-bottom: var(--spacing-xl);

  .checkin-prompt {
    text-align: center;
    margin-bottom: var(--spacing-md);
    animation: fadeIn 0.5s ease-in;

    .prompt-icon {
      font-size: 2rem;
      margin-bottom: var(--spacing-xs);
    }

    .prompt-text {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
    }
  }

  .checkin-button {
    margin-bottom: var(--spacing-md);
  }

  .next-checkin-hint {
    text-align: center;
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    padding: var(--spacing-sm);
    background: var(--color-bg-secondary);
    border-radius: var(--radius-md);
  }
}
</style>
