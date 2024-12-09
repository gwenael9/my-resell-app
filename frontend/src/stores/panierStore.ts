import { notification } from "ant-design-vue";
import {
  addArticleToPanier,
  apiEmptyPanier,
  deleteArticleFromPanier,
  getPaniers,
  validePanier,
} from "@/api/panier";
import { Panier } from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "./userStores";

export const usePanierStore = defineStore("panierStore", () => {
  const panier = ref<Panier | null>(null);
  const router = useRouter();

  const userStore = useUserStore();

  const isModalUpdateInfosLivraisonOpen = ref<boolean>(false);

  // recuperer le panier
  const fetchPanier = async () => {
    try {
      panier.value = await getPaniers();
    } catch (error) {
      console.error("Erreur lors de la récupération du panier:", error);
    }
  };

  const isInPanier = (articleId: number) => {
    return panier.value?.articles.some((article) => article.id === articleId);
  };

  const handleAddOrDeleteToPanier = async (articleId: number) => {
    if (!userStore.isAuthenticated) {
      userStore.openLoginModal();
      return;
    }
    try {
      if (isInPanier(articleId)) {
        await deleteArticleFromPanier(articleId);
      } else {
        await addArticleToPanier(articleId);
      }
      await fetchPanier();
    } catch (error) {
      console.error("Erreur lors de la modification du panier", error);
    }
  };

  // méthode pour valider le panier
  const validatePanier = async () => {
    try {
      const facture = await validePanier();
      router.push(`/compte/factures/${facture.id}`);
      await fetchPanier();
      notification.success({
        message: "Panier validé avec succès !",
      });
    } catch (error) {
      console.error("Erreur lors de la validation du panier:", error);
      throw error;
    }
  };

  // méthode pour vider le panier
  const emptyPanier = async () => {
    try {
      const message = await apiEmptyPanier();
      await fetchPanier();
      notification.success({
        message,
      });
    } catch (error) {
      console.error("Erreur lors de la validation du panier:", error);
      throw error;
    }
  };

  // nombre d'articles dans le panier
  const totalArticlesInPanier = computed(() => panier.value?.articles.length);

  const openLivraisonModal = () => {
    isModalUpdateInfosLivraisonOpen.value = true;
  };

  const closeLivraisonModal = () => {
    isModalUpdateInfosLivraisonOpen.value = false;
  };

  return {
    panier,
    fetchPanier,
    totalArticlesInPanier,
    validatePanier,
    handleAddOrDeleteToPanier,
    isInPanier,
    emptyPanier,
    isModalUpdateInfosLivraisonOpen,
    openLivraisonModal,
    closeLivraisonModal,
  };
});
