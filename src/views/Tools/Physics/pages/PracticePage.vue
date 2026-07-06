<template>
  <div class="practice-page">
    <div class="practice-content" v-if="!isFinished">
      <div class="progress-section">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <div class="progress-info">
          <span class="progress-text">{{ answeredCount }} / {{ totalQuestions }}</span>
          <span class="score-text">{{ t('tools.physics.practice.score') }}: {{ score }}</span>
        </div>
      </div>

      <div class="question-card" v-if="currentQuestion">
        <div class="question-header">
          <span class="question-index">
            {{ t('tools.physics.practice.question') }} {{ currentQuestionIndex + 1 }}
          </span>
          <span class="question-type">{{ t('tools.physics.practice.choice') }}</span>
        </div>

        <div class="question-content">
          <p class="question-text">{{ currentQuestion.question }}</p>
        </div>

        <div class="options-list">
          <div
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            class="option-item"
            :class="{
              selected: selectedAnswer === index,
              correct: showResult && index === currentQuestion.answer,
              wrong: showResult && selectedAnswer === index && index !== currentQuestion.answer
            }"
            @click="handleOptionClick(index)"
          >
            <span class="option-index">{{ String.fromCharCode(65 + index) }}</span>
            <span class="option-text">{{ option }}</span>
            <van-icon v-if="showResult && index === currentQuestion.answer" name="check" class="option-icon correct-icon" />
            <van-icon v-if="showResult && selectedAnswer === index && index !== currentQuestion.answer" name="cross" class="option-icon wrong-icon" />
          </div>
        </div>

        <div v-if="showResult" class="explanation-section">
          <h4 class="explanation-title">{{ t('tools.physics.practice.explanation') }}</h4>
          <p class="explanation-text">{{ currentQuestion.explanation }}</p>
        </div>
      </div>

      <div class="action-buttons">
        <van-button
          v-if="!showResult"
          :disabled="selectedAnswer === null"
          type="primary"
          @click="submitAnswer(selectedAnswer)"
          class="submit-btn"
        >
          {{ t('tools.physics.practice.submit') }}
        </van-button>
        <van-button
          v-else
          type="primary"
          @click="nextQuestion"
          class="next-btn"
        >
          {{ currentQuestionIndex === totalQuestions - 1 ? t('tools.physics.practice.finish') : t('tools.physics.practice.next') }}
        </van-button>
      </div>
    </div>

    <div class="result-content" v-else>
      <div class="result-card">
        <div class="result-icon">
          <van-icon name="trophy" :color="scoreColor" />
        </div>
        <h2 class="result-title">{{ t('tools.physics.practice.completed') }}</h2>
        <div class="result-score">
          <span class="score-value" :style="{ color: scoreColor }">{{ score }}</span>
          <span class="score-total">/ {{ totalQuestions }}</span>
        </div>
        <p class="result-desc">{{ resultDesc }}</p>

        <div class="result-stats">
          <div class="stat-item">
            <span class="stat-value correct">{{ score }}</span>
            <span class="stat-label">{{ t('tools.physics.practice.correct') }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-value wrong">{{ totalQuestions - score }}</span>
            <span class="stat-label">{{ t('tools.physics.practice.wrong') }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-value rate">{{ Math.round((score / totalQuestions) * 100) }}%</span>
            <span class="stat-label">{{ t('tools.physics.practice.rate') }}</span>
          </div>
        </div>
      </div>

      <div class="result-actions">
        <van-button type="default" @click="$router.back()" class="back-btn">
          {{ t('tools.physics.actions.back') }}
        </van-button>
        <van-button type="primary" @click="retry" class="retry-btn">
          {{ t('tools.physics.practice.retry') }}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NavBar as VanNavBar, Button as VanButton, Icon as VanIcon } from 'vant';
import { usePhysicsPractice } from '../hooks/usePhysics';

const router = useRouter();
const { t } = useI18n();

const {
  currentQuestionIndex,
  selectedAnswer,
  showResult,
  score,
  answeredCount,
  totalQuestions,
  isFinished,
  currentQuestion,
  progress,
  submitAnswer,
  nextQuestion,
  retry
} = usePhysicsPractice();

const scoreColor = computed(() => {
  const rate = totalQuestions.value > 0 ? score.value / totalQuestions.value : 0;
  if (rate >= 0.8) return '#07c160';
  if (rate >= 0.6) return '#ff976a';
  return '#ee0a24';
});

const resultDesc = computed(() => {
  const rate = totalQuestions.value > 0 ? score.value / totalQuestions.value : 0;
  if (rate >= 0.8) return t('tools.physics.practice.excellent');
  if (rate >= 0.6) return t('tools.physics.practice.good');
  if (rate >= 0.4) return t('tools.physics.practice.pass');
  return t('tools.physics.practice.needWork');
});

const handleOptionClick = (index) => {
  if (!showResult.value) {
    selectedAnswer.value = index;
  }
};
</script>

<style lang="less" scoped>
.practice-page {
  min-height: 100%;
  background: var(--color-bg-primary);
  display: flex;
  flex-direction: column;
}

.practice-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.progress-section {
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.progress-bar {
  height: 8px;
  background: rgba(var(--color-primary-rgb), 0.15);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: var(--color-primary);
  border-radius: 4px;
  transition: width var(--transition-base);
}

.progress-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.progress-text {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.score-text {
  font-size: var(--font-size-xs);
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

.question-card {
  flex: 1;
  margin: var(--spacing-md);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  overflow-y: auto;
}

.question-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
}

.question-index {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.question-type {
  padding: 2px 8px;
  background: rgba(var(--color-primary-rgb), 0.1);
  color: var(--color-primary);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
}

.question-content {
  margin-bottom: var(--spacing-lg);
}

.question-text {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  line-height: 1.6;
  margin: 0;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.option-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);

  &:hover {
    border-color: rgba(var(--color-primary-rgb), 0.3);
  }

  &.selected {
    background: rgba(var(--color-primary-rgb), 0.1);
    border-color: var(--color-primary);
  }

  &.correct {
    background: rgba(var(--color-success-rgb), 0.1);
    border-color: var(--color-success);
  }

  &.wrong {
    background: rgba(var(--color-danger-rgb), 0.1);
    border-color: var(--color-danger);
  }
}

.option-index {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-tertiary);
  border-radius: 50%;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  flex-shrink: 0;

  .selected & {
    background: var(--color-primary);
    color: #ffffff;
  }

  .correct & {
    background: var(--color-success);
    color: #ffffff;
  }

  .wrong & {
    background: var(--color-danger);
    color: #ffffff;
  }
}

.option-text {
  flex: 1;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.option-icon {
  font-size: var(--font-size-base);
}

.correct-icon {
  color: var(--color-success);
}

.wrong-icon {
  color: var(--color-danger);
}

.explanation-section {
  padding: var(--spacing-md);
  background: rgba(var(--color-warning-rgb), 0.1);
  border-radius: var(--radius-md);
  border: 1px solid rgba(var(--color-warning-rgb), 0.2);
}

.explanation-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-warning);
  margin-bottom: 4px;
}

.explanation-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.action-buttons {
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  padding-bottom: calc(var(--spacing-md) + env(safe-area-inset-bottom, 0px));
  flex-shrink: 0;

  .submit-btn,
  .next-btn {
    width: 100%;
  }
}

.result-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
}

.result-card {
  width: 100%;
  max-width: 320px;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  text-align: center;
}

.result-icon {
  font-size: 64px;
  margin-bottom: var(--spacing-md);
}

.result-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

.result-score {
  margin-bottom: var(--spacing-sm);
}

.score-value {
  font-size: 48px;
  font-weight: var(--font-weight-bold);
}

.score-total {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
}

.result-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-lg);
}

.result-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-value {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);

  &.correct {
    color: var(--color-success);
  }

  &.wrong {
    color: var(--color-danger);
  }

  &.rate {
    color: var(--color-primary);
  }
}

.stat-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.result-actions {
  display: flex;
  gap: var(--spacing-sm);
  width: 100%;
  max-width: 320px;
  margin-top: var(--spacing-lg);

  .back-btn,
  .retry-btn {
    flex: 1;
  }
}
</style>