<template>
  <div id="app">
    <router-link to="/about">about</router-link>
    <h2>高德地图实例：</h2>
    <AmapTrajectory
      ref="amap"
      :path="path"
      showMarkerText
      :center="{
        lng: '116.297611',
        lat: '40.047363',
      }"
      :markerTextOffset="[-110, -170]"
      @ready="mapReady"
      @getMap="getAMap"
      @markerTextMoving="markerTextMoving"
      amapKey="c29e4b70537d93499ad99f11c305bae2"
    />
    <button @click="start">开始</button>
    <button @click="pause">暂停</button>
    <button @click="resume">恢复</button>
    <button @click="stop">停止</button>

    <!-- <div>
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
    </div> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AmapTrajectory, TrajectoryAnimation } from "../../lib";

export default Vue.extend({
  name: "App",
  components: {
    AmapTrajectory
    // TrajectoryAnimation,
  },
  data() {
    return {
      trackInstance: null,
      path: [
        {
          lng: 116.478935,
          lat: 39.997761,
          speed: 10,
          time: "2020-12-12 07:37:23"
        },
        {
          lng: 116.478939,
          lat: 39.997825,
          speed: 11,
          time: "2020-12-12 07:39:23"
        },

        {
          lng: 116.478939,
          lat: 39.997825,
          speed: 11,
          time: "2020-12-12 07:40:00"
        },
        {
          lng: 116.478939,
          lat: 39.997825,
          speed: 11,
          time: "2020-12-12 07:41:08"
        },
        {
          lng: 116.478939,
          lat: 39.997825,
          speed: 11,
          time: "2020-12-12 07:43:55"
        },


        {
          lng: 116.478912,
          lat: 39.998549,
          speed: 12,
          time: "2020-12-12 07:42:23"
        },
        {
          lng: 116.478912,
          lat: 39.998549,
          speed: 10,
          time: "2020-12-12 07:43:23"
        },
        {
          lng: 116.478998,
          lat: 39.998555,
          speed: 12,
          time: "2020-12-12 07:45:23"
        },
        {
          lng: 116.478998,
          lat: 39.998555,
          speed: 12,
          time: "2020-12-12 07:47:23"
        },
        {
          lng: 116.479282,
          lat: 39.99856,
          speed: 13,
          time: "2020-12-12 07:49:23"
        },

        {
          lng: 116.479658,
          lat: 39.998528,
          speed: 14,
          time: "2020-12-12 08:34:23"
        },
        {
          lng: 116.480151,
          lat: 39.998453,
          speed: 13,
          time: "2020-12-12 08:37:23"
        },
        {
          lng: 116.480784,
          lat: 39.998302,
          speed: 10,
          time: "2020-12-12 08:38:23"
        },
        {
          lng: 116.480784,
          lat: 39.998302,
          speed: 10,
          time: "2020-12-12 08:39:53"
        },
        {
          lng: 116.481149,
          lat: 39.998184,
          speed: 10,
          time: "2020-12-12 08:40:03"
        },

        {
          lng: 116.481573,
          lat: 39.997997,
          speed: 15,
          time: "2020-12-12 08:41:00"
        },
        {
          lng: 116.481863,
          lat: 39.997846,
          speed: 16,
          time: "2020-12-12 08:43:03"
        },
        {
          lng: 116.482072,
          lat: 39.997718,
          speed: 14,
          time: "2020-12-12 08:45:23"
        },
        {
          lng: 116.482362,
          lat: 39.997718,
          speed: 13,
          time: "2020-12-12 08:50:23"
        },
        {
          lng: 116.483633,
          lat: 39.998935,
          speed: 10,
          time: "2020-12-12 08:52:23"
        },
        {
          lng: 116.48367,
          lat: 39.998968,
          speed: 10,
          time: "2020-12-12 08:53:23"
        },
        {
          lng: 116.484648,
          lat: 39.999861,
          speed: 17,
          time: "2020-12-12 08:54:23"
        },

        {
          lng: 116.485648,
          lat: 39.999961,
          speed: 50,
          time: "2020-12-12 08:55:23"
        }
      ],
      oldPathInfo: {
        time: '',
        speed: '',
      } as any,
      bmapPath: [
        {
          lng: 116.297611,
          lat: 40.047363
        },
        {
          lng: 116.302839,
          lat: 40.048219
        },
        {
          lng: 116.308301,
          lat: 40.050566
        },
        {
          lng: 116.305732,
          lat: 40.054957
        },
        {
          lng: 116.304754,
          lat: 40.057953
        },
        {
          lng: 116.306487,
          lat: 40.058312
        },
        {
          lng: 116.307223,
          lat: 40.056379
        }
      ]
    };
  },
  methods: {
    mapReady(AMap: any, AMapGL: any, AMapGLLib: any, trackAni: any) {

      // console.log(trackAni);
      // console.log(BMap);

      // 定位当前位置
      // var geolocation = new BMapGL.Geolocation();
      // geolocation.getCurrentPosition(function (this: any, r: any) {
      //   if (this.getStatus() === 0) {
      //     var mk = new BMapGL.Marker(r.point);
      //     BMap.addOverlay(mk);
      //     BMap.panTo(r.point);
      //   } else {
      //     alert("failed" + this.getStatus());
      //   }
      // });
    },
    markerTextMoving({ value }: any) {
      const lng = value.pos.lng;
      const lat = value.pos.lat;
      let pathInfo = this.oldPathInfo;
      (this.path as any).forEach((item: any) => {
        if (item.lng === lng && item.lat === lat) {
          pathInfo = {
            time: item.time,
            speed: item.speed,
          }
        }
      });
      this.oldPathInfo = pathInfo;
      (this.$refs.amap as any).markerText.setContent(`
        <div class="marker-text">
          <p class="text-item">时间：${pathInfo.time}</p>
          <p class="text-item">速度：${pathInfo.speed || 0}kw/h</p>
          <p class="text-item">经度：${value.pos.lng}</p>
          <p class="text-item">纬度：${value.pos.lat}</p>
        </div>
      `);
    },
    start() {
      (this.$refs.amap as any).startAnimation();
    },
    pause() {
      (this.$refs.amap as any).pauseAnimation();
    },
    resume(){
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

    getAMap(AMap: any) {
      console.log(AMap);
    }
  }
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

.marker-text {
  position: relative;
  width: 200px;
  padding: 10px;
  border-radius: 5px;
  background: red;
  text-align: left;
  color: #fff;

  &:after {
    content: "";
    position: absolute;
    bottom: -20px;
    z-index: 30;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top: red 10px solid;
  }

  p {
    margin: 5px 0;
  }
}
</style>
