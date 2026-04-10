<template>
  <div class="invite-page">
    <!-- 邀请奖励卡片 -->
    <section class="reward-card">
      <div class="reward-header">
        <van-icon name="gift-o" size="32" color="white" />
        <h2>邀请好友赚积分</h2>
      </div>
      <p class="reward-desc">每成功邀请一位好友，即可获得 <strong>50积分</strong> 奖励</p>
      <div class="reward-stats">
        <div class="stat-item">
          <div class="stat-value">{{ invitedCount }}</div>
          <div class="stat-label">已邀请</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-value">{{ totalReward }}</div>
          <div class="stat-label">获得积分</div>
        </div>
      </div>
    </section>

    <!-- 邀请方式 -->
    <section class="invite-methods">
      <div class="section-title">选择邀请方式</div>
      <van-grid :column-num="3" :border="false">
        <van-grid-item @click="handleShareWechat">
          <template #icon>
            <div class="method-icon wechat">
              <van-icon name="wechat" size="24" color="white" />
            </div>
          </template>
          <template #text>
            <span class="method-text">微信分享</span>
          </template>
        </van-grid-item>
        
        <van-grid-item @click="handleShareQQ">
          <template #icon>
            <div class="method-icon qq">
              <van-icon name="qq" size="24" color="white" />
            </div>
          </template>
          <template #text>
            <span class="method-text">QQ分享</span>
          </template>
        </van-grid-item>
        
        <van-grid-item @click="handleCopyLink">
          <template #icon>
            <div class="method-icon link">
              <van-icon name="link-o" size="24" color="white" />
            </div>
          </template>
          <template #text>
            <span class="method-text">复制链接</span>
          </template>
        </van-grid-item>
      </van-grid>
    </section>

    <!-- 邀请海报 -->
    <section class="poster-section">
      <div class="section-title">邀请海报</div>
      <div class="poster-card" @click="showPoster = true">
        <div class="poster-preview">
          <div class="poster-content">
            <van-icon name="qr" size="64" color="var(--color-primary)" />
            <p>点击生成专属邀请海报</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 邀请规则 -->
    <section class="rules-section">
      <div class="section-title">邀请规则</div>
      <van-cell-group inset>
        <van-cell title="如何算邀请成功？">
          <template #label>
            <span class="rule-desc">好友通过您的邀请链接注册并完成首次游戏</span>
          </template>
        </van-cell>
        <van-cell title="奖励何时发放？">
          <template #label>
            <span class="rule-desc">好友完成首次游戏后，奖励将自动发放到您的账户</span>
          </template>
        </van-cell>
        <van-cell title="有邀请上限吗？">
          <template #label>
            <span class="rule-desc">没有上限，邀请越多，奖励越多</span>
          </template>
        </van-cell>
      </van-cell-group>
    </section>

    <!-- 邀请记录 -->
    <section class="records-section">
      <div class="section-title">邀请记录</div>
      <van-empty v-if="inviteRecords.length === 0" description="暂无邀请记录" />
      
      <van-cell-group v-else inset>
        <van-cell
          v-for="record in inviteRecords"
          :key="record.id"
          class="record-item"
        >
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
    <van-popup
      v-model:show="showPoster"
      round
      position="bottom"
      :style="{ height: '80%' }"
    >
      <div class="poster-popup">
        <div class="popup-header">
          <h3>邀请海报</h3>
          <van-icon name="cross" @click="showPoster = false" />
        </div>
        
        <div class="popup-content">
          <div class="poster-container" ref="posterRef">
            <div class="poster-bg">
              <div class="poster-title">娱乐中心</div>
              <div class="poster-subtitle">邀请好友一起玩游戏</div>
              
              <div class="poster-qrcode">
                <van-icon name="qr" size="120" color="var(--color-primary)" />
              </div>
              
              <div class="poster-invite-code">
                <span>邀请码：</span>
                <strong>{{ inviteCode }}</strong>
              </div>
              
              <div class="poster-reward-info">
                <van-icon name="gift-o" size="20" />
                <span>成功邀请可得50积分</span>
              </div>
            </div>
          </div>
          
          <div class="poster-actions">
            <van-button block round type="primary" @click="handleSavePoster">
              <van-icon name="down" />
              保存海报
            </van-button>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { showToast, showSuccessToast } from 'vant'
import { 
  Grid as VanGrid,
  GridItem as VanGridItem,
  Icon as VanIcon,
  CellGroup as VanCellGroup,
  Cell as VanCell,
  Empty as VanEmpty,
  Popup as VanPopup,
  Button as VanButton
} from 'vant'

// ========================================
// 响应式数据
// ========================================
const showPoster = ref(false)
const posterRef = ref(null)
const invitedCount = ref(0)
const totalReward = ref(0)
const inviteCode = ref('')
const inviteRecords = ref([])

// ========================================
// 工具函数
// ========================================

/**
 * 格式化时间
 */
const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${month}-${day}`
}

/**
 * 生成邀请码
 */
const generateInviteCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

/**
 * 加载邀请数据
 */
const loadInviteData = () => {
  const stored = localStorage.getItem('inviteRecords')
  if (stored) {
    inviteRecords.value = JSON.parse(stored)
    invitedCount.value = inviteRecords.value.length
    totalReward.value = inviteRecords.value.reduce((sum, r) => sum + r.reward, 0)
  } else {
    // 生成模拟数据
    inviteRecords.value = generateMockRecords()
    invitedCount.value = inviteRecords.value.length
    totalReward.value = inviteRecords.value.reduce((sum, r) => sum + r.reward, 0)
    localStorage.setItem('inviteRecords', JSON.stringify(inviteRecords.value))
  }
  
  // 生成邀请码
  const storedCode = localStorage.getItem('inviteCode')
  if (storedCode) {
    inviteCode.value = storedCode
  } else {
    inviteCode.value = generateInviteCode()
    localStorage.setItem('inviteCode', inviteCode.value)
  }
}

/**
 * 生成模拟邀请记录
 */
const generateMockRecords = () => {
  const names = ['小明', '小红', '小李', '小王', '小张']
  const records = []
  
  for (let i = 0; i < 3; i++) {
    records.push({
      id: i + 1,
      friendName: names[i],
      reward: 50,
      time: Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
    })
  }
  
  return records.sort((a, b) => b.time - a.time)
}

/**
 * 分享到微信
 */
const handleShareWechat = () => {
  showToast('请在微信中打开以使用分享功能')
}

/**
 * 分享到QQ
 */
const handleShareQQ = () => {
  showToast('请在QQ中打开以使用分享功能')
}

/**
 * 复制链接
 */
const handleCopyLink = async () => {
  const inviteUrl = `${window.location.origin}/register?code=${inviteCode.value}`
  
  try {
    await navigator.clipboard.writeText(inviteUrl)
    showSuccessToast('链接已复制到剪贴板')
  } catch (error) {
    // 降级方案
    const textarea = document.createElement('textarea')
    textarea.value = inviteUrl
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    showSuccessToast('链接已复制到剪贴板')
  }
}

/**
 * 保存海报
 */
const handleSavePoster = () => {
  showToast('海报保存功能开发中')
  // TODO: 实现真实的海报生成和保存逻辑
  showPoster.value = false
}

// ========================================
// 生命周期
// ========================================
onMounted(() => {
  loadInviteData()
})
</script>

<style lang="less" scoped>
.invite-page {
  min-height: 100%;
  background: var(--color-bg-primary);
  padding-bottom: var(--spacing-xl);
}

/* ========================================
   邀请奖励卡片
   ======================================== */
.reward-card {
  margin: var(--spacing-md);
  padding: var(--spacing-xl);
  background: var(--gradient-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  color: white;
  text-align: center;

  .reward-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);

    h2 {
      margin: 0;
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
    }
  }

  .reward-desc {
    font-size: var(--font-size-sm);
    opacity: 0.9;
    margin: 0 0 var(--spacing-lg) 0;

    strong {
      font-size: var(--font-size-lg);
      color: #ffd700;
    }
  }

  .reward-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-lg);
    padding-top: var(--spacing-md);
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    .stat-item {
      text-align: center;

      .stat-value {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        margin-bottom: var(--spacing-xs);
      }

      .stat-label {
        font-size: var(--font-size-xs);
        opacity: 0.85;
      }
    }

    .stat-divider {
      width: 1px;
      height: 32px;
      background: rgba(255, 255, 255, 0.2);
    }
  }
}

/* ========================================
   区块标题
   ======================================== */
.section-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: var(--spacing-lg) var(--spacing-md) var(--spacing-md);
  font-weight: var(--font-weight-medium);
}

/* ========================================
   邀请方式
   ======================================== */
.invite-methods {
  margin: 0 var(--spacing-md);

  :deep(.van-grid-item__content) {
    padding: var(--spacing-lg) var(--spacing-xs);
    background: transparent;
    transition: all var(--transition-fast);

    &:active {
      background-color: var(--color-bg-tertiary);
      transform: scale(0.95);
    }
  }

  .method-icon {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--spacing-xs);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

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
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
  }
}

/* ========================================
   邀请海报
   ======================================== */
.poster-section {
  margin: 0 var(--spacing-md);

  .poster-card {
    cursor: pointer;
    transition: transform var(--transition-fast);

    &:active {
      transform: scale(0.98);
    }

    .poster-preview {
      background: var(--color-bg-secondary);
      border-radius: var(--radius-lg);
      padding: var(--spacing-xxl);
      text-align: center;
      border: 2px dashed var(--color-border);

      .poster-content {
        .van-icon {
          margin-bottom: var(--spacing-sm);
        }

        p {
          margin: 0;
          font-size: var(--font-size-sm);
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
  margin: 0 var(--spacing-md);

  .rule-desc {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    line-height: 1.6;
  }
}

/* ========================================
   邀请记录
   ======================================== */
.records-section {
  margin: 0 var(--spacing-md);

  .record-item {
    margin-bottom: var(--spacing-sm);
    border-radius: var(--radius-md);

    .record-avatar {
      width: 36px;
      height: 36px;
      border-radius: var(--radius-full);
      background: var(--color-bg-tertiary);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: var(--spacing-sm);
    }

    .record-info {
      .friend-name {
        font-size: var(--font-size-md);
        color: var(--color-text-primary);
        font-weight: var(--font-weight-medium);
      }

      .record-time {
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
        margin-top: var(--spacing-xs);
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
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);

    h3 {
      margin: 0;
      font-size: var(--font-size-lg);
      color: var(--color-text-primary);
    }

    .van-icon {
      font-size: 20px;
      cursor: pointer;
      color: var(--color-text-secondary);
    }
  }

  .popup-content {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-lg);
    display: flex;
    flex-direction: column;

    .poster-container {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: var(--spacing-lg);

      .poster-bg {
        width: 100%;
        max-width: 300px;
        aspect-ratio: 3/4;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: var(--radius-lg);
        padding: var(--spacing-xl);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);

        .poster-title {
          font-size: var(--font-size-xxl);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--spacing-xs);
        }

        .poster-subtitle {
          font-size: var(--font-size-sm);
          opacity: 0.9;
          margin-bottom: var(--spacing-xl);
        }

        .poster-qrcode {
          background: white;
          padding: var(--spacing-md);
          border-radius: var(--radius-md);
          margin-bottom: var(--spacing-lg);
        }

        .poster-invite-code {
          font-size: var(--font-size-md);
          margin-bottom: var(--spacing-md);

          strong {
            font-size: var(--font-size-lg);
            letter-spacing: 2px;
          }
        }

        .poster-reward-info {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          font-size: var(--font-size-sm);
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
