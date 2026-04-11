<template>
  <div class="points-page">
    <!-- 积分概览卡片 -->
    <section class="overview-card">
      <div class="current-points">
        <div class="label">{{ t('points.currentPoints') }}</div>
        <div class="value">{{ currentPoints }}</div>
      </div>
      <div class="points-trend">
        <div class="trend-item">
          <van-icon name="arrow-up" color="#52c41a" />
          <span>{{ t('points.monthIncome') }} {{ monthIncome }}</span>
        </div>
        <div class="trend-item">
          <van-icon name="arrow-down" color="#ff4d4f" />
          <span>{{ t('points.monthExpense') }} {{ monthExpense }}</span>
        </div>
      </div>
    </section>

    <!-- 时间筛选 -->
    <section class="filter-section">
      <van-tabs v-model:active="activeTab" @change="handleTabChange">
        <van-tab :title="t('points.tabs.all')" name="all" />
        <van-tab :title="t('points.tabs.income')" name="income" />
        <van-tab :title="t('points.tabs.expense')" name="expense" />
      </van-tabs>
    </section>

    <!-- 积分明细列表 -->
    <section class="points-list">
      <van-empty v-if="filteredRecords.length === 0" :description="t('points.noRecords')" />
      
      <van-cell-group v-else inset>
        <van-cell
          v-for="record in filteredRecords"
          :key="record.id"
          class="point-item"
        >
          <template #icon>
            <div class="point-icon" :class="record.type">
              <van-icon :name="getRecordIcon(record.type)" size="20" />
            </div>
          </template>
          
          <template #title>
            <div class="point-title">{{ record.description }}</div>
          </template>
          
          <template #label>
            <div class="point-time">{{ formatTime(record.time) }}</div>
          </template>
          
          <template #right-icon>
            <div 
              class="point-amount"
              :class="{ positive: record.amount > 0, negative: record.amount < 0 }"
            >
              {{ record.amount > 0 ? '+' : '' }}{{ record.amount }}
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </section>

    <!-- 加载更多 -->
    <div class="load-more" v-if="hasMore && filteredRecords.length > 0">
      <van-button block round @click="loadMore">{{ t('points.loadMore') }}</van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { 
  Tabs as VanTabs,
  Tab as VanTab,
  CellGroup as VanCellGroup,
  Cell as VanCell,
  Icon as VanIcon,
  Empty as VanEmpty,
  Button as VanButton
} from 'vant'

// ========================================
// i18n
// ========================================
const { t } = useI18n()

// ========================================
// 响应式数据
// ========================================
const activeTab = ref('all')
const currentPoints = ref(0)
const monthIncome = ref(0)
const monthExpense = ref(0)
const allRecords = ref([])
const currentPage = ref(1)
const hasMore = ref(true)

// ========================================
// 计算属性
// ========================================
const filteredRecords = computed(() => {
  if (activeTab.value === 'all') {
    return allRecords.value
  }
  return allRecords.value.filter(r => r.type === activeTab.value)
})

// ========================================
// 工具函数
// ========================================

/**
 * 获取记录图标
 */
const getRecordIcon = (type) => {
  const icons = {
    income: 'plus',
    expense: 'minus',
    game: 'fire-o',
    signin: 'clock-o',
    reward: 'gift-o'
  }
  return icons[type] || 'balance-o'
}

/**
 * 格式化时间
 */
const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${month}-${day} ${hours}:${minutes}`
}

/**
 * 加载积分数据
 */
const loadPointsData = () => {
  // 从 localStorage 读取用户信息
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    const user = JSON.parse(userInfo)
    currentPoints.value = user.points || 1580
  }

  // 加载积分记录
  const stored = localStorage.getItem('pointsRecords')
  if (stored) {
    allRecords.value = JSON.parse(stored)
  } else {
    allRecords.value = generateMockRecords()
    localStorage.setItem('pointsRecords', JSON.stringify(allRecords.value))
  }

  // 计算本月收支
  calculateMonthStats()
}

/**
 * 生成模拟记录数据
 */
const generateMockRecords = () => {
  const records = [
    { type: 'income', description: '每日签到奖励', amount: 10 },
    { type: 'income', description: '数字猜猜猜胜利', amount: 30 },
    { type: 'income', description: '幸运转盘奖励', amount: 50 },
    { type: 'income', description: '答题挑战奖励', amount: 25 },
    { type: 'expense', description: '幸运转盘消耗', amount: -10 },
    { type: 'expense', description: '积分兑换礼品', amount: -100 },
    { type: 'income', description: '连续签到奖励', amount: 20 },
    { type: 'income', description: '邀请好友奖励', amount: 50 }
  ]

  const mockData = []
  for (let i = 0; i < 30; i++) {
    const template = records[Math.floor(Math.random() * records.length)]
    mockData.push({
      id: i + 1,
      ...template,
      time: Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
    })
  }

  return mockData.sort((a, b) => b.time - a.time)
}

/**
 * 计算本月统计
 */
const calculateMonthStats = () => {
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime()
  
  const monthRecords = allRecords.value.filter(r => r.time >= monthStart)
  monthIncome.value = monthRecords
    .filter(r => r.amount > 0)
    .reduce((sum, r) => sum + r.amount, 0)
  monthExpense.value = Math.abs(
    monthRecords
      .filter(r => r.amount < 0)
      .reduce((sum, r) => sum + r.amount, 0)
  )
}

/**
 * 标签切换处理
 */
const handleTabChange = () => {
  currentPage.value = 1
  hasMore.value = true
}

/**
 * 加载更多
 */
const loadMore = () => {
  currentPage.value++
  setTimeout(() => {
    hasMore.value = false
  }, 500)
}

// ========================================
// 生命周期
// ========================================
onMounted(() => {
  loadPointsData()
})
</script>

<style lang="less" scoped>
.points-page {
  min-height: 100%;
  background: var(--color-bg-primary);
  padding-bottom: var(--spacing-xl);
}

/* ========================================
   积分概览卡片
   ======================================== */
.overview-card {
  margin: var(--spacing-md);
  padding: var(--spacing-xl);
  background: var(--gradient-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  color: white;

  .current-points {
    text-align: center;
    margin-bottom: var(--spacing-lg);

    .label {
      font-size: var(--font-size-sm);
      opacity: 0.85;
      margin-bottom: var(--spacing-xs);
    }

    .value {
      font-size: var(--font-size-xxxl);
      font-weight: var(--font-weight-bold);
    }
  }

  .points-trend {
    display: flex;
    justify-content: space-around;
    padding-top: var(--spacing-md);
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    .trend-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      font-size: var(--font-size-sm);
      opacity: 0.9;
    }
  }
}

/* ========================================
   筛选器区域
   ======================================== */
.filter-section {
  margin: 0 var(--spacing-md) var(--spacing-md);
}

/* ========================================
   积分明细列表
   ======================================== */
.points-list {
  margin: 0 var(--spacing-md);

  .point-item {
    margin-bottom: var(--spacing-sm);
    border-radius: var(--radius-md);
    
    :deep(.van-cell__left-icon) {
      margin-right: var(--spacing-sm);
    }

    .point-icon {
      width: 36px;
      height: 36px;
      border-radius: var(--radius-full);
      display: flex;
      align-items: center;
      justify-content: center;
      
      &.income {
        background: rgba(82, 196, 26, 0.1);
        color: var(--color-success);
      }
      
      &.expense {
        background: rgba(255, 77, 79, 0.1);
        color: var(--color-danger);
      }
    }

    .point-title {
      font-size: var(--font-size-md);
      color: var(--color-text-primary);
      font-weight: var(--font-weight-medium);
    }

    .point-time {
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
      margin-top: var(--spacing-xs);
    }

    .point-amount {
      font-size: var(--font-size-lg);
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

/* ========================================
   加载更多
   ======================================== */
.load-more {
  margin: var(--spacing-lg) var(--spacing-md);
}
</style>
