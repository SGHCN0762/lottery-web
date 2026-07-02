<template>
  <van-config-provider :theme="vantTheme" :locale="vantLocale">
    <div class="app-layout">
      <!-- 自定义导航栏 -->
      <AppNavbar :title="title" :show-back="showBack">
        <template #navbar-right>
          <slot name="navbar-right"></slot>
        </template>
      </AppNavbar>

      <!-- 主内容区域 -->
      <main :class="['main-content', { 'has-tabbar': $route.meta.showTabbar }]">
        <slot></slot>
      </main>

      <!-- 自定义底部标签栏 -->
      <AppTabbar :tabs="tabs" />
    </div>
  </van-config-provider>
</template>

<script setup>
  import { computed } from 'vue';
  import { useThemeStore } from '@/stores/theme';
  import { useI18n } from 'vue-i18n';
  import { ConfigProvider as VanConfigProvider } from 'vant';
  import AppNavbar from './components/AppNavbar.vue';
  import AppTabbar from './components/AppTabbar.vue';

  // 导入 Vant 语言包
  import vantZhCN from 'vant/es/locale/lang/zh-CN';
  import vantEnUS from 'vant/es/locale/lang/en-US';

  // ========================================
  // i18n
  // ========================================
  import i18n from '@/i18n';
  const { t } = useI18n();

  // ========================================
  // Vant 组件国际化
  // ========================================
  const vantLocale = computed(() => {
    const currentLocale = i18n.global.locale.value;
    switch (currentLocale) {
      case 'zh-CN':
        return vantZhCN;
      case 'en':
        return vantEnUS;
      default:
        return vantZhCN;
    }
  });

  // ========================================
  // Props 定义
  // ========================================
  const props = defineProps({
    /** 页面标题（可选，优先使用路由 meta.title） */
    title: {
      type: String,
      default: '',
    },
    /** 是否显示返回按钮（可选，优先使用路由 meta.showBack） */
    showBack: {
      type: Boolean,
      default: false,
    },
    /** 底部导航标签配置 */
    tabs: {
      type: Array,
      default: () => [
        { name: 'Home', label: 'navigation.home', icon: 'home-o' },
        { name: 'Games', label: 'navigation.games', icon: 'apps-o' },
        { name: 'Tools', label: 'navigation.tools', icon: 'setting-o' },
        { name: 'Profile', label: 'navigation.profile', icon: 'user-o' },
      ],
    },
  });

  // ========================================
  // 组合式 API
  // ========================================
  const themeStore = useThemeStore();

  // ========================================
  // 计算属性
  // ========================================

  /** Vant 主题 */
  const vantTheme = computed(() => {
    return themeStore.isDark ? 'dark' : 'light';
  });

  // ========================================
  // 主布局样式
  // ========================================

  defineOptions({ name: 'AppLayout' });
</script>

<style lang="less" scoped>
  .app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: var(--color-bg-primary);
    font-family: var(--font-family-base);

    .main-content {
      flex: 1;
      padding-top: env(safe-area-inset-top, 0px);
      padding-bottom: env(safe-area-inset-bottom, 0px);
      overflow-y: auto;
      background: var(--color-bg-primary);
      -webkit-overflow-scrolling: touch;

      &.has-tabbar {
        padding-bottom: calc(50px + env(safe-area-inset-bottom, 0px));
      }
    }
  }
</style>
