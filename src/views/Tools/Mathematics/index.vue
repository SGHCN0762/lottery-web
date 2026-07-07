<template>
  <SubjectIndex
    subject-key="math"
    :all-data="mathData"
    learn-route="/tools/math/learn"
    practice-route="/tools/math/practice"
  />
</template>

<script setup>
import SubjectIndex from '@/components/SubjectLearning/SubjectIndex.vue';
import mathData from './data/mathData.js';
</script>