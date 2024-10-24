import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { getUser, logout } from "@/api";
import { User } from "@/types";
import { useToast } from "vue-toastification";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!user.value);
  const toast = useToast();

  const setUser = (userData: User | null) => {
    user.value = userData;
  };

  const fetchUser = async () => {
    try {
      console.log("Store");
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
      toast(message);
    } catch (error) {
      console.log("Erreur lors de la déconnexion");
    }
  };

  return { user, isAuthenticated, setUser, logoutUser, fetchUser };
});
