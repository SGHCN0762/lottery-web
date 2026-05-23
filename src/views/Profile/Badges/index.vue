<template>
  <div class="badges-page">
    <!-- 顶部统计卡片 -->
    <StatsCard 
      :unlocked-count="unlockedBadges.length"
      :completion-rate="completionRate"
      :total-count="totalCount"
    />

    <!-- 筛选标签 -->
    <FilterTabs v-model="activeFilter" />

    <!-- 成就列表 -->
    <section class="badges-list">
      <van-empty v-if="filteredBadges.length === 0" :description="t('badges.empty')" image="search" />

      <div v-else class="badges-container">
        <BadgeItem
          v-for="badge in filteredBadges"
          :key="badge.id"
          :badge="badge"
          @click="showBadgeDetail"
        />
      </div>
    </section>

    <!-- 成就详情弹窗 -->
    <BadgeDetail
      v-model="showDetailPopup"
      :badge="currentBadge"
    />
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Empty as VanEmpty } from 'vant';
  
  // 导入子组件
  import StatsCard from './components/StatsCard.vue';
  import FilterTabs from './components/FilterTabs.vue';
  import BadgeItem from './components/BadgeItem.vue';
  import BadgeDetail from './components/BadgeDetail.vue';

  // ========================================
  // i18n
  // ========================================
  const { t } = useI18n();

  // ========================================
  // 响应式数据
  // ========================================
  const activeFilter = ref('all');
  const showDetailPopup = ref(false);
  const currentBadge = ref(null);
  
  // 存储用户动态状态 (id -> state mapping)
  const userBadgeStates = ref({});

  // ========================================
  // 计算属性
  // ========================================

  /**
   * 成就配置（响应式，会根据语言变化）
   */
  const badgeConfigs = computed(() => {
    return [
      {
        id: 1,
        name: t('badges.badges.firstGame.name'),
        description: t('badges.badges.firstGame.description'),
        icon: 'fire-o',
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        requirement: t('badges.badges.firstGame.requirement'),
        reward: 10,
        tips: t('badges.badges.firstGame.tips'),
      },
      {
        id: 2,
        name: t('badges.badges.checkIn7Days.name'),
        description: t('badges.badges.checkIn7Days.description'),
        icon: 'clock-o',
        color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        requirement: t('badges.badges.checkIn7Days.requirement'),
        reward: 50,
        tips: t('badges.badges.checkIn7Days.tips'),
      },
      {
        id: 3,
        name: t('badges.badges.quizMaster.name'),
        description: t('badges.badges.quizMaster.description'),
        icon: 'star-o',
        color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        requirement: t('badges.badges.quizMaster.requirement'),
        reward: 100,
        tips: t('badges.badges.quizMaster.tips'),
      },
      {
        id: 4,
        name: t('badges.badges.luckyStar.name'),
        description: t('badges.badges.luckyStar.description'),
        icon: 'gift-o',
        color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        requirement: t('badges.badges.luckyStar.requirement'),
        reward: 200,
        tips: t('badges.badges.luckyStar.tips'),
      },
      {
        id: 5,
        name: t('badges.badges.numberGuessMaster.name'),
        description: t('badges.badges.numberGuessMaster.description'),
        icon: 'question-o',
        color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        requirement: t('badges.badges.numberGuessMaster.requirement'),
        reward: 50,
        tips: t('badges.badges.numberGuessMaster.tips'),
      },
      {
        id: 6,
        name: t('badges.badges.pointsRich.name'),
        description: t('badges.badges.pointsRich.description'),
        icon: 'gold-coin-o',
        color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        requirement: t('badges.badges.pointsRich.requirement'),
        reward: 300,
        tips: t('badges.badges.pointsRich.tips'),
      },
      {
        id: 7,
        name: t('badges.badges.gameExpert.name'),
        description: t('badges.badges.gameExpert.description'),
        icon: 'apps-o',
        color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        requirement: t('badges.badges.gameExpert.requirement'),
        reward: 80,
        tips: t('badges.badges.gameExpert.tips'),
      },
      {
        id: 8,
        name: t('badges.badges.socialExpert.name'),
        description: t('badges.badges.socialExpert.description'),
        icon: 'friends-o',
        color: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
        requirement: t('badges.badges.socialExpert.requirement'),
        reward: 250,
        tips: t('badges.badges.socialExpert.tips'),
      },
    ];
  });

  /**
   * 合并配置和状态数据，生成最终的成就列表
   * 使用 computed 确保在语言切换时，文本部分能自动更新
   */
  const allBadges = computed(() => {
    const configs = badgeConfigs.value;
    return configs.map(config => {
      const state = userBadgeStates.value[config.id];
      if (state) {
        // 合并动态状态
        return {
          ...config,
          unlocked: state.unlocked,
          unlockDate: state.unlockDate,
          progress: state.progress,
        };
      }
      // 默认未解锁状态
      return {
        ...config,
        unlocked: false,
        unlockDate: null,
        progress: null,
      };
    });
  });

  const unlockedBadges = computed(() => {
    return allBadges.value.filter(b => b.unlocked);
  });

  const completionRate = computed(() => {
    if (allBadges.value.length === 0) return 0;
    return Math.round((unlockedBadges.value.length / allBadges.value.length) * 100);
  });

  const totalCount = computed(() => {
    return allBadges.value.length;
  });

  const filteredBadges = computed(() => {
    if (activeFilter.value === 'all') {
      return allBadges.value;
    } else if (activeFilter.value === 'unlocked') {
      return unlockedBadges.value;
    } else {
      return allBadges.value.filter(b => !b.unlocked);
    }
  });

  // ========================================
  // 工具函数
  // ========================================

  /**
   * 加载成就状态数据（只加载动态部分）
   */
  const loadBadgeStates = () => {
    const stored = localStorage.getItem('userBadges');
    
    if (stored) {
      try {
        const statesArray = JSON.parse(stored);
        // 将数组转换为对象映射 { id: state }
        const statesMap = {};
        statesArray.forEach(state => {
          statesMap[state.id] = state;
        });
        userBadgeStates.value = statesMap;
      } catch (e) {
        // 如果解析失败，使用空对象
        userBadgeStates.value = {};
      }
    } else {
      // 首次使用，所有成就都未解锁
      userBadgeStates.value = {};
    }
  };

  /**
   * 保存成就状态数据（只保存动态部分）
   */
  const saveBadgeStates = () => {
    const statesToSave = Object.values(userBadgeStates.value);
    localStorage.setItem('userBadges', JSON.stringify(statesToSave));
  };

  /**
   * 显示成就详情
   */
  const showBadgeDetail = (badge) => {
    currentBadge.value = badge;
    showDetailPopup.value = true;
  };

  // ========================================
  // 生命周期
  // ========================================
  onMounted(() => {
    loadBadgeStates();
  });
</script>

<style lang="less" scoped>
  .badges-page {
    min-height: 100%;
    background: var(--color-bg-primary);
    padding-bottom: 20px;
    transition: background-color var(--transition-base);
  }

  /* ========================================
     成就列表容器
     ======================================== */
  .badges-list {
    padding: 0 16px;

    .badges-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }
</style>
