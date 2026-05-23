<template>
  <van-popup
    :show="visible"
    position="bottom"
    :style="{ height: '65%' }"
    round
    closeable
    @close="handleClose"
  >
    <div class="change-password-popup">
      <div class="popup-header">
        <h3>{{ t('settings.passwordChangeTitle') }}</h3>
      </div>

      <div class="form-content">
        <van-form @submit="handleSubmit">
          <van-cell-group inset>
            <van-field
              v-model="form.oldPassword"
              name="oldPassword"
              :label="t('settings.oldPassword')"
              :placeholder="t('settings.oldPasswordPlaceholder')"
              type="password"
              :rules="[{ required: true, message: t('settings.oldPasswordRequired') }]"
            />

            <van-field
              v-model="form.newPassword"
              name="newPassword"
              :label="t('settings.newPassword')"
              :placeholder="t('settings.newPasswordPlaceholder')"
              type="password"
              maxlength="20"
              :rules="[
                { required: true, message: t('settings.newPasswordRequired') },
                { pattern: /^.{6,20}$/, message: t('settings.passwordLengthRule') },
              ]"
            />

            <van-field
              v-model="form.confirmPassword"
              name="confirmPassword"
              :label="t('settings.confirmPassword')"
              :placeholder="t('settings.confirmPasswordPlaceholder')"
              type="password"
              :rules="[
                { required: true, message: t('settings.confirmPasswordRequired') },
                { validator: validateConfirmPassword, message: t('settings.passwordMismatch') },
              ]"
            />
          </van-cell-group>

          <div class="submit-btn">
            <van-button round block type="primary" native-type="submit" :loading="submitting">
              {{ t('settings.confirmChange') }}
            </van-button>
          </div>
        </van-form>

        <div class="tips">
          <van-icon name="shield-o" size="14" />
          <span>{{ t('settings.passwordTip') }}</span>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
  import { reactive, watch, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { showToast } from 'vant';
  import {
    Popup as VanPopup,
    Form as VanForm,
    CellGroup as VanCellGroup,
    Field as VanField,
    Button as VanButton,
    Icon as VanIcon,
  } from 'vant';

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['update:visible', 'confirm']);

  const { t } = useI18n();

  const form = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const submitting = ref(false);

  watch(
    () => props.visible,
    val => {
      if (val) {
        form.oldPassword = '';
        form.newPassword = '';
        form.confirmPassword = '';
      }
    }
  );

  const validateConfirmPassword = value => {
    return value === form.newPassword;
  };

  const handleClose = () => {
    emit('update:visible', false);
  };

  const handleSubmit = async () => {
    if (form.oldPassword !== '123456') {
      showToast({ type: 'fail', message: t('settings.oldPasswordError') });
      return;
    }

    if (form.newPassword.length < 6 || form.newPassword.length > 20) {
      showToast({ type: 'fail', message: t('settings.passwordLength') });
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      showToast({ type: 'fail', message: t('settings.passwordMismatch') });
      return;
    }

    if (form.newPassword === form.oldPassword) {
      showToast({ type: 'fail', message: t('settings.samePassword') });
      return;
    }

    submitting.value = true;

    setTimeout(() => {
      emit('confirm');
      submitting.value = false;
      emit('update:visible', false);
    }, 1500);
  };
</script>

<style lang="less" scoped>
  .change-password-popup {
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

    .form-content {
      flex: 1;
      overflow-y: auto;
      padding: var(--spacing-md);

      .submit-btn {
        margin-top: var(--spacing-lg);
        padding: 0 var(--spacing-sm);
      }

      .tips {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        font-size: 11px;
        color: var(--color-text-secondary);
        margin-top: var(--spacing-md);
        padding: var(--spacing-sm);
        background: rgba(0, 122, 255, 0.05);
        border-radius: var(--radius-sm);
        justify-content: center;

        .van-icon {
          color: var(--color-primary);
        }
      }
    }
  }
</style>
