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
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";
import { Icon as VanIcon } from "vant";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

// 注册 duration 插件
dayjs.extend(duration);

const { t } = useI18n();

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

// 使用 dayjs 处理目标日期
const targetDateRef = computed(() => {
  try {
    if (!props.targetDate) {
      console.error("targetDate 为空");
      // 设置为明天的这个时候作为默认值
      return dayjs().add(1, "day");
    }

    const parsedDate = dayjs(props.targetDate);

    if (!parsedDate.isValid()) {
      console.error("目标日期无效:", props.targetDate);
      return dayjs().add(1, "day");
    }

    // 确保时间是当天的23:59:59.999，这样倒计时更准确
    return parsedDate.endOf("day");
  } catch (e) {
    console.error("处理 targetDate 时出错:", e);
    return dayjs().add(1, "day");
  }
});

const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

// 格式化倒计时值，确保两位数显示
const formattedDays = computed(() => String(days.value).padStart(2, "0"));
const formattedHours = computed(() => String(hours.value).padStart(2, "0"));
const formattedMinutes = computed(() => String(minutes.value).padStart(2, "0"));
const formattedSeconds = computed(() => String(seconds.value).padStart(2, "0"));

// 使用 dayjs 优化倒计时更新函数
const updateCountdown = () => {
  try {
    const targetDate = targetDateRef.value;
    const now = dayjs();

    // 计算时间差（毫秒）
    const diff = targetDate.diff(now);

    if (diff > 0) {
      // 手动计算天、时、分、秒
      days.value = Math.floor(diff / (1000 * 60 * 60 * 24));
      hours.value = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      minutes.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      seconds.value = Math.floor((diff % (1000 * 60)) / 1000);
    } else {
      // 如果倒计时结束，全部置为0
      days.value = 0;
      hours.value = 0;
      minutes.value = 0;
      seconds.value = 0;
    }
  } catch (error) {
    console.error("倒计时更新错误:", error);
    // 出错时也重置为0
    days.value = 0;
    hours.value = 0;
    minutes.value = 0;
    seconds.value = 0;
  }
};

let intervalId = null;
let rafId = null; // 新增记录 rAF ID

onMounted(() => {
  updateCountdown();
  rafId = requestAnimationFrame(() => {
    intervalId = setInterval(updateCountdown, 1000);
  });
});

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId); // 取消未执行的 rAF
  if (intervalId) clearInterval(intervalId); // 清除已启动的定时器
});
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
