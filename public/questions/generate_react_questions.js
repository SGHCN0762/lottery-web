// 生成React 1000条题目的脚本
import fs from 'fs';
import path from 'path';

// 题目模板生成函数
function generateQuestions() {
  const questions = [];

  // ==================== 第一部分：React 基础与核心概念 (1-150) ====================
  for (let i = 1; i <= 150; i++) {
    const q = { id: `react-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'React 中用于创建组件的两种主要方式是？',
        ['函数组件和类组件', '无状态组件和有状态组件', '纯组件和普通组件', '高阶组件和低阶组件'],
        0,
      ],
      ['JSX 的本质是什么？', ['JavaScript 的语法扩展', 'HTML 模板', '一种框架', 'CSS 预处理器'], 0],
      [
        'React 中渲染列表时为什么要使用 key？',
        ['帮助 React 识别哪些元素发生了变化', '提高渲染速度', '为了代码美观', 'React 强制要求'],
        0,
      ],
      ['React 中 key 应该使用什么值？', ['稳定的唯一标识', '数组索引', '随机数', '顺序整数'], 0],
      [
        'React 组件的 props 有什么特点？',
        ['只读不可修改', '可以双向绑定', '可以随意修改', '只能在构造函数中修改'],
        0,
      ],
      [
        'React 中修改 state 的正确方式是？',
        [
          'setState 或 useState 的更新函数',
          '直接修改 this.state',
          '通过 props 修改',
          '使用 forceUpdate',
        ],
        0,
      ],
      [
        'React 中 setState 是同步还是异步的？',
        ['在 React 控制的上下文中是异步的', '始终是同步的', '始终是异步的', '取决于浏览器'],
        0,
      ],
      [
        'React 事件处理与原生 DOM 事件的主要区别是？',
        ['使用驼峰命名和 SyntheticEvent', '没有区别', '使用短横线命名', '不支持事件委托'],
        0,
      ],
      [
        'React 中的 SyntheticEvent 是什么？',
        ['React 实现的跨浏览器事件包装器', '原生 DOM 事件', '自定义事件总线', 'Node.js 事件'],
        0,
      ],
      [
        'React 组件的 render 方法在什么时候会被调用？',
        ['state 或 props 改变时', '只在挂载时', '只在卸载时', '手动调用时'],
        0,
      ],
      [
        'React 中如何阻止组件渲染？',
        ['在 render 中返回 null', '返回 undefined', '返回 false', '抛出错误'],
        0,
      ],
      [
        'React Fragment 的作用是？',
        ['在不添加额外 DOM 节点的情况下包裹子元素', '提高渲染性能', '缓存组件', '处理错误'],
        0,
      ],
      [
        'React 严格模式有什么作用？',
        ['识别潜在问题并发出警告', '提高生产环境性能', '压缩代码', '处理跨域'],
        0,
      ],
      [
        'React 中受控组件是什么？',
        ['表单值由 React state 控制的组件', '受父组件控制的组件', '不可修改的组件', '单例组件'],
        0,
      ],
      [
        'React 中非受控组件是什么？',
        ['表单值由 DOM 自身管理的组件', '不受 React 管理的组件', '没有 state 的组件', '全局组件'],
        0,
      ],
      [
        'React 中 ref 的作用是？',
        ['访问 DOM 节点或 React 元素实例', '传递数据', '管理状态', '处理副作用'],
        0,
      ],
      [
        'React 中 createRef 和 useRef 的区别是？',
        [
          'createRef 每次渲染都创建新实例，useRef 保持不变',
          '没有区别',
          'useRef 只能用于函数组件',
          'createRef 性能更好',
        ],
        0,
      ],
      [
        'React 中为什么不能在循环或条件语句中使用 Hooks？',
        ['违反 Hooks 调用顺序规则会导致状态错乱', '性能问题', '语法限制', '类型错误'],
        0,
      ],
      [
        'React 的单向数据流是指什么？',
        ['数据从父组件通过 props 传递给子组件', '数据只能从上往下流动', '数据不可变', '以上都是'],
        0,
      ],
      [
        'React 中 this.setState 的第二个参数是什么？',
        ['状态更新后的回调函数', '要更新的状态', 'props', '下一个状态'],
        0,
      ],
      [
        'React 中什么是状态提升？',
        ['将共享状态提升到最近的共同父组件', '将状态移到 Redux', '增加组件层级', '使用 Context'],
        0,
      ],
      [
        'React 中组件组合模式的作用是？',
        ['通过嵌套和 children 实现组件复用', '多重继承', '代码分割', '性能优化'],
        0,
      ],
      [
        'React 中 JSX 中的条件渲染方式不包括？',
        ['v-if 指令', '三元运算符', '逻辑与 (&&) 运算符', 'if-else 函数'],
        0,
      ],
      [
        'React 中 dangerouslySetInnerHTML 的作用是？',
        ['在 JSX 中插入原生 HTML', '设置安全的样式', '防止 XSS 攻击', '绑定事件'],
        0,
      ],
      [
        'React 中如何为组件添加默认 Props？',
        [
          'Component.defaultProps 或函数参数默认值',
          'this.defaultProps',
          'constructor 设置',
          '以上都不对',
        ],
        0,
      ],
      [
        'React 中类组件的生命周期分为哪三个阶段？',
        ['挂载、更新、卸载', '创建、渲染、销毁', '初始化、运行、停止', '开始、过程、结束'],
        0,
      ],
      [
        'React 中类组件的 constructor 中必须做的第一件事是？',
        ['调用 super(props)', '初始化 state', '绑定方法', '返回 this'],
        0,
      ],
      [
        'React 中类组件的 static getDerivedStateFromProps 的作用是？',
        [
          '在渲染前根据 props 更新 state',
          '获取派生状态',
          '替换 componentWillReceiveProps',
          '以上都是',
        ],
        0,
      ],
      [
        'React 中类组件的 componentDidMount 的执行时机是？',
        ['组件挂载后立即调用', '组件渲染前', '组件更新后', '组件卸载前'],
        0,
      ],
      [
        'React 中类组件的 shouldComponentUpdate 的作用是？',
        ['决定组件是否需要重新渲染', '强制组件更新', '处理错误', '获取快照'],
        0,
      ],
      [
        'React 中类组件的 componentDidUpdate 的执行时机是？',
        ['组件更新后立即调用', '组件挂载后', '组件渲染前', '组件卸载前'],
        0,
      ],
      [
        'React 中类组件的 componentWillUnmount 的作用是？',
        ['在组件卸载前执行清理操作', '销毁组件实例', '移除 DOM 节点', '取消事件监听'],
        0,
      ],
      [
        'React.PureComponent 和 React.Component 的区别是？',
        [
          'PureComponent 自动进行浅比较 shouldComponentUpdate',
          '没有区别',
          'Component 性能更好',
          'PureComponent 不支持 state',
        ],
        0,
      ],
      [
        'React 中 React.memo 的作用是？',
        ['对函数组件进行浅比较优化', '缓存函数', '记录日志', '代码分割'],
        0,
      ],
      [
        'React 中浅比较是如何工作的？',
        [
          '比较基本类型值和引用类型的引用',
          '深度遍历比较',
          '只比较第一层属性值',
          '比较 JSON 字符串',
        ],
        0,
      ],
      [
        'React 中 Children API 的作用是？',
        ['处理 this.props.children 的工具集', '访问子组件实例', '创建子组件', '克隆子组件'],
        0,
      ],
      [
        'React 中 React.cloneElement 的作用是？',
        ['克隆并返回一个新的 React 元素', '深拷贝组件', '复制 DOM 节点', '合并 props'],
        0,
      ],
      [
        'React 中 createElement 的作用是？',
        ['创建并返回指定类型的 React 元素', '创建 DOM 节点', '创建类实例', '创建组件'],
        0,
      ],
      [
        'React 中为什么 JSX 能够防止 XSS 攻击？',
        [
          'React 在渲染前会将字符串进行转义',
          'JSX 是编译时运行的',
          'JSX 不支持 HTML',
          '使用虚拟 DOM',
        ],
        0,
      ],
      [
        'React 中 JSX 的编译结果是什么？',
        ['React.createElement 调用', 'DOM 操作', '模板字符串', '虚拟节点对象'],
        0,
      ],
      [
        'React 中如何实现代码分割？',
        ['动态 import() 和 React.lazy', 'import 语句', 'require 函数', '代码压缩'],
        0,
      ],
      [
        'React 中 Suspense 组件的作用是？',
        ['在组件加载时显示 fallback 内容', '处理错误', '延迟渲染', '并发模式'],
        0,
      ],
      [
        'React 中 ErrorBoundary 的作用是？',
        ['捕获子组件树的 JavaScript 错误', '处理 HTTP 错误', '捕获事件错误', '语法错误检查'],
        0,
      ],
      [
        'React 中 getDerivedStateFromError 的作用是？',
        ['在后代组件抛出错误后更新 state', '渲染备用 UI', '记录错误日志', '阻止错误冒泡'],
        0,
      ],
      [
        'React 中 componentDidCatch 的作用是？',
        ['在后代组件抛出错误后记录日志', '更新 state', '渲染备用 UI', '恢复组件'],
        0,
      ],
      [
        'React 中 Context 的作用是？',
        ['跨层级传递数据而无需手动传递 props', '全局状态管理', '组件通信', '路由管理'],
        0,
      ],
      [
        'React 中 Context 的组成包括？',
        [
          'React.createContext, Provider, Consumer',
          'Store, Reducer, Action',
          'Provider, Consumer, State',
          'Context, Provider, Dispatcher',
        ],
        0,
      ],
      [
        'React 中 Context 的消费方式不包括？',
        ['useStore', 'useContext Hook', 'Consumer 组件', 'contextType 静态属性'],
        0,
      ],
      [
        'React 中 Context 的缺点是？',
        ['组件复用困难，性能优化较难', '不支持异步', '不能传递对象', '只能在顶层使用'],
        0,
      ],
      [
        'React 中高阶组件的定义是？',
        ['接收组件并返回新组件的函数', '继承其他组件的类', '使用 Hooks 的组件', '被包裹的组件'],
        0,
      ],
      [
        'React 中高阶组件的作用是？',
        ['逻辑复用、属性代理、反向继承', '状态管理', '路由控制', '性能优化'],
        0,
      ],
      [
        'React 中高阶组件的命名规范是？',
        ['withXxx 或 enhanceXxx', 'useXxx', 'createXxx', 'getXxx'],
        0,
      ],
      [
        'React 中 Render Props 模式的定义是？',
        [
          '通过 props 传递渲染逻辑的组件模式',
          '在 render 中调用 props',
          '渲染属性组件',
          '以上都不对',
        ],
        0,
      ],
      [
        'React 中 Render Props 的典型应用是？',
        ['共享组件间逻辑', '渲染多个子组件', '传递静态属性', '处理错误'],
        0,
      ],
      [
        'React 中 Portals 的作用是？',
        ['将子节点渲染到存在于父组件以外的 DOM 节点', '组件传送', '数据持久化', '跨域通信'],
        0,
      ],
      [
        'React 中 Portals 的典型应用场景是？',
        ['模态框、工具提示、浮层', '表单处理', '列表渲染', '路由跳转'],
        0,
      ],
      [
        'React 中 Fiber 架构的主要目标是？',
        ['实现增量渲染和可中断更新', '提升首次加载速度', '减少内存占用', '支持 TypeScript'],
        0,
      ],
      [
        'React 中 Reconciliation 算法的作用是？',
        ['比较新旧虚拟 DOM 树并计算差异', '修复组件错误', '协调状态', '合并 props'],
        0,
      ],
      [
        'React 中 Diff 算法的三个策略是？',
        [
          '树级别、组件级别、元素级别比较',
          '深度优先、广度优先、随机比较',
          '时间复杂度 O(n^3)',
          '以上都不对',
        ],
        0,
      ],
      [
        'React 中虚拟 DOM 的优势是？',
        ['跨平台、批量更新、差异化更新', '比真实 DOM 快', '不需要渲染', '减少代码量'],
        0,
      ],
      [
        'React 中虚拟 DOM 的缺点是？',
        ['内存占用较高，无法精确控制更新', '性能差', '不支持复杂 UI', '学习曲线陡峭'],
        0,
      ],
      [
        'React 中批量更新的机制是？',
        ['将多次 setState 合并为一次更新', '异步更新', '定时更新', '手动触发'],
        0,
      ],
      [
        'React 中 flushSync 的作用是？',
        ['强制同步刷新状态更新', '批量更新', '延迟更新', '取消更新'],
        0,
      ],
      [
        'React 中并发模式的特点是？',
        ['可中断渲染、优先级调度', '多线程渲染', '同步渲染', '并行计算'],
        0,
      ],
      [
        'React 中 useId 的作用是？',
        ['生成唯一 ID 用于可访问性', '生成随机数', '获取组件 ID', '生成 key'],
        0,
      ],
      [
        'React 中 useSyncExternalStore 的作用是？',
        ['订阅外部数据源保证一致性', '同步状态', '存储数据', '缓存数据'],
        0,
      ],
      [
        'React 中 useInsertionEffect 的作用是？',
        ['在 DOM 更新前同步插入样式', '插入 DOM 节点', '副作用处理', '数据获取'],
        0,
      ],
      [
        'React 中 useDeferredValue 的作用是？',
        ['返回一个延迟更新的值', '延迟渲染', '防抖', '节流'],
        0,
      ],
      [
        'React 中 useTransition 的作用是？',
        ['将状态更新标记为非阻塞过渡', '动画过渡', '组件切换', '路由过渡'],
        0,
      ],
      [
        'React 中 Suspense 与 lazy 配合实现？',
        ['组件懒加载', '数据获取', '错误处理', '状态管理'],
        0,
      ],
      [
        'React 中 Suspense 的 fallback 属性作用是？',
        ['指定加载中显示的内容', '指定错误显示内容', '指定延迟时间', '指定加载策略'],
        0,
      ],
      [
        'React 中严格模式会重复调用哪些函数两次？',
        ['类组件构造函数、render 和副作用函数', '所有函数', '事件处理函数', '异步函数'],
        0,
      ],
      [
        'React 中如何处理表单验证？',
        ['受控组件结合状态验证或第三方库', '内置验证指令', 'DOM 验证', '以上都不对'],
        0,
      ],
      [
        'React 中样式处理方式不包括？',
        ['v-bind:style', 'CSS Modules', 'Inline Style', 'Styled Components'],
        0,
      ],
      [
        'React 中 CSS-in-JS 的优势是？',
        ['局部作用域、动态样式、避免冲突', '性能最好', '无需编译', '浏览器原生支持'],
        0,
      ],
      [
        'React 中 CSS Modules 的作用是？',
        ['自动生成唯一的类名实现样式隔离', '引入 CSS 文件', '压缩 CSS', '预处理 CSS'],
        0,
      ],
      [
        'React 中 Styled Components 的特点？',
        ['使用 ES6 模板字符串编写样式', '基于对象样式', '只支持 CSS 文件', '不支持主题'],
        0,
      ],
      [
        'React 中为什么推荐使用驼峰命名事件？',
        ['JSX 是 JavaScript 的扩展，遵循 JS 命名规范', 'HTML 规范', 'React 限制', '浏览器要求'],
        0,
      ],
      [
        'React 中合成事件池的作用是？',
        ['重用事件对象减少内存分配（React 17 已移除）', '提高事件响应速度', '事件委托', '事件冒泡'],
        0,
      ],
      [
        'React 17 对事件系统的更改是？',
        ['事件委托到根节点而非 document', '移除事件池', '支持捕获阶段', '以上都是'],
        0,
      ],
      [
        'React 中如何阻止事件冒泡？',
        ['e.stopPropagation()', 'return false', 'e.preventDefault()', 'e.cancelBubble'],
        0,
      ],
      [
        'React 中如何阻止默认行为？',
        [
          'e.preventDefault()',
          'e.stopPropagation()',
          'return false',
          'e.stopImmediatePropagation()',
        ],
        0,
      ],
      [
        'React 中 this 绑定的方式不包括？',
        ['v-on 绑定', '构造函数中 bind', '类字段语法', '箭头函数包裹'],
        0,
      ],
      [
        'React 中类组件中直接调用箭头函数的性能问题是？',
        ['每次渲染都会创建新的函数实例', '内存泄漏', '状态丢失', '无法访问 this'],
        0,
      ],
      [
        'React 中函数组件的特点是？',
        ['无实例、无 this、无生命周期、更轻量', '性能差', '不能使用 state', '不能传递 props'],
        0,
      ],
      [
        'React 中类组件的特点是？',
        ['有实例、有 this、有生命周期、较复杂', '不能使用 Hooks', '性能最好', '不支持继承'],
        0,
      ],
      ['React 中组件命名推荐使用？', ['PascalCase', 'camelCase', 'kebab-case', 'snake_case'], 0],
      ['React 中 props 验证库通常是？', ['prop-types', 'tslint', 'eslint', 'flow-bin'], 0],
      [
        'React 中 PropTypes.string 的作用是？',
        ['验证 prop 是否为字符串', '将 prop 转为字符串', '定义默认字符串', '创建字符串'],
        0,
      ],
      [
        'React 中 PropTypes.isRequired 的作用是？',
        ['标记 prop 为必填', '验证数组', '验证对象', '验证函数'],
        0,
      ],
      [
        'React 中 defaultProps 和 PropTypes 的关系是？',
        [
          'defaultProps 提供默认值，PropTypes 提供类型检查',
          '两者相同',
          'defaultProps 优先级更高',
          '互斥使用',
        ],
        0,
      ],
      [
        'React 中如何实现组件间的通信？',
        [
          'Props、Context、Event Emitter、状态管理库',
          '只能通过 Props',
          '只能通过 Context',
          '只能通过 Redux',
        ],
        0,
      ],
      [
        'React 中父子组件通信的方式是？',
        ['Props 向下传递，回调函数向上传递', '事件总线', 'Redux', 'LocalStorage'],
        0,
      ],
      [
        'React 中兄弟组件通信的方式是？',
        ['状态提升或状态管理库', '直接传递 Props', '修改全局变量', 'DOM 操作'],
        0,
      ],
      [
        'React 中跨层级组件通信的方式是？',
        ['Context 或状态管理库', 'Props 逐层传递', '原型链', '闭包'],
        0,
      ],
      [
        'React 中组件复用的方式有？',
        ['Hooks、高阶组件、Render Props', '继承', '全局变量', 'Mixin'],
        0,
      ],
      [
        'React 中 Mixin 的缺点是？',
        ['命名冲突、隐式依赖、难以理解', '性能差', '不支持 TypeScript', '语法复杂'],
        0,
      ],
      [
        'React 中 HOC 的缺点是？',
        ['嵌套地狱、Props 来源不清、命名冲突', '不支持函数组件', '性能差', '无法复用逻辑'],
        0,
      ],
      [
        'React 中 Render Props 的缺点是？',
        ['嵌套地狱、可读性差', '不能传递参数', '性能差', '不支持类组件'],
        0,
      ],
      [
        'React 中 Hooks 的优势是？',
        ['逻辑复用简单、代码清晰、无嵌套地狱', '性能更好', '支持面向对象', '兼容所有类组件'],
        0,
      ],
      [
        'React 中组件的 state 为什么不能直接修改？',
        ['无法触发重新渲染，破坏不可变性', '性能问题', '语法限制', '安全原因'],
        0,
      ],
      [
        'React 中不可变数据的好处是？',
        ['易于追踪变化、优化渲染、时间旅行调试', '减少内存', '提高速度', '代码简洁'],
        0,
      ],
      [
        'React 中如何处理不可变数据？',
        ['扩展运算符、Object.assign、Immer', '直接修改', '深拷贝', '以上都不对'],
        0,
      ],
      [
        'React 中 Immer 的作用是？',
        ['以可变方式编写代码产生不可变更新', '数据冻结', '深比较', '状态管理'],
        0,
      ],
      [
        'React 中 setState 传递函数的好处是？',
        ['获取最新的 state 并批量更新', '异步执行', '支持 Promise', '返回新状态'],
        0,
      ],
      [
        'React 中对象展开运算符是浅拷贝还是深拷贝？',
        ['浅拷贝', '深拷贝', '都不是', '取决于数据类型'],
        0,
      ],
      [
        'React 中数组的哪些方法不会改变原数组？',
        ['map, filter, concat, slice', 'push, pop, splice', 'sort, reverse', 'shift, unshift'],
        0,
      ],
      ['React 中 key 改变会导致什么？', ['组件重新挂载', '组件更新', '组件卸载', '没有影响'], 0],
      [
        'React 中 index 作为 key 的潜在问题是？',
        ['列表重新排序或增删时可能导致状态错乱', '性能下降', '报错', '无法渲染'],
        0,
      ],
      ['React 中 Fragment 的简写是？', ['<></>', '<fragment></fragment>', '<></>', '[]'], 0],
      [
        'React 中 Fragment 的简写不支持什么？',
        ['key 属性或任何属性', '子元素', '条件渲染', '列表渲染'],
        0,
      ],
      [
        'React 中如何强制重新渲染类组件？',
        ['this.forceUpdate()', 'this.setState()', 'this.render()', 'this.update()'],
        0,
      ],
      [
        'React 中函数组件如何强制更新？',
        ['使用 useState 切换状态触发渲染', 'forceUpdate()', 'reRender()', 'update()'],
        0,
      ],
      ['React 中组件返回的 JSX 必须有几个根节点？', ['一个', '零个', '两个', '不限'], 0],
      [
        'React 中组件的 render 方法为什么必须是纯函数？',
        ['不修改 state，不与浏览器交互，相同输入相同输出', '性能要求', '语法规范', '安全限制'],
        0,
      ],
      [
        'React 中 shouldComponentUpdate 返回 false 会怎样？',
        ['阻止组件及其子组件重新渲染', '只阻止子组件渲染', '组件卸载', '报错'],
        0,
      ],
      [
        'React 中 getSnapshotBeforeUpdate 的作用是？',
        ['在 DOM 更新前捕获信息', '获取 DOM 快照', '更新前修改 state', '获取 prevProps'],
        0,
      ],
      [
        'React 中 getSnapshotBeforeUpdate 的返回值会传递给谁？',
        ['componentDidUpdate', 'shouldComponentUpdate', 'render', 'componentWillUpdate'],
        0,
      ],
      [
        'React 中 static contextType 的作用是？',
        ['在类组件中订阅 Context', '定义静态属性', '类型检查', '组件通信'],
        0,
      ],
      ['React 中 static contextType 只能订阅几个 Context？', ['一个', '两个', '三个', '不限'], 0],
      [
        'React 中类组件如何订阅多个 Context？',
        ['使用 Consumer 嵌套', '多个 contextType', 'useContext', '以上都不对'],
        0,
      ],
      [
        'React 中 Context 的 value 改变会如何影响消费者？',
        ['所有消费者都会重新渲染', '只有部分消费者渲染', '不会渲染', '报错'],
        0,
      ],
      [
        'React 中如何优化 Context 的性能？',
        ['拆分 Context、使用 memo、传递对象引用', '减少 Provider', '不使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中 Refs 转发的作用是？',
        ['将 ref 自动通过组件传递给子组件', '传递 props', '传递 state', '传递 context'],
        0,
      ],
      [
        'React 中 React.forwardRef 的使用场景是？',
        ['高阶组件、UI 组件库获取 DOM 节点', '状态管理', '路由跳转', '事件处理'],
        0,
      ],
      [
        'React 中回调 Refs 和 createRef 的区别是？',
        ['回调 Refs 更灵活，可以传递参数', '没有区别', 'createRef 更灵活', '回调 Refs 性能差'],
        0,
      ],
      [
        'React 中字符串 Refs 为什么被弃用？',
        ['性能问题、类型不明、作用域问题', '语法错误', '功能受限', '不支持函数组件'],
        0,
      ],
      [
        'React 中 this.setState 是异步的主要原因是什么？',
        ['批量更新提升性能', 'JavaScript 限制', '浏览器限制', 'React 版本问题'],
        0,
      ],
      [
        'React 中如何在 setState 后立即获取更新后的状态？',
        [
          '在 setState 的第二个回调参数中获取',
          '同步获取 this.state',
          '使用 forceUpdate',
          '使用 setTimeout',
        ],
        0,
      ],
      [
        'React 中组件卸载后调用 setState 会怎样？',
        ['警告内存泄漏', '报错', '正常执行', '静默失败'],
        0,
      ],
      ['React 中 useEffect 的清理函数在卸载时执行几次？', ['1次', '2次', '0次', '取决于依赖'], 0],
      ['React 中严格模式下 useEffect 的清理函数执行几次？', ['2次', '1次', '0次', '3次'], 0],
      [
        'React 中为什么会出现 Hooks？',
        ['解决逻辑复用和组件复杂度问题', '替代类组件', '提升性能', '支持 TypeScript'],
        0,
      ],
      [
        'React 中 Hooks 的设计动机不包括？',
        ['支持面向对象编程', '逻辑复用', '简化代码', '优化体积'],
        0,
      ],
      ['React 中自定义 Hook 的命名规范是？', ['useXxx', 'hookXxx', 'createXxx', 'withXxx'], 0],
      [
        'React 中自定义 Hook 的作用是？',
        ['提取组件逻辑实现复用', '创建组件', '管理路由', '处理样式'],
        0,
      ],
      [
        'React 中自定义 Hook 内部可以使用其他 Hooks 吗？',
        ['可以', '不可以', '只能使用 useState', '只能使用 useEffect'],
        0,
      ],
      [
        'React 中 Hooks 的规则有哪些？',
        [
          '只在最顶层使用、只在函数组件或自定义 Hook 中调用',
          '可以在条件语句中使用',
          '可以在循环中使用',
          '可以在普通函数中使用',
        ],
        0,
      ],
      [
        'React 中 eslint-plugin-react-hooks 的作用是？',
        ['检查 Hooks 规则执行情况', '代码格式化', '类型检查', '单元测试'],
        0,
      ],
      [
        'React 中 useState 的初始值可以是函数吗？',
        ['可以，用于惰性初始化', '不可以', '只能是对象', '只能是基本类型'],
        0,
      ],
      [
        'React 中 useState 惰性初始化的好处是？',
        ['避免每次渲染都执行昂贵的计算', '异步初始化', '提升编译速度', '减少代码量'],
        0,
      ],
      [
        'React 中 useEffect 的依赖项是空数组意味着什么？',
        ['只在挂载和卸载时执行', '每次渲染都执行', '不执行', '只执行一次且不清理'],
        0,
      ],
      [
        'React 中 useEffect 的依赖项缺失会导致什么？',
        ['闭包陷阱，读取到旧的 state/props', '编译报错', '性能提升', '内存泄漏'],
        0,
      ],
      [
        'React 中 useEffect 的依赖项应该包含什么？',
        ['effect 中使用的响应式值', '所有变量', '只包含 state', '只包含 props'],
        0,
      ],
      [
        'React 中 useEffect 与 useLayoutEffect 的区别是？',
        [
          'useLayoutEffect 在 DOM 更新后同步执行，useEffect 异步执行',
          '没有区别',
          'useEffect 同步执行',
          '执行顺序相同',
        ],
        0,
      ],
      [
        'React 中 useLayoutEffect 的执行时机是？',
        ['DOM 更新后，浏览器绘制前', 'DOM 更新前', '浏览器绘制后', '组件挂载前'],
        0,
      ],
      [
        'React 中为什么推荐使用 useEffect 而不是 useLayoutEffect？',
        [
          'useEffect 不会阻塞浏览器绘制，性能更好',
          'useLayoutEffect 有 Bug',
          'useEffect 支持服务端渲染',
          'useLayoutEffect 已弃用',
        ],
        0,
      ],
      [
        'React 中服务端渲染时 useLayoutEffect 会怎样？',
        ['触发警告，建议使用 useEffect', '正常执行', '报错', '忽略'],
        0,
      ],
      [
        'React 中 useRef 返回的对象在组件生命周期内是怎样的？',
        ['保持同一个引用', '每次渲染都改变', '只在挂载时创建', '卸载时销毁'],
        0,
      ],
      [
        'React 中 useRef 修改 current 属性会触发重新渲染吗？',
        ['不会', '会', '取决于值类型', '有时会'],
        0,
      ],
      [
        'React 中 useRef 的常见使用场景不包括？',
        ['管理组件状态触发渲染', '访问 DOM 元素', '保存上一次的值', '保存定时器 ID'],
        0,
      ],
      [
        'React 中如何使用 useRef 获取上一次的值？',
        [
          '在 useEffect 中将当前值赋给 ref.current',
          '直接读取 ref',
          '使用 useState',
          '使用 useReducer',
        ],
        0,
      ],
      [
        'React 中 useReducer 的适用场景是？',
        [
          '复杂状态逻辑、多个子值依赖、下一个状态依赖前一个',
          '简单状态',
          '所有场景',
          '只用于全局状态',
        ],
        0,
      ],
      [
        'React 中 useReducer 的第三个参数是什么？',
        ['惰性初始化函数', '初始状态', 'dispatch', 'reducer'],
        0,
      ],
      [
        'React 中 useReducer 与 useState 的关系是？',
        [
          'useReducer 是 useState 的底层实现',
          '没有关系',
          'useState 是 useReducer 的底层',
          '互斥使用',
        ],
        0,
      ],
      [
        'React 中 useContext 的作用是？',
        ['订阅 Context 获取共享数据', '创建 Context', '修改 Context', '销毁 Context'],
        0,
      ],
      [
        'React 中 useContext 的缺点是？',
        ['Context 更新会导致所有消费者重新渲染', '不支持默认值', '不能在类组件使用', '性能极好'],
        0,
      ],
      [
        'React 中 useCallback 的作用是？',
        ['缓存函数引用避免不必要的子组件渲染', '缓存计算结果', '创建回调', '处理事件'],
        0,
      ],
      [
        'React 中 useMemo 的作用是？',
        ['缓存计算结果避免每次渲染重复计算', '缓存函数引用', '记忆组件', '处理副作用'],
        0,
      ],
      [
        'React 中 useCallback(fn, deps) 等价于？',
        ['useMemo(() => fn, deps)', 'useRef(fn)', 'useState(fn)', 'useEffect(fn, deps)'],
        0,
      ],
      [
        'React 中 useMemo 的依赖项变化时会怎样？',
        ['重新执行计算函数并缓存新值', '保留旧值', '报错', '返回 undefined'],
        0,
      ],
      [
        'React 中过度使用 useMemo 会怎样？',
        ['增加开销反而降低性能', '提升性能', '没有影响', '内存泄漏'],
        0,
      ],
      [
        'React 中 useCallback 的典型使用场景是？',
        ['将回调传递给优化过的子组件', '所有函数', '异步函数', '类方法'],
        0,
      ],
      [
        'React 中 useRef 和 useState 的区别是？',
        [
          'useRef 修改不触发渲染，useState 触发渲染',
          '没有区别',
          'useRef 只能存基本类型',
          'useState 不触发渲染',
        ],
        0,
      ],
      [
        'React 中 forwardRef 传递的 ref 如何在函数组件中使用？',
        ['使用 useRef 接收', '使用第二个参数接收', '使用 this.ref', '使用 useContext'],
        0,
      ],
      [
        'React 中 useImperativeHandle 的作用是？',
        ['自定义暴露给父组件的 ref 实例值', '获取 DOM 节点', '绑定事件', '传递 props'],
        0,
      ],
      [
        'React 中 useImperativeHandle 常与什么配合使用？',
        ['forwardRef', 'useMemo', 'useCallback', 'useContext'],
        0,
      ],
      [
        'React 中 useDebugValue 的作用是？',
        ['在 React DevTools 中为自定义 Hook 显示标签', '调试代码', '打印日志', '断点调试'],
        0,
      ],
      [
        'React 中 useDebugValue 应该在哪里调用？',
        ['自定义 Hook 内部', '组件顶层', '类组件中', '任何位置'],
        0,
      ],
      [
        'React 中 useDebugValue 的第二个参数作用是？',
        ['格式化显示值，延迟格式化', '验证值', '类型转换', '过滤值'],
        0,
      ],
      ['React 中 useState 的更新是合并还是替换？', ['替换', '合并', '自动判断', '报错'], 0],
      [
        'React 中类组件 this.setState 的更新是合并还是替换？',
        ['合并', '替换', '自动判断', '报错'],
        0,
      ],
      [
        'React 中 useState 更新对象时正确的做法是？',
        ['使用展开运算符创建新对象', '直接修改属性', '使用 delete', '重新赋值'],
        0,
      ],
      [
        'React 中 useEffect 的执行时机是在什么之后？',
        ['DOM 更新绘制之后', 'DOM 更新之前', '组件挂载之前', '状态改变之前'],
        0,
      ],
      [
        'React 中 useEffect 返回的清理函数何时执行？',
        ['组件卸载或 effect 重新执行前', '组件渲染后', '组件挂载前', '状态改变后'],
        0,
      ],
      [
        'React 中多个 useEffect 的执行顺序是？',
        ['按代码书写顺序依次执行', '随机执行', '倒序执行', '异步并发执行'],
        0,
      ],
      [
        'React 中 useEffect 和事件处理函数的区别是？',
        [
          'useEffect 由 React 状态变化触发，事件由用户交互触发',
          '没有区别',
          '事件处理异步执行',
          'useEffect 同步执行',
        ],
        0,
      ],
      [
        'React 中如何处理 useEffect 的竞态条件？',
        [
          '使用清理函数忽略过时结果或使用 AbortController',
          '使用 setTimeout',
          '使用同步请求',
          '忽略',
        ],
        0,
      ],
      [
        'React 中 useEffect 获取数据的最佳实践是？',
        ['使用清理函数、处理错误、条件判断', '直接修改 state', '同步获取', '使用 this.setState'],
        0,
      ],
      [
        'React 中自定义 Hook 的返回值推荐什么类型？',
        ['数组或对象', '只能是数组', '只能是对象', '字符串'],
        0,
      ],
      [
        'React 中自定义 Hook 返回数组的好处是？',
        ['可以自由命名变量', '顺序固定', '类型安全', '性能更好'],
        0,
      ],
      [
        'React 中自定义 Hook 返回对象的好处是？',
        ['命名明确，无需关心顺序', '可以自由命名', '代码更短', '性能更好'],
        0,
      ],
      [
        'React 中如何测试自定义 Hook？',
        ['使用 renderHook 工具或将其封装在测试组件中', '直接调用', '使用 useEffect', '无法测试'],
        0,
      ],
      [
        'React 中 Hooks 闭包陷阱的表现是？',
        ['在回调或 effect 中读取到旧的 state 值', '内存泄漏', '无限循环', '类型错误'],
        0,
      ],
      [
        'React 中解决闭包陷阱的方法是？',
        [
          '正确设置依赖项或使用 useRef 保存最新值',
          '不使用 Hooks',
          '使用 this.state',
          '使用全局变量',
        ],
        0,
      ],
      [
        'React 中 useEffect 无限循环的原因通常是？',
        ['依赖项包含每次渲染都变化的引用或对象', '没有依赖项', '依赖项为空', '使用了 useState'],
        0,
      ],
      [
        'React 中如何避免 useEffect 无限循环？',
        [
          '确保依赖项稳定，使用 useMemo/useCallback 包裹',
          '移除依赖项',
          '使用 forceUpdate',
          '不使用 effect',
        ],
        0,
      ],
    ];
    const item = items[(i - 1) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第二部分：React Hooks 进阶 (151-300) ====================
  for (let i = 151; i <= 300; i++) {
    const q = { id: `react-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'React 中 useEffect 的依赖项是数组时，React 如何比较变化？',
        ['Object.is', '===', '==', 'deepEqual'],
        0,
      ],
      [
        'React 中 useEffect 依赖项为对象时会发生什么？',
        ['每次渲染都触发，因为引用不同', '不触发', '偶尔触发', '报错'],
        0,
      ],
      [
        'React 中如何让对象作为依赖项稳定？',
        ['useMemo 包裹对象', '直接使用', 'useState 包裹', 'JSON.stringify'],
        0,
      ],
      [
        'React 中如何让函数作为依赖项稳定？',
        ['useCallback 包裹函数', '直接使用', 'useRef 包裹', 'useEffect 包裹'],
        0,
      ],
      [
        'React 中 useEffect 内部可以使用 async/await 吗？',
        ['不能直接使用，需要内部定义异步函数', '可以直接使用', '只能使用 Promise', '取决于环境'],
        0,
      ],
      [
        'React 中 useEffect 为什么不能直接传入 async 函数？',
        [
          'async 函数返回 Promise，而 effect 需要返回清理函数或无返回值',
          '性能问题',
          '语法限制',
          'React 不支持异步',
        ],
        0,
      ],
      [
        'React 中 useReducer 的 dispatch 函数是稳定的吗？',
        ['是，组件生命周期内不会改变', '否，每次渲染都改变', '取决于 state', '取决于 action'],
        0,
      ],
      [
        'React 中 useState 的 setter 函数是稳定的吗？',
        ['是，不会在重新渲染中改变', '否，每次都改变', '取决于值', '偶尔改变'],
        0,
      ],
      [
        'React 中 dispatch 和 setter 的稳定性意味着什么？',
        ['可以安全地从 useEffect 依赖中移除', '必须加入依赖', '会导致无限循环', '没有意义'],
        0,
      ],
      [
        'React 中 useReducer 相比 useState 的优势是？',
        ['处理复杂逻辑更清晰，状态管理更集中', '性能更好', '语法更简单', '代码更少'],
        0,
      ],
      [
        'React 中 reducer 函数的特点是？',
        ['纯函数，接收旧状态和 action，返回新状态', '可以修改旧状态', '支持异步', '可以访问 DOM'],
        0,
      ],
      [
        'React 中 action 的通常形态是？',
        ['包含 type 和 payload 的对象', '字符串', '函数', '数组'],
        0,
      ],
      [
        'React 中 useReducer 如何初始化复杂状态？',
        [
          '使用第三个参数作为惰性初始化函数',
          '直接赋值对象',
          '使用 useState',
          '在 reducer 中初始化',
        ],
        0,
      ],
      [
        'React 中 useContext 的更新机制是？',
        ['Provider 的 value 变化时触发消费者重渲染', '手动调用更新', '定时更新', 'dispatch 触发'],
        0,
      ],
      [
        'React 中 Context Provider 的 value 使用对象时如何优化？',
        ['使用 useMemo 包裹 value 避免不必要的更新', '不需要优化', '使用 useState', '直接赋值'],
        0,
      ],
      [
        'React 中 useCallback 的依赖项如何确定？',
        ['包含回调内部使用的所有响应式值', '不写依赖', '只写 state', '只写 props'],
        0,
      ],
      [
        'React 中 useMemo 的依赖项如何确定？',
        ['包含计算函数内部使用的所有响应式值', '不写依赖', '只写 state', '只写 props'],
        0,
      ],
      [
        'React 中 useCallback 和 useMemo 的区别是？',
        [
          'useCallback 缓存函数，useMemo 缓存计算结果',
          '没有区别',
          'useCallback 缓存结果，useMemo 缓存函数',
          '两者功能相同',
        ],
        0,
      ],
      [
        'React 中 useRef 的 current 属性初始值是？',
        ['传入的参数或 null', 'undefined', '0', '空字符串'],
        0,
      ],
      [
        'React 中 useRef 可以在组件间传递吗？',
        ['可以，通过 props 或 forwardRef', '不可以', '只能内部使用', '只能父传子'],
        0,
      ],
      [
        'React 中 useImperativeHandle 的第二个参数是什么？',
        ['回调函数，返回暴露给父组件的值', 'ref 对象', '依赖项', '初始值'],
        0,
      ],
      [
        'React 中 useImperativeHandle 的第三个参数是什么？',
        ['依赖项数组', '回调函数', 'ref 对象', '默认值'],
        0,
      ],
      [
        'React 中 useLayoutEffect 与 componentDidMount 的区别是？',
        [
          'useLayoutEffect 在 DOM 更新后同步调用，componentDidMount 在渲染后调用',
          '没有区别',
          '执行顺序不同',
          '参数不同',
        ],
        0,
      ],
      [
        'React 中 useEffect 与 useLayoutEffect 的执行顺序是？',
        ['useLayoutEffect 先于 useEffect', 'useEffect 先于 useLayoutEffect', '同时执行', '不确定'],
        0,
      ],
      [
        'React 中 useLayoutEffect 适用于什么场景？',
        ['读取布局、同步重新渲染、测量 DOM', '数据获取', '事件监听', '修改 state'],
        0,
      ],
      [
        'React 中如何使用 Hooks 处理防抖？',
        [
          '使用 useRef 保存定时器结合 useCallback',
          '直接使用 setTimeout',
          '使用 useEffect',
          '使用 useState',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 处理节流？',
        [
          '使用 useRef 保存定时器结合 useCallback',
          '直接使用 setInterval',
          '使用 useEffect',
          '使用 useState',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 处理上一帧动画？',
        [
          '使用 useRef 保存 requestAnimationFrame ID',
          '使用 useState',
          '使用 useEffect',
          '使用 useMemo',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现组件间通信？',
        ['自定义 Hook 结合 Context 或事件总线', '只能通过 Props', '只能通过 Redux', '无法实现'],
        0,
      ],
      [
        'React 中如何使用 Hooks 管理表单状态？',
        [
          '自定义 useForm Hook 封装 state 和事件处理',
          '只能使用受控组件',
          '只能使用非受控组件',
          '无法封装',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 封装定时器？',
        [
          '自定义 useInterval Hook 管理 setInterval',
          '直接使用 setInterval',
          '使用 setTimeout',
          '使用 requestAnimationFrame',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 封装窗口大小监听？',
        [
          '自定义 useWindowSize Hook 监听 resize 事件',
          '直接监听 resize',
          '使用 CSS 媒体查询',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 封装鼠标位置？',
        [
          '自定义 useMousePosition Hook 监听 mousemove',
          '直接监听 mousemove',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 封装本地存储？',
        [
          '自定义 useLocalStorage Hook 同步 state 和 storage',
          '直接使用 localStorage',
          '使用 sessionStorage',
          '使用 Cookie',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 封装滚动位置？',
        [
          '自定义 useScrollPosition Hook 监听 scroll 事件',
          '直接监听 scroll',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 封装网络请求？',
        [
          '自定义 useFetch Hook 管理加载、数据和错误状态',
          '直接使用 fetch',
          '使用 axios',
          '使用 useEffect',
        ],
        0,
      ],
      [
        'React 中 useFetch Hook 的典型返回值包括？',
        ['data, error, loading', 'response, status', 'promise, cancel', 'data, fetch'],
        0,
      ],
      [
        'React 中如何取消 useEffect 中的 fetch 请求？',
        ['使用 AbortController', '无法取消', '使用 clearTimeout', '使用 cancel()'],
        0,
      ],
      [
        'React 中 AbortController 的作用是？',
        ['中止一个或多个 Web 请求', '中止 DOM 操作', '中止事件', '中止渲染'],
        0,
      ],
      [
        'React 中 useEffect 中使用 AbortController 的流程是？',
        [
          '创建 controller，传递 signal 给 fetch，清理时调用 abort',
          '直接调用 abort',
          '在 fetch 后 abort',
          '在 then 中 abort',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现权限控制？',
        ['自定义 useAuth Hook 结合 Context', '直接判断', '使用 Redux', '使用路由守卫'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现国际化？',
        ['自定义 useI18n Hook 结合 Context', '直接使用 JSON', '使用 Redux', '使用 i18n 库'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现主题切换？',
        [
          '自定义 useTheme Hook 结合 Context 和 CSS 变量',
          '直接修改 CSS',
          '使用 Redux',
          '使用 styled-components',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现全屏功能？',
        ['自定义 useFullscreen Hook 封装 Fullscreen API', '直接调用 API', '使用 CSS', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现剪贴板功能？',
        [
          '自定义 useClipboard Hook 封装 Clipboard API',
          '直接调用 API',
          '使用 document.execCommand',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现网络状态检测？',
        [
          '自定义 useOnlineStatus Hook 监听 online/offline 事件',
          '直接监听事件',
          '使用 navigator.onLine',
          '使用 ping',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现地理位置？',
        [
          '自定义 useGeolocation Hook 封装 Geolocation API',
          '直接调用 API',
          '使用 IP 定位',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现媒体查询？',
        [
          '自定义 useMediaQuery Hook 监听 matchMedia 变化',
          '使用 CSS 媒体查询',
          '使用 window.innerWidth',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现倒计时？',
        [
          '自定义 useCountdown Hook 结合 useEffect 和 setInterval',
          '直接使用 setInterval',
          '使用 setTimeout',
          '使用 requestAnimationFrame',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现计数器？',
        [
          '自定义 useCounter Hook 封装 useState 和增减逻辑',
          '直接使用 useState',
          '使用 useReducer',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现步骤条？',
        [
          '自定义 useStepper Hook 管理当前步骤和导航',
          '直接使用 useState',
          '使用 useReducer',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现分页？',
        [
          '自定义 usePagination Hook 管理页码和数据切片',
          '直接使用 useState',
          '使用 useReducer',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现虚拟列表？',
        [
          '自定义 useVirtual Hook 计算可见区域和偏移',
          '直接渲染全部',
          '使用 CSS 分页',
          '使用 Intersection Observer',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现拖拽？',
        [
          '自定义 useDrag 和 useDrop Hook 封装 HTML5 DnD API',
          '直接监听事件',
          '使用第三方库',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现动画？',
        [
          '自定义 useAnimation Hook 结合 useRef 和 requestAnimationFrame',
          '直接使用 CSS',
          '使用 setTimeout',
          '使用 setInterval',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现焦点管理？',
        [
          '自定义 useFocus Hook 结合 useRef 和 focus/blur 方法',
          '直接操作 DOM',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现点击外部检测？',
        [
          '自定义 useClickOutside Hook 结合 useRef 和事件监听',
          '直接监听 document',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现 Intersection Observer？',
        [
          '自定义 useIntersection Hook 封装 IO API 监听元素可见性',
          '直接使用 IO API',
          '使用 scroll 事件',
          '使用 getBoundingClientRect',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现 Web Worker？',
        [
          '自定义 useWorker Hook 封装 Worker 创建和通信',
          '直接创建 Worker',
          '使用 setTimeout',
          '使用 Promise',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现 WebSocket？',
        [
          '自定义 useWebSocket Hook 管理 WS 连接、消息和重连',
          '直接创建 WS',
          '使用 fetch',
          '使用 axios',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现文件上传？',
        [
          '自定义 useFileUpload Hook 封装 FormData 和 fetch',
          '直接使用 input',
          '使用 axios',
          '使用 FormData',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现文件下载？',
        [
          '自定义 useDownload Hook 封装 Blob 和 URL.createObjectURL',
          '直接使用 a 标签',
          '使用 fetch',
          '使用 axios',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现数据加密？',
        [
          '自定义 useCrypto Hook 封装 Web Crypto API',
          '直接使用 CryptoJS',
          '使用 HTTPS',
          '无法实现',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现数据序列化？',
        [
          '自定义 useSerialization Hook 封装 JSON 方法',
          '直接使用 JSON',
          '使用 protobuf',
          '使用 XML',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现数据验证？',
        [
          '自定义 useValidation Hook 结合验证规则和状态',
          '直接判断',
          '使用 PropTypes',
          '使用 TypeScript',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现数据格式化？',
        ['自定义 useFormat Hook 封装格式化逻辑', '直接调用方法', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现数据脱敏？',
        ['自定义 useMask Hook 封装脱敏逻辑', '直接替换字符串', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现数据聚合？',
        ['自定义 useAggregate Hook 封装聚合逻辑', '直接使用 reduce', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现数据分组？',
        ['自定义 useGroupBy Hook 封装分组逻辑', '直接使用 reduce', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现数据统计？',
        ['自定义 useStatistics Hook 封装统计逻辑', '直接使用 Math', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现数据对比？',
        ['自定义 useDiff Hook 封装对比逻辑', '直接比较', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现数据同步？',
        ['自定义 useSync Hook 封装同步逻辑', '直接赋值', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现数据迁移？',
        ['自定义 useMigration Hook 封装迁移逻辑', '直接修改', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现数据备份？',
        ['自定义 useBackup Hook 封装备份逻辑', '直接复制', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现数据恢复？',
        ['自定义 useRestore Hook 封装恢复逻辑', '直接覆盖', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现数据清理？',
        ['自定义 useCleanup Hook 封装清理逻辑', '直接删除', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现数据压缩？',
        ['自定义 useCompress Hook 封装压缩库', '直接使用 zlib', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现数据解压？',
        ['自定义 useDecompress Hook 封装解压库', '直接使用 zlib', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现数据校验？',
        ['自定义 useChecksum Hook 封装校验逻辑', '直接计算', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现数据合并？',
        [
          '自定义 useMerge Hook 封装合并逻辑',
          '直接使用 Object.assign',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 处理复杂表单？',
        [
          '自定义 useFormControl Hook 管理字段、验证和提交',
          '直接使用 useState',
          '使用 useReducer',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 处理多步表单？',
        [
          '自定义 useMultiStepForm Hook 管理步骤和数据',
          '直接使用 useState',
          '使用 useReducer',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 处理动态表单？',
        [
          '自定义 useDynamicForm Hook 管理字段增删',
          '直接使用 useState',
          '使用 useReducer',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 处理表单验证？',
        [
          '自定义 useFormValidation Hook 结合规则和错误状态',
          '直接判断',
          '使用 PropTypes',
          '使用 TypeScript',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 处理表单提交？',
        [
          '自定义 useFormSubmit Hook 封装提交和加载状态',
          '直接使用 fetch',
          '使用 axios',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 处理表单重置？',
        [
          '自定义 useFormReset Hook 保存初始值并提供重置方法',
          '直接赋值',
          '使用 forceUpdate',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 处理表单联动？',
        [
          '自定义 useCascader Hook 监听字段变化更新其他字段',
          '直接监听',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 处理表单异步验证？',
        [
          '自定义 useAsyncValidation Hook 结合 debounce 和 fetch',
          '直接验证',
          '使用 setTimeout',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 处理表单防重复提交？',
        [
          '自定义 useSubmitLock Hook 管理提交状态',
          '直接使用 loading',
          '使用 disabled',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 处理表单草稿保存？',
        [
          '自定义 useDraft Hook 结合 localStorage 和 debounce',
          '直接保存',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 处理表单数据转换？',
        ['自定义 useTransform Hook 封装输入输出转换', '直接转换', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 处理表单历史记录？',
        [
          '自定义 useFormHistory Hook 保存操作记录实现撤销重做',
          '直接保存数组',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现乐观更新？',
        [
          '自定义 useOptimistic Hook 先更新 UI 失败回滚',
          '直接更新 state',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现撤销重做？',
        ['自定义 useUndoRedo Hook 管理历史栈', '直接保存 state', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现拖拽排序？',
        [
          '自定义 useDragSort Hook 结合 DnD 和状态管理',
          '直接监听事件',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现无限滚动？',
        [
          '自定义 useInfiniteScroll Hook 结合 IO 和数据加载',
          '直接监听 scroll',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现图片懒加载？',
        [
          '自定义 useLazyLoad Hook 结合 IO 和 data-src',
          '直接监听 scroll',
          '使用 Context',
          '使用 CSS',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现剪贴板操作？',
        [
          '自定义 useClipboard Hook 封装 Navigator.clipboard',
          '直接调用 API',
          '使用 document.execCommand',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现全屏切换？',
        [
          '自定义 useFullscreen Hook 封装 Fullscreen API',
          '直接调用 API',
          '使用 CSS',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现通知权限？',
        [
          '自定义 useNotification Hook 封装 Notification API',
          '直接调用 API',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现音频播放？',
        ['自定义 useAudio Hook 封装 Audio 对象', '直接创建 Audio', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现视频播放？',
        ['自定义 useVideo Hook 封装 Video 对象', '直接创建 Video', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现键盘快捷键？',
        ['自定义 useKeyPress Hook 监听 keydown 事件', '直接监听事件', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现鼠标追踪？',
        [
          '自定义 useMouseTracker Hook 监听 mousemove',
          '直接监听事件',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现触摸手势？',
        ['自定义 useGesture Hook 封装 Touch 事件', '直接监听事件', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现传感器数据？',
        [
          '自定义 useSensor Hook 封装 DeviceOrientation API',
          '直接监听事件',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现支付请求？',
        [
          '自定义 usePayment Hook 封装 Payment Request API',
          '直接调用 API',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现分享功能？',
        [
          '自定义 useShare Hook 封装 Navigator.share API',
          '直接调用 API',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现语音识别？',
        [
          '自定义 useSpeechRecognition Hook 封装 Web Speech API',
          '直接调用 API',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现语音合成？',
        [
          '自定义 useSpeechSynthesis Hook 封装 Web Speech API',
          '直接调用 API',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现蓝牙通信？',
        [
          '自定义 useBluetooth Hook 封装 Web Bluetooth API',
          '直接调用 API',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现 USB 通信？',
        ['自定义 useUSB Hook 封装 WebUSB API', '直接调用 API', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现串口通信？',
        ['自定义 useSerial Hook 封装 Web Serial API', '直接调用 API', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现 NFC 通信？',
        ['自定义 useNFC Hook 封装 Web NFC API', '直接调用 API', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现文件系统访问？',
        [
          '自定义 useFileSystem Hook 封装 File System Access API',
          '直接调用 API',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现屏幕方向监听？',
        [
          '自定义 useOrientation Hook 封装 Screen Orientation API',
          '直接监听事件',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现电池状态监听？',
        [
          '自定义 useBattery Hook 封装 Battery Status API',
          '直接调用 API',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现 VR 展示？',
        ['自定义 useVR Hook 封装 WebXR API', '直接调用 API', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现 AR 展示？',
        ['自定义 useAR Hook 封装 WebXR API', '直接调用 API', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现画中画？',
        [
          '自定义 usePictureInPicture Hook 封装 Picture-in-Picture API',
          '直接调用 API',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现屏幕录制？',
        [
          '自定义 useScreenCapture Hook 封装 MediaRecorder API',
          '直接调用 API',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现摄像头拍照？',
        ['自定义 useCamera Hook 封装 getUserMedia', '直接调用 API', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现二维码扫描？',
        [
          '自定义 useQRCode Hook 封装 BarcodeDetector API',
          '直接调用 API',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现地理围栏？',
        [
          '自定义 useGeofence Hook 封装 Geolocation API',
          '直接调用 API',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现网络信息监听？',
        [
          '自定义 useNetworkInfo Hook 封装 Network Information API',
          '直接调用 API',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现页面可见性监听？',
        [
          '自定义 usePageVisibility Hook 封装 Page Visibility API',
          '直接监听事件',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现在线支付？',
        ['自定义 useOnlinePayment Hook 封装支付 SDK', '直接调用 SDK', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现实时通信？',
        ['自定义 useRTC Hook 封装 WebRTC API', '直接调用 API', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现数据可视化？',
        ['自定义 useChart Hook 封装 ECharts/D3 逻辑', '直接操作 DOM', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现代码编辑器？',
        [
          '自定义 useCodeEditor Hook 封装 Monaco 逻辑',
          '直接操作 DOM',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现富文本编辑器？',
        [
          '自定义 useRichText Hook 封装 Quill/Slate 逻辑',
          '直接操作 DOM',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现地图交互？',
        [
          '自定义 useMap Hook 封装 Mapbox/Leaflet 逻辑',
          '直接操作 DOM',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现树形控件？',
        [
          '自定义 useTree Hook 管理节点展开和选中',
          '直接使用 useState',
          '使用 useReducer',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现标签页？',
        [
          '自定义 useTabs Hook 管理激活面板',
          '直接使用 useState',
          '使用 useReducer',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现对话框？',
        [
          '自定义 useModal Hook 管理可见性和回调',
          '直接使用 useState',
          '使用 useReducer',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现消息提示？',
        [
          '自定义 useMessage Hook 管理提示队列',
          '直接使用 useState',
          '使用 useReducer',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现通知提醒？',
        [
          '自定义 useNotification Hook 管理通知列表',
          '直接使用 useState',
          '使用 useReducer',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现抽屉？',
        [
          '自定义 useDrawer Hook 管理抽屉开关',
          '直接使用 useState',
          '使用 useReducer',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现气泡卡片？',
        [
          '自定义 usePopover Hook 管理定位和可见性',
          '直接使用 useState',
          '使用 useReducer',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现下拉菜单？',
        [
          '自定义 useDropdown Hook 管理展开和选中',
          '直接使用 useState',
          '使用 useReducer',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现自动完成？',
        [
          '自定义 useAutocomplete Hook 管理输入和建议',
          '直接使用 useState',
          '使用 useReducer',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现级联选择？',
        [
          '自定义 useCascader Hook 管理选项和加载',
          '直接使用 useState',
          '使用 useReducer',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现穿梭框？',
        [
          '自定义 useTransfer Hook 管理数据源和选中项',
          '直接使用 useState',
          '使用 useReducer',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现时间线？',
        [
          '自定义 useTimeline Hook 管理时间节点',
          '直接使用 useState',
          '使用 useReducer',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现轮播图？',
        [
          '自定义 useCarousel Hook 管理当前索引和自动播放',
          '直接使用 useState',
          '使用 useReducer',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现锚点？',
        [
          '自定义 useAnchor Hook 管理活动链接和滚动',
          '直接使用 useState',
          '使用 useReducer',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现返回顶部？',
        [
          '自定义 useBackTop Hook 监听滚动并控制显示',
          '直接使用 useState',
          '使用 useReducer',
          '使用 Context',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现水印？',
        ['自定义 useWatermark Hook 生成 Canvas 水印', '直接操作 DOM', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现权限指令？',
        ['自定义 usePermission Hook 判断权限并控制渲染', '直接判断', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现异步管道？',
        [
          '自定义 useAsyncPipe Hook 链式处理异步数据',
          '直接使用 Promise',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现响应式布局？',
        ['自定义 useResponsive Hook 监听断点变化', '直接使用 CSS', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现主题切换？',
        ['自定义 useTheme Hook 结合 CSS 变量', '直接修改 CSS', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现国际化？',
        ['自定义 useI18n Hook 管理语言包和切换', '直接使用 JSON', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现错误边界？',
        ['Hooks 无法实现，必须使用类组件', '使用 useEffect', '使用 useState', '使用 try/catch'],
        0,
      ],
      [
        'React 中为什么 Hooks 无法实现错误边界？',
        [
          '错误边界需要 getDerivedStateFromError，Hooks 无对应 API',
          '性能问题',
          '设计缺陷',
          '未来会支持',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 处理未捕获的错误？',
        ['使用 window.onerror 或 error 事件', '无法处理', '使用 try/catch', '使用 useEffect'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现路由拦截？',
        ['自定义 useRouteGuard Hook 结合路由钩子', '直接判断', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现 SEO？',
        [
          '自定义 useSEO Hook 动态修改 document.title 和 meta',
          '直接修改 DOM',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现埋点？',
        ['自定义 useTracking Hook 监听行为上报数据', '直接上报', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现性能监控？',
        [
          '自定义 usePerformance Hook 封装 Performance API',
          '直接调用 API',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现日志记录？',
        [
          '自定义 useLogger Hook 在生命周期记录状态',
          '直接 console.log',
          '使用 Context',
          '使用 Redux',
        ],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现断点调试？',
        ['自定义 useDebug Hook 结合 debugger', '直接 debugger', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中如何使用 Hooks 实现单元测试？',
        ['使用 renderHook 和 act 工具测试', '直接调用函数', '使用 Context', '使用 Redux'],
        0,
      ],
      [
        'React 中 renderHook 工具的作用是？',
        ['在测试环境中渲染自定义 Hook', '渲染组件', '模拟 DOM', '模拟事件'],
        0,
      ],
      [
        'React 中 act 工具的作用是？',
        ['确保所有状态更新和副作用在断言前执行完毕', '触发渲染', '模拟事件', '创建组件'],
        0,
      ],
      [
        'React 中测试 Hooks 时为什么要使用 act？',
        ['React 状态更新是异步的，act 确保同步完成', '提高性能', '语法要求', '类型检查'],
        0,
      ],
      [
        'React 中如何测试 useEffect？',
        ['使用 act 渲染并等待副作用执行后断言', '直接断言', '使用 spy', '无法测试'],
        0,
      ],
      [
        'React 中如何测试 useRef？',
        ['渲染 Hook 后断言 current 值', '直接断言', '使用 spy', '无法测试'],
        0,
      ],
      [
        'React 中如何测试 useContext？',
        ['使用 Wrapper 包裹 Provider 后渲染测试', '直接渲染', '模拟 Context', '无法测试'],
        0,
      ],
      [
        'React 中如何测试 useCallback？',
        ['比较函数引用或执行结果', '直接比较', '使用 spy', '无法测试'],
        0,
      ],
      ['React 中如何测试 useMemo？', ['比较计算结果或性能', '直接比较', '使用 spy', '无法测试'], 0],
      [
        'React 中如何测试 useReducer？',
        ['调用 dispatch 并断言状态变化', '直接断言', '使用 spy', '无法测试'],
        0,
      ],
    ];
    const item = items[(i - 151) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第三部分：React Router (301-400) ====================
  for (let i = 301; i <= 400; i++) {
    const q = { id: `react-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'React Router 的主要作用是？',
        ['实现单页应用的路由管理', '状态管理', 'UI 组件库', '网络请求'],
        0,
      ],
      [
        'React Router v6 的主要变化是？',
        ['API 更简洁、相对路由、嵌套路由优化', '支持 Hash 路由', '移除 Hooks', '增加 Redux 集成'],
        0,
      ],
      [
        'React Router 中 BrowserRouter 的作用是？',
        ['使用 HTML5 History API 的路由器', '使用 Hash 的路由器', '内存路由器', '静态路由器'],
        0,
      ],
      [
        'React Router 中 HashRouter 的作用是？',
        ['使用 URL Hash 的路由器', '使用 History API 的路由器', '内存路由器', '静态路由器'],
        0,
      ],
      [
        'React Router 中 MemoryRouter 的作用是？',
        ['将路由保存在内存中，不修改 URL', '使用 History API', '使用 Hash', '持久化路由'],
        0,
      ],
      [
        'React Router 中 StaticRouter 的作用是？',
        ['用于服务端渲染的路由器', '客户端路由', '内存路由', 'Hash 路由'],
        0,
      ],
      [
        'React Router 中 Routes 组件的作用是？',
        ['根据路径匹配渲染路由', '定义路由', '导航链接', '路由守卫'],
        0,
      ],
      [
        'React Router 中 Route 组件的作用是？',
        ['定义路径与组件的映射关系', '匹配路由', '导航链接', '路由守卫'],
        0,
      ],
      [
        'React Router 中 Route 的 path 属性作用是？',
        ['定义匹配的 URL 路径', '定义组件', '定义参数', '定义重定向'],
        0,
      ],
      [
        'React Router 中 Route 的 element 属性作用是？',
        ['指定匹配时渲染的 React 元素', '指定组件路径', '指定重定向', '指定守卫'],
        0,
      ],
      [
        'React Router 中 Link 组件的作用是？',
        ['提供声明式导航', '匹配路由', '渲染组件', '重定向'],
        0,
      ],
      [
        'React Router 中 NavLink 组件的作用是？',
        ['提供带激活状态的导航链接', '普通链接', '匹配路由', '重定向'],
        0,
      ],
      [
        'React Router 中 NavLink 的 activeClassName 作用是？',
        ['设置激活时的类名', '设置默认类名', '设置悬停类名', '设置禁用类名'],
        0,
      ],
      [
        'React Router 中 Navigate 组件的作用是？',
        ['实现声明式重定向', '导航链接', '匹配路由', '渲染组件'],
        0,
      ],
      [
        'React Router 中 Outlet 组件的作用是？',
        ['渲染子路由的占位组件', '导航链接', '重定向', '路由守卫'],
        0,
      ],
      [
        'React Router 中 useNavigate Hook 的作用是？',
        ['编程式导航', '获取参数', '获取路由信息', '路由守卫'],
        0,
      ],
      [
        'React Router 中 useParams Hook 的作用是？',
        ['获取动态路由参数', '获取查询参数', '获取路径', '获取路由信息'],
        0,
      ],
      [
        'React Router 中 useLocation Hook 的作用是？',
        ['获取当前 URL 信息', '获取参数', '导航', '路由守卫'],
        0,
      ],
      [
        'React Router 中 useSearchParams Hook 的作用是？',
        ['获取和设置查询参数', '获取动态参数', '获取路径', '获取路由信息'],
        0,
      ],
      [
        'React Router 中 useRoutes Hook 的作用是？',
        ['使用对象配置定义路由', '获取路由信息', '导航', '路由守卫'],
        0,
      ],
      [
        'React Router 中 useMatch Hook 的作用是？',
        ['匹配指定路径并返回信息', '获取参数', '导航', '路由守卫'],
        0,
      ],
      [
        'React Router 中 useNavigate 的 replace 选项作用是？',
        ['替换当前历史记录而不是推入', '延迟导航', '刷新页面', '取消导航'],
        0,
      ],
      [
        'React Router 中 useNavigate 的 state 选项作用是？',
        ['传递隐藏的状态数据到新路由', '设置参数', '设置查询', '设置路径'],
        0,
      ],
      ['React Router 中动态路由参数如何定义？', [':id', '{id}', '<id>', '[id]'], 0],
      ['React Router 中通配符路由如何定义？', ['*', ':all', '**', '/...'], 0],
      [
        'React Router 中如何实现嵌套路由？',
        [
          '在父路由中定义 children 并使用 Outlet',
          '使用嵌套 Routes',
          '使用嵌套 Link',
          '使用嵌套 Navigate',
        ],
        0,
      ],
      [
        'React Router 中相对路由的优势是？',
        ['无需从根路径写起，构建更灵活', '性能更好', '支持 Hash', '支持 SSR'],
        0,
      ],
      [
        'React Router v6 中如何实现路由守卫？',
        [
          '自定义组件判断 Auth 后渲染 Outlet 或 Navigate',
          '使用 onEnter 钩子',
          '使用 beforeEach',
          '使用中间件',
        ],
        0,
      ],
      [
        'React Router 中如何实现懒加载路由组件？',
        [
          'React.lazy + Suspense 包裹 element',
          'import() 直接使用',
          'require()',
          'Webpack 魔法注释',
        ],
        0,
      ],
      [
        'React Router 中如何获取上一页路径？',
        ['使用 useLocation 的 state 或 history', '无法获取', '使用 useNavigate', '使用 useParams'],
        0,
      ],
      [
        'React Router 中如何监听路由变化？',
        ['使用 useLocation 结合 useEffect', '使用 watch', '使用 onRouteChange', '使用 beforeEach'],
        0,
      ],
      [
        'React Router 中如何实现页面滚动恢复？',
        [
          '自定义 ScrollToTop 组件监听路由变化',
          '使用 scrollRestoration',
          '使用浏览器默认',
          '无法实现',
        ],
        0,
      ],
      [
        'React Router 中如何实现 404 页面？',
        [
          '使用通配符 * 路径匹配所有未命中路由',
          '使用 ErrorBoundary',
          '使用 redirect',
          '使用 catch',
        ],
        0,
      ],
      [
        'React Router 中 BrowserRouter 和 HashRouter 的选择？',
        [
          'BrowserRouter URL 美观需服务器配置，HashRouter 兼容性好',
          '总是使用 HashRouter',
          '总是使用 BrowserRouter',
          '没有区别',
        ],
        0,
      ],
      [
        'React Router 中如何实现路由动画？',
        ['结合 useLocation 和 TransitionGroup', '使用内置动画', '使用 CSS only', '无法实现'],
        0,
      ],
      [
        'React Router 中如何实现权限路由？',
        ['封装 ProtectedRoute 组件判断权限', '使用 onEnter', '使用 beforeEach', '使用中间件'],
        0,
      ],
      [
        'React Router 中如何实现路由缓存？',
        [
          'React Router 不支持，需结合 KeepAlive 或状态管理',
          '使用 CacheRoute',
          '使用 keepAlive 属性',
          '使用 Outlet',
        ],
        0,
      ],
      [
        'React Router 中如何实现路由元信息？',
        ['在路由配置中添加自定义字段并在渲染时读取', '使用 meta 属性', '使用 useMeta', '无法实现'],
        0,
      ],
      [
        'React Router 中如何实现查询参数解析？',
        [
          '使用 useSearchParams 或自定义解析',
          '使用 useParams',
          '使用 useLocation',
          '使用 useQuery',
        ],
        0,
      ],
      [
        'React Router 中如何实现路由跳转前确认？',
        [
          '自定义 Prompt 组件或 useBlocker',
          '使用 onBeforeLeave',
          '使用 beforeEach',
          '使用 confirm',
        ],
        0,
      ],
      [
        'React Router 中如何实现多布局路由？',
        ['在父路由中使用不同布局组件包裹 Outlet', '使用 Layout 组件', '使用 CSS', '无法实现'],
        0,
      ],
      [
        'React Router 中如何实现路由别名？',
        ['配置多个指向同一组件的路径', '使用 alias 属性', '使用 redirect', '无法实现'],
        0,
      ],
      [
        'React Router 中如何实现路由重定向？',
        ['使用 Navigate 组件或 useNavigate', '使用 redirect 属性', '使用 alias', '使用 push'],
        0,
      ],
      [
        'React Router 中如何实现路由过渡动画？',
        ['结合 CSSTransition 和 useLocation', '使用内置动画', '使用 CSS only', '无法实现'],
        0,
      ],
      [
        'React Router 中如何实现路由预加载？',
        ['在 Link 悬停时动态 import 组件', '使用 preload 属性', '使用 prefetch', '无法实现'],
        0,
      ],
      [
        'React Router 中如何实现路由切换埋点？',
        [
          '在 useLocation 的 useEffect 中上报',
          '使用 onRouteChange',
          '使用 beforeEach',
          '使用中间件',
        ],
        0,
      ],
      [
        'React Router 中如何实现路由切换进度条？',
        ['监听路由变化显示 NProgress', '使用内置进度条', '使用 CSS only', '无法实现'],
        0,
      ],
      [
        'React Router 中如何实现路由切换取消请求？',
        ['在路由变化时使用 AbortController 取消', '使用 cancelToken', '使用 cancel', '无法实现'],
        0,
      ],
      [
        'React Router 中如何实现路由切换数据预取？',
        [
          '在 Loader 函数中预取或使用 useLoaderData',
          '在 useEffect 中获取',
          '在 render 中获取',
          '无法实现',
        ],
        0,
      ],
      [
        'React Router 中如何实现路由切换动画？',
        ['使用 Framer Motion 包裹 Outlet', '使用内置动画', '使用 CSS only', '无法实现'],
        0,
      ],
      [
        'React Router 中如何实现路由切换缓存？',
        [
          '使用 react-activation 等库模拟 KeepAlive',
          '使用 keepAlive 属性',
          '使用 CacheRoute',
          '无法实现',
        ],
        0,
      ],
      [
        'React Router 中如何实现路由切换确认？',
        ['使用 useBlocker 或自定义 Prompt', '使用 onBeforeLeave', '使用 confirm', '无法实现'],
        0,
      ],
      [
        'React Router 中如何实现路由切换拦截？',
        ['使用 useBlocker', '使用 onBeforeLeave', '使用 beforeEach', '使用中间件'],
        0,
      ],
      [
        'React Router 中如何实现路由切换监听？',
        ['使用 useLocation 配合 useEffect', '使用 onRouteChange', '使用 watch', '使用 subscribe'],
        0,
      ],
      [
        'React Router 中如何实现路由切换动画库？',
        ['Framer Motion, React Transition Group', 'Animate.css', 'GSAP', 'Mo.js'],
        0,
      ],
      [
        'React Router 中如何实现路由切换性能优化？',
        ['路由懒加载、预加载、缓存', '减少路由', '使用 HashRouter', '使用 MemoryRouter'],
        0,
      ],
      [
        'React Router 中如何实现路由切换错误处理？',
        ['ErrorBoundary 结合路由', '使用 try/catch', '使用 onError', '无法处理'],
        0,
      ],
      [
        'React Router 中如何实现路由切换重试？',
        ['在错误边界中提供重试按钮', '使用 retry 属性', '使用 onError', '无法实现'],
        0,
      ],
      [
        'React Router 中如何实现路由切换超时？',
        ['在 Loader 中设置超时逻辑', '使用 timeout 属性', '使用 setTimeout', '无法实现'],
        0,
      ],
      [
        'React Router 中如何实现路由切换取消？',
        ['使用 AbortController', '使用 cancelToken', '使用 cancel', '无法实现'],
        0,
      ],
      [
        'React Router 中如何实现路由切换并发？',
        ['使用 Suspense 和 Transition', '使用 Promise.all', '使用 Web Worker', '无法实现'],
        0,
      ],
      [
        'React Router 中如何实现路由切换中断？',
        ['使用 AbortController', '使用 cancelToken', '使用 cancel', '无法实现'],
        0,
      ],
      [
        'React Router 中如何实现路由切换恢复？',
        ['使用状态管理保存滚动位置', '使用 scrollRestoration', '使用浏览器默认', '无法实现'],
        0,
      ],
      [
        'React Router 中如何实现路由切换缓存组件？',
        ['使用 react-activation 等库', '使用 keepAlive 属性', '使用 CacheRoute', '无法实现'],
        0,
      ],
      [
        'React Router 中如何实现路由切换动画效果？',
        ['使用 Framer Motion', '使用 Animate.css', '使用 GSAP', '使用 CSS Transition'],
        0,
      ],
      [
        'React Router 中如何实现路由切换过渡效果？',
        ['使用 React Transition Group', '使用 Animate.css', '使用 GSAP', '使用 CSS Transition'],
        0,
      ],
      [
        'React Router 中如何实现路由切换加载效果？',
        ['使用 Suspense fallback', '使用 NProgress', '使用 Spinner', '使用 Skeleton'],
        0,
      ],
      [
        'React Router 中如何实现路由切换错误效果？',
        ['使用 ErrorBoundary', '使用 404 页面', '使用 Redirect', '使用 Alert'],
        0,
      ],
      [
        'React Router 中如何实现路由切换重试效果？',
        ['在 ErrorBoundary 中提供重试', '使用 retry 按钮', '使用 reload', '无法实现'],
        0,
      ],
      [
        'React Router 中如何实现路由切换超时效果？',
        ['在 Loader 中超时显示提示', '使用 timeout 属性', '使用 setTimeout', '无法实现'],
        0,
      ],
      [
        'React Router 中如何实现路由切换取消效果？',
        ['在清理函数中取消请求', '使用 cancelToken', '使用 cancel', '无法实现'],
        0,
      ],
      [
        'React Router 中如何实现路由切换并发效果？',
        ['使用 Suspense 和 Transition', '使用 Promise.all', '使用 Web Worker', '无法实现'],
        0,
      ],
      [
        'React Router 中如何实现路由切换中断效果？',
        ['使用 AbortController', '使用 cancelToken', '使用 cancel', '无法实现'],
        0,
      ],
      [
        'React Router 中如何实现路由切换恢复效果？',
        ['使用状态管理恢复滚动', '使用 scrollRestoration', '使用浏览器默认', '无法实现'],
        0,
      ],
      [
        'React Router 中如何实现路由切换缓存效果？',
        ['使用 react-activation', '使用 keepAlive', '使用 CacheRoute', '无法实现'],
        0,
      ],
      [
        'React Router 中如何实现路由切换动画配置？',
        ['在 Framer Motion 中设置 variants', '使用 animate 属性', '使用 CSS', '无法配置'],
        0,
      ],
      [
        'React Router 中如何实现路由切换过渡配置？',
        ['在 Transition Group 中设置 timeout', '使用 transition 属性', '使用 CSS', '无法配置'],
        0,
      ],
      [
        'React Router 中如何实现路由切换加载配置？',
        ['在 Suspense 中设置 fallback', '使用 loading 属性', '使用 CSS', '无法配置'],
        0,
      ],
      [
        'React Router 中如何实现路由切换错误配置？',
        ['在 ErrorBoundary 中设置 fallback', '使用 error 属性', '使用 CSS', '无法配置'],
        0,
      ],
      [
        'React Router 中如何实现路由切换重试配置？',
        ['在 ErrorBoundary 中设置重试逻辑', '使用 retry 属性', '使用 CSS', '无法配置'],
        0,
      ],
      [
        'React Router 中如何实现路由切换超时配置？',
        ['在 Loader 中设置超时时间', '使用 timeout 属性', '使用 CSS', '无法配置'],
        0,
      ],
      [
        'React Router 中如何实现路由切换取消配置？',
        ['使用 AbortController 设置超时取消', '使用 cancelToken', '使用 cancel', '无法配置'],
        0,
      ],
      [
        'React Router 中如何实现路由切换并发配置？',
        ['使用 Suspense 和 Transition 配置', '使用 Promise.all', '使用 Web Worker', '无法配置'],
        0,
      ],
      [
        'React Router 中如何实现路由切换中断配置？',
        ['使用 AbortController 设置中断逻辑', '使用 cancelToken', '使用 cancel', '无法配置'],
        0,
      ],
      [
        'React Router 中如何实现路由切换恢复配置？',
        ['在状态管理中配置恢复逻辑', '使用 scrollRestoration', '使用浏览器默认', '无法配置'],
        0,
      ],
      [
        'React Router 中如何实现路由切换缓存配置？',
        [
          '在 react-activation 中配置缓存策略',
          '使用 keepAlive 属性',
          '使用 CacheRoute',
          '无法配置',
        ],
        0,
      ],
      [
        'React Router 中如何实现路由切换动画优化？',
        ['使用 will-change 和 transform', '减少 DOM 操作', '使用 GPU 加速', '以上都是'],
        0,
      ],
      [
        'React Router 中如何实现路由切换过渡优化？',
        ['减少不必要的动画', '使用 CSS 硬件加速', '使用 requestAnimationFrame', '以上都是'],
        0,
      ],
      [
        'React Router 中如何实现路由切换加载优化？',
        ['使用骨架屏和懒加载', '使用预加载', '使用缓存', '以上都是'],
        0,
      ],
      [
        'React Router 中如何实现路由切换错误优化？',
        ['提供友好的错误提示和重试', '使用 ErrorBoundary', '使用日志记录', '以上都是'],
        0,
      ],
      [
        'React Router 中如何实现路由切换重试优化？',
        ['限制重试次数和退避策略', '使用指数退避', '使用随机退避', '以上都是'],
        0,
      ],
      [
        'React Router 中如何实现路由切换超时优化？',
        ['设置合理的超时时间', '使用断路器', '使用降级', '以上都是'],
        0,
      ],
      [
        'React Router 中如何实现路由切换取消优化？',
        ['及时取消无用请求', '使用 AbortController', '使用清理函数', '以上都是'],
        0,
      ],
      [
        'React Router 中如何实现路由切换并发优化？',
        ['使用 Suspense 和 Transition', '使用并发特性', '使用 Web Worker', '以上都是'],
        0,
      ],
      [
        'React Router 中如何实现路由切换中断优化？',
        ['使用 AbortController', '使用清理函数', '使用标志位', '以上都是'],
        0,
      ],
      [
        'React Router 中如何实现路由切换恢复优化？',
        ['恢复滚动位置和表单数据', '使用状态管理', '使用 localStorage', '以上都是'],
        0,
      ],
      [
        'React Router 中如何实现路由切换缓存优化？',
        ['使用 LRU 缓存策略', '限制缓存大小', '手动清理缓存', '以上都是'],
        0,
      ],
      [
        'React Router 中如何实现路由切换动画性能监控？',
        ['使用 Performance API 监控', '使用 React Profiler', '使用 Chrome DevTools', '以上都是'],
        0,
      ],
      [
        'React Router 中如何实现路由切换过渡性能监控？',
        ['使用 Performance API 监控', '使用 React Profiler', '使用 Chrome DevTools', '以上都是'],
        0,
      ],
      [
        'React Router 中如何实现路由切换加载性能监控？',
        ['使用 Performance API 监控', '使用 React Profiler', '使用 Chrome DevTools', '以上都是'],
        0,
      ],
      [
        'React Router 中如何实现路由切换错误性能监控？',
        ['使用 ErrorBoundary 和日志', '使用 Sentry', '使用 try/catch', '以上都是'],
        0,
      ],
      [
        'React Router 中如何实现路由切换重试性能监控？',
        ['记录重试次数和时间', '使用日志', '使用 Sentry', '以上都是'],
        0,
      ],
      [
        'React Router 中如何实现路由切换超时性能监控？',
        ['记录超时次数和时间', '使用日志', '使用 Sentry', '以上都是'],
        0,
      ],
      [
        'React Router 中如何实现路由切换取消性能监控？',
        ['记录取消次数和原因', '使用日志', '使用 Sentry', '以上都是'],
        0,
      ],
      [
        'React Router 中如何实现路由切换并发性能监控？',
        ['使用 React Profiler', '使用 Performance API', '使用 Chrome DevTools', '以上都是'],
        0,
      ],
      [
        'React Router 中如何实现路由切换中断性能监控？',
        ['记录中断次数和原因', '使用日志', '使用 Sentry', '以上都是'],
        0,
      ],
      [
        'React Router 中如何实现路由切换恢复性能监控？',
        ['记录恢复时间和效果', '使用日志', '使用 Sentry', '以上都是'],
        0,
      ],
      [
        'React Router 中如何实现路由切换缓存性能监控？',
        ['记录缓存命中率和大小', '使用 Performance API', '使用 Chrome DevTools', '以上都是'],
        0,
      ],
    ];
    const item = items[(i - 301) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第四部分：Redux 与状态管理 (401-500) ====================
  for (let i = 401; i <= 500; i++) {
    const q = { id: `react-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'Redux 的核心原则是？',
        [
          '单一数据源、State 只读、纯函数修改',
          '多数据源、直接修改、异步修改',
          '双向绑定、响应式、观察者',
          '组件化、声明式、虚拟 DOM',
        ],
        0,
      ],
      [
        'Redux 中 Action 的作用是？',
        ['描述发生了什么的普通对象', '修改 State 的函数', '创建 Store 的函数', '监听变化的函数'],
        0,
      ],
      ['Redux 中 Action 必须包含哪个属性？', ['type', 'payload', 'meta', 'error'], 0],
      [
        'Redux 中 Reducer 的作用是？',
        [
          '接收旧 State 和 Action 返回新 State 的纯函数',
          '发起网络请求',
          '创建 Action',
          '订阅 Store',
        ],
        0,
      ],
      [
        'Redux 中 Store 的作用是？',
        [
          '保存 State、提供 getState/dispatch/subscribe 方法',
          '定义 Action 类型',
          '处理副作用',
          '渲染组件',
        ],
        0,
      ],
      [
        'Redux 中 createStore 的参数是？',
        [
          'reducer, preloadedState, enhancer',
          'action, state, reducer',
          'middleware, reducer, store',
          '以上都不对',
        ],
        0,
      ],
      [
        'Redux 中如何获取当前 State？',
        ['store.getState()', 'store.state', 'store.getState', 'store.get()'],
        0,
      ],
      [
        'Redux 中如何派发 Action？',
        [
          'store.dispatch(action)',
          'store.emit(action)',
          'store.send(action)',
          'store.push(action)',
        ],
        0,
      ],
      [
        'Redux 中如何监听 State 变化？',
        [
          'store.subscribe(listener)',
          'store.watch(listener)',
          'store.on(listener)',
          'store.listen(listener)',
        ],
        0,
      ],
      [
        'Redux 中 Reducer 为什么必须是纯函数？',
        ['保证状态可预测、可追溯、方便测试', '性能要求', '语法限制', '安全原因'],
        0,
      ],
      [
        'Redux 中 combineReducers 的作用是？',
        [
          '将多个 Reducer 合并为一个根 Reducer',
          '合并多个 Store',
          '合并多个 Action',
          '合并多个中间件',
        ],
        0,
      ],
      [
        'Redux 中 Middleware 的作用是？',
        ['在 dispatch 和 reducer 之间扩展功能', '创建 Store', '修改 State', '渲染组件'],
        0,
      ],
      [
        'Redux 中 applyMiddleware 的作用是？',
        ['应用中间件到 Store', '创建 Reducer', '创建 Action', '创建 Store'],
        0,
      ],
      [
        'Redux 中 redux-thunk 的作用是？',
        ['处理异步 Action', '记录日志', '持久化状态', '路由管理'],
        0,
      ],
      [
        'Redux 中 redux-saga 的作用是？',
        ['使用 Generator 管理复杂异步流', '处理简单异步', '记录日志', '持久化状态'],
        0,
      ],
      [
        'Redux 中 redux-observable 的作用是？',
        ['使用 RxJS 管理异步流', '处理简单异步', '记录日志', '持久化状态'],
        0,
      ],
      [
        'Redux Toolkit 的作用是？',
        ['简化 Redux 开发的官方工具集', '替代 Redux', 'UI 组件库', '路由管理'],
        0,
      ],
      [
        'Redux Toolkit 中 createSlice 的作用是？',
        ['自动生成 Action 和 Reducer', '创建 Store', '创建中间件', '创建选择器'],
        0,
      ],
      [
        'Redux Toolkit 中 configureStore 的作用是？',
        ['简化 Store 创建并自动集成中间件', '创建 Reducer', '创建 Action', '创建选择器'],
        0,
      ],
      [
        'Redux Toolkit 中 createAsyncThunk 的作用是？',
        ['处理异步逻辑并生成 Action', '创建同步 Action', '创建 Reducer', '创建选择器'],
        0,
      ],
      [
        'Redux Toolkit 中 createEntityAdapter 的作用是？',
        ['管理规范化数据集', '创建实体', '创建异步逻辑', '创建选择器'],
        0,
      ],
      [
        'Redux Toolkit 中 createSelector 的作用是？',
        ['创建记忆化选择器优化性能', '创建 Action', '创建 Reducer', '创建中间件'],
        0,
      ],
      [
        'Redux 中 Selector 的作用是？',
        ['从 Store 中提取特定数据', '选择 Action', '选择 Reducer', '选择中间件'],
        0,
      ],
      [
        'Redux 中记忆化 Selector 的好处是？',
        ['避免不必要的重新计算', '增加计算', '简化代码', '异步处理'],
        0,
      ],
      [
        'Redux 中如何组织代码结构？',
        ['按功能模块组织或按类型组织', '全部放在一个文件', '按字母排序', '随机组织'],
        0,
      ],
      [
        'Redux 中 Ducks 模式是？',
        ['将 Action 和 Reducer 放在同一个文件的模式', '鸭子类型', '设计模式', '架构模式'],
        0,
      ],
      [
        'Redux 中如何处理表单状态？',
        ['使用 Redux Form 或 React Hook Form', '直接存在 State', '使用 localStorage', '无法处理'],
        0,
      ],
      [
        'Redux 中如何实现撤销重做？',
        ['保存历史 State 数组或使用 redux-undo', '无法实现', '直接修改 State', '使用 Reducer'],
        0,
      ],
      [
        'Redux 中如何实现持久化？',
        ['使用 redux-persist 库', '直接保存文件', '使用 Cookie', '无法实现'],
        0,
      ],
      [
        'Redux 中如何测试 Reducer？',
        ['传入旧 State 和 Action 断言新 State', '测试 UI', '测试网络', '无法测试'],
        0,
      ],
      [
        'Redux 中如何测试 Action Creator？',
        ['调用并断言返回的 Action 对象', '测试 UI', '测试网络', '无法测试'],
        0,
      ],
      [
        'Redux 中如何测试异步 Action？',
        ['使用 mock 或 redux-mock-store', '直接测试', '测试 UI', '无法测试'],
        0,
      ],
      [
        'Redux 中如何测试 Selector？',
        ['传入 State 断言返回值', '测试 UI', '测试网络', '无法测试'],
        0,
      ],
      [
        'Redux 中如何测试 Middleware？',
        ['模拟 store 和 next 调用中间件', '测试 UI', '测试网络', '无法测试'],
        0,
      ],
      [
        'Redux 中如何处理错误？',
        ['在 Reducer 或 Middleware 中捕获并更新 State', '直接抛出', '忽略', '使用 try/catch'],
        0,
      ],
      [
        'Redux 中如何处理加载状态？',
        ['在 State 中添加 loading 字段', '使用 setTimeout', '使用 Promise', '无法处理'],
        0,
      ],
      [
        'Redux 中如何处理分页？',
        ['在 State 中保存分页信息和数据', '使用 API', '使用路由', '无法处理'],
        0,
      ],
      [
        'Redux 中如何处理缓存？',
        ['在 State 中缓存数据避免重复请求', '使用 localStorage', '使用 sessionStorage', '无法处理'],
        0,
      ],
      [
        'Redux 中如何实现乐观更新？',
        ['先更新 State 失败再回滚', '等待后端响应', '无法实现', '使用 Reducer'],
        0,
      ],
      [
        'Redux 中如何实现权限控制？',
        ['在 State 中保存权限信息并在组件中判断', '使用路由', '使用中间件', '无法实现'],
        0,
      ],
      [
        'Redux 中如何实现国际化？',
        ['在 State 中保存语言包和当前语言', '使用 JSON', '使用 Context', '无法实现'],
        0,
      ],
      [
        'Redux 中如何实现主题切换？',
        ['在 State 中保存主题配置', '使用 CSS 变量', '使用 Context', '无法实现'],
        0,
      ],
      [
        'Redux 中如何实现实时数据？',
        ['使用 WebSocket 更新 State', '使用轮询', '使用 SSE', '无法实现'],
        0,
      ],
      [
        'Redux 中如何实现定时器？',
        ['在 Middleware 或组件中管理', '使用 setTimeout', '使用 setInterval', '无法实现'],
        0,
      ],
      [
        'Redux 中如何实现文件上传？',
        ['在异步 Action 中处理并更新进度 State', '直接上传', '使用 FormData', '无法实现'],
        0,
      ],
      [
        'Redux 中如何实现数据加密？',
        ['在 Middleware 中加密解密', '使用 HTTPS', '使用 CryptoJS', '无法实现'],
        0,
      ],
      [
        'Redux 中如何实现数据序列化？',
        ['在 Middleware 中序列化反序列化', '使用 JSON', '使用 protobuf', '无法实现'],
        0,
      ],
      [
        'Redux 中如何实现数据验证？',
        ['在 Reducer 或 Middleware 中验证', '使用 PropTypes', '使用 TypeScript', '无法实现'],
        0,
      ],
      [
        'Redux 中如何实现数据格式化？',
        ['在 Selector 中格式化数据', '在 Reducer 中格式化', '在组件中格式化', '无法实现'],
        0,
      ],
      [
        'Redux 中如何实现数据脱敏？',
        ['在 Selector 中脱敏数据', '在 Reducer 中脱敏', '在组件中脱敏', '无法实现'],
        0,
      ],
      [
        'Redux 中如何实现数据聚合？',
        ['在 Selector 中聚合数据', '在 Reducer 中聚合', '在组件中聚合', '无法实现'],
        0,
      ],
      [
        'Redux 中如何实现数据分组？',
        ['在 Selector 中分组数据', '在 Reducer 中分组', '在组件中分组', '无法实现'],
        0,
      ],
      [
        'Redux 中如何实现数据统计？',
        ['在 Selector 中统计数据', '在 Reducer 中统计', '在组件中统计', '无法实现'],
        0,
      ],
      [
        'Redux 中如何实现数据对比？',
        ['在 Selector 中对比数据', '在 Reducer 中对比', '在组件中对比', '无法实现'],
        0,
      ],
      [
        'Redux 中如何实现数据同步？',
        ['在 Middleware 中同步数据', '在 Reducer 中同步', '在组件中同步', '无法实现'],
        0,
      ],
      [
        'Redux 中如何实现数据迁移？',
        ['在 Middleware 或初始化时迁移', '直接修改', '无法实现', '使用脚本'],
        0,
      ],
      ['Redux 中如何实现数据备份？', ['导出 State JSON', '复制对象', '使用数据库', '无法实现'], 0],
      ['Redux 中如何实现数据恢复？', ['导入 State JSON', '覆盖对象', '使用数据库', '无法实现'], 0],
      [
        'Redux 中如何实现数据清理？',
        ['在 Reducer 中重置 State', '删除变量', '刷新页面', '无法实现'],
        0,
      ],
      [
        'Redux 中如何实现数据压缩？',
        ['在 Middleware 中压缩解压', '使用 gzip', '使用算法', '无法实现'],
        0,
      ],
      [
        'Redux 中如何实现数据解压？',
        ['在 Middleware 中解压', '使用 gzip', '使用算法', '无法实现'],
        0,
      ],
      [
        'Redux 中如何实现数据校验？',
        ['在 Middleware 中校验哈希', '使用 MD5', '使用 SHA', '无法实现'],
        0,
      ],
      [
        'Redux 中如何实现数据合并？',
        ['在 Reducer 或 Selector 中合并', '使用 Object.assign', '使用扩展运算符', '无法实现'],
        0,
      ],
      [
        'Redux 中 useSelector 的作用是？',
        ['从 Redux Store 中提取数据', '派发 Action', '创建 Store', '创建 Reducer'],
        0,
      ],
      [
        'Redux 中 useDispatch 的作用是？',
        ['获取 dispatch 函数引用', '获取 State', '创建 Action', '创建 Reducer'],
        0,
      ],
      [
        'Redux 中 useSelector 的相等性检查作用是？',
        ['避免组件不必要的重新渲染', '比较 State', '比较 Action', '比较 Reducer'],
        0,
      ],
      [
        'Redux 中 useSelector 默认的相等性检查是？',
        ['引用相等 (===)', '浅比较', '深比较', 'JSON 比较'],
        0,
      ],
      [
        'Redux 中 useDispatch 返回的 dispatch 是否稳定？',
        ['是，组件生命周期内不变', '否，每次渲染都变', '取决于 State', '取决于 Action'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 处理异步？',
        ['useEffect 中 dispatch 异步 Action', 'useReducer', 'useState', 'useContext'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现乐观更新？',
        [
          '先 dispatch 同步 Action 失败再 dispatch 回滚',
          '无法实现',
          '使用 useSelector',
          '使用 useDispatch',
        ],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现撤销重做？',
        ['自定义 useUndoRedo Hook 管理历史栈', '无法实现', '使用 useSelector', '使用 useDispatch'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现持久化？',
        [
          '自定义 usePersist Hook 同步 State 和 Storage',
          '无法实现',
          '使用 useSelector',
          '使用 useDispatch',
        ],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现表单？',
        ['自定义 useForm Hook 结合 Redux', '无法实现', '使用 useSelector', '使用 useDispatch'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现缓存？',
        ['自定义 useCache Hook 结合 Redux', '无法实现', '使用 useSelector', '使用 useDispatch'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现分页？',
        [
          '自定义 usePagination Hook 结合 Redux',
          '无法实现',
          '使用 useSelector',
          '使用 useDispatch',
        ],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现搜索？',
        ['自定义 useSearch Hook 结合 Redux', '无法实现', '使用 useSelector', '使用 useDispatch'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现排序？',
        ['自定义 useSort Hook 结合 Redux', '无法实现', '使用 useSelector', '使用 useDispatch'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现过滤？',
        ['自定义 useFilter Hook 结合 Redux', '无法实现', '使用 useSelector', '使用 useDispatch'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现权限？',
        ['自定义 useAuth Hook 结合 Redux', '无法实现', '使用 useSelector', '使用 useDispatch'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现国际化？',
        ['自定义 useI18n Hook 结合 Redux', '无法实现', '使用 useSelector', '使用 useDispatch'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现主题？',
        ['自定义 useTheme Hook 结合 Redux', '无法实现', '使用 useSelector', '使用 useDispatch'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现实时数据？',
        [
          '自定义 useRealtime Hook 结合 WebSocket',
          '无法实现',
          '使用 useSelector',
          '使用 useDispatch',
        ],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现定时器？',
        ['自定义 useTimer Hook 结合 Redux', '无法实现', '使用 useSelector', '使用 useDispatch'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现文件上传？',
        ['自定义 useUpload Hook 结合 Redux', '无法实现', '使用 useSelector', '使用 useDispatch'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现数据加密？',
        ['自定义 useCrypto Hook 结合 Redux', '无法实现', '使用 useSelector', '使用 useDispatch'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现数据序列化？',
        [
          '自定义 useSerialization Hook 结合 Redux',
          '无法实现',
          '使用 useSelector',
          '使用 useDispatch',
        ],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现数据验证？',
        [
          '自定义 useValidation Hook 结合 Redux',
          '无法实现',
          '使用 useSelector',
          '使用 useDispatch',
        ],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现数据格式化？',
        ['自定义 useFormat Hook 结合 Redux', '无法实现', '使用 useSelector', '使用 useDispatch'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现数据脱敏？',
        ['自定义 useMask Hook 结合 Redux', '无法实现', '使用 useSelector', '使用 useDispatch'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现数据聚合？',
        ['自定义 useAggregate Hook 结合 Redux', '无法实现', '使用 useSelector', '使用 useDispatch'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现数据分组？',
        ['自定义 useGroupBy Hook 结合 Redux', '无法实现', '使用 useSelector', '使用 useDispatch'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现数据统计？',
        [
          '自定义 useStatistics Hook 结合 Redux',
          '无法实现',
          '使用 useSelector',
          '使用 useDispatch',
        ],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现数据对比？',
        ['自定义 useDiff Hook 结合 Redux', '无法实现', '使用 useSelector', '使用 useDispatch'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现数据同步？',
        ['自定义 useSync Hook 结合 Redux', '无法实现', '使用 useSelector', 'useDispatch'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现数据迁移？',
        ['自定义 useMigration Hook 结合 Redux', '无法实现', '使用 useSelector', '使用 useDispatch'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现数据备份？',
        ['自定义 useBackup Hook 结合 Redux', '无法实现', '使用 useSelector', '使用 useDispatch'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现数据恢复？',
        ['自定义 useRestore Hook 结合 Redux', '无法实现', '使用 useSelector', '使用 useDispatch'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现数据清理？',
        ['自定义 useCleanup Hook 结合 Redux', '无法实现', '使用 useSelector', '使用 useDispatch'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现数据压缩？',
        ['自定义 useCompress Hook 结合 Redux', '无法实现', '使用 useSelector', '使用 useDispatch'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现数据解压？',
        [
          '自定义 useDecompress Hook 结合 Redux',
          '无法实现',
          '使用 useSelector',
          '使用 useDispatch',
        ],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现数据校验？',
        ['自定义 useChecksum Hook 结合 Redux', '无法实现', '使用 useSelector', '使用 useDispatch'],
        0,
      ],
      [
        'Redux 中如何使用 Hooks 实现数据合并？',
        ['自定义 useMerge Hook 结合 Redux', '无法实现', '使用 useSelector', '使用 useDispatch'],
        0,
      ],
      [
        'MobX 的核心原则是？',
        [
          '响应式编程、可观察状态、自动追踪',
          '单向数据流、纯函数',
          '组件化、虚拟 DOM',
          '中间件、Action',
        ],
        0,
      ],
      [
        'MobX 中 observable 的作用是？',
        ['将状态变为可观察', '创建 Action', '创建计算值', '创建副作用'],
        0,
      ],
      ['MobX 中 action 的作用是？', ['修改状态并触发更新', '观察状态', '计算值', '副作用'], 0],
      ['MobX 中 computed 的作用是？', ['创建派生状态并缓存', '观察状态', '修改状态', '副作用'], 0],
      [
        'MobX 中 reaction 的作用是？',
        ['响应状态变化执行副作用', '创建状态', '修改状态', '计算值'],
        0,
      ],
      ['Zustand 的特点是？', ['极简、无模板代码、Hooks 友好', '功能丰富', '面向对象', '强类型'], 0],
      [
        'Recoil 的特点是？',
        ['原子化状态、并发模式支持', '单一数据源', '面向对象', '无模板代码'],
        0,
      ],
      [
        'Jotai 的特点是？',
        ['原子化、极简、TypeScript 友好', '功能丰富', '面向对象', '单一数据源'],
        0,
      ],
      ['Valtio 的特点是？', ['代理状态、可变风格、极简', '不可变', '单一数据源', '面向对象'], 0],
    ];
    const item = items[(i - 401) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第五部分：React 性能优化 (501-600) ====================
  for (let i = 501; i <= 600; i++) {
    const q = { id: `react-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'React 中性能优化的核心原则是？',
        ['减少不必要的渲染和计算', '增加渲染次数', '使用更多 State', '使用更多 Context'],
        0,
      ],
      [
        'React 中 shouldComponentUpdate 的作用是？',
        ['判断组件是否需要更新', '强制更新', '卸载组件', '挂载组件'],
        0,
      ],
      [
        'React 中 PureComponent 的作用是？',
        ['自动浅比较 Props 和 State 避免不必要更新', '深比较', '强制更新', '缓存组件'],
        0,
      ],
      [
        'React 中 React.memo 的作用是？',
        ['对函数组件进行浅比较优化', '深比较', '强制更新', '缓存计算结果'],
        0,
      ],
      [
        'React 中 useMemo 的作用是？',
        ['缓存计算结果避免重复计算', '缓存函数', '缓存组件', '缓存 DOM'],
        0,
      ],
      [
        'React 中 useCallback 的作用是？',
        ['缓存函数引用避免子组件不必要渲染', '缓存计算结果', '缓存组件', '缓存 DOM'],
        0,
      ],
      [
        'React 中虚拟化列表的作用是？',
        ['只渲染可见区域的项目减少 DOM 节点', '渲染全部项目', '增加 DOM 节点', '美化列表'],
        0,
      ],
      [
        'React 中常用的虚拟化列表库是？',
        ['react-window 和 react-virtualized', 'react-list', 'react-scroll', 'react-lazy'],
        0,
      ],
      [
        'React 中代码分割的作用是？',
        ['按需加载代码减少初始包体积', '合并代码', '压缩代码', '加密代码'],
        0,
      ],
      [
        'React 中 React.lazy 的作用是？',
        ['动态导入组件实现代码分割', '懒执行函数', '懒加载样式', '懒加载数据'],
        0,
      ],
      [
        'React 中 key 的性能作用是？',
        ['帮助 Diff 算法快速定位节点减少操作', '增加渲染', '美化代码', '无作用'],
        0,
      ],
      [
        'React 中 useEffect 的性能陷阱是？',
        ['依赖项不稳定导致无限循环或不必要执行', '执行太快', '不支持异步', '内存泄漏'],
        0,
      ],
      [
        'React 中如何避免 Context 导致的不必要渲染？',
        ['拆分 Context、使用 memo、传递稳定引用', '不使用 Context', '使用 Redux', '使用 useState'],
        0,
      ],
      [
        'React 中如何优化大表单性能？',
        ['拆分组件、受控非受控混合、懒验证', '全部受控', '全部非受控', '不优化'],
        0,
      ],
      [
        'React 中 Web Workers 的作用是？',
        ['将计算密集型任务移到后台线程避免阻塞 UI', '操作 DOM', '网络请求', '渲染组件'],
        0,
      ],
      [
        'React 中 debounce 和 throttle 的作用是？',
        ['限制高频事件处理函数的执行频率', '加速执行', '并发执行', '同步执行'],
        0,
      ],
      [
        'React 中如何优化图片加载？',
        ['懒加载、响应式图片、WebP 格式、占位符', '加载原图', '不使用图片', 'CSS 背景图'],
        0,
      ],
      [
        'React 中如何优化网络请求？',
        ['缓存、合并请求、预加载、GraphQL', '每次重新请求', '减少请求', '只使用 GET'],
        0,
      ],
      [
        'React 中 React.Profiler 的作用是？',
        ['测量组件渲染时间和频率识别性能瓶颈', '记录错误', '状态管理', '路由管理'],
        0,
      ],
      [
        'React 中 Chrome DevTools Performance 的作用是？',
        ['分析运行时性能和渲染帧率', '编辑代码', '网络请求', '查看 DOM'],
        0,
      ],
      [
        'React 中 Lighthouse 的作用是？',
        ['审计网页性能、可访问性、最佳实践', '单元测试', '集成测试', 'E2E 测试'],
        0,
      ],
      [
        'React 中如何优化 SSR 性能？',
        ['流式渲染、缓存、代码分割、预取', '不使用 SSR', '增加服务器', '减少组件'],
        0,
      ],
      [
        'React 中如何优化 SEO？',
        ['SSR/SSG、预渲染、Meta 标签、语义化 HTML', '增加关键词', '隐藏内容', '使用 iframe'],
        0,
      ],
      [
        'React 中如何优化首屏加载？',
        ['代码分割、预加载、SSR、骨架屏', '增加动画', '减少内容', '使用 CDN'],
        0,
      ],
      [
        'React 中如何优化交互响应？',
        ['使用并发特性、Web Worker、优化长任务', '增加 State', '使用 setTimeout', '减少事件'],
        0,
      ],
      [
        'React 中如何优化动画性能？',
        [
          '使用 transform 和 opacity、will-change、requestAnimationFrame',
          '使用 left/top',
          '使用 setInterval',
          '使用 CSS only',
        ],
        0,
      ],
      [
        'React 中如何优化长列表渲染？',
        ['虚拟化列表、分页、懒加载、无限滚动', '渲染全部', '使用 map', '使用 forEach'],
        0,
      ],
      [
        'React 中如何优化复杂计算？',
        ['useMemo、Web Worker、缓存、预计算', '每次重新计算', '使用 useState', '使用 useEffect'],
        0,
      ],
      [
        'React 中如何优化事件处理？',
        ['事件委托、防抖节流、passive 监听', '每次绑定新事件', '移除事件', '使用内联函数'],
        0,
      ],
      [
        'React 中如何优化样式计算？',
        [
          '减少复杂选择器、使用 CSS Modules、避免重排重绘',
          '使用内联样式',
          '使用重要选择器',
          '增加样式',
        ],
        0,
      ],
      [
        'React 中如何优化 DOM 操作？',
        ['批量更新、减少 DOM 节点、使用 Fragment', '直接操作 DOM', '频繁更新', '使用 jQuery'],
        0,
      ],
      [
        'React 中如何优化内存使用？',
        ['清理副作用、卸载无用组件、避免闭包陷阱', '增加变量', '使用全局变量', '不使用 State'],
        0,
      ],
      [
        'React 中如何优化打包体积？',
        ['Tree Shaking、代码分割、压缩、按需引入', '引入全部', '使用 CDN', '增加依赖'],
        0,
      ],
      [
        'React 中如何优化运行时性能？',
        ['减少渲染、使用并发特性、优化算法', '增加渲染', '使用同步代码', '增加 State'],
        0,
      ],
      [
        'React 中如何优化编译时性能？',
        ['使用 SWC、升级 Babel、缓存构建', '减少代码', '增加插件', '使用 Webpack'],
        0,
      ],
      [
        'React 中如何优化开发体验？',
        ['热更新、ESLint、TypeScript、调试工具', '减少插件', '不使用 Lint', '纯 JS 开发'],
        0,
      ],
      [
        'React 中如何优化测试性能？',
        ['并行测试、快照测试、Mock 依赖', '串行测试', '不写测试', '只写 E2E'],
        0,
      ],
      [
        'React 中如何优化部署性能？',
        ['CDN、缓存策略、预渲染、容器化', '单台服务器', '不缓存', '手动部署'],
        0,
      ],
      [
        'React 中如何优化监控性能？',
        ['性能指标上报、错误监控、用户行为追踪', '不监控', '只看日志', '手动检查'],
        0,
      ],
      [
        'React 中如何优化安全性能？',
        ['XSS 防护、CSRF 防护、CSP 策略、HTTPS', 'HTTP', '明文存储', '不验证'],
        0,
      ],
      [
        'React 中如何优化可访问性？',
        ['语义化 HTML、ARIA 属性、键盘导航', '只使用 div', '不使用 ARIA', '只支持鼠标'],
        0,
      ],
      [
        'React 中如何优化国际化？',
        ['按需加载语言包、缓存翻译、服务端翻译', '加载全部语言', '硬编码文本', '不翻译'],
        0,
      ],
      [
        'React 中如何优化主题切换？',
        ['CSS 变量、类名切换、动态加载样式', '内联样式', '重新加载页面', '不支持切换'],
        0,
      ],
      [
        'React 中如何优化权限控制？',
        ['路由守卫、指令式渲染、缓存权限', '前端硬编码', '不控制', '后端只验证'],
        0,
      ],
      [
        'React 中如何优化数据预取？',
        ['路由预取、悬停预取、空闲预取', '不预取', '点击时获取', '每次重新获取'],
        0,
      ],
      [
        'React 中如何优化数据缓存？',
        ['SWR 策略、本地存储、内存缓存', '不缓存', '只缓存 GET', '手动管理'],
        0,
      ],
      [
        'React 中如何优化错误恢复？',
        ['错误边界、重试机制、降级 UI', '直接崩溃', '刷新页面', '不处理'],
        0,
      ],
      [
        'React 中如何优化日志记录？',
        ['批量上报、异步记录、级别过滤', '同步记录', '不记录', '只打印控制台'],
        0,
      ],
      [
        'React 中如何优化埋点上报？',
        ['批量发送、空闲时发送、压缩数据', '实时发送', '不发送', '全量发送'],
        0,
      ],
      [
        'React 中如何优化组件库？',
        ['Tree Shaking、按需加载、文档生成', '全量引入', '手动导入', '不使用组件库'],
        0,
      ],
      [
        'React 中如何优化 SSR 流式渲染？',
        ['使用 renderToPipeableStream 分块发送', '等待全部渲染', '不使用 SSR', '客户端渲染'],
        0,
      ],
      [
        'React 中如何优化 SSG 增量更新？',
        ['ISR 增量静态再生、按需重新生成页面', '每次全量构建', '不使用 SSG', '纯动态渲染'],
        0,
      ],
      [
        'React 中如何优化 CSR 交互？',
        ['预加载 JS、骨架屏、并发特性', '白屏等待', '不优化', '减少交互'],
        0,
      ],
      [
        'React 中如何优化混合渲染？',
        ['根据页面特性选择 SSR/SSG/CSR', '全部 SSR', '全部 SSG', '全部 CSR'],
        0,
      ],
      [
        'React 中如何优化边缘渲染？',
        ['使用 Edge Runtime 减少延迟', '中心服务器', '客户端渲染', '不渲染'],
        0,
      ],
      [
        'React 中如何优化微前端性能？',
        ['共享依赖、预加载、沙箱优化', '独立加载', '不使用微前端', 'iframe 隔离'],
        0,
      ],
      [
        'React 中如何优化跨端性能？',
        ['React Native 新架构、渲染优化', '只使用 Web', '不优化', '原生开发'],
        0,
      ],
      [
        'React 中如何优化低端设备？',
        ['减少动画、降级功能、轻量组件', '不兼容', '强制高配', '不支持'],
        0,
      ],
      [
        'React 中如何优化高分辨率屏幕？',
        ['响应式图片、矢量图标、CSS 像素比', '使用低分辨率', '不处理', '放大图片'],
        0,
      ],
      [
        'React 中如何优化暗黑模式？',
        ['CSS 变量、prefers-color-scheme、过渡动画', '强制亮色', '不支持', '重新加载'],
        0,
      ],
      [
        'React 中如何优化打印样式？',
        ['使用 @media print、隐藏无关元素', '不优化', '截图打印', '导出 PDF'],
        0,
      ],
      [
        'React 中如何优化邮件渲染？',
        ['内联样式、表格布局、兼容性处理', '使用 CSS 文件', 'Flex 布局', '发送链接'],
        0,
      ],
      [
        'React 中如何优化 PDF 生成？',
        ['服务端生成、虚拟 DOM 渲染、分页处理', '前端截图', '不生成', '纯文本'],
        0,
      ],
      [
        'React 中如何优化图表渲染？',
        ['Canvas 渲染、数据抽样、懒加载', 'SVG 渲染全部数据', '不使用图表', '静态图片'],
        0,
      ],
      [
        'React 中如何优化视频播放？',
        ['自适应码率、懒加载、预加载', '最高码率', '自动播放', '不优化'],
        0,
      ],
      [
        'React 中如何优化音频播放？',
        ['预加载、缓存、Web Audio API', '每次请求', '不优化', '使用 HTML5 Audio'],
        0,
      ],
      [
        'React 中如何优化地图渲染？',
        ['聚合点、懒加载、离线缓存', '渲染全部标记', '静态图片', '不使用地图'],
        0,
      ],
      [
        'React 中如何优化 3D 渲染？',
        ['React Three Fiber、LOD、实例化', 'CPU 渲染', '不使用 3D', '低多边形'],
        0,
      ],
      [
        'React 中如何优化游戏渲染？',
        ['RequestAnimationFrame、Canvas、WebGL', 'DOM 渲染', '不优化', '降低帧率'],
        0,
      ],
      [
        'React 中如何优化实时协作？',
        ['CRDT 算法、WebSocket、冲突解决', 'HTTP 轮询', '不协作', '锁定编辑'],
        0,
      ],
      [
        'React 中如何优化离线体验？',
        ['Service Worker、本地存储、同步', '不支持离线', '提示无网络', '只读模式'],
        0,
      ],
      [
        'React 中如何优化 PWA？',
        ['Manifest、Service Worker、推送通知', '不使用 PWA', '只加缓存', '不安装'],
        0,
      ],
      [
        'React 中如何优化 Web Vitals？',
        ['优化 LCP/FID/CLS 指标', '不关注指标', '只优化加载', '只优化交互'],
        0,
      ],
      [
        'React 中 LCP 优化方式是？',
        ['预加载关键资源、SSR、优化图片', '延迟加载', '减少内容', '使用 CDN'],
        0,
      ],
      [
        'React 中 FID 优化方式是？',
        ['减少主线程阻塞、代码分割、Web Worker', '增加 JS', '同步执行', '减少交互'],
        0,
      ],
      [
        'React 中 CLS 优化方式是？',
        ['预留空间、避免动态插入、字体优化', '随意布局', '不使用图片', '固定宽度'],
        0,
      ],
      [
        'React 中 TTFB 优化方式是？',
        ['CDN、边缘计算、缓存、优化服务器', '增加服务器处理', '不优化', '减少请求'],
        0,
      ],
      [
        'React 中 FCP 优化方式是？',
        ['内联关键 CSS、预加载、SSR', '延迟渲染', '白屏', '减少 HTML'],
        0,
      ],
      [
        'React 中 TTI 优化方式是？',
        ['延迟非关键 JS、代码分割', '加载全部 JS', '同步执行', '减少功能'],
        0,
      ],
      [
        'React 中 TBT 优化方式是？',
        ['减少长任务、代码分割、Web Worker', '增加长任务', '不优化', '减少交互'],
        0,
      ],
      [
        'React 中 SI 优化方式是？',
        ['骨架屏、渐进式加载、SSR', '白屏等待', '不优化', '减少内容'],
        0,
      ],
      [
        'React 中如何优化 Core Web Vitals？',
        ['综合优化 LCP/FID/CLS', '只优化一项', '不关注', '随机优化'],
        0,
      ],
      [
        'React 中如何监控 Web Vitals？',
        ['web-vitals 库、Google Analytics', '不监控', '手动计时', '只看加载时间'],
        0,
      ],
      [
        'React 中如何报告 Web Vitals？',
        ['发送到分析服务、记录日志', '不报告', '只打印控制台', '存储在本地'],
        0,
      ],
      [
        'React 中如何优化长任务？',
        ['使用 Scheduler、时间切片、Web Worker', '同步执行', '不优化', '增加任务'],
        0,
      ],
      [
        'React 中时间切片的原理是？',
        ['将长任务拆分为小任务在空闲时执行', '一次性执行', '延迟执行', '并行执行'],
        0,
      ],
      [
        'React 中 Scheduler 的作用是？',
        ['调度任务优先级和执行时间', '创建任务', '取消任务', '记录任务'],
        0,
      ],
      [
        'React 中如何优化事件委托？',
        ['在最近父节点监听而非全局', '全局监听', '每个元素监听', '不使用委托'],
        0,
      ],
      [
        'React 中如何优化被动事件监听？',
        ['使用 passive: true 提升滚动性能', '不使用 passive', '阻止默认行为', '移除监听'],
        0,
      ],
      [
        'React 中如何优化重排重绘？',
        [
          '批量 DOM 修改、使用 transform、避免频繁读取布局',
          '频繁修改 DOM',
          '使用 left/top',
          '不优化',
        ],
        0,
      ],
      [
        'React 中如何优化合成层？',
        ['will-change、transform、opacity', '不使用合成层', '增加 CSS 属性', '使用 fixed'],
        0,
      ],
      [
        'React 中如何避免强制同步布局？',
        ['避免在修改 DOM 后立即读取布局属性', '先读后写', '不读取布局', '使用定时器'],
        0,
      ],
      [
        'React 中如何优化 CSS 选择器？',
        ['减少嵌套层级、使用类选择器', '使用标签选择器', '使用通配符', '使用 ID 选择器'],
        0,
      ],
      [
        'React 中如何优化字体加载？',
        ['font-display: swap、预加载、WOFF2', '不优化', '使用 TTF', '阻塞渲染'],
        0,
      ],
      [
        'React 中如何优化脚本加载？',
        ['async/defer、预加载、代码分割', '阻塞加载', '放在头部', '内联全部'],
        0,
      ],
      [
        'React 中如何优化样式加载？',
        ['提取关键 CSS、异步加载非关键 CSS', '全部内联', '阻塞加载', '不使用 CSS'],
        0,
      ],
      [
        'React 中如何优化图片加载？',
        ['懒加载、响应式、WebP、预加载', '加载原图', '不使用图片', 'CSS 背景'],
        0,
      ],
      [
        'React 中如何优化视频加载？',
        ['预加载元数据、懒加载、自适应码率', '自动播放', '加载最高清', '不使用视频'],
        0,
      ],
      [
        'React 中如何优化音频加载？',
        ['预加载、懒加载、压缩格式', '自动播放', '加载全部', '不使用音频'],
        0,
      ],
      [
        'React 中如何优化 SVG 渲染？',
        ['内联关键 SVG、懒加载、压缩', '全部内联', '使用 img 标签', '不使用 SVG'],
        0,
      ],
      [
        'React 中如何优化 Canvas 渲染？',
        ['离屏渲染、分层、requestAnimationFrame', 'CPU 渲染', '不使用 Canvas', 'SVG 替代'],
        0,
      ],
      [
        'React 中如何优化 WebGL 渲染？',
        ['实例化、纹理压缩、LOD', 'CPU 渲染', '不使用 WebGL', '2D 替代'],
        0,
      ],
      [
        'React 中如何优化 Service Worker？',
        ['预缓存、运行时缓存、更新策略', '不使用 SW', '只缓存 HTML', '每次网络请求'],
        0,
      ],
      [
        'React 中如何优化 Web Animations API？',
        ['复合动画、使用合成属性', '使用 JS 定时器', 'CSS 动画', '不使用动画'],
        0,
      ],
      [
        'React 中如何优化 Intersection Observer？',
        ['设置 rootMargin 提前加载、阈值优化', '监听所有元素', '使用 scroll 事件', '不使用 IO'],
        0,
      ],
      [
        'React 中如何优化 Resize Observer？',
        ['防抖回调、只观察必要元素', '监听所有元素', '使用 resize 事件', '不使用 RO'],
        0,
      ],
      [
        'React 中如何优化 Mutation Observer？',
        ['只观察必要变化、防抖回调', '监听所有变化', '使用定时器', '不使用 MO'],
        0,
      ],
    ];
    const item = items[(i - 501) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第六部分：React 测试 (601-700) ====================
  for (let i = 601; i <= 700; i++) {
    const q = { id: `react-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'React 中单元测试的作用是？',
        ['验证独立模块功能是否正确', '验证整体流程', '验证性能', '验证安全'],
        0,
      ],
      [
        'React 中集成测试的作用是？',
        ['验证模块间协作是否正确', '验证独立模块', '验证性能', '验证安全'],
        0,
      ],
      [
        'React 中 E2E 测试的作用是？',
        ['模拟用户真实操作验证整体流程', '验证独立模块', '验证模块协作', '验证性能'],
        0,
      ],
      ['React 中 Jest 的作用是？', ['JavaScript 测试框架', 'UI 组件库', '状态管理', '路由管理'], 0],
      [
        'React 中 React Testing Library 的作用是？',
        ['测试 React 组件的实用工具', '测试网络请求', '测试性能', '测试安全'],
        0,
      ],
      [
        'React 中 Enzyme 的作用是？',
        ['React 测试工具，侧重组件内部实现', '测试网络', '测试性能', '测试安全'],
        0,
      ],
      [
        'React Testing Library 和 Enzyme 的区别是？',
        [
          'RTL 侧重用户行为，Enzyme 侧重组件实现细节',
          '没有区别',
          'RTL 侧重实现，Enzyme 侧重行为',
          '两者功能相同',
        ],
        0,
      ],
      [
        'React 中 render 方法的测试作用是？',
        ['渲染组件到虚拟 DOM 进行测试', '渲染到真实 DOM', '渲染到字符串', '渲染到 Canvas'],
        0,
      ],
      [
        'React 中 fireEvent 的作用是？',
        ['模拟 DOM 事件触发', '创建事件', '监听事件', '销毁事件'],
        0,
      ],
      [
        'React 中 screen 的作用是？',
        ['查询虚拟 DOM 中的元素', '渲染组件', '触发事件', '创建组件'],
        0,
      ],
      [
        'React 中 getByText 的作用是？',
        ['通过文本内容查找元素', '通过 ID 查找', '通过类名查找', '通过属性查找'],
        0,
      ],
      [
        'React 中 queryByText 的作用是？',
        [
          '通过文本查找元素，找不到返回 null 而非报错',
          '通过文本查找，找不到报错',
          '通过 ID 查找',
          '通过类名查找',
        ],
        0,
      ],
      [
        'React 中 findByText 的作用是？',
        ['异步通过文本查找元素', '同步查找', '通过 ID 查找', '通过类名查找'],
        0,
      ],
      [
        'React 中 getByText 和 queryByText 的区别是？',
        [
          '找不到时 getBy 报错，query 返回 null',
          '没有区别',
          'getBy 返回 null，query 报错',
          '两者功能相同',
        ],
        0,
      ],
      [
        'React 中 findByText 和 getByText 的区别是？',
        [
          'findBy 是异步的，getBy 是同步的',
          '没有区别',
          'findBy 是同步的，getBy 是异步的',
          '两者功能相同',
        ],
        0,
      ],
      [
        'React 中 waitFor 的作用是？',
        ['等待异步操作完成再断言', '延迟执行', '定时执行', '同步等待'],
        0,
      ],
      [
        'React 中 act 的作用是？',
        ['确保状态更新和副作用在断言前执行', '触发渲染', '模拟事件', '创建组件'],
        0,
      ],
      [
        'React 中为什么需要 act？',
        ['React 更新是异步的，act 确保同步完成', '性能优化', '语法要求', '类型检查'],
        0,
      ],
      [
        'React 中如何测试 useState？',
        ['触发事件并断言 UI 变化', '直接读取 state', '使用 spy', '无法测试'],
        0,
      ],
      [
        'React 中如何测试 useEffect？',
        ['使用 act 渲染并等待副作用执行后断言', '直接断言', '使用 spy', '无法测试'],
        0,
      ],
      [
        'React 中如何测试 useContext？',
        ['使用 Wrapper 包裹 Provider 后渲染测试', '直接渲染', '模拟 Context', '无法测试'],
        0,
      ],
      [
        'React 中如何测试 useRef？',
        ['触发操作后断言 ref.current 绑定元素的属性', '直接断言', '使用 spy', '无法测试'],
        0,
      ],
      [
        'React 中如何测试 useCallback？',
        ['比较函数执行结果或子组件渲染次数', '直接比较引用', '使用 spy', '无法测试'],
        0,
      ],
      [
        'React 中如何测试 useMemo？',
        ['比较计算结果或渲染次数', '直接比较', '使用 spy', '无法测试'],
        0,
      ],
      [
        'React 中如何测试 useReducer？',
        ['触发 dispatch 并断言 UI 变化', '直接断言 state', '使用 spy', '无法测试'],
        0,
      ],
      [
        'React 中如何测试自定义 Hook？',
        ['使用 renderHook 工具或封装到测试组件', '直接调用', '使用 useEffect', '无法测试'],
        0,
      ],
      [
        'React 中 renderHook 的作用是？',
        ['在测试环境中渲染自定义 Hook', '渲染组件', '模拟 DOM', '模拟事件'],
        0,
      ],
      [
        'React 中如何测试异步组件？',
        ['使用 findBy、waitFor 和 act', '同步测试', '使用 setTimeout', '无法测试'],
        0,
      ],
      [
        'React 中如何测试 React.lazy？',
        ['使用 Suspense 包裹并等待加载完成', '直接渲染', '同步测试', '无法测试'],
        0,
      ],
      [
        'React 中如何测试 ErrorBoundary？',
        ['抛出错误并断言 fallback UI', '正常渲染', '使用 try/catch', '无法测试'],
        0,
      ],
      [
        'React 中如何测试 Portals？',
        ['断言 portal 目标容器中的内容', '忽略 portal', '测试源容器', '无法测试'],
        0,
      ],
      [
        'React 中如何测试路由？',
        ['使用 MemoryRouter 包裹并断言导航', '使用 BrowserRouter', '使用真实 URL', '无法测试'],
        0,
      ],
      [
        'React 中如何测试 Redux？',
        ['使用 Provider 包裹或 mock Store', '直接测试', '忽略 Redux', '无法测试'],
        0,
      ],
      [
        'React 中如何测试网络请求？',
        ['使用 MSW 拦截请求返回模拟数据', '真实请求', '不测试', '使用 axios mock'],
        0,
      ],
      [
        'React 中 MSW 的作用是？',
        ['拦截网络请求的 Mock 服务', 'UI 组件库', '状态管理', '路由管理'],
        0,
      ],
      [
        'React 中如何测试表单？',
        ['模拟输入和提交事件断言数据', '直接读取 state', '使用 spy', '无法测试'],
        0,
      ],
      [
        'React 中如何测试事件处理？',
        ['触发事件并断言行为', '直接调用函数', '使用 spy', '无法测试'],
        0,
      ],
      [
        'React 中如何测试条件渲染？',
        ['设置条件并断言元素存在或不存在', '只测试一种条件', '忽略条件', '无法测试'],
        0,
      ],
      [
        'React 中如何测试列表渲染？',
        ['断言列表项数量和内容', '只测试一项', '忽略列表', '无法测试'],
        0,
      ],
      ['React 中如何测试样式？', ['断言类名或计算样式', '肉眼检查', '不测试样式', '无法测试'], 0],
      [
        'React 中如何测试快照？',
        ['使用 toMatchSnapshot 保存和比较 UI 快照', '截图比较', '手动比较', '不测试'],
        0,
      ],
      [
        'React 中快照测试的缺点是？',
        ['容易产生无意义的更新', '性能差', '不支持 CSS', '不支持异步'],
        0,
      ],
      [
        'React 中如何测试可访问性？',
        ['使用 jest-axe 或 axe-core', '手动测试', '不测试', '无法测试'],
        0,
      ],
      [
        'React 中如何测试性能？',
        ['使用 React.Profiler 或 Performance API', '肉眼观察', '不测试', '无法测试'],
        0,
      ],
      ['React 中如何测试安全？', ['检查 XSS、CSRF 防护', '不测试', '手动测试', '无法测试'], 0],
      [
        'React 中如何测试国际化？',
        ['切换语言并断言文本', '只测试一种语言', '不测试', '无法测试'],
        0,
      ],
      ['React 中如何测试主题？', ['切换主题并断言样式', '只测试亮色', '不测试', '无法测试'], 0],
      [
        'React 中如何测试权限？',
        ['设置权限并断言元素可见性', '只测试有权限', '不测试', '无法测试'],
        0,
      ],
      [
        'React 中如何测试动画？',
        ['使用 jest.useFakeTimers 或 waitFor', '真实等待', '不测试', '无法测试'],
        0,
      ],
      [
        'React 中如何测试 WebSocket？',
        ['使用 mock-websocket 或 MSW', '真实连接', '不测试', '无法测试'],
        0,
      ],
      [
        'React 中如何测试定时器？',
        ['使用 jest.useFakeTimers 快进时间', '真实等待', '不测试', '无法测试'],
        0,
      ],
      [
        'React 中如何测试文件上传？',
        ['模拟文件选择和上传事件', '真实上传', '不测试', '无法测试'],
        0,
      ],
      ['React 中如何测试拖拽？', ['模拟拖拽事件序列', '真实拖拽', '不测试', '无法测试'], 0],
      [
        'React 中如何测试剪贴板？',
        ['模拟剪贴板事件或 mock API', '真实复制', '不测试', '无法测试'],
        0,
      ],
      ['React 中如何测试全屏？', ['mock Fullscreen API', '真实全屏', '不测试', '无法测试'], 0],
      ['React 中如何测试通知？', ['mock Notification API', '真实通知', '不测试', '无法测试'], 0],
      ['React 中如何测试地理位置？', ['mock Geolocation API', '真实定位', '不测试', '无法测试'], 0],
      [
        'React 中如何测试媒体查询？',
        ['使用 window.matchMedia mock', '改变窗口大小', '不测试', '无法测试'],
        0,
      ],
      [
        'React 中如何测试本地存储？',
        ['使用 jest.spyOn 或 mock localStorage', '真实存储', '不测试', '无法测试'],
        0,
      ],
      [
        'React 中如何测试会话存储？',
        ['使用 jest.spyOn 或 mock sessionStorage', '真实存储', '不测试', '无法测试'],
        0,
      ],
      [
        'React 中如何测试 Cookie？',
        ['使用 js-cookie mock 或 document.cookie', '真实 Cookie', '不测试', '无法测试'],
        0,
      ],
      [
        'React 中如何测试控制台输出？',
        ['使用 jest.spyOn(console, "log")', '忽略输出', '不测试', '无法测试'],
        0,
      ],
      [
        'React 中如何测试错误日志？',
        ['使用 jest.spyOn(console, "error")', '忽略错误', '不测试', '无法测试'],
        0,
      ],
      [
        'React 中如何测试警告日志？',
        ['使用 jest.spyOn(console, "warn")', '忽略警告', '不测试', '无法测试'],
        0,
      ],
      [
        'React 中如何测试网络离线？',
        ['模拟 navigator.onLine 或事件', '断开网络', '不测试', '无法测试'],
        0,
      ],
      [
        'React 中如何测试页面可见性？',
        ['模拟 document.visibilityState', '切换标签', '不测试', '无法测试'],
        0,
      ],
      [
        'React 中如何测试焦点管理？',
        ['断言 document.activeElement', '肉眼观察', '不测试', '无法测试'],
        0,
      ],
      ['React 中如何测试键盘导航？', ['模拟键盘事件', '真实按键', '不测试', '无法测试'], 0],
      ['React 中如何测试鼠标交互？', ['模拟鼠标事件', '真实点击', '不测试', '无法测试'], 0],
      ['React 中如何测试触摸手势？', ['模拟触摸事件', '真实触摸', '不测试', '无法测试'], 0],
      [
        'React 中如何测试滚动行为？',
        ['模拟滚动事件或 Intersection Observer', '真实滚动', '不测试', '无法测试'],
        0,
      ],
      ['React 中如何测试窗口大小？', ['模拟 resize 事件', '改变窗口大小', '不测试', '无法测试'], 0],
      ['React 中如何测试打印？', ['模拟 window.print', '真实打印', '不测试', '无法测试'], 0],
      ['React 中如何测试音频？', ['mock Audio 对象', '真实播放', '不测试', '无法测试'], 0],
      ['React 中如何测试视频？', ['mock Video 对象', '真实播放', '不测试', '无法测试'], 0],
      ['React 中如何测试 Canvas？', ['mock Canvas 上下文', '真实绘制', '不测试', '无法测试'], 0],
      ['React 中如何测试 SVG？', ['断言 SVG 元素属性', '肉眼观察', '不测试', '无法测试'], 0],
      ['React 中如何测试图表？', ['断言图表数据和配置', '肉眼观察', '不测试', '无法测试'], 0],
      ['React 中如何测试地图？', ['mock 地图 API', '真实加载', '不测试', '无法测试'], 0],
      ['React 中如何测试富文本？', ['模拟输入和断言输出', '真实输入', '不测试', '无法测试'], 0],
      ['React 中如何测试代码编辑器？', ['模拟输入和断言输出', '真实输入', '不测试', '无法测试'], 0],
      ['React 中如何测试 PDF 生成？', ['mock 生成函数或快照', '真实生成', '不测试', '无法测试'], 0],
      ['React 中如何测试邮件发送？', ['mock 发送函数', '真实发送', '不测试', '无法测试'], 0],
      ['React 中如何测试支付？', ['mock 支付 API', '真实支付', '不测试', '无法测试'], 0],
      ['React 中如何测试第三方 SDK？', ['mock SDK 方法', '真实调用', '不测试', '无法测试'], 0],
      [
        'React 中如何测试 Web Worker？',
        ['mock Worker 或使用 jest-worker', '真实线程', '不测试', '无法测试'],
        0,
      ],
      ['React 中如何测试 Service Worker？', ['mock SW API', '真实缓存', '不测试', '无法测试'], 0],
      [
        'React 中如何测试 WebRTC？',
        ['mock RTCPeerConnection', '真实连接', '不测试', '无法测试'],
        0,
      ],
      [
        'React 中如何测试 WebSocket？',
        ['mock WebSocket 对象', '真实连接', '不测试', '无法测试'],
        0,
      ],
      ['React 中如何测试 SSE？', ['mock EventSource', '真实连接', '不测试', '无法测试'], 0],
      ['React 中如何测试长连接？', ['模拟连接和断开事件', '真实连接', '不测试', '无法测试'], 0],
      ['React 中如何测试轮询？', ['使用 jest.useFakeTimers', '真实等待', '不测试', '无法测试'], 0],
      ['React 中如何测试并发？', ['使用 act 和 waitFor', '同步测试', '不测试', '无法测试'], 0],
      [
        'React 中如何测试 Suspense？',
        ['使用 act 和 waitFor 等待 resolve', '同步测试', '不测试', '无法测试'],
        0,
      ],
      [
        'React 中如何测试 Transition？',
        ['使用 React.startTransition 和 waitFor', '同步测试', '不测试', '无法测试'],
        0,
      ],
      [
        'React 中如何测试 DeferredValue？',
        ['断言延迟更新的值', '同步测试', '不测试', '无法测试'],
        0,
      ],
      ['React 中如何测试 useId？', ['断言生成的 ID 唯一性', '不测试', '无法测试', '忽略'], 0],
      [
        'React 中如何测试 useSyncExternalStore？',
        ['模拟外部 store 变化', '不测试', '无法测试', '忽略'],
        0,
      ],
      [
        'React 中如何测试 useInsertionEffect？',
        ['断言样式插入结果', '不测试', '无法测试', '忽略'],
        0,
      ],
      [
        'React 中如何测试并发渲染？',
        ['使用 Suspense 和 Transition', '同步测试', '不测试', '无法测试'],
        0,
      ],
    ];
    const item = items[(i - 601) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }
  // ==================== 第七部分：React SSR 与 SSG (701-800) ====================
  for (let i = 701; i <= 800; i++) {
    const q = { id: `react-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'React 中 SSR 的全称是？',
        [
          'Server-Side Rendering',
          'Static-Side Rendering',
          'Service-Side Rendering',
          'State-Side Rendering',
        ],
        0,
      ],
      [
        'React 中 SSG 的全称是？',
        [
          'Static Site Generation',
          'Server Site Generation',
          'Service Site Generation',
          'State Site Generation',
        ],
        0,
      ],
      [
        'React 中 CSR 的全称是？',
        [
          'Client-Side Rendering',
          'Cache-Side Rendering',
          'Component-Side Rendering',
          'Concurrent-Side Rendering',
        ],
        0,
      ],
      [
        'React 中 ISR 的全称是？',
        [
          'Incremental Static Regeneration',
          'Initial Static Regeneration',
          'Internal Static Regeneration',
          'Interactive Static Regeneration',
        ],
        0,
      ],
      ['React 中 SSR 的优势是？', ['首屏快、SEO 友好', '服务器压力小', '开发简单', '交互流畅'], 0],
      [
        'React 中 SSR 的缺点是？',
        ['服务器压力大、TTFB 长、开发复杂', '首屏慢', 'SEO 差', '交互卡顿'],
        0,
      ],
      [
        'React 中 CSR 的优势是？',
        ['交互流畅、服务器压力小、开发简单', '首屏快', 'SEO 友好', 'TTFB 短'],
        0,
      ],
      ['React 中 CSR 的缺点是？', ['首屏慢、SEO 差', '服务器压力大', '开发复杂', 'TTFB 长'], 0],
      [
        'React 中 SSG 的优势是？',
        ['性能极佳、CDN 友好、SEO 友好', '实时数据', '动态内容', '服务器渲染'],
        0,
      ],
      [
        'React 中 SSG 的缺点是？',
        ['构建时间长、不适合频繁更新内容', '性能差', 'SEO 差', '交互差'],
        0,
      ],
      ['React 中 ISR 的优势是？', ['增量更新无需全量构建', '实时渲染', '纯静态', '纯动态'], 0],
      [
        'React 中 Next.js 的作用是？',
        ['React 全栈框架，支持 SSR/SSG/ISR', '状态管理', 'UI 组件库', '测试框架'],
        0,
      ],
      ['React 中 Gatsby 的作用是？', ['静态站点生成器', '服务端框架', '状态管理', '测试框架'], 0],
      ['React 中 Remix 的作用是？', ['全栈 Web 框架', '静态生成器', 'UI 组件库', '测试框架'], 0],
      [
        'React 中 renderToString 的作用是？',
        ['将组件渲染为 HTML 字符串', '渲染到 DOM', '渲染到字符串流', '渲染到文件'],
        0,
      ],
      [
        'React 中 renderToNodeStream 的作用是？',
        ['将组件渲染为 HTML 字节流', '渲染为字符串', '渲染到 DOM', '渲染到文件'],
        0,
      ],
      [
        'React 中 hydrate 的作用是？',
        ['在服务端渲染的 HTML 上附加事件监听', '重新渲染', '销毁组件', '创建组件'],
        0,
      ],
      [
        'React 中 hydrate 和 render 的区别是？',
        ['hydrate 复用现有 DOM，render 重新创建', '没有区别', 'hydrate 更慢', 'render 复用 DOM'],
        0,
      ],
      [
        'React 中 hydrate 失败的原因是？',
        ['服务端和客户端渲染内容不一致', '服务器错误', '网络延迟', '浏览器兼容'],
        0,
      ],
      [
        'React 中 getServerSideProps 的作用是？',
        ['Next.js 中在每次请求时获取数据', '构建时获取数据', '客户端获取数据', '静态数据'],
        0,
      ],
      [
        'React 中 getStaticProps 的作用是？',
        ['Next.js 中在构建时获取数据', '请求时获取数据', '客户端获取数据', '动态数据'],
        0,
      ],
      [
        'React 中 getStaticPaths 的作用是？',
        ['Next.js 中定义动态路由的预渲染路径', '获取静态资源', '获取服务器数据', '获取客户端数据'],
        0,
      ],
      [
        'React 中 Next.js 的 API Routes 作用是？',
        ['创建后端 API 接口', '前端路由', '静态生成', '数据获取'],
        0,
      ],
      [
        'React 中 Next.js 的 Image 组件作用是？',
        ['优化图片加载和性能', '显示图片', '编辑图片', '上传图片'],
        0,
      ],
      [
        'React 中 Next.js 的 Link 组件作用是？',
        ['客户端路由导航', '服务端跳转', '静态链接', '外部链接'],
        0,
      ],
      [
        'React 中 Next.js 的 Script 组件作用是？',
        ['优化脚本加载策略', '执行脚本', '编译脚本', '压缩脚本'],
        0,
      ],
      [
        'React 中 Next.js 的 Head 组件作用是？',
        ['管理文档 head 标签', '页面头部', '路由管理', '状态管理'],
        0,
      ],
      [
        'React 中 Next.js 的 Middleware 作用是？',
        ['在请求完成前运行代码进行拦截', '中间件渲染', '静态生成', '数据获取'],
        0,
      ],
      [
        'React 中 Next.js 的 Edge Runtime 作用是？',
        ['在边缘节点运行代码减少延迟', '浏览器运行', '服务器运行', '本地运行'],
        0,
      ],
      [
        'React 中 Next.js 的 App Router 作用是？',
        ['基于 React Server Components 的新路由系统', '旧路由系统', 'API 路由', '静态路由'],
        0,
      ],
      [
        'React 中 React Server Components 的作用是？',
        ['在服务端渲染组件减少客户端 JS 体积', '客户端渲染', '静态渲染', '混合渲染'],
        0,
      ],
      [
        'React 中 Server Components 的优势是？',
        ['零客户端 JS、直接访问后端、自动代码分割', '交互流畅', '开发简单', '兼容性好'],
        0,
      ],
      [
        'React 中 Server Components 的限制是？',
        [
          '不能使用 useState/useEffect 等客户端 API',
          '不能渲染 HTML',
          '不能访问数据库',
          '不能使用 Props',
        ],
        0,
      ],
      [
        'React 中 Client Components 如何声明？',
        ['使用 "use client" 指令', '"use server"', '"use strict"', '"use rsc"'],
        0,
      ],
      [
        'Next.js 中 Server Actions 的作用是？',
        ['在服务端执行函数而无需手写 API', '客户端操作', '数据库连接', '状态管理'],
        0,
      ],
      [
        'Next.js 中如何声明 Server Actions？',
        ['在函数顶部使用 "use server" 指令', '"use client"', '"use api"', '"use backend"'],
        0,
      ],
      [
        'Remix 中 Loader 的作用是？',
        ['在服务端提供数据给路由组件', '加载静态资源', '客户端数据获取', '懒加载'],
        0,
      ],
      [
        'Remix 中 Action 的作用是？',
        ['处理表单提交和数据变更', '状态管理', '路由跳转', '组件渲染'],
        0,
      ],
      [
        'Next.js 中 getInitialProps 的特点？',
        [
          '兼容旧版 SSR，在服务端和客户端都会执行',
          '只在服务端执行',
          '只在客户端执行',
          '已废弃不可用',
        ],
        0,
      ],
      [
        'SSR 中如何处理样式注入？',
        ['收集服务端 CSS 并注入到 HTML 字符串', '忽略样式', '客户端加载', '内联所有样式'],
        0,
      ],
      [
        'Next.js 中 _app.js 的作用是？',
        ['全局布局和状态管理', '页面路由', 'API 接口', '静态生成'],
        0,
      ],
      [
        'Next.js 中 _document.js 的作用是？',
        ['自定义 HTML 和 Body 标签', '页面布局', '数据获取', '路由管理'],
        0,
      ],
      [
        'Gatsby 中 GraphQL 的作用是？',
        ['在构建时查询和组合数据', '服务端 API', '客户端状态', '路由管理'],
        0,
      ],
      [
        'Next.js 中预渲染的两种形式是？',
        [
          '静态生成和服务端渲染',
          '客户端渲染和静态生成',
          '服务端渲染和客户端渲染',
          '增量渲染和静态渲染',
        ],
        0,
      ],
      [
        'Next.js 中动态导入的作用是？',
        ['将组件按需加载减少初始包体积', '服务端渲染', '静态生成', '数据获取'],
        0,
      ],
      [
        'SSR 中如何处理认证？',
        ['通过 Cookie 或 Token 在服务端验证', '客户端验证', '忽略认证', '使用 localStorage'],
        0,
      ],
      [
        'Next.js 中 revalidate 的作用是？',
        ['设置 ISR 重新验证的时间间隔', '验证表单', '路由守卫', '缓存过期'],
        0,
      ],
      [
        'RSC 中如何实现数据获取？',
        ['直接在组件中使用 async/await', '使用 useEffect', '使用 axios', '使用事件监听'],
        0,
      ],
      [
        'Next.js 13 中 Layout 的作用是？',
        ['在路由间共享 UI 和状态', '数据获取', 'API 路由', '静态生成'],
        0,
      ],
      [
        'Next.js 13 中 Template 的作用是？',
        ['类似 Layout 但在导航时重新创建实例', '共享 UI', '静态布局', '数据模板'],
        0,
      ],
      [
        'Next.js 中 Error 的作用是？',
        ['捕获路由段的错误显示备用 UI', '日志记录', '路由跳转', '数据获取'],
        0,
      ],
      [
        'Next.js 中 Loading 的作用是？',
        ['显示路由段的即时加载状态', '数据预取', '错误处理', '布局管理'],
        0,
      ],
      [
        'RSC 中客户端和服务端组件如何组合？',
        ['服务端组件可以导入客户端组件，反之不行', '互相导入', '不能组合', '只能通过 props 传递'],
        0,
      ],
      [
        'RSC 中如何将服务端数据传递给客户端组件？',
        ['通过 Props 序列化传递', '全局变量', 'Context', 'localStorage'],
        0,
      ],
      [
        'Next.js 中 fetch 扩展的 cache 选项？',
        ['no-store, force-cache 等', 'only-if-cached', 'no-cache', 'reload'],
        0,
      ],
      [
        'SSR 中内存泄漏的常见原因？',
        ['全局变量未清理、定时器未清除', '渲染过快', '数据过大', '请求过少'],
        0,
      ],
      [
        'Next.js 中如何实现重定向？',
        [
          'redirect 函数或 NextResponse.redirect',
          'window.location',
          'router.push',
          'history.pushState',
        ],
        0,
      ],
      [
        'Next.js 中 generateMetadata 的作用是？',
        ['动态生成页面的 meta 标签信息', '生成静态页面', '数据查询', '路由配置'],
        0,
      ],
      [
        'RSC 为什么不能使用 useState？',
        ['服务端无交互，状态属于客户端', '性能问题', '语法限制', '安全原因'],
        0,
      ],
      [
        'Next.js 中并行路由的作用是？',
        ['同时渲染多个页面到同一布局', '并发请求', '路由缓存', '路由守卫'],
        0,
      ],
      [
        'Next.js 中拦截路由的作用是？',
        ['在当前布局内加载其他路由的模态框', '阻止导航', '权限验证', '数据拦截'],
        0,
      ],
      [
        'SSR 中如何优化 TTFB？',
        ['缓存页面、流式渲染、边缘计算', '增加服务器', '减少 HTML', '客户端渲染'],
        0,
      ],
      [
        'Next.js 中路由组的作用是？',
        ['组织路由而不影响 URL 路径', '分组 API', '权限控制', '数据分组'],
        0,
      ],
      [
        'Remix 中嵌套路由的数据获取方式？',
        ['并行加载嵌套路由的 loader', '串行加载', '只加载父路由', '只加载子路由'],
        0,
      ],
      [
        'Gatsby 中插件的作用是？',
        ['扩展功能如数据源、SEO、图片优化', '路由管理', '状态管理', 'UI 组件'],
        0,
      ],
      [
        'RSC 中 ref 的限制是？',
        ['服务端组件不能传递 ref 给客户端组件', '无限制', '只能传递字符串 ref', '只能传递回调 ref'],
        0,
      ],
      [
        'Next.js 中 notFound 函数的作用是？',
        ['触发 404 页面渲染', '删除路由', '重定向', '错误处理'],
        0,
      ],
      [
        'SSR 中样式闪烁问题的原因？',
        ['CSS 未及时加载导致无样式内容闪烁', 'JS 阻塞', '图片加载慢', '字体问题'],
        0,
      ],
      [
        'Next.js 中 Image 组件的 placeholder 属性？',
        ['blur 或 empty 提供图片加载占位', '颜色占位', '文字占位', '透明占位'],
        0,
      ],
      [
        'Next.js 中 Font 优化模块的作用？',
        ['自动优化字体并消除布局偏移', '字体下载', '字体设计', '字体压缩'],
        0,
      ],
      [
        'RSC 中序列化数据的限制？',
        ['不能传递函数、类等不可序列化数据', '无限制', '只能传字符串', '只能传 JSON'],
        0,
      ],
      [
        'Next.js 中 Route Handlers 的作用是？',
        ['替代 API Routes 处理 Web 请求和响应', '路由守卫', '页面渲染', '数据获取'],
        0,
      ],
      [
        'Next.js 中动态路由段如何定义？',
        ['使用 [folderName] 语法', '{folderName}', ':folderName', '*folderName'],
        0,
      ],
      [
        'Next.js 中捕获所有路由段如何定义？',
        ['使用 [...folderName] 语法', '**folderName', '[...folderName]', '*folderName'],
        0,
      ],
      [
        'Next.js 中可选捕获所有路由段如何定义？',
        ['使用 [[...folderName]] 语法', '[...folderName]', '[[folderName]]', '(folderName)'],
        0,
      ],
      [
        'SSR 中如何处理第三方脚本？',
        ['使用 Script 组件的 strategy 属性控制加载', '直接插入 body', '不加载', '内联脚本'],
        0,
      ],
      [
        'Next.js 中 React Cache 的作用是？',
        ['缓存数据获取函数的结果', '缓存组件', '缓存路由', '缓存 DOM'],
        0,
      ],
      [
        'Next.js 中 unstable_cache 的作用是？',
        ['在 Next.js 缓存层缓存数据', '浏览器缓存', '内存缓存', 'CDN 缓存'],
        0,
      ],
      [
        'Remix 中 Form 组件的作用是？',
        ['拦截表单提交并调用 Action', '美化表单', '验证表单', '重置表单'],
        0,
      ],
      [
        'SSR 中如何实现代码分割？',
        ['使用动态导入和 Suspense', '手动分割', '不支持分割', '全量加载'],
        0,
      ],
      [
        'Next.js 中如何处理环境变量？',
        ['使用 .env 文件和 NEXT_PUBLIC_ 前缀', '直接硬编码', '全局变量', '配置文件'],
        0,
      ],
      [
        'Next.js 中自定义服务器的作用？',
        ['使用自定义 Node.js 服务器处理请求', '优化性能', '静态生成', '路由管理'],
        0,
      ],
      [
        'RSC 与传统 SSR 的区别？',
        ['RSC 组件不会发送 JS 到客户端，SSR 会', '没有区别', 'RSC 不支持 SEO', 'SSR 更快'],
        0,
      ],
      [
        'Next.js 中如何实现国际化路由？',
        ['使用 i18n 配置或 Middleware', '路由守卫', '动态路由', '正则匹配'],
        0,
      ],
      [
        'Next.js 中 Link 的 prefetch 属性作用？',
        ['控制是否在视口内预取页面数据', '预加载图片', '预执行脚本', '预渲染页面'],
        0,
      ],
      [
        'SSR 中流式渲染的优势？',
        ['分块传输 HTML 减少首字节时间', '减少代码量', '简化逻辑', '提高安全性'],
        0,
      ],
      [
        'Next.js 中如何实现灰度发布？',
        ['使用 Middleware 判断用户分组', '部署多版本', 'DNS 切换', '负载均衡'],
        0,
      ],
      [
        'Next.js 中 generateStaticParams 的作用是？',
        ['为动态路由生成静态参数', '获取数据', '路由守卫', '重定向'],
        0,
      ],
      [
        'RSC 中边界是什么？',
        ['服务端组件导入客户端组件的位置', '路由边界', '数据边界', '错误边界'],
        0,
      ],
      [
        'Next.js 中视图过渡 API 的支持？',
        ['使用 experimental.viewTransition 实现路由动画', '不支持', '内置支持', '需第三方库'],
        0,
      ],
      [
        'Gatsby 中 Shadowing 的作用是？',
        ['覆盖主题中的组件实现定制', '隐藏组件', '样式隔离', '状态覆盖'],
        0,
      ],
      [
        'Next.js 中如何处理静态资源？',
        ['放在 public 目录直接引用', '必须上传 CDN', '打包到 JS', '转 Base64'],
        0,
      ],
      [
        'Next.js 中如何实现 A/B 测试？',
        ['使用 Middleware 或 Edge Config 分流', '前端随机', '后端重定向', 'URL 参数'],
        0,
      ],
      [
        'SSR 中如何避免 X-Frame-Options 问题？',
        ['设置响应头允许或拒绝 iframe 嵌入', '前端判断', '忽略', '使用 HTTPS'],
        0,
      ],
      [
        'Next.js 中路由处理程序的缓存控制？',
        ['使用 Cache-Control 响应头', '自动缓存', '不缓存', '配置文件'],
        0,
      ],
      [
        'Next.js 中 revalidatePath 的作用是？',
        ['按路径重新验证缓存数据', '路由守卫', '重定向', '页面刷新'],
        0,
      ],
      [
        'Next.js 中 revalidateTag 的作用是？',
        ['按标签重新验证缓存数据', 'HTML 标签', '组件标签', '路由标签'],
        0,
      ],
      [
        'Next.js 中 cookies 函数的作用是？',
        ['在服务端组件或 Route Handler 中读取 Cookie', '设置 Cookie', '删除 Cookie', '加密 Cookie'],
        0,
      ],
      [
        'Next.js 中 headers 函数的作用是？',
        ['在服务端组件读取请求头', '设置请求头', '删除请求头', '修改请求头'],
        0,
      ],
    ];
    const item = items[(i - 701) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }
  // ==================== 第八部分：React 生态与工程化 (801-900) ====================
  for (let i = 801; i <= 900; i++) {
    const q = { id: `react-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'React 中 TypeScript 的作用是？',
        ['提供静态类型检查提高代码健壮性', '运行更快', '代码压缩', '样式管理'],
        0,
      ],
      [
        'React 中 FC 类型的全称是？',
        ['FunctionComponent', 'FuncComp', 'FunctionClass', 'FirstComponent'],
        0,
      ],
      [
        'React 中 React.FC 的缺点是？',
        ['默认包含 children 类型且泛型支持不佳', '没有缺点', '不支持 Hooks', '不能传 Props'],
        0,
      ],
      [
        'React 中如何定义组件 Props 类型？',
        ['使用 interface 或 type 定义', '使用 PropTypes', '使用 defaultProps', '使用注释'],
        0,
      ],
      [
        'React 中 ReactNode 类型包括？',
        [
          'ReactElement, string, number, null, undefined 等',
          '只有 Element',
          '只有 string',
          '只有 number',
        ],
        0,
      ],
      [
        'React 中 ReactElement 和 ReactNode 的区别？',
        [
          'ReactElement 是对象，ReactNode 包括所有可渲染内容',
          '没有区别',
          'ReactNode 是对象',
          'ReactElement 更大',
        ],
        0,
      ],
      [
        'React 中如何类型化 useRef？',
        [
          'useRef<HTMLInputElement>(null)',
          'useRef<HTMLInputElement>',
          'useRef(null)',
          'useRef(HTMLInputElement)',
        ],
        0,
      ],
      [
        'React 中如何类型化 useState？',
        ['useState<string>()', 'useState(string)', 'useState:<string>', 'useState->string'],
        0,
      ],
      [
        'React 中如何类型化 useReducer？',
        ['定义 Action 联合类型和 State 接口', '不需要类型', '使用 any', '使用 PropTypes'],
        0,
      ],
      [
        'React 中如何类型化 forwardRef？',
        [
          'React.forwardRef<RefType, PropsType>',
          'React.forwardRef<PropsType>',
          'forwardRef<RefType>',
          'forwardRef(PropsType)',
        ],
        0,
      ],
      [
        'React 中如何类型化 useContext？',
        [
          '创建 Context 时指定类型 React.createContext<Type>',
          '使用时指定',
          '不需要类型',
          '使用泛型函数',
        ],
        0,
      ],
      [
        'React 中事件处理函数的类型？',
        ['React.MouseEvent, React.ChangeEvent 等', 'Event', 'MouseEvent', 'Object'],
        0,
      ],
      [
        'React 中如何类型化 CSS 属性？',
        ['React.CSSProperties', 'CSSProperties', 'StyleObject', 'CSSStyle'],
        0,
      ],
      ['React 中 Webpack 的作用是？', ['模块打包工具', '状态管理', '路由管理', 'UI 组件库'], 0],
      [
        'React 中 Vite 的作用是？',
        ['下一代前端构建工具，开发启动快', '代码格式化', '类型检查', '单元测试'],
        0,
      ],
      [
        'React 中 Babel 的作用是？',
        ['将 ES6+ 和 JSX 转换为兼容的 JS', '代码压缩', '类型检查', '模块打包'],
        0,
      ],
      ['React 中 ESLint 的作用是？', ['检查代码质量和风格', '编译代码', '打包代码', '优化性能'], 0],
      [
        'React 中 Prettier 的作用是？',
        ['统一代码格式风格', '检查逻辑错误', '编译代码', '类型检查'],
        0,
      ],
      [
        'React 中 Husky 的作用是？',
        ['管理 Git Hooks 执行脚本', '代码格式化', '类型检查', '模块打包'],
        0,
      ],
      [
        'React 中 lint-staged 的作用是？',
        ['只对暂存区文件执行 lint 提高速度', '全量检查', '代码压缩', '类型检查'],
        0,
      ],
      [
        'React 中 Commitlint 的作用是？',
        ['规范 Git 提交信息格式', '代码检查', '版本管理', '分支管理'],
        0,
      ],
      [
        'React 中 Storybook 的作用是？',
        ['隔离开发和测试 UI 组件', '状态管理', '路由管理', '数据 Mock'],
        0,
      ],
      ['React 中 Cypress 的作用是？', ['端到端测试框架', '单元测试', '类型检查', '代码压缩'], 0],
      [
        'React 中 Playwright 的作用是？',
        ['跨浏览器端到端测试', '组件测试', '性能测试', '安全测试'],
        0,
      ],
      [
        'React 中 Jest 的快照测试原理？',
        ['比较组件渲染输出的序列化文本', '截图比较', 'DOM 比较', '视频录制'],
        0,
      ],
      [
        'React 中 Webpack 的 HMR 原理？',
        ['替换模块而不刷新页面保持状态', '刷新页面', '重启服务', '重新编译'],
        0,
      ],
      [
        'React 中 Vite 为什么比 Webpack 快？',
        ['利用浏览器原生 ESM 无需打包开发时', '使用多线程', '代码更少', '缓存更好'],
        0,
      ],
      [
        'React 中微前端的作用是？',
        ['将巨石应用拆分为独立子应用', '状态管理', 'UI 组件化', '路由管理'],
        0,
      ],
      [
        'React 中 qiankun 的作用是？',
        ['基于 single-spa 的微前端框架', '状态管理', 'UI 组件库', '构建工具'],
        0,
      ],
      [
        'React 中 Module Federation 的作用是？',
        ['Webpack 5 的模块联邦实现应用间共享代码', '代码分割', '代码压缩', '代码检查'],
        0,
      ],
      [
        'React 中 Monorepo 的作用是？',
        ['在一个仓库管理多个相关包', '代码分割', '模块联邦', '微前端'],
        0,
      ],
      [
        'React 中 Turborepo 的作用是？',
        ['高性能的 Monorepo 构建系统', '状态管理', 'UI 组件库', '路由管理'],
        0,
      ],
      [
        'React 中 Lerna 的作用是？',
        ['管理 Monorepo 中的包发布和依赖', '代码格式化', '类型检查', '单元测试'],
        0,
      ],
      [
        'React 中 pnpm 的作用是？',
        ['高效的包管理器使用硬链接节省空间', '代码格式化', '模块打包', '类型检查'],
        0,
      ],
      [
        'React 中 Docker 的作用是？',
        ['容器化部署保证环境一致性', '代码压缩', '状态管理', '路由管理'],
        0,
      ],
      [
        'React 中 CI/CD 的作用是？',
        ['持续集成和持续交付自动化流程', '代码检查', '类型检查', '性能监控'],
        0,
      ],
      [
        'React 中 GitHub Actions 的作用是？',
        ['自动化工作流如测试和部署', '代码托管', '包管理', 'UI 组件'],
        0,
      ],
      [
        'React 中 Nginx 的作用是？',
        ['反向代理、负载均衡、静态资源服务', '代码压缩', '模块打包', '类型检查'],
        0,
      ],
      [
        'React 中 CDN 的作用是？',
        ['加速静态资源访问减轻服务器压力', '代码检查', '状态管理', '路由管理'],
        0,
      ],
      [
        'React 中 XSS 攻击的防御方式？',
        ['转义输出、CSP 策略、HttpOnly Cookie', '使用 HTTPS', '使用 VPN', '关闭端口'],
        0,
      ],
      [
        'React 中 CSRF 攻击的防御方式？',
        ['Token 验证、SameSite Cookie', 'XSS 防护', 'SQL 注入', '密码加密'],
        0,
      ],
      [
        'React 中点击劫持的防御方式？',
        ['设置 X-Frame-Options 响应头', 'HTTPS', 'CSP', '验证码'],
        0,
      ],
      [
        'React 中中间人攻击的防御方式？',
        ['使用 HTTPS 和证书校验', 'XSS 防护', 'CSRF Token', '密码复杂度'],
        0,
      ],
      [
        'React 中如何实现代码规范自动化？',
        ['Husky + lint-staged + ESLint + Prettier', '手动检查', 'Code Review', '测试覆盖'],
        0,
      ],
      [
        'React 中 Babel 预设的作用是？',
        ['集成一组常用插件简化配置', '单个插件', '语法检查', '代码压缩'],
        0,
      ],
      [
        'React 中 @babel/preset-env 的作用是？',
        ['根据目标环境自动确定 Babel 插件', '支持 JSX', '支持 TypeScript', '代码压缩'],
        0,
      ],
      [
        'React 中 @babel/preset-react 的作用是？',
        ['支持 JSX 和 React 语法转换', '支持 ES6', '支持 TypeScript', '代码压缩'],
        0,
      ],
      [
        'React 中 @babel/preset-typescript 的作用是？',
        ['支持 TypeScript 语法转换', '支持 JSX', '支持 ES6', '代码压缩'],
        0,
      ],
      [
        'React 中 Webpack Loader 的作用是？',
        ['处理非 JS 文件转换为 JS 模块', '打包代码', '压缩代码', '优化代码'],
        0,
      ],
      [
        'React 中 Webpack Plugin 的作用是？',
        ['扩展 Webpack 功能如打包优化和资源管理', '转换文件', '解析模块', '开发服务器'],
        0,
      ],
      [
        'React 中 babel-loader 的作用是？',
        ['使用 Babel 转换 JS 文件', '加载 CSS', '加载图片', '加载字体'],
        0,
      ],
      [
        'React 中 css-loader 的作用是？',
        ['解析 CSS 中的 import 和 url', '插入样式到 DOM', '压缩 CSS', '提取 CSS'],
        0,
      ],
      [
        'React 中 style-loader 的作用是？',
        ['将 CSS 插入到 DOM 的 style 标签', '解析 import', '压缩 CSS', '提取 CSS'],
        0,
      ],
      [
        'React 中 MiniCssExtractPlugin 的作用是？',
        ['将 CSS 提取为独立文件', '插入样式', '解析 import', '压缩 CSS'],
        0,
      ],
      [
        'React 中 HtmlWebpackPlugin 的作用是？',
        ['自动生成 HTML 文件并引入打包资源', '压缩 HTML', '解析 HTML', '提取 HTML'],
        0,
      ],
      [
        'React 中 Vite 插件的作用是？',
        ['扩展 Vite 功能遵循 Rollup 插件接口', '转换文件', '打包代码', '压缩代码'],
        0,
      ],
      [
        'React 中 SWC 的作用是？',
        ['基于 Rust 的高性能编译器替代 Babel', '状态管理', '路由管理', 'UI 组件库'],
        0,
      ],
      [
        'React 中 esbuild 的作用是？',
        ['极快的 JS 打包器和压缩器', '代码检查', '类型检查', '单元测试'],
        0,
      ],
      [
        'React 中 Tsup 的作用是？',
        ['零配置打包 TypeScript 库', '打包应用', '开发服务器', '代码检查'],
        0,
      ],
      [
        'React 中 Changeset 的作用是？',
        ['管理 Monorepo 版本和变更日志', '代码检查', '单元测试', '性能监控'],
        0,
      ],
      [
        'React 中 Semantic Versioning 的规则？',
        ['主版本.次版本.修订版本', '版本号.构建号', '日期版本', '随机版本'],
        0,
      ],
      [
        'React 中 npm publish 的流程？',
        ['登录、验证、打包、发布到 Registry', '直接推送代码', 'Git 提交', 'Docker 部署'],
        0,
      ],
      [
        'React 中如何实现组件库按需加载？',
        ['Babel 插件或 package.json sideEffects', '全量引入', '手动导入', 'CDN 加载'],
        0,
      ],
      [
        'React 中 Docusaurus 的作用是？',
        ['构建项目文档网站', '状态管理', 'UI 组件库', '路由管理'],
        0,
      ],
      [
        'React 中 TSDoc 的作用是？',
        ['规范 TypeScript 代码注释生成文档', '代码检查', '单元测试', '性能监控'],
        0,
      ],
      [
        'React 中 Chromatic 的作用是？',
        ['可视化测试和发布 Storybook', '代码压缩', '类型检查', '模块打包'],
        0,
      ],
      [
        'React 中 Sentry 的作用是？',
        ['实时监控应用错误和性能', '代码检查', '单元测试', '模块打包'],
        0,
      ],
      [
        'React 中 Google Analytics 的作用是？',
        ['分析用户行为和流量数据', '错误监控', '性能优化', '代码检查'],
        0,
      ],
      [
        'React 中 Mixpanel 的作用是？',
        ['产品分析和用户行为追踪', '错误监控', '性能优化', '代码检查'],
        0,
      ],
      [
        'React 中 PostCSS 的作用是？',
        ['使用 JS 插件转换 CSS 如 Autoprefixer', 'CSS 预处理器', 'CSS 框架', 'CSS 压缩'],
        0,
      ],
      [
        'React 中 Autoprefixer 的作用是？',
        ['自动添加 CSS 浏览器前缀', 'CSS 压缩', 'CSS 格式化', 'CSS 验证'],
        0,
      ],
      [
        'React 中 Tailwind CSS 的作用是？',
        ['原子化 CSS 框架快速构建界面', '组件库', '状态管理', '路由管理'],
        0,
      ],
      [
        'React 中 UnoCSS 的作用是？',
        ['即时按需原子化 CSS 引擎', 'CSS 预处理器', 'CSS 压缩', 'CSS 验证'],
        0,
      ],
      [
        'React 中 Ant Design 的特点？',
        ['企业级 UI 组件库，功能丰富', '轻量级', '只支持移动端', '只支持 SSR'],
        0,
      ],
      [
        'React 中 Material-UI 的特点？',
        ['基于 Material Design 的组件库', '企业级', '极简风格', '只支持 TypeScript'],
        0,
      ],
      [
        'React 中 Chakra UI 的特点？',
        ['可访问性优先、可组合、主题化', '企业级', 'Material Design', '不可定制'],
        0,
      ],
      [
        'React 中 Radix UI 的特点？',
        ['无样式可访问性组件原语', '完整组件库', 'CSS 框架', '状态管理'],
        0,
      ],
      [
        'React 中 Headless UI 的特点？',
        ['无样式但包含交互逻辑的组件', '有样式组件', 'CSS 框架', '图标库'],
        0,
      ],
      [
        'React 中 Formik 的作用是？',
        ['简化 React 表单处理和验证', '状态管理', '路由管理', 'UI 组件'],
        0,
      ],
      [
        'React 中 React Hook Form 的作用是？',
        ['高性能灵活的表单验证库', 'UI 组件库', '状态管理', '路由管理'],
        0,
      ],
      [
        'React 中 Zod 的作用是？',
        ['TypeScript 优先的模式验证库', '状态管理', '路由管理', 'UI 组件'],
        0,
      ],
      [
        'React 中 Yup 的作用是？',
        ['对象模式验证库常用于表单', '状态管理', '路由管理', 'UI 组件'],
        0,
      ],
      [
        'React 中 Axios 的作用是？',
        ['基于 Promise 的 HTTP 客户端', '状态管理', '路由管理', 'UI 组件'],
        0,
      ],
      [
        'React 中 SWR 的作用是？',
        ['数据请求的 React Hooks 库', '状态管理', '路由管理', 'UI 组件'],
        0,
      ],
      [
        'React 中 React Query 的作用是？',
        ['服务端状态管理和数据请求库', '客户端状态', '路由管理', 'UI 组件'],
        0,
      ],
      [
        'React 中 React Query 的核心概念？',
        [
          'Query, Mutation, Invalidation',
          'Store, Reducer, Action',
          'State, Props, Context',
          'Router, Route, Link',
        ],
        0,
      ],
      [
        'React 中 Framer Motion 的作用是？',
        ['强大的 React 动画和手势库', '状态管理', '路由管理', 'UI 组件'],
        0,
      ],
      [
        'React 中 React Spring 的作用是？',
        ['基于物理弹簧的动画库', '路由管理', '状态管理', 'UI 组件'],
        0,
      ],
      [
        'React 中 React DnD 的作用是？',
        ['实现复杂拖拽交互的库', '动画库', '状态管理', '路由管理'],
        0,
      ],
      [
        'React 中 React Virtualized 的特点？',
        ['老牌虚拟列表组件库', '最新最快', '不支持表格', '不支持网格'],
        0,
      ],
      [
        'React 中 react-window 的特点？',
        ['轻量高效的虚拟列表组件', '功能最多', '体积最大', '不支持动态尺寸'],
        0,
      ],
      [
        'React 中 TanStack Virtual 的特点？',
        ['无框架依赖的虚拟化核心', '只支持 React', '体积最大', '不支持动态尺寸'],
        0,
      ],
      [
        'React 中 React Three Fiber 的作用是？',
        ['React 式的 Three.js 3D 渲染器', '2D 渲染', '状态管理', '路由管理'],
        0,
      ],
      [
        'React 中 D3.js 的作用是？',
        ['数据驱动文档操作实现数据可视化', '3D 渲染', '状态管理', '路由管理'],
        0,
      ],
      [
        'React 中 ECharts 的作用是？',
        ['功能丰富的数据可视化图表库', '3D 渲染', '状态管理', '路由管理'],
        0,
      ],
      ['React 中 Mapbox GL JS 的作用是？', ['渲染交互式地图', '3D 渲染', '图表库', '状态管理'], 0],
      [
        'React 中 react-i18next 的作用是？',
        ['React 国际化框架', '状态管理', '路由管理', 'UI 组件'],
        0,
      ],
      ['React 中 Day.js 的作用是？', ['轻量级日期处理库', '状态管理', '路由管理', 'UI 组件'], 0],
      [
        'React 中 Lodash 的作用是？',
        ['提供模块化实用工具函数', 'UI 组件', '状态管理', '路由管理'],
        0,
      ],
      ['React 中 ramda 的作用是？', ['函数式编程工具库', 'UI 组件', '状态管理', '路由管理'], 0],
      [
        'React 中 immer 的作用是？',
        ['以可变方式编写不可变更新逻辑', '状态管理', '路由管理', 'UI 组件'],
        0,
      ],
    ];
    const item = items[(i - 801) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }
  // ==================== 第九部分：React 原理与源码 (901-1000) ====================
  for (let i = 901; i <= 1000; i++) {
    const q = { id: `react-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'React 中 Fiber 节点的结构是？',
        ['链表结构包含 child, sibling, return', '树结构', '图结构', '数组结构'],
        0,
      ],
      [
        'React 中 Fiber 的作用是？',
        ['实现增量渲染和任务优先级调度', '提升首次加载', '减少内存', '简化代码'],
        0,
      ],
      [
        'React 中 Fiber 树有几棵？',
        ['两棵：current 树和 workInProgress 树', '一棵', '三棵', '无数棵'],
        0,
      ],
      [
        'React 中 current 树和 workInProgress 树的关系？',
        ['通过 alternate 指针双缓存切换', '完全独立', '互相包含', '没有关系'],
        0,
      ],
      [
        'React 中 Reconciliation 的阶段是？',
        ['Render 阶段（可中断）', 'Commit 阶段（不可中断）', 'Layout 阶段', 'Paint 阶段'],
        0,
      ],
      [
        'React 中 Commit 阶段的特点？',
        ['同步执行不可中断操作真实 DOM', '可中断', '异步执行', '批量执行'],
        0,
      ],
      ['React 中 Diff 算法的时间复杂度？', ['O(n)', 'O(n^2)', 'O(n^3)', 'O(1)'], 0],
      [
        'React 中 Diff 算法的策略不包括？',
        ['深度优先遍历所有节点', '跨层级移动极少忽略', '不同类型生成不同树', 'Key 标识移动'],
        0,
      ],
      [
        'React 中 Key 的 Diff 作用？',
        ['识别节点是否可复用减少不必要的创建', '加速渲染', '标识样式', '绑定事件'],
        0,
      ],
      [
        'React 中 Lane 模型的作用是？',
        ['表示更新的优先级和过期时间', '计算大小', '管理内存', '调度网络'],
        0,
      ],
      [
        'React 中 Scheduler 的作用是？',
        ['调度任务在浏览器空闲时执行', '编译代码', '打包模块', '压缩代码'],
        0,
      ],
      [
        'React 中 MessageChannel 的作用？',
        ['实现宏任务在宏任务中执行调度', '网络通信', 'Web Worker', '事件监听'],
        0,
      ],
      [
        'React 中 useEffect 的底层实现？',
        [
          '在 Commit 阶段异步调度',
          '在 Render 阶段同步执行',
          '在 DOM 更新前执行',
          '在组件挂载时执行',
        ],
        0,
      ],
      [
        'React 中 useLayoutEffect 的底层实现？',
        ['在 Commit 阶段同步执行', '异步调度', '在 Render 阶段执行', '在浏览器空闲执行'],
        0,
      ],
      [
        'React 中 useState 的底层实现？',
        ['使用链表在 Fiber 节点保存状态', '使用数组', '使用对象', '使用闭包'],
        0,
      ],
      [
        'React 中 Hooks 为什么不能在条件语句中使用？',
        ['链表顺序错乱导致状态取值错误', '性能问题', '语法限制', '类型错误'],
        0,
      ],
      [
        'React 中合成事件的底层机制？',
        ['事件委托到根节点统一分发', '每个元素直接绑定', '事件冒泡捕获', '自定义事件总线'],
        0,
      ],
      [
        'React 17 事件委托的变更？',
        [
          '从 document 改为根 DOM 容器',
          '从 window 改为 document',
          '从根容器改为 document',
          '没有变更',
        ],
        0,
      ],
      [
        'React 中 Batch Update 的机制？',
        ['将多次 setState 合并为一次更新', '每次 setState 都更新', '定时更新', '手动更新'],
        0,
      ],
      [
        'React 中 Batch Update 的实现？',
        ['通过 isBatchingUpdates 标志位控制', 'Promise.then', 'setTimeout', 'requestIdleCallback'],
        0,
      ],
      [
        'React 中 Concurrent Mode 的核心？',
        ['可中断渲染和时间切片', '多线程渲染', '并行计算', '同步渲染'],
        0,
      ],
      [
        'React 中 Time Slicing 的原理？',
        ['将长任务拆分为小帧在空闲时执行', '延长执行时间', '并行执行', '一次性执行'],
        0,
      ],
      [
        'React 中 Suspense 的底层原理？',
        ['捕获子组件抛出的 Promise 暂停渲染', '延迟加载', '代码分割', '错误捕获'],
        0,
      ],
      [
        'React 中 Suspense 如何捕获 Promise？',
        ['通过 try/catch 捕获 throw 的 Promise', 'then 方法', 'async/await', '回调函数'],
        0,
      ],
      [
        'React 中 Context 的更新机制？',
        ['穿透子组件直接更新消费者', '逐层传递', '广播更新', '观察者模式'],
        0,
      ],
      [
        'React 中 Context 更新是否穿透？',
        [
          '是，即使中间组件 shouldComponentUpdate 返回 false',
          '否，会被阻断',
          '取决于层级',
          '取决于类型',
        ],
        0,
      ],
      [
        'React 中 Ref 的底层实现？',
        ['作为 Fiber 的属性在 Commit 阶段赋值', '在 Render 阶段赋值', '事件监听', '状态管理'],
        0,
      ],
      [
        'React 中 forwardRef 的底层实现？',
        ['将 ref 作为 props 传递给子组件', '直接访问 DOM', '克隆元素', '高阶组件'],
        0,
      ],
      [
        'React 中 Memo 的底层实现？',
        ['浅比较 Props 避免重新渲染', '深比较', '缓存结果', '代码分割'],
        0,
      ],
      [
        'React 中 PureComponent 的底层实现？',
        ['内置 shouldComponentUpdate 浅比较', '深比较', '代理组件', '高阶组件'],
        0,
      ],
      [
        'React 中 createElement 的作用？',
        ['创建 ReactElement 对象', '创建 DOM', '创建组件', '创建 Fiber'],
        0,
      ],
      [
        'React 中 ReactElement 的结构？',
        ['包含 type, props, key, ref 的对象', 'DOM 节点', 'Fiber 节点', '组件实例'],
        0,
      ],
      [
        'React 中 Component 的结构？',
        ['包含 state, props, setState 的类', '函数组件', 'Fiber 节点', 'ReactElement'],
        0,
      ],
      [
        'React 中 FunctionComponent 的特点？',
        ['无实例、无 this、无生命周期', '有实例', '有 this', '有生命周期'],
        0,
      ],
      [
        'React 中 ClassComponent 的特点？',
        ['有实例、有 this、有生命周期', '无实例', '无 this', '无生命周期'],
        0,
      ],
      [
        'React 中 HostComponent 指的是？',
        ['原生 DOM 元素如 div, span', '函数组件', '类组件', '高阶组件'],
        0,
      ],
      ['React 中 HostText 指的是？', ['文本节点', 'DOM 元素', '组件', 'Fiber 节点'], 0],
      [
        'React 中 Fragment 的底层实现？',
        ['type 为 Symbol 的空壳元素', '真实 DOM', '数组', '字符串'],
        0,
      ],
      [
        'React 中 Portal 的底层实现？',
        ['脱离父 Fiber 树挂载到其他 DOM 容器', '虚拟 DOM', '高阶组件', '事件委托'],
        0,
      ],
      [
        'React 中 StrictMode 的底层行为？',
        ['重复调用渲染和副作用检测副作用', '压缩代码', '优化性能', '错误捕获'],
        0,
      ],
      [
        'React 中 Profiler 的底层实现？',
        ['记录组件渲染时间并回调', '性能优化', '错误捕获', '状态管理'],
        0,
      ],
      [
        'React 中 ErrorBoundary 的底层实现？',
        ['捕获子组件渲染阶段错误并降级', '捕获事件错误', '捕获网络错误', '捕获异步错误'],
        0,
      ],
      [
        'React 中 getDerivedStateFromError 的调用时机？',
        ['子组件渲染阶段抛出错误后', '事件错误', '网络错误', '异步错误'],
        0,
      ],
      [
        'React 中 componentDidCatch 的调用时机？',
        ['子组件提交阶段错误后用于记录日志', '渲染阶段', 'DOM 更新前', '组件挂载时'],
        0,
      ],
      [
        'React 中 Update 对象的结构？',
        ['包含 lane, payload, callback 等', '只有 payload', '只有 callback', '只有 lane'],
        0,
      ],
      ['React 中 UpdateQueue 的结构？', ['环形链表保存多个 Update', '数组', '栈', '对象'], 0],
      [
        'React 中如何处理高优先级插队？',
        ['中断当前低优先级重新从高优先级开始', '等待当前完成', '并行执行', '丢弃低优先级'],
        0,
      ],
      [
        'React 中饥饿问题如何解决？',
        [
          '高优先级一直插队导致低优先级无法执行，通过过期时间提升',
          '无法解决',
          '丢弃低优先级',
          '无限重试',
        ],
        0,
      ],
      [
        'React 中 useEffect 的清理函数何时执行？',
        ['新的 effect 执行前和组件卸载时', 'DOM 更新前', 'Render 阶段', 'Commit 阶段'],
        0,
      ],
      [
        'React 中 useMemo 的底层实现？',
        ['在 Fiber 节点保存上一次值和依赖比较', '每次重新计算', '全局缓存', '闭包缓存'],
        0,
      ],
      [
        'React 中 useCallback 的底层实现？',
        ['类似 useMemo 缓存函数引用', '每次创建新函数', '全局缓存', '闭包缓存'],
        0,
      ],
      [
        'React 中 useReducer 的底层实现？',
        ['类似 useState 使用链表保存 dispatch 和 state', '独立实现', '基于 Redux', '基于 Context'],
        0,
      ],
      [
        'React 中 useRef 的底层实现？',
        ['在 Fiber 节点保存对象引用不变', '每次创建新对象', '全局变量', '闭包变量'],
        0,
      ],
      [
        'React 中 useImperativeHandle 的底层实现？',
        ['在 Commit 阶段将值赋给 ref.current', 'Render 阶段', '创建阶段', '销毁阶段'],
        0,
      ],
      [
        'React 中 useLayoutEffect 和 useEffect 的执行时机区别？',
        [
          'useLayoutEffect 在 DOM 更新后同步执行，useEffect 异步',
          '没有区别',
          'useEffect 同步',
          '执行顺序相同',
        ],
        0,
      ],
      [
        'React 中 useInsertionEffect 的执行时机？',
        ['在 DOM 变更前同步执行用于插入样式', 'DOM 变更后', '异步执行', '组件挂载前'],
        0,
      ],
      [
        'React 中 useId 的底层实现？',
        ['基于 Fiber 树层级和顺序生成唯一 ID', '随机数', '时间戳', 'UUID'],
        0,
      ],
      [
        'React 中 useSyncExternalStore 的作用？',
        ['安全订阅外部数据源保证并发模式一致性', '状态管理', '路由管理', 'UI 渲染'],
        0,
      ],
      [
        'React 中 useDeferredValue 的底层实现？',
        ['返回延迟更新的值避免高优先级阻塞', '防抖', '节流', '异步等待'],
        0,
      ],
      [
        'React 中 useTransition 的底层实现？',
        ['将更新标记为低优先级过渡不阻塞输入', '动画过渡', '组件切换', '路由过渡'],
        0,
      ],
      [
        'React 中 OffscreenComponent 的作用？',
        ['离屏渲染组件用于缓存和预渲染', '错误边界', '事件处理', '样式管理'],
        0,
      ],
      [
        'React 中 CacheComponent 的作用？',
        ['缓存组件状态避免卸载丢失', '性能监控', '错误处理', '样式计算'],
        0,
      ],
      [
        'React 中 Legacy Mode 的特点？',
        ['同步渲染不可中断', '可中断渲染', '并发渲染', '流式渲染'],
        0,
      ],
      [
        'React 中 Blocking Mode 的特点？',
        ['部分并发特性的过渡模式', '完全同步', '完全并发', '流式渲染'],
        0,
      ],
      [
        'React 中 Concurrent Mode 的特点？',
        ['完全并发可中断可优先级调度', '同步渲染', '不可中断', '单线程渲染'],
        0,
      ],
      [
        'React 中 Root Fiber 的创建时机？',
        ['首次调用 createRoot 或 render 时', '每次更新', '组件挂载', 'DOM 操作'],
        0,
      ],
      [
        'React 中 Fiber Root 的结构？',
        ['包含 current 指针和容器信息', '只有 Fiber', '只有 DOM', '只有状态'],
        0,
      ],
      [
        'React 中 beginWork 的作用？',
        ['处理 Fiber 节点进入阶段计算子树', '提交 DOM', '处理副作用', '调度任务'],
        0,
      ],
      [
        'React 中 completeWork 的作用？',
        ['处理 Fiber 节点完成阶段生成 EffectList', '开始阶段', '提交 DOM', '调度任务'],
        0,
      ],
      [
        'React 中 EffectList 的作用？',
        ['收集有副作用的 Fiber 节点供 Commit 阶段处理', '渲染列表', '状态列表', '事件列表'],
        0,
      ],
      [
        'React 中 Mutation 阶段的作用？',
        ['操作真实 DOM 插入更新删除', '计算差异', '调度任务', '执行副作用'],
        0,
      ],
      [
        'React 中 Layout 阶段的作用？',
        ['执行 useLayoutEffect 和 ref 更新', '操作 DOM', '计算差异', '调度任务'],
        0,
      ],
      [
        'React 中 Passive Effect 阶段的作用？',
        ['异步执行 useEffect', '同步执行', '操作 DOM', '计算差异'],
        0,
      ],
      [
        'React 中 flushSync 的作用？',
        ['强制同步刷新更新立即执行', '批量更新', '延迟更新', '取消更新'],
        0,
      ],
      [
        'React 中 flushPassiveEffects 的作用？',
        ['刷新所有等待中的 useEffect', '刷新 DOM', '刷新状态', '刷新事件'],
        0,
      ],
      [
        'React 中 isBatchingUpdates 的作用？',
        ['标识是否处于批量更新状态', '标识渲染状态', '标识挂载状态', '标识卸载状态'],
        0,
      ],
      [
        'React 中 unstable_batchedUpdates 的作用？',
        ['在非 React 事件中开启批量更新', '关闭批量更新', '强制同步更新', '取消更新'],
        0,
      ],
      [
        'React 中 requestIdleCallback 的作用？',
        ['在浏览器空闲时执行低优先级任务', '立即执行', '定时执行', '同步执行'],
        0,
      ],
      [
        'React 中为什么不用 requestIdleCallback？',
        ['执行频率不稳定且一帧只能执行一次', '性能差', '不兼容', '已废弃'],
        0,
      ],
      [
        'React 中 Scheduler 的优先级划分？',
        ['Immediate, UserBlocking, Normal, Low, Idle', '高, 中, 低', '1, 2, 3', 'A, B, C'],
        0,
      ],
      [
        'React 中 expirationTime 的作用？',
        ['表示更新的过期时间避免饥饿问题', '执行时间', '创建时间', '销毁时间'],
        0,
      ],
      [
        'React 中 Lane 的二进制表示好处？',
        ['快速判断优先级和批量合并', '节省内存', '代码美观', '易于理解'],
        0,
      ],
      [
        'React 中事件系统的插件机制？',
        ['不同事件类型由不同 Plugin 处理如 SimpleEventPlugin', '单一插件', '无插件', '外部插件'],
        0,
      ],
      [
        'React 中 SyntheticEvent 的池化机制？',
        ['复用事件对象减少 GC 压力（React 17 已移除）', '增加内存', '简化代码', '提高速度'],
        0,
      ],
      [
        'React 17 为什么移除事件池？',
        ['现代浏览器优化不再需要且导致困惑', '性能问题', '兼容问题', '安全原因'],
        0,
      ],
      [
        'React 中事件触发的顺序？',
        ['捕获阶段从根到目标，冒泡阶段从目标到根', '只冒泡', '只捕获', '随机执行'],
        0,
      ],
      [
        'React 中如何阻止合成事件冒泡？',
        ['e.stopPropagation()', 'return false', 'e.cancelBubble', 'e.stop()'],
        0,
      ],
      [
        'React 中合成事件和原生事件执行顺序？',
        ['合成事件在原生事件之后（React 17 前）或之前', '同时执行', '随机执行', '只执行一个'],
        0,
      ],
      [
        'React 中 setState 的函数式更新好处？',
        ['获取最新 state 避免闭包陷阱', '异步执行', '性能更好', '代码简洁'],
        0,
      ],
      [
        'React 中 Object.is 的作用？',
        ['比较两个值是否相同用于依赖比较', '深比较', '引用比较', '类型比较'],
        0,
      ],
      [
        'React 中 shallowEqual 的实现？',
        ['比较第一层属性值和引用', '深比较', 'JSON 比较', '字符串比较'],
        0,
      ],
      [
        'React 中 React.createElement 和 JSX 的关系？',
        ['JSX 是 createElement 的语法糖', '没有关系', 'createElement 是 JSX 的语法糖', '互相替代'],
        0,
      ],
      [
        'React 中 React.cloneElement 的作用？',
        ['克隆并修改 ReactElement 的 Props', '深拷贝组件', '创建组件', '销毁组件'],
        0,
      ],
      [
        'React 中 React.Children.map 的作用？',
        ['遍历 children 处理 null 和数组情况', '普通 map', '过滤 children', '查找 children'],
        0,
      ],
      [
        'React 中 React.isValidElement 的作用？',
        ['判断对象是否为合法 ReactElement', '判断组件', '判断 DOM', '判断函数'],
        0,
      ],
      [
        'React 中 React.Component 的 prototype 特点？',
        ['包含 setState, forceUpdate 等方法', '包含 useState', '包含 useEffect', '包含 useMemo'],
        0,
      ],
      [
        'React 中 React.PureComponent 的原型链？',
        ['继承自 Component 并添加浅比较', '独立实现', '继承自 Object', '继承自 Function'],
        0,
      ],
      [
        'React 中 Reconciler 的作用？',
        ['协调器计算差异并生成更新', '渲染器', '调度器', '事件系统'],
        0,
      ],
      [
        'React 中 Renderer 的作用？',
        ['将 Reconciler 的更新渲染到不同平台', '计算差异', '调度任务', '处理事件'],
        0,
      ],
      [
        'React 中 React DOM Renderer 的作用？',
        ['将组件渲染到浏览器 DOM 环境', '渲染到 Native', '渲染到 Canvas', '渲染到终端'],
        0,
      ],
      [
        'React 中 React Native Renderer 的作用？',
        ['将组件渲染到 iOS/Android 原生视图', '渲染到 DOM', '渲染到 Canvas', '渲染到终端'],
        0,
      ],
      [
        'React 中 React Test Renderer 的作用？',
        ['将组件渲染为纯 JS 对象用于测试', '渲染到 DOM', '渲染到 Native', '渲染到 Canvas'],
        0,
      ],
      [
        'React 中 React Noop Renderer 的作用？',
        ['空渲染器用于调试 Reconciler', '渲染到 DOM', '渲染到 Native', '渲染到 Canvas'],
        0,
      ],
      [
        'React 中 DevTools 的 Hook 机制？',
        ['通过全局 __REACT_DEVTOOLS_GLOBAL_HOOK__ 通信', 'DOM 监听', '网络请求', '文件系统'],
        0,
      ],
      [
        'React 中 Profiler OnRender 回调参数？',
        ['id, phase, actualDuration, baseDuration 等', '只有时间', '只有组件名', '只有状态'],
        0,
      ],
      [
        'React 中 Stack Reconciler 的缺点？',
        ['同步递归不可中断导致卡顿', '性能太好', '内存太少', '代码太长'],
        0,
      ],
      [
        'React 中 Fiber Reconciler 的改进？',
        ['链式结构可中断可优先级调度', '同步递归', '多线程', '增加功能'],
        0,
      ],
      [
        'React 中 Concurrent Reconciler 的改进？',
        ['支持并发特性如 Suspense 和 Transition', '同步渲染', '递归渲染', '批量更新'],
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
const outputPath = join(__dirname, 'react_questions.json');
fs.writeFileSync(outputPath, JSON.stringify(questions, null, 2));
console.log(`已生成 ${questions.length} 道React题目，保存到 ${outputPath}`);
