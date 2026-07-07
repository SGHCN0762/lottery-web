<template>
  <SubjectLearnPage
    subject-key="math"
    :all-data="mathData"
  />
</template>

<script setup>
import SubjectLearnPage from '@/components/SubjectLearning/SubjectLearnPage.vue';
import mathData from '../data/mathData.js';
</script>