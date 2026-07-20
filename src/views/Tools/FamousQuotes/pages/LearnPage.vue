<template>
  <van-loading v-if="loading" class="loading-center" />
  <SubjectLearnPage
    v-else
    subject-key="famousQuotes"
    :all-data="allItems"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Loading as VanLoading } from 'vant';
import SubjectLearnPage from '@/components/SubjectLearning/SubjectLearnPage.vue';
import { initData, getAllItems } from '../data/index';

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
