let allItems = [];
let initialized = false;

const generateId = (stage, index) => {
  return `quote_${stage}_${index}`;
};

export const initData = async () => {
  if (initialized) return;

  try {
    const response = await fetch(`${import.meta.env.BASE_URL}famous-quotes/quotes.json`);
    const quotes = await response.json();

    const items = quotes.map((q, idx) => ({
      id: generateId(q.stage, idx),
      type: 'quote',
      stage: q.stage,
      content: q.content,
      author: q.author,
      source: q.source || '',
      meaning: q.meaning || '',
      appreciation: q.appreciation || '',
      examples: q.examples || [],
      tags: q.tags || [],
    }));

    allItems = items;
    initialized = true;
  } catch (error) {
    console.error('Failed to load quotes data:', error);
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
    item.content.toLowerCase().includes(kw) ||
    item.author.toLowerCase().includes(kw) ||
    item.source.toLowerCase().includes(kw) ||
    (item.meaning && item.meaning.toLowerCase().includes(kw)) ||
    (item.appreciation && item.appreciation.toLowerCase().includes(kw)) ||
    (item.tags && item.tags.some(tag => tag.toLowerCase().includes(kw)))
  ));
};

export const getTotalCount = () => allItems.length;

export const getStageCount = (stage) => getItemsByStage(stage).length;
