import { defineStore } from "pinia";
import { computed, ref } from "vue";
import {
  apiLikeArticle,
  apiUnlikeArticle,
  deleteArticleById,
  getArticles,
  getArticlesById,
  getArticlesFromUser,
  getArticlesLike,
} from "@/api";
import { Article } from "@/types";
import { useUserStore } from "./userStores";
import { useRouter } from "vue-router";
import { notification } from "ant-design-vue";

export const useArticlesStore = defineStore("articlesStore", () => {
  // tout les articles
  const articles = ref<Article[]>([]);
  // tout les articles likés
  const articlesLikes = ref<Article[]>([]);
  // un article
  const article = ref<Article | null>(null);

  // article pour un user
  const articlesUser = ref<Article[]>([]);

  const userStore = useUserStore();

  const router = useRouter();

  // recuperer les articles
  const fetchArticles = async (search = "", categorieId: string[] = []) => {
    try {
      articles.value = await getArticles(search, categorieId);
    } catch (error) {
      console.error("Erreur lors de la récupération des articles:", error);
    }
  };

  // recuperer les articles d'un user
  const fetchArticlesUser = async (userId: string) => {
    try {
      articlesUser.value = await getArticlesFromUser(userId);
    } catch (error) {
      console.error("Erreur lors de la récupération des articles:", error);
    }
  };

  // recuperer un article
  const fetchOneArticle = async (articleId: number) => {
    try {
      const response = await getArticlesById(articleId);
      article.value = response;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'article", error);
      article.value = null;
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
      userStore.openLoginModal();
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

  const deleteArticle = async (articleId: number) => {
    try {
      const message = await deleteArticleById(articleId);
      notification.success({
        message,
      });
      router.push("/articles");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article:", error);
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
    deleteArticle,
    articlesUser,
    fetchArticlesUser,
  };
});
