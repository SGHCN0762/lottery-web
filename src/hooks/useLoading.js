import { showLoadingToast, closeToast } from 'vant';
import { ref, watch } from 'vue';

export const useLoading = () => {
  const loading = ref(false);

  watch(loading, val => {
    if (val) {
      showLoadingToast({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
    } else {
      closeToast();
    }
  });

  return {
    loading,
  };
};
