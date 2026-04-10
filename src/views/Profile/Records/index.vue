<template>
  <div class="records-page">
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
        <div class="stat-label">总场次</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-value">{{ winRate }}%</div>
        <div class="stat-label">胜率</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-value">{{ totalPoints }}</div>
        <div class="stat-label">总积分</div>
      </div>
    </section>

    <!-- 记录列表 -->
    <section class="records-list">
      <van-empty v-if="records.length === 0" description="暂无游戏记录" />
      
      <van-cell-group v-else inset>
        <van-cell
          v-for="record in records"
          :key="record.id"
          class="record-item"
        >
          <template #title>
            <div class="record-header">
              <van-icon :name="getGameIcon(record.gameType)" size="20" />
              <span class="game-name">{{ record.gameName }}</span>
              <van-tag :type="getResultTagType(record.result)">
                {{ record.result }}
              </van-tag>
            </div>
          </template>
          
          <template #label>
            <div class="record-details">
              <div class="detail-row">
                <span class="detail-label">时间：</span>
                <span class="detail-value">{{ formatTime(record.time) }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">积分变化：</span>
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
    <div class="load-more" v-if="hasMore && records.length > 0">
      <van-button block round @click="loadMore">加载更多</van-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
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

// ========================================
// 响应式数据
// ========================================
const gameType = ref('all')
const timeRange = ref('week')
const records = ref([])
const currentPage = ref(1)
const hasMore = ref(true)

// ========================================
// 配置选项
// ========================================
const gameTypeOptions = [
  { text: '全部游戏', value: 'all' },
  { text: '数字猜猜猜', value: 'number-guess' },
  { text: '幸运转盘', value: 'lucky-wheel' },
  { text: '答题挑战', value: 'quiz-challenge' },
  { text: '每日签到', value: 'daily-checkin' }
]

const timeRangeOptions = [
  { text: '最近7天', value: 'week' },
  { text: '最近30天', value: 'month' },
  { text: '全部时间', value: 'all' }
]

// ========================================
// 计算属性
// ========================================
const totalGames = computed(() => records.value.length)
const winRate = computed(() => {
  if (records.value.length === 0) return 0
  const wins = records.value.filter(r => r.result === '胜利').length
  return Math.round((wins / records.value.length) * 100)
})
const totalPoints = computed(() => {
  return records.value.reduce((sum, r) => sum + r.pointsChange, 0)
})

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
    '胜利': 'success',
    '失败': 'danger',
    '平局': 'primary',
    '签到': 'warning'
  }
  return types[result] || 'default'
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
 * 加载游戏记录
 */
const loadRecords = () => {
  // 从 localStorage 读取模拟数据
  const stored = localStorage.getItem('gameRecords')
  if (stored) {
    records.value = JSON.parse(stored)
  } else {
    // 生成模拟数据
    records.value = generateMockRecords()
    localStorage.setItem('gameRecords', JSON.stringify(records.value))
  }
}

/**
 * 生成模拟记录数据
 */
const generateMockRecords = () => {
  const games = [
    { type: 'number-guess', name: '数字猜猜猜' },
    { type: 'lucky-wheel', name: '幸运转盘' },
    { type: 'quiz-challenge', name: '答题挑战' },
    { type: 'daily-checkin', name: '每日签到' }
  ]
  
  const results = ['胜利', '失败', '平局', '签到']
  const mockData = []
  
  for (let i = 0; i < 20; i++) {
    const game = games[Math.floor(Math.random() * games.length)]
    const result = game.type === 'daily-checkin' ? '签到' : results[Math.floor(Math.random() * 3)]
    const pointsChange = result === '胜利' ? Math.floor(Math.random() * 50) + 10 : 
                        result === '失败' ? -Math.floor(Math.random() * 20) : 
                        result === '签到' ? 10 : 0
    
    mockData.push({
      id: i + 1,
      gameType: game.type,
      gameName: game.name,
      result: result,
      pointsChange: pointsChange,
      time: Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
    })
  }
  
  return mockData.sort((a, b) => b.time - a.time)
}

/**
 * 加载更多
 */
const loadMore = () => {
  currentPage.value++
  // TODO: 实现分页加载逻辑
  setTimeout(() => {
    hasMore.value = false
  }, 500)
}

// ========================================
// 生命周期
// ========================================
onMounted(() => {
  loadRecords()
})
</script>

<style lang="less" scoped>
.records-page {
  min-height: 100%;
  background: var(--color-bg-primary);
  padding-bottom: var(--spacing-xl);
}

/* ========================================
   筛选器区域
   ======================================== */
.filter-section {
  margin: 0 var(--spacing-md) var(--spacing-md);
}

/* ========================================
   统计卡片
   ======================================== */
.stats-card {
  margin: 0 var(--spacing-md) var(--spacing-lg);
  padding: var(--spacing-lg);
  background: var(--gradient-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;

  .stat-item {
    text-align: center;
    flex: 1;

    .stat-value {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      margin-bottom: var(--spacing-xs);
    }

    .stat-label {
      font-size: var(--font-size-xs);
      opacity: 0.85;
    }
  }

  .stat-divider {
    width: 1px;
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
  }
}

/* ========================================
   记录列表
   ======================================== */
.records-list {
  margin: 0 var(--spacing-md);

  .record-item {
    margin-bottom: var(--spacing-sm);
    border-radius: var(--radius-md);
    
    .record-header {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      margin-bottom: var(--spacing-xs);

      .game-name {
        flex: 1;
        font-size: var(--font-size-md);
        font-weight: var(--font-weight-medium);
        color: var(--color-text-primary);
      }
    }

    .record-details {
      .detail-row {
        display: flex;
        align-items: center;
        margin-top: var(--spacing-xs);
        font-size: var(--font-size-sm);

        .detail-label {
          color: var(--color-text-secondary);
          min-width: 70px;
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
  margin: var(--spacing-lg) var(--spacing-md);
}
</style>
