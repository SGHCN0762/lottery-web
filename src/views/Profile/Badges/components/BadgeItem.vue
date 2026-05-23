<template>
  <div class="badge-item" :class="{ unlocked: badge.unlocked }" @click="$emit('click', badge)">
    <!-- 左侧图标区域 -->
    <div class="badge-left">
      <div class="badge-icon-wrapper">
        <div class="badge-icon" :style="{ background: badge.color }">
          <van-icon :name="badge.icon" size="28" color="white" />
        </div>
        <div v-if="!badge.unlocked" class="lock-badge">
          <van-icon name="lock" size="14" />
        </div>
      </div>
    </div>

    <!-- 中间内容区域 -->
    <div class="badge-content">
      <div class="badge-header">
        <h3 class="badge-name">{{ badge.name }}</h3>
        <p class="badge-desc">{{ badge.description }}</p>
      </div>

      <!-- 进度条或解锁时间 -->
      <div v-if="!badge.unlocked && badge.progress" class="badge-progress-wrap">
        <van-progress
          :percentage="badge.progress.percentage"
          stroke-width="6"
          :show-pivot="false"
          color="linear-gradient(90deg, #52c41a 0%, #73d13d 100%)"
        />
        <span class="progress-text"> {{ badge.progress.current }}/{{ badge.progress.total }} </span>
      </div>
      <div v-else-if="badge.unlocked && badge.unlockDate" class="badge-unlock-time">
        <van-icon name="clock-o" size="14" />
        <span>{{ formattedUnlockDate }}</span>
      </div>
    </div>

    <!-- 右侧箭头 -->
    <div class="badge-right">
      <van-icon name="arrow" size="16" color="#c7c7cc" />
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { Icon as VanIcon, Progress as VanProgress } from 'vant';
  import { useI18n } from 'vue-i18n';

  // ========================================
  // i18n
  // ========================================
  const { t } = useI18n();

  // ========================================
  // Props & Emits
  // ========================================
  const props = defineProps({
    badge: {
      type: Object,
      required: true,
      default: () => ({
        id: 0,
        name: '',
        description: '',
        icon: '',
        color: '',
        unlocked: false,
        unlockDate: null,
        progress: null,
      }),
    },
  });

  defineEmits(['click']);

  // ========================================
  // 计算属性
  // ========================================

  /**
   * 格式化解锁日期
   */
  const formattedUnlockDate = computed(() => {
    if (!props.badge.unlockDate) return '';
    const date = new Date(props.badge.unlockDate);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}-${day}`;
  });
</script>

<style lang="less" scoped>
  .badge-item {
    border-radius: 12px;
    padding: 8px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: var(--shadow-sm);
    transition: all var(--transition-base);
    cursor: pointer;
    position: relative;
    background: linear-gradient(
      135deg,
      rgba(102, 126, 234, 0.08) 0%,
      rgba(118, 75, 162, 0.08) 100%
    );

    &:active {
      transform: scale(0.98);
      background: var(--color-bg-tertiary);
    }

    &.unlocked {
      background: var(--color-bg-secondary);
    }

    // 左侧图标
    .badge-left {
      flex-shrink: 0;

      .badge-icon-wrapper {
        position: relative;
        width: 56px;
        height: 56px;

        .badge-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: transform var(--transition-base);
        }

        .lock-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 22px;
          height: 22px;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          border: 2px solid var(--color-bg-secondary);
        }
      }
    }

    // 中间内容
    .badge-content {
      flex: 1;
      min-width: 0;

      .badge-header {
        display: flex;
        align-items: center;
        margin-bottom: 6px;
        gap: 8px;

        .badge-name {
          font-size: 16px;
          font-weight: 600;
          color: var(--color-text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .badge-desc {
          font-size: 13px;
          color: var(--color-text-tertiary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .badge-progress-wrap {
        .progress-text {
          display: block;
          font-size: 12px;
          color: var(--color-text-tertiary);
          margin-top: 6px;
          text-align: right;
        }
      }

      .badge-unlock-time {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: var(--color-text-tertiary);
        padding: 4px 8px;
        background: var(--color-bg-tertiary);
        border-radius: 4px;
      }
    }

    // 右侧箭头
    .badge-right {
      flex-shrink: 0;
    }
  }
</style>
