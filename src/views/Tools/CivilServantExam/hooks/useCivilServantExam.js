import { ref, computed } from 'vue';
import { provinceXingceZhentiArr, provinceXingceAnswerArr } from './provinceXingceFiles';
import { provinceShenlunZhentiArr, provinceShenlunAnswerArr } from './provinceShenlunFiles';
import { xingceZhentiFiles, xingceAnswerFiles, examJsonFiles } from './countryXingceFiles';
import { shenlunFiles } from './countryShenlunFiles';
import { answerSheetFiles } from './answerSheetFiles';
import { BASE_PATH, getFullUrl, getProvinceXingceUrl, getProvinceShenlunUrl, getCountryXingceJsonUrl, getProvinceXingceJsonUrl, getCountryShenlunJsonUrl, getProvinceShenlunJsonUrl } from './config';

export {
  getCountryXingceJsonUrl,
  getProvinceXingceJsonUrl,
  getCountryShenlunJsonUrl,
  getProvinceShenlunJsonUrl,
};

const yearRegex = /^(\d{4}).*$/;

const provinceXingceJsonArr = provinceXingceZhentiArr.map(name => {
  return name.replace(/\.pdf$/, '');
});

const provinceXingceJsonFiles = provinceXingceJsonArr.map(name => ({
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

const provinceXingceZhentiFiles = provinceXingceZhentiArr.map((name, index) => {
  const year = name.replace(yearRegex, '$1');
  const jsonFileName = name.replace(/\.pdf$/, '');
  const jsonFile = provinceXingceJsonFiles.find(jf => jf.name === jsonFileName);

  return {
    id: `province-xingce-zhenti-${index}-${year}`,
    name,
    year,
    url: getProvinceXingceUrl(name),
    examJsonFile: jsonFile || null,
  };
}).sort((pre, next) => next.year - pre.year);

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