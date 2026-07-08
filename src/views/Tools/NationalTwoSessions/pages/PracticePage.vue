<template>
  <SubjectPracticePage
    subject-key="nationalTwoSessions"
    :practice-questions="allPracticeQuestions"
  />
</template>

<script setup>
import SubjectPracticePage from '@/components/SubjectLearning/SubjectPracticePage.vue';
import { twoSessionsDataNew } from '../data/twoSessionsDataNew.js';

const allPracticeQuestions = twoSessionsDataNew.flatMap(item => item.exercises || []);
</script>