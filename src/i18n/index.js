/**
 * Vue I18n 国际化配置
 * 
 * 支持语言：
 * - zh-CN: 简体中文
 * - zh-TW: 繁体中文
 * - en: English
 */

import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import zhTW from './locales/zh-TW'
import en from './locales/en'

// ========================================
// 语言配置
// ========================================

/**
 * 支持的语言列表
 */
export const SUPPORTED_LOCALES = [
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', name: '繁體中文', flag: '🇭🇰' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
]

/**
 * 默认语言
 */
const DEFAULT_LOCALE = 'zh-CN'

/**
 * localStorage 中存储语言的 key
 */
const LOCALE_STORAGE_KEY = 'locale'

// ========================================
// 获取保存的语言偏好
// ========================================

/**
 * 从 localStorage 获取用户选择的语言
 * @returns {string} 语言代码
 */
const getSavedLocale = () => {
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (saved && SUPPORTED_LOCALES.some(locale => locale.code === saved)) {
      return saved
    }
  } catch (error) {
    console.warn('Failed to read locale from localStorage:', error)
  }
  return DEFAULT_LOCALE
}

// ========================================
// 创建 i18n 实例
// ========================================

const i18n = createI18n({
  // 关闭 legacy 模式，启用 Composition API
  legacy: false,
  
  // 全局注入 $t 函数
  globalInjection: true,
  
  // 继承区域设置
  inheritLocale: true,
  
  //  fallback 语言（当翻译缺失时使用）
  fallbackLocale: DEFAULT_LOCALE,
  
  // 当前语言
  locale: getSavedLocale(),
  
  // 语言包
  messages: {
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    'en': en,
  }
})

// ========================================
// 工具函数
// ========================================

/**
 * 切换语言
 * @param {string} locale - 目标语言代码
 */
export const switchLanguage = (locale) => {
  if (SUPPORTED_LOCALES.some(l => l.code === locale)) {
    i18n.global.locale.value = locale
    localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    
    // 更新 HTML lang 属性
    document.documentElement.lang = locale
    
    console.log(`Language switched to: ${locale}`)
  } else {
    console.warn(`Unsupported locale: ${locale}`)
  }
}

/**
 * 获取当前语言
 * @returns {string} 当前语言代码
 */
export const getCurrentLocale = () => {
  return i18n.global.locale.value
}

/**
 * 获取当前语言信息
 * @returns {Object} 语言信息对象
 */
export const getCurrentLocaleInfo = () => {
  const currentLocale = getCurrentLocale()
  return SUPPORTED_LOCALES.find(locale => locale.code === currentLocale) || SUPPORTED_LOCALES[0]
}

// ========================================
// 初始化
// ========================================

// 设置初始 HTML lang 属性
document.documentElement.lang = getSavedLocale()

export default i18n
