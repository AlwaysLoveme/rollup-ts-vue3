import type { App } from "vue";
import HelloWorld from "./components/helloworld";

const components = [HelloWorld];
const install = (app: App): App => {
  components.forEach((component) => app.use(component));
  return app;
};

export { HelloWorld };
export default { install };
