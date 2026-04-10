<template>
  <div class="badges-page">
    <!-- 成就统计卡片 -->
    <section class="stats-card">
      <div class="stat-item">
        <div class="stat-value">{{ unlockedBadges.length }}</div>
        <div class="stat-label">已获得</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-value">{{ allBadges.length }}</div>
        <div class="stat-label">总成就</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-value">{{ completionRate }}%</div>
        <div class="stat-label">完成率</div>
      </div>
    </section>

    <!-- 筛选标签 -->
    <section class="filter-tabs">
      <van-tabs v-model:active="activeFilter" @change="handleFilterChange">
        <van-tab title="全部" name="all" />
        <van-tab title="已获得" name="unlocked" />
        <van-tab title="未获得" name="locked" />
      </van-tabs>
    </section>

    <!-- 成就列表 -->
    <section class="badges-list">
      <van-empty v-if="filteredBadges.length === 0" description="暂无成就" />
      
      <div v-else class="badges-grid">
        <div
          v-for="badge in filteredBadges"
          :key="badge.id"
          class="badge-card"
          :class="{ unlocked: badge.unlocked }"
          @click="showBadgeDetail(badge)"
        >
          <div class="badge-icon-wrapper">
            <div class="badge-icon" :style="{ background: badge.color }">
              <van-icon :name="badge.icon" size="32" color="white" />
            </div>
            <div v-if="!badge.unlocked" class="lock-overlay">
              <van-icon name="lock" size="24" />
            </div>
          </div>
          
          <div class="badge-info">
            <h3 class="badge-name">{{ badge.name }}</h3>
            <p class="badge-desc">{{ badge.description }}</p>
            <div class="badge-progress" v-if="!badge.unlocked && badge.progress">
              <van-progress
                :percentage="badge.progress.percentage"
                stroke-width="4"
                :show-pivot="false"
                color="var(--color-primary)"
              />
              <span class="progress-text">
                {{ badge.progress.current }}/{{ badge.progress.total }}
              </span>
            </div>
            <div class="badge-date" v-else-if="badge.unlocked && badge.unlockDate">
              <van-icon name="clock-o" size="12" />
              <span>{{ formatUnlockDate(badge.unlockDate) }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 成就详情弹窗 -->
    <van-popup
      v-model:show="showDetailPopup"
      round
      position="bottom"
      :style="{ height: '60%' }"
    >
      <div class="detail-popup" v-if="currentBadge">
        <div class="popup-header">
          <h3>成就详情</h3>
          <van-icon name="cross" @click="showDetailPopup = false" />
        </div>
        
        <div class="popup-content">
          <div class="badge-detail-header">
            <div 
              class="badge-large-icon" 
              :style="{ background: currentBadge.color }"
            >
              <van-icon :name="currentBadge.icon" size="48" color="white" />
            </div>
            <div class="badge-status">
              <van-tag 
                :type="currentBadge.unlocked ? 'success' : 'default'" 
                size="medium"
              >
                {{ currentBadge.unlocked ? '已获得' : '未获得' }}
              </van-tag>
            </div>
          </div>
          
          <div class="badge-detail-info">
            <h2 class="detail-name">{{ currentBadge.name }}</h2>
            <p class="detail-desc">{{ currentBadge.description }}</p>
            
            <div class="detail-requirement">
              <h4>解锁条件</h4>
              <p>{{ currentBadge.requirement }}</p>
            </div>
            
            <div class="detail-reward" v-if="currentBadge.reward">
              <h4>成就奖励</h4>
              <div class="reward-content">
                <van-icon name="gold-coin-o" size="20" color="var(--color-warning)" />
                <span>{{ currentBadge.reward }} 积分</span>
              </div>
            </div>
            
            <div class="detail-tips">
              <h4>小贴士</h4>
              <p>{{ currentBadge.tips || '继续努力，你一定能获得这个成就！' }}</p>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  Tabs as VanTabs,
  Tab as VanTab,
  Icon as VanIcon,
  Tag as VanTag,
  Progress as VanProgress,
  Empty as VanEmpty,
  Popup as VanPopup
} from 'vant'

// ========================================
// 响应式数据
// ========================================
const activeFilter = ref('all')
const showDetailPopup = ref(false)
const currentBadge = ref(null)
const allBadges = ref([])

// ========================================
// 计算属性
// ========================================
const unlockedBadges = computed(() => {
  return allBadges.value.filter(b => b.unlocked)
})

const completionRate = computed(() => {
  if (allBadges.value.length === 0) return 0
  return Math.round((unlockedBadges.value.length / allBadges.value.length) * 100)
})

const filteredBadges = computed(() => {
  if (activeFilter.value === 'all') {
    return allBadges.value
  } else if (activeFilter.value === 'unlocked') {
    return unlockedBadges.value
  } else {
    return allBadges.value.filter(b => !b.unlocked)
  }
})

// ========================================
// 成就数据
// ========================================
const generateBadges = () => {
  return [
    {
      id: 1,
      name: '初出茅庐',
      description: '完成首次游戏',
      icon: 'fire-o',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      unlocked: true,
      unlockDate: Date.now() - 7 * 24 * 60 * 60 * 1000,
      requirement: '参与任意一款游戏',
      reward: 10,
      tips: '万事开头难，你已经迈出了第一步！'
    },
    {
      id: 2,
      name: '签到达人',
      description: '连续签到7天',
      icon: 'clock-o',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      unlocked: true,
      unlockDate: Date.now() - 5 * 24 * 60 * 60 * 1000,
      requirement: '连续签到7天',
      reward: 50,
      progress: {
        current: 7,
        total: 7,
        percentage: 100
      },
      tips: '坚持就是胜利，继续保持！'
    },
    {
      id: 3,
      name: '答题高手',
      description: '答题挑战全部答对',
      icon: 'star-o',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      unlocked: false,
      requirement: '在答题挑战中5题全对',
      reward: 100,
      progress: {
        current: 3,
        total: 5,
        percentage: 60
      },
      tips: '多学习技术知识，提高答题正确率！'
    },
    {
      id: 4,
      name: '幸运之星',
      description: '在幸运转盘获得一等奖',
      icon: 'gift-o',
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      unlocked: false,
      requirement: '在幸运转盘中抽中一等奖（500积分）',
      reward: 200,
      tips: '运气也是实力的一部分，继续尝试吧！'
    },
    {
      id: 5,
      name: '猜数大师',
      description: '3次内猜中数字',
      icon: 'question-o',
      color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      unlocked: true,
      unlockDate: Date.now() - 3 * 24 * 60 * 60 * 1000,
      requirement: '在数字猜猜猜中3次以内猜中',
      reward: 50,
      tips: '二分查找策略是你的好帮手！'
    },
    {
      id: 6,
      name: '积分富豪',
      description: '累计获得1000积分',
      icon: 'gold-coin-o',
      color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      unlocked: false,
      requirement: '累计获得1000积分（不含初始积分）',
      reward: 300,
      progress: {
        current: 680,
        total: 1000,
        percentage: 68
      },
      tips: '多参与游戏，积少成多！'
    },
    {
      id: 7,
      name: '游戏达人',
      description: '参与所有类型的游戏',
      icon: 'apps-o',
      color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      unlocked: true,
      unlockDate: Date.now() - 2 * 24 * 60 * 60 * 1000,
      requirement: '参与过所有4种游戏',
      reward: 80,
      tips: '你已经体验了所有游戏，真棒！'
    },
    {
      id: 8,
      name: '社交达人',
      description: '成功邀请5位好友',
      icon: 'friends-o',
      color: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
      unlocked: false,
      requirement: '通过邀请链接成功注册5位好友',
      reward: 250,
      progress: {
        current: 2,
        total: 5,
        percentage: 40
      },
      tips: '分享给你的朋友，一起娱乐吧！'
    }
  ]
}

// ========================================
// 工具函数
// ========================================

/**
 * 格式化解锁日期
 */
const formatUnlockDate = (timestamp) => {
  const date = new Date(timestamp)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${month}-${day}`
}

/**
 * 加载成就数据
 */
const loadBadges = () => {
  const stored = localStorage.getItem('userBadges')
  if (stored) {
    allBadges.value = JSON.parse(stored)
  } else {
    allBadges.value = generateBadges()
    localStorage.setItem('userBadges', JSON.stringify(allBadges.value))
  }
}

/**
 * 显示成就详情
 */
const showBadgeDetail = (badge) => {
  currentBadge.value = badge
  showDetailPopup.value = true
}

/**
 * 筛选变化
 */
const handleFilterChange = () => {
  console.log('切换到筛选:', activeFilter.value)
}

// ========================================
// 生命周期
// ========================================
onMounted(() => {
  loadBadges()
})
</script>

<style lang="less" scoped>
.badges-page {
  min-height: 100%;
  background: var(--color-bg-primary);
  padding-bottom: var(--spacing-xl);
}

/* ========================================
   成就统计卡片
   ======================================== */
.stats-card {
  margin: var(--spacing-md);
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
   筛选标签
   ======================================== */
.filter-tabs {
  margin: 0 var(--spacing-md) var(--spacing-md);
}

/* ========================================
   成就列表
   ======================================== */
.badges-list {
  margin: 0 var(--spacing-md);

  .badges-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);

    .badge-card {
      background: var(--color-bg-secondary);
      border-radius: var(--radius-lg);
      padding: var(--spacing-md);
      box-shadow: var(--shadow-sm);
      transition: all var(--transition-fast);
      cursor: pointer;
      position: relative;
      overflow: hidden;

      &:active {
        transform: scale(0.98);
      }

      &.unlocked {
        background: linear-gradient(135deg, rgba(0, 122, 255, 0.05) 0%, rgba(0, 122, 255, 0.1) 100%);
        border: 1px solid rgba(0, 122, 255, 0.2);
      }

      .badge-icon-wrapper {
        position: relative;
        margin-bottom: var(--spacing-sm);

        .badge-icon {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .lock-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
      }

      .badge-info {
        .badge-name {
          font-size: var(--font-size-md);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text-primary);
          margin: 0 0 var(--spacing-xs) 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .badge-desc {
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
          margin: 0 0 var(--spacing-sm) 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .badge-progress {
          .progress-text {
            display: block;
            font-size: var(--font-size-xs);
            color: var(--color-text-secondary);
            margin-top: var(--spacing-xs);
            text-align: right;
          }
        }

        .badge-date {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
        }
      }
    }
  }
}

/* ========================================
   成就详情弹窗
   ======================================== */
.detail-popup {
  height: 100%;
  display: flex;
  flex-direction: column;

  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);

    h3 {
      margin: 0;
      font-size: var(--font-size-lg);
      color: var(--color-text-primary);
    }

    .van-icon {
      font-size: 20px;
      cursor: pointer;
      color: var(--color-text-secondary);
    }
  }

  .popup-content {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-lg);

    .badge-detail-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-lg);

      .badge-large-icon {
        width: 80px;
        height: 80px;
        border-radius: var(--radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      }
    }

    .badge-detail-info {
      .detail-name {
        font-size: var(--font-size-xl);
        color: var(--color-text-primary);
        margin: 0 0 var(--spacing-sm) 0;
      }

      .detail-desc {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        line-height: 1.6;
        margin: 0 0 var(--spacing-lg) 0;
      }

      h4 {
        font-size: var(--font-size-md);
        color: var(--color-text-primary);
        margin: 0 0 var(--spacing-sm) 0;
        font-weight: var(--font-weight-semibold);
      }

      p {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        line-height: 1.6;
        margin: 0 0 var(--spacing-lg) 0;
      }

      .reward-content {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        font-size: var(--font-size-lg);
        color: var(--color-warning);
        font-weight: var(--font-weight-semibold);
      }
    }
  }
}
</style>
