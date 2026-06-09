<template>
  <div class="basic-info">
    <div class="avatar-section">
      <div class="avatar-container">
        <van-uploader 
          v-model="avatarFiles" 
          :max-count="1" 
          :after-read="afterRead" 
          :on-delete="removeAvatar"
          accept="image/*"
          :preview-options="previewOptions"
        >
          <div class="upload-placeholder">
            <van-icon name="plus" />
            <div>上传证件照</div>
          </div>
        </van-uploader>
      </div>
    </div>
    <van-cell-group inset>
      <van-field
        v-model="formData.name"
        :label="t('resume.basic.name')"
        :placeholder="t('resume.basic.namePlaceholder')"
        clearable
        required
        @update:model-value="emitUpdate"
      />
      <van-field
        v-model="formData.title"
        :label="t('resume.basic.title')"
        :placeholder="t('resume.basic.titlePlaceholder')"
        clearable
        @update:model-value="emitUpdate"
      />
      <van-field
        v-model="formData.phone"
        :label="t('resume.basic.phone')"
        :placeholder="t('resume.basic.phonePlaceholder')"
        type="tel"
        clearable
        @update:model-value="emitUpdate"
      />
      <van-field
        v-model="formData.email"
        :label="t('resume.basic.email')"
        :placeholder="t('resume.basic.emailPlaceholder')"
        type="email"
        clearable
        @update:model-value="emitUpdate"
      />
      <van-field
        v-model="formData.location"
        :label="t('resume.basic.location')"
        :placeholder="t('resume.basic.locationPlaceholder')"
        clearable
        @update:model-value="emitUpdate"
      />
      <van-field
        v-model="formData.summary"
        :label="t('resume.basic.summary')"
        :placeholder="t('resume.basic.summaryPlaceholder')"
        type="textarea"
        rows="3"
        autosize
        show-word-limit
        maxlength="500"
        @update:model-value="emitUpdate"
      />

      <div v-if="customFields.length" class="custom-fields">
        <div class="custom-section">
          <div class="section-header">
            <span class="section-title">{{ t('resume.basic.customFields') }}</span>
          </div>
          <div v-for="(field, index) in customFields" :key="index" class="custom-field-row">
            <van-field
              v-model="field.label"
              :placeholder="t('resume.basic.customLabelPlaceholder')"
              clearable
              class="custom-label"
              @update:model-value="emitUpdate"
            />
            <van-field
              v-model="field.value"
              :placeholder="t('resume.basic.customValuePlaceholder')"
              clearable
              class="custom-value"
              @update:model-value="emitUpdate"
            />
            <van-button size="small" type="danger" plain @click="removeCustomField(index)">
              {{ t('resume.common.delete') }}
            </van-button>
          </div>
        </div>
      </div>

      <van-button type="primary" plain block @click="addCustomField">
        <van-icon name="plus" />
        {{ t('resume.basic.addCustomField') }}
      </van-button>
    </van-cell-group>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { CellGroup as VanCellGroup, Field as VanField, Button as VanButton, Icon as VanIcon, Uploader as VanUploader } from 'vant';

const { t } = useI18n();

const props = defineProps({
  modelValue: { type: Object, required: true },
});

const emit = defineEmits(['update:modelValue']);

const formData = ref({});
const avatarFiles = ref([]);

const previewOptions = computed(() => ({
  images: avatarFiles.value.map(item => item.content),
}));

const customFields = computed({
  get: () => formData.value.customFields || [],
  set: (val) => {
    formData.value.customFields = val;
    emitUpdate();
  },
});

const initFormData = () => {
  formData.value = { 
    ...props.modelValue, 
    customFields: props.modelValue.customFields || [] 
  };
  if (formData.value.avatar) {
    avatarFiles.value = [{ content: formData.value.avatar }];
  } else {
    avatarFiles.value = [];
  }
};

onMounted(() => {
  initFormData();
});

watch(() => props.modelValue, () => {
  initFormData();
}, { deep: true });

const afterRead = (file) => {
  if (file.content) {
    formData.value.avatar = file.content;
    emitUpdate();
  }
};

const removeAvatar = ({ callback }) => {
  formData.value.avatar = '';
  emitUpdate();
  if (callback) callback();
};

const emitUpdate = () => {
  emit('update:modelValue', { ...formData.value });
};

const addCustomField = () => {
  customFields.value = [...customFields.value, { label: '', value: '' }];
};

const removeCustomField = (index) => {
  customFields.value = customFields.value.filter((_, i) => i !== index);
};
</script>

<style lang="less" scoped>
.basic-info {
  :deep(.van-cell-group) { margin: 0; }
  :deep(.van-field__label) { width: 80px; color: var(--color-text-secondary); }
}

.avatar-section {
  padding: var(--spacing-md);
  display: flex;
  justify-content: center;
}

.avatar-container {
  :deep(.van-uploader__upload) {
    width: 100px;
    height: 100px;
    border: 1px dashed #ccc;
    border-radius: 8px;
  }
  
  :deep(.van-uploader__preview-image) {
    width: 100px !important;
    height: 100px !important;
    border-radius: 8px;
  }
  
  :deep(.van-uploader__preview-delete) {
    border-radius: 50%;
  }
  
  .upload-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #999;
    font-size: 12px;
    
    .van-icon {
      font-size: 24px;
      margin-bottom: 4px;
    }
  }
}

.custom-fields {
  margin-top: var(--spacing-md);
}

.custom-section {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}

.section-header {
  margin-bottom: var(--spacing-md);
  .section-title { font-size: var(--font-size-base); font-weight: var(--font-weight-semibold); }
}

.custom-field-row {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
  margin-bottom: var(--spacing-sm);

  &:last-child { margin-bottom: 0; }

  .custom-label { flex: 1; min-width: 0; }
  .custom-value { flex: 2; min-width: 0; }
}
</style>
