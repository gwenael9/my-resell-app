import { getCategories } from "@/api";
import { Categorie } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategoriesStore = defineStore("categoriesStore", () => {
  const categories = ref<Categorie[]>([]);

  const fetchCategories = async () => {
    try {
      categories.value = await getCategories();
    } catch (error) {
      console.error("Erreur lors de la récupération des categories", error);
    }
  };

  return {
    categories,
    fetchCategories,
  };
});
