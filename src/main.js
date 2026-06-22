/**
 * 应用入口文件
 *
 * 职责：
 * - 创建 Vue 应用实例
 * - 注册全局插件（Pinia、Vue Router、Vue I18n）
 * - 注册 Vant 组件库
 * - 初始化主题系统
 * - 挂载应用到 DOM
 */

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';

// 国际化 - 同步加载（App.vue 中使用 useI18n）
import i18n from './i18n';

// Vant 组件按需导入
import {
  ConfigProvider,
  NavBar,
  Tabbar,
  TabbarItem,
  ActionSheet,
  Icon,
  CellGroup,
  Cell,
  Grid,
  GridItem,
  Button,
  Field,
  Toast,
  Popup,
  Locale,
  Progress,
  Tag,
  DropdownMenu,
  DropdownItem,
  Empty,
  Switch,
  Tabs,
  Tab,
  Dialog,
  Picker,
  Form,
  Checkbox,
  Image,
  List,
  Slider,
  Uploader,
} from 'vant';

// 主题管理
import { useThemeStore } from './stores/theme';

// 根组件
import App from './App.vue';

// Vant 样式（必须在自定义样式之前引入）
import 'vant/lib/index.css';

// 全局样式
import './style.css';

// ========================================
// 创建应用实例
// ========================================
const app = createApp(App);
const pinia = createPinia();

// ========================================
// 注册插件
// ========================================
app.use(pinia);
app.use(router);
app.use(i18n);

// ========================================
// 注册 Vant 组件
// ========================================
app.use(ConfigProvider);
app.use(NavBar);
app.use(Tabbar);
app.use(TabbarItem);
app.use(ActionSheet);
app.use(Icon);
app.use(CellGroup);
app.use(Cell);
app.use(Grid);
app.use(GridItem);
app.use(Button);
app.use(Field);
app.use(Toast);
app.use(Popup);
app.use(Progress);
app.use(Tag);
app.use(DropdownMenu);
app.use(DropdownItem);
app.use(Empty);
app.use(Switch);
app.use(Tabs);
app.use(Tab);
app.use(Dialog);
app.use(Picker);
app.use(Form);
app.use(Checkbox);
app.use(Image);
app.use(List);
app.use(Slider);
app.use(Uploader);

// ========================================
// 初始化主题系统（同步执行，避免闪烁）
// ========================================
const themeStore = useThemeStore();
themeStore.initTheme();

// ========================================
// 初始化 Vant 语言
// ========================================
const initVantLocale = () => {
  const currentLocale = i18n.global.locale.value;

  // 动态导入 Vant 语言包
  if (currentLocale === 'zh-CN') {
    import('vant/es/locale/lang/zh-CN').then(vantZhCN => {
      Locale.use('zh-CN', vantZhCN.default);
    });
  } else if (currentLocale === 'en') {
    import('vant/es/locale/lang/en-US').then(vantEnUS => {
      Locale.use('en-US', vantEnUS.default);
    });
  }
};

// 初始设置 Vant 语言
initVantLocale();

// ========================================
// 监听语言变化，更新 Vant 语言
// ========================================
i18n.global.onLanguageChange = () => {
  initVantLocale();
};

// ========================================
// 立即挂载应用，优化 LCP
// ========================================
app.mount('#app');

// 性能优化：在下一帧添加loaded类，触发动画
requestAnimationFrame(() => {
  document.querySelector('.custom-calendar')?.classList.add('loaded');
});

// ========================================
// 性能监控（仅开发环境）
// ========================================
if (process.env.NODE_ENV === 'development' && 'PerformanceObserver' in window) {
  const observers = [];

  const createObserver = (type, callback, buffered = true) => {
    try {
      const observer = new PerformanceObserver(list => {
        callback(list.getEntries());
      });
      observer.observe({ type, buffered });
      observers.push({ observer, type });
    } catch (e) {
      console.warn(`${type} observation not supported`);
    }
  };

  createObserver('first-input', entries => {
    const entry = entries.find(e => e.cancelable);
    if (entry) {
      console.log(`FID: ${entry.processingStart - entry.startTime}ms`);
    }
  });

  createObserver('longtask', entries => {
    entries.forEach(entry => {
      console.warn(`Long task: ${entry.duration.toFixed(2)}ms at ${entry.startTime.toFixed(2)}ms`);
    });
  });

  createObserver('largest-contentful-paint', entries => {
    const lastEntry = entries[entries.length - 1];
    if (lastEntry) {
      console.log(`LCP: ${lastEntry.startTime.toFixed(2)}ms`);
    }
  });
}