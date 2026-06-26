export function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function truncateName(name, maxLen = 20) {
  if (!name) return '';
  if (name.length > maxLen) {
    return name.slice(0, maxLen) + '...';
  }
  return name;
}

export function getOriginalFormat(name) {
  if (!name) return '';
  const ext = name.split('.').pop().toLowerCase();
  return ext.toUpperCase();
}

export function getFileType(file) {
  if (file.file) return file.file.type;
  if (file.type) return file.type;
  return '';
}

export function getFileName(file) {
  return file.name || file.file?.name || file.originalName || '';
}

export function getFileUrl(file) {
  return file.url || file.convertedUrl || file.compressedUrl || file.watermarkedUrl || '';
}

export function isImage(file) {
  const type = getFileType(file);
  return type.startsWith('image/');
}

export function isPdf(file) {
  const type = getFileType(file);
  if (type === 'application/pdf') return true;
  const name = getFileName(file);
  return name.toLowerCase().endsWith('.pdf');
}

export function isVideo(file) {
  const type = getFileType(file);
  return type.startsWith('video/');
}

export function isAudio(file) {
  const type = getFileType(file);
  return type.startsWith('audio/');
}

export function isText(file) {
  const type = getFileType(file);
  if (type.startsWith('text/')) return true;
  const name = getFileName(file);
  const textExts = ['.txt', '.md', '.json', '.xml', '.html', '.css', '.js', '.ts'];
  return textExts.some(ext => name.toLowerCase().endsWith(ext));
}

export function isCompressed(file) {
  const type = getFileType(file);
  const compressedTypes = [
    'application/zip',
    'application/x-zip-compressed',
    'application/x-rar-compressed',
    'application/x-7z-compressed',
    'application/gzip',
    'application/x-tar',
  ];
  if (compressedTypes.includes(type)) return true;
  const name = getFileName(file);
  const compressedExts = ['.zip', '.rar', '.7z', '.gz', '.tar'];
  return compressedExts.some(ext => name.toLowerCase().endsWith(ext));
}

export function isWord(file) {
  const name = getFileName(file);
  const wordExts = ['.doc', '.docx'];
  return wordExts.some(ext => name.toLowerCase().endsWith(ext));
}

export function isExcel(file) {
  const name = getFileName(file);
  const excelExts = ['.xls', '.xlsx', '.csv'];
  return excelExts.some(ext => name.toLowerCase().endsWith(ext));
}

export function isPowerPoint(file) {
  const name = getFileName(file);
  const pptExts = ['.ppt', '.pptx'];
  return pptExts.some(ext => name.toLowerCase().endsWith(ext));
}
