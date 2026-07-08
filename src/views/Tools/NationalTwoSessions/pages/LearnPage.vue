<template>
  <SubjectLearnPage
    subject-key="nationalTwoSessions"
    :all-data="twoSessionsDataNew"
    :route-params="{ id: $route.params.id }"
    learn-route="/tools/national-two-sessions/learn"
    practice-route="/tools/national-two-sessions/practice"
  />
</template>

<script setup>
import SubjectLearnPage from '@/components/SubjectLearning/SubjectLearnPage.vue';
import { twoSessionsDataNew } from '../data/twoSessionsDataNew.js';
</script>