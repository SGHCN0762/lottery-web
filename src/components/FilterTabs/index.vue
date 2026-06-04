<template>
  <section class="filter-section">
    <div class="filter-tabs">
      <div
        v-for="tab in tabs"
        :key="tab.value"
        class="filter-tab"
        :class="{ active: modelValue === tab.value }"
        @click="$emit('update:modelValue', tab.value)"
      >
        {{ tab.label }}
      </div>
    </div>
  </section>
</template>

<script setup>
  const props = defineProps({
    modelValue: {
      type: [String, Number],
      required: true,
    },
    tabs: {
      type: Array,
      required: true,
      validator: value => {
        return value.every(tab => {
          return tab.value !== undefined && tab.label !== undefined;
        });
      },
    },
  });

  defineEmits(['update:modelValue']);
</script>

<style lang="less" scoped>
  .filter-section {
    margin: 0 var(--spacing-sm) var(--spacing-md);

    .filter-tabs {
      display: flex;
      background: var(--color-bg-tertiary);
      border-radius: 8px;
      padding: 3px;
      transition: background-color var(--transition-base);

      .filter-tab {
        flex: 1;
        text-align: center;
        padding: 8px 12px;
        font-size: 14px;
        color: var(--color-text-secondary);
        border-radius: 6px;
        transition: all var(--transition-base);
        cursor: pointer;
        user-select: none;

        &.active {
          background: var(--color-bg-secondary);
          color: var(--color-text-primary);
          font-weight: 500;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        &:not(.active):active {
          opacity: 0.7;
        }
      }
    }
  }
</style>
