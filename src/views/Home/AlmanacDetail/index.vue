<template>
  <div class="almanac-detail-page" ref="pageRef">
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

      <div class="save-image-btn">
        <generate-image :page-ref="pageRef" :icon-props="{ color: '#d4a017', size: 24 }" />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import GenerateImage from '@/components/GenerateImage/index.vue';
  import { useAlmanacDetail } from './hooks/useAlmanacDetail';
  import AlmanacHeader from './components/AlmanacHeader.vue';
  import AlmanacYiJi from './components/AlmanacYiJi.vue';
  import AlmanacChongSha from './components/AlmanacChongSha.vue';
  import AlmanacDetail from './components/AlmanacDetail.vue';
  import AlmanacPengZu from './components/AlmanacPengZu.vue';

  const { almanac, lunarInfo, dateStr, scrollToTimeLuck } = useAlmanacDetail();

  const pageRef = ref(null);
</script>

<style lang="less" scoped>
  .almanac-detail-page {
    min-height: 100vh;
    background: var(--color-bg-primary);
    padding: var(--spacing-lg);
    padding-bottom: calc(var(--spacing-xl) + env(safe-area-inset-bottom) + 80px);

    .page-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xl);
      position: relative;
      .save-image-btn {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
</style>
