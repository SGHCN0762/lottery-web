<template>
  <div class="practice-mode">
    <div class="practice-header">
      <button class="back-btn" @click="$emit('back')">
        ← 返回
      </button>
      <div class="practice-stats">
        <span class="stat-item">得分: {{ score }}</span>
        <span class="stat-divider">|</span>
        <span class="stat-item">已做: {{ count }}</span>
      </div>
    </div>

    <div v-if="idiom" class="practice-content">
      <div class="question-card">
        <div class="question-type">
          <span class="type-badge">成语填空</span>
        </div>

        <div class="question-content">
          <p class="question-text">请根据含义选出正确的成语：</p>
          <p class="meaning-text">{{ idiom.meaning }}</p>
        </div>

        <div class="options-list">
          <div
            v-for="(option, index) in options"
            :key="index"
            class="option-item"
            :class="{
              selected: selectedOption === index,
              correct: showResult && option === idiom.word,
              wrong: showResult && selectedOption === index && option !== idiom.word
            }"
            @click="selectOption(index)"
          >
            <span class="option-letter">{{ optionLetters[index] }}</span>
            <span class="option-text">{{ option }}</span>
          </div>
        </div>

        <div v-if="showResult" class="result-section">
          <div class="result-icon" :class="isCorrect ? 'correct' : 'wrong'">
            {{ isCorrect ? '✓' : '✗' }}
          </div>
          <p class="result-text">{{ isCorrect ? '回答正确！' : '回答错误！' }}</p>
          <div v-if="!isCorrect" class="correct-answer">
            <p>正确答案是：<span class="answer-word">{{ idiom.word }}</span></p>
            <p class="answer-pinyin">{{ idiom.pinyin }}</p>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <button
          v-if="!showResult"
          class="submit-btn"
          :disabled="selectedOption === null"
          @click="submitAnswer"
        >
          提交答案
        </button>
        <button
          v-else
          class="next-btn"
          @click="nextQuestion"
        >
          下一题
        </button>
      </div>
    </div>

    <div v-else class="empty-state">
      <p>正在加载题目...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { getIdioms } from '../data/idioms';

const props = defineProps({
  idiom: {
    type: Object,
    default: null,
  },
  score: {
    type: Number,
    default: 0,
  },
  count: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['back', 'submit', 'next']);

const optionLetters = ['A', 'B', 'C', 'D'];
const selectedOption = ref(null);
const showResult = ref(false);

const options = computed(() => {
  if (!props.idiom) return [];
  
  const allIdioms = getIdioms();
  const correctAnswer = props.idiom.word;
  const otherIdioms = allIdioms.filter(i => i.word !== correctAnswer);
  const shuffled = otherIdioms.sort(() => Math.random() - 0.5).slice(0, 3);
  
  const result = [...shuffled, correctAnswer].sort(() => Math.random() - 0.5);
  return result;
});

const isCorrect = computed(() => {
  if (!props.idiom || selectedOption.value === null) return false;
  return options.value[selectedOption.value] === props.idiom.word;
});

const selectOption = (index) => {
  if (showResult.value) return;
  selectedOption.value = index;
};

const submitAnswer = () => {
  if (selectedOption.value === null) return;
  showResult.value = true;
  emit('submit', props.idiom.id, isCorrect.value);
};

const nextQuestion = () => {
  selectedOption.value = null;
  showResult.value = false;
  emit('next');
};

watch(() => props.idiom, () => {
  selectedOption.value = null;
  showResult.value = false;
});
</script>

<style lang="less" scoped>
.practice-mode {
  min-height: 100vh;
  background: var(--color-bg-primary);
  padding: var(--spacing-md);
}

.practice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  padding-top: calc(var(--spacing-sm) + env(safe-area-inset-top, 0px));
}

.back-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all var(--transition-base);

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
}

.practice-stats {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.stat-item {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.stat-divider {
  color: var(--color-border);
}

.practice-content {
  max-width: 600px;
  margin: 0 auto;
}

.question-card {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
}

.question-type {
  margin-bottom: var(--spacing-md);
}

.type-badge {
  font-size: var(--font-size-xs);
  padding: 4px var(--spacing-md);
  border-radius: var(--radius-sm);
  background: rgba(25, 137, 250, 0.1);
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

.question-content {
  margin-bottom: var(--spacing-lg);
}

.question-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0 0 var(--spacing-sm) 0;
}

.meaning-text {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--line-height-lg);
  margin: 0;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.option-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  border: 2px solid var(--color-border);
  background: var(--color-bg-primary);
  cursor: pointer;
  transition: all var(--transition-base);

  &:hover {
    border-color: var(--color-primary);
  }

  &.selected {
    border-color: var(--color-primary);
    background: rgba(25, 137, 250, 0.05);
  }

  &.correct {
    border-color: var(--color-success);
    background: rgba(7, 194, 144, 0.1);
  }

  &.wrong {
    border-color: var(--color-danger);
    background: rgba(255, 87, 87, 0.1);
  }
}

.option-letter {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-secondary);
  flex-shrink: 0;

  .selected & {
    background: var(--color-primary);
    color: #fff;
  }

  .correct & {
    background: var(--color-success);
    color: #fff;
  }

  .wrong & {
    background: var(--color-danger);
    color: #fff;
  }
}

.option-text {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.result-section {
  text-align: center;
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  background: var(--color-bg-primary);
}

.result-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto var(--spacing-md) auto;

  &.correct {
    background: rgba(7, 194, 144, 0.1);
    color: var(--color-success);
  }

  &.wrong {
    background: rgba(255, 87, 87, 0.1);
    color: var(--color-danger);
  }
}

.result-text {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin: 0 0 var(--spacing-sm) 0;

  .correct & {
    color: var(--color-success);
  }

  .wrong & {
    color: var(--color-danger);
  }
}

.correct-answer {
  margin-top: var(--spacing-md);
}

.correct-answer p {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.answer-word {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.answer-pinyin {
  font-style: italic;
  margin-top: var(--spacing-xs) !important;
}

.action-buttons {
  margin-top: var(--spacing-lg);
}

.submit-btn,
.next-btn {
  width: 100%;
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  border: none;
  cursor: pointer;
  transition: all var(--transition-base);
}

.submit-btn {
  background: var(--color-primary);
  color: #fff;

  &:disabled {
    background: var(--color-text-tertiary);
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
}

.next-btn {
  background: var(--color-success);
  color: #fff;

  &:hover {
    opacity: 0.9;
  }
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}
</style>