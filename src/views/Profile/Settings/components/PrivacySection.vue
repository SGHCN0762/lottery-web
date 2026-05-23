<template>
  <section class="settings-section">
    <div class="section-title">{{ t('settings.privacy') }}</div>
    <van-cell-group inset>
      <van-cell :title="t('settings.showOnlineStatus')">
        <template #right-icon>
          <van-switch v-model="localSettings.showOnlineStatus" size="20" />
        </template>
      </van-cell>

      <van-cell :title="t('settings.allowViewRecords')">
        <template #right-icon>
          <van-switch v-model="localSettings.allowViewRecords" size="20" />
        </template>
      </van-cell>
    </van-cell-group>
  </section>
</template>

<script setup>
  import { reactive, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { CellGroup as VanCellGroup, Cell as VanCell, Switch as VanSwitch } from 'vant';

  const props = defineProps({
    settings: {
      type: Object,
      required: true,
    },
  });

  const emit = defineEmits(['update']);

  const { t } = useI18n();

  const localSettings = reactive({
    showOnlineStatus: props.settings.showOnlineStatus,
    allowViewRecords: props.settings.allowViewRecords,
  });

  watch(
    localSettings,
    newVal => {
      emit('update', { ...props.settings, ...newVal });
    },
    { deep: true }
  );
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
