export const PHYSICS_001 = `## 机械运动

### 核心概念

**机械运动**：物体位置随时间的变化。

**参照物**：判断物体运动或静止时所选取的标准物体。

**速度**：描述物体运动快慢的物理量，$v = s/t$。

**匀速直线运动**：速度大小和方向都不变的运动。

### 公式总结

| 公式 | 说明 |
|------|------|
| $v = s/t$ | 速度定义式 |
| $s = vt$ | 路程与速度、时间的关系 |
| $t = s/v$ | 时间与路程、速度的关系 |

### 物理示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <rect x="20" y="100" width="260" height="10" fill="var(--color-border)" />
  <circle cx="50" cy="95" r="8" fill="var(--color-primary)" />
  <text x="50" y="125" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">起点</text>
  <circle cx="250" cy="95" r="8" fill="var(--color-primary)" />
  <text x="250" y="125" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">终点</text>
  <path d="M60 95 L240 95" stroke="var(--color-primary)" stroke-width="2" stroke-dasharray="5,3" />
  <text x="150" y="80" font-size="14" text-anchor="middle" fill="var(--color-text-primary)">s = vt</text>
  <text x="150" y="140" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">路程 s</text>
</svg>

### 例题解析

**问题**：一辆汽车在平直公路上匀速行驶，3小时行驶了180km，求汽车的速度。

**解答**：

$$ v = \\frac{s}{t} = \\frac{180km}{3h} = 60km/h $$

### 举一反三

**练习1**：小明跑步的速度是5m/s，跑100m需要多长时间？
- 答案：$t = s/v = 100/5 = 20s$

**练习2**：火车以120km/h的速度行驶，2小时能行驶多远？
- 答案：$s = vt = 120×2 = 240km$

### 拓展知识

- 物体的运动和静止是**相对的**，取决于所选的参照物。
- 速度的国际单位是**米/秒(m/s)**，常用单位还有**千米/小时(km/h)**。
- $1m/s = 3.6km/h$`;
export const PHYSICS_002 = `## 声现象

### 核心概念

**声音的产生**：声音是由物体振动产生的。

**声音的传播**：声音需要介质传播，真空不能传声。

**声速**：声音在空气中的传播速度约为340m/s。

**音调**：由频率决定，频率越高，音调越高。

**响度**：由振幅决定，振幅越大，响度越大。

**音色**：由发声体的材料和结构决定。

### 公式总结

| 公式 | 说明 |
|------|------|
| $v = λf$ | 波速公式 |
| $v_{空气} ≈ 340m/s$ | 空气中的声速 |
| $f = 1/T$ | 频率与周期的关系 |

### 物理示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <circle cx="50" cy="75" r="20" fill="var(--color-primary)" opacity="0.3">
    <animate attributeName="r" values="20;25;20" dur="1s" repeatCount="indefinite" />
  </circle>
  <circle cx="50" cy="75" r="30" fill="none" stroke="var(--color-primary)" stroke-width="2" opacity="0.5">
    <animate attributeName="r" values="30;40;30" dur="1s" repeatCount="indefinite" />
  </circle>
  <circle cx="50" cy="75" r="40" fill="none" stroke="var(--color-primary)" stroke-width="1" opacity="0.3">
    <animate attributeName="r" values="40;55;40" dur="1s" repeatCount="indefinite" />
  </circle>
  <text x="50" y="75" font-size="16" text-anchor="middle" fill="var(--color-text-primary)">声源</text>
  <path d="M100 75 L280 75" stroke="var(--color-border)" stroke-width="1" />
  <circle cx="280" cy="75" r="15" fill="none" stroke="var(--color-primary)" stroke-width="2" />
  <text x="280" y="75" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">人耳</text>
  <text x="190" y="55" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">声波传播</text>
</svg>

### 例题解析

**问题**：某人看到闪电后5s听到雷声，闪电处离人有多远？(声速取340m/s)

**解答**：

$$ s = vt = 340 × 5 = 1700m $$

### 举一反三

**练习1**：声音在水中的传播速度约为1500m/s，某人在水面上敲击，0.2s后在水中听到声音，求敲击点距离。
- 答案：$s = vt = 1500 × 0.2 = 300m$

**练习2**：一个音叉的频率为512Hz，声波波长是多少？(声速取340m/s)
- 答案：$λ = v/f = 340/512 ≈ 0.66m$

### 拓展知识

- 人耳能听到的声音频率范围是**20Hz-20000Hz**。
- 频率高于20000Hz的声音叫**超声波**，低于20Hz的叫**次声波**。
- 超声波可以用于**B超检查**、**声呐探测**等。`;
export const PHYSICS_003 = `## 物态变化

### 核心概念

**熔化**：物质从固态变为液态的过程，需要吸热。

**凝固**：物质从液态变为固态的过程，需要放热。

**汽化**：物质从液态变为气态的过程，需要吸热。

**液化**：物质从气态变为液态的过程，需要放热。

**升华**：物质从固态直接变为气态的过程，需要吸热。

**凝华**：物质从气态直接变为固态的过程，需要放热。

### 公式总结

| 公式 | 说明 |
|------|------|
| $Q_{熔} = mL$ | 熔化吸热公式 |
| $Q_{汽} = mL_v$ | 汽化吸热公式 |
| $L_{水} = 3.34×10^5J/kg$ | 冰的熔化热 |
| $L_{v水} = 2.26×10^6J/kg$ | 水的汽化热 |

### 物理示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <rect x="100" y="150" width="100" height="30" fill="var(--color-primary)" opacity="0.6" />
  <text x="150" y="170" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">固态</text>
  <rect x="100" y="90" width="100" height="30" fill="var(--color-primary)" opacity="0.4" />
  <text x="150" y="110" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">液态</text>
  <circle cx="150" cy="30" r="20" fill="var(--color-primary)" opacity="0.2" />
  <text x="150" y="35" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">气态</text>
  <path d="M150 140 L150 100" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#arrow)" />
  <text x="170" y="120" font-size="10" fill="var(--color-text-secondary)">熔化(吸热)</text>
  <path d="M150 100 L150 140" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#arrow)" />
  <text x="60" y="120" font-size="10" fill="var(--color-text-secondary)">凝固(放热)</text>
  <path d="M150 80 L150 40" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#arrow)" />
  <text x="170" y="60" font-size="10" fill="var(--color-text-secondary)">汽化(吸热)</text>
  <path d="M150 40 L150 80" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#arrow)" />
  <text x="60" y="60" font-size="10" fill="var(--color-text-secondary)">液化(放热)</text>
  <path d="M100 165 L60 30" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="3,2" marker-end="url(#arrow)" />
  <text x="40" y="100" font-size="10" fill="var(--color-text-secondary)">升华(吸热)</text>
  <path d="M60 30 L100 165" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="3,2" marker-end="url(#arrow)" />
  <text x="20" y="100" font-size="10" fill="var(--color-text-secondary)">凝华(放热)</text>
  <defs>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="0" refY="4" orient="auto">
      <path d="M0,0 L0,8 L8,4 Z" fill="var(--color-primary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：1kg的冰完全融化成水，需要吸收多少热量？(冰的熔化热$L=3.34×10^5J/kg$)

**解答**：

$$ Q = mL = 1 × 3.34×10^5 = 3.34×10^5J $$

### 举一反三

**练习1**：0.5kg的水完全蒸发，需要吸收多少热量？(水的汽化热$L_v=2.26×10^6J/kg$)
- 答案：$Q = 0.5 × 2.26×10^6 = 1.13×10^6J$

**练习2**：为什么夏天在地面上洒水会感觉凉快？
- 答案：水蒸发时吸收热量，降低周围温度。

### 拓展知识

- 晶体熔化时**温度不变**，这个温度叫**熔点**。
- 晶体凝固时**温度不变**，这个温度叫**凝固点**。
- 蒸发可以在**任何温度**下进行，沸腾需要达到**沸点**。`;
export const PHYSICS_004 = `## 光的直线传播

### 核心概念

**光源**：能自行发光的物体。

**光的直线传播**：光在同种均匀介质中沿直线传播。

**光速**：光在真空中的传播速度$c = 3×10^8m/s$。

**影子的形成**：光沿直线传播时，遇到不透明物体，在物体后面形成暗区。

**小孔成像**：光沿直线传播的实例，成倒立的实像。

### 公式总结

| 公式 | 说明 |
|------|------|
| $c = 3×10^8m/s$ | 真空中的光速 |
| $s = ct$ | 光传播的距离 |

### 物理示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <circle cx="30" cy="75" r="15" fill="yellow" opacity="0.8" />
  <text x="30" y="75" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">光源</text>
  <path d="M45 75 L280 75" stroke="var(--color-primary)" stroke-width="2" />
  <path d="M45 55 L280 20" stroke="var(--color-primary)" stroke-width="2" />
  <path d="M45 95 L280 130" stroke="var(--color-primary)" stroke-width="2" />
  <rect x="150" y="50" width="80" height="50" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="190" y="80" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">不透明物体</text>
  <polygon points="230,50 230,100 280,75" fill="var(--color-text-primary)" opacity="0.3" />
  <text x="260" y="85" font-size="12" fill="var(--color-text-secondary)">影子</text>
</svg>

### 例题解析

**问题**：光从太阳传到地球需要约8分钟，求太阳到地球的距离。

**解答**：

$$ t = 8min = 480s $$

$$ s = ct = 3×10^8 × 480 = 1.44×10^{11}m $$

### 举一反三

**练习1**：光在水中的传播速度约为$2.25×10^8m/s$，光传播1km需要多长时间？
- 答案：$t = s/v = 1000/(2.25×10^8) ≈ 4.44×10^{-6}s$

**练习2**：为什么日食和月食可以用光的直线传播来解释？
- 答案：当月球运行到地球和太阳之间时，月球挡住了太阳射向地球的光，形成日食；当地球运行到月球和太阳之间时，地球挡住了太阳射向月球的光，形成月食。

### 拓展知识

- 光在真空中的速度**最快**，在其他介质中速度会变慢。
- 光年是**长度单位**，表示光在一年内传播的距离。
- 小孔成像成的是**倒立的实像**，像的大小与孔到物体和孔到光屏的距离有关。`;
export const PHYSICS_005 = `## 光的反射

### 核心概念

**反射**：光遇到物体表面时，一部分光返回原介质的现象。

**入射角**：入射光线与法线的夹角。

**反射角**：反射光线与法线的夹角。

**法线**：垂直于反射面的直线。

**平面镜成像**：像与物关于镜面对称。

### 公式总结

| 公式 | 说明 |
|------|------|
| $θ_{反射} = θ_{入射}$ | 反射定律 |
| 像距 = 物距 | 平面镜成像规律 |
| 像高 = 物高 | 平面镜成像规律 |

### 物理示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <line x1="150" y1="30" x2="150" y2="120" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="3,2" />
  <text x="155" y="80" font-size="10" fill="var(--color-text-secondary)">法线</text>
  <line x1="50" y1="120" x2="250" y2="120" stroke="var(--color-primary)" stroke-width="2" />
  <text x="260" y="125" font-size="10" fill="var(--color-text-secondary)">镜面</text>
  <path d="M80 60 L150 120" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#arrow2)" />
  <text x="100" y="85" font-size="10" fill="var(--color-text-secondary)">入射光线</text>
  <path d="M150 120 L220 60" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#arrow2)" />
  <text x="190" y="85" font-size="10" fill="var(--color-text-secondary)">反射光线</text>
  <circle cx="150" cy="120" r="5" fill="var(--color-primary)" />
  <text x="150" y="135" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">O</text>
  <text x="115" y="110" font-size="10" fill="var(--color-text-secondary)">θ₁</text>
  <text x="175" y="110" font-size="10" fill="var(--color-text-secondary)">θ₂</text>
  <defs>
    <marker id="arrow2" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-primary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：一束光线以40°的入射角射到平面镜上，反射角是多少？反射光线与入射光线的夹角是多少？

**解答**：

反射角 = 入射角 = 40°

反射光线与入射光线的夹角 = 40° + 40° = 80°

### 举一反三

**练习1**：反射光线与入射光线的夹角为120°，入射角是多少？
- 答案：入射角 = 120°/2 = 60°

**练习2**：人站在平面镜前2m处，像距镜面多远？人与像的距离是多少？
- 答案：像距镜面2m，人与像的距离是4m

### 拓展知识

- 光的反射分为**镜面反射**和**漫反射**。
- 镜面反射：平行光入射，反射光也是平行的。
- 漫反射：平行光入射，反射光向各个方向。
- 我们能看到不发光的物体，是因为它们发生了**漫反射**。`;
export const PHYSICS_006 = `## 光的折射

### 核心概念

**折射**：光从一种介质进入另一种介质时，传播方向发生改变的现象。

**入射角**：入射光线与法线的夹角。

**折射角**：折射光线与法线的夹角。

**折射率**：描述介质对光的折射能力，$n = c/v$。

**全反射**：当光从光密介质射入光疏介质时，入射角大于临界角时发生的现象。

### 公式总结

| 公式 | 说明 |
|------|------|
| $n₁sinθ₁ = n₂sinθ₂$ | 斯涅尔定律 |
| $n = c/v$ | 折射率定义 |
| $sinC = n₂/n₁$ | 全反射临界角 |

### 物理示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <line x1="150" y1="20" x2="150" y2="160" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="3,2" />
  <text x="155" y="90" font-size="10" fill="var(--color-text-secondary)">法线</text>
  <line x1="30" y1="90" x2="270" y2="90" stroke="var(--color-primary)" stroke-width="2" />
  <text x="275" y="95" font-size="10" fill="var(--color-text-secondary)">界面</text>
  <rect x="0" y="0" width="300" height="90" fill="var(--color-bg-secondary)" opacity="0.3" />
  <text x="20" y="20" font-size="12" fill="var(--color-text-secondary)">空气(n=1)</text>
  <rect x="0" y="90" width="300" height="90" fill="var(--color-primary)" opacity="0.1" />
  <text x="20" y="110" font-size="12" fill="var(--color-text-secondary)">水(n=1.33)</text>
  <path d="M80 50 L150 90" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#arrow3)" />
  <text x="100" y="65" font-size="10" fill="var(--color-text-secondary)">入射光线</text>
  <path d="M150 90 L220 130" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#arrow3)" />
  <text x="190" y="115" font-size="10" fill="var(--color-text-secondary)">折射光线</text>
  <circle cx="150" cy="90" r="5" fill="var(--color-primary)" />
  <text x="150" y="100" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">O</text>
  <text x="125" y="75" font-size="10" fill="var(--color-text-secondary)">θ₁</text>
  <text x="175" y="110" font-size="10" fill="var(--color-text-secondary)">θ₂</text>
  <defs>
    <marker id="arrow3" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-primary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：光从空气(n=1)射入水中(n=1.33)，入射角为30°，求折射角。

**解答**：

根据斯涅尔定律

$$ 1 × sin30° = 1.33 × sinθ₂ $$

$$ sinθ₂ = \\frac{0.5}{1.33} ≈ 0.376 $$

$$ θ₂ ≈ 22° $$

### 举一反三

**练习1**：光从空气射入玻璃(n=1.5)，入射角为45°，折射角是多少？
- 答案：$sinθ₂ = sin45°/1.5 ≈ 0.471$，$θ₂ ≈ 28°$

**练习2**：光从水(n=1.33)射入空气，入射角为45°，会发生什么？
- 答案：$sinθ₂ = 1.33 × sin45° ≈ 0.94 > 1$，发生全反射

### 拓展知识

- 当光从**光密介质射入光疏介质**时，可能发生**全反射**现象。
- 光纤通信就是利用了全反射原理。
- 光的折射现象解释了为什么水中的筷子看起来是弯曲的。`;
export const PHYSICS_007 = `## 透镜及其应用

### 核心概念

**凸透镜**：中间厚、边缘薄的透镜，对光线有会聚作用。

**凹透镜**：中间薄、边缘厚的透镜，对光线有发散作用。

**焦点**：平行光线通过透镜后会聚或发散的点。

**焦距**：从透镜光心到焦点的距离。

**物距**：从物体到透镜光心的距离。

**像距**：从像到透镜光心的距离。

### 公式总结

| 公式 | 说明 |
|------|------|
| $1/f = 1/u + 1/v$ | 透镜成像公式 |
| $m = |v/u|$ | 放大率公式 |
| $m = h'/h$ | 像高与物高的关系 |

### 物理示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <line x1="30" y1="75" x2="270" y2="75" stroke="var(--color-border)" stroke-width="1" />
  <text x="275" y="80" font-size="10" fill="var(--color-text-secondary)">主光轴</text>
  <circle cx="150" cy="75" r="5" fill="var(--color-primary)" />
  <text x="150" y="90" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">O(光心)</text>
  <circle cx="90" cy="75" r="3" fill="var(--color-primary)" />
  <text x="90" y="90" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">F(焦点)</text>
  <circle cx="210" cy="75" r="3" fill="var(--color-primary)" />
  <text x="210" y="90" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">F'(焦点)</text>
  <path d="M40 50 L150 75" stroke="var(--color-primary)" stroke-width="2" />
  <path d="M150 75 L260 100" stroke="var(--color-primary)" stroke-width="2" />
  <rect x="140" y="50" width="20" height="50" fill="var(--color-primary)" opacity="0.3" />
  <line x1="140" y1="50" x2="160" y2="75" x1="160" y1="50" stroke="var(--color-primary)" stroke-width="2" />
  <line x1="140" y1="100" x2="160" y2="75" x1="160" y1="100" stroke="var(--color-primary)" stroke-width="2" />
  <rect x="240" y="90" width="15" height="30" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="247" y="130" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">像</text>
</svg>

### 例题解析

**问题**：一个凸透镜的焦距为10cm，物体放在距透镜25cm处，求像距和放大率。

**解答**：

根据 $1/f = 1/u + 1/v$

$$ 1/v = 1/10 - 1/25 = 3/50 $$

$$ v = 50/3 ≈ 16.7cm $$

放大率：$m = |v/u| = 16.7/25 ≈ 0.67$

### 举一反三

**练习1**：凸透镜焦距为15cm，物体放在距透镜20cm处，像距是多少？
- 答案：$1/v = 1/15 - 1/20 = 1/60$，$v = 60cm$

**练习2**：物体放在凸透镜的焦点上，成像情况如何？
- 答案：不成像，光线平行射出。

### 拓展知识

- 照相机利用**u > 2f**时的成像规律。
- 投影仪利用**f < u < 2f**时的成像规律。
- 放大镜利用**u < f**时的成像规律。
- 人眼的晶状体相当于一个**可变焦距的凸透镜**。`;
export const PHYSICS_008 = `## 质量与密度

### 核心概念

**质量**：物体所含物质的多少，是物体的基本属性。

**密度**：单位体积某种物质的质量，是物质的一种特性。

**公式**：$ρ = m/V$

**单位**：$kg/m³$ 或 $g/cm³$，$1g/cm³ = 1000kg/m³$

### 公式总结

| 公式 | 说明 |
|------|------|
| $ρ = m/V$ | 密度定义式 |
| $m = ρV$ | 质量与密度、体积的关系 |
| $V = m/ρ$ | 体积与密度、质量的关系 |

### 物理示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <rect x="50" y="80" width="60" height="50" fill="var(--color-primary)" opacity="0.4" stroke="var(--color-primary)" />
  <text x="80" y="140" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">铁块</text>
  <text x="80" y="70" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">m=790g</text>
  <text x="80" y="60" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">V=100cm³</text>
  <rect x="170" y="80" width="60" height="50" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" />
  <text x="200" y="140" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">木块</text>
  <text x="200" y="70" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">m=50g</text>
  <text x="200" y="60" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">V=100cm³</text>
  <path d="M120 105 L160 105" stroke="var(--color-border)" stroke-width="2" marker-end="url(#arrow4)" />
  <text x="140" y="95" font-size="10" fill="var(--color-text-secondary)">相同体积</text>
  <text x="140" y="120" font-size="12" fill="var(--color-primary)">密度不同</text>
  <defs>
    <marker id="arrow4" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-border)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：一个铁块的质量为790g，体积为100cm³，求铁的密度。

**解答**：

$$ ρ = \\frac{m}{V} = \\frac{790g}{100cm³} = 7.9g/cm³ = 7.9×10³kg/m³ $$

### 举一反三

**练习1**：水的密度是$1×10³kg/m³$，求500mL水的质量。
- 答案：$m = ρV = 1×10³ × 5×10^{-4} = 0.5kg = 500g$

**练习2**：一个铝块的质量为270g，铝的密度为$2.7g/cm³$，求体积。
- 答案：$V = m/ρ = 270/2.7 = 100cm³$

### 拓展知识

- 密度是物质的**固有属性**，与物质的质量和体积无关。
- 常见物质的密度：水$1×10³kg/m³$，铁$7.9×10³kg/m³$，铜$8.9×10³kg/m³$。
- 密度可以用来**鉴别物质**和**判断物体是否空心**。`;
export const PHYSICS_009 = `## 力

### 核心概念

**力**：物体对物体的作用。力不能脱离物体存在。

**力的三要素**：大小、方向、作用点。

**弹力**：物体发生弹性形变时产生的力。

**重力**：由于地球吸引而使物体受到的力，$G = mg$。

**摩擦力**：两个相互接触的物体相对运动或有相对运动趋势时产生的力。

### 公式总结

| 公式 | 说明 |
|------|------|
| $G = mg$ | 重力公式 |
| $g = 9.8N/kg$ | 重力加速度 |
| $f = μN$ | 滑动摩擦力公式 |

### 物理示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <rect x="100" y="100" width="100" height="30" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="150" y="120" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">物体</text>
  <path d="M150 100 L150 50" stroke="var(--color-primary)" stroke-width="3" marker-end="url(#arrow5)" />
  <text x="160" y="75" font-size="12" fill="var(--color-text-secondary)">F(拉力)</text>
  <path d="M150 130 L150 180" stroke="var(--color-text-primary)" stroke-width="3" marker-end="url(#arrow5)" />
  <text x="160" y="155" font-size="12" fill="var(--color-text-secondary)">G(重力)</text>
  <circle cx="150" cy="100" r="5" fill="var(--color-primary)" />
  <text x="150" y="95" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">作用点</text>
  <defs>
    <marker id="arrow5" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 Z" fill="currentColor" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：一个质量为50kg的物体，受到的重力是多少？(g取10N/kg)

**解答**：

$$ G = mg = 50 × 10 = 500N $$

### 举一反三

**练习1**：一个物体受到的重力为100N，求物体的质量。(g取10N/kg)
- 答案：$m = G/g = 100/10 = 10kg$

**练习2**：一个物体质量为2kg，在月球上受到的重力是多少？(月球上g约为地球的1/6)
- 答案：$G = mg_{月} = 2 × (10/6) ≈ 3.33N$

### 拓展知识

- 力是**矢量**，既有大小又有方向。
- 力的单位是**牛顿(N)**。
- 重力的方向总是**竖直向下**的。
- 弹力的方向与物体形变方向**相反**。`;
export const PHYSICS_010 = `## 牛顿第一定律

### 核心概念

**惯性**：物体保持原来运动状态的性质。质量是惯性大小的唯一量度。

**平衡状态**：物体处于静止或匀速直线运动状态时，称为平衡状态。

**牛顿第一定律**：物体在不受力或合外力为零时，保持静止或匀速直线运动状态。

### 公式总结

| 公式 | 说明 |
|------|------|
| $F = 0$ | 合外力为零时，物体保持静止或匀速直线运动 |

### 物理示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <line x1="30" y1="100" x2="270" y2="100" stroke="var(--color-border)" stroke-width="2" />
  <text x="275" y="105" font-size="10" fill="var(--color-text-secondary)">水平面</text>
  <circle cx="50" cy="95" r="15" fill="var(--color-primary)" />
  <text x="50" y="95" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">静止</text>
  <path d="M70 95 L260 95" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="5,3" />
  <circle cx="250" cy="95" r="15" fill="var(--color-primary)" />
  <path d="M230 95 L250 95" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#arrow6)" />
  <text x="250" y="95" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">运动</text>
  <text x="160" y="80" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">不受力时保持原状态</text>
  <defs>
    <marker id="arrow6" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-primary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：一辆匀速行驶的汽车突然刹车，乘客会向前倾倒，这是什么原因？

**解答**：这是由于**惯性**。汽车刹车时速度减小，但乘客由于惯性仍保持原来的运动状态，所以会向前倾倒。

### 举一反三

**练习1**：为什么跳远运动员要助跑？
- 答案：利用惯性，助跑后起跳可以跳得更远。

**练习2**：锤头松了，为什么把锤柄在地上撞击几下就能套紧？
- 答案：锤柄撞击地面停止运动，锤头由于惯性继续向下运动，从而套紧在锤柄上。

### 拓展知识

- 牛顿第一定律也称为**惯性定律**，是牛顿力学的基础定律之一。
- 伽利略通过**理想斜面实验**为牛顿第一定律奠定了基础。
- 惯性是物体的固有属性，与物体是否受力、是否运动无关。`;
export const PHYSICS_011 = `## 二力平衡

### 核心概念

**二力平衡**：物体在两个力作用下处于平衡状态，这两个力称为平衡力。

**二力平衡条件**：作用在同一物体上的两个力，大小相等、方向相反、作用在同一条直线上。

**合力**：如果一个力的作用效果与多个力共同作用的效果相同，这个力就是那几个力的合力。

### 公式总结

| 公式 | 说明 |
|------|------|
| $F₁ = F₂$ | 二力平衡时力的大小关系 |
| $F_{合} = 0$ | 平衡状态时合外力为零 |

### 物理示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <rect x="100" y="60" width="100" height="40" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="150" y="85" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">物体</text>
  <path d="M100 80 L50 80" stroke="var(--color-primary)" stroke-width="3" marker-end="url(#arrow7)" />
  <text x="75" y="75" font-size="12" fill="var(--color-text-secondary)">F₁</text>
  <path d="M200 80 L250 80" stroke="var(--color-primary)" stroke-width="3" marker-end="url(#arrow7)" />
  <text x="225" y="75" font-size="12" fill="var(--color-text-secondary)">F₂</text>
  <line x1="50" y1="80" x2="250" y2="80" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="3,2" />
  <text x="150" y="120" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">F₁ = F₂，方向相反，作用在同一直线上</text>
  <defs>
    <marker id="arrow7" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 Z" fill="currentColor" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：一个物体在水平面上受到10N的水平向右的拉力和10N的水平向左的摩擦力，物体处于什么状态？

**解答**：两个力大小相等、方向相反、作用在同一条直线上，是一对平衡力，物体处于**平衡状态**（静止或匀速直线运动）。

### 举一反三

**练习1**：一个物体受到5N的向上的支持力和5N的向下的重力，物体处于什么状态？
- 答案：二力平衡，物体处于平衡状态。

**练习2**：一个物体受到3N的向左的力和5N的向右的力，物体的运动状态会怎样？
- 答案：合力为2N向右，物体将向右加速运动。

### 拓展知识

- 二力平衡的条件是**同体、等大、反向、共线**。
- 注意区分**平衡力**和**作用力反作用力**：
  - 平衡力：作用在**同一物体**上
  - 作用力反作用力：作用在**不同物体**上
- 当物体受到的合力为零时，物体保持**静止**或**匀速直线运动**状态。`;
export const PHYSICS_012 = `## 牛顿第二定律

### 核心概念

**加速度**：描述物体速度变化快慢的物理量，是矢量。

**合外力**：物体所受所有力的矢量和。

**牛顿第二定律**：物体的加速度与所受合外力成正比，与物体质量成反比。

### 公式总结

| 公式 | 说明 |
|------|------|
| $F = ma$ | 合外力等于质量乘以加速度 |
| $a = F/m$ | 加速度等于合外力除以质量 |
| $1N = 1kg·m/s²$ | 力的单位定义 |

### 物理示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <line x1="30" y1="100" x2="270" y2="100" stroke="var(--color-border)" stroke-width="2" />
  <rect x="100" y="70" width="80" height="30" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="140" y="90" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">m</text>
  <path d="M180 85 L220 85" stroke="var(--color-primary)" stroke-width="3" marker-end="url(#arrow8)" />
  <text x="200" y="75" font-size="12" fill="var(--color-text-secondary)">F</text>
  <path d="M100 85 L60 85" stroke="var(--color-text-primary)" stroke-width="3" marker-end="url(#arrow8)" />
  <text x="80" y="75" font-size="12" fill="var(--color-text-secondary)">a</text>
  <text x="140" y="120" font-size="14" text-anchor="middle" fill="var(--color-primary)">F = ma</text>
  <defs>
    <marker id="arrow8" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 Z" fill="currentColor" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：一个质量为2kg的物体受到10N的合外力作用，求物体的加速度。

**解答**：根据牛顿第二定律 $F = ma$

$$ a = \\frac{F}{m} = \\frac{10N}{2kg} = 5m/s² $$

### 举一反三

**练习1**：用20N的力推一个质量为5kg的物体，物体的加速度是多少？
- 答案：$a = 20/5 = 4m/s²$

**练习2**：要使一个4kg的物体产生$3m/s²$的加速度，需要多大的力？
- 答案：$F = ma = 4 × 3 = 12N$

### 拓展知识

- 牛顿第二定律是**经典力学的核心方程**，适用于宏观低速运动的物体。
- 在国际单位制中，力的单位**牛顿(N)**定义为：$1N = 1kg·m/s²$
- 加速度的方向始终与合外力方向**相同**。`;
export const PHYSICS_013 = `## 压强

### 核心概念

**压力**：垂直作用在物体表面上的力。

**压强**：单位面积上受到的压力，$p = F/S$。

**液体压强**：液体内部向各个方向都有压强，$p = ρgh$。

**大气压**：大气对物体表面产生的压强。

### 公式总结

| 公式 | 说明 |
|------|------|
| $p = F/S$ | 压强定义式 |
| $p = ρgh$ | 液体压强公式 |
| $p₀ = 1.013×10^5Pa$ | 标准大气压 |

### 物理示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <rect x="80" y="50" width="140" height="120" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" />
  <text x="150" y="180" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">容器</text>
  <rect x="85" y="80" width="130" height="90" fill="var(--color-primary)" opacity="0.4" />
  <text x="150" y="130" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">液体</text>
  <line x1="150" y1="80" x2="150" y2="170" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="3,2" />
  <text x="160" y="125" font-size="10" fill="var(--color-text-secondary)">h(深度)</text>
  <circle cx="150" cy="150" r="5" fill="var(--color-primary)" />
  <path d="M150 150 L150 130" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#arrow9)" />
  <path d="M150 150 L130 150" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#arrow9)" />
  <path d="M150 150 L170 150" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#arrow9)" />
  <text x="150" y="165" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">液体向各方向产生压强</text>
  <defs>
    <marker id="arrow9" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-primary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：一个质量为50kg的人站在地面上，每只脚的面积为250cm²，求人对地面的压强。

**解答**：

压力：$F = G = mg = 50 × 10 = 500N$

受力面积：$S = 2 × 250cm² = 500cm² = 0.05m²$

压强：$p = \\frac{F}{S} = \\frac{500}{0.05} = 1×10^4Pa$

### 举一反三

**练习1**：一个正方体铁块边长为10cm，质量为7.9kg，放在水平桌面上，对桌面的压强是多少？
- 答案：$F = 79N$，$S = 0.01m²$，$p = 7900Pa$

**练习2**：水深为10m处的压强是多少？(水的密度$ρ=1×10³kg/m³$)
- 答案：$p = ρgh = 1×10³ × 10 × 10 = 1×10^5Pa$

### 拓展知识

- 增大压强的方法：**增大压力**或**减小受力面积**。
- 减小压强的方法：**减小压力**或**增大受力面积**。
- 液体压强只与**深度**和**液体密度**有关，与容器形状无关。`;
export const PHYSICS_014 = `## 浮力

### 核心概念

**浮力**：浸在液体或气体中的物体受到向上的力。

**阿基米德原理**：浸在液体中的物体受到的浮力等于物体排开液体的重力。

**浮沉条件**：
- $F_浮 > G$：物体上浮
- $F_浮 < G$：物体下沉
- $F_浮 = G$：物体悬浮或漂浮

### 公式总结

| 公式 | 说明 |
|------|------|
| $F_浮 = G_排 = ρ_液gV_排$ | 阿基米德原理 |
| 漂浮时：$ρ_物 < ρ_液$ | 漂浮条件 |
| 悬浮时：$ρ_物 = ρ_液$ | 悬浮条件 |

### 物理示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <rect x="50" y="60" width="200" height="120" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" />
  <text x="260" y="130" font-size="12" fill="var(--color-text-secondary)">液体</text>
  <rect x="120" y="80" width="60" height="80" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="150" y="130" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">物体</text>
  <path d="M150 80 L150 50" stroke="var(--color-primary)" stroke-width="3" marker-end="url(#arrow10)" />
  <text x="160" y="65" font-size="12" fill="var(--color-text-secondary)">F_浮</text>
  <path d="M150 160 L150 190" stroke="var(--color-text-primary)" stroke-width="3" marker-end="url(#arrow10)" />
  <text x="160" y="175" font-size="12" fill="var(--color-text-secondary)">G</text>
  <rect x="120" y="160" width="60" height="20" fill="var(--color-primary)" opacity="0.5" />
  <text x="150" y="175" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">V_排</text>
  <defs>
    <marker id="arrow10" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 Z" fill="currentColor" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：一个体积为100cm³的铁块浸没在水中，受到的浮力是多少？(g=10N/kg)

**解答**：

$V_排 = V_物 = 100cm³ = 1×10^{-4}m³$

$F_浮 = ρ_水gV_排 = 1×10³ × 10 × 1×10^{-4} = 1N$

### 举一反三

**练习1**：一个木块漂浮在水面上，排开水的体积为500cm³，木块受到的浮力是多少？
- 答案：$F_浮 = ρ_水gV_排 = 1×10³ × 10 × 5×10^{-4} = 5N$

**练习2**：一个物体在空气中重10N，浸没在水中时测力计示数为6N，物体受到的浮力是多少？
- 答案：$F_浮 = G - F_示 = 10 - 6 = 4N$

### 拓展知识

- 浮力的方向总是**竖直向上**的。
- 轮船、潜水艇、热气球都是利用浮力原理工作的。
- 潜水艇是通过**改变自身重力**来实现浮沉的。`;
export const PHYSICS_015 = `## 功和功率

### 核心概念

**功**：力对物体做的功，$W = Fs·cosθ$。

**功率**：单位时间内做的功，$P = W/t = Fv$。

**动能定理**：合外力对物体做的功等于物体动能的变化。

### 公式总结

| 公式 | 说明 |
|------|------|
| $W = Fs·cosθ$ | 功的公式（θ为力与位移夹角） |
| $P = W/t = Fv$ | 功率公式 |
| $W = ΔE_k = \\frac{1}{2}mv₂² - \\frac{1}{2}mv₁²$ | 动能定理 |

### 物理示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <line x1="30" y1="100" x2="270" y2="100" stroke="var(--color-border)" stroke-width="2" />
  <circle cx="50" cy="95" r="10" fill="var(--color-primary)" />
  <path d="M60 95 L200 95" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="5,3" />
  <circle cx="200" cy="95" r="10" fill="var(--color-primary)" />
  <text x="130" y="85" font-size="12" fill="var(--color-text-secondary)">s(位移)</text>
  <path d="M60 95 L60 60" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#arrow11)" />
  <text x="70" y="75" font-size="12" fill="var(--color-text-secondary)">F(力)</text>
  <text x="130" y="120" font-size="14" text-anchor="middle" fill="var(--color-primary)">W = Fs·cosθ</text>
  <defs>
    <marker id="arrow11" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-primary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：用50N的力拉一个物体在水平面上移动10m，力与水平方向成30°角，求做的功。

**解答**：

$$ W = Fs·cosθ = 50 × 10 × cos30° = 500 × \\frac{\\sqrt{3}}{2} ≈ 433J $$

### 举一反三

**练习1**：用100N的水平力推物体移动5m，做的功是多少？
- 答案：$W = 100 × 5 × cos0° = 500J$

**练习2**：一个物体从静止开始，在20N的合外力作用下移动10m，质量为5kg，末速度是多少？
- 答案：$W = Fs = 200J = \\frac{1}{2}mv²$，$v = \\sqrt{80} ≈ 8.94m/s$

### 拓展知识

- 当力与位移垂直时，力**不做功**。
- 功率$P = Fv$适用于匀速运动或瞬时功率。
- 动能定理适用于**任何运动过程**，包括曲线运动。`;
export const PHYSICS_016 = `## 机械能

### 核心概念

**动能**：物体由于运动而具有的能量，$E_k = \\frac{1}{2}mv²$。

**重力势能**：物体由于被举高而具有的能量，$E_p = mgh$。

**弹性势能**：物体由于发生弹性形变而具有的能量，$E_p = \\frac{1}{2}kx²$。

**机械能守恒定律**：在只有重力或弹力做功的系统内，动能和势能可以相互转化，但机械能的总量保持不变。

### 公式总结

| 公式 | 说明 |
|------|------|
| $E_k = \\frac{1}{2}mv²$ | 动能公式 |
| $E_p = mgh$ | 重力势能公式 |
| $E_p = \\frac{1}{2}kx²$ | 弹性势能公式 |
| $E_{k1} + E_{p1} = E_{k2} + E_{p2}$ | 机械能守恒表达式 |

### 物理示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <rect x="50" y="160" width="200" height="10" fill="var(--color-border)" />
  <rect x="50" y="100" width="40" height="60" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <circle cx="70" cy="95" r="8" fill="var(--color-primary)" />
  <text x="70" y="95" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">A</text>
  <text x="70" y="80" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">h₁</text>
  <circle cx="150" cy="155" r="8" fill="var(--color-primary)" />
  <text x="150" y="155" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">B</text>
  <text x="150" y="135" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">h₂</text>
  <circle cx="230" cy="115" r="8" fill="var(--color-primary)" />
  <text x="230" y="115" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">C</text>
  <text x="230" y="95" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">h₃</text>
  <path d="M70 100 L150 160 L230 120" stroke="var(--color-primary)" stroke-width="2" fill="none" />
  <text x="70" y="165" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">高势能</text>
  <text x="150" y="175" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">高动能</text>
  <text x="230" y="165" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">中等</text>
</svg>

### 例题解析

**问题**：一个小球从高度h处自由下落，落地时的速度是多少？（忽略空气阻力）

**解答**：根据机械能守恒，初始动能为0，末态势能为0

$$ mgh = \\frac{1}{2}mv² $$

$$ v = \\sqrt{2gh} $$

### 举一反三

**练习1**：一个物体从4m高处自由下落，落地时速度是多少？（g取10m/s²）
- 答案：$v = \\sqrt{2×10×4} = \\sqrt{80} ≈ 8.94m/s$

**练习2**：一个弹簧的劲度系数为100N/m，被压缩了0.2m，释放后能将一个质量为0.5kg的物体弹多高？
- 答案：弹性势能转化为重力势能，$\\frac{1}{2}kx² = mgh$，$h = kx²/(2mg) ≈ 0.41m$

### 拓展知识

- 机械能守恒定律是**能量守恒定律的特例**。
- 实际应用中，过山车、蹦极、水力发电等都利用了机械能守恒原理。
- 如果有摩擦力做功，机械能不守恒，但总能量仍然守恒。`;
export const PHYSICS_017 = `## 电流与电路

### 核心概念

**电流**：电荷的定向移动形成电流，单位是安培(A)。

**电路**：由电源、用电器、开关、导线组成的电流路径。

**串联电路**：电路元件依次连接，电流只有一条路径。

**并联电路**：电路元件并列连接，电流有多条路径。

### 公式总结

| 电路类型 | 电流 | 电压 | 电阻 |
|----------|------|------|------|
| 串联 | $I = I₁ = I₂$ | $U = U₁ + U₂$ | $R = R₁ + R₂$ |
| 并联 | $I = I₁ + I₂$ | $U = U₁ = U₂$ | $1/R = 1/R₁ + 1/R₂$ |

### 物理示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <rect x="130" y="30" width="40" height="20" fill="var(--color-primary)" />
  <text x="150" y="45" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">电源</text>
  <circle cx="150" cy="80" r="15" fill="none" stroke="var(--color-border)" stroke-width="2" />
  <text x="150" y="85" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">开关</text>
  <rect x="140" y="110" width="20" height="30" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="150" y="130" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">用电器</text>
  <path d="M150 50 L150 65" stroke="var(--color-primary)" stroke-width="2" />
  <path d="M150 95 L150 110" stroke="var(--color-primary)" stroke-width="2" />
  <path d="M170 40 L200 40 L200 125 L160 125" stroke="var(--color-primary)" stroke-width="2" />
  <path d="M130 40 L100 40 L100 125 L140 125" stroke="var(--color-primary)" stroke-width="2" />
  <text x="150" y="20" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">简单电路图</text>
</svg>

### 例题解析

**问题**：两个电阻分别为R₁=6Ω和R₂=3Ω，求串联和并联时的总电阻。

**解答**：

串联：$R = R₁ + R₂ = 6 + 3 = 9Ω$

并联：$1/R = 1/6 + 1/3 = 1/2$，所以$R = 2Ω$

### 举一反三

**练习1**：三个电阻R₁=2Ω、R₂=3Ω、R₃=6Ω并联，总电阻是多少？
- 答案：$1/R = 1/2 + 1/3 + 1/6 = 1$，$R = 1Ω$

**练习2**：两个电阻R₁=10Ω和R₂=20Ω串联在12V电源上，每个电阻两端的电压是多少？
- 答案：$R = 30Ω$，$I = 12/30 = 0.4A$，$U₁ = 4V$，$U₂ = 8V$

### 拓展知识

- 串联电路中，电阻越大，分得的电压**越大**。
- 并联电路中，电阻越大，通过的电流**越小**。
- 家庭电路中的用电器通常是**并联**连接的。`;
export const PHYSICS_018 = `## 欧姆定律

### 核心概念

**电流**：电荷的定向移动形成电流，单位是安培(A)。

**电压**：电势差，是形成电流的原因，单位是伏特(V)。

**电阻**：导体对电流的阻碍作用，单位是欧姆(Ω)。

**欧姆定律**：导体中的电流与导体两端的电压成正比，与导体的电阻成反比。

### 公式总结

| 公式 | 说明 |
|------|------|
| $I = U/R$ | 欧姆定律基本公式 |
| $U = IR$ | 电压等于电流乘以电阻 |
| $R = U/I$ | 电阻等于电压除以电流 |
| $R = ρL/S$ | 电阻定律 |

### 物理示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <rect x="50" y="50" width="40" height="40" fill="var(--color-primary)" />
  <text x="70" y="75" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">电源</text>
  <rect x="120" y="50" width="60" height="40" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="150" y="75" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">电阻 R</text>
  <rect x="200" y="50" width="60" height="40" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="230" y="75" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">电流表 A</text>
  <path d="M90 70 L120 70" stroke="var(--color-primary)" stroke-width="2" />
  <path d="M180 70 L200 70" stroke="var(--color-primary)" stroke-width="2" />
  <path d="M260 70 L280 70 L280 100 L50 100 L50 50" stroke="var(--color-primary)" stroke-width="2" />
  <text x="150" y="120" font-size="14" text-anchor="middle" fill="var(--color-primary)">I = U/R</text>
</svg>

### 例题解析

**问题**：一个电阻为10Ω的导体，两端加上20V的电压，通过的电流是多少？

**解答**：根据欧姆定律

$$ I = \\frac{U}{R} = \\frac{20V}{10Ω} = 2A $$

### 举一反三

**练习1**：通过一个电阻的电流为3A，电阻两端电压为15V，求电阻值。
- 答案：$R = U/I = 15/3 = 5Ω$

**练习2**：一个电阻为20Ω，通过的电流为0.5A，电阻两端的电压是多少？
- 答案：$U = IR = 0.5 × 20 = 10V$

### 拓展知识

- 欧姆定律适用于**金属导体和电解质溶液**，不适用于气体导电和半导体器件。
- 电阻的大小与导体**材料、长度、横截面积和温度**有关。
- 导体的电阻率$ρ$随温度升高而增大（金属）。`;
export const PHYSICS_019 = `## 电功率

### 核心概念

**电功**：电流所做的功，$W = UIt$，单位是焦耳(J)。

**电功率**：单位时间内电流所做的功，$P = W/t = UI$，单位是瓦特(W)。

**额定功率**：用电器在额定电压下正常工作时的功率。

### 公式总结

| 公式 | 说明 |
|------|------|
| $P = UI$ | 电功率基本公式 |
| $P = I²R$ | 纯电阻电路中电功率公式 |
| $P = U²/R$ | 纯电阻电路中电功率公式 |
| $W = Pt = UIt$ | 电功公式 |

### 物理示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <rect x="50" y="50" width="40" height="40" fill="var(--color-primary)" />
  <text x="70" y="75" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">电源</text>
  <rect x="120" y="50" width="60" height="40" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="150" y="75" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">用电器</text>
  <rect x="200" y="50" width="60" height="40" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="230" y="75" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">电压表 V</text>
  <path d="M90 70 L120 70" stroke="var(--color-primary)" stroke-width="2" />
  <path d="M180 70 L200 70" stroke="var(--color-primary)" stroke-width="2" />
  <path d="M260 70 L280 70 L280 100 L50 100 L50 50" stroke="var(--color-primary)" stroke-width="2" />
  <line x1="200" y1="50" x2="170" y2="50" x1="260" y1="50" x2="190" y2="50" stroke="var(--color-primary)" stroke-width="2" />
  <line x1="170" y1="50" x2="170" y2="40" x1="190" y1="50" x2="190" y2="40" stroke="var(--color-primary)" stroke-width="2" />
  <line x1="170" y1="40" x2="190" y2="40" stroke="var(--color-primary)" stroke-width="2" />
  <text x="150" y="120" font-size="14" text-anchor="middle" fill="var(--color-primary)">P = UI</text>
</svg>

### 例题解析

**问题**：一个额定电压为220V、额定功率为100W的灯泡，正常工作时的电流是多少？

**解答**：根据 $P = UI$

$$ I = \\frac{P}{U} = \\frac{100W}{220V} ≈ 0.45A $$

### 举一反三

**练习1**：一个电阻为10Ω的电热器，通过的电流为2A，电功率是多少？
- 答案：$P = I²R = 4 × 10 = 40W$

**练习2**：一个用电器两端电压为12V，电阻为6Ω，电功率是多少？
- 答案：$P = U²/R = 144/6 = 24W$

### 拓展知识

- 电器的**额定功率**是指电器在额定电压下正常工作时的功率。
- 实际功率可能大于或小于额定功率，取决于实际电压。
- 家庭用电的电能单位是**千瓦时(kWh)**，$1kWh = 3.6×10^6J$。`;
export const PHYSICS_020 = `## 安全用电

### 核心概念

**家庭电路**：由进户线、电能表、总开关、保险丝、用电器等组成。

**火线**：带电的导线，电压为220V。

**零线**：不带电的导线，电压为0V。

**地线**：连接大地的导线，用于安全保护。

**触电**：电流通过人体造成的伤害。

### 公式总结

| 公式 | 说明 |
|------|------|
| $P = UI$ | 电功率公式 |
| $I = P/U$ | 电流与功率、电压的关系 |
| $R = U/I$ | 人体电阻（约1000Ω-10000Ω） |

### 物理示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <line x1="50" y1="30" x2="50" y2="130" stroke="red" stroke-width="3" />
  <text x="40" y="80" font-size="12" fill="red">火线</text>
  <line x1="100" y1="30" x2="100" y2="130" stroke="blue" stroke-width="3" />
  <text x="115" y="80" font-size="12" fill="blue">零线</text>
  <line x1="150" y1="30" x2="150" y2="130" stroke="green" stroke-width="3" />
  <text x="165" y="80" font-size="12" fill="green">地线</text>
  <rect x="30" y="130" width="150" height="10" fill="var(--color-border)" />
  <text x="105" y="145" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">大地</text>
  <circle cx="220" cy="80" r="20" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="220" y="85" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">用电器</text>
  <path d="M100 80 L200 80" stroke="blue" stroke-width="2" />
  <path d="M50 80 L240 80" stroke="red" stroke-width="2" />
  <path d="M150 80 L220 60" stroke="green" stroke-width="2" />
  <text x="220" y="40" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">三脚插头</text>
</svg>

### 例题解析

**问题**：一个电热水壶的额定功率为1500W，额定电压为220V，正常工作时的电流是多少？

**解答**：

$$ I = \\frac{P}{U} = \\frac{1500W}{220V} ≈ 6.82A $$

### 举一反三

**练习1**：一个微波炉的功率为800W，工作1小时消耗多少电能？
- 答案：$W = Pt = 0.8kW × 1h = 0.8kWh$

**练习2**：人体电阻约为5000Ω，通过多少电流会造成危险？
- 答案：一般认为通过人体的电流超过30mA就会有危险，$I = U/R = 220/5000 = 0.044A = 44mA$，已超过危险值。

### 拓展知识

- 家庭电路的电压是**220V**，频率是**50Hz**。
- 触电的原因是电流通过人体，电流越大，伤害越严重。
- 安全用电原则：**不接触低压带电体，不靠近高压带电体**。
- 三脚插头的作用：将用电器的金属外壳接地，防止触电。`;
export const PHYSICS_021 = `## 电流的磁效应

### 核心概念

**电流的磁效应**：通电导体的周围存在磁场，这种现象叫电流的磁效应。

**奥斯特实验**：丹麦物理学家奥斯特首先发现通电导线能使磁针偏转，证明了电流可以产生磁场。

**电磁铁**：内部插有铁芯的螺线管，通电后磁性大大增强。

**右手螺旋定则（安培定则）**：用右手握住螺线管，四指弯向电流方向，大拇指所指的方向就是螺线管内部磁场的方向。

### 公式总结

| 公式 | 说明 |
|------|------|
| 磁场方向由电流方向决定 | 改变电流方向，磁场方向随之改变 |
| 电磁铁磁性强弱与电流大小、线圈匝数有关 | 电流越大、匝数越多，磁性越强 |

### 物理示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="80" y="70" width="140" height="40" fill="none" stroke="var(--color-primary)" stroke-width="2" rx="5" />
  <line x1="80" y1="90" x2="220" y2="90" stroke="var(--color-primary)" stroke-width="1" stroke-dasharray="3,2" />
  <path d="M100 90 L100 70 L120 70 L120 90" stroke="var(--color-primary)" stroke-width="2" fill="none" />
  <path d="M140 90 L140 70 L160 70 L160 90" stroke="var(--color-primary)" stroke-width="2" fill="none" />
  <path d="M180 90 L180 70 L200 70 L200 90" stroke="var(--color-primary)" stroke-width="2" fill="none" />
  <text x="150" y="60" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">螺线管</text>
  <path d="M220 90 L250 90 L250 120" stroke="var(--color-primary)" stroke-width="2" />
  <rect x="240" y="120" width="20" height="15" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="250" y="132" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">电池</text>
  <path d="M240 135 L80 135 L80 90" stroke="var(--color-primary)" stroke-width="2" />
  <circle cx="150" cy="155" r="8" fill="var(--color-primary)" opacity="0.5" />
  <line x1="142" y1="155" x2="158" y2="155" stroke="var(--color-text-primary)" stroke-width="2" />
  <polygon points="158,155 152,152 152,158" fill="var(--color-text-primary)" />
  <text x="150" y="175" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">小磁针</text>
</svg>

### 例题解析

**问题**：如图所示，螺线管通电后小磁针N极指向左，判断电源的正负极。

**解答**：小磁针N极指向左，说明螺线管右侧为S极，左侧为N极。根据安培定则，用右手握住螺线管，大拇指指向左侧（N极），四指弯曲方向为电流方向，由此可知电流从右侧流入，左侧流出，所以右端为电源正极。

### 举一反三

**练习1**：要增强电磁铁的磁性，可以采取哪些方法？
- 答案：增大电流、增加线圈匝数、插入铁芯。

**练习2**：如何改变通电螺线管的磁极方向？
- 答案：改变电流方向（对调电源正负极）。

### 拓展知识

- 电磁铁的优点：磁性有无可以由通断电流控制，磁性强弱可以由电流大小控制，磁极方向可以由电流方向控制。
- 电磁继电器就是利用电磁铁控制工作电路通断的开关。
- 电动机和扬声器都利用了电流的磁效应。`;
export const PHYSICS_022 = `## 磁场对电流的作用

### 核心概念

**磁场对电流的作用**：通电导体在磁场中受到力的作用。

**左手定则**：伸开左手，让磁感线穿过手心，四指指向电流方向，拇指所指的方向就是通电导体在磁场中受力的方向。

**电动机原理**：通电线圈在磁场中受力转动，将电能转化为机械能。

**换向器**：电动机中每转动半周自动改变电流方向的装置，使线圈持续转动。

### 公式总结

| 公式 | 说明 |
|------|------|
| $F = BIL$ | 安培力公式（B为磁感应强度，I为电流，L为导线长度） |
| 电能 → 机械能 | 电动机的能量转化 |

### 物理示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <rect x="40" y="50" width="220" height="100" fill="var(--color-primary)" opacity="0.05" stroke="var(--color-border)" />
  <line x1="40" y1="50" x2="260" y2="50" stroke="var(--color-text-secondary)" stroke-width="1" />
  <text x="20" y="55" font-size="10" fill="var(--color-text-secondary)">N</text>
  <text x="20" y="155" font-size="10" fill="var(--color-text-secondary)">S</text>
  <line x1="40" y1="50" x2="40" y2="150" stroke="var(--color-text-secondary)" stroke-width="2" />
  <line x1="260" y1="50" x2="260" y2="150" stroke="var(--color-text-secondary)" stroke-width="2" />
  <rect x="120" y="80" width="60" height="40" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" stroke-width="2" rx="3" />
  <text x="150" y="105" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">线圈</text>
  <path d="M150 80 L150 55" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#magArrow)" />
  <text x="160" y="65" font-size="10" fill="var(--color-text-secondary)">F(受力)</text>
  <path d="M120 100 L80 100" stroke="var(--color-primary)" stroke-width="2" />
  <path d="M180 100 L220 100" stroke="var(--color-primary)" stroke-width="2" />
  <text x="150" y="140" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">I(电流方向)</text>
  <defs>
    <marker id="magArrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-primary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：一个电动机正常工作时两端电压为6V，通过电流为0.5A，若线圈电阻为2Ω，求电动机消耗的电功率和机械功率。

**解答**：

电功率：$P_{电} = UI = 6 × 0.5 = 3W$

线圈发热功率：$P_{热} = I²R = 0.25 × 2 = 0.5W$

机械功率：$P_{机} = P_{电} - P_{热} = 3 - 0.5 = 2.5W$

### 举一反三

**练习1**：电动机转动时，电能主要转化为什么能？
- 答案：机械能，同时有一部分转化为内能（发热）。

**练习2**：如何改变电动机的转动方向？
- 答案：改变电流方向或改变磁场方向（对调磁极）。

### 拓展知识

- 电动机分为直流电动机和交流电动机两大类。
- 电动机效率远高于热机，是现代工业的主要动力来源。
- 扬声器（喇叭）也是利用磁场对电流作用的原理工作的。`;
export const PHYSICS_023 = `## 电磁感应

### 核心概念

**电磁感应**：闭合电路的一部分导体在磁场中做切割磁感线运动时，导体中就会产生电流，这种现象叫电磁感应。

**感应电流**：电磁感应现象中产生的电流。

**发电机原理**：利用电磁感应现象将机械能转化为电能。

**法拉第**：英国物理学家，发现了电磁感应现象。

### 公式总结

| 公式 | 说明 |
|------|------|
| 机械能 → 电能 | 发电机的能量转化 |
| 感应电流方向与磁场方向和导线运动方向有关 | 改变两者之一，电流方向改变 |

### 物理示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <line x1="40" y1="40" x2="40" y2="160" stroke="var(--color-text-secondary)" stroke-width="2" />
  <line x1="260" y1="40" x2="260" y2="160" stroke="var(--color-text-secondary)" stroke-width="2" />
  <text x="20" y="45" font-size="12" fill="var(--color-text-secondary)">N</text>
  <text x="20" y="165" font-size="12" fill="var(--color-text-secondary)">S</text>
  <rect x="50" y="35" width="200" height="130" fill="var(--color-primary)" opacity="0.05" />
  <line x1="120" y1="100" x2="180" y2="100" stroke="var(--color-primary)" stroke-width="3" />
  <circle cx="120" cy="100" r="4" fill="var(--color-primary)" />
  <circle cx="180" cy="100" r="4" fill="var(--color-primary)" />
  <path d="M180 100 L220 100" stroke="var(--color-primary)" stroke-width="2" />
  <circle cx="240" cy="100" r="15" fill="none" stroke="var(--color-border)" stroke-width="2" />
  <text x="240" y="105" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">G</text>
  <path d="M120 100 L80 100" stroke="var(--color-primary)" stroke-width="2" />
  <path d="M150 85 L150 70" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#indArrow)" />
  <text x="160" y="75" font-size="10" fill="var(--color-text-secondary)">v(运动方向)</text>
  <defs>
    <marker id="indArrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-primary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：闭合电路的一部分导体在磁场中运动，下列哪种情况会产生感应电流？
（1）导体平行于磁感线运动 （2）导体切割磁感线运动

**解答**：（1）不产生感应电流，因为导体没有切割磁感线。（2）产生感应电流，因为导体切割了磁感线。

### 举一反三

**练习1**：如何改变感应电流的方向？
- 答案：改变导体的运动方向或改变磁场方向。

**练习2**：发电机和电动机的能量转化有什么不同？
- 答案：发电机将机械能转化为电能，电动机将电能转化为机械能。

### 拓展知识

- 发电机发出的是交流电，电流方向周期性变化。
- 我国交流电的频率是50Hz，周期是0.02s。
- 电磁感应现象是法拉第在1831年发现的，这是发电机的理论基础。`;
export const PHYSICS_024 = `## 信息的传递

### 核心概念

**电话**：由话筒和听筒组成，话筒将声音转化为变化的电流，听筒将变化的电流转化为声音。

**电磁波**：变化的电流在周围空间产生电磁波，能在真空中传播。

**电磁波的传播速度**：$c = 3×10^8m/s$（与光速相同）。

**波长、频率和波速的关系**：$c = λf$。

**无线电通信**：利用电磁波传递信息，包括广播、电视、移动通信等。

### 公式总结

| 公式 | 说明 |
|------|------|
| $c = λf$ | 波速 = 波长 × 频率 |
| $c = 3×10^8m/s$ | 电磁波在真空中的传播速度 |
| $f = 1/T$ | 频率与周期的关系 |

### 物理示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="20" y="70" width="50" height="40" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" rx="3" />
  <text x="45" y="95" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">发射台</text>
  <rect x="230" y="70" width="50" height="40" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" rx="3" />
  <text x="255" y="95" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">接收台</text>
  <path d="M70 80 Q90 60 110 80 Q130 60 150 80 Q170 60 190 80 Q210 60 230 80" fill="none" stroke="var(--color-primary)" stroke-width="2" />
  <path d="M70 95 Q90 75 110 95 Q130 75 150 95 Q170 75 190 95 Q210 75 230 95" fill="none" stroke="var(--color-primary)" stroke-width="1.5" opacity="0.6" />
  <path d="M70 110 Q90 90 110 110 Q130 90 150 110 Q170 90 190 110 Q210 90 230 110" fill="none" stroke="var(--color-primary)" stroke-width="1" opacity="0.3" />
  <text x="150" y="45" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">电磁波传播</text>
  <text x="150" y="140" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">c = λf</text>
  <text x="150" y="160" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">c = 3×10⁸ m/s</text>
</svg>

### 例题解析

**问题**：某电台发射的电磁波频率为97.1MHz，求该电磁波的波长。

**解答**：

$$ λ = \\frac{c}{f} = \\frac{3×10^8}{97.1×10^6} ≈ 3.09m $$

### 举一反三

**练习1**：电磁波在真空中能否传播？
- 答案：能，电磁波可以在真空中传播，且速度为$3×10^8m/s$。

**练习2**：某电磁波的波长为600m，频率是多少？
- 答案：$f = c/λ = 3×10^8/600 = 5×10^5Hz = 500kHz$

### 拓展知识

- 电磁波谱按频率从低到高：无线电波、微波、红外线、可见光、紫外线、X射线、γ射线。
- 移动通信通过基地台（基站）实现信号的传递和转发。
- 卫星通信利用通信卫星作为中继站来转发无线电信号。`;
export const PHYSICS_025 = `## 能源与可持续发展

### 核心概念

**一次能源**：从自然界直接获取的能源，如煤、石油、天然气、水能、风能、太阳能、核能等。

**二次能源**：一次能源加工转换而来的能源，如电能、汽油、酒精等。

**可再生能源**：可以在自然界里源源不断地得到的能源，如太阳能、水能、风能、生物质能。

**不可再生能源**：越用越少，短期不能从自然界得到补充的能源，如煤、石油、天然气、核能。

**核能**：原子核发生裂变或聚变时释放的能量。

**太阳能**：太阳内部氢核聚变释放的能量，是最清洁的能源之一。

### 公式总结

| 公式 | 说明 |
|------|------|
| $E = mc²$ | 爱因斯坦质能方程 |
| $P = E/t$ | 太阳能功率计算 |

### 物理示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <circle cx="60" cy="60" r="25" fill="orange" opacity="0.8" />
  <text x="60" y="65" font-size="10" text-anchor="middle" fill="white">太阳</text>
  <line x1="85" y1="50" x2="140" y2="30" stroke="orange" stroke-width="2" stroke-dasharray="3,2" />
  <line x1="85" y1="60" x2="140" y2="55" stroke="orange" stroke-width="2" stroke-dasharray="3,2" />
  <line x1="85" y1="70" x2="140" y2="80" stroke="orange" stroke-width="2" stroke-dasharray="3,2" />
  <rect x="140" y="20" width="80" height="30" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" rx="3" />
  <text x="180" y="40" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">太阳能电池</text>
  <rect x="140" y="60" width="80" height="30" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" rx="3" />
  <text x="180" y="80" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">太阳能热水器</text>
  <rect x="50" y="120" width="60" height="40" fill="var(--color-primary)" opacity="0.1" stroke="var(--color-border)" rx="3" />
  <text x="80" y="145" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">风力发电</text>
  <rect x="130" y="120" width="60" height="40" fill="var(--color-primary)" opacity="0.1" stroke="var(--color-border)" rx="3" />
  <text x="160" y="145" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">水力发电</text>
  <rect x="210" y="120" width="60" height="40" fill="var(--color-primary)" opacity="0.1" stroke="var(--color-border)" rx="3" />
  <text x="240" y="145" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">核能发电</text>
  <text x="160" y="185" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">可再生能源与不可再生能源</text>
</svg>

### 例题解析

**问题**：某太阳能热水器每天接收太阳能$1.68×10^7J$，其中50%被水吸收，问每天能把多少千克水从20°C加热到60°C？($c_水 = 4.2×10^3J/(kg·°C)$)

**解答**：

水吸收的热量：$Q_{吸} = 1.68×10^7 × 50\\% = 8.4×10^6J$

$$ Q = cmΔt $$

$$ m = \\frac{Q}{cΔt} = \\frac{8.4×10^6}{4.2×10^3 × (60-20)} = \\frac{8.4×10^6}{1.68×10^5} = 50kg $$

### 举一反三

**练习1**：下列能源中，哪些是可再生能源？煤、石油、太阳能、风能、核能、水能。
- 答案：太阳能、风能、水能是可再生能源。

**练习2**：核电站利用的是核裂变还是核聚变？
- 答案：核电站利用的是可控核裂变释放的能量。

### 拓展知识

- 太阳能的优点：清洁、可再生、取之不尽；缺点：受天气影响、能量分散。
- 核能发电的优点：效率高、不排放温室气体；缺点：核废料处理困难、安全隐患。
- 未来能源发展方向：大力发展可再生能源，减少对化石能源的依赖。`;
export const PHYSICS_026 = `## 热学

### 核心概念

**温度**：表示物体冷热程度的物理量，单位是摄氏度(°C)或开尔文(K)。

**内能**：物体内所有分子动能和势能的总和。温度越高，分子热运动越剧烈，内能越大。

**热量**：在热传递过程中，传递能量的多少，单位是焦耳(J)。

**比热容**：单位质量的某种物质温度升高(或降低)1°C所吸收(或放出)的热量，是物质的一种特性。

**热传递**：热量从高温物体传到低温物体，或从物体的高温部分传到低温部分的过程。

**热机**：利用内能做功的机械，将内能转化为机械能。

### 公式总结

| 公式 | 说明 |
|------|------|
| $Q = cmΔt$ | 热量计算公式 |
| $c_{水} = 4.2×10^3J/(kg·°C)$ | 水的比热容 |
| $η = \\frac{W_{有用}}{Q_{吸}}$ | 热机效率 |
| $Q_{吸} = Q_{放}$ | 热平衡方程（不计热量损失） |

### 物理示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="40" y="50" width="60" height="80" fill="#FF6B6B" opacity="0.6" stroke="#FF6B6B" />
  <text x="70" y="100" font-size="12" text-anchor="middle" fill="#fff">高温物体</text>
  <text x="70" y="145" font-size="10" text-anchor="middle" fill="#FF6B6B">T₁</text>
  <rect x="200" y="70" width="60" height="60" fill="#4ECDC4" opacity="0.6" stroke="#4ECDC4" />
  <text x="230" y="100" font-size="12" text-anchor="middle" fill="#fff">低温物体</text>
  <text x="230" y="145" font-size="10" text-anchor="middle" fill="#4ECDC4">T₂</text>
  <path d="M100 90 L150 90" stroke="#FF6B6B" stroke-width="3" marker-end="url(#heatArrow)" />
  <text x="125" y="85" font-size="11" text-anchor="middle" fill="#FF6B6B">Q（热量）</text>
  <text x="150" y="170" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">热传递：从高温到低温</text>
  <defs>
    <marker id="heatArrow" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 Z" fill="#FF6B6B" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：质量为2kg的水，温度从20°C升高到100°C，需要吸收多少热量？（$c_{水} = 4.2×10^3J/(kg·°C)$）

**解答**：

$$ Q_{吸} = cmΔt = 4.2×10^3 × 2 × (100-20) = 4.2×10^3 × 2 × 80 = 6.72×10^5J $$

### 举一反三

**练习1**：质量为500g的铁块，温度从100°C降低到20°C，放出多少热量？（$c_{铁} = 0.46×10^3J/(kg·°C)$）
- 答案：$Q_{放} = 0.46×10^3 × 0.5 × 80 = 1.84×10^4J$

**练习2**：将2kg的水从20°C加热到沸腾（标准大气压下），需要吸收多少热量？
- 答案：$Q_{吸} = 4.2×10^3 × 2 × 80 = 6.72×10^5J$

### 拓展知识

- 比热容越大的物质，温度变化越难，如水的比热容较大，沿海地区昼夜温差小。
- 热传递的三种方式：**传导**、**对流**、**辐射**。
- 热机效率永远小于1，因为总有一部分热量散失到低温环境。
- 热平衡方程在混合问题中经常用到：$Q_{吸} = Q_{放}$。`;
export const PHYSICS_027 = `## 运动的描述

### 核心概念

**质点**：用来代替物体的有质量的点，是理想化模型。当物体的大小和形状对所研究的问题影响可忽略不计时，物体可看作质点。

**参考系**：为了研究物体的运动而选作标准的另外的物体。参考系的选择是任意的，但选择不同参考系对物体运动的描述可能不同。

**坐标系**：为了定量描述物体的位置及位置变化，需要在参考系上建立坐标系。

**时间与时刻**：时刻指某一瞬时，时间指两个时刻之间的间隔。

**路程与位移**：路程是物体运动轨迹的实际长度，是标量；位移是从初位置指向末位置的有向线段，是矢量。

**速度**：描述物体位置变化快慢和方向的物理量，是矢量。$v = \\Delta x / \\Delta t$。

**加速度**：描述速度变化快慢和方向的物理量，是矢量。$a = \\Delta v / \\Delta t$。

### 公式总结

| 公式 | 说明 |
|------|------|
| $v = \\Delta x / \\Delta t$ | 速度定义式 |
| $a = \\Delta v / \\Delta t$ | 加速度定义式 |
| $\\Delta x = x_2 - x_1$ | 位移 |
| $\\Delta t = t_2 - t_1$ | 时间间隔 |

### 物理示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <line x1="20" y1="120" x2="280" y2="120" stroke="var(--color-text-secondary)" stroke-width="1" />
  <circle cx="60" cy="120" r="6" fill="var(--color-primary)" />
  <circle cx="220" cy="120" r="6" fill="var(--color-primary)" opacity="0.5" />
  <line x1="60" y1="120" x2="220" y2="120" stroke="var(--color-primary)" stroke-width="2" />
  <polygon points="220,120 212,116 212,124" fill="var(--color-primary)" />
  <text x="60" y="145" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">初位置 x₁</text>
  <text x="220" y="145" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">末位置 x₂</text>
  <text x="140" y="105" font-size="11" text-anchor="middle" fill="var(--color-primary)">位移 Δx</text>
  <path d="M 60 70 Q 140 50, 220 70" fill="none" stroke="var(--color-text-secondary)" stroke-dasharray="3,3" stroke-width="1" />
  <text x="140" y="40" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">运动轨迹（路程）</text>
  <text x="150" y="170" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">质点的位移与路程</text>
</svg>

### 例题解析

**问题**：一个物体沿直线运动，前2s内位移为$4m$，后3s内位移为$9m$，求全程的平均速度。

**解答**：

总位移：$\\Delta x = 4 + 9 = 13m$

总时间：$\\Delta t = 2 + 3 = 5s$

平均速度：$$ \\bar{v} = \\frac{\\Delta x}{\\Delta t} = \\frac{13}{5} = 2.6m/s $$

### 举一反三

**练习1**：下列说法正确的是？（A）研究地球公转时可将其看作质点；（B）研究地球自转时可将其看作质点。
- 答案：A正确。研究地球公转时，地球大小相对公转轨道可忽略；研究自转时，地球大小不可忽略。

**练习2**：一辆汽车从A地到B地，去时路程为$60km$，返回时路程为$60km$，求全程的位移和路程。
- 答案：路程为$120km$，位移为$0$（初末位置相同）。

### 拓展知识

- 加速度的方向与速度方向相同时，物体做加速运动；反之做减速运动。
- 即使加速度在减小，只要加速度方向与速度方向相同，物体仍做加速运动。
- 矢量是既有大小又有方向的物理量，运算遵循平行四边形定则。`;
export const PHYSICS_028 = `## 匀变速直线运动

### 核心概念

**匀变速直线运动**：沿着一条直线且加速度不变的运动。

**自由落体运动**：物体只在重力作用下从静止开始下落的运动，是初速度为零的匀加速直线运动，加速度为重力加速度$g$。

**v-t图像**：在速度-时间图像中，图线的斜率表示加速度，图线与时间轴围成的面积表示位移。

### 公式总结

| 公式 | 说明 |
|------|------|
| $v = v_0 + at$ | 速度公式 |
| $x = v_0 t + \\frac{1}{2}at^2$ | 位移公式 |
| $v^2 - v_0^2 = 2ax$ | 速度位移公式 |
| $\\bar{v} = \\frac{v_0 + v}{2}$ | 平均速度公式 |
| $h = \\frac{1}{2}gt^2$ | 自由落体位移 |
| $v = gt$ | 自由落体速度 |

### 物理示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <line x1="40" y1="160" x2="280" y2="160" stroke="var(--color-text-secondary)" stroke-width="1" />
  <line x1="40" y1="40" x2="40" y2="160" stroke="var(--color-text-secondary)" stroke-width="1" />
  <text x="30" y="45" font-size="10" text-anchor="end" fill="var(--color-text-secondary)">v</text>
  <text x="280" y="175" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">t</text>
  <line x1="40" y1="120" x2="240" y2="60" stroke="var(--color-primary)" stroke-width="2" />
  <polygon points="240,60 232,62 236,68" fill="var(--color-primary)" />
  <text x="155" y="80" font-size="10" fill="var(--color-primary)">v = v₀ + at</text>
  <line x1="40" y1="160" x2="240" y2="60" stroke="var(--color-primary)" stroke-width="1" stroke-dasharray="2,2" opacity="0.5" />
  <rect x="40" y="60" width="200" height="100" fill="var(--color-primary)" opacity="0.1" />
  <text x="80" y="140" font-size="9" fill="var(--color-text-secondary)">面积=位移</text>
  <text x="150" y="190" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">匀变速直线运动v-t图像</text>
</svg>

### 例题解析

**问题**：一物体从静止开始做匀加速直线运动，加速度$a = 2m/s^2$，求第$3s$末的速度和前$3s$内的位移。

**解答**：

第$3s$末的速度：
$$ v = v_0 + at = 0 + 2 \\times 3 = 6m/s $$

前$3s$内的位移：
$$ x = v_0 t + \\frac{1}{2}at^2 = 0 + \\frac{1}{2} \\times 2 \\times 3^2 = 9m $$

### 举一反三

**练习1**：一物体做自由落体运动，求第$2s$末的速度和前$2s$内下落的高度。（$g$取$10m/s^2$）
- 答案：$v = gt = 10 \\times 2 = 20m/s$；$h = \\frac{1}{2}gt^2 = \\frac{1}{2} \\times 10 \\times 4 = 20m$。

**练习2**：汽车以$20m/s$的速度行驶，刹车后做匀减速运动，加速度大小为$4m/s^2$，求刹车后$5s$内的位移。
- 答案：刹车时间$t = \\frac{v_0}{a} = \\frac{20}{4} = 5s$，位移$x = \\frac{v_0}{2}t = \\frac{20}{2} \\times 5 = 50m$。

### 拓展知识

- 初速度为零的匀加速直线运动，在第1s内、第2s内、第3s内...的位移之比为$1:3:5:7:...$（连续相等时间内的位移比为奇数比）。
- 在连续相等的时间间隔$T$内，位移之差$\\Delta x = aT^2$，这是判断匀变速直线运动的重要方法。
- 竖直上抛运动是匀变速直线运动，加速度为$-g$，上升阶段和下落阶段具有对称性。`;
export const PHYSICS_029 = `## 相互作用

### 核心概念

**重力**：由于地球的吸引而使物体受到的力，方向竖直向下，$G = mg$。重力的等效作用点叫做重心。

**弹力**：发生弹性形变的物体，由于要恢复原状，对与它接触的物体会产生力的作用。胡克定律：$F = kx$。

**摩擦力**：相互接触且发生相对运动（或有相对运动趋势）的物体间产生的阻碍相对运动的力。分为滑动摩擦力和静摩擦力。滑动摩擦力：$f = \\mu F_N$。

**力的合成与分解**：求几个力的合力的过程叫做力的合成；求一个已知力的分力叫做力的分解。遵循平行四边形定则。

**共点力的平衡**：物体在共点力作用下处于静止或匀速直线运动状态，称为平衡状态。平衡条件：合力为零，即$F_{合} = 0$。

### 公式总结

| 公式 | 说明 |
|------|------|
| $G = mg$ | 重力 |
| $F = kx$ | 胡克定律 |
| $f = \\mu F_N$ | 滑动摩擦力 |
| $F_{合} = \\sqrt{F_1^2 + F_2^2 + 2F_1 F_2 \\cos\\theta}$ | 合力公式 |
| $F_{合} = 0$ | 共点力平衡条件 |

### 物理示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <rect x="100" y="80" width="80" height="50" fill="var(--color-primary)" opacity="0.1" stroke="var(--color-border)" />
  <line x1="140" y1="80" x2="140" y2="40" stroke="var(--color-primary)" stroke-width="2" />
  <polygon points="140,40 136,48 144,48" fill="var(--color-primary)" />
  <text x="155" y="55" font-size="11" fill="var(--color-primary)">F (拉力)</text>
  <line x1="140" y1="130" x2="140" y2="170" stroke="var(--color-text-secondary)" stroke-width="2" />
  <polygon points="140,170 136,162 144,162" fill="var(--color-text-secondary)" />
  <text x="155" y="160" font-size="11" fill="var(--color-text-secondary)">G = mg (重力)</text>
  <line x1="100" y1="125" x2="60" y2="125" stroke="var(--color-primary)" stroke-width="2" stroke-dasharray="3,2" />
  <polygon points="60,125 68,121 68,129" fill="var(--color-primary)" />
  <text x="35" y="118" font-size="11" fill="var(--color-primary)">f (摩擦力)</text>
  <line x1="100" y1="130" x2="80" y2="150" stroke="var(--color-text-secondary)" stroke-width="2" />
  <polygon points="80,150 88,146 84,142" fill="var(--color-text-secondary)" />
  <text x="50" y="165" font-size="11" fill="var(--color-text-secondary)">F_N (支持力)</text>
  <text x="150" y="190" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">物体受力分析</text>
</svg>

### 例题解析

**问题**：质量为$10kg$的物体放在水平地面上，物体与地面间的动摩擦因数$\\mu = 0.2$。用水平力$F = 30N$拉物体，求物体的加速度。（$g$取$10m/s^2$）

**解答**：

摩擦力：$$ f = \\mu F_N = \\mu mg = 0.2 \\times 10 \\times 10 = 20N $$

合力：$$ F_合 = F - f = 30 - 20 = 10N $$

加速度：$$ a = \\frac{F_合}{m} = \\frac{10}{10} = 1m/s^2 $$

### 举一反三

**练习1**：一根轻弹簧原长为$10cm$，挂上$5N$的重物后长度为$15cm$，求弹簧的劲度系数。
- 答案：$k = \\frac{F}{x} = \\frac{5}{0.05} = 100N/m$。

**练习2**：两个大小均为$10N$的力，夹角为$60°$，求它们的合力大小。
- 答案：$F = \\sqrt{10^2 + 10^2 + 2 \\times 10 \\times 10 \\times \\cos 60°} = \\sqrt{300} = 10\\sqrt{3}N \\approx 17.3N$。

### 拓展知识

- 静摩擦力的大小随外力的变化而变化，范围在$0$到最大静摩擦力$f_{max}$之间，通常$f_{max}$略大于滑动摩擦力。
- 摩擦力的方向总是与相对运动或相对运动趋势方向相反，但可能与物体运动方向相同（如人走路时脚受到的摩擦力）。
- 力的分解不是唯一的，同一个力可以根据不同的效果分解为不同的分力，常见的是按作用效果分解。`;
export const PHYSICS_030 = `## 牛顿运动定律

### 核心概念

**牛顿第一定律（惯性定律）**：一切物体总保持匀速直线运动状态或静止状态，除非作用在它上面的力迫使它改变这种状态。质量是物体惯性大小的量度。

**牛顿第二定律**：物体加速度的大小跟作用力成正比，跟物体的质量成反比，加速度的方向跟作用力的方向相同。$F = ma$。

**牛顿第三定律**：两个物体之间的作用力和反作用力，总是大小相等，方向相反，作用在同一条直线上。

**超重**：物体对支持物的压力（或对悬挂物的拉力）大于物体所受重力的现象。加速度方向向上。

**失重**：物体对支持物的压力（或对悬挂物的拉力）小于物体所受重力的现象。加速度方向向下。完全失重时加速度为$g$。

### 公式总结

| 公式 | 说明 |
|------|------|
| $F = ma$ | 牛顿第二定律 |
| $F_{作用力} = -F_{反作用力}$ | 牛顿第三定律 |
| $N = m(g + a)$ | 超重时的视重 |
| $N = m(g - a)$ | 失重时的视重 |
| $N = 0$ | 完全失重 |

### 物理示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <rect x="110" y="80" width="80" height="60" fill="var(--color-primary)" opacity="0.1" stroke="var(--color-border)" />
  <text x="150" y="115" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">m</text>
  <line x1="150" y1="80" x2="150" y2="50" stroke="var(--color-text-secondary)" stroke-width="2" />
  <polygon points="150,50 146,58 154,58" fill="var(--color-text-secondary)" />
  <text x="160" y="60" font-size="11" fill="var(--color-text-secondary)">T (拉力)</text>
  <line x1="150" y1="140" x2="150" y2="170" stroke="var(--color-primary)" stroke-width="2" />
  <polygon points="150,170 146,162 154,162" fill="var(--color-primary)" />
  <text x="160" y="160" font-size="11" fill="var(--color-primary)">mg (重力)</text>
  <line x1="190" y1="110" x2="240" y2="110" stroke="var(--color-primary)" stroke-width="2" />
  <polygon points="240,110 232,106 232,114" fill="var(--color-primary)" />
  <text x="215" y="100" font-size="11" fill="var(--color-primary)">a (加速度)</text>
  <text x="150" y="190" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">牛顿第二定律示意图</text>
</svg>

### 例题解析

**问题**：质量为$2kg$的物体在水平面上受到水平拉力$F = 8N$的作用，物体与水平面间的动摩擦因数$\\mu = 0.2$，求物体的加速度。（$g$取$10m/s^2$）

**解答**：

摩擦力：$$ f = \\mu mg = 0.2 \\times 2 \\times 10 = 4N $$

合力：$$ F_合 = F - f = 8 - 4 = 4N $$

加速度：$$ a = \\frac{F_合}{m} = \\frac{4}{2} = 2m/s^2 $$

### 举一反三

**练习1**：电梯以$2m/s^2$的加速度匀加速上升，电梯中质量为$60kg$的人对电梯地板的压力多大？（$g$取$10m/s^2$）
- 答案：超重状态，$N = m(g + a) = 60 \\times (10 + 2) = 720N$。

**练习2**：一个人用$100N$的水平力推墙，墙保持静止，求人对墙的作用力和墙对人的反作用力。
- 答案：人对墙的作用力为$100N$，方向水平指向墙；墙对人的反作用力为$100N$，方向水平指向人。

### 拓展知识

- 作用力与反作用力分别作用在两个物体上，它们不能相互抵消，不能求合力。
- 超重和失重时，物体所受的实际重力并没有变化，变化的只是视重（即测力计的示数）。
- 在完全失重状态下，所有与重力有关的物理现象都会消失，如液体不再产生压强，天平无法使用等。`;
export const PHYSICS_031 = `## 曲线运动

### 核心概念

**曲线运动**：物体运动轨迹是曲线的运动。做曲线运动的物体，某点的速度方向沿曲线在该点的切线方向。物体做曲线运动的条件：合外力方向与速度方向不在同一直线上。

**平抛运动**：将物体以一定的初速度水平抛出，物体只在重力作用下所做的运动。平抛运动可分解为水平方向的匀速直线运动和竖直方向的自由落体运动。

**圆周运动**：物体沿圆周运动。匀速圆周运动中线速度大小不变，但方向时刻改变，是变速运动。

**向心加速度**：描述线速度方向变化快慢的物理量，方向始终指向圆心。

**向心力**：产生向心加速度的力，是效果力，方向指向圆心。

### 公式总结

| 公式 | 说明 |
|------|------|
| $v = \\frac{2\\pi r}{T}$ | 线速度 |
| $\\omega = \\frac{2\\pi}{T}$ | 角速度 |
| $v = \\omega r$ | 线速度与角速度关系 |
| $a = \\frac{v^2}{r} = \\omega^2 r$ | 向心加速度 |
| $F = m\\frac{v^2}{r} = m\\omega^2 r$ | 向心力 |
| $x = v_0 t$，$y = \\frac{1}{2}gt^2$ | 平抛运动分量 |

### 物理示意图

<svg width="300" height="220" viewBox="0 0 300 220">
  <line x1="30" y1="40" x2="270" y2="40" stroke="var(--color-text-secondary)" stroke-width="1" stroke-dasharray="3,2" />
  <line x1="30" y1="40" x2="30" y2="200" stroke="var(--color-text-secondary)" stroke-width="1" stroke-dasharray="3,2" />
  <circle cx="30" cy="40" r="5" fill="var(--color-primary)" />
  <line x1="30" y1="40" x2="70" y2="40" stroke="var(--color-primary)" stroke-width="2" />
  <polygon points="70,40 62,36 62,44" fill="var(--color-primary)" />
  <text x="50" y="30" font-size="10" fill="var(--color-primary)">v₀</text>
  <path d="M 30 40 Q 150 60, 200 200" fill="none" stroke="var(--color-primary)" stroke-width="1.5" stroke-dasharray="4,2" />
  <circle cx="200" cy="200" r="4" fill="var(--color-text-secondary)" />
  <line x1="30" y1="40" x2="200" y2="40" stroke="var(--color-text-secondary)" stroke-width="1" />
  <line x1="200" y1="40" x2="200" y2="200" stroke="var(--color-text-secondary)" stroke-width="1" />
  <text x="115" y="32" font-size="9" fill="var(--color-text-secondary)">x = v₀t (水平)</text>
  <text x="210" y="125" font-size="9" fill="var(--color-text-secondary)">y = ½gt²</text>
  <text x="150" y="215" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">平抛运动轨迹</text>
</svg>

### 例题解析

**问题**：将一物体以$v_0 = 10m/s$的初速度水平抛出，求$1s$后物体的位置、速度大小和方向。（$g$取$10m/s^2$）

**解答**：

水平位移：$$ x = v_0 t = 10 \\times 1 = 10m $$

竖直位移：$$ y = \\frac{1}{2}gt^2 = \\frac{1}{2} \\times 10 \\times 1 = 5m $$

竖直速度：$$ v_y = gt = 10 \\times 1 = 10m/s $$

合速度：$$ v = \\sqrt{v_0^2 + v_y^2} = \\sqrt{100 + 100} = 10\\sqrt{2}m/s $$

方向：与水平方向夹角$\\theta$，$\\tan\\theta = \\frac{v_y}{v_0} = 1$，$\\theta = 45°$。

### 举一反三

**练习1**：一物体做平抛运动，落地时的速度大小为$20m/s$，方向与水平方向成$30°$角向下，求抛出时的初速度。（$g$取$10m/s^2$）
- 答案：$v_0 = v\\cos 30° = 20 \\times \\frac{\\sqrt{3}}{2} = 10\\sqrt{3} \\approx 17.3m/s$。

**练习2**：一个做匀速圆周运动的物体，半径为$0.5m$，角速度为$4rad/s$，求其线速度和向心加速度。
- 答案：$v = \\omega r = 4 \\times 0.5 = 2m/s$；$a = \\omega^2 r = 16 \\times 0.5 = 8m/s^2$。

### 拓展知识

- 平抛运动在空中飞行时间只由抛出点的高度决定，与初速度无关。
- 匀速圆周运动中，向心力只改变速度的方向，不改变速度的大小。
- 火车转弯处，外轨高于内轨，重力和支持力的合力提供向心力，这样可以减小对铁轨的侧向挤压。`;
export const PHYSICS_032 = `## 万有引力与航天

### 核心概念

**万有引力定律**：自然界中任何两个物体都相互吸引，引力的方向沿两物体的连线，引力的大小$F$与这两个物体质量的乘积成正比，与它们之间距离的平方成反比。

**第一宇宙速度**：$7.9km/s$，是物体在地球表面附近环绕地球做匀速圆周运动的速度，是人造卫星的最小发射速度，也是最大环绕速度。

**第二宇宙速度**：$11.2km/s$，是物体挣脱地球引力束缚，成为绕太阳运动的人造行星的最小发射速度。

**第三宇宙速度**：$16.7km/s$，是物体挣脱太阳引力束缚，飞到太阳系以外的最小发射速度。

**人造卫星**：在地球引力作用下绕地球运动的物体。地球同步卫星的周期与地球自转周期相同，为$24h$。

### 公式总结

| 公式 | 说明 |
|------|------|
| $F = G\\frac{m_1 m_2}{r^2}$ | 万有引力定律 |
| $G\\frac{Mm}{r^2} = m\\frac{v^2}{r}$ | 卫星做圆周运动 |
| $v = \\sqrt{\\frac{GM}{r}}$ | 卫星运行速度 |
| $T = 2\\pi\\sqrt{\\frac{r^3}{GM}}$ | 卫星运行周期 |
| $g = \\frac{GM}{r^2}$ | 重力加速度 |

### 物理示意图

<svg width="300" height="220" viewBox="0 0 300 220">
  <circle cx="150" cy="110" r="40" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" stroke-width="1.5" />
  <text x="150" y="115" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">地球</text>
  <text x="150" y="130" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">M</text>
  <ellipse cx="150" cy="110" rx="100" ry="80" fill="none" stroke="var(--color-text-secondary)" stroke-width="1" stroke-dasharray="3,2" />
  <circle cx="250" cy="110" r="4" fill="var(--color-primary)" />
  <text x="265" y="108" font-size="10" fill="var(--color-primary)">卫星 m</text>
  <line x1="250" y1="110" x2="290" y2="110" stroke="var(--color-primary)" stroke-width="1.5" />
  <polygon points="290,110 282,106 282,114" fill="var(--color-primary)" />
  <text x="285" y="100" font-size="9" fill="var(--color-primary)">v</text>
  <line x1="250" y1="110" x2="190" y2="110" stroke="var(--color-text-secondary)" stroke-width="1.5" stroke-dasharray="2,2" />
  <polygon points="190,110 198,106 198,114" fill="var(--color-text-secondary)" />
  <text x="210" y="100" font-size="9" fill="var(--color-text-secondary)">F (引力)</text>
  <line x1="150" y1="110" x2="250" y2="110" stroke="var(--color-text-secondary)" stroke-width="0.5" stroke-dasharray="1,2" />
  <text x="200" y="125" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">r</text>
  <text x="150" y="205" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">卫星绕地球运行</text>
</svg>

### 例题解析

**问题**：已知地球质量$M = 6.0×10^{24}kg$，半径$R = 6.4×10^6m$，引力常量$G = 6.67×10^{-11}N·m^2/kg^2$，求地球的第一宇宙速度。

**解答**：

由万有引力提供向心力：$$ G\\frac{Mm}{R^2} = m\\frac{v^2}{R} $$

解得：$$ v = \\sqrt{\\frac{GM}{R}} $$

代入数据：$$ v = \\sqrt{\\frac{6.67×10^{-11} × 6.0×10^{24}}{6.4×10^6}} = \\sqrt{\\frac{4.0×10^{14}}{6.4×10^6}} \\approx 7.9×10^3 m/s = 7.9km/s $$

### 举一反三

**练习1**：地球半径为$R$，地面重力加速度为$g$，求地球的第一宇宙速度。
- 答案：$mg = m\\frac{v^2}{R}$，$v = \\sqrt{gR}$。

**练习2**：已知地球同步卫星的周期为$24h$，地球质量为$M$，引力常量为$G$，求同步卫星距地心的距离$r$。
- 答案：$G\\frac{Mm}{r^2} = m\\frac{4\\pi^2}{T^2}r$，$r = \\sqrt[3]{\\frac{GMT^2}{4\\pi^2}}$。

### 拓展知识

- 开普勒第三定律：所有行星绕太阳运动的轨道半长轴的三次方跟它的公转周期的二次方的比都相等，即$\\frac{a^3}{T^2} = k$。
- 同步卫星的轨道必须在赤道平面内，距离地面的高度约为$36000km$，相对地面静止。
- 卫星的轨道高度越高，运行速度越小，周期越大。近地卫星的速度最大（等于第一宇宙速度），周期最小。`;
export const PHYSICS_033 = `## 机械能守恒定律

### 核心概念

**动能**：物体由于运动而具有的能量，$E_k = \\frac{1}{2}mv^2$。

**重力势能**：物体由于被举高而具有的能量，$E_p = mgh$，与零势能面的选择有关。

**弹性势能**：物体由于发生弹性形变而具有的能量，$E_p = \\frac{1}{2}kx^2$。

**机械能**：动能与势能的总和，$E = E_k + E_p$。

**机械能守恒定律**：在只有重力或弹力做功的物体系统内，动能与势能可以相互转化，而总的机械能保持不变。

**功能关系**：功是能量转化的量度。重力做功等于重力势能的变化量，弹力做功等于弹性势能的变化量，合外力做功等于动能的变化量。

### 公式总结

| 公式 | 说明 |
|------|------|
| $E_k = \\frac{1}{2}mv^2$ | 动能公式 |
| $E_p = mgh$ | 重力势能公式 |
| $E_p = \\frac{1}{2}kx^2$ | 弹性势能公式 |
| $E_{k1} + E_{p1} = E_{k2} + E_{p2}$ | 机械能守恒（只有重力或弹力做功） |
| $W_G = -\\Delta E_p$ | 重力做功与势能变化 |
| $W_{合} = \\Delta E_k$ | 动能定理 |

### 物理示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <line x1="50" y1="170" x2="250" y2="170" stroke="var(--color-border)" stroke-width="2" />
  <path d="M50 170 Q100 80 150 130 Q200 50 250 170" stroke="var(--color-primary)" stroke-width="2" fill="none" />
  <circle cx="80" cy="140" r="10" fill="var(--color-primary)" opacity="0.8" />
  <text x="80" y="145" font-size="10" text-anchor="middle" fill="#fff">A</text>
  <circle cx="220" cy="140" r="10" fill="var(--color-primary)" opacity="0.8" />
  <text x="220" y="145" font-size="10" text-anchor="middle" fill="#fff">C</text>
  <circle cx="150" cy="80" r="10" fill="var(--color-primary)" opacity="0.6" />
  <text x="150" y="85" font-size="10" text-anchor="middle" fill="#fff">B</text>
  <line x1="80" y1="170" x2="80" y2="140" stroke="var(--color-text-secondary)" stroke-width="1" stroke-dasharray="3,2" />
  <text x="70" y="155" font-size="9" fill="var(--color-text-secondary)">h₁</text>
  <line x1="150" y1="170" x2="150" y2="80" stroke="var(--color-text-secondary)" stroke-width="1" stroke-dasharray="3,2" />
  <text x="140" y="125" font-size="9" fill="var(--color-text-secondary)">h₂</text>
  <text x="150" y="35" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">机械能守恒：E_A = E_B = E_C</text>
  <text x="80" y="185" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">低势能高动能</text>
  <text x="150" y="185" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">高势能低动能</text>
</svg>

### 例题解析

**问题**：一个小球从高度$h = 4m$处自由下落，求落地时的速度。（忽略空气阻力，$g$取$10m/s^2$）

**解答**：

由机械能守恒定律，以地面为零势能面：

初始机械能（只有势能）：$E_1 = mgh$

末态机械能（只有动能）：$E_2 = \\frac{1}{2}mv^2$

由$E_1 = E_2$：

$$ mgh = \\frac{1}{2}mv^2 $$

$$ v = \\sqrt{2gh} = \\sqrt{2×10×4} = \\sqrt{80} ≈ 8.94m/s $$

### 举一反三

**练习1**：一个物体从$10m$高处自由下落，落地时速度是多少？（$g$取$10m/s^2$）
- 答案：$v = \\sqrt{2gh} = \\sqrt{2×10×10} = 10\\sqrt{2} ≈ 14.14m/s$

**练习2**：一个质量为$2kg$的物体从$5m$高处自由下落，落地时的动能是多少？
- 答案：$E_k = mgh = 2×10×5 = 100J$

### 拓展知识

- 机械能守恒的条件是**只有重力或弹力做功**，其他力不做功或做功之和为零。
- 如果有摩擦力等非保守力做功，机械能不守恒，但总能量仍然守恒。
- 机械能守恒定律是能量守恒定律的特例，适用于宏观低速运动。
- 解题时选择合适的零势能面可以简化问题，通常选择地面或最低点为零势能面。`;
export const PHYSICS_034 = `## 静电场

### 核心概念

**电荷**：物质所带的电。电荷有正、负两种，同种电荷相互排斥，异种电荷相互吸引。电荷守恒定律：电荷既不会创生，也不会消灭，只能从一个物体转移到另一个物体，或从物体的一部分转移到另一部分。

**点电荷**：当带电体间的距离比它们自身的大小大得多，以致带电体的形状和大小对相互作用力的影响可忽略不计时，带电体可看作点电荷。

**库仑定律**：真空中两个静止点电荷之间的相互作用力，与它们的电荷量的乘积成正比，与它们的距离的二次方成反比。

**电场强度**：放入电场中某点的电荷所受电场力与它的电荷量的比值，是描述电场强弱的物理量，方向规定为正电荷在该点所受电场力的方向。

**电势**：电荷在电场中某点的电势能与它的电荷量的比值，是标量。

**电势差**：电场中两点电势的差值，也叫电压。

**电容**：电容器所带电荷量与两极板间电势差的比值，描述电容器容纳电荷的本领。

### 公式总结

| 公式 | 说明 |
|------|------|
| $F = k\\frac{q_1q_2}{r^2}$ | 库仑定律（$k = 9×10^9N·m^2/C^2$） |
| $E = \\frac{F}{q}$ | 电场强度定义式 |
| $E = k\\frac{Q}{r^2}$ | 点电荷电场强度 |
| $\\varphi = \\frac{E_p}{q}$ | 电势定义式 |
| $U_{AB} = \\varphi_A - \\varphi_B$ | 电势差 |
| $W_{AB} = qU_{AB}$ | 电场力做功 |
| $C = \\frac{Q}{U}$ | 电容定义式 |
| $C = \\frac{\\varepsilon S}{4\\pi kd}$ | 平行板电容器电容 |

### 物理示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <circle cx="80" cy="100" r="14" fill="var(--color-primary)" opacity="0.7" />
  <text x="80" y="105" font-size="14" text-anchor="middle" fill="#fff" font-weight="bold">+</text>
  <text x="80" y="135" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">+Q</text>
  <circle cx="220" cy="100" r="14" fill="var(--color-bg-secondary)" stroke="var(--color-primary)" stroke-width="2" />
  <text x="220" y="105" font-size="14" text-anchor="middle" fill="var(--color-text-primary)" font-weight="bold">−</text>
  <text x="220" y="135" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">−Q</text>
  <path d="M94 100 L206 100" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#emArrow1)" />
  <text x="150" y="90" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">F (库仑力)</text>
  <path d="M80 86 Q120 60 150 75 Q180 90 220 86" fill="none" stroke="var(--color-primary)" stroke-width="1.5" opacity="0.5" />
  <path d="M80 114 Q120 140 150 125 Q180 110 220 114" fill="none" stroke="var(--color-primary)" stroke-width="1.5" opacity="0.5" />
  <text x="150" y="170" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">电场线由正电荷出发终止于负电荷</text>
  <text x="150" y="188" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">E = kQ/r²</text>
  <defs>
    <marker id="emArrow1" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 Z" fill="var(--color-primary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：真空中两个点电荷，电荷量分别为$+2×10^{-6}C$和$-3×10^{-6}C$，相距$0.3m$，求它们之间的库仑力大小。

**解答**：

$$ F = k\\frac{q_1q_2}{r^2} = 9×10^9 × \\frac{2×10^{-6} × 3×10^{-6}}{0.3^2} $$

$$ F = 9×10^9 × \\frac{6×10^{-12}}{0.09} = \\frac{5.4×10^{-2}}{0.09} = 0.6N $$

因为是异种电荷，所以表现为**引力**。

### 举一反三

**练习1**：一个电荷量为$+4×10^{-6}C$的点电荷，在电场中某点受到的电场力为$2×10^{-3}N$，求该点的电场强度。
- 答案：$E = \\frac{F}{q} = \\frac{2×10^{-3}}{4×10^{-6}} = 500N/C$

**练习2**：一个电容器电容为$10μF$，两极板间电压为$6V$，求电容器所带电荷量。
- 答案：$Q = CU = 10×10^{-6} × 6 = 6×10^{-5}C = 60μC$

### 拓展知识

- **元电荷**：最小电荷量，$e = 1.6×10^{-19}C$，任何带电体的电荷量都是$e$的整数倍。
- **电场线**：是为了形象描述电场而引入的假想曲线，其**疏密**表示电场的强弱，**切线方向**表示电场方向。
- **等势面**：电场中电势相等的点构成的面，电场线与等势面**垂直**，沿等势面移动电荷电场力**不做功**。
- 平行板电容器间的电场可视为**匀强电场**，电场线是等距平行的直线。`;
export const PHYSICS_035 = `## 恒定电流

### 核心概念

**电流**：电荷的定向移动形成电流，规定**正电荷**定向移动的方向为电流方向。

**电阻**：导体对电流的阻碍作用，由导体本身的材料、长度、横截面积和温度决定。

**欧姆定律**：通过导体的电流与导体两端的电压成正比，与导体的电阻成反比。

**串联电路**：电流处处相等，总电压等于各部分电压之和，总电阻等于各电阻之和。

**并联电路**：电压处处相等，总电流等于各支路电流之和，总电阻的倒数等于各电阻倒数之和。

**电功**：电流通过导体所做的功，$W = UIt$。

**电功率**：单位时间内电流所做的功，$P = UI$。

**闭合电路欧姆定律**：闭合电路中的电流与电源电动势成正比，与内、外电阻之和成反比。

### 公式总结

| 公式 | 说明 |
|------|------|
| $I = \\frac{q}{t}$ | 电流定义式 |
| $R = \\rho\\frac{L}{S}$ | 电阻定律（$\\rho$为电阻率） |
| $I = \\frac{U}{R}$ | 欧姆定律 |
| $W = UIt = I^2Rt = \\frac{U^2}{R}t$ | 电功 |
| $P = UI = I^2R = \\frac{U^2}{R}$ | 电功率 |
| $I = \\frac{E}{R+r}$ | 闭合电路欧姆定律 |
| $E = U_{外} + U_{内} = IR + Ir$ | 路端电压关系 |

### 物理示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <rect x="40" y="60" width="40" height="80" fill="var(--color-bg-secondary)" stroke="var(--color-primary)" stroke-width="2" rx="3" />
  <text x="60" y="105" font-size="14" text-anchor="middle" fill="var(--color-text-primary)">E,r</text>
  <text x="60" y="50" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">电源</text>
  <path d="M80 60 L160 60" stroke="var(--color-primary)" stroke-width="2" />
  <rect x="120" y="50" width="40" height="20" fill="var(--color-bg-secondary)" stroke="var(--color-primary)" stroke-width="1.5" />
  <text x="140" y="65" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">开关S</text>
  <path d="M160 60 L220 60 L220 100" stroke="var(--color-primary)" stroke-width="2" />
  <rect x="210" y="100" width="20" height="40" fill="var(--color-primary)" opacity="0.4" stroke="var(--color-primary)" stroke-width="1.5" />
  <text x="245" y="125" font-size="11" fill="var(--color-text-primary)">R</text>
  <path d="M210 140 L80 140 L80 140" stroke="var(--color-primary)" stroke-width="2" fill="none" />
  <path d="M220 140 L80 140" stroke="var(--color-primary)" stroke-width="2" />
  <text x="150" y="170" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">I = E / (R + r)</text>
  <circle cx="80" cy="60" r="3" fill="var(--color-primary)" />
  <circle cx="220" cy="140" r="3" fill="var(--color-primary)" />
</svg>

### 例题解析

**问题**：已知电源电动势$E = 12V$，内阻$r = 1\\Omega$，外电路接一个$R = 5\\Omega$的电阻。求电路中的电流、路端电压和电阻$R$消耗的功率。

**解答**：

由闭合电路欧姆定律：

$$ I = \\frac{E}{R+r} = \\frac{12}{5+1} = 2A $$

路端电压：

$$ U = IR = 2 × 5 = 10V $$

电阻$R$消耗的功率：

$$ P = I^2R = 2^2 × 5 = 20W $$

### 举一反三

**练习1**：一段横截面积为$2mm^2$的铜导线，长$10m$，电阻率$\\rho = 1.7×10^{-8}\\Omega·m$，求其电阻。
- 答案：$R = \\rho\\frac{L}{S} = 1.7×10^{-8} × \\frac{10}{2×10^{-6}} = 0.085\\Omega$

**练习2**：两个电阻$R_1 = 3\\Omega$、$R_2 = 6\\Omega$并联后接在$6V$电源上（不计内阻），求总电流和总功率。
- 答案：总电阻$R = \\frac{R_1R_2}{R_1+R_2} = \\frac{3×6}{3+6} = 2\\Omega$，$I = \\frac{U}{R} = \\frac{6}{2} = 3A$，$P = UI = 6×3 = 18W$

### 拓展知识

- **电源的效率**：$\\eta = \\frac{P_{出}}{P_{总}} = \\frac{I^2R}{I^2(R+r)} = \\frac{R}{R+r}$，外电阻越大，效率越高。
- **电源最大输出功率**：当$R = r$时，输出功率最大，$P_{max} = \\frac{E^2}{4r}$，此时效率为50%。
- **超导现象**：某些金属在温度降低到某一数值时，电阻突然变为零的现象。
- **半导体**：导电性能介于导体和绝缘体之间的材料，其电阻率随温度升高而**减小**。`;
export const PHYSICS_036 = `## 磁场

### 核心概念

**磁场**：磁体或运动电荷周围存在的特殊物质，对放入其中的磁体或运动电荷有力的作用。

**磁感应强度**：描述磁场强弱的物理量，方向规定为小磁针静止时N极所指的方向。

**安培力**：通电导线在磁场中受到的力，方向由左手定则判断。

**洛伦兹力**：运动电荷在磁场中受到的力，方向由左手定则判断（正电荷），负电荷方向相反。

**左手定则**：伸开左手，让磁感线穿入手心，四指指向电流（正电荷运动）方向，拇指所指方向即为安培力（洛伦兹力）方向。

**带电粒子在匀强磁场中的运动**：当粒子速度方向与磁场方向垂直时，粒子做**匀速圆周运动**，洛伦兹力提供向心力。

### 公式总结

| 公式 | 说明 |
|------|------|
| $F = BIL$ | 安培力（B与I垂直） |
| $F = BIL\\sin\\theta$ | 安培力一般式（$\\theta$为B与I夹角） |
| $F = qvB$ | 洛伦兹力（v与B垂直） |
| $F = qvB\\sin\\theta$ | 洛伦兹力一般式 |
| $r = \\frac{mv}{qB}$ | 圆周运动半径 |
| $T = \\frac{2\\pi m}{qB}$ | 圆周运动周期 |

### 物理示意图

<svg width="300" height="220" viewBox="0 0 300 220">
  <rect x="20" y="20" width="260" height="180" fill="var(--color-bg-secondary)" opacity="0.4" />
  <text x="265" y="35" font-size="10" text-anchor="end" fill="var(--color-text-secondary)">匀强磁场 B</text>
  <circle cx="60" cy="60" r="2.5" fill="var(--color-text-secondary)" />
  <circle cx="100" cy="60" r="2.5" fill="var(--color-text-secondary)" />
  <circle cx="140" cy="60" r="2.5" fill="var(--color-text-secondary)" />
  <circle cx="180" cy="60" r="2.5" fill="var(--color-text-secondary)" />
  <circle cx="220" cy="60" r="2.5" fill="var(--color-text-secondary)" />
  <circle cx="60" cy="160" r="2.5" fill="var(--color-text-secondary)" />
  <circle cx="100" cy="160" r="2.5" fill="var(--color-text-secondary)" />
  <circle cx="140" cy="160" r="2.5" fill="var(--color-text-secondary)" />
  <circle cx="220" cy="160" r="2.5" fill="var(--color-text-secondary)" />
  <circle cx="260" cy="160" r="2.5" fill="var(--color-text-secondary)" />
  <circle cx="60" cy="110" r="2.5" fill="var(--color-text-secondary)" />
  <circle cx="220" cy="110" r="2.5" fill="var(--color-text-secondary)" />
  <circle cx="260" cy="110" r="2.5" fill="var(--color-text-secondary)" />
  <circle cx="260" cy="60" r="2.5" fill="var(--color-text-secondary)" />
  <circle cx="150" cy="110" r="40" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-dasharray="4,2" />
  <circle cx="110" cy="110" r="6" fill="var(--color-primary)" />
  <text x="110" y="114" font-size="9" text-anchor="middle" fill="#fff">+</text>
  <path d="M110 110 L130 110" stroke="var(--color-primary)" stroke-width="2.5" marker-end="url(#emArrow2)" />
  <text x="135" y="100" font-size="10" fill="var(--color-text-primary)">v</text>
  <path d="M110 110 L120 80" stroke="var(--color-text-primary)" stroke-width="2" marker-end="url(#emArrow2)" />
  <text x="95" y="80" font-size="10" fill="var(--color-text-primary)">F</text>
  <text x="150" y="200" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">r = mv / (qB)，T = 2πm / (qB)</text>
  <defs>
    <marker id="emArrow2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-primary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：一个质子（质量$m = 1.67×10^{-27}kg$，电荷量$q = 1.6×10^{-19}C$）以速度$v = 4×10^6m/s$垂直进入磁感应强度$B = 0.5T$的匀强磁场中，求质子做圆周运动的半径和周期。

**解答**：

半径：

$$ r = \\frac{mv}{qB} = \\frac{1.67×10^{-27} × 4×10^6}{1.6×10^{-19} × 0.5} $$

$$ r = \\frac{6.68×10^{-21}}{8×10^{-20}} = 0.0835m = 8.35cm $$

周期：

$$ T = \\frac{2\\pi m}{qB} = \\frac{2×3.14 × 1.67×10^{-27}}{1.6×10^{-19} × 0.5} $$

$$ T = \\frac{1.05×10^{-26}}{8×10^{-20}} ≈ 1.31×10^{-7}s $$

### 举一反三

**练习1**：一根长$0.2m$的导线通有$2A$的电流，垂直放在磁感应强度为$0.5T$的匀强磁场中，求导线受到的安培力。
- 答案：$F = BIL = 0.5 × 2 × 0.2 = 0.2N$

**练习2**：一个电子以速度$v$垂直射入匀强磁场，做半径为$r$的圆周运动。若将速度变为$2v$，求新的半径和周期。
- 答案：半径$r' = \\frac{m·2v}{qB} = 2r$；周期$T = \\frac{2\\pi m}{qB}$与速度无关，故$T' = T$不变。

### 拓展知识

- **回旋加速器**：利用电场加速、磁场偏转的原理，使带电粒子在D形盒内做半径逐渐增大的圆周运动，多次加速获得高能量。
- **质谱仪**：利用电场和磁场对带电粒子的偏转作用，测量带电粒子的**比荷**（$q/m$），用于分析同位素。
- **地磁场**：地球周围存在磁场，其N极在地理南极附近，S极在地理北极附近。
- 当带电粒子速度方向与磁场方向**不垂直**时，粒子做**等距螺旋线运动**。`;
export const PHYSICS_037 = `## 电磁感应

### 核心概念

**电磁感应现象**：当穿过闭合回路的磁通量发生变化时，回路中产生感应电流的现象。

**磁通量**：穿过某面积的磁感线的条数，$\\Phi = BS\\cos\\theta$，其中$\\theta$为磁场方向与面积法线的夹角。

**法拉第电磁感应定律**：感应电动势的大小与磁通量的变化率成正比。

**楞次定律**：感应电流具有这样的方向，即感应电流的磁场总要**阻碍**引起感应电流的磁通量的变化。

**自感**：由于导体本身的电流变化而产生的电磁感应现象。

**互感**：一个回路中电流变化时，在邻近回路中产生感应电动势的现象。

**右手定则**：伸开右手，让磁感线穿入手心，拇指指向导线运动方向，四指所指方向即为感应电流方向（适用于导体切割磁感线）。

### 公式总结

| 公式 | 说明 |
|------|------|
| $\\Phi = BS\\cos\\theta$ | 磁通量 |
| $E = n\\frac{\\Delta\\Phi}{\\Delta t}$ | 法拉第电磁感应定律 |
| $E = BLv$ | 导体切割磁感线（B、L、v互相垂直） |
| $E = BLv\\sin\\theta$ | 导体切割磁感线一般式 |
| $E_{自} = L\\frac{\\Delta I}{\\Delta t}$ | 自感电动势 |
| $q = n\\frac{\\Delta\\Phi}{R}$ | 感应电荷量 |

### 物理示意图

<svg width="300" height="220" viewBox="0 0 300 220">
  <rect x="120" y="60" width="60" height="120" fill="none" stroke="var(--color-primary)" stroke-width="2" rx="4" />
  <text x="150" y="40" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">螺线管(线圈)</text>
  <line x1="125" y1="80" x2="175" y2="80" stroke="var(--color-primary)" stroke-width="1.2" />
  <line x1="125" y1="100" x2="175" y2="100" stroke="var(--color-primary)" stroke-width="1.2" />
  <line x1="125" y1="120" x2="175" y2="120" stroke="var(--color-primary)" stroke-width="1.2" />
  <line x1="125" y1="140" x2="175" y2="140" stroke="var(--color-primary)" stroke-width="1.2" />
  <line x1="125" y1="160" x2="175" y2="160" stroke="var(--color-primary)" stroke-width="1.2" />
  <rect x="30" y="90" width="50" height="60" fill="var(--color-primary)" opacity="0.6" stroke="var(--color-primary)" stroke-width="2" rx="3" />
  <text x="55" y="115" font-size="10" text-anchor="middle" fill="#fff">N</text>
  <text x="55" y="135" font-size="10" text-anchor="middle" fill="#fff">S</text>
  <text x="55" y="170" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">条形磁铁</text>
  <path d="M80 120 L115 120" stroke="var(--color-primary)" stroke-width="2.5" marker-end="url(#emArrow3)" />
  <text x="97" y="110" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">v</text>
  <path d="M180 90 L210 90 L210 50 L240 50" fill="none" stroke="var(--color-primary)" stroke-width="2" />
  <path d="M180 150 L210 150 L210 190 L240 190" fill="none" stroke="var(--color-primary)" stroke-width="2" />
  <circle cx="245" cy="50" r="4" fill="none" stroke="var(--color-text-primary)" stroke-width="1.5" />
  <line x1="249" y1="50" x2="253" y2="50" stroke="var(--color-text-primary)" stroke-width="1.5" />
  <line x1="241" y1="50" x2="237" y2="50" stroke="var(--color-text-primary)" stroke-width="1.5" />
  <circle cx="245" cy="190" r="4" fill="none" stroke="var(--color-text-primary)" stroke-width="1.5" />
  <line x1="249" y1="190" x2="253" y2="190" stroke="var(--color-text-primary)" stroke-width="1.5" />
  <line x1="241" y1="190" x2="237" y2="190" stroke="var(--color-text-primary)" stroke-width="1.5" />
  <text x="260" y="125" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">G</text>
  <line x1="240" y1="54" x2="240" y2="186" stroke="var(--color-primary)" stroke-width="2" />
  <text x="150" y="205" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">E = nΔΦ/Δt</text>
  <defs>
    <marker id="emArrow3" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-primary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：一个匝数$n = 100$匝的螺线管，在$0.2s$内磁通量从$0.04Wb$均匀减小到$0.01Wb$，螺线管电阻$r = 2\\Omega$，外电路电阻$R = 8\\Omega$。求感应电动势和感应电流。

**解答**：

磁通量变化量：

$$ \\Delta\\Phi = 0.04 - 0.01 = 0.03Wb $$

感应电动势：

$$ E = n\\frac{\\Delta\\Phi}{\\Delta t} = 100 × \\frac{0.03}{0.2} = 15V $$

感应电流：

$$ I = \\frac{E}{R+r} = \\frac{15}{8+2} = 1.5A $$

### 举一反三

**练习1**：一根长$L = 0.5m$的金属棒在磁感应强度$B = 0.4T$的匀强磁场中，以速度$v = 2m/s$垂直切割磁感线，求感应电动势。
- 答案：$E = BLv = 0.4 × 0.5 × 2 = 0.4V$

**练习2**：一个线圈的自感系数$L = 0.4H$，在$0.1s$内电流从$5A$减小到$1A$，求自感电动势。
- 答案：$E_{自} = L\\frac{\\Delta I}{\\Delta t} = 0.4 × \\frac{5-1}{0.1} = 16V$

### 拓展知识

- **楞次定律的"阻碍"**：可以理解为阻碍磁通量的变化、阻碍相对运动、阻碍电流变化。本质上遵循**能量守恒定律**。
- **发电机原理**：线圈在磁场中旋转，磁通量周期性变化，产生交变电动势。
- **变压器原理**：利用互感现象改变交流电压，理想变压器满足$\\frac{U_1}{U_2} = \\frac{n_1}{n_2}$。
- **涡流**：导体在变化的磁场中产生的感应电流，可用于**电磁炉**加热，但也可能在变压器铁芯中造成**能量损耗**。`;
export const PHYSICS_038 = `## 交变电流

### 核心概念

**交变电流（交流电）**：大小和方向都随时间做周期性变化的电流。

**正弦式交流电**：按正弦规律变化的交流电，由线圈在匀强磁场中匀速转动产生。

**峰值**：交流电的最大值，用$I_m$、$U_m$表示。

**有效值**：让交流和直流通过同样阻值的电阻，如果在相同时间内产生的热量相等，这一直流的数值叫作该交流的有效值。

**周期和频率**：周期$T$是交流电完成一次周期性变化所需的时间，频率$f$是单位时间内完成周期性变化的次数，$f = 1/T$。我国市电频率为$50Hz$。

**变压器**：利用电磁感应原理改变交流电压的设备，由原线圈、副线圈和铁芯组成。

**理想变压器**：忽略能量损耗，输入功率等于输出功率。

**远距离输电**：为减少输电线上的功率损失，采用**高压输电**，因为$P_{损} = I^2R$，在输送功率一定时，提高电压可减小电流，从而减少损耗。

### 公式总结

| 公式 | 说明 |
|------|------|
| $e = E_m\\sin(\\omega t)$ | 交变电动势瞬时值 |
| $i = I_m\\sin(\\omega t)$ | 交变电流瞬时值 |
| $U_{有效} = \\frac{U_m}{\\sqrt{2}}$ | 电压有效值与峰值关系 |
| $I_{有效} = \\frac{I_m}{\\sqrt{2}}$ | 电流有效值与峰值关系 |
| $\\omega = 2\\pi f = \\frac{2\\pi}{T}$ | 角频率 |
| $\\frac{U_1}{U_2} = \\frac{n_1}{n_2}$ | 理想变压器电压比 |
| $U_1I_1 = U_2I_2$ | 理想变压器功率关系 |
| $P_{损} = I^2R = (\\frac{P}{U})^2R$ | 输电线上损耗功率 |

### 物理示意图

<svg width="300" height="220" viewBox="0 0 300 220">
  <line x1="20" y1="110" x2="280" y2="110" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="3,2" />
  <text x="280" y="125" font-size="9" text-anchor="end" fill="var(--color-text-secondary)">t</text>
  <path d="M20 110 Q50 50 80 110 Q110 170 140 110 Q170 50 200 110 Q230 170 260 110" fill="none" stroke="var(--color-primary)" stroke-width="2.5" />
  <text x="140" y="40" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">u = U_m sin(ωt)</text>
  <text x="22" y="60" font-size="9" fill="var(--color-text-secondary)">U_m</text>
  <line x1="20" y1="60" x2="35" y2="60" stroke="var(--color-text-secondary)" stroke-width="1" />
  <text x="22" y="165" font-size="9" fill="var(--color-text-secondary)">−U_m</text>
  <line x1="20" y1="160" x2="35" y2="160" stroke="var(--color-text-secondary)" stroke-width="1" />
  <text x="80" y="200" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">正弦交流电波形</text>
  <rect x="100" y="135" width="50" height="50" fill="none" stroke="var(--color-border)" stroke-width="1" />
  <text x="125" y="165" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">T</text>
  <line x1="100" y1="135" x2="100" y2="185" stroke="var(--color-text-secondary)" stroke-width="1" />
  <line x1="150" y1="135" x2="150" y2="185" stroke="var(--color-text-secondary)" stroke-width="1" />
</svg>

### 例题解析

**问题**：某交流电压的瞬时值表达式为$u = 311\\sin(100\\pi t)V$，求该交流电压的峰值、有效值、周期和频率。

**解答**：

由表达式$u = U_m\\sin(\\omega t)$可知：

峰值：$U_m = 311V$

角频率：$\\omega = 100\\pi \\, rad/s$

有效值：

$$ U_{有效} = \\frac{U_m}{\\sqrt{2}} = \\frac{311}{1.414} ≈ 220V $$

频率：

$$ f = \\frac{\\omega}{2\\pi} = \\frac{100\\pi}{2\\pi} = 50Hz $$

周期：

$$ T = \\frac{1}{f} = \\frac{1}{50} = 0.02s $$

### 举一反三

**练习1**：一理想变压器原线圈匝数$n_1 = 1100$匝，副线圈匝数$n_2 = 220$匝，原线圈接入$220V$交流电，求副线圈电压。若副线圈电流为$5A$，求原线圈电流。
- 答案：$U_2 = \\frac{n_2}{n_1}U_1 = \\frac{220}{1100} × 220 = 44V$；$I_1 = \\frac{n_2}{n_1}I_2 = \\frac{220}{1100} × 5 = 1A$

**练习2**：某电站输送功率$P = 1000kW$的电能，输电线总电阻$R = 10\\Omega$。若采用$10kV$电压输电，求线路损耗功率；若改用$100kV$电压输电，损耗功率变为多少？
- 答案：$10kV$时，$I = \\frac{P}{U} = \\frac{10^6}{10^4} = 100A$，$P_{损} = I^2R = 100^2 × 10 = 10^5W = 100kW$；$100kV$时，$I' = 10A$，$P_{损}' = 10^2 × 10 = 1000W = 1kW$，损耗降为原来的1/100。

### 拓展知识

- **我国市电标准**：电压有效值为$220V$（峰值约$311V$），频率为$50Hz$，周期为$0.02s$。
- **有效值的意义**：交流电表的示数、用电器铭牌上的额定电压和额定电流均指**有效值**。
- **三相交流电**：由三个频率相同、相位互差$120°$的交流电组成，广泛应用于电力生产和传输。
- **高压输电的优势**：电压提高$n$倍，输电线上电流减小为$1/n$，功率损耗减小为$1/n^2$，因此远距离输电采用**超高压**（如$500kV$）甚至**特高压**（如$1000kV$）。`;
export const PHYSICS_039 = `## 传感器

### 核心概念

**传感器**：能将被测的非电学量（如温度、光强、压力等）转换为电学量（如电压、电流）的元件。

**敏感元件**：传感器中能直接感受被测非电学量的元件。

**转换元件**：将敏感元件输出的物理量转换为电学量的元件。

**热敏电阻**：电阻随温度变化的电阻器，分为正温度系数（PTC）和负温度系数（NTC）热敏电阻。

**光敏电阻**：电阻随光照强度变化的电阻器，光照越强，电阻越小。

**霍尔元件**：利用霍尔效应将磁信号转换为电信号的元件，用于测量磁场。

**应变片**：电阻随形变（拉伸或压缩）变化的元件，用于测量压力和力。

**传感器的应用**：温度测量、光控开关、声控开关、电子秤、自动门、遥控器等。

### 公式总结

| 公式 | 说明 |
|------|------|
| $R = R_0(1 + αΔt)$ | 金属电阻随温度变化（α为温度系数） |
| $U_H = \\frac{IB}{nqd}$ | 霍尔电压（I为电流，B为磁场，n为载流子浓度） |
| $R = ρ\\frac{L}{S}$ | 电阻定律（应变片原理） |

### 物理示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <text x="150" y="22" font-size="13" text-anchor="middle" fill="var(--color-text-primary)">传感器工作原理</text>
  <rect x="40" y="45" width="80" height="50" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" rx="4" />
  <text x="80" y="75" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">非电学量输入</text>
  <text x="80" y="55" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">温度/光/压力</text>
  <path d="M120 70 L160 70" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#sensorArrow)" />
  <rect x="165" y="45" width="70" height="50" fill="var(--color-primary)" opacity="0.4" stroke="var(--color-primary)" rx="4" />
  <text x="200" y="75" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">传感器</text>
  <path d="M235 70 L275 70" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#sensorArrow)" />
  <rect x="275" y="45" width="80" height="50" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" rx="4" />
  <text x="315" y="75" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">电学量输出</text>
  <text x="315" y="55" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">电压/电流</text>
  <circle cx="100" cy="130" r="20" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" />
  <text x="100" y="135" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">热敏电阻</text>
  <circle cx="200" cy="130" r="20" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" />
  <text x="200" y="135" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">光敏电阻</text>
  <circle cx="300" cy="130" r="20" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" />
  <text x="300" y="135" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">霍尔元件</text>
  <text x="200" y="175" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">将非电学量转换为电学量</text>
  <defs>
    <marker id="sensorArrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-primary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：一个热敏电阻在20°C时的电阻为100Ω，温度系数α = 0.003°C⁻¹，求温度升高到100°C时的电阻。

**解答**：

$$ R = R_0(1 + αΔt) = 100 × (1 + 0.003 × (100-20)) $$

$$ R = 100 × (1 + 0.003 × 80) = 100 × (1 + 0.24) = 124Ω $$

### 举一反三

**练习1**：一个热敏电阻在0°C时电阻为500Ω，温度系数α = -0.004°C⁻¹（负温度系数），求温度升高到50°C时的电阻。
- 答案：$R = 500 × (1 - 0.004 × 50) = 500 × 0.8 = 400Ω$

**练习2**：光敏电阻的特性是什么？
- 答案：光照越强，电阻越小；光照越弱，电阻越大。

### 拓展知识

- 传感器是现代信息技术的三大支柱之一（传感器、通信、计算机）。
- 热敏电阻常用于**温度计**和**温度控制**电路。
- 光敏电阻常用于**路灯自动控制**和**照相机测光**。
- 霍尔元件常用于**测量磁场强度**和**无刷电机**中。
- 传感器技术在物联网、智能家居、工业自动化中广泛应用。`;
export const PHYSICS_040 = `## 分子动理论

### 核心概念

**分子**：物质由大量分子组成，分子是保持物质化学性质的最小微粒。

**阿伏伽德罗常数**：1摩尔物质含有的微粒数，$N_A = 6.02×10^{23}mol^{-1}$。

**分子热运动**：分子永不停息地做无规则运动，温度越高运动越剧烈。

**布朗运动**：悬浮在液体（或气体）中的微粒的无规则运动，是分子热运动的反映。

**分子间的作用力**：分子间同时存在引力和斥力，都随距离增大而减小，但斥力变化更快。

### 公式总结

| 公式 | 说明 |
|------|------|
| $N_A = 6.02×10^{23}mol^{-1}$ | 阿伏伽德罗常数 |
| $m_0 = M/N_A$ | 单个分子质量 |
| $V_0 = \\frac{M}{\\rho N_A}$ | 单个分子体积（固体液体） |
| $d = \\sqrt[3]{V_0}$ | 分子直径估算 |
| $n = m/M$ | 物质的量 |

### 物理示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <line x1="40" y1="100" x2="280" y2="100" stroke="var(--color-border)" stroke-width="1" />
  <text x="285" y="105" font-size="10" fill="var(--color-text-secondary)">r</text>
  <line x1="150" y1="30" x2="150" y2="180" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="3,2" />
  <text x="155" y="30" font-size="10" fill="var(--color-text-secondary)">r₀</text>
  <path d="M150 40 Q90 70 60 100" stroke="var(--color-primary)" stroke-width="2" fill="none" />
  <text x="75" y="60" font-size="11" fill="var(--color-primary)">引力</text>
  <path d="M150 40 Q210 70 240 100" stroke="var(--color-primary)" stroke-width="2" fill="none" stroke-dasharray="4,3" />
  <text x="220" y="60" font-size="11" fill="var(--color-primary)">斥力</text>
  <path d="M60 100 Q150 135 240 100" stroke="var(--color-text-primary)" stroke-width="2" fill="none" />
  <text x="120" y="150" font-size="11" fill="var(--color-text-primary)">合力</text>
  <circle cx="150" cy="100" r="4" fill="var(--color-primary)" />
  <text x="150" y="115" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">平衡位置</text>
</svg>

### 例题解析

**问题**：已知水的摩尔质量$M = 1.8×10^{-2}kg/mol$，水的密度$\\rho = 1.0×10^3kg/m^3$，阿伏伽德罗常数$N_A = 6.0×10^{23}mol^{-1}$，估算一个水分子的质量。

**解答**：

$$ m_0 = \\frac{M}{N_A} = \\frac{1.8×10^{-2}}{6.0×10^{23}} = 3.0×10^{-26}kg $$

### 举一反三

**练习1**：已知铜的摩尔质量为$6.4×10^{-2}kg/mol$，密度为$8.9×10^3kg/m^3$，估算1个铜分子的体积。
- 答案：$V_0 = \\frac{M}{\\rho N_A} = \\frac{6.4×10^{-2}}{8.9×10^3 × 6.0×10^{23}} ≈ 1.2×10^{-29}m^3$

**练习2**：布朗运动说明分子做什么运动？
- 答案：布朗运动说明液体（或气体）分子在做永不停息的无规则运动。

### 拓展知识

- 当分子间距离$r = r_0$时，引力等于斥力，合力为零。
- 当$r < r_0$时，斥力大于引力，合力表现为斥力。
- 当$r > r_0$时，引力大于斥力，合力表现为引力。
- 当$r > 10r_0$时，分子力可忽略不计。`;
export const PHYSICS_041 = `## 气体

### 核心概念

**气体的状态参量**：描述气体状态的物理量，包括压强$p$、体积$V$、温度$T$（热力学温度）。

**玻意耳定律**：一定质量的气体，温度不变时，压强与体积成反比。

**查理定律**：一定质量的气体，体积不变时，压强与热力学温度成正比。

**盖-吕萨克定律**：一定质量的气体，压强不变时，体积与热力学温度成正比。

**理想气体**：分子间无作用力、分子本身无大小的气体，实际气体在常温常压下可视为理想气体。

### 公式总结

| 公式 | 说明 |
|------|------|
| $p_1V_1 = p_2V_2$ | 玻意耳定律（等温过程） |
| $\\frac{p_1}{T_1} = \\frac{p_2}{T_2}$ | 查理定律（等容过程） |
| $\\frac{V_1}{T_1} = \\frac{V_2}{T_2}$ | 盖-吕萨克定律（等压过程） |
| $\\frac{p_1V_1}{T_1} = \\frac{p_2V_2}{T_2}$ | 理想气体状态方程 |
| $pV = nRT$ | 理想气体方程（$R = 8.31J/(mol·K)$） |
| $T = t + 273.15$ | 热力学温度与摄氏温度 |

### 物理示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <line x1="30" y1="150" x2="280" y2="150" stroke="var(--color-border)" stroke-width="1" />
  <line x1="30" y1="150" x2="30" y2="20" stroke="var(--color-border)" stroke-width="1" />
  <text x="15" y="90" font-size="11" fill="var(--color-text-secondary)" transform="rotate(-90 15 90)">压强 p</text>
  <text x="155" y="172" font-size="11" fill="var(--color-text-secondary)" text-anchor="middle">体积 V</text>
  <path d="M40 40 Q150 60 270 140" stroke="var(--color-primary)" stroke-width="2" fill="none" />
  <text x="95" y="50" font-size="11" fill="var(--color-primary)">T₂ (高温)</text>
  <path d="M40 90 Q150 100 270 150" stroke="var(--color-primary)" stroke-width="2" fill="none" stroke-dasharray="4,3" />
  <text x="95" y="105" font-size="11" fill="var(--color-primary)">T₁ (低温)</text>
  <circle cx="100" cy="58" r="3" fill="var(--color-primary)" />
  <text x="115" y="40" font-size="9" fill="var(--color-text-secondary)">等温线</text>
</svg>

### 例题解析

**问题**：一定质量的理想气体，初始状态为$p_1 = 1.0×10^5Pa$，$V_1 = 3.0×10^{-3}m^3$，$T_1 = 300K$。等温压缩到$V_2 = 1.0×10^{-3}m^3$，求此时压强$p_2$。

**解答**：

等温过程，由玻意耳定律：

$$ p_1V_1 = p_2V_2 $$

$$ p_2 = \\frac{p_1V_1}{V_2} = \\frac{1.0×10^5 × 3.0×10^{-3}}{1.0×10^{-3}} = 3.0×10^5Pa $$

### 举一反三

**练习1**：一定质量的理想气体，压强为$2×10^5Pa$时体积为$5L$，等温膨胀到体积为$10L$，求此时压强。
- 答案：$p_2 = \\frac{p_1V_1}{V_2} = \\frac{2×10^5 × 5}{10} = 1×10^5Pa$

**练习2**：一定质量的气体在体积不变时，温度从$27°C$升高到$127°C$，压强变为原来的几倍？
- 答案：$T_1 = 300K$，$T_2 = 400K$，$\\frac{p_2}{p_1} = \\frac{T_2}{T_1} = \\frac{400}{300} = \\frac{4}{3}$倍

### 拓展知识

- 热力学温度的单位是**开尔文(K)**，$0K = -273.15°C$称为绝对零度。
- 绝对零度是低温的极限，只能无限接近但不能达到。
- 理想气体状态方程是玻意耳定律、查理定律、盖-吕萨克定律的综合。`;
export const PHYSICS_042 = `## 热力学定律

### 核心概念

**热力学第一定律**：物体内能的变化等于外界对物体做的功与物体吸收的热量之和。

**能量守恒定律**：能量既不会凭空产生，也不会凭空消失，只能从一种形式转化为另一种形式。

**热力学第二定律**：热量不能自发地从低温物体传到高温物体；不可能从单一热源吸收热量使之完全变为有用功而不产生其他影响。

**熵**：描述系统无序程度的物理量，孤立系统的熵永不减少。

### 公式总结

| 公式 | 说明 |
|------|------|
| $\\Delta U = W + Q$ | 热力学第一定律 |
| $\\Delta U > 0$ | 内能增加 |
| $Q > 0$ 吸热，$W > 0$ | 外界对气体做功（取正） |
| $W = p\\Delta V$ | 气体做功（等压过程） |
| $\\eta = 1 - \\frac{Q_2}{Q_1}$ | 热机效率 |

### 物理示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="40" y="60" width="80" height="60" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" rx="4" />
  <text x="80" y="95" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">高温热源</text>
  <text x="80" y="50" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">T₁</text>
  <rect x="160" y="60" width="80" height="60" fill="var(--color-primary)" opacity="0.35" stroke="var(--color-primary)" rx="4" />
  <text x="200" y="95" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">热机</text>
  <rect x="110" y="140" width="80" height="30" fill="var(--color-border)" opacity="0.4" stroke="var(--color-border)" rx="4" />
  <text x="150" y="160" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">低温热源 T₂</text>
  <path d="M120 75 L160 75" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#arrow39)" />
  <text x="140" y="68" font-size="10" text-anchor="middle" fill="var(--color-primary)">Q₁</text>
  <path d="M200 120 L160 140" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#arrow39)" stroke-dasharray="3,2" />
  <text x="185" y="135" font-size="10" fill="var(--color-primary)">Q₂</text>
  <path d="M240 75 L275 75" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#arrow39)" />
  <text x="258" y="68" font-size="10" text-anchor="middle" fill="var(--color-primary)">W</text>
  <defs>
    <marker id="arrow39" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-primary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：一定质量的气体从外界吸收热量$Q = 800J$，同时气体对外界做功$W = 500J$，求气体内能的变化。

**解答**：

注意气体对外做功取负值：

$$ \\Delta U = W + Q = -500 + 800 = 300J $$

气体内能增加了$300J$。

### 举一反三

**练习1**：一定质量的气体，外界对气体做功$300J$，气体内能减少了$100J$，气体是吸热还是放热？热量是多少？
- 答案：$Q = \\Delta U - W = -100 - 300 = -400J$，气体放热$400J$。

**练习2**：热机从高温热源吸收$2000J$热量，向低温热源放出$1200J$热量，该热机效率是多少？
- 答案：$\\eta = 1 - \\frac{Q_2}{Q_1} = 1 - \\frac{1200}{2000} = 40\\%$

### 拓展知识

- 热力学第一定律的实质是**能量守恒定律**在热学中的体现。
- 热力学第二定律指明了热力学过程的方向性。
- **第二类永动机**违反热力学第二定律，虽不违反能量守恒但不可能制成。
- 熵增原理表明自然界中宏观过程具有方向性。`;
export const PHYSICS_043 = `## 机械振动

### 核心概念

**简谐运动**：物体所受回复力与位移成正比且方向相反的运动，是最基本的机械振动。

**回复力**：使物体回到平衡位置的力，$F = -kx$。

**振幅(A)**：振动物体离开平衡位置的最大距离。

**周期(T)**：完成一次全振动所用的时间。

**频率(f)**：单位时间内完成全振动的次数，$f = 1/T$。

**单摆**：理想化的摆，在摆角小于5°时做简谐运动。

**阻尼振动**：振幅逐渐减小的振动。

**受迫振动**：在周期性外力作用下的振动，频率等于外力频率。

**共振**：当外力频率等于系统固有频率时，振幅达到最大的现象。

### 公式总结

| 公式 | 说明 |
|------|------|
| $F = -kx$ | 简谐运动回复力 |
| $T = 2\\pi\\sqrt{\\frac{m}{k}}$ | 弹簧振子周期 |
| $T = 2\\pi\\sqrt{\\frac{l}{g}}$ | 单摆周期 |
| $f = \\frac{1}{T}$ | 频率与周期关系 |
| $x = A\\cos(\\omega t)$ | 简谐运动方程 |
| $\\omega = 2\\pi f$ | 角频率 |

### 物理示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <line x1="20" y1="90" x2="280" y2="90" stroke="var(--color-border)" stroke-width="1" />
  <line x1="150" y1="20" x2="150" y2="160" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="3,2" />
  <path d="M30 90 Q90 30 150 90 Q210 150 270 90" stroke="var(--color-primary)" stroke-width="2" fill="none" />
  <circle cx="30" cy="90" r="4" fill="var(--color-primary)" />
  <circle cx="150" cy="90" r="4" fill="var(--color-primary)" />
  <circle cx="270" cy="90" r="4" fill="var(--color-primary)" />
  <text x="150" y="15" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">平衡位置</text>
  <text x="30" y="80" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">-A</text>
  <text x="270" y="80" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">+A</text>
  <text x="20" y="175" font-size="10" fill="var(--color-text-secondary)">位移 x</text>
  <text x="245" y="50" font-size="10" fill="var(--color-primary)">简谐运动图像</text>
</svg>

### 例题解析

**问题**：一个单摆的摆长$l = 1m$，重力加速度$g = 9.8m/s^2$，求该单摆的周期。

**解答**：

$$ T = 2\\pi\\sqrt{\\frac{l}{g}} = 2\\pi\\sqrt{\\frac{1}{9.8}} ≈ 2.0s $$

### 举一反三

**练习1**：弹簧振子的质量$m = 0.5kg$，劲度系数$k = 50N/m$，求其周期。
- 答案：$T = 2\\pi\\sqrt{\\frac{m}{k}} = 2\\pi\\sqrt{\\frac{0.5}{50}} = 2\\pi×0.1 ≈ 0.628s$

**练习2**：把单摆从地球带到月球（$g_月 = \\frac{g_地}{6}$），周期变为原来的几倍？
- 答案：$T ∝ \\frac{1}{\\sqrt{g}}$，$\\frac{T_月}{T_地} = \\sqrt{\\frac{g_地}{g_月}} = \\sqrt{6} ≈ 2.45$倍

### 拓展知识

- 单摆的等时性由伽利略发现，惠更斯据此发明了摆钟。
- 共振在工程中有时需避免（如桥梁共振），有时需利用（如乐器发声）。
- 简谐运动是理想化模型，实际振动都存在阻尼。`;
export const PHYSICS_044 = `## 机械波

### 核心概念

**机械波**：机械振动在介质中的传播，传播的是振动形式和能量，介质本身不迁移。

**横波**：质点振动方向与波传播方向垂直的波，如绳波。

**纵波**：质点振动方向与波传播方向在同一直线上的波，如声波。

**波长(λ)**：相邻两个同相质点间的距离。

**频率(f)**：等于波源的振动频率。

**波速(v)**：波在介质中传播的速度。

**干涉**：两列频率相同的波叠加，某些区域振动加强、某些区域振动减弱的现象。

**衍射**：波绕过障碍物继续传播的现象，明显衍射条件是障碍物尺寸与波长相近或更小。

**多普勒效应**：波源与观察者相对运动时，观察者接收到的频率发生变化的现象。

### 公式总结

| 公式 | 说明 |
|------|------|
| $v = \\lambda f$ | 波速、波长、频率关系 |
| $v = \\frac{\\lambda}{T}$ | 波速与周期关系 |
| $v_{声} ≈ 340m/s$ | 空气中声速（15°C） |
| $f' = f\\frac{v ± v_0}{v ∓ v_s}$ | 多普勒效应公式 |

### 物理示意图

<svg width="300" height="160" viewBox="0 0 300 160">
  <line x1="20" y1="80" x2="280" y2="80" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="3,2" />
  <path d="M20 80 Q50 30 80 80 Q110 130 140 80 Q170 30 200 80 Q230 130 260 80" stroke="var(--color-primary)" stroke-width="2" fill="none" />
  <circle cx="20" cy="80" r="4" fill="var(--color-primary)" />
  <circle cx="80" cy="80" r="4" fill="var(--color-primary)" />
  <circle cx="140" cy="80" r="4" fill="var(--color-primary)" />
  <circle cx="200" cy="80" r="4" fill="var(--color-primary)" />
  <circle cx="260" cy="80" r="4" fill="var(--color-primary)" />
  <text x="20" y="100" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">O</text>
  <text x="80" y="100" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">λ/2</text>
  <text x="140" y="100" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">λ</text>
  <path d="M260 70 L282 80 L260 90" stroke="var(--color-primary)" stroke-width="2" fill="none" />
  <text x="275" y="65" font-size="10" fill="var(--color-text-primary)">v</text>
  <text x="150" y="25" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">横波</text>
  <text x="150" y="145" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">波长 λ</text>
</svg>

### 例题解析

**问题**：一列横波在绳上传播，频率$f = 10Hz$，波长$\\lambda = 0.5m$，求波速$v$。

**解答**：

$$ v = \\lambda f = 0.5 × 10 = 5m/s $$

### 举一反三

**练习1**：一列声波在空气中传播，波长为$0.85m$，求其频率。（声速取$340m/s$）
- 答案：$f = \\frac{v}{\\lambda} = \\frac{340}{0.85} = 400Hz$

**练习2**：救护车以$30m/s$的速度驶向静止观察者，若警笛频率为$1000Hz$，声速为$340m/s$，观察者听到的频率是多少？
- 答案：$f' = f\\frac{v}{v - v_s} = 1000×\\frac{340}{340-30} ≈ 1097Hz$

### 拓展知识

- 机械波的传播需要介质，电磁波的传播不需要介质。
- 波的干涉和衍射是波特有的现象。
- 多普勒效应不仅适用于机械波，也适用于电磁波，雷达测速、天体测距都用到它。`;
export const PHYSICS_045 = `## 光的波动性

### 核心概念

**光的干涉**：两列相干光波叠加，出现明暗相间条纹的现象，证明光具有波动性。

**杨氏双缝干涉**：通过双缝获得相干光源，在屏上形成干涉条纹的实验。

**光的衍射**：光绕过障碍物偏离直线传播的现象，明显衍射条件是障碍物尺寸与波长相近。

**光的偏振**：光矢量在垂直传播方向的平面内只沿某一方向振动的现象，证明光是横波。

**相干光**：频率相同、振动方向相同、相位差恒定的光。

### 公式总结

| 公式 | 说明 |
|------|------|
| $\\Delta x = \\frac{l}{d}\\lambda$ | 双缝干涉相邻明纹间距 |
| $\\lambda = \\frac{d\\Delta x}{l}$ | 测定光波长 |
| $\\Delta x = \\frac{l}{d}\\lambda$ | 条纹间距 |
| $n = \\frac{c}{v}$ | 介质折射率 |

### 物理示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="8" y="40" width="18" height="100" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" />
  <text x="17" y="158" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">单缝</text>
  <line x1="26" y1="60" x2="120" y2="90" stroke="var(--color-primary)" stroke-width="1" />
  <line x1="26" y1="120" x2="120" y2="90" stroke="var(--color-primary)" stroke-width="1" />
  <line x1="120" y1="60" x2="120" y2="70" stroke="var(--color-text-primary)" stroke-width="3" />
  <line x1="120" y1="88" x2="120" y2="92" stroke="var(--color-text-primary)" stroke-width="3" />
  <line x1="120" y1="110" x2="120" y2="120" stroke="var(--color-text-primary)" stroke-width="3" />
  <text x="135" y="55" font-size="10" fill="var(--color-text-secondary)">S₁</text>
  <text x="135" y="90" font-size="10" fill="var(--color-text-secondary)">双缝</text>
  <text x="135" y="125" font-size="10" fill="var(--color-text-secondary)">S₂</text>
  <line x1="120" y1="65" x2="268" y2="50" stroke="var(--color-primary)" stroke-width="1" />
  <line x1="120" y1="65" x2="268" y2="90" stroke="var(--color-primary)" stroke-width="1" />
  <line x1="120" y1="115" x2="268" y2="90" stroke="var(--color-primary)" stroke-width="1" />
  <line x1="120" y1="115" x2="268" y2="130" stroke="var(--color-primary)" stroke-width="1" />
  <rect x="268" y="40" width="14" height="100" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <line x1="270" y1="50" x2="282" y2="50" stroke="var(--color-text-primary)" stroke-width="2" />
  <line x1="270" y1="70" x2="282" y2="70" stroke="var(--color-text-primary)" stroke-width="2" />
  <line x1="270" y1="90" x2="282" y2="90" stroke="var(--color-text-primary)" stroke-width="2" />
  <line x1="270" y1="110" x2="282" y2="110" stroke="var(--color-text-primary)" stroke-width="2" />
  <line x1="270" y1="130" x2="282" y2="130" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="275" y="160" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">光屏</text>
</svg>

### 例题解析

**问题**：在双缝干涉实验中，双缝间距$d = 0.2mm$，双缝到屏的距离$l = 1m$，用波长$\\lambda = 600nm$的黄光照射，求相邻明纹间距$\\Delta x$。

**解答**：

$$ \\Delta x = \\frac{l}{d}\\lambda = \\frac{1}{0.2×10^{-3}} × 600×10^{-9} = 3×10^{-3}m = 3mm $$

### 举一反三

**练习1**：双缝干涉实验中，相邻明纹间距为$2mm$，双缝间距$0.5mm$，双缝到屏的距离$1m$，求光的波长。
- 答案：$\\lambda = \\frac{d\\Delta x}{l} = \\frac{0.5×10^{-3} × 2×10^{-3}}{1} = 1×10^{-6}m = 1000nm$

**练习2**：光的偏振现象说明光是什么波？
- 答案：光的偏振说明光是横波。

### 拓展知识

- 托马斯·杨的双缝干涉实验首次证明了光的波动性。
- 薄膜干涉（如肥皂泡上的彩色条纹）是光在薄膜前后表面反射光叠加形成的。
- 偏振片常用于摄影中消除反光、液晶显示器等。`;
export const PHYSICS_046 = `## 光的折射与全反射

### 核心概念

**光的折射**：光从一种介质进入另一种介质时，传播方向发生改变的现象。

**折射率**：描述介质对光的折射能力，$n = \\frac{c}{v}$，其中$c$为真空中光速，$v$为光在介质中的速度。

**斯涅尔定律**：光从介质1进入介质2时，$n_1\\sin\\theta_1 = n_2\\sin\\theta_2$，其中$\\theta_1$为入射角，$\\theta_2$为折射角。

**全反射**：当光从光密介质射入光疏介质时，入射角大于等于临界角时，光全部反射回原介质，不再发生折射的现象。

**临界角**：刚好发生全反射时的入射角，$\\sin C = \\frac{n_2}{n_1}$。

**光导纤维**：利用全反射原理传输光信号的纤维状材料，由内芯和外套组成，内芯折射率大于外套。

### 公式总结

| 公式 | 说明 |
|------|------|
| $n = \\frac{c}{v}$ | 折射率定义式 |
| $n_1\\sin\\theta_1 = n_2\\sin\\theta_2$ | 斯涅尔定律 |
| $\\sin C = \\frac{n_2}{n_1}$ | 全反射临界角（$n_1 > n_2$） |
| $v = \\frac{c}{n}$ | 光在介质中的速度 |

### 物理示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <line x1="150" y1="20" x2="150" y2="180" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="3,2" />
  <text x="155" y="100" font-size="10" fill="var(--color-text-secondary)">法线</text>
  <line x1="30" y1="100" x2="270" y2="100" stroke="var(--color-primary)" stroke-width="2" />
  <text x="275" y="105" font-size="10" fill="var(--color-text-secondary)">界面</text>
  <rect x="0" y="0" width="300" height="100" fill="var(--color-bg-secondary)" opacity="0.3" />
  <text x="20" y="20" font-size="12" fill="var(--color-text-secondary)">空气(n=1)</text>
  <rect x="0" y="100" width="300" height="100" fill="var(--color-primary)" opacity="0.1" />
  <text x="20" y="120" font-size="12" fill="var(--color-text-secondary)">水(n=1.33)</text>
  <path d="M80 60 L150 100" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#refArrow)" />
  <text x="100" y="75" font-size="10" fill="var(--color-text-secondary)">入射光线</text>
  <path d="M150 100 L220 130" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#refArrow)" />
  <text x="190" y="115" font-size="10" fill="var(--color-text-secondary)">折射光线</text>
  <circle cx="150" cy="100" r="5" fill="var(--color-primary)" />
  <text x="150" y="105" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">O</text>
  <text x="125" y="75" font-size="10" fill="var(--color-text-secondary)">θ₁</text>
  <text x="175" y="110" font-size="10" fill="var(--color-text-secondary)">θ₂</text>
  <path d="M150 100 L180 70" stroke="var(--color-text-secondary)" stroke-width="1.5" stroke-dasharray="3,2" marker-end="url(#refArrow)" />
  <text x="170" y="60" font-size="9" fill="var(--color-text-secondary)">反射光线</text>
  <defs>
    <marker id="refArrow" markerWidth="8" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-primary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：光从空气(n=1)射入水中(n=1.33)，入射角为45°，求折射角。

**解答**：

由斯涅尔定律：

$$ n_1\\sin\\theta_1 = n_2\\sin\\theta_2 $$

$$ 1 × \\sin45° = 1.33 × \\sin\\theta_2 $$

$$ \\sin\\theta_2 = \\frac{\\sin45°}{1.33} = \\frac{\\frac{\\sqrt{2}}{2}}{1.33} ≈ \\frac{0.707}{1.33} ≈ 0.531 $$

$$ \\theta_2 ≈ 32° $$

### 举一反三

**练习1**：光从水(n=1.33)射入空气(n=1)，求全反射的临界角。
- 答案：$\\sin C = \\frac{n_2}{n_1} = \\frac{1}{1.33} ≈ 0.752$，$C ≈ 48.8°$

**练习2**：光从光密介质射入光疏介质时，折射角和入射角的关系如何？
- 答案：折射角大于入射角。

### 拓展知识

- 全反射现象的条件：①光从光密介质射入光疏介质；②入射角大于等于临界角。
- 光导纤维是全反射现象的重要应用，可用于通信、医疗内窥镜等。
- 海市蜃楼是全反射现象的自然实例，由空气折射率随温度变化造成。
- 钻石的璀璨光芒正是利用了全反射原理，其临界角很小，光线在内部多次全反射后从切面射出。`;
export const PHYSICS_047 = `## 电磁波与相对论

### 核心概念

**电磁振荡**：电路中电荷和电流的周期性变化，能产生电磁波。

**电磁波**：交替变化的电场和磁场在空间传播形成的波，由麦克斯韦预言、赫兹实验证实。

**电磁波谱**：按频率从低到高排列为：无线电波、微波、红外线、可见光、紫外线、X射线、γ射线。

**狭义相对论基本假设**：①相对性原理——物理规律在所有惯性系中相同；②光速不变原理——真空中的光速对所有惯性参考系相同。

**时间膨胀**：在运动的参考系中，时间流逝变慢。

**长度收缩**：在运动方向上，物体长度变短。

**质能关系**：质量与能量之间存在当量关系。

### 公式总结

| 公式 | 说明 |
|------|------|
| $c = 3×10^8m/s$ | 真空光速 |
| $v = \\lambda f$ | 电磁波波速公式 |
| $\\Delta t = \\frac{\\Delta t_0}{\\sqrt{1 - \\frac{v^2}{c^2}}}$ | 时间膨胀公式 |
| $l = l_0\\sqrt{1 - \\frac{v^2}{c^2}}$ | 长度收缩公式 |
| $E = mc^2$ | 质能方程 |
| $m = \\frac{m_0}{\\sqrt{1 - \\frac{v^2}{c^2}}}$ | 质速关系 |

### 物理示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <rect x="20" y="80" width="260" height="30" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="150" y="73" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">电磁波谱</text>
  <rect x="20" y="80" width="37" height="30" fill="var(--color-primary)" opacity="0.6" />
  <text x="38" y="100" font-size="8" text-anchor="middle" fill="var(--color-text-primary)">无线电波</text>
  <rect x="57" y="80" width="37" height="30" fill="var(--color-primary)" opacity="0.5" />
  <text x="75" y="100" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">微波</text>
  <rect x="94" y="80" width="37" height="30" fill="var(--color-primary)" opacity="0.4" />
  <text x="112" y="100" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">红外</text>
  <rect x="131" y="80" width="37" height="30" fill="var(--color-primary)" opacity="0.3" />
  <text x="149" y="100" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">可见光</text>
  <rect x="168" y="80" width="37" height="30" fill="var(--color-primary)" opacity="0.4" />
  <text x="186" y="100" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">紫外</text>
  <rect x="205" y="80" width="37" height="30" fill="var(--color-primary)" opacity="0.5" />
  <text x="223" y="100" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">X射线</text>
  <rect x="242" y="80" width="38" height="30" fill="var(--color-primary)" opacity="0.6" />
  <text x="261" y="100" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">γ射线</text>
  <text x="25" y="128" font-size="9" fill="var(--color-text-secondary)">频率增大 →</text>
  <text x="275" y="148" font-size="9" text-anchor="end" fill="var(--color-text-secondary)">← 波长增大</text>
  <circle cx="100" cy="170" r="6" fill="var(--color-primary)" />
  <circle cx="200" cy="170" r="6" fill="none" stroke="var(--color-primary)" stroke-width="2" />
  <text x="100" y="190" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">静止时钟</text>
  <text x="200" y="190" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">运动时钟变慢</text>
</svg>

### 例题解析

**问题**：一飞船以$v = 0.6c$的速度飞行，飞船上的时钟记录了$\\Delta t_0 = 10s$，地面观察者测得的时间$\\Delta t$是多少？

**解答**：

$$ \\Delta t = \\frac{\\Delta t_0}{\\sqrt{1 - \\frac{v^2}{c^2}}} = \\frac{10}{\\sqrt{1 - 0.36}} = \\frac{10}{\\sqrt{0.64}} = \\frac{10}{0.8} = 12.5s $$

### 举一反三

**练习1**：一静止长度$l_0 = 10m$的飞船以$0.8c$的速度运动，地面观察者测得其长度是多少？
- 答案：$l = l_0\\sqrt{1 - \\frac{v^2}{c^2}} = 10×\\sqrt{1-0.64} = 10×0.6 = 6m$

**练习2**：电磁波在真空中传播，频率为$100MHz$，求其波长。
- 答案：$\\lambda = \\frac{c}{f} = \\frac{3×10^8}{100×10^6} = 3m$

### 拓展知识

- 麦克斯韦建立了电磁场理论，预言了电磁波的存在；赫兹用实验证实了电磁波。
- 红外线主要用于**热成像**和**遥控**；紫外线主要用于**杀菌消毒**和**防伪**。
- X射线具有较强的穿透能力，常用于**医学透视**和**安检**。
- γ射线穿透能力最强，用于**医学治疗（放疗）**和工业探伤。
- 爱因斯坦的狭义相对论改变了人们对时间和空间的认识。`;
export const PHYSICS_048 = `## 动量与动量守恒

### 核心概念

**动量**：物体的质量与速度的乘积，$p = mv$，方向与速度方向相同，是矢量，单位为$kg·m/s$。

**冲量**：力与作用时间的乘积，$I = Ft$，方向与力的方向相同，是矢量，单位为$N·s$。

**动量定理**：物体所受合外力的冲量等于其动量的变化量，即$Ft = \\Delta p = p_2 - p_1$。

**动量守恒定律**：一个系统不受外力或所受外力之和为零时，这个系统的总动量保持不变。

**弹性碰撞**：碰撞前后系统的总动能守恒的碰撞，动量和动能同时守恒。

**非弹性碰撞**：碰撞过程中系统动能损失的碰撞，动量守恒但动能不守恒。

**完全非弹性碰撞**：碰撞后两物体粘合在一起以相同速度运动的碰撞，动能损失最大。

### 公式总结

| 公式 | 说明 |
|------|------|
| $p = mv$ | 动量定义式 |
| $I = Ft$ | 冲量定义式 |
| $Ft = \\Delta p = mv_2 - mv_1$ | 动量定理 |
| $m_1v_1 + m_2v_2 = m_1v_1' + m_2v_2'$ | 动量守恒定律 |
| $\\frac{1}{2}m_1v_1^2 + \\frac{1}{2}m_2v_2^2 = \\frac{1}{2}m_1v_1'^2 + \\frac{1}{2}m_2v_2'^2$ | 弹性碰撞动能守恒 |

### 物理示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <line x1="20" y1="120" x2="280" y2="120" stroke="var(--color-border)" stroke-width="1" />
  <circle cx="70" cy="110" r="15" fill="var(--color-primary)" opacity="0.8" />
  <text x="70" y="115" font-size="11" text-anchor="middle" fill="var(--color-bg-secondary)">m1</text>
  <text x="70" y="145" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">v1</text>
  <path d="M90 110 L115 110" stroke="var(--color-primary)" stroke-width="2" />
  <path d="M108 106 L115 110 L108 114" fill="none" stroke="var(--color-primary)" stroke-width="2" />
  <circle cx="200" cy="110" r="12" fill="var(--color-primary)" opacity="0.5" />
  <text x="200" y="114" font-size="10" text-anchor="middle" fill="var(--color-bg-secondary)">m2</text>
  <text x="200" y="145" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">v2</text>
  <path d="M220 110 L245 110" stroke="var(--color-primary)" stroke-width="2" stroke-dasharray="3,2" />
  <path d="M238 106 L245 110 L238 114" fill="none" stroke="var(--color-primary)" stroke-width="2" />
  <text x="150" y="50" font-size="14" text-anchor="middle" fill="var(--color-text-primary)">两球碰撞过程</text>
  <text x="150" y="75" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">m1v1 + m2v2 = m1v1' + m2v2'</text>
  <text x="150" y="170" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">系统动量守恒</text>
</svg>

### 例题解析

**问题**：质量为$2kg$的小球以$3m/s$的速度与质量为$1kg$的静止小球发生正碰，碰后两球粘合在一起运动，求碰后共同速度及碰撞过程中损失的动能。

**解答**：

由动量守恒定律：

$$ m_1v_1 + m_2v_2 = (m_1 + m_2)v $$

$$ v = \\frac{m_1v_1}{m_1 + m_2} = \\frac{2 \\times 3}{2 + 1} = 2m/s $$

碰前总动能：

$$ E_{k1} = \\frac{1}{2}m_1v_1^2 = \\frac{1}{2} \\times 2 \\times 9 = 9J $$

碰后总动能：

$$ E_{k2} = \\frac{1}{2}(m_1 + m_2)v^2 = \\frac{1}{2} \\times 3 \\times 4 = 6J $$

损失动能：

$$ \\Delta E_k = 9 - 6 = 3J $$

### 举一反三

**练习1**：质量为$60kg$的人以$5m/s$的速度跳上质量为$40kg$的静止小车，求人车共同速度。
- 答案：$v = \\frac{60 \\times 5}{60 + 40} = 3m/s$

**练习2**：一个质量为$0.5kg$的球以$4m/s$速度撞墙后以$3m/s$速度反弹，求球受到的冲量大小（取反弹方向为正）。
- 答案：$I = \\Delta p = 0.5 \\times 3 - 0.5 \\times (-4) = 3.5N·s$

### 拓展知识

- 动量守恒定律是自然界最普遍的规律之一，比牛顿运动定律适用范围更广，在微观领域依然成立。
- 微观粒子间的相互作用也遵循动量守恒定律。
- 火箭的飞行原理是动量守恒定律的应用，通过向后喷出高速气体获得向前的推力。
- 碰撞过程中动量一定守恒，但动能不一定守恒，损失的动能转化为内能或其他形式能量。`;
export const PHYSICS_049 = `## 波粒二象性

### 核心概念

**光电效应**：金属在光的照射下发射电子的现象，发射的电子叫光电子，由赫兹首先发现。

**极限频率**：能使金属发生光电效应的入射光的最小频率$\\nu_0$，对应的最大波长$\\lambda_0 = c/\\nu_0$，与金属材料的逸出功有关。

**光子说**：光是一份一份地传播的，每一份叫光子，光子能量$E = h\\nu$，爱因斯坦提出。

**光电效应方程**：$h\\nu = E_k + W$，其中$W$为逸出功，$E_k$为光电子最大初动能。

**康普顿效应**：X射线通过物质散射后波长变长的现象，证实光子具有动量$p = h/\\lambda$。

**德布罗意波**：一切实物粒子都具有波粒二象性，其波长$\\lambda = h/p$，称为物质波。

**不确定性关系**：粒子的位置和动量不能同时确定，$\\Delta x \\Delta p \\geq \\frac{h}{4\\pi}$。

### 公式总结

| 公式 | 说明 |
|------|------|
| $E = h\\nu$ | 光子能量 |
| $p = \\frac{h}{\\lambda}$ | 光子动量 |
| $h\\nu = E_k + W$ | 光电效应方程 |
| $W = h\\nu_0$ | 逸出功与极限频率 |
| $E_k = eU_c$ | 光电子最大初动能与遏止电压 |
| $\\lambda = \\frac{h}{p}$ | 德布罗意波长 |
| $\\Delta x \\Delta p \\geq \\frac{h}{4\\pi}$ | 不确定性关系 |

### 物理示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <text x="150" y="22" font-size="13" text-anchor="middle" fill="var(--color-text-primary)">光电效应实验装置</text>
  <rect x="30" y="50" width="70" height="90" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" stroke-width="2" />
  <text x="65" y="100" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">金属板K</text>
  <line x1="155" y1="65" x2="105" y2="75" stroke="var(--color-primary)" stroke-width="2" stroke-dasharray="4,2" />
  <line x1="160" y1="85" x2="105" y2="90" stroke="var(--color-primary)" stroke-width="2" stroke-dasharray="4,2" />
  <line x1="155" y1="105" x2="105" y2="105" stroke="var(--color-primary)" stroke-width="2" stroke-dasharray="4,2" />
  <text x="180" y="85" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">入射光 ν</text>
  <circle cx="95" cy="130" r="4" fill="var(--color-primary)" />
  <path d="M95 130 L175 145" stroke="var(--color-primary)" stroke-width="1.5" />
  <path d="M168 141 L175 145 L168 149" fill="none" stroke="var(--color-primary)" stroke-width="1.5" />
  <text x="210" y="150" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">光电子</text>
  <rect x="215" y="50" width="60" height="90" fill="none" stroke="var(--color-border)" stroke-width="1.5" />
  <text x="245" y="100" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">接收极A</text>
  <line x1="95" y1="155" x2="245" y2="155" stroke="var(--color-text-secondary)" stroke-width="1" />
  <circle cx="150" cy="155" r="6" fill="none" stroke="var(--color-text-secondary)" stroke-width="1.5" />
  <text x="150" y="180" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">电流计G</text>
</svg>

### 例题解析

**问题**：已知某金属的极限频率为$\\nu_0 = 5.0 \\times 10^{14}Hz$，用波长为$\\lambda = 4 \\times 10^{-7}m$的光照射该金属，求光电子的最大初动能。（$h = 6.63 \\times 10^{-34}J·s$，$c = 3 \\times 10^8m/s$）

**解答**：

入射光频率：

$$ \\nu = \\frac{c}{\\lambda} = \\frac{3 \\times 10^8}{4 \\times 10^{-7}} = 7.5 \\times 10^{14}Hz $$

逸出功：

$$ W = h\\nu_0 = 6.63 \\times 10^{-34} \\times 5.0 \\times 10^{14} = 3.315 \\times 10^{-19}J $$

最大初动能：

$$ E_k = h\\nu - W = 6.63 \\times 10^{-34} \\times 7.5 \\times 10^{14} - 3.315 \\times 10^{-19} $$

$$ E_k = 4.97 \\times 10^{-19} - 3.315 \\times 10^{-19} = 1.66 \\times 10^{-19}J $$

### 举一反三

**练习1**：求动能为$100eV$的电子的德布罗意波长。（$h = 6.63 \\times 10^{-34}J·s$，$m_e = 9.1 \\times 10^{-31}kg$，$e = 1.6 \\times 10^{-19}C$）
- 答案：$\\lambda = \\frac{h}{\\sqrt{2mE_k}} \\approx 1.23 \\times 10^{-10}m$

**练习2**：某种金属产生光电效应的逸出功为$3.0 \\times 10^{-19}J$，求该金属的极限频率。
- 答案：$\\nu_0 = \\frac{W}{h} = \\frac{3.0 \\times 10^{-19}}{6.63 \\times 10^{-34}} \\approx 4.5 \\times 10^{14}Hz$

### 拓展知识

- 光电效应现象是爱因斯坦于1905年用光子说成功解释的，为此他获得了1921年诺贝尔物理学奖。
- 康普顿效应进一步证实了光的粒子性，证明光子不仅具有能量，还具有动量。
- 波粒二象性是微观粒子的普遍特性，物质波的概念由法国物理学家德布罗意于1924年提出。
- 电子的波动性通过电子衍射实验得到了验证，电子显微镜就是利用电子的物质波特性制成的。`;
export const PHYSICS_050 = `## 原子结构

### 核心概念

**电子的发现**：汤姆孙通过阴极射线实验发现了电子，测得电子的比荷$e/m$，证明电子是原子的组成部分。

**α粒子散射实验**：卢瑟福用α粒子轰击金箔，发现大多数粒子沿原方向前进，少数发生大角度偏转，极少数被反弹。

**核式结构模型**：原子中心有一个很小的原子核，集中了原子全部正电荷和几乎全部质量，电子在核外绕核运动。

**玻尔模型三条假设**：电子只能在一系列不连续的轨道上运动（轨道量子化）；电子在定态轨道上运动不辐射能量；电子跃迁时辐射或吸收光子，光子能量$h\\nu = E_m - E_n$。

**氢原子光谱**：氢原子光谱是线状光谱，包括赖曼系（紫外区）、巴尔末系（可见光区）、帕邢系（红外区）等。

### 公式总结

| 公式 | 说明 |
|------|------|
| $r_n = n^2r_1$ | 氢原子轨道半径（$r_1 = 0.53 \\times 10^{-10}m$） |
| $E_n = \\frac{E_1}{n^2}$ | 氢原子能级（$E_1 = -13.6eV$） |
| $h\\nu = E_m - E_n$ | 跃迁时辐射或吸收的光子能量 |
| $\\frac{1}{\\lambda} = R(\\frac{1}{n_1^2} - \\frac{1}{n_2^2})$ | 里德伯公式（$R = 1.1 \\times 10^7m^{-1}$） |
| $N = \\frac{n(n-1)}{2}$ | 大量氢原子从n能级跃迁可能的光谱线数 |

### 物理示意图

<svg width="300" height="220" viewBox="0 0 300 220">
  <text x="150" y="20" font-size="13" text-anchor="middle" fill="var(--color-text-primary)">玻尔氢原子模型</text>
  <circle cx="150" cy="115" r="6" fill="var(--color-primary)" />
  <text x="150" y="119" font-size="9" text-anchor="middle" fill="var(--color-bg-secondary)">核</text>
  <circle cx="150" cy="115" r="40" fill="none" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="3,2" />
  <circle cx="150" cy="115" r="70" fill="none" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="3,2" />
  <circle cx="150" cy="115" r="100" fill="none" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="3,2" />
  <circle cx="190" cy="115" r="4" fill="var(--color-primary)" opacity="0.9" />
  <text x="205" y="118" font-size="9" fill="var(--color-text-primary)">n=1</text>
  <circle cx="220" cy="115" r="4" fill="var(--color-primary)" opacity="0.7" />
  <text x="235" y="118" font-size="9" fill="var(--color-text-primary)">n=2</text>
  <circle cx="250" cy="115" r="4" fill="var(--color-primary)" opacity="0.5" />
  <text x="265" y="118" font-size="9" fill="var(--color-text-primary)">n=3</text>
  <path d="M220 115 L194 115" stroke="var(--color-primary)" stroke-width="1.5" stroke-dasharray="2,2" />
  <path d="M200 111 L194 115 L200 119" fill="none" stroke="var(--color-primary)" stroke-width="1.5" />
  <text x="207" y="105" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">跃迁</text>
  <path d="M250 115 L194 115" stroke="var(--color-primary)" stroke-width="1" stroke-dasharray="2,2" opacity="0.5" />
  <path d="M205 108 L194 115 L205 122" fill="none" stroke="var(--color-primary)" stroke-width="1" opacity="0.5" />
  <text x="150" y="195" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">E3 > E2 > E1</text>
  <text x="150" y="212" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">轨道量子化与能级</text>
</svg>

### 例题解析

**问题**：氢原子从$n = 3$能级跃迁到$n = 1$能级时，辐射的光子频率是多少？（$E_1 = -13.6eV$，$h = 6.63 \\times 10^{-34}J·s$，$1eV = 1.6 \\times 10^{-19}J$）

**解答**：

$n = 3$能级能量：

$$ E_3 = \\frac{E_1}{9} = \\frac{-13.6}{9} \\approx -1.51eV $$

辐射光子能量：

$$ h\\nu = E_3 - E_1 = -1.51 - (-13.6) = 12.09eV $$

$$ \\nu = \\frac{12.09 \\times 1.6 \\times 10^{-19}}{6.63 \\times 10^{-34}} = \\frac{1.934 \\times 10^{-18}}{6.63 \\times 10^{-34}} \\approx 2.92 \\times 10^{15}Hz $$

### 举一反三

**练习1**：大量氢原子处于$n = 4$激发态，可能辐射出几种不同频率的光子？
- 答案：$N = \\frac{n(n-1)}{2} = \\frac{4 \\times 3}{2} = 6$种

**练习2**：大量氢原子从$n = 4$能级跃迁到低能级，求辐射光子的最大能量。
- 答案：最大能量对应$n=4$到$n=1$，$E_4 = \\frac{-13.6}{16} = -0.85eV$，$E = E_4 - E_1 = -0.85 - (-13.6) = 12.75eV$

### 拓展知识

- 玻尔的原子模型成功地解释了氢原子光谱，但无法解释复杂原子的光谱和谱线的精细结构。
- α粒子散射实验是卢瑟福于1909年完成的，这是原子核式结构模型的实验基础。
- 巴尔末系是氢原子光谱在可见光区域的谱线系，由巴尔末于1885年首先发现其规律。
- 玻尔模型引入了量子化的概念，是量子力学发展的重要里程碑，但已被更完善的量子力学理论所取代。`;
export const PHYSICS_051 = `## 原子核

### 核心概念

**天然放射现象**：某些元素自发地放出射线的现象，由贝克勒尔于1896年发现。

**α射线**：高速氦核流（$^4_2He$），电离能力强，穿透能力弱，用一张纸即可挡住。

**β射线**：高速电子流（$^0_{-1}e$），电离能力较弱，穿透能力较强，需几毫米铝板阻挡。

**γ射线**：波长极短的电磁波，电离能力最弱，穿透能力最强，需几厘米铅板阻挡。

**原子核的组成**：原子核由质子和中子组成，质子数$Z$，中子数$N$，质量数$A = Z + N$。

**半衰期**：放射性元素的原子核有半数发生衰变所需的时间，用$T$表示，与外界条件无关。

**核力**：原子核内质子与质子、质子与中子、中子与中子之间的强相互作用力，是短程力。

**结合能**：核子结合成原子核时释放的能量，质量亏损$\\Delta m$与结合能$\\Delta E = \\Delta m c^2$对应。

**核裂变**：重核分裂成中等质量核的反应，如$^{235}U + n \\rightarrow ^{141}Ba + ^{92}Kr + 3n$。

**核聚变**：轻核结合成质量较大的核的反应，如$^2H + ^3H \\rightarrow ^4He + n$。

### 公式总结

| 公式 | 说明 |
|------|------|
| $^A_ZX \\rightarrow ^{A-4}_{Z-2}Y + ^4_2He$ | α衰变方程 |
| $^A_ZX \\rightarrow ^A_{Z+1}Y + ^0_{-1}e$ | β衰变方程 |
| $N = N_0(\\frac{1}{2})^{t/T}$ | 半衰期公式 |
| $E = mc^2$ | 爱因斯坦质能方程 |
| $\\Delta E = \\Delta m c^2$ | 质量亏损与结合能 |

### 物理示意图

<svg width="300" height="220" viewBox="0 0 300 220">
  <text x="150" y="22" font-size="13" text-anchor="middle" fill="var(--color-text-primary)">核裂变示意图</text>
  <circle cx="90" cy="85" r="32" fill="var(--color-primary)" opacity="0.15" stroke="var(--color-primary)" stroke-width="2" />
  <circle cx="82" cy="78" r="5" fill="var(--color-primary)" />
  <circle cx="98" cy="80" r="5" fill="var(--color-primary)" opacity="0.7" />
  <circle cx="90" cy="92" r="5" fill="var(--color-primary)" opacity="0.5" />
  <circle cx="102" cy="95" r="4" fill="var(--color-primary)" opacity="0.8" />
  <text x="90" y="140" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">铀235核</text>
  <circle cx="90" cy="50" r="3" fill="var(--color-primary)" />
  <path d="M90 50 L90 38" stroke="var(--color-primary)" stroke-width="1.5" />
  <path d="M86 44 L90 38 L94 44" fill="none" stroke="var(--color-primary)" stroke-width="1.5" />
  <text x="115" y="48" font-size="9" fill="var(--color-text-secondary)">中子</text>
  <path d="M122 80 L170 60" stroke="var(--color-primary)" stroke-width="1.5" stroke-dasharray="3,2" />
  <path d="M122 90 L170 110" stroke="var(--color-primary)" stroke-width="1.5" stroke-dasharray="3,2" />
  <circle cx="195" cy="55" r="18" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" stroke-width="1.5" />
  <text x="195" y="60" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">Ba141</text>
  <circle cx="195" cy="115" r="16" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" stroke-width="1.5" />
  <text x="195" y="120" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">Kr92</text>
  <circle cx="245" cy="40" r="3" fill="var(--color-primary)" />
  <circle cx="252" cy="55" r="3" fill="var(--color-primary)" />
  <circle cx="258" cy="70" r="3" fill="var(--color-primary)" />
  <text x="272" y="55" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">3n</text>
  <text x="150" y="180" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">链式反应</text>
  <text x="150" y="200" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">U + n → Ba + Kr + 3n + 能量</text>
</svg>

### 例题解析

**问题**：$^{238}_{92}U$经过几次α衰变和几次β衰变后变成$^{206}_{82}Pb$？

**解答**：

设经过$x$次α衰变和$y$次β衰变。

质量数守恒：$238 - 4x = 206$，解得$x = 8$

电荷数守恒：$92 - 2x + y = 82$

$$ 92 - 2 \\times 8 + y = 82 $$

$$ 92 - 16 + y = 82 $$

$$ y = 6 $$

所以经过$8$次α衰变和$6$次β衰变。

### 举一反三

**练习1**：某放射性元素经过$3$个半衰期后，剩余的原子核数是原来的多少？
- 答案：$N = N_0(\\frac{1}{2})^3 = \\frac{1}{8}N_0$

**练习2**：已知氘核的质量为$2.0141u$，质子质量为$1.0073u$，中子质量为$1.0087u$，求氘核的结合能。（$1u = 931.5MeV/c^2$）
- 答案：$\\Delta m = 1.0073 + 1.0087 - 2.0141 = 0.0019u$，$\\Delta E = 0.0019 \\times 931.5 \\approx 1.77MeV$

### 拓展知识

- 天然放射现象由法国物理学家贝克勒尔于1896年发现，居里夫妇随后发现了钋和镭。
- 半衰期是放射性元素的固有属性，与外界条件（温度、压强、化学状态等）无关。
- 核电站利用的是可控核裂变，太阳释放的能量来自轻核聚变。
- 氢弹是不可控核聚变装置，原子弹是不可控核裂变装置。
- 比结合能越大的原子核越稳定，中等质量核（如铁附近）的比结合能最大。`;
export const PHYSICS_052 = `## 机械能与动量综合

### 核心概念

**动能定理**：合外力对物体所做的功等于物体动能的变化量，$W_{合} = \\Delta E_k$，适用于直线运动、曲线运动、恒力和变力做功。

**机械能守恒定律**：只有重力（或弹簧弹力）做功时，物体的动能和势能相互转化，机械能总量保持不变。

**功能关系**：功是能量转化的量度，不同性质的力做功对应不同形式能量的转化。

**重力做功与重力势能**：重力做正功，重力势能减小，$W_G = -\\Delta E_p = mg\\Delta h$。

**摩擦力做功与内能**：滑动摩擦力做功使机械能转化为内能，$Q = f_{滑} \\cdot s_{相对}$，其中$s_{相对}$为两物体间的相对路程。

**动量与能量的综合分析**：碰撞、弹簧连接、滑块问题中常需同时使用动量守恒和能量守恒进行分析。

### 公式总结

| 公式 | 说明 |
|------|------|
| $W_{合} = \\frac{1}{2}mv_2^2 - \\frac{1}{2}mv_1^2$ | 动能定理 |
| $E_k + E_p = E_k' + E_p'$ | 机械能守恒定律 |
| $W_G = -\\Delta E_p$ | 重力做功与势能变化 |
| $Q = f_{滑}s_{相对}$ | 摩擦生热 |
| $m_1v_1 + m_2v_2 = m_1v_1' + m_2v_2'$ | 动量守恒定律 |
| $\\Delta E_k = W_{合}$ | 动能变化与合外力做功 |

### 物理示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <text x="150" y="25" font-size="13" text-anchor="middle" fill="var(--color-text-primary)">弹簧连接系统</text>
  <line x1="20" y1="160" x2="280" y2="160" stroke="var(--color-border)" stroke-width="1.5" />
  <line x1="20" y1="50" x2="20" y2="160" stroke="var(--color-border)" stroke-width="1.5" />
  <rect x="35" y="115" width="40" height="40" fill="var(--color-primary)" opacity="0.6" stroke="var(--color-primary)" stroke-width="1.5" />
  <text x="55" y="140" font-size="11" text-anchor="middle" fill="var(--color-bg-secondary)">m1</text>
  <path d="M80 130 L120 130" stroke="var(--color-primary)" stroke-width="2" />
  <path d="M112 126 L120 130 L112 134" fill="none" stroke="var(--color-primary)" stroke-width="2" />
  <text x="100" y="120" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">v1</text>
  <path d="M125 115 q5 -8 10 0 q5 8 10 0 q5 -8 10 0 q5 8 10 0 q5 -8 10 0" fill="none" stroke="var(--color-primary)" stroke-width="1.5" />
  <rect x="200" y="115" width="40" height="40" fill="var(--color-primary)" opacity="0.4" stroke="var(--color-primary)" stroke-width="1.5" />
  <text x="220" y="140" font-size="11" text-anchor="middle" fill="var(--color-bg-secondary)">m2</text>
  <text x="155" y="105" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">弹簧</text>
  <text x="150" y="180" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">动量守恒 + 机械能守恒</text>
</svg>

### 例题解析

**问题**：质量为$2kg$的滑块以$6m/s$速度滑上光滑的1/4圆弧轨道（半径$R = 1.8m$），$g = 10m/s^2$，求滑块到达的最大高度。

**解答**：

光滑圆弧轨道机械能守恒，设最大高度为$h$。

初态取圆弧底端为零势能面：

$$ \\frac{1}{2}mv_0^2 = mgh $$

$$ h = \\frac{v_0^2}{2g} = \\frac{36}{20} = 1.8m $$

滑块恰好到达圆弧顶端（$h = R$）。

### 举一反三

**练习1**：质量为$m$的物体从高$h$处自由下落，落地时速度为$v$，若空气阻力恒为$f$，求物体下落过程中克服阻力做的功。
- 答案：由动能定理$mgh - W_f = \\frac{1}{2}mv^2$，故$W_f = mgh - \\frac{1}{2}mv^2$

**练习2**：质量为$1kg$的木块静止在光滑水平面上，质量为$10g$的子弹以$400m/s$速度水平射入木块并留在其中，求子弹与木块共同速度及系统损失的机械能。
- 答案：$v = \\frac{0.01 \\times 400}{1 + 0.01} \\approx 3.96m/s$，$\\Delta E = \\frac{1}{2} \\times 0.01 \\times 400^2 - \\frac{1}{2} \\times 1.01 \\times 3.96^2 \\approx 800 - 7.92 = 792J$

### 拓展知识

- 动能定理适用于所有过程，包括变力做功和非直线运动，是一种非常通用的解题方法。
- 系统内力做功会改变系统的总动能，但不改变系统的总动量。
- 在光滑水平面上，弹簧连接的两个物体总动量守恒、机械能也守恒，弹簧弹性势能与动能相互转化。
- "传送带模型"和"板块模型"是动量与能量综合的典型问题，关键是分析相对位移和摩擦生热。
- 子弹打木块问题中，系统动量守恒但机械能不守恒，损失的机械能转化为内能。`;
export const PHYSICS_053 = `## 电磁振荡

### 核心概念

**电磁振荡**：在LC电路中，电场能和磁场能周期性相互转化的现象。

**LC振荡电路**：由电感L和电容C组成的电路。

**振荡周期**：完成一次全振荡所需的时间。

**振荡频率**：单位时间内完成的全振荡次数。

**电场能**：储存在电容器电场中的能量。

**磁场能**：储存在电感器磁场中的能量。

### 公式总结

| 公式 | 说明 |
|------|------|
| $T = 2\\pi\\sqrt{LC}$ | LC振荡电路周期 |
| $f = \\frac{1}{2\\pi\\sqrt{LC}}$ | LC振荡电路频率 |
| $W_e = \\frac{1}{2}CU^2$ | 电场能 |
| $W_m = \\frac{1}{2}LI^2$ | 磁场能 |

### 物理示意图

<svg width="300" height="150" viewBox="0 0 300 150">
  <rect x="50" y="50" width="40" height="60" fill="none" stroke="var(--color-primary)" stroke-width="2" />
  <line x1="90" y1="80" x2="130" y2="80" stroke="var(--color-primary)" stroke-width="2" />
  <circle cx="150" cy="80" r="20" fill="none" stroke="var(--color-primary)" stroke-width="2" />
  <line x1="170" y1="80" x2="210" y2="80" stroke="var(--color-primary)" stroke-width="2" />
  <rect x="210" y="50" width="40" height="60" fill="none" stroke="var(--color-primary)" stroke-width="2" />
  <text x="150" y="140" font-size="12" text-anchor="middle" fill="var(--color-text-secondary)">LC振荡电路</text>
</svg>

### 例题解析

**问题**：LC振荡电路中，电感L = 1mH，电容C = 1μF，求振荡周期和频率。

**解答**：

$$ T = 2\\pi\\sqrt{LC} = 2\\pi\\sqrt{1 \\times 10^{-3} \\times 1 \\times 10^{-6}} = 2\\pi\\sqrt{10^{-9}} = 2\\pi \\times 10^{-4.5} \\approx 6.28 \\times 3.16 \\times 10^{-5} \\approx 2 \\times 10^{-4}s $$

$$ f = \\frac{1}{T} \\approx 5000Hz = 5kHz $$

### 举一反三

**练习1**：LC振荡电路中，电容增大为原来的4倍，振荡频率如何变化？
- 答案：频率变为原来的1/2。

**练习2**：LC振荡电路中，电场能最大时，电流是多大？
- 答案：电场能最大时，电流为零。

### 拓展知识

- LC振荡电路是电磁波发射的基础。
- 振荡过程中，电场能和磁场能相互转化，总能量守恒。
- 实际振荡电路中存在电阻，会产生阻尼振荡。`;
