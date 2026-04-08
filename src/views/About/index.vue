<template>
  <div class="about-page">
    <!-- 应用信息卡片 -->
    <section class="app-card">
      <div class="card-header">
        <div class="app-logo">🎮</div>
        
        <div class="app-info">
          <h2 class="app-name">娱乐应用</h2>
          <p class="app-version">版本 v1.0.0</p>
        </div>
      </div>

      <!-- 应用简介 -->
      <div class="app-description">
        <p>一款纯娱乐休闲游戏应用，提供多种趣味小游戏，帮助用户放松身心。所有积分均为虚拟道具，仅供娱乐使用。</p>
      </div>
    </section>

    <!-- 健康游戏倡议 -->
    <section class="info-section">
      <div class="section-title">健康游戏倡议</div>
      <van-cell-group inset class="highlight-group">
        <van-cell title="合理安排时间" icon="clock-o">
          <template #label>
            <p class="cell-tip">建议每日游戏不超过2小时</p>
          </template>
        </van-cell>
        <van-cell title="未成年人保护" icon="shield-o">
          <template #label>
            <p class="cell-tip">需在监护人指导下使用</p>
          </template>
        </van-cell>
        <van-cell title="虚拟道具说明" icon="info-o">
          <template #label>
            <p class="cell-tip">不涉及任何真实货币交易</p>
          </template>
        </van-cell>
      </van-cell-group>
    </section>

    <!-- 法律条款 -->
    <section class="info-section">
      <div class="section-title">法律条款</div>
      <van-cell-group inset>
        <van-cell title="隐私政策" icon="lock" is-link @click="showPopup('privacy')" />
        <van-cell title="用户协议" icon="description" is-link @click="showPopup('agreement')" />
        <van-cell title="免责声明" icon="warning-o" is-link @click="showPopup('disclaimer')" />
      </van-cell-group>
    </section>

    <!-- 联系我们 -->
    <section class="info-section">
      <div class="section-title">联系我们</div>
      <van-cell-group inset>
        <van-cell 
          title="客服邮箱" 
          icon="envelop-o"
          @click="handleCopyEmail"
        >
          <template #default>
            <span class="contact-value">{{ contactInfo.email }}</span>
          </template>
        </van-cell>
        <van-cell 
          title="服务热线" 
          icon="phone-o"
          @click="handleCallPhone"
        >
          <template #default>
            <span class="contact-value phone">{{ contactInfo.phone }}</span>
          </template>
        </van-cell>
        <van-cell 
          title="工作时间" 
          icon="clock-o"
          :value="contactInfo.workTime"
        />
      </van-cell-group>
    </section>

    <!-- 弹窗组件 -->
    <van-popup 
      v-model:show="popupVisible" 
      position="bottom" 
      round
      :style="{ height: '50%' }"
    >
      <div class="popup-container">
        <div class="popup-header">
          <h3>{{ popupTitle }}</h3>
          <van-icon name="cross" @click="popupVisible = false" />
        </div>
        <div class="popup-body">
          <p v-if="currentPopup === 'privacy'">
            我们非常重视您的隐私保护。本应用不会收集、存储或分享您的个人敏感信息。所有游戏数据仅保存在本地设备中。
          </p>
          <p v-else-if="currentPopup === 'agreement'">
            欢迎使用娱乐应用！通过使用本应用，即表示您同意遵守本用户协议的所有条款。本应用仅供娱乐用途，不得用于任何非法活动。
          </p>
          <p v-else-if="currentPopup === 'disclaimer'">
            1. 本应用所有内容均为虚拟场景模拟<br>
            2. 积分道具不具备真实价值<br>
            3. 严禁用于赌博或非法活动<br>
            4. 用户需年满18周岁<br>
            5. 请理性参与，切勿沉迷
          </p>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  CellGroup as VanCellGroup, 
  Cell as VanCell, 
  Icon as VanIcon,
  Popup as VanPopup,
  showToast
} from 'vant'

// ========================================
// 联系信息
// ========================================
const contactInfo = ref({
  email: 'support@entertainment-app.com',
  phone: '400-888-9999',
  workTime: '周一至周五 9:00-18:00'
})

// ========================================
// 弹窗状态
// ========================================
const popupVisible = ref(false)
const currentPopup = ref('')
const popupTitle = ref('')

// ========================================
// 事件处理函数
// ========================================

/**
 * 显示弹窗
 * @param {string} type - 弹窗类型
 */
const showPopup = (type) => {
  currentPopup.value = type
  const titles = {
    privacy: '隐私政策',
    agreement: '用户协议',
    disclaimer: '免责声明'
  }
  popupTitle.value = titles[type] || ''
  popupVisible.value = true
}

/** 复制邮箱 */
const handleCopyEmail = () => {
  navigator.clipboard.writeText(contactInfo.value.email)
  showToast({ message: '邮箱已复制', icon: 'success' })
}

/** 拨打电话 */
const handleCallPhone = () => {
  window.location.href = `tel:${contactInfo.value.phone}`
}
</script>

<style lang="less" scoped>
.about-page {
  min-height: 100%;
  background: var(--color-bg-primary);
  padding-bottom: calc(var(--spacing-xl) + env(safe-area-inset-bottom, 0px));
}

/* ========================================
   应用信息卡片
   ======================================== */
.app-card {
  margin: var(--spacing-md);
  padding: var(--spacing-xl);
  background: var(--gradient-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  color: white;

  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-lg);

    .app-logo {
      font-size: 56px;
      margin-right: var(--spacing-md);
      filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
    }

    .app-info {
      flex: 1;

      .app-name {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-semibold);
        margin: 0 0 var(--spacing-xs) 0;
        letter-spacing: 0.5px;
      }

      .app-version {
        font-size: var(--font-size-sm);
        opacity: 0.85;
        margin: 0;
      }
    }
  }

  /* 应用简介 */
  .app-description {
    padding-top: var(--spacing-md);
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    p {
      font-size: var(--font-size-sm);
      line-height: var(--line-height-relaxed);
      opacity: 0.9;
      margin: 0;
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
   信息区域
   ======================================== */
.info-section {
  margin: 0 var(--spacing-md);
  margin-bottom: var(--spacing-lg);

  /* 健康提示高亮样式 */
  .highlight-group {
    :deep(.van-cell) {
      background: linear-gradient(135deg, rgba(52, 199, 89, 0.08) 0%, rgba(52, 199, 89, 0.03) 100%);
      border-left: 3px solid var(--color-success);
    }

    .cell-tip {
      margin: var(--spacing-xs) 0 0 0;
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
      line-height: var(--line-height-base);
    }
  }

  /* 联系方式样式 */
  .contact-value {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    
    &.phone {
      color: var(--color-primary);
      font-weight: var(--font-weight-medium);
    }
  }
}

/* ========================================
   弹窗样式
   ======================================== */
.popup-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-lg) var(--spacing-xl);
    border-bottom: 1px solid var(--color-border-light);

    h3 {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      margin: 0;
    }

    .van-icon {
      font-size: 20px;
      color: var(--color-text-tertiary);
      cursor: pointer;
      padding: var(--spacing-xs);
    }
  }

  .popup-body {
    flex: 1;
    padding: var(--spacing-xl);
    overflow-y: auto;

    p {
      font-size: var(--font-size-sm);
      line-height: var(--line-height-relaxed);
      color: var(--color-text-secondary);
      margin: 0;

      br {
        display: block;
        content: '';
        margin: var(--spacing-sm) 0;
      }
    }
  }
}
</style>