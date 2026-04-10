<template>
  <div class="report-page">
    <!-- 举报说明卡片 -->
    <section class="intro-card warning">
      <van-icon name="warning-o" size="32" color="#ff4d4f" />
      <h3>举报问题</h3>
      <p>如发现违规行为或不良内容，请及时举报，我们将严肃处理</p>
    </section>

    <!-- 温馨提示 -->
    <section class="tip-section">
      <van-notice-bar
        left-icon="info-o"
        color="#ff4d4f"
        background="#fff1f0"
        text="请如实填写举报信息，恶意举报将承担相应责任。我们会对举报人信息严格保密。"
        scrollable
      />
    </section>

    <!-- 举报表单 -->
    <section class="report-form">
      <van-form @submit="onSubmit">
        <!-- 举报类型 -->
        <div class="form-section">
          <div class="section-label">举报类型 <span class="required">*</span></div>
          <van-cell-group inset>
            <van-field
              v-model="formData.type"
              is-link
              readonly
              placeholder="请选择举报类型"
              @click="showTypePicker = true"
            >
              <template #right-icon>
                <van-icon name="arrow" />
              </template>
            </van-field>
          </van-cell-group>
        </div>

        <!-- 举报对象 -->
        <div class="form-section">
          <div class="section-label">举报对象 <span class="required">*</span></div>
          <van-cell-group inset>
            <van-field
              v-model="formData.target"
              placeholder="请输入被举报的用户名、游戏名称等"
              :rules="[{ required: true, message: '请填写举报对象' }]"
            />
          </van-cell-group>
        </div>

        <!-- 问题描述 -->
        <div class="form-section">
          <div class="section-label">
            详细描述 
            <span class="required">*</span>
            <span class="tip-text">（至少20个字符）</span>
          </div>
          <van-cell-group inset>
            <van-field
              v-model="formData.description"
              type="textarea"
              rows="5"
              maxlength="1000"
              show-word-limit
              placeholder="请详细描述违规情况，包括：&#10;1. 违规行为发生的时间和地点&#10;2. 涉及的用户或游戏&#10;3. 具体的违规行为描述&#10;4. 是否有其他证人或证据..."
              :rules="[{ required: true, message: '请填写详细描述' }]"
            />
          </van-cell-group>
          <p class="field-tip">
            <van-icon name="info-o" size="14" />
            详细准确的描述有助于我们快速处理您的举报
          </p>
        </div>

        <!-- 证据上传 -->
        <div class="form-section">
          <div class="section-label">上传证据（选填）</div>
          <van-cell-group inset>
            <van-field>
              <template #input>
                <van-uploader
                  v-model="fileList"
                  :max-count="6"
                  :after-read="afterRead"
                  preview-size="80px"
                >
                  <div class="upload-placeholder">
                    <van-icon name="photograph" size="24" />
                    <p>上传截图</p>
                  </div>
                </van-uploader>
              </template>
            </van-field>
          </van-cell-group>
          <p class="upload-tip">最多上传6张图片，支持jpg、png格式，清晰的证据有助于我们快速处理</p>
        </div>

        <!-- 联系方式 -->
        <div class="form-section">
          <div class="section-label">您的联系方式（选填）</div>
          <van-cell-group inset>
            <van-field
              v-model="formData.contact"
              placeholder="手机号或邮箱，方便我们反馈处理结果"
            />
          </van-cell-group>
          <p class="contact-tip">我们承诺对举报人信息严格保密</p>
        </div>

        <!-- 提交按钮 -->
        <div class="submit-section">
          <van-button 
            round 
            block 
            type="danger" 
            native-type="submit"
            :loading="submitting"
            loading-text="提交中..."
          >
            <van-icon name="warning-o" />
            提交举报
          </van-button>
        </div>
      </van-form>
    </section>

    <!-- 举报记录 -->
    <section class="report-history">
      <div class="section-title">我的举报记录</div>
      <van-empty v-if="reportList.length === 0" description="暂无举报记录" />
      
      <van-cell-group v-else inset>
        <van-cell
          v-for="item in reportList"
          :key="item.id"
          class="report-item"
          @click="showReportDetail(item)"
        >
          <template #title>
            <div class="report-header">
              <van-tag type="danger" size="medium">{{ item.type }}</van-tag>
              <span class="report-time">{{ formatTime(item.time) }}</span>
            </div>
          </template>
          
          <template #label>
            <div class="report-preview">
              <span class="target">举报对象：{{ item.target }}</span>
              <div class="description">{{ item.description }}</div>
            </div>
          </template>
          
          <template #right-icon>
            <van-tag :type="getStatusTagType(item.status)">
              {{ item.statusText }}
            </van-tag>
          </template>
        </van-cell>
      </van-cell-group>
    </section>

    <!-- 举报类型选择器 -->
    <van-popup v-model:show="showTypePicker" position="bottom" round>
      <van-picker
        :columns="typeOptions"
        @confirm="onTypeConfirm"
        @cancel="showTypePicker = false"
      />
    </van-popup>

    <!-- 举报详情弹窗 -->
    <van-popup
      v-model:show="showDetailPopup"
      position="bottom"
      :style="{ height: '75%' }"
      round
      closeable
    >
      <div class="detail-popup" v-if="currentReport">
        <div class="popup-header">
          <h3>举报详情</h3>
        </div>
        
        <div class="popup-content">
          <div class="detail-item">
            <div class="label">举报类型</div>
            <div class="value">
              <van-tag type="danger">{{ currentReport.type }}</van-tag>
            </div>
          </div>
          
          <div class="detail-item">
            <div class="label">举报对象</div>
            <div class="value">{{ currentReport.target }}</div>
          </div>
          
          <div class="detail-item">
            <div class="label">提交时间</div>
            <div class="value">{{ formatFullTime(currentReport.time) }}</div>
          </div>
          
          <div class="detail-item">
            <div class="label">处理状态</div>
            <div class="value">
              <van-tag :type="getStatusTagType(currentReport.status)">
                {{ currentReport.statusText }}
              </van-tag>
            </div>
          </div>
          
          <div class="detail-item">
            <div class="label">详细描述</div>
            <div class="value description">{{ currentReport.description }}</div>
          </div>
          
          <div class="detail-item" v-if="currentReport.contact">
            <div class="label">联系方式</div>
            <div class="value">{{ currentReport.contact }}</div>
          </div>
          
          <div class="detail-item" v-if="currentReport.processResult">
            <div class="label">处理结果</div>
            <div class="value result">{{ currentReport.processResult }}</div>
          </div>
          
          <div class="detail-item" v-if="currentReport.images && currentReport.images.length > 0">
            <div class="label">上传证据</div>
            <div class="value images-grid">
              <van-image
                v-for="(img, index) in currentReport.images"
                :key="index"
                :src="img"
                width="80"
                height="80"
                fit="cover"
                radius="var(--radius-sm)"
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
import { showToast, showSuccessToast, showConfirmDialog } from 'vant'
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
  Picker as VanPicker,
  NoticeBar as VanNoticeBar
} from 'vant'

// ========================================
// 响应式数据
// ========================================
const showTypePicker = ref(false)
const showDetailPopup = ref(false)
const submitting = ref(false)
const fileList = ref([])
const currentReport = ref(null)
const reportList = ref([])

// 表单数据
const formData = reactive({
  type: '',
  target: '',
  description: '',
  contact: ''
})

// ========================================
// 配置选项
// ========================================
const typeOptions = [
  { text: '作弊行为', value: '作弊行为' },
  { text: '不当言论', value: '不当言论' },
  { text: '恶意刷分', value: '恶意刷分' },
  { text: '虚假举报', value: '虚假举报' },
  { text: '其他违规', value: '其他违规' }
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
 * 获取状态标签样式
 */
const getStatusTagType = (status) => {
  const types = {
    pending: 'warning',
    processing: 'primary',
    resolved: 'success',
    rejected: 'default'
  }
  return types[status] || 'default'
}

/**
 * 加载举报记录
 */
const loadReportList = () => {
  const stored = localStorage.getItem('reportList')
  if (stored) {
    reportList.value = JSON.parse(stored)
  }
}

/**
 * 保存举报记录
 */
const saveReportList = () => {
  localStorage.setItem('reportList', JSON.stringify(reportList.value))
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
  console.log('证据图片已选择:', file)
}

/**
 * 提交举报
 */
const onSubmit = async () => {
  if (!formData.type) {
    showToast({ type: 'fail', message: '请选择举报类型' })
    return
  }
  
  if (!formData.target.trim()) {
    showToast({ type: 'fail', message: '请填写举报对象' })
    return
  }
  
  if (!formData.description.trim()) {
    showToast({ type: 'fail', message: '请填写详细描述' })
    return
  }
  
  if (formData.description.trim().length < 20) {
    showToast({ type: 'fail', message: '详细描述至少需要20个字符，请提供更多信息' })
    return
  }
  
  // 二次确认
  try {
    await showConfirmDialog({
      title: '确认举报',
      message: '请确保举报内容真实有效，恶意举报将承担相应责任。确定要提交吗？',
      confirmButtonText: '确认举报',
      cancelButtonText: '再想想',
      confirmButtonColor: '#ff4d4f'
    })
  } catch (error) {
    showToast('已取消举报')
    return
  }
  
  submitting.value = true
  
  // 模拟提交延迟
  setTimeout(() => {
    // 创建举报记录
    const newReport = {
      id: Date.now(),
      type: formData.type,
      target: formData.target,
      description: formData.description,
      contact: formData.contact,
      images: fileList.value.map(f => f.content || f.url),
      status: 'pending',
      statusText: '待审核',
      time: Date.now(),
      processResult: ''
    }
    
    // 添加到列表
    reportList.value.unshift(newReport)
    saveReportList()
    
    // 重置表单
    formData.type = ''
    formData.target = ''
    formData.description = ''
    formData.contact = ''
    fileList.value = []
    
    submitting.value = false
    showSuccessToast('举报提交成功！我们会尽快核实处理')
    
    // 显示温馨提示
    setTimeout(() => {
      showToast({
        type: 'success',
        message: '感谢您的监督，我们会严肃处理',
        duration: 2500
      })
    }, 500)
  }, 1500)
}

/**
 * 显示举报详情
 */
const showReportDetail = (item) => {
  currentReport.value = item
  showDetailPopup.value = true
}

// ========================================
// 生命周期
// ========================================
onMounted(() => {
  loadReportList()
})
</script>

<style lang="less" scoped>
.report-page {
  min-height: 100%;
  background: var(--color-bg-primary);
  padding-bottom: var(--spacing-xl);
}

/* ========================================
   举报说明卡片
   ======================================== */
.intro-card {
  margin: var(--spacing-md);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  text-align: center;

  &.warning {
    background: linear-gradient(135deg, #fff1f0 0%, #ffccc7 100%);
    border: 1px solid #ffccc7;
  }

  .van-icon {
    margin-bottom: var(--spacing-md);
  }

  h3 {
    margin: 0 0 var(--spacing-sm) 0;
    font-size: var(--font-size-lg);
    color: #ff4d4f;
  }

  p {
    margin: 0;
    font-size: var(--font-size-sm);
    color: #cf1322;
    line-height: 1.6;
  }
}

/* ========================================
   温馨提示
   ======================================== */
.tip-section {
  margin: 0 var(--spacing-md) var(--spacing-lg);
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
    color: #ff4d4f;
  }
  
  .tip-text {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    font-weight: var(--font-weight-normal);
  }
}

.field-tip {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-xs);
  color: var(--color-primary);
  margin: var(--spacing-sm) var(--spacing-md) 0;
  padding: var(--spacing-sm);
  background: rgba(0, 122, 255, 0.05);
  border-radius: var(--radius-sm);
}

/* ========================================
   举报表单
   ======================================== */
.report-form {
  margin: 0 var(--spacing-md);

  .form-section {
    margin-bottom: var(--spacing-lg);

    .upload-tip {
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
      margin: var(--spacing-sm) var(--spacing-md) 0;
    }

    .contact-tip {
      font-size: var(--font-size-xs);
      color: var(--color-primary);
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
   举报记录
   ======================================== */
.report-history {
  margin: 0 var(--spacing-md);

  .report-item {
    margin-bottom: var(--spacing-sm);
    border-radius: var(--radius-md);

    .report-header {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-xs);

      .report-time {
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
      }
    }

    .report-preview {
      .target {
        display: block;
        font-size: var(--font-size-sm);
        color: var(--color-text-primary);
        margin-bottom: var(--spacing-xs);
      }

      .description {
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

/* ========================================
   举报详情弹窗
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

        &.result {
          background: #f6ffed;
          border: 1px solid #b7eb8f;
          padding: var(--spacing-md);
          border-radius: var(--radius-md);
          font-size: var(--font-size-sm);
          color: #52c41a;
        }

        &.images-grid {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-xs);
        }
      }
    }
  }
}
</style>
