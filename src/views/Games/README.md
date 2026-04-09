# 娱乐中心游戏模块

## 📁 目录结构

```
src/views/Games/
├── NumberGuess/          # 数字猜猜猜游戏
│   └── index.vue
├── LuckyWheel/           # 幸运转盘游戏
│   └── index.vue
├── QuizChallenge/        # 答题挑战游戏
│   └── index.vue
├── DailyCheckIn/         # 每日签到功能
│   └── index.vue
└── README.md             # 本文档
```

## 🎮 游戏列表

### 1. 数字猜猜猜 (`/games/number-guess`)

**游戏玩法：**
- 系统生成一个1-100的随机数字
- 玩家有7次机会猜测这个数字
- 每次猜测后会提示"太大了"或"太小了"

**奖励机制：**
- 第1-2次猜中：50积分
- 第3-4次猜中：30积分
- 第5-7次猜中：10积分

**技术特点：**
- 实时验证输入
- 猜测历史记录展示
- 动画反馈效果

---

### 2. 幸运转盘 (`/games/lucky-wheel`)

**游戏玩法：**
- 点击"开始抽奖"按钮转动转盘
- 每次转动消耗10积分
- 转盘停止后指针指向的即为获得的奖品

**奖品设置：**
- 5积分、10积分、20积分、30积分、50积分、100积分
- 6个奖品等级，概率均等

**技术特点：**
- 使用CSS conic-gradient精确绘制扇形背景
- 精准的角度计算算法，确保奖品对准指针
- 基于整圈数累加旋转，避免角度溢出
- 文字层独立定位，始终位于扇形中心

---

### 3. 答题挑战 (`/games/quiz-challenge`)

**游戏玩法：**
- 共有5道技术类选择题
- 每答对一题获得5积分基础奖励
- 连续答对有额外奖励

**奖励机制：**
- 基础奖励：每题5积分
- 连续2题：额外+5分
- 连续3题：额外+10分
- 连续4题：额外+15分
- 连续5题：额外+25分

**技术特点：**
- 题目随机排序
- 进度条显示
- 选项即时反馈（正确/错误）
- 连击特效动画

---

### 4. 每日签到 (`/games/daily-checkin`)

**功能说明：**
- 每天可签到一次，获得基础10积分
- 连续签到有额外奖励
- 可视化日历展示签到记录

**奖励机制：**
- 基础奖励：每天10积分
- 连续3天：额外+5分
- 连续7天：额外+15分
- 连续15天：额外+30分
- 连续30天：额外+60分

**技术特点：**
- 本月签到日历展示
- 自动检测签到中断
- 签到历史记录
- 下次签到倒计时提示

---

## 🔧 路由配置规范

所有游戏页面路由必须包含以下meta配置：

```javascript
{
  path: '/games/xxx',
  name: 'GameName',
  component: () => import('../views/Games/XXX/index.vue'),
  meta: {
    title: '游戏名称',
    showBack: true,        // 显示返回按钮
    showTabbar: false      // 隐藏底部标签栏
  }
}
```

**说明：**
- `showBack: true` - 确保导航栏显示返回图标，提供清晰的返回路径
- `showTabbar: false` - 隐藏底部标签栏，避免全局导航干扰游戏体验

---

## 💾 数据持久化

所有游戏使用localStorage保存用户数据：

```javascript
// 用户积分
localStorage.setItem('lottery_user_points', points)

// 连续签到天数
localStorage.setItem('lottery_consecutive_days', days)

// 上次签到日期
localStorage.setItem('lottery_last_checkin_date', date)

// 签到历史
localStorage.setItem('lottery_checkin_history', JSON.stringify(history))

// 本月签到日期
localStorage.setItem('lottery_checked_dates', JSON.stringify(dates))

// 抽奖历史
localStorage.setItem('lottery_spin_history', JSON.stringify(history))
```

---

## 🎨 设计规范

### 统一布局
- **顶部信息栏**：显示用户积分、游戏状态
- **游戏规则区**：清晰展示游戏玩法和奖励机制
- **游戏主区域**：核心交互区域
- **底部操作按钮**：主要操作入口

### 动画效果
- `fadeIn` - 淡入效果
- `slideIn` - 滑入效果
- `bounceIn` - 弹入效果
- `pulse` - 脉冲效果
- `celebrate` - 庆祝效果

### 响应式设计
- 使用CSS变量保持样式一致
- 适配移动端屏幕
- 支持触摸交互

### 颜色规范
- 主色调：`var(--color-primary)` - 蓝色系
- 成功色：`var(--color-success)` - 绿色系
- 警告色：`var(--color-warning)` - 橙色系
- 危险色：`var(--color-danger)` - 红色系

---

## 🚀 使用说明

### 启动开发服务器

```bash
npm run dev
```

### 访问游戏

1. 打开浏览器访问 `http://localhost:5173`
2. 点击底部"娱乐"标签进入娱乐中心
3. 选择任意游戏卡片进入游戏页面
4. 游戏页面会自动隐藏底部标签栏，显示返回按钮

---

## 📝 扩展建议

### 可以添加的功能

1. **成就系统**
   - 累计签到天数徽章
   - 答题全对成就
   - 转盘大奖记录

2. **排行榜**
   - 每日签到排行榜
   - 答题正确率排行
   - 转盘最高奖金记录

3. **社交分享**
   - 分享签到记录
   - 分享答题成绩
   - 分享转盘结果

4. **更多游戏**
   - 记忆翻牌
   - 扫雷游戏
   - 2048小游戏

### 技术优化方向

1. **性能优化**
   - 图片懒加载
   - 虚拟滚动（长列表）
   - 防抖节流优化

2. **用户体验**
   - 骨架屏加载
   - 离线缓存
   - PWA支持

3. **数据安全**
   - 积分变更日志
   - 防作弊机制
   - 数据加密存储

---

## 🐛 常见问题

### Q: 游戏页面不显示返回按钮？
A: 检查路由配置中是否设置了 `meta.showBack: true`

### Q: 底部标签栏没有隐藏？
A: 检查路由配置中是否设置了 `meta.showTabbar: false`

### Q: 积分没有保存？
A: 检查是否正确调用了 `saveUserPoints()` 函数

### Q: 转盘停在两个奖品中间？
A: 这是已修复的问题，使用了conic-gradient和精准角度计算

---

## 📞 技术支持

如有问题或建议，请联系开发团队。

---

**最后更新**: 2026-04-09
