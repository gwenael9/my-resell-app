import apiClient from "./apiClient";

// création de compte
export const register = async (
  email: string,
  username: string,
  password: string
) => {
  const response = await apiClient.post("/register", {
    email,
    username,
    password,
  });
  return response.data;
};

// connexion
export const login = async (email: string, password: string) => {
  const response = await apiClient.post("/login", { email, password });
  return response.data.message;
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
