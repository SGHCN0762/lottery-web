<template>
  <div class="number-guess-game">
    <!-- 游戏信息栏 -->
    <section class="game-info-bar">
      <div class="info-item">
        <span class="info-label">{{ t('numberGuess.remainingAttempts') }}</span>
        <span class="info-value">{{ remainingAttempts }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">{{ t('numberGuess.myPoints') }}</span>
        <span class="info-value">{{ userPoints }}</span>
      </div>
    </section>

    <!-- 游戏规则 -->
    <section class="game-rules">
      <h3 class="rules-title">📋 {{ t('numberGuess.rules.title') }}</h3>
      <ul class="rules-list">
        <li>{{ t('numberGuess.rules.rule1') }}</li>
        <li>{{ t('numberGuess.rules.rule2') }}</li>
        <li>{{ t('numberGuess.rules.rule3') }}</li>
        <li>{{ t('numberGuess.rules.rule4') }}</li>
      </ul>
    </section>

    <!-- 游戏主区域 -->
    <section class="game-main">
      <!-- 游戏未开始 -->
      <div v-if="!gameStarted" class="game-start-screen">
        <div class="start-icon">🎯</div>
        <h2 class="start-title">{{ t('numberGuess.title') }}</h2>
        <p class="start-desc">{{ t('numberGuess.startDesc') }}</p>
        <van-button type="primary" size="large" @click="startGame" class="start-btn">
          {{ t('numberGuess.startGame') }}
        </van-button>
      </div>

      <!-- 游戏中 -->
      <div v-else-if="!gameEnded" class="game-playing-screen">
        <div class="guess-input-section">
          <label class="input-label">{{ t('numberGuess.inputLabel') }}</label>
          <van-field
            v-model="currentGuess"
            type="number"
            :placeholder="t('numberGuess.inputPlaceholder')"
            :disabled="isProcessing"
            class="guess-input"
            @keyup.enter="submitGuess"
          />
          <van-button
            type="primary"
            block
            @click="submitGuess"
            :disabled="!isValidGuess || isProcessing"
            class="submit-btn"
          >
            {{ isProcessing ? t('numberGuess.processing') : t('numberGuess.submitGuess') }}
          </van-button>
        </div>

        <!-- 猜测历史 -->
        <div v-if="guessHistory.length > 0" class="guess-history">
          <h4 class="history-title">{{ t('numberGuess.history.title') }}</h4>
          <div class="history-list">
            <div
              v-for="(record, index) in guessHistory"
              :key="index"
              class="history-item"
              :class="record.status"
            >
              <span class="history-number">{{ record.guess }}</span>
              <span class="history-hint">{{ record.hint }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 游戏结束 -->
      <div v-else class="game-end-screen">
        <div class="end-icon" :class="winStatus">
          {{ winStatus === 'win' ? '🎉' : '😢' }}
        </div>
        <h2 class="end-title">{{ winMessage }}</h2>
        <p v-if="winStatus === 'win'" class="end-reward">{{ t('numberGuess.reward', { points: rewardPoints }) }}</p>
        <p v-else class="end-answer">{{ t('numberGuess.correctAnswer', { number: targetNumber }) }}</p>
        <van-button type="primary" size="large" @click="resetGame" class="restart-btn">
          {{ t('numberGuess.playAgain') }}
        </van-button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { showToast } from 'vant'

// ========================================
// i18n
// ========================================
const { t } = useI18n()

// ========================================
// 响应式数据定义
// ========================================

/** 用户当前积分 */
const userPoints = ref(0)

/** 系统生成的目标数字 (1-100) */
const targetNumber = ref(0)

/** 用户当前输入的数字 */
const currentGuess = ref('')

/** 剩余猜测次数 */
const remainingAttempts = ref(7)

/** 游戏是否已开始 */
const gameStarted = ref(false)

/** 游戏是否已结束 */
const gameEnded = ref(false)

/** 是否正在处理提交（防止重复点击） */
const isProcessing = ref(false)

/** 猜测历史记录数组 */
const guessHistory = ref([])

/** 游戏结果状态: 'win' | 'lose' | '' */
const winStatus = ref('')

/** 本次游戏获得的积分奖励 */
const rewardPoints = ref(0)

// ========================================
// 计算属性
// ========================================

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

// ========================================
// 生命周期钩子
// ========================================

/**
 * 组件挂载时加载用户积分
 */
onMounted(() => {
  loadUserPoints()
})

// ========================================
// 工具函数 - 数据持久化
// ========================================

/**
 * 从localStorage加载用户积分
 */
const loadUserPoints = () => {
  try {
    const saved = localStorage.getItem('lottery_user_points')
    if (saved) {
      userPoints.value = parseInt(saved) || 0
    }
  } catch (error) {
    console.error('加载积分失败:', error)
    userPoints.value = 0
  }
}

/**
 * 保存用户积分到localStorage
 */
const saveUserPoints = () => {
  try {
    localStorage.setItem('lottery_user_points', userPoints.value.toString())
  } catch (error) {
    console.error('保存积分失败:', error)
  }
}

/**
 * 生成1-100的随机整数
 * @returns {number} 随机数字
 */
const generateRandomNumber = () => {
  return Math.floor(Math.random() * 100) + 1
}

// ========================================
// 游戏核心逻辑
// ========================================

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
 * 提交用户的猜测
 * 验证输入、比较结果、更新游戏状态
 */
const submitGuess = async () => {
  // 验证输入和处理状态
  if (!isValidGuess.value || isProcessing.value) return

  isProcessing.value = true
  const guess = parseInt(currentGuess.value)

  let hint = ''
  let status = ''

  // 判断猜测结果
  if (guess === targetNumber.value) {
    // 猜对了
    hint = '🎉 正确！'
    status = 'correct'
    handleWin()
  } else if (remainingAttempts.value <= 1) {
    // 最后一次机会且猜错了
    hint = guess > targetNumber.value ? '❌ 太大了' : '❌ 太小了'
    status = 'wrong'
    handleLose()
  } else {
    // 还没猜对，但还有机会
    hint = guess > targetNumber.value ? '⬇️ 太大了' : '⬆️ 太小了'
    status = 'hint'
    remainingAttempts.value--
  }

  // 添加到历史记录（最新的在前面）
  guessHistory.value.unshift({
    guess,
    hint,
    status
  })

  // 清空输入框
  currentGuess.value = ''
  
  // 延迟重置处理状态，提供更好的用户体验
  setTimeout(() => {
    isProcessing.value = false
  }, 500)
}

/**
 * 处理胜利情况
 * 根据尝试次数计算奖励并发放积分
 */
const handleWin = () => {
  gameEnded.value = true
  winStatus.value = 'win'

  // 计算已使用的尝试次数
  const attemptsUsed = 7 - remainingAttempts.value + 1
  
  // 根据尝试次数确定奖励
  if (attemptsUsed <= 2) {
    rewardPoints.value = 50  // 前2次猜中
  } else if (attemptsUsed <= 4) {
    rewardPoints.value = 30  // 第3-4次猜中
  } else {
    rewardPoints.value = 10  // 第5-7次猜中
  }

  // 更新用户总积分
  userPoints.value += rewardPoints.value
  saveUserPoints()

  // 显示成功提示
  showToast({
    message: t('numberGuess.successToast', { points: rewardPoints.value }),
    type: 'success',
    duration: 2000
  })
}

/**
 * 处理失败情况
 * 游戏结束，机会用完
 */
const handleLose = () => {
  gameEnded.value = true
  winStatus.value = 'lose'
  remainingAttempts.value = 0

  showToast({
    message: t('numberGuess.failToast'),
    type: 'fail',
    duration: 2000
  })
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
</script>

<style lang="less" scoped>
.number-guess-game {
  /* ========================================
     游戏信息栏
     ======================================== */
  .game-info-bar {
    display: flex;
    justify-content: space-around;
    background: var(--color-bg-secondary);
    padding: var(--spacing-md);
    border-radius: var(--radius-lg);
    margin-bottom: var(--spacing-lg);
    box-shadow: var(--shadow-sm);

    .info-item {
      text-align: center;

      .info-label {
        display: block;
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-xs);
      }

      .info-value {
        display: block;
        font-size: var(--font-size-xl);
        color: var(--color-primary);
        font-weight: var(--font-weight-bold);
      }
    }
  }

  /* ========================================
     游戏规则
     ======================================== */
  .game-rules {
    background: var(--color-bg-secondary);
    padding: var(--spacing-md);
    border-radius: var(--radius-lg);
    margin-bottom: var(--spacing-lg);
    border-left: 4px solid var(--color-primary);

    .rules-title {
      font-size: var(--font-size-base);
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-sm);
      font-weight: var(--font-weight-semibold);
    }

    .rules-list {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        line-height: var(--line-height-relaxed);
        padding-left: var(--spacing-md);
        position: relative;
        margin-bottom: var(--spacing-xs);

        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--color-primary);
          font-weight: bold;
        }
      }
    }
  }

  /* ========================================
     游戏主区域
     ======================================== */
  .game-main {
    min-height: 400px;

    /* 开始界面 */
    .game-start-screen {
      text-align: center;
      padding: var(--spacing-3xl) var(--spacing-lg);
      animation: fadeIn 0.5s ease-in;

      .start-icon {
        font-size: 4rem;
        margin-bottom: var(--spacing-lg);
        animation: bounceIn 0.6s ease-out;
      }

      .start-title {
        font-size: var(--font-size-2xl);
        color: var(--color-text-primary);
        margin-bottom: var(--spacing-sm);
        font-weight: var(--font-weight-bold);
      }

      .start-desc {
        font-size: var(--font-size-base);
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-2xl);
      }

      .start-btn {
        max-width: 200px;
        margin: 0 auto;
      }
    }

    /* 游戏进行中 */
    .game-playing-screen {
      animation: slideIn 0.4s ease-out;

      .guess-input-section {
        margin-bottom: var(--spacing-xl);

        .input-label {
          display: block;
          font-size: var(--font-size-sm);
          color: var(--color-text-primary);
          margin-bottom: var(--spacing-sm);
          font-weight: var(--font-weight-medium);
        }

        .guess-input {
          margin-bottom: var(--spacing-md);
        }

        .submit-btn {
          margin-top: var(--spacing-md);
        }
      }

      .guess-history {
        .history-title {
          font-size: var(--font-size-base);
          color: var(--color-text-primary);
          margin-bottom: var(--spacing-md);
          font-weight: var(--font-weight-semibold);
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);

          .history-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--spacing-md);
            background: var(--color-bg-tertiary);
            border-radius: var(--radius-md);
            animation: slideIn 0.3s ease-out;

            .history-number {
              font-size: var(--font-size-lg);
              font-weight: var(--font-weight-bold);
              color: var(--color-text-primary);
            }

            .history-hint {
              font-size: var(--font-size-sm);
              font-weight: var(--font-weight-medium);
            }

            &.correct {
              background: rgba(82, 196, 26, 0.1);
              border: 1px solid var(--color-success);

              .history-hint {
                color: var(--color-success);
              }
            }

            &.wrong {
              background: rgba(255, 77, 79, 0.1);
              border: 1px solid var(--color-danger);

              .history-hint {
                color: var(--color-danger);
              }
            }

            &.hint {
              background: rgba(24, 144, 255, 0.1);
              border: 1px solid var(--color-primary);

              .history-hint {
                color: var(--color-primary);
              }
            }
          }
        }
      }
    }

    /* 游戏结束界面 */
    .game-end-screen {
      text-align: center;
      padding: var(--spacing-3xl) var(--spacing-lg);
      animation: fadeIn 0.5s ease-in;

      .end-icon {
        font-size: 4rem;
        margin-bottom: var(--spacing-lg);
        animation: bounceIn 0.6s ease-out;

        &.win {
          animation: celebrate 0.8s ease-out;
        }
      }

      .end-title {
        font-size: var(--font-size-2xl);
        color: var(--color-text-primary);
        margin-bottom: var(--spacing-md);
        font-weight: var(--font-weight-bold);
      }

      .end-reward {
        font-size: var(--font-size-xl);
        color: var(--color-success);
        margin-bottom: var(--spacing-2xl);
        font-weight: var(--font-weight-bold);
      }

      .end-answer {
        font-size: var(--font-size-lg);
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-2xl);
      }

      .restart-btn {
        max-width: 200px;
        margin: 0 auto;
      }
    }
  }
}

/* ========================================
   动画定义
   ======================================== */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes celebrate {
  0%, 100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.2) rotate(-10deg);
  }
  50% {
    transform: scale(1.2) rotate(10deg);
  }
  75% {
    transform: scale(1.2) rotate(-10deg);
  }
}
</style>
