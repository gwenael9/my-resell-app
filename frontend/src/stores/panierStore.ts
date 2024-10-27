import {
  addArticleToPanier,
  deleteArticleFromPanier,
  getPaniers,
} from "@/api/panier";
import { Panier } from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const usePanierStore = defineStore("panierStore", () => {
  const panier = ref<Panier | null>(null);

  // recuperer le panier
  const fetchPanier = async () => {
    try {
      panier.value = await getPaniers();
      console.log(panier.value);
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
      await fetchPanier();
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
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
  };
});
