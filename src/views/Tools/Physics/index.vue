<template>
  <SubjectIndex
    subject-key="physics"
    :all-data="physicsData"
    learn-route="/tools/physics/learn"
    practice-route="/tools/physics/practice"
  />
</template>

<script setup>
import SubjectIndex from '@/components/SubjectLearning/SubjectIndex.vue';
import physicsData from './data/physicsData.js';
</script>