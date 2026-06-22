/**
 * 防抖函数（复刻 lodash.debounce）
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 等待时间（毫秒）
 * @param {Object} options - 选项对象
 * @param {boolean} options.leading - 是否在延迟开始前执行
 * @param {boolean} options.trailing - 是否在延迟结束后执行
 * @param {number} options.maxWait - 最大等待时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
export function debounce(func, wait, options = {}) {
  let lastArgs
  let lastThis
  let maxWait
  let result
  let timerId
  let lastCallTime

  const { leading = false, trailing = true, maxWait: maxWaitOption } = options

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }

  wait = Number(wait) || 0
  if (maxWaitOption !== undefined) {
    maxWait = Number(maxWaitOption) || 0
  }

  function invokeFunc(time) {
    const args = lastArgs
    const thisArg = lastThis

    lastArgs = lastThis = undefined
    result = func.apply(thisArg, args)
    return result
  }

  function leadingEdge(time) {
    lastCallTime = time
    timerId = setTimeout(timerExpired, wait)
    if (leading) {
      return invokeFunc(time)
    }
    return result
  }

  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall

    return maxWait
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting
  }

  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime

    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxWait !== undefined && timeSinceLastInvoke >= maxWait)
    )
  }

  function timerExpired() {
    const time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    timerId = setTimeout(timerExpired, remainingWait(time))
  }

  function trailingEdge(time) {
    timerId = undefined
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId)
    }
    lastCallTime = lastInvokeTime = timerId = lastArgs = lastThis = undefined
  }

  function flush() {
    if (timerId !== undefined) {
      const time = Date.now()
      if (shouldInvoke(time)) {
        return invokeFunc(time)
      }
    }
    return result
  }

  let lastInvokeTime = 0

  function debounced(...args) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxWait !== undefined) {
        timerId = setTimeout(timerExpired, wait)
        return invokeFunc(time)
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait)
    }
    return result
  }

  debounced.cancel = cancel
  debounced.flush = flush

  return debounced
}
