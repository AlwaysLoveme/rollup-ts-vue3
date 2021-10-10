<template>
  <div id="app">
    <TrajectoryAnimation
      ref="bmap"
      @ready="mapReady"
      :path="path"
      :center="{
        lng: '116.297611',
        lat: '40.047363'
      }"
      ak="pb3Uk089jFIaoCTjIdSftOmk61j6l3cV"
    />
    <button @click="start">开始</button>
    <button @click="pause">暂停</button>
    <button @click="stop">停止</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { TrajectoryAnimation } from '../../lib';

export default Vue.extend({
  name: 'App',
  components: {
    TrajectoryAnimation,
  },
  data() {
    return {
      trackInstance: null,
      path: [{
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
      },]
    }
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
      (this.$refs.bmap as any).startTrackAnimation();
    },
    pause() {
      (this.$refs.bmap as any).pauseTrackAnimation();
    },
    stop() {
      (this.$refs.bmap as any).stopTrackAnimation();
    }
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
