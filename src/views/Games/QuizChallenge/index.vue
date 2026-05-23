<template>
  <div class="quiz-challenge-game">
    <!-- 游戏主区域 -->
    <section class="game-main">
      <div v-if="!gameStarted">
        <!-- 游戏规则 -->
        <GameRules
          title-key="quizChallenge.rules.title"
          :rule-keys="[
            'quizChallenge.rules.rule1',
            'quizChallenge.rules.rule2',
            'quizChallenge.rules.rule3',
            'quizChallenge.rules.rule4',
          ]"
        />

        <!-- 游戏未开始 -->
        <StartScreen :categories="availableCategories" @start="handleStartGame" />
      </div>

      <!-- 游戏中 -->
      <div v-else-if="!gameEnded" class="game-playing-screen">
        <!-- 游戏信息栏 -->
        <GameInfoBar
          :user-points="userPoints"
          :current-question-index="currentQuestionIndex"
          :total-questions="totalQuestions"
        />

        <!-- 答题统计组件 -->
        <AnswerStats
          :correct-count="correctCount"
          :total-questions="totalQuestions"
          :current-index="currentQuestionIndex"
          :answered-questions="answeredQuestions"
          :questions="questions"
          @jump-to-question="handleJumpToQuestion"
        />

        <!-- 进度条 -->
        <div class="progress-section">
          <van-progress
            :percentage="progressPercentage"
            stroke-width="8"
            color="linear-gradient(to right, #1989fa, #07c160)"
          />
          <div class="progress-text">
            {{ t('quizChallenge.progress') }}: {{ displayQuestionIndex + 1 }} / {{ totalQuestions }}
          </div>
        </div>

        <!-- 题目卡片 -->
        <QuestionCard
          :question="currentQuestion"
          :selected-answer="selectedAnswer"
          :show-result="showResult"
          :is-last-question="isLastQuestion"
          :is-review-mode="isReviewMode"
          @select-answer="selectAnswer"
          @submit="submitAnswer"
          @next="nextQuestion"
          @back="handleBackToAnswer"
        />

        <!-- 连续答对提示 -->
        <StreakBadge
          v-if="consecutiveCorrect > 0 && showResult && !isReviewMode"
          :streak-count="consecutiveCorrect"
        />
      </div>

      <!-- 游戏结束 -->
      <GameEndScreen
        v-else
        :correct-count="correctCount"
        :total-questions="totalQuestions"
        :earned-points="earnedPoints"
        :max-streak="maxStreak"
        @reset="resetGame"
      />
    </section>
  </div>
</template>

<script setup>
  import { computed, onMounted, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { showToast, closeToast } from 'vant';
  import GameInfoBar from './components/GameInfoBar.vue';
  import GameRules from '../components/GameRules.vue';
  import StartScreen from './components/StartScreen.vue';
  import QuestionCard from './components/QuestionCard.vue';
  import GameEndScreen from './components/GameEndScreen.vue';
  import StreakBadge from './components/StreakBadge.vue';
  import AnswerStats from './components/AnswerStats.vue';
  import { useGameState } from './hooks/useGameState';
  import { useScoring } from './hooks/useScoring';
  import { useQuestions } from './hooks/useQuestions';
  import { useUserPoints } from './hooks/useUserPoints';

  // ========================================
  // i18n
  // ========================================
  const { t } = useI18n();

  // ========================================
  // 使用 hooks
  // ========================================

  // 游戏状态管理
  const {
    gameStarted,
    gameEnded,
    currentQuestionIndex,
    selectedAnswer,
    showResult,
    consecutiveCorrect,
    maxStreak,
    correctCount,
    earnedPoints,
    totalQuestions,
    progressPercentage,
    isLastQuestion,
    answeredQuestions,
    isReviewMode,
    previousQuestionIndex,
    nextQuestion,
    resetGame,
    selectAnswer,
    setTotalQuestions,
    recordAnswer,
    jumpToQuestion: jumpToQuestionAction,
    backToAnswer: backToAnswerAction,
  } = useGameState();

  // 积分管理
  const { handleCorrectAnswer, handleWrongAnswer } = useScoring(t);

  // 题目管理
  const {
    questions,
    getCurrentQuestion,
    shuffleQuestions: shuffleQuestionList,
    getAvailableCategories,
    prepareQuestions,
    initializeAllCategories,
  } = useQuestions();

  // 用户积分管理
  const { userPoints, loadUserPoints, addPoints } = useUserPoints();

  // ========================================
  // 计算属性
  // ========================================

  /**
   * 获取所有可用的分类
   */
  const availableCategories = computed(() => {
    return getAvailableCategories();
  });

  /**
   * 获取当前题目对象
   */
  const currentQuestion = computed(() => {
    return getCurrentQuestion(currentQuestionIndex.value);
  });

  /**
   * 显示的题目索引（回顾模式下显示之前的题目索引）
   */
  const displayQuestionIndex = computed(() => {
    return isReviewMode.value ? previousQuestionIndex.value : currentQuestionIndex.value;
  });

  // ========================================
  // 生命周期钩子
  // ========================================

  /**
   * 组件挂载时加载用户积分并初始化所有分类题目
   */
  onMounted(() => {
    loadUserPoints();
    // 页面进入时立即开始并发加载所有分类的题目
    initializeAllCategories();
  });

  // ========================================
  // 监听游戏结束状态
  // ========================================

  /**
   * 监听游戏结束，执行积分结算和提示
   */
  watch(gameEnded, newValue => {
    if (newValue && earnedPoints.value > 0) {
      // 将本局获得的积分添加到用户总积分
      addPoints(earnedPoints.value);

      // 显示总结提示
      showToast({
        message: t('quizChallenge.success', { points: earnedPoints.value }),
        type: 'success',
        duration: 2000,
      });
    }
  });

  // ========================================
  // 游戏核心逻辑
  // ========================================

  /**
   * 开始新游戏
   */
  const handleStartGame = async ({ categories, count }) => {
    try {
      // 显示加载提示
      showToast({
        message: t('common.loading'),
        type: 'loading',
        duration: 0,
        forbidClick: true,
      });

      // 重置游戏状态
      resetGame();

      // 设置题目总数
      setTotalQuestions(count);

      // 根据选择的分类和数量准备题目（异步操作）
      await prepareQuestions(categories, count);

      // 打乱题目顺序
      shuffleQuestionList();

      // 关闭加载提示
      closeToast();

      // 开始游戏
      gameStarted.value = true;
    } catch (error) {
      // 关闭加载提示
      closeToast();

      // 显示错误提示
      showToast({
        message: t('quizChallenge.loadError'),
        type: 'fail',
      });

      console.error('[答题挑战] 加载题目失败:', error);
    }
  };

  /**
   * 跳转到指定题目
   */
  const handleJumpToQuestion = index => {
    jumpToQuestionAction(index);
  };

  /**
   * 从回顾模式返回到之前的题目
   */
  const handleBackToAnswer = () => {
    backToAnswerAction();
  };

  /**
   * 提交当前答案
   * 验证答案、计算积分、更新状态
   */
  const submitAnswer = () => {
    // 必须选择一个答案才能提交
    if (selectedAnswer.value === null) return;

    // 显示答案结果
    showResult.value = true;

    // 判断答案是否正确
    const isCorrect = selectedAnswer.value === currentQuestion.value.correctAnswer;

    // 记录答题结果
    recordAnswer(currentQuestionIndex.value, isCorrect);

    if (isCorrect) {
      // 答对了
      handleCorrectAnswer({
        onCorrect: () => {
          // 更新答对计数
          correctCount.value++;
        },
        updateStreak: () => {
          // 更新连续答对次数
          consecutiveCorrect.value++;
          return consecutiveCorrect.value;
        },
        updateMaxStreak: newStreak => {
          // 更新最高连击记录
          if (newStreak > maxStreak.value) {
            maxStreak.value = newStreak;
          }
        },
        updateCorrectCount: () => {
          // 更新答对计数
          correctCount.value++;
        },
        updateEarnedPoints: points => {
          // 累加到总分
          earnedPoints.value += points;
        },
      });
    } else {
      // 答错了
      handleWrongAnswer(() => {
        // 中断连续答对
        consecutiveCorrect.value = 0;
      });
    }
  };
</script>

<style lang="less" scoped>
  @import '@/styles/game-animations.less';

  .quiz-challenge-game {
    /* ========================================
     游戏主区域
     ======================================== */
    .game-main {
      min-height: 400px;

      /* 游戏进行中 */
      .game-playing-screen {
        animation: gameSlideIn 0.4s ease-out;

        .progress-section {
          margin-bottom: var(--spacing-lg);

          .progress-text {
            text-align: center;
            font-size: var(--font-size-xs);
            color: var(--color-text-secondary);
            margin-top: var(--spacing-xs);
          }
        }
      }
    }
  }

  /* ========================================
   动画定义（已通过 @import 引入）
   ======================================== */
</style>
