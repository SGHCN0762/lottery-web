<template>
  <SubjectIndex
    subject-key="partyHistory"
    :all-data="partyHistoryData"
    learn-route="/tools/party-history/learn"
    practice-route="/tools/party-history/practice"
  />
</template>

<script setup>
import SubjectIndex from '@/components/SubjectLearning/SubjectIndex.vue';
import { partyHistoryData } from './data/partyHistoryDataNew.js';
</script>