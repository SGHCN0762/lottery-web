import { ref } from 'vue'

/**
 * 题目管理 Hook
 * @returns {Object} 题目相关方法和数据
 */
export function useQuestions() {
  /**
   * 题目数据库
   * 包含5道技术类选择题，每题有4个选项和1个正确答案索引
   */
  const questions = ref([
    {
      id: 1,
      title: 'Vue 3 中用于定义响应式数据的组合式 API 是？',
      options: ['data()', 'ref()', 'useState()', 'setState()'],
      correctAnswer: 1  // B选项
    },
    {
      id: 2,
      title: 'CSS 中哪个属性用于设置元素的透明度？',
      options: ['visibility', 'display', 'opacity', 'filter'],
      correctAnswer: 2  // C选项
    },
    {
      id: 3,
      title: 'JavaScript 中，以下哪个方法可以将对象转换为 JSON 字符串？',
      options: ['JSON.parse()', 'JSON.stringify()', 'Object.toString()', 'String.toJSON()'],
      correctAnswer: 1  // B选项
    },
    {
      id: 4,
      title: 'HTTP 状态码 404 表示什么含义？',
      options: ['服务器错误', '请求成功', '资源未找到', '禁止访问'],
      correctAnswer: 2  // C选项
    },
    {
      id: 5,
      title: '在 Git 中，哪个命令用于将更改提交到本地仓库？',
      options: ['git push', 'git commit', 'git add', 'git merge'],
      correctAnswer: 1  // B选项
    }
  ])

  /**
   * 获取当前题目对象
   * @param {number} currentIndex - 当前题目索引
   * @returns {Object} 当前题目数据
   */
  const getCurrentQuestion = (currentIndex) => {
    return questions.value[currentIndex]
  }

  /**
   * 打乱题目顺序
   */
  const shuffleQuestions = () => {
    questions.value.sort(() => Math.random() - 0.5)
  }

  return {
    questions,
    getCurrentQuestion,
    shuffleQuestions
  }
}
