<template>
  <section class="settings-section">
    <div class="section-title">{{ t('settings.others') }}</div>
    <van-cell-group inset>
      <van-cell
        :title="t('settings.clearCache')"
        :value="cacheSize"
        is-link
        @click="$emit('clear-cache')"
      />

      <van-cell
        :title="t('settings.checkUpdate')"
        :value="currentVersion"
        is-link
        @click="$emit('check-update')"
      />

      <van-cell :title="t('settings.logout')" class="logout-cell" @click="$emit('logout')" />
    </van-cell-group>
  </section>
</template>

<script setup>
  import { useI18n } from 'vue-i18n';
  import { CellGroup as VanCellGroup, Cell as VanCell } from 'vant';

  defineProps({
    cacheSize: {
      type: String,
      default: '0MB',
    },
    currentVersion: {
      type: String,
      default: 'v1.0.0',
    },
  });

  defineEmits(['clear-cache', 'check-update', 'logout']);

  const { t } = useI18n();
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

  .logout-cell {
    :deep(.van-cell__title) {
      color: var(--color-danger);
      text-align: center;
    }
  }
</style>
