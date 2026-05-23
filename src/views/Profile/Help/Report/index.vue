<template>
  <div class="report-page">
    <!-- 举报说明卡片 -->
    <section class="intro-card">
      <van-icon name="warning-o" size="32" color="var(--color-danger)" />
      <h3>违规举报</h3>
      <p>如发现违规行为或不良内容,请及时向我们举报,我们将尽快处理</p>
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
            />
          </van-cell-group>
        </div>

        <!-- 被举报对象 -->
        <div class="form-section">
          <div class="section-label">被举报对象 <span class="required">*</span></div>
          <van-cell-group inset>
            <van-field
              v-model="formData.target"
              placeholder="请输入用户名、ID或相关链接"
              :rules="[{ required: true, message: '请填写被举报对象' }]"
            />
          </van-cell-group>
        </div>

        <!-- 举报原因 -->
        <div class="form-section">
          <div class="section-label">
            举报原因
            <span class="required">*</span>
            <span class="tip-text">(至少10个字符)</span>
          </div>
          <van-cell-group inset>
            <van-field
              v-model="formData.reason"
              type="textarea"
              rows="4"
              maxlength="500"
              show-word-limit
              placeholder="请详细描述举报原因,包括:&#10;1. 具体是什么违规行为?&#10;2. 发生的时间和位置&#10;3. 相关证据说明..."
              :rules="[{ required: true, message: '请填写举报原因' }]"
            />
          </van-cell-group>
        </div>

        <!-- 联系方式 -->
        <div class="form-section">
          <div class="section-label">联系方式(选填)</div>
          <van-cell-group inset>
            <van-field v-model="formData.contact" placeholder="手机号或邮箱,方便我们联系您" />
          </van-cell-group>
        </div>

        <!-- 证据上传 -->
        <div class="form-section">
          <div class="section-label">上传证据(选填)</div>
          <van-cell-group inset>
            <van-field>
              <template #input>
                <van-uploader
                  v-model="fileList"
                  :max-count="5"
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
          <p class="upload-tip">最多上传5张图片,支持jpg、png格式</p>
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
              <van-tag :type="getTypeTagType(item.type)" size="medium">
                {{ item.type }}
              </van-tag>
              <span class="report-time">{{ formatTime(item.time) }}</span>
            </div>
          </template>

          <template #label>
            <div class="report-preview">{{ item.reason }}</div>
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
      :style="{ height: '70%' }"
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
              <van-tag :type="getTypeTagType(currentReport.type)">
                {{ currentReport.type }}
              </van-tag>
            </div>
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
            <div class="label">被举报对象</div>
            <div class="value">{{ currentReport.target }}</div>
          </div>

          <div class="detail-item">
            <div class="label">举报原因</div>
            <div class="value reason">{{ currentReport.reason }}</div>
          </div>

          <div class="detail-item" v-if="currentReport.contact">
            <div class="label">联系方式</div>
            <div class="value">{{ currentReport.contact }}</div>
          </div>

          <div class="detail-item" v-if="currentReport.reply">
            <div class="label">处理结果</div>
            <div class="value reply">{{ currentReport.reply }}</div>
          </div>

          <div class="detail-item" v-if="currentReport.images && currentReport.images.length > 0">
            <div class="label">证据截图</div>
            <div class="value">
              <van-image
                v-for="(img, index) in currentReport.images"
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
  import { ref, reactive, onMounted } from 'vue';
  import { showToast, showSuccessToast } from 'vant';
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
  } from 'vant';

  // ========================================
  // 响应式数据
  // ========================================
  const showTypePicker = ref(false);
  const showDetailPopup = ref(false);
  const submitting = ref(false);
  const fileList = ref([]);
  const currentReport = ref(null);
  const reportList = ref([]);

  // 表单数据
  const formData = reactive({
    type: '',
    target: '',
    reason: '',
    contact: '',
  });

  // ========================================
  // 配置选项
  // ========================================
  const typeOptions = [
    { text: '违规内容', value: '违规内容' },
    { text: '欺诈行为', value: '欺诈行为' },
    { text: '恶意刷分', value: '恶意刷分' },
    { text: '骚扰他人', value: '骚扰他人' },
    { text: '其他违规', value: '其他违规' },
  ];

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
   * 格式化完整时间
   */
  const formatFullTime = timestamp => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  /**
   * 获取类型标签样式
   */
  const getTypeTagType = type => {
    const types = {
      违规内容: 'danger',
      欺诈行为: 'danger',
      恶意刷分: 'warning',
      骚扰他人: 'primary',
      其他违规: 'default',
    };
    return types[type] || 'default';
  };

  /**
   * 获取状态标签样式
   */
  const getStatusTagType = status => {
    const types = {
      pending: 'warning',
      processing: 'primary',
      resolved: 'success',
      rejected: 'default',
    };
    return types[status] || 'default';
  };

  /**
   * 加载举报记录
   */
  const loadReportList = () => {
    const stored = localStorage.getItem('reportList');
    if (stored) {
      reportList.value = JSON.parse(stored);
    }
  };

  /**
   * 保存举报记录
   */
  const saveReportList = () => {
    localStorage.setItem('reportList', JSON.stringify(reportList.value));
  };

  /**
   * 类型选择确认
   */
  const onTypeConfirm = ({ selectedOptions }) => {
    formData.type = selectedOptions[0].value;
    showTypePicker.value = false;
  };

  /**
   * 图片上传处理
   */
  const afterRead = file => {
    // 这里可以添加图片上传到服务器的逻辑
  };

  /**
   * 提交举报
   */
  const onSubmit = async () => {
    if (!formData.type) {
      showToast({ type: 'fail', message: '请选择举报类型' });
      return;
    }

    if (!formData.target.trim()) {
      showToast({ type: 'fail', message: '请填写被举报对象' });
      return;
    }

    if (!formData.reason.trim()) {
      showToast({ type: 'fail', message: '请填写举报原因' });
      return;
    }

    if (formData.reason.trim().length < 10) {
      showToast({ type: 'fail', message: '举报原因至少需要10个字符' });
      return;
    }

    submitting.value = true;

    // 模拟提交延迟
    setTimeout(() => {
      // 创建举报记录
      const newReport = {
        id: Date.now(),
        type: formData.type,
        target: formData.target,
        reason: formData.reason,
        contact: formData.contact,
        images: fileList.value.map(f => f.content || f.url),
        status: 'pending',
        statusText: '待处理',
        time: Date.now(),
        reply: '',
      };

      // 添加到列表
      reportList.value.unshift(newReport);
      saveReportList();

      // 重置表单
      formData.type = '';
      formData.target = '';
      formData.reason = '';
      formData.contact = '';
      fileList.value = [];

      submitting.value = false;
      showSuccessToast('举报提交成功!我们会尽快核实处理');

      // 显示感谢提示
      setTimeout(() => {
        showToast({
          type: 'success',
          message: '感谢您的监督!',
          duration: 2000,
        });
      }, 500);
    }, 1500);
  };

  /**
   * 显示举报详情
   */
  const showReportDetail = item => {
    currentReport.value = item;
    showDetailPopup.value = true;
  };

  // ========================================
  // 生命周期
  // ========================================
  onMounted(() => {
    loadReportList();
  });
</script>

<style lang="less" scoped>
  .report-page {
    min-height: 100%;
    background: var(--color-bg-primary);
    padding-bottom: var(--spacing-lg);
  }

  /* ========================================
   举报说明卡片
   ======================================== */
  .intro-card {
    margin: var(--spacing-sm);
    padding: var(--spacing-md);
    background: var(--color-bg-secondary);
    border-radius: var(--radius-md);
    text-align: center;

    .van-icon {
      margin-bottom: var(--spacing-sm);
    }

    h3 {
      margin: 0 0 3px 0;
      font-size: var(--font-size-md);
      color: var(--color-text-primary);
    }

    p {
      margin: 0;
      font-size: 12px;
      color: var(--color-text-secondary);
      line-height: 1.5;
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

  .section-label {
    font-size: 13px;
    color: var(--color-text-primary);
    margin: var(--spacing-sm) var(--spacing-sm) var(--spacing-xs);
    font-weight: var(--font-weight-medium);
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);

    .required {
      color: var(--color-danger);
    }

    .tip-text {
      font-size: 11px;
      color: var(--color-text-secondary);
      font-weight: var(--font-weight-normal);
    }
  }

  /* ========================================
   举报表单
   ======================================== */
  .report-form {
    margin: 0 var(--spacing-sm);

    .form-section {
      margin-bottom: var(--spacing-md);

      .upload-tip {
        font-size: 11px;
        color: var(--color-text-secondary);
        margin: var(--spacing-xs) var(--spacing-sm) 0;
      }

      .upload-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 70px;
        height: 70px;
        background: var(--color-bg-tertiary);
        border-radius: var(--radius-sm);
        color: var(--color-text-secondary);

        p {
          margin: 3px 0 0 0;
          font-size: 11px;
        }
      }
    }

    .submit-section {
      margin-top: var(--spacing-lg);
      padding: 0 var(--spacing-sm);

      :deep(.van-button) {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-xs);
        font-weight: var(--font-weight-semibold);

        .van-icon {
          font-size: 14px;
        }
      }
    }
  }

  /* ========================================
   举报记录
   ======================================== */
  .report-history {
    margin: 0 var(--spacing-sm);

    .report-item {
      margin-bottom: var(--spacing-xs);
      border-radius: var(--radius-sm);

      .report-header {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        margin-bottom: 3px;

        .report-time {
          font-size: 11px;
          color: var(--color-text-secondary);
        }
      }

      .report-preview {
        font-size: 12px;
        color: var(--color-text-secondary);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
      padding: var(--spacing-md);
      border-bottom: 1px solid var(--color-border);

      h3 {
        margin: 0;
        font-size: var(--font-size-md);
        color: var(--color-text-primary);
        text-align: center;
      }
    }

    .popup-content {
      flex: 1;
      overflow-y: auto;
      padding: var(--spacing-md);

      .detail-item {
        margin-bottom: var(--spacing-md);

        .label {
          font-size: 12px;
          color: var(--color-text-secondary);
          margin-bottom: 3px;
        }

        .value {
          font-size: 13px;
          color: var(--color-text-primary);
          line-height: 1.5;

          &.reason {
            font-size: 13px;
            color: var(--color-text-secondary);
            white-space: pre-wrap;
          }

          &.reply {
            background: var(--color-bg-tertiary);
            padding: var(--spacing-sm);
            border-radius: var(--radius-sm);
            font-size: 13px;
            color: var(--color-text-primary);
          }
        }
      }
    }
  }
</style>
