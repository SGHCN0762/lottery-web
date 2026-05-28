<template>
  <div class="lucky-wheel-game">
    <div class="page-content">
      <!-- 游戏信息栏 -->
      <GameInfoBar
        :items="[
          { label: t('luckyWheel.myPoints'), value: userPoints },
          { label: t('luckyWheel.cost'), value: `10 ${t('common.points')}`, valueClass: 'cost' }
        ]"
      />

      <!-- 游戏规则 -->
      <GameRules
        title-key="luckyWheel.rules.title"
        :rule-keys="[
          'luckyWheel.rules.rule1',
          'luckyWheel.rules.rule2',
          'luckyWheel.rules.rule3',
          'luckyWheel.rules.rule4',
        ]"
      />

      <!-- 转盘区域 -->
      <LuckyWheel
        :prizes="prizes"
        :wheelRotation="wheelRotation"
        :isSpinning="isSpinning"
        :spinDuration="spinDuration"
        :userPoints="userPoints"
        @spin="startSpin"
      />

      <!-- 抽奖记录 -->
      <SpinHistory :history="spinHistory" />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { storeToRefs } from 'pinia';
  import { showToast } from 'vant';
  import GameInfoBar from '@/components/GameInfoBar/index.vue';
import GameRules from '../components/GameRules.vue';
  import LuckyWheel from './components/LuckyWheel.vue';
  import SpinHistory from './components/SpinHistory.vue';
  import { useSpinHistory } from './hooks/useSpinHistory';
  import { useWheelRotation } from './hooks/useWheelRotation';
  import { useLottery } from './hooks/useLottery';
  import { useAppDataStore } from '@/stores/appData';

  // ========================================
  // i18n
  // ========================================
  const { t } = useI18n();

  // ========================================
  // 奖品配置列表
  // 每个奖品包含：id、名称、图标、积分值、背景色
  // ========================================
  const prizes = ref([
    { id: 1, name: '5积分', icon: '🎁', points: 5, color: '#FF6B6B' },
    { id: 2, name: '10积分', icon: '🎀', points: 10, color: '#4ECDC4' },
    { id: 3, name: '20积分', icon: '🎊', points: 20, color: '#45B7D1' },
    { id: 4, name: '30积分', icon: '🎉', points: 30, color: '#FFA07A' },
    { id: 5, name: '50积分', icon: '💎', points: 50, color: '#98D8C8' },
    { id: 6, name: '100积分', icon: '👑', points: 100, color: '#F7DC6F' },
  ]);

  // ========================================
  // 使用hooks管理用户积分和游戏记录（使用 Pinia Store）
  // ========================================
  const appDataStore = useAppDataStore();
  const { userPoints } = storeToRefs(appDataStore);
  const { addPoints, deductPoints, addRecord, loadAllData } = appDataStore;

  // ========================================
  // 使用hooks管理抽奖历史
  // ========================================
  const { spinHistory, loadSpinHistory, addSpinRecord } = useSpinHistory();

  // ========================================
  // 使用hooks管理转盘旋转
  // ========================================
  const { wheelRotation, isSpinning, spinDuration } = useWheelRotation(prizes);

  // ========================================
  // 积分更新函数（使用统一的addPoints方法以确保持久化）
  // ========================================
  const updateUserPoints = (amount) => {
    if (amount > 0) {
      addPoints(amount);
    } else {
      deductPoints(Math.abs(amount));
    }
  };

  // ========================================
  // 使用hooks管理抽奖核心逻辑
  // ========================================
  const { startSpin } = useLottery(
    {
      userPoints,
      updateUserPoints,
    },
    {
      addSpinRecord,
    },
    {
      isSpinning,
      spinToPrize: (prizeIndex, prize) => {
        const segmentAngle = 360 / prizes.value.length;
        const prizeCenterAngle = prizeIndex * segmentAngle + segmentAngle / 2;
        const targetRotation = -prizeCenterAngle;
        const currentFullRotations = Math.floor(wheelRotation.value / 360) * 360;
        const extraRotations = 5 * 360;
        const finalRotation = currentFullRotations + extraRotations + targetRotation;

        wheelRotation.value = finalRotation;
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(prize); // 确保返回奖品对象
          }, spinDuration.value * 1000);
        });
      },
      resetWheel: () => {
        isSpinning.value = false;
      },
    },
    { addRecord },
    prizes.value,
    t
  );

  // ========================================
  // 生命周期钩子
  // ========================================

  /**
   * 组件挂载时加载用户数据
   */
  onMounted(() => {
    loadAllData();
    loadSpinHistory();
  });
</script>

<style lang="less" scoped>
  @import '@/styles/game-animations.less';

  .lucky-wheel-game {
    min-height: 100%;
    background: var(--color-bg-primary);
  }

  .page-content {
    padding-top: calc(var(--spacing-sm) + env(safe-area-inset-top, 0px));
    padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom, 0px));
    padding-left: var(--spacing-md);
    padding-right: var(--spacing-md);
    display: flow-root;
  }
</style>
