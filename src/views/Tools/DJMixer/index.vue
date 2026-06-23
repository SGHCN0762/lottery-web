<template>
  <div class="dj-mixer">
    <!-- Header -->
    <div class="mixer-header">
      <div class="header-content">
        <h1 class="title">DJ MIXER</h1>
        <button class="help-btn" @click="showHelp = true" aria-label="使用帮助">
          <span>?</span>
        </button>
      </div>
      <p class="subtitle">{{ currentStepText }}</p>
    </div>

    <!-- Main Content -->
    <div class="mixer-content">
      <!-- Turntables Section -->
      <div class="turntables-section">
        <Turntable
          deck-id="A"
          :is-active="isStarted"
          @load-track="onLoadTrack"
          @play="onDeckPlay('A')"
        />
        <Turntable
          deck-id="B"
          :is-active="isStarted"
          @load-track="onLoadTrack"
          @play="onDeckPlay('B')"
        />
      </div>

      <!-- Mixer Console -->
      <div class="mixer-section">
        <MixerConsole @crossfader-drag="onCrossfaderDrag" />
      </div>

      <!-- Quick Actions Bar -->
      <div class="quick-actions">
        <button class="action-btn load-btn" @click="triggerFileInput('A')">
          <span class="btn-icon">+</span>
          <span class="btn-label">载歌 A</span>
        </button>
        <button class="action-btn load-btn" @click="triggerFileInput('B')">
          <span class="btn-icon">+</span>
          <span class="btn-label">载歌 B</span>
        </button>
        <button
          class="action-btn record-btn"
          :class="{ recording: isRecording }"
          @click="toggleRecording"
        >
          <span class="btn-icon">{{ isRecording ? '⏹' : '⏺' }}</span>
          <span class="btn-label">{{ isRecording ? '停止' : '录音' }}</span>
        </button>
        <button
          class="action-btn export-btn"
          :disabled="!recordedBlob"
          @click="downloadRecording"
        >
          <span class="btn-icon">↓</span>
          <span class="btn-label">导出</span>
        </button>
      </div>

      <!-- Hidden file inputs -->
      <input
        ref="fileInputA"
        type="file"
        accept="audio/*"
        style="display: none"
        @change="onFileInputChange('A', $event)"
      />
      <input
        ref="fileInputB"
        type="file"
        accept="audio/*"
        style="display: none"
        @change="onFileInputChange('B', $event)"
      />

      <!-- Right Panel: BPM + Effects -->
      <div class="right-panel">
        <BPMDisplay />
        <EffectsPanel />
      </div>
    </div>

    <!-- Footer -->
    <div class="mixer-footer">
      <span class="tip">第 {{ currentStep + 1 }}/{{ totalSteps }} 步：{{ currentStepText }}</span>
    </div>

    <!-- Help Modal -->
    <div v-if="showHelp" class="help-modal" @click.self="showHelp = false">
      <div class="help-content">
        <div class="help-header">
          <h2>DJ 打碟器使用指南</h2>
          <van-button class="close-btn" plain size="mini" @click="showHelp = false" icon="cross"></van-button>
        </div>
        <div class="help-body">
          <div class="help-step">
            <div class="step-num">1</div>
            <div class="step-text">
              <strong>加载音乐</strong>
              <p>点击转盘右上角 <code>+</code> 按钮选择本地音频文件，分别加载到 A 轨和 B 轨</p>
            </div>
          </div>
          <div class="help-step">
            <div class="step-num">2</div>
            <div class="step-text">
              <strong>开始播放</strong>
              <p>点击转盘中央的 <code>▶</code> 按钮开始播放，唱片会开始旋转</p>
            </div>
          </div>
          <div class="help-step">
            <div class="step-num">3</div>
            <div class="step-text">
              <strong>调节音量</strong>
              <p>使用混音台的 <code>音量推子</code> 上下拖动调整每个轨道的音量大小</p>
            </div>
          </div>
          <div class="help-step">
            <div class="step-num">4</div>
            <div class="step-text">
              <strong>切换音轨</strong>
              <p>使用 <code>横向 CROSSFADER</code> 推子从 A 滑到 B 来平滑切换两首歌</p>
            </div>
          </div>
          <div class="help-step">
            <div class="step-num">5</div>
            <div class="step-text">
              <strong>调节 EQ</strong>
              <p>三个 <code>HI/MID/LO</code> 滑块分别调节高频、中频、低频，让两首歌融合</p>
            </div>
          </div>
          <div class="help-step">
            <div class="step-num">6</div>
            <div class="step-text">
              <strong>添加效果</strong>
              <p>打开 <code>ECHO/REVERB/FLANGER</code> 开关让音乐更有味道，调节下方参数</p>
            </div>
          </div>
          <div class="help-tip">
            💡 <strong>提示</strong>：在 DJ 行业，调音就像讲故事，让一首歌淡出同时让另一首歌淡入！
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAudioEngine } from './composables/useAudioEngine'
import { useBPMDetector } from './composables/useBPMDetector'
import Turntable from './components/Turntable.vue'
import MixerConsole from './components/MixerConsole.vue'
import EffectsPanel from './components/EffectsPanel.vue'
import BPMDisplay from './components/BPMDisplay.vue'

const { init, loadTrack, setCrossfader, pause, isRecording, recordedBlob, startRecording, stopRecording, downloadRecording } = useAudioEngine()
const { startDetection } = useBPMDetector()

const showHelp = ref(false)
const fileInputA = ref(null)
const fileInputB = ref(null)
const isStarted = ref(false)

const currentStep = ref(0)
const totalSteps = 4

const currentStepText = computed(() => {
  const texts = [
    '点击转盘上的 + 按钮加载音乐',
    '点击中央播放按钮开始播放',
    '使用音量推子调节音量',
    '使用横向 CROSSFADER 切换音轨',
  ]
  return texts[currentStep.value]
})

function onLoadTrack(deck, file) {
  loadTrack(deck, file)
  isStarted.value = true
  if (currentStep.value === 0) {
    currentStep.value = 1
  }
}

function onDeckPlay(deck) {
  if (currentStep.value === 1) {
    currentStep.value = 2
  }
}

function onCrossfaderDrag() {
  if (currentStep.value === 2) {
    currentStep.value = 3
  }
}

function triggerFileInput(deck) {
  if (deck === 'A') {
    fileInputA.value?.click()
  } else {
    fileInputB.value?.click()
  }
}

function onFileInputChange(deck, event) {
  const file = event.target.files?.[0]
  if (file) {
    onLoadTrack(deck, file)
    event.target.value = ''
  }
}

function toggleRecording() {
  if (isRecording.value) {
    stopRecording()
  } else {
    startRecording()
  }
}

onMounted(() => {
  init()
  startDetection()
  // 首次访问显示帮助
  const hasShownHelp = localStorage.getItem('djmixer-help-shown')
  if (!hasShownHelp) {
    setTimeout(() => {
      showHelp.value = true
      localStorage.setItem('djmixer-help-shown', 'true')
    }, 500)
  }
})
</script>

<style lang="less">
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Inter:wght@400;500&display=swap');
</style>

<style lang="less" scoped>
@neon-cyan: #00fff5;
@neon-magenta: #ff00ff;
@bg-dark: #0a0a0f;
@bg-secondary: #1a1a2e;
@track-bg: #2a2a4a;

.dj-mixer {
  min-height: 100vh;
  background: radial-gradient(ellipse at top, @bg-secondary 0%, @bg-dark 70%);
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-sizing: border-box;
  overflow-x: hidden;
}

.mixer-header {
  text-align: center;
  padding: 4px 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
}

.title {
  font-family: 'Orbitron', sans-serif;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  letter-spacing: 3px;
  text-shadow:
    0 0 8px rgba(@neon-cyan, 0.5),
    0 0 16px rgba(@neon-cyan, 0.3);
  margin-bottom: 2px;
}

.help-btn {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(0, 255, 245, 0.1);
  border: 1px solid @neon-cyan;
  color: @neon-cyan;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 255, 245, 0.2);
    box-shadow: 0 0 8px rgba(@neon-cyan, 0.5);
  }
}

.subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  color: @neon-cyan;
  letter-spacing: 1px;
  margin-top: 2px;
  font-weight: 500;
}

.mixer-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 100%;
  min-width: 0;
}

.turntables-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  width: 100%;
  min-width: 0;
}

.mixer-section {
  width: 100%;
  display: flex;
  justify-content: center;
  min-width: 0;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  width: 100%;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 8px 4px;
  background: @track-bg;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  &:active {
    transform: scale(0.95);
  }
}

.load-btn {
  border-color: rgba(0, 255, 245, 0.3);

  .btn-icon {
    color: @neon-cyan;
  }

  &:active {
    background: rgba(0, 255, 245, 0.2);
    border-color: @neon-cyan;
  }
}

.record-btn {
  border-color: rgba(255, 50, 50, 0.3);

  .btn-icon {
    color: #ff3232;
  }

  &:active {
    background: rgba(255, 50, 50, 0.2);
    border-color: #ff3232;
  }

  &.recording {
    background: rgba(255, 50, 50, 0.3);
    border-color: #ff3232;
    animation: pulse 1s infinite;

    .btn-icon {
      color: #ff3232;
    }
  }
}

.export-btn {
  border-color: rgba(0, 200, 100, 0.3);

  .btn-icon {
    color: #00c864;
  }

  &:active:not(:disabled) {
    background: rgba(0, 200, 100, 0.2);
    border-color: #00c864;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(255, 50, 50, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(255, 50, 50, 0);
  }
}

.btn-icon {
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
}

.btn-label {
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  color: rgba(255, 255, 255, 0.7);
}

.right-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  width: 100%;
  min-width: 0;
}

.mixer-footer {
  text-align: center;
  padding: 4px;
}

.tip {
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.5px;
}

/* Help Modal */
.help-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
  -webkit-tap-highlight-color: transparent;
}

.help-content {
  background: linear-gradient(180deg, @bg-secondary, @bg-dark);
  border: 1px solid rgba(0, 255, 245, 0.3);
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 0 30px rgba(0, 255, 245, 0.2);
}

.help-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid rgba(0, 255, 245, 0.2);
  position: sticky;
  top: 0;
  background: @bg-secondary;

  h2 {
    font-family: 'Orbitron', sans-serif;
    font-size: 16px;
    color: @neon-cyan;
    margin: 0;
    text-shadow: 0 0 8px rgba(0, 255, 245, 0.5);
  }
}

.close-btn {
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: rgba(255, 0, 255, 0.2);
  border: 1px solid @neon-magenta;
  color: @neon-magenta;
  cursor: pointer;

  &:active {
    transform: scale(0.9);
  }
}

.help-body {
  padding: 16px;
}

.help-step {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  align-items: flex-start;

  &:last-of-type {
    margin-bottom: 0;
  }
}

.step-num {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, @neon-cyan, @neon-magenta);
  color: @bg-dark;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-text {
  flex: 1;
  min-width: 0;

  strong {
    display: block;
    color: #fff;
    font-size: 14px;
    margin-bottom: 4px;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    line-height: 1.5;
    margin: 0;
  }

  code {
    display: inline-block;
    padding: 1px 6px;
    background: rgba(0, 255, 245, 0.1);
    border: 1px solid rgba(0, 255, 245, 0.3);
    border-radius: 4px;
    color: @neon-cyan;
    font-family: 'Orbitron', monospace;
    font-size: 11px;
    margin: 0 2px;
  }
}

.help-tip {
  margin-top: 16px;
  padding: 12px;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 8px;
  color: #ffd700;
  font-size: 12px;
  line-height: 1.5;

  strong {
    color: #fff;
  }
}

/* 平板 */
@media (min-width: 768px) {
  .dj-mixer {
    padding: 20px;
    gap: 20px;
  }

  .title {
    font-size: 32px;
    letter-spacing: 8px;
  }

  .subtitle {
    font-size: 12px;
    letter-spacing: 3px;
  }

  .mixer-content {
    gap: 20px;
  }

  .turntables-section {
    gap: 20px;
  }

  .quick-actions {
    grid-template-columns: repeat(4, 200px);
    justify-content: center;
    gap: 16px;
  }

  .action-btn {
    padding: 12px 16px;
    flex-direction: row;
    gap: 8px;
  }

  .btn-icon {
    font-size: 20px;
  }

  .btn-label {
    font-size: 12px;
  }
}

/* 桌面 */
@media (min-width: 1024px) {
  .mixer-content {
    display: grid;
    grid-template-columns: 1fr 320px;
    grid-template-rows: auto auto;
    max-width: 1200px;
    margin: 0 auto;
  }

  .turntables-section {
    grid-column: 1 / 2;
    grid-row: 1;
  }

  .mixer-section {
    grid-column: 1 / -1;
    grid-row: 3;
  }

  .quick-actions {
    grid-column: 1 / 2;
    grid-row: 2;
  }

  .right-panel {
    grid-column: 2 / 3;
    grid-row: 1 / 3;
    grid-template-columns: 1fr;
    align-self: start;
  }
}
</style>
