import { safeJsonParse, safeJsonStringify } from './json.js';

// 不同storage类型的封装，方便后续替换为其他storage类型
const storage = localStorage;

export function getStorage(key) {
  const value = storage.getItem(key);
  return value ? safeJsonParse(value) : null;
}

export function setStorage(key, value, expires = null) {
  storage.setItem(key, safeJsonStringify(value));
  if (expires) {
    const expireTime = Date.now() + expires;
    storage.setItem(key + '_expire', expireTime);
  }
}

export function removeStorage(key) {
  storage.removeItem(key);
  storage.removeItem(key + '_expire');
}

export function clearStorage() {
  storage.clear();
}
