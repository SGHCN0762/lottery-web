<template>
  <div class="lottery-page">
    <!-- 页面标题区域 -->
    <PageHeader 
      :title="t('lottery.title')" 
      :subtitle="t('lottery.subtitle')" 
    />

    <!-- 游戏类型卡片列表 -->
    <section class="game-types-section">
      <GameCard
        v-for="gameType in gameTypes"
        :key="gameType.id"
        :game-type="gameType"
        :reward-label="t('lottery.reward')"
        @select="handleSelectGame"
      />
    </section>

    <!-- 积分排行榜 -->
    <Leaderboard 
      :players="topPlayers"
      :title="t('lottery.leaderboard')"
      :points-label="t('common.points')"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import PageHeader from './components/PageHeader.vue'
import GameCard from './components/GameCard.vue'
import Leaderboard from './components/Leaderboard.vue'

// ========================================
// i18n
// ========================================
const { t } = useI18n()

// ========================================
// 路由实例
// ========================================
const router = useRouter()

// ========================================
// 数据定义
// ========================================

/** 游戏类型列表 */
const gameTypes = computed(() => [
  {
    id: 1,
    name: t('lottery.numberGuess'),
    icon: '🔢',
    description: t('lottery.numberGuessDesc'),
    reward: t('lottery.numberGuessReward')
  },
  {
    id: 2,
    name: t('lottery.luckyWheel'),
    icon: '🎡',
    description: t('lottery.luckyWheelDesc'),
    reward: t('lottery.luckyWheelReward')
  },
  {
    id: 3,
    name: t('lottery.quizChallenge'),
    icon: '📝',
    description: t('lottery.quizChallengeDesc'),
    reward: t('lottery.quizChallengeReward')
  },
  {
    id: 4,
    name: t('lottery.dailyCheckIn'),
    icon: '📅',
    description: t('lottery.dailyCheckInDesc'),
    reward: t('lottery.dailyCheckInReward')
  }
])

/** 积分排行榜数据 */
const topPlayers = ref([
  { id: 1, name: '小明', points: 2580 },
  { id: 2, name: '小红', points: 2350 },
  { id: 3, name: '小刚', points: 2100 },
  { id: 4, name: '小丽', points: 1950 },
  { id: 5, name: '小强', points: 1800 }
])

// ========================================
// 事件处理函数
// ========================================

/**
 * 选择游戏类型并跳转
 * @param {Object} type - 选中的游戏类型对象
 */
const handleSelectGame = (type) => {
  console.log('选择游戏:', type.name)

  // 根据游戏ID跳转到对应的游戏页面
  const routeMap = {
    1: 'NumberGuess',      // 数字猜猜猜
    2: 'LuckyWheel',       // 幸运转盘
    3: 'QuizChallenge',    // 答题挑战
    4: 'DailyCheckIn'      // 每日签到
  }

  const routeName = routeMap[type.id]
  if (routeName) {
    router.push({ name: routeName })
  }
}
</script>

<style lang="less" scoped>
.lottery-page {
  /* ========================================
     游戏类型卡片区域
     ======================================== */
  .game-types-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-3xl);
  }
}

/* ========================================
   响应式设计
   ======================================== */
@media (max-width: 768px) {
  .lottery-page {
    .game-types-section {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-md);
    }
  }
}
</style>
