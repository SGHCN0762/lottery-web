import { quotes } from './quotes';
import { poems } from './poems';
import { essays } from './essays';

let allItems = [];
let initialized = false;

const generateId = (type, stage, index) => {
  return `${type}_${stage}_${index}`;
};

export const initData = async () => {
  if (initialized) return;

  const items = [];

  quotes.forEach((q, idx) => {
    items.push({
      id: generateId('quote', q.stage, idx),
      type: 'quote',
      stage: q.stage,
      content: q.content,
      author: q.author,
      source: q.source || '',
      tags: q.tags || [],
      meaning: q.meaning || '',
      appreciation: q.appreciation || '',
      examples: q.examples || [],
    });
  });

  poems.forEach((p, idx) => {
    items.push({
      id: generateId('poem', p.stage, idx),
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
    });
  });

  essays.forEach((e, idx) => {
    items.push({
      id: generateId('essay', e.stage, idx),
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
    });
  });

  allItems = items;
  initialized = true;
};

export const getAllItems = () => allItems;

export const getItemsByType = (type) => {
  if (type === 'all') return allItems;
  return allItems.filter(item => item.type === type);
};

export const getItemsByStage = (stage) => {
  if (stage === 'all') return allItems;
  return allItems.filter(item => item.stage === stage);
};

export const getItemsByTypeAndStage = (type, stage) => {
  let result = allItems;
  if (type !== 'all') {
    result = result.filter(item => item.type === type);
  }
  if (stage !== 'all') {
    result = result.filter(item => item.stage === stage);
  }
  return result;
};

export const getItemById = (id) => {
  return allItems.find(item => item.id === id);
};

export const searchItems = (keyword) => {
  const kw = keyword.toLowerCase();
  return allItems.filter(item => {
    if (item.type === 'quote') {
      return (
        item.content.toLowerCase().includes(kw) ||
        item.author.toLowerCase().includes(kw) ||
        (item.source && item.source.toLowerCase().includes(kw)) ||
        (item.meaning && item.meaning.toLowerCase().includes(kw))
      );
    } else if (item.type === 'poem') {
      return (
        item.title.toLowerCase().includes(kw) ||
        item.author.toLowerCase().includes(kw) ||
        item.content.toLowerCase().includes(kw) ||
        (item.translation && item.translation.toLowerCase().includes(kw))
      );
    } else if (item.type === 'essay') {
      return (
        item.title.toLowerCase().includes(kw) ||
        item.author.toLowerCase().includes(kw) ||
        item.content.toLowerCase().includes(kw) ||
        (item.translation && item.translation.toLowerCase().includes(kw))
      );
    }
    return false;
  });
};

export const getTotalCount = () => allItems.length;

export const getTypeCount = (type) => getItemsByType(type).length;

export const getStageCount = (stage) => getItemsByStage(stage).length;
