<template>
  <div class="page-background">
    <div class="background-layer"></div>
    <div class="floating-elements">
      <div
        class="floating-item"
        v-for="(item, index) in floatingItems"
        :key="index"
        :style="{ animationDelay: item.delay }"
      >
        {{ item.icon }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  floatingItems: {
    type: Array,
    default: () => []
  }
});
</script>

<style lang="less" scoped>
.page-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;

  .background-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect fill="%23b71c1c" width="100" height="100"/><path fill="%23d50000" d="M0,0 L100,100 M100,0 L0,100"/></svg>');
    opacity: 0.1;
  }

  .floating-elements {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    .floating-item {
      position: absolute;
      font-size: 24px;
      animation: float 8s ease-in-out infinite;
      opacity: 0.7;

      &:nth-child(1) {
        top: 10%;
        left: 10%;
      }
      &:nth-child(2) {
        top: 20%;
        left: 80%;
        animation-duration: 10s;
      }
      &:nth-child(3) {
        top: 60%;
        left: 15%;
        animation-duration: 12s;
      }
      &:nth-child(4) {
        top: 80%;
        left: 70%;
        animation-duration: 9s;
      }
      &:nth-child(5) {
        top: 40%;
        left: 90%;
        animation-duration: 11s;
      }
      &:nth-child(6) {
        top: 70%;
        left: 30%;
        animation-duration: 7s;
      }
      &:nth-child(7) {
        top: 30%;
        left: 50%;
        animation-duration: 13s;
      }
      &:nth-child(8) {
        top: 90%;
        left: 50%;
        animation-duration: 8s;
      }
    }
  }
}

// 动画
@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
    opacity: 1;
  }
  100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.7;
  }
}
</style>
