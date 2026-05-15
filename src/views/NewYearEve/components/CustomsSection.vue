<template>
  <div class="customs-section">
    <h2 class="section-title">{{ title }}</h2>
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
    required: true
  },
  customs: {
    type: Array,
    required: true
  }
});
</script>

<style lang="less" scoped>
.customs-section {
  margin-bottom: var(--spacing-xl);

  .section-title {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    margin: 0 0 var(--spacing-md) 0;
    text-align: center;
  }

  .customs-cards {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-md);
  }
}
</style>
