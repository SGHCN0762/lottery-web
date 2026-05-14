<template>
  <div class="number-guess-game">
    <!-- 游戏信息栏 -->
    <GameInfoBar
      :remainingAttempts="remainingAttempts"
      :userPoints="userPoints"
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
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import GameInfoBar from './components/GameInfoBar.vue'
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
  loadUserPoints
} = useNumberGuess()
</script>

<style lang="less" scoped>
@import '@/styles/game-animations.less';

.number-guess-game {
  /* ========================================
     游戏主区域
     ======================================== */
  .game-main {
    min-height: 400px;
  }
}

/* ========================================
   动画定义（已通过 @import 引入）
   ======================================== */
</style>
