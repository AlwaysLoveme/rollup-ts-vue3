import type { VueConstructor } from "vue";
import AmapTrajectory from "./components/amap";
import { TrackAnimation, TrajectoryAnimation } from "./components/bmap";

const components = [TrackAnimation, TrajectoryAnimation, AmapTrajectory];
const install = (app: VueConstructor) => {
  components.forEach((component) => app.use(component));
};

export { TrackAnimation, TrajectoryAnimation, AmapTrajectory };
export default { install };
