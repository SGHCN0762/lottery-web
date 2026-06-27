<template>
  <div class="question-card">
    <!-- 题目头部：收藏按钮和难度标签 -->
    <div class="question-header">
      <div class="question-meta">
        <van-tag :color="difficultyColor" size="medium">
          {{ difficultyText }}
        </van-tag>
        <van-tag v-for="tag in question.tags" :key="tag" plain size="small" class="tag-item">
          {{ tag }}
        </van-tag>
      </div>
      <van-icon
        :name="isCollected ? 'star' : 'star-o'"
        :color="isCollected ? '#ff9500' : '#999'"
        size="24"
        class="collect-icon"
        @click="handleCollectClick"
      />
    </div>

    <!-- 题目内容 -->
    <div class="question-content">
      <!-- 题目图片 -->
      <div v-if="question.image" class="question-image">
        <van-image
          :src="question.image"
          fit="contain"
          class="image-preview"
          @click="handleImagePreview"
        />
      </div>

      <!-- 题目表格 -->
      <div v-if="question.table" class="question-table">
        <table class="data-table">
          <thead v-if="question.table.headers">
            <tr>
              <th v-for="(header, idx) in question.table.headers" :key="idx">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIdx) in question.table.rows" :key="rowIdx">
              <td v-for="(cell, cellIdx) in row" :key="cellIdx">
                {{ cell }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 题目标题 -->
      <div class="question-title">
        {{ question.title }}
      </div>
    </div>

    <!-- 选项区域 -->
    <div class="options-section">
      <!-- 单选题 -->
      <van-radio-group
        v-if="isSingleChoice"
        v-model="selectedAnswer"
        :disabled="hasAnswered"
        class="options-group"
      >
        <van-radio
          v-for="(option, idx) in question.options"
          :key="idx"
          :name="idx"
          :class="getOptionClass(idx)"
          class="option-item"
          @click="handleOptionClick(idx)"
        >
          <div class="option-content">
            <span class="option-label">{{ getOptionLabel(idx) }}</span>
            <span class="option-text">{{ option }}</span>
          </div>
        </van-radio>
      </van-radio-group>

      <!-- 多选题 -->
      <van-checkbox-group
        v-if="isMultipleChoice"
        v-model="selectedAnswers"
        :disabled="hasAnswered"
        class="options-group"
      >
        <van-checkbox
          v-for="(option, idx) in question.options"
          :key="idx"
          :name="idx"
          :class="getOptionClass(idx)"
          class="option-item"
          shape="square"
          @click="handleOptionClick(idx)"
        >
          <div class="option-content">
            <span class="option-label">{{ getOptionLabel(idx) }}</span>
            <span class="option-text">{{ option }}</span>
          </div>
        </van-checkbox>
      </van-checkbox-group>

      <!-- 正确答案提示 -->
      <div v-if="hasAnswered && !isCorrect" class="correct-answer-tip">
        <van-icon name="info-o" />
        <span>{{ t('tools.examPrep.questionCard.correctAnswer') }}: {{ getCorrectAnswerText() }}</span>
      </div>
    </div>

    <!-- 结果反馈 -->
    <div v-if="hasAnswered" class="result-feedback" :class="isCorrect ? 'correct' : 'wrong'">
      <div class="result-icon">
        <van-icon :name="isCorrect ? 'success' : 'cross'" />
      </div>
      <div class="result-text">
        {{ isCorrect ? t('tools.examPrep.questionCard.answerCorrect') : t('tools.examPrep.questionCard.answerWrong') }}
      </div>
    </div>

    <!-- 解析区域（可折叠） -->
    <div v-if="hasAnswered && props.showAnalysis" class="analysis-section">
      <div class="analysis-header" @click="toggleAnalysis">
        <span class="analysis-title">{{ t('tools.examPrep.questionCard.analysis') }}</span>
        <van-icon :name="showAnalysisInternal ? 'arrow-up' : 'arrow-down'" />
      </div>
      <div class="analysis-wrapper">
        <transition name="collapse">
          <div v-show="showAnalysisInternal" class="analysis-content">
            {{ question.analysis }}
          </div>
        </transition>
      </div>
    </div>

    <!-- 底部操作按钮 -->
    <div class="action-buttons">
      <van-button
        plain
        @click="handleNoteClick"
      >
        {{ t('tools.examPrep.questionCard.note') }}
      </van-button>
      <van-button
        v-if="!hasAnswered"
        type="primary"
        :disabled="!hasSelectedAnswer"
        @click="handleSubmit"
      >
        {{ t('tools.examPrep.questionCard.submit') }}
      </van-button>
    </div>

    <!-- 笔记弹窗 -->
    <van-popup
      v-model:show="showNotePopup"
      position="bottom"
      :style="{ height: '60%' }"
      round
    >
      <div class="note-popup">
        <div class="note-header">
          <span>{{ t('tools.examPrep.questionCard.myNote') }}</span>
          <van-icon name="cross" @click="showNotePopup = false" />
        </div>
        <van-field
          v-model="noteContent"
          rows="6"
          autosize
          type="textarea"
          :placeholder="t('tools.examPrep.questionCard.notePlaceholder')"
          show-word-limit
          maxlength="500"
        />
        <div class="note-actions">
          <van-button size="small" @click="showNotePopup = false">
            {{ t('tools.examPrep.questionCard.cancel') }}
          </van-button>
          <van-button type="primary" size="small" @click="handleSaveNote">
            {{ t('tools.examPrep.questionCard.save') }}
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { showToast, showImagePreview } from 'vant';
import {
  Radio as VanRadio,
  RadioGroup as VanRadioGroup,
  Checkbox as VanCheckbox,
  CheckboxGroup as VanCheckboxGroup,
  Tag as VanTag,
  Icon as VanIcon,
  Image as VanImage,
  Button as VanButton,
  Popup as VanPopup,
  Field as VanField,
} from 'vant';
import { isAnswerCorrect, playSound, triggerVibration } from '../utils/helpers';
import { useDatabase } from '../hooks/useDatabase';

// 难度等级配置
const difficultyLevels = [
  { id: 'easy', name: '简单', color: '#07c160' },
  { id: 'medium', name: '中等', color: '#ff976a' },
  { id: 'hard', name: '困难', color: '#ee0a24' },
];

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  showAnalysis: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['answered', 'collect-change', 'note-save']);

const { t } = useI18n();
const db = useDatabase();

// 答题状态
const selectedAnswer = ref(null);
const selectedAnswers = ref([]);
const hasAnswered = ref(false);
const isCorrect = ref(false);
const showAnalysisInternal = ref(props.showAnalysis);

// 收藏状态
const isCollected = ref(false);

// 笔记状态
const showNotePopup = ref(false);
const noteContent = ref('');

// 判断题目类型：单选或多选
const isSingleChoice = computed(() => {
  return !Array.isArray(props.question.correctAnswer);
});

const isMultipleChoice = computed(() => {
  return Array.isArray(props.question.correctAnswer);
});

// 是否已选择答案
const hasSelectedAnswer = computed(() => {
  if (isSingleChoice.value) {
    return selectedAnswer.value !== null;
  } else {
    return selectedAnswers.value.length > 0;
  }
});

// 难度显示
const difficultyText = computed(() => {
  const level = difficultyLevels.find(l => l.id === props.question.difficulty);
  return level ? level.name : props.question.difficulty;
});

const difficultyColor = computed(() => {
  const level = difficultyLevels.find(l => l.id === props.question.difficulty);
  return level ? level.color : '#999';
});

// 获取选项标签（A、B、C、D...）
const getOptionLabel = (index) => {
  const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  return labels[index] || `选项${index + 1}`;
};

// 获取选项样式类
const getOptionClass = (index) => {
  if (!hasAnswered.value) return '';

  const correctAnswer = props.question.correctAnswer;
  const isCorrectOption = isSingleChoice.value
    ? index === correctAnswer
    : correctAnswer.includes(index);

  const isSelectedOption = isSingleChoice.value
    ? index === selectedAnswer.value
    : selectedAnswers.value.includes(index);

  if (isCorrectOption) {
    return 'correct-option';
  }
  if (isSelectedOption && !isCorrectOption) {
    return 'wrong-option';
  }
  return '';
};

// 获取正确答案文本
const getCorrectAnswerText = () => {
  const correctAnswer = props.question.correctAnswer;
  if (isSingleChoice.value) {
    return getOptionLabel(correctAnswer);
  } else {
    return correctAnswer.map(idx => getOptionLabel(idx)).join(', ');
  }
};

// 处理选项点击
const handleOptionClick = (index) => {
  if (hasAnswered.value) return;

  // 触发振动反馈
  triggerVibration(10);
};

// 提交答案
const handleSubmit = async () => {
  if (!hasSelectedAnswer.value || hasAnswered.value) return;

  const userAnswer = isSingleChoice.value ? selectedAnswer.value : selectedAnswers.value;
  const correct = isAnswerCorrect(userAnswer, props.question.correctAnswer);

  hasAnswered.value = true;
  isCorrect.value = correct;

  // 播放声音和振动反馈
  if (correct) {
    playSound('correct');
    triggerVibration(50);
  } else {
    playSound('wrong');
    triggerVibration(100);
  }

  // 记录答题结果
  try {
    await db.addRecord({
      questionId: props.question.id,
      category: props.question.category,
      userAnswer,
      isCorrect: correct,
      timeSpent: 0, // 可以扩展计时功能
    });
  } catch (error) {
    console.error('记录答题结果失败:', error);
  }

  // 触发事件
  emit('answered', {
    questionId: props.question.id,
    isCorrect: correct,
    userAnswer,
  });
};

// 切换解析显示
const toggleAnalysis = () => {
  showAnalysisInternal.value = !showAnalysisInternal.value;
};

// 处理收藏点击
const handleCollectClick = async () => {
  try {
    if (isCollected.value) {
      await db.removeCollection(props.question.id);
      isCollected.value = false;
      showToast(t('tools.examPrep.questionCard.uncollected'));
    } else {
      await db.addCollection(props.question.id);
      isCollected.value = true;
      showToast(t('tools.examPrep.questionCard.collected'));
    }
    emit('collect-change', {
      questionId: props.question.id,
      isCollected: isCollected.value,
    });
  } catch (error) {
    console.error('收藏操作失败:', error);
    showToast(t('tools.examPrep.questionCard.collectError'));
  }
};

// 处理笔记点击
const handleNoteClick = async () => {
  // 加载已有笔记
  try {
    const notes = await db.getNotesByQuestionId(props.question.id);
    if (notes.length > 0) {
      noteContent.value = notes[0].content || '';
    } else {
      noteContent.value = '';
    }
  } catch (error) {
    console.error('加载笔记失败:', error);
    noteContent.value = '';
  }
  showNotePopup.value = true;
};

// 保存笔记
const handleSaveNote = async () => {
  try {
    const existingNotes = await db.getNotesByQuestionId(props.question.id);
    
    if (existingNotes.length > 0) {
      await db.updateNote(existingNotes[0].id, { content: noteContent.value });
    } else {
      await db.addNote({
        questionId: props.question.id,
        type: 'text',
        content: noteContent.value,
      });
    }

    showToast(t('tools.examPrep.questionCard.noteSaved'));
    showNotePopup.value = false;
    emit('note-save', {
      questionId: props.question.id,
      content: noteContent.value,
    });
  } catch (error) {
    console.error('保存笔记失败:', error);
    showToast(t('tools.examPrep.questionCard.noteError'));
  }
};

// 图片预览
const handleImagePreview = () => {
  if (props.question.image) {
    showImagePreview([props.question.image]);
  }
};

// 初始化加载收藏状态
const loadCollectStatus = async () => {
  try {
    const collected = await db.isCollected(props.question.id);
    isCollected.value = collected;
  } catch (error) {
    console.error('加载收藏状态失败:', error);
    isCollected.value = false;
  }
};

// 监听题目变化，重置状态
watch(() => props.question.id, () => {
  selectedAnswer.value = null;
  selectedAnswers.value = [];
  hasAnswered.value = false;
  isCorrect.value = false;
  showAnalysisInternal.value = props.showAnalysis;
  loadCollectStatus();
});

// 组件挂载时初始化
onMounted(() => {
  loadCollectStatus();
});
</script>

<style lang="less" scoped>
.question-card {
  background: var(--color-bg-secondary);
  border-radius: 16px;
  padding: var(--spacing-md);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

  .question-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;

    .question-meta {
      display: flex;
      align-items: center;
      gap: 8px;

      :deep(.van-tag) {
        border: none;
        font-weight: 500;
      }

      .tag-item {
        background: var(--color-bg-tertiary) !important;
        color: var(--color-text-secondary) !important;
        border: none !important;
      }
    }

    .collect-icon {
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);

      &:active {
        transform: scale(0.85);
      }
    }
  }

  .question-content {
    margin-bottom: 18px;

    .question-image {
      margin-bottom: 14px;

      .image-preview {
        max-width: 100%;
        border-radius: 12px;
        cursor: pointer;
      }
    }

    .question-table {
      margin-bottom: 14px;
      overflow-x: auto;

      .data-table {
        width: 100%;
        border-collapse: collapse;
        background: var(--color-bg-tertiary);
        border-radius: 10px;
        overflow: hidden;

        th, td {
          padding: 10px 12px;
          border-bottom: 1px solid var(--color-border);
          text-align: left;
          font-size: 14px;
        }

        th {
          background: var(--color-bg-tertiary);
          font-weight: 600;
          color: var(--color-text-primary);
        }

        td {
          color: var(--color-text-secondary);
        }

        tr:last-child td {
          border-bottom: none;
        }
      }
    }

    .question-title {
      font-size: 16px;
      line-height: 1.75;
      color: var(--color-text-primary);
      font-weight: 500;
      white-space: pre-wrap;
    }
  }

  .options-section {
    .options-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .option-item {
      padding: 14px 16px;
      background: var(--color-bg-tertiary);
      border-radius: 12px;
      border: 1.5px solid transparent;
      transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      cursor: pointer;

      &:active {
        transform: scale(0.98);
      }

      &.correct-option {
        border-color: #00b578;
        background: #e8f7f0;

        :deep(.van-radio__icon) {
          color: #00b578;
        }

        :deep(.van-checkbox__icon) {
          color: #00b578;
        }

        .option-content .option-label {
          color: #00b578;
        }
      }

      &.wrong-option {
        border-color: #ff4d4f;
        background: #fff1f0;

        :deep(.van-radio__icon) {
          color: #ff4d4f;
        }

        :deep(.van-checkbox__icon) {
          color: #ff4d4f;
        }

        .option-content .option-label {
          color: #ff4d4f;
        }
      }

      :deep(.van-radio__icon),
      :deep(.van-checkbox__icon) {
        font-size: 18px;
      }

      :deep(.van-radio__label),
      :deep(.van-checkbox__label) {
        width: 100%;
        margin-left: 12px;
      }
    }

    .option-content {
      display: flex;
      align-items: flex-start;
      gap: 0;

      .option-label {
        font-weight: 600;
        color: #4D7CFF;
        min-width: 22px;
        font-size: 15px;
      }

      .option-text {
        font-size: 15px;
        line-height: 1.6;
        color: var(--color-text-primary);
        white-space: pre-wrap;
      }
    }

    .correct-answer-tip {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 10px 14px;
      background: #e8f7f0;
      border-radius: 10px;
      margin-top: 12px;
      color: #00b578;
      font-size: 14px;
      font-weight: 500;
    }
  }

  .result-feedback {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px;
    border-radius: 12px;
    margin-top: 16px;
    animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

    &.correct {
      background: linear-gradient(135deg, #e8f7f0 0%, #d4f1e0 100%);
      color: #00b578;
    }

    &.wrong {
      background: linear-gradient(135deg, #fff1f0 0%, #ffdedb 100%);
      color: #ff4d4f;
    }

    .result-icon {
      font-size: 22px;
    }

    .result-text {
      font-size: 15px;
      font-weight: 600;
    }
  }

  .analysis-section {
    margin-top: 16px;
    border-radius: 12px;
    background: var(--color-bg-tertiary);
    overflow: hidden;

    .analysis-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 16px;
      cursor: pointer;
      user-select: none;
      transition: background 0.2s;

      &:active {
        background: var(--color-bg-tertiary);
      }

      .analysis-title {
        font-size: 14px;
        font-weight: 600;
        color: var(--color-text-primary);
      }
    }

    .analysis-wrapper {
      overflow: hidden;
    }

    .analysis-content {
      padding: 0 16px 16px;
      font-size: 14px;
      line-height: 1.8;
      color: var(--color-text-secondary);
      white-space: pre-wrap;
    }

    .collapse-enter-active,
    .collapse-leave-active {
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      overflow: hidden;
    }

    .collapse-enter-from,
    .collapse-leave-to {
      opacity: 0;
      max-height: 0;
    }

    .collapse-enter-to,
    .collapse-leave-from {
      opacity: 1;
      max-height: 1000px;
    }
  }

  .action-buttons {
    display: flex;
    gap: 10px;
    margin-top: 16px;

    :deep(.van-button) {
      flex: 1;
      border-radius: 10px;
      font-weight: 500;
    }
  }

  .note-popup {
    padding: 16px;
    height: 100%;
    display: flex;
    flex-direction: column;

    .note-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--color-border);
      font-size: 16px;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    :deep(.van-field) {
      flex: 1;
      margin: 16px 0;
    }

    .note-actions {
      display: flex;
      gap: 10px;
      padding-top: 16px;

      :deep(.van-button) {
        flex: 1;
        border-radius: 10px;
      }
    }
  }
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media screen and (max-width: 375px) {
  .question-card {
    padding: 14px 12px;
    margin: 0 12px 12px;

    .question-title {
      font-size: 15px;
    }

    .option-item {
      padding: 12px;
    }
  }
}
</style>