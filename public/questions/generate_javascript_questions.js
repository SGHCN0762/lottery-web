// 生成JavaScript 1000条题目的脚本
import fs from 'fs';
import path from 'path';

// 题目模板生成函数
function generateQuestions() {
  const questions = [];

  // ==================== 第一部分：基础语法与数据类型 (1-120) ====================
  for (let i = 1; i <= 120; i++) {
    const q = { id: `js-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      ['JavaScript中typeof null的结果是？', ['"null"', '"object"', '"undefined"', '"boolean"'], 1],
      ['JavaScript中以下哪个不是基本数据类型？', ['Symbol', 'BigInt', 'Object', 'undefined'], 2],
      ['JavaScript中NaN === NaN的结果是？', ['true', 'false', 'TypeError', 'undefined'], 1],
      ['JavaScript中isNaN("hello")的结果是？', ['true', 'false', 'TypeError', 'NaN'], 0],
      ['JavaScript中Number.isNaN("hello")的结果是？', ['true', 'false', 'TypeError', 'NaN'], 1],
      ['JavaScript中0.1 + 0.2 === 0.3的结果是？', ['true', 'false', 'TypeError', 'NaN'], 1],
      [
        'JavaScript中判断一个变量是否是数组的方法是？',
        ['typeof', 'instanceof', 'isArray()', 'Object.prototype.toString.call()'],
        2,
      ],
      ['JavaScript中void 0的值是？', ['0', 'undefined', 'null', 'NaN'], 1],
      ['JavaScript中以下哪个关键字用于声明常量？', ['var', 'let', 'const', 'static'], 2],
      [
        'JavaScript中let和var的区别是？',
        ['let有块级作用域，var没有', 'var有块级作用域，let没有', '没有区别', 'let可以重复声明'],
        0,
      ],
      [
        'JavaScript中const声明的对象可以修改属性吗？',
        ['可以', '不可以', '取决于严格模式', '取决于对象类型'],
        0,
      ],
      [
        'JavaScript中暂时性死区(TDZ)存在于哪个声明中？',
        ['var', 'let/const', 'function', 'class'],
        1,
      ],
      [
        'JavaScript中==和===的区别是？',
        ['==比较值，===比较值和类型', '===比较值，==比较值和类型', '没有区别', '取决于操作数'],
        0,
      ],
      ['JavaScript中null == undefined的结果是？', ['true', 'false', 'TypeError', 'NaN'], 0],
      ['JavaScript中null === undefined的结果是？', ['true', 'false', 'TypeError', 'NaN'], 1],
      ['JavaScript中+true的结果是？', ['1', '0', '"true"', 'NaN'], 0],
      ['JavaScript中+""的结果是？', ['0', '""', 'NaN', 'undefined'], 0],
      ['JavaScript中!"hello"的结果是？', ['true', 'false', '"hello"', 'TypeError'], 1],
      ['JavaScript中!!"hello"的结果是？', ['true', 'false', '"hello"', 'TypeError'], 0],
      ['JavaScript中1 + "2"的结果是？', ['3', '"12"', 'NaN', 'TypeError'], 1],
      ['JavaScript中"2" - 1的结果是？', ['1', '"21"', 'NaN', 'TypeError'], 0],
      ['JavaScript中true + true的结果是？', ['2', 'true', '"truetrue"', 'NaN'], 0],
      ['JavaScript中[] == ![]的结果是？', ['true', 'false', 'TypeError', 'NaN'], 0],
      ['JavaScript中[] == false的结果是？', ['true', 'false', 'TypeError', 'NaN'], 0],
      ['JavaScript中{} + []的结果是？', ['0', '"[object Object]"', 'NaN', 'undefined'], 0],
      ['JavaScript中[] + {}的结果是？', ['0', '"[object Object]"', 'NaN', 'undefined'], 1],
      [
        'JavaScript中typeof typeof 1的结果是？',
        ['"number"', '"string"', '"object"', '"undefined"'],
        1,
      ],
      ['JavaScript中以下哪个是逻辑与操作符？', ['&&', '||', '!', '&'], 0],
      ['JavaScript中以下哪个是空值合并操作符？', ['??', '||', '?.', '&&'], 0],
      ['JavaScript中以下哪个是可选链操作符？', ['??', '||', '?.', '&&'], 2],
      [
        'JavaScript中??和||的区别是？',
        [
          '??只对null/undefined生效，||对所有falsy值生效',
          '没有区别',
          '??对所有falsy值生效，||只对null/undefined生效',
          '取决于环境',
        ],
        0,
      ],
      [
        'JavaScript中逗号操作符的作用是？',
        ['返回最后一个表达式的值', '返回第一个表达式的值', '分隔参数', '语法错误'],
        0,
      ],
      ['JavaScript中delete操作符的作用是？', ['删除对象属性', '删除变量', '删除函数', '删除类'], 0],
      [
        'JavaScript中typeof class的结果是？',
        ['"class"', '"function"', '"object"', '"undefined"'],
        1,
      ],
      [
        'JavaScript中label语句的作用是？',
        ['标记循环以供break/continue使用', '定义变量', '定义函数', '语法错误'],
        0,
      ],
      [
        'JavaScript中with语句为什么不推荐使用？',
        ['导致作用域混乱，性能差', '语法错误', '不兼容ES6', '没有作用'],
        0,
      ],
      [
        'JavaScript中use strict的作用是？',
        ['启用严格模式', '启用松散模式', '启用ES6模式', '没有作用'],
        0,
      ],
      [
        'JavaScript严格模式下禁止什么？',
        ['未声明变量赋值，删除不可删属性，with语句', '使用let/const', '使用箭头函数', '使用class'],
        0,
      ],
      [
        'JavaScript中eval的作用是？',
        ['执行字符串代码', '计算数学表达式', '解析JSON', '编译代码'],
        0,
      ],
      [
        'JavaScript中为什么不推荐使用eval？',
        ['安全风险，性能差，难以调试', '语法错误', '不兼容ES6', '没有作用'],
        0,
      ],
      [
        'JavaScript中void操作符的作用是？',
        ['返回undefined', '删除对象', '声明变量', '抛出异常'],
        0,
      ],
      ['JavaScript中typeof NaN的结果是？', ['"NaN"', '"number"', '"undefined"', '"object"'], 1],
      ['JavaScript中Infinity的类型是？', ['"Infinity"', '"number"', '"object"', '"undefined"'], 1],
      ['JavaScript中0/0的结果是？', ['0', 'Infinity', 'NaN', 'TypeError'], 2],
      ['JavaScript中1/0的结果是？', ['0', 'Infinity', 'NaN', 'TypeError'], 1],
      ['JavaScript中-0 === 0的结果是？', ['true', 'false', 'NaN', 'TypeError'], 0],
      ['JavaScript中Object.is(NaN, NaN)的结果是？', ['true', 'false', 'NaN', 'TypeError'], 0],
      ['JavaScript中Object.is(0, -0)的结果是？', ['true', 'false', 'NaN', 'TypeError'], 1],
      [
        'JavaScript中Number.MAX_SAFE_INTEGER是？',
        ['2^53 - 1', '2^31 - 1', '2^63 - 1', 'Infinity'],
        0,
      ],
      ['JavaScript中BigInt的声明方式是？', ['数字后加n', '数字前加b', 'BigInt()', '以上都是'], 3],
      ['JavaScript中1n + 1的结果是？', ['2', '2n', 'TypeError', 'NaN'], 2],
      [
        'JavaScript中Symbol的作用是？',
        ['创建唯一标识符', '创建私有属性', '创建常量', '创建对象'],
        0,
      ],
      ['JavaScript中Symbol可以new吗？', ['不可以', '可以', '取决于场景', 'ES6可以'], 0],
      [
        'JavaScript中Symbol.for()的作用是？',
        ['创建或获取全局Symbol', '创建局部Symbol', '删除Symbol', '遍历Symbol'],
        0,
      ],
      [
        'JavaScript中Symbol.keyFor()的作用是？',
        ['获取全局Symbol的key', '获取Symbol的值', '删除Symbol', '遍历Symbol'],
        0,
      ],
      [
        'JavaScript中获取对象所有键的方法是？',
        ['Object.keys()', 'Object.values()', 'Object.entries()', 'Object.getOwnPropertyNames()'],
        0,
      ],
      [
        'JavaScript中Object.getOwnPropertyNames()和Object.keys()的区别是？',
        ['前者包含不可枚举属性', '后者包含不可枚举属性', '没有区别', '取决于对象'],
        0,
      ],
      [
        'JavaScript中获取对象所有Symbol属性的方法是？',
        [
          'Object.getOwnPropertySymbols()',
          'Object.keys()',
          'Object.getOwnPropertyNames()',
          'Reflect.ownKeys()',
        ],
        0,
      ],
      [
        'JavaScript中Reflect.ownKeys()返回？',
        ['所有属性和Symbol', '仅Symbol', '仅可枚举属性', '仅不可枚举属性'],
        0,
      ],
      [
        'JavaScript中in操作符的作用是？',
        ['检查对象是否包含属性', '遍历对象', '创建对象', '删除属性'],
        0,
      ],
      ['JavaScript中in操作符检查原型链吗？', ['是', '否', '取决于属性', '取决于对象'], 0],
      [
        'JavaScript中Object.hasOwn()的作用是？',
        ['检查对象自身是否包含属性', '检查原型链', '获取属性值', '设置属性值'],
        0,
      ],
      [
        'JavaScript中hasOwnProperty()的作用是？',
        ['检查对象自身是否包含属性', '检查原型链', '获取属性值', '设置属性值'],
        0,
      ],
      ['JavaScript中assign的作用是？', ['合并对象', '克隆对象', '更新对象', '以上都是'], 3],
      [
        'JavaScript中Object.assign()是深拷贝还是浅拷贝？',
        ['浅拷贝', '深拷贝', '取决于属性', '取决于对象'],
        0,
      ],
      [
        'JavaScript中Object.freeze()的作用是？',
        ['冻结对象，不能增删改', '仅不能增删', '仅不能改', '仅不能删'],
        0,
      ],
      [
        'JavaScript中Object.seal()的作用是？',
        ['密封对象，不能增删，但能改', '冻结对象', '仅不能增', '仅不能删'],
        0,
      ],
      [
        'JavaScript中Object.preventExtensions()的作用是？',
        ['不能添加新属性', '不能修改属性', '不能删除属性', '冻结对象'],
        0,
      ],
      [
        'JavaScript中Object.isFrozen()的作用是？',
        ['判断对象是否冻结', '冻结对象', '解冻对象', '密封对象'],
        0,
      ],
      [
        'JavaScript中Object.isSealed()的作用是？',
        ['判断对象是否密封', '密封对象', '解封对象', '冻结对象'],
        0,
      ],
      [
        'JavaScript中判断对象是否可扩展的方法是？',
        ['Object.isExtensible()', 'Object.isFrozen()', 'Object.isSealed()', 'Object.isPrevented()'],
        0,
      ],
      [
        'JavaScript中JSON.stringify()的作用是？',
        ['将对象转为JSON字符串', '将JSON字符串转为对象', '解析JSON', '格式化JSON'],
        0,
      ],
      [
        'JavaScript中JSON.parse()的作用是？',
        ['将JSON字符串转为对象', '将对象转为JSON字符串', '验证JSON', '格式化JSON'],
        0,
      ],
      [
        'JavaScript中JSON.stringify()会转换哪些值？',
        ['可枚举的自有属性', '所有属性', '仅Symbol属性', '仅不可枚举属性'],
        0,
      ],
      [
        'JavaScript中JSON.stringify()如何处理函数？',
        ['忽略', '转为字符串', '抛出错误', '转为null'],
        0,
      ],
      [
        'JavaScript中JSON.stringify()如何处理undefined？',
        ['忽略', '转为字符串', '抛出错误', '转为null'],
        0,
      ],
      [
        'JavaScript中JSON.stringify()如何处理循环引用？',
        ['抛出TypeError', '忽略', '转为null', '无限循环'],
        0,
      ],
      [
        'JavaScript中JSON.stringify()的replacer参数作用是？',
        ['过滤或转换属性', '格式化输出', '解析JSON', '验证JSON'],
        0,
      ],
      [
        'JavaScript中JSON.stringify()的space参数作用是？',
        ['格式化输出缩进', '过滤属性', '解析JSON', '验证JSON'],
        0,
      ],
      [
        'JavaScript中toJSON()方法的作用是？',
        ['自定义JSON序列化', '自定义JSON解析', '验证JSON', '格式化JSON'],
        0,
      ],
      [
        'JavaScript中如何深拷贝对象？',
        ['JSON.parse(JSON.stringify())', 'Object.assign()', '展开运算符', 'Array.from()'],
        0,
      ],
      [
        'JavaScript中JSON.parse(JSON.stringify())的缺点是？',
        ['不支持函数、undefined、循环引用', '性能差', '语法错误', '不兼容ES6'],
        0,
      ],
      [
        'JavaScript中structuredClone()的作用是？',
        ['深拷贝对象', '浅拷贝对象', '合并对象', '冻结对象'],
        0,
      ],
      [
        'JavaScript中structuredClone()支持循环引用吗？',
        ['支持', '不支持', '取决于环境', '抛出错误'],
        0,
      ],
      ['JavaScript中console.log的作用是？', ['输出日志', '输出警告', '输出错误', '输出信息'], 0],
      ['JavaScript中console.warn的作用是？', ['输出警告', '输出日志', '输出错误', '输出信息'], 1],
      ['JavaScript中console.error的作用是？', ['输出错误', '输出日志', '输出警告', '输出信息'], 0],
      [
        'JavaScript中console.table的作用是？',
        ['以表格形式输出', '输出日志', '输出警告', '输出错误'],
        0,
      ],
      ['JavaScript中console.time的作用是？', ['计时开始', '计时结束', '输出时间', '输出日志'], 0],
      [
        'JavaScript中console.timeEnd的作用是？',
        ['计时结束', '计时开始', '输出时间', '输出日志'],
        0,
      ],
      [
        'JavaScript中console.trace的作用是？',
        ['输出调用栈', '输出日志', '输出警告', '输出错误'],
        0,
      ],
      [
        'JavaScript中console.group的作用是？',
        ['创建日志分组', '输出日志', '输出警告', '输出错误'],
        0,
      ],
      ['JavaScript中debugger语句的作用是？', ['设置断点', '输出日志', '抛出异常', '终止程序'], 0],
      ['JavaScript中setTimeout的作用是？', ['延时执行', '定时执行', '立即执行', '循环执行'], 0],
      ['JavaScript中setInterval的作用是？', ['循环执行', '延时执行', '立即执行', '定时执行'], 0],
      ['JavaScript中clearTimeout的作用是？', ['取消延时', '取消循环', '取消定时', '取消立即'], 0],
      ['JavaScript中clearInterval的作用是？', ['取消循环', '取消延时', '取消定时', '取消立即'], 0],
      [
        'JavaScript中requestAnimationFrame的作用是？',
        ['在下一次重绘前执行', '延时执行', '循环执行', '定时执行'],
        0,
      ],
      [
        'JavaScript中requestAnimationFrame的执行频率通常是？',
        ['60fps', '30fps', '120fps', '取决于代码'],
        0,
      ],
      [
        'JavaScript中cancelAnimationFrame的作用是？',
        ['取消重绘回调', '取消延时', '取消循环', '取消定时'],
        0,
      ],
      [
        'JavaScript中setImmediate的作用是？',
        ['在事件循环的check阶段执行', '立即执行', '延时执行', '循环执行'],
        0,
      ],
      [
        'JavaScript中queueMicrotask的作用是？',
        ['将任务加入微任务队列', '将任务加入宏任务队列', '立即执行任务', '延时执行任务'],
        0,
      ],
      ['JavaScript中parseInt的作用是？', ['解析整数', '解析浮点数', '转换字符串', '格式化数字'], 0],
      [
        'JavaScript中parseFloat的作用是？',
        ['解析浮点数', '解析整数', '转换字符串', '格式化数字'],
        0,
      ],
      ['JavaScript中parseInt("0x10")的结果是？', ['16', '0', '10', 'NaN'], 0],
      ['JavaScript中parseInt("10", 2)的结果是？', ['2', '10', '0', 'NaN'], 0],
      ['JavaScript中parseInt("010")的结果是？', ['10', '8', '0', 'NaN'], 0],
      [
        'JavaScript中Number.parseInt === parseInt的结果是？',
        ['true', 'false', 'undefined', 'TypeError'],
        0,
      ],
      [
        'JavaScript中isNaN和Number.isNaN的区别是？',
        ['Number.isNaN不会隐式转换', '没有区别', 'isNaN更严格', '取决于环境'],
        0,
      ],
      [
        'JavaScript中isFinite的作用是？',
        ['判断是否是有限数', '判断是否是无限数', '判断是否是NaN', '判断是否是整数'],
        0,
      ],
      [
        'JavaScript中Number.isFinite和isFinite的区别是？',
        ['Number.isFinite不会隐式转换', '没有区别', 'isFinite更严格', '取决于环境'],
        0,
      ],
      [
        'JavaScript中escape和encodeURI的区别是？',
        ['escape不编码URI安全字符', '没有区别', 'encodeURI更旧', '取决于环境'],
        0,
      ],
      [
        'JavaScript中encodeURI和encodeURIComponent的区别是？',
        ['encodeURIComponent编码更多字符', '没有区别', 'encodeURI编码更多字符', '取决于环境'],
        0,
      ],
      ['JavaScript中decodeURI的作用是？', ['解码URI', '编码URI', '编码URI组件', '解码URI组件'], 0],
      [
        'JavaScript中decodeURIComponent的作用是？',
        ['解码URI组件', '解码URI', '编码URI', '编码URI组件'],
        0,
      ],
      ['JavaScript中atob的作用是？', ['解码Base64', '编码Base64', '解码URI', '编码URI'], 0],
      ['JavaScript中btoa的作用是？', ['编码Base64', '解码Base64', '编码URI', '解码URI'], 0],
    ];
    const item = items[(i - 1) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }
  // ==================== 第二部分：对象与面向对象编程 (121-240) ====================
  for (let i = 121; i <= 240; i++) {
    const q = { id: `js-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'JavaScript中创建对象的方式有？',
        [
          '字面量, new Object(), Object.create(), 构造函数',
          '只有字面量',
          '只有new Object()',
          '只有构造函数',
        ],
        0,
      ],
      [
        'JavaScript中Object.create(null)的作用是？',
        ['创建无原型的对象', '创建空对象', '创建null对象', '语法错误'],
        0,
      ],
      [
        'JavaScript中原型链的终点是？',
        ['null', 'Object.prototype', 'undefined', 'Function.prototype'],
        0,
      ],
      [
        'JavaScript中__proto__和prototype的区别是？',
        [
          '__proto__是实例属性，prototype是构造函数属性',
          '没有区别',
          '__proto__是构造函数属性，prototype是实例属性',
          '取决于环境',
        ],
        0,
      ],
      [
        'JavaScript中constructor属性的作用是？',
        ['指向构造函数', '创建对象', '删除对象', '复制对象'],
        0,
      ],
      [
        'JavaScript中instanceof的作用是？',
        ['判断对象是否是某个构造函数的实例', '判断类型', '创建实例', '克隆实例'],
        0,
      ],
      ['JavaScript中instanceof能判断基本类型吗？', ['不能', '能', '取决于类型', '取决于环境'], 0],
      [
        'JavaScript中new操作符做了什么？',
        [
          '创建对象，绑定原型，执行构造函数，返回对象',
          '仅创建对象',
          '仅执行构造函数',
          '仅绑定原型',
        ],
        0,
      ],
      [
        'JavaScript中构造函数返回对象会怎样？',
        ['返回该对象', '返回this', '语法错误', '忽略返回值'],
        0,
      ],
      [
        'JavaScript中构造函数返回基本类型会怎样？',
        ['返回this', '返回该基本类型', '语法错误', '忽略返回值'],
        0,
      ],
      [
        'JavaScript中如何实现继承？',
        [
          '原型链继承，借用构造函数，组合继承，寄生组合继承',
          '只有原型链继承',
          '只有借用构造函数',
          '只有class继承',
        ],
        0,
      ],
      [
        'JavaScript中原型链继承的缺点是？',
        ['共享引用属性，无法传参', '无法共享方法', '无法继承原型', '语法错误'],
        0,
      ],
      [
        'JavaScript中借用构造函数继承的缺点是？',
        ['无法共享方法', '共享引用属性', '无法传参', '语法错误'],
        0,
      ],
      [
        'JavaScript中组合继承的缺点是？',
        ['调用了两次父构造函数', '无法共享方法', '共享引用属性', '语法错误'],
        0,
      ],
      [
        'JavaScript中寄生组合继承的优点是？',
        ['只调用一次父构造函数，原型链保持不变', '调用两次父构造函数', '共享引用属性', '语法错误'],
        0,
      ],
      ['JavaScript中class的本质是？', ['语法糖', '新类型', '函数', '对象'], 0],
      [
        'JavaScript中class有变量提升吗？',
        ['有，但存在TDZ', '没有', '有，且可以提前使用', '取决于严格模式'],
        0,
      ],
      [
        'JavaScript中class的方法默认是？',
        ['挂载在原型上', '挂载在实例上', '静态方法', '私有方法'],
        0,
      ],
      [
        'JavaScript中static方法的作用是？',
        ['定义静态方法', '定义实例方法', '定义私有方法', '定义公共方法'],
        0,
      ],
      [
        'JavaScript中class的extends作用是？',
        ['继承父类', '实现接口', '定义静态方法', '定义私有方法'],
        0,
      ],
      [
        'JavaScript中super的作用是？',
        ['调用父类构造函数或方法', '调用子类方法', '定义静态方法', '定义私有方法'],
        0,
      ],
      [
        'JavaScript中子类构造函数必须调用super吗？',
        ['必须，否则this不可用', '不必', '取决于父类', '取决于严格模式'],
        0,
      ],
      [
        'JavaScript中Object.getPrototypeOf的作用是？',
        ['获取对象的原型', '设置对象的原型', '创建对象', '删除原型'],
        0,
      ],
      [
        'JavaScript中Object.setPrototypeOf的作用是？',
        ['设置对象的原型', '获取对象的原型', '创建对象', '删除原型'],
        0,
      ],
      [
        'JavaScript中__proto__是标准属性吗？',
        ['不是，是历史遗留', '是', 'ES6才成为标准', '取决于环境'],
        0,
      ],
      ['JavaScript中for...in能遍历Symbol属性吗？', ['不能', '能', '取决于属性', '取决于对象'], 0],
      ['JavaScript中for...in能遍历不可枚举属性吗？', ['不能', '能', '取决于属性', '取决于对象'], 0],
      [
        'JavaScript中Object.keys()能遍历Symbol属性吗？',
        ['不能', '能', '取决于属性', '取决于对象'],
        0,
      ],
      [
        'JavaScript中Object.defineProperty的作用是？',
        ['定义或修改对象属性', '获取对象属性', '删除对象属性', '遍历对象属性'],
        0,
      ],
      [
        'JavaScript中属性描述符有？',
        ['数据描述符和存取描述符', '只有数据描述符', '只有存取描述符', '以上都不对'],
        0,
      ],
      [
        'JavaScript中数据描述符有？',
        ['value, writable, enumerable, configurable', 'get, set', '只有value', '只有writable'],
        0,
      ],
      ['JavaScript中存取描述符有？', ['get, set', 'value, writable', '只有get', '只有set'], 0],
      [
        'JavaScript中writable为false时？',
        ['属性值不能修改', '属性不能删除', '属性不能遍历', '属性不能重新配置'],
        0,
      ],
      [
        'JavaScript中configurable为false时？',
        ['属性不能删除或重新配置', '属性值不能修改', '属性不能遍历', '属性不能访问'],
        0,
      ],
      [
        'JavaScript中enumerable为false时？',
        ['属性不能遍历', '属性值不能修改', '属性不能删除', '属性不能重新配置'],
        0,
      ],
      [
        'JavaScript中getter的作用是？',
        ['读取属性时执行', '设置属性时执行', '删除属性时执行', '遍历属性时执行'],
        0,
      ],
      [
        'JavaScript中setter的作用是？',
        ['设置属性时执行', '读取属性时执行', '删除属性时执行', '遍历属性时执行'],
        0,
      ],
      [
        'JavaScript中this的指向是？',
        ['运行时确定', '定义时确定', '始终指向全局', '始终指向对象'],
        0,
      ],
      [
        'JavaScript中全局作用域下this指向？',
        ['全局对象', 'undefined', '当前对象', '取决于环境'],
        0,
      ],
      ['JavaScript中普通函数中this指向？', ['调用者', '定义者', '全局对象', 'undefined'], 0],
      [
        'JavaScript中箭头函数中this指向？',
        ['定义时所在上下文', '调用者', '全局对象', 'undefined'],
        0,
      ],
      [
        'JavaScript中箭头函数可以使用call改变this吗？',
        ['不能', '能', '取决于参数', '取决于环境'],
        0,
      ],
      [
        'JavaScript中call的作用是？',
        ['改变this指向并立即执行', '改变this指向不执行', '绑定this指向', '创建新函数'],
        0,
      ],
      [
        'JavaScript中apply的作用是？',
        ['改变this指向并立即执行', '改变this指向不执行', '绑定this指向', '创建新函数'],
        0,
      ],
      [
        'JavaScript中call和apply的区别是？',
        ['参数传递方式不同', 'this指向不同', '执行时机不同', '没有区别'],
        0,
      ],
      [
        'JavaScript中bind的作用是？',
        ['绑定this指向返回新函数', '改变this指向并立即执行', '绑定参数', '创建新对象'],
        0,
      ],
      [
        'JavaScript中bind返回的函数能作为构造函数吗？',
        ['能，但this绑定失效', '不能', '能，且this绑定生效', '取决于参数'],
        0,
      ],
      [
        'JavaScript中箭头函数的特点是？',
        ['没有this，没有arguments，不能new', '有this，有arguments，能new', '没有原型', '以上都是'],
        0,
      ],
      ['JavaScript中箭头函数可以作为生成器吗？', ['不能', '能', '取决于语法', '取决于环境'], 0],
      ['JavaScript中箭头函数有原型吗？', ['没有', '有', '取决于定义', '取决于环境'], 0],
      ['JavaScript中对象解构的作用是？', ['提取对象属性', '合并对象', '克隆对象', '冻结对象'], 0],
      ['JavaScript中数组解构的作用是？', ['提取数组元素', '合并数组', '克隆数组', '排序数组'], 0],
      ['JavaScript中解构时如何重命名？', ['使用冒号', '使用等号', '使用as', '不能重命名'], 0],
      ['JavaScript中解构时如何设置默认值？', ['使用等号', '使用冒号', '使用双问号', '不能设置'], 0],
      [
        'JavaScript中展开运算符...的作用是？',
        ['展开可迭代对象', '合并对象', '收集参数', '以上都是'],
        3,
      ],
      [
        'JavaScript中剩余参数...的作用是？',
        ['收集多余参数', '展开数组', '合并对象', '克隆数组'],
        0,
      ],
      [
        'JavaScript中剩余参数必须是最后一个参数吗？',
        ['必须', '不必', '取决于类型', '取决于环境'],
        0,
      ],
      [
        'JavaScript中arguments是数组吗？',
        ['不是，是类数组对象', '是', '取决于环境', '取决于严格模式'],
        0,
      ],
      [
        'JavaScript中如何将arguments转为数组？',
        [
          'Array.from(), [...arguments], Array.prototype.slice.call()',
          'arguments.toArray()',
          'Array(arguments)',
          'Object.keys(arguments)',
        ],
        0,
      ],
      [
        'JavaScript中对象字面量的增强有？',
        ['计算属性名，方法简写，属性简写', '只有方法简写', '只有属性简写', '以上都不对'],
        0,
      ],
      [
        'JavaScript中计算属性名的语法是？',
        ['[expression]', 'expression', '${expression}', '以上都不对'],
        0,
      ],
      [
        'JavaScript中方法简写的语法是？',
        ['method() {}', 'method: function() {}', 'method => {}', '以上都不对'],
        0,
      ],
      ['JavaScript中属性简写的语法是？', ['{x}', '{x: x}', '{x = x}', '以上都不对'], 0],
      [
        'JavaScript中Object.is()的作用是？',
        ['比较两个值是否相同', '比较引用', '比较类型', '比较值和类型'],
        0,
      ],
      [
        'JavaScript中Object.assign()的polyfill实现关键点是？',
        ['遍历源对象的可枚举自有属性', '遍历所有属性', '深拷贝属性', '绑定this'],
        0,
      ],
      [
        'JavaScript中如何判断属性是自有还是继承？',
        ['hasOwnProperty', 'in', 'typeof', 'instanceof'],
        0,
      ],
      [
        'JavaScript中如何遍历对象？',
        ['for...in, Object.keys(), Object.entries()', 'for...of', 'forEach', 'map'],
        0,
      ],
      [
        'JavaScript中for...of能遍历对象吗？',
        ['不能，对象不可迭代', '能', '取决于对象', '取决于环境'],
        0,
      ],
      [
        'JavaScript中如何使对象可迭代？',
        ['实现Symbol.iterator方法', '实现length属性', '实现forEach方法', '实现for方法'],
        0,
      ],
      [
        'JavaScript中Symbol.iterator的作用是？',
        ['定义对象的默认迭代器', '定义对象的属性', '定义对象的方法', '定义对象的构造函数'],
        0,
      ],
      ['JavaScript中Object.entries()返回？', ['键值对数组', '键数组', '值数组', '对象'], 0],
      [
        'JavaScript中Object.fromEntries()的作用是？',
        ['将键值对数组转为对象', '将对象转为键值对数组', '将键数组转为对象', '将值数组转为对象'],
        0,
      ],
      ['JavaScript中Object.values()返回？', ['值数组', '键数组', '键值对数组', '对象'], 0],
      ['JavaScript中Object.keys()返回？', ['键数组', '值数组', '键值对数组', '对象'], 0],
      [
        'JavaScript中getter和setter属于哪种描述符？',
        ['存取描述符', '数据描述符', '两者都是', '两者都不是'],
        0,
      ],
      [
        'JavaScript中同时定义getter和value会怎样？',
        ['抛出TypeError', 'value生效', 'getter生效', '取决于顺序'],
        0,
      ],
      [
        'JavaScript中defineProperty默认的writable是？',
        ['false', 'true', '取决于属性', '取决于对象'],
        0,
      ],
      [
        'JavaScript中defineProperty默认的configurable是？',
        ['false', 'true', '取决于属性', '取决于对象'],
        0,
      ],
      [
        'JavaScript中defineProperty默认的enumerable是？',
        ['false', 'true', '取决于属性', '取决于对象'],
        0,
      ],
      [
        'JavaScript中defineProperties的作用是？',
        ['同时定义多个属性', '定义单个属性', '删除多个属性', '遍历多个属性'],
        0,
      ],
      [
        'JavaScript中getOwnPropertyDescriptor的作用是？',
        ['获取属性描述符', '设置属性描述符', '删除属性描述符', '遍历属性描述符'],
        0,
      ],
      [
        'JavaScript中原型链查找的过程是？',
        [
          '自身 -> __proto__ -> ... -> null',
          '自身 -> prototype -> ... -> null',
          '全局 -> 局部 -> 自身',
          '以上都不对',
        ],
        0,
      ],
      [
        'JavaScript中属性遮蔽是指？',
        ['子对象属性覆盖父对象同名属性', '删除属性', '添加属性', '修改属性描述符'],
        0,
      ],
      [
        'JavaScript中delete操作符能删除原型属性吗？',
        ['不能，只能删除自身属性', '能', '取决于属性', '取决于对象'],
        0,
      ],
      [
        'JavaScript中delete操作符删除不存在的属性会？',
        ['返回true', '返回false', '抛出错误', '返回undefined'],
        0,
      ],
      [
        'JavaScript中delete操作符删除不可配置属性会？',
        ['返回false', '返回true', '抛出错误', '返回undefined'],
        0,
      ],
      [
        'JavaScript中严格模式下delete不可配置属性会？',
        ['抛出TypeError', '返回false', '返回true', '忽略'],
        0,
      ],
      [
        'JavaScript中in操作符和hasOwnProperty的区别是？',
        [
          'in检查原型链，hasOwnProperty只检查自身',
          '没有区别',
          'in只检查自身，hasOwnProperty检查原型链',
          '取决于对象',
        ],
        0,
      ],
      [
        'JavaScript中如何阻止对象扩展？',
        ['Object.preventExtensions()', 'Object.freeze()', 'Object.seal()', 'delete'],
        0,
      ],
      [
        'JavaScript中如何判断对象是否被冻结？',
        ['Object.isFrozen()', 'Object.isSealed()', 'Object.isExtensible()', 'typeof'],
        0,
      ],
      [
        'JavaScript中Object.freeze()是浅层还是深层？',
        ['浅层', '深层', '取决于对象', '取决于属性'],
        0,
      ],
      [
        'JavaScript中如何深冻结对象？',
        ['递归调用Object.freeze()', 'Object.deepFreeze()', 'Object.freeze(obj, true)', '无法实现'],
        0,
      ],
      [
        'JavaScript中class的constructor方法是？',
        ['构造方法', '静态方法', '原型方法', '私有方法'],
        0,
      ],
      [
        'JavaScript中class没有显式定义constructor会怎样？',
        ['默认添加空constructor', '报错', '无法实例化', '无法继承'],
        0,
      ],
      [
        'JavaScript中class的方法是挂在哪里的？',
        ['prototype上', '实例上', 'constructor上', '全局'],
        0,
      ],
      [
        'JavaScript中class的静态方法是挂在哪里的？',
        ['类本身上', 'prototype上', '实例上', 'constructor上'],
        0,
      ],
      [
        'JavaScript中class的静态属性如何定义？',
        ['static prop = value', 'prop = value', 'constructor内定义', 'prototype上定义'],
        0,
      ],
      ['JavaScript中class的私有字段如何定义？', ['#field', '_field', 'private field', '@field'], 0],
      [
        'JavaScript中私有字段可以在类外部访问吗？',
        ['不可以', '可以', '取决于字段名', '取决于环境'],
        0,
      ],
      [
        'JavaScript中私有方法如何定义？',
        ['#method() {}', 'private method() {}', '_method() {}', '@method() {}'],
        0,
      ],
      [
        'JavaScript中class的extends本质是？',
        ['基于原型链的继承', '基于接口的继承', '基于类的继承', '以上都不对'],
        0,
      ],
      [
        'JavaScript中super作为函数调用时代表？',
        ['父构造函数', '父类的原型对象', '父类本身', '父实例'],
        0,
      ],
      [
        'JavaScript中super作为对象调用时代表？',
        ['父类的原型对象', '父构造函数', '父类本身', '父实例'],
        0,
      ],
      [
        'JavaScript中子类继承原生构造函数可以获取内部属性吗？',
        ['可以', '不可以', '取决于构造函数', '取决于环境'],
        0,
      ],
      [
        'JavaScript中new.target的作用是？',
        ['检测是否被new调用', '获取构造函数', '获取原型', '获取实例'],
        0,
      ],
      ['JavaScript中new.target在普通函数中返回？', ['undefined', '函数本身', 'true', 'false'], 0],
      ['JavaScript中new.target在子类中返回？', ['子类本身', '父类', 'undefined', 'true'], 0],
      [
        'JavaScript中Symbol.hasInstance的作用是？',
        ['自定义instanceof行为', '自定义迭代器', '自定义类型转换', '自定义字符串转换'],
        0,
      ],
      [
        'JavaScript中如何自定义instanceof？',
        [
          '定义Symbol.hasInstance静态方法',
          '定义instanceof方法',
          '定义Symbol.instanceOf',
          '无法自定义',
        ],
        0,
      ],
      [
        'JavaScript中对象的toStringTag可以修改吗？',
        ['可以，通过Symbol.toStringTag', '不可以', '只能修改内置对象', '取决于对象'],
        0,
      ],
      [
        'JavaScript中Symbol.toPrimitive的作用是？',
        ['自定义类型转换行为', '自定义字符串转换', '自定义数字转换', '自定义布尔转换'],
        0,
      ],
      [
        'JavaScript中对象转原始值的顺序是？',
        [
          '先toPrimitive再valueOf再toString',
          '先valueOf再toString',
          '先toString再valueOf',
          '取决于提示类型',
        ],
        0,
      ],
      ['JavaScript中对象转数字的提示类型是？', ['number', 'string', 'default', 'boolean'], 0],
      ['JavaScript中对象转字符串的提示类型是？', ['string', 'number', 'default', 'boolean'], 0],
      ['JavaScript中对象相加的提示类型是？', ['default', 'number', 'string', 'boolean'], 0],
      ['JavaScript中Date对象相加的提示类型是？', ['string', 'number', 'default', 'boolean'], 0],
      ['JavaScript中Proxy的作用是？', ['拦截对象操作', '克隆对象', '冻结对象', '合并对象'], 0],
      [
        'JavaScript中Reflect的作用是？',
        ['提供操作对象的默认方法', '拦截对象操作', '创建对象', '删除对象'],
        0,
      ],
      [
        'JavaScript中Proxy和Reflect的关系是？',
        ['Reflect提供Proxy的默认行为', '没有关系', 'Reflect替代Proxy', 'Proxy替代Reflect'],
        0,
      ],
      [
        'JavaScript中Proxy可以拦截哪些操作？',
        ['读取，赋值，删除，枚举等', '仅读取', '仅赋值', '仅删除'],
        0,
      ],
      [
        'JavaScript中Proxy的get拦截器参数有？',
        ['target, prop, receiver', 'target, prop, value', 'target, prop', 'target'],
        0,
      ],
      [
        'JavaScript中Proxy的set拦截器参数有？',
        ['target, prop, value, receiver', 'target, prop, value', 'target, prop', 'target'],
        0,
      ],
      [
        'JavaScript中Proxy是深层的还是浅层的？',
        ['浅层，需要递归代理', '深层', '取决于参数', '取决于对象'],
        0,
      ],
      [
        'JavaScript中Proxy可以撤销吗？',
        ['可以，使用Proxy.revocable()', '不可以', '使用delete', '使用revoke()'],
        0,
      ],
      [
        'JavaScript中Proxy.revocable()返回什么？',
        ['{proxy, revoke}', 'proxy', 'revoke', 'boolean'],
        0,
      ],
      ['JavaScript中Reflect.set的返回值是？', ['boolean', 'undefined', '设置的值', '目标对象'], 0],
      ['JavaScript中Reflect.get的返回值是？', ['属性值', 'boolean', '目标对象', 'undefined'], 0],
      [
        'JavaScript中Reflect.deleteProperty的返回值是？',
        ['boolean', 'undefined', '删除的值', '目标对象'],
        0,
      ],
      [
        'JavaScript中Reflect.ownKeys返回？',
        ['所有自有属性和Symbol', '仅可枚举属性', '仅Symbol属性', '所有属性包括继承'],
        0,
      ],
      [
        'JavaScript中Reflect.construct的作用是？',
        ['相当于new', '相当于call', '相当于apply', '相当于bind'],
        0,
      ],
      [
        'JavaScript中Reflect.apply的作用是？',
        ['相当于apply', '相当于call', '相当于bind', '相当于new'],
        0,
      ],
      [
        'JavaScript中Reflect.defineProperty的返回值是？',
        ['boolean', 'undefined', '目标对象', '属性描述符'],
        0,
      ],
      [
        'JavaScript中Reflect.getPrototypeOf的作用是？',
        ['获取原型', '设置原型', '删除原型', '创建原型'],
        0,
      ],
    ];
    const item = items[(i - 121) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第三部分：内置对象与错误处理 (241-360) ====================
  for (let i = 241; i <= 360; i++) {
    const q = { id: `js-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'JavaScript中String的charAt作用是？',
        ['返回指定位置字符', '返回字符编码', '查找子串', '截取字符串'],
        0,
      ],
      [
        'JavaScript中String的charCodeAt作用是？',
        ['返回指定位置字符的UTF-16编码', '返回字符', '查找子串', '截取字符串'],
        0,
      ],
      [
        'JavaScript中String的concat作用是？',
        ['拼接字符串', '截取字符串', '查找字符串', '替换字符串'],
        0,
      ],
      [
        'JavaScript中String的indexOf作用是？',
        ['查找子串首次出现位置', '查找字符', '截取字符串', '替换字符串'],
        0,
      ],
      [
        'JavaScript中String的lastIndexOf作用是？',
        ['查找子串最后出现位置', '查找字符', '截取字符串', '替换字符串'],
        0,
      ],
      [
        'JavaScript中String的includes作用是？',
        ['判断是否包含子串', '查找子串位置', '截取字符串', '替换字符串'],
        0,
      ],
      [
        'JavaScript中String的startsWith作用是？',
        ['判断是否以某子串开头', '判断是否以某子串结尾', '判断是否包含', '截取字符串'],
        0,
      ],
      [
        'JavaScript中String的endsWith作用是？',
        ['判断是否以某子串结尾', '判断是否以某子串开头', '判断是否包含', '截取字符串'],
        0,
      ],
      [
        'JavaScript中String的match作用是？',
        ['匹配正则表达式', '替换字符串', '分割字符串', '截取字符串'],
        0,
      ],
      [
        'JavaScript中String的replace作用是？',
        ['替换匹配的子串', '匹配正则', '分割字符串', '截取字符串'],
        0,
      ],
      [
        'JavaScript中String的replaceAll作用是？',
        ['替换所有匹配的子串', '替换第一个匹配', '匹配正则', '分割字符串'],
        0,
      ],
      [
        'JavaScript中String的search作用是？',
        ['查找匹配正则的位置', '匹配正则', '替换字符串', '分割字符串'],
        0,
      ],
      [
        'JavaScript中String的slice作用是？',
        ['截取字符串', '替换字符串', '分割字符串', '拼接字符串'],
        0,
      ],
      [
        'JavaScript中String的substring作用是？',
        ['截取字符串', '替换字符串', '分割字符串', '拼接字符串'],
        0,
      ],
      [
        'JavaScript中String的substr作用是？',
        ['截取指定长度字符串', '截取字符串', '替换字符串', '分割字符串'],
        0,
      ],
      [
        'JavaScript中String的split作用是？',
        ['分割字符串为数组', '截取字符串', '替换字符串', '拼接字符串'],
        0,
      ],
      [
        'JavaScript中String的trim作用是？',
        ['去除首尾空白', '去除所有空白', '去除前导空白', '去除尾部空白'],
        0,
      ],
      [
        'JavaScript中String的trimStart作用是？',
        ['去除前导空白', '去除尾部空白', '去除首尾空白', '去除所有空白'],
        0,
      ],
      [
        'JavaScript中String的trimEnd作用是？',
        ['去除尾部空白', '去除前导空白', '去除首尾空白', '去除所有空白'],
        0,
      ],
      [
        'JavaScript中String的padStart作用是？',
        ['头部补全字符串', '尾部补全字符串', '去除空白', '重复字符串'],
        0,
      ],
      [
        'JavaScript中String的padEnd作用是？',
        ['尾部补全字符串', '头部补全字符串', '去除空白', '重复字符串'],
        0,
      ],
      [
        'JavaScript中String的repeat作用是？',
        ['重复字符串', '补全字符串', '截取字符串', '替换字符串'],
        0,
      ],
      [
        'JavaScript中String的toUpperCase作用是？',
        ['转大写', '转小写', '转首字母大写', '转驼峰'],
        0,
      ],
      [
        'JavaScript中String的toLowerCase作用是？',
        ['转小写', '转大写', '转首字母大写', '转驼峰'],
        0,
      ],
      [
        'JavaScript中String的at作用是？',
        ['返回指定索引字符，支持负数', '返回字符编码', '查找子串', '截取字符串'],
        0,
      ],
      ['JavaScript中String的length是属性还是方法？', ['属性', '方法', '两者都是', '两者都不是'], 0],
      ['JavaScript中String是不可变的吗？', ['是', '否', '取决于操作', '取决于环境'], 0],
      [
        'JavaScript中模板字符串的作用是？',
        ['拼接字符串，支持换行和表达式', '定义字符串', '转义字符串', '格式化字符串'],
        0,
      ],
      ['JavaScript中模板字符串如何嵌入变量？', ['${var}', '{{var}}', '#{var}', '$var'], 0],
      [
        'JavaScript中标签模板的作用是？',
        ['自定义模板字符串处理', '定义HTML标签', '定义XML标签', '以上都不对'],
        0,
      ],
      [
        'JavaScript中Array的isArray作用是？',
        ['判断是否是数组', '判断是否是对象', '判断是否是函数', '判断是否是字符串'],
        0,
      ],
      [
        'JavaScript中Array的from作用是？',
        ['将类数组或可迭代对象转为数组', '创建数组', '判断数组', '合并数组'],
        0,
      ],
      [
        'JavaScript中Array的of作用是？',
        ['创建数组', '将类数组转为数组', '判断数组', '合并数组'],
        0,
      ],
      [
        'JavaScript中Array的at作用是？',
        ['返回指定索引元素，支持负数', '添加元素', '删除元素', '查找元素'],
        0,
      ],
      ['JavaScript中Array的concat作用是？', ['合并数组', '截取数组', '查找元素', '排序数组'], 0],
      [
        'JavaScript中Array的copyWithin作用是？',
        ['数组内部复制', '合并数组', '截取数组', '填充数组'],
        0,
      ],
      [
        'JavaScript中Array的entries作用是？',
        ['返回键值对迭代器', '返回键迭代器', '返回值迭代器', '返回数组'],
        0,
      ],
      [
        'JavaScript中Array的every作用是？',
        ['判断是否所有元素满足条件', '判断是否有元素满足条件', '过滤元素', '遍历元素'],
        0,
      ],
      ['JavaScript中Array的fill作用是？', ['填充数组', '复制数组', '合并数组', '截取数组'], 0],
      ['JavaScript中Array的filter作用是？', ['过滤元素', '判断元素', '遍历元素', '累加元素'], 0],
      [
        'JavaScript中Array的find作用是？',
        ['查找第一个满足条件的元素', '查找满足条件的所有元素', '查找元素索引', '遍历元素'],
        0,
      ],
      [
        'JavaScript中Array的findIndex作用是？',
        ['查找第一个满足条件的索引', '查找满足条件的所有索引', '查找元素', '遍历元素'],
        0,
      ],
      [
        'JavaScript中Array的findLast作用是？',
        ['查找最后一个满足条件的元素', '查找第一个满足条件的元素', '查找索引', '遍历元素'],
        0,
      ],
      [
        'JavaScript中Array的findLastIndex作用是？',
        ['查找最后一个满足条件的索引', '查找第一个满足条件的索引', '查找元素', '遍历元素'],
        0,
      ],
      [
        'JavaScript中Array的flat作用是？',
        ['扁平化数组', '映射并扁平化', '排序数组', '反转数组'],
        0,
      ],
      ['JavaScript中Array的flatMap作用是？', ['映射并扁平化', '仅扁平化', '仅映射', '排序数组'], 0],
      ['JavaScript中Array的forEach作用是？', ['遍历数组', '过滤数组', '映射数组', '累加数组'], 0],
      [
        'JavaScript中Array的includes作用是？',
        ['判断是否包含元素', '查找元素索引', '添加元素', '删除元素'],
        0,
      ],
      [
        'JavaScript中Array的indexOf作用是？',
        ['查找元素首次出现索引', '查找元素最后出现索引', '判断是否包含', '添加元素'],
        0,
      ],
      [
        'JavaScript中Array的join作用是？',
        ['将数组转为字符串', '将字符串转为数组', '合并数组', '截取数组'],
        0,
      ],
      [
        'JavaScript中Array的keys作用是？',
        ['返回键迭代器', '返回值迭代器', '返回键值对迭代器', '返回数组'],
        0,
      ],
      [
        'JavaScript中Array的lastIndexOf作用是？',
        ['查找元素最后出现索引', '查找元素首次出现索引', '判断是否包含', '添加元素'],
        0,
      ],
      ['JavaScript中Array的map作用是？', ['映射数组', '过滤数组', '遍历数组', '累加数组'], 0],
      [
        'JavaScript中Array的pop作用是？',
        ['删除末尾元素', '删除首元素', '添加末尾元素', '添加首元素'],
        0,
      ],
      [
        'JavaScript中Array的push作用是？',
        ['添加末尾元素', '添加首元素', '删除末尾元素', '删除首元素'],
        0,
      ],
      ['JavaScript中Array的reduce作用是？', ['累加数组', '映射数组', '过滤数组', '遍历数组'], 0],
      [
        'JavaScript中Array的reduceRight作用是？',
        ['从右向左累加', '从左向右累加', '映射数组', '过滤数组'],
        0,
      ],
      ['JavaScript中Array的reverse作用是？', ['反转数组', '排序数组', '截取数组', '合并数组'], 0],
      [
        'JavaScript中Array的shift作用是？',
        ['删除首元素', '删除末尾元素', '添加首元素', '添加末尾元素'],
        0,
      ],
      [
        'JavaScript中Array的unshift作用是？',
        ['添加首元素', '添加末尾元素', '删除首元素', '删除末尾元素'],
        0,
      ],
      ['JavaScript中Array的slice作用是？', ['截取数组', '删除元素', '插入元素', '替换元素'], 0],
      [
        'JavaScript中Array的some作用是？',
        ['判断是否有元素满足条件', '判断是否所有元素满足条件', '过滤元素', '遍历元素'],
        0,
      ],
      ['JavaScript中Array的sort作用是？', ['排序数组', '反转数组', '截取数组', '合并数组'], 0],
      [
        'JavaScript中Array的splice作用是？',
        ['删除、插入、替换元素', '截取数组', '合并数组', '反转数组'],
        0,
      ],
      [
        'JavaScript中Array的toLocaleString作用是？',
        ['转为本地化字符串', '转为字符串', '转为JSON', '转为数组'],
        0,
      ],
      [
        'JavaScript中Array的toString作用是？',
        ['转为字符串', '转为本地化字符串', '转为JSON', '转为数组'],
        0,
      ],
      [
        'JavaScript中Array的values作用是？',
        ['返回值迭代器', '返回键迭代器', '返回键值对迭代器', '返回数组'],
        0,
      ],
      ['JavaScript中Array的length属性是可写的吗？', ['是', '否', '只读', '取决于环境'], 0],
      ['JavaScript中Array的length设为0会怎样？', ['清空数组', '报错', '忽略', '截取前0个元素'], 0],
      [
        'JavaScript中稀疏数组是指？',
        ['含有空位的数组', '含有undefined的数组', '含有null的数组', '长度为0的数组'],
        0,
      ],
      [
        'JavaScript中forEach能中断吗？',
        ['不能', '能，用break', '能，用return', '能，用continue'],
        0,
      ],
      ['JavaScript中sort默认是按什么排序？', ['UTF-16码点', '数字大小', '字符串长度', '对象键'], 0],
      [
        'JavaScript中如何按数字大小排序？',
        ['sort((a, b) => a - b)', 'sort()', 'sort((a, b) => a > b)', 'sort(a, b)'],
        0,
      ],
      [
        'JavaScript中Math的abs作用是？',
        ['返回绝对值', ['返回最大值'], '返回最小值', '返回平方根'],
        0,
      ],
      ['JavaScript中Math的ceil作用是？', ['向上取整', '向下取整', '四舍五入', '取随机数'], 0],
      ['JavaScript中Math的floor作用是？', ['向下取整', '向上取整', '四舍五入', '取随机数'], 0],
      ['JavaScript中Math的round作用是？', ['四舍五入', '向上取整', '向下取整', '取随机数'], 0],
      [
        'JavaScript中Math的max作用是？',
        ['返回最大值', '返回最小值', '返回绝对值', '返回平方根'],
        0,
      ],
      [
        'JavaScript中Math的min作用是？',
        ['返回最小值', '返回最大值', '返回绝对值', '返回平方根'],
        0,
      ],
      ['JavaScript中Math的pow作用是？', ['返回幂运算', '返回平方根', '返回绝对值', '返回对数'], 0],
      ['JavaScript中Math的sqrt作用是？', ['返回平方根', '返回幂运算', '返回绝对值', '返回对数'], 0],
      [
        'JavaScript中Math的random作用是？',
        ['返回0到1之间的随机数', '返回随机整数', '返回随机字符串', '返回随机布尔值'],
        0,
      ],
      ['JavaScript中Math的sign作用是？', ['返回正负号', '返回符号', '返回绝对值', '返回相反数'], 0],
      ['JavaScript中Math的trunc作用是？', ['去除小数部分', '向上取整', '向下取整', '四舍五入'], 0],
      [
        'JavaScript中Date的now作用是？',
        ['获取当前时间戳', '获取当前日期', '获取当前时间', '获取时区'],
        0,
      ],
      [
        'JavaScript中Date的parse作用是？',
        ['解析日期字符串', '格式化日期', '获取时间戳', '设置日期'],
        0,
      ],
      [
        'JavaScript中Date的UTC作用是？',
        ['获取UTC时间戳', '获取本地时间戳', '格式化UTC日期', '解析UTC日期'],
        0,
      ],
      ['JavaScript中Date的getTime作用是？', ['获取时间戳', '获取年份', '获取月份', '获取日期'], 0],
      [
        'JavaScript中Date的getFullYear作用是？',
        ['获取四位数年份', '获取两位数年份', '获取月份', '获取日期'],
        0,
      ],
      [
        'JavaScript中Date的getMonth作用是？',
        ['获取月份(0-11)', '获取月份(1-12)', '获取日期', '获取年份'],
        0,
      ],
      [
        'JavaScript中Date的getDate作用是？',
        ['获取日期(1-31)', '获取星期', '获取月份', '获取年份'],
        0,
      ],
      [
        'JavaScript中Date的getDay作用是？',
        ['获取星期(0-6)', '获取日期', '获取月份', '获取年份'],
        0,
      ],
      ['JavaScript中Date的getHours作用是？', ['获取小时', '获取分钟', '获取秒', '获取毫秒'], 0],
      ['JavaScript中Date的getMinutes作用是？', ['获取分钟', '获取小时', '获取秒', '获取毫秒'], 0],
      ['JavaScript中Date的getSeconds作用是？', ['获取秒', '获取分钟', '获取小时', '获取毫秒'], 0],
      [
        'JavaScript中Date的getMilliseconds作用是？',
        ['获取毫秒', '获取秒', '获取分钟', '获取小时'],
        0,
      ],
      [
        'JavaScript中Date的toISOString作用是？',
        ['转为ISO格式字符串', '转为本地格式', '转为JSON格式', '转为UTC格式'],
        0,
      ],
      [
        'JavaScript中Date的toJSON作用是？',
        ['转为JSON格式字符串', '转为ISO格式', '转为本地格式', '转为UTC格式'],
        0,
      ],
      [
        'JavaScript中Date的toLocaleDateString作用是？',
        ['转为本地日期字符串', '转为本地时间字符串', '转为ISO格式', '转为JSON格式'],
        0,
      ],
      [
        'JavaScript中Date的toLocaleTimeString作用是？',
        ['转为本地时间字符串', '转为本地日期字符串', '转为ISO格式', '转为JSON格式'],
        0,
      ],
      [
        'JavaScript中Date的toLocaleString作用是？',
        ['转为本地日期时间字符串', '转为本地日期字符串', '转为本地时间字符串', '转为ISO格式'],
        0,
      ],
      [
        'JavaScript中Date的setFullYear作用是？',
        ['设置年份', '设置月份', '设置日期', '设置时间'],
        0,
      ],
      ['JavaScript中Date的setMonth作用是？', ['设置月份', '设置年份', '设置日期', '设置时间'], 0],
      ['JavaScript中Date的setDate作用是？', ['设置日期', '设置月份', '设置年份', '设置时间'], 0],
      ['JavaScript中Date的setTime作用是？', ['设置时间戳', '设置年份', '设置月份', '设置日期'], 0],
      [
        'JavaScript中RegExp的test作用是？',
        ['测试是否匹配', '返回匹配结果', '替换匹配', '分割字符串'],
        0,
      ],
      [
        'JavaScript中RegExp的exec作用是？',
        ['返回匹配结果', '测试是否匹配', '替换匹配', '分割字符串'],
        0,
      ],
      [
        'JavaScript中RegExp的source作用是？',
        ['返回正则文本', '返回标志', '返回匹配结果', '返回 lastIndex'],
        0,
      ],
      [
        'JavaScript中RegExp的flags作用是？',
        ['返回标志', '返回正则文本', '返回匹配结果', '返回 lastIndex'],
        0,
      ],
      [
        'JavaScript中RegExp的lastIndex作用是？',
        ['下次匹配开始位置', '最后匹配位置', '匹配次数', '匹配长度'],
        0,
      ],
      ['JavaScript中正则的g标志表示？', ['全局匹配', '忽略大小写', '多行匹配', '点匹配换行'], 0],
      ['JavaScript中正则的i标志表示？', ['忽略大小写', '全局匹配', '多行匹配', '点匹配换行'], 0],
      ['JavaScript中正则的m标志表示？', ['多行匹配', '全局匹配', '忽略大小写', '点匹配换行'], 0],
      ['JavaScript中正则的s标志表示？', ['点匹配换行', '全局匹配', '忽略大小写', '多行匹配'], 0],
      ['JavaScript中正则的u标志表示？', ['Unicode模式', '全局匹配', '忽略大小写', '多行匹配'], 0],
      ['JavaScript中正则的y标志表示？', ['粘附匹配', '全局匹配', '忽略大小写', '多行匹配'], 0],
      ['JavaScript中正则的d标志表示？', ['返回匹配索引', '全局匹配', '忽略大小写', '多行匹配'], 0],
      [
        'JavaScript中Error的类型有？',
        [
          'EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError',
          '只有Error',
          '只有TypeError',
          '只有SyntaxError',
        ],
        0,
      ],
      [
        'JavaScript中ReferenceError是指？',
        ['引用未声明变量', '类型错误', '语法错误', '范围错误'],
        0,
      ],
      ['JavaScript中TypeError是指？', ['类型不匹配错误', '引用错误', '语法错误', '范围错误'], 0],
      ['JavaScript中SyntaxError是指？', ['语法错误', '类型错误', '引用错误', '范围错误'], 0],
      ['JavaScript中RangeError是指？', ['值超出范围', '类型错误', '引用错误', '语法错误'], 0],
      [
        'JavaScript中try...catch能捕获异步错误吗？',
        ['不能', '能', '取决于异步类型', '取决于环境'],
        0,
      ],
      [
        'JavaScript中try...catch能捕获语法错误吗？',
        ['不能', '能', '取决于错误位置', '取决于环境'],
        0,
      ],
      [
        'JavaScript中finally块什么时候执行？',
        ['无论是否异常都执行', '仅异常时执行', '仅无异常时执行', '取决于catch'],
        0,
      ],
      ['JavaScript中throw的作用是？', ['抛出异常', ['捕获异常'], '声明异常', '忽略异常'], 0],
      ['JavaScript中Error的message属性是？', ['错误信息', '错误名称', '错误堆栈', '错误代码'], 0],
      ['JavaScript中Error的stack属性是？', ['错误堆栈', '错误信息', '错误名称', '错误代码'], 0],
      [
        'JavaScript中AggregateError的作用是？',
        ['包装多个错误', '表示聚合错误', '表示类型错误', '表示语法错误'],
        0,
      ],
      ['JavaScript中Promise的reject原因通常是？', ['Error对象', '字符串', '数字', '布尔值'], 0],
      [
        'JavaScript中如何创建自定义错误？',
        ['继承Error类', '继承Object类', '实现Error接口', '使用Error构造函数'],
        0,
      ],
      [
        'JavaScript中Map的特点是？',
        ['键值对，键可以是任意类型', '键值对，键只能是字符串', '仅值集合', '有序集合'],
        0,
      ],
      [
        'JavaScript中Map和Object的区别是？',
        [
          'Map键可以是任意类型，Object键是字符串/Symbol',
          '没有区别',
          'Map键是字符串，Object键是任意类型',
          '取决于环境',
        ],
        0,
      ],
      [
        'JavaScript中Map的set作用是？',
        ['添加或更新键值对', '获取值', '删除键值对', '判断是否包含'],
        0,
      ],
      ['JavaScript中Map的get作用是？', ['获取值', '添加键值对', '删除键值对', '判断是否包含'], 0],
      ['JavaScript中Map的has作用是？', ['判断是否包含键', '获取值', '添加键值对', '删除键值对'], 0],
      [
        'JavaScript中Map的delete作用是？',
        ['删除键值对', '获取值', '添加键值对', '判断是否包含'],
        0,
      ],
      ['JavaScript中Map的clear作用是？', ['清空Map', '删除键值对', '获取值', '判断是否包含'], 0],
      [
        'JavaScript中Map的size属性是？',
        ['获取键值对数量', '获取键集合', '获取值集合', '获取迭代器'],
        0,
      ],
      [
        'JavaScript中Map的keys作用是？',
        ['返回键迭代器', '返回值迭代器', '返回键值对迭代器', '返回数组'],
        0,
      ],
      [
        'JavaScript中Map的values作用是？',
        ['返回值迭代器', '返回键迭代器', '返回键值对迭代器', '返回数组'],
        0,
      ],
      [
        'JavaScript中Map的entries作用是？',
        ['返回键值对迭代器', '返回键迭代器', '返回值迭代器', '返回数组'],
        0,
      ],
      ['JavaScript中Map的forEach作用是？', ['遍历Map', '过滤Map', '映射Map', '累加Map'], 0],
      ['JavaScript中Set的特点是？', ['值唯一，无序', '键值对', '有序集合', '可重复集合'], 0],
      ['JavaScript中Set的add作用是？', ['添加值', '删除值', '判断是否包含', '清空集合'], 0],
      ['JavaScript中Set的has作用是？', ['判断是否包含值', '添加值', '删除值', '清空集合'], 0],
      ['JavaScript中Set的delete作用是？', ['删除值', '添加值', '判断是否包含', '清空集合'], 0],
      ['JavaScript中Set的clear作用是？', ['清空集合', '删除值', '添加值', '判断是否包含'], 0],
      [
        'JavaScript中Set的size属性是？',
        ['获取值的数量', '获取值集合', '获取迭代器', '获取数组'],
        0,
      ],
      [
        'JavaScript中WeakMap的特点是？',
        ['键必须是对象，弱引用', '键可以是任意类型', '强引用', '可遍历'],
        0,
      ],
      ['JavaScript中WeakMap可以遍历吗？', ['不可以', '可以', '取决于键', '取决于环境'], 0],
      ['JavaScript中WeakMap的键可以是什么？', ['对象', '基本类型', '任意类型', 'Symbol'], 0],
      [
        'JavaScript中WeakSet的特点是？',
        ['值必须是对象，弱引用', '值可以是任意类型', '强引用', '可遍历'],
        0,
      ],
      ['JavaScript中WeakSet可以遍历吗？', ['不可以', '可以', '取决于值', '取决于环境'], 0],
      ['JavaScript中WeakSet的值可以是什么？', ['对象', '基本类型', '任意类型', 'Symbol'], 0],
      ['JavaScript中WeakRef的作用是？', ['创建弱引用', '创建强引用', '创建映射', '创建集合'], 0],
      [
        'JavaScript中FinalizationRegistry的作用是？',
        ['对象被垃圾回收时执行回调', '注册强引用', '注册弱引用', '创建映射'],
        0,
      ],
    ];
    const item = items[(i - 241) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }
  // ==================== 第四部分：数组、集合与迭代器 (361-480) ====================
  for (let i = 361; i <= 480; i++) {
    const q = { id: `js-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'JavaScript中Iterator的作用是？',
        ['提供统一的遍历接口', '创建对象', '冻结对象', '合并对象'],
        0,
      ],
      [
        'JavaScript中Iterator接口的名称是？',
        ['Symbol.iterator', 'iterator', 'iterate', 'Symbol.asyncIterator'],
        0,
      ],
      [
        'JavaScript中Iterator的next方法返回？',
        ['{value, done}', '{key, value}', '{item, end}', '{result, status}'],
        0,
      ],
      [
        'JavaScript中Iterator的done为true表示？',
        ['遍历结束', '遍历继续', '遍历错误', '遍历暂停'],
        0,
      ],
      [
        'JavaScript中for...of循环使用什么接口？',
        ['Iterator', 'Enumerator', 'Generator', 'AsyncIterator'],
        0,
      ],
      [
        'JavaScript中for...of和for...in的区别是？',
        [
          'for...of遍历值，for...in遍历键',
          'for...of遍历键，for...in遍历值',
          '没有区别',
          '取决于对象',
        ],
        0,
      ],
      [
        'JavaScript中哪些内置对象可迭代？',
        [
          'Array, Map, Set, String, TypedArray, arguments',
          'Object, Function',
          'Number, Boolean',
          '以上都不对',
        ],
        0,
      ],
      [
        'JavaScript中Generator函数的作用是？',
        ['创建迭代器', '创建异步函数', '创建类', '创建代理'],
        0,
      ],
      [
        'JavaScript中Generator函数的声明方式是？',
        ['function*', 'function', 'async function', 'function+'],
        0,
      ],
      [
        'JavaScript中yield表达式的作用是？',
        ['暂停执行并返回值', '结束执行', '抛出异常', '恢复执行'],
        0,
      ],
      [
        'JavaScript中yield*表达式的作用是？',
        ['委托给另一个生成器', '返回多个值', '抛出异常', '恢复执行'],
        0,
      ],
      [
        'JavaScript中Generator的next方法参数作用是？',
        ['替换上一个yield的返回值', '设置下一个yield的值', '设置done的值', '设置value的值'],
        0,
      ],
      [
        'JavaScript中Generator的return方法作用是？',
        ['结束生成器并返回值', '暂停生成器', '抛出异常', '恢复执行'],
        0,
      ],
      [
        'JavaScript中Generator的throw方法作用是？',
        ['向生成器内抛出异常', '捕获异常', '暂停生成器', '恢复执行'],
        0,
      ],
      [
        'JavaScript中AsyncGenerator的作用是？',
        ['创建异步迭代器', '创建同步迭代器', '创建类', '创建代理'],
        0,
      ],
      [
        'JavaScript中AsyncGenerator的声明方式是？',
        ['async function*', 'function*', 'async function', 'function+'],
        0,
      ],
      ['JavaScript中await yield的作用是？', ['异步暂停', '同步暂停', '抛出异常', '恢复执行'], 0],
      [
        'JavaScript中for await...of的作用是？',
        ['遍历异步可迭代对象', '遍历同步可迭代对象', '遍历对象', '遍历数组'],
        0,
      ],
      [
        'JavaScript中Symbol.asyncIterator的作用是？',
        ['定义异步迭代器', '定义同步迭代器', '定义属性', '定义方法'],
        0,
      ],
      [
        'JavaScript中数组的解构赋值本质是？',
        ['使用Iterator接口', '使用for循环', '使用索引', '使用keys'],
        0,
      ],
      [
        'JavaScript中对象的解构赋值本质是？',
        ['使用属性查找', '使用Iterator', '使用for循环', '使用entries'],
        0,
      ],
      [
        'JavaScript中展开运算符的本质是？',
        ['使用Iterator接口', '使用for循环', '使用索引', '使用keys'],
        0,
      ],
      [
        'JavaScript中Array.from的第二个参数作用是？',
        ['映射函数', '执行上下文', '长度', '起始索引'],
        0,
      ],
      [
        'JavaScript中Array.from的第三个参数作用是？',
        ['映射函数的this', '映射函数', '长度', '起始索引'],
        0,
      ],
      [
        'JavaScript中Array.of和Array的区别是？',
        ['Array.of处理单个数字参数', '没有区别', 'Array处理单个数字参数更好', '取决于参数'],
        0,
      ],
      [
        'JavaScript中Array(7)会创建什么？',
        ['长度为7的空数组', ['包含数字7的数组'], '报错', '长度为7的密集数组'],
        0,
      ],
      [
        'JavaScript中Array.of(7)会创建什么？',
        ['包含数字7的数组', '长度为7的空数组', '报错', '长度为7的密集数组'],
        0,
      ],
      [
        'JavaScript中如何判断数组是否为空？',
        ['arr.length === 0', 'arr === []', 'arr == null', '!arr'],
        0,
      ],
      [
        'JavaScript中如何清空数组？',
        ['arr.length = 0', 'arr = []', 'delete arr', 'arr.clear()'],
        0,
      ],
      [
        'JavaScript中如何创建二维数组？',
        [
          'Array(n).fill().map(() => Array(m).fill(0))',
          'Array(n, m)',
          'new Array(n, m)',
          '[[] * n]',
        ],
        0,
      ],
      [
        'JavaScript中Array(n).fill([])的问题？',
        ['所有行共享同一个数组', '没有问题', '创建密集数组', '语法错误'],
        0,
      ],
      [
        'JavaScript中如何正确创建二维数组？',
        ['Array.from({length: n}, () => [])', 'Array(n).fill([])', 'new Array(n, m)', '[[] * n]'],
        0,
      ],
      [
        'JavaScript中数组扁平化的方法有？',
        ['flat, reduce, 递归', '仅flat', '仅reduce', '仅递归'],
        0,
      ],
      ['JavaScript中flat的参数默认是？', ['1', '0', 'Infinity', '-1'], 0],
      ['JavaScript中如何完全扁平化数组？', ['flat(Infinity)', 'flat()', 'flat(0)', 'flat(-1)'], 0],
      ['JavaScript中flatMap的作用是？', ['先map再flat(1)', '先flat再map', '仅map', '仅flat'], 0],
      [
        'JavaScript中reduce的参数有？',
        ['回调, 初始值', '仅回调', '回调, 初始值, 上下文', '回调, 上下文'],
        0,
      ],
      [
        'JavaScript中reduce回调的参数有？',
        ['累加器, 当前值, 索引, 数组', '累加器, 当前值', '当前值, 累加器', '当前值, 索引'],
        0,
      ],
      [
        'JavaScript中reduce没有初始值时会怎样？',
        ['使用第一个元素作为初始值', '报错', '使用0作为初始值', '使用undefined'],
        0,
      ],
      [
        'JavaScript中空数组使用reduce没有初始值会？',
        ['抛出TypeError', '返回undefined', '返回0', '返回null'],
        0,
      ],
      [
        'JavaScript中如何用reduce实现map？',
        [
          'arr.reduce((acc, cur) => [...acc, fn(cur)], [])',
          'arr.reduce((acc, cur) => fn(cur))',
          'arr.reduce(fn)',
          '无法实现',
        ],
        0,
      ],
      [
        'JavaScript中如何用reduce实现filter？',
        [
          'arr.reduce((acc, cur) => fn(cur) ? [...acc, cur] : acc, [])',
          'arr.reduce((acc, cur) => fn(cur))',
          'arr.reduce(fn)',
          '无法实现',
        ],
        0,
      ],
      [
        'JavaScript中如何求数组最大值？',
        ['Math.max(...arr)', 'arr.max()', 'Math.max(arr)', 'Math.maximum(arr)'],
        0,
      ],
      [
        'JavaScript中如何计算数组和？',
        ['arr.reduce((a, b) => a + b, 0)', 'arr.sum()', 'Math.sum(arr)', 'arr.add()'],
        0,
      ],
      [
        'JavaScript中如何统计数组元素出现次数？',
        ['reduce计数', 'count()', 'frequency()', 'stats()'],
        0,
      ],
      [
        'JavaScript中如何数组去重？',
        ['Set, filter+indexOf, reduce', '仅Set', '仅filter', '仅reduce'],
        0,
      ],
      [
        'JavaScript中[...new Set(arr)]的作用是？',
        ['数组去重', '数组排序', '数组扁平化', '数组过滤'],
        0,
      ],
      ['JavaScript中如何数组交集？', ['filter+includes', 'intersect()', 'and()', 'join()'], 0],
      [
        'JavaScript中如何数组合并？',
        ['concat, [...arr1, ...arr2], push+apply', '仅concat', '仅展开', '仅push'],
        0,
      ],
      [
        'JavaScript中arr.push(...arr2)的作用是？',
        ['将arr2追加到arr', '合并为新数组', '替换arr', '去重合并'],
        0,
      ],
      ['JavaScript中如何数组差集？', ['filter+!includes', 'diff()', 'minus()', 'subtract()'], 0],
      ['JavaScript中如何数组排序？', ['sort', 'order', 'arrange', 'rank'], 0],
      ['JavaScript中sort会改变原数组吗？', ['会', '不会', '取决于参数', '取决于环境'], 0],
      [
        'JavaScript中如何不改变原数组排序？',
        ['toSorted', 'slice().sort()', 'sort(false)', 'sort(imutable)'],
        0,
      ],
      ['JavaScript中toSorted是ES几的？', ['ES2023', 'ES6', 'ES5', 'ES2020'], 0],
      [
        'JavaScript中toReversed的作用是？',
        ['不改变原数组反转', '改变原数组反转', '反转字符串', '反转对象'],
        0,
      ],
      [
        'JavaScript中toSpliced的作用是？',
        ['不改变原数组删除', '改变原数组删除', '拼接数组', '分割数组'],
        0,
      ],
      [
        'JavaScript中with的作用是？',
        ['不改变原数组更新元素', '更新元素', '创建作用域', '异常处理'],
        0,
      ],
      [
        'JavaScript中如何数组分组？',
        ['reduce, Object.groupBy', 'groupBy', 'partition', 'split'],
        0,
      ],
      ['JavaScript中Object.groupBy是ES几的？', ['ES2024', 'ES6', 'ES5', 'ES2020'], 0],
      [
        'JavaScript中Map.groupBy的作用是？',
        ['分组到Map', '分组到Object', '分组到Set', '分组到Array'],
        0,
      ],
      [
        'JavaScript中Iterator的return方法何时调用？',
        ['提前终止遍历时', '遍历结束时', '遍历出错时', '遍历开始时'],
        0,
      ],
      [
        'JavaScript中哪些操作会触发Iterator的return？',
        ['break, throw, return', 'for...of正常结束', 'next()完成', '以上都不对'],
        0,
      ],
      ['JavaScript中Generator函数执行后返回？', ['迭代器', 'undefined', '结果', 'Promise'], 0],
      [
        'JavaScript中Generator函数内部可以调用普通函数吗？',
        ['可以', '不可以', '取决于函数', '取决于环境'],
        0,
      ],
      [
        'JavaScript中普通函数内部可以调用Generator吗？',
        ['可以', '不可以', '取决于函数', '取决于环境'],
        0,
      ],
      ['JavaScript中Generator可以实现协程吗？', ['可以', '不可以', '仅线程', '仅进程'], 0],
      [
        'JavaScript中Generator的异步实现方式是？',
        ['Thunk + Generator', 'Promise + Generator', 'Callback + Generator', '以上都是'],
        0,
      ],
      [
        'JavaScript中co库的作用是？',
        ['自动执行Generator', '创建Generator', '编译Generator', '调试Generator'],
        0,
      ],
      ['JavaScript中async/await是Generator的语法糖吗？', ['是', '否', '部分是', '取决于环境'], 0],
      [
        'JavaScript中Iterator和Generator的关系是？',
        ['Generator是创建Iterator的方式', '没有关系', 'Iterator是创建Generator的方式', '两者相同'],
        0,
      ],
      ['JavaScript中可迭代对象可以被解构吗？', ['可以', '不可以', '取决于对象', '取决于环境'], 0],
      [
        'JavaScript中字符串可以被for...of遍历吗？',
        ['可以', '不可以', '取决于编码', '取决于环境'],
        0,
      ],
      ['JavaScript中for...of遍历字符串得到？', ['字符', '字符编码', '字符索引', '字符对象'], 0],
      [
        'JavaScript中Map可以被for...of遍历吗？',
        ['可以', '不可以', '取决于键类型', '取决于环境'],
        0,
      ],
      ['JavaScript中for...of遍历Map得到？', ['键值对数组', '键', '值', 'MapEntry对象'], 0],
      [
        'JavaScript中Set可以被for...of遍历吗？',
        ['可以', '不可以', '取决于值类型', '取决于环境'],
        0,
      ],
      ['JavaScript中for...of遍历Set得到？', ['值', '键值对', '键', 'SetEntry对象'], 0],
      [
        'JavaScript中arguments可以被for...of遍历吗？',
        ['不可以', '可以', '取决于严格模式', '取决于环境'],
        0,
      ],
      [
        'JavaScript中如何使arguments可迭代？',
        ['使用展开运算符或Array.from', '添加Symbol.iterator', '使用for循环', '无法实现'],
        0,
      ],
      [
        'JavaScript中NodeList可以被for...of遍历吗？',
        ['可以', '不可以', '取决于浏览器', '取决于环境'],
        0,
      ],
      [
        'JavaScript中TypedArray可以被for...of遍历吗？',
        ['可以', '不可以', '取决于类型', '取决于环境'],
        0,
      ],
      [
        'JavaScript中Int8Array的作用是？',
        ['8位有符号整数数组', '8位无符号整数数组', '8位浮点数数组', '8位字符数组'],
        0,
      ],
      [
        'JavaScript中Uint8Array的作用是？',
        ['8位无符号整数数组', '8位有符号整数数组', '8位浮点数数组', '8位字符数组'],
        0,
      ],
      [
        'JavaScript中Float32Array的作用是？',
        ['32位浮点数数组', '32位整数数组', '32位字符数组', '32位布尔数组'],
        0,
      ],
      [
        'JavaScript中TypedArray和Array的区别是？',
        ['TypedArray元素类型固定', '没有区别', 'Array元素类型固定', '取决于环境'],
        0,
      ],
      ['JavaScript中TypedArray有push方法吗？', ['没有', '有', '取决于类型', '取决于环境'], 0],
      [
        'JavaScript中TypedArray的buffer属性是？',
        ['底层ArrayBuffer', '缓冲区大小', '缓冲区类型', '缓冲区数据'],
        0,
      ],
      [
        'JavaScript中ArrayBuffer的作用是？',
        ['表示原始二进制数据缓冲区', '表示字符串', '表示数组', '表示对象'],
        0,
      ],
      [
        'JavaScript中ArrayBuffer可以直接读写吗？',
        ['不能，需要通过视图', '能', '取决于大小', '取决于环境'],
        0,
      ],
      [
        'JavaScript中DataView的作用是？',
        ['读写ArrayBuffer的视图', '查看数据', '验证数据', '转换数据'],
        0,
      ],
      ['JavaScript中DataView可以指定字节序吗？', ['可以', '不可以', '取决于环境', '取决于数据'], 0],
      [
        'JavaScript中大端字节序是指？',
        ['高位字节在前', '低位字节在前', '中间字节在前', '随机顺序'],
        0,
      ],
      [
        'JavaScript中小端字节序是指？',
        ['低位字节在前', '高位字节在前', '中间字节在前', '随机顺序'],
        0,
      ],
      [
        'JavaScript中如何判断当前字节序？',
        [
          'new Uint8Array(new Uint16Array([1]).buffer)[0] === 1',
          'os.endianness()',
          'process.byteOrder',
          '以上都不对',
        ],
        0,
      ],
      [
        'JavaScript中SharedArrayBuffer的作用是？',
        ['共享内存', '传输数据', '存储字符串', '存储对象'],
        0,
      ],
      [
        'JavaScript中Atomics的作用是？',
        ['原子操作SharedArrayBuffer', '同步线程', '锁定内存', '释放内存'],
        0,
      ],
      ['JavaScript中Atomics.add的作用是？', ['原子加法', '普通加法', '异步加法', '同步加法'], 0],
      ['JavaScript中Atomics.load的作用是？', ['原子读取', '普通读取', '异步读取', '同步读取'], 0],
      ['JavaScript中Atomics.store的作用是？', ['原子存储', '普通存储', '异步存储', '同步存储'], 0],
      ['JavaScript中Atomics.wait的作用是？', ['等待通知', '发送通知', '锁定线程', '唤醒线程'], 0],
      [
        'JavaScript中Atomics.notify的作用是？',
        ['唤醒等待的线程', '等待通知', '锁定线程', '解锁线程'],
        0,
      ],
      [
        'JavaScript中ArrayBuffer.isView的作用是？',
        ['判断是否是视图', '判断是否是ArrayBuffer', '创建视图', '转换视图'],
        0,
      ],
      ['JavaScript中Blob的作用是？', ['表示二进制大对象', '表示文本', '表示数组', '表示对象'], 0],
      ['JavaScript中File的作用是？', ['表示文件对象', '表示路径', '表示目录', '表示链接'], 0],
      ['JavaScript中File继承自？', ['Blob', 'Object', 'Array', 'String'], 0],
      [
        'JavaScript中FileReader的作用是？',
        ['异步读取文件', '同步读取文件', '写入文件', '删除文件'],
        0,
      ],
      [
        'JavaScript中FileReaderSync的作用是？',
        ['同步读取文件', '异步读取文件', '写入文件', '删除文件'],
        0,
      ],
      [
        'JavaScript中URL.createObjectURL的作用是？',
        ['创建Blob URL', '创建HTTP URL', '解析URL', '编码URL'],
        0,
      ],
      [
        'JavaScript中URL.revokeObjectURL的作用是？',
        ['释放Blob URL', '创建Blob URL', '解析URL', '编码URL'],
        0,
      ],
      ['JavaScript中FormData的作用是？', ['构建表单数据', '解析表单', '验证表单', '提交表单'], 0],
      ['JavaScript中Headers的作用是？', ['构建HTTP头', '解析HTTP', '验证HTTP', '发送HTTP'], 0],
      [
        'JavaScript中Request的作用是？',
        ['表示HTTP请求', '表示HTTP响应', '表示URL', '表示Header'],
        0,
      ],
      [
        'JavaScript中Response的作用是？',
        ['表示HTTP响应', '表示HTTP请求', '表示URL', '表示Header'],
        0,
      ],
    ];
    const item = items[(i - 361) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第五部分：异步编程 (481-600) ====================
  for (let i = 481; i <= 600; i++) {
    const q = { id: `js-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'JavaScript中事件循环的作用是？',
        ['协调事件、用户交互、脚本、渲染等', '执行同步代码', '执行异步代码', '管理内存'],
        0,
      ],
      [
        'JavaScript中宏任务有？',
        [
          'setTimeout, setInterval, I/O, UI渲染',
          'Promise, MutationObserver',
          'process.nextTick',
          'await',
        ],
        0,
      ],
      [
        'JavaScript中微任务有？',
        ['Promise, MutationObserver, process.nextTick', 'setTimeout, setInterval', 'I/O', 'UI渲染'],
        0,
      ],
      [
        'JavaScript中微任务的执行时机是？',
        ['宏任务结束后，渲染前', '宏任务开始前', '渲染后', '下一轮事件循环'],
        0,
      ],
      [
        'JavaScript中process.nextTick和Promise的区别是？',
        ['nextTick优先级更高', 'Promise优先级更高', '没有区别', '取决于环境'],
        0,
      ],
      [
        'JavaScript中事件循环的顺序是？',
        [
          '同步代码 -> 微任务 -> 宏任务',
          '同步代码 -> 宏任务 -> 微任务',
          '宏任务 -> 同步代码 -> 微任务',
          '微任务 -> 同步代码 -> 宏任务',
        ],
        0,
      ],
      [
        'JavaScript中Promise的状态有？',
        [
          'pending, fulfilled, rejected',
          'pending, resolved, rejected',
          'waiting, resolved, rejected',
          'pending, success, failure',
        ],
        0,
      ],
      [
        'JavaScript中Promise的状态一旦改变会怎样？',
        ['不可再变', '可以再变', '取决于状态', '取决于环境'],
        0,
      ],
      [
        'JavaScript中Promise的resolve作用是？',
        ['将状态改为fulfilled', '将状态改为rejected', '将状态改为pending', '取消Promise'],
        0,
      ],
      [
        'JavaScript中Promise的reject作用是？',
        ['将状态改为rejected', '将状态改为fulfilled', '将状态改为pending', '取消Promise'],
        0,
      ],
      [
        'JavaScript中Promise.prototype.then的作用是？',
        ['添加回调', '创建Promise', '取消Promise', '捕获异常'],
        0,
      ],
      [
        'JavaScript中Promise.prototype.catch的作用是？',
        ['捕获异常', '添加回调', '创建Promise', '取消Promise'],
        0,
      ],
      [
        'JavaScript中Promise.prototype.finally的作用是？',
        ['无论结果都执行', '仅成功执行', '仅失败执行', '取消Promise'],
        0,
      ],
      [
        'JavaScript中Promise.resolve的作用是？',
        ['创建已解决的Promise', '创建已拒绝的Promise', '创建待定的Promise', '取消Promise'],
        0,
      ],
      [
        'JavaScript中Promise.reject的作用是？',
        ['创建已拒绝的Promise', '创建已解决的Promise', '创建待定的Promise', '取消Promise'],
        0,
      ],
      [
        'JavaScript中Promise.all的作用是？',
        [
          '等待所有Promise成功',
          '等待任一Promise成功',
          '等待所有Promise完成',
          '等待任一Promise完成',
        ],
        0,
      ],
      [
        'JavaScript中Promise.allSettled的作用是？',
        [
          '等待所有Promise完成',
          '等待所有Promise成功',
          '等待任一Promise成功',
          '等待任一Promise完成',
        ],
        0,
      ],
      [
        'JavaScript中Promise.any的作用是？',
        [
          '等待任一Promise成功',
          '等待所有Promise成功',
          '等待所有Promise完成',
          '等待任一Promise完成',
        ],
        0,
      ],
      [
        'JavaScript中Promise.race的作用是？',
        [
          '等待任一Promise完成',
          '等待所有Promise成功',
          '等待所有Promise完成',
          '等待任一Promise成功',
        ],
        0,
      ],
      [
        'JavaScript中Promise.all有一个失败会怎样？',
        ['整体失败', '忽略失败', '等待其他完成', '抛出警告'],
        0,
      ],
      [
        'JavaScript中Promise.allSettled有一个失败会怎样？',
        ['继续等待其他完成', '整体失败', '忽略失败', '抛出警告'],
        0,
      ],
      [
        'JavaScript中Promise.any有一个成功会怎样？',
        ['整体成功', '等待其他完成', '整体失败', '忽略成功'],
        0,
      ],
      [
        'JavaScript中Promise.any所有都失败会怎样？',
        ['整体失败', '返回最后一个失败', '忽略失败', '抛出警告'],
        0,
      ],
      [
        'JavaScript中Promise.race第一个完成会怎样？',
        ['以第一个结果为准', '等待所有完成', '忽略第一个', '抛出警告'],
        0,
      ],
      ['JavaScript中async函数的返回值是？', ['Promise', 'undefined', '普通值', 'Generator'], 0],
      [
        'JavaScript中await的作用是？',
        ['等待Promise解决', ['创建Promise'], '拒绝Promise', '取消Promise'],
        0,
      ],
      [
        'JavaScript中await只能在async函数中使用吗？',
        ['是', '否', '取决于环境', '取决于严格模式'],
        0,
      ],
      [
        'JavaScript中async/await的优点是？',
        ['使异步代码看起来像同步', '性能更好', '功能更强', '以上都是'],
        0,
      ],
      [
        'JavaScript中await后面的表达式不是Promise会怎样？',
        ['包装为已解决的Promise', '报错', '忽略', '返回原值'],
        0,
      ],
      [
        'JavaScript中async函数抛出异常会怎样？',
        ['返回已拒绝的Promise', '返回已解决的Promise', '抛出异常', '忽略异常'],
        0,
      ],
      [
        'JavaScript中try...catch能捕获await的异常吗？',
        ['能', '不能', '取决于异常类型', '取决于环境'],
        0,
      ],
      [
        'JavaScript中Promise的回调是同步还是异步执行？',
        ['异步', '同步', '取决于状态', '取决于环境'],
        0,
      ],
      [
        'JavaScript中Promise构造函数的回调是同步还是异步执行？',
        ['同步', '异步', '取决于状态', '取决于环境'],
        0,
      ],
      [
        'JavaScript中如何实现Promise串行执行？',
        ['reduce + async/await', 'forEach + async/await', 'map + async/await', 'for + async/await'],
        0,
      ],
      [
        'JavaScript中如何实现Promise并发执行？',
        ['Promise.all + map', 'reduce + async/await', 'forEach + async/await', 'for + async/await'],
        0,
      ],
      [
        'JavaScript中如何限制Promise并发数？',
        ['自定义调度器', 'Promise.all', 'Promise.race', 'Promise.allSettled'],
        0,
      ],
      [
        'JavaScript中回调地狱是指？',
        ['多层嵌套回调难以维护', '回调函数过多', '回调函数过少', '回调函数错误'],
        0,
      ],
      [
        'JavaScript中如何解决回调地狱？',
        ['Promise, async/await, Generator', '仅Promise', '仅async/await', '仅Generator'],
        0,
      ],
      [
        'JavaScript中Promise的缺点是？',
        ['无法取消，错误需要catch', '性能差', '语法复杂', '不支持并发'],
        0,
      ],
      [
        'JavaScript中如何取消Promise？',
        ['使用AbortController', '使用cancel()', '使用abort()', '无法取消'],
        0,
      ],
      [
        'JavaScript中AbortController的作用是？',
        ['中止Fetch请求', '取消Promise', '终止进程', '中断事件'],
        0,
      ],
      [
        'JavaScript中AbortSignal的作用是？',
        ['表示中止信号', '中止请求', '创建控制器', '处理异常'],
        0,
      ],
      [
        'JavaScript中setTimeout的回调是在哪个任务中执行？',
        ['宏任务', '微任务', '同步任务', '渲染任务'],
        0,
      ],
      [
        'JavaScript中Promise的回调是在哪个任务中执行？',
        ['微任务', '宏任务', '同步任务', '渲染任务'],
        0,
      ],
      [
        'JavaScript中MutationObserver的回调是在哪个任务中执行？',
        ['微任务', '宏任务', '同步任务', '渲染任务'],
        0,
      ],
      [
        'JavaScript中requestAnimationFrame的回调是在哪个任务中执行？',
        ['宏任务', '微任务', '同步任务', '渲染任务'],
        0,
      ],
      [
        'JavaScript中setImmediate的回调是在哪个任务中执行？',
        ['宏任务', '微任务', '同步任务', '渲染任务'],
        0,
      ],
      [
        'JavaScript中process.nextTick的回调是在哪个任务中执行？',
        ['微任务', '宏任务', '同步任务', '渲染任务'],
        0,
      ],
      [
        'JavaScript中微任务队列在什么时候清空？',
        ['每个宏任务结束后', '所有宏任务结束后', '渲染前', '渲染后'],
        0,
      ],
      ['JavaScript中事件循环的来源是？', ['浏览器', 'Node.js', 'JavaScript引擎', '以上都不对'], 0],
      [
        'JavaScript中Node.js的事件循环和浏览器一样吗？',
        ['不完全一样', '完全一样', '完全不同', '取决于版本'],
        0,
      ],
      [
        'JavaScript中Node.js事件循环的阶段有？',
        [
          'timers, pending, idle, prepare, poll, check, close',
          '仅timers和poll',
          '仅microtask和macrotask',
          '以上都不对',
        ],
        0,
      ],
      [
        'JavaScript中Node.js的poll阶段的作用是？',
        ['获取新I/O事件', '执行定时器', '执行setImmediate', '关闭事件'],
        0,
      ],
      [
        'JavaScript中Node.js的check阶段的作用是？',
        ['执行setImmediate', '执行定时器', '获取新I/O事件', '关闭事件'],
        0,
      ],
      [
        'JavaScript中Node.js的timers阶段的作用是？',
        ['执行setTimeout/setInterval', '执行setImmediate', '获取新I/O事件', '关闭事件'],
        0,
      ],
      [
        'JavaScript中setTimeout和setImmediate在Node.js中的执行顺序？',
        ['不确定', 'setTimeout先', 'setImmediate先', '取决于阶段'],
        0,
      ],
      [
        'JavaScript中setTimeout和setImmediate在IO回调中的执行顺序？',
        ['setImmediate先', 'setTimeout先', '不确定', '取决于阶段'],
        0,
      ],
      [
        'JavaScript中process.nextTick为什么优先于Promise？',
        [
          '因为nextTick队列在微任务队列之前',
          '因为nextTick是宏任务',
          '因为nextTick是同步的',
          '取决于实现',
        ],
        0,
      ],
      [
        'JavaScript中如何实现一个sleep函数？',
        ['Promise + setTimeout', 'while循环', 'setInterval', 'requestAnimationFrame'],
        0,
      ],
      [
        'JavaScript中如何实现一个Promise.retry？',
        ['递归调用', '循环调用', 'setTimeout', 'setInterval'],
        0,
      ],
      [
        'JavaScript中如何实现一个Promise超时？',
        [
          'Promise.race + setTimeout',
          'Promise.all + setTimeout',
          'Promise.any + setTimeout',
          'Promise.allSettled + setTimeout',
        ],
        0,
      ],
      [
        'JavaScript中Promise.all如果需要忽略错误怎么做？',
        ['包装每个Promise的catch', '使用Promise.allSettled', '使用try...catch', '无法忽略'],
        0,
      ],
      [
        'JavaScript中如何顺序执行异步操作？',
        ['for...of + await', 'forEach + await', 'map + await', 'reduce + await'],
        0,
      ],
      [
        'JavaScript中forEach + await的问题？',
        ['不会等待前一个完成', '会等待前一个完成', '会报错', '会并行执行'],
        0,
      ],
      [
        'JavaScript中map + await的问题？',
        ['会并行执行', ['会顺序执行'], '会报错', '会等待前一个完成'],
        0,
      ],
      [
        'JavaScript中如何实现发布订阅模式？',
        ['EventEmitter', 'Promise', 'Observable', 'Callback'],
        0,
      ],
      [
        'JavaScript中EventEmitter的on作用是？',
        ['注册事件', '触发事件', '移除事件', '注册一次性事件'],
        0,
      ],
      [
        'JavaScript中EventEmitter的emit作用是？',
        ['触发事件', '注册事件', '移除事件', '注册一次性事件'],
        0,
      ],
      [
        'JavaScript中EventEmitter的off作用是？',
        ['移除事件', '注册事件', '触发事件', '注册一次性事件'],
        0,
      ],
      [
        'JavaScript中EventEmitter的once作用是？',
        ['注册一次性事件', '注册事件', '触发事件', '移除事件'],
        0,
      ],
      [
        'JavaScript中观察者模式和发布订阅模式的区别？',
        ['观察者模式没有中间人', '没有区别', '发布订阅没有中间人', '取决于实现'],
        0,
      ],
      [
        'JavaScript中Promise的then回调返回值会怎样？',
        ['包装为新的Promise', '被忽略', '返回原值', '报错'],
        0,
      ],
      [
        'JavaScript中Promise的then回调抛出异常会怎样？',
        ['变为rejected状态', '被忽略', '变为pending状态', '报错'],
        0,
      ],
      [
        'JavaScript中Promise的catch回调返回值会怎样？',
        ['变为fulfilled状态', '保持rejected状态', '变为pending状态', '报错'],
        0,
      ],
      [
        'JavaScript中Promise的链式调用的原理是？',
        ['then返回新的Promise', 'then返回this', 'then修改原Promise', '以上都不对'],
        0,
      ],
      [
        'JavaScript中Promise穿透是指？',
        ['then非函数参数会透传value', 'then不执行', 'then报错', 'then返回undefined'],
        0,
      ],
      [
        'JavaScript中Promise.resolve(thenable)会怎样？',
        ['执行thenable的then方法', '直接解决', '报错', '忽略'],
        0,
      ],
      ['JavaScript中thenable是指？', ['具有then方法的对象', 'Promise对象', '函数', '数组'], 0],
      [
        'JavaScript中如何将回调函数转为Promise？',
        ['使用Promise构造函数', '使用async/await', '使用Generator', '无法转换'],
        0,
      ],
      [
        'JavaScript中promisify的作用是？',
        ['将回调风格转为Promise风格', ['将Promise转为回调'], '创建Promise', '取消Promise'],
        0,
      ],
      [
        'JavaScript中如何处理未捕获的Promise异常？',
        ['unhandledrejection事件', 'rejectionhandled事件', 'error事件', 'exception事件'],
        0,
      ],
      [
        'JavaScript中unhandledrejection事件何时触发？',
        ['Promise被拒绝且没有catch', 'Promise被拒绝', 'Promise被解决', 'Promise被取消'],
        0,
      ],
      [
        'JavaScript中rejectionhandled事件何时触发？',
        ['Promise被拒绝后添加catch', 'Promise被拒绝', 'Promise被解决', 'Promise被取消'],
        0,
      ],
      [
        'JavaScript中async函数中的异常如何全局捕获？',
        ['unhandledrejection事件', 'error事件', 'exception事件', 'try...catch'],
        0,
      ],
      [
        'JavaScript中fetch的异常如何处理？',
        ['检查response.ok', 'catch', 'try...catch', 'error事件'],
        0,
      ],
      ['JavaScript中fetch 404会抛出异常吗？', ['不会', '会', '取决于状态码', '取决于环境'], 0],
      [
        'JavaScript中fetch网络错误会抛出异常吗？',
        ['会', '不会', '取决于错误类型', '取决于环境'],
        0,
      ],
      [
        'JavaScript中fetch如何设置超时？',
        ['Promise.race + AbortController', 'timeout参数', 'setTimeout + reject', 'fetch.timeout'],
        0,
      ],
      [
        'JavaScript中fetch如何取消请求？',
        ['AbortController', 'cancel()', 'abort()', 'AbortSignal'],
        0,
      ],
      [
        'JavaScript中fetch如何处理Cookie？',
        ['credentials参数', 'cookie参数', 'header', 'withCredentials'],
        0,
      ],
      ['JavaScript中fetch的credentials默认值是？', ['same-origin', 'include', 'omit', 'none'], 0],
      ['JavaScript中fetch如何处理CORS？', ['mode参数', 'cors参数', 'header', 'withCredentials'], 0],
      [
        'JavaScript中fetch的mode参数有？',
        ['cors, no-cors, same-origin', 'only-cors', 'no-cors', '以上都不对'],
        0,
      ],
      ['JavaScript中fetch如何上传文件？', ['FormData', 'Blob', 'File', 'ArrayBuffer'], 0],
      [
        'JavaScript中fetch如何下载文件？',
        ['response.blob()', 'response.text()', 'response.json()', 'response.file()'],
        0,
      ],
      [
        'JavaScript中fetch如何获取进度？',
        ['无法直接获取', 'progress事件', 'onprogress', 'loading事件'],
        0,
      ],
      [
        'JavaScript中XMLHttpRequest如何获取上传进度？',
        ['upload.onprogress', 'onprogress', 'progress事件', 'loading事件'],
        0,
      ],
      [
        'JavaScript中XMLHttpRequest和fetch的区别？',
        [
          'XHR基于事件，fetch基于Promise',
          '没有区别',
          'fetch基于事件，XHR基于Promise',
          '取决于环境',
        ],
        0,
      ],
      [
        'JavaScript中WebSocket的作用是？',
        ['全双工通信', '半双工通信', '单工通信', '无连接通信'],
        0,
      ],
      ['JavaScript中WebSocket的协议是？', ['ws/wss', 'http/https', 'tcp/udp', 'ftp/sftp'], 0],
      [
        'JavaScript中WebSocket如何创建连接？',
        [
          'new WebSocket(url)',
          'WebSocket.connect(url)',
          'WebSocket.open(url)',
          'WebSocket.create(url)',
        ],
        0,
      ],
      [
        'JavaScript中WebSocket的onopen事件何时触发？',
        ['连接建立时', '连接关闭时', '收到消息时', '发生错误时'],
        0,
      ],
      [
        'JavaScript中WebSocket的onmessage事件何时触发？',
        ['收到消息时', '连接建立时', '连接关闭时', '发生错误时'],
        0,
      ],
      [
        'JavaScript中WebSocket的onclose事件何时触发？',
        ['连接关闭时', '连接建立时', '收到消息时', '发生错误时'],
        0,
      ],
      [
        'JavaScript中WebSocket的onerror事件何时触发？',
        ['发生错误时', '连接建立时', '收到消息时', '连接关闭时'],
        0,
      ],
      ['JavaScript中WebSocket如何发送消息？', ['send()', 'post()', 'write()', 'emit()'], 0],
      ['JavaScript中WebSocket如何关闭连接？', ['close()', 'end()', 'destroy()', 'terminate()'], 0],
      [
        'JavaScript中Server-Sent Events的作用是？',
        ['服务器单向推送', '全双工通信', '半双工通信', '无连接通信'],
        0,
      ],
      [
        'JavaScript中EventSource的作用是？',
        ['接收SSE推送', '发送SSE', '创建WebSocket', '创建HTTP请求'],
        0,
      ],
      [
        'JavaScript中Web Worker的作用是？',
        ['在后台线程中运行脚本', '创建子进程', '创建服务', '创建定时器'],
        0,
      ],
      ['JavaScript中Web Worker可以操作DOM吗？', ['不能', '能', '取决于线程', '取决于环境'], 0],
      ['JavaScript中Web Worker如何通信？', ['postMessage', 'sendMessage', 'emit', 'call'], 0],
      [
        'JavaScript中Service Worker的作用是？',
        ['拦截网络请求，缓存资源', '后台计算', 'UI渲染', 'DOM操作'],
        0,
      ],
      [
        'JavaScript中Service Worker的生命周期有？',
        ['install, activate, fetch', 'create, start, stop', 'open, close', 'connect, disconnect'],
        0,
      ],
      [
        'JavaScript中Worklet的作用是？',
        ['运行特定类型的任务', '后台计算', '网络拦截', 'DOM操作'],
        0,
      ],
      ['JavaScript中Audio Worklet的作用是？', ['音频处理', '视频处理', '图像处理', '网络处理'], 0],
      [
        'JavaScript中Paint Worklet的作用是？',
        ['自定义绘制', '音频处理', '视频处理', '网络处理'],
        0,
      ],
      [
        'JavaScript中Animation Worklet的作用是？',
        ['动画处理', '音频处理', '视频处理', '网络处理'],
        0,
      ],
      [
        'JavaScript中如何实现异步串行？',
        ['await依次执行', 'Promise.all', 'Promise.race', 'forEach'],
        0,
      ],
      ['JavaScript中如何实现异步并行？', ['Promise.all', 'await依次执行', 'for循环', 'reduce'], 0],
      [
        'JavaScript中如何实现异步竞速？',
        ['Promise.race', 'Promise.all', 'await依次执行', 'for循环'],
        0,
      ],
      [
        'JavaScript中异步函数的错误处理最佳实践是？',
        ['try...catch包裹await', '仅使用.catch()', '忽略错误', '全局错误处理'],
        0,
      ],
      [
        'JavaScript中async函数的性能问题？',
        ['可能比Promise略慢', '比Promise快', '没有区别', '取决于引擎'],
        0,
      ],
      [
        'JavaScript中Top-level await的作用是？',
        ['在模块顶层使用await', '在函数中使用await', '在类中使用await', '在全局使用await'],
        0,
      ],
      ['JavaScript中Top-level await在哪个规范中？', ['ES2022', 'ES2017', 'ES2015', 'ES2020'], 0],
    ];

    const item = items[(i - 481) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第六部分：DOM与BOM操作 (601-720) ====================
  for (let i = 601; i <= 720; i++) {
    const q = { id: `js-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      ['JavaScript中DOM的作用是？', ['操作HTML文档', '操作CSS', '操作网络', '操作线程'], 0],
      [
        'JavaScript中document的作用是？',
        ['表示整个HTML文档', '表示DOM节点', '表示元素', '表示属性'],
        0,
      ],
      [
        'JavaScript中getElementById的作用是？',
        ['通过ID获取元素', '通过类名获取元素', '通过标签名获取元素', '通过选择器获取元素'],
        0,
      ],
      [
        'JavaScript中getElementsByClassName的作用是？',
        ['通过类名获取元素集合', '通过ID获取元素', '通过标签名获取元素', '通过选择器获取元素'],
        0,
      ],
      [
        'JavaScript中getElementsByTagName的作用是？',
        ['通过标签名获取元素集合', '通过ID获取元素', '通过类名获取元素', '通过选择器获取元素'],
        0,
      ],
      [
        'JavaScript中querySelector的作用是？',
        ['通过CSS选择器获取第一个元素', '获取所有元素', '获取元素集合', '获取元素数组'],
        0,
      ],
      [
        'JavaScript中querySelectorAll的作用是？',
        ['通过CSS选择器获取所有元素', '获取第一个元素', '获取元素集合', '获取元素数组'],
        0,
      ],
      [
        'JavaScript中createElement的作用是？',
        ['创建元素节点', '创建文本节点', '创建属性节点', '创建注释节点'],
        0,
      ],
      [
        'JavaScript中createTextNode的作用是？',
        ['创建文本节点', '创建元素节点', '创建属性节点', '创建注释节点'],
        0,
      ],
      [
        'JavaScript中createDocumentFragment的作用是？',
        ['创建文档片段', '创建元素节点', '创建文本节点', '创建属性节点'],
        0,
      ],
      [
        'JavaScript中appendChild的作用是？',
        ['添加子节点到末尾', '插入节点到指定位置', '替换节点', '删除节点'],
        0,
      ],
      [
        'JavaScript中insertBefore的作用是？',
        ['在指定节点前插入', '添加子节点到末尾', '替换节点', '删除节点'],
        0,
      ],
      [
        'JavaScript中removeChild的作用是？',
        ['删除子节点', '添加子节点', '替换子节点', '克隆子节点'],
        0,
      ],
      [
        'JavaScript中replaceChild的作用是？',
        ['替换子节点', '添加子节点', '删除子节点', '克隆子节点'],
        0,
      ],
      ['JavaScript中cloneNode的作用是？', ['克隆节点', '删除节点', '替换节点', '移动节点'], 0],
      [
        'JavaScript中cloneNode(true)的作用是？',
        ['深克隆，包含子节点', '浅克隆', '仅克隆属性', '仅克隆文本'],
        0,
      ],
      [
        'JavaScript中cloneNode(false)的作用是？',
        ['浅克隆，不包含子节点', '深克隆', '仅克隆属性', '仅克隆文本'],
        0,
      ],
      [
        'JavaScript中parentNode的作用是？',
        ['获取父节点', '获取子节点', '获取兄弟节点', '获取第一个子节点'],
        0,
      ],
      [
        'JavaScript中childNodes的作用是？',
        ['获取所有子节点', '获取子元素', '获取第一个子节点', '获取最后一个子节点'],
        0,
      ],
      [
        'JavaScript中children的作用是？',
        ['获取子元素', '获取所有子节点', '获取第一个子节点', '获取最后一个子节点'],
        0,
      ],
      [
        'JavaScript中firstChild的作用是？',
        ['获取第一个子节点', '获取第一个子元素', '获取最后一个子节点', '获取父节点'],
        0,
      ],
      [
        'JavaScript中firstElementChild的作用是？',
        ['获取第一个子元素', '获取第一个子节点', '获取最后一个子元素', '获取父元素'],
        0,
      ],
      [
        'JavaScript中lastChild的作用是？',
        ['获取最后一个子节点', '获取最后一个子元素', '获取第一个子节点', '获取父节点'],
        0,
      ],
      [
        'JavaScript中nextSibling的作用是？',
        ['获取下一个兄弟节点', '获取下一个兄弟元素', '获取上一个兄弟节点', '获取父节点'],
        0,
      ],
      [
        'JavaScript中nextElementSibling的作用是？',
        ['获取下一个兄弟元素', '获取下一个兄弟节点', '获取上一个兄弟元素', '获取父元素'],
        0,
      ],
      [
        'JavaScript中previousSibling的作用是？',
        ['获取上一个兄弟节点', '获取上一个兄弟元素', '获取下一个兄弟节点', '获取父节点'],
        0,
      ],
      [
        'JavaScript中previousElementSibling的作用是？',
        ['获取上一个兄弟元素', '获取上一个兄弟节点', '获取下一个兄弟元素', '获取父元素'],
        0,
      ],
      [
        'JavaScript中innerHTML的作用是？',
        ['获取或设置元素HTML内容', '获取或设置文本内容', '获取或设置属性', '获取或设置样式'],
        0,
      ],
      [
        'JavaScript中innerText的作用是？',
        ['获取或设置元素文本内容', '获取或设置HTML内容', '获取或设置属性', '获取或设置样式'],
        0,
      ],
      [
        'JavaScript中textContent的作用是？',
        ['获取或设置元素文本内容', '获取或设置HTML内容', '获取或设置属性', '获取或设置样式'],
        0,
      ],
      [
        'JavaScript中innerText和textContent的区别？',
        ['innerText受CSS影响，textContent不受', '没有区别', 'textContent受CSS影响', '取决于浏览器'],
        0,
      ],
      [
        'JavaScript中getAttribute的作用是？',
        ['获取属性值', '设置属性值', '删除属性', '判断是否有属性'],
        0,
      ],
      [
        'JavaScript中setAttribute的作用是？',
        ['设置属性值', '获取属性值', '删除属性', '判断是否有属性'],
        0,
      ],
      [
        'JavaScript中removeAttribute的作用是？',
        ['删除属性', '获取属性值', '设置属性值', '判断是否有属性'],
        0,
      ],
      [
        'JavaScript中hasAttribute的作用是？',
        ['判断是否有属性', '获取属性值', '设置属性值', '删除属性'],
        0,
      ],
      [
        'JavaScript中attributes的作用是？',
        ['获取所有属性集合', '获取属性值', '设置属性值', '删除属性'],
        0,
      ],
      ['JavaScript中dataset的作用是？', ['操作data-*属性', '操作class', '操作style', '操作id'], 0],
      [
        'JavaScript中style属性的作用是？',
        ['操作内联样式', '操作计算样式', '操作样式表', '操作CSS类'],
        0,
      ],
      [
        'JavaScript中getComputedStyle的作用是？',
        ['获取计算后的样式', '获取内联样式', '设置样式', '操作CSS类'],
        0,
      ],
      [
        'JavaScript中className的作用是？',
        ['获取或设置class属性', '获取或设置id', '获取或设置style', '获取或设置tag'],
        0,
      ],
      [
        'JavaScript中classList的作用是？',
        ['操作class列表', '操作class属性', '操作style', '操作id'],
        0,
      ],
      ['JavaScript中classList.add的作用是？', ['添加类', '删除类', '切换类', '判断是否包含类'], 0],
      [
        'JavaScript中classList.remove的作用是？',
        ['删除类', '添加类', '切换类', '判断是否包含类'],
        0,
      ],
      [
        'JavaScript中classList.toggle的作用是？',
        ['切换类', '添加类', '删除类', '判断是否包含类'],
        0,
      ],
      [
        'JavaScript中classList.contains的作用是？',
        ['判断是否包含类', '添加类', '删除类', '切换类'],
        0,
      ],
      [
        'JavaScript中addEventListener的作用是？',
        ['添加事件监听', '移除事件监听', '触发事件', '创建事件'],
        0,
      ],
      [
        'JavaScript中removeEventListener的作用是？',
        ['移除事件监听', '添加事件监听', '触发事件', '创建事件'],
        0,
      ],
      [
        'JavaScript中dispatchEvent的作用是？',
        ['触发事件', '添加事件监听', '移除事件监听', '创建事件'],
        0,
      ],
      [
        'JavaScript中addEventListener的第三个参数是？',
        ['选项对象或useCapture', '回调函数', '事件名称', '目标元素'],
        0,
      ],
      [
        'JavaScript中事件冒泡是指？',
        ['事件从子元素向父元素传播', '事件从父元素向子元素传播', '事件不传播', '事件随机传播'],
        0,
      ],
      [
        'JavaScript中事件捕获是指？',
        ['事件从父元素向子元素传播', '事件从子元素向父元素传播', '事件不传播', '事件随机传播'],
        0,
      ],
      [
        'JavaScript中DOM事件流的顺序是？',
        [
          '捕获 -> 目标 -> 冒泡',
          '冒泡 -> 目标 -> 捕获',
          '目标 -> 捕获 -> 冒泡',
          '捕获 -> 冒泡 -> 目标',
        ],
        0,
      ],
      [
        'JavaScript中event.stopPropagation的作用是？',
        ['阻止事件传播', '阻止默认行为', '阻止事件监听', '阻止事件触发'],
        0,
      ],
      [
        'JavaScript中event.preventDefault的作用是？',
        ['阻止默认行为', '阻止事件传播', '阻止事件监听', '阻止事件触发'],
        0,
      ],
      [
        'JavaScript中event.target的作用是？',
        ['获取触发事件的元素', '获取绑定事件的元素', '获取父元素', '获取子元素'],
        0,
      ],
      [
        'JavaScript中event.currentTarget的作用是？',
        ['获取绑定事件的元素', '获取触发事件的元素', '获取父元素', '获取子元素'],
        0,
      ],
      [
        'JavaScript中事件委托的原理是？',
        ['利用事件冒泡', '利用事件捕获', '利用事件传播', '利用事件触发'],
        0,
      ],
      [
        'JavaScript中事件委托的优点是？',
        ['减少内存消耗，动态绑定', '提高性能', '代码简洁', '以上都是'],
        3,
      ],
      [
        'JavaScript中如何阻止链接默认跳转？',
        ['preventDefault()', 'stopPropagation()', 'stopImmediatePropagation()', 'cancelBubble'],
        0,
      ],
      [
        'JavaScript中如何阻止事件冒泡？',
        ['stopPropagation()', 'preventDefault()', 'stopImmediatePropagation()', 'cancelBubble'],
        0,
      ],
      [
        'JavaScript中stopImmediatePropagation的作用是？',
        ['阻止后续同类型事件监听', '阻止事件冒泡', '阻止默认行为', '阻止事件触发'],
        0,
      ],
      [
        'JavaScript中如何创建自定义事件？',
        ['new CustomEvent()', 'new Event()', 'document.createEvent()', '以上都是'],
        3,
      ],
      [
        'JavaScript中CustomEvent和Event的区别是？',
        ['CustomEvent可以传数据', '没有区别', 'Event可以传数据', '取决于浏览器'],
        0,
      ],
      [
        'JavaScript中如何传递数据给事件监听器？',
        ['CustomEvent的detail属性', 'Event的data属性', 'Event的detail属性', '以上都不对'],
        0,
      ],
      [
        'JavaScript中window对象的作用是？',
        ['表示浏览器窗口', '表示文档', '表示元素', '表示节点'],
        0,
      ],
      [
        'JavaScript中document对象的作用是？',
        ['表示HTML文档', '表示窗口', '表示元素', '表示节点'],
        0,
      ],
      [
        'JavaScript中navigator对象的作用是？',
        ['获取浏览器信息', '获取URL信息', '获取历史记录', '获取屏幕信息'],
        0,
      ],
      [
        'JavaScript中location对象的作用是？',
        ['获取和设置URL', '获取浏览器信息', '获取历史记录', '获取屏幕信息'],
        0,
      ],
      [
        'JavaScript中history对象的作用是？',
        ['操作浏览器历史记录', '获取URL信息', '获取浏览器信息', '获取屏幕信息'],
        0,
      ],
      [
        'JavaScript中screen对象的作用是？',
        ['获取屏幕信息', '获取URL信息', '获取浏览器信息', '获取历史记录'],
        0,
      ],
      [
        'JavaScript中location.href的作用是？',
        ['获取或设置完整URL', '获取主机名', '获取路径', '获取协议'],
        0,
      ],
      [
        'JavaScript中location.reload的作用是？',
        ['重新加载页面', '跳转页面', '替换页面', '获取URL'],
        0,
      ],
      [
        'JavaScript中location.assign的作用是？',
        ['跳转到新页面', '替换当前页面', '重新加载页面', '获取URL'],
        0,
      ],
      [
        'JavaScript中location.replace的作用是？',
        ['替换当前页面', '跳转到新页面', '重新加载页面', '获取URL'],
        0,
      ],
      [
        'JavaScript中location.replace和assign的区别？',
        ['replace不保留历史记录', 'assign不保留历史记录', '没有区别', '取决于浏览器'],
        0,
      ],
      [
        'JavaScript中history.pushState的作用是？',
        ['添加历史记录', '替换历史记录', '获取历史记录', '删除历史记录'],
        0,
      ],
      [
        'JavaScript中history.replaceState的作用是？',
        ['替换历史记录', '添加历史记录', '获取历史记录', '删除历史记录'],
        0,
      ],
      [
        'JavaScript中popstate事件何时触发？',
        ['历史记录切换时', '页面加载时', '页面关闭时', '页面刷新时'],
        0,
      ],
      [
        'JavaScript中hashchange事件何时触发？',
        ['URL的hash变化时', 'URL变化时', '页面加载时', '页面刷新时'],
        0,
      ],
      [
        'JavaScript中如何获取页面滚动位置？',
        ['document.documentElement.scrollTop', 'window.scrollY', 'pageYOffset', '以上都是'],
        3,
      ],
      [
        'JavaScript中scrollTo的作用是？',
        ['滚动到指定位置', '滚动指定距离', '获取滚动位置', '监听滚动'],
        0,
      ],
      [
        'JavaScript中scrollBy的作用是？',
        ['滚动指定距离', '滚动到指定位置', '获取滚动位置', '监听滚动'],
        0,
      ],
      [
        'JavaScript中如何获取元素尺寸？',
        ['getBoundingClientRect()', 'offsetWidth', 'clientWidth', '以上都是'],
        3,
      ],
      [
        'JavaScript中offsetWidth包含什么？',
        ['内容+内边距+边框', '仅内容', '内容+内边距', '内容+边框'],
        0,
      ],
      [
        'JavaScript中clientWidth包含什么？',
        ['内容+内边距', '仅内容', '内容+边框', '内容+内边距+边框'],
        0,
      ],
      [
        'JavaScript中scrollWidth包含什么？',
        ['实际内容宽度+内边距', '可见宽度', '可见宽度+边框', '实际内容宽度+边框'],
        0,
      ],
      [
        'JavaScript中offsetTop的作用是？',
        [
          '获取元素到定位父元素的距离',
          '获取元素到文档顶部的距离',
          '获取元素到视口的距离',
          '获取元素到父元素的距离',
        ],
        0,
      ],
      [
        'JavaScript中getBoundingClientRect返回什么？',
        ['元素相对视口的位置和尺寸', '元素相对文档的位置和尺寸', '元素的偏移量', '元素的滚动量'],
        0,
      ],
      [
        'JavaScript中IntersectionObserver的作用是？',
        ['监听元素交叉比例', '监听元素尺寸', '监听元素属性', '监听元素内容'],
        0,
      ],
      [
        'JavaScript中IntersectionObserver的应用场景？',
        ['懒加载，无限滚动', '动画', '事件监听', '样式修改'],
        0,
      ],
      [
        'JavaScript中ResizeObserver的作用是？',
        ['监听元素尺寸变化', '监听元素交叉', '监听元素属性', '监听元素内容'],
        0,
      ],
      [
        'JavaScript中MutationObserver的作用是？',
        ['监听DOM变化', '监听元素尺寸', '监听元素交叉', '监听元素属性'],
        0,
      ],
      [
        'JavaScript中MutationObserver可以监听什么？',
        ['子节点，属性，文本内容', '仅子节点', '仅属性', '仅文本内容'],
        0,
      ],
      [
        'JavaScript中PerformanceObserver的作用是？',
        ['监听性能指标', '监听DOM变化', '监听元素尺寸', '监听元素属性'],
        0,
      ],
      [
        'JavaScript中requestIdleCallback的作用是？',
        ['在浏览器空闲时执行任务', '在下一帧执行任务', '立即执行任务', '延迟执行任务'],
        0,
      ],
      ['JavaScript中cookie的作用是？', ['存储少量数据', '存储大量数据', '存储文件', '存储对象'], 0],
      ['JavaScript中cookie的大小限制是？', ['约4KB', '约1MB', '约5MB', '无限制'], 0],
      [
        'JavaScript中localStorage的作用是？',
        ['持久化存储数据', '会话存储数据', '存储Cookie', '存储Session'],
        0,
      ],
      [
        'JavaScript中sessionStorage的作用是？',
        ['会话存储数据', '持久化存储数据', '存储Cookie', '存储Session'],
        0,
      ],
      [
        'JavaScript中localStorage和sessionStorage的区别？',
        [
          'localStorage持久，sessionStorage会话级',
          '没有区别',
          'sessionStorage持久，localStorage会话级',
          '取决于浏览器',
        ],
        0,
      ],
      ['JavaScript中Web Storage的大小限制是？', ['约5MB', '约4KB', '约1MB', '无限制'], 0],
      ['JavaScript中IndexedDB的作用是？', ['客户端数据库', '缓存', '会话存储', 'Cookie存储'], 0],
      [
        'JavaScript中IndexedDB是关系型数据库吗？',
        ['不是，是NoSQL', '是', '取决于实现', '以上都不对'],
        0,
      ],
      ['JavaScript中IndexedDB是异步还是同步？', ['异步', '同步', '取决于操作', '取决于浏览器'], 0],
      ['JavaScript中Cache API的作用是？', ['缓存网络请求', '缓存DOM', '缓存计算', '缓存事件'], 0],
      [
        'JavaScript中如何操作Cookie？',
        ['document.cookie', 'document.cookieAPI', 'window.cookie', 'navigator.cookie'],
        0,
      ],
      [
        'JavaScript中document.cookie返回什么？',
        ['所有Cookie的字符串', 'Cookie对象', 'Cookie数组', 'Cookie Map'],
        0,
      ],
      [
        'JavaScript中如何删除Cookie？',
        ['设置过期时间为过去', 'delete cookie', 'cookie.remove()', 'cookie.clear()'],
        0,
      ],
      [
        'JavaScript中HttpOnly Cookie的作用是？',
        ['防止XSS读取', '防止CSRF', '防止点击劫持', '防止中间人攻击'],
        0,
      ],
      [
        'JavaScript中Secure Cookie的作用是？',
        ['仅HTTPS传输', '防止XSS', '防止CSRF', '防止点击劫持'],
        0,
      ],
      [
        'JavaScript中SameSite Cookie的作用是？',
        ['防止CSRF', '防止XSS', '防止点击劫持', '防止中间人攻击'],
        0,
      ],
      [
        'JavaScript中如何实现拖拽？',
        [
          'dragstart, drag, dragend',
          'mousedown, mousemove, mouseup',
          'touchstart, touchmove, touchend',
          '以上都是',
        ],
        3,
      ],
      ['JavaScript中dragstart事件何时触发？', ['开始拖拽时', '拖拽中', '拖拽结束', '放置时'], 0],
      ['JavaScript中dragover事件的作用是？', ['指示放置目标', '开始拖拽', '拖拽中', '拖拽结束'], 0],
      ['JavaScript中drop事件何时触发？', ['放置时', '开始拖拽', '拖拽中', '拖拽结束'], 0],
      [
        'JavaScript中如何阻止默认拖拽行为？',
        ['preventDefault()', 'stopPropagation()', 'return false', 'ignoreDefault()'],
        0,
      ],
      ['JavaScript中File API的作用是？', ['读取文件信息', '写入文件', '删除文件', '修改文件'], 0],
      [
        'JavaScript中DragEvent的dataTransfer作用是？',
        ['保存拖拽数据', '保存事件信息', '保存元素信息', '保存样式信息'],
        0,
      ],
    ];
    const item = items[(i - 601) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第七部分：执行上下文与内存管理 (721-840) ====================
  for (let i = 721; i <= 840; i++) {
    const q = { id: `js-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'JavaScript中执行上下文的类型有？',
        ['全局，函数，Eval', '仅全局和函数', '仅全局', '仅函数'],
        0,
      ],
      [
        'JavaScript中执行上下文的生命周期有？',
        ['创建，执行，回收', '仅创建和执行', '仅执行', '仅创建'],
        0,
      ],
      [
        'JavaScript中创建阶段做了什么？',
        ['创建变量对象，建立作用域链，确定this', '执行代码', '回收内存', '以上都不对'],
        0,
      ],
      [
        'JavaScript中变量对象包含什么？',
        ['变量声明，函数声明，参数', '仅变量声明', '仅函数声明', '仅参数'],
        0,
      ],
      [
        'JavaScript中作用域链的作用是？',
        ['保证有序访问变量', '创建变量', '执行代码', '回收内存'],
        0,
      ],
      [
        'JavaScript中作用域链的查找规则是？',
        ['从内到外，直到全局', '从外到内', '随机查找', '就近查找'],
        0,
      ],
      [
        'JavaScript中变量提升是指？',
        ['声明被提升到作用域顶部', '赋值被提升', '初始化被提升', '以上都不对'],
        0,
      ],
      [
        'JavaScript中函数声明和函数表达式的提升区别？',
        ['函数声明整体提升，表达式仅声明提升', '都整体提升', '都不提升', '取决于严格模式'],
        0,
      ],
      [
        'JavaScript中let/const有变量提升吗？',
        ['有，但存在TDZ', '没有', '有，且可访问', '取决于环境'],
        0,
      ],
      [
        'JavaScript中暂时性死区是指？',
        ['let/const声明前不可访问的区域', 'var声明前不可访问', '函数声明前不可访问', '以上都不对'],
        0,
      ],
      ['JavaScript中闭包是指？', ['函数和其词法环境的组合', '嵌套函数', '回调函数', '箭头函数'], 0],
      ['JavaScript中闭包的作用是？', ['数据私有化，状态保持', '创建对象', '继承', '多态'], 0],
      ['JavaScript中闭包的缺点是？', ['可能导致内存泄漏', '性能差', '语法复杂', '不兼容ES6'], 0],
      [
        'JavaScript中如何避免闭包导致的内存泄漏？',
        ['及时释放引用', '使用var', '使用全局变量', '不使用闭包'],
        0,
      ],
      [
        'JavaScript中词法作用域是指？',
        ['函数定义时确定作用域', '函数调用时确定作用域', '运行时确定作用域', '编译时确定作用域'],
        0,
      ],
      [
        'JavaScript中动态作用域是指？',
        ['函数调用时确定作用域', '函数定义时确定作用域', '以上都不对', 'JavaScript使用动态作用域'],
        0,
      ],
      [
        'JavaScript中使用的是哪种作用域？',
        ['词法作用域', '动态作用域', '两者都有', '取决于环境'],
        0,
      ],
      ['JavaScript中with和eval可以改变作用域吗？', ['可以', '不可以', '仅with', '仅eval'], 0],
      ['JavaScript中作用域的类型有？', ['全局，函数，块级', '仅全局和函数', '仅全局', '仅函数'], 0],
      ['JavaScript中块级作用域由什么创建？', ['let/const, class, 函数', 'var', 'if', 'for'], 0],
      [
        'JavaScript中IIFE的作用是？',
        ['创建独立作用域，避免污染全局', '创建闭包', '创建类', '创建模块'],
        0,
      ],
      [
        'JavaScript中IIFE的写法是？',
        ['(function(){})()', 'function(){}()', '!function(){}()', '以上都是'],
        3,
      ],
      [
        'JavaScript中this在全局作用域指向？',
        ['全局对象', 'undefined', '当前对象', '取决于环境'],
        0,
      ],
      ['JavaScript中this在普通函数指向？', ['调用者', '定义者', '全局对象', 'undefined'], 0],
      [
        'JavaScript中this在箭头函数指向？',
        ['定义时所在上下文', '调用者', '全局对象', 'undefined'],
        0,
      ],
      [
        'JavaScript中this在构造函数指向？',
        ['新创建的对象', '全局对象', '原型对象', 'undefined'],
        0,
      ],
      [
        'JavaScript中this在事件处理指向？',
        ['触发事件的元素', '全局对象', '定义者', 'undefined'],
        0,
      ],
      ['JavaScript中this在定时器指向？', ['全局对象', '定义者', '调用者', 'undefined'], 0],
      [
        'JavaScript中如何改变this指向？',
        ['call, apply, bind', 'this = obj', 'changeThis', 'setThis'],
        0,
      ],
      [
        'JavaScript中call和apply的区别？',
        ['参数传递方式不同', 'this指向不同', '执行时机不同', '没有区别'],
        0,
      ],
      [
        'JavaScript中bind和call/apply的区别？',
        ['bind返回函数，call/apply立即执行', '没有区别', 'call/apply返回函数', '取决于参数'],
        0,
      ],
      [
        'JavaScript中垃圾回收的算法有？',
        ['引用计数，标记清除', '仅引用计数', '仅标记清除', '手动回收'],
        0,
      ],
      [
        'JavaScript中引用计数的缺点是？',
        ['无法处理循环引用', '性能差', '内存泄漏', '以上都不对'],
        0,
      ],
      ['JavaScript中标记清除的优点是？', ['解决循环引用', '性能好', '实时回收', '以上都不对'], 0],
      ['JavaScript中V8的垃圾回收策略是？', ['分代回收', '引用计数', '标记压缩', '复制算法'], 0],
      ['JavaScript中V8的新生代回收算法是？', ['Scavenge', '标记清除', '标记压缩', '引用计数'], 0],
      [
        'JavaScript中V8的老生代回收算法是？',
        ['标记清除和标记压缩', 'Scavenge', '引用计数', '复制算法'],
        0,
      ],
      [
        'JavaScript中V8的新生代空间分为？',
        ['From和To', 'Eden和Survivor', 'Young和Old', '以上都不对'],
        0,
      ],
      [
        'JavaScript中V8的Scavenge算法的过程是？',
        ['复制存活对象到To，交换From和To', '标记存活对象', '压缩内存', '引用计数'],
        0,
      ],
      [
        'JavaScript中V8的增量标记的作用是？',
        ['减少停顿时间', '提高吞吐量', '减少内存', '以上都不对'],
        0,
      ],
      [
        'JavaScript中V8的并发回收的作用是？',
        ['提高回收效率', '减少停顿时间', '减少内存', '以上都不对'],
        0,
      ],
      [
        'JavaScript中内存泄漏的常见原因？',
        ['意外全局变量，闭包，未清除定时器，DOM引用', '仅闭包', '仅全局变量', '仅定时器'],
        0,
      ],
      [
        'JavaScript中如何检测内存泄漏？',
        ['Chrome DevTools Memory面板', 'Performance面板', 'Console面板', 'Network面板'],
        0,
      ],
      [
        'JavaScript中如何避免内存泄漏？',
        ['减少全局变量，清除定时器，解除引用', '使用var', '不使用闭包', '手动GC'],
        0,
      ],
      [
        'JavaScript中WeakMap/WeakSet如何帮助GC？',
        ['弱引用不阻止回收', '强引用', '标记引用', '以上都不对'],
        0,
      ],
      [
        'JavaScript中如何触发垃圾回收？',
        ['无法直接触发', 'System.gc()', 'collectGarbage()', 'GC.collect()'],
        0,
      ],
      [
        'JavaScript中堆内存和栈内存的区别？',
        ['栈存基本类型和引用，堆存对象', '栈存对象，堆存基本类型', '没有区别', '取决于环境'],
        0,
      ],
      ['JavaScript中栈溢出是指？', ['调用栈超出最大深度', '内存不足', '堆溢出', '以上都不对'], 0],
      [
        'JavaScript中如何避免栈溢出？',
        ['使用尾递归优化，改为循环', '增加内存', '减少变量', '以上都不对'],
        0,
      ],
      [
        'JavaScript中尾递归优化是指？',
        ['编译器将尾递归转为循环', '增加栈空间', '减少调用', '以上都不对'],
        0,
      ],
      [
        'JavaScript中严格模式支持尾递归优化吗？',
        ['仅在严格模式下支持', '支持', '不支持', '取决于环境'],
        0,
      ],
      [
        'JavaScript中V8引擎的编译流程是？',
        ['解析 -> 生成AST -> 生成字节码 -> JIT编译', '解析 -> 执行', '编译 -> 运行', '以上都不对'],
        0,
      ],
      [
        'JavaScript中AST的作用是？',
        ['表示代码的抽象语法结构', '执行代码', '编译代码', '优化代码'],
        0,
      ],
      ['JavaScript中Ignition的作用是？', ['解释执行字节码', '编译代码', '优化代码', '垃圾回收'], 0],
      [
        'JavaScript中TurboFan的作用是？',
        ['JIT编译优化热点代码', '解释执行', '垃圾回收', '解析代码'],
        0,
      ],
      ['JavaScript中内联缓存的作用是？', ['加速属性访问', '缓存函数', '缓存对象', '缓存代码'], 0],
      [
        'JavaScript中隐藏类的作用是？',
        ['优化对象属性访问', '隐藏实现', '封装属性', '以上都不对'],
        0,
      ],
      [
        'JavaScript中如何优化对象属性访问？',
        ['保持对象形状一致', '使用delete', '使用不同类型', '以上都不对'],
        0,
      ],
      [
        'JavaScript中delete操作对性能的影响？',
        ['改变隐藏类，降低性能', '没有影响', '提高性能', '取决于对象'],
        0,
      ],
      [
        'JavaScript中如何优化数组操作？',
        ['避免空洞，保持类型一致', '使用delete', '使用不同类型', '以上都不对'],
        0,
      ],
      [
        'JavaScript中事件循环与V8的关系？',
        ['V8负责执行代码，事件循环负责调度', '没有关系', 'V8包含事件循环', '事件循环包含V8'],
        0,
      ],
      [
        'JavaScript中libuv的作用是？',
        ['提供事件循环和异步I/O', '执行JavaScript', '编译代码', '垃圾回收'],
        0,
      ],
      [
        'JavaScript中如何分析性能？',
        ['Chrome DevTools Performance', 'Console', 'Memory', 'Network'],
        0,
      ],
      [
        'JavaScript中如何分析CPU使用？',
        ['CPU Profiler', 'Memory Profiler', 'Network Profiler', 'Console'],
        0,
      ],
      [
        'JavaScript中如何分析堆内存？',
        ['Heap Snapshot', 'CPU Profile', 'Network Profile', 'Console'],
        0,
      ],
      [
        'JavaScript中如何分析内存分配？',
        ['Allocation Timeline', 'CPU Profile', 'Network Profile', 'Console'],
        0,
      ],
      [
        'JavaScript中如何分析垃圾回收？',
        ['GC日志', 'Heap Snapshot', 'CPU Profile', 'Network Profile'],
        0,
      ],
      ['JavaScript中Lighthouse的作用是？', ['性能审计', '代码审查', '单元测试', '集成测试'], 0],
      [
        'JavaScript中性能指标FP是指？',
        ['首次绘制', '首次内容绘制', '首次有意义绘制', '交互时间'],
        0,
      ],
      [
        'JavaScript中性能指标FCP是指？',
        ['首次内容绘制', '首次绘制', '首次有意义绘制', '交互时间'],
        0,
      ],
      [
        'JavaScript中性能指标FMP是指？',
        ['首次有意义绘制', '首次绘制', '首次内容绘制', '交互时间'],
        0,
      ],
      [
        'JavaScript中性能指标TTI是指？',
        ['可交互时间', '首次绘制', '首次内容绘制', '首次有意义绘制'],
        0,
      ],
      [
        'JavaScript中性能指标LCP是指？',
        ['最大内容绘制', '首次绘制', '首次内容绘制', '交互时间'],
        0,
      ],
      [
        'JavaScript中性能指标FID是指？',
        ['首次输入延迟', '首次绘制', '首次内容绘制', '交互时间'],
        0,
      ],
      [
        'JavaScript中性能指标CLS是指？',
        ['累积布局偏移', '首次绘制', '首次内容绘制', '交互时间'],
        0,
      ],
      [
        'JavaScript中如何减少重排重绘？',
        ['批量修改DOM，使用CSS动画', '频繁修改样式', '使用table布局', '以上都不对'],
        0,
      ],
      ['JavaScript中如何优化长列表？', ['虚拟列表', '分页', '懒加载', '以上都是'], 3],
      [
        'JavaScript中虚拟列表的原理是？',
        ['仅渲染可见区域', '渲染所有项', '分页加载', '延迟加载'],
        0,
      ],
      [
        'JavaScript中如何优化动画性能？',
        ['使用transform和opacity', '使用top和left', '使用width和height', '以上都不对'],
        0,
      ],
      [
        'JavaScript中requestAnimationFrame的优势？',
        ['与屏幕刷新同步，避免掉帧', '性能更好', '语法简单', '以上都不对'],
        0,
      ],
      ['JavaScript中防抖的作用是？', ['减少高频触发频率', '延迟执行', '立即执行', '以上都不对'], 0],
      ['JavaScript中节流的作用是？', ['限制执行频率', '延迟执行', '立即执行', '以上都不对'], 0],
      [
        'JavaScript中防抖和节流的区别？',
        ['防抖最后一次执行，节流定期执行', '没有区别', '节流最后一次执行', '取决于实现'],
        0,
      ],
      [
        'JavaScript中如何实现防抖？',
        ['setTimeout + clearTimeout', 'setInterval', 'requestAnimationFrame', '以上都不对'],
        0,
      ],
      [
        'JavaScript中如何实现节流？',
        ['时间戳或定时器', '仅setTimeout', '仅setInterval', '以上都不对'],
        0,
      ],
      [
        'JavaScript中图片懒加载的原理是？',
        ['图片进入视口才加载', '延迟加载', '预加载', '以上都不对'],
        0,
      ],
      ['JavaScript中预加载的作用是？', ['提前加载资源', '延迟加载', '按需加载', '以上都不对'], 0],
      [
        'JavaScript中如何实现预加载？',
        ['link rel="preload"', 'lazy属性', 'IntersectionObserver', '以上都不对'],
        0,
      ],
      [
        'JavaScript中代码分割的作用是？',
        ['按需加载代码', '减少代码量', '合并代码', '以上都不对'],
        0,
      ],
      [
        'JavaScript中Tree Shaking的作用是？',
        ['删除未使用代码', '压缩代码', '合并代码', '以上都不对'],
        0,
      ],
      [
        'JavaScript中Tree Shaking的前提是？',
        ['使用ES6模块', '使用CommonJS', '使用AMD', '以上都不对'],
        0,
      ],
      [
        'JavaScript中压缩代码的作用是？',
        ['减少文件大小', '提高执行速度', '增加安全性', '以上都不对'],
        0,
      ],
      [
        'JavaScript中混淆代码的作用是？',
        ['增加逆向难度', '减少文件大小', '提高执行速度', '以上都不对'],
        0,
      ],
      [
        'JavaScript中Source Map的作用是？',
        ['映射压缩代码到源代码', '压缩代码', '混淆代码', '以上都不对'],
        0,
      ],
      [
        'JavaScript中如何检测代码覆盖率？',
        ['Coverage工具', 'Performance工具', 'Memory工具', 'Network工具'],
        0,
      ],
      [
        'JavaScript中如何优化启动性能？',
        ['代码分割，懒加载，预加载', '增加代码量', '同步加载', '以上都不对'],
        0,
      ],
      [
        'JavaScript中Web Vitals包括哪些指标？',
        ['LCP, FID, CLS', 'FCP, TTI', 'FP, FMP', '以上都不对'],
        0,
      ],
      [
        'JavaScript中如何监控性能？',
        ['PerformanceObserver', 'performance.now()', 'Date.now()', '以上都是'],
        3,
      ],
      [
        'JavaScript中performance.now()的作用是？',
        ['高精度时间戳', '低精度时间戳', '日期对象', '以上都不对'],
        0,
      ],
      [
        'JavaScript中performance.mark的作用是？',
        ['设置时间标记', '获取时间戳', '测量时间', '以上都不对'],
        0,
      ],
      [
        'JavaScript中performance.measure的作用是？',
        ['测量时间间隔', '设置时间标记', '获取时间戳', '以上都不对'],
        0,
      ],
      [
        'JavaScript中如何优化JSON解析？',
        ['使用Web Worker', '使用eval', '使用正则', '以上都不对'],
        0,
      ],
      [
        'JavaScript中如何优化正则表达式？',
        ['避免回溯，使用非捕获组', '使用长正则', '使用捕获组', '以上都不对'],
        0,
      ],
      [
        'JavaScript中如何优化条件判断？',
        ['使用查找表，提前返回', '使用if-else', '使用switch', '以上都不对'],
        0,
      ],
      [
        'JavaScript中如何优化循环？',
        ['减少循环内计算，使用while', '使用for-in', '使用forEach', '以上都不对'],
        0,
      ],
      [
        'JavaScript中如何优化字符串拼接？',
        ['使用数组join', '使用+=', '使用concat', '以上都不对'],
        0,
      ],
    ];
    const item = items[(i - 721) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第八部分：ES6+ 新特性 (841-940) ====================
  for (let i = 841; i <= 940; i++) {
    const q = { id: `js-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'JavaScript中ES6的模块化使用什么关键字？',
        ['import/export', 'require/module.exports', 'include', 'using'],
        0,
      ],
      [
        'JavaScript中export default的作用是？',
        ['导出默认模块', '导出命名模块', '导入模块', '定义模块'],
        0,
      ],
      [
        'JavaScript中import的静态导入是在什么时候解析？',
        ['编译时', '运行时', '执行时', '以上都不对'],
        0,
      ],
      ['JavaScript中import()动态导入返回什么？', ['Promise', '模块对象', 'undefined', '字符串'], 0],
      [
        'JavaScript中动态导入的应用场景？',
        ['按需加载，代码分割', '静态导入', '以上都不对', '模块合并'],
        0,
      ],
      [
        'JavaScript中ES6模块和CommonJS的区别？',
        ['ES6输出引用，CommonJS输出值拷贝', '没有区别', 'CommonJS输出引用', '取决于环境'],
        0,
      ],
      ['JavaScript中ES6模块的this指向？', ['undefined', '全局对象', '模块对象', '取决于环境'], 0],
      [
        'JavaScript中CommonJS的this指向？',
        ['module.exports', '全局对象', 'undefined', '取决于环境'],
        0,
      ],
      [
        'JavaScript中如何实现模块的循环依赖？',
        ['ES6能获取已执行部分，CommonJS获取不完整', '无法实现', '都会报错', '取决于环境'],
        0,
      ],
      [
        'JavaScript中解构赋值的默认值何时生效？',
        ['严格等于undefined时', '等于null时', '等于false时', '等于0时'],
        0,
      ],
      [
        'JavaScript中解构赋值如何用于函数参数？',
        ['function fn({a, b}) {}', 'function fn(a, b) {}', 'function fn([a, b]) {}', '以上都是'],
        3,
      ],
      [
        'JavaScript中展开运算符和Object.assign的区别？',
        ['展开创建新对象，assign修改目标对象', '没有区别', 'assign创建新对象', '取决于参数'],
        0,
      ],
      [
        'JavaScript中Symbol作为属性的特点？',
        ['不可枚举，不会出现在for...in', '可枚举', '公开属性', '以上都不对'],
        0,
      ],
      [
        'JavaScript中Iterator的遍历过程是？',
        ['创建指针，调用next，返回value和done', '直接遍历', '获取长度', '以上都不对'],
        0,
      ],
      [
        'JavaScript中Generator的yield表达式返回值？',
        ['undefined', 'yield后的值', 'next参数', '以上都不对'],
        0,
      ],
      [
        'JavaScript中Generator的next参数替换谁？',
        ['上一个yield的返回值', '当前yield的值', '下一个yield的值', '以上都不对'],
        0,
      ],
      [
        'JavaScript中Promise的all方法返回顺序？',
        ['按传入顺序', '按完成顺序', '随机顺序', '以上都不对'],
        0,
      ],
      [
        'JavaScript中Promise的race方法返回？',
        ['第一个完成的Promise结果', '最后一个完成的结果', '所有结果的数组', '以上都不对'],
        0,
      ],
      ['JavaScript中async函数的返回值？', ['Promise', '普通值', 'undefined', '以上都不对'], 0],
      [
        'JavaScript中await的错误处理方式？',
        ['try...catch', '.catch()', 'error事件', '以上都不对'],
        0,
      ],
      [
        'JavaScript中class的静态方法如何调用？',
        ['类名.方法名()', '实例.方法名()', 'prototype.方法名()', '以上都不对'],
        0,
      ],
      [
        'JavaScript中class的私有方法如何定义？',
        ['#方法名', '_方法名', 'private方法名', '@方法名'],
        0,
      ],
      [
        'JavaScript中Proxy的get拦截器何时触发？',
        ['读取属性时', '设置属性时', '删除属性时', '遍历属性时'],
        0,
      ],
      [
        'JavaScript中Proxy的set拦截器何时触发？',
        ['设置属性时', '读取属性时', '删除属性时', '遍历属性时'],
        0,
      ],
      [
        'JavaScript中Proxy的has拦截器何时触发？',
        ['in操作符时', '读取属性时', '设置属性时', '删除属性时'],
        0,
      ],
      [
        'JavaScript中Proxy的deleteProperty拦截器何时触发？',
        ['delete操作时', '读取属性时', '设置属性时', '遍历属性时'],
        0,
      ],
      [
        'JavaScript中Proxy的ownKeys拦截器何时触发？',
        ['Object.getOwnPropertyNames时', '读取属性时', '设置属性时', '删除属性时'],
        0,
      ],
      [
        'JavaScript中Reflect的apply方法相当于？',
        ['Function.prototype.apply', 'Function.prototype.call', 'new Function', '以上都不对'],
        0,
      ],
      ['JavaScript中Reflect的construct方法相当于？', ['new', 'apply', 'call', 'bind'], 0],
      [
        'JavaScript中Map的forEach回调参数顺序？',
        ['value, key, map', 'key, value, map', 'value, index, map', '以上都不对'],
        0,
      ],
      [
        'JavaScript中Set的forEach回调参数顺序？',
        ['value, value, set', 'value, key, set', 'key, value, set', '以上都不对'],
        0,
      ],
      [
        'JavaScript中WeakMap的用途？',
        ['存储私有数据，缓存', '遍历数据', '共享数据', '以上都不对'],
        0,
      ],
      [
        'JavaScript中WeakSet的用途？',
        ['标记对象，存储对象', '遍历数据', '共享数据', '以上都不对'],
        0,
      ],
      [
        'JavaScript中ES2016的新特性有？',
        ['includes, 指数运算符**', 'async/await', 'Proxy', 'Symbol'],
        0,
      ],
      [
        'JavaScript中ES2017的新特性有？',
        ['async/await, Object.values/entries', 'includes', 'Proxy', 'Symbol'],
        0,
      ],
      [
        'JavaScript中ES2018的新特性有？',
        ['异步迭代, 对象剩余/展开, Promise.finally', 'async/await', 'includes', 'Proxy'],
        0,
      ],
      [
        'JavaScript中ES2019的新特性有？',
        [
          'Array.flat/flatMap, Object.fromEntries, trimStart/End',
          '异步迭代',
          'async/await',
          'includes',
        ],
        0,
      ],
      [
        'JavaScript中ES2020的新特性有？',
        [
          '可选链, 空值合并, BigInt, dynamic import, globalThis',
          'Array.flat',
          '异步迭代',
          'async/await',
        ],
        0,
      ],
      [
        'JavaScript中globalThis的作用是？',
        ['获取全局对象', '获取当前对象', '获取父对象', '获取原型对象'],
        0,
      ],
      [
        'JavaScript中ES2021的新特性有？',
        ['replaceAll, Promise.any, 逻辑赋值, 数字分隔符', '可选链', '空值合并', 'BigInt'],
        0,
      ],
      ['JavaScript中逻辑赋值运算符有？', ['||=, &&=, ??=', '||, &&', '?', '以上都不对'], 0],
      [
        'JavaScript中数字分隔符的作用是？',
        ['提高数字可读性', '分隔整数和小数', '格式化数字', '以上都不对'],
        0,
      ],
      [
        'JavaScript中ES2022的新特性有？',
        [
          'Top-level await, class字段, at(), Object.hasOwn',
          'replaceAll',
          'Promise.any',
          '逻辑赋值',
        ],
        0,
      ],
      [
        'JavaScript中Object.hasOwn和hasOwnProperty的区别？',
        ['Object.hasOwn更安全，不依赖原型', '没有区别', 'hasOwnProperty更安全', '取决于对象'],
        0,
      ],
      [
        'JavaScript中ES2023的新特性有？',
        ['不可变数组方法, fromAsync, Hashbang', 'Top-level await', 'class字段', 'at()'],
        0,
      ],
      [
        'JavaScript中不可变数组方法有？',
        ['toSorted, toReversed, toSpliced, with', 'sort, reverse', 'splice', '以上都不对'],
        0,
      ],
      [
        'JavaScript中Array.fromAsync的作用是？',
        ['从异步可迭代对象创建数组', '从同步可迭代对象创建数组', '异步排序', '以上都不对'],
        0,
      ],
      [
        'JavaScript中模块化的好处？',
        ['代码复用，维护性，命名空间', '性能更好', '代码更少', '以上都不对'],
        0,
      ],
      [
        'JavaScript中AMD规范的特点？',
        ['异步加载，依赖前置', '同步加载', '依赖后置', '以上都不对'],
        0,
      ],
      [
        'JavaScript中CMD规范的特点？',
        ['异步加载，依赖就近', '同步加载', '依赖前置', '以上都不对'],
        0,
      ],
      [
        'JavaScript中UMD规范的特点？',
        ['兼容AMD和CommonJS', '仅兼容AMD', '仅兼容CommonJS', '以上都不对'],
        0,
      ],
      [
        'JavaScript中ES6 Module的特点？',
        ['静态结构，编译时加载', '动态结构', '运行时加载', '以上都不对'],
        0,
      ],
      [
        'JavaScript中import * as的作用是？',
        ['导入整个模块', '导入默认', '导入命名', '以上都不对'],
        0,
      ],
      [
        'JavaScript中export和export default的区别？',
        ['export命名导出，export default默认导出', '没有区别', 'export默认导出', '以上都不对'],
        0,
      ],
      [
        'JavaScript中一个模块可以有多个export default吗？',
        ['不可以', '可以', '取决于环境', '取决于严格模式'],
        0,
      ],
      [
        'JavaScript中import语句会提升吗？',
        ['会，在编译阶段执行', '不会', '取决于位置', '取决于环境'],
        0,
      ],
      [
        'JavaScript中import的路径可以是变量吗？',
        ['不可以，必须是字符串', '可以', '取决于环境', '取决于严格模式'],
        0,
      ],
      [
        'JavaScript中动态import()的路径可以是变量吗？',
        ['可以', '不可以', '取决于环境', '取决于严格模式'],
        0,
      ],
      [
        'JavaScript中import()返回的Promise何时解决？',
        ['模块加载完成后', '立即解决', '执行后解决', '以上都不对'],
        0,
      ],
      ['JavaScript中如何实现模块懒加载？', ['import()', 'import', 'require', 'include'], 0],
      [
        'JavaScript中模块的副作用是指？',
        ['模块执行时修改外部状态', '模块返回值', '模块导入', '以上都不对'],
        0,
      ],
      [
        'JavaScript中package.json的sideEffects字段作用？',
        ['标记模块是否有副作用', '定义入口', '定义依赖', '以上都不对'],
        0,
      ],
      [
        'JavaScript中Tree Shaking如何处理副作用？',
        ['保留有副作用的模块', '删除所有模块', '忽略副作用', '以上都不对'],
        0,
      ],
      [
        'JavaScript中如何编写纯函数？',
        ['无副作用，相同输入相同输出', '无返回值', '修改外部状态', '以上都不对'],
        0,
      ],
      [
        'JavaScript中柯里化的作用是？',
        ['延迟计算，参数复用', '提高性能', '减少代码', '以上都不对'],
        0,
      ],
      ['JavaScript中如何实现柯里化？', ['递归收集参数', 'bind', '闭包', '以上都是'], 3],
      ['JavaScript中偏应用的作用是？', ['预设部分参数', ['延迟计算'], '参数复用', '以上都不对'], 0],
      [
        'JavaScript中柯里化和偏应用的区别？',
        [
          '柯里化返回单参数函数，偏应用返回少参数函数',
          '没有区别',
          '偏应用返回单参数函数',
          '以上都不对',
        ],
        0,
      ],
      [
        'JavaScript中组合的作用是？',
        ['将多个函数合并为一个', '拆分函数', '延迟执行', '以上都不对'],
        0,
      ],
      [
        'JavaScript中管道的作用是？',
        ['从左到右组合函数', '从右到左组合函数', '以上都不对', '拆分函数'],
        0,
      ],
      ['JavaScript中compose的执行顺序是？', ['从右到左', '从左到右', '随机', '以上都不对'], 0],
      ['JavaScript中pipe的执行顺序是？', ['从左到右', '从右到左', '随机', '以上都不对'], 0],
      [
        'JavaScript中函子的作用是？',
        ['包装值，提供函数式操作', '创建对象', '定义类', '以上都不对'],
        0,
      ],
      ['JavaScript中Monad的作用是？', ['解决嵌套函子问题', '创建对象', '定义类', '以上都不对'], 0],
      ['JavaScript中Promise是一种Monad吗？', ['是', '否', '部分是', '取决于环境'], 0],
      ['JavaScript中Array是一种函子吗？', ['是', '否', '部分是', '取决于环境'], 0],
      [
        'JavaScript中函数组合的满足条件？',
        ['函数接受一个参数，返回一个值', '函数无参数', '函数返回多个值', '以上都不对'],
        0,
      ],
      [
        'JavaScript中高阶函数是指？',
        ['接受或返回函数的函数', '性能好的函数', '复杂的函数', '以上都不对'],
        0,
      ],
      ['JavaScript中map/filter/reduce是高阶函数吗？', ['是', '否', '部分是', '取决于环境'], 0],
      [
        'JavaScript中函数式编程的特点？',
        ['纯函数，不可变性，函数组合', '面向对象', '命令式', '以上都不对'],
        0,
      ],
      [
        'JavaScript中不可变数据如何实现？',
        ['Object.freeze, 展开运算符, Immer', '直接修改', 'delete', '以上都不对'],
        0,
      ],
      [
        'JavaScript中Immer的作用是？',
        ['以可变方式写代码，产生不可变结果', '直接修改对象', '深拷贝对象', '以上都不对'],
        0,
      ],
      [
        'JavaScript中Immer的produce方法参数？',
        ['基础状态, 修改函数', '修改函数', '基础状态', '以上都不对'],
        0,
      ],
      [
        'JavaScript中函数式编程如何处理副作用？',
        ['隔离副作用', '忽略副作用', '消除副作用', '以上都不对'],
        0,
      ],
      [
        'JavaScript中TypeScript的作用是？',
        ['添加类型系统', '优化性能', '压缩代码', '以上都不对'],
        0,
      ],
      ['JavaScript中TypeScript的编译器是？', ['tsc', 'babel', 'webpack', 'rollup'], 0],
      [
        'JavaScript中TypeScript的基础类型有？',
        [
          'number, string, boolean, array, tuple, enum, any, void, null, undefined, never',
          '仅number, string, boolean',
          '仅array, object',
          '以上都不对',
        ],
        0,
      ],
      [
        'JavaScript中TypeScript的接口作用是？',
        ['定义对象形状', '创建对象', '继承类', '以上都不对'],
        0,
      ],
      [
        'JavaScript中TypeScript的泛型作用是？',
        ['代码复用，类型安全', '提高性能', '减少代码', '以上都不对'],
        0,
      ],
      [
        'JavaScript中TypeScript的联合类型是？',
        ['多种类型之一', '交叉类型', '字面量类型', '以上都不对'],
        0,
      ],
      [
        'JavaScript中TypeScript的交叉类型是？',
        ['多种类型合并', '联合类型', '字面量类型', '以上都不对'],
        0,
      ],
      [
        'JavaScript中TypeScript的类型推断是指？',
        ['自动推断类型', '手动标注', '运行时检查', '以上都不对'],
        0,
      ],
      [
        'JavaScript中TypeScript的类型守卫是指？',
        ['缩小类型范围', '扩大类型范围', '运行时检查', '以上都不对'],
        0,
      ],
      [
        'JavaScript中TypeScript的条件类型是？',
        ['根据条件选择类型', '联合类型', '交叉类型', '以上都不对'],
        0,
      ],
      [
        'JavaScript中TypeScript的映射类型是？',
        ['从旧类型创建新类型', '联合类型', '交叉类型', '以上都不对'],
        0,
      ],
      [
        'JavaScript中TypeScript的工具类型Partial作用？',
        ['将属性变为可选', '将属性变为只读', '选取部分属性', '以上都不对'],
        0,
      ],
      [
        'JavaScript中TypeScript的工具类型Required作用？',
        ['将属性变为必选', '将属性变为可选', '选取部分属性', '以上都不对'],
        0,
      ],
      [
        'JavaScript中TypeScript的工具类型Readonly作用？',
        ['将属性变为只读', '将属性变为可选', '选取部分属性', '以上都不对'],
        0,
      ],
      [
        'JavaScript中TypeScript的工具类型Pick作用？',
        ['选取部分属性', '将属性变为可选', '将属性变为只读', '以上都不对'],
        0,
      ],
      [
        'JavaScript中TypeScript的工具类型Omit作用？',
        ['省略部分属性', '选取部分属性', '将属性变为可选', '以上都不对'],
        0,
      ],
      [
        'JavaScript中TypeScript的装饰器作用是？',
        ['修改类和行为', '定义类型', '创建对象', '以上都不对'],
        0,
      ],
      [
        'JavaScript中TypeScript的命名空间作用是？',
        ['组织代码，避免命名冲突', '定义类型', '创建对象', '以上都不对'],
        0,
      ],
      [
        'JavaScript中TypeScript的声明文件作用是？',
        ['描述JavaScript代码的类型', '编译代码', '执行代码', '以上都不对'],
        0,
      ],
      [
        'JavaScript中Babel的作用是？',
        ['转译JavaScript代码', '类型检查', '代码压缩', '以上都不对'],
        0,
      ],
      [
        'JavaScript中Babel的预设作用是？',
        ['一组插件的集合', '单个插件', '配置文件', '以上都不对'],
        0,
      ],
      [
        'JavaScript中Babel的插件作用是？',
        ['转换特定语法', '一组插件', '配置文件', '以上都不对'],
        0,
      ],
      [
        'JavaScript中@babel/preset-env的作用是？',
        ['根据目标环境转译代码', '转译TypeScript', '转译React', '以上都不对'],
        0,
      ],
      ['JavaScript中core-js的作用是？', ['提供Polyfill', '转译代码', '类型检查', '以上都不对'], 0],
      [
        'JavaScript中regenerator-runtime的作用是？',
        ['支持async/await', '支持Promise', '支持Symbol', '以上都不对'],
        0,
      ],
      ['JavaScript中ESLint的作用是？', ['代码质量检查', '代码格式化', '代码转译', '以上都不对'], 0],
    ];
    const item = items[(i - 841) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q); // 添加这一行
  }
  // ==================== 第九部分：设计模式与最佳实践 (941-1000) ====================
  for (let i = 941; i <= 1000; i++) {
    const q = { id: `js-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      ['JavaScript中单例模式的实现方式是？', ['闭包+静态属性', '原型链', '观察者', '工厂函数'], 0],
      [
        'JavaScript中观察者模式与发布订阅模式的区别是？',
        ['观察者模式直接通知，发布订阅通过调度中心', '没有区别', '发布订阅直接通知', '以上都不对'],
        0,
      ],
      [
        'JavaScript中防抖函数属于哪种设计模式？',
        ['代理模式', '观察者模式', '策略模式', '命令模式'],
        0,
      ],
      [
        'JavaScript中Promise属于哪种设计模式？',
        ['状态机模式', '观察者模式', '代理模式', '装饰器模式'],
        0,
      ],
      [
        'JavaScript中Proxy属于哪种设计模式？',
        ['代理模式', '观察者模式', '装饰器模式', '适配器模式'],
        0,
      ],
      [
        'JavaScript中装饰器模式的作用是？',
        ['动态给对象添加职责', '创建对象', '简化接口', '替换对象'],
        0,
      ],
      [
        'JavaScript中如何实现深拷贝？',
        ['JSON.parse(JSON.stringify())', 'Object.assign()', '展开运算符', 'Array.from()'],
        0,
      ],
      [
        'JavaScript中如何判断两个对象相等？',
        ['JSON.stringify()比较', '==比较', '===比较', 'Object.is()'],
        0,
      ],
      ['JavaScript中如何实现函数柯里化？', ['递归收集参数', 'bind', '闭包', '以上都是'], 3],
      ['JavaScript中如何实现数组扁平化？', ['flat', '递归', 'reduce', '以上都是'], 3],
      [
        'JavaScript中如何实现数组的洗牌算法？',
        ['Fisher-Yates算法', 'sort随机', 'reverse', '以上都不对'],
        0,
      ],
      ['JavaScript中如何实现继承？', ['class extends', '原型链', 'Object.create()', '以上都是'], 3],
      ['JavaScript中如何实现模块化？', ['ES Module', 'CommonJS', 'AMD', '以上都是'], 3],
      ['JavaScript中如何避免回调地狱？', ['Promise', 'async/await', 'Generator', '以上都是'], 3],
      [
        'JavaScript中如何处理异常？',
        ['try...catch', 'Promise.catch', 'window.onerror', '以上都是'],
        3,
      ],
      [
        'JavaScript中如何实现懒加载？',
        ['IntersectionObserver', 'scroll事件', 'img loading=lazy', '以上都是'],
        3,
      ],
      [
        'JavaScript中如何实现虚拟列表？',
        ['计算可视区域渲染', '全量渲染', '分页渲染', '以上都不对'],
        0,
      ],
      [
        'JavaScript中如何优化长任务？',
        ['Web Worker', 'requestIdleCallback', '时间分片', '以上都是'],
        3,
      ],
      [
        'JavaScript中如何避免内存泄漏？',
        ['清除定时器', '解除事件监听', '释放闭包引用', '以上都是'],
        3,
      ],
      ['JavaScript中如何实现深比较？', ['递归比较', 'JSON.stringify', '===比较', '以上都不对'], 0],
      ['JavaScript中如何实现不可变数据？', ['Object.freeze', 'Immer', '展开运算符', '以上都是'], 3],
      ['JavaScript中如何实现函数组合？', ['reduce', '递归', 'for循环', '以上都是'], 3],
      ['JavaScript中如何实现管道函数？', ['reduce从左到右', 'reduce从右到左', 'map', 'forEach'], 0],
      [
        'JavaScript中如何实现并发控制？',
        ['自定义调度器', 'Promise.all', 'async/await', '以上都不对'],
        0,
      ],
      ['JavaScript中如何实现重试机制？', ['递归+catch', 'for循环', 'while循环', '以上都不对'], 0],
      [
        'JavaScript中如何实现超时控制？',
        ['Promise.race', 'Promise.all', 'setTimeout', '以上都不对'],
        0,
      ],
      ['JavaScript中如何实现缓存函数？', ['闭包+Map', '全局变量', '属性挂载', '以上都不对'], 0],
      ['JavaScript中如何实现单例模式？', ['闭包', 'class静态属性', 'Symbol', '以上都是'], 3],
      [
        'JavaScript中如何实现策略模式？',
        ['对象映射函数', 'if-else', 'switch-case', '以上都不对'],
        0,
      ],
      ['JavaScript中如何实现状态模式？', ['状态对象映射', '变量标记', '函数参数', '以上都不对'], 0],
      ['JavaScript中如何实现模板方法模式？', ['继承+钩子方法', '组合', '代理', '以上都不对'], 0],
      [
        'JavaScript中如何实现迭代器模式？',
        ['Symbol.iterator', 'for...in', 'forEach', '以上都不对'],
        0,
      ],
      ['JavaScript中如何实现命令模式？', ['函数封装', '对象封装', '类封装', '以上都不对'], 0],
      [
        'JavaScript中如何实现职责链模式？',
        ['递归或next传递', '数组循环', 'Promise链', '以上都不对'],
        0,
      ],
      ['JavaScript中如何实现中介者模式？', ['中央控制器', '直接通信', '事件监听', '以上都不对'], 0],
      ['JavaScript中如何实现享元模式？', ['共享通用对象', '创建新对象', '深拷贝', '以上都不对'], 0],
      ['JavaScript中如何实现适配器模式？', ['包装接口转换', '修改原接口', '继承', '以上都不对'], 0],
      ['JavaScript中如何实现外观模式？', ['简化复杂接口', '扩展接口', '替换接口', '以上都不对'], 0],
      ['JavaScript中如何实现代理模式？', ['Proxy拦截', '对象包裹', '函数包裹', '以上都是'], 3],
      [
        'JavaScript中如何实现发布订阅模式？',
        ['EventEmitter', 'CustomEvent', '回调函数', '以上都是'],
        3,
      ],
      [
        'JavaScript中如何实现MVC模式？',
        ['Model-View-Controller', 'Model-View-ViewModel', '以上都不对', '以上都不对'],
        0,
      ],
      [
        'JavaScript中如何实现MVVM模式？',
        ['数据劫持+模板编译', '直接操作DOM', '事件监听', '以上都不对'],
        0,
      ],
      [
        'JavaScript中前端安全防范有哪些？',
        ['XSS, CSRF, 点击劫持', 'SQL注入', '缓冲区溢出', '以上都不对'],
        0,
      ],
      ['JavaScript中如何防范XSS攻击？', ['转义HTML', 'CSP策略', 'HttpOnly Cookie', '以上都是'], 3],
      [
        'JavaScript中如何防范CSRF攻击？',
        ['Token验证', 'SameSite Cookie', 'Referer检查', '以上都是'],
        3,
      ],
      ['JavaScript中如何防范点击劫持？', ['X-Frame-Options', 'CSP', 'HTTPS', '以上都不对'], 0],
      [
        'JavaScript中如何实现代码分割？',
        ['动态import()', '多入口', 'SplitChunksPlugin', '以上都是'],
        3,
      ],
      ['JavaScript中如何实现Tree Shaking？', ['ES6静态模块', 'CommonJS', 'AMD', '以上都不对'], 0],
      ['JavaScript中如何实现SSR？', ['服务端渲染', '客户端渲染', '静态生成', '以上都不对'], 0],
      ['JavaScript中如何实现同构应用？', ['代码共享', '两端渲染', '路由共享', '以上都是'], 3],
      [
        'JavaScript中如何进行性能监控？',
        ['Performance API', 'Lighthouse', 'Web Vitals', '以上都是'],
        3,
      ],
      [
        'JavaScript中如何进行错误监控？',
        ['try...catch', 'window.onerror', 'Promise.catch', '以上都是'],
        3,
      ],
      ['JavaScript中如何进行用户行为监控？', ['埋点', '无痕埋点', '可视化埋点', '以上都是'], 3],
      ['JavaScript中如何实现国际化？', ['i18n库', 'Intl API', '多套代码', '以上都是'], 3],
      ['JavaScript中如何实现主题切换？', ['CSS变量', '切换样式表', 'class替换', '以上都是'], 3],
      ['JavaScript中如何实现权限控制？', ['路由守卫', '指令控制', '接口校验', '以上都是'], 3],
      ['JavaScript中如何实现数据可视化？', ['Canvas', 'SVG', 'WebGL', '以上都是'], 3],
      ['JavaScript中如何实现微前端？', ['qiankun', 'single-spa', 'iframe', '以上都是'], 3],
      [
        'JavaScript中如何实现低代码平台？',
        ['JSON Schema渲染', '拖拽生成', '可视化编辑', '以上都是'],
        3,
      ],
    ];
    const item = items[(i - 941) % items.length];
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
const outputPath = join(__dirname, 'javascript_questions.json');
fs.writeFileSync(outputPath, JSON.stringify(questions, null, 2));
console.log(`已生成 ${questions.length} 道JavaScript题目，保存到 ${outputPath}`);
