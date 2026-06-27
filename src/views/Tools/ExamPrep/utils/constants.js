/**
 * 公考备考助手常量定义
 */

// 数据库名称和版本
export const DB_NAME = 'ExamPrepDB';
export const DB_VERSION = 1;

// 数据表名称
export const TABLES = {
  QUESTIONS: 'questions', // 题库表
  RECORDS: 'records', // 做题记录表
  COLLECTIONS: 'collections', // 收藏夹表
  NOTES: 'notes', // 笔记表
  SETTINGS: 'settings', // 用户设置表
  EXAM_RECORDS: 'examRecords', // 模考记录表
};

// 练习模式
export const PRACTICE_MODES = {
  SEQUENTIAL: 'sequential', // 顺序练习
  RANDOM: 'random', // 随机练习
  CATEGORY: 'category', // 分类练习
  WRONG: 'wrong', // 错题练习
  COLLECTED: 'collected', // 收藏练习
};

// 考试类型
export const EXAM_TYPES = {
  MOCK: 'mock', // 模拟考试
  DAILY: 'daily', // 每日一练
  SPECIAL: 'special', // 专项训练
};

// 考试科目类型
export const SUBJECT_TYPES = {
  XINGCE: 'xingce', // 行测（行政职业能力测验）
  SHENLUN: 'shenlun', // 申论
};

// 科目名称配置
export const SUBJECT_CONFIG = {
  xingce: {
    name: '行测',
    fullName: '行政职业能力测验',
    icon: '📝',
    color: '#1989fa',
    description: '包含言语理解、判断推理、数量关系、资料分析、常识判断五大模块',
    modules: ['verbal', 'logic', 'math', 'data', 'common'],
    examDuration: 120, // 120分钟
    questionCount: 135, // 135题
  },
  shenlun: {
    name: '申论',
    fullName: '申论',
    icon: '📄',
    color: '#ff976a',
    description: '考察阅读理解、综合分析、提出和解决问题、贯彻执行、文字表达等能力',
    modules: ['reading', 'analysis', 'writing', 'proposal', 'enforcement'],
    examDuration: 150, // 150分钟
    questionCount: 4, // 4题
  },
};

// 考试时长（分钟）
export const EXAM_DURATION = {
  MOCK: 120, // 模考120分钟
  DAILY: 15, // 每日一练15分钟
  SPECIAL: 30, // 专项训练30分钟
};

// 考试题目数量
export const EXAM_QUESTION_COUNT = {
  MOCK: 135, // 模考135题（行测标准）
  DAILY: 10, // 每日一练10题
  SPECIAL: 20, // 专项训练20题
};

// 答题状态
export const ANSWER_STATUS = {
  UNANSWERED: 'unanswered', // 未答题
  CORRECT: 'correct', // 正确
  WRONG: 'wrong', // 错误
  SKIPPED: 'skipped', // 跳过
};

// 统计周期
export const STATISTICS_PERIOD = {
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  ALL: 'all',
};

// 题目类型选项
export const QUESTION_TYPES = {
  SINGLE: 'single', // 单选题
  MULTIPLE: 'multiple', // 多选题
  JUDGE: 'judge', // 判断题
};

// 设置默认值
export const DEFAULT_SETTINGS = {
  autoShowAnalysis: true, // 自动显示解析
  autoNextQuestion: false, // 自动下一题
  soundEnabled: true, // 声音提示
  vibrationEnabled: true, // 振动提示
  theme: 'light', // 主题
  fontSize: 'medium', // 字体大小
  showTimer: true, // 显示计时器
  showProgress: true, // 显示进度
  questionCountPerPractice: 10, // 每次练习题数
};

// 分数计算权重（各模块占比）
export const MODULE_WEIGHTS = {
  verbal: 0.3, // 言语理解30%
  logic: 0.3, // 判断推理30%
  math: 0.1, // 数量关系10%
  data: 0.15, // 资料分析15%
  common: 0.15, // 常识判断15%
};

// 答题手势动作
export const SWIPE_ACTIONS = {
  LEFT: 'next', // 左滑下一题
  RIGHT: 'prev', // 右滑上一题
  UP: 'submit', // 上滑提交
  DOWN: 'menu', // 下滑菜单
};

// 笔记类型
export const NOTE_TYPES = {
  TEXT: 'text', // 文字笔记
  IMAGE: 'image', // 图片笔记
  AUDIO: 'audio', // 音频笔记
};

// 数据导出格式
export const EXPORT_FORMATS = {
  JSON: 'json',
  CSV: 'csv',
};

// 缓存键名
export const CACHE_KEYS = {
  CURRENT_EXAM: 'current_exam',
  CURRENT_PRACTICE: 'current_practice',
  LAST_SYNC_TIME: 'last_sync_time',
  USER_PROGRESS: 'user_progress',
};

// 题库版本配置
export const QUESTION_BANK = {
  VERSION: '1.0.0',
  JSON_URL: import.meta.env.BASE_URL + 'questions.json',
  BATCH_SIZE: 100,
};

// 设置键名
export const SETTING_KEYS = {
  QUESTION_BANK_VERSION: 'questionBankVersion',
  QUESTION_BANK_LAST_UPDATE: 'questionBankLastUpdate',
};