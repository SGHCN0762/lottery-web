<template>
  <div class="exam-practice">
    <div class="exam-header" v-if="!loadError && !isLoading">
      <div class="header-top">
        <div class="header-title">{{ t('tools.civilServantExam.practice.title') }}</div>
        <div class="header-stats">
          <span class="stat-correct">{{ t('tools.civilServantExam.practice.correct') }} {{ correctCount }}</span>
          <span class="stat-wrong">{{ t('tools.civilServantExam.practice.wrong') }} {{ wrongCount }}</span>
        </div>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${progressPercent}%` }"></div>
      </div>
      <div class="progress-info">
        <span>{{ t('tools.civilServantExam.practice.answered') }} {{ answeredCount }}/{{ questions.length }}</span>
        <span>{{ t('tools.civilServantExam.practice.timer') }} {{ formatTime(remainingTime) }}</span>
      </div>
    </div>

    <div
      class="question-container"
      v-if="currentQuestion && !loadError && !isLoading"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <div class="question-card">
        <div class="question-header">
          <span class="question-number">{{ t('tools.civilServantExam.practice.questionNumber', { number: currentIndex + 1 }) }}</span>
          <div class="question-tags">
            <span class="question-type">{{ currentQuestion.section }}</span>
            <span class="question-category" :class="currentQuestion.category">{{ currentQuestion.category }}</span>
          </div>
        </div>

        <div v-if="currentQuestion.data" class="question-data">
          <div class="data-label">{{ t('tools.civilServantExam.practice.data') }}</div>
          <div class="data-content">{{ currentQuestion.data }}</div>
        </div>

        <div v-if="currentQuestion.image" class="question-image">
          <img :src="getImageUrl(currentQuestion.image)" alt="题图" @error="handleImageError" />
        </div>

        <div class="question-content">{{ currentQuestion.title }}</div>

        <div v-if="currentQuestion.optionsImage" class="options-image">
          <img :src="getImageUrl(currentQuestion.optionsImage)" alt="选项图" @error="handleImageError" />
        </div>

        <div class="options-list">
          <div
            v-for="(option, key) in currentQuestion.options"
            :key="key"
            class="option-item"
            :class="{
              selected: isSelected(key),
              correct: (isAnswered || isViewMode) && isCorrectAnswer(key),
              wrong: isAnswered && isSelected(key) && !isCorrectAnswer(key),
            }"
            @click="selectOption(key)"
          >
            <div class="option-key">{{ key }}</div>
            <div class="option-content">{{ option }}</div>
            <van-icon v-if="(isAnswered || isViewMode) && isCorrectAnswer(key)" name="success" class="option-icon correct" />
            <van-icon v-if="isAnswered && isSelected(key) && !isCorrectAnswer(key)" name="cross" class="option-icon wrong" />
          </div>
        </div>

        <div v-if="currentQuestion.category === '多选题' && !isAnswered && userAnswers[currentQuestion.id] && userAnswers[currentQuestion.id].length > 0" class="submit-area">
          <van-button type="primary" block @click="submitAnswer">
            {{ t('tools.civilServantExam.practice.submitAnswer') }}
          </van-button>
        </div>

        <div v-if="(isAnswered || isViewMode) && currentQuestion.analysis" class="answer-analysis">
          <div class="analysis-header">
            <span class="analysis-label">{{ t('tools.civilServantExam.practice.analysis') }}</span>
            <span class="correct-answer">{{ t('tools.civilServantExam.practice.correctAnswer', { answer: formatAnswer(currentQuestion.answer) }) }}</span>
          </div>
          <div class="analysis-content">{{ currentQuestion.analysis }}</div>
        </div>
      </div>

    </div>

    <div class="question-footer" v-if="!loadError && !isLoading">
      <van-button
        class="nav-btn menu"
        size="small"
        @click="showActionSheet = true"
      >
        <van-icon name="ellipsis" />
      </van-button>
      <van-button
        class="nav-btn prev"
        size="small"
        :disabled="currentIndex === 0"
        @click="prevQuestion"
      >
        {{ t('tools.civilServantExam.practice.prev') }}
      </van-button>
      <van-button
        class="nav-btn next"
        type="primary"
        size="small"
        :disabled="currentIndex === questions.length - 1"
        @click="nextQuestion"
      >
        {{ t('tools.civilServantExam.practice.next') }}
      </van-button>
    </div>

    <van-action-sheet
      v-model:show="showActionSheet"
      :actions="menuActions"
      :cancel-text="t('common.cancel')"
      close-on-click-action
      @select="onMenuSelect"
    />

    <van-popup v-model:show="showAnswerSheet" position="bottom" :style="{ height: '70%' }" round>
      <div class="answer-sheet-header">
        <div class="sheet-title">{{ t('tools.civilServantExam.practice.answerSheet') }}</div>
        <button class="close-btn" @click="showAnswerSheet = false">
          <van-icon name="cross" />
        </button>
      </div>
      <div class="answer-sheet-content">
        <div class="sheet-stats">
          <div class="stat-item">
            <span class="stat-value answered">{{ answeredCount }}</span>
            <span class="stat-label">{{ t('tools.civilServantExam.practice.answered') }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-value correct">{{ correctCount }}</span>
            <span class="stat-label">{{ t('tools.civilServantExam.practice.correct') }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-value wrong">{{ wrongCount }}</span>
            <span class="stat-label">{{ t('tools.civilServantExam.practice.wrong') }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-value pending">{{ questions.length - answeredCount }}</span>
            <span class="stat-label">{{ t('tools.civilServantExam.practice.pending') }}</span>
          </div>
        </div>
        <div class="sheet-nav">
          <div
            v-for="(q, index) in questions"
            :key="q.id"
            class="nav-item"
            :class="{
              active: currentIndex === index,
              answered: isAnswerAnswered(q.id),
              correct: isAnswerCorrect(q),
              wrong: isAnswerAnswered(q.id) && !isAnswerCorrect(q),
            }"
            @click="goToQuestion(index)"
          >
            {{ index + 1 }}
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Icon as VanIcon, Popup as VanPopup, Button as VanButton, ActionSheet as VanActionSheet, showLoadingToast, closeToast, showToast } from 'vant';

const route = useRoute();
const { t } = useI18n();

const questions = ref([]);
const currentIndex = ref(0);
const userAnswers = ref({});
const isViewMode = ref(false);
const remainingTime = ref(7200); // 默认120分钟倒计时
const showAnswerSheet = ref(false);
const showActionSheet = ref(false);
const examYear = ref(route.query.year || '2000');
const examFileName = ref(route.query.fileName ? decodeURIComponent(route.query.fileName) : `${examYear.value}年国家公务员考试行测真题`);
const isLoading = ref(true);
const loadError = ref(false);
const submittedAnswers = ref(new Set());

let timer = null;

const currentQuestion = computed(() => questions.value[currentIndex.value] || null);

const answeredCount = computed(() => {
  let count = 0;
  questions.value.forEach(q => {
    if (!q || !q.id) return;
    if (q.category === '多选题') {
      if (submittedAnswers.value.has(q.id)) {
        count++;
      }
    } else {
      const answer = userAnswers.value[q.id];
      if (answer !== undefined && answer !== null) {
        count++;
      }
    }
  });
  return count;
});

const isAnswered = computed(() => {
  if (!currentQuestion.value || !currentQuestion.value.id) return false;
  const qId = currentQuestion.value.id;
  
  if (currentQuestion.value.category === '多选题') {
    return submittedAnswers.value.has(qId);
  } else {
    const answer = userAnswers.value[qId];
    return answer !== undefined && answer !== null;
  }
});

const isSelected = (key) => {
  if (!currentQuestion.value || !currentQuestion.value.id) return false;
  const answer = userAnswers.value[currentQuestion.value.id];
  if (Array.isArray(answer)) {
    return answer.includes(key);
  }
  return answer === key;
};

const isCorrectAnswer = (key) => {
  if (!currentQuestion.value || !currentQuestion.value.answer) return false;
  const correctAnswer = currentQuestion.value.answer;
  if (Array.isArray(correctAnswer)) {
    return correctAnswer.includes(key);
  }
  return correctAnswer === key;
};

const formatAnswer = (answer) => {
  if (!answer) return '';
  if (Array.isArray(answer)) {
    return answer.sort().join('、');
  }
  return answer;
};

const isAnswerAnswered = (qId) => {
  const q = questions.value.find(item => item.id === qId);
  if (!q) return false;
  
  if (q.category === '多选题') {
    return submittedAnswers.value.has(qId);
  } else {
    const answer = userAnswers.value[qId];
    if (!answer) return false;
    if (Array.isArray(answer)) return answer.length > 0;
    return true;
  }
};

const isAnswerCorrect = (q) => {
  if (!q || !q.id || !q.answer) return false;
  const userAnswer = userAnswers.value[q.id];
  if (!userAnswer) return false;
  
  if (Array.isArray(q.answer)) {
    return Array.isArray(userAnswer) && 
           q.answer.length === userAnswer.length &&
           q.answer.every(a => userAnswer.includes(a));
  }
  return userAnswer === q.answer;
};

const progressPercent = computed(() => {
  if (questions.value.length === 0) return 0;
  return (answeredCount.value / questions.value.length) * 100;
});

const menuActions = computed(() => [
  { name: t('tools.civilServantExam.practice.answerSheet'), key: 'answerSheet' },
  isViewMode.value
    ? { name: t('tools.civilServantExam.practice.exitViewMode'), key: 'exitViewMode' }
    : { name: t('tools.civilServantExam.practice.viewAnswer'), key: 'viewAnswer' },
]);

const correctCount = computed(() => {
  let count = 0;
  questions.value.forEach(q => {
    if (!q || !q.id || !q.answer) return;
    const userAnswer = userAnswers.value[q.id];
    if (!userAnswer) return;
    
    if (Array.isArray(q.answer)) {
      if (Array.isArray(userAnswer) && 
          q.answer.length === userAnswer.length &&
          q.answer.every(a => userAnswer.includes(a))) {
        count++;
      }
    } else {
      if (userAnswer === q.answer) {
        count++;
      }
    }
  });
  return count;
});

const wrongCount = computed(() => answeredCount.value - correctCount.value);

const formatTime = (seconds) => {
  if (typeof seconds !== 'number' || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const getImageUrl = (filename) => {
  if (!filename) return '';
  return `${import.meta.env.BASE_URL}civil-servant-exam/json/${filename}`;
};

const handleImageError = (e) => {
  // 图片加载失败时隐藏图片
  e.target.style.display = 'none';
};

const loadQuestions = async () => {
  isLoading.value = true;
  loadError.value = false;
  showLoadingToast({ message: t('tools.civilServantExam.practice.loading'), duration: 0 });
  try {
    const jsonFileName = `${examFileName.value}.json`;
    const response = await fetch(`${import.meta.env.BASE_URL}civil-servant-exam/json/${jsonFileName}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData = await response.json();

    if (!Array.isArray(rawData) || rawData.length === 0) {
      throw new Error('试题数据为空或格式错误');
    }

    const parseAnswer = (answer, category) => {
      if (!answer) return '';
      const trimmed = answer.trim();
      if (trimmed.includes('、')) {
        return trimmed.split('、').map(a => a.trim()).filter(a => a);
      }
      if (trimmed.includes(',')) {
        return trimmed.split(',').map(a => a.trim()).filter(a => a);
      }
      if (trimmed.includes('，')) {
        return trimmed.split('，').map(a => a.trim()).filter(a => a);
      }
      if (category === '多选题' && trimmed.length > 1) {
        return trimmed.split('');
      }
      return trimmed;
    };

    questions.value = rawData.map(item => {
      const category = item.题型 || '单选题';
      return {
        id: item.题号 || 0,
        section: item.部分 || '',
        title: item.题目 || '',
        optionsImage: item.选项图 || '',
        options: item.选项 || {},
        answer: parseAnswer(item.答案 || '', category),
        analysis: item.解析 || '',
        image: item.题图 || '',
        data: item.资料 || '',
        category: category,
      };
    });

    if (questions.value.length === 0) {
      throw new Error('有效的试题数据为空');
    }

    closeToast();
    isLoading.value = false;
  } catch (error) {
    closeToast();
    isLoading.value = false;
    loadError.value = true;
    showToast({ message: t('tools.civilServantExam.practice.loadError'), type: 'error' });
    console.error('加载试题失败:', error);
  }
};

const selectOption = (key) => {
  if (!currentQuestion.value || !currentQuestion.value.id) return;
  const qId = currentQuestion.value.id;
  
  if (currentQuestion.value.category === '多选题') {
    let current = userAnswers.value[qId];
    if (!current) {
      current = [];
    }
    const index = current.indexOf(key);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(key);
    }
    userAnswers.value[qId] = current.length > 0 ? [...current] : null;
  } else {
    userAnswers.value[qId] = key;
  }
};

const submitAnswer = () => {
  if (!currentQuestion.value || !currentQuestion.value.id) return;
  const qId = currentQuestion.value.id;
  const answer = userAnswers.value[qId];
  if (answer && Array.isArray(answer) && answer.length > 0) {
    userAnswers.value[qId] = [...answer].sort();
    submittedAnswers.value.add(qId);
  }
};

const onMenuSelect = (action) => {
  if (action.key === 'answerSheet') {
    showAnswerSheet.value = true;
  } else if (action.key === 'viewAnswer') {
    isViewMode.value = true;
  } else if (action.key === 'exitViewMode') {
    isViewMode.value = false;
  }
};

const goToQuestion = (index) => {
  if (index < 0 || index >= questions.value.length) return;
  currentIndex.value = index;
  showAnswerSheet.value = false;
};

const prevQuestion = () => {
  if (currentIndex.value > 0 && questions.value.length > 0) {
    currentIndex.value--;
  }
};

const nextQuestion = () => {
  if (currentIndex.value < questions.value.length - 1 && questions.value.length > 0) {
    currentIndex.value++;
  }
};

// 触摸滑动相关
const touchStartX = ref(0);
const touchEndX = ref(0);
const isSwiping = ref(false);

const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX;
  touchEndX.value = e.touches[0].clientX;
  isSwiping.value = true;
};

const handleTouchMove = (e) => {
  if (!isSwiping.value) return;
  touchEndX.value = e.touches[0].clientX;
};

const handleTouchEnd = () => {
  if (!isSwiping.value) return;
  isSwiping.value = false;

  const swipeDistance = touchStartX.value - touchEndX.value;
  const minSwipeDistance = 50; // 最小滑动距离

  if (swipeDistance > minSwipeDistance) {
    // 向左滑动 - 下一题
    if (currentIndex.value < questions.value.length - 1) {
      nextQuestion();
    }
  } else if (swipeDistance < -minSwipeDistance) {
    // 向右滑动 - 上一题
    if (currentIndex.value > 0) {
      prevQuestion();
    }
  }

  // 重置
  touchStartX.value = 0;
  touchEndX.value = 0;
};

onMounted(() => {
  loadQuestions();
  startTimer();
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
});

const startTimer = () => {
  timer = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--;
    } else {
      // 倒计时结束，停止计时器
      clearInterval(timer);
      timer = null;
    }
  }, 1000);
};
</script>

<style lang="less" scoped>
.exam-practice {
  min-height: 100vh;
  background: var(--color-bg-primary);
  padding-bottom: env(safe-area-inset-bottom);
}

.exam-header {
  background: var(--gradient-primary);
  padding: calc(env(safe-area-inset-top) + 12px) 16px 16px;
  color: #fff;

  .header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    .header-title {
      font-size: 16px;
      font-weight: 600;
    }

    .header-stats {
      display: flex;
      gap: 12px;

      .stat-correct {
        font-size: 13px;
        color: #4caf50;
      }

      .stat-wrong {
        font-size: 13px;
        color: #f44336;
      }
    }
  }

  .progress-bar {
    height: 6px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 8px;

    .progress-fill {
      height: 100%;
      background: #fff;
      border-radius: 3px;
      transition: width 0.3s ease;
    }
  }

  .progress-info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    opacity: 0.9;
  }
}

.question-container {
  padding: 16px;
  padding-bottom: calc(env(safe-area-inset-bottom) + 80px);
}

.question-card {
  background: var(--color-bg-secondary);
  border-radius: 16px;
  padding: 16px;
  box-shadow: var(--shadow-card);

  .question-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;

            .question-number {
              font-size: 14px;
              font-weight: 600;
              color: var(--color-primary);
            }

            .question-tags {
              display: flex;
              gap: 8px;
            }

            .question-type {
              font-size: 12px;
              color: var(--color-text-tertiary);
              background: var(--color-bg-tertiary);
              padding: 4px 10px;
              border-radius: 20px;
            }

            .question-category {
              font-size: 12px;
              font-weight: 600;
              padding: 4px 10px;
              border-radius: 20px;

              &.单选题 {
                color: var(--color-primary);
                background: color-mix(in srgb, var(--color-primary) 10%, transparent);
              }

              &.多选题 {
                color: var(--color-warning);
                background: color-mix(in srgb, var(--color-warning) 10%, transparent);
              }
            }
          }

  .question-data {
    margin-bottom: 12px;
    padding: 12px;
    border-radius: 12px;
    background: color-mix(in srgb, var(--color-primary) 5%, transparent);
    border-left: 4px solid var(--color-primary);

    .data-label {
      font-size: 13px;
      font-weight: 600;
      color: var(--color-primary);
      margin-bottom: 6px;
    }

    .data-content {
      font-size: 14px;
      color: var(--color-text-secondary);
      line-height: 1.8;
      white-space: pre-wrap;
    }
  }

  .question-image, .options-image {
    margin-bottom: 12px;
    border-radius: 12px;
    overflow: hidden;
    background: #f5f5f5;

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  .question-content {
    font-size: 16px;
    color: var(--color-text-primary);
    line-height: 1.8;
    margin-bottom: 16px;
    white-space: pre-wrap;
  }

  .options-list {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .option-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 12px 14px;
      border-radius: 12px;
      background: var(--color-bg-tertiary);
      border: 2px solid transparent;
      cursor: pointer;
      transition: all 0.2s;

      &:active {
        transform: scale(0.98);
      }

      &.selected {
        border-color: var(--color-primary);
        background: color-mix(in srgb, var(--color-primary) 10%, transparent);
      }

      &.correct {
        border-color: var(--color-success);
        background: color-mix(in srgb, var(--color-success) 10%, transparent);
      }

      &.wrong {
        border-color: var(--color-danger);
        background: color-mix(in srgb, var(--color-danger) 10%, transparent);
      }

      .option-key {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: var(--color-border);
        color: var(--color-text-secondary);
        font-size: 13px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
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

      .option-content {
        flex: 1;
        font-size: 15px;
        color: var(--color-text-primary);
        line-height: 1.6;
        padding-top: 2px;
        white-space: pre-wrap;
      }

      .option-icon {
        flex-shrink: 0;
        font-size: 18px;
        margin-top: 2px;

        &.correct {
          color: var(--color-success);
        }

        &.wrong {
          color: var(--color-danger);
        }
      }
    }
  }

  .submit-area {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--color-border);
  }

  .answer-analysis {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--color-border);

    .analysis-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;

      .analysis-label {
        font-size: 14px;
        font-weight: 600;
        color: var(--color-primary);
      }

      .correct-answer {
        font-size: 13px;
        font-weight: 600;
        color: var(--color-success);
      }
    }

    .analysis-content {
      font-size: 14px;
      color: var(--color-text-secondary);
      line-height: 1.8;
      white-space: pre-wrap;
    }
  }
}

.question-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  gap: 12px;
  padding: 12px 16px calc(env(safe-area-inset-bottom) + 12px);
  background: var(--color-bg-secondary);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  z-index: 100;

  .nav-btn {
    flex: 1;
    height: 44px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 500;
  }

  .menu {
    max-width: 48px;
  }
}

.answer-sheet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid var(--color-border);

  .sheet-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text-primary);
  }

  .close-btn {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: var(--color-bg-tertiary);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    color: var(--color-text-secondary);
    cursor: pointer;
  }
}

.answer-sheet-content {
  padding: 16px;
  height: calc(100% - 64px);
  overflow-y: auto;

  .sheet-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 16px;
    padding: 12px;
    background: var(--color-bg-tertiary);
    border-radius: 12px;

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;

      .stat-value {
        font-size: 20px;
        font-weight: 600;

        &.answered {
          color: var(--color-primary);
        }

        &.correct {
          color: var(--color-success);
        }

        &.wrong {
          color: var(--color-danger);
        }

        &.pending {
          color: var(--color-text-tertiary);
        }
      }

      .stat-label {
        font-size: 12px;
        color: var(--color-text-secondary);
      }
    }
  }

  .sheet-nav {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(36px, 1fr));
    gap: 8px;

    .nav-item {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 500;
      color: var(--color-text-secondary);
      cursor: pointer;
      transition: all 0.2s;

      &.active {
        background: var(--color-primary);
        color: #fff;
        border-color: var(--color-primary);
      }

      &.answered {
        background: color-mix(in srgb, var(--color-primary) 20%, transparent);
        color: var(--color-primary);
        border-color: var(--color-primary);
      }

      &.correct {
        background: var(--color-success);
        color: #fff;
        border-color: var(--color-success);
      }

      &.wrong {
        background: var(--color-danger);
        color: #fff;
        border-color: var(--color-danger);
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }
}
</style>