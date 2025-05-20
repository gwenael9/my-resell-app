import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import { createPinia } from "pinia";
import "./index.css";
import Antd from "ant-design-vue";
import { notification } from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import { trackClick } from "./services/analytics";

const app = createApp(App);

// store
const pinia = createPinia();

notification.config({
  placement: "bottomRight",
  duration: 3,
});

// Ajout d'un écouteur global pour tous les clics
document.addEventListener("click", (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const elementId =
    target.id || target.getAttribute("data-track-id") || "unknown-element";

  // Récupération du chemin complet de l'élément dans le DOM
  const path = [];
  let currentElement: HTMLElement | null = target;
  while (currentElement && currentElement !== document.body) {
    const tagName = currentElement.tagName.toLowerCase();
    const id = currentElement.id ? `#${currentElement.id}` : "";
    const classes = Array.from(currentElement.classList)
      .map((c) => `.${c}`)
      .join("");
    path.unshift(`${tagName}${id}${classes}`);
    currentElement = currentElement.parentElement;
  }

  trackClick(elementId, {
    target: target.tagName,
    text: target.textContent?.trim(),
    path: path.join(" > "),
    x: event.clientX,
    y: event.clientY,
    timestamp: new Date().toISOString(),
  });
});

app.use(pinia);
app.use(Antd);
app.use(router);

app.mount("#app");
