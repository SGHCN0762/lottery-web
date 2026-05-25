import { ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { showToast, showSuccessToast } from 'vant';

/**
 * 举报页面业务逻辑 Hook
 */
export function useReport() {
  const { t } = useI18n();

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
  const typeOptions = computed(() => [
    { text: t('help.report.typeOptions.violation'), value: t('help.report.typeOptions.violation') },
    { text: t('help.report.typeOptions.fraud'), value: t('help.report.typeOptions.fraud') },
    { text: t('help.report.typeOptions.cheating'), value: t('help.report.typeOptions.cheating') },
    { text: t('help.report.typeOptions.harassment'), value: t('help.report.typeOptions.harassment') },
    { text: t('help.report.typeOptions.other'), value: t('help.report.typeOptions.other') },
  ]);

  /**
   * 获取类型标签样式
   */
  const typeTagMapping = computed(() => ({
    [t('help.report.typeOptions.violation')]: 'danger',
    [t('help.report.typeOptions.fraud')]: 'danger',
    [t('help.report.typeOptions.cheating')]: 'warning',
    [t('help.report.typeOptions.harassment')]: 'primary',
    [t('help.report.typeOptions.other')]: 'default',
  }));

  const getTypeTagType = type => {
    return typeTagMapping.value[type] || 'default';
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
    localStorage.setItem('reportList', JSON.stringify(reportList.value));
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
        images: fileList.value.map(f => f.content || f.url),
        status: 'pending',
        statusText: t('help.report.status.pending'),
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
        showToast({ type: 'fail', message: t('help.report.validation.saveFailed') });
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
      showSuccessToast(t('help.report.success.submit'));

      // 显示感谢提示
      setTimeout(() => {
        showToast({
          type: 'success',
          message: t('help.report.success.thanks'),
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
