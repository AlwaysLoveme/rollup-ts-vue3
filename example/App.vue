<template>
  <HelloWorld msg="hello, Vue3" />
</template>

<script>
import { HelloWorld } from "../lib";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  setup() {
    return {};
  },
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  padding: 30%;
}
</style>
