<template>
  <div class="learn-page">
    <div class="learn-content" v-if="currentPoint">
      <div class="progress-section">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <span class="progress-text">{{ currentIndex + 1 }} / {{ filteredPoints.length }}</span>
      </div>

      <div class="content-card">
        <div class="card-header">
          <span class="stage-tag" :class="currentPoint.stage">
            <span class="stage-icon">{{ stageIcon }}</span>
            <span class="stage-text">{{ stageText }}</span>
          </span>
          <span class="chapter-badge">{{ currentPoint.chapter }}</span>
        </div>

        <MarkdownRenderer :content="currentPoint.content" />
      </div>

      <div class="nav-buttons">
        <van-button
          :disabled="isFirst"
          type="default"
          @click="goToPrev"
          class="nav-btn prev-btn"
        >
          <van-icon name="arrow-left" />
          {{ t('tools.chemistry.actions.prev') }}
        </van-button>
        <van-button
          :type="isMastered(currentPoint.id) ? 'default' : 'primary'"
          @click="handleToggleMaster"
          class="master-btn"
        >
          <van-icon :name="isMastered(currentPoint.id) ? 'check-circle' : 'circle'" />
          {{ isMastered(currentPoint.id) ? t('tools.chemistry.actions.unmarkMaster') : t('tools.chemistry.actions.markMaster') }}
        </van-button>
        <van-button
          :disabled="isLast"
          type="primary"
          @click="goToNext"
          class="nav-btn next-btn"
        >
          {{ t('tools.chemistry.actions.next') }}
          <van-icon name="arrow" />
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { NavBar as VanNavBar, Button as VanButton, Icon as VanIcon } from 'vant';
import { useChemistryLearn } from '../hooks/useChemistry';
import MarkdownRenderer from '@/components/MarkdownRenderer/MarkdownRenderer.vue';

const router = useRouter();
const { t } = useI18n();

const {
  currentIndex,
  filteredPoints,
  currentPoint,
  isMastered,
  markMastered,
  unmarkMastered,
  goToNext,
  goToPrev,
  isFirst,
  isLast,
  progress
} = useChemistryLearn();

const stageIcon = computed(() => {
  if (!currentPoint.value) return '';
  const icons = {
    middle: '🏫',
    high: '🎓'
  };
  return icons[currentPoint.value.stage] || '📚';
});

const stageText = computed(() => {
  if (!currentPoint.value) return '';
  const texts = {
    middle: t('tools.chemistry.stages.middle'),
    high: t('tools.chemistry.stages.high')
  };
  return texts[currentPoint.value.stage] || '';
});

const handleToggleMaster = () => {
  if (!currentPoint.value) return;
  if (isMastered(currentPoint.value.id)) {
    unmarkMastered(currentPoint.value.id);
  } else {
    markMastered(currentPoint.value.id);
  }
};
</script>

<style lang="less" scoped>
.learn-page {
  min-height: 100%;
  background: var(--color-bg-primary);
  display: flex;
  flex-direction: column;
}

.progress-section {
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.progress-bar {
  height: 8px;
  background: rgba(var(--color-primary-rgb), 0.15);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 6px;
}

.progress-fill {
  height: 100%;
  background: var(--color-primary);
  border-radius: 4px;
  transition: width var(--transition-base);
}

.progress-text {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.content-card {
  flex: 1;
  margin: var(--spacing-md);
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  overflow-y: auto;
}

.card-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
}

.stage-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);

  &.middle {
    background: rgba(var(--color-primary-rgb), 0.1);
    color: var(--color-primary);
    border: 1px solid rgba(var(--color-primary-rgb), 0.15);
  }

  &.high {
    background: rgba(var(--color-warning-rgb), 0.1);
    color: var(--color-warning);
    border: 1px solid rgba(var(--color-warning-rgb), 0.15);
  }
}

.stage-icon {
  font-size: var(--font-size-xs);
}

.stage-text {
  font-weight: var(--font-weight-medium);
}

.chapter-badge {
  padding: 4px 8px;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.point-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
}

.nav-buttons {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  padding-bottom: calc(var(--spacing-md) + env(safe-area-inset-bottom, 0px));
  flex-shrink: 0;
}

.nav-btn {
  flex: 1;
}

.master-btn {
  flex: 1.5;
}
</style>
