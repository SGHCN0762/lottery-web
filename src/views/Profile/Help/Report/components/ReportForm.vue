<template>
  <section class="report-form">
    <van-form ref="formRef" @submit="handleSubmit">
      <!-- 举报类型 -->
      <div class="form-section">
        <div class="section-label">举报类型 <span class="required">*</span></div>
        <van-cell-group inset>
          <van-field
            v-model="formType"
            is-link
            readonly
            placeholder="请选择举报类型"
            :rules="[{ required: true, message: '请选择举报类型' }]"
            @click="$emit('type-picker-open')"
          />
        </van-cell-group>
      </div>

      <!-- 被举报对象 -->
      <div class="form-section">
        <div class="section-label">被举报对象 <span class="required">*</span></div>
        <van-cell-group inset>
          <van-field
            v-model="formTarget"
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
            v-model="formReason"
            type="textarea"
            rows="4"
            maxlength="500"
            show-word-limit
            placeholder="请详细描述举报原因,包括:&#10;1. 具体是什么违规行为?&#10;2. 发生的时间和位置&#10;3. 相关证据说明..."
            :rules="[
              { required: true, message: '请填写举报原因' },
              { validator: validateReasonLength, message: '举报原因至少需要10个字符' }
            ]"
          />
        </van-cell-group>
      </div>

      <!-- 联系方式 -->
      <div class="form-section">
        <div class="section-label">联系方式(选填)</div>
        <van-cell-group inset>
          <van-field v-model="formContact" placeholder="手机号或邮箱,方便我们联系您" />
        </van-cell-group>
      </div>

      <!-- 证据上传 -->
      <div class="form-section">
        <div class="section-label">上传证据(选填)</div>
        <van-cell-group inset>
          <van-field>
            <template #input>
              <van-uploader
                v-model="uploadedFiles"
                :max-count="5"
                :after-read="handleAfterRead"
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
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { showToast } from 'vant';
  import {
    Form as VanForm,
    Field as VanField,
    CellGroup as VanCellGroup,
    Button as VanButton,
    Uploader as VanUploader,
    Icon as VanIcon,
  } from 'vant';

  const props = defineProps({
    formData: {
      type: Object,
      required: true,
    },
    fileList: {
      type: Array,
      required: true,
    },
    submitting: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['submit', 'type-picker-open', 'after-read', 'update:form-data', 'update:file-list']);

  const formRef = ref(null);

  // 使用计算属性实现双向绑定
  const formType = computed({
    get: () => props.formData.type,
    set: (value) => emit('update:form-data', { ...props.formData, type: value }),
  });

  const formTarget = computed({
    get: () => props.formData.target,
    set: (value) => emit('update:form-data', { ...props.formData, target: value }),
  });

  const formReason = computed({
    get: () => props.formData.reason,
    set: (value) => emit('update:form-data', { ...props.formData, reason: value }),
  });

  const formContact = computed({
    get: () => props.formData.contact,
    set: (value) => emit('update:form-data', { ...props.formData, contact: value }),
  });

  const uploadedFiles = computed({
    get: () => props.fileList,
    set: (value) => emit('update:file-list', value),
  });

  /**
   * 验证举报原因长度
   */
  const validateReasonLength = value => {
    return value && value.trim().length >= 10;
  };

  /**
   * 处理表单提交
   */
  const handleSubmit = values => {
    emit('submit', values);
  };

  /**
   * 处理图片上传
   */
  const handleAfterRead = file => {
    emit('after-read', file);
  };
</script>

<style lang="less" scoped>
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
</style>
