// 每日签到
export default {

  myPoints: '我的积分',
  consecutiveDays: '连续签到',
  days: '天',
  rules: {
    title: '游戏规则',
    rule1: '每天可签到一次，获得基础10积分',
    rule2: '连续签到有额外奖励：3天+5分，7天+15分，15天+30分，30天+60分',
    rule3: '中断后重新签到，连续天数重置为1',
    rule4: '坚持签到，累积更多积分！',
  },
  calendar: {
    title: '本月签到记录',
  },
  rewards: {
    title: '连续签到奖励',
  },
  milestone: {
    achieved: '✓ 已获得',
    oneDayLeft: '🔥 差1天',
    daysLeft: '还需{days}天',
  },
  notCheckedIn: '今天还没有签到哦！',
  checkingIn: '签到中...',
  checkInNow: '立即签到',
  checkedInToday: '今日已签到',
  nextCheckInTime: '下次签到时间',
  history: {
    title: '最近签到记录',
    base: '基础',
    consecutive: '连续{days}天',
    total: '共',
  },
  success: {
    base: '签到成功！获得 {points} 积分',
    bonus: '，连续{days}天额外奖励 {points} 积分',
  },

}
