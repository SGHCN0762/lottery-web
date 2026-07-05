import { ref, computed, onMounted } from 'vue';
import { initData, getAllItems, getItemsByStage, searchItems, getItemById, getTotalCount } from '../data/index';

const LEARNED_KEY = 'classical_poems_learned_ids';
const MASTERED_KEY = 'classical_poems_mastered_ids';
const FAVORITE_KEY = 'classical_poems_favorite_ids';
const PRACTICE_RECORDS_KEY = 'classical_poems_practice_records';

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
const activeStage = ref('all');
const searchKeyword = ref('');
const selectedItem = ref(null);
const loading = ref(true);

export function useClassicalPoems() {
  const allItems = computed(() => getAllItems());

  const filteredItems = computed(() => {
    let result = getAllItems();
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

  const recordPractice = (id, correct) => {
    const record = practiceRecords.value.find(r => r.id === id);
    if (record) {
      record.correctCount = (record.correctCount || 0) + (correct ? 1 : 0);
      record.totalCount = (record.totalCount || 0) + 1;
      record.lastPractice = Date.now();
    } else {
      practiceRecords.value.push({
        id,
        correctCount: correct ? 1 : 0,
        totalCount: 1,
        lastPractice: Date.now()
      });
    }
    if (record && record.totalCount >= 3 && record.correctCount / record.totalCount >= 0.8) {
      markMastered(id);
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
    activeStage,
    searchKeyword,
    selectedItem,
    totalCount,
    learnedCount,
    masteredCount,
    favoriteCount,
    progressPercent,
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
    setActiveStage,
    setSearchKeyword,
    selectItem,
    recordPractice,
    getPracticeRecord,
    resetProgress,
  };
}