import apiClient from ".";

// recup les factures
export const getFactures = async () => {
  try {
    const response = await apiClient.get("/factures");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des factures", error);
  }
};

// recup une facture
export const getFactureById = async (id: number) => {
  try {
    const response = await apiClient.get(`/facture/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de la facture${id}`, error);
  }
};
