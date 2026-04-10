<template>
  <van-config-provider :theme="vantTheme">
    <div class="app-layout">
      <!-- Vant 导航栏 -->
      <van-nav-bar
        :title="pageTitle"
        :left-arrow="shouldShowBack"
        z-index="101"
        @click-left="handleGoBack"
        fixed
        placeholder
      >
        <template #right>
          <!-- 右侧插槽：默认显示主题切换按钮 -->
          <slot name="navbar-right">
            <van-icon
              name="ellipsis"
              class="theme-toggle-btn"
              @click="showThemeMenu = true"
              aria-label="切换主题"
            />
          </slot>
        </template>
      </van-nav-bar>

      <!-- 主内容区域 -->
      <main class="main-content">
        <slot></slot>
      </main>

      <!-- Vant 底部标签栏 -->
      <van-tabbar
        v-if="shouldShowTabbar"
        v-model="activeTab"
        z-index="101"
        @change="handleTabChange"
        route
      >
        <van-tabbar-item
          v-for="tab in navigationTabs"
          :key="tab.name"
          :name="tab.name"
          :to="{ name: tab.name }"
          :icon="convertToVantIcon(tab.icon)"
        >
          {{ tab.label }}
        </van-tabbar-item>
      </van-tabbar>

      <!-- 主题选择弹窗 -->
      <van-action-sheet
        v-model:show="showThemeMenu"
        :actions="themeOptions"
        @select="handleThemeSelect"
        cancel-text="取消"
        description="选择主题模式"
        close-on-click-action
      />
    </div>
  </van-config-provider>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  NavBar as VanNavBar,
  Tabbar as VanTabbar,
  TabbarItem as VanTabbarItem,
  ActionSheet as VanActionSheet,
  Icon as VanIcon,
  ConfigProvider as VanConfigProvider,
} from "vant";
import { useThemeStore } from "@/stores/theme";

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
      { name: "Home", label: "首页", icon: "home-o" },
      { name: "Lottery", label: "娱乐", icon: "apps-o" },
      { name: "Profile", label: "我的", icon: "user-o" },
    ],
  },
});

// ========================================
// 组合式 API
// ========================================
const route = useRoute();
const router = useRouter();
const themeStore = useThemeStore();

// 当前激活的标签页
const activeTab = ref(route.name || "Home");

// 主题菜单显示状态
const showThemeMenu = ref(false);

// ========================================
// 计算属性
// ========================================

/** 页面标题：优先使用路由 meta，其次使用 props */
const pageTitle = computed(() => {
  return route.meta.title || props.title || '瑶光'
});

/** 是否显示返回按钮：优先使用路由 meta，其次使用 props */
const shouldShowBack = computed(() => {
  return route.meta.showBack ?? props.showBack;
});

/** 是否显示底部标签栏：默认不显示，除非路由 meta 中明确设置为 true */
const shouldShowTabbar = computed(() => {
  return route.meta.showTabbar === true;
});

/** 导航标签列表 */
const navigationTabs = computed(() => props.tabs);

/** 主题选项列表 */
const themeOptions = computed(() => [
  { name: "☀️ 白天模式", value: "light" },
  { name: "🌙 黑夜模式", value: "dark" },
  { name: "⚙️ 跟随系统", value: "auto" },
]);

/** Vant 主题 */
const vantTheme = computed(() => {
  return themeStore.themeMode === "dark" ? "dark" : "light";
});

// ========================================
// 监听器
// ========================================

/** 监听路由变化，同步激活标签 */
watch(
  () => route.name,
  (newName) => {
    if (newName) {
      activeTab.value = newName;
    }
  },
);

// ========================================
// 工具函数
// ========================================

/**
 * 将 Font Awesome 图标转换为 Vant 图标
 * @param {string} icon - 图标名称
 * @returns {string} Vant 图标名称
 */
const convertToVantIcon = (icon) => {
  // 如果已经是 Vant 图标（不包含 fa-），直接返回
  if (!icon.includes("fa-")) {
    return icon;
  }

  // Font Awesome 到 Vant 图标映射表
  const iconMapping = {
    "fas fa-home": "home-o",
    "fas fa-dice": "fire-o",
    "fas fa-user": "user-o",
    "fas fa-info-circle": "info-o",
    "fa-solid fa-home": "home-o",
    "fa-solid fa-dice": "fire-o",
    "fa-solid fa-user": "user-o",
    "fa-solid fa-info-circle": "info-o",
  };

  return iconMapping[icon] || "circle-o";
};

// ========================================
// 事件处理函数
// ========================================

/** 返回上一页 */
const handleGoBack = () => {
  router.go(-1);
};

/** 标签页切换 */
const handleTabChange = (name) => {
  // 由于使用了 route 属性，Vant 会自动处理路由跳转
  console.log("切换到标签:", name);
};

/** 主题选择 */
const handleThemeSelect = (action) => {
  themeStore.setThemeMode(action.value);
  showThemeMenu.value = false;
};
</script>

<style lang="less" scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-bg-primary);
  font-family: var(--font-family-base);

  /* ========================================
     Vant NavBar 顶部安全区域适配
     ======================================== */
  :deep(.van-nav-bar) {
    /* 为 iPhone 刘海屏添加顶部安全距离 */
    padding-top: env(safe-area-inset-top, 0px);

    .van-nav-bar__content {
      /* 确保内容在安全区域内 */
      height: auto;
      min-height: 46px;
    }
  }

  /* 主题切换按钮样式 */
  .theme-toggle-btn {
    font-size: 20px;
    color: var(--color-primary);
    cursor: pointer;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    transition: background-color var(--transition-fast);

    &:hover {
      background-color: rgba(0, 122, 255, 0.1);
    }

    &:active {
      background-color: rgba(0, 122, 255, 0.2);
      transform: scale(0.95);
    }
  }

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
    :deep(.van-nav-bar) {
      /* 平板端顶部安全区域 */
      padding-top: env(safe-area-inset-top, 0px);
    }

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