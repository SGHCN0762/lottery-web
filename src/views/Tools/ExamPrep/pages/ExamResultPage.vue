<template>
  <div class="exam-result-page">
    <!-- 结果头部 -->
    <div class="result-header">
      <div class="score-section" :class="scoreLevel">
        <div class="score-circle">
          <div class="score-value">{{ examResult?.score || 0 }}</div>
          <div class="score-label">{{ t('tools.examPrep.result.score') }}</div>
        </div>
        <div class="score-badge">
          <van-icon :name="scoreIcon" :color="scoreColor" size="32" />
          <span class="badge-text">{{ scoreText }}</span>
        </div>
      </div>

      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-value">{{ examResult?.totalCorrect || 0 }}</div>
          <div class="stat-label">{{ t('tools.examPrep.result.correct') }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-value wrong">{{ examResult?.totalWrong || 0 }}</div>
          <div class="stat-label">{{ t('tools.examPrep.result.wrong') }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ examResult?.totalAccuracy || 0 }}%</div>
          <div class="stat-label">{{ t('tools.examPrep.result.accuracy') }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ formatTime(examResult?.timeSpent || 0) }}</div>
          <div class="stat-label">{{ t('tools.examPrep.result.timeSpent') }}</div>
        </div>
      </div>
    </div>

    <!-- 模块得分雷达图 -->
    <div class="chart-section">
      <div class="section-header">
        <h3 class="section-title">{{ t('tools.examPrep.result.moduleAnalysis') }}</h3>
      </div>
      <div class="chart-container">
        <canvas ref="radarChartRef" class="radar-chart"></canvas>
      </div>
    </div>

    <!-- 各模块详情 -->
    <div class="module-details">
      <div class="section-header">
        <h3 class="section-title">{{ t('tools.examPrep.result.moduleDetails') }}</h3>
      </div>
      <div class="module-list">
        <div v-for="(module, moduleId) in examResult?.moduleStats" :key="moduleId" class="module-item">
          <div class="module-header">
            <van-tag :color="getCategoryColor(moduleId)" size="medium">
              {{ getCategoryName(moduleId) }}
            </van-tag>
            <div class="module-accuracy">
              <span class="accuracy-value">{{ module.accuracy }}%</span>
            </div>
          </div>
          <div class="module-stats">
            <van-progress
              :percentage="module.accuracy"
              :stroke-width="8"
              :color="getCategoryColor(moduleId)"
              track-color="#f0f0f0"
              :show-pivot="false"
            />
            <div class="module-detail-row">
              <span>{{ t('tools.examPrep.result.correct') }}: {{ module.correct }}</span>
              <span>{{ t('tools.examPrep.result.wrong') }}: {{ module.wrong }}</span>
              <span>{{ t('tools.examPrep.result.total') }}: {{ module.total }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 错题列表 -->
    <div class="wrong-questions-section">
      <div class="section-header">
        <h3 class="section-title">{{ t('tools.examPrep.result.wrongQuestions') }}</h3>
        <span class="section-count">{{ wrongQuestions.length }}</span>
      </div>
      <div v-if="wrongQuestions.length > 0" class="question-list">
        <div v-for="(question, index) in wrongQuestions" :key="question.id" class="question-item">
          <div class="question-header">
            <span class="question-number">{{ index + 1 }}</span>
            <van-tag :color="getCategoryColor(question.category)" size="small">
              {{ getCategoryName(question.category) }}
            </van-tag>
          </div>
          <div class="question-title">{{ question.title }}</div>
          <div class="question-answer">
            <div class="user-answer wrong">
              {{ t('tools.examPrep.result.yourAnswer') }}: {{ formatAnswer(question.userAnswer, question.options) }}
            </div>
            <div class="correct-answer">
              {{ t('tools.examPrep.result.correctAnswer') }}: {{ formatAnswer(question.correctAnswer, question.options) }}
            </div>
          </div>
          <div class="question-actions">
            <van-button
              size="small"
              type="primary"
              plain
              icon="eye-o"
              @click="handleViewQuestion(question)"
            >
              {{ t('tools.examPrep.result.viewDetail') }}
            </van-button>
            <van-button
              size="small"
              plain
              icon="star-o"
              @click="handleCollectQuestion(question)"
            >
              {{ t('tools.examPrep.result.collect') }}
            </van-button>
          </div>
        </div>
      </div>
      <van-empty v-else :description="t('tools.examPrep.result.noWrongQuestions')" />
    </div>

    <!-- 底部操作按钮 -->
    <div class="bottom-actions">
      <van-button
        type="primary"
        size="large"
        block
        icon="refresh"
        @click="handleRetakeExam"
      >
        {{ t('tools.examPrep.result.retakeExam') }}
      </van-button>
      <van-button
        size="large"
        block
        plain
        icon="home-o"
        @click="handleBackHome"
      >
        {{ t('tools.examPrep.result.backHome') }}
      </van-button>
    </div>

    <!-- 查看题目详情弹窗 -->
    <van-popup
      v-model:show="showQuestionDetail"
      position="bottom"
      :style="{ height: '90%' }"
      round
      closeable
    >
      <div class="question-detail-popup">
        <div class="popup-header">
          <h3 class="popup-title">{{ t('tools.examPrep.result.questionDetail') }}</h3>
        </div>
        <div class="popup-body">
          <QuestionCard
            v-if="currentQuestion"
            :question="currentQuestion"
            :show-analysis="true"
          />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { showToast } from 'vant';
import {
  Button as VanButton,
  Icon as VanIcon,
  Tag as VanTag,
  Progress as VanProgress,
  Popup as VanPopup,
  Empty as VanEmpty,
} from 'vant';
import Chart from 'chart.js/auto';
import QuestionCard from '../components/QuestionCard.vue';
import { useDatabase } from '../hooks/useDatabase';
import { MODULE_WEIGHTS, EXAM_QUESTION_COUNT } from '../utils/constants';
import { formatTime } from '../utils/helpers';

const categoryList = [
  { id: 'verbal', name: '言语理解', color: '#667eea' },
  { id: 'logic', name: '判断推理', color: '#764ba2' },
  { id: 'math', name: '数量关系', color: '#f093fb' },
  { id: 'data', name: '资料分析', color: '#4facfe' },
  { id: 'common', name: '常识判断', color: '#43e97b' },
];

// ========================================
// Hooks 和全局实例
// ========================================
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const db = useDatabase();

// ========================================
// 状态变量
// ========================================

// 考试结果数据
const examResult = ref(null);

// 错题列表
const wrongQuestions = ref([]);

// 雷达图引用
const radarChartRef = ref(null);
let radarChartInstance = null;

// 弹窗控制
const showQuestionDetail = ref(false);
const currentQuestion = ref(null);

// ========================================
// 计算属性
// ========================================

// 分数等级
const scoreLevel = computed(() => {
  const score = examResult.value?.score || 0;
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'good';
  if (score >= 40) return 'average';
  return 'poor';
});

// 分数图标
const scoreIcon = computed(() => {
  switch (scoreLevel.value) {
    case 'excellent':
      return 'success';
    case 'good':
      return 'passed';
    case 'average':
      return 'info-o';
    default:
      return 'warning-o';
  }
});

// 分数颜色
const scoreColor = computed(() => {
  switch (scoreLevel.value) {
    case 'excellent':
      return '#52c41a';
    case 'good':
      return '#1890ff';
    case 'average':
      return '#faad14';
    default:
      return '#f5222d';
  }
});

// 分数文本
const scoreText = computed(() => {
  switch (scoreLevel.value) {
    case 'excellent':
      return t('tools.examPrep.result.excellent');
    case 'good':
      return t('tools.examPrep.result.good');
    case 'average':
      return t('tools.examPrep.result.average');
    default:
      return t('tools.examPrep.result.keepWorking');
  }
});

// ========================================
// 方法函数
// ========================================

/**
 * 加载考试结果
 */
const loadExamResult = async () => {
  try {
    const recordId = route.params.recordId;
    if (!recordId) {
      showToast(t('tools.examPrep.result.noRecord'));
      router.back();
      return;
    }

    const record = await db.getExamRecordById(recordId);
    if (!record) {
      showToast(t('tools.examPrep.result.noRecord'));
      router.back();
      return;
    }

    examResult.value = record;

    // 加载错题列表
    await loadWrongQuestions();
  } catch (error) {
    console.error('加载考试记录失败:', error);
    showToast(t('tools.examPrep.result.loadError'));
    router.back();
  }
};

/**
 * 加载错题列表
 */
const loadWrongQuestions = async () => {
  try {
    const answers = examResult.value?.answers || [];
    const wrongAnswerIds = answers
      .filter(a => a.isCorrect === false)
      .map(a => a.questionId);

    const wrongQuestionList = await db.getQuestionsByIds(wrongAnswerIds);

    // 添加用户答案信息
    wrongQuestions.value = wrongQuestionList.map(q => {
      const answerInfo = answers.find(a => a.questionId === q.id);
      return {
        ...q,
        userAnswer: answerInfo?.userAnswer,
      };
    });
  } catch (error) {
    console.error('加载错题失败:', error);
    wrongQuestions.value = [];
  }
};

/**
 * 获取分类名称
 */
const getCategoryName = (categoryId) => {
  const category = categoryList.find(cat => cat.id === categoryId);
  return category ? category.name : categoryId;
};

/**
 * 获取分类颜色
 */
const getCategoryColor = (categoryId) => {
  const category = categoryList.find(c => c.id === categoryId);
  return category ? category.color : '#999';
};

/**
 * 格式化答案显示
 */
const formatAnswer = (answer, options) => {
  if (!answer || !options) return '-';

  const getOptionLabel = (index) => {
    const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    return labels[index] || `选项${index + 1}`;
  };

  if (Array.isArray(answer)) {
    return answer.map(idx => getOptionLabel(idx)).join(', ');
  }
  return getOptionLabel(answer);
};

/**
 * 创建雷达图
 */
const createRadarChart = () => {
  if (!radarChartRef.value || !examResult.value?.moduleStats) return;

  // 销毁旧的图表实例
  if (radarChartInstance) {
    radarChartInstance.destroy();
    radarChartInstance = null;
  }

  const moduleStats = examResult.value.moduleStats;
  const moduleIds = ['verbal', 'logic', 'math', 'data', 'common'];

  const labels = moduleIds.map(id => getCategoryName(id));
  const data = moduleIds.map(id => moduleStats[id]?.accuracy || 0);
  const colors = moduleIds.map(id => getCategoryColor(id));

  const ctx = radarChartRef.value.getContext('2d');

  radarChartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels,
      datasets: [
        {
          label: t('tools.examPrep.result.accuracy'),
          data,
          backgroundColor: 'rgba(102, 126, 234, 0.2)',
          borderColor: '#667eea',
          borderWidth: 2,
          pointBackgroundColor: colors,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20,
            font: {
              size: 12,
            },
          },
          pointLabels: {
            font: {
              size: 14,
              weight: 'bold',
            },
          },
          grid: {
            color: '#e0e0e0',
          },
          angleLines: {
            color: '#e0e0e0',
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              return `${context.label}: ${context.value}%`;
            },
          },
        },
      },
    },
  });
};

/**
 * 查看题目详情
 */
const handleViewQuestion = (question) => {
  currentQuestion.value = question;
  showQuestionDetail.value = true;
};

/**
 * 收藏题目
 */
const handleCollectQuestion = async (question) => {
  try {
    await db.addCollection(question.id);
    showToast(t('tools.examPrep.questionCard.collected'));
  } catch (error) {
    console.error('收藏失败:', error);
    showToast(t('tools.examPrep.questionCard.collectError'));
  }
};

/**
 * 重新考试
 */
const handleRetakeExam = () => {
  router.push({ name: 'ExamPrepExam' });
};

/**
 * 返回首页
 */
const handleBackHome = () => {
  router.push({ name: 'ExamPrep' });
};

// ========================================
// 生命周期钩子
// ========================================

onMounted(async () => {
  await loadExamResult();
  createRadarChart();
});

onUnmounted(() => {
  if (radarChartInstance) {
    radarChartInstance.destroy();
    radarChartInstance = null;
  }
});

// 监听考试结果变化，重新创建雷达图
watch(
  () => examResult.value,
  () => {
    if (examResult.value) {
      createRadarChart();
    }
  },
  { deep: true }
);
</script>

<style lang="less" scoped>
.exam-result-page {
  // 结果头部
  .result-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: var(--spacing-lg);
    padding-top: calc(var(--spacing-lg) + env(safe-area-inset-top));
    color: #fff;

    .score-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: var(--spacing-lg);

      .score-circle {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: var(--spacing-md);

        .score-value {
          font-size: 48px;
          font-weight: var(--font-weight-bold);
          line-height: 1;
        }

        .score-label {
          font-size: var(--font-size-sm);
          opacity: 0.8;
        }
      }

      .score-badge {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        padding: var(--spacing-xs) var(--spacing-md);
        background: rgba(255, 255, 255, 0.2);
        border-radius: var(--radius-lg);

        .badge-text {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-medium);
        }
      }

      // 分数等级样式
      &.excellent .score-circle {
        background: rgba(82, 196, 26, 0.3);
      }

      &.good .score-circle {
        background: rgba(24, 144, 255, 0.3);
      }

      &.average .score-circle {
        background: rgba(250, 173, 14, 0.3);
      }

      &.poor .score-circle {
        background: rgba(245, 34, 45, 0.3);
      }
    }

    .stats-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--spacing-sm);

      .stat-card {
        text-align: center;
        padding: var(--spacing-sm);
        background: rgba(255, 255, 255, 0.1);
        border-radius: var(--radius-md);

        .stat-value {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);

          &.wrong {
            color: #ff3b30;
          }
        }

        .stat-label {
          font-size: var(--font-size-xs);
          opacity: 0.8;
        }
      }
    }
  }

  // 图表区域
  .chart-section {
    background: var(--color-bg-secondary);
    padding: var(--spacing-md);
    margin: var(--spacing-md);

    .section-header {
      margin-bottom: var(--spacing-md);

      .section-title {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        color: var(--color-text-primary);
      }
    }

    .chart-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--spacing-md);

      .radar-chart {
        max-width: 100%;
        max-height: 300px;
      }
    }
  }

  // 模块详情
  .module-details {
    background: var(--color-bg-secondary);
    padding: var(--spacing-md);
    margin: var(--spacing-md);

    .section-header {
      margin-bottom: var(--spacing-md);

      .section-title {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        color: var(--color-text-primary);
      }
    }

    .module-list {
      .module-item {
        padding: var(--spacing-md);
        background: var(--color-bg-primary);
        border-radius: var(--radius-md);
        margin-bottom: var(--spacing-sm);

        .module-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-sm);

          .module-accuracy {
            .accuracy-value {
              font-size: var(--font-size-lg);
              font-weight: var(--font-weight-semibold);
              color: var(--color-primary);
            }
          }
        }

        .module-stats {
          .van-progress {
            margin-bottom: var(--spacing-sm);
          }

          .module-detail-row {
            display: flex;
            justify-content: space-around;
            font-size: var(--font-size-sm);
            color: var(--color-text-secondary);
          }
        }
      }
    }
  }

  // 错题列表
  .wrong-questions-section {
    background: var(--color-bg-secondary);
    padding: var(--spacing-md);
    margin: var(--spacing-md);

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--spacing-md);

      .section-title {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        color: var(--color-text-primary);
      }

      .section-count {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        background: var(--color-bg-tertiary);
        padding: 2px 8px;
        border-radius: var(--radius-sm);
      }
    }

    .question-list {
      .question-item {
        padding: var(--spacing-md);
        background: var(--color-bg-primary);
        border-radius: var(--radius-md);
        margin-bottom: var(--spacing-sm);
        border-left: 4px solid #f5222d;

        .question-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--spacing-sm);

          .question-number {
            font-size: var(--font-size-sm);
            color: var(--color-text-secondary);
            font-weight: var(--font-weight-medium);
          }
        }

        .question-title {
          font-size: var(--font-size-base);
          line-height: 1.5;
          color: var(--color-text-primary);
          margin-bottom: var(--spacing-sm);
          white-space: pre-wrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }

        .question-answer {
          margin-bottom: var(--spacing-sm);

          .user-answer,
          .correct-answer {
            font-size: var(--font-size-sm);
            padding: var(--spacing-xs) var(--spacing-sm);
            border-radius: var(--radius-sm);
            margin-bottom: var(--spacing-xs);
          }

          .user-answer.wrong {
            background: rgba(245, 34, 45, 0.1);
            color: #f5222d;
          }

          .correct-answer {
            background: rgba(82, 196, 26, 0.1);
            color: #52c41a;
          }
        }

        .question-actions {
          display: flex;
          gap: var(--spacing-xs);

          :deep(.van-button) {
            flex: 1;
            font-size: var(--font-size-xs);
          }
        }
      }
    }
  }

  // 底部操作按钮
  .bottom-actions {
    background: var(--color-bg-secondary);
    padding: var(--spacing-md);
    padding-bottom: calc(var(--spacing-md) + env(safe-area-inset-bottom));
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  // 查看题目详情弹窗
  .question-detail-popup {
    .popup-header {
      padding: var(--spacing-md) var(--spacing-lg);
      border-bottom: 1px solid var(--color-border);

      .popup-title {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        color: var(--color-text-primary);
      }
    }

    .popup-body {
      padding: var(--spacing-md);
      padding-bottom: calc(var(--spacing-md) + env(safe-area-inset-bottom));
      height: calc(100% - 60px);
      overflow-y: auto;
    }
  }
}

// 移动端响应式适配
@media screen and (max-width: 375px) {
  .exam-result-page {
    .result-header {
      .stats-row {
        grid-template-columns: repeat(2, 1fr);

        .stat-card {
          .stat-value {
            font-size: var(--font-size-base);
          }
        }
      }
    }

    .module-details {
      .module-list {
        .module-item {
          .module-stats {
            .module-detail-row {
              font-size: var(--font-size-xs);
            }
          }
        }
      }
    }

    .wrong-questions-section {
      .question-list {
        .question-item {
          .question-title {
            font-size: var(--font-size-sm);
          }

          .question-actions {
            :deep(.van-button) {
              font-size: 10px;
            }
          }
        }
      }
    }
  }
}
</style>