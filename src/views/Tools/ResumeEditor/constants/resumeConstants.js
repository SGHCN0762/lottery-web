/**
 * 简历编辑器常量配置
 * 统一管理背景、装饰、布局等配置，避免重复定义
 */

/**
 * 背景选项
 */
export const resumeBackgrounds = {
  none: {
    name: '无背景',
    style: { background: '#ffffff' }
  },
  grid: {
    name: '网格',
    style: { 
      background: '#ffffff',
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%23f0f0f0' stroke-width='1'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat'
    }
  },
  diagonal: {
    name: '斜线',
    style: { 
      background: '#fafafa',
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 10 L 10 0' stroke='%23f0f0f0' stroke-width='1'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat'
    }
  },
  dots: {
    name: '圆点',
    style: { 
      background: '#ffffff',
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1.5' fill='%23f0f0f0'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat'
    }
  },
  gradient1: {
    name: '渐变蓝',
    style: { background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)' }
  },
  gradient2: {
    name: '渐变紫',
    style: { background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)' }
  },
  gradient3: {
    name: '渐变绿',
    style: { background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }
  },
  gradient4: {
    name: '渐变橙',
    style: { background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)' }
  },
  gradient5: {
    name: '渐变粉',
    style: { background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)' }
  },
  gradient6: {
    name: '渐变靛蓝',
    style: { background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)' }
  },
};

/**
 * 装饰元素选项
 */
export const resumeDecorations = {
  none: {
    name: '无装饰',
    svg: '',
    preview: ''
  },
  corner: {
    name: '角落装饰',
    svg: `<svg class="deco-corner" viewBox="0 0 794 1123" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 0 0 L 200 0 L 0 200 Z" fill="rgba(102,126,234,0.1)"/>
      <path d="M 794 1123 L 594 1123 L 794 923 Z" fill="rgba(102,126,234,0.1)"/>
    </svg>`,
    preview: `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M 4 4 L 20 4 L 4 20 Z" fill="rgba(102,126,234,0.3)"/>
      <path d="M 44 44 L 28 44 L 44 28 Z" fill="rgba(102,126,234,0.3)"/>
    </svg>`
  },
  wave: {
    name: '波浪',
    svg: `<svg class="deco-wave" viewBox="0 0 794 1123" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 0 150 Q 198.5 100, 397 150 T 794 150 L 794 0 L 0 0 Z" fill="rgba(102,126,234,0.1)"/>
      <path d="M 0 973 Q 198.5 1023, 397 973 T 794 973 L 794 1123 L 0 1123 Z" fill="rgba(102,126,234,0.08)"/>
    </svg>`,
    preview: `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M 0 14 Q 12 6, 24 14 T 48 14 L 48 0 L 0 0 Z" fill="rgba(102,126,234,0.3)"/>
      <path d="M 0 38 Q 12 46, 24 38 T 48 38 L 48 48 L 0 48 Z" fill="rgba(102,126,234,0.25)"/>
    </svg>`
  },
  circles: {
    name: '圆形',
    svg: `<svg class="deco-circles" viewBox="0 0 794 1123" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="40" fill="rgba(102,126,234,0.1)"/>
      <circle cx="744" cy="1073" r="30" fill="rgba(102,126,234,0.08)"/>
      <circle cx="600" cy="80" r="20" fill="rgba(102,126,234,0.06)"/>
      <circle cx="194" cy="1023" r="25" fill="rgba(102,126,234,0.05)"/>
    </svg>`,
    preview: `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="8" fill="rgba(102,126,234,0.3)"/>
      <circle cx="38" cy="38" r="6" fill="rgba(102,126,234,0.25)"/>
      <circle cx="40" cy="12" r="4" fill="rgba(102,126,234,0.2)"/>
      <circle cx="12" cy="40" r="5" fill="rgba(102,126,234,0.15)"/>
    </svg>`
  },
  geometric: {
    name: '几何',
    svg: `<svg class="deco-geometric" viewBox="0 0 794 1123" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,1063 100,1003 140,1063" fill="rgba(102,126,234,0.1)"/>
      <rect x="614" y="40" width="100" height="100" fill="rgba(102,126,234,0.08)" transform="rotate(15 664 90)"/>
      <circle cx="60" cy="100" r="15" fill="rgba(102,126,234,0.06)"/>
    </svg>`,
    preview: `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <polygon points="10,42 18,32 26,42" fill="rgba(102,126,234,0.3)"/>
      <rect x="30" y="8" width="12" height="12" fill="rgba(102,126,234,0.25)" transform="rotate(15 36 14)"/>
      <circle cx="10" cy="10" r="5" fill="rgba(102,126,234,0.2)"/>
    </svg>`
  },
  triangles: {
    name: '三角',
    svg: `<svg class="deco-triangles" viewBox="0 0 794 1123" xmlns="http://www.w3.org/2000/svg">
      <polygon points="794,0 794,80 714,0" fill="rgba(102,126,234,0.1)"/>
      <polygon points="0,1123 80,1123 0,1043" fill="rgba(102,126,234,0.08)"/>
      <polygon points="794,561 754,561 754,601" fill="rgba(102,126,234,0.05)"/>
    </svg>`,
    preview: `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <polygon points="48,6 48,18 34,6" fill="rgba(102,126,234,0.3)"/>
      <polygon points="6,48 18,48 6,34" fill="rgba(102,126,234,0.25)"/>
      <polygon points="48,26 42,26 42,32" fill="rgba(102,126,234,0.15)"/>
    </svg>`
  },
  stars: {
    name: '星星',
    svg: `<svg class="deco-stars" viewBox="0 0 794 1123" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,35 57,45 68,45 59,53 62,65 50,58 38,65 41,53 32,45 43,45" fill="rgba(102,126,234,0.12)"/>
      <polygon points="744,1088 751,1098 762,1098 753,1106 756,1118 744,1111 732,1118 735,1106 726,1098 737,1098" fill="rgba(102,126,234,0.1)"/>
      <polygon points="650,50 655,58 663,58 657,64 659,73 650,68 641,73 643,64 637,58 645,58" fill="rgba(102,126,234,0.08)"/>
      <polygon points="150,1000 154,1006 160,1006 155,1011 156,1018 150,1014 144,1018 145,1011 140,1006 146,1006" fill="rgba(102,126,234,0.06)"/>
    </svg>`,
    preview: `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <polygon points="10,6 12,14 20,14 14,19 16,26 10,21 4,26 6,19 0,14 8,14" fill="rgba(102,126,234,0.35)"/>
      <polygon points="40,34 42,38 46,38 43,41 44,46 40,43 36,46 37,41 34,38 38,38" fill="rgba(102,126,234,0.3)"/>
    </svg>`
  },
  ribbons: {
    name: '丝带',
    svg: `<svg class="deco-ribbons" viewBox="0 0 794 1123" xmlns="http://www.w3.org/2000/svg">
      <path d="M 0 0 Q 100 50 0 100 Q -20 150 0 200" fill="none" stroke="rgba(102,126,234,0.15)" stroke-width="3"/>
      <path d="M 794 923 Q 694 973 794 1023 Q 814 1073 794 1123" fill="none" stroke="rgba(102,126,234,0.12)" stroke-width="3"/>
    </svg>`,
    preview: `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M 8 12 Q 24 24 8 36 Q 4 40 8 44" fill="none" stroke="rgba(102,126,234,0.4)" stroke-width="3"/>
      <path d="M 40 12 Q 24 24 40 36 Q 44 40 40 44" fill="none" stroke="rgba(102,126,234,0.35)" stroke-width="3"/>
    </svg>`
  },
  hexagons: {
    name: '六边形',
    svg: `<svg class="deco-hexagons" viewBox="0 0 794 1123" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,50 75,65 75,95 50,110 25,95 25,65" fill="none" stroke="rgba(102,126,234,0.12)" stroke-width="1.5"/>
      <polygon points="744,1073 769,1088 769,1118 744,1133 719,1118 719,1088" fill="none" stroke="rgba(102,126,234,0.1)" stroke-width="1.5"/>
      <polygon points="680,60 700,75 700,100 680,115 660,100 660,75" fill="none" stroke="rgba(102,126,234,0.08)" stroke-width="1"/>
    </svg>`,
    preview: `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <polygon points="12,16 20,20 20,32 12,36 4,32 4,20" fill="none" stroke="rgba(102,126,234,0.4)" stroke-width="2"/>
      <polygon points="36,16 44,20 44,32 36,36 28,32 28,20" fill="none" stroke="rgba(102,126,234,0.3)" stroke-width="2"/>
    </svg>`
  },
  leaves: {
    name: '叶片',
    svg: `<svg class="deco-leaves" viewBox="0 0 794 1123" xmlns="http://www.w3.org/2000/svg">
      <path d="M 40 80 Q 60 60 40 20 Q 20 60 40 80" fill="rgba(102,126,234,0.1)"/>
      <path d="M 754 1043 Q 774 1023 754 983 Q 734 1023 754 1043" fill="rgba(102,126,234,0.08)"/>
      <path d="M 60 1043 Q 80 1023 60 983 Q 40 1023 60 1043" fill="rgba(102,126,234,0.06)"/>
    </svg>`,
    preview: `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M 16 32 Q 24 16 16 8 Q 8 16 16 24 Q 20 32 16 32" fill="rgba(102,126,234,0.3)"/>
      <path d="M 36 28 Q 42 20 36 14 Q 30 20 36 26" fill="rgba(102,126,234,0.25)"/>
      <path d="M 30 26 Q 36 18 30 12 Q 24 18 30 24" fill="rgba(102,126,234,0.2)"/>
    </svg>`
  }
};

/**
 * 主题配置 - 12种精美简历主题
 */
export const resumeThemes = {
  default: {
    name: '默认蓝紫',
    primaryColor: '#667eea',
    secondaryColor: '#764ba2',
    accentColor: '#667eea',
    bgGradient: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    cardBg: '#ffffff',
    textPrimary: '#2c3e50',
    textSecondary: '#495057',
    textLight: '#666',
    borderColor: '#e9ecef',
    summaryBg: 'linear-gradient(135deg, #e8f4fd 0%, #f3e8ff 100%)',
    skillTagBg: 'linear-gradient(135deg, #e8f4fd 0%, #f3e8ff 100%)',
    skillTagBorder: '#667eea',
    skillTagColor: '#667eea',
    sectionLine: '#667eea',
    itemBorder: '#667eea',
  },
  ocean: {
    name: '海洋蓝',
    primaryColor: '#2563eb',
    secondaryColor: '#0ea5e9',
    accentColor: '#2563eb',
    bgGradient: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    cardBg: '#ffffff',
    textPrimary: '#1e3a5f',
    textSecondary: '#334155',
    textLight: '#64748b',
    borderColor: '#e0f2fe',
    summaryBg: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
    skillTagBg: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
    skillTagBorder: '#2563eb',
    skillTagColor: '#1d4ed8',
    sectionLine: '#2563eb',
    itemBorder: '#2563eb',
  },
  forest: {
    name: '森林绿',
    primaryColor: '#16a34a',
    secondaryColor: '#059669',
    accentColor: '#16a34a',
    bgGradient: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    cardBg: '#ffffff',
    textPrimary: '#14532d',
    textSecondary: '#166534',
    textLight: '#52525b',
    borderColor: '#dcfce7',
    summaryBg: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
    skillTagBg: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
    skillTagBorder: '#16a34a',
    skillTagColor: '#15803d',
    sectionLine: '#16a34a',
    itemBorder: '#16a34a',
  },
  sunset: {
    name: '落日橙',
    primaryColor: '#ea580c',
    secondaryColor: '#dc2626',
    accentColor: '#ea580c',
    bgGradient: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
    cardBg: '#ffffff',
    textPrimary: '#7c2d12',
    textSecondary: '#9a3412',
    textLight: '#737373',
    borderColor: '#ffedd5',
    summaryBg: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)',
    skillTagBg: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)',
    skillTagBorder: '#ea580c',
    skillTagColor: '#c2410c',
    sectionLine: '#ea580c',
    itemBorder: '#ea580c',
  },
  rose: {
    name: '玫瑰红',
    primaryColor: '#db2777',
    secondaryColor: '#be185d',
    accentColor: '#db2777',
    bgGradient: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
    cardBg: '#ffffff',
    textPrimary: '#831843',
    textSecondary: '#9d174d',
    textLight: '#737373',
    borderColor: '#fce7f3',
    summaryBg: 'linear-gradient(135deg, #fbcfe8 0%, #f9a8d4 100%)',
    skillTagBg: 'linear-gradient(135deg, #fbcfe8 0%, #f9a8d4 100%)',
    skillTagBorder: '#db2777',
    skillTagColor: '#be185d',
    sectionLine: '#db2777',
    itemBorder: '#db2777',
  },
  lavender: {
    name: '薰衣草紫',
    primaryColor: '#8b5cf6',
    secondaryColor: '#7c3aed',
    accentColor: '#8b5cf6',
    bgGradient: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
    cardBg: '#ffffff',
    textPrimary: '#4c1d95',
    textSecondary: '#5b21b6',
    textLight: '#6b7280',
    borderColor: '#ede9fe',
    summaryBg: 'linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%)',
    skillTagBg: 'linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%)',
    skillTagBorder: '#8b5cf6',
    skillTagColor: '#7c3aed',
    sectionLine: '#8b5cf6',
    itemBorder: '#8b5cf6',
  },
  cyan: {
    name: '青柠绿',
    primaryColor: '#0891b2',
    secondaryColor: '#06b6d4',
    accentColor: '#0891b2',
    bgGradient: 'linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)',
    cardBg: '#ffffff',
    textPrimary: '#164e63',
    textSecondary: '#0e7490',
    textLight: '#64748b',
    borderColor: '#cffafe',
    summaryBg: 'linear-gradient(135deg, #a5f3fc 0%, #67e8f9 100%)',
    skillTagBg: 'linear-gradient(135deg, #a5f3fc 0%, #67e8f9 100%)',
    skillTagBorder: '#0891b2',
    skillTagColor: '#06b6d4',
    sectionLine: '#0891b2',
    itemBorder: '#0891b2',
  },
  mint: {
    name: '薄荷绿',
    primaryColor: '#059669',
    secondaryColor: '#10b981',
    accentColor: '#059669',
    bgGradient: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    cardBg: '#ffffff',
    textPrimary: '#065f46',
    textSecondary: '#064e3b',
    textLight: '#64748b',
    borderColor: '#dcfce7',
    summaryBg: 'linear-gradient(135deg, #bbf7d0 0%, #86efac 100%)',
    skillTagBg: 'linear-gradient(135deg, #bbf7d0 0%, #86efac 100%)',
    skillTagBorder: '#059669',
    skillTagColor: '#047857',
    sectionLine: '#059669',
    itemBorder: '#059669',
  },
  coral: {
    name: '珊瑚粉',
    primaryColor: '#f97316',
    secondaryColor: '#fb923c',
    accentColor: '#f97316',
    bgGradient: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
    cardBg: '#ffffff',
    textPrimary: '#9a3412',
    textSecondary: '#c2410c',
    textLight: '#737373',
    borderColor: '#ffedd5',
    summaryBg: 'linear-gradient(135deg, #fdba74 0%, #fb923c 100%)',
    skillTagBg: 'linear-gradient(135deg, #fdba74 0%, #fb923c 100%)',
    skillTagBorder: '#f97316',
    skillTagColor: '#ea580c',
    sectionLine: '#f97316',
    itemBorder: '#f97316',
  },
  indigo: {
    name: '靛蓝',
    primaryColor: '#4f46e5',
    secondaryColor: '#6366f1',
    accentColor: '#4f46e5',
    bgGradient: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
    cardBg: '#ffffff',
    textPrimary: '#3730a3',
    textSecondary: '#4338ca',
    textLight: '#6b7280',
    borderColor: '#c7d2fe',
    summaryBg: 'linear-gradient(135deg, #a5b4fc 0%, #818cf8 100%)',
    skillTagBg: 'linear-gradient(135deg, #a5b4fc 0%, #818cf8 100%)',
    skillTagBorder: '#4f46e5',
    skillTagColor: '#4338ca',
    sectionLine: '#4f46e5',
    itemBorder: '#4f46e5',
  },
};