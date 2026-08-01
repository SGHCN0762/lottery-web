import { ref, computed } from 'vue';
import booksManifest from '../data/books.json';

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/SGHCN0762/turing-programming-series@v1.0.0';

// 与示例 URL 一致：中文字符等需编码，但 [ ] 保持字面量（jsDelivr 按此形式访问）
const getFullUrl = (filename) => {
  const encoded = encodeURI(filename).replace(/%5B/g, '[').replace(/%5D/g, ']');
  return `${CDN_BASE}/${encoded}`;
};

export const categories = [
  { id: 'programming', name: '图灵程序设计丛书', icon: '💻' },
  { id: 'interaction', name: '图灵交互设计丛书', icon: '🎨' },
  { id: 'original', name: '图灵原创', icon: '✨' },
  { id: 'books', name: '图灵图书', icon: '📚' },
  { id: 'math', name: '图灵数学·统计学丛书', icon: '📐' },
  { id: 'newknowledge', name: '图灵新知', icon: '🔬' },
  { id: 'cs', name: '图灵计算机科学丛书', icon: '🖥️' },
  { id: 'async', name: '异步图书', icon: '⏱️' },
  { id: 'pnp', name: '人民邮电', icon: '📮' },
];

// 从文件名解析出书名（去掉 [系列名]. 前缀和扩展名）
const deriveTitle = (filename) => {
  let title = filename;
  if (title.startsWith('[')) {
    title = title.replace(/^\[[^\]]*\]\./, '');
  } else {
    title = title.replace(/^图灵程序设计丛书_/, '');
  }
  return title.replace(/\.[^.]+$/, '');
};

const processFiles = (filenames, categoryId) => {
  return (filenames || []).map((name, index) => ({
    id: `${categoryId}-${index}`,
    name,
    subtitle: deriveTitle(name),
    url: getFullUrl(name),
  }));
};

const allFiles = Object.fromEntries(
  categories.map((cat) => [cat.id, processFiles(booksManifest[cat.id], cat.id)]),
);

export function useTuringBooks() {
  // 默认选中「图灵程序设计丛书」
  const activeCategory = ref('programming');

  const filteredFiles = computed(() => allFiles[activeCategory.value] || []);

  const getFileUrl = (file) => file.url || '';

  const getFileName = (file) => file.name || '';

  return {
    activeCategory,
    filteredFiles,
    getFileUrl,
    getFileName,
  };
}
