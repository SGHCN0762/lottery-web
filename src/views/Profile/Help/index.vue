<template>
  <div class="help-page">
    <!-- 搜索框 -->
    <section class="search-section">
      <van-search
        v-model="searchKeyword"
        :placeholder="t('help.searchPlaceholder')"
        shape="round"
        background="transparent"
      />
    </section>

    <!-- 常见问题 -->
    <section class="faq-section">
      <div class="section-title">{{ t('help.faq') }}</div>
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item
          v-for="item in faqList"
          :key="item.id"
          :title="item.question"
          :name="item.id"
        >
          <div class="answer-content">{{ item.answer }}</div>
        </van-collapse-item>
      </van-collapse>
    </section>

    <!-- 游戏说明 -->
    <section class="guide-section">
      <div class="section-title">{{ t('help.gameGuide') }}</div>
      <van-cell-group inset>
        <van-cell
          v-for="game in gameGuides"
          :key="game.id"
          :title="game.name"
          :icon="game.icon"
          is-link
          @click="showGameGuide(game)"
        />
      </van-cell-group>
    </section>

    <!-- 积分规则 -->
    <section class="rules-section">
      <div class="section-title">{{ t('help.pointsRules') }}</div>
      <van-cell-group inset>
        <van-cell :title="t('help.howToEarn')" is-link @click="showPointsRule('earn')" />
        <van-cell :title="t('help.howToUse')" is-link @click="showPointsRule('use')" />
        <van-cell :title="t('help.expireRule')" is-link @click="showPointsRule('expire')" />
      </van-cell-group>
    </section>

    <!-- 联系我们 -->
    <section class="contact-section">
      <div class="section-title">{{ t('help.contactUs') }}</div>
      <van-cell-group inset>
        <van-cell 
          :title="t('help.onlineService.title')" 
          icon="service-o"
          is-link 
          @click="handleOnlineService"
        />
        <van-cell 
          :title="t('help.feedback')" 
          icon="edit"
          is-link 
          @click="handleFeedback"
        />
        <van-cell 
          :title="t('help.report')" 
          icon="warning-o"
          is-link 
          @click="handleReport"
        />
      </van-cell-group>
    </section>

    <!-- 温馨提示 -->
    <section class="tip-section">
      <van-notice-bar
        left-icon="info-o"
        :text="t('help.tip')"
        scrollable
      />
    </section>

    <!-- 游戏说明弹窗 -->
    <van-popup
      v-model:show="showGuidePopup"
      round
      position="bottom"
      :style="{ height: '60%' }"
    >
      <div class="guide-popup" v-if="currentGame">
        <div class="popup-header">
          <h3>{{ currentGame.name }}</h3>
          <van-icon name="cross" @click="showGuidePopup = false" />
        </div>
        <div class="popup-content">
          <div class="guide-item">
            <h4>{{ t('help.guidePopup.rules') }}</h4>
            <p>{{ currentGame.rules }}</p>
          </div>
          <div class="guide-item">
            <h4>{{ t('help.guidePopup.rewards') }}</h4>
            <p>{{ currentGame.rewards }}</p>
          </div>
          <div class="guide-item">
            <h4>{{ t('help.guidePopup.notes') }}</h4>
            <p>{{ currentGame.notes }}</p>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 积分规则弹窗 -->
    <van-popup
      v-model:show="showPointsPopup"
      round
      position="bottom"
      :style="{ height: '50%' }"
    >
      <div class="points-popup">
        <div class="popup-header">
          <h3>{{ t('help.pointsPopup.title') }}</h3>
          <van-icon name="cross" @click="showPointsPopup = false" />
        </div>
        <div class="popup-content">
          <div v-if="currentPointsRule === 'earn'">
            <h4>{{ pointsRules.earn.title }}</h4>
            <ul>
              <li v-for="(item, index) in pointsRules.earn.items" :key="index">{{ item }}</li>
            </ul>
          </div>
          <div v-else-if="currentPointsRule === 'use'">
            <h4>{{ pointsRules.use.title }}</h4>
            <ul>
              <li v-for="(item, index) in pointsRules.use.items" :key="index">{{ item }}</li>
            </ul>
          </div>
          <div v-else>
            <h4>{{ pointsRules.expire.title }}</h4>
            <ul>
              <li v-for="(item, index) in pointsRules.expire.items" :key="index">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { 
  Search as VanSearch,
  Collapse as VanCollapse,
  CollapseItem as VanCollapseItem,
  CellGroup as VanCellGroup,
  Cell as VanCell,
  Icon as VanIcon,
  NoticeBar as VanNoticeBar,
  Popup as VanPopup
} from 'vant'

// ========================================
// i18n
// ========================================
const { t } = useI18n()

// ========================================
// 路由实例
// ========================================
const router = useRouter()

// ========================================
// 响应式数据
// ========================================
const searchKeyword = ref('')
const activeNames = ref([])
const showGuidePopup = ref(false)
const showPointsPopup = ref(false)
const currentGame = ref(null)
const currentPointsRule = ref('')

// ========================================
// FAQ 数据
// ========================================
const faqList = computed(() => [
  {
    id: 1,
    question: t('help.faqList[0].question'),
    answer: t('help.faqList[0].answer')
  }
])

// ========================================
// 游戏说明数据
// ========================================
const gameGuides = computed(() => [
  {
    id: 1,
    name: t('lottery.numberGuess'),
    icon: 'question-o',
    rules: t('help.gameGuides.numberGuess.rules'),
    rewards: t('help.gameGuides.numberGuess.rewards'),
    notes: t('help.gameGuides.numberGuess.notes')
  },
  {
    id: 2,
    name: t('lottery.luckyWheel'),
    icon: 'gift-o',
    rules: t('help.gameGuides.luckyWheel.rules'),
    rewards: t('help.gameGuides.luckyWheel.rewards'),
    notes: t('help.gameGuides.luckyWheel.notes')
  },
  {
    id: 3,
    name: t('lottery.quizChallenge'),
    icon: 'star-o',
    rules: t('help.gameGuides.quizChallenge.rules'),
    rewards: t('help.gameGuides.quizChallenge.rewards'),
    notes: t('help.gameGuides.quizChallenge.notes')
  },
  {
    id: 4,
    name: t('lottery.dailyCheckIn'),
    icon: 'clock-o',
    rules: t('help.gameGuides.dailyCheckIn.rules'),
    rewards: t('help.gameGuides.dailyCheckIn.rewards'),
    notes: t('help.gameGuides.dailyCheckIn.notes')
  }
])

// 调试用：检查国际化数据
const debugI18n = computed(() => {
  const result = t('help.pointsPopup.use.items')
  console.log('t(help.pointsPopup.use.items):', result)
  console.log('Type:', typeof result)
  console.log('Is array:', Array.isArray(result))
  return result
})

// ========================================
// 积分规则数据
// ========================================
const pointsRules = computed(() => {
  return {
    earn: {
      title: t('help.pointsPopup.earn.title'),
      items: t('help.pointsPopup.earn.items')
    },
    use: {
      title: t('help.pointsPopup.use.title'),
      items: t('help.pointsPopup.use.items')
    },
    expire: {
      title: t('help.pointsPopup.expire.title'),
      items: t('help.pointsPopup.expire.items')
    }
  }
})

// ========================================
// 工具函数
// ========================================

/**
 * 显示游戏说明
 */
const showGameGuide = (game) => {
  currentGame.value = game
  showGuidePopup.value = true
}

/**
 * 显示积分规则
 */
const showPointsRule = (type) => {
  currentPointsRule.value = type
  showPointsPopup.value = true
}

/**
 * 处理在线客服
 */
const handleOnlineService = () => {
  router.push({ name: 'HelpOnlineService' })
}

/**
 * 处理意见反馈
 */
const handleFeedback = () => {
  router.push({ name: 'HelpFeedback' })
}

/**
 * 处理举报
 */
const handleReport = () => {
  router.push({ name: 'HelpReport' })
}
</script>

<style lang="less" scoped>
.help-page {
  min-height: 100%;
  background: var(--color-bg-primary);
  padding-bottom: var(--spacing-xl);
}

/* ========================================
   搜索区域
   ======================================== */
.search-section {
  margin: 0 var(--spacing-md) var(--spacing-md);
}

/* ========================================
   区块标题
   ======================================== */
.section-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: var(--spacing-lg) var(--spacing-md) var(--spacing-md);
  font-weight: var(--font-weight-medium);
}

/* ========================================
   FAQ 区域
   ======================================== */
.faq-section {
  margin: 0 var(--spacing-md);

  .answer-content {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    line-height: 1.8;
    padding: var(--spacing-sm) 0;
  }
}

/* ========================================
   游戏说明区域
   ======================================== */
.guide-section {
  margin: 0 var(--spacing-md);

  :deep(.van-cell) {
    .van-cell__title {
      flex: 1;
      min-width: 0;
      word-wrap: break-word;
      word-break: break-word;
      line-height: 1.4;
    }
  }
}

/* ========================================
   积分规则区域
   ======================================== */
.rules-section {
  margin: 0 var(--spacing-md);

  :deep(.van-cell) {
    .van-cell__title {
      flex: 1;
      min-width: 0;
      word-wrap: break-word;
      word-break: break-word;
      line-height: 1.4;
    }
  }
}

/* ========================================
   联系我们区域
   ======================================== */
.contact-section {
  margin: 0 var(--spacing-md);

  :deep(.van-cell) {
    .van-cell__title {
      flex: 1;
      min-width: 0;
      word-wrap: break-word;
      word-break: break-word;
      line-height: 1.4;
    }
  }
}

/* ========================================
   温馨提示区域
   ======================================== */
.tip-section {
  margin: var(--spacing-lg) var(--spacing-md);
}

/* ========================================
   弹窗样式
   ======================================== */
.guide-popup,
.points-popup {
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

    .guide-item {
      margin-bottom: var(--spacing-lg);

      h4 {
        font-size: var(--font-size-md);
        color: var(--color-text-primary);
        margin: 0 0 var(--spacing-sm) 0;
        font-weight: var(--font-weight-semibold);
      }

      p {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        line-height: 1.8;
        margin: 0;
      }
    }

    ul {
      padding-left: var(--spacing-lg);
      margin: 0;

      li {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        line-height: 2;
      }
    }
  }
}
</style>
