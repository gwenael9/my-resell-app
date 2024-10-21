import { Router } from "express";
import { ArticleController } from "../resolvers/article.resolver";

const router = Router();

// Route pour récupérer tous les articles
router.get("/articles", ArticleController.getAllArticles);

// Route pour récupérer les articles par utilisateur
router.get("/articles/user/:userId", ArticleController.getArticlesByUser);

export default router;