<template>
  <van-action-sheet
    :show="visible"
    :actions="avatarActions"
    @update:show="handleClose"
    @select="handleSelect"
    :cancel-text="t('common.cancel')"
  />

  <input
    ref="fileInputRef"
    type="file"
    accept="image/*"
    :capture="captureType"
    style="display: none"
    @change="handleFileChange"
  />
</template>

<script setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { showToast } from 'vant';
  import { ActionSheet as VanActionSheet } from 'vant';

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['update:visible', 'select-image']);

  const { t } = useI18n();

  const fileInputRef = ref(null);
  const captureType = ref('');

  const avatarActions = [
    { name: '拍照', value: 'camera' },
    { name: '从相册选择', value: 'album' },
  ];

  const handleClose = () => {
    emit('update:visible', false);
  };

  const handleSelect = action => {
    emit('update:visible', false);

    if (action.value === 'camera') {
      captureType.value = 'camera';
    } else {
      captureType.value = '';
    }

    setTimeout(() => {
      fileInputRef.value?.click();
    }, 300);
  };

  const handleFileChange = event => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast({ type: 'fail', message: t('settings.invalidImageFile') });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast({ type: 'fail', message: t('settings.imageTooLarge') });
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      emit('select-image', e.target?.result);
    };
    reader.readAsDataURL(file);

    event.target.value = '';
  };
</script>
