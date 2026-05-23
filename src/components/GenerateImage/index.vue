<template>
  <van-icon name="photo-o" @click="handleSaveImage" v-bind="iconProps" />
</template>

<script setup>
  import dayjs from 'dayjs';
  import { useSaveImage } from '@/hooks/useSaveImage';
  import { useLoading } from '@/hooks/useLoading';

  const props = defineProps({
    pageRef: {
      type: Object,
      required: true,
    },
    iconProps: {
      type: Object,
      default: () => ({}),
    },
  });

  const { loading } = useLoading();
  const { saveImage } = useSaveImage();
  const handleSaveImage = async () => {
    if (!props.pageRef) return;
    console.log(props.pageRef);

    loading.value = true;
    try {
      await saveImage(props.pageRef, {
        filename: `image_${dayjs().unix()}`,
        type: 'png',
        quality: 0.95,
      });
    } catch (err) {
      console.error('保存图片失败:', err);
    } finally {
      loading.value = false;
    }
  };
</script>
