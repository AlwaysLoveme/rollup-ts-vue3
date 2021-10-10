import type { VueConstructor } from "vue";
import BMap from "./components/bmap";

const components = [BMap];
const install = (app: VueConstructor) => {
  components.forEach((component) => app.use(component));
};

export { BMap };
export default { install };
