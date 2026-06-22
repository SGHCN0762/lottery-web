<template>
  <div class="bpm-display">
    <div class="bpm-section">
      <div class="bpm-label">MASTER BPM</div>
      <div class="bpm-value">{{ masterBpm.toFixed(1) }}</div>
    </div>

    <div class="bpm-controls">
      <button class="bpm-btn tap" @click="onTap">TAP</button>
      <button class="bpm-btn sync" @click="onSync">SYNC</button>
    </div>

    <div class="deck-bpm">
      <div class="deck-bpm-item A">
        <span class="deck-label">A</span>
        <span class="deck-value">{{ deckABPM || '--' }}</span>
      </div>
      <div class="deck-bpm-item B">
        <span class="deck-label">B</span>
        <span class="deck-value">{{ deckBBPM || '--' }}</span>
      </div>
    </div>

    <div class="bpm-adjust">
      <button class="adjust-btn minus" @click="adjustBPM(-1)">-</button>
      <span class="adjust-label">FINE</span>
      <button class="adjust-btn plus" @click="adjustBPM(1)">+</button>
    </div>
  </div>
</template>

<script setup>
import { useAudioEngine } from '../composables/useAudioEngine'
import { useBPMDetector } from '../composables/useBPMDetector'

const { masterBpm } = useAudioEngine()
const { deckABPM, deckBBPM, tap, setMasterBPM, syncToMaster } = useBPMDetector()

function onTap() {
  tap()
}

function onSync() {
  syncToMaster('A')
  syncToMaster('B')
}

function adjustBPM(delta) {
  setMasterBPM(masterBpm.value + delta)
}
</script>

<style lang="less" scoped>
@neon-cyan: #00fff5;
@neon-magenta: #ff00ff;
@bg-dark: #0a0a0f;
@bg-secondary: #1a1a2e;
@track-bg: #2a2a4a;
@led-green: #00ff00;

.bpm-display {
  padding: 8px;
  background: linear-gradient(180deg, @bg-secondary, @bg-dark);
  border-radius: 10px;
  border: 1px solid rgba(0, 255, 245, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
}

.bpm-section {
  text-align: center;
}

.bpm-label {
  font-family: 'Inter', sans-serif;
  font-size: 8px;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 1.5px;
  margin-bottom: 1px;
}

.bpm-value {
  font-family: 'Orbitron', sans-serif;
  font-size: 22px;
  font-weight: bold;
  color: @led-green;
  text-shadow: 0 0 10px @led-green;
  line-height: 1;
}

.bpm-controls {
  display: flex;
  gap: 6px;
}

.bpm-btn {
  padding: 4px 10px;
  background: @track-bg;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-family: 'Orbitron', sans-serif;
  font-size: 9px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: @neon-cyan;
    box-shadow: 0 0 6px rgba(@neon-cyan, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }
}

.deck-bpm {
  display: flex;
  gap: 12px;
}

.deck-bpm-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;

  .deck-label {
    font-family: 'Orbitron', sans-serif;
    font-size: 8px;
  }

  .deck-value {
    font-family: 'Orbitron', monospace;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
  }

  &.A .deck-label {
    color: @neon-cyan;
  }

  &.B .deck-label {
    color: @neon-magenta;
  }
}

.bpm-adjust {
  display: flex;
  align-items: center;
  gap: 4px;
}

.adjust-btn {
  width: 20px;
  height: 20px;
  background: @track-bg;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  font-family: 'Orbitron', sans-serif;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: @neon-cyan;
    color: @neon-cyan;
  }

  &:active {
    transform: scale(0.9);
  }
}

.adjust-label {
  font-family: 'Inter', sans-serif;
  font-size: 7px;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 1px;
}
</style>
