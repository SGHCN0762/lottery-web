/**
 * 通用常量定义
 * 集中管理项目中所有通用的常量
 */

// ========================================
// localStorage 键名
// ========================================
export const STORAGE_KEYS = {
  // 用户相关
  USER_POINTS: 'lottery_user_points',
  // 游戏记录相关
  GAME_RECORDS: 'lottery_game_records',
  // 主题相关
  THEME_MODE: 'theme-mode',
  // 签到相关
  CONSECUTIVE_DAYS: 'lottery_consecutive_days',
  LAST_CHECKIN_DATE: 'lottery_last_checkin_date',
  CHECKIN_HISTORY: 'lottery_checkin_history',
  CHECKED_DATES: 'lottery_checked_dates',
  // 转盘相关
  SPIN_HISTORY: 'lottery_spin_history'
}

// ========================================
// 游戏类型
// ========================================
export const GAME_TYPES = {
  DAILY_CHECK_IN: 'dailyCheckIn',
  LUCKY_WHEEL: 'luckyWheel',
  NUMBER_GUESS: 'numberGuess',
  QUIZ_CHALLENGE: 'quizChallenge',
  EXCHANGE: 'exchange'
}

// ========================================
// 主题模式
// ========================================
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
}

// ========================================
// 时间范围（毫秒）
// ========================================
export const TIME_RANGES = {
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000,
  THREE_MONTHS: 90 * 24 * 60 * 60 * 1000
}

// ========================================
// 记录限制数量
// ========================================
export const RECORD_LIMITS = {
  GAME_RECORDS: 100,
  SPIN_HISTORY: 10,
  CHECKIN_HISTORY: 30
}

// ========================================
// 签到配置
// ========================================
export const CHECKIN_CONFIG = {
  BASE_POINTS: 10,
  MILESTONES: [
    { days: 3, bonus: 5 },
    { days: 7, bonus: 15 },
    { days: 15, bonus: 30 },
    { days: 30, bonus: 60 }
  ]
}

// ========================================
// 徽章解锁条件
// ========================================
export const BADGE_CONDITIONS = {
  FIRST_GAME: { totalGames: 1 },
  CHECKIN_7_DAYS: { checkInDays: 7 },
  QUIZ_WINS_10: { quizWins: 10 },
  LUCKY_WHEEL_10: { luckyWheelCount: 10 },
  NUMBER_GUESS_WINS_10: { numberGuessWins: 10 },
  POINTS_500: { totalPoints: 500 },
  GAME_EXPERT: { gameTypesCount: 4 }
}
