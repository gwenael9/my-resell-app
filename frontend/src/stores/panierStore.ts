import {
  addArticleToPanier,
  deleteArticleFromPanier,
  getPaniers,
  validePanier,
} from "@/api/panier";
import { Panier } from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export const usePanierStore = defineStore("panierStore", () => {
  const panier = ref<Panier | null>(null);
  const toast = useToast();
  const router = useRouter();

  // recuperer le panier
  const fetchPanier = async () => {
    try {
      panier.value = await getPaniers();
    } catch (error) {
      console.error("Erreur lors de la récupération du panier:", error);
    }
  };

  // méthode pour ajouter un article au panier
  const addToPanier = async (articleId: number) => {
    try {
      await addArticleToPanier(articleId);
      await fetchPanier();
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      throw error;
    }
  };

  // méthode pour supprimer un article au panier
  const deleteToPanier = async (articleId: number) => {
    try {
      await deleteArticleFromPanier(articleId);
      // met à jour le panier
      await fetchPanier();
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de l'articledu panier:",
        error
      );
      throw error;
    }
  };

  // méthode pour valider le panier
  const validatePanier = async () => {
    try {
      const facture = await validePanier();
      toast.success("Panier validé avec succès !");
      router.push(`/factures/${facture.id}`);
      await fetchPanier();
    } catch (error) {
      console.error("Erreur lors de la validation du panier:", error);
      throw error;
    }
  };

  // nombre d'articles dans le panier
  const totalArticlesInPanier = computed(() => panier.value?.articles.length);

  return {
    panier,
    fetchPanier,
    addToPanier,
    totalArticlesInPanier,
    deleteToPanier,
    validatePanier,
  };
});
