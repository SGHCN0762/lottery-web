<template>
  <div class="classical-essays-page">
    <van-loading v-if="loading" class="loading-center" />

    <div v-else class="page-content">
      <div class="page-header">
        <div class="stats-bar">
          <div class="stat-item">
            <span class="stat-value">{{ totalCount }}</span>
            <span class="stat-label">总篇目</span>
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
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value favorite">{{ favoriteCount }}</span>
            <span class="stat-label">收藏</span>
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
          placeholder="搜索文言文、作者、朝代..."
          shape="round"
        />
      </div>

      <div class="mode-buttons">
        <button class="mode-btn learn-btn" @click="goToLearn">
          <div class="mode-btn-content">
            <span class="mode-icon">📖</span>
            <div class="mode-text-group">
              <span class="mode-title">学习模式</span>
              <span class="mode-desc">按阶段系统学习</span>
            </div>
          </div>
        </button>
        <button class="mode-btn practice-btn" @click="goToPractice">
          <div class="mode-btn-content">
            <span class="mode-icon">✍️</span>
            <div class="mode-text-group">
              <span class="mode-title">练习模式</span>
              <span class="mode-desc">填空选择巩固</span>
            </div>
          </div>
        </button>
      </div>

      <FilterTabs
        v-model:activeStage="activeStage"
      />

      <div class="items-list">
        <div v-if="filteredItems.length > 0" class="items-grid">
          <ItemCard
            v-for="item in filteredItems"
            :key="item.id"
            :item="item"
            :mastered="isMastered(item.id)"
            @click="handleItemClick(item)"
          />
        </div>
        <div v-else class="empty-tip">
          <van-empty description="没有找到相关文言文" />
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
import { Search as VanSearch, Loading as VanLoading, Empty as VanEmpty } from 'vant';
import FilterTabs from './components/FilterTabs.vue';
import ItemCard from './components/ItemCard.vue';
import ItemDetail from './components/ItemDetail.vue';
import { useClassicalEssays } from './hooks/useClassicalEssays';

const router = useRouter();

const {
  filteredItems,
  activeStage,
  searchKeyword,
  selectedItem,
  totalCount,
  learnedCount,
  masteredCount,
  favoriteCount,
  progressPercent,
  isMastered,
  isFavorite,
  markMastered,
  unmarkMastered,
  toggleFavorite,
  setActiveStage,
  selectItem,
  loading,
} = useClassicalEssays();

const goToLearn = () => {
  router.push('/tools/classical-essays/learn');
};

const goToPractice = () => {
  router.push('/tools/classical-essays/practice');
};

const handleItemClick = (item) => {
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
.classical-essays-page {
  min-height: 100%;
  background: var(--color-bg-primary);
}

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
  gap: var(--spacing-sm);
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

  &.favorite {
    color: var(--van-red-500);
  }
}

.stat-label {
  font-size: 10px;
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
    font-size: 10px;
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

.items-list {
  flex: 1;
  padding: var(--spacing-md);
  padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom, 0px));
  overflow-y: auto;
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