<template>
  <section class="settings-section">
    <div class="section-title">{{ t('settings.language') }}</div>
    <van-cell-group inset>
      <van-cell
        :title="t('settings.currentLanguage')"
        :value="currentLanguageName"
        is-link
        @click="$emit('change-language')"
      />
    </van-cell-group>
  </section>
</template>

<script setup>
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { CellGroup as VanCellGroup, Cell as VanCell } from 'vant';
  import { SUPPORTED_LOCALES, getCurrentLocale } from '@/i18n';

  defineEmits(['change-language']);

  const { t } = useI18n();

  const currentLanguageName = computed(() => {
    const locale = getCurrentLocale();
    const lang = SUPPORTED_LOCALES.find(l => l.code === locale);
    return lang ? t(`language.${lang.code.replace('-', '')}`) : t('language.zhCN');
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
