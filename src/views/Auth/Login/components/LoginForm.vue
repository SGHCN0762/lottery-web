<template>
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
        <span class="forgot-link" @click="emit('forgot-password')">{{ t('auth.forgotPassword') }}</span>
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
      <span class="link-text" @click="emit('go-register')">{{ t('auth.registerNow') }}</span>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { showToast, showLoadingToast, closeToast } from 'vant'
import { 
  Form as VanForm, 
  Field as VanField, 
  Button as VanButton, 
  Checkbox as VanCheckbox
} from 'vant'

const emit = defineEmits(['login-success', 'forgot-password', 'go-register'])

// ========================================
// i18n
// ========================================
const { t } = useI18n()

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
 * 验证表单数据
 * @returns {Boolean} 是否验证通过
 */
const validateForm = () => {
  // 验证手机号格式
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(formData.phone)) {
    showToast({
      type: 'fail',
      message: t('auth.invalidPhone')
    })
    return false
  }

  // 验证密码长度
  if (formData.password.length < 6) {
    showToast({
      type: 'fail',
      message: t('auth.passwordMinLength')
    })
    return false
  }
  
  return true
}

/**
 * 执行登录请求
 * @returns {Promise<Object>} 登录结果包含 token 和 userInfo
 */
const performLoginRequest = async () => {
  // TODO: 调用后端登录接口
  // const response = await loginApi(formData.phone, formData.password)
  
  // 模拟登录延迟
  await new Promise(resolve => setTimeout(resolve, 1500))

  // 模拟登录成功数据
  return {
    token: 'mock_token_' + Date.now(),
    userInfo: {
      id: '10086',
      name: t('auth.userName'),
      phone: formData.phone,
      avatar: '',
      points: 1580,
      gamesPlayed: 128,
      badges: 12
    }
  }
}

/**
 * 处理登录成功后的逻辑
 * @param {Object} data - 包含 token 和 userInfo
 */
const handleLoginSuccessLogic = ({ token, userInfo }) => {
  // 保存登录信息到 localStorage
  localStorage.setItem('token', token)
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
  
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

  // 通知父组件登录成功
  emit('login-success', { token, userInfo })
}

/**
 * 处理登录失败
 * @param {Error} error - 错误对象
 */
const handleLoginError = (error) => {
  console.error('登录失败:', error)
  closeToast()
  showToast({
    type: 'fail',
    message: t('auth.loginFail')
  })
}

/**
 * 处理登录
 * @param {Object} values - 表单值
 */
const handleLogin = async (values) => {
  console.log('登录表单提交:', values)
  
  // 1. 验证表单
  if (!validateForm()) {
    return
  }

  try {
    loading.value = true
    showLoadingToast({
      message: t('auth.loggingIn'),
      forbidClick: true,
      duration: 0
    })

    // 2. 执行登录请求
    const result = await performLoginRequest()

    // 3. 处理成功逻辑
    handleLoginSuccessLogic(result)

  } catch (error) {
    // 4. 处理失败逻辑
    handleLoginError(error)
  } finally {
    loading.value = false
  }
}

// 暴露表单数据以便父组件初始化（如记住密码）
defineExpose({
  formData
})
</script>

<style lang="less" scoped>
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
</style>