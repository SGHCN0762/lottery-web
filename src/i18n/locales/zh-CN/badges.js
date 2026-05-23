// 成就系统
export default {
  title: '我的成就',
  unlocked: '已获得',
  total: '总成就数',
  completionRate: '完成率',
  filter: {
    all: '全部',
    unlocked: '已获得',
    locked: '未获得',
  },
  empty: '暂无成就',
  detail: {
    title: '成就详情',
    requirement: '解锁条件',
    reward: '成就奖励',
    tips: '小贴士',
    defaultTips: '继续努力，你一定能获得这个成就！',
  },
  // 成就列表数据
  badges: {
    firstGame: {
      name: '初出茅庐',
      description: '完成首次游戏',
      requirement: '参与任意一款游戏',
      tips: '万事开头难，你已经迈出了第一步！',
    },
    checkIn7Days: {
      name: '签到达人',
      description: '连续签到7天',
      requirement: '连续签到7天',
      tips: '坚持就是胜利，继续保持！',
    },
    quizMaster: {
      name: '答题高手',
      description: '答题挑战全部答对',
      requirement: '在答题挑战中5题全对',
      tips: '多学习技术知识，提高答题正确率！',
    },
    luckyStar: {
      name: '幸运之星',
      description: '在幸运转盘获得一等奖',
      requirement: '在幸运转盘中抽中一等奖（500积分）',
      tips: '运气也是实力的一部分，继续尝试吧！',
    },
    numberGuessMaster: {
      name: '猜数大师',
      description: '3次内猜中数字',
      requirement: '在数字猜猜猜中3次以内猜中',
      tips: '二分查找策略是你的好帮手！',
    },
    pointsRich: {
      name: '积分富豪',
      description: '累计获得1000积分',
      requirement: '累计获得1000积分（不含初始积分）',
      tips: '多参与游戏，积少成多！',
    },
    gameExpert: {
      name: '游戏达人',
      description: '参与所有类型的游戏',
      requirement: '参与过所有4种游戏',
      tips: '你已经体验了所有游戏，真棒！',
    },
    socialExpert: {
      name: '社交达人',
      description: '成功邀请5位好友',
      requirement: '通过邀请链接成功注册5位好友',
      tips: '分享给你的朋友，一起娱乐吧！',
    },
  },
};
