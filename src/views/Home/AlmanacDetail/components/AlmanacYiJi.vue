<template>
  <div class="yi-ji-section">
    <div class="yi-block">
      <div class="block-title">
        <span class="icon">✓</span>
        <span>宜</span>
      </div>
      <div class="block-content">
        <span v-for="(item, index) in almanac?.yi" :key="index" class="tag yi-tag">
          {{ item }}
        </span>
        <span v-if="!almanac?.yi || almanac.yi.length === 0" class="empty-text">无</span>
      </div>
    </div>

    <div class="ji-block">
      <div class="block-title">
        <span class="icon">✗</span>
        <span>忌</span>
      </div>
      <div class="block-content">
        <span v-for="(item, index) in almanac?.ji" :key="index" class="tag ji-tag">
          {{ item }}
        </span>
        <span v-if="!almanac?.ji || almanac.ji.length === 0" class="empty-text">无</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    almanac: {
      type: Object,
      default: null,
    },
  });
</script>

<style lang="less" scoped>
  .yi-ji-section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    .yi-block,
    .ji-block {
      .block-title {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: var(--spacing-md);
        font-size: 16px;
        font-weight: 600;
        color: var(--color-text-primary);

        .icon {
          font-size: 18px;
        }
      }

      .block-content {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        .tag {
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.15s ease;

          &:active {
            opacity: 0.7;
            transform: scale(0.98);
          }
        }

        .yi-tag {
          background: rgba(212, 175, 55, 0.08);
          border: 1px solid rgba(212, 175, 55, 0.25);
          color: #b8960c;
        }

        .ji-tag {
          background: rgba(238, 68, 68, 0.08);
          border: 1px solid rgba(238, 68, 68, 0.25);
          color: #cc3333;
        }

        .empty-text {
          font-size: 14px;
          color: var(--color-text-tertiary);
        }
      }
    }

    .yi-block .icon {
      color: var(--color-success);
    }
    .ji-block .icon {
      color: var(--color-danger);
    }
  }
</style>
