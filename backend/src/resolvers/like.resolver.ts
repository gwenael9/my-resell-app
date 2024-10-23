import { Request, Response } from "express";
import { LikeService } from "../services/like.service";

const likeService = new LikeService();

export class LikeController {

  // like d'un article ==> on renvoie un message
  static async likeArticle(req: Request, res: Response) {
    const user = req.user;
    const { id: articleId } = req.params;

    // si l'user n'est pas connecté
    if (!user) {
      res.status(500).json({ message: "Utilisateur inconnu." });
      return;
    }

    try {
      await likeService.likeArticle(user.id, parseInt(articleId));
      res.status(200).json({ message: "Article liké !" });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  // unlike un article ==> renvoie un message
  static async unlikeArticle(req: Request, res: Response) {
    const user = req.user;
    const { id: articleId } = req.params;

    // si l'user n'est pas connecté
    if (!user) {
      res.status(500).json({ message: "Utilisateur inconnu." });
      return;
    }

    try {
      await likeService.unlikeArticle(user.id, parseInt(articleId));
      res.status(200).json({ message: "Article dislike ..." });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  // récupérer tout les articles likés d'un user
  static async getLikedArticles(req: Request, res: Response) {
    const user = req.user;

    // si l'user n'est pas connecté
    if (!user) {
      res.status(500).json({ message: "Utilisateur inconnu." });
      return;
    }

    try {
      const articles = await likeService.getLikedArticles(user.id);
      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
