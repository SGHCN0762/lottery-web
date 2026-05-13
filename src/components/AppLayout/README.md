# 布局组件 (Layout Components)

本文件夹包含了应用程序的各种布局组件，用于构建一致的用户界面结构。

## 组件列表

### AppLayout.vue
主布局组件，包含导航栏、主内容区和底部标签栏。

**使用示例:**
```vue
<template>
  <AppLayout title="页面标题" :show-back="true" :tabs="tabs">
    <template #navbar-right>
      <button>自定义按钮</button>
    </template>

    <div>页面内容</div>
  </AppLayout>
</template>

<script setup>
import { AppLayout } from '@/components/Layouts';

const tabs = [
  { name: "Home", label: "navigation.home", icon: "home-o" },
  { name: "Lottery", label: "navigation.games", icon: "apps-o" },
  { name: "Profile", label: "navigation.profile", icon: "user-o" },
];
</script>
```

### AppNavbar.vue
导航栏组件，显示页面标题和返回按钮。

**Props:**
- `title`: 页面标题
- `showBack`: 是否显示返回按钮

### AppTabbar.vue
底部标签栏组件，用于导航和切换页面。

**Props:**
- `tabs`: 标签配置数组，每个标签包含 name, label 和 icon 属性

## 主题支持

所有布局组件都支持主题切换，会根据主题设置自动应用相应的样式。

## 国际化

所有文本内容都支持多语言，通过 vue-i18n 进行国际化处理。
