<template>
  <van-popup
    v-model:show="showPopup"
    position="bottom"
    :style="{ height: '70%' }"
    round
    closeable
    @close="$emit('close')"
  >
    <div class="detail-popup" v-if="record">
      <div class="popup-header">
        <h3>{{ title }}</h3>
      </div>

      <div class="popup-content">
        <div class="detail-item">
          <div class="label">{{ typeLabel }}</div>
          <div class="value">
            <van-tag :type="getTypeTagType(record.type)">
              {{ record.type }}
            </van-tag>
          </div>
        </div>

        <div class="detail-item">
          <div class="label">提交时间</div>
          <div class="value">{{ formatFullTime(record.time) }}</div>
        </div>

        <div class="detail-item">
          <div class="label">处理状态</div>
          <div class="value">
            <van-tag :type="getStatusTagType(record.status)">
              {{ record.statusText }}
            </van-tag>
          </div>
        </div>

        <div class="detail-item" v-if="showTarget && record.target">
          <div class="label">{{ targetLabel }}</div>
          <div class="value">{{ record.target }}</div>
        </div>

        <div class="detail-item">
          <div class="label">{{ descriptionLabel }}</div>
          <div class="value description">{{ record.description || record.reason }}</div>
        </div>

        <div class="detail-item" v-if="record.contact">
          <div class="label">联系方式</div>
          <div class="value">{{ record.contact }}</div>
        </div>

        <div class="detail-item" v-if="record.reply">
          <div class="label">{{ replyLabel }}</div>
          <div class="value reply">{{ record.reply }}</div>
        </div>

        <div class="detail-item" v-if="record.images && record.images.length > 0">
          <div class="label">{{ imagesLabel }}</div>
          <div class="value">
            <van-image
              v-for="(img, index) in record.images"
              :key="index"
              :src="img"
              width="80"
              height="80"
              fit="cover"
              radius="var(--radius-sm)"
              style="margin-right: var(--spacing-xs)"
            />
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
  import { computed } from 'vue';
  import dayjs from 'dayjs';
  import { Popup as VanPopup, Tag as VanTag, Image as VanImage } from 'vant';

  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
    record: {
      type: Object,
      default: null,
    },
    title: {
      type: String,
      default: '详情',
    },
    typeLabel: {
      type: String,
      default: '类型',
    },
    targetLabel: {
      type: String,
      default: '对象',
    },
    descriptionLabel: {
      type: String,
      default: '描述',
    },
    replyLabel: {
      type: String,
      default: '回复',
    },
    imagesLabel: {
      type: String,
      default: '图片',
    },
    showTarget: {
      type: Boolean,
      default: false,
    },
    formatFullTime: {
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

  const emit = defineEmits(['update:show', 'close']);

  const showPopup = computed({
    get: () => props.show,
    set: value => emit('update:show', value),
  });
</script>

<style lang="less" scoped>
  .detail-popup {
    height: 100%;
    display: flex;
    flex-direction: column;

    .popup-header {
      padding: var(--spacing-md);
      border-bottom: 1px solid var(--color-border);

      h3 {
        margin: 0;
        font-size: var(--font-size-md);
        color: var(--color-text-primary);
        text-align: center;
      }
    }

    .popup-content {
      flex: 1;
      overflow-y: auto;
      padding: var(--spacing-md);

      .detail-item {
        margin-bottom: var(--spacing-md);

        .label {
          font-size: 12px;
          color: var(--color-text-secondary);
          margin-bottom: 3px;
        }

        .value {
          font-size: 13px;
          color: var(--color-text-primary);
          line-height: 1.5;

          &.description {
            font-size: 13px;
            color: var(--color-text-secondary);
            white-space: pre-wrap;
          }

          &.reply {
            background: var(--color-bg-tertiary);
            padding: var(--spacing-sm);
            border-radius: var(--radius-sm);
            font-size: 13px;
            color: var(--color-text-primary);
          }
        }
      }
    }
  }
</style>
