import { ref, computed, onMounted } from 'vue';
import { chemistryKnowledgePoints, stages, practiceQuestions } from '../data/chemistryData';

const STORAGE_KEYS = {
  mastered: 'chemistry_mastered_ids',
  learned: 'chemistry_learned_ids',
  favorites: 'chemistry_favorite_ids',
  practiceRecords: 'chemistry_practice_records'
};

const getStoredIds = (key) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveIds = (key, ids) => {
  try {
    localStorage.setItem(key, JSON.stringify(ids));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
};

export const useChemistry = () => {
  const loading = ref(false);
  const searchKeyword = ref('');
  const activeStage = ref('all');
  const selectedItem = ref(null);

  const masteredIds = ref(getStoredIds(STORAGE_KEYS.mastered));
  const learnedIds = ref(getStoredIds(STORAGE_KEYS.learned));
  const favoriteIds = ref(getStoredIds(STORAGE_KEYS.favorites));

  const allItems = ref(chemistryKnowledgePoints);

  const totalCount = computed(() => allItems.value.length);

  const learnedCount = computed(() => learnedIds.value.length);

  const masteredCount = computed(() => masteredIds.value.length);

  const favoriteCount = computed(() => favoriteIds.value.length);

  const progressPercent = computed(() => {
    if (totalCount.value === 0) return 0;
    return Math.round((masteredCount.value / totalCount.value) * 100);
  });

  const filteredItems = computed(() => {
    let items = allItems.value;

    if (activeStage.value !== 'all') {
      items = items.filter(item => item.stage === activeStage.value);
    }

    if (searchKeyword.value.trim()) {
      const keyword = searchKeyword.value.toLowerCase();
      items = items.filter(item =>
        item.title.toLowerCase().includes(keyword) ||
        (item.content && item.content.toLowerCase().includes(keyword)) ||
        item.tags.some(tag => tag.toLowerCase().includes(keyword)) ||
        item.chapter.toLowerCase().includes(keyword)
      );
    }

    return items;
  });

  const isMastered = (id) => masteredIds.value.includes(id);

  const isLearned = (id) => learnedIds.value.includes(id);

  const isFavorite = (id) => favoriteIds.value.includes(id);

  const markMastered = (id) => {
    if (!masteredIds.value.includes(id)) {
      masteredIds.value.push(id);
      saveIds(STORAGE_KEYS.mastered, masteredIds.value);
    }
    if (!learnedIds.value.includes(id)) {
      learnedIds.value.push(id);
      saveIds(STORAGE_KEYS.learned, learnedIds.value);
    }
  };

  const unmarkMastered = (id) => {
    masteredIds.value = masteredIds.value.filter(i => i !== id);
    saveIds(STORAGE_KEYS.mastered, masteredIds.value);
  };

  const markLearned = (id) => {
    if (!learnedIds.value.includes(id)) {
      learnedIds.value.push(id);
      saveIds(STORAGE_KEYS.learned, learnedIds.value);
    }
  };

  const toggleFavorite = (id) => {
    const index = favoriteIds.value.indexOf(id);
    if (index > -1) {
      favoriteIds.value.splice(index, 1);
    } else {
      favoriteIds.value.push(id);
    }
    saveIds(STORAGE_KEYS.favorites, favoriteIds.value);
  };

  const setActiveStage = (stage) => {
    activeStage.value = stage;
  };

  const selectItem = (item) => {
    selectedItem.value = item;
    if (item) {
      markLearned(item.id);
    }
  };

  onMounted(() => {
    loading.value = false;
  });

  return {
    loading,
    searchKeyword,
    activeStage,
    selectedItem,
    filteredItems,
    totalCount,
    learnedCount,
    masteredCount,
    favoriteCount,
    progressPercent,
    stages,
    isMastered,
    isLearned,
    isFavorite,
    markMastered,
    unmarkMastered,
    markLearned,
    toggleFavorite,
    setActiveStage,
    selectItem
  };
};

export const useChemistryPractice = () => {
  const currentQuestionIndex = ref(0);
  const selectedAnswer = ref(null);
  const showResult = ref(false);
  const score = ref(0);
  const answeredQuestions = ref([]);
  const isFinished = ref(false);
  const practiceMode = ref('random');
  const targetStage = ref('all');

  const filteredQuestions = computed(() => {
    let questions = practiceQuestions;

    if (targetStage.value !== 'all') {
      const targetPoints = chemistryKnowledgePoints.filter(p => p.stage === targetStage.value);
      const targetPointIds = targetPoints.map(p => p.id);
      questions = questions.filter(q => targetPointIds.includes(q.pointId));
    }

    if (practiceMode.value === 'random') {
      return [...questions].sort(() => Math.random() - 0.5);
    }

    return questions;
  });

  const currentQuestion = computed(() => {
    if (currentQuestionIndex.value >= filteredQuestions.value.length) {
      return null;
    }
    return filteredQuestions.value[currentQuestionIndex.value];
  });

  const currentKnowledgePoint = computed(() => {
    if (!currentQuestion.value) return null;
    return chemistryKnowledgePoints.find(p => p.id === currentQuestion.value.pointId);
  });

  const answeredCount = computed(() => answeredQuestions.value.length);

  const totalQuestions = computed(() => filteredQuestions.value.length);

  const progress = computed(() => {
    if (totalQuestions.value === 0) return 0;
    return Math.round((answeredCount.value / totalQuestions.value) * 100);
  });

  const submitAnswer = (answerIndex) => {
    selectedAnswer.value = answerIndex;
    showResult.value = true;

    const isCorrect = answerIndex === currentQuestion.value.answer;
    answeredQuestions.value.push({
      questionId: currentQuestion.value.id,
      selectedAnswer: answerIndex,
      correctAnswer: currentQuestion.value.answer,
      isCorrect
    });

    if (isCorrect) {
      score.value++;
    }
  };

  const nextQuestion = () => {
    selectedAnswer.value = null;
    showResult.value = false;

    if (currentQuestionIndex.value < filteredQuestions.value.length - 1) {
      currentQuestionIndex.value++;
    } else {
      isFinished.value = true;
    }
  };

  const retry = () => {
    currentQuestionIndex.value = 0;
    selectedAnswer.value = null;
    showResult.value = false;
    score.value = 0;
    answeredQuestions.value = [];
    isFinished.value = false;
  };

  const setPracticeMode = (mode) => {
    practiceMode.value = mode;
  };

  const setTargetStage = (stage) => {
    targetStage.value = stage;
    retry();
  };

  return {
    currentQuestionIndex,
    selectedAnswer,
    showResult,
    score,
    answeredQuestions,
    isFinished,
    practiceMode,
    targetStage,
    filteredQuestions,
    currentQuestion,
    currentKnowledgePoint,
    answeredCount,
    totalQuestions,
    progress,
    submitAnswer,
    nextQuestion,
    retry,
    setPracticeMode,
    setTargetStage
  };
};

export const useChemistryLearn = () => {
  const currentIndex = ref(0);
  const masteredList = ref(getStoredIds(STORAGE_KEYS.mastered));
  const learnedList = ref(getStoredIds(STORAGE_KEYS.learned));

  const filteredPoints = computed(() => {
    let points = chemistryKnowledgePoints;
    return points;
  });

  const currentPoint = computed(() => {
    if (currentIndex.value >= filteredPoints.value.length) {
      return null;
    }
    return filteredPoints.value[currentIndex.value];
  });

  const isMastered = (id) => masteredList.value.includes(id);

  const markMastered = (id) => {
    if (!masteredList.value.includes(id)) {
      masteredList.value.push(id);
      saveIds(STORAGE_KEYS.mastered, masteredList.value);
    }
    if (!learnedList.value.includes(id)) {
      learnedList.value.push(id);
      saveIds(STORAGE_KEYS.learned, learnedList.value);
    }
  };

  const unmarkMastered = (id) => {
    masteredList.value = masteredList.value.filter(i => i !== id);
    saveIds(STORAGE_KEYS.mastered, masteredList.value);
  };

  const goToNext = () => {
    if (currentIndex.value < filteredPoints.value.length - 1) {
      currentIndex.value++;
    }
  };

  const goToPrev = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--;
    }
  };

  const goToIndex = (index) => {
    if (index >= 0 && index < filteredPoints.value.length) {
      currentIndex.value = index;
    }
  };

  const isFirst = computed(() => currentIndex.value === 0);

  const isLast = computed(() => currentIndex.value === filteredPoints.value.length - 1);

  const progress = computed(() => {
    if (filteredPoints.value.length === 0) return 0;
    return Math.round(((currentIndex.value + 1) / filteredPoints.value.length) * 100);
  });

  const masteredCount = computed(() => masteredList.value.length);

  return {
    currentIndex,
    filteredPoints,
    currentPoint,
    isMastered,
    markMastered,
    unmarkMastered,
    goToNext,
    goToPrev,
    goToIndex,
    isFirst,
    isLast,
    progress,
    masteredCount
  };
};
