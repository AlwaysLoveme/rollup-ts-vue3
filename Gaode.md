### 高德地图轨迹动画
仅支持Vue2.0版本，支持Typescript,不支持Vue3.0，
#### 安装
```bash
npm install vue-js-track-map -S
```
#### 引入

```js
import Vue from "vue";
import { AmapTrajectory } from "vue-js-track-map";

// 全局组件
Vue.component(AmapTrajectory.name, AmapTrajectory);

// 局部组件
<template>
  <AmapTrajectory @ready="mapReady" amapKey="XXXXXXX" />
</template>
<script>
  export default {
    name: 'demo',
    components: {
      AmapTrajectory
    },
    methods: {
      mapReady(mapInstance, AMap) {
        console.log(mapInstance);
      }
    }
  }
</script>
```
#### 属性
<table>
  <theader>
    <tr>
      <th>名称</th>
      <th>释义</th>
      <th>类型</th>
      <th>取值</th>
      <th>默认值</th>
    </tr>
  </theader>
  <tbody>
    <tr>
      <td>amapKey</td>
      <td>高德地图服务密钥</td>
      <td>string</td>
      <td align="center">-</td>
      <td align="center">-</td>
    </tr>
    <tr>
      <td>plugins</td>
      <td>高德地图插件列表</td>
      <td>array</td>
      <td align="center">字符串数组</td>
      <td align="center">[], 默认已经包含AMap.MoveAnimation</td>
    </tr>
    <tr>
      <td>mapZoom</td>
      <td>地图缩放级别</td>
      <td align="center">Number</td>
      <td align="center">-</td>
      <td align="center">17</td>
    </tr>
    <tr>
      <td>showPolyLine</td>
      <td>是否显示轨迹路线，非动画已经过的</td>
      <td>boolean</td>
      <td align="center">true/false</td>
      <td align="center">true</td>
    </tr>
    <tr>
      <td>width</td>
      <td>地图宽度</td>
      <td align="center">string</td>
      <td align="center">-</td>
      <td align="center">800px</td>
    </tr>
    <tr>
      <td>height</td>
      <td>地图高度</td>
      <td align="center">string</td>
      <td align="center">-</td>
      <td align="center">400px</td>
    </tr>
    <tr>
      <td>path</td>
      <td>轨迹数组集合</td>
      <td align="center">Array</td>
      <td align="center">[ { lng: '', lat: '' } ]</td>
      <td align="center">[]</td>
    </tr>
    <tr>
      <td>markerIcon</td>
      <td>图标路径</td>
      <td align="center">String</td>
      <td align="center">*.png/*.jpg/*.svg</td>
      <td align="center">-</td>
    </tr>
    <tr>
      <td>markerIconWidth</td>
      <td>图标宽度</td>
      <td align="center">Number</td>
      <td align="center">-</td>
      <td align="center">26</td>
    </tr>
    <tr>
      <td>markerIconWidth</td>
      <td>图标高度</td>
      <td align="center">Number</td>
      <td align="center">-</td>
      <td align="center">13</td>
    </tr>
    <tr>
      <td>showMarkerText</td>
      <td>是否显示跟随marker的文本框, 默认不显示</td>
      <td align="center">Boolean</td>
      <td align="center">false/true</td>
      <td align="center">false</td>
    </tr>
    <tr>
      <td>markerTextOffset</td>
      <td>跟随marker的文本框的偏移量</td>
      <td align="center">Array<number></td>
      <td align="center">[0,0]; 第一个值表示X轴偏移量，第二个值Y轴偏移量</td>
      <td align="center">[0,0]</td>
    </tr>
    <tr>
      <td>polyLineOptions</td>
      <td>轨迹线配置项</td>
      <td align="center">Object</td>
      <td align="center">-</td>
      <td align="center">
        {
          showDir: true, // 是否显示箭头
          strokeColor: "#28F", //线颜色
          strokeOpacity: 1, //线透明度
          strokeWeight: 6, //线宽
          strokeStyle: "dashed", //线样式
          lineCap: "round",
          geodesic: true,
        }
      </td>
    </tr>
    <tr>
      <td>passedPolylineOptions</td>
      <td>已经过的轨迹线配置项</td>
      <td align="center">Object</td>
      <td align="center">-</td>
      <td align="center">同polyLineOptions</td>
    </tr>
    <tr>
      <td>showMap</td>
      <td>是否显示地图，默认显示，否则不显示地图，此时可以通过getMap钩子函数获取到window.AMap</td>
      <td align="center">Boolean</td>
      <td align="center">true/false</td>
      <td align="center">true</td>
    </tr>
  </tbody>
</table>

#### 事件
<table>
  <theader>
    <tr>
      <th>名称</th>
      <th>释义</th>
      <th>类型</th>
      <th>参数</th>
    </tr>
  </theader>
  <tbody>
    <tr>
      <td>getMap</td>
      <td>获取AMAP，需要设置showMap为false</td>
      <td>void</td>
      <td align="left">
        function(AMap)...
        <br />
        AMap: window.AMap
      </td>
    </tr>
    <tr>
      <td>ready</td>
      <td>地图加载完成的回调函数</td>
      <td>void</td>
      <td align="left">
        function(AmapInstance, AMap)...
        <br />
        AmapInstance: 地图实例
        <br />
        AMap: window.AMap
      </td>
    </tr>
    <tr>
      <td>markerTextMoving</td>
      <td>markerText 移动时的回调函数</td>
      <td>void</td>
      <td align="left">
        function({value})...
        <br />
        value: 移动的marker相关信息
      </td>
    </tr>
  </tbody>
</table>

#### 轨迹动画开始、暂停、继续; 显示/隐藏信息提示框

```js
<template>
  <div>
    <AmapTrajectory ref="map" :markerTextOffset="[-110, -170]" showMarkerText @ready="mapReady" @markerTextMoving="markerTextMoving" amapKey="XXXXXXX" />
    <div>
      <button @click="start">开始</button>
      <button @click="pause">暂停</button>
      <button @click="stop">停止</button>
    </div>
  </div>
</template>
<script>
  import { AmapTrajectory } from "vue-js-track-map";
  export default {
    name: 'demo',
    components: {
      AmapTrajectory
    },
    data(){
      return {
          oldPathInfo: {
              time: '',
              speed: '',
          },
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
      }
    },
    methods: {
      mapReady(mapInstance, AMap) {
        console.log(mapInstance);
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
          this.$refs.map.markerText.setContent(`
                <div class="marker-text">
                  <p class="text-item">时间：${pathInfo.time}</p>
                  <p class="text-item">速度：${pathInfo.speed || 0}kw/h</p>
                  <p class="text-item">经度：${value.pos.lng}</p>
                  <p class="text-item">纬度：${value.pos.lat}</p>
                </div>
          `);
      },
      // 开始
      start() {
        this.$refs.bmap.startAnimation();
      },
      // 暂停
      pause() {
        this.$refs.bmap.pauseAnimation();
      },
      // 停止
      stop() {
        this.$refs.bmap.stopAnimation();
      }
    }
  }
</script>
```
