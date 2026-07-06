<template>
  <div class="markdown-renderer" v-html="renderedContent"></div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue';
import MarkdownIt from 'markdown-it';
import MarkdownItKatex from 'markdown-it-katex';
import 'katex/dist/katex.min.css';

const props = defineProps({
  content: {
    type: String,
    default: ''
  }
});

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
}).use(MarkdownItKatex);

const renderedContent = computed(() => {
  if (!props.content) return '';
  return md.render(props.content);
});

onMounted(() => {
});

onUnmounted(() => {
});
</script>

<style lang="less" scoped>
.markdown-renderer {
  line-height: 1.8;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);

  ::v-deep(h1), ::v-deep(h2), ::v-deep(h3), ::v-deep(h4), ::v-deep(h5), ::v-deep(h6) {
    font-weight: var(--font-weight-semibold);
    margin-top: var(--spacing-lg);
    margin-bottom: var(--spacing-md);
    color: var(--color-text-primary);
  }

  :deep(h1) {
    font-size: var(--font-size-xl);
  }

  :deep(h2) {
    font-size: var(--font-size-lg);
    border-bottom: 1px solid var(--color-border);
    padding-bottom: var(--spacing-sm);
  }

  :deep(h3) {
    font-size: var(--font-size-base);
  }

  :deep(p) {
    margin-bottom: var(--spacing-md);
  }

  :deep(strong) {
    font-weight: var(--font-weight-semibold);
    color: var(--color-primary);
  }

  :deep(em) {
    font-style: italic;
  }

  :deep(ul), :deep(ol) {
    padding-left: var(--spacing-lg);
    margin-bottom: var(--spacing-md);
  }

  :deep(li) {
    margin-bottom: var(--spacing-xs);
  }

  :deep(li > ul), :deep(li > ol) {
    padding-left: var(--spacing-md);
    margin-top: var(--spacing-xs);
  }

  :deep(code) {
    background: rgba(var(--color-primary-rgb), 0.08);
    color: var(--color-primary);
    padding: 2px 6px;
    border-radius: var(--radius-sm);
    font-family: 'Courier New', monospace;
    font-size: var(--font-size-xs);
  }

  ::v-deep(pre) {
    background: var(--color-bg-secondary);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    overflow-x: auto;
    margin-bottom: var(--spacing-md);
  }

  ::v-deep(pre code) {
    background: none;
    padding: 0;
    color: var(--color-text-primary);
    font-size: var(--font-size-xs);
  }

  ::v-deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: var(--spacing-md);
    font-size: var(--font-size-xs);
  }

  ::v-deep(th), ::v-deep(td) {
    border: 1px solid var(--color-border);
    padding: var(--spacing-sm);
    text-align: left;
  }

  ::v-deep(th) {
    background: rgba(var(--color-primary-rgb), 0.08);
    font-weight: var(--font-weight-semibold);
    color: var(--color-primary);
  }

  ::v-deep(tr:nth-child(even)) {
    background: rgba(var(--color-bg-secondary));
  }

  ::v-deep(blockquote) {
    border-left: 3px solid var(--color-primary);
    padding-left: var(--spacing-md);
    margin-left: 0;
    margin-bottom: var(--spacing-md);
    color: var(--color-text-secondary);
    background: rgba(var(--color-primary-rgb), 0.05);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  }

  ::v-deep(a) {
    color: var(--color-primary);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  ::v-deep(.katex) {
    font-size: var(--font-size-base);
  }

  ::v-deep(.katex-display) {
    margin: var(--spacing-md) 0;
    overflow-x: auto;
    overflow-y: hidden;
  }

  ::v-deep(svg) {
    max-width: 100%;
    height: auto;
    display: block;
    margin: var(--spacing-md) 0;
  }

  ::v-deep(svg .stroke-primary) {
    stroke: var(--color-primary);
  }

  ::v-deep(svg .fill-primary) {
    fill: var(--color-primary);
  }

  ::v-deep(svg .stroke-text) {
    stroke: var(--color-text-primary);
  }

  ::v-deep(svg .fill-text) {
    fill: var(--color-text-primary);
  }

  ::v-deep(svg .stroke-border) {
    stroke: var(--color-border);
  }

  ::v-deep(svg .fill-bg) {
    fill: var(--color-bg-secondary);
  }

  ::v-deep(svg text) {
    fill: var(--color-text-primary);
    font-size: 12px;
  }
}
</style>
