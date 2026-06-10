<template>
  <van-popup
    :show="show"
    round
    position="bottom"
    @click-overlay="handleClose"
  >
    <div class="template-dialog">
      <van-nav-bar :title="currentTemplate?.label">
        <template #right>
          <van-icon name="cross" size="20" @click="handleClose" />
        </template>
      </van-nav-bar>

      <div class="dialog-content">
        <!-- WiFi模板 -->
        <template v-if="templateType === 'wifi'">
          <van-field
            :model-value="wifiForm.ssid"
            :label="t('tools.qrCode.generate.wifiName')"
            :placeholder="t('tools.qrCode.generate.wifiNamePlaceholder')"
            @update:model-value="updateWifiForm('ssid', $event)"
          />
          <van-field
            :model-value="wifiForm.password"
            type="password"
            :label="t('tools.qrCode.generate.wifiPassword')"
            :placeholder="t('tools.qrCode.generate.wifiPasswordPlaceholder')"
            @update:model-value="updateWifiForm('password', $event)"
          />
          <van-field
            :model-value="getWifiTypeLabel(wifiForm.type)"
            readonly
            :label="t('tools.qrCode.generate.wifiType')"
            right-icon="arrow"
            @click="handleWifiTypeClick"
          />
        </template>

        <!-- 电话模板 -->
        <template v-else-if="templateType === 'phone'">
          <van-field
            :model-value="phoneForm.number"
            type="tel"
            :label="t('tools.qrCode.generate.phoneNumber')"
            :placeholder="t('tools.qrCode.generate.phoneNumberPlaceholder')"
            @update:model-value="updatePhoneForm('number', $event)"
          />
        </template>

        <!-- 邮箱模板 -->
        <template v-else-if="templateType === 'email'">
          <van-field
            :model-value="emailForm.address"
            type="email"
            :label="t('tools.qrCode.generate.emailAddress')"
            :placeholder="t('tools.qrCode.generate.emailPlaceholder')"
            @update:model-value="updateEmailForm('address', $event)"
          />
          <van-field
            :model-value="emailForm.subject"
            :label="t('tools.qrCode.generate.emailSubject')"
            :placeholder="t('tools.qrCode.generate.emailSubjectPlaceholder')"
            @update:model-value="updateEmailForm('subject', $event)"
          />
          <van-field
            :model-value="emailForm.body"
            type="textarea"
            rows="2"
            :label="t('tools.qrCode.generate.emailBody')"
            :placeholder="t('tools.qrCode.generate.emailBodyPlaceholder')"
            @update:model-value="updateEmailForm('body', $event)"
          />
        </template>

        <!-- 短信模板 -->
        <template v-else-if="templateType === 'sms'">
          <van-field
            :model-value="smsForm.number"
            type="tel"
            :label="t('tools.qrCode.generate.smsNumber')"
            :placeholder="t('tools.qrCode.generate.phoneNumberPlaceholder')"
            @update:model-value="updateSmsForm('number', $event)"
          />
          <van-field
            :model-value="smsForm.message"
            type="textarea"
            rows="2"
            :label="t('tools.qrCode.generate.smsMessage')"
            :placeholder="t('tools.qrCode.generate.smsMessagePlaceholder')"
            @update:model-value="updateSmsForm('message', $event)"
          />
        </template>
      </div>

      <div class="dialog-footer">
        <van-button type="primary" block @click="handleApply">
          {{ t('tools.qrCode.generate.applyTemplate') }}
        </van-button>
      </div>
    </div>
  </van-popup>

  <!-- WiFi类型选择器 -->
  <van-action-sheet
    v-model:show="showWifiTypePicker"
    :actions="wifiTypeOptions"
    :cancel-text="t('common.cancel')"
    @select="handleWifiTypeSelect"
    @click-overlay="showWifiTypePicker = false"
  />
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  Field as VanField,
  Button as VanButton,
  Popup as VanPopup,
  NavBar as VanNavBar,
  Icon as VanIcon,
  ActionSheet as VanActionSheet,
} from 'vant';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  templateType: {
    type: String,
    default: '',
  },
  currentTemplate: {
    type: Object,
    default: null,
  },
  wifiForm: {
    type: Object,
    default: () => ({ ssid: '', password: '', type: 'WPA' }),
  },
  phoneForm: {
    type: Object,
    default: () => ({ number: '' }),
  },
  emailForm: {
    type: Object,
    default: () => ({ address: '', subject: '', body: '' }),
  },
  smsForm: {
    type: Object,
    default: () => ({ number: '', message: '' }),
  },
  wifiTypeOptions: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits([
  'update:show',
  'update:wifiForm',
  'update:phoneForm',
  'update:emailForm',
  'update:smsForm',
  'wifiTypeClick',
  'apply',
]);

const { t } = useI18n();

const showWifiTypePicker = ref(false);

// 获取WiFi类型标签
const getWifiTypeLabel = (value) => {
  const option = props.wifiTypeOptions.find(o => o.value === value);
  return option ? option.name : '';
};

const handleClose = () => {
  emit('update:show', false);
};

const updateWifiForm = (key, value) => {
  emit('update:wifiForm', { ...props.wifiForm, [key]: value });
};

const updatePhoneForm = (key, value) => {
  emit('update:phoneForm', { ...props.phoneForm, [key]: value });
};

const updateEmailForm = (key, value) => {
  emit('update:emailForm', { ...props.emailForm, [key]: value });
};

const updateSmsForm = (key, value) => {
  emit('update:smsForm', { ...props.smsForm, [key]: value });
};

const handleWifiTypeClick = () => {
  showWifiTypePicker.value = true;
};

const handleWifiTypeSelect = (action) => {
  emit('update:wifiForm', { ...props.wifiForm, type: action.value });
  showWifiTypePicker.value = false;
};

const handleApply = () => {
  emit('apply');
};
</script>

<style lang="less" scoped>
.template-dialog {
  padding: var(--spacing-md);
}

.dialog-content {
  :deep(.van-field) {
    margin-bottom: var(--spacing-sm);
    background: var(--color-bg-primary);
  }
}

.dialog-footer {
  margin-top: var(--spacing-lg);
}
</style>
