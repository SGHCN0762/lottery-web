import { ref, computed, onMounted } from 'vue';
import { initData, getAllItems, getItemsByType, getItemsByStage, getItemsByTypeAndStage, searchItems, getItemById, getTotalCount } from '../data/index';

const LEARNED_KEY = 'quote_poem_learned_ids';
const MASTERED_KEY = 'quote_poem_mastered_ids';
const FAVORITE_KEY = 'quote_poem_favorite_ids';
const PRACTICE_RECORDS_KEY = 'quote_poem_practice_records';

const getStoredIds = (key) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveStoredIds = (key, ids) => {
  localStorage.setItem(key, JSON.stringify(ids));
};

const learnedIds = ref(getStoredIds(LEARNED_KEY));
const masteredIds = ref(getStoredIds(MASTERED_KEY));
const favoriteIds = ref(getStoredIds(FAVORITE_KEY));
const practiceRecords = ref(getStoredIds(PRACTICE_RECORDS_KEY));
const activeType = ref('all');
const activeStage = ref('all');
const searchKeyword = ref('');
const selectedItem = ref(null);
const currentPracticeItem = ref(null);
const practiceScore = ref(0);
const practiceCount = ref(0);
const loading = ref(true);

export function useQuotePoemLearning() {
  const allItems = computed(() => getAllItems());

  const filteredItems = computed(() => {
    let result = getAllItems();
    if (activeType.value !== 'all') {
      result = result.filter(item => item.type === activeType.value);
    }
    if (activeStage.value !== 'all') {
      result = result.filter(item => item.stage === activeStage.value);
    }
    if (searchKeyword.value) {
      const searchResult = searchItems(searchKeyword.value);
      result = result.filter(item => searchResult.some(s => s.id === item.id));
    }
    return result;
  });

  const totalCount = computed(() => getTotalCount());
  const learnedCount = computed(() => learnedIds.value.length);
  const masteredCount = computed(() => masteredIds.value.length);
  const favoriteCount = computed(() => favoriteIds.value.length);

  const progressPercent = computed(() => {
    if (totalCount.value === 0) return 0;
    return Math.round((masteredIds.value.length / totalCount.value) * 100);
  });

  const quoteCount = computed(() => getItemsByType('quote').length);
  const poemCount = computed(() => getItemsByType('poem').length);
  const essayCount = computed(() => getItemsByType('essay').length);

  const primaryCount = computed(() => getItemsByStage('primary').length);
  const middleCount = computed(() => getItemsByStage('middle').length);
  const highCount = computed(() => getItemsByStage('high').length);
  const civilCount = computed(() => getItemsByStage('civil').length);

  const isLearned = (id) => learnedIds.value.includes(id);
  const isMastered = (id) => masteredIds.value.includes(id);
  const isFavorite = (id) => favoriteIds.value.includes(id);

  const markLearned = (id) => {
    if (!learnedIds.value.includes(id)) {
      learnedIds.value.push(id);
      saveStoredIds(LEARNED_KEY, learnedIds.value);
    }
  };

  const markMastered = (id) => {
    if (!masteredIds.value.includes(id)) {
      masteredIds.value.push(id);
      saveStoredIds(MASTERED_KEY, masteredIds.value);
    }
    if (!learnedIds.value.includes(id)) {
      learnedIds.value.push(id);
      saveStoredIds(LEARNED_KEY, learnedIds.value);
    }
  };

  const unmarkMastered = (id) => {
    masteredIds.value = masteredIds.value.filter(i => i !== id);
    saveStoredIds(MASTERED_KEY, masteredIds.value);
  };

  const toggleFavorite = (id) => {
    if (favoriteIds.value.includes(id)) {
      favoriteIds.value = favoriteIds.value.filter(i => i !== id);
    } else {
      favoriteIds.value.push(id);
    }
    saveStoredIds(FAVORITE_KEY, favoriteIds.value);
  };

  const setActiveType = (type) => {
    activeType.value = type;
  };

  const setActiveStage = (stage) => {
    activeStage.value = stage;
  };

  const setSearchKeyword = (keyword) => {
    searchKeyword.value = keyword;
  };

  const selectItem = (item) => {
    selectedItem.value = item;
    if (item) {
      markLearned(item.id);
    }
  };

  const startPractice = () => {
    const allItemsList = getAllItems();
    const unmasteredIds = allItemsList
      .filter(i => !masteredIds.value.includes(i.id))
      .map(i => i.id);
    if (unmasteredIds.length === 0) {
      const randomIndex = Math.floor(Math.random() * allItemsList.length);
      currentPracticeItem.value = allItemsList[randomIndex];
    } else {
      const randomIndex = Math.floor(Math.random() * unmasteredIds.length);
      currentPracticeItem.value = getItemById(unmasteredIds[randomIndex]);
    }
    practiceScore.value = 0;
    practiceCount.value = 0;
  };

  const nextPracticeItem = () => {
    const allItemsList = getAllItems();
    const unmasteredIds = allItemsList
      .filter(i => !masteredIds.value.includes(i.id))
      .map(i => i.id);
    if (unmasteredIds.length === 0) {
      const randomIndex = Math.floor(Math.random() * allItemsList.length);
      currentPracticeItem.value = allItemsList[randomIndex];
    } else {
      const randomIndex = Math.floor(Math.random() * unmasteredIds.length);
      currentPracticeItem.value = getItemById(unmasteredIds[randomIndex]);
    }
  };

  const recordPractice = (id, correct) => {
    practiceCount.value++;
    if (correct) {
      practiceScore.value++;
      const record = practiceRecords.value.find(r => r.id === id);
      if (record) {
        record.correctCount = (record.correctCount || 0) + 1;
        record.totalCount = (record.totalCount || 0) + 1;
      } else {
        practiceRecords.value.push({
          id,
          correctCount: 1,
          totalCount: 1,
          lastPractice: Date.now()
        });
      }
      if (record && record.totalCount >= 3 && record.correctCount / record.totalCount >= 0.8) {
        markMastered(id);
      }
    } else {
      const record = practiceRecords.value.find(r => r.id === id);
      if (record) {
        record.totalCount = (record.totalCount || 0) + 1;
      } else {
        practiceRecords.value.push({
          id,
          correctCount: 0,
          totalCount: 1,
          lastPractice: Date.now()
        });
      }
    }
    saveStoredIds(PRACTICE_RECORDS_KEY, practiceRecords.value);
  };

  const getPracticeRecord = (id) => {
    return practiceRecords.value.find(r => r.id === id);
  };

  const resetProgress = () => {
    learnedIds.value = [];
    masteredIds.value = [];
    favoriteIds.value = [];
    practiceRecords.value = [];
    saveStoredIds(LEARNED_KEY, []);
    saveStoredIds(MASTERED_KEY, []);
    saveStoredIds(FAVORITE_KEY, []);
    saveStoredIds(PRACTICE_RECORDS_KEY, []);
  };

  onMounted(async () => {
    loading.value = true;
    await initData();
    loading.value = false;
  });

  return {
    allItems,
    filteredItems,
    activeType,
    activeStage,
    searchKeyword,
    selectedItem,
    currentPracticeItem,
    practiceScore,
    practiceCount,
    totalCount,
    learnedCount,
    masteredCount,
    favoriteCount,
    progressPercent,
    quoteCount,
    poemCount,
    essayCount,
    primaryCount,
    middleCount,
    highCount,
    civilCount,
    loading,
    isLearned,
    isMastered,
    isFavorite,
    markLearned,
    markMastered,
    unmarkMastered,
    toggleFavorite,
    setActiveType,
    setActiveStage,
    setSearchKeyword,
    selectItem,
    startPractice,
    nextPracticeItem,
    recordPractice,
    getPracticeRecord,
    resetProgress,
  };
}
