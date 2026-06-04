<template>
  <van-popup v-model:show="show" round position="bottom">
    <div class="detail-popup" v-if="badge">
      <!-- 弹窗头部 -->
      <div class="popup-header">
        <h3>{{ t('badges.detail.title') }}</h3>
        <van-icon name="cross" @click="handleClose" />
      </div>

      <!-- 弹窗内容 -->
      <div class="popup-content">
        <!-- 成就图标和状态 -->
        <div class="badge-hero">
          <div class="hero-icon" :style="{ background: badge.color }">
            <van-icon :name="badge.icon" size="28" color="white" />
          </div>
          <div v-if="!badge.unlocked" class="lock-badge">
            <van-icon name="lock" size="14" />
          </div>

          <!-- 成就信息 -->
          <div class="badge-info-section">
            <h2 class="info-name">{{ badge.name }}</h2>
            <p class="info-desc">{{ badge.description }}</p>
          </div>
        </div>

        <!-- 详细信息卡片 -->
        <div class="info-cards">
          <!-- 解锁条件 -->
          <div class="info-card">
            <div class="card-header">
              <van-icon name="flag-o" size="18" color="#1890ff" />
              <span>{{ t('badges.detail.requirement') }}</span>
            </div>
            <p class="card-content">{{ badge.requirement }}</p>
          </div>

          <!-- 成就奖励 -->
          <div class="info-card" v-if="badge.reward">
            <div class="card-header">
              <van-icon name="gold-coin-o" size="18" color="var(--color-warning)" />
              <span>{{ t('badges.detail.reward') }}</span>
            </div>
            <div class="card-content reward-value">
              <span>+{{ badge.reward }}</span>
              <span class="points-label">{{ t('common.points') }}</span>
            </div>
          </div>

          <!-- 小贴士 -->
          <div class="info-card tips-card">
            <div class="card-header">
              <van-icon name="bulb-o" size="18" color="var(--color-success)" />
              <span>{{ t('badges.detail.tips') }}</span>
            </div>
            <p class="card-content">{{ badge.tips || t('badges.detail.defaultTips') }}</p>
          </div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
  import { computed } from 'vue';
  import { Popup as VanPopup, Icon as VanIcon } from 'vant';
  import { useI18n } from 'vue-i18n';

  // ========================================
  // i18n
  // ========================================
  const { t } = useI18n();

  // ========================================
  // Props & Emits
  // ========================================
  const props = defineProps({
    modelValue: {
      type: Boolean,
      required: true,
      default: false,
    },
    badge: {
      type: Object,
      default: null,
    },
  });

  const emit = defineEmits(['update:modelValue', 'close']);

  // ========================================
  // 计算属性
  // ========================================

  /**
   * 弹窗显示状态（双向绑定）
   */
  const show = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
  });

  // ========================================
  // 方法
  // ========================================

  /**
   * 关闭弹窗
   */
  const handleClose = () => {
    show.value = false;
    emit('close');
  };
</script>

<style lang="less" scoped>
  .detail-popup {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: var(--color-bg-primary);
    transition: background-color var(--transition-base);

    .popup-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid #f7f8fa;
      transition: all var(--transition-base);

      h3 {
        margin: 0;
        font-size: 17px;
        font-weight: 600;
        color: var(--color-text-primary);
      }

      .van-icon {
        font-size: 20px;
        cursor: pointer;
        color: #969799;
        padding: 4px;
      }
    }

    .popup-content {
      flex: 1;
      overflow-y: auto;
      padding: 20px;

      // 成就英雄区
      .badge-hero {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        position: relative;

        .hero-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .lock-badge {
          position: absolute;
          top: -4px;
          left: 44px;
          width: 22px;
          height: 22px;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-primary);
          border: 2px solid var(--color-bg-secondary);
        }

        // 成就信息区
        .badge-info-section {
          margin-left: 16px;
          .info-name {
            font-size: 22px;
            font-weight: 600;
            color: var(--color-text-primary);
          }

          .info-desc {
            font-size: 14px;
            color: var(--color-text-secondary);
            line-height: 1.6;
          }
        }
      }

      // 信息卡片组
      .info-cards {
        display: flex;
        flex-direction: column;
        gap: 12px;

        .info-card {
          background: var(--color-bg-secondary);
          border-radius: 12px;
          padding: 16px;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-base);

          .card-header {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 12px;
            font-size: 15px;
            font-weight: 500;
            color: var(--color-text-primary);
          }

          .card-content {
            font-size: 14px;
            color: var(--color-text-secondary);
            line-height: 1.6;
            margin: 0;

            &.reward-value {
              display: flex;
              align-items: baseline;
              gap: 4px;
              font-size: 24px;
              font-weight: 600;
              color: #ff976a;

              .points-label {
                font-size: 14px;
                font-weight: 400;
                color: #969799;
              }
            }
          }

          &.tips-card {
            background: linear-gradient(
              135deg,
              rgba(7, 193, 96, 0.08) 0%,
              rgba(115, 209, 61, 0.08) 100%
            );
            border: 1px solid rgba(7, 193, 96, 0.15);
          }
        }
      }
    }
  }
</style>
