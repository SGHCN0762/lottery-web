import { ref, computed } from 'vue';
import filenames from '../data/filenames.json';

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/SGHCN0762/laws-and-regulations@v1.0.0';

const getFullUrl = (filename) => `${CDN_BASE}/${encodeURI(filename)}`;

// 去掉「_发布日期」后缀和扩展名，得到法律法规名称用于展示
const deriveTitle = (filename) =>
  filename.replace(/\.(docx|doc)$/i, '').replace(/_\d{8}$/, '');

// 分类规则（按优先级先后匹配，命中即归类）。公安专业为显式默认 Tab，其余按法律部门自动生成。
// 每条规则对「法律法规名称」做匹配，返回 true 表示归入该分类。
const rules = [
  // 法律解释与决定（全国人大常委会的解释/决定/决议）
  ['interpretations', (t) =>
    t.startsWith('全国人民代表大会常务委员会关于') ||
    t.startsWith('第五届全国人民代表大会')],
  // 公安专业：与公安民警执法勤务直接相关的法律法规
  ['police', (t) =>
    /人民警察法|警察警衔|武装警察法|海警法|治安管理处罚法|集会游行示威法|戒严法|突发事件应对法|禁毒法|反恐怖主义法|反间谍法|国家安全法|反有组织犯罪法|反电信网络诈骗法|国家情报法|出境入境管理法|护照法|居民身份证法|户口登记条例|道路交通安全法|消防法|消防救援衔条例|枪支管理法|危险化学品安全法|监狱法|社区矫正法|网络安全法|数据安全法|个人信息保护法|密码法|保守国家秘密法|反洗钱法|引渡法|国际刑事司法协助法|反家庭暴力法|预防未成年人犯罪法|境外非政府组织境内活动管理法|海关法|海关关衔条例|刑法|刑事诉讼法/.test(t)],
  // 诉讼与非诉讼程序法
  ['procedural', (t) =>
    /民事诉讼法|行政诉讼法|仲裁法|人民调解法|海事诉讼特别程序法|行政复议法|法律援助法/.test(t)],
  // 宪法及宪法相关法
  ['constitutional', (t) =>
    /立法法|监督法|国务院组织法|全国人民代表大会|地方各级人民代表大会|代表法|选举法|议事规则|组织法|国旗法|国徽法|国歌法|国籍法|领海及毗连区法|专属经济区和大陆架法|陆地国界法|缔结条约程序法|特别行政区基本法|驻军法|民族区域自治法|村民委员会组织法|城市居民委员会组织法|国家勋章|国家赔偿法|法官法|检察官法|监察官法|监察法|反分裂国家法/.test(t)],
  // 民商法
  ['civil', (t) =>
    /民法典|公司法|证券法|证券投资基金法|票据法|保险法|企业破产法|商业银行法|信托法|拍卖法|招标投标法|专利法|商标法|著作权法|电子签名法|电子商务法|涉外民事关系法律适用法|合伙企业法|个人独资企业法|外商投资法|台湾同胞投资保护法|资产评估法|期货和衍生品法|全民所有制工业企业法|企业国有资产法|海商法/.test(t)],
  // 经济法
  ['economic', (t) =>
    /税|预算法|审计法|反垄断法|反不正当竞争法|政府采购法|价格法|计量法|标准化法|统计法|广告法|烟草专卖法|进出口商品检验法|对外贸易法|反食品浪费法|清洁生产促进法|循环经济促进法|节约能源法|可再生能源法/.test(t)],
  // 社会法
  ['social', (t) =>
    /劳动法|劳动合同法|劳动争议|社会保险法|社会救助法|工会法|妇女权益保障法|未成年人保护法|老年人权益保障法|残疾人保障法|归侨侨眷|红十字会法|慈善法|公益事业捐赠法|消费者权益保护法|家庭教育促进法|退役军人保障法|军人保险法|军人地位|英雄烈士保护法|无障碍环境建设法/.test(t)],
  // 行政法（兜底：其余行政管理类法律法规）
  ['administrative', () => true],
];

// 分类元数据（顺序即 Tab 顺序，公安专业为默认首个 Tab）
export const categories = [
  { id: 'police', name: '公安专业', icon: '👮' },
  { id: 'interpretations', name: '法律解释与决定', icon: '📜' },
  { id: 'constitutional', name: '宪法及宪法相关法', icon: '🏛️' },
  { id: 'administrative', name: '行政法', icon: '📋' },
  { id: 'economic', name: '经济法', icon: '💰' },
  { id: 'civil', name: '民商法', icon: '📑' },
  { id: 'social', name: '社会法', icon: '🤝' },
  { id: 'procedural', name: '诉讼与非诉讼程序法', icon: '⚖️' },
  { id: 'other', name: '其他', icon: '📂' },
];

const categorize = (filename) => {
  const title = deriveTitle(filename);
  for (const [id, match] of rules) {
    if (match(title)) return id;
  }
  return 'other';
};

// 仅保留存在文件的分类，并按上面定义的顺序排序
const grouped = {};
filenames.forEach((name, index) => {
  const id = categorize(name);
  (grouped[id] = grouped[id] || []).push({
    id: `${id}-${index}`,
    name,
    subtitle: deriveTitle(name),
    url: getFullUrl(name),
  });
});

const allFiles = Object.fromEntries(
  categories.map((cat) => [cat.id, grouped[cat.id] || []]),
);

export function useLawsRegulations() {
  // 默认选中「公安专业」
  const activeCategory = ref('police');

  const filteredFiles = computed(() => allFiles[activeCategory.value] || []);

  const getFileUrl = (file) => file.url || '';

  const getFileName = (file) => file.name || '';

  return {
    activeCategory,
    filteredFiles,
    getFileUrl,
    getFileName,
  };
}
