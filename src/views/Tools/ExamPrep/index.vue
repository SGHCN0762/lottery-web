<template>
  <div class="exam-prep">
    <!-- 顶部Hero区域 -->
    <div class="hero-section" :class="`hero-${currentSubject}`">
      <div class="hero-bg-decoration">
        <div class="bg-circle circle-1"></div>
        <div class="bg-circle circle-2"></div>
        <div class="bg-circle circle-3"></div>
      </div>
      
      <!-- 顶部状态栏 -->
      <div class="hero-header">
        <div class="hero-title-row">
          <div class="hero-logo">
            <span class="logo-icon">{{ currentSubjectConfig.icon }}</span>
          </div>
          <div class="hero-title-group">
            <h1 class="hero-title">{{ currentSubjectConfig.fullName }}</h1>
            <p class="hero-subtitle">{{ currentSubjectConfig.slogan }}</p>
          </div>
        </div>
        <div class="header-actions">
          <button class="header-btn" @click="goToSettings">
            <van-icon name="setting-o" />
          </button>
        </div>
      </div>

      <!-- 导航入口 -->
      <div class="nav-entry">
        <button class="nav-item" @click="handlePracticeClick">
          <div class="nav-icon primary">
            <van-icon name="edit" />
          </div>
          <span class="nav-text">{{ currentSubject === 'xingce' ? t('tools.examPrep.nav.practice') : t('tools.examPrep.nav.practiceShenlun') }}</span>
        </button>
        <button class="nav-item" @click="handleWrongNavClick">
          <div class="nav-icon danger">
            <van-icon name="warning-o" />
          </div>
          <span class="nav-text">{{ t('tools.examPrep.nav.wrong') }}</span>
          <span v-if="wrongCount > 0" class="nav-badge">{{ wrongCount > 99 ? '99+' : wrongCount }}</span>
        </button>
        <button class="nav-item" @click="handleStatsNavClick">
          <div class="nav-icon success">
            <van-icon name="bar-chart-o" />
          </div>
          <span class="nav-text">{{ t('tools.examPrep.nav.stats') }}</span>
        </button>
        <button class="nav-item" @click="handleKnowledgeClick">
          <div class="nav-icon warning">
            <van-icon name="bookmark-o" />
          </div>
          <span class="nav-text">{{ currentSubject === 'xingce' ? t('tools.examPrep.nav.knowledge') : t('tools.examPrep.nav.knowledgeShenlun') }}</span>
        </button>
      </div>
    </div>

    <!-- 科目切换卡片 -->
    <div class="subject-switcher-card">
      <div class="subject-switcher">
        <button 
          class="subject-tab" 
          :class="{ active: currentSubject === 'xingce' }"
          @click="switchSubject('xingce')"
        >
          <span class="tab-icon">📝</span>
          <span class="tab-text">{{ t('tools.examPrep.subjects.xingce') }}</span>
        </button>
        <button 
          class="subject-tab" 
          :class="{ active: currentSubject === 'shenlun' }"
          @click="switchSubject('shenlun')"
        >
          <span class="tab-icon">📄</span>
          <span class="tab-text">{{ t('tools.examPrep.subjects.shenlun') }}</span>
        </button>
      </div>
    </div>

    <!-- 主要内容区 -->
    <div class="main-content">
      <!-- 今日学习卡片 -->
      <section class="stats-section">
        <div class="stats-card">
          <div class="stats-header">
            <div class="stats-title-group">
              <span class="stats-icon">📊</span>
              <span class="stats-label">{{ t('tools.examPrep.home.todayStudy') }}</span>
            </div>
            <span class="stats-date">{{ todayDate }}</span>
          </div>
          <div class="stats-main">
            <div class="stat-main-item">
              <div class="stat-circle">
                <div class="stat-circle-inner">
                  <span class="stat-num">{{ todayCount }}</span>
                  <span class="stat-unit">题</span>
                </div>
                <svg class="progress-ring" viewBox="0 0 100 100">
                  <circle class="progress-bg" cx="50" cy="50" r="42" />
                  <circle 
                    class="progress-fill" 
                    cx="50" cy="50" r="42"
                    :style="{ strokeDashoffset: 264 - (264 * Math.min(todayCount, 50) / 50) }"
                  />
                </svg>
              </div>
              <div class="stat-label-text">{{ t('tools.examPrep.home.practiced') }}</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-secondary">
              <div class="stat-mini-item">
                <div class="mini-icon success">
                  <van-icon name="success" />
                </div>
                <div class="mini-info">
                  <div class="mini-num">{{ todayAccuracy }}%</div>
                  <div class="mini-text">{{ t('tools.examPrep.home.accuracy') }}</div>
                </div>
              </div>
              <div class="stat-mini-item">
                <div class="mini-icon primary">
                  <van-icon name="orders-o" />
                </div>
                <div class="mini-info">
                  <div class="mini-num">{{ totalCount }}</div>
                  <div class="mini-text">{{ t('tools.examPrep.home.totalPractice') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 快捷入口 -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">{{ t('tools.examPrep.home.quickEntry') }}</h2>
          <span class="section-badge">{{ t('tools.examPrep.home.quickStart') }}</span>
        </div>
        <div class="quick-entry">
          <button class="entry-card main-entry" @click="handleContinuePractice">
            <div class="entry-icon">
              <div class="entry-icon-bg">
                <van-icon name="play" />
              </div>
            </div>
            <div class="entry-info">
              <div class="entry-title">{{ currentSubject === 'xingce' ? t('tools.examPrep.home.continuePractice') : t('tools.examPrep.home.continueShenlun') }}</div>
              <div class="entry-desc">{{ t('tools.examPrep.home.continueDesc') }}</div>
            </div>
            <div class="entry-arrow-wrap">
              <van-icon name="arrow" />
            </div>
          </button>
          <div class="entry-grid">
            <button class="entry-card mini" @click="handleDailyQuestion">
              <div class="mini-icon orange">
                <van-icon name="calendar-o" />
              </div>
              <span class="entry-name">{{ currentSubject === 'xingce' ? t('tools.examPrep.home.dailyQuestion') : t('tools.examPrep.home.dailyPractice') }}</span>
            </button>
            <button class="entry-card mini" @click="handleStartMockExam">
              <div class="mini-icon green">
                <van-icon name="certificate" />
              </div>
              <span class="entry-name">{{ currentSubject === 'xingce' ? t('tools.examPrep.home.mockExam') : t('tools.examPrep.home.mockShenlun') }}</span>
            </button>
            <button class="entry-card mini" @click="handleCollectedClick">
              <div class="mini-icon yellow">
                <van-icon name="star-o" />
              </div>
              <span class="entry-name">{{ t('tools.examPrep.home.collection') }}</span>
              <span v-if="collectionCount > 0" class="mini-badge">{{ collectionCount }}</span>
            </button>
          </div>
        </div>
      </section>

      <!-- 行测模块 -->
      <section v-if="currentSubject === 'xingce'" class="section">
        <div class="section-header">
          <h2 class="section-title">{{ t('tools.examPrep.home.specialPractice') }}</h2>
          <span class="section-more">{{ t('tools.examPrep.home.specialPracticeDesc') }}</span>
        </div>
        <div class="module-grid">
          <div 
            v-for="(module, index) in xingceModules" 
            :key="module.id"
            class="module-card"
            :style="{ '--m-color': module.color, animationDelay: `${index * 0.06}s` }"
            @click="handleModuleClick(module)"
          >
            <div class="module-top">
              <div class="module-icon">
                <span>{{ module.icon }}</span>
              </div>
              <div class="module-progress-ring">
                <span class="ring-text">{{ module.progress }}%</span>
              </div>
            </div>
            <div class="module-body">
              <h3 class="module-name">{{ module.name }}</h3>
              <p class="module-desc">{{ module.desc }}</p>
            </div>
            <div class="module-bar">
              <div class="bar-bg">
                <div class="bar-fill" :style="{ width: `${module.progress}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 申论模块 -->
      <section v-if="currentSubject === 'shenlun'" class="section">
        <div class="section-header">
          <h2 class="section-title">{{ t('tools.examPrep.home.shenlunTraining') }}</h2>
          <span class="section-more">{{ t('tools.examPrep.home.shenlunTrainingDesc') }}</span>
        </div>
        <div class="shenlun-list">
          <div 
            v-for="(item, index) in shenlunModules" 
            :key="item.id"
            class="shenlun-item"
            :style="{ animationDelay: `${index * 0.06}s` }"
            @click="handleShenlunModuleClick(item)"
          >
            <div class="shenlun-icon" :style="{ background: item.color }">
              <span>{{ item.icon }}</span>
            </div>
            <div class="shenlun-content">
              <h3 class="shenlun-title">{{ item.name }}</h3>
              <p class="shenlun-desc">{{ item.description }}</p>
            </div>
            <div class="shenlun-arrow">
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
      </section>

      <div class="bottom-space"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { showToast } from 'vant';
import { Icon as VanIcon } from 'vant';
import { useDatabase } from './hooks/useDatabase.js';
import { useRouter } from 'vue-router';
import { PRACTICE_MODES } from './utils/constants.js';

const { t } = useI18n();
const router = useRouter();

// 当前科目
const currentSubject = ref('xingce');

// 今日日期
const todayDate = computed(() => {
  const d = new Date();
  return `${d.getMonth() + 1}月${d.getDate()}日`;
});

// 科目配置
const subjectConfigs = {
  xingce: {
    name: t('tools.examPrep.subjects.xingce'),
    fullName: t('tools.examPrep.home.xingceFullName'),
    icon: '📝',
    color: 'linear-gradient(135deg, #69b1ff 0%, #1989fa 100%)',
    slogan: t('tools.examPrep.home.xingceSlogan'),
  },
  shenlun: {
    name: t('tools.examPrep.subjects.shenlun'),
    fullName: t('tools.examPrep.home.shenlunFullName'),
    icon: '📄',
    color: 'linear-gradient(135deg, #ffb697 0%, #ff7a44 100%)',
    slogan: t('tools.examPrep.home.shenlunSlogan'),
  },
};

const currentSubjectConfig = computed(() => subjectConfigs[currentSubject.value]);

// 行测模块
const xingceModules = computed(() => [
  { id: 'verbal', name: t('tools.examPrep.categories.verbal'), icon: '📝', color: '#1989fa', desc: t('tools.examPrep.home.verbalDesc'), progress: 35, count: 100 },
  { id: 'logic', name: t('tools.examPrep.categories.logic'), icon: '🧠', color: '#ff7a44', desc: t('tools.examPrep.home.logicDesc'), progress: 28, count: 100 },
  { id: 'math', name: t('tools.examPrep.categories.math'), icon: '🔢', color: '#07c160', desc: t('tools.examPrep.home.mathDesc'), progress: 20, count: 100 },
  { id: 'data', name: t('tools.examPrep.categories.data'), icon: '📊', color: '#69b1ff', desc: t('tools.examPrep.home.dataDesc'), progress: 25, count: 100 },
  { id: 'common', name: t('tools.examPrep.categories.common'), icon: '📚', color: '#ee0a24', desc: t('tools.examPrep.home.commonDesc'), progress: 18, count: 100 },
]);

// 申论模块
const shenlunModules = computed(() => [
  { id: 'reading', name: t('tools.examPrep.home.shenlunReading'), icon: '📖', color: 'linear-gradient(135deg, #69b1ff 0%, #1989fa 100%)', description: t('tools.examPrep.home.shenlunReadingDesc') },
  { id: 'analysis', name: t('tools.examPrep.home.shenlunAnalysis'), icon: '🔍', color: 'linear-gradient(135deg, #ffb697 0%, #ff7a44 100%)', description: t('tools.examPrep.home.shenlunAnalysisDesc') },
  { id: 'enforcement', name: t('tools.examPrep.home.shenlunEnforcement'), icon: '📋', color: 'linear-gradient(135deg, #5edf9c 0%, #07c160 100%)', description: t('tools.examPrep.home.shenlunEnforcementDesc') },
  { id: 'proposal', name: t('tools.examPrep.home.shenlunProposal'), icon: '💡', color: 'linear-gradient(135deg, #80abfc 0%, #1989fa 100%)', description: t('tools.examPrep.home.shenlunProposalDesc') },
  { id: 'writing', name: t('tools.examPrep.home.shenlunWriting'), icon: '✍️', color: 'linear-gradient(135deg, #fd7a77 0%, #ee0a24 100%)', description: t('tools.examPrep.home.shenlunWritingDesc') },
]);

// 统计数据
const todayCount = ref(0);
const todayAccuracy = ref(0);
const totalCount = ref(0);
const totalAccuracy = ref(0);
const collectionCount = ref(0);
const wrongCount = ref(0);

const database = useDatabase();

// 切换科目
const switchSubject = (subject) => {
  if (currentSubject.value === subject) return;
  currentSubject.value = subject;
};

// 加载统计
const loadStatistics = async () => {
  try {
    const stats = await database.getHomeStatistics();
    todayCount.value = stats.todayCount || 0;
    todayAccuracy.value = stats.todayAccuracy || 0;
    totalCount.value = stats.totalCount || 0;
    totalAccuracy.value = stats.totalAccuracy || 0;
    wrongCount.value = stats.wrongCount || 0;
    collectionCount.value = stats.collectionCount || 0;
  } catch (error) {
    console.error('加载统计失败:', error);
  }
};

// 路由跳转
const handleContinuePractice = () => router.push({
  name: 'ExamPrepPractice',
  query: { mode: PRACTICE_MODES.RANDOM, subject: currentSubject.value }
});

const handleDailyQuestion = () => router.push({
  name: 'ExamPrepPractice',
  query: { mode: PRACTICE_MODES.RANDOM, count: 10, subject: currentSubject.value }
});

const handleStartMockExam = () => router.push({
  name: 'ExamPrepExam',
  query: { subject: currentSubject.value }
});

const handleModuleClick = (module) => router.push({
  name: 'ExamPrepPractice',
  query: { mode: PRACTICE_MODES.CATEGORY, category: module.id, subject: 'xingce' }
});

const handleShenlunModuleClick = (item) => router.push({
  name: 'ExamPrepPractice',
  query: { mode: PRACTICE_MODES.CATEGORY, category: item.id, subject: 'shenlun' }
});

const handleCollectedClick = () => router.push({ name: 'ExamPrepCollections' });
const handleWrongClick = () => router.push({ name: 'ExamPrepWrongQuestions' });
const handleKnowledgeClick = () => router.push({
  name: 'ExamPrepKnowledge',
  query: { subject: currentSubject.value }
});
const handlePracticeClick = () => router.push({
  name: 'ExamPrepPractice',
  query: { subject: currentSubject.value }
});
const handleWrongNavClick = () => router.push({ name: 'ExamPrepWrongQuestions' });
const handleStatsNavClick = () => router.push({ name: 'ExamPrepStatistics' });
const goToSettings = () => router.push({ name: 'ExamPrepSettings' });

watch(currentSubject, loadStatistics);
onMounted(() => loadStatistics());
</script>

<style lang="less" scoped>
.exam-prep {
  --shenlun-primary: var(--van-orange-6);
  --shenlun-secondary: var(--van-orange-7);
  --shenlun-tertiary: var(--van-orange-8);
  --shenlun-light: var(--van-orange-4);
  --shenlun-lighter: var(--van-orange-5);
  --gradient-shenlun: linear-gradient(135deg, var(--van-orange-5) 0%, var(--van-orange-7) 100%);
  --gradient-success: linear-gradient(135deg, var(--van-green-4) 0%, var(--van-green-6) 100%);
  --gradient-danger: linear-gradient(135deg, var(--van-red-5) 0%, var(--van-red-7) 100%);
  --gradient-warning: linear-gradient(135deg, var(--van-orange-4) 0%, var(--van-orange-6) 100%);
  --gradient-primary: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%);

  /* Hero区域 */
  .hero-section {
    position: relative;
    padding: 0 20px 24px;
    padding-top: calc(env(safe-area-inset-top) + 16px);
    color: #fff;
    overflow: hidden;
    border-radius: 0 0 32px 32px;

    &.hero-xingce {
      background: linear-gradient(180deg, var(--color-primary) 0%, var(--van-blue-6) 50%, var(--van-blue-7) 100%);
    }
    &.hero-shenlun {
      background: linear-gradient(180deg, var(--shenlun-primary) 0%, var(--shenlun-secondary) 50%, var(--shenlun-tertiary) 100%);
    }

    .hero-bg-decoration {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      overflow: hidden;

      .bg-circle {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);

        &.circle-1 {
          width: 200px;
          height: 200px;
          top: -60px;
          right: -40px;
        }
        &.circle-2 {
          width: 140px;
          height: 140px;
          top: 40px;
          left: -50px;
          background: rgba(255, 255, 255, 0.06);
        }
        &.circle-3 {
          width: 100px;
          height: 100px;
          bottom: -20px;
          right: 80px;
          background: rgba(255, 255, 255, 0.05);
        }
      }
    }
  }

  .hero-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    position: relative;
    z-index: 1;

    .hero-title-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .hero-logo {
      width: 44px;
      height: 44px;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(255, 255, 255, 0.15);

      .logo-icon {
        font-size: 24px;
      }
    }

    .hero-title-group {
      .hero-title {
        font-size: 19px;
        font-weight: 700;
        margin: 0;
        line-height: 1.3;
        letter-spacing: -0.3px;
      }

      .hero-subtitle {
        font-size: 12px;
        opacity: 0.7;
        margin: 3px 0 0;
        font-weight: 400;
      }
    }

    .header-actions {
      .header-btn {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #fff;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

        &:active {
          transform: scale(0.92);
          background: rgba(255, 255, 255, 0.25);
        }
      }
    }
  }

  /* 导航入口 */
  .nav-entry {
    display: flex;
    justify-content: space-between;
    padding: 0 8px;
    position: relative;
    z-index: 1;

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      background: transparent;
      border: none;
      color: #fff;
      cursor: pointer;
      position: relative;
      flex: 1;
      transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);

      &:active {
        transform: scale(0.92);
      }

      .nav-icon {
        width: 52px;
        height: 52px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        color: #fff;
        position: relative;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        &::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.1);
          z-index: -1;
        }

        &.primary {
          background: var(--gradient-warning);
          box-shadow: 0 4px 16px rgba(255, 151, 106, 0.4);
        }
        &.danger {
          background: var(--gradient-danger);
          box-shadow: 0 4px 16px rgba(238, 10, 36, 0.4);
        }
        &.success {
          background: var(--gradient-success);
          box-shadow: 0 4px 16px rgba(7, 193, 96, 0.4);
        }
        &.warning {
          background: var(--gradient-primary);
          box-shadow: 0 4px 16px rgba(25, 137, 250, 0.4);
        }
      }

      .nav-text {
        font-size: 12px;
        font-weight: 500;
        opacity: 0.95;
      }

      .nav-badge {
        position: absolute;
        top: -6px;
        right: calc(50% - 34px);
        min-width: 20px;
        height: 20px;
        padding: 0 6px;
        background: var(--color-bg-secondary);
        color: var(--color-danger);
        font-size: 11px;
        font-weight: 700;
        line-height: 20px;
        text-align: center;
        border-radius: 10px;
        box-shadow: var(--shadow-sm);
      }
    }
  }

  /* 科目切换卡片 */
  .subject-switcher-card {
    margin: -12px 16px 0;
    position: relative;
    z-index: 10;
  }

  /* 科目切换 */
  .subject-switcher {
    display: flex;
    background: var(--color-bg-secondary);
    border-radius: 16px;
    padding: 4px;
    box-shadow: var(--shadow-md);

    .subject-tab {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 14px 0;
      border: none;
      background: transparent;
      color: var(--color-text-secondary);
      font-size: 14px;
      font-weight: 500;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &.active {
        background: var(--gradient-primary);
        color: #fff;
        font-weight: 600;
        box-shadow: 0 2px 12px rgba(25, 137, 250, 0.35);
      }

      .tab-icon {
        font-size: 16px;
      }
    }
  }

  /* 主内容 */
  .main-content {
    padding-top: 16px;
    position: relative;
    z-index: 2;
  }

  /* 统计卡片 */
  .stats-section {
    padding: 0 16px 18px;
  }

  .stats-card {
    background: var(--color-bg-secondary);
    border-radius: 20px;
    padding: 20px;
    box-shadow: var(--shadow-card);

    .stats-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 18px;

      .stats-title-group {
        display: flex;
        align-items: center;
        gap: 8px;

        .stats-icon {
          font-size: 18px;
        }

        .stats-label {
          font-size: 16px;
          font-weight: 700;
          color: var(--color-text-primary);
          letter-spacing: -0.2px;
        }
      }

      .stats-date {
        font-size: 12px;
        color: var(--color-text-tertiary);
        font-weight: 500;
      }
    }

    .stats-main {
      display: flex;
      align-items: center;
      gap: 16px;

      .stat-main-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;

        .stat-circle {
          position: relative;
          width: 88px;
          height: 88px;
          display: flex;
          align-items: center;
          justify-content: center;

          .stat-circle-inner {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .stat-num {
              font-size: 32px;
              font-weight: 800;
              background: var(--gradient-primary);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              line-height: 1;
              letter-spacing: -1px;
            }

            .stat-unit {
              font-size: 11px;
              color: var(--color-text-tertiary);
              font-weight: 500;
              margin-top: 2px;
            }
          }

          .progress-ring {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transform: rotate(-90deg);

            .progress-bg {
              fill: none;
              stroke: var(--color-border);
              stroke-width: 6;
            }

            .progress-fill {
              fill: none;
              stroke: url(#gradient);
              stroke-width: 6;
              stroke-linecap: round;
              stroke-dasharray: 264;
              stroke-dashoffset: 264;
              transition: stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1);
              stroke: var(--color-primary);
            }
          }
        }

        .stat-label-text {
          font-size: 12px;
          color: var(--color-text-secondary);
          font-weight: 500;
        }
      }

      .stat-divider {
        width: 1px;
        height: 72px;
        background: linear-gradient(180deg, transparent, var(--color-border), transparent);
      }

      .stat-secondary {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 14px;

        .stat-mini-item {
          display: flex;
          align-items: center;
          gap: 10px;

          .mini-icon {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            color: #fff;
            flex-shrink: 0;

            &.success {
              background: var(--gradient-success);
            }
            &.primary {
              background: var(--gradient-primary);
            }
          }

          .mini-info {
            .mini-num {
              font-size: 18px;
              font-weight: 700;
              color: var(--color-text-primary);
              line-height: 1.2;
            }

            .mini-text {
              font-size: 11px;
              color: var(--color-text-tertiary);
              margin-top: 2px;
            }
          }
        }
      }
    }
  }

  /* 通用section */
  .section {
    padding: 0 16px 18px;

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .section-title {
      font-size: 16px;
      font-weight: 700;
      color: var(--color-text-primary);
      margin: 0;
      letter-spacing: -0.2px;
    }

    .section-more {
      font-size: 12px;
      color: var(--color-text-secondary);
      font-weight: 500;
    }

    .section-badge {
      font-size: 11px;
      color: var(--color-primary);
      background: color-mix(in srgb, var(--color-primary) 10%, transparent);
      padding: 4px 10px;
      border-radius: 20px;
      font-weight: 600;
    }
  }

  /* 快捷入口 */
  .quick-entry {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .entry-card {
      border: none;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      text-align: left;
      box-sizing: border-box;
      border-radius: 16px;

      &:active {
        transform: scale(0.98);
      }

      &.main-entry {
        display: flex;
        align-items: center;
        padding: 18px;
        background: var(--gradient-primary);
        color: #fff;
        box-shadow: 0 8px 24px rgba(25, 137, 250, 0.35);
        position: relative;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          top: -30px;
          right: -30px;
          width: 120px;
          height: 120px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
        }

        &::after {
          content: '';
          position: absolute;
          bottom: -40px;
          right: 20px;
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
        }

        .entry-icon {
          margin-right: 14px;
          position: relative;
          z-index: 1;

          .entry-icon-bg {
            width: 52px;
            height: 52px;
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 26px;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
        }

        .entry-info {
          flex: 1;
          position: relative;
          z-index: 1;

          .entry-title {
            font-size: 17px;
            font-weight: 700;
            margin-bottom: 4px;
            letter-spacing: -0.2px;
          }

          .entry-desc {
            font-size: 12px;
            opacity: 0.8;
          }
        }

        .entry-arrow-wrap {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          position: relative;
          z-index: 1;
        }
      }
    }

    .entry-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;

      .entry-card.mini {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        background: var(--color-bg-secondary);
        padding: 16px;
        box-shadow: var(--shadow-card);
        position: relative;

        .mini-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #fff;

          &.orange {
            background: var(--gradient-shenlun);
          }
          &.green {
            background: var(--gradient-success);
          }
          &.yellow {
            background: var(--gradient-warning);
          }
        }

        .entry-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .mini-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          min-width: 18px;
          height: 18px;
          padding: 0 5px;
          background: var(--color-warning);
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          line-height: 18px;
          text-align: center;
          border-radius: 9px;
        }
      }
    }
  }

  /* 模块网格 */
  .module-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .module-card {
    background: var(--color-bg-secondary);
    border-radius: 16px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: var(--shadow-card);
    animation: fadeInUp 0.4s ease both;
    position: relative;
    overflow: hidden;

    &:active {
      transform: translateY(-2px) scale(0.98);
      box-shadow: var(--shadow-lg);
    }

    .module-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 14px;

      .module-icon {
        width: 46px;
        height: 46px;
        border-radius: 14px;
        background: var(--m-color);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        span {
          font-size: 24px;
          opacity: 1;
        }
      }

      .module-progress-ring {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2.5px solid var(--m-color);
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-bg-secondary);

        .ring-text {
          font-size: 10px;
          font-weight: 700;
          color: var(--m-color);
        }
      }
    }

    .module-body {
      margin-bottom: 12px;

      .module-name {
        font-size: 15px;
        font-weight: 700;
        color: var(--color-text-primary);
        margin: 0 0 4px;
        letter-spacing: -0.2px;
      }

      .module-desc {
        font-size: 11px;
        color: var(--color-text-tertiary);
        margin: 0;
        line-height: 1.4;
      }
    }

    .module-bar {
      .bar-bg {
        height: 5px;
        background: var(--color-border);
        border-radius: 3px;
        overflow: hidden;

        .bar-fill {
          height: 100%;
          background: var(--m-color);
          border-radius: 3px;
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
      }
    }
  }

  /* 申论列表 */
  .shenlun-list {
    background: var(--color-bg-secondary);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--shadow-card);
  }

  .shenlun-item {
    display: flex;
    align-items: center;
    padding: 16px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    animation: fadeInLeft 0.4s ease both;

    &:not(:last-child) {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        left: 72px;
        right: 16px;
        bottom: 0;
        height: 1px;
        background: var(--color-border);
      }
    }

    &:active {
      background: var(--color-bg-tertiary);
    }

    .shenlun-icon {
      width: 46px;
      height: 46px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      margin-right: 14px;
      color: #fff;
      flex-shrink: 0;
      box-shadow: var(--shadow-sm);
    }

    .shenlun-content {
      flex: 1;
      min-width: 0;

      .shenlun-title {
        font-size: 15px;
        font-weight: 600;
        color: var(--color-text-primary);
        margin: 0 0 4px;
      }

      .shenlun-desc {
        font-size: 12px;
        color: var(--color-text-tertiary);
        margin: 0;
        line-height: 1.4;
      }
    }

    .shenlun-arrow {
      color: var(--color-text-quaternary);
      font-size: 16px;
      margin-left: 8px;
    }
  }

  /* 学习工具 */
  .tool-card {
    background: var(--color-bg-secondary);
    border-radius: 16px;
    padding: 16px;
    box-shadow: var(--shadow-card);
  }

  .tool-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }

  .tool-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 8px 4px;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 12px;

    &:active {
      transform: scale(0.92);
      background: var(--color-bg-tertiary);
    }

    .tool-icon {
      width: 46px;
      height: 46px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      color: #fff;
      position: relative;

      &.wrong { 
        background: var(--gradient-danger);
        box-shadow: 0 4px 12px rgba(238, 10, 36, 0.3);
      }
      &.collect { 
        background: var(--gradient-warning);
        box-shadow: 0 4px 12px rgba(255, 151, 106, 0.3);
      }
      &.knowledge { 
        background: var(--gradient-primary);
        box-shadow: 0 4px 12px rgba(25, 137, 250, 0.3);
      }
      &.setting { 
        background: linear-gradient(135deg, var(--van-blue-3) 0%, var(--van-blue-5) 100%);
        box-shadow: 0 4px 12px rgba(25, 137, 250, 0.3);
      }
    }

    .tool-name {
      font-size: 12px;
      color: var(--color-text-secondary);
      font-weight: 500;
    }

    .tool-badge {
      position: absolute;
      top: 2px;
      right: calc(50% - 28px);
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      background: var(--color-danger);
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      line-height: 18px;
      text-align: center;
      border-radius: 9px;
      box-shadow: 0 2px 6px rgba(238, 10, 36, 0.3);
    }
  }

  .bottom-space {
    height: 24px;
  }
}

/* 深色模式 */
[data-theme="dark"] .exam-prep {
  --shenlun-primary: var(--van-orange-5);
  --shenlun-secondary: var(--van-orange-6);
  --shenlun-tertiary: var(--van-orange-7);
  --shenlun-light: var(--van-orange-3);
  --shenlun-lighter: var(--van-orange-4);
  --gradient-shenlun: linear-gradient(135deg, var(--van-orange-4) 0%, var(--van-orange-6) 100%);
  --gradient-success: linear-gradient(135deg, var(--van-green-3) 0%, var(--van-green-5) 100%);
  --gradient-danger: linear-gradient(135deg, var(--van-red-4) 0%, var(--van-red-6) 100%);
  --gradient-warning: linear-gradient(135deg, var(--van-orange-3) 0%, var(--van-orange-5) 100%);
  --gradient-primary: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%);
}

/* 动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>