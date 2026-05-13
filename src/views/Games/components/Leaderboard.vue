<template>
  <section v-if="players.length" class="leaderboard-section">
    <h2 class="section-title">🏆 {{ title }}</h2>
    <div class="leaderboard-list">
      <div
        v-for="(player, index) in players"
        :key="player.id"
        class="player-item"
        :class="{ 'is-top3': index < 3 }"
      >
        <div class="player-rank">#{{ index + 1 }}</div>
        <div class="player-details">
          <span class="player-name">{{ player.name }}</span>
          <span class="player-points">{{ player.points }} {{ pointsLabel }}</span>
        </div>
        <div class="player-badge" v-if="index < 3">
          {{ ['🥇', '🥈', '🥉'][index] }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  players: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: '积分排行榜'
  },
  pointsLabel: {
    type: String,
    default: '积分'
  }
})
</script>

<style lang="less" scoped>
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
</style>
