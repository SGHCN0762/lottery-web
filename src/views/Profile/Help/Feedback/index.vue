<template>
  <div class="feedback-page">
    <IntroCard
      icon="edit"
      icon-color="var(--color-primary)"
      title="意见反馈"
      description="您的建议对我们非常重要，请告诉我们如何改进产品体验"
    />

    <FeedbackForm :submitting="submitting" @submit="onSubmit" />

    <RecordHistory
      title="我的反馈记录"
      :record-list="feedbackList"
      empty-text="暂无反馈记录"
      preview-field="description"
      :get-type-tag-type="getTypeTagType"
      :get-status-tag-type="getStatusTagType"
      @view-detail="showFeedbackDetail"
    />

    <DetailPopup
      v-model:show="showDetailPopup"
      :record="currentFeedback"
      title="反馈详情"
      type-label="反馈类型"
      description-label="问题描述"
      reply-label="官方回复"
      images-label="上传截图"
      :get-type-tag-type="getTypeTagType"
      :get-status-tag-type="getStatusTagType"
    />
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import dayjs from 'dayjs';
  import IntroCard from '../components/IntroCard.vue';
  import RecordHistory from '../components/RecordHistory.vue';
  import DetailPopup from '../components/DetailPopup.vue';
  import FeedbackForm from './components/FeedbackForm.vue';

  const showDetailPopup = ref(false);
  const submitting = ref(false);
  const currentFeedback = ref(null);
  const feedbackList = ref([]);

  const loadFeedbackList = () => {
    const stored = localStorage.getItem('feedbackList');
    if (stored) {
      feedbackList.value = JSON.parse(stored);
    }
  };

  const saveFeedbackList = () => {
    localStorage.setItem('feedbackList', JSON.stringify(feedbackList.value));
  };

  const onSubmit = async (formData, fileList) => {
    submitting.value = true;

    setTimeout(() => {
      const newFeedback = {
        id: Date.now(),
        type: formData.type,
        description: formData.description,
        contact: formData.contact,
        images: fileList.map(f => f.content || f.url),
        status: 'pending',
        statusText: '待处理',
        time: Date.now(),
        reply: '',
      };

      feedbackList.value.unshift(newFeedback);
      saveFeedbackList();

      submitting.value = false;
    }, 1500);
  };

  const showFeedbackDetail = item => {
    currentFeedback.value = item;
    showDetailPopup.value = true;
  };

  const getTypeTagType = type => {
    const types = {
      功能建议: 'primary',
      Bug反馈: 'danger',
      体验优化: 'success',
      内容问题: 'warning',
      其他: 'default',
    };
    return types[type] || 'default';
  };

  const getStatusTagType = status => {
    const types = {
      pending: 'warning',
      processing: 'primary',
      resolved: 'success',
      closed: 'default',
    };
    return types[status] || 'default';
  };

  onMounted(() => {
    loadFeedbackList();
  });
</script>

<style lang="less" scoped>
  .feedback-page {
    min-height: 100%;
    background: var(--color-bg-primary);
    padding-bottom: var(--spacing-lg);
  }
</style>
