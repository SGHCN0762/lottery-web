<template>
  <div class="quiz-challenge-game">
    <!-- 游戏信息栏 -->
    <section class="game-info-bar">
      <div class="info-item">
        <span class="info-label">{{ t('quizChallenge.myPoints') }}</span>
        <span class="info-value">{{ userPoints }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">{{ t('quizChallenge.currentQuestion') }}</span>
        <span class="info-value">{{ currentQuestionIndex + 1 }}/{{ totalQuestions }}</span>
      </div>
    </section>

    <!-- 游戏规则 -->
    <section class="game-rules">
      <h3 class="rules-title">📋 {{ t('quizChallenge.rules.title') }}</h3>
      <ul class="rules-list">
        <li>{{ t('quizChallenge.rules.rule1') }}</li>
        <li>{{ t('quizChallenge.rules.rule2') }}</li>
        <li>{{ t('quizChallenge.rules.rule3') }}</li>
        <li>{{ t('quizChallenge.rules.rule4') }}</li>
      </ul>
    </section>

    <!-- 游戏主区域 -->
    <section class="game-main">
      <!-- 游戏未开始 -->
      <div v-if="!gameStarted" class="game-start-screen">
        <div class="start-icon">📝</div>
        <h2 class="start-title">{{ t('quizChallenge.title') }}</h2>
        <p class="start-desc">{{ t('quizChallenge.startDesc') }}</p>
        <van-button type="primary" size="large" @click="startGame" class="start-btn">
          {{ t('quizChallenge.start') }}
        </van-button>
      </div>

      <!-- 游戏中 -->
      <div v-else-if="!gameEnded" class="game-playing-screen">
        <!-- 进度条 -->
        <div class="progress-section">
          <van-progress
            :percentage="progressPercentage"
            stroke-width="8"
            color="linear-gradient(to right, #1989fa, #07c160)"
          />
          <div class="progress-text">{{ t('quizChallenge.progress') }}: {{ currentQuestionIndex + 1 }} / {{ totalQuestions }}</div>
        </div>

        <!-- 题目卡片 -->
        <div class="question-card">
          <h3 class="question-title">{{ currentQuestion.title }}</h3>
          
          <!-- 选项列表 -->
          <div class="options-list">
            <div
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              class="option-item"
              :class="{
                'selected': selectedAnswer === index,
                'correct': showResult && index === currentQuestion.correctAnswer,
                'wrong': showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer,
                'disabled': showResult
              }"
              @click="selectAnswer(index)"
            >
              <span class="option-label">{{ ['A', 'B', 'C', 'D'][index] }}</span>
              <span class="option-text">{{ option }}</span>
              <span v-if="showResult && index === currentQuestion.correctAnswer" class="option-icon">✓</span>
              <span v-if="showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer" class="option-icon wrong">✗</span>
            </div>
          </div>

          <!-- 提交按钮 -->
          <van-button
            v-if="!showResult"
            type="primary"
            block
            @click="submitAnswer"
            :disabled="selectedAnswer === null"
            class="submit-btn"
          >
            {{ t('quizChallenge.submitAnswer') }}
          </van-button>

          <van-button
            v-else
            type="success"
            block
            @click="nextQuestion"
            class="next-btn"
          >
            {{ isLastQuestion ? t('quizChallenge.viewResult') : t('quizChallenge.nextQuestion') }}
          </van-button>
        </div>

        <!-- 连续答对提示 -->
        <div v-if="consecutiveCorrect > 0 && showResult" class="streak-badge">
          🔥 {{ t('quizChallenge.streak', { count: consecutiveCorrect }) }}
        </div>
      </div>

      <!-- 游戏结束 -->
      <div v-else class="game-end-screen">
        <div class="end-icon">🏆</div>
        <h2 class="end-title">{{ t('quizChallenge.completed') }}</h2>
        
        <div class="result-stats">
          <div class="stat-item">
            <span class="stat-label">{{ t('quizChallenge.correctCount') }}</span>
            <span class="stat-value">{{ correctCount }}/{{ totalQuestions }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">{{ t('quizChallenge.earnedPoints') }}</span>
            <span class="stat-value reward">{{ earnedPoints }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">{{ t('quizChallenge.maxStreak') }}</span>
            <span class="stat-value streak">{{ maxStreak }}</span>
          </div>
        </div>

        <van-button type="primary" size="large" @click="resetGame" class="restart-btn">
          {{ t('quizChallenge.tryAgain') }}
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

/** 游戏是否已开始 */
const gameStarted = ref(false)

/** 游戏是否已结束 */
const gameEnded = ref(false)

/** 当前题目的索引 (0-4) */
const currentQuestionIndex = ref(0)

/** 总题目数量 */
const totalQuestions = ref(5)

/** 用户当前选中的答案索引 (null表示未选择) */
const selectedAnswer = ref(null)

/** 是否显示答案结果（正确/错误） */
const showResult = ref(false)

/** 当前连续答对次数 */
const consecutiveCorrect = ref(0)

/** 历史最高连续答对次数 */
const maxStreak = ref(0)

/** 累计答对的题目数量 */
const correctCount = ref(0)

/** 本局游戏获得的总积分 */
const earnedPoints = ref(0)

/**
 * 题目数据库
 * 包含5道技术类选择题，每题有4个选项和1个正确答案索引
 */
const questions = ref([
  {
    id: 1,
    title: 'Vue 3 中用于定义响应式数据的组合式 API 是？',
    options: ['data()', 'ref()', 'useState()', 'setState()'],
    correctAnswer: 1  // B选项
  },
  {
    id: 2,
    title: 'CSS 中哪个属性用于设置元素的透明度？',
    options: ['visibility', 'display', 'opacity', 'filter'],
    correctAnswer: 2  // C选项
  },
  {
    id: 3,
    title: 'JavaScript 中，以下哪个方法可以将对象转换为 JSON 字符串？',
    options: ['JSON.parse()', 'JSON.stringify()', 'Object.toString()', 'String.toJSON()'],
    correctAnswer: 1  // B选项
  },
  {
    id: 4,
    title: 'HTTP 状态码 404 表示什么含义？',
    options: ['服务器错误', '请求成功', '资源未找到', '禁止访问'],
    correctAnswer: 2  // C选项
  },
  {
    id: 5,
    title: '在 Git 中，哪个命令用于将更改提交到本地仓库？',
    options: ['git push', 'git commit', 'git add', 'git merge'],
    correctAnswer: 1  // B选项
  }
])

// ========================================
// 计算属性
// ========================================

/**
 * 获取当前题目对象
 * @returns {Object} 当前题目数据
 */
const currentQuestion = computed(() => {
  return questions.value[currentQuestionIndex.value]
})

/**
 * 计算答题进度百分比
 * @returns {number} 进度百分比 (0-100)
 */
const progressPercentage = computed(() => {
  return ((currentQuestionIndex.value + 1) / totalQuestions.value) * 100
})

/**
 * 判断是否是最后一题
 * @returns {boolean} 是否为最后一题
 */
const isLastQuestion = computed(() => {
  return currentQuestionIndex.value === totalQuestions.value - 1
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
 * 根据连续答对次数计算额外奖励积分
 * 
 * 奖励规则：
 * - 连续2题：+5分
 * - 连续3题：+10分
 * - 连续4题：+15分
 * - 连续5题：+25分
 * 
 * @param {number} streak - 连续答对次数
 * @returns {number} 额外奖励积分
 */
const calculateStreakBonus = (streak) => {
  if (streak === 2) return 5
  if (streak === 3) return 10
  if (streak === 4) return 15
  if (streak >= 5) return 25
  return 0
}

// ========================================
// 游戏核心逻辑
// ========================================

/**
 * 开始新游戏
 * 重置所有状态并打乱题目顺序
 */
const startGame = () => {
  gameStarted.value = true
  gameEnded.value = false
  currentQuestionIndex.value = 0
  selectedAnswer.value = null
  showResult.value = false
  consecutiveCorrect.value = 0
  maxStreak.value = 0
  correctCount.value = 0
  earnedPoints.value = 0
  
  // 随机打乱题目顺序，增加游戏趣味性
  questions.value.sort(() => Math.random() - 0.5)
  
  console.log('[答题挑战] 游戏开始，题目已打乱')
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
 * 提交当前答案
 * 验证答案、计算积分、更新状态
 */
const submitAnswer = () => {
  // 必须选择一个答案才能提交
  if (selectedAnswer.value === null) return
  
  // 显示答案结果
  showResult.value = true
  
  // 判断答案是否正确
  const isCorrect = selectedAnswer.value === currentQuestion.value.correctAnswer
  
  if (isCorrect) {
    // 答对了
    handleCorrectAnswer()
  } else {
    // 答错了
    handleWrongAnswer()
  }
}

/**
 * 处理答对的情况
 * 更新计数、计算奖励、显示提示
 */
const handleCorrectAnswer = () => {
  // 更新答对计数
  correctCount.value++
  consecutiveCorrect.value++
  
  // 更新最高连击记录
  if (consecutiveCorrect.value > maxStreak.value) {
    maxStreak.value = consecutiveCorrect.value
  }
  
  // 计算本題得分
  let points = 5  // 基础分
  
  // 计算连续答对额外奖励
  const bonus = calculateStreakBonus(consecutiveCorrect.value)
  if (bonus > 0) {
    points += bonus
    showToast({
      message: t('quizChallenge.bonus', { count: consecutiveCorrect.value, bonus }),
      type: 'success',
      duration: 2000
    })
  }
  
  // 累加到总分
  earnedPoints.value += points
}

/**
 * 处理答错的情况
 * 重置连续计数、显示提示
 */
const handleWrongAnswer = () => {
  // 中断连续答对
  consecutiveCorrect.value = 0
  
  showToast({
    message: t('quizChallenge.wrongAnswer'),
    type: 'fail',
    duration: 1500
  })
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
 * 结算积分、更新用户总积分、显示结果
 */
const endGame = () => {
  gameEnded.value = true
  
  // 将本局获得的积分添加到用户总积分
  userPoints.value += earnedPoints.value
  saveUserPoints()
  
  // 显示总结提示
  showToast({
    message: t('quizChallenge.success', { points: earnedPoints.value }),
    type: 'success',
    duration: 2000
  })
  
  console.log('[答题挑战] 游戏结束，获得积分:', earnedPoints.value)
}

/**
 * 重置游戏到初始状态
 * 用户可以重新开始挑战
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
</script>

<style lang="less" scoped>
.quiz-challenge-game {
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

      .progress-section {
        margin-bottom: var(--spacing-lg);

        .progress-text {
          text-align: center;
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
          margin-top: var(--spacing-xs);
        }
      }

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

      .streak-badge {
        text-align: center;
        padding: var(--spacing-md);
        background: linear-gradient(135deg, #ff6b6b 0%, #ffa502 100%);
        color: #fff;
        border-radius: var(--radius-md);
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-bold);
        animation: pulse 1s ease-in-out infinite;
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
      }

      .end-title {
        font-size: var(--font-size-2xl);
        color: var(--color-text-primary);
        margin-bottom: var(--spacing-2xl);
        font-weight: var(--font-weight-bold);
      }

      .result-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-2xl);

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
          padding: var(--spacing-md);
          background: var(--color-bg-secondary);
          border-radius: var(--radius-md);

          .stat-label {
            font-size: var(--font-size-xs);
            color: var(--color-text-secondary);
          }

          .stat-value {
            font-size: var(--font-size-xl);
            color: var(--color-text-primary);
            font-weight: var(--font-weight-bold);

            &.reward {
              color: var(--color-success);
            }

            &.streak {
              color: var(--color-warning);
            }
          }
        }
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

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
</style>
