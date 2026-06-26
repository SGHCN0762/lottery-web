<template>
  <div class="tool-card" :class="{ collapsed: isCollapsed() }">
    <div v-if="$slots.header || title" class="card-header" @click="handleHeaderClick">
      <div class="header-left">
        <van-icon v-if="icon" :name="icon" class="header-icon" />
        <span v-if="title" class="header-title">{{ title }}</span>
        <span v-if="count !== undefined" class="header-count">{{ count }}</span>
        <slot v-else name="header-left" />
      </div>
      <div class="header-right">
        <div v-if="$slots.headerRight && !isCollapsed()" class="header-actions" @click.stop>
          <slot name="headerRight" />
        </div>
        <van-icon v-if="collapsible" :name="isCollapsed() ? 'arrow-down' : 'arrow-up'" class="collapse-icon" />
      </div>
    </div>
    <div v-show="!isCollapsed()" class="card-body">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Icon as VanIcon } from 'vant';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  count: {
    type: [Number, String],
    default: undefined,
  },
  collapsible: {
    type: Boolean,
    default: false,
  },
  defaultCollapsed: {
    type: Boolean,
    default: false,
  },
  collapsed: {
    type: Boolean,
    default: undefined,
  },
});

const emit = defineEmits(['update:collapsed']);

const innerCollapsed = ref(props.defaultCollapsed);

const isCollapsed = () => {
  return props.collapsed !== undefined ? props.collapsed : innerCollapsed.value;
};

const handleHeaderClick = () => {
  if (props.collapsible) {
    const newVal = !isCollapsed();
    if (props.collapsed === undefined) {
      innerCollapsed.value = newVal;
    }
    emit('update:collapsed', newVal);
  }
};
</script>

<style lang="less" scoped>
.tool-card {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  overflow: hidden;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md) var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);

    &.collapsible {
      cursor: pointer;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);

      .header-icon {
        font-size: 18px;
        color: var(--color-primary);
      }

      .header-title {
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-medium);
        color: var(--color-text-primary);
      }

      .header-count {
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
        background: var(--color-bg-tertiary);
        padding: 2px 8px;
        border-radius: var(--radius-sm);
      }
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);

      .header-actions {
        display: flex;
        gap: var(--spacing-sm);

        :deep(.van-button) {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }

      .collapse-icon {
        font-size: 14px;
        color: var(--color-text-tertiary);
      }
    }
  }

  &.collapsed .card-header {
    border-bottom: none;
  }

  .card-body {
    padding: var(--spacing-md) var(--spacing-lg);
  }
}
</style>