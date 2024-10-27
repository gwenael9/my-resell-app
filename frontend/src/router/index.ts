import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ArticleView from "@/views/ArticleView.vue";
import AccountView from "@/views/AccountView.vue";
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
    path: "/account",
    name: "compte",
    component: AccountView,
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
