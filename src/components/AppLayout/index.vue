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
      <main class="main-content">
        <slot></slot>
      </main>

      <!-- 自定义底部标签栏 -->
      <AppTabbar :tabs="tabs" />
    </div>
  </van-config-provider>
</template>

<script setup>
import { computed } from "vue";
import { useThemeStore } from "@/stores/theme";
import { useI18n } from "vue-i18n";
import { ConfigProvider as VanConfigProvider } from "vant";
import AppNavbar from "./components/AppNavbar.vue";
import AppTabbar from "./components/AppTabbar.vue";

// 导入 Vant 语言包
import vantZhCN from "vant/es/locale/lang/zh-CN";
import vantEnUS from "vant/es/locale/lang/en-US";
import vantZhTW from "vant/es/locale/lang/zh-TW";

// ========================================
// i18n
// ========================================
import i18n from "@/i18n";
const { t } = useI18n();

// ========================================
// Vant 组件国际化
// ========================================
const vantLocale = computed(() => {
  const currentLocale = i18n.global.locale.value;
  switch (currentLocale) {
    case "zh-CN":
      return vantZhCN;
    case "en":
      return vantEnUS;
    case "zh-TW":
      return vantZhTW;
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
    default: "",
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
      { name: "Home", label: "navigation.home", icon: "home-o" },
      { name: "Games", label: "navigation.games", icon: "apps-o" },
      { name: "Profile", label: "navigation.profile", icon: "user-o" },
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
  return themeStore.isDark ? "dark" : "light";
});

// ========================================
// 主布局样式
// ========================================

defineOptions({ name: "AppLayout" });
</script>

<style lang="less" scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-bg-primary);
  font-family: var(--font-family-base);

  /* ========================================
     主内容区域
     ======================================== */
  .main-content {
    flex: 1;
    /* 顶部内边距：基础间距 + 顶部安全区域 */
    padding-top: calc(var(--spacing-md) + env(safe-area-inset-top, 0px));
    /* 左右内边距 */
    padding-right: var(--spacing-md);
    padding-left: var(--spacing-md);
    /*
      底部安全区域计算：
      - Vant Tabbar 高度：约 50px
      - 额外视觉间距：24px
      - 设备底部安全区域：env(safe-area-inset-bottom)
      总计：约 74px + 安全区域（iPhone 约 108px）
    */
    padding-bottom: calc(
      var(--spacing-3xl) + 24px + env(safe-area-inset-bottom, 0px)
    );
    overflow-y: auto;
    background: var(--color-bg-primary);
    -webkit-overflow-scrolling: touch; /* iOS 平滑滚动 */
  }
}

/* ========================================
   响应式设计
   ======================================== */
@media (min-width: 768px) {
  .app-layout {
    .main-content {
      /* 平板端更大的内边距 */
      padding-top: calc(var(--spacing-lg) + env(safe-area-inset-top, 0px));
      padding-right: var(--spacing-lg);
      padding-left: var(--spacing-lg);
      /*
        平板端底部安全区域：
        - Vant Tabbar 高度：约 50px
        - 额外视觉间距：24px
        - 设备底部安全区域：env(safe-area-inset-bottom)
      */
      padding-bottom: calc(
        var(--spacing-3xl) + 24px + env(safe-area-inset-bottom, 0px)
      );
    }
  }
}
</style>
