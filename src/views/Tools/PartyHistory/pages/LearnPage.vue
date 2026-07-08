<template>
  <SubjectLearnPage
    subject-key="partyHistory"
    :all-data="partyHistoryData"
    :route-params="{ id: $route.params.id }"
    learn-route="/tools/party-history/learn"
    practice-route="/tools/party-history/practice"
  />
</template>

<script setup>
import SubjectLearnPage from '@/components/SubjectLearning/SubjectLearnPage.vue';
import { partyHistoryData } from '../data/partyHistoryDataNew.js';
</script>