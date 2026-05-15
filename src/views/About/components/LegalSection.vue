<template>
  <section class="info-section">
    <div class="section-title">{{ t('about.legal.title') }}</div>
    <van-cell-group inset>
      <van-cell :title="t('about.legal.privacy')" icon="lock" is-link @click="$emit('show-popup', 'privacy')" />
      <van-cell :title="t('about.legal.agreement')" icon="description" is-link @click="$emit('show-popup', 'agreement')" />
      <van-cell :title="t('about.legal.disclaimer')" icon="warning-o" is-link @click="$emit('show-popup', 'disclaimer')" />
    </van-cell-group>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { CellGroup as VanCellGroup, Cell as VanCell } from 'vant'

const { t } = useI18n()

defineEmits(['show-popup'])
</script>

<style lang="less" scoped>
.section-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: var(--spacing-lg) var(--spacing-md) var(--spacing-md);
  font-weight: var(--font-weight-medium);
}

/* 信息区域 */
.info-section {
  margin: 0 var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}
</style>
