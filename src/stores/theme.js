/**
 * 主题管理 Store
 * 
 * 功能：
 * - 支持三种主题模式：白天、黑夜、跟随系统
 * - 自动持久化到 localStorage
 * - 监听系统主题变化
 */

import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

// localStorage 键名常量
const STORAGE_KEY = 'theme-mode'

// 有效的主题模式列表
const VALID_THEMES = ['light', 'dark', 'auto']

export const useThemeStore = defineStore('theme', () => {
  // ========================================
  // 状态定义
  // ========================================
  
  /** 
   * 当前主题模式
   * @type {'light' | 'dark' | 'auto'}
   */
  const themeMode = ref('auto')
  
  // ========================================
  // 计算属性
  // ========================================
  
  /**
   * 计算是否应该使用深色模式
   * - auto 模式：根据系统设置决定
   * - light/dark 模式：直接使用设定值
   * @returns {boolean}
   */
  const isDark = computed(() => {
    if (themeMode.value === 'auto') {
      // 检测系统深色模式偏好
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return themeMode.value === 'dark'
  })

  // ========================================
  // 核心方法
  // ========================================

  /**
   * 设置主题模式并持久化
   * @param {'light' | 'dark' | 'auto'} mode - 主题模式
   */
  const setThemeMode = (mode) => {
    // 验证输入
    if (!VALID_THEMES.includes(mode)) {
      console.warn(`无效的主题模式: ${mode}，使用默认值 auto`)
      mode = 'auto'
    }
    
    themeMode.value = mode
    saveToStorage()
    applyThemeToDOM()
  }

  /**
   * 将主题应用到 DOM（通过 data-theme 属性）
   */
  const applyThemeToDOM = () => {
    const rootElement = document.documentElement
    
    if (isDark.value) {
      rootElement.setAttribute('data-theme', 'dark')
    } else {
      rootElement.setAttribute('data-theme', 'light')
    }
  }

  /**
   * 保存主题设置到 localStorage
   */
  const saveToStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY, themeMode.value)
    } catch (error) {
      console.error('保存主题设置失败:', error)
    }
  }

  /**
   * 从 localStorage 加载主题设置
   */
  const loadFromStorage = () => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY)
      
      if (savedTheme && VALID_THEMES.includes(savedTheme)) {
        themeMode.value = savedTheme
      }
    } catch (error) {
      console.error('读取主题设置失败:', error)
    }
  }

  /**
   * 设置系统主题变化监听器
   * 仅在 auto 模式下生效
   */
  const setupSystemThemeListener = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    // 监听系统主题变化
    mediaQuery.addEventListener('change', handleSystemThemeChange)
  }

  /**
   * 系统主题变化处理函数
   */
  const handleSystemThemeChange = () => {
    // 仅在 auto 模式下响应系统变化
    if (themeMode.value === 'auto') {
      applyThemeToDOM()
    }
  }

  /**
   * 初始化主题（应用启动时调用）
   */
  const initTheme = () => {
    loadFromStorage()
    applyThemeToDOM()
    setupSystemThemeListener()
  }

  // ========================================
  // 监听器
  // ========================================
  
  /** 监听 isDark 变化，自动更新 DOM */
  watch(isDark, () => {
    applyThemeToDOM()
  })

  // ========================================
  // 导出 API
  // ========================================
  return {
    themeMode,
    isDark,
    setThemeMode,
    initTheme
  }
})