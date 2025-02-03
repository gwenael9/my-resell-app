import { isAxiosError } from "axios";
import apiClient from ".";

// recup les articles
export const getPaniers = async () => {
  const response = await apiClient.get("/panier");
  return response.data;
};

// ajouter un article au panier
export const addArticleToPanier = async (articleId: number) => {
  const response = await apiClient.post(`/panier/${articleId}`);
  return response.data.message;
};

// supprimer l'article du panier
export const deleteArticleFromPanier = async (articleId: number) => {
  const response = await apiClient.delete(`/panier/${articleId}`);
  return response.data.message;
};

// valider un panier
export const validePanier = async () => {
  try {
    const response = await apiClient.post("/valide");
    return { success: true, data: response.data };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return { success: false, message: error.response.data.message };
    }
    return {
      success: false,
      message: "Une erreur est survenue lors de l'inscription.",
    };
  }
};

// vider le panier
export const apiEmptyPanier = async () => {
  const response = await apiClient.get("/vider");
  return response.data.message;
};
