/**
 * 公考备考助手数据库封装
 * 使用 Dexie.js 封装 IndexedDB 操作
 */

import Dexie from 'dexie';
import { DB_NAME, DB_VERSION, TABLES, DEFAULT_SETTINGS, QUESTION_BANK } from '../utils/constants';
import { generateId, formatDate } from '../utils/helpers';

/**
 * 数据库类定义
 */
class ExamPrepDatabase extends Dexie {
  constructor() {
    super(DB_NAME);
    
    // 定义数据库版本和表结构
    this.version(DB_VERSION).stores({
      // 题库表：id为主键，category和subcategory为索引
      questions: 'id, category, subcategory, difficulty, *tags',
      // 做题记录表：id为主键，questionId、category、createdAt为索引
      records: 'id, questionId, category, isCorrect, createdAt',
      // 收藏夹表：id为主键，questionId、createdAt为索引
      collections: 'id, questionId, createdAt',
      // 笔记表：id为主键，questionId、createdAt为索引
      notes: 'id, questionId, type, createdAt',
      // 用户设置表：key为主键
      settings: 'key',
      // 模考记录表：id为主键，createdAt为索引
      examRecords: 'id, type, createdAt'
    });
    
    // 绑定表到实例
    this.questions = this.table('questions');
    this.records = this.table('records');
    this.collections = this.table('collections');
    this.notes = this.table('notes');
    this.settings = this.table('settings');
    this.examRecords = this.table('examRecords');
  }
}

// 数据库单例实例
let dbInstance = null;

/**
 * 获取数据库实例（单例模式）
 * @returns {ExamPrepDatabase}
 */
function getDatabase() {
  if (!dbInstance) {
    dbInstance = new ExamPrepDatabase();
  }
  return dbInstance;
}

/**
 * 数据库操作 Hook
 * 提供所有数据库操作的封装方法
 */
export function useDatabase() {
  const db = getDatabase();
  
  // ==================== 初始化操作 ====================
  
  /**
   * 初始化数据库
   * 首次打开应用时从JSON文件加载题库和默认设置
   * @returns {Promise<Boolean>} 是否初始化成功
   */
  async function initializeDatabase() {
    try {
      // 检查题库是否为空，如果为空则从JSON文件加载
      const questionCount = await db.questions.count();
      
      if (questionCount === 0) {
        // 从public/questions.json加载题库
        try {
          const response = await fetch(import.meta.env.BASE_URL + 'questions.json', { cache: 'no-cache' });
          if (response.ok) {
            const data = await response.json();
            if (data.questions && Array.isArray(data.questions)) {
              await db.questions.bulkAdd(data.questions);
              console.log(`成功从JSON加载 ${data.questions.length} 道题目`);
            }
          }
        } catch (fetchError) {
          console.warn('从JSON加载题库失败:', fetchError);
        }
      }
      
      // 写入默认设置（如果不存在）
      const settingsCount = await db.settings.count();
      if (settingsCount === 0) {
        const defaultSettingsEntries = Object.entries(DEFAULT_SETTINGS).map(([key, value]) => ({
          key,
          value
        }));
        await db.settings.bulkAdd(defaultSettingsEntries);
      }
      
      return true;
    } catch (error) {
      console.error('初始化数据库失败:', error);
      throw error;
    }
  }
  
  /**
   * 检查数据库是否为空
   * @returns {Promise<Boolean>}
   */
  async function isDatabaseEmpty() {
    const count = await db.questions.count();
    return count === 0;
  }
  
  // ==================== 题库操作 ====================
  
  /**
   * 获取所有题目
   * @param {Object} options - 查询选项
   * @returns {Promise<Array>}
   */
  async function getAllQuestions(options = {}) {
    const { category, subcategory, difficulty, limit, offset = 0 } = options;
    
    let collection = db.questions.toCollection();
    
    // 按分类筛选
    if (category) {
      collection = db.questions.where('category').equals(category);
    }
    
    let questions = await collection.toArray();
    
    // 按子分类筛选
    if (subcategory) {
      questions = questions.filter(q => q.subcategory === subcategory);
    }
    
    // 按难度筛选
    if (difficulty) {
      questions = questions.filter(q => q.difficulty === difficulty);
    }
    
    // 分页
    if (offset > 0) {
      questions = questions.slice(offset);
    }
    if (limit) {
      questions = questions.slice(0, limit);
    }
    
    return questions;
  }

  /**
   * 获取随机题目
   * @param {Number} count - 题目数量
   * @param {String} category - 分类（可选）
   * @returns {Promise<Array>}
   */
  async function getRandomQuestions(count, category) {
    let questions = category
      ? await db.questions.where('category').equals(category).toArray()
      : await db.questions.toArray();

    // Fisher-Yates 洗牌算法
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }

    return questions.slice(0, count);
  }

  /**
   * 获取顺序题目
   * @param {Number} count - 题目数量
   * @param {Number} offset - 起始偏移
   * @param {String} category - 分类（可选）
   * @returns {Promise<Array>}
   */
  async function getSequentialQuestions(count, offset = 0, category) {
    const options = {
      limit: count,
      offset: offset
    };
    if (category) {
      options.category = category;
    }
    return await getAllQuestions(options);
  }

  /**
   * 根据ID获取题目
   * @param {String} id - 题目ID
   * @returns {Promise<Object|null>}
   */
  async function getQuestionById(id) {
    return await db.questions.get(id);
  }
  
  /**
   * 批量获取题目
   * @param {Array<String>} ids - 题目ID数组
   * @returns {Promise<Array>}
   */
  async function getQuestionsByIds(ids) {
    return await db.questions.where('id').anyOf(ids).toArray();
  }
  
  /**
   * 添加题目
   * @param {Object} question - 题目对象
   * @returns {Promise<String>} 题目ID
   */
  async function addQuestion(question) {
    const id = question.id || generateId('q-');
    await db.questions.add({ ...question, id });
    return id;
  }
  
  /**
   * 批量添加题目
   * @param {Array<Object>} questions - 题目数组
   * @returns {Promise<Number>} 添加数量
   */
  async function addQuestions(questions) {
    const questionsWithId = questions.map(q => ({
      ...q,
      id: q.id || generateId('q-')
    }));
    await db.questions.bulkAdd(questionsWithId);
    return questionsWithId.length;
  }
  
  /**
   * 更新题目
   * @param {String} id - 题目ID
   * @param {Object} updates - 更新内容
   * @returns {Promise<Number>} 更新数量
   */
  async function updateQuestion(id, updates) {
    return await db.questions.update(id, updates);
  }
  
  /**
   * 删除题目
   * @param {String} id - 题目ID
   * @returns {Promise<void>}
   */
  async function deleteQuestion(id) {
    await db.questions.delete(id);
  }
  
  /**
   * 批量删除题目
   * @param {Array<String>} ids - 题目ID数组
   * @returns {Promise<void>}
   */
  async function deleteQuestions(ids) {
    await db.questions.bulkDelete(ids);
  }
  
  /**
   * 清空题库
   * @returns {Promise<void>}
   */
  async function clearQuestions() {
    await db.questions.clear();
  }
  
  /**
   * 批量导入题目
   * @param {Array<Object>} questions - 题目数组
   * @param {Object} options - 导入选项
   * @param {Boolean} options.skipDuplicates - 是否跳过重复（默认true）
   * @param {Function} options.onProgress - 进度回调函数(progress, current, total)
   * @param {Number} options.batchSize - 每批导入数量
   * @returns {Promise<Object>} { addedCount, skippedCount, total }
   */
  async function importQuestions(questions, options = {}) {
    const { 
      skipDuplicates = true, 
      onProgress = null,
      batchSize = QUESTION_BANK.BATCH_SIZE 
    } = options;
    
    if (!Array.isArray(questions)) {
      throw new Error('导入数据必须是题目数组');
    }
    
    const total = questions.length;
    let addedCount = 0;
    let skippedCount = 0;
    
    for (let i = 0; i < total; i += batchSize) {
      const batch = questions.slice(i, i + batchSize);
      const batchResults = await db.transaction('rw', db.questions, async () => {
        let batchAdded = 0;
        let batchSkipped = 0;
        
        for (const question of batch) {
          const id = question.id || generateId('q-');
          
          if (skipDuplicates) {
            const existing = await db.questions.get(id);
            if (existing) {
              batchSkipped++;
              continue;
            }
          }
          
          await db.questions.put({ ...question, id });
          batchAdded++;
        }
        
        return { batchAdded, batchSkipped };
      });
      
      addedCount += batchResults.batchAdded;
      skippedCount += batchResults.batchSkipped;
      
      if (onProgress && typeof onProgress === 'function') {
        const current = Math.min(i + batchSize, total);
        const progress = Math.round((current / total) * 100);
        onProgress(progress, current, total);
      }
      
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    
    return { addedCount, skippedCount, total };
  }
  
  /**
   * 获取题目统计
   * @returns {Promise<Object>}
   */
  async function getQuestionStats() {
    const total = await db.questions.count();
    const categories = {};
    
    const allQs = await db.questions.toArray();
    allQs.forEach(q => {
      if (!categories[q.category]) {
        categories[q.category] = 0;
      }
      categories[q.category]++;
    });
    
    const difficulties = { easy: 0, medium: 0, hard: 0 };
    allQs.forEach(q => {
      if (difficulties.hasOwnProperty(q.difficulty)) {
        difficulties[q.difficulty]++;
      }
    });
    
    return { total, categories, difficulties };
  }
  
  // ==================== 做题记录操作 ====================
  
  /**
   * 添加做题记录
   * @param {Object} record - 记录对象
   * @returns {Promise<String>} 记录ID
   */
  async function addRecord(record) {
    const id = generateId('r-');
    const createdAt = new Date();
    await db.records.add({
      ...record,
      id,
      createdAt
    });
    return id;
  }
  
  /**
   * 批量添加做题记录
   * @param {Array<Object>} records - 记录数组
   * @returns {Promise<Number>} 添加数量
   */
  async function addRecords(records) {
    const recordsWithMeta = records.map(r => ({
      ...r,
      id: generateId('r-'),
      createdAt: new Date()
    }));
    await db.records.bulkAdd(recordsWithMeta);
    return recordsWithMeta.length;
  }

  /**
   * 添加学习记录（addRecords的别名）
   * @param {Array<Object>} records - 记录数组
   * @returns {Promise<Number>} 添加数量
   */
  async function addStudyRecords(records) {
    return await addRecords(records);
  }

  /**
   * 获取指定题目的做题记录
   * @param {String} questionId - 题目ID
   * @returns {Promise<Array>}
   */
  async function getRecordsByQuestionId(questionId) {
    return await db.records.where('questionId').equals(questionId).toArray();
  }
  
  /**
   * 获取所有做题记录
   * @param {Object} options - 查询选项
   * @returns {Promise<Array>}
   */
  async function getAllRecords(options = {}) {
    const { category, isCorrect, startDate, endDate, limit, offset = 0 } = options;
    
    let records = await db.records.orderBy('createdAt').reverse().toArray();
    
    // 按分类筛选
    if (category) {
      records = records.filter(r => r.category === category);
    }
    
    // 按正确性筛选
    if (isCorrect !== undefined) {
      records = records.filter(r => r.isCorrect === isCorrect);
    }
    
    // 按日期范围筛选
    if (startDate) {
      records = records.filter(r => new Date(r.createdAt) >= new Date(startDate));
    }
    if (endDate) {
      records = records.filter(r => new Date(r.createdAt) <= new Date(endDate));
    }
    
    // 分页
    if (offset > 0) {
      records = records.slice(offset);
    }
    if (limit) {
      records = records.slice(0, limit);
    }
    
    return records;
  }
  
  /**
   * 获取错题记录
   * @param {Object} options - 查询选项
   * @returns {Promise<Array>}
   */
  async function getWrongRecords(options = {}) {
    return await getAllRecords({ ...options, isCorrect: false });
  }
  
  /**
   * 获取错题列表（去重）
   * @param {Object} options - 查询选项
   * @returns {Promise<Array>}
   */
  async function getWrongQuestions(options = {}) {
    const wrongRecords = await getWrongRecords(options);
    const questionIds = [...new Set(wrongRecords.map(r => r.questionId))];
    return await getQuestionsByIds(questionIds);
  }
  
  /**
   * 删除做题记录
   * @param {String} id - 记录ID
   * @returns {Promise<void>}
   */
  async function deleteRecord(id) {
    await db.records.delete(id);
  }
  
  /**
   * 清空所有做题记录
   * @returns {Promise<void>}
   */
  async function clearAllRecords() {
    await db.records.clear();
  }
  
  /**
   * 获取做题记录统计
   * @param {Object} options - 统计选项
   * @returns {Promise<Object>}
   */
  async function getRecordStats(options = {}) {
    const records = await getAllRecords(options);
    const total = records.length;
    const correct = records.filter(r => r.isCorrect).length;
    const wrong = total - correct;
    const accuracy = total > 0 ? ((correct / total) * 100).toFixed(1) : '0.0';
    
    // 按分类统计
    const byCategory = {};
    const categoryIds = ['verbal', 'logic', 'math', 'data', 'common'];
    categoryIds.forEach(cat => {
      const catRecords = records.filter(r => r.category === cat);
      byCategory[cat] = {
        total: catRecords.length,
        correct: catRecords.filter(r => r.isCorrect).length,
        wrong: catRecords.filter(r => !r.isCorrect).length,
        accuracy: catRecords.length > 0 
          ? ((catRecords.filter(r => r.isCorrect).length / catRecords.length) * 100).toFixed(1) 
          : '0.0'
      };
    });
    
    return { total, correct, wrong, accuracy, byCategory };
  }
  
  // ==================== 收藏夹操作 ====================
  
  /**
   * 添加收藏
   * @param {String} questionId - 题目ID
   * @param {String} note - 收藏备注（可选）
   * @returns {Promise<String>} 收藏ID
   */
  async function addCollection(questionId, note = '') {
    // 检查是否已收藏
    const existing = await db.collections.where('questionId').equals(questionId).first();
    if (existing) {
      return existing.id;
    }
    
    const id = generateId('c-');
    const createdAt = new Date();
    
    // 获取题目信息
    const question = await getQuestionById(questionId);
    
    await db.collections.add({
      id,
      questionId,
      note,
      category: question?.category,
      createdAt
    });
    return id;
  }
  
  /**
   * 取消收藏
   * @param {String} questionId - 题目ID
   * @returns {Promise<void>}
   */
  async function removeCollection(questionId) {
    const collection = await db.collections.where('questionId').equals(questionId).first();
    if (collection) {
      await db.collections.delete(collection.id);
    }
  }
  
  /**
   * 检查是否已收藏
   * @param {String} questionId - 题目ID
   * @returns {Promise<Boolean>}
   */
  async function isCollected(questionId) {
    const collection = await db.collections.where('questionId').equals(questionId).first();
    return !!collection;
  }

  /**
   * 检查题目是否已收藏（isCollected的别名）
   * @param {String} questionId - 题目ID
   * @returns {Promise<Boolean>}
   */
  async function isQuestionCollected(questionId) {
    return await isCollected(questionId);
  }

  /**
   * 获取所有收藏
   * @param {Object} options - 查询选项
   * @returns {Promise<Array>}
   */
  async function getAllCollections(options = {}) {
    const { category, limit, offset = 0 } = options;
    
    let collections = await db.collections.orderBy('createdAt').reverse().toArray();
    
    // 按分类筛选
    if (category) {
      collections = collections.filter(c => c.category === category);
    }
    
    // 分页
    if (offset > 0) {
      collections = collections.slice(offset);
    }
    if (limit) {
      collections = collections.slice(0, limit);
    }
    
    return collections;
  }
  
  /**
   * 获取收藏的题目列表
   * @param {Object} options - 查询选项
   * @returns {Promise<Array>}
   */
  async function getCollectedQuestions(options = {}) {
    const collections = await getAllCollections(options);
    const questionIds = collections.map(c => c.questionId);
    const questions = await getQuestionsByIds(questionIds);
    
    // 保持收藏顺序
    return collections.map(c => questions.find(q => q.id === c.questionId)).filter(Boolean);
  }
  
  /**
   * 更新收藏备注
   * @param {String} questionId - 题目ID
   * @param {String} note - 备注内容
   * @returns {Promise<Number>}
   */
  async function updateCollectionNote(questionId, note) {
    const collection = await db.collections.where('questionId').equals(questionId).first();
    if (collection) {
      return await db.collections.update(collection.id, { note });
    }
    return 0;
  }
  
  /**
   * 获取收藏统计
   * @returns {Promise<Object>}
   */
  async function getCollectionStats() {
    const total = await db.collections.count();
    const collections = await db.collections.toArray();
    
    const byCategory = {};
    collections.forEach(c => {
      if (!byCategory[c.category]) {
        byCategory[c.category] = 0;
      }
      byCategory[c.category]++;
    });
    
    return { total, byCategory };
  }
  
  // ==================== 笔记操作 ====================
  
  /**
   * 添加笔记
   * @param {Object} note - 笔记对象
   * @returns {Promise<String>} 笔记ID
   */
  async function addNote(note) {
    const id = generateId('n-');
    const createdAt = new Date();
    await db.notes.add({
      ...note,
      id,
      createdAt,
      updatedAt: createdAt
    });
    return id;
  }
  
  /**
   * 获取指定题目的笔记
   * @param {String} questionId - 题目ID
   * @returns {Promise<Array>}
   */
  async function getNotesByQuestionId(questionId) {
    return await db.notes.where('questionId').equals(questionId).toArray();
  }
  
  /**
   * 获取所有笔记
   * @param {Object} options - 查询选项
   * @returns {Promise<Array>}
   */
  async function getAllNotes(options = {}) {
    const { type, limit, offset = 0 } = options;
    
    let notes = await db.notes.orderBy('createdAt').reverse().toArray();
    
    // 按类型筛选
    if (type) {
      notes = notes.filter(n => n.type === type);
    }
    
    // 分页
    if (offset > 0) {
      notes = notes.slice(offset);
    }
    if (limit) {
      notes = notes.slice(0, limit);
    }
    
    return notes;
  }
  
  /**
   * 更新笔记
   * @param {String} id - 笔记ID
   * @param {Object} updates - 更新内容
   * @returns {Promise<Number>}
   */
  async function updateNote(id, updates) {
    return await db.notes.update(id, {
      ...updates,
      updatedAt: new Date()
    });
  }
  
  /**
   * 删除笔记
   * @param {String} id - 笔记ID
   * @returns {Promise<void>}
   */
  async function deleteNote(id) {
    await db.notes.delete(id);
  }
  
  // ==================== 用户设置操作 ====================
  
  /**
   * 获取单个设置
   * @param {String} key - 设置键名
   * @param {Any} defaultValue - 默认值
   * @returns {Promise<Any>}
   */
  async function getSetting(key, defaultValue = null) {
    const setting = await db.settings.get(key);
    return setting ? setting.value : defaultValue;
  }
  
  /**
   * 获取所有设置
   * @returns {Promise<Object>}
   */
  async function getAllSettings() {
    const settings = await db.settings.toArray();
    const result = {};
    settings.forEach(s => {
      result[s.key] = s.value;
    });
    return { ...DEFAULT_SETTINGS, ...result };
  }
  
  /**
   * 保存设置
   * @param {String} key - 设置键名
   * @param {Any} value - 设置值
   * @returns {Promise<void>}
   */
  async function saveSetting(key, value) {
    await db.settings.put({ key, value });
  }
  
  /**
   * 批量保存设置
   * @param {Object} settings - 设置对象
   * @returns {Promise<void>}
   */
  async function saveSettings(settings) {
    const entries = Object.entries(settings).map(([key, value]) => ({ key, value }));
    await db.settings.bulkPut(entries);
  }
  
  /**
   * 重置设置为默认值
   * @returns {Promise<void>}
   */
  async function resetSettings() {
    await db.settings.clear();
    const defaultSettingsEntries = Object.entries(DEFAULT_SETTINGS).map(([key, value]) => ({
      key,
      value
    }));
    await db.settings.bulkAdd(defaultSettingsEntries);
  }
  
  // ==================== 模考记录操作 ====================
  
  /**
   * 添加模考记录
   * @param {Object} examRecord - 模考记录对象
   * @returns {Promise<String>} 记录ID
   */
  async function addExamRecord(examRecord) {
    const id = generateId('e-');
    const createdAt = new Date();
    await db.examRecords.add({
      ...examRecord,
      id,
      createdAt
    });
    return id;
  }
  
  /**
   * 获取模考记录
   * @param {String} id - 记录ID
   * @returns {Promise<Object|null>}
   */
  async function getExamRecordById(id) {
    return await db.examRecords.get(id);
  }
  
  /**
   * 获取所有模考记录
   * @param {Object} options - 查询选项
   * @returns {Promise<Array>}
   */
  async function getAllExamRecords(options = {}) {
    const { type, limit, offset = 0 } = options;
    
    let records = await db.examRecords.orderBy('createdAt').reverse().toArray();
    
    // 按类型筛选
    if (type) {
      records = records.filter(r => r.type === type);
    }
    
    // 分页
    if (offset > 0) {
      records = records.slice(offset);
    }
    if (limit) {
      records = records.slice(0, limit);
    }
    
    return records;
  }
  
  /**
   * 更新模考记录
   * @param {String} id - 记录ID
   * @param {Object} updates - 更新内容
   * @returns {Promise<Number>}
   */
  async function updateExamRecord(id, updates) {
    return await db.examRecords.update(id, updates);
  }
  
  /**
   * 删除模考记录
   * @param {String} id - 记录ID
   * @returns {Promise<void>}
   */
  async function deleteExamRecord(id) {
    await db.examRecords.delete(id);
  }
  
  /**
   * 获取模考统计
   * @returns {Promise<Object>}
   */
  async function getExamStats() {
    const records = await db.examRecords.toArray();
    const total = records.length;
    const avgScore = records.length > 0 
      ? (records.reduce((sum, r) => sum + (r.score || 0), 0) / records.length).toFixed(1)
      : '0.0';
    const maxScore = records.length > 0 
      ? Math.max(...records.map(r => r.score || 0))
      : 0;
    const minScore = records.length > 0 
      ? Math.min(...records.map(r => r.score || 0))
      : 0;
    
    // 按类型统计
    const byType = {};
    const types = ['mock', 'daily', 'special'];
    types.forEach(type => {
      const typeRecords = records.filter(r => r.type === type);
      byType[type] = {
        total: typeRecords.length,
        avgScore: typeRecords.length > 0 
          ? (typeRecords.reduce((sum, r) => sum + (r.score || 0), 0) / typeRecords.length).toFixed(1)
          : '0.0'
      };
    });
    
    return { total, avgScore, maxScore, minScore, byType };
  }
  
  // ==================== 数据导入导出 ====================
  
  /**
   * 导出题库
   * @param {Object} options - 导出选项
   * @returns {Promise<Object>}
   */
  async function exportQuestions(options = {}) {
    const questions = await getAllQuestions(options);
    return {
      version: DB_VERSION,
      exportDate: new Date().toISOString(),
      type: 'questions',
      data: questions
    };
  }
  
  /**
   * 导出所有数据
   * @returns {Promise<Object>}
   */
  async function exportAllData() {
    const questions = await db.questions.toArray();
    const records = await db.records.toArray();
    const collections = await db.collections.toArray();
    const notes = await db.notes.toArray();
    const settings = await getAllSettings();
    const examRecords = await db.examRecords.toArray();
    
    return {
      version: DB_VERSION,
      exportDate: new Date().toISOString(),
      type: 'full',
      data: {
        questions,
        records,
        collections,
        notes,
        settings,
        examRecords
      }
    };
  }
  
  /**
   * 导入所有数据
   * @param {Object} data - 导入数据
   * @param {Object} options - 导入选项
   * @returns {Promise<Object>}
   */
  async function importAllData(data, options = {}) {
    const { overwrite = false } = options;
    
    if (!data || !data.data) {
      throw new Error('无效的导入数据格式');
    }
    
    const result = {
      questions: { added: 0, skipped: 0 },
      records: { added: 0, skipped: 0 },
      collections: { added: 0, skipped: 0 },
      notes: { added: 0, skipped: 0 },
      settings: { added: 0, skipped: 0 },
      examRecords: { added: 0, skipped: 0 }
    };
    
    // 如果选择覆盖，先清空现有数据
    if (overwrite) {
      await db.questions.clear();
      await db.records.clear();
      await db.collections.clear();
      await db.notes.clear();
      await db.settings.clear();
      await db.examRecords.clear();
    }
    
    // 导入题目
    if (data.data.questions) {
      for (const question of data.data.questions) {
        if (overwrite) {
          await db.questions.add(question);
          result.questions.added++;
        } else {
          const existing = await db.questions.get(question.id);
          if (!existing) {
            await db.questions.add(question);
            result.questions.added++;
          } else {
            result.questions.skipped++;
          }
        }
      }
    }
    
    // 导入做题记录
    if (data.data.records) {
      for (const record of data.data.records) {
        if (overwrite) {
          await db.records.add(record);
          result.records.added++;
        } else {
          const existing = await db.records.get(record.id);
          if (!existing) {
            await db.records.add(record);
            result.records.added++;
          } else {
            result.records.skipped++;
          }
        }
      }
    }
    
    // 导入收藏
    if (data.data.collections) {
      for (const collection of data.data.collections) {
        if (overwrite) {
          await db.collections.add(collection);
          result.collections.added++;
        } else {
          const existing = await db.collections.get(collection.id);
          if (!existing) {
            await db.collections.add(collection);
            result.collections.added++;
          } else {
            result.collections.skipped++;
          }
        }
      }
    }
    
    // 导入笔记
    if (data.data.notes) {
      for (const note of data.data.notes) {
        if (overwrite) {
          await db.notes.add(note);
          result.notes.added++;
        } else {
          const existing = await db.notes.get(note.id);
          if (!existing) {
            await db.notes.add(note);
            result.notes.added++;
          } else {
            result.notes.skipped++;
          }
        }
      }
    }
    
    // 导入设置
    if (data.data.settings) {
      await saveSettings(data.data.settings);
      result.settings.added = Object.keys(data.data.settings).length;
    }
    
    // 导入模考记录
    if (data.data.examRecords) {
      for (const examRecord of data.data.examRecords) {
        if (overwrite) {
          await db.examRecords.add(examRecord);
          result.examRecords.added++;
        } else {
          const existing = await db.examRecords.get(examRecord.id);
          if (!existing) {
            await db.examRecords.add(examRecord);
            result.examRecords.added++;
          } else {
            result.examRecords.skipped++;
          }
        }
      }
    }
    
    return result;
  }
  
  // ==================== 数据备份恢复 ====================
  
  /**
   * 创建数据备份
   * @returns {Promise<Object>}
   */
  async function createBackup() {
    const data = await exportAllData();
    return {
      ...data,
      backupDate: new Date().toISOString(),
      backupVersion: '1.0'
    };
  }
  
  /**
   * 恢复数据备份
   * @param {Object} backupData - 备份数据
   * @returns {Promise<Object>}
   */
  async function restoreBackup(backupData) {
    // 验证备份数据格式
    if (!backupData || !backupData.data) {
      throw new Error('无效的备份数据格式');
    }
    
    // 使用覆盖模式导入数据
    return await importAllData(backupData, { overwrite: true });
  }
  
  /**
   * 导出备份为JSON文件
   * @param {String} filename - 文件名（可选）
   * @returns {Promise<void>}
   */
  async function downloadBackup(filename) {
    const backup = await createBackup();
    const json = JSON.stringify(backup, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `exam-prep-backup-${formatDate(new Date(), 'YYYY-MM-DD-HHmmss')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  
  /**
   * 从JSON文件恢复备份
   * @param {File} file - JSON文件
   * @returns {Promise<Object>}
   */
  async function restoreFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = JSON.parse(e.target.result);
          const result = await restoreBackup(data);
          resolve(result);
        } catch (error) {
          reject(new Error('解析备份文件失败: ' + error.message));
        }
      };
      reader.onerror = () => reject(new Error('读取文件失败'));
      reader.readAsText(file);
    });
  }
  
  // ==================== 统计查询 ====================
  
  /**
   * 获取综合统计
   * @param {Object} options - 统计选项
   * @returns {Promise<Object>}
   */
  async function getStatistics(options = {}) {
    const questionStats = await getQuestionStats();
    const recordStats = await getRecordStats(options);
    const collectionStats = await getCollectionStats();
    const examStats = await getExamStats();
    
    return {
      questions: questionStats,
      records: recordStats,
      collections: collectionStats,
      exams: examStats
    };
  }
  
  /**
   * 获取主页展示的统计数据（扁平结构）
   * @returns {Promise<Object>}
   */
  async function getHomeStatistics() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const todayRecords = await getAllRecords({
      startDate: today,
      endDate: tomorrow
    });
    const allRecords = await getAllRecords();
    
    const todayCount = todayRecords.length;
    const todayCorrect = todayRecords.filter(r => r.isCorrect).length;
    const todayAccuracy = todayCount > 0 
      ? Math.round((todayCorrect / todayCount) * 100) 
      : 0;
    
    const totalCount = allRecords.length;
    const totalCorrect = allRecords.filter(r => r.isCorrect).length;
    const totalAccuracy = totalCount > 0 
      ? Math.round((totalCorrect / totalCount) * 100) 
      : 0;
    
    const wrongRecords = await getWrongRecords();
    const wrongQuestionIds = new Set(wrongRecords.map(r => r.questionId));
    const wrongCount = wrongQuestionIds.size;
    
    const collections = await getAllCollections();
    const collectionCount = collections.length;
    
    const questionStats = await getQuestionStats();
    
    return {
      todayCount,
      todayAccuracy,
      totalCount,
      totalAccuracy,
      wrongCount,
      collectionCount,
      totalQuestions: questionStats.total,
      categories: questionStats.categories
    };
  }
  
  /**
   * 获取今日统计
   * @returns {Promise<Object>}
   */
  async function getTodayStatistics() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return await getStatistics({
      startDate: today,
      endDate: tomorrow
    });
  }
  
  /**
   * 获取最近N天统计
   * @param {Number} days - 天数
   * @returns {Promise<Object>}
   */
  async function getRecentStatistics(days = 7) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    return await getStatistics({
      startDate,
      endDate
    });
  }
  
  /**
   * 获取错题统计
   * @returns {Promise<Object>}
   */
  async function getWrongQuestionStats() {
    const wrongQuestions = await getWrongQuestions();
    const total = wrongQuestions.length;
    
    const byCategory = {};
    wrongQuestions.forEach(q => {
      if (!byCategory[q.category]) {
        byCategory[q.category] = 0;
      }
      byCategory[q.category]++;
    });
    
    const byDifficulty = { easy: 0, medium: 0, hard: 0 };
    wrongQuestions.forEach(q => {
      if (byDifficulty.hasOwnProperty(q.difficulty)) {
        byDifficulty[q.difficulty]++;
      }
    });
    
    return { total, byCategory, byDifficulty };
  }
  
  /**
   * 获取学习进度
   * @returns {Promise<Object>}
   */
  async function getStudyProgress() {
    const totalQuestions = await db.questions.count();
    const allRecords = await db.records.toArray();
    const uniqueQuestionIds = new Set(allRecords.map(r => r.questionId));
    const practicedQuestions = uniqueQuestionIds.size;
    
    const correctRecords = allRecords.filter(r => r.isCorrect);
    const uniqueCorrectIds = new Set(correctRecords.map(r => r.questionId));
    const masteredQuestions = uniqueCorrectIds.size;
    
    const progress = totalQuestions > 0 
      ? ((practicedQuestions / totalQuestions) * 100).toFixed(1)
      : '0.0';
    
    return {
      totalQuestions,
      practicedQuestions,
      masteredQuestions,
      unpracticedQuestions: totalQuestions - practicedQuestions,
      progress
    };
  }
  
  // ==================== 数据库维护 ====================
  
  /**
   * 清空所有数据
   * @returns {Promise<void>}
   */
  async function clearAllData() {
    await db.questions.clear();
    await db.records.clear();
    await db.collections.clear();
    await db.notes.clear();
    await db.settings.clear();
    await db.examRecords.clear();
  }
  
  /**
   * 删除数据库
   * @returns {Promise<void>}
   */
  async function deleteDatabase() {
    await db.delete();
    dbInstance = null;
  }
  
  /**
   * 获取数据库大小估算
   * @returns {Promise<Object>}
   */
  async function getDatabaseSize() {
    const questions = await db.questions.count();
    const records = await db.records.count();
    const collections = await db.collections.count();
    const notes = await db.notes.count();
    const settings = await db.settings.count();
    const examRecords = await db.examRecords.count();
    
    const total = questions + records + collections + notes + settings + examRecords;
    
    return {
      questions,
      records,
      collections,
      notes,
      settings,
      examRecords,
      total
    };
  }
  
  // 返回所有方法
  return {
    // 数据库实例
    db,
    
    // 初始化
    initializeDatabase,
    isDatabaseEmpty,
    
    // 题库操作
    getAllQuestions,
    getQuestionById,
    getQuestionsByIds,
    getRandomQuestions,
    getSequentialQuestions,
    addQuestion,
    addQuestions,
    updateQuestion,
    deleteQuestion,
    deleteQuestions,
    clearQuestions,
    importQuestions,
    getQuestionStats,
    
    // 做题记录操作
    addRecord,
    addRecords,
    addStudyRecords,
    getRecordsByQuestionId,
    getAllRecords,
    getWrongRecords,
    getWrongQuestions,
    deleteRecord,
    clearAllRecords,
    getRecordStats,
    
    // 收藏夹操作
    addCollection,
    removeCollection,
    isCollected,
    isQuestionCollected,
    getAllCollections,
    getCollectedQuestions,
    updateCollectionNote,
    getCollectionStats,
    
    // 笔记操作
    addNote,
    getNotesByQuestionId,
    getAllNotes,
    updateNote,
    deleteNote,
    
    // 用户设置操作
    getSetting,
    getAllSettings,
    saveSetting,
    saveSettings,
    resetSettings,
    
    // 模考记录操作
    addExamRecord,
    getExamRecordById,
    getAllExamRecords,
    updateExamRecord,
    deleteExamRecord,
    getExamStats,
    
    // 数据导入导出
    exportQuestions,
    exportAllData,
    importAllData,
    
    // 数据备份恢复
    createBackup,
    restoreBackup,
    downloadBackup,
    restoreFromFile,
    
    // 统计查询
    getStatistics,
    getHomeStatistics,
    getTodayStatistics,
    getRecentStatistics,
    getWrongQuestionStats,
    getStudyProgress,
    
    // 数据库维护
    clearAllData,
    deleteDatabase,
    getDatabaseSize
  };
}

export default useDatabase;