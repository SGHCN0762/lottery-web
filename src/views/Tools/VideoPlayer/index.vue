<template>
  <VideoList :videos="videos" :selected-video="null" @select="handleVideoSelect" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import VideoList from './components/VideoList.vue';

const router = useRouter();

const videos = ref([]);

const videoData = [
  {
    id: 1,
    title: '数量组合刷题一',
    description: '行测数量关系刷题视频，共11个切片，讲解数量组合相关题目',
    poster:
      'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=公务员考试行测数量关系数学公式视频封面，数字计算风格，专业教育风格&image_size=landscape_16_9',
    category: 'xingce',
    duration: '',
    views: '0',
    segments: [
      'https://cdn.jsdelivr.net/gh/SGHCN0762/video-quantitative-relationship-1@v1.0.1/数量组合刷题一/1.mp4',
      'https://cdn.jsdelivr.net/gh/SGHCN0762/video-quantitative-relationship-1@v1.0.1/数量组合刷题一/2.mp4',
      'https://cdn.jsdelivr.net/gh/SGHCN0762/video-quantitative-relationship-1@v1.0.1/数量组合刷题一/3.mp4',
      'https://cdn.jsdelivr.net/gh/SGHCN0762/video-quantitative-relationship-1@v1.0.1/数量组合刷题一/4.mp4',
      'https://cdn.jsdelivr.net/gh/SGHCN0762/video-quantitative-relationship-1@v1.0.1/数量组合刷题一/5.mp4',
      'https://cdn.jsdelivr.net/gh/SGHCN0762/video-quantitative-relationship-1@v1.0.1/数量组合刷题一/6.mp4',
      'https://cdn.jsdelivr.net/gh/SGHCN0762/video-quantitative-relationship-1@v1.0.1/数量组合刷题一/7.mp4',
      'https://cdn.jsdelivr.net/gh/SGHCN0762/video-quantitative-relationship-1@v1.0.1/数量组合刷题一/8.mp4',
      'https://cdn.jsdelivr.net/gh/SGHCN0762/video-quantitative-relationship-1@v1.0.1/数量组合刷题一/9.mp4',
      'https://cdn.jsdelivr.net/gh/SGHCN0762/video-quantitative-relationship-1@v1.0.1/数量组合刷题一/10.mp4',
      'https://cdn.jsdelivr.net/gh/SGHCN0762/video-quantitative-relationship-1@v1.0.1/数量组合刷题一/11.mp4',
    ],
  },
];

const handleVideoSelect = video => {
  router.push(`/tools/video-player/play/${video.id}`);
};

onMounted(() => {
  videos.value = videoData;
});
</script>