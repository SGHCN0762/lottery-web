import { ref, computed } from 'vue';

const BASE_PATH = 'civil-servant-exam';
const BASE_URL = import.meta.env.BASE_URL;

const getFullUrl = path => `${BASE_URL}${path}`;

const examJsonFiles = [
  { year: '2000', name: '2000年国家公务员考试行测真题', path: `${BASE_PATH}/2000-2026国考行测PDF/json/2000年国家公务员考试行测真题.json` },
  { year: '2001', name: '2001年国家公务员考试行测真题', path: `${BASE_PATH}/2000-2026国考行测PDF/json/2001年国家公务员考试行测真题.json` },
  { year: '2003', name: '2003年国家公务员考试行测真题', path: `${BASE_PATH}/2000-2026国考行测PDF/json/2003年国家公务员考试行测真题.json` },
  { year: '2006', name: '2006年国家公务员考试行测真题', path: `${BASE_PATH}/2000-2026国考行测PDF/json/2006年国家公务员考试行测真题.json` },
  { year: '2008', name: '2008年国家公务员考试行测真题', path: `${BASE_PATH}/2000-2026国考行测PDF/json/2008年国家公务员考试行测真题.json` },
  { year: '2009', name: '2009年国家公务员考试行测真题', path: `${BASE_PATH}/2000-2026国考行测PDF/json/2009年国家公务员考试行测真题.json` },
  { year: '2022', name: '2022年国家公务员考试行测真题', path: `${BASE_PATH}/2000-2026国考行测PDF/json/2022年国家公务员考试行测真题.json` },
  { year: '2024', name: '2024年国家公务员考试行测真题', path: `${BASE_PATH}/2000-2026国考行测PDF/json/2024年国家公务员考试行测真题.json` },
  { year: '2025', name: '2025年国家公务员考试行测真题', path: `${BASE_PATH}/2000-2026国考行测PDF/json/2025年国家公务员考试行测真题.json` },
  { year: '2026', name: '2026年国家公务员考试行测真题', path: `${BASE_PATH}/2000-2026国考行测PDF/json/2026年国家公务员考试行测真题.json` },
];

const processFiles = (files, categoryId) => {
  return files.map((f, index) => ({
    ...f,
    id: `${categoryId}-${index}-${f.year || 'no-year'}`,
    url: getFullUrl(f.path),
  }));
};

export const categories = [
  { id: 'shenlun', name: '申论真题' },
  { id: 'xingce-zhenti', name: '行测真题' },
  { id: 'xingce-answer', name: '行测答案' },
  { id: 'answer-sheet', name: '答题卡' },
];

const shenlunArr = [
  '2000年国家录用公务员考试《申论》真题卷及答案.pdf',
  '2001年国家录用公务员考试《申论》真题卷及答案.pdf',
  '2002年国家录用公务员考试《申论》真题卷及答案.pdf',
  '2003年国家录用公务员考试《申论》真题卷及答案.pdf',
  '2004年国家录用公务员考试《申论》真题卷及答案.pdf',
  '2005年国家录用公务员考试《申论》真题卷及答案.pdf',
  '2006年国家录用公务员考试《申论》真题卷及答案.pdf',
  '2007年国家录用公务员考试《申论》真题卷及答案.pdf',
  '2008年国家录用公务员考试《申论》真题卷及答案.pdf',
  '2009年国家录用公务员考试《申论》真题卷及答案（地市、副省）.pdf',
  '2010年国家录用公务员考试《申论》真题卷及答案（副省级）.pdf',
  '2010年国家录用公务员考试《申论》真题卷及答案（地市级）.pdf',
  '2011年国家录用公务员考试《申论》真题卷及答案（副省级）.pdf',
  '2011年国家录用公务员考试《申论》真题卷及答案（地市级）.pdf',
  '2012年国家录用公务员考试《申论》真题卷及答案（副省级）.pdf',
  '2012年国家录用公务员考试《申论》真题卷及答案（地市级）.pdf',
  '2013年国家录用公务员考试《申论》真题卷及答案（副省级）.pdf',
  '2013年国家录用公务员考试《申论》真题卷及答案（地市级）.pdf',
  '2014年国家录用公务员考试《申论》真题卷及答案（副省级）.pdf',
  '2014年国家录用公务员考试《申论》真题卷及答案（地市级）.pdf',
  '2015年国家录用公务员考试《申论》真题卷及答案（省部级）.pdf',
  '2015年国家录用公务员考试《申论》真题卷及答案（地市级）.pdf',
  '2016年国家录用公务员考试《申论》真题卷及答案（副省级）.pdf',
  '2016年国家录用公务员考试《申论》真题卷及答案（地市级）.pdf',
  '2017年国家录用公务员考试《申论》真题卷及答案（省级）（含解析共20面）.pdf',
  '2017年国家录用公务员考试《申论》真题卷及答案（地市级）（含解析共20面）.pdf',
  '2018年国家录用公务员考试《申论》真题卷及答案（副省级）.pdf',
  '2018年国家录用公务员考试《申论》真题卷及答案（地市级）.pdf',
  '2019年国家公务员考试《申论》真题及答案（省级）（含解析）.pdf',
  '2019年国家公务员考试《申论》真题及答案（地市级）（含解析）.pdf',
  '2020年国家公务员考试《申论》真题及答案（省级）.pdf',
  '2020年国家公务员考试《申论》真题及答案（地市级）.pdf',
  '2021年国家公务员考试《申论》真题（副省级）及参考答案(两套答案).pdf',
  '2021年国家公务员考试《申论》真题（地市级）及参考答案(两套答案).pdf',
  '2022年国家公考《申论》真题（副省级）及参考答案.pdf',
  '2022国考《申论》真题及答案解析（地市级）.pdf',
  '2022年国家公务员考试申论试题（行政执法卷）及参考答案.pdf',
  '2023年国家公考《申论》（副省卷）题和参考答案.pdf',
  '2023年国家公考《申论》（地市卷）题和参考答案.pdf',
  '2023年国家公务员《申论》（行政执法卷）题和参考答案.pdf',
  '2024年国考申论真题（副省级）及参考答案.pdf',
  '2024年国考申论真题（地市级）及参考答案.pdf',
  '2024年国考申论真题（行政执法卷）及参考答案.pdf',
  '2025年国家公务员考试《申论》题（副省级）及参考答案.pdf',
  '2025年国家公考《申论》题+参考答案（地市 级).pdf',
  '2025年国家公考《申论》题+参考答案（行政 执法).pdf',
  '2026年国家公务员录用考试《申论》题（行政执法卷）答案解析.pdf',
];
const yearRegex = /^(\d{4}).*$/;
const shenlunFiles = processFiles(
  shenlunArr.map(name => ({
    year: name.replace(yearRegex, '$1'),
    name,
    path: `${BASE_PATH}/2000-2026国考申论PDF/${name}`,
  })),
  'shenlun'
);

const xingceZentiArr = [
  '2000年国家公务员考试《行测》真题.pdf',
  '2001年国家公务员考试《行测》真题.pdf',
  '2002年国家公务员录用考试《行测》真题（A卷）.pdf',
  '2002年国家公务员录用考试《行测》真题（B卷）.pdf',
  '2003年国家公务员考试《行测》真题A卷.pdf',
  '2003年国家公务员考试《行测》真题B卷.pdf',
  '2004年国家公务员录用考试《行测》真题（A卷）.pdf',
  '2004年国家公务员录用考试《行测》真题（B卷）.pdf',
  '2005年国家公务员考试《行测》真题卷（一）.pdf',
  '2005年国家公务员考试《行测》真题卷（二）.pdf',
  '2006年国家公务员考试《行测》真题卷（一）.pdf',
  '2007年国家公务员考试《行测》真题卷.pdf',
  '2008年国家公务员考试《行测》真题卷.pdf',
  '2009年国家公务员考试《行测》真题卷.pdf',
  '2010年国家公务员考试《行测》真题卷.pdf',
  '2011年国家公务员考试《行测》真题卷.pdf',
  '2012年国家公务员考试《行测》真题卷.pdf',
  '2013年国家公务员考试《行测》真题卷.pdf',
  '2014年国家公务员考试《行测》真题卷.pdf',
  '2015年国家公务员考试《行测》真题卷（副省级).pdf',
  '2015年国家公务员考试《行测》真题卷（地市级).pdf',
  '2016年国家公务员考试《行测》真题卷（副省级).pdf',
  '2016年国家公务员考试《行测》真题卷（地市级）.pdf',
  '2017年国家公务员考试《行测》真题卷（副省级）.pdf',
  '2017年国家录用公务员考试《行测》真题卷（地市级）.pdf',
  '2018年国家公务员考试《行测》真题卷（副省级）.pdf',
  '2018年国家录用公务员考试《行测》真题卷（地市级）.pdf',
  '2019年国家公务员考试行测真题（省级）.pdf',
  '2019年国家公务员考试行测真题（地市级）.pdf',
  '2020年国家公务员考试《行测》真题（副省级）.pdf',
  '2020年国家公务员考试《行测》真题（地市级）.pdf',
  '2021年国家公务员考试《行测》真题（副省级）.pdf',
  '2021年国家公务员考试《行测》真题（市地级）.pdf',
  '2022年国家公务员考试《行测》真题（副省级).pdf',
  '2022 年国家公务员考试行测真题 （地市级）.pdf',
  '2022年国家公务员考试《行测》真题（行政执法）.pdf',
  '2023年国家公务员录用考试《行测》真题（副省级）.pdf',
  '2023年国家公务员录用考试《行测》真题（地市级）.pdf',
  '2023年国家公务员录用考试《行测》真题（行政执法卷）.pdf',
  '2024年国家公务员录用考试《行测》题（副省级）.pdf',
  '2024年国家公务员录用考试《行测》题（地市级）.pdf',
  '2024年国家公务员录用考试《行测》题（行政执法卷）.pdf',
  '2025年国家公务员录用考试《行测》题（副省级）.pdf',
  '2025年国家公务员录用考试《行测》题（地市级）.pdf',
  '2025年国家公务员录用考试《行测》题（行政执法卷）.pdf',
  '2026年国家公务员录用考试《行测》题（副省级）.pdf',
  '2026年国家公务员录用考试《行测》题（地市级）.pdf',
  '2026年国家公务员录用考试《行测》题（行政执法卷）.pdf',
];
const xingceZhentiFiles = processFiles(
  xingceZentiArr.map(name => {
    const year = name.replace(yearRegex, '$1');
    let jsonFile = null;
    
    const versionPatterns = ['副省级', '地市级', '市地级', '行政执法', '行政执法卷', '省级', 'A卷', 'B卷', '（一）', '（二）'];
    let matchedVersion = '';
    for (const pattern of versionPatterns) {
      if (name.includes(pattern)) {
        matchedVersion = pattern;
        break;
      }
    }
    
    if (matchedVersion) {
      jsonFile = examJsonFiles.find(jf => jf.year === year && jf.name.includes(matchedVersion));
    }
    
    if (!jsonFile) {
      jsonFile = examJsonFiles.find(jf => jf.year === year);
    }
    
    return {
      year,
      name,
      path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/${name}`,
      examJsonFile: jsonFile || null,
    };
  }),
  'xingce-zhenti'
);

const xingceAnswerArr = [
  '2000年国家公务员考试《行测》真题答案及解析.pdf',
  '2001年国家公务员考试《行测》真题答案及解析.pdf',
  '2002年国家公务员录用考试《行测》真题（A卷）参考答案及解析.pdf',
  '2002年国家公务员录用考试《行测》真题（B卷）参考答案及解析.pdf',
  '2003年国家公务员考试《行测》真题A卷答案及解析.pdf',
  '2003年国家公务员考试《行测》真题B卷答案及解析.pdf',
  '2004年国家公务员录用考试《行测》真题（A卷）参考答案及解析.pdf',
  '2004年国家公务员录用考试《行测》真题（B卷）参考答案及解析.pdf',
  '2005年国家公务员考试《行测》真题卷（一）答案及解析.pdf',
  '2005年国家公务员考试《行测》真题卷（二）答案及解析.pdf',
  '2006年国家公务员考试《行测》真题卷（一）答案及解析.pdf',
  '2007年国家公务员考试《行测》真题卷答案及解析.pdf',
  '2008年国家公务员考试《行测》真题卷答案及解析.pdf',
  '2009年国家公务员考试《行测》真题卷答案及解析.pdf',
  '2010年国家公务员考试《行测》真题卷答案及解析.pdf',
  '2011年国家公务员考试《行测》真题卷答案及解析.pdf',
  '2012年国家公务员考试《行测》真题卷答案及解析.pdf',
  '2013年国家公务员考试《行测》真题卷参考答案.pdf',
  '2014年国家公务员考试《行测》真题卷答案及解析.pdf',
  '2015年国家公务员考试《行测》真题卷（副省级)答案及解析.pdf',
  '2015年国家公务员考试《行测》真题卷（地市级)答案及解析.pdf',
  '2016年国家公务员考试《行测》真题卷（副省级）答案及解析.pdf',
  '2016年国家公务员考试《行测》真题卷（地市级）答案及解析.pdf',
  '2017年国家公务员考试《行测》真题卷（副省级）答案及解析.pdf',
  '2017年国家录用公务员考试《行测》真题卷（地市级）答案及解析.pdf',
  '2018年国家公务员考试《行测》真题卷（副省级）答案及解析.pdf',
  '2018年国家录用公务员考试《行测》真题卷（地市级）答案及解析.pdf',
  '2019年国家公务员考试行测真题（省级）答案及解析.pdf',
  '2019年国家公务员考试行测真题（地市级）答案及解析.pdf',
  '2020年国家公务员考试《行测》真题（省级）答案及解析.pdf',
  '2020年国家公务员考试《行测》真题（地市级）答案及解析.pdf',
  '2021年国家公务员考试《行测》真题（副省级）参考答案及解析.pdf',
  '2021年国家公务员考试《行测》真题（市地级）参考答案及解析.pdf',
  '2022年国家公务员考试《行测》真题（副省级）【答案+解析】.pdf',
  '2022年国家公务员考试《行测》真题（市地级）【答案+解析】.pdf',
  '2022年国家公务员考试《行测》真题（行政执法）【答案+解析】.pdf',
  '2023年国家公务员录用考试《行测》真题（副省级）（解析）.pdf',
  '2023年国家公务员录用考试《行测》真题（地市级）（解析）.pdf',
  '2023年国家公务员录用考试《行测》真题（行政执法卷）（解析）.pdf',
  '2024年国考《行测》（副省级）答案+解析.pdf',
  '2024年国考《行测》（地市级）答案+解析.pdf',
  '2024年国考《行测》（行政执法）答案+解析.pdf',
  '2025年国考《行测》（副省级）答案+解析.pdf',
  '2025年国考《行测》（地市级）答案+解析.pdf',
  '2025年国考《行测》（行政执法卷）答案+解析.pdf',
  '2026年国家公务员录用考试《行测》题（副省级）答案解析.pdf',
  '2026年国家公务员录用考试《行测》题（地市级）答案解析.pdf',
  '2026年国家公务员录用考试《行测》题（行政执法卷）答案解析.pdf',
];
const xingceAnswerFiles = processFiles(
  xingceAnswerArr.map(name => ({
    year: name.replace(yearRegex, '$1'),
    name,
    path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/${name}`,
  })),
  'xingce-answer'
);

const answerSheetArr = [
  '申论标准答题纸.pdf',
  '公务员申论标准答题纸(彩色A3版).pdf',
  '公务员考试行测答题卡A4格式可直接打印.pdf',
];
const answerSheetFiles = processFiles(
  answerSheetArr.map(name => ({
    name,
    path: `${BASE_PATH}/答题卡可打印/${name}`,
  })),
  'answer-sheet'
);

const allFiles = {
  shenlun: shenlunFiles.sort((pre,next) => next.year - pre.year),
  'xingce-zhenti': xingceZhentiFiles.sort((pre,next) => next.year - pre.year),
  'xingce-answer': xingceAnswerFiles.sort((pre,next) => next.year - pre.year),
  'answer-sheet': answerSheetFiles,
};

export function useCivilServantExam() {
  const activeCategory = ref('shenlun');

  const filteredFiles = computed(() => {
    return allFiles[activeCategory.value] || [];
  });

  const getFileUrl = file => file.url || '';

  const getFileName = file => file.name || '';

  const loadExamData = async (fileIndex = 0) => {
    const examFile = examJsonFiles[fileIndex];
    if (!examFile) {
      throw new Error('未找到对应的试题文件');
    }
    const response = await fetch(getFullUrl(examFile.path));
    const data = await response.json();
    return data;
  };

  const getExamFileUrl = (fileIndex = 0) => {
    const examFile = examJsonFiles[fileIndex];
    return examFile ? getFullUrl(examFile.path) : '';
  };

  return {
    activeCategory,
    filteredFiles,
    getFileUrl,
    getFileName,
    loadExamData,
    examJsonFiles,
    getExamFileUrl,
  };
}
