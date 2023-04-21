import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const mount = (el: any) => {
  const app = createApp(App);
  app.use(router);
  app.mount(el);
};

export { mount };
