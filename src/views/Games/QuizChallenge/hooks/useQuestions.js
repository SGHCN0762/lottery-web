import { ref } from 'vue';

/**
 * 题目管理 Hook
 * @returns {Object} 题目相关方法和数据
 */
export function useQuestions() {
  /**
   * 所有分类的题目数据（动态加载）
   */
  const allQuestions = ref({});

  /**
   * 已加载的分类缓存
   */
  const loadedCategories = ref(new Set());

  /**
   * 当前选中的分类
   */
  const selectedCategories = ref([]);

  /**
   * 当前选择的题目数量
   */
  const questionCount = ref(5);

  /**
   * 当前游戏的题目列表
   */
  const questions = ref([]);

  /**
   * 加载状态
   */
  const isLoading = ref(false);

  /**
   * 分类配置信息 - 使用文件路径
   */
  const categoryConfig = {
    css: { name: 'CSS', file: 'questions/css_questions.json' },
    javascript: { name: 'JavaScript', file: 'questions/javascript_questions.json' },
    html: { name: 'HTML', file: 'questions/html_questions.json' },
    vue: { name: 'Vue', file: 'questions/vue_questions.json' },
    react: { name: 'React', file: 'questions/react_questions.json' },
    java: { name: 'Java', file: 'questions/java_questions.json' },
    python: { name: 'Python', file: 'questions/python_questions.json' },
    go: { name: 'Go', file: 'questions/go_questions.json' },
    c: { name: 'C语言', file: 'questions/c_questions.json' },
    cpp: { name: 'C++', file: 'questions/cpp_questions.json' },
  };

  /**
   * 获取所有可用的分类
   */
  const getAvailableCategories = () => {
    return Object.keys(categoryConfig).map(key => ({
      key,
      name: categoryConfig[key].name,
      count: allQuestions.value[key]?.length || 0,
      loaded: loadedCategories.value.has(key),
    }));
  };

  /**
   * 获取分类的中文名称
   */
  const getCategoryName = key => {
    return categoryConfig[key]?.name || key;
  };

  /**
   * 动态加载指定分类的题目数据
   * @param {string} category - 分类key
   * @returns {Promise<Array>} 题目数组
   */
  const loadCategoryQuestions = async category => {
    // 如果已加载，直接返回
    if (loadedCategories.value.has(category)) {
      return allQuestions.value[category] || [];
    }

    try {
      isLoading.value = true;
      const config = categoryConfig[category];
      if (!config) {
        throw new Error(`未知的分类: ${category}`);
      }

      // 使用 fetch 从 public 目录加载JSON文件
      const response = await fetch(config.file);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(category, data);

      // 更新缓存
      allQuestions.value[category] = data;
      loadedCategories.value.add(category);

      console.log(`[答题挑战] 成功加载分类 "${category}" 的题目，共 ${data.length} 道`);
      return data;
    } catch (error) {
      console.error(`[答题挑战] 加载分类 "${category}" 失败:`, error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * 批量加载多个分类的题目
   * @param {Array} categories - 分类数组
   * @returns {Promise<void>}
   */
  const loadCategories = async categories => {
    const loadPromises = categories.map(category => loadCategoryQuestions(category));
    await Promise.all(loadPromises);
  };

  /**
   * 根据选择的分类和数量准备题目
   * @param {Array} categories - 选中的分类数组
   * @param {number} count - 题目数量
   */
  const prepareQuestions = async (categories, count) => {
    selectedCategories.value = categories;
    questionCount.value = count;

    try {
      // 先加载所需分类的题目
      await loadCategories(categories);

      // 从已加载的分类中收集所有题目
      let pooledQuestions = [];
      categories.forEach(category => {
        if (allQuestions.value[category]) {
          pooledQuestions = pooledQuestions.concat(allQuestions.value[category]);
        }
      });

      // 如果可用题目不足，循环重复使用直到达到所需数量
      if (pooledQuestions.length < count) {
        console.warn(
          `[答题挑战] 可用题目(${pooledQuestions.length})少于需求(${count})，将循环重复使用`
        );
        const originalLength = pooledQuestions.length;
        while (pooledQuestions.length < count) {
          // 打乱原始题目顺序后追加
          const shuffled = [...pooledQuestions.slice(0, originalLength)].sort(
            () => Math.random() - 0.5
          );
          pooledQuestions = pooledQuestions.concat(shuffled);
        }
      }

      // 截取前 count 道题目
      questions.value = pooledQuestions.slice(0, count);

      // 最后再打乱一次顺序
      questions.value.sort(() => Math.random() - 0.5);

      console.log(
        `[答题挑战] 准备了 ${questions.value.length} 道题目，分类: ${categories.join(', ')}`
      );
    } catch (error) {
      console.error('[答题挑战] 准备题目失败:', error);
      throw error;
    }
  };

  /**
   * 获取当前题目对象
   * @param {number} currentIndex - 当前题目索引
   * @returns {Object} 当前题目数据
   */
  const getCurrentQuestion = currentIndex => {
    return questions.value[currentIndex];
  };

  /**
   * 打乱题目顺序
   */
  const shuffleQuestions = () => {
    questions.value.sort(() => Math.random() - 0.5);
  };

  /**
   * 初始化所有分类数据（预加载）
   * 建议在组件的 onMounted 中调用此方法
   */
  const initializeCategories = async () => {
    const categories = Object.keys(categoryConfig);
    await loadCategories(categories);
  };

  return {
    allQuestions,
    questions,
    selectedCategories,
    questionCount,
    isLoading,
    getAvailableCategories,
    getCategoryName,
    loadCategoryQuestions,
    prepareQuestions,
    getCurrentQuestion,
    shuffleQuestions,
    initializeCategories,
  };
}
