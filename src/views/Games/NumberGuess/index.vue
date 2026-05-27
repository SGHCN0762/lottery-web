<template>
  <div class="number-guess-game">
    <div class="page-content">
      <!-- 游戏信息栏 -->
      <GameInfoBar
        :items="[
          { label: t('numberGuess.remainingAttempts'), value: remainingAttempts },
          { label: t('numberGuess.myPoints'), value: userPoints }
        ]"
      />

      <!-- 游戏规则 -->
      <GameRules 
        title-key="numberGuess.rules.title"
        :rule-keys="[
          'numberGuess.rules.rule1',
          'numberGuess.rules.rule2',
          'numberGuess.rules.rule3',
          'numberGuess.rules.rule4'
        ]"
      />

      <!-- 游戏主区域 -->
      <section class="game-main">
        <!-- 游戏未开始 -->
        <GameStartScreen v-if="!gameStarted" @start-game="startGame" />

        <!-- 游戏中 -->
        <GamePlayingScreen
          v-else-if="!gameEnded"
          v-model:currentGuess="currentGuess"
          :isProcessing="isProcessing"
          :guessHistory="guessHistory"
          @submit-guess="submitGuess"
        />

        <!-- 游戏结束 -->
        <GameEndScreen
          v-else
          :winStatus="winStatus"
          :winMessage="winMessage"
          :rewardPoints="rewardPoints"
          :targetNumber="targetNumber"
          @reset-game="resetGame"
        />
      </section>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { watch } from 'vue'
import GameInfoBar from '@/components/GameInfoBar/index.vue'
import GameRules from '../components/GameRules.vue'
import GameStartScreen from './components/GameStartScreen.vue'
import GamePlayingScreen from './components/GamePlayingScreen.vue'
import GameEndScreen from './components/GameEndScreen.vue'
import { useNumberGuess } from './hooks/useNumberGuess'

// ========================================
// i18n
// ========================================
const { t } = useI18n()

// ========================================
// 使用组合hook获取所有游戏功能
// ========================================
const {
  // 游戏状态
  userPoints,
  targetNumber,
  currentGuess,
  remainingAttempts,
  gameStarted,
  gameEnded,
  isProcessing,
  guessHistory,
  winStatus,
  rewardPoints,
  isValidGuess,
  winMessage,

  // 游戏方法
  startGame,
  submitGuess,
  handleWin,
  handleLose,
  resetGame,
  loadUserPoints,
  addGameRecord
} = useNumberGuess()

// 监听游戏结束，添加记录
watch(gameEnded, (ended) => {
  if (ended) {
    addGameRecord(winStatus.value, rewardPoints.value)
  }
})
</script>

<style lang="less" scoped>
@import '@/styles/game-animations.less';

.number-guess-game {
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

.game-main {
  min-height: 400px;
}
</style>