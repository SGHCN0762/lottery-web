<template>
  <SubjectPracticePage
    subject-key="math"
    :practice-questions="practiceQuestions"
  />
</template>

<script setup>
import SubjectPracticePage from '@/components/SubjectLearning/SubjectPracticePage.vue';
import { practiceQuestions } from '../data/mathData.js';
</script>