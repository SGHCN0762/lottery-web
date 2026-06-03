<template>
  <div class="map-canvas">
    <div ref="mapTarget" class="map-target"></div>
    <MapZoom class="zoom-controls" :zoom-in="handleZoomIn" :zoom-out="handleZoomOut" />
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import MapZoom from './MapZoom.vue';
  import { wgs84ToGcj02  } from '@/utils/crood.js';

  const emit = defineEmits(['click', 'dblclick']);

  const mapTarget = ref(null);
  let mapInstance = null;
  let vectorLayer = null;
  let olModules = null;

  const handleZoomIn = () => {
    if (mapInstance) {
      const view = mapInstance.getView();
      const zoom = view.getZoom();
      view.animate({
        zoom: zoom + 1,
        duration: 250,
      });
    }
  };

  const handleZoomOut = () => {
    if (mapInstance) {
      const view = mapInstance.getView();
      const zoom = view.getZoom();
      view.animate({
        zoom: zoom - 1,
        duration: 250,
      });
    }
  };

  const loadOlModules = async () => {
    if (olModules) return olModules;

    await import('ol/ol.css');

    const [
      { default: Map },
      { default: View },
      { Vector: VectorLayer, Tile: TileLayer },
      { Vector: VectorSource, XYZ: XYZSource },
      { GeoJSON },
      { Style, Fill, Stroke, Circle: CircleStyle },
      { defaults: defaultControls },
      { fromLonLat, toLonLat },
      { Point },
      { default: Geolocation },
      { default: Feature },
    ] = await Promise.all([
      import('ol/Map'),
      import('ol/View'),
      import('ol/layer'),
      import('ol/source'),
      import('ol/format'),
      import('ol/style'),
      import('ol/control'),
      import('ol/proj'),
      import('ol/geom'),
      import('ol/Geolocation'),
      import('ol/Feature'),
    ]);

    olModules = {
      Map,
      View,
      VectorLayer,
      VectorSource,
      TileLayer,
      XYZSource,
      GeoJSON,
      Style,
      Fill,
      Stroke,
      CircleStyle,
      defaultControls,
      fromLonLat,
      toLonLat,
      Point,
      Geolocation,
      Feature,
    };

    return olModules;
  };

  const handleMapClick = async event => {};

  const handleMapDoubleClick = event => {};

  // 创建地图视图
  const createView = modules => {
    // 高德地图使用EPSG:3857（Web Mercator）投影
    return new modules.View({
      projection: 'EPSG:3857',
      zoom: 4,
    });
  };

  // 创建基础地图实例
  const createBaseMap = ({ modules, target, view } = {}) => {
    return new modules.Map({
      target: target,
      controls: modules.defaultControls({
        attribution: false,
        zoom: false,
      }),
      layers: [
        new modules.TileLayer({
          source: new modules.XYZSource({
            url: 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
            // 可选：设置跨域
            crossOrigin: 'anonymous',
          }),
        }),
      ],
      view,
    });
  };

  // 创建定位精度要素
  const createAccuracyFeature = ({ geolocation, modules } = {}) => {
    const accuracyFeature = new modules.Feature();
    geolocation.on('change:accuracyGeometry', function () {
      accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
    });
    return accuracyFeature;
  };

  // 创建定位点要素
  const createPositionFeature = ({ modules } = {}) => {
    const positionFeature = new modules.Feature();
    positionFeature.setStyle(
      new modules.Style({
        image: new modules.CircleStyle({
          radius: 6,
          fill: new modules.Fill({
            color: '#3399CC',
          }),
          stroke: new modules.Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
      })
    );
    return positionFeature;
  };

  // 设置定位事件监听
  const setupGeolocationListener = ({ modules, geolocation, positionFeature, view } = {}) => {
    let hasLocated = false;
    geolocation.on('change:position', function () {
      const coordinates = geolocation.getPosition();
      if (coordinates) {
        // 1. WGS84坐标 -> GCJ02坐标（纠偏）
        const gcj02Coord = wgs84ToGcj02(coordinates[0], coordinates[1]);
        // 2. GCJ02坐标 -> EPSG:3857（Web Mercator）
        const webMercatorCoord = modules.fromLonLat(gcj02Coord);
        
        positionFeature.setGeometry(new modules.Point(webMercatorCoord));

        // 仅在首次定位时缩放到定位点，后续位置更新不再强制缩放，避免覆盖用户操作
        if (!hasLocated) {
          view.animate({
            center: webMercatorCoord,
            zoom: 17,
            duration: 1000,
          });
          hasLocated = true;
        }
      } else {
        positionFeature.setGeometry(null);
      }
    });
  };

  // 初始化地理定位
  const initGeolocation = ({ modules, view } = {}) => {
    const geolocation = new modules.Geolocation({
      trackingOptions: {
        enableHighAccuracy: true,
      },
      // 接收原始WGS84坐标
      projection: 'EPSG:4326',
      tracking: true, // 开启位置追踪
    });

    const accuracyFeature = createAccuracyFeature({ geolocation, modules });
    const positionFeature = createPositionFeature({ modules });
    setupGeolocationListener({ modules, geolocation, positionFeature, view });

    return { geolocation, accuracyFeature, positionFeature };
  };

  // 创建矢量图层
  const createVectorLayer = ({ modules, features } = {}) => {
    return new modules.VectorLayer({
      source: new modules.VectorSource({
        features: features,
      }),
    });
  };

  // 初始化地图
  const initMap = async () => {
    try {
      // 加载地图模块
      const modules = await loadOlModules();

      // 创建地图视图
      const view = createView(modules);

      // 创建基础地图实例
      mapInstance = createBaseMap({ modules, target: mapTarget.value, view });

      // 初始化地理定位功能
      const { accuracyFeature, positionFeature } = initGeolocation({ modules, view });

      // 创建并添加矢量图层
      vectorLayer = createVectorLayer({ modules, features: [accuracyFeature, positionFeature] });
      mapInstance.addLayer(vectorLayer);

      // 监听地图点击事件和双击事件
      mapInstance.on('click', handleMapClick);
      mapInstance.on('dblclick', handleMapDoubleClick);
    } catch (error) {
      console.error('初始化地图失败:', error);
    }
  };

  onMounted(() => {
    requestIdleCallback(() => {
      initMap();
    });
  });

  onUnmounted(() => {
    if (mapInstance) {
      mapInstance.setTarget(null);
      mapInstance = null;
    }
    vectorLayer = null;
    olModules = null;
  });
</script>

<style lang="less" scoped>
  .map-canvas {
    width: 100%;
    height: 100%;
    position: relative;

    .map-target {
      width: 100%;
      height: 100%;
    }

    .zoom-controls {
      position: absolute;
      bottom: var(--spacing-md);
      right: var(--spacing-md);
      z-index: 100;
    }
  }
</style>