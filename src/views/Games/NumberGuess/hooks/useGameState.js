/**
 * 游戏状态管理hook
 * 处理游戏的各种状态和逻辑
 */
import { ref, computed } from 'vue'
import { showToast } from 'vant'
import { useI18n } from 'vue-i18n'

export function useGameState() {
  const { t } = useI18n()

  // 游戏状态
  const targetNumber = ref(0)
  const currentGuess = ref('')
  const remainingAttempts = ref(7)
  const gameStarted = ref(false)
  const gameEnded = ref(false)
  const isProcessing = ref(false)
  const guessHistory = ref([])
  const winStatus = ref('')
  const rewardPoints = ref(0)

  /**
   * 验证当前输入是否为有效数字 (1-100)
   * @returns {boolean} 输入是否有效
   */
  const isValidGuess = computed(() => {
    const num = parseInt(currentGuess.value)
    return !isNaN(num) && num >= 1 && num <= 100
  })

  /**
   * 根据游戏结果返回提示信息
   * @returns {string} 提示文本
   */
  const winMessage = computed(() => {
    if (winStatus.value === 'win') {
      return t('numberGuess.winMessage')
    }
    return t('numberGuess.loseMessage')
  })

  /**
   * 生成1-100的随机整数
   * @returns {number} 随机数字
   */
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 100) + 1
  }

  /**
   * 开始新游戏
   * 重置所有游戏状态并生成新的目标数字
   */
  const startGame = () => {
    targetNumber.value = generateRandomNumber()
    remainingAttempts.value = 7
    guessHistory.value = []
    gameStarted.value = true
    gameEnded.value = false
    currentGuess.value = ''
    winStatus.value = ''
    rewardPoints.value = 0

    console.log('[数字猜猜猜] 游戏开始，目标数字:', targetNumber.value) // 调试信息
  }

  /**
   * 重置游戏到初始状态
   * 用户可以重新开始新的一局
   */
  const resetGame = () => {
    gameStarted.value = false
    gameEnded.value = false
    currentGuess.value = ''
    guessHistory.value = []
    remainingAttempts.value = 7
    winStatus.value = ''
    rewardPoints.value = 0
    isProcessing.value = false
  }

  return {
    // 状态
    targetNumber,
    currentGuess,
    remainingAttempts,
    gameStarted,
    gameEnded,
    isProcessing,
    guessHistory,
    winStatus,
    rewardPoints,

    // 计算属性
    isValidGuess,
    winMessage,

    // 方法
    generateRandomNumber,
    startGame,
    resetGame
  }
}
