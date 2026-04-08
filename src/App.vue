<template>
  <ConfigProvider :theme="currentTheme">
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
  </ConfigProvider>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from './stores/theme'
import AppLayout from './components/Layout/index.vue'
import { ConfigProvider } from 'vant'

// ========================================
// 主题管理
// ========================================
const themeStore = useThemeStore()

/**
 * 当前主题模式（用于 Vant ConfigProvider）
 * @returns {'light' | 'dark'}
 */
const currentTheme = computed(() => {
  return themeStore.isDark ? 'dark' : 'light'
})

/**
 * 应用主题类名（用于自定义样式）
 * @returns {string} 主题类名
 */
const appThemeClass = computed(() => {
  return `theme-${themeStore.themeMode}`
})
</script>

<style lang="less">
/* ========================================
   应用根容器样式
   ======================================== */
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background: var(--van-background-color);
  color: var(--van-text-color);

  /* PC 端居中显示（模拟移动端效果） */
  @media (min-width: 768px) {
    max-width: 414px; /* iPhone 标准宽度 */
    margin: 0 auto;
    box-shadow: var(--van-shadow-lg);
    border-radius: var(--van-radius-lg);
    overflow: hidden;
    min-height: 100vh;
  }

  /* 不同主题模式的背景色 */
  &.theme-light {
    background: var(--van-background-color);
    color: var(--van-text-color);
  }

  &.theme-dark {
    background: var(--van-background-color);
    color: var(--van-text-color);
  }

  &.theme-auto {
    /* 跟随系统，无需特殊处理 */
  }
}

/* ========================================
   全局主题变量 - iOS风格
   ======================================== */
:root {
  --van-primary-color: #007AFF;
  --van-success-color: #34C759;
  --van-warning-color: #FF9500;
  --van-danger-color: #FF3B30;
  --van-info-color: #5AC8FA;
  --van-text-color: #1C1C1E;
  --van-text-color-2: #3C3C43;
  --van-text-color-3: #8E8E93;
  --van-border-color: #C6C6C8;
  --van-background-color: #F2F2F7;
  --van-background-color-light: #FFFFFF;
  --van-radius-sm: 8px;
  --van-radius-md: 12px;
  --van-radius-lg: 16px;
  --van-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --van-shadow-md: 0 2px 8px rgba(0, 0, 0, 0.12);
  --van-shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.15);
}

[data-theme="dark"] {
  --van-primary-color: #0A84FF;
  --van-text-color: #FFFFFF;
  --van-text-color-2: #EBEBF5;
  --van-text-color-3: #8E8E93;
  --van-border-color: #38383A;
  --van-background-color: #000000;
  --van-background-color-light: #1C1C1E;
}
</style>
