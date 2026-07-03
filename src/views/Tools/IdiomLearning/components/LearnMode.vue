<template>
  <div class="learn-mode">
    <!-- 阶段选择 -->
    <div v-if="!selectedStage" class="stage-select">
      <div class="learn-header">
        <button class="back-btn" @click="$emit('back')">← 返回</button>
        <h2 class="title">选择学习阶段</h2>
      </div>

      <div class="stage-intro">
        <p class="intro-text">根据你的考试阶段，系统学习对应成语</p>
      </div>

      <div class="stage-list">
        <div
          v-for="stage in stages"
          :key="stage.key"
          class="stage-card"
          :class="stage.key"
          @click="selectStage(stage.key)"
        >
          <div class="stage-accent"></div>
          <div class="stage-body">
            <div class="stage-top">
              <div class="stage-icon">{{ stage.icon }}</div>
              <div class="stage-info">
                <h3 class="stage-name">{{ stage.name }}</h3>
                <p class="stage-desc">{{ stage.description }}</p>
              </div>
              <div class="stage-arrow">›</div>
            </div>
            <div class="stage-progress">
              <div class="progress-info">
                <span class="progress-count">{{ getStageLearnedCount(stage.key) }}<span class="progress-total"> / {{ getStageTotalCount(stage.key) }}</span></span>
                <span class="progress-percent">{{ getStageProgress(stage.key) }}%</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" :style="{ width: getStageProgress(stage.key) + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 学习内容 -->
    <div v-else class="study-content">
      <div class="study-header">
        <button class="back-btn" @click="exitStage">← 返回</button>
        <div class="study-stats">
          <span class="stage-badge" :class="selectedStage">{{ currentStageInfo.name }}</span>
          <span class="position-text">{{ currentIndex + 1 }} / {{ stageIdioms.length }}</span>
        </div>
      </div>

      <div class="study-progress-bar">
        <div class="progress-fill" :style="{ width: studyProgress + '%' }"></div>
      </div>

      <div v-if="currentIdiom" class="idiom-study-card">
        <div class="card-top">
          <div class="word-display">
            <h2 class="idiom-word">{{ currentIdiom.word }}</h2>
            <span class="idiom-pinyin">{{ currentIdiom.pinyin }}</span>
          </div>
          <button
            class="master-toggle"
            :class="{ active: isCurrentMastered }"
            @click="toggleMasterCurrent"
          >
            <span class="toggle-icon">{{ isCurrentMastered ? '✓' : '' }}</span>
            <span class="toggle-text">{{ isCurrentMastered ? '已掌握' : '标记掌握' }}</span>
          </button>
        </div>

        <div class="card-sections">
          <div class="study-section">
            <div class="section-header">
              <span class="section-number">01</span>
              <h3 class="section-title">含义</h3>
            </div>
            <p class="section-text">{{ currentIdiom.meaning }}</p>
          </div>

          <div class="study-section">
            <div class="section-header">
              <span class="section-number">02</span>
              <h3 class="section-title">出处</h3>
            </div>
            <p class="section-text">{{ currentIdiom.origin }}</p>
          </div>

          <div class="study-section">
            <div class="section-header">
              <span class="section-number">03</span>
              <h3 class="section-title">例句</h3>
            </div>
            <p class="section-text">{{ currentIdiom.example }}</p>
          </div>

          <div class="study-section">
            <div class="section-header">
              <span class="section-number">04</span>
              <h3 class="section-title">典故</h3>
            </div>
            <p class="section-text">{{ currentIdiom.story }}</p>
          </div>
        </div>
      </div>

      <div class="nav-buttons">
        <button
          class="nav-btn prev-btn"
          :disabled="currentIndex === 0"
          @click="prevIdiom"
        >
          ← 上一个
        </button>
        <button
          class="nav-btn next-btn"
          :disabled="currentIndex >= stageIdioms.length - 1"
          @click="nextIdiom"
        >
          下一个 →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { getIdioms } from '../data/idioms';

const props = defineProps({
  learnedIds: {
    type: Array,
    default: () => [],
  },
  masteredIds: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['back', 'mark-learned', 'toggle-mastered']);

const stages = [
  { key: 'primary', name: '小学', icon: '👶', description: '小学阶段必会成语' },
  { key: 'middle', name: '初中', icon: '🧑', description: '初中阶段必会成语' },
  { key: 'high', name: '高中', icon: '👨', description: '高中阶段必会成语' },
  { key: 'civil', name: '公考', icon: '💼', description: '公务员考试常考成语' },
];

const selectedStage = ref(null);
const currentIndex = ref(0);

const stageIdioms = computed(() => {
  if (!selectedStage.value) return [];
  return getIdioms().filter(idiom => {
    const tags = idiom.tags || [];
    return tags.includes(selectedStage.value);
  });
});

const currentStageInfo = computed(() => {
  return stages.find(s => s.key === selectedStage.value) || {};
});

const currentIdiom = computed(() => {
  return stageIdioms.value[currentIndex.value];
});

const isCurrentLearned = computed(() => {
  return currentIdiom.value ? props.learnedIds.includes(currentIdiom.value.id) : false;
});

const isCurrentMastered = computed(() => {
  return currentIdiom.value ? props.masteredIds.includes(currentIdiom.value.id) : false;
});

const studyProgress = computed(() => {
  if (stageIdioms.value.length === 0) return 0;
  return Math.round(((currentIndex.value + 1) / stageIdioms.value.length) * 100);
});

const getStageTotalCount = (stageKey) => {
  return getIdioms().filter(idiom => {
    const tags = idiom.tags || [];
    return tags.includes(stageKey);
  }).length;
};

const getStageLearnedCount = (stageKey) => {
  const stageIdiomIds = getIdioms()
    .filter(idiom => (idiom.tags || []).includes(stageKey))
    .map(idiom => idiom.id);
  return props.learnedIds.filter(id => stageIdiomIds.includes(id)).length;
};

const getStageProgress = (stageKey) => {
  const total = getStageTotalCount(stageKey);
  if (total === 0) return 0;
  return Math.round((getStageLearnedCount(stageKey) / total) * 100);
};

const selectStage = (stageKey) => {
  selectedStage.value = stageKey;
  currentIndex.value = 0;
};

const exitStage = () => {
  selectedStage.value = null;
  currentIndex.value = 0;
};

const markCurrentLearned = () => {
  if (currentIdiom.value && !isCurrentLearned.value) {
    emit('mark-learned', currentIdiom.value.id);
  }
};

const toggleMasterCurrent = () => {
  if (currentIdiom.value) {
    emit('toggle-mastered', currentIdiom.value.id);
  }
};

const prevIdiom = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    markCurrentLearned();
  }
};

const nextIdiom = () => {
  if (currentIndex.value < stageIdioms.value.length - 1) {
    currentIndex.value++;
    markCurrentLearned();
  }
};

watch(currentIdiom, () => {
  markCurrentLearned();
});
</script>

<style lang="less" scoped>
.learn-mode {
  min-height: 100vh;
  background: var(--color-bg-primary);
}

/* ===== 阶段选择 ===== */
.learn-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: calc(var(--spacing-md) + env(safe-area-inset-top, 0px)) var(--spacing-lg) var(--spacing-md);
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
}

.title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
}

.back-btn {
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  background: var(--color-bg-primary);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all var(--transition-base);
  white-space: nowrap;

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
}

.stage-intro {
  padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-sm);
}

.intro-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  margin: 0;
}

.stage-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-lg) var(--spacing-lg);
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
}

.stage-card {
  position: relative;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    border-color: transparent;
  }
}

.stage-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;

  .stage-card.primary & { background: var(--color-success); }
  .stage-card.middle & { background: var(--color-primary); }
  .stage-card.high & { background: var(--color-warning); }
  .stage-card.civil & { background: var(--color-danger); }
}

.stage-body {
  padding: var(--spacing-lg);
}

.stage-top {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.stage-icon {
  font-size: 2rem;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  flex-shrink: 0;

  .stage-card.primary & { background: var(--van-green-1); }
  .stage-card.middle & { background: var(--van-blue-1); }
  .stage-card.high & { background: var(--van-orange-1); }
  .stage-card.civil & { background: var(--van-red-1); }
}

.stage-info {
  flex: 1;
  min-width: 0;
}

.stage-name {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 2px 0;
}

.stage-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  margin: 0;
}

.stage-arrow {
  font-size: var(--font-size-xl);
  color: var(--color-text-quaternary);
  flex-shrink: 0;
  transition: transform var(--transition-base);

  .stage-card:hover & {
    transform: translateX(4px);
    color: var(--color-text-secondary);
  }
}

.stage-progress {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.progress-count {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.progress-total {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  font-weight: var(--font-weight-normal);
}

.progress-percent {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.progress-track {
  height: 4px;
  background: var(--color-bg-primary);
  border-radius: 2px;
  overflow: hidden;

  .progress-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.5s ease;

    .stage-card.primary & { background: var(--color-success); }
    .stage-card.middle & { background: var(--color-primary); }
    .stage-card.high & { background: var(--color-warning); }
    .stage-card.civil & { background: var(--color-danger); }
  }
}

/* ===== 学习内容 ===== */
.study-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: calc(var(--spacing-md) + env(safe-area-inset-top, 0px)) var(--spacing-lg) var(--spacing-md);
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
}

.study-stats {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.stage-badge {
  font-size: var(--font-size-xs);
  padding: 3px var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-weight: var(--font-weight-medium);

  &.primary { background: var(--van-green-1); color: var(--van-green-7); }
  &.middle { background: var(--van-blue-1); color: var(--van-blue-6); }
  &.high { background: var(--van-orange-1); color: var(--van-orange-8); }
  &.civil { background: var(--van-red-1); color: var(--van-red-7); }
}

.position-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}

.study-progress-bar {
  height: 3px;
  background: var(--color-border);
  overflow: hidden;

  .progress-fill {
    height: 100%;
    background: var(--color-primary);
    transition: width 0.4s ease;
  }
}

.idiom-study-card {
  max-width: 600px;
  margin: var(--spacing-lg) auto 0;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
}

.word-display {
  flex: 1;
}

.idiom-word {
  font-size: 2.2rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-xs) 0;
  letter-spacing: 4px;
}

.idiom-pinyin {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  font-style: italic;
}

.master-toggle {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  border: 1.5px solid var(--color-border);
  background: transparent;
  color: var(--color-text-tertiary);
  cursor: pointer;
  transition: all var(--transition-base);
  flex-shrink: 0;

  &.active {
    background: var(--color-success);
    border-color: var(--color-success);
    color: #fff;
  }

  &:hover:not(.active) {
    border-color: var(--color-success);
    color: var(--color-success);
  }
}

.toggle-icon {
  font-size: var(--font-size-sm);
  font-weight: bold;
}

.card-sections {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.study-section {
  position: relative;
  padding-left: calc(var(--spacing-lg) + 8px);

  &::before {
    content: '';
    position: absolute;
    left: var(--spacing-lg);
    top: 28px;
    bottom: 0;
    width: 1px;
    background: var(--color-border);
  }

  &:last-child::before {
    display: none;
  }
}

.section-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: calc(-1 * var(--spacing-lg) - 8px);
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-bg-secondary);
    border: 2px solid var(--color-primary);
    z-index: 1;
  }
}

.section-number {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-quaternary);
  font-family: var(--font-family-mono);
}

.section-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.section-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
}

.nav-buttons {
  display: flex;
  gap: var(--spacing-md);
  max-width: 600px;
  margin: var(--spacing-lg) auto var(--spacing-xl);
  padding: 0 var(--spacing-lg);
}

.nav-btn {
  flex: 1;
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border: none;
  cursor: pointer;
  transition: all var(--transition-base);

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
}

.prev-btn {
  background: var(--color-bg-secondary);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);

  &:hover:not(:disabled) {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
}

.next-btn {
  background: var(--color-primary);
  color: #fff;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }
}
</style>
