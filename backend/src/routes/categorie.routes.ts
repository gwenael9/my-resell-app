import { Router } from "express";
import { CategorieController } from "../resolvers/categorie.resolver";
import { isAdminMiddleware } from "../lib/auth.middleware";

const router = Router();

// Route pour récupérer tous les articles
router.get("/categorie", CategorieController.getAllCategorie);

// admin pour créer une catégorie
router.post("/categorie", isAdminMiddleware, CategorieController.createCategorie);

export default router;