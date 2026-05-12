<template>
  <section class="spring-festival-entry" @click="$emit('click')">
    <div class="entry-content">
      <div class="entry-icon">🧧</div>
      <div class="entry-info">
        <span class="entry-title">{{ t("home.springFestivalCountdown") }}</span>
        <span class="entry-subtitle">{{ days }}{{ t("home.daysLater") }}</span>
      </div>
    </div>
    <van-icon name="arrow" class="entry-arrow" />
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { Icon as VanIcon } from "vant";

const { t } = useI18n();

const props = defineProps({
  days: {
    type: Number,
    required: true
  }
});

defineEmits(['click']);
</script>

<style lang="less" scoped>
.spring-festival-entry {
  margin: var(--spacing-md);
  background: linear-gradient(135deg, #dc143c 0%, #8b0000 100%);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 20px rgba(220, 20, 60, 0.4);
  cursor: pointer;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;

  &::before {
    content: "🧧";
    position: absolute;
    top: -20px;
    right: -20px;
    font-size: 80px;
    opacity: 0.2;
    transform: rotate(15deg);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(220, 20, 60, 0.6);
  }

  .entry-content {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    z-index: 1;
  }

  .entry-icon {
    font-size: 48px;
    animation: bounce 1s ease-in-out infinite alternate;
  }

  .entry-info {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .entry-title {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-bold);
      color: #ffd700;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .entry-subtitle {
      font-size: var(--font-size-sm);
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .entry-arrow {
    font-size: 24px;
    color: #ffd700;
    z-index: 1;
    transition: transform var(--transition-fast);
  }

  &:hover .entry-arrow {
    transform: translateX(4px);
  }
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-8px);
  }
}
</style>
