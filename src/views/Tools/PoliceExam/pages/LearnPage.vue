<template>
  <SubjectLearnPage
    subject-key="police"
    :all-data="policeData"
    :route-params="{ id: $route.params.id }"
    learn-route="/tools/police/learn"
    practice-route="/tools/police/practice"
  />
</template>

<script setup>
import SubjectLearnPage from '@/components/SubjectLearning/SubjectLearnPage.vue';
import policeData from '../data/policeData.js';
</script>