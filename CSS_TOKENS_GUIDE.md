# CSS 设计令牌快速参考

## 🎨 颜色变量

### 主题色
```css
var(--color-primary)        /* #007AFF - 主色调 */
var(--color-primary-light)  /* #5AC8FA - 浅色变体 */
var(--color-primary-dark)   /* #0051D5 - 深色变体 */
```

### 功能色
```css
var(--color-success)  /* #34C759 - 成功 */
var(--color-warning)  /* #FF9500 - 警告 */
var(--color-danger)   /* #FF3B30 - 危险 */
var(--color-info)     /* #5AC8FA - 信息 */
```

### 文字颜色
```css
var(--color-text-primary)    /* 主要文字 */
var(--color-text-secondary)  /* 次要文字 */
var(--color-text-tertiary)   /* 辅助文字 */
var(--color-text-quaternary) /* 禁用文字 */
```

### 背景颜色
```css
var(--color-bg-primary)    /* 主背景 */
var(--color-bg-secondary)  /* 卡片背景 */
var(--color-bg-tertiary)   /* 第三背景 */
```

### 边框颜色
```css
var(--color-border)       /* 标准边框 */
var(--color-border-light) /* 浅色边框 */
```

### 渐变
```css
var(--gradient-primary)  /* 主渐变（蓝紫色） */
var(--gradient-gold)     /* 金色渐变 */
```

---

## 📏 间距变量

```css
var(--spacing-xs)   /* 4px  - 超小 */
var(--spacing-sm)   /* 8px  - 小 */
var(--spacing-md)   /* 12px - 中 */
var(--spacing-lg)   /* 16px - 大 */
var(--spacing-xl)   /* 20px - 超大 */
var(--spacing-2xl)  /* 24px - 特大 */
var(--spacing-3xl)  /* 32px - 巨大 */
```

**使用示例：**
```less
.card {
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}
```

---

## ⭕ 圆角变量

```css
var(--radius-sm)    /* 8px   - 小圆角 */
var(--radius-md)    /* 12px  - 中圆角 */
var(--radius-lg)    /* 16px  - 大圆角 */
var(--radius-xl)    /* 20px  - 超大圆角 */
var(--radius-full)  /* 9999px - 圆形 */
```

**使用示例：**
```less
.button {
  border-radius: var(--radius-md);
}

.avatar {
  border-radius: var(--radius-full);
}
```

---

## 🌑 阴影变量

```css
var(--shadow-sm)  /* 轻微阴影 */
var(--shadow-md)  /* 中等阴影 */
var(--shadow-lg)  /* 大阴影 */
var(--shadow-xl)  /* 超大阴影 */
```

**使用示例：**
```less
.card {
  box-shadow: var(--shadow-md);
  
  &:hover {
    box-shadow: var(--shadow-lg);
  }
}
```

---

## 🔤 字体变量

### 字体系列
```css
var(--font-family-base)  /* 基础字体 */
var(--font-family-mono)  /* 等宽字体 */
```

### 字号
```css
var(--font-size-xs)    /* 12px */
var(--font-size-sm)    /* 14px */
var(--font-size-base)  /* 16px */
var(--font-size-md)    /* 18px */
var(--font-size-lg)    /* 20px */
var(--font-size-xl)    /* 24px */
var(--font-size-2xl)   /* 32px */
var(--font-size-3xl)   /* 40px */
```

### 字重
```css
var(--font-weight-normal)     /* 400 */
var(--font-weight-medium)     /* 500 */
var(--font-weight-semibold)   /* 600 */
var(--font-weight-bold)       /* 700 */
```

### 行高
```css
var(--line-height-tight)     /* 1.2 */
var(--line-height-base)      /* 1.5 */
var(--line-height-relaxed)   /* 1.6 */
```

**使用示例：**
```less
.title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}
```

---

## ⚡ 过渡动画

```css
var(--transition-fast)   /* 0.15s */
var(--transition-base)   /* 0.3s */
var(--transition-slow)   /* 0.5s */
```

**使用示例：**
```less
.button {
  transition: all var(--transition-base);
  
  &:hover {
    transform: translateY(-2px);
  }
}
```

---

## 📱 响应式断点

```less
// 移动端（默认）
@media (max-width: 767px) { }

// 平板及以上
@media (min-width: 768px) { }

// 桌面端
@media (min-width: 1024px) { }
```

---

## 💡 最佳实践

### 1. 优先使用设计令牌
```less
/* ✅ 推荐 */
.card {
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

/* ❌ 不推荐 */
.card {
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}
```

### 2. 保持一致的命名
```less
/* ✅ 推荐 */
.hero-section { }
.feature-card { }
.number-ball { }

/* ❌ 不推荐 */
.heroSection { }
featureCard { }
numberBall { }
```

### 3. 添加适当的注释
```less
/* ========================================
   英雄区域样式
   ======================================== */
.hero-section {
  // ...
}
```

### 4. 使用语义化类名
```less
/* ✅ 推荐 */
.is-selected { }
.is-disabled { }
.has-error { }

/* ❌ 不推荐 */
.selected { }
.disabled { }
.error { }
```

---

## 🎯 常用组合

### 卡片样式
```less
.card {
  background: var(--color-bg-secondary);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  transition: all var(--transition-base);
  
  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
}
```

### 按钮样式
```less
.button {
  background: var(--color-primary);
  color: white;
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-semibold);
  transition: all var(--transition-base);
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
}
```

### 标题样式
```less
.title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  line-height: var(--line-height-tight);
  margin-bottom: var(--spacing-md);
}
```

---

## 🔗 相关文档

- [完整优化总结](./OPTIMIZATION_SUMMARY.md)
- [Vant 组件文档](https://vant-ui.github.io/vant/)
- [Vue 3 文档](https://cn.vuejs.org/)