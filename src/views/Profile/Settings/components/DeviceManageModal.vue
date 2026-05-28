<template>
  <van-popup
    :show="visible"
    position="bottom"
    :style="{ height: '75%' }"
    round
    closeable
    @close="handleClose"
    @open="loadDevices"
  >
    <div class="device-manage-popup">
      <div class="popup-header">
        <h3>{{ t('settings.deviceManageTitle') }}</h3>
        <p class="subtitle">{{ t('settings.totalDevices', { count: devices.length }) }}</p>
      </div>

      <div class="device-list">
        <van-empty
          v-if="devices.length === 0"
          :description="t('settings.noDevices')"
          image="search"
        />

        <div
          v-for="(device, index) in devices"
          :key="device.id"
          class="device-item"
          :class="{ 'current-device': device.isCurrent }"
        >
          <div class="device-info">
            <div class="device-icon">
              <van-icon
                :name="getDeviceIcon(device.type)"
                size="32"
                :color="device.isCurrent ? 'var(--color-primary)' : '#999'"
              />
            </div>

            <div class="device-details">
              <div class="device-name">
                {{ device.name }}
                <van-tag v-if="device.isCurrent" type="primary" size="mini" round>{{
                  t('settings.currentDevice')
                }}</van-tag>
                <van-tag v-if="device.isTrusted" type="success" size="mini" round>{{
                  t('settings.trustedDevice')
                }}</van-tag>
              </div>

              <div class="device-meta">
                <span class="meta-item">
                  <van-icon name="location-o" size="12" />
                  {{ device.location || t('settings.unknownLocation') }}
                </span>
                <span class="meta-item">
                  <van-icon name="clock-o" size="12" />
                  {{ formatDeviceTime(device.lastLogin) }}
                </span>
              </div>

              <div class="device-ip">IP: {{ device.ip }}</div>
            </div>
          </div>

          <div class="device-actions" v-if="!device.isCurrent">
            <van-button size="mini" plain type="primary" @click="handleToggleTrust(device)">
              {{ device.isTrusted ? t('settings.untrust') : t('settings.trust') }}
            </van-button>

            <van-button size="mini" type="danger" plain @click="handleRemove(device)">
              {{ t('settings.removeDevice') }}
            </van-button>
          </div>
        </div>
      </div>

      <div class="device-footer">
        <van-button block round type="danger" @click="handleRemoveAll">
          {{ t('settings.removeAllDevices') }}
        </van-button>

        <div class="footer-tips">
          <van-icon name="info-o" size="14" />
          <span>{{ t('settings.removeDeviceTip') }}</span>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
  import { ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { showToast, showConfirmDialog } from 'vant';
  import {
    Popup as VanPopup,
    Empty as VanEmpty,
    Icon as VanIcon,
    Tag as VanTag,
    Button as VanButton,
  } from 'vant';

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['update:visible', 'update-devices']);

  const { t } = useI18n();

  const devices = ref([]);

  const loadDevices = () => {
    const storedDevices = localStorage.getItem('loginDevices');

    if (storedDevices) {
      try {
        const parsedDevices = JSON.parse(storedDevices);
        if (Array.isArray(parsedDevices) && parsedDevices.length > 0) {
          devices.value = parsedDevices;
        } else {
          devices.value = getDefaultDevices();
          saveDevices();
        }
      } catch {
        devices.value = getDefaultDevices();
        saveDevices();
      }
    } else {
      devices.value = getDefaultDevices();
      saveDevices();
    }
  };

  const getDefaultDevices = () => [
    {
      id: 1,
      name: 'iPhone 14 Pro',
      type: 'mobile',
      location: '北京',
      ip: '192.168.1.100',
      lastLogin: Date.now(),
      isCurrent: true,
      isTrusted: true,
    },
    {
      id: 2,
      name: 'MacBook Pro',
      type: 'desktop',
      location: '上海',
      ip: '192.168.1.101',
      lastLogin: Date.now() - 86400000,
      isCurrent: false,
      isTrusted: true,
    },
    {
      id: 3,
      name: 'iPad Air',
      type: 'tablet',
      location: '广州',
      ip: '192.168.1.102',
      lastLogin: Date.now() - 259200000,
      isCurrent: false,
      isTrusted: false,
    },
  ];

  const saveDevices = () => {
    localStorage.setItem('loginDevices', JSON.stringify(devices.value));
    emit('update-devices', devices.value);
  };

  const getDeviceIcon = type => {
    const iconMap = {
      mobile: 'phone-o',
      tablet: 'pad',
      desktop: 'desktop-o',
    };
    return iconMap[type] || 'cluster-o';
  };

  const formatDeviceTime = timestamp => {
    const now = Date.now();
    const diff = now - timestamp;

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (diff < minute) {
      return t('settings.justNow');
    } else if (diff < hour) {
      return `${Math.floor(diff / minute)}${t('settings.minutesAgo')}`;
    } else if (diff < day) {
      return `${Math.floor(diff / hour)}${t('settings.hoursAgo')}`;
    } else {
      return `${Math.floor(diff / day)}${t('settings.daysAgo')}`;
    }
  };

  const handleClose = () => {
    emit('update:visible', false);
  };

  const handleToggleTrust = async device => {
    try {
      await showConfirmDialog({
        title: device.isTrusted ? t('settings.untrustDevice') : t('settings.trustDevice'),
        message: device.isTrusted
          ? t('settings.untrustConfirm').replace('{device}', device.name)
          : t('settings.trustConfirm').replace('{device}', device.name),
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
      });

      device.isTrusted = !device.isTrusted;
      saveDevices();

      showToast({
        type: 'success',
        message: device.isTrusted ? t('settings.trusted') : t('settings.untrusted'),
      });
    } catch {}
  };

  const handleRemove = async device => {
    try {
      await showConfirmDialog({
        title: t('settings.removeDeviceTitle'),
        message: t('settings.removeDeviceMessage').replace('{device}', device.name),
        confirmButtonText: t('settings.confirmRemove'),
        cancelButtonText: t('common.cancel'),
      });

      devices.value = devices.value.filter(d => d.id !== device.id);
      saveDevices();

      showToast({
        type: 'success',
        message: t('settings.deviceRemoved'),
      });
    } catch {}
  };

  const handleRemoveAll = async () => {
    const otherDevices = devices.value.filter(d => !d.isCurrent);

    if (otherDevices.length === 0) {
      showToast(t('settings.noOtherDevices'));
      return;
    }

    try {
      await showConfirmDialog({
        title: t('settings.removeAllDevicesTitle'),
        message: t('settings.removeAllDevicesMessage').replace('{count}', otherDevices.length),
        confirmButtonText: t('settings.confirmRemove'),
        cancelButtonText: t('common.cancel'),
        confirmButtonColor: '#ff4d4f',
      });

      devices.value = devices.value.filter(d => d.isCurrent);
      saveDevices();

      showToast({
        type: 'success',
        message: t('settings.allDevicesRemoved'),
      });
    } catch {}
  };
</script>

<style lang="less" scoped>
  .device-manage-popup {
    height: 100%;
    display: flex;
    flex-direction: column;

    .popup-header {
      padding: var(--spacing-md);
      border-bottom: 1px solid var(--color-border);
      text-align: center;

      h3 {
        margin: 0 0 3px 0;
        font-size: var(--font-size-md);
        color: var(--color-text-primary);
      }

      .subtitle {
        margin: 0;
        font-size: 11px;
        color: var(--color-text-secondary);
      }
    }

    .device-list {
      flex: 1;
      overflow-y: auto;
      padding: var(--spacing-sm);

      .device-item {
        background: var(--color-bg-card);
        border-radius: var(--radius-sm);
        padding: var(--spacing-sm);
        margin-bottom: var(--spacing-sm);
        box-shadow: var(--shadow-card);
        transition: all var(--transition-fast);

        &.current-device {
          border: 1px solid var(--color-primary);
          background: linear-gradient(135deg, rgba(0, 122, 255, 0.05), rgba(0, 122, 255, 0.02));
        }

        &:active {
          transform: scale(0.98);
        }

        .device-info {
          display: flex;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-sm);

          .device-icon {
            flex-shrink: 0;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--color-bg-tertiary);
            border-radius: var(--radius-sm);
          }

          .device-details {
            flex: 1;
            min-width: 0;

            .device-name {
              display: flex;
              align-items: center;
              gap: var(--spacing-xs);
              font-size: 13px;
              font-weight: var(--font-weight-semibold);
              color: var(--color-text-primary);
              margin-bottom: 3px;
              flex-wrap: wrap;

              .van-tag {
                flex-shrink: 0;
              }
            }

            .device-meta {
              display: flex;
              gap: var(--spacing-sm);
              font-size: 11px;
              color: var(--color-text-secondary);
              margin-bottom: 3px;

              .meta-item {
                display: flex;
                align-items: center;
                gap: 2px;
              }
            }

            .device-ip {
              font-size: 10px;
              color: var(--color-text-tertiary);
            }
          }
        }

        .device-actions {
          display: flex;
          gap: var(--spacing-sm);
          justify-content: flex-end;
        }
      }
    }

    .device-footer {
      padding: var(--spacing-md);
      border-top: 1px solid var(--color-border);

      .footer-tips {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-xs);
        font-size: 11px;
        color: var(--color-text-secondary);
        margin-top: var(--spacing-sm);
      }
    }
  }
</style>
