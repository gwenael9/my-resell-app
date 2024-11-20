import apiClient from "./apiClient";

// recup les factures
export const getFactures = async () => {
  const response = await apiClient.get("/factures");
  return response.data;
};

// recup une facture
export const getFactureById = async (id: number) => {
  const response = await apiClient.get(`/facture/${id}`);
  return response.data;
};
