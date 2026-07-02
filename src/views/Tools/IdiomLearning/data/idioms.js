let idioms = [];
let dataLoaded = false;

const loadData = async () => {
  if (dataLoaded) return;
  try {
    const indexResponse = await fetch('/lottery-web/idiom-learning/idioms_index.json');
    const indexData = await indexResponse.json();
    const numFiles = indexData.meta?.num_files || 10;
    
    const promises = [];
    for (let i = 1; i <= numFiles; i++) {
      const fileName = `idioms_${String(i).padStart(2, '0')}.json`;
      promises.push(fetch(`/lottery-web/idiom-learning/${fileName}`));
    }
    
    const responses = await Promise.all(promises);
    const allData = await Promise.all(responses.map(r => r.json()));
    
    idioms = allData.flatMap(d => d.idioms || []);
    dataLoaded = true;
    console.log(`Loaded ${idioms.length} idioms from ${numFiles} files`);
  } catch (error) {
    console.error('Failed to load idiom data:', error);
    idioms = [];
  }
};

export const initIdioms = async () => {
  await loadData();
};

export const getIdiomCategories = async () => {
  return {};
};

export const getIdioms = () => idioms;

export const getTotalCount = () => idioms.length;

export const getCountByCategory = (category) => {
  if (!category || category === 'all') return idioms.length;
  return idioms.filter(item => item.categories && item.categories.includes(category)).length;
};

export const getIdiomsByCategory = (category) => {
  if (!category || category === 'all') return [...idioms];
  return idioms.filter(item => item.categories && item.categories.includes(category));
};

export const searchIdioms = (keyword) => {
  if (!keyword) return [...idioms];
  const lowerKeyword = keyword.toLowerCase();
  return idioms.filter(item =>
    item.word.includes(keyword) ||
    item.pinyin.includes(lowerKeyword) ||
    item.meaning.includes(keyword)
  );
};

export const getIdiomById = (id) => {
  return idioms.find(item => item.id === id);
};

export const getRandomIdioms = (count = 10) => {
  const shuffled = [...idioms].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getDailyIdiom = () => {
  const day = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  return idioms[day % idioms.length];
};

export const getIdiomsByRange = (start, end) => {
  return idioms.slice(start, end);
};
