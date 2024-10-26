import { defineStore } from "pinia";
import { ref } from "vue";
import { getArticles, getArticlesLike } from "@/api";
import { Article } from "@/types";

export const useArticlesStore = defineStore("articlesStore", () => {
  const articles = ref<Article[]>([]);
  const articlesLikes = ref<Article[]>([]);

  const fetchArticles = async () => {
    articles.value = await getArticles();
  };

  const fetchArticlesLikes = async () => {
    try {
      articles.value = await getArticlesLike();
    } catch (error) {
      console.error("Erreur lors de la récupération des articles:", error);
    }
  };

  return {
    articles,
    articlesLikes,
    fetchArticles,
    fetchArticlesLikes,
  };
});
