<template>
  <section class="new-year-eve-entry" @click="$emit('click')">
    <div class="entry-content">
      <div class="entry-icon">🎊</div>
      <div class="entry-info">
        <span class="entry-title">{{ t("home.newYearEveCountdown") }}</span>
        <div class="countdown-display">
          <div class="countdown-item">
            <span class="countdown-value">{{ formattedDays }}</span>
            <span class="countdown-label">{{ t("home.days") }}</span>
          </div>
          <div class="countdown-item">
            <span class="countdown-value">{{ formattedHours }}</span>
            <span class="countdown-label">{{ t("home.hours") }}</span>
          </div>
          <div class="countdown-item">
            <span class="countdown-value">{{ formattedMinutes }}</span>
            <span class="countdown-label">{{ t("home.minutes") }}</span>
          </div>
          <div class="countdown-item">
            <span class="countdown-value">{{ formattedSeconds }}</span>
            <span class="countdown-label">{{ t("home.seconds") }}</span>
          </div>
        </div>
      </div>
    </div>
    <van-icon name="arrow" class="entry-arrow" />
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { Icon as VanIcon } from "vant";
import { useCountdown } from "../hooks/useCountdown";

const { t } = useI18n();

import dayjs from "dayjs";

const props = defineProps({
  targetDate: {
    type: [Date, Object],
    required: true,
    validator: (value) => {
      // 使用 dayjs 验证日期有效性
      try {
        return dayjs(value).isValid();
      } catch (e) {
        return false;
      }
    },
  },
});

defineEmits(["click"]);

// 使用倒计时 hook
const {
  formattedDays,
  formattedHours,
  formattedMinutes,
  formattedSeconds,
} = useCountdown(props.targetDate);
</script>

<style lang="less" scoped>
.new-year-eve-entry {
  margin: var(--spacing-md);
  background: linear-gradient(135deg, #1a237e 0%, #4a148c 100%);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 20px rgba(26, 35, 126, 0.4);
  cursor: pointer;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;

  &::before {
    content: "🎊";
    position: absolute;
    top: -20px;
    right: -20px;
    font-size: 80px;
    opacity: 0.2;
    transform: rotate(15deg);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(26, 35, 126, 0.6);
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
    gap: 8px;

    .entry-title {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-bold);
      color: #e1bee7;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .countdown-display {
      display: flex;
      gap: 8px;

      .countdown-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: rgba(255, 255, 255, 0.1);
        border-radius: var(--radius-sm);
        padding: 4px 8px;
        min-width: 45px;

        .countdown-value {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-bold);
          color: #fff;
          line-height: 1;
        }

        .countdown-label {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 2px;
        }
      }
    }
  }

  .entry-arrow {
    font-size: 24px;
    color: #e1bee7;
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
