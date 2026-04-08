<template>
  <div class="lottery-page">
    <!-- 页面标题区域 -->
    <header class="page-header">
      <h1 class="header-title">🎪 娱乐中心</h1>
      <p class="header-subtitle">多种趣味小游戏，轻松赚取积分</p>
    </header>

    <!-- 游戏类型卡片列表 -->
    <section class="game-types-section">
      <div 
        v-for="gameType in gameTypes" 
        :key="gameType.id"
        class="game-card"
        @click="handleSelectGame(gameType)"
        role="button"
        tabindex="0"
        :aria-label="`选择${gameType.name}`"
      >
        <div class="card-icon">{{ gameType.icon }}</div>
        <h3 class="card-title">{{ gameType.name }}</h3>
        <p class="card-description">{{ gameType.description }}</p>
        <div class="reward-info">奖励: {{ gameType.reward }}</div>
      </div>
    </section>

    <!-- 积分排行榜 -->
    <section v-if="topPlayers.length" class="leaderboard-section">
      <h2 class="section-title">🏆 积分排行榜</h2>
      <div class="leaderboard-list">
        <div 
          v-for="(player, index) in topPlayers" 
          :key="player.id"
          class="player-item"
          :class="{ 'is-top3': index < 3 }"
        >
          <div class="player-rank">#{{ index + 1 }}</div>
          <div class="player-details">
            <span class="player-name">{{ player.name }}</span>
            <span class="player-points">{{ player.points }} 积分</span>
          </div>
          <div class="player-badge" v-if="index < 3">
            {{ ['🥇', '🥈', '🥉'][index] }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// ========================================
// 路由实例
// ========================================
const router = useRouter()

// ========================================
// 数据定义
// ========================================

/** 游戏类型列表 */
const gameTypes = ref([
  {
    id: 1,
    name: '数字猜猜猜',
    icon: '🔢',
    description: '猜测随机数字，考验你的运气',
    reward: '10-50积分'
  },
  {
    id: 2,
    name: '幸运转盘',
    icon: '🎡',
    description: '转动转盘，赢取丰厚积分',
    reward: '5-100积分'
  },
  {
    id: 3,
    name: '答题挑战',
    icon: '📝',
    description: '回答趣味问题，展示知识',
    reward: '20-80积分'
  },
  {
    id: 4,
    name: '每日签到',
    icon: '📅',
    description: '每天登录即可领取积分',
    reward: '10积分'
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
  // TODO: 跳转到具体游戏页面
  // router.push({ name: 'GameDetail', params: { id: type.id } })
}
</script>

<style lang="less" scoped>
.lottery-page {
  /* ========================================
     页面头部样式
     ======================================== */
  .page-header {
    text-align: center;
    margin-bottom: var(--spacing-2xl);

    .header-title {
      font-size: var(--font-size-xl);
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-sm);
      font-weight: var(--font-weight-bold);
    }

    .header-subtitle {
      color: var(--color-text-secondary);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-normal);
    }
  }

  /* ========================================
     游戏类型卡片区域
     ======================================== */
  .game-types-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-3xl);

    .game-card {
      background: var(--color-bg-secondary);
      padding: var(--spacing-lg);
      border-radius: var(--radius-lg);
      text-align: center;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--color-border);
      cursor: pointer;
      transition: all var(--transition-base);

      &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
        border-color: var(--color-primary);
      }

      &:active {
        transform: translateY(0);
      }

      .card-icon {
        font-size: 2rem;
        margin-bottom: var(--spacing-sm);
      }

      .card-title {
        font-size: var(--font-size-base);
        color: var(--color-text-primary);
        margin-bottom: var(--spacing-xs);
        font-weight: var(--font-weight-semibold);
      }

      .card-description {
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-sm);
        line-height: var(--line-height-base);
      }

      .reward-info {
        font-size: var(--font-size-sm);
        color: var(--color-success);
        font-weight: var(--font-weight-semibold);
      }
    }
  }

  /* ========================================
     排行榜区域
     ======================================== */
  .leaderboard-section {
    margin-bottom: var(--spacing-2xl);

    .section-title {
      font-size: var(--font-size-xl);
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-lg);
      font-weight: var(--font-weight-semibold);
    }

    .leaderboard-list {
      background: var(--color-bg-secondary);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--color-border);

      .player-item {
        display: flex;
        align-items: center;
        padding: var(--spacing-md) var(--spacing-lg);
        border-bottom: 1px solid var(--color-border-light);
        transition: background-color var(--transition-fast);

        &:last-child {
          border-bottom: none;
        }

        &:hover {
          background-color: var(--color-bg-tertiary);
        }

        /* 前三名特殊样式 */
        &.is-top3 {
          background: linear-gradient(90deg, rgba(255, 204, 0, 0.1) 0%, transparent 100%);
        }

        .player-rank {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          color: var(--color-primary);
          width: 40px;
          text-align: center;
        }

        .player-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);

          .player-name {
            font-size: var(--font-size-sm);
            color: var(--color-text-primary);
            font-weight: var(--font-weight-medium);
          }

          .player-points {
            font-size: var(--font-size-xs);
            color: var(--color-success);
            font-weight: var(--font-weight-semibold);
          }
        }

        .player-badge {
          font-size: var(--font-size-xl);
        }
      }
    }
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