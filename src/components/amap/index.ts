import AmapTrajectory from "./index.vue";

AmapTrajectory.install = (app) =>
  app.component(AmapTrajectory.name, AmapTrajectory);

if (typeof window !== "undefined" && window.Vue) {
  AmapTrajectory.install(window.Vue);
}

export default AmapTrajectory;
