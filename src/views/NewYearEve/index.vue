<template>
  <div class="new-year-eve-page">
    <!-- 页面背景 -->
    <PageBackground :floating-items="floatingItems" />

    <!-- 页面内容 -->
    <div class="page-content">
      <!-- Hero 区域: 标题 + 倒计时 -->
      <section class="hero-section">
        <div class="countdown-wrapper">
          <CountdownTimer
            :days="formattedDays"
            :hours="formattedHours"
            :minutes="formattedMinutes"
            :seconds="formattedSeconds"
            :target-date="formattedTargetDate"
            :title="t('newYearEve.countdownTitle')"
          />
        </div>
      </section>

      <!-- 除夕习俗 -->
      <section class="content-section customs-section">
        <CustomsSection :title="t('newYearEve.customsTitle')" :customs="customs" />
      </section>

      <!-- 除夕美食 -->
      <section class="content-section food-section">
        <FoodSection :title="t('newYearEve.foodTitle')" :foods="foods" />
      </section>

      <!-- 新年祝福 -->
      <section class="content-section blessings-section">
        <BlessingsSection
          :title="t('newYearEve.blessingsTitle')"
          :blessings="blessings"
          :share-text="t('newYearEve.shareBlessing')"
          @share="shareBlessing"
        />
      </section>
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
  import PageBackground from './components/PageBackground.vue';
  import CountdownTimer from './components/CountdownTimer.vue';
  import BlessingsSection from './components/BlessingsSection.vue';
  import CustomsSection from './components/CustomsSection.vue';
  import FoodSection from './components/FoodSection.vue';

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

  // 除夕习俗数据 - 使用 computed 确保语言切换时更新
  const customs = computed(() => [
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

  // 除夕美食数据 - 使用 computed 确保语言切换时更新
  const foods = computed(() => [
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

  // 新年祝福数据 - 使用 computed 确保语言切换时更新
  const blessings = computed(() => [
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
    background: linear-gradient(135deg, #0a0e27 0%, #1a237e 50%, #4a148c 100%);
    color: #fff;

    // 添加科技感光效
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background:
        radial-gradient(circle at 30% 20%, rgba(66, 165, 245, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 70% 80%, rgba(156, 39, 176, 0.2) 0%, transparent 50%);
      z-index: 0;
    }

    // 页面内容 - 优化间距和最大宽度
    .page-content {
      position: relative;
      z-index: 1;
      padding: calc(var(--spacing-lg) + env(safe-area-inset-top, 0px)) var(--spacing-md)
        calc(var(--spacing-xl) + env(safe-area-inset-bottom, 0px));
      max-width: 800px;
      margin: 0 auto;

      // 添加科技感装饰线
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(
          90deg,
          rgba(0, 255, 255, 0),
          rgba(0, 255, 255, 0.5),
          rgba(0, 255, 255, 0)
        );
        opacity: 0.5;
      }
    }

    // Hero 区域 - 优化间距
    .hero-section {
      margin-bottom: var(--spacing-2xl);
      animation: fadeInUp 0.6s ease-out;

      .countdown-wrapper {
        margin-top: var(--spacing-lg);
      }
    }

    // 内容区块通用样式 - 增加卡片效果
    .content-section {
      margin-bottom: var(--spacing-xl);
      opacity: 0;
      transform: translateY(20px);
      animation: fadeInUp 0.6s ease-out forwards;

      // 添加科技感边框装饰
      &::after {
        content: '';
        position: absolute;
        bottom: -15px;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(
          90deg,
          rgba(0, 255, 255, 0),
          rgba(0, 255, 255, 0.5),
          rgba(0, 255, 255, 0)
        );
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      &:hover::after {
        opacity: 0.5;
      }

      &:nth-child(2) {
        animation-delay: 0.15s;
      }

      &:nth-child(3) {
        animation-delay: 0.3s;
      }

      &:nth-child(4) {
        animation-delay: 0.45s;
      }
    }
  }

  // 渐入动画 - 更流畅
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  // 响应式优化
  @media (max-width: 768px) {
    .new-year-eve-page {
      .page-content {
        padding: calc(var(--spacing-md) + env(safe-area-inset-top, 0px)) var(--spacing-sm)
          calc(var(--spacing-lg) + env(safe-area-inset-bottom, 0px));
      }

      .hero-section {
        margin-bottom: var(--spacing-xl);
      }

      .content-section {
        margin-bottom: var(--spacing-lg);
      }
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .new-year-eve-page {
      .page-content {
        padding: calc(var(--spacing-lg) + env(safe-area-inset-top, 0px)) var(--spacing-md)
          calc(var(--spacing-xl) + env(safe-area-inset-bottom, 0px));
      }
    }
  }
</style>
