### 百度地图轨迹动画 GL -- Vue2.0 组件

#### 安装

```bash
npm install vue-js-track-map -S
```

#### 引入

```js
import Vue from "vue";
import { BMap } from "vue-js-track-map";

// 全局组件
Vue.component(BMap.name, BMap);

// 局部组件
<template>
  <BMap @ready="mapReady" ak="XXXXXXX" />
</template>
<script>
  export default {
    name: 'demo',
    components: {
      BMap
    },
    methods: {
      mapReady(mapInstance, BMapGL, BMapGLLib) {
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
      <td>ak</td>
      <td>百度地图服务密钥</td>
      <td>string</td>
      <td align="center">-</td>
      <td align="center">-</td>
    </tr>
    <tr>
      <td>https</td>
      <td>是否允许加载https文件</td>
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
      <td>trackOptions</td>
      <td>轨迹运行配置项</td>
      <td align="center">Object</td>
      <td align="center">
      详见：https://lbsyun.baidu.com/index.php?title=jspopularGL/guide/trackAnimation
      </td>
      <td align="center">[]</td>
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
      <td>ready</td>
      <td>地图加载完成的回调函数</td>
      <td>void</td>
      <td align="left">
        function(Bmap, BMapGL, BMapGLLib)...
        <br />
        Bmap: 地图实例
        <br />
        BMapGL: window.BMapGL
        <br />
        BMapGLLib: window.BMapGLLib
      </td>
    </tr>
    <tr>
      <td>https</td>
      <td>是否允许加载https文件</td>
      <td>boolean</td>
      <td align="center">true/false</td>
    </tr>
    <tr>
      <td>width</td>
      <td>地图宽度</td>
      <td align="center">string</td>
      <td align="center">-</td>
    </tr>
    <tr>
      <td>height</td>
      <td>地图高度</td>
      <td align="center">string</td>
      <td align="center">-</td>
    </tr>
  </tbody>
</table>

#### 轨迹动画开始、暂停、继续
```js
<template>
  <div>
    <BMap ref="map" @ready="mapReady" ak="XXXXXXX" />
    <div>
      <button @click="start">开始</button>
      <button @click="pause">暂停</button>
      <button @click="goon">继续</button>
    </div>
  </div>
</template>
<script>
  import { BMap } from "vue-js-track-map";
  export default {
    name: 'demo',
    components: {
      BMap
    },
    methods: {
      mapReady(mapInstance, BMapGL, BMapGLLib) {
        console.log(mapInstance);
      },
      // 开始
      start() {
        this.$refs.bmap.startTrackAnimation();
      },
      // 暂停
      pause() {
        this.$refs.bmap.pauseTrackAnimation();
      },
      // 继续
      goon() {
        this.$refs.bmap.continueTrackAnimation();
      }
    }
  }
</script>
```