/**
 * 路由配置
 * 
 * 定义应用的所有路由规则，包括：
 * - 路径映射
 * - 组件懒加载
 * - 路由元信息（标题、是否缓存、是否显示返回按钮）
 */

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/index.vue'

// ========================================
// 路由配置数组
// ========================================
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      keepAlive: true,        // 启用页面缓存
      title: '首页',           // 页面标题
      showBack: false         // 不显示返回按钮
    }
  },
  {
    path: '/games',
    name: 'Lottery',
    component: () => import('../views/Lottery/index.vue'), // 懒加载
    meta: {
      title: '娱乐中心',
      showBack: true          // 显示返回按钮
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile/index.vue'), // 懒加载
    meta: {
      title: '我的',
      showBack: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About/index.vue'), // 懒加载
    meta: {
      title: '关于我们',
      showBack: true,
      showTabbar: false  // 不显示底部标签栏
    }
  },
  // ========================================
  // 游戏详情页面路由
  // ========================================
  {
    path: '/games/number-guess',
    name: 'NumberGuess',
    component: () => import('../views/Games/NumberGuess/index.vue'),
    meta: {
      title: '数字猜猜猜',
      showBack: true,        // 显示返回按钮
      showTabbar: false      // 隐藏底部标签栏
    }
  },
  {
    path: '/games/lucky-wheel',
    name: 'LuckyWheel',
    component: () => import('../views/Games/LuckyWheel/index.vue'),
    meta: {
      title: '幸运转盘',
      showBack: true,        // 显示返回按钮
      showTabbar: false      // 隐藏底部标签栏
    }
  },
  {
    path: '/games/quiz-challenge',
    name: 'QuizChallenge',
    component: () => import('../views/Games/QuizChallenge/index.vue'),
    meta: {
      title: '答题挑战',
      showBack: true,        // 显示返回按钮
      showTabbar: false      // 隐藏底部标签栏
    }
  },
  {
    path: '/games/daily-checkin',
    name: 'DailyCheckIn',
    component: () => import('../views/Games/DailyCheckIn/index.vue'),
    meta: {
      title: '每日签到',
      showBack: true,        // 显示返回按钮
      showTabbar: false      // 隐藏底部标签栏
    }
  },
  // ========================================
  // 个人中心子页面路由
  // ========================================
  {
    path: '/profile/records',
    name: 'ProfileRecords',
    component: () => import('../views/Profile/Records/index.vue'),
    meta: {
      title: '游戏记录',
      showBack: true,        // 显示返回按钮
      showTabbar: false      // 隐藏底部标签栏
    }
  },
  {
    path: '/profile/points',
    name: 'ProfilePoints',
    component: () => import('../views/Profile/Points/index.vue'),
    meta: {
      title: '积分明细',
      showBack: true,        // 显示返回按钮
      showTabbar: false      // 隐藏底部标签栏
    }
  },
  {
    path: '/profile/settings',
    name: 'ProfileSettings',
    component: () => import('../views/Profile/Settings/index.vue'),
    meta: {
      title: '账户设置',
      showBack: true,        // 显示返回按钮
      showTabbar: false      // 隐藏底部标签栏
    }
  },
  {
    path: '/profile/help',
    name: 'ProfileHelp',
    component: () => import('../views/Profile/Help/index.vue'),
    meta: {
      title: '帮助中心',
      showBack: true,        // 显示返回按钮
      showTabbar: false      // 隐藏底部标签栏
    }
  },
  {
    path: '/profile/exchange',
    name: 'ProfileExchange',
    component: () => import('../views/Profile/Exchange/index.vue'),
    meta: {
      title: '积分兑换',
      showBack: true,        // 显示返回按钮
      showTabbar: false      // 隐藏底部标签栏
    }
  },
  {
    path: '/profile/badges',
    name: 'ProfileBadges',
    component: () => import('../views/Profile/Badges/index.vue'),
    meta: {
      title: '我的成就',
      showBack: true,        // 显示返回按钮
      showTabbar: false      // 隐藏底部标签栏
    }
  },
  {
    path: '/profile/invite',
    name: 'ProfileInvite',
    component: () => import('../views/Profile/Invite/index.vue'),
    meta: {
      title: '邀请好友',
      showBack: true,        // 显示返回按钮
      showTabbar: false      // 隐藏底部标签栏
    }
  }
]

// ========================================
// 创建路由实例
// ========================================
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // HTML5 History 模式
  routes
})

// ========================================
// 路由守卫（可选扩展）
// ========================================
// router.beforeEach((to, from, next) => {
//   // 例如：权限验证、页面标题设置等
//   document.title = to.meta.title || '娱乐应用'
//   next()
// })

export default router
