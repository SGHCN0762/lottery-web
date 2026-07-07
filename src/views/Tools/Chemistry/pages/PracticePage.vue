<template>
  <SubjectPracticePage
    subject-key="chemistry"
    :practice-questions="practiceQuestions"
  />
</template>

<script setup>
import SubjectPracticePage from '@/components/SubjectLearning/SubjectPracticePage.vue';
import { practiceQuestions } from '../data/chemistryData.js';
</script>