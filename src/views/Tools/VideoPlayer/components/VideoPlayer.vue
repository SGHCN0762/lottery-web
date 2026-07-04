<template>
  <div class="video-player-container" ref="containerRef">
    <div class="video-wrapper" @click="togglePlay" @mousemove="handleMouseMove">
      <video
        ref="videoRef"
        :poster="currentVideo?.poster"
        @timeupdate="handleTimeUpdate"
        @loadedmetadata="handleLoadedMetadata"
        @ended="handleVideoEnded"
        @pause="isPlaying = false"
        @play="isPlaying = true"
        @error="handleVideoError"
        @progress="handleProgress"
        @waiting="isBuffering = true"
        @playing="isBuffering = false"
        @seeking="isBuffering = true"
        @seeked="isBuffering = false"
        class="video-element"
        :class="{ 'video-playing': isPlaying }"
        preload="auto"
      ></video>

      <div class="video-overlay" :class="{ 'overlay-hidden': isPlaying && !showControls }">
        <div class="play-button" v-if="!isPlaying && !isBuffering && !hasError && !isDownloading">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        <div class="download-progress" v-else-if="isDownloading">
          <div class="progress-circle">
            <svg viewBox="0 0 50 50">
              <circle class="progress-bg" cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle>
              <circle 
                class="progress-fill" 
                cx="25" cy="25" r="20" fill="none" stroke-width="4"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="progressOffset"
              ></circle>
            </svg>
            <span class="progress-text">{{ downloadProgress }}%</span>
          </div>
          <p class="progress-label">正在下载视频切片 {{ downloadedCount }}/{{ totalSegments }}</p>
        </div>
        <div class="loading-spinner" v-else-if="isBuffering">
          <svg viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="4"></circle>
          </svg>
        </div>
        <div class="error-state" v-else-if="hasError">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <p>{{ errorMessage }}</p>
          <button class="retry-btn" @click="loadVideo">重试</button>
        </div>
      </div>

      <div class="controls-bar" :class="{ 'controls-hidden': !showControls && isPlaying }">
        <div class="controls-left">
          <button class="control-btn play-btn" @click.stop="togglePlay">
            <svg v-if="!isPlaying" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          </button>

          <div class="time-display">
            <span class="current-time">{{ formatTime(currentTime) }}</span>
            <span class="time-separator">/</span>
            <span class="total-time">{{ formatTime(duration) }}</span>
          </div>
        </div>

        <div class="controls-center">
          <div
            class="progress-bar-wrapper"
            @click.stop="seekTo"
            @mousedown.stop="startDrag"
            @touchstart.stop="startDrag"
          >
            <div class="progress-bar">
              <div class="progress-buffered" :style="{ width: bufferedPercent + '%' }"></div>
              <div class="progress-played" :style="{ width: progressPercent + '%' }"></div>
              <div class="progress-thumb" :style="{ left: progressPercent + '%' }"></div>
            </div>
            <div class="segment-markers" v-if="isSlicedVideo">
              <div
                v-for="(marker, index) in segmentMarkers"
                :key="index"
                class="segment-marker"
                :style="{ left: marker + '%' }"
              ></div>
            </div>
          </div>
        </div>

        <div class="controls-right">
          <div class="volume-control" @click.stop>
            <button class="control-btn volume-btn" @click="toggleMute">
              <svg v-if="isMuted || volume === 0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
              <svg v-else-if="volume < 0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            </button>
            <div class="volume-slider" @click="setVolume">
              <div class="volume-track">
                <div class="volume-fill" :style="{ width: (isMuted ? 0 : volume) * 100 + '%' }"></div>
                <div class="volume-thumb" :style="{ left: (isMuted ? 0 : volume) * 100 + '%' }"></div>
              </div>
            </div>
          </div>

          <button class="control-btn speed-btn" @click.stop="toggleSpeedMenu">
            <span>{{ currentSpeed }}x</span>
          </button>

          <button class="control-btn pip-btn" @click.stop="togglePip" v-if="supportsPip">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H8v-2h8v2zm3-4H8v-2h11v2zm0-4H8V7h11v2z"/>
            </svg>
          </button>

          <button class="control-btn fullscreen-btn" @click.stop="toggleFullscreen">
            <svg v-if="!isFullscreen" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="keyboard-hints" v-if="showControls">
        <span class="hint-item"><kbd>空格</kbd> 播放</span>
        <span class="hint-item"><kbd>←→</kbd> 快进</span>
        <span class="hint-item"><kbd>↑↓</kbd> 音量</span>
        <span class="hint-item"><kbd>F</kbd> 全屏</span>
      </div>
    </div>

    <div class="speed-menu" v-if="showSpeedMenu" @click.stop="toggleSpeedMenu">
      <button
        v-for="speed in speedOptions"
        :key="speed"
        class="speed-option"
        :class="{ 'speed-active': currentSpeed === speed }"
        @click="setSpeed(speed)"
      >
        {{ speed }}x
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  currentVideo: {
    type: Object,
    default: null
  },
  autoplay: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['videoEnded', 'timeUpdate', 'videoError']);

const videoRef = ref(null);
const containerRef = ref(null);
const isPlaying = ref(false);
const isBuffering = ref(false);
const showControls = ref(true);
const showSpeedMenu = ref(false);
const isFullscreen = ref(false);
const isMuted = ref(false);
const isPip = ref(false);
const volume = ref(0.8);
const currentSpeed = ref(1);
const currentTime = ref(0);
const duration = ref(0);
const bufferedPercent = ref(0);
const hasError = ref(false);
const isDragging = ref(false);
const errorMessage = ref('视频加载失败');

const isDownloading = ref(false);
const downloadProgress = ref(0);
const downloadedCount = ref(0);
const totalSegments = ref(0);
const segmentBlobs = ref([]);
const mediaSource = ref(null);
const sourceBuffer = ref(null);
const queuedSegments = ref([]);
const appendingSegment = ref(false);
const segmentDurations = ref([]);
const segmentStartTimes = ref([]);

const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

const circumference = 2 * Math.PI * 20;
const progressOffset = computed(() => {
  return circumference - (downloadProgress.value / 100) * circumference;
});

const supportsPip = computed(() => {
  return document.pictureInPictureEnabled;
});

const isSlicedVideo = computed(() => {
  return props.currentVideo?.segments && props.currentVideo.segments.length > 0;
});

const segmentMarkers = computed(() => {
  if (!isSlicedVideo.value || segmentStartTimes.value.length === 0 || duration.value === 0) {
    return [];
  }
  return segmentStartTimes.value.map(startTime => (startTime / duration.value) * 100);
});

const progressPercent = computed(() => {
  if (duration.value === 0) return 0;
  return (currentTime.value / duration.value) * 100;
});

const formatTime = (seconds) => {
  if (isNaN(seconds) || !isFinite(seconds)) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const togglePlay = () => {
  if (!videoRef.value) return;
  if (isPlaying.value) {
    videoRef.value.pause();
  } else {
    videoRef.value.play();
  }
};

const handleTimeUpdate = () => {
  if (videoRef.value) {
    currentTime.value = videoRef.value.currentTime;
    emit('timeUpdate', currentTime.value);
  }
};

const handleLoadedMetadata = () => {
  if (videoRef.value) {
    duration.value = videoRef.value.duration;
    hasError.value = false;
    isBuffering.value = false;

    if (props.autoplay) {
      videoRef.value.play().catch(e => {
        console.error('Auto play failed:', e);
      });
    }
  }
};

const handleVideoEnded = () => {
  isPlaying.value = false;
  emit('videoEnded');
};

const handleVideoError = (e) => {
  hasError.value = true;
  isBuffering.value = false;
  isDownloading.value = false;
  errorMessage.value = '视频播放失败';
  console.error('Video error:', e);
  emit('videoError');
};

const handleProgress = () => {
  if (videoRef.value && videoRef.value.buffered.length > 0) {
    const bufferedEnd = videoRef.value.buffered.end(videoRef.value.buffered.length - 1);
    bufferedPercent.value = (bufferedEnd / duration.value) * 100;
  }
};

const seekTo = (e) => {
  if (!videoRef.value || duration.value === 0) return;
  const rect = e.currentTarget.getBoundingClientRect();
  const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  videoRef.value.currentTime = percent * duration.value;
};

const startDrag = (e) => {
  isDragging.value = true;
  window.addEventListener('mousemove', handleDrag);
  window.addEventListener('mouseup', stopDrag);
  window.addEventListener('touchmove', handleDrag);
  window.addEventListener('touchend', stopDrag);
  seekTo(e);
};

const handleDrag = (e) => {
  if (!isDragging.value || !videoRef.value || duration.value === 0) return;
  const rect = videoRef.value.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  videoRef.value.currentTime = percent * duration.value;
};

const stopDrag = () => {
  isDragging.value = false;
  window.removeEventListener('mousemove', handleDrag);
  window.removeEventListener('mouseup', stopDrag);
  window.removeEventListener('touchmove', handleDrag);
  window.removeEventListener('touchend', stopDrag);
};

const toggleMute = () => {
  if (!videoRef.value) return;
  isMuted.value = !isMuted.value;
  videoRef.value.muted = isMuted.value;
};

const setVolume = (e) => {
  if (!videoRef.value) return;
  const rect = e.currentTarget.getBoundingClientRect();
  const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  volume.value = percent;
  videoRef.value.volume = volume.value;
  isMuted.value = volume.value === 0;
};

const toggleSpeedMenu = () => {
  showSpeedMenu.value = !showSpeedMenu.value;
};

const setSpeed = (speed) => {
  if (!videoRef.value) return;
  currentSpeed.value = speed;
  videoRef.value.playbackRate = speed;
  showSpeedMenu.value = false;
};

const togglePip = async () => {
  if (!videoRef.value) return;
  try {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else {
      await videoRef.value.requestPictureInPicture();
    }
  } catch (e) {
    console.error('Picture-in-picture error:', e);
  }
};

const toggleFullscreen = async () => {
  if (!containerRef.value) return;
  try {
    if (!document.fullscreenElement) {
      await containerRef.value.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (e) {
    console.error('Fullscreen error:', e);
  }
};

const handleKeydown = (e) => {
  if (!videoRef.value) return;
  const target = e.target;
  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
  
  switch (e.code) {
    case 'Space':
      e.preventDefault();
      togglePlay();
      break;
    case 'ArrowLeft':
      e.preventDefault();
      videoRef.value.currentTime = Math.max(0, videoRef.value.currentTime - 10);
      break;
    case 'ArrowRight':
      e.preventDefault();
      videoRef.value.currentTime = Math.min(duration.value, videoRef.value.currentTime + 10);
      break;
    case 'ArrowUp':
      e.preventDefault();
      volume.value = Math.min(1, volume.value + 0.1);
      videoRef.value.volume = volume.value;
      isMuted.value = false;
      break;
    case 'ArrowDown':
      e.preventDefault();
      volume.value = Math.max(0, volume.value - 0.1);
      videoRef.value.volume = volume.value;
      isMuted.value = volume.value === 0;
      break;
    case 'KeyF':
      e.preventDefault();
      toggleFullscreen();
      break;
    case 'KeyP':
      e.preventDefault();
      togglePlay();
      break;
    case 'KeyM':
      e.preventDefault();
      toggleMute();
      break;
  }
};

const handleMouseMove = () => {
  if (isPlaying.value) {
    startControlsTimer();
  }
};

let controlsTimeout = null;
const startControlsTimer = () => {
  if (controlsTimeout) clearTimeout(controlsTimeout);
  showControls.value = true;
  controlsTimeout = setTimeout(() => {
    if (isPlaying.value) {
      showControls.value = false;
    }
  }, 3000);
};

const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement;
};

const handlePipChange = () => {
  isPip.value = !!document.pictureInPictureElement;
};

const fetchSegment = async (url, index) => {
  try {
    console.log(`Fetching segment ${index}:`, url);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch segment ${index}: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    console.log(`Segment ${index} downloaded, size:`, arrayBuffer.byteLength);
    downloadedCount.value++;
    downloadProgress.value = Math.round((downloadedCount.value / totalSegments.value) * 100);
    return { index, arrayBuffer };
  } catch (error) {
    console.error(`Failed to fetch segment ${index}:`, error);
    throw error;
  }
};

const estimateSegmentDurations = async (segments) => {
  const durations = [];
  for (let i = 0; i < segments.length; i++) {
    durations.push(30);
  }
  return durations;
};

const initMediaSource = () => {
  return new Promise((resolve, reject) => {
    const ms = new MediaSource();
    mediaSource.value = ms;
    
    ms.addEventListener('sourceopen', () => {
      try {
        const mime = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
        if (MediaSource.isTypeSupported(mime)) {
          const sb = ms.addSourceBuffer(mime);
          sourceBuffer.value = sb;
          
          sb.addEventListener('updateend', () => {
            appendingSegment.value = false;
            processQueuedSegments();
          });
          
          sb.addEventListener('error', (e) => {
            console.error('SourceBuffer error:', e);
            reject(new Error('SourceBuffer error'));
          });
          
          resolve();
        } else {
          reject(new Error('MIME type not supported'));
        }
      } catch (e) {
        console.error('Failed to create SourceBuffer:', e);
        reject(e);
      }
    });
    
    ms.addEventListener('error', (e) => {
      console.error('MediaSource error:', e);
      reject(new Error('MediaSource error'));
    });
    
    videoRef.value.src = URL.createObjectURL(ms);
  });
};

const processQueuedSegments = () => {
  if (!sourceBuffer.value || appendingSegment.value || queuedSegments.value.length === 0) {
    return;
  }
  
  if (sourceBuffer.value.updating) {
    return;
  }
  
  const nextSegment = queuedSegments.value.shift();
  if (nextSegment) {
    appendingSegment.value = true;
    try {
      sourceBuffer.value.appendBuffer(nextSegment);
    } catch (e) {
      console.error('Failed to append buffer:', e);
      appendingSegment.value = false;
    }
  }
};

const loadAllSegments = async () => {
  console.log('loadAllSegments called', props.currentVideo?.segments);
  if (!props.currentVideo?.segments || props.currentVideo.segments.length === 0) {
    console.log('No segments found');
    return;
  }

  isDownloading.value = true;
  hasError.value = false;
  downloadProgress.value = 0;
  downloadedCount.value = 0;
  totalSegments.value = props.currentVideo.segments.length;
  queuedSegments.value = [];
  appendingSegment.value = false;

  try {
    console.log('Estimating segment durations...');
    segmentDurations.value = await estimateSegmentDurations(props.currentVideo.segments);
    
    let total = 0;
    segmentStartTimes.value = segmentDurations.value.map(duration => {
      const start = total;
      total += duration;
      return start;
    });
    duration.value = total;
    console.log('Estimated duration:', duration.value);

    console.log('Initializing MediaSource...');
    await initMediaSource();

    console.log('Starting concurrent download of', props.currentVideo.segments.length, 'segments');
    const fetchPromises = props.currentVideo.segments.map((url, index) => 
      fetchSegment(url, index)
    );

    const results = await Promise.all(fetchPromises);
    console.log('All segments downloaded', results.length);
    
    results.sort((a, b) => a.index - b.index);
    
    queuedSegments.value = results.map(r => r.arrayBuffer);
    console.log('Segments queued, starting append');
    
    processQueuedSegments();

  } catch (error) {
    console.error('Failed to load segments:', error);
    hasError.value = true;
    errorMessage.value = '视频下载失败';
  } finally {
    isDownloading.value = false;
  }
};

const loadVideo = () => {
  if (videoRef.value?.src) {
    videoRef.value.src = '';
  }
  
  if (mediaSource.value) {
    try {
      mediaSource.value.endOfStream();
    } catch (e) {
      console.log('MediaSource already ended');
    }
    mediaSource.value = null;
  }
  
  if (sourceBuffer.value) {
    sourceBuffer.value = null;
  }
  
  queuedSegments.value = [];
  appendingSegment.value = false;
  segmentDurations.value = [];
  segmentStartTimes.value = [];
  
  loadAllSegments();
};

watch(() => props.currentVideo, (newVideo) => {
  console.log('watch currentVideo changed', newVideo);
  if (newVideo) {
    currentTime.value = 0;
    duration.value = 0;
    bufferedPercent.value = 0;
    hasError.value = false;
    isBuffering.value = false;
    isPlaying.value = false;
    
    if (videoRef.value?.src) {
      videoRef.value.src = '';
    }
    
    if (mediaSource.value) {
      try {
        mediaSource.value.endOfStream();
      } catch (e) {
        console.log('MediaSource already ended');
      }
      mediaSource.value = null;
    }
    
    sourceBuffer.value = null;
    queuedSegments.value = [];
    appendingSegment.value = false;
    segmentDurations.value = [];
    segmentStartTimes.value = [];

    if (newVideo.segments && newVideo.segments.length > 0) {
      console.log('Found segments, calling loadAllSegments');
      console.log('videoRef exists:', !!videoRef.value);
      if (videoRef.value) {
        loadAllSegments();
      } else {
        console.warn('videoRef not available, waiting...');
        setTimeout(() => {
          if (videoRef.value) {
            loadAllSegments();
          }
        }, 100);
      }
    } else if (newVideo.url) {
      if (videoRef.value) {
        videoRef.value.src = newVideo.url;
      }
    }
  }
});

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
  document.addEventListener('mozfullscreenchange', handleFullscreenChange);
  document.addEventListener('pictureinpicturechange', handlePipChange);
  
  if (props.currentVideo && props.currentVideo.segments && props.currentVideo.segments.length > 0) {
    console.log('onMounted: Found segments, calling loadAllSegments');
    loadAllSegments();
  }
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
  document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
  document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
  document.removeEventListener('pictureinpicturechange', handlePipChange);
  
  if (controlsTimeout) clearTimeout(controlsTimeout);
  stopDrag();
  
  if (videoRef.value?.src) {
    videoRef.value.src = '';
  }
  
  if (mediaSource.value) {
    try {
      mediaSource.value.endOfStream();
    } catch (e) {
      console.log('MediaSource already ended');
    }
  }
});

defineExpose({
  play: () => videoRef.value?.play(),
  pause: () => videoRef.value?.pause(),
  seek: (time) => { if (videoRef.value) videoRef.value.currentTime = time; },
  getCurrentTime: () => currentTime.value,
  getDuration: () => duration.value
});
</script>

<style lang="less" scoped>
.video-player-container {
  width: 100%;
  background: #000;
  border-radius: var(--radius-lg);
  overflow: hidden;
  position: relative;
  box-shadow: var(--shadow-lg);
}

.video-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  cursor: pointer;
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  transition: opacity var(--transition-base);
}

.overlay-hidden {
  opacity: 0;
  pointer-events: none;
}

.play-button {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  font-size: 24px;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-lg);

  svg {
    width: 32px;
    height: 32px;
    margin-left: 4px;
  }

  &:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 1);
  }
}

.download-progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
}

.progress-circle {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-circle svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-bg {
  stroke: rgba(255, 255, 255, 0.2);
}

.progress-fill {
  stroke: var(--color-primary);
  stroke-linecap: round;
  transition: stroke-dashoffset var(--transition-base);
}

.progress-text {
  position: absolute;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  font-family: var(--font-family-mono);
}

.progress-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: var(--font-size-sm);
  margin: 0;
}

.loading-spinner {
  width: 50px;
  height: 50px;

  svg {
    width: 100%;
    height: 100%;
    animation: spin 1s linear infinite;
  }

  .path {
    stroke: var(--color-primary);
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  to {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
  color: rgba(255, 255, 255, 0.8);

  svg {
    width: 48px;
    height: 48px;
  }

  p {
    margin: 0;
    font-size: var(--font-size-sm);
  }

  .retry-btn {
    margin-top: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-lg);
    background: var(--color-primary);
    color: #fff;
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-size: var(--font-size-sm);
    transition: background var(--transition-fast);

    &:hover {
      background: var(--color-primary-dark);
    }
  }
}

.controls-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--spacing-md) var(--spacing-lg);
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.6), transparent);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  transition: opacity var(--transition-base);
}

.controls-hidden {
  opacity: 0;
  pointer-events: none;
}

.controls-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex-shrink: 0;
}

.control-btn {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: var(--radius-sm);
  transition: background var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  svg {
    width: 20px;
    height: 20px;
  }
}

.time-display {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-size-xs);
  color: #fff;
  font-family: var(--font-family-mono);

  .time-separator {
    color: rgba(255, 255, 255, 0.6);
  }
}

.controls-center {
  flex: 1;
  min-width: 0;
}

.progress-bar-wrapper {
  height: 6px;
  cursor: pointer;
  padding: 8px 0;
  position: relative;
}

.progress-bar {
  position: relative;
  height: 6px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  overflow: visible;
}

.progress-buffered {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 3px;
}

.progress-played {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: var(--color-primary);
  border-radius: 3px;
  transition: width var(--transition-fast);
}

.progress-thumb {
  position: absolute;
  top: 50%;
  width: 14px;
  height: 14px;
  background: #fff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: var(--shadow-sm);
  opacity: 0;
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.progress-bar-wrapper:hover .progress-thumb,
.progress-bar-wrapper:active .progress-thumb {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.2);
}

.segment-markers {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 6px;
  transform: translateY(-50%);
  pointer-events: none;
}

.segment-marker {
  position: absolute;
  top: 0;
  width: 2px;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  transform: translateX(-50%);
}

.controls-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-shrink: 0;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.volume-slider {
  width: 60px;
  height: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.volume-control:hover .volume-slider {
  opacity: 1;
}

.volume-track {
  position: relative;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.volume-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #fff;
  border-radius: 2px;
}

.volume-thumb {
  position: absolute;
  top: 50%;
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.speed-btn span {
  font-size: var(--font-size-xs);
  color: #fff;
}

.speed-menu {
  position: absolute;
  bottom: 100%;
  right: 60px;
  background: rgba(0, 0, 0, 0.95);
  border-radius: var(--radius-md);
  padding: var(--spacing-xs);
  margin-bottom: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  gap: 2px;
  box-shadow: var(--shadow-lg);
}

.speed-option {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: var(--font-size-sm);
  cursor: pointer;
  border-radius: var(--radius-sm);
  text-align: left;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }

  &.speed-active {
    background: var(--color-primary);
    color: #fff;
  }
}

.keyboard-hints {
  position: absolute;
  bottom: 80px;
  left: var(--spacing-lg);
  display: flex;
  gap: var(--spacing-lg);
  font-size: var(--font-size-xs);
  color: rgba(255, 255, 255, 0.6);

  .hint-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  kbd {
    padding: 2px 6px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 3px;
    font-family: var(--font-family-mono);
    font-size: var(--font-size-xs);
    color: rgba(255, 255, 255, 0.8);
  }
}

.video-playing {
  cursor: none;
}

.video-playing:hover {
  cursor: pointer;
}

@media (max-width: 768px) {
  .keyboard-hints {
    display: none;
  }

  .volume-slider {
    display: none;
  }
}
</style>