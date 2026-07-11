<template>
  <div class="points-page">
    <div class="page-content">
      <!-- 积分概览卡片 -->
      <section class="overview-card">
        <div class="current-points">
          <div class="label">{{ t('points.currentPoints') }}</div>
          <div class="value">{{ userPoints }}</div>
        </div>
        <div class="points-trend">
          <div class="trend-item">
            <van-icon name="arrow-up" color="var(--color-success)" />
            <span>{{ t('points.monthIncome') }} {{ monthIncome }}</span>
          </div>
          <div class="trend-item">
            <van-icon name="arrow-down" color="var(--color-danger)" />
            <span>{{ t('points.monthExpense') }} {{ monthExpense }}</span>
          </div>
        </div>
      </section>

      <!-- 时间筛选 -->
      <FilterTabs v-model="activeTab" :tabs="pointTabs" class="tabs" @update:model-value="handleTabChange" />

      <!-- 积分明细列表 -->
      <section class="points-list">
        <van-empty v-if="filteredRecords.length === 0" :description="t('points.noRecords')" />

        <van-cell-group v-else inset>
          <van-cell v-for="record in filteredRecords" :key="record.id" class="point-item">
            <template #icon>
              <div class="point-icon" :class="record.type">
                <van-icon :name="getRecordIcon(record.type)" size="16" />
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

      <!-- 滚动加载 -->
      <van-list 
        v-model:loading="loading" 
        :finished="finished" 
        finished-text="没有更多了" 
        @load="onLoad"
      >
        <div v-if="filteredRecords.length > 0" class="load-more-placeholder"></div>
      </van-list>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import dayjs from 'dayjs';
  import { storeToRefs } from 'pinia';
  import { useAppDataStore } from '@/stores/appData';
  import FilterTabs from '@/components/FilterTabs/index.vue';
  import {
    CellGroup as VanCellGroup,
    Cell as VanCell,
    Icon as VanIcon,
    Empty as VanEmpty,
    Button as VanButton,
    List as VanList,
  } from 'vant';

  // ========================================
  // i18n
  // ========================================
  const { t } = useI18n();

  // ========================================
  // 统一数据管理
  // ========================================
  const appDataStore = useAppDataStore();
  const { userPoints, records } = storeToRefs(appDataStore);
  const { loadAllData } = appDataStore;

  // ========================================
  // 辅助函数
  // ========================================

  /**
   * 获取显示用的描述文本
   */
  const getRecordDescription = record => {
    // 如果有 gameName，直接使用
    if (record.gameName) {
      return record.gameName;
    }
    // 检查是否是兑换记录
    if (record.result && record.result.startsWith('exchange:')) {
      const productName = record.result.replace('exchange:', '');
      return `${t('exchange.exchangePrefix')}: ${productName}`;
    }
    return record.result || '';
  };

  // ========================================
  // 标签数据
  // ========================================
  const pointTabs = [
    { value: 'all', label: t('points.tabs.all') },
    { value: 'income', label: t('points.tabs.income') },
    { value: 'expense', label: t('points.tabs.expense') },
  ];

  // ========================================
  // 响应式数据
  // ========================================
  const activeTab = ref('all');
  const monthIncome = ref(0);
  const monthExpense = ref(0);
  const allRecords = ref([]);
  const currentPage = ref(1);
  const loading = ref(false);
  const finished = ref(false);

  // ========================================
  // 计算属性
  // ========================================
  const filteredRecords = computed(() => {
    if (activeTab.value === 'all') {
      return allRecords.value;
    }
    return allRecords.value.filter(r => r.type === activeTab.value);
  });

  // ========================================
  // 工具函数
  // ========================================

  /**
   * 获取记录图标
   */
  const getRecordIcon = type => {
    const icons = {
      income: 'plus',
      expense: 'minus',
      game: 'fire-o',
      signin: 'clock-o',
      reward: 'gift-o',
    };
    return icons[type] || 'balance-o';
  };

  /**
   * 格式化时间
   */
  const formatTime = timestamp => {
    return dayjs(timestamp).format('MM-DD HH:mm');
  };

  /**
   * 加载积分数据
   */
  const loadPointsData = () => {
    // 加载所有数据（积分和记录）
    loadAllData();

    // 使用统一的记录
    allRecords.value = records.value.map(r => ({
      id: r.id,
      type: r.pointsChange >= 0 ? 'income' : 'expense',
      description: r.result,
      amount: r.pointsChange,
      timestamp: r.timestamp,
    }));

    // 计算本月收支
    calculateMonthStats();
  };

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
      { type: 'income', description: '邀请好友奖励', amount: 50 },
    ];

    const mockData = [];
    for (let i = 0; i < 30; i++) {
      const template = records[Math.floor(Math.random() * records.length)];
      mockData.push({
        id: i + 1,
        ...template,
        time: dayjs()
          .subtract(Math.floor(Math.random() * 30), 'day')
          .valueOf(),
      });
    }

    return mockData.sort((a, b) => b.time - a.time);
  };

  /**
   * 计算本月统计
   */
  const calculateMonthStats = () => {
    const monthStart = dayjs().startOf('month').valueOf();

    const monthRecords = allRecords.value.filter(r => r.time >= monthStart);
    monthIncome.value = monthRecords
      .filter(r => r.amount > 0)
      .reduce((sum, r) => sum + r.amount, 0);
    monthExpense.value = Math.abs(
      monthRecords.filter(r => r.amount < 0).reduce((sum, r) => sum + r.amount, 0)
    );
  };

  /**
   * 标签切换处理
   */
  const handleTabChange = () => {
    currentPage.value = 1;
    finished.value = false;
  };

  /**
   * 滚动加载处理
   */
  const onLoad = () => {
    loading.value = true;
    
    // 实际应用中这里应该调用API获取更多数据
    // 这里假设数据已经全部加载完成
    setTimeout(() => {
      // 加载更多记录
      const moreRecords = records.value
        .filter(r => !allRecords.value.some(existing => existing.id === r.id))
        .map(r => ({
          id: r.id,
          type: r.pointsChange >= 0 ? 'income' : 'expense',
          description: r.result,
          amount: r.pointsChange,
          timestamp: r.timestamp
        }));
      
      if (moreRecords.length > 0) {
        allRecords.value = [...allRecords.value, ...moreRecords];
        currentPage.value++;
      }
      
      // 如果没有更多数据，标记为完成
      if (moreRecords.length === 0) {
        finished.value = true;
      }
      
      loading.value = false;
    }, 500);
  };

  // ========================================
  // 生命周期
  // ========================================
  onMounted(async () => {
    await loadPointsData();
  });
</script>

<style lang="less" scoped>
  .points-page {
    min-height: 100%;
    background: var(--color-bg-primary);
  }

  .page-content {
    padding-top: calc(var(--spacing-sm) + env(safe-area-inset-top, 0px));
    padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom, 0px));
    display: flow-root;
  }

  /* ========================================
   积分概览卡片
   ======================================== */
  .overview-card {
    margin: var(--spacing-sm);
    padding: var(--spacing-md);
    background: var(--gradient-primary);
    border-radius: var(--radius-md);
    color: white;

    .current-points {
      text-align: center;
      margin-bottom: var(--spacing-md);

      .label {
        font-size: 12px;
        opacity: 0.85;
        margin-bottom: 2px;
      }

      .value {
        font-size: var(--font-size-xxl);
        font-weight: var(--font-weight-bold);
      }
    }

    .points-trend {
      display: flex;
      justify-content: space-around;
      padding-top: var(--spacing-sm);
      border-top: 1px solid rgba(255, 255, 255, 0.2);

      .trend-item {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        font-size: 12px;
        opacity: 0.9;
      }
    }
  }

  .tabs {
    margin: 0 var(--spacing-md) var(--spacing-md);
  }

  /* ========================================
   积分明细列表
   ======================================== */
  .points-list {
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

    .point-item {
      margin-bottom: var(--spacing-xs);
      display: flex;
      align-items: center;

      .point-icon {
        width: 24px;
        height: 24px;
        border-radius: var(--radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: var(--spacing-lg);

        &.income {
          background: rgba(7, 193, 96, 0.1);
          color: var(--color-success);
        }

        &.expense {
          background: rgba(255, 77, 79, 0.1);
          color: var(--color-danger);
        }
      }

      .point-title {
        font-size: var(--font-size-sm);
        color: var(--color-text-primary);
        font-weight: var(--font-weight-medium);
      }

      .point-time {
        font-size: 11px;
        color: var(--color-text-secondary);
        margin-top: 2px;
      }

      .point-amount {
        font-size: var(--font-size-md);
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
    margin: var(--spacing-md) var(--spacing-sm);
  }
</style>
