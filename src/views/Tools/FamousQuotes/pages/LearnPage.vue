<template>
  <div class="learn-page">
    <van-loading v-if="loading" class="loading-center" />

    <div v-else class="learn-content">
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
        <van-button type="primary" size="large" block @click="startLearning">
          开始学习
        </van-button>
      </div>

      <div v-else class="learn-card-container" v-if="currentItem">
        <div class="learn-card">
          <div class="card-type-badge">名人名言</div>

          <div class="card-content">
            <p class="content-text">{{ currentItem.content }}</p>
          </div>

          <div class="card-meta">
            <span class="meta-author">{{ currentItem.author }}</span>
            <span class="meta-source">—— {{ currentItem.source }}</span>
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
            <div v-if="activeTab === 'meaning'" class="tab-panel">
              <div v-if="currentItem.meaning" class="panel-content">
                {{ currentItem.meaning }}
              </div>
              <div v-else class="panel-empty">暂无含义解释</div>
            </div>

            <div v-if="activeTab === 'appreciation'" class="tab-panel">
              <div v-if="currentItem.appreciation" class="panel-content">
                {{ currentItem.appreciation }}
              </div>
              <div v-else class="panel-empty">暂无赏析</div>
            </div>

            <div v-if="activeTab === 'examples'" class="tab-panel">
              <div v-if="currentItem.examples && currentItem.examples.length > 0" class="example-list">
                <div
                  v-for="(example, idx) in currentItem.examples"
                  :key="idx"
                  class="example-item"
                >
                  <span class="example-marker">✦</span>
                  <span class="example-text">{{ example }}</span>
                </div>
              </div>
              <div v-else class="panel-empty">暂无例句</div>
            </div>
          </div>
        </div>

        <div class="learn-nav-buttons">
          <van-button
            type="default"
            size="large"
            :disabled="currentIndex === 0"
            @click="prevItem"
          >
            上一条
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
            下一条
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Button as VanButton, Loading as VanLoading, showToast } from 'vant';
import { useFamousQuotes } from '../hooks/useFamousQuotes';

const router = useRouter();
const { allItems, loading, markMastered } = useFamousQuotes();

const learnStarted = ref(false);
const selectedStage = ref('primary');
const currentIndex = ref(0);
const activeTab = ref('meaning');

const stages = {
  primary: { name: '小学', icon: '👶' },
  middle: { name: '初中', icon: '🧑' },
  high: { name: '高中', icon: '👨' },
  civil: { name: '公务员', icon: '💼' },
};

const getStageCount = (stage) => {
  return allItems.value.filter(item => item.stage === stage).length;
};

const learnItems = computed(() => {
  return allItems.value.filter(item => item.stage === selectedStage.value);
});

const currentItem = computed(() => {
  if (learnItems.value.length === 0) return null;
  return learnItems.value[currentIndex.value];
});

const progressPercent = computed(() => {
  if (learnItems.value.length === 0) return 0;
  return Math.round(((currentIndex.value + 1) / learnItems.value.length) * 100);
});

const availableTabs = computed(() => {
  if (!currentItem.value) return [];
  const tabs = [];
  if (currentItem.value.meaning) {
    tabs.push({ key: 'meaning', name: '含义' });
  }
  if (currentItem.value.appreciation) {
    tabs.push({ key: 'appreciation', name: '赏析' });
  }
  if (currentItem.value.examples && currentItem.value.examples.length > 0) {
    tabs.push({ key: 'examples', name: '例句' });
  }
  return tabs;
});

const startLearning = () => {
  if (learnItems.value.length === 0) {
    showToast('该阶段暂无名言');
    return;
  }
  currentIndex.value = 0;
  learnStarted.value = true;
  activeTab.value = availableTabs.value.length > 0 ? availableTabs.value[0].key : 'meaning';
};

const nextItem = () => {
  if (currentIndex.value < learnItems.value.length - 1) {
    currentIndex.value++;
    activeTab.value = availableTabs.value.length > 0 ? availableTabs.value[0].key : 'meaning';
  }
};

const prevItem = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    activeTab.value = availableTabs.value.length > 0 ? availableTabs.value[0].key : 'meaning';
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

.card-content {
  background: linear-gradient(135deg, var(--van-blue-50), var(--van-cyan-50));
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
  text-align: center;
  flex-shrink: 0;
  border-left: 4px solid var(--color-primary);
}

.content-text {
  font-size: var(--font-size-lg);
  line-height: 1.8;
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
  margin: 0;
}

.card-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  flex-shrink: 0;
}

.meta-author {
  font-size: var(--font-size-base);
  color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
}

.meta-source {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
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

.example-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.example-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--van-orange-50);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--van-orange-500);
}

.example-marker {
  color: var(--van-orange-500);
  font-weight: bold;
  flex-shrink: 0;
}

.example-text {
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