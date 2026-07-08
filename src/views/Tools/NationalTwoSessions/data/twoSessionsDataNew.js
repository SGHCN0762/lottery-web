import { twoSessionsData, twoSessionsSpeeches, twoSessionsTopics, yearList } from './twoSessionsData.js';
import { historicalReports, historicalSpeeches, historicalTopics } from './historicalData.js';

const stageMap = {
  'recent': '新时代（2021年至今）',
  'transition': '转型期（2011-2020年）',
  'early': '发展期（2005-2010年）',
  'reform': '改革开放初期（1978-2004年）',
  'revolution': '文革时期（1966-1977年）',
  'construction': '全面建设时期（1956-1965年）',
  'foundation': '建国初期（1949-1955年）'
};

const getStage = (year) => {
  if (year >= 2021) return 'recent';
  if (year >= 2011) return 'transition';
  if (year >= 2005) return 'early';
  if (year >= 1978) return 'reform';
  if (year >= 1966) return 'revolution';
  if (year >= 1956) return 'construction';
  return 'foundation';
};

const generateExercises = (year, report, speech, topics) => {
  const exercises = [];
  
  if (report) {
    if (year >= 1978) {
      exercises.push({
        question: `${year}年政府工作报告中，国内生产总值增长目标是多少？`,
        options: ['5%左右', '6%左右', '7%左右', '8%以上'],
        answer: year >= 2020 && year <= 2025 ? '5%左右' : 
                year >= 2016 && year <= 2019 ? '6%左右' : 
                year >= 2011 && year <= 2015 ? '7%左右' : '8%以上',
        explanation: `${year}年政府工作报告提出国内生产总值增长${year >= 2020 && year <= 2025 ? '5%左右' : year >= 2016 && year <= 2019 ? '6%左右' : year >= 2011 && year <= 2015 ? '7%左右' : '8%以上'}的目标。`
      });
    }
    
    exercises.push({
      question: `${year}年政府工作报告的发言人是谁？`,
      options: ['李克强', '温家宝', '朱镕基', '李鹏', '周恩来', '其他'],
      answer: year >= 2013 && year <= 2024 ? '李克强' : 
              year >= 2003 && year <= 2012 ? '温家宝' :
              year >= 1998 && year <= 2002 ? '朱镕基' :
              year >= 1988 && year <= 1997 ? '李鹏' :
              year >= 1954 && year <= 1975 ? '周恩来' : '其他',
      explanation: `${year}年政府工作报告由${year >= 2013 && year <= 2024 ? '李克强' : year >= 2003 && year <= 2012 ? '温家宝' : year >= 1998 && year <= 2002 ? '朱镕基' : year >= 1988 && year <= 1997 ? '李鹏' : year >= 1954 && year <= 1975 ? '周恩来' : '其他'}作报告。`
    });
  }
  
  if (speech) {
    exercises.push({
      question: `${year}年全国人大会议上，国家领导人强调的核心思想是什么？`,
      options: ['新发展理念', '科学发展观', '三个代表', '建设有中国特色社会主义', '社会主义现代化'],
      answer: year >= 2015 ? '新发展理念' : 
              year >= 2003 ? '科学发展观' :
              year >= 1997 ? '三个代表' :
              year >= 1982 ? '建设有中国特色社会主义' : '社会主义现代化',
      explanation: year >= 2015 ? '党的十八届五中全会提出创新、协调、绿色、开放、共享的新发展理念。' :
                   year >= 2003 ? '科学发展观强调以人为本，全面协调可持续发展。' :
                   year >= 1997 ? '三个代表重要思想是中国共产党的立党之本、执政之基、力量之源。' :
                   year >= 1982 ? '邓小平提出建设有中国特色的社会主义理论。' : '毛泽东提出要把我国建设成为社会主义现代化强国。'
    });
  }
  
  if (topics && topics.length > 0) {
    const mainTopic = topics[0];
    exercises.push({
      question: `${year}年两会的首要热点话题是什么？`,
      options: [mainTopic.name, '经济发展', '民生保障', '改革开放'],
      answer: mainTopic.name,
      explanation: `${year}年两会的首要热点是${mainTopic.name}：${mainTopic.description}`
    });
  }
  
  exercises.push({
    question: '全国两会通常在每年什么时间召开？',
    options: ['3月', '5月', '1月', '10月'],
    answer: '3月',
    explanation: '全国人民代表大会和中国人民政治协商会议通常在每年3月召开，简称"两会"。'
  });
  
  exercises.push({
    question: '中华人民共和国成立于哪一年？',
    options: ['1949年', '1950年', '1951年', '1952年'],
    answer: '1949年',
    explanation: '中华人民共和国于1949年10月1日成立，毛泽东主席在天安门城楼宣告新中国诞生。'
  });
  
  return exercises;
};

const allReports = [...historicalReports, ...twoSessionsData];
const allSpeeches = [...historicalSpeeches, ...twoSessionsSpeeches];
const allTopics = [...historicalTopics, ...twoSessionsTopics];

const generateYearList = () => {
  const years = new Set();
  allReports.forEach(item => years.add(item.year));
  allSpeeches.forEach(item => years.add(item.year));
  allTopics.forEach(item => years.add(item.year));
  return Array.from(years).sort((a, b) => b - a);
};

const fullYearList = generateYearList();

export const twoSessionsDataNew = fullYearList.map(year => {
  const report = allReports.find(item => item.year === year);
  const speech = allSpeeches.find(item => item.year === year);
  const topicData = allTopics.find(item => item.year === year);
  const topics = topicData?.topics || [];

  const content = `## ${year}年全国两会

### 政府工作报告

**发言人**：${report?.speaker || '待定'}  
**日期**：${report?.date || `${year}年3月`}

**内容摘要**：

${report?.summary || '暂无详细内容'}

**核心要点**：

${report?.keyPoints ? report.keyPoints.map((point, index) => `${index + 1}. ${point}`).join('\n') : '暂无要点'}

### 重要讲话

**发言人**：${speech?.speaker || '待定'}  
**日期**：${speech?.date || `${year}年3月`}

**内容摘要**：

${speech?.summary || '暂无详细内容'}

**核心要点**：

${speech?.keyPoints ? speech.keyPoints.map((point, index) => `${index + 1}. ${point}`).join('\n') : '暂无要点'}

### 热点话题

${topics.map(topic => `**${topic.name}**：${topic.description}`).join('\n\n') || '暂无热点话题'}

### 两会知识

"两会"是对中华人民共和国全国人民代表大会和中国人民政治协商会议的统称。每年3月召开全国两会，是中国政治生活中的大事。

- **全国人民代表大会**：是最高国家权力机关，行使立法权、决定权、任免权、监督权
- **中国人民政治协商会议**：是中国人民爱国统一战线的组织，是中国共产党领导的多党合作和政治协商的重要机构

### 历史背景

${year <= 1955 ? '建国初期：这一时期主要任务是恢复国民经济、巩固新生政权、开展土地改革，为社会主义建设奠定基础。' :
  year <= 1965 ? '全面建设时期：这一时期主要任务是推进社会主义改造、实施五年计划、发展国民经济，探索社会主义建设道路。' :
  year <= 1977 ? '文革时期：这一时期中国经历了十年动乱，国民经济和社会发展受到严重影响，但在国防和科技领域仍取得了一些成就。' :
  year <= 2004 ? '改革开放初期：这一时期中国开始实行改革开放政策，工作重心转移到经济建设，社会主义现代化建设取得巨大成就。' :
  year <= 2010 ? '发展期：这一时期中国加入世界贸易组织，经济持续快速增长，综合国力显著提升。' :
  year <= 2020 ? '转型期：这一时期中国经济进入新常态，注重质量和效益，推进供给侧结构性改革。' : '新时代：这一时期中国进入新时代，全面建设社会主义现代化国家，推进中华民族伟大复兴。'}`;

  return {
    id: `two_sessions_${year}`,
    title: `${year}年全国两会`,
    chapter: `第${year - 1949}届 · ${year}年3月`,
    stage: getStage(year),
    tags: topics.map(t => t.name).slice(0, 3),
    content,
    exercises: generateExercises(year, report, speech, topics)
  };
});

export const stageLabels = stageMap;

export const yearListExtended = fullYearList;