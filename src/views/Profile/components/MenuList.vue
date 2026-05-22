<template>
  <section class="menu-section">
    <div class="section-title">{{ t('profile.moreFunctions') }}</div>
    <van-cell-group inset>
      <van-cell 
        v-for="menuItem in items" 
        :key="menuItem.id"
        :title="menuItem.title"
        :icon="menuItem.icon"
        is-link
        @click="$emit('menu-click', menuItem)"
      />
    </van-cell-group>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { CellGroup as VanCellGroup, Cell as VanCell } from 'vant'

const { t } = useI18n()

defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
})

defineEmits(['menu-click'])
</script>

<style lang="less" scoped>
.section-title {
  font-size: 13px;
  color: var(--color-text-secondary);
  margin: var(--spacing-md) var(--spacing-sm) var(--spacing-sm);
  font-weight: var(--font-weight-medium);
}

.menu-section {
  margin: 0 var(--spacing-sm);
  margin-bottom: var(--spacing-md);

  :deep(.van-cell-group) {
    /* 移除 inset 模式的外边距，使其与页面齐平 */
    margin: 0;
  }

  :deep(.van-cell) {
    /* 移除边框 */
    &::after {
      border-bottom: none;
    }
    
    padding: var(--spacing-sm) var(--spacing-md);
  }
}
</style>