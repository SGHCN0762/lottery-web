<template>
  <div class="food-section">
    <h2 class="section-title">{{ title }}</h2>
    <div class="food-cards">
      <FoodCard
        v-for="(food, index) in foods"
        :key="index"
        :icon="food.icon"
        :name="food.name"
        :description="food.description"
      />
    </div>
  </div>
</template>

<script setup>
import FoodCard from './FoodCard.vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  foods: {
    type: Array,
    required: true
  }
});
</script>

<style lang="less" scoped>
.food-section {
  margin-bottom: var(--spacing-xl);

  .section-title {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    margin: 0 0 var(--spacing-md) 0;
    text-align: center;
    color: #fff;
  }

  .food-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-md);
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
