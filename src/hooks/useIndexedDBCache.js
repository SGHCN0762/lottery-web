import { ref } from 'vue';

export function useIndexedDBCache(dbName, dbVersion, storeName) {
  const DB_NAME = dbName;
  const DB_VERSION = dbVersion;
  const STORE_NAME = storeName;

  const cacheVersions = ref({});

  const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = event => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'category' });
          store.createIndex('version', 'version', { unique: false });
          store.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  };

  const readFromCache = async category => {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(category);

        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.warn('[IndexedDB Cache] 读取缓存失败:', error);
      return null;
    }
  };

  const writeToCache = async (category, data, version) => {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        const item = {
          category,
          data,
          version,
          timestamp: Date.now(),
        };

        const request = store.put(item);
        request.onsuccess = () => {
          cacheVersions.value[category] = version;
          resolve();
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.warn('[IndexedDB Cache] 写入缓存失败:', error);
    }
  };

  const checkFileVersion = async filePath => {
    try {
      const response = await fetch(filePath, { method: 'HEAD' });
      return response.headers.get('ETag') || response.headers.get('Last-Modified') || 'unknown';
    } catch (error) {
      console.warn('[IndexedDB Cache] 检查文件版本失败:', error);
      return 'unknown';
    }
  };

  const clearCategoryCache = async category => {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(category);

        request.onsuccess = () => {
          delete cacheVersions.value[category];
          resolve();
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.warn('[IndexedDB Cache] 清除缓存失败:', error);
    }
  };

  const clearAllCache = async () => {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.clear();

        request.onsuccess = () => {
          cacheVersions.value = {};
          resolve();
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.warn('[IndexedDB Cache] 清除所有缓存失败:', error);
    }
  };

  const getCacheStats = async () => {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.count();

        request.onsuccess = () => {
          resolve({
            cachedCategories: request.result,
            totalSize: '计算中...',
          });
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.warn('[IndexedDB Cache] 获取缓存统计失败:', error);
      return { cachedCategories: 0, totalSize: '未知' };
    }
  };

  const deleteDatabase = async () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase(DB_NAME);
      request.onsuccess = () => {
        cacheVersions.value = {};
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  };

  return {
    cacheVersions,
    openDB,
    readFromCache,
    writeToCache,
    checkFileVersion,
    clearCategoryCache,
    clearAllCache,
    getCacheStats,
    deleteDatabase,
  };
}
