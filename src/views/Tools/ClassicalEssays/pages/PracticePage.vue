<template>
  <van-loading v-if="loading" class="loading-center" />
  <SubjectPracticePage
    v-else
    subject-key="classicalEssays"
    :practice-questions="exercises"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Loading as VanLoading } from 'vant';
import SubjectPracticePage from '@/components/SubjectLearning/SubjectPracticePage.vue';
import { initData, generateExercises } from '../data/index';

const loading = ref(true);
const exercises = ref([]);

onMounted(async () => {
  try {
    await initData();
    exercises.value = generateExercises();
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
