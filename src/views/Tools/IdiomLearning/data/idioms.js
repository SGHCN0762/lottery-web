let idioms = [];
let adaptedItems = [];
let dataLoaded = false;

// category 到 stage 的映射
const categoryToStage = (categories) => {
  if (!categories || categories.length === 0) return 'civil';
  const map = {
    nature: 'primary',
    animals: 'primary',
    emotions: 'middle',
    wisdom: 'middle',
    effort: 'high',
    talent: 'high',
    relations: 'civil',
    history: 'civil',
    character: 'civil',
    philosophy: 'civil',
  };
  for (const cat of categories) {
    if (map[cat]) return map[cat];
  }
  return 'civil';
};

// category 到中文标签的映射（用于tags显示）
const categoryToTag = (category) => {
  const map = {
    nature: '自然类',
    animals: '动物类',
    emotions: '情感类',
    wisdom: '智慧类',
    effort: '努力类',
    talent: '才华类',
    relations: '人际类',
    history: '历史类',
    character: '性格类',
    philosophy: '哲理类',
  };
  return map[category] || category;
};

// 将原始成语数据适配为统一模板格式
const adaptItem = (raw, idx) => {
  const stage = categoryToStage(raw.categories);
  const id = `idiom_${stage}_${idx}`;
  // content 字段：拼音 + 含义 + 出处 + 典故 + 例句，拼成 Markdown
  const sections = [];
  sections.push(`## ${raw.word}`);
  sections.push(`*拼音：${raw.pinyin || ''}*`);
  sections.push('');
  if (raw.meaning) sections.push(`### 含义\n${raw.meaning}`);
  if (raw.origin) sections.push(`\n### 出处\n${raw.origin}`);
  if (raw.story && raw.story !== raw.origin) sections.push(`\n### 典故\n${raw.story}`);
  if (raw.example) sections.push(`\n### 例句\n${raw.example}`);
  const content = sections.join('\n');

  return {
    id,
    title: raw.word,
    chapter: raw.pinyin || '',
    stage,
    content,
    tags: (raw.categories || []).map(cat => categoryToTag(cat)),
    // 用于生成练习题
    meaning: raw.meaning || '',
  };
};

const loadData = async () => {
  if (dataLoaded) return;
  try {
    const indexResponse = await fetch('/lottery-web/idiom-learning/idioms_index.json');
    const indexData = await indexResponse.json();
    const numFiles = indexData.meta?.num_files || 10;

    const promises = [];
    for (let i = 1; i <= numFiles; i++) {
      const fileName = `idioms_${String(i).padStart(2, '0')}.json`;
      promises.push(fetch(`/lottery-web/idiom-learning/${fileName}`));
    }

    const responses = await Promise.all(promises);
    const allData = await Promise.all(responses.map(r => r.json()));

    idioms = allData.flatMap(d => d.idioms || []);
    adaptedItems = idioms.map((raw, idx) => adaptItem(raw, idx));
    dataLoaded = true;
  } catch (error) {
    console.error('Failed to load idiom data:', error);
    idioms = [];
    adaptedItems = [];
  }
};

export const initIdioms = async () => {
  await loadData();
};

export const initData = async () => {
  await loadData();
};

export const getAllItems = () => adaptedItems;

export const getItemsByStage = (stage) => {
  if (stage === 'all') return adaptedItems;
  return adaptedItems.filter(item => item.stage === stage);
};

export const getItemById = (id) => adaptedItems.find(item => item.id === id);

export const getTotalCount = () => adaptedItems.length;

export const getStageCount = (stage) => getItemsByStage(stage).length;

// 兼容旧接口
export const getIdioms = () => idioms;
export const getIdiomCategories = async () => ({});
export const getCountByCategory = (category) => {
  if (!category || category === 'all') return idioms.length;
  return idioms.filter(item => item.categories && item.categories.includes(category)).length;
};
export const getIdiomsByCategory = (category) => {
  if (!category || category === 'all') return [...idioms];
  return idioms.filter(item => item.categories && item.categories.includes(category));
};
export const searchIdioms = (keyword) => {
  if (!keyword) return [...idioms];
  const lowerKeyword = keyword.toLowerCase();
  return idioms.filter(item =>
    item.word.includes(keyword) ||
    (item.pinyin || '').includes(lowerKeyword) ||
    (item.meaning || '').includes(keyword)
  );
};
export const getIdiomById = (id) => idioms.find(item => item.id === id || `idiom_${item.stage}_0` === id);
export const getRandomIdioms = (count = 10) => {
  const shuffled = [...idioms].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
export const getDailyIdiom = () => {
  const day = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  return idioms[day % idioms.length];
};
export const getIdiomsByRange = (start, end) => idioms.slice(start, end);

// 生成选择题练习（取前200条避免过多）
export const generateExercises = () => {
  if (adaptedItems.length === 0) return [];
  const exercises = [];
  const pool = adaptedItems.slice(0, 200);
  pool.forEach((item, idx) => {
    const meaning = item.meaning;
    if (!meaning) return;
    // 干扰项从同 stage 取，不足则从全局取
    let candidates = adaptedItems.filter(i => i.stage === item.stage && i.id !== item.id && i.meaning);
    if (candidates.length < 3) candidates = adaptedItems.filter(i => i.id !== item.id && i.meaning);
    if (candidates.length < 3) return;
    const distractors = [...candidates].sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [meaning, ...distractors.map(d => d.meaning)];
    const uniq = [...new Set(options)];
    if (uniq.length >= 4) {
      const shuffled = uniq.slice(0, 4).sort(() => Math.random() - 0.5);
      exercises.push({
        id: `idiom_ex_${idx}`,
        question: `「${item.title}」的意思是？`,
        options: shuffled,
        answer: shuffled.indexOf(meaning),
        explanation: `「${item.title}」：${meaning}`,
      });
    }
  });
  return exercises;
};
