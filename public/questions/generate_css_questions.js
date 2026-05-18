// 生成CSS 1000条题目的脚本
import fs from 'fs';
import path from 'path';

// 题目模板生成函数
function generateQuestions() {
  const questions = [];

  // ==================== 第一部分：CSS 基础与选择器 (1-100) ====================
  for (let i = 1; i <= 100; i++) {
    const q = { id: `css-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'CSS的全称是什么？',
        [
          'Cascading Style Sheets',
          'Creative Style Sheets',
          'Computer Style Sheets',
          'Colorful Style Sheets',
        ],
        0,
      ],
      [
        '以下哪个是正确的CSS语法？',
        [
          'selector {property: value;}',
          '{property: value;}(selector)',
          'selector(property=value)',
          'selector:property=value',
        ],
        0,
      ],
      [
        '如何在外部引入CSS？',
        [
          '<link rel="stylesheet" href="style.css">',
          '<style src="style.css">',
          '<css>style.css</css>',
          '<stylesheet>style.css</stylesheet>',
        ],
        0,
      ],
      ['CSS中ID选择器使用哪个符号？', ['#', '.', '*', '&'], 0],
      ['CSS中类选择器使用哪个符号？', ['.', '#', ':', '~'], 0],
      ['如何选择所有<p>元素内部的<span>元素？', ['p span', 'p > span', 'p + span', 'p ~ span'], 0],
      ['子选择器使用哪个符号？', ['>', ' ', '+', '~'], 0],
      ['相邻兄弟选择器使用哪个符号？', ['+', '~', '>', ' '], 0],
      ['通用兄弟选择器使用哪个符号？', ['~', '+', '>', ' '], 0],
      ['属性选择器的语法是？', ['[attribute]', '.attribute', '#attribute', '*attribute'], 0],
      ['如何选择具有title属性的元素？', ['[title]', '.title', '#title', 'title'], 0],
      [
        '如何选择title属性等于"hello"的元素？',
        ['[title="hello"]', '[title~="hello"]', '[title*="hello"]', '[title^="hello"]'],
        0,
      ],
      [
        '[title~="hello"]选择器的作用是？',
        [
          '选择title属性包含hello这个词的元素',
          '选择title属性以hello开头的元素',
          '选择title属性包含hello字符串的元素',
          '选择title属性以hello结尾的元素',
        ],
        0,
      ],
      [
        '[title^="hello"]选择器的作用是？',
        [
          '选择title属性以hello开头的元素',
          '选择title属性以hello结尾的元素',
          '选择title属性包含hello的元素',
          '选择title属性等于hello的元素',
        ],
        0,
      ],
      [
        '[title$="hello"]选择器的作用是？',
        [
          '选择title属性以hello结尾的元素',
          '选择title属性以hello开头的元素',
          '选择title属性包含hello的元素',
          '选择title属性等于hello的元素',
        ],
        0,
      ],
      [
        '[title*="hello"]选择器的作用是？',
        [
          '选择title属性包含hello子串的元素',
          '选择title属性包含hello单词的元素',
          '选择title属性以hello开头的元素',
          '选择title属性以hello结尾的元素',
        ],
        0,
      ],
      [
        ':hover伪类的作用是？',
        [
          '鼠标悬停时应用样式',
          '鼠标点击时应用样式',
          '元素获得焦点时应用样式',
          '元素被禁用时应用样式',
        ],
        0,
      ],
      [
        ':focus伪类的作用是？',
        [
          '元素获得焦点时应用样式',
          '鼠标悬停时应用样式',
          '元素被激活时应用样式',
          '元素被选中时应用样式',
        ],
        0,
      ],
      [
        ':active伪类的作用是？',
        [
          '元素被激活（点击）时应用样式',
          '鼠标悬停时应用样式',
          '元素获得焦点时应用样式',
          '元素被选中时应用样式',
        ],
        0,
      ],
      [
        ':visited伪类的作用是？',
        ['选择已访问的链接', '选择未访问的链接', '选择悬停的链接', '选择活动的链接'],
        0,
      ],
      [
        ':first-child伪类的作用是？',
        [
          '选择父元素的第一个子元素',
          '选择父元素的第一个该类型子元素',
          '选择元素的第一个子节点',
          '选择元素的第一个文本节点',
        ],
        0,
      ],
      [
        ':first-of-type伪类的作用是？',
        [
          '选择父元素的第一个该类型子元素',
          '选择父元素的第一个子元素',
          '选择元素的第一个子节点',
          '选择同类型中的第一个元素',
        ],
        0,
      ],
      [
        ':last-child伪类的作用是？',
        [
          '选择父元素的最后一个子元素',
          '选择父元素的最后一个该类型子元素',
          '选择元素的最后一个子节点',
          '选择同类型中的最后一个元素',
        ],
        0,
      ],
      [
        ':nth-child(n)伪类的作用是？',
        [
          '选择父元素的第n个子元素',
          '选择同类型中的第n个元素',
          '选择元素的第n个子节点',
          '选择倒数第n个子元素',
        ],
        0,
      ],
      [
        ':nth-of-type(n)伪类的作用是？',
        [
          '选择同类型中的第n个元素',
          '选择父元素的第n个子元素',
          '选择元素的第n个子节点',
          '选择倒数第n个同类型元素',
        ],
        0,
      ],
      [
        ':not(selector)伪类的作用是？',
        ['选择不匹配指定选择器的元素', '选择匹配指定选择器的元素', '排除所有元素', '选择伪类元素'],
        0,
      ],
      [
        '::before伪元素的作用是？',
        [
          '在元素内容前插入生成内容',
          '在元素后插入生成内容',
          '选择元素的第一行',
          '选择元素的首字母',
        ],
        0,
      ],
      [
        '::after伪元素的作用是？',
        [
          '在元素内容后插入生成内容',
          '在元素前插入生成内容',
          '选择元素的最后一行',
          '选择元素的最后一个字母',
        ],
        0,
      ],
      [
        '::first-line伪元素的作用是？',
        ['选择块级元素的第一行', '选择元素的首字母', '在元素前插入内容', '选择元素的第一行内容'],
        0,
      ],
      [
        '::first-letter伪元素的作用是？',
        ['选择块级元素的首字母', '选择元素的第一行', '在元素前插入内容', '选择元素的第一个单词'],
        0,
      ],
      [
        '::selection伪元素的作用是？',
        ['选择用户选中的部分', '选择元素的首字母', '选择元素的第一行', '选择元素的焦点部分'],
        0,
      ],
      ['CSS优先级规则中，内联样式的权重是？', ['1000', '100', '10', '1'], 0],
      ['CSS优先级规则中，ID选择器的权重是？', ['100', '1000', '10', '1'], 0],
      ['CSS优先级规则中，类选择器的权重是？', ['10', '100', '1000', '1'], 0],
      ['CSS优先级规则中，标签选择器的权重是？', ['1', '10', '100', '0'], 0],
      ['CSS优先级规则中，通配符选择器的权重是？', ['0', '1', '10', '100'], 0],
      [
        '如何覆盖高优先级的样式？',
        ['使用!important', '增加选择器层级', '使用内联样式', '以上都可以'],
        0,
      ],
      [
        'CSS继承的特性是指？',
        [
          '子元素自动获得父元素的某些样式',
          '父元素获得子元素的样式',
          '兄弟元素互相获取样式',
          '所有样式都会继承',
        ],
        0,
      ],
      ['以下哪个属性是不可继承的？', ['margin', 'color', 'font-size', 'visibility'], 0],
      ['以下哪个属性是可继承的？', ['color', 'border', 'padding', 'background'], 0],
      [
        'inherit关键字的作用是？',
        ['强制继承父元素的属性值', '重置为初始值', '取消当前样式', '应用浏览器默认样式'],
        0,
      ],
      [
        'initial关键字的作用是？',
        ['将属性重置为CSS规范定义的初始值', '继承父元素值', '应用浏览器默认样式', '取消样式'],
        0,
      ],
      [
        'unset关键字的作用是？',
        [
          '如果属性可继承则继承，否则重置为初始值',
          '直接重置为初始值',
          '直接继承父元素值',
          '删除属性',
        ],
        0,
      ],
      [
        'revert关键字的作用是？',
        ['将样式回退到浏览器默认样式', '重置为CSS初始值', '继承父元素值', '取消样式'],
        0,
      ],
      ['CSS中的注释语法是？', ['/* 注释 */', '// 注释', '<!-- 注释 -->', '# 注释'], 0],
      [
        'currentColor关键字的作用是？',
        ['继承当前的color属性值', '设置为黑色', '设置为透明', '设置为红色'],
        0,
      ],
      ['CSS变量（自定义属性）的前缀是？', ['--', '$', '@', '!'], 0],
      ['var()函数的作用是？', ['插入自定义属性的值', '定义变量', '计算值', '调用函数'], 0],
      [
        '如何定义一个名为main-color的CSS变量？',
        ['--main-color: red;', '$main-color: red;', '@main-color: red;', 'var-main-color: red;'],
        0,
      ],
      ['calc()函数的作用是？', ['进行数学计算', '调用函数', '定义变量', '计算选择器'], 0],
      [
        'calc()中可以混合使用不同单位吗？',
        ['可以', '不可以', '只能使用相同单位', '只能使用百分比'],
        0,
      ],
      [
        'CSS选择器性能优化建议是？',
        ['避免使用通配符和过深嵌套', '尽量使用通配符', '尽量嵌套深层选择器', '使用复杂选择器'],
        0,
      ],
      [
        ':is()伪类的作用是？',
        ['简化复杂选择器并取匹配的任意一个', '排除选择器', '选择子元素', '选择兄弟元素'],
        0,
      ],
      [
        ':where()伪类与:is()的区别是？',
        [':where()的优先级始终为0', '没有区别', ':where()优先级更高', ':is()优先级为0'],
        0,
      ],
      [
        ':has()伪类的作用是？',
        ['选择包含指定子元素的父元素', '选择子元素', '选择兄弟元素', '选择后代元素'],
        0,
      ],
      ['all属性的作用是？', ['重置所有CSS属性', '应用所有样式', '继承所有属性', '删除所有属性'], 0],
      ['CSS值类型<length>表示？', ['长度值', '角度值', '时间值', '频率值'], 0],
      ['CSS值类型<angle>表示？', ['角度值', '长度值', '时间值', '分辨率'], 0],
      ['CSS值类型<time>表示？', ['时间值', '角度值', '长度值', '频率值'], 0],
      ['CSS值类型<url>表示？', ['URL地址', '字符串', '数字', '颜色'], 0],
      ['CSS值类型<color>表示？', ['颜色值', '长度值', '角度值', '字符串'], 0],
      ['CSS值类型<image>表示？', ['图像值', 'URL值', '颜色值', '字符串'], 0],
      ['CSS值类型<percentage>表示？', ['百分比值', '长度值', '数字值', '比例值'], 0],
      ['CSS值类型<number>表示？', ['数字值', '百分比值', '长度值', '整数'], 0],
      ['CSS值类型<integer>表示？', ['整数值', '数字值', '百分比值', '长度值'], 0],
      ['CSS中的全局关键字不包括？', ['default', 'inherit', 'initial', 'unset'], 0],
      [
        'CSS中的长度单位em是相对于？',
        ['当前元素的字体大小', '视口宽度', '根元素字体大小', '像素'],
        0,
      ],
      [
        'CSS中的长度单位rem是相对于？',
        ['根元素(html)的字体大小', '当前元素的字体大小', '父元素的字体大小', '视口宽度'],
        0,
      ],
      [
        'CSS中的长度单位vh是相对于？',
        ['视口高度的1%', '视口宽度的1%', '根元素字体大小', '像素'],
        0,
      ],
      ['CSS中的长度单位vw是相对于？', ['视口宽度的1%', '视口高度的1%', '当前元素宽度', '像素'], 0],
      [
        'CSS中的长度单位vmin是相对于？',
        ['视口较小尺寸的1%', '视口较大尺寸的1%', '视口宽度', '视口高度'],
        0,
      ],
      [
        'CSS中的长度单位vmax是相对于？',
        ['视口较大尺寸的1%', '视口较小尺寸的1%', '视口宽度', '视口高度'],
        0,
      ],
      [
        'CSS中的长度单位ch是相对于？',
        ['当前字体中"0"字符的宽度', '当前字体的高度', '根元素字体大小', '视口宽度'],
        0,
      ],
      [
        'CSS中的长度单位ex是相对于？',
        ['当前字体中"x"字符的高度', '当前字体的宽度', '根元素字体大小', '视口高度'],
        0,
      ],
      ['CSS中的长度单位cm是？', ['厘米', '毫米', '英寸', '点'], 0],
      ['CSS中的长度单位mm是？', ['毫米', '厘米', '英寸', '派卡'], 0],
      ['CSS中的长度单位in是？', ['英寸', '厘米', '毫米', '点'], 0],
      ['CSS中的长度单位pt是？', ['点(1/72英寸)', '派卡(12点)', '像素', '毫米'], 0],
      ['CSS中的长度单位pc是？', ['派卡(12点)', '点(1/72英寸)', '像素', '厘米'], 0],
      ['0长度需要单位吗？', ['不需要', '必须带单位', '只能用px', '只能用em'], 0],
      [
        'CSS中的分辨率单位dpi表示？',
        ['每英寸点数', '每厘米点数', '每英寸像素数', '每厘米像素数'],
        0,
      ],
      [
        'CSS中的分辨率单位dpcm表示？',
        ['每厘米点数', '每英寸点数', '每英寸像素数', '每厘米像素数'],
        0,
      ],
      [
        'CSS中的分辨率单位dppx表示？',
        ['每像素单位的点数', '每英寸点数', '每厘米点数', '每英寸像素数'],
        0,
      ],
      [
        'CSS中如何表示绝对颜色？',
        ['使用rgb()或十六进制', '使用currentcolor', '使用inherit', '使用transparent'],
        0,
      ],
      [
        'CSS中如何表示半透明颜色？',
        ['使用rgba()或hsla()', '使用rgb()', '使用十六进制', '使用颜色名称'],
        0,
      ],
      ['CSS中transparent关键字的含义是？', ['完全透明', '半透明', '不透明', '白色'], 0],
      [
        'CSS中如何计算选择器优先级？',
        ['统计ID、类、标签的数量并加权', '根据选择器长度', '根据字母顺序', '根据出现顺序'],
        0,
      ],
      [
        'CSS层叠的规则是？',
        [
          '重要性 > 优先级 > 来源 > 顺序',
          '来源 > 优先级 > 重要性',
          '顺序 > 优先级 > 重要性',
          '优先级 > 重要性 > 来源',
        ],
        0,
      ],
      [
        'CSS来源的优先级从高到低是？',
        [
          '用户!important > 作者!important > 作者 > 用户 > 代理',
          '作者 > 用户 > 代理',
          '代理 > 用户 > 作者',
          '用户 > 作者 > 代理',
        ],
        0,
      ],
      [
        'CSS中如何引入打印样式表？',
        [
          '<link media="print">',
          '<link media="screen">',
          '<link media="all">',
          '<style media="print">',
        ],
        0,
      ],
      [
        'CSS中@charset规则的作用是？',
        ['指定样式表的字符编码', '引入外部样式', '定义媒体查询', '定义字体'],
        0,
      ],
      ['CSS中@import规则的作用是？', ['导入其他样式表', '导入字体', '导入图片', '导入脚本'], 0],
      ['@import应该放在样式表的什么位置？', ['最前面', '最后面', '任意位置', '注释中'], 0],
      [
        'CSS中!important声明的作用是？',
        ['提高样式优先级到最高', '注释样式', '删除样式', '延迟应用样式'],
        0,
      ],
      [
        '过度使用!important会导致什么问题？',
        ['样式难以覆盖和维护', '提高性能', '减少代码量', '增强可读性'],
        0,
      ],
      [
        'CSS中如何为特定语言设置样式？',
        [':lang()伪类', '[lang]属性选择器', '::lang伪元素', '$lang选择器'],
        0,
      ],
      [
        'CSS中:root伪类的作用是？',
        ['选择文档的根元素', '选择根目录', '选择第一个元素', '选择html元素'],
        0,
      ],
      [
        ':empty伪类的作用是？',
        ['选择没有子元素的元素', '选择空文本', '选择隐藏元素', '选择透明元素'],
        0,
      ],
      [
        ':target伪类的作用是？',
        ['选择URL锚点指向的元素', '选择目标容器', '选择链接元素', '选择焦点元素'],
        0,
      ],
      [
        ':checked伪类的作用是？',
        ['选择被选中的radio或checkbox', '选择选中状态的文本', '选择激活元素', '选择焦点元素'],
        0,
      ],
      [
        ':disabled伪类的作用是？',
        ['选择被禁用的表单元素', '选择可用元素', '选择只读元素', '选择必填元素'],
        0,
      ],
      [
        ':enabled伪类的作用是？',
        ['选择可用的表单元素', '选择禁用元素', '选择只读元素', '选择必填元素'],
        0,
      ],
      [
        ':required伪类的作用是？',
        ['选择必填的表单元素', '选择选填元素', '选择禁用元素', '选择可用元素'],
        0,
      ],
      [
        ':optional伪类的作用是？',
        ['选择非必填的表单元素', '选择必填元素', '选择禁用元素', '选择只读元素'],
        0,
      ],
      [
        ':read-only伪类的作用是？',
        ['选择只读元素', '选择可编辑元素', '选择禁用元素', '选择必填元素'],
        0,
      ],
      [
        ':read-write伪类的作用是？',
        ['选择可编辑元素', '选择只读元素', '选择禁用元素', '选择必填元素'],
        0,
      ],
      [
        ':valid伪类的作用是？',
        ['选择验证通过的表单元素', '选择验证失败的元素', '选择必填元素', '选择禁用元素'],
        0,
      ],
      [
        ':invalid伪类的作用是？',
        ['选择验证失败的表单元素', '选择验证通过的元素', '选择必填元素', '选择禁用元素'],
        0,
      ],
      [
        ':in-range伪类的作用是？',
        ['选择值在范围内的元素', '选择值超出范围的元素', '选择必填元素', '选择禁用元素'],
        0,
      ],
      [
        ':out-of-range伪类的作用是？',
        ['选择值超出范围的元素', '选择值在范围内的元素', '选择必填元素', '选择禁用元素'],
        0,
      ],
    ];
    const item = items[(i - 1) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第二部分：CSS 盒模型与文档流 (101-200) ====================
  for (let i = 101; i <= 200; i++) {
    const q = { id: `css-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'CSS盒模型由哪几部分组成？',
        [
          '内容、内边距、边框、外边距',
          '内容、边框、外边距',
          '内容、内边距、外边距',
          '内容、边框、背景',
        ],
        0,
      ],
      [
        'box-sizing: content-box的特点是？',
        [
          'width只包含内容区域',
          'width包含内容和内边距',
          'width包含内容、内边距和边框',
          'width包含所有',
        ],
        0,
      ],
      [
        'box-sizing: border-box的特点是？',
        [
          'width包含内容、内边距和边框',
          'width只包含内容',
          'width包含内容和内边距',
          'width包含所有',
        ],
        0,
      ],
      [
        '如何全局设置border-box？',
        [
          '*, *::before, *::after { box-sizing: border-box; }',
          'body { box-sizing: border-box; }',
          'html { box-sizing: border-box; }',
          'div { box-sizing: border-box; }',
        ],
        0,
      ],
      [
        'margin的合并（折叠）发生在什么情况？',
        ['相邻块级元素的垂直margin', '水平margin', '内联元素margin', 'padding之间'],
        0,
      ],
      [
        '如何避免margin合并？',
        ['使用padding代替、创建BFC、使用浮动', '增加margin值', '使用border-box', '设置width'],
        0,
      ],
      ['margin: 0 auto的作用是？', ['块级元素水平居中', '垂直居中', '水平垂直居中', '清除浮动'], 0],
      [
        'margin: 0 auto生效的条件是？',
        [
          '元素必须有明确的width且为块级元素',
          '元素必须有height',
          '元素必须是内联元素',
          '元素必须绝对定位',
        ],
        0,
      ],
      [
        'padding的百分比是相对于什么计算的？',
        ['包含块的宽度', '包含块的高度', '元素自身的宽度', '元素自身的高度'],
        0,
      ],
      [
        'margin的百分比是相对于什么计算的？',
        ['包含块的宽度', '包含块的高度', '元素自身的宽度', '元素自身的高度'],
        0,
      ],
      [
        'border属性的简写顺序是？',
        ['width style color', 'style color width', 'color width style', 'width color style'],
        0,
      ],
      ['border-style的默认值是？', ['none', 'solid', 'dashed', 'dotted'], 0],
      ['border-width的默认值是？', ['medium', 'thin', 'thick', '0'], 0],
      ['border-color的默认值是？', ['currentColor', 'black', 'transparent', 'white'], 0],
      [
        'border-radius: 50%的作用是？',
        ['创建圆形或椭圆形', '创建圆角矩形', '创建三角形', '创建梯形'],
        0,
      ],
      [
        'outline与border的区别是？',
        ['outline不占据布局空间', 'outline占据空间', 'outline可以设置圆角', 'outline可以设置样式'],
        0,
      ],
      [
        'outline-offset属性的作用是？',
        ['设置轮廓与边框的偏移量', '设置轮廓宽度', '设置轮廓颜色', '设置轮廓样式'],
        0,
      ],
      [
        'box-shadow的参数顺序是？',
        [
          '水平偏移 垂直偏移 模糊 扩展 颜色',
          '模糊 水平偏移 垂直偏移 颜色',
          '颜色 水平偏移 垂直偏移 模糊',
          '水平偏移 垂直偏移 颜色 模糊',
        ],
        0,
      ],
      [
        'box-shadow中inset关键字的作用是？',
        ['将外部阴影改为内部阴影', '增加阴影大小', '减少阴影模糊', '改变阴影颜色'],
        0,
      ],
      [
        '如何用box-shadow实现多重阴影？',
        ['使用逗号分隔多个阴影值', '使用空格分隔', '使用分号分隔', '多次设置box-shadow'],
        0,
      ],
      [
        '文档流是指？',
        ['元素在页面中的默认排列规则', '水流效果', '文字环绕效果', '绝对定位布局'],
        0,
      ],
      [
        '块级元素在文档流中的特点是？',
        [
          '独占一行，可设置宽高',
          '不独占一行，可设置宽高',
          '独占一行，不可设置宽高',
          '不独占一行，不可设置宽高',
        ],
        0,
      ],
      [
        '内联元素在文档流中的特点是？',
        [
          '不独占一行，不可设置宽高',
          '独占一行，可设置宽高',
          '不独占一行，可设置宽高',
          '独占一行，不可设置宽高',
        ],
        0,
      ],
      [
        '内联块元素的特点是？',
        [
          '不独占一行，可设置宽高',
          '独占一行，可设置宽高',
          '不独占一行，不可设置宽高',
          '独占一行，不可设置宽高',
        ],
        0,
      ],
      [
        'display: none的作用是？',
        ['隐藏元素且不占据空间', '隐藏元素但占据空间', '显示元素', '透明化元素'],
        0,
      ],
      [
        'visibility: hidden的作用是？',
        ['隐藏元素但占据空间', '隐藏元素且不占据空间', '显示元素', '移除元素'],
        0,
      ],
      [
        'opacity: 0的作用是？',
        ['透明化元素但占据空间', '隐藏元素且不占据空间', '移除元素', '改变元素大小'],
        0,
      ],
      [
        '如何清除元素默认的外边距和内边距？',
        [
          '* { margin: 0; padding: 0; }',
          'body { margin: 0; }',
          'div { padding: 0; }',
          'html { margin: 0; }',
        ],
        0,
      ],
      [
        'BFC的全称是？',
        [
          'Block Formatting Context',
          'Block Format Content',
          'Box Formatting Context',
          'Box Format Content',
        ],
        0,
      ],
      [
        'BFC的作用不包括？',
        ['创建动画效果', '避免margin合并', '清除浮动', '阻止元素被浮动覆盖'],
        0,
      ],
      [
        '如何创建BFC？',
        ['overflow: hidden/auto/scroll', 'display: block', 'margin: auto', 'position: relative'],
        0,
      ],
      ['float属性的作用是？', ['实现元素浮动', '固定定位', '弹性布局', '网格布局'], 0],
      [
        '浮动元素的特点是？',
        ['脱离文档流，向左或向右移动', '脱离文档流，固定位置', '不脱离文档流', '隐藏元素'],
        0,
      ],
      [
        '浮动导致的父元素高度塌陷如何解决？',
        ['清除浮动（clearfix）', '增加父元素高度', '设置父元素overflow', '以上都可以'],
        0,
      ],
      [
        'clearfix的常用实现方式是？',
        [
          '::after { content: ""; display: block; clear: both; }',
          '::before { clear: both; }',
          'overflow: hidden',
          'float: none',
        ],
        0,
      ],
      [
        'clear属性的作用是？',
        ['指定元素两侧不能有浮动元素', '清除所有样式', '清除内边距', '清除边框'],
        0,
      ],
      [
        'position: static的特点是？',
        ['默认定位，元素出现在正常流中', '相对定位', '绝对定位', '固定定位'],
        0,
      ],
      [
        'position: relative的特点是？',
        ['相对自身原位置偏移，不脱离文档流', '相对父元素偏移', '脱离文档流', '相对浏览器窗口定位'],
        0,
      ],
      [
        'position: absolute的特点是？',
        [
          '相对最近的非static祖先元素偏移，脱离文档流',
          '相对自身偏移',
          '不脱离文档流',
          '相对浏览器窗口定位',
        ],
        0,
      ],
      [
        'position: fixed的特点是？',
        ['相对浏览器窗口定位，脱离文档流', '相对父元素定位', '相对自身定位', '不脱离文档流'],
        0,
      ],
      [
        'position: sticky的特点是？',
        ['相对定位和固定定位的混合', '绝对定位', '相对定位', '固定定位'],
        0,
      ],
      [
        'sticky定位的生效条件是？',
        [
          '必须指定top/bottom/left/right之一',
          '父元素必须有高度',
          '必须设置z-index',
          '必须设置overflow',
        ],
        0,
      ],
      [
        'top/bottom/left/right属性只在什么情况下生效？',
        ['position不是static时', '任何情况都生效', 'display为block时', 'float存在时'],
        0,
      ],
      [
        'z-index属性的作用是？',
        ['控制定位元素的堆叠顺序', '控制元素大小', '控制元素位置', '控制元素透明度'],
        0,
      ],
      [
        'z-index只在什么情况下生效？',
        ['position不是static时', '任何情况都生效', 'display为block时', 'float存在时'],
        0,
      ],
      [
        '层叠上下文是什么？',
        [
          '决定元素在Z轴上的渲染顺序的三维概念',
          '元素的层叠顺序',
          '元素的显示顺序',
          '元素的绘制顺序',
        ],
        0,
      ],
      [
        '如何创建层叠上下文？',
        [
          'position+ z-index、opacity < 1、transform等',
          'display: block',
          'margin: auto',
          'float: left',
        ],
        0,
      ],
      [
        'display: inline-block的空白间隙问题如何解决？',
        [
          '删除HTML中的空白字符、负margin、font-size: 0',
          '设置width: 100%',
          '设置float',
          '设置position',
        ],
        0,
      ],
      ['overflow属性的默认值是？', ['visible', 'hidden', 'auto', 'scroll'], 0],
      [
        'overflow: hidden的作用是？',
        ['裁剪溢出内容并隐藏', '显示滚动条', '内容自动换行', '内容溢出显示'],
        0,
      ],
      [
        'overflow: auto的作用是？',
        ['内容溢出时自动显示滚动条', '始终显示滚动条', '隐藏溢出内容', '内容自动换行'],
        0,
      ],
      [
        'text-overflow: ellipsis的作用是？',
        ['文本溢出时显示省略号', '文本换行', '文本裁剪', '文本缩进'],
        0,
      ],
      [
        '单行文本溢出显示省略号的条件是？',
        [
          'white-space: nowrap; overflow: hidden; text-overflow: ellipsis;',
          'display: block;',
          'width: 100%;',
          'font-size: 14px;',
        ],
        0,
      ],
      [
        '多行文本溢出显示省略号使用什么属性？',
        ['-webkit-line-clamp', 'text-overflow', 'overflow', 'white-space'],
        0,
      ],
      [
        'visibility: collapse的作用是？',
        ['对于表格元素隐藏并移除空间，对于其他元素同hidden', '折叠元素', '删除元素', '显示元素'],
        0,
      ],
      [
        'resize属性的作用是？',
        ['允许用户调整元素大小', '调整字体大小', '调整图片大小', '调整布局大小'],
        0,
      ],
      [
        'resize属性生效的条件是？',
        ['overflow不是visible', 'display是block', 'position是absolute', 'width和height设置'],
        0,
      ],
      ['clip-path属性的作用是？', ['裁剪元素的可视区域', '裁剪图片', '裁剪文本', '裁剪边框'], 0],
      [
        'clip-path: circle()的作用是？',
        ['创建圆形裁剪区域', '创建椭圆裁剪区域', '创建多边形裁剪区域', '创建矩形裁剪区域'],
        0,
      ],
      [
        'clip-path: polygon()的作用是？',
        ['创建多边形裁剪区域', '创建圆形裁剪区域', '创建椭圆裁剪区域', '创建矩形裁剪区域'],
        0,
      ],
      [
        '如何使用CSS绘制三角形？',
        ['利用border的透明特性', '利用clip-path', '利用transform', '利用margin'],
        0,
      ],
      [
        'min-width和max-width的作用是？',
        ['限制元素宽度的范围', '设置固定宽度', '设置百分比宽度', '设置弹性宽度'],
        0,
      ],
      [
        'min-height: 100vh的作用是？',
        ['确保元素至少占满整个视口高度', '高度为100像素', '高度为0', '高度自适应'],
        0,
      ],
      [
        'box-sizing的兼容性如何？',
        ['现代浏览器完全支持', '不支持IE', '不支持Chrome', '不支持Firefox'],
        0,
      ],
      [
        '如何实现元素的等比例缩放？',
        [
          '使用padding-bottom百分比技巧或aspect-ratio',
          '使用width: auto',
          '使用height: auto',
          '使用max-width',
        ],
        0,
      ],
      [
        'aspect-ratio属性的作用是？',
        ['设置盒子的宽高比', '设置宽度', '设置高度', '设置缩放比例'],
        0,
      ],
      [
        'writing-mode属性的作用是？',
        ['设置文本的书写方向', '设置字体大小', '设置行高', '设置字间距'],
        0,
      ],
      [
        'direction属性的作用是？',
        ['设置文本的方向（从左到右或从右到左）', '设置布局方向', '设置浮动方向', '设置动画方向'],
        0,
      ],
      [
        'unicode-bidi属性的作用是？',
        ['处理双向文本', '设置Unicode编码', '设置字体', '设置语言'],
        0,
      ],
      [
        'overflow-wrap: break-word的作用是？',
        ['允许长单词在任意位置断行', '禁止断行', '单词不换行', '空格不断行'],
        0,
      ],
      [
        'word-break: break-all的作用是？',
        ['允许非CJK文本在任意字符间断行', '只允许CJK断行', '保留空白', '不换行'],
        0,
      ],
      [
        'white-space: nowrap的作用是？',
        ['禁止文本换行', '保留空白符', '合并空白符', '正常换行'],
        0,
      ],
      [
        'white-space: pre的作用是？',
        ['保留空白符序列和换行符', '合并空白符', '禁止换行', '正常换行'],
        0,
      ],
      [
        'word-spacing属性的作用是？',
        ['设置单词之间的间距', '设置字母间距', '设置行高', '设置缩进'],
        0,
      ],
      [
        'letter-spacing属性的作用是？',
        ['设置字母之间的间距', '设置单词间距', '设置行高', '设置缩进'],
        0,
      ],
      [
        'line-height属性的作用是？',
        ['设置行间距', '设置字体大小', '设置字母间距', '设置单词间距'],
        0,
      ],
      [
        'line-height: 1.5是相对于什么？',
        ['当前元素的font-size', '浏览器默认大小', '父元素font-size', '视口大小'],
        0,
      ],
      [
        'line-height: 1.5和line-height: 150%的区别？',
        [
          '继承方式不同，1.5子元素根据自身font-size计算，150%根据父元素计算',
          '没有区别',
          '1.5更大',
          '150%更大',
        ],
        0,
      ],
      [
        'text-indent属性的作用是？',
        ['设置首行文本缩进', '设置字母间距', '设置行高', '设置对齐方式'],
        0,
      ],
      ['text-align: justify的作用是？', ['两端对齐', '左对齐', '右对齐', '居中对齐'], 0],
      [
        'vertical-align属性的作用是？',
        ['设置内联或表格单元格的垂直对齐', '设置块级元素垂直对齐', '设置水平对齐', '设置居中对齐'],
        0,
      ],
      [
        'vertical-align: middle的效果是？',
        ['元素中线与父元素基线加上x高度一半对齐', '完全居中', '顶部对齐', '底部对齐'],
        0,
      ],
      [
        'text-transform: uppercase的作用是？',
        ['将文本转为大写', '转为小写', '首字母大写', '无变化'],
        0,
      ],
      [
        'text-decoration: underline的作用是？',
        ['添加下划线', '添加上划线', '添加删除线', '无装饰'],
        0,
      ],
      ['text-shadow属性的作用是？', ['添加文本阴影', '添加边框阴影', '添加盒阴影', '添加背景'], 0],
      [
        'text-shadow的参数顺序是？',
        [
          '水平偏移 垂直偏移 模糊 颜色',
          '模糊 水平偏移 垂直偏移 颜色',
          '颜色 水平偏移 垂直偏移 模糊',
          '水平偏移 垂直偏移 颜色 模糊',
        ],
        0,
      ],
      [
        'font属性的简写顺序是？',
        [
          'style variant weight size/line-height family',
          'size family style weight',
          'family size style',
          'weight style size family',
        ],
        0,
      ],
      [
        'font-size: 62.5%的作用是？',
        ['将默认16px改为10px方便rem计算', '缩小字体', '放大字体', '重置字体'],
        0,
      ],
      ['@font-face规则的作用是？', ['自定义字体', '引入图片', '定义动画', '定义媒体查询'], 0],
      [
        '@font-face中src的作用是？',
        ['指定字体文件的路径', '指定字体大小', '指定字体颜色', '指定字体样式'],
        0,
      ],
      [
        '如何解决字体加载时的闪烁问题(FOIT)？',
        [
          '使用font-display: swap',
          '使用font-display: auto',
          '使用font-display: block',
          '使用font-display: optional',
        ],
        0,
      ],
      [
        'font-display: swap的行为是？',
        [
          '先使用后备字体，自定义字体加载完后替换',
          '一直等待自定义字体',
          '不使用自定义字体',
          '隐藏文本直到字体加载',
        ],
        0,
      ],
      ['line-height: normal的默认值大约是？', ['1.2', '1', '1.5', '2'], 0],
      [
        'line-height为无单位数值的好处是？',
        ['子元素根据自身font-size计算，避免继承异常', '计算更简单', '性能更好', '兼容性更好'],
        0,
      ],
      [
        '如何实现中英文混排时的自动换行优化？',
        [
          'word-break: break-word',
          'word-break: break-all',
          'white-space: nowrap',
          'overflow: hidden',
        ],
        0,
      ],
      [
        'content属性用于什么？',
        ['配合::before和::after插入生成内容', '设置元素内容', '设置文本', '设置属性'],
        0,
      ],
      [
        'counter-increment属性的作用是？',
        ['递增CSS计数器', '设置计数器初始值', '重置计数器', '显示计数器'],
        0,
      ],
      [
        'counter-reset属性的作用是？',
        ['初始化或重置CSS计数器', '递增计数器', '显示计数器', '删除计数器'],
        0,
      ],
      [
        'counter()函数的作用是？',
        ['获取计数器的值并插入内容', '递增计数器', '重置计数器', '删除计数器'],
        0,
      ],
      ['quotes属性的作用是？', ['设置引号类型', '设置引用', '设置内容', '设置注释'], 0],
      [
        'cursor属性的作用是？',
        ['设置鼠标指针的类型', '设置光标位置', '设置焦点', '设置选中状态'],
        0,
      ],
      [
        'user-select: none的作用是？',
        ['禁止用户选中文本', '允许选中文本', '自动选中', '全部选中'],
        0,
      ],
      [
        'pointer-events: none的作用是？',
        ['元素永远不会成为鼠标事件的目标', '禁止点击', '禁止悬停', '禁止移动'],
        0,
      ],
      [
        'caret-color属性的作用是？',
        ['设置文本插入光标的颜色', '设置边框颜色', '设置背景颜色', '设置字体颜色'],
        0,
      ],
    ];
    const item = items[(i - 101) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第三部分：CSS Flexbox 弹性布局 (201-300) ====================
  for (let i = 201; i <= 300; i++) {
    const q = { id: `css-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'Flexbox布局的主要优势是？',
        ['一维布局的灵活排列和对齐', '二维表格布局', '打印布局', '固定布局'],
        0,
      ],
      [
        'display: flex的作用是？',
        ['将元素设置为弹性容器', '设置为块级元素', '设置为内联元素', '设置为网格容器'],
        0,
      ],
      ['flex-direction的默认值是？', ['row', 'column', 'row-reverse', 'column-reverse'], 0],
      [
        'flex-direction: row-reverse的作用是？',
        [
          '主轴为水平方向，起点在右端',
          '主轴为垂直方向',
          '主轴为水平方向，起点在左端',
          '主轴为垂直方向，起点在下端',
        ],
        0,
      ],
      ['flex-wrap的默认值是？', ['nowrap', 'wrap', 'wrap-reverse', 'auto'], 0],
      ['flex-wrap: wrap的作用是？', ['子元素换行显示', '不换行', '反向换行', '自动换行'], 0],
      [
        'justify-content属性的作用是？',
        ['定义项目在主轴上的对齐方式', '定义在交叉轴上的对齐', '定义自身对齐', '定义换行方式'],
        0,
      ],
      [
        'justify-content: space-between的效果是？',
        ['两端对齐，项目之间间隔相等', '项目之间和两端间隔相等', '居中对齐', '均匀分布'],
        0,
      ],
      [
        'justify-content: space-around的效果是？',
        ['项目两侧间隔相等，项目间间隔是两端的两倍', '两端对齐', '居中对齐', '均匀分布'],
        0,
      ],
      [
        'justify-content: space-evenly的效果是？',
        ['项目和两端间隔完全相等', '两端对齐', '项目间间隔是两端两倍', '居中对齐'],
        0,
      ],
      [
        'align-items属性的作用是？',
        ['定义项目在交叉轴上的对齐方式', '定义主轴对齐', '定义自身对齐', '定义换行方式'],
        0,
      ],
      [
        'align-items: stretch的效果是？',
        ['如果项目未设置高度，将占满整个容器高度', '顶部对齐', '底部对齐', '居中对齐'],
        0,
      ],
      ['align-items: center的效果是？', ['交叉轴居中对齐', '主轴居中', '顶部对齐', '底部对齐'], 0],
      [
        'align-items: flex-start的效果是？',
        ['交叉轴起点对齐', '交叉轴终点对齐', '主轴起点对齐', '主轴终点对齐'],
        0,
      ],
      [
        'align-content属性的作用是？',
        ['多根轴线的对齐方式', '单根轴线对齐', '主轴对齐', '交叉轴单行对齐'],
        0,
      ],
      [
        'align-content生效的前提是？',
        ['容器有多根轴线（flex-wrap: wrap且换行）', '单行容器', '设置了高度', '设置了宽度'],
        0,
      ],
      [
        'flex-flow属性是哪两个属性的简写？',
        [
          'flex-direction和flex-wrap',
          'flex-grow和flex-shrink',
          'justify-content和align-items',
          'flex-basis和flex-grow',
        ],
        0,
      ],
      ['order属性的作用是？', ['定义项目的排列顺序', '定义对齐方式', '定义大小', '定义换行'], 0],
      ['order的默认值是？', ['0', '1', '-1', 'auto'], 0],
      ['order值越小项目越靠？', ['越靠前', '越靠后', '越靠上', '越靠下'], 0],
      [
        'flex-grow属性的作用是？',
        ['定义项目的放大比例', '定义缩小比例', '定义初始大小', '定义对齐方式'],
        0,
      ],
      ['flex-grow的默认值是？', ['0', '1', 'auto', 'none'], 0],
      [
        '如果所有项目的flex-grow都为1，效果是？',
        ['等分剩余空间', '不放大', '按比例放大', '只放大第一个'],
        0,
      ],
      [
        'flex-shrink属性的作用是？',
        ['定义项目的缩小比例', '定义放大比例', '定义初始大小', '定义对齐方式'],
        0,
      ],
      ['flex-shrink的默认值是？', ['1', '0', 'auto', 'none'], 0],
      [
        '如果所有项目的flex-shrink都为1，空间不足时？',
        ['等比例缩小', '不缩小', '只缩小最后一个', '溢出容器'],
        0,
      ],
      ['flex-shrink: 0的作用是？', ['项目不缩小', '项目不放大', '项目放大', '项目缩小'], 0],
      [
        'flex-basis属性的作用是？',
        ['定义项目在分配多余空间之前的初始大小', '定义放大比例', '定义缩小比例', '定义对齐方式'],
        0,
      ],
      ['flex-basis的默认值是？', ['auto', '0', '100%', '1px'], 0],
      ['flex-basis: auto的含义是？', ['项目本身的大小', '0大小', '100%大小', '继承父元素'], 0],
      [
        'flex属性是哪三个属性的简写？',
        [
          'flex-grow, flex-shrink, flex-basis',
          'flex-direction, flex-wrap, flex-flow',
          'order, flex-grow, flex-shrink',
          'align-self, flex-grow, flex-basis',
        ],
        0,
      ],
      [
        'flex: 1等同于？',
        ['flex: 1 1 0%', 'flex: 1 1 auto', 'flex: 0 1 auto', 'flex: 1 0 auto'],
        0,
      ],
      [
        'flex: auto等同于？',
        ['flex: 1 1 auto', 'flex: 1 1 0%', 'flex: 0 1 auto', 'flex: 0 0 auto'],
        0,
      ],
      [
        'flex: none等同于？',
        ['flex: 0 0 auto', 'flex: 1 1 auto', 'flex: 0 1 auto', 'flex: 1 1 0%'],
        0,
      ],
      [
        'align-self属性的作用是？',
        [
          '允许单个项目与其他项目不一样的对齐方式',
          '设置主轴对齐',
          '设置所有项目对齐',
          '设置容器对齐',
        ],
        0,
      ],
      ['align-self的默认值是？', ['auto', 'flex-start', 'center', 'stretch'], 0],
      [
        'align-self: auto的含义是？',
        ['继承父元素的align-items属性', '顶部对齐', '底部对齐', '居中对齐'],
        0,
      ],
      [
        '如何实现Flexbox的垂直居中？',
        [
          'justify-content: center; align-items: center;',
          'margin: auto 0;',
          'vertical-align: middle;',
          'line-height等于height',
        ],
        0,
      ],
      [
        'Flexbox中margin: auto的作用是？',
        ['吸收额外空间实现居中或两端对齐', '只设置边距', '清除浮动', '设置宽度'],
        0,
      ],
      [
        'flex项目设置position: absolute会怎样？',
        ['脱离Flex布局，相对于定位父元素定位', '仍然受Flex布局控制', '失去大小', '隐藏元素'],
        0,
      ],
      [
        'Flexbox中min-width的作用是？',
        ['防止项目缩小到低于此值', '设置固定宽度', '设置最大宽度', '设置初始宽度'],
        0,
      ],
      [
        'Flexbox中max-width的作用是？',
        ['防止项目放大到超过此值', '设置最小宽度', '设置固定宽度', '设置初始宽度'],
        0,
      ],
      [
        'Flexbox中gap属性的作用是？',
        ['设置项目之间的间距', '设置外边距', '设置内边距', '设置边框'],
        0,
      ],
      [
        'gap属性是哪两个属性的简写？',
        ['row-gap和column-gap', 'margin和padding', 'width和height', 'top和left'],
        0,
      ],
      [
        'Flexbox中如何实现等高布局？',
        ['默认就是等高（align-items: stretch）', '设置相同height', '使用float', '使用position'],
        0,
      ],
      [
        'Flexbox中如何实现圣杯布局？',
        ['结合flex-grow和order', '只用float', '只用position', '只用margin'],
        0,
      ],
      [
        'Flexbox中如何实现粘性页脚？',
        [
          '主内容flex: 1，页脚flex: none',
          '页脚position: fixed',
          '主内容height: 100%',
          '页脚margin-top: auto',
        ],
        0,
      ],
      [
        'Flexbox中伪元素如何影响布局？',
        ['伪元素也会成为flex项目', '不影响', '脱离布局', '隐藏'],
        0,
      ],
      [
        'Flexbox中如何处理文本溢出？',
        ['min-width: 0配合text-overflow', '直接overflow: hidden', '不处理', 'flex-shrink: 0'],
        0,
      ],
      [
        'Flexbox中flex-basis和width的优先级？',
        ['flex-basis优先于width', 'width优先', '相同', '取决于顺序'],
        0,
      ],
      [
        'Flexbox中flex: 0 1 auto的含义是？',
        [
          '不放大，空间不足时缩小，初始大小为自身大小',
          '放大，不缩小，初始为0',
          '不放大，不缩小，初始为自身',
          '放大，缩小，初始为0',
        ],
        0,
      ],
      [
        'Flexbox中如何实现反向布局？',
        [
          'flex-direction: row-reverse或column-reverse',
          'order: -1',
          'float: right',
          'direction: rtl',
        ],
        0,
      ],
      [
        'Flexbox中如何实现换行后居中？',
        [
          'justify-content: center配合flex-wrap: wrap',
          'align-content: center',
          'align-items: center',
          'margin: auto',
        ],
        0,
      ],
      [
        'Flexbox中flex-shrink为0导致溢出怎么办？',
        ['配合min-width或overflow处理', '增加容器宽度', '减少项目数量', '使用float'],
        0,
      ],
      [
        'Flexbox中如何实现等间距排列？',
        [
          'justify-content: space-between或space-evenly',
          'margin: auto',
          'gap: 10px',
          'padding: 10px',
        ],
        0,
      ],
      [
        'Flexbox中如何实现最后一个元素靠右？',
        ['margin-left: auto', 'float: right', 'position: absolute', 'text-align: right'],
        0,
      ],
      [
        'Flexbox中如何实现输入框自适应宽度？',
        ['input设置flex: 1', 'width: 100%', 'display: block', 'overflow: hidden'],
        0,
      ],
      [
        'Flexbox中如何实现卡片列表？',
        [
          'flex-wrap: wrap配合固定宽度和gap',
          'float: left',
          'display: inline-block',
          'column-count',
        ],
        0,
      ],
      [
        'Flexbox中如何实现导航栏？',
        ['justify-content: space-between', 'float: left', 'display: inline', 'position: relative'],
        0,
      ],
      [
        'Flexbox中如何实现居中且底部对齐？',
        [
          'align-items: flex-end; justify-content: center;',
          'text-align: center; vertical-align: bottom;',
          'margin: 0 auto; bottom: 0;',
          'display: table-cell;',
        ],
        0,
      ],
      [
        'Flexbox中如何实现侧边栏固定主内容自适应？',
        [
          '侧边栏flex: 0 0 200px，主内容flex: 1',
          '主内容float: left',
          '侧边栏position: fixed',
          '主内容width: 100%',
        ],
        0,
      ],
      [
        'Flexbox中如何实现网格布局？',
        ['flex-wrap: wrap配合百分比宽度', 'display: grid', 'column-count', 'float: left'],
        0,
      ],
      [
        'Flexbox中gap属性与margin的区别？',
        [
          'gap只在项目之间生效，首尾无间距；margin四周都生效',
          '没有区别',
          'gap性能更好',
          'margin更灵活',
        ],
        0,
      ],
      [
        'Flexbox中如何实现垂直分割线？',
        ['伪元素border-left或项目间border', 'hr标签', 'background: black', 'outline: 1px solid'],
        0,
      ],
      [
        'Flexbox中如何实现等宽按钮？',
        ['按钮设置flex: 1', 'width: 100px', 'display: block', 'float: left'],
        0,
      ],
      [
        'Flexbox中如何实现文字垂直居中？',
        [
          'align-items: center',
          'line-height等于height',
          'vertical-align: middle',
          'padding: 10px 0',
        ],
        0,
      ],
      [
        'Flexbox中flex-basis为百分比时相对于什么？',
        ['弹性容器的内部宽度', '父元素的宽度', '视口宽度', '自身宽度'],
        0,
      ],
      [
        'Flexbox中如何实现两端对齐且最后一行左对齐？',
        [
          '使用伪元素占位或Grid布局',
          'justify-content: space-between',
          'float: left',
          'text-align: justify',
        ],
        0,
      ],
      [
        'Flexbox中如何实现瀑布流？',
        [
          'Flexbox不擅长，建议使用Grid或JS',
          'flex-direction: column',
          'flex-wrap: wrap',
          'column-count',
        ],
        0,
      ],
      [
        'Flexbox中如何实现标签云？',
        [
          'flex-wrap: wrap; align-items: flex-start;',
          'display: inline',
          'float: left',
          'column-count',
        ],
        0,
      ],
      [
        'Flexbox中如何实现表单布局？',
        ['flex-direction: column配合gap', 'display: table', 'float: left', 'position: relative'],
        0,
      ],
      [
        'Flexbox中如何实现媒体对象？',
        ['图片固定宽度，内容flex: 1', 'float: left', 'position: absolute', 'display: inline-block'],
        0,
      ],
      [
        'Flexbox中如何实现输入组？',
        ['按钮flex: none，输入框flex: 1', 'display: inline', 'float: left', 'width: 100%'],
        0,
      ],
      [
        'Flexbox中如何实现悬挂缩进？',
        ['负margin配合padding', 'text-indent', 'position: relative', 'float: left'],
        0,
      ],
      [
        'Flexbox中flex-shrink的计算公式是？',
        ['按flex-shrink比例分配不足空间', '等比例缩小', '只缩小最后一个', '不缩小'],
        0,
      ],
      [
        'Flexbox中如何实现吸顶效果？',
        ['position: sticky', 'position: fixed', 'position: absolute', 'margin-top: 0'],
        0,
      ],
      [
        'Flexbox中如何实现吸底效果？',
        [
          'margin-top: auto或position: sticky',
          'position: fixed',
          'bottom: 0',
          'vertical-align: bottom',
        ],
        0,
      ],
      [
        'Flexbox中如何实现水平滚动？',
        [
          'flex-wrap: nowrap; overflow-x: auto;',
          'overflow: scroll;',
          'white-space: nowrap;',
          'display: inline-block;',
        ],
        0,
      ],
      [
        'Flexbox中如何实现步骤条？',
        ['flex: 1配合伪元素连线', 'width: 25%', 'float: left', 'display: table-cell'],
        0,
      ],
      [
        'Flexbox中如何实现进度条？',
        ['容器flex，内部flex-grow根据比例', 'width: 50%', 'background-size', 'clip-path'],
        0,
      ],
      [
        'Flexbox中如何实现轮播指示器？',
        [
          'justify-content: center; gap: 8px;',
          'text-align: center',
          'margin: 0 auto',
          'position: absolute',
        ],
        0,
      ],
      [
        'Flexbox中如何实现面包屑？',
        [
          'align-items: center; gap: 8px; 配合伪元素分隔符',
          'display: inline',
          'float: left',
          'text-align: left',
        ],
        0,
      ],
      [
        'Flexbox中如何实现分页器？',
        [
          'justify-content: center; gap: 4px;',
          'text-align: center',
          'margin: 0 auto',
          'display: inline-block',
        ],
        0,
      ],
      [
        'Flexbox中如何实现头像列表？',
        [
          'flex-direction: row-reverse; 配合负margin重叠',
          'float: right',
          'position: absolute',
          'z-index递增',
        ],
        0,
      ],
      [
        'Flexbox中如何实现标签页？',
        ['flex: 1均分宽度或自适应', 'width: 100%', 'display: block', 'float: left'],
        0,
      ],
      [
        'Flexbox中如何实现下拉菜单？',
        ['flex-direction: column', 'display: block', 'position: relative', 'float: left'],
        0,
      ],
      [
        'Flexbox中如何实现工具栏？',
        [
          'align-items: center; gap: 8px;',
          'text-align: center',
          'margin: 0 auto',
          'display: inline',
        ],
        0,
      ],
      [
        'Flexbox中如何实现卡片角标？',
        [
          'position: absolute配合flex容器',
          'float: right',
          'margin-left: auto',
          'text-align: right',
        ],
        0,
      ],
      [
        'Flexbox中如何实现列表项？',
        [
          'align-items: center; justify-content: space-between;',
          'display: block',
          'padding: 10px',
          'border-bottom',
        ],
        0,
      ],
      [
        'Flexbox中如何实现开关组件？',
        ['宽高固定，伪元素用transform移动', 'margin-left切换', 'float切换', 'text-align切换'],
        0,
      ],
      [
        'Flexbox中如何实现加载骨架屏？',
        ['flex布局配合渐变动画', 'display: none', 'opacity: 0', 'visibility: hidden'],
        0,
      ],
      [
        'Flexbox中如何实现响应式卡片？',
        ['flex-wrap: wrap; 配合min-width和flex-grow', 'width: 50%', 'float: left', 'column-count'],
        0,
      ],
      [
        'Flexbox中如何实现双行文本截断？',
        ['-webkit-line-clamp: 2', 'height限制', 'overflow: hidden', 'text-overflow: ellipsis'],
        0,
      ],
      [
        'Flexbox中如何实现文字环绕图片？',
        [
          'Flexbox不支持文字环绕，需使用float',
          'flex-direction: row',
          'align-items: flex-start',
          'display: inline-block',
        ],
        0,
      ],
      [
        'Flexbox中如何实现九宫格？',
        ['flex-wrap: wrap; 每项width: 33.33%', 'display: grid', 'column-count: 3', 'float: left'],
        0,
      ],
      [
        'Flexbox中如何实现居中对齐且左右定宽？',
        ['左右flex: none，中间flex: 1', 'float: left', 'position: absolute', 'margin: 0 auto'],
        0,
      ],
      [
        'Flexbox中如何实现多列等高？',
        ['默认align-items: stretch即可', '设置相同height', 'min-height', 'max-height'],
        0,
      ],
      [
        'Flexbox中如何实现单行两端对齐？',
        ['justify-content: space-between', 'text-align: justify', 'margin: 0 auto', 'float: left'],
        0,
      ],
      [
        'Flexbox中如何实现垂直排列？',
        ['flex-direction: column', 'display: block', 'float: left', 'column-count'],
        0,
      ],
      [
        'Flexbox中如何实现水平排列？',
        ['flex-direction: row', 'display: inline', 'float: left', 'text-align: left'],
        0,
      ],
      [
        'Flexbox中如何实现自适应宽度？',
        ['flex-grow: 1', 'width: 100%', 'display: block', 'overflow: hidden'],
        0,
      ],
      [
        'Flexbox中如何实现固定宽度？',
        ['flex: none; width: 200px;', 'width: 200px;', 'max-width: 200px;', 'min-width: 200px;'],
        0,
      ],
      [
        'Flexbox中如何实现自适应高度？',
        ['align-items: stretch', 'height: 100%', 'display: block', 'overflow: hidden'],
        0,
      ],
      [
        'Flexbox中如何实现换行间距？',
        ['gap属性或margin配合负margin', 'padding', 'border', 'line-height'],
        0,
      ],
      [
        'Flexbox中如何实现底部固定？',
        ['margin-top: auto', 'position: fixed', 'bottom: 0', 'align-self: flex-end'],
        0,
      ],
      [
        'Flexbox中如何实现顶部固定？',
        ['margin-bottom: auto', 'position: fixed', 'top: 0', 'align-self: flex-start'],
        0,
      ],
      [
        'Flexbox中如何实现左右分割？',
        ['flex-direction: row', 'column-count: 2', 'float: left', 'display: inline-block'],
        0,
      ],
      [
        'Flexbox中如何实现上下分割？',
        ['flex-direction: column', 'display: block', 'row-gap', 'margin-bottom'],
        0,
      ],
      [
        'Flexbox中如何实现平均分配？',
        ['flex: 1', 'width: 50%', 'justify-content: space-between', 'margin: 0 auto'],
        0,
      ],
      [
        'Flexbox中如何实现按比例分配？',
        ['flex-grow按比例设置', 'width按百分比', 'max-width按比例', 'min-width按比例'],
        0,
      ],
    ];
    const item = items[(i - 201) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第四部分：CSS Grid 网格布局 (301-400) ====================
  for (let i = 301; i <= 400; i++) {
    const q = { id: `css-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'CSS Grid布局的主要优势是？',
        ['二维布局同时控制行和列', '一维布局', '打印布局', '固定布局'],
        0,
      ],
      [
        'display: grid的作用是？',
        ['将元素设置为网格容器', '设置为块级元素', '设置为弹性容器', '设置为内联元素'],
        0,
      ],
      [
        'grid-template-columns属性的作用是？',
        ['定义网格的列数和每列宽度', '定义行数', '定义间距', '定义对齐方式'],
        0,
      ],
      [
        'grid-template-rows属性的作用是？',
        ['定义网格的行数和每行高度', '定义列数', '定义间距', '定义对齐方式'],
        0,
      ],
      [
        'fr单位的作用是？',
        ['表示网格容器中可用空间的一个等份', '固定单位', '百分比单位', '像素单位'],
        0,
      ],
      [
        'grid-template-columns: 1fr 2fr的含义是？',
        ['第二列是第一列的两倍宽', '两列等宽', '第一列是第二列两倍', '总宽度3fr'],
        0,
      ],
      ['repeat()函数的作用是？', ['重复定义网格轨道', '重复动画', '重复背景', '重复内容'], 0],
      [
        'grid-template-columns: repeat(3, 1fr)的含义是？',
        ['创建3列等宽布局', '创建1列3fr布局', '创建3行等高布局', '重复3次1fr'],
        0,
      ],
      [
        'auto-fill关键字的作用是？',
        ['自动填充列数以适应容器', '自动填充内容', '自动填充高度', '自动填充间距'],
        0,
      ],
      [
        'auto-fit关键字的作用是？',
        ['自动适应列数并折叠空轨道', '自动适应内容', '自动适应高度', '自动适应间距'],
        0,
      ],
      [
        'auto-fill和auto-fit的区别是？',
        ['auto-fit会折叠空轨道，auto-fill保留', '没有区别', 'auto-fill折叠空轨道', 'auto-fit更宽'],
        0,
      ],
      [
        'minmax()函数的作用是？',
        ['定义网格轨道的最小和最大尺寸范围', '定义最大值', '定义最小值', '定义平均值'],
        0,
      ],
      [
        'grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))的作用是？',
        ['创建响应式网格，最小200px，自动填充', '固定3列', '固定200px宽度', '最大200px宽度'],
        0,
      ],
      ['grid-column-gap属性的作用是？', ['设置列间距', '设置行间距', '设置边距', '设置内边距'], 0],
      ['grid-row-gap属性的作用是？', ['设置行间距', '设置列间距', '设置边距', '设置内边距'], 0],
      [
        'gap属性是哪两个属性的简写？',
        ['grid-row-gap和grid-column-gap', 'margin和padding', 'width和height', 'top和left'],
        0,
      ],
      [
        'grid-template-areas属性的作用是？',
        ['通过命名区域定义网格布局', '定义列宽', '定义行高', '定义间距'],
        0,
      ],
      ['grid-template-areas中.符号表示？', ['空网格单元', '命名区域', '自动区域', '重复区域'], 0],
      [
        '如何将元素放置在命名区域中？',
        ['grid-area: 区域名', 'grid-column: 区域名', 'grid-row: 区域名', 'area: 区域名'],
        0,
      ],
      [
        'grid-column-start属性的作用是？',
        ['设置项目起始的列线', '设置结束列线', '设置起始行线', '设置结束行线'],
        0,
      ],
      [
        'grid-column-end属性的作用是？',
        ['设置项目结束的列线', '设置起始列线', '设置起始行线', '设置结束行线'],
        0,
      ],
      [
        'grid-row-start属性的作用是？',
        ['设置项目起始的行线', '设置结束行线', '设置起始列线', '设置结束列线'],
        0,
      ],
      [
        'grid-row-end属性的作用是？',
        ['设置项目结束的行线', '设置起始行线', '设置起始列线', '设置结束列线'],
        0,
      ],
      [
        'grid-column: 1 / 3的含义是？',
        ['项目从第1列线到第3列线', '第1列到第3列', '跨3列', '第1列和第3列'],
        0,
      ],
      [
        'span关键字的作用是？',
        ['指定项目跨越的网格数量', '指定起始线', '指定结束线', '指定区域'],
        0,
      ],
      [
        'grid-column: 1 / span 2的含义是？',
        ['从第1列线开始跨越2个网格', '第1列到第2列', '跨1列', '第2列到第1列'],
        0,
      ],
      [
        'grid-area属性是哪四个属性的简写？',
        [
          'grid-row-start, grid-column-start, grid-row-end, grid-column-end',
          'grid-row, grid-column, grid-area, grid-template',
        ],
        0,
      ],
      [
        'grid-area: 1 / 1 / 3 / 3的含义是？',
        ['从行1列1到行3列3', '行1到行3', '列1到列3', '跨越2行2列'],
        0,
      ],
      [
        'justify-items属性的作用是？',
        [
          '设置所有网格项目在单元格内的水平对齐',
          '设置垂直对齐',
          '设置网格在容器内的水平对齐',
          '设置网格在容器内的垂直对齐',
        ],
        0,
      ],
      [
        'align-items属性的作用是？',
        [
          '设置所有网格项目在单元格内的垂直对齐',
          '设置水平对齐',
          '设置网格在容器内的垂直对齐',
          '设置网格在容器内的水平对齐',
        ],
        0,
      ],
      [
        'place-items属性是哪两个属性的简写？',
        [
          'align-items和justify-items',
          'align-content和justify-content',
          'align-self和justify-self',
          'grid-row和grid-column',
        ],
        0,
      ],
      [
        'justify-content属性的作用是？',
        [
          '设置整个网格在容器内的水平对齐',
          '设置项目在单元格内对齐',
          '设置垂直对齐',
          '设置网格在容器内垂直对齐',
        ],
        0,
      ],
      [
        'align-content属性的作用是？',
        [
          '设置整个网格在容器内的垂直对齐',
          '设置水平对齐',
          '设置项目在单元格内对齐',
          '设置网格在容器内水平对齐',
        ],
        0,
      ],
      [
        'place-content属性是哪两个属性的简写？',
        [
          'align-content和justify-content',
          'align-items和justify-items',
          'align-self和justify-self',
          'grid-row和grid-column',
        ],
        0,
      ],
      [
        'justify-self属性的作用是？',
        ['设置单个项目在单元格内的水平对齐', '设置垂直对齐', '设置所有项目对齐', '设置网格对齐'],
        0,
      ],
      [
        'align-self属性的作用是？',
        ['设置单个项目在单元格内的垂直对齐', '设置水平对齐', '设置所有项目对齐', '设置网格对齐'],
        0,
      ],
      [
        'place-self属性是哪两个属性的简写？',
        [
          'align-self和justify-self',
          'align-items和justify-items',
          'align-content和justify-content',
          'grid-row和grid-column',
        ],
        0,
      ],
      [
        'grid-auto-rows属性的作用是？',
        ['设置隐式创建的行轨道大小', '设置显式行大小', '设置列大小', '设置间距'],
        0,
      ],
      [
        'grid-auto-columns属性的作用是？',
        ['设置隐式创建的列轨道大小', '设置显式列大小', '设置行大小', '设置间距'],
        0,
      ],
      [
        'grid-auto-flow属性的作用是？',
        ['指定自动放置算法的方向', '指定对齐方式', '指定间距', '指定大小'],
        0,
      ],
      [
        'grid-auto-flow: row的作用是？',
        ['按行依次放置项目', '按列放置', '按区域放置', '按大小放置'],
        0,
      ],
      [
        'grid-auto-flow: column的作用是？',
        ['按列依次放置项目', '按行放置', '按区域放置', '按大小放置'],
        0,
      ],
      [
        'grid-auto-flow: dense的作用是？',
        ['使用密集填充算法避免空隙', '增加间距', '减少间距', '按顺序填充'],
        0,
      ],
      [
        '如何实现Grid的垂直居中？',
        [
          'align-items: center; justify-items: center;',
          'vertical-align: middle;',
          'margin: auto 0;',
          'line-height等于height',
        ],
        0,
      ],
      [
        '如何实现Grid的整个网格居中？',
        [
          'align-content: center; justify-content: center;',
          'align-items: center;',
          'margin: auto;',
          'text-align: center;',
        ],
        0,
      ],
      [
        'Grid中如何实现响应式布局？',
        ['repeat(auto-fill, minmax())', 'media queries', '百分比宽度', 'flex布局'],
        0,
      ],
      [
        'Grid中如何实现圣杯布局？',
        ['grid-template-areas命名区域', 'grid-template-columns', 'grid-auto-flow', 'flex布局'],
        0,
      ],
      [
        'Grid中如何实现画册布局？',
        [
          'grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))',
          'flex-wrap: wrap',
          'column-count',
          'float: left',
        ],
        0,
      ],
      [
        'Grid中如何实现重叠布局？',
        [
          '通过grid-area定位使项目重叠，z-index控制层级',
          'position: absolute',
          'margin负值',
          'transform',
        ],
        0,
      ],
      [
        'Grid布局与Flexbox的区别？',
        [
          'Grid是二维布局，Flexbox是一维布局',
          '没有区别',
          'Grid是一维，Flex是二维',
          'Grid只用于表格',
        ],
        0,
      ],
      [
        'Grid中gap与margin的区别？',
        ['gap只在轨道之间，margin在项目四周', '没有区别', 'gap性能差', 'margin更灵活'],
        0,
      ],
      [
        'Grid中如何实现粘性页脚？',
        ['grid-template-rows: 1fr auto', 'position: fixed', 'margin-top: auto', 'flex: 1'],
        0,
      ],
      [
        'Grid中如何实现侧边栏布局？',
        [
          'grid-template-columns: 200px 1fr',
          'float: left',
          'position: absolute',
          'display: inline-block',
        ],
        0,
      ],
      [
        'Grid中如何实现12列栅格系统？',
        ['grid-template-columns: repeat(12, 1fr)', 'width: 8.33%', 'flex: 1', 'column-count: 12'],
        0,
      ],
      [
        'Grid中如何实现跨列？',
        ['grid-column: span 2', 'column-span: all', 'float: left', 'width: 200%'],
        0,
      ],
      [
        'Grid中如何实现跨行？',
        ['grid-row: span 2', 'row-span: 2', 'height: 200%', 'display: block'],
        0,
      ],
      [
        'Grid中如何实现瀑布流？',
        [
          'Grid本身不支持，需配合JS或masonry属性(实验性)',
          'grid-auto-flow: dense',
          'flex-direction: column',
          'column-count',
        ],
        0,
      ],
      [
        'Grid中如何实现卡片列表？',
        [
          'grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;',
          'flex-wrap: wrap',
          'display: inline-block',
          'float: left',
        ],
        0,
      ],
      [
        'Grid中如何实现自适应列数？',
        [
          'repeat(auto-fill, minmax(200px, 1fr))',
          'column-count',
          'flex-wrap: wrap',
          'display: inline-block',
        ],
        0,
      ],
      [
        'Grid中如何实现固定列宽？',
        [
          'grid-template-columns: 200px 1fr',
          'width: 200px',
          'min-width: 200px',
          'max-width: 200px',
        ],
        0,
      ],
      [
        'Grid中如何实现等宽列？',
        [
          'grid-template-columns: repeat(3, 1fr)',
          'width: 33.33%',
          'flex: 1',
          'display: table-cell',
        ],
        0,
      ],
      [
        'Grid中如何实现等高行？',
        ['Grid默认等高', 'height: 100%', 'align-items: stretch', 'display: table-row'],
        0,
      ],
      [
        'Grid中如何实现网格线命名？',
        [
          'grid-template-columns: [line1] 1fr [line2] 2fr',
          'line-name: 1fr',
          'grid-line: 1',
          'name: line1',
        ],
        0,
      ],
      [
        'Grid中如何使用命名线定位？',
        ['grid-column: line1 / line2', 'grid-column: 1 / 2', 'grid-area: line1', 'column: line1'],
        0,
      ],
      [
        'Grid中subgrid的作用是？',
        ['子网格继承父网格的轨道定义', '创建子元素', '嵌套网格', '合并网格'],
        0,
      ],
      [
        'Grid中如何实现嵌套网格？',
        ['子元素设置display: grid', 'subgrid', 'grid-template-areas', 'position: relative'],
        0,
      ],
      [
        'Grid中如何实现表格布局？',
        [
          'grid-template-columns: repeat(4, 1fr)',
          'display: table',
          'border-collapse',
          'float: left',
        ],
        0,
      ],
      [
        'Grid中如何实现表单布局？',
        [
          'grid-template-columns: 100px 1fr; gap: 10px;',
          'display: flex',
          'display: table',
          'float: left',
        ],
        0,
      ],
      [
        'Grid中如何实现仪表盘布局？',
        [
          'grid-template-areas和grid-area配合',
          'position: absolute',
          'float: left',
          'display: inline-block',
        ],
        0,
      ],
      [
        'Grid中如何实现全屏布局？',
        [
          'grid-template-rows: auto 1fr auto; grid-template-columns: 200px 1fr;',
          'height: 100vh',
          'position: fixed',
          'margin: 0',
        ],
        0,
      ],
      [
        'Grid中如何实现分栏布局？',
        ['grid-template-columns: 1fr 1fr', 'column-count: 2', 'flex: 1', 'float: left'],
        0,
      ],
      [
        'Grid中如何实现九宫格布局？',
        [
          'grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr);',
          'width: 33.33%',
          'display: inline-block',
          'float: left',
        ],
        0,
      ],
      [
        'Grid中如何实现骰子布局？',
        [
          'grid-template-areas配合justify-self和align-self',
          'flex布局',
          'position: absolute',
          'float: left',
        ],
        0,
      ],
      [
        'Grid中如何实现日历布局？',
        [
          'grid-template-columns: repeat(7, 1fr);',
          'display: table',
          'float: left',
          'column-count: 7',
        ],
        0,
      ],
      [
        'Grid中如何实现图片墙？',
        [
          'repeat(auto-fill, minmax())配合span',
          'flex-wrap: wrap',
          'column-count',
          'display: inline-block',
        ],
        0,
      ],
      [
        'Grid中如何实现键盘布局？',
        ['grid-template-columns配合span跨列', 'flex布局', 'display: table', 'position: absolute'],
        0,
      ],
      [
        'Grid中如何实现时间轴布局？',
        ['grid-template-columns: 100px 50px 1fr', 'flex布局', 'float: left', 'position: relative'],
        0,
      ],
      [
        'Grid中如何实现标签页布局？',
        ['grid-template-rows: auto 1fr', 'flex布局', 'display: block', 'position: relative'],
        0,
      ],
      [
        'Grid中如何实现对话框布局？',
        ['place-items: center', 'position: fixed', 'margin: auto', 'text-align: center'],
        0,
      ],
      [
        'Grid中如何实现抽屉布局？',
        [
          'grid-template-columns: auto 1fr',
          'position: fixed',
          'transform: translateX',
          'margin-left: -200px',
        ],
        0,
      ],
      [
        'Grid中如何实现步骤条布局？',
        ['grid-template-columns: repeat(4, 1fr)', 'flex: 1', 'width: 25%', 'display: inline-block'],
        0,
      ],
      [
        'Grid中如何实现面包屑布局？',
        [
          'grid-template-columns: auto auto 1fr',
          'display: inline',
          'float: left',
          'text-align: left',
        ],
        0,
      ],
      [
        'Grid中如何实现分页器布局？',
        [
          'justify-content: center; gap: 8px;',
          'text-align: center',
          'margin: 0 auto',
          'display: inline-block',
        ],
        0,
      ],
      [
        'Grid中如何实现头像列表布局？',
        [
          'grid-template-columns: repeat(auto-fill, 40px); gap: 8px;',
          'display: inline-block',
          'float: left',
          'position: absolute',
        ],
        0,
      ],
      [
        'Grid中如何实现工具栏布局？',
        [
          'grid-template-columns: 1fr auto auto; gap: 8px; align-items: center;',
          'display: inline',
          'float: left',
          'text-align: left',
        ],
        0,
      ],
      [
        'Grid中如何实现列表布局？',
        [
          'grid-template-rows: auto; gap: 10px;',
          'display: block',
          'float: left',
          'position: relative',
        ],
        0,
      ],
      [
        'Grid中如何实现卡片角标布局？',
        [
          'position: absolute配合grid容器',
          'float: right',
          'margin-left: auto',
          'text-align: right',
        ],
        0,
      ],
      [
        'Grid中如何实现开关组件布局？',
        [
          'grid-template-columns: 40px 1fr; align-items: center;',
          'display: flex',
          'float: left',
          'display: inline-block',
        ],
        0,
      ],
      [
        'Grid中如何实现骨架屏布局？',
        ['grid布局配合渐变动画', 'display: none', 'opacity: 0', 'visibility: hidden'],
        0,
      ],
      [
        'Grid中如何实现响应式卡片布局？',
        [
          'repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;',
          'width: 50%',
          'float: left',
          'column-count',
        ],
        0,
      ],
      [
        'Grid中如何实现双行文本截断？',
        ['-webkit-line-clamp: 2', 'height限制', 'overflow: hidden', 'text-overflow: ellipsis'],
        0,
      ],
      [
        'Grid中如何实现文字环绕？',
        [
          'Grid不支持文字环绕，需使用float',
          'grid-template-columns',
          'grid-template-areas',
          'display: inline-block',
        ],
        0,
      ],
      [
        'Grid中如何实现居中对齐且左右定宽？',
        [
          'grid-template-columns: 200px 1fr 200px',
          'flex布局',
          'margin: 0 auto',
          'position: absolute',
        ],
        0,
      ],
      [
        'Grid中如何实现多列等高？',
        ['Grid默认等高', '设置相同height', 'min-height', 'max-height'],
        0,
      ],
      [
        'Grid中如何实现单行两端对齐？',
        ['justify-content: space-between', 'text-align: justify', 'margin: 0 auto', 'float: left'],
        0,
      ],
      [
        'Grid中如何实现垂直排列？',
        ['grid-template-rows: auto auto', 'display: block', 'float: left', 'column-count'],
        0,
      ],
      [
        'Grid中如何实现水平排列？',
        ['grid-template-columns: auto auto', 'display: inline', 'float: left', 'text-align: left'],
        0,
      ],
      [
        'Grid中如何实现自适应宽度？',
        ['grid-template-columns: 1fr', 'width: 100%', 'display: block', 'overflow: hidden'],
        0,
      ],
      [
        'Grid中如何实现固定宽度？',
        ['grid-template-columns: 200px', 'width: 200px', 'max-width: 200px', 'min-width: 200px'],
        0,
      ],
      [
        'Grid中如何实现自适应高度？',
        ['grid-template-rows: 1fr', 'height: 100%', 'display: block', 'overflow: hidden'],
        0,
      ],
      ['Grid中如何实现换行间距？', ['gap: 20px', 'margin', 'padding', 'border'], 0],
      [
        'Grid中如何实现底部固定？',
        ['grid-template-rows: 1fr auto', 'position: fixed', 'bottom: 0', 'align-self: end'],
        0,
      ],
      [
        'Grid中如何实现顶部固定？',
        ['grid-template-rows: auto 1fr', 'position: fixed', 'top: 0', 'align-self: start'],
        0,
      ],
      [
        'Grid中如何实现左右分割？',
        [
          'grid-template-columns: 1fr 1fr',
          'column-count: 2',
          'float: left',
          'display: inline-block',
        ],
        0,
      ],
      [
        'Grid中如何实现上下分割？',
        ['grid-template-rows: 1fr 1fr', 'display: block', 'row-gap', 'margin-bottom'],
        0,
      ],
      [
        'Grid中如何实现平均分配？',
        [
          'grid-template-columns: repeat(3, 1fr)',
          'width: 33.33%',
          'justify-content: space-between',
          'margin: 0 auto',
        ],
        0,
      ],
      [
        'Grid中如何实现按比例分配？',
        ['grid-template-columns: 1fr 2fr', 'width按百分比', 'max-width按比例', 'min-width按比例'],
        0,
      ],
    ];
    const item = items[(i - 301) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第五部分：CSS 定位与浮动 (401-500) ====================
  for (let i = 401; i <= 500; i++) {
    const q = { id: `css-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      ['CSS中position属性的默认值是？', ['static', 'relative', 'absolute', 'initial'], 0],
      [
        'position: relative的特点是？',
        ['相对自身原位置偏移，不脱离文档流', '相对父元素偏移', '脱离文档流', '相对浏览器窗口定位'],
        0,
      ],
      [
        'position: absolute的特点是？',
        [
          '相对最近的非static祖先元素偏移，脱离文档流',
          '相对自身偏移',
          '不脱离文档流',
          '相对浏览器窗口定位',
        ],
        0,
      ],
      [
        'position: fixed的特点是？',
        ['相对浏览器窗口定位，脱离文档流', '相对父元素定位', '相对自身定位', '不脱离文档流'],
        0,
      ],
      [
        'position: sticky的特点是？',
        ['相对定位和固定定位的混合', '绝对定位', '相对定位', '固定定位'],
        0,
      ],
      [
        'absolute定位的包含块是？',
        ['最近的非static定位的祖先元素', '父元素', 'html元素', '浏览器窗口'],
        0,
      ],
      ['fixed定位的包含块是？', ['视口', '父元素', 'html元素', '最近的定位祖先'], 0],
      ['sticky定位的包含块是？', ['最近的滚动祖先', '父元素', 'html元素', '视口'], 0],
      [
        '如何实现元素的垂直居中（已知宽高）？',
        ['absolute + 负margin', 'margin: auto', 'text-align: center', 'vertical-align: middle'],
        0,
      ],
      [
        '如何实现元素的垂直居中（未知宽高）？',
        ['absolute + transform', 'margin: auto', 'text-align: center', 'line-height'],
        0,
      ],
      [
        'absolute + margin: auto居中的条件是？',
        ['四个方向为0，元素有宽高', '只需要top和left为0', '只需要margin: auto', '不需要宽高'],
        0,
      ],
      [
        'transform: translate(-50%, -50%)是相对于什么？',
        ['元素自身的宽高', '父元素的宽高', '视口大小', '文档大小'],
        0,
      ],
      ['float属性的可用值不包括？', ['center', 'left', 'right', 'none'], 0],
      [
        'float: left的作用是？',
        ['元素向左浮动，文本环绕在右侧', '元素居左对齐', '元素固定在左侧', '元素向左移动'],
        0,
      ],
      [
        '浮动元素对文档流的影响是？',
        ['脱离文档流，但影响文本排列', '不脱离文档流', '完全不影响其他元素', '隐藏元素'],
        0,
      ],
      [
        '清除浮动的方法不包括？',
        ['float: clear', 'clearfix伪元素', 'overflow: hidden', 'clear: both'],
        0,
      ],
      [
        'clear: both的作用是？',
        ['元素两侧不允许有浮动元素', '清除所有样式', '清除内边距', '清除边框'],
        0,
      ],
      [
        'overflow: hidden清除浮动的原理是？',
        ['创建BFC包含浮动子元素', '隐藏溢出内容', '清除样式', '重置高度'],
        0,
      ],
      [
        'clearfix的实现原理是？',
        ['伪元素添加不可见块级元素清除浮动', '隐藏溢出', '创建BFC', '重置样式'],
        0,
      ],
      [
        '浮动导致的父元素高度塌陷是指？',
        ['父元素高度变为0不包含浮动子元素', '父元素高度增加', '子元素高度变为0', '父元素溢出'],
        0,
      ],
      [
        '如何实现文字环绕图片？',
        [
          '图片float: left',
          '图片position: absolute',
          '图片display: inline-block',
          '文字float: right',
        ],
        0,
      ],
      ['浮动布局的缺点是？', ['高度塌陷、布局复杂、响应式差', '性能差', '不兼容', '不支持中文'], 0],
      [
        '如何实现多列浮动布局？',
        [
          'float: left配合width百分比',
          'display: inline-block',
          'column-count',
          'position: absolute',
        ],
        0,
      ],
      ['浮动元素之间的间距如何控制？', ['margin', 'gap', 'padding', 'border'], 0],
      ['浮动元素换行的条件是？', ['当前行宽度不足', '设置clear', '设置overflow', '设置display'], 0],
      [
        '如何避免浮动元素换行？',
        [
          '父元素宽度足够或white-space: nowrap',
          'clear: none',
          'overflow: hidden',
          'display: block',
        ],
        0,
      ],
      [
        '浮动与绝对定位的区别？',
        ['浮动影响文本排列，绝对定位完全脱离', '没有区别', '浮动完全脱离', '绝对定位影响文本'],
        0,
      ],
      [
        '如何实现圣杯布局（浮动版）？',
        ['负margin配合float和position: relative', 'flex布局', 'grid布局', 'display: table'],
        0,
      ],
      [
        '如何实现双飞翼布局（浮动版）？',
        ['负margin配合float和margin', 'flex布局', 'grid布局', 'display: table'],
        0,
      ],
      ['负margin的作用是？', ['增加元素尺寸或改变位置', '减少元素尺寸', '隐藏元素', '清除浮动'], 0],
      [
        '负margin: -10px对块级元素的影响？',
        ['元素向对应方向移动10px，后续元素跟随', '元素缩小10px', '元素放大10px', '元素隐藏'],
        0,
      ],
      [
        '负margin对浮动元素的影响？',
        ['使浮动元素向对应方向移动', '使浮动元素缩小', '使浮动元素放大', '清除浮动'],
        0,
      ],
      [
        '如何使用负margin实现等高列？',
        ['大padding-bottom配合负margin-bottom', '设置相同height', 'display: table', 'flex布局'],
        0,
      ],
      [
        'z-index的作用是？',
        ['控制定位元素的堆叠顺序', '控制元素大小', '控制元素位置', '控制元素透明度'],
        0,
      ],
      ['z-index的默认值是？', ['auto', '0', '1', '-1'], 0],
      [
        'z-index只在什么情况下生效？',
        ['position不是static时', '任何情况', 'display为block时', 'float存在时'],
        0,
      ],
      [
        '层叠上下文是什么？',
        [
          '决定元素在Z轴上的渲染顺序的三维概念',
          '元素的层叠顺序',
          '元素的显示顺序',
          '元素的绘制顺序',
        ],
        0,
      ],
      [
        '如何创建层叠上下文？',
        [
          'position + z-index、opacity < 1、transform等',
          'display: block',
          'margin: auto',
          'float: left',
        ],
        0,
      ],
      [
        '层叠上下文的优先级规则是？',
        [
          '父层叠上下文 > 子层叠上下文',
          '子层叠上下文 > 父层叠上下文',
          'z-index大的总是在上',
          '后渲染的在上',
        ],
        0,
      ],
      [
        '如何解决z-index失效问题？',
        [
          '检查是否创建层叠上下文和定位属性',
          '增加z-index值',
          '使用!important',
          '设置position: absolute',
        ],
        0,
      ],
      [
        'position: sticky的兼容性如何？',
        ['现代浏览器支持，IE不支持', '所有浏览器支持', '只有Chrome支持', '只有Firefox支持'],
        0,
      ],
      [
        'sticky定位失效的原因可能是？',
        [
          '父元素overflow: hidden、未指定top/bottom、父元素高度不足',
          'z-index未设置',
          'display: block',
          'margin: auto',
        ],
        0,
      ],
      [
        '如何实现吸顶导航？',
        [
          'position: sticky; top: 0;',
          'position: fixed; top: 0;',
          'position: absolute; top: 0;',
          'margin-top: 0;',
        ],
        0,
      ],
      [
        '如何实现吸底操作栏？',
        [
          'position: sticky; bottom: 0;',
          'position: fixed; bottom: 0;',
          'position: absolute; bottom: 0;',
          'margin-bottom: 0;',
        ],
        0,
      ],
      [
        'fixed定位在移动端的问题？',
        ['软键盘弹出时定位异常、iOS滚动卡顿', '性能差', '不兼容', '无法点击'],
        0,
      ],
      [
        '如何解决移动端fixed定位问题？',
        ['使用sticky替代或调整布局结构', '增加z-index', '使用absolute', '不使用定位'],
        0,
      ],
      [
        'absolute定位如何实现全屏遮罩？',
        [
          'top:0; right:0; bottom:0; left:0;',
          'width:100%; height:100%;',
          'margin: auto;',
          'display: block;',
        ],
        0,
      ],
      [
        '如何实现元素的水平居中？',
        [
          'margin: 0 auto (块级) 或 text-align: center (内联)',
          'vertical-align: middle',
          'position: absolute',
          'float: left',
        ],
        0,
      ],
      [
        '如何实现单行文本垂直居中？',
        ['line-height等于height', 'vertical-align: middle', 'margin: auto 0', 'padding: 50% 0'],
        0,
      ],
      [
        '如何实现多行文本垂直居中？',
        [
          'display: table-cell; vertical-align: middle;',
          'line-height',
          'margin: auto',
          'text-align: center',
        ],
        0,
      ],
      [
        '如何实现绝对定位元素的水平垂直居中？',
        [
          'top: 50%; left: 50%; transform: translate(-50%, -50%);',
          'margin: auto',
          'text-align: center',
          'vertical-align: middle',
        ],
        0,
      ],
      [
        '如何实现图片垂直居中？',
        [
          'vertical-align: middle或flex/grid布局',
          'margin: auto',
          'text-align: center',
          'line-height',
        ],
        0,
      ],
      [
        '如何实现不定宽高元素垂直居中？',
        ['flex/grid布局或absolute + transform', 'margin: auto', 'line-height', 'vertical-align'],
        0,
      ],
      [
        'clip属性的作用是？',
        ['裁剪绝对定位元素的可视区域(已废弃)', '裁剪图片', '裁剪文本', '裁剪边框'],
        0,
      ],
      [
        'clip-path属性的优势是？',
        ['支持各种形状裁剪且不限于定位元素', '性能更好', '兼容性更好', '语法更简单'],
        0,
      ],
      [
        '如何使用CSS绘制三角形？',
        ['利用border透明特性', '利用clip-path', '利用transform', '利用margin'],
        0,
      ],
      [
        '如何使用CSS绘制圆形？',
        ['border-radius: 50%', 'clip-path: circle()', 'transform: rotate', 'margin: auto'],
        0,
      ],
      [
        '如何使用CSS绘制梯形？',
        ['利用3D变换或border', 'clip-path: polygon()', 'transform: skew', 'margin'],
        0,
      ],
      ['如何使用CSS绘制五边形？', ['clip-path: polygon()', 'border组合', 'transform', 'margin'], 0],
      [
        '如何使用CSS绘制箭头？',
        ['border旋转组合或clip-path', 'background-image', 'content属性', 'outline'],
        0,
      ],
      [
        '如何实现元素的阴影效果？',
        ['box-shadow', 'text-shadow', 'filter: drop-shadow()', 'outline'],
        0,
      ],
      [
        'box-shadow与filter: drop-shadow()的区别？',
        [
          'drop-shadow跟随元素形状，box-shadow是矩形',
          '没有区别',
          'box-shadow性能更好',
          'drop-shadow不支持模糊',
        ],
        0,
      ],
      [
        '如何实现内凹圆角效果？',
        ['radial-gradient或SVG', 'border-radius', 'box-shadow', 'clip-path'],
        0,
      ],
      [
        '如何实现毛玻璃效果？',
        ['backdrop-filter: blur()', 'opacity', 'filter: blur()', 'background: transparent'],
        0,
      ],
      [
        '如何实现渐变边框？',
        ['border-image或双层背景技巧', 'border-color', 'outline', 'box-shadow'],
        0,
      ],
      ['如何实现文字描边效果？', ['-webkit-text-stroke', 'text-shadow', 'border', 'outline'], 0],
      [
        '如何实现长阴影效果？',
        ['多层text-shadow或box-shadow', 'filter: drop-shadow', 'transform', 'clip-path'],
        0,
      ],
      [
        '如何实现霓虹灯效果？',
        ['多层text-shadow或box-shadow配合亮色', 'border', 'outline', 'background'],
        0,
      ],
      ['如何实现浮雕效果？', ['相对位置的亮暗双阴影', 'border', 'background', 'transform'], 0],
      [
        '如何实现倒影效果？',
        ['-webkit-box-reflect', 'transform: scaleY(-1)', 'clip-path', 'filter'],
        0,
      ],
      [
        '如何实现打字机效果？',
        ['steps()动画配合overflow和width', 'transition', 'animation-delay', 'animation-direction'],
        0,
      ],
      ['如何实现闪烁效果？', ['opacity或visibility动画', 'background', 'border', 'transform'], 0],
      [
        '如何实现抖动效果？',
        ['transform: translate微移动画', 'margin动画', 'position动画', 'left/top动画'],
        0,
      ],
      [
        '如何实现弹跳效果？',
        ['transform: translateY配合cubic-bezier', 'margin动画', 'position动画', 'height动画'],
        0,
      ],
      [
        '如何实现旋转效果？',
        ['transform: rotate动画', 'border-radius动画', 'margin动画', 'position动画'],
        0,
      ],
      [
        '如何实现缩放效果？',
        ['transform: scale动画', 'width/height动画', 'margin动画', 'position动画'],
        0,
      ],
      [
        '如何实现淡入淡出效果？',
        ['opacity动画', 'visibility动画', 'display动画', 'position动画'],
        0,
      ],
      [
        '如何实现滑动效果？',
        ['transform: translateX动画', 'left/right动画', 'margin动画', 'float动画'],
        0,
      ],
      [
        '如何实现翻转效果？',
        ['transform: rotateY配合backface-visibility', 'rotateX', 'scale', 'translate'],
        0,
      ],
      [
        '如何实现视差滚动效果？',
        [
          'background-attachment: fixed或transform3d',
          'position: sticky',
          'float: left',
          'overflow: hidden',
        ],
        0,
      ],
      [
        '如何实现无限滚动效果？',
        [
          'animation: scroll 10s linear infinite;',
          'overflow: scroll',
          'position: relative',
          'margin: auto',
        ],
        0,
      ],
      [
        '如何实现文字渐变效果？',
        [
          'background: linear-gradient配合-webkit-background-clip: text',
          'color: gradient',
          'text-shadow',
          'border-image',
        ],
        0,
      ],
      [
        '如何实现图片灰度效果？',
        ['filter: grayscale(1)', 'opacity: 0.5', 'background: gray', 'mix-blend-mode'],
        0,
      ],
      [
        '如何实现图片模糊效果？',
        ['filter: blur(5px)', 'opacity', 'background: transparent', 'visibility: hidden'],
        0,
      ],
      [
        '如何实现图片亮度调节？',
        ['filter: brightness(1.5)', 'opacity', 'background', 'mix-blend-mode'],
        0,
      ],
      [
        '如何实现图片对比度调节？',
        ['filter: contrast(2)', 'opacity', 'background', 'mix-blend-mode'],
        0,
      ],
      [
        '如何实现图片色相旋转？',
        ['filter: hue-rotate(90deg)', 'background', 'opacity', 'mix-blend-mode'],
        0,
      ],
      [
        '如何实现图片反色效果？',
        ['filter: invert(1)', 'opacity', 'background', 'mix-blend-mode'],
        0,
      ],
      [
        '如何实现图片饱和度调节？',
        ['filter: saturate(2)', 'opacity', 'background', 'mix-blend-mode'],
        0,
      ],
      [
        '如何实现图片褐色效果？',
        ['filter: sepia(1)', 'opacity', 'background', 'mix-blend-mode'],
        0,
      ],
      [
        '如何实现混合模式效果？',
        ['mix-blend-mode或background-blend-mode', 'opacity', 'filter', 'z-index'],
        0,
      ],
      [
        'mix-blend-mode的作用是？',
        ['设置元素内容与下层内容的混合模式', '设置背景混合', '设置透明度', '设置滤镜'],
        0,
      ],
      [
        'background-blend-mode的作用是？',
        ['设置元素的背景层之间的混合模式', '设置内容混合', '设置透明度', '设置滤镜'],
        0,
      ],
      ['如何实现遮罩效果？', ['mask-image', 'clip-path', 'overflow: hidden', 'z-index'], 0],
      ['mask-image的作用是？', ['根据图像的透明度显示元素', '裁剪元素', '隐藏元素', '模糊元素'], 0],
      ['如何实现形状外浮动？', ['shape-outside', 'float: left', 'clip-path', 'mask-image'], 0],
      [
        'shape-outside的作用是？',
        ['定义浮动元素的形状，使内联内容环绕', '裁剪元素', '隐藏元素', '模糊元素'],
        0,
      ],
      [
        '如何实现滚动捕捉？',
        ['scroll-snap-type', 'overflow: scroll', 'position: sticky', 'touch-action'],
        0,
      ],
      [
        'scroll-snap-type: x mandatory的作用是？',
        ['水平方向强制滚动捕捉', '垂直方向捕捉', '双向捕捉', '可选捕捉'],
        0,
      ],
      [
        'scroll-snap-align: center的作用是？',
        ['捕捉对齐方式为居中', '起始对齐', '结束对齐', '不对齐'],
        0,
      ],
      [
        '如何平滑滚动？',
        ['scroll-behavior: smooth', 'overflow: smooth', 'animation: scroll', 'transition: scroll'],
        0,
      ],
      [
        '如何自定义滚动条？',
        ['::-webkit-scrollbar系列伪元素', 'scrollbar属性', 'overflow: custom', 'border-style'],
        0,
      ],
      [
        '::-webkit-scrollbar-thumb的作用是？',
        ['设置滚动条滑块样式', '设置轨道样式', '设置按钮样式', '设置角样式'],
        0,
      ],
      [
        '如何隐藏滚动条但保持滚动功能？',
        [
          '::-webkit-scrollbar { display: none; } 或 scrollbar-width: none;',
          'overflow: hidden',
          'display: none',
          'visibility: hidden',
        ],
        0,
      ],
      [
        'overscroll-behavior的作用是？',
        ['控制滚动到边界时的行为', '控制滚动速度', '控制滚动方向', '控制滚动条样式'],
        0,
      ],
      [
        'overscroll-behavior: contain的好处是？',
        ['防止滚动链（父元素滚动传播）', '加速滚动', '禁止滚动', '自动滚动'],
        0,
      ],
      [
        '如何实现全屏布局？',
        [
          'height: 100vh 或 position: fixed全覆盖',
          'height: 100%',
          'max-height: 100%',
          'min-height: 100%',
        ],
        0,
      ],
      [
        '如何实现宽高比固定的盒子？',
        ['aspect-ratio或padding-bottom百分比', 'width: auto', 'height: auto', 'max-width: 100%'],
        0,
      ],
      [
        '如何实现背景固定效果？',
        ['background-attachment: fixed', 'position: fixed', 'position: sticky', 'overflow: hidden'],
        0,
      ],
      [
        '如何实现元素占满剩余空间？',
        ['flex: 1 或 position: absolute拉伸', 'width: 100%', 'height: 100%', 'margin: auto'],
        0,
      ],
      [
        '如何实现双飞翼布局？',
        [
          'float + 负margin 或 flex/grid',
          'position: absolute',
          'display: table',
          'display: inline-block',
        ],
        0,
      ],
      [
        '如何实现圣杯布局？',
        [
          'float + 负margin + relative 或 flex/grid',
          'position: absolute',
          'display: table',
          'display: inline-block',
        ],
        0,
      ],
      [
        '如何实现等高列布局？',
        [
          'flex/grid 或 padding-bottom + 负margin-bottom',
          'height: 100%',
          'min-height',
          'max-height',
        ],
        0,
      ],
      [
        '如何实现离屏渲染（不可见但占位）？',
        ['visibility: hidden', 'display: none', 'opacity: 0', 'position: absolute; left: -9999px;'],
        0,
      ],
      [
        '如何实现视觉隐藏（可访问）？',
        ['clip-path/clip + absolute + 零宽高', 'display: none', 'visibility: hidden', 'opacity: 0'],
        0,
      ],
    ];
    const item = items[(i - 401) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第六部分：CSS 背景与渐变 (501-600) ====================
  for (let i = 501; i <= 600; i++) {
    const q = { id: `css-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'background-color的作用是？',
        ['设置元素的背景颜色', '设置字体颜色', '设置边框颜色', '设置阴影颜色'],
        0,
      ],
      [
        'background-image的作用是？',
        ['设置元素的背景图像', '设置内容图像', '设置边框图像', '设置列表图像'],
        0,
      ],
      ['background-repeat的默认值是？', ['repeat', 'no-repeat', 'repeat-x', 'repeat-y'], 0],
      [
        'background-repeat: no-repeat的作用是？',
        ['背景图像不平铺', '水平平铺', '垂直平铺', '双向平铺'],
        0,
      ],
      [
        'background-repeat: repeat-x的作用是？',
        ['背景图像水平平铺', '垂直平铺', '不平铺', '双向平铺'],
        0,
      ],
      [
        'background-repeat: repeat-y的作用是？',
        ['背景图像垂直平铺', '水平平铺', '不平铺', '双向平铺'],
        0,
      ],
      ['background-position的默认值是？', ['0% 0%', 'center', 'top', 'left'], 0],
      [
        'background-position: center center的作用是？',
        ['背景图像居中显示', '左上角显示', '右下角显示', '顶部居中'],
        0,
      ],
      [
        'background-position支持哪些值类型？',
        ['关键字、百分比、长度值', '只有百分比', '只有长度值', '只有关键字'],
        0,
      ],
      [
        'background-position百分比的计算方式是？',
        ['(容器尺寸 - 图片尺寸) * 百分比', '容器尺寸 * 百分比', '图片尺寸 * 百分比', '固定偏移量'],
        0,
      ],
      [
        'background-attachment: scroll的作用是？',
        ['背景随元素内容滚动', '背景固定在视口', '背景不滚动', '背景继承'],
        0,
      ],
      [
        'background-attachment: fixed的作用是？',
        ['背景固定在视口不随滚动', '随内容滚动', '随元素滚动', '不显示背景'],
        0,
      ],
      [
        'background-size的作用是？',
        ['设置背景图像的尺寸', '设置元素尺寸', '设置边框尺寸', '设置字体尺寸'],
        0,
      ],
      [
        'background-size: cover的作用是？',
        ['等比缩放覆盖整个容器，可能裁剪', '等比缩放完整显示，可能留白', '固定尺寸', '原始尺寸'],
        0,
      ],
      [
        'background-size: contain的作用是？',
        ['等比缩放完整显示图像，可能留白', '覆盖容器', '固定尺寸', '原始尺寸'],
        0,
      ],
      [
        'background-size: 100% 100%的作用是？',
        ['拉伸图像填满容器，可能变形', '等比缩放', '原始尺寸', '覆盖容器'],
        0,
      ],
      [
        'background-origin的作用是？',
        ['设置背景定位的参考原点', '设置背景大小', '设置背景裁剪', '设置背景重复'],
        0,
      ],
      [
        'background-origin: padding-box的含义是？',
        ['背景从padding区域开始定位', '从border区域', '从content区域', '从margin区域'],
        0,
      ],
      [
        'background-origin: border-box的含义是？',
        ['背景从border区域开始定位', '从padding区域', '从content区域', '从margin区域'],
        0,
      ],
      [
        'background-origin: content-box的含义是？',
        ['背景从content区域开始定位', '从border区域', '从padding区域', '从margin区域'],
        0,
      ],
      [
        'background-clip的作用是？',
        ['设置背景的绘制区域', '设置背景定位', '设置背景大小', '设置背景重复'],
        0,
      ],
      [
        'background-clip: padding-box的含义是？',
        ['背景裁剪到padding区域', 'border区域', 'content区域', 'text区域'],
        0,
      ],
      [
        'background-clip: content-box的含义是？',
        ['背景裁剪到content区域', 'border区域', 'padding区域', 'text区域'],
        0,
      ],
      [
        'background-clip: text的含义是？',
        ['背景裁剪到文字区域（文字渐变效果）', 'padding区域', 'content区域', 'border区域'],
        0,
      ],
      [
        'background简写属性的顺序是？',
        [
          'color image repeat attachment position/size',
          'image color position size',
          'position color image repeat',
          'size image color repeat',
        ],
        0,
      ],
      [
        '如何设置多重背景？',
        ['使用逗号分隔多个背景层', '使用空格分隔', '使用分号分隔', '多次设置background'],
        0,
      ],
      [
        '多重背景的层叠顺序是？',
        ['第一层在最上面，最后一层在最下面', '第一层在最下面', '随机顺序', '按颜色排序'],
        0,
      ],
      [
        'linear-gradient()的作用是？',
        ['创建线性渐变', '创建径向渐变', '创建圆锥渐变', '创建重复渐变'],
        0,
      ],
      [
        'linear-gradient的第一个参数表示？',
        ['渐变的方向或角度', '渐变的颜色', '渐变的大小', '渐变的位置'],
        0,
      ],
      ['linear-gradient: to right表示？', ['渐变从左到右', '从右到左', '从上到下', '从下到上'], 0],
      [
        'linear-gradient: 45deg表示？',
        ['渐变角度为45度', '从45度开始', '到45度结束', '旋转45度'],
        0,
      ],
      [
        'linear-gradient的颜色停止点默认分布是？',
        ['均匀分布', '集中在起点', '集中在终点', '随机分布'],
        0,
      ],
      [
        '如何设置渐变的硬边缘？',
        ['设置两个相邻颜色停止点在同一位置', '增加模糊', '设置透明度', '改变角度'],
        0,
      ],
      [
        'radial-gradient()的作用是？',
        ['创建径向渐变', '创建线性渐变', '创建圆锥渐变', '创建重复渐变'],
        0,
      ],
      ['radial-gradient的形状可以是？', ['circle或ellipse', 'rectangle', 'triangle', 'polygon'], 0],
      [
        'radial-gradient: closest-side的含义是？',
        ['渐变半径从中心到最近的边', '到最远的边', '到最近的角', '到最远的角'],
        0,
      ],
      [
        'radial-gradient: farthest-corner的含义是？',
        ['渐变半径从中心到最远的角', '到最近的边', '到最远的边', '到最近的角'],
        0,
      ],
      [
        'conic-gradient()的作用是？',
        ['创建圆锥渐变（颜色围绕中心旋转）', '创建线性渐变', '创建径向渐变', '创建重复渐变'],
        0,
      ],
      ['conic-gradient常用于实现什么效果？', ['饼图、色轮', '进度条', '按钮', '阴影'], 0],
      [
        'repeating-linear-gradient()的作用是？',
        ['创建重复的线性渐变', '单次线性渐变', '径向渐变', '圆锥渐变'],
        0,
      ],
      [
        'repeating-radial-gradient()的作用是？',
        ['创建重复的径向渐变', '单次径向渐变', '线性渐变', '圆锥渐变'],
        0,
      ],
      [
        '如何实现条纹背景？',
        ['repeating-linear-gradient配合硬边缘', 'background-image', 'border', 'box-shadow'],
        0,
      ],
      [
        '如何实现网格背景？',
        ['多重linear-gradient', 'background-image', 'border', 'box-shadow'],
        0,
      ],
      [
        '如何实现棋盘背景？',
        ['多重linear-gradient配合background-size', 'background-image', 'border', 'box-shadow'],
        0,
      ],
      [
        '如何实现波点背景？',
        ['radial-gradient配合background-size', 'linear-gradient', 'border', 'box-shadow'],
        0,
      ],
      [
        '如何实现渐变边框？',
        ['border-image或双层背景技巧', 'border-color', 'outline', 'box-shadow'],
        0,
      ],
      [
        'border-image的作用是？',
        ['使用图像作为边框', '设置边框颜色', '设置边框宽度', '设置边框样式'],
        0,
      ],
      [
        'border-image-slice的作用是？',
        ['切割边框图像', '缩放边框图像', '重复边框图像', '填充边框图像'],
        0,
      ],
      [
        'border-image-repeat: stretch的作用是？',
        ['拉伸切割区域填充', '重复填充', '圆形重复', '不填充'],
        0,
      ],
      [
        'CSS Sprites的原理是？',
        [
          '将多张小图合并为一张大图通过background-position显示',
          '压缩图片',
          '转换图片格式',
          '延迟加载图片',
        ],
        0,
      ],
      ['CSS Sprites的优点是？', ['减少HTTP请求', '增加清晰度', '简化代码', '提高性能'], 0],
      [
        'CSS Sprites的缺点是？',
        ['维护成本高、内存占用可能增加', '增加请求', '降低清晰度', '代码复杂'],
        0,
      ],
      [
        '如何实现图片懒加载？',
        [
          'loading="lazy"或Intersection Observer',
          'display: none',
          'visibility: hidden',
          'opacity: 0',
        ],
        0,
      ],
      [
        'object-fit属性的作用是？',
        ['设置替换元素（如img）内容如何适应容器', '设置背景适应', '设置边框适应', '设置字体适应'],
        0,
      ],
      [
        'object-fit: cover的作用是？',
        ['等比缩放覆盖容器，可能裁剪', '完整显示可能留白', '拉伸填满', '原始大小'],
        0,
      ],
      [
        'object-fit: contain的作用是？',
        ['等比缩放完整显示，可能留白', '覆盖容器', '拉伸填满', '原始大小'],
        0,
      ],
      [
        'object-fit: fill的作用是？',
        ['拉伸填满容器，可能变形', '等比缩放', '覆盖容器', '原始大小'],
        0,
      ],
      [
        'object-position属性的作用是？',
        ['设置替换元素内容在容器中的位置', '设置背景位置', '设置边框位置', '设置字体位置'],
        0,
      ],
      [
        'image-rendering属性的作用是？',
        ['设置图像缩放算法', '设置图像大小', '设置图像位置', '设置图像透明度'],
        0,
      ],
      [
        'image-rendering: pixelated的作用是？',
        ['缩放时使用最近邻算法保持像素风格', '平滑缩放', '高画质缩放', '自动缩放'],
        0,
      ],
      [
        '如何实现响应式图片？',
        ['<picture>元素或img的srcset属性', 'width: 100%', 'max-width: 100%', 'object-fit: cover'],
        0,
      ],
      [
        'image-set()函数的作用是？',
        ['根据分辨率选择不同的背景图像', '设置多背景', '裁剪图像', '缩放图像'],
        0,
      ],
      [
        '如何实现暗黑模式下的图片变暗？',
        ['filter: brightness(0.8)或混合模式', 'opacity', 'visibility', 'display'],
        0,
      ],
      [
        '如何实现图片悬停放大效果？',
        ['transform: scale(1.1)配合overflow: hidden', 'width: 110%', 'margin: 5%', 'padding: 5%'],
        0,
      ],
      [
        '如何实现背景颜色渐变动画？',
        [
          'background-size放大配合transition',
          '直接transition gradient',
          'animation gradient',
          'hover改变颜色',
        ],
        0,
      ],
      [
        '为什么不能直接transition渐变？',
        ['浏览器无法在两个渐变状态间插值', '性能问题', '语法限制', '兼容问题'],
        0,
      ],
      [
        '如何实现背景颜色闪烁？',
        ['animation改变background-color', 'transition', 'hover', 'active'],
        0,
      ],
      [
        '如何实现磨砂玻璃效果？',
        [
          'backdrop-filter: blur(10px); background: rgba(255,255,255,0.5);',
          'opacity: 0.5',
          'filter: blur',
          'visibility: hidden',
        ],
        0,
      ],
      [
        'backdrop-filter与filter的区别？',
        [
          'backdrop-filter作用于元素背后的内容，filter作用于元素自身',
          '没有区别',
          'filter作用于背后',
          'backdrop性能更好',
        ],
        0,
      ],
      [
        '如何实现水印效果？',
        ['伪元素+pointer-events: none+repeat背景', 'background-image', 'border-image', 'outline'],
        0,
      ],
      [
        '如何实现文字内部纹理效果？',
        ['background-clip: text配合纹理背景', 'color: texture', 'text-shadow', 'border-image'],
        0,
      ],
      [
        '如何实现图片马赛克效果？',
        ['大像素的repeating-linear-gradient或canvas', 'filter: blur', 'opacity', 'visibility'],
        0,
      ],
      [
        '如何实现图片遮罩效果？',
        ['mask-image或clip-path', 'overflow: hidden', 'z-index', 'opacity'],
        0,
      ],
      [
        'mask-size的作用是？',
        ['设置遮罩图像的大小', '设置背景大小', '设置边框大小', '设置字体大小'],
        0,
      ],
      [
        'mask-repeat的作用是？',
        ['设置遮罩图像的重复方式', '设置背景重复', '设置边框重复', '设置字体重复'],
        0,
      ],
      [
        'mask-position的作用是？',
        ['设置遮罩图像的位置', '设置背景位置', '设置边框位置', '设置字体位置'],
        0,
      ],
      [
        '如何实现SVG遮罩？',
        [
          'mask-image: url(mask.svg)',
          'clip-path: url(mask.svg)',
          'filter: url(mask.svg)',
          'border-image: url(mask.svg)',
        ],
        0,
      ],
      [
        '如何实现渐变遮罩？',
        ['mask-image: linear-gradient(...)', 'background-clip', 'clip-path', 'filter'],
        0,
      ],
      [
        '如何实现图片灰度悬停变彩色？',
        ['默认grayscale(1)，hover时grayscale(0)', 'opacity变化', 'visibility变化', 'display变化'],
        0,
      ],
      [
        '如何实现图片高斯模糊？',
        ['filter: blur(5px)', 'opacity: 0.5', 'background: transparent', 'visibility: hidden'],
        0,
      ],
      [
        '如何实现背景视差效果？',
        ['background-attachment: fixed', 'position: fixed', 'position: sticky', 'overflow: hidden'],
        0,
      ],
      [
        '如何实现多背景叠加效果？',
        ['多个background-image用逗号分隔', 'z-index叠加', 'position: absolute', 'display: flex'],
        0,
      ],
      [
        '如何实现渐变文字？',
        [
          'background: linear-gradient; -webkit-background-clip: text; color: transparent;',
          'color: gradient',
          'text-shadow',
          'border-image',
        ],
        0,
      ],
      [
        '如何实现下划线动画？',
        ['伪元素width/height过渡', 'text-decoration过渡', 'border-bottom过渡', 'outline过渡'],
        0,
      ],
      [
        '如何实现背景颜色滑入效果？',
        ['伪元素transform: scaleX过渡', 'background过渡', 'color过渡', 'opacity过渡'],
        0,
      ],
      [
        '如何实现高亮文本效果？',
        ['mark标签或background: yellow', 'color: yellow', 'border: yellow', 'outline: yellow'],
        0,
      ],
      [
        '如何实现打字机下划线效果？',
        ['border-right动画', 'text-decoration动画', 'background动画', 'outline动画'],
        0,
      ],
      [
        '如何实现链接悬停效果？',
        ['伪元素transform或border-bottom过渡', 'text-decoration', 'color变化', 'font-size变化'],
        0,
      ],
      [
        '如何实现按钮按下效果？',
        [
          'active伪类transform: translateY或box-shadow变化',
          'hover效果',
          'focus效果',
          'visited效果',
        ],
        0,
      ],
      [
        '如何实现卡片悬停上浮效果？',
        [
          'hover时transform: translateY(-5px)和box-shadow增加',
          'margin-top减少',
          'position变化',
          'z-index增加',
        ],
        0,
      ],
      [
        '如何实现图片悬停遮罩效果？',
        ['伪元素opacity从0到1', 'visibility变化', 'display变化', 'z-index变化'],
        0,
      ],
      ['如何实现背景纹理效果？', ['重复的小图案背景', '大图片背景', '纯色背景', '渐变背景'], 0],
      [
        '如何实现噪点背景效果？',
        ['SVG filter或base64噪点图片', 'linear-gradient', 'radial-gradient', 'conic-gradient'],
        0,
      ],
      [
        '如何实现几何图案背景？',
        ['repeating-linear-gradient组合', '大图片', '纯色', '单次渐变'],
        0,
      ],
      [
        '如何实现动态渐变背景？',
        ['animation改变background-position或background-size', 'transition', 'hover', 'active'],
        0,
      ],
      [
        '如何实现彩虹背景？',
        ['linear-gradient多色停止点', 'radial-gradient', 'conic-gradient', '纯色'],
        0,
      ],
      [
        '如何实现极光背景效果？',
        ['多重radial-gradient配合animation', 'linear-gradient', '纯色', '图片背景'],
        0,
      ],
      [
        '如何实现星空背景效果？',
        ['radial-gradient小圆点配合animation', 'linear-gradient', '纯色', '图片背景'],
        0,
      ],
      [
        '如何实现气泡背景效果？',
        ['radial-gradient圆形配合animation', 'linear-gradient', '纯色', '图片背景'],
        0,
      ],
      [
        '如何实现波浪背景效果？',
        ['SVG或clip-path配合animation', 'linear-gradient', '纯色', '图片背景'],
        0,
      ],
      [
        '如何实现粒子背景效果？',
        ['radial-gradient多点配合animation', 'linear-gradient', '纯色', '图片背景'],
        0,
      ],
      [
        '如何实现光影背景效果？',
        ['radial-gradient移动配合animation', 'linear-gradient', '纯色', '图片背景'],
        0,
      ],
      [
        '如何实现霓虹背景效果？',
        ['box-shadow发光配合animation', 'linear-gradient', '纯色', '图片背景'],
        0,
      ],
      [
        '如何实现故障艺术效果？',
        ['clip-path或text-shadow偏移配合animation', 'linear-gradient', '纯色', '图片背景'],
        0,
      ],
      [
        '如何实现全屏视频背景？',
        ['<video>标签position: fixed或absolute', 'background-video', 'iframe', 'object'],
        0,
      ],
      [
        '如何实现背景颜色混合？',
        ['background-blend-mode', 'mix-blend-mode', 'opacity', 'filter'],
        0,
      ],
      [
        'background-blend-mode: multiply的作用是？',
        ['正片叠底，颜色相乘变暗', '滤色变亮', '叠加', '柔光'],
        0,
      ],
      [
        'background-blend-mode: screen的作用是？',
        ['滤色，颜色反转相乘再反转变亮', '正片叠底', '叠加', '柔光'],
        0,
      ],
      [
        'background-blend-mode: overlay的作用是？',
        ['叠加，暗部正片叠底亮部滤色', '正片叠底', '滤色', '差值'],
        0,
      ],
      [
        '如何实现图片着色效果？',
        ['background-blend-mode或filter', 'opacity', 'visibility', 'display'],
        0,
      ],
      [
        '如何实现图片双重曝光效果？',
        ['mix-blend-mode: screen或overlay', 'opacity', 'filter', 'clip-path'],
        0,
      ],
    ];
    const item = items[(i - 501) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第七部分：CSS 动画与过渡 (601-700) ====================
  for (let i = 601; i <= 700; i++) {
    const q = { id: `css-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'transition属性的作用是？',
        ['定义元素状态变化时的过渡效果', '定义动画关键帧', '定义变换', '定义旋转'],
        0,
      ],
      [
        'transition-property的作用是？',
        ['指定应用过渡的CSS属性', '指定过渡时间', '指定过渡延迟', '指定过渡速度曲线'],
        0,
      ],
      [
        'transition-duration的作用是？',
        ['指定过渡的持续时间', '指定过渡属性', '指定过渡延迟', '指定过渡速度曲线'],
        0,
      ],
      [
        'transition-timing-function的作用是？',
        ['指定过渡的速度曲线', '指定过渡属性', '指定过渡时间', '指定过渡延迟'],
        0,
      ],
      [
        'transition-delay的作用是？',
        ['指定过渡的延迟时间', '指定过渡属性', '指定过渡时间', '指定过渡速度曲线'],
        0,
      ],
      [
        'transition简写属性的顺序是？',
        [
          'property duration timing-function delay',
          'duration property delay timing',
          'delay duration property timing',
          'timing duration delay property',
        ],
        0,
      ],
      [
        'ease时间函数的特点是？',
        ['开始和结束慢，中间快', '匀速', '开始慢，结束快', '开始快，结束慢'],
        0,
      ],
      ['linear时间函数的特点是？', ['匀速', '开始慢结束快', '开始快结束慢', '中间快'], 0],
      ['ease-in时间函数的特点是？', ['开始慢，结束快', '匀速', '开始快结束慢', '中间快'], 0],
      ['ease-out时间函数的特点是？', ['开始快，结束慢', '匀速', '开始慢结束快', '中间快'], 0],
      [
        'ease-in-out时间函数的特点是？',
        ['开始和结束慢，中间快', '匀速', '开始慢结束快', '开始快结束慢'],
        0,
      ],
      [
        'cubic-bezier()的作用是？',
        ['自定义贝塞尔曲线时间函数', '定义颜色', '定义形状', '定义位置'],
        0,
      ],
      [
        'cubic-bezier的四个参数表示？',
        ['两个控制点的x,y坐标', '四个颜色值', '四个位置值', '四个大小值'],
        0,
      ],
      [
        'steps()时间函数的作用是？',
        ['将过渡分为离散步骤执行', '平滑过渡', '加速过渡', '减速过渡'],
        0,
      ],
      [
        'steps(5, end)的含义是？',
        ['分5步执行，在每步结束时变化', '分5步执行，在每步开始时变化', '第5步结束', '5秒后结束'],
        0,
      ],
      [
        'steps(5, start)的含义是？',
        ['分5步执行，在每步开始时变化', '分5步执行，在每步结束时变化', '第5步开始', '5秒后开始'],
        0,
      ],
      ['step-end等同于？', ['steps(1, end)', 'steps(1, start)', 'steps(end)', 'step(1)'], 0],
      ['step-start等同于？', ['steps(1, start)', 'steps(1, end)', 'steps(start)', 'step(1)'], 0],
      [
        '哪些CSS属性可以应用过渡？',
        ['数值型、颜色型、transform等可插值属性', '所有属性', '只有display', '只有position'],
        0,
      ],
      [
        'display: none可以应用过渡吗？',
        ['不可以，因为不能在display状态间插值', '可以', '部分可以', '取决于浏览器'],
        0,
      ],
      [
        '如何实现display: none的过渡效果？',
        ['使用visibility和opacity配合', '直接transition display', '使用animation', '无法实现'],
        0,
      ],
      ['animation属性的作用是？', ['定义关键帧动画', '定义过渡', '定义变换', '定义旋转'], 0],
      ['@keyframes规则的作用是？', ['定义动画的关键帧序列', '定义过渡', '定义变换', '定义旋转'], 0],
      ['@keyframes中from等同于？', ['0%', '100%', '0', 'start'], 0],
      ['@keyframes中to等同于？', ['100%', '0%', '1', 'end'], 0],
      [
        'animation-name的作用是？',
        ['指定@keyframes动画名称', '指定动画时间', '指定动画延迟', '指定动画速度'],
        0,
      ],
      [
        'animation-duration的作用是？',
        ['指定动画持续时间', '指定动画名称', '指定动画延迟', '指定动画速度'],
        0,
      ],
      [
        'animation-timing-function的作用是？',
        ['指定动画速度曲线', '指定动画名称', '指定动画时间', '指定动画延迟'],
        0,
      ],
      [
        'animation-delay的作用是？',
        ['指定动画延迟时间', '指定动画名称', '指定动画时间', '指定动画速度'],
        0,
      ],
      [
        'animation-iteration-count的作用是？',
        ['指定动画播放次数', '指定动画名称', '指定动画时间', '指定动画速度'],
        0,
      ],
      [
        'animation-iteration-count: infinite的作用是？',
        ['无限循环播放', '播放1次', '播放2次', '不播放'],
        0,
      ],
      [
        'animation-direction的作用是？',
        ['指定动画播放方向', '指定播放次数', '指定播放时间', '指定播放速度'],
        0,
      ],
      [
        'animation-direction: normal的作用是？',
        ['正常方向播放', '反向播放', '交替播放', '反向交替播放'],
        0,
      ],
      [
        'animation-direction: reverse的作用是？',
        ['反向播放', '正常播放', '交替播放', '反向交替播放'],
        0,
      ],
      [
        'animation-direction: alternate的作用是？',
        ['交替反向播放', '正常播放', '反向播放', '反向交替播放'],
        0,
      ],
      [
        'animation-direction: alternate-reverse的作用是？',
        ['反向开始交替播放', '正常播放', '反向播放', '交替播放'],
        0,
      ],
      [
        'animation-fill-mode的作用是？',
        ['指定动画执行前后的样式状态', '指定播放方向', '指定播放次数', '指定播放速度'],
        0,
      ],
      [
        'animation-fill-mode: none的作用是？',
        ['动画外样式不应用关键帧样式', '保持最后一帧', '应用第一帧', '保持当前帧'],
        0,
      ],
      [
        'animation-fill-mode: forwards的作用是？',
        ['动画结束后保持最后一帧样式', '不保持', '应用第一帧', '保持当前帧'],
        0,
      ],
      [
        'animation-fill-mode: backwards的作用是？',
        ['动画开始前应用第一帧样式', '不应用', '保持最后一帧', '保持当前帧'],
        0,
      ],
      [
        'animation-fill-mode: both的作用是？',
        ['同时应用forwards和backwards', '不应用', '只应用forwards', '只应用backwards'],
        0,
      ],
      [
        'animation-play-state的作用是？',
        ['控制动画播放或暂停', '控制播放方向', '控制播放次数', '控制播放速度'],
        0,
      ],
      [
        'animation-play-state: paused的作用是？',
        ['暂停动画', '播放动画', '结束动画', '重启动画'],
        0,
      ],
      [
        'animation简写属性的顺序是？',
        [
          'name duration timing-function delay iteration-count direction fill-mode play-state',
          'duration name delay timing',
          'delay duration name timing',
          'timing duration delay name',
        ],
        0,
      ],
      [
        '如何实现动画的暂停和继续？',
        ['切换animation-play-state: paused和running', '删除animation', '修改duration', '修改delay'],
        0,
      ],
      ['transform属性的作用是？', ['对元素进行2D或3D变换', '改变颜色', '改变大小', '改变位置'], 0],
      [
        'transform: translate(50px, 100px)的作用是？',
        ['元素向右移动50px，向下移动100px', '放大50px', '旋转50度', '倾斜50度'],
        0,
      ],
      [
        'transform: translateX(50px)的作用是？',
        ['元素水平向右移动50px', '垂直移动', '放大', '旋转'],
        0,
      ],
      [
        'transform: translateY(50px)的作用是？',
        ['元素垂直向下移动50px', '水平移动', '放大', '旋转'],
        0,
      ],
      ['transform: scale(2)的作用是？', ['元素放大2倍', '缩小2倍', '移动2倍', '旋转2度'], 0],
      ['transform: scaleX(2)的作用是？', ['元素水平放大2倍', '垂直放大', '整体放大', '旋转'], 0],
      [
        'transform: scaleY(0.5)的作用是？',
        ['元素垂直缩小到一半', '水平缩小', '整体缩小', '旋转'],
        0,
      ],
      [
        'transform: rotate(45deg)的作用是？',
        ['元素顺时针旋转45度', '逆时针旋转', '放大45度', '移动45px'],
        0,
      ],
      [
        'transform: skew(30deg, 20deg)的作用是？',
        ['元素在X轴倾斜30度，Y轴倾斜20度', '旋转', '缩放', '移动'],
        0,
      ],
      [
        'transform-origin属性的作用是？',
        ['设置变换的原点', '设置变换的角度', '设置变换的大小', '设置变换的方向'],
        0,
      ],
      ['transform-origin的默认值是？', ['50% 50% 0', '0 0 0', '100% 100%', 'left top'], 0],
      [
        'transform: matrix()的作用是？',
        ['使用6个值的矩阵进行2D变换', '3D变换', '颜色变换', '大小变换'],
        0,
      ],
      [
        'perspective属性的作用是？',
        ['设置3D变换的透视效果', '设置2D变换', '设置透明度', '设置位置'],
        0,
      ],
      [
        'perspective值越小效果如何？',
        ['透视效果越强烈（近大远小明显）', '透视效果越弱', '没有影响', '变成2D'],
        0,
      ],
      [
        'perspective-origin属性的作用是？',
        ['设置透视的消失点', '设置变换原点', '设置透明度', '设置位置'],
        0,
      ],
      [
        'transform-style: preserve-3d的作用是？',
        ['子元素保留3D位置', '子元素扁平化', '隐藏子元素', '固定子元素'],
        0,
      ],
      [
        'backface-visibility属性的作用是？',
        ['设置元素背面是否可见', '设置正面可见性', '设置透明度', '设置位置'],
        0,
      ],
      [
        'backface-visibility: hidden常用于？',
        ['3D翻转效果隐藏背面', '2D动画', '颜色变化', '大小变化'],
        0,
      ],
      [
        'transform: rotateX(45deg)的作用是？',
        ['绕X轴旋转45度', '绕Y轴旋转', '绕Z轴旋转', '2D旋转'],
        0,
      ],
      [
        'transform: rotateY(45deg)的作用是？',
        ['绕Y轴旋转45度', '绕X轴旋转', '绕Z轴旋转', '2D旋转'],
        0,
      ],
      [
        'transform: rotateZ(45deg)的作用是？',
        ['绕Z轴旋转45度（等同于2D旋转）', '绕X轴旋转', '绕Y轴旋转', '3D旋转'],
        0,
      ],
      [
        'transform: translate3d(10px, 20px, 30px)的作用是？',
        ['3D移动元素', '2D移动', '3D旋转', '3D缩放'],
        0,
      ],
      [
        'transform: translateZ(50px)的作用是？',
        ['沿Z轴移动元素（靠近观察者）', '沿X轴移动', '沿Y轴移动', '2D移动'],
        0,
      ],
      ['transform: scale3d(2, 2, 2)的作用是？', ['3D缩放元素', '2D缩放', '3D旋转', '3D移动'], 0],
      [
        'transform: rotate3d(1, 1, 0, 45deg)的作用是？',
        ['绕指定轴3D旋转', '2D旋转', '3D移动', '3D缩放'],
        0,
      ],
      [
        'will-change属性的作用是？',
        ['提示浏览器元素将要变化以优化性能', '改变元素', '隐藏元素', '移动元素'],
        0,
      ],
      [
        'will-change的常见值是？',
        [
          'transform, opacity, scroll-position',
          'color, background',
          'display, position',
          'width, height',
        ],
        0,
      ],
      [
        '过度使用will-change会导致？',
        ['内存占用增加，反而不利于性能', '性能提升', '没有影响', '代码错误'],
        0,
      ],
      [
        '如何实现CSS性能优化？',
        [
          '使用transform代替top/left、will-change、减少重排重绘',
          '增加动画',
          '增加选择器',
          '增加属性',
        ],
        0,
      ],
      [
        '如何实现硬件加速？',
        ['transform: translateZ(0)或will-change: transform', '增加内存', '增加CPU', '增加带宽'],
        0,
      ],
      [
        '硬件加速的原理是？',
        ['将元素提升到GPU合成层渲染', '增加CPU计算', '增加内存', '增加带宽'],
        0,
      ],
      [
        '如何避免动画卡顿？',
        ['使用transform和opacity、避免布局属性动画', '增加动画时间', '减少颜色', '增加大小'],
        0,
      ],
      [
        'requestAnimationFrame与CSS动画的区别？',
        ['CSS动画在合成线程执行，JS动画在主线程', '没有区别', 'JS动画性能更好', 'CSS动画更灵活'],
        0,
      ],
      [
        '如何实现页面加载动画？',
        ['animation配合@keyframes', 'transition', 'transform', 'opacity'],
        0,
      ],
      [
        '如何实现滚动触发动画？',
        ['Intersection Observer或scroll事件', 'hover', 'focus', 'active'],
        0,
      ],
      ['如何实现鼠标跟随动画？', ['mousemove事件修改CSS变量', 'hover', 'focus', 'active'], 0],
      [
        '如何实现打字机效果？',
        ['steps()动画配合width/overflow', 'transition', 'transform', 'opacity'],
        0,
      ],
      [
        '如何实现数字滚动效果？',
        ['transform: translateY配合steps()', 'transition', 'opacity', 'color'],
        0,
      ],
      [
        '如何实现进度条动画？',
        ['width或transform: scaleX动画', 'transition', 'opacity', 'color'],
        0,
      ],
      [
        '如何实现骨架屏闪烁效果？',
        ['background渐变配合animation移动', 'opacity', 'visibility', 'display'],
        0,
      ],
      [
        '如何实现手风琴动画？',
        ['max-height过渡或grid布局', 'width过渡', 'opacity过渡', 'color过渡'],
        0,
      ],
      [
        '如何实现抽屉动画？',
        ['transform: translateX过渡', 'width过渡', 'opacity过渡', 'color过渡'],
        0,
      ],
      [
        '如何实现模态框动画？',
        ['opacity和transform: scale过渡', 'width过渡', 'height过渡', 'color过渡'],
        0,
      ],
      [
        '如何实现Toast动画？',
        ['opacity和transform: translateY过渡', 'width过渡', 'height过渡', 'color过渡'],
        0,
      ],
      [
        '如何实现轮播图动画？',
        ['transform: translateX动画', 'width动画', 'height动画', 'opacity动画'],
        0,
      ],
      [
        '如何实现3D翻转动画？',
        ['transform: rotateY配合backface-visibility', 'rotateX', 'scale', 'translate'],
        0,
      ],
      [
        '如何实现卡片翻转效果？',
        ['transform-style: preserve-3d和rotateY', 'rotateX', 'scale', 'translate'],
        0,
      ],
      ['如何实现果冻效果？', ['scale弹跳cubic-bezier', 'linear', 'ease-in', 'ease-out'], 0],
      ['如何实现摇摆效果？', ['rotate来回animation', 'scale', 'translate', 'skew'], 0],
      ['如何实现脉冲效果？', ['scale交替animation', 'rotate', 'translate', 'skew'], 0],
      ['如何实现漂浮效果？', ['translateY来回animation', 'rotate', 'scale', 'skew'], 0],
      ['如何实现闪烁效果？', ['opacity交替animation', 'rotate', 'scale', 'translate'], 0],
      [
        '如何实现旋转加载动画？',
        ['rotate 360度无限循环animation', 'translate', 'scale', 'skew'],
        0,
      ],
      [
        '如何实现圆环加载动画？',
        ['border-color半透明 + rotate', 'opacity', 'scale', 'translate'],
        0,
      ],
      [
        '如何实现渐变加载动画？',
        ['background-position移动animation', 'opacity', 'scale', 'rotate'],
        0,
      ],
      [
        '如何实现路径动画？',
        ['offset-path和offset-distance', 'transform', 'position', 'margin'],
        0,
      ],
      ['offset-path属性的作用是？', ['定义元素运动的路径', '定义形状', '定义大小', '定义颜色'], 0],
      [
        'offset-distance属性的作用是？',
        ['定义元素在路径上的位置', '定义路径长度', '定义路径方向', '定义路径大小'],
        0,
      ],
      [
        '如何实现文字逐字出现动画？',
        ['animation-delay递增', 'transition-delay', 'animation-direction', 'animation-fill-mode'],
        0,
      ],
      [
        '如何实现交错动画？',
        ['nth-child配合animation-delay递增', 'transition', 'transform', 'opacity'],
        0,
      ],
      [
        '如何实现动画的链式调用？',
        ['animation-delay或AnimationEvent', 'transition', 'transform', 'opacity'],
        0,
      ],
      [
        '如何实现动画的分组控制？',
        ['CSS类名切换或CSS变量', 'animation-delay', 'animation-direction', 'animation-fill-mode'],
        0,
      ],
      [
        '如何减少动画的性能消耗？',
        ['使用transform和opacity、减少重排重绘', '增加动画时间', '减少颜色', '增加大小'],
        0,
      ],
      [
        '如何测试动画性能？',
        ['Chrome DevTools Performance面板', 'console.log', 'alert', 'document.title'],
        0,
      ],
      [
        '如何实现动画的无障碍访问？',
        ['prefers-reduced-motion媒体查询', '增加动画时间', '减少颜色', '增加大小'],
        0,
      ],
      [
        'prefers-reduced-motion: reduce的作用是？',
        ['用户希望减少动画，应简化或关闭动画', '增加动画', '反转动画', '加速动画'],
        0,
      ],
      [
        '如何实现平滑滚动？',
        ['scroll-behavior: smooth', 'overflow: smooth', 'animation: scroll', 'transition: scroll'],
        0,
      ],
      [
        '如何实现滚动进度条？',
        ['scroll事件修改CSS变量或width', 'animation', 'transition', 'transform'],
        0,
      ],
      [
        '如何实现视差滚动？',
        [
          'background-attachment: fixed或transform3d',
          'position: sticky',
          'float: left',
          'overflow: hidden',
        ],
        0,
      ],
      [
        '如何实现页面切换动画？',
        ['animation配合类名切换或View Transitions API', 'transition', 'transform', 'opacity'],
        0,
      ],
      [
        'View Transitions API的作用是？',
        ['轻松创建DOM状态间的平滑过渡动画', '定义关键帧', '定义变换', '定义旋转'],
        0,
      ],
    ];
    const item = items[(i - 601) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第八部分：CSS 响应式与媒体查询 (701-800) ====================
  for (let i = 701; i <= 800; i++) {
    const q = { id: `css-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        '响应式设计的核心原则是？',
        [
          '弹性布局、媒体查询、弹性图片',
          '固定布局、固定宽度',
          '绝对定位、固定高度',
          '表格布局、像素单位',
        ],
        0,
      ],
      [
        '媒体查询的作用是？',
        ['根据设备特性应用不同的CSS样式', '查询媒体文件', '播放媒体', '压缩媒体'],
        0,
      ],
      [
        '@media的基本语法是？',
        [
          '@media mediatype and (condition) { styles }',
          '@media: condition { styles }',
          '@media condition styles',
          '@media (condition) styles',
        ],
        0,
      ],
      ['媒体类型screen表示？', ['屏幕设备', '打印设备', '语音设备', '所有设备'], 0],
      ['媒体类型print表示？', ['打印设备', '屏幕设备', '语音设备', '所有设备'], 0],
      [
        '响应式设计的核心原则是？',
        [
          '弹性布局、媒体查询、弹性图片',
          '固定布局、固定宽度',
          '绝对定位、固定高度',
          '表格布局、像素单位',
        ],
        0,
      ],
      [
        '媒体查询的作用是？',
        ['根据设备特性应用不同的CSS样式', '查询媒体文件', '播放媒体', '压缩媒体'],
        0,
      ],
      [
        '@media的基本语法是？',
        [
          '@media mediatype and (condition) { styles }',
          '@media: condition { styles }',
          '@media condition styles',
          '@media (condition) styles',
        ],
        0,
      ],
      ['媒体类型screen表示？', ['屏幕设备', '打印设备', '语音设备', '所有设备'], 0],
      ['媒体类型print表示？', ['打印设备', '屏幕设备', '语音设备', '所有设备'], 0],
      ['媒体类型all表示？', ['所有设备', '仅屏幕', '仅打印', '仅语音'], 0],
      ['媒体类型speech表示？', ['语音设备', '屏幕设备', '打印设备', '所有设备'], 0],
      [
        'max-width: 768px的含义是？',
        ['屏幕宽度小于等于768px时应用', '大于768px', '等于768px', '不限制宽度'],
        0,
      ],
      [
        'min-width: 768px的含义是？',
        ['屏幕宽度大于等于768px时应用', '小于768px', '等于768px', '不限制宽度'],
        0,
      ],
      [
        '移动优先的设计策略是？',
        [
          '默认样式为移动端，用min-width向上扩展',
          '默认桌面端，用max-width向下',
          '只设计移动端',
          '只设计桌面端',
        ],
        0,
      ],
      [
        '桌面优先的设计策略是？',
        [
          '默认样式为桌面端，用max-width向下适配',
          '默认移动端，用min-width向上',
          '只设计桌面端',
          '只设计移动端',
        ],
        0,
      ],
      ['常见的移动端断点是？', ['768px', '1024px', '1280px', '480px'], 0],
      [
        '常见的平板断点是？',
        ['768px - 1024px', '480px - 768px', '1024px - 1280px', '1280px以上'],
        0,
      ],
      ['常见的桌面端断点是？', ['1024px以上', '768px以下', '480px以下', '768px'], 0],
      ['orientation: portrait表示？', ['竖屏', '横屏', '正方形', '任意方向'], 0],
      ['orientation: landscape表示？', ['横屏', '竖屏', '正方形', '任意方向'], 0],
      ['resolution媒体特性用于？', ['检测屏幕分辨率', '检测宽度', '检测高度', '检测方向'], 0],
      [
        '如何检测高分辨率屏幕？',
        ['min-resolution: 2dppx', 'width: 2x', 'pixel: 2', 'retina: true'],
        0,
      ],
      [
        'prefers-color-scheme: dark的作用是？',
        ['检测用户是否启用暗黑模式', '强制启用暗黑模式', '禁用暗黑模式', '设置颜色方案'],
        0,
      ],
      [
        'prefers-reduced-motion: reduce的作用是？',
        ['检测用户是否希望减少动画', '增加动画', '反转动画', '加速动画'],
        0,
      ],
      [
        'prefers-contrast: high的作用是？',
        ['检测用户是否需要高对比度', '降低对比度', '设置对比度', '反转颜色'],
        0,
      ],
      [
        '容器查询的作用是？',
        ['根据父容器尺寸应用样式', '根据视口尺寸', '根据设备类型', '根据分辨率'],
        0,
      ],
      [
        '@container规则的语法是？',
        [
          '@container name (condition) { styles }',
          '@container condition',
          '@media container',
          '@parent condition',
        ],
        0,
      ],
      [
        '如何定义容器查询的容器？',
        [
          'container-type: inline-size',
          'display: container',
          'position: container',
          'container: true',
        ],
        0,
      ],
      [
        'container-type: inline-size的作用是？',
        ['允许在行内方向进行容器查询', '块级方向', '双向', '禁止查询'],
        0,
      ],
      [
        'container-name属性的作用是？',
        ['为容器命名以便查询', '设置容器大小', '设置容器类型', '设置容器位置'],
        0,
      ],
      [
        '视口单位vw、vh在响应式中的作用是？',
        ['根据视口大小自适应', '固定大小', '根据容器大小', '根据字体大小'],
        0,
      ],
      [
        'clamp()函数的作用是？',
        ['将值限制在最小和最大范围内', '计算值', '定义变量', '调用函数'],
        0,
      ],
      [
        'clamp(1rem, 2.5vw, 2rem)的含义是？',
        ['字体大小在1rem到2rem间随视口变化', '固定2.5vw', '固定1rem', '固定2rem'],
        0,
      ],
      [
        'min()函数的作用是？',
        ['从逗号分隔的表达式中选择最小值', '设置最小宽度', '计算最小值', '查找最小元素'],
        0,
      ],
      [
        'max()函数的作用是？',
        ['从逗号分隔的表达式中选择最大值', '设置最大宽度', '计算最大值', '查找最大元素'],
        0,
      ],
      [
        '如何实现响应式图片？',
        ['<picture>元素或srcset属性', 'width: 100%', 'max-width: 100%', 'object-fit: cover'],
        0,
      ],
      [
        '<picture>元素的作用是？',
        ['根据条件加载不同图片', '显示多张图片', '裁剪图片', '缩放图片'],
        0,
      ],
      [
        'img的srcset属性的作用是？',
        ['提供不同分辨率的图片源', '设置图片路径', '设置图片大小', '设置图片格式'],
        0,
      ],
      [
        'img的sizes属性的作用是？',
        ['告诉浏览器图片在页面中的预期尺寸', '设置图片实际大小', '设置图片格式', '设置图片路径'],
        0,
      ],
      ['如何实现响应式字体？', ['clamp()或vw单位配合rem', '固定px', '固定em', '固定pt'], 0],
      ['如何实现响应式间距？', ['使用vw或clamp()', '固定px', '固定em', '固定pt'], 0],
      [
        '如何实现响应式网格？',
        ['repeat(auto-fill, minmax())', '固定列数', '固定宽度', '百分比宽度'],
        0,
      ],
      [
        '如何隐藏移动端元素？',
        ['display: none配合媒体查询', 'visibility: hidden', 'opacity: 0', 'position: absolute'],
        0,
      ],
      ['如何实现移动端导航？', ['媒体查询配合flex/grid', 'float', 'table', 'inline-block'], 0],
      [
        '移动端1px边框问题的原因是？',
        ['高分辨率屏幕下CSS像素对应多个物理像素', '浏览器bug', 'CSS不支持1px', '边框太细'],
        0,
      ],
      [
        '如何解决1px边框问题？',
        ['transform: scaleY(0.5)或viewport缩放', 'border: 0.5px', '不使用边框', '使用outline'],
        0,
      ],
      [
        'viewport meta标签的作用是？',
        ['控制移动端视口的大小和缩放', '设置编码', '引入样式', '设置标题'],
        0,
      ],
      [
        'viewport的initial-scale=1的作用是？',
        ['设置页面初始缩放比例为1', '缩放到2倍', '禁止缩放', '自动缩放'],
        0,
      ],
      [
        'viewport的user-scalable=no的作用是？',
        ['禁止用户手动缩放', '允许缩放', '强制缩放', '自动缩放'],
        0,
      ],
      [
        'viewport的width=device-width的作用是？',
        ['让视口宽度等于设备宽度', '固定宽度980px', '宽度100%', '宽度自适应'],
        0,
      ],
      [
        '如何实现响应式表格？',
        ['overflow-x: auto或改变表格布局', 'display: none', 'width: 100%', 'border-collapse'],
        0,
      ],
      [
        '如何实现响应式视频？',
        ['aspect-ratio或padding-bottom技巧', 'width: 100%', 'height: auto', 'display: block'],
        0,
      ],
      ['如何实现响应式卡片？', ['flex-wrap或grid配合minmax', 'float', 'inline-block', 'table'], 0],
      [
        '如何实现响应式背景图？',
        ['background-size: cover', 'width: 100%', 'height: 100%', 'object-fit: cover'],
        0,
      ],
      [
        '如何实现响应式SVG？',
        ['width: 100%; height: auto', '固定宽高', 'max-width', 'min-width'],
        0,
      ],
      [
        '如何实现响应式iframe？',
        ['aspect-ratio或padding-bottom', 'width: 100%', 'height: 100%', 'display: block'],
        0,
      ],
      ['如何实现响应式表单？', ['flex/grid布局配合媒体查询', 'float', 'table', 'inline-block'], 0],
      [
        '如何实现响应式模态框？',
        ['max-width配合百分比宽度', 'width: 100%', 'height: 100%', 'position: fixed'],
        0,
      ],
      [
        '如何实现响应式轮播图？',
        ['overflow: hidden配合transform', 'width: 100%', 'float', 'display: block'],
        0,
      ],
      [
        '如何实现响应式侧边栏？',
        ['媒体查询切换display或flex/grid', 'float', 'position: absolute', 'visibility'],
        0,
      ],
      ['如何实现响应式页脚？', ['grid布局或flex-wrap', 'float', 'inline-block', 'table'], 0],
      [
        '如何实现响应式列表？',
        ['flex-direction: column', 'float', 'inline-block', 'display: block'],
        0,
      ],
      [
        '如何实现响应式菜单？',
        ['媒体查询配合flex/grid', 'float', 'inline-block', 'display: block'],
        0,
      ],
      [
        '如何实现响应式按钮？',
        ['padding配合em/rem', '固定宽度', 'height: 100%', 'display: block'],
        0,
      ],
      ['如何实现响应式间距？', ['clamp()或vw', '固定px', '百分比', 'auto'], 0],
      ['如何实现响应式排版？', ['clamp()或vw配合rem', '固定px', '固定em', '固定pt'], 0],
      [
        '如何实现响应式布局的断点选择？',
        ['基于内容而非设备', '固定768px', '固定1024px', '随机选择'],
        0,
      ],
      [
        '如何实现响应式图片懒加载？',
        ['loading="lazy"配合媒体查询', 'display: none', 'visibility: hidden', 'opacity: 0'],
        0,
      ],
      [
        '如何实现响应式数据可视化？',
        ['SVG或Canvas配合resize事件', '固定大小', '图片替代', '表格'],
        0,
      ],
      [
        '如何实现响应式地图？',
        ['aspect-ratio或padding-bottom', 'width: 100%', 'height: 100%', 'display: block'],
        0,
      ],
      [
        '如何实现响应式广告？',
        ['媒体查询或容器查询', '固定大小', 'display: none', 'position: absolute'],
        0,
      ],
      [
        '如何实现响应式打印样式？',
        ['@media print', '@media screen', '@media all', 'display: none'],
        0,
      ],
      [
        '@media print中如何隐藏导航？',
        ['display: none', 'visibility: hidden', 'opacity: 0', 'position: absolute'],
        0,
      ],
      [
        '@media print中如何确保链接显示URL？',
        ['a[href]::after { content: " (" attr(href) ")"; }', '直接显示', 'title属性', 'data-url'],
        0,
      ],
      [
        '@media print中如何避免图片断裂？',
        ['page-break-inside: avoid', 'display: block', 'page-break-before', 'page-break-after'],
        0,
      ],
      [
        '@media print中如何设置页边距？',
        ['@page { margin: 2cm; }', 'margin: 2cm', 'padding: 2cm', 'border: 2cm'],
        0,
      ],
      [
        '@media print中如何强制换页？',
        ['page-break-before: always', 'page-break-inside', 'page-break-after', 'break-before'],
        0,
      ],
      [
        '如何实现横屏打印？',
        ['@page { size: landscape; }', '@media landscape', 'orientation: landscape', 'rotate: 90'],
        0,
      ],
      [
        '如何实现响应式暗黑模式？',
        ['prefers-color-scheme媒体查询', 'filter: invert', 'background: black', 'color: white'],
        0,
      ],
      [
        '如何实现响应式高对比度模式？',
        ['prefers-contrast媒体查询', 'border: bold', 'color: black', 'background: white'],
        0,
      ],
      [
        '如何实现响应式减少动画模式？',
        ['prefers-reduced-motion媒体查询', 'animation: none', 'transition: none', 'display: none'],
        0,
      ],
      [
        '如何实现响应式强制色彩模式？',
        ['forced-colors媒体查询', 'color: initial', 'background: initial', 'filter: none'],
        0,
      ],
      [
        '如何实现响应式触摸屏适配？',
        ['@media (hover: none)或pointer: coarse', 'touch: true', 'mobile: true', 'screen: touch'],
        0,
      ],
      [
        'hover: none媒体特性的作用是？',
        ['检测设备是否无法悬停（如触摸屏）', '禁止悬停', '启用悬停', '隐藏悬停效果'],
        0,
      ],
      [
        'pointer: coarse媒体特性的作用是？',
        ['检测设备主指针是否粗糙（如手指）', '检测鼠标', '检测触控笔', '检测键盘'],
        0,
      ],
      [
        'pointer: fine媒体特性的作用是？',
        ['检测设备主指针是否精细（如鼠标）', '检测手指', '检测触控笔', '检测键盘'],
        0,
      ],
      [
        'any-hover: hover媒体特性的作用是？',
        ['检测设备是否有任何输入机制能悬停', '只有主指针', '禁止悬停', '隐藏悬停'],
        0,
      ],
      [
        'any-pointer: fine媒体特性的作用是？',
        ['检测设备是否有任何精细指针', '只有主指针', '检测手指', '检测键盘'],
        0,
      ],
      [
        '如何实现响应式深色模式切换？',
        ['CSS变量配合媒体查询或JS', 'filter: invert', 'background: black', 'color: white'],
        0,
      ],
      [
        '如何实现响应式布局的优雅降级？',
        ['渐进增强策略', '只支持最新浏览器', '只支持旧浏览器', '不支持任何浏览器'],
        0,
      ],
      [
        '如何实现响应式布局的特性检测？',
        ['@supports规则', '@media feature', 'Modernizr', 'typeof check'],
        0,
      ],
      [
        '@supports规则的作用是？',
        ['检测浏览器是否支持某CSS特性', '支持某特性', '不支持某特性', '启用某特性'],
        0,
      ],
      [
        '@supports (display: grid)的含义是？',
        ['如果支持grid则应用样式', '如果不支持grid', '强制使用grid', '禁用grid'],
        0,
      ],
      [
        '@supports not (display: grid)的含义是？',
        ['如果不支持grid则应用后备样式', '支持grid', '强制使用grid', '禁用grid'],
        0,
      ],
      [
        '如何实现响应式布局的浏览器兼容？',
        ['特性检测、前缀、后备样式', '只使用最新特性', '不使用CSS3', '只支持Chrome'],
        0,
      ],
      [
        '如何实现响应式布局的性能优化？',
        ['减少重排重绘、按需加载、压缩资源', '增加样式', '增加图片', '增加脚本'],
        0,
      ],
      [
        '如何实现响应式布局的可访问性？',
        ['语义化HTML、ARIA、键盘导航', '只使用div', '只使用span', '隐藏所有内容'],
        0,
      ],
      [
        '如何实现响应式布局的SEO优化？',
        ['语义化HTML、结构化数据、性能优化', '隐藏文本', '关键词堆砌', '使用iframe'],
        0,
      ],
      [
        '如何实现响应式布局的测试？',
        ['浏览器开发者工具、真机测试、在线工具', '只看效果', '不需要测试', '只测Chrome'],
        0,
      ],
      [
        '如何实现响应式图片的艺术指导？',
        ['<picture>元素配合media属性', 'CSS裁剪', 'JS替换', 'SVG缩放'],
        0,
      ],
      [
        '如何实现响应式图片的分辨率切换？',
        ['srcset和sizes属性', 'CSS缩放', 'JS替换', 'SVG缩放'],
        0,
      ],
      [
        '如何实现响应式布局的容器查询嵌套？',
        ['container-type和container-name配合', '媒体查询嵌套', 'iframe嵌套', 'shadow DOM'],
        0,
      ],
      [
        '容器查询与媒体查询的区别？',
        [
          '容器查询基于父容器，媒体查询基于视口',
          '没有区别',
          '容器查询基于视口',
          '媒体查询基于父容器',
        ],
        0,
      ],
      ['如何实现响应式布局的流体排版？', ['clamp()或vw单位', '固定px', '固定em', '固定rem'], 0],
      [
        '如何实现响应式布局的固定比例？',
        ['aspect-ratio属性', 'padding-bottom技巧', 'width: auto', 'height: auto'],
        0,
      ],
    ];
    const item = items[(i - 701) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第九部分：CSS 预处理器与工程化 (801-900) ====================
  for (let i = 801; i <= 900; i++) {
    const q = { id: `css-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'CSS预处理器的优势是？',
        ['变量、嵌套、混入、函数', '执行更快', '不需要编译', '浏览器原生支持'],
        0,
      ],
      [
        '常见的CSS预处理器有？',
        [
          'Sass, Less, Stylus',
          'TypeScript, Babel, Webpack',
          'React, Vue, Angular',
          'Node, Express, Koa',
        ],
        0,
      ],
      ['Sass的文件扩展名是？', ['.scss或.sass', '.css', '.less', '.styl'], 0],
      [
        '.scss与.sass的区别是？',
        ['.scss使用大括号和分号，.sass使用缩进', '没有区别', '.sass使用大括号', '.scss使用缩进'],
        0,
      ],
      ['Sass中变量的前缀是？', ['$', '@', '--', '!'], 0],
      ['Less中变量的前缀是？', ['@', '$', '--', '!'], 0],
      ['Stylus中变量的前缀是？', ['无强制前缀，可用$或@', '必须$', '必须@', '必须--'], 0],
      [
        'Sass中嵌套规则的作用是？',
        ['反映HTML层级结构，减少重复选择器', '增加性能', '减少文件大小', '浏览器识别'],
        0,
      ],
      ['Sass中&符号的作用是？', ['引用父选择器', '子选择器', '兄弟选择器', '全局选择器'], 0],
      [
        'Sass中&:hover的含义是？',
        ['给父选择器添加hover伪类', '后代元素的hover', '兄弟元素的hover', '全局hover'],
        0,
      ],
      [
        'Sass中&.active的含义是？',
        ['给父选择器添加active类', '后代元素的active', '兄弟元素的active', '全局active'],
        0,
      ],
      ['Sass中@mixin的作用是？', ['定义可重用的样式块', '导入文件', '定义变量', '定义函数'], 0],
      ['Sass中@include的作用是？', ['包含（调用）mixin', '导入文件', '定义变量', '定义函数'], 0],
      [
        '如何给mixin传递参数？',
        ['@mixin name($param)', '@mixin name(param)', '@mixin name{param}', '@mixin name<param>'],
        0,
      ],
      [
        'mixin的默认参数如何设置？',
        [
          '@mixin name($param: default)',
          '@mixin name($param = default)',
          '@mixin name($param default)',
          '@mixin name[default]',
        ],
        0,
      ],
      [
        'Sass中@extend的作用是？',
        ['继承另一个选择器的样式', '扩展文件', '扩展变量', '扩展函数'],
        0,
      ],
      [
        '@extend与@mixin的区别是？',
        [
          '@extend合并选择器，@mixin复制样式',
          '没有区别',
          '@extend复制样式，@mixin合并',
          '性能不同',
        ],
        0,
      ],
      [
        'Sass中占位符选择器%的作用是？',
        ['定义只用于继承而不单独输出的样式', '占位空间', '隐藏元素', '注释'],
        0,
      ],
      ['Sass中@import的作用是？', ['导入其他Scss文件', '导入CSS文件', '导入JS文件', '导入图片'], 0],
      [
        'Sass中@use的作用是？',
        ['模块化导入，避免全局污染', '替代@extend', '使用插件', '定义变量'],
        0,
      ],
      [
        '@use与@import的区别是？',
        ['@use是模块化作用域，@import是全局', '没有区别', '@use是全局，@import是模块', '性能不同'],
        0,
      ],
      [
        'Sass中@forward的作用是？',
        ['转发模块的成员供其他文件使用', '向前兼容', '提交代码', '定义变量'],
        0,
      ],
      [
        'Sass中@function的作用是？',
        ['定义返回值的计算函数', '定义mixin', '导入文件', '定义变量'],
        0,
      ],
      ['Sass中@return的作用是？', ['在函数中返回值', '返回文件', '返回选择器', '返回mixin'], 0],
      [
        'Sass中#if的条件语句是？',
        ['@if condition', 'if (condition)', '#if condition', 'condition ? true : false'],
        0,
      ],
      [
        'Sass中@for循环的语法是？',
        [
          '@for $i from 1 through 10',
          'for ($i=1; $i<=10; $i++)',
          '@for i in 1..10',
          'loop 10 times',
        ],
        0,
      ],
      [
        'Sass中through与to的区别是？',
        ['through包含结束值，to不包含', '没有区别', 'to包含结束值', 'through不包含'],
        0,
      ],
      [
        'Sass中@each循环的语法是？',
        ['@each $item in $list', 'for each item in list', '@each $list in $item', 'loop each item'],
        0,
      ],
      [
        'Sass中@while循环的语法是？',
        ['@while condition', 'while (condition)', '@while $i < 10', 'loop while true'],
        0,
      ],
      [
        'Sass中map数据结构的定义是？',
        [
          '$map: (key: value, key2: value2)',
          '$map: [key: value]',
          '$map: {key: value}',
          '$map: key=value',
        ],
        0,
      ],
      [
        'Sass中list数据结构的定义是？',
        [
          '$list: item1 item2 item3',
          '$list: [item1, item2]',
          '$list: {item1, item2}',
          '$list: (item1, item2)',
        ],
        0,
      ],
      [
        'Sass中map-get()的作用是？',
        ['获取map中指定key的值', '设置map值', '删除map值', '遍历map'],
        0,
      ],
      [
        'Sass中内置的颜色函数有？',
        [
          'lighten, darken, mix等',
          'add, subtract, multiply',
          'red, green, blue',
          'hue, sat, light',
        ],
        0,
      ],
      ['Sass中lighten()函数的作用是？', ['使颜色变亮', '使颜色变暗', '混合颜色', '反转颜色'], 0],
      ['Sass中darken()函数的作用是？', ['使颜色变暗', '使颜色变亮', '混合颜色', '反转颜色'], 0],
      ['Sass中mix()函数的作用是？', ['混合两种颜色', '使颜色变亮', '使颜色变暗', '反转颜色'], 0],
      ['Sass中数学函数random()的作用是？', ['生成随机数', '四舍五入', '向下取整', '向上取整'], 0],
      [
        'Sass中字符串函数to-upper-case()的作用是？',
        ['将字符串转为大写', '转为小写', '计算长度', '拼接字符串'],
        0,
      ],
      ['PostCSS的作用是？', ['用JS插件转换CSS', '预处理器', 'CSS框架', 'CSS压缩工具'], 0],
      [
        'PostCSS与Sass的区别是？',
        [
          'PostCSS是插件化工具，Sass是预处理器',
          '没有区别',
          'PostCSS是预处理器，Sass是插件',
          '性能不同',
        ],
        0,
      ],
      ['Autoprefixer的作用是？', ['自动添加浏览器前缀', '压缩CSS', '合并CSS', '检查CSS'], 0],
      ['Autoprefixer的数据来源是？', ['caniuse.com', 'MDN', 'W3C', '浏览器官网'], 0],
      [
        'CSS Modules的作用是？',
        ['创建局部作用域的CSS类名', '导入CSS文件', '压缩CSS', '添加前缀'],
        0,
      ],
      [
        'CSS Modules如何实现作用域隔离？',
        ['生成唯一的类名哈希值', '使用iframe', '使用shadow DOM', '使用命名空间'],
        0,
      ],
      [
        'CSS-in-JS的优势是？',
        ['样式与组件绑定，避免冲突，动态样式', '性能最好', '浏览器原生支持', '不需要编译'],
        0,
      ],
      [
        '常见的CSS-in-JS库有？',
        [
          'styled-components, Emotion, JSS',
          'Sass, Less, Stylus',
          'React, Vue, Angular',
          'Webpack, Rollup, Vite',
        ],
        0,
      ],
      [
        'styled-components的标签模板语法是？',
        [
          'styled.div`color: red;`',
          'styled.div({color: "red"})',
          'styled.div("color: red")',
          'styled.div.color = "red"',
        ],
        0,
      ],
      [
        'Tailwind CSS属于哪种类型的工具？',
        ['实用优先的CSS框架', '预处理器', 'CSS-in-JS库', 'PostCSS插件'],
        0,
      ],
      [
        'Tailwind CSS的优势是？',
        ['快速开发、一致设计、体积可控', '性能最好', '浏览器原生支持', '不需要编译'],
        0,
      ],
      [
        'Tailwind CSS的@apply指令作用是？',
        ['提取工具类到自定义CSS中', '应用变量', '应用mixin', '应用继承'],
        0,
      ],
      [
        'Tailwind CSS如何实现暗黑模式？',
        ['dark:变体前缀', 'dark()函数', '@media dark', 'filter: invert'],
        0,
      ],
      [
        'Tailwind CSS如何实现响应式？',
        ['sm:, md:, lg:等前缀', '@media查询', 'container查询', 'min-width属性'],
        0,
      ],
      [
        'Tailwind CSS如何自定义配置？',
        ['tailwind.config.js', 'tailwind.css', 'package.json', '.env文件'],
        0,
      ],
      [
        'Tailwind CSS的JIT模式是指？',
        ['即时编译，按需生成样式', '解释执行', '预编译', '浏览器编译'],
        0,
      ],
      [
        'CSS架构方法论BEM是指？',
        [
          'Block Element Modifier',
          'Box Element Margin',
          'Block Extend Modify',
          'Base Element Module',
        ],
        0,
      ],
      ['BEM中Block的含义是？', ['独立的页面组件', 'HTML标签', 'CSS属性', 'JS变量'], 0],
      ['BEM中Element的含义是？', ['Block的组成部分', 'HTML标签', 'CSS属性', 'JS变量'], 0],
      [
        'BEM中Modifier的含义是？',
        ['Block或Element的外观状态变体', 'HTML标签', 'CSS属性', 'JS变量'],
        0,
      ],
      ['BEM命名规范中Element的分隔符是？', ['__', '--', '-', '_'], 0],
      ['BEM命名规范中Modifier的分隔符是？', ['--', '__', '-', '_'], 0],
      [
        'OOCSS的核心原则是？',
        ['结构与皮肤分离、容器与内容分离', '面向对象编程', '组件化开发', '函数式编程'],
        0,
      ],
      [
        'SMACSS的核心分类是？',
        [
          'Base, Layout, Module, State, Theme',
          'Block, Element, Modifier',
          'Base, Component, Utility',
          'Global, Local, Scoped',
        ],
        0,
      ],
      [
        'ITCSS的核心层级是？',
        [
          'Settings, Tools, Generic, Elements, Objects, Components, Trumps',
          'Base, Layout, Module',
          'Block, Element, Modifier',
          'Global, Local, Scoped',
        ],
        0,
      ],
      [
        'CSS规范的作用是？',
        ['提高可维护性、可扩展性、协作效率', '提高性能', '减少代码量', '增加功能'],
        0,
      ],
      [
        '如何组织大型项目的CSS文件？',
        ['按功能或组件分目录、使用预处理器', '全部放在一个文件', '按字母排序', '随机组织'],
        0,
      ],
      ['CSS命名空间的作用是？', ['避免样式冲突', '提高性能', '减少代码量', '增加功能'], 0],
      ['CSS linting工具的作用是？', ['检查CSS代码质量和规范', '压缩CSS', '编译CSS', '运行CSS'], 0],
      [
        '常见的CSS linter有？',
        ['Stylelint, CSSLint', 'ESLint, JSHint', 'Prettier, Beautify', 'Webpack, Rollup'],
        0,
      ],
      ['Stylelint的作用是？', ['检查CSS代码规范和错误', '压缩CSS', '编译Sass', '添加前缀'], 0],
      ['如何实现CSS的自动格式化？', ['Prettier工具', '手动格式化', 'ESLint', 'Stylelint'], 0],
      ['CSS压缩的作用是？', ['减小文件体积，加快加载速度', '提高性能', '增加功能', '规范代码'], 0],
      [
        '常见的CSS压缩工具有？',
        ['cssnano, clean-css', 'UglifyJS, Terser', 'Babel, TypeScript', 'Webpack, Rollup'],
        0,
      ],
      ['cssnano的作用是？', ['优化和压缩CSS', '编译Sass', '添加前缀', '检查规范'], 0],
      [
        '如何实现CSS的按需加载？',
        ['动态import或<link>标签动态插入', '全部加载', '内联CSS', '延迟加载'],
        0,
      ],
      ['Critical CSS的作用是？', ['提取首屏关键CSS内联加载', '压缩CSS', '编译Sass', '添加前缀'], 0],
      [
        '如何提取Critical CSS？',
        ['Critical, Penthouse等工具', '手动提取', '浏览器自动', '不需要提取'],
        0,
      ],
      [
        'CSS Source Map的作用是？',
        ['映射编译后CSS到源文件方便调试', '压缩CSS', '编译Sass', '添加前缀'],
        0,
      ],
      [
        '如何配置CSS Source Map？',
        ['构建工具中设置devtool或sourcemap选项', '浏览器设置', 'CSS文件中声明', '无法配置'],
        0,
      ],
      [
        'CSS Houdini的作用是？',
        ['暴露CSS引擎API让开发者扩展CSS', 'CSS预处理器', 'CSS框架', 'CSS压缩工具'],
        0,
      ],
      [
        'CSS Houdini的Paint API作用是？',
        ['用JS绘制CSS属性值', '绘制Canvas', '绘制SVG', '绘制HTML'],
        0,
      ],
      [
        'CSS Houdini的Typed OM作用是？',
        ['提供类型化的CSS值操作接口', '类型检查', '对象模型', '文档模型'],
        0,
      ],
      [
        'CSS Houdini的Properties API作用是？',
        ['注册自定义CSS属性并约束类型', '定义变量', '定义函数', '定义mixin'],
        0,
      ],
      [
        'CSS Houdini的Worklet作用是？',
        ['独立线程执行CSS相关JS代码', 'Web Worker', 'Service Worker', '主线程运行'],
        0,
      ],
      [
        '如何实现CSS的单元测试？',
        ['视觉回归测试或计算值断言', 'Jest测试', 'Mocha测试', '不需要测试'],
        0,
      ],
      [
        '常见的CSS视觉回归测试工具有？',
        ['BackstopJS, Percy, Chromatic', 'Jest, Mocha', 'ESLint, Stylelint', 'Webpack, Vite'],
        0,
      ],
      ['设计系统的作用是？', ['统一产品设计和开发标准', '提高性能', '减少代码量', '增加功能'], 0],
      ['设计系统通常包含？', ['设计令牌、组件库、文档', '只有CSS', '只有JS', '只有图片'], 0],
      [
        'Design Token的作用是？',
        ['存储设计和样式决策的变量', '身份验证', '接口令牌', '加密密钥'],
        0,
      ],
      [
        '如何实现Design Token？',
        ['CSS自定义属性或预处理器变量', 'JS变量', 'JSON配置', '数据库存储'],
        0,
      ],
      [
        'CSS自定义属性与预处理器变量的区别？',
        [
          '自定义属性运行时动态，预处理器变量编译时静态',
          '没有区别',
          '自定义属性静态，预处理器动态',
          '性能不同',
        ],
        0,
      ],
      [
        '如何构建跨平台的Design Token？',
        ['Style Dictionary等工具转换格式', '手动复制', '只使用CSS', '只使用JS'],
        0,
      ],
      [
        '组件库的CSS架构原则是？',
        ['高内聚低耦合、可定制、可扩展', '全部全局', '全部内联', '不可修改'],
        0,
      ],
      [
        '如何实现组件库的样式定制？',
        ['CSS变量、主题覆盖、BEM Modifier', '修改源码', '使用!important', '无法定制'],
        0,
      ],
      [
        '如何实现组件库的暗黑模式？',
        [
          'CSS变量切换或prefers-color-scheme',
          'filter: invert',
          'background: black',
          'color: white',
        ],
        0,
      ],
      [
        '如何实现组件库的国际化样式？',
        ['RTL布局适配、字体大小调整', '翻译文本', '修改颜色', '更换图片'],
        0,
      ],
      [
        'CSS中的RTL适配属性是？',
        ['direction: rtl', 'text-align: right', 'float: right', 'position: right'],
        0,
      ],
      [
        'CSS逻辑属性margin-block-start的作用是？',
        ['设置块级方向起始边距', '设置上边距', '设置下边距', '设置左边距'],
        0,
      ],
      [
        'CSS逻辑属性inline-size的作用是？',
        ['设置行内方向尺寸', '设置宽度', '设置高度', '设置外边距'],
        0,
      ],
      ['CSS逻辑属性的优势是？', ['自动适配不同书写方向', '性能更好', '兼容性更好', '代码更少'], 0],
      [
        '如何管理CSS的依赖关系？',
        ['模块化导入、依赖图分析', '全局引入', '内联样式', '随机加载'],
        0,
      ],
      [
        'CSS中的Dead Code Elimination是指？',
        ['移除未使用的CSS代码', '删除注释', '删除空格', '删除变量'],
        0,
      ],
      [
        '如何检测未使用的CSS？',
        ['Chrome DevTools Coverage或PurgeCSS', '手动检查', 'ESLint', 'Stylelint'],
        0,
      ],
      ['PurgeCSS的作用是？', ['移除未使用的CSS', '压缩CSS', '编译Sass', '添加前缀'], 0],
      [
        'PurgeCSS的工作原理是？',
        ['分析HTML和JS中使用的类名，移除未匹配的CSS', '随机删除', '删除所有', '压缩代码'],
        0,
      ],
      [
        '如何实现CSS的版本管理？',
        ['语义化版本控制、Changelog', '覆盖更新', '不记录版本', '随意修改'],
        0,
      ],
    ];
    const item = items[(i - 801) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第十部分：CSS 新特性与进阶 (901-1000) ====================
  for (let i = 901; i <= 1000; i++) {
    const q = { id: `css-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'CSS新特性:is()伪类的作用是？',
        ['简化多重选择器，接受可容错选择器列表', '排除选择器', '选择子元素', '选择兄弟元素'],
        0,
      ],
      [
        ':is()伪类的优先级如何计算？',
        ['取参数列表中优先级最高的选择器', '优先级为0', '优先级为1', '不参与计算'],
        0,
      ],
      [
        ':where()伪类与:is()的区别是？',
        [':where()的优先级始终为0', '没有区别', ':where()优先级更高', ':is()优先级为0'],
        0,
      ],
      [
        ':has()伪类的作用是？',
        ['选择包含指定子元素的父元素', '选择子元素', '选择兄弟元素', '选择后代元素'],
        0,
      ],
      [':has()伪类常被称为？', ['父选择器', '子选择器', '兄弟选择器', '祖先选择器'], 0],
      [
        '如何用:has()选择包含img的a标签？',
        ['a:has(img)', 'a > img', 'a:contains(img)', 'a + img'],
        0,
      ],
      [':lang()伪类的作用是？', ['根据元素的语言匹配样式', '设置语言', '翻译文本', '改变字体'], 0],
      [':dir()伪类的作用是？', ['根据文本方向匹配元素', '设置方向', '改变方向', '镜像元素'], 0],
      [':dir(ltr)匹配什么？', ['从左到右的文本方向', '从右到左', '垂直方向', '任意方向'], 0],
      [':dir(rtl)匹配什么？', ['从右到左的文本方向', '从左到右', '垂直方向', '任意方向'], 0],
      [
        'CSS Nesting原生嵌套的作用是？',
        ['直接在CSS中实现选择器嵌套', '增加性能', '减少代码量', '浏览器兼容'],
        0,
      ],
      ['CSS原生嵌套中&符号的作用是？', ['引用父选择器', '子选择器', '兄弟选择器', '全局选择器'], 0],
      [
        'CSS原生嵌套的语法是？',
        ['选择器后直接跟嵌套块', '使用@nest规则', '使用大括号嵌套', '使用缩进嵌套'],
        0,
      ],
      [
        '@layer规则的作用是？',
        ['定义样式层的优先级顺序', '定义动画层', '定义布局层', '定义图层'],
        0,
      ],
      [
        '@layer如何解决样式优先级问题？',
        ['通过层顺序控制，后声明的层优先级更高', '提高权重', '使用!important', '无法解决'],
        0,
      ],
      [
        '@layer的语法是？',
        ['@layer name { styles }', '@layer (name) { styles }', '#layer name', 'layer: name'],
        0,
      ],
      [
        '如何声明一个空的@layer？',
        ['@layer name;', '@layer name {}', '@layer (name)', 'layer: name'],
        0,
      ],
      [
        '多个@layer的优先级顺序是？',
        ['按照声明顺序，后面的层优先级更高', '前面的高', '随机顺序', '按字母顺序'],
        0,
      ],
      [
        '未分层的样式与@layer的优先级？',
        ['未分层样式始终覆盖分层样式', '分层样式覆盖未分层', '按声明顺序', '随机覆盖'],
        0,
      ],
      [
        '@layer中!important的优先级规则？',
        ['!important在@layer中优先级反转，先声明的层更高', '不变', '都最高', '都最低'],
        0,
      ],
      [
        '@container规则的作用是？',
        ['根据父容器尺寸应用样式', '根据视口尺寸', '根据设备类型', '根据分辨率'],
        0,
      ],
      [
        'container-type属性的作用是？',
        ['定义容器的查询类型', '定义容器大小', '定义容器位置', '定义容器名称'],
        0,
      ],
      [
        'container-type: size的含义是？',
        ['容器可在宽高两个方向查询', '只能查宽度', '只能查高度', '不能查询'],
        0,
      ],
      [
        'container-type: inline-size的含义是？',
        ['容器只能在行内方向查询', '块级方向', '双向', '不能查询'],
        0,
      ],
      [
        'container-name属性的作用是？',
        ['为容器命名以便@container查询', '设置容器大小', '设置容器类型', '设置容器位置'],
        0,
      ],
      [
        '@container的语法是？',
        [
          '@container name (condition) { styles }',
          '@container condition',
          '@media container',
          '@parent condition',
        ],
        0,
      ],
      [
        '@container中的min-width条件是？',
        ['容器宽度大于等于指定值', '小于等于', '等于', '不等于'],
        0,
      ],
      [
        'CSS逻辑属性的作用是？',
        ['自动适配不同的书写模式方向', '提高性能', '减少代码量', '增加功能'],
        0,
      ],
      [
        'margin-block的逻辑方向是？',
        ['垂直方向（上下）', '水平方向（左右）', '对角线', '任意方向'],
        0,
      ],
      [
        'margin-inline的逻辑方向是？',
        ['水平方向（左右）', '垂直方向（上下）', '对角线', '任意方向'],
        0,
      ],
      [
        'padding-block-start对应物理属性是？',
        ['padding-top (在LTR/RTL中)', 'padding-bottom', 'padding-left', 'padding-right'],
        0,
      ],
      [
        'inline-size对应物理属性是？',
        ['width (在LTR/RTL中)', 'height', 'min-width', 'max-width'],
        0,
      ],
      [
        'block-size对应物理属性是？',
        ['height (在LTR/RTL中)', 'width', 'min-height', 'max-height'],
        0,
      ],
      ['border-inline对应物理属性是？', ['左右边框', '上下边框', '四个边框', '对角边框'], 0],
      [
        'inset属性的作用是？',
        ['简写top/right/bottom/left', '设置内边距', '设置外边距', '设置阴影'],
        0,
      ],
      [
        'inset-block属性的作用是？',
        ['简写垂直方向偏移', '水平方向偏移', '对角偏移', '任意偏移'],
        0,
      ],
      [
        'inset-inline属性的作用是？',
        ['简写水平方向偏移', '垂直方向偏移', '对角偏移', '任意偏移'],
        0,
      ],
      [
        'CSS颜色函数rgb()的新语法是？',
        ['rgb(r g b / alpha)', 'rgb(r, g, b, alpha)', 'rgba(r, g, b, alpha)', 'rgb(r g b, alpha)'],
        0,
      ],
      [
        'CSS颜色函数hsl()的新语法是？',
        ['hsl(h s l / alpha)', 'hsl(h, s, l, alpha)', 'hsla(h, s, l, alpha)', 'hsl(h s l, alpha)'],
        0,
      ],
      [
        'hwb()颜色函数的作用是？',
        ['使用色相、白度、黑度定义颜色', '色相、饱和度、亮度', '红绿蓝', '透明度'],
        0,
      ],
      [
        'lab()颜色函数的作用是？',
        ['基于CIE L*a*b*定义颜色', '实验室颜色', '标签颜色', '线性颜色'],
        0,
      ],
      ['lch()颜色函数的作用是？', ['基于CIE LCH定义颜色', '液晶颜色', '标签颜色', '线性颜色'], 0],
      [
        'color()函数的作用是？',
        ['在指定颜色空间中定义颜色', '获取颜色', '转换颜色', '混合颜色'],
        0,
      ],
      [
        'color-mix()函数的作用是？',
        ['在指定颜色空间中混合两种颜色', '混合三色', '提取颜色', '反转颜色'],
        0,
      ],
      [
        'color-contrast()函数的作用是？',
        ['从列表中选择与背景对比度最高的颜色', '计算对比度', '设置对比度', '反转颜色'],
        0,
      ],
      [
        'oklch()颜色函数的优势是？',
        ['视觉均匀的颜色空间，比hsl更直观', '性能更好', '兼容性更好', '语法更简单'],
        0,
      ],
      [
        'CSS中currentColor关键字的作用是？',
        ['继承当前的color属性值', '设置为黑色', '设置为透明', '设置为红色'],
        0,
      ],
      [
        'accent-color属性的作用是？',
        ['设置表单控件的主题色', '设置强调色', '设置背景色', '设置边框色'],
        0,
      ],
      [
        'aspect-ratio属性的作用是？',
        ['设置盒子的宽高比', '设置宽度', '设置高度', '设置缩放比例'],
        0,
      ],
      [
        'aspect-ratio: 16 / 9的含义是？',
        ['宽高比为16:9', '宽度16px高度9px', '16倍宽9倍高', '16列9行'],
        0,
      ],
      [
        'content-visibility属性的作用是？',
        ['跳过屏幕外内容的渲染提升性能', '设置内容可见性', '隐藏内容', '删除内容'],
        0,
      ],
      [
        'content-visibility: auto的好处是？',
        ['浏览器自动跳过屏幕外渲染', '自动显示', '自动隐藏', '自动删除'],
        0,
      ],
      [
        'contain-intrinsic-size属性的作用是？',
        ['为受contain影响的元素提供预估尺寸', '设置固有尺寸', '设置最大尺寸', '设置最小尺寸'],
        0,
      ],
      [
        'scroll-snap-type属性的作用是？',
        ['定义滚动捕捉的类型和方向', '设置滚动条', '设置滚动速度', '设置滚动方向'],
        0,
      ],
      [
        'scroll-snap-type: x mandatory的含义是？',
        ['水平方向强制捕捉', '垂直方向捕捉', '双向捕捉', '可选捕捉'],
        0,
      ],
      [
        'scroll-snap-type: y proximity的含义是？',
        ['垂直方向接近时捕捉', '水平方向捕捉', '强制捕捉', '双向捕捉'],
        0,
      ],
      [
        'scroll-snap-align属性的作用是？',
        ['定义捕捉对齐方式', '定义捕捉类型', '定义捕捉方向', '定义捕捉距离'],
        0,
      ],
      [
        'scroll-snap-align: center的含义是？',
        ['元素中心对齐捕捉点', '起始对齐', '结束对齐', '不对齐'],
        0,
      ],
      [
        'scroll-snap-stop属性的作用是？',
        ['防止滚动时跳过捕捉点', '停止滚动', '开始捕捉', '取消捕捉'],
        0,
      ],
      [
        'scroll-margin属性的作用是？',
        ['定义滚动捕捉的偏移边距', '设置外边距', '设置内边距', '设置边框'],
        0,
      ],
      [
        'scroll-padding属性的作用是？',
        ['定义滚动容器的内偏移', '设置外边距', '设置内边距', '设置边框'],
        0,
      ],
      [
        'overscroll-behavior属性的作用是？',
        ['控制滚动到边界时的行为', '控制滚动速度', '控制滚动方向', '控制滚动条'],
        0,
      ],
      [
        'overscroll-behavior: contain的含义是？',
        ['阻止滚动链传播', '包含滚动', '禁止滚动', '自动滚动'],
        0,
      ],
      [
        'overscroll-behavior: none的含义是？',
        ['禁止边界过度效果和滚动链', '无滚动', '默认滚动', '自动滚动'],
        0,
      ],
      ['scroll-behavior: smooth的作用是？', ['平滑滚动', '瞬间滚动', '禁止滚动', '自动滚动'], 0],
      [
        '@scroll-timeline规则的作用是？',
        ['定义基于滚动的动画时间线', '定义关键帧', '定义过渡', '定义变换'],
        0,
      ],
      [
        'animation-timeline: scroll()的作用是？',
        ['将动画绑定到滚动进度', '定义时间', '定义速度', '定义方向'],
        0,
      ],
      [
        'scroll-timeline-name属性的作用是？',
        ['命名滚动时间线', '定义时间', '定义速度', '定义方向'],
        0,
      ],
      [
        'scroll-timeline-axis属性的作用是？',
        ['指定滚动时间线的轴', '定义名称', '定义时间', '定义速度'],
        0,
      ],
      [
        'View Transitions API的作用是？',
        ['创建DOM状态间的平滑过渡动画', '定义关键帧', '定义变换', '定义旋转'],
        0,
      ],
      [
        'document.startViewTransition()的作用是？',
        ['启动视图过渡动画', '开始渲染', '开始滚动', '开始加载'],
        0,
      ],
      [
        '::view-transition伪元素的作用是？',
        ['视图过渡的根容器', '旧状态', '新状态', '过渡动画'],
        0,
      ],
      [
        '::view-transition-old()伪元素的作用是？',
        ['代表过渡的旧视图状态', '新状态', '根容器', '动画'],
        0,
      ],
      [
        '::view-transition-new()伪元素的作用是？',
        ['代表过渡的新视图状态', '旧状态', '根容器', '动画'],
        0,
      ],
      [
        '::view-transition-image-pair()的作用是？',
        ['包含新旧视图的容器', '旧视图', '新视图', '动画'],
        0,
      ],
      [
        '::view-transition-group()的作用是？',
        ['为特定元素创建独立的过渡组', '整体过渡', '背景过渡', '前景过渡'],
        0,
      ],
      [
        'view-transition-name属性的作用是？',
        ['为元素分配唯一的过渡名称', '设置名称', '设置类型', '设置位置'],
        0,
      ],
      [
        '如何实现页面切换动画？',
        ['View Transitions API配合类名切换', 'transition', 'transform', 'opacity'],
        0,
      ],
      [
        '如何实现元素位置变化的过渡动画？',
        ['view-transition-name配合API', 'position过渡', 'margin过渡', 'left过渡'],
        0,
      ],
      [
        'CSS Subgrid的作用是？',
        ['子网格继承父网格的轨道定义', '创建子元素', '嵌套网格', '合并网格'],
        0,
      ],
      [
        'grid-template-columns: subgrid的含义是？',
        ['子元素继承父元素的列定义', '创建子列', '嵌套列', '合并列'],
        0,
      ],
      [
        'Subgrid解决了什么问题？',
        ['子网格与父网格轨道对齐', '性能问题', '兼容问题', '语法问题'],
        0,
      ],
      [
        'text-wrap: balance的作用是？',
        ['平衡多行文本的行宽', '禁止换行', '强制换行', '居中对齐'],
        0,
      ],
      [
        'text-wrap: pretty的作用是？',
        ['优化排版避免末尾孤词', '美化字体', '添加装饰', '设置颜色'],
        0,
      ],
      ['hyphens属性的作用是？', ['控制单词断字行为', '设置连字符', '设置字间距', '设置行高'], 0],
      ['hyphens: auto的含义是？', ['浏览器自动断字', '不断字', '手动断字', '隐藏连字符'], 0],
      [
        'text-decoration-thickness属性的作用是？',
        ['设置文本装饰线厚度', '设置颜色', '设置样式', '设置偏移'],
        0,
      ],
      [
        'text-underline-offset属性的作用是？',
        ['设置下划线偏移距离', '设置厚度', '设置颜色', '设置样式'],
        0,
      ],
      [
        'font-display属性的作用是？',
        ['控制字体加载期间的显示行为', '设置字体大小', '设置字体颜色', '设置字体样式'],
        0,
      ],
      [
        'font-display: swap的行为是？',
        ['先显示后备字体，加载完后替换', '一直等待', '不显示', '隐藏文本'],
        0,
      ],
      [
        '@font-face中unicode-range的作用是？',
        ['指定字体适用的Unicode范围', '设置编码', '设置大小', '设置样式'],
        0,
      ],
      [
        'unicode-range的好处是？',
        ['按需加载字体子集减小体积', '增加字符', '减少字符', '改变编码'],
        0,
      ],
      [
        'CSS中size-adjust属性的作用是？',
        ['调整字体的整体尺寸比例', '调整大小', '调整间距', '调整粗细'],
        0,
      ],
      [
        'ascent-override属性的作用是？',
        ['覆盖字体的上升度量', '覆盖下降', '覆盖行高', '覆盖间距'],
        0,
      ],
      [
        'descent-override属性的作用是？',
        ['覆盖字体的下降度量', '覆盖上升', '覆盖行高', '覆盖间距'],
        0,
      ],
      [
        'line-gap-override属性的作用是？',
        ['覆盖字体的行间距度量', '覆盖上升', '覆盖下降', '覆盖大小'],
        0,
      ],
      [
        'CSS中math-style属性的作用是？',
        ['控制数学公式的显示样式', '设置数学字体', '设置数学颜色', '设置数学大小'],
        0,
      ],
      [
        'CSS中math-depth属性的作用是？',
        ['控制数学公式的嵌套深度缩放', '设置深度', '设置颜色', '设置大小'],
        0,
      ],
      [
        'CSS中math-shift属性的作用是？',
        ['控制数学公式的上标移位', '设置移位', '设置颜色', '设置大小'],
        0,
      ],
      [
        '@property规则的作用是？',
        ['注册自定义CSS属性并约束类型', '定义变量', '定义函数', '定义mixin'],
        0,
      ],
      [
        '@property中syntax描述符的作用是？',
        ['定义自定义属性的值类型', '定义语法', '定义名称', '定义初始值'],
        0,
      ],
      [
        '@property中initial-value描述符的作用是？',
        ['定义自定义属性的初始值', '定义类型', '定义名称', '定义语法'],
        0,
      ],
      [
        '@property中inherits描述符的作用是？',
        ['定义自定义属性是否继承', '定义类型', '定义名称', '定义初始值'],
        0,
      ],
      [
        '如何用@property实现渐变动画？',
        ['注册颜色类型的自定义属性并动画', '直接animation', 'transition', 'transform'],
        0,
      ],
      [
        'CSS中image-set()函数的作用是？',
        ['根据分辨率选择不同的背景图像', '设置多背景', '裁剪图像', '缩放图像'],
        0,
      ],
      [
        'CSS中cross-fade()函数的作用是？',
        ['在两张图像之间创建淡入淡出混合', '交叉渐变', '裁剪图像', '缩放图像'],
        0,
      ],
      [
        'CSS中element()函数的作用是？',
        ['将DOM元素作为背景图像使用', '获取元素', '创建元素', '删除元素'],
        0,
      ],
      [
        'CSS中paint()函数的作用是？',
        ['使用Paint Worklet绘制背景', '绘制Canvas', '绘制SVG', '绘制HTML'],
        0,
      ],
      [
        'CSS中env()函数的作用是？',
        ['访问用户代理定义的环境变量', '获取环境', '设置环境', '删除环境'],
        0,
      ],
      [
        'env(safe-area-inset-top)的作用是？',
        ['获取顶部安全区域距离', '顶部内边距', '顶部外边距', '顶部边框'],
        0,
      ],
      [
        '如何适配iPhone的刘海屏？',
        ['env(safe-area-inset-*)配合viewport-fit', '增加margin', '增加padding', '减小宽度'],
        0,
      ],
      [
        'viewport-fit: cover的作用是？',
        ['让视口覆盖整个屏幕（包含刘海区域）', '包含视口', '排除刘海', '固定视口'],
        0,
      ],
      [
        'CSS中min()、max()、clamp()属于什么函数？',
        ['数学比较函数', '颜色函数', '图像函数', '变换函数'],
        0,
      ],
      ['CSS中calc()支持哪些运算？', ['加减乘除', '只有加减', '只有乘除', '只有加法'], 0],
      [
        'CSS中calc()的运算规则是？',
        ['运算符两边必须有空格（加减法）', '不需要空格', '必须换行', '必须用括号'],
        0,
      ],
      [
        'CSS中var()的自定义属性默认值语法是？',
        [
          'var(--name, default)',
          'var(--name: default)',
          'var(--name; default)',
          'var(--name default)',
        ],
        0,
      ],
    ];
    const item = items[(i - 901) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  return questions;
}

// 生成题目并保存到文件
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const questions = generateQuestions();
const outputPath = join(__dirname, 'css_questions.json');
fs.writeFileSync(outputPath, JSON.stringify(questions, null, 2));
console.log(`已生成 ${questions.length} 道CSS题目，保存到 ${outputPath}`);
