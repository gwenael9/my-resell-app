import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { getPublicProfile, getUser, logout } from "@/api";
import { User } from "@/types";
import { useArticlesStore } from "./articleStore";
import { usePanierStore } from "./panierStore";
import { useRouter } from "vue-router";
import { notification } from "ant-design-vue";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);

  const profilePublic = ref<User | null>(null);

  const isLoginModalOpen = ref<boolean>(false);

  const isAuthenticated = computed(() => !!user.value);
  const articlesStore = useArticlesStore();
  const panierStore = usePanierStore();
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const userData = await getUser();
      user.value = userData;
      articlesStore.fetchArticlesUser(user.value?.id || "");
    } catch (error) {
      console.error("Erreur lors de la récupération du profil.", error);
    }
  };

  const fetchUserPublic = async (id: string) => {
    try {
      const user = await getPublicProfile(id);
      profilePublic.value = user;
      articlesStore.fetchArticlesUser(id);
    } catch (error) {
      console.error("Erreur lors de la récupération du profil public.", error);
    }
  };

  const logoutUser = async () => {
    try {
      const message = await logout();
      user.value = null;
      await articlesStore.fetchArticles();
      // on reinitialise le nbr d'articles liké car personne sera connecté
      articlesStore.articlesLikes = [];
      panierStore.panier = null;
      notification.success({
        message,
      });
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  const openLoginModal = () => {
    isLoginModalOpen.value = true;
  };

  const closeLoginModal = () => {
    isLoginModalOpen.value = false;
  };

  return {
    user,
    profilePublic,
    isAuthenticated,
    logoutUser,
    fetchUser,
    fetchUserPublic,
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
  };
});
