<template>
  <section class="settings-section">
    <div class="section-title">{{ t('settings.personalInfo') }}</div>
    <van-cell-group inset>
      <van-cell :title="t('settings.avatar')" is-link @click="$emit('edit-avatar')">
        <template #right-icon>
          <van-image round width="40" height="40" :src="userInfo.avatar || defaultAvatar" />
        </template>
      </van-cell>

      <van-cell
        :title="t('settings.nickname')"
        :value="userInfo.nickname"
        is-link
        @click="$emit('edit-nickname')"
      />

      <van-cell :title="t('settings.userId')" :value="userInfo.userId" readonly />
    </van-cell-group>
  </section>
</template>

<script setup>
  import { useI18n } from 'vue-i18n';
  import { CellGroup as VanCellGroup, Cell as VanCell, Image as VanImage } from 'vant';

  defineProps({
    userInfo: {
      type: Object,
      required: true,
    },
  });

  defineEmits(['edit-avatar', 'edit-nickname']);

  const { t } = useI18n();

  const defaultAvatar = 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg';
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
