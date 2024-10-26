import apiClient from "./apiClient";

// recup les articles
export const getArticles = async () => {
  const response = await apiClient.get("/articles");
  return response.data;
};

// recup les articles likés
export const getArticlesLike = async () => {
  const response = await apiClient.get("/likes/articles");
  return response.data;
};
