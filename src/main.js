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

// 国际化
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
} from 'vant';

// 导入 Vant 语言包
import vantZhCN from 'vant/es/locale/lang/zh-CN';
import vantEnUS from 'vant/es/locale/lang/en-US';

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
  switch (currentLocale) {
    case 'zh-CN':
      Locale.use('zh-CN', vantZhCN);
      break;
    case 'en':
      Locale.use('en-US', vantEnUS);
      break;
    default:
      Locale.use('zh-CN', vantZhCN);
  }
};

// 初始设置 Vant 语言
initVantLocale();

// ========================================
// 监听语言变化，更新 Vant 语言
// ========================================
i18n.global.onLanguageChange = (locale) => {
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
// INP (Interaction to Next Paint) 性能监控
// ========================================
if ('PerformanceObserver' in window) {
  // 监控首次输入延迟 (FID)
  try {
    const fidObserver = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (entry.cancelable) {
          console.log(`FID: ${entry.processingStart - entry.startTime}ms`);
        }
      }
    });
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch (e) {
    console.warn('FID observation not supported');
  }

  // 监控长任务 (Long Tasks)
  try {
    const longTaskObserver = new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms at ${entry.startTime.toFixed(2)}ms`);
      }
    });
    longTaskObserver.observe({ type: 'longtask', buffered: true });
  } catch (e) {
    console.warn('Long task observation not supported');
  }

  // 监控 LCP
  try {
    const lcpObserver = new PerformanceObserver(list => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log(`LCP: ${lastEntry.startTime.toFixed(2)}ms`);
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    console.warn('LCP observation not supported');
  }
}
