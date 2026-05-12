<template>
  <van-popup :show="show" @update:show="$emit('update:show', $event)" position="bottom" round>
    <div class="date-detail-modal">
      <div class="modal-header">
        <h3>{{ year }}年{{ month }}月{{ day }}日</h3>
        <p>{{ lunarFull }}</p>
      </div>
      <div class="modal-content">
        <div v-if="festival" class="detail-festival">
          <van-icon name="gift-o" size="24" color="#FF9500" />
          <span>{{ festival }}</span>
        </div>
        <div v-if="weekdayText" class="detail-weekday">
          <span>星期{{ weekdayText }}</span>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { computed } from "vue";
import { Icon as VanIcon, Popup as VanPopup } from "vant";

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  date: {
    type: Object,
    default: () => ({})
  }
});

defineEmits(['update:show']);

const year = computed(() => props.date?.year || "");
const month = computed(() => props.date?.month || "");
const day = computed(() => props.date?.day || "");
const lunarFull = computed(() => props.date?.lunarFull || "");
const festival = computed(() => props.date?.festival || null);
const weekdayText = computed(() => {
  if (!props.date?.weekdayIndex && props.date?.weekdayIndex !== 0) return "";
  return ["日", "一", "二", "三", "四", "五", "六"][props.date.weekdayIndex];
});
</script>

<style lang="less" scoped>
.date-detail-modal {
  padding: var(--spacing-xl);

  .modal-header {
    text-align: center;
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-md);
    border-bottom: 2px solid var(--color-bg-primary);

    h3 {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-text-primary);
      margin: 0 0 var(--spacing-xs) 0;
    }

    p {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      margin: 0;
    }
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);

    .detail-festival {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-md);
      background: linear-gradient(
        135deg,
        rgba(255, 149, 0, 0.1) 0%,
        rgba(255, 149, 0, 0.05) 100%
      );
      border-radius: var(--radius-md);
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      color: var(--color-warning);
    }

    .detail-weekday {
      text-align: center;
      font-size: var(--font-size-base);
      color: var(--color-text-secondary);
    }
  }
}
</style>
