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
