/**
 * 计数器 Store（示例）
 * 
 * 这是一个简单的计数器状态管理示例，展示 Pinia 的基本用法
 */

import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  // ========================================
  // 状态定义
  // ========================================
  state: () => ({
    /** 计数器当前值 */
    count: 0
  }),
  
  // ========================================
  // 动作（修改状态的方法）
  // ========================================
  actions: {
    /** 计数器加 1 */
    increment() {
      this.count++
    },
    
    /** 计数器减 1 */
    decrement() {
      this.count--
    },
    
    /** 重置计数器 */
    reset() {
      this.count = 0
    }
  },
  
  // ========================================
  // 计算属性（派生状态）
  // ========================================
  getters: {
    /** 获取计数的双倍值 */
    doubleCount: (state) => state.count * 2,
    
    /** 判断计数是否为正数 */
    isPositive: (state) => state.count > 0
  }
})