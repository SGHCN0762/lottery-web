<template>
  <section class="settings-section">
    <div class="section-title">{{ t('settings.theme') }}</div>
    <van-cell-group inset>
      <van-cell
        :title="t('settings.currentTheme')"
        :value="currentThemeName"
        is-link
        @click="$emit('change-theme')"
      />
    </van-cell-group>
  </section>
</template>

<script setup>
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { CellGroup as VanCellGroup, Cell as VanCell } from 'vant';
  import { useThemeStore } from '@/stores/theme';

  defineEmits(['change-theme']);

  const { t } = useI18n();
  const themeStore = useThemeStore();

  const currentThemeName = computed(() => {
    const mode = themeStore.themeMode;
    return t(`theme.${mode}`);
  });
</script>

<style lang="less" scoped>
  .settings-section {
    margin-bottom: var(--spacing-md);

    .section-title {
      font-size: 13px;
      color: var(--color-text-secondary);
      margin: var(--spacing-md) var(--spacing-sm) var(--spacing-sm);
      font-weight: var(--font-weight-medium);
    }
  }
</style>
