import { ref, computed, watch } from 'vue';

/**
 * 生成唯一 ID
 */
export const generateId = () => `_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

/**
 * 分割技术栈字符串
 */
export const splitTechStack = (techStack) => {
  if (!techStack) return [];
  return techStack.split(/[,，、;；\s]+/).filter(t => t.trim()).map(t => t.trim());
};

/**
 * 按日期排序（倒序，最新的在前）
 */
export const sortByDate = (items, dateField = 'startDate') => {
  return [...items].sort((a, b) => {
    const dateA = a[dateField] || '';
    const dateB = b[dateField] || '';
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;
    return dateB.localeCompare(dateA);
  });
};

/**
 * 列表编辑器通用逻辑
 * @param {Object} props - 组件 props
 * @param {Function} emit - emit 函数
 * @param {Object} config - 配置项
 * @param {string} config.dateField - 排序日期字段
 * @param {Object} config.emptyForm - 空表单模板
 * @param {Function} config.validateRequired - 必填验证函数
 */
export const useListEditor = (props, emit, config) => {
  const { dateField = 'startDate', emptyForm, validateRequired } = config;

  // 带 _id 的数据，只在初始化时生成
  const dataWithIds = ref([]);

  // 初始化数据并确保有 _id
  watch(() => props.modelValue, (newVal) => {
    dataWithIds.value = newVal.map(item => ({
      ...item,
      _id: item._id || generateId(),
    }));
  }, { immediate: true, deep: true });

  // 排序后的数据
  const sortedItems = computed(() => {
    return sortByDate(dataWithIds.value, dateField);
  });

  // 编辑状态
  const showEditPopup = ref(false);
  const isEditing = ref(false);
  const editIndex = ref(-1);
  const editForm = ref(emptyForm());

  // 添加新项
  const handleAdd = () => {
    isEditing.value = false;
    editIndex.value = -1;
    editForm.value = emptyForm();
    showEditPopup.value = true;
  };

  // 编辑现有项
  const handleEdit = (index) => {
    const item = sortedItems.value[index];
    if (!item) return;
    isEditing.value = true;
    editIndex.value = index;
    editForm.value = { ...item };
    showEditPopup.value = true;
  };

  // 保存（新增或更新）
  const handleSave = () => {
    if (!validateRequired(editForm.value)) {
      return false;
    }

    const newItem = { ...editForm.value };
    let newData = [...dataWithIds.value];

    if (isEditing.value) {
      const sortedItem = sortedItems.value[editIndex.value];
      if (sortedItem && sortedItem._id) {
        newItem._id = sortedItem._id;
        const origIndex = newData.findIndex(x => x._id === sortedItem._id);
        if (origIndex !== -1) {
          newData[origIndex] = newItem;
        }
      }
    } else {
      newItem._id = generateId();
      newData.push(newItem);
    }

    emit('update:modelValue', newData);
    showEditPopup.value = false;
    return true;
  };

  // 删除
  const handleDelete = async (index, showConfirmDialog, t) => {
    try {
      await showConfirmDialog({
        title: t('resume.common.confirm'),
        message: t('resume.common.confirmDelete'),
      });
      const sortedItem = sortedItems.value[index];
      if (sortedItem && sortedItem._id) {
        const newData = dataWithIds.value.filter(x => x._id !== sortedItem._id);
        emit('update:modelValue', newData);
        return true;
      }
    } catch {
      // 用户取消
    }
    return false;
  };

  return {
    sortedItems,
    showEditPopup,
    isEditing,
    editIndex,
    editForm,
    handleAdd,
    handleEdit,
    handleSave,
    handleDelete,
  };
};