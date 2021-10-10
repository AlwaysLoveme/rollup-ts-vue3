import TrajectoryAnimation from "./lushu/index.vue";
import TrackAnimation from "./trackAnimation/index.vue";

const components = [TrajectoryAnimation, TrackAnimation];

components.forEach((component) => {
  component.install = (app) => app.component(component.name, component);
  if (typeof window !== "undefined" && window.Vue) {
    component.install(window.Vue);
  }
});

export { TrajectoryAnimation, TrackAnimation };
