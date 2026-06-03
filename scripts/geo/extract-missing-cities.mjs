import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const geoDir = path.join(__dirname, '..', 'public', 'geo');

console.log('='.repeat(80));
console.log('从省级数据中提取缺失的城市数据');
console.log('='.repeat(80));
console.log('');

if (!fs.existsSync(geoDir)) {
  console.error('数据目录不存在');
  process.exit(1);
}

const existingFiles = fs.readdirSync(geoDir)
  .filter(file => file.endsWith('_full.json'))
  .map(file => file.replace('_full.json', ''));

console.log(`现有GeoJSON文件: ${existingFiles.length} 个`);
console.log('');

let stats = {
  extracted: 0,
  skipped: 0,
  totalProcessed: 0
};

// 获取所有省级文件
const provinceFiles = fs.readdirSync(geoDir)
  .filter(file => {
    const adcode = file.replace('_full.json', '');
    return adcode.length === 6 && adcode.endsWith('0000') && adcode !== '100000';
  });

console.log(`找到 ${provinceFiles.length} 个省级文件`);
console.log('');

for (const provinceFileName of provinceFiles) {
  const provinceFile = path.join(geoDir, provinceFileName);
  
  try {
    const provinceData = JSON.parse(fs.readFileSync(provinceFile, 'utf8'));
    const provinceName = provinceFileName.replace('_full.json', '');
    
    // 获取该省的所有市级特征
    const cityFeatures = provinceData.features?.filter(f => f.properties?.level === 'city') || [];
    
    if (cityFeatures.length === 0) continue;
    
    console.log(`处理 ${provinceData.features?.find(f => f.properties?.level === 'province')?.properties?.name || provinceName}`);
    
    for (const cityFeature of cityFeatures) {
      const cityProps = cityFeature.properties || {};
      const cityAdcode = cityProps.adcode?.toString();
      const cityName = cityProps.name;
      
      if (!cityAdcode) continue;
      
      stats.totalProcessed++;
      
      // 检查城市文件是否已存在
      if (existingFiles.includes(cityAdcode)) {
        stats.skipped++;
        continue;
      }
      
      // 创建该城市的独立文件
      try {
        // 先收集该城市下的所有区县
        const districtFeatures = provinceData.features?.filter(f => {
          const parentAdcode = f.properties?.parent?.adcode?.toString();
          return f.properties?.level === 'district' && parentAdcode === cityAdcode;
        }) || [];
        
        // 创建城市数据文件
        const cityData = {
          type: 'FeatureCollection',
          features: [
            cityFeature,
            ...districtFeatures
          ]
        };
        
        const outputFile = path.join(geoDir, `${cityAdcode}_full.json`);
        fs.writeFileSync(outputFile, JSON.stringify(cityData, null, 2), 'utf8');
        
        stats.extracted++;
        console.log(`  ✅ 提取: ${cityName} (${cityAdcode}) - 包含 ${districtFeatures.length} 个区县`);
        
        // 添加到现有文件列表，避免重复处理
        existingFiles.push(cityAdcode);
      } catch (e) {
        console.error(`  ❌ 提取 ${cityName} (${cityAdcode}) 失败:`, e.message);
      }
    }
  } catch (e) {
    console.error(`处理 ${provinceFileName} 失败:`, e.message);
  }
}

console.log('');
console.log('='.repeat(80));
console.log('提取完成');
console.log('='.repeat(80));
console.log(`处理城市: ${stats.totalProcessed}`);
console.log(`新提取: ${stats.extracted}`);
console.log(`已跳过: ${stats.skipped}`);

const finalCount = fs.readdirSync(geoDir).filter(f => f.endsWith('_full.json')).length;
console.log(`最终文件总数: ${finalCount}`);
console.log('='.repeat(80));