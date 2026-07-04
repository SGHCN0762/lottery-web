<template>
  <div class="learn-page">
    <van-loading v-if="loading" class="loading-center" />

    <div v-else class="learn-content">
      <!-- 顶部导航 -->
      <div class="learn-header">
        <div class="learn-progress">
          <span class="progress-text">{{ currentIndex + 1 }} / {{ learnItems.length }}</span>
          <div class="progress-bar">
            <div 
              class="progress-fill"
              :style="{ width: progressPercent + '%' }"
            ></div>
          </div>
        </div>
        <div class="learn-actions">
          <van-button size="small" type="default" @click="exitLearn">退出</van-button>
        </div>
      </div>

      <!-- 阶段选择 -->
      <div v-if="!learnStarted" class="start-screen">
        <h2 class="start-title">选择学习阶段</h2>
        <div class="stage-selector">
          <div
            v-for="(stage, key) in stages"
            :key="key"
            class="stage-card"
            :class="{ active: selectedStage === key }"
            @click="selectedStage = key"
          >
            <span class="stage-icon">{{ stage.icon }}</span>
            <span class="stage-name">{{ stage.name }}</span>
            <span class="stage-count">{{ getStageCount(key) }} 条</span>
          </div>
        </div>
        <div class="type-selector">
          <span class="selector-label">选择类型</span>
          <div class="type-options">
            <div
              v-for="(type, key) in types"
              :key="key"
              class="type-option"
              :class="{ active: selectedType === key }"
              @click="selectedType = key"
            >
              <span class="type-icon">{{ type.icon }}</span>
              <span class="type-name">{{ type.name }}</span>
            </div>
          </div>
        </div>
        <van-button type="primary" size="large" block @click="startLearning">
          开始学习
        </van-button>
      </div>

      <!-- 学习内容 -->
      <div v-else class="learn-card-container" v-if="currentItem">
        <div class="learn-card">
          <div class="card-type-badge">
            <template v-if="currentItem.type === 'quote'">名人名言</template>
            <template v-else-if="currentItem.type === 'poem'">古诗词</template>
            <template v-else>文言文</template>
          </div>

          <div class="card-title">
            <template v-if="currentItem.type === 'quote'">
              {{ currentItem.author }}
            </template>
            <template v-else>
              {{ currentItem.title }}
              <span class="title-author">{{ currentItem.author }}</span>
            </template>
          </div>

          <div class="card-content">
            <p v-for="(line, idx) in contentLines" :key="idx" class="content-line">
              {{ line }}
            </p>
          </div>

          <div class="card-tabs">
            <div
              v-for="tab in availableTabs"
              :key="tab.key"
              class="tab-item"
              :class="{ active: activeTab === tab.key }"
              @click="activeTab = tab.key"
            >
              {{ tab.name }}
            </div>
          </div>

          <div class="tab-content">
            <div v-if="activeTab === 'translation'" class="tab-panel">
              <div v-if="currentItem.translation" class="panel-content">
                {{ currentItem.translation }}
              </div>
              <div v-else-if="currentItem.meaning" class="panel-content">
                {{ currentItem.meaning }}
              </div>
              <div v-else class="panel-empty">暂无译文</div>
            </div>

            <div v-if="activeTab === 'appreciation'" class="tab-panel">
              <div v-if="currentItem.appreciation" class="panel-content">
                {{ currentItem.appreciation }}
              </div>
              <div v-else class="panel-empty">暂无赏析</div>
            </div>

            <div v-if="activeTab === 'background'" class="tab-panel">
              <div v-if="currentItem.background" class="panel-content">
                {{ currentItem.background }}
              </div>
              <div v-else class="panel-empty">暂无背景信息</div>
            </div>

            <div v-if="activeTab === 'key'" class="tab-panel">
              <div v-if="currentItem.keySentences && currentItem.keySentences.length > 0" class="key-list">
                <div
                  v-for="(sentence, idx) in currentItem.keySentences"
                  :key="idx"
                  class="key-item"
                >
                  <span class="key-marker">✦</span>
                  <span class="key-text">{{ sentence }}</span>
                </div>
              </div>
              <div v-else class="panel-empty">暂无名句</div>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="learn-nav-buttons">
          <van-button
            type="default"
            size="large"
            :disabled="currentIndex === 0"
            @click="prevItem"
          >
            上一个
          </van-button>
          <van-button
            type="success"
            size="large"
            @click="markAsMastered"
          >
            已掌握
          </van-button>
          <van-button
            type="primary"
            size="large"
            :disabled="currentIndex >= learnItems.length - 1"
            @click="nextItem"
          >
            下一个
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Button as VanButton, Loading as VanLoading, showToast } from 'vant';
import { useQuotePoemLearning } from '../hooks/useQuotePoemLearning';

const router = useRouter();
const { allItems, loading, markMastered, isMastered } = useQuotePoemLearning();

const learnStarted = ref(false);
const selectedStage = ref('primary');
const selectedType = ref('all');
const currentIndex = ref(0);
const activeTab = ref('translation');

const stages = {
  primary: { name: '小学', icon: '👶' },
  middle: { name: '初中', icon: '🧑' },
  high: { name: '高中', icon: '👨' },
  civil: { name: '公考', icon: '💼' },
};

const types = {
  all: { name: '全部', icon: '📚' },
  quote: { name: '名言', icon: '💬' },
  poem: { name: '诗词', icon: '📜' },
  essay: { name: '文言', icon: '📖' },
};

const getStageCount = (stage) => {
  let count = allItems.value.filter(item => item.stage === stage).length;
  if (selectedType.value !== 'all') {
    count = allItems.value.filter(
      item => item.stage === stage && item.type === selectedType.value
    ).length;
  }
  return count;
};

const learnItems = computed(() => {
  let items = allItems.value.filter(item => item.stage === selectedStage.value);
  if (selectedType.value !== 'all') {
    items = items.filter(item => item.type === selectedType.value);
  }
  return items;
});

const currentItem = computed(() => {
  if (learnItems.value.length === 0) return null;
  return learnItems.value[currentIndex.value];
});

const contentLines = computed(() => {
  if (!currentItem.value) return [];
  return currentItem.value.content.split('\n').filter(line => line.trim());
});

const progressPercent = computed(() => {
  if (learnItems.value.length === 0) return 0;
  return Math.round(((currentIndex.value + 1) / learnItems.value.length) * 100);
});

const availableTabs = computed(() => {
  if (!currentItem.value) return [];
  const tabs = [];
  if (currentItem.value.translation || currentItem.value.meaning) {
    tabs.push({ key: 'translation', name: '译文' });
  }
  if (currentItem.value.appreciation) {
    tabs.push({ key: 'appreciation', name: '赏析' });
  }
  if (currentItem.value.background) {
    tabs.push({ key: 'background', name: '背景' });
  }
  if (currentItem.value.keySentences && currentItem.value.keySentences.length > 0) {
    tabs.push({ key: 'key', name: '名句' });
  }
  return tabs;
});

const startLearning = () => {
  if (learnItems.value.length === 0) {
    showToast('该分类暂无内容');
    return;
  }
  currentIndex.value = 0;
  learnStarted.value = true;
  activeTab.value = availableTabs.value.length > 0 ? availableTabs.value[0].key : 'translation';
};

const nextItem = () => {
  if (currentIndex.value < learnItems.value.length - 1) {
    currentIndex.value++;
    activeTab.value = availableTabs.value.length > 0 ? availableTabs.value[0].key : 'translation';
  }
};

const prevItem = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    activeTab.value = availableTabs.value.length > 0 ? availableTabs.value[0].key : 'translation';
  }
};

const markAsMastered = () => {
  if (currentItem.value) {
    markMastered(currentItem.value.id);
    showToast('已标记为掌握');
    if (currentIndex.value < learnItems.value.length - 1) {
      setTimeout(() => {
        nextItem();
      }, 500);
    }
  }
};

const exitLearn = () => {
  router.back();
};
</script>

<style lang="less" scoped>
.learn-page {
  min-height: 100vh;
  background: var(--color-bg-primary);
}

.loading-center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.learn-content {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.learn-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.learn-progress {
  flex: 1;
  margin-right: var(--spacing-md);
}

.progress-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xs);
}

.progress-bar {
  height: 6px;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color-primary);
  border-radius: var(--radius-full);
  transition: width 0.3s ease;
}

.start-screen {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-xl) var(--spacing-lg);
  overflow-y: auto;
}

.start-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  text-align: center;
  margin: 0 0 var(--spacing-xl);
}

.stage-selector {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
}

.stage-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-lg) var(--spacing-md);
  background: var(--color-bg-secondary);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);

  &.active {
    border-color: var(--color-primary);
    background: var(--van-blue-50);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }
}

.stage-icon {
  font-size: 2rem;
}

.stage-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.stage-count {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.type-selector {
  margin-bottom: var(--spacing-xl);
}

.selector-label {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
}

.type-options {
  display: flex;
  gap: var(--spacing-xs);
}

.type-option {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: var(--spacing-sm);
  background: var(--color-bg-secondary);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);

  &.active {
    border-color: var(--color-primary);
    background: var(--van-blue-50);
  }
}

.type-icon {
  font-size: 1.25rem;
}

.type-name {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);

  .active & {
    color: var(--color-primary);
    font-weight: var(--font-weight-semibold);
  }
}

.learn-card-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-lg);
  overflow: hidden;
}

.learn-card {
  flex: 1;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.card-type-badge {
  display: inline-block;
  font-size: var(--font-size-xs);
  color: var(--color-primary);
  background: var(--van-blue-50);
  padding: 2px var(--spacing-sm);
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-md);
  align-self: flex-start;
}

.card-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
  text-align: center;
}

.title-author {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-xs);
}

.card-content {
  background: linear-gradient(135deg, var(--van-orange-50), var(--van-amber-50));
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  text-align: center;
  flex-shrink: 0;
}

.content-line {
  font-size: var(--font-size-base);
  line-height: 2;
  color: var(--color-text-primary);
  margin: 0;
}

.card-tabs {
  display: flex;
  gap: var(--spacing-xs);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--spacing-md);
  flex-shrink: 0;
}

.tab-item {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all var(--transition-base);
  margin-bottom: -1px;

  &.active {
    color: var(--color-primary);
    border-bottom-color: var(--color-primary);
    font-weight: var(--font-weight-semibold);
  }
}

.tab-content {
  flex: 1;
  overflow-y: auto;
}

.tab-panel {
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.panel-content {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-lg);
  color: var(--color-text-secondary);
}

.panel-empty {
  text-align: center;
  color: var(--color-text-tertiary);
  padding: var(--spacing-xl) 0;
  font-size: var(--font-size-sm);
}

.key-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.key-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--van-orange-50);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--van-orange-500);
}

.key-marker {
  color: var(--van-orange-500);
  font-weight: bold;
  flex-shrink: 0;
}

.key-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  line-height: var(--line-height-base);
}

.learn-nav-buttons {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
  flex-shrink: 0;

  :deep(.van-button) {
    flex: 1;
  }
}
</style>
