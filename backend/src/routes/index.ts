import { Router } from "express";
import articleRoutes from "./article.routes";
import categorieRoutes from "./categorie.routes";
import userRoutes from "./auth.routes"
import likeRoutes from "./like.routes";

const router = Router();

// nos différentes routes
router.use(articleRoutes);
router.use(categorieRoutes);
router.use(userRoutes);
router.use(likeRoutes);

export default router;
