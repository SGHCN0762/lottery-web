<template>
  <van-popup
    :show="show"
    @update:show="$emit('update:show', $event)"
    position="bottom"
    round
    class="festival-detail-popup"
  >
    <div v-if="info" class="festival-detail-modal">
      <!-- 头部 -->
      <div class="modal-header">
        <div class="header-icon">{{ info.icon }}</div>
        <h3>{{ info.name }}</h3>
      </div>

      <!-- 内容区 -->
      <div class="modal-content">
        <!-- 简介 -->
        <div class="intro-section">
          <p>{{ info.intro }}</p>
        </div>

        <!-- 习俗 -->
        <div v-if="info.customs && info.customs.length > 0" class="customs-section">
          <h4>传统习俗</h4>
          <div class="customs-list">
            <span v-for="(custom, index) in info.customs" :key="index" class="custom-tag">
              {{ custom }}
            </span>
          </div>
        </div>

        <!-- 饮食 -->
        <div v-if="info.food && info.food.length > 0" class="food-section">
          <h4>传统美食</h4>
          <div class="food-list">
            <span v-for="(item, index) in info.food" :key="index" class="food-tag">
              {{ item }}
            </span>
          </div>
        </div>

        <!-- 黄历按钮 -->
        <almanc-card v-if="!isEmpty(date)" @click="handleViewAlmanac" />
      </div>
    </div>
  </van-popup>
</template>

<script setup>
  import { computed } from 'vue';
  import { Popup as VanPopup } from 'vant';
  import { getFestivalOrSolarTermInfo } from '../data/festivalInfo';
  import AlmanacCard from './AlmanacCard.vue';
  const isEmpty = (obj) => {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
};

  const props = defineProps({
    show: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    date: {
      type: Object,
      default: () => ({}),
    },
  });

  const emit = defineEmits(['update:show', 'view-almanac']);

  const info = computed(() => {
    if (!props.name) return null;
    return getFestivalOrSolarTermInfo(props.name);
  });

  const handleViewAlmanac = async () => {
    if (props.date?.year && props.date?.month && props.date?.day) {
      try {
        const { getAlmanacInfo, getLunarDate } = await import('@/views/Home/hooks/useLunar');
        const targetDate = new Date(
          props.date.year,
          props.date.month - 1,
          props.date.day
        );
        getAlmanacInfo(targetDate);
        getLunarDate(targetDate);
      } catch (error) {
        console.warn('预加载黄历数据失败:', error);
      }
    }
    emit('view-almanac', props.date);
  };
</script>

<style lang="less" scoped>
  .festival-detail-popup {
    :deep(.van-popup) {
      max-height: 75vh;
      border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    }
  }

  .festival-detail-modal {
    padding: var(--spacing-xl);
    max-height: 75vh;
    overflow-y: auto;
    background: var(--color-bg-primary);

    .modal-header {
      text-align: center;
      margin-bottom: var(--spacing-lg);
      padding-bottom: var(--spacing-md);
      border-bottom: 1px solid var(--color-border);

      .header-icon {
        font-size: 56px;
        margin-bottom: var(--spacing-sm);
        line-height: 1;
      }

      h3 {
        font-size: 20px;
        font-weight: 600;
        color: var(--color-text-primary);
        margin: 0;
      }
    }

    .modal-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-lg);

      .intro-section {
        p {
          font-size: 15px;
          line-height: 1.8;
          color: var(--color-text-secondary);
          margin: 0;
          text-align: justify;
        }
      }

      .customs-section,
      .food-section {
        h4 {
          font-size: 15px;
          font-weight: 600;
          color: var(--color-text-primary);
          margin: 0 0 var(--spacing-md) 0;
          padding-left: 0;
          border-left: none;
        }

        .customs-list,
        .food-list {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-sm);

          .custom-tag {
            padding: 6px 12px;
            background: rgba(255, 151, 106, 0.08);
            border: 1px solid rgba(255, 151, 106, 0.2);
            border-radius: 6px;
            font-size: 13px;
            color: #d67600;
            transition: all 0.15s ease;

            &:active {
              opacity: 0.85;
              transform: scale(0.98);
            }
          }

          .food-tag {
            padding: 6px 12px;
            background: rgba(7, 193, 96, 0.08);
            border: 1px solid rgba(7, 193, 96, 0.2);
            border-radius: 6px;
            font-size: 13px;
            color: #009944;
            transition: all 0.15s ease;

            &:active {
              opacity: 0.85;
              transform: scale(0.98);
            }
          }
        }
      }
    }
  }
</style>
