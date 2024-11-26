import { Router } from "express";
import { ArticleController } from "../resolvers/article.resolver";

const router = Router();

// route pour récupérer tous les articles
router.get("/articles", ArticleController.getAllArticles);

// route pour récupérer les articles par utilisateur
router.get("/articles/user/:id", ArticleController.getArticlesByUser);

// route pour ajouter un article
router.post("/articles", ArticleController.createArticle);

// route pour récupérer un article avec son id
router.get("/articles/:id", ArticleController.getArticleById);

// route pour supprimer un article
router.delete("/articles/:id", ArticleController.deleteArticle);

// route pour modifier un article
router.put("/articles/:id", ArticleController.updateArticle);


export default router;