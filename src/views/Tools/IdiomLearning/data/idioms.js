let idiomCategories = {};
let idioms = [];
let dataLoaded = false;

const loadData = async () => {
  if (dataLoaded) return;
  try {
    const response = await fetch('/lottery-web/idiom-learning/idioms.json');
    const data = await response.json();
    idiomCategories = data.categories || {};
    idioms = data.idioms || [];
    dataLoaded = true;
  } catch (error) {
    console.error('Failed to load idiom data:', error);
    idiomCategories = {
      animals: { name: '动物类', icon: '🐯', description: '以动物为意象的成语' },
      nature: { name: '自然类', icon: '🌿', description: '描绘自然景观的成语' },
      emotions: { name: '情感类', icon: '💝', description: '表达情感心境的成语' },
      wisdom: { name: '智慧类', icon: '💡', description: '蕴含哲理智慧的成语' },
      effort: { name: '努力类', icon: '⚡', description: '形容勤奋努力的成语' },
      talent: { name: '才华类', icon: '✨', description: '赞美才华能力的成语' },
      relations: { name: '人际类', icon: '🤝', description: '描述人际关系的成语' },
      history: { name: '历史类', icon: '📜', description: '源自历史典故的成语' }
    };
    idioms = [];
  }
};

export const initIdioms = async () => {
  await loadData();
};

export const getIdiomCategories = () => idiomCategories;

export const getIdioms = () => idioms;

export const getTotalCount = () => idioms.length;

export const getCountByCategory = (category) => {
  if (!category || category === 'all') return idioms.length;
  return idioms.filter(item => item.category === category).length;
};

export const getIdiomsByCategory = (category) => {
  if (!category || category === 'all') return [...idioms];
  return idioms.filter(item => item.category === category);
};

export const searchIdioms = (keyword) => {
  if (!keyword) return [...idioms];
  const lowerKeyword = keyword.toLowerCase();
  return idioms.filter(item =>
    item.word.includes(keyword) ||
    item.pinyin.includes(lowerKeyword) ||
    item.meaning.includes(keyword)
  );
};

export const getIdiomById = (id) => {
  return idioms.find(item => item.id === id);
};
