<template>
  <ToolCard icon="graphic" :title="`波形 ${deck}`" class="waveform-card" :class="deck">
    <div class="waveform-display">
      <div class="waveform-container">
        <canvas ref="canvasRef" class="waveform-canvas"></canvas>
      </div>
    </div>
  </ToolCard>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import ToolCard from '../../components/ToolCard.vue'
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

.waveform-card {
  width: 100%;
}

.waveform-display {
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
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
