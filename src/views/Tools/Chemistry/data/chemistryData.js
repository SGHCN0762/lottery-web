export const chemistryKnowledgePoints = [
  {
    id: 'chem_001',
    title: '物质的变化和性质',
    stage: 'middle',
    chapter: '走进化学世界',
    tags: ['物理变化', '化学变化', '物理性质', '化学性质'],
    content: `## 物质的变化和性质

### 核心概念

**物理变化**：没有生成其他物质的变化，如水的蒸发、纸张撕碎、金属导电等。

**化学变化**：生成其他物质的变化，又叫化学反应。常伴随发光、放热、变色、产生气体、生成沉淀等现象。

**物理性质**：物质不需要发生化学变化就表现出来的性质，如颜色、状态、气味、密度、硬度、熔点、沸点、溶解性、延展性等。

**化学性质**：物质在化学变化中表现出来的性质，如可燃性、氧化性、还原性、酸碱性、稳定性等。

### 化学方程式或公式总结

| 类别 | 特征 | 实例 |
|------|------|------|
| 物理变化 | 无新物质生成 | 水结冰、酒精挥发、金属导电 |
| 化学变化 | 有新物质生成 | 镁条燃烧、铁生锈、蜡烛燃烧 |
| 物理性质 | 不需化学变化表现 | 颜色、气味、密度、熔沸点 |
| 化学性质 | 化学变化中表现 | 可燃性、氧化性、还原性 |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="20" y="20" width="120" height="60" rx="6" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="80" y="45" font-size="13" text-anchor="middle" fill="var(--color-text-primary)">物理变化</text>
  <text x="80" y="65" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">无新物质生成</text>
  <rect x="160" y="20" width="120" height="60" rx="6" fill="var(--color-bg-secondary)" stroke="var(--color-primary)" stroke-width="2" />
  <text x="220" y="45" font-size="13" text-anchor="middle" fill="var(--color-text-primary)">化学变化</text>
  <text x="220" y="65" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">有新物质生成</text>
  <line x1="140" y1="50" x2="160" y2="50" stroke="var(--color-primary)" stroke-width="2" />
  <polygon points="160,50 155,47 155,53" fill="var(--color-primary)" />
  <rect x="20" y="110" width="260" height="50" rx="6" fill="none" stroke="var(--color-border)" stroke-dasharray="4,3" />
  <text x="150" y="133" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">判断依据：是否有新物质生成</text>
  <text x="150" y="151" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">现象：发光、放热、变色、产生气体、沉淀</text>
</svg>

### 例题解析

**问题**：下列变化中，属于化学变化的是（ ）
A. 冰雪融化  B. 汽油挥发  C. 镁条燃烧  D. 瓷碗破碎

**解答**：

化学变化的本质特征是有新物质生成。

- A. 冰雪融化是状态变化，无新物质生成，物理变化
- B. 汽油挥发是状态变化，物理变化
- C. 镁条燃烧生成氧化镁，有新物质生成，**化学变化**，反应方程式 $2Mg + O_2 \\stackrel{点燃}{=} 2MgO$
- D. 瓷碗破碎是形状变化，物理变化

答案：**C**

### 举一反三

**练习1**：下列性质中，属于物质的化学性质的是（ ）
A. 颜色  B. 气味  C. 可燃性  D. 密度

- 答案：C。可燃性是物质在化学变化（燃烧）中表现出的性质，属于化学性质。

**练习2**：判断：蜡烛燃烧过程中只发生化学变化。

- 答案：错误。蜡烛燃烧时，蜡烛受热熔化是物理变化，燃烧生成水和二氧化碳是化学变化，两个变化同时发生。

### 拓展知识

- 物理变化和化学变化的本质区别是**是否生成新物质**。
- 化学变化中一定同时发生物理变化，但物理变化中不一定发生化学变化。
- 发光、放热等现象可以帮助判断化学变化，但不是判断依据，如灯泡通电发光是物理变化。
- 物质的性质决定其用途，用途反映其性质。`
  },
  {
    id: 'chem_002',
    title: '化学实验基础',
    stage: 'middle',
    chapter: '走进化学世界',
    tags: ['常用仪器', '基本操作', '安全注意事项'],
    content: `## 化学实验基础

### 核心概念

**试管**：用于少量物质反应的容器，可直接加热。

**烧杯**：用于配制溶液和较大量物质反应的容器，加热需垫石棉网。

**酒精灯**：常用的加热仪器，火焰分为外焰、内焰、焰心，**外焰温度最高**。

**量筒**：用于量取液体体积，不能加热，不能作反应容器。

**托盘天平**：称量物质质量，左物右码，精确到0.1g。

**取用药品原则**：三不原则（不用手接触、不用鼻闻、不用口尝）；节约原则（液体1-2mL，固体盖满试管底部）。

### 化学方程式或公式总结

| 仪器 | 主要用途 | 注意事项 |
|------|---------|---------|
| 试管 | 少量物质反应 | 加热液体不超过1/3，预热 |
| 烧杯 | 配制溶液、反应 | 加热需垫石棉网 |
| 酒精灯 | 加热 | 外焰加热，酒精量1/4~2/3 |
| 量筒 | 量取液体 | 不能加热，读数平视凹液面 |
| 托盘天平 | 称量质量 | 左物右码，精确到0.1g |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="20" y="130" width="60" height="30" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <rect x="35" y="60" width="30" height="70" fill="none" stroke="var(--color-primary)" stroke-width="2" />
  <ellipse cx="50" cy="60" rx="15" ry="4" fill="none" stroke="var(--color-primary)" stroke-width="2" />
  <text x="50" y="170" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">试管</text>
  <rect x="110" y="100" width="70" height="50" rx="4" fill="none" stroke="var(--color-primary)" stroke-width="2" />
  <line x1="125" y1="100" x2="125" y2="90" stroke="var(--color-primary)" stroke-width="2" />
  <line x1="165" y1="100" x2="165" y2="90" stroke="var(--color-primary)" stroke-width="2" />
  <text x="145" y="170" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">烧杯</text>
  <path d="M210 60 L210 120 L200 130 L220 130 L210 120" fill="var(--color-primary)" opacity="0.6" />
  <path d="M200 60 L220 60" stroke="var(--color-text-primary)" stroke-width="2" />
  <ellipse cx="210" cy="55" rx="10" ry="3" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="210" y="170" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">酒精灯</text>
</svg>

### 例题解析

**问题**：用量筒量取液体时，视线应如何放置？若仰视读数，量得的液体实际体积比读数大还是小？

**解答**：

量筒读数时视线应与凹液面最低处保持水平。

- 仰视读数：视线偏低，读数比实际体积**小**，即实际液体体积比读数**大**
- 俯视读数：视线偏高，读数比实际体积**大**，即实际液体体积比读数**小**

量取一定体积液体时，仰视导致取液偏多，俯视导致取液偏少。

### 举一反三

**练习1**：下列实验操作正确的是（ ）
A. 用嘴吹灭酒精灯  B. 加热试管中液体时管口对人  C. 取用粉末药品用药匙  D. 将固体直接放在天平左盘

- 答案：C。A应用灯帽盖灭；B管口不能对人；D应垫称量纸。

**练习2**：用托盘天平称量5.3g食盐时，发现指针偏向左盘，应如何操作？

- 答案：指针偏向左盘说明左盘重（药品多了），应减少药品直至天平平衡。

### 拓展知识

- 酒精灯的火焰中**外焰温度最高**，因为外焰与空气接触充分，燃烧完全。
- 加热试管中的液体时，液体体积不超过试管容积的1/3，试管口不能对着人。
- 玻璃仪器洗净的标准：内壁附着的水既不聚成水滴，也不成股流下。
- 实验剩余药品不能放回原瓶，不能丢弃，应放入指定容器。`
  },
  {
    id: 'chem_003',
    title: '空气',
    stage: 'middle',
    chapter: '我们周围的空气',
    tags: ['空气成分', '测定氧气含量', '氮气', '稀有气体'],
    content: `## 空气

### 核心概念

**空气的成分**（按体积分数计算）：氮气 $N_2$ 约78%，氧气 $O_2$ 约21%，稀有气体约0.94%，二氧化碳 $CO_2$ 约0.03%，其他气体和杂质约0.03%。

**测定氧气含量实验**：利用红磷在密闭容器中燃烧消耗氧气，生成固体五氧化二磷，使容器内压强减小，水进入容器约1/5体积，从而测定空气中氧气含量。

**实验现象**：红磷燃烧产生大量白烟；冷却后打开止水夹，水沿导管进入集气瓶，进入水的体积约占集气瓶容积的1/5。

**实验结论**：氧气约占空气体积的1/5。

### 化学方程式或公式总结

| 物质 | 化学式 | 体积分数 | 性质 |
|------|--------|---------|------|
| 氮气 | $N_2$ | 78% | 不活泼，难溶于水 |
| 氧气 | $O_2$ | 21% | 支持燃烧，供呼吸 |
| 稀有气体 | - | 0.94% | 极不活泼 |
| 二氧化碳 | $CO_2$ | 0.03% | 不支持燃烧 |
| 红磷燃烧 | $4P + 5O_2 \\stackrel{点燃}{=} 2P_2O_5$ | - | 产生白烟 |

### 实验示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <rect x="100" y="20" width="100" height="80" rx="4" fill="var(--color-bg-secondary)" stroke="var(--color-primary)" stroke-width="2" />
  <rect x="100" y="20" width="100" height="60" fill="none" stroke="var(--color-border)" stroke-dasharray="3,2" />
  <text x="150" y="50" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">空气</text>
  <circle cx="120" cy="40" r="3" fill="var(--color-primary)" opacity="0.5" />
  <circle cx="140" cy="55" r="3" fill="var(--color-primary)" opacity="0.5" />
  <circle cx="160" cy="45" r="3" fill="var(--color-primary)" opacity="0.5" />
  <circle cx="175" cy="60" r="3" fill="var(--color-primary)" opacity="0.5" />
  <path d="M130 70 Q150 65 170 70" stroke="var(--color-primary)" stroke-width="2" fill="none" />
  <text x="150" y="85" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">红磷燃烧(白烟)</text>
  <path d="M100 100 L60 100 L60 160 L240 160 L240 100 L200 100" fill="none" stroke="var(--color-text-primary)" stroke-width="2" />
  <rect x="55" y="155" width="190" height="10" fill="var(--color-primary)" opacity="0.3" />
  <text x="265" y="160" font-size="10" fill="var(--color-text-secondary)">水</text>
  <polygon points="60,130 56,125 56,135" fill="var(--color-primary)" />
  <text x="40" y="135" font-size="10" fill="var(--color-text-secondary)">进水</text>
  <text x="150" y="185" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">进入水约占容积1/5</text>
</svg>

### 例题解析

**问题**：在做"测定空气中氧气含量"实验时，若测得结果偏小（进入水不足1/5），可能的原因有哪些？

**解答**：

可能的原因有：

1. **红磷量不足**：容器内氧气未完全反应，消耗氧气偏少
2. **装置漏气**：外界空气进入容器，压强减小不明显
3. **未冷却到室温就打开止水夹**：气体受热膨胀，压强偏大，进入水量减少

反应方程式：$4P + 5O_2 \\stackrel{点燃}{=} 2P_2O_5$，红磷燃烧生成固体五氧化二磷，使瓶内气体减少，压强降低。

### 举一反三

**练习1**：下列物质不能用来测定空气中氧气含量的是（ ）
A. 红磷  B. 木炭  C. 白磷  D. 镁条

- 答案：B。木炭燃烧生成二氧化碳气体，瓶内压强变化不明显。

**练习2**：空气成分中，体积分数最大的是（ ）
A. 氧气  B. 氮气  C. 二氧化碳  D. 稀有气体

- 答案：B。氮气约占空气体积的78%。

### 拓展知识

- 稀有气体（氦、氖、氩、氪、氙等）化学性质极不活泼，又称惰性气体，常用作保护气。
- 氮气性质不活泼，常用作食品包装的保护气、灯泡填充气、制硝酸和氮肥的原料。
- 空气是一种宝贵的资源，工业上通过分离液态空气制取氧气和氮气，属于物理变化。
- 测定氧气含量实验不能用木炭、硫等，因为它们燃烧生成气体，压强变化不明显。`
  },
  {
    id: 'chem_004',
    title: '氧气',
    stage: 'middle',
    chapter: '我们周围的空气',
    tags: ['氧气性质', '氧气用途', '氧化反应'],
    content: `## 氧气

### 核心概念

**氧气的物理性质**：通常情况下，氧气是无色、无味的气体，不易溶于水，密度比空气略大。

**氧气的化学性质**：氧气是一种化学性质比较活泼的气体，在一定的条件下能与许多物质发生化学反应，同时放出热量。氧气具有**氧化性**，是常用的氧化剂。

**支持燃烧**：氧气能支持燃烧，是燃烧的必要条件之一。

**供呼吸**：氧气是生物体呼吸不可缺少的气体。

**氧化反应**：物质与氧发生的化学反应叫氧化反应。

### 化学方程式或公式总结

| 反应物 | 化学方程式 | 现象 |
|--------|-----------|------|
| 碳 + 氧气 | $C + O_2 \\stackrel{点燃}{=} CO_2$ | 发白光，放热 |
| 硫 + 氧气 | $S + O_2 \\stackrel{点燃}{=} SO_2$ | 明亮蓝紫色火焰 |
| 磷 + 氧气 | $4P + 5O_2 \\stackrel{点燃}{=} 2P_2O_5$ | 产生大量白烟 |
| 铁 + 氧气 | $3Fe + 2O_2 \\stackrel{点燃}{=} Fe_3O_4$ | 剧烈燃烧，火星四射 |
| 镁 + 氧气 | $2Mg + O_2 \\stackrel{点燃}{=} 2MgO$ | 发耀眼白光 |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="100" y="20" width="100" height="110" rx="6" fill="var(--color-bg-secondary)" stroke="var(--color-primary)" stroke-width="2" />
  <rect x="100" y="90" width="100" height="40" fill="var(--color-primary)" opacity="0.2" />
  <text x="150" y="80" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">氧气 $O_2$</text>
  <line x1="150" y1="100" x2="150" y2="130" stroke="var(--color-text-primary)" stroke-width="2" />
  <path d="M145 100 L155 100 L150 90 Z" fill="var(--color-text-primary)" />
  <circle cx="150" cy="140" r="6" fill="var(--color-primary)" />
  <path d="M150 140 L145 130 M150 140 L155 130 M150 140 L142 145 M150 140 L158 145" stroke="var(--color-primary)" stroke-width="1.5" />
  <text x="150" y="160" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">带火星木条复燃</text>
  <text x="40" y="70" font-size="10" fill="var(--color-text-secondary)">检验：将带火星</text>
  <text x="40" y="85" font-size="10" fill="var(--color-text-secondary)">木条伸入瓶中</text>
  <line x1="90" y1="80" x2="100" y2="80" stroke="var(--color-text-primary)" stroke-width="1" stroke-dasharray="2,2" />
</svg>

### 例题解析

**问题**：铁丝在氧气中燃烧的实验中，为什么要在集气瓶底部预先装入少量水或铺一层细沙？

**解答**：

铁丝在氧气中燃烧的化学方程式为 $3Fe + 2O_2 \\stackrel{点燃}{=} Fe_3O_4$。

反应现象：铁丝剧烈燃烧，火星四射，生成黑色固体。

预先装入水或细沙的原因：燃烧时生成的四氧化三铁温度很高，熔化后溅落下来会炸裂瓶底，水或细沙可以**防止溅落物炸裂瓶底**。

实验时铁丝要绕成螺旋状、系一根火柴梗引燃、伸入氧气瓶要缓慢，目的都是使铁丝充分受热燃烧。

### 举一反三

**练习1**：下列关于氧气性质的叙述，错误的是（ ）
A. 氧气是无色无味气体  B. 氧气易溶于水  C. 氧气密度比空气略大  D. 氧气有氧化性

- 答案：B。氧气**不易溶于水**。

**练习2**：检验一瓶气体是否是氧气，采用的方法是（ ）
A. 闻气味  B. 用燃着的木条伸入瓶中  C. 用带火星的木条伸入瓶中  D. 观察颜色

- 答案：C。带火星的木条伸入氧气中会**复燃**，这是检验氧气的标准方法。

### 拓展知识

- 缓慢氧化：氧化反应进行得很慢，不易察觉，如动植物呼吸、食物腐败、钢铁生锈等。
- 自燃：由缓慢氧化引起的自发燃烧，如白磷在空气中自燃（着火点40℃）。
- 燃烧、缓慢氧化、自燃的共同点是都是氧化反应，都放热；区别是反应剧烈程度不同。
- 氧气的用途：医疗急救、潜水、登山、炼钢、气焊气割等。`
  },
  {
    id: 'chem_005',
    title: '制取氧气',
    stage: 'middle',
    chapter: '我们周围的空气',
    tags: ['制取氧气', '催化剂', '分解反应', '高锰酸钾'],
    content: `## 制取氧气

### 核心概念

**实验室制取氧气的方法**：

1. 加热高锰酸钾（$KMnO_4$）：紫黑色固体，加热分解
2. 加热氯酸钾（$KClO_3$）：白色固体，需加二氧化锰作催化剂
3. 分解过氧化氢（$H_2O_2$）：无色液体，加二氧化锰作催化剂

**催化剂**：在化学反应里能改变其他物质的化学反应速率，而本身的质量和化学性质在反应前后都没有发生变化的物质。催化剂起催化作用。

**分解反应**：一种物质生成两种或两种以上其他物质的反应，表达式 $AB \\rightarrow A + B$。

**收集方法**：排水法（氧气不易溶于水）或向上排空气法（氧气密度比空气大）。

### 化学方程式或公式总结

| 方法 | 化学方程式 | 反应类型 |
|------|-----------|---------|
| 高锰酸钾 | $2KMnO_4 \\stackrel{\\triangle}{=} K_2MnO_4 + MnO_2 + O_2\\uparrow$ | 分解反应 |
| 氯酸钾 | $2KClO_3 \\stackrel{MnO_2}{\\triangle} 2KCl + 3O_2\\uparrow$ | 分解反应 |
| 过氧化氢 | $2H_2O_2 \\stackrel{MnO_2}{=} 2H_2O + O_2\\uparrow$ | 分解反应 |

### 实验示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <path d="M60 60 L60 110 L50 125 L70 125 L60 110" fill="none" stroke="var(--color-primary)" stroke-width="2" />
  <rect x="45" y="55" width="30" height="8" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="60" y="45" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">棉花</text>
  <rect x="80" y="90" width="20" height="25" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-border)" />
  <text x="90" y="105" font-size="8" text-anchor="middle" fill="var(--color-text-primary)">KMnO4</text>
  <text x="60" y="145" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">试管</text>
  <rect x="75" y="120" width="25" height="8" rx="2" fill="var(--color-primary)" opacity="0.5" />
  <text x="110" y="127" font-size="9" fill="var(--color-text-secondary)">酒精灯</text>
  <path d="M40 60 L40 30 L160 30 L160 50" fill="none" stroke="var(--color-text-primary)" stroke-width="1.5" />
  <rect x="140" y="50" width="40" height="100" rx="4" fill="var(--color-bg-secondary)" stroke="var(--color-primary)" stroke-width="2" />
  <rect x="140" y="100" width="40" height="50" fill="var(--color-primary)" opacity="0.2" />
  <text x="160" y="120" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">水</text>
  <text x="160" y="170" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">排水法收集</text>
  <text x="220" y="100" font-size="10" fill="var(--color-text-primary)">加热高锰酸钾制氧气</text>
</svg>

### 例题解析

**问题**：在用过氧化氢制取氧气的实验中，加入二氧化锰的作用是什么？如何证明二氧化锰是催化剂？

**解答**：

反应方程式：$2H_2O_2 \\stackrel{MnO_2}{=} 2H_2O + O_2\\uparrow$

二氧化锰的作用：**催化作用**，加快过氧化氢分解产生氧气的速率。

证明二氧化锰是催化剂的方法：

1. 分别取等量过氧化氢溶液于两支试管中，一支加二氧化锰，一支不加
2. 加二氧化锰的试管迅速产生大量气泡（带火星木条复燃），不加的试管产生气泡很少很慢
3. 反应后过滤、洗涤、干燥，称量二氧化锰的质量，发现**质量不变**
4. 将回收的二氧化锰再次加入过氧化氢溶液中，仍能**加快分解**

结论：二氧化锰改变了反应速率，而本身质量和化学性质在反应前后均未改变，是催化剂。

### 举一反三

**练习1**：加热高锰酸钾制取氧气时，试管口要塞一团棉花，其作用是（ ）
A. 防止灰尘进入  B. 防止高锰酸钾粉末进入导管  C. 防止氧气泄漏  D. 吸收水分

- 答案：B。棉花防止高锰酸钾粉末进入导管，堵塞导管或污染水槽。

**练习2**：用氯酸钾和二氧化锰制氧气，反应前后二氧化锰在固体混合物中的质量分数如何变化？

- 答案：变大。反应中氯酸钾分解生成氯化钾和氧气，氧气逸出，固体总质量减少，而二氧化锰质量不变，所以二氧化锰在固体混合物中的质量分数增大。

### 拓展知识

- 工业制取氧气采用分离液态空气法，属于物理变化，利用液氮和液氧沸点不同进行分离。
- 催化剂具有"一变两不变"的特点：改变反应速率，本身质量和化学性质不变。
- 一个化学反应可以有多种催化剂，如过氧化氢分解可用二氧化锰、氧化铜、氯化铁等作催化剂。
- 加热高锰酸钾制氧气时，实验结束应先把导管移出水面再熄灭酒精灯，防止水倒吸入热的试管使试管破裂。`
  },
  {
    id: 'chem_006',
    title: '分子和原子',
    stage: 'middle',
    chapter: '物质构成的奥秘',
    tags: ['分子', '原子', '分子性质', '微观粒子'],
    content: `## 分子和原子

### 核心概念

**分子**：是保持物质化学性质的最小粒子。分子由原子构成。

**原子**：是化学变化中的最小粒子。在化学反应中分子可以再分，但原子不能再分。

**分子的基本性质**：

1. 分子的质量和体积都很小
2. 分子总是在不断运动着，温度越高运动速率越快
3. 分子之间有间隔，温度升高间隔增大，气体分子间隔最大
4. 同种分子性质相同，不同种分子性质不同

**分子与原子的区别**：在化学变化中，分子可以再分（分成原子），原子不能再分。

### 化学方程式或公式总结

| 微观粒子 | 定义 | 性质 |
|---------|------|------|
| 分子 | 保持物质化学性质的最小粒子 | 可分，不断运动，有间隔 |
| 原子 | 化学变化中的最小粒子 | 不可分，不断运动，有间隔 |
| 水分子 | $H_2O$ | 由2个氢原子和1个氧原子构成 |
| 氢分子 | $H_2$ | 由2个氢原子构成 |
| 氧分子 | $O_2$ | 由2个氧原子构成 |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="20" y="20" width="120" height="60" rx="6" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="80" y="45" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">水 $H_2O$</text>
  <circle cx="65" cy="65" r="6" fill="var(--color-primary)" />
  <circle cx="80" cy="65" r="4" fill="var(--color-primary)" opacity="0.6" />
  <circle cx="95" cy="65" r="6" fill="var(--color-primary)" />
  <text x="80" y="100" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">1个水分子</text>
  <line x1="140" y1="50" x2="170" y2="50" stroke="var(--color-primary)" stroke-width="2" />
  <polygon points="170,50 165,47 165,53" fill="var(--color-primary)" />
  <text x="155" y="40" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">通电</text>
  <rect x="180" y="20" width="100" height="60" rx="6" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <circle cx="200" cy="45" r="5" fill="var(--color-primary)" />
  <circle cx="212" cy="45" r="5" fill="var(--color-primary)" />
  <text x="206" y="65" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">$H_2$</text>
  <circle cx="245" cy="45" r="6" fill="var(--color-primary)" opacity="0.7" />
  <circle cx="262" cy="45" r="6" fill="var(--color-primary)" opacity="0.7" />
  <text x="253" y="65" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">$O_2$</text>
  <text x="150" y="135" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">分子在化学变化中可分，原子不可分</text>
  <text x="150" y="155" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">$2H_2O \\rightarrow 2H_2 + O_2$</text>
</svg>

### 例题解析

**问题**：下列说法是否正确？"水分子是保持水的化学性质的最小粒子，在化学变化中水分子不能再分。"

**解答**：

前半句正确，后半句错误。

- **正确部分**：水分子（$H_2O$）确实是保持水的化学性质的最小粒子。
- **错误部分**：在化学变化中，水分子可以再分。例如电解水时，水分子分解成氢原子和氧原子，氢原子结合成氢分子，氧原子结合成氧分子。

反应方程式：$2H_2O \\stackrel{通电}{=} 2H_2\\uparrow + O_2\\uparrow$

在化学变化中：分子可以再分（分成原子），原子不能再分（原子是化学变化中的最小粒子），原子重新组合成新分子。

### 举一反三

**练习1**：下列现象能说明分子在不断运动的是（ ）
A. 湿衣服晾干  B. 红墨水滴入水中扩散  C. 闻到花香  D. 以上都是

- 答案：D。这些都是分子运动的表现。

**练习2**：下列关于分子和原子的说法，正确的是（ ）
A. 分子大，原子小  B. 分子能运动，原子不能运动  C. 分子可分，原子在化学变化中不可分  D. 分子构成物质，原子不能构成物质

- 答案：C。分子和原子的本质区别是在化学变化中分子可分，原子不可分。

### 拓展知识

- 分子和原子都是微观粒子，都具有质量和体积，都在不断运动，分子间和原子间都有间隔。
- 分子不一定比原子大，如氢分子比汞原子小。
- 有些物质由分子构成（如水、氧气、二氧化碳），有些物质由原子构成（如金属、稀有气体、碳单质等）。
- 分子的间隔：固体 < 液体 < 气体，所以气体容易被压缩。`
  },
  {
    id: 'chem_007',
    title: '原子的结构',
    stage: 'middle',
    chapter: '物质构成的奥秘',
    tags: ['原子结构', '质子', '中子', '电子', '相对原子质量'],
    content: `## 原子的结构

### 核心概念

**原子结构**：原子由原子核和核外电子构成，原子核由质子和中子构成。

**质子**：带正电荷，电量与电子相反，质量约为 $1.6726 \\times 10^{-27}kg$。

**中子**：不带电，质量与质子相近。

**电子**：带负电荷，质量很小，约为质子质量的1/1836，在原子核外空间高速运动。

**原子不显电性**：原子中质子数 = 核外电子数 = 核电荷数，正负电荷相等。

**相对原子质量**：以一个碳-12原子质量的1/12（约 $1.66 \\times 10^{-27}kg$）作为标准，其他原子的质量与它相比得到的比。相对原子质量 ≈ 质子数 + 中子数。

**核外电子排布**：电子在原子核外分层排布，第一层最多2个，第二层最多8个，最外层最多8个（第一层为最外层时最多2个）。

### 化学方程式或公式总结

| 粒子 | 电性 | 相对质量 | 位置 |
|------|------|---------|------|
| 质子 | +1 | 1 | 原子核内 |
| 中子 | 0 | 1 | 原子核内 |
| 电子 | -1 | 1/1836 | 原子核外 |
| 相对原子质量 | - | 质子数+中子数 | - |

### 实验示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <circle cx="150" cy="100" r="60" fill="none" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="3,2" />
  <circle cx="150" cy="100" r="35" fill="none" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="3,2" />
  <circle cx="150" cy="100" r="15" fill="var(--color-primary)" opacity="0.4" stroke="var(--color-primary)" stroke-width="2" />
  <text x="150" y="103" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">原子核</text>
  <text x="150" y="115" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">(质子+中子)</text>
  <circle cx="150" cy="40" r="4" fill="var(--color-primary)" />
  <text x="165" y="44" font-size="9" fill="var(--color-text-secondary)">电子(-)</text>
  <circle cx="210" cy="100" r="4" fill="var(--color-primary)" />
  <text x="220" y="104" font-size="9" fill="var(--color-text-secondary)">电子(-)</text>
  <circle cx="150" cy="160" r="4" fill="var(--color-primary)" />
  <text x="165" y="164" font-size="9" fill="var(--color-text-secondary)">电子(-)</text>
  <circle cx="90" cy="100" r="4" fill="var(--color-primary)" />
  <text x="60" y="104" font-size="9" fill="var(--color-text-secondary)">电子(-)</text>
  <circle cx="105" cy="55" r="4" fill="var(--color-primary)" />
  <circle cx="195" cy="55" r="4" fill="var(--color-primary)" />
  <circle cx="105" cy="145" r="4" fill="var(--color-primary)" />
  <circle cx="195" cy="145" r="4" fill="var(--color-primary)" />
  <text x="150" y="185" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">原子结构示意图</text>
</svg>

### 例题解析

**问题**：已知某原子的相对原子质量为23，核电荷数为11，求该原子的质子数、中子数和核外电子数。

**解答**：

根据原子中各粒子数的关系：

- **质子数** = 核电荷数 = 核外电子数
- 相对原子质量 ≈ 质子数 + 中子数

所以：
- 质子数 = 11
- 核外电子数 = 质子数 = 11
- 中子数 = 相对原子质量 - 质子数 = 23 - 11 = 12

该原子是钠原子（Na），核外电子排布为第一层2个、第二层8个、第三层1个（2, 8, 1），最外层有1个电子。

### 举一反三

**练习1**：某原子核内有12个质子，则该原子的核外电子数为（ ）
A. 6  B. 12  C. 24  D. 无法确定

- 答案：B。原子中质子数 = 核外电子数 = 12。

**练习2**：下列关于原子结构的叙述，正确的是（ ）
A. 原子核由质子和电子构成  B. 原子中质子数等于中子数  C. 原子不显电性  D. 电子在原子核外固定轨道上运动

- 答案：C。原子中质子带的正电荷数等于电子带的负电荷数，整体不显电性。

### 拓展知识

- 最外层电子数决定元素的化学性质：最外层电子数少于4个易失去电子，多于4个易得到电子，等于8个（氦为2个）化学性质稳定。
- 金属元素最外层电子数一般少于4个，非金属元素最外层电子数一般多于或等于4个，稀有气体元素最外层电子数为8（氦为2）。
- 相对原子质量是一个比值，单位为1，不是原子的实际质量。
- 原子核虽然体积很小（占原子体积的几千亿分之一），但集中了原子几乎全部的质量。`
  },
  {
    id: 'chem_008',
    title: '元素',
    stage: 'middle',
    chapter: '物质构成的奥秘',
    tags: ['元素', '元素符号', '元素周期表'],
    content: `## 元素

### 核心概念

**元素**：具有相同核电荷数（即核内质子数）的一类原子的总称。元素是宏观概念，只讲种类，不讲个数。

**元素符号**：国际上统一采用的表示元素的符号。元素符号表示一种元素，还表示这种元素的一个原子。

**元素周期表**：根据元素的原子结构和性质，把元素按原子序数（核电荷数）递增的顺序排列而成的表。

**原子序数**：按元素原子核电荷数递增的顺序给元素编的号，原子序数 = 核电荷数 = 核内质子数 = 核外电子数。

**元素的分类**：金属元素、非金属元素、稀有气体元素。

### 化学方程式或公式总结

| 元素名称 | 元素符号 | 相对原子质量 | 类别 |
|---------|---------|------------|------|
| 氢 | H | 1 | 非金属 |
| 碳 | C | 12 | 非金属 |
| 氮 | N | 14 | 非金属 |
| 氧 | O | 16 | 非金属 |
| 钠 | Na | 23 | 金属 |
| 镁 | Mg | 24 | 金属 |
| 铁 | Fe | 56 | 金属 |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="50" y="20" width="80" height="60" rx="4" fill="var(--color-bg-secondary)" stroke="var(--color-primary)" stroke-width="2" />
  <text x="90" y="40" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">原子序数</text>
  <text x="90" y="55" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">6</text>
  <text x="90" y="75" font-size="24" text-anchor="middle" fill="var(--color-text-primary)" font-weight="bold">C</text>
  <text x="65" y="100" font-size="10" fill="var(--color-text-secondary)">碳</text>
  <text x="115" y="100" font-size="9" text-anchor="end" fill="var(--color-text-secondary)">12.01</text>
  <text x="90" y="115" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">元素周期表一格</text>
  <rect x="160" y="20" width="120" height="140" rx="4" fill="none" stroke="var(--color-border)" />
  <line x1="220" y1="20" x2="220" y2="160" stroke="var(--color-border)" stroke-width="1" />
  <text x="190" y="40" font-size="10" text-anchor="middle" fill="var(--color-primary)">金属</text>
  <text x="250" y="40" font-size="10" text-anchor="middle" fill="var(--color-primary)">非金属</text>
  <rect x="170" y="50" width="20" height="15" fill="var(--color-primary)" opacity="0.3" />
  <rect x="195" y="50" width="20" height="15" fill="var(--color-primary)" opacity="0.3" />
  <rect x="230" y="50" width="20" height="15" fill="var(--color-primary)" opacity="0.5" />
  <rect x="255" y="50" width="20" height="15" fill="var(--color-primary)" opacity="0.5" />
  <text x="190" y="140" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">周期(行)</text>
  <text x="250" y="140" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">族(列)</text>
</svg>

### 例题解析

**问题**：下列说法正确的是（ ）
A. 水是由两个氢元素和一个氧元素组成
B. 水是由水分子构成
C. 水是由氢分子和氧分子构成
D. 水是由两个氢原子和一个氧原子构成

**解答**：

- A. 错误。元素是宏观概念，只讲种类不讲个数，应说"水由氢元素和氧元素组成"
- B. **正确**。水是由水分子（$H_2O$）构成的
- C. 错误。水中没有氢分子和氧分子，只有水分子
- D. 错误。应说"一个水分子由两个氢原子和一个氧原子构成"

正确表述：水由氢元素和氧元素组成（宏观）；水由水分子构成，一个水分子由两个氢原子和一个氧原子构成（微观）。

答案：**B**

### 举一反三

**练习1**：决定元素种类的是（ ）
A. 质子数  B. 中子数  C. 电子数  D. 相对原子质量

- 答案：A。元素是具有相同核电荷数（质子数）的一类原子的总称，质子数决定元素种类。

**练习2**：写出下列元素符号：氧、碳、氢、铁、铜。

- 答案：氧 O、碳 C、氢 H、铁 Fe、铜 Cu。

### 拓展知识

- 地壳中含量最多的元素是氧（O），其次是硅（Si）、铝（Al）、铁（Fe）、钙（Ca）。
- 生物细胞中含量最多的元素是氧，其次是碳、氢、氮。
- 元素符号的书写：第一个字母大写，第二个字母小写，如Na、Cl、Mg。
- 元素周期表有7个周期（横行）和16个族（纵列），周期表是学习和研究化学的重要工具。`
  },
  {
    id: 'chem_009',
    title: '爱护水资源',
    stage: 'middle',
    chapter: '自然界的水',
    tags: ['水资源', '水污染', '水污染防治'],
    content: `## 爱护水资源

### 核心概念

**水资源状况**：地球表面约71%被水覆盖，水的总储量约 $1.39 \\times 10^{18}m^3$，但可供人类直接利用的淡水不到总水量的1%。

**我国水资源**：总量居世界第六，但人均水量只有世界平均水平的1/4，且分布不均（南多北少、东多西少）。

**水污染来源**：

1. **工业污染**：工业废水、废渣的排放
2. **农业污染**：农药、化肥的不合理使用
3. **生活污染**：生活污水的任意排放

**爱护水资源的措施**：节约用水（一水多用、推广节水器具等）和防治水污染（工业废水处理达标排放、合理使用化肥农药、生活污水集中处理等）。

### 化学方程式或公式总结

| 项目 | 内容 |
|------|------|
| 地球水覆盖率 | 约71% |
| 海水占比 | 约96.5% |
| 可用淡水占比 | 不足1% |
| 我国人均水量 | 世界平均的1/4 |
| 水的化学式 | $H_2O$ |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <circle cx="150" cy="90" r="70" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-primary)" stroke-width="2" />
  <path d="M80 90 A70 70 0 0 1 220 90 L220 90 L80 90 Z" fill="var(--color-primary)" opacity="0.4" />
  <text x="150" y="60" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">海水 96.5%</text>
  <text x="150" y="120" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">淡水 2.5%</text>
  <rect x="200" y="110" width="40" height="20" fill="var(--color-primary)" opacity="0.6" stroke="var(--color-border)" />
  <text x="260" y="125" font-size="9" fill="var(--color-text-secondary)">可用淡水</text>
  <text x="260" y="138" font-size="9" fill="var(--color-text-secondary)">&lt;1%</text>
  <text x="150" y="160" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">地球水资源分布</text>
  <text x="150" y="175" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">节约用水，人人有责</text>
</svg>

### 例题解析

**问题**：下列做法中，会造成水体污染的是（ ）
①工业废水直接排放 ②生活污水经处理后排放 ③合理使用农药化肥 ④海上油轮泄漏石油 ⑤垃圾向湖泊中倾倒

A. ①②③  B. ①④⑤  C. ②③④  D. ③④⑤

**解答**：

逐项分析：

- ① 工业废水直接排放 → **污染水体**
- ② 生活污水经处理后排放 → 不污染，是正确做法
- ③ 合理使用农药化肥 → 不污染，是正确做法
- ④ 海上油轮泄漏石油 → **污染水体**
- ⑤ 垃圾向湖泊中倾倒 → **污染水体**

会造成水体污染的是①④⑤。

答案：**B**

### 举一反三

**练习1**：下列做法属于节约用水的是（ ）
A. 用流水洗菜  B. 用淘米水浇花  C. 水龙头开着不关  D. 大量使用清洁剂

- 答案：B。用淘米水浇花是一水多用，属于节约用水。

**练习2**：下列说法正确的是（ ）
A. 地球上水资源丰富，不需要节约  B. 海水是淡水，可以直接饮用  C. 我国水资源分布均匀  D. 水体污染会破坏水生生态系统

- 答案：D。水污染会破坏水生生态平衡，危害生物健康。

### 拓展知识

- 水体富营养化：水中氮、磷等元素过多，导致藻类大量繁殖，消耗水中氧气，造成鱼类死亡。
- "国家节水标志"：由水滴、手掌和圆形组成，寓意节水需要公众参与。
- 南水北调工程：将长江流域的水调到华北和西北地区，缓解北方水资源短缺问题。
- 水的净化程度由低到高：沉淀 < 过滤 < 吸附 < 蒸馏，蒸馏得到的水最纯净。`
  },
  {
    id: 'chem_010',
    title: '水的净化',
    stage: 'middle',
    chapter: '自然界的水',
    tags: ['水的净化', '过滤', '吸附', '蒸馏', '硬水与软水'],
    content: `## 水的净化

### 核心概念

**沉淀**：让水中不溶性固体颗粒沉降下来，包括静置沉淀和吸附沉淀（加明矾）。

**过滤**：除去水中不溶性固体杂质。操作要点：一贴二低三靠。

**吸附**：利用活性炭的吸附性，吸附水中色素和异味。

**蒸馏**：利用混合物中各组分沸点不同进行分离，得到纯水（蒸馏水），净化程度最高。

**硬水与软水**：

- **硬水**：含有较多可溶性钙、镁化合物的水。
- **软水**：不含或含较少可溶性钙、镁化合物的水。
- **检验方法**：用肥皂水，硬水泡沫少且有浮渣，软水泡沫多。
- **硬水软化方法**：生活中煮沸，实验室蒸馏。

### 化学方程式或公式总结

| 净化方法 | 作用 | 净化程度 |
|---------|------|---------|
| 沉淀 | 除去不溶性大颗粒 | 最低 |
| 过滤 | 除去不溶性固体杂质 | 较低 |
| 吸附 | 除去色素和异味 | 较高 |
| 蒸馏 | 除去所有杂质 | 最高 |

### 实验示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <path d="M100 20 L140 20 L135 60 L105 60 Z" fill="var(--color-bg-secondary)" stroke="var(--color-primary)" stroke-width="2" />
  <text x="120" y="45" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">滤纸</text>
  <path d="M95 60 L145 60 L150 75 L90 75 Z" fill="none" stroke="var(--color-primary)" stroke-width="2" />
  <text x="120" y="72" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">漏斗</text>
  <rect x="105" y="75" width="30" height="50" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="120" y="105" font-size="9" text-anchor="middle" fill="var(--color-primary)" opacity="0.6">滤液</text>
  <path d="M120 15 L120 20" stroke="var(--color-text-primary)" stroke-width="2" />
  <circle cx="118" cy="10" r="2" fill="var(--color-primary)" opacity="0.5" />
  <circle cx="122" cy="8" r="2" fill="var(--color-primary)" opacity="0.5" />
  <text x="120" y="5" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">待滤液</text>
  <text x="120" y="145" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">过滤操作</text>
  <text x="120" y="160" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">一贴:滤纸紧贴漏斗</text>
  <text x="120" y="173" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">二低:滤纸低于口,液低于纸</text>
  <text x="120" y="186" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">三靠:烧杯靠玻璃棒,棒靠三层纸,漏斗下端靠烧杯壁</text>
  <rect x="190" y="60" width="80" height="80" rx="4" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="230" y="80" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">活性炭</text>
  <text x="230" y="100" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">吸附色素</text>
  <text x="230" y="115" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">和异味</text>
</svg>

### 例题解析

**问题**：天然水中含有泥沙、悬浮物、色素、异味和可溶性钙镁化合物，请设计一个净化方案得到纯净的水。

**解答**：

净化方案（由低到高的净化步骤）：

1. **静置沉淀**：加入明矾（$KAl(SO_4)_2 \\cdot 12H_2O$）吸附沉淀，使大颗粒泥沙沉降
2. **过滤**：除去水中的不溶性固体杂质（泥沙、悬浮物）
3. **吸附**：加入活性炭，吸附水中的色素和异味
4. **蒸馏**：加热水使其汽化再冷凝，除去所有可溶性杂质（包括可溶性钙镁化合物），得到纯净的蒸馏水

经过以上步骤得到的水是纯水（$H_2O$），净化程度最高。

### 举一反三

**练习1**：下列方法中，能降低水的硬度的是（ ）
A. 过滤  B. 加活性炭吸附  C. 煮沸  D. 沉淀

- 答案：C。煮沸可以使水中可溶性钙镁化合物转化为沉淀析出，降低水的硬度。

**练习2**：过滤后得到的滤液仍浑浊，可能的原因有哪些？

- 答案：①滤纸破损 ②液面高于滤纸边缘 ③接收滤液的烧杯不干净。

### 拓展知识

- 过滤操作"一贴二低三靠"：一贴——滤纸紧贴漏斗内壁；二低——滤纸边缘低于漏斗口、液面低于滤纸边缘；三靠——倾倒液体的烧杯口靠玻璃棒、玻璃棒下端靠三层滤纸、漏斗下端靠接收烧杯内壁。
- 活性炭具有疏松多孔的结构，表面积大，吸附能力强，可用于净水、防毒面具等。
- 硬水的危害：饮用硬水对人体健康不利；长期使用硬水洗衣服浪费肥皂且洗不干净；锅炉用硬水易结垢，不仅浪费燃料，还可能引起爆炸。
- 蒸馏时要在蒸馏烧瓶中加沸石（或碎瓷片），防止液体暴沸。`
  },
  {
    id: 'chem_011',
    title: '水的组成',
    stage: 'middle',
    chapter: '自然界的水',
    tags: ['水的组成', '电解水实验', '氢气', '氧气'],
    content: `## 水的组成

### 核心概念

**电解水实验**：在水中通直流电，水分子分解为氢原子和氧原子，氢原子结合成氢分子，氧原子结合成氧分子。

**实验现象**：通电后，两个电极上都有气泡产生，正极与负极产生气体的体积比约为**1:2**。

**气体检验**：

- 正极气体：能使带火星的木条复燃 → **氧气**
- 负极气体：能燃烧，产生淡蓝色火焰 → **氢气**

**实验结论**：水是由**氢元素和氧元素**组成的；水在通电条件下分解生成氢气和氧气。

**水的组成**：水由氢、氧两种元素组成，一个水分子（$H_2O$）由2个氢原子和1个氧原子构成。

### 化学方程式或公式总结

| 项目 | 内容 |
|------|------|
| 电解水方程式 | $2H_2O \\stackrel{通电}{=} 2H_2\\uparrow + O_2\\uparrow$ |
| 正极气体 | 氧气 $O_2$，体积约占1/3 |
| 负极气体 | 氢气 $H_2$，体积约占2/3 |
| 氢气燃烧 | $2H_2 + O_2 \\stackrel{点燃}{=} 2H_2O$ |
| 水的组成 | 氢元素和氧元素 |

### 实验示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <rect x="100" y="40" width="100" height="120" rx="4" fill="var(--color-bg-secondary)" stroke="var(--color-primary)" stroke-width="2" />
  <rect x="115" y="80" width="25" height="70" fill="var(--color-primary)" opacity="0.2" />
  <rect x="160" y="50" width="25" height="100" fill="var(--color-primary)" opacity="0.2" />
  <line x1="127" y1="160" x2="127" y2="180" stroke="var(--color-text-primary)" stroke-width="2" />
  <line x1="172" y1="160" x2="172" y2="180" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="127" y="195" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">正极(+) $O_2$</text>
  <text x="172" y="195" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">负极(-) $H_2$</text>
  <line x1="90" y1="180" x2="210" y2="180" stroke="var(--color-border)" stroke-width="1" />
  <text x="50" y="115" font-size="11" fill="var(--color-text-secondary)">体积比</text>
  <text x="50" y="130" font-size="14" fill="var(--color-primary)" font-weight="bold">1 : 2</text>
  <text x="245" y="80" font-size="9" fill="var(--color-text-primary)">$H_2$</text>
  <text x="245" y="100" font-size="9" fill="var(--color-text-secondary)">(2份)</text>
  <text x="245" y="125" font-size="9" fill="var(--color-text-primary)">$O_2$</text>
  <text x="245" y="145" font-size="9" fill="var(--color-text-secondary)">(1份)</text>
  <line x1="220" y1="115" x2="240" y2="115" stroke="var(--color-border)" stroke-dasharray="2,2" />
</svg>

### 例题解析

**问题**：电解水时正极与负极产生气体的体积比是多少？如何检验两极产生的气体？该实验得出了什么结论？

**解答**：

电解水反应方程式：$2H_2O \\stackrel{通电}{=} 2H_2\\uparrow + O_2\\uparrow$

- **体积比**：正极气体与负极气体的体积比约为 1:2
- **正极气体检验**：用带火星的木条伸入正极收集管，木条复燃，证明是**氧气**（$O_2$）
- **负极气体检验**：用燃着的木条点燃负极收集管中的气体，气体燃烧产生淡蓝色火焰，证明是**氢气**（$H_2$）

**实验结论**：

1. 水是由**氢元素和氧元素**组成的
2. 水分子在化学变化中可以再分，分成氢原子和氧原子
3. 化学变化中分子可分，原子不可分

记忆口诀：**正氧负氢，氢二氧一**。

### 举一反三

**练习1**：电解水时生成氢气和氧气的体积比约为（ ）
A. 1:1  B. 1:2  C. 2:1  D. 3:1

- 答案：C。负极氢气与正极氧气体积比约为2:1。

**练习2**：下列关于电解水实验的说法，正确的是（ ）
A. 电解水是物理变化  B. 水是由氢气和氧气组成  C. 水是由氢元素和氧元素组成  D. 水分子由氢分子和氧分子构成

- 答案：C。水是由氢元素和氧元素组成的化合物；一个水分子由2个氢原子和1个氧原子构成。

### 拓展知识

- 电解水实验中常加入少量氢氧化钠或稀硫酸，目的是增强水的导电性，水本身不参与反应的量很少。
- 氢气是最轻的气体，密度比空气小得多，难溶于水，可用向下排空气法收集。
- 氢气燃烧生成水，放出大量热，是无污染的清洁能源：$2H_2 + O_2 \\stackrel{点燃}{=} 2H_2O$。
- 任何纯净物都有固定的组成，水的组成中氢、氧元素的质量比为1:8。`
  },
  {
    id: 'chem_012',
    title: '化学式与化合价',
    stage: 'middle',
    chapter: '自然界的水',
    tags: ['化学式', '化合价', '化学式书写', '化合价规则'],
    content: `## 化学式与化合价

### 核心概念

**化学式**：用元素符号和数字的组合表示物质组成的式子。如水 $H_2O$、二氧化碳 $CO_2$。

**化学式的意义**：

- 宏观：表示一种物质、表示该物质的元素组成
- 微观：表示物质的一个分子、表示一个分子的原子构成

**化合价**：元素的原子在形成化合物时表现出来的性质。化合价有正价和负价。

**化合价规则**：在化合物中，各元素正负化合价的代数和为零。

**化合价的一般规律**：

1. 氢通常为+1价，氧通常为-2价
2. 金属元素一般显正价，非金属元素一般显负价
3. 单质中元素的化合价为零
4. 化合物中各元素化合价代数和为零

### 化学方程式或公式总结

| 元素 | 常见化合价 | 元素 | 常见化合价 |
|------|-----------|------|-----------|
| 氢 H | +1 | 氧 O | -2 |
| 钠 Na | +1 | 氯 Cl | -1, +1, +5, +7 |
| 钙 Ca | +2 | 硫 S | -2, +4, +6 |
| 镁 Mg | +2 | 碳 C | +2, +4 |
| 铝 Al | +3 | 铁 Fe | +2, +3 |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="40" y="30" width="80" height="50" rx="4" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="80" y="50" font-size="14" text-anchor="middle" fill="var(--color-text-primary)">$H_2O$</text>
  <text x="80" y="70" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">化学式</text>
  <line x1="125" y1="55" x2="155" y2="55" stroke="var(--color-primary)" stroke-width="2" />
  <polygon points="155,55 150,52 150,58" fill="var(--color-primary)" />
  <text x="140" y="45" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">化合价</text>
  <rect x="170" y="30" width="100" height="50" rx="4" fill="var(--color-bg-secondary)" stroke="var(--color-primary)" stroke-width="2" />
  <text x="220" y="50" font-size="14" text-anchor="middle" fill="var(--color-text-primary)">$H^{+1}_2 O^{-2}$</text>
  <text x="220" y="70" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">(+1)×2 + (-2) = 0</text>
  <rect x="40" y="110" width="230" height="50" rx="4" fill="none" stroke="var(--color-border)" stroke-dasharray="4,3" />
  <text x="155" y="130" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">化合价规则</text>
  <text x="155" y="148" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">化合物中各元素化合价代数和为零</text>
</svg>

### 例题解析

**问题**：已知氧化铁的化学式为 $Fe_2O_3$，其中氧元素为-2价，求铁元素的化合价。

**解答**：

根据化合价规则，化合物中各元素正负化合价的代数和为零。

设铁的化合价为 $x$，则：

$$ x \\times 2 + (-2) \\times 3 = 0 $$

$$ 2x - 6 = 0 $$

$$ 2x = 6 $$

$$ x = +3 $$

所以氧化铁中铁元素的化合价为**+3价**，氧化铁读作"氧化铁"（$Fe_2O_3$，三氧化二铁）。

验证：$(+3) \\times 2 + (-2) \\times 3 = 6 - 6 = 0$ ✓

### 举一反三

**练习1**：标出下列化合物中各元素的化合价：$CO_2$、$NaCl$、$H_2SO_4$。

- 答案：
  - $CO_2$：$C^{+4}O^{-2}_2$（C为+4，O为-2）
  - $NaCl$：$Na^{+1}Cl^{-1}$（Na为+1，Cl为-1）
  - $H_2SO_4$：$H^{+1}_2S^{+6}O^{-2}_4$（H为+1，S为+6，O为-2）

**练习2**：写出下列物质的化学式：氧化镁、氯化钠、二氧化碳。

- 答案：氧化镁 $MgO$、氯化钠 $NaCl$、二氧化碳 $CO_2$。

### 拓展知识

- 化学式的书写原则：金属在前非金属在后（如 $NaCl$），氢在前氧在后（如 $H_2O$）。
- 化合价口诀：一价氢氯钾钠银，二价氧钙钡镁锌，三铝四硅五价磷，二三铁二四碳，二四六硫都齐全，铜汞二价最常见。
- 原子团（根）也有化合价，如氢氧根 $OH^-$ 为-1价，碳酸根 $CO_3^{2-}$ 为-2价，硫酸根 $SO_4^{2-}$ 为-2价，硝酸根 $NO_3^-$ 为-1价，铵根 $NH_4^+$ 为+1价。
- 化合价是元素的原子在形成化合物时表现出来的一种性质，在单质中元素的化合价为零。`
  },
  {
    id: 'chem_013',
    title: '质量守恒定律',
    stage: 'middle',
    chapter: '化学方程式',
    tags: ['质量守恒定律', '实验验证', '微观解释'],
    content: `## 质量守恒定律

### 核心概念

**质量守恒定律**：参加化学反应的各物质的质量总和，等于反应后生成的各物质的质量总和。

**适用范围**：适用于所有化学反应，不适用于物理变化。

**微观解释**：化学反应的过程是分子分解成原子，原子重新组合成新分子的过程。在化学反应中，原子的**种类、数目、质量**都没有改变，所以反应前后物质的总质量不变。

**六个不变**：

- 宏观：物质总质量不变、元素种类不变、元素质量不变
- 微观：原子种类不变、原子数目不变、原子质量不变

**两个一定变**：物质种类变、分子种类变

**一个可能变**：分子数目可能变

### 化学方程式或公式总结

| 验证实验 | 现象 | 结论 |
|---------|------|------|
| 白磷燃烧 | 天平保持平衡 | 遵守质量守恒定律 |
| 铁与硫酸铜反应 | 天平保持平衡 | 遵守质量守恒定律 |
| 蜡烛燃烧 | 天平不平衡（变轻） | 有气体参与/生成，需密闭 |
| 镁条燃烧 | 天平不平衡（变重） | 有氧气参与，需密闭 |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="80" y="20" width="140" height="20" rx="2" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="150" y="35" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">天平横梁</text>
  <line x1="150" y1="40" x2="150" y2="60" stroke="var(--color-text-primary)" stroke-width="2" />
  <polygon points="150,60 145,68 155,68" fill="var(--color-text-primary)" />
  <rect x="110" y="68" width="20" height="20" rx="2" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <rect x="170" y="68" width="20" height="20" rx="2" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="120" y="105" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">反应前</text>
  <text x="180" y="105" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">反应后</text>
  <text x="150" y="125" font-size="11" text-anchor="middle" fill="var(--color-primary)">天平保持平衡</text>
  <rect x="60" y="140" width="180" height="30" rx="4" fill="none" stroke="var(--color-primary)" stroke-dasharray="4,3" />
  <text x="150" y="160" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">参加反应的物质质量 = 生成物质量</text>
</svg>

### 例题解析

**问题**：在密闭容器中，将一定量的氢气和氧气混合点燃，反应后生成18g水。若参加反应的氢气质量为2g，求参加反应的氧气质量。

**解答**：

根据质量守恒定律，参加反应的各物质质量总和等于生成物的质量总和。

反应方程式：$2H_2 + O_2 \\stackrel{点燃}{=} 2H_2O$

设参加反应的氧气质量为 $m$，则：

$$ m(氢气) + m(氧气) = m(水) $$

$$ 2g + m = 18g $$

$$ m = 18g - 2g = 16g $$

参加反应的氧气质量为 **16g**。

验证：$2H_2 + O_2 = 2H_2O$ 中质量比为 4:32:36 = 1:8:9，2g氢气对应16g氧气和18g水 ✓

### 举一反三

**练习1**：下列说法正确的是（ ）
A. 蜡烛燃烧后质量减少，不符合质量守恒定律
B. 镁条燃烧后质量增加，不符合质量守恒定律
C. 在敞口容器中加热铜粉，固体质量增加，符合质量守恒定律
D. 质量守恒定律只适用于气体反应

- 答案：C。铜加热生成氧化铜，参加反应的铜和氧气质量等于生成的氧化铜质量，符合质量守恒定律。AB是因气体参与导致在敞口容器中看似不守恒。

**练习2**：在化学反应 $A + B \\rightarrow C + D$ 中，已知10g A与足量B反应生成15g C和8g D，求参加反应的B的质量。

- 答案：根据质量守恒定律，$m(A) + m(B) = m(C) + m(D)$，即 $10 + m(B) = 15 + 8 = 23$，所以 $m(B) = 13g$。

### 拓展知识

- 验证质量守恒定律的实验必须在**密闭容器**中进行，否则有气体参与或生成时，天平会不平衡。
- 白磷燃烧验证实验：白磷在锥形瓶中燃烧，生成五氧化二磷固体，瓶内气体减少但密闭，天平保持平衡。
- 质量守恒定律是书写化学方程式和进行化学计算的理论基础。
- 化学反应中只是原子重新组合，原子的种类、数目、质量都不变，所以反应前后物质的总质量必然相等。`
  },
  {
    id: 'chem_014',
    title: '化学方程式',
    stage: 'middle',
    chapter: '化学方程式',
    tags: ['化学方程式', '书写规则', '配平方法'],
    content: `## 化学方程式

### 核心概念

**化学方程式**：用化学式来表示化学反应的式子。

**化学方程式的意义**：

1. 表示反应物和生成物以及反应条件
2. 表示反应物、生成物之间的质量比
3. 表示反应物、生成物之间的微粒个数比

**书写原则**：

1. 以客观事实为基础，不能凭空臆造
2. 遵守质量守恒定律（必须配平）

**书写步骤**：

1. 写：左反应物，右生成物，用短线连接
2. 配：配平化学方程式（使两边各原子数目相等）
3. 注：注明反应条件（加热、点燃、催化剂等）和气体符号（$\\uparrow$、$\\downarrow$）
4. 等：将短线改成等号

**配平方法**：最小公倍数法、观察法、奇数配偶法等。

### 化学方程式或公式总结

| 配平方法 | 适用情况 | 示例 |
|---------|---------|------|
| 最小公倍数法 | 一般反应 | $P + O_2 \\rightarrow P_2O_5$ |
| 观察法 | 较简单反应 | $Fe + O_2 \\rightarrow Fe_3O_4$ |
| 奇数配偶法 | 有奇数原子的反应 | $C_2H_2 + O_2 \\rightarrow CO_2 + H_2O$ |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="20" y="20" width="60" height="40" rx="4" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="50" y="45" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">1.写</text>
  <text x="50" y="75" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">$H_2+O_2 \\rightarrow H_2O$</text>
  <line x1="85" y1="40" x2="105" y2="40" stroke="var(--color-primary)" stroke-width="2" />
  <polygon points="105,40 100,37 100,43" fill="var(--color-primary)" />
  <rect x="110" y="20" width="60" height="40" rx="4" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="140" y="45" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">2.配</text>
  <text x="140" y="75" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">$2H_2+O_2 \\rightarrow 2H_2O$</text>
  <line x1="175" y1="40" x2="195" y2="40" stroke="var(--color-primary)" stroke-width="2" />
  <polygon points="195,40 190,37 190,43" fill="var(--color-primary)" />
  <rect x="200" y="20" width="60" height="40" rx="4" fill="var(--color-bg-secondary)" stroke="var(--color-border)" />
  <text x="230" y="45" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">3.注</text>
  <text x="230" y="75" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">$点燃$ 条件</text>
  <line x1="265" y1="40" x2="285" y2="40" stroke="var(--color-primary)" stroke-width="2" />
  <polygon points="285,40 280,37 280,43" fill="var(--color-primary)" />
  <rect x="100" y="110" width="120" height="40" rx="4" fill="var(--color-bg-secondary)" stroke="var(--color-primary)" stroke-width="2" />
  <text x="160" y="135" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">4.等号</text>
  <text x="160" y="165" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">$2H_2+O_2 \\stackrel{点燃}{=} 2H_2O$</text>
</svg>

### 例题解析

**问题**：配平化学方程式 $C_2H_4 + O_2 \\rightarrow CO_2 + H_2O$，并注明反应条件。

**解答**：

采用奇数配偶法配平：

**步骤1**：观察方程式，发现氧原子在右边有奇数（$H_2O$ 中1个O，$CO_2$ 中2个O），将 $H_2O$ 前配系数2：

$$ C_2H_4 + O_2 \\rightarrow CO_2 + 2H_2O $$

**步骤2**：右边氢原子数为 $2 \\times 2 = 4$，左边氢原子数为4，氢已配平。

**步骤3**：右边碳原子数为1（$CO_2$ 中），左边为2，在 $CO_2$ 前配2：

$$ C_2H_4 + O_2 \\rightarrow 2CO_2 + 2H_2O $$

**步骤4**：右边氧原子数为 $2 \\times 2 + 2 \\times 1 = 6$，左边为2，在 $O_2$ 前配3：

$$ C_2H_4 + 3O_2 \\rightarrow 2CO_2 + 2H_2O $$

**步骤5**：检查并注明条件：

$$ C_2H_4 + 3O_2 \\stackrel{点燃}{=} 2CO_2 + 2H_2O $$

### 举一反三

**练习1**：配平化学方程式 $Fe + O_2 \\rightarrow Fe_3O_4$。

- 答案：$3Fe + 2O_2 \\stackrel{点燃}{=} Fe_3O_4$。铁在氧气中燃烧生成四氧化三铁。

**练习2**：配平化学方程式 $Al + O_2 \\rightarrow Al_2O_3$。

- 答案：$4Al + 3O_2 \\stackrel{点燃}{=} 2Al_2O_3$。使用最小公倍数法，氧的最小公倍数为6。

### 拓展知识

- 化学方程式中"$\\uparrow$"表示生成气体，"$\\downarrow$"表示生成沉淀。注意：反应物中有气体时，生成物中的气体不加"$\\uparrow$"。
- "点燃"和"加热"不同：点燃是引发燃烧，加热是持续提供热量，通常用"$\\triangle$"表示加热。
- 催化剂写在等号上方，反应条件写在等号下方或上方，如 $2KClO_3 \\stackrel{MnO_2}{\\triangle} 2KCl + 3O_2\\uparrow$。
- 化学方程式可以表示反应物和生成物之间的质量比，各物质质量比 = 相对分子质量 × 化学计量数之比。`
  },
  {
    id: 'chem_015',
    title: '碳单质',
    stage: 'middle',
    chapter: '碳和碳的氧化物',
    tags: ['金刚石', '石墨', 'C60', '碳的化学性质', '同素异形体'],
    content: `## 碳单质

### 核心概念

**同素异形体**：由同一种元素形成的几种性质不同的单质。金刚石、石墨、C60都是碳元素的同素异形体。

**金刚石**：无色透明、正八面体形状的固体，是天然存在的最硬的物质。碳原子呈空间网状结构。用于切割玻璃、大理石，制作钻探机钻头、珠宝。

**石墨**：深灰色、有金属光泽、不透明的细鳞片状固体，质软，有滑腻感，导电性良好，耐高温。碳原子呈层状结构。用于制铅笔芯、电极、润滑剂。

**C60**：由60个碳原子构成的分子，形似足球，分子结构稳定。应用于超导材料、材料科学等领域。

**碳的化学性质**：常温下碳的化学性质不活泼；高温下能与其他物质反应，具有可燃性和还原性。

### 化学方程式或公式总结

| 碳单质 | 结构特点 | 物理性质 | 用途 |
|--------|---------|---------|------|
| 金刚石 | 空间网状 | 最硬、无色透明 | 切割、钻头、珠宝 |
| 石墨 | 层状 | 软、导电、耐高温 | 铅笔芯、电极、润滑剂 |
| C60 | 足球状分子 | 分子结构稳定 | 超导、新材料 |

| 化学性质 | 化学方程式 |
|---------|-----------|
| 可燃性(充足氧气) | $C + O_2 \\stackrel{点燃}{=} CO_2$ |
| 可燃性(不足氧气) | $2C + O_2 \\stackrel{点燃}{=} 2CO$ |
| 还原性(还原氧化铜) | $2CuO + C \\stackrel{高温}{=} 2Cu + CO_2\\uparrow$ |
| 还原性(还原氧化铁) | $2Fe_2O_3 + 3C \\stackrel{高温}{=} 4Fe + 3CO_2\\uparrow$ |

### 实验示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <polygon points="60,40 90,30 120,40 120,70 90,80 60,70" fill="none" stroke="var(--color-primary)" stroke-width="1.5" />
  <line x1="60" y1="40" x2="120" y2="70" stroke="var(--color-primary)" stroke-width="1" />
  <line x1="120" y1="40" x2="60" y2="70" stroke="var(--color-primary)" stroke-width="1" />
  <line x1="90" y1="30" x2="90" y2="80" stroke="var(--color-primary)" stroke-width="1" />
  <text x="90" y="100" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">金刚石</text>
  <line x1="150" y1="50" x2="180" y2="50" stroke="var(--color-primary)" stroke-width="2" />
  <line x1="150" y1="60" x2="180" y2="60" stroke="var(--color-primary)" stroke-width="2" />
  <line x1="150" y1="70" x2="180" y2="70" stroke="var(--color-primary)" stroke-width="2" />
  <circle cx="155" cy="50" r="3" fill="var(--color-primary)" />
  <circle cx="170" cy="50" r="3" fill="var(--color-primary)" />
  <circle cx="155" cy="60" r="3" fill="var(--color-primary)" />
  <circle cx="170" cy="60" r="3" fill="var(--color-primary)" />
  <circle cx="155" cy="70" r="3" fill="var(--color-primary)" />
  <circle cx="170" cy="70" r="3" fill="var(--color-primary)" />
  <text x="165" y="100" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">石墨(层状)</text>
  <circle cx="250" cy="60" r="30" fill="none" stroke="var(--color-primary)" stroke-width="1.5" />
  <circle cx="240" cy="50" r="2" fill="var(--color-primary)" />
  <circle cx="260" cy="50" r="2" fill="var(--color-primary)" />
  <circle cx="250" cy="45" r="2" fill="var(--color-primary)" />
  <circle cx="230" cy="60" r="2" fill="var(--color-primary)" />
  <circle cx="270" cy="60" r="2" fill="var(--color-primary)" />
  <circle cx="240" cy="70" r="2" fill="var(--color-primary)" />
  <circle cx="260" cy="70" r="2" fill="var(--color-primary)" />
  <circle cx="250" cy="75" r="2" fill="var(--color-primary)" />
  <text x="250" y="100" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">C60(足球状)</text>
  <rect x="20" y="130" width="260" height="50" rx="4" fill="none" stroke="var(--color-border)" stroke-dasharray="4,3" />
  <text x="150" y="150" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">同素异形体：碳原子排列方式不同</text>
  <text x="150" y="168" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">物理性质差异巨大，化学性质相似</text>
</svg>

### 例题解析

**问题**：用木炭还原氧化铜的实验中，观察到什么现象？写出化学方程式并分析反应原理。

**解答**：

**实验现象**：

1. 黑色粉末逐渐变成**红色**（生成铜）
2. 澄清石灰水变**浑浊**（生成二氧化碳）

**化学方程式**：

$$ 2CuO + C \\stackrel{高温}{=} 2Cu + CO_2\\uparrow $$

**反应原理分析**：

- 反应物：氧化铜（$CuO$）和碳（$C$）
- 生成物：铜（$Cu$）和二氧化碳（$CO_2$）
- 反应条件：高温
- 在反应中，碳夺取了氧化铜中的氧，生成二氧化碳，碳发生了氧化反应（被氧化）；氧化铜失去了氧，变成铜单质，发生了还原反应（被还原）。
- 碳表现出**还原性**，是还原剂；氧化铜表现出氧化性，是氧化剂。

### 举一反三

**练习1**：下列关于金刚石和石墨的说法，正确的是（ ）
A. 它们是由不同元素组成的单质
B. 它们的物理性质相同
C. 它们的碳原子排列方式不同
D. 它们不能相互转化

- 答案：C。金刚石和石墨都是由碳元素组成的单质，但碳原子排列方式不同，导致物理性质差异很大。

**练习2**：写出碳在氧气中充分燃烧和不充分燃烧的化学方程式。

- 答案：
  - 充分燃烧：$C + O_2 \\stackrel{点燃}{=} CO_2$
  - 不充分燃烧：$2C + O_2 \\stackrel{点燃}{=} 2CO$

### 拓展知识

- 金刚石和石墨的物理性质差异巨大，是因为碳原子的**排列方式**不同，但它们都是由碳元素组成的单质，化学性质相似。
- 石墨导电，金刚石不导电；石墨质软，金刚石最硬——这都源于结构的不同。
- 无定形碳（如木炭、活性炭、炭黑、焦炭）实际上是由石墨的微小晶体和少量杂质构成。
- 活性炭具有疏松多孔的结构，有很强的吸附性，可用于净水、防毒面具、制糖脱色等。
- 碳的还原性在工业上有重要应用：高炉炼铁就是利用一氧化碳（碳的不完全燃烧产物）还原铁矿石。`
  },
  {
    id: 'chem_016',
    title: '二氧化碳',
    stage: 'middle',
    chapter: '碳和碳的氧化物',
    tags: ['二氧化碳', 'CO2', '制取', '用途'],
    content: `## 二氧化碳

### 核心概念

**二氧化碳（CO2）**：一种无色无味的气体，密度比空气大，能溶于水（1体积水约溶解1体积CO2），不支持燃烧，本身也不可燃。

**碳酸（H2CO3）**：CO2溶于水反应生成的弱酸，能使紫色石蕊试液变红色，受热易分解。

**温室效应**：大气中CO2等气体浓度升高会导致温室效应加剧。

### 化学方程式总结

| 反应 | 化学方程式 |
|------|-----------|
| CO2与水反应 | $CO_2 + H_2O = H_2CO_3$ |
| 碳酸分解 | $H_2CO_3 = H_2O + CO_2↑$ |
| CO2与石灰水 | $CO_2 + Ca(OH)_2 = CaCO_3↓ + H_2O$ |
| 碳酸钙与盐酸 | $CaCO_3 + 2HCl = CaCl_2 + H_2O + CO_2↑$ |
| 碳还原二氧化碳 | $C + CO_2 = 2CO$ |

### 实验示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <rect x="120" y="20" width="60" height="100" fill="none" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <rect x="125" y="60" width="50" height="55" fill="var(--color-primary)" opacity="0.4" />
  <circle cx="135" cy="50" r="3" fill="var(--color-primary)" />
  <circle cx="150" cy="45" r="3" fill="var(--color-primary)" />
  <circle cx="165" cy="55" r="3" fill="var(--color-primary)" />
  <text x="150" y="15" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">大理石+稀盐酸</text>
  <path d="M140 120 L140 160 L80 160 L80 175" stroke="var(--color-text-secondary)" stroke-width="2" fill="none" />
  <path d="M160 120 L160 140 L220 140 L220 175" stroke="var(--color-text-secondary)" stroke-width="2" fill="none" />
  <rect x="55" y="175" width="50" height="20" fill="none" stroke="var(--color-text-primary)" stroke-width="2" />
  <rect x="65" y="180" width="30" height="10" fill="var(--color-bg-secondary)" />
  <rect x="195" y="175" width="50" height="20" fill="none" stroke="var(--color-text-primary)" stroke-width="2" />
  <rect x="205" y="180" width="30" height="10" fill="var(--color-primary)" opacity="0.5" />
  <text x="80" y="165" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">收集(CO2)</text>
  <text x="220" y="165" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">验满</text>
  <text x="150" y="195" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">向上排空气法</text>
</svg>

### 例题解析

**问题**：实验室用大理石和稀盐酸制取二氧化碳，写出化学方程式，并说明为什么不能用稀硫酸代替稀盐酸？

**解答**：

化学方程式：$CaCO_3 + 2HCl = CaCl_2 + H_2O + CO_2↑$

若用稀硫酸，反应生成微溶于水的硫酸钙：$CaCO_3 + H_2SO_4 = CaSO_4 + H_2O + CO_2↑$，硫酸钙覆盖在大理石表面阻止反应继续进行，导致反应停止。

### 举一反三

**练习1**：如何检验某气体是否为二氧化碳？
- 答案：将气体通入澄清石灰水，若石灰水变浑浊则证明是CO2。方程式：$CO_2 + Ca(OH)_2 = CaCO_3↓ + H_2O$

**练习2**：将CO2通入紫色石蕊试液，加热后会发生什么现象？
- 答案：通入后石蕊变红（生成H2CO3），加热后红色消失变紫（H2CO3分解，$H_2CO_3 = H_2O + CO_2↑$）。

### 拓展知识

- CO2可用于**灭火**（既不可燃也不助燃，密度大于空气）。
- **干冰**是固态CO2，升华吸热，可用于人工降雨和食品保鲜。
- 植物通过**光合作用**吸收CO2：$6CO_2 + 6H_2O \\xrightarrow{光照} C_6H_{12}O_6 + 6O_2$。`
  },
  {
    id: 'chem_017',
    title: '一氧化碳',
    stage: 'middle',
    chapter: '碳和碳的氧化物',
    tags: ['一氧化碳', 'CO', '毒性', '还原性'],
    content: `## 一氧化碳

### 核心概念

**一氧化碳（CO）**：无色无味气体，难溶于水，密度与空气接近。

**可燃性**：CO在空气中燃烧产生蓝色火焰，生成CO2。

**还原性**：高温下CO能夺取金属氧化物中的氧，常用于冶炼金属。

**毒性**：CO与血红蛋白结合能力远强于O2，会导致人体缺氧中毒。

### 化学方程式总结

| 性质 | 化学方程式 |
|------|-----------|
| 可燃性 | $2CO + O_2 = 2CO_2$ |
| 还原氧化铜 | $CO + CuO = Cu + CO_2$ |
| 还原氧化铁 | $3CO + Fe_2O_3 = 2Fe + 3CO_2$ |
| 还原氧化锌 | $CO + ZnO = Zn + CO_2$ |
| 工业制CO | $C + CO_2 = 2CO$ |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="40" y="60" width="220" height="60" fill="none" stroke="var(--color-text-primary)" stroke-width="2" rx="6" />
  <rect x="100" y="75" width="100" height="30" fill="var(--color-primary)" opacity="0.4" />
  <text x="150" y="95" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">CuO(黑色)</text>
  <path d="M30 90 L40 90" stroke="var(--color-text-secondary)" stroke-width="2" />
  <text x="20" y="93" font-size="10" text-anchor="end" fill="var(--color-text-secondary)">CO</text>
  <path d="M260 90 L280 90 L280 120 L270 120" stroke="var(--color-text-secondary)" stroke-width="2" fill="none" />
  <rect x="245" y="120" width="30" height="25" fill="none" stroke="var(--color-text-primary)" stroke-width="2" />
  <rect x="248" y="125" width="24" height="15" fill="var(--color-bg-secondary)" />
  <text x="260" y="160" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">澄清石灰水</text>
  <path d="M150 30 L150 60" stroke="var(--color-primary)" stroke-width="2" stroke-dasharray="3,2" />
  <polygon points="148,55 152,55 150,62" fill="var(--color-primary)" />
  <text x="170" y="40" font-size="11" fill="var(--color-primary)">加热</text>
  <text x="150" y="170" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">CO还原CuO实验</text>
</svg>

### 例题解析

**问题**：用CO还原氧化铁制取铁，写出化学方程式，并描述实验现象。

**解答**：

化学方程式：$3CO + Fe_2O_3 = 2Fe + 3CO_2$

实验现象：**红棕色**粉末逐渐变为**黑色**；澄清石灰水变浑浊；尾气需要点燃处理（防止CO污染空气）。

### 举一反三

**练习1**：CO使人中毒的原理是什么？
- 答案：CO与血红蛋白结合能力比O2强200倍，结合后阻碍O2运输，造成人体缺氧中毒。

**练习2**：如何区别CO和H2两种气体？
- 答案：将气体分别点燃，在火焰上方罩一个内壁涂有澄清石灰水的烧杯。石灰水变浑浊的是CO（生成CO2），无变化的是H2（生成H2O）。

### 拓展知识

- CO是**煤气**的主要成分之一，也是**水煤气**（CO和H2）的成分。
- 冬季取暖应注意**通风**，防止CO中毒。
- CO的还原性使其在工业上用于**炼铁**，是高炉炼铁的重要还原剂。`
  },
  {
    id: 'chem_018',
    title: '燃烧与灭火',
    stage: 'middle',
    chapter: '燃料及其利用',
    tags: ['燃烧', '灭火', '爆炸', '着火点'],
    content: `## 燃烧与灭火

### 核心概念

**燃烧**：可燃物与氧气（或其他氧化剂）发生的发光、放热的剧烈氧化反应。

**燃烧的三个条件**（缺一不可）：①物质是**可燃物**；②可燃物与**氧气（或空气）接触**；③温度达到可燃物的**着火点**。

**着火点**：可燃物开始燃烧所需的最低温度，是物质本身的属性，一般不可改变。

**爆炸**：可燃物在**有限空间**内急剧燃烧，气体体积迅速膨胀引起的现象。

### 灭火原理与方法

| 灭火原理 | 对应破坏条件 | 实例 |
|---------|-------------|------|
| 隔离可燃物 | 移除可燃物 | 砍掉火灾周围的树木 |
| 隔绝氧气 | 隔绝空气/氧气 | 沙土覆盖、灭火器 |
| 降低温度 | 温度降至着火点以下 | 用水扑灭 |
| 中断反应链 | 抑制自由基 | 干粉灭火器 |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="20" y="40" width="80" height="100" fill="none" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <rect x="30" y="80" width="60" height="55" fill="var(--color-bg-secondary)" />
  <text x="60" y="30" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">纸片</text>
  <path d="M55 35 L65 35 L60 25 Z" fill="var(--color-primary)" />
  <rect x="120" y="40" width="80" height="100" fill="none" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <rect x="130" y="80" width="60" height="55" fill="var(--color-bg-secondary)" />
  <text x="160" y="30" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">木块</text>
  <rect x="220" y="40" width="80" height="100" fill="none" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <rect x="230" y="80" width="60" height="55" fill="var(--color-primary)" opacity="0.3" />
  <text x="260" y="30" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">水中木块</text>
  <path d="M30 130 L250 130" stroke="var(--color-text-secondary)" stroke-width="2" />
  <text x="60" y="155" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">能燃烧</text>
  <text x="160" y="155" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">能燃烧</text>
  <text x="260" y="155" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">不燃烧</text>
  <text x="150" y="175" font-size="11" text-anchor="middle" fill="var(--color-primary)">燃烧条件探究实验</text>
</svg>

### 例题解析

**问题**：用扇子扇蜡烛火焰会熄灭，但用扇子扇煤炉的火焰却越扇越旺，原因是什么？

**解答**：

- 蜡烛着火点**较低**，扇风使温度降至着火点以下，故熄灭。
- 煤的着火点**较高**，扇风不会使温度降至着火点以下，反而增加了氧气供应，故燃烧更旺。

### 举一反三

**练习1**：炒菜时油锅起火，最简单的灭火方法是什么？
- 答案：盖上锅盖，隔绝氧气使火熄灭。不能用水浇（油比水轻，水会使油飞溅扩大火势）。

**练习2**：发生煤矿瓦斯爆炸需要哪些条件？
- 答案：①有可燃物（甲烷等可燃气体）；②有氧气（或空气）；③温度达到着火点（遇明火或电火花）；④有限空间。

### 拓展知识

- **生产、运输、使用、储存易燃易爆物**时，严禁烟火，并要**通风**。
- 常见灭火器：**泡沫灭火器**（扑灭木材、棉布火灾）、**干粉灭火器**（扑灭油、气火灾）、**二氧化碳灭火器**（扑灭图书、贵重设备火灾，不留痕迹）。
- **火场逃生**时应用湿毛巾捂住口鼻，弯腰低姿撤离。`
  },
  {
    id: 'chem_019',
    title: '能源',
    stage: 'middle',
    chapter: '燃料及其利用',
    tags: ['能源', '化石燃料', '新能源', '环境保护'],
    content: `## 能源

### 核心概念

**化石燃料**：由古代生物遗骸在地层中经过漫长演化形成的燃料，包括**煤、石油、天然气**，属于不可再生能源。

**煤**：主要含碳元素，还含少量氢、氧、氮、硫等元素，被称为"工业的粮食"。

**石油**：主要含碳、氢元素，被称为"工业的血液"，是混合物。

**天然气**：主要成分是甲烷（CH4），是最清洁的化石燃料。

**新能源**：包括太阳能、风能、水能、地热能、潮汐能、核能、氢能等。

### 化学方程式总结

| 反应 | 化学方程式 |
|------|-----------|
| 甲烷燃烧 | $CH_4 + 2O_2 = CO_2 + 2H_2O$ |
| 氢气燃烧 | $2H_2 + O_2 = 2H_2O$ |
| 乙醇燃烧 | $C_2H_5OH + 3O_2 = 2CO_2 + 3H_2O$ |
| 电解水 | $2H_2O = 2H_2↑ + O_2↑$ |
| 碳不完全燃烧 | $2C + O_2 = 2CO$ |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <circle cx="80" cy="50" r="20" fill="var(--color-primary)" opacity="0.6" />
  <text x="80" y="55" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">太阳能</text>
  <path d="M110 50 Q150 30 200 50" stroke="var(--color-primary)" stroke-width="2" fill="none" stroke-dasharray="4,3" />
  <rect x="200" y="35" width="60" height="30" fill="var(--color-bg-secondary)" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <text x="230" y="55" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">光伏板</text>
  <path d="M230 65 L230 100 L150 100 L150 130" stroke="var(--color-text-secondary)" stroke-width="2" fill="none" />
  <rect x="115" y="130" width="70" height="35" fill="none" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <text x="150" y="153" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">家庭用电</text>
  <path d="M50 130 L115 147" stroke="var(--color-border)" stroke-width="2" />
  <circle cx="40" cy="140" r="12" fill="var(--color-primary)" opacity="0.4" />
  <text x="40" y="144" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">风能</text>
  <text x="150" y="175" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">能源转化示意</text>
</svg>

### 例题解析

**问题**：氢气作为未来理想能源的优点有哪些？目前广泛使用还存在哪些困难？

**解答**：

优点：①原料是水，**来源广泛**；②燃烧产物是水，**无污染**；③燃烧**放热多**，热值高。

困难：①制取成本高；②储存和运输困难（易燃易爆，密度小）。

### 举一反三

**练习1**：天然气燃烧的化学方程式是什么？为什么说天然气是较清洁的燃料？
- 答案：$CH_4 + 2O_2 = CO_2 + 2H_2O$。燃烧产物是CO2和水，基本不含硫氧化物和氮氧化物，污染小。

**练习2**：乙醇汽油（含乙醇的汽油）属于什么物质？使用乙醇汽油有何优点？
- 答案：属于混合物。优点：①减少汽车尾气污染；②乙醇可再生，节省石油资源；③促进农业发展。

### 拓展知识

- 燃料不充分燃烧会产生**CO**等有毒气体，且浪费能源。充分燃烧应保证**足够的氧气**和**足够大的接触面积**。
- 酸雨的主要成因是煤燃烧产生的**SO2**和氮氧化物。
- **温室效应**主要由于化石燃料大量使用导致大气中CO2浓度升高。`
  },
  {
    id: 'chem_020',
    title: '金属材料',
    stage: 'middle',
    chapter: '金属和金属材料',
    tags: ['金属', '合金', '物理性质'],
    content: `## 金属材料

### 核心概念

**纯金属**：由单一金属元素组成的金属材料，如纯铁、纯铜、纯铝。

**合金**：由一种金属与其他金属（或非金属）熔合而成的具有金属特性的物质。合金是**混合物**。

**合金的特性**：与组成它的纯金属相比，合金一般具有**硬度更大、熔点更低、抗腐蚀性更强**的特点。

**金属的物理性质**：常温下大多为固态（汞除外），有金属光泽，导电、导热，有延展性。

### 常见金属对比

| 金属 | 颜色 | 密度(g/cm³) | 熔点(℃) | 主要用途 |
|------|------|------------|---------|---------|
| 铁(Fe) | 银白色 | 7.86 | 1535 | 建筑、机械 |
| 铝(Al) | 银白色 | 2.70 | 660 | 飞机、电缆 |
| 铜(Cu) | 紫红色 | 8.92 | 1083 | 电线、电器 |
| 锌(Zn) | 青白色 | 7.14 | 419 | 镀锌、电池 |
| 钛(Ti) | 银灰色 | 4.51 | 1668 | 航天、医疗 |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="30" y="30" width="60" height="40" fill="none" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="60" y="55" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">纯金属</text>
  <line x1="40" y1="80" x2="80" y2="80" stroke="var(--color-primary)" stroke-width="3" />
  <text x="60" y="100" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">硬度:低</text>
  <text x="60" y="120" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">熔点:高</text>
  <rect x="210" y="30" width="60" height="40" fill="none" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="240" y="55" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">合金</text>
  <line x1="220" y1="80" x2="260" y2="80" stroke="var(--color-primary)" stroke-width="5" />
  <text x="240" y="100" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">硬度:高</text>
  <text x="240" y="120" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">熔点:低</text>
  <path d="M90 50 L210 50" stroke="var(--color-primary)" stroke-width="2" stroke-dasharray="4,3" />
  <polygon points="205,46 215,50 205,54" fill="var(--color-primary)" />
  <text x="150" y="40" font-size="11" text-anchor="middle" fill="var(--color-primary)">加入其他元素</text>
  <rect x="100" y="135" width="100" height="30" fill="var(--color-bg-secondary)" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <text x="150" y="155" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">合金性能优于纯金属</text>
</svg>

### 例题解析

**问题**：为什么制造飞机外壳常用铝合金而不用纯铝？

**解答**：

铝合金与纯铝相比具有：
- **硬度更大**，能承受更大压力；
- **抗腐蚀性更强**，延长使用寿命；
- **熔点较低**，便于加工成型；
- 密度小，**重量轻**，符合航空需求。

### 举一反三

**练习1**：下列物质中属于合金的是？①生铁 ②钢 ③黄铜 ④24K金 ⑤硬铝
- 答案：①②③⑤属于合金；24K金是纯金属（纯金）。

**练习2**：为什么菜刀、锤子等常用铁制工具要用钢而不用纯铁？
- 答案：钢是铁合金，硬度比纯铁大，机械性能更好；纯铁较软，不适合制作工具。

### 拓展知识

- **生铁**含碳量2%~4.3%，**钢**含碳量0.03%~2%，钢比生铁硬度大且韧性更好。
- **黄铜**是铜锌合金，**青铜**是铜锡合金，是人类最早使用的合金之一。
- **钛合金**具有密度小、强度高、耐腐蚀、生物相容性好等特点，被称为"21世纪金属"。`
  },
  {
    id: 'chem_021',
    title: '金属的化学性质',
    stage: 'middle',
    chapter: '金属和金属材料',
    tags: ['金属', '化学性质', '金属活动性顺序', '置换反应'],
    content: `## 金属的化学性质

### 核心概念

**金属与氧气反应**：大多数金属能与氧气反应生成金属氧化物，反应难易程度不同。

**金属与酸反应**：在金属活动性顺序中**位于氢前**的金属能与稀盐酸或稀硫酸反应生成氢气。

**金属与盐溶液反应**：较活泼金属能把较不活泼金属从其盐溶液中置换出来。

**金属活动性顺序**：K Ca Na Mg Al Zn Fe Sn Pb (H) Cu Hg Ag Pt Au，从左到右活动性逐渐减弱。

**置换反应**：单质与化合物反应生成另一种单质和另一种化合物的反应，$A + BC = AC + B$。

### 化学方程式总结

| 反应类型 | 化学方程式 |
|---------|-----------|
| 镁与氧气 | $2Mg + O_2 = 2MgO$ |
| 铁与氧气 | $3Fe + 2O_2 = Fe_3O_4$ |
| 铝与氧气 | $4Al + 3O_2 = 2Al_2O_3$ |
| 锌与稀硫酸 | $Zn + H_2SO_4 = ZnSO_4 + H_2↑$ |
| 铁与稀盐酸 | $Fe + 2HCl = FeCl_2 + H_2↑$ |
| 铁与硫酸铜 | $Fe + CuSO_4 = FeSO_4 + Cu$ |
| 铜与硝酸银 | $Cu + 2AgNO_3 = Cu(NO_3)_2 + 2Ag$ |

### 实验示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <rect x="20" y="60" width="60" height="100" fill="none" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <rect x="25" y="100" width="50" height="55" fill="var(--color-primary)" opacity="0.4" />
  <text x="50" y="90" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">Fe</text>
  <text x="50" y="50" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">CuSO4溶液</text>
  <circle cx="40" cy="110" r="2" fill="var(--color-primary)" />
  <circle cx="55" cy="115" r="2" fill="var(--color-primary)" />
  <circle cx="45" cy="125" r="2" fill="var(--color-primary)" />
  <rect x="120" y="60" width="60" height="100" fill="none" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <rect x="125" y="100" width="50" height="55" fill="var(--color-primary)" opacity="0.2" />
  <text x="150" y="90" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">Cu</text>
  <text x="150" y="50" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">AgNO3溶液</text>
  <circle cx="140" cy="115" r="2" fill="var(--color-text-primary)" />
  <circle cx="155" cy="120" r="2" fill="var(--color-text-primary)" />
  <rect x="220" y="60" width="60" height="100" fill="none" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <rect x="225" y="100" width="50" height="55" fill="var(--color-bg-secondary)" />
  <text x="250" y="90" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">Zn</text>
  <text x="250" y="50" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">稀盐酸</text>
  <circle cx="240" cy="120" r="2" fill="var(--color-primary)" />
  <circle cx="255" cy="115" r="2" fill="var(--color-primary)" />
  <path d="M245 130 Q250 110 255 130" stroke="var(--color-primary)" stroke-width="1" fill="none" />
  <text x="50" y="180" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">铁置换铜</text>
  <text x="150" y="180" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">铜置换银</text>
  <text x="250" y="180" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">锌制氢气</text>
</svg>

### 例题解析

**问题**：将铁片分别放入硫酸铜溶液、稀盐酸、硝酸银溶液中，哪些能反应？写出方程式并说明现象。

**解答**：

铁的活动性：Fe > (H) > Cu > Ag

1. **硫酸铜溶液**：能反应。$Fe + CuSO_4 = FeSO_4 + Cu$，现象是铁片表面覆盖一层**红色**物质，溶液由**蓝色**变为**浅绿色**。
2. **稀盐酸**：能反应。$Fe + 2HCl = FeCl_2 + H_2↑$，现象是有**气泡**产生，溶液变为**浅绿色**。
3. **硝酸银溶液**：能反应。$Fe + 2AgNO_3 = Fe(NO_3)_2 + 2Ag$，现象是铁片表面覆盖一层**银白色**物质。

### 举一反三

**练习1**：下列金属中不能与稀硫酸反应产生氢气的是？Mg、Cu、Zn、Al
- 答案：Cu。因为在金属活动性顺序中Cu位于氢之后，不能置换酸中的氢。

**练习2**：用同质量的三种金属Mg、Fe、Zn分别与足量稀硫酸反应，产生氢气由多到少的顺序？
- 答案：Mg > Fe > Zn。设金属质量为m，相对原子质量越小，生成H2越多（Mg:24，Fe:56，Zn:65）。

### 拓展知识

- **铝的抗腐蚀性**：铝在空气中易被氧化生成致密氧化铝薄膜（$4Al + 3O_2 = 2Al_2O_3$），保护内部金属不再被腐蚀。
- **黄金**在自然界中以单质形式存在，因为其化学性质非常**稳定**。
- **金属活动性顺序**是判断金属能否发生置换反应的重要依据。`
  },
  {
    id: 'chem_022',
    title: '金属资源的利用和保护',
    stage: 'middle',
    chapter: '金属和金属材料',
    tags: ['铁的冶炼', '金属腐蚀', '金属防护', '资源保护'],
    content: `## 金属资源的利用和保护

### 核心概念

**铁的冶炼**：以铁矿石（主要成分Fe2O3）、焦炭、石灰石、空气为原料，在高炉中高温下用CO还原铁矿石得到生铁。

**金属的腐蚀**：铁生锈是铁与**水**和**氧气**共同作用的结果，是缓慢氧化过程。

**金属防护**：通过破坏生锈条件（隔绝水或氧气）来防止金属腐蚀。

**金属资源保护**：金属矿物是不可再生资源，需合理开采利用，并加强废旧金属的回收利用。

### 化学方程式总结

| 反应 | 化学方程式 |
|------|-----------|
| 一氧化碳还原氧化铁 | $3CO + Fe_2O_3 = 2Fe + 3CO_2$ |
| 一氧化碳还原氧化铜 | $CO + CuO = Cu + CO_2$ |
| 碳不完全燃烧 | $2C + O_2 = 2CO$ |
| 铁与盐酸除锈 | $Fe_2O_3 + 6HCl = 2FeCl_3 + 3H_2O$ |
| 铁与硫酸铜 | $Fe + CuSO_4 = FeSO_4 + Cu$ |

### 实验示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <path d="M80 60 L220 60 L210 130 L90 130 Z" fill="none" stroke="var(--color-text-primary)" stroke-width="2" />
  <rect x="90" y="80" width="120" height="50" fill="var(--color-primary)" opacity="0.3" />
  <text x="150" y="105" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">铁矿石+焦炭</text>
  <text x="150" y="120" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">石灰石</text>
  <path d="M50 80 L80 80" stroke="var(--color-text-secondary)" stroke-width="2" />
  <text x="40" y="83" font-size="9" text-anchor="end" fill="var(--color-text-secondary)">热空气</text>
  <path d="M220 80 L250 80" stroke="var(--color-text-secondary)" stroke-width="2" />
  <text x="260" y="83" font-size="9" fill="var(--color-text-secondary)">高炉煤气</text>
  <path d="M150 130 L150 165" stroke="var(--color-primary)" stroke-width="2" />
  <polygon points="148,160 152,160 150,168" fill="var(--color-primary)" />
  <rect x="120" y="170" width="60" height="20" fill="var(--color-bg-secondary)" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="150" y="183" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">生铁出口</text>
  <text x="150" y="45" font-size="11" text-anchor="middle" fill="var(--color-primary)">高炉炼铁示意图</text>
</svg>

### 例题解析

**问题**：用1000t含氧化铁80%的赤铁矿石，理论上可以炼出含杂质4%的生铁多少吨？（Fe=56，O=16）

**解答**：

Fe2O3中Fe的质量分数：$\\frac{2×56}{2×56+3×16} = \\frac{112}{160} = 70\\%$

纯铁质量：$1000t × 80\\% × 70\\% = 560t$

生铁质量：$\\frac{560t}{1 - 4\\%} ≈ 583.3t$

### 举一反三

**练习1**：铁钉在下列哪种情况下最容易生锈？①干燥空气中 ②浸没在煮沸的蒸馏水中 ③部分浸入食盐水中
- 答案：③最容易生锈。生锈需要水和氧气，部分浸入能同时接触空气和水；食盐能加速电化学腐蚀。

**练习2**：自行车链条防锈可采用哪些方法？分别破坏了什么条件？
- 答案：①涂油（隔绝水和氧气）；②镀锌（隔绝氧气和水，且锌有保护作用）；③保持干燥（破坏水的条件）。

### 拓展知识

- **保护金属资源的途径**：①防止金属腐蚀；②回收利用废旧金属；③合理开采矿物；④寻找代用品。
- **"湿法炼铜"**：我国西汉时期已发明，原理是$Fe + CuSO_4 = FeSO_4 + Cu$。
- **不锈钢**是在铁中加入铬、镍等元素形成的合金，抗腐蚀性能好。`
  },
  {
    id: 'chem_023',
    title: '溶液',
    stage: 'middle',
    chapter: '溶液',
    tags: ['溶液', '溶质', '溶剂', '溶解', '乳化'],
    content: `## 溶液

### 核心概念

**溶液**：一种或几种物质分散到另一种物质里，形成的**均一、稳定**的混合物。

**溶质**：被溶解的物质（可以是固体、液体或气体）。

**溶剂**：能溶解其他物质的物质（常见的有水、酒精、汽油等）。

**均一性**：溶液各部分的性质、浓度完全相同。

**稳定性**：外界条件不变时，溶质不会从溶液中分离出来。

**乳化**：植物油在水中加入乳化剂（如洗洁精）后形成的乳浊液现象，乳化后的小液滴能均匀分散。

### 溶解时的热量变化

| 溶质 | 溶解过程 | 温度变化 |
|------|---------|---------|
| NaOH | 放热 | 升高 |
| 浓硫酸 | 放热 | 升高 |
| NH4NO3 | 吸热 | 降低 |
| NaCl | 几乎不变 | 几乎不变 |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="60" y="40" width="50" height="100" fill="none" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <rect x="65" y="80" width="40" height="55" fill="var(--color-primary)" opacity="0.3" />
  <text x="85" y="30" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">NaOH+水</text>
  <path d="M75 70 L85 70 L80 60 Z" fill="var(--color-primary)" />
  <path d="M70 50 L85 50" stroke="var(--color-primary)" stroke-width="2" />
  <text x="85" y="160" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">温度升高</text>
  <rect x="125" y="40" width="50" height="100" fill="none" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <rect x="130" y="80" width="40" height="55" fill="var(--color-bg-secondary)" />
  <text x="150" y="30" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">NaCl+水</text>
  <text x="150" y="160" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">温度不变</text>
  <rect x="190" y="40" width="50" height="100" fill="none" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <rect x="195" y="80" width="40" height="55" fill="var(--color-primary)" opacity="0.1" />
  <text x="215" y="30" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">NH4NO3+水</text>
  <path d="M210 70 L200 70 L205 60 Z" fill="var(--color-text-secondary)" />
  <text x="215" y="160" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">温度降低</text>
  <text x="150" y="175" font-size="11" text-anchor="middle" fill="var(--color-primary)">溶解吸放热对比</text>
</svg>

### 例题解析

**问题**：将少量植物油分别加入水和汽油中，振荡后观察现象有何不同？加入洗洁精后呢？

**解答**：

- **植物油+水**：振荡形成乳浊液，静置后分层（植物油浮在水面），因为植物油不溶于水。
- **植物油+汽油**：植物油能溶解在汽油中，形成均一、稳定的溶液。
- **植物油+水+洗洁精**：洗洁精起**乳化作用**，使植物油分散成无数细小液滴，形成稳定的乳浊液，不再分层（去污原理）。

### 举一反三

**练习1**：下列混合物属于溶液的是？①泥水 ②碘酒 ③植物油溶于汽油 ④牛奶
- 答案：②③是溶液。①泥水是悬浊液，④牛奶是乳浊液。

**练习2**：把高锰酸钾溶于水形成紫红色溶液，其中溶质和溶剂分别是什么？
- 答案：溶质是高锰酸钾（KMnO4），溶剂是水。

### 拓展知识

- **溶液不一定是无色的**：CuSO4溶液是蓝色，FeSO4溶液是浅绿色，FeCl3溶液是黄色，KMnO4溶液是紫红色。
- 最常见的溶剂是**水**，但酒精、汽油等也可作溶剂（如碘酒以酒精为溶剂）。
- **溶液的质量** = 溶质质量 + 溶剂质量，但**体积不能简单相加**（分子间有间隔）。`
  },
  {
    id: 'chem_024',
    title: '溶解度',
    stage: 'middle',
    chapter: '溶液',
    tags: ['溶解度', '饱和溶液', '不饱和溶液', '溶解度曲线'],
    content: `## 溶解度

### 核心概念

**饱和溶液**：在一定温度下，向一定量溶剂里加入某种溶质，当**不能继续溶解**时所得到的溶液。

**不饱和溶液**：在一定温度下，还能继续溶解某种溶质的溶液。

**固体溶解度**：在一定温度下，某固态物质在**100g溶剂**（通常是水）里达到饱和状态时所溶解的**质量**（单位：g）。

**溶解度曲线**：表示物质溶解度随温度变化关系的曲线。

**气体溶解度**：在压强为101kPa和一定温度时，气体溶解在1体积水里达到饱和状态时的气体体积数。

### 饱和与不饱和的转化

| 转化方向 | 方法 | 适用条件 |
|---------|------|---------|
| 不饱和→饱和 | 加溶质 | 一般情况 |
| 不饱和→饱和 | 蒸发溶剂 | 一般情况 |
| 不饱和→饱和 | 降低温度 | 大多数固体（如KNO3） |
| 饱和→不饱和 | 加溶剂 | 一般情况 |
| 饱和→不饱和 | 升高温度 | 大多数固体（如KNO3） |

### 实验示意图

<svg width="300" height="200" viewBox="0 0 300 200">
  <rect x="40" y="30" width="230" height="140" fill="none" stroke="var(--color-text-primary)" stroke-width="2" />
  <line x1="50" y1="160" x2="270" y2="160" stroke="var(--color-text-primary)" stroke-width="1" />
  <line x1="50" y1="40" x2="50" y2="160" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="160" y="180" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">温度(℃)</text>
  <text x="20" y="100" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)" transform="rotate(-90 20 100)">溶解度(g)</text>
  <path d="M50 130 Q120 80 200 50 L260 40" stroke="var(--color-primary)" stroke-width="2" fill="none" />
  <text x="220" y="55" font-size="9" fill="var(--color-primary)">KNO3</text>
  <path d="M50 110 L260 110" stroke="var(--color-text-secondary)" stroke-width="2" />
  <text x="240" y="105" font-size="9" fill="var(--color-text-secondary)">NaCl</text>
  <path d="M50 80 Q90 90 130 100 Q180 130 260 150" stroke="var(--color-primary)" stroke-width="2" fill="none" opacity="0.6" />
  <text x="200" y="140" font-size="9" fill="var(--color-primary)" opacity="0.6">Ca(OH)2</text>
  <circle cx="120" cy="100" r="3" fill="var(--color-text-primary)" />
  <text x="115" y="120" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">交点</text>
  <text x="150" y="25" font-size="11" text-anchor="middle" fill="var(--color-primary)">溶解度曲线图</text>
</svg>

### 例题解析

**问题**：已知20℃时KNO3的溶解度为31.6g。在20℃时将20g KNO3加入50g水中，充分溶解后得到的是饱和溶液还是不饱和溶液？溶液质量为多少？

**解答**：

20℃时，100g水最多溶解31.6g KNO3，则50g水最多溶解：$\\frac{31.6g}{2} = 15.8g$

20g > 15.8g，故KNO3不能完全溶解，得到的是**饱和溶液**。

溶液质量 = 溶质质量 + 溶剂质量 = $15.8g + 50g = 65.8g$

### 举一反三

**练习1**：要使KNO3饱和溶液变为不饱和溶液，可采用哪些方法？
- 答案：①加溶剂（水）；②升高温度（KNO3溶解度随温度升高而增大）。

**练习2**：从KNO3和NaCl混合溶液中得到较纯净的KNO3，可采用什么方法？为什么？
- 答案：**冷却热饱和溶液（结晶法）**。因为KNO3溶解度随温度变化大，NaCl溶解度随温度变化小，降温后KNO3大量结晶析出，NaCl仍留在溶液中。

### 拓展知识

- **气体的溶解度随温度升高而减小**，随压强增大而增大。所以打开汽水瓶盖（压强减小）会有气体逸出。
- 夏天池塘缺氧是因为**温度升高**导致水中氧气溶解度减小。
- **结晶方法**：①冷却热饱和溶液（适用于溶解度随温度变化大的物质，如KNO3）；②蒸发溶剂（适用于溶解度随温度变化小的物质，如NaCl）。`
  },
  {
    id: 'chem_025',
    title: '溶液的浓度',
    stage: 'middle',
    chapter: '溶液',
    tags: ['溶质质量分数', '溶液配制', '浓度'],
    content: `## 溶液的浓度

### 核心概念

**溶质的质量分数**：溶质质量与溶液质量之比，是表示溶液浓度的常用方法。

**计算公式**：溶质质量分数 = $\\frac{溶质质量}{溶液质量} × 100\\% = \\frac{溶质质量}{溶质质量 + 溶剂质量} × 100\\%$

**溶液稀释定律**：稀释前后**溶质质量不变**。$m_1 × w_1 = m_2 × w_2$

**配制一定质量分数溶液的步骤**：计算→称量（固体）或量取（液体）→溶解→装瓶贴签。

### 公式总结

| 公式 | 说明 |
|------|------|
| $w = \\frac{m_{质}}{m_{液}} × 100\\%$ | 溶质质量分数定义式 |
| $m_{质} = m_{液} × w$ | 求溶质质量 |
| $m_{剂} = m_{液} - m_{质}$ | 求溶剂质量 |
| $m_1 w_1 = m_2 w_2$ | 稀释定律 |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="20" y="60" width="60" height="80" fill="none" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <rect x="25" y="85" width="50" height="50" fill="var(--color-primary)" opacity="0.3" />
  <text x="50" y="50" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">NaCl</text>
  <text x="50" y="155" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">称量</text>
  <path d="M80 90 L120 90" stroke="var(--color-text-secondary)" stroke-width="2" stroke-dasharray="3,2" />
  <polygon points="115,87 120,90 115,93" fill="var(--color-text-secondary)" />
  <rect x="120" y="60" width="60" height="80" fill="none" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <rect x="125" y="100" width="50" height="35" fill="var(--color-primary)" opacity="0.2" />
  <text x="150" y="50" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">量水</text>
  <text x="150" y="155" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">量取</text>
  <path d="M180 90 L220 90" stroke="var(--color-text-secondary)" stroke-width="2" stroke-dasharray="3,2" />
  <polygon points="215,87 220,90 215,93" fill="var(--color-text-secondary)" />
  <path d="M230 60 L260 60 L260 90 L290 90" stroke="var(--color-text-primary)" stroke-width="2" fill="none" />
  <rect x="225" y="60" width="40" height="40" fill="none" stroke="var(--color-text-primary)" stroke-width="2" rx="20" />
  <rect x="260" y="90" width="30" height="50" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="275" y="50" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">溶解</text>
  <text x="275" y="155" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">搅拌</text>
  <text x="150" y="175" font-size="11" text-anchor="middle" fill="var(--color-primary)">配制溶液步骤</text>
</svg>

### 例题解析

**问题**：配制100g质量分数为10%的NaCl溶液，需要NaCl和水的质量各为多少？简述配制步骤。

**解答**：

- NaCl质量：$100g × 10\\% = 10g$
- 水的质量：$100g - 10g = 90g$（即90mL水）

**配制步骤**：
1. **计算**：NaCl 10g，水 90g
2. **称量**：用托盘天平称取10g NaCl
3. **量取**：用量筒量取90mL水
4. **溶解**：将NaCl倒入烧杯，加入水，用玻璃棒搅拌至完全溶解
5. **装瓶贴签**：装入试剂瓶，贴上标签注明"10% NaCl溶液"

### 举一反三

**练习1**：将50g 20%的NaCl溶液加水稀释至100g，稀释后溶液的质量分数是多少？
- 答案：$w = \\frac{50g × 20\\%}{100g} × 100\\% = 10\\%$

**练习2**：100g某NaCl溶液蒸发掉20g水后，溶质质量分数由10%变为多少？
- 答案：原溶质质量$= 100g × 10\\% = 10g$；蒸发后溶液质量$= 100g - 20g = 80g$；$w = \\frac{10g}{80g} × 100\\% = 12.5\\%$

### 拓展知识

- 配制溶液时**玻璃棒的作用**是搅拌，加快溶解速率。
- 量筒量取液体时，视线应与**液体凹液面最低处**保持水平。
- **浓硫酸稀释**时，必须将浓硫酸沿器壁慢慢注入水中，并用玻璃棒搅拌散热，**切勿将水倒入浓硫酸中**。`
  },
  {
    id: 'chem_026',
    title: '常见的酸和碱',
    stage: 'middle',
    chapter: '酸和碱',
    tags: ['酸', '碱', '盐酸', '硫酸', '氢氧化钠', '氢氧化钙'],
    content: `## 常见的酸和碱

### 核心概念

**酸**：在水溶液中电离出的阳离子全部是H+的化合物。常见的酸有盐酸（HCl）和硫酸（H2SO4）。

**碱**：在水溶液中电离出的阴离子全部是OH-的化合物。常见的碱有氢氧化钠（NaOH）和氢氧化钙（Ca(OH)2）。

**浓硫酸的特性**：具有**吸水性**（可作干燥剂）、**脱水性**（使有机物碳化）、强腐蚀性。

**氢氧化钠的特性**：俗称**烧碱、火碱、苛性钠**，极易溶于水放热，易潮解（可作干燥剂）。

**氢氧化钙的特性**：俗称**熟石灰、消石灰**，微溶于水，其水溶液俗称石灰水。

### 化学方程式总结

| 反应 | 化学方程式 |
|------|-----------|
| 铁与盐酸 | $Fe + 2HCl = FeCl_2 + H_2↑$ |
| 锌与稀硫酸 | $Zn + H_2SO_4 = ZnSO_4 + H_2↑$ |
| 氧化铁与盐酸 | $Fe_2O_3 + 6HCl = 2FeCl_3 + 3H_2O$ |
| 氢氧化钠与盐酸 | $NaOH + HCl = NaCl + H_2O$ |
| 氢氧化钙与碳酸钠 | $Ca(OH)_2 + Na_2CO_3 = CaCO_3↓ + 2NaOH$ |
| 二氧化碳与氢氧化钠 | $2NaOH + CO_2 = Na_2CO_3 + H_2O$ |
| 氢氧化钠与硫酸铜 | $2NaOH + CuSO_4 = Cu(OH)_2↓ + Na_2SO_4$ |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="30" y="50" width="60" height="100" fill="none" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <rect x="35" y="90" width="50" height="55" fill="var(--color-primary)" opacity="0.3" />
  <text x="60" y="40" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">稀盐酸</text>
  <text x="60" y="170" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">无色</text>
  <rect x="120" y="50" width="60" height="100" fill="none" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <rect x="125" y="90" width="50" height="55" fill="var(--color-primary)" opacity="0.2" />
  <text x="150" y="40" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">NaOH溶液</text>
  <text x="150" y="170" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">无色</text>
  <rect x="210" y="50" width="60" height="100" fill="none" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <rect x="215" y="90" width="50" height="55" fill="var(--color-primary)" opacity="0.5" />
  <text x="240" y="40" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">石蕊试液</text>
  <text x="240" y="170" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">紫色</text>
  <path d="M90 80 L120 80" stroke="var(--color-text-secondary)" stroke-width="2" stroke-dasharray="3,2" />
  <text x="150" y="155" font-size="10" text-anchor="middle" fill="var(--color-primary)">酸碱指示剂反应</text>
</svg>

### 例题解析

**问题**：如何用化学方法鉴别稀盐酸和NaOH溶液两种无色液体？

**解答**：

方法一（用石蕊试液）：取少量待测液于试管中，滴入紫色石蕊试液。变**红色**的是稀盐酸，变**蓝色**的是NaOH溶液。

方法二（用酚酞试液）：取少量待测液，滴入无色酚酞试液。变**红色**的是NaOH溶液，**不变色**的是稀盐酸。

方法三（用pH试纸）：用玻璃棒蘸取待测液滴在pH试纸上。pH<7的是稀盐酸，pH>7的是NaOH溶液。

### 举一反三

**练习1**：为什么浓硫酸可以作干燥剂？它能干燥哪些气体？
- 答案：浓硫酸具有**吸水性**，能吸收气体中的水蒸气。可干燥H2、O2、CO2等，但不能干燥NH3（碱性气体，会与酸反应）。

**练习2**：写出NaOH固体露置在空气中变质的化学方程式。
- 答案：$2NaOH + CO_2 = Na_2CO_3 + H_2O$。NaOH易吸收空气中的CO2和水分而变质。

### 拓展知识

- **酸的通性**：①使指示剂变色；②与活泼金属反应产生H2；③与金属氧化物反应生成盐和水；④与碱发生中和反应；⑤与某些盐反应。
- **碱的通性**：①使指示剂变色；②与非金属氧化物反应；③与酸发生中和反应；④与某些盐反应。
- **浓硫酸稀释**时放出大量热，必须"酸入水"并搅拌；若水入酸，水沸腾会带出酸液造成飞溅伤人。`
  },
  {
    id: 'chem_027',
    title: '中和反应及其应用',
    stage: 'middle',
    chapter: '酸和碱',
    tags: ['中和反应', 'pH值', '酸碱度', '盐'],
    content: `## 中和反应及其应用

### 核心概念

**中和反应**：酸与碱作用生成**盐和水**的反应。中和反应是**复分解反应**的一种，反应过程**放热**。

**盐**：由金属离子（或铵根离子）和酸根离子组成的化合物。

**pH值**：表示溶液酸碱度的物理量，范围0~14。

**pH值的意义**：pH=7溶液呈中性；pH<7呈酸性，越小酸性越强；pH>7呈碱性，越大碱性越强。

**测定pH的方法**：①用pH试纸（粗略测定）；②用pH计（精确测定）。

### pH值范围与酸碱性

| pH范围 | 酸碱性 | 实例 |
|--------|-------|------|
| pH < 7 | 酸性 | 食醋(pH≈3)、胃液(pH≈1) |
| pH = 7 | 中性 | 蒸馏水、食盐水 |
| pH > 7 | 碱性 | 肥皂水(pH≈10)、小苏打溶液 |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="20" y="40" width="260" height="30" fill="var(--color-primary)" opacity="0.6" />
  <rect x="20" y="70" width="260" height="10" fill="var(--color-bg-secondary)" />
  <rect x="20" y="80" width="260" height="20" fill="var(--color-primary)" opacity="0.2" />
  <rect x="20" y="100" width="260" height="40" fill="var(--color-primary)" opacity="0.4" />
  <text x="40" y="60" font-size="10" fill="var(--color-text-primary)">0</text>
  <text x="145" y="60" font-size="10" fill="var(--color-text-primary)">酸性</text>
  <text x="240" y="60" font-size="10" fill="var(--color-text-primary)">7</text>
  <text x="60" y="120" font-size="10" fill="var(--color-text-primary)">碱性</text>
  <text x="40" y="155" font-size="9" fill="var(--color-text-secondary)">强酸</text>
  <text x="240" y="155" font-size="9" fill="var(--color-text-secondary)">强碱</text>
  <text x="150" y="30" font-size="11" text-anchor="middle" fill="var(--color-primary)">pH值与酸碱度</text>
  <text x="150" y="170" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">0━━━━━━━━7━━━━━━━━14</text>
</svg>

### 例题解析

**问题**：在滴有酚酞的NaOH溶液中逐滴加入稀盐酸至过量，描述现象并写出反应方程式。

**解答**：

化学方程式：$NaOH + HCl = NaCl + H_2O$

**实验现象**：溶液由**红色**逐渐变为**无色**，反应过程中放出热量。

**分析**：NaOH溶液呈碱性使酚酞变红；加入HCl后发生中和反应，OH-被消耗；当恰好完全反应时溶液呈中性（pH=7），酚酞变为无色；继续加HCl溶液呈酸性，仍为无色。

### 举一反三

**练习1**：被蚊虫叮咬后（蚊虫分泌蚁酸），可涂抹肥皂水或氨水缓解，原理是什么？
- 答案：蚁酸（酸性）与肥皂水或氨水（碱性）发生中和反应，$HCOOH + NH_3·H_2O = HCOONH_4 + H_2O$，减轻痛痒。

**练习2**：农业上常用熟石灰改良酸性土壤，写出反应原理。
- 答案：$Ca(OH)_2 + 2HCl = CaCl_2 + 2H_2O$（盐酸代表土壤中的酸）。中和反应使土壤pH升高，达到改良目的。

### 拓展知识

- **中和反应的应用**：①农业改良酸性土壤（用熟石灰）；②工业处理废水（用熟石灰处理硫酸废水：$Ca(OH)_2 + H_2SO_4 = CaSO_4 + 2H_2O$）；③医疗治胃酸过多（用Al(OH)3：$Al(OH)_3 + 3HCl = AlCl_3 + 3H_2O$）。
- 测定pH时，**pH试纸不能用水润湿**，否则会稀释待测液，导致酸性溶液测得pH偏大、碱性溶液测得pH偏小。
- 人体血液的pH维持在**7.35~7.45**之间，超出此范围会危及生命。`
  },
  {
    id: 'chem_028',
    title: '生活中常见的盐',
    stage: 'middle',
    chapter: '盐 化肥',
    tags: ['盐', '食盐', '纯碱', '小苏打', '复分解反应'],
    content: `## 生活中常见的盐

### 核心概念

**盐**：由金属离子（或铵根离子NH4+）和酸根离子组成的化合物。

**食盐（NaCl）**：白色固体，易溶于水，是重要的调味品和化工原料。

**纯碱（Na2CO3）**：白色固体，易溶于水，水溶液呈碱性，俗称苏打。

**小苏打（NaHCO3）**：白色固体，能溶于水，受热易分解，是焙制糕点所用发酵粉的主要成分之一。

**碳酸根离子的检验**：取少量待测物于试管，滴加稀盐酸，将产生的气体通入澄清石灰水。若石灰水变浑浊，则含$CO_3^{2-}$。

### 化学方程式总结

| 反应 | 化学方程式 |
|------|-----------|
| 碳酸钠与盐酸 | $Na_2CO_3 + 2HCl = 2NaCl + H_2O + CO_2↑$ |
| 碳酸氢钠与盐酸 | $NaHCO_3 + HCl = NaCl + H_2O + CO_2↑$ |
| 碳酸氢钠受热分解 | $2NaHCO_3 = Na_2CO_3 + H_2O + CO_2↑$ |
| 碳酸钠与氢氧化钙 | $Na_2CO_3 + Ca(OH)_2 = CaCO_3↓ + 2NaOH$ |
| 碳酸钠与氯化钙 | $Na_2CO_3 + CaCl_2 = CaCO_3↓ + 2NaCl$ |
| 氯化钡与硫酸钠 | $BaCl_2 + Na_2SO_4 = BaSO_4↓ + 2NaCl$ |

### 复分解反应发生条件

| 条件 | 说明 |
|------|------|
| 生成沉淀 | 反应物必须可溶，产物中有沉淀生成 |
| 生成气体 | 反应生成气体（如CO2、NH3） |
| 生成水 | 反应生成水或弱电解质 |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="30" y="50" width="60" height="90" fill="none" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <rect x="35" y="90" width="50" height="45" fill="var(--color-primary)" opacity="0.3" />
  <text x="60" y="40" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">Na2CO3</text>
  <path d="M90 95 L120 95" stroke="var(--color-text-secondary)" stroke-width="2" stroke-dasharray="3,2" />
  <text x="105" y="90" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">+HCl</text>
  <rect x="120" y="50" width="60" height="90" fill="none" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <rect x="125" y="90" width="50" height="45" fill="var(--color-primary)" opacity="0.2" />
  <circle cx="140" cy="110" r="2" fill="var(--color-primary)" />
  <circle cx="155" cy="100" r="2" fill="var(--color-primary)" />
  <circle cx="165" cy="115" r="2" fill="var(--color-primary)" />
  <text x="150" y="40" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">反应中</text>
  <path d="M180 95 L210 95" stroke="var(--color-text-secondary)" stroke-width="2" stroke-dasharray="3,2" />
  <text x="195" y="90" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">→</text>
  <rect x="210" y="50" width="60" height="90" fill="none" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <rect x="215" y="90" width="50" height="45" fill="var(--color-bg-secondary)" />
  <text x="240" y="40" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">NaCl溶液</text>
  <text x="240" y="80" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">CO2↑</text>
  <text x="150" y="160" font-size="11" text-anchor="middle" fill="var(--color-primary)">碳酸盐与酸反应</text>
</svg>

### 例题解析

**问题**：如何鉴别NaCl、Na2CO3、NaHCO3三种白色固体？写出所用试剂和现象。

**解答**：

**第一步**：分别取少量三种固体于试管，加热。

- NaHCO3受热分解产生气体，将气体通入石灰水变浑浊：$2NaHCO_3 = Na_2CO_3 + H_2O + CO_2↑$
- NaCl、Na2CO3受热无明显现象。

**第二步**：取剩余两种固体，分别加盐酸，将产生的气体通入石灰水。

- 产生气体使石灰水变浑浊的是Na2CO3：$Na_2CO_3 + 2HCl = 2NaCl + H_2O + CO_2↑$
- 无明显现象的是NaCl。

### 举一反三

**练习1**：判断下列反应能否发生并说明理由：①NaCl+KNO3 ②NaOH+HCl ③CaCO3+NaOH
- 答案：①不能，无沉淀、气体、水生成；②能，生成水（中和反应）；③不能，CaCO3难溶且不符合复分解反应条件。

**练习2**：纯碱可以代替NaOH制取NaOH，写出化学方程式。
- 答案：$Na_2CO_3 + Ca(OH)_2 = CaCO_3↓ + 2NaOH$。反应生成CaCO3沉淀，过滤后得到NaOH溶液。这是工业制取烧碱（苛化法）的原理。

### 拓展知识

- **食盐的用途**：①调味；②防腐（腌制食品）；③制取化工产品（电解饱和食盐水制NaOH、Cl2、H2）；④融雪（降低水的凝固点）。
- **纯碱不是碱而是盐**，其水溶液因CO3²⁻水解而呈碱性。
- **复分解反应**的特点是反应物和生成物中各元素的化合价都不改变，是**非氧化还原反应**。`
  },
  {
    id: 'chem_029',
    title: '化学肥料',
    stage: 'middle',
    chapter: '盐 化肥',
    tags: ['化学肥料', '氮肥', '磷肥', '钾肥', '复合肥'],
    content: `## 化学肥料

### 核心概念

**化学肥料**：用化学方法合成或加工的含有植物所需营养元素的肥料，简称化肥。

**氮肥**：含有氮元素的化肥，如尿素$CO(NH_2)_2$、硝酸铵$NH_4NO_3$、硫酸铵$(NH_4)_2SO_4$、氯化铵$NH_4Cl$等。作用：促进植物茎叶生长，使叶色浓绿。

**磷肥**：含有磷元素的化肥，如过磷酸钙、重过磷酸钙等。作用：促进根系发育，提早成熟，增强抗寒抗旱能力。

**钾肥**：含有钾元素的化肥，如氯化钾KCl、硫酸钾K2SO4等。作用：使茎秆粗壮，抗倒伏，抗病虫害。

**复合肥**：同时含有**两种或两种以上**营养元素（N、P、K）的化肥，如磷酸二氢铵$NH_4H_2PO_4$、硝酸钾$KNO_3$。

### 常见化肥分类

| 类别 | 代表物质 | 化学式 | 主要作用 |
|------|---------|--------|---------|
| 氮肥 | 尿素 | $CO(NH_2)_2$ | 促进茎叶生长 |
| 氮肥 | 硝酸铵 | $NH_4NO_3$ | 促进茎叶生长 |
| 磷肥 | 过磷酸钙 | $Ca(H_2PO_4)_2·CaSO_4$ | 促进根系发育 |
| 钾肥 | 氯化钾 | $KCl$ | 增强抗倒伏能力 |
| 复合肥 | 磷酸二氢铵 | $NH_4H_2PO_4$ | 含N、P元素 |
| 复合肥 | 硝酸钾 | $KNO_3$ | 含N、K元素 |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="30" y="40" width="70" height="80" fill="none" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <rect x="35" y="80" width="60" height="35" fill="var(--color-primary)" opacity="0.3" />
  <text x="65" y="30" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">氮肥</text>
  <text x="65" y="100" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">N</text>
  <text x="65" y="135" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">促茎叶</text>
  <rect x="115" y="40" width="70" height="80" fill="none" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <rect x="120" y="80" width="60" height="35" fill="var(--color-primary)" opacity="0.5" />
  <text x="150" y="30" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">磷肥</text>
  <text x="150" y="100" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">P</text>
  <text x="150" y="135" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">促根系</text>
  <rect x="200" y="40" width="70" height="80" fill="none" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <rect x="205" y="80" width="60" height="35" fill="var(--color-primary)" opacity="0.7" />
  <text x="235" y="30" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">钾肥</text>
  <text x="235" y="100" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">K</text>
  <text x="235" y="135" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">抗倒伏</text>
  <rect x="80" y="145" width="140" height="25" fill="var(--color-bg-secondary)" stroke="var(--color-text-primary)" stroke-width="2" rx="4" />
  <text x="150" y="162" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">复合肥: N+P / N+K / N+P+K</text>
</svg>

### 例题解析

**问题**：某同学家种的植物出现"茎秆软弱、易倒伏、叶尖变黄"症状，应施用什么肥料？并写出NH4Cl与熟石灰混合研磨的化学方程式。

**解答**：

**诊断**：植物"易倒伏"是缺钾症状，"叶尖变黄"也是缺钾表现，应施用**钾肥**（如KCl或K2SO4）。

**铵态氮肥的检验**：铵盐与碱反应放出氨气：
$2NH_4Cl + Ca(OH)_2 = CaCl_2 + 2NH_3↑ + 2H_2O$

产生的氨气有**刺激性气味**，能使湿润的红色石蕊试纸变**蓝色**，借此可检验$NH_4^+$的存在。

### 举一反三

**练习1**：下列物质属于复合肥的是？①KNO3 ②NH4H2PO4 ③CO(NH2)2 ④KCl ⑤(NH4)2HPO4
- 答案：①②⑤是复合肥。复合肥需含两种或两种以上N、P、K元素。③是纯氮肥，④是纯钾肥。

**练习2**：为什么铵态氮肥不能与碱性物质混合施用？
- 答案：铵态氮肥遇碱性物质会发生反应放出氨气，降低肥效。如：$NH_4HCO_3 + Ca(OH)_2 = CaCO_3 + 2NH_3↑ + 2H_2O$，NH3挥发造成氮元素损失。

### 拓展知识

- **使用化肥的注意事项**：①铵态氮肥不能与石灰、草木灰等碱性物质混合施用；②长期施用硫酸铵会使土壤酸化板结；③化肥与农家肥配合使用效果更佳。
- **化肥的利与弊**：合理使用化肥能提高农作物产量；但过量使用会造成土壤污染、水体富营养化等环境问题。
- **氮的固定**：将空气中游离态氮转化为化合态氮的过程，如工业合成氨$N_2 + 3H_2 = 2NH_3$，豆科植物的根瘤菌也能固氮。`
  },
  {
    id: 'chem_030',
    title: '化学实验基本方法',
    stage: 'high',
    chapter: '化学实验基本方法',
    tags: ['分离提纯', '离子检验', '实验安全'],
    content: `## 化学实验基本方法

### 核心概念

**过滤**：分离不溶性固体与液体混合物的方法，依据是粒子大小不同。

**蒸发**：利用加热使溶剂挥发，提取溶质的操作。

**蒸馏**：利用沸点差分离互溶液体混合物的方法。

**萃取**：利用溶质在互不相溶的溶剂中溶解度不同进行分离的方法。

**结晶**：分离可溶性固体混合物的方法，包括蒸发结晶和冷却结晶。

**常见离子检验**：通过特征反应检验溶液中的离子。

### 化学方程式或公式总结

| 检验对象 | 试剂 | 现象 | 离子方程式 |
|---------|------|------|-----------|
| Cl⁻ | AgNO₃溶液和稀HNO₃ | 白色沉淀 | $Ag^+ + Cl^- = AgCl\\downarrow$ |
| SO₄²⁻ | BaCl₂溶液和稀HCl | 白色沉淀 | $Ba^{2+} + SO_4^{2-} = BaSO_4\\downarrow$ |
| CO₃²⁻ | 稀盐酸和澄清石灰水 | 产生使石灰水变浑浊的气体 | $CO_3^{2-} + 2H^+ = H_2O + CO_2\\uparrow$ |
| NH₄⁺ | NaOH溶液加热，湿润红色石蕊试纸 | 试纸变蓝 | $NH_4^+ + OH^- \\xrightarrow{\\Delta} NH_3\\uparrow + H_2O$ |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="40" y="20" width="80" height="40" fill="none" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="80" y="45" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">烧杯(待滤液)</text>
  <path d="M80 60 L80 80 L120 110" stroke="var(--color-text-primary)" stroke-width="2" fill="none" />
  <path d="M120 110 L120 130" stroke="var(--color-text-primary)" stroke-width="2" />
  <path d="M100 130 L140 130 L120 155 Z" fill="none" stroke="var(--color-text-primary)" stroke-width="2" />
  <line x1="105" y1="125" x2="135" y2="125" stroke="var(--color-primary)" stroke-width="3" />
  <rect x="105" y="120" width="30" height="5" fill="var(--color-border)" opacity="0.5" />
  <text x="120" y="118" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">滤纸</text>
  <rect x="95" y="155" width="50" height="20" fill="none" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="200" y="50" font-size="12" fill="var(--color-text-secondary)">①过滤分离固液</text>
  <text x="200" y="75" font-size="12" fill="var(--color-text-secondary)">②玻璃棒引流</text>
  <text x="200" y="100" font-size="12" fill="var(--color-text-secondary)">③滤纸紧贴漏斗</text>
  <text x="150" y="175" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">过滤装置示意图</text>
</svg>

### 例题解析

**问题**：现有含少量泥沙的粗盐，如何提纯得到较纯净的NaCl？写出主要操作步骤。

**解答**：

提纯步骤如下：

1. **溶解**：将粗盐溶于水，搅拌使其充分溶解。
2. **过滤**：除去不溶性泥沙，得到澄清滤液。
3. **蒸发**：将滤液倒入蒸发皿加热，不断搅拌，待出现较多固体时停止加热，利用余热蒸干。

相关方程式：$NaCl(固) \\xrightarrow{H_2O} Na^+ + Cl^-$

### 举一反三

**练习1**：如何分离乙醇和水？
- 答案：利用**蒸馏**法。乙醇沸点约78°C，水沸点100°C，控制温度在78°C左右收集乙醇蒸气。

**练习2**：用CCl₄从碘水中萃取碘，依据的原理是什么？
- 答案：碘在CCl₄中的溶解度远大于在水中的溶解度，且CCl₄与水互不相溶，下层为紫红色的碘的CCl₄溶液。

### 拓展知识

- 蒸馏时烧瓶内应加入碎瓷片防止暴沸。
- 萃取剂须满足三个条件：与原溶剂互不相溶、溶质在萃取剂中溶解度大、溶质与萃取剂不反应。
- 实验室常用的分离方法还包括分液、渗析等，分别用于分离互不相溶的液体和胶体与溶液。`
  },
  {
    id: 'chem_031',
    title: '离子反应',
    stage: 'high',
    chapter: '离子反应',
    tags: ['电解质', '电离', '离子方程式'],
    content: `## 离子反应

### 核心概念

**电解质**：在水溶液中或熔融状态下能导电的化合物，如酸、碱、盐。

**非电解质**：在水溶液和熔融状态下均不能导电的化合物，如蔗糖、酒精。

**电离**：电解质溶于水或受热熔化时，离解成自由移动离子的过程。

**离子反应**：有离子参加或生成的反应，本质是溶液中某些离子浓度的减小。

**离子方程式**：用实际参加反应的离子符号表示反应的式子。

### 化学方程式或公式总结

| 反应类型 | 化学方程式 | 离子方程式 |
|---------|-----------|-----------|
| 酸碱中和 | $HCl + NaOH = NaCl + H_2O$ | $H^+ + OH^- = H_2O$ |
| 沉淀反应 | $AgNO_3 + NaCl = AgCl\\downarrow + NaNO_3$ | $Ag^+ + Cl^- = AgCl\\downarrow$ |
| 气体生成 | $Na_2CO_3 + 2HCl = 2NaCl + H_2O + CO_2\\uparrow$ | $CO_3^{2-} + 2H^+ = H_2O + CO_2\\uparrow$ |
| 强酸制弱酸 | $CaCO_3 + 2HCl = CaCl_2 + H_2O + CO_2\\uparrow$ | $CaCO_3 + 2H^+ = Ca^{2+} + H_2O + CO_2\\uparrow$ |

### 实验示意图

<svg width="300" height="170" viewBox="0 0 300 170">
  <rect x="30" y="30" width="100" height="110" rx="5" fill="none" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="80" y="50" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">NaCl晶体</text>
  <circle cx="60" cy="75" r="6" fill="var(--color-primary)" opacity="0.7" />
  <circle cx="90" cy="90" r="6" fill="var(--color-text-secondary)" opacity="0.7" />
  <circle cx="70" cy="110" r="6" fill="var(--color-primary)" opacity="0.7" />
  <text x="80" y="135" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">未电离</text>
  <path d="M140 80 L180 80" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#arrow1)" />
  <text x="160" y="70" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">H₂O</text>
  <rect x="190" y="30" width="100" height="110" rx="5" fill="var(--color-bg-secondary)" stroke="var(--color-text-primary)" stroke-width="2" />
  <circle cx="220" cy="60" r="8" fill="var(--color-primary)" />
  <text x="220" y="64" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">+</text>
  <circle cx="260" cy="80" r="8" fill="var(--color-text-secondary)" />
  <text x="260" y="84" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">−</text>
  <circle cx="230" cy="110" r="8" fill="var(--color-primary)" />
  <circle cx="255" cy="125" r="8" fill="var(--color-text-secondary)" />
  <text x="240" y="155" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">电离后(Na⁺+Cl⁻)</text>
</svg>

### 例题解析

**问题**：写出稀硫酸与氢氧化钡溶液反应的离子方程式。

**解答**：

硫酸是强酸完全电离：$H_2SO_4 = 2H^+ + SO_4^{2-}$

氢氧化钡是强碱完全电离：$Ba(OH)_2 = Ba^{2+} + 2OH^-$

两者反应生成水和硫酸钡沉淀：

$$Ba^{2+} + 2OH^- + 2H^+ + SO_4^{2-} = BaSO_4\\downarrow + 2H_2O$$

注意：由于生成沉淀和水，所有离子均参与反应，不能约去。

### 举一反三

**练习1**：判断下列物质属于电解质的是（  ）①NaCl ②蔗糖 ③HCl ④NaOH ⑤Cu ⑥酒精
- 答案：①③④。Cu是单质既不是电解质也不是非电解质，蔗糖和酒精是非电解质。

**练习2**：写出Na₂CO₃溶液与足量稀盐酸反应的离子方程式。
- 答案：$CO_3^{2-} + 2H^+ = H_2O + CO_2\\uparrow$

### 拓展知识

- 离子方程式书写步骤：写出正确的化学方程式→把易溶易电离物质改写为离子形式→删去两边相同的离子→检查是否守恒。
- 复分解反应发生条件：生成沉淀、气体或水。
- 强电解质包括强酸(HCl、H₂SO₄、HNO₃)、强碱(NaOH、KOH、Ba(OH)₂)和大多数盐。`
  },
  {
    id: 'chem_032',
    title: '氧化还原反应',
    stage: 'high',
    chapter: '氧化还原反应',
    tags: ['氧化还原', '电子转移', '配平'],
    content: `## 氧化还原反应

### 核心概念

**氧化还原反应**：有电子转移(得失或偏移)的反应，表现为元素化合价的升降。

**氧化反应**：物质失去电子，化合价升高的反应过程。

**还原反应**：物质得到电子，化合价降低的反应过程。

**氧化剂**：得到电子(化合价降低)的物质，发生还原反应。

**还原剂**：失去电子(化合价升高)的物质，发生氧化反应。

**口诀**：升失氧，降得还；剂性反，同左伴。

### 化学方程式或公式总结

| 概念 | 变化 | 实质 |
|------|------|------|
| 氧化剂 | 化合价降低 | 得到电子 |
| 还原剂 | 化合价升高 | 失去电子 |
| 氧化产物 | 还原剂被氧化后的产物 | — |
| 还原产物 | 氧化剂被还原后的产物 | — |
| 氧化性 | 得电子能力 | 化合价降低越容易，氧化性越强 |
| 还原性 | 失电子能力 | 化合价升高越容易，还原性越强 |

**双线桥表示**：$\\overset{失去2e^-}{\\overbrace{Zn \\to Zn^{2+}}}$，$\\overset{得到2e^-}{\\overbrace{Cu^{2+} \\to Cu}}$

### 实验示意图

<svg width="300" height="160" viewBox="0 0 300 160">
  <circle cx="60" cy="80" r="25" fill="var(--color-primary)" opacity="0.8" />
  <text x="60" y="85" font-size="14" text-anchor="middle" fill="var(--color-text-primary)">Zn</text>
  <text x="60" y="125" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">化合价:0</text>
  <circle cx="240" cy="80" r="25" fill="var(--color-text-secondary)" opacity="0.8" />
  <text x="240" y="85" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">Cu²⁺</text>
  <text x="240" y="125" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">化合价:+2</text>
  <path d="M90 70 L210 70" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#arr1)" />
  <text x="150" y="60" font-size="11" text-anchor="middle" fill="var(--color-primary)">失去2e⁻(氧化)</text>
  <path d="M210 95 L90 95" stroke="var(--color-text-secondary)" stroke-width="2" marker-end="url(#arr2)" />
  <text x="150" y="115" font-size="11" text-anchor="middle" fill="var(--color-text-secondary)">得到2e⁻(还原)</text>
  <text x="150" y="150" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">Zn + Cu²⁺ = Zn²⁺ + Cu</text>
  <defs>
    <marker id="arr1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-primary)" />
    </marker>
    <marker id="arr2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-text-secondary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：用双线桥法分析反应 $Cu + 2H_2SO_4(浓) \\xrightarrow{\\Delta} CuSO_4 + SO_2\\uparrow + 2H_2O$ 中的电子转移。

**解答**：

分析化合价变化：

- Cu：0 → +2，升高2价，失去2个电子，作还原剂。
- S：+6 → +4，降低2价，得到2个电子，作氧化剂。

双线桥表示：

$$Cu \\xrightarrow[-2e^-]{\\text{氧化反应}} Cu^{2+} \\quad \\quad H_2SO_4(浓) \\xrightarrow[+2e^-]{\\text{还原反应}} SO_2$$

其中浓硫酸既表现氧化性又表现酸性(生成CuSO₄)。

### 举一反三

**练习1**：在反应 $3Cu + 8HNO_3(稀) = 3Cu(NO_3)_2 + 2NO\\uparrow + 4H_2O$ 中，被还原的HNO₃占参加反应HNO₃的几分之几？
- 答案：被还原的HNO₃生成NO，占2/8=**1/4**。其余6分子作酸生成Cu(NO₃)₂。

**练习2**：配平化学方程式：$\\_\\_KMnO_4 + \\_\\_HCl = \\_\\_KCl + \\_\\_MnCl_2 + \\_\\_Cl_2\\uparrow + \\_\\_H_2O$
- 答案：$2KMnO_4 + 16HCl = 2KCl + 2MnCl_2 + 5Cl_2\\uparrow + 8H_2O$

### 拓展知识

- 氧化还原反应的本质是电子的转移，特征是元素化合价的升降。
- 常见氧化剂：O₂、Cl₂、浓H₂SO₄、HNO₃、KMnO₄、MnO₂等。
- 常见还原剂：活泼金属、H₂、C、CO、SO₂、I⁻等。
- 配平方法：化合价升降法(电子得失法)，使化合价升高总数等于降低总数。`
  },
  {
    id: 'chem_033',
    title: '钠及其化合物',
    stage: 'high',
    chapter: '钠及其化合物',
    tags: ['钠', '过氧化钠', '碳酸钠', '碳酸氢钠'],
    content: `## 钠及其化合物

### 核心概念

**钠的物理性质**：银白色金属，质软，密度小(比水小比煤油大)，熔点低，故保存在煤油中。

**钠的化学性质**：钠极易失去电子，是强还原剂，能与水、氧气等剧烈反应。

**氧化钠(Na₂O)**：白色固体，碱性氧化物，与水反应生成NaOH。

**过氧化钠(Na₂O₂)**：淡黄色固体，强氧化剂，与水或CO₂反应放出O₂。

**碳酸钠(Na₂CO₃)**：俗称纯碱、苏打，易溶于水，水溶液呈碱性。

**碳酸氢钠(NaHCO₃)**：俗称小苏打，受热易分解，水溶液呈弱碱性。

### 化学方程式或公式总结

| 反应 | 化学方程式 | 备注 |
|------|-----------|------|
| 钠与水反应 | $2Na + 2H_2O = 2NaOH + H_2\\uparrow$ | 浮熔游响红 |
| 钠与氧气(常温) | $4Na + O_2 = 2Na_2O$ | 白色固体 |
| 钠与氧气(加热) | $2Na + O_2 \\xrightarrow{\\Delta} Na_2O_2$ | 淡黄色固体 |
| 过氧化钠与水 | $2Na_2O_2 + 2H_2O = 4NaOH + O_2\\uparrow$ | 既是氧化剂又是还原剂 |
| 过氧化钠与CO₂ | $2Na_2O_2 + 2CO_2 = 2Na_2CO_3 + O_2$ | 可用于潜水艇供氧 |
| 小苏打受热分解 | $2NaHCO_3 \\xrightarrow{\\Delta} Na_2CO_3 + H_2O + CO_2\\uparrow$ | 鉴别Na₂CO₃和NaHCO₃ |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="100" y="60" width="100" height="110" rx="3" fill="var(--color-bg-secondary)" stroke="var(--color-text-primary)" stroke-width="2" />
  <rect x="100" y="120" width="100" height="50" fill="var(--color-primary)" opacity="0.3" />
  <text x="150" y="150" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">水(含酚酞)</text>
  <circle cx="150" cy="95" r="10" fill="var(--color-primary)" opacity="0.8" />
  <text x="150" y="99" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">Na</text>
  <circle cx="135" cy="85" r="2" fill="var(--color-text-secondary)" />
  <circle cx="165" cy="80" r="2" fill="var(--color-text-secondary)" />
  <text x="150" y="78" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">H₂↑</text>
  <text x="240" y="80" font-size="11" fill="var(--color-text-secondary)">①浮:密度小</text>
  <text x="240" y="100" font-size="11" fill="var(--color-text-secondary)">②熔:熔点低</text>
  <text x="240" y="120" font-size="11" fill="var(--color-text-secondary)">③游:生成H₂</text>
  <text x="240" y="140" font-size="11" fill="var(--color-text-secondary)">④响:反应剧烈</text>
  <text x="240" y="160" font-size="11" fill="var(--color-text-secondary)">⑤红:酚酞变红</text>
  <text x="150" y="175" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">钠与水反应</text>
</svg>

### 例题解析

**问题**：将2.3g金属钠投入100g水中，反应后溶液中溶质的质量分数是多少？

**解答**：

设生成NaOH的质量为x，生成H₂的质量为y。

$$2Na + 2H_2O = 2NaOH + H_2\\uparrow$$

$$\\frac{46}{2.3} = \\frac{80}{x} = \\frac{2}{y}$$

解得：$x = 4.0g$，$y = 0.1g$

溶液质量：$2.3 + 100 - 0.1 = 102.2g$

溶质质量分数：$\\frac{4.0}{102.2} \\times 100\\% \\approx 3.91\\%$

### 举一反三

**练习1**：相同质量的Na₂O和Na₂O₂分别投入等量足量水中，所得NaOH溶液浓度是否相同？
- 答案：**相同**。由方程式知1mol Na₂O和1mol Na₂O₂均生成2mol NaOH，但Na₂O₂还放出O₂，最终溶液质量不同，但浓度需具体计算。

**练习2**：如何用实验方法鉴别Na₂CO₃和NaHCO₃固体？
- 答案：分别取少量固体于试管中加热，将产生的气体通入澄清石灰水。石灰水变浑浊的是NaHCO₃，无明显现象的是Na₂CO₃。

### 拓展知识

- 钠在自然界中以化合态存在，主要以NaCl形式存在于海水中。
- 钠的制备：电解熔融NaCl：$2NaCl(熔融) \\xrightarrow{通电} 2Na + Cl_2\\uparrow$
- Na₂O₂可用作漂白剂、消毒剂和供氧剂。
- Na₂CO₃广泛用于玻璃、造纸、纺织等工业，侯氏制碱法以NaCl、CO₂、NH₃为原料制备NaHCO₃。`
  },
  {
    id: 'chem_034',
    title: '铝及其化合物',
    stage: 'high',
    chapter: '铝及其化合物',
    tags: ['铝', '氧化铝', '氢氧化铝', '两性'],
    content: `## 铝及其化合物

### 核心概念

**铝的物理性质**：银白色金属，密度小，导电导热性强，延展性好。

**铝的化学性质**：较活泼金属，表面易形成致密氧化膜而抗腐蚀。

**氧化铝(Al₂O₃)**：白色固体，**两性氧化物**，既能与酸反应又能与碱反应。

**氢氧化铝(Al(OH)₃)**：白色胶状沉淀，**两性氢氧化物**，受热分解。

**两性**：既能与酸反应生成盐和水，又能与碱反应生成盐和水的性质。

### 化学方程式或公式总结

| 反应 | 化学方程式 | 备注 |
|------|-----------|------|
| 铝与氧气 | $4Al + 3O_2 = 2Al_2O_3$ | 形成致密氧化膜 |
| 铝与强碱 | $2Al + 2NaOH + 2H_2O = 2NaAlO_2 + 3H_2\\uparrow$ | 与非氧化性酸反应生成H₂ |
| Al₂O₃与酸 | $Al_2O_3 + 6HCl = 2AlCl_3 + 3H_2O$ | 两性 |
| Al₂O₃与碱 | $Al_2O_3 + 2NaOH = 2NaAlO_2 + H_2O$ | 两性 |
| Al(OH)₃与酸 | $Al(OH)_3 + 3HCl = AlCl_3 + 3H_2O$ | 两性 |
| Al(OH)₃与碱 | $Al(OH)_3 + NaOH = NaAlO_2 + 2H_2O$ | 两性 |
| Al(OH)₃受热分解 | $2Al(OH)_3 \\xrightarrow{\\Delta} Al_2O_3 + 3H_2O$ | — |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="100" y="40" width="100" height="120" rx="3" fill="var(--color-bg-secondary)" stroke="var(--color-text-primary)" stroke-width="2" />
  <rect x="105" y="100" width="90" height="55" fill="var(--color-primary)" opacity="0.2" />
  <text x="150" y="135" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">AlCl₃溶液</text>
  <rect x="100" y="60" width="100" height="10" fill="var(--color-text-secondary)" opacity="0.4" />
  <text x="150" y="68" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">氨水(NH₃·H₂O)</text>
  <circle cx="130" cy="110" r="4" fill="var(--color-primary)" opacity="0.6" />
  <circle cx="160" cy="120" r="4" fill="var(--color-primary)" opacity="0.6" />
  <circle cx="145" cy="115" r="3" fill="var(--color-primary)" opacity="0.6" />
  <text x="240" y="60" font-size="11" fill="var(--color-text-secondary)">①加氨水</text>
  <text x="240" y="80" font-size="11" fill="var(--color-text-secondary)">②产生白色</text>
  <text x="240" y="100" font-size="11" fill="var(--color-text-secondary)">  胶状沉淀</text>
  <text x="240" y="120" font-size="11" fill="var(--color-text-secondary)">  Al(OH)₃</text>
  <text x="150" y="170" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">制备Al(OH)₃</text>
</svg>

### 例题解析

**问题**：用铝盐溶液制备Al(OH)₃时，为何选用氨水而不用NaOH溶液？

**解答**：

因为Al(OH)₃是两性氢氧化物，能与强碱反应：

$$Al(OH)_3 + NaOH = NaAlO_2 + 2H_2O$$

若用NaOH，过量时生成的Al(OH)₃会溶解转化为NaAlO₂，难以控制。

而氨水是弱碱，不与Al(OH)₃反应：

$$Al^{3+} + 3NH_3·H_2O = Al(OH)_3\\downarrow + 3NH_4^+$$

因此用氨水可保证Al(OH)₃完全沉淀，即使过量也不溶解。

### 举一反三

**练习1**：等质量的铝分别与足量稀硫酸和NaOH溶液反应，产生H₂的物质的量之比是多少？
- 答案：**1:1**。由方程式知1mol Al无论与酸还是碱反应均生成3/2mol H₂。

**练习2**：向NaAlO₂溶液中通入CO₂至过量，有什么现象？写出方程式。
- 答案：产生白色沉淀。$NaAlO_2 + CO_2 + 2H_2O = Al(OH)_3\\downarrow + NaHCO_3$，CO₂过量生成NaHCO₃。

### 拓展知识

- 铝是地壳中含量最多的金属元素，主要以铝土矿(Al₂O₃·nH₂O)形式存在。
- 工业上用电解熔融氧化铝的方法冶炼铝：$2Al_2O_3(熔融) \\xrightarrow{通电} 4Al + 3O_2\\uparrow$，加入冰晶石(Na₃AlF₆)降低熔点。
- 铝热反应(Al与金属氧化物反应)可用于焊接钢轨：$2Al + Fe_2O_3 \\xrightarrow{点燃} 2Fe + Al_2O_3$。
- 明矾[KAl(SO₄)₂·12H₂O]可用作净水剂，原理是Al³⁺水解生成Al(OH)₃胶体吸附杂质。`
  },
  {
    id: 'chem_035',
    title: '铁及其化合物',
    stage: 'high',
    chapter: '铁及其化合物',
    tags: ['铁', 'Fe²⁺', 'Fe³⁺', '转化'],
    content: `## 铁及其化合物

### 核心概念

**铁的物理性质**：银白色金属，有磁性，质软，是应用最广泛的金属。

**铁的化学性质**：中等活泼金属，与弱氧化剂(S、HCl等)生成Fe²⁺，与强氧化剂(Cl₂、HNO₃等)生成Fe³⁺。

**Fe²⁺**：浅绿色，具有**还原性**，易被氧化为Fe³⁺。

**Fe³⁺**：棕黄色，具有**氧化性**，可被还原为Fe²⁺。

**Fe²⁺与Fe³⁺的检验**：用NaOH溶液或KSCN溶液检验。

### 化学方程式或公式总结

| 反应 | 化学方程式/离子方程式 | 备注 |
|------|---------------------|------|
| 铁与氯气 | $2Fe + 3Cl_2 \\xrightarrow{点燃} 2FeCl_3$ | 强氧化剂生成Fe³⁺ |
| 铁与硫 | $Fe + S \\xrightarrow{\\Delta} FeS$ | 弱氧化剂生成Fe²⁺ |
| Fe²⁺被Cl₂氧化 | $2Fe^{2+} + Cl_2 = 2Fe^{3+} + 2Cl^-$ | 溶液由浅绿变棕黄 |
| Fe³⁺被Fe还原 | $2Fe^{3+} + Fe = 3Fe^{2+}$ | 溶液由棕黄变浅绿 |
| Fe³⁺与Cu反应 | $2Fe^{3+} + Cu = 2Fe^{2+} + Cu^{2+}$ | 用于蚀刻电路板 |
| Fe³⁺与SCN⁻ | $Fe^{3+} + 3SCN^- = Fe(SCN)_3$ | 血红色，检验Fe³⁺ |

### 实验示意图

<svg width="300" height="170" viewBox="0 0 300 170">
  <circle cx="80" cy="85" r="30" fill="var(--color-primary)" opacity="0.4" />
  <text x="80" y="80" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">Fe²⁺</text>
  <text x="80" y="95" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">浅绿色</text>
  <circle cx="220" cy="85" r="30" fill="var(--color-text-secondary)" opacity="0.5" />
  <text x="220" y="80" font-size="12" text-anchor="middle" fill="var(--color-text-primary)">Fe³⁺</text>
  <text x="220" y="95" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">棕黄色</text>
  <path d="M115 75 L185 75" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#a1)" />
  <text x="150" y="65" font-size="10" text-anchor="middle" fill="var(--color-primary)">氧化剂(Cl₂)</text>
  <text x="150" y="55" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">失去e⁻</text>
  <path d="M185 100 L115 100" stroke="var(--color-text-secondary)" stroke-width="2" marker-end="url(#a2)" />
  <text x="150" y="115" font-size="10" text-anchor="middle" fill="var(--color-text-secondary)">还原剂(Fe,Cu)</text>
  <text x="150" y="125" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">得到e⁻</text>
  <text x="150" y="155" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">Fe²⁺ ⇌ Fe³⁺转化</text>
  <defs>
    <marker id="a1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-primary)" />
    </marker>
    <marker id="a2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-text-secondary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：证明FeCl₃溶液中是否含有Fe²⁺，可选用的试剂是什么？若有Fe²⁺，现象如何？

**解答**：

选用**KSCN溶液和氯水**。

操作：先向溶液中滴加KSCN溶液，若不变红则证明无Fe³⁺；再滴加氯水，若溶液变为血红色，则证明原溶液中含Fe²⁺。

原理：

$$2Fe^{2+} + Cl_2 = 2Fe^{3+} + 2Cl^-$$

$$Fe^{3+} + 3SCN^- = Fe(SCN)_3(血红色)$$

若直接加KSCN变红，说明已有Fe³⁺；若加氯水后才变红，则原溶液含Fe²⁺。

### 举一反三

**练习1**：将铁片放入足量FeCl₃溶液中，反应的离子方程式是什么？溶液颜色如何变化？
- 答案：$2Fe^{3+} + Fe = 3Fe^{2+}$，溶液由棕黄色变为浅绿色。

**练习2**：用一种试剂鉴别FeCl₂、FeCl₃、AlCl₃、MgCl₂四种溶液，应选用什么？
- 答案：选用**NaOH溶液**。FeCl₂产生白色沉淀迅速变灰绿最后变红褐色；FeCl₃产生红褐色沉淀；AlCl₃产生白色沉淀，过量NaOH溶解；MgCl₂产生白色沉淀不溶解。

### 拓展知识

- 铁在自然界中以赤铁矿(Fe₂O₃)、磁铁矿(Fe₃O₄)等形式存在。
- 炼铁原理：$Fe_2O_3 + 3CO \\xrightarrow{高温} 2Fe + 3CO_2$。
- Fe₃O₄可看作FeO·Fe₂O₃，其中铁的化合价为+2和+3。
- Fe²⁺易被氧化，配制FeSO₄溶液时常加入少量铁屑防止氧化。
- 氢氧化亚铁在空气中氧化过程：白色→灰绿色→红褐色：$4Fe(OH)_2 + O_2 + 2H_2O = 4Fe(OH)_3$。`
  },
  {
    id: 'chem_036',
    title: '氯及其化合物',
    stage: 'high',
    chapter: '氯及其化合物',
    tags: ['氯气', '次氯酸', '氯离子检验'],
    content: `## 氯及其化合物

### 核心概念

**氯气(Cl₂)**：黄绿色气体，有刺激性气味，有毒，密度比空气大，能溶于水。

**氯气的化学性质**：强氧化剂，能与金属、非金属、水、碱等反应。

**次氯酸(HClO)**：弱酸，强氧化性，能杀菌消毒、漂白，不稳定见光分解。

**次氯酸盐**：NaClO和Ca(ClO)₂是常见漂白剂，Ca(ClO)₂是漂白粉的有效成分。

**Cl⁻的检验**：先用AgNO₃溶液产生白色沉淀，再加稀HNO₃沉淀不溶解。

### 化学方程式或公式总结

| 反应 | 化学方程式 | 备注 |
|------|-----------|------|
| 钠在氯气中燃烧 | $2Na + Cl_2 \\xrightarrow{点燃} 2NaCl$ | 黄色火焰，白烟 |
| 铁在氯气中燃烧 | $2Fe + 3Cl_2 \\xrightarrow{点燃} 2FeCl_3$ | 棕色烟 |
| 氯气与水 | $Cl_2 + H_2O \\rightleftharpoons HCl + HClO$ | 氯水具有多重性质 |
| 次氯酸见光分解 | $2HClO \\xrightarrow{光照} 2HCl + O_2\\uparrow$ | 漂白性失效 |
| 氯气与NaOH | $Cl_2 + 2NaOH = NaCl + NaClO + H_2O$ | 制备漂白液 |
| 制漂白粉 | $2Cl_2 + 2Ca(OH)_2 = Ca(ClO)_2 + CaCl_2 + 2H_2O$ | 工业制取 |
| 实验室制氯气 | $MnO_2 + 4HCl(浓) \\xrightarrow{\\Delta} MnCl_2 + Cl_2\\uparrow + 2H_2O$ | 需尾气处理 |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="50" y="60" width="60" height="80" rx="3" fill="var(--color-bg-secondary)" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="80" y="100" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">MnO₂</text>
  <text x="80" y="115" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">+浓HCl</text>
  <path d="M110 70 L110 60 L150 60 L150 55" stroke="var(--color-text-primary)" stroke-width="2" fill="none" />
  <path d="M150 55 L150 30 L260 30 L260 50" stroke="var(--color-text-primary)" stroke-width="2" fill="none" />
  <rect x="220" y="50" width="60" height="100" rx="3" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="250" y="100" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">NaOH</text>
  <text x="250" y="115" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">尾气吸收</text>
  <rect x="170" y="50" width="40" height="80" rx="3" fill="var(--color-primary)" opacity="0.15" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="190" y="95" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">收集</text>
  <text x="190" y="108" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">Cl₂</text>
  <text x="150" y="170" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">实验室制取氯气装置</text>
</svg>

### 例题解析

**问题**：新制氯水与久置氯水在成分和性质上有何不同？

**解答**：

**新制氯水**成分：含$Cl_2$、$H_2O$、$HCl$、$HClO$，及$H^+$、$Cl^-$、$ClO^-$、$OH^-$。

- 具有氧化性(含Cl₂和HClO)
- 漂白性(含HClO)
- 酸性(含HCl和HClO)

**久置氯水**：由于HClO见光分解 $2HClO \\xrightarrow{光照} 2HCl + O_2\\uparrow$，最终变为稀盐酸。

- 成分：$H^+$、$Cl^-$、$H_2O$、$OH^-$
- 失去漂白性
- 仍有酸性(实际上酸性增强)

所以久置氯水相当于稀盐酸，无漂白性。

### 举一反三

**练习1**：怎样用化学方法鉴别Cl₂和HCl气体？
- 答案：将气体通入湿润的淀粉KI试纸，变蓝的是Cl₂($Cl_2 + 2KI = 2KCl + I_2$)，不变色的是HCl。

**练习2**：用自来水配制AgNO₃溶液时会出现浑浊，原因是什么？
- 答案：自来水中残留Cl⁻，与Ag⁺反应生成AgCl沉淀：$Ag^+ + Cl^- = AgCl\\downarrow$。应使用蒸馏水配制。

### 拓展知识

- 氯气可用于自来水消毒，但因产生有害副产物，逐渐被ClO₂、臭氧等替代。
- 漂白粉在空气中失效的原因：$Ca(ClO)_2 + CO_2 + H_2O = CaCO_3\\downarrow + 2HClO$，HClO再分解。
- 氯气有毒，实验室制取时必须进行尾气处理，常用NaOH溶液吸收。
- 漂白性比较：HClO的漂白是氧化性漂白(不可逆)，SO₂的漂白是化合性漂白(可逆)。`
  },
  {
    id: 'chem_037',
    title: '硫及其化合物',
    stage: 'high',
    chapter: '硫及其化合物',
    tags: ['二氧化硫', '硫酸', '硫酸根检验'],
    content: `## 硫及其化合物

### 核心概念

**硫(S)**：淡黄色固体，不溶于水，易溶于CS₂，既有氧化性又有还原性。

**二氧化硫(SO₂)**：无色有刺激性气味的有毒气体，易溶于水，水溶液呈酸性。

**SO₂的性质**：既有还原性(被氧化为SO₄²⁻)、又有氧化性(被还原为S)、还有漂白性。

**浓硫酸(H₂SO₄)**：强氧化性、吸水性、脱水性三大特性。

**SO₄²⁻的检验**：先用稀盐酸酸化(排除CO₃²⁻、SO₃²⁻等干扰)，再加BaCl₂溶液产生白色沉淀。

### 化学方程式或公式总结

| 反应 | 化学方程式 | 备注 |
|------|-----------|------|
| 硫与氧气 | $S + O_2 \\xrightarrow{点燃} SO_2$ | 空气中淡蓝色火焰 |
| SO₂与水 | $SO_2 + H_2O \\rightleftharpoons H_2SO_3$ | 可逆反应 |
| SO₂催化氧化 | $2SO_2 + O_2 \\xrightarrow[\\Delta]{催化剂} 2SO_3$ | 工业制硫酸 |
| SO₂漂白品红 | 可逆结合，加热复原 | 暂时性漂白 |
| 铜与浓硫酸 | $Cu + 2H_2SO_4(浓) \\xrightarrow{\\Delta} CuSO_4 + SO_2\\uparrow + 2H_2O$ | 浓硫酸显氧化性和酸性 |
| 碳与浓硫酸 | $C + 2H_2SO_4(浓) \\xrightarrow{\\Delta} CO_2\\uparrow + 2SO_2\\uparrow + 2H_2O$ | 浓硫酸只显氧化性 |
| SO₄²⁻检验 | $Ba^{2+} + SO_4^{2-} = BaSO_4\\downarrow$ | 白色沉淀不溶于酸 |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="40" y="60" width="80" height="90" rx="3" fill="var(--color-bg-secondary)" stroke="var(--color-text-primary)" stroke-width="2" />
  <rect x="45" y="100" width="70" height="45" fill="var(--color-text-secondary)" opacity="0.3" />
  <text x="80" y="125" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">Cu+浓H₂SO₄</text>
  <path d="M120 70 L150 70 L150 50 L200 50 L200 70" stroke="var(--color-text-primary)" stroke-width="2" fill="none" />
  <path d="M200 70 L200 110" stroke="var(--color-text-primary)" stroke-width="2" />
  <rect x="170" y="110" width="60" height="50" rx="3" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="200" y="135" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">品红溶液</text>
  <path d="M230 130 L260 130" stroke="var(--color-text-primary)" stroke-width="2" marker-end="url(#b1)" />
  <rect x="260" y="115" width="30" height="30" rx="3" fill="var(--color-text-secondary)" opacity="0.2" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="275" y="133" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">NaOH</text>
  <text x="150" y="175" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">Cu与浓硫酸反应及SO₂检验</text>
  <defs>
    <marker id="b1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-text-primary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：某溶液中可能含有SO₃²⁻和SO₄²⁻，如何检验并加以区分？

**解答**：

**检验SO₄²⁻**：

取少量溶液，先加足量稀盐酸(排除SO₃²⁻干扰，因为SO₃²⁻与H⁺反应生成SO₂)，若有沉淀则可能含SO₄²⁻；再加BaCl₂溶液，产生白色沉淀证明含SO₄²⁻。

$$Ba^{2+} + SO_4^{2-} = BaSO_4\\downarrow(白色)$$

**检验SO₃²⁻**：

取少量溶液加盐酸，将产生的气体通入品红溶液，若品红褪色且加热后复原，则证明含SO₃²⁻。

$$SO_3^{2-} + 2H^+ = H_2O + SO_2\\uparrow$$

注意：检验SO₄²⁻时必须先加盐酸酸化，否则BaSO₃也是白色沉淀会干扰。

### 举一反三

**练习1**：浓硫酸能否干燥下列气体：H₂、O₂、CO₂、NH₃、H₂S、SO₂？
- 答案：能干燥H₂、O₂、CO₂、SO₂(酸性干燥剂不能干燥碱性气体)。**不能**干燥NH₃(碱性)和H₂S(还原性，被浓硫酸氧化)。

**练习2**：等质量的SO₂和SO₃中，氧元素的质量比是多少？
- 答案：SO₂和SO₃的摩尔质量为64和80。等质量m时，n(SO₂):n(SO₃) = m/64:m/80 = 5:4。氧元素质量比 = (5×32):(4×48) = 160:192 = **5:6**。

### 拓展知识

- 接触法制硫酸：沸腾炉焙烧硫铁矿→接触室催化氧化SO₂→吸收塔用98.3%浓硫酸吸收SO₃。
- SO₂是主要大气污染物，是形成酸雨的主要原因，酸雨的pH<5.6。
- 浓硫酸的吸水性是吸收游离的水分，脱水性是从有机物中夺取氢氧元素以水的形式脱去。
- BaSO₄不溶于酸，医疗上用作"钡餐"进行肠胃透视，而BaCO₃可溶于胃酸有毒。`
  },
  {
    id: 'chem_038',
    title: '氮及其化合物',
    stage: 'high',
    chapter: '氮及其化合物',
    tags: ['氮气', '氨气', '硝酸', '氮氧化物'],
    content: `## 氮及其化合物

### 核心概念

**氮气(N₂)**：无色无味气体，化学性质极稳定(氮氮三键)，可用于保护气。

**氨气(NH₃)**：无色有刺激性气味气体，极易溶于水(1:700)，水溶液呈碱性。

**NO**：无色气体，难溶于水，易被氧化为NO₂。

**NO₂**：红棕色气体，有刺激性气味，易溶于水，与水反应生成HNO₃。

**硝酸(HNO₃)**：强酸，强氧化性，不稳定性，无论浓稀均无H₂生成。

### 化学方程式或公式总结

| 反应 | 化学方程式 | 备注 |
|------|-----------|------|
| 氮气与氢气 | $N_2 + 3H_2 \\xrightarrow[\\Delta]{催化剂} 2NH_3$ | 工业合成氨 |
| 氨气与水 | $NH_3 + H_2O \\rightleftharpoons NH_3·H_2O \\rightleftharpoons NH_4^+ + OH^-$ | 氨水呈碱性 |
| 氨气与HCl | $NH_3 + HCl = NH_4Cl$ | 产生白烟，检验NH₃ |
| 实验室制氨 | $2NH_4Cl + Ca(OH)_2 \\xrightarrow{\\Delta} CaCl_2 + 2NH_3\\uparrow + 2H_2O$ | 用向下排空气法收集 |
| NO与O₂ | $2NO + O_2 = 2NO_2$ | 无色变红棕色 |
| NO₂与水 | $3NO_2 + H_2O = 2HNO_3 + NO$ | 雷雨发庄稼 |
| 铜与浓硝酸 | $Cu + 4HNO_3(浓) = Cu(NO_3)_2 + 2NO_2\\uparrow + 2H_2O$ | 红棕色气体 |
| 铜与稀硝酸 | $3Cu + 8HNO_3(稀) = 3Cu(NO_3)_2 + 2NO\\uparrow + 4H_2O$ | 无色气体 |

### 实验示意图

<svg width="300" height="170" viewBox="0 0 300 170">
  <rect x="60" y="40" width="80" height="100" rx="3" fill="var(--color-bg-secondary)" stroke="var(--color-text-primary)" stroke-width="2" />
  <rect x="65" y="100" width="70" height="35" fill="var(--color-text-secondary)" opacity="0.3" />
  <text x="100" y="120" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">NH₄Cl</text>
  <text x="100" y="135" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">Ca(OH)₂</text>
  <path d="M140 50 L140 30 L220 30 L220 55" stroke="var(--color-text-primary)" stroke-width="2" fill="none" />
  <rect x="190" y="55" width="60" height="90" rx="3" fill="var(--color-primary)" opacity="0.1" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="220" y="100" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">收集NH₃</text>
  <rect x="240" y="120" width="50" height="30" rx="3" fill="none" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="265" y="138" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">棉花</text>
  <text x="265" y="100" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">(防</text>
  <text x="265" y="110" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">对流)</text>
  <text x="150" y="160" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">实验室制取氨气</text>
</svg>

### 例题解析

**问题**：将盛有NO和NO₂混合气体50mL的试管倒立于水槽中，最后剩余20mL气体。求原混合气体中NO和NO₂的体积。

**解答**：

NO不溶于水，NO₂与水反应：

$$3NO_2 + H_2O = 2HNO_3 + NO$$

设原NO₂体积为x mL，则原NO体积为(50-x) mL。

反应后生成的NO：$\\frac{x}{3}$ mL

剩余气体(均为NO)：$(50 - x) + \\frac{x}{3} = 50 - \\frac{2x}{3}$

由题意：$50 - \\frac{2x}{3} = 20$

解得：$x = 45$ mL

所以原混合气体中：NO₂ = 45mL，NO = 5mL。

### 举一反三

**练习1**：怎样用化学方法鉴别NH₃、NO、NO₂、O₂四种气体？
- 答案：观察颜色，**红棕色**的是NO₂；其余用湿润红色石蕊试纸检验，**变蓝**的是NH₃；将剩余气体(无色)分别通入水中，NO遇空气变红棕色；最后用带火星木条检验，**复燃**的是O₂。

**练习2**：铜与一定量浓硝酸反应，收集到标准状况下气体6.72L(假设全是NO₂)，求被还原的HNO₃的物质的量。
- 答案：n(NO₂) = 6.72/22.4 = 0.3mol。被还原的HNO₃生成NO₂，所以n = **0.3mol**。

### 拓展知识

- 氮的固定：将游离态氮转化为化合态氮的过程。工业合成氨是人工固氮，根瘤菌固氮是自然固氮。
- 硝酸工业制法：氨催化氧化法($NH_3 \\to NO \\to NO_2 \\to HNO_3$)。
- 硝酸不稳定，见光受热易分解：$4HNO_3 \\xrightarrow{光照或\\Delta} 4NO_2\\uparrow + O_2\\uparrow + 2H_2O$，保存在棕色瓶中。
- 硝酸盐(KNO₃)是制造火药的原料，氮肥(尿素、硝酸铵)是重要的化肥。
- 汽车尾气中的NOₓ是光化学烟雾的成因，可用催化转化器处理。`
  },
  {
    id: 'chem_039',
    title: '元素周期表',
    stage: 'high',
    chapter: '元素周期表',
    tags: ['周期表', '周期', '族'],
    content: `## 元素周期表

### 核心概念

**元素周期表**：根据原子序数递增排列的元素表，体现元素性质的周期性变化规律。

**周期**：周期表中每一横行称为一个周期，共7个周期。

**族**：周期表中每一纵列称为一个族，共18列16个族。

**周期数**：等于元素原子的电子层数。

**族序数**：主族元素的族序数等于最外层电子数。

**区**：周期表分为s区、p区、d区、ds区、f区。

### 化学方程式或公式总结

| 周期 | 起止元素 | 元素种类 | 备注 |
|------|---------|---------|------|
| 第一周期 | H~He | 2种 | 特短周期 |
| 第二周期 | Li~Ne | 8种 | 短周期 |
| 第三周期 | Na~Ar | 8种 | 短周期 |
| 第四周期 | K~Kr | 18种 | 长周期 |
| 第五周期 | Rb~Xe | 18种 | 长周期 |
| 第六周期 | Cs~Rn | 32种 | 特长周期(含镧系) |
| 第七周期 | Fr~Og | 32种 | 特长周期(含锕系) |

| 族 | 名称 | 最外层电子数 | 备注 |
|---|------|------------|------|
| ⅠA | 碱金属族(除H) | 1 | 金属性强 |
| ⅦA | 卤族 | 7 | 非金属性强 |
| 0 | 稀有气体 | 8(He为2) | 稳定结构 |
| Ⅷ | 铁、钴、镍等 | — | 3列9种元素 |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="20" y="20" width="260" height="140" fill="none" stroke="var(--color-border)" stroke-width="1" />
  <rect x="20" y="20" width="260" height="20" fill="var(--color-primary)" opacity="0.2" />
  <text x="150" y="35" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">周期表结构(简化)</text>
  <rect x="20" y="40" width="20" height="20" fill="var(--color-primary)" opacity="0.6" />
  <text x="30" y="55" font-size="8" text-anchor="middle" fill="var(--color-text-primary)">ⅠA</text>
  <rect x="40" y="40" width="200" height="20" fill="var(--color-bg-secondary)" stroke="var(--color-border)" stroke-width="0.5" />
  <text x="140" y="55" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">第2~12族</text>
  <rect x="240" y="40" width="20" height="20" fill="var(--color-text-secondary)" opacity="0.5" />
  <text x="250" y="55" font-size="8" text-anchor="middle" fill="var(--color-text-primary)">0</text>
  <rect x="20" y="60" width="260" height="20" fill="var(--color-bg-secondary)" stroke="var(--color-border)" stroke-width="0.5" />
  <text x="150" y="75" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">短周期(2,3周期)</text>
  <rect x="20" y="80" width="260" height="20" fill="var(--color-bg-secondary)" stroke="var(--color-border)" stroke-width="0.5" />
  <text x="150" y="95" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">长周期(4,5周期)</text>
  <rect x="20" y="100" width="260" height="20" fill="var(--color-bg-secondary)" stroke="var(--color-border)" stroke-width="0.5" />
  <text x="150" y="115" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">特长周期(6,7周期)</text>
  <rect x="20" y="120" width="40" height="20" fill="none" stroke="var(--color-primary)" stroke-width="1" />
  <text x="40" y="135" font-size="8" text-anchor="middle" fill="var(--color-primary)">主族</text>
  <rect x="60" y="120" width="160" height="20" fill="none" stroke="var(--color-text-secondary)" stroke-width="1" />
  <text x="140" y="135" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">副族+Ⅷ族</text>
  <rect x="220" y="120" width="60" height="20" fill="none" stroke="var(--color-primary)" stroke-width="1" />
  <text x="250" y="135" font-size="8" text-anchor="middle" fill="var(--color-primary)">0族</text>
  <text x="150" y="155" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">7周期18列16族</text>
</svg>

### 例题解析

**问题**：已知某主族元素X位于第三周期第ⅥA族，回答：(1)X的元素符号；(2)X的原子结构示意图；(3)X的最高价氧化物对应水化物的化学式。

**解答**：

(1) 第三周期第ⅥA族元素是硫，符号为**S**。

(2) X的原子序数为16，原子结构示意图：

$$\\overset{+16}{\\boxed{\\phantom{+16}}} \\quad 2 \\quad 8 \\quad 6$$

电子排布为K层2个，L层8个，M层6个。

(3) X最外层6个电子，最高正价为+6价，最高价氧化物为SO₃，对应水化物为**H₂SO₄**。

### 举一反三

**练习1**：下列元素的主族序数与最外层电子数是否相等？(1)Na (2)Mg (3)Fe (4)Cl
- 答案：(1)(2)(4)主族元素相等，分别是ⅠA、ⅡA、ⅦA。(3)Fe是第Ⅷ族过渡元素，不适用此规律。

**练习2**：短周期元素A、B，A在第二周期第ⅡA族，B在第三周期第ⅦA族。它们形成的化合物的化学式是什么？
- 答案：A是Be(或Mg若按旧周期表)，B是Cl。形成化合物为BeCl₂(实际为MgCl₂，因第二周期ⅡA族是Be)：**BeCl₂**。

### 拓展知识

- 门捷列夫于1869年发表第一张元素周期表，预言了未知元素的性质。
- 周期表的排列揭示了元素性质的递变规律，是化学学习的重要工具。
- 主族元素的族序数 = 最外层电子数 = 最高正价(|8-负价|)。
- 过渡元素(副族)全是金属，位于d区，性质相似，常作催化剂。
- 同主族元素从上到下，金属性增强，非金属性减弱；同周期从左到右，非金属性增强，金属性减弱。`
  },
  {
    id: 'chem_040',
    title: '元素周期律',
    stage: 'high',
    chapter: '元素周期律',
    tags: ['核外电子排布', '周期律', '化合价'],
    content: `## 元素周期律

### 核心概念

**核外电子排布规律**：①每层最多容纳2n²个电子；②最外层不超过8个(K层为最外层不超过2个)；③次外层不超过18个；④电子先排满低能层再排高能层。

**元素周期律**：元素性质随着原子序数的递增呈现周期性变化的规律。

**随原子序数递增的变化(同周期从左到右)**：

- 原子半径逐渐减小
- 最外层电子数依次增多
- 最高正价依次升高(由+1到+7)
- 金属性逐渐减弱，非金属性逐渐增强

**同主族从上到下**：

- 原子半径逐渐增大
- 金属性逐渐增强，非金属性逐渐减弱

### 化学方程式或公式总结

| 性质 | 同周期(左→右) | 同主族(上→下) |
|------|-------------|--------------|
| 原子半径 | 减小 | 增大 |
| 最外层电子数 | 增多 | 相同 |
| 主要化合价 | +1→+7(ⅦA) | 相同 |
| 金属性 | 减弱 | 增强 |
| 非金属性 | 增强 | 减弱 |
| 最高价氧化物水化物碱性 | 减弱 | 增强 |
| 最高价氧化物水化物酸性 | 增强 | 减弱 |
| 气态氢化物稳定性 | 增强 | 减弱 |

**判断金属性强弱的依据**：①与水(或酸)反应置换H₂的难易；②最高价氧化物水化物碱性强弱；③相互置换。

**判断非金属性强弱的依据**：①与H₂化合难易及氢化物稳定性；②最高价含氧酸酸性强弱；③相互置换。

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="20" y="20" width="260" height="140" fill="none" stroke="var(--color-border)" stroke-width="1" />
  <text x="150" y="15" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">同周期元素性质递变</text>
  <rect x="30" y="30" width="240" height="20" fill="var(--color-primary)" opacity="0.3" />
  <text x="40" y="45" font-size="10" fill="var(--color-text-primary)">Na</text>
  <text x="90" y="45" font-size="10" fill="var(--color-text-primary)">Mg</text>
  <text x="140" y="45" font-size="10" fill="var(--color-text-primary)">Al</text>
  <text x="190" y="45" font-size="10" fill="var(--color-text-primary)">Si</text>
  <text x="235" y="45" font-size="10" fill="var(--color-text-primary)">P S Cl</text>
  <text x="40" y="70" font-size="8" fill="var(--color-text-secondary)">原子半径</text>
  <path d="M40 78 L250 78" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#c1)" />
  <text x="255" y="80" font-size="8" fill="var(--color-text-secondary)">减小</text>
  <text x="40" y="100" font-size="8" fill="var(--color-text-secondary)">金属性</text>
  <path d="M40 108 L250 108" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#c1)" />
  <text x="255" y="110" font-size="8" fill="var(--color-text-secondary)">减弱</text>
  <text x="40" y="130" font-size="8" fill="var(--color-text-secondary)">非金属性</text>
  <path d="M40 138 L250 138" stroke="var(--color-text-secondary)" stroke-width="2" marker-end="url(#c1)" />
  <text x="255" y="140" font-size="8" fill="var(--color-text-secondary)">增强</text>
  <text x="150" y="165" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">第三周期Na→Cl</text>
  <defs>
    <marker id="c1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-text-primary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：已知X、Y、Z是同周期的三种短周期元素，最高正价分别为+1、+3、+6，试回答它们的非金属性强弱顺序。

**解答**：

由于三种元素同周期，最高正价由低到高依次为+1、+3、+6，对应在周期表中的位置依次向右。

由同周期元素从左到右非金属性增强的规律：

X(+1) < Y(+3) < Z(+6)

所以非金属性强弱顺序为：**X < Y < Z**。

若为第三周期，则X=Na、Y=Al、Z=S，非金属性Na < Al < S。

### 举一反三

**练习1**：下列各组元素中，按原子半径递增顺序排列的是（  ）
- A. Li、Na、K  B. Na、Mg、Al  C. Cl、S、P  D. F、Cl、Br
- 答案：**A、D**。A、D是同主族从上到下半径递增；B、C同周期从左到右半径递减。

**练习2**：下列含氧酸酸性最强的是（  ）
- A. H₂SO₄  B. H₃PO₄  C. HClO₄  D. H₂SiO₃
- 答案：**C**。同周期从左到右非金属性增强，最高价含氧酸酸性增强，故HClO₄ > H₂SO₄ > H₃PO₄ > H₂SiO₃。

### 拓展知识

- 元素周期律的实质：原子的核外电子排布呈现周期性变化导致元素性质也呈周期性变化。
- 随原子序数递增，每增加一定数目元素，就会出现与前面元素性质相似的元素。
- 主族元素的最高正价 = 最外层电子数 = 主族序数；非金属的负价 = 8 - 主族序数。
- 元素的金属性和非金属性之间没有严格界限，位于周期表金属与非金属交界处的元素常具有半导体的性质。
- 原子半径变化原因：同周期电子层数相同，核电荷数增大，原子核对电子吸引力增强，半径减小。`
  },
  {
    id: 'chem_041',
    title: '化学键',
    stage: 'high',
    chapter: '化学键',
    tags: ['离子键', '共价键', '分子间作用力'],
    content: `## 化学键

### 核心概念

**化学键**：相邻原子或离子之间强烈的相互作用，包括离子键和共价键。

**离子键**：阴阳离子之间通过静电作用形成的化学键，成键元素一般是活泼金属与活泼非金属。

**共价键**：原子间通过共用电子对形成的化学键，成键元素一般是非金属原子。

**离子化合物**：含有离子键的化合物，如NaCl、NaOH、Na₂O等。

**共价化合物**：只含共价键的化合物，如HCl、H₂O、CO₂等。

**分子间作用力**：分子之间存在的一种较弱的作用力，又称范德华力。

### 化学方程式或公式总结

| 概念 | 定义 | 成键粒子 | 实例 |
|------|------|---------|------|
| 离子键 | 阴阳离子间的静电作用 | 阴离子、阳离子 | NaCl、K₂O、MgCl₂ |
| 共价键 | 共用电子对 | 原子 | HCl、H₂O、Cl₂ |
| 极性共价键 | 不同种原子间的共价键 | 不同原子 | H-Cl、C-H |
| 非极性共价键 | 同种原子间的共价键 | 相同原子 | H-H、Cl-Cl |
| 分子间作用力 | 分子间的作用力 | 分子 | 干冰升华 |

**用电子式表示化学键的形成**：

- 离子键：$Na^+[\\overset{..}{\\underset{..}{Cl}}:]^-$
- 共价键：$H:\\!\\!\\!\\overset{..}{\\underset{..}{O}}:\\!\\!\\!H$

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <text x="75" y="20" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">离子键(NaCl)</text>
  <text x="225" y="20" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">共价键(HCl)</text>
  <circle cx="50" cy="80" r="18" fill="var(--color-primary)" opacity="0.7" />
  <text x="50" y="85" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">Na⁺</text>
  <circle cx="100" cy="80" r="22" fill="var(--color-text-secondary)" opacity="0.6" />
  <text x="100" y="85" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">Cl⁻</text>
  <path d="M68 80 L78 80" stroke="var(--color-primary)" stroke-width="2" stroke-dasharray="3,2" />
  <path d="M95 70 L105 70" stroke="var(--color-text-secondary)" stroke-width="2" stroke-dasharray="3,2" />
  <text x="75" y="120" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">静电作用</text>
  <text x="75" y="135" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">活泼金属+活泼非金属</text>
  <circle cx="190" cy="80" r="15" fill="var(--color-primary)" opacity="0.7" />
  <text x="190" y="85" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">H</text>
  <circle cx="250" cy="80" r="22" fill="var(--color-text-secondary)" opacity="0.6" />
  <text x="250" y="85" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">Cl</text>
  <circle cx="215" cy="78" r="3" fill="var(--color-primary)" />
  <circle cx="225" cy="78" r="3" fill="var(--color-primary)" />
  <text x="220" y="70" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">共用电子对</text>
  <text x="220" y="120" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">共用电子对</text>
  <text x="220" y="135" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">非金属原子间</text>
</svg>

### 例题解析

**问题**：下列化合物中，哪些含有离子键？哪些含有共价键？哪些既含离子键又含共价键？

①NaCl ②NaOH ③HCl ④NH₄Cl ⑤CO₂ ⑥CaCl₂ ⑦Na₂O₂

**解答**：

**只含离子键**：①NaCl、⑥CaCl₂(活泼金属与活泼非金属形成的化合物)。

**只含共价键**：③HCl、⑤CO₂(非金属原子间形成的共价化合物)。

**既含离子键又含共价键**：②NaOH、④NH₄Cl、⑦Na₂O₂。

分析：
- NaOH：Na⁺与OH⁻之间是离子键，O-H之间是共价键。
- NH₄Cl：NH₄⁺与Cl⁻之间是离子键，N-H之间是共价键。
- Na₂O₂：Na⁺与O₂²⁻之间是离子键，O-O之间是非极性共价键。

### 举一反三

**练习1**：用电子式表示H₂O分子的形成过程。
- 答案：$H^\\times + \\overset{..}{\\underset{..}{O}} + \\:^\\times H \\to H\\overset{..}{\\underset{..}{O}}H$(其中O有2对孤对电子)

**练习2**：下列物质中只含离子键的是（  ）
- A. KOH  B. Na₂O₂  C. MgCl₂  D. NH₄NO₃
- 答案：**C**。MgCl₂只含离子键。A含离子键和共价键(O-H)，B含离子键和共价键(O-O)，D含离子键和共价键(N-H)。

### 拓展知识

- 离子化合物中一定含离子键，可能含共价键；共价化合物中只含共价键，一定不含离子键。
- 含离子键的化合物一定是离子化合物；含共价键的化合物不一定是共价化合物(如NaOH含共价键但是离子化合物)。
- 离子键的强弱影响离子化合物的熔沸点：离子键越强，熔沸点越高。
- 分子间作用力比化学键弱得多，主要影响分子晶体的熔沸点。
- 金属键是金属阳离子与自由电子之间的相互作用，是金属具有导电导热延展性的原因。`
  },
  {
    id: 'chem_042',
    title: '化学反应与能量',
    stage: 'high',
    chapter: '化学反应与能量',
    tags: ['吸热反应', '放热反应', '化学反应速率'],
    content: `## 化学反应与能量

### 核心概念

**放热反应**：反应过程中放出热量的反应，反应物总能量大于生成物总能量。

**吸热反应**：反应过程中吸收热量的反应，反应物总能量小于生成物总能量。

**化学键与能量**：断开化学键吸收能量，形成化学键放出能量。

**化学反应速率**：描述反应进行快慢的物理量，常用单位时间内反应物浓度的减少或生成物浓度的增加表示。

**影响反应速率的因素**：浓度、温度、催化剂、表面积等。

### 化学方程式或公式总结

| 反应类型 | 实例 | 能量变化 |
|---------|------|---------|
| 放热反应 | $2H_2 + O_2 = 2H_2O$ | 放热 |
| 放热反应 | $CaO + H_2O = Ca(OH)_2$ | 放热 |
| 放热反应 | $2Al + Fe_2O_3 = 2Fe + Al_2O_3$ | 放热(铝热) |
| 吸热反应 | $C + CO_2 \\xrightarrow{高温} 2CO$ | 吸热 |
| 吸热反应 | $CaCO_3 \\xrightarrow{高温} CaO + CO_2\\uparrow$ | 吸热 |
| 吸热反应 | $Ba(OH)_2·8H_2O + 2NH_4Cl = BaCl_2 + 2NH_3\\uparrow + 10H_2O$ | 吸热 |

**反应速率公式**：$v = \\frac{\\Delta c}{\\Delta t}$，单位：$mol/(L·s)$或$mol/(L·min)$

### 实验示意图

<svg width="300" height="170" viewBox="0 0 300 170">
  <rect x="30" y="30" width="100" height="120" fill="none" stroke="var(--color-border)" stroke-width="1" />
  <text x="80" y="25" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">放热反应</text>
  <line x1="40" y1="130" x2="120" y2="50" stroke="var(--color-primary)" stroke-width="2" />
  <text x="50" y="115" font-size="9" fill="var(--color-text-secondary)">反应物</text>
  <text x="115" y="55" font-size="9" fill="var(--color-text-secondary)">生成物</text>
  <path d="M75 95 L75 60" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#d1)" />
  <text x="90" y="80" font-size="9" fill="var(--color-primary)">放热ΔH&lt;0</text>
  <rect x="170" y="30" width="100" height="120" fill="none" stroke="var(--color-border)" stroke-width="1" />
  <text x="220" y="25" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">吸热反应</text>
  <line x1="180" y1="50" x2="260" y2="130" stroke="var(--color-text-secondary)" stroke-width="2" />
  <text x="190" y="55" font-size="9" fill="var(--color-text-secondary)">反应物</text>
  <text x="255" y="115" font-size="9" fill="var(--color-text-secondary)">生成物</text>
  <path d="M215 60 L215 95" stroke="var(--color-text-secondary)" stroke-width="2" marker-end="url(#d2)" />
  <text x="230" y="80" font-size="9" fill="var(--color-text-secondary)">吸热ΔH&gt;0</text>
  <text x="150" y="165" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">反应过程能量变化</text>
  <defs>
    <marker id="d1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-primary)" />
    </marker>
    <marker id="d2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-text-secondary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：已知断开1mol H-H键吸收436kJ能量，断开1mol O=O键吸收498kJ能量，形成1mol O-H键放出463kJ能量。计算反应 $2H_2 + O_2 = 2H_2O$ 的反应热。

**解答**：

反应物断键吸收能量：

$$2 \\times 436 + 498 = 872 + 498 = 1370(kJ)$$

生成物成键放出能量：

$$2 \\times 2 \\times 463 = 1852(kJ)$$

反应热：

$$\\Delta H = E_{吸} - E_{放} = 1370 - 1852 = -482(kJ/mol)$$

所以该反应为放热反应，放出482kJ热量，$\\Delta H = -482 kJ/mol$。

### 举一反三

**练习1**：对于反应 $A + 3B = 2C + 2D$，下列不同物质表示的反应速率关系正确的是（  ）
- A. $v(A) = v(B)$  B. $v(A) = 2v(C)$  C. $v(B) = \\frac{3}{2}v(C)$  D. $v(D) = 2v(A)$
- 答案：**B、D**。由速率之比等于化学计量数之比：$v(A):v(B):v(C):v(D) = 1:3:2:2$，所以$v(A) = \\frac{1}{2}v(C) = \\frac{1}{2}v(D) = \\frac{1}{3}v(B)$，即$v(A) = 2v(C)$错误，应为$v(A)=\\frac{1}{2}v(C)$。正确：$v(B) = \\frac{3}{2}v(C)$；$v(D) = 2v(A)$。

**练习2**：升高温度能加快反应速率的原因是什么？
- 答案：升高温度使反应物分子运动加快，有效碰撞的频率增加，且活化分子百分数增大，有效碰撞增多，反应速率加快。一般温度每升高10°C，反应速率增大2~4倍。

### 拓展知识

- 化学反应的能量变化本质是反应物和生成物所含能量不同。
- 催化剂能改变反应途径，降低反应所需活化能，从而加快反应速率，但本身质量和化学性质在反应前后不变。
- 中和反应是放热反应：$H^+ + OH^- = H_2O \\quad \\Delta H &lt; 0$。
- 燃料的燃烧都是放热反应，提高燃烧效率的方法：增大接触面积、足量空气、预热等。
- 化学反应速率的测定方法：观察气泡产生快慢、测定颜色变化、测定压强变化等。`
  },
  {
    id: 'chem_043',
    title: '化学平衡',
    stage: 'high',
    chapter: '化学平衡',
    tags: ['化学平衡', '平衡移动', '勒夏特列原理'],
    content: `## 化学平衡

### 核心概念

**可逆反应**：在同一条件下，正反应和逆反应都能同时进行的反应。

**化学平衡状态**：在一定条件下，可逆反应进行到正反应速率等于逆反应速率的状态。

**化学平衡的特征**：动(动态平衡)、等(v正=v逆)、定(各组分浓度不变)、变(条件改变平衡移动)。

**平衡移动**：可逆反应达到平衡后，条件改变导致平衡被破坏，建立新平衡的过程。

**勒夏特列原理**：改变影响平衡的条件，平衡向减弱这种改变的方向移动。

### 化学方程式或公式总结

| 影响因素 | 平衡移动方向 | 备注 |
|---------|------------|------|
| 增大反应物浓度 | 正向移动 | 减小生成物浓度也正向移动 |
| 增大压强 | 向气体体积减小方向 | 仅对气体反应适用 |
| 升高温度 | 向吸热方向移动 | 降温向放热方向 |
| 催化剂 | 不移动 | 改变速率但v正=v逆同等程度改变 |

**常见可逆反应平衡**：

- 工业合成氨：$N_2 + 3H_2 \\rightleftharpoons 2NH_3 \\quad \\Delta H &lt; 0$
- SO₂转化：$2SO_2 + O_2 \\rightleftharpoons 2SO_3 \\quad \\Delta H &lt; 0$
- 酯化反应：$CH_3COOH + C_2H_5OH \\rightleftharpoons CH_3COOC_2H_5 + H_2O$

### 实验示意图

<svg width="300" height="170" viewBox="0 0 300 170">
  <rect x="20" y="30" width="260" height="120" fill="none" stroke="var(--color-border)" stroke-width="1" />
  <text x="150" y="25" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">Fe³⁺ + 3SCN⁻ ⇌ Fe(SCN)₃</text>
  <rect x="40" y="50" width="60" height="90" rx="3" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="70" y="100" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">原平衡</text>
  <text x="70" y="115" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">血红色</text>
  <path d="M110 90 L140 90" stroke="var(--color-text-primary)" stroke-width="2" marker-end="url(#e1)" />
  <text x="125" y="80" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">加Fe³⁺</text>
  <rect x="150" y="50" width="60" height="90" rx="3" fill="var(--color-primary)" opacity="0.5" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="180" y="100" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">新平衡</text>
  <text x="180" y="115" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">颜色加深</text>
  <path d="M220 90 L250 90" stroke="var(--color-text-primary)" stroke-width="2" marker-end="url(#e1)" />
  <text x="235" y="80" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">加SCN⁻</text>
  <rect x="250" y="50" width="30" height="90" rx="3" fill="none" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="265" y="100" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">加深</text>
  <text x="150" y="160" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">浓度对化学平衡的影响</text>
  <defs>
    <marker id="e1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-text-primary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：在密闭容器中发生反应 $2SO_2(g) + O_2(g) \\rightleftharpoons 2SO_3(g) \\quad \\Delta H = -196.6 kJ/mol$，已达平衡。下列措施对平衡有何影响？

(1)升高温度；(2)缩小容器体积；(3)充入N₂(容器体积不变)；(4)使用催化剂。

**解答**：

(1)升高温度：该反应正向放热，升高温度平衡向吸热方向(逆向)移动，SO₃的量减少。

(2)缩小容器体积：相当于增大压强，正反应气体体积减小(3→2)，平衡正向移动，SO₃的量增加。

(3)充入N₂(体积不变)：各组分分压不变，浓度不变，平衡**不移动**。

(4)使用催化剂：同等程度改变正逆反应速率，平衡**不移动**，但缩短到达平衡时间。

### 举一反三

**练习1**：合成氨工业 $N_2 + 3H_2 \\rightleftharpoons 2NH_3 \\quad \\Delta H &lt; 0$，从理论上看最有利的条件是什么？实际工业为何选择500°C、20-50MPa？
- 答案：理论最有利条件是低温高压。实际选择500°C是因为低温反应速率太慢，需催化剂(铁触媒)在适宜温度下活性最大；高压利于正向移动和加快反应，但考虑设备成本选20-50MPa。

**练习2**：对于反应 $H_2(g) + I_2(g) \\rightleftharpoons 2HI(g)$，增大压强平衡是否移动？
- 答案：**不移动**。该反应前后气体分子数相等(1+1=2)，增大压强正逆反应速率同等程度增大，平衡不移动。

### 拓展知识

- 化学平衡常数：$K = \\frac{c^m(C)·c^n(D)}{c^p(A)·c^q(B)}$，只随温度变化，与浓度压强无关。
- K值越大，正向反应进行越完全；K值越小，正向反应越不完全。
- 等效平衡：在一定条件下，加入不同起始量达到的平衡状态完全相同。
- 工业生产中常需综合考虑反应速率和平衡转化率，选择适宜的反应条件。
- 勒夏特列原理适用于已达到平衡的体系，不适用于未达到平衡的体系。`
  },
  {
    id: 'chem_044',
    title: '弱电解质的电离',
    stage: 'high',
    chapter: '弱电解质的电离',
    tags: ['强电解质', '弱电解质', '电离平衡'],
    content: `## 弱电解质的电离

### 核心概念

**强电解质**：在水溶液中完全电离的电解质，包括强酸、强碱和大多数盐。

**弱电解质**：在水溶液中部分电离的电解质，包括弱酸、弱碱和水。

**电离平衡**：弱电解质在水溶液中电离成离子的速率与离子结合成分子的速率相等时的状态。

**电离平衡常数(K)**：一定温度下，弱电解质电离达到平衡时，离子浓度之积与分子浓度之比。

**电离度(α)**：已电离的电解质分子数占原分子总数的百分数。

### 化学方程式或公式总结

| 弱电解质 | 电离方程式 | 电离常数(25°C) |
|---------|-----------|--------------|
| 醋酸 | $CH_3COOH \\rightleftharpoons CH_3COO^- + H^+$ | $K_a = 1.8 \\times 10^{-5}$ |
| 氢氟酸 | $HF \\rightleftharpoons H^+ + F^-$ | $K_a = 7.2 \\times 10^{-4}$ |
| 氨水 | $NH_3·H_2O \\rightleftharpoons NH_4^+ + OH^-$ | $K_b = 1.8 \\times 10^{-5}$ |
| 碳酸(第一步) | $H_2CO_3 \\rightleftharpoons H^+ + HCO_3^-$ | $K_{a1} = 4.3 \\times 10^{-7}$ |
| 碳酸(第二步) | $HCO_3^- \\rightleftharpoons H^+ + CO_3^{2-}$ | $K_{a2} = 5.6 \\times 10^{-11}$ |
| 水 | $H_2O \\rightleftharpoons H^+ + OH^-$ | $K_w = 1 \\times 10^{-14}$ |

**电离度公式**：$\\alpha = \\frac{已电离分子数}{总分子数} \\times 100\\%$

**电离常数表达式**：$K_a = \\frac{c(H^+)·c(A^-)}{c(HA)}$

### 实验示意图

<svg width="300" height="170" viewBox="0 0 300 170">
  <rect x="40" y="40" width="220" height="100" fill="none" stroke="var(--color-border)" stroke-width="1" />
  <text x="150" y="35" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">醋酸电离平衡</text>
  <rect x="60" y="55" width="80" height="80" rx="3" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="100" y="100" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">CH₃COOH</text>
  <text x="100" y="120" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">未电离分子</text>
  <rect x="180" y="55" width="60" height="80" rx="3" fill="var(--color-text-secondary)" opacity="0.2" stroke="var(--color-text-primary)" stroke-width="1" />
  <circle cx="200" cy="80" r="5" fill="var(--color-primary)" />
  <circle cx="220" cy="100" r="5" fill="var(--color-text-secondary)" />
  <text x="210" y="125" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">CH₃COO⁻+H⁺</text>
  <path d="M140 75 L180 75" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#f1)" />
  <text x="160" y="65" font-size="9" text-anchor="middle" fill="var(--color-primary)">电离v₁</text>
  <path d="M180 105 L140 105" stroke="var(--color-text-secondary)" stroke-width="2" marker-end="url(#f2)" />
  <text x="160" y="120" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">结合v₂</text>
  <text x="150" y="160" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">平衡时v₁ = v₂</text>
  <defs>
    <marker id="f1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-primary)" />
    </marker>
    <marker id="f2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-text-secondary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：在醋酸溶液中加入少量醋酸钠固体，溶液的pH如何变化？为什么？

**解答**：

醋酸的电离平衡：$CH_3COOH \\rightleftharpoons CH_3COO^- + H^+$

加入醋酸钠后，$CH_3COO^-$浓度增大，根据勒夏特列原理，平衡向左(逆向)移动，$H^+$浓度减小。

因此溶液的pH**增大**(酸性减弱)。

这体现了同离子效应：加入与弱电解质有相同离子的强电解质，使弱电解质电离度减小。

### 举一反三

**练习1**：将0.1mol/L醋酸加水稀释，下列各量如何变化？①电离度α ②c(H⁺) ③电离常数K ④溶液的pH
- 答案：①α**增大**(稀释促进电离)；②c(H⁺)**减小**(虽然电离度增大但体积增大占主导)；③K**不变**(只与温度有关)；④pH**增大**(c(H⁺)减小)。

**练习2**：下列事实能否说明醋酸是弱酸？
- ①醋酸钠溶液呈碱性 ②醋酸溶液pH>1(0.1mol/L) ③醋酸能与碳酸钠反应放出CO₂
- 答案：**①②能说明**。①醋酸钠水解呈碱性说明是弱酸强碱盐；②0.1mol/L醋酸若为强酸pH=1，pH>1说明未完全电离；③强酸也能与碳酸盐反应，不能说明醋酸是弱酸。

### 拓展知识

- 多元弱酸分步电离，且第一步电离程度远大于第二步：$H_2CO_3 \\rightleftharpoons H^+ + HCO_3^-$，$HCO_3^- \\rightleftharpoons H^+ + CO_3^{2-}$。
- 多元弱碱一般写一步电离：$Cu(OH)_2 \\rightleftharpoons Cu^{2+} + 2OH^-$。
- 电离常数只随温度变化，与浓度无关；温度升高，电离常数增大(电离吸热)。
- 同离子效应：在弱电解质溶液中加入与其含相同离子的强电解质，使弱电解质电离度减小的现象。
- 弱酸酸性的比较：$HF > HCOOH > CH_3COOH > H_2CO_3 > HClO$(根据电离常数大小)。`
  },
  {
    id: 'chem_045',
    title: '水的电离和溶液的酸碱性',
    stage: 'high',
    chapter: '水的电离和溶液的酸碱性',
    tags: ['水的电离', 'pH计算', '酸碱性'],
    content: `## 水的电离和溶液的酸碱性

### 核心概念

**水的电离**：水是极弱的电解质，能发生微弱电离：$H_2O \\rightleftharpoons H^+ + OH^-$。

**水的离子积常数(Kw)**：一定温度下，水中c(H⁺)与c(OH⁻)的乘积，25°C时 $K_w = 1 \\times 10^{-14}$。

**溶液的酸碱性**：由溶液中c(H⁺)与c(OH⁻)的相对大小决定。

**pH**：用来表示溶液酸碱性的物理量，$pH = -\\lg c(H^+)$。

**pH范围(25°C)**：酸性pH<7，中性pH=7，碱性pH>7。

### 化学方程式或公式总结

| 关系 | 公式 | 备注 |
|------|------|------|
| 水的离子积 | $K_w = c(H^+)·c(OH^-) = 1 \\times 10^{-14}$ | 25°C |
| pH定义 | $pH = -\\lg c(H^+)$ | c(H⁺)单位mol/L |
| pOH | $pOH = -\\lg c(OH^-)$ | 25°C时pH+pOH=14 |
| 强酸pH | $c(H^+) = n·c_{酸}$ | n为每分子酸电离H⁺数 |
| 强碱pH | $c(OH^-) = n·c_{碱}$，$c(H^+) = \\frac{K_w}{c(OH^-)}$ | 先求c(OH⁻) |

| 溶液类型 | c(H⁺)与c(OH⁻)关系 | pH |
|---------|-------------------|-----|
| 酸性 | c(H⁺) > c(OH⁻) | pH < 7 |
| 中性 | c(H⁺) = c(OH⁻) | pH = 7 |
| 碱性 | c(H⁺) < c(OH⁻) | pH > 7 |

### 实验示意图

<svg width="300" height="170" viewBox="0 0 300 170">
  <rect x="20" y="30" width="260" height="100" fill="none" stroke="var(--color-border)" stroke-width="1" />
  <text x="150" y="25" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">pH标尺(25°C)</text>
  <rect x="30" y="50" width="240" height="30" fill="none" stroke="var(--color-border)" stroke-width="0.5" />
  <rect x="30" y="50" width="80" height="30" fill="var(--color-primary)" opacity="0.4" />
  <rect x="110" y="50" width="80" height="30" fill="var(--color-text-secondary)" opacity="0.3" />
  <rect x="190" y="50" width="80" height="30" fill="var(--color-primary)" opacity="0.2" />
  <text x="50" y="70" font-size="9" fill="var(--color-text-primary)">0</text>
  <text x="140" y="70" font-size="9" fill="var(--color-text-primary)">7</text>
  <text x="250" y="70" font-size="9" fill="var(--color-text-primary)">14</text>
  <text x="70" y="90" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">酸性</text>
  <text x="150" y="90" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">中性</text>
  <text x="230" y="90" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">碱性</text>
  <text x="70" y="105" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">c(H⁺)增大</text>
  <text x="230" y="105" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">c(OH⁻)增大</text>
  <rect x="40" y="120" width="40" height="20" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="60" y="135" font-size="8" text-anchor="middle" fill="var(--color-text-primary)">甲基橙</text>
  <rect x="130" y="120" width="40" height="20" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="150" y="135" font-size="8" text-anchor="middle" fill="var(--color-text-primary)">酚酞</text>
  <rect x="220" y="120" width="40" height="20" fill="var(--color-primary)" opacity="0.4" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="240" y="135" font-size="8" text-anchor="middle" fill="var(--color-text-primary)">石蕊</text>
  <text x="150" y="160" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">常用酸碱指示剂变色范围</text>
</svg>

### 例题解析

**问题**：计算下列溶液的pH：(1)0.01mol/L的H₂SO₄溶液；(2)0.001mol/L的NaOH溶液；(3)pH=2和pH=4的盐酸等体积混合后的pH。

**解答**：

(1)H₂SO₄是强酸，完全电离：

$$c(H^+) = 2 \\times 0.01 = 0.02(mol/L)$$

$$pH = -\\lg 0.02 = -\\lg(2 \\times 10^{-2}) = 2 - \\lg 2 = 1.7$$

(2)NaOH是强碱：

$$c(OH^-) = 0.001(mol/L)$$

$$c(H^+) = \\frac{10^{-14}}{10^{-3}} = 10^{-11}(mol/L)$$

$$pH = -\\lg 10^{-11} = 11$$

(3)等体积混合：

$$c(H^+) = \\frac{10^{-2} + 10^{-4}}{2} \\approx \\frac{10^{-2}}{2} = 5 \\times 10^{-3}(mol/L)$$

$$pH = -\\lg(5 \\times 10^{-3}) = 3 - \\lg 5 = 2.3$$

### 举一反三

**练习1**：将pH=3的盐酸稀释1000倍，稀释后溶液的pH是多少？
- 答案：稀释前c(H⁺)=10⁻³mol/L，稀释1000倍后c(H⁺)=10⁻⁶mol/L，pH=6。**注意**：无限稀释时pH趋近于7，不会变为碱性。

**练习2**：25°C时，某溶液中c(H⁺)=1×10⁻¹²mol/L，求c(OH⁻)和pH，并判断酸碱性。
- 答案：$c(OH^-) = \\frac{10^{-14}}{10^{-12}} = 10^{-2}mol/L$；$pH = 12$；溶液呈**碱性**(pH>7，c(OH⁻)>c(H⁺))。

### 拓展知识

- 水的电离是吸热过程，温度升高Kw增大：100°C时 $K_w = 1 \\times 10^{-12}$，此时中性水pH=6。
- 任何水溶液中都存在H⁺和OH⁻，且$K_w = c(H^+)·c(OH^-)$恒成立(一定温度下)。
- 酸碱指示剂的变色范围：甲基橙3.1~4.4(红~黄)，酚酞8.2~10.0(无~红)，石蕊5.0~8.0(红~蓝)。
- 强酸强碱溶液稀释时pH变化规律：强酸稀释10倍pH增大1，强碱稀释10倍pH减小1。
- 溶液pH的测定方法：pH试纸(粗测)、pH计(精确测定)、酸碱指示剂(定性判断)。`
  },
  {
    id: 'chem_046',
    title: '盐类的水解',
    stage: 'high',
    chapter: '盐类的水解',
    tags: ['水解原理', '影响水解因素', '盐溶液酸碱性'],
    content: `## 盐类的水解

### 核心概念

**盐类的水解**：在水溶液中盐电离出的离子与水电离出的H⁺或OH⁻结合生成弱电解质的反应。

**水解的本质**：盐促进水的电离，是中和反应的逆反应。

**水解规律**：有弱才水解，无弱不水解；谁弱谁水解，谁强显谁性。

**强酸弱碱盐**：水解呈酸性，如NH₄Cl、FeCl₃。

**强碱弱酸盐**：水解呈碱性，如Na₂CO₃、CH₃COONa。

**强酸强碱盐**：不水解，溶液呈中性，如NaCl、KNO₃。

### 化学方程式或公式总结

| 盐的类型 | 实例 | 水解离子方程式 | 溶液酸碱性 |
|---------|------|--------------|-----------|
| 强酸弱碱盐 | NH₄Cl | $NH_4^+ + H_2O \\rightleftharpoons NH_3·H_2O + H^+$ | 酸性 |
| 强酸弱碱盐 | FeCl₃ | $Fe^{3+} + 3H_2O \\rightleftharpoons Fe(OH)_3 + 3H^+$ | 酸性 |
| 强碱弱酸盐 | CH₃COONa | $CH_3COO^- + H_2O \\rightleftharpoons CH_3COOH + OH^-$ | 碱性 |
| 强碱弱酸盐 | Na₂CO₃ | $CO_3^{2-} + H_2O \\rightleftharpoons HCO_3^- + OH^-$ | 碱性 |
| 强碱弱酸盐 | NaHCO₃ | $HCO_3^- + H_2O \\rightleftharpoons H_2CO_3 + OH^-$ | 弱碱性 |
| 强酸强碱盐 | NaCl | 不水解 | 中性 |

**双水解**：阴阳离子均发生水解且相互促进，如 $Al^{3+}$ 与 $CO_3^{2-}$、$HCO_3^-$ 反应完全。

### 实验示意图

<svg width="300" height="170" viewBox="0 0 300 170">
  <rect x="20" y="30" width="260" height="120" fill="none" stroke="var(--color-border)" stroke-width="1" />
  <text x="150" y="25" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">盐类水解原理</text>
  <rect x="40" y="50" width="60" height="50" rx="3" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="70" y="80" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">CH₃COONa</text>
  <rect x="120" y="50" width="60" height="50" rx="3" fill="var(--color-text-secondary)" opacity="0.2" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="150" y="80" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">H₂O</text>
  <rect x="200" y="50" width="60" height="50" rx="3" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="230" y="75" font-size="8" text-anchor="middle" fill="var(--color-text-primary)">CH₃COOH</text>
  <text x="230" y="90" font-size="8" text-anchor="middle" fill="var(--color-text-primary)">+NaOH</text>
  <path d="M105 75 L115 75" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#g1)" />
  <path d="M185 75 L195 75" stroke="var(--color-primary)" stroke-width="2" marker-end="url(#g1)" />
  <text x="150" y="115" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">CH₃COO⁻结合H⁺</text>
  <text x="150" y="130" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">促进水电离，OH⁻增多</text>
  <text x="150" y="145" font-size="9" text-anchor="middle" fill="var(--color-primary)">溶液呈碱性</text>
  <defs>
    <marker id="g1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-primary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：比较等浓度的①NaCl ②CH₃COONa ③Na₂CO₃ ④NH₄Cl 四种溶液pH的大小顺序。

**解答**：

判断各溶液的酸碱性：

- ①NaCl：强酸强碱盐，不水解，pH=7。
- ②CH₃COONa：强碱弱酸盐，水解呈碱性，pH>7。
- ③Na₂CO₃：强碱弱酸盐，且H₂CO₃比CH₃COOH更弱，水解程度更大，pH更大。
- ④NH₄Cl：强酸弱碱盐，水解呈酸性，pH<7。

所以pH由大到小顺序：**③ > ② > ① > ④**

判断依据：酸性越弱的酸，其盐水解程度越大，碱性越强。酸性：CH₃COOH > H₂CO₃的二级电离，但CO₃²⁻水解能力比CH₃COO⁻强。

### 举一反三

**练习1**：配制FeCl₃溶液时为什么要加入少量稀盐酸？
- 答案：Fe³⁺水解：$Fe^{3+} + 3H_2O \\rightleftharpoons Fe(OH)_3 + 3H^+$。加盐酸可增大c(H⁺)，抑制Fe³⁺水解，防止溶液浑浊。

**练习2**：泡沫灭火器的原理是什么？写出相关离子方程式。
- 答案：利用Al₂(SO₄)₃与NaHCO₃混合发生双水解：$Al^{3+} + 3HCO_3^- = Al(OH)_3\\downarrow + 3CO_2\\uparrow$，产生的CO₂泡沫覆盖火源灭火。

### 拓展知识

- 影响水解的因素：①温度(升温促进水解)；②浓度(稀释促进水解)；③溶液酸碱性(加酸抑制阳离子水解，加碱抑制阴离子水解)。
- 多元弱酸根离子分步水解，第一步水解程度远大于第二步：$CO_3^{2-} + H_2O \\rightleftharpoons HCO_3^- + OH^-$ 为主。
- 盐类水解是吸热反应，加热可促进水解。
- 判断溶液中离子浓度大小的方法：物料守恒、电荷守恒、质子守恒。
- 完全双水解的离子对：Al³⁺与CO₃²⁻、HCO₃⁻、S²⁻、HS⁻；Fe³⁺与CO₃²⁻、HCO₃⁻等。`
  },
  {
    id: 'chem_047',
    title: '原电池',
    stage: 'high',
    chapter: '原电池',
    tags: ['原电池', '电极反应', '化学电源'],
    content: `## 原电池

### 核心概念

**原电池**：将化学能转化为电能的装置。

**构成条件**：①两个活动性不同的电极；②电解质溶液；③形成闭合回路；④能自发进行的氧化还原反应。

**负极**：较活泼金属，发生氧化反应，失去电子。

**正极**：较不活泼金属或导电非金属，发生还原反应，得到电子。

**电流方向**：由正极经外电路流向负极；电子方向相反。

**盐桥**：连接两个半电池，保持电荷平衡的装置，含KCl等饱和溶液。

### 化学方程式或公式总结

| 电池类型 | 负极反应 | 正极反应 | 总反应 |
|---------|---------|---------|--------|
| 锌铜原电池 | $Zn - 2e^- = Zn^{2+}$ | $Cu^{2+} + 2e^- = Cu$ | $Zn + Cu^{2+} = Zn^{2+} + Cu$ |
| 锌锰干电池 | $Zn - 2e^- = Zn^{2+}$ | $2MnO_2 + 2NH_4^+ + 2e^- = Mn_2O_3 + 2NH_3 + H_2O$ | 复杂 |
| 铅蓄电池 | $Pb + SO_4^{2-} - 2e^- = PbSO_4$ | $PbO_2 + 4H^+ + SO_4^{2-} + 2e^- = PbSO_4 + 2H_2O$ | $Pb + PbO_2 + 2H_2SO_4 = 2PbSO_4 + 2H_2O$ |
| 氢氧燃料电池(酸) | $2H_2 - 4e^- = 4H^+$ | $O_2 + 4H^+ + 4e^- = 2H_2O$ | $2H_2 + O_2 = 2H_2O$ |
| 氢氧燃料电池(碱) | $2H_2 + 4OH^- - 4e^- = 4H_2O$ | $O_2 + 2H_2O + 4e^- = 4OH^-$ | $2H_2 + O_2 = 2H_2O$ |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="40" y="40" width="220" height="120" rx="3" fill="var(--color-bg-secondary)" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="150" y="35" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">锌铜原电池(CuSO₄溶液)</text>
  <rect x="60" y="60" width="20" height="80" fill="var(--color-primary)" opacity="0.7" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="70" y="155" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">Zn(-)</text>
  <rect x="220" y="60" width="20" height="80" fill="var(--color-text-secondary)" opacity="0.6" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="230" y="155" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">Cu(+)</text>
  <path d="M80 65 L220 65" stroke="var(--color-primary)" stroke-width="2" />
  <path d="M150 55 L150 45" stroke="var(--color-text-primary)" stroke-width="2" marker-end="url(#h1)" />
  <text x="150" y="42" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">电流方向</text>
  <text x="135" y="60" font-size="8" fill="var(--color-text-secondary)">←电子</text>
  <circle cx="100" cy="100" r="3" fill="var(--color-primary)" />
  <circle cx="180" cy="100" r="3" fill="var(--color-text-secondary)" />
  <text x="150" y="120" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">CuSO₄溶液</text>
  <text x="150" y="175" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">Zn失去电子→Cu²⁺得到电子</text>
  <defs>
    <marker id="h1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="var(--color-text-primary)" />
    </marker>
  </defs>
</svg>

### 例题解析

**问题**：用铁片、铜片、稀硫酸构成原电池，写出电极反应和总反应方程式，并指出电子流动方向。

**解答**：

铁比铜活泼，铁作负极，铜作正极。

**负极(Fe)**：发生氧化反应

$$Fe - 2e^- = Fe^{2+}$$

**正极(Cu)**：发生还原反应，溶液中H⁺得到电子

$$2H^+ + 2e^- = H_2\\uparrow$$

**总反应**：

$$Fe + 2H^+ = Fe^{2+} + H_2\\uparrow$$

**电子流向**：由铁片(负极)经外电路流向铜片(正极)；电流方向相反。

**现象**：铁片逐渐溶解，铜片表面产生气泡，电流计指针偏转。

### 举一反三

**练习1**：氢氧燃料电池(电解质为KOH溶液)的两极反应是什么？
- 答案：负极(H₂)：$2H_2 + 4OH^- - 4e^- = 4H_2O$；正极(O₂)：$O_2 + 2H_2O + 4e^- = 4OH^-$；总反应：$2H_2 + O_2 = 2H_2O$。

**练习2**：下列装置能构成原电池的是（  ）
- A. Zn片、Cu片插入稀硫酸  B. Zn片、Cu片插入蔗糖溶液  C. 两根Cu片插入稀盐酸  D. Zn片、石墨插入CuCl₂溶液
- 答案：**A、D**。A活动性不同且有电解质溶液；B蔗糖是非电解质；C两电极相同；D电极不同且有电解质溶液。

### 拓展知识

- 原电池原理应用：①制作化学电源；②金属的防腐(牺牲阳极的阴极保护法)；③加快反应速率。
- 金属腐蚀：电化学腐蚀比化学腐蚀更普遍，钢铁腐蚀主要是吸氧腐蚀(中性或弱酸性条件下)。
- 吸氧腐蚀：负极 $Fe - 2e^- = Fe^{2+}$，正极 $O_2 + 2H_2O + 4e^- = 4OH^-$。
- 析氢腐蚀：在较强酸性条件下，正极反应 $2H^+ + 2e^- = H_2\\uparrow$。
- 燃料电池能量转化率高、污染小，是具有发展前景的化学电源。
- 铅蓄电池可反复充放电，是常见的二次电池；锂离子电池广泛用于手机、电动汽车。`
  },
  {
    id: 'chem_048',
    title: '电解池',
    stage: 'high',
    chapter: '电解池',
    tags: ['电解', '电解应用', '电镀'],
    content: `## 电解池

### 核心概念

**电解池**：将电能转化为化学能的装置，利用电流促使非自发反应发生。

**构成条件**：①直流电源；②两个电极；③电解质溶液或熔融电解质；④闭合回路。

**阳极**：与电源正极相连，发生氧化反应，失去电子。

**阴极**：与电源负极相连，发生还原反应，得到电子。

**放电顺序**：

- 阳极(惰性电极)：$S^{2-} > I^- > Br^- > Cl^- > OH^- > 含氧酸根$
- 阴极：$Ag^+ > Fe^{3+} > Cu^{2+} > H^+ > Pb^{2+} > Zn^{2+} > Al^{3+} > Mg^{2+} > Na^+$

**电镀**：利用电解原理在金属表面镀上一层其他金属的过程。

### 化学方程式或公式总结

| 电解对象 | 阳极反应 | 阴极反应 | 总反应 |
|---------|---------|---------|--------|
| 电解CuCl₂溶液 | $2Cl^- - 2e^- = Cl_2\\uparrow$ | $Cu^{2+} + 2e^- = Cu$ | $CuCl_2 \\xrightarrow{通电} Cu + Cl_2\\uparrow$ |
| 电解NaCl溶液 | $2Cl^- - 2e^- = Cl_2\\uparrow$ | $2H_2O + 2e^- = H_2\\uparrow + 2OH^-$ | $2NaCl + 2H_2O \\xrightarrow{通电} 2NaOH + H_2\\uparrow + Cl_2\\uparrow$ |
| 电解水(加H₂SO₄) | $2H_2O - 4e^- = O_2\\uparrow + 4H^+$ | $4H^+ + 4e^- = 2H_2\\uparrow$ | $2H_2O \\xrightarrow{通电} 2H_2\\uparrow + O_2\\uparrow$ |
| 电解熔融Al₂O₃ | $6O^{2-} - 12e^- = 3O_2\\uparrow$ | $4Al^{3+} + 12e^- = 4Al$ | $2Al_2O_3 \\xrightarrow{通电} 4Al + 3O_2\\uparrow$ |
| 电镀铜(铜作阳极) | $Cu - 2e^- = Cu^{2+}$ | $Cu^{2+} + 2e^- = Cu$ | 溶液浓度不变 |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <rect x="60" y="60" width="180" height="100" rx="3" fill="var(--color-bg-secondary)" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="150" y="55" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">电解CuCl₂溶液</text>
  <rect x="90" y="80" width="15" height="60" fill="var(--color-text-secondary)" opacity="0.5" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="97" y="155" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">阳极</text>
  <rect x="195" y="80" width="15" height="60" fill="var(--color-primary)" opacity="0.5" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="202" y="155" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">阴极</text>
  <line x1="97" y1="80" x2="120" y2="40" stroke="var(--color-text-primary)" stroke-width="2" />
  <line x1="202" y1="80" x2="180" y2="40" stroke="var(--color-text-primary)" stroke-width="2" />
  <rect x="120" y="30" width="60" height="20" rx="3" fill="none" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="135" y="44" font-size="9" fill="var(--color-text-primary)">+</text>
  <text x="165" y="44" font-size="9" fill="var(--color-text-primary)">−</text>
  <text x="150" y="22" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">电源</text>
  <text x="130" y="110" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">Cl₂↑</text>
  <text x="180" y="110" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">Cu</text>
  <text x="150" y="125" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">CuCl₂溶液</text>
  <text x="150" y="175" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">阳极氧化，阴极还原</text>
</svg>

### 例题解析

**问题**：用惰性电极电解饱和NaCl溶液，写出两极反应和总反应方程式，并说明溶液pH如何变化。

**解答**：

NaCl溶液中存在：$Na^+$、$Cl^-$、$H^+$、$OH^-$。

**阳极**：$Cl^-$的放电能力大于$OH^-$

$$2Cl^- - 2e^- = Cl_2\\uparrow$$

**阴极**：$H^+$的放电能力大于$Na^+$

$$2H_2O + 2e^- = H_2\\uparrow + 2OH^-$$

**总反应**：

$$2NaCl + 2H_2O \\xrightarrow{通电} 2NaOH + H_2\\uparrow + Cl_2\\uparrow$$

由于反应生成NaOH，溶液中c(OH⁻)增大，所以溶液的pH**增大**(由中性变为碱性)。

此原理用于工业制取烧碱(NaOH)和氯气，称为氯碱工业。

### 举一反三

**练习1**：用惰性电极电解CuSO₄溶液一段时间后，溶液的pH如何变化？为什么？
- 答案：pH**减小**(溶液变酸)。阳极：$2H_2O - 4e^- = O_2\\uparrow + 4H^+$，阴极：$2Cu^{2+} + 4e^- = 2Cu$，总反应：$2CuSO_4 + 2H_2O \\xrightarrow{通电} 2Cu + O_2\\uparrow + 2H_2SO_4$，生成H₂SO₄使溶液变酸。

**练习2**：电镀铜时，应选用什么作阳极、阴极和电镀液？
- 答案：阳极用**镀层金属铜**(Cu)，阴极用**待镀金属**(如铁)，电镀液用**含Cu²⁺的盐溶液**(如CuSO₄溶液)。电镀过程中电镀液浓度保持不变。

### 拓展知识

- 电解原理的应用：①电镀(金属防腐)；②电解冶炼(制取活泼金属如钠、镁、铝)；③氯碱工业；④电精炼(精炼铜)。
- 精炼铜时，粗铜作阳极(阳极泥含贵金属)，纯铜作阴极，CuSO₄溶液作电解液。
- 电解熔融NaCl制取金属钠：$2NaCl(熔融) \\xrightarrow{通电} 2Na + Cl_2\\uparrow$。
- 原电池与电解池的比较：原电池是化学能→电能(自发反应)，电解池是电能→化学能(非自发反应)。
- 电解过程中，阳极若为活泼金属，则金属优先失去电子被氧化溶解。`
  },
  {
    id: 'chem_049',
    title: '烃',
    stage: 'high',
    chapter: '烃',
    tags: ['甲烷', '乙烯', '乙炔', '苯'],
    content: `## 烃

### 核心概念

**烃**：仅由碳和氢两种元素组成的有机化合物，也叫碳氢化合物。

**甲烷(CH₄)**：最简单的烃，正四面体结构，发生取代反应。

**乙烯(C₂H₄)**：含碳碳双键的烃，平面结构，发生加成反应和加聚反应。

**乙炔(C₂H₂)**：含碳碳三键的烃，直线形结构，燃烧温度高。

**苯(C₆H₆)**：环状结构，碳碳键介于单键和双键之间，发生取代反应而非加成反应。

**同系物**：结构相似，分子组成相差一个或若干个CH₂原子团的有机物。

### 化学方程式或公式总结

| 反应类型 | 化学方程式 | 备注 |
|---------|-----------|------|
| 甲烷燃烧 | $CH_4 + 2O_2 \\xrightarrow{点燃} CO_2 + 2H_2O$ | 火焰淡蓝色 |
| 甲烷取代(氯代) | $CH_4 + Cl_2 \\xrightarrow{光照} CH_3Cl + HCl$ | 继续取代得多卤代物 |
| 乙烯加成(溴水) | $CH_2=CH_2 + Br_2 \\to CH_2Br-CH_2Br$ | 使溴水褪色 |
| 乙烯加成(氢气) | $CH_2=CH_2 + H_2 \\xrightarrow{催化剂} CH_3-CH_3$ | 生成乙烷 |
| 乙烯加聚 | $nCH_2=CH_2 \\xrightarrow{催化剂} -[-CH_2-CH_2-]_n-$ | 生成聚乙烯 |
| 乙炔燃烧 | $2C_2H_2 + 5O_2 \\xrightarrow{点燃} 4CO_2 + 2H_2O$ | 火焰明亮带黑烟 |
| 乙炔加成(溴水) | $CH\\equiv CH + 2Br_2 \\to CHBr_2-CHBr_2$ | 使溴水褪色 |
| 苯燃烧 | $2C_6H_6 + 15O_2 \\xrightarrow{点燃} 12CO_2 + 6H_2O$ | 火焰明亮带浓黑烟 |
| 苯的溴代 | $C_6H_6 + Br_2 \\xrightarrow{FeBr_3} C_6H_5Br + HBr$ | 取代反应 |
| 苯的硝化 | $C_6H_6 + HNO_3 \\xrightarrow[\\Delta]{浓H_2SO_4} C_6H_5NO_2 + H_2O$ | 取代反应 |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <text x="75" y="20" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">甲烷(正四面体)</text>
  <text x="225" y="20" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">苯(环状)</text>
  <circle cx="75" cy="90" r="6" fill="var(--color-text-secondary)" />
  <text x="75" y="94" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">C</text>
  <circle cx="50" cy="60" r="4" fill="var(--color-primary)" />
  <circle cx="100" cy="60" r="4" fill="var(--color-primary)" />
  <circle cx="55" cy="120" r="4" fill="var(--color-primary)" />
  <circle cx="95" cy="120" r="4" fill="var(--color-primary)" />
  <line x1="75" y1="90" x2="50" y2="60" stroke="var(--color-text-primary)" stroke-width="1" />
  <line x1="75" y1="90" x2="100" y2="60" stroke="var(--color-text-primary)" stroke-width="1" />
  <line x1="75" y1="90" x2="55" y2="120" stroke="var(--color-text-primary)" stroke-width="1" />
  <line x1="75" y1="90" x2="95" y2="120" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="45" y="55" font-size="8" fill="var(--color-text-secondary)">H</text>
  <text x="105" y="55" font-size="8" fill="var(--color-text-secondary)">H</text>
  <text x="48" y="130" font-size="8" fill="var(--color-text-secondary)">H</text>
  <text x="100" y="130" font-size="8" fill="var(--color-text-secondary)">H</text>
  <polygon points="200,60 250,60 275,95 250,130 200,130 175,95" fill="none" stroke="var(--color-primary)" stroke-width="2" />
  <circle cx="200" cy="60" r="4" fill="var(--color-text-secondary)" />
  <circle cx="250" cy="60" r="4" fill="var(--color-text-secondary)" />
  <circle cx="275" cy="95" r="4" fill="var(--color-text-secondary)" />
  <circle cx="250" cy="130" r="4" fill="var(--color-text-secondary)" />
  <circle cx="200" cy="130" r="4" fill="var(--color-text-secondary)" />
  <circle cx="175" cy="95" r="4" fill="var(--color-text-secondary)" />
  <circle cx="225" cy="95" r="15" fill="none" stroke="var(--color-primary)" stroke-width="1" opacity="0.5" />
  <text x="75" y="160" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">键角109°28'</text>
  <text x="225" y="160" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">6个C等价</text>
</svg>

### 例题解析

**问题**：某烃A的分子式为C₂H₄，能与溴水反应使其褪色，也能发生加聚反应。请推断A的结构简式并写出相关方程式。

**解答**：

A的分子式C₂H₄满足通式CnH2n，不饱和度为1，可能是烯烃或环烷烃。

由于能与溴水反应使其褪色并发生加聚反应，说明A含碳碳双键，是烯烃。

A的结构简式：$CH_2=CH_2$ (乙烯)

**加成反应(溴水)**：

$$CH_2=CH_2 + Br_2 \\to CH_2Br-CH_2Br(1,2-二溴乙烷)$$

**加聚反应**：

$$nCH_2=CH_2 \\xrightarrow{催化剂} \\left[-CH_2-CH_2-\\right]_n(聚乙烯)$$

### 举一反三

**练习1**：如何用化学方法鉴别甲烷和乙烯？
- 答案：分别通入溴水或酸性高锰酸钾溶液，**能使溴水或KMnO₄溶液褪色**的是乙烯，不能褪色的是甲烷。

**练习2**：苯能否使溴水褪色？原因是什么？
- 答案：苯**能**使溴水褪色，但原因是**萃取**而非加成反应。苯不与溴水发生加成反应，但苯能萃取溴水中的溴，使水层褪色(苯层呈橙红色)。苯不能使酸性KMnO₄褪色。

### 拓展知识

- 甲烷是天然气和沼气的主要成分，是清洁能源。
- 乙烯是石油化工最重要的基础原料，常作为衡量一个国家石油化工发展水平的标志。
- 乙炔在氧气中燃烧的火焰(氧炔焰)温度可达3000°C以上，用于焊接和切割金属。
- 苯的凯库勒式(单双键交替)不能完全反映苯的真实结构，苯环中6个碳碳键完全相同，是介于单键和双键之间的特殊键。
- 烃的分类：烷烃(CnH2n+2)、烯烃(CnH2n)、炔烃(CnH2n-2)、芳香烃。`
  },
  {
    id: 'chem_050',
    title: '烃的衍生物',
    stage: 'high',
    chapter: '烃的衍生物',
    tags: ['乙醇', '乙酸', '酯化反应'],
    content: `## 烃的衍生物

### 核心概念

**烃的衍生物**：烃分子中的氢原子被其他原子或原子团取代生成的化合物。

**官能团**：决定有机化合物化学性质的原子或原子团，如-OH(羟基)、-COOH(羧基)、-CHO(醛基)等。

**乙醇(C₂H₅OH)**：俗称酒精，含羟基(-OH)官能团，能与活泼金属反应放出H₂。

**乙酸(CH₃COOH)**：俗称醋酸，含羧基(-COOH)官能团，具有弱酸性。

**酯化反应**：酸与醇作用生成酯和水的反应，是可逆反应。

**酯**：通式RCOOR'，具有芳香气味，难溶于水，易溶于有机溶剂。

### 化学方程式或公式总结

| 反应类型 | 化学方程式 | 备注 |
|---------|-----------|------|
| 乙醇与钠 | $2CH_3CH_2OH + 2Na \\to 2CH_3CH_2ONa + H_2\\uparrow$ | 羟基氢被置换 |
| 乙醇燃烧 | $CH_3CH_2OH + 3O_2 \\xrightarrow{点燃} 2CO_2 + 3H_2O$ | 蓝色火焰 |
| 乙醇催化氧化 | $2CH_3CH_2OH + O_2 \\xrightarrow{Cu}{\\Delta} 2CH_3CHO + 2H_2O$ | 生成乙醛 |
| 乙酸电离 | $CH_3COOH \\rightleftharpoons CH_3COO^- + H^+$ | 弱酸 |
| 乙酸与碳酸钠 | $2CH_3COOH + Na_2CO_3 \\to 2CH_3COONa + H_2O + CO_2\\uparrow$ | 强酸制弱酸 |
| 酯化反应 | $CH_3COOH + C_2H_5OH \\rightleftharpoons CH_3COOC_2H_5 + H_2O$ | 浓硫酸催化加热 |
| 酯的水解 | $CH_3COOC_2H_5 + H_2O \\rightleftharpoons CH_3COOH + C_2H_5OH$ | 可逆，酸或碱催化 |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <text x="150" y="20" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">酯化反应装置</text>
  <rect x="40" y="50" width="80" height="100" rx="3" fill="var(--color-bg-secondary)" stroke="var(--color-text-primary)" stroke-width="2" />
  <rect x="45" y="100" width="70" height="45" fill="var(--color-primary)" opacity="0.2" />
  <text x="80" y="125" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">乙醇+乙酸</text>
  <text x="80" y="140" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">+浓H₂SO₄</text>
  <path d="M120 70 L120 50 L160 50 L160 70" stroke="var(--color-text-primary)" stroke-width="2" fill="none" />
  <path d="M120 60 L150 60" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="135" y="55" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">加热</text>
  <path d="M120 90 L130 90 L130 70" stroke="var(--color-text-primary)" stroke-width="2" fill="none" />
  <rect x="180" y="50" width="80" height="100" rx="3" fill="var(--color-text-secondary)" opacity="0.15" stroke="var(--color-text-primary)" stroke-width="2" />
  <rect x="185" y="110" width="70" height="35" fill="var(--color-primary)" opacity="0.3" />
  <text x="220" y="130" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">饱和Na₂CO₃</text>
  <path d="M125 75 L150 55 L175 75 L200 95 L200 110" stroke="var(--color-text-primary)" stroke-width="2" fill="none" />
  <text x="220" y="100" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">收集酯</text>
  <text x="150" y="170" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">浓硫酸催化，可逆反应</text>
</svg>

### 例题解析

**问题**：实验室用乙酸和乙醇制取乙酸乙酯，回答：(1)浓硫酸的作用；(2)为什么加入碎瓷片；(3)收集时为什么用饱和Na₂CO₃溶液。

**解答**：

(1)浓硫酸的作用：**催化剂**和**吸水剂**。催化酯化反应，同时吸收生成的水使平衡正向移动，提高酯的产率。

(2)加入碎瓷片(或沸石)：**防止暴沸**。

(3)用饱和Na₂CO₃溶液收集的目的：
- 降低乙酸乙酯的溶解度，便于分层
- 中和挥发出的乙酸
- 溶解挥发出的乙醇

酯化反应方程式：

$$CH_3COOH + CH_3CH_2OH \\rightleftharpoons CH_3COOCH_2CH_3 + H_2O$$

注意：反应中酸脱羟基醇脱氢(用同位素示踪法证明，\${}^{18}O$在酯中)。

### 举一反三

**练习1**：等物质的量的乙醇分别与足量钠、足量乙酸反应，放出H₂的物质的量之比是多少？
- 答案：乙醇与钠反应放出H₂($2CH_3CH_2OH + 2Na \\to 2CH_3CH_2ONa + H_2\\uparrow$)，1mol乙醇生成0.5mol H₂。乙醇与乙酸不反应放出H₂。所以比为 **1:0**（乙酸与乙醇不反应产生H₂，只有与钠反应才产生H₂）。

**练习2**：如何鉴别乙醇、乙酸和乙酸乙酯三种无色液体？
- 答案：①先闻气味，有芳香气味的是**乙酸乙酯**；②剩余两种用pH试纸或紫色石蕊检验，变红的是**乙酸**，不变色的是**乙醇**。或加Na₂CO₃溶液，产生气泡的是乙酸。

### 拓展知识

- 乙醇是重要的有机溶剂和化工原料，医疗上用75%的乙醇溶液消毒。
- 乙醇的催化氧化：$2CH_3CH_2OH + O_2 \\xrightarrow[\\Delta]{Cu} 2CH_3CHO + 2H_2O$，进一步氧化可得乙酸。
- 酯化反应是可逆反应，提高产率的方法：增大反应物浓度或移去生成物。
- 醛基(-CHO)的检验：银镜反应或与新制Cu(OH)₂悬浊液反应。
- 油脂是高级脂肪酸的甘油酯，属于酯类，在碱性条件下水解生成肥皂(皂化反应)。`
  },
  {
    id: 'chem_051',
    title: '糖类油脂蛋白质',
    stage: 'high',
    chapter: '糖类油脂蛋白质',
    tags: ['糖类', '油脂', '蛋白质', '营养物质'],
    content: `## 糖类油脂蛋白质

### 核心概念

**糖类**：多羟基醛或多羟基酮及水解能生成它们的化合物，是生命活动的主要能源物质。

**单糖**：不能水解的糖，如葡萄糖(C₆H₁₂O₆)、果糖。

**二糖**：水解生成两分子单糖的糖，如蔗糖、麦芽糖。

**多糖**：水解生成多分子单糖的糖，如淀粉、纤维素，通式(C₆H₁₀O₅)n。

**油脂**：高级脂肪酸的甘油酯，是人体重要的储能物质。

**蛋白质**：由氨基酸通过肽键连接而成的高分子化合物，是生命活动的体现者。

**氨基酸**：含氨基(-NH₂)和羧基(-COOH)的化合物，是蛋白质的基本单位。

### 化学方程式或公式总结

| 类别 | 代表物质 | 化学式 | 特征反应 |
|------|---------|--------|---------|
| 单糖 | 葡萄糖 | $C_6H_{12}O_6$ | 银镜反应，与新制Cu(OH)₂反应 |
| 二糖 | 蔗糖 | $C_{12}H_{22}O_{11}$ | 水解生成葡萄糖和果糖 |
| 二糖 | 麦芽糖 | $C_{12}H_{22}O_{11}$ | 水解生成葡萄糖，有银镜反应 |
| 多糖 | 淀粉 | $(C_6H_{10}O_5)_n$ | 遇碘变蓝色 |
| 多糖 | 纤维素 | $(C_6H_{10}O_5)_n$ | 水解生成葡萄糖 |
| 油脂 | — | — | 水解生成脂肪酸和甘油 |
| 蛋白质 | — | — | 双缩脲反应(紫色)，盐析变性 |

| 反应 | 化学方程式 | 备注 |
|------|-----------|------|
| 葡萄糖燃烧 | $C_6H_{12}O_6 + 6O_2 \\to 6CO_2 + 6H_2O$ | 提供能量 |
| 葡萄糖银镜反应 | $CH_2OH(CHOH)_4CHO + 2[Ag(NH_3)_2]OH \\to CH_2OH(CHOH)_4COONH_4 + 2Ag\\downarrow + 3NH_3 + H_2O$ | 检验醛基 |
| 蔗糖水解 | $C_{12}H_{22}O_{11} + H_2O \\to C_6H_{12}O_6 + C_6H_{12}O_6$ | 葡萄糖+果糖 |
| 淀粉水解 | $(C_6H_{10}O_5)_n + nH_2O \\to nC_6H_{12}O_6$ | 催化剂催化 |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <text x="150" y="20" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">三大营养物质</text>
  <rect x="20" y="40" width="80" height="60" rx="5" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="60" y="65" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">糖类</text>
  <text x="60" y="80" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">主要能源</text>
  <text x="60" y="95" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">(C₆H₁₀O₅)n</text>
  <rect x="110" y="40" width="80" height="60" rx="5" fill="var(--color-text-secondary)" opacity="0.2" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="150" y="65" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">油脂</text>
  <text x="150" y="80" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">储能物质</text>
  <text x="150" y="95" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">高级脂肪酸酯</text>
  <rect x="200" y="40" width="80" height="60" rx="5" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="240" y="65" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">蛋白质</text>
  <text x="240" y="80" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">生命体现者</text>
  <text x="240" y="95" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">氨基酸构成</text>
  <text x="60" y="130" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">水解→单糖</text>
  <text x="150" y="130" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">水解→脂肪酸+甘油</text>
  <text x="240" y="130" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">水解→氨基酸</text>
  <text x="60" y="155" font-size="8" text-anchor="middle" fill="var(--color-text-primary)">淀粉遇I₂变蓝</text>
  <text x="150" y="155" font-size="8" text-anchor="middle" fill="var(--color-text-primary)">皂化反应</text>
  <text x="240" y="155" font-size="8" text-anchor="middle" fill="var(--color-text-primary)">双缩脲显紫色</text>
</svg>

### 例题解析

**问题**：某白色固体A，分子式为(C₆H₁₀O₅)n，遇碘变蓝色，在稀硫酸催化下水解生成B。B能发生银镜反应。请推断A、B各是什么物质，并写出相关方程式。

**解答**：

A遇碘变蓝色，是**淀粉**的特征反应，所以A是淀粉。

A水解生成B：$(C_6H_{10}O_5)_n + nH_2O \\xrightarrow{H_2SO_4} nC_6H_{12}O_6$

B能发生银镜反应，含醛基，B是**葡萄糖**。

葡萄糖的银镜反应：

$$CH_2OH(CHOH)_4CHO + 2[Ag(NH_3)_2]OH \\xrightarrow{\\Delta} CH_2OH(CHOH)_4COONH_4 + 2Ag\\downarrow + 3NH_3 + H_2O$$

检验淀粉水解是否完全：取水解液加碘水，若不变蓝说明水解完全；若变蓝说明水解不完全。注意检验水解产物前需先加NaOH中和硫酸，再加银氨溶液。

### 举一反三

**练习1**：如何鉴别葡萄糖、蔗糖和淀粉三种溶液？
- 答案：①取三种溶液分别加碘水，**变蓝色**的是淀粉；②取剩余两种加银氨溶液水浴加热，**产生银镜**的是葡萄糖(含醛基)，无现象的是蔗糖(无醛基)。

**练习2**：蛋白质的盐析和变性有何区别？
- 答案：**盐析**是加入轻金属盐(如(NH₄)₂SO₄)使蛋白质溶解度降低而析出，是可逆过程，不改变蛋白质活性，加水可重新溶解；**变性**是受热、重金属盐、酸碱、酒精等作用使蛋白质失去活性，是**不可逆**过程，不能重新溶解。

### 拓展知识

- 葡萄糖是人体主要的能源物质，在体内氧化分解提供能量：$C_6H_{12}O_6 + 6O_2 \\to 6CO_2 + 6H_2O$ + 能量。
- 纤维素和淀粉虽然通式都是(C₆H₁₀O₅)n，但n值不同，结构不同，不是同分异构体。
- 油脂在碱性条件下的水解反应称为皂化反应，工业上用于制肥皂。
- 必需氨基酸有8种，人体不能自身合成，必须从食物中获取。
- 蛋白质的盐析可用于分离提纯蛋白质；重金属盐使蛋白质变性，因此重金属中毒时可喝牛奶或生蛋清解毒。
- 酶是生物催化剂，本质是蛋白质，具有高效性、专一性和温和性。`
  },
  {
    id: 'chem_052',
    title: '化学与生活',
    stage: 'middle',
    chapter: '化学与生活',
    tags: ['营养物质', '化学与健康', '化学与材料', '化学与环境'],
    content: `## 化学与生活

### 核心概念

**人类重要的营养物质**：蛋白质、糖类、油脂、维生素、无机盐和水是人类维持生命活动所需的六大营养素。

**蛋白质**：构成细胞的基本物质，是机体生长及修补受损组织的主要原料。富含蛋白质的食物：肉、蛋、奶、豆类。

**糖类**：主要的供能物质，包括淀粉、葡萄糖、蔗糖等。富含糖类的食物：米饭、馒头、土豆等。

**油脂**：重要的储能物质，提供能量，保护内脏。分为动物油脂（脂肪）和植物油脂（油）。

**维生素**：调节新陈代谢、预防疾病、维持身体健康。缺乏维生素会引起各种疾病（如缺维生素C会患坏血病）。

**化学元素与人体健康**：人体必需元素分为常量元素（如Ca、P、K等）和微量元素（如Fe、Zn、Se等）。

### 化学方程式或公式总结

| 营养素 | 主要作用 | 食物来源 |
|--------|---------|---------|
| 蛋白质 | 构成细胞、提供能量 | 肉、蛋、奶、豆制品 |
| 糖类 | 主要供能物质 | 米饭、面粉、土豆 |
| 油脂 | 储能、供能、保护内脏 | 植物油、动物脂肪 |
| 维生素A | 保护视力 | 胡萝卜、动物肝脏 |
| 维生素C | 预防坏血病 | 新鲜蔬菜、水果 |
| 钙(Ca) | 骨骼和牙齿的主要成分 | 牛奶、豆制品 |
| 铁(Fe) | 预防贫血 | 肝脏、瘦肉、菠菜 |
| 碘(I) | 预防甲状腺肿大 | 海带、加碘盐 |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <text x="150" y="20" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">六大营养素</text>
  <rect x="30" y="40" width="70" height="45" rx="5" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="65" y="58" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">蛋白质</text>
  <text x="65" y="75" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">构成细胞</text>
  <rect x="115" y="40" width="70" height="45" rx="5" fill="var(--color-text-secondary)" opacity="0.2" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="150" y="58" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">糖类</text>
  <text x="150" y="75" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">主要供能</text>
  <rect x="200" y="40" width="70" height="45" rx="5" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="235" y="58" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">油脂</text>
  <text x="235" y="75" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">储能物质</text>
  <rect x="30" y="105" width="70" height="45" rx="5" fill="var(--color-text-secondary)" opacity="0.3" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="65" y="123" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">维生素</text>
  <text x="65" y="140" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">调节代谢</text>
  <rect x="115" y="105" width="70" height="45" rx="5" fill="var(--color-primary)" opacity="0.4" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="150" y="123" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">无机盐</text>
  <text x="150" y="140" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">维持生理功能</text>
  <rect x="200" y="105" width="70" height="45" rx="5" fill="var(--color-text-secondary)" opacity="0.4" stroke="var(--color-text-primary)" stroke-width="2" />
  <text x="235" y="123" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">水</text>
  <text x="235" y="140" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">生命之源</text>
</svg>

### 例题解析

**问题**：请分析以下食品中富含哪些营养素：①米饭 ②牛奶 ③花生油 ④苹果

**解答**：

- ①米饭：主要成分是**淀粉**（属于糖类），是人体主要的供能物质。
- ②牛奶：富含**蛋白质**、**钙**（无机盐）和水，蛋白质是构成细胞的基本物质。
- ③花生油：属于**油脂**，是重要的储能物质。
- ④苹果：富含**维生素C**和水，维生素C能预防坏血病。

### 举一反三

**练习1**：下列说法正确的是（ ）
A. 蛋白质是主要的供能物质
B. 缺乏维生素A会患坏血病
C. 碘是人体必需的微量元素
D. 油脂对人体健康有害

- 答案：C。A糖类是主要供能物质；B缺乏维生素C会患坏血病；D适量油脂对健康有益。

**练习2**：人体缺少铁元素会引起什么疾病？应如何补充？

- 答案：缺铁会引起**贫血**。应多吃富含铁的食物如动物肝脏、瘦肉、菠菜等。

### 拓展知识

- **吸烟有害健康**：香烟烟气中含有CO、尼古丁、焦油等有害物质，会损害呼吸系统和心血管系统。
- **毒品危害**：鸦片、海洛因、冰毒等毒品对人体危害极大，会破坏神经系统和免疫系统。
- **食品安全**：注意食品添加剂的使用，不吃霉变食物，合理饮食。
- **有机食品**：指在生产过程中不使用化学合成的农药、化肥等的食品。`
  },
  {
    id: 'chem_053',
    title: '原子结构与性质',
    stage: 'high',
    chapter: '物质结构与性质',
    tags: ['电子云', '原子轨道', '电离能', '电负性'],
    content: `## 原子结构与性质

### 核心概念

**电子云**：描述电子在原子核外空间出现概率分布的图形，电子云中的小黑点表示电子出现的概率。

**原子轨道**：电子云的形状，常见的有s、p、d、f轨道。s轨道为球形，p轨道为哑铃形（3个相互垂直）。

**能级**：电子在原子核外按能量高低分层排布，同一能层又分为不同能级（s、p、d、f）。

**电离能**：气态原子失去电子所需的能量，电离能越大，原子越难失去电子，金属性越弱。

**电负性**：原子在化合物中吸引电子的能力，电负性越大，非金属性越强。

**电子排布式**：用数字和字母表示电子在各能级的排布，如Na：1s²2s²2p⁶3s¹。

### 化学方程式或公式总结

| 符号 | 意义 | 示例 |
|------|------|------|
| 1s、2s、3s | s能级（球形） | 每个s能级最多容纳2个电子 |
| 2p、3p | p能级（哑铃形） | 每个p能级最多容纳6个电子（3个轨道） |
| 3d | d能级 | 每个d能级最多容纳10个电子（5个轨道） |
| I₁ | 第一电离能 | 气态基态原子失去1个电子所需能量 |
| I₂ | 第二电离能 | 气态离子失去第2个电子所需能量 |
| χ | 电负性 | 原子吸引电子的能力，F最大(4.0) |

**电子排布规律**：
- 能量最低原理：电子优先占据能量最低的轨道
- 泡利不相容原理：每个轨道最多容纳2个电子，自旋方向相反
- 洪特规则：电子在能量相同的轨道上排布时，尽可能分占不同轨道且自旋方向相同

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <text x="150" y="20" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">原子轨道示意图</text>
  <circle cx="60" cy="90" r="30" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-primary)" stroke-width="2" />
  <text x="60" y="95" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">s轨道</text>
  <text x="60" y="115" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">球形</text>
  <ellipse cx="150" cy="90" rx="40" ry="15" fill="none" stroke="var(--color-text-secondary)" stroke-width="2" />
  <ellipse cx="150" cy="90" rx="15" ry="40" fill="none" stroke="var(--color-text-secondary)" stroke-width="2" />
  <text x="150" y="95" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">p轨道</text>
  <text x="150" y="115" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">哑铃形</text>
  <circle cx="240" cy="90" r="8" fill="var(--color-primary)" />
  <text x="240" y="75" font-size="8" fill="var(--color-text-secondary)">d轨道</text>
  <text x="240" y="115" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">花瓣形(5个)</text>
  <text x="150" y="165" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">s(1轨道) p(3轨道) d(5轨道)</text>
</svg>

### 例题解析

**问题**：写出下列元素的电子排布式：(1)Na(原子序数11) (2)Cl(原子序数17) (3)Fe(原子序数26)

**解答**：

(1) Na（11个电子）：1s²2s²2p⁶3s¹

(2) Cl（17个电子）：1s²2s²2p⁶3s²3p⁵

(3) Fe（26个电子）：1s²2s²2p⁶3s²3p⁶3d⁶4s²

注意：3d轨道能量高于4s轨道，电子先排4s再排3d。Fe的3d轨道有6个电子，符合洪特规则（半满或全满稳定）。

### 举一反三

**练习1**：比较Na、Mg、Al的第一电离能大小顺序。

- 答案：Mg > Al > Na。Mg的3s轨道全满（3s²），能量较低，第一电离能最大；Al失去的是3p电子，能量较高；Na失去的是3s电子，但Na的原子半径大，电离能最小。

**练习2**：下列元素中电负性最大的是（ ）
A. O B. F C. N D. Cl

- 答案：B。F的电负性为4.0，是所有元素中最大的。同周期从左到右电负性增大，同主族从上到下电负性减小。

### 拓展知识

- 电子云图中小黑点的疏密表示电子出现概率的大小，并非电子的实际位置。
- 第一电离能的周期性变化：同周期从左到右增大（ⅡA和ⅤA反常），同主族从上到下减小。
- 电负性的周期性变化：同周期从左到右增大，同主族从上到下减小。
- 对角线规则：某些元素性质相似，如Li与Mg、Be与Al、B与Si。
- 原子的电子排布式可以简化表示，如Na：[Ne]3s¹（[Ne]表示氖的电子排布）。`
  },
  {
    id: 'chem_054',
    title: '化学键与分子结构',
    stage: 'high',
    chapter: '物质结构与性质',
    tags: ['共价键类型', '杂化轨道', '分子构型', '氢键'],
    content: `## 化学键与分子结构

### 核心概念

**σ键**：原子轨道沿键轴方向以"头碰头"方式重叠形成的共价键，键能较大，稳定性高。

**π键**：原子轨道以"肩并肩"方式重叠形成的共价键，键能较小，易断裂，活泼性较高。

**杂化轨道**：原子在形成分子时，若干不同类型的原子轨道混合重新组合成能量相同的新轨道。

**sp杂化**：1个s轨道和1个p轨道杂化，形成2个sp杂化轨道，夹角180°，直线形。

**sp²杂化**：1个s轨道和2个p轨道杂化，形成3个sp²杂化轨道，夹角120°，平面三角形。

**sp³杂化**：1个s轨道和3个p轨道杂化，形成4个sp³杂化轨道，夹角109°28'，正四面体形。

**氢键**：特殊的分子间作用力，比范德华力强，比化学键弱，存在于含N-H、O-H、F-H键的分子之间。

### 化学方程式或公式总结

| 杂化类型 | 轨道数 | 空间构型 | 实例 |
|---------|-------|---------|------|
| sp | 2 | 直线形 | BeCl₂、CO₂、C₂H₂ |
| sp² | 3 | 平面三角形 | BF₃、BCl₃、C₂H₄ |
| sp³ | 4 | 四面体形 | CH₄、NH₃、H₂O |
| sp³不等性 | 4 | 三角锥形/角形 | NH₃(三角锥)、H₂O(V形) |

| 分子 | 中心原子杂化 | 分子构型 | 键角 |
|------|------------|---------|------|
| CH₄ | sp³ | 正四面体 | 109°28' |
| NH₃ | sp³不等性 | 三角锥形 | 107° |
| H₂O | sp³不等性 | V形 | 105° |
| CO₂ | sp | 直线形 | 180° |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <text x="150" y="20" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">σ键与π键示意图</text>
  <rect x="20" y="40" width="120" height="110" fill="none" stroke="var(--color-border)" stroke-width="1" />
  <text x="80" y="35" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">σ键(头碰头)</text>
  <circle cx="45" cy="90" r="12" fill="none" stroke="var(--color-primary)" stroke-width="2" />
  <circle cx="115" cy="90" r="12" fill="none" stroke="var(--color-primary)" stroke-width="2" />
  <line x1="57" y1="90" x2="103" y2="90" stroke="var(--color-primary)" stroke-width="2" />
  <circle cx="80" cy="90" r="6" fill="var(--color-primary)" opacity="0.5" />
  <text x="80" y="115" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">重叠程度大</text>
  <text x="80" y="130" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">键能大,稳定</text>
  <rect x="160" y="40" width="120" height="110" fill="none" stroke="var(--color-border)" stroke-width="1" />
  <text x="220" y="35" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">π键(肩并肩)</text>
  <ellipse cx="185" cy="90" rx="8" ry="15" fill="none" stroke="var(--color-text-secondary)" stroke-width="2" />
  <ellipse cx="255" cy="90" rx="8" ry="15" fill="none" stroke="var(--color-text-secondary)" stroke-width="2" />
  <ellipse cx="220" cy="90" rx="12" ry="8" fill="var(--color-text-secondary)" opacity="0.3" />
  <text x="220" y="115" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">重叠程度小</text>
  <text x="220" y="130" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">键能小,活泼</text>
</svg>

### 例题解析

**问题**：分析乙烯(C₂H₄)分子中碳原子的杂化方式和化学键类型。

**解答**：

乙烯分子中每个碳原子形成3个σ键（2个C-H键和1个C-C键），没有孤对电子，所以碳原子采取**sp²杂化**。

杂化过程：2s轨道和2pₓ、2pᵧ轨道杂化形成3个sp²杂化轨道，分别与2个H和另一个C形成σ键。剩余的2pz轨道未参与杂化，两个碳原子的2pz轨道以"肩并肩"方式重叠形成**π键**。

所以C=C双键由1个σ键和1个π键组成。π键易断裂，使乙烯容易发生加成反应。

### 举一反三

**练习1**：分析NH₃和H₂O分子的杂化方式和键角差异。

- 答案：NH₃和H₂O的中心原子都是sp³杂化。NH₃有1对孤对电子，H₂O有2对孤对电子。孤对电子对成键电子对的排斥力大于成键电子对之间的排斥力，所以H₂O的键角(105°)小于NH₃的键角(107°)。

**练习2**：比较HF、HCl、HBr、HI的沸点高低。

- 答案：HF > HI > HBr > HCl。HF因分子间存在氢键，沸点最高；其余按相对分子质量增大，范德华力增大，沸点升高。

### 拓展知识

- σ键可以自由旋转，π键不能自由旋转，导致烯烃存在顺反异构。
- 配位键是一种特殊的共价键，共用电子对由一方提供，如NH₄⁺中N→H配位键。
- 氢键分为分子间氢键和分子内氢键，分子间氢键使物质沸点升高，分子内氢键使物质沸点降低。
- 氢键对物质的溶解度有影响：能与水形成氢键的物质易溶于水（如乙醇、氨气）。
- 价层电子对互斥理论（VSEPR）可预测分子的空间构型，考虑成键电子对和孤对电子对的排斥。`
  },
  {
    id: 'chem_055',
    title: '晶体结构与性质',
    stage: 'high',
    chapter: '物质结构与性质',
    tags: ['晶体类型', '晶胞', '晶体性质'],
    content: `## 晶体结构与性质

### 核心概念

**晶体**：具有规则几何外形的固体，内部粒子（原子、分子、离子）在三维空间呈周期性有序排列。

**晶胞**：晶体结构的基本单元，晶体可看作晶胞在空间重复排列形成。

**离子晶体**：由阴、阳离子通过离子键结合形成的晶体，如NaCl、CaF₂。

**原子晶体**：由原子通过共价键结合形成的晶体，如金刚石、SiO₂。

**分子晶体**：由分子通过分子间作用力结合形成的晶体，如冰、干冰。

**金属晶体**：由金属阳离子和自由电子通过金属键结合形成的晶体，如Fe、Cu。

**晶格能**：气态离子形成1mol离子晶体时释放的能量，晶格能越大，离子晶体越稳定。

### 化学方程式或公式总结

| 晶体类型 | 构成粒子 | 粒子间作用力 | 熔沸点 | 硬度 | 导电性 | 实例 |
|---------|---------|------------|-------|------|--------|------|
| 离子晶体 | 阴、阳离子 | 离子键 | 高 | 硬而脆 | 固态不导电，熔融导电 | NaCl、KOH |
| 原子晶体 | 原子 | 共价键 | 很高 | 很硬 | 一般不导电 | 金刚石、SiO₂ |
| 分子晶体 | 分子 | 分子间作用力 | 低 | 软 | 一般不导电 | H₂O、CO₂ |
| 金属晶体 | 金属阳离子+自由电子 | 金属键 | 差异大 | 差异大 | 良好 | Fe、Cu、Hg |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <text x="150" y="20" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">晶体结构示意图</text>
  <rect x="20" y="40" width="70" height="55" fill="none" stroke="var(--color-border)" stroke-width="1" />
  <text x="55" y="35" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">离子晶体</text>
  <circle cx="35" cy="60" r="6" fill="var(--color-primary)" />
  <circle cx="55" cy="80" r="6" fill="var(--color-text-secondary)" />
  <circle cx="75" cy="60" r="6" fill="var(--color-primary)" />
  <circle cx="55" cy="50" r="6" fill="var(--color-text-secondary)" />
  <text x="55" y="110" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">NaCl</text>
  <rect x="100" y="40" width="70" height="55" fill="none" stroke="var(--color-border)" stroke-width="1" />
  <text x="135" y="35" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">原子晶体</text>
  <circle cx="115" cy="60" r="4" fill="var(--color-text-secondary)" />
  <circle cx="135" cy="80" r="4" fill="var(--color-text-secondary)" />
  <circle cx="155" cy="60" r="4" fill="var(--color-text-secondary)" />
  <line x1="115" y1="60" x2="135" y2="80" stroke="var(--color-text-primary)" stroke-width="1" />
  <line x1="135" y1="80" x2="155" y2="60" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="135" y="110" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">金刚石</text>
  <rect x="180" y="40" width="70" height="55" fill="none" stroke="var(--color-border)" stroke-width="1" />
  <text x="215" y="35" font-size="9" text-anchor="middle" fill="var(--color-text-primary)">分子晶体</text>
  <circle cx="215" cy="70" r="10" fill="none" stroke="var(--color-primary)" stroke-width="2" />
  <circle cx="195" cy="55" r="10" fill="none" stroke="var(--color-primary)" stroke-width="2" />
  <circle cx="235" cy="55" r="10" fill="none" stroke="var(--color-primary)" stroke-width="2" />
  <text x="215" y="110" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">干冰</text>
  <rect x="50" y="120" width="200" height="45" fill="var(--color-bg-secondary)" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="150" y="140" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">晶胞：晶体结构的基本重复单元</text>
  <text x="150" y="158" font-size="9" text-anchor="middle" fill="var(--color-text-secondary)">晶胞通过平移在空间无限延伸形成晶体</text>
</svg>

### 例题解析

**问题**：比较金刚石、氯化钠、干冰三种晶体的熔沸点高低，并说明原因。

**解答**：

熔沸点：**金刚石 > NaCl > 干冰**

- 金刚石是原子晶体，碳原子间通过共价键结合形成空间网状结构，共价键很强，需要很高能量才能破坏，所以熔沸点最高。
- NaCl是离子晶体，Na⁺和Cl⁻通过离子键结合，离子键较强，但弱于共价键，所以熔沸点较高。
- 干冰是分子晶体，CO₂分子间通过范德华力结合，范德华力很弱，容易破坏，所以熔沸点最低。

### 举一反三

**练习1**：下列物质中属于原子晶体的是（ ）
A. CO₂ B. NaCl C. SiO₂ D. Cu

- 答案：C。SiO₂是原子晶体，由Si和O原子通过共价键形成空间网状结构。

**练习2**：金属晶体为什么具有良好的导电性和导热性？

- 答案：金属晶体中存在自由电子，自由电子在外加电场作用下定向移动形成电流，所以导电性好；自由电子还能传递热量，所以导热性好。

### 拓展知识

- 离子晶体的熔点与晶格能有关：离子电荷越高、离子半径越小，晶格能越大，熔点越高。
- 石墨是混合型晶体，层内是共价键，层间是范德华力，所以石墨硬度小、能导电。
- 晶胞中粒子数的计算：顶点粒子贡献1/8，棱上粒子贡献1/4，面上粒子贡献1/2，体内粒子贡献1。
- 晶体的缺陷会影响晶体的性质，如半导体材料中的掺杂。
- 液晶是介于晶体和液体之间的物质状态，具有各向异性。`
  },
  {
    id: 'chem_056',
    title: '有机化学基础拓展',
    stage: 'high',
    chapter: '有机化学基础',
    tags: ['卤代烃', '醇酚', '醛酮', '合成材料'],
    content: `## 有机化学基础拓展

### 核心概念

**卤代烃**：烃分子中的氢原子被卤素原子取代生成的化合物，如CH₃Cl、C₂H₅Br。

**醇**：烃分子中的氢原子被羟基(-OH)取代生成的化合物，如乙醇、丙醇。

**酚**：羟基直接连在苯环上的化合物，如苯酚(C₆H₅OH)。

**醛**：含有醛基(-CHO)的化合物，如甲醛(HCHO)、乙醛(CH₃CHO)。

**酮**：含有羰基(>C=O)的化合物，如丙酮(CH₃COCH₃)。

**合成材料**：人工合成的有机高分子材料，包括塑料、合成纤维、合成橡胶。

**加聚反应**：含有碳碳双键的化合物通过加成聚合生成高分子化合物的反应。

**缩聚反应**：单体间通过缩合反应生成高分子化合物，同时生成小分子（如H₂O）的反应。

### 化学方程式或公式总结

| 反应类型 | 化学方程式 | 备注 |
|---------|-----------|------|
| 卤代烃水解 | $C_2H_5Br + NaOH \\xrightarrow{H_2O} C_2H_5OH + NaBr$ | 取代反应 |
| 卤代烃消去 | $C_2H_5Br + NaOH \\xrightarrow{醇} CH_2=CH_2 + NaBr + H_2O$ | 消去反应 |
| 乙醇与Na | $2C_2H_5OH + 2Na \\to 2C_2H_5ONa + H_2\\uparrow$ | 置换反应 |
| 苯酚与NaOH | $C_6H_5OH + NaOH \\to C_6H_5ONa + H_2O$ | 酸性比乙醇强 |
| 乙醛氧化 | $2CH_3CHO + O_2 \\xrightarrow{催化剂} 2CH_3COOH$ | 催化氧化 |
| 乙醛银镜反应 | $CH_3CHO + 2[Ag(NH_3)_2]OH \\to CH_3COONH_4 + 2Ag\\downarrow + 3NH_3 + H_2O$ | 检验醛基 |
| 乙烯加聚 | $nCH_2=CH_2 \\xrightarrow{催化剂} -[-CH_2-CH_2-]_n-$ | 聚乙烯 |
| 氯乙烯加聚 | $nCH_2=CHCl \\xrightarrow{催化剂} -[-CH_2-CHCl-]_n-$ | 聚氯乙烯(PVC) |

### 实验示意图

<svg width="300" height="180" viewBox="0 0 300 180">
  <text x="150" y="20" font-size="11" text-anchor="middle" fill="var(--color-text-primary)">有机化合物分类与官能团</text>
  <rect x="20" y="40" width="65" height="40" rx="4" fill="var(--color-primary)" opacity="0.2" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="52" y="55" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">卤代烃</text>
  <text x="52" y="70" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">-X(F/Cl/Br/I)</text>
  <rect x="95" y="40" width="65" height="40" rx="4" fill="var(--color-text-secondary)" opacity="0.2" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="127" y="55" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">醇</text>
  <text x="127" y="70" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">-OH(链烃基)</text>
  <rect x="170" y="40" width="65" height="40" rx="4" fill="var(--color-primary)" opacity="0.3" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="202" y="55" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">酚</text>
  <text x="202" y="70" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">-OH(苯环)</text>
  <rect x="45" y="100" width="65" height="40" rx="4" fill="var(--color-text-secondary)" opacity="0.3" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="77" y="115" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">醛</text>
  <text x="77" y="130" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">-CHO</text>
  <rect x="120" y="100" width="65" height="40" rx="4" fill="var(--color-primary)" opacity="0.4" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="152" y="115" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">酮</text>
  <text x="152" y="130" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">>C=O</text>
  <rect x="195" y="100" width="65" height="40" rx="4" fill="var(--color-text-secondary)" opacity="0.4" stroke="var(--color-text-primary)" stroke-width="1" />
  <text x="227" y="115" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">羧酸</text>
  <text x="227" y="130" font-size="8" text-anchor="middle" fill="var(--color-text-secondary)">-COOH</text>
  <text x="150" y="160" font-size="10" text-anchor="middle" fill="var(--color-text-primary)">官能团决定有机物的化学性质</text>
</svg>

### 例题解析

**问题**：设计实验鉴别乙醇、苯酚和乙醛三种物质。

**解答**：

鉴别方案：

1. **第一步：加溴水**
   - 乙醇：无明显现象（混溶）
   - 苯酚：产生**白色沉淀**（三溴苯酚）
   - 乙醛：溴水褪色（乙醛被氧化）

2. **第二步：区分乙醇和乙醛**
   - 加入银氨溶液水浴加热，产生**银镜**的是乙醛，无现象的是乙醇。
   - 或加入新制Cu(OH)₂悬浊液加热，产生**砖红色沉淀**(Cu₂O)的是乙醛。

相关方程式：
- 苯酚与溴水：$C_6H_5OH + 3Br_2 \\to C_6H_2Br_3OH\\downarrow + 3HBr$
- 乙醛银镜反应：$CH_3CHO + 2[Ag(NH_3)_2]OH \\to CH_3COONH_4 + 2Ag\\downarrow + 3NH_3 + H_2O$

### 举一反三

**练习1**：写出由乙烯制取聚乙烯的化学方程式，并说明聚乙烯塑料的性质。

- 答案：$nCH_2=CH_2 \\xrightarrow{催化剂} -[-CH_2-CH_2-]_n-$。聚乙烯是热塑性塑料，无毒，可用于食品包装。

**练习2**：下列物质中，不能发生银镜反应的是（ ）
A. 甲醛 B. 乙醛 C. 丙酮 D. 葡萄糖

- 答案：C。丙酮是酮，不含醛基，不能发生银镜反应。

### 拓展知识

- 卤代烃的水解反应是制备醇的重要方法，消去反应是制备烯烃的方法。
- 苯酚的酸性比乙醇强，但比碳酸弱，所以苯酚能与NaOH反应但不能与NaHCO₃反应。
- 甲醛是重要的化工原料，用于制造酚醛树脂、脲醛树脂等。
- 合成纤维包括涤纶（聚酯纤维）、锦纶（聚酰胺纤维）、腈纶（聚丙烯腈）等。
- 白色污染指废弃塑料造成的环境污染，解决方法包括回收利用、降解塑料等。
- 绿色化学倡导原子经济性，即反应物中的原子尽可能全部转化为产物。`
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
    pointId: 'chem_001',
    question: '下列变化属于化学变化的是？',
    options: ['冰融化成水', '蜡烛燃烧', '木材锯成木条', '汽油挥发'],
    answer: 1,
    explanation: '蜡烛燃烧生成了新的物质（二氧化碳和水），属于化学变化'
  },
  {
    id: 'q002',
    pointId: 'chem_003',
    question: '空气中含量最多的气体是？',
    options: ['氧气', '氮气', '二氧化碳', '稀有气体'],
    answer: 1,
    explanation: '空气中氮气约占78%，是含量最多的气体'
  },
  {
    id: 'q003',
    pointId: 'chem_004',
    question: '下列不属于氧气用途的是？',
    options: ['医疗急救', '潜水供氧', '食品包装防腐', '炼钢'],
    answer: 2,
    explanation: '食品包装防腐通常使用氮气而非氧气，氧气会加速食品氧化'
  },
  {
    id: 'q004',
    pointId: 'chem_005',
    question: '实验室用高锰酸钾制取氧气时，需要在试管口放一团棉花，目的是？',
    options: ['防止漏气', '防止高锰酸钾粉末进入导管', '过滤氧气', '吸收水蒸气'],
    answer: 1,
    explanation: '棉花防止高锰酸钾粉末堵塞导管'
  },
  {
    id: 'q005',
    pointId: 'chem_007',
    question: '原子中，决定元素种类的是？',
    options: ['质子数', '中子数', '电子数', '相对原子质量'],
    answer: 0,
    explanation: '质子数（核电荷数）决定元素的种类'
  },
  {
    id: 'q006',
    pointId: 'chem_011',
    question: '电解水实验中，正极和负极产生的气体体积比约为？',
    options: ['1:1', '1:2', '2:1', '1:8'],
    answer: 1,
    explanation: '正极产生氧气，负极产生氢气，体积比约为1:2'
  },
  {
    id: 'q007',
    pointId: 'chem_013',
    question: '化学反应前后，下列各项一定不发生变化的是？',
    options: ['分子的种类', '物质的种类', '原子的种类和数目', '分子的数目'],
    answer: 2,
    explanation: '质量守恒定律：化学反应前后原子的种类和数目不变'
  },
  {
    id: 'q008',
    pointId: 'chem_014',
    question: '配平化学方程式 $Fe_3O_4 + H_2 \\rightarrow Fe + H_2O$ 后，$H_2$ 前面的系数是？',
    options: ['2', '3', '4', '5'],
    answer: 2,
    explanation: '配平后为 $Fe_3O_4 + 4H_2 = 3Fe + 4H_2O$，H2系数为4'
  },
  {
    id: 'q009',
    pointId: 'chem_016',
    question: '鉴别二氧化碳常用的方法是？',
    options: ['观察颜色', '闻气味', '通入澄清石灰水', '点燃'],
    answer: 2,
    explanation: '二氧化碳能使澄清石灰水变浑浊'
  },
  {
    id: 'q010',
    pointId: 'chem_018',
    question: '燃烧需要同时满足的三个条件是？',
    options: [
      '可燃物、氧气、温度达到着火点',
      '可燃物、光照、压力',
      '可燃物、水、温度',
      '氧气、光照、压力'
    ],
    answer: 0,
    explanation: '燃烧三要素：可燃物、与氧气接触、温度达到着火点'
  },
  {
    id: 'q011',
    pointId: 'chem_021',
    question: '下列金属中，活动性最强的是？',
    options: ['铁', '铜', '锌', '银'],
    answer: 2,
    explanation: '金属活动性顺序：Zn > Fe > Cu > Ag'
  },
  {
    id: 'q012',
    pointId: 'chem_024',
    question: '在一定温度下，某固体物质的溶解度是指？',
    options: [
      '100g溶剂中溶解的溶质质量',
      '100g溶液中溶解的溶质质量',
      '饱和溶液中溶质的质量分数',
      '任意量溶剂中溶解的溶质质量'
    ],
    answer: 0,
    explanation: '溶解度：一定温度下100g溶剂（水）中达到饱和时溶解的溶质质量'
  },
  {
    id: 'q013',
    pointId: 'chem_026',
    question: '稀盐酸与下列哪种物质反应不会生成气体？',
    options: ['锌粒', '碳酸钙', '氢氧化钠', '铁片'],
    answer: 2,
    explanation: '盐酸与氢氧化钠发生中和反应生成氯化钠和水，无气体产生'
  },
  {
    id: 'q014',
    pointId: 'chem_027',
    question: '酸碱中和反应的实质是？',
    options: [
      '酸和碱混合',
      'H+ 和 OH- 结合生成水',
      '生成盐和水',
      '放出热量'
    ],
    answer: 1,
    explanation: '中和反应实质：H+ + OH- = H2O'
  },
  {
    id: 'q015',
    pointId: 'chem_028',
    question: '下列盐中，不溶于水的是？',
    options: ['NaCl', 'Na2CO3', 'BaSO4', 'KNO3'],
    answer: 2,
    explanation: 'BaSO4（硫酸钡）不溶于水，也不溶于酸'
  },
  {
    id: 'q016',
    pointId: 'chem_029',
    question: '下列肥料属于复合肥料的是？',
    options: ['NH4NO3', 'Ca(H2PO4)2', 'KCl', 'KNO3'],
    answer: 3,
    explanation: 'KNO3含有K和N两种营养元素，属于复合肥'
  },
  {
    id: 'q017',
    pointId: 'chem_031',
    question: '下列物质属于强电解质的是？',
    options: ['蔗糖', '醋酸', '氯化钠', '酒精'],
    answer: 2,
    explanation: 'NaCl在水溶液中完全电离，是强电解质'
  },
  {
    id: 'q018',
    pointId: 'chem_032',
    question: '在氧化还原反应中，失去电子的物质发生？',
    options: ['还原反应', '氧化反应', '分解反应', '化合反应'],
    answer: 1,
    explanation: '失去电子→化合价升高→被氧化→发生氧化反应'
  },
  {
    id: 'q019',
    pointId: 'chem_033',
    question: '钠在空气中燃烧的产物是？',
    options: ['Na2O', 'Na2O2', 'Na2CO3', 'NaOH'],
    answer: 1,
    explanation: '钠在空气中燃烧生成淡黄色的过氧化钠(Na2O2)'
  },
  {
    id: 'q020',
    pointId: 'chem_034',
    question: '下列关于氢氧化铝的性质，正确的是？',
    options: [
      '只与酸反应',
      '只与碱反应',
      '既能与酸反应又能与碱反应（两性）',
      '既不与酸也不与碱反应'
    ],
    answer: 2,
    explanation: 'Al(OH)3是两性氢氧化物，既能与酸反应也能与碱反应'
  },
  {
    id: 'q021',
    pointId: 'chem_036',
    question: '氯气溶于水后，生成的具有漂白性的物质是？',
    options: ['HCl', 'HClO', 'Cl2', 'NaCl'],
    answer: 1,
    explanation: 'Cl2 + H2O = HCl + HClO，HClO（次氯酸）具有漂白性'
  },
  {
    id: 'q022',
    pointId: 'chem_039',
    question: '元素周期表中有多少个周期？',
    options: ['5个', '6个', '7个', '8个'],
    answer: 2,
    explanation: '元素周期表共有7个周期（3短4长）'
  },
  {
    id: 'q023',
    pointId: 'chem_041',
    question: 'NaCl中Na与Cl之间的化学键类型是？',
    options: ['离子键', '共价键', '金属键', '氢键'],
    answer: 0,
    explanation: 'NaCl是活泼金属与活泼非金属形成的化合物，含离子键'
  },
  {
    id: 'q024',
    pointId: 'chem_044',
    question: '下列属于弱电解质的是？',
    options: ['NaCl', 'HCl', 'CH3COOH', 'NaOH'],
    answer: 2,
    explanation: '醋酸(CH3COOH)在水溶液中部分电离，是弱电解质'
  },
  {
    id: 'q025',
    pointId: 'chem_047',
    question: '原电池工作时，电子流出的一极是？',
    options: ['正极', '负极', '阳极', '阴极'],
    answer: 1,
    explanation: '原电池中负极失去电子，电子从负极流出经外电路到正极'
  },
  {
    id: 'q026',
    pointId: 'chem_048',
    question: '电解池中，阳极上发生的反应是？',
    options: ['还原反应', '氧化反应', '中和反应', '分解反应'],
    answer: 1,
    explanation: '电解池阳极连电源正极，发生氧化反应（失去电子）'
  },
  {
    id: 'q027',
    pointId: 'chem_049',
    question: '甲烷分子的空间构型是？',
    options: ['平面三角形', '正四面体', '直线型', '三角锥形'],
    answer: 1,
    explanation: '甲烷(CH4)是正四面体结构，C位于中心，4个H在顶点'
  },
  {
    id: 'q028',
    pointId: 'chem_050',
    question: '乙醇与乙酸在浓硫酸催化下加热生成的产物是？',
    options: ['乙醚', '乙酸乙酯', '乙醛', '乙烯'],
    answer: 1,
    explanation: '酯化反应：CH3COOH + C2H5OH ⇌ CH3COOC2H5 + H2O'
  },
  {
    id: 'q029',
    pointId: 'chem_052',
    question: '人体必需的六大营养素不包括？',
    options: ['蛋白质', '糖类', '油脂', '氧气'],
    answer: 3,
    explanation: '六大营养素：蛋白质、糖类、油脂、维生素、无机盐、水'
  },
  {
    id: 'q030',
    pointId: 'chem_052',
    question: '下列食物中富含蛋白质的是？',
    options: ['米饭', '牛奶', '花生油', '苹果'],
    answer: 1,
    explanation: '牛奶富含蛋白质，米饭含糖类，花生油含油脂，苹果含维生素'
  },
  {
    id: 'q031',
    pointId: 'chem_053',
    question: '钠原子的电子排布式是？',
    options: ['1s²2s²2p⁶', '1s²2s²2p⁶3s¹', '1s²2s²2p⁵', '1s²2s¹'],
    answer: 1,
    explanation: '钠原子序数11，电子排布：1s²2s²2p⁶3s¹'
  },
  {
    id: 'q032',
    pointId: 'chem_053',
    question: '下列元素中电负性最大的是？',
    options: ['O', 'F', 'N', 'Cl'],
    answer: 1,
    explanation: 'F的电负性为4.0，是所有元素中最大的'
  },
  {
    id: 'q033',
    pointId: 'chem_054',
    question: '甲烷分子中碳原子的杂化方式是？',
    options: ['sp', 'sp²', 'sp³', 'sp³d'],
    answer: 2,
    explanation: 'CH4中C形成4个σ键，无孤对电子，sp³杂化'
  },
  {
    id: 'q034',
    pointId: 'chem_054',
    question: '下列分子中属于直线形的是？',
    options: ['H2O', 'NH3', 'CO2', 'CH4'],
    answer: 2,
    explanation: 'CO2中C采取sp杂化，分子为直线形'
  },
  {
    id: 'q035',
    pointId: 'chem_055',
    question: '下列物质属于原子晶体的是？',
    options: ['CO2', 'NaCl', 'SiO2', 'Cu'],
    answer: 2,
    explanation: 'SiO2是原子晶体，由Si和O通过共价键形成空间网状结构'
  },
  {
    id: 'q036',
    pointId: 'chem_055',
    question: '离子晶体的特点是？',
    options: ['熔沸点低', '硬度小', '固态不导电、熔融导电', '易溶于有机溶剂'],
    answer: 2,
    explanation: '离子晶体固态时离子不能自由移动，不导电；熔融时离子可移动，导电'
  },
  {
    id: 'q037',
    pointId: 'chem_056',
    question: '下列物质中含有醛基的是？',
    options: ['乙醇', '乙醛', '乙酸', '丙酮'],
    answer: 1,
    explanation: '乙醛(CH3CHO)含有醛基(-CHO)'
  },
  {
    id: 'q038',
    pointId: 'chem_056',
    question: '聚乙烯的合成反应类型是？',
    options: ['加成反应', '加聚反应', '缩聚反应', '取代反应'],
    answer: 1,
    explanation: '乙烯通过加聚反应生成聚乙烯：nCH2=CH2 → [-CH2-CH2-]n'
  },
  {
    id: 'q039',
    pointId: 'chem_035',
    question: '下列离子中，检验时使用KSCN溶液的是？',
    options: ['Fe²+', 'Fe³+', 'Cu²+', 'Al³+'],
    answer: 1,
    explanation: 'Fe³+与SCN-反应生成血红色的Fe(SCN)3'
  },
  {
    id: 'q040',
    pointId: 'chem_038',
    question: '下列关于氨气的性质，错误的是？',
    options: ['极易溶于水', '水溶液呈碱性', '比空气轻', '不能与酸反应'],
    answer: 3,
    explanation: '氨气能与酸反应生成铵盐，如NH3 + HCl = NH4Cl'
  },
  {
    id: 'q041',
    pointId: 'chem_043',
    question: '化学平衡状态的特征是？',
    options: ['反应停止', '正反应速率等于逆反应速率', '反应物浓度为零', '温度升高'],
    answer: 1,
    explanation: '化学平衡是动态平衡，v正 = v逆 ≠ 0'
  },
  {
    id: 'q042',
    pointId: 'chem_045',
    question: '25°C时，pH=12的溶液中c(OH-)是？',
    options: ['1×10⁻¹²mol/L', '1×10⁻²mol/L', '1×10⁻⁷mol/L', '1×10⁻¹⁴mol/L'],
    answer: 1,
    explanation: 'pH=12，c(H+)=10⁻¹²，c(OH-)=Kw/c(H+)=10⁻¹⁴/10⁻¹²=10⁻²mol/L'
  },
  {
    id: 'q043',
    pointId: 'chem_046',
    question: 'Na2CO3溶液呈碱性的原因是？',
    options: ['Na+水解', 'CO3²-水解', 'NaOH电离', 'Na2CO3本身呈碱性'],
    answer: 1,
    explanation: 'CO3²- + H2O ⇌ HCO3- + OH-，水解使溶液呈碱性'
  },
  {
    id: 'q044',
    pointId: 'chem_049',
    question: '能使溴水褪色的是？',
    options: ['甲烷', '乙烯', '苯', '乙烷'],
    answer: 1,
    explanation: '乙烯含碳碳双键，能与溴水发生加成反应使其褪色'
  },
  {
    id: 'q045',
    pointId: 'chem_051',
    question: '淀粉遇碘会呈现什么颜色？',
    options: ['红色', '蓝色', '紫色', '黄色'],
    answer: 1,
    explanation: '淀粉遇碘变蓝色，是淀粉的特征反应'
  },
  {
    id: 'q046',
    pointId: 'chem_030',
    question: '检验Cl-常用的试剂是？',
    options: ['AgNO3溶液', 'BaCl2溶液', '稀盐酸', '石蕊试液'],
    answer: 0,
    explanation: 'Cl-与Ag+反应生成白色AgCl沉淀，加稀硝酸不溶解'
  },
  {
    id: 'q047',
    pointId: 'chem_037',
    question: '浓硫酸不能干燥的气体是？',
    options: ['H2', 'CO2', 'NH3', 'SO2'],
    answer: 2,
    explanation: 'NH3是碱性气体，会与浓硫酸反应，不能用浓硫酸干燥'
  },
  {
    id: 'q048',
    pointId: 'chem_040',
    question: '同周期元素从左到右，原子半径变化规律是？',
    options: ['逐渐增大', '逐渐减小', '先增大后减小', '不变'],
    answer: 1,
    explanation: '同周期电子层数相同，核电荷数增大，原子半径减小'
  },
  {
    id: 'q049',
    pointId: 'chem_053',
    question: '第一电离能最大的元素是？',
    options: ['Na', 'Mg', 'Al', 'Si'],
    answer: 1,
    explanation: 'Mg的3s轨道全满(3s²)，能量较低，第一电离能最大'
  },
  {
    id: 'q050',
    pointId: 'chem_055',
    question: '金属晶体具有良好导电性的原因是？',
    options: ['离子自由移动', '自由电子存在', '分子间作用力', '共价键'],
    answer: 1,
    explanation: '金属晶体中存在自由电子，在外加电场作用下定向移动形成电流'
  }
];
