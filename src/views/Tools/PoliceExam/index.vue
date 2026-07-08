<template>
  <SubjectIndex
    subject-key="police"
    :all-data="policeData"
    learn-route="/tools/police/learn"
    practice-route="/tools/police/practice"
  />
</template>

<script setup>
import SubjectIndex from '@/components/SubjectLearning/SubjectIndex.vue';
import policeData from './data/policeData.js';
</script>