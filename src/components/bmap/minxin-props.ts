import { PropType } from "vue";

export interface LngLat {
  lng: string;
  lat: string;
}

export default {
  ak: {
    type: String,
    default: "",
  },
  // 是否允许https
  https: {
    type: Boolean,
    default: true,
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
    default(this: void) {
      return {
        lng: "",
        lat: "",
      };
    },
  },
  // 轨迹动画点集合
  path: {
    type: Array as PropType<LngLat[]>,
    default(this: void) {
      return [];
    },
  },
};
