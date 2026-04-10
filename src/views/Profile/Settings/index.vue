<template>
  <div class="settings-page">
    <!-- 个人信息 -->
    <section class="settings-section">
      <div class="section-title">个人信息</div>
      <van-cell-group inset>
        <van-cell title="头像" is-link @click="showAvatarPicker = true">
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
          title="昵称" 
          :value="userInfo.nickname"
          is-link 
          @click="showNicknameEdit = true"
        />
        
        <van-cell 
          title="用户ID" 
          :value="userInfo.userId"
          readonly
        />
      </van-cell-group>
    </section>

    <!-- 账号安全 -->
    <section class="settings-section">
      <div class="section-title">账号安全</div>
      <van-cell-group inset>
        <van-cell 
          title="绑定手机" 
          :value="userInfo.phone || '未绑定'"
          is-link 
          @click="handleBindPhone"
        >
          <template #right-icon>
            <van-tag v-if="!userInfo.phone" type="danger" size="medium">未绑定</van-tag>
          </template>
        </van-cell>
        
        <van-cell 
          title="修改密码" 
          is-link 
          @click="handleChangePassword"
        />
        
        <van-cell 
          title="登录设备管理" 
          is-link 
          @click="handleDeviceManage"
        />
      </van-cell-group>
    </section>

    <!-- 通知设置 -->
    <section class="settings-section">
      <div class="section-title">通知设置</div>
      <van-cell-group inset>
        <van-cell title="游戏结果通知">
          <template #right-icon>
            <van-switch v-model="settings.gameNotification" size="20" />
          </template>
        </van-cell>
        
        <van-cell title="签到提醒">
          <template #right-icon>
            <van-switch v-model="settings.checkinReminder" size="20" />
          </template>
        </van-cell>
        
        <van-cell title="系统消息">
          <template #right-icon>
            <van-switch v-model="settings.systemMessage" size="20" />
          </template>
        </van-cell>
      </van-cell-group>
    </section>

    <!-- 隐私设置 -->
    <section class="settings-section">
      <div class="section-title">隐私设置</div>
      <van-cell-group inset>
        <van-cell title="显示在线状态">
          <template #right-icon>
            <van-switch v-model="settings.showOnlineStatus" size="20" />
          </template>
        </van-cell>
        
        <van-cell title="允许陌生人查看战绩">
          <template #right-icon>
            <van-switch v-model="settings.allowViewRecords" size="20" />
          </template>
        </van-cell>
      </van-cell-group>
    </section>

    <!-- 其他设置 -->
    <section class="settings-section">
      <div class="section-title">其他</div>
      <van-cell-group inset>
        <van-cell 
          title="清除缓存" 
          :value="cacheSize"
          is-link 
          @click="handleClearCache"
        />
        
        <van-cell 
          title="检查更新" 
          :value="currentVersion"
          is-link 
          @click="handleCheckUpdate"
        />
        
        <van-cell 
          title="退出登录" 
          class="logout-cell"
          @click="handleLogout"
        />
      </van-cell-group>
    </section>

    <!-- 昵称编辑弹窗 -->
    <van-dialog
      v-model:show="showNicknameEdit"
      title="修改昵称"
      show-cancel-button
      @confirm="handleNicknameConfirm"
    >
      <van-field
        v-model="tempNickname"
        placeholder="请输入昵称"
        maxlength="20"
        show-word-limit
      />
    </van-dialog>

    <!-- 头像选择器 -->
    <van-action-sheet
      v-model:show="showAvatarPicker"
      :actions="avatarActions"
      @select="handleAvatarSelect"
      cancel-text="取消"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showConfirmDialog } from 'vant'
import { 
  CellGroup as VanCellGroup,
  Cell as VanCell,
  Image as VanImage,
  Tag as VanTag,
  Switch as VanSwitch,
  Field as VanField,
  Dialog as VanDialog,
  ActionSheet as VanActionSheet
} from 'vant'

// ========================================
// 路由实例
// ========================================
const router = useRouter()

// ========================================
// 响应式数据
// ========================================
const showNicknameEdit = ref(false)
const showAvatarPicker = ref(false)
const tempNickname = ref('')
const cacheSize = ref('12.5MB')
const currentVersion = ref('v1.0.0')

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
    showToast('昵称不能为空')
    return
  }
  
  userInfo.nickname = tempNickname.value.trim()
  showToast('昵称修改成功')
  
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
  showToast(`选择了${action.name}`)
  showAvatarPicker.value = false
  
  // TODO: 实现真实的头像上传逻辑
  setTimeout(() => {
    userInfo.avatar = defaultAvatar
    showToast('头像更新成功')
  }, 1000)
}

/**
 * 处理绑定手机
 */
const handleBindPhone = () => {
  showToast('绑定手机功能开发中')
}

/**
 * 处理修改密码
 */
const handleChangePassword = () => {
  showToast('修改密码功能开发中')
}

/**
 * 处理设备管理
 */
const handleDeviceManage = () => {
  showToast('设备管理功能开发中')
}

/**
 * 处理清除缓存
 */
const handleClearCache = async () => {
  try {
    await showConfirmDialog({
      title: '清除缓存',
      message: '确定要清除所有缓存数据吗？这将删除本地存储的游戏记录等数据。'
    })
    
    // 清除部分缓存（保留用户基本信息）
    localStorage.removeItem('gameRecords')
    localStorage.removeItem('pointsRecords')
    localStorage.removeItem('checkinRecords')
    
    cacheSize.value = '0MB'
    showToast('缓存清除成功')
  } catch (error) {
    // 用户取消操作
  }
}

/**
 * 处理检查更新
 */
const handleCheckUpdate = () => {
  showToast('当前已是最新版本')
}

/**
 * 处理退出登录
 */
const handleLogout = async () => {
  try {
    await showConfirmDialog({
      title: '退出登录',
      message: '确定要退出登录吗？'
    })
    
    // 清除所有用户数据
    localStorage.clear()
    
    showToast('已退出登录')
    
    // 跳转到首页
    setTimeout(() => {
      router.push('/')
    }, 1500)
  } catch (error) {
    // 用户取消操作
  }
}

// ========================================
// 监听器
// ========================================
import { watch } from 'vue'

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
</style>
