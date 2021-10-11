<template>
  <div id="amap" ref="amap" :style="{ width: width, height: height }"></div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import "./index.scss";
import AMapLoader from "@amap/amap-jsapi-loader";
import MarkerIcon from "../../assets/amap-car.png";

interface PolyLineOptions {
  showDir?: boolean;
  strokeColor?: string;
  strokeWeight?: number;
  strokeOpacity?: number;
  strokeStyle?: string;
}
export default Vue.extend({
  name: "AmapTrajectory",
  props: {
    amapKey: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "800px",
    },
    height: {
      type: String,
      default: "400px",
    },
    center: {
      type: Object as PropType<LngLat>,
      default() {
        return {
          lng: "",
          lat: "",
        };
      },
    },
    mapZoom: {
      type: Number,
      default: 17,
    },
    markerIcon: {
      type: String,
      default: MarkerIcon,
    },
    markerIconLabel: {
      type: String,
      default: "",
    },
    markerIconWidth: {
      type: Number,
      default: 13,
    },
    markerIconHeight: {
      type: Number,
      default: 26,
    },
    path: {
      type: Array as PropType<LngLat[]>,
      default() {
        return [];
      },
    },
    // 是否显示路线
    showPolyLine: {
      type: Boolean,
      default: false,
    },
    polyLineOptions: {
      type: Object as PropType<PolyLineOptions>,
      default() {
        return {
          showDir: true,
          strokeColor: "#28F", //线颜色
          strokeOpacity: 1, //线透明度
          strokeWeight: 6, //线宽
          strokeStyle: "dashed", //线样式
          lineCap: "round",
          geodesic: true,
        };
      },
    },
    passedPolylineOptions: {
      type: Object as PropType<PolyLineOptions>,
      default() {
        return {
          showDir: true,
          strokeColor: "red", //线颜色
          strokeOpacity: 1, //线透明度
          strokeWeight: 6, //线宽
          strokeStyle: "dashed", //线样式
          lineCap: "round",
          geodesic: true,
        };
      },
    },
  },
  data() {
    return {
      amap: null as any,
      marker: null as any,
      polyline: null as any,
      passedPolylines: null as any,
    };
  },
  mounted() {
    this.loadMap();
  },
  methods: {
    loadMap() {
      AMapLoader.load({
        key: this.amapKey, // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.MoveAnimation"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
        .then(async (AMap) => {
          this.amap = new AMap.Map(this.$refs.amap, {
            resizeEnable: true,
            center: [this.center.lng, this.center.lat],
            zoom: this.mapZoom,
          });
          AMap.plugin("AMap.MoveAnimation", () => {
            this.createMarker(AMap);
            this.polyLine(AMap);
            this.passedPolyline(AMap);

            this.marker.on("moving", (e: any) => {
              this.passedPolylines.setPath(e.passedPath);
              this.amap.setCenter(e.target.getPosition(), true);
            });
            this.amap.setFitView();
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    handlerPath() {
      const { path } = this;
      return path.map((item) => [item.lng, item.lat]);
      // return this.testPath;
    },
    async polyLine(AMap: any) {
      this.polyline = new AMap.Polyline({
        map: this.amap,
        path: this.handlerPath(),
        ...this.polyLineOptions,
        lineJoin: "round",
        strokeDasharray: [0, 0, 0],
      });
      return this.polyLine;
    },
    passedPolyline(AMap: any) {
      this.passedPolylines = new AMap.Polyline({
        map: this.amap,
        ...this.passedPolylineOptions,
        lineJoin: "round",
        strokeDasharray: [0, 0, 0],
      });
    },
    createMarker(AMap: any) {
      const iconSize = new AMap.Size(
        this.markerIconWidth,
        this.markerIconHeight
      );
      const icon = new AMap.Icon({
        size: iconSize, // 图标尺寸
        image: this.markerIcon, // Icon的图像
        imageSize: iconSize, // 根据所设置的大小拉伸或压缩图片
      });
      this.marker = new AMap.Marker({
        icon,
        map: this.amap,
        position: this.handlerPath()[0],
        offset: new AMap.Pixel(
          -this.markerIconWidth,
          -(this.markerIconHeight / 2)
        ),
        label: {
          direction: "top",
          content: this.markerIconLabel,
          offset: new AMap.Pixel(0, 5),
        },
      });
    },
    startAnimation() {
      this.marker.moveAlong(this.handlerPath(), {
        // 每一段的时长
        duration: 800, //可根据实际采集时间间隔设置
        // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
        autoRotation: true,
      });
    },
    pauseAnimation() {
      this.marker.pauseMove();
    },
    resumeAnimation() {
      this.marker.resumeMove();
    },
    stopAnimation() {
      this.marker.stopMove();
    },
  },
});
</script>
