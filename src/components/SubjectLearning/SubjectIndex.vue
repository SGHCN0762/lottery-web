<template>
  <div class="subject-page">
    <van-loading v-if="loading" class="loading-center" />

    <div v-else class="page-content">
      <div class="page-header">
        <div class="stats-card">
          <div class="stat-col">
            <span class="stat-value">{{ totalCount }}</span>
            <span class="stat-label">{{ t('tools.' + subjectKey + '.stats.total') }}</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-col">
            <span class="stat-value">{{ learnedCount }}</span>
            <span class="stat-label">{{ t('tools.' + subjectKey + '.stats.learned') }}</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-col">
            <span class="stat-value">{{ masteredCount }}</span>
            <span class="stat-label">{{ t('tools.' + subjectKey + '.stats.mastered') }}</span>
          </div>
          <div class="action-col">
            <button class="btn-learn" @click="goToLearn">{{ t('tools.' + subjectKey + '.modes.learn') }}</button>
            <button class="btn-practice" @click="goToPractice">{{ t('tools.' + subjectKey + '.modes.practice') }}</button>
          </div>
        </div>

        <FilterTabs v-model="activeStage" :tabs="filterTabs" class="tabs" />
      </div>

      <div class="items-list">
        <div v-if="filteredItems.length > 0" class="items-list-scroll">
          <VirtualList :items="filteredItems" :item-height="80">
            <template #default="{ item }">
              <ItemCard
                :key="item.id"
                :item="item"
                :mastered="isMastered(item.id)"
                @click="handleItemClick(item)"
              />
            </template>
          </VirtualList>
        </div>
        <div v-else class="empty-tip">
          <van-empty :description="t('tools.' + subjectKey + '.empty')" />
        </div>
      </div>
    </div>

    <ItemDetail
      :show="!!selectedItem"
      :item="selectedItem"
      :isMastered="selectedItem ? isMastered(selectedItem.id) : false"
      :isFavorite="selectedItem ? isFavorite(selectedItem.id) : false"
      @update:show="selectItem(null)"
      @toggle-master="handleToggleMaster"
      @toggle-favorite="handleToggleFavorite"
    />
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Loading as VanLoading, Empty as VanEmpty } from 'vant';
  import FilterTabs from '@/components/FilterTabs/index.vue';
  import ItemCard from './components/ItemCard.vue';
  import ItemDetail from './components/ItemDetail.vue';
  import VirtualList from './components/VirtualList.vue';
  import { useSubjectLearning } from './hooks/useSubjectLearning.js';

  const props = defineProps({
    subjectKey: {
      type: String,
      required: true,
    },
    allData: {
      type: Array,
      required: true,
    },
    learnRoute: {
      type: String,
      required: true,
    },
    practiceRoute: {
      type: String,
      required: true,
    },
  });

  const router = useRouter();
  const { t } = useI18n();

  const {
    filteredItems,
    activeStage,
    selectedItem,
    totalCount,
    learnedCount,
    masteredCount,
    stages,
    isMastered,
    isFavorite,
    markMastered,
    unmarkMastered,
    toggleFavorite,
    selectItem,
    loading,
  } = useSubjectLearning(props.subjectKey, props.allData);

  const filterTabs = computed(() => {
    return Object.entries(stages.value).map(([value, label]) => ({
      value,
      label
    }));
  });

  const goToLearn = () => {
    router.push(props.learnRoute);
  };

  const goToPractice = () => {
    router.push(props.practiceRoute);
  };

  const handleItemClick = item => {
    selectItem(item);
  };

  const handleToggleMaster = () => {
    if (!selectedItem.value) return;
    if (isMastered(selectedItem.value.id)) {
      unmarkMastered(selectedItem.value.id);
    } else {
      markMastered(selectedItem.value.id);
    }
  };

  const handleToggleFavorite = () => {
    if (!selectedItem.value) return;
    toggleFavorite(selectedItem.value.id);
  };
</script>

<style lang="less" scoped>

  .loading-center {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .page-content {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .page-header {
    flex-shrink: 0;
  }

  .stats-card {
    display: flex;
    align-items: center;
    background: var(--color-bg-card);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md);
    margin: var(--spacing-md);
    box-shadow: var(--shadow-light);
  }

  .tabs {
    margin: 0 var(--spacing-md) var(--spacing-md);
  }

  .stat-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .stat-value {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
  }

  .stat-label {
    font-size: 10px;
    color: var(--color-text-tertiary);
  }

  .stat-divider {
    width: 1px;
    height: 40px;
    background: var(--color-border);
  }

  .action-col {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-left: var(--spacing-lg);
    border-left: 1px solid var(--color-border);
  }

  .btn-learn {
    padding: 8px 16px;
    border-radius: var(--radius-md);
    border: none;
    background: var(--color-primary);
    color: #fff;
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    cursor: pointer;
    transition: opacity var(--transition-fast);

    &:hover {
      opacity: 0.9;
    }
  }

  .btn-practice {
    padding: 8px 16px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background: var(--color-bg-tertiary);
    color: var(--color-text-secondary);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    cursor: pointer;
    transition: all var(--transition-fast);

    &:hover {
      border-color: var(--color-primary);
      color: var(--color-primary);
    }
  }

  .items-list {
    flex: 1;
    padding: 0 var(--spacing-md) var(--spacing-md);
    overflow: hidden;
  }

  .items-list-scroll {
    height: 100%;
  }

  .items-grid {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .empty-tip {
    text-align: center;
    padding: var(--spacing-xl) 0;
  }
</style>
