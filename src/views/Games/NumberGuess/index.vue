<template>
  <div class="number-guess-game">
    <!-- 游戏信息栏 -->
    <GameInfoBar
      :remainingAttempts="remainingAttempts"
      :userPoints="userPoints"
    />

    <!-- 游戏规则 -->
    <GameRules />

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
import GameRules from './components/GameRules.vue'
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
.number-guess-game {
  /* ========================================
     游戏主区域
     ======================================== */
  .game-main {
    min-height: 400px;
  }
}

/* ========================================
   动画定义
   ======================================== */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes celebrate {
  0%, 100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.2) rotate(-10deg);
  }
  50% {
    transform: scale(1.2) rotate(10deg);
  }
  75% {
    transform: scale(1.2) rotate(-10deg);
  }
}
</style>
