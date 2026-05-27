<template>
  <transition name="fade">
    <div v-if="visible" class="skeleton-container">
      <img src="@/assets/logo.svg" :alt="t('app.name')" class="skeleton-logo" />
    </div>
  </transition>
</template>

<script setup>
  import { ref, onMounted, watch } from 'vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const visible = ref(true);

  onMounted(() => {
    setTimeout(
      () => {
        visible.value = false;
      },
      500 + Math.random() * 800
    );
  });

  watch(visible, (newVal) => {
    if (newVal) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }, { immediate: true });
</script>

<style scoped>
  .skeleton-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color-bg-primary);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .skeleton-logo {
    width: 160px;
    height: 160px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease-out;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
