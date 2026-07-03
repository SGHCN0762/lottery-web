<template>
  <div class="idiom-learning-page">
    <van-loading v-if="loading" class="loading-center" />

    <LearnMode
      v-else-if="currentView === 'learn'"
      :learned-ids="learnedIdsList"
      :mastered-ids="masteredIdsList"
      @back="setCurrentView('browse')"
      @mark-learned="handleMarkLearned"
      @toggle-mastered="handleToggleMaster"
    />

    <PracticeMode
      v-else-if="currentView === 'practice'"
      :idiom="currentPracticeIdiom"
      :score="practiceScore"
      :count="practiceCount"
      @back="setCurrentView('browse')"
      @submit="handlePracticeSubmit"
      @next="nextPracticeIdiom"
    />

    <div v-else class="browse-content">
      <div class="page-header">
        <div class="stats-bar">
          <div class="stat-item">
            <span class="stat-value">{{ totalCount }}</span>
            <span class="stat-label">总成语</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value learned">{{ learnedCount }}</span>
            <span class="stat-label">已学习</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value mastered">{{ masteredCount }}</span>
            <span class="stat-label">已掌握</span>
          </div>
        </div>
        <div class="progress-ring" v-if="totalCount > 0">
          <div class="ring-track"></div>
          <div class="ring-fill" :style="{ '--p': progressPercent }"></div>
          <span class="ring-text">{{ progressPercent }}%</span>
        </div>
      </div>

      <div class="search-section">
        <van-search
          v-model="searchKeyword"
          :placeholder="t('tools.idiomLearning.searchPlaceholder')"
          shape="round"
        />
      </div>

      <div class="mode-buttons">
        <button class="mode-btn learn-btn" @click="setCurrentView('learn')">
          <div class="mode-btn-content">
            <span class="mode-icon">📖</span>
            <div class="mode-text-group">
              <span class="mode-title">学习模式</span>
              <span class="mode-desc">分阶段系统学习</span>
            </div>
          </div>
        </button>
        <button class="mode-btn practice-btn" @click="startPractice">
          <div class="mode-btn-content">
            <span class="mode-icon">✍️</span>
            <div class="mode-text-group">
              <span class="mode-title">练习模式</span>
              <span class="mode-desc">选择题巩固练习</span>
            </div>
          </div>
        </button>
      </div>

      <CategoryTabs v-model="activeTag" :categories="idiomCategories" />

      <div class="idioms-list">
        <IdiomVirtualList
          v-if="filteredIdioms.length > 0"
          :items="filteredIdioms"
          @item-click="handleIdiomClick"
        />
        <div v-else class="empty-tip">
          <p>没有找到相关成语</p>
        </div>
      </div>
    </div>

    <IdiomDetail
      :show="!!selectedIdiom"
      :idiom="selectedIdiom"
      :is-mastered="selectedIdiom ? isMastered(selectedIdiom.id) : false"
      @update:show="selectIdiom(null)"
      @toggle-master="handleToggleMaster"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Search as VanSearch, Loading as VanLoading } from 'vant';
import CategoryTabs from './components/CategoryTabs.vue';
import IdiomCard from './components/IdiomCard.vue';
import IdiomVirtualList from './components/IdiomVirtualList.vue';
import IdiomDetail from './components/IdiomDetail.vue';
import PracticeMode from './components/PracticeMode.vue';
import LearnMode from './components/LearnMode.vue';
import { useIdiomLearning } from './hooks/useIdiomLearning';

const { t } = useI18n();

const {
  filteredIdioms,
  activeTag,
  searchKeyword,
  currentView,
  selectedIdiom,
  currentPracticeIdiom,
  practiceScore,
  practiceCount,
  totalCount,
  learnedCount,
  masteredCount,
  progressPercent,
  isLearned,
  isMastered,
  markLearned,
  markMastered,
  unmarkMastered,
  setCurrentView,
  selectIdiom,
  startPractice,
  nextPracticeIdiom,
  recordPractice,
  loading,
} = useIdiomLearning();

const learnedIdsList = computed(() => {
  return JSON.parse(localStorage.getItem('idiom_learned_ids') || '[]');
});

const masteredIdsList = computed(() => {
  return JSON.parse(localStorage.getItem('idiom_mastered_ids') || '[]');
});

const idiomCategories = {
  primary: { name: '小学', icon: '👶', description: '小学必会成语' },
  middle: { name: '初中', icon: '🧑', description: '初中必会成语' },
  high: { name: '高中', icon: '👨', description: '高中必会成语' },
  civil: { name: '公考', icon: '💼', description: '公务员考试常考' }
};

const handleIdiomClick = (idiom) => {
  selectIdiom(idiom);
};

const handleMarkLearned = (id) => {
  markLearned(id);
};

const handleToggleMaster = (id) => {
  if (isMastered(id)) {
    unmarkMastered(id);
  } else {
    markMastered(id);
  }
};

const handlePracticeSubmit = (id, correct) => {
  recordPractice(id, correct);
};
</script>

<style lang="less" scoped>
.idiom-learning-page {
  min-height: 100%;
  background: var(--color-bg-primary);
}

.loading-center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.browse-content {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-md);
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.stats-bar {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.stat-value {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: 1;

  &.learned {
    color: var(--color-primary);
  }

  &.mastered {
    color: var(--color-success);
  }
}

.stat-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.stat-divider {
  width: 1px;
  height: 24px;
  background: var(--color-border);
}

.progress-ring {
  position: relative;
  width: 48px;
  height: 48px;
  flex-shrink: 0;

  .ring-track {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--color-bg-tertiary);
  }

  .ring-fill {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: conic-gradient(var(--color-success) calc(var(--p) * 1%), transparent 0);
    mask: radial-gradient(circle, transparent 58%, black 60%);
    -webkit-mask: radial-gradient(circle, transparent 58%, black 60%);
    transition: background 0.5s ease;
  }

  .ring-text {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
  }
}

.search-section {
  padding: var(--spacing-md);
  flex-shrink: 0;
}

.mode-buttons {
  display: flex;
  gap: var(--spacing-md);
  padding: 0 var(--spacing-md) var(--spacing-md);
  flex-shrink: 0;
}

.mode-btn {
  flex: 1;
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-bg-secondary);
  cursor: pointer;
  transition: all var(--transition-base);
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    opacity: 0;
    transition: opacity var(--transition-base);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
}

.learn-btn {
  &::before {
    background: var(--color-primary);
  }

  &:hover {
    border-color: var(--color-primary);

    &::before {
      opacity: 1;
    }
  }
}

.practice-btn {
  &::before {
    background: var(--color-success);
  }

  &:hover {
    border-color: var(--color-success);

    &::before {
      opacity: 1;
    }
  }
}

.mode-btn-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.mode-icon {
  font-size: var(--font-size-xl);
  flex-shrink: 0;
}

.mode-text-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.mode-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.mode-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.learn-btn .mode-title {
  color: var(--color-primary);
}

.practice-btn .mode-title {
  color: var(--color-success);
}

.idioms-list {
  flex: 1;
  padding: 0 var(--spacing-md);
  padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom, 0px));
  overflow: hidden;
}

.empty-tip {
  text-align: center;
  padding: var(--spacing-xl) 0;
  color: var(--color-text-tertiary);
  font-size: var(--font-size-sm);
}
</style>
