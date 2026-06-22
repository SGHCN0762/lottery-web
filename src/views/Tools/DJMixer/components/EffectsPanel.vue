<template>
  <div class="effects-panel">
    <div class="panel-title">EFFECTS</div>

    <!-- Filter Section -->
    <div class="effect-group">
      <div class="effect-row">
        <span class="effect-label">HIGH PASS</span>
        <input
          type="range"
          class="effect-slider"
          min="0"
          max="100"
          :value="effectsState.filterHighPass * 100"
          @input="onFilterChange('highPass', $event)"
        />
        <span class="effect-value">{{ Math.round(effectsState.filterHighPass * 100) }}</span>
      </div>
      <div class="effect-row">
        <span class="effect-label">LOW PASS</span>
        <input
          type="range"
          class="effect-slider"
          min="0"
          max="100"
          :value="effectsState.filterLowPass * 100"
          @input="onFilterChange('lowPass', $event)"
        />
        <span class="effect-value">{{ Math.round(effectsState.filterLowPass * 100) }}</span>
      </div>
    </div>

    <!-- Echo Section -->
    <div class="effect-group">
      <div class="effect-header">
        <label class="effect-toggle">
          <input
            type="checkbox"
            :checked="effectsState.echo.enabled"
            @change="onEchoToggle"
          />
          <span class="toggle-switch"></span>
        </label>
        <span class="effect-name">ECHO</span>
      </div>
      <div class="effect-row" v-if="effectsState.echo.enabled">
        <span class="effect-label">TIME</span>
        <input
          type="range"
          class="effect-slider"
          min="0"
          max="100"
          :value="effectsState.echo.time * 100"
          @input="onEchoChange('time', $event)"
        />
        <span class="effect-value">{{ (effectsState.echo.time * 10).toFixed(1) }}</span>
      </div>
      <div class="effect-row" v-if="effectsState.echo.enabled">
        <span class="effect-label">FEEDBACK</span>
        <input
          type="range"
          class="effect-slider"
          min="0"
          max="90"
          :value="effectsState.echo.feedback * 100"
          @input="onEchoChange('feedback', $event)"
        />
        <span class="effect-value">{{ Math.round(effectsState.echo.feedback * 100) }}%</span>
      </div>
    </div>

    <!-- Reverb Section -->
    <div class="effect-group">
      <div class="effect-header">
        <label class="effect-toggle">
          <input
            type="checkbox"
            :checked="effectsState.reverb.enabled"
            @change="onReverbToggle"
          />
          <span class="toggle-switch"></span>
        </label>
        <span class="effect-name">REVERB</span>
      </div>
      <div class="effect-row" v-if="effectsState.reverb.enabled">
        <span class="effect-label">TIME</span>
        <input
          type="range"
          class="effect-slider"
          min="0"
          max="100"
          :value="effectsState.reverb.time * 10"
          @input="onReverbChange('time', $event)"
        />
        <span class="effect-value">{{ (effectsState.reverb.time * 10).toFixed(1) }}s</span>
      </div>
      <div class="effect-row" v-if="effectsState.reverb.enabled">
        <span class="effect-label">MIX</span>
        <input
          type="range"
          class="effect-slider"
          min="0"
          max="100"
          :value="effectsState.reverb.mix * 100"
          @input="onReverbChange('mix', $event)"
        />
        <span class="effect-value">{{ Math.round(effectsState.reverb.mix * 100) }}%</span>
      </div>
    </div>

    <!-- Flanger Section -->
    <div class="effect-group">
      <div class="effect-header">
        <label class="effect-toggle">
          <input
            type="checkbox"
            :checked="effectsState.flanger.enabled"
            @change="onFlangerToggle"
          />
          <span class="toggle-switch"></span>
        </label>
        <span class="effect-name">FLANGER</span>
      </div>
      <div class="effect-row" v-if="effectsState.flanger.enabled">
        <span class="effect-label">TIME</span>
        <input
          type="range"
          class="effect-slider"
          min="0"
          max="100"
          :value="effectsState.flanger.time * 1000"
          @input="onFlangerChange('time', $event)"
        />
        <span class="effect-value">{{ (effectsState.flanger.time * 1000).toFixed(0) }}ms</span>
      </div>
      <div class="effect-row" v-if="effectsState.flanger.enabled">
        <span class="effect-label">DEPTH</span>
        <input
          type="range"
          class="effect-slider"
          min="0"
          max="100"
          :value="effectsState.flanger.depth * 100"
          @input="onFlangerChange('depth', $event)"
        />
        <span class="effect-value">{{ Math.round(effectsState.flanger.depth * 100) }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAudioEngine } from '../composables/useAudioEngine'

const { effectsState } = useAudioEngine()

const emit = defineEmits(['effect-change'])

function onFilterChange(type, event) {
  const value = parseFloat(event.target.value) / 100
  if (type === 'highPass') {
    effectsState.value.filterHighPass = value
  } else {
    effectsState.value.filterLowPass = value
  }
  emit('effect-change', type, value)
}

function onEchoToggle() {
  effectsState.value.echo.enabled = !effectsState.value.echo.enabled
  emit('effect-change', 'echo', effectsState.value.echo)
}

function onEchoChange(prop, event) {
  const value = parseFloat(event.target.value)
  if (prop === 'time') {
    effectsState.value.echo.time = value / 100
  } else {
    effectsState.value.echo.feedback = value / 100
  }
  emit('effect-change', 'echo', effectsState.value.echo)
}

function onReverbToggle() {
  effectsState.value.reverb.enabled = !effectsState.value.reverb.enabled
  emit('effect-change', 'reverb', effectsState.value.reverb)
}

function onReverbChange(prop, event) {
  const value = parseFloat(event.target.value)
  if (prop === 'time') {
    effectsState.value.reverb.time = value / 10
  } else {
    effectsState.value.reverb.mix = value / 100
  }
  emit('effect-change', 'reverb', effectsState.value.reverb)
}

function onFlangerToggle() {
  effectsState.value.flanger.enabled = !effectsState.value.flanger.enabled
  emit('effect-change', 'flanger', effectsState.value.flanger)
}

function onFlangerChange(prop, event) {
  const value = parseFloat(event.target.value)
  if (prop === 'time') {
    effectsState.value.flanger.time = value / 1000
  } else {
    effectsState.value.flanger.depth = value / 100
  }
  emit('effect-change', 'flanger', effectsState.value.flanger)
}
</script>

<style lang="less" scoped>
@neon-cyan: #00fff5;
@neon-magenta: #ff00ff;
@bg-dark: #0a0a0f;
@bg-secondary: #1a1a2e;
@track-bg: #2a2a4a;

.effects-panel {
  padding: 8px;
  background: linear-gradient(180deg, @bg-secondary, @bg-dark);
  border-radius: 10px;
  border: 1px solid rgba(0, 255, 245, 0.1);
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
}

.panel-title {
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 2px;
  margin-bottom: 6px;
  text-align: center;
}

.effect-group {
  margin-bottom: 6px;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
}

.effect-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.toggle-switch {
  display: block;
  width: 24px;
  height: 14px;
  background: @track-bg;
  border-radius: 7px;
  position: relative;
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  input:checked + & {
    background: linear-gradient(90deg, @neon-cyan, @neon-magenta);

    &::after {
      left: 12px;
    }
  }
}

.effect-name {
  font-family: 'Orbitron', sans-serif;
  font-size: 10px;
  color: #fff;
  letter-spacing: 1px;
}

.effect-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 3px;

  &:last-child {
    margin-bottom: 0;
  }
}

.effect-label {
  font-family: 'Inter', sans-serif;
  font-size: 7px;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 1px;
  min-width: 36px;
}

.effect-slider {
  flex: 1;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: @track-bg;
  border-radius: 2px;
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 10px;
    height: 10px;
    background: linear-gradient(145deg, @neon-cyan, @neon-magenta);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 4px rgba(@neon-cyan, 0.5);
  }
}

.effect-value {
  font-family: 'Orbitron', monospace;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
  min-width: 45px;
  text-align: right;
}
</style>
