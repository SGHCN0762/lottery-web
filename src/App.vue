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
    <custom-layout v-else :title="$route.meta.title || t('app.title')">
      <router-view v-slot="{ Component, route }">
        <keep-alive v-if="route.meta.keepAlive">
          <component :is="Component" />
        </keep-alive>
        <component :is="Component" v-else />
      </router-view>
    </custom-layout>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from './stores/theme'
import CustomLayout from '@/components/CustomLayout.vue'

// ========================================
// i18n
// ========================================
const { t } = useI18n()

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
