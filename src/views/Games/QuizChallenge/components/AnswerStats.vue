<template>
  <div class="answer-stats" @click="showNavigation">
    <div class="stats-item correct">
      <span class="stats-icon">✓</span>
      <span class="stats-label">{{ t('quizChallenge.correct') }}</span>
      <span class="stats-value">{{ correctCount }}</span>
    </div>
    <div class="divider"></div>
    <div class="stats-item wrong">
      <span class="stats-icon">✗</span>
      <span class="stats-label">{{ t('quizChallenge.wrong') }}</span>
      <span class="stats-value">{{ wrongCount }}</span>
    </div>
  </div>

  <!-- 题目导航弹窗 -->
  <van-popup v-model:show="showPopup" position="bottom" round :style="{ height: '70%' }">
    <div class="navigation-popup">
      <div class="popup-header">
        <h3>{{ t('quizChallenge.questionNavigation') }}</h3>
        <van-icon name="cross" @click="closePopup" />
      </div>
      
      <div class="question-list">
        <div
          v-for="(item, index) in questionList"
          :key="index"
          class="question-item"
          :class="{
            current: item.index === currentIndex,
            correct: item.status === 'correct',
            wrong: item.status === 'wrong',
            unanswered: item.status === 'unanswered'
          }"
          @click="jumpToQuestion(item.index)"
        >
          <div class="question-info">
            <div class="question-number">{{ index + 1 }}</div>
            <div class="question-title">{{ item.title }}</div>
          </div>
          <div class="question-status">
            <span 
              v-if="item.status === 'correct'" 
              class="status-icon correct"
            >✓</span>
            <span 
              v-else-if="item.status === 'wrong'" 
              class="status-icon wrong"
            >✗</span>
            <span v-else class="unanswered-text">{{ t('quizChallenge.unanswered') }}</span>
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  correctCount: {
    type: Number,
    default: 0
  },
  totalQuestions: {
    type: Number,
    default: 5
  },
  currentIndex: {
    type: Number,
    default: 0
  },
  answeredQuestions: {
    type: Array,
    default: () => []
  },
  questions: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['jump-to-question']);

const { t } = useI18n();
const showPopup = ref(false);

// 计算答错数量
const wrongCount = computed(() => {
  return props.answeredQuestions.filter(q => q.status === 'wrong').length;
});

// 计算已作答的题目数量
const answeredCount = computed(() => {
  return props.answeredQuestions.length;
});

// 构建题目列表（只显示已作答的题目）
const questionList = computed(() => {
  const list = [];
  for (let i = 0; i < props.totalQuestions; i++) {
    const answered = props.answeredQuestions.find(q => q.index === i);
    // 只显示已作答的题目
    if (answered) {
      const question = props.questions[i];
      list.push({
        index: i,
        status: answered.status,
        title: question ? question.title : ''
      });
    }
  }
  return list;
});

/**
 * 显示导航弹窗
 */
const showNavigation = () => {
  // 如果没有作答，不弹出弹窗
  if (answeredCount.value === 0) {
    return;
  }
  showPopup.value = true;
};

/**
 * 关闭弹窗
 */
const closePopup = () => {
  showPopup.value = false;
};

/**
 * 跳转到指定题目
 */
const jumpToQuestion = (index) => {
  emit('jump-to-question', index);
  closePopup();
};
</script>

<style lang="less" scoped>
.answer-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-lg);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  .stats-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    color: white;

    .stats-icon {
      font-size: 20px;
      font-weight: bold;
    }

    .stats-label {
      font-size: var(--font-size-sm);
      opacity: 0.9;
    }

    .stats-value {
      font-size: var(--font-size-xl);
      font-weight: bold;
    }

    &.correct {
      .stats-icon {
        color: #52c41a;
        text-shadow: 0 0 8px rgba(82, 196, 26, 0.8);
      }
    }

    &.wrong {
      .stats-icon {
        color: #ff7875;
        text-shadow: 0 0 8px rgba(255, 120, 117, 0.8);
      }
    }
  }

  .divider {
    width: 1px;
    height: 30px;
    background: rgba(255, 255, 255, 0.3);
  }
}

.navigation-popup {
  height: 100%;
  display: flex;
  flex-direction: column;

  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);

    h3 {
      margin: 0;
      font-size: var(--font-size-lg);
      color: var(--color-text-primary);
    }

    .van-icon {
      font-size: 20px;
      cursor: pointer;
      color: var(--color-text-secondary);
    }
  }

  .question-list {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-md);

    .question-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-md);
      margin-bottom: var(--spacing-sm);
      background: var(--color-bg-secondary);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all 0.2s ease;
      border: 2px solid transparent;

      &:hover {
        background: var(--color-bg-hover);
        transform: translateX(4px);
      }

      &.current {
        border-color: #1989fa;
        background: rgba(25, 137, 250, 0.1);
      }

      &.correct {
        border-left: 4px solid #07c160;
      }

      &.wrong {
        border-left: 4px solid #ee0a24;
      }

      &.unanswered {
        opacity: 0.6;
      }

      .question-info {
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);

        .question-number {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--font-size-sm);
          font-weight: bold;
          color: white;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
        }

        .question-title {
          flex: 1;
          font-size: var(--font-size-sm);
          color: var(--color-text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          line-height: 1.4;
          word-break: break-word;
        }
      }

      .question-status {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        margin-left: var(--spacing-sm);

        .status-icon {
          font-size: 20px;
          font-weight: bold;

          &.correct {
            color: #07c160;
          }

          &.wrong {
            color: #ee0a24;
          }
        }

        .unanswered-text {
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
        }
      }
    }
  }
}
</style>