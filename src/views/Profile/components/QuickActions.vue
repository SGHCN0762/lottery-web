<template>
  <section class="quick-actions">
    <div class="section-title">{{ t('profile.quickActions') }}</div>
    <van-grid :column-num="4" :border="false">
      <van-grid-item 
        v-for="action in actions" 
        :key="action.id"
        @click="$emit('action-click', action)"
      >
        <template #icon>
          <div class="action-icon" :style="{ background: action.color }">
            <van-icon :name="action.icon" size="20" color="white" />
          </div>
        </template>
        <template #text>
          <span class="action-text">{{ action.text }}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { Grid as VanGrid, GridItem as VanGridItem, Icon as VanIcon } from 'vant'

const { t } = useI18n()

defineProps({
  actions: {
    type: Array,
    required: true,
    default: () => []
  }
})

defineEmits(['action-click'])
</script>

<style lang="less" scoped>
.section-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: var(--spacing-lg) var(--spacing-md) var(--spacing-md);
  font-weight: var(--font-weight-medium);
}

.quick-actions {
  margin: 0 var(--spacing-md);
  margin-bottom: var(--spacing-lg);

  :deep(.van-grid-item__content) {
    padding: var(--spacing-md) var(--spacing-xs);
    background: transparent;
    transition: all var(--transition-fast);

    &:active {
      background-color: var(--color-bg-tertiary);
      transform: scale(0.95);
    }
  }

  .action-icon {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacing-xs);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .action-text {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
  }
}
</style>