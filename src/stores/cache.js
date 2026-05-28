/**
 * IndexedDB 缓存 Store
 * 
 * 功能：
 * - 管理 IndexedDB 缓存数据
 * - 提供缓存读写、清除等操作
 * - 使用 computed 计算缓存状态
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCacheStore = defineStore('cache', () => {
  // ========================================
  // 状态定义
  // ========================================

  /** 缓存版本信息 */
  const cacheVersions = ref({})
  
  /** 缓存统计信息 */
  const cacheStats = ref({
    cachedCategories: 0,
    totalSize: '未知'
  })

  /** 数据库配置 */
  const DB_NAME = 'LotteryWebCache'
  const DB_VERSION = 1
  const STORE_NAME = 'cacheStore'

  // ========================================
  // 计算属性
  // ========================================

  /** 缓存是否为空 */
  const isCacheEmpty = computed(() => cacheStats.value.cachedCategories === 0)

  /** 缓存版本数量 */
  const versionCount = computed(() => Object.keys(cacheVersions.value).length)

  // ========================================
  // IndexedDB 操作方法
  // ========================================

  /**
   * 打开数据库
   */
  const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)

      request.onupgradeneeded = event => {
        const db = event.target.result
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'category' })
          store.createIndex('version', 'version', { unique: false })
          store.createIndex('timestamp', 'timestamp', { unique: false })
        }
      }
    })
  }

  /**
   * 从缓存读取数据
   */
  const readFromCache = async (category) => {
    try {
      const db = await openDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly')
        const store = transaction.objectStore(STORE_NAME)
        const request = store.get(category)

        request.onsuccess = () => resolve(request.result || null)
        request.onerror = () => reject(request.error)
      })
    } catch (error) {
      console.warn('[IndexedDB Cache] 读取缓存失败:', error)
      return null
    }
  }

  /**
   * 写入缓存
   */
  const writeToCache = async (category, data, version) => {
    try {
      const db = await openDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite')
        const store = transaction.objectStore(STORE_NAME)

        const item = {
          category,
          data,
          version,
          timestamp: Date.now(),
        }

        const request = store.put(item)
        request.onsuccess = () => {
          cacheVersions.value[category] = version
          resolve()
        }
        request.onerror = () => reject(request.error)
      })
    } catch (error) {
      console.warn('[IndexedDB Cache] 写入缓存失败:', error)
    }
  }

  /**
   * 检查文件版本
   */
  const checkFileVersion = async (filePath) => {
    try {
      const response = await fetch(filePath, { method: 'HEAD' })
      return response.headers.get('ETag') || response.headers.get('Last-Modified') || 'unknown'
    } catch (error) {
      console.warn('[IndexedDB Cache] 检查文件版本失败:', error)
      return 'unknown'
    }
  }

  /**
   * 清除指定分类缓存
   */
  const clearCategoryCache = async (category) => {
    try {
      const db = await openDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite')
        const store = transaction.objectStore(STORE_NAME)
        const request = store.delete(category)

        request.onsuccess = () => {
          delete cacheVersions.value[category]
          resolve()
        }
        request.onerror = () => reject(request.error)
      })
    } catch (error) {
      console.warn('[IndexedDB Cache] 清除缓存失败:', error)
    }
  }

  /**
   * 清除所有缓存
   */
  const clearAllCache = async () => {
    try {
      const db = await openDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite')
        const store = transaction.objectStore(STORE_NAME)
        const request = store.clear()

        request.onsuccess = () => {
          cacheVersions.value = {}
          cacheStats.value = { cachedCategories: 0, totalSize: '未知' }
          resolve()
        }
        request.onerror = () => reject(request.error)
      })
    } catch (error) {
      console.warn('[IndexedDB Cache] 清除所有缓存失败:', error)
    }
  }

  /**
   * 获取缓存统计
   */
  const fetchCacheStats = async () => {
    try {
      const db = await openDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly')
        const store = transaction.objectStore(STORE_NAME)
        const request = store.count()

        request.onsuccess = () => {
          cacheStats.value = {
            cachedCategories: request.result,
            totalSize: '计算中...',
          }
          resolve(cacheStats.value)
        }
        request.onerror = () => reject(request.error)
      })
    } catch (error) {
      console.warn('[IndexedDB Cache] 获取缓存统计失败:', error)
      return { cachedCategories: 0, totalSize: '未知' }
    }
  }

  /**
   * 删除数据库
   */
  const deleteDatabase = async () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase(DB_NAME)
      request.onsuccess = () => {
        cacheVersions.value = {}
        cacheStats.value = { cachedCategories: 0, totalSize: '未知' }
        resolve()
      }
      request.onerror = () => reject(request.error)
    })
  }

  // ========================================
  // 导出 API
  // ========================================
  return {
    // 状态
    cacheVersions,
    cacheStats,

    // 计算属性
    isCacheEmpty,
    versionCount,

    // 方法
    openDB,
    readFromCache,
    writeToCache,
    checkFileVersion,
    clearCategoryCache,
    clearAllCache,
    fetchCacheStats,
    deleteDatabase,
  }
})