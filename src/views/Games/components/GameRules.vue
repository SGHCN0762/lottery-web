<template>
  <section class="game-rules">
    <h3 class="rules-title">📋 {{ translatedTitle }}</h3>
    <ul class="rules-list">
      <li v-for="(rule, index) in translatedRules" :key="index">{{ rule }}</li>
    </ul>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  /**
   * 规则标题的 i18n key
   * 例如: 'dailyCheckIn.rules.title'
   */
  titleKey: {
    type: String,
    required: true
  },
  /**
   * 规则列表的 i18n keys 数组
   * 例如: ['dailyCheckIn.rules.rule1', 'dailyCheckIn.rules.rule2', ...]
   */
  ruleKeys: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.length > 0 && value.length <= 10
    }
  }
})

/**
 * 获取翻译后的标题
 */
const translatedTitle = computed(() => {
  return t(props.titleKey)
})

/**
 * 获取翻译后的规则列表
 */
const translatedRules = computed(() => {
  return props.ruleKeys.map(key => t(key))
})
</script>

<style lang="less" scoped>
.game-rules {
  background: var(--color-bg-secondary);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-lg);
  border-left: 4px solid var(--color-primary);

  .rules-title {
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-sm);
    font-weight: var(--font-weight-semibold);
  }

  .rules-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      line-height: var(--line-height-relaxed);
      padding-left: var(--spacing-md);
      position: relative;
      margin-bottom: var(--spacing-xs);

      &::before {
        content: '•';
        position: absolute;
        left: 0;
        color: var(--color-primary);
        font-weight: bold;
      }
    }
  }
}
</style>
