<template>
  <SubjectLearnPage
    subject-key="policeLaw"
    :all-data="policeLawData"
    :route-params="{ id: $route.params.id }"
    learn-route="/tools/police-law/learn"
    practice-route="/tools/police-law/practice"
  />
</template>

<script setup>
import SubjectLearnPage from '@/components/SubjectLearning/SubjectLearnPage.vue';
import policeLawData from '../data/policeLawData.js';
</script>
