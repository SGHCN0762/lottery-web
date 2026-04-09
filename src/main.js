/**
 * 应用入口文件
 * 
 * 职责：
 * - 创建 Vue 应用实例
 * - 注册全局插件（Pinia、Vue Router）
 * - 注册 Vant 组件库
 * - 初始化主题系统
 * - 挂载应用到 DOM
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

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
  Toast
} from 'vant'

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
// 挂载应用
// ========================================
app.mount('#app')