const DB_NAME = 'ResumeDB';
const DB_VERSION = 1;
const STORE_NAME = 'resumeStore';

let db = null;

const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };
  });
};

const getDB = async () => {
  if (!db) await initDB();
  return db;
};

export const setItem = async (key, value) => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put({ key, value: JSON.stringify(value) });
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getItem = async (key) => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(key);
    request.onsuccess = () => {
      const result = request.result;
      resolve(result ? JSON.parse(result.value) : null);
    };
    request.onerror = () => reject(request.error);
  });
};

export const removeItem = async (key) => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
