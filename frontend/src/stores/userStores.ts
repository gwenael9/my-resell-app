import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { getUser, logout } from "@/api";
import { User } from "@/types";
import { useToast } from "vue-toastification";
import { useArticlesStore } from "./articleStore";
import { usePanierStore } from "./panierStore";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!user.value);
  const toast = useToast();
  const articlesStore = useArticlesStore();
  const panierStore = usePanierStore();
  const router = useRouter();

  const setUser = (userData: User | null) => {
    user.value = userData;
  };

  const fetchUser = async () => {
    try {
      const userData = await getUser();
      setUser(userData);
    } catch (error) {
      setUser(null);
    }
  };

  const logoutUser = async () => {
    try {
      const message = await logout();
      setUser(null);
      await articlesStore.fetchArticles();
      // on reinitialise le nbr d'articles liké car personne sera connecté
      articlesStore.articlesLikes = [];
      panierStore.panier = null;
      toast(message);
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  return {
    user,
    isAuthenticated,
    logoutUser,
    fetchUser,
  };
});
