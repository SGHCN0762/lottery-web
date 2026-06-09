import { ref, onMounted } from 'vue';
import { generateId } from './useListEditor';
import { setItem, getItem } from '../utils/indexDB';

const STORAGE_KEY = 'resume_data';

/**
 * 创建空的简历数据结构
 */
export const createEmptyResume = () => ({
  basic: {
    name: '',
    title: '',
    phone: '',
    email: '',
    location: '',
    summary: '',
    customFields: [],
    avatar: '',
  },
  experience: [],
  project: [],
  education: [],
  skills: [],
  customSections: [], // 自定义模块
  themeSettings: {
    theme: 'default',
    background: 'none',
    decoration: 'none',
    sectionOrder: [],
  },
});

/**
 * 创建完整的导出数据（包含主题配置）
 */
export const createExportData = (resume, themeSettings) => ({
  ...resume,
  themeSettings: themeSettings || resume.themeSettings || {
    theme: 'default',
    background: 'none',
    decoration: 'none',
    sectionOrder: [],
  },
});

/**
 * 清理字符串（防止XSS和空值）
 */
export const sanitizeString = (value) => {
  if (value === null || value === undefined) return '';
  const str = String(value).trim();
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * 清理主题配置
 */
export const sanitizeThemeSettings = (themeSettings) => {
  if (!themeSettings || typeof themeSettings !== 'object') {
    return {
      theme: 'default',
      background: 'none',
      decoration: 'none',
      sectionOrder: [],
    };
  }

  return {
    theme: sanitizeString(themeSettings.theme) || 'default',
    background: sanitizeString(themeSettings.background) || 'none',
    decoration: sanitizeString(themeSettings.decoration) || 'none',
    sectionOrder: Array.isArray(themeSettings.sectionOrder) 
      ? themeSettings.sectionOrder 
      : [],
  };
};

/**
 * 清理并验证简历数据
 */
export const sanitizeResume = (data) => {
  if (!data || typeof data !== 'object') {
    return createEmptyResume();
  }

  const result = createEmptyResume();

  // 处理基本信息
  if (data.basic && typeof data.basic === 'object') {
    Object.keys(result.basic).forEach(key => {
      if (key === 'customFields') {
        result.basic[key] = Array.isArray(data.basic[key]) ? data.basic[key].map(field => ({
          label: sanitizeString(field?.label),
          value: sanitizeString(field?.value),
        })).filter(field => field.label) : [];
      } else if (key === 'avatar') {
        // 头像保留原样，不进行字符串清理
        result.basic[key] = data.basic[key] || '';
      } else {
        result.basic[key] = sanitizeString(data.basic[key]);
      }
    });
  }

  // 处理数组类型数据
  const arrayFields = ['experience', 'project', 'education'];
  arrayFields.forEach(field => {
    if (Array.isArray(data[field])) {
      result[field] = data[field]
        .map(item => {
          const sanitized = { _id: item?._id || '' };
          const fieldsMap = {
            experience: ['company', 'position', 'startDate', 'endDate', 'description'],
            project: ['name', 'role', 'startDate', 'endDate', 'techStack', 'description'],
            education: ['school', 'major', 'degree', 'startDate', 'endDate'],
          };
          fieldsMap[field].forEach(key => {
            sanitized[key] = sanitizeString(item?.[key]);
          });
          return sanitized;
        })
        .filter(item => {
          if (field === 'experience') return item.company || item.position;
          if (field === 'project') return item.name;
          if (field === 'education') return item.school || item.major;
          return true;
        });
    }
  });

  // 处理技能
  if (Array.isArray(data.skills)) {
    result.skills = data.skills
      .map(skill => sanitizeString(skill))
      .filter(skill => skill.trim());
  }

  // 处理自定义模块
  if (Array.isArray(data.customSections)) {
    result.customSections = data.customSections.map(section => ({
      _id: section?._id || generateId(),
      title: sanitizeString(section?.title) || '自定义模块',
      icon: sanitizeString(section?.icon) || 'file-o',
      items: Array.isArray(section?.items) ? section.items.map(item => ({
        _id: item?._id || generateId(),
        label: sanitizeString(item?.label),
        value: sanitizeString(item?.value),
      })).filter(item => item.label) : [],
    })).filter(section => section.title);
  }

  // 处理主题配置
  if (data.themeSettings) {
    result.themeSettings = sanitizeThemeSettings(data.themeSettings);
  }

  return result;
};

/**
 * 验证简历数据格式
 */
export const validateResumeData = (data) => {
  if (!data || typeof data !== 'object') return false;
  if (!data.basic || typeof data.basic !== 'object') return false;
  
  const arrayFields = ['experience', 'project', 'education', 'skills'];
  return arrayFields.every(field => Array.isArray(data[field]));
};

/**
 * 简历数据管理 hook
 */
export const useResumeData = () => {
  const resumeData = ref(createEmptyResume());

  // 从 IndexedDB 加载
  const loadResumeData = async () => {
    try {
      const savedData = await getItem(STORAGE_KEY);
      if (savedData) {
        if (validateResumeData(savedData)) {
          resumeData.value = sanitizeResume(savedData);
        } else {
          resumeData.value = createEmptyResume();
        }
      }
    } catch (e) {
      console.error('Failed to load resume data:', e);
      resumeData.value = createEmptyResume();
    }
  };

  // 保存到 IndexedDB
  const saveResumeData = async () => {
    try {
      await setItem(STORAGE_KEY, resumeData.value);
    } catch (e) {
      console.error('Failed to save resume data:', e);
    }
  };

  // 更新主题配置
  const updateThemeSettings = (themeSettings) => {
    resumeData.value.themeSettings = sanitizeThemeSettings(themeSettings);
    saveResumeData();
  };

  // 更新某个字段并保存
  const updateField = (field, value) => {
    resumeData.value[field] = value;
    saveResumeData();
  };

  // 初始化加载
  onMounted(() => {
    loadResumeData();
  });

  return {
    resumeData,
    loadResumeData,
    saveResumeData,
    updateField,
    updateThemeSettings,
    createEmptyResume,
    sanitizeResume,
    validateResumeData,
  };
};
