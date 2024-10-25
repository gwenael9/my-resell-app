import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import { createPinia } from "pinia";
import "./index.css";
import Toast, { PluginOptions, POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

const app = createApp(App);

// store
const pinia = createPinia();

// toast
const options: PluginOptions = {
  position: POSITION.BOTTOM_RIGHT,
};

app.use(pinia);
app.use(Antd);
app.use(router);
app.use(Toast, options);

app.mount("#app");
