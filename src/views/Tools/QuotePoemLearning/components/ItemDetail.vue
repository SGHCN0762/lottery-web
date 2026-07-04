<template>
  <van-popup
    v-model:show="visible"
    position="bottom"
    :round="true"
    :style="{ height: '90%' }"
  >
    <div class="detail-container" v-if="item">
      <div class="detail-header">
        <div class="detail-title-row">
          <h2 class="detail-title" v-if="item.type === 'quote'">名人名言</h2>
          <h2 class="detail-title" v-else-if="item.type === 'poem'">{{ item.title }}</h2>
          <h2 class="detail-title" v-else>{{ item.title }}</h2>
          <van-icon name="cross" class="close-btn" @click="handleClose" />
        </div>
        <div class="detail-meta">
          <span class="meta-tag" v-if="item.dynasty">{{ item.dynasty }}</span>
          <span class="meta-author">{{ item.author }}</span>
          <van-tag type="primary" size="small" class="stage-tag">
            {{ stageLabels[item.stage] }}
          </van-tag>
        </div>
        <div class="action-bar">
          <button class="action-btn" @click="handleToggleFavorite">
            <span class="action-icon">{{ isFavorite ? '❤️' : '🤍' }}</span>
            <span class="action-text">{{ isFavorite ? '已收藏' : '收藏' }}</span>
          </button>
          <button class="action-btn" @click="handleToggleMaster">
            <span class="action-icon">{{ isMastered ? '✅' : '📚' }}</span>
            <span class="action-text">{{ isMastered ? '已掌握' : '标记掌握' }}</span>
          </button>
        </div>
      </div>

      <div class="detail-content">
        <div class="content-section">
          <h3 class="section-title">
            <span v-if="item.type === 'quote'">名言内容</span>
            <span v-else-if="item.type === 'poem'">诗词原文</span>
            <span v-else>文章原文</span>
          </h3>
          <div class="content-text original-text">
            <p v-for="(line, index) in contentLines" :key="index" class="content-line">
              {{ line }}
            </p>
          </div>
        </div>

        <div class="content-section" v-if="item.translation">
          <h3 class="section-title">译文</h3>
          <div class="content-text translation-text">
            {{ item.translation }}
          </div>
        </div>

        <div class="content-section" v-if="item.meaning">
          <h3 class="section-title">含义</h3>
          <div class="content-text meaning-text">
            {{ item.meaning }}
          </div>
        </div>

        <div class="content-section" v-if="item.appreciation">
          <h3 class="section-title">赏析</h3>
          <div class="content-text appreciation-text">
            {{ item.appreciation }}
          </div>
        </div>

        <div class="content-section" v-if="item.background">
          <h3 class="section-title">创作背景</h3>
          <div class="content-text background-text">
            {{ item.background }}
          </div>
        </div>

        <div class="content-section" v-if="item.keySentences && item.keySentences.length > 0">
          <h3 class="section-title">名句</h3>
          <div class="key-sentences">
            <div 
              v-for="(sentence, index) in item.keySentences" 
              :key="index"
              class="key-sentence-item"
            >
              <span class="sentence-marker">✦</span>
              <span class="sentence-text">{{ sentence }}</span>
            </div>
          </div>
        </div>

        <div class="content-section" v-if="item.examples && item.examples.length > 0">
          <h3 class="section-title">例句</h3>
          <div class="examples-list">
            <div 
              v-for="(example, index) in item.examples" 
              :key="index"
              class="example-item"
            >
              <span class="example-index">{{ index + 1 }}.</span>
              <span class="example-text">{{ example }}</span>
            </div>
          </div>
        </div>

        <div class="content-section" v-if="item.vocabulary && item.vocabulary.length > 0">
          <h3 class="section-title">重点字词</h3>
          <div class="vocabulary-list">
            <div 
              v-for="(vocab, index) in item.vocabulary" 
              :key="index"
              class="vocab-item"
            >
              <span class="vocab-word">{{ vocab.word }}</span>
              <span class="vocab-meaning">{{ vocab.meaning }}</span>
            </div>
          </div>
        </div>

        <div class="content-section" v-if="item.source">
          <h3 class="section-title">出处</h3>
          <div class="source-text">
            {{ item.source }}
          </div>
        </div>

        <div class="content-section" v-if="item.tags && item.tags.length > 0">
          <h3 class="section-title">标签</h3>
          <div class="tags-list">
            <van-tag 
              v-for="(tag, index) in item.tags" 
              :key="index"
              type="primary"
              plain
              size="medium"
              class="tag-item"
            >
              {{ tag }}
            </van-tag>
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { computed } from 'vue';
import { Popup as VanPopup, Icon as VanIcon, Tag as VanTag } from 'vant';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    default: null,
  },
  isMastered: {
    type: Boolean,
    default: false,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:show', 'toggle-master', 'toggle-favorite']);

const stageLabels = {
  primary: '小学',
  middle: '初中',
  high: '高中',
  civil: '公务员',
};

const visible = computed({
  get: () => props.show,
  set: (val) => emit('update:show', val),
});

const contentLines = computed(() => {
  if (!props.item) return [];
  const content = props.item.content || '';
  return content.split('\n').filter(line => line.trim());
});

const handleClose = () => {
  emit('update:show', false);
};

const handleToggleMaster = () => {
  emit('toggle-master');
};

const handleToggleFavorite = () => {
  emit('toggle-favorite');
};
</script>

<style lang="less" scoped>
.detail-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-bg-primary);
}

.detail-header {
  padding: var(--spacing-lg);
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.detail-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
}

.detail-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
}

.close-btn {
  font-size: var(--font-size-xl);
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: var(--spacing-xs);
}

.detail-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.meta-tag {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  padding: 2px var(--spacing-sm);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-sm);
}

.meta-author {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.stage-tag {
  margin-left: auto;
}

.action-bar {
  display: flex;
  gap: var(--spacing-md);
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);

  &:hover {
    border-color: var(--color-primary);
    background: var(--van-blue-50);
  }

  &:active {
    transform: scale(0.98);
  }
}

.action-icon {
  font-size: var(--font-size-lg);
}

.action-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.detail-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-lg);
  padding-bottom: calc(var(--spacing-xl) + env(safe-area-inset-bottom, 0px));
}

.content-section {
  margin-bottom: var(--spacing-xl);

  &:last-child {
    margin-bottom: 0;
  }
}

.section-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-md);
  padding-left: var(--spacing-sm);
  border-left: 3px solid var(--color-primary);
}

.content-text {
  font-size: var(--font-size-base);
  line-height: var(--line-height-lg);
  color: var(--color-text-primary);
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
}

.original-text {
  background: linear-gradient(135deg, var(--van-orange-50), var(--van-amber-50));
  border-left: 4px solid var(--color-primary);
}

.content-line {
  margin: 0 0 var(--spacing-sm);

  &:last-child {
    margin-bottom: 0;
  }
}

.translation-text {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.meaning-text {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.appreciation-text {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.background-text {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.key-sentences {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.key-sentence-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--van-orange-50);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--van-orange-500);
}

.sentence-marker {
  color: var(--van-orange-500);
  font-weight: bold;
  flex-shrink: 0;
}

.sentence-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  line-height: var(--line-height-base);
}

.examples-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.example-item {
  display: flex;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
}

.example-index {
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  flex-shrink: 0;
}

.example-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-base);
}

.vocabulary-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.vocab-item {
  display: flex;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
}

.vocab-word {
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  min-width: 60px;
  flex-shrink: 0;
}

.vocab-meaning {
  color: var(--color-text-secondary);
}

.source-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.tag-item {
  margin: 0;
}
</style>
