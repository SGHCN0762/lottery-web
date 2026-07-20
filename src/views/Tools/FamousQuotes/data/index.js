let allItems = [];
let initialized = false;

const generateId = (stage, index) => {
  return `quote_${stage}_${index}`;
};

// 将原始名言数据适配为统一模板格式
const adaptItem = (q, idx) => {
  const id = generateId(q.stage, idx);
  // content 字段：名言正文 + 含义 + 赏析 + 例句，拼成 Markdown
  const sections = [];
  sections.push(`> ${q.content}`);
  sections.push('');
  sections.push(`**作者**：${q.author}${q.source ? `　《${q.source}》` : ''}`);
  if (q.meaning) sections.push(`\n### 含义\n${q.meaning}`);
  if (q.appreciation) sections.push(`\n### 赏析\n${q.appreciation}`);
  if (q.examples && q.examples.length > 0) {
    sections.push(`\n### 例句\n${q.examples.map(e => `- ${e}`).join('\n')}`);
  }
  const content = sections.join('\n');

  // chapter 字段：作者 + 出处
  const chapter = q.source ? `${q.author}《${q.source}》` : q.author;

  // title 字段：截断 content 作为标题
  const title = q.content.length > 20 ? q.content.slice(0, 20) + '…' : q.content;

  return {
    id,
    title,
    chapter,
    stage: q.stage,
    content,
    tags: q.tags || [],
  };
};

export const initData = async () => {
  if (initialized) return;

  try {
    const response = await fetch(`${import.meta.env.BASE_URL}famous-quotes/quotes.json`);
    const quotes = await response.json();
    allItems = quotes.map((q, idx) => adaptItem(q, idx));
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

export const getItemById = (id) => allItems.find(item => item.id === id);

export const getTotalCount = () => allItems.length;

export const getStageCount = (stage) => getItemsByStage(stage).length;

// 生成选择题练习
export const generateExercises = () => {
  if (allItems.length === 0) return [];
  const exercises = [];
  allItems.forEach((item, idx) => {
    // 从同阶段取3个干扰项
    const sameStage = allItems.filter(i => i.stage === item.stage && i.id !== item.id);
    if (sameStage.length < 3) return;
    const distractors = [...sameStage].sort(() => Math.random() - 0.5).slice(0, 3);
    // 题型1：问作者
    const options1 = [item.chapter.split('《')[0].trim(), ...distractors.map(d => d.chapter.split('《')[0].trim())];
    // 去重
    const uniqOptions1 = [...new Set(options1)];
    if (uniqOptions1.length >= 4) {
      const opts = uniqOptions1.slice(0, 4);
      const correct = item.chapter.split('《')[0].trim();
      // 打乱
      const shuffled = [...opts].sort(() => Math.random() - 0.5);
      exercises.push({
        id: `quote_ex_${idx}_1`,
        question: `「${item.title}」的作者是？`,
        options: shuffled,
        answer: shuffled.indexOf(correct),
        explanation: `出自${item.chapter}。`,
      });
    }
  });
  return exercises;
};
