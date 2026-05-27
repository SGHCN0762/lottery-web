import { showToast } from 'vant';
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';

/**
 * 抽奖核心逻辑 Hook
 * @param {Object} userPointsHook - 用户积分Hook
 * @param {Object} spinHistoryHook - 抽奖历史Hook
 * @param {Object} wheelRotationHook - 转盘旋转Hook
 * @param {Object} gameRecordsHook - 游戏记录Hook
 * @param {Array} prizes - 奖品列表
 * @param {Function} t - i18n翻译函数
 * @returns {Object} 包含抽奖核心逻辑的方法
 */
export function useLottery(userPointsHook, spinHistoryHook, wheelRotationHook, gameRecordsHook, prizes, t) {
  // 从其他hooks中解构所需的方法和状态
  const { userPoints, updateUserPoints } = userPointsHook;
  const { addSpinRecord } = spinHistoryHook;
  const { isSpinning, spinToPrize, resetWheel } = wheelRotationHook;
  const { addRecord } = gameRecordsHook || {};

  /**
   * 开始抽奖
   * 检查积分、扣除费用、随机选择奖品并执行旋转
   */
  const startSpin = async () => {
    // 检查积分是否足够
    if (userPoints.value < 10) {
      showToast({
        message: t('luckyWheel.insufficientPoints'),
        type: 'fail',
        duration: 2000,
      });
      return;
    }

    // 防止重复点击
    if (isSpinning.value) return;

    isSpinning.value = true;

    // 扣除抽奖费用
    updateUserPoints(-10);

    // 随机选择奖品索引（0-5）
    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const selectedPrize = prizes[prizeIndex];

    // 执行旋转动画
    const wonPrize = await spinToPrize(prizeIndex, selectedPrize);

    // 旋转结束，发放奖励
    handleWin(wonPrize);

    resetWheel();
  };

  /**
 * 处理中奖逻辑
 * 添加积分、记录历史、显示提示
 *
 * @param {Object} prize - 中奖的奖品对象
 */
const handleWin = prize => {
  const prizePoints = prize?.points || 0;

  // 添加到历史记录
  addSpinRecord(prize);

  // 添加到游戏记录
  if (addRecord) {
    addRecord({
      gameType: 'luckyWheel',
      gameName: t('lottery.luckyWheel'),
      result: prizePoints > 0 ? `${prize.name}` : '未中奖',
      pointsChange: prizePoints - 10, // 净积分变化（扣除抽奖费用）
      timestamp: dayjs().valueOf()
    });
  }

  // 添加奖品积分到用户总积分
  updateUserPoints(prizePoints);

  // 显示中奖提示
  showToast({
    message: t('luckyWheel.won', { prize: prize?.name || '未知奖品' }),
    type: 'success',
    duration: 2000,
  });
};

  return {
    startSpin,
  };
}
