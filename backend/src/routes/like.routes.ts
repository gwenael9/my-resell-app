import { Router } from "express";
import { LikeController } from "../resolvers/like.resolver";

const router = Router();

// route pour liker un article
router.post("/likes/article/:id", LikeController.likeArticle);

// route pour unliker un article
router.delete("/likes/article/:id", LikeController.unlikeArticle);

// route pour récupérer tous les articles likés par l'utilisateur
router.get("/likes/articles", LikeController.getLikedArticles);

export default router;
