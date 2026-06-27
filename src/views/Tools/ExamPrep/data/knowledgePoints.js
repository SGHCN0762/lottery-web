/**
 * 公考备考助手知识点分类体系
 * 按照行测五大模块组织知识点树状结构
 */

export const knowledgeCategories = {
  // 言语理解与表达
  verbal: {
    name: '言语理解与表达',
    icon: '📝',
    color: '#1989fa',
    subcategories: {
      // 逻辑填空
      'verbal-logic-fill': {
        name: '逻辑填空',
        icon: '✏️',
        topics: {
          'verbal-entity': {
            name: '实词辨析',
            description: '辨析近义实词的含义和使用语境',
            examples: [
              '辨析"制订"与"制定"的用法',
              '辨析"包含"与"蕴涵"的区别'
            ]
          },
          'verbal-idiom': {
            name: '成语辨析',
            description: '理解成语的意义和使用场景',
            examples: [
              '"南辕北辙"与"背道而驰"的区别',
              '"举重若轻"与"游刃有余"的辨析'
            ]
          },
          'verbal-connector': {
            name: '关联词辨析',
            description: '辨析不同关联词表达的逻辑关系',
            examples: [
              '"因此"与"从而"的区别',
              '"然而"与"可是"的用法辨析'
            ]
          }
        }
      },
      // 片段阅读
      'verbal-reading': {
        name: '片段阅读',
        icon: '📖',
        topics: {
          'verbal-main-point': {
            name: '主旨观点题',
            description: '概括文段的主旨和作者的观点态度',
            examples: [
              '寻找文段的中心句',
              '判断作者的态度倾向'
            ]
          },
          'verbal-detail': {
            name: '细节判断题',
            description: '识别文段中的具体信息和细节',
            examples: [
              '理解文段中的具体数据',
              '辨别选项与原文的细微差异'
            ]
          },
          'verbal-word-sentence': {
            name: '词句理解题',
            description: '理解指定词语或句子的含义',
            examples: [
              '指代词指代内容的确定',
              '修辞句的理解与分析'
            ]
          },
          'verbal-infer': {
            name: '推断下文题',
            description: '推断文章接下来会讲述的内容',
            examples: [
              '排除与前文无关的选项',
              '识别文章的话题延续'
            ]
          }
        }
      },
      // 语句表达
      'verbal-sentence': {
        name: '语句表达',
        icon: '📝',
        topics: {
          'verbal-sentence-sort': {
            name: '句子排序题',
            description: '将打乱的句子重新排列成连贯文段',
            examples: [
              '确定首句和尾句',
              '识别句间的逻辑顺序'
            ]
          },
          'verbal-sentence-fill': {
            name: '句子填空题',
            description: '在文段空白处填入恰当的句子',
            examples: [
              '理解空前空后的语境',
              '选择与文段话题一致的选项'
            ]
          },
          'verbal-conclusion': {
            name: '结语推断题',
            description: '推断文章结尾会讲述的内容',
            examples: [
              '总结全文得出结论',
              '预测作者下一步的建议'
            ]
          }
        }
      }
    }
  },

  // 判断推理
  logic: {
    name: '判断推理',
    icon: '🧠',
    color: '#ff976a',
    subcategories: {
      // 图形推理
      'logic-graphic': {
        name: '图形推理',
        icon: '🔷',
        topics: {
          'logic-position': {
            name: '位置类',
            description: '图形的位置变化规律',
            examples: [
              '平移规律的识别',
              '旋转与翻转的规律'
            ]
          },
          'logic-style': {
            name: '样式类',
            description: '图形的样式遍历和运算',
            examples: [
              '求同与求异的规律',
              '黑白叠加的运算'
            ]
          },
          'logic-quantity': {
            name: '数量类',
            description: '图形中点线面角的数量规律',
            examples: [
              '数封闭区域的数量',
              '数线条的数量规律'
            ]
          },
          'logic-attribute': {
            name: '属性类',
            description: '图形的对称性、开闭性等属性',
            examples: [
              '轴对称与中心对称的识别',
              '图形的开闭性判断'
            ]
          },
          'logic-space': {
            name: '空间重构',
            description: '正方体及其展开图的推理',
            examples: [
              '正方体展开图的折叠',
              '视图与立体图的对应'
            ]
          }
        }
      },
      // 定义判断
      'logic-definition': {
        name: '定义判断',
        icon: '📋',
        topics: {
          'logic-def-single': {
            name: '单定义判断',
            description: '根据一个定义进行判断',
            examples: [
              '提取定义的关键要点',
              '匹配选项与定义'
            ]
          },
          'logic-def-multiple': {
            name: '多定义判断',
            description: '根据多个定义进行判断',
            examples: [
              '区分不同定义的关键词',
              '匹配选项对应的定义'
            ]
          }
        }
      },
      // 类比推理
      'logic-analogy': {
        name: '类比推理',
        icon: '🔄',
        topics: {
          'logic-analogy-two': {
            name: '两项式类比',
            description: '词与词之间的逻辑关系',
            examples: [
              '"苹果：水果"的种属关系',
              '"医生：医院"的职业与场所关系'
            ]
          },
          'logic-analogy-three': {
            name: '三项式类比',
            description: '三个词之间的逻辑关系',
            examples: [
              '"父亲：儿子：兄弟"的亲属关系',
              '"笔：纸：写字"的工具与用途关系'
            ]
          },
          'logic-analogy-sentence': {
            name: '句子式类比',
            description: '完整句子的逻辑关系类比',
            examples: [
              '因果关系的类比',
              '目的与手段的类比'
            ]
          }
        }
      },
      // 逻辑判断
      'logic-judgment': {
        name: '逻辑判断',
        icon: '⚖️',
        topics: {
          'logic-translate': {
            name: '翻译推理',
            description: '将命题翻译成逻辑表达式',
            examples: [
              '"如果...那么..."的翻译',
              '"只有...才..."的翻译'
            ]
          },
          'logic-true-false': {
            name: '真假推理',
            description: '判断命题的真假关系',
            examples: [
              '矛盾关系的识别',
              '反对关系的应用'
            ]
          },
          'logic-analysis': {
            name: '分析推理',
            description: '通过条件分析得出结论',
            examples: [
              '排列组合问题',
              '条件匹配问题'
            ]
          },
          'logic-induction': {
            name: '归纳推理',
            description: '从具体事例归纳一般结论',
            examples: [
              '强度比较的归纳',
              '可行性分析的归纳'
            ]
          },
          'logic-strengthen': {
            name: '加强削弱',
            description: '加强或削弱论点论据',
            examples: [
              '搭桥与拆桥的方法',
              '否定论据与否定论点'
            ]
          }
        }
      }
    }
  },

  // 数量关系
  math: {
    name: '数量关系',
    icon: '🔢',
    color: '#07c160',
    subcategories: {
      // 数学运算
      'math-calculation': {
        name: '基础计算',
        icon: '➕',
        topics: {
          'math-basic': {
            name: '基础运算',
            description: '四则运算和数列计算',
            examples: [
              '等差数列与等比数列',
              '分数与小数的混合运算'
            ]
          },
          'math-equation': {
            name: '方程与方程组',
            description: '一元方程、二元方程组的解法',
            examples: [
              '一元二次方程的求解',
              '二元一次方程组的解法'
            ]
          }
        }
      },
      // 应用问题
      'math-application': {
        name: '应用问题',
        icon: '📊',
        topics: {
          'math-engineering': {
            name: '工程问题',
            description: '合作完成工作的效率与时间',
            examples: [
              '甲乙合作的工作时间',
              '多队轮流施工的问题'
            ]
          },
          'math-journey': {
            name: '行程问题',
            description: '物体运动的路程、速度、时间',
            examples: [
              '相遇与追及问题',
              '流水行船问题'
            ]
          },
          'math-profit': {
            name: '利润问题',
            description: '成本、定价、利润的关系',
            examples: [
              '打折销售问题',
              '利润率与定价问题'
            ]
          },
          'math-age': {
            name: '年龄问题',
            description: '年龄的增长与倍数关系',
            examples: [
              '年龄差不变的应用',
              '年龄与年份的对应'
            ]
          },
          'math-permutation': {
            name: '排列组合',
            description: '排列与组合的计算方法',
            examples: [
              '排列数与组合数的计算',
              '捆绑法与插空法'
            ]
          },
          'math-probability': {
            name: '概率问题',
            description: '事件发生的可能性计算',
            examples: [
              '古典概率的计算',
              '条件概率的应用'
            ]
          },
          'math-inclusion': {
            name: '容斥问题',
            description: '集合的交集与并集问题',
            examples: [
              '两集合容斥原理',
              '三集合容斥原理'
            ]
          },
          'math-geometry': {
            name: '几何问题',
            description: '平面几何和立体几何的计算',
            examples: [
              '三角形与四边形的面积',
              '长方体与圆柱体的体积'
            ]
          }
        }
      }
    }
  },

  // 资料分析
  data: {
    name: '资料分析',
    icon: '📊',
    color: '#7232dd',
    subcategories: {
      // 基础概念
      'data-basic': {
        name: '基础概念',
        icon: '📈',
        topics: {
          'data-growth': {
            name: '增长率',
            description: '增长量与增长率的计算',
            examples: [
              '同比增长率的计算',
              '环比增长率的计算',
              '年均增长率的估算'
            ]
          },
          'data-decline': {
            name: '下降率',
            description: '下降幅度的计算',
            examples: [
              '降幅的计算方法',
              '降幅与增速的关系'
            ]
          },
          'data-ratio': {
            name: '比重',
            description: '部分占整体的比例计算',
            examples: [
              '比重的基本计算',
              '比重变化的判断'
            ]
          },
          'data-average': {
            name: '平均数',
            description: '平均水平的计算与分析',
            examples: [
              '平均数的计算',
              '平均数与总量的关系'
            ]
          },
          'data-multiple': {
            name: '倍数关系',
            description: '倍数与翻番的计算',
            examples: [
              '倍数的基本计算',
              '"增长N倍"与"是N倍"的区别'
            ]
          }
        }
      },
      // 分析方法
      'data-method': {
        name: '分析方法',
        icon: '🔍',
        topics: {
          'data-compare': {
            name: '比较类问题',
            description: '比较多个数据的大小或排序',
            examples: [
              '直接比较大小',
              '通过增量比较'
            ]
          },
          'data-forecast': {
            name: '趋势预判',
            description: '根据现有数据预测未来',
            examples: [
              '线性趋势的预测',
              '增长率趋势的延续'
            ]
          },
          'data-synthesis': {
            name: '综合分析',
            description: '对多个数据关系的综合判断',
            examples: [
              '判断说法正误',
              '多数据关系的综合分析'
            ]
          }
        }
      }
    }
  },

  // 常识判断
  common: {
    name: '常识判断',
    icon: '📚',
    color: '#ff6034',
    subcategories: {
      // 政治常识
      'common-politics': {
        name: '政治常识',
        icon: '🏛️',
        topics: {
          'common-party': {
            name: '党史党建',
            description: '中国共产党历史和党的建设',
            examples: [
              '重要历史会议',
              '党的指导思想发展'
            ]
          },
          'common-government': {
            name: '政府机构',
            description: '国家机构设置和职能',
            examples: [
              '人大与政协的职能',
              '国务院机构改革'
            ]
          },
          'common-policy': {
            name: '时政方针',
            description: '重大方针政策和重要讲话',
            examples: [
              '重要文件精神',
              '重大会议内容'
            ]
          }
        }
      },
      // 法律常识
      'common-law': {
        name: '法律常识',
        icon: '⚖️',
        topics: {
          'common-constitution': {
            name: '宪法',
            description: '宪法的基本内容和原则',
            examples: [
              '公民的基本权利',
              '国家机构的职责'
            ]
          },
          'common-civil': {
            name: '民法',
            description: '民事法律关系的基本内容',
            examples: [
              '物权与债权',
              '婚姻与继承'
            ]
          },
          'common-criminal': {
            name: '刑法',
            description: '犯罪与刑罚的基本规定',
            examples: [
              '正当防卫与紧急避险',
              '常见犯罪的认定'
            ]
          },
          'common-admin': {
            name: '行政法',
            description: '行政行为的合法性审查',
            examples: [
              '行政复议与行政诉讼',
              '公务员法的主要内容'
            ]
          }
        }
      },
      // 人文历史
      'common-history': {
        name: '人文历史',
        icon: '📜',
        topics: {
          'common-ancient': {
            name: '古代史',
            description: '中国古代历史重要事件',
            examples: [
              '重要历史朝代',
              '著名历史人物与事件'
            ]
          },
          'common-modern': {
            name: '近现代史',
            description: '中国近现代重要历史',
            examples: [
              '鸦片战争到新中国成立',
              '改革开放以来的发展'
            ]
          },
          'common-culture': {
            name: '文化常识',
            description: '中华传统文化知识',
            examples: [
              '诗词曲赋的基本知识',
              '传统节日与习俗'
            ]
          }
        }
      },
      // 地理环境
      'common-geography': {
        name: '地理环境',
        icon: '🌍',
        topics: {
          'common-china': {
            name: '中国地理',
            description: '中国自然地理和行政区划',
            examples: [
              '主要地形区与河流',
              '省份简称与省会'
            ]
          },
          'common-world': {
            name: '世界地理',
            description: '世界主要国家和地区',
            examples: [
              '大洲大洋的分布',
              '主要国家的位置'
            ]
          },
          'common-environment': {
            name: '自然环境',
            description: '自然地理现象与规律',
            examples: [
              '气候类型与分布',
              '自然灾害的成因'
            ]
          }
        }
      },
      // 科学技术
      'common-science': {
        name: '科学技术',
        icon: '🔬',
        topics: {
          'common-physics': {
            name: '物理常识',
            description: '日常生活中的物理原理',
            examples: [
              '力学与热学基础',
              '光学与声学现象'
            ]
          },
          'common-chemistry': {
            name: '化学常识',
            description: '化学知识在生活中的应用',
            examples: [
              '常见物质的性质',
              '环境保护与化学'
            ]
          },
          'common-bio': {
            name: '生物常识',
            description: '生物学基础知识',
            examples: [
              '人体结构与功能',
              '生态系统组成'
            ]
          },
          'common-tech': {
            name: '科技成就',
            description: '中国与世界重大科技成果',
            examples: [
              '航天航空成就',
              '信息技术发展'
            ]
          }
        }
      },
      // 经济常识
      'common-economy': {
        name: '经济常识',
        icon: '💰',
        topics: {
          'common-micro': {
            name: '微观经济',
            description: '市场经济基本原理',
            examples: [
              '供求关系与价格',
              '市场结构的类型'
            ]
          },
          'common-macro': {
            name: '宏观经济',
            description: '宏观经济指标与政策',
            examples: [
              'GDP与经济增长',
              '货币政策与财政政策'
            ]
          }
        }
      }
    }
  }
};

// 扁平化的知识点列表（用于快速查找）
export const flatTopicList = [];

// 递归生成扁平化的知识点列表
function flattenTopics(categories, parentPath = []) {
  for (const [key, category] of Object.entries(categories)) {
    if (category.subcategories) {
      flattenTopics(category.subcategories, [...parentPath, { key, name: category.name }]);
    } else if (category.topics) {
      for (const [topicKey, topic] of Object.entries(category.topics)) {
        flatTopicList.push({
          key: topicKey,
          name: topic.name,
          description: topic.description,
          examples: topic.examples || [],
          path: [...parentPath, { key, name: category.name }],
          category: key.split('-')[0]
        });
      }
    }
  }
}

flattenTopics(knowledgeCategories);

export default {
  knowledgeCategories,
  flatTopicList
};
