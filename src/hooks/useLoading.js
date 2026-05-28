import { showLoadingToast, closeToast } from 'vant';
import { ref } from 'vue';

export const useLoading = () => {
  const loading = ref(false);

  const setLoading = (val) => {
    loading.value = val;
    if (val) {
      showLoadingToast({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
    } else {
      closeToast();
    }
  };

  return {
    loading,
    setLoading,
  };
};
