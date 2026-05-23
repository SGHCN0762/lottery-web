<template>
  <van-action-sheet
    :show="visible"
    :actions="languageOptions"
    @update:show="handleClose"
    @select="handleSelect"
    :cancel-text="t('common.cancel')"
    :description="t('language.selectLanguage')"
  />
</template>

<script setup>
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { ActionSheet as VanActionSheet } from 'vant';
  import { SUPPORTED_LOCALES, switchLanguage } from '@/i18n';

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['update:visible']);

  const { t } = useI18n();

  const languageOptions = computed(() =>
    SUPPORTED_LOCALES.map(locale => ({
      name: `${locale.flag} ${t(`language.${locale.code.replace('-', '')}`)}`,
      value: locale.code,
    }))
  );

  const handleClose = () => {
    emit('update:visible', false);
  };

  const handleSelect = action => {
    emit('update:visible', false);
    switchLanguage(action.value);
  };
</script>
