import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ArticleView from "@/views/ArticleView.vue";
import AuthView from "@/views/AuthView.vue";
import { useUserStore } from "@/stores/userStores";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/articles",
    name: "articles",
    component: ArticleView,
  },
  {
    path: "/auth",
    name: "authentification",
    component: AuthView,
    // l'user doit ne pas être connecté pour y accèder
    meta: { requiresGuest: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  // obligé d'ajouter cette condition, sinon on peux aller sur /auth par l'url
  if (!userStore.user) {
    await userStore.fetchUser();
  }

  // vérifie si la route nécessite que l'user soit pas connecté
  if (
    to.matched.some((record) => record.meta.requiresGuest) &&
    userStore.isAuthenticated
  ) {
    next("/");
  } else {
    next();
  }
});

export default router;
