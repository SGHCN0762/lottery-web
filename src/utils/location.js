import { STORAGE_KEYS } from '@/constants/storage.js';
import {  getStorage, setStorage } from '@/utils/storage.js';

// 默认北京位置
export const DEFAULT_LOCATION = {
  latitude: 39.9042,
  longitude: 116.4074,
  accuracy: 0,
};

/**
 * 获取用户位置
 * @returns {Promise<Object>} 用户位置对象
 */
export async function getLocation() {
  try {
    const gpsLocation = await getLocationByGPS();
    if (gpsLocation) {
      // 设置7天过期
      await saveCacheLocation(gpsLocation);
      return gpsLocation;
    }

    const cacheLocation = await getCacheLocation();
    if (cacheLocation) {
      return cacheLocation;
    }

    return DEFAULT_LOCATION;
  } catch (error) {
    console.error('获取定位失败:', error);
    return DEFAULT_LOCATION;
  }
}

/**
 * 获取缓存中的用户位置
 * @returns {Promise<Object>} 用户位置对象
 * */
export async function getCacheLocation() { 
  // 从缓存中获取位置，过期则返回null
  const location = await getStorage(STORAGE_KEYS.LOCATION);
  return location;
}

/**
 * 保存用户位置到缓存中
 * @param {*} location 
 */
export async function saveCacheLocation(location) { 
  setStorage(STORAGE_KEYS.LOCATION, location);
}

/**
 * 清除缓存中的用户位置
 */
export async function clearCacheLocation() { 
  removeStorage(STORAGE_KEYS.LOCATION);
}

/**
 * 获取用户GPS位置信息
 */
export async function getLocationByGPS(options = {}) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('您的浏览器不支持地理定位'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      error => {
        let errorMessage = '获取位置失败';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = '您拒绝了位置权限请求';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = '位置信息不可用';
            break;
          case error.TIMEOUT:
            errorMessage = '获取位置超时';
            break;
          case error.UNKNOWN_ERROR:
            errorMessage = '未知错误';
            break;
        }
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: options.enableHighAccuracy || false,
        timeout: options.timeout || 8000,
        maximumAge: options.maximumAge || 300000,
      }
    );
  });
}
