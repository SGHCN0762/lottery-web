import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { showSuccessToast, showFailToast } from 'vant';
import JSZip from 'jszip';

const COMPRESSIBLE_EXTS = [
  '.txt', '.md', '.json', '.xml', '.html', '.htm', '.css', '.js', '.ts',
  '.php', '.py', '.java', '.go', '.rb', '.sh', '.bat', '.csv', '.log',
  '.conf', '.config', '.yaml', '.yml', '.sql', '.svg',
];

const COMPRESSIBLE_MIME_TYPES = [
  'text/', 'application/json', 'application/xml', 'application/javascript',
];

const getCompressionOptions = (fileName, mimeType) => {
  const lowerName = fileName.toLowerCase();
  
  for (const ext of COMPRESSIBLE_EXTS) {
    if (lowerName.endsWith(ext)) {
      return { compression: 'DEFLATE', compressionOptions: { level: 9 } };
    }
  }
  
  for (const type of COMPRESSIBLE_MIME_TYPES) {
    if (mimeType.startsWith(type)) {
      return { compression: 'DEFLATE', compressionOptions: { level: 9 } };
    }
  }
  
  return { compression: 'STORE' };
};

export function useFileCompressor() {
  const { t } = useI18n();

  const files = ref([]);
  const compressing = ref(false);

  const handleFilesChange = (newFiles) => {
    newFiles.forEach(f => {
      if (f.file) {
        const url = URL.createObjectURL(f.file);
        files.value.push({
          id: Date.now() + Math.random(),
          name: f.file.name,
          url,
          file: f.file,
          size: f.file.size,
          type: f.file.type,
        });
      }
    });
  };

  const removeFile = (index) => {
    const file = files.value[index];
    if (file) {
      URL.revokeObjectURL(file.url);
      files.value.splice(index, 1);
    }
  };

  const clearAll = async () => {
    files.value.forEach(f => URL.revokeObjectURL(f.url));
    files.value = [];
  };

  const compressToZip = async () => {
    if (files.value.length === 0) {
      showFailToast(t('tools.fileConverter.fileCompress.needFiles'));
      return;
    }

    compressing.value = true;

    try {
      const zip = new JSZip();

      for (const file of files.value) {
        const arrayBuffer = await file.file.arrayBuffer();
        const options = getCompressionOptions(file.name, file.type);
        zip.file(file.name, arrayBuffer, options);
      }

      const content = await zip.generateAsync({
        type: 'blob',
      });

      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `files_${Date.now()}.zip`;
      link.click();
      URL.revokeObjectURL(url);

      showSuccessToast(t('tools.fileConverter.fileCompress.compressSuccess'));
    } catch (error) {
      console.error('Compress error:', error);
      showFailToast(t('tools.fileConverter.fileCompress.compressFailed'));
    } finally {
      compressing.value = false;
    }
  };

  return {
    files,
    compressing,
    handleFilesChange,
    removeFile,
    clearAll,
    compressToZip,
  };
}
