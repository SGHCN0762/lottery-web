import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { showSuccessToast, showFailToast } from 'vant';
import { PDFDocument } from 'pdf-lib';

export function usePdfPageDeleter() {
  const { t } = useI18n();

  const pdfFile = ref(null);
  const pdfPages = ref([]);
  const deletedPages = ref([]);
  const deleting = ref(false);
  const totalPages = ref(0);

  const handlePdfChange = (file) => {
    if (file && file.file && file.file.type === 'application/pdf') {
      if (pdfFile.value) {
        URL.revokeObjectURL(pdfFile.value.url);
      }
      pdfPages.value = [];
      deletedPages.value = [];
      totalPages.value = 0;

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

      pdfPages.value = [];
      deletedPages.value = [];

      for (let i = 1; i <= totalPages.value; i++) {
        pdfPages.value.push({
          index: i,
          deleted: false,
        });
      }
    } catch (error) {
      console.error('Load PDF error:', error);
      showFailToast(t('tools.fileConverter.pdfDeletePages.loadError'));
    }
  };

  const togglePage = (index) => {
    const pageIndex = index + 1;
    const pos = deletedPages.value.indexOf(pageIndex);
    if (pos > -1) {
      deletedPages.value.splice(pos, 1);
    } else {
      deletedPages.value.push(pageIndex);
    }
    deletedPages.value.sort((a, b) => a - b);
    pdfPages.value[index].deleted = deletedPages.value.includes(pageIndex);
  };

  const deletePagesAndExport = async () => {
    if (!pdfFile.value) {
      showFailToast(t('tools.fileConverter.pdfDeletePages.selectFileFirst'));
      return;
    }

    if (deletedPages.value.length === 0) {
      showFailToast(t('tools.fileConverter.pdfDeletePages.selectPagesTip'));
      return;
    }

    if (deletedPages.value.length === totalPages.value) {
      showFailToast(t('tools.fileConverter.pdfDeletePages.cannotDeleteAll'));
      return;
    }

    deleting.value = true;

    try {
      const arrayBuffer = await pdfFile.value.file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

      const newPdf = await PDFDocument.create();

      const pageIndicesToKeep = [];
      for (let i = 0; i < totalPages.value; i++) {
        if (!deletedPages.value.includes(i + 1)) {
          pageIndicesToKeep.push(i);
        }
      }

      const copiedPages = await newPdf.copyPages(sourcePdf, pageIndicesToKeep);
      copiedPages.forEach(page => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const baseName = pdfFile.value.name.replace(/\.[^.]+$/, '');
      const link = document.createElement('a');
      link.href = url;
      link.download = `${baseName}_deleted_pages.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showSuccessToast(t('tools.fileConverter.pdfDeletePages.exportSuccess'));
    } catch (error) {
      console.error('Delete pages error:', error);
      showFailToast(t('tools.fileConverter.pdfDeletePages.exportFailed'));
    } finally {
      deleting.value = false;
    }
  };

  const clearAll = async () => {
    if (pdfFile.value) {
      URL.revokeObjectURL(pdfFile.value.url);
      pdfFile.value = null;
    }
    pdfPages.value = [];
    deletedPages.value = [];
    totalPages.value = 0;
  };

  return {
    pdfFile,
    pdfPages,
    deletedPages,
    deleting,
    totalPages,
    handlePdfChange,
    togglePage,
    deletePagesAndExport,
    clearAll,
  };
}