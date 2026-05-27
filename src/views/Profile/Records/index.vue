<template>
  <div class="records-page">
    <div class="page-content">
      <!-- 筛选器 -->
      <section class="filter-section">
        <van-dropdown-menu>
          <van-dropdown-item v-model="gameType" :options="gameTypeOptions" />
          <van-dropdown-item v-model="timeRange" :options="timeRangeOptions" />
        </van-dropdown-menu>
      </section>

    <!-- 统计卡片 -->
    <section class="stats-card">
      <div class="stat-item">
        <div class="stat-value">{{ totalGames }}</div>
        <div class="stat-label">{{ t('records.totalGames') }}</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-value">{{ winRate }}%</div>
        <div class="stat-label">{{ t('records.winRate') }}</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-value">{{ totalPoints }}</div>
        <div class="stat-label">{{ t('records.totalPoints') }}</div>
      </div>
    </section>

    <!-- 记录列表 -->
    <section class="records-list">
      <van-empty v-if="filteredRecords.length === 0" :description="t('records.noRecords')" />

      <van-cell-group v-else inset>
        <van-cell
          v-for="record in filteredRecords"
          :key="record.id"
          class="record-item"
        >
          <template #title>
            <div class="record-header">
              <van-icon :name="getGameIcon(record.gameType)" size="20" />
              <span class="game-name">{{ record.gameName }}</span>
              <van-tag :type="getResultTagType(record.result)">
                {{ getDisplayResult(record.result) }}
              </van-tag>
            </div>
          </template>
          
          <template #label>
            <div class="record-details">
              <div class="detail-row">
                <span class="detail-label">{{ t('records.time') }}：</span>
                <span class="detail-value">{{ formatTime(record.timestamp) }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">{{ t('records.pointsChange') }}：</span>
                <span 
                  class="detail-value points-change"
                  :class="{ positive: record.pointsChange > 0, negative: record.pointsChange < 0 }"
                >
                  {{ record.pointsChange > 0 ? '+' : '' }}{{ record.pointsChange }}
                </span>
              </div>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </section>

    <!-- 加载更多 -->
      <div class="load-more" v-if="hasMore && filteredRecords.length > 0">
        <van-button block round @click="loadMore">{{ t('records.loadMore') }}</van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import {
  DropdownMenu as VanDropdownMenu,
  DropdownItem as VanDropdownItem,
  CellGroup as VanCellGroup,
  Cell as VanCell,
  Tag as VanTag,
  Icon as VanIcon,
  Empty as VanEmpty,
  Button as VanButton
} from 'vant'
import { useAppData } from '@/hooks/useAppData'

// ========================================
// i18n
// ========================================
const { t } = useI18n()

// ========================================
// 统一数据管理
// ========================================
const { records, loadAllData, getRecordsByGameType, getRecordsByTimeRange } = useAppData()

// ========================================
// 响应式数据
// ========================================
const gameType = ref('all')
const timeRange = ref('week')
const currentPage = ref(1)
const hasMore = ref(false)

// ========================================
// 配置选项
// ========================================
const gameTypeOptions = computed(() => [
  { text: t('records.filter.all'), value: 'all' },
  { text: t('lottery.numberGuess'), value: 'numberGuess' },
  { text: t('lottery.luckyWheel'), value: 'luckyWheel' },
  { text: t('lottery.quizChallenge'), value: 'quizChallenge' },
  { text: t('lottery.dailyCheckIn'), value: 'dailyCheckIn' }
])

const timeRangeOptions = computed(() => [
  { text: t('records.filter.week'), value: 'week' },
  { text: t('records.filter.month'), value: 'month' },
  { text: t('records.filter.threeMonths'), value: 'threeMonths' }
])

// ========================================
// 计算属性
// ========================================
const filteredRecords = computed(() => {
  let result = records.value

  // 按游戏类型筛选
  if (gameType.value !== 'all') {
    result = result.filter(r => r.gameType === gameType.value)
  }

  // 按时间范围筛选
  const now = dayjs().valueOf()
  const ranges = {
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    threeMonths: 90 * 24 * 60 * 60 * 1000
  }
  const cutoff = now - (ranges[timeRange.value] || ranges.week)
  result = result.filter(r => r.timestamp >= cutoff)

  return result
})

const totalGames = computed(() => filteredRecords.value.length)
const winRate = computed(() => {
  if (filteredRecords.value.length === 0) return 0
  const wins = filteredRecords.value.filter(r => r.result === 'win').length
  return Math.round((wins / filteredRecords.value.length) * 100)
})
const totalPoints = computed(() => {
  return filteredRecords.value.reduce((sum, r) => sum + r.pointsChange, 0)
})

// 保持 records 兼容
const records_data = computed(() => filteredRecords.value)

// ========================================
// 工具函数
// ========================================

/**
 * 获取游戏图标
 */
const getGameIcon = (gameType) => {
  const icons = {
    'number-guess': 'question-o',
    'lucky-wheel': 'gift-o',
    'quiz-challenge': 'star-o',
    'daily-checkin': 'clock-o'
  }
  return icons[gameType] || 'fire-o'
}

/**
 * 获取结果标签类型
 */
const getResultTagType = (result) => {
  const types = {
    'win': 'success',
    'lose': 'danger',
    'draw': 'primary',
    'checkin': 'warning'
  }
  // 检查是否是兑换记录
  if (result && result.startsWith('exchange:')) {
    return 'primary'
  }
  return types[result] || 'default'
}

/**
 * 获取显示的结果文本
 */
const getDisplayResult = (result) => {
  // 检查是否是兑换记录
  if (result && result.startsWith('exchange:')) {
    const productName = result.replace('exchange:', '')
    return `${t('exchange.exchangePrefix')}: ${productName}`
  }
  // 检查是否是胜利/失败
  if (result === 'win') {
    return t('common.win')
  }
  if (result === 'lose') {
    return t('common.lose')
  }
  return result
}

/**
 * 格式化时间
 */
const formatTime = (timestamp) => {
  return dayjs(timestamp).format('MM-DD HH:mm')
}

/**
 * 加载游戏记录
 */
const loadRecordsWrapper = () => {
  // 调用统一加载方法
  loadAllData()
}

/**
 * 加载更多
 */
const loadMore = () => {
  // 分页功能预留
  hasMore.value = false
}

// ========================================
// 生命周期
// ========================================
onMounted(() => {
  loadRecordsWrapper()
})
</script>

<style lang="less" scoped>
.records-page {
  min-height: 100%;
  background: var(--color-bg-primary);
}

.page-content {
  padding-top: calc(var(--spacing-sm) + env(safe-area-inset-top, 0px));
  padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom, 0px));
  display: flow-root;
}

/* ========================================
   筛选器区域
   ======================================== */
.filter-section {
  margin: 0 var(--spacing-sm) var(--spacing-sm);
}

/* ========================================
   统计卡片
   ======================================== */
.stats-card {
  margin: 0 var(--spacing-sm) var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--gradient-primary);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;

  .stat-item {
    text-align: center;
    flex: 1;

    .stat-value {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-bold);
      margin-bottom: 2px;
    }

    .stat-label {
      font-size: 11px;
      opacity: 0.85;
    }
  }

  .stat-divider {
    width: 1px;
    height: 28px;
    background: rgba(255, 255, 255, 0.2);
  }
}

/* ========================================
   记录列表
   ======================================== */
.records-list {
  margin: 0 var(--spacing-sm);

  :deep(.van-cell-group) {
    margin: 0;
  }

  :deep(.van-cell) {
    &::after {
      border-bottom: none;
    }
    
    padding: var(--spacing-sm) var(--spacing-md);
  }

  .record-item {
    margin-bottom: var(--spacing-xs);
    
    .record-header {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      margin-bottom: 4px;

      .game-name {
        flex: 1;
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        color: var(--color-text-primary);
      }
    }

    .record-details {
      .detail-row {
        display: flex;
        align-items: center;
        margin-top: 3px;
        font-size: 12px;

        .detail-label {
          color: var(--color-text-secondary);
          min-width: 60px;
        }

        .detail-value {
          color: var(--color-text-tertiary);
          
          &.points-change {
            font-weight: var(--font-weight-semibold);
            
            &.positive {
              color: var(--color-success);
            }
            
            &.negative {
              color: var(--color-danger);
            }
          }
        }
      }
    }
  }
}

/* ========================================
   加载更多
   ======================================== */
.load-more {
  margin: var(--spacing-md) var(--spacing-sm);
}
</style>
