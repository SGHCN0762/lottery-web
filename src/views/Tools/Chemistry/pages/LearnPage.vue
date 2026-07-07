<template>
  <SubjectLearnPage
    subject-key="chemistry"
    :all-data="chemistryData"
  />
</template>

<script setup>
import SubjectLearnPage from '@/components/SubjectLearning/SubjectLearnPage.vue';
import chemistryData from '../data/chemistryData.js';
</script>