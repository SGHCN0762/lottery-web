<template>
  <section class="history-section">
    <h3 class="history-title">{{ title }}</h3>
    <div class="history-list">
      <div
        v-for="(record, index) in records"
        :key="index"
        class="history-item"
        :class="getRecordClass(record)"
      >
        <slot :record="record" :index="index">
          <span class="default-content">{{ formatRecord(record) }}</span>
        </slot>
      </div>
    </div>
    <div v-if="records.length === 0" class="empty-state">
      {{ emptyText }}
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  records: {
    type: Array,
    required: true,
    default: () => []
  },
  emptyText: {
    type: String,
    default: '暂无记录'
  }
})

const getRecordClass = (record) => {
  if (record.status) {
    return record.status
  }
  return ''
}

const formatRecord = (record) => {
  return JSON.stringify(record)
}
</script>

<style lang="less" scoped>
.history-section {
  .history-title {
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-md);
    font-weight: var(--font-weight-semibold);
  }

  .history-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);

    .history-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-md);
      background: var(--color-bg-secondary);
      border-radius: var(--radius-md);
      animation: slideIn 0.3s ease-out;

      &.correct {
        background: rgba(82, 196, 26, 0.1);
        border: 1px solid var(--color-success);
      }

      &.wrong {
        background: rgba(255, 77, 79, 0.1);
        border: 1px solid var(--color-danger);
      }

      &.hint {
        background: rgba(24, 144, 255, 0.1);
        border: 1px solid var(--color-primary);
      }

      &.bonus {
        background: rgba(255, 215, 0, 0.1);
        border: 1px solid var(--color-warning);
      }
    }
  }

  .empty-state {
    text-align: center;
    padding: var(--spacing-xl);
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
  }
}
</style>
