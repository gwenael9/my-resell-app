import apiClient from "./apiClient";

// recup les articles
export const getCategories = async () => {
  const response = await apiClient.get("/categorie");
  return response.data;
};
