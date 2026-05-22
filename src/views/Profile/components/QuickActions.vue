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
  import { useI18n } from 'vue-i18n';
  import { Grid as VanGrid, GridItem as VanGridItem, Icon as VanIcon } from 'vant';

  const { t } = useI18n();

  defineProps({
    actions: {
      type: Array,
      required: true,
      default: () => [],
    },
  });

  defineEmits(['action-click']);
</script>

<style lang="less" scoped>
  .section-title {
    font-size: 13px;
    color: var(--color-text-secondary);
    margin: var(--spacing-md) var(--spacing-sm) var(--spacing-sm);
    font-weight: var(--font-weight-medium);
  }

  .quick-actions {
    margin: 0 var(--spacing-sm);
    margin-bottom: var(--spacing-md);

    :deep(.van-grid-item__content) {
      padding: var(--spacing-sm) var(--spacing-xs);
      background: transparent;
      transition: all var(--transition-fast);

      &:active {
        background-color: var(--color-bg-tertiary);
        transform: scale(0.95);
      }
    }

    .action-icon {
      width: 36px;
      height: 36px;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 4px;
    }

    .action-text {
      font-size: 11px;
      color: var(--color-text-secondary);
    }
  }
</style>
