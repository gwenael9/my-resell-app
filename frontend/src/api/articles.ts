import apiClient from "./apiClient";

// recup les articles
export const getArticles = async () => {
  const response = await apiClient.get("/articles");
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
