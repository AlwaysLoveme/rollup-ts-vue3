<template>
  <div id="map" ref="map" :style="{ width: width, height: height }"></div>
</template>

<script lang="ts">
import "./index.scss";
import Vue from "vue";
import minxinProps from "../minxin-props";
import LazyLoad from "@/shared/lazy-load";
import Icon from "@/assets/car.png";

type BMap = null | any;
export default Vue.extend({
  name: "LuShu",
  props: {
    ...minxinProps,
    strokeColor: {
      type: String,
      default: "#409eff",
    },
    icon: {
      type: String,
      default: Icon,
    },
    iconWidth: {
      type: Number,
      default: 26,
    },
    iconHeight: {
      type: Number,
      default: 13,
    },
    iconLabel: {
      type: String,
      default: "",
    },
    iconSpeed: {
      type: Number,
      default: 500,
    },
    centerZoom: {
      type: Number,
      default: 17,
    },
    trackOptions: {
      type: Object,
      default() {
        return {
          overallView: true, //是否在动画结束后总览视图缩放（调整地图到能看到整个轨迹的视野），默认开启
          tilt: 55, // 设置动画中的地图倾斜角度，默认55度
          duration: 10000, // 动画持续时常，单位ms
          delay: 300, // 动画开始延迟
        };
      },
    },
  },
  data() {
    return {
      bmap: null as BMap,
      lushu: null as BMap,
      trackAni: null as BMap,
    };
  },
  mounted() {
    this.loadMap();
  },
  methods: {
    loadMap() {
      const BMapGLLibUrl = `${
        this.https ? "https:" : ""
      }//bj.bcebos.com/v1/mapopen/github/BMapGLLib/Lushu/src/Lushu.min.js`;
      // 轨迹回放依赖
      // const BMapTackAnimationUrl = `${
      //   this.https ? "https:" : ""
      // }//mapopen.bj.bcebos.com/github/BMapGLLib/TrackAnimation/src/TrackAnimation.js`;
      const BMapUrl = `${
        this.https ? "https:" : ""
      }//api.map.baidu.com/api?type=webgl&v=1.0&ak=${
        this.ak
      }&callback=initialize`;
      LazyLoad.js([BMapUrl], () => {
        delete (window as any).initialize;
        (window as any).initialize = async () => {
          this.bmap = new window.BMapGL.Map(this.$refs.map);
          this.bmap.centerAndZoom(
            new window.BMapGL.Point(this.center.lng, this.center.lat),
            this.centerZoom
          );
          this.bmap.enableScrollWheelZoom(true);
          // 加载路书JS
          LazyLoad.js([BMapGLLibUrl], () => {
            if (this.path.length) {
              // 绘制路径
              this.drawPath(this.path);
              // 初始化路书
              this.lushu = new window.BMapGLLib.LuShu(this.bmap, this.path, {
                defaultContent: this.iconLabel, // "信息窗口文案"
                autoView: true, // 是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
                speed: this.iconSpeed,
                icon: new window.BMapGL.Icon(
                  this.icon,
                  new window.BMapGL.Size(this.iconWidth, this.iconHeight),
                  {
                    anchor: new window.BMapGL.Size(
                      this.iconWidth / 2,
                      this.iconHeight / 2
                    ),
                  }
                ),
                enableRotation: true, // 是否设置marker随着道路的走向进行旋转
              });
              this.lushu._addMarker();
            }
            this.$emit("ready", this.bmap, window.BMapGL, window.BMapGLLib);
          });
        };
      });
    },
    drawPath(path: LngLat[]) {
      const polyLine = new window.BMapGL.Polyline(path, {
        strokeColor: this.strokeColor,
      });
      if (this.bmap) {
        this.bmap.addOverlay(polyLine);
        this.bmap.setViewport(path);
      }
    },
    createTrack(path: LngLat[]) {
      return new Promise((resolve, reject) => {
        try {
          const point = [];
          for (let i = 0; i < path.length; i++) {
            point.push(new window.BMapGL.Point(path[i].lng, path[i].lat));
          }
          const polyline = new window.BMapGL.Polyline(point, {
            strokeColor: this.strokeColor,
          });
          this.trackAni = new window.BMapGLLib.TrackAnimation(
            this.bmap,
            polyline,
            this.trackOptions
          );
          resolve(this.trackAni);
        } catch (error) {
          reject(error);
        }
      });
    },
    startTrackAnimation() {
      this.lushu.start();
      // this.trackAni.start();
    },
    pauseTrackAnimation() {
      this.lushu.pause();
      // this.trackAni.pause();
    },
    stopTrackAnimation() {
      this.lushu.stop();
      // this.trackAni.pause();
    },
    //隐藏信息窗口
    showInfoWindow() {
      this.lushu.showInfoWindow();
    },
    //展示信息窗口
    hideInfoWindow() {
      this.lushu.hideInfoWindow();
    },
  },
});
</script>
