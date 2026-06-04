<template>
  <FilterTabs 
    v-model="activeFilter"
    :tabs="tabs"
  />
</template>

<script setup>
  import { useI18n } from 'vue-i18n';
  import FilterTabs from '@/components/FilterTabs/index.vue';

  // ========================================
  // i18n
  // ========================================
  const { t } = useI18n();

  // ========================================
  // State
  // ========================================
  const activeFilter = defineModel();

  // 标签数据
  const tabs = [
    { value: 'all', label: t('badges.filter.all') },
    { value: 'unlocked', label: t('badges.filter.unlocked') },
    { value: 'locked', label: t('badges.filter.locked') },
  ];
</script>


