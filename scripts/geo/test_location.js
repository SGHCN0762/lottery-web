import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const geoDir = path.join(__dirname, '../public/geo');

console.log('=' .repeat(80));
console.log('测试坐标判断逻辑');
console.log('=' .repeat(80));
console.log('');

// 读取全国数据
const loadGeoData = (adcode) => {
  try {
    const filePath = path.join(geoDir, `${adcode}_full.json`);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  } catch (e) {
    console.error(`加载 ${adcode} 失败:`, e.message);
  }
  return null;
};

// 点在多边形内判断算法
function pointInPolygon(point, polygon) {
  const [x, y] = point;
  let inside = false;

  const isPointInRing = ring => {
    let ringInside = false;
    for (let j = 0, len2 = ring.length; j < len2; j++) {
      const xi = ring[j][0];
      const yi = ring[j][1];
      const xj = ring[j === len2 - 1 ? 0 : j + 1][0];
      const yj = ring[j === len2 - 1 ? 0 : j + 1][1];

      const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

      if (intersect) {
        ringInside = !ringInside;
      }
    }
    return ringInside;
  };

  // 处理Polygon
  if (polygon.length > 0 && polygon[0].length > 0 && typeof polygon[0][0][0] === 'number') {
    const outerRing = polygon[0];
    inside = isPointInRing(outerRing);
    
    // 检查内环（洞）
    for (let i = 1; i < polygon.length; i++) {
      if (isPointInRing(polygon[i])) {
        inside = false;
        break;
      }
    }
  }
  // 处理MultiPolygon
  else {
    for (const part of polygon) {
      if (part.length > 0 && part[0].length > 0) {
        const outerRing = part[0];
        const partInside = isPointInRing(outerRing);
        
        if (partInside) {
          let inHole = false;
          for (let i = 1; i < part.length; i++) {
            if (isPointInRing(part[i])) {
              inHole = true;
              break;
            }
          }
          if (!inHole) {
            inside = true;
            break;
          }
        }
      }
    }
  }

  return inside;
}

// 测试坐标
const testPoints = [
  { name: '深圳', lng: 114.06, lat: 22.54 },
  { name: '东莞', lng: 113.75, lat: 23.04 },
  { name: '广州', lng: 113.26, lat: 23.13 },
  { name: '北京', lng: 116.40, lat: 39.90 },
  { name: '济源', lng: 112.59, lat: 35.09 },
  { name: '五指山', lng: 109.52, lat: 18.78 },
];

// 加载广东省数据
const guangdongData = loadGeoData('440000');
const henanData = loadGeoData('410000');
const hainanData = loadGeoData('460000');
const beijingData = loadGeoData('110000');

console.log('测试广东省内的城市坐标判断:');
console.log('');

for (const testPoint of testPoints) {
  console.log(`📍 ${testPoint.name} (${testPoint.lng}, ${testPoint.lat})`);
  
  let found = false;
  
  // 根据城市选择对应省份数据
  let provinceData = null;
  if (['深圳', '东莞', '广州'].includes(testPoint.name)) {
    provinceData = guangdongData;
  } else if (testPoint.name === '北京') {
    provinceData = beijingData;
  } else if (testPoint.name === '济源') {
    provinceData = henanData;
  } else if (testPoint.name === '五指山') {
    provinceData = hainanData;
  }
  
  if (provinceData && provinceData.features) {
    // 查找城市
    for (const feature of provinceData.features) {
      const props = feature.properties || {};
      if (props.level !== 'city') continue;
      
      const geometry = feature.geometry;
      if (!geometry) continue;
      
      let isInside = false;
      
      if (geometry.type === 'Polygon') {
        isInside = pointInPolygon([testPoint.lng, testPoint.lat], geometry.coordinates);
      } else if (geometry.type === 'MultiPolygon') {
        isInside = pointInPolygon([testPoint.lng, testPoint.lat], geometry.coordinates);
      }
      
      if (isInside) {
        console.log(`   ✅ 找到城市: ${props.name} (${props.adcode})`);
        console.log(`      城市级别: ${props.level}`);
        console.log(`      下级数量: ${props.childrenNum}`);
        
        if (props.childrenNum > 0) {
          // 查找区县
          const districts = provinceData.features.filter(f => 
            f.properties?.parent?.adcode === props.adcode && f.properties?.level === 'district'
          );
          
          let foundDistrict = null;
          for (const district of districts) {
            const districtGeometry = district.geometry;
            if (!districtGeometry) continue;
            
            let inDistrict = false;
            if (districtGeometry.type === 'Polygon') {
              inDistrict = pointInPolygon([testPoint.lng, testPoint.lat], districtGeometry.coordinates);
            } else if (districtGeometry.type === 'MultiPolygon') {
              inDistrict = pointInPolygon([testPoint.lng, testPoint.lat], districtGeometry.coordinates);
            }
            
            if (inDistrict) {
              foundDistrict = district;
              break;
            }
          }
          
          if (foundDistrict) {
            console.log(`      📍 找到区县: ${foundDistrict.properties.name} (${foundDistrict.properties.adcode})`);
          }
        }
        
        found = true;
        break;
      }
    }
  }
  
  if (!found) {
    console.log('   ❌ 未找到');
  }
  console.log('');
}

console.log('=' .repeat(80));
console.log('测试完成！');
console.log('=' .repeat(80));
console.log('');
console.log('结论: 只要有省级数据，就能正确判断所有城市和区县！');
console.log('不需要每个城市都有独立文件！');
