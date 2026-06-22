<template>
  <div class="setting-item">
    <div class="setting-label">
      <span class="label-text">{{ label }}</span>
      <span class="value-text">{{ displayValue }}</span>
    </div>
    <van-slider
      v-model="localValue"
      :min="min"
      :max="max"
      :step="step"
      active-color="var(--color-primary)"
      inactive-color="var(--color-border)"
      bar-height="6px"
      @change="handleChange"
    >
      <template #button>
        <div class="slider-button" />
      </template>
    </van-slider>
    <div class="value-hints">
      <span>{{ min }}{{ unit }}</span>
      <span>{{ max }}{{ unit }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { Slider as VanSlider } from 'vant';

const props = defineProps({
  modelValue: { type: Number, required: true },
  label: { type: String, required: true },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  unit: { type: String, default: '' },
});

const emit = defineEmits(['update:modelValue', 'change']);

const localValue = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
  localValue.value = val;
});

const displayValue = computed(() => {
  const val = typeof localValue.value === 'number' ? localValue.value : 0;
  return `${val.toFixed(props.step < 1 ? 2 : 0)}${props.unit}`;
});

const handleChange = (value) => {
  localValue.value = value;
  emit('update:modelValue', value);
  emit('change', value);
};
</script>

<style lang="less" scoped>
.setting-item {
  .setting-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-sm);

    .label-text {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
    }

    .value-text {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-semibold);
      color: var(--color-primary);
    }
  }

  .value-hints {
    display: flex;
    justify-content: space-between;
    margin-top: var(--spacing-xs);
    font-size: var(--font-size-xs);
    color: var(--color-text-tertiary);
  }

  .slider-button {
    width: 20px;
    height: 20px;
    background: var(--color-primary);
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(var(--color-primary-rgb), 0.4);
  }
}
</style>