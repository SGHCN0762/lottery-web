<template>
  <div class="profile-page">
    <!-- 用户信息卡片 -->
    <UserCard :userInfo="userInfo" />

    <!-- 快捷操作 -->
    <QuickActions 
      :actions="quickActions" 
      @action-click="handleActionClick" 
    />

    <!-- 功能菜单 -->
    <MenuList 
      :items="menuItems" 
      @menu-click="handleMenuClick" 
    />

    <!-- 温馨提示 -->
    <section class="tip-section">
      <van-notice-bar
        left-icon="info-o"
        :text="t('profile.tip')"
        scrollable
      />
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { NoticeBar as VanNoticeBar } from 'vant'

// 引入子组件
import UserCard from './components/UserCard.vue'
import QuickActions from './components/QuickActions.vue'
import MenuList from './components/MenuList.vue'

// ========================================
// i18n
// ========================================
const { t } = useI18n()

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
// 统计标签（响应式翻译）
// ========================================
const statsLabels = computed(() => ({
  totalPoints: t('profile.totalPoints'),
  gamesPlayed: t('profile.gamesPlayed'),
  badges: t('profile.badges')
}))

// ========================================
// 快捷操作配置（响应式翻译）
// ========================================
const quickActions = computed(() => [
  { 
    id: 1, 
    icon: 'clock-o', 
    text: t('profile.dailyCheckin'), 
    action: 'checkin',
    color: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)'
  },
  { 
    id: 2, 
    icon: 'gift-o', 
    text: t('profile.exchange'), 
    action: 'exchange',
    color: 'linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)'
  },
  { 
    id: 3, 
    icon: 'medal-o', 
    text: t('profile.badges'), 
    action: 'badges',
    color: 'linear-gradient(135deg, #FA709A 0%, #FEE140 100%)'
  },
  { 
    id: 4, 
    icon: 'share-o', 
    text: t('profile.invite'), 
    action: 'invite',
    color: 'linear-gradient(135deg, #30CFD0 0%, #330867 100%)'
  }
])

// ========================================
// 菜单配置（响应式翻译）
// ========================================
const menuItems = computed(() => [
  { id: 1, title: t('profile.records'), icon: 'records-o', action: 'records' },
  { id: 2, title: t('profile.points'), icon: 'balance-list-o', action: 'points' },
  { id: 3, title: t('profile.settings'), icon: 'setting-o', action: 'settings' },
  { id: 4, title: t('profile.help'), icon: 'question-o', action: 'help' },
  { id: 5, title: t('navigation.about'), icon: 'info-o', action: 'about' }
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
   温馨提示区域
   ======================================== */
.tip-section {
  margin: 0 var(--spacing-md);
}
</style>