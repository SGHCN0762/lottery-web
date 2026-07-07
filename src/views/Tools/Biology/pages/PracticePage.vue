<template>
  <SubjectPracticePage
    subject-key="biology"
    :practice-questions="practiceQuestions"
  />
</template>

<script setup>
import SubjectPracticePage from '@/components/SubjectLearning/SubjectPracticePage.vue';
import { practiceQuestions } from '../data/biologyData.js';
</script>