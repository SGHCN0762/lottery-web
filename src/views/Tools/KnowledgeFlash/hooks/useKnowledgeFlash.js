import { ref, computed, onMounted } from 'vue';

const DATA_PATH = import.meta.env.BASE_URL + 'knowledge-points';
const categoryKeys = ['verbal', 'logic', 'math', 'dataAnalysis', 'common'];

export function useKnowledgeFlash() {
  const categories = ref({});
  const activeCategory = ref('verbal');
  const activeSubcategory = ref('');
  const loading = ref(true);
  const showDetail = ref(false);
  const selectedTopic = ref(null);

  const currentCategory = computed(() => categories.value[activeCategory.value]);

  const currentSubcategory = computed(() => {
    if (!currentCategory.value || !activeSubcategory.value) return null;
    return currentCategory.value.subcategories?.[activeSubcategory.value];
  });

  const currentTopics = computed(() => {
    if (!currentSubcategory.value) return {};
    return currentSubcategory.value.topics || {};
  });

  const loadCategories = async () => {
    loading.value = true;
    for (const key of categoryKeys) {
      try {
        const url = `${DATA_PATH}/${key}.json`;
        console.log(`[KnowledgeFlash] Loading: ${url}`);
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        console.log(`[KnowledgeFlash] Loaded ${key}:`, data.name, 'subcategories:', Object.keys(data.subcategories || {}).length);
        categories.value[key] = data;
      } catch (e) {
        console.error(`[KnowledgeFlash] Failed to load ${key}:`, e);
      }
    }
    loading.value = false;
    // 初始化子分类
    if (categories.value[activeCategory.value]?.subcategories) {
      const subs = Object.keys(categories.value[activeCategory.value].subcategories);
      activeSubcategory.value = subs[0] || '';
      console.log('[KnowledgeFlash] Initialized subcategory:', activeSubcategory.value);
    }
  };

  const onTabChange = (name) => {
    activeCategory.value = name;
    const cat = categories.value[name];
    if (cat?.subcategories) {
      const subs = Object.keys(cat.subcategories);
      activeSubcategory.value = subs[0] || '';
    }
  };

  const selectSubcategory = (key) => {
    activeSubcategory.value = key;
  };

  const showTopicDetail = (topic) => {
    console.log('[KnowledgeFlash] showTopicDetail:', topic?.name, 'hasSvg:', !!topic?.svgDiagram);
    selectedTopic.value = topic;
    showDetail.value = true;
  };

  const closeDetail = () => {
    showDetail.value = false;
  };

  onMounted(() => {
    loadCategories();
  });

  return {
    categories,
    activeCategory,
    activeSubcategory,
    loading,
    showDetail,
    selectedTopic,
    currentCategory,
    currentSubcategory,
    currentTopics,
    onTabChange,
    selectSubcategory,
    showTopicDetail,
    closeDetail
  };
}
