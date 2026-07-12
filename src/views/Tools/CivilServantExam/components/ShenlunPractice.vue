<template>
  <div class="shenlun-practice">
    <div class="exam-header" v-if="!loadError && !isLoading">
      <div class="header-top">
        <div class="header-title">{{ t('tools.civilServantExam.shenlun.title') }}</div>
        <div class="header-timer">{{ formatTime(remainingTime) }}</div>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${progressPercent}%` }"></div>
      </div>
      <div class="progress-info">
        <span>{{ t('tools.civilServantExam.shenlun.currentQuestion', { current: currentIndex + 1, total: questions.length }) }}</span>
      </div>
    </div>

    <div v-if="isLoading" class="loading-container">
      <van-loading type="spinner" size="40px" />
      <p>{{ t('tools.civilServantExam.shenlun.loading') }}</p>
    </div>

    <div v-else-if="loadError" class="error-container">
      <van-icon name="warning-o" size="48" color="#999" />
      <p>{{ t('tools.civilServantExam.shenlun.loadError') }}</p>
      <van-button type="primary" @click="loadQuestions">{{ t('common.retry') }}</van-button>
    </div>

    <div class="question-container" v-else-if="currentQuestion">
      <div class="question-card">
        <div class="question-header">
          <span class="question-number">{{ t('tools.civilServantExam.shenlun.questionNumber', { number: currentIndex + 1 }) }}</span>
          <span class="question-type">{{ currentQuestion.type }}</span>
        </div>

        <div v-if="currentQuestion.materials && currentQuestion.materials.length > 0" class="materials-section">
          <div class="materials-header">
            <van-icon name="file-text" />
            <span>{{ t('tools.civilServantExam.shenlun.materials') }}</span>
          </div>
          <div class="materials-content">
            <div v-for="(material, idx) in currentQuestion.materials" :key="idx" class="material-item">
              <span class="material-label">资料{{ idx + 1 }}</span>
              <div class="material-text" v-html="material.content"></div>
            </div>
          </div>
        </div>

        <div class="question-content">
          <div class="question-text" v-html="currentQuestion.title"></div>
          <div v-if="currentQuestion.requirement" class="question-requirement">
            <van-icon name="info-o" class="requirement-icon" />
            <span>{{ currentQuestion.requirement }}</span>
          </div>
        </div>

        <div class="answer-section">
          <div class="answer-header">
            <span class="answer-label">{{ t('tools.civilServantExam.shenlun.yourAnswer') }}</span>
            <span class="word-count">{{ userAnswers[currentQuestion.id]?.length || 0 }}字</span>
          </div>
          <textarea
            v-model="currentAnswer"
            class="answer-textarea"
            :placeholder="t('tools.civilServantExam.shenlun.answerPlaceholder')"
            :maxlength="currentQuestion.maxLength || 2000"
            @input="handleAnswerInput"
          ></textarea>
        </div>

        <div v-if="showAnswer && currentQuestion.referenceAnswer" class="reference-section">
          <div class="reference-header">
            <span class="reference-label">{{ t('tools.civilServantExam.shenlun.referenceAnswer') }}</span>
          </div>
          <div class="reference-content" v-html="currentQuestion.referenceAnswer"></div>
        </div>

        <div v-if="showAnalysis && currentQuestion.analysis" class="analysis-section">
          <div class="analysis-header">
            <span class="analysis-label">{{ t('tools.civilServantExam.shenlun.analysis') }}</span>
          </div>
          <div class="analysis-content" v-html="currentQuestion.analysis"></div>
        </div>
      </div>
    </div>

    <div class="question-footer" v-if="!loadError && !isLoading">
      <van-button
        class="nav-btn prev"
        size="small"
        :disabled="currentIndex === 0"
        @click="prevQuestion"
      >
        {{ t('tools.civilServantExam.shenlun.prev') }}
      </van-button>
      <van-button
        v-if="!showAnswer"
        class="nav-btn answer"
        size="small"
        type="warning"
        @click="showAnswer = true"
      >
        {{ t('tools.civilServantExam.shenlun.viewAnswer') }}
      </van-button>
      <van-button
        v-if="showAnswer && !showAnalysis"
        class="nav-btn analysis"
        size="small"
        type="primary"
        @click="showAnalysis = true"
      >
        {{ t('tools.civilServantExam.shenlun.viewAnalysis') }}
      </van-button>
      <van-button
        class="nav-btn next"
        type="primary"
        size="small"
        :disabled="currentIndex === questions.length - 1"
        @click="nextQuestion"
      >
        {{ t('tools.civilServantExam.shenlun.next') }}
      </van-button>
    </div>

    <van-action-sheet
      v-model:show="showActionSheet"
      :actions="menuActions"
      :cancel-text="t('common.cancel')"
      close-on-click-action
      @select="onMenuSelect"
    />

    <van-popup v-model:show="showAnswerSheet" position="bottom" :style="{ height: '60%' }" round>
      <div class="answer-sheet-header">
        <div class="sheet-title">{{ t('tools.civilServantExam.shenlun.answerSheet') }}</div>
        <button class="close-btn" @click="showAnswerSheet = false">
          <van-icon name="cross" />
        </button>
      </div>
      <div class="answer-sheet-content">
        <div class="sheet-nav">
          <div
            v-for="(q, index) in questions"
            :key="q.id"
            class="nav-item"
            :class="{
              active: currentIndex === index,
              answered: userAnswers[q.id] && userAnswers[q.id].length > 0,
            }"
            @click="goToQuestion(index)"
          >
            {{ index + 1 }}
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Icon as VanIcon, Popup as VanPopup, Button as VanButton, ActionSheet as VanActionSheet, Loading as VanLoading, showLoadingToast, closeToast, showToast } from 'vant';
import { getCountryShenlunJsonUrl, getProvinceShenlunJsonUrl } from '../hooks/useCivilServantExam';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const questions = ref([]);
const currentIndex = ref(0);
const userAnswers = ref({});
const remainingTime = ref(5400);
const showAnswerSheet = ref(false);
const showActionSheet = ref(false);
const showAnswer = ref(false);
const showAnalysis = ref(false);
const isLoading = ref(true);
const loadError = ref(false);

let timer = null;

const currentQuestion = computed(() => questions.value[currentIndex.value] || null);

const currentAnswer = computed({
  get: () => {
    if (!currentQuestion.value || !currentQuestion.value.id) return '';
    return userAnswers.value[currentQuestion.value.id] || '';
  },
  set: (val) => {
    if (!currentQuestion.value || !currentQuestion.value.id) return;
    userAnswers.value[currentQuestion.value.id] = val;
  },
});

const progressPercent = computed(() => {
  if (questions.value.length === 0) return 0;
  const answeredCount = Object.keys(userAnswers.value).filter(key => 
    userAnswers.value[key] && userAnswers.value[key].length > 0
  ).length;
  return (answeredCount / questions.value.length) * 100;
});

const menuActions = computed(() => [
  { name: t('tools.civilServantExam.shenlun.answerSheet'), key: 'answerSheet' },
]);

const formatTime = (seconds) => {
  if (typeof seconds !== 'number' || seconds < 0) return '00:00';
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const getMockData = () => [
  {
    id: 1,
    type: '概括归纳题',
    title: '请根据给定资料，概括当前我国基层治理面临的主要问题。',
    requirement: '要求：全面准确，条理清晰，不超过200字。',
    maxLength: 200,
    materials: [
      {
        content: '近年来，随着我国城镇化进程的加快，基层治理面临诸多挑战。一方面，基层政府承担了大量事务性工作，人员编制却相对紧张，导致工作压力大、效率不高。另一方面，群众需求日益多元化，从基本的衣食住行到精神文化需求，都对基层治理提出了更高要求。此外，基层治理中还存在信息不对称、部门协作不畅等问题，影响了治理效果。'
      },
      {
        content: '在一些农村地区，空心化现象严重，大量青壮年外出务工，导致基层组织力量薄弱。同时，农村基础设施建设滞后，公共服务供给不足，难以满足农民群众的需求。在城市社区，物业管理纠纷、邻里矛盾等问题时有发生，给基层治理带来了不小的压力。'
      }
    ],
    referenceAnswer: '当前我国基层治理面临的主要问题有：一是基层政府事务繁重与人员编制紧张的矛盾，导致工作压力大、效率不高；二是群众需求多元化与治理能力不足的矛盾；三是基层治理存在信息不对称、部门协作不畅等问题；四是农村地区空心化严重，基层组织力量薄弱，基础设施和公共服务供给不足；五是城市社区物业管理纠纷、邻里矛盾等问题频发。',
    analysis: '本题考查考生的概括归纳能力。答题时需要从给定资料中提取关键信息，进行分类整理。注意要全面覆盖资料中提到的各个方面，同时要做到条理清晰，语言简洁。'
  },
  {
    id: 2,
    type: '综合分析题',
    title: '请分析"枫桥经验"对新时代基层治理的启示。',
    requirement: '要求：观点明确，分析透彻，逻辑清晰，不超过300字。',
    maxLength: 300,
    materials: [
      {
        content: '"枫桥经验"是指20世纪60年代初浙江省诸暨市枫桥镇干部群众创造的"发动和依靠群众，坚持矛盾不上交，就地解决"的基层治理经验。这一经验在实践中不断发展完善，成为新时代基层治理的重要法宝。'
      },
      {
        content: '新时代"枫桥经验"强调以人民为中心的发展思想，注重发挥群众的主体作用，通过民主协商、法治保障、科技支撑等多种方式，有效化解基层矛盾纠纷。同时，"枫桥经验"还注重基层党组织的引领作用，推动形成共建共治共享的社会治理格局。'
      }
    ],
    referenceAnswer: '"枫桥经验"对新时代基层治理的启示主要有：一是坚持以人民为中心，充分发挥群众在基层治理中的主体作用，尊重群众意愿，依靠群众力量解决问题；二是坚持矛盾就地解决，通过多元化解机制，将矛盾化解在基层；三是坚持党建引领，发挥基层党组织在基层治理中的核心作用；四是坚持法治保障，运用法治思维和法治方式化解矛盾；五是坚持科技支撑，利用现代信息技术提升基层治理效能。',
    analysis: '本题考查考生的综合分析能力。答题时需要深入理解"枫桥经验"的内涵，结合新时代基层治理的要求，分析其启示意义。注意要观点明确，分析透彻，逻辑清晰。'
  },
  {
    id: 3,
    type: '提出对策题',
    title: '针对资料中反映的农村基础设施建设滞后问题，请提出解决措施。',
    requirement: '要求：针对性强，切实可行，条理清晰，不超过300字。',
    maxLength: 300,
    materials: [
      {
        content: '目前，我国部分农村地区基础设施建设滞后，主要表现在道路、供水、供电、通信等方面。农村道路等级低、路况差，影响了农产品的运输和农民的出行；部分地区饮水安全问题突出，供水设施老化；农村电网改造滞后，供电可靠性不高；农村通信网络覆盖不足，影响了农民获取信息和参与电子商务。'
      }
    ],
    referenceAnswer: '解决农村基础设施建设滞后问题的措施有：一是加大财政投入，建立农村基础设施建设长效投入机制；二是整合各类资源，统筹推进农村道路、供水、供电、通信等基础设施建设；三是加强基础设施管护，建立健全管护机制，确保设施正常运行；四是引导社会资本参与，通过PPP等模式吸引社会资本投入农村基础设施建设；五是注重规划引领，科学编制农村基础设施建设规划，避免重复建设和资源浪费。',
    analysis: '本题考查考生解决实际问题的能力。答题时需要针对资料中反映的具体问题，提出切实可行的解决措施。注意措施要有针对性，能够解决实际问题，同时要条理清晰。'
  },
  {
    id: 4,
    type: '贯彻执行题',
    title: '假如你是某镇政府的工作人员，请根据给定资料，写一份关于加强农村精神文明建设的倡议书。',
    requirement: '要求：格式正确，内容完整，语言得体，不超过400字。',
    maxLength: 400,
    materials: [
      {
        content: '当前，我国农村精神文明建设取得了一定成效，但仍然存在一些问题。部分农村地区封建迷信活动时有发生，陈规陋习依然存在；农村文化设施不足，文化活动形式单一；农民群众的精神文化需求得不到充分满足。加强农村精神文明建设，对于提高农民群众的思想道德素质和科学文化素质，促进农村社会和谐发展具有重要意义。'
      }
    ],
    referenceAnswer: '关于加强农村精神文明建设的倡议书\n\n广大农民朋友们：\n\n当前，我镇农村精神文明建设面临一些挑战，封建迷信、陈规陋习等现象依然存在，文化生活有待丰富。为营造文明和谐的农村社会风尚，特发出如下倡议：\n\n一、树立文明新风。自觉抵制封建迷信和陈规陋习，倡导科学健康的生活方式。\n二、弘扬传统美德。传承和弘扬中华民族优秀传统文化，践行社会主义核心价值观。\n三、参与文化活动。积极参与镇村组织的各类文化活动，丰富精神文化生活。\n四、共建美好家园。爱护环境卫生，参与农村人居环境整治，共建美丽宜居乡村。\n\n让我们携手共进，为建设文明、和谐、美丽的新农村而努力！\n\nXX镇人民政府\nXXXX年XX月XX日',
    analysis: '本题考查考生的贯彻执行能力。答题时需要注意倡议书的格式要求，包括标题、称呼、正文、结尾、落款等部分。内容要针对资料中反映的问题，提出具体的倡议内容，语言要得体，符合倡议书的文体要求。'
  },
  {
    id: 5,
    type: '文章论述题',
    title: '请围绕"基层治理现代化"这一主题，写一篇文章。',
    requirement: '要求：自选角度，立意明确，内容充实，结构完整，语言流畅，字数在800-1000字之间。',
    maxLength: 1000,
    materials: [
      {
        content: '基层治理是国家治理的基石，基层治理现代化是国家治理体系和治理能力现代化的重要组成部分。近年来，我国不断推进基层治理创新，取得了显著成效。但也要看到，基层治理仍然面临诸多挑战，如治理能力不足、治理体系不完善、群众参与度不高等问题。推进基层治理现代化，需要坚持以人民为中心，加强党建引领，完善治理体系，提升治理能力，形成共建共治共享的社会治理格局。'
      }
    ],
    referenceAnswer: '推进基层治理现代化 筑牢国家治理基石\n\n基层治理是国家治理的"最后一公里"，是人民群众感受国家治理成效的"神经末梢"。推进基层治理现代化，对于实现国家治理体系和治理能力现代化具有重要意义。\n\n推进基层治理现代化，要坚持以人民为中心。基层治理的根本目的是为了满足人民群众的需求，增进人民群众的福祉。要始终把人民群众的利益放在首位，倾听群众呼声，回应群众关切，解决群众难题。\n\n推进基层治理现代化，要加强党建引领。基层党组织是基层治理的核心力量，要充分发挥基层党组织的战斗堡垒作用和党员的先锋模范作用，引领基层治理方向，凝聚基层治理合力。\n\n推进基层治理现代化，要完善治理体系。要建立健全党委领导、政府负责、社会协同、公众参与、法治保障的基层治理体系，明确各方面的职责分工，形成治理合力。\n\n推进基层治理现代化，要提升治理能力。要加强基层干部队伍建设，提高基层干部的治理能力和服务水平；要利用现代信息技术，提升基层治理的智能化水平；要加强法治建设，运用法治思维和法治方式解决基层治理中的问题。\n\n总之，推进基层治理现代化是一项长期而艰巨的任务，需要全社会的共同努力。只有不断推进基层治理现代化，才能筑牢国家治理的基石，为实现中华民族伟大复兴的中国梦提供坚实保障。',
    analysis: '本题考查考生的文章论述能力。答题时需要围绕"基层治理现代化"这一主题，自选角度，展开论述。注意文章要有明确的立意，内容要充实，结构要完整，语言要流畅。'
  }
];

const loadQuestions = async () => {
  isLoading.value = true;
  loadError.value = false;
  showLoadingToast({ message: t('tools.civilServantExam.shenlun.loading'), duration: 0 });

  try {
    let data = null;
    const fileName = route.query.fileName ? decodeURIComponent(route.query.fileName) : null;
    const examType = route.query.type || 'country';

    if (fileName) {
      try {
        const jsonFileName = fileName.replace(/\.pdf$/i, '.json');
        const isProvince = examType === 'province';
        const jsonUrl = isProvince 
          ? getProvinceShenlunJsonUrl(jsonFileName)
          : getCountryShenlunJsonUrl(jsonFileName);
        const response = await fetch(jsonUrl);
        if (response.ok) {
          data = await response.json();
        }
      } catch (e) {
        console.warn('Failed to fetch JSON data, falling back to mock data:', e);
      }
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
      data = getMockData();
    }

    questions.value = data;
    loadSavedAnswers();
    closeToast();
    isLoading.value = false;
  } catch (error) {
    closeToast();
    isLoading.value = false;
    loadError.value = true;
    showToast({ message: t('tools.civilServantExam.shenlun.loadError'), type: 'error' });
    console.error('加载试题失败:', error);
  }
};

const getStorageKey = () => {
  const fileName = route.query.fileName ? decodeURIComponent(route.query.fileName) : 'default-shenlun';
  return `shenlun_answers_${fileName}`;
};

const loadSavedAnswers = () => {
  try {
    const saved = localStorage.getItem(getStorageKey());
    if (saved) {
      userAnswers.value = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load saved answers:', e);
  }
};

const saveAnswers = () => {
  try {
    localStorage.setItem(getStorageKey(), JSON.stringify(userAnswers.value));
  } catch (e) {
    console.error('Failed to save answers:', e);
  }
};

const handleAnswerInput = () => {
  saveAnswers();
};

const prevQuestion = () => {
  if (currentIndex.value > 0 && questions.value.length > 0) {
    currentIndex.value--;
    showAnswer.value = false;
    showAnalysis.value = false;
  }
};

const nextQuestion = () => {
  if (currentIndex.value < questions.value.length - 1 && questions.value.length > 0) {
    currentIndex.value++;
    showAnswer.value = false;
    showAnalysis.value = false;
  }
};

const goToQuestion = (index) => {
  if (index < 0 || index >= questions.value.length) return;
  currentIndex.value = index;
  showAnswerSheet.value = false;
  showAnswer.value = false;
  showAnalysis.value = false;
};

const onMenuSelect = (action) => {
  if (action.key === 'answerSheet') {
    showAnswerSheet.value = true;
  }
};

onMounted(() => {
  loadQuestions();
  startTimer();
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
});

const startTimer = () => {
  timer = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--;
    } else {
      clearInterval(timer);
      timer = null;
    }
  }, 1000);
};
</script>

<style lang="less" scoped>
.shenlun-practice {
  min-height: 100vh;
  background: var(--color-bg-primary);
  padding-bottom: env(safe-area-inset-bottom);
}

.exam-header {
  background: var(--gradient-primary);
  padding: calc(env(safe-area-inset-top) + 12px) 16px 16px;
  color: #fff;

  .header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    .header-title {
      font-size: 16px;
      font-weight: 600;
    }

    .header-timer {
      font-size: 14px;
      font-weight: 600;
      background: rgba(255, 255, 255, 0.2);
      padding: 4px 12px;
      border-radius: 20px;
    }
  }

  .progress-bar {
    height: 6px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 8px;

    .progress-fill {
      height: 100%;
      background: #fff;
      border-radius: 3px;
      transition: width 0.3s ease;
    }
  }

  .progress-info {
    font-size: 12px;
    opacity: 0.9;
  }
}

.question-container {
  padding: 16px;
  padding-bottom: calc(env(safe-area-inset-bottom) + 100px);
}

.question-card {
  background: var(--color-bg-secondary);
  border-radius: 16px;
  padding: 16px;
  box-shadow: var(--shadow-card);

  .question-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .question-number {
      font-size: 14px;
      font-weight: 600;
      color: var(--color-primary);
    }

    .question-type {
      font-size: 12px;
      font-weight: 600;
      color: var(--color-warning);
      background: color-mix(in srgb, var(--color-warning) 10%, transparent);
      padding: 4px 10px;
      border-radius: 20px;
    }
  }

  .materials-section {
    margin-bottom: 16px;
    padding: 16px;
    background: color-mix(in srgb, var(--color-primary) 5%, transparent);
    border-radius: 12px;
    border-left: 4px solid var(--color-primary);

    .materials-header {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
      font-weight: 600;
      color: var(--color-primary);
      margin-bottom: 12px;
    }

    .materials-content {
      .material-item {
        margin-bottom: 12px;

        &:last-child {
          margin-bottom: 0;
        }

        .material-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--color-text-secondary);
          margin-bottom: 6px;
          display: block;
        }

        .material-text {
          font-size: 14px;
          color: var(--color-text-primary);
          line-height: 1.8;
          text-indent: 2em;
        }
      }
    }
  }

  .question-content {
    margin-bottom: 16px;

    .question-text {
      font-size: 16px;
      color: var(--color-text-primary);
      line-height: 1.8;
      margin-bottom: 10px;
    }

    .question-requirement {
      display: flex;
      align-items: flex-start;
      gap: 6px;
      font-size: 14px;
      color: var(--color-warning);
      background: color-mix(in srgb, var(--color-warning) 5%, transparent);
      padding: 10px 12px;
      border-radius: 8px;

      .requirement-icon {
        font-size: 16px;
        flex-shrink: 0;
      }
    }
  }

  .answer-section {
    margin-bottom: 16px;

    .answer-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      .answer-label {
        font-size: 14px;
        font-weight: 600;
        color: var(--color-text-primary);
      }

      .word-count {
        font-size: 13px;
        color: var(--color-text-secondary);
      }
    }

    .answer-textarea {
      width: 100%;
      min-height: 200px;
      padding: 12px;
      border: 2px solid var(--color-border);
      border-radius: 12px;
      font-size: 15px;
      color: var(--color-text-primary);
      line-height: 1.6;
      background: var(--color-bg-tertiary);
      resize: none;
      outline: none;
      box-sizing: border-box;
      font-family: inherit;

      &:focus {
        border-color: var(--color-primary);
      }

      &::placeholder {
        color: var(--color-text-tertiary);
      }
    }
  }

  .reference-section,
  .analysis-section {
    margin-bottom: 16px;
    padding: 16px;
    border-radius: 12px;

    .reference-header,
    .analysis-header {
      margin-bottom: 10px;

      .reference-label,
      .analysis-label {
        font-size: 14px;
        font-weight: 600;
      }
    }

    .reference-content,
    .analysis-content {
      font-size: 14px;
      line-height: 1.8;
      text-indent: 2em;
    }
  }

  .reference-section {
    background: color-mix(in srgb, var(--color-success) 5%, transparent);
    border-left: 4px solid var(--color-success);

    .reference-label {
      color: var(--color-success);
    }

    .reference-content {
      color: var(--color-text-primary);
    }
  }

  .analysis-section {
    background: color-mix(in srgb, var(--color-primary) 5%, transparent);
    border-left: 4px solid var(--color-primary);

    .analysis-label {
      color: var(--color-primary);
    }

    .analysis-content {
      color: var(--color-text-secondary);
    }
  }
}

.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: var(--color-text-tertiary);

  p {
    margin-top: 16px;
    font-size: 14px;
  }

  button {
    margin-top: 24px;
    min-width: 120px;
  }
}

.question-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  gap: 10px;
  padding: 12px 16px calc(env(safe-area-inset-bottom) + 12px);
  background: var(--color-bg-secondary);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  z-index: 100;

  .nav-btn {
    flex: 1;
    height: 44px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
  }
}

.answer-sheet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid var(--color-border);

  .sheet-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text-primary);
  }

  .close-btn {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: var(--color-bg-tertiary);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    color: var(--color-text-secondary);
    cursor: pointer;
  }
}

.answer-sheet-content {
  padding: 16px;
  height: calc(100% - 64px);
  overflow-y: auto;

  .sheet-nav {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(44px, 1fr));
    gap: 10px;

    .nav-item {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: var(--color-bg-secondary);
      border: 1px solid var(--color-border);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      font-weight: 500;
      color: var(--color-text-secondary);
      cursor: pointer;
      transition: all 0.2s;

      &.active {
        background: var(--color-primary);
        color: #fff;
        border-color: var(--color-primary);
      }

      &.answered {
        background: color-mix(in srgb, var(--color-primary) 20%, transparent);
        color: var(--color-primary);
        border-color: var(--color-primary);
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }
}
</style>