/**
 * 节流函数（复刻 lodash.throttle）
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 时间限制（毫秒）
 * @param {Object} options - 选项对象
 * @param {boolean} options.leading - 是否在节流开始前执行
 * @param {boolean} options.trailing - 是否在节流结束后执行
 * @returns {Function} 节流后的函数
 */
export function throttle(func, wait, options = {}) {
  let lastArgs;
  let lastThis;
  let result;
  let timerId;
  let lastInvokeTime = 0;

  const { leading = true, trailing = true } = options;

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }

  wait = Number(wait) || 0;

  function invokeFunc(time) {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    if (leading) {
      return invokeFunc(time);
    }
    return result;
  }

  function remainingWait(time) {
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastInvoke;
    return timeWaiting;
  }

  function shouldInvoke(time) {
    const timeSinceLastInvoke = time - lastInvokeTime;
    return lastInvokeTime === undefined || timeSinceLastInvoke >= wait || timeSinceLastInvoke < 0;
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastThis = timerId = undefined;
  }

  function flush() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    return invokeFunc(Date.now());
  }

  function throttled(...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    lastThis = this;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(time);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }

  throttled.cancel = cancel;
  throttled.flush = flush;

  return throttled;
}
