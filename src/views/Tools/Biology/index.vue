<template>
  <SubjectIndex
    subject-key="biology"
    :all-data="biologyData"
    learn-route="/tools/biology/learn"
    practice-route="/tools/biology/practice"
  />
</template>

<script setup>
import SubjectIndex from '@/components/SubjectLearning/SubjectIndex.vue';
import biologyData from './data/biologyData.js';
</script>