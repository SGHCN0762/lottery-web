let allItems = [];
let initialized = false;

const generateId = (stage, index) => {
  return `essay_${stage}_${index}`;
};

export const initData = async () => {
  if (initialized) return;

  try {
    const response = await fetch(`${import.meta.env.BASE_URL}classical-essays/essays.json`);
    const essays = await response.json();

    const items = essays.map((e, idx) => ({
      id: generateId(e.stage, idx),
      type: 'essay',
      stage: e.stage,
      title: e.title,
      author: e.author,
      dynasty: e.dynasty || '',
      content: e.content,
      tags: e.tags || [],
      translation: e.translation || '',
      appreciation: e.appreciation || '',
      background: e.background || '',
      keySentences: e.keySentences || [],
      vocabulary: e.vocabulary || [],
    }));

    allItems = items;
    initialized = true;
  } catch (error) {
    console.error('Failed to load essays data:', error);
    throw error;
  }
};

export const getAllItems = () => allItems;

export const getItemsByStage = (stage) => {
  if (stage === 'all') return allItems;
  return allItems.filter(item => item.stage === stage);
};

export const getItemById = (id) => {
  return allItems.find(item => item.id === id);
};

export const searchItems = (keyword) => {
  const kw = keyword.toLowerCase();
  return allItems.filter(item => (
    item.title.toLowerCase().includes(kw) ||
    item.author.toLowerCase().includes(kw) ||
    item.dynasty.toLowerCase().includes(kw) ||
    item.content.toLowerCase().includes(kw) ||
    (item.translation && item.translation.toLowerCase().includes(kw)) ||
    (item.tags && item.tags.some(tag => tag.toLowerCase().includes(kw)))
  ));
};

export const getTotalCount = () => allItems.length;

export const getStageCount = (stage) => getItemsByStage(stage).length;
