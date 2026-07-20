<template>
  <van-loading v-if="loading" class="loading-center" />
  <SubjectIndex
    v-else
    subject-key="idiomLearning"
    :all-data="allItems"
    learn-route="/tools/idiom-learning/learn"
    practice-route="/tools/idiom-learning/practice"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Loading as VanLoading } from 'vant';
import SubjectIndex from '@/components/SubjectLearning/SubjectIndex.vue';
import { initData, getAllItems } from './data/idioms.js';

const loading = ref(true);
const allItems = ref([]);

onMounted(async () => {
  try {
    await initData();
    allItems.value = getAllItems();
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.loading-center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
