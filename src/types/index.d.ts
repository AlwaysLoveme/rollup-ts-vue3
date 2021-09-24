declare module "*.vue" {
  import type { DefineComponent, App } from "vue";
  const component: DefineComponent & {
    install(app: App): App;
  };
  export default component;
}
interface Window {
  Vue: any;
}
