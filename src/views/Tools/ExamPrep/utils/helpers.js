/**
 * 公考备考助手辅助函数
 */

import dayjs from 'dayjs';

/**
 * 随机打乱数组
 * @param {Array} array - 原数组
 * @returns {Array} - 打乱后的数组
 */
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * 从数组中随机选择指定数量的元素
 * @param {Array} array - 原数组
 * @param {Number} count - 选择数量
 * @returns {Array} - 选中的元素数组
 */
export function randomSelect(array, count) {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, count);
}

/**
 * 计算正确率
 * @param {Number} correct - 正确数量
 * @param {Number} total - 总数量
 * @returns {String} - 正确率百分比字符串
 */
export function calculateAccuracy(correct, total) {
  if (total === 0) return '0%';
  const rate = (correct / total) * 100;
  return `${rate.toFixed(1)}%`;
}

/**
 * 计算得分
 * @param {Object} results - 答题结果对象 {verbal, logic, math, data, common}
 * @param {Object} weights - 模块权重对象
 * @returns {Number} - 总得分
 */
export function calculateScore(results, weights) {
  let totalScore = 0;
  for (const module in results) {
    const moduleResult = results[module];
    const moduleWeight = weights[module] || 0;
    const moduleAccuracy = moduleResult.correct / moduleResult.total;
    totalScore += moduleAccuracy * moduleWeight * 100;
  }
  return Math.round(totalScore);
}

/**
 * 格式化时间
 * @param {Number} seconds - 秒数
 * @returns {String} - 格式化后的时间字符串 HH:MM:SS
 */
export function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * 格式化日期
 * @param {Date|String|Number} date - 日期对象、字符串或时间戳
 * @param {String} format - 格式化模式
 * @returns {String} - 格式化后的日期字符串
 */
export function formatDate(date, format = 'YYYY-MM-DD') {
  return dayjs(date).format(format);
}

/**
 * 获取今日日期范围
 * @returns {Object} - {start, end}
 */
export function getTodayRange() {
  const start = dayjs().startOf('day').toDate();
  const end = dayjs().endOf('day').toDate();
  return { start, end };
}

/**
 * 获取本周日期范围
 * @returns {Object} - {start, end}
 */
export function getWeekRange() {
  const start = dayjs().startOf('week').toDate();
  const end = dayjs().endOf('week').toDate();
  return { start, end };
}

/**
 * 获取本月日期范围
 * @returns {Object} - {start, end}
 */
export function getMonthRange() {
  const start = dayjs().startOf('month').toDate();
  const end = dayjs().endOf('month').toDate();
  return { start, end };
}

/**
 * 生成唯一ID
 * @param {String} prefix - ID前缀
 * @returns {String} - 唯一ID
 */
export function generateId(prefix = '') {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2);
  return `${prefix}${timestamp}${random}`;
}

/**
 * 延迟执行
 * @param {Number} ms - 毫秒数
 * @returns {Promise}
 */
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 深拷贝对象
 * @param {Object} obj - 原对象
 * @returns {Object} - 拷贝后的对象
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  
  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

/**
 * 判断答案是否正确
 * @param {Number|Array} userAnswer - 用户答案
 * @param {Number|Array} correctAnswer - 正确答案
 * @returns {Boolean}
 */
export function isAnswerCorrect(userAnswer, correctAnswer) {
  if (Array.isArray(userAnswer) && Array.isArray(correctAnswer)) {
    return userAnswer.length === correctAnswer.length &&
           userAnswer.every(ans => correctAnswer.includes(ans));
  }
  return userAnswer === correctAnswer;
}

/**
 * 获取模块名称
 * @param {String} categoryId - 分类ID
 * @param {Array} categories - 分类数组
 * @returns {String} - 模块名称
 */
export function getCategoryName(categoryId, categories) {
  const category = categories.find(cat => cat.id === categoryId);
  return category ? category.name : '未知模块';
}

/**
 * 获取难度等级名称
 * @param {String} difficulty - 难度ID
 * @param {Array} levels - 难度等级数组
 * @returns {String} - 难度名称
 */
export function getDifficultyName(difficulty, levels) {
  const level = levels.find(lvl => lvl.id === difficulty);
  return level ? level.name : '未知难度';
}

/**
 * 获取难度等级颜色
 * @param {String} difficulty - 难度ID
 * @param {Array} levels - 难度等级数组
 * @returns {String} - 障度颜色
 */
export function getDifficultyColor(difficulty, levels) {
  const level = levels.find(lvl => lvl.id === difficulty);
  return level ? level.color : '#999';
}

/**
 * 统计答题数据
 * @param {Array} records - 答题记录数组
 * @returns {Object} - 统计结果 {total, correct, wrong, accuracy}
 */
export function statisticsRecords(records) {
  const total = records.length;
  const correct = records.filter(r => r.isCorrect).length;
  const wrong = total - correct;
  const accuracy = calculateAccuracy(correct, total);
  
  return { total, correct, wrong, accuracy };
}

/**
 * 按模块统计答题数据
 * @param {Array} records - 答题记录数组
 * @returns {Object} - 模块统计结果
 */
export function statisticsByModule(records) {
  const modules = {};
  const moduleIds = ['verbal', 'logic', 'math', 'data', 'common'];
  
  moduleIds.forEach(moduleId => {
    const moduleRecords = records.filter(r => r.category === moduleId);
    modules[moduleId] = statisticsRecords(moduleRecords);
  });
  
  return modules;
}

/**
 * 按日期统计答题数据（最近7天）
 * @param {Array} records - 答题记录数组
 * @returns {Array} - 日期统计结果数组
 */
export function statisticsByDate(records, days = 7) {
  const result = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = dayjs().subtract(i, 'day').format('YYYY-MM-DD');
    const dayRecords = records.filter(r => formatDate(r.createdAt, 'YYYY-MM-DD') === date);
    const stats = statisticsRecords(dayRecords);
    result.push({ date, ...stats });
  }
  return result;
}

/**
 * 导出数据为JSON
 * @param {Object} data - 数据对象
 * @returns {String} - JSON字符串
 */
export function exportToJSON(data) {
  return JSON.stringify(data, null, 2);
}

/**
 * 从JSON导入数据
 * @param {String} jsonString - JSON字符串
 * @returns {Object} - 数据对象
 */
export function importFromJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error('JSON格式错误');
  }
}

/**
 * 创建下载文件
 * @param {String} content - 文件内容
 * @param {String} filename - 文件名
 * @param {String} mimeType - MIME类型
 */
export function downloadFile(content, filename, mimeType = 'application/json') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * 触发振动反馈
 * @param {Number} duration - 振动时长（毫秒）
 */
export function triggerVibration(duration = 50) {
  if (navigator.vibrate) {
    navigator.vibrate(duration);
  }
}

/**
 * 播放声音提示
 * @param {String} type - 声音类型（'correct' | 'wrong'）
 */
export function playSound(type) {
  // 使用Web Audio API创建简单音效
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  if (type === 'correct') {
    oscillator.frequency.value = 800; // 高音表示正确
  } else {
    oscillator.frequency.value = 200; // 低音表示错误
  }
  
  gainNode.gain.value = 0.1;
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.1);
}