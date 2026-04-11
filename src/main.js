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

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

// 国际化
import i18n from './i18n'

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
  Locale
} from 'vant'

// 导入 Vant 语言包
import vantZhCN from 'vant/es/locale/lang/zh-CN';
import vantEnUS from 'vant/es/locale/lang/en-US';
import vantZhTW from 'vant/es/locale/lang/zh-TW';

// 主题管理
import { useThemeStore } from './stores/theme'

// 根组件
import App from './App.vue'

// Vant 样式（必须在自定义样式之前引入）
import 'vant/lib/index.css'

// Font Awesome 图标库
import '@fortawesome/fontawesome-free/css/all.css'

// 全局样式
import './style.css'

// ========================================
// 创建应用实例
// ========================================
const app = createApp(App)
const pinia = createPinia()

// ========================================
// 注册插件
// ========================================
app.use(pinia)
app.use(router)
app.use(i18n)

// ========================================
// 注册 Vant 组件
// ========================================
app.use(ConfigProvider)
app.use(NavBar)
app.use(Tabbar)
app.use(TabbarItem)
app.use(ActionSheet)
app.use(Icon)
app.use(CellGroup)
app.use(Cell)
app.use(Grid)
app.use(GridItem)
app.use(Button)
app.use(Field)
app.use(Toast)

// ========================================
// 初始化主题系统
// ========================================
const themeStore = useThemeStore()
themeStore.initTheme()

// ========================================
// 初始化 Vant 语言
// ========================================
const initVantLocale = () => {
  const currentLocale = i18n.global.locale.value
  switch (currentLocale) {
    case 'zh-CN':
      Locale.use('zh-CN', vantZhCN)
      break
    case 'en':
      Locale.use('en-US', vantEnUS)
      break
    case 'zh-TW':
      Locale.use('zh-TW', vantZhTW)
      break
    default:
      Locale.use('zh-CN', vantZhCN)
  }
}

// 初始设置 Vant 语言
initVantLocale()

// 监听语言变化，更新 Vant 语言
import { watch } from 'vue'
watch(
  () => i18n.global.locale.value,
  () => {
    initVantLocale()
  }
)

// ========================================
// 挂载应用
// ========================================
app.mount('#app')