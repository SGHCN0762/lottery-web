import { ref, computed } from 'vue';

const BASE_PATH = '';
const BASE_URL = 'https://cdn.jsdelivr.net/gh/SGHCN0762/textbook@v1.0.0';

const getFullUrl = path => `${BASE_URL}${path}`;

const processFiles = (files, categoryId) => {
  return files.map((f, index) => ({
    ...f,
    id: `${categoryId}-${index}`,
    url: getFullUrl(f.path),
  }));
};

export const categories = [
  { id: 'math', name: '数学', icon: '📐' },
  { id: 'chinese', name: '语文', icon: '📖' },
  { id: 'english', name: '英语', icon: '📕' },
  { id: 'physics', name: '物理', icon: '⚛️' },
  { id: 'chemistry', name: '化学', icon: '⚗️' },
  { id: 'biology', name: '生物', icon: '🧬' },
  { id: 'history', name: '历史', icon: '📜' },
  { id: 'geography', name: '地理', icon: '🌍' },
  { id: 'politics', name: '政治', icon: '📋' },
];

const mathFiles = processFiles([
  { name: '初中数学七年级上.pdf', subtitle: '七年级上', path: `${BASE_PATH}/初中数学七年级上.pdf` },
  { name: '初中数学七年级下.pdf', subtitle: '七年级下', path: `${BASE_PATH}/初中数学七年级下.pdf` },
  { name: '初中数学八年级上.pdf', subtitle: '八年级上', path: `${BASE_PATH}/初中数学八年级上.pdf` },
  { name: '初中数学八年级下.pdf', subtitle: '八年级下', path: `${BASE_PATH}/初中数学八年级下.pdf` },
  { name: '初中数学九年级上.pdf', subtitle: '九年级上', path: `${BASE_PATH}/初中数学九年级上.pdf` },
  { name: '初中数学九年级下.pdf', subtitle: '九年级下', path: `${BASE_PATH}/初中数学九年级下.pdf` },
  { name: '高中数学必修一.pdf', subtitle: '必修一', path: `${BASE_PATH}/高中数学必修一.pdf` },
  { name: '高中数学必修二.pdf', subtitle: '必修二', path: `${BASE_PATH}/高中数学必修二.pdf` },
  { name: '高中数学选修一.pdf', subtitle: '选修一', path: `${BASE_PATH}/高中数学选修一.pdf` },
  { name: '高中数学选修二.pdf', subtitle: '选修二', path: `${BASE_PATH}/高中数学选修二.pdf` },
  { name: '高中数学选修三.pdf', subtitle: '选修三', path: `${BASE_PATH}/高中数学选修三.pdf` },
], 'math');

const chineseFiles = processFiles([
  { name: '初中语文七年级上.pdf', subtitle: '七年级上', path: `${BASE_PATH}/初中语文七年级上.pdf` },
  { name: '初中语文七年级下.pdf', subtitle: '七年级下', path: `${BASE_PATH}/初中语文七年级下.pdf` },
  { name: '初中语文八年级上.pdf', subtitle: '八年级上', path: `${BASE_PATH}/初中语文八年级上.pdf` },
  { name: '初中语文八年级下.pdf', subtitle: '八年级下', path: `${BASE_PATH}/初中语文八年级下.pdf` },
  { name: '初中语文九年级上.pdf', subtitle: '九年级上', path: `${BASE_PATH}/初中语文九年级上.pdf` },
  { name: '初中语文九年级下.pdf', subtitle: '九年级下', path: `${BASE_PATH}/初中语文九年级下.pdf` },
  { name: '高中语文必修上.pdf', subtitle: '必修上', path: `${BASE_PATH}/高中语文必修上.pdf` },
  { name: '高中语文必修下.pdf', subtitle: '必修下', path: `${BASE_PATH}/高中语文必修下.pdf` },
  { name: '高中语文选修上.pdf', subtitle: '选修上', path: `${BASE_PATH}/高中语文选修上.pdf` },
  { name: '高中语文选修中.pdf', subtitle: '选修中', path: `${BASE_PATH}/高中语文选修中.pdf` },
  { name: '高中语文选修下.pdf', subtitle: '选修下', path: `${BASE_PATH}/高中语文选修下.pdf` },
], 'chinese');

const englishFiles = processFiles([
  { name: '初中英语七年级上.pdf', subtitle: '七年级上', path: `${BASE_PATH}/初中英语七年级上.pdf` },
  { name: '初中英语七年级下.pdf', subtitle: '七年级下', path: `${BASE_PATH}/初中英语七年级下.pdf` },
  { name: '初中英语八年级上.pdf', subtitle: '八年级上', path: `${BASE_PATH}/初中英语八年级上.pdf` },
  { name: '初中英语八年级下.pdf', subtitle: '八年级下', path: `${BASE_PATH}/初中英语八年级下.pdf` },
  { name: '初中英语九年级全一册.pdf', subtitle: '九年级全一册', path: `${BASE_PATH}/初中英语九年级全一册.pdf` },
  { name: '高中英语必修一.pdf', subtitle: '必修一', path: `${BASE_PATH}/高中英语必修一.pdf` },
  { name: '高中英语必修二.pdf', subtitle: '必修二', path: `${BASE_PATH}/高中英语必修二.pdf` },
  { name: '高中英语必修三.pdf', subtitle: '必修三', path: `${BASE_PATH}/高中英语必修三.pdf` },
  { name: '高中英语选修一.pdf', subtitle: '选修一', path: `${BASE_PATH}/高中英语选修一.pdf` },
  { name: '高中英语选修二.pdf', subtitle: '选修二', path: `${BASE_PATH}/高中英语选修二.pdf` },
  { name: '高中英语选修三.pdf', subtitle: '选修三', path: `${BASE_PATH}/高中英语选修三.pdf` },
  { name: '高中英语选修四.pdf', subtitle: '选修四', path: `${BASE_PATH}/高中英语选修四.pdf` },
], 'english');

const physicsFiles = processFiles([
  { name: '初中物理八年级上.pdf', subtitle: '八年级上', path: `${BASE_PATH}/初中物理八年级上.pdf` },
  { name: '初中物理八年级下.pdf', subtitle: '八年级下', path: `${BASE_PATH}/初中物理八年级下.pdf` },
  { name: '初中物理九年级全一册.pdf', subtitle: '九年级全一册', path: `${BASE_PATH}/初中物理九年级全一册.pdf` },
  { name: '高中物理必修一.pdf', subtitle: '必修一', path: `${BASE_PATH}/高中物理必修一.pdf` },
  { name: '高中物理必修二.pdf', subtitle: '必修二', path: `${BASE_PATH}/高中物理必修二.pdf` },
  { name: '高中物理必修三.pdf', subtitle: '必修三', path: `${BASE_PATH}/高中物理必修三.pdf` },
  { name: '高中物理选修一.pdf', subtitle: '选修一', path: `${BASE_PATH}/高中物理选修一.pdf` },
  { name: '高中物理选修二.pdf', subtitle: '选修二', path: `${BASE_PATH}/高中物理选修二.pdf` },
  { name: '高中物理选修三.pdf', subtitle: '选修三', path: `${BASE_PATH}/高中物理选修三.pdf` },
], 'physics');

const chemistryFiles = processFiles([
  { name: '初中化学九年级上.pdf', subtitle: '九年级上', path: `${BASE_PATH}/初中化学九年级上.pdf` },
  { name: '初中化学九年级下.pdf', subtitle: '九年级下', path: `${BASE_PATH}/初中化学九年级下.pdf` },
  { name: '高中化学必修一.pdf', subtitle: '必修一', path: `${BASE_PATH}/高中化学必修一.pdf` },
  { name: '高中化学必修二.pdf', subtitle: '必修二', path: `${BASE_PATH}/高中化学必修二.pdf` },
  { name: '高中化学选修一.pdf', subtitle: '选修一', path: `${BASE_PATH}/高中化学选修一.pdf` },
  { name: '高中化学选修二.pdf', subtitle: '选修二', path: `${BASE_PATH}/高中化学选修二.pdf` },
  { name: '高中化学选修三.pdf', subtitle: '选修三', path: `${BASE_PATH}/高中化学选修三.pdf` },
], 'chemistry');

const biologyFiles = processFiles([
  { name: '初中生物七年级上.pdf', subtitle: '七年级上', path: `${BASE_PATH}/初中生物七年级上.pdf` },
  { name: '初中生物七年级下.pdf', subtitle: '七年级下', path: `${BASE_PATH}/初中生物七年级下.pdf` },
  { name: '初中生物八年级上.pdf', subtitle: '八年级上', path: `${BASE_PATH}/初中生物八年级上.pdf` },
  { name: '初中生物八年级下.pdf', subtitle: '八年级下', path: `${BASE_PATH}/初中生物八年级下.pdf` },
  { name: '高中生物必修一.pdf', subtitle: '必修一', path: `${BASE_PATH}/高中生物必修一.pdf` },
  { name: '高中生物必修二.pdf', subtitle: '必修二', path: `${BASE_PATH}/高中生物必修二.pdf` },
  { name: '高中生物选修一.pdf', subtitle: '选修一', path: `${BASE_PATH}/高中生物选修一.pdf` },
  { name: '高中生物选修二.pdf', subtitle: '选修二', path: `${BASE_PATH}/高中生物选修二.pdf` },
  { name: '高中生物选修三.pdf', subtitle: '选修三', path: `${BASE_PATH}/高中生物选修三.pdf` },
], 'biology');

const historyFiles = processFiles([
  { name: '高中历史必修上.pdf', subtitle: '必修上', path: `${BASE_PATH}/高中历史必修上.pdf` },
  { name: '高中历史必修下.pdf', subtitle: '必修下', path: `${BASE_PATH}/高中历史必修下.pdf` },
  { name: '高中历史选修一.pdf', subtitle: '选修一', path: `${BASE_PATH}/高中历史选修一.pdf` },
  { name: '高中历史选修二.pdf', subtitle: '选修二', path: `${BASE_PATH}/高中历史选修二.pdf` },
  { name: '高中历史选修三.pdf', subtitle: '选修三', path: `${BASE_PATH}/高中历史选修三.pdf` },
], 'history');

const geographyFiles = processFiles([
  { name: '初中地理七年级上.pdf', subtitle: '七年级上', path: `${BASE_PATH}/初中地理七年级上.pdf` },
  { name: '初中地理七年级下.pdf', subtitle: '七年级下', path: `${BASE_PATH}/初中地理七年级下.pdf` },
  { name: '初中地理八年级上.pdf', subtitle: '八年级上', path: `${BASE_PATH}/初中地理八年级上.pdf` },
  { name: '初中地理八年级下.pdf', subtitle: '八年级下', path: `${BASE_PATH}/初中地理八年级下.pdf` },
  { name: '高中地理必修一.pdf', subtitle: '必修一', path: `${BASE_PATH}/高中地理必修一.pdf` },
  { name: '高中地理必修二.pdf', subtitle: '必修二', path: `${BASE_PATH}/高中地理必修二.pdf` },
  { name: '高中地理选修一.pdf', subtitle: '选修一', path: `${BASE_PATH}/高中地理选修一.pdf` },
  { name: '高中地理选修二.pdf', subtitle: '选修二', path: `${BASE_PATH}/高中地理选修二.pdf` },
  { name: '高中地理选修三.pdf', subtitle: '选修三', path: `${BASE_PATH}/高中地理选修三.pdf` },
], 'geography');

const politicsFiles = processFiles([
  { name: '初中道德与法治七年级上.pdf', subtitle: '七年级上', path: `${BASE_PATH}/初中道德与法治七年级上.pdf` },
  { name: '初中道德与法治七年级下.pdf', subtitle: '七年级下', path: `${BASE_PATH}/初中道德与法治七年级下.pdf` },
  { name: '初中道德与法治八年级上.pdf', subtitle: '八年级上', path: `${BASE_PATH}/初中道德与法治八年级上.pdf` },
  { name: '初中道德与法治八年级下.pdf', subtitle: '八年级下', path: `${BASE_PATH}/初中道德与法治八年级下.pdf` },
  { name: '初中道德与法治九年级上.pdf', subtitle: '九年级上', path: `${BASE_PATH}/初中道德与法治九年级上.pdf` },
  { name: '初中道德与法治九年级下.pdf', subtitle: '九年级下', path: `${BASE_PATH}/初中道德与法治九年级下.pdf` },
  { name: '高中思想政治必修一.pdf', subtitle: '必修一', path: `${BASE_PATH}/高中思想政治必修一.pdf` },
  { name: '高中思想政治必修二.pdf', subtitle: '必修二', path: `${BASE_PATH}/高中思想政治必修二.pdf` },
  { name: '高中思想政治必修三.pdf', subtitle: '必修三', path: `${BASE_PATH}/高中思想政治必修三.pdf` },
  { name: '高中思想政治必修四.pdf', subtitle: '必修四', path: `${BASE_PATH}/高中思想政治必修四.pdf` },
  { name: '高中思想政治选修一.pdf', subtitle: '选修一', path: `${BASE_PATH}/高中思想政治选修一.pdf` },
  { name: '高中思想政治选修二.pdf', subtitle: '选修二', path: `${BASE_PATH}/高中思想政治选修二.pdf` },
  { name: '高中思想政治选修三.pdf', subtitle: '选修三', path: `${BASE_PATH}/高中思想政治选修三.pdf` },
], 'politics');

const allFiles = {
  math: mathFiles,
  chinese: chineseFiles,
  english: englishFiles,
  physics: physicsFiles,
  chemistry: chemistryFiles,
  biology: biologyFiles,
  history: historyFiles,
  geography: geographyFiles,
  politics: politicsFiles,
};

export function useTextbook() {
  const activeCategory = ref('math');

  const filteredFiles = computed(() => {
    return allFiles[activeCategory.value] || [];
  });

  const getFileUrl = file => file.url || '';

  const getFileName = file => file.name || '';

  return {
    activeCategory,
    filteredFiles,
    getFileUrl,
    getFileName,
  };
}