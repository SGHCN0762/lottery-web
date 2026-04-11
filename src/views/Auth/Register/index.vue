<template>
  <div class="register-page">
    <!-- Logo区域 - 放大Logo，突出品牌 -->
    <section class="logo-section">
      <div class="logo-container">
        <div class="logo-icon">
          <img src="@/assets/logo.svg" alt="瑶光神域 Logo" class="app-logo" />
        </div>
      </div>
    </section>

    <!-- 注册表单卡片 - 增加内边距，更大气 -->
    <section class="form-card">
      <van-form @submit="handleRegister" class="register-form">
        <!-- 手机号输入 -->
        <van-field
          v-model="formData.phone"
          name="phone"
          :label="t('auth.phone')"
          :placeholder="t('auth.phonePlaceholder')"
          :rules="[
            { required: true, message: t('auth.phoneRequired') },
            { pattern: /^1[3-9]\d{9}$/, message: t('auth.invalidPhone') }
          ]"
          type="tel"
          maxlength="11"
          clearable
          left-icon="phone-o"
        />

        <!-- 验证码 -->
        <van-field
          v-model="formData.code"
          name="code"
          :label="t('auth.verificationCode')"
          :placeholder="t('auth.verificationCodePlaceholder')"
          :rules="[{ required: true, message: t('auth.verificationCodeRequired') }]"
          center
          clearable
          left-icon="shield-o"
        >
          <template #button>
            <van-button
              size="small"
              type="primary"
              :disabled="countdown > 0"
              @click="sendCode"
              class="code-btn"
            >
              {{ countdown > 0 ? `${countdown}s` : t('auth.getCode') }}
            </van-button>
          </template>
        </van-field>

        <!-- 密码输入 -->
        <van-field
          v-model="formData.password"
          type="password"
          name="password"
          :label="t('auth.password')"
          :placeholder="t('auth.passwordPlaceholder')"
          :rules="[
            { required: true, message: t('auth.passwordRequired') },
            { pattern: /^.{6,20}$/, message: t('auth.passwordLength') }
          ]"
          clearable
          left-icon="lock"
        />

        <!-- 确认密码 -->
        <van-field
          v-model="formData.confirmPassword"
          type="password"
          name="confirmPassword"
          :label="t('auth.confirmPassword')"
          :placeholder="t('auth.confirmPasswordPlaceholder')"
          :rules="[
            { required: true, message: t('auth.confirmPasswordRequired') },
            { validator: validateConfirmPassword, message: t('auth.passwordMismatch') }
          ]"
          clearable
          left-icon="lock"
        />

        <!-- 用户协议 -->
        <div class="agreement-section">
          <van-checkbox v-model="formData.agreeTerms" icon-size="16px">
            {{ t('auth.agreeTerms') }}
            <span class="link-text" @click.stop="showAgreement('user')">{{ t('auth.userAgreement') }}</span>
            {{ t('auth.and') }}
            <span class="link-text" @click.stop="showAgreement('privacy')">{{ t('auth.privacyPolicy') }}</span>
          </van-checkbox>
        </div>

        <!-- 注册按钮 -->
        <div class="submit-section">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            :loading="loading"
            :loading-text="t('auth.registering')"
            class="register-btn"
          >
            {{ t('auth.register') }}
          </van-button>
        </div>
      </van-form>

      <!-- 登录链接 -->
      <div class="login-link">
        {{ t('auth.hasAccount') }}
        <span class="link-text" @click="goToLogin">{{ t('auth.loginNow') }}</span>
      </div>
    </section>

    <!-- 其他登录方式 -->
    <section class="other-login">
      <div class="divider">
        <span>{{ t('auth.otherLoginMethods') }}</span>
      </div>
      <div class="social-login">
        <div class="social-item" @click="handleSocialLogin('wechat')">
          <van-icon name="wechat" size="28" color="#07C160" />
        </div>
        <div class="social-item" @click="handleSocialLogin('qq')">
          <van-icon name="qq" size="28" color="#12B7F5" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { showToast, showLoadingToast, closeToast, showDialog } from 'vant'
import { useThemeStore } from '@/stores/theme'
import { 
  Form as VanForm, 
  Field as VanField, 
  Button as VanButton, 
  Checkbox as VanCheckbox,
  Icon as VanIcon,
  NoticeBar as VanNoticeBar
} from 'vant'

// ========================================
// i18n
// ========================================
const { t } = useI18n()

// ========================================
// 路由实例
// ========================================
const router = useRouter()

// ========================================
// 主题管理
// ========================================
const themeStore = useThemeStore()
const isDark = computed(() => themeStore.isDark)

// ========================================
// 表单数据
// ========================================
const formData = reactive({
  phone: '',
  code: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

// ========================================
// 加载状态
// ========================================
const loading = ref(false)
const countdown = ref(0)
let timer = null

// ========================================
// 验证函数
// ========================================

/**
 * 验证确认密码
 */
const validateConfirmPassword = (value) => {
  return value === formData.password
}

// ========================================
// 事件处理函数
// ========================================

/**
 * 发送验证码
 */
const sendCode = async () => {
  // 验证手机号
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(formData.phone)) {
    showToast({
      type: 'fail',
      message: t('auth.invalidPhone')
    })
    return
  }

  try {
    showLoadingToast({
      message: t('auth.sendingCode'),
      forbidClick: true,
      duration: 0
    })

    // TODO: 调用后端发送验证码接口
    // await sendCodeApi(formData.phone)
    
    // 模拟发送延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    closeToast()
    showToast({
      type: 'success',
      message: t('auth.codeSent')
    })

    // 开始倒计时
    countdown.value = 60
    timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
        timer = null
      }
    }, 1000)

  } catch (error) {
    console.error('发送验证码失败:', error)
    closeToast()
    showToast({
      type: 'fail',
      message: t('auth.sendCodeFail')
    })
  }
}

/**
 * 处理注册
 * @param {Object} values - 表单值
 */
const handleRegister = async (values) => {
  console.log('注册表单提交:', values)
  
  // 验证是否同意协议
  if (!formData.agreeTerms) {
    showToast({
      type: 'fail',
      message: t('auth.agreeTermsRequired')
    })
    return
  }

  // 验证密码一致性
  if (formData.password !== formData.confirmPassword) {
    showToast({
      type: 'fail',
      message: t('auth.passwordMismatch')
    })
    return
  }

  try {
    loading.value = true
    showLoadingToast({
      message: t('auth.registering'),
      forbidClick: true,
      duration: 0
    })

    // TODO: 调用后端注册接口
    // const response = await registerApi(formData)
    
    // 模拟注册延迟
    await new Promise(resolve => setTimeout(resolve, 1500))

    closeToast()
    showToast({
      type: 'success',
      message: t('auth.registerSuccess')
    })

    // 跳转到登录页
    setTimeout(() => {
      router.push({ name: 'Login' })
    }, 1000)

  } catch (error) {
    console.error('注册失败:', error)
    closeToast()
    showToast({
      type: 'fail',
      message: t('auth.registerFail')
    })
  } finally {
    loading.value = false
  }
}

/**
 * 显示协议
 * @param {String} type - 协议类型
 */
const showAgreement = (type) => {
  const titles = {
    user: t('auth.userAgreement'),
    privacy: t('auth.privacyPolicy')
  }
  
  showDialog({
    title: titles[type],
    message: `${t('auth.agreementContent')}`,
    confirmButtonText: t('common.confirm')
  })
}

/**
 * 跳转到登录页面
 */
const goToLogin = () => {
  router.push({ name: 'Login' })
}

/**
 * 处理社交登录
 * @param {String} platform - 社交平台
 */
const handleSocialLogin = (platform) => {
  console.log(`使用 ${platform} 登录`)
  // TODO: 调用后端社交登录接口
}

// ========================================
// 生命周期钩子
// ========================================
// 组件卸载时清除定时器
onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})
</script>

<style lang="less" scoped>
.register-page {
  min-height: 100vh;
  background: var(--color-bg-primary, #f5f5f7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md) var(--spacing-md);
  transition: background-color 0.3s ease;
  overflow: hidden;
}

/* ========================================
   Logo区域 - 超大Logo，突出品牌
   ======================================== */
.logo-section {
  text-align: center;
  margin-bottom: 16px;

  .logo-container {
    .logo-icon {
      margin-bottom: 8px;
      
      .app-logo {
        width: 140px;
        height: 140px;
        object-fit: contain;
        animation: subtlePulse 4s ease-in-out infinite;
      }
    }
  }
}

@keyframes subtlePulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.95;
  }
}

/* ========================================
   表单卡片 - 透明背景，无边框
   ======================================== */
.form-card {
  width: 100%;
  max-width: 360px;
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 20px 16px;
  box-shadow: none;
  margin-bottom: 16px;
  transition: all 0.3s ease;

  .register-form {
    :deep(.van-cell) {
      background: transparent;
      padding: 10px 0;
      
      &::after {
        border-color: var(--color-border, #e5e5ea);
        left: 0;
        right: 0;
        transition: border-color 0.3s ease;
      }

      &:last-child::after {
        display: none;
      }
    }

    :deep(.van-field__label) {
      display: none;
    }

    :deep(.van-field__control) {
      color: var(--color-text-primary, #1d1d1f);
      font-size: 15px;
      font-weight: 400;
      transition: color 0.3s ease;
    }

    :deep(.van-field__placeholder) {
      color: var(--color-text-placeholder, #c7c7cc);
      transition: color 0.3s ease;
    }

    :deep(.van-icon) {
      color: var(--color-text-secondary, #86868b);
      transition: color 0.3s ease;
      font-size: 16px;
    }

    /* 验证码按钮 */
    .code-btn {
      height: 30px;
      padding: 0 10px;
      font-size: 12px;
      font-weight: 500;
      border-radius: 15px;
    }
  }

  /* 协议区域 */
  .agreement-section {
    margin: 12px 0;

    :deep(.van-checkbox) {
      .van-checkbox__icon {
        height: 20px;
      }
      .van-checkbox__label {
        font-size: 12px;
        color: var(--color-text-secondary, #86868b);
        font-weight: 400;
        transition: color 0.3s ease;

        .link-text {
          color: var(--color-primary, #0071e3);
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.2s ease;

          &:active {
            opacity: 0.6;
          }
        }
      }
    }
  }

  /* 提交按钮 */
  .submit-section {
    margin-top: 16px;

    .register-btn {
      background: var(--color-primary, #0071e3);
      border: none;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: -0.2px;
      height: 44px;
      box-shadow: none;
      transition: all 0.2s ease;
      -webkit-font-smoothing: antialiased;

      &:active {
        transform: scale(0.98);
        opacity: 0.9;
      }
    }
  }

  /* 登录链接 */
  .login-link {
    text-align: center;
    margin-top: 14px;
    font-size: 13px;
    color: var(--color-text-secondary, #86868b);
    font-weight: 400;
    transition: color 0.3s ease;

    .link-text {
      color: var(--color-primary, #0071e3);
      font-weight: 500;
      cursor: pointer;
      margin-left: 4px;
      transition: opacity 0.2s ease;

      &:active {
        opacity: 0.6;
      }
    }
  }
}

/* ========================================
   其他登录方式 - 极简设计
   ======================================== */
.other-login {
  width: 100%;
  max-width: 380px;

  .divider {
    display: flex;
    align-items: center;
    margin: 16px 0;

    &::before,
    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--color-border, #e5e5ea);
      transition: background-color 0.3s ease;
    }

    span {
      padding: 0 var(--spacing-md);
      font-size: 12px;
      color: var(--color-text-secondary, #86868b);
      font-weight: 400;
      transition: color 0.3s ease;
    }
  }

  .social-login {
    display: flex;
    justify-content: center;
    gap: 16px;

    .social-item {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--color-bg-card, white);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-light, 0 2px 8px rgba(0, 0, 0, 0.08));
      cursor: pointer;
      transition: all 0.2s ease;

      &:active {
        transform: scale(0.95);
        box-shadow: var(--shadow-light, 0 1px 4px rgba(0, 0, 0, 0.08));
      }
    }
  }
}
</style>