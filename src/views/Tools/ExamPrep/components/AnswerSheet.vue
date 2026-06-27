<template>
  <div class="answer-sheet">
    <!-- 答题卡网格区域 -->
    <div
      class="sheet-body"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <!-- 统计信息 -->
      <div class="sheet-stats">
        <div class="stat-row">
          <div class="stat-item">
            <span class="stat-dot unanswered"></span>
            <span class="stat-text">{{ t('tools.examPrep.answerSheet.unanswered') }}</span>
            <span class="stat-value">{{ unansweredCount }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-dot correct"></span>
            <span class="stat-text">{{ t('tools.examPrep.answerSheet.correct') }}</span>
            <span class="stat-value">{{ correctCount }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-dot wrong"></span>
            <span class="stat-text">{{ t('tools.examPrep.answerSheet.wrong') }}</span>
            <span class="stat-value">{{ wrongCount }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-dot pending"></span>
            <span class="stat-text">{{ t('tools.examPrep.answerSheet.pending') }}</span>
            <span class="stat-value">{{ pendingCount }}</span>
          </div>
        </div>
      </div>

      <div class="grid-container" ref="gridRef">
        <div
          v-for="(item, index) in answerList"
          :key="index"
          class="answer-item"
          :class="[
            `status-${item.status}`,
            { current: index === currentIndex },
            { answered: item.status !== ANSWER_STATUS.UNANSWERED }
          ]"
          @click="handleItemClick(index)"
        >
          <span class="item-number">{{ index + 1 }}</span>
          <div v-if="item.status !== ANSWER_STATUS.UNANSWERED" class="item-mark">
            <van-icon
              v-if="item.status === ANSWER_STATUS.CORRECT"
              name="success"
              class="mark-icon"
            />
            <van-icon
              v-else-if="item.status === ANSWER_STATUS.WRONG"
              name="cross"
              class="mark-icon"
            />
            <van-icon
              v-else-if="item.status === ANSWER_STATUS.SKIPPED"
              name="arrow"
              class="mark-icon"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import { Icon as VanIcon, Progress as VanProgress } from 'vant';
import { ANSWER_STATUS } from '../utils/constants.js';

const { t } = useI18n();

// Props 定义
const props = defineProps({
  // 答题列表 [{ status: 'unanswered' | 'correct' | 'wrong' | 'skipped' }]
  answers: {
    type: Array,
    default: () => [],
  },
  // 当前题号索引
  currentIndex: {
    type: Number,
    default: 0,
  },
  // 总题数
  total: {
    type: Number,
    default: 0,
  },
  // 每行显示的题目数
  columnCount: {
    type: Number,
    default: 5,
  },
});

// Emits 定义
const emit = defineEmits(['jump', 'update:currentIndex']);

// 网格容器引用
const gridRef = ref(null);

// 触摸滑动相关
const touchStartX = ref(0);
const touchStartY = ref(0);
const touchEndX = ref(0);
const touchEndY = ref(0);

// 答题列表（确保长度与total一致）
const answerList = computed(() => {
  const list = [];
  for (let i = 0; i < props.total; i++) {
    if (props.answers[i]) {
      list.push(props.answers[i]);
    } else {
      list.push({ status: ANSWER_STATUS.UNANSWERED });
    }
  }
  return list;
});

// 已答题数
const answeredCount = computed(() => {
  return answerList.value.filter(
    item => item.status !== ANSWER_STATUS.UNANSWERED
  ).length;
});

// 未答题数
const unansweredCount = computed(() => {
  return answerList.value.filter(
    item => item.status === ANSWER_STATUS.UNANSWERED
  ).length;
});

// 正确数
const correctCount = computed(() => {
  return answerList.value.filter(
    item => item.status === ANSWER_STATUS.CORRECT
  ).length;
});

// 错误数
const wrongCount = computed(() => {
  return answerList.value.filter(
    item => item.status === ANSWER_STATUS.WRONG
  ).length;
});

// 已答但未判断数
const pendingCount = computed(() => {
  return answerList.value.filter(
    item => item.status === ANSWER_STATUS.SKIPPED
  ).length;
});

// 进度百分比
const progress = computed(() => {
  if (props.total === 0) return 0;
  return Math.round((answeredCount.value / props.total) * 100);
});

// 处理题目点击
const handleItemClick = (index) => {
  if (index === props.currentIndex) return;

  emit('jump', index);
  emit('update:currentIndex', index);

  // 滚动到当前题号位置
  scrollToItem(index);
};

// 滚动到指定题号
const scrollToItem = async (index) => {
  await nextTick();
  if (!gridRef.value) return;

  const items = gridRef.value.querySelectorAll('.answer-item');
  const targetItem = items[index];

  if (targetItem) {
    targetItem.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }
};

// 触摸开始
const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX;
  touchStartY.value = e.touches[0].clientY;
};

// 触摸移动
const handleTouchMove = (e) => {
  touchEndX.value = e.touches[0].clientX;
  touchEndY.value = e.touches[0].clientY;
};

// 触摸结束
const handleTouchEnd = () => {
  const deltaX = touchEndX.value - touchStartX.value;
  const deltaY = touchEndY.value - touchStartY.value;
  const minSwipeDistance = 50;

  // 判断滑动方向（水平滑动优先）
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
    if (deltaX > 0) {
      // 右滑：上一题
      goToPrevious();
    } else {
      // 左滑：下一题
      goToNext();
    }
  }
};

// 跳转到上一题
const goToPrevious = () => {
  if (props.currentIndex > 0) {
    const newIndex = props.currentIndex - 1;
    emit('jump', newIndex);
    emit('update:currentIndex', newIndex);
  }
};

// 跳转到下一题
const goToNext = () => {
  if (props.currentIndex < props.total - 1) {
    const newIndex = props.currentIndex + 1;
    emit('jump', newIndex);
    emit('update:currentIndex', newIndex);
  }
};

// 监听当前题号变化，自动滚动
watch(
  () => props.currentIndex,
  (newIndex) => {
    scrollToItem(newIndex);
  },
  { immediate: true }
);
</script>

<style lang="less" scoped>
.answer-sheet {
  .sheet-body {
    user-select: none;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(var(--column-count, 8), 1fr);
    gap: var(--spacing-sm);
  }

  .answer-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    min-width: 32px;
    min-height: 32px;
    border-radius: var(--radius-md);
    background: var(--color-bg-tertiary);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
    border: 2px solid transparent;

    &:hover {
      transform: scale(1.05);
      box-shadow: var(--shadow-sm);
    }

    // 未答题状态
    &.status-unanswered {
      background: var(--van-gray-3);
      color: var(--color-text-tertiary);
    }

    // 正确状态
    &.status-correct {
      background: var(--van-green-1);
      color: var(--van-green-7);
      border-color: var(--color-success);
    }

    // 错误状态
    &.status-wrong {
      background: var(--van-red-1);
      color: var(--van-red-7);
      border-color: var(--color-danger);
    }

    // 已答但未判断状态
    &.status-skipped {
      background: var(--van-blue-1);
      color: var(--van-blue-7);
      border-color: var(--color-primary);
    }

    // 当前题号高亮
    &.current {
      transform: scale(1.1);
      box-shadow: var(--shadow-md);
      border-color: var(--color-primary);
    }

    .item-number {
      line-height: 1;
    }

    .item-mark {
      position: absolute;
      top: 2px;
      right: 2px;

      .mark-icon {
        font-size: 10px;
      }
    }
  }

  .sheet-stats {
    margin-bottom: var(--spacing-md);

    .stat-row {
      display: grid;
      grid-template-columns: repeat(var(--column-count, 4), 1fr);
      gap: var(--spacing-sm);
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);

      .stat-dot {
        width: 8px;
        height: 8px;
        border-radius: var(--radius-full);

        &.unanswered {
          background: var(--van-gray-4);
        }

        &.correct {
          background: var(--color-success);
        }

        &.wrong {
          background: var(--color-danger);
        }

        &.pending {
          background: var(--color-primary);
        }
      }

      .stat-text {
        white-space: nowrap;
      }

      .stat-value {
        font-weight: var(--font-weight-semibold);
        color: var(--color-text-primary);
      }
    }
  }
}

// 当前题号高亮动画
@keyframes pulse-border {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

// 响应式设计 - 小屏幕
@media screen and (max-width: 375px) {
  .answer-sheet {
    .sheet-header {
      padding: var(--spacing-sm) var(--spacing-md);

      .header-title {
        font-size: var(--font-size-sm);
      }

      .progress-bar {
        width: 40px;
      }
    }

    .sheet-body {
      padding: var(--spacing-sm) var(--spacing-md);
    }

    .grid-container {
      gap: 6px;
    }

    .answer-item {
      min-width: 28px;
      min-height: 28px;
      font-size: var(--font-size-xs);
    }

    .sheet-stats {
      .stat-item {
        font-size: 10px;

        .stat-text {
          display: none;
        }
      }
    }
  }
}

// 响应式设计 - 超小屏幕
@media screen and (max-width: 320px) {
  .answer-sheet {
    .grid-container {
      grid-template-columns: repeat(4, 1fr);
    }

    .sheet-stats .stat-row {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
}

// 响应式设计 - 大屏幕（平板）
@media screen and (min-width: 768px) {
  .answer-sheet {
    .grid-container {
      grid-template-columns: repeat(8, 1fr);
      max-height: none;
    }

    .answer-item {
      min-width: 40px;
      min-height: 40px;
      font-size: var(--font-size-base);
    }
  }
}
</style>