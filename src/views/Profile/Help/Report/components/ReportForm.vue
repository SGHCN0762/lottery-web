<template>
  <section class="report-form">
    <van-form ref="formRef" @submit="handleSubmit">
      <!-- 举报类型 -->
      <div class="form-section">
        <div class="section-label">{{ t('help.report.type') }} <span class="required">*</span></div>
        <van-cell-group inset>
          <van-field
            v-model="formType"
            is-link
            readonly
            :placeholder="t('help.report.validation.selectType')"
            :rules="[{ required: true, message: t('help.report.validation.selectType') }]"
            @click="$emit('type-picker-open')"
          />
        </van-cell-group>
      </div>

      <!-- 被举报对象 -->
      <div class="form-section">
        <div class="section-label">{{ t('help.report.target') }} <span class="required">*</span></div>
        <van-cell-group inset>
          <van-field
            v-model="formTarget"
            :placeholder="t('help.report.targetPlaceholder')"
            :rules="[{ required: true, message: t('help.report.validation.enterTarget') }]"
          />
        </van-cell-group>
      </div>

      <!-- 举报原因 -->
      <div class="form-section">
        <div class="section-label">
          {{ t('help.report.reason') }}
          <span class="required">*</span>
          <span class="tip-text">({{ t('help.report.validation.reasonLength') }})</span>
        </div>
        <van-cell-group inset>
          <van-field
            v-model="formReason"
            type="textarea"
            rows="4"
            maxlength="500"
            show-word-limit
            :placeholder="t('help.report.reasonPlaceholder')"
            :rules="[
              { required: true, message: t('help.report.validation.enterReason') },
              { validator: validateReasonLength, message: t('help.report.validation.reasonLength') }
            ]"
          />
        </van-cell-group>
      </div>

      <!-- 联系方式 -->
      <div class="form-section">
        <div class="section-label">{{ t('help.report.contactLabel') }}</div>
        <van-cell-group inset>
          <van-field v-model="formContact" :placeholder="t('help.report.contactPlaceholder')" />
        </van-cell-group>
      </div>

      <!-- 证据上传 -->
      <div class="form-section">
        <div class="section-label">{{ t('help.report.uploadEvidence') }}</div>
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
                  <p>{{ t('help.report.uploadPlaceholder') }}</p>
                </div>
              </van-uploader>
            </template>
          </van-field>
        </van-cell-group>
        <p class="upload-tip">{{ t('help.report.uploadTip') }}</p>
      </div>

      <!-- 提交按钮 -->
      <div class="submit-section">
        <van-button
          round
          block
          type="danger"
          native-type="submit"
          :loading="submitting"
          :loading-text="t('help.report.submitting')"
        >
          <van-icon name="warning-o" />
          {{ t('help.report.submit') }}
        </van-button>
      </div>
    </van-form>
  </section>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { showToast } from 'vant';
  import {
    Form as VanForm,
    Field as VanField,
    CellGroup as VanCellGroup,
    Button as VanButton,
    Uploader as VanUploader,
    Icon as VanIcon,
  } from 'vant';

  const { t } = useI18n();

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
