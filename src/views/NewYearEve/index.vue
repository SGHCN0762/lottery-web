<template>
  <div class="new-year-eve-page">
    <!-- 页面背景 -->
    <PageBackground :floating-items="floatingItems" />

    <!-- 页面内容 -->
    <div class="page-content">
      <!-- 头部 -->
      <PageHeader :title="t('newYearEve.title')" :subtitle="t('newYearEve.subtitle')" />

      <!-- 主倒计时区域 -->
      <div class="main-countdown">
        <CountdownTimer
          :days="formattedDays"
          :hours="formattedHours"
          :minutes="formattedMinutes"
          :seconds="formattedSeconds"
          :target-date="formattedTargetDate"
          :title="t('newYearEve.countdownTitle')"
        />
      </div>

      <!-- 除夕习俗卡片 -->
      <CustomsSection :title="t('newYearEve.customsTitle')" :customs="customs" />

      <!-- 除夕美食 -->
      <FoodSection :title="t('newYearEve.foodTitle')" :foods="foods" />

      <!-- 新年祝福 -->
      <BlessingsSection
        :title="t('newYearEve.blessingsTitle')"
        :blessings="blessings"
        :share-text="t('newYearEve.shareBlessing')"
        @share="shareBlessing"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Button as VanButton, showToast } from 'vant';
  import dayjs from 'dayjs';
  import { useCountdown } from '@/hooks/useCountdown';
  import { useNewYearEve } from '@/hooks/useNewYearEve';
  import {
    PageBackground,
    PageHeader,
    CountdownTimer,
    CustomsSection,
    FoodSection,
    BlessingsSection,
  } from './components';

  const { t } = useI18n();

  // 获取除夕日期
  const { newYearEveDate } = useNewYearEve();

  // 使用倒计时
  const { formattedDays, formattedHours, formattedMinutes, formattedSeconds } = useCountdown(
    newYearEveDate.value
  );

  // 格式化目标日期
  const formattedTargetDate = computed(() => {
    return dayjs(newYearEveDate.value).format('YYYY年MM月DD日');
  });

  // 除夕习俗数据
  const customs = ref([
    {
      icon: '🏮',
      title: t('newYearEve.customs.doorGod'),
      description: t('newYearEve.customs.doorGodDesc'),
    },
    {
      icon: '🧨',
      title: t('newYearEve.customs.firecrackers'),
      description: t('newYearEve.customs.firecrackersDesc'),
    },
    {
      icon: '🍜',
      title: t('newYearEve.customs.dumplings'),
      description: t('newYearEve.customs.dumplingsDesc'),
    },
    {
      icon: '🧧',
      title: t('newYearEve.customs.redEnvelopes'),
      description: t('newYearEve.customs.redEnvelopesDesc'),
    },
  ]);

  // 除夕美食数据
  const foods = ref([
    {
      icon: '🍖',
      name: t('newYearEve.foods.fish'),
      description: t('newYearEve.foods.fishDesc'),
    },
    {
      icon: '🍜',
      name: t('newYearEve.foods.dumplings'),
      description: t('newYearEve.foods.dumplingsDesc'),
    },
    {
      icon: '🍯',
      name: t('newYearEve.foods.riceCake'),
      description: t('newYearEve.foods.riceCakeDesc'),
    },
    {
      icon: '🍊',
      name: t('newYearEve.foods.orange'),
      description: t('newYearEve.foods.orangeDesc'),
    },
  ]);

  // 新年祝福数据
  const blessings = ref([
    t('newYearEve.blessings.b1'),
    t('newYearEve.blessings.b2'),
    t('newYearEve.blessings.b3'),
    t('newYearEve.blessings.b4'),
    t('newYearEve.blessings.b5'),
  ]);

  // 浮动元素
  const floatingItems = ref([
    { icon: '🏮', delay: '0s' },
    { icon: '🧨', delay: '1s' },
    { icon: '🧧', delay: '2s' },
    { icon: '🎊', delay: '3s' },
    { icon: '🎉', delay: '4s' },
    { icon: '🎆', delay: '5s' },
    { icon: '🎇', delay: '6s' },
    { icon: '🧧', delay: '7s' },
  ]);

  // 分享祝福
  const shareBlessing = () => {
    // 实现分享逻辑
    showToast({ message: t('newYearEve.shareSuccess'), icon: 'success' });
  };
</script>

<style lang="less" scoped>
  .new-year-eve-page {
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
    background: linear-gradient(135deg, #b71c1c 0%, #d50000 100%);
    color: #fff;

    // 页面内容
    .page-content {
      position: relative;
      z-index: 1;
      padding: calc(var(--spacing-xl) + env(safe-area-inset-top, 0px)) var(--spacing-md)
        var(--spacing-xl);
    }
  }
</style>
