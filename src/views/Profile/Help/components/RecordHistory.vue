<template>
  <section class="record-history">
    <div class="section-title">{{ title }}</div>
    <van-empty v-if="recordList.length === 0" :description="emptyText" />

    <van-cell-group v-else inset>
      <van-cell
        v-for="item in recordList"
        :key="item.id"
        class="record-item"
        @click="$emit('view-detail', item)"
      >
        <template #title>
          <div class="report-content">
            <div class="record-header">
              <div class="record-header-left-wrapper">
                <span class="record-type">{{ item.type }}</span>
                <span class="record-time">{{ formatTime(item.time) }}</span>
              </div>
              <van-tag :type="getStatusTagType(item.status)" size="medium">
                {{ item.statusText }}
              </van-tag>
            </div>
          </div>
        </template>

        <template #label>
          <div class="record-preview">
            {{ getPreviewText(item) }}
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </section>
</template>

<script setup>
  import {
    Empty as VanEmpty,
    CellGroup as VanCellGroup,
    Cell as VanCell,
    Tag as VanTag,
  } from 'vant';
  import dayjs from 'dayjs';

  const props = defineProps({
    title: {
      type: String,
      default: '我的记录',
    },
    recordList: {
      type: Array,
      default: () => [],
    },
    emptyText: {
      type: String,
      default: '暂无记录',
    },
    previewField: {
      type: String,
      default: 'description',
    },
    formatTime: {
      type: Function,
      default: timestamp => {
        return dayjs(timestamp).format('YYYY-MM-DD HH:mm');
      },
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

  defineEmits(['view-detail']);

  const getPreviewText = item => {
    return item[props.previewField] || '';
  };
</script>

<style lang="less" scoped>
  .record-history {
    margin: 0 var(--spacing-sm);

    .section-title {
      font-size: 13px;
      color: var(--color-text-secondary);
      margin: var(--spacing-md) var(--spacing-sm) var(--spacing-sm);
      font-weight: var(--font-weight-medium);
    }

    .record-item {
      margin-bottom: var(--spacing-xs);
      border-radius: var(--radius-sm);

      :deep(.van-cell__title) {
        flex: 1;
        min-width: 0;
        padding-right: var(--spacing-xs);
      }

      .report-content {
        width: 100%;
      }

      .record-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--spacing-xs);
        margin-bottom: 3px;

        .record-time {
          font-size: 11px;
          color: var(--color-text-secondary);
          margin-left: 8px;
        }
      }

      .record-preview {
        font-size: 12px;
        color: var(--color-text-secondary);
        // 多行...显示2行
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
</style>
