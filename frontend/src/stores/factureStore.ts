import { getFactureById, getFactures } from "@/api/factures";
import { Facture } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useFacturesStore = defineStore("facturesStore", () => {
  const factures = ref<Facture[]>([]);
  const facture = ref<Facture | null>(null);

  // recuperer les factures
  const fetchFactures = async () => {
    try {
      factures.value = await getFactures();
    } catch (error) {
      console.error("Erreur lors de la récupération des factures", error);
    }
  };

  // recuperer une facture
  const fetchOneArticle = async (factureId: number) => {
    try {
      facture.value = await getFactureById(factureId);
    } catch (error) {
      console.error("Erreur lors de la récupération de la facture", error);
    }
  };

  return {
    factures,
    facture,
    fetchFactures,
    fetchOneArticle,
  };
});
