import { ref, computed } from 'vue';

/**
 * 游戏状态管理 Hook
 * @returns {Object} 游戏状态相关方法和数据
 */
export function useGameState() {
  // 游戏状态
  const gameStarted = ref(false);
  const gameEnded = ref(false);
  const currentQuestionIndex = ref(0);
  const selectedAnswer = ref(null);
  const showResult = ref(false);
  const consecutiveCorrect = ref(0);
  const maxStreak = ref(0);
  const correctCount = ref(0);
  const earnedPoints = ref(0);

  // 总题目数量
  const totalQuestions = ref(5);

  // 已答题目列表（记录每道题的状态）
  const answeredQuestions = ref([]);

  // 每道题的用户选择记录（用于跳转时恢复）
  const questionAnswers = ref({});

  // 是否处于回顾模式（从历史导航跳转）
  const isReviewMode = ref(false);

  // 记录进入回顾模式前的题目索引（用于返回）
  const previousQuestionIndex = ref(0);

  // 计算属性
  const progressPercentage = computed(() => {
    // 回顾模式下使用之前的题目索引，否则使用当前题目索引
    const index = isReviewMode.value ? previousQuestionIndex.value : currentQuestionIndex.value;
    return (((index + 1) / totalQuestions.value) * 100).toFixed(2);
  });

  const isLastQuestion = computed(() => {
    return currentQuestionIndex.value === totalQuestions.value - 1;
  });

  /**
   * 开始新游戏
   * 重置所有状态并打乱题目顺序
   */
  const startGame = () => {
    // 重置游戏状态
    resetGame();

    // 打乱题目顺序
    if (typeof shuffleQuestions === 'function') {
      shuffleQuestions();
    }

    // 开始游戏
    gameStarted.value = true;
    console.log('[答题挑战] 游戏开始，题目已打乱');
  };

  /**
   * 设置题目总数（由外部调用）
   * @param {number} count - 题目数量
   */
  const setTotalQuestions = count => {
    totalQuestions.value = count;
    console.log(`[答题挑战] 设置题目总数为: ${count}`);
  };

  /**
   * 进入下一题或结束游戏
   */
  const nextQuestion = () => {
    if (isLastQuestion.value) {
      // 已经是最后一题，结束游戏
      endGame();
    } else {
      // 进入下一题
      currentQuestionIndex.value++;
      selectedAnswer.value = null;
      showResult.value = false;
    }
  };

  /**
   * 结束游戏
   */
  const endGame = () => {
    gameEnded.value = true;
    console.log('[答题挑战] 游戏结束，获得积分:', earnedPoints.value);
  };

  /**
   * 重置游戏到初始状态
   */
  const resetGame = () => {
    gameStarted.value = false;
    gameEnded.value = false;
    currentQuestionIndex.value = 0;
    selectedAnswer.value = null;
    showResult.value = false;
    consecutiveCorrect.value = 0;
    maxStreak.value = 0;
    correctCount.value = 0;
    earnedPoints.value = 0;
    answeredQuestions.value = [];
    questionAnswers.value = {};
    isReviewMode.value = false;
    previousQuestionIndex.value = 0;
  };

  /**
   * 用户选择一个答案选项
   *
   * @param {number} index - 选中的选项索引 (0-3)
   */
  const selectAnswer = index => {
    // 如果已显示结果，不允许再修改选择
    if (showResult.value) return;

    selectedAnswer.value = index;
    
    // 记录当前题目的选择
    questionAnswers.value[currentQuestionIndex.value] = index;
  };

  /**
   * 记录答题结果
   * @param {number} questionIndex - 题目索引
   * @param {boolean} isCorrect - 是否答对
   */
  const recordAnswer = (questionIndex, isCorrect) => {
    // 检查是否已经记录过该题目
    const existingIndex = answeredQuestions.value.findIndex(q => q.index === questionIndex);
    
    if (existingIndex !== -1) {
      // 更新已有记录
      answeredQuestions.value[existingIndex].status = isCorrect ? 'correct' : 'wrong';
    } else {
      // 添加新记录
      answeredQuestions.value.push({
        index: questionIndex,
        status: isCorrect ? 'correct' : 'wrong'
      });
    }
  };

  /**
   * 跳转到指定题目
   * @param {number} targetIndex - 目标题目索引
   */
  const jumpToQuestion = targetIndex => {
    // 验证索引范围
    if (targetIndex < 0 || targetIndex >= totalQuestions.value) {
      console.warn('[答题挑战] 无效的题目索引:', targetIndex);
      return;
    }

    // 保存当前题目的选择（如果有的话）
    if (selectedAnswer.value !== null && !answeredQuestions.value.find(q => q.index === currentQuestionIndex.value)) {
      questionAnswers.value[currentQuestionIndex.value] = selectedAnswer.value;
    }

    // 如果是从非回顾模式进入回顾模式，保存当前题目索引
    if (!isReviewMode.value) {
      previousQuestionIndex.value = currentQuestionIndex.value;
    }

    // 跳转到目标题目
    currentQuestionIndex.value = targetIndex;
    
    // 恢复该题目的选择状态
    const savedAnswer = questionAnswers.value[targetIndex];
    if (savedAnswer !== undefined) {
      selectedAnswer.value = savedAnswer;
    } else {
      selectedAnswer.value = null;
    }
    
    // 检查该题是否已作答
    const hasAnswered = answeredQuestions.value.find(q => q.index === targetIndex);
    if (hasAnswered) {
      // 已作答，显示结果
      showResult.value = true;
      // 设置为回顾模式
      isReviewMode.value = true;
    } else {
      // 未作答，隐藏结果
      showResult.value = false;
      // 退出回顾模式
      isReviewMode.value = false;
    }
    
    console.log('[答题挑战] 跳转到题目:', targetIndex + 1, '已作答:', !!hasAnswered);
  };

  /**
   * 从回顾模式返回到之前的题目
   */
  const backToAnswer = () => {
    // 退出回顾模式
    isReviewMode.value = false;
    
    // 返回到之前保存的题目索引
    const targetIndex = previousQuestionIndex.value;
    
    // 验证索引范围
    if (targetIndex < 0 || targetIndex >= totalQuestions.value) {
      console.warn('[答题挑战] 无效的题目索引:', targetIndex);
      return;
    }

    // 跳转到目标题目
    currentQuestionIndex.value = targetIndex;
    
    // 恢复该题目的选择状态
    const savedAnswer = questionAnswers.value[targetIndex];
    if (savedAnswer !== undefined) {
      selectedAnswer.value = savedAnswer;
    } else {
      selectedAnswer.value = null;
    }
    
    // 检查该题是否已作答
    const hasAnswered = answeredQuestions.value.find(q => q.index === targetIndex);
    if (hasAnswered) {
      // 已作答，显示结果
      showResult.value = true;
    } else {
      // 未作答，隐藏结果
      showResult.value = false;
    }
    
    console.log('[答题挑战] 返回答题，回到题目:', targetIndex + 1);
  };

  /**
   * 打乱题目顺序
   */
  const shuffleQuestions = () => {
    // 这个函数会在父组件中实现，这里只提供接口
  };

  return {
    // 状态
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
    answeredQuestions,
    isReviewMode,
    previousQuestionIndex,

    // 计算属性
    progressPercentage,
    isLastQuestion,

    // 方法
    nextQuestion,
    endGame,
    resetGame,
    selectAnswer,
    shuffleQuestions,
    setTotalQuestions,
    recordAnswer,
    jumpToQuestion,
    backToAnswer,
  };
}
