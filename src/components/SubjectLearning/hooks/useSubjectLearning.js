import { ref, computed, watch } from 'vue';

export function useSubjectLearning(subjectKey, allData) {
  const activeStage = ref('all');
  const searchKeyword = ref('');
  const selectedItem = ref(null);
  const loading = ref(false);

  const learnedIds = ref(JSON.parse(localStorage.getItem(`${subjectKey}_learned_ids`) || '[]'));
  const masteredIds = ref(JSON.parse(localStorage.getItem(`${subjectKey}_mastered_ids`) || '[]'));
  const favoriteIds = ref(JSON.parse(localStorage.getItem(`${subjectKey}_favorite_ids`) || '[]'));

  const stages = computed(() => {
    const stageMap = {
      all: '全部',
      middle: '初中',
      high: '高中',
      junior: '基础篇',
      senior: '进阶篇',
      primary: '小学',
      civil: '公务员'
    };
    const existingStages = ['all'];
    allData.forEach(item => {
      if (item.stage && !existingStages.includes(item.stage)) {
        existingStages.push(item.stage);
      }
    });
    const result = {};
    existingStages.forEach(stage => {
      result[stage] = stageMap[stage] || stage;
    });
    return result;
  });

  const filteredItems = computed(() => {
    let items = allData;

    if (activeStage.value !== 'all') {
      items = items.filter(item => item.stage === activeStage.value);
    }

    if (searchKeyword.value.trim()) {
      const keyword = searchKeyword.value.toLowerCase();
      items = items.filter(item =>
        item.title.toLowerCase().includes(keyword) ||
        item.chapter.toLowerCase().includes(keyword) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(keyword)))
      );
    }

    return items;
  });

  const totalCount = computed(() => allData.length);
  const learnedCount = computed(() => learnedIds.value.length);
  const masteredCount = computed(() => masteredIds.value.length);
  const progressPercent = computed(() => {
    if (totalCount.value === 0) return 0;
    return Math.round((masteredCount.value / totalCount.value) * 100);
  });

  const isMastered = (id) => masteredIds.value.includes(id);
  const isFavorite = (id) => favoriteIds.value.includes(id);

  const markMastered = (id) => {
    if (!masteredIds.value.includes(id)) {
      masteredIds.value.push(id);
      localStorage.setItem(`${subjectKey}_mastered_ids`, JSON.stringify(masteredIds.value));
    }
    if (!learnedIds.value.includes(id)) {
      learnedIds.value.push(id);
      localStorage.setItem(`${subjectKey}_learned_ids`, JSON.stringify(learnedIds.value));
    }
  };

  const unmarkMastered = (id) => {
    masteredIds.value = masteredIds.value.filter(itemId => itemId !== id);
    localStorage.setItem(`${subjectKey}_mastered_ids`, JSON.stringify(masteredIds.value));
  };

  const toggleFavorite = (id) => {
    const index = favoriteIds.value.indexOf(id);
    if (index > -1) {
      favoriteIds.value.splice(index, 1);
    } else {
      favoriteIds.value.push(id);
    }
    localStorage.setItem(`${subjectKey}_favorite_ids`, JSON.stringify(favoriteIds.value));
  };

  const selectItem = (item) => {
    selectedItem.value = item;
    if (item && !learnedIds.value.includes(item.id)) {
      learnedIds.value.push(item.id);
      localStorage.setItem(`${subjectKey}_learned_ids`, JSON.stringify(learnedIds.value));
    }
  };

  watch(searchKeyword, () => {
    selectedItem.value = null;
  });

  watch(activeStage, () => {
    selectedItem.value = null;
  });

  return {
    filteredItems,
    activeStage,
    searchKeyword,
    selectedItem,
    totalCount,
    learnedCount,
    masteredCount,
    progressPercent,
    stages,
    isMastered,
    isFavorite,
    markMastered,
    unmarkMastered,
    toggleFavorite,
    selectItem,
    loading
  };
}

export function useSubjectLearn(subjectKey, allData) {
  const currentIndex = ref(0);
  const learnedIds = ref(JSON.parse(localStorage.getItem(`${subjectKey}_learned_ids`) || '[]'));
  const masteredIds = ref(JSON.parse(localStorage.getItem(`${subjectKey}_mastered_ids`) || '[]'));

  const filteredPoints = computed(() => {
    return allData;
  });

  const currentPoint = computed(() => {
    return filteredPoints.value[currentIndex.value] || null;
  });

  const isFirst = computed(() => currentIndex.value === 0);
  const isLast = computed(() => currentIndex.value === filteredPoints.value.length - 1);
  const progress = computed(() => {
    if (filteredPoints.value.length === 0) return 0;
    return Math.round(((currentIndex.value + 1) / filteredPoints.value.length) * 100);
  });

  const isMastered = (id) => masteredIds.value.includes(id);

  const markMastered = (id) => {
    if (!masteredIds.value.includes(id)) {
      masteredIds.value.push(id);
      localStorage.setItem(`${subjectKey}_mastered_ids`, JSON.stringify(masteredIds.value));
    }
    if (!learnedIds.value.includes(id)) {
      learnedIds.value.push(id);
      localStorage.setItem(`${subjectKey}_learned_ids`, JSON.stringify(learnedIds.value));
    }
  };

  const unmarkMastered = (id) => {
    masteredIds.value = masteredIds.value.filter(itemId => itemId !== id);
    localStorage.setItem(`${subjectKey}_mastered_ids`, JSON.stringify(masteredIds.value));
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

  return {
    currentIndex,
    filteredPoints,
    currentPoint,
    isMastered,
    markMastered,
    unmarkMastered,
    goToNext,
    goToPrev,
    isFirst,
    isLast,
    progress
  };
}

export function useSubjectPractice(subjectKey, practiceQuestions) {
  const questions = ref([]);
  const currentQuestionIndex = ref(0);
  const selectedAnswer = ref(null);
  const showResult = ref(false);
  const score = ref(0);
  const answeredCount = ref(0);
  const isFinished = ref(false);

  const initQuestions = () => {
    questions.value = practiceQuestions.slice(0, 20);
    currentQuestionIndex.value = 0;
    selectedAnswer.value = null;
    showResult.value = false;
    score.value = 0;
    answeredCount.value = 0;
    isFinished.value = false;
  };

  initQuestions();

  const totalQuestions = computed(() => questions.value.length);

  const currentQuestion = computed(() => {
    return questions.value[currentQuestionIndex.value] || null;
  });

  const progress = computed(() => {
    if (totalQuestions.value === 0) return 0;
    return Math.round((answeredCount.value / totalQuestions.value) * 100);
  });

  const submitAnswer = (answer) => {
    if (answer === null || showResult.value) return;
    selectedAnswer.value = answer;
    showResult.value = true;
    answeredCount.value++;
    if (answer === currentQuestion.value.answer) {
      score.value++;
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex.value < totalQuestions.value - 1) {
      currentQuestionIndex.value++;
      selectedAnswer.value = null;
      showResult.value = false;
    } else {
      isFinished.value = true;
    }
  };

  const retry = () => {
    initQuestions();
  };

  return {
    currentQuestionIndex,
    selectedAnswer,
    showResult,
    score,
    answeredCount,
    totalQuestions,
    isFinished,
    currentQuestion,
    progress,
    submitAnswer,
    nextQuestion,
    retry
  };
}