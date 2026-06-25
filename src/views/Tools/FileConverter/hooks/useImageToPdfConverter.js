import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { showSuccessToast, showFailToast } from 'vant';
import { jsPDF } from 'jspdf';

export function useImageToPdfConverter() {
  const { t } = useI18n();

  const pdfImageFileList = ref([]);
  const pdfImageList = ref([]);
  const pdfPageSize = ref('a4');
  const pdfOrientation = ref('portrait');
  const convertingToPdf = ref(false);

  const pageSizes = {
    a4: { width: 595.28, height: 841.89 },
    letter: { width: 612, height: 792 },
    legal: { width: 612, height: 1008 },
  };

  const handlePdfImageAfterRead = async (file) => {
    const files = Array.isArray(file) ? file : [file];

    for (const f of files) {
      if (f.file && f.file.type.startsWith('image/')) {
        const url = URL.createObjectURL(f.file);
        const id = Date.now() + Math.random();

        pdfImageFileList.value.push({
          name: f.file.name,
          url,
        });

        pdfImageList.value.push({
          id,
          name: f.file.name,
          url,
          file: f.file,
        });
      }
    }
  };

  const handlePdfImageDelete = (file, detail) => {
    const index = detail.index;
    if (pdfImageFileList.value[index]) {
      const fileName = pdfImageFileList.value[index].name;
      const imgIndex = pdfImageList.value.findIndex(img => img.name === fileName);
      if (imgIndex !== -1) {
        const img = pdfImageList.value[imgIndex];
        if (img.url) URL.revokeObjectURL(img.url);
        pdfImageList.value.splice(imgIndex, 1);
      }
      pdfImageFileList.value.splice(index, 1);
    }
  };

  const clearPdfImageList = () => {
    pdfImageList.value.forEach(img => {
      if (img.url) URL.revokeObjectURL(img.url);
    });
    pdfImageList.value = [];
    pdfImageFileList.value = [];
  };

  const updatePdfImageList = (newList) => {
    pdfImageList.value = newList;
    pdfImageFileList.value = newList.map(img => ({
      name: img.name,
      url: img.url,
    }));
  };

  const convertImagesToPdf = async () => {
    if (pdfImageList.value.length === 0) return;

    convertingToPdf.value = true;

    try {
      const pageSize = pageSizes[pdfPageSize.value];
      const isPortrait = pdfOrientation.value === 'portrait';
      const width = isPortrait ? pageSize.width : pageSize.height;
      const height = isPortrait ? pageSize.height : pageSize.width;

      const doc = new jsPDF({
        orientation: pdfOrientation.value,
        unit: 'pt',
        format: pdfPageSize.value,
      });

      const loadImage = (url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error('Failed to load image'));
          img.src = url;
        });
      };

      for (let i = 0; i < pdfImageList.value.length; i++) {
        const item = pdfImageList.value[i];
        const img = await loadImage(item.url);

        let imgWidth = img.width;
        let imgHeight = img.height;

        const pageRatio = width / height;
        const imgRatio = imgWidth / imgHeight;

        if (imgRatio > pageRatio) {
          imgHeight = (imgHeight * width) / imgWidth;
          imgWidth = width;
        } else {
          imgWidth = (imgWidth * height) / imgHeight;
          imgHeight = height;
        }

        const x = (width - imgWidth) / 2;
        const y = (height - imgHeight) / 2;

        if (i > 0) {
          doc.addPage();
        }

        doc.addImage(img, 'JPEG', x, y, imgWidth, imgHeight, '', 'FAST');
      }

      const fileName = `images_${Date.now()}.pdf`;
      doc.save(fileName);

      showSuccessToast(t('tools.fileConverter.imageToPdf.convertSuccess'));
    } catch (error) {
      console.error('PDF convert error:', error);
      showFailToast(t('tools.fileConverter.imageToPdf.convertFailed'));
    } finally {
      convertingToPdf.value = false;
    }
  };

  return {
    pdfImageFileList,
    pdfImageList,
    pdfPageSize,
    pdfOrientation,
    convertingToPdf,
    handlePdfImageAfterRead,
    handlePdfImageDelete,
    clearPdfImageList,
    updatePdfImageList,
    convertImagesToPdf,
  };
}