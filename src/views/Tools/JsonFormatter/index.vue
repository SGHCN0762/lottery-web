<template>
  <div class="json-formatter">
    <ToolBar
      @format="formatJson"
      @compress="compressJson"
      @clear="clearAll"
    />

    <div class="editor-container">
      <EditorPanel
        v-model="inputJson"
        :title="t('tools.jsonFormatter.input')"
        :placeholder="t('tools.jsonFormatter.inputPlaceholder')"
      >
        <template #actions>
          <van-button size="mini" plain @click="pasteFromClipboard">
            {{ t('tools.jsonFormatter.paste') }}
          </van-button>
          <van-button size="mini" plain @click="loadSample">
            {{ t('tools.jsonFormatter.sample') }}
          </van-button>
        </template>
      </EditorPanel>

      <EditorPanel
        v-model="outputJson"
        :title="t('tools.jsonFormatter.output')"
        :placeholder="t('tools.jsonFormatter.outputPlaceholder')"
        :has-error="hasError"
        readonly
      >
        <template #actions>
          <van-button size="mini" type="primary" plain @click="copyResult">
            {{ t('tools.jsonFormatter.copy') }}
          </van-button>
          <van-button size="mini" plain @click="downloadResult">
            {{ t('tools.jsonFormatter.download') }}
          </van-button>
        </template>
      </EditorPanel>
    </div>

    <div v-if="errorMessage" class="error-section">
      <van-notice-bar color="var(--color-danger)" background="var(--color-bg-secondary)">
        {{ errorMessage }}
      </van-notice-bar>
    </div>

    <SettingsSection
      v-model:indent="indent"
      v-model:sort-keys="sortKeys"
    />

    <ConvertSection
      @json-to-yaml="jsonToYaml"
      @yaml-to-json="yamlToJson"
      @json-to-xml="jsonToXml"
      @json-to-csv="jsonToCsv"
    />

    <PathQuerySection
      v-model="jsonPath"
      :query-result="queryResult"
      @query="queryPath"
    />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { Button as VanButton, NoticeBar as VanNoticeBar } from 'vant';
import ToolBar from './components/ToolBar.vue';
import EditorPanel from './components/EditorPanel.vue';
import SettingsSection from './components/SettingsSection.vue';
import ConvertSection from './components/ConvertSection.vue';
import PathQuerySection from './components/PathQuerySection.vue';
import { useJsonFormatter } from './hooks/useJsonFormatter';

const { t } = useI18n();

const {
  inputJson,
  outputJson,
  indent,
  sortKeys,
  jsonPath,
  queryResult,
  errorMessage,
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
} = useJsonFormatter();
</script>

<style lang="less" scoped>
.json-formatter {
  padding: var(--spacing-md);
  padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom, 0px));
}

.editor-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.error-section {
  margin-bottom: var(--spacing-md);
}
</style>