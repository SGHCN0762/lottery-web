import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { showSuccessToast, showFailToast } from 'vant';
import { PDFDocument } from 'pdf-lib/es';

export function usePdfMerger() {
  const { t } = useI18n();

  const pdfFiles = ref([]);
  const merging = ref(false);

  const handlePdfFilesChange = (files) => {
    const newFiles = files.filter(f => f.file && f.file.type === 'application/pdf');
    newFiles.forEach(f => {
      const url = URL.createObjectURL(f.file);
      pdfFiles.value.push({
        name: f.file.name,
        url,
        file: f.file,
        size: f.file.size,
      });
    });
  };

  const removePdf = (index) => {
    const file = pdfFiles.value[index];
    if (file) {
      URL.revokeObjectURL(file.url);
      pdfFiles.value.splice(index, 1);
    }
  };

  const clearAll = async () => {
    pdfFiles.value.forEach(f => URL.revokeObjectURL(f.url));
    pdfFiles.value = [];
  };

  const mergePdfs = async () => {
    if (pdfFiles.value.length < 2) {
      showFailToast(t('tools.fileConverter.pdfMerge.needMoreFiles'));
      return;
    }

    merging.value = true;

    try {
      const mergedPdf = await PDFDocument.create();

      for (const pdfFile of pdfFiles.value) {
        try {
          const arrayBuffer = await pdfFile.file.arrayBuffer();
          const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
          const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          pages.forEach(page => mergedPdf.addPage(page));
        } catch (err) {
          console.error(`Failed to load ${pdfFile.name}:`, err);
          showFailToast(t('tools.fileConverter.pdfMerge.loadFailed', { name: pdfFile.name }));
          merging.value = false;
          return;
        }
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `merged_${Date.now()}.pdf`;
      link.click();

      URL.revokeObjectURL(url);

      showSuccessToast(t('tools.fileConverter.pdfMerge.mergeSuccess'));
    } catch (error) {
      console.error('Merge error:', error);
      showFailToast(t('tools.fileConverter.pdfMerge.mergeFailed'));
    } finally {
      merging.value = false;
    }
  };

  return {
    pdfFiles,
    merging,
    handlePdfFilesChange,
    removePdf,
    clearAll,
    mergePdfs,
  };
}
