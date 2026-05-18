<template>
  <div class="game-start-screen">
    <div class="start-icon">📝</div>
    <h2 class="start-title">{{ t('quizChallenge.title') }}</h2>
    <p class="start-desc">{{ t('quizChallenge.startDesc') }}</p>

    <!-- 分类选择 -->
    <div class="category-section">
      <h3 class="section-title">{{ t('quizChallenge.selectCategory') }}</h3>
      <div class="category-grid">
        <div
          v-for="category in categories"
          :key="category.key"
          class="category-item"
          :class="{ selected: selectedCategories.includes(category.key) }"
          @click="toggleCategory(category.key)"
        >
          <span class="category-name">{{ category.name }}</span>
          <span class="category-count">{{ category.count }}题</span>
        </div>
      </div>
    </div>

    <!-- 题目数量选择（只在选择了分类后显示） -->
    <div v-if="selectedCategories.length > 0" class="count-section">
      <h3 class="section-title">{{ t('quizChallenge.selectCount') }}</h3>

      <!-- 预设选项 + 自定义按钮 -->
      <div class="count-options">
        <div
          v-for="count in availableCounts"
          :key="count"
          class="count-item"
          :class="{ selected: questionCount === count }"
          @click="selectPresetCount(count)"
        >
          {{ count }}题
        </div>

        <!-- 自定义输入按钮 -->
        <div
          class="count-item custom-count-item"
          :class="{ selected: !availableCounts.includes(questionCount) && questionCount >= 5 }"
          @click="showCustomInputDialog = true"
        >
          自定义{{ tempCustomCount && ` ${tempCustomCount} 题` }}
        </div>
      </div>
    </div>

    <!-- 自定义数量输入弹窗 -->
    <van-popup
      v-model:show="showCustomInputDialog"
      position="bottom"
      round
      :style="{ padding: '20px' }"
    >
      <div class="popup-content">
        <h3 class="popup-title">{{ t('quizChallenge.selectCount') }}</h3>

        <van-field
          v-model="tempCustomCount"
          type="number"
          :placeholder="`请输入5-${maxAvailableCount}之间的数字`"
          :formatter="formatCountInput"
          autofocus
          class="popup-input"
        />

        <div class="popup-actions">
          <van-button plain block @click="cancelCustomCount"> 取消 </van-button>
          <van-button
            type="primary"
            block
            @click="confirmCustomCount"
            :disabled="!isValidCustomCount"
          >
            确定
          </van-button>
        </div>
      </div>
    </van-popup>

    <!-- 开始按钮 -->
    <van-button
      type="primary"
      size="large"
      @click="handleStart"
      :disabled="selectedCategories.length === 0"
      class="start-btn"
    >
      {{ t('quizChallenge.start') }}
    </van-button>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { showToast } from 'vant';

  const { t } = useI18n();

  const emit = defineEmits(['start']);

  // 从父组件接收分类数据
  const props = defineProps({
    categories: {
      type: Array,
      required: true,
    },
  });

  // 选中的分类
  const selectedCategories = ref([]);

  // 题目数量
  const questionCount = ref(5);

  // 弹窗相关状态
  const showCustomInputDialog = ref(false);
  const tempCustomCount = ref('');

  // 可用的题目数量选项（根据选中分类的总题数动态计算）
  const availableCounts = computed(() => {
    if (selectedCategories.value.length === 0) {
      return [];
    }

    let totalQuestions = 0;
    selectedCategories.value.forEach(catKey => {
      const category = props.categories.find(c => c.key === catKey);
      if (category) {
        totalQuestions += category.count;
      }
    });

    const counts = [];
    for (let i = 5; i <= Math.min(totalQuestions, 50); i += 5) {
      counts.push(i);
    }

    return counts.length > 0 ? counts : [5];
  });

  // 最大可用题目数量
  const maxAvailableCount = computed(() => {
    if (selectedCategories.value.length === 0) return 0;

    let totalQuestions = 0;
    selectedCategories.value.forEach(catKey => {
      const category = props.categories.find(c => c.key === catKey);
      if (category) {
        totalQuestions += category.count;
      }
    });

    return Math.min(totalQuestions, 50);
  });

  // 验证自定义输入是否有效
  const isValidCustomCount = computed(() => {
    const count = parseInt(tempCustomCount.value);
    if (!count) return false;
    return count >= 5 && count <= maxAvailableCount.value;
  });

  /**
   * 切换分类选择
   */
  const toggleCategory = categoryKey => {
    const index = selectedCategories.value.indexOf(categoryKey);
    if (index > -1) {
      selectedCategories.value.splice(index, 1);
    } else {
      selectedCategories.value.push(categoryKey);
    }

    if (selectedCategories.value.length > 0 && availableCounts.value.length > 0) {
      questionCount.value = availableCounts.value[0];
    } else {
      questionCount.value = 5;
    }
  };

  /**
   * 选择预设数量
   */
  const selectPresetCount = count => {
    questionCount.value = count;
  };

  /**
   * 格式化输入（只允许数字）
   */
  const formatCountInput = value => {
    return value.replace(/[^\d]/g, '');
  };

  /**
   * 确认自定义数量
   */
  const confirmCustomCount = () => {
    const count = parseInt(tempCustomCount.value);

    if (!count || count < 5) {
      showToast('题目数量不能少于5题');
      return;
    }

    if (count > maxAvailableCount.value) {
      showToast(`题目数量不能超过${maxAvailableCount.value}题`);
      return;
    }

    questionCount.value = count;
    showToast({
      message: `已设置${count}题`,
      type: 'success',
    });
    showCustomInputDialog.value = false;
  };

  /**
   * 取消自定义数量
   */
  const cancelCustomCount = () => {
    tempCustomCount.value = '';
    showCustomInputDialog.value = false;
  };

  /**
   * 处理开始游戏
   */
  const handleStart = () => {
    if (selectedCategories.value.length === 0) {
      showToast('请至少选择一个分类');
      return;
    }

    let totalAvailable = 0;
    selectedCategories.value.forEach(catKey => {
      const category = props.categories.find(c => c.key === catKey);
      if (category) {
        totalAvailable += category.count;
      }
    });

    if (questionCount.value > totalAvailable) {
      showToast({
        message: `当前分类共有${totalAvailable}题，将循环重复使用以达到${questionCount.value}题`,
        duration: 2000,
      });
    }

    emit('start', {
      categories: selectedCategories.value,
      count: questionCount.value,
    });
  };
</script>

<style lang="less" scoped>
  .game-start-screen {
    text-align: center;
    padding: var(--spacing-lg);
    animation: fadeIn 0.5s ease-in;

    .start-icon {
      font-size: 4rem;
      margin-bottom: var(--spacing-lg);
      animation: bounceIn 0.6s ease-out;
    }

    .start-title {
      font-size: var(--font-size-2xl);
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-sm);
      font-weight: var(--font-weight-bold);
    }

    .start-desc {
      font-size: var(--font-size-base);
      color: var(--color-text-secondary);
      margin-bottom: var(--spacing-xl);
    }

    .section-title {
      font-size: var(--font-size-base);
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-md);
      font-weight: var(--font-weight-medium);
      text-align: left;
    }

    .category-section {
      margin-bottom: var(--spacing-xl);

      .category-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-md);

        .category-item {
          padding: var(--spacing-md);
          background: var(--color-bg-tertiary);
          border: 2px solid transparent;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-xs);

          &:hover {
            border-color: var(--color-primary);
            transform: translateY(-2px);
          }

          &.selected {
            border-color: var(--color-primary);
            background: rgba(24, 144, 255, 0.1);
          }

          .category-name {
            font-size: var(--font-size-base);
            color: var(--color-text-primary);
            font-weight: var(--font-weight-medium);
          }

          .category-count {
            font-size: var(--font-size-xs);
            color: var(--color-text-secondary);
          }
        }
      }
    }

    .count-section {
      margin-bottom: var(--spacing-xl);

      .count-options {
        display: flex;
        gap: var(--spacing-md);
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: var(--spacing-md);

        .count-item {
          padding: var(--spacing-sm) var(--spacing-lg);
          background: var(--color-bg-tertiary);
          border: 2px solid transparent;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
          font-size: var(--font-size-sm);
          color: var(--color-text-primary);
          min-width: 60px;

          &:hover {
            border-color: var(--color-primary);
          }

          &.selected {
            border-color: var(--color-primary);
            background: rgba(24, 144, 255, 0.1);
            color: var(--color-primary);
            font-weight: var(--font-weight-medium);
          }

          &.custom-count-item {
            border-style: dashed;
            color: var(--color-text-secondary);

            &:hover {
              border-color: var(--color-primary);
              color: var(--color-primary);
            }
          }
        }
      }
    }

    .popup-content {
      .popup-title {
        font-size: var(--font-size-lg);
        color: var(--color-text-primary);
        margin-bottom: var(--spacing-lg);
        text-align: center;
        font-weight: var(--font-weight-medium);
      }

      .popup-input {
        margin-bottom: var(--spacing-xl);
      }

      .popup-actions {
        display: flex;
        gap: var(--spacing-md);
      }
    }

    .start-btn {
      max-width: 200px;
      margin: 0 auto;
    }
  }
</style>
