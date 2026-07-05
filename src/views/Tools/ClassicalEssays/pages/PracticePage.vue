<template>
  <div class="practice-page">
    <van-loading v-if="loading" class="loading-center" />

    <div v-else class="practice-content">
      <div v-if="!practiceStarted" class="start-screen">
        <h2 class="start-title">练习模式</h2>
        <p class="start-desc">选择练习类型，巩固所学文言文</p>

        <div class="practice-type-selector">
          <div
            v-for="(type, key) in practiceTypes"
            :key="key"
            class="type-card"
            :class="{ active: selectedType === key }"
            @click="selectedType = key"
          >
            <span class="type-icon">{{ type.icon }}</span>
            <span class="type-name">{{ type.name }}</span>
            <span class="type-desc">{{ type.desc }}</span>
          </div>
        </div>

        <div class="stage-selector">
          <span class="selector-label">选择阶段</span>
          <div class="stage-options">
            <div
              v-for="(stage, key) in stages"
              :key="key"
              class="stage-option"
              :class="{ active: selectedStage === key }"
              @click="selectedStage = key"
            >
              {{ stage.name }}
            </div>
          </div>
        </div>

        <van-button type="primary" size="large" block @click="startPractice">
          开始练习
        </van-button>
      </div>

      <div v-else class="quiz-screen">
        <div class="quiz-header">
          <div class="quiz-progress">
            <span class="progress-text">第 {{ currentIndex + 1 }} / {{ totalQuestions }} 题</span>
            <div class="progress-bar">
              <div 
                class="progress-fill"
                :style="{ width: progressPercent + '%' }"
              ></div>
            </div>
          </div>
          <div class="quiz-score">
            <span class="score-label">得分</span>
            <span class="score-value">{{ score }}</span>
          </div>
        </div>

        <div class="quiz-card" v-if="currentQuestion">
          <div class="question-type">
            <span v-if="currentQuestion.type === 'fillBlank'">填空题</span>
            <span v-else-if="currentQuestion.type === 'authorMatch'">作者匹配</span>
            <span v-else>名句匹配</span>
          </div>

          <div class="question-content">
            <p class="question-text">{{ currentQuestion.question }}</p>
            <div v-if="currentQuestion.source" class="question-source">
              —— {{ currentQuestion.author }}《{{ currentQuestion.source }}》
            </div>
          </div>

          <div class="answer-section">
            <template v-if="currentQuestion.type === 'fillBlank'">
              <van-field
                v-model="userAnswer"
                type="textarea"
                rows="3"
                placeholder="请输入答案..."
                autosize
              />
            </template>
            <template v-else>
              <div class="options-list">
                <div
                  v-for="(option, idx) in currentQuestion.options"
                  :key="idx"
                  class="option-item"
                  :class="{
                    selected: selectedOption === idx,
                    correct: showResult && idx === currentQuestion.correctIndex,
                    wrong: showResult && selectedOption === idx && idx !== currentQuestion.correctIndex,
                  }"
                  @click="!showResult && selectOption(idx)"
                >
                  <span class="option-letter">{{ String.fromCharCode(65 + idx) }}</span>
                  <span class="option-text">{{ option }}</span>
                  <van-icon
                    v-if="showResult && idx === currentQuestion.correctIndex"
                    name="success"
                    class="option-icon correct-icon"
                  />
                  <van-icon
                    v-if="showResult && selectedOption === idx && idx !== currentQuestion.correctIndex"
                    name="cross"
                    class="option-icon wrong-icon"
                  />
                </div>
              </div>
            </template>
          </div>

          <div v-if="showResult" class="result-section">
            <div class="result-text" :class="isCorrect ? 'correct' : 'wrong'">
              {{ isCorrect ? '回答正确！' : '回答错误' }}
            </div>
            <div class="correct-answer">
              <span class="answer-label">正确答案：</span>
              <span class="answer-text">{{ currentQuestion.correctAnswer }}</span>
            </div>
          </div>

          <div class="action-buttons">
            <van-button v-if="!showResult" type="primary" size="large" block @click="submitAnswer">
              提交答案
            </van-button>
            <van-button v-else type="primary" size="large" block @click="nextQuestion">
              {{ currentIndex >= totalQuestions - 1 ? '查看结果' : '下一题' }}
            </van-button>
          </div>
        </div>
      </div>

      <div v-if="practiceFinished" class="result-screen">
        <div class="result-header">
          <div class="result-icon">🎉</div>
          <h2 class="result-title">练习完成！</h2>
        </div>

        <div class="result-stats">
          <div class="stat-item">
            <span class="stat-value correct">{{ correctCount }}</span>
            <span class="stat-label">正确</span>
          </div>
          <div class="stat-item">
            <span class="stat-value wrong">{{ wrongCount }}</span>
            <span class="stat-label">错误</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ accuracy }}%</span>
            <span class="stat-label">正确率</span>
          </div>
        </div>

        <div class="result-actions">
          <van-button type="primary" size="large" block @click="restartPractice">
            再练一次
          </van-button>
          <van-button type="default" size="large" block @click="exitPractice">
            返回首页
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Button as VanButton, Field as VanField, Icon as VanIcon, Loading as VanLoading, showToast } from 'vant';
import { useClassicalEssays } from '../hooks/useClassicalEssays';

const router = useRouter();
const { allItems, loading, markMastered, recordPractice } = useClassicalEssays();

const practiceStarted = ref(false);
const practiceFinished = ref(false);
const selectedType = ref('choice');
const selectedStage = ref('primary');
const currentIndex = ref(0);
const score = ref(0);
const selectedOption = ref(-1);
const userAnswer = ref('');
const showResult = ref(false);
const correctCount = ref(0);
const wrongCount = ref(0);
const questions = ref([]);

const practiceTypes = {
  choice: {
    name: '选择题',
    icon: '📝',
    desc: '四选一，选出正确答案',
  },
  fillBlank: {
    name: '填空题',
    icon: '✍️',
    desc: '根据上下文补全句子',
  },
};

const stages = {
  primary: { name: '小学' },
  middle: { name: '初中' },
  high: { name: '高中' },
  civil: { name: '公务员' },
};

const totalQuestions = computed(() => questions.value.length);

const currentQuestion = computed(() => {
  if (questions.value.length === 0) return null;
  return questions.value[currentIndex.value];
});

const progressPercent = computed(() => {
  if (totalQuestions.value === 0) return 0;
  return Math.round(((currentIndex.value + 1) / totalQuestions.value) * 100);
});

const isCorrect = computed(() => {
  if (!currentQuestion.value) return false;
  if (currentQuestion.value.type === 'fillBlank') {
    return userAnswer.value.trim() === currentQuestion.value.correctAnswer.trim();
  } else {
    return selectedOption.value === currentQuestion.value.correctIndex;
  }
});

const accuracy = computed(() => {
  if (totalQuestions.value === 0) return 0;
  return Math.round((correctCount.value / totalQuestions.value) * 100);
});

const generateQuestions = () => {
  const stageItems = allItems.value.filter(item => item.stage === selectedStage.value);
  if (stageItems.length === 0) return [];

  const questionList = [];
  const shuffledItems = [...stageItems].sort(() => Math.random() - 0.5);
  const questionCount = Math.min(10, shuffledItems.length);

  for (let i = 0; i < questionCount; i++) {
    const item = shuffledItems[i];

    if (selectedType.value === 'choice') {
      const rand = Math.random();
      if (rand > 0.5 && item.keySentences && item.keySentences.length > 0) {
        const sentence = item.keySentences[Math.floor(Math.random() * item.keySentences.length)];
        const correctAnswer = item.title;
        const otherItems = stageItems.filter(s => s.id !== item.id);
        const wrongOptions = otherItems
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(s => s.title);

        const options = [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5);
        const correctIndex = options.indexOf(correctAnswer);

        questionList.push({
          type: 'sentenceMatch',
          question: `"${sentence}"这句出自哪篇文言文？`,
          options,
          correctIndex,
          correctAnswer,
          author: item.author,
          source: item.title,
          itemId: item.id,
        });
      } else {
        const correctAnswer = item.author;
        const otherItems = stageItems.filter(s => s.id !== item.id);
        const wrongOptions = otherItems
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(s => s.author);

        const options = [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5);
        const correctIndex = options.indexOf(correctAnswer);

        questionList.push({
          type: 'authorMatch',
          question: `《${item.title}》的作者是谁？`,
          options,
          correctIndex,
          correctAnswer,
          author: item.author,
          source: item.title,
          itemId: item.id,
        });
      }
    } else {
      const keySentences = item.keySentences || [];
      if (keySentences.length > 0) {
        const sentence = keySentences[Math.floor(Math.random() * keySentences.length)];
        const words = sentence.split(/[，。？！、]/);
        if (words.length >= 2) {
          const blankIndex = Math.floor(Math.random() * words.length);
          const blankWord = words[blankIndex];
          if (blankWord.length >= 1 && blankWord.length <= 4) {
            const question = words.map((w, i) => (i === blankIndex ? '______' : w)).join('，');
            questionList.push({
              type: 'fillBlank',
              question: `"${question}"`,
              correctAnswer: blankWord,
              author: item.author,
              source: item.title,
              itemId: item.id,
            });
          }
        }
      } else {
        const contentLines = item.content.split('\n').filter(line => line.trim());
        if (contentLines.length > 0) {
          const line = contentLines[Math.floor(Math.random() * contentLines.length)];
          const words = line.split(/[，。？！、]/);
          if (words.length >= 2) {
            const blankIndex = Math.floor(Math.random() * words.length);
            const blankWord = words[blankIndex];
            if (blankWord.length >= 1 && blankWord.length <= 4) {
              const question = words.map((w, i) => (i === blankIndex ? '______' : w)).join('，');
              questionList.push({
                type: 'fillBlank',
                question: `"${question}"`,
                correctAnswer: blankWord,
                author: item.author,
                source: item.title,
                itemId: item.id,
              });
            }
          }
        }
      }
    }
  }

  return questionList.slice(0, 10);
};

const startPractice = () => {
  questions.value = generateQuestions();
  if (questions.value.length === 0) {
    showToast('该阶段暂无练习题目');
    return;
  }
  practiceStarted.value = true;
  practiceFinished.value = false;
  currentIndex.value = 0;
  score.value = 0;
  correctCount.value = 0;
  wrongCount.value = 0;
  selectedOption.value = -1;
  userAnswer.value = '';
  showResult.value = false;
};

const selectOption = (index) => {
  selectedOption.value = index;
};

const submitAnswer = () => {
  if (selectedType.value === 'choice' && selectedOption.value === -1) {
    showToast('请选择一个答案');
    return;
  }
  if (selectedType.value === 'fillBlank' && !userAnswer.value.trim()) {
    showToast('请输入答案');
    return;
  }

  showResult.value = true;

  if (isCorrect.value) {
    correctCount.value++;
    score.value += 10;
    recordPractice(currentQuestion.value.itemId, true);
  } else {
    wrongCount.value++;
    recordPractice(currentQuestion.value.itemId, false);
  }
};

const nextQuestion = () => {
  if (currentIndex.value >= totalQuestions.value - 1) {
    practiceFinished.value = true;
    return;
  }

  currentIndex.value++;
  selectedOption.value = -1;
  userAnswer.value = '';
  showResult.value = false;
};

const restartPractice = () => {
  startPractice();
};

const exitPractice = () => {
  router.back();
};
</script>

<style lang="less" scoped>
.practice-page {
  min-height: 100vh;
  background: var(--color-bg-primary);
}

.loading-center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.practice-content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.start-screen {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-xl) var(--spacing-lg);
  overflow-y: auto;
}

.start-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  text-align: center;
  margin: 0 0 var(--spacing-xs);
}

.start-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-align: center;
  margin: 0 0 var(--spacing-xl);
}

.practice-type-selector {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
}

.type-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-lg) var(--spacing-sm);
  background: var(--color-bg-secondary);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);

  &.active {
    border-color: var(--color-primary);
    background: var(--van-blue-50);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }
}

.type-icon {
  font-size: 2rem;
}

.type-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.type-desc {
  font-size: 10px;
  color: var(--color-text-tertiary);
  text-align: center;
}

.stage-selector {
  margin-bottom: var(--spacing-xl);
}

.selector-label {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
}

.stage-options {
  display: flex;
  gap: var(--spacing-xs);
}

.stage-option {
  flex: 1;
  text-align: center;
  padding: var(--spacing-sm);
  background: var(--color-bg-secondary);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-base);

  &.active {
    border-color: var(--color-primary);
    background: var(--van-blue-50);
    color: var(--color-primary);
    font-weight: var(--font-weight-semibold);
  }
}

.quiz-screen {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.quiz-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-bg-secondary);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.quiz-progress {
  flex: 1;
  margin-right: var(--spacing-lg);
}

.progress-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xs);
}

.progress-bar {
  height: 6px;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color-primary);
  border-radius: var(--radius-full);
  transition: width 0.3s ease;
}

.quiz-score {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.score-label {
  font-size: 10px;
  color: var(--color-text-tertiary);
}

.score-value {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
}

.quiz-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-lg);
  overflow-y: auto;
}

.question-type {
  display: inline-block;
  font-size: var(--font-size-xs);
  color: var(--color-primary);
  background: var(--van-blue-50);
  padding: 2px var(--spacing-sm);
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-md);
  align-self: flex-start;
}

.question-content {
  background: linear-gradient(135deg, var(--van-orange-50), var(--van-amber-50));
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.question-text {
  font-size: var(--font-size-base);
  line-height: 1.8;
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-sm);
}

.question-source {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  text-align: right;
}

.answer-section {
  margin-bottom: var(--spacing-lg);
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.option-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);

  &:hover {
    border-color: var(--color-primary);
  }

  &.selected {
    border-color: var(--color-primary);
    background: var(--van-blue-50);
  }

  &.correct {
    border-color: var(--color-success);
    background: var(--van-green-50);
  }

  &.wrong {
    border-color: var(--van-red-500);
    background: var(--van-red-50);
  }
}

.option-letter {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-tertiary);
  border-radius: 50%;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  flex-shrink: 0;

  .selected & {
    background: var(--color-primary);
    color: white;
  }

  .correct & {
    background: var(--color-success);
    color: white;
  }

  .wrong & {
    background: var(--van-red-500);
    color: white;
  }
}

.option-text {
  flex: 1;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.option-icon {
  flex-shrink: 0;
  font-size: var(--font-size-lg);

  &.correct-icon {
    color: var(--color-success);
  }

  &.wrong-icon {
    color: var(--van-red-500);
  }
}

.result-section {
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-md);
}

.result-text {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  text-align: center;
  margin-bottom: var(--spacing-sm);

  &.correct {
    color: var(--color-success);
  }

  &.wrong {
    color: var(--van-red-500);
  }
}

.correct-answer {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-align: center;
}

.answer-label {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.action-buttons {
  margin-top: auto;
  padding-top: var(--spacing-md);
}

.result-screen {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--spacing-xl);
}

.result-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.result-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-md);
}

.result-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
}

.result-stats {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.result-stats .stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.stat-value {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);

  &.correct {
    color: var(--color-success);
  }

  &.wrong {
    color: var(--van-red-500);
  }
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
}

.result-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>