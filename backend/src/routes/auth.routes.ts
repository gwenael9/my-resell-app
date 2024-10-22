import { Router } from "express";
import { UserController } from "../resolvers/user.resolver";
import { lookToken } from "../lib/auth.middleware";

const router = Router();

// route de création de compte
router.post("/register", lookToken, UserController.register);

// route de connexion
router.post("/login", lookToken, UserController.login);

// route de déconnexion
router.get("/logout", UserController.logout);

// route pour obtenir les infos de l'user connecté
router.get("/me", UserController.getProfile);

export default router;
