import { ref } from 'vue'

/**
 * 本地存储 Hook
 * 提供响应式的 localStorage 访问
 * @param {string} key - 存储键名
 * @param {any} defaultValue - 默认值
 * @returns {Object} 包含 value 和方法的对象
 */
export function useStorage(key, defaultValue = null) {
  const storedValue = localStorage.getItem(key)
  const value = ref(storedValue ? JSON.parse(storedValue) : defaultValue)

  /**
   * 保存值到 localStorage
   * @param {any} newValue - 要保存的值
   */
  const setValue = (newValue) => {
    value.value = newValue
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  /**
   * 清除值
   */
  const removeValue = () => {
    value.value = defaultValue
    localStorage.removeItem(key)
  }

  return {
    value,
    setValue,
    removeValue
  }
}
