<template>
  <van-popup
    :show="show"
    @update:show="$emit('update:show', $event)"
    position="bottom"
    round
    class="almanac-detail-popup"
  >
    <div v-if="almanac" class="almanac-detail-modal">
      <!-- 头部 -->
      <div class="modal-header">
        <div class="date-info">
          <h3>{{ dateStr }}</h3>
          <p>{{ lunarInfo?.lunarText }} {{ almanac.gzYear }}年</p>
        </div>
        <div class="day-luck" :class="{ good: almanac.isGoodDay, bad: !almanac.isGoodDay }">
          {{ almanac.isGoodDay ? '吉日' : '平日' }}
        </div>
      </div>

      <!-- 内容区 -->
      <div class="modal-content">
        <!-- 宜忌 -->
        <div class="yi-ji-section">
          <div class="yi-block">
            <div class="block-title">
              <span class="icon">✅</span>
              <span>宜</span>
            </div>
            <div class="block-content">
              <span v-for="(item, index) in almanac.yi" :key="index" class="tag yi-tag">
                {{ item }}
              </span>
              <span v-if="!almanac.yi || almanac.yi.length === 0" class="empty-text">无</span>
            </div>
          </div>
          
          <div class="ji-block">
            <div class="block-title">
              <span class="icon">❌</span>
              <span>忌</span>
            </div>
            <div class="block-content">
              <span v-for="(item, index) in almanac.ji" :key="index" class="tag ji-tag">
                {{ item }}
              </span>
              <span v-if="!almanac.ji || almanac.ji.length === 0" class="empty-text">无</span>
            </div>
          </div>
        </div>

        <!-- 冲煞 -->
        <div class="chong-sha-section">
          <div class="info-item">
            <span class="label">冲</span>
            <span class="value">{{ almanac.chong || '无' }}</span>
          </div>
          <div class="info-item">
            <span class="label">煞</span>
            <span class="value">{{ almanac.sha || '无' }}</span>
          </div>
        </div>

        <!-- 详细信息 -->
        <div class="detail-section">
          <h4>详细信息</h4>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="label">建除</span>
              <span class="value">{{ almanac.jianChu || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">星宿</span>
              <span class="value">{{ almanac.xiu || '-' }}({{ almanac.xiuLuck || '-' }})</span>
            </div>
            <div class="detail-item">
              <span class="label">胎神</span>
              <span class="value">{{ almanac.taiShen || '-' }}</span>
            </div>
            <div class="detail-item">
              <span class="label">纳音</span>
              <span class="value">{{ almanac.naYin || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- 彭祖百忌 -->
        <div v-if="almanac.pengZuGan || almanac.pengZuZhi" class="pengzu-section">
          <h4>彭祖百忌</h4>
          <p v-if="almanac.pengZuGan">{{ almanac.pengZuGan }}</p>
          <p v-if="almanac.pengZuZhi">{{ almanac.pengZuZhi }}</p>
        </div>

        <!-- 时辰吉凶按钮 -->
        <div class="time-luck-button">
          <van-button 
            type="primary" 
            size="small" 
            block
            @click="showTimeLuck = true"
          >
            查看时辰吉凶
          </van-button>
        </div>
      </div>
    </div>

    <!-- 时辰吉凶弹窗 -->
    <van-popup
      v-model:show="showTimeLuck"
      position="bottom"
      round
      class="time-luck-popup"
    >
      <div class="time-luck-modal">
        <div class="modal-title">时辰吉凶</div>
        <div class="time-list">
          <div 
            v-for="(time, index) in timeSlots" 
            :key="index"
            class="time-item"
            :class="{ good: time.isGood, bad: !time.isGood }"
          >
            <div class="time-header">
              <span class="time-name">{{ time.name }}</span>
              <span class="time-range">{{ time.range }}</span>
              <span class="time-badge" :class="{ good: time.isGood, bad: !time.isGood }">
                {{ time.isGood ? '吉' : '凶' }}
              </span>
            </div>
            <div v-if="time.yi && time.yi.length > 0" class="time-yi">
              <span class="label">宜：</span>
              <span class="content">{{ time.yi.join('、') }}</span>
            </div>
            <div v-if="time.ji && time.ji.length > 0" class="time-ji">
              <span class="label">忌：</span>
              <span class="content">{{ time.ji.join('、') }}</span>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </van-popup>
</template>

<script setup>
  import { ref, computed, watch } from 'vue';
  import { Popup as VanPopup, Button as VanButton } from 'vant';
  import { getAlmanacInfo, getTimeLuck, getLunarDate } from '../hooks/useLunar';

  const props = defineProps({
    show: {
      type: Boolean,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  });

  defineEmits(['update:show']);

  const showTimeLuck = ref(false);
  const almanac = ref(null);
  const timeSlots = ref([]);
  const lunarInfo = ref(null);

  // 日期字符串
  const dateStr = computed(() => {
    if (!props.date) return '';
    return `${props.date.getFullYear()}年${props.date.getMonth() + 1}月${props.date.getDate()}日`;
  });

  // 监听日期变化，更新黄历信息
  watch(
    () => props.date,
    (newDate) => {
      if (newDate) {
        almanac.value = getAlmanacInfo(newDate);
        lunarInfo.value = getLunarDate(newDate);
        timeSlots.value = getTimeLuck(newDate);
      }
    },
    { immediate: true }
  );
</script>

<style lang="less" scoped>
  .almanac-detail-popup {
    :deep(.van-popup) {
      max-height: 85vh;
      border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    }
  }

  .almanac-detail-modal {
    padding: var(--spacing-xl);
    max-height: 85vh;
    overflow-y: auto;
    background: var(--color-bg-primary);

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-lg);
      padding-bottom: var(--spacing-md);
      border-bottom: 1px solid var(--color-border);

      .date-info {
        h3 {
          font-size: 20px;
          font-weight: 600;
          color: #000000;
          margin: 0 0 4px 0;
        }

        p {
          font-size: 14px;
          color: #7F7F7F;
          margin: 0;
        }
      }

      .day-luck {
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 600;

        &.good {
          background: rgba(7, 193, 96, 0.1);
          color: #07C160;
          border: 1px solid rgba(7, 193, 96, 0.3);
        }

        &.bad {
          background: rgba(255, 149, 0, 0.1);
          color: #FF9500;
          border: 1px solid rgba(255, 149, 0, 0.3);
        }
      }
    }

    .modal-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);

      .yi-ji-section {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);

        .yi-block,
        .ji-block {
          .block-title {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-bottom: var(--spacing-sm);
            font-size: 15px;
            font-weight: 600;
            color: #000000;

            .icon {
              font-size: 16px;
            }
          }

          .block-content {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;

            .tag {
              padding: 6px 12px;
              border-radius: 6px;
              font-size: 13px;
              transition: all 0.15s ease;

              &:active {
                opacity: 0.7;
                transform: scale(0.98);
              }
            }

            .yi-tag {
              background: rgba(7, 193, 96, 0.08);
              border: 1px solid rgba(7, 193, 96, 0.2);
              color: #07C160;
            }

            .ji-tag {
              background: rgba(255, 59, 48, 0.08);
              border: 1px solid rgba(255, 59, 48, 0.2);
              color: #FF3B30;
            }

            .empty-text {
              font-size: 13px;
              color: #B2B2B2;
            }
          }
        }
      }

      .chong-sha-section {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-md);
        padding: var(--spacing-md);
        background: rgba(0, 0, 0, 0.02);
        border-radius: 8px;

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 4px;

          .label {
            font-size: 12px;
            color: #B2B2B2;
          }

          .value {
            font-size: 14px;
            color: #333333;
            font-weight: 500;
          }
        }
      }

      .detail-section {
        h4 {
          font-size: 15px;
          font-weight: 600;
          color: #000000;
          margin: 0 0 var(--spacing-md) 0;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--spacing-md);

          .detail-item {
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: var(--spacing-sm);
            background: rgba(0, 0, 0, 0.02);
            border-radius: 6px;

            .label {
              font-size: 12px;
              color: #B2B2B2;
            }

            .value {
              font-size: 13px;
              color: #333333;
            }
          }
        }
      }

      .pengzu-section {
        h4 {
          font-size: 15px;
          font-weight: 600;
          color: #000000;
          margin: 0 0 var(--spacing-sm) 0;
        }

        p {
          font-size: 13px;
          line-height: 1.8;
          color: #7F7F7F;
          margin: 0 0 4px 0;
        }
      }

      .time-luck-button {
        margin-top: var(--spacing-md);
      }
    }
  }

  .time-luck-popup {
    :deep(.van-popup) {
      max-height: 70vh;
    }
  }

  .time-luck-modal {
    padding: var(--spacing-xl);
    max-height: 70vh;
    overflow-y: auto;

    .modal-title {
      font-size: 18px;
      font-weight: 600;
      color: #000000;
      text-align: center;
      margin-bottom: var(--spacing-lg);
      padding-bottom: var(--spacing-md);
      border-bottom: 1px solid var(--color-border);
    }

    .time-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);

      .time-item {
        padding: var(--spacing-md);
        background: rgba(0, 0, 0, 0.02);
        border-radius: 8px;
        border-left: 3px solid transparent;

        &.good {
          border-left-color: #07C160;
        }

        &.bad {
          border-left-color: #FF3B30;
        }

        .time-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-sm);

          .time-name {
            font-size: 15px;
            font-weight: 600;
            color: #000000;
          }

          .time-range {
            font-size: 12px;
            color: #B2B2B2;
          }

          .time-badge {
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;

            &.good {
              background: rgba(7, 193, 96, 0.1);
              color: #07C160;
            }

            &.bad {
              background: rgba(255, 59, 48, 0.1);
              color: #FF3B30;
            }
          }
        }

        .time-yi,
        .time-ji {
          font-size: 13px;
          line-height: 1.6;
          margin-top: 4px;

          .label {
            color: #7F7F7F;
            margin-right: 4px;
          }

          .content {
            color: #333333;
          }
        }

        .time-yi .label {
          color: #07C160;
        }

        .time-ji .label {
          color: #FF3B30;
        }
      }
    }
  }
</style>
