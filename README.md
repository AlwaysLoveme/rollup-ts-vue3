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