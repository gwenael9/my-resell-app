import { isAxiosError } from "axios";
import apiClient from "./apiClient";

// recup les articles
export const getArticles = async (search = "", categorie: string[] = []) => {
  const categorieParam = Array.isArray(categorie)
    ? categorie.join(",")
    : categorie;
  const response = await apiClient.get("/articles", {
    params: { search, categorie: categorieParam },
  });
  return response.data;
};

// recup les articles d'un user
export const getArticlesFromUser = async (userId: string) => {
  const response = await apiClient.get(`/articles/user/${userId}`);
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
  image: string
) => {
  try {
    const response = await apiClient.post("/articles", {
      title,
      description,
      size,
      price,
      etat,
      categorieId,
      image,
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

// modifier un article
export const updateArticle = async (
  id: number,
  data: {
    title: string;
    description: string;
    size: string;
    etat: string;
    categorieId: number;
    image: string;
  }
) => {
  console.log(data);
  const response = await apiClient.put(`/articles/${id}`, data);
  return response.data.message;
};
