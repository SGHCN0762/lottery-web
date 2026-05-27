/**
 * 性能优化工具集
 * 专门用于优化 INP (Interaction to Next Paint) 性能
 */

/**
 * 防抖函数 - 延迟执行，在指定时间内只执行最后一次
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 等待时间（毫秒）
 * @param {boolean} immediate - 是否立即执行
 * @returns {Function} 防抖后的函数
 */
export function debounce(func, wait = 300, immediate = false) {
  let timeout;
  
  return function executedFunction(...args) {
    const context = this;
    
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    
    const callNow = immediate && !timeout;
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func.apply(context, args);
  };
}

/**
 * 节流函数 - 限制函数执行频率
 * @param {Function} func - 要执行的函数
 * @param {number} limit - 时间限制（毫秒）
 * @param {Object} options - 配置选项
 * @returns {Function} 节流后的函数
 */
export function throttle(func, limit = 100, options = {}) {
  let inThrottle;
  let lastFunc;
  let lastRan;
  const { onTrailing = true } = options;
  
  return function executedFunction(...args) {
    const context = this;
    
    if (!inThrottle) {
      func.apply(context, args);
      lastRan = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFunc);
      
      lastFunc = setTimeout(() => {
        if (onTrailing && Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

/**
 * 立即执行防抖 - 快速响应用户输入，同时确保最终执行
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} 优化后的函数
 */
export function debounceLeadingTrailing(func, wait = 300) {
  let timeout;
  
  return function executedFunction(...args) {
    const context = this;
    const doCall = !timeout;
    
    clearTimeout(timeout);
    
    if (doCall) func.apply(context, args);
    
    timeout = setTimeout(() => {
      if (!doCall) func.apply(context, args);
      timeout = null;
    }, wait);
  };
}

/**
 * 在下一帧执行函数
 * @param {Function} callback - 回调函数
 * @returns {number} requestAnimationFrame ID
 */
export function nextFrame(callback) {
  return requestAnimationFrame(() => {
    callback();
  });
}

/**
 * 在主线程空闲时执行任务（使用 requestIdleCallback）
 * @param {Function} task - 要执行的任务
 * @param {Object} options - 配置选项
 * @returns {number} ID
 */
export function runWhenIdle(task, options = {}) {
  const { timeout = 5000 } = options;
  
  if ('requestIdleCallback' in window) {
    return requestIdleCallback(task, { timeout });
  } else {
    // 降级方案：使用 setTimeout
    return setTimeout(task, 1);
  }
}

/**
 * 延迟执行函数，不阻塞主线程
 * @param {Function} func - 要执行的函数
 * @param {number} delay - 延迟时间（毫秒）
 */
export function asyncTask(func, delay = 0) {
  if (delay > 0) {
    setTimeout(func, delay);
  } else {
    // 使用 requestIdleCallback 或 setTimeout 0 来不阻塞渲染
    if ('requestIdleCallback' in window) {
      requestIdleCallback(func);
    } else {
      setTimeout(func, 0);
    }
  }
}

/**
 * 创建交互状态管理器 - 立即响应用户，提供即时反馈
 * @param {Object} options - 配置
 * @returns {Object} 状态管理对象
 */
export function createInteractionState(options = {}) {
  const { 
    immediateFeedback = true,
    onInteraction = () => {},
    onComplete = () => {} 
  } = options;
  
  return {
    // 标记交互开始
    start() {
      if (immediateFeedback) {
        // 立即提供视觉反馈
        onInteraction();
      }
      return Date.now();
    },
    
    // 标记交互完成
    complete(startTime) {
      const duration = Date.now() - startTime;
      onComplete(duration);
      return duration;
    },
    
    // 批量处理任务
    batch(tasks, onBatchComplete) {
      const startTime = Date.now();
      
      // 将任务拆分到多帧执行
      const frames = [];
      const chunkSize = 3; // 每帧处理的任务数
      
      for (let i = 0; i < tasks.length; i += chunkSize) {
        frames.push(tasks.slice(i, i + chunkSize));
      }
      
      let currentFrame = 0;
      
      const processFrame = () => {
        if (currentFrame < frames.length) {
          frames[currentFrame].forEach(task => task());
          currentFrame++;
          requestAnimationFrame(processFrame);
        } else {
          onBatchComplete(Date.now() - startTime);
        }
      };
      
      requestAnimationFrame(processFrame);
    }
  };
}

/**
 * 性能监控工具 - 测量 INP
 */
export class INPMonitor {
  constructor() {
    this.interactions = [];
    this.maxInteractions = 20;
    
    if ('PerformanceObserver' in window) {
      this.initObserver();
    }
  }
  
  initObserver() {
    // 观察首次输入延迟 (FID)
    const fidObserver = new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        this.recordInteraction('fid', entry.startTime, entry.duration);
      });
    });
    
    try {
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      console.warn('FID observation not supported');
    }
    
    // 观察长任务
    const longTaskObserver = new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`, entry);
      });
    });
    
    try {
      longTaskObserver.observe({ type: 'longtask', buffered: true });
    } catch (e) {
      console.warn('Long task observation not supported');
    }
  }
  
  recordInteraction(type, startTime, duration) {
    this.interactions.push({
      type,
      startTime,
      duration,
      timestamp: Date.now()
    });
    
    if (this.interactions.length > this.maxInteractions) {
      this.interactions.shift();
    }
    
    // 输出到控制台（生产环境可关闭）
    console.log(`INP [${type}]: ${duration.toFixed(2)}ms`);
  }
  
  getAverageDuration() {
    if (this.interactions.length === 0) return 0;
    
    const sum = this.interactions.reduce((acc, curr) => acc + curr.duration, 0);
    return sum / this.interactions.length;
  }
  
  getWorstInteraction() {
    if (this.interactions.length === 0) return null;
    
    return this.interactions.reduce((worst, current) => {
      return current.duration > worst.duration ? current : worst;
    }, this.interactions[0]);
  }
  
  clear() {
    this.interactions = [];
  }
}

// 导出单例
export const inpMonitor = new INPMonitor();
