import apiClient from "./apiClient";

// recup les articles
export const getPaniers = async () => {
  const response = await apiClient.get("/panier");
  return response.data;
};

// like un article
export const addArticleToPanier = async (articleId: number) => {
  const response = await apiClient.post(`/panier/${articleId}`);
  return response.data.message;
};

// unlike un article
export const deleteArticleFromPanier = async (articleId: number) => {
  const response = await apiClient.delete(`/panier/${articleId}`);
  return response.data.message;
};

// valider un panier
export const validePanier = async () => {
  const response = await apiClient.post("/valide");
  return response.data;
};
