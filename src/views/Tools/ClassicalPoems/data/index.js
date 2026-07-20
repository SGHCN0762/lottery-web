let allItems = [];
let initialized = false;

const generateId = (stage, index) => {
  return `poem_${stage}_${index}`;
};

// 将原始诗词数据适配为统一模板格式
const adaptItem = (p, idx) => {
  const id = generateId(p.stage, idx);
  // content 字段：诗词正文 + 译文 + 赏析 + 背景 + 名句，拼成 Markdown
  const sections = [];
  sections.push(`## ${p.title}`);
  sections.push(`*${p.author}${p.dynasty ? `·${p.dynasty}` : ''}*`);
  sections.push('');
  sections.push('### 原文');
  sections.push(p.content);
  if (p.translation) sections.push(`\n### 译文\n${p.translation}`);
  if (p.appreciation) sections.push(`\n### 赏析\n${p.appreciation}`);
  if (p.background) sections.push(`\n### 背景\n${p.background}`);
  if (p.keySentences && p.keySentences.length > 0) {
    sections.push(`\n### 名句\n${p.keySentences.map(s => `- ${s}`).join('\n')}`);
  }
  const content = sections.join('\n');

  // chapter 字段：作者·朝代
  const chapter = p.dynasty ? `${p.author}·${p.dynasty}` : p.author;

  return {
    id,
    title: p.title,
    chapter,
    stage: p.stage,
    content,
    tags: p.tags || [],
  };
};

export const initData = async () => {
  if (initialized) return;

  try {
    const response = await fetch(`${import.meta.env.BASE_URL}classical-poems/poems.json`);
    const poems = await response.json();
    allItems = poems.map((p, idx) => adaptItem(p, idx));
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

export const getItemById = (id) => allItems.find(item => item.id === id);

export const getTotalCount = () => allItems.length;

export const getStageCount = (stage) => getItemsByStage(stage).length;

// 生成选择题练习
export const generateExercises = () => {
  if (allItems.length === 0) return [];
  const exercises = [];
  allItems.forEach((item, idx) => {
    const sameStage = allItems.filter(i => i.stage === item.stage && i.id !== item.id);
    if (sameStage.length < 3) return;
    const distractors = [...sameStage].sort(() => Math.random() - 0.5).slice(0, 3);
    // 题型1：问作者
    const author = item.chapter.split('·')[0].trim();
    const options1 = [author, ...distractors.map(d => d.chapter.split('·')[0].trim())];
    const uniq1 = [...new Set(options1)];
    if (uniq1.length >= 4) {
      const shuffled = uniq1.slice(0, 4).sort(() => Math.random() - 0.5);
      exercises.push({
        id: `poem_ex_${idx}_1`,
        question: `《${item.title}》的作者是？`,
        options: shuffled,
        answer: shuffled.indexOf(author),
        explanation: `《${item.title}》作者为${author}。`,
      });
    }
    // 题型2：问朝代
    const dynasty = item.chapter.split('·')[1]?.trim();
    if (dynasty) {
      const dynastyDistractors = [...new Set(sameStage.map(d => d.chapter.split('·')[1]?.trim()).filter(Boolean))];
      if (dynastyDistractors.length >= 3) {
        const opts = [dynasty, ...dynastyDistractors.sort(() => Math.random() - 0.5).slice(0, 3)];
        const uniqOpts = [...new Set(opts)].slice(0, 4);
        if (uniqOpts.length >= 4) {
          const shuffled = uniqOpts.sort(() => Math.random() - 0.5);
          exercises.push({
            id: `poem_ex_${idx}_2`,
            question: `《${item.title}》的作者是哪个朝代的人？`,
            options: shuffled,
            answer: shuffled.indexOf(dynasty),
            explanation: `《${item.title}》作者${author}是${dynasty}代人。`,
          });
        }
      }
    }
  });
  return exercises;
};
