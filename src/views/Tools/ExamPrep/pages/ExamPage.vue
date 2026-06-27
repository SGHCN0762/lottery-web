<template>
  <div class="exam-page">
    <!-- 顶部状态栏 -->
    <div class="top-bar">
      <div class="exam-info">
        <div class="exam-title">{{ t('tools.examPrep.exam.title') }}</div>
        <div class="timer-section" :class="{ warning: remainingMinutes <= 15, danger: remainingMinutes <= 5 }">
          <van-icon name="clock-o" class="timer-icon" />
          <span class="timer-text">{{ formatTime(remainingSeconds) }}</span>
          <span class="timer-label">{{ t('tools.examPrep.exam.remaining') }}</span>
        </div>
        <div class="progress-section">
          <van-progress
            :percentage="progressPercentage"
            :show-pivot="false"
            stroke-width="4"
            color="#667eea"
            track-color="#f0f0f0"
          />
          <div class="progress-text">
            {{ answeredCount }}/{{ totalQuestions }}
          </div>
        </div>
      </div>
      <div class="top-actions">
        <van-button
          size="small"
          :icon="isPaused ? 'play-circle-o' : 'pause-circle-o'"
          plain
          @click="handlePauseToggle"
        >
          {{ isPaused ? t('tools.examPrep.exam.continue') : t('tools.examPrep.exam.pause') }}
        </van-button>
        <van-button
          size="small"
          type="danger"
          plain
          icon="cross"
          @click="handleExit"
        >
          {{ t('tools.examPrep.exam.exit') }}
        </van-button>
      </div>
    </div>

    <!-- 防作弊提醒 -->
    <div v-if="switchCount > 0" class="cheat-warning">
      <van-icon name="warning-o" color="#ff9500" />
      <span>{{ t('tools.examPrep.exam.switchWarning', { count: switchCount }) }}</span>
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
            <div class="question-number">
              {{ t('tools.examPrep.exam.questionNumber', { number: index + 1 }) }}
            </div>
            <div class="question-category">
              <van-tag :color="getCategoryColor(question.category)" size="small">
                {{ getCategoryName(question.category) }}
              </van-tag>
            </div>
          </div>
          <QuestionCard
            :ref="el => setQuestionCardRef(el, index)"
            :question="question"
            :show-analysis="false"
            @answered="handleAnswered"
            @collect-change="handleCollectChange"
          />
        </div>
      </van-swipe-item>
    </van-swipe>

    <!-- 底部导航栏 -->
    <div class="bottom-bar">
      <div class="nav-buttons">
        <van-button
          size="small"
          icon="arrow-left"
          :disabled="currentIndex === 0"
          @click="handlePrevQuestion"
        >
          {{ t('tools.examPrep.exam.prev') }}
        </van-button>
        <van-button
          size="small"
          icon="orders-o"
          @click="showAnswerSheet = true"
        >
          {{ t('tools.examPrep.exam.answerSheet') }}
        </van-button>
        <van-button
          size="small"
          icon="arrow"
          :disabled="currentIndex >= totalQuestions - 1"
          @click="handleNextQuestion"
        >
          {{ t('tools.examPrep.exam.next') }}
        </van-button>
      </div>
      <div class="submit-button">
        <van-button
          type="primary"
          size="large"
          block
          :disabled="answeredCount < totalQuestions"
          @click="handleSubmitExam"
        >
          {{ t('tools.examPrep.exam.submit') }}
        </van-button>
      </div>
    </div>

    <!-- 答题卡弹窗 -->
    <van-popup
      v-model:show="showAnswerSheet"
      position="bottom"
      :style="{ height: '80%' }"
      round
      closeable
      :close-on-popstate="true"
    >
      <div class="answer-sheet-popup">
        <div class="popup-header">
          <h3 class="popup-title">{{ t('tools.examPrep.answerSheet.title') }}</h3>
        </div>
        <div class="popup-body">
          <!-- 模块分组答题卡 -->
          <div class="module-groups">
            <div v-for="(module, moduleIndex) in moduleQuestionGroups" :key="moduleIndex" class="module-group">
              <div class="module-header">
                <van-tag :color="getCategoryColor(module.category)" size="medium">
                  {{ getCategoryName(module.category) }}
                </van-tag>
                <span class="module-count">
                  {{ module.startIndex + 1 }}-{{ module.endIndex }}
                </span>
              </div>
              <AnswerSheet
                :answers="answerStatusList.slice(module.startIndex, module.endIndex + 1)"
                :total="module.count"
                :current-index="currentIndex - module.startIndex"
                :column-count="10"
                @jump="handleModuleJump(module.startIndex + $event)"
              />
            </div>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 交卷确认弹窗 -->
    <van-dialog
      v-model:show="showSubmitDialog"
      :title="t('tools.examPrep.exam.submitTitle')"
      :message="submitMessage"
      :show-cancel-button="true"
      :confirm-button-text="t('tools.examPrep.exam.confirmSubmit')"
      :cancel-button-text="t('tools.examPrep.exam.cancel')"
      @confirm="handleConfirmSubmit"
      @cancel="showSubmitDialog = false"
    />

    <!-- 暂停遮罩 -->
    <div v-if="isPaused" class="pause-overlay" @click="handlePauseToggle">
      <div class="pause-content">
        <van-icon name="pause-circle-o" size="64" color="#667eea" />
        <div class="pause-text">{{ t('tools.examPrep.exam.paused') }}</div>
        <div class="pause-info">
          {{ t('tools.examPrep.exam.pauseInfo') }}
        </div>
        <van-button type="primary" size="large" @click.stop="handlePauseToggle">
          {{ t('tools.examPrep.exam.continue') }}
        </van-button>
      </div>
    </div>

    <!-- 时间警告弹窗 -->
    <van-dialog
      v-model:show="showTimeWarning"
      :title="t('tools.examPrep.exam.timeWarningTitle')"
      :message="t('tools.examPrep.exam.timeWarningMessage', { minutes: remainingMinutes })"
      :confirm-button-text="t('tools.examPrep.exam.understood')"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { showToast, showConfirmDialog } from 'vant';
import {
  Swipe as VanSwipe,
  SwipeItem as VanSwipeItem,
  Progress as VanProgress,
  Button as VanButton,
  Icon as VanIcon,
  Popup as VanPopup,
  Dialog as VanDialog,
  Tag as VanTag,
} from 'vant';
import QuestionCard from '../components/QuestionCard.vue';
import AnswerSheet from '../components/AnswerSheet.vue';
import { useDatabase } from '../hooks/useDatabase';
import { EXAM_DURATION, EXAM_QUESTION_COUNT, EXAM_TYPES, ANSWER_STATUS, MODULE_WEIGHTS } from '../utils/constants';
import { randomSelect, formatTime, calculateScore, generateId } from '../utils/helpers';

// ========================================
// Hooks 和全局实例
// ========================================
const { t } = useI18n();
const router = useRouter();
const db = useDatabase();

// ========================================
// 状态变量
// ========================================

// 题目列表
const questions = ref([]);

// 模块题目分组
const moduleQuestionGroups = ref([]);

// 当前题目索引
const currentIndex = ref(0);

// 答题状态列表 [{ questionId, status: 'unanswered' | 'answered', userAnswer }]
const answerStatusList = ref([]);

// 倒计时状态
const remainingSeconds = ref(EXAM_DURATION.MOCK * 60);
const isPaused = ref(false);
let timerInterval = null;

// 切屏计数
const switchCount = ref(0);

// 弹窗控制
const showAnswerSheet = ref(false);
const showSubmitDialog = ref(false);
const showTimeWarning = ref(false);

// 滑动组件引用
const swipeRef = ref(null);

// 题目卡片引用
const questionCardRefs = shallowRef({});

// 加载状态
const loading = ref(true);

// 分类信息
const categoryInfo = [
  { id: 'verbal', color: '#667eea' },
  { id: 'logic', color: '#764ba2' },
  { id: 'math', color: '#f093fb' },
  { id: 'data', color: '#4facfe' },
  { id: 'common', color: '#43e97b' },
];

// ========================================
// 计算属性
// ========================================

// 总题数
const totalQuestions = computed(() => EXAM_QUESTION_COUNT.MOCK);

// 剩余分钟数
const remainingMinutes = computed(() => Math.ceil(remainingSeconds.value / 60));

// 进度百分比
const progressPercentage = computed(() => {
  if (totalQuestions.value === 0) return 0;
  return Math.round((answeredCount.value / totalQuestions.value) * 100);
});

// 已答题数
const answeredCount = computed(() => {
  return answerStatusList.value.filter(
    item => item.status !== ANSWER_STATUS.UNANSWERED
  ).length;
});

// 未答题数
const unansweredCount = computed(() => {
  return totalQuestions.value - answeredCount.value;
});

// 交卷提示消息
const submitMessage = computed(() => {
  if (unansweredCount.value > 0) {
    return t('tools.examPrep.exam.submitMessageUnanswered', {
      answered: answeredCount.value,
      unanswered: unansweredCount.value
    });
  }
  return t('tools.examPrep.exam.submitMessageAll');
});

// ========================================
// 方法函数
// ========================================

/**
 * 组卷逻辑：从数据库按比例抽取各模块题目组成试卷
 */
const generateExamQuestions = async () => {
  const questionDistribution = {
    verbal: 40,
    logic: 41,
    math: 14,
    data: 20,
    common: 20,
  };

  const examQuestions = [];
  const moduleGroups = [];
  let startIndex = 0;

  for (const [category, count] of Object.entries(questionDistribution)) {
    const categoryQuestions = await db.getAllQuestions({ category });
    
    const selectedQuestions = categoryQuestions.length >= count 
      ? randomSelect(categoryQuestions, count)
      : categoryQuestions;

    examQuestions.push(...selectedQuestions);

    moduleGroups.push({
      category,
      startIndex,
      endIndex: startIndex + selectedQuestions.length - 1,
      count: selectedQuestions.length,
    });

    startIndex += selectedQuestions.length;
  }

  questions.value = examQuestions;
  moduleQuestionGroups.value = moduleGroups;

  answerStatusList.value = examQuestions.map(q => ({
    questionId: q.id,
    category: q.category,
    status: ANSWER_STATUS.UNANSWERED,
    userAnswer: null,
  }));

  loading.value = false;
};

/**
 * 获取分类名称
 */
const getCategoryName = (categoryId) => {
  return t(`tools.examPrep.categories.${categoryId}`) || categoryId;
};

/**
 * 获取分类颜色
 */
const getCategoryColor = (categoryId) => {
  const category = categoryInfo.find(cat => cat.id === categoryId);
  return category ? category.color : '#999';
};

/**
 * 设置题目卡片引用
 */
const setQuestionCardRef = (el, index) => {
  if (el) {
    questionCardRefs.value[index] = el;
  }
};

/**
 * 开始倒计时器
 */
const startTimer = () => {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    if (!isPaused.value && remainingSeconds.value > 0) {
      remainingSeconds.value--;
      
      // 时间警告提示
      if (remainingMinutes.value === 15 && remainingSeconds.value % 60 === 0) {
        showTimeWarning.value = true;
      }
      if (remainingMinutes.value === 5 && remainingSeconds.value % 60 === 0) {
        showTimeWarning.value = true;
      }
      
      // 时间到，自动交卷
      if (remainingSeconds.value === 0) {
        handleAutoSubmit();
      }
    }
  }, 1000);
};

/**
 * 停止倒计时器
 */
const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

/**
 * 暂停/继续考试
 */
const handlePauseToggle = () => {
  isPaused.value = !isPaused.value;
};

/**
 * 处理滑动变化
 */
const handleSwipeChange = (index) => {
  currentIndex.value = index;
};

/**
 * 处理答题事件
 */
const handleAnswered = ({ questionId, isCorrect, userAnswer }) => {
  const index = questions.value.findIndex(q => q.id === questionId);
  if (index !== -1) {
    answerStatusList.value[index].status = isCorrect ? ANSWER_STATUS.CORRECT : ANSWER_STATUS.WRONG;
    answerStatusList.value[index].userAnswer = userAnswer;
    answerStatusList.value[index].isCorrect = isCorrect;
  }
};

/**
 * 处理收藏变化
 */
const handleCollectChange = ({ questionId, isCollected }) => {
  // 考试模式下不保存收藏，只在本地记录
  console.log('收藏状态变化:', questionId, isCollected);
};

/**
 * 上一题
 */
const handlePrevQuestion = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    swipeRef.value?.prev();
  }
};

/**
 * 下一题
 */
const handleNextQuestion = () => {
  if (currentIndex.value < totalQuestions.value - 1) {
    currentIndex.value++;
    swipeRef.value?.next();
  }
};

/**
 * 模块内跳转
 */
const handleModuleJump = (index) => {
  currentIndex.value = index;
  swipeRef.value?.swipeTo(index);
  showAnswerSheet.value = false;
};

/**
 * 提交考试
 */
const handleSubmitExam = () => {
  showSubmitDialog.value = true;
};

/**
 * 确认提交
 */
const handleConfirmSubmit = async () => {
  showSubmitDialog.value = false;
  stopTimer();

  const examResult = calculateExamResult();
  const timeSpent = EXAM_DURATION.MOCK * 60 - remainingSeconds.value;

  try {
    const records = answerStatusList.value.map(item => ({
      questionId: item.questionId,
      category: item.category,
      isCorrect: item.isCorrect || false,
      userAnswer: item.userAnswer,
      timeSpent: Math.round(timeSpent / totalQuestions.value),
      source: EXAM_TYPES.MOCK,
    }));
    await db.addRecords(records);

    const examRecord = {
      type: EXAM_TYPES.MOCK,
      totalQuestions: totalQuestions.value,
      ...examResult,
      timeSpent,
      switchCount: switchCount.value,
      answers: answerStatusList.value,
    };

    const recordId = await db.addExamRecord(examRecord);
    
    router.push({
      name: 'ExamPrepExamResult',
      params: { recordId },
    });
  } catch (error) {
    console.error('保存考试记录失败:', error);
    showToast(t('tools.examPrep.exam.saveError'));
  }
};

/**
 * 自动交卷
 */
const handleAutoSubmit = () => {
  showToast(t('tools.examPrep.exam.timeUp'));
  handleConfirmSubmit();
};

/**
 * 计算考试结果
 */
const calculateExamResult = () => {
  const answers = answerStatusList.value;
  
  // 统计各模块答题情况
  const moduleStats = {};
  const moduleIds = ['verbal', 'logic', 'math', 'data', 'common'];
  
  moduleIds.forEach(moduleId => {
    const moduleAnswers = answers.filter(a => a.category === moduleId);
    const correct = moduleAnswers.filter(a => a.isCorrect).length;
    const total = moduleAnswers.length;
    
    moduleStats[moduleId] = {
      total,
      correct,
      wrong: total - correct,
      accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
    };
  });

  // 计算总分
  const score = calculateScore(moduleStats, MODULE_WEIGHTS);

  // 总体统计
  const totalCorrect = answers.filter(a => a.isCorrect).length;
  const totalAccuracy = Math.round((totalCorrect / totalQuestions.value) * 100);

  return {
    score,
    totalCorrect,
    totalWrong: totalQuestions.value - totalCorrect,
    totalAccuracy,
    moduleStats,
  };
};

/**
 * 退出考试
 */
const handleExit = async () => {
  if (answeredCount.value > 0) {
    try {
      await showConfirmDialog({
        title: t('tools.examPrep.exam.exitTitle'),
        message: t('tools.examPrep.exam.exitMessage'),
        confirmButtonText: t('tools.examPrep.exam.confirmExit'),
        cancelButtonText: t('tools.examPrep.exam.cancel'),
      });
      stopTimer();
      router.back();
    } catch {
      // 用户取消
    }
  } else {
    router.back();
  }
};

/**
 * 防作弊机制：监听页面可见性变化
 */
const setupAntiCheat = () => {
  document.addEventListener('visibilitychange', handleVisibilityChange);
};

/**
 * 处理页面可见性变化
 */
const handleVisibilityChange = () => {
  if (document.hidden && !isPaused.value) {
    switchCount.value++;
    showToast({
      message: t('tools.examPrep.exam.switchDetected'),
      icon: 'warning-o',
      duration: 3000,
    });
  }
};

/**
 * 清除防作弊监听
 */
const clearAntiCheat = () => {
  document.removeEventListener('visibilitychange', handleVisibilityChange);
};

// ========================================
// 生命周期钩子
// ========================================

onMounted(async () => {
  await generateExamQuestions();
  startTimer();
  setupAntiCheat();
});

onUnmounted(() => {
  stopTimer();
  clearAntiCheat();
});
</script>

<style lang="less" scoped>
.exam-page {
  display: flex;
  flex-direction: column;

  // 顶部状态栏
  .top-bar {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: var(--spacing-md);
    padding-top: calc(var(--spacing-md) + env(safe-area-inset-top));
    color: #fff;
    position: sticky;
    top: 0;
    z-index: 100;

    .exam-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-sm);

      .exam-title {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
      }

      .timer-section {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        padding: var(--spacing-xs) var(--spacing-md);
        background: rgba(255, 255, 255, 0.2);
        border-radius: var(--radius-lg);
        transition: all 0.3s ease;

        .timer-icon {
          font-size: 20px;
        }

        .timer-text {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          font-family: 'Courier New', monospace;
        }

        .timer-label {
          font-size: var(--font-size-xs);
        }

        &.warning {
          background: rgba(255, 150, 0, 0.3);
          .timer-text {
            color: #ff9500;
          }
        }

        &.danger {
          background: rgba(255, 59, 48, 0.3);
          animation: pulse 1s infinite;
          .timer-text {
            color: #ff3b30;
          }
        }
      }

      .progress-section {
        flex: 1;
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);

        .van-progress {
          flex: 1;
        }

        .progress-text {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          white-space: nowrap;
        }
      }
    }

    .top-actions {
      display: flex;
      gap: var(--spacing-xs);

      :deep(.van-button) {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.3);
        color: #fff;
        flex: 1;

        &:active {
          background: rgba(255, 255, 255, 0.3);
        }

        &.van-button--danger {
          background: rgba(255, 59, 48, 0.2);
          border-color: rgba(255, 59, 48, 0.3);
        }
      }
    }
  }

  // 防作弊提醒
  .cheat-warning {
    background: rgba(255, 150, 0, 0.1);
    border-bottom: 1px solid rgba(255, 150, 0, 0.3);
    padding: var(--spacing-sm) var(--spacing-md);
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-size: var(--font-size-sm);
    color: #ff9500;
  }

  // 题目滑动区域
  .question-swipe {
    flex: 1;
    overflow: hidden;

    .swipe-item-content {
      overflow-y: auto;
      padding: var(--spacing-md);

      &.no-scroll {
        overflow: hidden;
      }

      .question-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--spacing-md);

        .question-number {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-primary);
        }

        .question-category {
          :deep(.van-tag) {
            font-size: var(--font-size-xs);
          }
        }
      }
    }
  }

  // 底部导航栏
  .bottom-bar {
    background: var(--color-bg-secondary);
    border-top: 1px solid var(--color-border);
    padding: var(--spacing-sm) var(--spacing-md);
    padding-bottom: calc(var(--spacing-sm) + env(safe-area-inset-bottom));
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;

    .nav-buttons {
      display: flex;
      justify-content: space-between;
      gap: var(--spacing-xs);
      margin-bottom: var(--spacing-sm);

      :deep(.van-button) {
        flex: 1;
        font-size: var(--font-size-xs);
      }
    }

    .submit-button {
      :deep(.van-button) {
        font-size: var(--font-size-sm);
      }
    }
  }

  // 答题卡弹窗
  .answer-sheet-popup {
    .popup-header {
      padding: var(--spacing-md) var(--spacing-lg);
      border-bottom: 1px solid var(--color-border);

      .popup-title {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        color: var(--color-text-primary);
        margin-bottom: var(--spacing-xs);
      }

      .popup-stats {
        display: flex;
        gap: var(--spacing-md);
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
      }
    }

    .popup-body {
      padding: var(--spacing-md);
      padding-bottom: calc(var(--spacing-md) + env(safe-area-inset-bottom));
      height: calc(100% - 60px);
      overflow-y: auto;

      .module-groups {
        .module-group {
          margin-bottom: var(--spacing-md);

          .module-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: var(--spacing-sm);

            .module-count {
              font-size: var(--font-size-sm);
              color: var(--color-text-secondary);
            }
          }
        }
      }
    }
  }

  // 暂停遮罩
  .pause-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;

    .pause-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
      padding: var(--spacing-lg);

      .pause-text {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        margin: var(--spacing-md) 0;
      }

      .pause-info {
        font-size: var(--font-size-sm);
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: var(--spacing-md);
        text-align: center;
      }
    }
  }
}

// 时间警告动画
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

// 移动端响应式适配
@media screen and (max-width: 375px) {
  .exam-page {
    .top-bar {
      .exam-info {
        flex-wrap: wrap;

        .exam-title {
          font-size: var(--font-size-base);
        }

        .timer-section {
          order: -1;
          width: 100%;
          justify-content: center;
          margin-bottom: var(--spacing-xs);
        }

        .progress-section {
          width: 100%;
        }
      }

      .top-actions {
        :deep(.van-button) {
          font-size: var(--font-size-xs);
          padding: 0 var(--spacing-xs);
        }
      }
    }

    .bottom-bar {
      .nav-buttons {
        :deep(.van-button) {
          padding: var(--spacing-xs);
        }
      }
    }
  }
}
</style>