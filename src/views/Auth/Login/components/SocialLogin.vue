<template>
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
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { showToast } from 'vant'
import { Icon as VanIcon } from 'vant'

const { t } = useI18n()

const emit = defineEmits(['social-login'])

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
  emit('social-login', platform)
}
</script>

<style lang="less" scoped>
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