<template>
  <div class="collection-page">
    <!-- 顶部标题区域 -->
    <div class="page-header">
      <div class="header-bg-decoration">
        <div class="bg-circle circle-1"></div>
        <div class="bg-circle circle-2"></div>
      </div>
      <div class="header-content">
        <div class="header-text">
          <h1 class="page-title">{{ t('tools.examPrep.collections.title') }}</h1>
          <p class="page-subtitle">{{ t('tools.examPrep.collections.subtitle') }}</p>
        </div>
      </div>
    </div>

    <!-- 统计概览卡片 -->
    <div class="stats-section">
      <div class="stats-card">
        <div class="stat-item">
          <div class="stat-icon collected">
            <van-icon name="star" />
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ collectionCount }}</div>
            <div class="stat-label">{{ t('tools.examPrep.collections.totalCollected') }}</div>
          </div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-icon today">
            <van-icon name="calendar-o" />
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ todayCollected }}</div>
            <div class="stat-label">{{ t('tools.examPrep.collections.todayCollected') }}</div>
          </div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-icon note">
            <van-icon name="edit" />
          </div>
          <div class="stat-info">
            <div class="stat-value">{{ noteCount }}</div>
            <div class="stat-label">{{ t('tools.examPrep.collections.hasNote') }}</div>
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
          :placeholder="t('tools.examPrep.collections.searchPlaceholder')"
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
        <van-tab :title="t('tools.examPrep.collections.all')" name="all" />
        <van-tab
          v-for="category in categoryList"
          :key="category.id"
          :title="category.name"
          :name="category.id"
        />
      </van-tabs>
    </div>

    <!-- 收藏列表 -->
    <div class="list-section">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        :immediate-check="false"
        finished-text=""
        @load="loadMoreCollections"
        class="collection-list"
      >
        <div v-if="collections.length === 0 && !loading" class="empty-state">
          <div class="empty-icon">
            <van-icon name="star-o" />
          </div>
          <div class="empty-title">{{ t('tools.examPrep.collections.empty') }}</div>
          <div class="empty-desc">{{ t('tools.examPrep.collections.emptyDesc') }}</div>
          <button class="empty-btn" @click="handleStartPractice">
            {{ t('tools.examPrep.collections.startPractice') }}
          </button>
        </div>

        <div
          v-for="item in collections"
          :key="item.id"
          class="collection-card"
          @click="handleViewQuestion(item)"
        >
          <div class="card-top">
            <span
              class="category-tag"
              :style="{ background: getCategoryColor(item.category) + '15', color: getCategoryColor(item.category) }"
            >
              {{ getCategoryName(item.category) }}
            </span>
            <div class="card-top-actions">
              <span v-if="item.note" class="note-badge">
                <van-icon name="edit" />
                {{ t('tools.examPrep.collections.hasNote') }}
              </span>
              <van-icon
                name="star"
                size="18"
                class="star-icon"
                @click.stop="handleUncollect(item)"
              />
            </div>
          </div>

          <div class="question-text">{{ getQuestionPreview(item.title) }}</div>

          <div class="card-bottom">
            <span class="time-text">
              <van-icon name="clock-o" />
              {{ formatDate(item.collectedAt) }}
            </span>
            <div class="card-actions">
              <button class="action-btn" @click.stop="handleEditNote(item)">
                <van-icon name="edit" />
                {{ t('tools.examPrep.collections.editNote') }}
              </button>
              <button class="action-btn primary" @click.stop="handlePracticeAgain(item)">
                <van-icon name="play-circle-o" />
                {{ t('tools.examPrep.collections.practice') }}
              </button>
            </div>
          </div>
        </div>
      </van-list>
    </div>

    <!-- 底部操作栏 -->
    <div v-if="collections.length > 0" class="bottom-actions">
      <button class="primary-btn" @click="handlePracticeAllCollected">
        <van-icon name="play-circle-o" />
        {{ t('tools.examPrep.collections.practiceAll') }}
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
          <h3>{{ t('tools.examPrep.collections.questionDetail') }}</h3>
        </div>
        <div class="popup-body">
          <QuestionCard
            v-if="selectedQuestion"
            :question="selectedQuestion"
            :showAnalysis="false"
            @answered="handleDetailAnswered"
            @collect-change="handleCollectChange"
          />
        </div>
      </div>
    </van-popup>

    <!-- 笔记编辑弹窗 -->
    <van-popup
      v-model:show="showNoteEditor"
      position="bottom"
      :style="{ height: '65%' }"
      round
      closeable
    >
      <div class="note-editor-popup">
        <div class="popup-header">
          <h3>{{ t('tools.examPrep.collections.editNoteTitle') }}</h3>
        </div>
        <div class="popup-body">
          <NoteEditor
            v-if="selectedQuestion"
            :question-id="selectedQuestion.id"
            :initial-content="selectedQuestion.note || ''"
            @save="handleNoteSave"
            @cancel="showNoteEditor = false"
          />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { showToast, showConfirmDialog, Popup as VanPopup, Tabs as VanTabs, Tab as VanTab } from 'vant';
import { List as VanList } from 'vant';
import QuestionCard from '../components/QuestionCard.vue';
import NoteEditor from '../components/NoteEditor.vue';
import { useDatabase } from '../hooks/useDatabase';
import { formatDate } from '../utils/helpers';
import { PRACTICE_MODES } from '../utils/constants';

const { t } = useI18n();
const router = useRouter();
const db = useDatabase();

const categoryList = computed(() => [
  { id: 'verbal', name: t('tools.examPrep.categories.verbal'), color: '#1989fa' },
  { id: 'logic', name: t('tools.examPrep.categories.logic'), color: '#ff976a' },
  { id: 'math', name: t('tools.examPrep.categories.math'), color: '#07c160' },
  { id: 'data', name: t('tools.examPrep.categories.data'), color: '#69b1ff' },
  { id: 'common', name: t('tools.examPrep.categories.common'), color: '#ee0a24' },
]);

const activeCategory = ref('all');
const searchKeyword = ref('');
const loading = ref(false);
const finished = ref(false);
const collections = ref([]);
const pageSize = 20;
let currentPage = 0;

const showQuestionDetail = ref(false);
const showNoteEditor = ref(false);
const selectedQuestion = ref(null);

const collectionCount = ref(0);
const todayCollected = ref(0);

const categoryColor = ref('#1989fa');
const titleActiveColor = ref('#323233');
const titleInactiveColor = ref('#969799');

const noteCount = computed(() => {
  return collections.value.filter(c => c.note && c.note.trim()).length;
});

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

const loadCollections = async (reset = false) => {
  if (reset) {
    currentPage = 0;
    collections.value = [];
    finished.value = false;
  }

  if (finished.value) return;

  loading.value = true;

  try {
    const collectionRecords = await db.getAllCollections({
      category: activeCategory.value === 'all' ? undefined : activeCategory.value,
    });

    const questionIds = collectionRecords.map(c => c.questionId);
    let questions = await db.getQuestionsByIds(questionIds);

    if (searchKeyword.value) {
      const keyword = searchKeyword.value.toLowerCase();
      questions = questions.filter(q => 
        q.title?.toLowerCase().includes(keyword)
      );
    }

    let collectionsWithQuestions = collectionRecords
      .filter(collection => questions.some(q => q.id === collection.questionId))
      .map(collection => {
        const question = questions.find(q => q.id === collection.questionId);
        return {
          ...question,
          id: collection.questionId,
          collectionId: collection.id,
          collectedAt: collection.createdAt,
          note: collection.note || '',
        };
      })
      .sort((a, b) => new Date(b.collectedAt) - new Date(a.collectedAt));

    const start = currentPage * pageSize;
    const pageItems = collectionsWithQuestions.slice(start, start + pageSize);
    collections.value = [...collections.value, ...pageItems];

    currentPage++;

    if (start + pageSize >= collectionsWithQuestions.length) {
      finished.value = true;
    }
  } catch (error) {
    console.error('加载收藏失败:', error);
    showToast(t('tools.examPrep.collections.loadError'));
    finished.value = true;
  } finally {
    loading.value = false;
  }
};

const loadMoreCollections = () => {
  loadCollections(false);
};

const loadStatistics = async () => {
  try {
    const collectionRecords = await db.getAllCollections();
    collectionCount.value = collectionRecords.length;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    todayCollected.value = collectionRecords.filter(
      c => new Date(c.createdAt) >= today
    ).length;
  } catch (error) {
    console.error('加载统计失败:', error);
  }
};

const handleCategoryChange = () => {
  loadCollections(true);
};

const handleSearch = () => {
  loadCollections(true);
};

const handleViewQuestion = (item) => {
  selectedQuestion.value = item;
  showQuestionDetail.value = true;
};

const handleEditNote = (item) => {
  selectedQuestion.value = item;
  showNoteEditor.value = true;
};

const handleUncollect = async (item) => {
  try {
    await showConfirmDialog({
      title: t('tools.examPrep.collections.uncollectConfirmTitle'),
      message: t('tools.examPrep.collections.uncollectConfirmMessage'),
    });

    await db.removeCollection(item.id);

    showToast(t('tools.examPrep.collections.uncollected'));
    loadCollections(true);
    loadStatistics();
  } catch (error) {
    if (error !== 'cancel') {
      console.error('取消收藏失败:', error);
      showToast(t('tools.examPrep.collections.uncollectError'));
    }
  }
};

const handlePracticeAgain = (item) => {
  router.push({
    name: 'ExamPrepPractice',
    query: {
      mode: PRACTICE_MODES.COLLECTED,
      questionIds: item.id,
    },
  });
};

const handleStartPractice = () => {
  router.push({
    name: 'ExamPrepPractice',
    query: { mode: PRACTICE_MODES.SEQUENTIAL },
  });
};

const handlePracticeAllCollected = () => {
  if (collections.value.length === 0) {
    showToast('暂无收藏');
    return;
  }
  router.push({
    name: 'ExamPrepPractice',
    query: { mode: PRACTICE_MODES.COLLECTED },
  });
};

const handleDetailAnswered = ({ questionId, isCorrect }) => {
  if (isCorrect) {
    showToast('回答正确！');
  }
};

const handleCollectChange = ({ questionId, isCollected }) => {
  if (!isCollected) {
    loadCollections(true);
    loadStatistics();
  }
};

const handleNoteSave = async ({ questionId, content }) => {
  try {
    await db.updateCollectionNote(questionId, content);
    showToast(t('tools.examPrep.collections.noteSaved'));
    showNoteEditor.value = false;
    loadCollections(true);
  } catch (error) {
    console.error('保存笔记失败:', error);
    showToast(t('tools.examPrep.collections.noteSaveError'));
  }
};

onMounted(() => {
  loadCollections(true);
  loadStatistics();
});
</script>

<style lang="less" scoped>
.collection-page {
  --gradient-warning: linear-gradient(135deg, var(--van-orange-4) 0%, var(--van-orange-6) 100%);
  --gradient-primary-light: linear-gradient(135deg, var(--van-blue-4) 0%, var(--color-primary) 100%);
  --gradient-info: linear-gradient(135deg, var(--van-blue-3) 0%, var(--van-blue-5) 100%);
  --gradient-primary: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%);

  .page-header {
    position: relative;
    background: var(--gradient-primary);
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

          &.collected {
            background: var(--gradient-warning);
          }
          &.today {
            background: var(--gradient-primary-light);
          }
          &.note {
            background: var(--gradient-info);
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
      box-shadow: var(--shadow-light);

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
      box-shadow: var(--shadow-light);

      :deep(.van-tab) {
        font-size: 13px;
        font-weight: 500;
      }

      :deep(.van-tabs__line) {
        border-radius: 2px;
      }
    }
  }

  .list-section {
    padding: 0 16px;

    .collection-list {
      .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 60px 20px;

        .empty-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--van-orange-1) 0%, var(--van-orange-3) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          color: var(--color-warning);
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
          color: var(--color-text-secondary);
          margin-bottom: 20px;
        }

        .empty-btn {
          padding: 10px 24px;
          border-radius: 20px;
          border: none;
          background: var(--gradient-primary);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(25, 137, 250, 0.3);
          transition: all 0.2s;

          &:active {
            transform: scale(0.97);
          }
        }
      }

      .collection-card {
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

          .card-top-actions {
            display: flex;
            align-items: center;
            gap: 8px;

            .note-badge {
              display: flex;
              align-items: center;
              gap: 3px;
              font-size: 11px;
              color: var(--color-primary);
              background: color-mix(in srgb, var(--color-primary) 10%, transparent);
              padding: 3px 8px;
              border-radius: 6px;
              font-weight: 500;
            }

            .star-icon {
              color: var(--color-warning);
              cursor: pointer;
            }
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

              &.primary {
                background: var(--gradient-warning);
                color: #fff;
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
      background: var(--gradient-primary);
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(25, 137, 250, 0.3);
      transition: all 0.2s;

      &:active {
        transform: scale(0.98);
      }
    }
  }

  .question-detail-popup,
  .note-editor-popup {
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

[data-theme="dark"] .collection-page {
  --gradient-warning: linear-gradient(135deg, var(--van-orange-3) 0%, var(--van-orange-5) 100%);
  --gradient-primary-light: linear-gradient(135deg, var(--van-blue-3) 0%, var(--color-primary) 100%);
  --gradient-info: linear-gradient(135deg, var(--van-blue-2) 0%, var(--van-blue-4) 100%);
  --gradient-primary: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%);
}
</style>
