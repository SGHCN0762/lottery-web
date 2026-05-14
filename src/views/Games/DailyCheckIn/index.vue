<template>
  <div class="daily-checkin-game">
    <!-- 游戏信息栏 -->
    <GameInfoBar :userPoints="userPoints" :consecutiveDays="consecutiveDays" />

    <!-- 游戏规则 -->
    <GameRules 
      title-key="dailyCheckIn.rules.title"
      :rule-keys="[
        'dailyCheckIn.rules.rule1',
        'dailyCheckIn.rules.rule2',
        'dailyCheckIn.rules.rule3',
        'dailyCheckIn.rules.rule4'
      ]"
    />

    <!-- 签到日历 -->
    <CheckInCalendar :calendarDays="calendarDays" />

    <!-- 签到奖励展示 -->
    <RewardsDisplay
      :milestones="milestones"
      :consecutiveDays="consecutiveDays"
      :getMilestoneStatus="getMilestoneStatus"
    />

    <!-- 签到按钮区域 -->
    <CheckInAction
      :canCheckIn="canCheckIn"
      :isCheckingIn="isCheckingIn"
      :hasCheckedInToday="hasCheckedInToday"
      :nextCheckInTime="nextCheckInTime"
      :handleCheckIn="handleCheckIn"
    />

    <!-- 签到历史记录 -->
    <CheckInHistory
      v-if="checkInHistory.length > 0"
      :checkInHistory="checkInHistory"
    />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import GameInfoBar from "./components/GameInfoBar.vue";
import GameRules from "../components/GameRules.vue";
import CheckInCalendar from "./components/CheckInCalendar.vue";
import RewardsDisplay from "./components/RewardsDisplay.vue";
import CheckInAction from "./components/CheckInAction.vue";
import CheckInHistory from "./components/CheckInHistory.vue";
import { useCheckInData } from "./hooks/useCheckInData";
import { useCheckInCalendar } from "./hooks/useCheckInCalendar";
import { useCheckInAction } from "./hooks/useCheckInAction";

// ========================================
// i18n
// ========================================
const { t } = useI18n();

// ========================================
// 使用 hooks
// ========================================

// 使用数据管理 hook
const {
  userPoints,
  consecutiveDays,
  hasCheckedInToday,
  checkInHistory,
  milestones,
  canCheckIn,
  loadUserData,
  checkTodayStatus,
  getMilestoneStatus,
  handleCheckIn: handleCheckInData,
  checkedInDates,
} = useCheckInData();

// 使用日历管理 hook
const { calendarDays, nextCheckInTime } = useCheckInCalendar(checkedInDates);

// 使用操作状态 hook
const { isCheckingIn, executeCheckIn } = useCheckInAction();

// ========================================
// 组合使用 hooks
// ========================================

/**
 * 处理签到操作
 */
const handleCheckIn = async () => {
  await executeCheckIn(handleCheckInData, canCheckIn);
};

// ========================================
// 生命周期钩子
// ========================================

/**
 * 组件挂载时加载用户数据并检查签到状态
 */
onMounted(() => {
  loadUserData();
  checkTodayStatus();
});
</script>

<style lang="less" scoped>
@import '@/styles/game-animations.less';

.daily-checkin-game {
  // 全局动画已通过 @import 引入
}
</style>
