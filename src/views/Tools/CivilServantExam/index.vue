<template>
  <div class="civil-servant-exam-page">
    <div class="page-content">
      <PageHeader :title="t('tools.civilServantExam.name')" :subtitle="t('tools.civilServantExam.description')" />

      <div class="category-tabs">
        <div
          v-for="cat in categories"
          :key="cat.id"
          class="tab-item"
          :class="{ active: activeCategory === cat.id }"
          @click="activeCategory = cat.id"
        >
          {{ cat.name }}
        </div>
      </div>

      <div class="year-filter">
        <van-dropdown-menu>
          <van-dropdown-item v-model="selectedYear" :options="yearOptions" />
        </van-dropdown-menu>
      </div>

      <div class="file-list">
        <div
          v-for="(file, index) in filteredFiles"
          :key="index"
          class="file-item"
          @click="handlePreview(file)"
        >
          <div class="file-icon">📄</div>
          <div class="file-info">
            <div class="file-name">{{ file.name }}</div>
            <div class="file-type">{{ file.categoryName }}</div>
          </div>
          <van-icon name="arrow" class="file-arrow" />
        </div>
        <div v-if="filteredFiles.length === 0" class="empty-tip">
          {{ t('tools.civilServantExam.noFiles') }}
        </div>
      </div>
    </div>

    <van-popup
      v-model:show="previewVisible"
      position="bottom"
      round
      :style="{ height: '90%' }"
      class="pdf-preview-popup"
    >
      <div class="preview-header">
        <span class="preview-title">{{ previewFileName }}</span>
        <van-icon name="cross" class="preview-close" @click="previewVisible = false" />
      </div>
      <div class="preview-content">
        <component
          v-if="currentPreviewFile && OpenFileViewer"
          :is="OpenFileViewer"
          :file="currentPreviewFile"
          :file-name="previewFileName"
          :width="'100%'"
          :height="'100%'"
          :plugins="plugins"
          fit="contain"
          toolbar
        />
        <div v-else class="preview-loading">
          <van-loading type="spinner" size="32px" />
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  DropdownMenu as VanDropdownMenu,
  DropdownItem as VanDropdownItem,
  Icon as VanIcon,
  Popup as VanPopup,
  Loading as VanLoading,
} from 'vant';
import PageHeader from '@/components/PageHeader/index.vue';

const { t } = useI18n();

const BASE_PATH = 'civil-servant-exam';

const categories = [
  { id: 'shenlun', name: '申论真题' },
  { id: 'xingce-zhenti', name: '行测真题' },
  { id: 'xingce-answer', name: '行测答案' },
  { id: 'answer-sheet', name: '答题卡' },
];

const shenlunFiles = [
  { year: 2000, name: '2000年国家录用公务员考试《申论》真题卷及答案.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2000年国家录用公务员考试《申论》真题卷及答案.pdf` },
  { year: 2001, name: '2001年国家录用公务员考试《申论》真题卷及答案.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2001年国家录用公务员考试《申论》真题卷及答案.pdf` },
  { year: 2002, name: '2002年国家录用公务员考试《申论》真题卷及答案.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2002年国家录用公务员考试《申论》真题卷及答案.pdf` },
  { year: 2003, name: '2003年国家录用公务员考试《申论》真题卷及答案.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2003年国家录用公务员考试《申论》真题卷及答案.pdf` },
  { year: 2004, name: '2004年国家录用公务员考试《申论》真题卷及答案.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2004年国家录用公务员考试《申论》真题卷及答案.pdf` },
  { year: 2005, name: '2005年国家录用公务员考试《申论》真题卷及答案.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2005年国家录用公务员考试《申论》真题卷及答案.pdf` },
  { year: 2006, name: '2006年国家录用公务员考试《申论》真题卷及答案.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2006年国家录用公务员考试《申论》真题卷及答案.pdf` },
  { year: 2007, name: '2007年国家录用公务员考试《申论》真题卷及答案.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2007年国家录用公务员考试《申论》真题卷及答案.pdf` },
  { year: 2008, name: '2008年国家录用公务员考试《申论》真题卷及答案.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2008年国家录用公务员考试《申论》真题卷及答案.pdf` },
  { year: 2009, name: '2009年国家录用公务员考试《申论》真题卷及答案（地市、副省）.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2009年国家录用公务员考试《申论》真题卷及答案（地市、副省）.pdf` },
  { year: 2010, name: '2010年国家录用公务员考试《申论》真题卷及答案（副省级）.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2010年国家录用公务员考试《申论》真题卷及答案（副省级）.pdf` },
  { year: 2010, name: '2010年国家录用公务员考试《申论》真题卷及答案（地市级）.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2010年国家录用公务员考试《申论》真题卷及答案（地市级）.pdf` },
  { year: 2011, name: '2011年国家录用公务员考试《申论》真题卷及答案（副省级）.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2011年国家录用公务员考试《申论》真题卷及答案（副省级）.pdf` },
  { year: 2011, name: '2011年国家录用公务员考试《申论》真题卷及答案（地市级）.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2011年国家录用公务员考试《申论》真题卷及答案（地市级）.pdf` },
  { year: 2012, name: '2012年国家录用公务员考试《申论》真题卷及答案（副省级）.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2012年国家录用公务员考试《申论》真题卷及答案（副省级）.pdf` },
  { year: 2012, name: '2012年国家录用公务员考试《申论》真题卷及答案（地市级）.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2012年国家录用公务员考试《申论》真题卷及答案（地市级）.pdf` },
  { year: 2013, name: '2013年国家录用公务员考试《申论》真题卷及答案（副省级）.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2013年国家录用公务员考试《申论》真题卷及答案（副省级）.pdf` },
  { year: 2013, name: '2013年国家录用公务员考试《申论》真题卷及答案（地市级）.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2013年国家录用公务员考试《申论》真题卷及答案（地市级）.pdf` },
  { year: 2014, name: '2014年国家录用公务员考试《申论》真题卷及答案（副省级）.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2014年国家录用公务员考试《申论》真题卷及答案（副省级）.pdf` },
  { year: 2014, name: '2014年国家录用公务员考试《申论》真题卷及答案（地市级）.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2014年国家录用公务员考试《申论》真题卷及答案（地市级）.pdf` },
  { year: 2015, name: '2015年国家录用公务员考试《申论》真题卷及答案（省部级）.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2015年国家录用公务员考试《申论》真题卷及答案（省部级）.pdf` },
  { year: 2015, name: '2015年国家录用公务员考试《申论》真题卷及答案（地市级）.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2015年国家录用公务员考试《申论》真题卷及答案（地市级）.pdf` },
  { year: 2016, name: '2016年国家录用公务员考试《申论》真题卷及答案（副省级）.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2016年国家录用公务员考试《申论》真题卷及答案（副省级）.pdf` },
  { year: 2016, name: '2016年国家录用公务员考试《申论》真题卷及答案（地市级）.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2016年国家录用公务员考试《申论》真题卷及答案（地市级）.pdf` },
  { year: 2017, name: '2017年国家录用公务员考试《申论》真题卷及答案（省级）（含解析共20面）.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2017年国家录用公务员考试《申论》真题卷及答案（省级）（含解析共20面）.pdf` },
  { year: 2017, name: '2017年国家录用公务员考试《申论》真题卷及答案（地市级）（含解析共20面）.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2017年国家录用公务员考试《申论》真题卷及答案（地市级）（含解析共20面）.pdf` },
  { year: 2018, name: '2018年国家录用公务员考试《申论》真题卷及答案（副省级）.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2018年国家录用公务员考试《申论》真题卷及答案（副省级）.pdf` },
  { year: 2018, name: '2018年国家录用公务员考试《申论》真题卷及答案（地市级）.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2018年国家录用公务员考试《申论》真题卷及答案（地市级）.pdf` },
  { year: 2019, name: '2019年国家公务员考试《申论》真题及答案（省级）（含解析）.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2019年国家公务员考试《申论》真题及答案（省级）（含解析）.pdf` },
  { year: 2019, name: '2019年国家公务员考试《申论》真题及答案（地市级）（含解析）.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2019年国家公务员考试《申论》真题及答案（地市级）（含解析）.pdf` },
  { year: 2020, name: '2020年国家公务员考试《申论》真题及答案（省级）.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2020年国家公务员考试《申论》真题及答案（省级）.pdf` },
  { year: 2020, name: '2020年国家公务员考试《申论》真题及答案（地市级）.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2020年国家公务员考试《申论》真题及答案（地市级）.pdf` },
  { year: 2021, name: '2021年国家公务员考试《申论》真题（副省级）及参考答案(两套答案).pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2021年国家公务员考试《申论》真题（副省级）及参考答案(两套答案).pdf` },
  { year: 2021, name: '2021年国家公务员考试《申论》真题（地市级）及参考答案(两套答案).pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2021年国家公务员考试《申论》真题（地市级）及参考答案(两套答案).pdf` },
  { year: 2022, name: '2022年国家公考《申论》真题（副省级）及参考答案.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2022年国家公考《申论》真题（副省级）及参考答案.pdf` },
  { year: 2022, name: '2022国考《申论》真题及答案解析（地市级）.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2022国考《申论》真题及答案解析（地市级）.pdf` },
  { year: 2022, name: '2022年国家公务员考试申论试题（行政执法卷）及参考答案.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2022年国家公务员考试申论试题（行政执法卷）及参考答案.pdf` },
  { year: 2023, name: '2023年国家公考《申论》（副省卷）题和参考答案....pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2023年国家公考《申论》（副省卷）题和参考答案....pdf` },
  { year: 2023, name: '2023年国家公考《申论》（地市卷）题和参考答案....pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2023年国家公考《申论》（地市卷）题和参考答案....pdf` },
  { year: 2023, name: '2023年国家公务员《申论》（行政执法卷）题和参考答案....pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2023年国家公务员《申论》（行政执法卷）题和参考答案....pdf` },
  { year: 2024, name: '2024年国考申论真题（副省级）及参考答案.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2024年国考申论真题（副省级）及参考答案.pdf` },
  { year: 2024, name: '2024年国考申论真题（地市级）及参考答案.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2024年国考申论真题（地市级）及参考答案.pdf` },
  { year: 2024, name: '2024年国考申论真题（行政执法卷）及参考答案.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2024年国考申论真题（行政执法卷）及参考答案.pdf` },
  { year: 2025, name: '2025年国家公务员考试《申论》题（副省级）及参考答案.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2025年国家公务员考试《申论》题（副省级）及参考答案.pdf` },
  { year: 2025, name: '2025年国家公考《申论》题+参考答案（地市 级).pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2025年国家公考《申论》题+参考答案（地市 级).pdf` },
  { year: 2025, name: '2025年国家公考《申论》题+参考答案（行政 执法).pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2025年国家公考《申论》题+参考答案（行政 执法).pdf` },
  { year: 2026, name: '2026年国家公务员录用考试《申论》题（行政执法卷）答案解析.pdf', path: `${BASE_PATH}/2000-2026国考申论PDF/2026年国家公务员录用考试《申论》题（行政执法卷）答案解析.pdf` },
];

const xingceZhentiFiles = [
  { year: 2000, name: '2000年国家公务员考试《行测》真题.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2000年国家公务员考试《行测》真题.pdf` },
  { year: 2001, name: '2001年国家公务员考试《行测》真题...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2001年国家公务员考试《行测》真题...pdf` },
  { year: 2002, name: '2002年国家公务员录用考试《行测》真题（A卷）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2002年国家公务员录用考试《行测》真题（A卷）.pdf` },
  { year: 2002, name: '2002年国家公务员录用考试《行测》真题（B卷）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2002年国家公务员录用考试《行测》真题（B卷）.pdf` },
  { year: 2003, name: '2003年国家公务员考试《行测》真题A卷.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2003年国家公务员考试《行测》真题A卷.pdf` },
  { year: 2003, name: '2003年国家公务员考试《行测》真题B卷.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2003年国家公务员考试《行测》真题B卷.pdf` },
  { year: 2004, name: '2004年国家公务员录用考试《行测》真题（A卷）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2004年国家公务员录用考试《行测》真题（A卷）.pdf` },
  { year: 2004, name: '2004年国家公务员录用考试《行测》真题（B卷）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2004年国家公务员录用考试《行测》真题（B卷）.pdf` },
  { year: 2005, name: '2005年国家公务员考试《行测》真题卷（一）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2005年国家公务员考试《行测》真题卷（一）.pdf` },
  { year: 2005, name: '2005年国家公务员考试《行测》真题卷（二）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2005年国家公务员考试《行测》真题卷（二）.pdf` },
  { year: 2006, name: '2006年国家公务员考试《行测》真题卷（一）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2006年国家公务员考试《行测》真题卷（一）.pdf` },
  { year: 2007, name: '2007年国家公务员考试《行测》真题卷.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2007年国家公务员考试《行测》真题卷.pdf` },
  { year: 2008, name: '2008年国家公务员考试《行测》真题卷.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2008年国家公务员考试《行测》真题卷.pdf` },
  { year: 2009, name: '2009年国家公务员考试《行测》真题卷.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2009年国家公务员考试《行测》真题卷.pdf` },
  { year: 2010, name: '2010年国家公务员考试《行测》真题卷...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2010年国家公务员考试《行测》真题卷...pdf` },
  { year: 2011, name: '2011年国家公务员考试《行测》真题卷.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2011年国家公务员考试《行测》真题卷.pdf` },
  { year: 2012, name: '2012年国家公务员考试《行测》真题卷.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2012年国家公务员考试《行测》真题卷.pdf` },
  { year: 2013, name: '2013年国家公务员考试《行测》真题卷.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2013年国家公务员考试《行测》真题卷.pdf` },
  { year: 2014, name: '2014年国家公务员考试《行测》真题卷.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2014年国家公务员考试《行测》真题卷.pdf` },
  { year: 2015, name: '2015年国家公务员考试《行测》真题卷（副省级).pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2015年国家公务员考试《行测》真题卷（副省级).pdf` },
  { year: 2015, name: '2015年国家公务员考试《行测》真题卷（地市级).pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2015年国家公务员考试《行测》真题卷（地市级).pdf` },
  { year: 2016, name: '2016年国家公务员考试《行测》真题卷（副省级).pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2016年国家公务员考试《行测》真题卷（副省级).pdf` },
  { year: 2016, name: '2016年国家公务员考试《行测》真题卷（地市级）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2016年国家公务员考试《行测》真题卷（地市级）.pdf` },
  { year: 2017, name: '2017年国家公务员考试《行测》真题卷（副省级）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2017年国家公务员考试《行测》真题卷（副省级）.pdf` },
  { year: 2017, name: '2017年国家录用公务员考试《行测》真题卷（地市级）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2017年国家录用公务员考试《行测》真题卷（地市级）.pdf` },
  { year: 2018, name: '2018年国家公务员考试《行测》真题卷（副省级）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2018年国家公务员考试《行测》真题卷（副省级）.pdf` },
  { year: 2018, name: '2018年国家录用公务员考试《行测》真题卷（地市级）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2018年国家录用公务员考试《行测》真题卷（地市级）.pdf` },
  { year: 2019, name: '2019年国家公务员考试行测真题（省级）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2019年国家公务员考试行测真题（省级）.pdf` },
  { year: 2019, name: '2019年国家公务员考试行测真题（地市级）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2019年国家公务员考试行测真题（地市级）.pdf` },
  { year: 2020, name: '2020年国家公务员考试《行测》真题（副省级）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2020年国家公务员考试《行测》真题（副省级）.pdf` },
  { year: 2020, name: '2020年国家公务员考试《行测》真题（地市级）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2020年国家公务员考试《行测》真题（地市级）.pdf` },
  { year: 2021, name: '2021年国家公务员考试《行测》真题（副省级）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2021年国家公务员考试《行测》真题（副省级）.pdf` },
  { year: 2021, name: '2021年国家公务员考试《行测》真题（市地级）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2021年国家公务员考试《行测》真题（市地级）.pdf` },
  { year: 2022, name: '2022年国家公务员考试《行测》真题（副省级).pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2022年国家公务员考试《行测》真题（副省级).pdf` },
  { year: 2022, name: '2022 年国家公务员考试行测真题 （地市级）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2022 年国家公务员考试行测真题 （地市级）.pdf` },
  { year: 2022, name: '2022年国家公务员考试《行测》真题（行政执法）...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2022年国家公务员考试《行测》真题（行政执法）...pdf` },
  { year: 2023, name: '2023年国家公务员录用考试《行测》真题（副省级）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2023年国家公务员录用考试《行测》真题（副省级）.pdf` },
  { year: 2023, name: '2023年国家公务员录用考试《行测》真题（地市级）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2023年国家公务员录用考试《行测》真题（地市级）.pdf` },
  { year: 2023, name: '2023年国家公务员录用考试《行测》真题（行政执法卷）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2023年国家公务员录用考试《行测》真题（行政执法卷）.pdf` },
  { year: 2024, name: '2024年国家公务员录用考试《行测》题（副省级）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2024年国家公务员录用考试《行测》题（副省级）.pdf` },
  { year: 2024, name: '2024年国家公务员录用考试《行测》题（地市级）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2024年国家公务员录用考试《行测》题（地市级）.pdf` },
  { year: 2024, name: '2024年国家公务员录用考试《行测》题（行政执法卷）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2024年国家公务员录用考试《行测》题（行政执法卷）.pdf` },
  { year: 2025, name: '2025年国家公务员录用考试《行测》题（副省级）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2025年国家公务员录用考试《行测》题（副省级）.pdf` },
  { year: 2025, name: '2025年国家公务员录用考试《行测》题（地市级）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2025年国家公务员录用考试《行测》题（地市级）.pdf` },
  { year: 2025, name: '2025年国家公务员录用考试《行测》题（行政执法卷）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2025年国家公务员录用考试《行测》题（行政执法卷）.pdf` },
  { year: 2026, name: '2026年国家公务员录用考试《行测》题（副省级）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2026年国家公务员录用考试《行测》题（副省级）.pdf` },
  { year: 2026, name: '2026年国家公务员录用考试《行测》题（地市级）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2026年国家公务员录用考试《行测》题（地市级）.pdf` },
  { year: 2026, name: '2026年国家公务员录用考试《行测》题（行政执法卷）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-真题/2026年国家公务员录用考试《行测》题（行政执法卷）.pdf` },
];

const xingceAnswerFiles = [
  { year: 2000, name: '2000年国家公务员考试《行测》真题答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2000年国家公务员考试《行测》真题答案及解析...pdf` },
  { year: 2001, name: '2001年国家公务员考试《行测》真题答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2001年国家公务员考试《行测》真题答案及解析...pdf` },
  { year: 2002, name: '2002年国家公务员录用考试《行测》真题（A卷）参考答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2002年国家公务员录用考试《行测》真题（A卷）参考答案及解析...pdf` },
  { year: 2002, name: '2002年国家公务员录用考试《行测》真题（B卷）参考答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2002年国家公务员录用考试《行测》真题（B卷）参考答案及解析...pdf` },
  { year: 2003, name: '2003年国家公务员考试《行测》真题A卷答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2003年国家公务员考试《行测》真题A卷答案及解析...pdf` },
  { year: 2003, name: '2003年国家公务员考试《行测》真题B卷答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2003年国家公务员考试《行测》真题B卷答案及解析...pdf` },
  { year: 2004, name: '2004年国家公务员录用考试《行测》真题（A卷）参考答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2004年国家公务员录用考试《行测》真题（A卷）参考答案及解析...pdf` },
  { year: 2004, name: '2004年国家公务员录用考试《行测》真题（B卷）参考答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2004年国家公务员录用考试《行测》真题（B卷）参考答案及解析...pdf` },
  { year: 2005, name: '2005年国家公务员考试《行测》真题卷（一）答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2005年国家公务员考试《行测》真题卷（一）答案及解析...pdf` },
  { year: 2005, name: '2005年国家公务员考试《行测》真题卷（二）答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2005年国家公务员考试《行测》真题卷（二）答案及解析...pdf` },
  { year: 2006, name: '2006年国家公务员考试《行测》真题卷（一）答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2006年国家公务员考试《行测》真题卷（一）答案及解析...pdf` },
  { year: 2007, name: '2007年国家公务员考试《行测》真题卷答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2007年国家公务员考试《行测》真题卷答案及解析...pdf` },
  { year: 2008, name: '2008年国家公务员考试《行测》真题卷答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2008年国家公务员考试《行测》真题卷答案及解析...pdf` },
  { year: 2009, name: '2009年国家公务员考试《行测》真题卷答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2009年国家公务员考试《行测》真题卷答案及解析...pdf` },
  { year: 2010, name: '2010年国家公务员考试《行测》真题卷答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2010年国家公务员考试《行测》真题卷答案及解析...pdf` },
  { year: 2011, name: '2011年国家公务员考试《行测》真题卷答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2011年国家公务员考试《行测》真题卷答案及解析...pdf` },
  { year: 2012, name: '2012年国家公务员考试《行测》真题卷答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2012年国家公务员考试《行测》真题卷答案及解析...pdf` },
  { year: 2013, name: '2013年国家公务员考试《行测》真题卷参考答案...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2013年国家公务员考试《行测》真题卷参考答案...pdf` },
  { year: 2014, name: '2014年国家公务员考试《行测》真题卷答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2014年国家公务员考试《行测》真题卷答案及解析...pdf` },
  { year: 2015, name: '2015年国家公务员考试《行测》真题卷（副省级)答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2015年国家公务员考试《行测》真题卷（副省级)答案及解析...pdf` },
  { year: 2015, name: '2015年国家公务员考试《行测》真题卷（地市级)答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2015年国家公务员考试《行测》真题卷（地市级)答案及解析...pdf` },
  { year: 2016, name: '2016年国家公务员考试《行测》真题卷（副省级）答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2016年国家公务员考试《行测》真题卷（副省级）答案及解析...pdf` },
  { year: 2016, name: '2016年国家公务员考试《行测》真题卷（地市级）答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2016年国家公务员考试《行测》真题卷（地市级）答案及解析...pdf` },
  { year: 2017, name: '2017年国家公务员考试《行测》真题卷（副省级）答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2017年国家公务员考试《行测》真题卷（副省级）答案及解析...pdf` },
  { year: 2017, name: '2017年国家录用公务员考试《行测》真题卷（地市级）答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2017年国家录用公务员考试《行测》真题卷（地市级）答案及解析...pdf` },
  { year: 2018, name: '2018年国家公务员考试《行测》真题卷（副省级）答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2018年国家公务员考试《行测》真题卷（副省级）答案及解析...pdf` },
  { year: 2018, name: '2018年国家录用公务员考试《行测》真题卷（地市级）答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2018年国家录用公务员考试《行测》真题卷（地市级）答案及解析...pdf` },
  { year: 2019, name: '2019年国家公务员考试行测真题（省级）答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2019年国家公务员考试行测真题（省级）答案及解析...pdf` },
  { year: 2019, name: '2019年国家公务员考试行测真题（地市级）答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2019年国家公务员考试行测真题（地市级）答案及解析...pdf` },
  { year: 2020, name: '2020年国家公务员考试《行测》真题（省级）答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2020年国家公务员考试《行测》真题（省级）答案及解析...pdf` },
  { year: 2020, name: '2020年国家公务员考试《行测》真题（地市级）答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2020年国家公务员考试《行测》真题（地市级）答案及解析...pdf` },
  { year: 2021, name: '2021年国家公务员考试《行测》真题（副省级）参考答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2021年国家公务员考试《行测》真题（副省级）参考答案及解析...pdf` },
  { year: 2021, name: '2021年国家公务员考试《行测》真题（市地级）参考答案及解析...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2021年国家公务员考试《行测》真题（市地级）参考答案及解析...pdf` },
  { year: 2022, name: '2022年国家公务员考试《行测》真题（副省级）【答案+解析】...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2022年国家公务员考试《行测》真题（副省级）【答案+解析】...pdf` },
  { year: 2022, name: '2022年国家公务员考试《行测》真题（市地级）【答案+解析】...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2022年国家公务员考试《行测》真题（市地级）【答案+解析】...pdf` },
  { year: 2022, name: '2022年国家公务员考试《行测》真题（行政执法）【答案+解析】...pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2022年国家公务员考试《行测》真题（行政执法）【答案+解析】...pdf` },
  { year: 2023, name: '2023年国家公务员录用考试《行测》真题（副省级）（解析）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2023年国家公务员录用考试《行测》真题（副省级）（解析）.pdf` },
  { year: 2023, name: '2023年国家公务员录用考试《行测》真题（地市级）（解析）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2023年国家公务员录用考试《行测》真题（地市级）（解析）.pdf` },
  { year: 2023, name: '2023年国家公务员录用考试《行测》真题（行政执法卷）（解析）.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2023年国家公务员录用考试《行测》真题（行政执法卷）（解析）.pdf` },
  { year: 2024, name: '2024年国考《行测》（副省级）答案+解析.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2024年国考《行测》（副省级）答案+解析.pdf` },
  { year: 2024, name: '2024年国考《行测》（地市级）答案+解析.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2024年国考《行测》（地市级）答案+解析.pdf` },
  { year: 2024, name: '2024年国考《行测》（行政执法）答案+解析.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2024年国考《行测》（行政执法）答案+解析.pdf` },
  { year: 2025, name: '2025年国考《行测》（副省级）答案+解析.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2025年国考《行测》（副省级）答案+解析.pdf` },
  { year: 2025, name: '2025年国考《行测》（地市级）答案+解析.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2025年国考《行测》（地市级）答案+解析.pdf` },
  { year: 2025, name: '2025年国考《行测》（行政执法卷）答案+解析.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2025年国考《行测》（行政执法卷）答案+解析.pdf` },
  { year: 2026, name: '2026年国家公务员录用考试《行测》题（副省级）答案解析.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2026年国家公务员录用考试《行测》题（副省级）答案解析.pdf` },
  { year: 2026, name: '2026年国家公务员录用考试《行测》题（地市级）答案解析.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2026年国家公务员录用考试《行测》题（地市级）答案解析.pdf` },
  { year: 2026, name: '2026年国家公务员录用考试《行测》题（行政执法卷）答案解析.pdf', path: `${BASE_PATH}/2000-2026国考行测PDF/行测-答案及解析/2026年国家公务员录用考试《行测》题（行政执法卷）答案解析.pdf` },
];

const answerSheetFiles = [
  { year: null, name: '公务员申论标准答题纸(彩色A3版).pdf', path: `${BASE_PATH}/答题卡可打印/1公务员申论标准答题纸(彩色A3版).pdf` },
  { year: null, name: '申论标准答题纸.pdf', path: `${BASE_PATH}/答题卡可打印/2申论标准答题纸.pdf` },
  { year: null, name: '公务员考试行测答题卡A4格式可直接打印.pdf', path: `${BASE_PATH}/答题卡可打印/3公务员考试行测答题卡A4格式可直接打印.pdf` },
];

const allFiles = {
  'shenlun': shenlunFiles,
  'xingce-zhenti': xingceZhentiFiles,
  'xingce-answer': xingceAnswerFiles,
  'answer-sheet': answerSheetFiles,
};

const activeCategory = ref('shenlun');
const selectedYear = ref(0);

const yearOptions = computed(() => {
  const years = new Set();
  const files = allFiles[activeCategory.value] || [];
  files.forEach(f => {
    if (f.year) years.add(f.year);
  });
  const sortedYears = Array.from(years).sort((a, b) => b - a);
  return [
    { text: '全部年份', value: 0 },
    ...sortedYears.map(y => ({ text: `${y}年`, value: y })),
  ];
});

const filteredFiles = computed(() => {
  const files = allFiles[activeCategory.value] || [];
  const cat = categories.find(c => c.id === activeCategory.value);
  return files
    .filter(f => !selectedYear.value || f.year === selectedYear.value)
    .map(f => ({
      ...f,
      categoryName: cat ? cat.name : '',
    }));
});

const previewVisible = ref(false);
const currentPreviewFile = ref(null);
const previewFileName = ref('');

let OpenFileViewer = null;
let plugins = null;

const loadViewer = async () => {
  if (!OpenFileViewer) {
    const { OpenFileViewer: Viewer } = await import('@open-file-viewer/vue');
    const { imagePlugin, pdfPlugin, textPlugin, officePlugin } = await import('@open-file-viewer/core');
    await import('@open-file-viewer/core/style.css');
    const pdfWorkerSrc = await import('pdfjs-dist/build/pdf.worker.mjs?url');
    OpenFileViewer = Viewer;
    plugins = [
      imagePlugin(),
      textPlugin(),
      pdfPlugin({ workerSrc: pdfWorkerSrc.default }),
      officePlugin(),
    ];
  }
};

const handlePreview = async (file) => {
  currentPreviewFile.value = null;
  previewFileName.value = file.name;
  previewVisible.value = true;

  try {
    await loadViewer();
    const response = await fetch(file.path);
    const blob = await response.blob();
    currentPreviewFile.value = new File([blob], file.name, { type: blob.type });
  } catch (error) {
    console.error('Failed to load PDF:', error);
    previewVisible.value = false;
  }
};
</script>

<style lang="less" scoped>
.civil-servant-exam-page {
  min-height: 100%;
  background: var(--color-bg-primary);
}

.page-content {
  padding-top: calc(var(--spacing-sm) + env(safe-area-inset-top, 0px));
  padding-bottom: calc(var(--spacing-lg) + env(safe-area-inset-bottom, 0px));
  padding-left: var(--spacing-md);
  padding-right: var(--spacing-md);
  display: flow-root;
}

.category-tabs {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  overflow-x: auto;
  padding-bottom: var(--spacing-xs);

  .tab-item {
    flex-shrink: 0;
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--color-bg-secondary);
    border-radius: var(--radius-full);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all var(--transition-base);
    border: 1px solid var(--color-border);

    &.active {
      background: var(--color-primary);
      color: #fff;
      border-color: var(--color-primary);
    }
  }
}

.year-filter {
  margin-bottom: var(--spacing-md);
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.file-item {
  display: flex;
  align-items: center;
  background: var(--color-bg-secondary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
  border: 1px solid var(--color-border);

  &:active {
    transform: scale(0.98);
  }

  .file-icon {
    font-size: 1.75rem;
    margin-right: var(--spacing-md);
    flex-shrink: 0;
  }

  .file-info {
    flex: 1;
    min-width: 0;
  }

  .file-name {
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: var(--spacing-xs);
  }

  .file-type {
    font-size: var(--font-size-xs);
    color: var(--color-text-tertiary);
  }

  .file-arrow {
    color: var(--color-text-tertiary);
    font-size: var(--font-size-base);
    flex-shrink: 0;
    margin-left: var(--spacing-sm);
  }
}

.empty-tip {
  text-align: center;
  color: var(--color-text-tertiary);
  font-size: var(--font-size-sm);
  padding: var(--spacing-xl) 0;
}

.pdf-preview-popup {
  display: flex;
  flex-direction: column;

  .preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md) var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);
    flex-shrink: 0;

    .preview-title {
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-primary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 80%;
    }

    .preview-close {
      font-size: 20px;
      color: var(--color-text-secondary);
      cursor: pointer;
    }
  }

  .preview-content {
    flex: 1;
    overflow: hidden;
    position: relative;

    .preview-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: var(--color-text-tertiary);
    }
  }
}
</style>
