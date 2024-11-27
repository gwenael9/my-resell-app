import { isAxiosError } from "axios";
import apiClient from ".";

// création de compte
export const register = async (
  email: string,
  username: string,
  password: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.post("/register", {
      email,
      username,
      password,
    });
    return { success: true, message: response.data.message };
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

// connexion
export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/login", { email, password });
    return { success: true, message: response.data.message };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return { success: false, message: error.response.data.message };
    }
    return {
      success: false,
      message: "Une erreur est survenue lors de la connexion.",
    };
  }
};

// deconnexion
export const logout = async () => {
  const response = await apiClient.get("/logout");
  return response.data.message;
};

// recup les infos de l'utilisateur connecté
export const getUser = async () => {
  const response = await apiClient.get("/me");
  return response.data;
};

export const getPublicProfile = async (id: string) => {
  const response = await apiClient.get(`/user/${id}`);
  return response.data;
};
