<template>
  <div class="feedback-page">
    <IntroCard
      icon="edit"
      icon-color="var(--color-primary)"
      :title="t('help.feedback.title')"
      :description="t('help.feedback.description')"
    />

    <FeedbackForm :submitting="submitting" @submit="onSubmit" />

    <RecordHistory
      :title="t('help.feedback.myFeedback')"
      :record-list="feedbackList"
      :empty-text="t('help.feedback.noFeedback')"
      preview-field="description"
      :get-status-tag-type="getStatusTagType"
      @view-detail="showFeedbackDetail"
    />

    <DetailPopup
      v-model:show="showDetailPopup"
      :record="currentFeedback"
      :title="t('help.feedback.feedbackDetail')"
      :type-label="t('help.feedback.feedbackType')"
      :description-label="t('help.feedback.descriptionLabel')"
      :reply-label="t('help.feedback.reply')"
      :images-label="t('help.feedback.uploadImages')"
      :get-type-tag-type="getTypeTagType"
      :get-status-tag-type="getStatusTagType"
    />
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import IntroCard from '../components/IntroCard.vue';
  import RecordHistory from '../components/RecordHistory.vue';
  import DetailPopup from '../components/DetailPopup.vue';
  import FeedbackForm from './components/FeedbackForm.vue';

  const { t } = useI18n();

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
    try {
      localStorage.setItem('feedbackList', JSON.stringify(feedbackList.value));
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.warn('LocalStorage quota exceeded, clearing oldest records...');
        while (feedbackList.value.length > 0) {
          feedbackList.value.pop();
          try {
            localStorage.setItem('feedbackList', JSON.stringify(feedbackList.value));
          } catch (e) {}
        }
      } else {
        console.error('Failed to save feedback list:', error);
      }
    }
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
        statusText: t('help.feedback.status.pending'),
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

  const typeTagMapping = computed(() => ({
    [t('help.feedback.typeOptions.featureSuggestion')]: 'primary',
    [t('help.feedback.typeOptions.bugReport')]: 'danger',
    [t('help.feedback.typeOptions.experienceImprovement')]: 'success',
    [t('help.feedback.typeOptions.contentIssue')]: 'warning',
    [t('help.feedback.typeOptions.other')]: 'default',
  }));

  const getTypeTagType = type => {
    return typeTagMapping.value[type] || 'default';
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
