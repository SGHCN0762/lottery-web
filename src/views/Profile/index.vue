<template>
  <div class="profile-page">
    <!-- 用户信息卡片 -->
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
          <div class="stat-label">总积分</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-value">{{ userInfo.gamesPlayed }}</div>
          <div class="stat-label">游戏次数</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-value">{{ userInfo.badges }}</div>
          <div class="stat-label">成就徽章</div>
        </div>
      </div>
    </section>

    <!-- 快捷操作 -->
    <section class="quick-actions">
      <div class="section-title">快捷操作</div>
      <van-grid :column-num="4" :border="false">
        <van-grid-item 
          v-for="action in quickActions" 
          :key="action.id"
          @click="handleActionClick(action)"
        >
          <template #icon>
            <div class="action-icon" :style="{ background: action.color }">
              <van-icon :name="action.icon" size="20" color="white" />
            </div>
          </template>
          <template #text>
            <span class="action-text">{{ action.text }}</span>
          </template>
        </van-grid-item>
      </van-grid>
    </section>

    <!-- 功能菜单 -->
    <section class="menu-section">
      <div class="section-title">更多功能</div>
      <van-cell-group inset>
        <van-cell 
          v-for="menuItem in menuItems" 
          :key="menuItem.id"
          :title="menuItem.title"
          :icon="menuItem.icon"
          is-link
          @click="handleMenuClick(menuItem)"
        />
      </van-cell-group>
    </section>

    <!-- 温馨提示 -->
    <section class="tip-section">
      <van-notice-bar
        left-icon="info-o"
        text="温馨提示：积分仅供娱乐，不可兑换现金。请理性参与，切勿沉迷。"
        scrollable
      />
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  CellGroup as VanCellGroup, 
  Cell as VanCell, 
  Grid as VanGrid, 
  GridItem as VanGridItem, 
  Icon as VanIcon, 
  NoticeBar as VanNoticeBar 
} from 'vant'

// ========================================
// 路由实例
// ========================================
const router = useRouter()

// ========================================
// 用户信息
// ========================================
const userInfo = ref({
  id: '10086',
  name: '娱乐达人',
  points: 1580,
  gamesPlayed: 128,
  badges: 12
})

// ========================================
// 快捷操作配置
// ========================================
const quickActions = ref([
  { 
    id: 1, 
    icon: 'clock-o', 
    text: '每日签到', 
    action: 'checkin',
    color: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)'
  },
  { 
    id: 2, 
    icon: 'gift-o', 
    text: '积分兑换', 
    action: 'exchange',
    color: 'linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)'
  },
  { 
    id: 3, 
    icon: 'medal-o', 
    text: '我的成就', 
    action: 'badges',
    color: 'linear-gradient(135deg, #FA709A 0%, #FEE140 100%)'
  },
  { 
    id: 4, 
    icon: 'share-o', 
    text: '邀请好友', 
    action: 'invite',
    color: 'linear-gradient(135deg, #30CFD0 0%, #330867 100%)'
  }
])

// ========================================
// 菜单配置
// ========================================
const menuItems = ref([
  { id: 1, title: '游戏记录', icon: 'records-o', action: 'records' },
  { id: 2, title: '积分明细', icon: 'balance-list-o', action: 'points' },
  { id: 3, title: '账户设置', icon: 'setting-o', action: 'settings' },
  { id: 4, title: '帮助中心', icon: 'question-o', action: 'help' },
  { id: 5, title: '关于我们', icon: 'info-o', action: 'about' }
])

// ========================================
// 事件处理函数
// ========================================

/**
 * 处理快捷操作点击
 * @param {Object} action - 被点击的操作项
 */
const handleActionClick = (action) => {
  console.log('点击快捷操作:', action.text)
  
  switch (action.action) {
    case 'checkin':
      // 跳转到每日签到页面
      router.push({ name: 'DailyCheckIn' })
      break
    case 'exchange':
      // 跳转到积分兑换页面
      router.push({ name: 'ProfileExchange' })
      break
    case 'badges':
      // 跳转到我的成就页面
      router.push({ name: 'ProfileBadges' })
      break
    case 'invite':
      // 跳转到邀请好友页面
      router.push({ name: 'ProfileInvite' })
      break
    default:
      console.warn('未知的快捷操作:', action.action)
  }
}

/**
 * 处理菜单项点击
 * @param {Object} item - 被点击的菜单项
 */
const handleMenuClick = (item) => {
  console.log('点击菜单:', item.title)
  
  switch (item.action) {
    case 'records':
      // 跳转到游戏记录页面
      router.push({ name: 'ProfileRecords' })
      break
    case 'points':
      // 跳转到积分明细页面
      router.push({ name: 'ProfilePoints' })
      break
    case 'settings':
      // 跳转到账户设置页面
      router.push({ name: 'ProfileSettings' })
      break
    case 'help':
      // 跳转到帮助中心页面
      router.push({ name: 'ProfileHelp' })
      break
    case 'about':
      router.push({ name: 'About' })
      break
    default:
      console.warn('未知的菜单动作:', item.action)
  }
}
</script>

<style lang="less" scoped>
.profile-page {
  min-height: 100%;
  background: var(--color-bg-primary);
  padding-bottom: calc(var(--spacing-xl) + env(safe-area-inset-bottom, 0px));
}

/* ========================================
   用户信息卡片
   ======================================== */
.user-card {
  margin: var(--spacing-md);
  padding: var(--spacing-xl);
  background: var(--gradient-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  color: white;

  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-lg);

    .avatar-wrapper {
      margin-right: var(--spacing-md);

      .avatar {
        width: 64px;
        height: 64px;
        border-radius: var(--radius-full);
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid rgba(255, 255, 255, 0.3);
      }
    }

    .user-info {
      flex: 1;

      .username {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-semibold);
        margin: 0 0 var(--spacing-xs) 0;
      }

      .userid {
        font-size: var(--font-size-sm);
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
    padding-top: var(--spacing-md);
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    .stat-item {
      text-align: center;
      flex: 1;

      .stat-value {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--spacing-xs);
      }

      .stat-label {
        font-size: var(--font-size-xs);
        opacity: 0.85;
      }
    }

    .stat-divider {
      width: 1px;
      height: 32px;
      background: rgba(255, 255, 255, 0.2);
    }
  }
}

/* ========================================
   区块标题
   ======================================== */
.section-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: var(--spacing-lg) var(--spacing-md) var(--spacing-md);
  font-weight: var(--font-weight-medium);
}

/* ========================================
   快捷操作区域
   ======================================== */
.quick-actions {
  margin: 0 var(--spacing-md);
  margin-bottom: var(--spacing-lg);

  :deep(.van-grid-item__content) {
    padding: var(--spacing-md) var(--spacing-xs);
    background: transparent;
    transition: all var(--transition-fast);

    &:active {
      background-color: var(--color-bg-tertiary);
      transform: scale(0.95);
    }
  }

  .action-icon {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacing-xs);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .action-text {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
  }
}

/* ========================================
   菜单区域
   ======================================== */
.menu-section {
  margin: 0 var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

/* ========================================
   温馨提示区域
   ======================================== */
.tip-section {
  margin: 0 var(--spacing-md);
}
</style>