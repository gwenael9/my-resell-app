import { Router } from "express";
import { CategorieController } from "../resolvers/categorie.resolver";
import { isAdminMiddleware } from "../lib/auth.middleware";

const router = Router();

// récupérer tous les articles
router.get("/categorie", CategorieController.getAllCategorie);

// admin pour créer une catégorie
router.post("/categorie", isAdminMiddleware, CategorieController.createCategorie);

// admin pour supprimer une categorie
router.delete("/categorie/:id", isAdminMiddleware, CategorieController.deleteCategorie)

// admin pour modifier une categorie
router.put("/categorie/:id", isAdminMiddleware, CategorieController.updateCategorie)

export default router;