<template>
  <van-popup
    v-model:show="visible"
    position="bottom"
    :style="{ height: '70%' }"
    round
    closeable
    @close="$emit('close')"
  >
    <div class="detail-popup" v-if="currentReport">
      <div class="popup-header">
        <h3>举报详情</h3>
      </div>

      <div class="popup-content">
        <div class="detail-item">
          <div class="label">举报类型</div>
          <div class="value">
            <van-tag :type="getTypeTagType(currentReport.type)">
              {{ currentReport.type }}
            </van-tag>
          </div>
        </div>

        <div class="detail-item">
          <div class="label">提交时间</div>
          <div class="value">{{ formatFullTime(currentReport.time) }}</div>
        </div>

        <div class="detail-item">
          <div class="label">处理状态</div>
          <div class="value">
            <van-tag :type="getStatusTagType(currentReport.status)">
              {{ currentReport.statusText }}
            </van-tag>
          </div>
        </div>

        <div class="detail-item">
          <div class="label">被举报对象</div>
          <div class="value">{{ currentReport.target }}</div>
        </div>

        <div class="detail-item">
          <div class="label">举报原因</div>
          <div class="value reason">{{ currentReport.reason }}</div>
        </div>

        <div class="detail-item" v-if="currentReport.contact">
          <div class="label">联系方式</div>
          <div class="value">{{ currentReport.contact }}</div>
        </div>

        <div class="detail-item" v-if="currentReport.reply">
          <div class="label">处理结果</div>
          <div class="value reply">{{ currentReport.reply }}</div>
        </div>

        <div class="detail-item" v-if="currentReport.images && currentReport.images.length > 0">
          <div class="label">证据截图</div>
          <div class="value">
            <van-image
              v-for="(img, index) in currentReport.images"
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
  import { Popup as VanPopup, Tag as VanTag, Image as VanImage } from 'vant';

  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true,
    },
    currentReport: {
      type: Object,
      default: null,
    },
    formatFullTime: {
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

  const emit = defineEmits(['update:modelValue', 'close']);

  // 使用计算属性实现双向绑定
  const visible = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
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

          &.reason {
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
