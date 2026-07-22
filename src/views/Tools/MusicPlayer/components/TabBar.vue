<template>
  <div class="tab-bar">
    <button 
      v-for="tab in tabs" 
      :key="tab.key"
      class="tab-item"
      :class="{ active: activeTab === tab.key }"
      @click="$emit('update:activeTab', tab.key)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  tabs: {
    type: Array,
    required: true
  },
  activeTab: {
    type: String,
    required: true
  }
})

defineEmits(['update:activeTab'])
</script>

<style lang="less" scoped>
.tab-bar {
  display: flex;
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
  padding: 0 16px;

  .tab-item {
    flex: 1;
    padding: 16px 0;
    background: transparent;
    border: none;
    font-size: 15px;
    color: var(--color-text-secondary);
    font-weight: 500;
    position: relative;
    cursor: pointer;

    &.active {
      color: var(--color-primary);

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 30px;
        height: 3px;
        background: var(--color-primary);
        border-radius: 2px;
      }
    }
  }
}
</style>
