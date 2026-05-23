<template>
  <section class="filter-section">
    <div class="filter-tabs">
      <div
        class="filter-tab"
        :class="{ active: modelValue === 'all' }"
        @click="$emit('update:modelValue', 'all')"
      >
        {{ t('badges.filter.all') }}
      </div>
      <div
        class="filter-tab"
        :class="{ active: modelValue === 'unlocked' }"
        @click="$emit('update:modelValue', 'unlocked')"
      >
        {{ t('badges.filter.unlocked') }}
      </div>
      <div
        class="filter-tab"
        :class="{ active: modelValue === 'locked' }"
        @click="$emit('update:modelValue', 'locked')"
      >
        {{ t('badges.filter.locked') }}
      </div>
    </div>
  </section>
</template>

<script setup>
  import { useI18n } from 'vue-i18n';

  // ========================================
  // i18n
  // ========================================
  const { t } = useI18n();

  // ========================================
  // Props & Emits
  // ========================================
  defineProps({
    modelValue: {
      type: String,
      required: true,
      validator: value => ['all', 'unlocked', 'locked'].includes(value),
    },
  });

  defineEmits(['update:modelValue']);
</script>

<style lang="less" scoped>
  .filter-section {
    padding: 12px 16px;
    margin-bottom: 8px;

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
