<template>
  <section class="intro-card">
    <van-icon :name="icon" :size="32" :color="iconColor" />
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </section>
</template>

<script setup>
  import { Icon as VanIcon } from 'vant';

  defineProps({
    icon: {
      type: String,
      default: 'edit',
    },
    iconColor: {
      type: String,
      default: 'var(--color-primary)',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  });
</script>

<style lang="less" scoped>
  .intro-card {
    margin: var(--spacing-sm);
    padding: var(--spacing-md);
    background: var(--color-bg-secondary);
    border-radius: var(--radius-md);
    text-align: center;

    .van-icon {
      margin-bottom: var(--spacing-sm);
    }

    h3 {
      margin: 0 0 3px 0;
      font-size: var(--font-size-md);
      color: var(--color-text-primary);
    }

    p {
      margin: 0;
      font-size: 12px;
      color: var(--color-text-secondary);
      line-height: 1.5;
    }
  }
</style>
