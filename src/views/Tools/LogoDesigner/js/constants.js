// Logo Designer Constants

// Canvas size limits
export const CANVAS_MAX_SIZE = 1920;
export const CANVAS_MIN_SIZE = 100;

// Canvas preset options (like Photoshop)
export const CANVAS_PRESET_OPTIONS = [
  { name: 'Instagram Post', value: 'instagram_post', width: 1080, height: 1080, ratio: 1 },
  { name: 'Instagram Story', value: 'instagram_story', width: 1080, height: 1920, ratio: 0.5625 },
  { name: 'Facebook Post', value: 'facebook_post', width: 1200, height: 630, ratio: 1.905 },
  { name: 'Twitter Post', value: 'twitter_post', width: 1200, height: 675, ratio: 1.778 },
  { name: 'YouTube Thumbnail', value: 'youtube_thumbnail', width: 1280, height: 720, ratio: 1.778 },
  { name: 'LinkedIn Post', value: 'linkedin_post', width: 1200, height: 1200, ratio: 1 },
  { name: 'Website Banner', value: 'website_banner', width: 1920, height: 480, ratio: 4 },
  { name: 'Logo Square', value: 'logo_square', width: 500, height: 500, ratio: 1 },
  { name: 'Logo Wide', value: 'logo_wide', width: 800, height: 200, ratio: 4 },
  { name: 'App Icon', value: 'app_icon', width: 512, height: 512, ratio: 1 },
  { name: 'Custom', value: 'custom', width: null, height: null, ratio: null },
];

// Aspect ratio options (value is the ratio: width/height)
export const RATIO_OPTIONS = [
  { name: '1:1', value: 1 },
  { name: '3:2', value: 1.5 },
  { name: '4:3', value: 1.333 },
  { name: '16:9', value: 1.778 },
  { name: '9:16', value: 0.5625 },
  { name: '2:1', value: 2 },
];

// Font weight options
export const WEIGHT_OPTIONS = [
  { name: '100', value: '100' },
  { name: '200', value: '200' },
  { name: '300', value: '300' },
  { name: '400', value: '400' },
  { name: '500', value: '500' },
  { name: '600', value: '600' },
  { name: '700', value: '700' },
  { name: '800', value: '800' },
  { name: '900', value: '900' },
];

// Text style options
export const STYLE_OPTIONS = [
  { name: 'normal', value: 'normal' },
  { name: 'italic', value: 'italic' },
];

// Export format options
export const FORMAT_OPTIONS = [
  { name: 'PNG', value: 'png' },
  { name: 'JPEG', value: 'jpeg' },
  { name: 'WebP', value: 'webp' },
];

// Shape options
export const SHAPE_OPTIONS = [
  { name: 'circle', value: 'circle' },
  { name: 'square', value: 'square' },
  { name: 'triangle', value: 'triangle' },
  { name: 'diamond', value: 'diamond' },
  { name: 'hexagon', value: 'hexagon' },
  { name: 'star', value: 'star' },
];

// Icon options
export const ICON_OPTIONS = [
  { name: 'check', value: 'check' },
  { name: 'cross', value: 'cross' },
  { name: 'plus', value: 'plus' },
  { name: 'minus', value: 'minus' },
  { name: 'circle', value: 'circle' },
  { name: 'square', value: 'square' },
];

// Debounce delay for size changes
export const SIZE_CHANGE_DEBOUNCE = 500;

// Layer size limits (percentage relative to canvas short side)
// 用于统一配置各类型图层的尺寸限制范围
export const LAYER_SIZE_LIMITS = {
  text: { min: 0, max: 30 },    // 字体大小：0-30%
  shape: { min: 0, max: 100 }, // 形状大小：0-100%
  icon: { min: 0, max: 100 },  // 图标大小：0-100%
  image: { min: 0, max: 100 }, // 图片大小：0-100%
};

// Canvas border radius limits (percentage relative to canvas short side)
export const BORDER_RADIUS_LIMITS = { min: 0, max: 50 };
