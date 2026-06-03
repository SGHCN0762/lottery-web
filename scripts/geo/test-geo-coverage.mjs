import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const geoDir = path.join(__dirname, '..', 'public', 'geo');

// 所有省级行政区adcode
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

console.log('='.repeat(80));
console.log('全国行政区划GeoJSON数据完整性检测');
console.log('='.repeat(80));
console.log('');

// 检查数据目录
if (!fs.existsSync(geoDir)) {
  console.error(`❌ 数据目录不存在: ${geoDir}`);
  process.exit(1);
}

// 获取所有现有文件
const existingFiles = fs.readdirSync(geoDir)
  .filter(file => file.endsWith('_full.json'))
  .map(file => file.replace('_full.json', ''));
console.log(`📁 现有GeoJSON文件数量: ${existingFiles.length}`);
console.log('');

// 统计
const stats = {
  totalProvinces: allProvinces.length,
  availableProvinces: 0,
  missingProvinces: 0,
  totalCities: 0,
  availableCities: 0,
  missingCities: 0,
  totalDistricts: 0,
  availableDistricts: 0,
  missingDistricts: 0,
  missingFiles: []
};

const missingProvinceList = [];
const missingCityList = [];

// 1. 检查全国数据
console.log('🔍 第一步：检查全国数据');
const nationalFile = '100000';
if (existingFiles.includes(nationalFile)) {
  console.log('✅ 全国数据 (100000_full.json) 已下载');
  try {
    const nationalData = JSON.parse(fs.readFileSync(path.join(geoDir, `${nationalFile}_full.json`), 'utf8'));
    const provinceFeatures = nationalData.features?.filter(f => f.properties?.level === 'province') || [];
    console.log(`   - 包含 ${provinceFeatures.length} 个省级行政区`);
  } catch (e) {
    console.log(`   ⚠️ 文件解析失败: ${e.message}`);
  }
} else {
  console.log('❌ 全国数据 (100000_full.json) 缺失');
  stats.missingFiles.push({ adcode: '100000', name: '全国', level: 'nation' });
}
console.log('');

// 2. 检查省级数据
console.log('🔍 第二步：检查省级数据');
console.log('');

for (const province of allProvinces) {
  const provinceFile = province.adcode;
  if (existingFiles.includes(provinceFile)) {
    stats.availableProvinces++;
    console.log(`✅ ${province.name} (${province.adcode})`);
    
    try {
      const provinceData = JSON.parse(fs.readFileSync(path.join(geoDir, `${provinceFile}_full.json`), 'utf8'));
      const cityFeatures = provinceData.features?.filter(f => f.properties?.level === 'city') || [];
      
      if (cityFeatures.length > 0) {
        console.log(`   - 包含 ${cityFeatures.length} 个市级行政区:`);
        
        for (const cityFeature of cityFeatures) {
          const cityName = cityFeature.properties?.name || '未知';
          const cityAdcode = cityFeature.properties?.adcode?.toString() || '';
          stats.totalCities++;
          
          if (cityAdcode) {
            if (existingFiles.includes(cityAdcode)) {
              stats.availableCities++;
              console.log(`     ✅ ${cityName} (${cityAdcode})`);
              
              // 检查该市的区县数据
              try {
                const cityData = JSON.parse(fs.readFileSync(path.join(geoDir, `${cityAdcode}_full.json`), 'utf8'));
                const districtFeatures = cityData.features?.filter(f => f.properties?.level === 'district') || [];
                
                if (districtFeatures.length > 0) {
                  console.log(`        - 包含 ${districtFeatures.length} 个区县级行政区`);
                  stats.totalDistricts += districtFeatures.length;
                  stats.availableDistricts += districtFeatures.length;
                }
              } catch (e) {
                console.log(`        ⚠️ ${cityName} 数据解析失败: ${e.message}`);
              }
            } else {
              stats.missingCities++;
              console.log(`     ❌ ${cityName} (${cityAdcode})`);
              stats.missingFiles.push({ adcode: cityAdcode, name: cityName, level: 'city', parent: province.name });
              missingCityList.push({ ...province, cityName, cityAdcode });
            }
          }
        }
      }
    } catch (e) {
      console.log(`   ⚠️ 数据解析失败: ${e.message}`);
    }
  } else {
    stats.missingProvinces++;
    console.log(`❌ ${province.name} (${province.adcode})`);
    missingProvinceList.push(province);
    stats.missingFiles.push({ ...province, level: 'province' });
  }
  console.log('');
}

// 3. 生成最终报告
console.log('='.repeat(80));
console.log('📊 检测报告');
console.log('='.repeat(80));
console.log('');
console.log('【省级行政区】');
console.log(`   总数: ${stats.totalProvinces}`);
console.log(`   已下载: ${stats.availableProvinces} (${Math.round(stats.availableProvinces/stats.totalProvinces*100)}%)`);
console.log(`   缺失: ${stats.missingProvinces}`);
if (stats.missingProvinces > 0) {
  console.log(`   缺失列表: ${missingProvinceList.map(p => p.name).join(', ')}`);
}
console.log('');
console.log('【市级行政区】');
console.log(`   总数: ${stats.totalCities}`);
console.log(`   已下载: ${stats.availableCities} (${stats.totalCities > 0 ? Math.round(stats.availableCities/stats.totalCities*100) : 0}%)`);
console.log(`   缺失: ${stats.missingCities}`);
console.log('');
console.log('【区县级行政区】');
console.log(`   统计包含在市级数据文件中`);
console.log(`   已统计: ${stats.availableDistricts}`);
console.log('');
console.log('【总体评价】');
if (stats.missingProvinces === 0 && stats.missingCities === 0) {
  console.log('✅ 所有数据完整！');
} else {
  console.log(`⚠️ 还有 ${stats.missingProvinces + stats.missingCities} 个文件缺失`);
  console.log('');
  console.log('📋 缺失文件清单:');
  for (const file of stats.missingFiles.slice(0, 20)) {
    console.log(`   - ${file.level === 'province' ? '省级' : file.level === 'city' ? '市级' : '全国'}: ${file.name} (${file.adcode})`);
  }
  if (stats.missingFiles.length > 20) {
    console.log(`   ... 还有 ${stats.missingFiles.length - 20} 个文件`);
  }
}
console.log('');
console.log('='.repeat(80));
console.log('检测完成！');
console.log('='.repeat(80));