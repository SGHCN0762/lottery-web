<template>
  <div class="settings-page">
    <!-- 个人信息 -->
    <section class="settings-section">
      <div class="section-title">{{ t('settings.personalInfo') }}</div>
      <van-cell-group inset>
        <van-cell :title="t('settings.avatar')" is-link @click="showAvatarPicker = true">
          <template #right-icon>
            <van-image
              round
              width="40"
              height="40"
              :src="userInfo.avatar || defaultAvatar"
            />
          </template>
        </van-cell>
        
        <van-cell 
          :title="t('settings.nickname')" 
          :value="userInfo.nickname"
          is-link 
          @click="showNicknameEdit = true"
        />
        
        <van-cell 
          :title="t('settings.userId')" 
          :value="userInfo.userId"
          readonly
        />
      </van-cell-group>
    </section>

    <!-- 账号安全 -->
    <section class="settings-section">
      <div class="section-title">{{ t('settings.accountSecurity') }}</div>
      <van-cell-group inset>
        <van-cell 
          :title="t('settings.bindPhone')" 
          :value="userInfo.phone || t('settings.notBound')"
          is-link 
          @click="handleBindPhone"
        >
          <template #right-icon>
            <van-tag v-if="!userInfo.phone" type="danger" size="medium">{{ t('settings.notBound') }}</van-tag>
          </template>
        </van-cell>
        
        <van-cell 
          :title="t('settings.changePassword')" 
          is-link 
          @click="handleChangePassword"
        />
        
        <van-cell 
          :title="t('settings.deviceManage')" 
          is-link 
          @click="handleDeviceManage"
        />
      </van-cell-group>
    </section>

    <!-- 通知设置 -->
    <section class="settings-section">
      <div class="section-title">{{ t('settings.notification') }}</div>
      <van-cell-group inset>
        <van-cell :title="t('settings.gameNotification')">
          <template #right-icon>
            <van-switch v-model="settings.gameNotification" size="20" />
          </template>
        </van-cell>
        
        <van-cell :title="t('settings.checkinReminder')">
          <template #right-icon>
            <van-switch v-model="settings.checkinReminder" size="20" />
          </template>
        </van-cell>
        
        <van-cell :title="t('settings.systemMessage')">
          <template #right-icon>
            <van-switch v-model="settings.systemMessage" size="20" />
          </template>
        </van-cell>
      </van-cell-group>
    </section>

    <!-- 隐私设置 -->
    <section class="settings-section">
      <div class="section-title">{{ t('settings.privacy') }}</div>
      <van-cell-group inset>
        <van-cell :title="t('settings.showOnlineStatus')">
          <template #right-icon>
            <van-switch v-model="settings.showOnlineStatus" size="20" />
          </template>
        </van-cell>
        
        <van-cell :title="t('settings.allowViewRecords')">
          <template #right-icon>
            <van-switch v-model="settings.allowViewRecords" size="20" />
          </template>
        </van-cell>
      </van-cell-group>
    </section>

    <!-- 语言设置 -->
    <section class="settings-section">
      <div class="section-title">{{ t('settings.language') }}</div>
      <van-cell-group inset>
        <van-cell 
          :title="t('settings.currentLanguage')" 
          :value="currentLanguageName"
          is-link 
          @click="showLanguagePicker = true"
        />
      </van-cell-group>
    </section>

    <!-- 主题设置 -->
    <section class="settings-section">
      <div class="section-title">{{ t('settings.theme') }}</div>
      <van-cell-group inset>
        <van-cell 
          :title="t('settings.currentTheme')" 
          :value="currentThemeName"
          is-link 
          @click="showThemePicker = true"
        />
      </van-cell-group>
    </section>

    <!-- 其他设置 -->
    <section class="settings-section">
      <div class="section-title">{{ t('settings.others') }}</div>
      <van-cell-group inset>
        <van-cell 
          :title="t('settings.clearCache')" 
          :value="cacheSize"
          is-link 
          @click="handleClearCache"
        />
        
        <van-cell 
          :title="t('settings.checkUpdate')" 
          :value="currentVersion"
          is-link 
          @click="handleCheckUpdate"
        />
        
        <van-cell 
          :title="t('settings.logout')" 
          class="logout-cell"
          @click="handleLogout"
        />
      </van-cell-group>
    </section>

    <!-- 昵称编辑弹窗 -->
    <van-dialog
      v-model:show="showNicknameEdit"
      :title="t('settings.changeNickname')"
      show-cancel-button
      @confirm="handleNicknameConfirm"
    >
      <van-field
        v-model="tempNickname"
        :placeholder="t('settings.nicknamePlaceholder')"
        maxlength="20"
        show-word-limit
      />
    </van-dialog>

    <!-- 头像选择器 -->
    <van-action-sheet
      v-model:show="showAvatarPicker"
      :actions="avatarActions"
      @select="handleAvatarSelect"
      :cancel-text="t('common.cancel')"
    />

    <!-- 语言选择器 -->
    <van-action-sheet
      v-model:show="showLanguagePicker"
      :actions="languageOptions"
      @select="handleLanguageSelect"
      :cancel-text="t('common.cancel')"
      :description="t('language.selectLanguage')"
    />

    <!-- 主题选择器 -->
    <van-action-sheet
      v-model:show="showThemePicker"
      :actions="themeOptions"
      @select="handleThemeSelect"
      :cancel-text="t('common.cancel')"
      :description="t('theme.selectTheme')"
    />

    <!-- 隐藏的文件输入框 -->
    <input
      ref="fileInputRef"
      type="file"
      accept="image/*"
      :capture="captureType"
      style="display: none"
      @change="handleFileChange"
    />

    <!-- 头像裁剪弹窗 -->
    <van-popup
      v-model:show="showCropper"
      position="bottom"
      :style="{ height: '80%' }"
      round
      closeable
    >
      <div class="cropper-popup">
        <div class="popup-header">
          <h3>{{ t('settings.adjustAvatar') }}</h3>
        </div>
        
        <div class="cropper-container">
          <div class="preview-area">
            <div class="preview-circle">
              <img 
                v-if="tempImage" 
                :src="tempImage" 
                alt="预览"
                :style="imageStyle"
              />
            </div>
          </div>
          
          <div class="adjust-controls">
            <div class="control-item">
              <span>{{ t('settings.scale') }}</span>
              <van-slider 
                v-model="scale" 
                :min="0.5" 
                :max="2" 
                :step="0.1"
                @change="handleScaleChange"
              />
            </div>
            
            <div class="control-item">
              <span>{{ t('settings.rotate') }}</span>
              <van-slider 
                v-model="rotate" 
                :min="0" 
                :max="360" 
                :step="1"
                @change="handleRotateChange"
              />
            </div>
          </div>
        </div>
        
        <div class="popup-footer">
          <van-button plain round @click="cancelCropper">
            {{ t('common.cancel') }}
          </van-button>
          <van-button type="primary" round @click="confirmAvatar">
            {{ t('common.confirm') }}
          </van-button>
        </div>
      </div>
    </van-popup>

    <!-- 绑定手机弹窗 -->
    <van-popup
      v-model:show="showBindPhone"
      position="bottom"
      :style="{ height: '60%' }"
      round
      closeable
    >
      <div class="bind-phone-popup">
        <div class="popup-header">
          <h3>{{ userInfo.phone ? '更换手机号' : '绑定手机号' }}</h3>
        </div>
        
        <div class="form-content">
          <van-form @submit="handleBindPhoneSubmit">
            <van-cell-group inset>
              <van-field
                v-model="phoneForm.phone"
                name="phone"
                label="手机号"
                placeholder="请输入手机号"
                type="tel"
                maxlength="11"
                :rules="[
                  { required: true, message: '请输入手机号' },
                  { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
                ]"
              />
              
              <van-field
                v-model="phoneForm.code"
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
                    @click="sendVerificationCode"
                  >
                    {{ countdown > 0 ? `${countdown}${t('settings.second')}` : t('settings.getCode') }}
                  </van-button>
                </template>
              </van-field>
            </van-cell-group>
            
            <div class="submit-btn">
              <van-button round block type="primary" native-type="submit" :loading="phoneSubmitting">
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

    <!-- 修改密码弹窗 -->
    <van-popup
      v-model:show="showChangePassword"
      position="bottom"
      :style="{ height: '65%' }"
      round
      closeable
    >
      <div class="change-password-popup">
        <div class="popup-header">
          <h3>{{ t('settings.passwordChangeTitle') }}</h3>
        </div>
        
        <div class="form-content">
          <van-form @submit="handleChangePasswordSubmit">
            <van-cell-group inset>
              <van-field
                v-model="passwordForm.oldPassword"
                name="oldPassword"
                :label="t('settings.oldPassword')"
                :placeholder="t('settings.oldPasswordPlaceholder')"
                type="password"
                :rules="[{ required: true, message: t('settings.oldPasswordRequired') }]"
              />
              
              <van-field
                v-model="passwordForm.newPassword"
                name="newPassword"
                :label="t('settings.newPassword')"
                :placeholder="t('settings.newPasswordPlaceholder')"
                type="password"
                maxlength="20"
                :rules="[
                  { required: true, message: t('settings.newPasswordRequired') },
                  { pattern: /^.{6,20}$/, message: t('settings.passwordLengthRule') }
                ]"
              />
              
              <van-field
                v-model="passwordForm.confirmPassword"
                name="confirmPassword"
                :label="t('settings.confirmPassword')"
                :placeholder="t('settings.confirmPasswordPlaceholder')"
                type="password"
                :rules="[
                  { required: true, message: t('settings.confirmPasswordRequired') },
                  { validator: validateConfirmPassword, message: t('settings.passwordMismatch') }
                ]"
              />
            </van-cell-group>
            
            <div class="submit-btn">
              <van-button round block type="primary" native-type="submit" :loading="passwordSubmitting">
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

    <!-- 登录设备管理弹窗 -->
    <van-popup
      v-model:show="showDeviceManage"
      position="bottom"
      :style="{ height: '75%' }"
      round
      closeable
    >
      <div class="device-manage-popup">
        <div class="popup-header">
          <h3>{{ t('settings.deviceManageTitle') }}</h3>
          <p class="subtitle">{{ t('settings.totalDevices', { count: deviceList.length }) }}</p>
        </div>
        
        <div class="device-list">
          <van-empty 
            v-if="deviceList.length === 0" 
            :description="t('settings.noDevices')"
            image="search"
          />
          
          <div 
            v-for="(device, index) in deviceList" 
            :key="device.id"
            class="device-item"
            :class="{ 'current-device': device.isCurrent }"
          >
            <div class="device-info">
              <div class="device-icon">
                <van-icon 
                  :name="getDeviceIcon(device.type)" 
                  size="32" 
                  :color="device.isCurrent ? 'var(--color-primary)' : '#999'"
                />
              </div>
              
              <div class="device-details">
                <div class="device-name">
                  {{ device.name }}
                  <van-tag v-if="device.isCurrent" type="primary" size="mini" round>{{ t('settings.currentDevice') }}</van-tag>
                  <van-tag v-if="device.isTrusted" type="success" size="mini" round>{{ t('settings.trustedDevice') }}</van-tag>
                </div>
                
                <div class="device-meta">
                  <span class="meta-item">
                    <van-icon name="location-o" size="12" />
                    {{ device.location || t('settings.unknownLocation') }}
                  </span>
                  <span class="meta-item">
                    <van-icon name="clock-o" size="12" />
                    {{ formatDeviceTime(device.lastLogin) }}
                  </span>
                </div>
                
                <div class="device-ip">
                  IP: {{ device.ip }}
                </div>
              </div>
            </div>
            
            <div class="device-actions" v-if="!device.isCurrent">
              <van-button 
                size="mini" 
                plain 
                type="primary"
                @click="toggleTrustDevice(device)"
              >
                {{ device.isTrusted ? t('settings.untrust') : t('settings.trust') }}
              </van-button>
              
              <van-button 
                size="mini" 
                type="danger"
                plain
                @click="removeDevice(device)"
              >
                {{ t('settings.removeDevice') }}
              </van-button>
            </div>
          </div>
        </div>
        
        <div class="device-footer">
          <van-button 
            block 
            round 
            type="danger"
            @click="removeAllDevices"
          >
            {{ t('settings.removeAllDevices') }}
          </van-button>
          
          <div class="footer-tips">
            <van-icon name="info-o" size="14" />
            <span>{{ t('settings.removeDeviceTip') }}</span>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { showToast, showConfirmDialog } from 'vant'
import { useThemeStore } from '@/stores/theme'
import { 
  CellGroup as VanCellGroup,
  Cell as VanCell,
  Image as VanImage,
  Tag as VanTag,
  Switch as VanSwitch,
  Field as VanField,
  Dialog as VanDialog,
  ActionSheet as VanActionSheet,
  Popup as VanPopup,
  Button as VanButton,
  Slider as VanSlider
} from 'vant'
import { SUPPORTED_LOCALES, switchLanguage, getCurrentLocale } from '@/i18n'

// ========================================
// i18n
// ========================================
const { t } = useI18n()

// ========================================
// 主题 Store
// ========================================
const themeStore = useThemeStore()

// ========================================
// 路由实例
// ========================================
const router = useRouter()

// ========================================
// 响应式数据
// ========================================
const showNicknameEdit = ref(false)
const showAvatarPicker = ref(false)
const showCropper = ref(false)
const showBindPhone = ref(false)
const showChangePassword = ref(false)
const showDeviceManage = ref(false)
const showLanguagePicker = ref(false)
const showThemePicker = ref(false)
const tempNickname = ref('')
const cacheSize = ref('12.5MB')
const currentVersion = ref('v1.0.0')
const fileInputRef = ref(null)
const captureType = ref('')
const tempImage = ref('')
const scale = ref(1)
const rotate = ref(0)
const countdown = ref(0)
const phoneSubmitting = ref(false)
const passwordSubmitting = ref(false)

// 手机号表单
const phoneForm = reactive({
  phone: '',
  code: ''
})

// 密码表单
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 设备列表
const deviceList = ref([])

// 默认头像
const defaultAvatar = 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'

// 用户信息
const userInfo = reactive({
  userId: '10086',
  nickname: '娱乐达人',
  avatar: '',
  phone: ''
})

// 设置项
const settings = reactive({
  gameNotification: true,
  checkinReminder: true,
  systemMessage: true,
  showOnlineStatus: false,
  allowViewRecords: false
})

// 头像选择操作
const avatarActions = [
  { name: '拍照', value: 'camera' },
  { name: '从相册选择', value: 'album' }
]

// ========================================
// 计算属性
// ========================================

/**
 * 图片样式（缩放和旋转）
 */
const imageStyle = computed(() => {
  return {
    transform: `scale(${scale.value}) rotate(${rotate.value}deg)`,
    transition: 'transform 0.3s ease'
  }
})

/**
 * 语言选项列表
 */
const languageOptions = computed(() => 
  SUPPORTED_LOCALES.map(locale => ({
    name: `${locale.flag} ${t(`language.${locale.code.replace('-', '')}`)}`,
    value: locale.code
  }))
)

/**
 * 当前语言名称
 */
const currentLanguageName = computed(() => {
  const locale = getCurrentLocale()
  const lang = SUPPORTED_LOCALES.find(l => l.code === locale)
  return lang ? t(`language.${lang.code.replace('-', '')}`) : t('language.zhCN')
})

/**
 * 当前语言国旗
 */
const currentLanguageFlag = computed(() => {
  const locale = getCurrentLocale()
  const lang = SUPPORTED_LOCALES.find(l => l.code === locale)
  return lang ? lang.flag : '🇨'
})

/**
 * 当前主题名称
 */
const currentThemeName = computed(() => {
  const mode = themeStore.themeMode
  return t(`theme.${mode}`)
})

/**
 * 当前主题图标
 */
const currentThemeIcon = computed(() => {
  const mode = themeStore.themeMode
  const icons = {
    light: '☀️',
    dark: '🌙',
    auto: '⚙️'
  }
  return icons[mode] || '☀️'
})

/**
 * 主题选项列表
 */
const themeOptions = computed(() => [
  { name: t('theme.light'), value: "light" },
  { name: t('theme.dark'), value: "dark" },
  { name: t('theme.auto'), value: "auto" },
]);


// ========================================
// 工具函数
// ========================================

/**
 * 加载用户设置
 */
const loadSettings = () => {
  const storedUserInfo = localStorage.getItem('userInfo')
  if (storedUserInfo) {
    const user = JSON.parse(storedUserInfo)
    Object.assign(userInfo, {
      userId: user.id || '10086',
      nickname: user.name || '娱乐达人',
      avatar: user.avatar || '',
      phone: user.phone || ''
    })
  }

  const storedSettings = localStorage.getItem('userSettings')
  if (storedSettings) {
    Object.assign(settings, JSON.parse(storedSettings))
  }
  
  tempNickname.value = userInfo.nickname
}

/**
 * 保存设置
 */
const saveSettings = () => {
  localStorage.setItem('userSettings', JSON.stringify(settings))
}

/**
 * 处理昵称确认
 */
const handleNicknameConfirm = () => {
  if (!tempNickname.value.trim()) {
    showToast(t('settings.nicknameEmpty'))
    return
  }
  
  userInfo.nickname = tempNickname.value.trim()
  showToast(t('settings.nicknameSuccess'))
  
  // 保存到 localStorage
  const userInfoData = {
    id: userInfo.userId,
    name: userInfo.nickname,
    avatar: userInfo.avatar,
    phone: userInfo.phone
  }
  localStorage.setItem('userInfo', JSON.stringify(userInfoData))
}

/**
 * 处理头像选择
 */
const handleAvatarSelect = (action) => {
  showAvatarPicker.value = false
  
  // 设置捕获类型
  if (action.value === 'camera') {
    captureType.value = 'camera'  // 拍照
  } else {
    captureType.value = ''  // 相册
  }
  
  // 触发文件选择
  setTimeout(() => {
    fileInputRef.value?.click()
  }, 300)
}

/**
 * 处理文件变化
 */
const handleFileChange = (event) => {
  const file = event.target.files?.[0]
  if (!file) return
  
  // 验证文件类型
  if (!file.type.startsWith('image/')) {
    showToast({ type: 'fail', message: t('settings.invalidImageFile') })
    return
  }
  
  // 验证文件大小（限制5MB）
  if (file.size > 5 * 1024 * 1024) {
    showToast({ type: 'fail', message: t('settings.imageTooLarge') })
    return
  }
  
  // 读取文件并显示裁剪界面
  const reader = new FileReader()
  reader.onload = (e) => {
    tempImage.value = e.target?.result
    scale.value = 1
    rotate.value = 0
    showCropper.value = true
  }
  reader.readAsDataURL(file)
  
  // 清空input，允许重复选择同一文件
  event.target.value = ''
}

/**
 * 处理缩放变化
 */
const handleScaleChange = (value) => {
  scale.value = value
}

/**
 * 处理旋转变化
 */
const handleRotateChange = (value) => {
  rotate.value = value
}

/**
 * 取消裁剪
 */
const cancelCropper = () => {
  showCropper.value = false
  tempImage.value = ''
  scale.value = 1
  rotate.value = 0
}

/**
 * 确认头像
 */
const confirmAvatar = () => {
  if (!tempImage.value) {
    showToast(t('settings.selectImageFirst'))
    return
  }
  
  // 创建canvas进行裁剪
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const img = new Image()
  
  img.onload = () => {
    // 设置canvas尺寸为正方形（200x200）
    const size = 200
    canvas.width = size
    canvas.height = size
    
    // 计算绘制参数
    const minDim = Math.min(img.width, img.height)
    const scaleRatio = size / minDim * scale.value
    
    // 清空canvas
    ctx.clearRect(0, 0, size, size)
    
    // 保存状态
    ctx.save()
    
    // 移动到中心点
    ctx.translate(size / 2, size / 2)
    
    // 旋转
    ctx.rotate((rotate.value * Math.PI) / 180)
    
    // 绘制图片（居中裁剪）
    const drawWidth = img.width * scaleRatio
    const drawHeight = img.height * scaleRatio
    ctx.drawImage(
      img,
      -drawWidth / 2,
      -drawHeight / 2,
      drawWidth,
      drawHeight
    )
    
    // 恢复状态
    ctx.restore()
    
    // 转换为base64
    const base64 = canvas.toDataURL('image/jpeg', 0.8)
    
    // 更新头像
    userInfo.avatar = base64
    
    // 保存到localStorage
    saveUserInfo()
    
    // 关闭弹窗
    showCropper.value = false
    tempImage.value = ''
    scale.value = 1
    rotate.value = 0
    
    showToast({ type: 'success', message: t('settings.avatarSuccess') })
  }
  
  img.src = tempImage.value
}

/**
 * 保存用户信息
 */
const saveUserInfo = () => {
  const userInfoData = {
    id: userInfo.userId,
    name: userInfo.nickname,
    avatar: userInfo.avatar,
    phone: userInfo.phone
  }
  localStorage.setItem('userInfo', JSON.stringify(userInfoData))
}

/**
 * 处理绑定手机
 */
const handleBindPhone = () => {
  // 如果已绑定，显示当前手机号
  if (userInfo.phone) {
    phoneForm.phone = userInfo.phone
  } else {
    phoneForm.phone = ''
  }
  phoneForm.code = ''
  showBindPhone.value = true
}

/**
 * 发送验证码
 */
const sendVerificationCode = async () => {
  // 验证手机号
  if (!/^1[3-9]\d{9}$/.test(phoneForm.phone)) {
    showToast({ type: 'fail', message: t('settings.invalidPhone') })
    return
  }
  
  // 模拟发送验证码
  showToast({ type: 'success', message: t('settings.codeSent') })
  
  // 开始倒计时
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

/**
 * 提交绑定手机
 */
const handleBindPhoneSubmit = async () => {
  // 验证手机号
  if (!/^1[3-9]\d{9}$/.test(phoneForm.phone)) {
    showToast({ type: 'fail', message: t('settings.invalidPhone') })
    return
  }
  
  // 验证验证码（测试用：123456）
  if (phoneForm.code !== '123456') {
    showToast({ type: 'fail', message: t('settings.codeError') })
    return
  }
  
  phoneSubmitting.value = true
  
  // 模拟提交延迟
  setTimeout(() => {
    // 更新用户信息
    userInfo.phone = phoneForm.phone
    
    // 保存到localStorage
    saveUserInfo()
    
    phoneSubmitting.value = false
    showBindPhone.value = false
    
    // 重置表单
    phoneForm.phone = ''
    phoneForm.code = ''
    countdown.value = 0
    
    showToast({ 
      type: 'success', 
      message: userInfo.phone ? t('settings.phoneChanged') : t('settings.phoneBound') 
    })
  }, 1500)
}

/**
 * 处理修改密码
 */
const handleChangePassword = () => {
  // 重置表单
  passwordForm.oldPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
  showChangePassword.value = true
}

/**
 * 验证确认密码
 */
const validateConfirmPassword = (value) => {
  return value === passwordForm.newPassword
}

/**
 * 提交修改密码
 */
const handleChangePasswordSubmit = async () => {
  // 验证原密码（测试用：123456）
  if (passwordForm.oldPassword !== '123456') {
    showToast({ type: 'fail', message: t('settings.oldPasswordError') })
    return
  }
  
  // 验证新密码长度
  if (passwordForm.newPassword.length < 6 || passwordForm.newPassword.length > 20) {
    showToast({ type: 'fail', message: t('settings.passwordLength') })
    return
  }
  
  // 验证两次密码是否一致
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    showToast({ type: 'fail', message: t('settings.passwordMismatch') })
    return
  }
  
  // 验证新密码不能与原密码相同
  if (passwordForm.newPassword === passwordForm.oldPassword) {
    showToast({ type: 'fail', message: t('settings.samePassword') })
    return
  }
  
  passwordSubmitting.value = true
  
  // 模拟提交延迟
  setTimeout(() => {
    passwordSubmitting.value = false
    showChangePassword.value = false
    
    // 重置表单
    passwordForm.oldPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
    
    showToast({ 
      type: 'success', 
      message: t('settings.passwordChanged') 
    })
  }, 1500)
}

/**
 * 处理设备管理
 */
const handleDeviceManage = () => {
  // 加载设备列表
  loadDeviceList()
  showDeviceManage.value = true
}

/**
 * 加载设备列表
 */
const loadDeviceList = () => {
  const storedDevices = localStorage.getItem('loginDevices')
  
  if (storedDevices) {
    try {
      const parsedDevices = JSON.parse(storedDevices)
      // 如果解析后是空数组，初始化模拟数据
      if (Array.isArray(parsedDevices) && parsedDevices.length > 0) {
        deviceList.value = parsedDevices
      } else {
        // 初始化模拟数据
        deviceList.value = [
          {
            id: 1,
            name: 'iPhone 14 Pro',
            type: 'mobile',
            location: '北京',
            ip: '192.168.1.100',
            lastLogin: Date.now(),
            isCurrent: true,
            isTrusted: true
          },
          {
            id: 2,
            name: 'MacBook Pro',
            type: 'desktop',
            location: '上海',
            ip: '192.168.1.101',
            lastLogin: Date.now() - 86400000, // 1天前
            isCurrent: false,
            isTrusted: true
          },
          {
            id: 3,
            name: 'iPad Air',
            type: 'tablet',
            location: '广州',
            ip: '192.168.1.102',
            lastLogin: Date.now() - 259200000, // 3天前
            isCurrent: false,
            isTrusted: false
          }
        ]
        saveDeviceList()
      }
    } catch (error) {
      // 解析失败，初始化模拟数据
      deviceList.value = [
        {
          id: 1,
          name: 'iPhone 14 Pro',
          type: 'mobile',
          location: '北京',
          ip: '192.168.1.100',
          lastLogin: Date.now(),
          isCurrent: true,
          isTrusted: true
        },
        {
          id: 2,
          name: 'MacBook Pro',
          type: 'desktop',
          location: '上海',
          ip: '192.168.1.101',
          lastLogin: Date.now() - 86400000, // 1天前
          isCurrent: false,
          isTrusted: true
        },
        {
          id: 3,
          name: 'iPad Air',
          type: 'tablet',
          location: '广州',
          ip: '192.168.1.102',
          lastLogin: Date.now() - 259200000, // 3天前
          isCurrent: false,
          isTrusted: false
        }
      ]
      saveDeviceList()
    }
  } else {
    // 初始化模拟数据
    deviceList.value = [
      {
        id: 1,
        name: 'iPhone 14 Pro',
        type: 'mobile',
        location: '北京',
        ip: '192.168.1.100',
        lastLogin: Date.now(),
        isCurrent: true,
        isTrusted: true
      },
      {
        id: 2,
        name: 'MacBook Pro',
        type: 'desktop',
        location: '上海',
        ip: '192.168.1.101',
        lastLogin: Date.now() - 86400000, // 1天前
        isCurrent: false,
        isTrusted: true
      },
      {
        id: 3,
        name: 'iPad Air',
        type: 'tablet',
        location: '广州',
        ip: '192.168.1.102',
        lastLogin: Date.now() - 259200000, // 3天前
        isCurrent: false,
        isTrusted: false
      }
    ]
    saveDeviceList()
  }
}

/**
 * 保存设备列表
 */
const saveDeviceList = () => {
  localStorage.setItem('loginDevices', JSON.stringify(deviceList.value))
}

/**
 * 获取设备图标
 */
const getDeviceIcon = (type) => {
  const iconMap = {
    mobile: 'phone-o',
    tablet: 'pad',
    desktop: 'desktop-o'
  }
  return iconMap[type] || 'cluster-o'
}

/**
 * 格式化设备登录时间
 */
const formatDeviceTime = (timestamp) => {
  const now = Date.now()
  const diff = now - timestamp
  
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  
  if (diff < minute) {
    return t('settings.justNow')
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)}${t('settings.minutesAgo')}`
  } else if (diff < day) {
    return `${Math.floor(diff / hour)}${t('settings.hoursAgo')}`
  } else {
    return `${Math.floor(diff / day)}${t('settings.daysAgo')}`
  }
}

/**
 * 切换设备信任状态
 */
const toggleTrustDevice = async (device) => {
  try {
    await showConfirmDialog({
      title: device.isTrusted ? t('settings.untrustDevice') : t('settings.trustDevice'),
      message: device.isTrusted 
        ? t('settings.untrustConfirm').replace('{device}', device.name)
        : t('settings.trustConfirm').replace('{device}', device.name),
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel')
    })
    
    device.isTrusted = !device.isTrusted
    saveDeviceList()
    
    showToast({
      type: 'success',
      message: device.isTrusted ? t('settings.trusted') : t('settings.untrusted')
    })
  } catch (error) {
    // 用户取消
  }
}

/**
 * 移除单个设备
 */
const removeDevice = async (device) => {
  try {
    await showConfirmDialog({
      title: t('settings.removeDeviceTitle'),
      message: t('settings.removeDeviceMessage').replace('{device}', device.name),
      confirmButtonText: t('settings.confirmRemove'),
      cancelButtonText: t('common.cancel')
    })
    
    deviceList.value = deviceList.value.filter(d => d.id !== device.id)
    saveDeviceList()
    
    showToast({
      type: 'success',
      message: t('settings.deviceRemoved')
    })
  } catch (error) {
    // 用户取消
  }
}

/**
 * 移除所有其他设备
 */
const removeAllDevices = async () => {
  const otherDevices = deviceList.value.filter(d => !d.isCurrent)
  
  if (otherDevices.length === 0) {
    showToast(t('settings.noOtherDevices'))
    return
  }
  
  try {
    await showConfirmDialog({
      title: t('settings.removeAllDevicesTitle'),
      message: t('settings.removeAllDevicesMessage').replace('{count}', otherDevices.length),
      confirmButtonText: t('settings.confirmRemove'),
      cancelButtonText: t('common.cancel'),
      confirmButtonColor: '#ff4d4f'
    })
    
    deviceList.value = deviceList.value.filter(d => d.isCurrent)
    saveDeviceList()
    
    showToast({
      type: 'success',
      message: t('settings.allDevicesRemoved')
    })
  } catch (error) {
    // 用户取消
  }
}

/**
 * 处理清除缓存
 */
const handleClearCache = async () => {
  try {
    await showConfirmDialog({
      title: t('settings.cacheClearTitle'),
      message: t('settings.cacheClearMessage')
    })
    
    // 清除部分缓存（保留用户基本信息）
    localStorage.removeItem('gameRecords')
    localStorage.removeItem('pointsRecords')
    localStorage.removeItem('checkinRecords')
    
    cacheSize.value = '0MB'
    showToast(t('settings.cacheCleared'))
  } catch (error) {
    // 用户取消操作
  }
}

/**
 * 处理检查更新
 */
const handleCheckUpdate = () => {
  showToast(t('settings.latestVersion'))
}

/**
 * 处理退出登录
 */
const handleLogout = async () => {
  try {
    await showConfirmDialog({
      title: t('settings.logout'),
      message: t('settings.confirmLogout')
    })
    
    // 清除所有用户数据
    localStorage.clear()
    
    showToast(t('settings.logoutSuccess'))
    
    // 跳转到首页
    setTimeout(() => {
      router.push('/')
    }, 1500)
  } catch (error) {
    // 用户取消操作
  }
}

/**
 * 处理语言选择
 */
const handleLanguageSelect = (action) => {
  showLanguagePicker.value = false
  switchLanguage(action.value)
}

/**
 * 处理主题选择
 */
const handleThemeSelect = (action) => {
  showThemePicker.value = false
  themeStore.setThemeMode(action.value)
  showToast(t('common.success'))
}

// ========================================
// 监听器
// ========================================

watch(settings, () => {
  saveSettings()
}, { deep: true })

// ========================================
// 生命周期
// ========================================
onMounted(() => {
  loadSettings()
})
</script>

<style lang="less" scoped>
.settings-page {
  min-height: 100%;
  background: var(--color-bg-primary);
  padding-bottom: var(--spacing-xl);
}

/* ========================================
   设置区块
   ======================================== */
.settings-section {
  margin-bottom: var(--spacing-lg);

  .section-title {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin: var(--spacing-lg) var(--spacing-md) var(--spacing-md);
    font-weight: var(--font-weight-medium);
  }
}

/* ========================================
   退出登录按钮样式
   ======================================== */
.logout-cell {
  :deep(.van-cell__title) {
    color: var(--color-danger);
    text-align: center;
  }
}

/* ========================================
   头像裁剪弹窗
   ======================================== */
.cropper-popup {
  height: 100%;
  display: flex;
  flex-direction: column;

  .popup-header {
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);

    h3 {
      margin: 0;
      font-size: var(--font-size-lg);
      color: var(--color-text-primary);
      text-align: center;
    }
  }

  .cropper-container {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-lg);

    .preview-area {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: var(--spacing-xl);

      .preview-circle {
        width: 180px;
        height: 180px;
        border-radius: var(--radius-full);
        overflow: hidden;
        border: 3px solid var(--color-primary);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        background: var(--color-bg-tertiary);

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      }
    }

    .adjust-controls {
      .control-item {
        margin-bottom: var(--spacing-lg);

        span {
          display: block;
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--spacing-sm);
        }

        :deep(.van-slider) {
          margin: 0 var(--spacing-md);
        }
      }
    }
  }

  .popup-footer {
    padding: var(--spacing-lg);
    border-top: 1px solid var(--color-border);
    display: flex;
    gap: var(--spacing-md);

    .van-button {
      flex: 1;
    }
  }
}

/* ========================================
   绑定手机和修改密码弹窗通用样式
   ======================================== */
.bind-phone-popup,
.change-password-popup {
  height: 100%;
  display: flex;
  flex-direction: column;

  .popup-header {
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);

    h3 {
      margin: 0;
      font-size: var(--font-size-lg);
      color: var(--color-text-primary);
      text-align: center;
    }
  }

  .form-content {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-lg);

    .submit-btn {
      margin-top: var(--spacing-xl);
      padding: 0 var(--spacing-md);
    }

    .tips {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
      margin-top: var(--spacing-lg);
      padding: var(--spacing-md);
      background: rgba(0, 122, 255, 0.05);
      border-radius: var(--radius-sm);
      justify-content: center;

      .van-icon {
        color: var(--color-primary);
      }
    }
  }
}

/* ========================================
   登录设备管理弹窗
   ======================================== */
.device-manage-popup {
  height: 100%;
  display: flex;
  flex-direction: column;

  .popup-header {
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);
    text-align: center;

    h3 {
      margin: 0 0 var(--spacing-xs) 0;
      font-size: var(--font-size-lg);
      color: var(--color-text-primary);
    }

    .subtitle {
      margin: 0;
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
    }
  }

  .device-list {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-md);

    .device-item {
      background: var(--color-bg-card);
      border-radius: var(--radius-md);
      padding: var(--spacing-md);
      margin-bottom: var(--spacing-md);
      box-shadow: var(--shadow-card);
      transition: all var(--transition-fast);

      &.current-device {
        border: 2px solid var(--color-primary);
        background: linear-gradient(135deg, rgba(0, 122, 255, 0.05), rgba(0, 122, 255, 0.02));
      }

      &:active {
        transform: scale(0.98);
      }

      .device-info {
        display: flex;
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-md);

        .device-icon {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-bg-tertiary);
          border-radius: var(--radius-md);
        }

        .device-details {
          flex: 1;
          min-width: 0;

          .device-name {
            display: flex;
            align-items: center;
            gap: var(--spacing-xs);
            font-size: var(--font-size-base);
            font-weight: var(--font-weight-semibold);
            color: var(--color-text-primary);
            margin-bottom: var(--spacing-xs);
            flex-wrap: wrap;

            .van-tag {
              flex-shrink: 0;
            }
          }

          .device-meta {
            display: flex;
            gap: var(--spacing-md);
            margin-bottom: var(--spacing-xs);
            flex-wrap: wrap;

            .meta-item {
              display: flex;
              align-items: center;
              gap: var(--spacing-xs);
              font-size: var(--font-size-xs);
              color: var(--color-text-secondary);

              .van-icon {
                flex-shrink: 0;
              }
            }
          }

          .device-ip {
            font-size: var(--font-size-xs);
            color: var(--color-text-tertiary);
            font-family: 'Courier New', monospace;
          }
        }
      }

      .device-actions {
        display: flex;
        gap: var(--spacing-sm);
        padding-top: var(--spacing-md);
        border-top: 1px dashed var(--color-border);

        .van-button {
          flex: 1;
          height: 32px;
          font-size: 12px;
          border-radius: 4px;
        }
      }
    }
  }

  .device-footer {
    padding: var(--spacing-lg);
    border-top: 1px solid var(--color-border);

    .footer-tips {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-xs);
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
      margin-top: var(--spacing-md);

      .van-icon {
        color: var(--color-warning);
      }
    }
  }
}
</style>