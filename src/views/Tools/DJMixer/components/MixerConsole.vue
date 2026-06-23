<template>
  <div class="mixer-console">
    <!-- 通道主体 -->
    <div class="channels-row">
      <!-- Deck A 音量 -->
      <div class="channel a">
        <div class="channel-volume">
          <div class="channel-label">A</div>
          <div class="fader-container">
            <input
              type="range"
              class="volume-fader"
              min="0"
              max="100"
              :value="volumeA * 100"
              @input="onVolumeAChange"
              @wheel.prevent
              orient="vertical"
            />
            <div class="fader-track">
              <div class="fader-fill" :style="{ height: volumeA * 100 + '%' }"></div>
              <div class="fader-handle" :style="{ bottom: volumeA * 100 + '%' }"></div>
            </div>
          </div>
          <div class="volume-value">{{ Math.round(volumeA * 100) }}</div>
        </div>

        <!-- EQ -->
        <div class="eq-section">
          <div class="eq-knob">
            <label>HI</label>
            <input
              type="range"
              class="eq-slider"
              min="-12"
              max="12"
              :value="eqA.high"
              @input="onEQChange('A', 'high', $event)"
            />
            <span class="eq-value">{{ eqA.high > 0 ? '+' : '' }}{{ eqA.high }}</span>
          </div>
          <div class="eq-knob">
            <label>MID</label>
            <input
              type="range"
              class="eq-slider"
              min="-12"
              max="12"
              :value="eqA.mid"
              @input="onEQChange('A', 'mid', $event)"
            />
            <span class="eq-value">{{ eqA.mid > 0 ? '+' : '' }}{{ eqA.mid }}</span>
          </div>
          <div class="eq-knob">
            <label>LO</label>
            <input
              type="range"
              class="eq-slider"
              min="-12"
              max="12"
              :value="eqA.low"
              @input="onEQChange('A', 'low', $event)"
            />
            <span class="eq-value">{{ eqA.low > 0 ? '+' : '' }}{{ eqA.low }}</span>
          </div>
        </div>
      </div>

      <!-- Deck B 音量 -->
      <div class="channel b">
        <div class="channel-volume">
          <div class="channel-label">B</div>
          <div class="fader-container">
            <input
              type="range"
              class="volume-fader"
              min="0"
              max="100"
              :value="volumeB * 100"
              @input="onVolumeBChange"
              @wheel.prevent
              orient="vertical"
            />
            <div class="fader-track">
              <div class="fader-fill" :style="{ height: volumeB * 100 + '%' }"></div>
              <div class="fader-handle" :style="{ bottom: volumeB * 100 + '%' }"></div>
            </div>
          </div>
          <div class="volume-value">{{ Math.round(volumeB * 100) }}</div>
        </div>

        <!-- EQ -->
        <div class="eq-section">
          <div class="eq-knob">
            <label>HI</label>
            <input
              type="range"
              class="eq-slider"
              min="-12"
              max="12"
              :value="eqB.high"
              @input="onEQChange('B', 'high', $event)"
            />
            <span class="eq-value">{{ eqB.high > 0 ? '+' : '' }}{{ eqB.high }}</span>
          </div>
          <div class="eq-knob">
            <label>MID</label>
            <input
              type="range"
              class="eq-slider"
              min="-12"
              max="12"
              :value="eqB.mid"
              @input="onEQChange('B', 'mid', $event)"
            />
            <span class="eq-value">{{ eqB.mid > 0 ? '+' : '' }}{{ eqB.mid }}</span>
          </div>
          <div class="eq-knob">
            <label>LO</label>
            <input
              type="range"
              class="eq-slider"
              min="-12"
              max="12"
              :value="eqB.low"
              @input="onEQChange('B', 'low', $event)"
            />
            <span class="eq-value">{{ eqB.low > 0 ? '+' : '' }}{{ eqB.low }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Crossfader -->
    <div class="crossfader-section">
      <div class="crossfader-label">CROSSFADER</div>
      <div class="crossfader-container">
        <span class="cross-label">A</span>
        <input
          type="range"
          class="crossfader-slider"
          min="-100"
          max="100"
          :value="crossfader * 100"
          @input="onCrossfaderChange"
        />
        <span class="cross-label">B</span>
      </div>
      <div class="crossfader-indicator">
        <div class="indicator-a" :class="{ active: crossfader <= 0 }"></div>
        <div class="indicator-center" :class="{ active: crossfader === 0 }"></div>
        <div class="indicator-b" :class="{ active: crossfader >= 0 }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAudioEngine } from '../composables/useAudioEngine'

const emit = defineEmits(['volume-change', 'crossfader-change', 'eq-change', 'crossfader-drag'])

const { deckAState, deckBState, crossfader, setVolume, setEQ, setCrossfader } = useAudioEngine()

const volumeA = computed(() => deckAState.value.volume)
const volumeB = computed(() => deckBState.value.volume)
const eqA = computed(() => deckAState.value.eq)
const eqB = computed(() => deckBState.value.eq)

function onVolumeAChange(event) {
  const value = parseFloat(event.target.value) / 100
  setVolume('A', value)
  emit('volume-change', 'A', value)
}

function onVolumeBChange(event) {
  const value = parseFloat(event.target.value) / 100
  setVolume('B', value)
  emit('volume-change', 'B', value)
}

function onCrossfaderChange(event) {
  const value = parseFloat(event.target.value) / 100
  setCrossfader(value)
  emit('crossfader-change', value)
  emit('crossfader-drag', value)
}

function onEQChange(deck, band, event) {
  const value = parseFloat(event.target.value)
  setEQ(deck, band, value)
  emit('eq-change', deck, band, value)
}
</script>

<style lang="less" scoped>
@neon-cyan: #00fff5;
@neon-magenta: #ff00ff;
@bg-dark: #0a0a0f;
@bg-secondary: #1a1a2e;
@track-bg: #2a2a4a;
@led-green: #00ff00;

.mixer-console {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px 8px 16px;
  background: linear-gradient(180deg, @bg-secondary, @bg-dark);
  border-radius: 10px;
  border: 1px solid rgba(0, 255, 245, 0.1);
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
}

.channels-row {
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: stretch;
  width: 100%;
}

.channel {
  display: flex;
  align-items: center;
  min-width: 0;
}

.channel-volume {
  padding: 8px;
}

.channel-label {
  font-family: 'Orbitron', sans-serif;
  font-size: 13px;
  font-weight: bold;
  color: @neon-cyan;
  text-shadow: 0 0 6px rgba(@neon-cyan, 0.5);
  margin-left: 8px;

  .b & {
    color: @neon-magenta;
    text-shadow: 0 0 6px rgba(@neon-magenta, 0.5);
  }
}

.fader-container {
  position: relative;
  width: 24px;
  height: 80px;
}

.volume-fader {
  position: absolute;
  width: 80px;
  height: 24px;
  transform: rotate(-90deg) translateX(-28px);
  transform-origin: left center;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
  z-index: 2;
  touch-action: none;

  &::-webkit-slider-runnable-track {
    height: 5px;
    background: @track-bg;
    border-radius: 3px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 18px;
    background: linear-gradient(180deg, @neon-cyan, @neon-magenta);
    border-radius: 3px;
    margin-top: -7px;
    box-shadow: 0 0 6px rgba(@neon-cyan, 0.5);
  }
}

.fader-track {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 100%;
  background: @track-bg;
  border-radius: 4px;
  overflow: hidden;
}

.fader-fill {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(0deg, @neon-cyan, @neon-magenta);
  border-radius: 4px;
  transition: height 0.1s ease;
}

.fader-handle {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 50%);
  width: 18px;
  height: 10px;
  background: linear-gradient(180deg, #fff, #ccc);
  border-radius: 2px;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
  transition: bottom 0.1s ease;
}

.volume-value {
  font-family: 'Orbitron', monospace;
  font-size: 12px;
  color: #fff;
}

.eq-section {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.eq-knob {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;

  label {
    font-family: 'Inter', sans-serif;
    font-size: 8px;
    color: rgba(255, 255, 255, 0.5);
    letter-spacing: 1px;
    width: 20px;
  }
}

.eq-slider {
  width: calc(100% - 56px);
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: linear-gradient(90deg, @neon-magenta 0%, @track-bg 50%, @neon-cyan 100%);
  border-radius: 3px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 10px;
    height: 14px;
    background: #fff;
    border-radius: 2px;
    cursor: pointer;
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.5);
  }
}

.eq-value {
  font-family: 'Orbitron', monospace;
  font-size: 9px;
  color: rgba(255, 255, 255, 0.7);
  width: 20px;
}

.crossfader-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.crossfader-label {
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 2px;
}

.crossfader-container {
  display: flex;
  align-items: center;
  gap: 8px;
  width: calc(100% - 16px);
}

.cross-label {
  font-family: 'Orbitron', sans-serif;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
}

.crossfader-slider {
  flex: 1;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: linear-gradient(90deg, @neon-cyan 0%, @track-bg 50%, @neon-magenta 100%);
  border-radius: 4px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background: linear-gradient(145deg, #fff, #ccc);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
  }
}

.crossfader-indicator {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 300px;
  padding: 0 8px;
}

.indicator-a,
.indicator-center,
.indicator-b {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: @track-bg;
  transition: all 0.2s ease;

  &.active {
    background: @led-green;
    box-shadow: 0 0 8px @led-green;
  }
}

.indicator-center {
  &.active {
    background: #fff;
    box-shadow: 0 0 10px #fff;
  }
}
</style>
