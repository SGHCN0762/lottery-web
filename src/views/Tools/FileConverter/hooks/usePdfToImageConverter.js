import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { showSuccessToast, showFailToast } from 'vant';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

export function usePdfToImageConverter() {
  const { t } = useI18n();

  const pdfFile = ref([]);
  const pdfPages = ref([]);
  const pdfOutputFormat = ref('png');
  const pdfResolution = ref(150);
  const processingPdf = ref(false);
  const pdfTotalPages = ref(0);

  const handlePdfUpload = async (file) => {
    const files = Array.isArray(file) ? file : [file];

    for (const f of files) {
      if (f.file && f.file.type === 'application/pdf') {
        // 清空旧数据
        if (pdfFile.value[0]) {
          URL.revokeObjectURL(pdfFile.value[0].url);
        }
        clearPdfPages();

        const url = URL.createObjectURL(f.file);
        pdfFile.value = [{
          name: f.file.name,
          url,
          file: f.file,
          size: f.file.size,
        }];
      }
    }
  };

  const processPdf = async () => {
    if (!pdfFile.value[0]) {
      showFailToast(t('tools.fileConverter.pdfToImage.noPdfSelected'));
      return;
    }

    processingPdf.value = true;

    try {
      const file = pdfFile.value[0].file;
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      pdfTotalPages.value = pdf.numPages;
      const scale = pdfResolution.value / 72;
      const pages = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        await page.render({
          canvasContext: ctx,
          viewport,
        }).promise;

        const mimeType = `image/${pdfOutputFormat.value}`;
        const quality = pdfOutputFormat.value === 'jpeg' ? 0.9 : undefined;

        const blob = await new Promise((resolve, reject) => {
          canvas.toBlob(
            (blob) => blob ? resolve(blob) : reject(new Error('Failed to convert page')),
            mimeType,
            quality
          );
        });

        const url = URL.createObjectURL(blob);
        pages.push({
          url,
          blob,
          width: canvas.width,
          height: canvas.height,
        });
      }

      pdfPages.value = pages;
      showSuccessToast(t('tools.fileConverter.pdfToImage.processSuccess'));
    } catch (error) {
      console.error('PDF process error:', error);
      showFailToast(t('tools.fileConverter.pdfToImage.processFailed'));
    } finally {
      processingPdf.value = false;
    }
  };

  const downloadPdfPage = (page, index) => {
    const baseName = pdfFile.value[0]?.name.replace(/\.[^.]+$/, '') || 'page';
    const ext = pdfOutputFormat.value;
    const fileName = `${baseName}_page_${index + 1}.${ext}`;

    const link = document.createElement('a');
    link.href = page.url;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  };

  const downloadAllPdfPages = async () => {
    if (pdfPages.value.length === 0) {
      showFailToast(t('tools.fileConverter.common.noFilesToDownload'));
      return;
    }

    for (let i = 0; i < pdfPages.value.length; i++) {
      downloadPdfPage(pdfPages.value[i], i);
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    showSuccessToast(t('tools.fileConverter.common.downloadAllSuccess'));
  };

  const clearPdfPages = () => {
    pdfPages.value.forEach(page => {
      if (page.url) URL.revokeObjectURL(page.url);
    });
    pdfPages.value = [];
  };

  return {
    pdfFile,
    pdfPages,
    pdfOutputFormat,
    pdfResolution,
    processingPdf,
    pdfTotalPages,
    handlePdfUpload,
    processPdf,
    downloadPdfPage,
    downloadAllPdfPages,
    clearPdfPages,
  };
}