import { Router } from "express";
import { UserController } from "../resolvers/user.resolver";
import { isAdminMiddleware, lookToken } from "../lib/auth.middleware";

const router = Router();

// route de création de compte
router.post("/register", lookToken, UserController.register);

// route de connexion
router.post("/login", lookToken, UserController.login);

// route de déconnexion
router.get("/logout", UserController.logout);

// route pour obtenir les infos de l'user connecté
router.get("/me", UserController.getProfile);

// route pour obtenir les infos de n'importequel user
router.get("/user/:id", UserController.getOtherProfile);

// admin pour supprimer un user
router.delete("/user/:id", UserController.deleteUser);

// route pour modifier le mot de passe
router.put("/newpassword", UserController.updatePassword);

// route pour modifier le nom d'utilisateur
router.put("/newname", UserController.updateUsername);

// route pour modifier l'avatar
router.put("/newavatar", UserController.updateAvatar);

// route pour modifier les infos de livraisons
router.put("/newlivraison", UserController.updateInfosLivraison);

export default router;
