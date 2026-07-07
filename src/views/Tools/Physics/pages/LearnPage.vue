<template>
  <SubjectLearnPage
    subject-key="physics"
    :all-data="physicsData"
  />
</template>

<script setup>
import SubjectLearnPage from '@/components/SubjectLearning/SubjectLearnPage.vue';
import physicsData from '../data/physicsData.js';
</script>