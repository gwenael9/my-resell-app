import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { getUser, logout } from "@/api";
import { User } from "@/types";
import { useToast } from "vue-toastification";
import { useArticlesStore } from "./articleStore";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!user.value);
  const toast = useToast();
  const articlesStore = useArticlesStore();

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
      toast(message);
    } catch (error) {
      console.log("Erreur lors de la déconnexion");
    }
  };

  return { user, isAuthenticated, logoutUser, fetchUser };
});
