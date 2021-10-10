import type { VueConstructor } from "vue";
import { TrackAnimation, TrajectoryAnimation } from "./components/bmap";

const components = [TrackAnimation, TrajectoryAnimation];
const install = (app: VueConstructor) => {
  components.forEach((component) => app.use(component));
};

export { TrackAnimation, TrajectoryAnimation };
export default { install };
