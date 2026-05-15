import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

// 注册 duration 插件
dayjs.extend(duration);

/**
 * 倒计时 hook
 * @param {Object|Date} targetDate - 目标日期
 * @returns {Object} - 包含倒计时数据和方法的响应式对象
 */
export function useCountdown(targetDate) {
  // 使用 dayjs 处理目标日期
  const targetDateRef = computed(() => {
    try {
      if (!targetDate) {
        console.error("targetDate 为空");
        // 设置为明天的这个时候作为默认值
        return dayjs().add(1, "day");
      }

      const parsedDate = dayjs(targetDate);

      if (!parsedDate.isValid()) {
        console.error("目标日期无效:", targetDate);
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
      const target = targetDateRef.value;
      const now = dayjs();

      // 计算时间差（毫秒）
      const diff = target.diff(now);

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
  let rafId = null; // 记录 rAF ID

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

  return {
    days,
    hours,
    minutes,
    seconds,
    formattedDays,
    formattedHours,
    formattedMinutes,
    formattedSeconds,
  };
}
