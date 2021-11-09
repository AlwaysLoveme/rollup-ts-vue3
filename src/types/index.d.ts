declare module "*.png";
declare module "*.jpg";
declare module "*.svg";
declare module "*.vue" {
  import { VueConstructor } from "vue";
  const component: VueConstructor & {
    install(app: VueConstructor): void;
  };
  export default component;
}
interface Window {
  Vue: any;
  BMapGL: any;
  BMapGLLib: any;
  AMap: any;
}
