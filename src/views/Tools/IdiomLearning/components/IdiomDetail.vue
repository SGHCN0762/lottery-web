<template>
  <van-popup
    :show="show"
    position="bottom"
    :style="{ height: '85%' }"
    round
    @update:show="$emit('update:show', $event)"
    @close="$emit('update:show', false)"
  >
    <div v-if="idiom" class="detail-content">
      <div class="detail-header">
        <div class="header-left">
          <h2 class="idiom-word">{{ idiom.word }}</h2>
          <span class="idiom-pinyin">{{ idiom.pinyin }}</span>
          <div class="header-tags">
            <span
              v-for="tag in sentimentTags"
              :key="tag.key"
              class="sentiment-tag"
              :class="tag.key"
            >
              {{ tag.name }}
            </span>
          </div>
        </div>
        <button
          class="master-btn"
          :class="{ mastered: isMastered }"
          @click="toggleMaster"
        >
          {{ isMastered ? '✓ 已掌握' : '标记掌握' }}
        </button>
      </div>

      <div class="detail-body">
        <div class="section">
          <h3 class="section-title">含义</h3>
          <p class="section-content">{{ idiom.meaning }}</p>
        </div>

        <div class="section">
          <h3 class="section-title">出处</h3>
          <p class="section-content">{{ idiom.origin }}</p>
        </div>

        <div class="section">
          <h3 class="section-title">例句</h3>
          <p class="section-content">{{ idiom.example }}</p>
        </div>

        <div class="section story-section">
          <h3 class="section-title">典故故事</h3>
          <div class="story-content">
            <p>{{ idiom.story }}</p>
          </div>
        </div>
      </div>

      <div class="detail-footer">
        <button class="close-btn" @click="$emit('update:show', false)">
          关闭
        </button>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { computed } from 'vue';
import { Popup as VanPopup } from 'vant';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  idiom: {
    type: Object,
    default: null,
  },
  isMastered: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:show', 'toggle-master']);

const sentimentConfig = {
  positive: { name: '褒义' },
  negative: { name: '贬义' },
  neutral: { name: '中性' }
};

const sentimentTags = computed(() => {
  if (!props.idiom) return [];
  const tags = props.idiom.tags || [];
  return tags
    .filter(tag => ['positive', 'negative', 'neutral'].includes(tag))
    .map(tag => ({ key: tag, ...sentimentConfig[tag] }));
});

const toggleMaster = () => {
  emit('toggle-master', props.idiom.id);
};
</script>

<style lang="less" scoped>
.detail-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-xl) var(--spacing-lg) var(--spacing-lg);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-lg);
  border-bottom: 2px solid var(--color-border);
}

.header-left {
  flex: 1;
}

.idiom-word {
  font-size: 2rem;
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

.header-tags {
  display: flex;
  gap: 4px;
  margin-top: var(--spacing-sm);
}

.sentiment-tag {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  font-weight: var(--font-weight-medium);
  line-height: 1.4;

  &.positive {
    background: rgba(7, 194, 144, 0.08);
    color: var(--color-success);
    border: 1px solid rgba(7, 194, 144, 0.2);
  }

  &.negative {
    background: rgba(255, 87, 87, 0.08);
    color: var(--color-danger);
    border: 1px solid rgba(255, 87, 87, 0.2);
  }

  &.neutral {
    background: rgba(144, 147, 153, 0.08);
    color: var(--color-text-tertiary);
    border: 1px solid rgba(144, 147, 153, 0.2);
  }
}

.master-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border: 1.5px solid var(--color-success);
  background: transparent;
  color: var(--color-success);
  transition: all var(--transition-base);
  cursor: pointer;
  flex-shrink: 0;

  &.mastered {
    background: var(--color-success);
    color: #fff;
  }

  &:hover:not(.mastered) {
    background: var(--van-green-1);
  }
}

.detail-body {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.section {
  background: var(--color-bg-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md) var(--spacing-lg);
  border-left: 3px solid var(--color-border);

  &:first-child {
    border-left-color: var(--color-primary);
  }
}

.section-title {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-tertiary);
  margin: 0 0 var(--spacing-sm) 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.section-content {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  line-height: var(--line-height-relaxed);
  margin: 0;
}

.story-section {
  flex: 1;
  min-height: 120px;
}

.story-content {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  line-height: var(--line-height-relaxed);
}

.detail-footer {
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border);
  margin-top: var(--spacing-md);
}

.close-btn {
  width: 100%;
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  background: var(--color-primary);
  color: #fff;
  border: none;
  cursor: pointer;
  transition: all var(--transition-base);

  &:hover {
    opacity: 0.9;
  }
}
</style>
