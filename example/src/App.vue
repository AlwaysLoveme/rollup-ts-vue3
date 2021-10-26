<template>
  <div id="app">
    <h2>高德地图实例：</h2>
    <AmapTrajectory
      ref="amap"
      @ready="mapReady"
      :path="path"
      :center="{
        lng: '116.297611',
        lat: '40.047363',
      }"
      amapKey="c29e4b70537d93499ad99f11c305bae2"
    />
    <button @click="start">开始</button>
    <button @click="pause">暂停</button>
    <button @click="stop">停止</button>

    <div>
      <h2>百度地图实例：</h2>
      <TrajectoryAnimation
        ref="bmap"
        :path="bmapPath"
        @ready="bmapReady"
        :center="{
          lng: '116.297611',
          lat: '40.047363',
        }"
        ak="pb3Uk089jFIaoCTjIdSftOmk61j6l3cV"
      />
      <button @click="bmapStart">开始</button>
      <button @click="bmapPause">暂停</button>
      <button @click="bmapStop">停止</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AmapTrajectory, TrajectoryAnimation } from "../../lib";

export default Vue.extend({
  name: "App",
  components: {
    AmapTrajectory,
    TrajectoryAnimation,
  },
  data() {
    return {
      trackInstance: null,
      path: [
        {
          lng: 116.478935,
          lat: 39.997761,
        },
        {
          lng: 116.478939,
          lat: 39.997825,
        },
        {
          lng: 116.478912,
          lat: 39.998549,
        },
        {
          lng: 116.478912,
          lat: 39.998549,
        },
        {
          lng: 116.478998,
          lat: 39.998555,
        },
        {
          lng: 116.478998,
          lat: 39.998555,
        },
        {
          lng: 116.479282,
          lat: 39.99856,
        },

        {
          lng: 116.479658,
          lat: 39.998528,
        },
        {
          lng: 116.480151,
          lat: 39.998453,
        },
        {
          lng: 116.480784,
          lat: 39.998302,
        },
        {
          lng: 116.480784,
          lat: 39.998302,
        },
        {
          lng: 116.481149,
          lat: 39.998184,
        },

        {
          lng: 116.481573,
          lat: 39.997997,
        },
        {
          lng: 116.481863,
          lat: 39.997846,
        },
        {
          lng: 116.482072,
          lat: 39.997718,
        },
        {
          lng: 116.482362,
          lat: 39.997718,
        },
        {
          lng: 116.483633,
          lat: 39.998935,
        },
        {
          lng: 116.48367,
          lat: 39.998968,
        },
        {
          lng: 116.484648,
          lat: 39.999861,
        },

        {
          lng: 116.485648,
          lat: 39.999961,
        },
      ],
      bmapPath: [
        {
          lng: 116.297611,
          lat: 40.047363,
        },
        {
          lng: 116.302839,
          lat: 40.048219,
        },
        {
          lng: 116.308301,
          lat: 40.050566,
        },
        {
          lng: 116.305732,
          lat: 40.054957,
        },
        {
          lng: 116.304754,
          lat: 40.057953,
        },
        {
          lng: 116.306487,
          lat: 40.058312,
        },
        {
          lng: 116.307223,
          lat: 40.056379,
        },
      ],
    };
  },
  methods: {
    mapReady(BMap: any, BMapGL: any, BMapGLLib: any, trackAni: any) {
      // console.log(trackAni);
      // 定位当前位置
      var geolocation = new BMapGL.Geolocation();
      geolocation.getCurrentPosition(function (this: any, r: any) {
        if (this.getStatus() === 0) {
          var mk = new BMapGL.Marker(r.point);
          BMap.addOverlay(mk);
          BMap.panTo(r.point);
        } else {
          alert("failed" + this.getStatus());
        }
      });
    },
    start() {
      (this.$refs.amap as any).startAnimation();
    },
    pause() {
      (this.$refs.amap as any).resumeAnimation();
    },
    stop() {
      (this.$refs.amap as any).stopAnimation();
    },

    bmapReady(bmap: any) {
      console.log("实例：", bmap);
    },
    bmapStart() {
      (this.$refs.bmap as any).startTrackAnimation();
    },
    bmapPause() {
      (this.$refs.bmap as any).pauseTrackAnimation();
    },
    bmapStop() {
      (this.$refs.bmap as any).stopTrackAnimation();
    },
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
