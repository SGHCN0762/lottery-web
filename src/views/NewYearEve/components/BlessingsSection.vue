<template>
  <div class="blessings-section">
    <h2 class="section-title">{{ title }}</h2>
    <div class="blessings-container">
      <div class="blessing-item" v-for="(blessing, index) in blessings" :key="index">
        {{ blessing }}
      </div>
    </div>
    <button class="share-blessing" @click="$emit('share')">
      {{ shareText }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  blessings: {
    type: Array,
    required: true
  },
  shareText: {
    type: String,
    required: true
  }
});

defineEmits(['share']);
</script>

<style lang="less" scoped>
.blessings-section {
  margin-bottom: var(--spacing-xl);

  .section-title {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    margin: 0 0 var(--spacing-md) 0;
    text-align: center;
  }

  .blessings-container {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);

    .blessing-item {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 8px 16px;
      font-size: var(--font-size-sm);
      transition: all 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.05);
      }
    }
  }

  .share-blessing {
    width: 100%;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    font-weight: var(--font-weight-medium);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}
</style>
