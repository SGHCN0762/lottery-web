<template>
  <van-nav-bar
    :title="pageTitle"
    :left-arrow="shouldShowBack"
    z-index="101"
    @click-left="handleGoBack"
    fixed
    placeholder
  >
    <template #right>
      <!-- 右侧插槽：默认空，可由子页面自定义 -->
      <slot name="navbar-right"></slot>
    </template>
  </van-nav-bar>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from 'vue-i18n';
import { NavBar as VanNavBar } from "vant";
import i18n from '@/i18n';

// ========================================
// i18n
// ========================================
const { t } = useI18n();

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
});

// ========================================
// 组合式 API
// ========================================
const route = useRoute();
const router = useRouter();

// ========================================
// 计算属性
// ========================================

/** 页面标题：优先使用路由 meta，其次使用 props */
const pageTitle = computed(() => {
  const titleKey = route.meta.title || props.title
  if (titleKey) {
    return t(titleKey)
  }
  return t('app.name')
});

/** 是否显示返回按钮：优先使用路由 meta，其次使用 props */
const shouldShowBack = computed(() => {
  return route.meta.showBack ?? props.showBack;
});

// ========================================
// 事件处理函数
// ========================================

/** 返回上一页 */
const handleGoBack = () => {
  router.go(-1);
};
</script>

<style lang="less" scoped>
/* Vant NavBar 顶部安全区域适配 */
:deep(.van-nav-bar) {
  /* 为 iPhone 刘海屏添加顶部安全距离 */
  padding-top: env(safe-area-inset-top, 0px);

  .van-nav-bar__content {
    /* 确保内容在安全区域内 */
    height: auto;
    min-height: 46px;
  }
}
</style>