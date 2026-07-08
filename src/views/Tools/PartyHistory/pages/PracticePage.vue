<template>
  <SubjectPracticePage
    subject-key="partyHistory"
    :practice-questions="allPracticeQuestions"
  />
</template>

<script setup>
import SubjectPracticePage from '@/components/SubjectLearning/SubjectPracticePage.vue';
import { partyHistoryData } from '../data/partyHistoryDataNew.js';

const allPracticeQuestions = partyHistoryData.flatMap(item => item.exercises || []);
</script>