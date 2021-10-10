import HelloWord from "./index.vue";

HelloWord.install = (app) => app.component(HelloWord.name, HelloWord);

if (typeof window !== "undefined" && window.Vue) {
  HelloWord.install(window.Vue);
}

export default HelloWord;
