import { Request, Response } from "express";
import { ArticleService } from "../services/article.service";

const articleService = new ArticleService();

export class ArticleController {
  // Récupérer tous les articles
  static async getAllArticles(req: Request, res: Response): Promise<void> {
    try {
      const articles = await articleService.getAllArticles();
      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des articles." });
    }
  }

  // Récupérer les articles d'un utilisateur
  static async getArticlesByUser(req: Request, res: Response) {
    const userId = req.params.userId;

    if (!userId) {
      res.status(400).json({ message: "ID utilisateur non valide." });
    }

    try {
      const articles = await articleService.getArticlesByUser(userId);
      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des articles de l'utilisateur." });
    }
  }
}
