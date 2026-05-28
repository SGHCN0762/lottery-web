<template>
  <div class="settings-page">
    <div class="page-content">
      <!-- 个人信息 -->
      <PersonalInfoSection
      :user-info="userInfo"
      @edit-avatar="showAvatarPicker = true"
      @edit-nickname="showNicknameEdit = true"
    />

    <!-- 账号安全 -->
    <AccountSecuritySection
      :user-info="userInfo"
      @bind-phone="showBindPhone = true"
      @change-password="showChangePassword = true"
      @device-manage="showDeviceManage = true"
    />

    <!-- 通知设置 -->
    <NotificationSection :settings="settings" @update="updateSettings" />

    <!-- 隐私设置 -->
    <PrivacySection :settings="settings" @update="updateSettings" />

    <!-- 语言设置 -->
    <LanguageSection @change-language="showLanguagePicker = true" />

    <!-- 主题设置 -->
    <ThemeSection @change-theme="showThemePicker = true" />

    <!-- 其他设置 -->
    <OthersSection
      :cache-size="cacheSize"
      :current-version="currentVersion"
      @clear-cache="handleClearCache"
      @check-update="handleCheckUpdate"
      @logout="handleLogout"
    />

    <!-- 昵称编辑弹窗 -->
    <NicknameEditModal
      v-model:visible="showNicknameEdit"
      :current-nickname="userInfo.nickname"
      @confirm="handleNicknameConfirm"
    />

    <!-- 头像选择器 -->
    <AvatarPickerModal v-model:visible="showAvatarPicker" @select-image="handleAvatarSelected" />

    <!-- 头像裁剪弹窗 -->
    <AvatarCropperModal
      v-model:visible="showCropper"
      :image="tempImage"
      @confirm="handleAvatarConfirm"
    />

    <!-- 绑定手机弹窗 -->
    <BindPhoneModal
      v-model:visible="showBindPhone"
      :user-info="userInfo"
      @confirm="handleBindPhoneConfirm"
    />

    <!-- 修改密码弹窗 -->
    <ChangePasswordModal
      v-model:visible="showChangePassword"
      @confirm="handleChangePasswordConfirm"
    />

    <!-- 设备管理弹窗 -->
    <DeviceManageModal v-model:visible="showDeviceManage" />

    <!-- 语言选择器 -->
    <LanguagePickerModal v-model:visible="showLanguagePicker" />

    <!-- 主题选择器 -->
    <ThemePickerModal v-model:visible="showThemePicker" />
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import { showToast, showConfirmDialog } from 'vant';
  import { useCacheStore } from '@/stores/cache';

  const cacheStore = useCacheStore();

  // 导入组件
  import PersonalInfoSection from './components/PersonalInfoSection.vue';
  import AccountSecuritySection from './components/AccountSecuritySection.vue';
  import NotificationSection from './components/NotificationSection.vue';
  import PrivacySection from './components/PrivacySection.vue';
  import LanguageSection from './components/LanguageSection.vue';
  import ThemeSection from './components/ThemeSection.vue';
  import OthersSection from './components/OthersSection.vue';
  import NicknameEditModal from './components/NicknameEditModal.vue';
  import AvatarPickerModal from './components/AvatarPickerModal.vue';
  import AvatarCropperModal from './components/AvatarCropperModal.vue';
  import BindPhoneModal from './components/BindPhoneModal.vue';
  import ChangePasswordModal from './components/ChangePasswordModal.vue';
  import DeviceManageModal from './components/DeviceManageModal.vue';
  import LanguagePickerModal from './components/LanguagePickerModal.vue';
  import ThemePickerModal from './components/ThemePickerModal.vue';

  // ========================================
  // i18n
  // ========================================
  const { t } = useI18n();

  // ========================================
  // 路由实例
  // ========================================
  const router = useRouter();

  // ========================================
  // 响应式数据
  // ========================================
  const showNicknameEdit = ref(false);
  const showAvatarPicker = ref(false);
  const showCropper = ref(false);
  const showBindPhone = ref(false);
  const showChangePassword = ref(false);
  const showDeviceManage = ref(false);
  const showLanguagePicker = ref(false);
  const showThemePicker = ref(false);
  const cacheSize = ref('12.5MB');
  const currentVersion = ref('v1.0.0');
  const tempImage = ref('');

  // 用户信息
  const userInfo = reactive({
    userId: '10086',
    nickname: '娱乐达人',
    avatar: '',
    phone: '',
  });

  // 设置项
  const settings = reactive({
    gameNotification: true,
    checkinReminder: true,
    systemMessage: true,
    showOnlineStatus: false,
    allowViewRecords: false,
  });

  // ========================================
  // 方法
  // ========================================

  /**
   * 加载用户设置
   */
  const loadSettings = () => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const user = JSON.parse(storedUserInfo);
      Object.assign(userInfo, {
        userId: user.id || '10086',
        nickname: user.name || '娱乐达人',
        avatar: user.avatar || '',
        phone: user.phone || '',
      });
    }

    const storedSettings = localStorage.getItem('userSettings');
    if (storedSettings) {
      Object.assign(settings, JSON.parse(storedSettings));
    }
  };

  /**
   * 保存设置
   */
  const saveSettings = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
  };

  /**
   * 更新设置
   */
  const updateSettings = newSettings => {
    Object.assign(settings, newSettings);
    saveSettings();
  };

  /**
   * 处理昵称确认
   */
  const handleNicknameConfirm = nickname => {
    userInfo.nickname = nickname;
    showToast(t('settings.nicknameSuccess'));
    saveUserInfo();
  };

  /**
   * 保存用户信息
   */
  const saveUserInfo = () => {
    const userInfoData = {
      id: userInfo.userId,
      name: userInfo.nickname,
      avatar: userInfo.avatar,
      phone: userInfo.phone,
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfoData));
  };

  /**
   * 处理头像选择
   */
  const handleAvatarSelected = image => {
    tempImage.value = image;
    showCropper.value = true;
  };

  /**
   * 处理头像确认
   */
  const handleAvatarConfirm = avatar => {
    userInfo.avatar = avatar;
    saveUserInfo();
    showToast({ type: 'success', message: t('settings.avatarSuccess') });
  };

  /**
   * 处理绑定手机确认
   */
  const handleBindPhoneConfirm = phone => {
    userInfo.phone = phone;
    saveUserInfo();
    showToast({
      type: 'success',
      message: userInfo.phone ? t('settings.phoneChanged') : t('settings.phoneBound'),
    });
  };

  /**
   * 处理修改密码确认
   */
  const handleChangePasswordConfirm = () => {
    showToast({ type: 'success', message: t('settings.passwordChanged') });
  };

  /**
   * 处理清除缓存
   */
  const handleClearCache = async () => {
    try {
      await showConfirmDialog({
        title: t('settings.cacheClearTitle'),
        message: t('settings.cacheClearMessage'),
      });

      const token = localStorage.getItem('token');
      const userInfo = localStorage.getItem('userInfo');

      localStorage.clear();

      sessionStorage.clear();

      await cacheStore.clearAllCache();

      if (token) {
        localStorage.setItem('token', token);
      }
      if (userInfo) {
        localStorage.setItem('userInfo', userInfo);
      }

      cacheSize.value = '0MB';
      showToast(t('settings.cacheCleared'));
    } catch {}
  };

  /**
   * 处理检查更新
   */
  const handleCheckUpdate = () => {
    showToast(t('settings.latestVersion'));
  };

  /**
   * 处理退出登录
   */
  const handleLogout = async () => {
    try {
      await showConfirmDialog({
        title: t('settings.logout'),
        message: t('settings.confirmLogout'),
      });

      localStorage.clear();
      showToast(t('settings.logoutSuccess'));

      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch {}
  };

  // ========================================
  // 生命周期
  // ========================================
  onMounted(() => {
    loadSettings();
  });
</script>

<style lang="less" scoped>
  .settings-page {
    min-height: 100%;
    background: var(--color-bg-primary);
  }

  .page-content {
    padding-top: calc(var(--spacing-sm) + env(safe-area-inset-top, 0px));
    padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom, 0px));
    display: flow-root;
  }
</style>
