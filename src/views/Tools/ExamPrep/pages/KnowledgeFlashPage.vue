<template>
  <div class="knowledge-flash-page">
    <div class="page-header">
      <div class="header-bg"></div>
      <div class="header-content">
        <div class="header-icon">📚</div>
        <div class="header-text">
          <h1 class="page-title">{{ t('tools.examPrep.knowledgeFlash.title') }}</h1>
          <p class="page-subtitle">{{ t('tools.examPrep.knowledgeFlash.subtitle') }}</p>
        </div>
      </div>
      <van-search
        v-model="searchQuery"
        placeholder="搜索知识点..."
        class="search-bar"
        show-action
        @search="handleSearch"
      />
    </div>

    <div class="category-tabs">
      <div class="tabs-scroll">
        <div
          v-for="cat in allCategories"
          :key="cat.key"
          class="tab-item"
          :class="{ active: selectedCategory === cat.key }"
          @click="selectCategory(cat.key)"
        >
          <span class="tab-icon">{{ cat.icon }}</span>
          <span class="tab-name">{{ cat.name }}</span>
        </div>
      </div>
    </div>

    <div class="subcategory-filter" v-if="selectedCategory && subcategories.length > 0">
      <van-tag
        v-for="sub in subcategories"
        :key="sub.key"
        :class="{ active: selectedSubcategory === sub.key }"
        @click="selectSubcategory(sub.key)"
      >
        {{ sub.icon }} {{ sub.name }}
      </van-tag>
    </div>

    <div class="progress-bar">
      <div class="progress-info">
        <span>已掌握</span>
        <span class="progress-count">{{ masteredCount }}/{{ totalCount }}</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>
    </div>

    <div class="topic-grid">
      <div
        v-for="topic in filteredTopics"
        :key="topic.key"
        class="topic-card"
        :class="{ mastered: isMastered(topic.key) }"
        @click="showTopicDetail(topic)"
      >
        <div class="card-header">
          <span class="card-icon">{{ getCategoryIcon(topic.category) }}</span>
          <span class="card-badge">{{ getSubcategoryName(topic) }}</span>
        </div>
        <h3 class="card-title">{{ topic.name }}</h3>
        <p class="card-desc">{{ topic.description }}</p>
        <div class="card-mnemonic" v-if="topic.mnemonic">
          <span class="mnemonic-icon">🔑</span>
          <span class="mnemonic-text">{{ topic.mnemonic }}</span>
        </div>
        <div class="card-tags">
          <span class="tag" v-if="topic.keyPoints && topic.keyPoints.length">{{ topic.keyPoints.length }}要点</span>
          <span class="tag" v-if="topic.formulas && topic.formulas.length">{{ topic.formulas.length }}公式</span>
        </div>
        <div class="card-action">
          <van-icon name="arrow-right" />
        </div>
      </div>
    </div>

    <div class="empty-state" v-if="filteredTopics.length === 0">
      <div class="empty-icon">🔍</div>
      <p class="empty-text">没有找到相关知识点</p>
    </div>

    <van-popup v-model:show="showDetail" position="bottom" :style="{ height: '85%' }">
      <div class="detail-popup" v-if="currentTopic">
        <div class="detail-header">
          <div class="detail-category">
            <span class="category-icon">{{ getCategoryIcon(currentTopic.category) }}</span>
            <span class="category-name">{{ getFullPath(currentTopic) }}</span>
          </div>
          <van-button icon="close" @click="closeDetail" />
        </div>
        <div class="detail-content">
          <h2 class="detail-title">{{ currentTopic.name }}</h2>
          <p class="detail-desc">{{ currentTopic.description }}</p>

          <div class="section" v-if="currentTopic.mnemonic">
            <div class="section-header">
              <span class="section-icon">🔑</span>
              <span class="section-title">速记口诀</span>
            </div>
            <div class="mnemonic-box">
              {{ currentTopic.mnemonic }}
            </div>
          </div>

          <div class="section" v-if="currentTopic.keyPoints && currentTopic.keyPoints.length">
            <div class="section-header">
              <span class="section-icon">⭐</span>
              <span class="section-title">核心要点</span>
            </div>
            <ul class="point-list">
              <li v-for="(point, index) in currentTopic.keyPoints" :key="index" class="point-item">
                <span class="point-number">{{ index + 1 }}</span>
                <span class="point-text">{{ point }}</span>
              </li>
            </ul>
          </div>

          <div class="section" v-if="currentTopic.formulas && currentTopic.formulas.length">
            <div class="section-header">
              <span class="section-icon">📐</span>
              <span class="section-title">核心公式</span>
            </div>
            <ul class="formula-list">
              <li v-for="(formula, index) in currentTopic.formulas" :key="index" class="formula-item">
                <span class="formula-number">{{ index + 1 }}</span>
                <span class="formula-text">{{ formula }}</span>
              </li>
            </ul>
          </div>

          <div class="section" v-if="currentTopic.examples && currentTopic.examples.length">
            <div class="section-header">
              <span class="section-icon">💡</span>
              <span class="section-title">典型例题</span>
            </div>
            <ul class="example-list">
              <li v-for="(example, index) in currentTopic.examples" :key="index" class="example-item">
                <span class="example-bullet">•</span>
                <span class="example-text">{{ example }}</span>
              </li>
            </ul>
          </div>

          <div class="section" v-if="currentTopic.pitfalls && currentTopic.pitfalls.length">
            <div class="section-header">
              <span class="section-icon">⚠️</span>
              <span class="section-title">易错点</span>
            </div>
            <ul class="pitfall-list">
              <li v-for="(pitfall, index) in currentTopic.pitfalls" :key="index" class="pitfall-item">
                <span class="pitfall-icon">✗</span>
                <span class="pitfall-text">{{ pitfall }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="detail-footer">
          <van-button
            :class="{ mastered: isMastered(currentTopic.key) }"
            block
            @click="toggleMaster(currentTopic.key)"
          >
            {{ isMastered(currentTopic.key) ? '已掌握 ✓' : '标记掌握' }}
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { Icon as VanIcon, Search as VanSearch, Tag as VanTag, Button as VanButton, Popup as VanPopup } from 'vant';
import { knowledgeCategories, flatTopicList } from '../data/knowledgePoints.js';

const { t } = useI18n();

const searchQuery = ref('');
const selectedCategory = ref(null);
const selectedSubcategory = ref(null);
const showDetail = ref(false);
const currentTopic = ref(null);
const masteredTopics = ref(new Set());

const allCategories = computed(() => {
  const result = [{ key: 'all', name: '全部', icon: '📋' }];
  for (const [key, cat] of Object.entries(knowledgeCategories)) {
    result.push({
      key,
      name: cat.name,
      icon: cat.icon
    });
  }
  return result;
});

const subcategories = computed(() => {
  if (!selectedCategory.value || selectedCategory.value === 'all') return [];
  const cat = knowledgeCategories[selectedCategory.value];
  if (!cat || !cat.subcategories) return [];
  return Object.entries(cat.subcategories).map(([key, sub]) => ({
    key,
    name: sub.name,
    icon: sub.icon
  }));
});

const filteredTopics = computed(() => {
  let topics = flatTopicList;
  
  if (selectedCategory.value && selectedCategory.value !== 'all') {
    topics = topics.filter(t => t.category === selectedCategory.value);
  }
  
  if (selectedSubcategory.value) {
    topics = topics.filter(t => {
      const path = t.path;
      return path.some(p => p.key === selectedSubcategory.value);
    });
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    topics = topics.filter(t => 
      t.name.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.mnemonic.toLowerCase().includes(query) ||
      t.keyPoints.some(kp => kp.toLowerCase().includes(query))
    );
  }
  
  return topics;
});

const totalCount = computed(() => flatTopicList.length);
const masteredCount = computed(() => masteredTopics.value.size);
const progressPercent = computed(() => {
  if (totalCount.value === 0) return 0;
  return Math.round((masteredCount.value / totalCount.value) * 100);
});

const selectCategory = (key) => {
  selectedCategory.value = key;
  selectedSubcategory.value = null;
};

const selectSubcategory = (key) => {
  selectedSubcategory.value = selectedSubcategory.value === key ? null : key;
};

const handleSearch = () => {};

const showTopicDetail = (topic) => {
  currentTopic.value = topic;
  showDetail.value = true;
};

const closeDetail = () => {
  showDetail.value = false;
  currentTopic.value = null;
};

const isMastered = (key) => {
  return masteredTopics.value.has(key);
};

const toggleMaster = (key) => {
  if (masteredTopics.value.has(key)) {
    masteredTopics.value.delete(key);
  } else {
    masteredTopics.value.add(key);
  }
  localStorage.setItem('masteredTopics', JSON.stringify([...masteredTopics.value]));
};

const getCategoryIcon = (category) => {
  const icons = {
    verbal: '📝',
    logic: '🧠',
    math: '🔢',
    data: '📊',
    common: '📚'
  };
  return icons[category] || '📖';
};

const getSubcategoryName = (topic) => {
  if (topic.path && topic.path.length > 0) {
    return topic.path[topic.path.length - 1].name;
  }
  return '';
};

const getFullPath = (topic) => {
  if (topic.path) {
    return topic.path.map(p => p.name).join(' > ');
  }
  return '';
};

onMounted(() => {
  const saved = localStorage.getItem('masteredTopics');
  if (saved) {
    masteredTopics.value = new Set(JSON.parse(saved));
  }
});
</script>

<style lang="less" scoped>
.knowledge-flash-page {
  min-height: 100vh;
  background: var(--color-bg-primary);
  padding-bottom: env(safe-area-inset-bottom);

  .page-header {
    position: relative;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px 16px;
    padding-top: calc(20px + env(safe-area-inset-top));
    border-radius: 0 0 32px 32px;
    overflow: hidden;

    .header-bg {
      position: absolute;
      top: -50%;
      right: -20%;
      width: 200px;
      height: 200px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
    }

    .header-content {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;

      .header-icon {
        font-size: 36px;
      }

      .header-text {
        .page-title {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 4px;
        }

        .page-subtitle {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }
      }
    }

    .search-bar {
      position: relative;
      z-index: 1;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 12px;

      :deep(.van-search__content) {
        background: transparent;
      }

      :deep(.van-search__input) {
        color: #fff;
        placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }

  .category-tabs {
    padding: 16px;

    .tabs-scroll {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }

      .tab-item {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 8px 16px;
        background: var(--color-bg-secondary);
        border-radius: 20px;
        white-space: nowrap;
        cursor: pointer;
        transition: all 0.2s;
        border: 1px solid transparent;

        &:active {
          transform: scale(0.95);
        }

        &.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          border-color: #667eea;
        }

        .tab-icon {
          font-size: 16px;
        }

        .tab-name {
          font-size: 13px;
          font-weight: 500;
        }
      }
    }
  }

  .subcategory-filter {
    padding: 0 16px 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    :deep(.van-tag) {
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      color: var(--color-text-secondary);
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s;

      &.active {
        background: rgba(102, 126, 234, 0.1);
        border-color: #667eea;
        color: #667eea;
      }
    }
  }

  .progress-bar {
    margin: 0 16px 16px;
    padding: 12px 16px;
    background: var(--color-bg-secondary);
    border-radius: 12px;

    .progress-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 13px;
      color: var(--color-text-secondary);

      .progress-count {
        font-weight: 600;
        color: #667eea;
      }
    }

    .progress-track {
      height: 6px;
      background: #e5e7eb;
      border-radius: 3px;
      overflow: hidden;

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        border-radius: 3px;
        transition: width 0.3s;
      }
    }
  }

  .topic-grid {
    padding: 0 16px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .topic-card {
    background: var(--color-bg-secondary);
    border-radius: 16px;
    padding: 16px;
    border: 1px solid var(--color-border);
    cursor: pointer;
    transition: all 0.2s;
    position: relative;

    &:active {
      transform: scale(0.98);
    }

    &.mastered {
      border-color: #10b981;
      background: rgba(16, 185, 129, 0.05);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;

      .card-icon {
        font-size: 18px;
      }

      .card-badge {
        font-size: 11px;
        color: #667eea;
        background: rgba(102, 126, 234, 0.1);
        padding: 2px 8px;
        border-radius: 4px;
      }
    }

    .card-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--color-text-primary);
      margin: 0 0 4px;
    }

    .card-desc {
      font-size: 13px;
      color: var(--color-text-secondary);
      margin: 0 0 10px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .card-mnemonic {
      display: flex;
      align-items: flex-start;
      gap: 6px;
      background: rgba(251, 191, 36, 0.1);
      padding: 8px 10px;
      border-radius: 8px;
      margin-bottom: 10px;

      .mnemonic-icon {
        font-size: 14px;
        flex-shrink: 0;
      }

      .mnemonic-text {
        font-size: 12px;
        color: #b45309;
        line-height: 1.4;
      }
    }

    .card-tags {
      display: flex;
      gap: 6px;
      margin-bottom: 8px;

      .tag {
        font-size: 11px;
        color: #9ca3af;
        background: #f3f4f6;
        padding: 2px 8px;
        border-radius: 4px;
      }
    }

    .card-action {
      position: absolute;
      right: 16px;
      bottom: 16px;
      color: #667eea;
      font-size: 18px;
    }
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 20px;

    .empty-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }

    .empty-text {
      font-size: 14px;
      color: var(--color-text-secondary);
    }
  }

  .detail-popup {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;

    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--padding-md);
      border-bottom: 1px solid var(--color-border);

      .detail-category {
        display: flex;
        align-items: center;
        gap: 8px;

        .category-icon {
          font-size: 18px;
        }

        .category-name {
          font-size: 12px;
          color: var(--color-text-secondary);
        }
      }
    }

    .detail-content {
      flex: 1;
      overflow-y: auto;
      padding: 20px 16px;

      .detail-title {
        font-size: 20px;
        font-weight: 700;
        color: var(--color-text-primary);
        margin: 0 0 8px;
      }

      .detail-desc {
        font-size: 14px;
        color: var(--color-text-secondary);
        margin: 0 0 20px;
        line-height: 1.6;
      }

      .section {
        margin-bottom: 20px;

        .section-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;

          .section-icon {
            font-size: 16px;
          }

          .section-title {
            font-size: 15px;
            font-weight: 600;
            color: var(--color-text-primary);
          }
        }

        .mnemonic-box {
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(251, 191, 36, 0.05) 100%);
          border-left: 3px solid #fbbf24;
          padding: 12px 16px;
          border-radius: 0 8px 8px 0;
          font-size: 14px;
          color: #92400e;
          line-height: 1.6;
        }

        .point-list {
          margin: 0;
          padding: 0;
          list-style: none;

          .point-item {
            display: flex;
            gap: 10px;
            padding: 8px 0;
            border-bottom: 1px solid #f3f4f6;

            &:last-child {
              border-bottom: none;
            }

            .point-number {
              width: 24px;
              height: 24px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: #fff;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              font-weight: 600;
              flex-shrink: 0;
            }

            .point-text {
              font-size: 14px;
              color: var(--color-text-primary);
              line-height: 1.5;
            }
          }
        }

        .formula-list {
          margin: 0;
          padding: 0;
          list-style: none;

          .formula-item {
            display: flex;
            gap: 10px;
            padding: 10px 12px;
            background: #f9fafb;
            border-radius: 8px;
            margin-bottom: 8px;

            &:last-child {
              margin-bottom: 0;
            }

            .formula-number {
              width: 22px;
              height: 22px;
              background: #07c160;
              color: #fff;
              border-radius: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 11px;
              font-weight: 600;
              flex-shrink: 0;
            }

            .formula-text {
              font-size: 14px;
              color: #059669;
              font-family: 'Courier New', monospace;
            }
          }
        }

        .example-list {
          margin: 0;
          padding: 0;
          list-style: none;

          .example-item {
            display: flex;
            gap: 8px;
            padding: 6px 0;

            .example-bullet {
              color: #667eea;
              font-size: 16px;
              flex-shrink: 0;
            }

            .example-text {
              font-size: 14px;
              color: var(--color-text-secondary);
            }
          }
        }

        .pitfall-list {
          margin: 0;
          padding: 0;
          list-style: none;

          .pitfall-item {
            display: flex;
            gap: 8px;
            padding: 8px 12px;
            background: rgba(239, 68, 68, 0.05);
            border-radius: 8px;
            margin-bottom: 8px;

            &:last-child {
              margin-bottom: 0;
            }

            .pitfall-icon {
              color: #ef4444;
              font-size: 14px;
              flex-shrink: 0;
            }

            .pitfall-text {
              font-size: 14px;
              color: #dc2626;
            }
          }
        }
      }
    }

    .detail-footer {
      padding: 16px;
      border-top: 1px solid var(--color-border);
      padding-bottom: calc(16px + env(safe-area-inset-bottom));

      :deep(.van-button) {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #fff;
        border-radius: 12px;
        font-weight: 600;

        &.mastered {
          background: #10b981;
        }
      }
    }
  }
}
</style>