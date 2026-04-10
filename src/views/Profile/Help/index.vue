<template>
  <div class="help-page">
    <!-- 搜索框 -->
    <section class="search-section">
      <van-search
        v-model="searchKeyword"
        placeholder="搜索问题..."
        shape="round"
        background="transparent"
      />
    </section>

    <!-- 常见问题 -->
    <section class="faq-section">
      <div class="section-title">常见问题</div>
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
      <div class="section-title">游戏说明</div>
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
      <div class="section-title">积分规则</div>
      <van-cell-group inset>
        <van-cell title="如何获得积分？" is-link @click="showPointsRule('earn')" />
        <van-cell title="如何使用积分？" is-link @click="showPointsRule('use')" />
        <van-cell title="积分会过期吗？" is-link @click="showPointsRule('expire')" />
      </van-cell-group>
    </section>

    <!-- 联系我们 -->
    <section class="contact-section">
      <div class="section-title">联系我们</div>
      <van-cell-group inset>
        <van-cell 
          title="在线客服" 
          icon="service-o"
          is-link 
          @click="handleOnlineService"
        />
        <van-cell 
          title="意见反馈" 
          icon="edit"
          is-link 
          @click="handleFeedback"
        />
        <van-cell 
          title="举报问题" 
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
        text="温馨提示：本平台仅供娱乐，请理性参与，切勿沉迷。如有任何问题，请联系客服。"
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
            <h4>游戏规则</h4>
            <p>{{ currentGame.rules }}</p>
          </div>
          <div class="guide-item">
            <h4>奖励机制</h4>
            <p>{{ currentGame.rewards }}</p>
          </div>
          <div class="guide-item">
            <h4>注意事项</h4>
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
          <h3>积分规则</h3>
          <van-icon name="cross" @click="showPointsPopup = false" />
        </div>
        <div class="popup-content">
          <div v-if="currentPointsRule === 'earn'">
            <h4>如何获得积分</h4>
            <ul>
              <li>每日签到：基础10积分，连续签到有额外奖励</li>
              <li>数字猜猜猜：根据猜测准确度获得10-50积分</li>
              <li>幸运转盘：消耗10积分参与，有机会获得更高奖励</li>
              <li>答题挑战：答对一题得5分，连续答对有额外奖励</li>
              <li>邀请好友：每邀请一位好友获得50积分</li>
            </ul>
          </div>
          <div v-else-if="currentPointsRule === 'use'">
            <h4>如何使用积分</h4>
            <ul>
              <li>参与幸运转盘游戏（每次消耗10积分）</li>
              <li>在积分兑换中心兑换礼品</li>
              <li>解锁特殊游戏功能</li>
              <li>购买游戏道具</li>
            </ul>
          </div>
          <div v-else>
            <h4>积分有效期</h4>
            <ul>
              <li>积分永久有效，不会过期</li>
              <li>请妥善保管您的账号，避免积分丢失</li>
              <li>如发现积分异常，请及时联系客服</li>
            </ul>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
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
const faqList = ref([
  {
    id: 1,
    question: '如何开始玩游戏？',
    answer: '点击底部导航栏的"娱乐"按钮，进入游戏中心，选择您感兴趣的游戏即可开始。每个游戏都有详细的游戏规则说明。'
  },
  {
    id: 2,
    question: '积分有什么用？',
    answer: '积分可以用于参与部分游戏（如幸运转盘）、兑换礼品、解锁特殊功能等。积分仅供娱乐，不可兑换现金。'
  },
  {
    id: 3,
    question: '如何提高胜率？',
    answer: '熟悉游戏规则是提高胜率的关键。建议先仔细阅读每个游戏的规则说明，多练习积累经验。'
  },
  {
    id: 4,
    question: '忘记签到怎么办？',
    answer: '每日签到需要在当天完成，错过无法补签。建议开启签到提醒功能，避免错过。'
  },
  {
    id: 5,
    question: '账号安全问题如何保障？',
    answer: '请妥善保管您的账号信息，不要泄露给他人。建议绑定手机号，开启二次验证，定期修改密码。'
  }
])

// ========================================
// 游戏说明数据
// ========================================
const gameGuides = ref([
  {
    id: 1,
    name: '数字猜猜猜',
    icon: 'question-o',
    rules: '系统随机生成1-100的数字，您有7次机会猜测。每次猜测后会提示偏大或偏小。',
    rewards: '7次内猜中得50积分，5次内得30积分，3次内得10积分。',
    notes: '每天可以无限次参与，但只有首次胜利能获得积分奖励。'
  },
  {
    id: 2,
    name: '幸运转盘',
    icon: 'gift-o',
    rules: '消耗10积分转动转盘，转盘分为6个区域，对应不同等级的奖品。',
    rewards: '一等奖500积分，二等奖200积分，三等奖100积分，四等奖50积分，五等奖20积分，谢谢参与。',
    notes: '转盘采用精准定位算法，确保公平公正。'
  },
  {
    id: 3,
    name: '答题挑战',
    icon: 'star-o',
    rules: '共5道技术类选择题，每题20秒作答时间。',
    rewards: '答对一题得5分，全部答对额外奖励25分，连续答对有连击加成。',
    notes: '题目涵盖前端、后端、数据库等多个技术领域。'
  },
  {
    id: 4,
    name: '每日签到',
    icon: 'clock-o',
    rules: '每天登录即可签到，获得基础积分奖励。',
    rewards: '基础奖励10积分，连续签到3天额外+5分，7天额外+15分，30天额外+50分。',
    notes: '签到时间为每天0点刷新，错过当天无法补签。'
  }
])

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
  showToast('在线客服功能开发中')
}

/**
 * 处理意见反馈
 */
const handleFeedback = () => {
  showToast('意见反馈功能开发中')
}

/**
 * 处理举报
 */
const handleReport = () => {
  showToast('举报功能开发中')
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
}

/* ========================================
   积分规则区域
   ======================================== */
.rules-section {
  margin: 0 var(--spacing-md);
}

/* ========================================
   联系我们区域
   ======================================== */
.contact-section {
  margin: 0 var(--spacing-md);
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
