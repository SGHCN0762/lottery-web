<template>
  <section class="settings-section">
    <div class="section-title">{{ t('settings.notification') }}</div>
    <van-cell-group inset>
      <van-cell :title="t('settings.gameNotification')">
        <template #right-icon>
          <van-switch v-model="localSettings.gameNotification" size="20" />
        </template>
      </van-cell>

      <van-cell :title="t('settings.checkinReminder')">
        <template #right-icon>
          <van-switch v-model="localSettings.checkinReminder" size="20" />
        </template>
      </van-cell>

      <van-cell :title="t('settings.systemMessage')">
        <template #right-icon>
          <van-switch v-model="localSettings.systemMessage" size="20" />
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
    gameNotification: props.settings.gameNotification,
    checkinReminder: props.settings.checkinReminder,
    systemMessage: props.settings.systemMessage,
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
