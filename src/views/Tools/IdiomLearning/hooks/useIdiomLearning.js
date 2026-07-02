import { ref, computed, onMounted } from 'vue';
import { initIdioms, getIdioms, searchIdioms, getIdiomById, getTotalCount } from '../data/idioms';

const LEARNED_KEY = 'idiom_learned_ids';
const MASTERED_KEY = 'idiom_mastered_ids';
const PRACTICE_RECORDS_KEY = 'idiom_practice_records';

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
const practiceRecords = ref(getStoredIds(PRACTICE_RECORDS_KEY));
const activeTag = ref('all');
const searchKeyword = ref('');
const currentView = ref('browse');
const selectedIdiom = ref(null);
const currentPracticeIdiom = ref(null);
const practiceScore = ref(0);
const practiceCount = ref(0);
const loading = ref(true);

export function useIdiomLearning() {
  const idioms = computed(() => getIdioms());

  const filteredIdioms = computed(() => {
    let result = getIdioms();
    if (activeTag.value !== 'all') {
      result = result.filter(idiom => {
        const tags = idiom.tags || [];
        return tags.includes(activeTag.value);
      });
    }
    if (searchKeyword.value) {
      result = searchIdioms(searchKeyword.value);
      if (activeTag.value !== 'all') {
        result = result.filter(idiom => {
          const tags = idiom.tags || [];
          return tags.includes(activeTag.value);
        });
      }
    }
    return result;
  });

  const totalCount = computed(() => getTotalCount());
  const learnedCount = computed(() => learnedIds.value.length);
  const masteredCount = computed(() => masteredIds.value.length);

  const progressPercent = computed(() => {
    if (totalCount.value === 0) return 0;
    return Math.round((masteredIds.value.length / totalCount.value) * 100);
  });

  const isLearned = (id) => learnedIds.value.includes(id);
  const isMastered = (id) => masteredIds.value.includes(id);

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

  const setActiveTag = (tag) => {
    activeTag.value = tag;
  };

  const setSearchKeyword = (keyword) => {
    searchKeyword.value = keyword;
  };

  const setCurrentView = (view) => {
    currentView.value = view;
  };

  const selectIdiom = (idiom) => {
    selectedIdiom.value = idiom;
    if (idiom) {
      markLearned(idiom.id);
    }
  };

  const startPractice = () => {
    const allIdioms = getIdioms();
    const unmasteredIds = allIdioms
      .filter(i => !masteredIds.value.includes(i.id))
      .map(i => i.id);
    if (unmasteredIds.length === 0) {
      const randomIndex = Math.floor(Math.random() * allIdioms.length);
      currentPracticeIdiom.value = allIdioms[randomIndex];
    } else {
      const randomIndex = Math.floor(Math.random() * unmasteredIds.length);
      currentPracticeIdiom.value = getIdiomById(unmasteredIds[randomIndex]);
    }
    practiceScore.value = 0;
    practiceCount.value = 0;
    setCurrentView('practice');
  };

  const nextPracticeIdiom = () => {
    const allIdioms = getIdioms();
    const unmasteredIds = allIdioms
      .filter(i => !masteredIds.value.includes(i.id))
      .map(i => i.id);
    if (unmasteredIds.length === 0) {
      const randomIndex = Math.floor(Math.random() * allIdioms.length);
      currentPracticeIdiom.value = allIdioms[randomIndex];
    } else {
      const randomIndex = Math.floor(Math.random() * unmasteredIds.length);
      currentPracticeIdiom.value = getIdiomById(unmasteredIds[randomIndex]);
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
    practiceRecords.value = [];
    saveStoredIds(LEARNED_KEY, []);
    saveStoredIds(MASTERED_KEY, []);
    saveStoredIds(PRACTICE_RECORDS_KEY, []);
  };

  onMounted(async () => {
    loading.value = true;
    await initIdioms();
    loading.value = false;
  });

  return {
    idioms,
    filteredIdioms,
    activeTag,
    searchKeyword,
    currentView,
    selectedIdiom,
    currentPracticeIdiom,
    practiceScore,
    practiceCount,
    totalCount,
    learnedCount,
    masteredCount,
    progressPercent,
    loading,
    isLearned,
    isMastered,
    markLearned,
    markMastered,
    unmarkMastered,
    setActiveTag,
    setSearchKeyword,
    setCurrentView,
    selectIdiom,
    startPractice,
    nextPracticeIdiom,
    recordPractice,
    getPracticeRecord,
    resetProgress
  };
}
