import { isNil }  from './isNil';

/**
 * 检查值是否为空
 * @param {any} value - 要检查的值
 * @returns {boolean} 如果为空返回 true，否则返回 false
 */
export function isEmpty(value) {
  if (isNil(value)) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') {
    if (value instanceof Map || value instanceof Set) {
      return value.size === 0;
    }
    return Object.keys(value).length === 0;
  }
  return false;
}
