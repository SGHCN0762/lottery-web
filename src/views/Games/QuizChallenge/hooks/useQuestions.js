import { ref } from 'vue';
import { useQuizQuestions } from './useQuizQuestions';

export function useQuestions() {
  const {
    allQuestions,
    loadProgress,
    getAvailableCategories,
    getCategoryName,
    loadCategoryQuestions,
    initializeAllCategories,
    prepareQuestions: prepareQuizQuestions,
    clearCategoryCache,
    clearAllCache,
    getCacheStats,
  } = useQuizQuestions();

  const selectedCategories = ref([]);
  const questionCount = ref(5);
  const questions = ref([]);
  const isLoading = ref(false);

  const prepareQuestions = async (categories, count) => {
    selectedCategories.value = categories;
    questionCount.value = count;
    isLoading.value = true;

    try {
      questions.value = await prepareQuizQuestions(categories, count);
    } catch (error) {
      console.error('[答题挑战] 准备题目失败:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const getCurrentQuestion = currentIndex => {
    return questions.value[currentIndex];
  };

  const shuffleQuestions = () => {
    questions.value.sort(() => Math.random() - 0.5);
  };

  return {
    allQuestions,
    questions,
    selectedCategories,
    questionCount,
    isLoading,
    loadProgress,
    getAvailableCategories,
    getCategoryName,
    loadCategoryQuestions,
    initializeAllCategories,
    prepareQuestions,
    getCurrentQuestion,
    shuffleQuestions,
    clearCategoryCache,
    clearAllCache,
    getCacheStats,
  };
}
