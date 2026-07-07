<template>
  <div class="markdown-renderer" v-html="renderedContent"></div>
</template>

<script setup>
import { computed } from 'vue';
import MarkdownIt from 'markdown-it';
import katex from 'katex';
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
});

const escapeHtml = (str) => {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

const unescapeHtml = (str) => {
  const div = document.createElement('div');
  div.innerHTML = str;
  return div.textContent;
};

const renderKatex = (latex, displayMode = false) => {
  try {
    const decodedLatex = unescapeHtml(latex);
    return katex.renderToString(decodedLatex, {
      displayMode,
      throwOnError: false,
      errorColor: '#cc0000'
    });
  } catch (error) {
    return escapeHtml(latex);
  }
};

const renderedContent = computed(() => {
  if (!props.content) return '';
  
  let content = props.content;
  
  let html = md.render(content);
  
  html = html.replace(/\$\$(.*?)\$\$/gs, (_, latex) => {
    return renderKatex(latex.trim(), true);
  });
  
  html = html.replace(/\$(.*?)\$/g, (_, latex) => {
    return renderKatex(latex.trim(), false);
  });
  
  html = html.replace(/<table([^>]*)>/g, '<div class="table-wrapper"><table$1>');
  html = html.replace(/<\/table>/g, '</table></div>');
  
  return html;
});
</script>

<style lang="less" scoped>
.markdown-renderer {
  line-height: 1.8;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);

  :deep(h1), :deep(h2), :deep(h3), :deep(h4), :deep(h5), :deep(h6) {
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

  :deep(pre) {
    background: var(--color-bg-secondary);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    overflow-x: auto;
    margin-bottom: var(--spacing-md);
  }

  :deep(pre code) {
    background: none;
    padding: 0;
    color: var(--color-text-primary);
    font-size: var(--font-size-xs);
  }

  :deep(.table-wrapper) {
    overflow-x: auto;
    margin-bottom: var(--spacing-md);
  }

  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--font-size-xs);
    min-width: 100%;
  }

  :deep(th), :deep(td) {
    border: 1px solid var(--color-border);
    padding: var(--spacing-sm);
    text-align: left;
    vertical-align: middle;
    white-space: normal;
    word-break: break-word;
    line-height: 1.6;
  }

  :deep(th) {
    background: rgba(var(--color-primary-rgb), 0.08);
    font-weight: var(--font-weight-semibold);
    color: var(--color-primary);
    white-space: nowrap;
    min-width: 80px;
  }

  :deep(tr:nth-child(even)) {
    background: rgba(var(--color-bg-secondary));
  }

  :deep(td .katex) {
    font-size: var(--font-size-xs);
    line-height: 1.4;
  }

  :deep(td .katex-display) {
    margin: 0;
    padding: 0;
  }

  :deep(blockquote) {
    border-left: 3px solid var(--color-primary);
    padding-left: var(--spacing-md);
    margin-left: 0;
    margin-bottom: var(--spacing-md);
    color: var(--color-text-secondary);
    background: rgba(var(--color-primary-rgb), 0.05);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  }

  :deep(a) {
    color: var(--color-primary);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  :deep(.katex) {
    font-size: var(--font-size-base);
  }

  :deep(.katex-display) {
    margin: var(--spacing-md) 0;
    overflow-x: auto;
    overflow-y: hidden;
  }

  :deep(svg) {
    max-width: 100%;
    height: auto;
    display: block;
    margin: var(--spacing-md) 0;
  }

  :deep(svg .stroke-primary) {
    stroke: var(--color-primary);
  }

  :deep(svg .fill-primary) {
    fill: var(--color-primary);
  }

  :deep(svg .stroke-text) {
    stroke: var(--color-text-primary);
  }

  :deep(svg .fill-text) {
    fill: var(--color-text-primary);
  }

  :deep(svg .stroke-border) {
    stroke: var(--color-border);
  }

  :deep(svg .fill-bg) {
    fill: var(--color-bg-secondary);
  }

  :deep(svg text) {
    fill: var(--color-text-primary);
    font-size: 12px;
  }
}
</style>