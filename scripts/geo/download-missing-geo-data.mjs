import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const geoDir = path.join(__dirname, '..', 'public', 'geo');

if (!fs.existsSync(geoDir)) {
  fs.mkdirSync(geoDir, { recursive: true });
}

const BASE_URL = 'https://geo.datav.aliyun.com/areas_v3/bound';

const allProvinces = [
  { adcode: '110000', name: '北京市' },
  { adcode: '120000', name: '天津市' },
  { adcode: '130000', name: '河北省' },
  { adcode: '140000', name: '山西省' },
  { adcode: '150000', name: '内蒙古自治区' },
  { adcode: '210000', name: '辽宁省' },
  { adcode: '220000', name: '吉林省' },
  { adcode: '230000', name: '黑龙江省' },
  { adcode: '310000', name: '上海市' },
  { adcode: '320000', name: '江苏省' },
  { adcode: '330000', name: '浙江省' },
  { adcode: '340000', name: '安徽省' },
  { adcode: '350000', name: '福建省' },
  { adcode: '360000', name: '江西省' },
  { adcode: '370000', name: '山东省' },
  { adcode: '410000', name: '河南省' },
  { adcode: '420000', name: '湖北省' },
  { adcode: '430000', name: '湖南省' },
  { adcode: '440000', name: '广东省' },
  { adcode: '450000', name: '广西壮族自治区' },
  { adcode: '460000', name: '海南省' },
  { adcode: '500000', name: '重庆市' },
  { adcode: '510000', name: '四川省' },
  { adcode: '520000', name: '贵州省' },
  { adcode: '530000', name: '云南省' },
  { adcode: '540000', name: '西藏自治区' },
  { adcode: '610000', name: '陕西省' },
  { adcode: '620000', name: '甘肃省' },
  { adcode: '630000', name: '青海省' },
  { adcode: '640000', name: '宁夏回族自治区' },
  { adcode: '650000', name: '新疆维吾尔自治区' },
  { adcode: '710000', name: '台湾省' },
  { adcode: '810000', name: '香港特别行政区' },
  { adcode: '820000', name: '澳门特别行政区' }
];

async function downloadGeoData(adcode, name) {
  const filePath = path.join(geoDir, `${adcode}_full.json`);
  
  if (fs.existsSync(filePath)) {
    return { success: true, skipped: true };
  }
  
  try {
    console.log(`正在下载: ${name} (${adcode})`);
    const response = await fetch(`${BASE_URL}/${adcode}_full.json`);
    
    if (!response.ok) {
      return { success: false, error: `HTTP ${response.status}` };
    }
    
    const data = await response.json();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function extractCityAdcodes(provinceFile) {
  try {
    const data = JSON.parse(fs.readFileSync(provinceFile, 'utf8'));
    const cities = data.features
      ?.filter(f => f.properties?.level === 'city')
      ?.map(f => ({
        adcode: f.properties?.adcode?.toString(),
        name: f.properties?.name
      })) || [];
    return cities;
  } catch (e) {
    console.error(`解析 ${path.basename(provinceFile)} 失败:`, e.message);
    return [];
  }
}

async function main() {
  console.log('='.repeat(80));
  console.log('下载缺失的GeoJSON数据');
  console.log('='.repeat(80));
  console.log('');

  const existingFiles = fs.readdirSync(geoDir)
    .filter(file => file.endsWith('_full.json'))
    .map(file => file.replace('_full.json', ''));

  console.log(`现有文件: ${existingFiles.length} 个`);
  console.log('');

  let stats = {
    downloaded: 0,
    skipped: 0,
    failed: 0,
    errors: []
  };

  console.log('第一步：确保所有省级数据存在');
  for (const province of allProvinces) {
    const result = await downloadGeoData(province.adcode, province.name);
    if (result.skipped) {
      stats.skipped++;
    } else if (result.success) {
      stats.downloaded++;
      console.log(`✅ ${province.name} (${province.adcode}) 下载成功`);
    } else {
      stats.failed++;
      stats.errors.push({ ...province, error: result.error });
      console.log(`❌ ${province.name} (${province.adcode}) 下载失败: ${result.error}`);
    }
    await new Promise(r => setTimeout(r, 100));
  }
  console.log('');

  console.log('第二步：从省级数据提取市级列表并下载');
  for (const province of allProvinces) {
    const provinceFile = path.join(geoDir, `${province.adcode}_full.json`);
    if (!fs.existsSync(provinceFile)) continue;

    const cities = extractCityAdcodes(provinceFile);
    if (cities.length === 0) continue;

    console.log(`处理 ${province.name} 的 ${cities.length} 个市级行政区`);

    for (const city of cities) {
      if (!city.adcode) continue;

      const result = await downloadGeoData(city.adcode, `${province.name} ${city.name}`);
      if (result.skipped) {
        stats.skipped++;
      } else if (result.success) {
        stats.downloaded++;
        console.log(`  ✅ ${city.name} (${city.adcode}) 下载成功`);
      } else {
        stats.failed++;
        stats.errors.push({ adcode: city.adcode, name: `${province.name} ${city.name}`, error: result.error });
        console.log(`  ❌ ${city.name} (${city.adcode}) 下载失败: ${result.error}`);
      }
      await new Promise(r => setTimeout(r, 100));
    }
  }
  console.log('');

  console.log('='.repeat(80));
  console.log('下载完成总结');
  console.log('='.repeat(80));
  console.log(`新下载: ${stats.downloaded} 个`);
  console.log(`已跳过: ${stats.skipped} 个 (已存在)`);
  console.log(`失败: ${stats.failed} 个`);

  if (stats.failed > 0) {
    console.log('');
    console.log('失败列表:');
    for (const error of stats.errors) {
      console.log(`  - ${error.name} (${error.adcode}): ${error.error}`);
    }
  }

  console.log('');
  const finalCount = fs.readdirSync(geoDir).filter(f => f.endsWith('_full.json')).length;
  console.log(`最终文件总数: ${finalCount} 个`);
  console.log('='.repeat(80));
}

main().catch(console.error);