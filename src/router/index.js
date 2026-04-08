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