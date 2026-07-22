<template>
  <div v-if="visible" class="lyrics-preview">
    <div class="preview-content">
      <span class="current-lyric">{{ lyricText }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  lyricText: {
    type: String,
    default: ''
  }
})
</script>

<style lang="less" scoped>
.lyrics-preview {
  position: fixed;
  bottom: 60px;
  left: 0;
  right: 0;
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  z-index: 89;
  text-align: center;
  animation: fadeInUp 0.3s ease;

  .preview-content {
    .current-lyric {
      font-size: 14px;
      color: var(--color-text-secondary);
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
