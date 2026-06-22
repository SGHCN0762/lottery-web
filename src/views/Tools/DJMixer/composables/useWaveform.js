/**
 * 波形显示 Composable
 * 使用 Canvas 渲染音频波形
 */
import { ref, onUnmounted } from 'vue'
import { useAudioEngine } from './useAudioEngine'

const RENDER_FPS = 30
const RENDER_INTERVAL = 1000 / RENDER_FPS

export function useWaveform(canvasRef, deck) {
  const { getAnalyser, getAudioElement } = useAudioEngine()

  const isRendering = ref(false)
  let animationId = null
  let lastRenderTime = 0

  const colors = {
    waveform: deck === 'A' ? '#00fff5' : '#ff00ff',
    progress: '#ffffff',
    background: 'transparent',
    grid: 'rgba(255, 255, 255, 0.1)',
  }

  function draw() {
    try {
      const canvas = canvasRef.value
      const analyser = getAnalyser(deck)
      const audioEl = getAudioElement(deck)

      if (!canvas || !analyser) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const width = canvas.width
      const height = canvas.height

      ctx.clearRect(0, 0, width, height)

      ctx.strokeStyle = colors.grid
      ctx.lineWidth = 1
      const gridLines = 4
      for (let i = 1; i < gridLines; i++) {
        const y = (height / gridLines) * i
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)
      analyser.getByteTimeDomainData(dataArray)

      const duration = audioEl?.duration || 0
      const currentTime = audioEl?.currentTime || 0
      const progress = duration > 0 ? currentTime / duration : 0

      ctx.lineWidth = 2
      ctx.strokeStyle = colors.waveform
      ctx.beginPath()

      const sliceWidth = width / bufferLength
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0
        const y = (v * height) / 2

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }

        x += sliceWidth
      }

      ctx.stroke()

      const progressX = width * progress
      ctx.strokeStyle = colors.progress
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(progressX, 0)
      ctx.lineTo(progressX, height)
      ctx.stroke()

      if (progress > 0) {
        ctx.fillStyle = 'rgba(0, 255, 245, 0.3)'
        ctx.fillRect(0, 0, progressX, height)
      }
    } catch (e) {
      // 静默处理
    }
  }

  function render() {
    if (!isRendering.value) return

    const now = performance.now()
    if (now - lastRenderTime >= RENDER_INTERVAL) {
      lastRenderTime = now
      draw()
    }

    animationId = requestAnimationFrame(render)
  }

  function startRendering() {
    if (isRendering.value) return
    isRendering.value = true
    lastRenderTime = 0
    render()
  }

  function stopRendering() {
    isRendering.value = false
    if (animationId !== null) {
      cancelAnimationFrame(animationId)
      animationId = null
    }
  }

  function resizeCanvas() {
    const canvas = canvasRef.value
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
  }

  onUnmounted(() => {
    stopRendering()
  })

  return {
    isRendering,
    startRendering,
    stopRendering,
    resizeCanvas,
    colors,
  }
}
