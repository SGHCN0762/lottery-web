<template>
  <div class="badges-page">
    <div class="page-content">
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
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import dayjs from 'dayjs';
  import { storeToRefs } from 'pinia';
  import { useAppDataStore } from '@/stores/appData';
  import StatsCard from './components/StatsCard.vue';
  import FilterTabs from './components/FilterTabs.vue';
  import BadgeItem from './components/BadgeItem.vue';
  import BadgeDetail from './components/BadgeDetail.vue';

  // ========================================
  // i18n
  // ========================================
  const { t } = useI18n();

  // ========================================
  // 使用 Store 中的计算属性，避免重复计算
  // ========================================
  const appDataStore = useAppDataStore();
  const { records, gameStats } = storeToRefs(appDataStore);
  const { loadAllData } = appDataStore;

  // ========================================
  // 响应式数据
  // ========================================
  const activeFilter = ref('all');
  const showDetailPopup = ref(false);
  const currentBadge = ref(null);

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
        condition: (stats) => stats.totalGames > 0,
        getProgress: (stats) => stats.totalGames,
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
   * 基于游戏记录自动计算徽章状态
   */
  const allBadges = computed(() => {
    const stats = gameStats.value;
    const configs = badgeConfigs.value;

    return configs.map(config => {
      let unlocked = false;
      let progress = 0;

      // 根据徽章 ID 判断是否解锁
      switch (config.id) {
        case 1: // 首次游戏
          unlocked = stats.totalGames > 0;
          progress = stats.totalGames;
          break;
        case 2: // 签到7天
          unlocked = stats.checkInDays >= 7;
          progress = Math.min(stats.checkInDays, 7);
          break;
        case 3: // 答题大师
          unlocked = stats.quizWins >= 10;
          progress = Math.min(stats.quizWins, 10);
          break;
        case 4: // 幸运星
          unlocked = stats.luckyWheelCount >= 10;
          progress = Math.min(stats.luckyWheelCount, 10);
          break;
        case 5: // 猜数字大师
          unlocked = stats.numberGuessWins >= 10;
          progress = Math.min(stats.numberGuessWins, 10);
          break;
        case 6: // 积分富豪
          unlocked = stats.totalPoints >= 500;
          progress = Math.min(stats.totalPoints, 500);
          break;
        case 7: // 游戏专家
          unlocked = stats.gameTypesCount >= 4;
          progress = Math.min(stats.gameTypesCount, 4);
          break;
        case 8: // 社交达人（暂不支持）
          unlocked = false;
          progress = 0;
          break;
      }

      return {
        ...config,
        unlocked,
        progress,
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
    loadAllData();
  });
</script>

<style lang="less" scoped>
  .badges-page {
    min-height: 100%;
    background: var(--color-bg-primary);
    transition: background-color var(--transition-base);
  }

  .page-content {
    padding-top: calc(var(--spacing-sm) + env(safe-area-inset-top, 0px));
    padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom, 0px));
    display: flow-root;
  }

  /* ========================================
     成就列表容器
     ======================================== */
  .badges-list {
    margin: 0 var(--spacing-sm) var(--spacing-md);

    .badges-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }
</style>