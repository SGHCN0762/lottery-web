import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { showSuccessToast, showFailToast } from 'vant';
import { PDFDocument } from 'pdf-lib';

export function usePdfSplitter() {
  const { t } = useI18n();

  const pdfFile = ref(null);
  const totalPages = ref(0);
  const splitRanges = ref('');
  const splitting = ref(false);

  const handlePdfChange = (file) => {
    if (file && file.file && file.file.type === 'application/pdf') {
      if (pdfFile.value) {
        URL.revokeObjectURL(pdfFile.value.url);
      }
      totalPages.value = 0;
      splitRanges.value = '';

      const url = URL.createObjectURL(file.file);
      pdfFile.value = {
        name: file.file.name,
        url,
        file: file.file,
        size: file.file.size,
      };

      loadPdfInfo();
    }
  };

  const loadPdfInfo = async () => {
    if (!pdfFile.value) return;

    try {
      const arrayBuffer = await pdfFile.value.file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      totalPages.value = pdfDoc.getPageCount();
    } catch (error) {
      console.error('Load PDF error:', error);
    }
  };

  const parseRanges = (input) => {
    const ranges = [];
    const parts = input.split(/[,，]/).map(s => s.trim()).filter(s => s);

    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(s => parseInt(s.trim()));
        if (!isNaN(start) && !isNaN(end) && start <= end && start > 0 && end <= totalPages.value) {
          ranges.push({ start, end });
        }
      } else {
        const page = parseInt(part.trim());
        if (!isNaN(page) && page > 0 && page <= totalPages.value) {
          ranges.push({ start: page, end: page });
        }
      }
    }

    return ranges;
  };

  const splitPdf = async () => {
    if (!pdfFile.value) {
      showFailToast(t('tools.fileConverter.pdfSplit.selectFileFirst'));
      return;
    }

    if (!splitRanges.value.trim()) {
      showFailToast(t('tools.fileConverter.pdfSplit.inputRangesTip'));
      return;
    }

    const ranges = parseRanges(splitRanges.value);
    if (ranges.length === 0) {
      showFailToast(t('tools.fileConverter.pdfSplit.invalidRanges'));
      return;
    }

    splitting.value = true;

    try {
      const arrayBuffer = await pdfFile.value.file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

      for (let i = 0; i < ranges.length; i++) {
        const { start, end } = ranges[i];
        const newPdf = await PDFDocument.create();

        const pageIndices = [];
        for (let j = start - 1; j < end; j++) {
          pageIndices.push(j);
        }

        const copiedPages = await newPdf.copyPages(sourcePdf, pageIndices);
        copiedPages.forEach(page => newPdf.addPage(page));

        const pdfBytes = await newPdf.save();

        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        const baseName = pdfFile.value.name.replace(/\.[^.]+$/, '');
        const rangeLabel = start === end ? `page_${start}` : `pages_${start}-${end}`;
        const link = document.createElement('a');
        link.href = url;
        link.download = `${baseName}_${rangeLabel}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

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
    totalPages.value = 0;
    splitRanges.value = '';
  };

  return {
    pdfFile,
    totalPages,
    splitRanges,
    splitting,
    handlePdfChange,
    splitPdf,
    clearAll,
  };
}