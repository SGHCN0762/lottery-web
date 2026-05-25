<template>
  <section class="feedback-form">
    <van-form @submit="handleSubmit">
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
          />
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
          <van-field v-model="formData.contact" placeholder="手机号或邮箱，方便我们回复您" />
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

    <!-- 反馈类型选择器 -->
    <van-popup v-model:show="showTypePicker" position="bottom" round>
      <van-picker
        :columns="typeOptions"
        @confirm="onTypeConfirm"
        @cancel="showTypePicker = false"
      />
    </van-popup>
  </section>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import { showToast, showSuccessToast } from 'vant';
  import {
    Form as VanForm,
    Field as VanField,
    CellGroup as VanCellGroup,
    Button as VanButton,
    Uploader as VanUploader,
    Icon as VanIcon,
    Popup as VanPopup,
    Picker as VanPicker,
  } from 'vant';

  // ========================================
  // Props & Emits
  // ========================================
  const props = defineProps({
    submitting: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['submit']);

  // ========================================
  // 响应式数据
  // ========================================
  const showTypePicker = ref(false);
  const fileList = ref([]);

  // 表单数据
  const formData = reactive({
    type: '',
    description: '',
    contact: '',
  });

  // ========================================
  // 配置选项
  // ========================================
  const typeOptions = [
    { text: '功能建议', value: '功能建议' },
    { text: 'Bug反馈', value: 'Bug反馈' },
    { text: '体验优化', value: '体验优化' },
    { text: '内容问题', value: '内容问题' },
    { text: '其他', value: '其他' },
  ];

  // ========================================
  // 方法
  // ========================================

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
   * 提交表单
   */
  const handleSubmit = () => {
    if (!formData.type) {
      showToast({ type: 'fail', message: '请选择反馈类型' });
      return;
    }

    if (!formData.description.trim()) {
      showToast({ type: 'fail', message: '请填写问题描述' });
      return;
    }

    if (formData.description.trim().length < 10) {
      showToast({ type: 'fail', message: '问题描述至少需要10个字符' });
      return;
    }

    // 触发表单提交事件
    emit('submit', { ...formData }, fileList.value);

    // 重置表单
    setTimeout(() => {
      formData.type = '';
      formData.description = '';
      formData.contact = '';
      fileList.value = [];

      showSuccessToast('反馈提交成功！我们会尽快处理您的建议');

      // 显示感谢提示
      setTimeout(() => {
        showToast({
          type: 'success',
          message: '感谢您的宝贵意见！',
          duration: 2000,
        });
      }, 500);
    }, 100);
  };
</script>

<style lang="less" scoped>
  .feedback-form {
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
</style>
