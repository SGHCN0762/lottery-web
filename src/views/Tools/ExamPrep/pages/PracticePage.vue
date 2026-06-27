<template>
  <div class="practice-page">
    <!-- 顶部状态栏 -->
    <div class="top-bar">
      <div class="top-bar-bg">
        <div class="bg-circle circle-1"></div>
        <div class="bg-circle circle-2"></div>
      </div>
      <div class="top-bar-inner">
        <div class="top-left">
          <div class="progress-badge">
            <span class="progress-current">{{ currentIndex + 1 }}</span>
            <span class="progress-sep">/</span>
            <span class="progress-total">{{ totalQuestions }}</span>
          </div>
        </div>
        <div class="top-center">
          <div class="timer-display" :class="{ paused: isPaused }">
            <van-icon name="clock-o" class="timer-icon" />
            <span class="timer-text">{{ formatTime(elapsedSeconds) }}</span>
          </div>
        </div>
        <div class="top-right">
          <button class="icon-btn" @click="handlePauseToggle">
            <van-icon :name="isPaused ? 'play-circle-o' : 'pause-circle-o'" />
          </button>
        </div>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" :style="{ width: `${progressPercentage}%` }"></div>
        </div>
        <div class="progress-info">
          <span class="progress-percent">{{ progressPercentage }}%</span>
          <span class="progress-label">答题进度</span>
        </div>
      </div>
    </div>

    <!-- 题目滑动区域 -->
    <van-swipe
      ref="swipeRef"
      v-model="currentIndex"
      :loop="false"
      :show-indicators="false"
      :stop-propagation="false"
      :prevent-touchmove-default="true"
      class="question-swipe"
      @change="handleSwipeChange"
    >
      <van-swipe-item v-for="(question, index) in questions" :key="question.id">
        <div class="swipe-item-content" :class="{ 'no-scroll': isPaused }">
          <div class="question-header">
            <span class="question-index-badge">第 {{ index + 1 }} 题</span>
            <span
              class="question-category-tag"
              :style="{ background: getCategoryColor(question.category) + '15', color: getCategoryColor(question.category) }"
            >
              {{ getCategoryName(question.category) }}
            </span>
          </div>
          <QuestionCard
            :ref="el => setQuestionCardRef(el, index)"
            :question="question"
            :showAnalysis="false"
            @answered="handleAnswered"
            @collect-change="handleCollectChange"
            @note-save="handleNoteSave"
          />
        </div>
      </van-swipe-item>
    </van-swipe>

    <!-- 底部导航栏 -->
    <div class="bottom-bar">
      <van-button
        class="more-btn"
        size="small"
        icon="more-o"
        @click="showMoreActions = true"
      />

      <div class="bottom-nav">
        <van-button
          class="nav-btn prev"
          type="default"
          :disabled="currentIndex === 0"
          @click="handlePrevQuestion"
        >
          <span>上一题</span>
        </van-button>
        <van-button
          v-if="currentIndex < totalQuestions - 1"
          class="nav-btn next"
          type="primary"
          @click="handleNextQuestion"
        >
          <span>下一题</span>
        </van-button>
        <van-button
          v-else
          class="nav-btn finish"
          type="success"
          :disabled="answeredCount === 0"
          @click="handleFinish"
        >
          <van-icon name="success" />
          <span>交卷</span>
        </van-button>
      </div>
    </div>

    <!-- 更多操作 ActionSheet -->
    <van-action-sheet
      v-model:show="showMoreActions"
      :actions="moreActions"
      :cancel-text="'取消'"
      @select="handleMoreActionSelect"
    />

    <!-- 答题卡弹窗 -->
    <van-popup
      v-model:show="showAnswerSheet"
      position="bottom"
      :style="{ height: '75%' }"
      round
      closeable
      :close-on-popstate="true"
    >
      <div class="answer-sheet-popup">
        <div class="popup-header">
          <h3 class="popup-title">答题卡</h3>
        </div>
        <div class="popup-body">
          <AnswerSheet
            :answers="answerStatusList"
            :total="totalQuestions"
            :current-index="currentIndex"
            @jump="handleJumpToQuestion"
          />
        </div>
        <div class="popup-footer">
          <van-button type="primary" class="submit-btn" :disabled="answeredCount === 0" @click="handleFinish">
            交卷 ({{ answeredCount }}/{{ totalQuestions }})
          </van-button>
        </div>
      </div>
    </van-popup>

    <!-- 结果统计弹窗 -->
    <van-popup
      v-model:show="showResultPopup"
      position="center"
      :style="{ width: '92%', maxWidth: '400px' }"
      round
      :close-on-click-overlay="false"
    >
      <div class="result-popup">
        <div class="result-header" :class="{ excellent: accuracy >= 60 }">
          <div class="result-decoration">
            <div class="deco-circle deco-1"></div>
            <div class="deco-circle deco-2"></div>
            <div class="deco-circle deco-3"></div>
          </div>
          <div class="result-icon-wrap">
            <div class="result-icon-bg">
              <van-icon :name="accuracy >= 60 ? 'medal-o' : 'bulb-o'" size="44" />
            </div>
          </div>
          <h3 class="result-title">
            {{ accuracy >= 60 ? '太棒了！' : '继续加油！' }}
          </h3>
          <p class="result-subtitle">
            {{ accuracy >= 60 ? '你的表现非常出色，继续保持！' : '每一次练习都是进步，再接再厉！' }}
          </p>
        </div>
        
        <div class="result-accuracy-section">
          <div class="accuracy-circle">
            <svg class="accuracy-ring" viewBox="0 0 100 100">
              <circle class="accuracy-bg" cx="50" cy="50" r="42" />
              <circle 
                class="accuracy-fill" 
                cx="50" cy="50" r="42"
                :style="{ strokeDashoffset: 264 - (264 * accuracy / 100) }"
              />
            </svg>
            <div class="accuracy-content">
              <span class="accuracy-num">{{ accuracy }}</span>
              <span class="accuracy-percent">%</span>
            </div>
          </div>
          <div class="accuracy-label">正确率</div>
        </div>

        <div class="result-stats-grid">
          <div class="result-stat-item correct">
            <div class="stat-icon">
              <van-icon name="success" />
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ correctCount }}</div>
              <div class="stat-label">答对</div>
            </div>
          </div>
          <div class="result-stat-item wrong">
            <div class="stat-icon">
              <van-icon name="cross" />
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ wrongCount }}</div>
              <div class="stat-label">答错</div>
            </div>
          </div>
          <div class="result-stat-item time">
            <div class="stat-icon">
              <van-icon name="clock-o" />
            </div>
            <div class="stat-info">
              <div class="stat-value time-value">{{ formatTime(elapsedSeconds) }}</div>
              <div class="stat-label">用时</div>
            </div>
          </div>
          <div class="result-stat-item speed">
            <div class="stat-icon">
              <van-icon name="fire" />
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ avgTimePerQuestion }}</div>
              <div class="stat-label">秒/题</div>
            </div>
          </div>
        </div>

        <div class="result-actions">
          <button v-if="wrongCount > 0" class="action-main-btn" @click="handleReviewWrong">
            <van-icon name="eye-o" />
            <span>查看错题</span>
          </button>
          <div class="action-row">
            <button class="action-secondary-btn" @click="handleRestart">
              <van-icon name="replay" />
              <span>再来一次</span>
            </button>
            <button class="action-secondary-btn primary" @click="handleBackHome">
              <van-icon name="home-o" />
              <span>返回首页</span>
            </button>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 暂停遮罩 -->
    <div v-if="isPaused" class="pause-overlay" @click="handlePauseToggle">
      <div class="pause-card" @click.stop>
        <div class="pause-icon-wrap">
          <div class="pause-icon-bg">
            <van-icon name="pause-circle" size="56" />
          </div>
        </div>
        <h3 class="pause-title">已暂停</h3>
        <p class="pause-desc">当前用时：{{ formatTime(elapsedSeconds) }}</p>
        <button class="resume-btn" @click="handlePauseToggle">
          <van-icon name="play" />
          继续答题
        </button>
        <button class="exit-btn" @click="handleExit">
          退出练习
        </button>
      </div>
    </div>

    <!-- 退出确认弹窗 -->
    <van-dialog
      v-model:show="showExitDialog"
      :title="t('tools.examPrep.practice.exitTitle')"
      :message="t('tools.examPrep.practice.exitMessage')"
      show-cancel-button
      confirm-button-text="t('tools.examPrep.practice.confirmExit')"
      cancel-button-text="t('tools.examPrep.practice.cancel')"
      @confirm="handleConfirmExit"
      @cancel="showExitDialog = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { showToast, showConfirmDialog, Dialog as VanDialog } from 'vant';
import {
  Swipe as VanSwipe,
  SwipeItem as VanSwipeItem,
  Popup as VanPopup,
} from 'vant';
import QuestionCard from '../components/QuestionCard.vue';
import AnswerSheet from '../components/AnswerSheet.vue';
import { useDatabase } from '../hooks/useDatabase';
import { PRACTICE_MODES, ANSWER_STATUS } from '../utils/constants';
import { shuffleArray, formatTime } from '../utils/helpers';

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const db = useDatabase();

const categoryColors = {
  verbal: '#667eea',
  logic: '#764ba2',
  math: '#f093fb',
  data: '#4facfe',
  common: '#43e97b',
};

const categoryNames = {
  verbal: '言语理解',
  logic: '判断推理',
  math: '数量关系',
  data: '资料分析',
  common: '常识判断',
};

const getCategoryColor = (category) => categoryColors[category] || '#667eea';
const getCategoryName = (category) => categoryNames[category] || category;

const questions = ref([]);
const currentIndex = ref(0);
const answerStatusList = ref([]);

const elapsedSeconds = ref(0);
const isPaused = ref(false);
let timerInterval = null;

const showAnswerSheet = ref(false);
const showResultPopup = ref(false);
const showExitDialog = ref(false);
const showMoreActions = ref(false);

const moreActions = computed(() => [
  { name: '答题卡', icon: 'orders-o', action: 'answerSheet' },
  { name: isCollected.value ? '取消收藏' : '收藏', icon: isCollected.value ? 'star' : 'star-o', action: 'collect' },
  { name: '笔记', icon: 'edit', action: 'note' },
  { name: '反馈', icon: 'warning-o', action: 'report' },
]);

const swipeRef = ref(null);
const questionCardRefs = shallowRef({});

const mode = computed(() => route.query.mode || PRACTICE_MODES.RANDOM);
const categoryId = computed(() => route.query.categoryId || null);

const questionCount = computed(() => {
  const count = parseInt(route.query.count) || parseInt(route.query.questionCount) || 10;
  return Math.min(count, 100);
});

const totalQuestions = computed(() => questions.value.length);

const progressPercentage = computed(() => {
  if (totalQuestions.value === 0) return 0;
  return Math.round(((currentIndex.value + 1) / totalQuestions.value) * 100);
});

const answeredCount = computed(() => {
  return answerStatusList.value.filter(
    item => item.status !== ANSWER_STATUS.UNANSWERED
  ).length;
});

const correctCount = computed(() => {
  return answerStatusList.value.filter(
    item => item.status === ANSWER_STATUS.CORRECT
  ).length;
});

const wrongCount = computed(() => {
  return answerStatusList.value.filter(
    item => item.status === ANSWER_STATUS.WRONG
  ).length;
});

const skippedCount = computed(() => {
  return answerStatusList.value.filter(
    item => item.status === ANSWER_STATUS.UNANSWERED
  ).length;
});

const accuracy = computed(() => {
  if (answeredCount.value === 0) return 0;
  return Math.round((correctCount.value / answeredCount.value) * 100);
});

const avgTimePerQuestion = computed(() => {
  if (answeredCount.value === 0) return 0;
  return Math.round(elapsedSeconds.value / answeredCount.value);
});

const isCollected = computed(() => {
  if (!answerStatusList.value[currentIndex.value]) return false;
  return answerStatusList.value[currentIndex.value].isCollected || false;
});

const setQuestionCardRef = (el, index) => {
  if (el) {
    questionCardRefs.value[index] = el;
  }
};

const initializeQuestions = async () => {
  const currentMode = mode.value;
  const count = questionCount.value;
  const catId = categoryId.value;

  let allQuestions = [];

  switch (currentMode) {
    case PRACTICE_MODES.RANDOM:
      allQuestions = await db.getRandomQuestions(count, catId);
      break;
    case PRACTICE_MODES.SEQUENTIAL:
      allQuestions = await db.getSequentialQuestions(count, 0, catId);
      break;
    case PRACTICE_MODES.WRONG:
      const wrongRecords = await db.getWrongRecords({ category: catId });
      const wrongQuestionIds = [...new Set(wrongRecords.map(r => r.questionId))];
      allQuestions = await db.getQuestionsByIds(wrongQuestionIds);
      if (allQuestions.length > count) {
        allQuestions = shuffleArray(allQuestions).slice(0, count);
      }
      break;
    case PRACTICE_MODES.COLLECTED:
      const collections = await db.getAllCollections({ category: catId });
      const collectedIds = collections.map(c => c.questionId);
      allQuestions = await db.getQuestionsByIds(collectedIds);
      if (allQuestions.length > count) {
        allQuestions = allQuestions.slice(0, count);
      }
      break;
    default:
      allQuestions = await db.getRandomQuestions(count, catId);
  }

  if (route.query.questionIds) {
    const ids = route.query.questionIds.split(',').map(id => id.trim());
    allQuestions = await db.getQuestionsByIds(ids);
  }

  questions.value = allQuestions;

  answerStatusList.value = allQuestions.map(q => ({
    questionId: q.id,
    status: ANSWER_STATUS.UNANSWERED,
    userAnswer: null,
    isCollected: false,
  }));

  for (let i = 0; i < allQuestions.length; i++) {
    const q = allQuestions[i];
    const isCollected = await db.isQuestionCollected(q.id);
    answerStatusList.value[i].isCollected = isCollected;
  }
};

const startTimer = () => {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    if (!isPaused.value) {
      elapsedSeconds.value++;
    }
  }, 1000);
};

const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

const handlePauseToggle = () => {
  isPaused.value = !isPaused.value;
};

const handleSwipeChange = (index) => {
  currentIndex.value = index;
};

const handleAnswered = ({ questionId, isCorrect, userAnswer }) => {
  const index = questions.value.findIndex(q => q.id === questionId);
  if (index !== -1) {
    answerStatusList.value[index].status = isCorrect ? ANSWER_STATUS.CORRECT : ANSWER_STATUS.WRONG;
    answerStatusList.value[index].userAnswer = userAnswer;
  }
};

const handleCollectChange = ({ questionId, isCollected: collected }) => {
  const index = questions.value.findIndex(q => q.id === questionId);
  if (index !== -1) {
    answerStatusList.value[index].isCollected = collected;
  }
};

const handleNoteSave = ({ questionId, content }) => {
  console.log('笔记已保存:', questionId, content);
};

const handleNoteClick = () => {
  showToast('笔记功能开发中');
};

const handleReportClick = () => {
  showToast('反馈功能开发中');
};

const handlePrevQuestion = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    swipeRef.value?.prev();
  }
};

const handleNextQuestion = () => {
  if (currentIndex.value < totalQuestions.value - 1) {
    currentIndex.value++;
    swipeRef.value?.next();
  }
};

const handleJumpToQuestion = (index) => {
  currentIndex.value = index;
  swipeRef.value?.swipeTo(index);
  showAnswerSheet.value = false;
};

const handleMoreActionSelect = (action) => {
  showMoreActions.value = false;
  switch (action.action) {
    case 'answerSheet':
      showAnswerSheet.value = true;
      break;
    case 'collect':
      handleToggleCollect();
      break;
    case 'note':
      handleNoteClick();
      break;
    case 'report':
      handleReportClick();
      break;
  }
};

const handleToggleCollect = async () => {
  const currentQuestion = questions.value[currentIndex.value];
  if (!currentQuestion) return;

  try {
    if (isCollected.value) {
      await db.removeCollection(currentQuestion.id);
      answerStatusList.value[currentIndex.value].isCollected = false;
      showToast('已取消收藏');
    } else {
      await db.addCollection(currentQuestion.id);
      answerStatusList.value[currentIndex.value].isCollected = true;
      showToast('已收藏');
    }
  } catch (error) {
    console.error('收藏操作失败:', error);
    showToast('操作失败');
  }
};

const handleFinish = async () => {
  if (answeredCount.value === 0) return;
  
  stopTimer();

  try {
    const records = [];
    for (let i = 0; i < questions.value.length; i++) {
      const q = questions.value[i];
      const status = answerStatusList.value[i];
      if (status.status !== ANSWER_STATUS.UNANSWERED) {
        records.push({
          questionId: q.id,
          category: q.category,
          isCorrect: status.status === ANSWER_STATUS.CORRECT,
          userAnswer: status.userAnswer,
          timeSpent: Math.floor(elapsedSeconds.value / totalQuestions.value),
          mode: mode.value,
        });
      }
    }
    
    if (records.length > 0) {
      await db.addStudyRecords(records);
    }
  } catch (error) {
    console.error('保存练习记录失败:', error);
  }

  showAnswerSheet.value = false;
  showResultPopup.value = true;
};

const handleExit = () => {
  if (answeredCount.value > 0) {
    showExitDialog.value = true;
  } else {
    router.back();
  }
};

const handleConfirmExit = () => {
  stopTimer();
  router.back();
};

const handleReviewWrong = () => {
  showResultPopup.value = false;
  const wrongIndex = answerStatusList.value.findIndex(
    item => item.status === ANSWER_STATUS.WRONG
  );
  if (wrongIndex !== -1) {
    currentIndex.value = wrongIndex;
    swipeRef.value?.swipeTo(wrongIndex);
  }
};

const handleRestart = () => {
  showResultPopup.value = false;
  currentIndex.value = 0;
  elapsedSeconds.value = 0;
  isPaused.value = false;
  answerStatusList.value = questions.value.map(q => ({
    questionId: q.id,
    status: ANSWER_STATUS.UNANSWERED,
    userAnswer: null,
    isCollected: false,
  }));
  startTimer();
  swipeRef.value?.swipeTo(0);
};

const handleBackHome = () => {
  showResultPopup.value = false;
  router.push({ name: 'ExamPrep' });
};

onMounted(async () => {
  try {
    await db.initializeDatabase();
    await initializeQuestions();
    startTimer();
  } catch (error) {
    console.error('初始化失败:', error);
    showToast(t('tools.examPrep.practice.loadError'));
    router.back();
  }
});

onUnmounted(() => {
  stopTimer();
});
</script>

<style lang="less" scoped>
.practice-page {
  display: flex;
  flex-direction: column;

  .top-bar {
    position: relative;
    background: var(--gradient-primary);
    padding: 0 0 16px;
    padding-top: env(safe-area-inset-top);
    overflow: hidden;

    .top-bar-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;

      .bg-circle {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);
      }

      .circle-1 {
        width: 180px;
        height: 180px;
        top: -70px;
        right: -40px;
      }

      .circle-2 {
        width: 120px;
        height: 120px;
        bottom: -40px;
        left: -30px;
      }
    }

    .top-bar-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 16px;
      position: relative;
      z-index: 1;
    }

    .top-left {
      display: flex;
      align-items: center;
      gap: 12px;

      .progress-badge {
        display: flex;
        align-items: baseline;
        gap: 2px;
        color: var(--van-white);
        font-weight: 700;

        .progress-current {
          font-size: 22px;
          letter-spacing: -0.5px;
        }

        .progress-sep {
          font-size: 14px;
          opacity: 0.6;
        }

        .progress-total {
          font-size: 14px;
          opacity: 0.6;
        }
      }
    }

    .top-center {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      .timer-display {
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--van-white);
        padding: 8px 16px;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.1);

        &.paused {
          color: var(--van-orange-3);
          background: rgba(252, 211, 77, 0.2);
          border-color: rgba(252, 211, 77, 0.3);
        }

        .timer-icon {
          font-size: 14px;
        }

        .timer-text {
          font-size: 13px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
        }
      }
    }

    .top-right {
      .icon-btn {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.18);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: var(--van-white);
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

        &:active {
          transform: scale(0.92);
          background: rgba(255, 255, 255, 0.28);
        }
      }
    }

    .progress-bar-wrap {
      padding: 0 16px;
      position: relative;
      z-index: 1;

      .progress-bar-bg {
        height: 8px;
        background: rgba(255, 255, 255, 0.25);
        border-radius: 4px;
        overflow: hidden;

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--van-orange-4) 0%, var(--van-white) 100%);
          border-radius: 4px;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      }

      .progress-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 8px;

        .progress-percent {
          font-size: 13px;
          font-weight: 600;
          color: var(--van-white);
        }

        .progress-label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }
  }

  .question-swipe {
    flex: 1;
    overflow: hidden;

    .swipe-item-content {
      height: 100%;
      overflow-y: auto;
      padding: 16px;
      padding-bottom: calc(16px + 200px);

      &.no-scroll {
        overflow: hidden;
      }

      .question-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;

        .question-index-badge {
          font-size: 12px;
          font-weight: 600;
          color: var(--color-primary);
          background: rgba(99, 102, 241, 0.1);
          padding: 6px 12px;
          border-radius: 8px;
        }

        .question-category-tag {
          font-size: 12px;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 8px;
        }
      }
    }
  }

  .bottom-bar {
    background: var(--color-bg-secondary);
    padding: 12px 16px;
    padding-bottom: calc(12px + env(safe-area-inset-bottom));
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.06);
    border-radius: 20px 20px 0 0;
    display: flex;
    align-items: center;
    gap: 12px;

    .more-btn {
      width: 44px;
      height: 44px;
      padding: 0;
      border-radius: 12px;
      background: var(--color-bg-tertiary);
      border: none;
      color: var(--color-text-secondary);

      &:active {
        opacity: 0.8;
      }
    }

    .bottom-nav {
      flex: 1;
      display: flex;
      gap: 10px;

      .nav-btn {
        flex: 1;
        height: 44px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;

        &:active:not(.van-button--disabled) {
          opacity: 0.9;
        }

        &.prev {
          background: var(--color-bg-tertiary);
          color: var(--color-text-secondary);
          border: none;
        }

        &.next {
          background: var(--gradient-primary);
          color: #fff;
          border: none;
          box-shadow: 0 4px 12px rgba(25, 137, 250, 0.3);
        }

        &.finish {
          background: linear-gradient(135deg, var(--color-success) 0%, var(--van-green-7) 100%);
          color: #fff;
          border: none;
          box-shadow: 0 4px 12px rgba(7, 193, 96, 0.3);
        }
      }
    }
  }

  .answer-sheet-popup {
    height: 100%;
    display: flex;
    flex-direction: column;

    .popup-header {
      padding: var(--spacing-md);
      border-bottom: 1px solid var(--van-gray-1);
      flex-shrink: 0;

      .popup-title {
        color: var(--color-text-primary);
      }
    }

    .popup-body {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
    }

    .popup-footer {
      padding: 12px 16px;
      padding-bottom: calc(12px + env(safe-area-inset-bottom));
      border-top: 1px solid var(--van-gray-1);
      flex-shrink: 0;

      .submit-btn {
        width: 100%;
      }
    }
  }

  .result-popup {
    padding: 0;
    border-radius: 24px;
    overflow: hidden;

    .result-header {
      position: relative;
      padding: 36px 24px 28px;
      text-align: center;
      background: linear-gradient(180deg, var(--van-orange-1) 0%, var(--van-white) 100%);
      overflow: hidden;

      &.excellent {
        background: linear-gradient(180deg, var(--van-green-1) 0%, var(--van-white) 100%);
      }

      .result-decoration {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;

        .deco-circle {
          position: absolute;
          border-radius: 50%;
        }

        .deco-1 {
          width: 100px;
          height: 100px;
          top: -40px;
          right: -30px;
          background: rgba(251, 191, 36, 0.15);
        }

        .deco-2 {
          width: 60px;
          height: 60px;
          bottom: 10px;
          left: 20px;
          background: rgba(251, 191, 36, 0.1);
        }

        .deco-3 {
          width: 40px;
          height: 40px;
          top: 30px;
          left: 40px;
          background: rgba(251, 191, 36, 0.12);
        }
      }

      &.excellent .deco-circle {
        background: rgba(16, 185, 129, 0.15);
        &:nth-child(2) { background: rgba(16, 185, 129, 0.1); }
        &:nth-child(3) { background: rgba(16, 185, 129, 0.12); }
      }

      .result-icon-wrap {
        position: relative;
        z-index: 1;
        margin-bottom: 14px;
        display: flex;
        justify-content: center;

        .result-icon-bg {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--van-orange-4) 0%, var(--van-orange-5) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--van-white);
          box-shadow: 0 8px 24px rgba(245, 158, 11, 0.35);
        }
      }

      &.excellent .result-icon-bg {
        background: linear-gradient(135deg, var(--van-green-3) 0%, var(--color-success) 100%);
        box-shadow: 0 8px 24px rgba(16, 185, 129, 0.35);
      }

      .result-title {
        position: relative;
        z-index: 1;
        font-size: 22px;
        font-weight: 700;
        color: var(--color-text-primary);
        margin: 0 0 6px;
        letter-spacing: -0.3px;
      }

      .result-subtitle {
        position: relative;
        z-index: 1;
        font-size: 13px;
        color: var(--van-gray-7);
        margin: 0;
        line-height: 1.5;
      }
    }

    .result-accuracy-section {
      padding: 20px 24px 8px;
      text-align: center;

      .accuracy-circle {
        position: relative;
        width: 130px;
        height: 130px;
        margin: 0 auto 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        .accuracy-ring {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);

          .accuracy-bg {
            fill: none;
            stroke: var(--van-gray-1);
            stroke-width: 10;
          }

          .accuracy-fill {
            fill: none;
            stroke: url(#accuracyGradient);
            stroke: var(--color-primary);
            stroke-width: 10;
            stroke-linecap: round;
            stroke-dasharray: 264;
            stroke-dashoffset: 264;
            transition: stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1);
          }
        }

        .accuracy-content {
          display: flex;
          align-items: baseline;
          gap: 2px;

          .accuracy-num {
            font-size: 44px;
            font-weight: 800;
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--van-blue-4) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            line-height: 1;
            letter-spacing: -1px;
          }

          .accuracy-percent {
            font-size: 18px;
            font-weight: 700;
            color: var(--color-primary);
          }
        }
      }

      .accuracy-label {
        font-size: 13px;
        color: var(--van-gray-7);
        font-weight: 500;
      }
    }

    .result-stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      padding: 16px 20px 8px;

      .result-stat-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px;
        background: var(--van-gray-1);
        border-radius: 14px;

        .stat-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: var(--van-white);
          flex-shrink: 0;
        }

        &.correct .stat-icon {
          background: linear-gradient(135deg, var(--van-green-3) 0%, var(--color-success) 100%);
        }
        &.wrong .stat-icon {
          background: linear-gradient(135deg, var(--van-red-4) 0%, var(--van-red-6) 100%);
        }
        &.time .stat-icon {
          background: linear-gradient(135deg, var(--van-orange-4) 0%, var(--van-orange-5) 100%);
        }
        &.speed .stat-icon {
          background: linear-gradient(135deg, var(--van-orange-4) 0%, var(--van-orange-6) 100%);
        }

        .stat-info {
          .stat-value {
            font-size: 18px;
            font-weight: 700;
            color: var(--color-text-primary);
            line-height: 1.2;
          }

          .time-value {
            font-size: 13px;
          }

          .stat-label {
            font-size: 11px;
            color: var(--van-gray-6);
            margin-top: 2px;
          }
        }
      }
    }

    .result-actions {
      padding: 12px 20px 24px;
      display: flex;
      flex-direction: column;
      gap: 10px;

      .action-main-btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 14px 20px;
        border: none;
        border-radius: 14px;
        background: var(--gradient-primary);
        color: var(--van-white);
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 6px 20px rgba(99, 102, 241, 0.35);

        &:active {
          transform: scale(0.98);
        }
      }

      .action-row {
        display: flex;
        gap: 10px;

        .action-secondary-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 12px 16px;
          border: 1.5px solid var(--van-gray-3);
          border-radius: 12px;
          background: var(--van-white);
          color: var(--van-gray-7);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

          &:active {
            transform: scale(0.98);
            background: var(--van-gray-1);
          }

          &.primary {
            border-color: var(--color-primary);
            color: var(--color-primary);
            background: rgba(99, 102, 241, 0.05);
          }

          :deep(.van-icon) {
            font-size: 16px;
          }
        }
      }
    }
  }

  .pause-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px;

    .pause-card {
      width: 100%;
      max-width: 320px;
      background: var(--van-white);
      border-radius: 24px;
      padding: 32px 24px 24px;
      text-align: center;
      animation: popupIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      @keyframes popupIn {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .pause-icon-wrap {
        margin-bottom: 16px;

        .pause-icon-bg {
          width: 80px;
          height: 80px;
          margin: 0 auto;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--van-orange-4) 0%, var(--van-orange-5) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--van-white);
          box-shadow: 0 8px 24px rgba(245, 158, 11, 0.35);
        }
      }

      .pause-title {
        font-size: 20px;
        font-weight: 700;
        color: var(--color-text-primary);
        margin: 0 0 6px;
      }

      .pause-desc {
        font-size: 14px;
        color: var(--van-gray-7);
        margin: 0 0 24px;
      }

      .resume-btn {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        border: none;
        border-radius: 14px;
        background: var(--gradient-primary);
        color: var(--van-white);
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.25s;
        box-shadow: 0 6px 20px rgba(99, 102, 241, 0.35);
        margin-bottom: 12px;

        &:active {
          transform: scale(0.98);
        }
      }

      .exit-btn {
        width: 100%;
        height: 46px;
        border: none;
        border-radius: 14px;
        background: var(--van-gray-1);
        color: var(--van-gray-7);
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;

        &:active {
          transform: scale(0.98);
          background: var(--van-gray-3);
        }
      }
    }
  }
}
</style>
