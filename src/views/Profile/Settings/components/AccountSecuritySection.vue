<template>
  <section class="settings-section">
    <div class="section-title">{{ t('settings.accountSecurity') }}</div>
    <van-cell-group inset>
      <van-cell
        :title="t('settings.bindPhone')"
        :value="userInfo.phone || t('settings.notBound')"
        is-link
        @click="$emit('bind-phone')"
      >
        <template #right-icon>
          <van-tag v-if="!userInfo.phone" type="danger" size="medium">{{
            t('settings.notBound')
          }}</van-tag>
        </template>
      </van-cell>

      <van-cell :title="t('settings.changePassword')" is-link @click="$emit('change-password')" />

      <van-cell :title="t('settings.deviceManage')" is-link @click="$emit('device-manage')" />
    </van-cell-group>
  </section>
</template>

<script setup>
  import { useI18n } from 'vue-i18n';
  import { CellGroup as VanCellGroup, Cell as VanCell, Tag as VanTag } from 'vant';

  defineProps({
    userInfo: {
      type: Object,
      required: true,
    },
  });

  defineEmits(['bind-phone', 'change-password', 'device-manage']);

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
</style>
