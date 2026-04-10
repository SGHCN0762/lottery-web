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
          <h3>在线客服</h3>
          <p class="status-text">
            <span class="dot" :style="{ background: serviceStatusColor }"></span>
            {{ serviceStatusText }}
          </p>
          <p class="service-time">服务时间：9:00 - 22:00</p>
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
          开始咨询
        </van-button>
        <van-button 
          round 
          size="small"
          @click="showFAQ = true"
        >
          <van-icon name="question-o" />
          常见问题
        </van-button>
      </div>
    </section>

    <!-- 快捷问题 -->
    <section class="quick-questions">
      <div class="section-title">常见问题</div>
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
      <div class="section-title">其他联系方式</div>
      <van-cell-group inset>
        <van-cell 
          title="客服电话" 
          value="400-123-4567"
          icon="phone-o"
          is-link
          @click="handleCallPhone"
        />
        <van-cell 
          title="客服邮箱" 
          value="support@lottery.com"
          icon="envelope-o"
          is-link
          @click="handleSendEmail"
        />
        <van-cell 
          title="工作时间" 
          value="周一至周日 9:00-22:00"
          icon="clock-o"
        />
      </van-cell-group>
    </section>

    <!-- 温馨提示 -->
    <section class="tip-section">
      <van-notice-bar
        left-icon="info-o"
        text="温馨提示：如遇紧急情况，建议直接拨打客服电话。我们会在工作时间内尽快回复您。"
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
            <h3>在线客服</h3>
            <p>平均响应时间：2分钟</p>
          </div>
          <van-button 
            size="mini" 
            type="primary" 
            plain
            @click="clearChatHistory"
          >
            清空记录
          </van-button>
        </div>
        
        <div class="chat-messages" ref="messagesRef">
          <div v-if="chatMessages.length === 0" class="empty-chat">
            <van-icon name="chat-o" size="48" color="#ccc" />
            <p>开始与客服对话吧</p>
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
            placeholder="请输入您的问题..."
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
                发送
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
          <h3>常见问题</h3>
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
  return isServiceTime.value ? '在线服务中' : '离线状态'
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
  { id: 1, text: '如何充值积分？' },
  { id: 2, text: '积分可以兑换现金吗？' },
  { id: 3, text: '忘记密码怎么办？' },
  { id: 4, text: '如何修改个人信息？' },
  { id: 5, text: '游戏记录在哪里查看？' }
])

// ========================================
// FAQ 数据
// ========================================
const faqList = ref([
  {
    id: 1,
    question: '如何获得积分？',
    answer: '您可以通过每日签到、参与游戏、邀请好友等方式获得积分。具体规则请查看各游戏的说明。'
  },
  {
    id: 2,
    question: '积分会过期吗？',
    answer: '积分永久有效，不会过期。请妥善保管您的账号。'
  },
  {
    id: 3,
    question: '如何联系客服？',
    answer: '您可以通过在线客服、客服电话（400-123-4567）或客服邮箱（support@lottery.com）联系我们。'
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
      addMessage('您好！欢迎使用在线客服，请问有什么可以帮助您的？', 'service')
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
    addMessage('客服正在输入...', 'system')
  }, 500)
  
  // 模拟客服回复
  setTimeout(() => {
    // 移除"正在输入"提示
    chatMessages.value = chatMessages.value.filter(msg => msg.content !== '客服正在输入...')
    
    // 智能回复逻辑
    let reply = ''
    if (userMessage.includes('积分') || userMessage.includes('充值')) {
      reply = '关于积分问题，您可以通过每日签到、参与游戏、邀请好友等方式获得积分。如需充值，可在"积分兑换"页面进行操作。'
    } else if (userMessage.includes('密码') || userMessage.includes('账号')) {
      reply = '如需修改密码或找回账号，请前往"账户设置"页面进行操作。如遇到问题，可提供您的用户ID，我们将协助您处理。'
    } else if (userMessage.includes('游戏') || userMessage.includes('玩法')) {
      reply = '我们提供多种有趣的游戏，包括数字猜猜猜、幸运转盘、答题挑战等。您可以在"帮助中心"查看详细的游戏规则说明。'
    } else if (userMessage.includes('谢谢') || userMessage.includes('感谢')) {
      reply = '不客气！如果您还有其他问题，随时欢迎咨询。祝您游戏愉快！😊'
    } else {
      const replies = [
        '感谢您的咨询，我们正在处理您的问题。',
        '收到您的问题，请稍等片刻，我会为您查询相关信息。',
        '好的，我了解了，让我为您详细解答。',
        '这个问题我需要确认一下，请您稍等。',
        '抱歉让您久等了，关于您的问题，建议您查看帮助中心的详细说明。'
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
      title: '清空记录',
      message: '确定要清空所有聊天记录吗？此操作不可恢复。'
    })
    
    chatMessages.value = []
    messageId = 0
    showToast('聊天记录已清空')
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
  console.log('在线客服页面已加载')
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
}

/* ========================================
   联系方式
   ======================================== */
.contact-methods {
  margin: 0 var(--spacing-md);
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
      color: #ccc;

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
          background: rgba(0, 0, 0, 0.05);
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
            background: white;
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
    background: white;

    :deep(.van-field__control) {
      font-size: var(--font-size-sm);
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
