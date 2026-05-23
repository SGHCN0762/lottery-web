// 帮助中心
export default {

  title: '帮助中心',
  searchPlaceholder: '搜索问题...',
  faq: '常见问题',
  gameGuide: '游戏说明',
  pointsRules: '积分规则',
  contactUs: '联系我们',
  onlineService: {
    title: '在线客服',
    serviceHours: '服务时间：9:00 - 22:00',
    startChat: '开始咨询',
    otherContactMethods: '其他联系方式',
    customerServicePhone: '客服电话',
    customerServiceEmail: '客服邮箱',
    workingHours: '工作时间',
    workingHoursValue: '周一至周日 9:00-22:00',
    averageResponseTime: '平均响应时间：2分钟',
    clearHistory: '清空记录',
    startChatHint: '开始与客服对话吧',
    inputPlaceholder: '请输入您的问题...',
    send: '发送',
    onlineStatus: '在线服务中',
    offlineStatus: '离线状态',
    welcomeMessage: '您好！欢迎使用在线客服，请问有什么可以帮助您的？',
    typingMessage: '客服正在输入...',
    clearHistoryMessage: '确定要清空所有聊天记录吗？此操作不可恢复。',
    clearHistorySuccess: '聊天记录已清空',
    pageLoaded: '在线客服页面已加载',
    quickQuestions: {
      rechargePoints: '如何充值积分？',
      cashExchange: '积分可以兑换现金吗？',
      forgotPassword: '忘记密码怎么办？',
      modifyProfile: '如何修改个人信息？',
      viewGameRecords: '游戏记录在哪里查看？',
    },
    faq: {
      howToEarnPoints: '如何获得积分？',
      howToEarnPointsAnswer:
        '您可以通过每日签到、参与游戏、邀请好友等方式获得积分。具体规则请查看各游戏的说明。',
      pointsExpire: '积分会过期吗？',
      pointsExpireAnswer: '积分永久有效，不会过期。请妥善保管您的账号。',
      howToContact: '如何联系客服？',
      howToContactAnswer:
        '您可以通过在线客服、客服电话（400-123-4567）或客服邮箱（{email}）联系我们。',
    },
    replies: {
      points:
        '关于积分问题，您可以通过每日签到、参与游戏、邀请好友等方式获得积分。如需充值，可在"积分兑换"页面进行操作。',
      account:
        '如需修改密码或找回账号，请前往"账户设置"页面进行操作。如遇到问题，可提供您的用户ID，我们将协助您处理。',
      games:
        '我们提供多种有趣的游戏，包括数字猜猜猜、幸运转盘、答题挑战等。您可以在"帮助中心"查看详细的游戏规则说明。',
      thanks: '不客气！如果您还有其他问题，随时欢迎咨询。祝您游戏愉快！😊',
      default1: '感谢您的咨询，我们正在处理您的问题。',
      default2: '收到您的问题，请稍等片刻，我会为您查询相关信息。',
      default3: '好的，我了解了，让我为您详细解答。',
      default4: '这个问题我需要确认一下，请您稍等。',
      default5: '抱歉让您久等了，关于您的问题，建议您查看帮助中心的详细说明。',
    },
  },
  feedback: '意见反馈',
  report: '举报问题',
  howToEarn: '如何获得积分？',
  howToUse: '如何使用积分？',
  expireRule: '积分会过期吗？',
  guidePopup: {
    rules: '游戏规则',
    rewards: '奖励机制',
    notes: '注意事项',
  },
  pointsPopup: {
    title: '积分规则',
    earn: {
      title: '如何获得积分',
      items: [
        '每日签到：基础10积分，连续签到有额外奖励',
        '数字猜猜猜：根据猜测准确度获得10-50积分',
        '幸运转盘：消耗10积分参与，有机会获得更高奖励',
        '答题挑战：答对一题得5分，连续答对有额外奖励',
        '邀请好友：每邀请一位好友获得50积分',
      ],
    },
    use: {
      title: '如何使用积分',
      items: [
        '参与幸运转盘游戏（每次消耗10积分）',
        '在积分兑换中心兑换礼品',
        '解锁特殊游戏功能',
        '购买游戏道具',
      ],
    },
    expire: {
      title: '积分有效期',
      items: [
        '积分永久有效，不会过期',
        '请妥善保管您的账号，避免积分丢失',
        '如发现积分异常，请及时联系客服',
      ],
    },
  },
  faqList: [
    {
      question: '如何开始玩游戏？',
      answer:
        '点击底部导航栏的"娱乐"按钮，进入游戏中心，选择您感兴趣的游戏即可开始。每个游戏都有详细的游戏规则说明。',
    },
  ],
  gameGuides: {
    numberGuess: {
      rules: '系统随机生成1-100的数字，您有7次机会猜测。每次猜测后会提示偏大或偏小。',
      rewards: '7次内猜中得50积分，5次内得30积分，3次内得10积分。',
      notes: '每天可以无限次参与，但只有首次胜利能获得积分奖励。',
    },
    luckyWheel: {
      rules: '消耗10积分转动转盘，转盘分为6个区域，对应不同等级的奖品。',
      rewards:
        '一等奖500积分，二等奖200积分，三等奖100积分，四等奖50积分，五等奖20积分，谢谢参与。',
      notes: '转盘采用精准定位算法，确保公平公正。',
    },
    quizChallenge: {
      rules: '共5道技术类选择题，每题20秒作答时间。',
      rewards: '答对一题得5分，全部答对额外奖励25分，连续答对有连击加成。',
      notes: '题目涵盖前端、后端、数据库等多个技术领域。',
    },
    dailyCheckIn: {
      rules: '每天登录即可签到，获得基础积分奖励。',
      rewards: '基础奖励10积分，连续签到3天额外+5分，7天额外+15分，30天额外+50分。',
      notes: '签到时间为每天0点刷新，错过当天无法补签。',
    },
  },

}
