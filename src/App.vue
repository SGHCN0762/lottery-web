<template>
  <div id="app" :class="appThemeClass">
    <!-- 布局容器 -->
    <AppLayout :title="$route.meta.title || '娱乐应用'">
      <!-- 路由视图：支持 keep-alive 缓存 -->
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
import { useThemeStore } from './stores/theme'
import AppLayout from './components/Layout/index.vue'

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
</script>