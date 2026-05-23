// vConsole 工具
import VConsole from 'vconsole';

// 创建 vConsole 实例
const vConsole = new VConsole({
  defaultPlugins: ['system', 'network', 'element', 'storage'], // 默认插件
  maxLogNumber: 1000, // 最大日志数量
});

// 导出 vConsole 实例
export default vConsole;

// 提供一些便捷方法
export const showVConsole = () => {
  vConsole.show();
};

export const hideVConsole = () => {
  vConsole.hide();
};

export const log = (message, ...optionalParams) => {
  vConsole.log(message, ...optionalParams);
};

export const warn = (message, ...optionalParams) => {
  vConsole.warn(message, ...optionalParams);
};

export const error = (message, ...optionalParams) => {
  vConsole.error(message, ...optionalParams);
};

export const info = (message, ...optionalParams) => {
  vConsole.info(message, ...optionalParams);
};
