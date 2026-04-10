<template>
  <div class="feedback-page">
    <!-- 反馈说明卡片 -->
    <section class="intro-card">
      <van-icon name="edit" size="32" color="var(--color-primary)" />
      <h3>意见反馈</h3>
      <p>您的建议对我们非常重要，请告诉我们如何改进产品体验</p>
    </section>

    <!-- 反馈表单 -->
    <section class="feedback-form">
      <van-form @submit="onSubmit">
        <!-- 反馈类型 -->
        <div class="form-section">
          <div class="section-label">反馈类型 <span class="required">*</span></div>
          <van-cell-group inset>
            <van-field
              v-model="formData.type"
              is-link
              readonly
              placeholder="请选择反馈类型"
              @click="showTypePicker = true"
            >
              <template #right-icon>
                <van-icon name="arrow" />
              </template>
            </van-field>
          </van-cell-group>
        </div>

        <!-- 问题描述 -->
        <div class="form-section">
          <div class="section-label">
            问题描述 
            <span class="required">*</span>
            <span class="tip-text">（至少10个字符）</span>
          </div>
          <van-cell-group inset>
            <van-field
              v-model="formData.description"
              type="textarea"
              rows="4"
              maxlength="500"
              show-word-limit
              placeholder="请详细描述您遇到的问题或建议，包括：&#10;1. 具体是什么问题？&#10;2. 在什么情况下发生的？&#10;3. 您期望的改进方案..."
              :rules="[{ required: true, message: '请填写问题描述' }]"
            />
          </van-cell-group>
        </div>

        <!-- 联系方式 -->
        <div class="form-section">
          <div class="section-label">联系方式（选填）</div>
          <van-cell-group inset>
            <van-field
              v-model="formData.contact"
              placeholder="手机号或邮箱，方便我们回复您"
            />
          </van-cell-group>
        </div>

        <!-- 图片上传 -->
        <div class="form-section">
          <div class="section-label">上传截图（选填）</div>
          <van-cell-group inset>
            <van-field>
              <template #input>
                <van-uploader
                  v-model="fileList"
                  :max-count="3"
                  :after-read="afterRead"
                  preview-size="80px"
                >
                  <div class="upload-placeholder">
                    <van-icon name="photograph" size="24" />
                    <p>上传图片</p>
                  </div>
                </van-uploader>
              </template>
            </van-field>
          </van-cell-group>
          <p class="upload-tip">最多上传3张图片，支持jpg、png格式</p>
        </div>

        <!-- 提交按钮 -->
        <div class="submit-section">
          <van-button 
            round 
            block 
            type="primary" 
            native-type="submit"
            :loading="submitting"
            loading-text="提交中..."
          >
            <van-icon name="send-o" />
            提交反馈
          </van-button>
        </div>
      </van-form>
    </section>

    <!-- 反馈记录 -->
    <section class="feedback-history">
      <div class="section-title">我的反馈记录</div>
      <van-empty v-if="feedbackList.length === 0" description="暂无反馈记录" />
      
      <van-cell-group v-else inset>
        <van-cell
          v-for="item in feedbackList"
          :key="item.id"
          class="feedback-item"
          @click="showFeedbackDetail(item)"
        >
          <template #title>
            <div class="feedback-header">
              <van-tag :type="getTypeTagType(item.type)" size="medium">
                {{ item.type }}
              </van-tag>
              <span class="feedback-time">{{ formatTime(item.time) }}</span>
            </div>
          </template>
          
          <template #label>
            <div class="feedback-preview">{{ item.description }}</div>
          </template>
          
          <template #right-icon>
            <van-tag :type="getStatusTagType(item.status)">
              {{ item.statusText }}
            </van-tag>
          </template>
        </van-cell>
      </van-cell-group>
    </section>

    <!-- 反馈类型选择器 -->
    <van-popup v-model:show="showTypePicker" position="bottom" round>
      <van-picker
        :columns="typeOptions"
        @confirm="onTypeConfirm"
        @cancel="showTypePicker = false"
      />
    </van-popup>

    <!-- 反馈详情弹窗 -->
    <van-popup
      v-model:show="showDetailPopup"
      position="bottom"
      :style="{ height: '70%' }"
      round
      closeable
    >
      <div class="detail-popup" v-if="currentFeedback">
        <div class="popup-header">
          <h3>反馈详情</h3>
        </div>
        
        <div class="popup-content">
          <div class="detail-item">
            <div class="label">反馈类型</div>
            <div class="value">
              <van-tag :type="getTypeTagType(currentFeedback.type)">
                {{ currentFeedback.type }}
              </van-tag>
            </div>
          </div>
          
          <div class="detail-item">
            <div class="label">提交时间</div>
            <div class="value">{{ formatFullTime(currentFeedback.time) }}</div>
          </div>
          
          <div class="detail-item">
            <div class="label">处理状态</div>
            <div class="value">
              <van-tag :type="getStatusTagType(currentFeedback.status)">
                {{ currentFeedback.statusText }}
              </van-tag>
            </div>
          </div>
          
          <div class="detail-item">
            <div class="label">问题描述</div>
            <div class="value description">{{ currentFeedback.description }}</div>
          </div>
          
          <div class="detail-item" v-if="currentFeedback.contact">
            <div class="label">联系方式</div>
            <div class="value">{{ currentFeedback.contact }}</div>
          </div>
          
          <div class="detail-item" v-if="currentFeedback.reply">
            <div class="label">官方回复</div>
            <div class="value reply">{{ currentFeedback.reply }}</div>
          </div>
          
          <div class="detail-item" v-if="currentFeedback.images && currentFeedback.images.length > 0">
            <div class="label">上传截图</div>
            <div class="value">
              <van-image
                v-for="(img, index) in currentFeedback.images"
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
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { showToast, showSuccessToast } from 'vant'
import { 
  Icon as VanIcon,
  Form as VanForm,
  Field as VanField,
  CellGroup as VanCellGroup,
  Cell as VanCell,
  Button as VanButton,
  Uploader as VanUploader,
  Tag as VanTag,
  Empty as VanEmpty,
  Popup as VanPopup,
  Picker as VanPicker
} from 'vant'

// ========================================
// 响应式数据
// ========================================
const showTypePicker = ref(false)
const showDetailPopup = ref(false)
const submitting = ref(false)
const fileList = ref([])
const currentFeedback = ref(null)
const feedbackList = ref([])

// 表单数据
const formData = reactive({
  type: '',
  description: '',
  contact: ''
})

// ========================================
// 配置选项
// ========================================
const typeOptions = [
  { text: '功能建议', value: '功能建议' },
  { text: 'Bug反馈', value: 'Bug反馈' },
  { text: '体验优化', value: '体验优化' },
  { text: '内容问题', value: '内容问题' },
  { text: '其他', value: '其他' }
]

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
 * 格式化完整时间
 */
const formatFullTime = (timestamp) => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

/**
 * 获取类型标签样式
 */
const getTypeTagType = (type) => {
  const types = {
    '功能建议': 'primary',
    'Bug反馈': 'danger',
    '体验优化': 'success',
    '内容问题': 'warning',
    '其他': 'default'
  }
  return types[type] || 'default'
}

/**
 * 获取状态标签样式
 */
const getStatusTagType = (status) => {
  const types = {
    pending: 'warning',
    processing: 'primary',
    resolved: 'success',
    closed: 'default'
  }
  return types[status] || 'default'
}

/**
 * 加载反馈记录
 */
const loadFeedbackList = () => {
  const stored = localStorage.getItem('feedbackList')
  if (stored) {
    feedbackList.value = JSON.parse(stored)
  }
}

/**
 * 保存反馈记录
 */
const saveFeedbackList = () => {
  localStorage.setItem('feedbackList', JSON.stringify(feedbackList.value))
}

/**
 * 类型选择确认
 */
const onTypeConfirm = ({ selectedOptions }) => {
  formData.type = selectedOptions[0].value
  showTypePicker.value = false
}

/**
 * 图片上传处理
 */
const afterRead = (file) => {
  // 这里可以添加图片上传到服务器的逻辑
  console.log('图片已选择:', file)
}

/**
 * 提交反馈
 */
const onSubmit = async () => {
  if (!formData.type) {
    showToast({ type: 'fail', message: '请选择反馈类型' })
    return
  }
  
  if (!formData.description.trim()) {
    showToast({ type: 'fail', message: '请填写问题描述' })
    return
  }
  
  if (formData.description.trim().length < 10) {
    showToast({ type: 'fail', message: '问题描述至少需要10个字符' })
    return
  }
  
  submitting.value = true
  
  // 模拟提交延迟
  setTimeout(() => {
    // 创建反馈记录
    const newFeedback = {
      id: Date.now(),
      type: formData.type,
      description: formData.description,
      contact: formData.contact,
      images: fileList.value.map(f => f.content || f.url),
      status: 'pending',
      statusText: '待处理',
      time: Date.now(),
      reply: ''
    }
    
    // 添加到列表
    feedbackList.value.unshift(newFeedback)
    saveFeedbackList()
    
    // 重置表单
    formData.type = ''
    formData.description = ''
    formData.contact = ''
    fileList.value = []
    
    submitting.value = false
    showSuccessToast('反馈提交成功！我们会尽快处理您的建议')
    
    // 显示感谢提示
    setTimeout(() => {
      showToast({
        type: 'success',
        message: '感谢您的宝贵意见！',
        duration: 2000
      })
    }, 500)
  }, 1500)
}

/**
 * 显示反馈详情
 */
const showFeedbackDetail = (item) => {
  currentFeedback.value = item
  showDetailPopup.value = true
}

// ========================================
// 生命周期
// ========================================
onMounted(() => {
  loadFeedbackList()
})
</script>

<style lang="less" scoped>
.feedback-page {
  min-height: 100%;
  background: var(--color-bg-primary);
  padding-bottom: var(--spacing-xl);
}

/* ========================================
   反馈说明卡片
   ======================================== */
.intro-card {
  margin: var(--spacing-md);
  padding: var(--spacing-xl);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  text-align: center;

  .van-icon {
    margin-bottom: var(--spacing-md);
  }

  h3 {
    margin: 0 0 var(--spacing-sm) 0;
    font-size: var(--font-size-lg);
    color: var(--color-text-primary);
  }

  p {
    margin: 0;
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    line-height: 1.6;
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

.section-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  margin: var(--spacing-md);
  font-weight: var(--font-weight-medium);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);

  .required {
    color: var(--color-danger);
  }
  
  .tip-text {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    font-weight: var(--font-weight-normal);
  }
}

/* ========================================
   反馈表单
   ======================================== */
.feedback-form {
  margin: 0 var(--spacing-md);

  .form-section {
    margin-bottom: var(--spacing-lg);

    .upload-tip {
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
      margin: var(--spacing-sm) var(--spacing-md) 0;
    }

    .upload-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      background: var(--color-bg-tertiary);
      border-radius: var(--radius-sm);
      color: var(--color-text-secondary);

      p {
        margin: var(--spacing-xs) 0 0 0;
        font-size: var(--font-size-xs);
      }
    }
  }

  .submit-section {
    margin-top: var(--spacing-xl);
    padding: 0 var(--spacing-md);
    
    :deep(.van-button) {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-xs);
      font-weight: var(--font-weight-semibold);
      
      .van-icon {
        font-size: 16px;
      }
    }
  }
}

/* ========================================
   反馈记录
   ======================================== */
.feedback-history {
  margin: 0 var(--spacing-md);

  .feedback-item {
    margin-bottom: var(--spacing-sm);
    border-radius: var(--radius-md);

    .feedback-header {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-xs);

      .feedback-time {
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
      }
    }

    .feedback-preview {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

/* ========================================
   反馈详情弹窗
   ======================================== */
.detail-popup {
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
    padding: var(--spacing-lg);

    .detail-item {
      margin-bottom: var(--spacing-lg);

      .label {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        margin-bottom: var(--spacing-xs);
      }

      .value {
        font-size: var(--font-size-md);
        color: var(--color-text-primary);
        line-height: 1.6;

        &.description {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          white-space: pre-wrap;
        }

        &.reply {
          background: var(--color-bg-tertiary);
          padding: var(--spacing-md);
          border-radius: var(--radius-md);
          font-size: var(--font-size-sm);
          color: var(--color-text-primary);
        }
      }
    }
  }
}
</style>
