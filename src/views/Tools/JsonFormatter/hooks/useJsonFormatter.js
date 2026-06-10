import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import YAML from 'yaml';
import { showSuccessToast, showFailToast } from 'vant';

export function useJsonFormatter() {
  const { t } = useI18n();

  const inputJson = ref('');
  const outputJson = ref('');
  const indent = ref(2);
  const sortKeys = ref(false);
  const jsonPath = ref('');
  const queryResult = ref('');
  const errorMessage = ref('');

  const lineCount = computed(() => {
    return inputJson.value ? inputJson.value.split('\n').length : 0;
  });

  const outputLineCount = computed(() => {
    return outputJson.value ? outputJson.value.split('\n').length : 0;
  });

  const hasError = computed(() => !!errorMessage.value);

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

  const clearAll = () => {
    inputJson.value = '';
    outputJson.value = '';
    errorMessage.value = '';
    queryResult.value = '';
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      inputJson.value = text;
      showSuccessToast(t('tools.jsonFormatter.pasteSuccess'));
    } catch (error) {
      showFailToast(t('tools.jsonFormatter.pasteFailed'));
    }
  };

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

  const copyResult = async () => {
    if (!outputJson.value) return;

    try {
      await navigator.clipboard.writeText(outputJson.value);
      showSuccessToast(t('tools.jsonFormatter.copySuccess'));
    } catch (error) {
      showFailToast(t('tools.jsonFormatter.copyFailed'));
    }
  };

  const downloadResult = () => {
    if (!outputJson.value) return;

    const blob = new Blob([outputJson.value], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `data_${Date.now()}.json`;
    link.style.display = 'none';
    document.body.appendChild(link);
    
    try {
      link.dispatchEvent(new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      }));
    } catch (e) {
      link.click();
    }
    
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  };

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

  const escapeXml = (str) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

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

      const keys = [...new Set(parsed.flatMap(item => Object.keys(item)))];

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

  const getValueByPath = (obj, path) => {
    const keys = path.split('.').reduce((acc, key) => {
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

  return {
    inputJson,
    outputJson,
    indent,
    sortKeys,
    jsonPath,
    queryResult,
    errorMessage,
    lineCount,
    outputLineCount,
    hasError,
    formatJson,
    compressJson,
    clearAll,
    pasteFromClipboard,
    loadSample,
    copyResult,
    downloadResult,
    jsonToYaml,
    yamlToJson,
    jsonToXml,
    jsonToCsv,
    queryPath,
  };
}