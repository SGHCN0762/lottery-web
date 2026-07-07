export const mathKnowledgePoints = [
  {
    id: 'math_001',
    title: '有理数',
    stage: 'middle',
    chapter: '有理数',
    tags: ['有理数', '数轴', '相反数', '绝对值', '运算'],
    content: `## 有理数

### 核心概念

**有理数**：整数和分数统称为有理数。

**数轴**：规定了原点、正方向和单位长度的直线。

**相反数**：只有符号不同的两个数互为相反数，$a$ 的相反数是 $-a$。

**绝对值**：数轴上表示数 $a$ 的点与原点的距离，$|a| \\geq 0$。

**倒数**：乘积为1的两个数互为倒数，$a$ 的倒数是 $\\frac{1}{a}$（$a \\neq 0$）。

### 公式总结

| 公式 | 说明 |
|------|------|
| $a + (-a) = 0$ | 相反数之和为0 |
| $|a| = \\begin{cases} a, & a \\geq 0 \\\\ -a, & a < 0 \\end{cases}$ | 绝对值定义 |
| $a \\times \\frac{1}{a} = 1$ | 倒数之积为1 |
| $a + b = b + a$ | 加法交换律 |
| $(a + b) + c = a + (b + c)$ | 加法结合律 |
| $a \\times b = b \\times a$ | 乘法交换律 |
| $(a \\times b) \\times c = a \\times (b \\times c)$ | 乘法结合律 |
| $a \\times (b + c) = ab + ac$ | 乘法分配律 |

### 数学示意图

<svg width="300" height="80" viewBox="0 0 300 80">
  <line x1="20" y1="40" x2="280" y2="40" stroke="var(--color-primary)" stroke-width="2" />
  <circle cx="150" cy="40" r="4" fill="var(--color-primary)" />
  <text x="150" y="55" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">0</text>
  <line x1="280" y1="38" x2="280" y2="42" stroke="var(--color-primary)" stroke-width="2" />
  <text x="285" y="45" font-size="10" fill="var(--color-text-secondary)">正方向</text>
  <circle cx="90" cy="40" r="4" fill="var(--color-text-primary)" />
  <text x="90" y="55" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">-3</text>
  <circle cx="210" cy="40" r="4" fill="var(--color-text-primary)" />
  <text x="210" y="55" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">3</text>
  <text x="150" y="20" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">数轴</text>
</svg>

### 例题解析

**问题**：计算 $(-3) + 5 - 2 \\times (-4)$

**解答**：

$$ (-3) + 5 - 2 \\times (-4) = (-3) + 5 + 8 = 10 $$

### 举一反三

**练习1**：计算 $|-5| + (-2)^2$
- 答案：$5 + 4 = 9$

**练习2**：计算 $(-6) \\div 2 \\times (-3)$
- 答案：$(-3) \\times (-3) = 9$

### 拓展知识

- 有理数可以表示为分数 $\\frac{p}{q}$（$p,q$ 为整数，$q \\neq 0$）。
- 绝对值具有非负性：$|a| \\geq 0$，当且仅当 $a = 0$ 时取等号。
- 比较有理数大小：正数大于0，0大于负数，正数大于负数；两个负数比较，绝对值大的反而小。`
  },
  {
    id: 'math_002',
    title: '整式的加减',
    stage: 'middle',
    chapter: '整式的加减',
    tags: ['整式', '单项式', '多项式', '合并同类项'],
    content: `## 整式的加减

### 核心概念

**单项式**：数或字母的积组成的代数式，单独的一个数或字母也是单项式。

**多项式**：几个单项式的和组成的代数式。

**整式**：单项式和多项式统称为整式。

**同类项**：所含字母相同，并且相同字母的指数也相同的项。

**合并同类项**：把多项式中的同类项合并成一项。

### 公式总结

| 公式 | 说明 |
|------|------|
| $ab + ac = a(b + c)$ | 提公因式 |
| $ax + bx = (a + b)x$ | 合并同类项 |
| $(a + b) + (c + d) = a + b + c + d$ | 去括号（括号前是+） |
| $(a + b) - (c + d) = a + b - c - d$ | 去括号（括号前是-） |

### 数学示意图

<svg width="300" height="100" viewBox="0 0 300 100">
  <rect x="40" y="20" width="80" height="30" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" />
  <text x="80" y="40" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">单项式 $3x^2$</text>
  <rect x="180" y="20" width="100" height="30" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" />
  <text x="230" y="40" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">多项式 $2x + 3y$</text>
  <rect x="40" y="60" width="240" height="30" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="160" y="80" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">整式（单项式 + 多项式）</text>
</svg>

### 例题解析

**问题**：化简 $3x^2 + 5x - 2x^2 - 3x + 1$

**解答**：

$$ 3x^2 + 5x - 2x^2 - 3x + 1 = (3x^2 - 2x^2) + (5x - 3x) + 1 = x^2 + 2x + 1 $$

### 举一反三

**练习1**：化简 $2(a + b) - 3(a - b)$
- 答案：$2a + 2b - 3a + 3b = -a + 5b$

**练习2**：已知 $A = 2x^2 + 3x - 1$，$B = x^2 - 2x + 3$，求 $A + B$
- 答案：$3x^2 + x + 2$

### 拓展知识

- 单项式的次数：所有字母指数的和。
- 多项式的次数：次数最高项的次数。
- 整式加减的实质就是**去括号**和**合并同类项**。`
  },
  {
    id: 'math_003',
    title: '一元一次方程',
    stage: 'middle',
    chapter: '一元一次方程',
    tags: ['一元一次方程', '解方程', '应用'],
    content: `## 一元一次方程

### 核心概念

**方程**：含有未知数的等式。

**一元一次方程**：只含有一个未知数，未知数的次数都是1，等号两边都是整式的方程。

**解方程**：求方程的解的过程。

**方程的解**：使方程左右两边相等的未知数的值。

### 公式总结

| 公式 | 说明 |
|------|------|
| $ax + b = 0$（$a \\neq 0$） | 一元一次方程标准形式 |
| $x = -\\frac{b}{a}$ | 一元一次方程的解 |
| 等式性质1：$a = b \\Rightarrow a \\pm c = b \\pm c$ | 等式两边加(减)同一个数 |
| 等式性质2：$a = b \\Rightarrow ac = bc$（$c \\neq 0$） | 等式两边乘(除)同一个不为0的数 |

### 数学示意图

<svg width="300" height="120" viewBox="0 0 300 120">
  <rect x="50" y="20" width="200" height="30" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" />
  <text x="150" y="40" font-size="14" text-anchor="middle" fill="var(--color-text-primary)">方程：$2x + 3 = 7$</text>
  <path d="M150 50 L150 60" stroke="var(--color-border)" stroke-width="1" />
  <rect x="50" y="70" width="200" height="30" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="150" y="90" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">解：$x = 2$</text>
  <text x="150" y="110" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">使等式成立的未知数的值</text>
</svg>

### 例题解析

**问题**：解方程 $2(x - 1) + 3 = 9$

**解答**：

$$ 2(x - 1) + 3 = 9 $$
$$ 2x - 2 + 3 = 9 $$
$$ 2x + 1 = 9 $$
$$ 2x = 8 $$
$$ x = 4 $$

### 举一反三

**练习1**：解方程 $3x - 5 = 4x + 1$
- 答案：$-x = 6$，$x = -6$

**练习2**：解方程 $\\frac{x}{2} + \\frac{x}{3} = 5$
- 答案：$\\frac{5x}{6} = 5$，$x = 6$

### 拓展知识

- 解一元一次方程的步骤：去分母、去括号、移项、合并同类项、系数化为1。
- 检验：把解代入原方程，看左右两边是否相等。
- 列方程解应用题的关键是找到**等量关系**。`
  },
  {
    id: 'math_004',
    title: '几何图形初步',
    stage: 'middle',
    chapter: '几何图形初步',
    tags: ['几何图形', '点线面', '角', '立体图形'],
    content: `## 几何图形初步

### 核心概念

**立体图形**：各部分不在同一平面内的几何图形。

**平面图形**：各部分都在同一平面内的几何图形。

**点**：没有大小，只有位置。

**线**：由无数个点组成，有长度，没有粗细。

**角**：由两条有公共端点的射线组成的图形。

### 公式总结

| 公式 | 说明 |
|------|------|
| $1周角 = 360°$ | 周角定义 |
| $1平角 = 180°$ | 平角定义 |
| $1直角 = 90°$ | 直角定义 |
| $1° = 60'$ | 度分换算 |
| $1' = 60''$ | 分秒换算 |

### 数学示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <rect x="30" y="60" width="60" height="60" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" />
  <text x="60" y="135" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">正方体</text>
  <rect x="120" y="70" width="60" height="50" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" />
  <text x="150" y="135" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">长方体</text>
  <circle cx="240" cy="100" r="25" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" />
  <text x="240" y="135" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">圆柱</text>
  <text x="150" y="30" font-size="14" text-anchor="middle" fill="var(--color-text-secondary)">常见立体图形</text>
</svg>

### 例题解析

**问题**：一个角的补角是这个角的3倍，求这个角的度数。

**解答**：设这个角为 $x$，则它的补角为 $180° - x$

$$ 180° - x = 3x $$
$$ 4x = 180° $$
$$ x = 45° $$

### 举一反三

**练习1**：一个角的余角是35°，求这个角的度数。
- 答案：$90° - 35° = 55°$

**练习2**：把15.5°换算成度分秒。
- 答案：$15°30'$

### 拓展知识

- 余角：如果两个角的和是90°，则这两个角互为余角。
- 补角：如果两个角的和是180°，则这两个角互为补角。
- 邻补角：有一条公共边，另一边互为反向延长线的两个角。`
  },
  {
    id: 'math_005',
    title: '相交线与平行线',
    stage: 'middle',
    chapter: '相交线与平行线',
    tags: ['相交线', '平行线', '同位角', '内错角', '同旁内角'],
    content: `## 相交线与平行线

### 核心概念

**对顶角**：两条直线相交，有公共顶点且两边互为反向延长线的两个角。

**邻补角**：两条直线相交，有公共边且另一边互为反向延长线的两个角。

**平行线**：在同一平面内，不相交的两条直线。

**同位角**：位置相同，在截线同旁，被截两直线同方向。

**内错角**：在截线两旁，被截两直线之间。

**同旁内角**：在截线同旁，被截两直线之间。

### 公式总结

| 公式 | 说明 |
|------|------|
| 对顶角相等 | 对顶角性质 |
| 邻补角和为180° | 邻补角性质 |
| 同位角相等 ⇒ 两直线平行 | 平行线判定1 |
| 内错角相等 ⇒ 两直线平行 | 平行线判定2 |
| 同旁内角互补 ⇒ 两直线平行 | 平行线判定3 |

### 数学示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <line x1="30" y1="30" x2="270" y2="120" stroke="var(--color-primary)" stroke-width="2" />
  <line x1="30" y1="120" x2="270" y2="30" stroke="var(--color-primary)" stroke-width="2" />
  <text x="150" y="80" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">相交线</text>
  <line x1="30" y1="160" x2="270" y2="160" stroke="var(--color-border)" stroke-width="2" />
  <line x1="30" y1="180" x2="270" y2="180" stroke="var(--color-border)" stroke-width="2" />
  <text x="150" y="195" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">平行线</text>
</svg>

### 例题解析

**问题**：已知 $AB \\parallel CD$，$\\angle 1 = 50°$，求 $\\angle 2$ 的度数。

**解答**：因为 $AB \\parallel CD$，所以 $\\angle 1 = \\angle 2$（两直线平行，内错角相等），所以 $\\angle 2 = 50°$。

### 举一反三

**练习1**：两直线平行，同位角相等的逆命题是什么？
- 答案：同位角相等，两直线平行。

**练习2**：如果 $\\angle 1$ 和 $\\angle 2$ 是同旁内角，$\\angle 1 = 110°$，要使两直线平行，$\\angle 2$ 应等于多少？
- 答案：$\\angle 2 = 70°$

### 拓展知识

- 平行公理：经过直线外一点，有且只有一条直线与这条直线平行。
- 平行公理推论：如果两条直线都与第三条直线平行，那么这两条直线也互相平行。
- 平行线之间的距离处处相等。`
  },
  {
    id: 'math_006',
    title: '实数',
    stage: 'middle',
    chapter: '实数',
    tags: ['实数', '平方根', '立方根', '无理数'],
    content: `## 实数

### 核心概念

**平方根**：如果 $x^2 = a$，那么 $x$ 叫做 $a$ 的平方根，记为 $\\pm \\sqrt{a}$。

**算术平方根**：正数 $a$ 的正平方根，记为 $\\sqrt{a}$。

**立方根**：如果 $x^3 = a$，那么 $x$ 叫做 $a$ 的立方根，记为 $\\sqrt[3]{a}$。

**无理数**：无限不循环小数。

**实数**：有理数和无理数统称为实数。

### 公式总结

| 公式 | 说明 |
|------|------|
| $(\\sqrt{a})^2 = a$（$a \\geq 0$） | 算术平方根性质 |
| $\\sqrt{a^2} = |a|$ | 平方根性质 |
| $(\\sqrt[3]{a})^3 = a$ | 立方根性质 |
| $\\sqrt[3]{a^3} = a$ | 立方根性质 |
| $\\sqrt{a} \\cdot \\sqrt{b} = \\sqrt{ab}$（$a \\geq 0$，$b \\geq 0$） | 平方根乘法 |
| $\\frac{\\sqrt{a}}{\\sqrt{b}} = \\sqrt{\\frac{a}{b}}$（$a \\geq 0$，$b > 0$） | 平方根除法 |

### 数学示意图

<svg width="300" height="120" viewBox="0 0 300 120">
  <circle cx="150" cy="60" r="50" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" />
  <text x="150" y="55" font-size="14" text-anchor="middle" fill="var(--color-text-primary)">实数</text>
  <circle cx="110" cy="80" r="25" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="110" y="85" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">有理数</text>
  <circle cx="190" cy="80" r="25" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="190" y="85" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">无理数</text>
</svg>

### 例题解析

**问题**：化简 $\\sqrt{18} + \\sqrt{8} - \\sqrt{2}$

**解答**：

$$ \\sqrt{18} + \\sqrt{8} - \\sqrt{2} = 3\\sqrt{2} + 2\\sqrt{2} - \\sqrt{2} = 4\\sqrt{2} $$

### 举一反三

**练习1**：计算 $\\sqrt{25} + \\sqrt[3]{-8}$
- 答案：$5 + (-2) = 3$

**练习2**：化简 $(\\sqrt{3} + \\sqrt{2})(\\sqrt{3} - \\sqrt{2})$
- 答案：$3 - 2 = 1$

### 拓展知识

- 实数与数轴上的点**一一对应**。
- 常见无理数：$\\sqrt{2}$、$\\sqrt{3}$、$\\pi$、$e$ 等。
- 在实数范围内，负数没有平方根，但有立方根。`
  },
  {
    id: 'math_007',
    title: '平面直角坐标系',
    stage: 'middle',
    chapter: '平面直角坐标系',
    tags: ['坐标系', '坐标', '象限', '平移'],
    content: `## 平面直角坐标系

### 核心概念

**平面直角坐标系**：由两条互相垂直且有公共原点的数轴组成。

**横坐标**：点到y轴的距离，记为 $x$。

**纵坐标**：点到x轴的距离，记为 $y$。

**象限**：坐标轴将平面分成四个部分，分别为第一至第四象限。

**平移**：图形上所有点沿同一方向移动相同距离。

### 公式总结

| 公式 | 说明 |
|------|------|
| 点 $P(x, y)$ | 平面内点的坐标表示 |
| 点 $P(x, y)$ 关于x轴对称：$(x, -y)$ | 关于x轴对称点的坐标 |
| 点 $P(x, y)$ 关于y轴对称：$(-x, y)$ | 关于y轴对称点的坐标 |
| 点 $P(x, y)$ 关于原点对称：$(-x, -y)$ | 关于原点对称点的坐标 |
| 平移：$(x, y) \\to (x + a, y + b)$ | 向右平移a个单位，向上平移b个单位 |

### 数学示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <line x1="150" y1="20" x2="150" y2="180" stroke="var(--color-primary)" stroke-width="2" />
  <line x1="20" y1="100" x2="280" y2="100" stroke="var(--color-primary)" stroke-width="2" />
  <text x="160" y="25" font-size="10" fill="var(--color-text-secondary)">y轴</text>
  <text x="285" y="105" font-size="10" fill="var(--color-text-secondary)">x轴</text>
  <circle cx="200" cy="60" r="4" fill="var(--color-primary)" />
  <text x="210" y="65" font-size="10" fill="var(--color-text-primary)">第一象限</text>
  <circle cx="100" cy="60" r="4" fill="var(--color-primary)" />
  <text x="60" y="65" font-size="10" fill="var(--color-text-primary)">第二象限</text>
  <circle cx="100" cy="140" r="4" fill="var(--color-primary)" />
  <text x="60" y="145" font-size="10" fill="var(--color-text-primary)">第三象限</text>
  <circle cx="200" cy="140" r="4" fill="var(--color-primary)" />
  <text x="210" y="145" font-size="10" fill="var(--color-text-primary)">第四象限</text>
  <text x="155" y="105" font-size="10" fill="var(--color-text-primary)">O</text>
</svg>

### 例题解析

**问题**：已知点 $A(3, -2)$，求：(1) 关于x轴对称的点；(2) 向右平移2个单位后的点。

**解答**：
(1) 关于x轴对称：$(3, 2)$
(2) 向右平移2个单位：$(5, -2)$

### 举一反三

**练习1**：点 $B(-1, 4)$ 关于原点对称的点坐标是多少？
- 答案：$(1, -4)$

**练习2**：点 $C(2, 3)$ 先向左平移3个单位，再向下平移1个单位，得到的点坐标是多少？
- 答案：$(-1, 2)$

### 拓展知识

- 第一象限：$(+, +)$，第二象限：$(-, +)$，第三象限：$(-, -)$，第四象限：$(+, -)$。
- x轴上的点：$y = 0$；y轴上的点：$x = 0$。
- 两点间距离公式：$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$。`
  },
  {
    id: 'math_008',
    title: '二元一次方程组',
    stage: 'middle',
    chapter: '二元一次方程组',
    tags: ['二元一次方程', '方程组', '代入消元', '加减消元'],
    content: `## 二元一次方程组

### 核心概念

**二元一次方程**：含有两个未知数，未知数的次数都是1的整式方程。

**二元一次方程组**：由两个二元一次方程组成的方程组。

**方程组的解**：同时满足方程组中每个方程的未知数的值。

**代入消元法**：将一个方程中的一个未知数用含另一个未知数的式子表示出来，代入另一个方程。

**加减消元法**：将两个方程相加或相减，消去一个未知数。

### 公式总结

| 公式 | 说明 |
|------|------|
| $\\begin{cases} a_1x + b_1y = c_1 \\\\ a_2x + b_2y = c_2 \\end{cases}$ | 二元一次方程组标准形式 |
| 代入消元：用一个未知数表示另一个，代入求解 | 代入法 |
| 加减消元：消去一个未知数，转化为一元一次方程 | 加减法 |

### 数学示意图

<svg width="300" height="120" viewBox="0 0 300 120">
  <rect x="50" y="20" width="200" height="30" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" />
  <text x="150" y="40" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">$x + y = 5$</text>
  <rect x="50" y="60" width="200" height="30" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="150" y="80" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">$2x - y = 1$</text>
  <rect x="50" y="100" width="200" height="30" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" />
  <text x="150" y="120" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">解：$x = 2, y = 3$</text>
</svg>

### 例题解析

**问题**：解方程组 $\\begin{cases} x + y = 5 \\\\ 2x - y = 1 \\end{cases}$

**解答**：用加减消元法，将两个方程相加：

$$ (x + y) + (2x - y) = 5 + 1 $$
$$ 3x = 6 $$
$$ x = 2 $$

代入第一个方程：$2 + y = 5$，$y = 3$

所以方程组的解为 $\\begin{cases} x = 2 \\\\ y = 3 \\end{cases}$

### 举一反三

**练习1**：解方程组 $\\begin{cases} 2x + y = 7 \\\\ x - 2y = 1 \\end{cases}$
- 答案：$x = 3, y = 1$

**练习2**：解方程组 $\\begin{cases} 3x + 2y = 12 \\\\ 2x - 3y = 5 \\end{cases}$
- 答案：$x = \\frac{46}{13}, y = \\frac{9}{13}$

### 拓展知识

- 二元一次方程组的解有三种情况：**唯一解**、**无解**、**无数解**。
- 方程组无解的条件：$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}$（两直线平行）。
- 方程组有无数解的条件：$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$（两直线重合）。`
  },
  {
    id: 'math_009',
    title: '不等式与不等式组',
    stage: 'middle',
    chapter: '不等式与不等式组',
    tags: ['不等式', '不等式组', '解集', '性质'],
    content: `## 不等式与不等式组

### 核心概念

**不等式**：用不等号表示不等关系的式子。

**不等式的解**：使不等式成立的未知数的值。

**解集**：所有解组成的集合。

**一元一次不等式**：只含有一个未知数，未知数的次数都是1的不等式。

**一元一次不等式组**：由几个一元一次不等式组成的不等式组。

### 公式总结

| 公式 | 说明 |
|------|------|
| $a > b \\Rightarrow a + c > b + c$ | 不等式性质1 |
| $a > b, c > 0 \\Rightarrow ac > bc$ | 不等式性质2 |
| $a > b, c < 0 \\Rightarrow ac < bc$ | 不等式性质3 |
| $a > b \\Rightarrow a - c > b - c$ | 不等式性质1 |
| 不等式组的解集：各个不等式解集的交集 | 不等式组求解 |

### 数学示意图

<svg width="300" height="100" viewBox="0 0 300 100">
  <line x1="20" y1="50" x2="280" y2="50" stroke="var(--color-primary)" stroke-width="2" />
  <circle cx="150" cy="50" r="4" fill="var(--color-primary)" />
  <text x="150" y="65" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">0</text>
  <circle cx="210" cy="50" r="4" fill="var(--color-primary)" />
  <text x="210" y="65" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">3</text>
  <path d="M210 50 L280 50" stroke="var(--color-primary)" stroke-width="2" stroke-dasharray="5,3" />
  <text x="245" y="45" font-size="10" fill="var(--color-text-secondary)">$x > 3$</text>
</svg>

### 例题解析

**问题**：解不等式 $2(x - 1) + 3 < 5x - 2$

**解答**：

$$ 2x - 2 + 3 < 5x - 2 $$
$$ 2x + 1 < 5x - 2 $$
$$ 1 + 2 < 5x - 2x $$
$$ 3 < 3x $$
$$ x > 1 $$

### 举一反三

**练习1**：解不等式 $\\frac{x}{2} - 1 \\geq \\frac{x}{3} + 1$
- 答案：$3x - 6 \\geq 2x + 6$，$x \\geq 12$

**练习2**：解不等式组 $\\begin{cases} x - 1 > 0 \\\\ 2x + 3 < 9 \\end{cases}$
- 答案：$1 < x < 3$

### 拓展知识

- 解不等式时，两边同时乘(除)以负数，不等号方向**改变**。
- 数轴表示解集：">"向右，"<"向左；含等号用实心点，不含等号用空心点。
- 一元一次不等式组的解集口诀：同大取大，同小取小，大小小大中间找，大大小小无解了。`
  },
  {
    id: 'math_010',
    title: '数据的收集整理与描述',
    stage: 'middle',
    chapter: '数据的收集整理与描述',
    tags: ['数据', '统计图', '频数', '频率'],
    content: `## 数据的收集整理与描述

### 核心概念

**全面调查**：对全体对象进行调查。

**抽样调查**：从总体中抽取部分个体进行调查。

**频数**：每个对象出现的次数。

**频率**：每个对象出现的次数与总次数的比值。

**统计图**：条形图、折线图、扇形图等。

### 公式总结

| 公式 | 说明 |
|------|------|
| 频率 = 频数 / 总数 | 频率计算公式 |
| 各组频率之和 = 1 | 频率性质 |
| 扇形圆心角 = 频率 × 360° | 扇形图角度计算 |

### 数学示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <rect x="40" y="90" width="40" height="50" fill="var(--color-primary)" />
  <text x="60" y="155" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">A</text>
  <rect x="100" y="60" width="40" height="80" fill="var(--color-primary)" />
  <text x="120" y="155" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">B</text>
  <rect x="160" y="30" width="40" height="110" fill="var(--color-primary)" />
  <text x="180" y="155" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">C</text>
  <rect x="220" y="70" width="40" height="70" fill="var(--color-primary)" />
  <text x="240" y="155" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">D</text>
  <text x="150" y="20" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">条形统计图</text>
</svg>

### 例题解析

**问题**：某班50名学生数学成绩如下：80分以下5人，80-89分15人，90-99分25人，100分5人。计算各分数段的频率。

**解答**：
- 80分以下：频率 = 5/50 = 0.1
- 80-89分：频率 = 15/50 = 0.3
- 90-99分：频率 = 25/50 = 0.5
- 100分：频率 = 5/50 = 0.1

### 举一反三

**练习1**：在一个样本中，数据出现的频数分别为10、15、20、25，求各数据的频率。
- 答案：总数=70，频率分别为10/70、15/70、20/70、25/70

**练习2**：某扇形统计图中，某部分占总体的25%，该部分对应的圆心角是多少？
- 答案：25% × 360° = 90°

### 拓展知识

- 条形图：直观展示各组数据的数量。
- 折线图：展示数据的变化趋势。
- 扇形图：展示各部分占总体的比例。
- 直方图：展示连续数据的分布情况。`
  },
  {
    id: 'math_011',
    title: '三角形',
    stage: 'middle',
    chapter: '三角形',
    tags: ['三角形', '内角和', '外角', '三边关系'],
    content: `## 三角形

### 核心概念

**三角形**：由三条线段首尾顺次相接组成的图形。

**三角形的分类**：按角分（锐角三角形、直角三角形、钝角三角形）；按边分（等腰三角形、等边三角形、一般三角形）。

**三角形的高**：从顶点向对边作垂线，顶点和垂足之间的线段。

**三角形的中线**：连接顶点和对边中点的线段。

**三角形的角平分线**：平分内角的射线与对边的交点之间的线段。

### 公式总结

| 公式 | 说明 |
|------|------|
| 内角和 = 180° | 三角形内角和定理 |
| 外角 = 与它不相邻的两个内角和 | 外角定理 |
| 两边之和 > 第三边 | 三边关系 |
| 两边之差 < 第三边 | 三边关系 |
| 面积 = $\\frac{1}{2} \\times$ 底 $\\times$ 高 | 面积公式 |

### 数学示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <path d="M150 30 L50 120 L250 120 Z" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" stroke-width="2" />
  <circle cx="150" cy="30" r="4" fill="var(--color-text-primary)" />
  <text x="155" y="35" font-size="10" fill="var(--color-text-primary)">A</text>
  <circle cx="50" cy="120" r="4" fill="var(--color-text-primary)" />
  <text x="45" y="125" font-size="10" fill="var(--color-text-primary)">B</text>
  <circle cx="250" cy="120" r="4" fill="var(--color-text-primary)" />
  <text x="255" y="125" font-size="10" fill="var(--color-text-primary)">C</text>
  <text x="150" y="80" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">$\\angle A + \\angle B + \\angle C = 180°$</text>
</svg>

### 例题解析

**问题**：在 $\\triangle ABC$ 中，$\\angle A = 50°$，$\\angle B = 60°$，求 $\\angle C$ 的度数。

**解答**：根据三角形内角和定理：

$$ \\angle C = 180° - \\angle A - \\angle B = 180° - 50° - 60° = 70° $$

### 举一反三

**练习1**：一个三角形的两个内角分别是40°和50°，这是一个什么三角形？
- 答案：第三个角 = 90°，直角三角形

**练习2**：三角形三边长分别为3、4、x，求x的取值范围。
- 答案：$4 - 3 < x < 4 + 3$，即 $1 < x < 7$

### 拓展知识

- 三角形具有**稳定性**，四边形具有**不稳定性**。
- 三角形的三条中线相交于一点，这个点叫做**重心**。
- 三角形的三条高相交于一点，这个点叫做**垂心**。`
  },
  {
    id: 'math_012',
    title: '全等三角形',
    stage: 'middle',
    chapter: '全等三角形',
    tags: ['全等三角形', 'SSS', 'SAS', 'ASA', 'AAS', 'HL'],
    content: `## 全等三角形

### 核心概念

**全等三角形**：能够完全重合的两个三角形。

**对应边**：全等三角形中互相重合的边。

**对应角**：全等三角形中互相重合的角。

**全等三角形判定**：SSS、SAS、ASA、AAS、HL。

### 公式总结

| 判定方法 | 说明 |
|----------|------|
| SSS | 三边对应相等的两个三角形全等 |
| SAS | 两边及其夹角对应相等的两个三角形全等 |
| ASA | 两角及其夹边对应相等的两个三角形全等 |
| AAS | 两角及其中一角的对边对应相等的两个三角形全等 |
| HL | 斜边和一条直角边对应相等的两个直角三角形全等 |

### 数学示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <path d="M40 120 L120 40 L160 120 Z" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" stroke-width="2" />
  <text x="100" y="90" font-size="10" fill="var(--color-text-primary)">$\\triangle ABC$</text>
  <path d="M180 120 L260 40 L300 120 Z" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" stroke-width="2" />
  <text x="260" y="90" font-size="10" fill="var(--color-text-primary)">$\\triangle A'B'C'$</text>
  <path d="M160 100 L180 100" stroke="var(--color-border)" stroke-width="2" marker-end="url(#arrow1)" />
  <text x="170" y="95" font-size="10" fill="var(--color-text-secondary)">全等</text>
  <defs>
    <marker id="arrow1" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-border)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：已知 $AB = DE$，$BC = EF$，$AC = DF$，求证 $\\triangle ABC \\cong \\triangle DEF$。

**解答**：根据SSS判定定理：
因为 $AB = DE$，$BC = EF$，$AC = DF$（已知），
所以 $\\triangle ABC \\cong \\triangle DEF$（SSS）。

### 举一反三

**练习1**：已知 $AB = DE$，$\\angle A = \\angle D$，$AC = DF$，用什么方法判定全等？
- 答案：SAS

**练习2**：两个直角三角形，斜边相等，一条直角边相等，用什么方法判定全等？
- 答案：HL

### 拓展知识

- 全等三角形的**对应边相等**，**对应角相等**。
- SAS中的角必须是两条边的**夹角**。
- 不存在"SSA"和"AAA"判定方法。`
  },
  {
    id: 'math_013',
    title: '轴对称',
    stage: 'middle',
    chapter: '轴对称',
    tags: ['轴对称', '等腰三角形', '垂直平分线', '角平分线'],
    content: `## 轴对称

### 核心概念

**轴对称图形**：沿一条直线折叠，直线两旁的部分能够完全重合的图形。

**两个图形关于直线对称**：两个图形沿一条直线折叠后能够完全重合。

**垂直平分线**：垂直且平分一条线段的直线。

**等腰三角形**：至少有两边相等的三角形。

**等边三角形**：三边都相等的三角形。

### 公式总结

| 公式 | 说明 |
|------|------|
| 垂直平分线上的点到线段两端距离相等 | 垂直平分线性质 |
| 角平分线上的点到角两边距离相等 | 角平分线性质 |
| 等腰三角形两底角相等 | 等边对等角 |
| 等腰三角形三线合一 | 底边上的中线、高、顶角平分线重合 |
| 等边三角形各角都是60° | 等边三角形性质 |

### 数学示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <line x1="150" y1="20" x2="150" y2="130" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="3,2" />
  <text x="155" y="80" font-size="10" fill="var(--color-text-secondary)">对称轴</text>
  <path d="M80 120 L120 50 L150 120 Z" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" stroke-width="2" />
  <path d="M150 120 L180 50 L220 120 Z" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" stroke-width="2" />
  <text x="150" y="145" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">轴对称图形</text>
</svg>

### 例题解析

**问题**：等腰三角形的顶角为80°，求底角的度数。

**解答**：设底角为 $x$，根据三角形内角和：

$$ 80° + 2x = 180° $$
$$ 2x = 100° $$
$$ x = 50° $$

### 举一反三

**练习1**：等边三角形的每个内角是多少度？
- 答案：$180° ÷ 3 = 60°$

**练习2**：等腰三角形两边长分别为3和5，周长是多少？
- 答案：分两种情况：3+3+5=11或3+5+5=13

### 拓展知识

- 常见的轴对称图形：线段、角、等腰三角形、矩形、菱形、正方形、圆。
- 等腰三角形是**轴对称图形**，对称轴是底边上的中线（或高、顶角平分线）。
- 线段的垂直平分线是线段的**对称轴**。`
  },
  {
    id: 'math_014',
    title: '整式的乘法与因式分解',
    stage: 'middle',
    chapter: '整式的乘法与因式分解',
    tags: ['整式乘法', '幂的运算', '乘法公式', '因式分解'],
    content: `## 整式的乘法与因式分解

### 核心概念

**同底数幂的乘法**：底数相同的幂相乘。

**幂的乘方**：幂的指数再乘方。

**积的乘方**：积的每个因式分别乘方。

**乘法公式**：平方差公式、完全平方公式。

**因式分解**：把多项式化为几个整式的积的形式。

### 公式总结

| 公式 | 说明 |
|------|------|
| $a^m \\cdot a^n = a^{m+n}$ | 同底数幂相乘 |
| $(a^m)^n = a^{mn}$ | 幂的乘方 |
| $(ab)^n = a^n b^n$ | 积的乘方 |
| $a^m \\div a^n = a^{m-n}$（$a \\neq 0$） | 同底数幂相除 |
| $(a + b)(a - b) = a^2 - b^2$ | 平方差公式 |
| $(a \\pm b)^2 = a^2 \\pm 2ab + b^2$ | 完全平方公式 |

### 数学示意图

<svg width="300" height="120" viewBox="0 0 300 120">
  <rect x="40" y="20" width="80" height="30" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" />
  <text x="80" y="40" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">$a^2 - b^2$</text>
  <path d="M130 35 L150 35" stroke="var(--color-border)" stroke-width="2" marker-end="url(#arrow2)" />
  <rect x="160" y="20" width="100" height="30" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="210" y="40" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">$(a+b)(a-b)$</text>
  <text x="150" y="80" font-size="14" text-anchor="middle" fill="var(--color-text-secondary)">因式分解</text>
  <defs>
    <marker id="arrow2" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-border)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：计算 $(2x + 3)^2$

**解答**：根据完全平方公式：

$$ (2x + 3)^2 = (2x)^2 + 2 \\cdot 2x \\cdot 3 + 3^2 = 4x^2 + 12x + 9 $$

### 举一反三

**练习1**：计算 $(3x - 2)(3x + 2)$
- 答案：$9x^2 - 4$

**练习2**：分解因式 $x^2 - 6x + 9$
- 答案：$(x - 3)^2$

### 拓展知识

- 因式分解的方法：提公因式法、公式法、十字相乘法。
- 因式分解与整式乘法是**互逆运算**。
- 分解因式要分解到**不能再分解**为止。`
  },
  {
    id: 'math_015',
    title: '分式',
    stage: 'middle',
    chapter: '分式',
    tags: ['分式', '分式运算', '分式方程'],
    content: `## 分式

### 核心概念

**分式**：形如 $\\frac{A}{B}$（$A、B$ 是整式，$B$ 中含有字母且 $B \\neq 0$）的式子。

**分式的基本性质**：分式的分子与分母同乘（或除以）同一个不等于0的整式，分式的值不变。

**最简分式**：分子与分母没有公因式的分式。

**分式方程**：分母中含有未知数的方程。

### 公式总结

| 公式 | 说明 |
|------|------|
| $\\frac{A}{B} = \\frac{A \\cdot C}{B \\cdot C}$（$C \\neq 0$） | 分式基本性质 |
| $\\frac{A}{B} \\cdot \\frac{C}{D} = \\frac{AC}{BD}$ | 分式乘法 |
| $\\frac{A}{B} \\div \\frac{C}{D} = \\frac{A}{B} \\cdot \\frac{D}{C}$ | 分式除法 |
| $\\frac{A}{B} \\pm \\frac{C}{B} = \\frac{A \\pm C}{B}$ | 同分母分式加减法 |
| $\\frac{A}{B} \\pm \\frac{C}{D} = \\frac{AD \\pm BC}{BD}$ | 异分母分式加减法 |

### 数学示意图

<svg width="300" height="100" viewBox="0 0 300 100">
  <rect x="40" y="30" width="220" height="50" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" />
  <text x="150" y="60" font-size="14" text-anchor="middle" fill="var(--color-text-primary)">分式 $\\frac{A}{B}$（$B \\neq 0$）</text>
  <line x1="40" y1="70" x2="260" y2="70" stroke="var(--color-primary)" stroke-width="2" />
  <text x="150" y="90" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">分子 A | 分母 B</text>
</svg>

### 例题解析

**问题**：化简 $\\frac{x^2 - 4}{x^2 + 4x + 4}$

**解答**：

$$ \\frac{x^2 - 4}{x^2 + 4x + 4} = \\frac{(x + 2)(x - 2)}{(x + 2)^2} = \\frac{x - 2}{x + 2} $$

### 举一反三

**练习1**：计算 $\\frac{1}{x} + \\frac{1}{y}$
- 答案：$\\frac{y + x}{xy}$

**练习2**：解方程 $\\frac{2}{x} = \\frac{3}{x + 1}$
- 答案：$2(x + 1) = 3x$，$2x + 2 = 3x$，$x = 2$（检验：$x \\neq 0$，$x + 1 \\neq 0$）

### 拓展知识

- 分式有意义的条件：**分母不为0**。
- 分式的值为0的条件：**分子为0且分母不为0**。
- 解分式方程必须**检验**，防止产生增根。`
  },
  {
    id: 'math_016',
    title: '二次根式',
    stage: 'middle',
    chapter: '二次根式',
    tags: ['二次根式', '化简', '运算'],
    content: `## 二次根式

### 核心概念

**二次根式**：形如 $\\sqrt{a}$（$a \\geq 0$）的式子。

**最简二次根式**：被开方数不含分母，且不含能开得尽方的因数或因式。

**同类二次根式**：被开方数相同的最简二次根式。

### 公式总结

| 公式 | 说明 |
|------|------|
| $(\\sqrt{a})^2 = a$（$a \\geq 0$） | 二次根式性质1 |
| $\\sqrt{a^2} = |a|$ | 二次根式性质2 |
| $\\sqrt{a} \\cdot \\sqrt{b} = \\sqrt{ab}$（$a \\geq 0$，$b \\geq 0$） | 乘法法则 |
| $\\frac{\\sqrt{a}}{\\sqrt{b}} = \\sqrt{\\frac{a}{b}}$（$a \\geq 0$，$b > 0$） | 除法法则 |
| $a\\sqrt{c} \\pm b\\sqrt{c} = (a \\pm b)\\sqrt{c}$ | 加减法（合并同类二次根式） |

### 数学示意图

<svg width="300" height="100" viewBox="0 0 300 100">
  <rect x="60" y="30" width="180" height="50" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" />
  <text x="150" y="60" font-size="16" text-anchor="middle" fill="var(--color-text-primary)">$\\sqrt{a}$（$a \\geq 0$）</text>
  <text x="150" y="90" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">被开方数必须非负</text>
</svg>

### 例题解析

**问题**：化简 $\\sqrt{27} - \\sqrt{12} + \\sqrt{48}$

**解答**：

$$ \\sqrt{27} - \\sqrt{12} + \\sqrt{48} = 3\\sqrt{3} - 2\\sqrt{3} + 4\\sqrt{3} = 5\\sqrt{3} $$

### 举一反三

**练习1**：化简 $\\sqrt{50} + \\sqrt{32}$
- 答案：$5\\sqrt{2} + 4\\sqrt{2} = 9\\sqrt{2}$

**练习2**：计算 $(\\sqrt{2} + \\sqrt{3})(\\sqrt{2} - \\sqrt{3})$
- 答案：$2 - 3 = -1$

### 拓展知识

- 二次根式的双重非负性：$\\sqrt{a} \\geq 0$ 且 $a \\geq 0$。
- 分母有理化：将分母中的根号去掉。
- 常见分母有理化：$\\frac{1}{\\sqrt{a}} = \\frac{\\sqrt{a}}{a}$，$\\frac{1}{\\sqrt{a} \\pm \\sqrt{b}} = \\frac{\\sqrt{a} \\mp \\sqrt{b}}{a - b}$。`
  },
  {
    id: 'math_017',
    title: '勾股定理',
    stage: 'middle',
    chapter: '勾股定理',
    tags: ['勾股定理', '直角三角形', '逆定理'],
    content: `## 勾股定理

### 核心概念

**勾股定理**：直角三角形两直角边的平方和等于斜边的平方。

**勾股数**：满足 $a^2 + b^2 = c^2$ 的三个正整数。

**勾股定理的逆定理**：如果三角形的三边满足 $a^2 + b^2 = c^2$，则这个三角形是直角三角形。

### 公式总结

| 公式 | 说明 |
|------|------|
| $a^2 + b^2 = c^2$ | 勾股定理（c为斜边） |
| $c = \\sqrt{a^2 + b^2}$ | 求斜边 |
| $a = \\sqrt{c^2 - b^2}$ | 求直角边 |
| 常见勾股数：3,4,5；5,12,13；7,24,25 | 常用勾股数 |

### 数学示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <path d="M50 150 L170 150 L50 70 Z" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" stroke-width="2" />
  <circle cx="50" cy="150" r="4" fill="var(--color-text-primary)" />
  <text x="45" y="160" font-size="10" fill="var(--color-text-primary)">C</text>
  <circle cx="170" cy="150" r="4" fill="var(--color-text-primary)" />
  <text x="175" y="160" font-size="10" fill="var(--color-text-primary)">B</text>
  <circle cx="50" cy="70" r="4" fill="var(--color-text-primary)" />
  <text x="45" y="65" font-size="10" fill="var(--color-text-primary)">A</text>
  <text x="65" y="115" font-size="10" fill="var(--color-text-secondary)">a</text>
  <text x="110" y="155" font-size="10" fill="var(--color-text-secondary)">b</text>
  <text x="85" y="90" font-size="10" fill="var(--color-text-secondary)">c</text>
  <rect x="40" y="140" width="10" height="10" fill="var(--color-text-primary)" />
  <text x="110" y="120" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">$a^2 + b^2 = c^2$</text>
</svg>

### 例题解析

**问题**：在直角三角形中，两直角边分别为3cm和4cm，求斜边的长度。

**解答**：根据勾股定理：

$$ c = \\sqrt{a^2 + b^2} = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5cm $$

### 举一反三

**练习1**：直角三角形斜边为13cm，一条直角边为5cm，求另一条直角边。
- 答案：$\\sqrt{13^2 - 5^2} = \\sqrt{144} = 12cm$

**练习2**：判断边长为6、8、10的三角形是否为直角三角形。
- 答案：$6^2 + 8^2 = 36 + 64 = 100 = 10^2$，是直角三角形

### 拓展知识

- 勾股定理是**几何学的基石**，在测量、建筑等领域有广泛应用。
- 勾股定理又称**毕达哥拉斯定理**。
- 勾股定理的逆定理可用于**判断三角形形状**。`
  },
  {
    id: 'math_018',
    title: '平行四边形',
    stage: 'middle',
    chapter: '平行四边形',
    tags: ['平行四边形', '矩形', '菱形', '正方形'],
    content: `## 平行四边形

### 核心概念

**平行四边形**：两组对边分别平行的四边形。

**矩形**：有一个角是直角的平行四边形。

**菱形**：有一组邻边相等的平行四边形。

**正方形**：有一个角是直角且有一组邻边相等的平行四边形。

### 公式总结

| 图形 | 性质 |
|------|------|
| 平行四边形 | 对边平行且相等，对角相等，对角线互相平分 |
| 矩形 | 平行四边形性质 + 四个角都是直角 + 对角线相等 |
| 菱形 | 平行四边形性质 + 四条边都相等 + 对角线互相垂直 |
| 正方形 | 矩形性质 + 菱形性质 |

### 数学示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <path d="M50 60 L150 30 L250 60 L150 90 Z" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" stroke-width="2" />
  <text x="150" y="55" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">平行四边形</text>
  <path d="M50 120 L150 120 L150 160 L50 160 Z" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" stroke-width="2" />
  <text x="100" y="145" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">矩形</text>
</svg>

### 例题解析

**问题**：平行四边形的一个内角为60°，求其他三个内角的度数。

**解答**：平行四边形对角相等，邻角互补。
- 与60°角相对的角：60°
- 与60°角相邻的两个角：180° - 60° = 120°

所以四个内角分别为60°、120°、60°、120°。

### 举一反三

**练习1**：矩形的对角线长为10cm，一边长为6cm，求另一边长。
- 答案：$\\sqrt{10^2 - 6^2} = \\sqrt{64} = 8cm$

**练习2**：菱形的对角线长分别为6cm和8cm，求菱形的边长。
- 答案：$\sqrt{3^2 + 4^2} = 5cm$

### 拓展知识

- 平行四边形是中心对称图形，对称中心是对角线的交点。
- 矩形、菱形、正方形既是中心对称图形，又是轴对称图形。
- 正方形是最特殊的平行四边形，具有矩形和菱形的所有性质。`
  },
  {
    id: 'math_019',
    title: '一次函数',
    stage: 'middle',
    chapter: '一次函数',
    tags: ['一次函数', '正比例函数', '图像', '性质'],
    content: `## 一次函数

### 核心概念

**函数**：在一个变化过程中，有两个变量x和y，如果给定一个x值，相应地就确定唯一的y值，那么称y是x的函数。

**一次函数**：形如 $y = kx + b$（$k、b$ 为常数，$k \\neq 0$）的函数。

### 公式总结

| 公式 | 说明 |
|------|------|
| $y = kx + b$（$k \\neq 0$） | 一次函数一般形式 |

### 数学示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <line x1="20" y1="100" x2="280" y2="100" stroke="var(--color-border)" stroke-width="1" />
  <line x1="150" y1="20" x2="150" y2="130" stroke="var(--color-border)" stroke-width="1" />
  <path d="M40 120 L260 40" stroke="var(--color-primary)" stroke-width="2" />
</svg>

### 例题解析

**问题**：求过点(1, 3)和(3, 7)的直线方程。

**解答**：斜率 $k = 2$，化简得：$y = 2x + 1$

### 举一反三

**练习1**：一次函数 $y = -2x + 5$ 与x轴交点。
- 答案：$(2.5, 0)$

**练习2**：一次函数 $y = 3x - 2$ 经过哪些象限？
- 答案：第一、三、四象限

### 拓展知识

- $k > 0$ 时，y随x的增大而增大。`
  },
  {
    id: 'math_020',
    title: '集合与常用逻辑用语',
    stage: 'high',
    chapter: '必修一·集合与常用逻辑用语',
    tags: ['集合', '子集', '交集', '并集', '补集', '充分条件', '必要条件'],
    content: `## 集合与常用逻辑用语

### 核心概念

**集合**：指定的某些对象的全体。集合中的元素具有确定性、互异性、无序性。

**子集**：如果集合A的任意一个元素都是集合B的元素，则A是B的子集，记为 $A \\subseteq B$。

**空集**：不含任何元素的集合，记为 $\\varnothing$。空集是任何集合的子集。

**交集**：由所有属于集合A且属于集合B的元素组成的集合，记为 $A \\cap B$。

**并集**：由所有属于集合A或属于集合B的元素组成的集合，记为 $A \\cup B$。

**补集**：设U是全集，A是U的子集，由所有属于U但不属于A的元素组成的集合，记为 $\\complement_U A$。

**充分条件**：若 $p \\Rightarrow q$，则p是q的充分条件。

**必要条件**：若 $q \\Rightarrow p$，则p是q的必要条件。

**充要条件**：若 $p \\Leftrightarrow q$，则p是q的充要条件。

### 公式总结

| 公式 | 说明 |
|------|------|
| $A \\cap B = \\{x \\mid x \\in A 且 x \\in B\\}$ | 交集定义 |
| $A \\cup B = \\{x \\mid x \\in A 或 x \\in B\\}$ | 并集定义 |
| $\\complement_U A = \\{x \\mid x \\in U 且 x \\notin A\\}$ | 补集定义 |
| $A \\subseteq B \\Leftrightarrow A \\cap B = A$ | 子集判定 |
| $A \\subseteq B \\Leftrightarrow A \\cup B = B$ | 子集判定 |
| $(\\complement_U A) \\cap (\\complement_U B) = \\complement_U(A \\cup B)$ | 德摩根定律 |
| $(\\complement_U A) \\cup (\\complement_U B) = \\complement_U(A \\cap B)$ | 德摩根定律 |

### 数学示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <circle cx="100" cy="75" r="40" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" />
  <circle cx="180" cy="75" r="40" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" />
  <text x="100" y="75" font-size="14" text-anchor="middle" fill="var(--color-text-primary)">A</text>
  <text x="180" y="75" font-size="14" text-anchor="middle" fill="var(--color-text-primary)">B</text>
  <text x="140" y="75" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">A∩B</text>
  <text x="60" y="75" font-size="10" fill="var(--color-text-secondary)">A-B</text>
  <text x="220" y="75" font-size="10" fill="var(--color-text-secondary)">B-A</text>
</svg>

### 例题解析

**问题**：已知集合 $A = \\{x \\mid -2 < x < 3\\}$，$B = \\{x \\mid x \\geq 1\\}$，求 $A \\cap B$ 和 $A \\cup B$。

**解答**：

$A \\cap B = \\{x \\mid 1 \\leq x < 3\\}$

$A \\cup B = \\{x \\mid x > -2\\}$

### 举一反三

**练习1**：设全集 $U = \\{1,2,3,4,5\\}$，$A = \\{1,2,3\\}$，$B = \\{3,4,5\\}$，求 $\\complement_U(A \\cap B)$。
- 答案：$A \\cap B = \\{3\\}$，$\\complement_U(A \\cap B) = \\{1,2,4,5\\}$

**练习2**："$x > 2$"是"$x > 1$"的什么条件？
- 答案：充分不必要条件

### 拓展知识

- 常用数集：自然数集 $\\mathbb{N}$，整数集 $\\mathbb{Z}$，有理数集 $\\mathbb{Q}$，实数集 $\\mathbb{R}$。
- 有限集元素个数：若$|A|=m$，$|B|=n$，则子集个数为$2^m$，真子集个数为$2^m-1$。
- 充分条件和必要条件可以用集合关系来理解：若$A \\subseteq B$，则"$x \\in A$"是"$x \\in B$"的充分条件。`
  },
  {
    id: 'math_021',
    title: '一元二次函数、方程和不等式',
    stage: 'high',
    chapter: '必修一·一元二次函数、方程和不等式',
    tags: ['一元二次方程', '一元二次不等式', '二次函数', '判别式', '韦达定理'],
    content: `## 一元二次函数、方程和不等式

### 核心概念

**一元二次方程**：$ax^2 + bx + c = 0$（$a \\neq 0$）。

**一元二次不等式**：$ax^2 + bx + c > 0$ 或 $ax^2 + bx + c < 0$。

**二次函数**：$y = ax^2 + bx + c$（$a \\neq 0$），图像是抛物线。

**判别式**：$\\Delta = b^2 - 4ac$，决定方程根的个数。

**韦达定理**：方程两根之和与两根之积与系数的关系。

### 公式总结

| 公式 | 说明 |
|------|------|
| $ax^2 + bx + c = 0$（$a \\neq 0$） | 一元二次方程标准形式 |
| $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ | 求根公式 |
| $\\Delta = b^2 - 4ac$ | 判别式 |
| $\\Delta > 0$：两个不相等实根 | 判别式与根的关系 |
| $\\Delta = 0$：两个相等实根 | 判别式与根的关系 |
| $\\Delta < 0$：无实根 | 判别式与根的关系 |
| $x_1 + x_2 = -\\frac{b}{a}$ | 韦达定理（和） |
| $x_1 \\cdot x_2 = \\frac{c}{a}$ | 韦达定理（积） |
| $y = a(x - h)^2 + k$ | 顶点式（顶点$(h,k)$） |
| $x = -\\frac{b}{2a}$ | 对称轴 |

### 数学示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <line x1="20" y1="100" x2="280" y2="100" stroke="var(--color-border)" stroke-width="1" />
  <line x1="150" y1="20" x2="150" y2="160" stroke="var(--color-border)" stroke-width="1" />
  <path d="M50 140 Q150 40 250 140" stroke="var(--color-primary)" stroke-width="2" fill="none" />
  <circle cx="150" cy="40" r="4" fill="var(--color-primary)" />
  <text x="155" y="45" font-size="10" fill="var(--color-text-secondary)">顶点</text>
  <text x="155" y="105" font-size="10" fill="var(--color-text-secondary)">对称轴</text>
  <text x="150" y="175" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">抛物线 $y = ax^2 + bx + c$</text>
</svg>

### 例题解析

**问题**：解方程 $x^2 - 5x + 6 = 0$，并求二次函数 $y = x^2 - 5x + 6$ 的顶点坐标。

**解答**：

判别式：$\\Delta = (-5)^2 - 4 \\times 1 \\times 6 = 25 - 24 = 1 > 0$

根：$x = \\frac{5 \\pm \\sqrt{1}}{2} = \\frac{5 \\pm 1}{2}$，即 $x_1 = 3$，$x_2 = 2$

顶点横坐标：$x = -\\frac{-5}{2} = \\frac{5}{2}$

顶点纵坐标：$y = (\\frac{5}{2})^2 - 5 \\times \\frac{5}{2} + 6 = \\frac{25}{4} - \\frac{25}{2} + 6 = -\\frac{1}{4}$

顶点坐标：$(\\frac{5}{2}, -\\frac{1}{4})$

### 举一反三

**练习1**：解不等式 $x^2 - 3x - 4 > 0$
- 答案：$(x - 4)(x + 1) > 0$，解集为 $(-\\infty, -1) \\cup (4, +\\infty)$

**练习2**：已知方程 $x^2 + px + q = 0$ 的两根为2和3，求p和q。
- 答案：$p = -(2+3) = -5$，$q = 2 \\times 3 = 6$

### 拓展知识

- 解一元二次不等式的步骤：求根、画图、写解集。
- 当$a > 0$时，抛物线开口向上；当$a < 0$时，抛物线开口向下。
- 一元二次不等式恒成立问题：$ax^2 + bx + c > 0$恒成立需$a > 0$且$\\Delta < 0$。`
  },
  {
    id: 'math_022',
    title: '函数的概念与性质',
    stage: 'high',
    chapter: '必修一·函数的概念与性质',
    tags: ['函数', '定义域', '值域', '单调性', '奇偶性', '周期性'],
    content: `## 函数的概念与性质

### 核心概念

**函数**：设A、B是非空的数集，如果按照某种确定的对应关系f，使对于集合A中的任意一个数x，在集合B中都有唯一确定的数f(x)和它对应，那么就称$f: A \\to B$为从集合A到集合B的一个函数。

**定义域**：自变量x的取值范围。

**值域**：函数值f(x)的取值范围。

**单调性**：对于定义域I内某个区间D上的任意两个自变量$x_1, x_2$，若$x_1 < x_2$时都有$f(x_1) < f(x_2)$，则f在D上是增函数；若$x_1 < x_2$时都有$f(x_1) > f(x_2)$，则f在D上是减函数。

**奇偶性**：若$f(-x) = f(x)$，则f是偶函数；若$f(-x) = -f(x)$，则f是奇函数。

**周期性**：若存在非零常数T，使得$f(x + T) = f(x)$对定义域内任意x都成立，则T是f的一个周期。

### 公式总结

| 公式 | 说明 |
|------|------|
| $y = f(x)$ | 函数表示法 |
| $f(-x) = f(x)$ | 偶函数定义 |
| $f(-x) = -f(x)$ | 奇函数定义 |
| $f(x + T) = f(x)$ | 周期函数定义 |
| $(f \\circ g)(x) = f(g(x))$ | 复合函数 |

### 数学示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <line x1="30" y1="100" x2="270" y2="100" stroke="var(--color-border)" stroke-width="1" />
  <line x1="150" y1="20" x2="150" y2="130" stroke="var(--color-border)" stroke-width="1" />
  <path d="M50 120 L150 60 L250 120" stroke="var(--color-primary)" stroke-width="2" fill="none" />
  <text x="150" y="140" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">偶函数（关于y轴对称）</text>
</svg>

### 例题解析

**问题**：判断函数 $f(x) = x^3 - x$ 的奇偶性，并证明它是奇函数。

**解答**：

定义域：$\\mathbb{R}$，关于原点对称。

$f(-x) = (-x)^3 - (-x) = -x^3 + x = -(x^3 - x) = -f(x)$

所以$f(x)$是奇函数。

### 举一反三

**练习1**：判断函数 $f(x) = x^2 + 1$ 的奇偶性。
- 答案：$f(-x) = (-x)^2 + 1 = x^2 + 1 = f(x)$，是偶函数

**练习2**：证明函数 $f(x) = x + \\frac{1}{x}$ 在$(0,1)$上是减函数。
- 提示：任取$x_1 < x_2 \\in (0,1)$，计算$f(x_1) - f(x_2) = (x_1 - x_2)(1 - \\frac{1}{x_1x_2}) > 0$

### 拓展知识

- 奇函数的图像关于**原点对称**，偶函数的图像关于**y轴对称**。
- 单调函数一定**存在反函数**，反函数与原函数关于直线$y = x$对称。
- 常见周期函数：正弦函数、余弦函数周期为$2\\pi$，正切函数周期为$\\pi$。`
  },
  {
    id: 'math_023',
    title: '指数函数与对数函数',
    stage: 'high',
    chapter: '必修一·指数函数与对数函数',
    tags: ['指数函数', '对数函数', '指数幂', '对数运算', '换底公式'],
    content: `## 指数函数与对数函数

### 核心概念

**指数幂**：$a^n$（n为整数），$a^{\\frac{m}{n}} = \\sqrt[n]{a^m}$（n为正整数）。

**指数函数**：$y = a^x$（$a > 0$且$a \\neq 1$）。

**对数**：如果$a^x = N$（$a > 0$且$a \\neq 1$），那么x叫做以a为底N的对数，记为$\\log_a N = x$。

**对数函数**：$y = \\log_a x$（$a > 0$且$a \\neq 1$）。

**自然对数**：以e为底的对数，记为$\\ln x$（$e \\approx 2.718$）。

**常用对数**：以10为底的对数，记为$\\lg x$。

### 公式总结

| 公式 | 说明 |
|------|------|
| $a^m \\cdot a^n = a^{m+n}$ | 同底数幂相乘 |
| $\\frac{a^m}{a^n} = a^{m-n}$ | 同底数幂相除 |
| $(a^m)^n = a^{mn}$ | 幂的乘方 |
| $\\log_a(MN) = \\log_a M + \\log_a N$ | 对数乘法法则 |
| $\\log_a(\\frac{M}{N}) = \\log_a M - \\log_a N$ | 对数除法法则 |
| $\\log_a M^n = n\\log_a M$ | 对数幂法则 |
| $\\log_a b = \\frac{\\log_c b}{\\log_c a}$ | 换底公式 |
| $\\log_a b \\cdot \\log_b a = 1$ | 对数倒数关系 |

### 数学示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <line x1="30" y1="150" x2="270" y2="150" stroke="var(--color-border)" stroke-width="1" />
  <line x1="40" y1="20" x2="40" y2="150" stroke="var(--color-border)" stroke-width="1" />
  <path d="M40 130 Q100 80 200 40" stroke="var(--color-primary)" stroke-width="2" fill="none" />
  <text x="220" y="50" font-size="10" fill="var(--color-text-secondary)">$y = a^x(a > 1)$</text>
  <path d="M40 40 Q100 80 200 130" stroke="var(--color-border)" stroke-width="2" stroke-dasharray="3,2" fill="none" />
  <text x="220" y="130" font-size="10" fill="var(--color-text-secondary)">$y = a^x(0 < a < 1)$</text>
  <text x="45" y="130" font-size="10" fill="var(--color-text-secondary)">1</text>
</svg>

### 例题解析

**问题**：计算 $\\log_2 8 + \\log_2 4 - \\log_2 2$

**解答**：

$$ \\log_2 8 + \\log_2 4 - \\log_2 2 = \\log_2(\\frac{8 \\times 4}{2}) = \\log_2 16 = 4 $$

### 举一反三

**练习1**：计算 $2^{\\log_2 5} + \\log_3 9$
- 答案：$5 + 2 = 7$

**练习2**：解方程 $2^x = 8$
- 答案：$x = \\log_2 8 = 3$

### 拓展知识

- 指数函数和对数函数互为**反函数**，图像关于直线$y = x$对称。
- 当$a > 1$时，指数函数和对数函数都是**增函数**；当$0 < a < 1$时，都是**减函数**。
- 指数函数的值域是$(0, +\\infty)$，对数函数的定义域是$(0, +\\infty)$。`
  },
  {
    id: 'math_024',
    title: '三角函数',
    stage: 'high',
    chapter: '必修一·三角函数',
    tags: ['三角函数', '正弦', '余弦', '正切', '三角恒等变换', '三角函数图像'],
    content: `## 三角函数

### 核心概念

**任意角**：平面内一条射线绕端点旋转形成的图形，逆时针旋转为正角，顺时针旋转为负角。

**弧度制**：长度等于半径长的弧所对的圆心角叫做1弧度的角，$\\pi$弧度 = 180°。

**三角函数定义**：设角$\\alpha$终边上一点$P(x,y)$，$r = \\sqrt{x^2 + y^2}$，则$\\sin\\alpha = \\frac{y}{r}$，$\\cos\\alpha = \\frac{x}{r}$，$\\tan\\alpha = \\frac{y}{x}$。

**同角三角函数关系**：$\\sin^2\\alpha + \\cos^2\\alpha = 1$，$\\tan\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}$。

**诱导公式**：将任意角的三角函数转化为锐角三角函数。

**和差公式**：$\\sin(\\alpha \\pm \\beta)$，$\\cos(\\alpha \\pm \\beta)$，$\\tan(\\alpha \\pm \\beta)$。

### 公式总结

| 公式 | 说明 |
|------|------|
| $180° = \\pi$ 弧度 | 角度与弧度换算 |
| $\\sin^2\\alpha + \\cos^2\\alpha = 1$ | 同角三角函数关系 |
| $\\tan\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha}$ | 同角三角函数关系 |
| $\\sin(\\alpha + \\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$ | 和角公式 |
| $\\cos(\\alpha + \\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta$ | 和角公式 |
| $\\tan(\\alpha + \\beta) = \\frac{\\tan\\alpha + \\tan\\beta}{1 - \\tan\\alpha\\tan\\beta}$ | 和角公式 |
| $\\sin2\\alpha = 2\\sin\\alpha\\cos\\alpha$ | 二倍角公式 |
| $\\cos2\\alpha = \\cos^2\\alpha - \\sin^2\\alpha = 2\\cos^2\\alpha - 1 = 1 - 2\\sin^2\\alpha$ | 二倍角公式 |
| $\\tan2\\alpha = \\frac{2\\tan\\alpha}{1 - \\tan^2\\alpha}$ | 二倍角公式 |

### 数学示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <circle cx="150" cy="90" r="60" fill="none" stroke="var(--color-border)" stroke-width="1" />
  <line x1="150" y1="90" x2="210" y2="90" stroke="var(--color-primary)" stroke-width="2" />
  <line x1="150" y1="90" x2="180" y2="50" stroke="var(--color-primary)" stroke-width="2" />
  <circle cx="180" cy="50" r="4" fill="var(--color-primary)" />
  <text x="190" y="45" font-size="10" fill="var(--color-text-secondary)">P(x,y)</text>
  <text x="180" y="75" font-size="10" fill="var(--color-text-secondary)">r</text>
  <text x="150" y="155" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">三角函数定义</text>
  <text x="150" y="95" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">O</text>
</svg>

### 例题解析

**问题**：已知 $\\sin\\alpha = \\frac{3}{5}$，$\\alpha$ 在第二象限，求 $\\cos\\alpha$ 和 $\\tan\\alpha$。

**解答**：

由 $\\sin^2\\alpha + \\cos^2\\alpha = 1$：

$\\cos^2\\alpha = 1 - (\\frac{3}{5})^2 = 1 - \\frac{9}{25} = \\frac{16}{25}$

因为$\\alpha$在第二象限，所以$\\cos\\alpha < 0$，$\\cos\\alpha = -\\frac{4}{5}$

$\\tan\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha} = \\frac{\\frac{3}{5}}{-\\frac{4}{5}} = -\\frac{3}{4}$

### 举一反三

**练习1**：计算 $\\sin30° + \\cos60° + \\tan45°$
- 答案：$\\frac{1}{2} + \\frac{1}{2} + 1 = 2$

**练习2**：化简 $\\sin(\\pi - \\alpha) + \\cos(\\frac{\\pi}{2} - \\alpha)$
- 答案：$\\sin\\alpha + \\sin\\alpha = 2\\sin\\alpha$

### 拓展知识

- 三角函数的周期性：$\\sin$、$\\cos$周期为$2\\pi$，$\\tan$周期为$\\pi$。
- 三角函数的奇偶性：$\\sin$是奇函数，$\\cos$是偶函数，$\\tan$是奇函数。
- 辅助角公式：$a\\sin\\alpha + b\\cos\\alpha = \\sqrt{a^2 + b^2}\\sin(\\alpha + \\varphi)$。`
  },
  {
    id: 'math_025',
    title: '平面向量及其应用',
    stage: 'high',
    chapter: '必修二·平面向量及其应用',
    tags: ['平面向量', '向量运算', '数量积', '向量共线', '向量垂直'],
    content: `## 平面向量及其应用

### 核心概念

**向量**：既有大小又有方向的量，记为$\\vec{a}$或$\\overrightarrow{AB}$。

**向量的模**：向量的大小，记为$|\\vec{a}|$。

**零向量**：模为0的向量，记为$\\vec{0}$。

**单位向量**：模为1的向量。

**相等向量**：大小相等且方向相同的向量。

**相反向量**：大小相等且方向相反的向量。

**向量加法**：三角形法则、平行四边形法则。

**向量数量积**：$\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta$，其中$\\theta$是两向量的夹角。

### 公式总结

| 公式 | 说明 |
|------|------|
| $\\vec{a} + \\vec{b} = (x_1 + x_2, y_1 + y_2)$ | 向量加法（坐标形式） |
| $\\vec{a} - \\vec{b} = (x_1 - x_2, y_1 - y_2)$ | 向量减法（坐标形式） |
| $k\\vec{a} = (kx, ky)$ | 数乘向量（坐标形式） |
| $|\\vec{a}| = \\sqrt{x^2 + y^2}$ | 向量的模（坐标形式） |
| $\\vec{a} \\cdot \\vec{b} = x_1x_2 + y_1y_2$ | 数量积（坐标形式） |
| $\\cos\\theta = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}||\\vec{b}|}$ | 夹角公式 |
| $\\vec{a} \\parallel \\vec{b} \\Leftrightarrow \\vec{a} = k\\vec{b}$ | 向量共线条件 |
| $\\vec{a} \\perp \\vec{b} \\Leftrightarrow \\vec{a} \\cdot \\vec{b} = 0$ | 向量垂直条件 |
| $|\\vec{a} \\times \\vec{b}| = |\\vec{a}||\\vec{b}|\\sin\\theta$ | 向量积的模 |

### 数学示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <line x1="50" y1="100" x2="120" y2="60" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#arrow)" />
  <text x="70" y="85" font-size="12" fill="var(--color-text-primary)">$\\vec{a}$</text>
  <line x1="120" y1="60" x2="180" y2="100" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#arrow)" />
  <text x="150" y="80" font-size="12" fill="var(--color-text-primary)">$\\vec{b}$</text>
  <line x1="50" y1="100" x2="180" y2="100" stroke="var(--color-border)" stroke-width="2" stroke-dasharray="3,2" marker-end="url(#arrow)" />
  <text x="110" y="110" font-size="12" fill="var(--color-text-secondary)">$\\vec{a} + \\vec{b}$</text>
  <circle cx="50" cy="100" r="4" fill="var(--color-text-primary)" />
  <text x="45" y="105" font-size="10" fill="var(--color-text-primary)">O</text>
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-primary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：已知向量$\\vec{a} = (1, 2)$，$\\vec{b} = (3, -4)$，求$\\vec{a} + \\vec{b}$、$|\\vec{a}|$和$\\vec{a} \\cdot \\vec{b}$。

**解答**：

$\\vec{a} + \\vec{b} = (1 + 3, 2 + (-4)) = (4, -2)$

$|\\vec{a}| = \\sqrt{1^2 + 2^2} = \\sqrt{5}$

$\\vec{a} \\cdot \\vec{b} = 1 \\times 3 + 2 \\times (-4) = 3 - 8 = -5$

### 举一反三

**练习1**：已知$\\vec{a} = (2, 3)$，$\\vec{b} = (4, k)$，若$\\vec{a} \\perp \\vec{b}$，求k。
- 答案：$\\vec{a} \\cdot \\vec{b} = 8 + 3k = 0$，$k = -\\frac{8}{3}$

**练习2**：求向量$\\vec{a} = (1, \\sqrt{3})$的单位向量。
- 答案：$|\\vec{a}| = 2$，单位向量为$(\\frac{1}{2}, \\frac{\\sqrt{3}}{2})$

### 拓展知识

- 向量的线性运算满足交换律、结合律和分配律。
- 向量数量积不满足结合律：$(\\vec{a} \\cdot \\vec{b})\\vec{c} \\neq \\vec{a}(\\vec{b} \\cdot \\vec{c})$。
- 向量在几何中的应用：证明平行、垂直，计算夹角、距离等。`
  },
  {
    id: 'math_026',
    title: '复数',
    stage: 'high',
    chapter: '必修二·复数',
    tags: ['复数', '虚数单位', '共轭复数', '复数运算', '复数几何意义'],
    content: `## 复数

### 核心概念

**虚数单位**：$i$，满足$i^2 = -1$。

**复数**：形如$z = a + bi$（$a,b \\in \\mathbb{R}$）的数，其中$a$是实部，$b$是虚部。

**实数**：当$b = 0$时，复数就是实数。

**纯虚数**：当$a = 0$且$b \\neq 0$时，复数是纯虚数。

**共轭复数**：复数$z = a + bi$的共轭复数为$\\overline{z} = a - bi$。

**复数的模**：$|z| = \\sqrt{a^2 + b^2}$。

**复数的几何意义**：复数$z = a + bi$对应复平面上的点$(a, b)$。

### 公式总结

| 公式 | 说明 |
|------|------|
| $i^2 = -1$ | 虚数单位定义 |
| $(a + bi) + (c + di) = (a + c) + (b + d)i$ | 复数加法 |
| $(a + bi) - (c + di) = (a - c) + (b - d)i$ | 复数减法 |
| $(a + bi)(c + di) = (ac - bd) + (ad + bc)i$ | 复数乘法 |
| $\\frac{a + bi}{c + di} = \\frac{(a + bi)(c - di)}{c^2 + d^2}$ | 复数除法（分母实数化） |
| $|z| = \\sqrt{a^2 + b^2}$ | 复数的模 |
| $z \\cdot \\overline{z} = |z|^2$ | 复数与共轭复数的乘积 |
| $|z_1z_2| = |z_1||z_2|$ | 复数模的性质 |

### 数学示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <line x1="30" y1="100" x2="270" y2="100" stroke="var(--color-border)" stroke-width="1" />
  <line x1="150" y1="20" x2="150" y2="160" stroke="var(--color-border)" stroke-width="1" />
  <text x="275" y="105" font-size="10" fill="var(--color-text-secondary)">实轴</text>
  <text x="155" y="25" font-size="10" fill="var(--color-text-secondary)">虚轴</text>
  <circle cx="190" cy="60" r="4" fill="var(--color-primary)" />
  <text x="200" y="65" font-size="12" fill="var(--color-text-primary)">z = a + bi</text>
  <line x1="150" y1="100" x2="190" y2="60" stroke="var(--color-primary)" stroke-width="2" />
  <text x="170" y="85" font-size="10" fill="var(--color-text-secondary)">|z|</text>
  <text x="150" y="105" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">O</text>
</svg>

### 例题解析

**问题**：计算$(2 + 3i)(1 - i)$。

**解答**：

$$ (2 + 3i)(1 - i) = 2 \\times 1 + 2 \\times (-i) + 3i \\times 1 + 3i \\times (-i) $$
$$ = 2 - 2i + 3i - 3i^2 $$
$$ = 2 + i - 3(-1) $$
$$ = 2 + i + 3 $$
$$ = 5 + i $$

### 举一反三

**练习1**：计算$\\frac{1 + i}{1 - i}$。
- 答案：$\\frac{(1 + i)^2}{(1 - i)(1 + i)} = \\frac{1 + 2i + i^2}{2} = \\frac{2i}{2} = i$

**练习2**：求复数$z = 3 + 4i$的模和共轭复数。
- 答案：$|z| = 5$，$\\overline{z} = 3 - 4i$

### 拓展知识

- 复数域是实数域的**代数闭包**，任何多项式方程在复数域内都有解。
- 欧拉公式：$e^{i\\theta} = \\cos\\theta + i\\sin\\theta$，当$\\theta = \\pi$时，$e^{i\\pi} + 1 = 0$。
- 复数的三角形式：$z = r(\\cos\\theta + i\\sin\\theta)$，其中$r = |z|$，$\\theta$是辐角。`
  },
  {
    id: 'math_027',
    title: '立体几何初步',
    stage: 'high',
    chapter: '必修二·立体几何初步',
    tags: ['立体几何', '空间几何体', '点线面关系', '体积', '表面积'],
    content: `## 立体几何初步

### 核心概念

**空间几何体**：由点、线、面组成的三维图形，包括柱体、锥体、台体、球体等。

**棱柱**：有两个面互相平行，其余各面都是四边形，并且每相邻两个四边形的公共边都互相平行。

**棱锥**：有一个面是多边形，其余各面都是有一个公共顶点的三角形。

**圆柱**：以矩形的一边所在直线为旋转轴，其余三边旋转形成的曲面所围成的几何体。

**圆锥**：以直角三角形的一条直角边所在直线为旋转轴，其余两边旋转形成的曲面所围成的几何体。

**球**：以半圆的直径所在直线为旋转轴，半圆面旋转一周形成的几何体。

**异面直线**：不同在任何一个平面内的两条直线。

**直线与平面平行**：直线与平面没有公共点。

**直线与平面垂直**：直线与平面内的所有直线都垂直。

### 公式总结

| 公式 | 说明 |
|------|------|
| $V_{棱柱} = Sh$ | 棱柱体积（S为底面积，h为高） |
| $V_{棱锥} = \\frac{1}{3}Sh$ | 棱锥体积 |
| $V_{圆柱} = \\pi r^2h$ | 圆柱体积 |
| $V_{圆锥} = \\frac{1}{3}\\pi r^2h$ | 圆锥体积 |
| $V_{球} = \\frac{4}{3}\\pi R^3$ | 球体积 |
| $S_{圆柱侧} = 2\\pi rh$ | 圆柱侧面积 |
| $S_{圆锥侧} = \\pi rl$ | 圆锥侧面积（l为母线长） |
| $S_{球} = 4\\pi R^2$ | 球表面积 |

### 数学示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <path d="M80 150 L120 150 L140 110 L100 110 Z" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" />
  <path d="M100 110 L140 110 L160 60 L120 60 Z" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" />
  <path d="M80 150 L100 110 L120 60" stroke="var(--color-primary)" stroke-width="1" />
  <path d="M120 150 L140 110 L160 60" stroke="var(--color-primary)" stroke-width="1" />
  <text x="120" y="170" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">四棱锥</text>
  <ellipse cx="240" cy="100" rx="40" ry="40" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" />
  <text x="240" y="160" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">球体</text>
</svg>

### 例题解析

**问题**：一个圆柱的底面半径为2，高为5，求圆柱的体积和侧面积。

**解答**：

体积：$V = \\pi r^2h = \\pi \\times 2^2 \\times 5 = 20\\pi$

侧面积：$S = 2\\pi rh = 2\\pi \\times 2 \\times 5 = 20\\pi$

### 举一反三

**练习1**：一个圆锥的底面半径为3，高为4，求圆锥的体积和母线长。
- 答案：$V = \\frac{1}{3}\\pi \\times 9 \\times 4 = 12\\pi$，母线长$l = \\sqrt{3^2 + 4^2} = 5$

**练习2**：一个球的体积为$36\\pi$，求球的半径和表面积。
- 答案：$\\frac{4}{3}\\pi R^3 = 36\\pi$，$R = 3$，表面积$S = 4\\pi \\times 9 = 36\\pi$

### 拓展知识

- 空间中点、线、面的位置关系：平行、相交、异面。
- 平面的基本性质：公理1、公理2、公理3及推论。
- 空间角：异面直线所成角、直线与平面所成角、二面角。`
  },
  {
    id: 'math_028',
    title: '统计',
    stage: 'high',
    chapter: '必修二·统计',
    tags: ['统计', '抽样方法', '统计图表', '数字特征', '回归分析'],
    content: `## 统计

### 核心概念

**总体**：考察对象的全体。

**个体**：总体中的每一个考察对象。

**样本**：从总体中抽取的一部分个体。

**样本容量**：样本中个体的数目。

**简单随机抽样**：从总体中逐个不放回地抽取n个个体作为样本，每个个体被抽到的概率相等。

**分层抽样**：将总体分成互不交叉的层，然后按照一定的比例，从各层独立地抽取一定数量的个体。

**系统抽样**：将总体均匀分成若干部分，然后按照预先规定的规则从每一部分抽取一个个体。

**平均数**：$\\overline{x} = \\frac{1}{n}\\sum_{i=1}^{n}x_i$

**中位数**：将数据从小到大排列后，位于中间位置的数。

**众数**：出现次数最多的数。

**方差**：$s^2 = \\frac{1}{n}\\sum_{i=1}^{n}(x_i - \\overline{x})^2$

**标准差**：$s = \\sqrt{\\frac{1}{n}\\sum_{i=1}^{n}(x_i - \\overline{x})^2}$

### 公式总结

| 公式 | 说明 |
|------|------|
| $\\overline{x} = \\frac{x_1 + x_2 + \\cdots + x_n}{n}$ | 平均数 |
| $s^2 = \\frac{1}{n}\\sum_{i=1}^{n}(x_i - \\overline{x})^2$ | 方差 |
| $s = \\sqrt{s^2}$ | 标准差 |
| $\\overline{x}_{加权} = \\frac{w_1x_1 + w_2x_2 + \\cdots + w_nx_n}{w_1 + w_2 + \\cdots + w_n}$ | 加权平均数 |

### 数学示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <rect x="50" y="90" width="40" height="50" fill="var(--color-primary)" />
  <rect x="100" y="60" width="40" height="80" fill="var(--color-primary)" />
  <rect x="150" y="30" width="40" height="110" fill="var(--color-primary)" />
  <rect x="200" y="70" width="40" height="70" fill="var(--color-primary)" />
  <line x1="30" y1="50" x2="270" y2="50" stroke="var(--color-border)" stroke-width="2" stroke-dasharray="3,2" />
  <text x="150" y="40" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">平均数</text>
  <text x="150" y="145" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">条形统计图</text>
</svg>

### 例题解析

**问题**：求数据2, 3, 5, 5, 5, 7, 8的平均数、中位数和众数。

**解答**：

平均数：$\\overline{x} = \\frac{2 + 3 + 5 + 5 + 5 + 7 + 8}{7} = \\frac{35}{7} = 5$

中位数：将数据排序后为2, 3, 5, 5, 5, 7, 8，中间的数是5

众数：出现次数最多的数是5

### 举一反三

**练习1**：求数据1, 2, 3, 4, 5的方差。
- 答案：$\\overline{x} = 3$，$s^2 = \\frac{(1-3)^2 + (2-3)^2 + (3-3)^2 + (4-3)^2 + (5-3)^2}{5} = 2$

**练习2**：从1000名学生中抽取100名进行调查，应采用什么抽样方法？
- 答案：系统抽样或分层抽样

### 拓展知识

- 方差和标准差反映数据的**离散程度**，值越大说明数据越分散。
- 三种抽样方法的共同点：每个个体被抽到的概率相等。
- 统计图表：条形图、折线图、扇形图、直方图、茎叶图。`
  },
  {
    id: 'math_029',
    title: '概率',
    stage: 'high',
    chapter: '必修二·概率',
    tags: ['概率', '随机事件', '古典概型', '几何概型', '互斥事件', '独立事件'],
    content: `## 概率

### 核心概念

**随机事件**：在一定条件下可能发生也可能不发生的事件。

**必然事件**：在一定条件下必然会发生的事件，概率为1。

**不可能事件**：在一定条件下不可能发生的事件，概率为0。

**概率**：事件发生的可能性大小，记为$P(A)$，$0 \\leq P(A) \\leq 1$。

**古典概型**：试验中所有可能出现的基本事件只有有限个，每个基本事件出现的可能性相等。

**几何概型**：试验中所有可能出现的基本事件有无限个，每个基本事件出现的可能性相等。

**互斥事件**：不能同时发生的两个事件。

**对立事件**：两个互斥事件必有一个发生。

**独立事件**：一个事件的发生与否对另一个事件的发生概率没有影响。

### 公式总结

| 公式 | 说明 |
|------|------|
| $P(A) = \\frac{事件A包含的基本事件数}{试验的基本事件总数}$ | 古典概型概率公式 |
| $P(A) = \\frac{构成事件A的区域长度(面积或体积)}{试验的全部结果所构成的区域长度(面积或体积)}$ | 几何概型概率公式 |
| $P(A \\cup B) = P(A) + P(B)$（A、B互斥） | 互斥事件加法公式 |
| $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$ | 一般加法公式 |
| $P(A \\cap B) = P(A)P(B)$（A、B独立） | 独立事件乘法公式 |
| $P(\\overline{A}) = 1 - P(A)$ | 对立事件概率公式 |

### 数学示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <rect x="50" y="50" width="200" height="80" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" />
  <text x="150" y="95" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">样本空间Ω</text>
  <circle cx="100" cy="90" r="25" fill="var(--color-primary)" opacity="0.4" />
  <text x="100" y="95" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">A</text>
  <circle cx="180" cy="90" r="25" fill="var(--color-border)" opacity="0.4" />
  <text x="180" y="95" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">B</text>
  <text x="140" y="95" font-size="10" fill="var(--color-text-secondary)">A∩B</text>
</svg>

### 例题解析

**问题**：从1, 2, 3, 4, 5中随机抽取一个数，求抽到偶数的概率。

**解答**：

基本事件总数：5

事件"抽到偶数"包含的基本事件：2, 4，共2个

概率：$P = \\frac{2}{5} = 0.4$

### 举一反三

**练习1**：掷一枚骰子，求点数大于3的概率。
- 答案：$P = \\frac{3}{6} = \\frac{1}{2}$

**练习2**：从区间[0, 2]中随机取一个数x，求x > 1的概率。
- 答案：几何概型，$P = \\frac{1}{2}$

### 拓展知识

- 概率的性质：非负性、规范性、可加性。
- 条件概率：$P(B|A) = \\frac{P(A \\cap B)}{P(A)}$。
- 全概率公式：$P(B) = \\sum_{i=1}^{n}P(A_i)P(B|A_i)$。
- 贝叶斯公式：$P(A_i|B) = \\frac{P(A_i)P(B|A_i)}{\\sum_{j=1}^{n}P(A_j)P(B|A_j)}$。`
  },
  {
    id: 'math_030',
    title: '空间向量与立体几何',
    stage: 'high',
    chapter: '选择性必修一·空间向量与立体几何',
    tags: ['空间向量', '空间直角坐标系', '空间角', '空间距离', '向量法'],
    content: `## 空间向量与立体几何

### 核心概念

**空间向量**：在空间中既有大小又有方向的量。

**空间直角坐标系**：过空间一点O作三条两两垂直的数轴Ox、Oy、Oz。

**向量的坐标表示**：设$\\vec{a} = (x_1, y_1, z_1)$，$\\vec{b} = (x_2, y_2, z_2)$。

**方向向量**：与直线平行的非零向量。

**法向量**：与平面垂直的非零向量。

**空间角**：异面直线所成角、直线与平面所成角、二面角。

**空间距离**：点到直线的距离、点到平面的距离、异面直线间的距离。

### 公式总结

| 公式 | 说明 |
|------|------|
| $\\vec{a} + \\vec{b} = (x_1 + x_2, y_1 + y_2, z_1 + z_2)$ | 空间向量加法 |
| $\\vec{a} \\cdot \\vec{b} = x_1x_2 + y_1y_2 + z_1z_2$ | 空间向量数量积 |
| $|\\vec{a}| = \\sqrt{x_1^2 + y_1^2 + z_1^2}$ | 空间向量的模 |
| $\\cos\\theta = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}||\\vec{b}|}$ | 两向量夹角 |
| $\\vec{a} \\times \\vec{b} = (y_1z_2 - y_2z_1, z_1x_2 - z_2x_1, x_1y_2 - x_2y_1)$ | 空间向量叉积 |
| $d_{点到平面} = \\frac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}$ | 点到平面距离 |
| $\\sin\\varphi = |\\cos<\\vec{n}, \\vec{v}>|$ | 直线与平面所成角 |

### 数学示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <line x1="50" y1="150" x2="250" y2="150" stroke="var(--color-border)" stroke-width="1" />
  <line x1="50" y1="150" x2="100" y2="80" stroke="var(--color-border)" stroke-width="1" />
  <line x1="50" y1="150" x2="50" y2="50" stroke="var(--color-border)" stroke-width="1" />
  <text x="260" y="155" font-size="10" fill="var(--color-text-secondary)">x轴</text>
  <text x="110" y="85" font-size="10" fill="var(--color-text-secondary)">y轴</text>
  <text x="45" y="45" font-size="10" fill="var(--color-text-secondary)">z轴</text>
  <text x="50" y="160" font-size="10" fill="var(--color-text-primary)">O</text>
  <circle cx="150" cy="100" r="4" fill="var(--color-primary)" />
  <text x="160" y="105" font-size="12" fill="var(--color-text-primary)">P(x,y,z)</text>
</svg>

### 例题解析

**问题**：已知空间三点A(1, 0, 0)，B(0, 1, 0)，C(0, 0, 1)，求向量$\\overrightarrow{AB}$和$\\overrightarrow{AC}$的夹角。

**解答**：

$\\overrightarrow{AB} = B - A = (-1, 1, 0)$

$\\overrightarrow{AC} = C - A = (-1, 0, 1)$

$\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = (-1)(-1) + (1)(0) + (0)(1) = 1$

$|\\overrightarrow{AB}| = \\sqrt{(-1)^2 + 1^2 + 0^2} = \\sqrt{2}$

$|\\overrightarrow{AC}| = \\sqrt{(-1)^2 + 0^2 + 1^2} = \\sqrt{2}$

$\\cos\\theta = \\frac{1}{\\sqrt{2} \\cdot \\sqrt{2}} = \\frac{1}{2}$

所以$\\theta = 60°$

### 举一反三

**练习1**：求平面$x + y + z = 1$的法向量。
- 答案：$(1, 1, 1)$

**练习2**：求点(1, 1, 1)到平面$x + y + z = 0$的距离。
- 答案：$d = \\frac{|1 + 1 + 1|}{\\sqrt{1 + 1 + 1}} = \\sqrt{3}$

### 拓展知识

- 向量法是解决立体几何问题的**有力工具**，可以将几何问题转化为代数运算。
- 两条直线平行的充要条件：方向向量平行。
- 直线与平面平行的充要条件：方向向量与法向量垂直。
- 两个平面平行的充要条件：法向量平行。`
  },
  {
    id: 'math_031',
    title: '直线和圆的方程',
    stage: 'high',
    chapter: '选择性必修一·直线和圆的方程',
    tags: ['直线方程', '圆的方程', '直线与圆位置关系', '圆与圆位置关系', '距离公式'],
    content: `## 直线和圆的方程

### 核心概念

**直线的倾斜角**：直线与x轴正方向的夹角，范围$[0, \\pi)$。

**直线的斜率**：$k = \\tan\\alpha$（$\\alpha \\neq \\frac{\\pi}{2}$）。

**直线方程**：点斜式、斜截式、两点式、截距式、一般式。

**两条直线平行**：$k_1 = k_2$（斜率存在）。

**两条直线垂直**：$k_1 \\cdot k_2 = -1$（斜率存在）。

**圆的标准方程**：$(x - a)^2 + (y - b)^2 = r^2$，圆心$(a, b)$，半径r。

**圆的一般方程**：$x^2 + y^2 + Dx + Ey + F = 0$，圆心$(-\\frac{D}{2}, -\\frac{E}{2})$，半径$\\frac{1}{2}\\sqrt{D^2 + E^2 - 4F}$。

### 公式总结

| 公式 | 说明 |
|------|------|
| $y - y_1 = k(x - x_1)$ | 点斜式 |
| $y = kx + b$ | 斜截式 |
| $\\frac{y - y_1}{y_2 - y_1} = \\frac{x - x_1}{x_2 - x_1}$ | 两点式 |
| $Ax + By + C = 0$ | 一般式 |
| $k = \\frac{y_2 - y_1}{x_2 - x_1}$ | 斜率公式 |
| $d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}$ | 点到直线距离 |
| $d = \\frac{|C_1 - C_2|}{\\sqrt{A^2 + B^2}}$ | 两平行线距离 |
| $(x - a)^2 + (y - b)^2 = r^2$ | 圆的标准方程 |

### 数学示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <line x1="30" y1="130" x2="270" y2="130" stroke="var(--color-border)" stroke-width="1" />
  <line x1="150" y1="30" x2="150" y2="170" stroke="var(--color-border)" stroke-width="1" />
  <circle cx="150" cy="90" r="50" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" />
  <text x="150" y="95" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">O(a,b)</text>
  <line x1="150" y1="90" x2="200" y2="90" stroke="var(--color-primary)" stroke-width="2" />
  <text x="175" y="85" font-size="10" fill="var(--color-text-secondary)">r</text>
  <text x="150" y="160" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">圆 $(x-a)^2 + (y-b)^2 = r^2$</text>
</svg>

### 例题解析

**问题**：求过点(1, 2)且与直线$x + y - 3 = 0$平行的直线方程。

**解答**：

已知直线的斜率$k = -1$，因为平行，所以所求直线斜率也为-1。

用点斜式：$y - 2 = -1(x - 1)$

化简：$y = -x + 3$，即$x + y - 3 = 0$

### 举一反三

**练习1**：求圆心在(2, -1)，半径为3的圆的方程。
- 答案：$(x - 2)^2 + (y + 1)^2 = 9$

**练习2**：判断直线$x + y = 2$与圆$x^2 + y^2 = 2$的位置关系。
- 答案：圆心到直线距离$d = \\frac{|0 + 0 - 2|}{\\sqrt{2}} = \\sqrt{2} = r$，相切

### 拓展知识

- 直线与圆的位置关系：相交（d < r）、相切（d = r）、相离（d > r）。
- 圆与圆的位置关系：内含、内切、相交、外切、外离。
- 圆的切线方程：过圆上一点$(x_0, y_0)$的切线方程为$(x_0 - a)(x - a) + (y_0 - b)(y - b) = r^2$。`
  },
  {
    id: 'math_032',
    title: '圆锥曲线的方程',
    stage: 'high',
    chapter: '选择性必修一·圆锥曲线的方程',
    tags: ['椭圆', '双曲线', '抛物线', '圆锥曲线', '焦点', '离心率'],
    content: `## 圆锥曲线的方程

### 核心概念

**椭圆**：平面内与两个定点$F_1$、$F_2$的距离之和等于常数（大于$|F_1F_2|$）的点的轨迹。

**双曲线**：平面内与两个定点$F_1$、$F_2$的距离之差的绝对值等于常数（小于$|F_1F_2|$）的点的轨迹。

**抛物线**：平面内与一个定点F和一条定直线l（F不在l上）的距离相等的点的轨迹。

**焦点**：椭圆和双曲线的定点，抛物线的定点。

**离心率**：椭圆$e = \\frac{c}{a}$（0 < e < 1），双曲线$e = \\frac{c}{a}$（e > 1），抛物线e = 1。

**准线**：圆锥曲线的定直线。

### 公式总结

| 曲线 | 标准方程 | 焦点 | 离心率 | 准线 |
|------|----------|------|--------|------|
| 椭圆（焦点在x轴） | $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$（a > b） | $(\\pm c, 0)$ | $e = \\frac{c}{a}$ | $x = \\pm \\frac{a^2}{c}$ |
| 椭圆（焦点在y轴） | $\\frac{y^2}{a^2} + \\frac{x^2}{b^2} = 1$（a > b） | $(0, \\pm c)$ | $e = \\frac{c}{a}$ | $y = \\pm \\frac{a^2}{c}$ |
| 双曲线（焦点在x轴） | $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ | $(\\pm c, 0)$ | $e = \\frac{c}{a}$ | $x = \\pm \\frac{a^2}{c}$ |
| 双曲线（焦点在y轴） | $\\frac{y^2}{a^2} - \\frac{x^2}{b^2} = 1$ | $(0, \\pm c)$ | $e = \\frac{c}{a}$ | $y = \\pm \\frac{a^2}{c}$ |
| 抛物线（开口向右） | $y^2 = 2px$（p > 0） | $(\\frac{p}{2}, 0)$ | $e = 1$ | $x = -\\frac{p}{2}$ |
| 抛物线（开口向上） | $x^2 = 2py$（p > 0） | $(0, \\frac{p}{2})$ | $e = 1$ | $y = -\\frac{p}{2}$ |

其中$c^2 = a^2 - b^2$（椭圆），$c^2 = a^2 + b^2$（双曲线）。

### 数学示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <ellipse cx="150" cy="90" rx="100" ry="50" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" />
  <circle cx="50" cy="90" r="4" fill="var(--color-text-primary)" />
  <text x="50" y="80" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">$F_1$</text>
  <circle cx="250" cy="90" r="4" fill="var(--color-text-primary)" />
  <text x="250" y="80" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">$F_2$</text>
  <text x="150" y="160" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">椭圆 $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$</text>
</svg>

### 例题解析

**问题**：求椭圆$\\frac{x^2}{16} + \\frac{y^2}{9} = 1$的长轴长、短轴长、焦点坐标和离心率。

**解答**：

$a^2 = 16$，所以$a = 4$；$b^2 = 9$，所以$b = 3$

$c^2 = a^2 - b^2 = 16 - 9 = 7$，所以$c = \\sqrt{7}$

长轴长：$2a = 8$

短轴长：$2b = 6$

焦点坐标：$(\\pm \\sqrt{7}, 0)$

离心率：$e = \\frac{c}{a} = \\frac{\\sqrt{7}}{4}$

### 举一反三

**练习1**：求双曲线$\\frac{x^2}{9} - \\frac{y^2}{16} = 1$的焦点坐标和渐近线方程。
- 答案：$c = 5$，焦点$(\\pm 5, 0)$，渐近线$y = \\pm \\frac{4}{3}x$

**练习2**：求抛物线$y^2 = 8x$的焦点坐标和准线方程。
- 答案：$2p = 8$，$p = 4$，焦点$(2, 0)$，准线$x = -2$

### 拓展知识

- 圆锥曲线是**平面与圆锥面相交**得到的曲线。
- 椭圆的光学性质：从一个焦点发出的光线经椭圆反射后必经过另一个焦点。
- 双曲线的光学性质：从一个焦点发出的光线经双曲线反射后，反射光线的反向延长线经过另一个焦点。
- 抛物线的光学性质：从焦点发出的光线经抛物线反射后平行于对称轴。`
  },
  {
    id: 'math_033',
    title: '数列',
    stage: 'high',
    chapter: '选择性必修二·数列',
    tags: ['数列', '等差数列', '等比数列', '通项公式', '前n项和', '递推数列'],
    content: `## 数列

### 核心概念

**数列**：按一定顺序排列的一列数。

**通项公式**：$a_n = f(n)$，表示数列的第n项与n之间的关系。

**递推公式**：$a_n = f(a_{n-1}, a_{n-2}, \\cdots)$，表示数列的第n项与前面各项的关系。

**等差数列**：从第二项起，每一项与它的前一项的差等于同一个常数的数列。

**等比数列**：从第二项起，每一项与它的前一项的比等于同一个常数的数列。

**数列的前n项和**：$S_n = a_1 + a_2 + \\cdots + a_n$。

### 公式总结

| 数列类型 | 通项公式 | 前n项和公式 | 中项公式 |
|----------|----------|-------------|----------|
| 等差数列 | $a_n = a_1 + (n - 1)d$ | $S_n = \\frac{n(a_1 + a_n)}{2} = na_1 + \\frac{n(n - 1)}{2}d$ | $2a_{k} = a_{k-m} + a_{k+m}$ |
| 等比数列 | $a_n = a_1 \\cdot q^{n-1}$ | $S_n = \\frac{a_1(1 - q^n)}{1 - q}$（q ≠ 1） | $a_k^2 = a_{k-m} \\cdot a_{k+m}$ |

### 数学示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <line x1="50" y1="120" x2="250" y2="120" stroke="var(--color-border)" stroke-width="1" />
  <circle cx="70" cy="100" r="6" fill="var(--color-primary)" />
  <text x="70" y="110" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">a₁</text>
  <circle cx="120" cy="85" r="6" fill="var(--color-primary)" />
  <text x="120" y="95" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">a₂</text>
  <circle cx="170" cy="70" r="6" fill="var(--color-primary)" />
  <text x="170" y="80" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">a₃</text>
  <circle cx="220" cy="55" r="6" fill="var(--color-primary)" />
  <text x="220" y="65" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">a₄</text>
  <path d="M76 100 L114 85" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#arrow)" />
  <path d="M126 85 L164 70" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#arrow)" />
  <path d="M176 70 L214 55" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#arrow)" />
  <text x="150" y="140" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">等差数列（公差d）</text>
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-primary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：等差数列{an}中，a₁ = 2，d = 3，求a₁₀和S₁₀。

**解答**：

$a_{10} = a_1 + (10 - 1)d = 2 + 9 \\times 3 = 29$

$S_{10} = \\frac{10(a_1 + a_{10})}{2} = \\frac{10(2 + 29)}{2} = 155$

### 举一反三

**练习1**：等比数列{an}中，a₁ = 1，q = 2，求a₅和S₅。
- 答案：$a_5 = 16$，$S_5 = 31$

**练习2**：等差数列{an}中，a₃ = 5，a₇ = 13，求公差d和首项a₁。
- 答案：$d = 2$，$a_1 = 1$

### 拓展知识

- 等差数列的公差d可以是正数、负数或零。
- 等比数列的公比q不能为零。
- 数列求和方法：公式法、错位相减法、裂项相消法、倒序相加法。
- 数学归纳法：证明与正整数n有关的命题。`
  },
  {
    id: 'math_034',
    title: '导数及其应用',
    stage: 'high',
    chapter: '选择性必修二·导数及其应用',
    tags: ['导数', '导数定义', '导数公式', '导数应用', '单调性', '极值', '最值'],
    content: `## 导数及其应用

### 核心概念

**导数**：函数$y = f(x)$在点$x_0$处的导数$f'(x_0)$，表示函数在该点的瞬时变化率。

**导数定义**：$f'(x_0) = \\lim_{\\Delta x \\to 0} \\frac{f(x_0 + \\Delta x) - f(x_0)}{\\Delta x}$

**导函数**：$f'(x)$，表示函数$f(x)$在区间内每一点的导数。

**切线方程**：过点$(x_0, f(x_0))$的切线方程为$y - f(x_0) = f'(x_0)(x - x_0)$。

**单调性**：若$f'(x) > 0$，则f在区间上单调递增；若$f'(x) < 0$，则f在区间上单调递减。

**极值**：函数在某点附近的局部最大值或最小值。

**最值**：函数在整个区间上的最大值或最小值。

**微分**：$dy = f'(x)dx$。

### 公式总结

| 基本初等函数 | 导数公式 |
|--------------|----------|
| $C' = 0$（C为常数） | 常数的导数 |
| $(x^n)' = nx^{n-1}$ | 幂函数的导数 |
| $(\\sin x)' = \\cos x$ | 正弦函数的导数 |
| $(\\cos x)' = -\\sin x$ | 余弦函数的导数 |
| $(\\tan x)' = \\sec^2 x$ | 正切函数的导数 |
| $(e^x)' = e^x$ | 指数函数的导数 |
| $(a^x)' = a^x \\ln a$ | 指数函数的导数 |
| $(\\ln x)' = \\frac{1}{x}$ | 对数函数的导数 |
| $(\\log_a x)' = \\frac{1}{x \\ln a}$ | 对数函数的导数 |

| 导数运算法则 | 公式 |
|--------------|------|
| $(u \\pm v)' = u' \\pm v'$ | 和差法则 |
| $(uv)' = u'v + uv'$ | 乘积法则 |
| $(\\frac{u}{v})' = \\frac{u'v - uv'}{v^2}$（v ≠ 0） | 商法则 |
| $(f(g(x)))' = f'(g(x)) \\cdot g'(x)$ | 复合函数求导 |

### 数学示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <line x1="20" y1="140" x2="280" y2="140" stroke="var(--color-border)" stroke-width="1" />
  <line x1="40" y1="20" x2="40" y2="160" stroke="var(--color-border)" stroke-width="1" />
  <path d="M50 130 Q100 100 150 70 T250 50" stroke="var(--color-primary)" stroke-width="2" fill="none" />
  <circle cx="150" cy="70" r="5" fill="var(--color-primary)" />
  <line x1="120" y1="90" x2="180" y2="50" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="140" y="65" font-size="10" fill="var(--color-text-secondary)">切线</text>
  <text x="160" y="80" font-size="10" fill="var(--color-text-secondary)">斜率=f'(x)</text>
  <text x="150" y="170" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">导数的几何意义：切线斜率</text>
</svg>

### 例题解析

**问题**：求函数$f(x) = x^3 - 3x$的导数，并求$f'(2)$。

**解答**：

$f'(x) = 3x^2 - 3$

$f'(2) = 3 \\times 2^2 - 3 = 12 - 3 = 9$

### 举一反三

**练习1**：求函数$f(x) = e^x \\sin x$的导数。
- 答案：$f'(x) = e^x \\sin x + e^x \\cos x = e^x(\\sin x + \\cos x)$

**练习2**：求函数$f(x) = x^2 - 4x + 3$的单调区间和极值。
- 答案：$f'(x) = 2x - 4$，单调递减区间$(-\\infty, 2)$，单调递增区间$(2, +\\infty)$，极小值$f(2) = -1$

### 拓展知识

- 导数的几何意义：函数在某点的导数等于该点切线的斜率。
- 罗尔定理：若f在[a,b]上连续，在(a,b)内可导，且f(a)=f(b)，则存在$\\xi \\in (a,b)$，使得$f'(\\xi) = 0$。
- 拉格朗日中值定理：若f在[a,b]上连续，在(a,b)内可导，则存在$\\xi \\in (a,b)$，使得$f(b) - f(a) = f'(\\xi)(b - a)$。
- 洛必达法则：用于求$\\frac{0}{0}$或$\\frac{\\infty}{\\infty}$型极限。`
  },
  {
    id: 'math_035',
    title: '计数原理',
    stage: 'high',
    chapter: '选择性必修三·计数原理',
    tags: ['计数原理', '排列', '组合', '二项式定理', '分步乘法', '分类加法'],
    content: `## 计数原理

### 核心概念

**分类加法计数原理**：完成一件事，有n类不同方案，在第1类方案中有m₁种不同的方法，在第2类方案中有m₂种不同的方法，…，在第n类方案中有mₙ种不同的方法，那么完成这件事共有$N = m_1 + m_2 + \\cdots + m_n$种不同的方法。

**分步乘法计数原理**：完成一件事，需要分成n个步骤，做第1步有m₁种不同的方法，做第2步有m₂种不同的方法，…，做第n步有mₙ种不同的方法，那么完成这件事共有$N = m_1 \\times m_2 \\times \\cdots \\times m_n$种不同的方法。

**排列**：从n个不同元素中取出m（m ≤ n）个元素，按照一定的顺序排成一列，叫做从n个不同元素中取出m个元素的一个排列。

**组合**：从n个不同元素中取出m（m ≤ n）个元素合成一组，叫做从n个不同元素中取出m个元素的一个组合。

**排列数**：$A_n^m = \\frac{n!}{(n - m)!}$

**组合数**：$C_n^m = \\frac{n!}{m!(n - m)!}$

**二项式定理**：$(a + b)^n = \\sum_{k=0}^{n} C_n^k a^{n-k} b^k$

### 公式总结

| 公式 | 说明 |
|------|------|
| $A_n^m = n(n-1)(n-2)\\cdots(n-m+1)$ | 排列数公式 |
| $A_n^m = \\frac{n!}{(n - m)!}$ | 排列数公式（阶乘形式） |
| $C_n^m = \\frac{A_n^m}{A_m^m}$ | 组合数公式 |
| $C_n^m = \\frac{n!}{m!(n - m)!}$ | 组合数公式（阶乘形式） |
| $C_n^m = C_n^{n-m}$ | 组合数性质 |
| $C_n^m + C_n^{m-1} = C_{n+1}^m$ | 组合数性质 |
| $(a + b)^n = \\sum_{k=0}^{n} C_n^k a^{n-k} b^k$ | 二项式定理 |
| $T_{k+1} = C_n^k a^{n-k} b^k$ | 二项展开式的通项 |

### 数学示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <rect x="50" y="30" width="80" height="40" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" />
  <text x="90" y="55" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">分类加法</text>
  <rect x="50" y="80" width="80" height="40" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="90" y="105" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">分步乘法</text>
  <path d="M140 50 L180 50" stroke="var(--color-border)" stroke-width="2" marker-end="url(#arrow)" />
  <path d="M140 100 L180 100" stroke="var(--color-border)" stroke-width="2" marker-end="url(#arrow)" />
  <rect x="190" y="50" width="100" height="90" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" />
  <text x="240" y="95" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">排列与组合</text>
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-border)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：从5名男生和3名女生中选出3人参加活动，要求至少有1名女生，有多少种选法？

**解答**：

方法一（直接法）：选1女2男 + 选2女1男 + 选3女

$C_3^1 C_5^2 + C_3^2 C_5^1 + C_3^3 C_5^0 = 3 \\times 10 + 3 \\times 5 + 1 \\times 1 = 30 + 15 + 1 = 46$

方法二（间接法）：总选法 - 全是男生的选法

$C_8^3 - C_5^3 = 56 - 10 = 46$

### 举一反三

**练习1**：计算$A_6^3$和$C_6^3$。
- 答案：$A_6^3 = 6×5×4 = 120$，$C_6^3 = 20$

**练习2**：求$(a + b)^4$的展开式。
- 答案：$a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4$

### 拓展知识

- 排列与组合的区别：排列**有序**，组合**无序**。
- 二项式系数的性质：对称性、最大项、和为$2^n$。
- 多重组合：从n个元素中取出m个元素，允许重复选取。`
  },
  {
    id: 'math_036',
    title: '随机变量及其分布',
    stage: 'high',
    chapter: '选择性必修三·随机变量及其分布',
    tags: ['随机变量', '离散型随机变量', '连续型随机变量', '期望', '方差', '正态分布'],
    content: `## 随机变量及其分布

### 核心概念

**随机变量**：表示随机试验结果的变量，记为X。

**离散型随机变量**：可能取的值可以一一列举出来的随机变量。

**连续型随机变量**：可能取的值充满某个区间的随机变量。

**分布列**：离散型随机变量X的所有可能取值$x_1, x_2, \\cdots, x_n$及其对应的概率$P(X = x_i) = p_i$。

**概率密度函数**：连续型随机变量的概率分布描述。

**数学期望**：$E(X) = \\sum_{i=1}^{n} x_i p_i$（离散型），$E(X) = \\int_{-\\infty}^{+\\infty} x f(x)dx$（连续型）。

**方差**：$D(X) = E[(X - E(X))^2] = E(X^2) - [E(X)]^2$。

**标准差**：$\\sigma = \\sqrt{D(X)}$。

**正态分布**：$X \\sim N(\\mu, \\sigma^2)$，概率密度函数$f(x) = \\frac{1}{\\sqrt{2\\pi}\\sigma} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$。

### 公式总结

| 分布类型 | 期望 | 方差 |
|----------|------|------|
| 两点分布 | $E(X) = p$ | $D(X) = p(1 - p)$ |
| 二项分布 $X \\sim B(n, p)$ | $E(X) = np$ | $D(X) = np(1 - p)$ |
| 泊松分布 $X \\sim P(\\lambda)$ | $E(X) = \\lambda$ | $D(X) = \\lambda$ |
| 正态分布 $X \\sim N(\\mu, \\sigma^2)$ | $E(X) = \\mu$ | $D(X) = \\sigma^2$ |

| 期望性质 | 公式 |
|----------|------|
| $E(C) = C$（C为常数） | 常数的期望 |
| $E(aX + b) = aE(X) + b$ | 线性性质 |
| $E(X + Y) = E(X) + E(Y)$ | 可加性 |

| 方差性质 | 公式 |
|----------|------|
| $D(C) = 0$（C为常数） | 常数的方差 |
| $D(aX + b) = a^2D(X)$ | 线性性质 |
| $D(X) = E(X^2) - [E(X)]^2$ | 方差与期望的关系 |

### 数学示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <line x1="30" y1="150" x2="270" y2="150" stroke="var(--color-border)" stroke-width="1" />
  <path d="M50 140 Q150 50 250 140" stroke="var(--color-primary)" stroke-width="2" fill="none" />
  <line x1="150" y1="45" x2="150" y2="150" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="3,2" />
  <text x="155" y="70" font-size="10" fill="var(--color-text-secondary)">μ</text>
  <text x="150" y="165" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">正态分布曲线 $N(μ, σ²)$</text>
</svg>

### 例题解析

**问题**：随机变量X服从二项分布B(10, 0.5)，求E(X)和D(X)。

**解答**：

$E(X) = np = 10 \\times 0.5 = 5$

$D(X) = np(1 - p) = 10 \\times 0.5 \\times 0.5 = 2.5$

### 举一反三

**练习1**：随机变量X的分布列为：P(X=1)=0.2, P(X=2)=0.3, P(X=3)=0.5，求E(X)和D(X)。
- 答案：$E(X) = 2.3$，$D(X) = 0.61$

**练习2**：若$X \\sim N(0, 1)$，求$P(-1 < X < 1)$。
- 答案：约0.6827

### 拓展知识

- 正态分布是**最常见的概率分布**，许多自然现象都近似服从正态分布。
- 标准正态分布：$\\mu = 0$，$\\sigma = 1$，记为$N(0, 1)$。
- 3σ原则：正态分布中，约68.27%的数据在$(\\mu - \\sigma, \\mu + \\sigma)$内，约95.45%在$(\\mu - 2\\sigma, \\mu + 2\\sigma)$内，约99.73%在$(\\mu - 3\\sigma, \\mu + 3\\sigma)$内。`
  },
  {
    id: 'math_037',
    title: '成对数据的统计分析',
    stage: 'high',
    chapter: '选择性必修三·成对数据的统计分析',
    tags: ['统计分析', '相关系数', '回归分析', '独立性检验', '散点图'],
    content: `## 成对数据的统计分析

### 核心概念

**成对数据**：由两个变量的成对观测值组成的数据，记为$(x_1, y_1), (x_2, y_2), \\cdots, (x_n, y_n)$。

**散点图**：将成对数据用直角坐标系中的点表示出来的图形。

**相关关系**：两个变量之间的非确定性关系。

**正相关**：当x增大时，y也随之增大。

**负相关**：当x增大时，y随之减小。

**线性相关**：散点图中的点大致分布在一条直线附近。

**相关系数**：衡量两个变量线性相关程度的指标，记为r，$|r|$越接近1，线性相关程度越强。

**回归直线**：描述两个变量之间线性关系的直线，方程为$\\hat{y} = \\hat{b}x + \\hat{a}$。

**独立性检验**：判断两个分类变量是否独立的统计方法。

### 公式总结

| 公式 | 说明 |
|------|------|
| $r = \\frac{\\sum_{i=1}^{n}(x_i - \\overline{x})(y_i - \\overline{y})}{\\sqrt{\\sum_{i=1}^{n}(x_i - \\overline{x})^2} \\sqrt{\\sum_{i=1}^{n}(y_i - \\overline{y})^2}}$ | 相关系数 |
| $\\hat{b} = \\frac{\\sum_{i=1}^{n}(x_i - \\overline{x})(y_i - \\overline{y})}{\\sum_{i=1}^{n}(x_i - \\overline{x})^2}$ | 回归系数 |
| $\\hat{a} = \\overline{y} - \\hat{b}\\overline{x}$ | 回归截距 |
| $\\chi^2 = \\sum_{i,j} \\frac{(n_{ij} - \\hat{n}_{ij})^2}{\\hat{n}_{ij}}$ | 独立性检验统计量 |

### 数学示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <line x1="30" y1="150" x2="270" y2="150" stroke="var(--color-border)" stroke-width="1" />
  <line x1="50" y1="20" x2="50" y2="160" stroke="var(--color-border)" stroke-width="1" />
  <circle cx="70" cy="130" r="5" fill="var(--color-primary)" />
  <circle cx="100" cy="110" r="5" fill="var(--color-primary)" />
  <circle cx="130" cy="90" r="5" fill="var(--color-primary)" />
  <circle cx="160" cy="70" r="5" fill="var(--color-primary)" />
  <circle cx="190" cy="55" r="5" fill="var(--color-primary)" />
  <circle cx="220" cy="45" r="5" fill="var(--color-primary)" />
  <line x1="60" y1="135" x2="230" y2="40" stroke="var(--color-text-primary)" stroke-width="2" stroke-dasharray="3,2" />
  <text x="150" y="170" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">正相关散点图与回归直线</text>
</svg>

### 例题解析

**问题**：已知数据(1,2), (2,4), (3,5), (4,7), (5,8)，求回归直线方程。

**解答**：

$\\overline{x} = 3$，$\\overline{y} = 5.2$

$\\sum_{i=1}^{5}(x_i - \\overline{x})(y_i - \\overline{y}) = (-2)(-3.2) + (-1)(-1.2) + 0(-0.2) + 1(1.8) + 2(2.8) = 6.4 + 1.2 + 0 + 1.8 + 5.6 = 15$

$\\sum_{i=1}^{5}(x_i - \\overline{x})^2 = 4 + 1 + 0 + 1 + 4 = 10$

$\\hat{b} = \\frac{15}{10} = 1.5$

$\\hat{a} = 5.2 - 1.5 \\times 3 = 0.7$

回归直线方程：$\\hat{y} = 1.5x + 0.7$

### 举一反三

**练习1**：若相关系数r = 0.9，说明两个变量的线性相关程度如何？
- 答案：高度正相关

**练习2**：若回归直线方程为$\\hat{y} = 2x + 3$，当x = 5时，预测y的值是多少？
- 答案：$\\hat{y} = 13$

### 拓展知识

- 相关系数r的取值范围：$-1 \\leq r \\leq 1$。
- $r > 0$表示正相关，$r < 0$表示负相关。
- 回归直线一定过样本中心点$(\\overline{x}, \\overline{y})$。
- 独立性检验常用$\\chi^2$检验，当$\\chi^2$值较大时，拒绝原假设，认为两个变量有关联。`
  },
  {
    id: 'math_038',
    title: '反比例函数',
    stage: 'middle',
    chapter: '反比例函数',
    tags: ['反比例函数', '图像', '性质', 'k的几何意义'],
    content: `## 反比例函数

### 核心概念

**反比例函数**：形如 $y = \\frac{k}{x}$（$k \\neq 0$）的函数。

**反比例函数的图像**：双曲线，当 $k > 0$ 时，双曲线的两支分别位于第一、三象限；当 $k < 0$ 时，双曲线的两支分别位于第二、四象限。

**反比例函数的性质**：当 $k > 0$ 时，在每个象限内，y随x的增大而减小；当 $k < 0$ 时，在每个象限内，y随x的增大而增大。

**k的几何意义**：过双曲线上任意一点作x轴、y轴的垂线，所得矩形的面积为 $|k|$。

### 公式总结

| 公式 | 说明 |
|------|------|
| $y = \\frac{k}{x}$（$k \\neq 0$） | 反比例函数一般形式 |
| $xy = k$（$k \\neq 0$） | 反比例函数等价形式 |
| 矩形面积 = $|k|$ | k的几何意义 |

### 数学示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <line x1="20" y1="100" x2="280" y2="100" stroke="var(--color-border)" stroke-width="1" />
  <line x1="150" y1="20" x2="150" y2="160" stroke="var(--color-border)" stroke-width="1" />
  <path d="M50 150 Q100 80 140 40" stroke="var(--color-primary)" stroke-width="2" fill="none" />
  <path d="M160 150 Q200 80 250 40" stroke="var(--color-primary)" stroke-width="2" fill="none" />
  <text x="150" y="175" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">反比例函数 $y = \\frac{k}{x}$（k > 0）</text>
</svg>

### 例题解析

**问题**：已知反比例函数 $y = \\frac{k}{x}$ 的图像经过点(2, 3)，求k的值和函数解析式。

**解答**：

将点(2, 3)代入 $y = \\frac{k}{x}$：

$$ 3 = \\frac{k}{2} $$

$$ k = 6 $$

所以函数解析式为 $y = \\frac{6}{x}$

### 举一反三

**练习1**：反比例函数 $y = \\frac{-4}{x}$ 的图像位于哪些象限？
- 答案：第二、四象限

**练习2**：已知反比例函数 $y = \\frac{k}{x}$ 的图像经过点(-1, 2)，求当x = 4时y的值。
- 答案：$k = -2$，当x = 4时，$y = \\frac{-2}{4} = -\\frac{1}{2}$

### 拓展知识

- 反比例函数的图像关于原点**中心对称**。
- 反比例函数的图像关于直线 $y = x$ 和 $y = -x$ **轴对称**。
- 反比例函数与正比例函数的交点关于原点对称。`
  },
  {
    id: 'math_039',
    title: '二次函数',
    stage: 'middle',
    chapter: '二次函数',
    tags: ['二次函数', '抛物线', '顶点式', '交点式', '最值'],
    content: `## 二次函数

### 核心概念

**二次函数**：形如 $y = ax^2 + bx + c$（$a \\neq 0$）的函数。

**二次函数的图像**：抛物线，当 $a > 0$ 时，抛物线开口向上；当 $a < 0$ 时，抛物线开口向下。

**顶点**：抛物线的最高点或最低点，坐标为 $(-\\frac{b}{2a}, \\frac{4ac - b^2}{4a})$。

**对称轴**：直线 $x = -\\frac{b}{2a}$。

**二次函数的三种形式**：
- 一般式：$y = ax^2 + bx + c$
- 顶点式：$y = a(x - h)^2 + k$（顶点$(h, k)$）
- 交点式：$y = a(x - x_1)(x - x_2)$（与x轴交点$(x_1, 0)$、$(x_2, 0)$）

### 公式总结

| 公式 | 说明 |
|------|------|
| $y = ax^2 + bx + c$（$a \\neq 0$） | 一般式 |
| $y = a(x - h)^2 + k$ | 顶点式 |
| $y = a(x - x_1)(x - x_2)$ | 交点式 |
| $x = -\\frac{b}{2a}$ | 对称轴 |
| $y_{最值} = \\frac{4ac - b^2}{4a}$ | 最值 |
| $\\Delta = b^2 - 4ac$ | 判别式（与x轴交点个数） |

### 数学示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <line x1="20" y1="130" x2="280" y2="130" stroke="var(--color-border)" stroke-width="1" />
  <line x1="150" y1="30" x2="150" y2="160" stroke="var(--color-border)" stroke-width="1" />
  <path d="M50 120 Q150 40 250 120" stroke="var(--color-primary)" stroke-width="2" fill="none" />
  <circle cx="150" cy="40" r="4" fill="var(--color-primary)" />
  <text x="155" y="45" font-size="10" fill="var(--color-text-secondary)">顶点</text>
  <text x="155" y="135" font-size="10" fill="var(--color-text-secondary)">对称轴</text>
  <text x="150" y="175" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">抛物线 $y = ax^2 + bx + c$（a > 0）</text>
</svg>

### 例题解析

**问题**：求二次函数 $y = x^2 - 4x + 3$ 的顶点坐标、对称轴和最值。

**解答**：

方法一（配方法）：

$$ y = x^2 - 4x + 3 = (x^2 - 4x + 4) - 1 = (x - 2)^2 - 1 $$

顶点坐标：$(2, -1)$，对称轴：$x = 2$，最小值：$-1$

方法二（公式法）：

对称轴：$x = -\\frac{-4}{2} = 2$

顶点纵坐标：$y = \\frac{4 \\times 1 \\times 3 - (-4)^2}{4} = \\frac{12 - 16}{4} = -1$

### 举一反三

**练习1**：将二次函数 $y = 2x^2 + 4x - 1$ 化为顶点式。
- 答案：$y = 2(x + 1)^2 - 3$

**练习2**：二次函数 $y = -x^2 + 2x + 3$ 与x轴的交点坐标是多少？
- 答案：解方程 $-x^2 + 2x + 3 = 0$，得 $x_1 = -1$，$x_2 = 3$，交点为$(-1, 0)$和$(3, 0)$

### 拓展知识

- 二次函数的图像是**轴对称图形**，对称轴是过顶点且垂直于x轴的直线。
- 当$\\Delta > 0$时，抛物线与x轴有两个交点；当$\\Delta = 0$时，有一个交点；当$\\Delta < 0$时，没有交点。
- 二次函数在实际问题中的应用：求最大利润、最大面积等。`
  },
  {
    id: 'math_040',
    title: '圆',
    stage: 'middle',
    chapter: '圆',
    tags: ['圆', '圆心', '半径', '弧', '弦', '圆心角', '圆周角', '切线'],
    content: `## 圆

### 核心概念

**圆**：平面内到定点的距离等于定长的点的集合。

**圆心**：圆的中心，记为O。

**半径**：圆心到圆上任意一点的距离，记为r。

**直径**：通过圆心且两端都在圆上的线段，直径 = 2r。

**弧**：圆上任意两点间的部分，大于半圆的弧叫优弧，小于半圆的弧叫劣弧。

**弦**：连接圆上任意两点的线段。

**圆心角**：顶点在圆心，两边都与圆相交的角。

**圆周角**：顶点在圆上，两边都与圆相交的角。

**切线**：与圆只有一个公共点的直线。

### 公式总结

| 公式 | 说明 |
|------|------|
| $C = 2\\pi r$ | 圆的周长 |
| $S = \\pi r^2$ | 圆的面积 |
| 圆心角 = 所对弧的度数 | 圆心角定理 |
| 圆周角 = $\\frac{1}{2}$圆心角 | 圆周角定理 |
| 同弧所对的圆周角相等 | 圆周角定理推论 |
| 直径所对的圆周角 = 90° | 圆周角定理推论 |
| 切线垂直于过切点的半径 | 切线性质 |

### 数学示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <circle cx="150" cy="75" r="50" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" />
  <circle cx="150" cy="75" r="4" fill="var(--color-text-primary)" />
  <text x="155" y="80" font-size="10" fill="var(--color-text-primary)">O</text>
  <line x1="150" y1="75" x2="200" y2="75" stroke="var(--color-primary)" stroke-width="2" />
  <text x="175" y="70" font-size="10" fill="var(--color-text-secondary)">r</text>
  <line x1="100" y1="75" x2="200" y2="75" stroke="var(--color-border)" stroke-width="1" />
  <text x="150" y="85" font-size="10" fill="var(--color-text-secondary)">直径</text>
  <text x="150" y="140" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">圆的基本元素</text>
</svg>

### 例题解析

**问题**：在圆O中，半径为5cm，圆心角∠AOB = 60°，求弦AB的长度。

**解答**：

因为OA = OB = 5cm，∠AOB = 60°，

所以△AOB是等边三角形，

所以AB = OA = 5cm。

### 举一反三

**练习1**：圆的直径为10cm，求圆的周长和面积。
- 答案：周长 = $10\\pi$ cm，面积 = $25\\pi$ cm²

**练习2**：在圆中，一条弧所对的圆心角为100°，求这条弧所对的圆周角的度数。
- 答案：50°

### 拓展知识

- 圆是**轴对称图形**，任何一条直径所在直线都是对称轴。
- 圆是**中心对称图形**，圆心是对称中心。
- 垂径定理：垂直于弦的直径平分弦，并且平分弦所对的两条弧。
- 切线长定理：从圆外一点引圆的两条切线，切线长相等。`
  },
  {
    id: 'math_041',
    title: '相似三角形',
    stage: 'middle',
    chapter: '相似三角形',
    tags: ['相似三角形', '相似比', '判定', '性质'],
    content: `## 相似三角形

### 核心概念

**相似图形**：形状相同，大小不一定相同的图形。

**相似三角形**：对应角相等，对应边成比例的两个三角形。

**相似比**：相似三角形对应边的比。

**相似三角形的判定**：AA、SAS、SSS。

### 公式总结

| 判定方法 | 说明 |
|----------|------|
| AA | 两角分别相等的两个三角形相似 |
| SAS | 两边成比例且夹角相等的两个三角形相似 |
| SSS | 三边成比例的两个三角形相似 |

| 性质 | 说明 |
|------|------|
| 对应角相等 | 相似三角形性质 |
| 对应边成比例 | 相似三角形性质 |
| 周长比 = 相似比 | 相似三角形性质 |
| 面积比 = 相似比的平方 | 相似三角形性质 |

### 数学示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <path d="M40 120 L100 50 L140 120 Z" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" />
  <text x="90" y="95" font-size="10" fill="var(--color-text-primary)">$\\triangle ABC$</text>
  <path d="M180 120 L260 50 L300 120 Z" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" />
  <text x="270" y="95" font-size="10" fill="var(--color-text-primary)">$\\triangle A'B'C'$</text>
  <text x="150" y="140" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">相似三角形（相似比k）</text>
</svg>

### 例题解析

**问题**：在△ABC和△DEF中，∠A = ∠D = 60°，∠B = ∠E = 40°，求证△ABC ∽ △DEF。

**解答**：

在△ABC中，∠C = 180° - 60° - 40° = 80°

在△DEF中，∠F = 180° - 60° - 40° = 80°

所以∠A = ∠D，∠B = ∠E，∠C = ∠F

根据AA判定，△ABC ∽ △DEF

### 举一反三

**练习1**：两个相似三角形的相似比为2:3，周长比是多少？面积比是多少？
- 答案：周长比 = 2:3，面积比 = 4:9

**练习2**：在△ABC中，DE ∥ BC，AD = 2，DB = 4，DE = 3，求BC的长度。
- 答案：由相似三角形，$\\frac{DE}{BC} = \\frac{AD}{AB} = \\frac{2}{6} = \\frac{1}{3}$，所以BC = 9

### 拓展知识

- 相似三角形的对应高、对应中线、对应角平分线的比都等于相似比。
- 位似图形：对应顶点的连线相交于一点的相似图形。
- 相似三角形在实际问题中的应用：测量物体高度、距离等。`
  },
  {
    id: 'math_042',
    title: '锐角三角函数',
    stage: 'middle',
    chapter: '锐角三角函数',
    tags: ['三角函数', '正弦', '余弦', '正切', '解直角三角形'],
    content: `## 锐角三角函数

### 核心概念

**锐角三角函数**：在直角三角形中，锐角的正弦、余弦、正切。

**正弦**：$\\sin A = \\frac{对边}{斜边}$

**余弦**：$\\cos A = \\frac{邻边}{斜边}$

**正切**：$\\tan A = \\frac{对边}{邻边}$

**特殊角的三角函数值**：30°、45°、60°的三角函数值。

**解直角三角形**：由直角三角形的已知元素求未知元素的过程。

### 公式总结

| 三角函数 | 定义 |
|----------|------|
| $\\sin A = \\frac{a}{c}$ | 对边/斜边 |
| $\\cos A = \\frac{b}{c}$ | 邻边/斜边 |
| $\\tan A = \\frac{a}{b}$ | 对边/邻边 |

| 角度 | $\\sin$ | $\\cos$ | $\\tan$ |
|------|--------|--------|--------|
| 30° | $\\frac{1}{2}$ | $\\frac{\\sqrt{3}}{2}$ | $\\frac{\\sqrt{3}}{3}$ |
| 45° | $\\frac{\\sqrt{2}}{2}$ | $\\frac{\\sqrt{2}}{2}$ | 1 |
| 60° | $\\frac{\\sqrt{3}}{2}$ | $\\frac{1}{2}$ | $\\sqrt{3}$ |

### 数学示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <path d="M50 150 L170 150 L50 70 Z" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" stroke-width="2" />
  <circle cx="50" cy="150" r="4" fill="var(--color-text-primary)" />
  <text x="45" y="160" font-size="10" fill="var(--color-text-primary)">C</text>
  <circle cx="170" cy="150" r="4" fill="var(--color-text-primary)" />
  <text x="175" y="160" font-size="10" fill="var(--color-text-primary)">B</text>
  <circle cx="50" cy="70" r="4" fill="var(--color-text-primary)" />
  <text x="45" y="65" font-size="10" fill="var(--color-text-primary)">A</text>
  <text x="65" y="115" font-size="10" fill="var(--color-text-secondary)">a(对边)</text>
  <text x="110" y="155" font-size="10" fill="var(--color-text-secondary)">b(邻边)</text>
  <text x="85" y="90" font-size="10" fill="var(--color-text-secondary)">c(斜边)</text>
  <rect x="40" y="140" width="10" height="10" fill="var(--color-text-primary)" />
  <text x="120" y="120" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">$\\sin A = \\frac{a}{c}$</text>
</svg>

### 例题解析

**问题**：在直角三角形ABC中，∠C = 90°，∠A = 30°，BC = 5cm，求AB和AC的长度。

**解答**：

因为∠A = 30°，所以BC是∠A的对边，

$\\sin 30° = \\frac{BC}{AB}$，即 $\\frac{1}{2} = \\frac{5}{AB}$，所以AB = 10cm

$\\cos 30° = \\frac{AC}{AB}$，即 $\\frac{\\sqrt{3}}{2} = \\frac{AC}{10}$，所以AC = $5\\sqrt{3}$ cm

### 举一反三

**练习1**：计算 $\\sin 60° + \\cos 45°$。
- 答案：$\\frac{\\sqrt{3}}{2} + \\frac{\\sqrt{2}}{2}$

**练习2**：在直角三角形中，∠C = 90°，AC = 6，BC = 8，求∠A的正切值。
- 答案：$\\tan A = \\frac{BC}{AC} = \\frac{8}{6} = \\frac{4}{3}$

### 拓展知识

- 同角三角函数关系：$\\sin^2 A + \\cos^2 A = 1$，$\\tan A = \\frac{\\sin A}{\\cos A}$。
- 互余角的三角函数关系：$\\sin A = \\cos(90° - A)$，$\\tan A = \\cot(90° - A)$。
- 三角函数在实际问题中的应用：测量高度、坡度、角度等。`
  },
  {
    id: 'math_043',
    title: '概率初步',
    stage: 'middle',
    chapter: '概率初步',
    tags: ['概率', '随机事件', '频率', '概率计算'],
    content: `## 概率初步

### 核心概念

**随机事件**：在一定条件下可能发生也可能不发生的事件。

**必然事件**：在一定条件下必然会发生的事件，概率为1。

**不可能事件**：在一定条件下不可能发生的事件，概率为0。

**概率**：事件发生的可能性大小，记为P(A)，$0 \\leq P(A) \\leq 1$。

**频率**：在多次重复试验中，事件发生的次数与试验总次数的比值。

### 公式总结

| 公式 | 说明 |
|------|------|
| $P(A) = \\frac{事件A包含的结果数}{所有可能的结果数}$ | 概率公式 |
| 频率 = $\\frac{事件A发生的次数}{试验总次数}$ | 频率公式 |
| $P(必然事件) = 1$ | 必然事件的概率 |
| $P(不可能事件) = 0$ | 不可能事件的概率 |

### 数学示意图

<svg width="300" height="120" viewBox="0 0 300 120">
  <rect x="50" y="40" width="200" height="60" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" />
  <text x="150" y="75" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">所有可能的结果</text>
  <circle cx="100" cy="70" r="20" fill="var(--color-primary)" opacity="0.4" />
  <text x="100" y="75" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">事件A</text>
</svg>

### 例题解析

**问题**：从1, 2, 3, 4, 5中随机抽取一个数，求抽到奇数的概率。

**解答**：

所有可能的结果数：5

事件"抽到奇数"包含的结果：1, 3, 5，共3个

概率：$P = \\frac{3}{5} = 0.6$

### 举一反三

**练习1**：掷一枚硬币，正面朝上的概率是多少？
- 答案：$\\frac{1}{2}$

**练习2**：从一副扑克牌（52张）中随机抽取一张，抽到红桃的概率是多少？
- 答案：$\\frac{13}{52} = \\frac{1}{4}$

### 拓展知识

- 概率是**理论值**，频率是**实验值**。
- 当试验次数很大时，频率会**趋近于**概率。
- 互斥事件：不能同时发生的两个事件，$P(A \\cup B) = P(A) + P(B)$。
- 对立事件：两个互斥事件必有一个发生，$P(\\overline{A}) = 1 - P(A)$。`
  },
  {
    id: 'math_044',
    title: '数学归纳法',
    stage: 'high',
    chapter: '选择性必修二·数学归纳法',
    tags: ['数学归纳法', '归纳基础', '归纳假设', '归纳递推'],
    content: `## 数学归纳法

### 核心概念

**数学归纳法**：证明与正整数n有关的命题的一种方法。

**归纳基础**：证明当n取第一个值n₀（通常n₀ = 1）时命题成立。

**归纳假设**：假设当n = k（k ≥ n₀，k为正整数）时命题成立。

**归纳递推**：由归纳假设出发，证明当n = k + 1时命题也成立。

### 公式总结

| 步骤 | 说明 |
|------|------|
| 步骤1 | 验证n = n₀时命题成立（归纳基础） |
| 步骤2 | 假设n = k时命题成立（归纳假设） |
| 步骤3 | 证明n = k + 1时命题成立（归纳递推） |
| 结论 | 由步骤1和步骤3，命题对所有n ≥ n₀的正整数都成立 |

### 数学示意图

<svg width="300" height="120" viewBox="0 0 300 120">
  <rect x="50" y="30" width="60" height="40" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" />
  <text x="80" y="55" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">n=1</text>
  <rect x="120" y="30" width="60" height="40" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" />
  <text x="150" y="55" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">n=k</text>
  <rect x="190" y="30" width="60" height="40" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" />
  <text x="220" y="55" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">n=k+1</text>
  <path d="M110 50 L120 50" stroke="var(--color-border)" stroke-width="2" marker-end="url(#arrow)" />
  <path d="M180 50 L190 50" stroke="var(--color-border)" stroke-width="2" marker-end="url(#arrow)" />
  <text x="150" y="95" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">数学归纳法步骤</text>
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-border)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：用数学归纳法证明：$1 + 2 + 3 + \\cdots + n = \\frac{n(n + 1)}{2}$

**解答**：

(1) 当n = 1时，左边 = 1，右边 = $\\frac{1 \\times 2}{2} = 1$，等式成立。

(2) 假设当n = k时等式成立，即 $1 + 2 + \\cdots + k = \\frac{k(k + 1)}{2}$

(3) 当n = k + 1时：

$$ 1 + 2 + \\cdots + k + (k + 1) = \\frac{k(k + 1)}{2} + (k + 1) $$
$$ = (k + 1)(\\frac{k}{2} + 1) = (k + 1)\\frac{k + 2}{2} = \\frac{(k + 1)(k + 2)}{2} $$

所以当n = k + 1时等式也成立。

由(1)(2)(3)，等式对所有正整数n都成立。

### 举一反三

**练习1**：用数学归纳法证明：$1^2 + 2^2 + \\cdots + n^2 = \\frac{n(n + 1)(2n + 1)}{6}$
- 提示：归纳基础n=1成立，归纳假设n=k成立，证明n=k+1时左边 = $\\frac{k(k+1)(2k+1)}{6} + (k+1)^2$

**练习2**：用数学归纳法证明：$2^n > n$（n ≥ 1）
- 提示：n=1时2>1成立，假设n=k时成立，证明n=k+1时$2^{k+1} = 2 \\times 2^k > 2k > k + 1$

### 拓展知识

- 数学归纳法的**两个步骤缺一不可**，缺少归纳基础或归纳递推都不能完成证明。
- 数学归纳法适用于证明与**正整数n有关**的命题。
- 数学归纳法的变形：第二数学归纳法、反向数学归纳法等。`
  },
  {
    id: 'math_045',
    title: '参数方程与极坐标',
    stage: 'high',
    chapter: '选择性必修一·参数方程与极坐标',
    tags: ['参数方程', '极坐标', '直角坐标', '转换'],
    content: `## 参数方程与极坐标

### 核心概念

**参数方程**：用参数表示曲线上点的坐标的方程。

**参数**：用来表示曲线上点的坐标的变量，通常用t表示。

**极坐标**：用极径和极角表示平面内点的位置的坐标系。

**极径**：从极点到点的距离，记为ρ（ρ ≥ 0）。

**极角**：从极轴到极径的角度，记为θ。

**极坐标与直角坐标的转换**：$x = \\rho \\cos\\theta$，$y = \\rho \\sin\\theta$，$\\rho^2 = x^2 + y^2$，$\\tan\\theta = \\frac{y}{x}$（x ≠ 0）。

### 公式总结

| 转换关系 | 公式 |
|----------|------|
| $x = \\rho \\cos\\theta$ | 极坐标转直角坐标 |
| $y = \\rho \\sin\\theta$ | 极坐标转直角坐标 |
| $\\rho^2 = x^2 + y^2$ | 直角坐标转极坐标 |
| $\\tan\\theta = \\frac{y}{x}$（x ≠ 0） | 直角坐标转极坐标 |

| 曲线 | 参数方程 |
|------|----------|
| 直线 | $\\begin{cases} x = x_0 + t\\cos\\alpha \\\\ y = y_0 + t\\sin\\alpha \\end{cases}$（t为参数） |
| 圆（圆心在原点） | $\\begin{cases} x = r\\cos\\theta \\\\ y = r\\sin\\theta \\end{cases}$（θ为参数） |
| 椭圆 | $\\begin{cases} x = a\\cos\\theta \\\\ y = b\\sin\\theta \\end{cases}$（θ为参数） |

### 数学示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <line x1="30" y1="100" x2="270" y2="100" stroke="var(--color-border)" stroke-width="1" />
  <line x1="150" y1="20" x2="150" y2="160" stroke="var(--color-border)" stroke-width="1" />
  <circle cx="150" cy="100" r="60" fill="none" stroke="var(--color-border)" stroke-width="1" />
  <circle cx="200" cy="60" r="4" fill="var(--color-primary)" />
  <text x="210" y="65" font-size="12" fill="var(--color-text-primary)">P(ρ, θ)</text>
  <line x1="150" y1="100" x2="200" y2="60" stroke="var(--color-primary)" stroke-width="2" />
  <text x="175" y="85" font-size="10" fill="var(--color-text-secondary)">ρ</text>
  <text x="155" y="95" font-size="10" fill="var(--color-text-secondary)">θ</text>
  <text x="150" y="105" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">O</text>
  <text x="150" y="175" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">极坐标系</text>
</svg>

### 例题解析

**问题**：将极坐标$(2, \\frac{\\pi}{3})$转换为直角坐标。

**解答**：

$x = \\rho \\cos\\theta = 2 \\times \\cos\\frac{\\pi}{3} = 2 \\times \\frac{1}{2} = 1$

$y = \\rho \\sin\\theta = 2 \\times \\sin\\frac{\\pi}{3} = 2 \\times \\frac{\\sqrt{3}}{2} = \\sqrt{3}$

所以直角坐标为$(1, \\sqrt{3})$

### 举一反三

**练习1**：将直角坐标$(\\sqrt{3}, 1)$转换为极坐标。
- 答案：$\\rho = \\sqrt{3 + 1} = 2$，$\\tan\\theta = \\frac{1}{\\sqrt{3}}$，$\\theta = \\frac{\\pi}{6}$，极坐标为$(2, \\frac{\\pi}{6})$

**练习2**：写出圆$(x - 1)^2 + y^2 = 1$的参数方程。
- 答案：$\\begin{cases} x = 1 + \\cos\\theta \\\\ y = \\sin\\theta \\end{cases}$（θ为参数）

### 拓展知识

- 参数方程中参数t可以有**几何意义**，如直线参数方程中t表示点到定点的距离。
- 极坐标中，同一个点可以有**多种表示方法**，如$(ρ, θ)$和$(ρ, θ + 2kπ)$表示同一个点。
- 心形线的极坐标方程：$\\rho = a(1 - \\cos\\theta)$或$\\rho = a(1 - \\sin\\theta)$。`
  },
  {
    id: 'math_046',
    title: '不等式选讲',
    stage: 'high',
    chapter: '选择性必修三·不等式选讲',
    tags: ['不等式', '绝对值不等式', '均值不等式', '柯西不等式'],
    content: `## 不等式选讲

### 核心概念

**绝对值不等式**：含有绝对值的不等式。

**均值不等式**：基本不等式、算术-几何均值不等式。

**柯西不等式**：$(a_1b_1 + a_2b_2 + \\cdots + a_nb_n)^2 \\leq (a_1^2 + a_2^2 + \\cdots + a_n^2)(b_1^2 + b_2^2 + \\cdots + b_n^2)$

**排序不等式**：设$a_1 \\leq a_2 \\leq \\cdots \\leq a_n$，$b_1 \\leq b_2 \\leq \\cdots \\leq b_n$，则$a_1b_1 + a_2b_2 + \\cdots + a_nb_n \\geq a_1b_{\\sigma(1)} + a_2b_{\\sigma(2)} + \\cdots + a_nb_{\\sigma(n)} \\geq a_1b_n + a_2b_{n-1} + \\cdots + a_nb_1$。

### 公式总结

| 不等式 | 公式 | 等号条件 |
|--------|------|----------|
| 基本不等式 | $a + b \\geq 2\\sqrt{ab}$（a, b > 0） | a = b |
| 均值不等式 | $\\frac{a_1 + a_2 + \\cdots + a_n}{n} \\geq \\sqrt[n]{a_1a_2\\cdots a_n}$（$a_i > 0$） | $a_1 = a_2 = \\cdots = a_n$ |
| 柯西不等式 | $(a_1b_1 + a_2b_2)^2 \\leq (a_1^2 + a_2^2)(b_1^2 + b_2^2)$ | $\\frac{a_1}{b_1} = \\frac{a_2}{b_2}$ |
| 绝对值三角不等式 | $||a| - |b|| \\leq |a \\pm b| \\leq |a| + |b|$ | 同向时取等号 |

### 数学示意图

<svg width="300" height="120" viewBox="0 0 300 120">
  <rect x="50" y="40" width="100" height="50" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" />
  <text x="100" y="70" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">基本不等式</text>
  <rect x="160" y="40" width="100" height="50" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" />
  <text x="210" y="70" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">柯西不等式</text>
  <text x="150" y="110" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">重要不等式</text>
</svg>

### 例题解析

**问题**：已知a > 0，b > 0，且a + b = 4，求ab的最大值。

**解答**：

由基本不等式：

$$ a + b \\geq 2\\sqrt{ab} $$

$$ 4 \\geq 2\\sqrt{ab} $$

$$ \\sqrt{ab} \\leq 2 $$

$$ ab \\leq 4 $$

当且仅当a = b = 2时，等号成立，所以ab的最大值为4。

### 举一反三

**练习1**：已知x > 0，求$x + \\frac{1}{x}$的最小值。
- 答案：由基本不等式，$x + \\frac{1}{x} \\geq 2$，当x = 1时取等号，最小值为2

**练习2**：求函数$f(x) = |x - 1| + |x - 3|$的最小值。
- 答案：由绝对值三角不等式，$|x - 1| + |x - 3| \\geq |(x - 1) - (x - 3)| = 2$，最小值为2

### 拓展知识

- 基本不等式的推广：$\\frac{a}{b} + \\frac{b}{a} \\geq 2$（a, b同号）。
- 柯西不等式的向量形式：$(\\vec{a} \\cdot \\vec{b})^2 \\leq |\\vec{a}|^2|\\vec{b}|^2$。
- 利用不等式求最值时，必须**验证等号成立的条件**。`
  }
];

export const stages = {
  all: { icon: '📚' },
  middle: { icon: '📖' },
  high: { icon: '🔬' }
};

export const practiceQuestions = [
  {
    id: 'q001',
    pointId: 'math_001',
    question: '下列各数中，属于有理数的是？',
    options: ['π', '√2', '0.5', '无限不循环小数'],
    answer: 2,
    explanation: '0.5可以表示为1/2，是有理数'
  },
  {
    id: 'q002',
    pointId: 'math_003',
    question: '方程 2x + 5 = 11 的解是？',
    options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
    answer: 1,
    explanation: '2x = 6，x = 3'
  },
  {
    id: 'q003',
    pointId: 'math_011',
    question: '三角形三内角和等于多少度？',
    options: ['90°', '180°', '270°', '360°'],
    answer: 1,
    explanation: '三角形内角和定理：三角形三内角和为180°'
  },
  {
    id: 'q004',
    pointId: 'math_017',
    question: '直角三角形两直角边分别为3cm和4cm，斜边长度是？',
    options: ['5cm', '6cm', '7cm', '12cm'],
    answer: 0,
    explanation: '根据勾股定理：√(3²+4²) = √25 = 5cm'
  },
  {
    id: 'q005',
    pointId: 'math_019',
    question: '一次函数 y = 2x + 1 的斜率是？',
    options: ['1', '2', '-2', '1/2'],
    answer: 1,
    explanation: '一次函数 y = kx + b 中，k是斜率，这里k = 2'
  },
  {
    id: 'q006',
    pointId: 'math_020',
    question: '设集合 A = {1,2,3}，B = {2,3,4}，则 A∩B = ？',
    options: ['{1,2,3,4}', '{2,3}', '{1,4}', '∅'],
    answer: 1,
    explanation: '交集是两个集合共有的元素：{2,3}'
  },
  {
    id: 'q007',
    pointId: 'math_021',
    question: '方程 x² - 5x + 6 = 0 的根是？',
    options: ['x = 1, x = 6', 'x = 2, x = 3', 'x = -2, x = -3', 'x = -1, x = -6'],
    answer: 1,
    explanation: '(x-2)(x-3)=0，所以x=2或x=3'
  },
  {
    id: 'q008',
    pointId: 'math_022',
    question: '函数 f(x) = x³ 是奇函数还是偶函数？',
    options: ['奇函数', '偶函数', '既是奇函数又是偶函数', '非奇非偶函数'],
    answer: 0,
    explanation: 'f(-x) = (-x)³ = -x³ = -f(x)，是奇函数'
  },
  {
    id: 'q009',
    pointId: 'math_023',
    question: 'log₂8 的值是？',
    options: ['2', '3', '4', '8'],
    answer: 1,
    explanation: '2³ = 8，所以log₂8 = 3'
  },
  {
    id: 'q010',
    pointId: 'math_024',
    question: 'sin30° 的值是？',
    options: ['1/2', '√2/2', '√3/2', '1'],
    answer: 0,
    explanation: 'sin30° = 1/2'
  },
  {
    id: 'q011',
    pointId: 'math_025',
    question: '向量 a = (1,2)，b = (3,4)，则 a·b = ？',
    options: ['5', '11', '7', '10'],
    answer: 1,
    explanation: 'a·b = 1×3 + 2×4 = 3 + 8 = 11'
  },
  {
    id: 'q012',
    pointId: 'math_026',
    question: '复数 (1+i)(1-i) 的值是？',
    options: ['2i', '-2i', '2', '-2'],
    answer: 2,
    explanation: '(1+i)(1-i) = 1 - i² = 1 + 1 = 2'
  },
  {
    id: 'q013',
    pointId: 'math_027',
    question: '圆柱底面半径为r，高为h，体积公式是？',
    options: ['πrh', '2πrh', 'πr²h', '2πr²h'],
    answer: 2,
    explanation: '圆柱体积 V = πr²h'
  },
  {
    id: 'q014',
    pointId: 'math_033',
    question: '等差数列 {aₙ} 中，a₁ = 1，d = 2，则 a₅ = ？',
    options: ['5', '7', '9', '11'],
    answer: 2,
    explanation: 'a₅ = a₁ + 4d = 1 + 8 = 9'
  },
  {
    id: 'q015',
    pointId: 'math_034',
    question: '函数 f(x) = x² 的导数是？',
    options: ['x', '2x', '2', 'x³/3'],
    answer: 1,
    explanation: '(x²)\' = 2x'
  },
  {
    id: 'q016',
    pointId: 'math_035',
    question: '从5人中选出3人排成一行，有多少种排法？',
    options: ['10', '60', '120', '20'],
    answer: 1,
    explanation: 'A₅³ = 5×4×3 = 60'
  },
  {
    id: 'q017',
    pointId: 'math_031',
    question: '圆心在(0,0)，半径为5的圆的方程是？',
    options: ['x² + y² = 5', 'x² + y² = 25', '(x-5)² + y² = 0', 'x² + (y-5)² = 0'],
    answer: 1,
    explanation: '圆的标准方程：x² + y² = r² = 25'
  },
  {
    id: 'q018',
    pointId: 'math_032',
    question: '椭圆 x²/4 + y²/3 = 1 的长轴长是？',
    options: ['2', '4', '√3', '2√3'],
    answer: 1,
    explanation: 'a² = 4，a = 2，长轴长 = 2a = 4'
  },
  {
    id: 'q019',
    pointId: 'math_038',
    question: '反比例函数 y = 6/x 的图像位于哪些象限？',
    options: ['第一、二象限', '第一、三象限', '第二、四象限', '第三、四象限'],
    answer: 1,
    explanation: 'k = 6 > 0，双曲线位于第一、三象限'
  },
  {
    id: 'q020',
    pointId: 'math_042',
    question: '在直角三角形中，∠A = 45°，则 sinA = ？',
    options: ['1/2', '√2/2', '√3/2', '1'],
    answer: 1,
    explanation: 'sin45° = √2/2'
  }
];

export default mathKnowledgePoints;
