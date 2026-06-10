<template>
  <div class="json-formatter">
    <!-- 工具栏 -->
    <div class="toolbar">
      <div class="button-group">
        <van-button size="small" type="primary" @click="formatJson">
          {{ t('tools.jsonFormatter.format') }}
        </van-button>
        <van-button size="small" @click="compressJson">
          {{ t('tools.jsonFormatter.compress') }}
        </van-button>
        <van-button size="small" @click="clearAll">
          {{ t('tools.jsonFormatter.clear') }}
        </van-button>
      </div>
    </div>

    <!-- 编辑区域 -->
    <div class="editor-container">
      <!-- 输入区域 -->
      <div class="editor-panel">
        <div class="panel-header">
          <span>{{ t('tools.jsonFormatter.input') }}</span>
          <div class="panel-actions">
            <van-button size="mini" plain @click="pasteFromClipboard">
              {{ t('tools.jsonFormatter.paste') }}
            </van-button>
            <van-button size="mini" plain @click="loadSample">
              {{ t('tools.jsonFormatter.sample') }}
            </van-button>
          </div>
        </div>
        <div class="editor-wrapper">
          <textarea
            v-model="inputJson"
            :placeholder="t('tools.jsonFormatter.inputPlaceholder')"
            class="json-textarea"
            spellcheck="false"
          ></textarea>
        </div>
        <div v-if="inputJson" class="panel-footer">
          <span>{{ t('tools.jsonFormatter.chars') }}: {{ inputJson.length }}</span>
          <span>{{ t('tools.jsonFormatter.lines') }}: {{ lineCount }}</span>
        </div>
      </div>

      <!-- 输出区域 -->
      <div class="editor-panel">
        <div class="panel-header">
          <span>{{ t('tools.jsonFormatter.output') }}</span>
          <div class="panel-actions">
            <van-button size="mini" type="primary" plain @click="copyResult">
              {{ t('tools.jsonFormatter.copy') }}
            </van-button>
            <van-button size="mini" plain @click="downloadResult">
              {{ t('tools.jsonFormatter.download') }}
            </van-button>
          </div>
        </div>
        <div class="editor-wrapper">
          <textarea
            v-model="outputJson"
            :placeholder="t('tools.jsonFormatter.outputPlaceholder')"
            class="json-textarea"
            :class="{ 'has-error': hasError }"
            spellcheck="false"
            readonly
          ></textarea>
        </div>
        <div v-if="outputJson" class="panel-footer">
          <span>{{ t('tools.jsonFormatter.chars') }}: {{ outputJson.length }}</span>
          <span>{{ t('tools.jsonFormatter.lines') }}: {{ outputLineCount }}</span>
        </div>
      </div>
    </div>

    <!-- 错误信息 -->
    <div v-if="errorMessage" class="error-section">
      <van-notice-bar color="var(--color-danger)" background="var(--color-bg-secondary)">
        {{ errorMessage }}
      </van-notice-bar>
    </div>

    <!-- 设置选项 -->
    <div class="settings-section">
      <van-cell-group inset>
        <van-cell :title="t('tools.jsonFormatter.indent')">
          <van-stepper v-model="indent" min="1" max="8" />
        </van-cell>
        <van-cell :title="t('tools.jsonFormatter.sortKeys')">
          <van-switch v-model="sortKeys" size="20" />
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 转换工具 -->
    <div class="convert-section">
      <div class="section-title">{{ t('tools.jsonFormatter.convertTools') }}</div>
      <div class="convert-buttons">
        <van-button size="small" plain @click="jsonToYaml">
          JSON → YAML
        </van-button>
        <van-button size="small" plain @click="yamlToJson">
          YAML → JSON
        </van-button>
        <van-button size="small" plain @click="jsonToXml">
          JSON → XML
        </van-button>
        <van-button size="small" plain @click="jsonToCsv">
          JSON → CSV
        </van-button>
      </div>
    </div>

    <!-- JSON路径查询 -->
    <div class="path-query-section">
      <div class="section-title">{{ t('tools.jsonFormatter.pathQuery') }}</div>
      <van-field
        v-model="jsonPath"
        :placeholder="t('tools.jsonFormatter.pathPlaceholder')"
        class="path-input"
      >
        <template #button>
          <van-button size="small" type="primary" @click="queryPath">
            {{ t('tools.jsonFormatter.query') }}
          </van-button>
        </template>
      </van-field>
      <div v-if="queryResult" class="query-result">
        <pre>{{ queryResult }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import YAML from 'yaml';
import {
  Button as VanButton,
  Cell as VanCell,
  CellGroup as VanCellGroup,
  Stepper as VanStepper,
  Switch as VanSwitch,
  Field as VanField,
  NoticeBar as VanNoticeBar,
  showSuccessToast,
  showFailToast,
} from 'vant';

const { t } = useI18n();

// 状态
const inputJson = ref('');
const outputJson = ref('');
const indent = ref(2);
const sortKeys = ref(false);
const jsonPath = ref('');
const queryResult = ref('');
const errorMessage = ref('');

// 行数统计
const lineCount = computed(() => {
  return inputJson.value ? inputJson.value.split('\n').length : 0;
});

const outputLineCount = computed(() => {
  return outputJson.value ? outputJson.value.split('\n').length : 0;
});

// 是否有错误
const hasError = computed(() => !!errorMessage.value);

// 格式化JSON
const formatJson = () => {
  errorMessage.value = '';

  if (!inputJson.value.trim()) {
    showFailToast(t('tools.jsonFormatter.emptyInput'));
    return;
  }

  try {
    const parsed = JSON.parse(inputJson.value);
    outputJson.value = JSON.stringify(parsed, sortKeys.value ? sortObjectKeys : null, indent.value);
    showSuccessToast(t('tools.jsonFormatter.formatSuccess'));
  } catch (error) {
    errorMessage.value = `${t('tools.jsonFormatter.parseError')}: ${error.message}`;
    outputJson.value = inputJson.value;
  }
};

// 压缩JSON
const compressJson = () => {
  errorMessage.value = '';

  if (!inputJson.value.trim()) {
    showFailToast(t('tools.jsonFormatter.emptyInput'));
    return;
  }

  try {
    const parsed = JSON.parse(inputJson.value);
    outputJson.value = JSON.stringify(parsed);
    showSuccessToast(t('tools.jsonFormatter.compressSuccess'));
  } catch (error) {
    errorMessage.value = `${t('tools.jsonFormatter.parseError')}: ${error.message}`;
    outputJson.value = inputJson.value;
  }
};

// 排序键
const sortObjectKeys = (key, value) => {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return Object.keys(value)
      .sort()
      .reduce((acc, k) => {
        acc[k] = value[k];
        return acc;
      }, {});
  }
  return value;
};

// 清空
const clearAll = () => {
  inputJson.value = '';
  outputJson.value = '';
  errorMessage.value = '';
  queryResult.value = '';
};

// 从剪贴板粘贴
const pasteFromClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText();
    inputJson.value = text;
    showSuccessToast(t('tools.jsonFormatter.pasteSuccess'));
  } catch (error) {
    showFailToast(t('tools.jsonFormatter.pasteFailed'));
  }
};

// 加载示例
const loadSample = () => {
  inputJson.value = JSON.stringify(
    {
      name: '张三',
      age: 28,
      email: 'zhangsan@example.com',
      skills: ['JavaScript', 'Vue', 'React'],
      address: {
        city: '北京',
        district: '朝阳区',
      },
      projects: [
        { name: '项目A', status: 'completed' },
        { name: '项目B', status: 'ongoing' },
      ],
    },
    null,
    2
  );
};

// 复制结果
const copyResult = async () => {
  if (!outputJson.value) return;

  try {
    await navigator.clipboard.writeText(outputJson.value);
    showSuccessToast(t('tools.jsonFormatter.copySuccess'));
  } catch (error) {
    showFailToast(t('tools.jsonFormatter.copyFailed'));
  }
};

// 下载结果
const downloadResult = () => {
  if (!outputJson.value) return;

  const blob = new Blob([outputJson.value], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `data_${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

// JSON转YAML
const jsonToYaml = () => {
  errorMessage.value = '';

  if (!inputJson.value.trim()) {
    showFailToast(t('tools.jsonFormatter.emptyInput'));
    return;
  }

  try {
    const parsed = JSON.parse(inputJson.value);
    outputJson.value = YAML.stringify(parsed);
    showSuccessToast(t('tools.jsonFormatter.convertSuccess'));
  } catch (error) {
    errorMessage.value = `${t('tools.jsonFormatter.parseError')}: ${error.message}`;
  }
};

// YAML转JSON
const yamlToJson = () => {
  errorMessage.value = '';

  if (!inputJson.value.trim()) {
    showFailToast(t('tools.jsonFormatter.emptyInput'));
    return;
  }

  try {
    const parsed = YAML.parse(inputJson.value);
    outputJson.value = JSON.stringify(parsed, null, indent.value);
    showSuccessToast(t('tools.jsonFormatter.convertSuccess'));
  } catch (error) {
    errorMessage.value = `${t('tools.jsonFormatter.parseError')}: ${error.message}`;
  }
};

// JSON转XML
const jsonToXml = () => {
  errorMessage.value = '';

  if (!inputJson.value.trim()) {
    showFailToast(t('tools.jsonFormatter.emptyInput'));
    return;
  }

  try {
    const parsed = JSON.parse(inputJson.value);
    outputJson.value = jsonToXmlString(parsed, 'root');
    showSuccessToast(t('tools.jsonFormatter.convertSuccess'));
  } catch (error) {
    errorMessage.value = `${t('tools.jsonFormatter.parseError')}: ${error.message}`;
  }
};

// JSON转XML字符串
const jsonToXmlString = (obj, rootName) => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';

  const convert = (data, name) => {
    if (data === null || data === undefined) {
      return `<${name}/>`;
    }

    if (typeof data !== 'object') {
      return `<${name}>${escapeXml(String(data))}</${name}>`;
    }

    if (Array.isArray(data)) {
      return data.map(item => convert(item, 'item')).join('\n  ');
    }

    let result = `<${name}>\n  `;
    for (const [key, value] of Object.entries(data)) {
      result += convert(value, key) + '\n  ';
    }
    result += `</${name}>`;
    return result;
  };

  xml += convert(obj, rootName);
  return xml;
};

// XML转义
const escapeXml = (str) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

// JSON转CSV
const jsonToCsv = () => {
  errorMessage.value = '';

  if (!inputJson.value.trim()) {
    showFailToast(t('tools.jsonFormatter.emptyInput'));
    return;
  }

  try {
    const parsed = JSON.parse(inputJson.value);

    if (!Array.isArray(parsed)) {
      showFailToast(t('tools.jsonFormatter.notArray'));
      return;
    }

    if (parsed.length === 0) {
      outputJson.value = '';
      return;
    }

    // 获取所有键
    const keys = [...new Set(parsed.flatMap(item => Object.keys(item)))];

    // 生成CSV
    let csv = keys.map(k => `"${k}"`).join(',') + '\n';
    csv += parsed
      .map(item => keys.map(k => `"${item[k] ?? ''}"`).join(','))
      .join('\n');

    outputJson.value = csv;
    showSuccessToast(t('tools.jsonFormatter.convertSuccess'));
  } catch (error) {
    errorMessage.value = `${t('tools.jsonFormatter.parseError')}: ${error.message}`;
  }
};

// JSON路径查询
const queryPath = () => {
  errorMessage.value = '';
  queryResult.value = '';

  if (!inputJson.value.trim()) {
    showFailToast(t('tools.jsonFormatter.emptyInput'));
    return;
  }

  if (!jsonPath.value.trim()) {
    showFailToast(t('tools.jsonFormatter.emptyPath'));
    return;
  }

  try {
    const parsed = JSON.parse(inputJson.value);
    const result = getValueByPath(parsed, jsonPath.value);

    if (result === undefined) {
      queryResult.value = t('tools.jsonFormatter.pathNotFound');
    } else {
      queryResult.value = JSON.stringify(result, null, indent.value);
    }
  } catch (error) {
    errorMessage.value = `${t('tools.jsonFormatter.parseError')}: ${error.message}`;
  }
};

// 根据路径获取值
const getValueByPath = (obj, path) => {
  const keys = path.split('.').reduce((acc, key) => {
    // 处理数组索引
    const match = key.match(/^(\w+)?\[(\d+)\]$/);
    if (match) {
      if (match[1]) acc.push(match[1]);
      acc.push(parseInt(match[2]));
    } else {
      acc.push(key);
    }
    return acc;
  }, []);

  return keys.reduce((current, key) => {
    if (current === null || current === undefined) return undefined;
    return current[key];
  }, obj);
};
</script>

<style lang="less" scoped>
.json-formatter {
  padding: var(--spacing-md);
  padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom, 0px));
}

.toolbar {
  margin-bottom: var(--spacing-md);
}

.button-group {
  display: flex;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  overflow: hidden;

  :deep(.van-button) {
    border-radius: 0;
    border-left: 1px solid var(--color-border);

    &:first-child {
      border-left: none;
    }
  }
}

.editor-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.editor-panel {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  overflow: hidden;

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--color-bg-tertiary);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);

    .panel-actions {
      display: flex;
      gap: var(--spacing-xs);
    }
  }

  .editor-wrapper {
    padding: var(--spacing-sm);
  }

  .json-textarea {
    width: 100%;
    min-height: 200px;
    padding: var(--spacing-sm);
    background: var(--color-bg-primary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
    font-size: var(--font-size-sm);
    line-height: 1.5;
    resize: vertical;
    color: var(--color-text-primary);

    &::placeholder {
      color: var(--color-text-secondary);
    }

    &:focus {
      outline: none;
      border-color: var(--color-primary);
    }

    &.has-error {
      border-color: var(--color-danger);
    }
  }

  .panel-footer {
    display: flex;
    gap: var(--spacing-md);
    padding: var(--spacing-xs) var(--spacing-md);
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    border-top: 1px solid var(--color-border);
  }
}

.error-section {
  margin-bottom: var(--spacing-md);
}

.settings-section {
  margin-bottom: var(--spacing-lg);

  :deep(.van-cell) {
    background: var(--color-bg-secondary);
  }
}

.convert-section,
.path-query-section {
  margin-bottom: var(--spacing-lg);

  .section-title {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    margin-bottom: var(--spacing-sm);
    color: var(--color-text-secondary);
  }

  .convert-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
  }

  .path-input {
    background: var(--color-bg-secondary);
    border-radius: var(--radius-md);
  }

  .query-result {
    margin-top: var(--spacing-sm);
    padding: var(--spacing-md);
    background: var(--color-bg-secondary);
    border-radius: var(--radius-md);
    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
    font-size: var(--font-size-sm);
    overflow-x: auto;

    pre {
      margin: 0;
      white-space: pre-wrap;
      word-break: break-all;
    }
  }
}
</style>
