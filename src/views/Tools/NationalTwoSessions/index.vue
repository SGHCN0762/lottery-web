<template>
  <div class="national-two-sessions-page">
    <div class="page-content">
      <van-tabs v-model:active="activeTab" class="tab-container">
        <van-tab title="政府工作报告">
          <div class="tab-content">
            <div class="year-filter">
              <van-field
                v-model="yearDisplay"
                readonly
                clickable
                placeholder="选择年份"
                right-icon="arrow-down"
                @click="showYearPicker = true"
              >
                <template #right-icon v-if="selectedYear">
                  <van-icon name="cross" @click.stop="clearYearFilter" />
                </template>
              </van-field>
              <van-popup v-model:show="showYearPicker" position="bottom">
                <van-picker
                  :columns="yearOptions"
                  :default-index="0"
                  show-toolbar
                  @confirm="onYearConfirm"
                  @cancel="showYearPicker = false"
                />
              </van-popup>
            </div>

            <div class="search-bar">
              <van-search
                v-model="searchKeyword"
                placeholder="搜索报告内容..."
                @search="handleSearch"
                @clear="handleClear"
              />
            </div>

            <div v-if="filteredReports.length > 0" class="report-list">
              <div
                v-for="report in filteredReports"
                :key="report.year"
                class="report-card"
                @click="showReportDetail(report)"
              >
                <div class="report-header">
                  <div class="year-badge">{{ report.year }}</div>
                  <div class="report-title">{{ report.title }}</div>
                </div>
                <div class="report-info">
                  <span class="speaker">{{ report.speaker }}</span>
                  <span class="date">{{ report.date }}</span>
                </div>
                <p class="report-summary">{{ report.summary }}</p>
                <div class="key-points">
                  <div
                    v-for="(point, index) in report.keyPoints.slice(0, 3)"
                    :key="index"
                    class="key-point"
                  >
                    <van-icon name="check-circle-o" class="point-icon" />
                    <span>{{ point }}</span>
                  </div>
                  <div v-if="report.keyPoints.length > 3" class="more-points">
                    等{{ report.keyPoints.length }}个要点
                  </div>
                </div>
                <div class="view-detail">
                  <span>查看详情</span>
                  <van-icon name="arrow" />
                </div>
              </div>
            </div>

            <div v-else class="empty-state">
              <van-empty description="暂无相关数据" />
            </div>
          </div>
        </van-tab>

        <van-tab title="重要讲话">
          <div class="tab-content">
            <div class="year-filter">
              <van-field
                v-model="yearDisplay"
                readonly
                clickable
                placeholder="选择年份"
                right-icon="arrow-down"
                @click="showYearPicker = true"
              >
                <template #right-icon v-if="selectedYear">
                  <van-icon name="cross" @click.stop="clearYearFilter" />
                </template>
              </van-field>
              <van-popup v-model:show="showYearPicker" position="bottom">
                <van-picker
                  :columns="yearOptions"
                  :default-index="0"
                  show-toolbar
                  @confirm="onYearConfirm"
                  @cancel="showYearPicker = false"
                />
              </van-popup>
            </div>

            <div v-if="filteredSpeeches.length > 0" class="speech-list">
              <div
                v-for="speech in filteredSpeeches"
                :key="speech.year"
                class="speech-card"
                @click="showSpeechDetail(speech)"
              >
                <div class="speech-header">
                  <div class="year-badge">{{ speech.year }}</div>
                  <div class="speech-title">{{ speech.title }}</div>
                </div>
                <div class="speech-info">
                  <span class="speaker">{{ speech.speaker }}</span>
                  <span class="date">{{ speech.date }}</span>
                </div>
                <p class="speech-summary">{{ speech.summary }}</p>
                <div class="key-points">
                  <div
                    v-for="(point, index) in speech.keyPoints.slice(0, 3)"
                    :key="index"
                    class="key-point"
                  >
                    <van-icon name="check-circle-o" class="point-icon" />
                    <span>{{ point }}</span>
                  </div>
                </div>
                <div class="view-detail">
                  <span>查看详情</span>
                  <van-icon name="arrow" />
                </div>
              </div>
            </div>

            <div v-else class="empty-state">
              <van-empty description="暂无相关数据" />
            </div>
          </div>
        </van-tab>

        <van-tab title="热点话题">
          <div class="tab-content">
            <div class="year-filter">
              <van-field
                v-model="yearDisplay"
                readonly
                clickable
                placeholder="选择年份"
                right-icon="arrow-down"
                @click="showYearPicker = true"
              >
                <template #right-icon v-if="selectedYear">
                  <van-icon name="cross" @click.stop="clearYearFilter" />
                </template>
              </van-field>
              <van-popup v-model:show="showYearPicker" position="bottom">
                <van-picker
                  :columns="yearOptions"
                  :default-index="0"
                  show-toolbar
                  @confirm="onYearConfirm"
                  @cancel="showYearPicker = false"
                />
              </van-popup>
            </div>

            <div v-if="filteredTopics.length > 0" class="topics-list">
              <div
                v-for="yearTopics in filteredTopics"
                :key="yearTopics.year"
                class="year-topics"
              >
                <div class="year-header">{{ yearTopics.year }}年两会热点</div>
                <div class="topics-grid">
                  <div
                    v-for="topic in yearTopics.topics"
                    :key="topic.name"
                    class="topic-card"
                  >
                    <div class="topic-name">{{ topic.name }}</div>
                    <div class="topic-description">{{ topic.description }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="empty-state">
              <van-empty description="暂无相关数据" />
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <van-popup
      v-model:show="showDetailPopup"
      position="bottom"
      :style="{ height: '80%' }"
      round
    >
      <div class="popup-header">
        <h3 class="popup-title">{{ detailData?.title }}</h3>
        <van-icon name="cross" class="close-icon" @click="closeDetailPopup" />
      </div>
      <div class="popup-content">
        <div v-if="detailData" class="detail-info">
          <div class="info-row">
            <span class="info-label">发言人：</span>
            <span class="info-value">{{ detailData.speaker }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">日期：</span>
            <span class="info-value">{{ detailData.date }}</span>
          </div>
        </div>
        <div v-if="detailData?.summary" class="detail-section">
          <h4 class="section-title">内容摘要</h4>
          <p class="section-content">{{ detailData.summary }}</p>
        </div>
        <div v-if="detailData?.keyPoints" class="detail-section">
          <h4 class="section-title">核心要点</h4>
          <ul class="points-list">
            <li v-for="(point, index) in detailData.keyPoints" :key="index">
              <van-icon name="check-circle-o" />
              <span>{{ point }}</span>
            </li>
          </ul>
        </div>
        <div v-if="detailData?.fullText" class="detail-section">
          <h4 class="section-title">全文内容</h4>
          <div class="full-text">
            <p v-for="(paragraph, index) in detailData.fullText.split('\n')" :key="index">
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Tabs as VanTabs, Tab as VanTab, Picker as VanPicker, Search as VanSearch, Empty as VanEmpty, Popup as VanPopup, Icon as VanIcon, Field as VanField } from 'vant';
import { twoSessionsData, twoSessionsSpeeches, twoSessionsTopics, yearList } from './data/twoSessionsData';
const { t } = useI18n();
const activeTab = ref(0);
const selectedYear = ref(null);
const searchKeyword = ref('');
const showDetailPopup = ref(false);
const detailData = ref(null);
const showYearPicker = ref(false);
const yearDisplay = ref('全部年份');
const yearOptions = computed(() => {
 return yearList.map(year => ({
 label: `${year}年`,
 value: year
 }));
});
const filteredReports = computed(() => {
 let result = [...twoSessionsData];
 if (selectedYear.value) {
 result = result.filter(item => item.year === selectedYear.value);
 }
 if (searchKeyword.value) {
 const keyword = searchKeyword.value.toLowerCase();
 result = result.filter(item => item.title.toLowerCase().includes(keyword) ||
 item.summary.toLowerCase().includes(keyword) ||
 item.keyPoints.some(point => point.toLowerCase().includes(keyword)));
 }
 return result.sort((a, b) => b.year - a.year);
});
const filteredSpeeches = computed(() => {
 let result = [...twoSessionsSpeeches];
 if (selectedYear.value) {
 result = result.filter(item => item.year === selectedYear.value);
 }
 return result.sort((a, b) => b.year - a.year);
});
const filteredTopics = computed(() => {
 let result = [...twoSessionsTopics];
 if (selectedYear.value) {
 result = result.filter(item => item.year === selectedYear.value);
 }
 return result.sort((a, b) => b.year - a.year);
});
const onYearConfirm = (value) => {
 selectedYear.value = value;
 yearDisplay.value = value ? `${value}年` : '全部年份';
 showYearPicker.value = false;
};
const clearYearFilter = () => {
 selectedYear.value = null;
 yearDisplay.value = '全部年份';
};
const handleSearch = () => {
};
const handleClear = () => {
 searchKeyword.value = '';
};
const showReportDetail = (report) => {
 detailData.value = report;
 showDetailPopup.value = true;
};
const showSpeechDetail = (speech) => {
 detailData.value = speech;
 showDetailPopup.value = true;
};
const closeDetailPopup = () => {
 showDetailPopup.value = false;
 detailData.value = null;
};
</script>

<style lang="less" scoped>
.national-two-sessions-page {
  min-height: 100%;
  background: var(--color-bg-primary);

  .page-content {
    padding-top: calc(var(--spacing-sm) + env(safe-area-inset-top, 0px));
    padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom, 0px));
  }

  .tab-container {
    height: calc(100vh - var(--spacing-lg) - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px));

    :deep(.van-tabs__content) {
      height: calc(100% - 50px);
      overflow-y: auto;
    }
  }

  .tab-content {
    padding: var(--spacing-md);
    min-height: 100%;
  }

  .year-filter {
    margin-bottom: var(--spacing-md);
  }

  .picker-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--color-bg-secondary);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
  }

  .search-bar {
    margin-bottom: var(--spacing-md);
  }

  .report-list,
  .speech-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .report-card,
  .speech-card {
    background: var(--color-bg-secondary);
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    cursor: pointer;
    transition: all var(--transition-base);

    &:active {
      transform: scale(0.98);
    }
  }

  .report-header,
  .speech-header {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
  }

  .year-badge {
    background: var(--color-primary);
    color: #fff;
    padding: 2px 8px;
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    flex-shrink: 0;
  }

  .report-title,
  .speech-title {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    flex: 1;
  }

  .report-info,
  .speech-info {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-sm);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }

  .report-summary,
  .speech-summary {
    font-size: var(--font-size-sm);
    color: var(--color-text-primary);
    line-height: var(--line-height-base);
    margin-bottom: var(--spacing-sm);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .key-points {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: var(--spacing-sm);
  }

  .key-point {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);

    .point-icon {
      font-size: var(--font-size-sm);
      color: var(--color-success);
    }
  }

  .more-points {
    font-size: var(--font-size-xs);
    color: var(--color-text-tertiary);
    margin-top: 4px;
  }

  .view-detail {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    font-size: var(--font-size-xs);
    color: var(--color-primary);
  }

  .topics-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .year-topics {
    .year-header {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-md);
      padding-left: var(--spacing-sm);
      border-left: 4px solid var(--color-primary);
    }

    .topics-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-md);
    }

    .topic-card {
      background: var(--color-bg-secondary);
      padding: var(--spacing-md);
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border);

      .topic-name {
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-semibold);
        color: var(--color-text-primary);
        margin-bottom: 4px;
      }

      .topic-description {
        font-size: var(--font-size-xs);
        color: var(--color-text-secondary);
        line-height: var(--line-height-base);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }

  .empty-state {
    padding: var(--spacing-xl) 0;
  }

  .popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);

    .popup-title {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      flex: 1;
    }

    .close-icon {
      font-size: var(--font-size-xl);
      color: var(--color-text-secondary);
    }
  }

  .popup-content {
    padding: var(--spacing-lg);
    max-height: calc(100% - 70px);
    overflow-y: auto;
  }

  .detail-info {
    margin-bottom: var(--spacing-lg);
    padding: var(--spacing-md);
    background: var(--color-bg-primary);
    border-radius: var(--radius-md);

    .info-row {
      display: flex;
      margin-bottom: var(--spacing-sm);

      &:last-child {
        margin-bottom: 0;
      }

      .info-label {
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
        flex-shrink: 0;
      }

      .info-value {
        font-size: var(--font-size-sm);
        color: var(--color-text-primary);
      }
    }
  }

  .detail-section {
    margin-bottom: var(--spacing-lg);

    .section-title {
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      margin-bottom: var(--spacing-sm);
    }

    .section-content {
      font-size: var(--font-size-sm);
      color: var(--color-text-primary);
      line-height: var(--line-height-base);
    }

    .points-list {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        display: flex;
        align-items: flex-start;
        gap: var(--spacing-sm);
        padding: var(--spacing-xs) 0;
        font-size: var(--font-size-sm);
        color: var(--color-text-primary);
        line-height: var(--line-height-base);

        :deep(.van-icon) {
          font-size: var(--font-size-sm);
          color: var(--color-success);
          flex-shrink: 0;
          margin-top: 2px;
        }
      }
    }

    .full-text {
      font-size: var(--font-size-sm);
      color: var(--color-text-primary);
      line-height: var(--line-height-lg);

      p {
        margin-bottom: var(--spacing-sm);

        &:empty {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>