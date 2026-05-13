<template>
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
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from 'vue-i18n';
import { Tabbar as VanTabbar, TabbarItem as VanTabbarItem } from "vant";

// ========================================
// i18n
// ========================================
import i18n from '@/i18n';
const { t } = useI18n();

// ========================================
// Props 定义
// ========================================
const props = defineProps({
  /** 底部导航标签配置 */
  tabs: {
    type: Array,
    default: () => [
      { name: "Home", label: "navigation.home", icon: "home-o" },
      { name: "Lottery", label: "navigation.games", icon: "apps-o" },
      { name: "Profile", label: "navigation.profile", icon: "user-o" },
    ],
  },
});

// ========================================
// 组合式 API
// ========================================
const route = useRoute();

// 当前激活的标签页
const activeTab = ref(route.name || "Home");

// ========================================
// 计算属性
// ========================================

/** 是否显示底部标签栏：默认不显示，除非路由 meta 中明确设置为 true */
const shouldShowTabbar = computed(() => {
  return route.meta.showTabbar === true;
});

/** 导航标签列表（将 i18n key 转换为翻译后的文本） */
const navigationTabs = computed(() =>
  props.tabs.map(tab => ({
    ...tab,
    label: t(tab.label)
  }))
);

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

/** 标签页切换 */
const handleTabChange = (name) => {
  // 由于使用了 route 属性，Vant 会自动处理路由跳转
  console.log("切换到标签:", name);
};
</script>

<style lang="less" scoped>
/* 底部安全区域适配 */
:deep(.van-tabbar) {
  /* 为 iPhone 刘海屏添加底部安全距离 */
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
</style>