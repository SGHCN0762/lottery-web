<template>
  <van-tabs v-model:active="activeIndex" @change="handleChange" class="law-tabs" scrollspy>
    <van-tab v-for="cat in categories" :key="cat.id" :title="cat.name" />
  </van-tabs>
</template>

<script setup>
import { computed } from 'vue';
import { Tabs as VanTabs, Tab as VanTab } from 'vant';
import { categories } from '../hooks/useLawsRegulations';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const activeIndex = computed({
  get: () => categories.findIndex(cat => cat.id === props.modelValue),
  set: (index) => {
    if (categories[index]) {
      emit('update:modelValue', categories[index].id);
    }
  },
});

const handleChange = (index) => {
  if (categories[index]) {
    emit('update:modelValue', categories[index].id);
  }
};
</script>

<style lang="less" scoped>
.law-tabs {
  margin-bottom: var(--spacing-md);
}
</style>
