import { ref } from 'vue';
import { useCacheStore } from '@/stores/cache';

const categoryConfig = {
  css: { name: 'CSS', dir: 'questions/css_questions', totalFiles: 20 },
  javascript: { name: 'JavaScript', dir: 'questions/javascript_questions', totalFiles: 20 },
  html: { name: 'HTML', dir: 'questions/html_questions', totalFiles: 20 },
  vue: { name: 'Vue', dir: 'questions/vue_questions', totalFiles: 20 },
  react: { name: 'React', dir: 'questions/react_questions', totalFiles: 20 },
  java: { name: 'Java', dir: 'questions/java_questions', totalFiles: 20 },
  python: { name: 'Python', dir: 'questions/python_questions', totalFiles: 20 },
  go: { name: 'Go', dir: 'questions/go_questions', totalFiles: 20 },
  c: { name: 'C语言', dir: 'questions/c_questions', totalFiles: 20 },
  cpp: { name: 'C++', dir: 'questions/cpp_questions', totalFiles: 20 },
};

export function useQuizQuestions() {
  const cacheStore = useCacheStore();
  const { readFromCache, writeToCache, checkFileVersion } = cacheStore;

  const allQuestions = ref({});
  const loadedCategories = ref(new Set());
  const loadProgress = ref({});

  const getAvailableCategories = () => {
    return Object.keys(categoryConfig).map(key => ({
      key,
      name: categoryConfig[key].name,
      count: allQuestions.value[key]?.length || 0,
      loaded: loadedCategories.value.has(key),
      progress: loadProgress.value[key] || { loaded: 0, total: categoryConfig[key].totalFiles },
    }));
  };

  const loadCategoryQuestions = async category => {
    if (loadedCategories.value.has(category)) {
      return allQuestions.value[category] || [];
    }

    const config = categoryConfig[category];
    if (!config) {
      throw new Error(`未知的分类: ${category}`);
    }

    loadProgress.value[category] = { loaded: 0, total: config.totalFiles };

    // 尝试从缓存读取
    const cachedData = await readFromCache(category);

    if (cachedData) {
      console.log(`[答题挑战] 使用缓存数据 (${category})`);
      allQuestions.value[category] = cachedData.data;
      loadedCategories.value.add(category);
      loadProgress.value[category] = { loaded: config.totalFiles, total: config.totalFiles };
      return cachedData.data;
    }

    console.log(`[答题挑战] 缓存不存在，开始并发加载远程数据 (${category})`);

    // 检查第一个文件的版本（作为整个分类的版本标识）
    const firstFilePath = `${config.dir}/1.json`;
    const remoteVersion = await checkFileVersion(firstFilePath);

    // 生成所有文件的加载任务
    const fileLoadTasks = [];
    for (let i = 1; i <= config.totalFiles; i++) {
      const filePath = `${config.dir}/${i}.json`;
      const fileIndex = i;
      
      fileLoadTasks.push(
        fetch(filePath)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(batchData => {
            // 更新加载进度
            loadProgress.value[category] = {
              loaded: fileIndex,
              total: config.totalFiles,
            };
            return batchData;
          })
          .catch(error => {
            console.error(`[答题挑战] 加载 ${filePath} 失败:`, error);
            return []; // 失败时返回空数组，不影响其他文件
          })
      );
    }

    // 并发加载所有文件
    const results = await Promise.all(fileLoadTasks);
    
    // 合并所有结果
    const allQuestionsList = results.flat();

    // 写入缓存
    await writeToCache(category, allQuestionsList, remoteVersion);

    allQuestions.value[category] = allQuestionsList;
    loadedCategories.value.add(category);

    console.log(`[答题挑战] ${category} 加载完成，共 ${allQuestionsList.length} 道题目`);

    return allQuestionsList;
  };

  /**
   * 并发加载多个分类的题目（优化版）
   * @param {Array} categories - 分类数组
   * @returns {Promise<void>}
   */
  const loadCategories = async categories => {
    // 使用 Promise.all 并发加载所有分类
    const loadPromises = categories.map(category => loadCategoryQuestions(category));
    await Promise.all(loadPromises);
  };

  /**
   * 初始化所有分类（页面进入时调用）
   * 并发加载所有分类的题目数据
   * @returns {Promise<void>}
   */
  const initializeAllCategories = async () => {
    const allCategories = Object.keys(categoryConfig);
    console.log(`[答题挑战] 开始初始化所有分类，共 ${allCategories.length} 个分类`);
    
    try {
      await loadCategories(allCategories);
      console.log('[答题挑战] 所有分类初始化完成');
    } catch (error) {
      console.error('[答题挑战] 初始化分类失败:', error);
      // 不抛出错误，允许部分加载成功
    }
  };

  const prepareQuestions = async (categories, count) => {
    await loadCategories(categories);

    let pooledQuestions = [];
    categories.forEach(category => {
      if (allQuestions.value[category]) {
        pooledQuestions = pooledQuestions.concat(allQuestions.value[category]);
      }
    });

    if (pooledQuestions.length < count) {
      const originalLength = pooledQuestions.length;
      while (pooledQuestions.length < count) {
        const shuffled = [...pooledQuestions.slice(0, originalLength)].sort(
          () => Math.random() - 0.5
        );
        pooledQuestions = pooledQuestions.concat(shuffled);
      }
    }

    const questions = pooledQuestions.slice(0, count);
    questions.sort(() => Math.random() - 0.5);

    return questions;
  };

  return {
    getAvailableCategories,
    loadCategories,
    initializeAllCategories,
    prepareQuestions,
  };
}
