import { defineStore } from "pinia";
import { computed, ref } from "vue";
import {
  apiLikeArticle,
  apiUnlikeArticle,
  getArticles,
  getArticlesById,
  getArticlesLike,
} from "@/api";
import { Article } from "@/types";
import { useUserStore } from "./userStores";

export const useArticlesStore = defineStore("articlesStore", () => {
  const articles = ref<Article[]>([]);
  const articlesLikes = ref<Article[]>([]);
  const article = ref<Article | null>(null);

  const userStore = useUserStore();

  // recuperer les articles
  const fetchArticles = async () => {
    try {
      articles.value = await getArticles();
    } catch (error) {
      console.error("Erreur lors de la récupération des articles:", error);
    }
  };

  // recuperer un article
  const fetchOneArticle = async (articleId: number) => {
    try {
      article.value = await getArticlesById(articleId);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'article", error);
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

  // savoir si un article est liké
  const isLiked = (articleId: number) => {
    return articlesLikes.value.some((like) => like.id === articleId);
  };

  // modification du like
  const toggleLike = async (articleId: number) => {
    // si pas connecté, on ouvre la modal login
    if (!userStore.isAuthenticated) {
      document.dispatchEvent(new CustomEvent("open-login-modal"));
      return;
    }

    try {
      // on vérifie si l'article est liké
      const isAlreadyLiked = articlesLikes.value.some(
        (like) => like.id === articleId
      );

      // mise à jour du like/unlike
      if (isAlreadyLiked) {
        await apiUnlikeArticle(articleId);
        articlesLikes.value = articlesLikes.value.filter(
          (like) => like.id !== articleId
        );
      } else {
        await apiLikeArticle(articleId);
        const likedArticle = articles.value.find(
          (article) => article.id === articleId
        );
        if (likedArticle) {
          articlesLikes.value.push(likedArticle);
        }
      }

      // Mise à jour de `likesCount` pour l'article dans `articles`
      const article = articles.value.find(
        (article) => article.id === articleId
      );
      if (article) {
        article.likesCount = isAlreadyLiked
          ? article.likesCount - 1
          : article.likesCount + 1;
      }

      // pour la page de l'article
      await fetchOneArticle(articleId);
    } catch (error) {
      console.error("Erreur lors de la gestion du like/unlike:", error);
      throw error;
    }
  };

  return {
    articles,
    article,
    articlesLikes,
    fetchArticles,
    fetchOneArticle,
    fetchArticlesLikes,
    likesCount,
    isLiked,
    toggleLike,
  };
});
