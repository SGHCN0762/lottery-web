<template>
  <div class="statistics-page">
    <!-- 顶部标题 -->
    <div class="page-header">
      <h1 class="page-title">学习数据</h1>
      <p class="page-subtitle">记录你的每一次进步</p>
    </div>

    <!-- 时间周期选择 -->
    <div class="period-selector">
      <div class="period-tabs">
        <button 
          class="period-tab" 
          :class="{ active: activePeriod === 'week' }"
          @click="activePeriod = 'week'; handlePeriodChange()"
        >
          {{ t('tools.examPrep.statistics.last7Days') }}
        </button>
        <button 
          class="period-tab" 
          :class="{ active: activePeriod === 'month' }"
          @click="activePeriod = 'month'; handlePeriodChange()"
        >
          {{ t('tools.examPrep.statistics.last30Days') }}
        </button>
        <button 
          class="period-tab" 
          :class="{ active: activePeriod === 'all' }"
          @click="activePeriod = 'all'; handlePeriodChange()"
        >
          {{ t('tools.examPrep.statistics.allTime') }}
        </button>
      </div>
    </div>

    <!-- 总体统计概览 -->
    <div class="overview-section">
      <div class="overview-card">
        <div class="overview-main">
          <div class="accuracy-ring">
            <svg class="ring-svg" viewBox="0 0 100 100">
              <circle class="ring-bg" cx="50" cy="50" r="42" />
              <circle 
                class="ring-fill" 
                cx="50" cy="50" r="42"
                :style="{ strokeDashoffset: 264 - (264 * parseFloat(overallAccuracy) / 100) }"
              />
            </svg>
            <div class="ring-content">
              <span class="ring-num">{{ overallAccuracy }}</span>
              <span class="ring-percent">%</span>
              <span class="ring-label">正确率</span>
            </div>
          </div>
          <div class="overview-stats">
            <div class="stat-row">
              <div class="stat-item">
                <div class="stat-icon total">
                  <van-icon name="orders-o" />
                </div>
                <div class="stat-info">
                  <div class="stat-value">{{ totalQuestions }}</div>
                  <div class="stat-label">{{ t('tools.examPrep.statistics.totalQuestions') }}</div>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon correct">
                  <van-icon name="success" />
                </div>
                <div class="stat-info">
                  <div class="stat-value">{{ correctCount }}</div>
                  <div class="stat-label">{{ t('tools.examPrep.statistics.correctCount') }}</div>
                </div>
              </div>
            </div>
            <div class="stat-row">
              <div class="stat-item">
                <div class="stat-icon wrong">
                  <van-icon name="cross" />
                </div>
                <div class="stat-info">
                  <div class="stat-value">{{ wrongCount }}</div>
                  <div class="stat-label">{{ t('tools.examPrep.statistics.wrongCount') }}</div>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon streak">
                  <van-icon name="fire" />
                </div>
                <div class="stat-info">
                  <div class="stat-value">{{ streakDays }}</div>
                  <div class="stat-label">{{ t('tools.examPrep.statistics.streak') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="overview-divider"></div>
        <div class="overview-bottom">
          <div class="bottom-stat">
            <div class="bottom-icon time">
              <van-icon name="clock-o" />
            </div>
            <div class="bottom-info">
              <div class="bottom-value">{{ formatTime(totalTimeSpent) }}</div>
              <div class="bottom-label">{{ t('tools.examPrep.statistics.totalTime') }}</div>
            </div>
          </div>
          <div class="bottom-stat">
            <div class="bottom-icon avg">
              <van-icon name="clock-o" />
            </div>
            <div class="bottom-info">
              <div class="bottom-value">{{ formatTime(avgTimePerQuestion) }}</div>
              <div class="bottom-label">{{ t('tools.examPrep.statistics.avgTime') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 正确率趋势图 -->
    <div class="section-card chart-card">
      <div class="card-header">
        <h3 class="card-title">{{ t('tools.examPrep.statistics.accuracyTrend') }}</h3>
        <span class="card-icon">📈</span>
      </div>
      <div class="chart-container">
        <canvas ref="accuracyChartRef" class="chart-canvas"></canvas>
      </div>
    </div>

    <!-- 各模块雷达图 -->
    <div class="section-card chart-card">
      <div class="card-header">
        <h3 class="card-title">{{ t('tools.examPrep.statistics.moduleStrength') }}</h3>
        <span class="card-icon">🎯</span>
      </div>
      <div class="chart-container">
        <canvas ref="radarChartRef" class="chart-canvas"></canvas>
      </div>
    </div>

    <!-- 各模块详细统计 -->
    <div class="section-card">
      <div class="card-header">
        <h3 class="card-title">{{ t('tools.examPrep.statistics.moduleDetails') }}</h3>
        <span class="card-badge">5大模块</span>
      </div>
      <div class="module-stats-list">
        <div v-for="category in categoryList" :key="category.id" class="module-stat-item">
          <div class="module-icon-wrap">
            <div class="module-icon" :style="{ background: getCategoryColor(category.id) }">
              <van-icon name="bookmark" />
            </div>
          </div>
          <div class="module-content">
            <div class="module-header">
              <span class="module-name">{{ category.name }}</span>
              <span class="module-accuracy" :style="{ color: getCategoryColor(category.id) }">{{ getModuleAccuracy(category.id) }}%</span>
            </div>
            <div class="module-progress">
              <div class="progress-bg">
                <div 
                  class="progress-fill" 
                  :style="{ width: `${getModuleAccuracy(category.id)}%`, background: getCategoryColor(category.id) }"
                ></div>
              </div>
            </div>
            <div class="module-details">
              <span class="detail-item">
                <span class="detail-num">{{ getModuleTotal(category.id) }}</span>
                <span class="detail-label">总题</span>
              </span>
              <span class="detail-item correct">
                <span class="detail-num">{{ getModuleCorrect(category.id) }}</span>
                <span class="detail-label">正确</span>
              </span>
              <span class="detail-item wrong">
                <span class="detail-num">{{ getModuleWrong(category.id) }}</span>
                <span class="detail-label">错误</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 学习建议 -->
    <div class="section-card">
      <div class="card-header">
        <h3 class="card-title">{{ t('tools.examPrep.statistics.suggestions') }}</h3>
        <span class="card-icon">💡</span>
      </div>
      <div class="suggestions-list">
        <div 
          v-for="(suggestion, index) in suggestions" 
          :key="index"
          class="suggestion-item"
        >
          <div class="suggestion-icon" :style="{ background: suggestion.color + '15', color: suggestion.color }">
            <van-icon :name="suggestion.icon" />
          </div>
          <div class="suggestion-content">
            <div class="suggestion-title">{{ suggestion.title }}</div>
            <div class="suggestion-desc">{{ suggestion.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { showToast } from 'vant';
import {
  Tabs as VanTabs,
  Tab as VanTab,
  Grid as VanGrid,
  GridItem as VanGridItem,
  Progress as VanProgress,
  Icon as VanIcon,
  Cell as VanCell,
  CellGroup as VanCellGroup,
} from 'vant';
import ToolCard from '../../components/ToolCard.vue';
import { useDatabase } from '../hooks/useDatabase';
import { formatTime, statisticsByDate, statisticsByModule, formatDate } from '../utils/helpers';
import { STATISTICS_PERIOD } from '../utils/constants';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  RadialLinearScale,
  RadarController,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// 注册 Chart.js 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  RadialLinearScale,
  RadarController,
  Title,
  Tooltip,
  Legend,
  Filler
);

const { t } = useI18n();
const router = useRouter();
const db = useDatabase();

const categoryList = [
  { id: 'verbal', name: '言语理解', color: '#667eea' },
  { id: 'logic', name: '判断推理', color: '#764ba2' },
  { id: 'math', name: '数量关系', color: '#f093fb' },
  { id: 'data', name: '资料分析', color: '#4facfe' },
  { id: 'common', name: '常识判断', color: '#43e97b' },
];

// 状态变量
const activePeriod = ref('week');
const totalQuestions = ref(0);
const correctCount = ref(0);
const wrongCount = ref(0);
const totalTimeSpent = ref(0);
const streakDays = ref(0);

// 图表引用
const accuracyChartRef = ref(null);
const radarChartRef = ref(null);
let accuracyChart = null;
let radarChart = null;

// 模块统计数据
const moduleStats = ref({});
const dateStats = ref([]);

// 总体正确率
const overallAccuracy = computed(() => {
  if (totalQuestions.value === 0) return '0.0';
  return ((correctCount.value / totalQuestions.value) * 100).toFixed(1);
});

// 平均用时
const avgTimePerQuestion = computed(() => {
  if (totalQuestions.value === 0) return 0;
  return Math.round(totalTimeSpent.value / totalQuestions.value);
});

// 获取分类颜色
const getCategoryColor = (categoryId) => {
  const category = categoryList.find(c => c.id === categoryId);
  return category ? category.color : '#999';
};

// 获取模块正确率
const getModuleAccuracy = (categoryId) => {
  const stats = moduleStats.value[categoryId];
  if (!stats || stats.total === 0) return '0.0';
  return ((stats.correct / stats.total) * 100).toFixed(1);
};

// 获取模块总题数
const getModuleTotal = (categoryId) => {
  return moduleStats.value[categoryId]?.total || 0;
};

// 获取模块正确数
const getModuleCorrect = (categoryId) => {
  return moduleStats.value[categoryId]?.correct || 0;
};

// 获取模块错误数
const getModuleWrong = (categoryId) => {
  return moduleStats.value[categoryId]?.wrong || 0;
};

// 学习建议
const suggestions = computed(() => {
  const result = [];

  // 根据正确率给出建议
  if (overallAccuracy.value < 60) {
    result.push({
      title: t('tools.examPrep.statistics.suggestionsItems.lowAccuracy.title'),
      description: t('tools.examPrep.statistics.suggestionsItems.lowAccuracy.description'),
      icon: 'warning-o',
      color: '#f5222d',
    });
  } else if (overallAccuracy.value > 80) {
    result.push({
      title: t('tools.examPrep.statistics.suggestionsItems.highAccuracy.title'),
      description: t('tools.examPrep.statistics.suggestionsItems.highAccuracy.description'),
      icon: 'success',
      color: '#52c41a',
    });
  }

  // 根据薄弱模块给出建议
  const weakModule = categoryList.find(cat => {
    const accuracy = parseFloat(getModuleAccuracy(cat.id));
    return accuracy < 50;
  });

  if (weakModule) {
    result.push({
      title: t('tools.examPrep.statistics.suggestionsItems.weakModule.title', { name: weakModule.name }),
      description: t('tools.examPrep.statistics.suggestionsItems.weakModule.description'),
      icon: 'info-o',
      color: '#faad14',
    });
  }

  // 根据连续学习天数给出建议
  if (streakDays.value >= 7) {
    result.push({
      title: t('tools.examPrep.statistics.suggestionsItems.streak.title', { days: streakDays.value }),
      description: t('tools.examPrep.statistics.suggestionsItems.streak.description'),
      icon: 'fire',
      color: '#ff9500',
    });
  } else if (streakDays.value === 0) {
    result.push({
      title: t('tools.examPrep.statistics.suggestionsItems.noStreak.title'),
      description: t('tools.examPrep.statistics.suggestionsItems.noStreak.description'),
      icon: 'clock-o',
      color: '#999',
    });
  }

  return result;
});

// 加载统计数据
const loadStatistics = async () => {
  try {
    // 根据时间周期设置日期范围
    let startDate, endDate;
    endDate = new Date();

    if (activePeriod.value === 'week') {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
    } else if (activePeriod.value === 'month') {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
    } else {
      startDate = null; // 全部时间
    }

    // 获取做题记录
    const records = await db.getAllRecords({
      startDate,
      endDate,
    });

    // 计算总体统计
    totalQuestions.value = records.length;
    correctCount.value = records.filter(r => r.isCorrect).length;
    wrongCount.value = totalQuestions.value - correctCount.value;

    // 计算总用时（假设记录中有 timeSpent 字段）
    totalTimeSpent.value = records.reduce((sum, r) => sum + (r.timeSpent || 0), 0);

    // 计算连续学习天数
    streakDays.value = calculateStreakDays(records);

    // 按日期统计
    const days = activePeriod.value === 'week' ? 7 : activePeriod.value === 'month' ? 30 : 30;
    dateStats.value = statisticsByDate(records, days);

    // 按模块统计
    moduleStats.value = statisticsByModule(records);

    // 更新图表
    await nextTick();
    updateCharts();
  } catch (error) {
    console.error('加载统计失败:', error);
    showToast(t('tools.examPrep.statistics.loadError'));
  }
};

// 计算连续学习天数
const calculateStreakDays = (records) => {
  if (records.length === 0) return 0;

  // 获取所有做题日期
  const dates = new Set();
  records.forEach(r => {
    const date = formatDate(r.createdAt, 'YYYY-MM-DD');
    dates.add(date);
  });

  // 从今天开始往前计算连续天数
  let streak = 0;
  let currentDate = new Date();

  while (true) {
    const dateStr = formatDate(currentDate, 'YYYY-MM-DD');
    if (dates.has(dateStr)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};

// 更新图表
const updateCharts = async () => {
  await nextTick();
  // 确保之前的图表已销毁
  if (accuracyChart) {
    accuracyChart.destroy();
    accuracyChart = null;
  }
  if (radarChart) {
    radarChart.destroy();
    radarChart = null;
  }
  updateAccuracyChart();
  updateRadarChart();
};

// 更新正确率趋势图
const updateAccuracyChart = () => {
  if (!accuracyChartRef.value) return;
  if (accuracyChart) {
    accuracyChart.destroy();
    accuracyChart = null;
  }

  const ctx = accuracyChartRef.value.getContext('2d');
  const data = dateStats.value;

  accuracyChart = new ChartJS(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => formatDate(d.date, 'MM-DD')),
      datasets: [{
        label: t('tools.examPrep.statistics.accuracyLabel'),
        data: data.map(d => parseFloat(d.accuracy) || 0),
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#667eea',
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => `${context.dataset.label}: ${context.raw}%`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: (value) => `${value}%`,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  });
};

// 更新雷达图
const updateRadarChart = () => {
  if (!radarChartRef.value) return;
  if (radarChart) {
    radarChart.destroy();
    radarChart = null;
  }

  const ctx = radarChartRef.value.getContext('2d');

  radarChart = new ChartJS(ctx, {
    type: 'radar',
    data: {
      labels: categoryList.map(c => c.name),
      datasets: [{
        label: t('tools.examPrep.statistics.accuracyLabel'),
        data: categoryList.map(c => parseFloat(getModuleAccuracy(c.id)) || 0),
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: '#667eea',
        pointBorderColor: '#fff',
        pointRadius: 4,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context) => `${context.label}: ${context.raw}%`,
          },
        },
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20,
            callback: (value) => `${value}%`,
          },
          pointLabels: {
            font: {
              size: 12,
            },
          },
        },
      },
    },
  });
};

// 处理时间周期变化
const handlePeriodChange = () => {
  loadStatistics();
};

// 初始化
onMounted(() => {
  loadStatistics();
});

// 清理
onUnmounted(() => {
  if (accuracyChart) {
    accuracyChart.destroy();
  }
  if (radarChart) {
    radarChart.destroy();
  }
});
</script>

<style lang="less" scoped>
.statistics-page {
  /* 顶部标题 */
  .page-header {
    padding: 24px 20px 16px;
    padding-top: calc(24px + env(safe-area-inset-top));
    background: linear-gradient(180deg, #6366f1 0%, #4f46e5 100%);
    color: #fff;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: -60px;
      right: -40px;
      width: 200px;
      height: 200px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 50%;
    }

    .page-title {
      font-size: 24px;
      font-weight: 700;
      margin: 0 0 4px;
      letter-spacing: -0.5px;
      position: relative;
      z-index: 1;
    }

    .page-subtitle {
      font-size: 13px;
      opacity: 0.7;
      margin: 0;
      position: relative;
      z-index: 1;
    }
  }

  /* 时间周期选择 */
  .period-selector {
    padding: 0 16px;
    margin-top: -12px;
    position: relative;
    z-index: 10;

    .period-tabs {
      display: flex;
      background: var(--color-bg-secondary);
      border-radius: 14px;
      padding: 4px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);

      .period-tab {
        flex: 1;
        padding: 12px 0;
        border: none;
        background: transparent;
        color: #6b7280;
        font-size: 13px;
        font-weight: 500;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        &.active {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: #fff;
          font-weight: 600;
          box-shadow: 0 2px 10px rgba(99, 102, 241, 0.3);
        }
      }
    }
  }

  /* 总体统计概览 */
  .overview-section {
    padding: 16px;
  }

  .overview-card {
    background: var(--color-bg-secondary);
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);

    .overview-main {
      display: flex;
      align-items: center;
      gap: 20px;

      .accuracy-ring {
        position: relative;
        width: 110px;
        height: 110px;
        flex-shrink: 0;

        .ring-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);

          .ring-bg {
            fill: none;
            stroke: #f3f4f6;
            stroke-width: 8;
          }

          .ring-fill {
            fill: none;
            stroke: #6366f1;
            stroke-width: 8;
            stroke-linecap: round;
            stroke-dasharray: 264;
            stroke-dashoffset: 264;
            transition: stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1);
          }
        }

        .ring-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;

          .ring-num {
            font-size: 32px;
            font-weight: 800;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            line-height: 1;
          }

          .ring-percent {
            font-size: 14px;
            font-weight: 700;
            color: #6366f1;
            margin-left: 2px;
          }

          .ring-label {
            display: block;
            font-size: 11px;
            color: #9ca3af;
            margin-top: 4px;
          }
        }
      }

      .overview-stats {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 14px;

        .stat-row {
          display: flex;
          gap: 14px;

          .stat-item {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 10px;

            .stat-icon {
              width: 34px;
              height: 34px;
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              color: #fff;
              flex-shrink: 0;

              &.total {
                background: linear-gradient(135deg, #818cf8 0%, #6366f1 100%);
              }
              &.correct {
                background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
              }
              &.wrong {
                background: linear-gradient(135deg, #f87171 0%, #ef4444 100%);
              }
              &.streak {
                background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
              }
            }

            .stat-info {
              min-width: 0;

              .stat-value {
                font-size: 18px;
                font-weight: 700;
                color: #111827;
                line-height: 1.2;
              }

              .stat-label {
                font-size: 11px;
                color: #9ca3af;
                margin-top: 2px;
              }
            }
          }
        }
      }
    }

    .overview-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
      margin: 16px 0;
    }

    .overview-bottom {
      display: flex;
      gap: 16px;

      .bottom-stat {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 12px;
        background: #f9fafb;
        border-radius: 12px;

        .bottom-icon {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #fff;
          flex-shrink: 0;

          &.time {
            background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          }
          &.avg {
            background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%);
          }
        }

        .bottom-info {
          text-align: left;

          .bottom-value {
            font-size: 15px;
            font-weight: 600;
            color: #111827;
            line-height: 1.2;
          }

          .bottom-label {
            font-size: 11px;
            color: #9ca3af;
            margin-top: 2px;
          }
        }
      }
    }
  }

  /* 通用卡片 */
  .section-card {
    margin: 0 16px 16px;
    background: var(--color-bg-secondary);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 16px 12px;

      .card-title {
        font-size: 16px;
        font-weight: 700;
        color: #111827;
        margin: 0;
        letter-spacing: -0.2px;
      }

      .card-badge {
        font-size: 11px;
        color: #6366f1;
        background: rgba(99, 102, 241, 0.1);
        padding: 4px 10px;
        border-radius: 20px;
        font-weight: 600;
      }

      .card-icon {
        font-size: 18px;
      }
    }
  }

  /* 图表卡片 */
  .chart-card {
    .chart-container {
      position: relative;
      height: 200px;
      padding: 8px 16px 16px;

      .chart-canvas {
        width: 100%;
        height: 100%;
      }
    }
  }

  /* 模块统计列表 */
  .module-stats-list {
    padding: 0 16px 16px;

    .module-stat-item {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      padding: 14px 0;

      &:not(:last-child) {
        border-bottom: 1px solid #f3f4f6;
      }

      .module-icon-wrap {
        flex-shrink: 0;

        .module-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 18px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
      }

      .module-content {
        flex: 1;
        min-width: 0;

        .module-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;

          .module-name {
            font-size: 14px;
            font-weight: 600;
            color: #111827;
          }

          .module-accuracy {
            font-size: 15px;
            font-weight: 700;
          }
        }

        .module-progress {
          margin-bottom: 8px;

          .progress-bg {
            height: 6px;
            background: #f3f4f6;
            border-radius: 3px;
            overflow: hidden;

            .progress-fill {
              height: 100%;
              border-radius: 3px;
              transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
          }
        }

        .module-details {
          display: flex;
          gap: 16px;

          .detail-item {
            display: flex;
            align-items: baseline;
            gap: 4px;
            font-size: 12px;

            .detail-num {
              font-weight: 600;
              color: #6b7280;
            }

            .detail-label {
              color: #9ca3af;
            }

            &.correct .detail-num {
              color: #10b981;
            }

            &.wrong .detail-num {
              color: #ef4444;
            }
          }
        }
      }
    }
  }

  /* 学习建议 */
  .suggestions-list {
    padding: 0 16px 16px;

    .suggestion-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 14px 0;

      &:not(:last-child) {
        border-bottom: 1px solid #f3f4f6;
      }

      .suggestion-icon {
        width: 38px;
        height: 38px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        flex-shrink: 0;
      }

      .suggestion-content {
        flex: 1;
        min-width: 0;

        .suggestion-title {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 4px;
        }

        .suggestion-desc {
          font-size: 12px;
          color: #6b7280;
          line-height: 1.5;
        }
      }
    }
  }
}

@media screen and (max-width: 375px) {
  .statistics-page {
    .overview-card {
      .overview-main {
        flex-direction: column;
        text-align: center;
      }

      .overview-stats .stat-row .stat-item {
        justify-content: center;
      }
    }

    .chart-card .chart-container {
      height: 160px;
    }
  }
}
</style>