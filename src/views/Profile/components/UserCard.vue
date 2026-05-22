<template>
  <section class="user-card">
    <div class="card-header">
      <div class="avatar-wrapper">
        <div class="avatar">
          <van-icon name="user-circle-o" size="48" />
        </div>
      </div>
      
      <div class="user-info">
        <h2 class="username">{{ userInfo.name }}</h2>
        <p class="userid">ID: {{ userInfo.id }}</p>
      </div>
    </div>

    <!-- 积分统计 -->
    <div class="stats-row">
      <div class="stat-item">
        <div class="stat-value">{{ userInfo.points }}</div>
        <div class="stat-label">{{ statsLabels.totalPoints }}</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-value">{{ userInfo.gamesPlayed }}</div>
        <div class="stat-label">{{ statsLabels.gamesPlayed }}</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-value">{{ userInfo.badges }}</div>
        <div class="stat-label">{{ statsLabels.badges }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon as VanIcon } from 'vant'

const { t } = useI18n()

defineProps({
  userInfo: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

const statsLabels = computed(() => ({
  totalPoints: t('profile.totalPoints'),
  gamesPlayed: t('profile.gamesPlayed'),
  badges: t('profile.badges')
}))
</script>

<style lang="less" scoped>
.user-card {
  margin: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--gradient-primary);
  border-radius: var(--radius-md);
  color: white;

  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-md);

    .avatar-wrapper {
      margin-right: var(--spacing-sm);

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: var(--radius-full);
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .user-info {
      flex: 1;

      .username {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        margin: 0 0 2px 0;
      }

      .userid {
        font-size: var(--font-size-xs);
        opacity: 0.85;
        margin: 0;
      }
    }
  }

  /* 统计数据行 */
  .stats-row {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-top: var(--spacing-sm);

    .stat-item {
      text-align: center;
      flex: 1;

      .stat-value {
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
        margin-bottom: 2px;
      }

      .stat-label {
        font-size: 11px;
        opacity: 0.85;
      }
    }

    .stat-divider {
      width: 1px;
      height: 28px;
      background: rgba(255, 255, 255, 0.2);
    }
  }
}
</style>