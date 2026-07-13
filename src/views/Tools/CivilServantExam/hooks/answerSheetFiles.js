import { BASE_PATH } from './config';

const processFiles = (files, categoryId) => {
  const BASE_URL = import.meta.env.BASE_URL;
  return files.map((f, index) => ({
    ...f,
    id: `${categoryId}-${index}-${f.year || 'no-year'}`,
    url: `${BASE_URL}${f.path}`,
  }));
};

const answerSheetArr = [
  '申论标准答题纸.pdf',
  '公务员申论标准答题纸(彩色A3版).pdf',
  '公务员考试行测答题卡A4格式可直接打印.pdf',
];

export const answerSheetFiles = processFiles(
  answerSheetArr.map(name => ({
    name,
    path: `${BASE_PATH}/答题卡可打印/${name}`,
  })),
  'answer-sheet'
);