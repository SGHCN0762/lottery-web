<template>
  <div class="wrong-questions-page">
    <!-- 顶部标题区域 -->
    <div class="page-header">
      <div class="header-bg-decoration">
        <div class="bg-circle circle-1"></div>
        <div class="bg-circle circle-2"></div>
      </div>
      <div class="header-content">
        <div class="header-text">
          <h1 class="page-title">{{ t('tools.examPrep.wrongQuestions.title') }}</h1>
          <p class="page-subtitle">{{ t('tools.examPrep.wrongQuestions.subtitle') }}</p>
        </div>
      </div>
    </div>

    <!-- 统计概览卡片 -->
    <div class="stats-section">
      <div class="stats-card">
        <div class="stat-item">
          <div class="stat-icon wrong">
            <van-icon name="warning-o" />
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ wrongCount }}</div>
            <div class="stat-label">{{ t('tools.examPrep.wrongQuestions.totalWrong') }}</div>
          </div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-icon reviewed">
            <van-icon name="eye-o" />
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ reviewedCount }}</div>
            <div class="stat-label">{{ t('tools.examPrep.wrongQuestions.reviewed') }}</div>
          </div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-icon mastered">
            <van-icon name="success" />
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ masteredCount }}</div>
            <div class="stat-label">{{ t('tools.examPrep.wrongQuestions.mastered') }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索和筛选区域 -->
    <div class="filter-section">
      <div class="search-bar">
        <van-icon name="search" class="search-icon" />
        <input
          v-model="searchKeyword"
          class="search-input"
          type="text"
          :placeholder="t('tools.examPrep.wrongQuestions.searchPlaceholder')"
          @input="handleSearch"
        />
        <van-icon
          v-if="searchKeyword"
          name="clear"
          class="clear-icon"
          @click="searchKeyword = ''; handleSearch()"
        />
      </div>

      <van-tabs
        v-model:active="activeCategory"
        class="category-tabs"
        :color="categoryColor"
        :line-width="24"
        :line-height="3"
        :title-active-color="titleActiveColor"
        :title-inactive-color="titleInactiveColor"
        @change="handleCategoryChange"
      >
        <van-tab :title="t('tools.examPrep.wrongQuestions.all')" name="all" />
        <van-tab
          v-for="category in categoryList"
          :key="category.id"
          :title="category.name"
          :name="category.id"
        />
      </van-tabs>

      <div class="sort-row">
        <span class="sort-label">{{ t('tools.examPrep.wrongQuestions.sort') }}</span>
        <div class="sort-options">
          <button
            class="sort-btn"
            :class="{ active: sortBy === 'date' }"
            @click="sortBy = 'date'"
          >
            <van-icon name="clock-o" />
            {{ t('tools.examPrep.wrongQuestions.sortByDate') }}
          </button>
          <button
            class="sort-btn"
            :class="{ active: sortBy === 'count' }"
            @click="sortBy = 'count'"
          >
            <van-icon name="fire" />
            {{ t('tools.examPrep.wrongQuestions.sortByWrongCount') }}
          </button>
        </div>
      </div>
    </div>

    <!-- 错题列表 -->
    <div class="list-section">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text=""
        @load="loadMoreWrongQuestions"
        class="wrong-list"
      >
        <div v-if="wrongQuestions.length === 0 && !loading" class="empty-state">
          <div class="empty-icon">
            <van-icon name="checked" />
          </div>
          <div class="empty-title">{{ t('tools.examPrep.wrongQuestions.empty') }}</div>
          <div class="empty-desc">{{ t('tools.examPrep.wrongQuestions.emptyDesc') }}</div>
          <button class="empty-btn" @click="handleStartPractice">
            {{ t('tools.examPrep.wrongQuestions.startPractice') }}
          </button>
        </div>

        <div
          v-for="question in wrongQuestions"
          :key="question.id"
          class="wrong-card"
          :class="{ 'mastered': question.isMastered }"
          @click="handleViewQuestion(question)"
        >
          <div class="card-top">
            <span
              class="category-tag"
              :style="{ background: getCategoryColor(question.category) + '15', color: getCategoryColor(question.category) }"
            >
              {{ getCategoryName(question.category) }}
            </span>
            <span class="wrong-badge">
              <van-icon name="warning" />
              {{ t('tools.examPrep.wrongQuestions.wrongTimes', { count: question.wrongCount }) }}
            </span>
          </div>

          <div class="question-text">{{ getQuestionPreview(question.title) }}</div>

          <div class="card-bottom">
            <span class="time-text">
              <van-icon name="clock-o" />
              {{ formatDate(question.lastWrongAt) }}
            </span>
            <div class="card-actions">
              <button class="action-btn" @click.stop="handlePracticeAgain(question)">
                <van-icon name="replay" />
                {{ t('tools.examPrep.wrongQuestions.practiceAgain') }}
              </button>
              <button class="action-btn delete" @click.stop="handleRemoveWrong(question)">
                <van-icon name="delete-o" />
                {{ t('tools.examPrep.wrongQuestions.remove') }}
              </button>
            </div>
          </div>
        </div>
      </van-list>
    </div>

    <!-- 底部操作栏 -->
    <div v-if="wrongQuestions.length > 0" class="bottom-actions">
      <button class="primary-btn" @click="handlePracticeAllWrong">
        <van-icon name="play-circle-o" />
        {{ t('tools.examPrep.wrongQuestions.practiceAll') }}
      </button>
    </div>

    <!-- 题目详情弹窗 -->
    <van-popup
      v-model:show="showQuestionDetail"
      position="bottom"
      :style="{ height: '85%' }"
      round
      closeable
    >
      <div class="question-detail-popup">
        <div class="popup-header">
          <h3>{{ t('tools.examPrep.wrongQuestions.questionDetail') }}</h3>
        </div>
        <div class="popup-body">
          <QuestionCard
            v-if="selectedQuestion"
            :question="selectedQuestion"
            :showAnalysis="false"
            @answered="handleDetailAnswered"
          />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { showToast, showConfirmDialog, Popup as VanPopup, Tabs as VanTabs, Tab as VanTab } from 'vant';
import { List as VanList, Empty as VanEmpty } from 'vant';
import QuestionCard from '../components/QuestionCard.vue';
import { useDatabase } from '../hooks/useDatabase';
import { formatDate } from '../utils/helpers';
import { PRACTICE_MODES } from '../utils/constants';

const { t } = useI18n();
const router = useRouter();
const db = useDatabase();

const categoryList = computed(() => [
  { id: 'verbal', name: t('tools.examPrep.categories.verbal'), color: '#1989fa' },
  { id: 'logic', name: t('tools.examPrep.categories.logic'), color: '#ff7a44' },
  { id: 'math', name: t('tools.examPrep.categories.math'), color: '#07c160' },
  { id: 'data', name: t('tools.examPrep.categories.data'), color: '#69b1ff' },
  { id: 'common', name: t('tools.examPrep.categories.common'), color: '#ee0a24' },
]);

const activeCategory = ref('all');
const searchKeyword = ref('');
const sortBy = ref('date');
const loading = ref(false);
const finished = ref(false);
const wrongQuestions = ref([]);
const pageSize = 20;
let currentPage = 0;

const showQuestionDetail = ref(false);
const selectedQuestion = ref(null);

const wrongCount = ref(0);
const reviewedCount = ref(0);
const masteredCount = ref(0);

const categoryColor = ref('var(--color-danger)');
const titleActiveColor = ref('var(--color-text-primary)');
const titleInactiveColor = ref('var(--color-text-tertiary)');

const getCategoryName = (categoryId) => {
  const category = categoryList.value.find(c => c.id === categoryId);
  return category ? category.name : categoryId;
};

const getCategoryColor = (categoryId) => {
  const category = categoryList.value.find(c => c.id === categoryId);
  return category ? category.color : '#999';
};

const getQuestionPreview = (title) => {
  if (!title) return '';
  return title.length > 60 ? title.substring(0, 60) + '...' : title;
};

const loadWrongQuestions = async (reset = false) => {
  if (reset) {
    currentPage = 0;
    wrongQuestions.value = [];
    finished.value = false;
  }

  if (finished.value) return;

  loading.value = true;

  try {
    const wrongRecords = await db.getWrongRecords({
      category: activeCategory.value === 'all' ? undefined : activeCategory.value,
    });

    const questionIds = [...new Set(wrongRecords.map(r => r.questionId))];
    let questions = await db.getQuestionsByIds(questionIds) || [];

    if (searchKeyword.value) {
      const keyword = searchKeyword.value.toLowerCase();
      questions = questions.filter(q => 
        q.title?.toLowerCase().includes(keyword)
      );
    }

    const questionStats = {};
    wrongRecords.forEach(record => {
      if (!questionStats[record.questionId]) {
        questionStats[record.questionId] = {
          wrongCount: 0,
          lastWrongAt: record.createdAt,
        };
      }
      questionStats[record.questionId].wrongCount++;
      if (new Date(record.createdAt) > new Date(questionStats[record.questionId].lastWrongAt)) {
        questionStats[record.questionId].lastWrongAt = record.createdAt;
      }
    });

    let wrongQuestionsWithStats = questions.map(q => ({
      ...q,
      wrongCount: questionStats[q.id]?.wrongCount || 0,
      lastWrongAt: questionStats[q.id]?.lastWrongAt || null,
      isMastered: false,
    }));

    if (sortBy.value === 'date') {
      wrongQuestionsWithStats.sort((a, b) =>
        new Date(b.lastWrongAt) - new Date(a.lastWrongAt)
      );
    } else {
      wrongQuestionsWithStats.sort((a, b) => b.wrongCount - a.wrongCount);
    }

    const start = currentPage * pageSize;
    const pageItems = wrongQuestionsWithStats.slice(start, start + pageSize);
    wrongQuestions.value = [...wrongQuestions.value, ...pageItems];

    currentPage++;

    if (start + pageSize >= wrongQuestionsWithStats.length) {
      finished.value = true;
    }
  } catch (error) {
    console.error('加载错题失败:', error);
    showToast(t('tools.examPrep.wrongQuestions.loadError'));
    finished.value = true;
  } finally {
    loading.value = false;
  }
};

const loadMoreWrongQuestions = () => {
  loadWrongQuestions(false);
};

const loadStatistics = async () => {
  try {
    const wrongRecords = await db.getWrongRecords();
    const uniqueIds = new Set(wrongRecords.map(r => r.questionId));
    wrongCount.value = uniqueIds.size;
    reviewedCount.value = 0;
    masteredCount.value = 0;
  } catch (error) {
    console.error('加载统计失败:', error);
  }
};

const handleCategoryChange = () => {
  loadWrongQuestions(true);
};

const handleSearch = () => {
  loadWrongQuestions(true);
};

watch(sortBy, () => {
  loadWrongQuestions(true);
});

const handleViewQuestion = (question) => {
  selectedQuestion.value = question;
  showQuestionDetail.value = true;
};

const handlePracticeAgain = (question) => {
  router.push({
    name: 'ExamPrepPractice',
    query: {
      mode: PRACTICE_MODES.WRONG,
      questionIds: question.id,
    },
  });
};

const handleRemoveWrong = async (question) => {
  try {
    await showConfirmDialog({
      title: t('tools.examPrep.wrongQuestions.removeConfirmTitle'),
      message: t('tools.examPrep.wrongQuestions.removeConfirmMessage'),
    });

    const records = await db.getRecordsByQuestionId(question.id);
    const wrongRecordIds = records.filter(r => !r.isCorrect).map(r => r.id);

    for (const id of wrongRecordIds) {
      await db.deleteRecord(id);
    }

    showToast(t('tools.examPrep.wrongQuestions.removed'));
    loadWrongQuestions(true);
    loadStatistics();
  } catch (error) {
    if (error !== 'cancel') {
      console.error('移除错题失败:', error);
      showToast(t('tools.examPrep.wrongQuestions.removeError'));
    }
  }
};

const handleStartPractice = () => {
  router.push({
    name: 'ExamPrepPractice',
    query: { mode: PRACTICE_MODES.SEQUENTIAL },
  });
};

const handlePracticeAllWrong = () => {
  if (wrongQuestions.value.length === 0) {
    showToast('暂无错题');
    return;
  }
  router.push({
    name: 'ExamPrepPractice',
    query: { mode: PRACTICE_MODES.WRONG },
  });
};

const handleDetailAnswered = ({ questionId, isCorrect }) => {
  if (isCorrect) {
    showToast('回答正确！');
    reviewedCount.value++;
  }
};

onMounted(() => {
  loadWrongQuestions(true);
  loadStatistics();
});
</script>

<style lang="less" scoped>
.wrong-questions-page {
  --gradient-danger: linear-gradient(135deg, var(--van-red-5) 0%, var(--van-red-7) 100%);
  --gradient-primary: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%);
  --gradient-success: linear-gradient(135deg, var(--van-green-4) 0%, var(--van-green-6) 100%);

  .page-header {
    position: relative;
    background: var(--gradient-danger);
    padding: 20px 20px 32px;
    padding-top: calc(20px + env(safe-area-inset-top));
    color: #fff;
    overflow: hidden;

    .header-bg-decoration {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;

      .bg-circle {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
      }

      .circle-1 {
        width: 160px;
        height: 160px;
        top: -60px;
        right: -30px;
      }

      .circle-2 {
        width: 100px;
        height: 100px;
        bottom: -30px;
        left: -20px;
      }
    }

    .header-content {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 14px;

      .back-btn {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.15);
        border: none;
        color: #fff;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;

        &:active {
          transform: scale(0.95);
          background: rgba(255, 255, 255, 0.25);
        }
      }

      .header-text {
        .page-title {
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 4px;
          letter-spacing: -0.5px;
        }

        .page-subtitle {
          font-size: 13px;
          opacity: 0.75;
          margin: 0;
        }
      }
    }
  }

  .stats-section {
    padding: 0 16px;
    margin-top: -16px;
    position: relative;
    z-index: 10;

    .stats-card {
      display: flex;
      align-items: center;
      background: var(--color-bg-secondary);
      border-radius: 16px;
      padding: 18px 12px;
      box-shadow: var(--shadow-lg);

      .stat-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;

        .stat-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #fff;

          &.wrong {
            background: var(--gradient-danger);
          }
          &.reviewed {
            background: var(--gradient-primary);
          }
          &.mastered {
            background: var(--gradient-success);
          }
        }

        .stat-info {
          text-align: center;

          .stat-value {
            font-size: 20px;
            font-weight: 700;
            color: var(--color-text-primary);
            line-height: 1.2;
          }

          .stat-label {
            font-size: 11px;
            color: var(--color-text-tertiary);
            margin-top: 2px;
          }
        }
      }

      .stat-divider {
        width: 1px;
        height: 40px;
        background: var(--color-border);
      }
    }
  }

  .filter-section {
    padding: 16px;

    .search-bar {
      display: flex;
      align-items: center;
      background: var(--color-bg-secondary);
      border-radius: 12px;
      padding: 0 14px;
      height: 44px;
      box-shadow: var(--shadow-sm);

      .search-icon {
        font-size: 16px;
        color: var(--color-text-tertiary);
        margin-right: 8px;
      }

      .search-input {
        flex: 1;
        border: none;
        outline: none;
        font-size: 14px;
        color: var(--color-text-primary);
        background: transparent;

        &::placeholder {
          color: var(--color-text-placeholder);
        }
      }

      .clear-icon {
        font-size: 16px;
        color: var(--color-text-tertiary);
        cursor: pointer;
      }
    }

    .category-tabs {
        margin-top: 12px;
        background: var(--color-bg-secondary);
        border-radius: 12px;
        box-shadow: var(--shadow-sm);

        :deep(.van-tab) {
          font-size: 13px;
          font-weight: 500;
        }

        :deep(.van-tabs__line) {
          border-radius: 2px;
        }
      }

    .sort-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 12px;

      .sort-label {
        font-size: 13px;
        color: var(--color-text-secondary);
        font-weight: 500;
      }

      .sort-options {
        display: flex;
        gap: 8px;

        .sort-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          border-radius: 8px;
          border: none;
          background: var(--color-bg-secondary);
          color: var(--color-text-secondary);
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;

          &.active {
            background: color-mix(in srgb, var(--color-danger) 10%, transparent);
            color: var(--color-danger);
            font-weight: 600;
          }

          &:active {
            transform: scale(0.97);
          }
        }
      }
    }
  }

  .list-section {
    padding: 0 16px;

    .wrong-list {
      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 60px 20px;

        .empty-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--van-green-1) 0%, var(--van-green-2) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          color: var(--color-success);
          margin-bottom: 16px;
        }

        .empty-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: 6px;
        }

        .empty-desc {
          font-size: 13px;
          color: var(--color-text-tertiary);
          margin-bottom: 20px;
        }

        .empty-btn {
          padding: 10px 24px;
          border-radius: 20px;
          border: none;
          background: var(--gradient-danger);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(238, 10, 36, 0.3);
          transition: all 0.2s;

          &:active {
            transform: scale(0.97);
          }
        }
      }

      .wrong-card {
        background: var(--color-bg-secondary);
        border-radius: 16px;
        padding: 16px;
        margin-bottom: 12px;
        box-shadow: var(--shadow-card);
        cursor: pointer;
        transition: all 0.2s;

        &:active {
          transform: scale(0.99);
        }

        &.mastered {
          opacity: 0.6;
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;

          .category-tag {
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
          }

          .wrong-badge {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 11px;
            color: var(--color-danger);
            font-weight: 500;
          }
        }

        .question-text {
          font-size: 14px;
          color: var(--color-text-primary);
          line-height: 1.6;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .time-text {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 12px;
            color: var(--color-text-tertiary);
          }

          .card-actions {
            display: flex;
            gap: 8px;

            .action-btn {
              display: flex;
              align-items: center;
              gap: 4px;
              padding: 6px 10px;
              border-radius: 8px;
              border: none;
              background: var(--color-bg-tertiary);
              color: var(--color-text-secondary);
              font-size: 12px;
              cursor: pointer;
              transition: all 0.2s;

              &:active {
                transform: scale(0.95);
              }

              &.delete {
                background: color-mix(in srgb, var(--color-danger) 10%, transparent);
                color: var(--color-danger);
              }
            }
          }
        }
      }
    }
  }

  .bottom-actions {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px 16px;
    background: var(--color-bg-secondary);
    border-top: 1px solid var(--color-border);
    padding-bottom: calc(12px + env(safe-area-inset-bottom));
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.04);
    z-index: 100;

    .primary-btn {
      width: 100%;
      height: 48px;
      border-radius: 24px;
      border: none;
      background: var(--gradient-danger);
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(238, 10, 36, 0.3);
      transition: all 0.2s;

      &:active {
        transform: scale(0.98);
      }
    }
  }

  .question-detail-popup {
    .popup-header {
      padding: 16px 20px;
      border-bottom: 1px solid var(--color-border);

      h3 {
        font-size: 16px;
        font-weight: 600;
        color: var(--color-text-primary);
        margin: 0;
      }
    }

    .popup-body {
      padding: 16px;
      height: calc(100% - 57px);
      overflow-y: auto;
    }
  }
}

[data-theme="dark"] .wrong-questions-page {
  --gradient-danger: linear-gradient(135deg, var(--van-red-4) 0%, var(--van-red-6) 100%);
  --gradient-primary: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%);
  --gradient-success: linear-gradient(135deg, var(--van-green-3) 0%, var(--van-green-5) 100%);
}
</style>
