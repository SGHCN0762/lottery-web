/**
 * 路由配置
 *
 * 定义应用的所有路由规则，包括：
 * - 路径映射
 * - 组件懒加载
 * - 路由元信息（标题、是否缓存、是否显示返回按钮）
 */

import { createRouter, createWebHashHistory } from 'vue-router';
import i18n from '@/i18n';

// ========================================
// 路由配置数组
// ========================================
const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    // 性能优化：使用webpackChunkName指定chunk名称，便于预加载
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home/index.vue'),
    meta: {
      layout: 'AppLayout',
      keepAlive: true,
      title: 'navigation.home',
      showBack: false,
      showTabbar: true,
    },
  },
  {
    path: '/games',
    name: 'Games',
    component: () => import(/* webpackChunkName: "games" */ '@/views/Games/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'navigation.games',
      showBack: false,
      showTabbar: true,
    },
  },
  {
    path: '/tools',
    name: 'Tools',
    component: () => import(/* webpackChunkName: "tools" */ '@/views/Tools/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'navigation.tools',
      showBack: false,
      showTabbar: true,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ '@/views/Profile/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'navigation.profile',
      showBack: false,
      showTabbar: true,
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'navigation.about',
      showBack: true,
      showTabbar: false,
    },
  },
  // ========================================
  // 工具详情页面路由
  // ========================================
  {
    path: '/tools/resume-editor',
    name: 'ResumeEditor',
    component: () =>
      import(/* webpackChunkName: "tool-resume-editor" */ '@/views/Tools/ResumeEditor/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.resumeEditor.name',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/image-compressor',
    name: 'ImageCompressor',
    component: () =>
      import(/* webpackChunkName: "tool-image-compressor" */ '@/views/Tools/ImageCompressor/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.imageCompressor.name',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/qr-code',
    name: 'QrCodeGenerator',
    component: () =>
      import(/* webpackChunkName: "tool-qr-code" */ '@/views/Tools/QrCodeGenerator/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.qrCode.name',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/image-watermark',
    name: 'ImageWatermark',
    component: () =>
      import(/* webpackChunkName: "tool-image-watermark" */ '@/views/Tools/ImageWatermark/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.imageWatermark.name',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/json-formatter',
    name: 'JsonFormatter',
    component: () =>
      import(/* webpackChunkName: "tool-json-formatter" */ '@/views/Tools/JsonFormatter/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.jsonFormatter.name',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/logo-designer',
    name: 'LogoDesigner',
    component: () =>
      import(/* webpackChunkName: "tool-logo-designer" */ '@/views/Tools/LogoDesigner/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.logoDesigner.name',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/dj-mixer',
    name: 'DJMixer',
    component: () =>
      import(/* webpackChunkName: "tool-dj-mixer" */ '@/views/Tools/DJMixer/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.djMixer.name',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/file-converter',
    name: 'FileConverter',
    component: () =>
      import(/* webpackChunkName: "tool-file-converter" */ '@/views/Tools/FileConverter/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.fileConverter.name',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/civil-servant-exam',
    name: 'CivilServantExam',
    component: () =>
      import(/* webpackChunkName: "tool-civil-servant-exam" */ '@/views/Tools/CivilServantExam/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.civilServantExam.name',
      showBack: true,
      showTabbar: false,
      keepAlive: true,
    },
  },
  {
    path: '/tools/civil-servant-exam/practice',
    name: 'CivilServantExamPractice',
    component: () =>
      import(/* webpackChunkName: "tool-civil-servant-exam-practice" */ '@/views/Tools/CivilServantExam/components/ExamPractice.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.civilServantExam.practice.title',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/exam-prep',
    name: 'ExamPrep',
    component: () =>
      import(/* webpackChunkName: "tool-exam-prep" */ '@/views/Tools/ExamPrep/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.examPrep.name',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/exam-prep/practice',
    name: 'ExamPrepPractice',
    component: () =>
      import(/* webpackChunkName: "tool-exam-prep-practice" */ '@/views/Tools/ExamPrep/pages/PracticePage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.examPrep.practice.title',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/exam-prep/wrong-questions',
    name: 'ExamPrepWrongQuestions',
    component: () =>
      import(/* webpackChunkName: "tool-exam-prep-wrong" */ '@/views/Tools/ExamPrep/pages/WrongQuestionsPage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.examPrep.wrongQuestions.title',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/exam-prep/collections',
    name: 'ExamPrepCollections',
    component: () =>
      import(/* webpackChunkName: "tool-exam-prep-collections" */ '@/views/Tools/ExamPrep/pages/CollectionPage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.examPrep.collections.title',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/exam-prep/statistics',
    name: 'ExamPrepStatistics',
    component: () =>
      import(/* webpackChunkName: "tool-exam-prep-statistics" */ '@/views/Tools/ExamPrep/pages/StatisticsPage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.examPrep.statistics.title',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/exam-prep/exam',
    name: 'ExamPrepExam',
    component: () =>
      import(/* webpackChunkName: "tool-exam-prep-exam" */ '@/views/Tools/ExamPrep/pages/ExamPage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.examPrep.exam.title',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/exam-prep/exam/result/:recordId',
    name: 'ExamPrepExamResult',
    component: () =>
      import(/* webpackChunkName: "tool-exam-prep-exam-result" */ '@/views/Tools/ExamPrep/pages/ExamResultPage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.examPrep.result.title',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/exam-prep/settings',
    name: 'ExamPrepSettings',
    component: () =>
      import(/* webpackChunkName: "tool-exam-prep-settings" */ '@/views/Tools/ExamPrep/pages/SettingsPage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.examPrep.settings.title',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/exam-prep/backup',
    name: 'ExamPrepBackup',
    component: () =>
      import(/* webpackChunkName: "tool-exam-prep-backup" */ '@/views/Tools/ExamPrep/pages/BackupPage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.examPrep.backup.title',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/exam-prep/about',
    name: 'ExamPrepAbout',
    component: () =>
      import(/* webpackChunkName: "tool-exam-prep-about" */ '@/views/Tools/ExamPrep/pages/AboutPage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.examPrep.about.title',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/exam-prep/knowledge',
    name: 'ExamPrepKnowledge',
    component: () =>
      import(/* webpackChunkName: "tool-exam-prep-knowledge" */ '@/views/Tools/ExamPrep/pages/KnowledgePage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.examPrep.knowledge.title',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/knowledge-flash',
    name: 'KnowledgeFlash',
    component: () =>
      import(/* webpackChunkName: "tool-knowledge-flash" */ '@/views/Tools/KnowledgeFlash/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.knowledgeFlash.name',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/idiom-learning',
    name: 'IdiomLearning',
    component: () =>
      import(/* webpackChunkName: "tool-idiom-learning" */ '@/views/Tools/IdiomLearning/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.idiomLearning.name',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/idiom-learning/learn',
    name: 'IdiomLearningLearn',
    component: () =>
      import(/* webpackChunkName: "tool-idiom-learning-learn" */ '@/views/Tools/IdiomLearning/pages/LearnPage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.idiomLearning.learnTitle',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/idiom-learning/practice',
    name: 'IdiomLearningPractice',
    component: () =>
      import(/* webpackChunkName: "tool-idiom-learning-practice" */ '@/views/Tools/IdiomLearning/pages/PracticePage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.idiomLearning.practiceTitle',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/famous-quotes',
    name: 'FamousQuotes',
    component: () =>
      import(/* webpackChunkName: "tool-famous-quotes" */ '@/views/Tools/FamousQuotes/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.famousQuotes.name',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/famous-quotes/learn',
    name: 'FamousQuotesLearn',
    component: () =>
      import(/* webpackChunkName: "tool-famous-quotes-learn" */ '@/views/Tools/FamousQuotes/pages/LearnPage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.famousQuotes.learnTitle',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/famous-quotes/practice',
    name: 'FamousQuotesPractice',
    component: () =>
      import(/* webpackChunkName: "tool-famous-quotes-practice" */ '@/views/Tools/FamousQuotes/pages/PracticePage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.famousQuotes.practiceTitle',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/classical-poems',
    name: 'ClassicalPoems',
    component: () =>
      import(/* webpackChunkName: "tool-classical-poems" */ '@/views/Tools/ClassicalPoems/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.classicalPoems.name',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/classical-poems/learn',
    name: 'ClassicalPoemsLearn',
    component: () =>
      import(/* webpackChunkName: "tool-classical-poems-learn" */ '@/views/Tools/ClassicalPoems/pages/LearnPage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.classicalPoems.learnTitle',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/classical-poems/practice',
    name: 'ClassicalPoemsPractice',
    component: () =>
      import(/* webpackChunkName: "tool-classical-poems-practice" */ '@/views/Tools/ClassicalPoems/pages/PracticePage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.classicalPoems.practiceTitle',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/classical-essays',
    name: 'ClassicalEssays',
    component: () =>
      import(/* webpackChunkName: "tool-classical-essays" */ '@/views/Tools/ClassicalEssays/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.classicalEssays.name',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/classical-essays/learn',
    name: 'ClassicalEssaysLearn',
    component: () =>
      import(/* webpackChunkName: "tool-classical-essays-learn" */ '@/views/Tools/ClassicalEssays/pages/LearnPage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.classicalEssays.learnTitle',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/classical-essays/practice',
    name: 'ClassicalEssaysPractice',
    component: () =>
      import(/* webpackChunkName: "tool-classical-essays-practice" */ '@/views/Tools/ClassicalEssays/pages/PracticePage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.classicalEssays.practiceTitle',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/video-player',
    name: 'VideoPlayer',
    component: () =>
      import(/* webpackChunkName: "tool-video-player" */ '@/views/Tools/VideoPlayer/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.videoPlayer.name',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/video-player/play/:id',
    name: 'VideoPlayerPlay',
    component: () =>
      import(/* webpackChunkName: "tool-video-player-play" */ '@/views/Tools/VideoPlayer/pages/PlayPage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.videoPlayer.playTitle',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/physics',
    name: 'Physics',
    component: () =>
      import(/* webpackChunkName: "tool-physics" */ '@/views/Tools/Physics/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.physics.name',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/physics/learn',
    name: 'PhysicsLearn',
    component: () =>
      import(/* webpackChunkName: "tool-physics-learn" */ '@/views/Tools/Physics/pages/LearnPage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.physics.learnTitle',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/physics/practice',
    name: 'PhysicsPractice',
    component: () =>
      import(/* webpackChunkName: "tool-physics-practice" */ '@/views/Tools/Physics/pages/PracticePage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.physics.practiceTitle',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/math',
    name: 'Mathematics',
    component: () =>
      import(/* webpackChunkName: "tool-math" */ '@/views/Tools/Mathematics/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.math.name',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/math/learn',
    name: 'MathLearn',
    component: () =>
      import(/* webpackChunkName: "tool-math-learn" */ '@/views/Tools/Mathematics/pages/LearnPage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.math.learnTitle',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/math/practice',
    name: 'MathPractice',
    component: () =>
      import(/* webpackChunkName: "tool-math-practice" */ '@/views/Tools/Mathematics/pages/PracticePage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.math.practiceTitle',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/chemistry',
    name: 'Chemistry',
    component: () =>
      import(/* webpackChunkName: "tool-chemistry" */ '@/views/Tools/Chemistry/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.chemistry.name',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/chemistry/learn',
    name: 'ChemistryLearn',
    component: () =>
      import(/* webpackChunkName: "tool-chemistry-learn" */ '@/views/Tools/Chemistry/pages/LearnPage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.chemistry.learnTitle',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/chemistry/practice',
    name: 'ChemistryPractice',
    component: () =>
      import(/* webpackChunkName: "tool-chemistry-practice" */ '@/views/Tools/Chemistry/pages/PracticePage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.chemistry.practiceTitle',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/biology',
    name: 'Biology',
    component: () =>
      import(/* webpackChunkName: "tool-biology" */ '@/views/Tools/Biology/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.biology.name',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/biology/learn',
    name: 'BiologyLearn',
    component: () =>
      import(/* webpackChunkName: "tool-biology-learn" */ '@/views/Tools/Biology/pages/LearnPage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.biology.learnTitle',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/biology/practice',
    name: 'BiologyPractice',
    component: () =>
      import(/* webpackChunkName: "tool-biology-practice" */ '@/views/Tools/Biology/pages/PracticePage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.biology.practiceTitle',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/police',
    name: 'PoliceExam',
    component: () =>
      import(/* webpackChunkName: "tool-police" */ '@/views/Tools/PoliceExam/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.police.name',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/police/learn',
    name: 'PoliceExamLearn',
    component: () =>
      import(/* webpackChunkName: "tool-police-learn" */ '@/views/Tools/PoliceExam/pages/LearnPage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.police.learnTitle',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/police/practice',
    name: 'PoliceExamPractice',
    component: () =>
      import(/* webpackChunkName: "tool-police-practice" */ '@/views/Tools/PoliceExam/pages/PracticePage.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.police.practiceTitle',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/textbook',
    name: 'Textbook',
    component: () =>
      import(/* webpackChunkName: "tool-textbook" */ '@/views/Tools/Textbook/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.textbook.name',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/tools/national-two-sessions',
    name: 'NationalTwoSessions',
    component: () =>
      import(/* webpackChunkName: "tool-national-two-sessions" */ '@/views/Tools/NationalTwoSessions/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'tools.nationalTwoSessions.name',
      showBack: true,
      showTabbar: false,
    },
  },
  // ========================================
  // 游戏详情页面路由
  // ========================================
  {
    path: '/games/number-guess',
    name: 'NumberGuess',
    component: () =>
      import(/* webpackChunkName: "game-number-guess" */ '@/views/Games/NumberGuess/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'games.numberGuess',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/games/lucky-wheel',
    name: 'LuckyWheel',
    component: () =>
      import(/* webpackChunkName: "game-lucky-wheel" */ '@/views/Games/LuckyWheel/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'games.luckyWheel',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/games/quiz-challenge',
    name: 'QuizChallenge',
    component: () =>
      import(/* webpackChunkName: "game-quiz-challenge" */ '@/views/Games/QuizChallenge/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'games.quizChallenge',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/games/daily-checkin',
    name: 'DailyCheckIn',
    component: () =>
      import(/* webpackChunkName: "game-daily-checkin" */ '@/views/Games/DailyCheckIn/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'games.dailyCheckIn',
      showBack: true,
      showTabbar: false,
    },
  },
  // ========================================
  // 个人中心子页面路由
  // ========================================
  {
    path: '/profile/records',
    name: 'ProfileRecords',
    component: () =>
      import(/* webpackChunkName: "profile-records" */ '@/views/Profile/Records/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'records.title',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/profile/points',
    name: 'ProfilePoints',
    component: () =>
      import(/* webpackChunkName: "profile-points" */ '@/views/Profile/Points/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'points.title',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/profile/settings',
    name: 'ProfileSettings',
    component: () =>
      import(/* webpackChunkName: "profile-settings" */ '@/views/Profile/Settings/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'settings.title',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/profile/help',
    name: 'ProfileHelp',
    component: () =>
      import(/* webpackChunkName: "profile-help" */ '@/views/Profile/Help/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'help.title',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/profile/exchange',
    name: 'ProfileExchange',
    component: () =>
      import(/* webpackChunkName: "profile-exchange" */ '@/views/Profile/Exchange/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'exchange.title',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/profile/badges',
    name: 'ProfileBadges',
    component: () =>
      import(/* webpackChunkName: "profile-badges" */ '@/views/Profile/Badges/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'badges.title',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/profile/invite',
    name: 'ProfileInvite',
    component: () =>
      import(/* webpackChunkName: "profile-invite" */ '@/views/Profile/Invite/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'invite.title',
      showBack: true,
      showTabbar: false,
    },
  },
  // ========================================
  // 帮助中心子页面路由
  // ========================================
  {
    path: '/profile/help/online-service',
    name: 'HelpOnlineService',
    component: () =>
      import(
        /* webpackChunkName: "help-online-service" */ '@/views/Profile/Help/OnlineService/index.vue'
      ),
    meta: {
      layout: 'AppLayout',
      title: 'help.onlineService.title',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/profile/help/feedback',
    name: 'HelpFeedback',
    component: () =>
      import(/* webpackChunkName: "help-feedback" */ '@/views/Profile/Help/Feedback/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'help.feedback.title',
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: '/profile/help/report',
    name: 'HelpReport',
    component: () =>
      import(/* webpackChunkName: "help-report" */ '@/views/Profile/Help/Report/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'help.report.title',
      showBack: true,
      showTabbar: false,
    },
  },
  // ========================================
  // 除夕倒计时页面路由
  // ========================================
  {
    path: '/new-year-eve',
    name: 'NewYearEve',
    component: () => import(/* webpackChunkName: "new-year-eve" */ '@/views/Home/NewYearEve/index.vue'),
    meta: {
      layout: 'PageLayout',
      title: 'newYearEve.title',
      showBack: true,
      showTabbar: false,
    },
  },
  // ========================================
  // 黄历详情页面路由
  // ========================================
  {
    path: '/home/almanac-detail',
    name: 'AlmanacDetail',
    component: () =>
      import(/* webpackChunkName: "almanac-detail" */ '@/views/Home/AlmanacDetail/index.vue'),
    meta: {
      layout: 'AppLayout',
      title: 'almanac.detail',
      showBack: true,
      showTabbar: false,
    },
  },
  // ========================================
  // 认证相关页面路由
  // ========================================
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "auth-login" */ '@/views/Auth/Login/index.vue'),
    meta: {
      layout: 'PageLayout',
      title: 'auth.login',
      showBack: false,
      showTabbar: false,
      requiresAuth: false,
    },
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () =>
      import(/* webpackChunkName: "auth-register" */ '@/views/Auth/Register/index.vue'),
    meta: {
      layout: 'PageLayout',
      title: 'auth.register',
      showBack: false,
      showTabbar: false,
      requiresAuth: false,
    },
  },
];

// ========================================
// 创建路由实例
// ========================================
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // Hash 模式，兼容 GitHub Pages
  routes,
  // 滚动行为：保存滚动位置，或默认滚动到顶部
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

// ========================================
// 全局前置路由守卫
// ========================================
router.beforeEach((to, from, next) => {
  // 设置页面标题（支持 i18n）
  const titleKey = to.meta.title;
  if (titleKey) {
    const translatedTitle = i18n.global.t(titleKey);
    const appName = i18n.global.t('app.name');
    document.title = `${translatedTitle} - ${appName}`;
  } else {
    document.title = i18n.global.t('app.title');
  }

  // 检查是否需要登录
  const requiresAuth = to.meta.requiresAuth !== false; // 默认为 true
  const token = localStorage.getItem('token');

  if (requiresAuth && !token) {
    // 需要登录但未登录，跳转到登录页
    next({
      name: 'Login',
      query: { redirect: to.fullPath }, // 保存原目标路径，登录后跳转回去
    });
  } else if (!requiresAuth && token) {
    // 已登录用户访问登录/注册页，跳转到首页
    if (to.name === 'Login' || to.name === 'Register') {
      next({ name: 'Home' });
    } else {
      next();
    }
  } else {
    // 正常导航
    next();
  }
});

// ========================================
// 全局后置路由钩子（用于语言切换时更新标题）
// ========================================
router.afterEach((to, from) => {
  // 语言切换后重新设置标题
  if (to.meta.title) {
    const translatedTitle = i18n.global.t(to.meta.title);
    document.title = `${translatedTitle} - 瑶光`;
  }
});

export default router;
