<template>
  <div class="subcategory-section">
    <div class="subcategory-scroll">
      <button
        v-for="(sub, subKey) in subcategories"
        :key="subKey"
        class="subcategory-btn"
        :class="{ active: activeSubcategory === subKey }"
        @click="$emit('select', subKey)"
      >
        {{ sub.icon }} {{ sub.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  subcategories: {
    type: Object,
    required: true
  },
  activeSubcategory: {
    type: String,
    default: ''
  }
});

defineEmits(['select']);
</script>

<style lang="less" scoped>
.subcategory-section {
  padding: 0 var(--spacing-md);
  margin-bottom: var(--spacing-md);

  .subcategory-scroll {
    display: flex;
    gap: var(--spacing-sm);
    overflow-x: auto;
    padding: var(--spacing-xs) 0;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    .subcategory-btn {
      flex-shrink: 0;
      padding: var(--spacing-sm) var(--spacing-md);
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      transition: all var(--transition-base);

      &.active {
        background: var(--color-primary);
        border-color: var(--color-primary);
        color: #fff;
      }
    }
  }
}
</style>
