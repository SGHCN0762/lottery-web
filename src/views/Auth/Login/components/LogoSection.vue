<template>
  <section class="logo-section">
    <div class="logo-container">
      <div class="logo-icon">
        <img src="@/assets/logo.svg" alt="瑶光神域 Logo" class="app-logo" />
      </div>
    </div>
  </section>
</template>

<script setup>
// 此组件仅负责展示，无复杂逻辑
</script>

<style lang="less" scoped>
.logo-section {
  text-align: center;
  margin-bottom: 16px;

  .logo-container {
    .logo-icon {
      margin-bottom: 8px;
      
      .app-logo {
        width: 140px;
        height: 140px;
        object-fit: contain;
        animation: subtlePulse 4s ease-in-out infinite;
      }
    }
  }
}

@keyframes subtlePulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.95;
  }
}
</style>