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
        @input="handleInput"
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
import { computed, ref } from 'vue'
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

// 优化：使用防抖避免频繁触发更新
const handleInput = useDebounceFn((event) => {
  emit('update:currentGuess', event.target.value)
}, 50)

const isValidGuess = computed(() => {
  const num = parseInt(props.currentGuess)
  return !isNaN(num) && num >= 1 && num <= 100
})

const submitGuess = () => {
  emit('submit-guess')
}

// 防抖工具函数
function useDebounceFn(fn, delay = 100) {
  let timeout = null
  
  return function(...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
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
