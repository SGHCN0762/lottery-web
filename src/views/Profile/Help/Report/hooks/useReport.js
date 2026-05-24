import { ref, reactive } from 'vue';
import { showToast, showSuccessToast } from 'vant';

/**
 * 举报页面业务逻辑 Hook
 */
export function useReport() {
  // ========================================
  // 响应式数据
  // ========================================
  const showTypePicker = ref(false);
  const showDetailPopup = ref(false);
  const submitting = ref(false);
  const fileList = ref([]);
  const currentReport = ref(null);
  const reportList = ref([]);

  // 表单数据
  const formData = reactive({
    type: '',
    target: '',
    reason: '',
    contact: '',
  });

  // ========================================
  // 配置选项
  // ========================================
  const typeOptions = [
    { text: '违规内容', value: '违规内容' },
    { text: '欺诈行为', value: '欺诈行为' },
    { text: '恶意刷分', value: '恶意刷分' },
    { text: '骚扰他人', value: '骚扰他人' },
    { text: '其他违规', value: '其他违规' },
  ];

  // ========================================
  // 工具函数
  // ========================================

  /**
   * 格式化时间
   */
  const formatTime = timestamp => {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}-${day}`;
  };

  /**
   * 格式化完整时间
   */
  const formatFullTime = timestamp => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  /**
   * 获取类型标签样式
   */
  const getTypeTagType = type => {
    const types = {
      违规内容: 'danger',
      欺诈行为: 'danger',
      恶意刷分: 'warning',
      骚扰他人: 'primary',
      其他违规: 'default',
    };
    return types[type] || 'default';
  };

  /**
   * 获取状态标签样式
   */
  const getStatusTagType = status => {
    const types = {
      pending: 'warning',
      processing: 'primary',
      resolved: 'success',
      rejected: 'default',
    };
    return types[status] || 'default';
  };

  // ========================================
  // localStorage 操作
  // ========================================

  /**
   * 加载举报记录
   */
  const loadReportList = () => {
    try {
      const stored = localStorage.getItem('reportList');
      if (stored) {
        reportList.value = JSON.parse(stored);
      }
    } catch (error) {
      console.error('加载举报记录失败:', error);
      // 如果数据损坏，清空并重新开始
      localStorage.removeItem('reportList');
      reportList.value = [];
    }
  };

  /**
   * 保存举报记录
   */
  const saveReportList = () => {
    try {
      // 限制最多保存50条记录，避免localStorage溢出
      const maxRecords = 50;
      if (reportList.value.length > maxRecords) {
        reportList.value = reportList.value.slice(0, maxRecords);
      }

      // 创建不包含图片数据的副本用于存储（图片base64太占空间）
      const storageData = reportList.value.map(item => ({
        ...item,
        images: item.images && item.images.length > 0 ? ['[已上传]'] : [], // 仅标记有图片，不存实际数据
      }));

      localStorage.setItem('reportList', JSON.stringify(storageData));
    } catch (error) {
      console.error('保存举报记录失败:', error);
      if (error.name === 'QuotaExceededError') {
        showToast({ type: 'fail', message: '存储空间不足，请清理部分历史记录' });
        // 清空最旧的记录
        if (reportList.value.length > 10) {
          reportList.value = reportList.value.slice(0, 10);
          saveReportList();
        }
      }
    }
  };

  // ========================================
  // 事件处理
  // ========================================

  /**
   * 类型选择确认
   */
  const onTypeConfirm = ({ selectedOptions }) => {
    formData.type = selectedOptions[0].value;
    showTypePicker.value = false;
  };

  /**
   * 图片上传处理
   */
  const afterRead = file => {
    // 这里可以添加图片上传到服务器的逻辑
  };

  /**
   * 提交举报
   */
  const onSubmit = async () => {
    submitting.value = true;

    // 模拟提交延迟
    setTimeout(() => {
      // 创建举报记录（不存储图片base64数据到localStorage）
      const newReport = {
        id: Date.now(),
        type: formData.type,
        target: formData.target,
        reason: formData.reason,
        contact: formData.contact,
        images: fileList.value.length > 0 ? ['[已上传]'] : [], // 仅标记有图片，实际图片应上传服务器
        status: 'pending',
        statusText: '待处理',
        time: Date.now(),
        reply: '',
      };

      // 添加到列表
      reportList.value.unshift(newReport);

      // 保存时捕获可能的存储错误
      try {
        saveReportList();
      } catch (error) {
        console.error('保存失败:', error);
        showToast({ type: 'fail', message: '保存失败，请清理部分历史记录后重试' });
        submitting.value = false;
        return;
      }

      // 重置表单
      formData.type = '';
      formData.target = '';
      formData.reason = '';
      formData.contact = '';
      fileList.value = [];

      submitting.value = false;
      showSuccessToast('举报提交成功!我们会尽快核实处理');

      // 显示感谢提示
      setTimeout(() => {
        showToast({
          type: 'success',
          message: '感谢您的监督!',
          duration: 2000,
        });
      }, 500);
    }, 1500);
  };

  /**
   * 显示举报详情
   */
  const showReportDetail = item => {
    currentReport.value = item;
    showDetailPopup.value = true;
  };

  /**
   * 关闭详情弹窗
   */
  const closeDetailPopup = () => {
    showDetailPopup.value = false;
    currentReport.value = null;
  };

  /**
   * 重置表单
   */
  const resetForm = () => {
    formData.type = '';
    formData.target = '';
    formData.reason = '';
    formData.contact = '';
    fileList.value = [];
  };

  return {
    // 状态
    showTypePicker,
    showDetailPopup,
    submitting,
    fileList,
    currentReport,
    reportList,
    formData,
    typeOptions,

    // 方法
    formatTime,
    formatFullTime,
    getTypeTagType,
    getStatusTagType,
    loadReportList,
    saveReportList,
    onTypeConfirm,
    afterRead,
    onSubmit,
    showReportDetail,
    closeDetailPopup,
    resetForm,
  };
}
