<template>
  <div id="app" :class="appThemeClass">
    <component
      :is="layouts[route.meta.layout]"
      :title="route.meta.title || t('app.title')"
    >
      <router-view v-slot="{ Component, route }">
        <keep-alive v-if="route.meta.keepAlive">
          <component :is="Component" />
        </keep-alive>
        <component :is="Component" v-else />
      </router-view>
    </component>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useThemeStore } from "./stores/theme";
import AppLayout from "@/components/AppLayout/index.vue";
import PageLayout from "@/components/PageLayout/index.vue";

const layouts = {
  AppLayout,
  PageLayout,
};

// ========================================
// i18n
// ========================================
const { t } = useI18n();

// ========================================
// 路由实例
// ========================================
const route = useRoute();

// ========================================
// 主题管理
// ========================================
const themeStore = useThemeStore();

/**
 * 应用主题类名（用于自定义样式）
 * @returns {string} 主题类名
 */
const appThemeClass = computed(() => {
  return `theme-${themeStore.themeMode}`;
});
</script>
