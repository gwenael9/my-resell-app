import { defineStore } from "pinia";
import { computed, ref } from "vue";
import {
  apiLikeArticle,
  apiUnlikeArticle,
  getArticles,
  getArticlesLike,
} from "@/api";
import { Article } from "@/types";

export const useArticlesStore = defineStore("articlesStore", () => {
  const articles = ref<Article[]>([]);
  const articlesLikes = ref<Article[]>([]);

  // recuperer les articles
  const fetchArticles = async () => {
    try {
      articles.value = await getArticles();
    } catch (error) {
      console.error("Erreur lors de la récupération des articles:", error);
    }
  };

  // recuperer les articles likés
  const fetchArticlesLikes = async () => {
    try {
      articlesLikes.value = await getArticlesLike();
    } catch (error) {
      console.error("Erreur lors de la récupération des articles:", error);
    }
  };

  // nombre d'articles likés
  const likesCount = computed(() => articlesLikes.value.length);

  // méthode pour liker un article
  const likeArticle = async (articleId: number) => {
    try {
      await apiLikeArticle(articleId);
      await fetchArticles();
      await fetchArticlesLikes();
    } catch (error) {
      console.error("Erreur lors du like de l'article:", error);
      throw error;
    }
  };

  // méthode pour unlike un article
  const unlikeArticle = async (articleId: number) => {
    try {
      await apiUnlikeArticle(articleId);
      await fetchArticles();
      await fetchArticlesLikes();
    } catch (error) {
      console.error("Erreur lors du unlike de l'article:", error);
      throw error;
    }
  };

  return {
    articles,
    articlesLikes,
    fetchArticles,
    fetchArticlesLikes,
    likesCount,
    likeArticle,
    unlikeArticle,
  };
});
