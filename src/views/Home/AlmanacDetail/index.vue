<template>
  <div class="almanac-detail-page">
    <!-- 头部信息 -->
    <AlmanacHeader
      :date-str="dateStr"
      :almanac="almanac"
      :lunar-info="lunarInfo"
      @scroll-to-time-luck="scrollToTimeLuck"
    />

    <!-- 内容区 -->
    <div class="page-content">
      <!-- 宜忌 -->
      <AlmanacYiJi :almanac="almanac" />

      <!-- 冲煞 -->
      <AlmanacChongSha :almanac="almanac" />

      <!-- 详细信息 -->
      <AlmanacDetail :almanac="almanac" />

      <!-- 彭祖百忌 -->
      <AlmanacPengZu :almanac="almanac" />
    </div>
  </div>
</template>

<script setup>
  import { useAlmanacDetail } from './hooks/useAlmanacDetail';
  import AlmanacHeader from './components/AlmanacHeader.vue';
  import AlmanacYiJi from './components/AlmanacYiJi.vue';
  import AlmanacChongSha from './components/AlmanacChongSha.vue';
  import AlmanacDetail from './components/AlmanacDetail.vue';
  import AlmanacPengZu from './components/AlmanacPengZu.vue';
  import AlmanacTimeLuck from './components/AlmanacTimeLuck.vue';

  const { almanac, lunarInfo, dateStr, scrollToTimeLuck } = useAlmanacDetail();
</script>

<style lang="less" scoped>
  .almanac-detail-page {
    min-height: 100vh;
    background: var(--color-bg-primary);
    padding: var(--spacing-lg);
    padding-bottom: calc(var(--spacing-xl) + env(safe-area-inset-bottom));

    .page-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xl);
    }
  }
</style>
