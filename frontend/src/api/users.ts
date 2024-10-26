import { isAxiosError } from "axios";
import apiClient from "./apiClient";

// création de compte
export const register = async (
  email: string,
  username: string,
  password: string
) => {
  try {
    const response = await apiClient.post("/register", {
      email,
      username,
      password,
    });
    return response.data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Une erreur est survenue lors de l'inscription.");
  }
};

// connexion
export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/login", { email, password });
    return response.data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Une erreur est survenue lors de la connexion.");
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
