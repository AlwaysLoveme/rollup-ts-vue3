import "./helloworld.scss";
import HelloWord from "./helloworld";
import { App, Plugin } from "vue";

const HelloWordComponent = HelloWord as unknown as Plugin;
HelloWordComponent.install = (app: App) =>
  app.component(HelloWord.name, HelloWord);

if (typeof window !== "undefined" && window.Vue) {
  HelloWordComponent.install(window.Vue);
}

export default HelloWordComponent;
