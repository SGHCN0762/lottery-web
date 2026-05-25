<template>
  <div class="report-page">
    <IntroCard
      icon="warning-o"
      icon-color="var(--color-danger)"
      title="违规举报"
      description="如发现违规行为或不良内容，请及时向我们举报，我们将尽快处理"
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
      title="我的举报记录"
      :record-list="reportList"
      empty-text="暂无举报记录"
      preview-field="reason"
      :get-type-tag-type="getTypeTagType"
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
      title="举报详情"
      type-label="举报类型"
      target-label="被举报对象"
      description-label="举报原因"
      reply-label="处理结果"
      images-label="证据截图"
      :show-target="true"
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
  import IntroCard from '../components/IntroCard.vue';
  import RecordHistory from '../components/RecordHistory.vue';
  import DetailPopup from '../components/DetailPopup.vue';
  import ReportForm from './components/ReportForm.vue';

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
    padding-bottom: var(--spacing-lg);
  }
</style>
