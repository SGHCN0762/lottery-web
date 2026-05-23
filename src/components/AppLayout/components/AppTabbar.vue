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
      :icon="tab.icon"
    >
      {{ tab.label }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
  import { ref, watch, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import { Tabbar as VanTabbar, TabbarItem as VanTabbarItem } from 'vant';

  const { t } = useI18n();

  // ========================================
  // Props 定义
  // ========================================
  const props = defineProps({
    /** 底部导航标签配置 */
    tabs: {
      type: Array,
      default: () => [],
    },
  });

  // ========================================
  // 组合式 API
  // ========================================
  const route = useRoute();

  // 当前激活的标签页
  const activeTab = ref(route.name || 'Home');

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
      label: t(tab.label),
    }))
  );

  // ========================================
  // 监听器
  // ========================================

  /** 监听路由变化，同步激活标签 */
  watch(
    () => route.name,
    newName => {
      if (newName) {
        activeTab.value = newName;
      }
    }
  );

  /** 标签页切换 */
  const handleTabChange = name => {
    // 由于使用了 route 属性，Vant 会自动处理路由跳转
  };
</script>

<style lang="less" scoped>
  /* 底部安全区域适配 */
  :deep(.van-tabbar) {
    /* 为 iPhone 刘海屏添加底部安全距离 */
    padding-bottom: env(safe-area-inset-bottom, 0px);

    /* 调整 Tabbar 高度，使其更紧凑 */
    .van-tabbar-item {
      font-size: 11px; /* 微信风格的标签字号 */

      .van-tabbar-item__icon {
        font-size: 22px; /* 减小图标大小 */
        margin-bottom: 2px; /* 减小图标与文字的间距 */
      }
    }
  }
</style>
