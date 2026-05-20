<template>
  <div class="question-card">
    <h3 class="question-title">{{ question.title }}</h3>

    <!-- 选项列表 -->
    <div class="options-list">
      <div
        v-for="(option, index) in question.options"
        :key="index"
        class="option-item"
        :class="{
          selected: selectedAnswer === index,
          correct: showResult && index === question.correctAnswer,
          wrong: showResult && selectedAnswer === index && index !== question.correctAnswer,
          disabled: showResult,
        }"
        @click="handleOptionClick(index)"
      >
        <span class="option-label">{{ ['A', 'B', 'C', 'D'][index] }}</span>
        <span class="option-text">{{ option }}</span>
        <span v-if="showResult && index === question.correctAnswer" class="option-icon">✓</span>
        <span
          v-if="showResult && selectedAnswer === index && index !== question.correctAnswer"
          class="option-icon wrong"
          >✗</span
        >
      </div>
    </div>

    <!-- 提交按钮 -->
    <van-button
      v-if="!showResult"
      type="primary"
      block
      @click="$emit('submit')"
      :disabled="selectedAnswer === null"
      class="submit-btn"
    >
      {{ t('quizChallenge.submitAnswer') }}
    </van-button>

    <van-button
      v-else
      type="success"
      block
      @click="handleNextClick"
      class="next-btn"
    >
      {{
        isReviewMode
          ? t('quizChallenge.backToAnswer')
          : isLastQuestion
            ? t('quizChallenge.viewResult')
            : t('quizChallenge.nextQuestion')
      }}
    </van-button>
  </div>
</template>

<script setup>
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const props = defineProps({
    question: {
      type: Object,
      required: true,
    },
    selectedAnswer: {
      type: Number,
      default: null,
    },
    showResult: {
      type: Boolean,
      default: false,
    },
    isLastQuestion: {
      type: Boolean,
      default: false,
    },
    isReviewMode: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['select-answer', 'submit', 'next', 'back']);

  /**
   * 处理选项点击
   * 如果已显示结果（回顾模式），则不允许修改选择
   */
  const handleOptionClick = index => {
    if (props.showResult) {
      // 回顾模式，不允许修改
      return;
    }
    emit('select-answer', index);
  };

  /**
   * 处理下一题/返回答题按钮点击
   */
  const handleNextClick = () => {
    if (props.isReviewMode) {
      // 回顾模式，触发返回事件
      emit('back');
    } else {
      // 正常模式，触发下一题事件
      emit('next');
    }
  };
</script>

<style lang="less" scoped>
  .question-card {
    background: var(--color-bg-secondary);
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    margin-bottom: var(--spacing-lg);

    .question-title {
      font-size: var(--font-size-base);
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-lg);
      line-height: var(--line-height-relaxed);
      font-weight: var(--font-weight-medium);
    }

    .options-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-lg);

      .option-item {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        padding: var(--spacing-md);
        background: var(--color-bg-tertiary);
        border: 2px solid transparent;
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: all var(--transition-fast);

        &:hover:not(.disabled) {
          border-color: var(--color-primary);
          background: rgba(24, 144, 255, 0.05);
        }

        &.selected {
          border-color: var(--color-primary);
          background: rgba(24, 144, 255, 0.1);
        }

        &.correct {
          border-color: var(--color-success);
          background: rgba(82, 196, 26, 0.1);
        }

        &.wrong {
          border-color: var(--color-danger);
          background: rgba(255, 77, 79, 0.1);
        }

        &.disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }

        .option-label {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: var(--color-primary);
          color: #fff;
          border-radius: 50%;
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-bold);
          flex-shrink: 0;
        }

        .option-text {
          flex: 1;
          font-size: var(--font-size-sm);
          color: var(--color-text-primary);
          line-height: var(--line-height-base);
        }

        .option-icon {
          font-size: var(--font-size-lg);
          color: var(--color-success);
          font-weight: bold;

          &.wrong {
            color: var(--color-danger);
          }
        }
      }
    }

    .submit-btn,
    .next-btn {
      margin-top: var(--spacing-md);
    }
  }
</style>
