<template>
  <SubjectIndex
    subject-key="chemistry"
    :all-data="chemistryData"
    learn-route="/tools/chemistry/learn"
    practice-route="/tools/chemistry/practice"
  />
</template>

<script setup>
import SubjectIndex from '@/components/SubjectLearning/SubjectIndex.vue';
import chemistryData from './data/chemistryData.js';
</script>