<template>
  <div class="invite-page">
    <!-- 邀请奖励卡片 -->
    <section class="reward-card">
      <div class="reward-header">
        <van-icon name="gift-o" size="32" color="white" />
        <h2>{{ t('invite.inviteFriendsEarnPoints') }}</h2>
      </div>
      <p class="reward-desc" v-html="t('invite.perInviteReward', { points: 50 })"></p>
      <div class="reward-stats">
        <div class="stat-item">
          <div class="stat-value">{{ invitedCount }}</div>
          <div class="stat-label">{{ t('invite.invitedCount') }}</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-value">{{ totalReward }}</div>
          <div class="stat-label">{{ t('invite.earnedPoints') }}</div>
        </div>
      </div>
    </section>

    <!-- 邀请方式 -->
    <section class="invite-methods">
      <div class="section-title">{{ t('invite.inviteMethods') }}</div>
      <van-grid :column-num="3" :border="false">
        <van-grid-item @click="handleShareWechat">
          <template #icon>
            <div class="method-icon wechat">
              <van-icon name="wechat" size="24" color="white" />
            </div>
          </template>
          <template #text>
            <span class="method-text">{{ t('invite.wechatShare') }}</span>
          </template>
        </van-grid-item>

        <van-grid-item @click="handleShareQQ">
          <template #icon>
            <div class="method-icon qq">
              <van-icon name="qq" size="24" color="white" />
            </div>
          </template>
          <template #text>
            <span class="method-text">{{ t('invite.qqShare') }}</span>
          </template>
        </van-grid-item>

        <van-grid-item @click="handleCopyLink">
          <template #icon>
            <div class="method-icon link">
              <van-icon name="link-o" size="24" color="white" />
            </div>
          </template>
          <template #text>
            <span class="method-text">{{ t('invite.copyLink') }}</span>
          </template>
        </van-grid-item>
      </van-grid>
    </section>

    <!-- 邀请海报 -->
    <section class="poster-section">
      <div class="section-title">{{ t('invite.inviteMethods') }}</div>
      <div class="poster-card" @click="showPoster = true">
        <div class="poster-preview">
          <div class="poster-content">
            <van-icon name="qr" size="64" color="var(--color-primary)" />
            <p>{{ t('invite.copyLink') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 邀请规则 -->
    <section class="rules-section">
      <div class="section-title">{{ t('points.types.invite') }}</div>
      <van-cell-group inset>
        <van-cell :title="t('help.faq.howToEarnPoints')">
          <template #label>
            <span class="rule-desc">{{ t('help.onlineService.replies.points') }}</span>
          </template>
        </van-cell>
        <van-cell :title="t('invite.rewardDistributionTitle')">
          <template #label>
            <span class="rule-desc">{{ t('invite.rewardDistributionDesc') }}</span>
          </template>
        </van-cell>
        <van-cell :title="t('invite.inviteLimitTitle')">
          <template #label>
            <span class="rule-desc">{{ t('invite.inviteLimitDesc') }}</span>
          </template>
        </van-cell>
      </van-cell-group>
    </section>

    <!-- 邀请记录 -->
    <section class="records-section">
      <div class="section-title">{{ t('invite.inviteRecords') }}</div>
      <van-empty v-if="inviteRecords.length === 0" :description="t('invite.noRecords')" />

      <van-cell-group v-else inset>
        <van-cell v-for="record in inviteRecords" :key="record.id" class="record-item">
          <template #icon>
            <div class="record-avatar">
              <van-icon name="user-o" size="20" />
            </div>
          </template>

          <template #title>
            <div class="record-info">
              <div class="friend-name">{{ record.friendName }}</div>
              <div class="record-time">{{ formatTime(record.time) }}</div>
            </div>
          </template>

          <template #right-icon>
            <div class="record-reward">
              <van-icon name="gold-coin-o" size="16" />
              <span>+{{ record.reward }}</span>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </section>

    <!-- 邀请海报弹窗 -->
    <van-popup v-model:show="showPoster" round position="bottom" :style="{ height: '80%' }">
      <div class="poster-popup">
        <div class="popup-header">
          <h3>{{ t('invite.title') }}</h3>
          <van-icon name="cross" @click="showPoster = false" />
        </div>

        <div class="popup-content">
          <div class="poster-container" ref="posterRef">
            <div class="poster-bg">
              <div class="poster-title">{{ t('app.name') }}</div>
              <div class="poster-subtitle">{{ t('invite.inviteFriendsEarnPoints') }}</div>

              <div class="poster-qrcode">
                <van-icon name="qr" size="120" color="var(--color-primary)" />
              </div>

              <div class="poster-invite-code">
                <span>{{ t('invite.copyLink') }}：</span>
                <strong>{{ inviteCode }}</strong>
              </div>

              <div class="poster-reward-info">
                <van-icon name="gift-o" size="20" />
                <span v-html="t('invite.perInviteReward', { points: 50 })"></span>
              </div>
            </div>
          </div>

          <div class="poster-actions">
            <van-button block round type="primary" @click="handleSavePoster">
              <van-icon name="down" />
              {{ t('common.download') }}
            </van-button>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { showToast, showSuccessToast } from 'vant';
  import {
    Grid as VanGrid,
    GridItem as VanGridItem,
    Icon as VanIcon,
    CellGroup as VanCellGroup,
    Cell as VanCell,
    Empty as VanEmpty,
    Popup as VanPopup,
    Button as VanButton,
  } from 'vant';

  // ========================================
  // i18n
  // ========================================
  const { t } = useI18n();

  // ========================================
  // 响应式数据
  // ========================================
  const showPoster = ref(false);
  const posterRef = ref(null);
  const invitedCount = ref(0);
  const totalReward = ref(0);
  const inviteCode = ref('');
  const inviteRecords = ref([]);

  // ========================================
  // 工具函数
  // ========================================

  /**
   * 格式化时间
   */
  const formatTime = timestamp => {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}-${day}`;
  };

  /**
   * 生成邀请码
   */
  const generateInviteCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  /**
   * 加载邀请数据
   */
  const loadInviteData = () => {
    const stored = localStorage.getItem('inviteRecords');
    if (stored) {
      inviteRecords.value = JSON.parse(stored);
      invitedCount.value = inviteRecords.value.length;
      totalReward.value = inviteRecords.value.reduce((sum, r) => sum + r.reward, 0);
    } else {
      // 生成模拟数据
      inviteRecords.value = generateMockRecords();
      invitedCount.value = inviteRecords.value.length;
      totalReward.value = inviteRecords.value.reduce((sum, r) => sum + r.reward, 0);
      localStorage.setItem('inviteRecords', JSON.stringify(inviteRecords.value));
    }

    // 生成邀请码
    const storedCode = localStorage.getItem('inviteCode');
    if (storedCode) {
      inviteCode.value = storedCode;
    } else {
      inviteCode.value = generateInviteCode();
      localStorage.setItem('inviteCode', inviteCode.value);
    }
  };

  /**
   * 生成模拟邀请记录
   */
  const generateMockRecords = () => {
    const names = ['小明', '小红', '小李', '小王', '小张'];
    const records = [];

    for (let i = 0; i < 3; i++) {
      records.push({
        id: i + 1,
        friendName: names[i],
        reward: 50,
        time: Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
      });
    }

    return records.sort((a, b) => b.time - a.time);
  };

  /**
   * 分享到微信
   */
  const handleShareWechat = () => {
    showToast(t('invite.shareFail'));
  };

  /**
   * 分享到QQ
   */
  const handleShareQQ = () => {
    showToast(t('invite.shareFail'));
  };

  /**
   * 复制链接
   */
  const handleCopyLink = async () => {
    const inviteUrl = `${window.location.origin}/register?code=${inviteCode.value}`;

    try {
      await navigator.clipboard.writeText(inviteUrl);
      showSuccessToast(t('invite.linkCopied'));
    } catch (error) {
      // 降级方案
      const textarea = document.createElement('textarea');
      textarea.value = inviteUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showSuccessToast(t('invite.linkCopied'));
    }
  };

  /**
   * 保存海报
   */
  const handleSavePoster = () => {
    showToast(t('common.loading'));
    // TODO: 实现真实的海报生成和保存逻辑
    showPoster.value = false;
  };

  // ========================================
  // 生命周期
  // ========================================
  onMounted(() => {
    loadInviteData();
  });
</script>

<style lang="less" scoped>
  .invite-page {
    min-height: 100%;
    background: var(--color-bg-primary);
    padding-bottom: var(--spacing-lg);
  }

  /* ========================================
   邀请奖励卡片
   ======================================== */
  .reward-card {
    margin: var(--spacing-sm);
    padding: var(--spacing-md);
    background: var(--gradient-primary);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    color: white;
    text-align: center;

    .reward-header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-xs);
      margin-bottom: var(--spacing-sm);

      h2 {
        margin: 0;
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-bold);
      }
    }

    .reward-desc {
      font-size: 12px;
      opacity: 0.9;
      margin: 0 0 var(--spacing-md) 0;

      strong {
        font-size: var(--font-size-md);
        color: #ffd700;
      }
    }

    .reward-stats {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-md);
      padding-top: var(--spacing-sm);
      border-top: 1px solid rgba(255, 255, 255, 0.2);

      .stat-item {
        text-align: center;

        .stat-value {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          margin-bottom: 2px;
        }

        .stat-label {
          font-size: 11px;
          opacity: 0.85;
        }
      }

      .stat-divider {
        width: 1px;
        height: 28px;
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }

  /* ========================================
   区块标题
   ======================================== */
  .section-title {
    font-size: 13px;
    color: var(--color-text-secondary);
    margin: var(--spacing-md) var(--spacing-sm) var(--spacing-sm);
    font-weight: var(--font-weight-medium);
  }

  /* ========================================
   邀请方式
   ======================================== */
  .invite-methods {
    margin: 0 var(--spacing-sm);

    :deep(.van-grid-item__content) {
      padding: var(--spacing-md) var(--spacing-xs);
      background: transparent;
      transition: all var(--transition-fast);

      &:active {
        background-color: var(--color-bg-tertiary);
        transform: scale(0.95);
      }
    }

    .method-icon {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-full);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      &.wechat {
        background: linear-gradient(135deg, #07c160 0%, #06ad56 100%);
      }

      &.qq {
        background: linear-gradient(135deg, #12b7f5 0%, #0ea5e9 100%);
      }

      &.link {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
    }

    .method-text {
      font-size: 11px;
      color: var(--color-text-secondary);
    }
  }

  /* ========================================
   邀请海报
   ======================================== */
  .poster-section {
    margin: 0 var(--spacing-sm);

    .poster-card {
      cursor: pointer;
      transition: transform var(--transition-fast);

      &:active {
        transform: scale(0.98);
      }

      .poster-preview {
        background: var(--color-bg-secondary);
        border-radius: var(--radius-md);
        padding: var(--spacing-xl);
        text-align: center;
        border: 2px dashed var(--color-border);

        .poster-content {
          .van-icon {
            margin-bottom: var(--spacing-xs);
          }

          p {
            margin: 0;
            font-size: 12px;
            color: var(--color-text-secondary);
          }
        }
      }
    }
  }

  /* ========================================
   邀请规则
   ======================================== */
  .rules-section {
    margin: 0 var(--spacing-sm);

    .rule-desc {
      font-size: 11px;
      color: var(--color-text-secondary);
      line-height: 1.5;
    }
  }

  /* ========================================
   邀请记录
   ======================================== */
  .records-section {
    margin: 0 var(--spacing-sm);

    .record-item {
      margin-bottom: var(--spacing-xs);
      border-radius: var(--radius-sm);

      .record-avatar {
        width: 32px;
        height: 32px;
        border-radius: var(--radius-full);
        background: var(--color-bg-tertiary);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: var(--spacing-xs);
      }

      .record-info {
        .friend-name {
          font-size: var(--font-size-sm);
          color: var(--color-text-primary);
          font-weight: var(--font-weight-medium);
        }

        .record-time {
          font-size: 11px;
          color: var(--color-text-secondary);
          margin-top: 2px;
        }
      }

      .record-reward {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        color: var(--color-warning);
        font-weight: var(--font-weight-semibold);
        font-size: var(--font-size-md);
      }
    }
  }

  /* ========================================
   海报弹窗
   ======================================== */
  .poster-popup {
    height: 100%;
    display: flex;
    flex-direction: column;

    .popup-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-md);
      border-bottom: 1px solid var(--color-border);

      h3 {
        margin: 0;
        font-size: var(--font-size-md);
        color: var(--color-text-primary);
      }

      .van-icon {
        font-size: 18px;
        cursor: pointer;
        color: var(--color-text-secondary);
      }
    }

    .popup-content {
      flex: 1;
      overflow-y: auto;
      padding: var(--spacing-md);
      display: flex;
      flex-direction: column;

      .poster-container {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: var(--spacing-md);

        .poster-bg {
          width: 100%;
          max-width: 280px;
          aspect-ratio: 3/4;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);

          .poster-title {
            font-size: var(--font-size-xl);
            font-weight: var(--font-weight-bold);
            margin-bottom: 3px;
          }

          .poster-subtitle {
            font-size: 12px;
            opacity: 0.9;
            margin-bottom: var(--spacing-lg);
          }

          .poster-qrcode {
            background: white;
            padding: var(--spacing-sm);
            border-radius: var(--radius-sm);
            margin-bottom: var(--spacing-md);
          }

          .poster-invite-code {
            font-size: var(--font-size-sm);
            margin-bottom: var(--spacing-sm);

            strong {
              font-size: var(--font-size-md);
              letter-spacing: 2px;
            }
          }

          .poster-reward-info {
            display: flex;
            align-items: center;
            gap: var(--spacing-xs);
            font-size: 12px;
            opacity: 0.9;
          }
        }
      }

      .poster-actions {
        margin-top: auto;
      }
    }
  }
</style>
