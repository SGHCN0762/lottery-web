<template>
  <div class="turntable" :class="{ 'is-playing': isPlaying }">
    <!-- 大型加载区域 - 放在最显眼位置 -->
    <label v-if="!hasTrack" class="big-load-btn">
      <input type="file" accept="audio/*" @change="onFileSelect" hidden />
      <span class="big-plus">+</span>
      <span class="big-text">点击加载音乐到 {{ deckId }} 轨</span>
    </label>

    <template v-else>
      <!-- 转盘底座 -->
      <div class="turntable-base">
        <!-- 唱片 -->
        <div
          class="vinyl"
          :class="{ spinning: isPlaying }"
          :style="{ animationDuration: rotationDuration }"
        >
          <div class="vinyl-label">
            <span class="deck-label">{{ deckId }}</span>
          </div>
          <div class="vinyl-grooves"></div>
        </div>

        <!-- 中心点 -->
        <div class="turntable-center">
          <div class="center-dot"></div>
        </div>

        <!-- 播放按钮 -->
        <button class="play-btn" @click="togglePlay" :class="{ playing: isPlaying }">
          <span class="play-icon" v-if="!isPlaying"></span>
          <span class="pause-icon" v-else></span>
        </button>

        <!-- 切换音乐按钮 -->
        <label class="switch-btn">
          <input type="file" accept="audio/*" @change="onFileSelect" hidden />
          <span>↻</span>
        </label>
      </div>

      <!-- 曲目信息 -->
      <div class="track-info">
        <div class="track-name">{{ trackName || 'Drop a track' }}</div>
        <div class="track-time">
          <span>{{ formatTime(currentTime) }}</span>
          <span class="separator">/</span>
          <span>{{ formatTime(duration) }}</span>
        </div>
      </div>

      <!-- 进度条 -->
      <div class="progress-container">
        <div class="progress-bar" @click="onProgressClick">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
          <div class="progress-head" :style="{ left: progressPercent + '%' }"></div>
        </div>
      </div>

      <!-- 转速控制 -->
      <div class="pitch-control">
        <span class="pitch-label">转速</span>
        <input
          type="range"
          class="pitch-slider"
          min="-50"
          max="50"
          :value="pitch"
          @input="onPitchChange"
        />
        <span class="pitch-value" :class="{ positive: pitch > 0, negative: pitch < 0 }">
          {{ pitch > 0 ? '+' : '' }}{{ pitch }}%
        </span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAudioEngine } from '../composables/useAudioEngine'

const props = defineProps({
  deckId: {
    type: String,
    default: 'A',
  },
  isActive: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['load-track', 'play', 'pause', 'seek', 'pitch-change'])

const { deckAState, deckBState, play, pause, seek, setPitch } = useAudioEngine()

const deckState = computed(() => (props.deckId === 'A' ? deckAState.value : deckBState.value))

const isPlaying = computed(() => deckState.value.isPlaying)
const currentTime = computed(() => deckState.value.currentTime)
const duration = computed(() => deckState.value.duration)
const trackName = computed(() => deckState.value.trackName)
const pitch = computed(() => deckState.value.pitch)
const hasTrack = computed(() => !!deckState.value.trackName)

const progressPercent = computed(() => {
  if (duration.value === 0) return 0
  return (currentTime.value / duration.value) * 100
})

// 根据 BPM 计算旋转周期，120 BPM = 1秒一圈
const rotationDuration = computed(() => {
  const bpm = deckState.value.bpm || 120
  const secondsPerBeat = 60 / bpm
  // 一圈 = 2拍
  return `${secondsPerBeat * 2}s`
})

function togglePlay() {
  if (isPlaying.value) {
    pause(props.deckId)
    emit('pause', props.deckId)
  } else {
    play(props.deckId)
    emit('play', props.deckId)
  }
}

function onFileSelect(event) {
  const file = event.target.files?.[0]
  if (file) {
    emit('load-track', props.deckId, file)
    event.target.value = ''
  }
}

function onProgressClick(event) {
  const rect = event.currentTarget.getBoundingClientRect()
  const percent = (event.clientX - rect.left) / rect.width
  const newTime = percent * duration.value
  seek(props.deckId, newTime)
}

function onPitchChange(event) {
  const value = parseFloat(event.target.value)
  setPitch(props.deckId, value)
  emit('pitch-change', props.deckId, value)
}

function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>

<style lang="less" scoped>
@neon-cyan: #00fff5;
@neon-magenta: #ff00ff;
@bg-dark: #0a0a0f;
@bg-secondary: #1a1a2e;
@track-bg: #2a2a4a;

.turntable {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 8px;
  background: linear-gradient(145deg, @bg-secondary, @bg-dark);
  border-radius: 10px;
  border: 1px solid rgba(0, 255, 245, 0.1);
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
}

/* 大型加载按钮 - 极简状态 */
.big-load-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  aspect-ratio: 1;
  max-width: 180px;
  margin: 0 auto;
  background: rgba(0, 255, 245, 0.05);
  border: 2px dashed rgba(0, 255, 245, 0.4);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  padding: 12px;

  &:active {
    background: rgba(0, 255, 245, 0.15);
    border-color: @neon-cyan;
    transform: scale(0.98);
  }
}

.big-plus {
  font-size: 48px;
  color: @neon-cyan;
  font-weight: 200;
  line-height: 1;
  text-shadow: 0 0 15px rgba(@neon-cyan, 0.6);
}

.big-text {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  font-weight: 500;
}

.turntable-base {
  position: relative;
  width: 100%;
  max-width: 140px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.vinyl {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #1a1a1a 100%);
  box-shadow:
    0 0 15px rgba(0, 0, 0, 0.8),
    inset 0 0 10px rgba(0, 0, 0, 0.5),
    0 0 30px rgba(@neon-cyan, 0.2);
  position: relative;
  transition: transform 0.3s ease;

  &.spinning {
    animation: spin linear infinite;
  }
}

.vinyl-grooves {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 90%;
  border-radius: 50%;
  background: repeating-radial-gradient(
    circle at center,
    transparent 0px,
    transparent 2px,
    rgba(255, 255, 255, 0.03) 2px,
    rgba(255, 255, 255, 0.03) 4px
  );
}

.vinyl-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, @neon-cyan, @neon-magenta);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px rgba(@neon-cyan, 0.5);
}

.deck-label {
  font-family: 'Orbitron', sans-serif;
  font-size: 18px;
  font-weight: bold;
  color: @bg-dark;
}

.turntable-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: @bg-dark;
  border: 2px solid @neon-cyan;
  z-index: 10;
}

.center-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: @neon-cyan;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.controls-overlay {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
}

.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(145deg, @bg-secondary, @bg-dark);
  border: 2px solid @neon-cyan;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 0 10px rgba(@neon-cyan, 0.3);
  -webkit-tap-highlight-color: transparent;

  &:active {
    transform: translate(-50%, -50%) scale(0.9);
  }

  &.playing {
    border-color: @neon-magenta;
    box-shadow: 0 0 10px rgba(@neon-magenta, 0.3);
  }
}

/* 切换音乐按钮 */
.switch-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: @bg-secondary;
  border: 1px solid rgba(@neon-cyan, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
  -webkit-tap-highlight-color: transparent;
  color: @neon-cyan;
  font-size: 14px;
  font-weight: bold;

  &:active {
    background: rgba(0, 255, 245, 0.2);
    transform: scale(0.9);
  }
}

.play-icon {
  width: 0;
  height: 0;
  border-left: 8px solid @neon-cyan;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  margin-left: 2px;
}

.pause-icon {
  width: 8px;
  height: 8px;
  background: @neon-magenta;
  border-radius: 2px;
}

.load-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: @bg-secondary;
  border: 1px solid rgba(@neon-cyan, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 20;

  &:hover {
    border-color: @neon-cyan;
    box-shadow: 0 0 6px rgba(@neon-cyan, 0.3);
  }
}

.plus-icon {
  display: none;
}

.track-info {
  text-align: center;
  width: 100%;
}

.track-name {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 11px;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  margin: 0 auto;
}

.track-time {
  font-family: 'Orbitron', monospace;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 2px;

  .separator {
    margin: 0 4px;
  }
}

.progress-container {
  width: 100%;
}

.progress-bar {
  position: relative;
  height: 4px;
  background: @track-bg;
  border-radius: 2px;
  cursor: pointer;
  overflow: visible;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, @neon-cyan, @neon-magenta);
  border-radius: 2px;
  transition: width 0.1s linear;
}

.progress-head {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(@neon-cyan, 0.8);
  margin-top: -1px;
}

.pitch-control {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
}

.pitch-label {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 9px;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 1px;
}

.pitch-slider {
  flex: 1;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: @track-bg;
  border-radius: 2px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background: linear-gradient(145deg, @neon-cyan, @neon-magenta);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 8px rgba(@neon-cyan, 0.5);
  }

  &::-moz-range-thumb {
    width: 14px;
    height: 14px;
    background: linear-gradient(145deg, @neon-cyan, @neon-magenta);
    border-radius: 50%;
    cursor: pointer;
    border: none;
    box-shadow: 0 0 8px rgba(@neon-cyan, 0.5);
  }
}

.pitch-value {
  font-family: 'Orbitron', monospace;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  min-width: 45px;
  text-align: right;

  &.positive {
    color: @neon-cyan;
  }

  &.negative {
    color: @neon-magenta;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
