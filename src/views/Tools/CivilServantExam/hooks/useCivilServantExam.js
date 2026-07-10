import { ref, computed } from 'vue';
import { provinceXingceZhentiArr, provinceXingceAnswerArr } from './provinceFiles';
import { provinceShenlunZhentiArr, provinceShenlunAnswerArr } from './provinceShenlunFiles';

const BASE_PATH = 'civil-servant-exam';
const BASE_URL = import.meta.env.BASE_URL;
const PROVINCE_XINGCE_CDN_URL = 'https://cdn.jsdelivr.net/gh/SGHCN0762/civil-service-exam-first@v1.0.0/';
const PROVINCE_SHENLUN_CDN_URL = 'https://cdn.jsdelivr.net/gh/SGHCN0762/civil-service-exam-second@v1.0.0/';

const getFullUrl = path => `${BASE_URL}${path}`;
const getProvinceXingceUrl = fileName => `${PROVINCE_XINGCE_CDN_URL}${encodeURIComponent(fileName)}`;
const getProvinceShenlunUrl = fileName => `${PROVINCE_SHENLUN_CDN_URL}${encodeURIComponent(fileName)}`;

const processFiles = (files, categoryId) => {
  return files.map((f, index) => ({
    ...f,
    id: `${categoryId}-${index}-${f.year || 'no-year'}`,
    url: getFullUrl(f.path),
  }));
};
const yearRegex = /^(\d{4}).*$/;

const examJsonArr = [
  '2000年国家公务员考试行测真题',
  '2001年国家公务员考试行测真题',
  '2002年国家公务员考试行测真题（A卷）',
  '2002年国家公务员考试行测真题（B卷）',
  '2003年国家公务员考试行测真题（A卷）',
  '2003年国家公务员考试行测真题（B卷）',
  '2004年国家公务员考试行测真题（A卷）',
  '2004年国家公务员考试行测真题（B卷）',
  '2005年国家公务员考试行测真题（一）',
  '2005年国家公务员考试行测真题（二）',
  '2006年国家公务员考试行测真题',
  '2007年国家公务员考试行测真题',
  '2008年国家公务员考试行测真题',
  '2009年国家公务员考试行测真题',
  '2010年国家公务员考试行测真题',
  '2011年国家公务员考试行测真题',
  '2012年国家公务员考试行测真题',
  '2013年国家公务员考试行测真题',
  '2014年国家公务员考试行测真题',
  '2015年国家公务员考试行测真题（副省级）',
  '2015年国家公务员考试行测真题（地市级）',
  '2016年国家公务员考试行测真题（副省级）',
  '2016年国家公务员考试行测真题（地市级）',
  '2017年国家公务员考试行测真题（副省级）',
  '2017年国家公务员考试行测真题（地市级）',
  '2018年国家公务员考试行测真题（副省级）',
  '2018年国家公务员考试行测真题（地市级）',
  '2019年国家公务员考试行测真题（省级）',
  '2019年国家公务员考试行测真题（地市级）',
  '2020年国家公务员考试行测真题（副省级）',
  '2020年国家公务员考试行测真题（地市级）',
  '2021年国家公务员考试行测真题（副省级）',
  '2021年国家公务员考试行测真题（市地级）',
  '2022年国家公务员考试行测真题（副省级）',
  '2022年国家公务员考试行测真题（行政执法）',
  '2024年国家公务员考试行测真题（副省级）',
  '2024年国家公务员考试行测真题（地市级）',
  '2024年国家公务员考试行测真题（行政执法）',
  '2025年国家公务员考试行测真题（副省级）',
  '2025年国家公务员考试行测真题（地市级）',
  '2025年国家公务员考试行测真题（行政执法）',
  '2026年国家公务员考试行测真题（副省级）',
  '2026年国家公务员考试行测真题（地市级）',
  '2026年国家公务员考试行测真题（行政执法）',
];

const examJsonFiles = examJsonArr.map(name => ({
  year: name.replace(yearRegex, '$1'),
  name,
  path: `${BASE_PATH}/json/${name}.json`,
}));

export const categories = [
  { label: '国考行测', value: 'xingce-zhenti' },
  { label: '国考行测答案', value: 'xingce-answer' },
  { label: '国考申论', value: 'shenlun' },
  { label: '省考行测', value: 'province-xingce' },
  { label: '省考行测答案', value: 'province-xingce-answer' },
  { label: '省考申论', value: 'province-shenlun' },
  { label: '答题卡', value: 'answer-sheet' },
];

const shenlunArr = [
  '2000年国家公务员考试申论真题.pdf',
  '2001年国家公务员考试申论真题.pdf',
  '2002年国家公务员考试申论真题.pdf',
  '2003年国家公务员考试申论真题.pdf',
  '2004年国家公务员考试申论真题.pdf',
  '2005年国家公务员考试申论真题.pdf',
  '2006年国家公务员考试申论真题.pdf',
  '2007年国家公务员考试申论真题.pdf',
  '2008年国家公务员考试申论真题.pdf',
  '2009年国家公务员考试申论真题（地市副省合卷）.pdf',
  '2010年国家公务员考试申论真题（副省级）.pdf',
  '2010年国家公务员考试申论真题（地市级）.pdf',
  '2011年国家公务员考试申论真题（副省级）.pdf',
  '2011年国家公务员考试申论真题（地市级）.pdf',
  '2012年国家公务员考试申论真题（副省级）.pdf',
  '2012年国家公务员考试申论真题（地市级）.pdf',
  '2013年国家公务员考试申论真题（副省级）.pdf',
  '2013年国家公务员考试申论真题（地市级）.pdf',
  '2014年国家公务员考试申论真题（副省级）.pdf',
  '2014年国家公务员考试申论真题（地市级）.pdf',
  '2015年国家公务员考试申论真题（副省级）.pdf',
  '2015年国家公务员考试申论真题（地市级）.pdf',
  '2016年国家公务员考试申论真题（副省级）.pdf',
  '2016年国家公务员考试申论真题（地市级）.pdf',
  '2017年国家公务员考试申论真题（副省级）.pdf',
  '2017年国家公务员考试申论真题（地市级）.pdf',
  '2018年国家公务员考试申论真题（副省级）.pdf',
  '2018年国家公务员考试申论真题（地市级）.pdf',
  '2019年国家公务员考试申论真题（副省级）.pdf',
  '2019年国家公务员考试申论真题（地市级）.pdf',
  '2020年国家公务员考试申论真题（副省级）.pdf',
  '2020年国家公务员考试申论真题（地市级）.pdf',
  '2021年国家公务员考试申论真题（副省级）.pdf',
  '2021年国家公务员考试申论真题（地市级）.pdf',
  '2022年国家公务员考试申论真题（副省级）.pdf',
  '2022年国家公务员考试申论真题（地市级）.pdf',
  '2022年国家公务员考试申论真题（行政执法）.pdf',
  '2023年国家公务员考试申论真题（副省级）.pdf',
  '2023年国家公务员考试申论真题（地市级）.pdf',
  '2023年国家公务员考试申论真题（行政执法）.pdf',
  '2024年国家公务员考试申论真题（副省级）.pdf',
  '2024年国家公务员考试申论真题（地市级）.pdf',
  '2024年国家公务员考试申论真题（行政执法）.pdf',
  '2025年国家公务员考试申论真题（副省级）.pdf',
  '2025年国家公务员考试申论真题（地市级）.pdf',
  '2025年国家公务员考试申论真题（行政执法）.pdf',
  '2026年国家公务员考试申论真题（行政执法）.pdf',
];
const shenlunFiles = processFiles(
  shenlunArr.map(name => ({
    year: name.replace(yearRegex, '$1'),
    name,
    path: `${BASE_PATH}/申论-真题/${name}`,
  })),
  'shenlun'
);

const xingceZentiArr = [
  '2000年国家公务员考试行测真题.pdf',
  '2001年国家公务员考试行测真题.pdf',
  '2002年国家公务员考试行测真题（A卷）.pdf',
  '2002年国家公务员考试行测真题（B卷）.pdf',
  '2003年国家公务员考试行测真题（A卷）.pdf',
  '2003年国家公务员考试行测真题（B卷）.pdf',
  '2004年国家公务员考试行测真题（A卷）.pdf',
  '2004年国家公务员考试行测真题（B卷）.pdf',
  '2005年国家公务员考试行测真题（一）.pdf',
  '2005年国家公务员考试行测真题（二）.pdf',
  '2006年国家公务员考试行测真题.pdf',
  '2007年国家公务员考试行测真题.pdf',
  '2008年国家公务员考试行测真题.pdf',
  '2009年国家公务员考试行测真题.pdf',
  '2010年国家公务员考试行测真题.pdf',
  '2011年国家公务员考试行测真题.pdf',
  '2012年国家公务员考试行测真题.pdf',
  '2013年国家公务员考试行测真题.pdf',
  '2014年国家公务员考试行测真题.pdf',
  '2015年国家公务员考试行测真题（副省级）.pdf',
  '2015年国家公务员考试行测真题（地市级）.pdf',
  '2016年国家公务员考试行测真题（副省级）.pdf',
  '2016年国家公务员考试行测真题（地市级）.pdf',
  '2017年国家公务员考试行测真题（副省级）.pdf',
  '2017年国家公务员考试行测真题（地市级）.pdf',
  '2018年国家公务员考试行测真题（副省级）.pdf',
  '2018年国家公务员考试行测真题（地市级）.pdf',
  '2019年国家公务员考试行测真题（省级）.pdf',
  '2019年国家公务员考试行测真题（地市级）.pdf',
  '2020年国家公务员考试行测真题（副省级）.pdf',
  '2020年国家公务员考试行测真题（地市级）.pdf',
  '2021年国家公务员考试行测真题（副省级）.pdf',
  '2021年国家公务员考试行测真题（市地级）.pdf',
  '2022年国家公务员考试行测真题（副省级）.pdf',
  '2022年国家公务员考试行测真题（地市级）.pdf',
  '2022年国家公务员考试行测真题（行政执法）.pdf',
  '2023年国家公务员考试行测真题（副省级）.pdf',
  '2023年国家公务员考试行测真题（地市级）.pdf',
  '2023年国家公务员考试行测真题（行政执法）.pdf',
  '2024年国家公务员考试行测真题（副省级）.pdf',
  '2024年国家公务员考试行测真题（地市级）.pdf',
  '2024年国家公务员考试行测真题（行政执法）.pdf',
  '2025年国家公务员考试行测真题（副省级）.pdf',
  '2025年国家公务员考试行测真题（地市级）.pdf',
  '2025年国家公务员考试行测真题（行政执法）.pdf',
  '2026年国家公务员考试行测真题（副省级）.pdf',
  '2026年国家公务员考试行测真题（地市级）.pdf',
  '2026年国家公务员考试行测真题（行政执法）.pdf',
];
const xingceZhentiFiles = processFiles(
  xingceZentiArr.map(name => {
    const year = name.replace(yearRegex, '$1');
    let jsonFile = null;

    const versionPatterns = [
      '副省级',
      '地市级',
      '市地级',
      '行政执法',
      '省级',
      'A卷',
      'B卷',
      '（一）',
      '（二）',
    ];
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
      path: `${BASE_PATH}/行测-真题/${name}`,
      examJsonFile: jsonFile || null,
    };
  }),
  'xingce-zhenti'
);

const xingceAnswerArr = [
  '2000年国家公务员考试行测真题_答案解析.pdf',
  '2001年国家公务员考试行测真题_答案解析.pdf',
  '2002年国家公务员考试行测真题（A卷）_答案解析.pdf',
  '2002年国家公务员考试行测真题（B卷）_答案解析.pdf',
  '2003年国家公务员考试行测真题（A卷）_答案解析.pdf',
  '2003年国家公务员考试行测真题（B卷）_答案解析.pdf',
  '2004年国家公务员考试行测真题（A卷）_答案解析.pdf',
  '2004年国家公务员考试行测真题（B卷）_答案解析.pdf',
  '2005年国家公务员考试行测真题（一）_答案解析.pdf',
  '2005年国家公务员考试行测真题（二）_答案解析.pdf',
  '2006年国家公务员考试行测真题_答案解析.pdf',
  '2007年国家公务员考试行测真题_答案解析.pdf',
  '2008年国家公务员考试行测真题_答案解析.pdf',
  '2009年国家公务员考试行测真题_答案解析.pdf',
  '2010年国家公务员考试行测真题_答案解析.pdf',
  '2011年国家公务员考试行测真题_答案解析.pdf',
  '2012年国家公务员考试行测真题_答案解析.pdf',
  '2013年国家公务员考试行测真题_答案解析.pdf',
  '2014年国家公务员考试行测真题_答案解析.pdf',
  '2015年国家公务员考试行测真题（副省级）_答案解析.pdf',
  '2015年国家公务员考试行测真题（地市级）_答案解析.pdf',
  '2016年国家公务员考试行测真题（副省级）_答案解析.pdf',
  '2016年国家公务员考试行测真题（地市级）_答案解析.pdf',
  '2017年国家公务员考试行测真题（副省级）_答案解析.pdf',
  '2017年国家公务员考试行测真题（地市级）_答案解析.pdf',
  '2018年国家公务员考试行测真题（副省级）_答案解析.pdf',
  '2018年国家公务员考试行测真题（地市级）_答案解析.pdf',
  '2019年国家公务员考试行测真题（省级）_答案解析.pdf',
  '2019年国家公务员考试行测真题（地市级）_答案解析.pdf',
  '2020年国家公务员考试行测真题（副省级）_答案解析.pdf',
  '2020年国家公务员考试行测真题（地市级）_答案解析.pdf',
  '2021年国家公务员考试行测真题（副省级）_答案解析.pdf',
  '2021年国家公务员考试行测真题（市地级）_答案解析.pdf',
  '2022年国家公务员考试行测真题（副省级）_答案解析.pdf',
  '2022年国家公务员考试行测真题（地市级）_答案解析.pdf',
  '2022年国家公务员考试行测真题（行政执法）_答案解析.pdf',
  '2023年国家公务员考试行测真题（副省级）_答案解析.pdf',
  '2023年国家公务员考试行测真题（地市级）_答案解析.pdf',
  '2023年国家公务员考试行测真题（行政执法）_答案解析.pdf',
  '2024年国家公务员考试行测真题（副省级）_答案解析.pdf',
  '2024年国家公务员考试行测真题（地市级）_答案解析.pdf',
  '2024年国家公务员考试行测真题（行政执法）_答案解析.pdf',
  '2025年国家公务员考试行测真题（副省级）_答案解析.pdf',
  '2025年国家公务员考试行测真题（地市级）_答案解析.pdf',
  '2025年国家公务员考试行测真题（行政执法）_答案解析.pdf',
  '2026年国家公务员考试行测真题（副省级）_答案解析.pdf',
  '2026年国家公务员考试行测真题（地市级）_答案解析.pdf',
  '2026年国家公务员考试行测真题（行政执法）_答案解析.pdf',
];
const xingceAnswerFiles = processFiles(
  xingceAnswerArr.map(name => ({
    year: name.replace(yearRegex, '$1'),
    name,
    path: `${BASE_PATH}/行测-答案解析/${name}`,
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

const provinceXingceZhentiFiles = provinceXingceZhentiArr.map((name, index) => ({
  id: `province-xingce-zhenti-${index}-${name.replace(yearRegex, '$1')}`,
  name,
  year: name.replace(yearRegex, '$1'),
  url: getProvinceXingceUrl(name),
})).sort((pre, next) => next.year - pre.year);

const provinceXingceAnswerFiles = provinceXingceAnswerArr.map((name, index) => ({
  id: `province-xingce-answer-${index}-${name.replace(yearRegex, '$1')}`,
  name,
  year: name.replace(yearRegex, '$1'),
  url: getProvinceXingceUrl(name),
})).sort((pre, next) => next.year - pre.year);

const provinceShenlunZhentiFiles = provinceShenlunZhentiArr.map((name, index) => ({
  id: `province-shenlun-zhenti-${index}-${name.replace(yearRegex, '$1')}`,
  name,
  year: name.replace(yearRegex, '$1'),
  url: getProvinceShenlunUrl(name),
}));

const provinceShenlunAnswerFiles = provinceShenlunAnswerArr.map((name, index) => ({
  id: `province-shenlun-answer-${index}-${name.replace(yearRegex, '$1')}`,
  name,
  year: name.replace(yearRegex, '$1'),
  url: getProvinceShenlunUrl(name),
}));

const provinceShenlunFiles = [...provinceShenlunZhentiFiles, ...provinceShenlunAnswerFiles].sort((pre, next) => next.year - pre.year);

const allFiles = {
  shenlun: shenlunFiles.sort((pre, next) => next.year - pre.year),
  'xingce-zhenti': xingceZhentiFiles.sort((pre, next) => next.year - pre.year),
  'province-xingce': provinceXingceZhentiFiles,
  'province-xingce-answer': provinceXingceAnswerFiles,
  'province-shenlun': provinceShenlunFiles,
  'xingce-answer': xingceAnswerFiles.sort((pre, next) => next.year - pre.year),
  'answer-sheet': answerSheetFiles,
};

export function useCivilServantExam() {
  const activeCategory = ref('xingce-zhenti');  
  const searchKeyword = ref('');

  const filteredFiles = computed(() => {
    let files = allFiles[activeCategory.value] || [];
    
    if (searchKeyword.value.trim()) {
      const keyword = searchKeyword.value.trim().toLowerCase();
      files = files.filter(file => 
        file.name.toLowerCase().includes(keyword)
      );
    }
    
    return files;
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
    searchKeyword,
    filteredFiles,
    getFileUrl,
    getFileName,
    loadExamData,
    examJsonFiles,
    getExamFileUrl,
  };
}
