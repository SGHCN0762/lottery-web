<template>
  <ToolCard
    v-if="pages.length > 0"
    icon="description-o"
    :title="t('tools.fileConverter.pdfSplit.selectPages')"
    class="page-selector"
  >
    <template #headerRight>
      <span class="selected-count">
        {{ selectedPages.length }} / {{ pages.length }}
      </span>
    </template>

    <div class="selector-actions">
      <van-button size="small" @click="$emit('select-all')">
        {{ t('tools.fileConverter.pdfSplit.selectAll') }}
      </van-button>
      <van-button size="small" @click="$emit('deselect-all')">
        {{ t('tools.fileConverter.pdfSplit.deselectAll') }}
      </van-button>
    </div>
    <div class="page-grid">
      <div
        v-for="(page, index) in pages"
        :key="index"
        class="page-item"
        :class="{ selected: page.selected }"
        @click="$emit('toggle', index)"
      >
        <div class="page-number">{{ index + 1 }}</div>
        <van-icon v-if="page.selected" name="success" class="check-icon" />
      </div>
    </div>
  </ToolCard>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Button as VanButton, Icon as VanIcon } from 'vant';
import ToolCard from '../../components/ToolCard.vue';

defineProps({
  pages: {
    type: Array,
    default: () => [],
  },
  selectedPages: {
    type: Array,
    default: () => [],
  },
});

defineEmits(['toggle', 'select-all', 'deselect-all']);

const { t } = useI18n();
</script>

<style lang="less" scoped>
.page-selector {
  margin-top: 16px;
}

.selected-count {
  font-size: var(--font-size-sm);
  color: var(--color-primary);
}

.selector-actions {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;

  :deep(.van-button) {
    flex: 1;
  }
}

.page-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
}

.page-item {
  aspect-ratio: 1;
  background: var(--color-bg-primary);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;

  &:active {
    transform: scale(0.95);
  }

  &.selected {
    border-color: var(--color-primary);
    background: var(--color-primary-light);
  }
}

.page-number {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  font-weight: 500;
}

.check-icon {
  position: absolute;
  top: 2px;
  right: 2px;
  color: var(--color-primary);
  font-size: 12px;
}
</style>
