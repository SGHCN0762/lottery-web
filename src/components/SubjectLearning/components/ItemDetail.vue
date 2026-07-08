<template>
  <van-popup
    :show="show"
    position="bottom"
    class="item-detail-popup"
    @update:show="$emit('update:show', $event)"
  >
    <div v-if="item" class="detail-content">
      <div class="detail-header">
        <div class="header-left">
          <span class="stage-tag" :class="item.stage">
            {{ getStageLabel(item.stage) }}
          </span>
          <span class="chapter-badge">{{ item.chapter }}</span>
        </div>
        <div class="header-actions">
          <van-icon
            :name="isFavorite ? 'star' : 'star-o'"
            :color="isFavorite ? '#ffc800' : '#999'"
            size="20"
            @click.stop="$emit('toggle-favorite')"
            class="favorite-icon"
          />
          <van-icon name="cross" size="20" @click.stop="$emit('update:show', false)" />
        </div>
      </div>

      <div class="detail-body">
        <MarkdownRenderer :content="item.content" />
      </div>

      <div class="detail-footer">
        <van-button
          :type="isMastered ? 'default' : 'primary'"
          @click="$emit('toggle-master')"
          class="master-btn"
        >
          <van-icon :name="isMastered ? 'check-circle' : 'circle'" />
          {{ isMastered ? '取消掌握' : '标记掌握' }}
        </van-button>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { Popup as VanPopup, Icon as VanIcon, Button as VanButton } from 'vant';
import MarkdownRenderer from '@/components/MarkdownRenderer/MarkdownRenderer.vue';

defineProps({
  show: {
    type: Boolean,
    default: false
  },
  item: {
    type: Object,
    default: null
  },
  isMastered: {
    type: Boolean,
    default: false
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
});

defineEmits(['update:show', 'toggle-master', 'toggle-favorite']);

const getStageLabel = (stage) => {
  const stageLabels = {
    middle: '初中',
    high: '高中',
    junior: '基础篇',
    senior: '进阶篇',
    primary: '小学',
    civil: '公务员',
    revolution: '革命时期',
    construction: '建设时期',
    reform: '改革开放',
    new_era: '新时代',
    recent: '新时代（2021年至今）',
    transition: '转型期（2011-2020年）',
    early: '发展期（2005-2010年）',
    foundation: '建国初期（1949-1955年）'
  };
  return stageLabels[stage] || stage;
};
</script>

<style lang="less" scoped>
.item-detail-popup {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.detail-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.stage-tag {
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);

  &.middle {
    background: rgba(var(--color-primary-rgb), 0.1);
    color: var(--color-primary);
  }

  &.high {
    background: rgba(var(--color-warning-rgb), 0.1);
    color: var(--color-warning);
  }
}

.chapter-badge {
  padding: 2px 8px;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.favorite-icon {
  cursor: pointer;
}

.detail-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  padding: var(--spacing-md);
  margin: 0;
  flex-shrink: 0;
}

.detail-body {
  flex: 1;
  padding: 0 var(--spacing-md);
  overflow-y: auto;
}

.detail-footer {
  padding: var(--spacing-md);
  border-top: 1px solid var(--color-border);
  padding-bottom: calc(var(--spacing-md) + env(safe-area-inset-bottom, 0px));
  flex-shrink: 0;

  .master-btn {
    width: 100%;
  }
}
</style>