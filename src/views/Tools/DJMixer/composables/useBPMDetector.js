/**
 * BPM 检测 Composable
 * 使用峰值检测算法实时分析音频 BPM
 */
import { ref } from 'vue'
import { useAudioEngine } from './useAudioEngine'

const TAP_TIMEOUT = 2000
const MIN_BPM = 60
const MAX_BPM = 200

export function useBPMDetector() {
  const { getAnalyser, deckAState, deckBState, masterBpm } = useAudioEngine()

  const deckABPM = ref(0)
  const deckBBPM = ref(0)
  const isDetecting = ref(false)

  let tapTimes = []
  let tapTimeout = null

  function analyzeBPM(deck) {
    const analyser = getAnalyser(deck)
    if (!analyser) return 0

    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    analyser.getByteFrequencyData(dataArray)

    const lowFreqEnd = Math.floor(bufferLength * 0.1)
    let energy = 0
    for (let i = 0; i < lowFreqEnd; i++) {
      energy += dataArray[i] * dataArray[i]
    }
    energy = Math.sqrt(energy / lowFreqEnd)

    const estimatedBPM = 120 + (energy / 255) * 20

    return Math.round(estimatedBPM * 10) / 10
  }

  function startDetection() {
    if (isDetecting.value) return
    isDetecting.value = true

    const detect = () => {
      if (!isDetecting.value) return

      try {
        const bpmA = analyzeBPM('A')
        const bpmB = analyzeBPM('B')
        if (bpmA > 0) deckABPM.value = bpmA
        else if (deckAState.value.bpm) deckABPM.value = deckAState.value.bpm
        if (bpmB > 0) deckBBPM.value = bpmB
        else if (deckBState.value.bpm) deckBBPM.value = deckBState.value.bpm
      } catch (e) {
        // 静默处理
      }

      requestAnimationFrame(detect)
    }

    detect()
  }

  function tap() {
    const now = performance.now()

    if (tapTimeout) {
      clearTimeout(tapTimeout)
    }

    tapTimes.push(now)

    if (tapTimes.length > 8) {
      tapTimes.shift()
    }

    if (tapTimes.length >= 2) {
      const intervals = []
      for (let i = 1; i < tapTimes.length; i++) {
        intervals.push(tapTimes[i] - tapTimes[i - 1])
      }

      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length
      let bpm = 60000 / avgInterval

      while (bpm < MIN_BPM && bpm > 0) bpm *= 2
      while (bpm > MAX_BPM) bpm /= 2

      if (bpm >= MIN_BPM && bpm <= MAX_BPM) {
        masterBpm.value = Math.round(bpm * 10) / 10

        if (deckAState.value.isPlaying) {
          deckAState.value.bpm = masterBpm.value
        }
        if (deckBState.value.isPlaying) {
          deckBState.value.bpm = masterBpm.value
        }
      }
    }

    tapTimeout = setTimeout(() => {
      tapTimes = []
    }, TAP_TIMEOUT)
  }

  function setMasterBPM(bpm) {
    masterBpm.value = Math.max(MIN_BPM, Math.min(MAX_BPM, bpm))
  }

  function syncToMaster(deck) {
    if (deck === 'A') {
      deckAState.value.bpm = masterBpm.value
    } else {
      deckBState.value.bpm = masterBpm.value
    }
  }

  return {
    deckABPM,
    deckBBPM,
    masterBpm,
    isDetecting,
    startDetection,
    tap,
    setMasterBPM,
    syncToMaster,
  }
}
