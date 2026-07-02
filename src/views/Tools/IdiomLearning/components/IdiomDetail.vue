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
        </div>
        <div class="header-right">
          <button
            class="master-btn"
            :class="{ mastered: isMastered }"
            @click="toggleMaster"
          >
            {{ isMastered ? '取消掌握' : '标记掌握' }}
          </button>
        </div>
      </div>

      <div class="detail-body">
        <div class="section">
          <h3 class="section-title">📖 含义</h3>
          <p class="section-content">{{ idiom.meaning }}</p>
        </div>

        <div class="section">
          <h3 class="section-title">📚 出处</h3>
          <p class="section-content">{{ idiom.origin }}</p>
        </div>

        <div class="section">
          <h3 class="section-title">💬 例句</h3>
          <p class="section-content">{{ idiom.example }}</p>
        </div>

        <div class="section story-section">
          <h3 class="section-title">🎭 典故故事</h3>
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

const toggleMaster = () => {
  emit('toggle-master', props.idiom.id);
};
</script>

<style lang="less" scoped>
.detail-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-lg);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
}

.header-left {
  flex: 1;
}

.idiom-word {
  font-size: 2rem;
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-xs) 0;
}

.idiom-pinyin {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  font-style: italic;
}

.header-right {
  flex-shrink: 0;
}

.master-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border: 2px solid var(--color-success);
  background: transparent;
  color: var(--color-success);
  transition: all var(--transition-base);
  cursor: pointer;

  &.mastered {
    background: var(--color-success);
    color: #fff;
  }

  &:hover {
    transform: scale(1.05);
  }
}

.detail-body {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.section {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
}

.section-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-sm) 0;
}

.section-content {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-lg);
  margin: 0;
}

.story-section {
  flex: 1;
  min-height: 200px;
}

.story-content {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-lg);
}

.detail-footer {
  padding-top: var(--spacing-md);
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