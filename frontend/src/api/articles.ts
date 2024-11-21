import { isAxiosError } from "axios";
import apiClient from "./apiClient";

// recup les articles
export const getArticles = async (search = "") => {
  const response = await apiClient.get("/articles", {
    params: { search },
  });
  return response.data;
};

// recup les articles d'un user
export const getArticlesFromUser = async () => {
  const response = await apiClient.get("/articles/user");
  return response.data;
};

// recup un article
export const getArticlesById = async (id: number) => {
  const response = await apiClient.get(`/articles/${id}`);
  return response.data;
};

// recup les articles likés
export const getArticlesLike = async () => {
  const response = await apiClient.get("/likes/articles");
  return response.data;
};

// like un article
export const apiLikeArticle = async (articleId: number) => {
  const response = await apiClient.post(`/likes/article/${articleId}`);
  return response.data.message;
};

// unlike un article
export const apiUnlikeArticle = async (articleId: number) => {
  const response = await apiClient.delete(`/likes/article/${articleId}`);
  return response.data.message;
};

// ajouter un article
export const addNewArticle = async (
  title: string,
  description: string,
  size: string,
  price: number,
  etat: string,
  categorieId: number,
  imageAlt: string
) => {
  try {
    const response = await apiClient.post("/articles", {
      title,
      description,
      size,
      price,
      etat,
      categorieId,
      imageAlt,
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Une erreur est survenue lors de l'ajout de l'article.");
  }
};

// supprimer un article
export const deleteArticleById = async (id: number) => {
  const response = await apiClient.delete(`/articles/${id}`);
  return response.data.message;
};
