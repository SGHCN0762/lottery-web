import { partyConferences } from './partyHistoryData.js';

const periodMap = {
  '新民主主义革命时期': 'revolution',
  '社会主义革命和建设时期': 'construction',
  '改革开放和现代化建设新时期': 'reform',
  '中国特色社会主义新时代': 'new_era'
};

const periodLabels = {
  'revolution': '新民主主义革命时期',
  'construction': '社会主义革命和建设时期',
  'reform': '改革开放和现代化建设新时期',
  'new_era': '中国特色社会主义新时代'
};

export const partyHistoryData = partyConferences.map(conference => {
  const content = `## ${conference.meeting}

### 基本信息

**年份**：${conference.year}年  
**日期**：${conference.date}  
**地点**：${conference.location}  

### 会议概述

${conference.summary}

### 核心要点

${conference.keyPoints.map((point, index) => `${index + 1}. ${point}`).join('\n')}

### 重要思想

${conference.importantIdeas.map(idea => `• ${idea}`).join('\n')}

### 历史意义

${conference.significance}

### 考点聚焦

${conference.examFocus.map(focus => `• ${focus}`).join('\n')}`;

  return {
    id: conference.id,
    title: conference.meeting,
    chapter: `${conference.year}年 · ${conference.location}`,
    stage: periodMap[conference.period] || 'revolution',
    tags: conference.importantIdeas,
    content,
    exercises: (conference.exercises || []).map((ex, index) => ({
      id: `${conference.id}_q${index + 1}`,
      question: ex.question,
      options: ex.options,
      answer: ex.answer,
      explanation: ex.explanation
    }))
  };
});

export const stageLabels = periodLabels;