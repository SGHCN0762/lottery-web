<template>
  <SubjectPracticePage
    subject-key="policeLaw"
    :practice-questions="allPracticeQuestions"
  />
</template>

<script setup>
import SubjectPracticePage from '@/components/SubjectLearning/SubjectPracticePage.vue';
import policeLawData from '../data/policeLawData.js';

const allPracticeQuestions = policeLawData.flatMap(item => item.exercises || []);
</script>
