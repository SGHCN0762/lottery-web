<template>
  <div class="customs-section">
    <div class="section-header">
      <h2 class="section-title">{{ title }}</h2>
      <div class="tech-line"></div>
    </div>
    <div class="customs-cards">
      <CustomCard
        v-for="(custom, index) in customs"
        :key="index"
        :icon="custom.icon"
        :title="custom.title"
        :description="custom.description"
      />
    </div>
  </div>
</template>

<script setup>
  import CustomCard from './CustomCard.vue';

  defineProps({
    title: {
      type: String,
      required: true,
    },
    customs: {
      type: Array,
      required: true,
    },
  });
</script>

<style lang="less" scoped>
  .customs-section {
    margin-bottom: var(--spacing-xl);

    // 科技感标题部分
    .section-header {
      text-align: center;
      margin-bottom: var(--spacing-md);
      position: relative;

      .section-title {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        margin: 0 0 var(--spacing-sm) 0;
        color: #fff;
        text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        position: relative;
        z-index: 2;
      }

      .tech-line {
        height: 1px;
        background: linear-gradient(
          90deg,
          rgba(0, 255, 255, 0),
          rgba(0, 255, 255, 0.8),
          rgba(0, 255, 255, 0)
        );
        margin: 0 auto;
        width: 60%;
        position: relative;
        z-index: 1;
      }
    }

    .customs-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-md);

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }
  }
</style>
