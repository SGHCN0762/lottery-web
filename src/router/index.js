/**
 * 路由配置
 *
 * 定义应用的所有路由规则，包括：
 * - 路径映射
 * - 组件懒加载
 * - 路由元信息（标题、是否缓存、是否显示返回按钮）
 */

import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/Home/index.vue";
import i18n from "@/i18n";

// ========================================
// 路由配置数组
// ========================================
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: HomeView,
    meta: {
      layout: 'AppLayout',
      keepAlive: true,
      title: "navigation.home",
      showBack: false,
      showTabbar: true,
    },
  },
  {
    path: "/games",
    name: "Games",
    component: () => import("@/views/Games/index.vue"),
    meta: {
      layout: 'AppLayout',
      title: "navigation.games",
      showBack: false,
      showTabbar: true,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile/index.vue"),
    meta: {
      layout: 'AppLayout',
      title: "navigation.profile",
      showBack: false,
      showTabbar: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About/index.vue"),
    meta: {
      layout: 'AppLayout',
      title: "navigation.about",
      showBack: true,
      showTabbar: false,
    },
  },
  // ========================================
  // 游戏详情页面路由
  // ========================================
  {
    path: "/games/number-guess",
    name: "NumberGuess",
    component: () => import("@/views/Games/NumberGuess/index.vue"),
    meta: {
      layout: 'AppLayout',
      title: "games.numberGuess",
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: "/games/lucky-wheel",
    name: "LuckyWheel",
    component: () => import("@/views/Games/LuckyWheel/index.vue"),
    meta: {
      layout: 'AppLayout',
      title: "games.luckyWheel",
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: "/games/quiz-challenge",
    name: "QuizChallenge",
    component: () => import("@/views/Games/QuizChallenge/index.vue"),
    meta: {
      layout: 'AppLayout',
      title: "games.quizChallenge",
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: "/games/daily-checkin",
    name: "DailyCheckIn",
    component: () => import("@/views/Games/DailyCheckIn/index.vue"),
    meta: {
      layout: 'AppLayout',
      title: "games.dailyCheckIn",
      showBack: true,
      showTabbar: false,
    },
  },
  // ========================================
  // 个人中心子页面路由
  // ========================================
  {
    path: "/profile/records",
    name: "ProfileRecords",
    component: () => import("@/views/Profile/Records/index.vue"),
    meta: {
      layout: 'AppLayout',
      title: "records.title",
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: "/profile/points",
    name: "ProfilePoints",
    component: () => import("@/views/Profile/Points/index.vue"),
    meta: {
      layout: 'AppLayout',
      title: "points.title",
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: "/profile/settings",
    name: "ProfileSettings",
    component: () => import("@/views/Profile/Settings/index.vue"),
    meta: {
      layout: 'AppLayout',
      title: "settings.title",
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: "/profile/help",
    name: "ProfileHelp",
    component: () => import("@/views/Profile/Help/index.vue"),
    meta: {
      layout: 'AppLayout',
      title: "help.title",
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: "/profile/exchange",
    name: "ProfileExchange",
    component: () => import("@/views/Profile/Exchange/index.vue"),
    meta: {
      layout: 'AppLayout',
      title: "exchange.title",
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: "/profile/badges",
    name: "ProfileBadges",
    component: () => import("@/views/Profile/Badges/index.vue"),
    meta: {
      layout: 'AppLayout',
      title: "badges.title",
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: "/profile/invite",
    name: "ProfileInvite",
    component: () => import("@/views/Profile/Invite/index.vue"),
    meta: {
      layout: 'AppLayout',
      title: "invite.title",
      showBack: true,
      showTabbar: false,
    },
  },
  // ========================================
  // 帮助中心子页面路由
  // ========================================
  {
    path: "/profile/help/online-service",
    name: "HelpOnlineService",
    component: () => import("@/views/Profile/Help/OnlineService/index.vue"),
    meta: {
      layout: 'AppLayout',
      title: "help.onlineService",
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: "/profile/help/feedback",
    name: "HelpFeedback",
    component: () => import("@/views/Profile/Help/Feedback/index.vue"),
    meta: {
      layout: 'AppLayout',
      title: "help.feedback",
      showBack: true,
      showTabbar: false,
    },
  },
  {
    path: "/profile/help/report",
    name: "HelpReport",
    component: () => import("@/views/Profile/Help/Report/index.vue"),
    meta: {
      layout: 'AppLayout',
      title: "help.report",
      showBack: true,
      showTabbar: false,
    },
  },
  // ========================================
  // 除夕倒计时页面路由
  // ========================================
  {
    path: "/new-year-eve",
    name: "NewYearEve",
    component: () => import("@/views/NewYearEve/index.vue"),
    meta: {
      layout: 'PageLayout',
      title: "newYearEve.title",
      showBack: true,
      showTabbar: false,
    },
  },
  // ========================================
  // 认证相关页面路由
  // ========================================
  {
    path: "/auth/login",
    name: "Login",
    component: () => import("@/views/Auth/Login/index.vue"),
    meta: {
      layout: 'PageLayout',
      title: "auth.login",
      showBack: false,
      showTabbar: false,
      requiresAuth: false,
    },
  },
  {
    path: "/auth/register",
    name: "Register",
    component: () => import("@/views/Auth/Register/index.vue"),
    meta: {
      layout: 'PageLayout',
      title: "auth.register",
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
});

// ========================================
// 全局前置路由守卫
// ========================================
router.beforeEach((to, from, next) => {
  // 设置页面标题（支持 i18n）
  const titleKey = to.meta.title;
  if (titleKey) {
    const translatedTitle = i18n.global.t(titleKey);
    const appName = i18n.global.t("app.name");
    document.title = `${translatedTitle} - ${appName}`;
  } else {
    document.title = i18n.global.t("app.title");
  }

  // 检查是否需要登录
  const requiresAuth = to.meta.requiresAuth !== false; // 默认为 true
  const token = localStorage.getItem("token");

  if (requiresAuth && !token) {
    // 需要登录但未登录，跳转到登录页
    next({
      name: "Login",
      query: { redirect: to.fullPath }, // 保存原目标路径，登录后跳转回去
    });
  } else if (!requiresAuth && token) {
    // 已登录用户访问登录/注册页，跳转到首页
    if (to.name === "Login" || to.name === "Register") {
      next({ name: "Home" });
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
  console.log(`页面跳转: ${from.path || "初始加载"} -> ${to.path}`);

  // 语言切换后重新设置标题
  if (to.meta.title) {
    const translatedTitle = i18n.global.t(to.meta.title);
    document.title = `${translatedTitle} - 瑶光`;
  }
});

export default router;
