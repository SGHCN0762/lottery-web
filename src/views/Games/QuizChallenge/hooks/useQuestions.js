import { ref } from 'vue';
import { useQuizQuestions } from './useQuizQuestions';

export function useQuestions() {
  const {
    getAvailableCategories,
    initializeAllCategories,
    prepareQuestions: prepareQuizQuestions,
  } = useQuizQuestions();

  const questions = ref([]);

  const prepareQuestions = async (categories, count) => {
    try {
      questions.value = await prepareQuizQuestions(categories, count);
    } catch (error) {
      console.error('[答题挑战] 准备题目失败:', error);
      throw error;
    }
  };

  const getCurrentQuestion = currentIndex => {
    return questions.value[currentIndex];
  };

  const shuffleQuestions = () => {
    questions.value.sort(() => Math.random() - 0.5);
  };

  return {
    questions,
    getAvailableCategories,
    initializeAllCategories,
    prepareQuestions,
    getCurrentQuestion,
    shuffleQuestions,
  };
}
