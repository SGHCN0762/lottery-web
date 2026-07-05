let allItems = [];
let initialized = false;

const generateId = (stage, index) => {
  return `poem_${stage}_${index}`;
};

export const initData = async () => {
  if (initialized) return;

  try {
    const response = await fetch(`${import.meta.env.BASE_URL}classical-poems/poems.json`);
    const poems = await response.json();

    const items = poems.map((p, idx) => ({
      id: generateId(p.stage, idx),
      type: 'poem',
      stage: p.stage,
      title: p.title,
      author: p.author,
      dynasty: p.dynasty || '',
      content: p.content,
      tags: p.tags || [],
      translation: p.translation || '',
      appreciation: p.appreciation || '',
      background: p.background || '',
      keySentences: p.keySentences || [],
    }));

    allItems = items;
    initialized = true;
  } catch (error) {
    console.error('Failed to load poems data:', error);
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
