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
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: var(--spacing-lg) var(--spacing-md) var(--spacing-md);
  font-weight: var(--font-weight-medium);
}

.menu-section {
  margin: 0 var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}
</style>