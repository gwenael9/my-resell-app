import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import { createPinia } from "pinia";
import "./index.css";
import Antd from "ant-design-vue";
import { notification } from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

const app = createApp(App);

// store
const pinia = createPinia();

notification.config({
  placement: "bottomRight",
  duration: 3,
});

app.use(pinia);
app.use(Antd);
app.use(router);

app.mount("#app");
