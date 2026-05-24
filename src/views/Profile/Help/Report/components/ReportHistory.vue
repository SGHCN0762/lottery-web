<template>
  <section class="report-history">
    <div class="section-title">我的举报记录</div>
    <van-empty v-if="reportList.length === 0" description="暂无举报记录" />

    <van-cell-group v-else inset>
      <van-cell
        v-for="item in reportList"
        :key="item.id"
        class="report-item"
        @click="$emit('detail-click', item)"
      >
        <template #title>
          <div class="report-header">
            <van-tag :type="getTypeTagType(item.type)" size="medium">
              {{ item.type }}
            </van-tag>
            <span class="report-time">{{ formatTime(item.time) }}</span>
          </div>
        </template>

        <template #label>
          <div class="report-preview">{{ item.reason }}</div>
        </template>

        <template #right-icon>
          <van-tag :type="getStatusTagType(item.status)">
            {{ item.statusText }}
          </van-tag>
        </template>
      </van-cell>
    </van-cell-group>
  </section>
</template>

<script setup>
  import { Empty as VanEmpty, CellGroup as VanCellGroup, Cell as VanCell, Tag as VanTag } from 'vant';

  const props = defineProps({
    reportList: {
      type: Array,
      required: true,
    },
    formatTime: {
      type: Function,
      required: true,
    },
    getTypeTagType: {
      type: Function,
      required: true,
    },
    getStatusTagType: {
      type: Function,
      required: true,
    },
  });

  defineEmits(['detail-click']);
</script>

<style lang="less" scoped>
  .report-history {
    margin: 0 var(--spacing-sm);

    .section-title {
      font-size: 13px;
      color: var(--color-text-secondary);
      margin: var(--spacing-md) var(--spacing-sm) var(--spacing-sm);
      font-weight: var(--font-weight-medium);
    }

    .report-item {
      margin-bottom: var(--spacing-xs);
      border-radius: var(--radius-sm);

      .report-header {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        margin-bottom: 3px;

        .report-time {
          font-size: 11px;
          color: var(--color-text-secondary);
        }
      }

      .report-preview {
        font-size: 12px;
        color: var(--color-text-secondary);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
