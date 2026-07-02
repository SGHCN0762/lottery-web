<template>
  <div class="idiom-learning-page">
    <van-loading v-if="loading" class="loading-center" />

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
      <div class="search-section">
        <van-search
          v-model="searchKeyword"
          :placeholder="t('tools.idiomLearning.searchPlaceholder')"
          shape="round"
        />
      </div>

      <CategoryTabs v-model="activeCategory" :categories="idiomCategories" />

      <div class="idioms-list">
        <div v-if="filteredIdioms.length > 0" class="idioms-grid">
          <IdiomCard
            v-for="idiom in filteredIdioms"
            :key="idiom.id"
            :idiom="idiom"
            :is-learned="isLearned(idiom.id)"
            :is-mastered="isMastered(idiom.id)"
            @click="handleIdiomClick"
          />
        </div>
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
import { useI18n } from 'vue-i18n';
import { Search as VanSearch, Loading as VanLoading } from 'vant';
import CategoryTabs from './components/CategoryTabs.vue';
import IdiomCard from './components/IdiomCard.vue';
import IdiomDetail from './components/IdiomDetail.vue';
import PracticeMode from './components/PracticeMode.vue';
import { useIdiomLearning } from './hooks/useIdiomLearning';

const { t } = useI18n();

const {
  filteredIdioms,
  activeCategory,
  searchKeyword,
  currentView,
  selectedIdiom,
  currentPracticeIdiom,
  practiceScore,
  practiceCount,
  isLearned,
  isMastered,
  markMastered,
  unmarkMastered,
  setCurrentView,
  selectIdiom,
  startPractice,
  nextPracticeIdiom,
  recordPractice,
  idiomCategories,
  loading,
} = useIdiomLearning();

const handleIdiomClick = (idiom) => {
  selectIdiom(idiom);
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
  padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom, 0px));
}

.search-section {
  padding: var(--spacing-md);
}

.idioms-list {
  padding: 0 var(--spacing-md);
}

.idioms-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.empty-tip {
  text-align: center;
  padding: var(--spacing-xl) 0;
  color: var(--color-text-tertiary);
  font-size: var(--font-size-sm);
}
</style>