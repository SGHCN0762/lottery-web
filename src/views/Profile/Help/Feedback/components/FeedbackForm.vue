<template>
  <section class="feedback-form">
    <van-form @submit="handleSubmit">
      <!-- 反馈类型 -->
      <div class="form-section">
        <div class="section-label">{{ t('help.feedback.type') }} <span class="required">*</span></div>
        <van-cell-group inset>
          <van-field
            v-model="formData.type"
            is-link
            readonly
            :placeholder="t('help.feedback.validation.selectType')"
            @click="showTypePicker = true"
          />
        </van-cell-group>
      </div>

      <!-- 问题描述 -->
      <div class="form-section">
        <div class="section-label">
          {{ t('help.feedback.descriptionLabel') }}
          <span class="required">*</span>
          <span class="tip-text">（{{ t('help.feedback.validation.descriptionLength') }}）</span>
        </div>
        <van-cell-group inset>
          <van-field
            v-model="formData.description"
            type="textarea"
            rows="4"
            maxlength="500"
            show-word-limit
            :placeholder="t('help.feedback.descriptionPlaceholder')"
            :rules="[{ required: true, message: t('help.feedback.validation.enterDescription') }]"
          />
        </van-cell-group>
      </div>

      <!-- 联系方式 -->
      <div class="form-section">
        <div class="section-label">{{ t('help.feedback.contactLabel') }}</div>
        <van-cell-group inset>
          <van-field v-model="formData.contact" :placeholder="t('help.feedback.contactPlaceholder')" />
        </van-cell-group>
      </div>

      <!-- 图片上传 -->
      <div class="form-section">
        <div class="section-label">{{ t('help.feedback.uploadImages') }}</div>
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
                  <p>{{ t('help.feedback.uploadPlaceholder') }}</p>
                </div>
              </van-uploader>
            </template>
          </van-field>
        </van-cell-group>
        <p class="upload-tip">{{ t('help.feedback.uploadTip') }}</p>
      </div>

      <!-- 提交按钮 -->
      <div class="submit-section">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          :loading="submitting"
          :loading-text="t('help.feedback.submitting')"
        >
          <van-icon name="send-o" />
          {{ t('help.feedback.submit') }}
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
  import { ref, reactive, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
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

  const { t } = useI18n();

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
  const typeOptions = computed(() => [
    { text: t('help.feedback.typeOptions.featureSuggestion'), value: t('help.feedback.typeOptions.featureSuggestion') },
    { text: t('help.feedback.typeOptions.bugReport'), value: t('help.feedback.typeOptions.bugReport') },
    { text: t('help.feedback.typeOptions.experienceImprovement'), value: t('help.feedback.typeOptions.experienceImprovement') },
    { text: t('help.feedback.typeOptions.contentIssue'), value: t('help.feedback.typeOptions.contentIssue') },
    { text: t('help.feedback.typeOptions.other'), value: t('help.feedback.typeOptions.other') },
  ]);

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
      showToast({ type: 'fail', message: t('help.feedback.validation.selectType') });
      return;
    }

    if (!formData.description.trim()) {
      showToast({ type: 'fail', message: t('help.feedback.validation.enterDescription') });
      return;
    }

    if (formData.description.trim().length < 10) {
      showToast({ type: 'fail', message: t('help.feedback.validation.descriptionLength') });
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

      showSuccessToast(t('help.feedback.success.submit'));

      // 显示感谢提示
      setTimeout(() => {
        showToast({
          type: 'success',
          message: t('help.feedback.success.thanks'),
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
