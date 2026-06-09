import { showSuccessToast, showFailToast, showLoadingToast } from 'vant';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * HTML转义
 */
export const escapeHTML = str => {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Markdown转义
 */
export const escapeMD = str => {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\*/g, '\\*')
    .replace(/\_/g, '\\_')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\[|]/g, match => '\\' + match)
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\#/g, '\\#')
    .replace(/\+/g, '\\+')
    .replace(/\-/g, '\\-')
    .replace(/\./g, '\\.')
    .replace(/\!/g, '\\!');
};

/**
 * 生成文件名
 */
export const generateFilename = (name, extension) => {
  const timestamp = Date.now();
  const sanitizedName = (name || 'resume').replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_');
  return `${sanitizedName}_${timestamp}.${extension}`;
};

/**
 * 下载文件
 */
export const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  downloadByUrl(url, filename);
};

/**
 * 通过URL下载
 */
export const downloadByUrl = (url, filename) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * 生成Markdown内容
 */
export const generateMarkdownContent = (data, t) => {
  const d = data;
  let md = `# ${escapeMD(d.basic.name || '未填写姓名')}\n\n`;
  md += `## ${escapeMD(d.basic.title || '')}\n\n`;

  let contactInfo = `**联系方式**：${escapeMD(d.basic.phone || '')}`;
  if (d.basic.email) contactInfo += ` | ${escapeMD(d.basic.email)}`;
  if (d.basic.location) contactInfo += ` | ${escapeMD(d.basic.location)}`;
  md += contactInfo + '\n\n';

  if (d.basic.customFields && d.basic.customFields.length > 0) {
    md += `**自定义信息**：${d.basic.customFields.map(f => escapeMD(f.label) + '：' + escapeMD(f.value)).join(' | ')}\n\n`;
  }

  if (d.basic.summary) {
    md += `## 个人简介\n\n${escapeMD(d.basic.summary)}\n\n`;
  }

  md += `## 工作经历\n\n`;
  if (d.experience.length > 0) {
    d.experience.forEach(exp => {
      md += `### ${escapeMD(exp.company || '')}\n`;
      md += `**职位**：${escapeMD(exp.position || '')}\n`;
      md += `**时间**：${escapeMD(exp.startDate || '')} - ${escapeMD(exp.endDate || '至今')}\n`;
      if (exp.description) md += `**描述**：\n${escapeMD(exp.description)}\n`;
      md += '\n';
    });
  } else {
    md += '暂无工作经历\n\n';
  }

  md += `## 项目经历\n\n`;
  if (d.project.length > 0) {
    d.project.forEach(proj => {
      md += `### ${escapeMD(proj.name || '')}\n`;
      md += `**角色**：${escapeMD(proj.role || '')}\n`;
      md += `**时间**：${escapeMD(proj.startDate || '')} - ${escapeMD(proj.endDate || '至今')}\n`;
      if (proj.techStack) md += `**技术栈**：${escapeMD(proj.techStack)}\n`;
      if (proj.description) md += `**描述**：\n${escapeMD(proj.description)}\n`;
      md += '\n';
    });
  } else {
    md += '暂无项目经历\n\n';
  }

  md += `## 教育背景\n\n`;
  if (d.education.length > 0) {
    d.education.forEach(edu => {
      md += `### ${escapeMD(edu.school || '')}\n`;
      md += `**专业**：${escapeMD(edu.major || '')}\n`;
      md += `**学位**：${escapeMD(edu.degree || '')}\n`;
      md += `**时间**：${escapeMD(edu.startDate || '')} - ${escapeMD(edu.endDate || '至今')}\n\n`;
    });
  } else {
    md += '暂无教育背景\n\n';
  }

  md += `## 技能特长\n\n`;
  md += d.skills.length > 0 ? d.skills.map(skill => escapeMD(skill)).join(' | ') : '暂无技能信息';
  md += '\n';

  return md;
};

/**
 * 导出功能 hook
 */
export const useExport = (resumeData, t) => {
  const exportToJSON = () => {
    try {
      const dataStr = JSON.stringify(resumeData.value, null, 2);
      downloadFile(
        dataStr,
        generateFilename(resumeData.value.basic.name, 'json'),
        'application/json'
      );
      showSuccessToast(t('resume.messages.exportSuccess'));
    } catch (error) {
      console.error('Export JSON error:', error);
      showFailToast(t('resume.messages.exportFailed'));
    }
  };

  const exportToMarkdown = () => {
    try {
      const md = generateMarkdownContent(resumeData.value, t);
      downloadFile(md, generateFilename(resumeData.value.basic.name, 'md'), 'text/markdown');
      showSuccessToast(t('resume.messages.exportSuccess'));
    } catch (error) {
      console.error('Export Markdown error:', error);
      showFailToast(t('resume.messages.exportFailed'));
    }
  };

  const exportToImage = async showPreview => {
    let loadingToast;

    try {
      // 打开预览
      if (!showPreview.value) {
        showPreview.value = true;
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      loadingToast = showLoadingToast({
        message: t('resume.preview.exporting'),
        forbidClick: true,
      });

      // 等待 DOM 更新
      await new Promise(resolve => setTimeout(resolve, 300));

      // 找到预览容器元素
      const containerEl = document.querySelector('.resume-preview .a4-container');
      if (!containerEl) {
        throw new Error('Preview container not found');
      }

      // 获取原始容器的主题样式
      const computedStyle = window.getComputedStyle(containerEl);
      const themePrimary = computedStyle.getPropertyValue('--theme-primary').trim();
      const themeSecondary = computedStyle.getPropertyValue('--theme-secondary').trim();
      const themeAccent = computedStyle.getPropertyValue('--theme-accent').trim();
      const themeBg = computedStyle.getPropertyValue('--theme-bg').trim();
      const themeCard = computedStyle.getPropertyValue('--theme-card').trim();
      const themeTextPrimary = computedStyle.getPropertyValue('--theme-text-primary').trim();
      const themeTextSecondary = computedStyle.getPropertyValue('--theme-text-secondary').trim();
      const themeTextLight = computedStyle.getPropertyValue('--theme-text-light').trim();
      const themeBorder = computedStyle.getPropertyValue('--theme-border').trim();
      const themeSummary = computedStyle.getPropertyValue('--theme-summary').trim();
      const themeSkillBg = computedStyle.getPropertyValue('--theme-skill-bg').trim();
      const themeSkillBorder = computedStyle.getPropertyValue('--theme-skill-border').trim();
      const themeSkillColor = computedStyle.getPropertyValue('--theme-skill-color').trim();
      const themeSectionLine = computedStyle.getPropertyValue('--theme-section-line').trim();
      const themeItemBorder = computedStyle.getPropertyValue('--theme-item-border').trim();

      // 获取背景样式
      const backgroundImage = computedStyle.backgroundImage;
      const backgroundSize = computedStyle.backgroundSize;
      const backgroundRepeat = computedStyle.backgroundRepeat;
      const backgroundPosition = computedStyle.backgroundPosition;

      // 克隆元素用于导出
      const clone = containerEl.cloneNode(true);

      // 设置固定 A4 尺寸和主题样式
      let styleText = `
        position: absolute;
        left: -9999px;
        top: 0;
        width: 794px !important;
        min-height: 1123px !important;
        max-width: 794px !important;
        transform: none !important;
        background-image: ${backgroundImage};
        background-size: ${backgroundSize};
        background-repeat: ${backgroundRepeat};
        background-position: ${backgroundPosition};
        --theme-primary: ${themePrimary};
        --theme-secondary: ${themeSecondary};
        --theme-accent: ${themeAccent};
        --theme-bg: ${themeBg};
        --theme-card: ${themeCard};
        --theme-text-primary: ${themeTextPrimary};
        --theme-text-secondary: ${themeTextSecondary};
        --theme-text-light: ${themeTextLight};
        --theme-border: ${themeBorder};
        --theme-summary: ${themeSummary};
        --theme-skill-bg: ${themeSkillBg};
        --theme-skill-border: ${themeSkillBorder};
        --theme-skill-color: ${themeSkillColor};
        --theme-section-line: ${themeSectionLine};
        --theme-item-border: ${themeItemBorder};
      `;

      clone.style.cssText = styleText;

      // 设置内容区域的固定样式
      const content = clone.querySelector('.a4-content');
      if (content) {
        content.style.cssText = `
          padding: 40px 48px !important;
          width: 100% !important;
          min-height: 1123px !important;
          box-sizing: border-box !important;
          --a4-name-size: 32px !important;
          --a4-section-size: 18px !important;
          --a4-title-size: 15px !important;
          --a4-content-size: 14px !important;
          --a4-small-size: 12px !important;
          --a4-period-size: 11px !important;
          --a4-padding-lg: 20px !important;
          --a4-padding-md: 14px !important;
          --a4-padding-sm: 7px !important;
          --a4-margin-lg: 20px !important;
          --a4-margin-md: 14px !important;
          --a4-margin-sm: 7px !important;
          --a4-icon-sm: 13px !important;
          --a4-icon-md: 15px !important;
          --a4-icon-lg: 17px !important;
          --a4-icon-xl: 44px !important;
          --a4-avatar-size: 88px !important;
          --a4-bullet-size: 10px !important;
          --a4-bullet-offset: 20px !important;
        `;
      }

      // 添加到页面
      document.body.appendChild(clone);

      // 等待渲染
      await new Promise(resolve => setTimeout(resolve, 300));

      // 使用 html2canvas 捕获克隆元素
      const canvas = await html2canvas(clone, {
        backgroundColor: '#ffffff',
        scale: 3,
        useCORS: true,
        logging: false,
        allowTaint: true,
        width: 794,
        height: Math.max(1123, clone.scrollHeight),
        windowWidth: 794,
        windowHeight: Math.max(1123, clone.scrollHeight),
      });

      // 移除克隆元素
      document.body.removeChild(clone);

      // 转换为 PNG 并下载
      const link = document.createElement('a');
      link.download = generateFilename(resumeData.value.basic.name, 'png');
      
      // 使用 blob URL 代替 data URL，提高浏览器兼容性
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png', 1.0));
      const url = URL.createObjectURL(blob);
      link.href = url;
      
      // 添加到 DOM 中以确保兼容性
      document.body.appendChild(link);
      
      // 使用 setTimeout 确保异步执行，兼容移动端浏览器
      setTimeout(() => {
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);

      loadingToast?.close();
      showSuccessToast(t('resume.messages.exportSuccess'));
    } catch (error) {
      console.error('Export Image error:', error);
      loadingToast?.close();
      showFailToast(t('resume.messages.exportFailed'));
    }
  };

  const exportToPDF = async showPreview => {
    let loadingToast;

    try {
      // 打开预览
      if (!showPreview.value) {
        showPreview.value = true;
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      loadingToast = showLoadingToast({
        message: t('resume.preview.pdfExporting'),
        forbidClick: true,
      });

      // 等待 DOM 更新
      await new Promise(resolve => setTimeout(resolve, 300));

      // 找到预览容器元素
      const containerEl = document.querySelector('.resume-preview .a4-container');
      if (!containerEl) {
        throw new Error('Preview container not found');
      }

      // 获取原始容器的主题样式
      const computedStyle = window.getComputedStyle(containerEl);
      const themePrimary = computedStyle.getPropertyValue('--theme-primary').trim();
      const themeSecondary = computedStyle.getPropertyValue('--theme-secondary').trim();
      const themeAccent = computedStyle.getPropertyValue('--theme-accent').trim();
      const themeBg = computedStyle.getPropertyValue('--theme-bg').trim();
      const themeCard = computedStyle.getPropertyValue('--theme-card').trim();
      const themeTextPrimary = computedStyle.getPropertyValue('--theme-text-primary').trim();
      const themeTextSecondary = computedStyle.getPropertyValue('--theme-text-secondary').trim();
      const themeTextLight = computedStyle.getPropertyValue('--theme-text-light').trim();
      const themeBorder = computedStyle.getPropertyValue('--theme-border').trim();
      const themeSummary = computedStyle.getPropertyValue('--theme-summary').trim();
      const themeSkillBg = computedStyle.getPropertyValue('--theme-skill-bg').trim();
      const themeSkillBorder = computedStyle.getPropertyValue('--theme-skill-border').trim();
      const themeSkillColor = computedStyle.getPropertyValue('--theme-skill-color').trim();
      const themeSectionLine = computedStyle.getPropertyValue('--theme-section-line').trim();
      const themeItemBorder = computedStyle.getPropertyValue('--theme-item-border').trim();

      // 获取背景样式
      const backgroundImage = computedStyle.backgroundImage;
      const backgroundSize = computedStyle.backgroundSize;
      const backgroundRepeat = computedStyle.backgroundRepeat;
      const backgroundPosition = computedStyle.backgroundPosition;

      // 克隆元素用于导出
      const clone = containerEl.cloneNode(true);

      // 设置固定 A4 尺寸和主题样式（PDF导出不设置min-height，让高度自适应）
      let styleText = `
        position: absolute;
        left: -9999px;
        top: 0;
        width: 794px !important;
        min-height: auto !important;
        max-width: 794px !important;
        transform: none !important;
        background-image: ${backgroundImage};
        background-size: ${backgroundSize};
        background-repeat: ${backgroundRepeat};
        background-position: ${backgroundPosition};
        --theme-primary: ${themePrimary};
        --theme-secondary: ${themeSecondary};
        --theme-accent: ${themeAccent};
        --theme-bg: ${themeBg};
        --theme-card: ${themeCard};
        --theme-text-primary: ${themeTextPrimary};
        --theme-text-secondary: ${themeTextSecondary};
        --theme-text-light: ${themeTextLight};
        --theme-border: ${themeBorder};
        --theme-summary: ${themeSummary};
        --theme-skill-bg: ${themeSkillBg};
        --theme-skill-border: ${themeSkillBorder};
        --theme-skill-color: ${themeSkillColor};
        --theme-section-line: ${themeSectionLine};
        --theme-item-border: ${themeItemBorder};
      `;

      clone.style.cssText = styleText;

      // PDF导出：不设置min-height，让高度自适应内容
      const content = clone.querySelector('.a4-content');
      if (content) {
        content.style.cssText = `
          padding: 40px 48px !important;
          width: 100% !important;
          min-height: auto !important;
          box-sizing: border-box !important;
          --a4-name-size: 32px !important;
          --a4-section-size: 18px !important;
          --a4-title-size: 15px !important;
          --a4-content-size: 14px !important;
          --a4-small-size: 12px !important;
          --a4-period-size: 11px !important;
          --a4-padding-lg: 20px !important;
          --a4-padding-md: 14px !important;
          --a4-padding-sm: 7px !important;
          --a4-margin-lg: 20px !important;
          --a4-margin-md: 14px !important;
          --a4-margin-sm: 7px !important;
          --a4-icon-sm: 13px !important;
          --a4-icon-md: 15px !important;
          --a4-icon-lg: 17px !important;
          --a4-icon-xl: 44px !important;
          --a4-avatar-size: 88px !important;
          --a4-bullet-size: 10px !important;
          --a4-bullet-offset: 20px !important;
        `;
      }

      // 添加到页面
      document.body.appendChild(clone);

      // 等待渲染
      await new Promise(resolve => setTimeout(resolve, 300));

      // 使用 html2canvas 捕获克隆元素（高度自适应内容）
      const scrollHeight = clone.scrollHeight; // 在移除前获取高度
      const canvas = await html2canvas(clone, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        width: 794,
        height: scrollHeight,
        windowWidth: 794,
        windowHeight: scrollHeight,
      });

      // 移除克隆元素
      document.body.removeChild(clone);

      // A4 尺寸（mm）
      const a4Width = 210;
      const a4Height = 297;

      // 创建 PDF（竖向，A4）
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // 计算图片在 PDF 中的尺寸（保持 A4 宽高比）
      const imgWidth = a4Width;
      const imgHeight = (canvas.height / canvas.width) * imgWidth;

      // 使用 JPEG 格式，质量 0.85，大幅减小文件体积
      const imgData = canvas.toDataURL('image/jpeg', 0.85);

      // 添加图片到 PDF
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);

      // 如果内容超过一页，分页处理
      // 添加 2mm 容差，避免因边距/padding导致的微小超出而生成空白页
      let remainingHeight = imgHeight - a4Height;
      let currentY = -a4Height;

      while (remainingHeight > 2) {
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, currentY, imgWidth, imgHeight);
        remainingHeight -= a4Height;
        currentY -= a4Height;
      }

      // 下载 PDF
      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const pdfLink = document.createElement('a');
      pdfLink.download = generateFilename(resumeData.value.basic.name, 'pdf');
      pdfLink.href = pdfUrl;
      
      // 添加到 DOM 中以确保兼容性
      document.body.appendChild(pdfLink);
      
      // 使用 setTimeout 确保异步执行，兼容移动端浏览器
      setTimeout(() => {
        pdfLink.click();
        document.body.removeChild(pdfLink);
        URL.revokeObjectURL(pdfUrl);
      }, 100);

      loadingToast?.close();
      showSuccessToast(t('resume.messages.exportSuccess'));
    } catch (error) {
      console.error('Export PDF error:', error);
      loadingToast?.close();
      showFailToast(t('resume.messages.exportFailed'));
    }
  };

  const exportFnMap = {
    json: exportToJSON,
    markdown: exportToMarkdown,
    image: exportToImage,
    pdf: exportToPDF,
  };

  const handleExport = (format, showPreview) => {
    const fn = exportFnMap[format];
    if (fn) {
      if (format === 'image' || format === 'pdf') {
        fn(showPreview);
      } else {
        fn();
      }
    } else {
      showFailToast(t('resume.messages.exportFailed'));
    }
  };

  return {
    exportToJSON,
    exportToMarkdown,
    exportToImage,
    exportToPDF,
    handleExport,
    generateFilename,
    downloadFile,
  };
};
