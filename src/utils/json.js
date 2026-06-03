export function safeJsonParse(jsonString = '') {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn('JSON解析失败:', error);
    return null;
  }
}

export function safeJsonStringify(value = null) {
  try {
    return JSON.stringify(value);
  } catch (error) {
    console.warn('JSON序列化失败:', error);
    return null;
  }
}

export function safeJsonCopy(value = null) {
  return safeJsonParse(safeJsonStringify(value));
}
