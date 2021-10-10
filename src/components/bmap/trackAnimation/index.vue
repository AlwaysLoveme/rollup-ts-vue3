<template>
  <div class="map">
    <div
      id="container"
      ref="container"
      :style="{ width: width, height: height }"
    ></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import "./index.scss";
import LazyLoad from "../../../shared/lazy-load";
import minxinProps, { LngLat } from "../minxin-props";

type BMap = null | any;
export default Vue.extend({
  name: "BMapTrackAnimation",
  props: {
    ...minxinProps,
    trackOptions: {
      type: Object,
      default() {
        return {
          overallView: true, //是否在动画结束后总览视图缩放（调整地图到能看到整个轨迹的视野），默认开启
          tilt: 55, // 设置动画中的地图倾斜角度，默认55度
          duration: 10000, // 动画持续时常，单位ms
          delay: 0, // 动画开始延迟
        };
      },
    },
  },
  data() {
    return {
      trackAni: null as BMap,
      isShow: true,
      bmap: null as BMap,
    };
  },
  mounted() {
    this.loadBmapGl();
  },
  methods: {
    loadBmapGl() {
      const BMapGLLibUrl =
        "https://mapopen.bj.bcebos.com/github/BMapGLLib/TrackAnimation/src/TrackAnimation.min.js";
      const BMapUrl = `${
        this.https ? "https:" : ""
      }//api.map.baidu.com/api?type=webgl&v=1.0&ak=${
        this.ak
      }&callback=initialize`;
      Vue.nextTick(() => {
        LazyLoad.js([BMapUrl, BMapGLLibUrl], () => {
          (window as any).initialize = async () => {
            this.bmap = new window.BMapGL.Map(this.$refs.container);
            this.bmap.centerAndZoom(
              new window.BMapGL.Point(this.center.lng, this.center.lat),
              17
            );
            this.bmap.enableScrollWheelZoom(true);

            if (this.path.length) {
              await this.createTrack(this.path);
            }
            this.$emit(
              "ready",
              this.bmap,
              window.BMapGL,
              window.BMapGLLib,
              this.trackAni
            );
          };
        });
      });
    },
    createTrack(path: LngLat[]) {
      return new Promise((resolve, reject) => {
        try {
          const point = [];
          for (let i = 0; i < path.length; i++) {
            point.push(new window.BMapGL.Point(path[i].lng, path[i].lat));
          }
          const polyline = new window.BMapGL.Polyline(point);
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
      this.trackAni.cancel();
      this.trackAni.start();
    },
    pauseTrackAnimation() {
      this.trackAni.pause();
    },
    continueTrackAnimation() {
      this.trackAni.continue();
    },
  },
});
</script>
