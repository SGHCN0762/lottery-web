# 认证模块说明

## 📁 目录结构

```
src/views/Auth/
├── Login/              # 登录页面
│   └── index.vue
├── Register/           # 注册页面
│   └── index.vue
└── README.md          # 本文档
```

## 🎯 功能特性

### 登录页面 (`/auth/login`)
- ✅ 手机号 + 密码登录
- ✅ 记住我功能（自动填充手机号）
- ✅ 表单验证（手机号格式、密码长度）
- ✅ 第三方登录入口（微信、QQ、微博）
- ✅ 忘记密码提示
- ✅ 跳转到注册页面

### 注册页面 (`/auth/register`)
- ✅ 手机号注册
- ✅ 短信验证码（60秒倒计时）
- ✅ 密码强度验证（6-20位）
- ✅ 确认密码验证
- ✅ 用户协议和隐私政策勾选
- ✅ 跳转到登录页面

## 🎨 设计规范

### 独立页面设计
**重要**：登录和注册页面是**独立全屏页面**，不使用Layout布局组件。

- ❌ **无顶部导航栏**（VanNavBar）
- ❌ **无底部标签栏**（VanTabbar）
- ❌ **无主题切换按钮**
- ✅ **完整的全屏背景**（夜空晨曦渐变）
- ✅ **独立的星光装饰动画**
- ✅ **自定义的安全区域处理**

### 视觉风格
- **背景**：夜空晨曦渐变 (`#1e3c72` → `#d4a574`)
- **卡片**：半透明白色 + 毛玻璃效果 (`backdrop-filter: blur(20px)`)
- **装饰**：星光闪烁动画（5颗星星，不同延迟）
- **Logo**：瑶光神域品牌标识，带浮动动画
- **按钮**：主题渐变色，带阴影和按压效果

### 交互设计
- 所有按钮都有按压反馈（`transform: scale(0.98)`）
- 链接点击有透明度变化
- Toast 提示分为成功、失败两种类型
- 加载状态显示 Loading 动画

## 🔧 技术实现

### 路由配置与Layout控制

在 `App.vue` 中通过计算属性判断是否为认证页面：

```javascript
const isAuthPage = computed(() => {
  return route.name === 'Login' || route.name === 'Register'
})
```

根据判断结果决定是否使用Layout：

```vue
<!-- 认证页面不使用 Layout -->
<router-view v-if="isAuthPage" />

<!-- 其他页面使用 Layout 布局 -->
<AppLayout v-else>
  <router-view />
</AppLayout>
```

### 数据持久化
```javascript
// 登录成功后保存
localStorage.setItem('token', mockToken)
localStorage.setItem('userInfo', JSON.stringify(mockUserInfo))

// 记住我功能
if (formData.rememberMe) {
  localStorage.setItem('rememberedPhone', formData.phone)
}

// 页面加载时读取
const rememberedPhone = localStorage.getItem('rememberedPhone')
```

### 表单验证
```javascript
// 手机号验证
const phoneRegex = /^1[3-9]\d{9}$/

// 密码长度验证
if (formData.password.length < 6) {
  showToast({ type: 'fail', message: '密码长度不能少于6位' })
}

// 自定义验证器（确认密码）
const validateConfirmPassword = (value) => {
  return value === formData.password
}
```

### 验证码倒计时
```javascript
const countdown = ref(0)
let timer = null

// 开始倒计时
countdown.value = 60
timer = setInterval(() => {
  countdown.value--
  if (countdown.value <= 0) {
    clearInterval(timer)
    timer = null
  }
}, 1000)

// 组件卸载时清除
onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})
```

## 🚀 路由配置

```javascript
{
  path: '/auth/login',
  name: 'Login',
  component: () => import('../views/Auth/Login/index.vue'),
  meta: {
    title: '登录',
    showBack: false,       // 不显示返回按钮
    showTabbar: false,     // 隐藏底部标签栏
    requiresAuth: false    // 不需要登录即可访问
  }
},
{
  path: '/auth/register',
  name: 'Register',
  component: () => import('../views/Auth/Register/index.vue'),
  meta: {
    title: '注册',
    showBack: false,
    showTabbar: false,
    requiresAuth: false
  }
}
```

## 📝 待完成事项（TODO）

### 后端接口集成
- [ ] 登录接口：`POST /api/auth/login`
- [ ] 注册接口：`POST /api/auth/register`
- [ ] 发送验证码接口：`POST /api/auth/send-code`
- [ ] 忘记密码接口：`POST /api/auth/forgot-password`

### 功能增强
- [ ] 图形验证码（防止机器注册）
- [ ] 邮箱注册/登录
- [ ] 第三方登录实际接入（微信、QQ、微博）
- [ ] 登录状态管理（Vuex/Pinia）
- [ ] Token 自动刷新机制
- [ ] 路由守卫（未登录跳转登录页）

### 安全优化
- [ ] 密码加密传输（RSA/AES）
- [ ] 防暴力破解（登录失败次数限制）
- [ ] XSS 防护
- [ ] CSRF 防护

## 🎭 使用示例

### 跳转到登录页
```javascript
import { useRouter } from 'vue-router'

const router = useRouter()
router.push({ name: 'Login' })
```

### 跳转到注册页
```javascript
router.push({ name: 'Register' })
```

### 登录后跳转
```javascript
// 登录成功后
localStorage.setItem('token', token)
localStorage.setItem('userInfo', JSON.stringify(userInfo))
router.push({ name: 'Home' })
```

### 检查登录状态
```javascript
const token = localStorage.getItem('token')
if (!token) {
  router.push({ name: 'Login' })
}
```

## 🌟 设计亮点

1. **独立全屏设计**：不使用Layout，完全自定义布局和样式
2. **中国风元素**：星光装饰、瑶光主题、北斗七星意象
3. **流畅动画**：星光闪烁、Logo浮动、按钮按压反馈
4. **毛玻璃效果**：半透明卡片 + backdrop-filter
5. **用户体验**：
   - 记住我功能
   - 验证码倒计时
   - 即时表单验证
   - 清晰的错误提示
6. **响应式设计**：适配各种屏幕尺寸和安全区域

## 📱 移动端适配

- ✅ 顶部安全区域：`padding-top: env(safe-area-inset-top, 0px)`
- ✅ 底部安全区域：自动适配
- ✅ 触摸反馈：`:active` 状态优化
- ✅ 字体大小：使用 CSS 变量统一管理

## 🔍 调试技巧

### 查看本地存储
```javascript
// 浏览器控制台
console.log(localStorage.getItem('token'))
console.log(JSON.parse(localStorage.getItem('userInfo')))
console.log(localStorage.getItem('rememberedPhone'))
```

### 清除登录状态
```javascript
localStorage.removeItem('token')
localStorage.removeItem('userInfo')
localStorage.removeItem('rememberedPhone')
```

## 📞 联系方式

如有问题或建议，请联系开发团队。
