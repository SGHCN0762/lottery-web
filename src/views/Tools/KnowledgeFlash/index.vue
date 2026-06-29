<template>
  <div class="knowledge-flash-page">
    <div class="page-content" v-if="!loading">
      <div class="category-tabs">
        <van-tabs v-model:active="activeCategory" @change="onTabChange">
          <van-tab
            v-for="(category, key) in categories"
            :key="key"
            :title="category.name"
            :name="key"
          ></van-tab>
        </van-tabs>
      </div>

      <SubcategoryTabs
        v-if="currentCategory"
        :subcategories="currentCategory.subcategories"
        :active-subcategory="activeSubcategory"
        @select="selectSubcategory"
      />

      <div class="topics-section" v-if="currentSubcategory">
        <div class="topics-grid">
          <TopicCard
            v-for="(topic, topicKey) in currentTopics"
            :key="topicKey"
            :topic="topic"
            @click="showTopicDetail(topic)"
          />
        </div>
      </div>

      <TopicDetail
        :show="showDetail"
        :topic="selectedTopic"
        @update:show="showDetail = $event"
      />
    </div>
    <div v-else class="loading-state">
      <van-loading>加载中...</van-loading>
    </div>
  </div>
</template>

<script setup>
import { Tabs as VanTabs, Tab as VanTab, Loading as VanLoading } from 'vant';
import { useKnowledgeFlash } from './hooks/useKnowledgeFlash';
import SubcategoryTabs from './components/SubcategoryTabs.vue';
import TopicCard from './components/TopicCard.vue';
import TopicDetail from './components/TopicDetail.vue';

const {
  categories,
  activeCategory,
  activeSubcategory,
  loading,
  showDetail,
  selectedTopic,
  currentCategory,
  currentSubcategory,
  currentTopics,
  onTabChange,
  selectSubcategory,
  showTopicDetail
} = useKnowledgeFlash();
</script>

<style lang="less" scoped>
.knowledge-flash-page {
}

.page-content {
}

.category-tabs {
  background: var(--color-bg-secondary);
  margin-bottom: var(--spacing-md);
}

.topics-section {
  padding: 0 var(--spacing-md);

  .topics-grid {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
}

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}
</style>
