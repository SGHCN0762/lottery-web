<template>
  <section class="intro-card">
    <van-icon name="warning-o" size="32" color="var(--color-danger)" />
    <h3>违规举报</h3>
    <p>如发现违规行为或不良内容,请及时向我们举报,我们将尽快处理</p>
  </section>
</template>

<script setup>
  import { Icon as VanIcon } from 'vant';
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
