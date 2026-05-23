<template>
  <van-action-sheet
    :show="visible"
    :actions="themeOptions"
    @update:show="handleClose"
    @select="handleSelect"
    :cancel-text="t('common.cancel')"
    :description="t('theme.selectTheme')"
  />
</template>

<script setup>
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { showToast } from 'vant';
  import { ActionSheet as VanActionSheet } from 'vant';
  import { useThemeStore } from '@/stores/theme';

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['update:visible']);

  const { t } = useI18n();
  const themeStore = useThemeStore();

  const themeOptions = computed(() => [
    { name: t('theme.light'), value: 'light' },
    { name: t('theme.dark'), value: 'dark' },
    { name: t('theme.auto'), value: 'auto' },
  ]);

  const handleClose = () => {
    emit('update:visible', false);
  };

  const handleSelect = action => {
    emit('update:visible', false);
    themeStore.setThemeMode(action.value);
    showToast(t('common.success'));
  };
</script>
