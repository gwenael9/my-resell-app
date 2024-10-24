import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import "./index.css";
import { createPinia } from "pinia";
import Toast, { PluginOptions, POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);

// store
const pinia = createPinia();

// toast
const options: PluginOptions = {
  position: POSITION.BOTTOM_RIGHT,
};

app.use(pinia);
app.use(router);
app.use(Toast, options);

app.mount("#app");
