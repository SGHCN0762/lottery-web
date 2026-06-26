import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { showSuccessToast, showFailToast } from 'vant';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { jsPDF } from 'jspdf';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

export function usePdfSplitter() {
  const { t } = useI18n();

  const pdfFile = ref(null);
  const pdfPages = ref([]);
  const selectedPages = ref([]);
  const splitting = ref(false);
  const totalPages = ref(0);

  const handlePdfChange = (file) => {
    if (file && file.file && file.file.type === 'application/pdf') {
      if (pdfFile.value) {
        URL.revokeObjectURL(pdfFile.value.url);
      }
      pdfPages.value = [];
      selectedPages.value = [];
      totalPages.value = 0;

      const url = URL.createObjectURL(file.file);
      pdfFile.value = {
        name: file.file.name,
        url,
        file: file.file,
        size: file.file.size,
      };

      loadPdfInfo(file.file);
    }
  };

  const loadPdfInfo = async () => {
    if (!pdfFile.value) return;

    try {
      const arrayBuffer = await pdfFile.value.file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      totalPages.value = pdf.numPages;

      pdfPages.value = [];
      selectedPages.value = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        pdfPages.value.push({
          index: i,
          selected: true,
        });
        selectedPages.value.push(i);
      }
    } catch (error) {
      console.error('Load PDF error:', error);
    }
  };

  const togglePage = (index) => {
    const pageIndex = index + 1;
    const pos = selectedPages.value.indexOf(pageIndex);
    if (pos > -1) {
      selectedPages.value.splice(pos, 1);
    } else {
      selectedPages.value.push(pageIndex);
    }
    selectedPages.value.sort((a, b) => a - b);
    pdfPages.value[index].selected = selectedPages.value.includes(pageIndex);
  };

  const selectAll = () => {
    selectedPages.value = pdfPages.value.map((_, i) => i + 1);
    pdfPages.value.forEach(p => p.selected = true);
  };

  const deselectAll = () => {
    selectedPages.value = [];
    pdfPages.value.forEach(p => p.selected = false);
  };

  const splitPdf = async () => {
    if (!pdfFile.value || selectedPages.value.length === 0) {
      showFailToast(t('tools.fileConverter.pdfSplit.selectPagesTip'));
      return;
    }

    splitting.value = true;

    try {
      const arrayBuffer = await pdfFile.value.file.arrayBuffer();
      const originalPdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      for (const pageNum of selectedPages.value) {
        const page = await originalPdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        await page.render({ canvasContext: ctx, viewport }).promise;

        const imgData = canvas.toDataURL('image/jpeg', 0.92);
        const orientation = viewport.width > viewport.height ? 'landscape' : 'portrait';
        const doc = new jsPDF({
          orientation,
          unit: 'pt',
          format: [viewport.width, viewport.height],
        });

        doc.addImage(imgData, 'JPEG', 0, 0, viewport.width, viewport.height);

        const baseName = pdfFile.value.name.replace(/\.[^.]+$/, '');
        doc.save(`${baseName}_page_${pageNum}.pdf`);

        await new Promise(resolve => setTimeout(resolve, 300));
      }

      showSuccessToast(t('tools.fileConverter.pdfSplit.splitSuccess'));
    } catch (error) {
      console.error('Split error:', error);
      showFailToast(t('tools.fileConverter.pdfSplit.splitFailed'));
    } finally {
      splitting.value = false;
    }
  };

  const clearAll = async () => {
    if (pdfFile.value) {
      URL.revokeObjectURL(pdfFile.value.url);
      pdfFile.value = null;
    }
    pdfPages.value = [];
    selectedPages.value = [];
    totalPages.value = 0;
  };

  return {
    pdfFile,
    pdfPages,
    selectedPages,
    splitting,
    totalPages,
    handlePdfChange,
    togglePage,
    selectAll,
    deselectAll,
    splitPdf,
    clearAll,
  };
}
