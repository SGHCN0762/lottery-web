// 生成Vue 1000条题目的脚本
import fs from 'fs';
import path from 'path';

// 题目模板生成函数
function generateQuestions() {
  const questions = [];

  // ==================== 第一部分：响应式系统 (1-150) ====================
  questions.push(
    {
      id: 'vue-1',
      title: 'Vue 3 中用于定义响应式数据的组合式 API 是？',
      options: ['data()', 'ref()', 'useState()', 'setState()'],
      correctAnswer: 1,
    },
    {
      id: 'vue-2',
      title: 'Vue 3 中 reactive() 和 ref() 的主要区别是？',
      options: ['reactive 只能处理对象', 'ref 只能处理基本类型', '没有区别', 'ref 性能更好'],
      correctAnswer: 0,
    },
    {
      id: 'vue-3',
      title: 'Vue 3 中 ref 包装对象类型数据时，内部实际调用的是？',
      options: ['reactive', 'observable', 'computed', 'shallowReactive'],
      correctAnswer: 0,
    },
    {
      id: 'vue-4',
      title: 'Vue 3 中 ref 在模板中自动解包的规则是？',
      options: ['作为顶层属性自动解包', '任何位置都自动解包', '需要手动解包', '在数组中自动解包'],
      correctAnswer: 0,
    },
    {
      id: 'vue-5',
      title: 'Vue 3 中 reactive 的限制是？',
      options: ['只能处理对象和数组', '可以处理基本类型', '解构后保持响应性', '没有限制'],
      correctAnswer: 0,
    },
    {
      id: 'vue-6',
      title: 'Vue 3 中 shallowRef 和 ref 的区别是？',
      options: [
        'shallowRef 只跟踪 .value',
        'shallowRef 性能更好',
        'shallowRef 不深度响应',
        '以上都是',
      ],
      correctAnswer: 3,
    },
    {
      id: 'vue-7',
      title: 'Vue 中 computed 和 watch 的区别是？',
      options: ['computed 有缓存', 'watch 支持异步', 'computed 不能异步', '以上都是'],
      correctAnswer: 3,
    },
    {
      id: 'vue-8',
      title: 'Vue 3 中 setup() 函数的执行时机是？',
      options: ['beforeCreate 之前', 'created 之后', 'mounted 之前', 'beforeMount 之后'],
      correctAnswer: 0,
    },
    {
      id: 'vue-9',
      title: 'Vue 中 v-for 循环时为什么要加 key？',
      options: ['提高性能', '帮助 Vue 追踪节点', '避免渲染错误', '以上都是'],
      correctAnswer: 3,
    },
    {
      id: 'vue-10',
      title: 'Vue 3 中 reactive 丢失响应性的原因不包括？',
      options: ['解构赋值', '替换整个对象', '重新赋值属性', '使用 toRefs'],
      correctAnswer: 3,
    },
    {
      id: 'vue-11',
      title: 'Vue 3 中 ref 的本质是？',
      options: ['一个包含 .value 属性的对象', '一个数组', '一个函数', '一个类'],
      correctAnswer: 0,
    },
    {
      id: 'vue-12',
      title: 'Vue 3 中 reactive 对象被重新赋值后会怎样？',
      options: ['丢失响应性', '保持响应性', '报错', '变成只读'],
      correctAnswer: 0,
    },
    {
      id: 'vue-13',
      title: 'Vue 3 中如何让 reactive 解构后保持响应性？',
      options: ['toRefs', 'toRef', '直接解构', '使用 ref'],
      correctAnswer: 0,
    },
    {
      id: 'vue-14',
      title: 'Vue 3 中 computed 的缓存机制是基于？',
      options: ['依赖追踪', '时间戳', '版本号', '哈希值'],
      correctAnswer: 0,
    },
    {
      id: 'vue-15',
      title: 'Vue 3 中 watch 监听 reactive 对象时默认是？',
      options: ['深度监听', '浅层监听', '不监听', '只监听第一层'],
      correctAnswer: 0,
    },
    {
      id: 'vue-16',
      title: 'Vue 3 中 toRef 和 toRefs 的区别是？',
      options: ['toRef 转换单个属性', 'toRefs 转换整个对象', 'toRefs 返回多个 ref', '以上都是'],
      correctAnswer: 3,
    },
    {
      id: 'vue-17',
      title: 'Vue 中动态组件使用哪个指令？',
      options: ['v-component', 'v-is', ':is', 'component'],
      correctAnswer: 2,
    },
    {
      id: 'vue-18',
      title: 'Vue 3 中 watch 的 flush 选项默认值是？',
      options: ['pre', 'post', 'sync', 'async'],
      correctAnswer: 0,
    },
    {
      id: 'vue-19',
      title: 'Vue 3 中 watch 的 flush 选项设为 post 的效果是？',
      options: ['DOM 更新后执行', 'DOM 更新前执行', '同步执行', '延迟执行'],
      correctAnswer: 0,
    },
    {
      id: 'vue-20',
      title: 'Vue 3 中 defineComponent 的作用是？',
      options: ['提供 TypeScript 类型推导', '创建组件', '注册组件', '导出组件'],
      correctAnswer: 0,
    },
    {
      id: 'vue-21',
      title: 'Vue 中 v-model 的本质是？',
      options: ['语法糖', '双向绑定', 'props + emit', '以上都是'],
      correctAnswer: 3,
    },
    {
      id: 'vue-22',
      title: 'Vue 3 中自定义指令的生命周期钩子有哪些变化？',
      options: ['名称变更', '新增钩子', '删除钩子', '没有变化'],
      correctAnswer: 0,
    },
    {
      id: 'vue-23',
      title: 'Vue 中 provide/inject 适用于什么场景？',
      options: ['父子组件通信', '跨层级组件通信', '兄弟组件通信', '全局状态管理'],
      correctAnswer: 1,
    },
    {
      id: 'vue-24',
      title: 'Vue 3 中 shallowReactive 的特点是？',
      options: ['只追踪第一层', '深度响应', '不可变', '只读'],
      correctAnswer: 0,
    },
    {
      id: 'vue-25',
      title: 'Vue 3 中 watch 监听 ref 定义的对象时，需要开启 deep 吗？',
      options: ['需要', '不需要', '自动深度监听', '报错'],
      correctAnswer: 0,
    },
    {
      id: 'vue-26',
      title: 'Vue 3 中 markRaw 的作用是？',
      options: ['标记对象不被响应式转换', '创建浅响应', '冻结对象', '克隆对象'],
      correctAnswer: 0,
    },
    {
      id: 'vue-27',
      title: 'Vue 3 中 effectScope 的主要应用场景是？',
      options: ['可复用的组合式函数', '全局状态', '组件通信', '路由管理'],
      correctAnswer: 0,
    },
    {
      id: 'vue-28',
      title: 'Vue 3 中 shallowRef 的适用场景是？',
      options: ['大型不可变数据', '小型对象', '频繁更新', '深度响应需求'],
      correctAnswer: 0,
    },
    {
      id: 'vue-29',
      title: 'Vue 3 中 triggerRef 的使用场景是？',
      options: ['手动触发 shallowRef 更新', '普通 ref', 'reactive', 'computed'],
      correctAnswer: 0,
    },
    {
      id: 'vue-30',
      title: 'Vue 3 中 effectScope 的作用是？',
      options: ['批量清理副作用', '管理响应式效果', '隔离作用域', '以上都是'],
      correctAnswer: 3,
    },
    {
      id: 'vue-31',
      title: 'Vue 3 中 watch 的 lazy 特性是指？',
      options: ['默认不立即执行', '延迟执行', '异步执行', '手动执行'],
      correctAnswer: 0,
    },
    {
      id: 'vue-32',
      title: 'Vue 3 中 readonly 的作用是？',
      options: ['创建只读代理', '冻结对象', '常量声明', '禁止修改'],
      correctAnswer: 0,
    },
    {
      id: 'vue-33',
      title: 'Vue 3 中 shallowReadonly 的特点是？',
      options: ['浅层只读', '深层只读', '完全不可变', '可写'],
      correctAnswer: 0,
    },
    {
      id: 'vue-34',
      title: 'Vue 3 中 getCurrentInstance 的使用建议是？',
      options: ['推荐使用', '仅在高级场景使用', '禁止使用', '必须使用'],
      correctAnswer: 1,
    },
    {
      id: 'vue-35',
      title: 'Vue 3 中 watch 的 deep 选项性能影响是？',
      options: ['需要遍历所有嵌套属性', '只影响第一层', '无影响', '提升性能'],
      correctAnswer: 0,
    },
    {
      id: 'vue-36',
      title: 'Vue 3 中 isRef 函数的作用是？',
      options: ['判断是否为 ref', '创建 ref', '解包 ref', '转换 ref'],
      correctAnswer: 0,
    },
    {
      id: 'vue-37',
      title: 'Vue 3 中 isReactive 函数的作用是？',
      options: ['判断是否为 reactive', '创建 reactive', '解包 reactive', '转换 reactive'],
      correctAnswer: 0,
    },
    {
      id: 'vue-38',
      title: 'Vue 3 中 triggerRef 的作用是？',
      options: ['手动触发依赖追踪', '创建 ref', '修改值', '监听变化'],
      correctAnswer: 0,
    },
    {
      id: 'vue-39',
      title: 'Vue 中 v-bind 的简写是？',
      options: [':', '@', '#', '='],
      correctAnswer: 0,
    },
    {
      id: 'vue-40',
      title: 'Vue 3 中 customRef 的作用是？',
      options: ['创建自定义 ref', '控制追踪和触发', '实现防抖节流', '以上都是'],
      correctAnswer: 3,
    },
    {
      id: 'vue-41',
      title: 'Vue 中 event bus 在 Vue 3 中的替代方案是？',
      options: ['mitt', 'provide/inject', 'Pinia', '以上都可以'],
      correctAnswer: 3,
    },
    {
      id: 'vue-42',
      title: 'Vue 3 中 toRaw 的作用是？',
      options: ['获取原始对象', '创建响应式', '克隆对象', '冻结对象'],
      correctAnswer: 0,
    },
    {
      id: 'vue-43',
      title: 'Vue 3 中 markRaw 标记后的对象还能变为响应式吗？',
      options: ['不能', '能', '部分能', '需要特殊处理'],
      correctAnswer: 0,
    },
    {
      id: 'vue-44',
      title: 'Vue 3 中 watchEffect 和 watch 的区别是？',
      options: ['watchEffect 自动收集依赖', 'watch 需要指定源', 'watchEffect 立即执行', '以上都是'],
      correctAnswer: 3,
    },
    {
      id: 'vue-45',
      title: 'Vue 中 $parent 的使用建议是？',
      options: ['推荐使用', '避免使用', '必须使用', '只在子组件使用'],
      correctAnswer: 1,
    },
    {
      id: 'vue-46',
      title: 'Vue 3 中 reactive 的 Proxy 拦截器不包括？',
      options: ['get', 'set', 'deleteProperty', 'call'],
      correctAnswer: 3,
    },
    {
      id: 'vue-47',
      title: 'Vue 中 v-on 的修饰符 .stop 的作用是？',
      options: ['阻止事件冒泡', '阻止默认行为', '只触发一次', '捕获阶段触发'],
      correctAnswer: 0,
    },
    {
      id: 'vue-48',
      title: 'Vue 3 中 useSlots 和 useAttrs 的作用是？',
      options: ['在 setup 中访问 slots 和 attrs', '创建响应式', '组件通信', '路由跳转'],
      correctAnswer: 0,
    },
    {
      id: 'vue-49',
      title: 'Vue 中 directive 的 binding 对象不包含？',
      options: ['value', 'oldValue', 'instance', 'component'],
      correctAnswer: 3,
    },
    {
      id: 'vue-50',
      title: 'Vue 3 中 ref 获取模板元素需要在哪个生命周期之后？',
      options: ['setup', 'onMounted', 'onCreated', 'onBeforeMount'],
      correctAnswer: 1,
    },
    {
      id: 'vue-51',
      title: 'Vue 3 中 setup 语法糖的优势是？',
      options: ['代码更简洁', '自动暴露变量', '更好的类型推导', '以上都是'],
      correctAnswer: 3,
    },
    {
      id: 'vue-52',
      title: 'Vue 3 中 isProxy 函数的作用是？',
      options: ['判断是否为代理对象', '创建代理', '解包代理', '克隆代理'],
      correctAnswer: 0,
    },
    {
      id: 'vue-53',
      title: 'Vue 中 $root 访问的是？',
      options: ['根组件实例', '当前组件', '父组件', '子组件'],
      correctAnswer: 0,
    },
    {
      id: 'vue-54',
      title: 'Vue 3 中 withDefaults 的作用是？',
      options: ['为 props 设置默认值', '创建默认对象', '合并配置', '初始化数据'],
      correctAnswer: 0,
    },
    {
      id: 'vue-55',
      title: 'Vue 中 v-pre 指令的作用是？',
      options: ['跳过编译', '预渲染', '提前执行', '优先渲染'],
      correctAnswer: 0,
    },
    {
      id: 'vue-56',
      title: 'Vue 3 中 setup 语法糖的顶级 await 特性？',
      options: ['自动使组件变为异步', '需要配置', '不支持', '需要包装'],
      correctAnswer: 0,
    },
    {
      id: 'vue-57',
      title: 'Vue 3 中 setup 语法糖如何使用 TypeScript 泛型？',
      options: ['<script setup lang="ts" generic="T">', 'defineProps<T>', '两种都可以', '都不支持'],
      correctAnswer: 2,
    },
    {
      id: 'vue-58',
      title: 'Vue 3 中 setup 语法糖如何定义组件名？',
      options: ['defineOptions', 'name 选项', '文件名', '无法定义'],
      correctAnswer: 0,
    },
    {
      id: 'vue-59',
      title: 'Vue 3 中 setup 语法糖如何定义 inheritAttrs？',
      options: ['defineOptions', 'inheritAttrs 选项', 'setup 参数', '无法定义'],
      correctAnswer: 0,
    },
    {
      id: 'vue-60',
      title: 'Vue 3 中 setup 语法糖如何访问组件实例？',
      options: ['getCurrentInstance', 'this', '无法访问', 'setup 参数'],
      correctAnswer: 0,
    },
    {
      id: 'vue-61',
      title: 'Vue 中 $options 包含什么？',
      options: ['组件选项', '实例属性', '方法', '数据'],
      correctAnswer: 0,
    },
    {
      id: 'vue-62',
      title: 'Vue 3 中 computed 的 setter 何时使用？',
      options: ['需要写入时', '只读场景', '不需要', '初始化时'],
      correctAnswer: 0,
    },
    {
      id: 'vue-63',
      title: 'Vue 中 v-text 和插值的区别是？',
      options: ['v-text 覆盖全部内容', '插值可部分替换', 'v-text 更安全', '以上都是'],
      correctAnswer: 3,
    },
    {
      id: 'vue-64',
      title: 'Vue 3 中 onUnmounted 对应 Vue 2 的哪个钩子？',
      options: ['destroyed', 'beforeDestroy', 'unmounted', 'beforeUnmount'],
      correctAnswer: 0,
    },
    {
      id: 'vue-65',
      title: 'Vue 3 中 watchEffect 的清理函数何时执行？',
      options: ['副作用重新执行前', '组件卸载时', '两者都会', '都不会'],
      correctAnswer: 2,
    },
    {
      id: 'vue-66',
      title: 'Vue 3 中 defineExpose 的作用是？',
      options: ['暴露组件属性给父组件', '导出数据', '公开方法', '以上都是'],
      correctAnswer: 3,
    },
    {
      id: 'vue-67',
      title: 'Vue 中 v-html 的安全风险是？',
      options: ['XSS 攻击', '性能问题', '兼容性问题', '没有风险'],
      correctAnswer: 0,
    },
    {
      id: 'vue-68',
      title: 'Vue 3 中 reactive 对于 Map 和 Set 的处理是？',
      options: ['使用 Proxy 拦截', '不支持', '转为普通对象', '报错'],
      correctAnswer: 0,
    },
    {
      id: 'vue-69',
      title: 'Vue 3 中 shallowReactive 修改嵌套对象会触发更新吗？',
      options: ['不会', '会', '部分触发', '报错'],
      correctAnswer: 0,
    },
    {
      id: 'vue-70',
      title: 'Vue 3 中 defineProps 的泛型用法是？',
      options: ['defineProps<Type>()', 'defineProps<T>()', 'defineProps<{...}>()', '以上都可以'],
      correctAnswer: 3,
    },
    {
      id: 'vue-71',
      title: 'Vue 中 v-bind 绑定 style 支持哪些值？',
      options: ['对象', '数组', '字符串', '以上都是'],
      correctAnswer: 3,
    },
    {
      id: 'vue-72',
      title: 'Vue 3 中 ref 的 .value 在 reactive 中会自动解包吗？',
      options: ['会', '不会', '需要特殊处理', '报错'],
      correctAnswer: 0,
    },
    {
      id: 'vue-73',
      title: 'Vue 中 $data 访问的是？',
      options: ['响应式数据对象', '所有数据', '原始数据', '计算数据'],
      correctAnswer: 0,
    },
    {
      id: 'vue-74',
      title: 'Vue 3 中 watch 的 immediate 选项作用是？',
      options: ['立即执行回调', '深度监听', '同步执行', '异步执行'],
      correctAnswer: 0,
    },
    {
      id: 'vue-75',
      title: 'Vue 中 v-once 指令的作用是？',
      options: ['只渲染一次', '永久缓存', '静态优化', '以上都是'],
      correctAnswer: 3,
    },
    {
      id: 'vue-76',
      title: 'Vue 3 中 readonly 和 Object.freeze 的区别是？',
      options: ['readonly 是深度只读', 'freeze 是浅层冻结', 'readonly 返回代理', '以上都是'],
      correctAnswer: 3,
    },
    {
      id: 'vue-77',
      title: 'Vue 3 中 toRaw 可以获取 ref 的原始值吗？',
      options: ['不能，只能获取 reactive 的', '能', '需要特殊语法', '报错'],
      correctAnswer: 0,
    },
    {
      id: 'vue-78',
      title: 'Vue 3 中 markRaw 的影响是可逆的吗？',
      options: ['不可逆', '可逆', '部分可逆', '需要特殊处理'],
      correctAnswer: 0,
    },
    {
      id: 'vue-79',
      title: 'Vue 中 v-model 在组件上的默认 prop 是？',
      options: ['modelValue', 'value', 'data', 'input'],
      correctAnswer: 0,
    },
    {
      id: 'vue-80',
      title: 'Vue 3 中 watch 的 source 可以是数组吗？',
      options: ['可以，同时监听多个', '不可以', '只能是对象', '只能是函数'],
      correctAnswer: 0,
    },
    {
      id: 'vue-81',
      title: 'Vue 3 中 customRef 的工厂函数接收什么参数？',
      options: ['track, trigger', 'get, set', 'value', 'deps'],
      correctAnswer: 0,
    },
    {
      id: 'vue-82',
      title: 'Vue 3 中 effectScope 的 getCurrentScope 作用是？',
      options: ['获取当前活跃的 scope', '创建 scope', '销毁 scope', '运行 scope'],
      correctAnswer: 0,
    },
    {
      id: 'vue-83',
      title: 'Vue 中 v-slot 的简写是？',
      options: ['#', '@', ':', '%'],
      correctAnswer: 0,
    },
    {
      id: 'vue-84',
      title: 'Vue 3 中 onScopeDispose 的作用是？',
      options: ['在 scope 销毁时执行清理', '创建 scope', '合并 scope', '追踪 scope'],
      correctAnswer: 0,
    },
    {
      id: 'vue-85',
      title: 'Vue 3 中 reactive 和 ref 的选型建议是？',
      options: ['对象用 reactive，基本类型用 ref', '全部用 ref', '全部用 reactive', '无明确建议'],
      correctAnswer: 0,
    },
    {
      id: 'vue-86',
      title: 'Vue 3 中 computed 的返回值是？',
      options: ['只读的 ref', '普通值', 'reactive 对象', '函数'],
      correctAnswer: 0,
    },
    {
      id: 'vue-87',
      title: 'Vue 中 v-bind 的 .sync 修饰符在 Vue 3 中被什么替代？',
      options: ['v-model:propName', 'v-bind.sync', 'update:propName', 'emit'],
      correctAnswer: 0,
    },
    {
      id: 'vue-88',
      title: 'Vue 3 中 watch 回调中访问的值是更新前还是更新后？',
      options: ['更新后', '更新前', '取决于配置', '不确定'],
      correctAnswer: 0,
    },
    {
      id: 'vue-89',
      title: 'Vue 3 中 watch 的 pre flush 选项意味着？',
      options: ['组件更新前执行', '组件更新后执行', '同步执行', '异步执行'],
      correctAnswer: 0,
    },
    {
      id: 'vue-90',
      title: 'Vue 3 中 watchEffect 返回什么？',
      options: ['停止监听的函数', '副作用函数', '依赖数组', 'undefined'],
      correctAnswer: 0,
    },
    {
      id: 'vue-91',
      title: 'Vue 3 中 reactive 如何处理原生 DOM 元素？',
      options: ['保持原生行为', '转为响应式', '报错', '忽略'],
      correctAnswer: 0,
    },
    {
      id: 'vue-92',
      title: 'Vue 3 中 ref 用于模板引用时，初始值是？',
      options: ['null', 'undefined', '0', '空字符串'],
      correctAnswer: 0,
    },
    {
      id: 'vue-93',
      title: 'Vue 中 $props 访问的是？',
      options: ['当前组件的 props', '所有属性', '父组件数据', '子组件数据'],
      correctAnswer: 0,
    },
    {
      id: 'vue-94',
      title: 'Vue 3 中 toHandlerKey 的作用是？',
      options: ['转换为事件处理器键名', '创建事件', '绑定事件', '触发事件'],
      correctAnswer: 0,
    },
    {
      id: 'vue-95',
      title: 'Vue 中 hasInjectionContext 用于判断？',
      options: ['是否有注入上下文', '是否提供数据', '是否注入成功', '是否有依赖'],
      correctAnswer: 0,
    },
    {
      id: 'vue-96',
      title: 'Vue 3 中 reactive 的解构为何失去响应性？',
      options: ['解构创建新引用', 'Vue 限制', 'JavaScript特性', '以上都是'],
      correctAnswer: 0,
    },
    {
      id: 'vue-97',
      title: 'Vue 3 中 toRefs 解决了什么问题？',
      options: ['保持响应性解构', '类型推导', '性能优化', '代码简化'],
      correctAnswer: 0,
    },
    {
      id: 'vue-98',
      title: 'Vue 3 中 computed 的 lazy 计算特性是指？',
      options: ['按需计算', '延迟计算', '异步计算', '缓存计算'],
      correctAnswer: 0,
    },
    {
      id: 'vue-99',
      title: 'Vue 3 中 watch 的 deep 选项默认值是？',
      options: ['false', 'true', 'auto', 'undefined'],
      correctAnswer: 0,
    },
    {
      id: 'vue-100',
      title: 'Vue 3 中 customRef 可以实现？',
      options: ['防抖', '节流', '异步更新', '以上都可以'],
      correctAnswer: 3,
    },
    {
      id: 'vue-101',
      title: 'Vue 3 中 computed 的缓存机制基于什么？',
      options: ['依赖追踪', '时间戳', '版本号', '哈希值'],
      correctAnswer: 0,
    },
    {
      id: 'vue-102',
      title: 'Vue 中 v-bind 绑定 class 时，数组语法支持哪些元素？',
      options: ['字符串', '对象', '三元表达式', '以上都是'],
      correctAnswer: 3,
    },
    {
      id: 'vue-103',
      title: 'Vue 3 中 ref 访问模板元素需要在哪个生命周期之后？',
      options: ['setup', 'onMounted', 'onCreated', 'onBeforeMount'],
      correctAnswer: 1,
    },
    {
      id: 'vue-104',
      title: 'Vue 中 $emit 可以传递多少个参数？',
      options: ['只能1个', '最多2个', '任意多个', '不能传参'],
      correctAnswer: 2,
    },
    {
      id: 'vue-105',
      title: 'Vue 3 中 toValue 函数的作用是？',
      options: ['解包 ref/getter', '创建值', '转换类型', '验证值'],
      correctAnswer: 0,
    },
    {
      id: 'vue-106',
      title: 'Vue 3 中 setup 语法糖如何定义 props？',
      options: ['defineProps 宏', 'props 选项', 'setup 参数', '以上都不对'],
      correctAnswer: 0,
    },
    {
      id: 'vue-107',
      title: 'Vue 3 中 useTemplateRef 的作用是？',
      options: ['获取模板引用', '创建模板', '编译模板', '渲染模板'],
      correctAnswer: 0,
    },
    {
      id: 'vue-108',
      title: 'Vue 中 watch 的 immediate 选项作用是？',
      options: ['立即执行回调', '深度监听', '同步执行', '异步执行'],
      correctAnswer: 0,
    },
    {
      id: 'vue-109',
      title: 'Vue 3 中 defineModel 宏的作用是？',
      options: ['简化 v-model 实现', '定义模型', '创建响应式', '双向绑定'],
      correctAnswer: 0,
    },
    {
      id: 'vue-110',
      title: 'Vue 中 component 标签的 is 属性可以是？',
      options: ['组件名称', '组件对象', '动态表达式', '以上都是'],
      correctAnswer: 3,
    },
    {
      id: 'vue-111',
      title: 'Vue 3 中 unref 函数的作用是？',
      options: ['如果是 ref 则返回值，否则返回本身', '取消引用', '解构 ref', '删除 ref'],
      correctAnswer: 0,
    },
    {
      id: 'vue-112',
      title: 'Vue 中 v-once 对子组件的影响是？',
      options: ['子组件也会跳过更新', '只影响当前元素', '不影响子组件', '提升性能'],
      correctAnswer: 0,
    },
    {
      id: 'vue-113',
      title: 'Vue 3 中 shallowReadonly 的特点是？',
      options: ['浅层只读', '深层只读', '完全不可变', '可写'],
      correctAnswer: 0,
    },
    {
      id: 'vue-114',
      title: 'Vue 3 中 watch 的 flush: sync 意味着？',
      options: ['同步执行', 'DOM 更新前执行', 'DOM 更新后执行', '异步执行'],
      correctAnswer: 0,
    },
    {
      id: 'vue-115',
      title: 'Vue 3 中 useId 的作用是？',
      options: ['生成唯一 ID', '获取实例 ID', '组件标识', '路由 ID'],
      correctAnswer: 0,
    },
    {
      id: 'vue-116',
      title: 'Vue 中 $forceUpdate 的使用建议是？',
      options: ['避免使用', '经常使用', '必须使用', '推荐使用'],
      correctAnswer: 0,
    },
    {
      id: 'vue-117',
      title: 'Vue 3 中 defineSlots 宏的作用是？',
      options: ['类型化插槽定义', '创建插槽', '注册插槽', '删除插槽'],
      correctAnswer: 0,
    },
    {
      id: 'vue-118',
      title: 'Vue 中 v-if 和 v-for 同时使用时哪个优先级更高？',
      options: ['v-for', 'v-if', '相同', '报错'],
      correctAnswer: 0,
    },
    {
      id: 'vue-119',
      title: 'Vue 3 中 useCssVars 的作用是？',
      options: ['注入 CSS 变量', '创建样式', '应用主题', '管理样式'],
      correctAnswer: 0,
    },
    {
      id: 'vue-120',
      title: 'Vue 中 provide 的值可以是？',
      options: ['任何类型', '只能是对象', '只能是函数', '只能是字符串'],
      correctAnswer: 0,
    },
    {
      id: 'vue-121',
      title: 'Vue 3 中 useAttrs 返回的是？',
      options: ['响应式对象', '普通对象', '数组', '字符串'],
      correctAnswer: 0,
    },
    {
      id: 'vue-122',
      title: 'Vue 3 中 watch 的 onCleanup 参数作用是？',
      options: ['清理上一次副作用', '取消监听', '延迟执行', '同步执行'],
      correctAnswer: 0,
    },
    {
      id: 'vue-123',
      title: 'Vue 3 中 defineEmits 的泛型用法是？',
      options: ['defineEmits<{...}>()', 'defineEmits<Type>()', 'defineEmits<T>()', '以上都可以'],
      correctAnswer: 0,
    },
    {
      id: 'vue-124',
      title: 'Vue 3 中 ref 和 reactive 的性能比较？',
      options: ['ref 性能更好', 'reactive 性能更好', '两者相同', '取决于场景'],
      correctAnswer: 3,
    },
    {
      id: 'vue-125',
      title: 'Vue 3 中 reactive 解构会失去响应性是因为？',
      options: ['解构创建新引用', 'Vue 限制', 'JavaScript特性', '以上都是'],
      correctAnswer: 0,
    },
    {
      id: 'vue-126',
      title: 'Vue 中 v-bind 可以绑定哪些属性？',
      options: ['HTML 属性', 'DOM 属性', '组件 props', '以上都是'],
      correctAnswer: 3,
    },
    {
      id: 'vue-127',
      title: 'Vue 3 中 computed 的缓存失效条件是？',
      options: ['依赖值改变', '时间过去', '手动刷新', '组件更新'],
      correctAnswer: 0,
    },
    {
      id: 'vue-128',
      title: 'Vue 3 中 watch 的 deep 选项对 reactive 默认是？',
      options: ['隐式开启', '关闭', '需要手动开启', '报错'],
      correctAnswer: 0,
    },
    {
      id: 'vue-129',
      title: 'Vue 3 中 useModel 的作用是？',
      options: ['创建双向绑定模型', '定义数据模型', '管理状态', '验证数据'],
      correctAnswer: 0,
    },
    {
      id: 'vue-130',
      title: 'Vue 中 v-html 会忽略什么？',
      options: ['Vue 模板语法', 'HTML 标签', 'CSS 样式', 'JavaScript'],
      correctAnswer: 0,
    },
    {
      id: 'vue-131',
      title: 'Vue 3 中 resolveDirective 的作用是？',
      options: ['解析指令', '注册指令', '创建指令', '删除指令'],
      correctAnswer: 0,
    },
    {
      id: 'vue-132',
      title: 'Vue 3 中 readonly 创建的对象可以赋值吗？',
      options: ['不可以，会警告', '可以', '静默失败', '报错'],
      correctAnswer: 0,
    },
    {
      id: 'vue-133',
      title: 'Vue 3 中 shallowReadonly 嵌套对象可以修改吗？',
      options: ['可以，且触发更新', '不可以', '可以修改但不触发更新', '报错'],
      correctAnswer: 2,
    },
    {
      id: 'vue-134',
      title: 'Vue 中 v-for 可以遍历哪些数据类型？',
      options: ['数组', '对象', '数字范围', '以上都是'],
      correctAnswer: 3,
    },
    {
      id: 'vue-135',
      title: 'Vue 3 中 watch 监听 getter 函数的特点是？',
      options: ['只监听返回值', '深度监听', '不监听', '报错'],
      correctAnswer: 0,
    },
    {
      id: 'vue-136',
      title: 'Vue 3 中 watchEffect 的执行时机是？',
      options: ['组件创建时', '依赖变化时', '两者都是', '手动触发'],
      correctAnswer: 2,
    },
    {
      id: 'vue-137',
      title: 'Vue 3 中 effectScope 的 run 方法作用是？',
      options: ['执行作用域内的函数', '销毁作用域', '暂停作用域', '恢复作用域'],
      correctAnswer: 0,
    },
    {
      id: 'vue-138',
      title: 'Vue 中 v-model.number 修饰符的作用是？',
      options: ['自动转换为数字', '限制输入', '格式化', '验证'],
      correctAnswer: 0,
    },
    {
      id: 'vue-139',
      title: 'Vue 3 中 setupContext 包含哪些属性？',
      options: ['attrs, slots, emit', 'props, data, methods', 'refs, state', 'router, route'],
      correctAnswer: 0,
    },
    {
      id: 'vue-140',
      title: 'Vue 3 中 watch 的返回值是？',
      options: ['停止监听函数', '监听器对象', '当前值', 'undefined'],
      correctAnswer: 0,
    },
    {
      id: 'vue-141',
      title: 'Vue 3 中 ref 在 reactive 中解包的条件是？',
      options: ['在 reactive 对象内部', '在数组中', '在 Map 中', '任何情况'],
      correctAnswer: 0,
    },
    {
      id: 'vue-142',
      title: 'Vue 中 v-bind.prop 修饰符的作用是？',
      options: ['绑定为 DOM property', '绑定为 attribute', '特殊处理', '禁用绑定'],
      correctAnswer: 0,
    },
    {
      id: 'vue-143',
      title: 'Vue 3 中 reactive 对数组索引修改的响应性是？',
      options: ['直接修改可触发', '需要特殊方法', '不可触发', '报错'],
      correctAnswer: 0,
    },
    {
      id: 'vue-144',
      title: 'Vue 中 v-on 的事件修饰符 .once 的作用是？',
      options: ['只触发一次', '阻止冒泡', '阻止默认行为', '捕获阶段'],
      correctAnswer: 0,
    },
    {
      id: 'vue-145',
      title: 'Vue 3 中 computed 的缺点是？',
      options: ['不支持异步', '性能开销', '无法传参', '难以调试'],
      correctAnswer: 0,
    },
    {
      id: 'vue-146',
      title: 'Vue 中 v-text 和 {{}} 插值的 XSS 风险对比？',
      options: ['v-text 更安全', '插值更安全', '一样安全', '都不安全'],
      correctAnswer: 0,
    },
    {
      id: 'vue-147',
      title: 'Vue 3 中 watch 的 deep 选项对 Map 和 Set 的监听是？',
      options: ['支持', '不支持', '部分支持', '报错'],
      correctAnswer: 0,
    },
    {
      id: 'vue-148',
      title: 'Vue 中 v-bind.camel 修饰符的作用是？',
      options: ['转换为驼峰命名', '转换为短横线', '保持原样', '大写转换'],
      correctAnswer: 0,
    },
    {
      id: 'vue-149',
      title: 'Vue 3 中 reactive 的代理是浅层的吗？',
      options: ['不是，是深层的', '是浅层的', '取决于配置', '只对第一层代理'],
      correctAnswer: 0,
    },
    {
      id: 'vue-150',
      title: 'Vue 3 中 ref 的内部实现依赖于？',
      options: ['class', 'proxy', 'object', 'function'],
      correctAnswer: 0,
    }
  );

  // ==================== 第二部分：Composition API (151-300) ====================
  for (let i = 151; i <= 300; i++) {
    const q = { id: `vue-${i}`, title: '', options: [], correctAnswer: 0 };
    if (i <= 160) {
      const items = [
        [
          'Vue 3 中 setup 函数的两个参数是？',
          ['props, context', 'props, state', 'state, context', 'attrs, slots'],
          0,
        ],
        [
          'Vue 3 中 setup 的 context 包含什么？',
          ['attrs, slots, emit, expose', 'props, data, methods', 'refs, state', 'router, route'],
          0,
        ],
        ['Vue 3 中 setup 中可以使用 this 吗？', ['不可以', '可以', '有时可以', '取决于配置'], 0],
        [
          'Vue 3 中 setup 的返回值可以是？',
          ['对象或渲染函数', '只能是对象', '只能是函数', '任意值'],
          0,
        ],
        ['Vue 3 中 onBeforeMount 的执行时机是？', ['挂载前', '挂载后', '创建前', '创建后'], 0],
        ['Vue 3 中 onMounted 的执行时机是？', ['挂载后', '挂载前', '创建前', '创建后'], 0],
        ['Vue 3 中 onBeforeUpdate 的执行时机是？', ['更新前', '更新后', '卸载前', '卸载后'], 0],
        ['Vue 3 中 onUpdated 的执行时机是？', ['更新后', '更新前', '卸载前', '卸载后'], 0],
        ['Vue 3 中 onBeforeUnmount 的执行时机是？', ['卸载前', '卸载后', '更新前', '更新后'], 0],
        ['Vue 3 中 onUnmounted 的执行时机是？', ['卸载后', '卸载前', '更新前', '更新后'], 0],
      ];
      const item = items[i - 151];
      q.title = item[0];
      q.options = item[1];
      q.correctAnswer = item[2];
    } else if (i <= 180) {
      const items = [
        [
          'Vue 3 中 onActivated 钩子的作用是？',
          ['被 keep-alive 缓存的组件激活时调用', '组件创建时', '组件挂载时', '组件更新时'],
          0,
        ],
        [
          'Vue 3 中 onDeactivated 钩子的作用是？',
          ['被 keep-alive 缓存的组件停用时调用', '组件卸载时', '组件销毁时', '组件更新时'],
          0,
        ],
        [
          'Vue 3 中 onErrorCaptured 钩子的作用是？',
          ['捕获后代组件错误', '捕获路由错误', '捕获网络错误', '捕获语法错误'],
          0,
        ],
        [
          'Vue 3 中 onRenderTracked 钩子的作用是？',
          ['追踪响应式依赖', '追踪渲染时间', '追踪组件更新', '追踪事件'],
          0,
        ],
        [
          'Vue 3 中 onRenderTriggered 钩子的作用是？',
          ['触发组件更新时调用', '触发渲染时调用', '触发事件时调用', '触发路由时调用'],
          0,
        ],
        ['Vue 3 中组合式函数的命名规范是？', ['useXxx', 'getXxx', 'setXxx', 'onXxx'], 0],
        ['Vue 3 中组合式函数返回什么？', ['响应式引用和方法', '普通对象', '类实例', '函数'], 0],
        [
          'Vue 3 中 provide 的默认值如何设置？',
          ['第二个参数', 'default 选项', 'required 选项', '无法设置'],
          0,
        ],
        [
          'Vue 3 中 inject 的默认值如何设置？',
          ['第二个参数', 'default 工厂函数', '两者都可以', '无法设置'],
          2,
        ],
        [
          'Vue 3 中 provide/inject 的响应性如何实现？',
          ['提供 ref/reactive', '自动响应', '无法实现', '需要 Vuex'],
          0,
        ],
        [
          'Vue 3 中 provide/inject 的缺点是？',
          ['组件重构困难', '类型推导复杂', '调试困难', '以上都是'],
          3,
        ],
        [
          'Vue 3 中 provide 可以在 setup 之外使用吗？',
          ['可以，通过选项式 API', '不可以', '只能在 setup', '需要插件'],
          0,
        ],
        [
          'Vue 3 中 inject 可以在 setup 之外使用吗？',
          ['可以，通过选项式 API', '不可以', '只能在 setup', '需要插件'],
          0,
        ],
        [
          'Vue 3 中 provide 的 key 可以是 Symbol 吗？',
          ['推荐使用 Symbol', '不可以', '只能用字符串', '只能用数字'],
          0,
        ],
        [
          'Vue 3 中异步组件使用什么定义？',
          ['defineAsyncComponent', 'async component', 'import()', 'Suspense'],
          0,
        ],
        [
          'Vue 3 中 defineAsyncComponent 的 loadingComponent 选项作用是？',
          ['显示加载状态', '显示错误状态', '显示超时状态', '显示延迟状态'],
          0,
        ],
        [
          'Vue 3 中 defineAsyncComponent 的 errorComponent 选项作用是？',
          ['显示错误状态', '显示加载状态', '显示超时状态', '显示延迟状态'],
          0,
        ],
        [
          'Vue 3 中 defineAsyncComponent 的 delay 选项作用是？',
          ['延迟显示加载组件', '延迟加载组件', '延迟错误显示', '延迟超时'],
          0,
        ],
        [
          'Vue 3 中 defineAsyncComponent 的 timeout 选项作用是？',
          ['超时时间', '延迟时间', '加载时间', '重试时间'],
          0,
        ],
        [
          'Vue 3 中 defineAsyncComponent 的 suspensible 选项作用是？',
          ['与 Suspense 集成', '挂起组件', '异步加载', '错误处理'],
          0,
        ],
      ];
      const item = items[i - 161];
      q.title = item[0];
      q.options = item[1];
      q.correctAnswer = item[2];
    } else if (i <= 200) {
      const items = [
        [
          'Vue 3 中 Suspense 组件的作用是？',
          ['协调异步依赖', '处理错误', '处理加载', '处理过渡'],
          0,
        ],
        [
          'Vue 3 中 Suspense 的 default 插槽作用是？',
          ['显示异步内容', '显示加载状态', '显示错误', '显示备用内容'],
          0,
        ],
        [
          'Vue 3 中 Suspense 的 fallback 插槽作用是？',
          ['显示加载状态', '显示异步内容', '显示错误', '显示备用内容'],
          0,
        ],
        [
          'Vue 3 中 Teleport 组件的作用是？',
          ['传送组件内容到其他位置', '异步加载', '缓存组件', '过渡动画'],
          0,
        ],
        [
          'Vue 3 中 Teleport 的 to 属性作用是？',
          ['指定目标位置', '指定传送条件', '指定传送内容', '指定传送方式'],
          0,
        ],
        [
          'Vue 3 中 Teleport 的 disabled 属性作用是？',
          ['禁用传送', '启用传送', '条件传送', '强制传送'],
          0,
        ],
        [
          'Vue 3 中 KeepAlive 组件的作用是？',
          ['缓存组件实例', '保持连接', '保持状态', '以上都是'],
          3,
        ],
        [
          'Vue 3 中 KeepAlive 的 include 属性作用是？',
          ['指定缓存组件', '排除缓存组件', '最大缓存数', '缓存策略'],
          0,
        ],
        [
          'Vue 3 中 KeepAlive 的 exclude 属性作用是？',
          ['排除缓存组件', '指定缓存组件', '最大缓存数', '缓存策略'],
          0,
        ],
        [
          'Vue 3 中 KeepAlive 的 max 属性作用是？',
          ['最大缓存实例数', '最大内存', '最大组件数', '最大更新数'],
          0,
        ],
        [
          'Vue 3 中 Transition 组件的作用是？',
          ['处理单个元素过渡', '处理列表过渡', '处理组件过渡', '以上都是'],
          0,
        ],
        [
          'Vue 3 中 TransitionGroup 组件的作用是？',
          ['处理列表过渡', '处理单个元素过渡', '处理组件过渡', '以上都是'],
          0,
        ],
        [
          'Vue 3 中 Transition 的 name 属性作用是？',
          ['自动生成 CSS 类名', '标识过渡', '动画名称', '组件名称'],
          0,
        ],
        [
          'Vue 3 中 Transition 的 CSS 类名 v-enter-from 表示？',
          ['进入过渡的起始状态', '进入过渡的结束状态', '离开过渡的起始状态', '离开过渡的结束状态'],
          0,
        ],
        [
          'Vue 3 中 Transition 的 CSS 类名 v-enter-active 表示？',
          ['进入过渡生效时的状态', '进入过渡的起始状态', '进入过渡的结束状态', '离开过渡的状态'],
          0,
        ],
        [
          'Vue 3 中 Transition 的 CSS 类名 v-leave-from 表示？',
          ['离开过渡的起始状态', '离开过渡的结束状态', '进入过渡的起始状态', '进入过渡的结束状态'],
          0,
        ],
        [
          'Vue 3 中 Transition 的 mode 属性可选值是？',
          ['in-out, out-in', 'in, out', 'before, after', 'sync, async'],
          0,
        ],
        [
          'Vue 3 中 Transition 的 appear 属性作用是？',
          ['初始渲染时也应用过渡', '只应用进入过渡', '只应用离开过渡', '禁用过渡'],
          0,
        ],
        [
          'Vue 3 中 TransitionGroup 的 tag 属性作用是？',
          ['指定渲染的标签', '指定过渡类型', '指定动画类型', '指定组件'],
          0,
        ],
        [
          'Vue 3 中 TransitionGroup 的 move-class 属性作用是？',
          ['自定义移动过渡类名', '自定义进入类名', '自定义离开类名', '自定义动画类名'],
          0,
        ],
      ];
      const item = items[i - 181];
      q.title = item[0];
      q.options = item[1];
      q.correctAnswer = item[2];
    } else if (i <= 220) {
      const items = [
        [
          'Vue 3 中 defineComponent 的泛型参数作用是？',
          ['定义 props 类型', '定义 emits 类型', '定义返回类型', '以上都是'],
          0,
        ],
        [
          'Vue 3 中 defineComponent 的 setup 函数返回值类型是？',
          ['RenderFunction | void', 'any', 'object', 'Component'],
          0,
        ],
        [
          'Vue 3 中 defineAsyncComponent 的类型是？',
          ['defineAsyncComponent<T>', 'AsyncComponent<T>', 'Promise<Component>', '() => Component'],
          0,
        ],
        [
          'Vue 3 中 PropType 的作用是？',
          ['定义复杂 prop 类型', '验证 prop', '转换 prop', '以上都不对'],
          0,
        ],
        [
          'Vue 3 中 ComponentPublicInstance 的作用是？',
          ['组件实例类型', '组件定义', '组件注册', '以上都不对'],
          0,
        ],
        [
          'Vue 3 中 ExtractPropTypes 的作用是？',
          ['从 props 定义中提取类型', '提取组件类型', '提取实例类型', '提取插槽类型'],
          0,
        ],
        [
          'Vue 3 中 ExtractDefaultPropTypes 的作用是？',
          ['提取 props 默认值类型', '提取默认组件', '提取默认实例', '提取默认插槽'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何定义组件名称？',
          [
            'defineOptions({ name: "X" })',
            'export default { name: "X" }',
            '<script name="X">',
            '无法定义',
          ],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何使用 provide？',
          ['provide(key, value)', 'this.provide', 'useProvide', 'app.provide'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何使用 inject？',
          ['inject(key, defaultValue)', 'this.inject', 'useInject', 'app.inject'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何使用 router？',
          ['useRouter()', 'this.$router', 'router.use()', 'getRouter()'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何使用 route？',
          ['useRoute()', 'this.$route', 'route.use()', 'getRoute()'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何使用 store？',
          ['useStore()', 'this.$store', 'store.use()', 'getStore()'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何使用 i18n？',
          ['useI18n()', 'this.$i18n', 'i18n.use()', 'getI18n()'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何访问元素？',
          ['ref + 绑定', 'document.getElementById', 'this.$refs', 'querySelector'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何使用 nextTick？',
          ['nextTick()', 'this.$nextTick', 'await tick', 'useNextTick()'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何定义自定义指令？',
          ['vName 指令', 'directives 选项', 'this.$directives', 'useDirective()'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何使用 computed？',
          ['computed(() => x)', 'this.$computed', 'compute(() => x)', 'useComputed()'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何使用 watch？',
          ['watch(source, callback)', 'this.$watch', 'observe(source, callback)', 'useWatch()'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何使用 watchEffect？',
          ['watchEffect(() => x)', 'this.$watchEffect', 'effect(() => x)', 'useEffect()'],
          0,
        ],
      ];
      const item = items[i - 201];
      q.title = item[0];
      q.options = item[1];
      q.correctAnswer = item[2];
    } else if (i <= 240) {
      const items = [
        [
          'Vue 3 中 setup 语法糖如何使用生命周期？',
          ['onMounted(() => {})', 'mounted()', 'this.onMounted', 'useMounted()'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何使用模板引用？',
          ['ref() + 绑定', 'this.$refs', 'useRef()', 'templateRef()'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何使用插槽？',
          ['useSlots()', 'this.$slots', 'slots()', 'getSlots()'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何使用 attrs？',
          ['useAttrs()', 'this.$attrs', 'attrs()', 'getAttrs()'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何暴露方法？',
          ['defineExpose()', 'export default', 'return', 'this.expose()'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何使用 v-model？',
          ['defineModel()', 'this.model', 'useModel()', 'vModel()'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何定义 emits？',
          ['defineEmits()', 'emits 选项', 'this.$emit', 'useEmits()'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何定义 props？',
          ['defineProps()', 'props 选项', 'this.$props', 'useProps()'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何设置 props 默认值？',
          ['withDefaults()', 'default 选项', 'defineDefaults()', 'this.defaults'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何使用 CSS Modules？',
          ['useCssModule()', 'this.$style', 'style.module', 'cssModule()'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何使用 CSS v-bind？',
          ['v-bind(cssVar)', 'this.cssVar', 'css.bind', 'useCssVar()'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何使用全局属性？',
          ['getCurrentInstance().appContext', 'this.$global', 'useGlobal()', 'globalThis'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何注册全局组件？',
          ['无法直接注册，需在入口文件', 'app.component()', 'defineComponent()', 'useComponent()'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何使用 mixin？',
          ['不支持，推荐组合式函数', 'mixins 选项', 'this.$mixin', 'useMixin()'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何使用 extends？',
          ['不支持，推荐组合式函数', 'extends 选项', 'this.$extends', 'useExtends()'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何使用插件？',
          ['app.use()', 'this.$plugin', 'usePlugin()', 'plugin.install()'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何使用 filter？',
          ['已移除，推荐 computed', 'this.$filter', 'useFilter()', 'filter()'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何使用事件总线？',
          ['mitt 等第三方库', 'this.$emit', 'useBus()', 'EventBus'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何使用 SSR？',
          ['onServerPrefetch', 'this.$ssr', 'useSSR()', 'serverPrefetch'],
          0,
        ],
        [
          'Vue 3 中 setup 语法糖如何使用错误捕获？',
          ['onErrorCaptured', 'this.$error', 'useError()', 'errorCaptured'],
          0,
        ],
      ];
      const item = items[i - 221];
      q.title = item[0];
      q.options = item[1];
      q.correctAnswer = item[2];
    } else if (i <= 260) {
      const items = [
        [
          'Vue 3 中组合式函数的最佳实践是？',
          ['返回 ref 和方法', '返回 reactive', '返回 class', '返回函数'],
          0,
        ],
        [
          'Vue 3 中组合式函数如何处理副作用清理？',
          ['onScopeDispose', 'beforeUnmount', '手动清理', '无需清理'],
          0,
        ],
        [
          'Vue 3 中组合式函数如何处理异步操作？',
          ['async/await', 'Promise', '回调函数', '以上都可以'],
          3,
        ],
        [
          'Vue 3 中组合式函数如何处理参数变化？',
          ['watch 参数', 'computed 参数', '手动更新', '无需处理'],
          0,
        ],
        [
          'Vue 3 中组合式函数如何实现懒加载？',
          ['条件调用', '动态 import', '异步组件', 'Suspense'],
          0,
        ],
        [
          'Vue 3 中组合式函数如何实现单例模式？',
          ['模块级变量', 'provide/inject', '全局属性', 'Pinia'],
          0,
        ],
        [
          'Vue 3 中组合式函数如何处理路由参数？',
          ['useRoute().params', 'this.$route.params', 'router.params', 'route.params'],
          0,
        ],
        [
          'Vue 3 中组合式函数如何处理表单验证？',
          ['自定义逻辑或 VeeValidate', 'this.$validate', 'useValidate()', 'validate()'],
          0,
        ],
        [
          'Vue 3 中组合式函数如何处理分页？',
          ['封装分页逻辑', 'this.$paginate', 'usePaginate()', 'paginate()'],
          0,
        ],
        [
          'Vue 3 中组合式函数如何处理防抖节流？',
          ['customRef 或 lodash', 'this.$debounce', 'useDebounce()', 'debounce()'],
          0,
        ],
        [
          'Vue 3 中组合式函数如何处理鼠标位置？',
          ['监听 mousemove', 'this.$mouse', 'useMouse()', 'mouse()'],
          0,
        ],
        [
          'Vue 3 中组合式函数如何处理窗口大小？',
          ['监听 resize', 'this.$window', 'useWindowSize()', 'window()'],
          0,
        ],
        [
          'Vue 3 中组合式函数如何处理网络请求？',
          ['封装 fetch/axios', 'this.$http', 'useFetch()', 'http()'],
          0,
        ],
        [
          'Vue 3 中组合式函数如何处理本地存储？',
          ['封装 localStorage', 'this.$storage', 'useStorage()', 'storage()'],
          0,
        ],
        [
          'Vue 3 中组合式函数如何处理计时器？',
          ['封装 setInterval', 'this.$timer', 'useTimer()', 'timer()'],
          0,
        ],
        [
          'Vue 3 中组合式函数如何处理全屏？',
          ['封装 Fullscreen API', 'this.$fullscreen', 'useFullscreen()', 'fullscreen()'],
          0,
        ],
        [
          'Vue 3 中组合式函数如何处理剪贴板？',
          ['封装 Clipboard API', 'this.$clipboard', 'useClipboard()', 'clipboard()'],
          0,
        ],
        [
          'Vue 3 中组合式函数如何处理权限？',
          ['封装权限逻辑', 'this.$auth', 'useAuth()', 'auth()'],
          0,
        ],
        [
          'Vue 3 中组合式函数如何处理国际化？',
          ['封装 i18n 逻辑', 'this.$i18n', 'useI18n()', 'i18n()'],
          0,
        ],
        [
          'Vue 3 中组合式函数如何处理主题切换？',
          ['封装 CSS 变量逻辑', 'this.$theme', 'useTheme()', 'theme()'],
          0,
        ],
      ];
      const item = items[i - 241];
      q.title = item[0];
      q.options = item[1];
      q.correctAnswer = item[2];
    } else if (i <= 280) {
      const items = [
        [
          'Vue 3 中 getCurrentInstance 的返回值类型是？',
          ['ComponentInternalInstance | null', 'any', 'object', 'Component'],
          0,
        ],
        [
          'Vue 3 中 getCurrentInstance 可以在什么地方使用？',
          ['setup 和生命周期钩子', '任何地方', '只在 setup', '只在生命周期'],
          0,
        ],
        [
          'Vue 3 中 getCurrentInstance 的 proxy 属性作用是？',
          ['获取组件公共实例', '获取组件内部实例', '获取父组件', '获取根组件'],
          0,
        ],
        [
          'Vue 3 中 getCurrentInstance 的 appContext 属性作用是？',
          ['获取应用上下文', '获取组件上下文', '获取路由上下文', '获取全局状态'],
          0,
        ],
        [
          'Vue 3 中 getCurrentInstance 的 uid 属性作用是？',
          ['唯一标识组件', '标识应用', '标识路由', '标识状态'],
          0,
        ],
        [
          'Vue 3 中 getCurrentInstance 的 type 属性作用是？',
          ['获取组件选项对象', '获取组件实例', '获取组件类型', '获取组件名称'],
          0,
        ],
        [
          'Vue 3 中 getCurrentInstance 的 parent 属性作用是？',
          ['获取父组件实例', '获取子组件实例', '获取根组件实例', '获取兄弟组件实例'],
          0,
        ],
        [
          'Vue 3 中 getCurrentInstance 的 vnode 属性作用是？',
          ['获取组件 VNode', '获取真实 DOM', '获取模板', '获取插槽'],
          0,
        ],
        [
          'Vue 3 中 getCurrentInstance 的 emit 方法作用是？',
          ['触发事件', '注册事件', '监听事件', '销毁事件'],
          0,
        ],
        [
          'Vue 3 中 getCurrentInstance 的 attrs 属性作用是？',
          ['获取非 prop 属性', '获取 prop 属性', '获取事件', '获取插槽'],
          0,
        ],
        [
          'Vue 3 中 getCurrentInstance 的 slots 属性作用是？',
          ['获取插槽', '获取属性', '获取事件', '获取方法'],
          0,
        ],
        [
          'Vue 3 中 getCurrentInstance 的 refs 属性作用是？',
          ['获取模板引用', '获取组件引用', '获取 DOM 引用', '获取属性引用'],
          0,
        ],
        [
          'Vue 3 中 getCurrentInstance 的 isMounted 属性作用是？',
          ['判断是否已挂载', '判断是否已创建', '判断是否已更新', '判断是否已卸载'],
          0,
        ],
        [
          'Vue 3 中 getCurrentInstance 的 isUnmounted 属性作用是？',
          ['判断是否已卸载', '判断是否已挂载', '判断是否已创建', '判断是否已更新'],
          0,
        ],
        [
          'Vue 3 中 getCurrentInstance 的 isDeactivated 属性作用是？',
          ['判断是否已停用', '判断是否已激活', '判断是否已挂载', '判断是否已卸载'],
          0,
        ],
        [
          'Vue 3 中 getCurrentInstance 的 subTree 属性作用是？',
          ['获取子组件 VNode', '获取父组件 VNode', '获取根组件 VNode', '获取兄弟组件 VNode'],
          0,
        ],
        [
          'Vue 3 中 getCurrentInstance 的 ctx 属性作用是？',
          ['获取渲染上下文', '获取应用上下文', '获取路由上下文', '获取全局上下文'],
          0,
        ],
        [
          'Vue 3 中 getCurrentInstance 的 expose 属性作用是？',
          ['暴露组件公共属性', '获取组件属性', '设置组件属性', '删除组件属性'],
          0,
        ],
        [
          'Vue 3 中 getCurrentInstance 的 scope 属性作用是？',
          ['获取效应作用域', '获取全局作用域', '获取函数作用域', '获取块级作用域'],
          0,
        ],
        [
          'Vue 3 中 getCurrentInstance 的 update 方法作用是？',
          ['强制组件更新', '创建组件', '销毁组件', '挂载组件'],
          0,
        ],
      ];
      const item = items[i - 261];
      q.title = item[0];
      q.options = item[1];
      q.correctAnswer = item[2];
    } else {
      const items = [
        [
          'Vue 3 中 useCssModule 的作用是？',
          ['获取 CSS Modules', '创建样式', '应用主题', '管理样式'],
          0,
        ],
        [
          'Vue 3 中 useCssVars 的作用是？',
          ['注入 CSS 变量', '创建样式', '应用主题', '管理样式'],
          0,
        ],
        ['Vue 3 中 useId 的作用是？', ['生成唯一 ID', '获取实例 ID', '组件标识', '路由 ID'], 0],
        [
          'Vue 3 中 useTemplateRef 的作用是？',
          ['获取模板引用', '创建模板', '编译模板', '渲染模板'],
          0,
        ],
        [
          'Vue 3 中 useModel 的作用是？',
          ['创建双向绑定模型', '定义数据模型', '管理状态', '验证数据'],
          0,
        ],
        [
          'Vue 3 中 defineModel 的作用是？',
          ['简化 v-model 实现', '定义模型', '创建响应式', '双向绑定'],
          0,
        ],
        [
          'Vue 3 中 defineOptions 的作用是？',
          ['定义组件选项', '创建配置', '设置属性', '注册组件'],
          0,
        ],
        [
          'Vue 3 中 defineSlots 的作用是？',
          ['类型化插槽定义', '创建插槽', '注册插槽', '删除插槽'],
          0,
        ],
        [
          'Vue 3 中 withDefaults 的作用是？',
          ['为 props 设置默认值', '创建默认对象', '合并配置', '初始化数据'],
          0,
        ],
        [
          'Vue 3 中 defineEmits 的泛型用法是？',
          ['defineEmits<{...}>()', 'defineEmits<Type>()', 'defineEmits<T>()', '以上都可以'],
          0,
        ],
        [
          'Vue 3 中 defineProps 的泛型用法是？',
          ['defineProps<Type>()', 'defineProps<T>()', 'defineProps<{...}>()', '以上都可以'],
          3,
        ],
        [
          'Vue 3 中 defineExpose 的作用是？',
          ['暴露组件属性给父组件', '导出数据', '公开方法', '以上都是'],
          3,
        ],
        [
          'Vue 3 中 defineComponent 的作用是？',
          ['提供 TypeScript 类型推导', '创建组件', '注册组件', '导出组件'],
          0,
        ],
        [
          'Vue 3 中 h 函数的参数顺序是？',
          ['type, props, children', 'props, type, children', 'children, props, type', '以上都不对'],
          0,
        ],
        ['Vue 3 中 h 函数的作用是？', ['创建 VNode', '创建组件', '创建元素', '以上都不对'], 0],
        [
          'Vue 3 中 mergeProps 的作用是？',
          ['合并 props', '创建 props', '验证 props', '转换 props'],
          0,
        ],
        [
          'Vue 3 中 cloneVNode 的作用是？',
          ['克隆 VNode', '创建 VNode', '合并 VNode', '销毁 VNode'],
          0,
        ],
        [
          'Vue 3 中 isVNode 的作用是？',
          ['判断是否为 VNode', '创建 VNode', '合并 VNode', '销毁 VNode'],
          0,
        ],
        [
          'Vue 3 中 resolveComponent 的作用是？',
          ['解析已注册的组件', '注册组件', '创建组件', '销毁组件'],
          0,
        ],
        [
          'Vue 3 中 resolveDynamicComponent 的作用是？',
          ['解析动态组件', '解析静态组件', '解析异步组件', '解析原生组件'],
          0,
        ],
      ];
      const item = items[i - 281];
      q.title = item[0];
      q.options = item[1];
      q.correctAnswer = item[2];
    }
    questions.push(q);
  }

  // ==================== 第三部分：模板语法与指令 (301-400) ====================
  for (let i = 301; i <= 400; i++) {
    const q = { id: `vue-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'Vue 中 v-if 和 v-show 的主要区别是什么？',
        ['v-if 支持动画', 'v-show 只是切换 display', 'v-if 性能更好', '没有区别'],
        1,
      ],
      ['Vue 中 v-bind 绑定 style 支持哪些值？', ['对象', '数组', '字符串', '以上都是'], 3],
      [
        'Vue 中 v-bind 绑定 class 时，数组语法支持哪些元素？',
        ['字符串', '对象', '三元表达式', '以上都是'],
        3,
      ],
      ['Vue 中 v-bind 可以绑定哪些属性？', ['HTML 属性', 'DOM 属性', '组件 props', '以上都是'], 3],
      ['Vue 中 v-bind 绑定内联样式时，值可以是？', ['字符串', '对象', '数组', '以上都是'], 3],
      [
        'Vue 中 v-bind.prop 修饰符的作用是？',
        ['绑定为 DOM property', '绑定为 attribute', '特殊处理', '禁用绑定'],
        0,
      ],
      [
        'Vue 中 v-bind.attr 修饰符的作用是？',
        ['显式绑定为 attribute', '绑定为 property', '特殊处理', '禁用'],
        0,
      ],
      [
        'Vue 中 v-bind.camel 修饰符的作用是？',
        ['转换为驼峰命名', '转换为短横线', '保持原样', '大写转换'],
        0,
      ],
      [
        'Vue 中 v-bind 绑定 style 时，浏览器前缀会自动添加吗？',
        ['会自动添加', '不会添加', '需要手动添加', '部分添加'],
        0,
      ],
      [
        'Vue 中 v-bind 绑定 SVG 属性需要注意什么？',
        ['大小写敏感', '需要命名空间', '特殊处理', '以上都是'],
        3,
      ],
      [
        'Vue 中 v-bind 的动态参数可以是 null 吗？',
        ['可以，会移除绑定', '不可以', '会报错', '会忽略'],
        0,
      ],
      [
        'Vue 中 v-bind 绑定类名时，falsy 值会被？',
        ['忽略', '渲染为 false', '报错', '转为字符串'],
        0,
      ],
      ['Vue 中 v-bind 的数组语法中，falsy 值会被？', ['忽略', '渲染', '报错', '转为空字符串'], 0],
      [
        'Vue 中 v-text 和插值的区别是？',
        ['v-text 覆盖全部内容', '插值可部分替换', 'v-text 更安全', '以上都是'],
        3,
      ],
      ['Vue 中 v-html 的安全风险是？', ['XSS 攻击', '性能问题', '兼容性问题', '没有风险'], 0],
      ['Vue 中 v-html 会忽略什么？', ['Vue 模板语法', 'HTML 标签', 'CSS 样式', 'JavaScript'], 0],
      [
        'Vue 中 v-text 和 {{}} 插值的 XSS 风险对比？',
        ['v-text 更安全', '插值更安全', '一样安全', '都不安全'],
        0,
      ],
      [
        'Vue 中 v-on 的修饰符 .stop 的作用是？',
        ['阻止事件冒泡', '阻止默认行为', '只触发一次', '捕获阶段触发'],
        0,
      ],
      [
        'Vue 中 v-on 的事件修饰符 .once 的作用是？',
        ['只触发一次', '阻止冒泡', '阻止默认行为', '捕获阶段'],
        0,
      ],
      [
        'Vue 中 v-on 的事件修饰符 .capture 的作用是？',
        ['使用捕获模式', '阻止冒泡', '阻止默认行为', '只触发一次'],
        0,
      ],
      [
        'Vue 中 v-on 的 passive 修饰符的作用是？',
        ['不调用 preventDefault', '调用 preventDefault', '阻止冒泡', '捕获阶段'],
        0,
      ],
      [
        'Vue 中 v-on 的精确修饰符 .exact 的作用是？',
        ['要求精确匹配系统修饰键', '模糊匹配', '忽略修饰键', '全部匹配'],
        0,
      ],
      ['Vue 中 v-on 的按键修饰符 .enter 对应哪个键？', ['回车键', '空格键', 'ESC 键', 'Tab 键'], 0],
      [
        'Vue 中 v-on 的系统修饰符 .ctrl 需要配合什么键？',
        ['Ctrl 键', 'Alt 键', 'Shift 键', 'Meta 键'],
        0,
      ],
      [
        'Vue 中 v-on 的鼠标修饰符 .left 指的是？',
        ['鼠标左键', '鼠标右键', '鼠标中键', '所有按键'],
        0,
      ],
      ['Vue 中 v-on 的事件处理器可以是？', ['方法名', '内联语句', '函数表达式', '以上都是'], 3],
      [
        'Vue 中 v-on 的内联语句中可以访问 $event 吗？',
        ['可以', '不可以', '需要声明', '默认禁用'],
        0,
      ],
      [
        'Vue 中 v-on 可以监听原生 DOM 事件吗？',
        ['可以', '不可以', '只能自定义', '需要特殊配置'],
        0,
      ],
      [
        'Vue 中 v-on 可以绑定到组件的自定义事件吗？',
        ['可以', '不可以', '只能原生事件', '需要特殊配置'],
        0,
      ],
      [
        'Vue 中 v-on 的多个事件可以用同一个处理器吗？',
        ['可以，用空格分隔', '不可以', '需要分别绑定', '只能用数组'],
        0,
      ],
      [
        'Vue 中 v-on 的事件名可以使用 kebab-case 吗？',
        ['可以，会自动转换', '不可以', '只能用 camelCase', '只能用 PascalCase'],
        0,
      ],
      [
        'Vue 中 v-on 的 once 修饰符可以和 capture 一起用吗？',
        ['可以', '不可以', '需要特殊语法', '会冲突'],
        0,
      ],
      ['Vue 中 v-on 的简写是？', ['@', ':', '#', '='], 0],
      ['Vue 中 v-slot 的简写是？', ['#', '@', ':', '%'], 0],
      [
        'Vue 中 v-bind 的缩写 : 可以用于指令吗？',
        ['不可以，只能用于绑定', '可以', '只能用于事件', '只能用于插槽'],
        0,
      ],
      [
        'Vue 中 v-bind 的修饰符可以组合使用吗？',
        ['可以', '不可以', '只能用一个', '需要特殊语法'],
        0,
      ],
      ['Vue 中 v-cloak 的作用是？', ['隐藏未编译模板', '防止闪烁', 'CSS 配合使用', '以上都是'], 3],
      ['Vue 中 v-pre 指令的作用是？', ['跳过编译', '预渲染', '提前执行', '优先渲染'], 0],
      ['Vue 中 v-once 指令的作用是？', ['只渲染一次', '永久缓存', '静态优化', '以上都是'], 3],
      ['Vue 中 v-memo 指令的作用是？', ['缓存模板子树', '记忆计算结果', '缓存事件', '缓存样式'], 0],
      [
        'Vue 中 v-is 指令在 Vue 3 中的替代方案是？',
        [':is 绑定', 'v-component', 'component :is', 'v-bind:is'],
        2,
      ],
      [
        'Vue 中 v-for 的 key 可以用 index 吗？',
        ['不推荐，可能导致状态错乱', '推荐', '必须', '无所谓'],
        0,
      ],
      [
        'Vue 中 v-for 和 v-if 为什么不推荐一起用？',
        ['v-for 优先级更高，造成性能浪费', 'v-if 优先级更高', '会报错', '没有影响'],
        0,
      ],
      [
        'Vue 中 v-for 遍历对象时，参数顺序是？',
        ['value, key, index', 'key, value, index', 'index, key, value', 'value, index, key'],
        0,
      ],
      ['Vue 中 v-for 遍历数字时，从几开始？', ['1', '0', '-1', '自定义'], 0],
      ['Vue 中 v-for 的分组渲染使用什么标签？', ['template', 'div', 'span', 'fragment'], 0],
      ['Vue 中 v-model 的本质是？', ['语法糖', '双向绑定', 'props + emit', '以上都是'], 3],
      ['Vue 中 v-model 在组件上的默认 prop 是？', ['modelValue', 'value', 'data', 'input'], 0],
      [
        'Vue 中 v-model 的修饰符 .lazy 的作用是？',
        ['在 change 事件后同步', '在 input 事件后同步', '延迟 1 秒同步', '不同步'],
        0,
      ],
      [
        'Vue 中 v-model 的修饰符 .number 的作用是？',
        ['自动转换为数字', '限制输入', '格式化', '验证'],
        0,
      ],
      [
        'Vue 中 v-model 的修饰符 .trim 的作用是？',
        ['自动过滤首尾空格', '限制输入', '格式化', '验证'],
        0,
      ],
      [
        'Vue 中 v-model 在原生 input 上的实现原理是？',
        [':value + @input', ':model + @change', ':value + @change', ':model + @input'],
        0,
      ],
      [
        'Vue 中 v-model 在复选框上的绑定值是？',
        ['boolean 或数组', 'string', 'number', 'object'],
        0,
      ],
      ['Vue 中 v-model 在单选框上的绑定值是？', ['string', 'boolean', 'array', 'object'], 0],
      [
        'Vue 中 v-model 在选择框上的绑定值是？',
        ['string 或 array', 'boolean', 'number', 'object'],
        0,
      ],
      [
        'Vue 中 v-model 的自定义修饰符如何获取？',
        ['modelModifiers prop', 'modifiers 选项', 'this.$modifiers', 'useModifiers()'],
        0,
      ],
      [
        'Vue 中 v-model 的参数化使用是？',
        ['v-model:title', 'v-model.title', 'v-model="title"', 'v-model:[title]'],
        0,
      ],
      [
        'Vue 中 v-model 的多个绑定如何实现？',
        [
          'v-model:title + v-model:content',
          'v-model=[title, content]',
          'v-model="{title, content}"',
          '无法实现',
        ],
        0,
      ],
      ['Vue 中插槽的作用是？', ['内容分发', '组件通信', '状态管理', '路由管理'], 0],
      ['Vue 中默认插槽的缩写是？', ['v-slot', 'v-slot:default', '#default', 'slot'], 2],
      ['Vue 中具名插槽如何使用？', ['v-slot:name', 'v-slot="name"', 'slot=name', '#name'], 3],
      [
        'Vue 中作用域插槽的作用是？',
        ['将子组件数据传递给插槽内容', '父组件向子组件传数据', '兄弟组件通信', '全局状态管理'],
        0,
      ],
      [
        'Vue 中作用域插槽的 v-slot 如何接收数据？',
        ['v-slot="slotProps"', 'v-slot:slotProps', 'v-slot="slotProps"', '#default="slotProps"'],
        0,
      ],
      [
        'Vue 中插槽的解构赋值如何使用？',
        ['v-slot="{ user }"', 'v-slot:user', 'v-slot="user"', '#user'],
        0,
      ],
      [
        'Vue 中动态指令参数的格式是？',
        [':[argument]', '(argument)', '${argument}', '@argument'],
        0,
      ],
      [
        'Vue 中动态指令参数的限制是？',
        ['不能包含空格和引号', '只能是字符串', '不能是表达式', '无限制'],
        0,
      ],
      [
        'Vue 中指令的钩子函数 bind 在 Vue 3 中被什么替代？',
        ['beforeMount', 'mounted', 'created', 'beforeCreate'],
        0,
      ],
      [
        'Vue 中指令的钩子函数 inserted 在 Vue 3 中被什么替代？',
        ['mounted', 'beforeMount', 'created', 'updated'],
        0,
      ],
      [
        'Vue 中指令的钩子函数 update 在 Vue 3 中被什么替代？',
        ['updated', 'beforeUpdate', 'mounted', 'beforeMount'],
        0,
      ],
      [
        'Vue 中指令的钩子函数 componentUpdated 在 Vue 3 中被什么替代？',
        ['updated', 'beforeUpdate', 'mounted', 'beforeMount'],
        0,
      ],
      [
        'Vue 中指令的钩子函数 unbind 在 Vue 3 中被什么替代？',
        ['unmounted', 'beforeUnmount', 'destroyed', 'beforeDestroy'],
        0,
      ],
      [
        'Vue 中自定义指令的钩子函数参数包括？',
        [
          'el, binding, vnode, prevVnode',
          'el, binding, oldVnode',
          'el, value, oldValue',
          'el, modifiers',
        ],
        0,
      ],
      [
        'Vue 中自定义指令的 binding 对象包含什么？',
        [
          'value, oldValue, arg, modifiers',
          'value, key, arg, modifiers',
          'value, name, arg, modifiers',
          'value, expression, arg, modifiers',
        ],
        0,
      ],
      [
        'Vue 中自定义指令如何注册？',
        ['app.directive()', 'app.directive.register()', 'Vue.directive()', 'directive.use()'],
        0,
      ],
      ['Vue 中自定义指令的简写形式是？', ['函数形式', '对象形式', '类形式', '字符串形式'], 0],
      [
        'Vue 中自定义指令的简写形式在什么时候调用？',
        [
          'mounted 和 updated',
          'bind 和 update',
          'inserted 和 componentUpdated',
          'created 和 mounted',
        ],
        0,
      ],
      [
        'Vue 中自定义指令如何传递多个值？',
        ['使用对象字面量', '使用数组', '使用字符串', '无法传递'],
        0,
      ],
      [
        'Vue 中模板表达式的限制是？',
        ['只能包含单个表达式', '可以包含语句', '可以包含循环', '无限制'],
        0,
      ],
      [
        'Vue 中模板表达式的访问限制是？',
        ['不能访问全局变量', '只能访问白名单全局变量', '可以访问所有全局变量', '不能访问 window'],
        1,
      ],
      [
        'Vue 中模板表达式的白名单全局变量包括？',
        ['Math, Date', 'console, window', 'document, location', 'process, require'],
        0,
      ],
      [
        'Vue 中计算属性和方法的区别是？',
        ['计算属性基于响应式依赖缓存', '方法每次都执行', '计算属性不能传参', '以上都是'],
        3,
      ],
      ['Vue 中计算属性为什么默认是只读的？', ['避免副作用', '性能优化', '代码规范', '历史原因'], 0],
      [
        'Vue 中计算属性的 setter 如何定义？',
        ['set 函数', 'getter 返回值', 'computed.set', 'this.set()'],
        0,
      ],
      [
        'Vue 中计算属性和侦听器的区别是？',
        [
          '计算属性侧重计算，侦听器侧重副作用',
          '计算属性支持异步，侦听器不支持',
          '两者相同',
          '侦听器有缓存',
        ],
        0,
      ],
      [
        'Vue 中 Class 与 Style 绑定的特殊之处是？',
        ['支持对象和数组语法', '只能是字符串', '只能是对象', '只能是数组'],
        0,
      ],
      [
        'Vue 中条件渲染的 key 管理状态是指？',
        ['Vue 会复用元素，key 强制替换', 'key 只能用于 v-for', 'key 不影响条件渲染', '无影响'],
        0,
      ],
      [
        'Vue 中 template 标签的作用是？',
        ['不可见的包装元素', '真实 DOM 元素', '组件容器', '路由容器'],
        0,
      ],
      [
        'Vue 中列表渲染的维护状态是指？',
        ['使用 key 追踪节点身份', '使用 index 追踪', '使用 ref 追踪', '不需要追踪'],
        0,
      ],
      [
        'Vue 中数组变更方法有哪些？',
        [
          'push, pop, shift, unshift, splice, sort, reverse',
          'filter, concat, slice',
          'map, reduce, forEach',
          'find, findIndex, includes',
        ],
        0,
      ],
      [
        'Vue 中数组替换方法有哪些？',
        [
          'filter, concat, slice',
          'push, pop, shift',
          'splice, sort, reverse',
          'map, reduce, forEach',
        ],
        0,
      ],
      [
        'Vue 中直接通过索引设置数组项会响应式更新吗？',
        ['不会，需要用 splice 或 reactive', '会', '取决于数组长度', '报错'],
        0,
      ],
      [
        'Vue 中直接修改数组长度会响应式更新吗？',
        ['不会，需要用 splice', '会', '取决于数组长度', '报错'],
        0,
      ],
    ];
    const item = items[(i - 301) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第四部分：组件系统 (401-500) ====================
  for (let i = 401; i <= 500; i++) {
    const q = { id: `vue-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      ['Vue 中组件注册的方式有哪些？', ['全局注册', '局部注册', '异步注册', '以上都是'], 3],
      [
        'Vue 中全局注册组件的缺点是？',
        ['增加初始加载', '无法 tree-shaking', '命名冲突', '以上都是'],
        3,
      ],
      ['Vue 中组件名推荐使用什么格式？', ['PascalCase', 'kebab-case', 'camelCase', '都可以'], 0],
      ['Vue 中组件的 props 验证可以是？', ['类型', '验证函数', '默认值', '以上都是'], 3],
      ['Vue 中组件的 props 类型验证支持？', ['String', 'Number', '自定义构造函数', '以上都是'], 3],
      ['Vue 中组件的 props 默认值可以是？', ['值', '函数', '工厂函数', '以上都是'], 3],
      [
        'Vue 中组件的 props required 选项作用是？',
        ['标记为必填', '验证类型', '设置默认值', '转换为响应式'],
        0,
      ],
      [
        'Vue 中组件的 props validator 函数接收？',
        ['value', 'props 对象', '组件实例', '以上都是'],
        0,
      ],
      ['Vue 中组件的非 prop attributes 会？', ['自动继承', '被忽略', '需要显式声明', '报错'], 0],
      [
        'Vue 中组件的 inheritAttrs 选项作用是？',
        ['控制属性继承', '控制事件继承', '控制插槽继承', '控制样式继承'],
        0,
      ],
      [
        'Vue 中组件的 emits 选项作用是？',
        ['声明触发的事件', '注册事件', '监听事件', '销毁事件'],
        0,
      ],
      ['Vue 中组件的 emits 选项的优势是？', ['文档化', '类型推导', '验证', '以上都是'], 3],
      [
        'Vue 中组件的 v-model 参数如何声明？',
        [
          'emits: ["update:title"]',
          'props: ["title"]',
          'model: { prop: "title" }',
          'data: { title: "" }',
        ],
        0,
      ],
      [
        'Vue 中组件的模板引用如何获取？',
        [
          'ref 属性 + this.$refs',
          'id 属性 + getElementById',
          'class 属性 + querySelector',
          'name 属性 + getElementsByName',
        ],
        0,
      ],
      [
        'Vue 中组件的 provide 和 inject 的关系是？',
        ['祖先提供，后代注入', '父提供，子注入', '兄弟间通信', '任意组件间通信'],
        0,
      ],
      [
        'Vue 中组件的 provide 如何提供响应式数据？',
        ['提供 ref 或 reactive', '直接提供对象', '提供函数', '无法提供'],
        0,
      ],
      [
        'Vue 中组件的 inject 如何设置默认值？',
        ['第二参数或 default 函数', 'required 选项', 'value 选项', '无法设置'],
        0,
      ],
      ['Vue 中组件的 name 选项作用是？', ['递归组件', '调试信息', '缓存标识', '以上都是'], 3],
      ['Vue 中组件的 template 选项可以是？', ['字符串', '模板元素', '渲染函数', '以上都是'], 3],
      [
        'Vue 中组件的 data 选项为什么必须是函数？',
        ['避免多个实例共享数据', '性能优化', '代码规范', '历史原因'],
        0,
      ],
      [
        'Vue 中组件的 components 选项作用是？',
        ['注册局部组件', '注册全局组件', '注册指令', '注册过滤器'],
        0,
      ],
      [
        'Vue 中组件的 directives 选项作用是？',
        ['注册局部指令', '注册全局指令', '注册组件', '注册过滤器'],
        0,
      ],
      [
        'Vue 中组件的 mixins 选项作用是？',
        ['混入组件选项', '混合组件样式', '混合组件模板', '混合组件逻辑'],
        0,
      ],
      [
        'Vue 中组件的 extends 选项作用是？',
        ['继承另一个组件', '扩展组件功能', '混合组件选项', '注册组件'],
        0,
      ],
      [
        'Vue 中组件的 beforeCreate 钩子可以访问 this 吗？',
        ['可以，但数据未初始化', '不可以', '部分可以', '取决于配置'],
        0,
      ],
      [
        'Vue 中组件的 created 钩子可以访问 DOM 吗？',
        ['不可以', '可以', '部分可以', '取决于配置'],
        0,
      ],
      [
        'Vue 中组件的 beforeMount 钩子的作用是？',
        [
          '挂载前，模板编译完成',
          '挂载后，DOM 已渲染',
          '创建前，数据未初始化',
          '更新前，数据已改变',
        ],
        0,
      ],
      [
        'Vue 中组件的 mounted 钩子的作用是？',
        [
          '挂载后，DOM 已渲染',
          '挂载前，模板编译完成',
          '创建后，数据已初始化',
          '更新后，DOM 已更新',
        ],
        0,
      ],
      [
        'Vue 中组件的 beforeUpdate 钩子的作用是？',
        ['更新前，数据已改变', '更新后，DOM 已更新', '挂载前，模板编译完成', '卸载前，组件仍可用'],
        0,
      ],
      [
        'Vue 中组件的 updated 钩子的作用是？',
        ['更新后，DOM 已更新', '更新前，数据已改变', '挂载后，DOM 已渲染', '卸载后，组件已销毁'],
        0,
      ],
      [
        'Vue 中组件的 beforeUnmount 钩子的作用是？',
        ['卸载前，组件仍可用', '卸载后，组件已销毁', '更新前，数据已改变', '挂载前，模板编译完成'],
        0,
      ],
      [
        'Vue 中组件的 unmounted 钩子的作用是？',
        ['卸载后，组件已销毁', '卸载前，组件仍可用', '更新后，DOM 已更新', '挂载后，DOM 已渲染'],
        0,
      ],
      [
        'Vue 中组件的 errorCaptured 钩子的作用是？',
        ['捕获后代组件错误', '捕获路由错误', '捕获网络错误', '捕获全局错误'],
        0,
      ],
      [
        'Vue 中组件的 renderTracked 钩子的作用是？',
        ['追踪渲染依赖', '追踪事件', '追踪生命周期', '追踪指令'],
        0,
      ],
      [
        'Vue 中组件的 renderTriggered 钩子的作用是？',
        ['追踪渲染触发原因', '追踪事件触发', '追踪生命周期触发', '追踪指令触发'],
        0,
      ],
      [
        'Vue 中组件的 activated 钩子的作用是？',
        ['被 keep-alive 缓存的组件激活时', '组件挂载时', '组件更新时', '组件创建时'],
        0,
      ],
      [
        'Vue 中组件的 deactivated 钩子的作用是？',
        ['被 keep-alive 缓存的组件停用时', '组件卸载时', '组件销毁时', '组件更新时'],
        0,
      ],
      [
        'Vue 中组件的 serverPrefetch 钩子的作用是？',
        ['SSR 时预取数据', '客户端预取', '服务端渲染', '客户端渲染'],
        0,
      ],
      [
        'Vue 中组件的 $forceUpdate 方法作用是？',
        ['强制重新渲染', '强制更新数据', '强制更新 DOM', '强制更新计算属性'],
        0,
      ],
      [
        'Vue 中组件的 $nextTick 方法作用是？',
        ['等待 DOM 更新后执行', '延迟执行', '异步执行', '立即执行'],
        0,
      ],
      ['Vue 中组件的 $emit 方法作用是？', ['触发事件', '监听事件', '注册事件', '销毁事件'], 0],
      ['Vue 中组件的 $attrs 对象包含什么？', ['非 prop 属性', 'prop 属性', '事件', '插槽'], 0],
      [
        'Vue 中组件的 $listeners 对象在 Vue 3 中被？',
        ['合并到 $attrs', '移除', '保留不变', '重命名'],
        0,
      ],
      ['Vue 中组件的 $slots 对象包含什么？', ['插槽内容', '组件内容', '模板内容', '渲染内容'], 0],
      [
        'Vue 中组件的 $el 属性指向什么？',
        ['组件根 DOM 元素', '组件 VNode', '组件模板', '组件实例'],
        0,
      ],
      ['Vue 中组件的 $options 对象包含什么？', ['组件选项', '组件实例', '组件数据', '组件方法'], 0],
      [
        'Vue 中组件的 $parent 属性指向什么？',
        ['父组件实例', '根组件实例', '子组件实例', '兄弟组件实例'],
        0,
      ],
      [
        'Vue 中组件的 $root 属性指向什么？',
        ['根组件实例', '父组件实例', '子组件实例', '兄弟组件实例'],
        0,
      ],
      [
        'Vue 中组件的 $children 属性在 Vue 3 中被？',
        ['移除', '保留不变', '重命名', '合并到 $refs'],
        0,
      ],
      ['Vue 中组件的 $refs 对象包含什么？', ['模板引用', 'DOM 元素', '组件实例', '以上都是'], 3],
      [
        'Vue 中组件的 $watch 方法作用是？',
        ['观察数据变化', '创建计算属性', '触发事件', '监听路由'],
        0,
      ],
    ];
    const item = items[(i - 401) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第五部分：路由 (501-600) ====================
  for (let i = 501; i <= 600; i++) {
    const q = { id: `vue-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      ['Vue Router 中路由模式有？', ['hash', 'history', 'memory', '以上都是'], 3],
      [
        'Vue Router 中 hash 模式的特点是？',
        ['URL 带 #', '兼容性好', '不需要服务器配置', '以上都是'],
        3,
      ],
      [
        'Vue Router 中 history 模式的特点是？',
        ['URL 美观', '需要服务器配置', '支持 HTML5 History API', '以上都是'],
        3,
      ],
      ['Vue Router 中动态路由参数使用？', [':id', '{id}', '<id>', '[id]'], 0],
      [
        'Vue Router 中嵌套路由使用？',
        ['children 配置', 'nested 配置', 'sub 配置', '以上都不对'],
        0,
      ],
      ['Vue Router 中命名路由的作用是？', ['简化导航', '代码更清晰', '避免硬编码', '以上都是'], 3],
      [
        'Vue Router 中命名视图的作用是？',
        ['同时显示多个视图', '命名路由', '嵌套路由', '动态路由'],
        0,
      ],
      [
        'Vue Router 中重定向使用？',
        ['redirect 配置', 'alias 配置', 'forward 配置', '以上都不对'],
        0,
      ],
      [
        'Vue Router 中 alias 和 redirect 的区别是？',
        ['alias 保留 URL', 'redirect 改变 URL', 'alias 改变 URL', 'redirect 保留 URL'],
        1,
      ],
      ['Vue Router 中导航守卫的类型有？', ['全局', '路由独享', '组件内', '以上都是'], 3],
      [
        'Vue Router 中全局前置守卫是？',
        ['beforeEach', 'beforeResolve', 'afterEach', 'onRouteChange'],
        0,
      ],
      [
        'Vue Router 中全局解析守卫是？',
        ['beforeResolve', 'beforeEach', 'afterEach', 'onRouteChange'],
        0,
      ],
      [
        'Vue Router 中全局后置钩子是？',
        ['afterEach', 'beforeEach', 'beforeResolve', 'onRouteChange'],
        0,
      ],
      [
        'Vue Router 中路由独享守卫是？',
        ['beforeEnter', 'beforeRouteEnter', 'beforeRouteUpdate', 'beforeRouteLeave'],
        0,
      ],
      [
        'Vue Router 中组件内守卫有？',
        [
          'beforeRouteEnter, beforeRouteUpdate, beforeRouteLeave',
          'beforeEnter, beforeUpdate, beforeLeave',
          'onEnter, onUpdate, onLeave',
          'routeEnter, routeUpdate, routeLeave',
        ],
        0,
      ],
      [
        'Vue Router 中 beforeRouteEnter 守卫能访问 this 吗？',
        ['不能，使用 next(vm => {}) 访问', '能', '有时能', '取决于配置'],
        0,
      ],
      ['Vue Router 中路由懒加载使用？', ['() => import()', 'import()', 'require()', 'load()'], 0],
      [
        'Vue Router 中路由懒加载的魔法注释是？',
        [
          '/* webpackChunkName: "about" */',
          '// webpackChunkName: "about"',
          '<!-- webpackChunkName: "about" -->',
          '/* chunkName: "about" */',
        ],
        0,
      ],
      [
        'Vue Router 中 router-link 的 tag 属性在 Vue 3 中被什么替代？',
        ['custom', 'is', 'as', 'element'],
        0,
      ],
      [
        'Vue Router 中 router-link 的 active-class 作用是？',
        ['设置活跃链接类名', '设置非活跃类名', '设置过渡类名', '设置动画类名'],
        0,
      ],
      [
        'Vue Router 中 router-link 的 exact-active-class 作用是？',
        ['设置精确活跃链接类名', '设置活跃类名', '设置非活跃类名', '设置过渡类名'],
        0,
      ],
      [
        'Vue Router 中 router-view 的作用是？',
        ['显示匹配的组件', '链接路由', '导航守卫', '路由配置'],
        0,
      ],
      [
        'Vue Router 中 router.addRoute 的作用是？',
        ['动态添加路由', '删除路由', '修改路由', '查询路由'],
        0,
      ],
      [
        'Vue Router 中 router.removeRoute 的作用是？',
        ['动态删除路由', '添加路由', '修改路由', '查询路由'],
        0,
      ],
      [
        'Vue Router 中 router.hasRoute 的作用是？',
        ['检查路由是否存在', '添加路由', '删除路由', '修改路由'],
        0,
      ],
      [
        'Vue Router 中 router.getRoutes 的作用是？',
        ['获取所有路由记录', '添加路由', '删除路由', '修改路由'],
        0,
      ],
      [
        'Vue Router 中 useRoute 的作用是？',
        ['获取当前路由信息', '获取路由器实例', '导航到新路由', '添加路由'],
        0,
      ],
      [
        'Vue Router 中 useRouter 的作用是？',
        ['获取路由器实例', '获取当前路由信息', '添加路由', '删除路由'],
        0,
      ],
      [
        'Vue Router 中 route.params 的作用是？',
        ['获取动态路由参数', '获取查询参数', '获取哈希值', '获取路径'],
        0,
      ],
      [
        'Vue Router 中 route.query 的作用是？',
        ['获取查询参数', '获取动态路由参数', '获取哈希值', '获取路径'],
        0,
      ],
      [
        'Vue Router 中 route.hash 的作用是？',
        ['获取哈希值', '获取查询参数', '获取动态路由参数', '获取路径'],
        0,
      ],
      [
        'Vue Router 中 route.fullPath 的作用是？',
        ['获取完整路径', '获取路径', '获取查询参数', '获取哈希值'],
        0,
      ],
      [
        'Vue Router 中 route.name 的作用是？',
        ['获取路由名称', '获取路由路径', '获取路由参数', '获取路由组件'],
        0,
      ],
      [
        'Vue Router 中 route.meta 的作用是？',
        ['获取路由元信息', '获取路由名称', '获取路由路径', '获取路由参数'],
        0,
      ],
      [
        'Vue Router 中 route.matched 的作用是？',
        ['获取匹配的路由记录', '获取路由名称', '获取路由路径', '获取路由参数'],
        0,
      ],
      [
        'Vue Router 中 route.redirectedFrom 的作用是？',
        ['获取重定向来源', '获取路由名称', '获取路由路径', '获取路由参数'],
        0,
      ],
      [
        'Vue Router 中 router.push 的作用是？',
        ['导航到新路由', '替换当前路由', '后退一步', '前进一步'],
        0,
      ],
      [
        'Vue Router 中 router.replace 的作用是？',
        ['替换当前路由', '导航到新路由', '后退一步', '前进一步'],
        1,
      ],
      [
        'Vue Router 中 router.go 的作用是？',
        ['前进或后退指定步数', '导航到新路由', '替换当前路由', '刷新路由'],
        0,
      ],
      [
        'Vue Router 中 router.back 的作用是？',
        ['后退一步', '前进一步', '导航到新路由', '替换当前路由'],
        0,
      ],
      [
        'Vue Router 中 router.forward 的作用是？',
        ['前进一步', '后退一步', '导航到新路由', '替换当前路由'],
        0,
      ],
      [
        'Vue Router 中 router.beforeEach 的参数是？',
        ['to, from, next', 'to, from', 'from, to, next', 'next, to, from'],
        0,
      ],
      ['Vue Router 中 next 函数的作用是？', ['确认导航', '取消导航', '重定向', '以上都是'], 3],
      ['Vue Router 中 next(false) 的作用是？', ['取消导航', '确认导航', '重定向', '报错'], 0],
      ['Vue Router 中 next("/") 的作用是？', ['重定向到 "/"', '取消导航', '确认导航', '报错'], 0],
      ['Vue Router 中 next(error) 的作用是？', ['导航失败', '确认导航', '取消导航', '重定向'], 0],
      [
        'Vue Router 中滚动行为的作用是？',
        ['控制路由切换时的滚动位置', '控制页面缩放', '控制动画效果', '控制过渡效果'],
        0,
      ],
      [
        'Vue Router 中滚动行为函数的返回值可以是？',
        ['位置对象', 'Promise', 'falsy 值', '以上都是'],
        3,
      ],
      [
        'Vue Router 中滚动行为的 savedPosition 参数作用是？',
        ['获取前进/后退时的历史位置', '获取当前滚动位置', '获取目标滚动位置', '获取默认滚动位置'],
        0,
      ],
      [
        'Vue Router 中路由元信息的作用是？',
        ['附加自定义数据', '验证权限', '控制过渡', '以上都是'],
        3,
      ],
      [
        'Vue Router 中路由匹配优先级规则是？',
        ['路由定义越具体优先级越高', '定义顺序优先', '动态路由优先', '静态路由优先'],
        0,
      ],
      ['Vue Router 中捕获所有路由使用？', ['/:pathMatch(.*)*', '/*', '/**', '/:all'], 0],
      ['Vue Router 中 404 路由应该放在什么位置？', ['最后', '最前', '中间', '任意位置'], 0],
      ['Vue Router 中高阶路由配置包括？', ['路由守卫', '路由懒加载', '滚动行为', '以上都是'], 3],
      [
        'Vue Router 中路由过渡动画如何实现？',
        [
          '<transition> 包裹 <router-view>',
          'router.transition',
          'route.meta.transition',
          'router.config.transition',
        ],
        0,
      ],
      [
        'Vue Router 中路由数据预取的方式有？',
        ['导航守卫获取', '组件内获取', '路由解析器', '以上都是'],
        3,
      ],
      ['Vue Router 中导航故障的类型有？', ['重复导航', '中止导航', '取消导航', '以上都是'], 3],
      [
        'Vue Router 中 isNavigationFailure 的作用是？',
        ['判断是否为导航故障', '创建导航故障', '解决导航故障', '忽略导航故障'],
        0,
      ],
      [
        'Vue Router 中 NavigationFailureType 的值有？',
        [
          'cancelled, duplicated, aborted',
          'error, warning, info',
          'pending, resolved, rejected',
          'start, progress, end',
        ],
        0,
      ],
      [
        'Vue Router 中动态路由删除后对已导航的影响是？',
        ['已匹配的仍可用', '立即失效', '报错', '刷新后失效'],
        0,
      ],
      [
        'Vue Router 中路由的 path-to-regexp 选项作用是？',
        ['自定义路由匹配规则', '正则验证', '路径转换', '编码解码'],
        0,
      ],
      [
        'Vue Router 中路由的 sensitive 选项作用是？',
        ['区分大小写匹配', '敏感信息保护', '精确匹配', '模糊匹配'],
        0,
      ],
      [
        'Vue Router 中路由的 strict 选项作用是？',
        ['严格匹配尾部斜杠', '严格模式', '类型检查', '安全验证'],
        0,
      ],
      ['Vue Router 中路由的 encode 选项作用是？', ['自定义编码', '加密', '压缩', '序列化'], 0],
      [
        'Vue Router 中路由的 end 选项作用是？',
        ['是否允许路径后有额外字符', '结束标志', '终止条件', '超时时间'],
        0,
      ],
    ];
    const item = items[(i - 501) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第六部分：状态管理 (601-700) ====================
  for (let i = 601; i <= 700; i++) {
    const q = { id: `vue-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'Pinia 中定义 store 的方式是？',
        ['defineStore', 'createStore', 'useStore', '以上都可以'],
        0,
      ],
      ['Pinia 中 state 的特点是？', ['完全响应式', '需要手动追踪', '不可变', '以上都不对'], 0],
      ['Pinia 中 getters 的特点是？', ['类似 computed', '支持缓存', '可以接收参数', '以上都是'], 3],
      [
        'Pinia 中 actions 的特点是？',
        ['支持异步', '可以修改 state', '可以调用其他 actions', '以上都是'],
        3,
      ],
      ['Pinia 中 store 的订阅方式是？', ['$subscribe', 'watch', 'computed', '以上都可以'], 0],
      [
        'Pinia 中 store 的 action 订阅方式是？',
        ['$onAction', 'watch', 'computed', '以上都可以'],
        0,
      ],
      [
        'Pinia 中 store 的插件可以？',
        ['添加新属性', '添加新方法', '修改现有方法', '以上都可以'],
        3,
      ],
      ['Pinia 中 store 的命名空间是？', ['自动管理', '手动配置', '不需要', '以上都不对'], 0],
      ['Pinia 中 store 的持久化方案是？', ['插件实现', '内置功能', '不需要', '以上都不对'], 0],
      ['Pinia 中 store 的 TypeScript 支持是？', ['完整支持', '部分支持', '不支持', '需要配置'], 0],
      [
        'Pinia 中 defineStore 的第一个参数是？',
        ['store 的唯一 ID', 'state', 'getters', 'actions'],
        0,
      ],
      [
        'Pinia 中 defineStore 的第二个参数是？',
        ['setup 函数或 options 对象', 'state', 'getters', 'actions'],
        0,
      ],
      [
        'Pinia 中 Options Store 的选项包括？',
        [
          'state, getters, actions',
          'data, computed, methods',
          'state, actions, mutations',
          'data, methods, watchers',
        ],
        0,
      ],
      [
        'Pinia 中 Setup Store 的返回值包括？',
        [
          'ref, computed, function',
          'state, getters, actions',
          'data, computed, methods',
          'reactive, watch, function',
        ],
        0,
      ],
      [
        'Pinia 中 Setup Store 的 ref 相当于 Options Store 的？',
        ['state', 'getters', 'actions', 'mutations'],
        0,
      ],
      [
        'Pinia 中 Setup Store 的 computed 相当于 Options Store 的？',
        ['getters', 'state', 'actions', 'mutations'],
        0,
      ],
      [
        'Pinia 中 Setup Store 的 function 相当于 Options Store 的？',
        ['actions', 'state', 'getters', 'mutations'],
        0,
      ],
      [
        'Pinia 中如何重置 state？',
        ['store.$reset()', 'store.reset()', 'store.state = {}', 'store.$clear()'],
        0,
      ],
      [
        'Pinia 中如何批量修改 state？',
        ['store.$patch()', 'store.$update()', 'store.$set()', 'store.$assign()'],
        0,
      ],
      ['Pinia 中 $patch 的参数可以是？', ['对象或函数', '只能是对象', '只能是函数', '字符串'], 0],
      [
        'Pinia 中如何替换整个 state？',
        ['store.$state = {}', 'store.state = {}', 'store.$replace()', 'store.$reset()'],
        0,
      ],
      [
        'Pinia 中如何订阅 state 变化？',
        ['store.$subscribe()', 'store.$watch()', 'store.$on()', 'store.$observe()'],
        0,
      ],
      [
        'Pinia 中 $subscribe 的 mutation 参数包含？',
        [
          'type, storeName, payload',
          'event, data, target',
          'action, state, result',
          'key, oldValue, newValue',
        ],
        0,
      ],
      [
        'Pinia 中如何订阅 action 执行？',
        ['store.$onAction()', 'store.$subscribe()', 'store.$watch()', 'store.$listen()'],
        0,
      ],
      [
        'Pinia 中 $onAction 的 after 回调何时执行？',
        ['action 成功后', 'action 执行前', 'action 失败后', 'action 完成后'],
        0,
      ],
      [
        'Pinia 中 $onAction 的 onError 回调何时执行？',
        ['action 抛出错误时', 'action 成功后', 'action 执行前', 'action 完成后'],
        0,
      ],
      [
        'Pinia 中如何销毁 store？',
        ['store.$dispose()', 'store.$destroy()', 'store.$remove()', 'store.$delete()'],
        0,
      ],
      [
        'Pinia 中如何获取其他 store？',
        ['直接 useXxxStore()', 'store.$get()', 'store.$find()', 'store.$fetch()'],
        0,
      ],
      [
        'Pinia 中如何在 action 中调用其他 action？',
        ['this.action()', 'store.action()', 'dispatch()', 'commit()'],
        0,
      ],
      [
        'Pinia 中如何在 action 中访问 getters？',
        ['this.getter', 'store.getter', 'getGetter()', 'computed()'],
        0,
      ],
      [
        'Pinia 中如何在组件外使用 store？',
        ['useXxxStore()', 'store.$getInstance()', 'getStore()', 'Pinia.store'],
        0,
      ],
      [
        'Pinia 中如何在 SSR 中使用 store？',
        ['使用函数式 store', '直接使用', '不需要特殊处理', '使用插件'],
        0,
      ],
      ['Pinia 中插件的 install 函数接收？', ['context 对象', 'app', 'options', 'store'], 0],
      [
        'Pinia 中插件的 context 对象包含？',
        [
          'pinia, app, store, options',
          'app, router, store',
          'state, getters, actions',
          'store, mutation, state',
        ],
        0,
      ],
      [
        'Pinia 中插件的 store.$onAction 何时调用？',
        ['action 执行时', 'state 变化时', 'getter 计算时', 'store 销毁时'],
        0,
      ],
      [
        'Pinia 中插件的 store.$subscribe 何时调用？',
        ['state 变化时', 'action 执行时', 'getter 计算时', 'store 销毁时'],
        0,
      ],
      [
        'Pinia 中 mapState 辅助函数的作用是？',
        [
          '映射 state 到计算属性',
          '映射 actions 到方法',
          '映射 getters 到计算属性',
          '映射 store 到组件',
        ],
        0,
      ],
      [
        'Pinia 中 mapActions 辅助函数的作用是？',
        [
          '映射 actions 到方法',
          '映射 state 到计算属性',
          '映射 getters 到计算属性',
          '映射 store 到组件',
        ],
        0,
      ],
      [
        'Pinia 中 mapStores 辅助函数的作用是？',
        [
          '映射所有 store 到计算属性',
          '映射 state 到计算属性',
          '映射 actions 到方法',
          '映射 getters 到计算属性',
        ],
        0,
      ],
      [
        'Pinia 中 storeToRefs 的作用是？',
        ['解构 store 保持响应性', '解构 state', '解构 actions', '解构 getters'],
        0,
      ],
      [
        'Pinia 中为什么不推荐直接解构 store？',
        ['会丢失响应性', '会报错', '会丢失方法', '会丢失 getters'],
        0,
      ],
      [
        'Pinia 中 createPinia 的作用是？',
        ['创建 Pinia 实例', '创建 store', '创建插件', '创建状态'],
        0,
      ],
      [
        'Pinia 中 app.use(pinia) 的作用是？',
        ['注册 Pinia', '创建 store', '使用插件', '注入状态'],
        0,
      ],
      [
        'Pinia 中 store 的 $id 属性作用是？',
        ['获取 store ID', '设置 store ID', '删除 store ID', '更新 store ID'],
        0,
      ],
      [
        'Pinia 中 store 的 $pinia 属性作用是？',
        ['获取 pinia 实例', '获取 app 实例', '获取 router 实例', '获取 store 实例'],
        0,
      ],
      [
        'Pinia 中 getters 之间如何互相访问？',
        ['this.getter', 'store.getter', 'getGetter()', 'computed()'],
        0,
      ],
      [
        'Pinia 中 getters 如何返回函数？',
        ['返回函数即可', '不支持', '需要特殊语法', '使用 actions'],
        0,
      ],
      ['Pinia 中 actions 能否是异步的？', ['能', '不能', '只能同步', '取决于配置'], 0],
      ['Pinia 中 mutations 是否存在？', ['不存在', '存在', '可选', '被 actions 替代'], 0],
      [
        'Pinia 相比 Vuex 的优势是？',
        ['无 mutations', '完整 TypeScript 支持', '更轻量', '以上都是'],
        3,
      ],
      [
        'Pinia 中如何组合多个 store？',
        ['在 action 中调用其他 store', '使用 mixins', '使用 extends', '使用 plugins'],
        0,
      ],
      ['Pinia 中如何测试 actions？', ['直接调用并断言', '需要 mock', '无法测试', '需要插件'], 0],
      ['Pinia 中如何测试 getters？', ['直接访问并断言', '需要 mock', '无法测试', '需要插件'], 0],
      [
        'Pinia 中如何在插件中添加状态？',
        ['store.$state = {}', 'store.newProp = value', 'store.$patch()', 'store.$add()'],
        1,
      ],
      [
        'Pinia 中如何在插件中重置新增状态？',
        ['在 reset 函数中处理', '自动重置', '无法重置', '手动删除'],
        0,
      ],
      [
        'Pinia 中 store 的热更新如何实现？',
        ['useXxxStore(hot)', 'store.$hot()', 'store.$update()', '自动支持'],
        0,
      ],
      ['Pinia 中如何使用 DevTools？', ['自动集成', '需要配置', '不支持', '需要插件'], 0],
      [
        'Pinia 中如何实现时间旅行？',
        ['DevTools 内置支持', '需要插件', '不支持', '需要手动实现'],
        0,
      ],
      [
        'Pinia 中 $patch 函数式修改的优势是？',
        ['批量修改，性能更好', '支持异步', '支持链式调用', '更安全'],
        0,
      ],
      [
        'Pinia 中如何监听特定 state 变化？',
        ['watch(store.$state, ...)', 'store.$subscribe()', 'store.$watch()', 'computed()'],
        0,
      ],
      [
        'Pinia 中如何持久化特定 state？',
        ['在插件中过滤', '全部持久化', '无法指定', '使用 localStorage'],
        0,
      ],
      [
        'Pinia 中如何处理表单验证？',
        ['在 actions 中验证', '使用 getters', '使用插件', '在组件中验证'],
        0,
      ],
      [
        'Pinia 中如何处理 API 请求？',
        ['在 actions 中请求', '在 getters 中请求', '在 state 中请求', '在插件中请求'],
        0,
      ],
      [
        'Pinia 中如何处理错误？',
        ['在 actions 中 try/catch', '在 getters 中处理', '在 state 中处理', '在插件中处理'],
        0,
      ],
      [
        'Pinia 中如何实现乐观更新？',
        ['先更新 state，失败回滚', '先请求，成功更新', '无法实现', '使用插件'],
        0,
      ],
      [
        'Pinia 中如何实现撤销重做？',
        ['使用插件或自定义逻辑', '内置支持', '无法实现', '使用 mutations'],
        0,
      ],
      [
        'Pinia 中如何实现全局状态？',
        ['创建全局 store', '使用 provide/inject', '使用 Vuex', '使用 localStorage'],
        0,
      ],
      [
        'Pinia 中如何实现模块化？',
        ['多个 store 文件', 'modules 选项', 'namespaced 选项', '自动模块化'],
        0,
      ],
      [
        'Pinia 中如何使用 Composition API？',
        ['setup 语法', 'mapState', 'mapActions', 'mapStores'],
        0,
      ],
      [
        'Pinia 中如何使用 Options API？',
        ['mapState, mapActions', 'setup 语法', 'useStore', 'defineStore'],
        0,
      ],
      [
        'Pinia 中 store 的生命周期是？',
        ['与组件无关，全局单例', '与组件相同', '随组件创建销毁', '手动管理'],
        0,
      ],
      ['Pinia 中如何处理循环依赖？', ['延迟导入 store', '无法处理', '合并 store', '删除依赖'], 0],
      [
        'Pinia 中如何实现权限控制？',
        ['在路由守卫中检查 store', '在 store 中检查', '在组件中检查', '以上都可以'],
        3,
      ],
      [
        'Pinia 中如何实现国际化？',
        ['创建 i18n store', '使用插件', '在 getters 中处理', '在 actions 中处理'],
        0,
      ],
      [
        'Pinia 中如何实现主题切换？',
        ['创建 theme store', '使用 CSS 变量', '使用插件', '以上都可以'],
        3,
      ],
      [
        'Pinia 中如何实现缓存？',
        ['在 state 中缓存', '使用 localStorage', '使用 sessionStorage', '以上都可以'],
        3,
      ],
      [
        'Pinia 中如何实现分页？',
        ['创建分页 store', '在 actions 中处理', '在 getters 中处理', '以上都可以'],
        0,
      ],
      [
        'Pinia 中如何实现搜索过滤？',
        ['在 getters 中处理', '在 actions 中处理', '在 state 中处理', '在插件中处理'],
        0,
      ],
      [
        'Pinia 中如何实现排序？',
        ['在 getters 中处理', '在 actions 中处理', '在 state 中处理', '在插件中处理'],
        0,
      ],
      [
        'Pinia 中如何实现 WebSocket？',
        ['在 actions 中管理', '在 getters 中管理', '在 state 中管理', '在插件中管理'],
        0,
      ],
      [
        'Pinia 中如何实现定时器？',
        ['在 actions 中管理', '在 getters 中管理', '在 state 中管理', '在插件中管理'],
        0,
      ],
      [
        'Pinia 中如何实现文件上传？',
        ['在 actions 中处理', '在 getters 中处理', '在 state 中处理', '在插件中处理'],
        0,
      ],
      [
        'Pinia 中如何实现数据加密？',
        ['在插件中处理', '在 actions 中处理', '在 getters 中处理', '在 state 中处理'],
        0,
      ],
      [
        'Pinia 中如何实现数据转换？',
        ['在 getters 中处理', '在 actions 中处理', '在 state 中处理', '在插件中处理'],
        0,
      ],
      [
        'Pinia 中如何实现数据验证？',
        ['在 actions 中处理', '在 getters 中处理', '在 state 中处理', '在插件中处理'],
        0,
      ],
      [
        'Pinia 中如何实现数据格式化？',
        ['在 getters 中处理', '在 actions 中处理', '在 state 中处理', '在插件中处理'],
        0,
      ],
      [
        'Pinia 中如何实现数据脱敏？',
        ['在 getters 中处理', '在 actions 中处理', '在 state 中处理', '在插件中处理'],
        0,
      ],
      [
        'Pinia 中如何实现数据聚合？',
        ['在 getters 中处理', '在 actions 中处理', '在 state 中处理', '在插件中处理'],
        0,
      ],
      [
        'Pinia 中如何实现数据分组？',
        ['在 getters 中处理', '在 actions 中处理', '在 state 中处理', '在插件中处理'],
        0,
      ],
      [
        'Pinia 中如何实现数据统计？',
        ['在 getters 中处理', '在 actions 中处理', '在 state 中处理', '在插件中处理'],
        0,
      ],
      [
        'Pinia 中如何实现数据对比？',
        ['在 getters 中处理', '在 actions 中处理', '在 state 中处理', '在插件中处理'],
        0,
      ],
      [
        'Pinia 中如何实现数据同步？',
        ['在 actions 中处理', '在 getters 中处理', '在 state 中处理', '在插件中处理'],
        0,
      ],
      [
        'Pinia 中如何实现数据迁移？',
        ['在插件中处理', '在 actions 中处理', '在 getters 中处理', '在 state 中处理'],
        0,
      ],
      [
        'Pinia 中如何实现数据备份？',
        ['在插件中处理', '在 actions 中处理', '在 getters 中处理', '在 state 中处理'],
        0,
      ],
      [
        'Pinia 中如何实现数据恢复？',
        ['在插件中处理', '在 actions 中处理', '在 getters 中处理', '在 state 中处理'],
        0,
      ],
      [
        'Pinia 中如何实现数据清理？',
        ['在 actions 中处理', '在 getters 中处理', '在 state 中处理', '在插件中处理'],
        0,
      ],
      [
        'Pinia 中如何实现数据压缩？',
        ['在插件中处理', '在 actions 中处理', '在 getters 中处理', '在 state 中处理'],
        0,
      ],
      [
        'Pinia 中如何实现数据解压？',
        ['在插件中处理', '在 actions 中处理', '在 getters 中处理', '在 state 中处理'],
        0,
      ],
      [
        'Pinia 中如何实现数据序列化？',
        ['在插件中处理', '在 actions 中处理', '在 getters 中处理', '在 state 中处理'],
        0,
      ],
      [
        'Pinia 中如何实现数据反序列化？',
        ['在插件中处理', '在 actions 中处理', '在 getters 中处理', '在 state 中处理'],
        0,
      ],
      [
        'Pinia 中如何实现数据校验？',
        ['在插件中处理', '在 actions 中处理', '在 getters 中处理', '在 state 中处理'],
        0,
      ],
      [
        'Pinia 中如何实现数据合并？',
        ['在 actions 中处理', '在 getters 中处理', '在 state 中处理', '在插件中处理'],
        0,
      ],
    ];
    const item = items[(i - 601) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第七部分：过渡与动画 (701-800) ====================
  for (let i = 701; i <= 800; i++) {
    const q = { id: `vue-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'Vue 中 transition 组件的作用是？',
        ['处理单个元素过渡', '处理列表过渡', '处理组件过渡', '以上都是'],
        0,
      ],
      [
        'Vue 中 transition-group 组件的作用是？',
        ['处理列表过渡', '处理单个元素过渡', '处理组件过渡', '以上都是'],
        0,
      ],
      [
        'Vue 中过渡的类名有？',
        [
          'v-enter-from, v-enter-active, v-enter-to',
          'v-appear, v-appear-active, v-appear-to',
          'v-leave-from, v-leave-active, v-leave-to',
          '以上都是',
        ],
        3,
      ],
      [
        'Vue 中过渡的 JavaScript 钩子有？',
        [
          'before-enter, enter, after-enter',
          'before-leave, leave, after-leave',
          'before-appear, appear, after-appear',
          '以上都是',
        ],
        3,
      ],
      [
        'Vue 中过渡的 mode 属性有？',
        ['in-out, out-in', 'in, out', 'before, after', 'sync, async'],
        0,
      ],
      [
        'Vue 中过渡的 appear 属性作用是？',
        ['初始渲染时过渡', '进入时过渡', '离开时过渡', '以上都不对'],
        0,
      ],
      [
        'Vue 中过渡的 CSS 过渡和动画区别是？',
        ['transition 需要触发条件', 'animation 自动执行', '两者相同', '以上都不对'],
        0,
      ],
      [
        'Vue 中过渡的 duration 属性作用是？',
        ['指定过渡时间', '指定延迟时间', '指定动画时间', '以上都不对'],
        0,
      ],
      [
        'Vue 中列表过渡的 FLIP 技术是指？',
        ['First, Last, Invert, Play', '动画优化技术', '布局动画', '以上都是'],
        3,
      ],
      ['Vue 中状态过渡的实现方式是？', ['watch + gsap', 'computed', 'transition', '以上都不对'], 0],
      [
        'Vue 中 transition 的 name 属性作用是？',
        ['自定义类名前缀', '标识过渡', '动画名称', '组件名称'],
        0,
      ],
      [
        'Vue 中 transition 的 css 属性设为 false 的作用是？',
        ['跳过 CSS 检测', '禁用过渡', '启用过渡', '使用 JavaScript'],
        0,
      ],
      [
        'Vue 中 transition 的 type 属性作用是？',
        ['指定检测 transition 或 animation', '指定过渡类型', '指定动画类型', '指定组件类型'],
        0,
      ],
      [
        'Vue 中 transition-group 的 tag 属性作用是？',
        ['指定渲染的标签', '指定过渡类型', '指定动画类型', '指定组件'],
        0,
      ],
      [
        'Vue 中 transition-group 的 move-class 属性作用是？',
        ['自定义移动过渡类名', '自定义进入类名', '自定义离开类名', '自定义动画类名'],
        0,
      ],
      [
        'Vue 中 transition-group 的子元素必须有什么？',
        ['key 属性', 'id 属性', 'class 属性', 'style 属性'],
        0,
      ],
      [
        'Vue 中过渡的 enter-from 类名何时添加？',
        ['元素插入前', '元素插入后', '元素更新前', '元素更新后'],
        0,
      ],
      [
        'Vue 中过渡的 enter-active 类名何时存在？',
        ['进入过渡整个阶段', '进入过渡开始', '进入过渡结束', '离开过渡阶段'],
        0,
      ],
      [
        'Vue 中过渡的 enter-to 类名何时添加？',
        ['进入过渡结束后', '进入过渡开始前', '进入过渡进行中', '离开过渡阶段'],
        0,
      ],
      [
        'Vue 中过渡的 leave-from 类名何时添加？',
        ['离开过渡开始时', '离开过渡结束时', '进入过渡开始时', '进入过渡结束时'],
        0,
      ],
      [
        'Vue 中过渡的 leave-active 类名何时存在？',
        ['离开过渡整个阶段', '离开过渡开始', '离开过渡结束', '进入过渡阶段'],
        0,
      ],
      [
        'Vue 中过渡的 leave-to 类名何时添加？',
        ['离开过渡结束后', '离开过渡开始前', '离开过渡进行中', '进入过渡阶段'],
        0,
      ],
      ['Vue 中过渡的类名前缀如何自定义？', ['name 属性', 'class 属性', 'type 属性', 'tag 属性'], 0],
      [
        'Vue 中过渡的 enter 钩子何时调用？',
        ['元素插入后', '元素插入前', '元素更新后', '元素更新前'],
        0,
      ],
      [
        'Vue 中过渡的 leave 钩子何时调用？',
        ['离开过渡触发时', '离开过渡结束后', '进入过渡触发时', '进入过渡结束后'],
        0,
      ],
      [
        'Vue 中过渡的 after-enter 钩子何时调用？',
        ['进入过渡结束后', '进入过渡触发时', '离开过渡结束后', '离开过渡触发时'],
        0,
      ],
      [
        'Vue 中过渡的 after-leave 钩子何时调用？',
        ['离开过渡结束后', '离开过渡触发时', '进入过渡结束后', '进入过渡触发时'],
        0,
      ],
      [
        'Vue 中过渡的 enter-cancelled 钩子何时调用？',
        ['进入过渡被取消时', '进入过渡结束后', '离开过渡被取消时', '离开过渡结束后'],
        0,
      ],
      [
        'Vue 中过渡的 leave-cancelled 钩子何时调用？',
        ['离开过渡被取消时', '离开过渡结束后', '进入过渡被取消时', '进入过渡结束后'],
        0,
      ],
      ['Vue 中过渡的 appear 钩子何时调用？', ['初始渲染时', '进入时', '离开时', '更新时'], 0],
      [
        'Vue 中过渡的 appear-from 类名何时添加？',
        ['初始渲染前', '初始渲染后', '进入前', '离开前'],
        0,
      ],
      [
        'Vue 中过渡的 appear-active 类名何时存在？',
        ['初始渲染过渡整个阶段', '初始渲染前', '初始渲染后', '进入过渡阶段'],
        0,
      ],
      [
        'Vue 中过渡的 appear-to 类名何时添加？',
        ['初始渲染过渡结束后', '初始渲染前', '初始渲染后', '进入过渡阶段'],
        0,
      ],
      [
        'Vue 中过渡的 mode 设为 out-in 的效果是？',
        ['当前过渡先离开，新过渡后进入', '新过渡先进入，当前过渡后离开', '同时进行', '以上都不对'],
        0,
      ],
      [
        'Vue 中过渡的 mode 设为 in-out 的效果是？',
        ['新过渡先进入，当前过渡后离开', '当前过渡先离开，新过渡后进入', '同时进行', '以上都不对'],
        0,
      ],
      ['Vue 中过渡的 mode 默认值是？', ['同时进行', 'out-in', 'in-out', 'none'], 0],
      [
        'Vue 中过渡的 duration 设为对象的作用是？',
        ['分别指定进入和离开时间', '指定总时间', '指定延迟时间', '指定动画时间'],
        0,
      ],
      [
        'Vue 中过渡的 duration: { enter: 500, leave: 300 } 表示？',
        ['进入 500ms，离开 300ms', '进入 300ms，离开 500ms', '总时间 500ms', '延迟 300ms'],
        0,
      ],
      [
        'Vue 中过渡的 CSS 动画和 CSS 过渡的区别是？',
        ['动画自动播放，过渡需要触发', '过渡自动播放，动画需要触发', '两者相同', '以上都不对'],
        0,
      ],
      [
        'Vue 中过渡的 type 设为 animation 的作用是？',
        ['只检测 animationend 事件', '只检测 transitionend 事件', '检测两者', '不检测'],
        0,
      ],
      [
        'Vue 中过渡的 type 设为 transition 的作用是？',
        ['只检测 transitionend 事件', '只检测 animationend 事件', '检测两者', '不检测'],
        0,
      ],
      ['Vue 中过渡的 @before-enter 钩子参数是？', ['el', 'el, done', 'el, css', 'el, duration'], 0],
      ['Vue 中过渡的 @enter 钩子参数是？', ['el, done', 'el', 'el, css', 'el, duration'], 0],
      ['Vue 中过渡的 @leave 钩子参数是？', ['el, done', 'el', 'el, css', 'el, duration'], 0],
      [
        'Vue 中过渡的 done 回调何时调用？',
        ['JavaScript 动画完成时', 'CSS 动画完成时', '过渡开始时', '过渡取消时'],
        0,
      ],
      ['Vue 中过渡的 @after-enter 钩子参数是？', ['el', 'el, done', 'el, css', 'el, duration'], 0],
      ['Vue 中过渡的 @after-leave 钩子参数是？', ['el', 'el, done', 'el, css', 'el, duration'], 0],
      [
        'Vue 中过渡的 @enter-cancelled 钩子参数是？',
        ['el', 'el, done', 'el, css', 'el, duration'],
        0,
      ],
      [
        'Vue 中过渡的 @leave-cancelled 钩子参数是？',
        ['el', 'el, done', 'el, css', 'el, duration'],
        0,
      ],
      ['Vue 中过渡的 @before-leave 钩子参数是？', ['el', 'el, done', 'el, css', 'el, duration'], 0],
      [
        'Vue 中过渡的 @before-appear 钩子参数是？',
        ['el', 'el, done', 'el, css', 'el, duration'],
        0,
      ],
      ['Vue 中过渡的 @appear 钩子参数是？', ['el, done', 'el', 'el, css', 'el, duration'], 0],
      ['Vue 中过渡的 @after-appear 钩子参数是？', ['el', 'el, done', 'el, css', 'el, duration'], 0],
      [
        'Vue 中过渡的 @appear-cancelled 钩子参数是？',
        ['el', 'el, done', 'el, css', 'el, duration'],
        0,
      ],
      [
        'Vue 中 transition-group 的 CSS 移动类名默认是？',
        ['v-move', 'v-enter', 'v-leave', 'v-active'],
        0,
      ],
      [
        'Vue 中 transition-group 的移动过渡如何禁用？',
        ['move-class="none"', 'css="false"', 'tag="none"', 'disabled'],
        0,
      ],
      [
        'Vue 中 transition-group 的子元素位置变化如何动画？',
        ['自动应用 FLIP 动画', '需要手动实现', '不支持', '需要 CSS'],
        0,
      ],
      [
        'Vue 中 transition-group 的子元素删除动画如何实现？',
        ['leave 过渡 + 绝对定位', '需要手动实现', '不支持', '需要 CSS'],
        0,
      ],
      [
        'Vue 中 transition-group 的子元素添加动画如何实现？',
        ['enter 过渡', '需要手动实现', '不支持', '需要 CSS'],
        0,
      ],
      [
        'Vue 中 transition-group 的子元素排序动画如何实现？',
        ['FLIP 动画', '需要手动实现', '不支持', '需要 CSS'],
        0,
      ],
      ['Vue 中状态过渡可以使用什么库？', ['gsap', 'animejs', 'mojs', '以上都可以'], 3],
      [
        'Vue 中状态过渡如何实现数字动画？',
        ['watch + gsap', 'computed', 'transition', '以上都不对'],
        0,
      ],
      [
        'Vue 中状态过渡如何实现颜色动画？',
        ['watch + gsap', 'computed', 'transition', '以上都不对'],
        0,
      ],
      [
        'Vue 中状态过渡如何实现 SVG 动画？',
        ['watch + gsap', 'computed', 'transition', '以上都不对'],
        0,
      ],
      [
        'Vue 中状态过渡如何实现尺寸动画？',
        ['watch + gsap', 'computed', 'transition', '以上都不对'],
        0,
      ],
      ['Vue 中过渡如何复用？', ['封装组件', 'mixin', 'composition', '以上都可以'], 0],
      [
        'Vue 中过渡如何动态切换？',
        ['动态 name 属性', '动态 component', '动态 transition', '以上都可以'],
        0,
      ],
      ['Vue 中过渡如何嵌套？', ['嵌套 transition 组件', '不支持', '需要特殊语法', '需要 CSS'], 0],
      [
        'Vue 中过渡嵌套时如何控制顺序？',
        ['嵌套组件的 mode 属性', 'CSS 优先级', 'JavaScript 控制', '无法控制'],
        0,
      ],
      [
        'Vue 中过渡如何与路由结合？',
        [
          '<transition> 包裹 <router-view>',
          'router.transition',
          'route.meta.transition',
          '以上都可以',
        ],
        0,
      ],
      [
        'Vue 中过渡如何与动态组件结合？',
        ['<transition> 包裹 <component>', 'component.transition', '动态组件不支持', '需要 CSS'],
        0,
      ],
      [
        'Vue 中过渡如何与条件渲染结合？',
        ['<transition> 包裹 v-if/v-show', 'v-if.transition', '条件渲染不支持', '需要 CSS'],
        0,
      ],
      [
        'Vue 中过渡如何与列表渲染结合？',
        ['<transition-group> 包裹 v-for', 'v-for.transition', '列表渲染不支持', '需要 CSS'],
        0,
      ],
      [
        'Vue 中过渡如何自定义类名？',
        ['enter-from-class, enter-active-class 等', 'name 属性', 'class 属性', 'type 属性'],
        0,
      ],
      [
        'Vue 中过渡如何与 Animate.css 结合？',
        ['自定义类名引入 Animate.css', '直接使用', '不支持', '需要插件'],
        0,
      ],
      [
        'Vue 中过渡如何与 Tailwind CSS 结合？',
        ['自定义类名引入 Tailwind', '直接使用', '不支持', '需要插件'],
        0,
      ],
      [
        'Vue 中过渡的性能优化方式是？',
        ['使用 transform 和 opacity', '减少 DOM 操作', '使用 will-change', '以上都是'],
        3,
      ],
      [
        'Vue 中过渡的 will-change 属性作用是？',
        ['提示浏览器提前优化', '改变属性', '禁用过渡', '启用过渡'],
        0,
      ],
      [
        'Vue 中过渡的 transform 属性为何性能好？',
        ['不触发重排', '使用 GPU', '不触发重绘', '以上都是'],
        3,
      ],
      [
        'Vue 中过渡的 opacity 属性为何性能好？',
        ['不触发重排', '使用 GPU', '不触发重绘', '以上都是'],
        0,
      ],
      [
        'Vue 中过渡的 FLIP 动画原理是？',
        ['记录前后位置，反转，播放', '直接移动', 'CSS 过渡', 'JavaScript 动画'],
        0,
      ],
      ['Vue 中过渡的 FLIP 动画优点是？', ['性能好', '流畅', '无卡顿', '以上都是'], 3],
      ['Vue 中过渡的 FLIP 动画缺点是？', ['计算复杂', '兼容性问题', '不支持 SVG', '以上都是'], 0],
      [
        'Vue 中过渡的 requestAnimationFrame 作用是？',
        ['优化动画帧率', '延迟执行', '异步执行', '同步执行'],
        0,
      ],
      [
        'Vue 中过渡的 CSS 变量如何动画？',
        ['使用 @property 注册', '直接动画', '不支持', '需要 JavaScript'],
        0,
      ],
      [
        'Vue 中过渡的 SVG 路径如何动画？',
        ['stroke-dasharray 和 stroke-dashoffset', '直接动画', '不支持', '需要 JavaScript'],
        0,
      ],
      [
        'Vue 中过渡的滚动动画如何实现？',
        ['Intersection Observer + transition', '直接动画', '不支持', '需要 CSS'],
        0,
      ],
      [
        'Vue 中过渡的视差动画如何实现？',
        ['监听滚动 + transform', '直接动画', '不支持', '需要 CSS'],
        0,
      ],
      [
        'Vue 中过渡的弹性动画如何实现？',
        ['CSS spring 或 gsap', '直接动画', '不支持', '需要 JavaScript'],
        0,
      ],
      [
        'Vue 中过渡的粒子动画如何实现？',
        ['Canvas 或第三方库', '直接动画', '不支持', '需要 CSS'],
        0,
      ],
      [
        'Vue 中过渡的 3D 动画如何实现？',
        ['CSS 3D transform 或 three.js', '直接动画', '不支持', '需要 JavaScript'],
        0,
      ],
      [
        'Vue 中过渡的骨架屏动画如何实现？',
        ['CSS 渐变动画', '直接动画', '不支持', '需要 JavaScript'],
        0,
      ],
      [
        'Vue 中过渡的打字机效果如何实现？',
        ['JavaScript 定时器 + CSS', '直接动画', '不支持', '需要 CSS'],
        0,
      ],
      [
        'Vue 中过渡的数字滚动动画如何实现？',
        ['gsap 或 countUp.js', '直接动画', '不支持', '需要 CSS'],
        0,
      ],
      [
        'Vue 中过渡的页面切换动画如何实现？',
        ['transition 包裹 router-view', '直接动画', '不支持', '需要 CSS'],
        0,
      ],
      [
        'Vue 中过渡的元素拖拽动画如何实现？',
        ['draggable 库 + transition-group', '直接动画', '不支持', '需要 CSS'],
        0,
      ],
      [
        'Vue 中过渡的模态框动画如何实现？',
        ['transition 包裹模态框', '直接动画', '不支持', '需要 CSS'],
        0,
      ],
      [
        'Vue 中过渡的通知动画如何实现？',
        ['transition-group 包裹通知列表', '直接动画', '不支持', '需要 CSS'],
        0,
      ],
      [
        'Vue 中过渡的折叠展开动画如何实现？',
        ['max-height 过渡', '直接动画', '不支持', '需要 CSS'],
        0,
      ],
      ['Vue 中过渡的淡入淡出动画如何实现？', ['opacity 过渡', '直接动画', '不支持', '需要 CSS'], 0],
      [
        'Vue 中过渡的滑动动画如何实现？',
        ['transform: translateX 过渡', '直接动画', '不支持', '需要 CSS'],
        0,
      ],
      [
        'Vue 中过渡的缩放动画如何实现？',
        ['transform: scale 过渡', '直接动画', '不支持', '需要 CSS'],
        0,
      ],
      [
        'Vue 中过渡的旋转动画如何实现？',
        ['transform: rotate 过渡', '直接动画', '不支持', '需要 CSS'],
        0,
      ],
      [
        'Vue 中过渡的弹跳动画如何实现？',
        ['CSS animation 或 gsap', '直接动画', '不支持', '需要 CSS'],
        0,
      ],
    ];
    const item = items[(i - 701) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第八部分：渲染函数 (801-900) ====================
  for (let i = 801; i <= 900; i++) {
    const q = { id: `vue-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      ['Vue 中 h 函数的作用是？', ['创建 VNode', '创建组件', '创建元素', '以上都不对'], 0],
      [
        'Vue 中 h 函数的参数顺序是？',
        ['type, props, children', 'props, type, children', 'children, props, type', '以上都不对'],
        0,
      ],
      ['Vue 中 VNode 的类型有？', ['元素', '组件', '文本', '以上都是'], 3],
      ['Vue 中渲染函数的 setup 返回？', ['渲染函数', 'VNode', '组件实例', '以上都不对'], 0],
      ['Vue 中函数式组件的特点是？', ['无状态', '无实例', '性能更好', '以上都是'], 3],
      ['Vue 中渲染函数的插槽使用？', ['slots 对象', 'this.$slots', 'props', '以上都可以'], 0],
      ['Vue 中渲染函数的 emit 使用？', ['emit 函数', 'this.$emit', 'props', '以上都可以'], 0],
      [
        'Vue 中渲染函数的指令使用？',
        ['withDirectives', 'directives 对象', 'props', '以上都不对'],
        0,
      ],
      ['Vue 中渲染函数的组件注册？', ['components 选项', '全局注册', '局部注册', '以上都可以'], 3],
      ['Vue 中渲染函数的 TypeScript 支持？', ['完整支持', '部分支持', '不支持', '需要配置'], 0],
      ['Vue 中 h 函数的 type 参数可以是？', ['HTML 标签名', '组件', '异步组件', '以上都是'], 3],
      ['Vue 中 h 函数的 props 参数可以是？', ['对象', '数组', '字符串', 'null'], 0],
      ['Vue 中 h 函数的 children 参数可以是？', ['字符串', '数组', 'VNode', '以上都是'], 3],
      ['Vue 中 h 函数的 props 如何绑定事件？', ['onXxx', 'v-on:xxx', '@xxx', 'event:xxx'], 0],
      ['Vue 中 h 函数的 props 如何绑定类名？', ['class', 'className', 'classes', 'styleClass'], 0],
      ['Vue 中 h 函数的 props 如何绑定样式？', ['style', 'styles', 'css', 'inlineStyle'], 0],
      [
        'Vue 中 h 函数的 props 如何绑定 v-model？',
        ['modelValue + onUpdate:modelValue', 'v-model', 'value + input', '双向绑定'],
        0,
      ],
      ['Vue 中 h 函数的 props 如何绑定 key？', ['key', 'v-key', 'ref', 'id'], 0],
      ['Vue 中 h 函数的 props 如何绑定 ref？', ['ref', 'v-ref', 'el', 'element'], 0],
      [
        'Vue 中 h 函数的 children 如何包含文本？',
        ['直接字符串', 'h("span", "text")', 'h(Text, "text")', '以上都是'],
        3,
      ],
      [
        'Vue 中 h 函数的 children 如何包含多个节点？',
        ['数组', '多个参数', 'Fragment', '以上都是'],
        3,
      ],
      [
        'Vue 中 h 函数的 children 如何包含插槽？',
        ['h(component, null, { default: () => [...] })', 'slot 属性', 'v-slot', '以上都不对'],
        0,
      ],
      [
        'Vue 中 h 函数的 children 如何包含作用域插槽？',
        ['h(component, null, { default: (props) => [...] })', 'slot-scope', 'v-slot', '以上都不对'],
        0,
      ],
      [
        'Vue 中 h 函数如何创建 Fragment？',
        [
          'h(Fragment, null, [...])',
          'h("fragment", null, [...])',
          'h("<>", null, [...])',
          '以上都不对',
        ],
        0,
      ],
      [
        'Vue 中 h 函数如何创建 Teleport？',
        [
          'h(Teleport, { to: "#id" }, [...])',
          'h("teleport", { to: "#id" }, [...])',
          'h(Teleport, "#id", [...])',
          '以上都不对',
        ],
        0,
      ],
      [
        'Vue 中 h 函数如何创建 Suspense？',
        [
          'h(Suspense, null, { default: ..., fallback: ... })',
          'h("suspense", null, ...)',
          'h(Suspense, ...)',
          '以上都不对',
        ],
        0,
      ],
      [
        'Vue 中 h 函数如何创建 KeepAlive？',
        [
          'h(KeepAlive, null, [...])',
          'h("keep-alive", null, [...])',
          'h(KeepAlive, ...)',
          '以上都不对',
        ],
        0,
      ],
      [
        'Vue 中 h 函数如何创建 Transition？',
        [
          'h(Transition, { name: "fade" }, [...])',
          'h("transition", { name: "fade" }, [...])',
          'h(Transition, ...)',
          '以上都不对',
        ],
        0,
      ],
      [
        'Vue 中 h 函数如何创建 TransitionGroup？',
        [
          'h(TransitionGroup, { name: "list" }, [...])',
          'h("transition-group", { name: "list" }, [...])',
          'h(TransitionGroup, ...)',
          '以上都不对',
        ],
        0,
      ],
      [
        'Vue 中 resolveComponent 的作用是？',
        ['解析已注册的组件', '注册组件', '创建组件', '销毁组件'],
        0,
      ],
      [
        'Vue 中 resolveDirective 的作用是？',
        ['解析已注册的指令', '注册指令', '创建指令', '销毁指令'],
        0,
      ],
      [
        'Vue 中 withDirectives 的作用是？',
        ['给 VNode 附加指令', '注册指令', '创建指令', '销毁指令'],
        0,
      ],
      [
        'Vue 中 withDirectives 的参数是？',
        ['vnode, directives', 'directives, vnode', 'vnode, directive', 'directive, vnode'],
        0,
      ],
      [
        'Vue 中 withDirectives 的 directive 格式是？',
        [
          '[directive, value, argument, modifiers]',
          'directive',
          '{ directive, value }',
          '以上都不对',
        ],
        0,
      ],
      ['Vue 中 createVNode 的作用是？', ['创建 VNode', '创建组件', '创建元素', '以上都不对'], 0],
      [
        'Vue 中 createVNode 和 h 的区别是？',
        ['h 是 createVNode 的封装', '没有区别', 'createVNode 性能更好', 'h 性能更好'],
        0,
      ],
      ['Vue 中 cloneVNode 的作用是？', ['克隆 VNode', '创建 VNode', '合并 VNode', '销毁 VNode'], 0],
      ['Vue 中 cloneVNode 会合并 props 吗？', ['会', '不会', '取决于配置', '报错'], 0],
      ['Vue 中 mergeProps 的作用是？', ['合并 props', '创建 props', '验证 props', '转换 props'], 0],
      ['Vue 中 mergeProps 如何处理 class？', ['合并数组', '覆盖', '报错', '忽略'], 0],
      ['Vue 中 mergeProps 如何处理 style？', ['合并对象', '覆盖', '报错', '忽略'], 0],
      ['Vue 中 mergeProps 如何处理事件？', ['合并为数组', '覆盖', '报错', '忽略'], 0],
      [
        'Vue 中 isVNode 的作用是？',
        ['判断是否为 VNode', '创建 VNode', '合并 VNode', '销毁 VNode'],
        0,
      ],
      ['Vue 中 renderList 的作用是？', ['渲染列表', '创建列表', '遍历列表', '合并列表'], 0],
      ['Vue 中 renderList 的参数是？', ['list, fn', 'fn, list', 'list', 'fn'], 0],
      ['Vue 中 renderSlot 的作用是？', ['渲染插槽', '创建插槽', '合并插槽', '销毁插槽'], 0],
      [
        'Vue 中 renderSlot 的参数是？',
        ['slots, name, props, fallback', 'name, slots, props', 'slots, name', 'name, props'],
        0,
      ],
      [
        'Vue 中 withCtx 的作用是？',
        ['提供渲染上下文', '创建上下文', '合并上下文', '销毁上下文'],
        0,
      ],
      ['Vue 中 withCtx 的参数是？', ['fn', 'ctx', 'fn, ctx', 'ctx, fn'], 0],
      [
        'Vue 中 createTextVNode 的作用是？',
        ['创建文本 VNode', '创建元素 VNode', '创建组件 VNode', '创建注释 VNode'],
        0,
      ],
      [
        'Vue 中 createCommentVNode 的作用是？',
        ['创建注释 VNode', '创建文本 VNode', '创建元素 VNode', '创建组件 VNode'],
        0,
      ],
      [
        'Vue 中 createStaticVNode 的作用是？',
        ['创建静态 VNode', '创建动态 VNode', '创建文本 VNode', '创建注释 VNode'],
        0,
      ],
      [
        'Vue 中 resolveFilter 的作用是？',
        ['Vue 3 已移除', '解析过滤器', '创建过滤器', '注册过滤器'],
        0,
      ],
      [
        'Vue 中 resolveDynamicComponent 的作用是？',
        ['解析动态组件', '解析静态组件', '解析异步组件', '解析原生组件'],
        0,
      ],
      [
        'Vue 中 render 函数如何返回多个根节点？',
        ['返回数组', '返回 Fragment', '返回对象', '返回字符串'],
        0,
      ],
      [
        'Vue 中 render 函数如何访问 attrs？',
        ['useAttrs()', 'this.$attrs', 'context.attrs', '以上都可以'],
        0,
      ],
      [
        'Vue 中 render 函数如何访问 slots？',
        ['useSlots()', 'this.$slots', 'context.slots', '以上都可以'],
        0,
      ],
      [
        'Vue 中 render 函数如何触发事件？',
        ['emit()', 'this.$emit', 'context.emit', '以上都可以'],
        0,
      ],
      [
        'Vue 中 render 函数如何使用 provide？',
        ['provide()', 'this.$provide', 'app.provide', '以上都可以'],
        0,
      ],
      [
        'Vue 中 render 函数如何使用 inject？',
        ['inject()', 'this.$inject', 'context.inject', '以上都可以'],
        0,
      ],
      [
        'Vue 中 render 函数如何使用生命周期？',
        ['onMounted()', 'this.$onMounted', 'mounted()', '以上都不对'],
        0,
      ],
      [
        'Vue 中 render 函数如何使用 computed？',
        ['computed()', 'this.$computed', 'compute()', '以上都不对'],
        0,
      ],
      [
        'Vue 中 render 函数如何使用 watch？',
        ['watch()', 'this.$watch', 'observe()', '以上都不对'],
        0,
      ],
      ['Vue 中 render 函数如何使用 ref？', ['ref()', 'this.$ref', 'createRef()', '以上都不对'], 0],
      [
        'Vue 中 render 函数如何使用 reactive？',
        ['reactive()', 'this.$reactive', 'createReactive()', '以上都不对'],
        0,
      ],
      [
        'Vue 中 JSX 的配置方式是？',
        ['@vitejs/plugin-vue-jsx', 'babel-plugin-jsx', '两者都可以', '不需要配置'],
        2,
      ],
      [
        'Vue 中 JSX 和模板的区别是？',
        ['JSX 更灵活', '模板更直观', 'JSX 支持完整 JavaScript', '以上都是'],
        3,
      ],
      [
        'Vue 中 JSX 如何使用 v-show？',
        ['v-show={true}', 'vShow={true}', 'show={true}', 'display={true}'],
        0,
      ],
      [
        'Vue 中 JSX 如何使用 v-model？',
        ['v-model={value}', 'vModel={value}', 'model={value}', 'value={value}'],
        0,
      ],
      [
        'Vue 中 JSX 如何使用 v-model 参数？',
        [
          'v-model:[arg]={value}',
          'vModel[arg]={value}',
          'model[arg]={value}',
          'value[arg]={value}',
        ],
        0,
      ],
      [
        'Vue 中 JSX 如何使用自定义指令？',
        ['v-name={value}', 'vName={value}', 'name={value}', 'directive={value}'],
        1,
      ],
      [
        'Vue 中 JSX 如何使用插槽？',
        ['v-slots={slots}', 'vSlots={slots}', 'slots={slots}', '以上都不对'],
        1,
      ],
      [
        'Vue 中 JSX 如何使用作用域插槽？',
        [
          'v-slots={{ default: props => ... }}',
          'vSlots={{ default: props => ... }}',
          'slots={{ default: props => ... }}',
          '以上都不对',
        ],
        1,
      ],
      [
        'Vue 中 JSX 如何使用 Fragment？',
        ['<>...</>', '<Fragment>...</Fragment>', '两者都可以', '不支持'],
        2,
      ],
      [
        'Vue 中 JSX 如何使用 Teleport？',
        ['<Teleport>...</Teleport>', '<teleport>...</teleport>', '两者都可以', '不支持'],
        0,
      ],
      [
        'Vue 中 JSX 如何使用 Suspense？',
        ['<Suspense>...</Suspense>', '<suspense>...</suspense>', '两者都可以', '不支持'],
        0,
      ],
      [
        'Vue 中 JSX 如何使用 KeepAlive？',
        ['<KeepAlive>...</KeepAlive>', '<keep-alive>...</keep-alive>', '两者都可以', '不支持'],
        0,
      ],
      [
        'Vue 中 JSX 如何使用 Transition？',
        ['<Transition>...</Transition>', '<transition>...</transition>', '两者都可以', '不支持'],
        0,
      ],
      [
        'Vue 中 JSX 如何使用 TransitionGroup？',
        [
          '<TransitionGroup>...</TransitionGroup>',
          '<transition-group>...</transition-group>',
          '两者都可以',
          '不支持',
        ],
        0,
      ],
      [
        'Vue 中 JSX 如何绑定事件？',
        ['onClick={handler}', 'on-click={handler}', 'v-on:click={handler}', '@click={handler}'],
        0,
      ],
      [
        'Vue 中 JSX 如何绑定修饰符？',
        [
          'onClickWithModifiers={handler}',
          'onClick.modifiers={handler}',
          'onClick_modifier={handler}',
          '以上都不对',
        ],
        0,
      ],
      [
        'Vue 中 JSX 如何使用 v-if？',
        ['三元表达式', 'v-if={true}', 'if={true}', 'condition={true}'],
        0,
      ],
      ['Vue 中 JSX 如何使用 v-for？', ['map 方法', 'v-for={list}', 'for={list}', 'each={list}'], 0],
      [
        'Vue 中 JSX 如何绑定 class？',
        ['class={className}', 'v-class={className}', 'classes={className}', '以上都不对'],
        0,
      ],
      [
        'Vue 中 JSX 如何绑定 style？',
        ['style={styleObj}', 'v-style={styleObj}', 'styles={styleObj}', '以上都不对'],
        0,
      ],
      [
        'Vue 中 JSX 如何绑定 key？',
        ['key={keyValue}', 'v-key={keyValue}', 'id={keyValue}', 'ref={keyValue}'],
        0,
      ],
      [
        'Vue 中 JSX 如何绑定 ref？',
        ['ref={refValue}', 'v-ref={refValue}', 'el={refValue}', 'element={refValue}'],
        0,
      ],
      ['Vue 中 JSX 如何使用 v-once？', ['v-once', 'vOnce', 'once', '以上都不对'], 1],
      [
        'Vue 中 JSX 如何使用 v-memo？',
        ['v-memo={[deps]}', 'vMemo={[deps]}', 'memo={[deps]}', '以上都不对'],
        1,
      ],
      [
        'Vue 中 JSX 如何使用 v-html？',
        ['v-html={html}', 'vHtml={html}', 'innerHTML={html}', 'html={html}'],
        2,
      ],
      [
        'Vue 中 JSX 如何使用 v-text？',
        ['v-text={text}', 'vText={text}', 'innerText={text}', 'text={text}'],
        2,
      ],
      ['Vue 中 JSX 如何使用 v-cloak？', ['不支持', 'v-cloak', 'vCloak', 'cloak'], 0],
      ['Vue 中 JSX 如何使用 v-pre？', ['不支持', 'v-pre', 'vPre', 'pre'], 0],
      ['Vue 中 JSX 的类型检查如何实现？', ['TypeScript', 'PropTypes', '两者都可以', '不支持'], 2],
      [
        'Vue 中 JSX 如何使用泛型组件？',
        ['<Component<T>>', '<Component type={T}>', '不支持', '需要特殊语法'],
        0,
      ],
      ['Vue 中 JSX 如何使用高阶组件？', ['函数包裹', '装饰器', '继承', '以上都不对'], 0],
      ['Vue 中 JSX 如何使用 render 函数？', ['直接返回 JSX', 'h 函数', '模板', '以上都不对'], 0],
      [
        'Vue 中 JSX 如何使用 Composition API？',
        ['setup 函数', '选项式 API', '混合式 API', '以上都不对'],
        0,
      ],
      ['Vue 中 JSX 如何使用 TypeScript？', ['lang="tsx"', 'lang="jsx"', '不需要', '不支持'], 0],
      [
        'Vue 中 JSX 如何使用 CSS Modules？',
        ['style.className', 'className', 'class_name', '以上都不对'],
        0,
      ],
      [
        'Vue 中 JSX 如何使用 CSS Scoped？',
        ['data-v-xxx 属性', 'scoped 属性', 'module 属性', '以上都不对'],
        0,
      ],
    ];
    const item = items[(i - 801) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }

  // ==================== 第九部分：工具与插件 (901-1000) ====================
  for (let i = 901; i <= 1000; i++) {
    const q = { id: `vue-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      ['Vue 中插件的作用是？', ['添加全局功能', '扩展 Vue', '添加全局资源', '以上都是'], 3],
      ['Vue 中插件的安装方式是？', ['app.use()', 'app.install()', 'app.plugin()', '以上都不对'], 0],
      ['Vue 中插件的 install 函数接收？', ['app, options', 'app', 'options', '以上都不对'], 0],
      ['Vue 中插件可以添加？', ['全局组件', '全局指令', '全局方法', '以上都是'], 3],
      ['Vue 中 TypeScript 的类型定义文件是？', ['.d.ts', '.ts', '.tsx', '以上都不对'], 0],
      ['Vue 中 defineComponent 的作用是？', ['类型推导', '创建组件', '注册组件', '以上都不对'], 0],
      [
        'Vue 中 PropType 的作用是？',
        ['定义复杂 prop 类型', '验证 prop', '转换 prop', '以上都不对'],
        0,
      ],
      [
        'Vue 中 ComponentPublicInstance 的作用是？',
        ['组件实例类型', '组件定义', '组件注册', '以上都不对'],
        0,
      ],
      ['Vue 中性能优化的方式有？', ['v-once', 'v-memo', '计算属性', '以上都是'], 3],
      [
        'Vue 中调试工具是？',
        ['Vue DevTools', 'Chrome DevTools', 'VS Code Debugger', '以上都是'],
        0,
      ],
      [
        'Vue 中 app.config.globalProperties 的作用是？',
        ['添加全局属性', '添加局部属性', '添加组件属性', '添加指令属性'],
        0,
      ],
      [
        'Vue 中 app.component 的作用是？',
        ['注册全局组件', '注册局部组件', '注册指令', '注册过滤器'],
        0,
      ],
      [
        'Vue 中 app.directive 的作用是？',
        ['注册全局指令', '注册局部指令', '注册组件', '注册过滤器'],
        0,
      ],
      ['Vue 中 app.use 的作用是？', ['安装插件', '注册组件', '注册指令', '注册过滤器'], 0],
      ['Vue 中 app.mixin 的作用是？', ['全局混入', '局部混入', '注册组件', '注册指令'], 0],
      [
        'Vue 中 app.provide 的作用是？',
        ['全局提供数据', '局部提供数据', '注入数据', '销毁数据'],
        0,
      ],
      [
        'Vue 中 app.config.errorHandler 的作用是？',
        ['全局错误处理', '局部错误处理', '组件错误处理', '指令错误处理'],
        0,
      ],
      [
        'Vue 中 app.config.warnHandler 的作用是？',
        ['全局警告处理', '局部警告处理', '组件警告处理', '指令警告处理'],
        0,
      ],
      [
        'Vue 中 app.config.performance 的作用是？',
        ['开启性能追踪', '关闭性能追踪', '开启调试', '关闭调试'],
        0,
      ],
      [
        'Vue 中 app.config.compilerOptions 的作用是？',
        ['配置编译器', '配置运行时', '配置路由', '配置状态'],
        0,
      ],
      [
        'Vue 中 app.config.compilerOptions.isCustomElement 的作用是？',
        ['指定自定义元素标签', '注册组件', '注册指令', '注册过滤器'],
        0,
      ],
      [
        'Vue 中 app.config.compilerOptions.whitespace 的作用是？',
        ['配置空格处理', '配置换行处理', '配置缩进处理', '配置编码处理'],
        0,
      ],
      [
        'Vue 中 app.config.compilerOptions.delimiters 的作用是？',
        ['配置模板分隔符', '配置脚本分隔符', '配置样式分隔符', '配置注释分隔符'],
        0,
      ],
      [
        'Vue 中 nextTick 的作用是？',
        ['等待 DOM 更新后执行', '延迟执行', '异步执行', '立即执行'],
        0,
      ],
      [
        'Vue 中 nextTick 的实现原理是？',
        ['Promise.then', 'setTimeout', 'MutationObserver', 'requestAnimationFrame'],
        0,
      ],
      [
        'Vue 中 nextTick 可以在什么地方使用？',
        ['任何地方', '只在组件内', '只在 setup 内', '只在生命周期内'],
        0,
      ],
      ['Vue 中 nextTick 的返回值是？', ['Promise', 'undefined', 'Promise 对象'], 0],
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
const outputPath = join(__dirname, 'vue_questions.json');
fs.writeFileSync(outputPath, JSON.stringify(questions, null, 2));
console.log(`已生成 ${questions.length} 道Vue题目，保存到 ${outputPath}`);
