<template>
  <div class="online-service-page">
    <!-- 客服状态卡片 -->
    <section class="service-status-card">
      <div class="status-header">
        <div class="avatar-wrapper">
          <div class="avatar">
            <van-icon name="service" size="32" color="white" />
          </div>
          <div class="online-indicator"></div>
        </div>
        <div class="status-info">
          <h3>{{ t('help.onlineService.title') }}</h3>
          <p class="status-text">
            <span class="dot" :style="{ background: serviceStatusColor }"></span>
            {{ serviceStatusText }}
          </p>
          <p class="service-time">{{ t('help.onlineService.serviceHours') }}</p>
        </div>
      </div>
      
      <div class="quick-actions">
        <van-button 
          type="primary" 
          round 
          size="small"
          @click="startChat"
        >
          <van-icon name="chat-o" />
          {{ t('help.onlineService.startChat') }}
        </van-button>
        <van-button 
          round 
          size="small"
          @click="showFAQ = true"
        >
          <van-icon name="question-o" />
          {{ t('help.faq') }}
        </van-button>
      </div>
    </section>

    <!-- 快捷问题 -->
    <section class="quick-questions">
      <div class="section-title">{{ t('help.faq') }}</div>
      <van-cell-group inset>
        <van-cell
          v-for="question in quickQuestions"
          :key="question.id"
          :title="question.text"
          is-link
          @click="sendQuickQuestion(question)"
        >
          <template #icon>
            <van-icon name="label-o" color="var(--color-primary)" />
          </template>
        </van-cell>
      </van-cell-group>
    </section>

    <!-- 联系方式 -->
    <section class="contact-methods">
      <div class="section-title">{{ t('help.onlineService.otherContactMethods') }}</div>
      <van-cell-group inset>
        <van-cell 
          :title="t('help.onlineService.customerServicePhone')" 
          value="400-123-4567"
          icon="phone-o"
          is-link
          @click="handleCallPhone"
        />
        <van-cell 
          :title="t('help.onlineService.customerServiceEmail')" 
          value="support@lottery.com"
          icon="envelope-o"
          is-link
          @click="handleSendEmail"
        />
        <van-cell 
          :title="t('help.onlineService.workingHours')" 
          :value="t('help.onlineService.workingHoursValue')"
          icon="clock-o"
        />
      </van-cell-group>
    </section>

    <!-- 温馨提示 -->
    <section class="tip-section">
      <van-notice-bar
        left-icon="info-o"
        :text="t('help.onlineService.tip')"
        scrollable
      />
    </section>

    <!-- 聊天窗口弹窗 -->
    <van-popup
      v-model:show="showChatWindow"
      position="bottom"
      :style="{ height: '85%' }"
      round
      closeable
      @close="handleChatClose"
    >
      <div class="chat-window">
        <div class="chat-header">
          <div class="header-info">
            <h3>{{ t('help.onlineService.title') }}</h3>
            <p>{{ t('help.onlineService.averageResponseTime') }}</p>
          </div>
          <van-button 
            size="mini" 
            type="primary" 
            plain
            @click="clearChatHistory"
          >
            {{ t('help.onlineService.clearHistory') }}
          </van-button>
        </div>
        
        <div class="chat-messages" ref="messagesRef">
          <div v-if="chatMessages.length === 0" class="empty-chat">
            <van-icon name="chat-o" size="48" color="#ccc" />
            <p>{{ t('help.onlineService.startChatHint') }}</p>
          </div>
          
          <div
            v-for="msg in chatMessages"
            :key="msg.id"
            class="message-item"
            :class="msg.type"
          >
            <div v-if="msg.type === 'system'" class="system-message">
              {{ msg.content }}
            </div>
            <div v-else class="message-content">
              <div class="message-avatar">
                <van-icon 
                  :name="msg.type === 'user' ? 'user-o' : 'service'" 
                  size="20" 
                />
              </div>
              <div class="message-bubble">
                {{ msg.content }}
              </div>
            </div>
            <div class="message-time">{{ formatTime(msg.time) }}</div>
          </div>
        </div>
        
        <div class="chat-input">
          <van-field
            v-model="inputMessage"
            :placeholder="t('help.onlineService.inputPlaceholder')"
            :border="false"
            clearable
            @keyup.enter="sendMessage"
          >
            <template #button>
              <van-button 
                size="small" 
                type="primary"
                :disabled="!inputMessage.trim()"
                @click="sendMessage"
              >
                {{ t('help.onlineService.send') }}
              </van-button>
            </template>
          </van-field>
        </div>
      </div>
    </van-popup>

    <!-- FAQ弹窗 -->
    <van-popup
      v-model:show="showFAQ"
      position="bottom"
      :style="{ height: '70%' }"
      round
      closeable
    >
      <div class="faq-popup">
        <div class="popup-header">
          <h3>{{ t('help.faq') }}</h3>
        </div>
        <div class="popup-content">
          <van-collapse v-model="activeFAQ">
            <van-collapse-item
              v-for="item in faqList"
              :key="item.id"
              :title="item.question"
              :name="item.id"
            >
              <div class="answer">{{ item.answer }}</div>
            </van-collapse-item>
          </van-collapse>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { showToast, showConfirmDialog } from 'vant'
import { 
  Icon as VanIcon,
  Button as VanButton,
  CellGroup as VanCellGroup,
  Cell as VanCell,
  NoticeBar as VanNoticeBar,
  Popup as VanPopup,
  Field as VanField,
  Collapse as VanCollapse,
  CollapseItem as VanCollapseItem
} from 'vant'

// ========================================
// i18n
// ========================================
const { t } = useI18n()

// ========================================
// 计算属性
// ========================================

/**
 * 判断当前是否在服务时间内
 */
const isServiceTime = computed(() => {
  const now = new Date()
  const hours = now.getHours()
  return hours >= 9 && hours < 22
})

/**
 * 服务状态文本
 */
const serviceStatusText = computed(() => {
  return isServiceTime.value ? t('help.onlineService.onlineStatus') : t('help.onlineService.offlineStatus')
})

/**
 * 服务状态颜色
 */
const serviceStatusColor = computed(() => {
  return isServiceTime.value ? '#52c41a' : '#d9d9d9'
})

// ========================================
// 响应式数据
// ========================================
const showChatWindow = ref(false)
const showFAQ = ref(false)
const inputMessage = ref('')
const messagesRef = ref(null)
const activeFAQ = ref([])
const chatMessages = ref([])
let messageId = 0

// ========================================
// 快捷问题
// ========================================
const quickQuestions = ref([
  { id: 1, text: t('help.onlineService.quickQuestions.rechargePoints') },
  { id: 2, text: t('help.onlineService.quickQuestions.cashExchange') },
  { id: 3, text: t('help.onlineService.quickQuestions.forgotPassword') },
  { id: 4, text: t('help.onlineService.quickQuestions.modifyProfile') },
  { id: 5, text: t('help.onlineService.quickQuestions.viewGameRecords') }
])

// ========================================
// FAQ 数据
// ========================================
const faqList = ref([
  {
    id: 1,
    question: t('help.onlineService.faq.howToEarnPoints'),
    answer: t('help.onlineService.faq.howToEarnPointsAnswer')
  },
  {
    id: 2,
    question: t('help.onlineService.faq.pointsExpire'),
    answer: t('help.onlineService.faq.pointsExpireAnswer')
  },
  {
    id: 3,
    question: t('help.onlineService.faq.howToContact'),
    answer: t('help.onlineService.faq.howToContactAnswer')
  }
])

// ========================================
// 工具函数
// ========================================

/**
 * 格式化时间
 */
const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

/**
 * 滚动到底部
 */
const scrollToBottom = async () => {
  await nextTick()
  if (messagesRef.value) {
    messagesRef.value.scrollTop = messagesRef.value.scrollHeight
  }
}

/**
 * 添加消息
 */
const addMessage = (content, type = 'user') => {
  chatMessages.value.push({
    id: ++messageId,
    content,
    type,
    time: Date.now()
  })
  scrollToBottom()
}

/**
 * 开始聊天
 */
const startChat = () => {
  showChatWindow.value = true
  
  // 初始化欢迎消息
  if (chatMessages.value.length === 0) {
    setTimeout(() => {
      addMessage(t('help.onlineService.welcomeMessage'), 'service')
    }, 500)
  }
}

/**
 * 发送消息
 */
const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  
  // 添加用户消息
  addMessage(inputMessage.value, 'user')
  const userMessage = inputMessage.value
  inputMessage.value = ''
  
  // 显示"正在输入"提示
  setTimeout(() => {
    addMessage(t('help.onlineService.typingMessage'), 'system')
  }, 500)
  
  // 模拟客服回复
  setTimeout(() => {
    // 移除"正在输入"提示
    chatMessages.value = chatMessages.value.filter(msg => msg.content !== t('help.onlineService.typingMessage'))
    
    // 智能回复逻辑
    let reply = ''
    if (userMessage.includes('积分') || userMessage.includes('充值') || userMessage.includes('points') || userMessage.includes('recharge')) {
      reply = t('help.onlineService.replies.points')
    } else if (userMessage.includes('密码') || userMessage.includes('账号') || userMessage.includes('password') || userMessage.includes('account')) {
      reply = t('help.onlineService.replies.account')
    } else if (userMessage.includes('游戏') || userMessage.includes('玩法') || userMessage.includes('game') || userMessage.includes('play')) {
      reply = t('help.onlineService.replies.games')
    } else if (userMessage.includes('谢谢') || userMessage.includes('感谢') || userMessage.includes('thank')) {
      reply = t('help.onlineService.replies.thanks')
    } else {
      const replies = [
        t('help.onlineService.replies.default1'),
        t('help.onlineService.replies.default2'),
        t('help.onlineService.replies.default3'),
        t('help.onlineService.replies.default4'),
        t('help.onlineService.replies.default5')
      ]
      reply = replies[Math.floor(Math.random() * replies.length)]
    }
    
    addMessage(reply, 'service')
  }, 2000)
}

/**
 * 发送快捷问题
 */
const sendQuickQuestion = (question) => {
  inputMessage.value = question.text
  sendMessage()
  if (!showChatWindow.value) {
    startChat()
  }
}

/**
 * 拨打电话
 */
const handleCallPhone = () => {
  window.location.href = 'tel:400-123-4567'
}

/**
 * 发送邮件
 */
const handleSendEmail = () => {
  window.location.href = 'mailto:support@lottery.com'
}

/**
 * 清空聊天记录
 */
const clearChatHistory = async () => {
  try {
    await showConfirmDialog({
      title: t('help.onlineService.clearHistory'),
      message: t('help.onlineService.clearHistoryMessage')
    })
    
    chatMessages.value = []
    messageId = 0
    showToast(t('help.onlineService.clearHistorySuccess'))
  } catch (error) {
    // 用户取消
  }
}

/**
 * 关闭聊天窗口
 */
const handleChatClose = () => {
  showChatWindow.value = false
}

// ========================================
// 生命周期
// ========================================
onMounted(() => {
  console.log(t('help.onlineService.pageLoaded'))
})
</script>

<style lang="less" scoped>
.online-service-page {
  min-height: 100%;
  background: var(--color-bg-primary);
  padding-bottom: var(--spacing-xl);
}

/* ========================================
   客服状态卡片
   ======================================== */
.service-status-card {
  margin: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--gradient-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  color: white;

  .status-header {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-lg);

    .avatar-wrapper {
      position: relative;
      margin-right: var(--spacing-md);

      .avatar {
        width: 56px;
        height: 56px;
        border-radius: var(--radius-full);
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid rgba(255, 255, 255, 0.3);
      }

      .online-indicator {
        position: absolute;
        bottom: 2px;
        right: 2px;
        width: 14px;
        height: 14px;
        background: v-bind(serviceStatusColor);
        border: 2px solid white;
        border-radius: var(--radius-full);
      }
    }

    .status-info {
      flex: 1;

      h3 {
        margin: 0 0 var(--spacing-xs) 0;
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
      }

      .status-text {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        margin: 0 0 var(--spacing-xs) 0;
        font-size: var(--font-size-sm);
        opacity: 0.9;

        .dot {
          width: 8px;
          height: 8px;
          background: #52c41a;
          border-radius: var(--radius-full);
          animation: pulse 2s infinite;
        }
      }

      .service-time {
        margin: 0;
        font-size: var(--font-size-xs);
        opacity: 0.8;
      }
    }
  }

  .quick-actions {
    display: flex;
    gap: var(--spacing-md);

    :deep(.van-button) {
      flex: 1;
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-xs);
      transition: all var(--transition-fast);

      &:active {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0.98);
      }
      
      .van-icon {
        font-size: 16px;
      }
    }
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
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
   快捷问题
   ======================================== */
.quick-questions {
  margin: 0 var(--spacing-md);

  :deep(.van-cell) {
    .van-cell__title {
      flex: 1;
      min-width: 0;
      word-wrap: break-word;
      word-break: break-word;
      line-height: 1.4;
    }
  }
}

/* ========================================
   联系方式
   ======================================== */
.contact-methods {
  margin: 0 var(--spacing-md);

  :deep(.van-cell) {
    .van-cell__title {
      flex: 1;
      min-width: 0;
      word-wrap: break-word;
      word-break: break-word;
      line-height: 1.4;
    }
    .van-cell__value {
      flex-shrink: 0;
      white-space: nowrap;
      margin-left: var(--spacing-sm);
    }
  }
}

/* ========================================
   温馨提示
   ======================================== */
.tip-section {
  margin: var(--spacing-lg) var(--spacing-md);
}

/* ========================================
   聊天窗口
   ======================================== */
.chat-window {
  height: 100%;
  display: flex;
  flex-direction: column;

  .chat-header {
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-info {
      text-align: left;

      h3 {
        margin: 0 0 var(--spacing-xs) 0;
        font-size: var(--font-size-lg);
        color: var(--color-text-primary);
      }

      p {
        margin: 0;
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
      }
    }
  }

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-md);
    background: var(--color-bg-tertiary);

    .empty-chat {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: var(--color-text-secondary);

      .van-icon {
        margin-bottom: var(--spacing-md);
      }

      p {
        margin: 0;
        font-size: var(--font-size-sm);
      }
    }

    .message-item {
      margin-bottom: var(--spacing-md);

      &.system {
        text-align: center;

        .system-message {
          display: inline-block;
          padding: var(--spacing-xs) var(--spacing-md);
          background: var(--color-bg-secondary);
          border-radius: var(--radius-sm);
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
        }
      }

      .message-content {
        display: flex;
        align-items: flex-start;
        gap: var(--spacing-sm);

        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-full);
          background: var(--color-bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .message-bubble {
          max-width: 70%;
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-md);
          font-size: var(--font-size-sm);
          line-height: 1.6;
          word-break: break-word;
        }
      }

      &.user {
        .message-content {
          flex-direction: row-reverse;

          .message-bubble {
            background: var(--color-primary);
            color: white;
          }
        }
      }

      &.service {
        .message-content {
          .message-bubble {
            background: var(--color-bg-secondary);
            color: var(--color-text-primary);
          }
        }
      }

      .message-time {
        text-align: center;
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
        margin-top: var(--spacing-xs);
      }
    }
  }

  .chat-input {
    padding: var(--spacing-md);
    border-top: 1px solid var(--color-border);
    background: var(--color-bg-secondary);

    :deep(.van-field__control) {
      font-size: var(--font-size-sm);
      color: var(--color-text-primary);
    }
  }
}

/* ========================================
   FAQ弹窗
   ======================================== */
.faq-popup {
  height: 100%;
  display: flex;
  flex-direction: column;

  .popup-header {
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);

    h3 {
      margin: 0;
      font-size: var(--font-size-lg);
      color: var(--color-text-primary);
      text-align: center;
    }
  }

  .popup-content {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-md);

    .answer {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      line-height: 1.8;
      padding: var(--spacing-sm) 0;
    }
  }
}
</style>
