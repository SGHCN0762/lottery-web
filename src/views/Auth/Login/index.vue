<template>
  <div class="login-page">
    <!-- Logo区域 - 放大Logo，突出品牌 -->
    <section class="logo-section">
      <div class="logo-container">
        <div class="logo-icon">
          <img src="@/assets/logo.svg" alt="瑶光神域 Logo" class="app-logo" />
        </div>
      </div>
    </section>

    <!-- 登录表单卡片 -->
    <section class="form-card">
      <van-form @submit="handleLogin" class="login-form">
        <!-- 手机号输入 -->
        <van-field
          v-model="formData.phone"
          name="phone"
          :label="t('auth.phone')"
          :placeholder="t('auth.phonePlaceholder')"
          :rules="[{ required: true, message: t('auth.phoneRequired') }]"
          type="tel"
          maxlength="11"
          clearable
          left-icon="phone-o"
        />

        <!-- 密码输入 -->
        <van-field
          v-model="formData.password"
          type="password"
          name="password"
          :label="t('auth.password')"
          :placeholder="t('auth.passwordPlaceholder')"
          :rules="[{ required: true, message: t('auth.passwordRequired') }]"
          clearable
          left-icon="lock"
        />

        <!-- 记住我 & 忘记密码 -->
        <div class="form-options">
          <van-checkbox v-model="formData.rememberMe" icon-size="16px">
            {{ t('auth.rememberMe') }}
          </van-checkbox>
          <span class="forgot-link" @click="handleForgotPassword">{{ t('auth.forgotPassword') }}</span>
        </div>

        <!-- 登录按钮 -->
        <div class="submit-section">
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            :loading="loading"
            :loading-text="t('auth.loggingIn')"
            class="login-btn"
          >
            {{ t('auth.login') }}
          </van-button>
        </div>
      </van-form>

      <!-- 注册链接 -->
      <div class="register-link">
        {{ t('auth.noAccount') }}
        <span class="link-text" @click="goToRegister">{{ t('auth.registerNow') }}</span>
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
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { showToast, showLoadingToast, closeToast } from 'vant'
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
  password: '',
  rememberMe: false
})

// ========================================
// 加载状态
// ========================================
const loading = ref(false)

// ========================================
// 事件处理函数
// ========================================

/**
 * 处理登录
 * @param {Object} values - 表单值
 */
const handleLogin = async (values) => {
  console.log('登录表单提交:', values)
  
  // 验证手机号格式
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(formData.phone)) {
    showToast({
      type: 'fail',
      message: t('auth.invalidPhone')
    })
    return
  }

  // 验证密码长度
  if (formData.password.length < 6) {
    showToast({
      type: 'fail',
      message: t('auth.passwordMinLength')
    })
    return
  }

  try {
    loading.value = true
    showLoadingToast({
      message: t('auth.loggingIn'),
      forbidClick: true,
      duration: 0
    })

    // TODO: 调用后端登录接口
    // const response = await loginApi(formData.phone, formData.password)
    
    // 模拟登录延迟
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 模拟登录成功
    const mockToken = 'mock_token_' + Date.now()
    const mockUserInfo = {
      id: '10086',
      name: t('auth.userName'),
      phone: formData.phone,
      avatar: '',
      points: 1580,
      gamesPlayed: 128,
      badges: 12
    }

    // 保存登录信息到 localStorage
    localStorage.setItem('token', mockToken)
    localStorage.setItem('userInfo', JSON.stringify(mockUserInfo))
    
    if (formData.rememberMe) {
      localStorage.setItem('rememberedPhone', formData.phone)
    } else {
      localStorage.removeItem('rememberedPhone')
    }

    closeToast()
    showToast({
      type: 'success',
      message: t('auth.loginSuccess')
    })

    // 跳转到首页
    setTimeout(() => {
      router.push({ name: 'Home' })
    }, 1000)

  } catch (error) {
    console.error('登录失败:', error)
    closeToast()
    showToast({
      type: 'fail',
      message: t('auth.loginFail')
    })
  } finally {
    loading.value = false
  }
}

/**
 * 处理忘记密码
 */
const handleForgotPassword = () => {
  showToast(t('auth.contactSupport'))
}

/**
 * 跳转到注册页面
 */
const goToRegister = () => {
  router.push({ name: 'Register' })
}

/**
 * 处理第三方登录
 * @param {String} platform - 平台类型
 */
const handleSocialLogin = (platform) => {
  const platformNames = {
    wechat: t('auth.wechat'),
    qq: t('auth.qq'),
    weibo: t('auth.weibo')
  }
  showToast(`${platformNames[platform]}${t('auth.loginInDevelopment')}`)
}

// ========================================
// 生命周期钩子
// ========================================
// 页面加载时，如果记住了手机号，自动填充
const rememberedPhone = localStorage.getItem('rememberedPhone')
if (rememberedPhone) {
  formData.phone = rememberedPhone
  formData.rememberMe = true
}
</script>

<style lang="less" scoped>
.login-page {
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

  .login-form {
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
  }

  /* 表单选项 */
  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0;

    :deep(.van-checkbox) {
      .van-checkbox__icon {
        height: 20px;
      }
      .van-checkbox__label {
        font-size: 13px;
        color: var(--color-text-secondary, #86868b);
        font-weight: 400;
        transition: color 0.3s ease;
      }
    }

    .forgot-link {
      font-size: 13px;
      color: var(--color-primary, #0071e3);
      cursor: pointer;
      transition: opacity 0.2s ease;
      font-weight: 500;

      &:active {
        opacity: 0.6;
      }
    }
  }

  /* 提交按钮 */
  .submit-section {
    margin-top: 16px;

    .login-btn {
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

  /* 注册链接 */
  .register-link {
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

/* ========================================
   温馨提示
   ======================================== */
.tip-section {
  width: 100%;
  max-width: 400px;
  margin-top: var(--spacing-md);

  :deep(.van-notice-bar) {
    background: var(--color-bg-card, white);
    color: var(--color-text-secondary, #86868b);
    border-radius: 8px;
    box-shadow: var(--shadow-light, 0 2px 8px rgba(0, 0, 0, 0.08));
  }
}
</style>