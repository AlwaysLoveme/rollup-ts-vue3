<template>
  <div>
    <AmapTrajectory
      ref="amap"
      :showMap="false"
      amapKey="c29e4b70537d93499ad99f11c305bae2"
      @getMap="getAMap"
      v-show="false"
    />
    <router-link to="/">home</router-link>

    <div ref="map" style="width: 500px;height: 300px"></div>
  </div>
</template>

<script lang="ts">
import { AmapTrajectory } from "../../lib";

export default {
  components: {
    AmapTrajectory
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    getAMap(AMap: any) {
      const map = new AMap.Map(this.$refs.map, {
        resizeEnable: true,
        center: [116.480983, 39.989628],
        zoom: 11,
        mapStyle: 'amap://styles/grey', // 极夜蓝
        //自定义地图样式：https://lbs.amap.com/dev/mapstyle/index
      });
    }
  },
}
</script>

<style lang="scss" scoped>
</style>