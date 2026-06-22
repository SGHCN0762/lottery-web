<template>
  <div class="waveform-display" :class="deck">
    <div class="waveform-label">{{ deck === 'A' ? 'DECK A' : 'DECK B' }}</div>
    <div class="waveform-container">
      <canvas ref="canvasRef" class="waveform-canvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useWaveform } from '../composables/useWaveform'
import { useAudioEngine } from '../composables/useAudioEngine'

const props = defineProps({
  deck: {
    type: String,
    default: 'A',
  },
})

const canvasRef = ref(null)
const { deckAState, deckBState, isInitialized, init } = useAudioEngine()

const deckState = props.deck === 'A' ? deckAState : deckBState

const { isRendering, startRendering, stopRendering, resizeCanvas } = useWaveform(canvasRef, props.deck)

let resizeObserver = null

onMounted(() => {
  if (!isInitialized.value) {
    init()
  }

  resizeCanvas()

  resizeObserver = new ResizeObserver(() => {
    resizeCanvas()
  })

  if (canvasRef.value) {
    resizeObserver.observe(canvasRef.value.parentElement)
  }
})

onUnmounted(() => {
  stopRendering()
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})

watch(
  () => deckState.value.isPlaying,
  (playing) => {
    if (playing) {
      startRendering()
    } else {
      stopRendering()
    }
  }
)
</script>

<style lang="less" scoped>
@neon-cyan: #00fff5;
@neon-magenta: #ff00ff;
@bg-dark: #0a0a0f;
@bg-secondary: #1a1a2e;

.waveform-display {
  padding: 6px 8px;
  background: linear-gradient(180deg, @bg-secondary, @bg-dark);
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 245, 0.1);
  width: 100%;
  box-sizing: border-box;
  min-width: 0;

  &.A {
    border-color: rgba(0, 255, 245, 0.2);
  }

  &.B {
    border-color: rgba(255, 0, 255, 0.2);
  }
}

.waveform-label {
  font-family: 'Inter', sans-serif;
  font-size: 8px;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 1.5px;
  margin-bottom: 2px;

  .A & {
    color: rgba(0, 255, 245, 0.7);
  }

  .B & {
    color: rgba(255, 0, 255, 0.7);
  }
}

.waveform-container {
  width: 100%;
  height: 40px;
  position: relative;
}

.waveform-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
