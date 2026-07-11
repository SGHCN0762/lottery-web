<template>
  <div id="app" :class="appThemeClass">
    <van-config-provider :theme-vars="themeVars">
      <Skeleton />
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
    </van-config-provider>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useThemeStore } from "./stores/theme";
import { ConfigProvider as VanConfigProvider } from "vant";
import AppLayout from "@/components/AppLayout/index.vue";
import PageLayout from "@/components/PageLayout/index.vue";
import Skeleton from "@/components/Skeleton/index.vue";

const layouts = {
  AppLayout,
  PageLayout,
};

const { t } = useI18n();
const route = useRoute();
const themeStore = useThemeStore();

const appThemeClass = computed(() => {
  return `theme-${themeStore.themeMode}`;
});

// Vant 4.x 官方设计规范主题变量
const themeVars = computed(() => ({
  // 主色
  primaryColor: '#1989fa',

  // 功能色
  successColor: '#07c160',
  warningColor: '#ff976a',
  dangerColor: '#ee0a24',

  // 中性色
  textColor: '#323233',
  textColorSecondary: '#646566',
  textColorTertiary: '#969799',
  textColorPlaceholder: '#c8c9cc',

  // 背景色
  backgroundColor: '#f7f8fa',
  backgroundColorSecondary: '#ffffff',

  // 边框
  borderColor: '#ebedf0',

  // 圆角
  radius: '8px',
}));
</script>

<style scoped lang="less"> 
:deep(.van-config-provider) {
  height: 100%;
}
</style>