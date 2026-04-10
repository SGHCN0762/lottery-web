# 个人中心模块文档

## 📁 目录结构

```
src/views/Profile/
├── index.vue              # 个人中心主页
├── Records/               # 游戏记录
│   └── index.vue
├── Points/                # 积分明细
│   └── index.vue
├── Settings/              # 账户设置
│   └── index.vue
├── Help/                  # 帮助中心
│   └── index.vue
├── Exchange/              # 积分兑换
│   └── index.vue
├── Badges/                # 我的成就
│   └── index.vue
└── Invite/                # 邀请好友
    └── index.vue
```

## 🎯 功能列表

### 1. 游戏记录 (`/profile/records`)
- **功能描述**：展示用户所有游戏的参与记录
- **主要特性**：
  - 按游戏类型筛选（全部、数字猜猜猜、幸运转盘、答题挑战、每日签到）
  - 按时间范围筛选（最近7天、30天、全部）
  - 统计总场次、胜率、总积分
  - 显示每条记录的详细信息（时间、结果、积分变化）
  - 支持分页加载

### 2. 积分明细 (`/profile/points`)
- **功能描述**：展示用户积分的收支明细
- **主要特性**：
  - 显示当前可用积分
  - 统计本月收入和支出
  - 按类型筛选（全部、收入、支出）
  - 详细的积分变动记录（类型、描述、时间、金额）
  - 收入用绿色标识，支出用红色标识

### 3. 账户设置 (`/profile/settings`)
- **功能描述**：管理用户的个人信息和系统设置
- **主要特性**：
  - **个人信息**：修改头像、昵称，查看用户ID
  - **账号安全**：绑定手机、修改密码、设备管理
  - **通知设置**：游戏结果通知、签到提醒、系统消息开关
  - **隐私设置**：在线状态显示、战绩可见性控制
  - **其他设置**：清除缓存、检查更新、退出登录

### 4. 帮助中心 (`/profile/help`)
- **功能描述**：提供常见问题解答和使用指南
- **主要特性**：
  - 搜索功能：快速查找问题
  - 常见问题：折叠面板展示FAQ
  - 游戏说明：每个游戏的详细规则、奖励机制、注意事项
  - 积分规则：如何获得、使用积分，积分有效期
  - **联系我们**：
    - **在线客服** (`/profile/help/online-service`)：实时聊天、快捷问题、联系方式
    - **意见反馈** (`/profile/help/feedback`)：提交建议、上传截图、查看反馈记录
    - **举报问题** (`/profile/help/report`)：举报违规行为、上传证据、查看处理进度

### 5. 积分兑换 (`/profile/exchange`)
- **功能描述**：使用积分兑换各种商品和特权
- **主要特性**：
  - 显示可用积分余额
  - 商品分类（实物礼品、虚拟道具、游戏特权）
  - 商品网格展示（图片、名称、描述、价格）
  - 商品详情弹窗（规格、兑换规则）
  - 兑换确认流程
  - 积分充值功能（测试期间免费赠送）

### 6. 我的成就 (`/profile/badges`)
- **功能描述**：展示用户的成就徽章和完成进度
- **主要特性**：
  - 成就统计（已获得、总数、完成率）
  - 成就筛选（全部、已获得、未获得）
  - 成就卡片展示（图标、名称、描述、进度）
  - 成就详情弹窗（解锁条件、奖励、小贴士）
  - 进度条显示未完成成就的进度
  - 已解锁成就显示获得日期

### 7. 邀请好友 (`/profile/invite`)
- **功能描述**：邀请好友注册并获得积分奖励
- **主要特性**：
  - 邀请统计（已邀请人数、获得积分）
  - 多种分享方式（微信、QQ、复制链接）
  - 专属邀请海报生成
  - 邀请码展示
  - 邀请规则说明
  - 邀请记录列表（好友名称、时间、奖励）

## 🔧 路由配置

所有个人中心子页面都遵循以下路由规范：

```
{
  path: '/profile/xxx',
  name: 'ProfileXxx',
  component: () => import('../views/Profile/Xxx/index.vue'),
  meta: {
    title: '页面标题',
    showBack: true,        // 显示返回按钮
    showTabbar: false      // 隐藏底部标签栏
  }
}
```

### 路由列表

| 路径 | 名称 | 标题 |
|------|------|------|
| `/profile/records` | ProfileRecords | 游戏记录 |
| `/profile/points` | ProfilePoints | 积分明细 |
| `/profile/settings` | ProfileSettings | 账户设置 |
| `/profile/help` | ProfileHelp | 帮助中心 |
| `/profile/exchange` | ProfileExchange | 积分兑换 |
| `/profile/badges` | ProfileBadges | 我的成就 |
| `/profile/invite` | ProfileInvite | 邀请好友 |
| `/profile/help/online-service` | HelpOnlineService | 在线客服 |
| `/profile/help/feedback` | HelpFeedback | 意见反馈 |
| `/profile/help/report` | HelpReport | 举报问题 |

## 💾 数据持久化

所有页面使用 `localStorage` 保存用户数据：

- `userInfo`: 用户基本信息（ID、昵称、头像、积分等）
- `gameRecords`: 游戏记录
- `pointsRecords`: 积分明细记录
- `userSettings`: 用户设置
- `userBadges`: 成就徽章数据
- `inviteRecords`: 邀请记录
- `inviteCode`: 邀请码
- `exchangeRecords`: 兑换记录

## 🎨 设计规范

### 1. 统一布局
- 顶部信息卡片（渐变背景、统计数据）
- 中间内容区域（列表、网格）
- 底部操作按钮

### 2. 样式规范
- 使用全局 CSS 变量保持样式一致
- 卡片使用圆角和阴影
- 响应式设计适配移动端
- 统一的动画效果（fadeIn, slideIn）

### 3. 交互设计
- 点击反馈（缩放、颜色变化）
- 加载状态提示
- 空状态展示
- 确认对话框（重要操作）

### 4. 导航规范
- 所有子页面显示返回按钮
- 所有子页面隐藏底部标签栏
- 返回按钮使用浏览器历史记录后退

## 🚀 使用说明

### 从个人中心主页跳转

在 [`Profile/index.vue`](./index.vue) 中，所有菜单项和快捷操作都已配置好跳转逻辑：

```
// 快捷操作
router.push({ name: 'DailyCheckIn' })      // 每日签到
router.push({ name: 'ProfileExchange' })   // 积分兑换
router.push({ name: 'ProfileBadges' })     // 我的成就
router.push({ name: 'ProfileInvite' })     // 邀请好友

// 功能菜单
router.push({ name: 'ProfileRecords' })    // 游戏记录
router.push({ name: 'ProfilePoints' })     // 积分明细
router.push({ name: 'ProfileSettings' })   // 账户设置
router.push({ name: 'ProfileHelp' })       // 帮助中心
```

### 直接访问

也可以通过 URL 直接访问：
- `http://localhost:5173/profile/records`
- `http://localhost:5173/profile/points`
- `http://localhost:5173/profile/settings`
- 等等...

## 📝 待优化事项

1. **真实数据接口**：目前使用模拟数据，需要对接后端 API
2. **图片上传**：头像上传功能需要实现真实的文件上传逻辑
3. **海报生成**：邀请海报需要使用 canvas 或 html2canvas 生成真实图片
4. **分享功能**：微信、QQ 分享需要集成相应的 SDK
5. **推送通知**：通知设置需要对接推送服务
6. **数据统计**：添加更详细的数据分析图表

## 🎉 总结

个人中心模块共实现了 **10 个子页面**，涵盖了用户管理的核心功能：
- ✅ 游戏记录追踪
- ✅ 积分流水管理
- ✅ 账户安全设置
- ✅ 帮助文档查询
- ✅ 积分商城兑换
- ✅ 成就系统展示
- ✅ 邀请推广功能
- ✅ **在线客服**（实时聊天、FAQ）
- ✅ **意见反馈**（建议提交、进度跟踪）
- ✅ **举报问题**（违规举报、证据上传）

所有页面都遵循统一的设计规范和交互模式，提供了良好的用户体验。
