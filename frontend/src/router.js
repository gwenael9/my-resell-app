import { createRouter, createWebHistory } from "vue-router";
import Articles from "./pages/Articles.vue";
import Accueil from "./pages/Accueil.vue";
import Panier from "./pages/Panier.vue";
import Ajouter from "./pages/Ajouter.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Accueil",
            component: Accueil
        },
        {
            path: "/articles",
            name: "Articles",
            component: Articles
        },
        {
            path: "/panier",
            name: "Panier",
            component: Panier
        },
        {
            path: "/ajouter",
            name: "Ajouter",
            component: Ajouter
        }
    ]
});

export default router;