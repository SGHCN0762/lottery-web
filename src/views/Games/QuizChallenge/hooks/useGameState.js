import { ref, computed } from 'vue'

/**
 * 游戏状态管理 Hook
 * @returns {Object} 游戏状态相关方法和数据
 */
export function useGameState() {
  // 游戏状态
  const gameStarted = ref(false)
  const gameEnded = ref(false)
  const currentQuestionIndex = ref(0)
  const selectedAnswer = ref(null)
  const showResult = ref(false)
  const consecutiveCorrect = ref(0)
  const maxStreak = ref(0)
  const correctCount = ref(0)
  const earnedPoints = ref(0)

  // 总题目数量
  const totalQuestions = ref(5)

  // 计算属性
  const progressPercentage = computed(() => {
    return ((currentQuestionIndex.value + 1) / totalQuestions.value) * 100
  })

  const isLastQuestion = computed(() => {
    return currentQuestionIndex.value === totalQuestions.value - 1
  })

  /**
   * 开始新游戏
   * 重置所有状态并打乱题目顺序
   */
  const startGame = () => {
    // 重置游戏状态
    resetGame()

    // 打乱题目顺序
    if (typeof shuffleQuestions === 'function') {
      shuffleQuestions()
    }

    // 开始游戏
    gameStarted.value = true
    console.log('[答题挑战] 游戏开始，题目已打乱')
  }

  /**
   * 进入下一题或结束游戏
   */
  const nextQuestion = () => {
    if (isLastQuestion.value) {
      // 已经是最后一题，结束游戏
      endGame()
    } else {
      // 进入下一题
      currentQuestionIndex.value++
      selectedAnswer.value = null
      showResult.value = false
    }
  }

  /**
   * 结束游戏
   */
  const endGame = () => {
    gameEnded.value = true
    console.log('[答题挑战] 游戏结束，获得积分:', earnedPoints.value)
  }

  /**
   * 重置游戏到初始状态
   */
  const resetGame = () => {
    gameStarted.value = false
    gameEnded.value = false
    currentQuestionIndex.value = 0
    selectedAnswer.value = null
    showResult.value = false
    consecutiveCorrect.value = 0
    maxStreak.value = 0
    correctCount.value = 0
    earnedPoints.value = 0
  }

  /**
   * 用户选择一个答案选项
   *
   * @param {number} index - 选中的选项索引 (0-3)
   */
  const selectAnswer = (index) => {
    // 如果已显示结果，不允许再修改选择
    if (showResult.value) return

    selectedAnswer.value = index
  }
  
  /**
   * 打乱题目顺序
   */
  const shuffleQuestions = () => {
    // 这个函数会在父组件中实现，这里只提供接口
  }

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

    // 计算属性
    progressPercentage,
    isLastQuestion,

    // 方法
    nextQuestion,
    endGame,
    resetGame,
    selectAnswer,
    shuffleQuestions
  }
}
