/**
 * 题库导入工具
 * 负责从JSON文件加载题库并导入到IndexedDB
 */

import { useDatabase } from '../hooks/useDatabase.js';
import { QUESTION_BANK, SETTING_KEYS, DEFAULT_SETTINGS } from './constants.js';

const database = useDatabase();

/**
 * 比较版本号
 * @param {String} v1 - 版本号1
 * @param {String} v2 - 版本号2
 * @returns {Number} 1: v1>v2, -1: v1<v2, 0: v1=v2
 */
function compareVersions(v1, v2) {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const p1 = parts1[i] || 0;
    const p2 = parts2[i] || 0;
    if (p1 > p2) return 1;
    if (p1 < p2) return -1;
  }
  return 0;
}

/**
 * 从URL加载JSON题库文件
 * @param {String} url - JSON文件URL
 * @returns {Promise<Object>} { version, questions, categories }
 */
export async function loadQuestionBank(url = QUESTION_BANK.JSON_URL) {
  try {
    const response = await fetch(url, {
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`加载题库失败: HTTP ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data || !Array.isArray(data.questions)) {
      throw new Error('题库文件格式错误');
    }
    
    return {
      version: data.version || '1.0.0',
      questions: data.questions,
      categories: data.categories || [],
    };
  } catch (error) {
    console.error('加载题库文件失败:', error);
    throw error;
  }
}

/**
 * 获取当前题库版本
 * @returns {Promise<String>}
 */
export async function getCurrentQuestionBankVersion() {
  try {
    const version = await database.getSetting(SETTING_KEYS.QUESTION_BANK_VERSION, null);
    return version;
  } catch (error) {
    console.error('获取题库版本失败:', error);
    return null;
  }
}

/**
 * 检查是否需要更新题库
 * @param {String} remoteVersion - 远程题库版本
 * @returns {Promise<Boolean>}
 */
export async function needsQuestionBankUpdate(remoteVersion) {
  const currentVersion = await getCurrentQuestionBankVersion();
  
  if (!currentVersion) {
    return true;
  }
  
  return compareVersions(remoteVersion, currentVersion) > 0;
}

/**
 * 初始化默认设置
 * @returns {Promise<void>}
 */
async function initializeDefaultSettings() {
  try {
    const settingsCount = await database.db.settings.count();
    if (settingsCount === 0) {
      const defaultSettingsEntries = Object.entries(DEFAULT_SETTINGS).map(([key, value]) => ({
        key,
        value,
      }));
      await database.db.settings.bulkAdd(defaultSettingsEntries);
    }
  } catch (error) {
    console.error('初始化默认设置失败:', error);
  }
}

/**
 * 保存题库版本信息
 * @param {String} version - 版本号
 * @returns {Promise<void>}
 */
async function saveQuestionBankVersion(version) {
  try {
    await database.saveSetting(SETTING_KEYS.QUESTION_BANK_VERSION, version);
    await database.saveSetting(SETTING_KEYS.QUESTION_BANK_LAST_UPDATE, new Date().toISOString());
  } catch (error) {
    console.error('保存题库版本失败:', error);
  }
}

/**
 * 导入题库到IndexedDB
 * @param {Array<Object>} questions - 题目数组
 * @param {Object} options - 导入选项
 * @param {Boolean} options.clearFirst - 是否先清空题库
 * @param {Boolean} options.skipDuplicates - 是否跳过重复
 * @param {Function} options.onProgress - 进度回调
 * @param {String} options.version - 题库版本
 * @returns {Promise<Object>} 导入结果
 */
export async function importQuestionBank(questions, options = {}) {
  const {
    clearFirst = false,
    skipDuplicates = true,
    onProgress = null,
    version = '1.0.0',
  } = options;
  
  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error('题库数据为空');
  }
  
  try {
    if (clearFirst) {
      await database.clearQuestions();
    }
    
    const result = await database.importQuestions(questions, {
      skipDuplicates,
      onProgress,
    });
    
    await saveQuestionBankVersion(version);
    await initializeDefaultSettings();
    
    return result;
  } catch (error) {
    console.error('导入题库失败:', error);
    throw error;
  }
}

/**
 * 从URL加载并导入题库
 * @param {Object} options - 选项
 * @param {String} options.url - JSON文件URL
 * @param {Boolean} options.clearFirst - 是否先清空题库
 * @param {Boolean} options.skipDuplicates - 是否跳过重复
 * @param {Function} options.onProgress - 进度回调
 * @param {Function} options.onLoadStart - 开始加载回调
 * @param {Function} options.onLoadComplete - 加载完成回调
 * @returns {Promise<Object>} 导入结果
 */
export async function loadAndImportQuestionBank(options = {}) {
  const {
    url = QUESTION_BANK.JSON_URL,
    clearFirst = false,
    skipDuplicates = true,
    onProgress = null,
    onLoadStart = null,
    onLoadComplete = null,
  } = options;
  
  if (onLoadStart && typeof onLoadStart === 'function') {
    onLoadStart();
  }
  
  const { version, questions } = await loadQuestionBank(url);
  
  if (onLoadComplete && typeof onLoadComplete === 'function') {
    onLoadComplete(questions.length, version);
  }
  
  const result = await importQuestionBank(questions, {
    clearFirst,
    skipDuplicates,
    onProgress,
    version,
  });
  
  return {
    ...result,
    version,
  };
}

/**
 * 检查并自动导入题库（应用启动时调用）
 * @param {Function} onProgress - 进度回调
 * @returns {Promise<Object|null>} 如果执行了导入则返回结果，否则返回null
 */
export async function autoImportQuestionBank(onProgress = null) {
  try {
    const { version: remoteVersion, questions } = await loadQuestionBank();
    
    const needsUpdate = await needsQuestionBankUpdate(remoteVersion);
    const isEmpty = await database.isDatabaseEmpty();
    
    if (isEmpty || needsUpdate) {
      const result = await importQuestionBank(questions, {
        clearFirst: needsUpdate && !isEmpty,
        skipDuplicates: !needsUpdate,
        onProgress,
        version: remoteVersion,
      });
      
      return {
        ...result,
        version: remoteVersion,
        isNewInstall: isEmpty,
        isUpdate: needsUpdate && !isEmpty,
      };
    }
    
    return null;
  } catch (error) {
    console.error('自动导入题库失败:', error);
    await initializeDefaultSettings();
    throw error;
  }
}

export default {
  loadQuestionBank,
  getCurrentQuestionBankVersion,
  needsQuestionBankUpdate,
  importQuestionBank,
  loadAndImportQuestionBank,
  autoImportQuestionBank,
};
