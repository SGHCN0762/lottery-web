<template>
  <div class="knowledge-page">
    <!-- 顶部标题区域 -->
    <div class="page-header">
      <div class="header-bg-decoration">
        <div class="bg-circle circle-1"></div>
        <div class="bg-circle circle-2"></div>
      </div>
      <div class="header-content">
        <div class="header-text">
          <h1 class="page-title">知识点</h1>
          <p class="page-subtitle">系统学习，逐个击破</p>
        </div>
      </div>
    </div>

    <!-- 分类选择 -->
    <div class="category-section">
      <div class="section-header">
        <h2 class="section-title">选择模块</h2>
        <span class="section-count">{{ categories.length }}个模块</span>
      </div>
      <div class="category-grid">
        <div
          v-for="(cat, index) in categories"
          :key="cat.key"
          class="category-card"
          :class="{ active: selectedCategory === cat.key }"
          :style="selectedCategory === cat.key ? { background: getCategoryGradient(index), borderColor: getCategoryColor(index) } : {}"
          @click="selectCategory(cat.key)"
        >
          <div class="category-icon" :style="{ background: getCategoryColor(index) + '20' }">
            {{ cat.icon }}
          </div>
          <div class="category-info">
            <div class="category-name">{{ cat.name }}</div>
            <div class="category-count">{{ cat.topicCount }}个知识点</div>
          </div>
          <van-icon v-if="selectedCategory === cat.key" name="success" class="check-icon" />
        </div>
      </div>
    </div>

    <!-- 子分类选择 -->
    <div v-if="selectedCategory && subcategories.length > 0" class="subcategory-section">
      <div class="section-header">
        <h2 class="section-title">选择章节</h2>
        <span class="section-count">{{ subcategories.length }}个章节</span>
      </div>
      <div class="subcategory-list">
        <div
          v-for="sub in subcategories"
          :key="sub.key"
          class="subcategory-item"
          :class="{ active: selectedSubcategory === sub.key }"
          @click="selectSubcategory(sub.key)"
        >
          <div class="sub-icon">
            <span>{{ sub.icon }}</span>
          </div>
          <div class="sub-info">
            <div class="sub-name">{{ sub.name }}</div>
            <div class="sub-count">{{ getTopicCount(sub.key) }}个知识点</div>
          </div>
          <van-icon name="arrow" class="sub-arrow" />
        </div>
      </div>
    </div>

    <!-- 知识点列表 -->
    <div v-if="selectedSubcategory && topics.length > 0" class="topic-section">
      <div class="section-header">
        <h2 class="section-title">知识点列表</h2>
        <span class="section-count">{{ topics.length }}个知识点</span>
      </div>
      <div class="topic-list">
        <div
          v-for="topic in topics"
          :key="topic.key"
          class="topic-item"
          @click="startPractice(topic)"
        >
          <div class="topic-icon">
            <van-icon name="bookmark-o" />
          </div>
          <div class="topic-info">
            <div class="topic-name">{{ topic.name }}</div>
            <div class="topic-desc">{{ topic.description }}</div>
          </div>
          <div class="topic-action">
            <van-icon name="play-circle" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { showToast } from 'vant';
import { knowledgeCategories } from '../data/knowledgePoints.js';

const { t } = useI18n();
const router = useRouter();

const categoryColors = [
  '#667eea',
  '#764ba2',
  '#f093fb',
  '#4facfe',
  '#43e97b',
];

const loading = ref(false);
const selectedCategory = ref(null);
const selectedSubcategory = ref(null);

const getCategoryColor = (index) => {
  return categoryColors[index % categoryColors.length];
};

const getCategoryGradient = (index) => {
  const color = categoryColors[index % categoryColors.length];
  return `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`;
};

const categories = computed(() => {
  const result = [];
  for (const [key, cat] of Object.entries(knowledgeCategories)) {
    const topicCount = Object.keys(cat.subcategories || {}).reduce((sum, subKey) => {
      const sub = cat.subcategories[subKey];
      return sum + Object.keys(sub.topics || {}).length;
    }, 0);
    result.push({
      key,
      icon: cat.icon,
      name: cat.name,
      topicCount
    });
  }
  return result;
});

const subcategories = computed(() => {
  if (!selectedCategory.value) return [];
  const cat = knowledgeCategories[selectedCategory.value];
  if (!cat || !cat.subcategories) return [];
  return Object.entries(cat.subcategories).map(([key, sub]) => ({
    key,
    icon: sub.icon,
    name: sub.name,
    topics: sub.topics || {}
  }));
});

const topics = computed(() => {
  if (!selectedSubcategory.value) return [];
  const cat = knowledgeCategories[selectedCategory.value];
  if (!cat || !cat.subcategories) return [];
  const sub = cat.subcategories[selectedSubcategory.value];
  if (!sub || !sub.topics) return [];
  return Object.entries(sub.topics).map(([key, topic]) => ({
    key,
    name: topic.name,
    description: topic.description,
    examples: topic.examples || []
  }));
});

const getTopicCount = (subcategoryKey) => {
  const cat = knowledgeCategories[selectedCategory.value];
  if (!cat || !cat.subcategories) return 0;
  const sub = cat.subcategories[subcategoryKey];
  if (!sub || !sub.topics) return 0;
  return Object.keys(sub.topics).length;
};

const selectCategory = (key) => {
  selectedCategory.value = key;
  selectedSubcategory.value = null;
};

const selectSubcategory = (key) => {
  selectedSubcategory.value = key;
};

const startPractice = (topic) => {
  router.push({
    name: 'ExamPrepPractice',
    query: {
      mode: 'knowledge',
      knowledgePoint: topic.key
    }
  });
};

onMounted(() => {
});
</script>

<style lang="less" scoped>
.knowledge-page {
  .page-header {
    position: relative;
    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
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

  .category-section,
  .subcategory-section,
  .topic-section {
    padding: 16px;
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    .section-title {
      font-size: 16px;
      font-weight: 700;
      color: #111827;
      margin: 0;
    }

    .section-count {
      font-size: 12px;
      color: #9ca3af;
      font-weight: 500;
    }
  }

  .category-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;

    .category-card {
      background: var(--color-bg-secondary);
      border-radius: 16px;
      padding: 16px;
      border: 2px solid transparent;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      display: flex;
      flex-direction: column;
      gap: 12px;
      position: relative;

      &:active {
        transform: scale(0.98);
      }

      &.active {
        border-color: #8b5cf6;
        color: #fff;
        box-shadow: 0 8px 24px rgba(139, 92, 246, 0.3);

        .category-name,
        .category-count {
          color: #fff;
        }

        .category-count {
          opacity: 0.85;
        }
      }

      .category-icon {
        width: 48px;
        height: 48px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        background: #f3f4f6;
      }

      .category-info {
        .category-name {
          font-size: 15px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 4px;
        }

        .category-count {
          font-size: 12px;
          color: #9ca3af;
        }
      }

      .check-icon {
        position: absolute;
        top: 12px;
        right: 12px;
        font-size: 18px;
        color: #fff;
      }
    }
  }

  .subcategory-list {
    background: var(--color-bg-secondary);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

    .subcategory-item {
      display: flex;
      align-items: center;
      padding: 14px 16px;
      cursor: pointer;
      transition: all 0.2s;
      border-bottom: 1px solid #f3f4f6;

      &:last-child {
        border-bottom: none;
      }

      &:active {
        background: #f9fafb;
      }

      &.active {
        background: #faf5ff;

        .sub-name {
          color: #7c3aed;
        }

        .sub-icon {
          background: rgba(139, 92, 246, 0.1);
        }
      }

      .sub-icon {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: #f3f4f6;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        margin-right: 12px;
        flex-shrink: 0;
      }

      .sub-info {
        flex: 1;
        min-width: 0;

        .sub-name {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 3px;
        }

        .sub-count {
          font-size: 12px;
          color: #9ca3af;
        }
      }

      .sub-arrow {
        color: #d1d5db;
        font-size: 14px;
        flex-shrink: 0;
      }
    }
  }

  .topic-list {
    background: var(--color-bg-secondary);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

    .topic-item {
      display: flex;
      align-items: center;
      padding: 14px 16px;
      cursor: pointer;
      transition: all 0.2s;
      border-bottom: 1px solid #f3f4f6;

      &:last-child {
        border-bottom: none;
      }

      &:active {
        background: #f9fafb;
      }

      .topic-icon {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        background: linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 14px;
        margin-right: 12px;
        flex-shrink: 0;
      }

      .topic-info {
        flex: 1;
        min-width: 0;

        .topic-name {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 2px;
        }

        .topic-desc {
          font-size: 12px;
          color: #9ca3af;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }

      .topic-action {
        color: #8b5cf6;
        font-size: 22px;
        flex-shrink: 0;
      }
    }
  }
}
</style>
