<template>
  <div id="app" :class="appThemeClass">
    <!-- 认证页面（登录/注册）不使用 Layout -->
    <router-view v-if="isAuthPage" v-slot="{ Component, route }">
      <keep-alive v-if="route.meta.keepAlive">
        <component :is="Component" />
      </keep-alive>
      <component :is="Component" v-else />
    </router-view>

    <!-- 其他页面使用 Layout 布局（Layout 内部已包含 ConfigProvider） -->
    <AppLayout v-else :title="$route.meta.title || '娱乐应用'">
      <router-view v-slot="{ Component, route }">
        <keep-alive v-if="route.meta.keepAlive">
          <component :is="Component" />
        </keep-alive>
        <component :is="Component" v-else />
      </router-view>
    </AppLayout>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from './stores/theme'
import AppLayout from './components/Layout/index.vue'
import { ConfigProvider as VanConfigProvider } from 'vant'

// ========================================
// 路由实例
// ========================================
const route = useRoute()

// ========================================
// 主题管理
// ========================================
const themeStore = useThemeStore()

/**
 * 应用主题类名（用于自定义样式）
 * @returns {string} 主题类名
 */
const appThemeClass = computed(() => {
  return `theme-${themeStore.themeMode}`
})

/**
 * 判断是否为认证页面（登录/注册）
 * @returns {boolean} 是否为认证页面
 */
const isAuthPage = computed(() => {
  return route.name === 'Login' || route.name === 'Register'
})
</script>
