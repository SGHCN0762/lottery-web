<template>
  <div class="almanac-detail-page" ref="pageRef">
    <template v-if="almanac">
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
    </template>

    <van-empty v-else description="暂无黄历信息" />
  </div>
</template>

<script setup>
  import { ref, shallowRef, computed, onMounted } from 'vue';
  import { Empty as VanEmpty } from 'vant';
  import { useAlmanacDetail } from './hooks/useAlmanacDetail';

  const { almanac, lunarInfo, dateStr, scrollToTimeLuck } = useAlmanacDetail();

  const AlmanacHeader = shallowRef(null);
  const AlmanacYiJi = shallowRef(null);
  const AlmanacChongSha = shallowRef(null);
  const AlmanacDetail = shallowRef(null);
  const AlmanacPengZu = shallowRef(null);

  const loadComponents = async () => {
    const [
      { default: Header },
      { default: YiJi },
      { default: ChongSha },
      { default: Detail },
      { default: PengZu },
    ] = await Promise.all([
      import('./components/AlmanacHeader.vue'),
      import('./components/AlmanacYiJi.vue'),
      import('./components/AlmanacChongSha.vue'),
      import('./components/AlmanacDetail.vue'),
      import('./components/AlmanacPengZu.vue'),
    ]);

    AlmanacHeader.value = Header;
    AlmanacYiJi.value = YiJi;
    AlmanacChongSha.value = ChongSha;
    AlmanacDetail.value = Detail;
    AlmanacPengZu.value = PengZu;
  };

  onMounted(() => {
    loadComponents();
  });
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
    }
  }
</style>
