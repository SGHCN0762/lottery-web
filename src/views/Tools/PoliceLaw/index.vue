<template>
  <SubjectIndex
    subject-key="policeLaw"
    :all-data="policeLawData"
    learn-route="/tools/police-law/learn"
    practice-route="/tools/police-law/practice"
  />
</template>

<script setup>
import SubjectIndex from '@/components/SubjectLearning/SubjectIndex.vue';
import policeLawData from './data/policeLawData.js';
</script>
