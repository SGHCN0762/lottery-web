<template>
  <div class="report-page">
    <div class="page-content">
      <IntroCard
        icon="warning-o"
        icon-color="var(--color-danger)"
        :title="t('help.report.title')"
        :description="t('help.report.description')"
      />

    <ReportForm
      :form-data="formData"
      :file-list="fileList"
      :submitting="submitting"
      @submit="onSubmit"
      @type-picker-open="showTypePicker = true"
      @after-read="afterRead"
      @update:form-data="value => Object.assign(formData, value)"
      @update:file-list="value => fileList.splice(0, fileList.length, ...value)"
    />

    <RecordHistory
      :title="t('help.report.myReports')"
      :record-list="reportList"
      :empty-text="t('help.report.noReports')"
      preview-field="reason"
      :get-status-tag-type="getStatusTagType"
      @view-detail="showReportDetail"
    />

    <van-popup v-model:show="showTypePicker" position="bottom" round>
      <van-picker
        :columns="typeOptions"
        @confirm="onTypeConfirm"
        @cancel="showTypePicker = false"
      />
    </van-popup>

    <DetailPopup
        v-model:show="showDetailPopup"
        :record="currentReport"
        :title="t('help.report.reportDetail')"
        :type-label="t('help.report.reportType')"
        :target-label="t('help.report.target')"
        :description-label="t('help.report.reason')"
        :reply-label="t('help.report.processedResult')"
        :images-label="t('help.report.uploadEvidence')"
        :show-target="true"
        :get-type-tag-type="getTypeTagType"
        :get-status-tag-type="getStatusTagType"
        @close="closeDetailPopup"
      />
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { Popup as VanPopup, Picker as VanPicker } from 'vant';
  import { useReport } from './hooks/useReport';
  import IntroCard from '../components/IntroCard.vue';
  import RecordHistory from '../components/RecordHistory.vue';
  import DetailPopup from '../components/DetailPopup.vue';
  import ReportForm from './components/ReportForm.vue';

  const { t } = useI18n();

  const {
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
    onTypeConfirm,
    afterRead,
    onSubmit,
    showReportDetail,
    closeDetailPopup,
  } = useReport();

  onMounted(() => {
    loadReportList();
  });
</script>

<style lang="less" scoped>
  .report-page {
    min-height: 100%;
    background: var(--color-bg-primary);
  }

  .page-content {
    padding-top: calc(var(--spacing-sm) + env(safe-area-inset-top, 0px));
    padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom, 0px));
    display: flow-root;
  }
</style>
