import { Router } from "express";
import articleRoutes from "./article.routes";
import categorieRoutes from "./categorie.routes";
import userRoutes from "./auth.routes";
import likeRoutes from "./like.routes";
import panierRoutes from "./panier.routes";
import factureRoutes from "./facture.routes";

const router = Router();

// nos différentes routes
router.use(articleRoutes);
router.use(categorieRoutes);
router.use(userRoutes);
router.use(likeRoutes);
router.use(panierRoutes);
router.use(factureRoutes);

export default router;
