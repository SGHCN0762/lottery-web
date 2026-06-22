<template>
  <div class="color-picker-wrapper">
    <input
      type="color"
      :value="modelValue"
      @input="handleInput"
      class="color-input"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: String, required: true },
});

const emit = defineEmits(['update:modelValue']);

const handleInput = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<style lang="less" scoped>
.color-picker-wrapper {
  display: flex;
  align-items: center;

  .color-input {
    width: 32px;
    height: 32px;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    padding: 0;
    cursor: pointer;
  }
}
</style>