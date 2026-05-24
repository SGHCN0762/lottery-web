<template>
  <div class="report-page">
    <!-- 举报说明卡片 -->
    <ReportIntro />

    <!-- 举报表单 -->
    <ReportForm
      :form-data="formData"
      :file-list="fileList"
      :submitting="submitting"
      @submit="onSubmit"
      @type-picker-open="showTypePicker = true"
      @after-read="afterRead"
      @update:form-data="(value) => Object.assign(formData, value)"
      @update:file-list="(value) => fileList.splice(0, fileList.length, ...value)"
    />

    <!-- 举报记录 -->
    <ReportHistory
      :report-list="reportList"
      :format-time="formatTime"
      :get-type-tag-type="getTypeTagType"
      :get-status-tag-type="getStatusTagType"
      @detail-click="showReportDetail"
    />

    <!-- 举报类型选择器 -->
    <van-popup v-model:show="showTypePicker" position="bottom" round>
      <van-picker
        :columns="typeOptions"
        @confirm="onTypeConfirm"
        @cancel="showTypePicker = false"
      />
    </van-popup>

    <!-- 举报详情弹窗 -->
    <ReportDetailPopup
      v-model="showDetailPopup"
      :current-report="currentReport"
      :format-full-time="formatFullTime"
      :get-type-tag-type="getTypeTagType"
      :get-status-tag-type="getStatusTagType"
      @close="closeDetailPopup"
    />
  </div>
</template>

<script setup>
  import { onMounted } from 'vue';
  import { Popup as VanPopup, Picker as VanPicker } from 'vant';
  import { useReport } from './hooks/useReport';
  import ReportIntro from './components/ReportIntro.vue';
  import ReportForm from './components/ReportForm.vue';
  import ReportHistory from './components/ReportHistory.vue';
  import ReportDetailPopup from './components/ReportDetailPopup.vue';

  // 使用 hook 获取所有状态和方法
  const {
    showTypePicker,
    showDetailPopup,
    submitting,
    fileList,
    currentReport,
    reportList,
    formData,
    typeOptions,
    formatTime,
    formatFullTime,
    getTypeTagType,
    getStatusTagType,
    loadReportList,
    onTypeConfirm,
    afterRead,
    onSubmit,
    showReportDetail,
    closeDetailPopup,
  } = useReport();

  // ========================================
  // 生命周期
  // ========================================
  onMounted(() => {
    loadReportList();
  });
</script>

<style lang="less" scoped>
  .report-page {
    min-height: 100%;
    background: var(--color-bg-primary);
    padding-bottom: var(--spacing-lg);
  }
</style>
