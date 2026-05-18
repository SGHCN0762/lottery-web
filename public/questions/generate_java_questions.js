// 生成Java 1000条题目的脚本
import fs from 'fs';
import path from 'path';

// 题目模板生成函数
function generateQuestions() {
  const questions = [];

  // ==================== 第一部分：Java基础语法与数据类型 (1-120) ====================
  for (let i = 1; i <= 120; i++) {
    const q = { id: `java-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      ['Java语言的特点不包括？', ['面向对象', '跨平台', '多继承', '自动垃圾回收'], 2],
      ['Java中基本数据类型有几种？', ['6', '7', '8', '9'], 2],
      ['以下哪个不是Java的基本数据类型？', ['int', 'boolean', 'String', 'char'], 2],
      ['Java中哪个关键字用于定义类？', ['interface', 'class', 'struct', 'define'], 1],
      [
        'Java中main方法的签名是？',
        [
          'public void main(String[] args)',
          'public static void main(String[] args)',
          'static void main(String args)',
          'public static main(String[] args)',
        ],
        1,
      ],
      ['Java中哪个关键字用于实现接口？', ['extends', 'implements', 'interface', 'abstract'], 1],
      ['Java中char类型占几个字节？', ['1', '2', '4', '8'], 1],
      ['Java中int类型占几个字节？', ['1', '2', '4', '8'], 2],
      ['Java中long类型占几个字节？', ['4', '8', '16', '32'], 1],
      ['Java中double类型占几个字节？', ['4', '8', '16', '32'], 1],
      ['Java中哪个关键字用于包声明？', ['package', 'import', 'include', 'namespace'], 0],
      ['Java中哪个关键字用于导入包？', ['package', 'import', 'include', 'using'], 1],
      ['Java中哪个访问修饰符的访问范围最小？', ['public', 'protected', 'default', 'private'], 3],
      ['Java中哪个访问修饰符的访问范围最大？', ['public', 'protected', 'default', 'private'], 0],
      [
        'Java中==和equals的区别是？',
        ['==比较引用，equals比较值', '==比较值，equals比较引用', '没有区别', '取决于类'],
        0,
      ],
      [
        'Java中String是不可变的，原因是什么？',
        [
          '被final修饰',
          '内部value数组被final修饰且无私有方法修改',
          '被static修饰',
          '被private修饰',
        ],
        1,
      ],
      [
        'Java中StringBuilder和StringBuffer的区别是？',
        ['StringBuffer线程安全', 'StringBuilder线程安全', '没有区别', '性能一样'],
        0,
      ],
      ['Java中哪个关键字用于异常捕获？', ['try', 'catch', 'finally', 'throw'], 1],
      ['Java中哪个关键字用于抛出异常？', ['try', 'catch', 'finally', 'throw'], 3],
      ['Java中哪个关键字用于方法重写？', ['overload', 'override', 'overwrite', 'hide'], 1],
      ['Java中哪个关键字用于方法重载？', ['overload', 'override', 'overwrite', 'hide'], 0],
      [
        'Java中this关键字的作用是？',
        ['指向当前对象', '指向父类对象', '指向子类对象', '指向类本身'],
        0,
      ],
      [
        'Java中super关键字的作用是？',
        ['指向当前对象', '指向父类对象', '指向子类对象', '指向类本身'],
        1,
      ],
      ['Java中static关键字的作用是？', ['属于实例', '属于类', '属于方法', '属于包'], 1],
      [
        'Java中final关键字修饰类时表示？',
        ['不能被继承', '不能被修改', '不能被访问', '不能被实例化'],
        0,
      ],
      [
        'Java中final关键字修饰方法时表示？',
        ['不能被重写', '不能被重载', '不能被调用', '不能被继承'],
        0,
      ],
      [
        'Java中final关键字修饰变量时表示？',
        ['不能被修改', '不能被访问', '不能被继承', '不能被传递'],
        0,
      ],
      ['Java中哪个类是所有类的根类？', ['Object', 'Class', 'System', 'String'], 0],
      ['Java中哪个方法用于获取对象的哈希码？', ['equals', 'hashCode', 'toString', 'getClass'], 1],
      ['Java中哪个方法用于获取对象的类信息？', ['equals', 'hashCode', 'toString', 'getClass'], 3],
      ['Java中哪个关键字用于判断对象类型？', ['instanceof', 'typeof', 'isInstance', 'class'], 0],
      ['Java中数组的默认初始化值是？', ['0', 'null', 'undefined', '取决于类型'], 3],
      ['Java中局部变量必须初始化吗？', ['必须', '不必', '取决于类型', '取决于修饰符'], 0],
      ['Java中成员变量必须初始化吗？', ['必须', '不必，有默认值', '取决于类型', '取决于修饰符'], 1],
      ['Java中哪个关键字用于定义常量？', ['const', 'final', 'static', 'define'], 1],
      ['Java中哪个运算符用于位与？', ['&', '&&', '|', '||'], 0],
      ['Java中哪个运算符用于逻辑与？', ['&', '&&', '|', '||'], 1],
      ['Java中哪个运算符用于三元条件？', ['?:', '??', '&&', '||'], 0],
      [
        'Java中switch支持哪些数据类型？',
        ['int, String, enum', 'double, float', 'boolean', 'long'],
        0,
      ],
      ['Java中哪个类用于数学运算？', ['Math', 'Calculate', 'Number', 'Arithmetic'], 0],
      ['Java中哪个类用于系统操作？', ['System', 'Runtime', 'Process', 'Execute'], 0],
      ['Java中哪个类用于数组操作？', ['Arrays', 'Array', 'Collections', 'List'], 0],
      ['Java中哪个关键字用于跳出循环？', ['break', 'continue', 'return', 'exit'], 0],
      ['Java中哪个关键字用于跳过本次循环？', ['break', 'continue', 'return', 'exit'], 1],
      ['Java中哪个关键字用于返回值？', ['break', 'continue', 'return', 'exit'], 2],
      ['Java中哪个修饰符不能修饰类？', ['public', 'private', 'protected', 'static'], 1],
      ['Java中哪个修饰符不能修饰局部变量？', ['final', 'static', 'abstract', 'native'], 1],
      ['Java中哪个修饰符不能修饰方法？', ['final', 'static', 'abstract', 'native'], 2],
      ['Java中哪个修饰符不能修饰成员变量？', ['final', 'static', 'abstract', 'native'], 2],
      ['Java中哪个类用于输入输出？', ['System', 'Runtime', 'Process', 'IO'], 0],
      ['Java中哪个类用于字符串操作？', ['String', 'StringBuilder', 'StringBuffer', '以上都是'], 3],
      ['Java中哪个类用于日期操作？', ['Date', 'Calendar', 'LocalDate', '以上都是'], 3],
      ['Java中哪个类用于随机数生成？', ['Random', 'Math', 'UUID', 'SecureRandom'], 0],
      ['Java中哪个类用于大整数操作？', ['BigInteger', 'BigDecimal', 'Math', 'Number'], 0],
      ['Java中哪个类用于高精度浮点数操作？', ['BigInteger', 'BigDecimal', 'Math', 'Number'], 1],
      ['Java中哪个类用于正则表达式？', ['Pattern', 'Matcher', 'Regex', 'String'], 0],
      ['Java中哪个类用于枚举？', ['Enum', 'Enumeration', 'Iterator', 'Iterable'], 0],
      ['Java中哪个类用于包装基本类型？', ['Wrapper', 'Boxing', 'Integer', 'Object'], 2],
      ['Java中哪个关键字用于定义接口？', ['interface', 'class', 'abstract', 'enum'], 0],
      ['Java中哪个关键字用于定义枚举？', ['interface', 'class', 'abstract', 'enum'], 3],
      ['Java中哪个关键字用于定义抽象类？', ['interface', 'class', 'abstract', 'enum'], 2],
      ['Java中哪个关键字用于定义同步方法？', ['synchronized', 'volatile', 'lock', 'atomic'], 0],
      ['Java中哪个关键字用于定义易变变量？', ['synchronized', 'volatile', 'lock', 'atomic'], 1],
      ['Java中哪个关键字用于定义本地方法？', ['native', 'extern', 'jni', 'c++'], 0],
      ['Java中哪个关键字用于定义瞬态变量？', ['transient', 'volatile', 'static', 'final'], 0],
      [
        'Java中哪个关键字用于定义序列化标识？',
        ['serialVersionUID', 'transient', 'volatile', 'static'],
        0,
      ],
      [
        'Java中哪个类用于对象序列化？',
        ['ObjectOutputStream', 'ObjectInputStream', 'Serializable', 'Externalizable'],
        0,
      ],
      [
        'Java中哪个类用于对象反序列化？',
        ['ObjectOutputStream', 'ObjectInputStream', 'Serializable', 'Externalizable'],
        1,
      ],
      [
        'Java中哪个接口用于标记可序列化？',
        ['Serializable', 'Cloneable', 'Comparable', 'Runnable'],
        0,
      ],
      [
        'Java中哪个接口用于标记可克隆？',
        ['Serializable', 'Cloneable', 'Comparable', 'Runnable'],
        1,
      ],
      ['Java中哪个接口用于比较大小？', ['Serializable', 'Cloneable', 'Comparable', 'Runnable'], 2],
      ['Java中哪个接口用于执行线程？', ['Serializable', 'Cloneable', 'Comparable', 'Runnable'], 3],
      ['Java中哪个类用于线程操作？', ['Thread', 'Runnable', 'Callable', 'Future'], 0],
      ['Java中哪个类用于线程同步？', ['Lock', 'Synchronizer', 'Condition', 'Semaphore'], 0],
      [
        'Java中哪个类用于线程池？',
        ['ExecutorService', 'ThreadPoolExecutor', 'Executors', '以上都是'],
        3,
      ],
      [
        'Java中哪个类用于原子操作？',
        ['AtomicInteger', 'AtomicLong', 'AtomicBoolean', '以上都是'],
        3,
      ],
      [
        'Java中哪个类用于并发集合？',
        ['ConcurrentHashMap', 'CopyOnWriteArrayList', 'BlockingQueue', '以上都是'],
        3,
      ],
      [
        'Java中哪个类用于并发控制？',
        ['CountDownLatch', 'CyclicBarrier', 'Semaphore', '以上都是'],
        3,
      ],
      [
        'Java中哪个类用于并发同步？',
        ['ReentrantLock', 'ReadWriteLock', 'StampedLock', '以上都是'],
        3,
      ],
      [
        'Java中哪个类用于并发交换？',
        ['Exchanger', 'TransferQueue', 'SynchronousQueue', '以上都是'],
        0,
      ],
      [
        'Java中哪个类用于并发分叉合并？',
        ['ForkJoinPool', 'ForkJoinTask', 'RecursiveTask', '以上都是'],
        3,
      ],
      [
        'Java中哪个类用于并发流？',
        ['ParallelStream', 'Stream', 'ForkJoinPool', 'CompletableFuture'],
        0,
      ],
      ['Java中哪个类用于异步计算？', ['Future', 'CompletableFuture', 'Optional', 'Promise'], 1],
      ['Java中哪个类用于避免空指针？', ['Optional', 'Nullable', 'NonNull', 'Objects'], 0],
      ['Java中哪个类用于函数式接口？', ['Function', 'Consumer', 'Supplier', '以上都是'], 3],
      ['Java中哪个类用于流式操作？', ['Stream', 'IntStream', 'LongStream', '以上都是'], 3],
      ['Java中哪个类用于日期时间？', ['LocalDate', 'LocalTime', 'LocalDateTime', '以上都是'], 3],
      ['Java中哪个类用于时区？', ['ZoneId', 'ZoneOffset', 'ZonedDateTime', '以上都是'], 3],
      [
        'Java中哪个类用于格式化？',
        ['DateTimeFormatter', 'SimpleDateFormat', 'DecimalFormat', '以上都是'],
        3,
      ],
      ['Java中哪个类用于资源加载？', ['ClassLoader', 'Class', 'Resource', 'URL'], 0],
      ['Java中哪个类用于反射？', ['Class', 'Field', 'Method', '以上都是'], 3],
      ['Java中哪个类用于代理？', ['Proxy', 'InvocationHandler', 'Enhancer', '以上都是'], 0],
      ['Java中哪个类用于注解？', ['Annotation', 'Retention', 'Target', '以上都是'], 0],
      ['Java中哪个类用于泛型？', ['Type', 'ParameterizedType', 'TypeVariable', '以上都是'], 3],
      ['Java中哪个类用于网络？', ['Socket', 'ServerSocket', 'URL', '以上都是'], 3],
      ['Java中哪个类用于HTTP？', ['HttpURLConnection', 'HttpClient', 'HttpRequest', '以上都是'], 3],
      [
        'Java中哪个类用于UDP？',
        ['DatagramSocket', 'DatagramPacket', 'MulticastSocket', '以上都是'],
        3,
      ],
      ['Java中哪个类用于文件？', ['File', 'Path', 'Files', '以上都是'], 3],
      ['Java中哪个类用于NIO？', ['Buffer', 'Channel', 'Selector', '以上都是'], 3],
      ['Java中哪个类用于字符集？', ['Charset', 'Encoder', 'Decoder', '以上都是'], 0],
      [
        'Java中哪个类用于压缩？',
        ['ZipOutputStream', 'GZIPOutputStream', 'Deflater', '以上都是'],
        3,
      ],
      ['Java中哪个类用于加密？', ['MessageDigest', 'Cipher', 'Signature', '以上都是'], 3],
      ['Java中哪个类用于证书？', ['Certificate', 'KeyStore', 'KeyPair', '以上都是'], 3],
      ['Java中哪个类用于JMX？', ['MBeanServer', 'ObjectName', 'MBeanInfo', '以上都是'], 3],
      ['Java中哪个类用于JNDI？', ['Context', 'InitialContext', 'NamingException', '以上都是'], 3],
      ['Java中哪个类用于RMI？', ['Remote', 'UnicastRemoteObject', 'Registry', '以上都是'], 3],
      ['Java中哪个类用于JNI？', ['JNIEnv', 'jobject', 'jclass', '以上都是'], 0],
      ['Java中哪个类用于JVM？', ['Runtime', 'System', 'ClassLoader', '以上都是'], 3],
      [
        'Java中哪个类用于GC？',
        ['GarbageCollector', 'Reference', 'PhantomReference', '以上都是'],
        3,
      ],
      [
        'Java中哪个类用于内存管理？',
        ['MemoryMXBean', 'MemoryPoolMXBean', 'BufferPoolMXBean', '以上都是'],
        3,
      ],
      ['Java中哪个类用于线程管理？', ['ThreadMXBean', 'ThreadInfo', 'LockInfo', '以上都是'], 3],
      ['Java中哪个类用于日志？', ['Logger', 'LogManager', 'Handler', '以上都是'], 3],
      ['Java中哪个类用于配置？', ['Properties', 'Preferences', 'ResourceBundle', '以上都是'], 3],
      ['Java中哪个类用于国际化？', ['Locale', 'ResourceBundle', 'MessageFormat', '以上都是'], 3],
      [
        'Java中哪个类用于观察者模式？',
        ['Observable', 'Observer', 'PropertyChangeListener', '以上都是'],
        3,
      ],
      [
        'Java中哪个类用于单例模式？',
        ['Collections.EMPTY_LIST', 'Runtime.getRuntime()', 'Optional.empty()', '以上都是'],
        3,
      ],
      ['Java中哪个类用于工厂模式？', ['Executors', 'Collections', 'Calendars', '以上都是'], 3],
      [
        'Java中哪个类用于装饰器模式？',
        ['BufferedInputStream', 'DataInputStream', 'ObjectInputStream', '以上都是'],
        3,
      ],
      [
        'Java中哪个类用于适配器模式？',
        ['InputStreamReader', 'OutputStreamWriter', '以上都是', '无'],
        2,
      ],
      ['Java中哪个类用于代理模式？', ['Proxy', 'InvocationHandler', '以上都是', '无'], 2],
      ['Java中哪个类用于迭代器模式？', ['Iterator', 'ListIterator', 'Iterable', '以上都是'], 3],
    ];
    const item = items[(i - 1) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }
  // ==================== 第二部分：面向对象编程 (121-240) ====================
  for (let i = 121; i <= 240; i++) {
    const q = { id: `java-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      ['Java中封装的好处不包括？', ['隐藏实现细节', '提高安全性', '提高性能', '便于修改'], 2],
      ['Java中继承的好处不包括？', ['代码复用', '多态性', '提高性能', '扩展性'], 2],
      ['Java中多态的好处不包括？', ['提高灵活性', '降低耦合', '提高性能', '可扩展性'], 2],
      ['Java中抽象的好处不包括？', ['规范设计', '隐藏细节', '提高性能', '便于分工'], 2],
      ['Java中接口的好处不包括？', ['规范行为', '多重继承', '提高性能', '降低耦合'], 2],
      [
        'Java中重写与重载的区别是？',
        [
          '重写是子类方法，重载是同类方法',
          '重写是同类方法，重载是子类方法',
          '无区别',
          '取决于参数',
        ],
        0,
      ],
      [
        'Java中抽象类和接口的区别是？',
        ['抽象类可有构造方法', '接口可有构造方法', '无区别', '取决于设计'],
        0,
      ],
      ['Java中接口可以继承接口吗？', ['可以', '不可以', '只能继承一个', '取决于版本'], 0],
      ['Java中类可以继承多个类吗？', ['不可以', '可以', '只能继承两个', '取决于版本'], 0],
      ['Java中类可以实现多个接口吗？', ['可以', '不可以', '只能实现一个', '取决于版本'], 0],
      ['Java中抽象类可以实现接口吗？', ['可以', '不可以', '只能实现一个', '取决于版本'], 0],
      ['Java中抽象类可以继承具体类吗？', ['可以', '不可以', '只能继承抽象类', '取决于版本'], 0],
      ['Java中抽象类可以有静态方法吗？', ['可以', '不可以', '只能有抽象方法', '取决于版本'], 0],
      ['Java中接口可以有静态方法吗？', ['Java 8+可以', '不可以', '一直可以', '取决于版本'], 0],
      ['Java中接口可以有默认方法吗？', ['Java 8+可以', '不可以', '一直可以', '取决于版本'], 0],
      ['Java中接口可以有私有方法吗？', ['Java 9+可以', '不可以', '一直可以', '取决于版本'], 0],
      ['Java中接口的变量默认是？', ['public static final', 'private', 'protected', 'default'], 0],
      ['Java中接口的方法默认是？', ['public abstract', 'private', 'protected', 'default'], 0],
      ['Java中构造方法可以被重写吗？', ['不可以', '可以', '可以重载', '取决于修饰符'], 0],
      ['Java中构造方法可以被重载吗？', ['可以', '不可以', '只能有一个', '取决于修饰符'], 0],
      ['Java中构造方法可以有返回值吗？', ['不可以', '可以', '可以有void', '取决于修饰符'], 0],
      [
        'Java中构造方法可以抛出异常吗？',
        ['可以', '不可以', '只能抛出RuntimeException', '取决于修饰符'],
        0,
      ],
      [
        'Java中this()和super()可以同时出现吗？',
        ['不可以', '可以', '取决于位置', '取决于修饰符'],
        0,
      ],
      [
        'Java中this()和super()必须放在构造方法第几行？',
        ['第一行', '最后一行', '任意位置', '取决于修饰符'],
        0,
      ],
      ['Java中静态方法可以使用this吗？', ['不可以', '可以', '取决于位置', '取决于修饰符'], 0],
      ['Java中静态方法可以使用super吗？', ['不可以', '可以', '取决于位置', '取决于修饰符'], 0],
      ['Java中静态代码块什么时候执行？', ['类加载时', '对象创建时', '方法调用时', '程序启动时'], 0],
      ['Java中构造代码块什么时候执行？', ['类加载时', '对象创建时', '方法调用时', '程序启动时'], 1],
      ['Java中局部代码块什么时候执行？', ['类加载时', '对象创建时', '方法调用时', '程序启动时'], 2],
      ['Java中静态代码块可以有this吗？', ['不可以', '可以', '取决于位置', '取决于修饰符'], 0],
      [
        'Java中静态代码块可以抛出异常吗？',
        ['不可以', '可以', '只能抛出RuntimeException', '取决于修饰符'],
        0,
      ],
      [
        'Java中静态内部类可以访问外部类的非静态成员吗？',
        ['不可以', '可以', '取决于位置', '取决于修饰符'],
        0,
      ],
      [
        'Java中非静态内部类可以访问外部类的静态成员吗？',
        ['可以', '不可以', '取决于位置', '取决于修饰符'],
        0,
      ],
      ['Java中非静态内部类可以有静态成员吗？', ['不可以', '可以', '取决于位置', '取决于修饰符'], 0],
      [
        'Java中局部内部类可以访问外部类的成员吗？',
        ['可以', '不可以', '取决于位置', '取决于修饰符'],
        0,
      ],
      [
        'Java中局部内部类可以访问局部变量吗？',
        ['可以，但变量必须是final或effectively final', '不可以', '可以任意访问', '取决于修饰符'],
        0,
      ],
      ['Java中匿名内部类可以继承类吗？', ['可以', '不可以', '只能实现接口', '取决于修饰符'], 0],
      ['Java中匿名内部类可以实现接口吗？', ['可以', '不可以', '只能继承类', '取决于修饰符'], 0],
      ['Java中匿名内部类可以有构造方法吗？', ['不可以', '可以', '取决于位置', '取决于修饰符'], 0],
      [
        'Java中匿名内部类可以访问外部类的成员吗？',
        ['可以', '不可以', '取决于位置', '取决于修饰符'],
        0,
      ],
      [
        'Java中匿名内部类可以访问局部变量吗？',
        ['可以，但变量必须是final或effectively final', '不可以', '可以任意访问', '取决于修饰符'],
        0,
      ],
      [
        'Java中枚举可以有构造方法吗？',
        ['可以，但必须是private', '不可以', '可以是public', '取决于修饰符'],
        0,
      ],
      ['Java中枚举可以实现接口吗？', ['可以', '不可以', '只能继承类', '取决于修饰符'], 0],
      ['Java中枚举可以继承类吗？', ['不可以', '可以', '取决于位置', '取决于修饰符'], 0],
      ['Java中枚举可以有抽象方法吗？', ['可以', '不可以', '取决于位置', '取决于修饰符'], 0],
      ['Java中枚举的values()方法返回？', ['所有枚举实例', '枚举名称', '枚举索引', '枚举值'], 0],
      [
        'Java中枚举的valueOf()方法返回？',
        ['指定名称的枚举实例', '所有枚举实例', '枚举索引', '枚举值'],
        0,
      ],
      ['Java中枚举的ordinal()方法返回？', ['枚举索引', '枚举名称', '枚举值', '枚举实例'], 0],
      ['Java中枚举的name()方法返回？', ['枚举名称', '枚举索引', '枚举值', '枚举实例'], 0],
      ['Java中枚举的compareTo()方法比较？', ['索引', '名称', '值', '实例'], 0],
      ['Java中枚举的equals()方法比较？', ['引用', '值', '名称', '索引'], 0],
      ['Java中枚举的hashCode()方法基于？', ['引用', '值', '名称', '索引'], 0],
      ['Java中枚举的toString()方法返回？', ['枚举名称', '枚举索引', '枚举值', '枚举实例'], 0],
      ['Java中枚举的clone()方法？', ['不可克隆', '可克隆', '浅克隆', '深克隆'], 0],
      [
        'Java中枚举的finalize()方法？',
        ['不可被垃圾回收', '可被垃圾回收', '手动调用', '自动调用'],
        0,
      ],
      [
        'Java中单例模式的枚举实现优势是？',
        ['防止反射攻击', '防止序列化破坏', '线程安全', '以上都是'],
        3,
      ],
      ['Java中包装类的缓存是？', ['IntegerCache', 'LongCache', 'ShortCache', '以上都是'], 3],
      ['Java中Integer的缓存范围是？', ['-128到127', '0到255', '-32768到32767', '无缓存'], 0],
      ['Java中自动装箱是？', ['基本类型转包装类', '包装类转基本类型', '无转换', '手动转换'], 0],
      ['Java中自动拆箱是？', ['基本类型转包装类', '包装类转基本类型', '无转换', '手动转换'], 1],
      [
        'Java中自动装箱可能引发？',
        ['NullPointerException', 'ClassCastException', '内存溢出', '性能问题'],
        3,
      ],
      [
        'Java中自动拆箱可能引发？',
        ['NullPointerException', 'ClassCastException', '内存溢出', '性能问题'],
        0,
      ],
      ['Java中包装类比较推荐使用？', ['equals', '==', 'compareTo', 'compare'], 0],
      ['Java中String比较推荐使用？', ['equals', '==', 'compareTo', 'compare'], 0],
      [
        'Java中String的intern()方法作用是？',
        ['将字符串加入常量池', '比较字符串', '截取字符串', '转换大小写'],
        0,
      ],
      [
        'Java中String的substring()方法作用是？',
        ['截取字符串', '替换字符串', '分割字符串', '拼接字符串'],
        0,
      ],
      [
        'Java中String的replace()方法作用是？',
        ['替换字符串', '截取字符串', '分割字符串', '拼接字符串'],
        0,
      ],
      [
        'Java中String的split()方法作用是？',
        ['分割字符串', '截取字符串', '替换字符串', '拼接字符串'],
        0,
      ],
      [
        'Java中String的trim()方法作用是？',
        ['去除首尾空格', '去除所有空格', '转换大小写', '判断空'],
        0,
      ],
      [
        'Java中String的isEmpty()方法作用是？',
        ['判断长度是否为0', '判断是否为null', '判断是否为空格', '判断是否为空串'],
        0,
      ],
      ['Java中String的length()方法作用是？', ['获取长度', '获取容量', '获取大小', '获取字节数'], 0],
      [
        'Java中String的charAt()方法作用是？',
        ['获取指定位置字符', '获取指定字符位置', '获取子串', '获取长度'],
        0,
      ],
      [
        'Java中String的indexOf()方法作用是？',
        ['获取指定字符位置', '获取指定位置字符', '获取子串', '获取长度'],
        0,
      ],
      [
        'Java中String的lastIndexOf()方法作用是？',
        ['获取指定字符最后位置', '获取指定位置字符', '获取子串', '获取长度'],
        0,
      ],
      [
        'Java中String的startsWith()方法作用是？',
        ['判断前缀', '判断后缀', '判断包含', '判断相等'],
        0,
      ],
      ['Java中String的endsWith()方法作用是？', ['判断后缀', '判断前缀', '判断包含', '判断相等'], 0],
      ['Java中String的contains()方法作用是？', ['判断包含', '判断前缀', '判断后缀', '判断相等'], 0],
      [
        'Java中String的toUpperCase()方法作用是？',
        ['转大写', '转小写', '比较大小', '判断大小写'],
        0,
      ],
      [
        'Java中String的toLowerCase()方法作用是？',
        ['转小写', '转大写', '比较大小', '判断大小写'],
        1,
      ],
      [
        'Java中String的toCharArray()方法作用是？',
        ['转为字符数组', '转为字节数组', '转为整型数组', '转为字符串数组'],
        0,
      ],
      [
        'Java中String的getBytes()方法作用是？',
        ['转为字节数组', '转为字符数组', '转为整型数组', '转为字符串数组'],
        0,
      ],
      [
        'Java中String的valueOf()方法作用是？',
        ['将其他类型转为字符串', '将字符串转为其他类型', '比较字符串', '拼接字符串'],
        0,
      ],
      [
        'Java中String的format()方法作用是？',
        ['格式化字符串', '拼接字符串', '替换字符串', '分割字符串'],
        0,
      ],
      [
        'Java中String的join()方法作用是？',
        ['拼接字符串', '格式化字符串', '替换字符串', '分割字符串'],
        0,
      ],
      [
        'Java中String的concat()方法作用是？',
        ['拼接字符串', '格式化字符串', '替换字符串', '分割字符串'],
        0,
      ],
      [
        'Java中String的matches()方法作用是？',
        ['正则匹配', '替换字符串', '分割字符串', '拼接字符串'],
        0,
      ],
      ['Java中Object的clone()方法是？', ['浅克隆', '深克隆', '不可克隆', '取决于实现'], 0],
      [
        'Java中Object的toString()方法返回？',
        ['类名@哈希码', '对象内容', '对象名称', '对象引用'],
        0,
      ],
      ['Java中Object的equals()方法默认比较？', ['引用', '值', '类型', '哈希码'], 0],
      [
        'Java中Object的hashCode()方法默认返回？',
        ['对象内存地址相关值', '对象内容哈希', '对象名称哈希', '对象引用哈希'],
        0,
      ],
      [
        'Java中Object的finalize()方法何时调用？',
        ['垃圾回收前', '对象创建时', '对象使用时', '手动调用'],
        0,
      ],
      [
        'Java中Object的getClass()方法返回？',
        ['对象的运行时类', '对象的编译时类', '对象的父类', '对象的接口'],
        0,
      ],
      ['Java中Object的wait()方法作用是？', ['释放锁并等待', '获取锁', '唤醒线程', '中断线程'], 0],
      [
        'Java中Object的notify()方法作用是？',
        ['唤醒一个等待线程', '唤醒所有等待线程', '释放锁', '获取锁'],
        0,
      ],
      [
        'Java中Object的notifyAll()方法作用是？',
        ['唤醒所有等待线程', '唤醒一个等待线程', '释放锁', '获取锁'],
        0,
      ],
      [
        'Java中深克隆和浅克隆的区别是？',
        [
          '深克隆复制引用对象，浅克隆不复制',
          '浅克隆复制引用对象，深克隆不复制',
          '无区别',
          '取决于实现',
        ],
        0,
      ],
      [
        'Java中如何实现深克隆？',
        ['序列化和反序列化', '重写clone方法', '使用拷贝构造', '以上都可以'],
        3,
      ],
      [
        'Java中组合和继承的区别是？',
        [
          '组合是has-a关系，继承是is-a关系',
          '组合是is-a关系，继承是has-a关系',
          '无区别',
          '取决于设计',
        ],
        0,
      ],
      ['Java中组合相比继承的优势是？', ['封装性好', '灵活性高', '依赖性低', '以上都是'], 3],
      ['Java中继承相比组合的优势是？', ['代码复用直接', '多态性', '扩展性', '以上都是'], 3],
      ['Java中向上转型的特点是？', ['安全，自动', '不安全，强制', '无变化', '取决于类型'], 0],
      ['Java中向下转型的特点是？', ['不安全，需要强制', '安全，自动', '无变化', '取决于类型'], 0],
      [
        'Java中instanceof运算符的作用是？',
        [
          '判断对象是否属于某类型',
          '判断类型是否兼容',
          '判断对象是否为null',
          '判断类型是否为基本类型',
        ],
        0,
      ],
      [
        'Java中多态的实现条件是？',
        ['继承，重写，向上转型', '继承，重载，向下转型', '实现，重写，向上转型', '以上都是'],
        0,
      ],
      [
        'Java中动态绑定是指？',
        ['运行时确定调用方法', '编译时确定调用方法', '链接时确定调用方法', '加载时确定调用方法'],
        0,
      ],
      [
        'Java中静态绑定是指？',
        ['编译时确定调用方法', '运行时确定调用方法', '链接时确定调用方法', '加载时确定调用方法'],
        0,
      ],
      [
        'Java中方法隐藏是指？',
        ['静态方法的重写', '实例方法的重写', '实例方法的重载', '静态方法的重载'],
        0,
      ],
      [
        'Java中变量隐藏是指？',
        [
          '子类定义与父类同名的变量',
          '子类定义与父类同名的常量',
          '子类定义与父类同名的方法',
          '子类定义与父类同名的类',
        ],
        0,
      ],
      [
        'Java中内部类的分类有？',
        [
          '成员内部类，局部内部类，匿名内部类，静态内部类',
          '成员内部类，局部内部类，匿名内部类',
          '成员内部类，局部内部类',
          '成员内部类',
        ],
        0,
      ],
      ['Java中内部类的优势是？', ['隐藏实现', '访问外部类私有成员', '实现多重继承', '以上都是'], 3],
      [
        'Java中Lambda表达式的作用是？',
        ['简化匿名内部类', '提高性能', '替代方法引用', '以上都是'],
        0,
      ],
      [
        'Java中Lambda表达式的语法是？',
        ['(参数) -> {表达式}', '(参数) <- {表达式}', '(参数) => {表达式}', '(参数) -> 表达式'],
        0,
      ],
      ['Java中Lambda表达式的类型是？', ['函数式接口', '抽象类', '具体类', '匿名类'], 0],
      [
        'Java中函数式接口是指？',
        ['只有一个抽象方法的接口', '没有抽象方法的接口', '有多个抽象方法的接口', '以上都不对'],
        0,
      ],
      [
        'Java中@FunctionalInterface注解的作用是？',
        ['标记函数式接口', '定义函数式接口', '实现函数式接口', '编译函数式接口'],
        0,
      ],
      [
        'Java中方法引用的作用是？',
        ['简化Lambda表达式', '提高性能', '替代Lambda表达式', '以上都是'],
        0,
      ],
      ['Java中方法引用的语法是？', ['类名::方法名', '对象名::方法名', '类名::new', '以上都是'], 3],
      [
        'Java中构造方法引用的语法是？',
        ['类名::new', '类名::方法名', '对象名::方法名', 'new 类名'],
        0,
      ],
      ['Java中数组引用的语法是？', ['类型[]::new', '类型[]::方法', 'new 类型[]', '以上都不对'], 0],
    ];
    const item = items[(i - 121) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }
  // ==================== 第三部分：常用类库与异常处理 (241-360) ====================
  for (let i = 241; i <= 360; i++) {
    const q = { id: `java-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      ['Java中异常的基类是？', ['Throwable', 'Exception', 'Error', 'RuntimeException'], 0],
      [
        'Java中Error的特点是？',
        ['严重错误，程序无法处理', '轻微错误，程序可以处理', '编译错误', '运行错误'],
        0,
      ],
      [
        'Java中Exception的特点是？',
        ['程序可以处理的错误', '程序无法处理的错误', '编译错误', '系统错误'],
        0,
      ],
      ['Java中RuntimeException的特点是？', ['非受检异常', '受检异常', '编译异常', '系统异常'], 0],
      [
        'Java中受检异常的特点是？',
        ['必须处理或声明', '可以不处理', '编译器不检查', '运行时才检查'],
        0,
      ],
      [
        'Java中非受检异常的特点是？',
        ['可以不处理', '必须处理或声明', '编译器检查', '运行时才检查'],
        0,
      ],
      [
        'Java中try-catch-finally的执行顺序是？',
        ['try-catch-finally', 'try-finally-catch', 'catch-try-finally', 'finally-try-catch'],
        0,
      ],
      [
        'Java中finally块一定会执行吗？',
        ['不一定，如System.exit()', '一定', '取决于异常', '取决于try'],
        0,
      ],
      [
        'Java中throw和throws的区别是？',
        ['throw抛出异常，throws声明异常', 'throw声明异常，throws抛出异常', '无区别', '取决于位置'],
        0,
      ],
      ['Java中自定义异常应该继承？', ['Exception或其子类', 'Error', 'Throwable', 'Object'], 0],
      [
        'Java中try-with-resources的作用是？',
        ['自动关闭资源', '手动关闭资源', '声明资源', '创建资源'],
        0,
      ],
      [
        'Java中try-with-resources要求资源实现？',
        ['AutoCloseable', 'Closeable', 'Serializable', 'Cloneable'],
        0,
      ],
      [
        'Java中multi-catch的语法是？',
        [
          'catch(Exception1 | Exception2 e)',
          'catch(Exception1, Exception2 e)',
          'catch(Exception1 && Exception2 e)',
          'catch(Exception1 Exception2 e)',
        ],
        0,
      ],
      ['Java中异常链的作用是？', ['保留原始异常信息', '隐藏异常原因', '提高性能', '简化代码'], 0],
      [
        'Java中异常链使用哪个构造方法？',
        [
          '带cause参数的构造方法',
          '无参构造方法',
          '带message参数的构造方法',
          '带stack参数的构造方法',
        ],
        0,
      ],
      ['Java中异常链使用哪个方法设置原因？', ['initCause', 'setCause', 'addCause', 'putCause'], 0],
      [
        'Java中异常链使用哪个方法获取原因？',
        ['getCause', 'getRootCause', 'findCause', 'searchCause'],
        0,
      ],
      [
        'Java中printStackTrace()方法的作用是？',
        ['打印异常堆栈', '打印异常消息', '打印异常原因', '打印异常类型'],
        0,
      ],
      [
        'Java中getMessage()方法的作用是？',
        ['获取异常消息', '获取异常堆栈', '获取异常原因', '获取异常类型'],
        0,
      ],
      [
        'Java中getStackTrace()方法的作用是？',
        ['获取异常堆栈数组', '获取异常消息', '获取异常原因', '获取异常类型'],
        0,
      ],
      [
        'Java中常见受检异常有？',
        [
          'IOException, SQLException',
          'NullPointerException, ArrayIndexOutOfBoundsException',
          'OutOfMemoryError, StackOverflowError',
          '以上都是',
        ],
        0,
      ],
      [
        'Java中常见非受检异常有？',
        [
          'NullPointerException, ClassCastException',
          'IOException, SQLException',
          'OutOfMemoryError, StackOverflowError',
          '以上都是',
        ],
        0,
      ],
      [
        'Java中常见错误有？',
        [
          'OutOfMemoryError, StackOverflowError',
          'IOException, SQLException',
          'NullPointerException, ClassCastException',
          '以上都是',
        ],
        0,
      ],
      [
        'Java中NullPointerException发生的原因是？',
        ['调用null对象的方法', '数组越界', '类型转换错误', '内存不足'],
        0,
      ],
      [
        'Java中ArrayIndexOutOfBoundsException发生的原因是？',
        ['数组越界', '调用null对象的方法', '类型转换错误', '内存不足'],
        1,
      ],
      [
        'Java中ClassCastException发生的原因是？',
        ['类型转换错误', '调用null对象的方法', '数组越界', '内存不足'],
        0,
      ],
      [
        'Java中NumberFormatException发生的原因是？',
        ['数字格式错误', '调用null对象的方法', '数组越界', '内存不足'],
        0,
      ],
      [
        'Java中StackOverflowError发生的原因是？',
        ['递归调用过深', '内存不足', '数组越界', '类型转换错误'],
        0,
      ],
      [
        'Java中OutOfMemoryError发生的原因是？',
        ['内存不足', '递归调用过深', '数组越界', '类型转换错误'],
        0,
      ],
      [
        'Java中ArithmeticException发生的原因是？',
        ['数学运算错误', '调用null对象的方法', '数组越界', '内存不足'],
        0,
      ],
      [
        'Java中IllegalArgumentException发生的原因是？',
        ['非法参数', '调用null对象的方法', '数组越界', '内存不足'],
        0,
      ],
      [
        'Java中IllegalStateException发生的原因是？',
        ['非法状态', '调用null对象的方法', '数组越界', '内存不足'],
        0,
      ],
      [
        'Java中ConcurrentModificationException发生的原因是？',
        ['并发修改集合', '调用null对象的方法', '数组越界', '内存不足'],
        0,
      ],
      [
        'Java中UnsupportedOperationException发生的原因是？',
        ['不支持的操作', '调用null对象的方法', '数组越界', '内存不足'],
        0,
      ],
      [
        'Java中IOException发生的原因是？',
        ['输入输出错误', '调用null对象的方法', '数组越界', '内存不足'],
        0,
      ],
      [
        'Java中FileNotFoundException发生的原因是？',
        ['文件不存在', '调用null对象的方法', '数组越界', '内存不足'],
        0,
      ],
      [
        'Java中SQLException发生的原因是？',
        ['数据库错误', '调用null对象的方法', '数组越界', '内存不足'],
        0,
      ],
      [
        'Java中ClassNotFoundException发生的原因是？',
        ['类找不到', '调用null对象的方法', '数组越界', '内存不足'],
        0,
      ],
      [
        'Java中CloneNotSupportedException发生的原因是？',
        ['不支持克隆', '调用null对象的方法', '数组越界', '内存不足'],
        0,
      ],
      [
        'Java中InterruptedException发生的原因是？',
        ['线程中断', '调用null对象的方法', '数组越界', '内存不足'],
        0,
      ],
      [
        'Java中反射获取类的方式有？',
        [
          'Class.forName(), 对象.getClass(), 类.class',
          'Class.load(), 对象.loadClass()',
          'Class.find(), 对象.findClass()',
          '以上都不对',
        ],
        0,
      ],
      [
        'Java中反射创建对象的方式有？',
        ['newInstance(), 构造器.newInstance()', 'new(), create()', 'build(), make()', '以上都不对'],
        0,
      ],
      [
        'Java中反射获取方法的方式有？',
        [
          'getMethod(), getMethods()',
          'findMethod(), findMethods()',
          'searchMethod(), searchMethods()',
          '以上都不对',
        ],
        0,
      ],
      [
        'Java中反射获取字段的方式有？',
        [
          'getField(), getFields()',
          'findField(), findFields()',
          'searchField(), searchFields()',
          '以上都不对',
        ],
        0,
      ],
      ['Java中反射调用方法使用？', ['invoke()', 'call()', 'execute()', 'run()'], 0],
      ['Java中反射设置字段使用？', ['set()', 'put()', 'assign()', 'value()'], 0],
      ['Java中反射获取字段使用？', ['get()', 'read()', 'fetch()', 'obtain()'], 0],
      [
        'Java中反射可以访问私有成员吗？',
        ['可以，设置setAccessible(true)', '不可以', '只能访问公有', '取决于修饰符'],
        0,
      ],
      ['Java中反射的性能如何？', ['比直接调用慢', '比直接调用快', '一样快', '取决于JVM'], 0],
      ['Java中反射破坏了什么特性？', ['封装性', '继承性', '多态性', '抽象性'], 0],
      [
        'Java中注解的生命周期有？',
        [
          'SOURCE, CLASS, RUNTIME',
          'COMPILE, RUNTIME, DEPLOY',
          'SOURCE, BINARY, EXECUTE',
          '以上都不对',
        ],
        0,
      ],
      [
        'Java中注解的目标有？',
        [
          'TYPE, FIELD, METHOD',
          'CLASS, VARIABLE, FUNCTION',
          'PACKAGE, MODULE, INTERFACE',
          '以上都不对',
        ],
        0,
      ],
      [
        'Java中@Override注解的作用是？',
        ['标记重写方法', '标记重载方法', '标记过时方法', '标记废弃方法'],
        0,
      ],
      [
        'Java中@Deprecated注解的作用是？',
        ['标记过时方法', '标记重写方法', '标记重载方法', '标记废弃方法'],
        0,
      ],
      [
        'Java中@SuppressWarnings注解的作用是？',
        ['抑制警告', '产生警告', '标记警告', '处理警告'],
        0,
      ],
      [
        'Java中@FunctionalInterface注解的作用是？',
        ['标记函数式接口', '标记过时接口', '标记废弃接口', '标记新接口'],
        0,
      ],
      ['Java中自定义注解使用什么关键字？', ['@interface', 'interface', 'annotation', 'define'], 0],
      ['Java中注解可以有属性吗？', ['可以', '不可以', '只能有值', '取决于类型'], 0],
      [
        'Java中注解的属性类型有限制吗？',
        [
          '有，只能是基本类型、String、Class、枚举、注解及数组',
          '没有限制',
          '只能是基本类型',
          '只能是String',
        ],
        0,
      ],
      [
        'Java中注解的属性默认值如何设置？',
        ['default 关键字', 'default 方法', 'constructor', 'setter'],
        0,
      ],
      ['Java中元注解是指？', ['注解的注解', '基本注解', '自定义注解', '标准注解'], 0],
      [
        'Java中@Retention元注解的作用是？',
        ['指定注解保留策略', '指定注解目标', '指定注解继承', '指定注解文档'],
        0,
      ],
      [
        'Java中@Target元注解的作用是？',
        ['指定注解目标', '指定注解保留策略', '指定注解继承', '指定注解文档'],
        0,
      ],
      [
        'Java中@Documented元注解的作用是？',
        ['指定注解包含在文档中', '指定注解保留策略', '指定注解目标', '指定注解继承'],
        0,
      ],
      [
        'Java中@Inherited元注解的作用是？',
        ['指定注解可以继承', '指定注解包含在文档中', '指定注解保留策略', '指定注解目标'],
        0,
      ],
      [
        'Java中@Repeatable元注解的作用是？',
        ['指定注解可以重复', '指定注解可以继承', '指定注解包含在文档中', '指定注解保留策略'],
        0,
      ],
      ['Java中泛型的作用是？', ['类型安全，避免类型转换', '提高性能', '简化代码', '以上都不对'], 0],
      [
        'Java中泛型擦除是指？',
        ['编译后泛型信息被擦除', '运行时泛型信息被擦除', '编译前泛型信息被擦除', '以上都不对'],
        0,
      ],
      [
        'Java中泛型擦除后变成什么类型？',
        ['Object或上界类型', '原类型', '下界类型', '以上都不对'],
        0,
      ],
      ['Java中泛型上界使用什么关键字？', ['extends', 'super', 'implements', 'instanceof'], 0],
      ['Java中泛型下界使用什么关键字？', ['super', 'extends', 'implements', 'instanceof'], 0],
      ['Java中泛型通配符是？', ['?', '*', '+', '-'], 0],
      [
        'Java中泛型通配符上界是？',
        ['? extends T', '? super T', '? implements T', '? instanceof T'],
        0,
      ],
      [
        'Java中泛型通配符下界是？',
        ['? super T', '? extends T', '? implements T', '? instanceof T'],
        0,
      ],
      [
        'Java中PECS原则是？',
        [
          'Producer Extends, Consumer Super',
          'Producer Super, Consumer Extends',
          'Both Extends',
          'Both Super',
        ],
        0,
      ],
      [
        'Java中泛型方法如何定义？',
        [
          '修饰符 <T> 返回类型 方法名',
          '修饰符 返回类型 <T> 方法名',
          '<T> 修饰符 返回类型 方法名',
          '以上都不对',
        ],
        0,
      ],
      [
        'Java中泛型类如何定义？',
        ['class 类名<T>', 'class <T> 类名', '<T> class 类名', '以上都不对'],
        0,
      ],
      [
        'Java中泛型接口如何定义？',
        ['interface 接口名<T>', 'interface <T> 接口名', '<T> interface 接口名', '以上都不对'],
        0,
      ],
      ['Java中泛型不能使用哪些类型？', ['基本类型', '引用类型', '数组类型', '以上都不对'], 0],
      ['Java中泛型不能实例化吗？', ['不能，因为类型擦除', '能', '部分能', '取决于类型'], 0],
      [
        'Java中泛型不能创建数组吗？',
        ['不能，因为类型擦除和数组协变', '能', '部分能', '取决于类型'],
        0,
      ],
      ['Java中泛型不能用于instanceof吗？', ['不能，因为类型擦除', '能', '部分能', '取决于类型'], 0],
      [
        'Java中泛型不能用于静态上下文吗？',
        ['不能，因为泛型是实例级别的', '能', '部分能', '取决于类型'],
        0,
      ],
      ['Java中泛型不能抛出或捕获吗？', ['不能，因为类型擦除', '能', '部分能', '取决于类型'], 0],
      ['Java中泛型可以重载吗？', ['不能，因为类型擦除后签名相同', '能', '部分能', '取决于类型'], 0],
      [
        'Java中如何获取泛型的具体类型？',
        ['通过反射获取ParameterizedType', '无法获取', '通过instanceof', '通过getClass'],
        0,
      ],
      ['Java中集合的根接口是？', ['Collection', 'Collections', 'List', 'Set'], 0],
      [
        'Java中List接口的特点是？',
        ['有序，可重复', '无序，不可重复', '有序，不可重复', '无序，可重复'],
        0,
      ],
      [
        'Java中Set接口的特点是？',
        ['无序，不可重复', '有序，可重复', '有序，不可重复', '无序，可重复'],
        0,
      ],
      [
        'Java中Map接口的特点是？',
        ['键值对，键不可重复', '键值对，键可重复', '单值，不可重复', '单值，可重复'],
        0,
      ],
      [
        'Java中ArrayList的特点是？',
        ['数组实现，查询快', '链表实现，增删快', '哈希实现，查找快', '树实现，排序快'],
        0,
      ],
      [
        'Java中LinkedList的特点是？',
        ['链表实现，增删快', '数组实现，查询快', '哈希实现，查找快', '树实现，排序快'],
        1,
      ],
      [
        'Java中HashSet的特点是？',
        ['哈希实现，查找快', '链表实现，增删快', '数组实现，查询快', '树实现，排序快'],
        0,
      ],
      [
        'Java中TreeSet的特点是？',
        ['树实现，排序快', '链表实现，增删快', '数组实现，查询快', '哈希实现，查找快'],
        0,
      ],
      [
        'Java中HashMap的特点是？',
        ['哈希实现，查找快', '链表实现，增删快', '数组实现，查询快', '树实现，排序快'],
        0,
      ],
      [
        'Java中TreeMap的特点是？',
        ['树实现，排序快', '链表实现，增删快', '数组实现，查询快', '哈希实现，查找快'],
        0,
      ],
      [
        'Java中LinkedHashMap的特点是？',
        ['哈希+链表实现，保持插入顺序', '纯链表实现', '纯哈希实现', '树实现'],
        0,
      ],
      [
        'Java中LinkedHashSet的特点是？',
        ['哈希+链表实现，保持插入顺序', '纯链表实现', '纯哈希实现', '树实现'],
        0,
      ],
      [
        'Java中Vector的特点是？',
        [
          '线程安全的ArrayList',
          '线程不安全的ArrayList',
          '线程安全的LinkedList',
          '线程不安全的LinkedList',
        ],
        0,
      ],
      [
        'Java中Hashtable的特点是？',
        ['线程安全的HashMap', '线程不安全的HashMap', '线程安全的TreeMap', '线程不安全的TreeMap'],
        0,
      ],
      [
        'Java中Properties的特点是？',
        [
          '键值都是String的Hashtable',
          '键值都是Object的HashMap',
          '键值都是Integer的TreeMap',
          '键值都是String的LinkedHashMap',
        ],
        0,
      ],
      ['Java中Stack的特点是？', ['后进先出', '先进先出', '随机访问', '双端访问'], 0],
      ['Java中Queue的特点是？', ['先进先出', '后进先出', '随机访问', '双端访问'], 0],
      ['Java中Deque的特点是？', ['双端队列', '单端队列', '阻塞队列', '非阻塞队列'], 0],
      ['Java中PriorityQueue的特点是？', ['优先级队列', '普通队列', '阻塞队列', '双端队列'], 0],
      [
        'Java中ArrayDeque的特点是？',
        ['数组实现的双端队列', '链表实现的双端队列', '哈希实现的双端队列', '树实现的双端队列'],
        0,
      ],
      ['Java中Collections类的作用是？', ['集合工具类', '集合接口', '集合实现', '集合抽象类'], 0],
      ['Java中Arrays类的作用是？', ['数组工具类', '集合工具类', '列表工具类', '映射工具类'], 0],
      [
        'Java中Comparable接口的作用是？',
        ['定义自然排序', '定义比较器排序', '定义相等比较', '定义哈希比较'],
        0,
      ],
      [
        'Java中Comparator接口的作用是？',
        ['定义比较器排序', '定义自然排序', '定义相等比较', '定义哈希比较'],
        0,
      ],
      [
        'Java中Iterable接口的作用是？',
        ['定义迭代能力', '定义比较能力', '定义克隆能力', '定义序列化能力'],
        0,
      ],
      [
        'Java中Iterator接口的作用是？',
        ['定义迭代器', '定义比较器', '定义克隆器', '定义序列化器'],
        0,
      ],
      [
        'Java中ListIterator接口的作用是？',
        ['定义列表迭代器', '定义集合迭代器', '定义映射迭代器', '定义数组迭代器'],
        0,
      ],
      [
        'Java中fail-fast机制是指？',
        ['并发修改时快速失败', '内存不足时快速失败', '类型错误时快速失败', '空指针时快速失败'],
        0,
      ],
      [
        'Java中fail-safe机制是指？',
        ['并发修改时安全失败', '内存不足时安全失败', '类型错误时安全失败', '空指针时安全失败'],
        0,
      ],
    ];
    const item = items[(i - 241) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }
  // ==================== 第四部分：集合框架 (361-480) ====================
  for (let i = 361; i <= 480; i++) {
    const q = { id: `java-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      ['Java中ArrayList的初始容量是？', ['10', '0', '16', '20'], 0],
      ['Java中ArrayList的扩容机制是？', ['1.5倍', '2倍', '1倍', '0.5倍'], 0],
      ['Java中ArrayList的随机访问时间复杂度是？', ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], 0],
      ['Java中ArrayList的插入时间复杂度是？', ['O(n)', 'O(1)', 'O(log n)', 'O(n log n)'], 0],
      ['Java中LinkedList的随机访问时间复杂度是？', ['O(n)', 'O(1)', 'O(log n)', 'O(n log n)'], 0],
      ['Java中LinkedList的插入时间复杂度是？', ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'], 0],
      ['Java中HashMap的默认初始容量是？', ['16', '10', '32', '64'], 0],
      ['Java中HashMap的默认负载因子是？', ['0.75', '0.5', '0.8', '1.0'], 0],
      ['Java中HashMap的扩容机制是？', ['2倍', '1.5倍', '1倍', '0.5倍'], 0],
      ['Java中HashMap的链表转红黑树阈值是？', ['8', '6', '4', '10'], 0],
      ['Java中HashMap的红黑树转链表阈值是？', ['6', '8', '4', '10'], 0],
      ['Java中HashMap的树化最小容量是？', ['64', '32', '16', '128'], 0],
      [
        'Java中HashMap的hash方法作用是？',
        ['扰动函数，减少碰撞', '加密哈希', '生成随机数', '计算索引'],
        0,
      ],
      [
        'Java中HashMap的put过程是？',
        [
          'hash -> 定位桶 -> 链表/树 -> 插入/更新',
          '定位桶 -> hash -> 插入/更新',
          '插入 -> hash -> 定位桶',
          '更新 -> 定位桶 -> hash',
        ],
        0,
      ],
      [
        'Java中HashMap的get过程是？',
        [
          'hash -> 定位桶 -> 遍历链表/树',
          '定位桶 -> hash -> 遍历',
          '遍历 -> hash -> 定位桶',
          '定位桶 -> 遍历 -> hash',
        ],
        0,
      ],
      [
        'Java中HashMap的resize过程是？',
        ['创建新数组 -> 重新hash分配', '在原数组上扩容', '复制原数组', '以上都不对'],
        0,
      ],
      [
        'Java中HashMap为什么不是线程安全的？',
        ['并发put可能导致数据丢失或死循环', '没有加锁', '没有volatile', '以上都不对'],
        0,
      ],
      [
        'Java中ConcurrentHashMap的实现原理是？',
        ['分段锁或CAS+synchronized', '全表锁', '读写锁', '乐观锁'],
        0,
      ],
      [
        'Java中ConcurrentHashMap的并发度是？',
        ['取决于并发级别或桶数量', '固定16', '固定32', '无限'],
        0,
      ],
      [
        'Java中ConcurrentHashMap的null键和null值？',
        ['都不允许', '允许null键', '允许null值', '都允许'],
        0,
      ],
      [
        'Java中HashMap允许null键和null值吗？',
        ['都允许', '都不允许', '允许null键', '允许null值'],
        0,
      ],
      [
        'Java中Hashtable允许null键和null值吗？',
        ['都不允许', '都允许', '允许null键', '允许null值'],
        0,
      ],
      ['Java中HashSet的底层实现是？', ['HashMap', 'TreeMap', 'LinkedHashMap', 'Hashtable'], 0],
      ['Java中TreeSet的底层实现是？', ['TreeMap', 'HashMap', 'LinkedHashMap', 'Hashtable'], 0],
      [
        'Java中LinkedHashSet的底层实现是？',
        ['LinkedHashMap', 'HashMap', 'TreeMap', 'Hashtable'],
        0,
      ],
      ['Java中ArrayList的底层实现是？', ['Object数组', '链表', '哈希表', '红黑树'], 0],
      ['Java中LinkedList的底层实现是？', ['双向链表', '单向链表', '数组', '哈希表'], 0],
      ['Java中Vector的底层实现是？', ['Object数组', '链表', '哈希表', '红黑树'], 0],
      ['Java中Stack的底层实现是？', ['Object数组', '链表', '哈希表', '红黑树'], 0],
      ['Java中PriorityQueue的底层实现是？', ['小顶堆', '大顶堆', '链表', '哈希表'], 0],
      ['Java中ArrayDeque的底层实现是？', ['循环数组', '链表', '哈希表', '红黑树'], 0],
      [
        'Java中Collections.sort()的底层算法是？',
        ['TimSort', 'QuickSort', 'MergeSort', 'HeapSort'],
        0,
      ],
      [
        'Java中Arrays.sort()的底层算法是？',
        ['DualPivotQuicksort', 'QuickSort', 'MergeSort', 'HeapSort'],
        0,
      ],
      [
        'Java中Collections.synchronizedList()的作用是？',
        ['创建线程安全的List', '创建不可变List', '创建同步List', '创建排序List'],
        0,
      ],
      [
        'Java中Collections.unmodifiableList()的作用是？',
        ['创建不可变List', '创建线程安全List', '创建同步List', '创建排序List'],
        0,
      ],
      [
        'Java中Collections.emptyList()的作用是？',
        ['创建空List', '创建不可变List', '创建线程安全List', '创建同步List'],
        0,
      ],
      [
        'Java中Collections.singletonList()的作用是？',
        ['创建单元素List', '创建空List', '创建不可变List', '创建同步List'],
        0,
      ],
      [
        'Java中List的subList()方法的特点是？',
        ['返回原List的视图', '返回新List', '返回不可变List', '返回同步List'],
        0,
      ],
      ['Java中Map的entrySet()方法返回？', ['键值对Set', '键Set', '值Collection', '键值对List'], 0],
      ['Java中Map的keySet()方法返回？', ['键Set', '键值对Set', '值Collection', '键值对List'], 1],
      ['Java中Map的values()方法返回？', ['值Collection', '键Set', '键值对Set', '键值对List'], 0],
      [
        'Java中Map的getOrDefault()方法作用是？',
        ['获取值或默认值', '获取值', '设置默认值', '判断是否包含'],
        0,
      ],
      ['Java中Map的forEach()方法作用是？', ['遍历Map', '过滤Map', '转换Map', '排序Map'], 0],
      [
        'Java中Map的putIfAbsent()方法作用是？',
        ['不存在时插入', '存在时插入', '总是插入', '删除后插入'],
        0,
      ],
      [
        'Java中Map的computeIfAbsent()方法作用是？',
        ['不存在时计算并插入', '存在时计算', '总是计算', '删除后计算'],
        0,
      ],
      [
        'Java中Map的computeIfPresent()方法作用是？',
        ['存在时计算并更新', '不存在时计算', '总是计算', '删除后计算'],
        0,
      ],
      ['Java中Map的merge()方法作用是？', ['合并值', '合并键', '合并Map', '替换值'], 0],
      ['Java中Map的replace()方法作用是？', ['替换值', '替换键', '替换Map', '合并值'], 0],
      [
        'Java中Map的replaceAll()方法作用是？',
        ['替换所有值', '替换所有键', '替换所有Map', '合并所有值'],
        0,
      ],
      [
        'Java中Map的remove()方法重载版本作用是？',
        ['条件删除', '无条件删除', '批量删除', '延迟删除'],
        0,
      ],
      [
        'Java中Comparable和Comparator的区别是？',
        [
          'Comparable在类内实现，Comparator在类外实现',
          'Comparable在类外实现，Comparator在类内实现',
          '无区别',
          '取决于场景',
        ],
        0,
      ],
      [
        'Java中Comparable的compareTo()方法返回？',
        ['负数、零、正数', 'true、false', '0、1', '-1、0、1'],
        0,
      ],
      [
        'Java中Comparator的compare()方法返回？',
        ['负数、零、正数', 'true、false', '0、1', '-1、0、1'],
        0,
      ],
      [
        'Java中Iterator的remove()方法作用是？',
        ['删除当前元素', '删除下一个元素', '删除上一个元素', '删除所有元素'],
        0,
      ],
      [
        'Java中Iterator的hasNext()方法作用是？',
        ['判断是否有下一个元素', '获取下一个元素', '删除下一个元素', '跳过下一个元素'],
        0,
      ],
      [
        'Java中Iterator的next()方法作用是？',
        ['获取下一个元素', '判断是否有下一个元素', '删除下一个元素', '跳过下一个元素'],
        0,
      ],
      [
        'Java中ListIterator的previous()方法作用是？',
        ['获取上一个元素', '获取下一个元素', '删除上一个元素', '跳过上一个元素'],
        0,
      ],
      [
        'Java中ListIterator的hasPrevious()方法作用是？',
        ['判断是否有上一个元素', '判断是否有下一个元素', '删除上一个元素', '跳过上一个元素'],
        0,
      ],
      [
        'Java中ListIterator的add()方法作用是？',
        ['添加元素', '删除元素', '修改元素', '替换元素'],
        0,
      ],
      [
        'Java中ListIterator的set()方法作用是？',
        ['修改元素', '添加元素', '删除元素', '替换元素'],
        0,
      ],
      [
        'Java中ListIterator的nextIndex()方法作用是？',
        ['获取下一个索引', '获取上一个索引', '获取当前索引', '获取最后索引'],
        0,
      ],
      [
        'Java中ListIterator的previousIndex()方法作用是？',
        ['获取上一个索引', '获取下一个索引', '获取当前索引', '获取最后索引'],
        1,
      ],
      [
        'Java中集合的遍历方式有？',
        ['for, foreach, Iterator, Stream', 'while, do-while', '递归', '以上都不对'],
        0,
      ],
      ['Java中集合转数组的方法是？', ['toArray()', 'asList()', 'toList()', 'toArray(T[])'], 0],
      [
        'Java中数组转集合的方法是？',
        ['Arrays.asList()', 'toList()', 'fromArray()', 'Collections.addAll()'],
        0,
      ],
      [
        'Java中Arrays.asList()的特点是？',
        ['返回固定大小的List', '返回可变List', '返回不可变List', '返回同步List'],
        0,
      ],
      [
        'Java中如何创建不可变集合？',
        [
          'Collections.unmodifiableXxx, List.of(), Map.of()',
          'new ArrayList()',
          'new HashMap()',
          '以上都不对',
        ],
        0,
      ],
      [
        'Java中List.of()的特点是？',
        ['不可变，不允许null', '可变，允许null', '不可变，允许null', '可变，不允许null'],
        0,
      ],
      [
        'Java中Map.of()的特点是？',
        ['不可变，不允许null', '可变，允许null', '不可变，允许null', '可变，不允许null'],
        0,
      ],
      [
        'Java中Set.of()的特点是？',
        ['不可变，不允许null', '可变，允许null', '不可变，允许null', '可变，不允许null'],
        0,
      ],
      [
        'Java中Stream的特点是？',
        ['函数式操作，惰性求值', '命令式操作，立即求值', '面向对象操作', '以上都不对'],
        0,
      ],
      [
        'Java中Stream的创建方式有？',
        [
          'Collection.stream(), Stream.of(), Arrays.stream()',
          'new Stream()',
          'Stream.create()',
          '以上都不对',
        ],
        0,
      ],
      [
        'Java中Stream的中间操作有？',
        [
          'filter, map, flatMap, sorted',
          'forEach, collect, count',
          'reduce, findFirst',
          '以上都不对',
        ],
        0,
      ],
      [
        'Java中Stream的终端操作有？',
        [
          'forEach, collect, count, reduce',
          'filter, map, flatMap',
          'sorted, distinct',
          '以上都不对',
        ],
        0,
      ],
      ['Java中Stream的filter()方法作用是？', ['过滤元素', '转换元素', '排序元素', '去重元素'], 0],
      ['Java中Stream的map()方法作用是？', ['转换元素', '过滤元素', '排序元素', '去重元素'], 0],
      [
        'Java中Stream的flatMap()方法作用是？',
        ['扁平化转换元素', '过滤元素', '排序元素', '去重元素'],
        0,
      ],
      ['Java中Stream的sorted()方法作用是？', ['排序元素', '过滤元素', '转换元素', '去重元素'], 0],
      ['Java中Stream的distinct()方法作用是？', ['去重元素', '过滤元素', '转换元素', '排序元素'], 0],
      [
        'Java中Stream的limit()方法作用是？',
        ['限制元素数量', '跳过元素', '排序元素', '去重元素'],
        0,
      ],
      ['Java中Stream的skip()方法作用是？', ['跳过元素', '限制元素数量', '排序元素', '去重元素'], 0],
      [
        'Java中Stream的peek()方法作用是？',
        ['查看元素但不消费', '消费元素', '过滤元素', '转换元素'],
        0,
      ],
      [
        'Java中Stream的forEach()方法作用是？',
        ['消费元素', '查看元素但不消费', '过滤元素', '转换元素'],
        0,
      ],
      [
        'Java中Stream的collect()方法作用是？',
        ['收集元素到集合', '消费元素', '过滤元素', '转换元素'],
        0,
      ],
      ['Java中Stream的reduce()方法作用是？', ['聚合元素', '收集元素', '过滤元素', '转换元素'], 0],
      [
        'Java中Stream的count()方法作用是？',
        ['计算元素数量', '收集元素', '过滤元素', '转换元素'],
        0,
      ],
      [
        'Java中Stream的findFirst()方法作用是？',
        ['找到第一个元素', '找到任意元素', '找到最后元素', '找到所有元素'],
        0,
      ],
      [
        'Java中Stream的findAny()方法作用是？',
        ['找到任意元素', '找到第一个元素', '找到最后元素', '找到所有元素'],
        0,
      ],
      [
        'Java中Stream的anyMatch()方法作用是？',
        ['判断是否有元素匹配', '判断是否所有元素匹配', '判断是否没有元素匹配', '找到匹配元素'],
        0,
      ],
      [
        'Java中Stream的allMatch()方法作用是？',
        ['判断是否所有元素匹配', '判断是否有元素匹配', '判断是否没有元素匹配', '找到匹配元素'],
        0,
      ],
      [
        'Java中Stream的noneMatch()方法作用是？',
        ['判断是否没有元素匹配', '判断是否有元素匹配', '判断是否所有元素匹配', '找到匹配元素'],
        0,
      ],
      ['Java中Stream的toArray()方法作用是？', ['转为数组', '转为集合', '转为列表', '转为映射'], 0],
      [
        'Java中Stream的min()方法作用是？',
        ['找到最小元素', '找到最大元素', '排序元素', '去重元素'],
        0,
      ],
      [
        'Java中Stream的max()方法作用是？',
        ['找到最大元素', '找到最小元素', '排序元素', '去重元素'],
        0,
      ],
      [
        'Java中Collectors.toList()的作用是？',
        ['收集到List', '收集到Set', '收集到Map', '收集到String'],
        0,
      ],
      [
        'Java中Collectors.toSet()的作用是？',
        ['收集到Set', '收集到List', '收集到Map', '收集到String'],
        0,
      ],
      [
        'Java中Collectors.toMap()的作用是？',
        ['收集到Map', '收集到List', '收集到Set', '收集到String'],
        0,
      ],
      ['Java中Collectors.groupingBy()的作用是？', ['分组', '分区', '拼接', '计数'], 0],
      ['Java中Collectors.partitioningBy()的作用是？', ['分区', '分组', '拼接', '计数'], 0],
      ['Java中Collectors.joining()的作用是？', ['拼接字符串', '分组', '分区', '计数'], 0],
      ['Java中Collectors.counting()的作用是？', ['计数', '分组', '分区', '拼接'], 0],
      ['Java中Collectors.summarizingInt()的作用是？', ['统计信息', '求和', '平均', '最大值'], 0],
      ['Java中Collectors.averagingInt()的作用是？', ['求平均', '求和', '统计信息', '最大值'], 0],
      ['Java中Collectors.summingInt()的作用是？', ['求和', '求平均', '统计信息', '最大值'], 0],
      ['Java中Collectors.maxBy()的作用是？', ['求最大值', '求最小值', '求和', '求平均'], 0],
      ['Java中Collectors.minBy()的作用是？', ['求最小值', '求最大值', '求和', '求平均'], 1],
      ['Java中Collectors.reducing()的作用是？', ['归约', '分组', '分区', '拼接'], 0],
      [
        'Java中Collectors.collectingAndThen()的作用是？',
        ['收集后转换', '收集前转换', '收集中转换', '以上都不对'],
        0,
      ],
      [
        'Java中Collectors.mapping()的作用是？',
        ['收集时映射', '收集后映射', '收集前映射', '以上都不对'],
        0,
      ],
      [
        'Java中Collectors.flatMapping()的作用是？',
        ['收集时扁平映射', '收集时映射', '收集后映射', '以上都不对'],
        0,
      ],
      [
        'Java中Collectors.filtering()的作用是？',
        ['收集时过滤', '收集后过滤', '收集前过滤', '以上都不对'],
        0,
      ],
      [
        'Java中Collectors.toUnmodifiableList()的作用是？',
        ['收集到不可变List', '收集到List', '收集到Set', '收集到Map'],
        0,
      ],
      [
        'Java中Collectors.toUnmodifiableSet()的作用是？',
        ['收集到不可变Set', '收集到Set', '收集到List', '收集到Map'],
        0,
      ],
      [
        'Java中Collectors.toUnmodifiableMap()的作用是？',
        ['收集到不可变Map', '收集到Map', '收集到List', '收集到Set'],
        0,
      ],
      ['Java中Stream是惰性求值吗？', ['是', '否', '部分是', '取决于操作'], 0],
      ['Java中Stream可以复用吗？', ['不可以', '可以', '部分可以', '取决于操作'], 0],
      ['Java中ParallelStream是并行流吗？', ['是', '否', '部分是', '取决于操作'], 0],
      [
        'Java中ParallelStream的底层是？',
        ['ForkJoinPool', 'ThreadPoolExecutor', 'Stream', 'CompletableFuture'],
        0,
      ],
      ['Java中ParallelStream适合什么场景？', ['CPU密集型', 'IO密集型', '混合型', '以上都不对'], 0],
      [
        'Java中Stream的短路操作有？',
        ['findFirst, anyMatch', 'filter, map', 'sorted, distinct', 'collect, count'],
        0,
      ],
      [
        'Java中Stream的非短路操作有？',
        ['sorted, distinct', 'findFirst, anyMatch', 'limit, skip', 'collect, count'],
        0,
      ],
      ['Java中Stream的有序性是？', ['取决于源', '总是有序', '总是无序', '取决于操作'], 0],
      [
        'Java中Stream的并发修改会怎样？',
        ['抛出ConcurrentModificationException', '结果不确定', '正常执行', '以上都不对'],
        0,
      ],
    ];
    const item = items[(i - 361) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }
  // ==================== 第五部分：多线程与并发 (481-600) ====================
  for (let i = 481; i <= 600; i++) {
    const q = { id: `java-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'Java中创建线程的方式有？',
        [
          '继承Thread, 实现Runnable, 实现Callable',
          '继承Runnable, 实现Thread',
          'new Thread()',
          '以上都不对',
        ],
        0,
      ],
      ['Java中Thread类的start()方法作用是？', ['启动线程', '运行线程', '创建线程', '销毁线程'], 0],
      ['Java中Thread类的run()方法作用是？', ['线程执行体', '启动线程', '创建线程', '销毁线程'], 0],
      ['Java中Thread类的sleep()方法作用是？', ['休眠线程', '等待线程', '唤醒线程', '中断线程'], 0],
      [
        'Java中Thread类的join()方法作用是？',
        ['等待线程结束', '休眠线程', '唤醒线程', '中断线程'],
        0,
      ],
      [
        'Java中Thread类的interrupt()方法作用是？',
        ['中断线程', '休眠线程', '唤醒线程', '等待线程'],
        0,
      ],
      [
        'Java中Thread类的yield()方法作用是？',
        ['让出CPU时间', '休眠线程', '唤醒线程', '中断线程'],
        0,
      ],
      [
        'Java中Thread类的setDaemon()方法作用是？',
        ['设置守护线程', '设置优先级', '设置线程名', '设置线程组'],
        0,
      ],
      [
        'Java中Thread类的setPriority()方法作用是？',
        ['设置优先级', '设置守护线程', '设置线程名', '设置线程组'],
        0,
      ],
      [
        'Java中Thread类的getState()方法作用是？',
        ['获取线程状态', '设置线程状态', '判断线程存活', '判断线程中断'],
        0,
      ],
      [
        'Java中线程的状态有？',
        [
          'NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED',
          'NEW, RUNNING, BLOCKED, DEAD',
          'READY, RUNNING, BLOCKED, WAITING',
          '以上都不对',
        ],
        0,
      ],
      [
        'Java中synchronized关键字的作用是？',
        ['同步方法或代码块', '异步方法或代码块', '创建线程', '销毁线程'],
        0,
      ],
      [
        'Java中synchronized锁的对象是？',
        ['对象实例或Class对象', '基本类型', '局部变量', '以上都不对'],
        0,
      ],
      [
        'Java中synchronized修饰实例方法锁的是？',
        ['当前实例对象', 'Class对象', '任意对象', '以上都不对'],
        0,
      ],
      [
        'Java中synchronized修饰静态方法锁的是？',
        ['Class对象', '当前实例对象', '任意对象', '以上都不对'],
        0,
      ],
      [
        'Java中synchronized修饰代码块锁的是？',
        ['指定对象', '当前实例对象', 'Class对象', '以上都不对'],
        0,
      ],
      [
        'Java中synchronized的特性是？',
        ['原子性，可见性，有序性', '仅原子性', '仅可见性', '仅有序性'],
        0,
      ],
      [
        'Java中synchronized的实现原理是？',
        ['Monitor指令', 'CAS操作', 'LockSupport', '以上都不对'],
        0,
      ],
      [
        'Java中synchronized的锁升级过程是？',
        [
          '无锁 -> 偏向锁 -> 轻量级锁 -> 重量级锁',
          '无锁 -> 轻量级锁 -> 偏向锁 -> 重量级锁',
          '偏向锁 -> 无锁 -> 轻量级锁 -> 重量级锁',
          '以上都不对',
        ],
        0,
      ],
      [
        'Java中偏向锁的作用是？',
        [
          '优化只有一个线程访问的锁',
          '优化多个线程交替访问的锁',
          '优化多个线程同时访问的锁',
          '以上都不对',
        ],
        0,
      ],
      [
        'Java中轻量级锁的作用是？',
        [
          '优化多个线程交替访问的锁',
          '优化只有一个线程访问的锁',
          '优化多个线程同时访问的锁',
          '以上都不对',
        ],
        0,
      ],
      [
        'Java中重量级锁的作用是？',
        [
          '优化多个线程同时访问的锁',
          '优化只有一个线程访问的锁',
          '优化多个线程交替访问的锁',
          '以上都不对',
        ],
        0,
      ],
      ['Java中volatile关键字的作用是？', ['可见性，有序性', '原子性', '同步', '以上都不对'], 0],
      [
        'Java中volatile的可见性是指？',
        [
          '线程读取volatile变量时从主内存读',
          '线程读取volatile变量时从缓存读',
          '线程写入volatile变量时写缓存',
          '以上都不对',
        ],
        0,
      ],
      [
        'Java中volatile的有序性是指？',
        ['禁止指令重排序', '保证原子性', '保证可见性', '以上都不对'],
        0,
      ],
      ['Java中volatile能保证原子性吗？', ['不能', '能', '部分能', '取决于操作'], 0],
      ['Java中volatile的实现原理是？', ['内存屏障', 'Monitor指令', 'CAS操作', '以上都不对'], 0],
      [
        'Java中内存屏障的作用是？',
        ['禁止指令重排序和强制缓存刷新', '保证原子性', '保证同步', '以上都不对'],
        0,
      ],
      [
        'Java中CAS操作是指？',
        ['Compare And Swap', 'Check And Set', 'Compare And Set', 'Check And Swap'],
        0,
      ],
      [
        'Java中CAS的问题有？',
        ['ABA问题，自旋开销，只能单变量', '死锁问题', '内存泄漏', '以上都不对'],
        0,
      ],
      [
        'Java中ABA问题的解决方法是？',
        ['版本号或AtomicStampedReference', '加锁', 'volatile', '以上都不对'],
        0,
      ],
      ['Java中Atomic类的原理是？', ['CAS操作', 'synchronized', 'volatile', 'Lock'], 0],
      [
        'Java中AtomicInteger的作用是？',
        ['原子整数操作', '原子引用操作', '原子数组操作', '原子字段操作'],
        0,
      ],
      [
        'Java中AtomicReference的作用是？',
        ['原子引用操作', '原子整数操作', '原子数组操作', '原子字段操作'],
        0,
      ],
      [
        'Java中AtomicStampedReference的作用是？',
        ['解决ABA问题的原子引用', '原子整数操作', '原子数组操作', '原子字段操作'],
        0,
      ],
      [
        'Java中AtomicIntegerArray的作用是？',
        ['原子数组操作', '原子整数操作', '原子引用操作', '原子字段操作'],
        0,
      ],
      [
        'Java中AtomicIntegerFieldUpdater的作用是？',
        ['原子字段更新', '原子整数操作', '原子引用操作', '原子数组操作'],
        0,
      ],
      [
        'Java中LongAdder的作用是？',
        ['高并发累加', '原子整数操作', '原子引用操作', '原子数组操作'],
        0,
      ],
      [
        'Java中LongAccumulator的作用是？',
        ['高并发累积', '高并发累加', '原子整数操作', '原子引用操作'],
        0,
      ],
      ['Java中Lock接口的作用是？', ['显式锁', '隐式锁', '无锁', '以上都不对'], 0],
      ['Java中ReentrantLock的作用是？', ['可重入锁', '不可重入锁', '读写锁', '以上都不对'], 0],
      [
        'Java中ReentrantReadWriteLock的作用是？',
        ['读写锁', '可重入锁', '不可重入锁', '以上都不对'],
        0,
      ],
      ['Java中StampedLock的作用是？', ['乐观读锁', '读写锁', '可重入锁', '以上都不对'], 0],
      [
        'Java中Lock与synchronized的区别是？',
        [
          'Lock需手动释放，synchronized自动释放',
          'Lock自动释放，synchronized手动释放',
          '无区别',
          '取决于场景',
        ],
        0,
      ],
      [
        'Java中ReentrantLock的tryLock()方法作用是？',
        ['尝试获取锁', '阻塞获取锁', '释放锁', '以上都不对'],
        0,
      ],
      [
        'Java中ReentrantLock的lockInterruptibly()方法作用是？',
        ['可中断获取锁', '不可中断获取锁', '尝试获取锁', '释放锁'],
        0,
      ],
      [
        'Java中ReentrantLock的newCondition()方法作用是？',
        ['创建条件变量', '获取锁', '释放锁', '尝试获取锁'],
        0,
      ],
      ['Java中Condition的作用是？', ['条件等待/通知', '获取锁', '释放锁', '尝试获取锁'], 0],
      ['Java中Condition的await()方法作用是？', ['等待', '通知', '获取锁', '释放锁'], 0],
      ['Java中Condition的signal()方法作用是？', ['通知', '等待', '获取锁', '释放锁'], 0],
      ['Java中Condition的signalAll()方法作用是？', ['通知所有', '通知', '等待', '获取锁'], 0],
      [
        'Java中公平锁和非公平锁的区别是？',
        [
          '公平锁按顺序获取，非公平锁可插队',
          '公平锁可插队，非公平锁按顺序',
          '无区别',
          '取决于场景',
        ],
        0,
      ],
      ['Java中ReentrantLock默认是？', ['非公平锁', '公平锁', '读写锁', '以上都不对'], 0],
      [
        'Java中死锁的条件有？',
        [
          '互斥，持有并等待，不可抢占，循环等待',
          '互斥，持有并等待',
          '不可抢占，循环等待',
          '以上都不对',
        ],
        0,
      ],
      ['Java中如何避免死锁？', ['破坏死锁条件', '加锁', '解锁', '以上都不对'], 0],
      ['Java中如何检测死锁？', ['JConsole, JStack, ThreadMXBean', 'JMap', 'JStat', 'JInfo'], 0],
      ['Java中线程池的作用是？', ['重用线程，控制并发', '创建线程', '销毁线程', '以上都不对'], 0],
      [
        'Java中线程池的参数有？',
        [
          '核心线程数，最大线程数，存活时间，工作队列，线程工厂，拒绝策略',
          '核心线程数，最大线程数',
          '存活时间，工作队列',
          '以上都不对',
        ],
        0,
      ],
      [
        'Java中线程池的工作队列有？',
        [
          'ArrayBlockingQueue, LinkedBlockingQueue, SynchronousQueue',
          'ArrayList, LinkedList',
          'HashMap, TreeMap',
          '以上都不对',
        ],
        0,
      ],
      [
        'Java中线程池的拒绝策略有？',
        [
          'AbortPolicy, CallerRunsPolicy, DiscardPolicy, DiscardOldestPolicy',
          'ThrowExceptionPolicy',
          'IgnorePolicy',
          '以上都不对',
        ],
        0,
      ],
      [
        'Java中Executors.newFixedThreadPool()的特点是？',
        ['固定线程数，无界队列', '可变线程数', '单线程', '定时线程'],
        0,
      ],
      [
        'Java中Executors.newCachedThreadPool()的特点是？',
        ['可变线程数，同步队列', '固定线程数', '单线程', '定时线程'],
        0,
      ],
      [
        'Java中Executors.newSingleThreadExecutor()的特点是？',
        ['单线程，无界队列', '固定线程数', '可变线程数', '定时线程'],
        0,
      ],
      [
        'Java中Executors.newScheduledThreadPool()的特点是？',
        ['定时线程', '固定线程数', '可变线程数', '单线程'],
        0,
      ],
      [
        'Java中为什么不推荐使用Executors创建线程池？',
        ['队列可能OOM', '线程可能OOM', '性能差', '以上都不对'],
        0,
      ],
      [
        'Java中推荐如何创建线程池？',
        ['ThreadPoolExecutor构造方法', 'Executors工厂方法', 'new Thread()', '以上都不对'],
        0,
      ],
      [
        'Java中ThreadPoolExecutor的执行流程是？',
        [
          '核心线程 -> 队列 -> 非核心线程 -> 拒绝策略',
          '队列 -> 核心线程 -> 非核心线程',
          '非核心线程 -> 核心线程 -> 队列',
          '以上都不对',
        ],
        0,
      ],
      [
        'Java中ThreadPoolExecutor的shutdown()方法作用是？',
        ['平滑关闭', '立即关闭', '暂停', '重启'],
        0,
      ],
      [
        'Java中ThreadPoolExecutor的shutdownNow()方法作用是？',
        ['立即关闭', '平滑关闭', '暂停', '重启'],
        0,
      ],
      ['Java中Future的作用是？', ['获取异步结果', '提交任务', '取消任务', '以上都是'], 3],
      [
        'Java中FutureTask的作用是？',
        ['可取消的异步计算', '获取异步结果', '提交任务', '以上都是'],
        0,
      ],
      ['Java中CompletableFuture的作用是？', ['异步编程', '同步编程', '阻塞编程', '以上都不对'], 0],
      [
        'Java中CompletableFuture的supplyAsync()方法作用是？',
        ['有返回值的异步任务', '无返回值的异步任务', '同步任务', '以上都不对'],
        0,
      ],
      [
        'Java中CompletableFuture的runAsync()方法作用是？',
        ['无返回值的异步任务', '有返回值的异步任务', '同步任务', '以上都不对'],
        0,
      ],
      [
        'Java中CompletableFuture的thenApply()方法作用是？',
        ['转换结果', '消费结果', '组合结果', '以上都不对'],
        0,
      ],
      [
        'Java中CompletableFuture的thenAccept()方法作用是？',
        ['消费结果', '转换结果', '组合结果', '以上都不对'],
        0,
      ],
      [
        'Java中CompletableFuture的thenCompose()方法作用是？',
        ['组合结果', '转换结果', '消费结果', '以上都不对'],
        0,
      ],
      [
        'Java中CompletableFuture的thenCombine()方法作用是？',
        ['合并结果', '转换结果', '消费结果', '以上都不对'],
        0,
      ],
      [
        'Java中CompletableFuture的allOf()方法作用是？',
        ['等待所有完成', '等待任一完成', '应用所有', '以上都不对'],
        0,
      ],
      [
        'Java中CompletableFuture的anyOf()方法作用是？',
        ['等待任一完成', '等待所有完成', '应用任一', '以上都不对'],
        0,
      ],
      [
        'Java中CompletableFuture的exceptionally()方法作用是？',
        ['处理异常', '处理结果', '处理取消', '以上都不对'],
        0,
      ],
      [
        'Java中CompletableFuture的handle()方法作用是？',
        ['处理结果和异常', '处理结果', '处理异常', '以上都不对'],
        0,
      ],
      [
        'Java中CompletableFuture的whenComplete()方法作用是？',
        ['处理完成', '处理结果', '处理异常', '以上都不对'],
        0,
      ],
      [
        'Java中ForkJoinPool的作用是？',
        ['分治任务线程池', '普通线程池', '定时线程池', '以上都不对'],
        0,
      ],
      ['Java中ForkJoinTask的作用是？', ['分治任务', '普通任务', '定时任务', '以上都不对'], 0],
      [
        'Java中RecursiveTask的作用是？',
        ['有返回值的分治任务', '无返回值的分治任务', '普通任务', '以上都不对'],
        0,
      ],
      [
        'Java中RecursiveAction的作用是？',
        ['无返回值的分治任务', '有返回值的分治任务', '普通任务', '以上都不对'],
        0,
      ],
      ['Java中CountDownLatch的作用是？', ['等待多个线程完成', '循环屏障', '信号量', '交换器'], 0],
      ['Java中CyclicBarrier的作用是？', ['循环屏障', '等待多个线程完成', '信号量', '交换器'], 0],
      ['Java中Semaphore的作用是？', ['信号量', '等待多个线程完成', '循环屏障', '交换器'], 0],
      ['Java中Exchanger的作用是？', ['交换器', '等待多个线程完成', '循环屏障', '信号量'], 0],
      ['Java中Phaser的作用是？', ['阶段器', '等待多个线程完成', '循环屏障', '信号量'], 0],
      [
        'Java中CountDownLatch和CyclicBarrier的区别是？',
        [
          'CountDownLatch不可重用，CyclicBarrier可重用',
          'CountDownLatch可重用，CyclicBarrier不可重用',
          '无区别',
          '取决于场景',
        ],
        0,
      ],
      ['Java中ThreadLocal的作用是？', ['线程本地变量', '线程同步', '线程通信', '线程池'], 0],
      [
        'Java中ThreadLocal的原理是？',
        ['每个线程维护一个ThreadLocalMap', '全局Map', '锁机制', '以上都不对'],
        0,
      ],
      [
        'Java中ThreadLocal的内存泄漏问题是指？',
        ['Entry的value无法回收', 'Entry的key无法回收', 'ThreadLocal无法回收', '以上都不对'],
        0,
      ],
      [
        'Java中ThreadLocal如何避免内存泄漏？',
        ['使用后调用remove()', '使用弱引用', '使用强引用', '以上都不对'],
        0,
      ],
      [
        'Java中InheritableThreadLocal的作用是？',
        ['子线程继承父线程的变量', '线程同步', '线程通信', '线程池'],
        0,
      ],
      ['Java中JMM是指？', ['Java内存模型', 'Java虚拟机', 'Java运行环境', '以上都不对'], 0],
      [
        'Java中JMM的三大特性是？',
        ['原子性，可见性，有序性', '封装，继承，多态', '安全，稳定，高效', '以上都不对'],
        0,
      ],
      [
        'Java中JMM的主内存和工作内存是指？',
        [
          '主内存是堆，工作内存是栈',
          '主内存是栈，工作内存是堆',
          '主内存是方法区，工作内存是堆',
          '以上都不对',
        ],
        0,
      ],
      [
        'Java中happens-before原则是？',
        ['保证内存可见性的规则', '保证原子性的规则', '保证同步的规则', '以上都不对'],
        0,
      ],
      [
        'Java中happens-before规则包括？',
        ['程序顺序，volatile，锁，线程启动等', '程序顺序', 'volatile', '锁'],
        0,
      ],
      [
        'Java中指令重排序是指？',
        ['编译器或处理器优化指令顺序', '指令错误', '指令丢失', '以上都不对'],
        0,
      ],
      [
        'Java中as-if-serial语义是指？',
        ['不管怎么重排序，单线程结果不变', '指令顺序执行', '指令并行执行', '以上都不对'],
        0,
      ],
    ];
    const item = items[(i - 481) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }
  // ==================== 第六部分：IO流与网络编程 (601-720) ====================
  for (let i = 601; i <= 720; i++) {
    const q = { id: `java-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'Java中IO流的分类有？',
        ['字节流和字符流', '输入流和输出流', '节点流和处理流', '以上都是'],
        3,
      ],
      [
        'Java中字节流的基类是？',
        ['InputStream和OutputStream', 'Reader和Writer', 'File和Path', '以上都不对'],
        0,
      ],
      [
        'Java中字符流的基类是？',
        ['Reader和Writer', 'InputStream和OutputStream', 'File和Path', '以上都不对'],
        0,
      ],
      [
        'Java中FileInputStream的作用是？',
        ['读取文件字节', '写入文件字节', '读取文件字符', '写入文件字符'],
        0,
      ],
      [
        'Java中FileOutputStream的作用是？',
        ['写入文件字节', '读取文件字节', '读取文件字符', '写入文件字符'],
        0,
      ],
      [
        'Java中FileReader的作用是？',
        ['读取文件字符', '写入文件字符', '读取文件字节', '写入文件字节'],
        0,
      ],
      [
        'Java中FileWriter的作用是？',
        ['写入文件字符', '读取文件字符', '读取文件字节', '写入文件字节'],
        0,
      ],
      [
        'Java中BufferedInputStream的作用是？',
        ['缓冲字节输入', '缓冲字节输出', '缓冲字符输入', '缓冲字符输出'],
        0,
      ],
      [
        'Java中BufferedOutputStream的作用是？',
        ['缓冲字节输出', '缓冲字节输入', '缓冲字符输入', '缓冲字符输出'],
        0,
      ],
      [
        'Java中BufferedReader的作用是？',
        ['缓冲字符输入', '缓冲字符输出', '缓冲字节输入', '缓冲字节输出'],
        0,
      ],
      [
        'Java中BufferedWriter的作用是？',
        ['缓冲字符输出', '缓冲字符输入', '缓冲字节输入', '缓冲字节输出'],
        0,
      ],
      [
        'Java中DataInputStream的作用是？',
        ['读取基本类型', '写入基本类型', '读取对象', '写入对象'],
        0,
      ],
      [
        'Java中DataOutputStream的作用是？',
        ['写入基本类型', '读取基本类型', '读取对象', '写入对象'],
        0,
      ],
      [
        'Java中ObjectInputStream的作用是？',
        ['读取对象', '写入对象', '读取基本类型', '写入基本类型'],
        0,
      ],
      [
        'Java中ObjectOutputStream的作用是？',
        ['写入对象', '读取对象', '读取基本类型', '写入基本类型'],
        0,
      ],
      ['Java中PrintStream的作用是？', ['打印字节流', '打印字符流', '读取对象', '写入对象'], 0],
      ['Java中PrintWriter的作用是？', ['打印字符流', '打印字节流', '读取对象', '写入对象'], 0],
      [
        'Java中InputStreamReader的作用是？',
        ['字节流转字符流', '字符流转字节流', '缓冲流', '数据流'],
        0,
      ],
      [
        'Java中OutputStreamWriter的作用是？',
        ['字符流转字节流', '字节流转字符流', '缓冲流', '数据流'],
        0,
      ],
      ['Java中SequenceInputStream的作用是？', ['合并输入流', '合并输出流', '管道流', '过滤流'], 0],
      ['Java中PipedInputStream的作用是？', ['管道输入', '管道输出', '文件输入', '文件输出'], 0],
      ['Java中PipedOutputStream的作用是？', ['管道输出', '管道输入', '文件输入', '文件输出'], 0],
      [
        'Java中ByteArrayInputStream的作用是？',
        ['字节数组输入', '字节数组输出', '字符数组输入', '字符数组输出'],
        0,
      ],
      [
        'Java中ByteArrayOutputStream的作用是？',
        ['字节数组输出', '字节数组输入', '字符数组输入', '字符数组输出'],
        0,
      ],
      [
        'Java中CharArrayReader的作用是？',
        ['字符数组输入', '字符数组输出', '字节数组输入', '字节数组输出'],
        0,
      ],
      [
        'Java中CharArrayWriter的作用是？',
        ['字符数组输出', '字符数组输入', '字节数组输入', '字节数组输出'],
        0,
      ],
      [
        'Java中StringReader的作用是？',
        ['字符串输入', '字符串输出', '字节数组输入', '字节数组输出'],
        0,
      ],
      [
        'Java中StringWriter的作用是？',
        ['字符串输出', '字符串输入', '字节数组输入', '字节数组输出'],
        0,
      ],
      ['Java中File类的作用是？', ['文件和目录操作', '文件内容读写', '文件压缩', '文件加密'], 0],
      ['Java中File类可以创建文件吗？', ['可以', '不可以', '只能创建目录', '只能删除文件'], 0],
      ['Java中File类可以创建目录吗？', ['可以', '不可以', '只能创建文件', '只能删除目录'], 0],
      ['Java中File类可以删除文件吗？', ['可以', '不可以', '只能创建文件', '只能创建目录'], 0],
      ['Java中File类可以判断文件存在吗？', ['可以', '不可以', '只能判断目录', '只能判断路径'], 0],
      ['Java中File类可以获取文件大小吗？', ['可以', '不可以', '只能获取名称', '只能获取路径'], 0],
      ['Java中File类可以获取文件路径吗？', ['可以', '不可以', '只能获取名称', '只能获取大小'], 0],
      ['Java中File类可以获取文件名吗？', ['可以', '不可以', '只能获取路径', '只能获取大小'], 0],
      [
        'Java中File类可以判断是文件还是目录吗？',
        ['可以', '不可以', '只能判断文件', '只能判断目录'],
        0,
      ],
      ['Java中File类可以列出目录内容吗？', ['可以', '不可以', '只能列出文件', '只能列出目录'], 0],
      ['Java中File类可以重命名文件吗？', ['可以', '不可以', '只能删除', '只能创建'], 0],
      ['Java中File类可以设置文件权限吗？', ['可以', '不可以', '只能获取权限', '只能判断权限'], 0],
      ['Java中File类可以设置文件只读吗？', ['可以', '不可以', '只能设置可写', '只能设置隐藏'], 0],
      ['Java中NIO是指？', ['New IO', 'Non-blocking IO', 'Native IO', '以上都不对'], 0],
      [
        'Java中NIO的核心组件是？',
        [
          'Buffer, Channel, Selector',
          'Stream, File, Path',
          'InputStream, OutputStream',
          '以上都不对',
        ],
        0,
      ],
      ['Java中Buffer的作用是？', ['缓冲区', '通道', '选择器', '以上都不对'], 0],
      ['Java中Channel的作用是？', ['通道', '缓冲区', '选择器', '以上都不对'], 0],
      ['Java中Selector的作用是？', ['选择器', '缓冲区', '通道', '以上都不对'], 0],
      [
        'Java中Buffer的属性有？',
        [
          'capacity, position, limit, mark',
          'size, index, length',
          'start, end, current',
          '以上都不对',
        ],
        0,
      ],
      [
        'Java中Buffer的flip()方法作用是？',
        ['切换为读模式', '切换为写模式', '清空缓冲区', '重绕缓冲区'],
        0,
      ],
      [
        'Java中Buffer的clear()方法作用是？',
        ['清空缓冲区', '切换为读模式', '切换为写模式', '重绕缓冲区'],
        0,
      ],
      [
        'Java中Buffer的compact()方法作用是？',
        ['压缩缓冲区', '清空缓冲区', '切换为读模式', '切换为写模式'],
        0,
      ],
      [
        'Java中Buffer的rewind()方法作用是？',
        ['重绕缓冲区', '清空缓冲区', '切换为读模式', '切换为写模式'],
        0,
      ],
      ['Java中Buffer的mark()方法作用是？', ['标记位置', '重置位置', '清空缓冲区', '压缩缓冲区'], 0],
      [
        'Java中Buffer的reset()方法作用是？',
        ['重置位置', '标记位置', '清空缓冲区', '压缩缓冲区'],
        0,
      ],
      [
        'Java中ByteBuffer的allocate()方法作用是？',
        ['分配堆缓冲区', '分配直接缓冲区', '分配映射缓冲区', '以上都不对'],
        0,
      ],
      [
        'Java中ByteBuffer的allocateDirect()方法作用是？',
        ['分配直接缓冲区', '分配堆缓冲区', '分配映射缓冲区', '以上都不对'],
        0,
      ],
      ['Java中FileChannel的作用是？', ['文件通道', '网络通道', '管道通道', '以上都不对'], 0],
      [
        'Java中SocketChannel的作用是？',
        ['网络客户端通道', '网络服务端通道', '文件通道', '管道通道'],
        0,
      ],
      [
        'Java中ServerSocketChannel的作用是？',
        ['网络服务端通道', '网络客户端通道', '文件通道', '管道通道'],
        0,
      ],
      [
        'Java中DatagramChannel的作用是？',
        ['UDP通道', 'TCP客户端通道', 'TCP服务端通道', '文件通道'],
        0,
      ],
      [
        'Java中Pipe.SinkChannel的作用是？',
        ['管道写入通道', '管道读取通道', '文件通道', '网络通道'],
        0,
      ],
      [
        'Java中Pipe.SourceChannel的作用是？',
        ['管道读取通道', '管道写入通道', '文件通道', '网络通道'],
        0,
      ],
      [
        'Java中Selector的select()方法作用是？',
        ['阻塞等待通道就绪', '非阻塞等待通道就绪', '立即返回就绪通道', '以上都不对'],
        0,
      ],
      [
        'Java中Selector的selectNow()方法作用是？',
        ['非阻塞等待通道就绪', '阻塞等待通道就绪', '立即返回就绪通道', '以上都不对'],
        0,
      ],
      [
        'Java中Selector的select(long timeout)方法作用是？',
        ['超时等待通道就绪', '阻塞等待通道就绪', '非阻塞等待通道就绪', '以上都不对'],
        0,
      ],
      [
        'Java中Selector的selectedKeys()方法作用是？',
        ['获取就绪通道集合', '获取所有通道集合', '获取取消通道集合', '以上都不对'],
        0,
      ],
      [
        'Java中SelectionKey的作用是？',
        ['表示通道和选择器的注册关系', '表示通道', '表示选择器', '以上都不对'],
        0,
      ],
      [
        'Java中SelectionKey的兴趣事件有？',
        [
          'OP_CONNECT, OP_ACCEPT, OP_READ, OP_WRITE',
          'OP_CREATE, OP_DELETE',
          'OP_OPEN, OP_CLOSE',
          '以上都不对',
        ],
        0,
      ],
      ['Java中Path的作用是？', ['表示文件路径', '表示文件', '表示目录', '以上都不对'], 0],
      ['Java中Paths的作用是？', ['创建Path', '创建File', '创建Directory', '以上都不对'], 0],
      [
        'Java中Files的作用是？',
        ['文件操作工具类', '路径操作工具类', '目录操作工具类', '以上都不对'],
        0,
      ],
      [
        'Java中Files.readAllLines()方法作用是？',
        ['读取所有行', '读取所有字节', '写入所有行', '写入所有字节'],
        0,
      ],
      ['Java中Files.write()方法作用是？', ['写入文件', '读取文件', '复制文件', '移动文件'], 0],
      ['Java中Files.copy()方法作用是？', ['复制文件', '移动文件', '删除文件', '创建文件'], 0],
      ['Java中Files.move()方法作用是？', ['移动文件', '复制文件', '删除文件', '创建文件'], 0],
      ['Java中Files.delete()方法作用是？', ['删除文件', '移动文件', '复制文件', '创建文件'], 0],
      ['Java中Files.createFile()方法作用是？', ['创建文件', '删除文件', '移动文件', '复制文件'], 0],
      [
        'Java中Files.createDirectory()方法作用是？',
        ['创建目录', '创建文件', '删除目录', '移动目录'],
        0,
      ],
      ['Java中FileVisitor的作用是？', ['遍历文件树', '遍历目录', '遍历文件', '以上都不对'], 0],
      [
        'Java中WatchService的作用是？',
        ['监听文件变化', '监听目录变化', '监听网络变化', '以上都不对'],
        0,
      ],
      [
        'Java中FileChannel的transferFrom()方法作用是？',
        ['从其他通道传输数据', '向其他通道传输数据', '从文件读取数据', '向文件写入数据'],
        0,
      ],
      [
        'Java中FileChannel的transferTo()方法作用是？',
        ['向其他通道传输数据', '从其他通道传输数据', '从文件读取数据', '向文件写入数据'],
        0,
      ],
      [
        'Java中FileChannel的map()方法作用是？',
        ['内存映射文件', '文件传输', '文件锁定', '以上都不对'],
        0,
      ],
      [
        'Java中MappedByteBuffer的作用是？',
        ['内存映射缓冲区', '直接缓冲区', '堆缓冲区', '以上都不对'],
        0,
      ],
      ['Java中FileLock的作用是？', ['文件锁', '文件映射', '文件传输', '以上都不对'], 0],
      ['Java中Socket的作用是？', ['TCP客户端', 'TCP服务端', 'UDP客户端', 'UDP服务端'], 0],
      ['Java中ServerSocket的作用是？', ['TCP服务端', 'TCP客户端', 'UDP服务端', 'UDP客户端'], 0],
      ['Java中DatagramSocket的作用是？', ['UDP通信', 'TCP通信', 'HTTP通信', '以上都不对'], 0],
      ['Java中InetAddress的作用是？', ['IP地址', 'URL', 'Socket', '以上都不对'], 0],
      ['Java中URL的作用是？', ['统一资源定位符', 'IP地址', 'Socket', '以上都不对'], 0],
      ['Java中URLConnection的作用是？', ['URL连接', 'Socket连接', 'HTTP连接', '以上都不对'], 0],
      ['Java中HttpURLConnection的作用是？', ['HTTP连接', 'HTTPS连接', 'FTP连接', '以上都不对'], 0],
      ['Java中HttpClient的作用是？', ['HTTP客户端', 'TCP客户端', 'UDP客户端', '以上都不对'], 0],
      ['Java中HttpRequest的作用是？', ['HTTP请求', 'HTTP响应', 'HTTP连接', '以上都不对'], 0],
      ['Java中HttpResponse的作用是？', ['HTTP响应', 'HTTP请求', 'HTTP连接', '以上都不对'], 0],
      [
        'Java中序列化的作用是？',
        ['将对象转为字节流', '将字节流转为对象', '加密对象', '以上都不对'],
        0,
      ],
      [
        'Java中反序列化的作用是？',
        ['将字节流转为对象', '将对象转为字节流', '解密对象', '以上都不对'],
        0,
      ],
      [
        'Java中Serializable接口的作用是？',
        ['标记可序列化', '实现序列化', '管理序列化', '以上都不对'],
        0,
      ],
      [
        'Java中Externalizable接口的作用是？',
        ['自定义序列化', '标记可序列化', '管理序列化', '以上都不对'],
        0,
      ],
      ['Java中serialVersionUID的作用是？', ['版本控制', '加密', '压缩', '以上都不对'], 0],
      [
        'Java中transient关键字的作用是？',
        ['不序列化字段', '序列化字段', '压缩字段', '加密字段'],
        0,
      ],
      [
        'Java中序列化单例的解决方法是？',
        ['readResolve()', 'writeReplace()', 'readObject()', 'writeObject()'],
        0,
      ],
      [
        'Java中序列化的注意事项有？',
        ['引用类型必须可序列化', '基本类型自动序列化', '静态变量不序列化', '以上都是'],
        3,
      ],
    ];
    const item = items[(i - 601) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }
  // ==================== 第七部分：JVM与内存模型 (721-840) ====================
  for (let i = 721; i <= 840; i++) {
    const q = { id: `java-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'Java中JVM的组成部分有？',
        [
          '类加载器，运行时数据区，执行引擎',
          '编译器，解释器',
          '垃圾回收器，内存管理',
          '以上都不对',
        ],
        0,
      ],
      [
        'Java中运行时数据区包括？',
        ['堆，栈，方法区，程序计数器，本地方法栈', '堆，栈，方法区', '堆，栈', '以上都不对'],
        0,
      ],
      [
        'Java中堆的特点是？',
        ['线程共享，存储对象', '线程私有，存储局部变量', '存储类信息', '存储常量'],
        0,
      ],
      [
        'Java中栈的特点是？',
        ['线程私有，存储局部变量', '线程共享，存储对象', '存储类信息', '存储常量'],
        0,
      ],
      [
        'Java中方法区的特点是？',
        ['线程共享，存储类信息', '线程私有，存储局部变量', '存储对象', '存储常量'],
        0,
      ],
      [
        'Java中程序计数器的特点是？',
        ['线程私有，记录执行位置', '线程共享，存储对象', '存储类信息', '存储常量'],
        0,
      ],
      [
        'Java中本地方法栈的特点是？',
        ['线程私有，服务Native方法', '线程共享，存储对象', '存储类信息', '存储常量'],
        0,
      ],
      [
        'Java中堆的分区有？',
        ['新生代，老年代', 'Eden，Survivor', 'Young，Old，Perm', '以上都不对'],
        0,
      ],
      [
        'Java中新生代的分区有？',
        ['Eden，Survivor0，Survivor1', 'Eden，Old', 'Young，Old', '以上都不对'],
        0,
      ],
      ['Java中对象分配在哪个区域？', ['堆', '栈', '方法区', '程序计数器'], 0],
      ['Java中局部变量分配在哪个区域？', ['栈', '堆', '方法区', '程序计数器'], 0],
      ['Java中类信息分配在哪个区域？', ['方法区', '堆', '栈', '程序计数器'], 0],
      ['Java中常量池分配在哪个区域？', ['方法区', '堆', '栈', '程序计数器'], 0],
      ['Java中静态变量分配在哪个区域？', ['方法区', '堆', '栈', '程序计数器'], 0],
      [
        'Java中JIT编译器的作用是？',
        ['将热点代码编译为本地代码', '解释执行字节码', '加载类', '以上都不对'],
        0,
      ],
      [
        'Java中AOT编译器的作用是？',
        ['提前编译为本地代码', '运行时编译', '解释执行', '以上都不对'],
        0,
      ],
      [
        'Java中类加载的过程是？',
        ['加载，验证，准备，解析，初始化', '编译，解释，执行', '创建，使用，销毁', '以上都不对'],
        0,
      ],
      [
        'Java中类加载器的类型有？',
        ['Bootstrap, Extension, Application', 'System, Custom', 'Parent, Child', '以上都不对'],
        0,
      ],
      [
        'Java中双亲委派模型是指？',
        ['先委托父类加载器加载', '先自己加载', '子类加载器优先', '以上都不对'],
        0,
      ],
      [
        'Java中双亲委派模型的好处是？',
        ['保证核心类安全', '提高加载速度', '减少内存占用', '以上都不对'],
        0,
      ],
      [
        'Java中如何打破双亲委派模型？',
        ['自定义类加载器重写loadClass', '使用反射', '使用代理', '以上都不对'],
        0,
      ],
      [
        'Java中Tomcat的类加载器结构是？',
        ['每个应用独立类加载器', '使用双亲委派', '使用系统类加载器', '以上都不对'],
        0,
      ],
      ['Java中GC的作用是？', ['回收不再使用的对象', '创建对象', '加载类', '以上都不对'], 0],
      [
        'Java中GC的算法有？',
        ['标记-清除，复制，标记-整理', '引用计数', '分代收集', '以上都不对'],
        0,
      ],
      ['Java中标记-清除算法的缺点是？', ['内存碎片', '效率低', '移动对象', '以上都不对'], 0],
      ['Java中复制算法的缺点是？', ['内存利用率低', '内存碎片', '效率低', '以上都不对'], 0],
      ['Java中标记-整理算法的优点是？', ['无内存碎片', '内存利用率高', '效率高', '以上都不对'], 0],
      ['Java中新生代使用什么算法？', ['复制算法', '标记-清除', '标记-整理', '以上都不对'], 0],
      ['Java中老年代使用什么算法？', ['标记-整理', '复制算法', '标记-清除', '以上都不对'], 0],
      ['Java中Minor GC是指？', ['新生代GC', '老年代GC', '全GC', '以上都不对'], 0],
      ['Java中Major GC是指？', ['老年代GC', '新生代GC', '全GC', '以上都不对'], 0],
      ['Java中Full GC是指？', ['全GC', '新生代GC', '老年代GC', '以上都不对'], 0],
      [
        'Java中对象何时进入老年代？',
        ['年龄达到阈值，大对象，Survivor空间不足', '刚创建', 'Minor GC后', '以上都不对'],
        0,
      ],
      [
        'Java中对象年龄如何增加？',
        ['每经历一次Minor GC', '每经历一次Major GC', '每经历一次Full GC', '以上都不对'],
        0,
      ],
      [
        'Java中什么情况触发Full GC？',
        ['老年代不足，方法区不足，System.gc()', 'Minor GC', '对象分配', '以上都不对'],
        0,
      ],
      [
        'Java中垃圾收集器的类型有？',
        ['Serial, Parallel, CMS, G1, ZGC', 'Young, Old', 'Minor, Major', '以上都不对'],
        0,
      ],
      ['Java中Serial收集器的特点是？', ['单线程，STW', '多线程', '并发', '以上都不对'], 0],
      [
        'Java中Parallel收集器的特点是？',
        ['多线程，吞吐量优先', '单线程', '低延迟', '以上都不对'],
        0,
      ],
      ['Java中CMS收集器的特点是？', ['低延迟', '吞吐量优先', '单线程', '以上都不对'], 0],
      [
        'Java中G1收集器的特点是？',
        ['分区收集，可预测停顿', '单线程', '吞吐量优先', '以上都不对'],
        0,
      ],
      ['Java中ZGC收集器的特点是？', ['超低延迟', '吞吐量优先', '单线程', '以上都不对'], 0],
      ['Java中STW是指？', ['Stop The World', 'Start The World', 'Save The World', '以上都不对'], 0],
      ['Java中如何判断对象可回收？', ['可达性分析', '引用计数', '标记-清除', '以上都不对'], 0],
      [
        'Java中GC Roots包括？',
        ['栈帧引用，静态变量引用，常量引用，锁持有对象', '所有对象', '所有引用', '以上都不对'],
        0,
      ],
      [
        'Java中引用的类型有？',
        ['强引用，软引用，弱引用，虚引用', '强引用，弱引用', '软引用，虚引用', '以上都不对'],
        0,
      ],
      ['Java中强引用的特点是？', ['不会被GC', '内存不足时被GC', '下次GC时被GC', '以上都不对'], 0],
      ['Java中软引用的特点是？', ['内存不足时被GC', '不会被GC', '下次GC时被GC', '以上都不对'], 0],
      ['Java中弱引用的特点是？', ['下次GC时被GC', '不会被GC', '内存不足时被GC', '以上都不对'], 0],
      [
        'Java中虚引用的特点是？',
        ['随时被GC，用于跟踪GC', '不会被GC', '内存不足时被GC', '以上都不对'],
        0,
      ],
      [
        'Java中ReferenceQueue的作用是？',
        ['保存被回收的引用对象', '保存强引用', '保存软引用', '以上都不对'],
        0,
      ],
      ['Java中内存泄漏是指？', ['对象无法被回收', '内存不足', '内存溢出', '以上都不对'], 0],
      ['Java中内存溢出是指？', ['没有足够内存分配', '对象无法被回收', '内存泄漏', '以上都不对'], 0],
      ['Java中如何排查内存泄漏？', ['JMap, JStack, MAT', 'JConsole', 'JStat', '以上都不对'], 0],
      ['Java中如何排查CPU过高？', ['top, JStack', 'JMap', 'JStat', '以上都不对'], 0],
      ['Java中JMap的作用是？', ['查看堆信息', '查看线程信息', '查看类信息', '以上都不对'], 0],
      ['Java中JStack的作用是？', ['查看线程信息', '查看堆信息', '查看类信息', '以上都不对'], 0],
      ['Java中JStat的作用是？', ['查看GC统计', '查看堆信息', '查看线程信息', '以上都不对'], 0],
      ['Java中JInfo的作用是？', ['查看JVM参数', '查看堆信息', '查看线程信息', '以上都不对'], 0],
      ['Java中JConsole的作用是？', ['可视化监控', '命令行监控', '日志分析', '以上都不对'], 0],
      ['Java中VisualVM的作用是？', ['可视化监控', '命令行监控', '日志分析', '以上都不对'], 0],
      ['Java中JVM参数-Xms的作用是？', ['初始堆大小', '最大堆大小', '栈大小', '方法区大小'], 0],
      ['Java中JVM参数-Xmx的作用是？', ['最大堆大小', '初始堆大小', '栈大小', '方法区大小'], 0],
      ['Java中JVM参数-Xss的作用是？', ['栈大小', '初始堆大小', '最大堆大小', '方法区大小'], 0],
      [
        'Java中JVM参数-XX:MetaspaceSize的作用是？',
        ['元空间大小', '堆大小', '栈大小', '方法区大小'],
        0,
      ],
      [
        'Java中JVM参数-XX:NewRatio的作用是？',
        ['新生代与老年代比例', 'Eden与Survivor比例', '堆与方法区比例', '以上都不对'],
        0,
      ],
      [
        'Java中JVM参数-XX:SurvivorRatio的作用是？',
        ['Eden与Survivor比例', '新生代与老年代比例', '堆与方法区比例', '以上都不对'],
        0,
      ],
      [
        'Java中JVM参数-XX:MaxTenuringThreshold的作用是？',
        ['对象晋升老年代年龄', '新生代大小', 'Survivor大小', '以上都不对'],
        0,
      ],
      [
        'Java中JVM参数-XX:+UseG1GC的作用是？',
        ['使用G1收集器', '使用CMS收集器', '使用Parallel收集器', '使用Serial收集器'],
        0,
      ],
      [
        'Java中JVM参数-XX:+PrintGCDetails的作用是？',
        ['打印GC详情', '打印GC统计', '打印GC日志', '以上都不对'],
        0,
      ],
      [
        'Java中JVM参数-XX:+HeapDumpOnOutOfMemoryError的作用是？',
        ['OOM时导出堆', 'OOM时重启', 'OOM时打印日志', '以上都不对'],
        0,
      ],
      ['Java中方法区的实现是？', ['永久代或元空间', '堆', '栈', '以上都不对'], 0],
      [
        'Java中永久代和元空间的区别是？',
        [
          '元空间使用本地内存，永久代使用堆内存',
          '元空间使用堆内存，永久代使用本地内存',
          '无区别',
          '以上都不对',
        ],
        0,
      ],
      ['Java中字符串常量池的位置是？', ['堆', '方法区', '栈', '程序计数器'], 0],
      ['Java中Integer缓存池的范围是？', ['-128到127', '0到255', '-32768到32767', '无限制'], 0],
      [
        'Java中JVM调优的目标是？',
        ['降低GC停顿，提高吞吐量', '增加内存使用', '增加GC频率', '以上都不对'],
        0,
      ],
      ['Java中如何选择垃圾收集器？', ['根据应用场景', '总是选G1', '总是选CMS', '以上都不对'], 0],
      [
        'Java中如何避免频繁Full GC？',
        ['增大老年代，避免内存泄漏', '增大新生代', '减少对象创建', '以上都不对'],
        0,
      ],
      [
        'Java中如何处理OOM？',
        ['增加内存，排查泄漏，优化代码', '重启应用', '忽略', '以上都不对'],
        0,
      ],
      [
        'Java中JIT的优化技术有？',
        ['逃逸分析，内联，循环优化', '解释执行', '字节码验证', '以上都不对'],
        0,
      ],
      ['Java中逃逸分析的作用是？', ['对象分配优化', '内存泄漏检测', 'GC优化', '以上都不对'], 0],
      [
        'Java中栈上分配是指？',
        ['对象分配在栈上', '对象分配在堆上', '对象分配在方法区', '以上都不对'],
        0,
      ],
      [
        'Java中标量替换是指？',
        ['将对象拆解为基本类型', '替换对象引用', '替换方法调用', '以上都不对'],
        0,
      ],
      [
        'Java中锁优化技术有？',
        ['偏向锁，轻量级锁，自旋锁，锁消除', '重量级锁', '乐观锁', '以上都不对'],
        0,
      ],
      ['Java中锁消除是指？', ['JIT消除不可能共享的锁', '手动消除锁', '锁降级', '以上都不对'], 0],
      [
        'Java中锁粗化是指？',
        ['将多次锁操作合并为一次', '将一次锁操作拆分为多次', '锁升级', '以上都不对'],
        0,
      ],
      [
        'Java中自适应自旋锁是指？',
        ['根据情况调整自旋次数', '固定自旋次数', '不自旋', '以上都不对'],
        0,
      ],
      [
        'Java中JVM的错误有？',
        [
          'StackOverflowError, OutOfMemoryError',
          'NullPointerException',
          'ClassCastException',
          '以上都不对',
        ],
        0,
      ],
      [
        'Java中StackOverflowError的原因是？',
        ['递归过深或栈太小', '堆内存不足', '方法区不足', '以上都不对'],
        0,
      ],
      [
        'Java中OOM的类型有？',
        ['Java heap space, Metaspace, GC overhead limit', 'StackOverflow', '以上都不对'],
        0,
      ],
      [
        'Java中GC overhead limit exceeded是指？',
        ['GC花费时间过多', '内存不足', 'GC次数过多', '以上都不对'],
        0,
      ],
      [
        'Java中Direct buffer memory是指？',
        ['直接内存不足', '堆内存不足', '方法区不足', '以上都不对'],
        0,
      ],
      [
        'Java中unable to create new native thread是指？',
        ['线程数过多', '内存不足', 'CPU不足', '以上都不对'],
        0,
      ],
      [
        'Java中如何监控JVM？',
        ['JMX, JConsole, VisualVM, Prometheus', 'JMap', 'JStack', '以上都不对'],
        0,
      ],
      ['Java中如何排查死锁？', ['JStack, JConsole', 'JMap', 'JStat', '以上都不对'], 0],
      ['Java中如何排查内存泄漏？', ['MAT, JMap, JConsole', 'JStack', 'JStat', '以上都不对'], 0],
      ['Java中如何排查CPU过高？', ['top, JStack, JConsole', 'JMap', 'JStat', '以上都不对'], 0],
      [
        'Java中如何排查类加载问题？',
        ['-verbose:class, JConsole', 'JMap', 'JStack', '以上都不对'],
        0,
      ],
      [
        'Java中如何排查线程问题？',
        ['JStack, JConsole, VisualVM', 'JMap', 'JStat', '以上都不对'],
        0,
      ],
      ['Java中如何排查GC问题？', ['GC日志, JStat, JConsole', 'JMap', 'JStack', '以上都不对'], 0],
      ['Java中如何排查性能问题？', ['JFR, JMC, Arthas', 'JMap', 'JStack', '以上都不对'], 0],
    ];
    const item = items[(i - 721) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }
  // ==================== 第八部分：Java 8+ 新特性 (841-940) ====================
  for (let i = 841; i <= 940; i++) {
    const q = { id: `java-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'Java 8的新特性有？',
        ['Lambda, Stream, Optional, 新日期API', '泛型, 注解', '枚举, 静态导入', '以上都不对'],
        0,
      ],
      [
        'Java 8的Lambda表达式作用是？',
        ['简化函数式接口实现', '提高性能', '替代匿名类', '以上都是'],
        0,
      ],
      [
        'Java 8的函数式接口有？',
        [
          'Predicate, Function, Consumer, Supplier',
          'Runnable, Callable',
          'Comparable, Comparator',
          '以上都不对',
        ],
        0,
      ],
      ['Java 8的Predicate接口的作用是？', ['判断', '转换', '消费', '提供'], 0],
      ['Java 8的Function接口的作用是？', ['转换', '判断', '消费', '提供'], 0],
      ['Java 8的Consumer接口的作用是？', ['消费', '判断', '转换', '提供'], 0],
      ['Java 8的Supplier接口的作用是？', ['提供', '判断', '转换', '消费'], 0],
      [
        'Java 8的Optional类的作用是？',
        ['避免NullPointerException', '替代null', '包装对象', '以上都是'],
        0,
      ],
      [
        'Java 8的Optional.of()方法作用是？',
        ['创建Optional，不允许null', '创建Optional，允许null', '创建空Optional', '以上都不对'],
        0,
      ],
      [
        'Java 8的Optional.ofNullable()方法作用是？',
        ['创建Optional，允许null', '创建Optional，不允许null', '创建空Optional', '以上都不对'],
        0,
      ],
      [
        'Java 8的Optional.empty()方法作用是？',
        ['创建空Optional', '创建Optional，允许null', '创建Optional，不允许null', '以上都不对'],
        0,
      ],
      [
        'Java 8的Optional.isPresent()方法作用是？',
        ['判断是否有值', '获取值', '设置值', '以上都不对'],
        0,
      ],
      ['Java 8的Optional.get()方法作用是？', ['获取值', '判断是否有值', '设置值', '以上都不对'], 0],
      [
        'Java 8的Optional.orElse()方法作用是？',
        ['有值返回值，无值返回默认值', '获取值', '判断是否有值', '以上都不对'],
        0,
      ],
      [
        'Java 8的Optional.orElseGet()方法作用是？',
        ['有值返回值，无值返回Supplier', '获取值', '判断是否有值', '以上都不对'],
        0,
      ],
      [
        'Java 8的Optional.orElseThrow()方法作用是？',
        ['有值返回值，无值抛异常', '获取值', '判断是否有值', '以上都不对'],
        0,
      ],
      [
        'Java 8的Optional.ifPresent()方法作用是？',
        ['有值时执行Consumer', '获取值', '判断是否有值', '以上都不对'],
        0,
      ],
      ['Java 8的Optional.filter()方法作用是？', ['过滤值', '转换值', '消费值', '提供值'], 0],
      ['Java 8的Optional.map()方法作用是？', ['转换值', '过滤值', '消费值', '提供值'], 0],
      ['Java 8的Optional.flatMap()方法作用是？', ['扁平转换值', '过滤值', '消费值', '提供值'], 0],
      [
        'Java 8的新日期API的类有？',
        ['LocalDate, LocalTime, LocalDateTime', 'Date, Calendar', 'SimpleDateFormat', '以上都不对'],
        0,
      ],
      ['Java 8的LocalDate类的作用是？', ['表示日期', '表示时间', '表示日期时间', '表示时区'], 0],
      ['Java 8的LocalTime类的作用是？', ['表示时间', '表示日期', '表示日期时间', '表示时区'], 0],
      [
        'Java 8的LocalDateTime类的作用是？',
        ['表示日期时间', '表示日期', '表示时间', '表示时区'],
        0,
      ],
      ['Java 8的Instant类的作用是？', ['表示时间戳', '表示日期', '表示时间', '表示时区'], 0],
      ['Java 8的Duration类的作用是？', ['表示时间间隔', '表示日期间隔', '表示时区', '表示格式'], 0],
      ['Java 8的Period类的作用是？', ['表示日期间隔', '表示时间间隔', '表示时区', '表示格式'], 0],
      ['Java 8的ZoneId类的作用是？', ['表示时区', '表示日期', '表示时间', '表示格式'], 0],
      [
        'Java 8的ZonedDateTime类的作用是？',
        ['表示带时区的日期时间', '表示日期', '表示时间', '表示时区'],
        0,
      ],
      [
        'Java 8的DateTimeFormatter类的作用是？',
        ['格式化日期', '表示日期', '表示时间', '表示时区'],
        0,
      ],
      ['Java 8的接口默认方法作用是？', ['向后兼容', '多重继承', '简化代码', '以上都是'], 0],
      ['Java 8的接口静态方法作用是？', ['提供工具方法', '多重继承', '向后兼容', '以上都是'], 0],
      ['Java 8的重复注解作用是？', ['允许重复使用注解', '简化注解', '类型注解', '以上都不对'], 0],
      ['Java 8的类型注解作用是？', ['在类型上使用注解', '重复注解', '简化注解', '以上都不对'], 0],
      ['Java 8的CompletableFuture作用是？', ['异步编程', '同步编程', '阻塞编程', '以上都不对'], 0],
      ['Java 8的StampedLock作用是？', ['乐观读锁', '读写锁', '可重入锁', '以上都不对'], 0],
      ['Java 8的LongAdder作用是？', ['高并发累加', '原子操作', '线程同步', '以上都不对'], 0],
      [
        'Java 8的Parallel Stream作用是？',
        ['并行流处理', '串行流处理', '异步处理', '以上都不对'],
        0,
      ],
      ['Java 8的StringJoiner作用是？', ['拼接字符串', '分割字符串', '替换字符串', '以上都不对'], 0],
      ['Java 8的Base64作用是？', ['Base64编解码', '加密解密', '压缩解压', '以上都不对'], 0],
      [
        'Java 9的新特性有？',
        ['模块化, JShell, 多版本JAR', 'Lambda, Stream', '泛型, 注解', '以上都不对'],
        0,
      ],
      ['Java 9的模块化作用是？', ['封装和依赖管理', '提高性能', '简化代码', '以上都不对'], 0],
      ['Java 9的JShell作用是？', ['交互式编程', '编译代码', '运行程序', '以上都不对'], 0],
      ['Java 9的多版本JAR作用是？', ['支持多版本类', '压缩JAR', '加密JAR', '以上都不对'], 0],
      [
        'Java 9的接口私有方法作用是？',
        ['复用接口内部代码', '多重继承', '向后兼容', '以上都不对'],
        0,
      ],
      ['Java 9的ProcessHandle作用是？', ['管理进程', '管理线程', '管理内存', '以上都不对'], 0],
      ['Java 9的VarHandle作用是？', ['原子操作', '反射操作', '序列化操作', '以上都不对'], 0],
      [
        'Java 9的Collection工厂方法作用是？',
        ['创建不可变集合', '创建可变集合', '创建同步集合', '以上都不对'],
        0,
      ],
      [
        'Java 9的Optional改进有？',
        ['ifPresentOrElse, or, stream', 'of, ofNullable', 'get, isPresent', '以上都不对'],
        0,
      ],
      [
        'Java 9的Stream改进有？',
        ['takeWhile, dropWhile, ofNullable', 'filter, map', 'collect, reduce', '以上都不对'],
        0,
      ],
      [
        'Java 10的新特性有？',
        ['局部变量类型推断, G1默认', 'Lambda, Stream', '模块化', '以上都不对'],
        0,
      ],
      ['Java 10的局部变量类型推断关键字是？', ['var', 'let', 'def', 'auto'], 0],
      [
        'Java 10的var可以用在哪些地方？',
        ['局部变量，for循环', '成员变量', '方法参数', '以上都不对'],
        0,
      ],
      [
        'Java 10的var不能用在哪些地方？',
        ['成员变量，方法参数，返回类型', '局部变量', 'for循环', '以上都不对'],
        0,
      ],
      ['Java 10的G1成为默认垃圾收集器吗？', ['是', '否', '取决于配置', '以上都不对'], 0],
      ['Java 10的Application CDS作用是？', ['类数据共享', '内存共享', '线程共享', '以上都不对'], 0],
      [
        'Java 10的ThreadLocalHandshakes作用是？',
        ['线程局部握手', '线程同步', '线程通信', '以上都不对'],
        0,
      ],
      [
        'Java 11的新特性有？',
        ['HTTP Client, String新方法, Flight Recorder', 'Lambda, Stream', '模块化', '以上都不对'],
        0,
      ],
      [
        'Java 11的HTTP Client是？',
        ['标准化HttpClient', 'HttpURLConnection', 'Apache HttpClient', '以上都不对'],
        0,
      ],
      [
        'Java 11的String新方法有？',
        ['isBlank, lines, strip, repeat', 'trim, substring', 'split, replace', '以上都不对'],
        0,
      ],
      ['Java 11的Flight Recorder作用是？', ['性能分析', '日志记录', '网络监控', '以上都不对'], 0],
      [
        'Java 11的Lambda参数var作用是？',
        ['允许注解修饰Lambda参数', '类型推断', '性能优化', '以上都不对'],
        0,
      ],
      [
        'Java 11的嵌套访问控制作用是？',
        ['允许嵌套类访问私有成员', '封装性', '多态性', '以上都不对'],
        0,
      ],
      ['Java 11的Epsilon GC作用是？', ['无操作垃圾收集器', '低延迟', '高吞吐', '以上都不对'], 0],
      ['Java 11的ZGC实验性引入吗？', ['是', '否', '已正式', '以上都不对'], 0],
      [
        'Java 12的新特性有？',
        ['Switch表达式, Compact Number', 'Lambda, Stream', '模块化', '以上都不对'],
        0,
      ],
      [
        'Java 12的Switch表达式特点？',
        ['使用箭头语法，可返回值', '传统语法', '无变化', '以上都不对'],
        0,
      ],
      [
        'Java 12的Compact Number作用是？',
        ['格式化紧凑数字', '格式化日期', '格式化货币', '以上都不对'],
        0,
      ],
      ['Java 12的JVM改进有？', ['微基准套件, 默认CDS', 'G1改进', 'ZGC改进', '以上都不对'], 0],
      [
        'Java 13的新特性有？',
        ['文本块, Switch表达式改进', 'Lambda, Stream', '模块化', '以上都不对'],
        0,
      ],
      ['Java 13的文本块特点？', ['多行字符串', '单行字符串', '格式化字符串', '以上都不对'], 0],
      ['Java 13的文本块使用什么符号？', ['"""', "'''", '```', '以上都不对'], 0],
      [
        'Java 13的Switch表达式改进？',
        ['yield返回值', 'return返回值', 'break返回值', '以上都不对'],
        0,
      ],
      ['Java 13的ZGC改进？', ['归还未使用内存', '分代收集', '并发整理', '以上都不对'], 0],
      [
        'Java 14的新特性有？',
        ['Switch表达式正式, Records预览, NPE改进', 'Lambda, Stream', '模块化', '以上都不对'],
        0,
      ],
      ['Java 14的Switch表达式正式吗？', ['是', '否', '预览', '以上都不对'], 0],
      ['Java 14的Records预览作用？', ['简化数据类', '简化枚举', '简化接口', '以上都不对'], 0],
      ['Java 14的NPE改进？', ['详细异常信息', '忽略异常', '静默异常', '以上都不对'], 0],
      [
        'Java 14的instanceof模式匹配预览？',
        ['类型判断和绑定', '类型转换', '类型检查', '以上都不对'],
        0,
      ],
      [
        'Java 15的新特性有？',
        ['Text Blocks正式, ZGC正式, Sealed Classes预览', 'Lambda, Stream', '模块化', '以上都不对'],
        0,
      ],
      ['Java 15的Text Blocks正式吗？', ['是', '否', '预览', '以上都不对'], 0],
      ['Java 15的ZGC正式吗？', ['是', '否', '预览', '以上都不对'], 0],
      [
        'Java 15的Sealed Classes预览作用？',
        ['限制继承', '限制实例化', '限制访问', '以上都不对'],
        0,
      ],
      ['Java 15的Hidden Classes作用？', ['框架内部使用', '公共API', '简化代码', '以上都不对'], 0],
      [
        'Java 16的新特性有？',
        [
          'Records正式, instanceof模式匹配正式, Vector API孵化',
          'Lambda, Stream',
          '模块化',
          '以上都不对',
        ],
        0,
      ],
      ['Java 16的Records正式吗？', ['是', '否', '预览', '以上都不对'], 0],
      ['Java 16的instanceof模式匹配正式吗？', ['是', '否', '预览', '以上都不对'], 0],
      ['Java 16的Vector API孵化作用？', ['SIMD计算', '网络计算', '并发计算', '以上都不对'], 0],
      [
        'Java 16的Unix-Domain Socket作用？',
        ['本地进程通信', '网络通信', '远程通信', '以上都不对'],
        0,
      ],
      [
        'Java 17的新特性有？',
        [
          'Sealed Classes正式, Pattern Matching for switch预览',
          'Lambda, Stream',
          '模块化',
          '以上都不对',
        ],
        0,
      ],
      ['Java 17的Sealed Classes正式吗？', ['是', '否', '预览', '以上都不对'], 0],
      ['Java 17是LTS版本吗？', ['是', '否', '不确定', '以上都不对'], 0],
      [
        'Java 17的Pattern Matching for switch预览作用？',
        ['switch模式匹配', 'if模式匹配', 'for模式匹配', '以上都不对'],
        0,
      ],
      [
        'Java 17的Foreign Function & Memory API孵化作用？',
        ['调用本地代码', '调用Java代码', '调用网络代码', '以上都不对'],
        0,
      ],
      [
        'Java 17的Context-Specific Deserialization作用？',
        ['反序列化过滤', '序列化加密', '反序列化压缩', '以上都不对'],
        0,
      ],
    ];
    const item = items[(i - 841) % items.length];
    q.title = item[0];
    q.options = item[1];
    q.correctAnswer = item[2];
    questions.push(q);
  }
  // ==================== 第九部分：设计模式与最佳实践 (941-1000) ====================
  for (let i = 941; i <= 1000; i++) {
    const q = { id: `java-${i}`, title: '', options: [], correctAnswer: 0 };
    const items = [
      [
        'Java中单例模式的实现方式有？',
        ['饿汉, 懒汉, 双重检查, 枚举', '工厂, 抽象工厂', '建造者, 原型', '以上都不对'],
        0,
      ],
      [
        'Java中饿汉单例的特点是？',
        ['线程安全，类加载时创建', '延迟加载', '非线程安全', '以上都不对'],
        0,
      ],
      [
        'Java中懒汉单例的特点是？',
        ['延迟加载，非线程安全', '线程安全', '类加载时创建', '以上都不对'],
        0,
      ],
      [
        'Java中双重检查单例的特点是？',
        ['延迟加载，线程安全', '非线程安全', '类加载时创建', '以上都不对'],
        0,
      ],
      [
        'Java中双重检查单例需要volatile吗？',
        ['需要，防止指令重排序', '不需要', '可选', '以上都不对'],
        0,
      ],
      [
        'Java中静态内部类单例的特点是？',
        ['延迟加载，线程安全', '非线程安全', '类加载时创建', '以上都不对'],
        0,
      ],
      [
        'Java中枚举单例的特点是？',
        ['最佳实现，防止反射和序列化破坏', '非线程安全', '延迟加载', '以上都不对'],
        0,
      ],
      ['Java中工厂模式的作用是？', ['创建对象', '结构对象', '行为对象', '以上都不对'], 0],
      [
        'Java中简单工厂的特点是？',
        ['一个工厂创建所有产品', '一个工厂创建一种产品', '多个工厂创建多种产品', '以上都不对'],
        0,
      ],
      [
        'Java中工厂方法的特点是？',
        ['一个工厂创建一种产品', '一个工厂创建所有产品', '多个工厂创建多种产品', '以上都不对'],
        0,
      ],
      ['Java中抽象工厂的特点是？', ['创建产品族', '创建单一产品', '创建所有产品', '以上都不对'], 0],
      ['Java中建造者模式的作用是？', ['构建复杂对象', '创建简单对象', '克隆对象', '以上都不对'], 0],
      [
        'Java中建造者模式的特点是？',
        ['分离构建和表示', '统一构建和表示', '简化构建', '以上都不对'],
        0,
      ],
      ['Java中原型模式的作用是？', ['克隆对象', '创建对象', '构建对象', '以上都不对'], 0],
      [
        'Java中原型模式的实现是？',
        ['实现Cloneable接口', '实现Serializable接口', '实现Comparable接口', '以上都不对'],
        0,
      ],
      [
        'Java中深克隆和浅克隆的区别？',
        [
          '深克隆复制引用对象，浅克隆不复制',
          '浅克隆复制引用对象，深克隆不复制',
          '无区别',
          '以上都不对',
        ],
        0,
      ],
      ['Java中适配器模式的作用是？', ['接口转换', '接口创建', '接口隔离', '以上都不对'], 0],
      [
        'Java中类适配器的实现是？',
        [
          '继承被适配类，实现目标接口',
          '组合被适配类，实现目标接口',
          '实现被适配接口，继承目标类',
          '以上都不对',
        ],
        0,
      ],
      [
        'Java中对象适配器的实现是？',
        [
          '组合被适配类，实现目标接口',
          '继承被适配类，实现目标接口',
          '实现被适配接口，继承目标类',
          '以上都不对',
        ],
        0,
      ],
      ['Java中桥接模式的作用是？', ['分离抽象和实现', '接口转换', '接口创建', '以上都不对'], 0],
      ['Java中组合模式的作用是？', ['树形结构', '接口转换', '对象克隆', '以上都不对'], 0],
      ['Java中装饰器模式的作用是？', ['动态添加功能', '接口转换', '对象克隆', '以上都不对'], 0],
      ['Java中装饰器和继承的区别？', ['装饰器更灵活', '继承更灵活', '无区别', '以上都不对'], 0],
      ['Java中外观模式的作用是？', ['简化接口', '接口转换', '对象克隆', '以上都不对'], 0],
      ['Java中享元模式的作用是？', ['共享对象', '接口转换', '对象克隆', '以上都不对'], 0],
      ['Java中代理模式的作用是？', ['控制访问', '接口转换', '对象克隆', '以上都不对'], 0],
      [
        'Java中静态代理的特点是？',
        ['代理类在编译时确定', '代理类在运行时生成', '无代理类', '以上都不对'],
        0,
      ],
      [
        'Java中动态代理的特点是？',
        ['代理类在运行时生成', '代理类在编译时确定', '无代理类', '以上都不对'],
        0,
      ],
      ['Java中JDK动态代理的特点是？', ['基于接口', '基于类', '基于继承', '以上都不对'], 0],
      ['Java中CGLIB动态代理的特点是？', ['基于类', '基于接口', '基于继承', '以上都不对'], 0],
      ['Java中责任链模式的作用是？', ['处理链式请求', '接口转换', '对象克隆', '以上都不对'], 0],
      ['Java中命令模式的作用是？', ['封装请求为对象', '接口转换', '对象克隆', '以上都不对'], 0],
      ['Java中解释器模式的作用是？', ['定义语言文法', '接口转换', '对象克隆', '以上都不对'], 0],
      ['Java中迭代器模式的作用是？', ['顺序访问集合', '接口转换', '对象克隆', '以上都不对'], 0],
      ['Java中介者模式的作用是？', ['封装交互', '接口转换', '对象克隆', '以上都不对'], 0],
      ['Java中备忘录模式的作用是？', ['保存和恢复状态', '接口转换', '对象克隆', '以上都不对'], 0],
      ['Java中观察者模式的作用是？', ['定义一对多依赖', '接口转换', '对象克隆', '以上都不对'], 0],
      ['Java中状态模式的作用是？', ['允许对象改变行为', '接口转换', '对象克隆', '以上都不对'], 0],
      ['Java中策略模式的作用是？', ['封装算法族', '接口转换', '对象克隆', '以上都不对'], 0],
      ['Java中模板方法模式的作用是？', ['定义算法骨架', '接口转换', '对象克隆', '以上都不对'], 0],
      [
        'Java中访问者模式的作用是？',
        ['分离数据结构与操作', '接口转换', '对象克隆', '以上都不对'],
        0,
      ],
      [
        'Java中开闭原则是指？',
        ['对扩展开放，对修改关闭', '对修改开放，对扩展关闭', '都不开放', '以上都不对'],
        0,
      ],
      [
        'Java中单一职责原则是指？',
        ['一个类只有一个引起变化的原因', '一个类只写一个方法', '一个方法只写一行', '以上都不对'],
        0,
      ],
      [
        'Java中里氏替换原则是指？',
        ['子类可以替换父类', '父类可以替换子类', '不能替换', '以上都不对'],
        0,
      ],
      [
        'Java中依赖倒置原则是指？',
        ['依赖抽象，不依赖具体', '依赖具体，不依赖抽象', '都不依赖', '以上都不对'],
        0,
      ],
      [
        'Java中接口隔离原则是指？',
        ['客户端不应依赖不需要的接口', '接口越少越好', '接口越多越好', '以上都不对'],
        0,
      ],
      ['Java中迪米特法则是指？', ['最少知道原则', '最多知道原则', '不需要知道', '以上都不对'], 0],
      [
        'Java中合成复用原则是指？',
        ['优先使用组合而非继承', '优先使用继承而非组合', '都不使用', '以上都不对'],
        0,
      ],
      [
        'Java中SOLID原则包含？',
        ['SRP, OCP, LSP, ISP, DIP', 'SOP, OOP', 'AOP, OOP', '以上都不对'],
        0,
      ],
      ['Java中不可变对象的好处是？', ['线程安全，易于缓存', '修改方便', '性能差', '以上都不对'], 0],
      [
        'Java中如何创建不可变对象？',
        ['final类，final字段，无setter，深拷贝引用', '使用static', '使用volatile', '以上都不对'],
        0,
      ],
      [
        'Java中String为什么设计为不可变？',
        ['字符串常量池，线程安全，安全', '性能差', '内存占用大', '以上都不对'],
        0,
      ],
      [
        'Java中防御性拷贝的作用是？',
        ['保护内部对象不被外部修改', '提高性能', '减少内存', '以上都不对'],
        0,
      ],
      ['Java中fail-fast机制的实现是？', ['modCount计数器', '加锁', 'volatile', '以上都不对'], 0],
      ['Java中线程安全的单例最佳实践是？', ['枚举单例', '饿汉式', '懒汉式', '以上都不对'], 0],
      [
        'Java中避免内存泄漏的最佳实践是？',
        ['及时释放引用，使用WeakReference', '多创建对象', '少创建对象', '以上都不对'],
        0,
      ],
      [
        'Java中对象池模式的作用是？',
        ['重用对象减少开销', '创建更多对象', '销毁对象', '以上都不对'],
        0,
      ],
      [
        'Java中享元模式与对象池的区别是？',
        ['享元解决共享细粒度对象，池解决重用对象', '没有区别', '享元更复杂', '以上都不对'],
        0,
      ],
      [
        'Java中代理模式与装饰器模式的区别是？',
        ['代理控制访问，装饰器增强功能', '没有区别', '代理更简单', '以上都不对'],
        0,
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
const outputPath = join(__dirname, 'java_questions.json');
fs.writeFileSync(outputPath, JSON.stringify(questions, null, 2));
console.log(`已生成 ${questions.length} 道Java题目，保存到 ${outputPath}`);
