<template>
  <div v-if="almanac?.pengZuGan || almanac?.pengZuZhi" class="pengzu-section">
    <h4>彭祖百忌</h4>
    <p v-if="almanac.pengZuGan">{{ almanac.pengZuGan }}</p>
    <p v-if="almanac.pengZuZhi">{{ almanac.pengZuZhi }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  almanac: {
    type: Object,
    default: null
  }
});
</script>

<style lang="less" scoped>
.pengzu-section {
  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #000000;
    margin: 0 0 var(--spacing-md) 0;
  }

  p {
    font-size: 14px;
    line-height: 1.8;
    color: #7f7f7f;
    margin: 0 0 6px 0;
  }
}
</style>
