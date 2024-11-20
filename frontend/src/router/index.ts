import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ArticlesView from "@/views/ArticlesView.vue";
import AccountView from "@/views/AccountView.vue";
import ArticleView from "@/views/ArticleView.vue";
import { useUserStore } from "@/stores/userStores";
import BagView from "@/views/BagView.vue";
import AjouterView from "@/views/AjouterView.vue";
import FacturesView from "@/views/FacturesView.vue";
import FactureView from "@/views/FactureView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/articles",
    component: ArticlesView,
  },
  {
    path: "/articles/:id",
    component: ArticleView,
  },
  {
    path: "/panier",
    component: BagView,
    meta: { requiresAuth: true },
  },
  {
    path: "/account",
    component: AccountView,
    meta: { requiresAuth: true },
  },
  {
    path: "/ajouter",
    component: AjouterView,
    meta: { requiresAuth: true },
  },
  {
    path: "/factures",
    component: FacturesView,
    meta: { requiresAuth: true },
  },
  {
    path: "/factures/:id",
    component: FactureView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if (!userStore.user) {
    await userStore.fetchUser();
  }

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
