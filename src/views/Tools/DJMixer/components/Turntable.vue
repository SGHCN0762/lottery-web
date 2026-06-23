<template>
  <div class="turntable" :class="{ 'is-playing': isPlaying }">
    <label v-if="!hasTrack" class="big-load-btn">
      <input type="file" accept="audio/*" @change="onFileSelect" hidden />
      <span class="big-plus">+</span>
      <span class="big-text">点击加载音乐到 {{ deckId }} 轨</span>
    </label>

    <template v-else>
      <div class="turntable-base">
        <div
          class="vinyl"
          :class="{ spinning: isPlaying }"
          :style="{ animationDuration: rotationDuration }"
        >
          <div class="vinyl-label">
            <span class="deck-label">{{ deckId }}</span>
            <span v-if="loopEnabled" class="loop-indicator">LOOP</span>
          </div>
          <div class="vinyl-grooves"></div>
        </div>

        <div class="turntable-center">
          <div class="center-dot"></div>
        </div>

        <button class="play-btn" @click="togglePlay" :class="{ playing: isPlaying }">
          <span class="play-icon" v-if="!isPlaying"></span>
          <span class="pause-icon" v-else></span>
        </button>

        <label class="switch-btn">
          <input type="file" accept="audio/*" @change="onFileSelect" hidden />
          <span>↻</span>
        </label>
      </div>

      <div class="track-info">
        <div class="track-name">{{ trackName || 'Drop a track' }}</div>
        <div class="track-time">
          <span>{{ formatTime(currentTime) }}</span>
          <span class="separator">/</span>
          <span>{{ formatTime(duration) }}</span>
        </div>
      </div>

      <div class="progress-container">
        <div class="progress-bar" @click="onProgressClick">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
          <div class="progress-head" :style="{ left: progressPercent + '%' }"></div>
          <div
            v-if="loopEnabled"
            class="loop-marker start"
            :style="{ left: loopStartPercent + '%' }"
          ></div>
          <div
            v-if="loopEnabled"
            class="loop-marker end"
            :style="{ left: loopEndPercent + '%' }"
          ></div>
          <div
            v-if="loopEnabled"
            class="loop-region"
            :style="{ left: loopStartPercent + '%', width: (loopEndPercent - loopStartPercent) + '%' }"
          ></div>
        </div>
      </div>

      <div class="turntable-controls">
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

        <div class="loop-control">
          <button
            class="loop-btn"
            :class="{ active: loopEnabled }"
            @click="toggleLoop"
          >
            LOOP
          </button>
          <button class="cue-btn" @click="setCuePoint">CUE</button>
        </div>
      </div>

      <div v-if="cuePoints.length > 0" class="cue-list">
        <button
          v-for="(cue, index) in cuePoints"
          :key="index"
          class="cue-item"
          @click="goToCue(index)"
        >
          {{ cue.label }}
          <span class="cue-time">{{ formatTime(cue.time) }}</span>
        </button>
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

const emit = defineEmits(['load-track', 'play', 'pause', 'seek', 'pitch-change', 'loop-change'])

const {
  deckAState,
  deckBState,
  play,
  pause,
  seek,
  setPitch,
  setLoop,
  setCuePoint: engineSetCuePoint,
  goToCuePoint,
  clearCuePoints,
} = useAudioEngine()

const deckState = computed(() => (props.deckId === 'A' ? deckAState.value : deckBState.value))

const isPlaying = computed(() => deckState.value.isPlaying)
const currentTime = computed(() => deckState.value.currentTime)
const duration = computed(() => deckState.value.duration)
const trackName = computed(() => deckState.value.trackName)
const pitch = computed(() => deckState.value.pitch)
const hasTrack = computed(() => !!deckState.value.trackName)
const loopEnabled = computed(() => deckState.value.loop.enabled)
const cuePoints = computed(() => deckState.value.cuePoints)

const progressPercent = computed(() => {
  if (duration.value === 0) return 0
  return (currentTime.value / duration.value) * 100
})

const loopStartPercent = computed(() => {
  if (duration.value === 0) return 0
  return (deckState.value.loop.start / duration.value) * 100
})

const loopEndPercent = computed(() => {
  if (duration.value === 0) return 0
  return (deckState.value.loop.end / duration.value) * 100
})

const rotationDuration = computed(() => {
  const bpm = deckState.value.bpm || 120
  const secondsPerBeat = 60 / bpm
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
    clearCuePoints(props.deckId)
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

function toggleLoop() {
  const enabled = !loopEnabled.value
  if (enabled) {
    const start = currentTime.value
    const end = Math.min(currentTime.value + 8, duration.value)
    setLoop(props.deckId, true, start, end)
  } else {
    setLoop(props.deckId, false)
  }
  emit('loop-change', props.deckId, enabled)
}

function setCuePoint() {
  const label = `CUE ${cuePoints.value.length + 1}`
  engineSetCuePoint(props.deckId, currentTime.value, label)
}

function goToCue(index) {
  goToCuePoint(props.deckId, index)
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
@led-green: #00ff00;

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

.big-load-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 100%;
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
  flex-direction: column;
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

.loop-indicator {
  font-family: 'Orbitron', sans-serif;
  font-size: 6px;
  color: @bg-dark;
  font-weight: bold;
  background: @led-green;
  padding: 1px 3px;
  border-radius: 2px;
  margin-top: 2px;
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
}

.loop-marker {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 12px;
  background: @led-green;
  border-radius: 2px;
  z-index: 2;
}

.loop-region {
  position: absolute;
  top: 0;
  height: 100%;
  background: rgba(0, 255, 0, 0.2);
  border-radius: 2px;
  z-index: 1;
}

.turntable-controls {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
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
  min-width: 24px;
}

.pitch-slider {
  height: 4px;
  width: calc(100% - 66px);
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
}

.pitch-value {
  font-family: 'Orbitron', monospace;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  width: 24px;
  text-align: right;

  &.positive {
    color: @neon-cyan;
  }

  &.negative {
    color: @neon-magenta;
  }
}

.loop-control {
  display: flex;
  gap: 6px;
  justify-content: center;
}

.loop-btn,
.cue-btn {
  padding: 4px 10px;
  border-radius: 6px;
  font-family: 'Orbitron', sans-serif;
  font-size: 9px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  border: 1px solid transparent;
}

.loop-btn {
  background: rgba(0, 255, 0, 0.1);
  border-color: rgba(0, 255, 0, 0.3);
  color: rgba(0, 255, 0, 0.7);

  &:active {
    background: rgba(0, 255, 0, 0.2);
    transform: scale(0.95);
  }

  &.active {
    background: rgba(0, 255, 0, 0.3);
    border-color: @led-green;
    color: @led-green;
    box-shadow: 0 0 8px rgba(0, 255, 0, 0.4);
  }
}

.cue-btn {
  background: rgba(@neon-magenta, 0.1);
  border-color: rgba(@neon-magenta, 0.3);
  color: rgba(@neon-magenta, 0.7);

  &:active {
    background: rgba(@neon-magenta, 0.2);
    transform: scale(0.95);
  }
}

.cue-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  width: 100%;
  justify-content: center;
  margin-top: 4px;
}

.cue-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  background: rgba(@neon-magenta, 0.1);
  border: 1px solid rgba(@neon-magenta, 0.3);
  border-radius: 4px;
  font-family: 'Orbitron', sans-serif;
  font-size: 8px;
  color: @neon-magenta;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;

  &:active {
    background: rgba(@neon-magenta, 0.2);
    transform: scale(0.95);
  }
}

.cue-time {
  font-size: 7px;
  opacity: 0.7;
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