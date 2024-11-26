import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/stores/userStores";

// Définir les routes
const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "home", component: () => import("@/views/HomeView.vue") },
  { path: "/articles", component: () => import("@/views/ArticlesView.vue") },
  {
    path: "/articles/:id",
    name: "article",
    component: () => import("@/views/ArticleView.vue"),
  },
  {
    path: "/panier",
    component: () => import("@/views/BagView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/member/:id",
    name: "member",
    component: () => import("@/views/AccountView.vue"),
  },
  {
    path: "/compte",
    name: "compte",
    component: () => import("@/views/AccountView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/compte/parametres",
    name: "parametres",
    component: () => import("@/views/SettingsView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/compte/factures",
    name: "factures",
    component: () => import("@/views/FacturesView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/compte/factures/:id",
    name: "facture",
    component: () => import("@/views/FactureView.vue"),
    meta: { requiresAuth: true },
  },
];

// Créer le router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if (!userStore.user) {
    await userStore.fetchUser();
  }

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return next({ name: "home" });
  }

  next();
});

export default router;
