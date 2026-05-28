<template>
  <van-popup
    :show="visible"
    position="bottom"
    :style="{ height: '60%' }"
    round
    closeable
    @close="handleClose"
    @open="resetForm"
  >
    <div class="bind-phone-popup">
      <div class="popup-header">
        <h3>{{ userInfo.phone ? '更换手机号' : '绑定手机号' }}</h3>
      </div>

      <div class="form-content">
        <van-form @submit="handleSubmit">
          <van-cell-group inset>
            <van-field
              v-model="form.phone"
              name="phone"
              label="手机号"
              placeholder="请输入手机号"
              type="tel"
              maxlength="11"
              :rules="[
                { required: true, message: '请输入手机号' },
                { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
              ]"
            />

            <van-field
              v-model="form.code"
              name="code"
              label="验证码"
              placeholder="请输入验证码"
              maxlength="6"
              :rules="[{ required: true, message: '请输入验证码' }]"
            >
              <template #button>
                <van-button
                  size="small"
                  type="primary"
                  plain
                  :disabled="countdown > 0"
                  @click="sendCode"
                >
                  {{
                    countdown > 0 ? `${countdown}${t('settings.second')}` : t('settings.getCode')
                  }}
                </van-button>
              </template>
            </van-field>
          </van-cell-group>

          <div class="submit-btn">
            <van-button round block type="primary" native-type="submit" :loading="submitting">
              {{ userInfo.phone ? t('settings.change') : t('settings.bind') }}
            </van-button>
          </div>
        </van-form>

        <div class="tips">
          <van-icon name="info-o" size="14" />
          <span>{{ t('settings.bindPhoneTip') }}</span>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
  import { ref, reactive, watch } from 'vue';
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
    userInfo: {
      type: Object,
      required: true,
    },
  });

  const emit = defineEmits(['update:visible', 'confirm']);

  const { t } = useI18n();

  const form = reactive({
    phone: '',
    code: '',
  });

  const countdown = ref(0);
  const submitting = ref(false);

  const resetForm = () => {
    form.phone = props.userInfo.phone || '';
    form.code = '';
    countdown.value = 0;
  };

  const handleClose = () => {
    emit('update:visible', false);
  };

  const sendCode = async () => {
    if (!/^1[3-9]\d{9}$/.test(form.phone)) {
      showToast({ type: 'fail', message: t('settings.invalidPhone') });
      return;
    }

    showToast({ type: 'success', message: t('settings.codeSent') });

    countdown.value = 60;
    const timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  };

  const handleSubmit = async () => {
    if (!/^1[3-9]\d{9}$/.test(form.phone)) {
      showToast({ type: 'fail', message: t('settings.invalidPhone') });
      return;
    }

    if (form.code !== '123456') {
      showToast({ type: 'fail', message: t('settings.codeError') });
      return;
    }

    submitting.value = true;

    setTimeout(() => {
      emit('confirm', form.phone);
      submitting.value = false;
      emit('update:visible', false);
    }, 1500);
  };
</script>

<style lang="less" scoped>
  .bind-phone-popup {
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
