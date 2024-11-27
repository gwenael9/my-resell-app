import { Router } from "express";
import { PanierController } from "../resolvers/panier.resolver";

const router = Router();

// route pour récupérer le panier de l'utilisateur
router.get("/panier", PanierController.getPanier);

// route pour ajouter un article au panier
router.post("/panier/:id", PanierController.addArticle);

// route pour supprimer un article du panier
router.delete("/panier/:id", PanierController.removeArticle);

// route pour valider le panier
router.post("/valide", PanierController.validatePanier);

// route pour vider le panier
router.get("/vider", PanierController.emptyPanier);

export default router;
