<template>
  <van-popup :show="show" position="bottom" :style="{ height: '90%' }" round @update:show="$emit('update:show', $event)">
    <div class="popup-content" v-if="item">
      <div class="popup-header">
        <div class="header-left">
          <span class="stage-tag" :class="item.stage">
            <span class="stage-icon">{{ stageIcon }}</span>
            <span class="stage-text">{{ stageText }}</span>
          </span>
          <span class="chapter-badge">{{ item.chapter }}</span>
        </div>
        <div class="header-right">
          <van-icon
            :name="isFavorite ? 'star' : 'star-o'"
            :color="isFavorite ? '#ffb400' : 'inherit'"
            class="favorite-icon"
            @click.stop="$emit('toggle-favorite')"
          />
          <van-icon name="cross" class="close-icon" @click="$emit('update:show', false)" />
        </div>
      </div>

      <div class="popup-body">
        <MarkdownRenderer :content="item.content" />
      </div>

      <div class="popup-footer">
        <van-button
          :type="isMastered ? 'default' : 'primary'"
          @click="$emit('toggle-master')"
          class="master-btn"
        >
          <van-icon :name="isMastered ? 'check-circle' : 'circle'" />
          {{ isMastered ? t('tools.biology.actions.unmarkMaster') : t('tools.biology.actions.markMaster') }}
        </van-button>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Popup as VanPopup, Icon as VanIcon, Button as VanButton } from 'vant';
import MarkdownRenderer from '@/components/MarkdownRenderer/MarkdownRenderer.vue';

const props = defineProps({
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

const { t } = useI18n();

const stageIcon = computed(() => {
  if (!props.item) return '';
  const icons = {
    middle: '🏫',
    high: '🎓'
  };
  return icons[props.item.stage] || '📚';
});

const stageText = computed(() => {
  if (!props.item) return '';
  const texts = {
    middle: t('tools.biology.stages.middle'),
    high: t('tools.biology.stages.high')
  };
  return texts[props.item.stage] || '';
});
</script>

<style lang="less" scoped>
.popup-content {
  width: 100%;
  max-height: 90vh;
  background: var(--color-bg-primary);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--color-border);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg-secondary);
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
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

.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.favorite-icon {
  font-size: var(--font-size-lg);
  cursor: pointer;
}

.close-icon {
  font-size: var(--font-size-lg);
  cursor: pointer;
}

.popup-body {
  flex: 1;
  overflow-y: auto;
  padding: 0 var(--spacing-lg);
}

.item-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
}

.popup-footer {
  padding: var(--spacing-md);
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-secondary);
  padding-bottom: calc(var(--spacing-md) + env(safe-area-inset-bottom, 0px));
  flex-shrink: 0;

  .master-btn {
    width: 100%;
  }
}
</style>