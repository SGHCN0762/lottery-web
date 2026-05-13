<template>
  <div class="game-playing-screen">
    <div class="guess-input-section">
      <label class="input-label">{{ t('numberGuess.inputLabel') }}</label>
      <van-field
        :value="currentGuess"
        type="number"
        :placeholder="t('numberGuess.inputPlaceholder')"
        :disabled="isProcessing"
        class="guess-input"
        @input="$emit('update:currentGuess', $event.target.value)"
        @keyup.enter="submitGuess"
      />
      <van-button
        type="primary"
        block
        @click="submitGuess"
        :disabled="!isValidGuess || isProcessing"
        class="submit-btn"
      >
        {{ isProcessing ? t('numberGuess.processing') : t('numberGuess.submitGuess') }}
      </van-button>
    </div>

    <!-- 猜测历史 -->
    <GameHistory v-if="guessHistory.length > 0" :history="guessHistory" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import GameHistory from './GameHistory.vue'

const { t } = useI18n()

const props = defineProps({
  currentGuess: {
    type: String,
    required: true
  },
  isProcessing: {
    type: Boolean,
    required: true
  },
  guessHistory: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['submit-guess', 'update:currentGuess'])

const isValidGuess = computed(() => {
  const num = parseInt(props.currentGuess)
  return !isNaN(num) && num >= 1 && num <= 100
})

const submitGuess = () => {
  emit('submit-guess')
}
</script>

<style lang="less" scoped>
.game-playing-screen {
  animation: slideIn 0.4s ease-out;

  .guess-input-section {
    margin-bottom: var(--spacing-xl);

    .input-label {
      display: block;
      font-size: var(--font-size-sm);
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-sm);
      font-weight: var(--font-weight-medium);
    }

    .guess-input {
      margin-bottom: var(--spacing-md);
    }

    .submit-btn {
      margin-top: var(--spacing-md);
    }
  }


}
</style>
